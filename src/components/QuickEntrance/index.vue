<template>
  <!-- 便捷入口 -->
  <div class="entrance" @click="gotoFn">
    <div class="txt">
      {{ props.text }}
    </div>
    <div class="entrance-icon">
      <svg-icon :name="props.icon" color="#3F9FFF"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  icon: string,
  text: string,
  path: string
}>();

const router = useRouter();

const gotoFn = () => {
  router.push(props.path);
};
</script>

<style scoped lang="less">
.entrance {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 5px;
  cursor: default;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  }

  .entrance-icon {
    margin-top: 10px;
    width: 60px;
    height: 60px;

    .svg-icon {
      width: 100%;
      height: 100%;
    }
  }


}
</style>

