import { InjectionKey, Ref } from 'vue'
import { createContext, CreateContextOptions, useContext } from './useContext'

export interface AppProviderContextProps {
  prefixCls: Ref<string>
  theme: Ref<string>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(
  context: AppProviderContextProps,
  options?: CreateContextOptions
) {
  return createContext<AppProviderContextProps>(context, key, options)
}

export const useAppProviderContext = () => {
  return useContext<AppProviderContextProps>(key)
}
