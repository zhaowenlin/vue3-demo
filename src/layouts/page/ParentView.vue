<template>
  <div>
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
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" v-bind="getKey(Component, route)" />
          </keep-alive>
          <component :is="Component" v-else v-bind="getKey(Component, route)" />
        </transition>
      </template>
    </RouterView>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { useTransitionSetting } from '/@/utils/useTransitionSetting'
import { useCache, getKey } from './useCache'
import { getTransitionName } from './transition'

export default defineComponent({
  parentView: true,
  setup() {
    const { getCaches } = useCache(false)

    const { getBasicTransition, getEnableTransition } = useTransitionSetting()

    return {
      getCaches,
      getBasicTransition,
      getEnableTransition,
      getTransitionName,
      getKey
    }
  }
})
</script>
