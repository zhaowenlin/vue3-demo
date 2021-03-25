<template>
  <div :class="['main-layout', prefixCls]">
    <LayoutHeader fixed />
    <div class="base-layout base-layout-has-sider">
      <Menu />
      <div :class="['base-layout', `${prefixCls}__main`]">
        <Tabs fixed />
        <LayoutContent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Menu from './menu/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutContent from './content/index.vue'
import Tabs from './tabs/index.vue'

import { useDesign } from '/@/utils/hooks/web/useDesign'

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

    return {
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

  &__main {
    overflow-x: hidden;
    margin-left: 1px;
  }
}
</style>
