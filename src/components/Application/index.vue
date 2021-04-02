<script lang="ts">
import { PropType } from 'vue'
import { defineComponent, toRefs, h } from 'vue'

import { createAppProviderContext } from './useAppContext'
// type ShallowUnwrap<T> = {
//   [P in keyof T]: UnwrapRef<T[P]>
// }

export default defineComponent({
  name: 'NAppProvider',
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'app-context'
    }
  },
  setup(props, { slots }) {
    const { prefixCls, theme } = toRefs(props)
    createAppProviderContext({ prefixCls, theme })
    return () =>
      h(
        'div',
        {
          className: 'base-layout base-default-layout'
        },
        slots.default?.()
      )
  }
})
</script>
