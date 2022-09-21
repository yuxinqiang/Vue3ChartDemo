/*
 * @Description:
 * @Version: 2.0
 * @Autor: yuxinqiang
 * @Date: 2022-09-16 09:44:35
 * @LastEditors: yuxinqiang
 * @LastEditTime: 2022-09-16 10:14:14
 */
import { defineConfig, loadEnv, ConfigEnv, UserConfig } from 'vite'
// import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import { wrapperEnv } from './src/utils/getEnv'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import * as path from 'path'

// https://vitejs.dev/config/
// export default defineConfig({
//   resolve: {
//     //设置别名
//     alias: {
//       '@': path.resolve(__dirname, 'src')
//     }
//   },
//   plugins: [vue(), visualizer()]
// })

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  return {
    // base: "/",
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // 代理跨域（mock 不需要配置跨域，直接能访问，这里只是个示例）
      proxy: {
        '/api': {
          // target: "https://www.fastmock.site/mock/f81e8333c1a9276214bcdbc170d9e0a0", // fastmock
          target: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e', // easymock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      // * 是否生成包预览(分析依赖包大小,方便做优化处理)
      viteEnv.VITE_REPORT && visualizer()
    ]
  }
})
