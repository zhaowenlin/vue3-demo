import { getParentLayout } from '../constant'
import { AppRouteRecordRaw } from '/@/router/types'
export const home: AppRouteRecordRaw = {
  path: '/home/index',
  name: 'home',
  component: getParentLayout('Home'),
  meta: {
    single: true,
    icon: 'el-icon-present',
    title: '首页'
  },
  children: [
    {
      path: '',
      name: 'activitiesIndex',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: '首页'
      }
    }
  ]
}
