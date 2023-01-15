const db = require("../db/index");

// 获取用户信息
exports.getUserInfo = (req, res) => {
  const sqlStr = `select user_id, user_name, user_nickname, user_type from user_table where user_id=?`;
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
