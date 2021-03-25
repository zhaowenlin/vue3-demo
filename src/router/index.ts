import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes/index'
import { RouteRecordRaw } from 'vue-router'
import { App } from 'vue'

const WHITE_NAME_LIST = ['Login', 'Redirect']
const router = createRouter({
  history: createWebHashHistory(),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
