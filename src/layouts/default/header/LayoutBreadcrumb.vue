<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="breadcrumb in breadcrumbs"
        :key="breadcrumb.path"
        :to="{ path: breadcrumb.path }"
      >
        {{ breadcrumb.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useDesign } from '/@/utils/hooks/web/useDesign'
import { propTypes } from '/@/utils/propType/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LayoutBreadcrumb',
  props: {
    theme: propTypes.string.def('light')
  },
  setup() {
    const { currentRoute } = useRouter()

    const { prefixCls } = useDesign('layout-breadcrumb')
    const matched = currentRoute.value?.matched
    if (!matched || matched.length === 0) return
    const breadcrumbs = computed(() => {
      return currentRoute.value?.matched.filter((item) => {
        return item.name !== 'Root' && !item.meta?.hideBreadcrumb
      })
    })
    return { prefixCls, breadcrumbs }
  }
})
</script>
