import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css'
import ElementUI from 'element-plus'
import perfintechUi from 'perfintech'


import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
debugger
app.use(ElementUI, { locale })
app.use(perfintechUi, {
  prefix: 'api',
  joinPrefix: true
})

app.use(router).use(store)
app.mount('#app')
