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

// 销售商品
exports.saleGoods = (req, res) => {
  req.body = [
    {
      "product_num": 100001,
      "product_name": "罗曼电动牙刷",
      "product_price": 319.12,
      "product_quantity": 1,
      "product_total": 638.24
    },
    {
      "product_num": 200001,
      "product_name": "乐事无限罐装薯片翡翠黄瓜味104g",
      "product_price": 10,
      "product_quantity": 1,
      "product_total": 10
    },
    {
      "product_num": 300001,
      "product_name": "全碳素纤维单双羽毛球拍",
      "product_price": 99,
      "product_quantity": 1,
      "product_total": 99
    },
    {
      "product_num": 500001,
      "product_name": "硅胶铲不粘锅专用锅",
      "product_price": 7,
      "product_quantity": 1,
      "product_total": 7
    },
    {
      "product_num": 400001,
      "product_name": "BEASTER小恶魔鬼脸防风仿羊羔毛棉衣",
      "product_price": 399,
      "product_quantity": 1,
      "product_total": 399
    },
    {
      "product_num": 100002,
      "product_name": "清风抽纸原木金装120抽8包",
      "product_price": 30,
      "product_quantity": 1,
      "product_total": 30
    }
  ];
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
    res.send({ status: 0, message: "结算成功" });
  } catch (error) {
    res.cc("结算失败");
  }
};