import { ThemeEnum, RouterTransitionEnum, ContentEnum } from '../enums/appEnum'
import { CacheTypeEnum } from '../enums/cacheEnum'
export type ThemeMode = 'dark' | 'light'

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko'

export interface MultiTabsSetting {
  show: boolean
  showQuick: boolean
  canDrag: boolean
  showRedo: boolean
  showFold: boolean
}

export interface HeaderSetting {
  fixed: boolean
  show: boolean
  theme: ThemeEnum
}

export interface MenuSetting {
  collapsed: boolean
  show: boolean
  hidden: boolean
  menuWidth: number
  theme: ThemeEnum
}

export interface LocaleSetting {
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

declare type TimeoutHandle = ReturnType<typeof setTimeout>

export interface ProjectConfig {
  fullContent: boolean
  showLogo: boolean
  themeColor: string
  permissionCacheType: CacheTypeEnum
  headerSetting: HeaderSetting
  menuSetting: MenuSetting
  transitionSetting: TransitionSetting
  contentMode: ContentEnum
  openKeepAlive: boolean
}

export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  apiUrl: string
  // Upload url
  uploadUrl?: string
  //  Service interface url prefix
  urlPrefix?: string
  // Project abbreviation
  shortName: string
}
export interface GlobEnvConfig {
  // Site title
  _GLOB_APP_TITLE: string
  // Service interface url
  _GLOB_API_URL: string
  // Service interface url prefix
  _GLOB_API_URL_PREFIX?: string
  // Project abbreviation
  _GLOB_APP_SHORT_NAME: string
  // Upload url
  _GLOB_UPLOAD_URL?: string
}
