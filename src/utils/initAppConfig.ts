import { appStore } from '/@/store/modules/app'
import { setting as projectSetting } from './settings/projectSetting'
import { tabStore } from '../store/modules/tab'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
export function initAppConfigStore() {
  appStore.commitProjectConfigState(projectSetting)
  const { currentRoute } = useRouter()
  watch(
    () => currentRoute.value,
    () => {
      tabStore.addTabAction(currentRoute.value)
    }
  )

}
