const db = require("../db");
const path = require("path");
const moment = require("moment");

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

// 销售商品 并且 生成订单信息
exports.saleGoods = (req, res) => {
  const sqlStr = "update product_table set product_inv = product_inv - ? where product_num = ?";
  try {
    req.body.forEach(item => {
      db.query(sqlStr, [item.product_quantity, item.product_num], (err, result) => {
        if (err) {
          throw " 出现错误 ";
        }
        if (result.affectedRows !== 1) {
          throw " 商品结算失败 ";
        }
      });
    });
    // 结算成功，记录订单信息
    const orderInfo = {
      order_num: (+new Date() + "").slice(-12), // 订单编号
      order_drawer: req.user.user_name, // 订单负责人
      order_date: moment().format("YYYY-MM-DD HH:mm:ss"), // 订单创建时间
      order_info: JSON.stringify(req.body), // 订单信息
    };
    const sql = "insert into order_table set ?";
    db.query(sql, orderInfo, (err, result) => {
      if (err) return res.cc(err);
      if (result.affectedRows !== 1) return res.cc("订单创建失败");
    });
    res.send({ status: 0, message: "结算成功" });
  } catch (error) {
    res.cc("结算失败");
  }
};

// 获取当日销售情况
exports.todaySale = (req, res) => {
  res.send("ok");
};
