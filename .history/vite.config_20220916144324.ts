/*
 * @Description:
 * @Version: 2.0
 * @Autor: yuxinqiang
 * @Date: 2022-09-16 09:44:35
 * @LastEditors: yuxinqiang
 * @LastEditTime: 2022-09-16 10:14:14
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		//设置别名
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	plugins: [vue(), visualizer()]
})
