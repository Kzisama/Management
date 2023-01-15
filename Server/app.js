// 创建服务器
const express = require("express");
const app = express();

// 配置跨域设置
const cors = require("cors");
app.use(cors());

// 配置解析数据格式的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 优化 res.send
app.use((req, res, next) => {
  // status = 1 为失败，status = 0 为成功，默认失败
  res.cc = (err, status = 1) => {
    return res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 导入配置文件
const config = require("./config");
// 配置解析token的中间件
const expressJWT = require("express-jwt");
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }),
);

// 路由--登录注册
const userRouter = require("./router/user");
app.use("/api", userRouter);

// 路由--用户信息
const userInfoRouter = require("./router/userInfo");
app.use("/my", userInfoRouter);

// 全局错误级别中间件
const joi = require("joi");
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 捕获身份认证失败的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败");
  // 其他错误
  res.cc(err);
});

app.listen(3007, () => {
  console.log("server is running at http://127.0.0.1:3007");
});
