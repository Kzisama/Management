// 根据权限获取需要的路由
import { createWebHistory, createRouter } from "vue-router";
import allRoutes from "./allRoutes";
import useStore from "@/store";
import { User } from "@/store/user";
import { getToken } from "@/unitls/token";

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
});

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const { userStore } = useStore();
  const { user_type } = userStore.userInfo as User;
  // 没有登录 并且去往页面不是 登录页或注册页
  if ( !getToken() && to.name !== "Login" && to.name !== "Register" ) {
    // 重定向到登录页
    next({ path: "/login" });
    return;
  } else if ( getToken() && to.name === "Login" ) {
    // 已经登录 没有必要再进入登录页
    next({ path: from.path });
    return;
  } else if (
    to.meta.roles &&
    (to.meta.roles as number[]).every(v => v !== user_type)
  ) {
    console.log("权限不够");
    // 如果前往的页面需要权限但是用户没有该权限，那么就返回原有页面
    next({ path: from.path });
    return;
  }
  next();
});

export default router;

