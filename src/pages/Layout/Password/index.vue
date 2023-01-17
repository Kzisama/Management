<template>
  <div class="container">
    <el-steps :active="active" :space="200" finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        style="width: 350px"
        label-position="left"
        class="demo-ruleForm">
      <el-form-item prop="oldPass" v-if="active === 0">
        <el-input
            v-model="ruleForm.oldPass"
            type="password"
            placeholder="请输入旧密码"
            autocomplete="off" />
      </el-form-item>
      <el-form-item prop="pass" v-if="active === 1">
        <el-input
            v-model="ruleForm.pass"
            type="password"
            placeholder="新密码"
            autocomplete="off" />
      </el-form-item>
      <el-form-item prop="checkPass" v-if="active === 1">
        <el-input
            v-model="ruleForm.checkPass"
            type="password"
            placeholder="再次输入密码"
            autocomplete="off" />
      </el-form-item>
      <!-- 验证旧密码 -->
      <el-form-item v-if="active === 0">
        <el-button
            type="primary"
            @click="compareFn(ruleFormRef)"
            style="width: 100%">
          提交
        </el-button>
      </el-form-item>
      <!-- 提交新密码 -->
      <el-form-item v-if="active === 1">
        <el-button
            type="primary"
            @click="submitForm(ruleFormRef)"
            style="width: 100%">
          Submit
        </el-button>
      </el-form-item>
      <el-form-item v-if="active === 3">
        <el-result
            icon="success"
            title="修改密码成功"
            style="width:100%"
        ></el-result>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import type { FormInstance } from "element-plus";
import { comparePwdAPI, setPwdAPI } from "@/api";
import { delToken } from '@/unitls/token'

const router = useRouter()

// 步骤条
const active = ref(0);

// 表单实例
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  oldPass: "",
  pass: "",
  checkPass: "",
});
// 密码正则,6~16位（数字、字母、下划线）
const pwdReg: RegExp = /^[a-zA-Z0-9_]{6,16}$/;
// 自定义校验规则：密码
const validatePass = (rule: any, value: string, callback: any) => {
  if ( !value ) {
    return callback(new Error("Please input the password"));
  } else if ( !pwdReg.test(value) ) {
    return callback(new Error("密码由6~16位数字、字母、下划线组成"));
  } else {
    callback();
  }
};
// 自定义校验规则：确认密码
const validatePass2 = (rule: any, value: string, callback: any) => {
  if ( value === "" ) {
    return callback(new Error("Please input the password again"));
  } else if ( value !== ruleForm.pass ) {
    return callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
// 验证规则
const rules = reactive({
  pass: [{validator: validatePass, trigger: "blur"}],
  checkPass: [{validator: validatePass2, trigger: "blur"}],
  oldPass: [{required: true, trigger: "blur"}],
});
// 判断旧密码是否正确
const compareFn = (formEl: FormInstance | undefined) => {
  if ( !formEl ) return;
  formEl.validate(async valid => {
    if ( valid ) {
      const res = await comparePwdAPI(ruleForm.oldPass);
      console.log(res);
      if ( res.data.status === 0 ) {
        ElMessage({
          message: "密码正确",
          type: "success",
        });
        active.value = 1;
      } else {
        ElMessage({
          message: "密码有误",
          type: "error",
        });
      }
    }
  });
};
// 设置新密码
const submitForm = (formEl: FormInstance | undefined) => {
  if ( !formEl ) return;
  formEl.validate(async valid => {
    if ( valid ) {
      const res = await setPwdAPI(ruleForm.pass)
      console.log(res)
      // 修改成功
      if ( res.data.status === 0 ) {
        active.value = 3;
        setTimeout(async () => {
          delToken()
          await router.replace('/login')
          window.location.reload()
        }, 500)
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-25%, -50%);
  width: 500px;

  .el-steps {
    margin-bottom: 50px;
  }
}
</style>
