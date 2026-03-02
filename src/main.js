import './style.css'
import App from './App.vue'

import './assets/base.css'
//因为使用了 ViteSSG，所以声明不用加index.js 中创建路由实例，直接在 main.js 中创建并传入 ViteSSG 即可
//import router from './router/index.js'
import routes from './router' // 导入路由配置

import { ViteSSG } from 'vite-ssg'
import * as UnheadVue from '@unhead/vue' // 1. 必须导入 createHead

export const createApp = ViteSSG(
  App,
  { routes }, // 传入你的路由配置
  ({ app }) => {
      const head = UnheadVue.createUnhead() // 2. 创建 head 实例
      app.use(head)

      return {head}
  }
)