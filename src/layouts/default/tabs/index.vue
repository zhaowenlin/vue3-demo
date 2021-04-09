<template>
  <div :class="getTagsClass" :style="getStyle">
    <el-tag
      v-for="tag in tags"
      :key="tag.path"
      closable
      :disable-transitions="false"
      :effect="tag.path === currentRoute.path ? 'dark' : 'plain'"
      @click="changeRouter(tag)"
      @close="handleClose(tag)"
    >
      {{ tag.meta.title }}
    </el-tag>
  </div>
</template>
<script lang="ts">
import { computed, CSSProperties, defineComponent, unref } from 'vue'
import { useDesign } from '/@/utils/hooks/web/useDesign'
import { useHeaderSetting } from '/@/utils/hooks/header/useHeaderSetting'
import { propTypes } from '/@/utils/propType'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'
import { tabStore } from '/@/store/modules/tab'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Tabs',
  props: {
    fixed: propTypes.bool
  },
  setup(props) {
    const { getHeaderTheme } = useHeaderSetting()
    const { prefixCls } = useDesign('layout-header-tag')

    const getTagsClass = computed(() => {
      const theme = unref(getHeaderTheme)
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--${theme}`]: theme
        }
      ]
    })
    const { getMenuWidth } = useMenuSetting()
    const getStyle = computed((): CSSProperties=> {
      return {
        width: `calc(100% - ${unref(getMenuWidth)}px)`
      }
    })


    // 标签逻辑
    const tags = computed(()=> {
      return tabStore.getTabsState
    })
    function handleClose(tag: RouteLocationNormalizedLoaded) {
      tabStore.closeTabAction(tag)
    }

    function changeRouter(tag: RouteLocationNormalizedLoaded) {
      tabStore.clickTabAction(tag)
    }

    // 当前路由
    const { currentRoute } = useRouter()
    return {
      changeRouter,
      currentRoute,
      tags,
      handleClose,
      getStyle,
      getTagsClass
    }
  }
})
</script>
<style lang="scss">
@import './index.scss';
</style>
