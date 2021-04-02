import { HeaderSetting } from '/@/types/config'

import { computed, unref } from 'vue'

import { appStore } from '/@/store/modules/app'

import { useFullContent } from '../content/useFullContent'
import { useRootSetting } from '../root/useRootSetting'

const { getFullContent } = useFullContent()

const { getShowLogo } = useRootSetting()


// Get header configuration
const getHeaderSetting = computed(() => appStore.getProjectConfig.headerSetting)

const getHeaderTheme = computed(() => unref(getHeaderSetting).theme)

const getShowHeader = computed(() => unref(getHeaderSetting).show)

const getFixed = computed(() => unref(getHeaderSetting).fixed)

const getShowFullHeaderRef = computed(() => {
  return !unref(getFullContent) && unref(getShowHeader)
})

const getShowInsetHeaderRef = computed(() => {
  const need = !unref(getFullContent) && unref(getShowHeader)
  return need
})
const getUnFixedAndFull = computed(
  () => !unref(getFixed) && !unref(getShowFullHeaderRef)
)

const getShowBread = computed(() => {
  return true
})

const getShowHeaderLogo = computed(() => {
  return unref(getShowLogo)
})

const getShowContent = computed(() => {
  return unref(getShowBread)
})

// Set header configuration
function setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
  appStore.commitProjectConfigState({ headerSetting })
}

export function useHeaderSetting() {
  return {
    setHeaderSetting,

    getHeaderSetting,

    getHeaderTheme,
    getShowBread,
    getShowContent,
    getShowHeaderLogo,
    getShowHeader,
    getFixed,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull
  }
}
