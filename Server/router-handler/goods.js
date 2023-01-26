const db = require("../db");
const path = require("path");

// 添加商品
exports.addGoods = (req, res) => {
  const goodsInfo = {
    ...req.body,
    product_pic: path.join("/uploads", req.file.filename),
  };
  const sqlStr = "select * from product_table where product_num = ?";
  db.query(sqlStr, goodsInfo.product_num, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 0) res.cc("该商品已存在");
    const sql = "insert into product_table set ?";
    db.query(sql, goodsInfo, (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("添加商品失败");
      res.send({
        status: 0,
        message: "添加商品成功"
      });
    });
  });
};

// 获取全部商品
exports.getGoods = (req, res) => {
  const sqlStr = "select product_num,product_name,product_pic,product_type,product_inv,product_price from product_table";
  db.query(sqlStr, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      data: result,
      message: "获取商品信息成功"
    });
  });
};