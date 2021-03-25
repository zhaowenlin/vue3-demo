import { GlobConfig, ProjectConfig } from '../../types/config'
import { ContentEnum, ThemeEnum } from '/@/enums/appEnum'
import { CacheTypeEnum } from '../../enums/cacheEnum'
import { RouterTransitionEnum } from '/@/enums/appEnum'
export const setting: ProjectConfig = {
  showLogo: true,
  themeColor: '#409eff',
  contentMode: ContentEnum.FULL,
  fullContent: false,
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    openPageLoading: false,
    openNProgress: false
  },

  permissionCacheType: CacheTypeEnum.SESSION,
  headerSetting: {
    fixed: true,
    show: true,
    theme: ThemeEnum.LIGHT
  },
  menuSetting: {
    menuWidth: 210,
    theme: ThemeEnum.LIGHT,
    collapsed: false,
    show: true,
    hidden: false
  },
  openKeepAlive: true
}
export const useGlobSetting: GlobConfig = {
  title: 'demo',
  apiUrl: '',
  shortName: '',
  urlPrefix: '',
  uploadUrl: ''
}
