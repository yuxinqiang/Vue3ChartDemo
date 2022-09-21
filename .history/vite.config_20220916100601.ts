/*
 * @Description: 
 * @Version: 2.0
 * @Autor: yuxinqiang
 * @Date: 2022-09-16 09:44:35
 * @LastEditors: yuxinqiang
 * @LastEditTime: 2022-09-16 10:06:01
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from "rollup-plugin-visualizer"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer()
  ]
})
