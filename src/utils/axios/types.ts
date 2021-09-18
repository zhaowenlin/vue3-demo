import type { AxiosRequestConfig } from 'axios'
import type { AxiosTransform } from './axiosTransform'
import { App } from 'vue'
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  loading?: boolean
  loadingText?: string
  lock?: boolean
  ajaxLoaing?: string
  ajaxLock?: string
  confirm?: boolean
  message?: string
  // Splicing request parameters to url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  //  Whether to process the request result
  isTransformRequestResult?: boolean
  // Whether to join url
  joinPrefix?: boolean
  prefix?: string
  // Interface address, use the default apiUrl if you leave it blank
  api?: string
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode
  // Whether to add a timestamp
  joinTime?: boolean
  ignoreCancelToken?: boolean
  beforeRequest?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig | boolean
  afterRequst?:(res:any, data:Result) => void
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  app?: App
  transform?: AxiosTransform
  requestOptions?: RequestOptions
  ext?: any
}

export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Indexable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}
