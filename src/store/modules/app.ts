import { ProjectConfig } from '/@/types/config'

import {
  VuexModule,
  getModule,
  Module,
  Mutation,
  Action
} from 'vuex-module-decorators'
import store from '/@/store'
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum'

import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'
import { deepMerge } from '/@/utils/main/index'
import { Persistent } from '/@/utils/cache/persistent'

export interface LockInfo {
  pwd: string | undefined
  isLock: boolean
}

let timeId: TimeoutHandle
const NAME = 'app'
hotModuleUnregisterModule(NAME)
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private pageLoadingState = false
  private projectConfigState: ProjectConfig | undefined

  get getPageLoading() {
    return this.pageLoadingState
  }

  get getProjectConfig(): ProjectConfig {
    return this.projectConfigState || ({} as ProjectConfig)
  }

  @Mutation
  commitPageLoadingState(loading: boolean): void {
    this.pageLoadingState = loading
  }

  @Mutation
  commitProjectConfigState(proCfg: DeepPartial<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, proCfg)
    Persistent.setLocal(PROJ_CFG_KEY, this.projectConfigState)
  }

  @Action
  public async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId)
      // Prevent flicker
      timeId = setTimeout(() => {
        this.commitPageLoadingState(loading)
      }, 50)
    } else {
      this.commitPageLoadingState(loading)
      clearTimeout(timeId)
    }
  }
}
export default App
export const appStore = getModule<App>(App)
