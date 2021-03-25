<template>
  <el-tooltip content="全屏" placement="bottom">
    <span @click="toggleFullscreen">
      <i v-if="!isFullscreen" class="el-icon-full-screen"></i>
      <i v-else class="el-icon-aim"></i>
    </span>
  </el-tooltip>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue'
export default defineComponent({
  name: 'FullScreen',
  setup() {
    const isFullscreenRef = ref<boolean>(false)
    const target = ref(document.documentElement)
    const el = document.documentElement
    let RFC_METHOD_NAME = 'requestFullscreen'
    let EFS_METHOD_NAME = 'exitFullscreen'
    let FSE_PROP_NAME = 'fullscreenElement'
    if ('webkitRequestFullScreen' in el) {
      RFC_METHOD_NAME = 'webkitRequestFullScreen'
      EFS_METHOD_NAME = 'webkitExitFullscreen'
      FSE_PROP_NAME = 'webkitFullscreenElement'
    } else if ('msRequestFullscreen' in el) {
      RFC_METHOD_NAME = 'msRequestFullscreen'
      EFS_METHOD_NAME = 'msExitFullscreen'
      FSE_PROP_NAME = 'msFullscreenElement'
    } else if ('mozRequestFullScreen' in el) {
      RFC_METHOD_NAME = 'mozRequestFullScreen'
      EFS_METHOD_NAME = 'mozCancelFullScreen'
      FSE_PROP_NAME = 'mozFullScreenElement'
    } else if (!('requestFullscreen' in el)) {
      throw new Error('当前浏览器不支持Fullscreen API !')
    }
    function isFullscreen(): boolean {
      return unref(target) === (document as any)[FSE_PROP_NAME]
    }
    function enterFullscreen(): Promise<void> {
      isFullscreenRef.value = true
      return (unref(target) as any)[RFC_METHOD_NAME]()
    }
    function exitFullscreen(): Promise<void> {
      isFullscreenRef.value = false
      return (document as any)[EFS_METHOD_NAME]()
    }
    function toggleFullscreen() {
      if (!unref(target)) return
      return isFullscreen() ? exitFullscreen() : enterFullscreen()
    }
    return {
      isFullscreen: isFullscreenRef,
      toggleFullscreen
    }
  }
})
</script>
