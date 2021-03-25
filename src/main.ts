import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import perfintechUi from 'perfintech'
import 'element-plus/lib/theme-chalk/index.css'
import ElementUI from  'element-plus'
const app = createApp(App)
app.use(ElementUI)
app.use(perfintechUi, {
  test: 1
})

// console.log(perfintechUi)
app.use(router).use(store)
app.mount('#app')
