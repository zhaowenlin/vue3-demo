<template>
  <div :class="[prefixCls, getLayoutContentMode]">
    <div
      v-if="getOpenPageLoading"
      v-loading.fullscreen.lock="getOpenPageLoading"
    ></div>
    <PageLayout />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { useDesign } from '/@/utils/hooks/web/useDesign'
import { useRootSetting } from '/@/utils/hooks/root/useRootSetting'
import { useTransitionSetting } from '/@/utils/hooks/transition/useTransitionSetting'
import PageLayout from '/@/layouts/page/index.vue'
import { useContentViewHeight } from './useContentViewHeight'

export default defineComponent({
  name: 'LayoutContent',
  components: { PageLayout },
  setup() {
    const { prefixCls } = useDesign('layout-content')
    const { getOpenPageLoading } = useTransitionSetting()
    const { getLayoutContentMode, getPageLoading } = useRootSetting()

    useContentViewHeight()
    return {
      prefixCls,
      getOpenPageLoading,
      getLayoutContentMode,
      getPageLoading
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
