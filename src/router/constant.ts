import ParentLayout from '/@/layouts/page/ParentView.vue'

/**
 * @description: page-layout
 */
export const getParentLayout = (name: string) => {
  return () =>
    new Promise(resolve => {
      resolve({
        ...ParentLayout,
        name
      })
    })
}
export const LAYOUT = () => import('/@/layouts/default/index.vue')
