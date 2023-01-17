const db = require("../db/index");
const bcrypt = require("bcryptjs");

// 获取用户信息
exports.getUserInfo = (req, res) => {
  const sqlStr = `select user_id, user_name, user_nickname, user_tel, user_type from user_table where user_id=?`;
  //   const sqlStr = `select * from user_table where user_id=?`;
  db.query(sqlStr, req.user.user_id, (err, result) => {
    // 1. 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
    }
    // 2. 执行 SQL 语句成功，但是查询到的数据条数不等于 1
    if (result.length !== 1) {
      return res.cc("获取用户信息失败！");
    }
    // 3. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取用户基本信息成功！",
      data: result[0],
    });
  });
};

// 对比密码是否正确
exports.comparePwd = (req, res) => {
  const userInfo = req.body;
  const sqlStr = "select * from user_table where user_id = ?";
  db.query(sqlStr, req.user.user_id, (err, result) => {
    if (err) {
      return res.cc(err);
    }
    if (result.length !== 1) {
      return res.cc("密码错误");
    }
    const compareRes = bcrypt.compareSync(
      userInfo.user_pwd,
      result[0].user_pwd,
    );
    console.log(compareRes);
    compareRes
      ? res.send({ status: 0, message: "密码正确" })
      : res.send({ status: 1, message: "密码有误" });
  });
};

// 修改密码
exports.setPwd = (req, res) => {
  const userInfo = req.body;
  // 定义根据 id 查询用户数据的 SQL 语句
  const sql = `select * from user_table where user_id=?`;
  db.query(sql, req.user.user_id, (err, result) => {
    let flag = false;
    flag = bcrypt.compareSync(userInfo.newPwd, result[0].user_pwd);
    // res.send(flag);
    if (flag) return res.cc("新旧密码不能一致");
    // 新密码加密
    const finalPwd = bcrypt.hashSync(userInfo.newPwd, 10);
    const sqlStr = "update user_table set user_pwd = ? where user_id = ?";
    db.query(sqlStr, [finalPwd, req.user.user_id], (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("更新密码失败");
      res.send({
        status: 0,
        message: "更新密码成功",
      });
    });
  });
};

// 修改昵称
exports.setNickname = (req, res) => {
  const nickname = req.body.nickname;
  const sqlStr = "update user_table set user_nickname = ? where user_id = ?";
  db.query(sqlStr, [nickname, req.user.user_id], (err, result) => {
    if (err) return res.cc(err);
    if (result.affectedRows !== 1) return res.cc("修改昵称失败");
    res.send({
      status: 0,
      message: "修改昵称成功"
    });
  });
};