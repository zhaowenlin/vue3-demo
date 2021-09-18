import { getParentLayout } from '../constant'
import { AppRouteRecordRaw } from '/@/router/types'
export const businessRoute: AppRouteRecordRaw = {
  path: '/business/index',
  name: 'business',
  component: getParentLayout('Business'),
  meta: {
    single: true,
    icon: 'el-icon-wallet',
    title: '商户'
  },
  children: [
    {
      path: '',
      name: 'businessIndex',
      component: () => import('/@/views/business/index.vue'),
      meta: {
        title: '商户列表'
      }
    }
  ]
}
