<template>
  <div class="form">
    <el-form
        ref="addGoodsFormRef"
        :model="addGoodsForm"
        :rules="rules"
        class="demo-form-inline">
      <el-form-item label="商品编号" prop="product_num">
        <el-input v-model="addGoodsForm.product_num" maxlength="6" autofocus />
      </el-form-item>
      <el-form-item label="商品名称" prop="product_name">
        <el-input v-model="addGoodsForm.product_name" />
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input-number v-model="addGoodsForm.product_inv" :min="1" :max="500" />
      </el-form-item>
      <el-form-item label="商品单价">
        <el-input-number v-model="addGoodsForm.product_price" />
      </el-form-item>
      <el-form-item label="商品类别" prop="product_type">
        <el-select v-model="addGoodsForm.product_type" placement="right-end">
          <el-option
              v-for="type in goodsTypes"
              :key="type"
              :label="type"
              :value="type" />
        </el-select>
      </el-form-item>
      <el-form-item prop="product_pic">
        <input type="file" @change="uploadImg" ref="file" />
        <el-image :src="imgUrl" alt="" fit="fill" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(addGoodsFormRef)">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { addGoodsAPI } from "@/api";

// 商品参数类型
type Goods = {
  product_num: number | null;
  product_name: string;
  product_pic: File | null;
  product_inv: number | null;
  product_type: string;
  product_price: number | null;
};

const file = ref<any>(); // 获取文件选择框，方便后续清除选中文件
const goodsTypes: string[] = ["食品", "服饰", "文体用具", "日用百货", "厨房用具"]; // 商品种类
const addGoodsFormRef = ref<FormInstance>(); // 表单实例
const addGoodsForm = reactive<Goods>({
  // 表单数据
  product_num: 0, // 商品编号
  product_name: "", // 商品名称
  product_inv: 0, // 商品数量
  product_pic: null, // 商品图片
  product_type: "", // 商品种类
  product_price: 0, // 商品价格
});

// 表单验证规则
const checkNum = (rule: any, value: number, callback: any) => {
  if ( !value ) {
    return callback(new Error("请输入编号"));
  }
  if ( value < 100000 || value > 600000 ) {
    return callback(new Error("编号错误"));
  }
  callback();
};
const rules = reactive<FormRules>({
  product_num: [{ validator: checkNum, trigger: "blur" }],
  product_name: [{ required: true, message: "需要输入商品名称" }],
  product_pic: [{ required: true, message: "需要一张商品图" }],
  product_type: [{ required: true, message: "请设置商品类别" }],
});

// 获取图片信息
const imgUrl = ref<any>("");
const uploadImg = (e: any) => {
  addGoodsForm.product_pic = e.target.files[0];
  const render = new FileReader();
  render.readAsDataURL(e.target.files[0]);
  render.onload = () => {
    imgUrl.value = render.result;
  };
};
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if ( !formEl ) return;
  formEl.resetFields();
};
// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if ( !formEl ) return;
  await formEl.validate(async (valid, fields) => {
    if ( valid ) {
      const formData = new FormData();
      Object.keys(addGoodsForm).forEach(key => {
        formData.append(key, addGoodsForm[key]);
      });
      const res = await addGoodsAPI(formData);
      if ( res.data.status === 0 ) {
        ElMessage({
          message: "添加商品成功",
          type: "success"
        });
        // 重置表单并清空预览图片和选中文件
        file.value.value = "";
        imgUrl.value = "";
        resetForm(addGoodsFormRef.value);
      } else {
        ElMessage.error("添加商品失败");
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="less" scoped>
.form {
  padding: 20px;
  width: 500px;
  .el-form {
    .pic {
      display: flex;
      flex-direction: column;
    }
    .el-form-item {
      // 去掉必选项前面的小红点
      :deep(.el-form-item__label) {
        &::before {
          display: none;
        }
      }

      .el-image {
        width: 150px;
        height: 150px;
      }
    }
  }


}
</style>
