const express = require("express");
const router = express.Router();
// 验证表单数据中间件
const expressJoi = require("@escook/express-joi");
const { goods_schema } = require("../schema/goods");
// 解析表单数据 form-data
const multer = require("multer");

// 上传图片
const storage = multer.diskStorage({
  //存储的位置 uploads在根目录下
  destination(req, file, cb) {
    cb(null, "public/uploads/");
  },
  //图片名字的确定 multer默认帮我们取一个没有扩展名的图片名，因此需要我们自己定义给图片命名
  filename(req, file, cb) {
    cb(null, "img" + file.originalname);
  }
});
// 创建一个multer实例
const upload = multer({ storage });

// 路由处理函数
const { addGoods, getGoods, saleGoods, todaySale } = require("../router-handler/goods");

// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post("/add", upload.single("product_pic"), expressJoi(goods_schema), addGoods);

router.get("/get", getGoods);

router.post("/sale", saleGoods);

router.get("/today", todaySale);

module.exports = router;