<!--
 * @Author: cqrcb
 * @Description: logo component
-->
<template>
  <div class="aticon" :class="[prefixCls, theme]" @click="handleGoHome">
    <img src="./image/logo.png" />
    <div
      v-show="showTitle"
      class="ml-2 truncate md:opacity-100"
      :class="[
        `${prefixCls}__title`,
        {
          'xs:opacity-0': !alwaysShowTitle
        }
      ]"
    >
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { useGlobSetting } from '/@/utils/settings/projectSetting'
import { useGo } from '/@/utils/hooks/web/usePage'
import { useDesign } from '/@/utils/hooks/web/useDesign'

import { PageEnum } from '/@/enums/pageEnum'
import { propTypes } from '/@/utils/propType/index'

export default defineComponent({
  name: 'AppLogo',
  props: {
    theme: propTypes.string.def('light'),
    showTitle: propTypes.bool.def(true),
    alwaysShowTitle: propTypes.bool.def(false)
  },
  setup() {
    const { prefixCls } = useDesign('app-logo')

    const { title } = useGlobSetting
    const go = useGo()
    function handleGoHome(): void {
      go(PageEnum.BASE_HOME)
    }

    return {
      handleGoHome,
      title,
      prefixCls
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../../../assets/styles/variable.scss';

.#{$namespace}-app-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;


  &.light &__title {
    color: $primary-color;
  }

  &.dark &__title {
    color: $white;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
  }
}
</style>
