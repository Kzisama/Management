const express = require("express");
const router = express.Router();
// 用户路由处理模块
const { register, login } = require("../router-handler/user");
// 验证表单数据中间件
const expressJoi = require("@escook/express-joi");
// 需要验证的规则对象
const { reg_login_schema } = require("../schema/user");

// 用户---注册
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理
router.post("/register", expressJoi(reg_login_schema), register);

// 用户---登录
router.post("/login", login);

module.exports = router;
