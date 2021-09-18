import _extends from "@babel/runtime/helpers/extends";
// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged
import { VAxios } from "./Axios";
import { checkStatus } from "./checkStatus";
import { useMessage } from "../hooks/web/useMessage";
import { RequestEnum, ResultEnum, ContentTypeEnum } from "../enums/httpEnum";
import { isString, isFunction } from "../is";
import { setObjToUrlParams, deepMerge } from "../main";
import { errorResult } from "./const";
import { createNow, formatRequestDate } from "./helper";

var _useMessage = useMessage(),
    createMessage = _useMessage.createMessage,
    createErrorModal = _useMessage.createErrorModal;
/**
 * @description: 数据处理，方便区分多种处理方式
 */


var transform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestHook: function transformRequestHook(res, options) {
    var isTransformRequestResult = options.isTransformRequestResult; // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启

    if (!isTransformRequestResult) {
      return res.data;
    }

    var data = res.data;

    if (!data) {
      return errorResult;
    } //  这里 code，result，message为 后台统一的字段


    var code = data.code,
        result = data.result,
        _data$message = data.message,
        message = _data$message === void 0 ? '系统错误，请重试~' : _data$message;
    var hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;

    if (!hasSuccess) {
      if (message) {
        // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
        if (options.errorMessageMode === 'modal') {
          createErrorModal({
            title: '错误提示',
            msg: message
          });
        } else if (options.errorMessageMode === 'message') {
          createMessage.error(message);
        }
      }

      Promise.reject(new Error(message));
      return errorResult;
    } // 接口请求成功，直接返回结果


    if (code === ResultEnum.SUCCESS) {
      return result;
    } // 接口请求错误，统一提示错误信息


    if (code === ResultEnum.ERROR) {
      if (message) {
        createMessage.error(data.message);
        Promise.reject(new Error(message));
      } else {
        var msg = '系统错误，请重试~';
        createMessage.error(msg);
        Promise.reject(new Error(msg));
      }

      var _ref = options || {},
          afterRequst = _ref.afterRequst;

      if (afterRequst && isFunction(afterRequst)) {
        afterRequst(result, data);
      }

      return errorResult;
    } // 登录超时


    if (code === ResultEnum.TIMEOUT) {
      var timeoutMsg = '请求超时';
      createErrorModal({
        title: '提示',
        msg: timeoutMsg
      });
      Promise.reject(new Error(timeoutMsg));
      return errorResult;
    }

    return errorResult;
  },
  // 请求之前处理config
  // @ts-ignore
  beforeRequestHook: function beforeRequestHook(config, options) {
    var _config$method;

    if (config === void 0) {
      config = {};
    }

    if (options === void 0) {
      options = {};
    }

    var _options = options,
        joinPrefix = _options.joinPrefix,
        prefix = _options.prefix,
        joinParamsToUrl = _options.joinParamsToUrl,
        formatDate = _options.formatDate,
        _options$joinTime = _options.joinTime,
        joinTime = _options$joinTime === void 0 ? true : _options$joinTime;

    if (joinPrefix) {
      config.url = "" + prefix + config.url;
    } // if (api && isString(api)) {
    //   config.url = `${api}${config.url}`
    // }


    var params = config.params || {};

    if (((_config$method = config.method) == null ? void 0 : _config$method.toUpperCase()) === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, createNow(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + ("" + createNow(joinTime, true));
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        config.data = params;
        config.params = undefined;

        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url, config.data);
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }

    var _options2 = options,
        beforeRequest = _options2.beforeRequest;

    if (beforeRequest && isFunction(beforeRequest)) {
      var cfg = beforeRequest(config, options);
      if (!cfg) return;
    }

    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: function requestInterceptors(config) {
    // 请求之前处理config
    // const token = userStore.getTokenState
    // if (token) {
    //   // jwt token
    //   config.headers.Authorization = token
    // }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: function responseInterceptorsCatch(error) {
    var _response$data$error$, _response$data, _response$data$error, _error$toString, _error$response;

    // errorStore.setupErrorHandle(error)
    var _ref2 = error || {},
        response = _ref2.response,
        code = _ref2.code,
        message = _ref2.message;

    var msg = (_response$data$error$ = response == null ? void 0 : (_response$data = response.data) == null ? void 0 : (_response$data$error = _response$data.error) == null ? void 0 : _response$data$error.message) != null ? _response$data$error$ : '';
    var err = (_error$toString = error == null ? void 0 : error.toString == null ? void 0 : error.toString()) != null ? _error$toString : '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        createMessage.error('请求超时');
      }

      if (err != null && err.includes('Network Error')) {
        createMessage.error('网络错误');
      }
    } catch (error) {
      throw new Error(error);
    }

    checkStatus(error == null ? void 0 : (_error$response = error.response) == null ? void 0 : _error$response.status, msg);
    return Promise.reject(error);
  }
};
export function createAxios(app, opt) {
  var _opt$ext;

  app.config.globalProperties.$ajax = new VAxios(deepMerge({
    timeout: 10 * 1000,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    // 如果是form-data格式
    // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
    // 数据处理方式
    transform: _extends({}, transform, (_opt$ext = opt.ext) == null ? void 0 : _opt$ext.transform),
    // 配置项，下面的选项都可以在独立的接口请求中覆盖
    requestOptions: _extends({
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
      ignoreCancelToken: true
    }, (opt == null ? void 0 : opt.requestOptions) || {})
  }, opt || {}));
}