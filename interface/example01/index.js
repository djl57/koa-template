const router = require("koa-router")();
// const connectMysql = require('../../db')
const partName = "/example01";
const DB = require("../../db/index");

/**
 * @func
 * @todo nope
 * @desc RESTful - POST
 * @param {int} userid 用户id
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} useremail 用户邮箱
 * @requestExample http://localhost:3001/example01/register 设置body={"username": "djlun","password": "123456","useremail": "123@163.com"}
 * @returns {func} 返回值为一个函数
 * @returnParam {object} ctx (request和response可省略)
 * @returnParam {object} ctx.request
 * @returnParam {string} ctx.request.method POST （等同于ctx.method）
 * @returnParam {string} ctx.request.url /example01/register
 * @returnParam {object} ctx.request.header 头部信息
 * @returnParam {object} ctx.request.body 所传参数 {"username": "djlun","password": "123456","useremail": "123@163.com"}
 * @returnParam {object} ctx.response
 * @returnParam {object} ctx.response.status 请求返回状态
 * @returnParam {object} ctx.response.message 请求返回信息
 * @returnParam {object} ctx.response.body 请求返回主体
 */

router.post(partName + "/register", async ctx => {
  const body = ctx.request.body;
  const { useremail } = body;
  try {
    const result = await DB.sqlQuery("SELECT * FROM `user` WHERE `useremail` = ?", [useremail]);
    if (result.length !== 0) {
      ctx.body = { code: 300, msg: "邮箱已存在" };
      return;
    }
    try {
      await DB.sqlQuery("INSERT INTO user SET ?", { ...body });
      ctx.body = { code: 200, msg: "用户添加成功" };
    } catch (error) {
      ctx.body = { code: 500, msg: "用户添加失败" };
    }
  } catch (error) {
    ctx.body = { code: 500, msg: "邮箱验证失败" };
  }
});

module.exports = router;
