import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css'
import ElementUI from 'element-plus'
import { createAxios } from '/@/utils/axios/index'
import { requestInterceptors, transformRequestHook, beforeRequest } from '/@/utils/ajax'
const app = createApp(App)
app.use(ElementUI)
createAxios(app, {
  requestOptions: {
    beforeRequest,
    prefix: 'demo',
    ajaxLock: '.layout-content',
    joinPrefix: process.env.NODE_ENV !== 'development'
  },
  timeout: 30000,
  ext: {
    Transform: {
      requestInterceptors,
      transformRequestHook
    }
  }
})
app.provide('$ajax', app.config.globalProperties.$ajax)
app.use(router).use(store)
app.mount('#app')
