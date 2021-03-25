import { useAppProviderContext } from '/@/components/Application/useAppContext'



export const useDesign = (scope: string) => {
  const values = useAppProviderContext()
  return {
    theme: values.theme,
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls
  }
}
