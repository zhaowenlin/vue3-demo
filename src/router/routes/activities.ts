import { getParentLayout } from '../constant'
import { AppRouteRecordRaw } from '/@/router/types'
export const activitiesRoute: AppRouteRecordRaw = {
  path: '/activities/index',
  name: 'activities',
  component: getParentLayout('Activities'),
  meta: {
    single: true,
    icon: 'el-icon-present',
    title: '活动'
  },
  children: [
    {
      path: '',
      name: 'activitiesIndex',
      component: () => import('/@/views/activities/index.vue'),
      meta: {
        title: '活动列表'
      }
    }
  ]
}
