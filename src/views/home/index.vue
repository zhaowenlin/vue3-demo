<template>
  <div>
    <div @click="clickme">click</div>
  </div>
</template>
<script lang="ts">
import { useDesign } from '/@/utils/hooks/web/useDesign'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup(props, a) {
    // const { ctx } = getCurrentInstance()
    const { prefixCls } = useDesign('app-logo')
    const clickme = () => {
      // ctx.$ajax.post(
      //   {
      //     url: './test'
      //   },
      //   {
      //     confirm: true,
      //     message: '你确定要？'
      //   }
      // )
      console.log('00000', props, a, prefixCls)
    }
    return {
      clickme
    }
  }
})
</script>
