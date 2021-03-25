<template>
  <div :style="getStyle" class="flex">
    <el-scrollbar id="menuList">
      <el-menu
        :class="getMenuClass"
        :collapse="isCollapse"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <template v-for="(v, i) of menus" :key="v.name">
          <el-submenu v-if="v.children" :index="v.children ? i + '' : v.path">
            <template #title>
              <i class="menu-icon" :class="v.meta?.icon"></i>
              <span>{{ v.meta.title }}</span>
            </template>
            <el-menu-item
              v-for="vv of v.children"
              :key="vv.name"
              :index="vv.path"
            >
              {{ vv.meta?.title }}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else class="board-menu" :index="v.path">
            <i class="menu-icon" :class="v.meta?.icon"></i>
            <span>{{ v.meta?.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { RootRoute } from '/@/router/routes/index'
import { computed, CSSProperties, defineComponent, ref, unref } from 'vue'
import { useDesign } from '/@/utils/hooks/web/useDesign'
import { useMenuSetting } from '/@/utils/hooks/menu/useMenuSetting'
import { useGo } from '/@/utils/hooks/web/usePage'
import { useRouter } from 'vue-router'
import { AppRouteRecordRaw } from '/@/router/types'
import { tabStore  } from '/@/store/modules/tab'
export default defineComponent({
  name: 'Menu',
  setup() {
    const menus = ref(RootRoute.children)
    if (!menus.value) return

    const { currentRoute } = useRouter()

    const activeIndex = computed(() => currentRoute.value?.path)

    const routerOptions = menus.value || []
    if (!routerOptions.length) return
    function handleSelect(index: string): void {
      const go = useGo()
      go(index)
      tabStore.addTabAction(currentRoute.value)
    }
    // 处理router数据结构，使其适配菜单模板
    function reverseByMenu(
      menus: AppRouteRecordRaw[],
      parent?: string,
      depth?: number
    ) {
      if (!depth) depth = 0
      menus.forEach((item: any) => {
        item.path = parent ? parent + '/' + item.path : item.path // 拼接path
        if (item.children && item.children instanceof Array) {
          reverseByMenu(item.children, item.path, depth)
        }
      })
      if (depth === 0) {
        return menus
      }
      depth++
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    menus.value = reverseByMenu(routerOptions)
    const { getMenuTheme, getCollapsed } = useMenuSetting()
    const { prefixCls } = useDesign('layout-menu')

    const getMenuClass = computed(() => {
      const theme = unref(getMenuTheme)
      return [
        prefixCls,
        {
          [`${prefixCls}--${theme}`]: theme
        }
      ]
    })
    const { getMenuWidth } = useMenuSetting()
    const getStyle = computed((): CSSProperties=> {
      return {
        flex: `0 0 ${unref(getMenuWidth)}px`
      }
    })
    return {
      getStyle,
      isCollapse: getCollapsed,
      getMenuClass,
      handleSelect,
      menus,
      activeIndex
    }
  }
})
</script>
<style lang="scss">
@import './index.scss';
</style>
