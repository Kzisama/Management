<template>
  <div class="reg_form">
    <h3>你好~ HUFE</h3>
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="rules"
      status-icon
      label-position="top"
      label-width="100px"
      style="max-width: 460px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="registerForm.username" />
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="registerForm.telephone" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerForm.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="again">
        <el-input type="password" v-model="registerForm.again" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(registerFormRef)">
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <router-link to="/login">立即登录</router-link>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { registerAPI } from "@/api";

// 表单实例
const registerFormRef = ref<FormInstance>();

// 用户名正则,6~10位（数字、字母、下划线）
const userReg: RegExp = /^[a-zA-Z0-9_]{6,10}$/;
// 密码正则,6~16位（数字、字母、下划线）
const pwdReg: RegExp = /^[a-zA-Z0-9_]{6,16}$/;
// 手机号正则
const telReg: RegExp =
  /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;

// 自定义校验规则：用户名
const validateName = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the username"));
  } else {
    if (!userReg.test(value)) {
      return callback(new Error("用户名由6~10位数字、字母、下划线组成"));
    } else {
      callback();
    }
  }
};
// 自定义校验规则：密码
const validatePass = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the password"));
  } else if (!pwdReg.test(value)) {
    return callback(new Error("密码由6~16位数字、字母、下划线组成"));
  } else {
    callback();
  }
};
// 自定义校验规则：确认密码
const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === "") {
    return callback(new Error("Please input the password again"));
  } else if (value !== registerForm.password) {
    return callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
// 自定义校验规则：手机号码
const validateTel = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the telephone"));
  } else if (!telReg.test(value)) {
    return callback(new Error("请输入正确手机号"));
  } else {
    callback();
  }
};

// 校验规则
const rules = reactive<FormRules>({
  username: [{ validator: validateName, trigger: "blur" }],
  telephone: [{ validator: validateTel, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  again: [{ validator: validatePass2, trigger: "blur" }],
});

// 表单数据
const registerForm = reactive({
  username: "",
  telephone: "",
  password: "",
  again: "",
});
// 表单提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      const res = await registerAPI(registerForm);
      console.log(res);
      ElMessage({
        message: "注册成功",
        type: "success",
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped lang="less">
.reg_form {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  min-height: 350px;
  border-radius: 8px;
  text-align: center;

  h3 {
    padding: 10px 0;
    font-size: 1.5em;
    font-weight: 700;
  }

  a {
    align-self: flex-start;
    padding: 5px 20px;

    &:hover {
      color: #409eff;
    }
  }

  .el-form {
    flex: 1;
    padding: 10px 20px;

    .el-form-item {
      :deep(.el-form-item__label) {
        color: #000;
      }

      :deep(.el-input__wrapper) {
        border-radius: 0;
        box-shadow: none;
        border-bottom: 2px solid #000;
        background-color: rgba(255, 255, 255, 0);

        .el-input__inner {
          color: #000;
        }
      }

      :deep(.is-focus) {
        border-bottom: 2px solid skyblue;
      }

      .el-button {
        margin-top: 25px;
        width: 100%;
      }
    }
  }
}
</style>
