<template>
  <div :class="['main-layout', prefixCls]">
    <LayoutHeader fixed />
    <div class="base-layout base-layout-has-sider">
      <Menu />
      <div :class="getClass">
        <Tabs fixed />
        <LayoutContent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue'
import Menu from './menu/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutContent from './content/index.vue'
import Tabs from './tabs/index.vue'

import { useDesign } from '/@/utils/hooks/web/useDesign'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    LayoutHeader,
    LayoutContent,
    Menu,
    Tabs
  },
  setup() {
    const { prefixCls } = useDesign('default-layout')
    const { getMenuTheme } = useMenuSetting()
    const getClass = computed(()=> {
      const theme = unref(getMenuTheme)
      return [
        `${prefixCls}__main`,
        'base-layout',
        {
          [`${prefixCls}--${theme}`]: theme
        }]
    })

    return {
      getClass,
      theme: getMenuTheme,
      prefixCls
    }
  }
})
</script>
<style lang="scss">
@import '/@/assets/styles/index.scss';
.#{$namespace}-default-layout {
  display: flex;
  width: 100%;
  min-height: 100%;
  background: $transport-gray;
  flex-direction: column;

  > .main-layout {
    min-height: 100%;
  }
  &--dark {
    background-color: $black;
  }
  &__main {
    overflow-x: hidden;
    margin-left: 1px;

  }
}
</style>
