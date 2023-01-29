<template>
  <router-view v-slot="{ Component }">
    <!--  注意：include内是组件的名字，而不是路由名字！！！  -->
    <keep-alive :include="['GoodsSettlement']">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">

</style>
