<template>
  <el-dropdown trigger="click">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name`" class="truncate">
          {{ getUserInfo.realName || 'demo' }}
        </span>
      </span>
    </span>
    <template #dropdown>
      <el-dropdown-item @click="logout">退出</el-dropdown-item>
    </template>
  </el-dropdown>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { propTypes } from '/@/utils/propType/index'
import { userStore } from '/@/store/modules/user'
import { useDesign } from '/@/utils/hooks/web/useDesign'
export default defineComponent({
  name: 'UserDropdown',
  props: {
    theme: propTypes.string.def('light')
  },
  setup() {
    const { prefixCls } = useDesign('header-user-dropdown')
    const getUserInfo = computed(() => {
      const { realName = '', desc } = userStore.getUserInfoState || {}
      return { realName, desc }
    })
    function logout(): boolean {
      return false
      console.log('logout')
    }
    return { getUserInfo, prefixCls, logout }
  }
})
</script>
