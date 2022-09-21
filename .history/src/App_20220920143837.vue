<template>
  <el-config-provider :locale="lang">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const lang = zhCn
</script>
