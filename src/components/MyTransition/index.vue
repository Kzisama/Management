<template>
  <div class="box">
    <Transition name="my-transition">
      <slot></slot>
    </Transition>
  </div>

</template>

<script setup lang="ts">

</script>

<style scoped lang="less">

.box {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.my-transition-enter-active {
  transition: all 0.3s ease-out;
}

.my-transition-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.my-transition-enter-from,
.my-transition-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>

