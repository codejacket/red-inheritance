import Layout from '@/layout'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

// 路由模式
const historyCreatorMap = {
  hash: createWebHashHistory,
  history: createWebHistory,
  memory: createMemoryHistory,
}

const router = createRouter({
  history: historyCreatorMap['history'](),
  routes: [
    {
      path: '',
      name: 'Layout',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
            icon: 'home',
            nav: true,
          },
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('@/views/history/index.vue'),
          meta: {
            title: '红色历史',
            icon: 'book',
            nav: true,
          },
        },
        {
          path: 'hero',
          name: 'Hero',
          component: () => import('@/views/hero/index.vue'),
          meta: {
            title: '英雄事迹',
            icon: 'shield',
            nav: true,
          },
        },
        {
          path: 'landmark',
          name: 'Landmark',
          component: () => import('@/views/landmark/index.vue'),
          meta: {
            title: '红色地标',
            icon: 'landmark',
            nav: true,
          },
        },
        {
          path: 'historyDetail/:eventId',
          name: 'HistoryDetail',
          component: () => import('@/views/history/historyDetail.vue'),
        },
        {
          path: 'heroDetail/:heroId',
          name: 'HeroDetail',
          component: () => import('@/views/hero/heroDetail.vue'),
        },
        {
          path: 'landmarkDetail/:landmarkId',
          name: 'LandmarkDetail',
          component: () => import('@/views/landmark/landmarkDetail.vue'),
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/index.vue'),
        },
      ],
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/index.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '404',
    },
  ],
})

export default router
