const Koa = require("koa");
const cors = require("koa2-cors"); /* 跨域必需模块 */
const bodyParser = require("koa-bodyparser"); /* POST请求必需模块 */

const app = new Koa();
app.use(cors());
app.use(bodyParser());

// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "12345678",
//   database: "my_all_datas"
// });
// connection.connect(err => {
//   if (err) {
//     console.log("数据库连接失败：", err);
//     return;
//   }
//   console.log("数据库连接成功，连接id为：", connection.threadId);
// });
// connection.query('SELECT * FROM `books` WHERE `author` = "David"', function (error, results, fields) {
//   // error will be an Error if one occurred during the query
//   // results will contain the results of the query
//   // fields will contain information about the returned results fields (if any)
// });
// connection.end(err => {
//   if (err) {
//     console.log("数据库已断开，出现错误：", err);
//     return;
//   }
//   console.log("数据库已断开");
// });

// const router = require("koa-router")();

// router.get("/", async ctx => {
//   // console.log(result)
//   console.log(ctx.url);
//   ctx.body = { code: 0, msg: "行程添加成功" };
// });

// app.use(router.routes());
// app.use(router.allowedMethods());

const example01 = require('./interface/example01')
app.use(example01.routes());
app.use(example01.allowedMethods());


app.listen(3001, () => {
  console.log("http://localhost:3001");
});
