<template>
  <div :class="getHeaderClass">
    <!-- left start -->
    <div :class="`${prefixCls}-left`">
      <app-Logo
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="getLogoWidth"
      />
      <header-trigger :theme="getHeaderTheme" />
      <layout-breadcrumb :theme="getHeaderTheme" />
    </div>

    <div :class="`${prefixCls}-action`">
      <full-screen :class="`${prefixCls}-action__item fullscreen-item`" />
      <user-dropdown :theme="getHeaderTheme" />
      <settings :class="`${prefixCls}-action__item`" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import AppLogo from './AppLogo.vue'
import HeaderTrigger from './HeaderTrigger.vue'
import FullScreen from './FullScreen.vue'
import LayoutBreadcrumb from './LayoutBreadcrumb.vue'
import Settings from './Settings.vue'
import UserDropdown from './UserDropdown.vue'
import { propTypes } from '/@/utils/propType/index'
import { useHeaderSetting } from '/@/utils/hooks/header/useHeaderSetting'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'
import { useDesign } from '/@/utils/hooks/web/useDesign'

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    AppLogo,
    HeaderTrigger,
    LayoutBreadcrumb,
    FullScreen,
    UserDropdown,
    Settings
  },
  props: {
    fixed: propTypes.bool
  },
  setup(props) {
    const { getHeaderTheme } = useHeaderSetting()
    const { prefixCls } = useDesign('layout-header')
    const { getMenuWidth } = useMenuSetting()
    const getLogoWidth = computed(() => {
      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth)
      return { width: `${width}px` }
    })
    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme)
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--${theme}`]: theme
        }
      ]
    })
    return {
      getLogoWidth,
      prefixCls,
      getHeaderTheme,
      getHeaderClass
    }
  }
})
</script>
<style lang="scss">
@import './index.scss';
</style>
