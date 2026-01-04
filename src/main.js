import App from '@/App.vue'
import directive from '@/directive'
import plugins from '@/plugins'
import router from '@/router'
import store from '@/store'
import utils from '@/utils'
import { createApp } from 'vue'

import '@/assets/style/index.scss'
import '@/assets/svg/index.js'
import 'animate.css'
import 'virtual:uno.css'

import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import VueDOMPurifyHTML from 'vue-dompurify-html'

import SvgIcon from '@/components/SvgIcon'

const app = createApp(App)

// 禁用生产提示信息
app.config.productionTip = false

app.use(directive)
app.use(plugins)
app.use(router)
app.use(store)
app.use(utils)
app.use(Layui)
app.use(VueDOMPurifyHTML)

app.component(SvgIcon.name || 'SvgIcon', SvgIcon)

app.mount('#app')
