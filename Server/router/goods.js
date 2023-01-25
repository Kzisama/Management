const express = require("express");
const router = express.Router();
const path = require("path");
// 验证表单数据中间件
const expressJoi = require("@escook/express-joi");
const { goods_schema } = require("../schema/goods");
// 解析表单数据 form-data
const multer = require("multer");
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, "../uploads") });

// 路由处理函数
const { addGoods } = require("../router-handler/goods");

// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post("/add", upload.single("product_pic"), expressJoi(goods_schema), addGoods);

module.exports = router;