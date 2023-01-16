<template>
  <div>
    <header>
      <Header></Header>
    </header>
    <div class="major">
      <!-- 侧边导航栏 -->
      <aside class="menu">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="route.path"
          text-color="#fff"
          router>
          <!-- 没有二级菜单的路由 -->
          <el-menu-item
            v-for="route in noChRoutes"
            :key="route.path"
            :index="`/${route.path}`">
            <el-icon>
              <svg-icon :name="route.meta?.icon"></svg-icon>
            </el-icon>
            {{ route.meta?.title }}
          </el-menu-item>
          <!-- 有二级菜单的路由 -->
          <el-sub-menu
            :index="`/${route.path}`"
            v-for="route in chRoutes"
            :key="route.path">
            <template #title>
              <el-icon>
                <svg-icon :name="route.meta?.icon"></svg-icon>
              </el-icon>
              <span>{{ route.meta?.title }}</span>
            </template>
            <el-menu-item-group
              v-for="child in route.children"
              :key="child.path">
              <el-menu-item :index="`/${route.path}/${child.path}`">
                {{ child.meta?.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, RouteRecordRaw } from "vue-router";
import { getUserInfoAPI } from "@/api";
import allRouter from "@/router/allRoutes";
import permissionRoutes from "@/router/permission";
import Header from "@/components/Header/index.vue";

onMounted(async () => {
  const res = await getUserInfoAPI();
  console.log(res);
});

// 获取当前路由，便于侧边栏根据路由初始选定
const route = useRoute();
// 侧边栏所需要的全部路由
const renderRoutes = allRouter[0].children;
// 带有二级菜单的路由
const chRoutes = permissionRoutes(
  renderRoutes?.filter(item => item.children) as RouteRecordRaw[],
);
// 没有二级菜单的路由
const noChRoutes = permissionRoutes(
  renderRoutes?.filter(item => !item.children) as RouteRecordRaw[],
);
</script>

<style scoped lang="less">
header {
  height: 40px;
}

.major {
  display: flex;
  height: calc(100vh - 40px);

  .menu {
    width: 200px;
    height: 100%;
    background-color: #545c64;

    .el-menu-vertical-demo {
      border: none !important;

      /deep/ .el-menu-item-group__title {
        padding: 0 !important;
      }
    }
  }

  main {
    flex: 1;
    padding: 10px;
  }
}
</style>
