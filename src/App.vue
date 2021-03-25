<template>
  <NAppProvider prefix-cls="demo" theme="primary">
    <router-view />
  </NAppProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NAppProvider from './components/Application/index.vue'
import { initAppConfigStore } from './utils/initAppConfig'

export default defineComponent({
  name: 'App',
  components: {
    NAppProvider
  },
  setup() {
    initAppConfigStore()
  }
})
</script>
<style lang="scss" src="./assets/styles/index.scss"></style>
