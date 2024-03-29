import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { useMessage } from '/@/utils/hooks/web/useMessage'
import { useLoading } from '/@/utils/hooks/web/useLoading'
import axios from 'axios'
import { AxiosCanceler } from './axiosCancel'
import { isFunction } from '../is'
import { cloneDeep } from 'lodash-es'

import type { RequestOptions, CreateAxiosOptions, Result, UploadFileParams } from './types'
import { errorResult } from './const'
import { ContentTypeEnum, RequestEnum } from '/@/enums/httpEnum'
export * from './axiosTransform'

/**
 * @description:  axios module
 */
export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;
  private lockCount: number
  private LockInstance: any

  constructor(options: CreateAxiosOptions) {
    this.lockCount = 0
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }


  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }


  /**
   * @description: Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    const axiosCanceler = new AxiosCanceler()

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      const {
        headers: { ignoreCancelToken },
      } = config

      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken

      !ignoreCancel && axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config)
      }
      return config
    }, undefined)

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()

    if (params.data) {
      Object.keys(params.data).forEach(key => {
        if (!params.data) return
        const value = params.data[key]
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data[key])
      })
    }

    formData.append(params.name || 'file', params.file, params.filename)

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    })
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = this.options?.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: JSON.stringify(config.data),
    }
  }

  public get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  public post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  public put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  public delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  requestLifeCycle(methodType: string, name: string, options: RequestOptions): void {
    const { lock,  ajaxLock, loadingText } = options
    const canLock = ['POST', 'PUT', 'DELETE'].includes(methodType)
    const combineLock = lock === false ? false : canLock ? lock || ajaxLock : false
    if (name === 'start') {
      if (combineLock) {
        this.lockCount++
        if (!this.LockInstance) {
          // TODO:增加loading实例
          this.LockInstance = useLoading({ target: ajaxLock , text: loadingText })
        }
      }

    } else {
      if (combineLock) {
        this.lockCount--
        if (this.LockInstance && this.lockCount <= 0) {
          this.LockInstance.close()
          this.lockCount = 0
          this.LockInstance = null
        }
      }
    }
  }

  sendQuest<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    this.requestLifeCycle(config.method || 'get', 'start', options || {})
    let conf: AxiosRequestConfig = cloneDeep(config)

    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}


    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }

    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            const ret = transformRequestHook(res, opt)
            ret !== errorResult ? resolve(ret) : reject(new Error('request error!'))
            return
          }
          resolve((res as unknown) as Promise<T>)
        })
        .catch((e: Error) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e))
            return
          }
          reject(e)
        }).finally(() => {
          setTimeout(() => {
            this.requestLifeCycle(config.method || 'get', 'end', options || {})
          }, 400)
        })
    })
  }

  async request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    options = { lock: true, loadingText: '正在加载中...' , ajaxLock: this.options?.requestOptions?.ajaxLock || '',  ...options }
    if (options && options.confirm) {
      const { createConfirm } = useMessage()
      return new Promise((resolve, reject) => {
        createConfirm(options?.message || '', '', {
          type: 'warning',
          callback: (action: string) => {
            if (action === 'confirm') {
              resolve(this.sendQuest(config, options))
            } else {
              reject('你已取消')
            }
          },
        })
      })

    } else {
      return this.sendQuest(config, options)
    }
  }
}
