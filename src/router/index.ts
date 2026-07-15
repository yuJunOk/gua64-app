import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/divination',
      name: 'divination',
      component: () => import('../views/DivinationView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue')
    },
    {
      path: '/more',
      name: 'more',
      component: () => import('../views/MoreView.vue')
    },
    {
      path: '/manual-guide',
      name: 'manual-guide',
      component: () => import('../views/ManualGuideView.vue')
    },
    {
      path: '/hexagram-list',
      name: 'hexagram-list',
      component: () => import('../views/HexagramListView.vue')
    },
    {
      path: '/hexagram/:symbol',
      name: 'hexagram-detail',
      component: () => import('../views/HexagramDetailView.vue')
    }
  ]
})

export default router