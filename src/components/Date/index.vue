<template>
  <!-- 日期组件 -->
  <div class="container">
    <div>日期组件</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";

const now = ref<Date>(new Date());
console.log(moment(now.value).format("hh:mm:ss"));

</script>

<style scoped lang="less"></style>

