import { login, logout } from '@/api/login'
import { omit } from 'lodash-es'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {},
    }
  },
  getters: {
    // 是否已登录
    isLogin: state => !!state.token,
  },
  actions: {
    // 登录
    async login(data) {
      const res = await login(data)
      this.token = res.data.uid
      this.userInfo = omit(res.data, 'uid')
    },
    // 退出系统
    async logout() {
      await logout()
      this.$reset()
      this.token = ''
    },
  },
  persist: true,
})
