<template>
  <div class="page-layout">
    <RouterView>
      <template #default="{ Component, route }">
        <transition
          :name="
            getTransitionName({
              route,
              openCache,
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTransitionSetting } from '/@/utils/useTransitionSetting'
import { useCache, getKey } from './useCache'
import { getTransitionName } from './transition'

export default defineComponent({
  name: 'PageLayout',
  setup() {
    const { getCaches } = useCache(false)
    const openCache = false

    const { getBasicTransition, getEnableTransition } = useTransitionSetting()

    return {
      openCache,
      getTransitionName,
      getEnableTransition,
      getBasicTransition,
      getCaches,
      getKey
    }
  }
})
</script>
<style lang="scss">
@import '/@/assets/styles/variable.scss';
.#{namespace}-layout-content {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;

  &.fixed {
    width: 1200px;
    margin: 0 auto;
  }

  &-loading {
    position: absolute;
    top: 200px;
    z-index: $page-loading-z-index;
  }
}
</style>
