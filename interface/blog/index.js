const router = require("koa-router")();
const DB = require("../../db/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const status = require("./config");
const Auth = require("./../../utils/auth");

const partName = "/myblog";

router.post(partName + "/register", async ctx => {
  const body = ctx.request.body;
  const { nickname, email, password, confirm } = body;
  if (password !== confirm) {
    ctx.body = { code: status.PARAMS_B, msg: "两次密码输入不一致！" };
    return;
  }
  try {
    const result = await DB.sqlQuery("SELECT * FROM `user` WHERE `email` = ?", [email]); /* 查 */
    if (result.length !== 0) {
      ctx.body = { code: status.PARAMS_B, msg: "此邮箱已注册！" };
      return;
    }
    try {
      const hashPassword = await bcrypt.hash(password, saltRounds);
      await DB.sqlQuery("INSERT INTO user SET ?", { nickname, email, password: hashPassword }); /* 增 */
      ctx.body = { code: status.SUCCESS, msg: "注册成功！" };
    } catch (error) {
      console.log(error);
      ctx.body = { code: status.SQL_ERR, msg: "注册失败！" };
    }
  } catch (error) {
    ctx.body = { code: status.SQL_ERR, msg: "邮箱验证失败！" };
  }
});

router.post(partName + "/login", async ctx => {
  const body = ctx.request.body;
  console.log("-----body----", body);
  const { email, password } = body;
  const result = await DB.sqlQuery("SELECT * FROM `user` WHERE `email` = ?", [email]);
  if (result.length === 0) {
    ctx.body = { code: status.PARAMS_B, msg: "用户不存在！" };
    return;
  }
  const match = await bcrypt.compare(password, result[0].password);
  if (match) {
    try {
      /* jwt.sign("规则", "加密名字", "过期时间", "箭头函数") */
      const rule = { user_id: result[0].user_id, nickname: result[0].nickname, email: result[0].email };
      const token = await jwt.sign(rule, Auth.secretOrPrivateKey, { expiresIn: "1h" });
      ctx.body = { code: status.SUCCESS, msg: "登录成功！", token: "Bearer " + token };
    } catch (error) {
      ctx.body = { code: status.NO_AUTH_A, msg: "token 生成失败！" };
    }
  } else {
    ctx.body = { code: status.PARAMS_B, msg: "密码错误！" };
  }
});

router.post(partName + "/auth", async ctx => {
  ctx.body = { code: status.SUCCESS };
});

module.exports = router;
