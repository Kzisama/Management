import { RouteRecordRaw } from "vue-router";

const allRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Layout",
    component: () => import("@/pages/Layout/index.vue"),
    redirect: "/person",
    children: [
      {
        path: "person",
        name: "Person",
        component: () => import("@/pages/Layout/Person/index.vue"),
        meta: {
          title: "首页",
          icon: "dashboard",
          roles: [0, 1, 2],
        },
      },
      // 商品模块
      {
        path: "goods",
        name: "Goods",
        component: () => import("@/pages/Layout/Goods/index.vue"),
        redirect: "/goods/goodspreview",
        meta: {
          title: "商品",
          icon: "shopping",
          roles: [0, 1, 2],
        },
        children: [
          {
            path: "goodspreview",
            name: "GoodsPreview",
            component: () =>
              import("@/pages/Layout/Goods/GoodsPreview/index.vue"),
            meta: {
              title: "商品总览",
              icon: "component",
              roles: [0, 1, 2],
            },
          },
          {
            path: "goodssettlement",
            name: "GoodsSettlement",
            component: () =>
              import("@/pages/Layout/Goods/GoodsSettlement/index.vue"),
            meta: {
              title: "商品结算",
              roles: [0],
            },
          },
          {
            path: "add",
            name: "Add",
            component: () => import("@/pages/Layout/Goods/AddGoods/index.vue"),
            meta: {
              title: "添加商品",
              roles: [1, 2]
            }
          }
        ],
      },
      // 库存模块
      {
        path: "inventory",
        name: "Inventory",
        component: () => import("@/pages/Layout/Inventory/index.vue"),
        redirect: "/inventory/invmange",
        meta: {
          title: "库存",
          icon: "component",
          roles: [1, 2],
        },
        children: [
          {
            path: "invmange",
            name: "InvMange",
            component: () =>
              import("@/pages/Layout/Inventory/InventoryMange/index.vue"),
            meta: {
              title: "库存管理",
              roles: [1, 2],
            },
          },
        ],
      },
      // 修改密码
      {
        path: "password",
        name: "Password",
        component: () => import("@/pages/Layout/Password/index.vue"),
        meta: {
          title: "修改密码",
          icon: "password",
          roles: [0, 1, 2],
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register/index.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/pages/404/index.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

export default allRoutes;
