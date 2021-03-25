<template>
  <div :class="geBoxClass" :style="{ height: !loading ? 'initial' : '100%' }">
    <Header />
  </div>
</template>
<script lang="ts">
import { useDesign } from '/@/utils/hooks/web/useDesign'
import { appStore } from '/@/store/modules/app'
import { defineComponent } from 'vue'
// import Header from '/@/components/Header/index.vue'
export default defineComponent({
  name: 'Land',
  components: {
    // Header,
  },
  setup() {
    const { prefixCls, theme } = useDesign('app-land')
    const geBoxClass = [theme + '-layout', prefixCls]
    appStore.commitProjectConfigState({ themeColor: '#0000000' })
    console.log(appStore.getProjectConfig)

    return {
      prefixCls,
      geBoxClass,
      loading: true
    }
  }
})
</script>
<style lang="scss" scoped>
@import '/@/assets/styles/primary.scss';
@import '/@/assets/styles/index.scss';
.#{$namespace}-app-land {
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
}
</style>
