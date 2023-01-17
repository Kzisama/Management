<template>
  <!-- 动画过渡 -->
  <el-scrollbar noresize>
    <div class="box">
      <Transition name="my-transition" mode="out-in">
        <slot></slot>
      </Transition>
    </div>
  </el-scrollbar>

</template>

<script setup lang="ts">

</script>

<style scoped lang="less">

.box {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.my-transition-enter-active {
  transition: all 0.4s ease-out;
}

.my-transition-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.my-transition-enter-from,
.my-transition-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

