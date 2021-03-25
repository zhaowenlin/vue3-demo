<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ElLoading } from 'element-plus'
export default defineComponent({
  name: 'Spin',
  setup() {
    ElLoading.service({
      lock: true,
      text: '正在加载中',
      spinner: 'el-icon-lock',
      background: 'rgb(0,0,0,0.3)'
    })
  }
})
</script>
