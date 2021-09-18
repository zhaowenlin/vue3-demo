import { ElLoading as loading } from 'element-plus';
export function useLoading(text) {
  return loading.service({
    lock: true,
    text: text,
    spinner: 'el-icon-lock',
    background: 'rgb(0,0,0,0.3)'
  });
}