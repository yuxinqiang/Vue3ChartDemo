<template>
  <div class="scale-box" ref="dataScreenRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
/* 获取最外层盒子 */
const dataScreenRef = ref<HTMLElement | null>(null)
const emit = defineEmits(['resize'])
onMounted(() => {
  // 初始化时为外层盒子加上缩放属性，防止刷新界面时就已经缩放
  if (dataScreenRef.value) {
    // dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-0%, -0%)`
    dataScreenRef.value.style.transform = `scale(1) translate(-0%, -0%)`
    dataScreenRef.value.style.width = `1920px`
    dataScreenRef.value.style.height = `1080px`
  }
  /* 初始化echarts */
  // initCharts();
  // 为浏览器绑定事件
  window.addEventListener('resize', resize)
})

/* 根据浏览器大小推断缩放比例 */
const getScale = (width = 1920, height = 1080) => {
  // console.log('返回当前屏幕宽度(空白空间)', window.screen.availWidth)
  // console.log('返回当前屏幕高度(空白空间)', window.screen.availHeight)
  // console.log('返回当前屏幕宽度(分辨率值)', window.screen.width)
  // console.log('返回当前屏幕高度(分辨率值)', window.screen.height)
  // console.log('返回当前网页高度', window.document.body.offsetHeight)
  // console.log('返回当前网页宽度', window.document.body.offsetWidth)
  // console.log('innerWidth', window.innerWidth)
  // console.log('innerHeight', window.innerHeight)
  let ww = window.innerWidth / width
  let wh = window.innerHeight / height
  return ww < wh ? ww : wh
}

/* 浏览器监听 resize 事件 */
const resize = () => {
  if (dataScreenRef.value) {
    dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-0%, -0%)`
  }
  emit('resize')
  // 使用了 scale 的echarts其实不需要需要重新计算缩放比例
  // Object.values(dataScreen).forEach((chart) => {
  //   chart && chart.resize()
  // })
}
</script>

<style scoped>
.scale-box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s;
  transform-origin: center;
}
</style>
