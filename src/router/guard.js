import { useUserStore } from '@store/user'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({ ease: 'ease', speed: 1000, showSpinner: false })

export function beforeEachGuard(router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if (to.matched.some(route => route.meta?.requireAuth)) {
      const userStore = useUserStore()
      if (userStore.isLogin) {
        next()
      } else {
        next(`/login?redirect=${to.fullPath}`)
      }
    } else {
      next()
    }
  })
}

export function afterEachGuard(router) {
  router.afterEach(() => {
    NProgress.done()
  })
}
