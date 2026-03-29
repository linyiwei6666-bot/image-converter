import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
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
