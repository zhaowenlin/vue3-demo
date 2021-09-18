// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { CreateAxiosOptions, RequestOptions, Result } from './types'
import { VAxios } from './Axios'
import { AxiosTransform } from './axiosTransform'

import { checkStatus } from './checkStatus'

import { useMessage } from '/@/utils/hooks/web/useMessage'

import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/httpEnum'

import { isString, isFunction } from '../is'
import { setObjToUrlParams, deepMerge } from '../main'
import { errorResult } from './const'
import { createNow, formatRequestDate } from './helper'
import { App } from 'vue'


const { createMessage, createErrorModal } = useMessage()

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {

  /**
   * @description: 处理请求数据
   */
  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformRequestResult } = options
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformRequestResult) {
      return res.data
    }

    const { data } = res
    if (!data) {
      return errorResult
    }
    //  这里 code，result，message为 后台统一的字段
    const { code, result, message = '系统错误，请重试~' } = data

    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (!hasSuccess) {
      if (message) {
        // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        if (options.errorMessageMode === 'modal') {
          createErrorModal({ title: '错误提示', msg: message })
        } else if (options.errorMessageMode === 'message') {
          createMessage.error(message)
        }
      }
      Promise.reject(new Error(message))
      return errorResult
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return result
    }
    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR) {
      if (message) {
        createMessage.error(data.message)
        Promise.reject(new Error(message))
      } else {
        const msg = '系统错误，请重试~'
        createMessage.error(msg)
        Promise.reject(new Error(msg))
      }
      const { afterRequst } = options || {}
      if (afterRequst && isFunction(afterRequst)) {
        afterRequst(result, data)
      }
      return errorResult
    }
    // 登录超时
    if (code === ResultEnum.TIMEOUT) {
      const timeoutMsg = '请求超时'
      createErrorModal({
        title: '提示',
        msg: timeoutMsg,
      })
      Promise.reject(new Error(timeoutMsg))
      return errorResult
    }
    return errorResult
  },

  // 请求之前处理config
  // @ts-ignore
  beforeRequestHook: (config: AxiosRequestConfig = {}, options: RequestOptions = {}) => {
    const { joinPrefix, prefix, joinParamsToUrl, formatDate, joinTime = true } = options

    if (joinPrefix) {
      config.url = `${prefix}${config.url}`
    }

    // if (api && isString(api)) {
    //   config.url = `${api}${config.url}`
    // }
    const params = config.params || {}
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, createNow(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        config.data = params
        config.params = undefined
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, config.data)
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    const { beforeRequest } = options
    if (beforeRequest && isFunction(beforeRequest)) {
      const cfg = beforeRequest(config, options)
      if (!cfg) return
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: config => {
    // 请求之前处理config
    // const token = userStore.getTokenState
    // if (token) {
    //   // jwt token
    //   config.headers.Authorization = token
    // }
    return config
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    // errorStore.setupErrorHandle(error)
    const { response, message } = error || {}
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    try {
      if (message.indexOf('timeout') !== -1) {
        createMessage.error('请求超时')
      }
      if (err?.includes('Network Error')) {
        createMessage.error('网络错误')
      }
    } catch (err: any) {
      throw new Error(err)
    }
    checkStatus(error?.response?.status, msg)
    return Promise.reject(error)
  },
}

export function createAxios(app: App, opt?: Partial<CreateAxiosOptions>) {
  app.config.globalProperties.$ajax = new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: {
          ...transform,
          ...opt?.ext?.transform
        },
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          ...(opt?.requestOptions || {})
        },
      },
      opt || {},
    ),
  )
}
