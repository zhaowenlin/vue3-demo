<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            openCache: false,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition
          })
        "
        mode="out-in"
        appear
      >
        <component :is="Component" v-bind="getKey(Component, route)" />
      </transition>
    </template>
  </RouterView>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTransitionSetting } from '/@/utils/useTransitionSetting'
import { useCache, getKey } from './useCache'
import { getTransitionName } from './transition'

export default defineComponent({
  parentView: true,
  setup() {
    const openCache = ref(false)
    const { getCaches } = useCache(false)

    const { getBasicTransition, getEnableTransition } = useTransitionSetting()


    return {
      openCache,
      getCaches,
      getBasicTransition,
      getEnableTransition,
      getTransitionName,
      getKey
    }
  }
})
</script>

