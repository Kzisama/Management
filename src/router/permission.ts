import { User } from "@/store/user";
import { RouteRecordRaw } from "vue-router";
import useStore from "@/store";

// 筛选出符合权限的路由
const { userStore } = useStore();
const { user_type } = userStore.userInfo as User;

const permissionRoutes = (routes: RouteRecordRaw[]) => {
  // 筛选过后的路由
  const realRoutes: RouteRecordRaw[] = [];
  routes.forEach(item => {
    // chilren
    const chArr: RouteRecordRaw[] = [];
    // 获取到对应权限的路由
    if (item.meta && item.meta.roles) {
      if ((item.meta.roles as number[]).some(num => num === user_type)) {
        // 判断有没有children，获取到对应权限的children
        if (item.children) {
          item.children.forEach(v => {
            if ((v.meta?.roles as number[]).some(num => num === user_type)) {
              chArr.push(v);
            }
          });
        }
        // 如果有符合权限的路由，那么就添加到该路由对象的children属性中
        if (chArr.length > 0) {
          item.children = chArr;
        }
        realRoutes.push(item);
      }
    }
  });

  return realRoutes;
};

export default permissionRoutes;
