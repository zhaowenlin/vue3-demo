<template>
  <div :class="getContentClass" :style="getStyle">
    <div
      v-if="getOpenPageLoading"
      v-loading.fullscreen.lock="getOpenPageLoading"
    ></div>
    <PageLayout />
  </div>
</template>
<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'

import { useDesign } from '/@/utils/hooks/web/useDesign'
import { useRootSetting } from '/@/utils/hooks/root/useRootSetting'
import { useTransitionSetting } from '/@/utils/hooks/transition/useTransitionSetting'
import PageLayout from '/@/layouts/page/index.vue'
import { useContentViewHeight } from './useContentViewHeight'
import { useHeaderSetting } from '/@/utils/hooks/header/useHeaderSetting'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'

export default defineComponent({
  name: 'LayoutContent',
  components: { PageLayout },
  setup() {
    const { prefixCls } = useDesign('layout-content')
    const { getOpenPageLoading } = useTransitionSetting()
    const { getLayoutContentMode, getPageLoading } = useRootSetting()

    const { getHeaderTheme } = useHeaderSetting()

    const getContentClass = computed(() => {
      const theme = unref(getHeaderTheme)
      return [
        prefixCls,
        getLayoutContentMode,
        {
          [`${prefixCls}--${theme}`]: theme
        }
      ]
    })
    const { getMenuWidth } = useMenuSetting()
    const getStyle = computed((): CSSProperties=> {
      return {
        width: `calc(100% - ${unref(getMenuWidth)}px)`,
        marginLeft: `${unref(getMenuWidth)}px`,
        marginTop: '88px'
      }
    })

    useContentViewHeight()
    return {
      getStyle,
      getContentClass,
      prefixCls,
      getOpenPageLoading,
      getLayoutContentMode,
      getPageLoading
    }
  }
})
</script>
<style lang="scss" scoped>
@import '/@/assets/styles/index.scss';
.#{$namespace}-layout-content {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;

  &--dark {
    background-color: $black;
  }

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

