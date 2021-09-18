import { ElLoading as loading } from 'element-plus'
import { ILoadingOptions } from 'element-plus/lib/el-loading/src/loading.type'
export function useLoading(opt: ILoadingOptions) {
  return loading.service({
    lock: true,
    spinner: 'el-icon-lock',
    background: 'rgb(0,0,0,0.3)',
    ...opt,
  })
}
