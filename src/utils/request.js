import { layer } from '@layui/layui-vue'
import { useUserStore } from '@store/user'
import axios from 'axios'

// http状态码
const stateCode = {
  '400': '请求错误',
  '401': '未授权，请登录',
  '403': '拒绝访问',
}

// 设置axios默认请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 获取 token
    const userStore = useUserStore()
    const token = userStore.token
    if (config.url !== '/login' && token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.error(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  async res => {
    if (res.headers['refresh-token']) {
      const userStore = useUserStore()
      userStore.token = res.headers['authorization']
    }
    if (res.data.status === 200 || res.data.status === undefined) {
      return res.data
    } else {
      layer.msg(res.data.msg, { icon: 2 })
      throw res
    }
  },
  async error => {
    if (error.response) {
      if (res.headers['refresh-token']) {
        const userStore = useUserStore()
        userStore.token = res.headers['authorization']
      }
      if (error.response.data instanceof Blob) {
        // 如果是文件操作的返回，由后续进行处理
        return error.response
      }
    } else {
      //处理断网或请求超时，请求没响应
      if (error.code == 'ECONNABORTED' || error.message.includes('timeout')) {
        layer.msg('请求超时，请稍后再尝试！', { icon: 2 })
      } else {
        layer.msg('网络错误，与服务器链接出现异常，请稍后再尝试！', { icon: 2 })
      }
      throw error
    }
  },
)

export default service
