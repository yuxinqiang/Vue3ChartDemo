import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/style/reset.scss'

// 创建APP实例
const app = createApp(App)
app.use(router)
app.use(store)
// 挂载app实例
app.mount('#app')
