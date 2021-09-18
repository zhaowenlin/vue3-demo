import { getParentLayout } from '../constant'
import { AppRouteRecordRaw } from '/@/router/types'
export const distributeRecord: AppRouteRecordRaw = {
  path: '/distributeRecord/index',
  name: 'distributeRecord',
  component: getParentLayout('DistributeRecord'),
  redirect: '/distributeRecord/index',
  meta: {
    single: true,
    icon: 'el-icon-bank-card',
    title: '发放记录'
  },
  children: [
    {
      path: '',
      name: 'distributeRecordIndex',
      component: () => import('/@/views/distributeRecord/index.vue'),
      meta: {
        title: '发放记录'
      }
    }
  ]
}
