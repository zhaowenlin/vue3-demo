import { ProjectConfig } from '/@/types/config'

import { computed, unref } from 'vue'

import { appStore } from '/@/store/modules/app'
import { ContentEnum } from '/@/enums/appEnum'

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>
const getRootSetting = computed((): RootSetting => appStore.getProjectConfig)

const getShowLogo = computed(() => unref(getRootSetting).showLogo)

const getThemeColor = computed(() => unref(getRootSetting).themeColor)

const getFullContent = computed(() => unref(getRootSetting).fullContent)
const getOpenKeepAlive = computed(() => unref(getRootSetting).openKeepAlive)
const getContentMode = computed(() => unref(getRootSetting).contentMode)

const getPageLoading = computed(() => appStore.getPageLoading)
const getLayoutContentMode = computed(() =>
  unref(getRootSetting).contentMode === ContentEnum.FULL
    ? ContentEnum.FULL
    : ContentEnum.FIXED
)
function setRootSetting(setting: Partial<RootSetting>) {
  appStore.commitProjectConfigState(setting)
}

export function useRootSetting() {
  return {
    setRootSetting,
    getContentMode,
    getPageLoading,
    getFullContent,
    getLayoutContentMode,
    getRootSetting,
    getShowLogo,
    getThemeColor,
    getOpenKeepAlive
  }
}
