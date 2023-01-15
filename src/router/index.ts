// 根据权限获取需要的路由
import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";
import routerConfig from "./route.config";
import allRoutes from "./allRoutes";

const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes,
});

export default router;

// 路由守卫等设置
routerConfig();
