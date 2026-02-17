import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Convert from '../views/Convert.vue'
import About from '../views/About.vue'
import Privacy from '../views/Privacy.vue'
import Contact from '../views/Contact.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 每次路由切换更新 title
router.afterEach((to) => {
  document.title = to.meta.title || 'Image Converter'
})

export default router
