// 用户信息验证
const joi = require("joi");

const product_nameSchema = joi.string().required();
const product_typeSchema = joi.string().required();
const product_numSchema = joi.number().required();
const product_invSchema = joi.number().required();
const product_priceSchema = joi.number().required();

exports.goods_schema = {
  body: {
    product_name: product_nameSchema,
    product_type: product_typeSchema,
    product_num: product_numSchema,
    product_inv: product_invSchema,
    product_price: product_priceSchema,
  }
};