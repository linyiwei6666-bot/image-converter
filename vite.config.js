import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: 
  [vue(),
    // SSR 构建时用空函数替换 heic2any，避免 window 报错
    {
      name: 'ssr-stub-heic2any',
      enforce: 'pre',
      resolveId(id, importer, options) {
        if (options?.ssr && id === 'heic2any') {
          return '\0heic2any-stub'
        }
      },
      load(id) {
        if (id === '\0heic2any-stub') {
          return 'export default function() {}'
        }
      }
    }
  ],
  ssgOptions: {
    includedRoutes(paths) {
      // heic-to-jpg 跳过 SSG 预渲染，用户访问时正常走客户端渲染
      return paths.filter(p => p !== '/heic-to-jpg')
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:80", // 后端 80 端口
        changeOrigin: true
      }
    }
  }
})
