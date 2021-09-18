import { FunctionalComponent } from 'vue'
import { RouteLocation } from 'vue-router'
import { computed, ref, unref } from 'vue'
import { tryTsxEmit } from '/@/utils/helper/vuexHelper'
import { tabStore, PAGE_LAYOUT_KEY } from '/@/store/modules/tab'

import { useRouter } from 'vue-router'
import { useRootSetting } from '/@/utils/hooks/root/useRootSetting'

export function getKey(
  component: FunctionalComponent & { type: Indexable; },
  route: RouteLocation
) {
  return !!component?.type.parentView ? {} : { key: route.fullPath }
}

export function useCache(isPage: boolean) {
  const name = ref('')
  const { currentRoute } = useRouter()

  tryTsxEmit(() => {
    const matched = currentRoute.value?.matched
    if (!matched) {
      return
    }
    const len = matched.length
    if (len < 2) return
    name.value = matched[len - 2].name as string
  })

  const { getOpenKeepAlive } = useRootSetting()

  const getCaches = computed((): string[] => {
    if (!unref(getOpenKeepAlive)) {
      return []
    }
    const cached = tabStore.getCachedMapState

    if (isPage) {
      //  page Layout
      return cached.get(PAGE_LAYOUT_KEY) || []
    }
    const cacheSet = new Set<string>()
    cacheSet.add(unref(name))

    const list = cached.get(unref(name))

    if (!list) {
      return Array.from(cacheSet)
    }
    list.forEach(item => {
      cacheSet.add(item)
    })

    return Array.from(cacheSet)
  })
  return { getCaches }
}
