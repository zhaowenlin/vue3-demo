<template>
  <ElConfigProvider :locale="locale">
    <NAppProvider prefix-cls="demo" theme="primary">
      <router-view />
    </NAppProvider>
  </ElConfigProvider>
</template>

<script lang="ts">

import { ElConfigProvider  } from 'element-plus'
import { defineComponent } from 'vue'
import NAppProvider from './components/Application/index.vue'
import { initAppConfigStore } from './utils/initAppConfig'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  components: {
    NAppProvider,
    [ElConfigProvider.name]: ElConfigProvider,
  },
  setup() {
    initAppConfigStore()
    return {
      locale: zhCn,
    }
  }
})
</script>
<style lang="scss" src="./assets/styles/index.scss"></style>


