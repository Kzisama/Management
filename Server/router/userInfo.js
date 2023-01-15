const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../router-handler/userInfo");

// 用户信息---获取用户信息
router.get("/getinfo", getUserInfo);

module.exports = router;
