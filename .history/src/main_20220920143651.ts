import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

// 创建APP实例
const app = createApp(App)
// 挂载路由
app.use(router)
// 挂载app实例
app.mount('#app')
