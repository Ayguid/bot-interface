import { createRouter, createWebHistory } from 'vue-router'
import PairsView from '../views/PairsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bot-controls',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BotControlsView.vue')
    },
    {
      path: '/account',
      name: 'account',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/pairs',
      name: 'pairs',
      component: PairsView
    }
  ]
})

export default router
