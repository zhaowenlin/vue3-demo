import { getParentLayout } from '../constant'
import { AppRouteRecordRaw } from '/@/router/types'
export const confirmRedempt: AppRouteRecordRaw = {
  path: '/confirmRedempt/index',
  name: 'confirmRedempt',
  component: getParentLayout('ConfirmRedempt'),
  meta: {
    single: true,
    icon: 'el-icon-bank-card',
    title: '核销记录'
  },
  children: [
    {
      path: '',
      name: 'confirmRedemptIndex',
      component: () => import('/@/views/confirmRedempt/index.vue'),
      meta: {
        title: '核销记录'
      }
    }
  ]
}
