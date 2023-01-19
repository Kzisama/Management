<template>
  <div class="login-form">
    <el-form :model="LoginForm" style="min-width: 300px">
      <h1 class="title">超市管理系统</h1>
      <el-form-item>
        <el-input v-model="LoginForm.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input
            type="password"
            v-model="LoginForm.password"
            placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :style="{ width: '100%' }">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <router-link to="/register">立即注册</router-link>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { getUserInfoAPI, loginAPI } from "@/api";
import { setToken } from "@/unitls/token";
import router from "@/router";
import { RouterLink } from "vue-router";
import useStore from "@/store";
import axios from "axios";

// 表单数据
const LoginForm = reactive({
  username: "",
  password: "",
});
// 表单提交
const onSubmit = async () => {
  if ( LoginForm.password && LoginForm.username ) {
    const res = await loginAPI(LoginForm);
    console.log(res);
    // 验证失败
    if ( res.data.status === 1 ) {
      return ElMessage.error(res.data.message);
    }
    // 保存token
    setToken(res.data.token);
    // 保存用户信息
    const infoRes = await getUserInfoAPI();
    const { userStore, weatherStore } = useStore();
    userStore.setUserInfo(infoRes.data.data);
    // 保存天气情况(易客云API，appid：用户id，appsecret：密钥)
    const weatherInfo = await axios.get("https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=88151753&appsecret=D1weNlxG");
    weatherStore.setWeather(weatherInfo.data);
    // 跳转首页
    await router.push("/");
  } else {
    console.log("error submit");
  }
};
</script>

<style scoped lang="less">
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;

  .title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.3em;
    font-weight: 700;
  }
}
</style>
