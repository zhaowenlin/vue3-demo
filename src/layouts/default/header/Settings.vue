<template>
  <div @click="handleDawer">
    <i class="el-icon-setting"></i>
    <el-drawer
      :z-index="20005"
      :with-header="false"
      :model-value="drawer"
      title="项目设置配置"
      :direction="direction"
    >
      <p class="split-line align-center base-font-color">系统主题</p>
      <div class="theme-block">
        <div class="light" @click="toggleTheme('light')">
          <div class="content" :class="[{ active: active === 'light' }]"></div>
        </div>
        <div class="dark" @click="toggleTheme('dark')">
          <div class="content" :class="[{ active: active === 'dark' }]"></div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { propTypes } from '/@/utils/propType/index'
import { useHeaderSetting } from '/@/utils/hooks/header/useHeaderSetting'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'

export default defineComponent({
  name: 'Settings',
  props: {
    //@ts-ignore
    theme: propTypes.oneOf(['light', 'dark'])
  },
  setup() {
    const drawer = ref<boolean>(false)
    const active = ref<string>('light')
    function handleDawer() {
      drawer.value = !drawer.value
    }
    const { setHeaderSetting } = useHeaderSetting()
    const { setMenuSetting } = useMenuSetting()
    function toggleTheme(theme: string) {
      setHeaderSetting({
        //@ts-ignore
        theme
      })
      setMenuSetting({
        //@ts-ignore
        theme
      })
      active.value = theme
    }
    return {
      toggleTheme,
      active,
      handleDawer,
      drawer,
      direction: 'rtl'
    }
  }
})
</script>

<style lang="scss" scoped>
.theme-block {
  position: relative;
  margin-top: 10px;
  .active {
    border: 2px solid #0960bd;
  }
  .light .content {
    background-color: #f0f2f5;
    cursor: pointer;
    &::before {
      background-color: #fff;
      content: '';
    }
  }
  .dark .content {
    background-color: rgba(0, 21, 41, 0.85);
    &::before {
      background-color: rgba(0, 21, 41, 0.65);
      content: '';
    }
  }
  .light,
  .dark {
    float: left;
    position: relative;
    margin-left: 10px;
    .content {
      position: relative;
      width: 44px;
      height: 36px;
      margin-right: 16px;
      overflow: hidden;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 33%;
        height: 100%;
      }
    }
  }
}
</style>
