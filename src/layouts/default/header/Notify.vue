<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { propTypes } from '/@/utils/propType/index'

export default defineComponent({
  name: 'Notify',
  props: {
    theme: propTypes.string.def('light')
  },
  setup() {}
})
</script>
