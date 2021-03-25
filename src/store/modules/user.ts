import { VuexModule, getModule, Module, Mutation } from 'vuex-module-decorators'
import store from '/@/store'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper'
import { Persistent, BasicKeys } from '/@/utils/cache/persistent'
import { GetUserInfoByUserIdModel } from '/@/model/user'
import { CacheTypeEnum, USER_INFO_KEY } from '../../enums/cacheEnum'
import { setting as projectSetting } from '/@/utils/settings/projectSetting'

export interface LockInfo {
  pwd: string | undefined
  isLock: boolean
}
export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>
console.log(projectSetting)
const { permissionCacheType } = projectSetting
console.log(projectSetting)
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL
function getCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession
  return fn(key) as T
}

function setCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession
  return fn(key, value)
}
const NAME = 'user-info'
hotModuleUnregisterModule(NAME)
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class User extends VuexModule {
  // user info
  private userInfoState: UserInfo | null = null
  get getUserInfoState() {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {}
  }

  @Mutation
  commitUserInfoState(info: UserInfo): void {
    this.userInfoState = info
    setCache(USER_INFO_KEY, info)
  }
}
export const userStore = getModule<User>(User)
