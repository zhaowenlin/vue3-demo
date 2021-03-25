<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <i v-if="getCollapsed" class="el-icon-s-unfold"></i>
    <i v-else class="el-icon-s-fold"></i>
  </span>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'
import { useDesign } from '/@/utils/hooks/web/useDesign'
import { propTypes } from '/@/utils/propType/index'

export default defineComponent({
  name: 'HeaderTrigger',
  props: {
    theme: propTypes.string.def('light')
  },
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting()
    const { prefixCls } = useDesign('layout-header-trigger')
    return { getCollapsed, toggleCollapsed, prefixCls }
  }
})
</script>
