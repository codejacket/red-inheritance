import { viteMockServe } from 'vite-plugin-mock'

export default function vitePluginMock(configEnv) {
  if (configEnv.mode === 'mock') {
    let { configureServer, ...options } = viteMockServe({
      mockPath: 'mock/modules',
      watchFiles: true,
      logger: false, // 是否在控制台显示请求日志
    })
    return {
      ...options,
      async configureServer(server) {
        return await configureServer(server)
      },
    }
  }
}
