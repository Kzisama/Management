const express = require("express");
const router = express.Router();
// 验证表单数据中间件
const expressJoi = require("@escook/express-joi");
// 需要验证的规则对象
const { password_schema } = require("../schema/user");
const {
  getUserInfo,
  comparePwd,
  setPwd,
  setNickname,
} = require("../router-handler/userInfo");

// 用户信息---获取用户信息
router.get("/getinfo", getUserInfo);
// 用户信息---判断旧密码是否正确
router.post("/compare", expressJoi(password_schema), comparePwd);
// 用户信息---修改密码
router.put("/setpwd", setPwd);
// 用户信息---修改昵称
router.put("/setnickname", setNickname);

module.exports = router;
