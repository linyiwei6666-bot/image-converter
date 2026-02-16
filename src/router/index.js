import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Convert from '../views/Convert.vue'
import About from '../views/About.vue'
import Privacy from '../views/Privacy.vue'
import Contact from '../views/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/convert', component: Convert },
  { path: '/about', component: About },
  { path: '/privacy', component: Privacy },
  { path: '/contact', component: Contact },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
