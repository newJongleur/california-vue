import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   port: 3000, //启动端口
  //   hmr: {
  //     host: '127.0.0.1',
  //     port: 3000
  //   },
  //   // 设置 https 代理
  //   proxy: {
  //     '/api': {
  //       target: 'your https address',
  //       changeOrigin: true,
  //       rewrite: (path: string) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})
