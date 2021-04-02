import { AppRouteRecordRaw } from '/@/router/types'

import { PageEnum } from '/@/enums/pageEnum'
import { getParentLayout, LAYOUT } from '../constant'
const home: AppRouteRecordRaw = {
  path: '/home',
  name: 'HomePage',
  component: getParentLayout('HomePage'),
  redirect: '/home/index',
  meta: {
    icon: 'el-icon-location',
    title: '首页'
  },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: '首页',
        affix: true,
        icon: 'el-icon-location'
      }
    }
  ]
}

const testRoute: AppRouteRecordRaw = {
  path: '/test',
  name: 'test',
  redirect: '/test/index',
  component: getParentLayout('TestPage'),
  meta: {
    icon: 'el-icon-setting',
    title: 'test'
  },
  children: [
    {
      path: 'index',
      name: 'test1',
      component: () => import('/@/views/test/index.vue'),
      meta: {
        title: 'test1'
      }
    },
    {
      path: 'test2',
      name: 'test2',
      component: () => import('/@/views/test/test.vue'),
      meta: {
        title: 'test2'
      }
    }
  ]
}
const test2Route: AppRouteRecordRaw = {
  path: '/test0',
  name: 'test3',
  component: () => import('/@/views/test/index.vue'),
  meta: {
    icon: 'el-icon-menu',
    title: 'test0'
  }
}
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  },
  component: LAYOUT,
  children: [home, testRoute, test2Route]
}

export const basicRoutes = [RootRoute]
