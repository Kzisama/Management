<template>
  <div class="major">
    <!-- 侧边导航栏 -->
    <aside class="menu">
      <el-menu
          active-text-color="#3F9FFF"
          background-color="#304156"
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
          <el-menu-item-group v-for="child in route.children" :key="child.path">
            <el-menu-item
                :index="`/${route.path}/${child.path}`"
                style="background-color: #1f2d3d">
              {{ child.meta?.title }}
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </aside>
    <main>
      <header>
        <Header></Header>
      </header>
      <article>
        <router-view v-slot="{ Component }">
          <MyTransition>
            <div style="width: 100%; height: 100%">
              <component :is="Component"></component>
            </div>
          </MyTransition>
        </router-view>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, RouteRecordRaw } from "vue-router";
import { getUserInfoAPI } from "@/api";
import allRouter from "@/router/allRoutes";
import permissionRoutes from "@/router/permission";
import Header from "@/components/Header/index.vue";
import MyTransition from "@/components/MyTransition/index.vue";

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
.major {
  display: flex;
  min-width: 768px;
  height: 100vh;

  .menu {
    width: 200px;
    height: 100%;
    background-color: rgba(48, 65, 86);

    .el-menu-vertical-demo {
      border: none !important;

      /deep/ .el-menu-item-group__title {
        padding: 0 !important;
      }
    }
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;

    header {
      height: 40px;
    }

    article {
      flex: 1;
      position: relative;
      background-color: #ccc;
    }
  }
}
</style>
