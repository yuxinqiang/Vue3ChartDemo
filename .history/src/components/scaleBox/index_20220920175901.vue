<template>
  <div class="scale-box" ref="dataScreenRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/* 获取最外层盒子 */
const dataScreenRef = ref<HTMLElement | null>(null)

</script>

<style scoped>
.scale-box {
  width: 100%;
  height: 100%;
}
</style>
