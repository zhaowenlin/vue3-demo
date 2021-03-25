import { MenuSetting } from '/@/types/config'

import { computed, unref } from 'vue'

import { appStore } from '/@/store/modules/app'

const getMenuSetting = computed(() => appStore.getProjectConfig.menuSetting)

const getCollapsed = computed(() => unref(getMenuSetting).collapsed)

const getMenuWidth = computed(() => unref(getMenuSetting).menuWidth)
const getMenuTheme = computed(() => unref(getMenuSetting).theme)

function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
  appStore.commitProjectConfigState({ menuSetting })
}


function toggleCollapsed() {
  setMenuSetting({
    collapsed: !unref(getCollapsed),
    menuWidth: unref(getCollapsed) ? 210 : 64
  })
}



export function useMenuSetting() {
  return {
    setMenuSetting,

    toggleCollapsed,
    getMenuTheme,
    getMenuWidth,
    getCollapsed
  }
}
