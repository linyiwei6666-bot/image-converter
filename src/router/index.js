import { createRouter, createWebHashHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import Convert from '../views/Convert.vue'
import About from '../views/About.vue'
import Privacy from '../views/Privacy.vue'
import Contact from '../views/Contact.vue'

import Blog from "../views/Blog.vue"
import JpgToPng from "../views/Blog/JpgToPng.vue"
import WebpVsPng from '../views/Blog/WebpVsPng.vue'
import ImageFormats from '../views/Blog/ImageFormats.vue'
import UltimateGuideToWebP from '../views/Blog/UltimateGuidetoWebP.vue'
import AVIFvsWebP from '../views/Blog/AVIFvsWebP.vue'
import WebVitals from '../views/Blog/WebVitals.vue'

const routes = [
  { 
    path: '/', 
    component: Home,
    meta: { 
      title: 'Free Online Image Converter - JPG PNG WEBP Converter'
    }
  },

  // Convert 总页面（可选，如果你想保留 /convert）
  { 
    path: '/convert', 
    component: Convert,
    meta: { 
      title: 'Convert Image Online - Fast & Free Image Converter'
    }
  },

  // 六种转换情况
  { path: '/jpg-to-png', component: Convert, meta: { title: 'JPG to PNG Converter Online - Free & Fast' } },
  { path: '/png-to-jpg', component: Convert, meta: { title: 'PNG to JPG Converter Online - Free & Fast' } },
  { path: '/png-to-webp', component: Convert, meta: { title: 'PNG to WEBP Converter Online - Free & Fast' } },
  { path: '/webp-to-png', component: Convert, meta: { title: 'WEBP to PNG Converter Online - Free & Fast' } },
  { path: '/jpg-to-webp', component: Convert, meta: { title: 'JPG to WEBP Converter Online - Free & Fast' } },
  { path: '/webp-to-jpg', component: Convert, meta: { title: 'WEBP to JPG Converter Online - Free & Fast' } },

  // 其它页面
  { path: '/about', component: About, meta: { title: 'About Us - Free Image Converter Tool' } },
  { path: '/privacy', component: Privacy, meta: { title: 'Privacy Policy - Image Converter' } },
  { path: '/contact', component: Contact, meta: { title: 'Contact Us - Image Converter' } },

  //blog
  { path: "/blog", component: Blog },
  { path: "/blog/jpg-to-png", component: JpgToPng },
  { path: "/blog/webp-vs-png", component: WebpVsPng },
  { path: "/blog/image-formats", component: ImageFormats },
  { path: "/blog/Ultimate-Guide-to-WebP", component: UltimateGuideToWebP },
  { path: "/blog/AVIF-vs-WebP", component: AVIFvsWebP },
  { path: "/blog/Core-Web-Vitals", component: WebVitals }
]

//因为用了 ViteSSG，所以路由创建放在 main.js 中，index.js 只导出 routes 配置
// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// })

export default routes
