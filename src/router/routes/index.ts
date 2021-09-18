import { AppRouteRecordRaw } from '/@/router/types'

import { PageEnum } from '/@/enums/pageEnum'
import { LAYOUT } from '../constant'
import { activitiesRoute } from './activities'
import { businessRoute } from './business'
import { distributeRecord } from './distributeRecord'
import { confirmRedempt } from './confirmRedempt'
import { home } from './home'



export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  },
  component: LAYOUT,
  children: [activitiesRoute, businessRoute, distributeRecord, confirmRedempt, home]
}

export const basicRoutes = [RootRoute]
