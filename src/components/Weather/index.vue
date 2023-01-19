<template>
  <!-- 天气组件 -->
  <div class="container">
    <div class="col1">
      <WeatherIcon :name="weatherIcon"></WeatherIcon>
      <div class="txt">{{ weatherInfo.wea }}</div>
      <div class="deg">{{ weatherInfo.tem2 }}~{{ weatherInfo.tem1 }} ℃</div>
      <div class="location">
        <el-icon>
          <Location />
        </el-icon>
        <span>{{ weatherInfo.city }}</span>
      </div>
      <div class="air">
        <p>空气质量:</p>
        <span>{{ weatherInfo.air_level }}</span>
      </div>
    </div>
    <div class="col2">
      <div v-for="item in tips" :key="item">
        <p>{{ item.txt }}</p>
        <span>{{ item.data }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Location } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import useStore from "@/store";
import WeatherIcon from "@/components/WeatherIcon/index.vue";

// 获取天气情况
const { weatherStore } = useStore();
const { weatherInfo } = storeToRefs(weatherStore);
const weatherIcon = ref<string>("");
// 判断天气情况所需要显示的图标
switch ( (weatherInfo as any).value.wea_img ) {
  case "xue":
    weatherIcon.value = "daxue";
    break;
  case "lei":
    weatherIcon.value = "shuangshandian";
    break;
  case "shachen":
    weatherIcon.value = "dafengyouwu";
    break;
  case "wu":
    weatherIcon.value = "youwu";
    break;
  case "bingbao":
    weatherIcon.value = "bingbao";
    break;
  case "yun":
    weatherIcon.value = "duoyunyouwu";
    break;
  case "yu":
    weatherIcon.value = "xiaoyu";
    break;
  case "yin":
    weatherIcon.value = "yintian";
    break;
  case "qing":
    weatherIcon.value = "taiyang";
    break;

}
// 天气各项指标
const tips = ref([
  {
    txt: "PM2.5",
    data: (weatherInfo.value as any).air_pm25
  },
  {
    txt: "风速",
    data: `${ (weatherInfo.value as any).win }${ (weatherInfo.value as any).win_meter }`
  },
  {
    txt: "湿度",
    data: (weatherInfo.value as any).humidity
  },
  {
    txt: "可见度",
    data: (weatherInfo.value as any).visibility
  },
]);
</script>

<style scoped lang="less">
.container {
  display: grid;
  grid-template-columns: repeat(2, 240px);
  grid-row-gap: 10px;
  height: 180px;
  border-radius: 5px;
  overflow: hidden;

  .col1 {
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr 1fr 1fr;
    background-image: linear-gradient(135deg, #5ABDCD, #4964C6);

    .txt,
    .deg,
    .location {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
    }

    .location {
      .el-icon {
        margin-right: 5px;
        vertical-align: -0.15em;
      }
    }

    .air {
      color: #fff;
      font-size: 14px;

      p {
        margin-bottom: 5px;
      }

      span {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }

  .col2 {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
    background-color: #202630;
    border-radius: 0 5px 5px 0;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      color: #fff;
      background-color: rgba(255, 255, 255, .1);
      border-radius: 5px;
    }
  }
}
</style>

