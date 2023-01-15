// 处理密码
const bcrypt = require("bcryptjs");
// 生产token
const jwt = require("jsonwebtoken");
// 导入配置文件
const config = require("../config");
const db = require("../db/index");

// 用户-----注册
exports.register = (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  // 查询数据库中有没有该用户名
  const sqlStr = "select * from user_table where user_name = ?";
  db.query(sqlStr, userInfo.user_name, (err, result) => {
    // 查询错误
    if (err) return res.cc(err);
    // 查询成功
    if (result.length > 0) {
      return res.cc("该用户名已被占用");
    }
    // 符合注册条件
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    userInfo.user_pwd = bcrypt.hashSync(userInfo.user_pwd, 10);
    console.log(userInfo.user_pwd);
    // 在数据库中插入一条用户
    const sql = `insert into user_table set ?`;
    db.query(sql, userInfo, (err, result) => {
      // 执行sql语句失败
      if (err) return res.cc(err);
      // 注册失败
      if (result.affectedRows !== 1) {
        return res.cc("注册用户失败，请稍后再试！");
      }
      // 注册成功
      res.send({ status: 0, message: "注册成功" });
    });
  });
};

// 用户-----登录
exports.login = (req, res) => {
  // 查询数据库中是否有该用户
  const userInfo = req.body;
  const sqlStr = `select * from user_table where user_name = ?`;
  db.query(sqlStr, userInfo.user_name, (err, result) => {
    if (err) return res.cc(err);
    // 判断用户名是否正确
    if (result.length !== 1) return res.cc("用户名或密码错误");
    // 判断密码是否正确,使用 bcrypt.compareSync 比较用户输入密码和数据中是否一致
    const compareRes = bcrypt.compareSync(
      userInfo.user_pwd,
      result[0].user_pwd,
    );
    if (!compareRes) return res.cc("用户名或密码错误");
    // 登录成功，剔除用户的敏感信息，并生成token
    const user = { ...result[0], user_pwd: "", user_pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.duration, // 有效时长
    });
    res.send({
      status: 0,
      message: "登陆成功",
      token: `Bearer ${tokenStr}`,
    });
  });
};
