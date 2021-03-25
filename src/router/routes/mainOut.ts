import { AppRouteModule } from '/@/router/types'

// test
// http:ip:port/main-out
export const mainOutRoutes: AppRouteModule[] = [
  {
    path: '/main-out',
    name: 'MainOut',
    component: () => import('/@/views/mainOut/index.vue'),
    meta: {
      title: 'MainOut',
      ignoreAuth: true
    }
  }
]

export const mainOutRouteNames = mainOutRoutes.map(item => item.name)
