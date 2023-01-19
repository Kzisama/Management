<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string
}>();

const iconName = computed(() => `#icon-${ props.name }`);
</script>

<style scoped lang="less">
.icon {
  font-size: 50px;
}
</style>

