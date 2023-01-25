// 用户信息验证
const joi = require("joi");

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

// 用户名验证规则
const usernameReg = /^[a-zA-Z0-9_]{6,10}$/;
const usernameSchema = joi.string().required().pattern(usernameReg);

// 密码验证规则
const passwordReg = /^[a-zA-Z0-9_]{6,10}$/;
const passwordSchema = joi.string().required().pattern(passwordReg);

// 手机号验证规则
const telReg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
const telSchema = joi.string().required().pattern(telReg);

// 登录和注册的表单验证规则对象
exports.reg_login_schema = {
  body: {
    user_name: usernameSchema,
    user_pwd: passwordSchema,
    user_tel: telSchema,
  },
};

// 密码验证规则
exports.password_schema = {
  body: {
    user_pwd: passwordSchema,
  },
};