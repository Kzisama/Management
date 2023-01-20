<template>
  <!-- 日期组件 -->
  <div class="container">
    <div class="clock">{{ formatDate }}</div>
    <div class="week">
      <div>周{{ formatDay }}</div>
      <div>{{ year }}-{{ month }}-{{ date }}</div>
      <div>天天开心</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import moment from "moment";

// 时钟
const now = ref<Date>(new Date());
onMounted(() => {
  setInterval(() => {
    now.value = new Date();
  }, 1000);
});
const formatDate = computed(() => moment(now.value).format("HH:mm:ss")); // 格式化的时间

// 年月日
const weekArr: string[] = ["日", "一", "二", "三", "四", "五", "六"];
const year = now.value.getFullYear();
const month = now.value.getMonth() + 1;
const date = now.value.getDate();
const day = now.value.getDay();
const formatDay = computed(() => weekArr[day]);
</script>

<style scoped lang="less">
.container {
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 180px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-image: linear-gradient(135deg, #5ABDCD, #4964C6);
  overflow: hidden;

  .clock {
    padding: 10px;
    justify-self: center;
    align-self: center;
    font-size: 35px;
    font-weight: 700;
    color: #fff;
    border-radius: 5px;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }

  .week {
    color: #fff;
    padding: 20px 0;

    div:first-child {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    div:last-child {
      font-size: 20px;
      margin-top: 10px;
    }
  }
}
</style>

