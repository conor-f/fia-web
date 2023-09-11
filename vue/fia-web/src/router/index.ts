import { createRouter, createWebHistory } from 'vue-router'

import FiaHomepage from '@/views/FiaHomepage.vue';
import FiaAbout from '@/views/FiaAbout.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FiaHomepage
    },
    {
      path: '/about',
      name: 'about',
      component: FiaAbout
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/user-details',
      name: 'user-details',
      component: () => import("@/views/UserDetailsView.vue")
    },
    {
      path: '/app-home',
      name: 'app-home',
      component: () => import("@/views/AppHomeView.vue")
    }
  ]
})

export default router
