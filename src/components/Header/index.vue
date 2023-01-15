<template>
  <div class="header-nav">
    <div class="logo">Logo</div>
    <div class="user">
      <div class="welcome">
        欢迎 {{ user_nickname ? user_nickname : user_name }}
      </div>
      <div class="icon" @click="exit">
        <el-icon><SwitchButton /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { SwitchButton } from "@element-plus/icons-vue";
import useStore from "@/store";
import { User } from "@/store/user";
import { delToken } from "@/unitls/token";

const router = useRouter();
const { userStore } = useStore();
const { user_name, user_nickname } = userStore.userInfo as User;
// 退出登录
const exit = () => {
  ElMessageBox.confirm("确定要退出系统吗？", "退出登录", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    center: true,
  }).then(() => {
    ElMessage({
      type: "success",
      message: "退出成功",
    });
    delToken();
    router.replace("/login");
    location.reload();
  });
};
</script>

<style scoped lang="less">
.header-nav {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #363b41;
  background-color: #409eff;

  .logo {
    width: 200px;
    height: 100%;
    background-color: #545c64;
  }

  .user {
    position: absolute;
    right: 50px;
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;

    .welcome {
      margin-right: 20px;
    }

    .icon {
      cursor: pointer;
    }
  }
}
</style>
