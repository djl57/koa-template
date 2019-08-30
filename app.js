const Koa = require("koa");
const cors = require("koa2-cors"); /* 跨域必需模块 */
const bodyParser = require("koa-bodyparser"); /* POST请求必需模块 */

const app = new Koa();
app.use(cors());
app.use(bodyParser());

const example01 = require('./interface/example01')
app.use(example01.routes());
app.use(example01.allowedMethods());

const blog = require('./interface/blog')
app.use(blog.routes());
app.use(blog.allowedMethods());

app.listen(3001, () => {
  console.log("http://localhost:3001");
});
