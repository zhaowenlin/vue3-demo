import { AxiosRequestConfig } from 'axios'
import { timestamp, generateUUID } from '/@/utils/main'
export const requestInterceptors =  config => {
  config.headers = {
    ...config.headers,
    txtChnINo: 'EQUITY',
    apiVersion: '1.0',
    msgTime: timestamp(),
    msgSeq: generateUUID()
  }
  return config
}
export const transformRequestHook = (res, options) => {
  console.log(res, options)
  return res
}
export const beforeRequest= (config: AxiosRequestConfig)=> {
  config.data = {
    body: config.data
  }
  return config
}

