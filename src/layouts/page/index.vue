<template>
  <div :class="getContentClass">
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
import { computed, defineComponent, unref } from 'vue'
import { useTransitionSetting } from '/@/utils/useTransitionSetting'
import { useCache, getKey } from './useCache'
import { getTransitionName } from './transition'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'

export default defineComponent({
  name: 'PageLayout',
  setup() {
    const { getCaches } = useCache(false)
    const openCache = false
    const { getMenuTheme } = useMenuSetting()
    const getContentClass = computed(() => {
      const theme = unref(getMenuTheme)
      return [
        'page-layout',
        {
          [`page-layout--${theme}`]: theme
        }
      ]
    })

    const { getBasicTransition, getEnableTransition } = useTransitionSetting()

    return {
      getContentClass,
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
.page-layout {
  &--dark {
    color: $white;
    .el-card {
      border: 0;
      background-color: $light-black;
      color: $white;
    }

    .split-line {
      border-bottom: 1px solid $black;
    }

    .el-form-item__label,
    .el-checkbox,
    .el-radio,
    .el-range-separator,
    .el-table th,
    .el-table tr,
    .el-pagination {
      color: $white;
    }

    .el-table__body tr.hover-row > td {
      background-color: $black;
    }

    .el-input__inner,
    .el-popper,
    input,
    .el-switch__core,
    .el-table th,
    .el-table tr,
    .el-pager li,
    .el-pagination button:disabled,
    .el-pagination .btn-next,
    .el-pagination .btn-prev,
    .el-table__empty-block {
      background-color: $light-black;
    }

    .el-button--default {
      background-color: $light-black;
      color: $white;
      &:active {
        color: $white;
        border-color: $white;
      }
    }
  }
}
</style>
