import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _extends from "@babel/runtime/helpers/extends";
import _cloneDeep from "lodash-es/cloneDeep";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { useMessage } from "../hooks/web/useMessage";
import { useLoading } from "../hooks/web/useLoading";
import axios from 'axios';
import { AxiosCanceler } from "./axiosCancel";
import { isFunction } from "../is";
import { errorResult } from "./const";
import { ContentTypeEnum, RequestEnum } from "../enums/httpEnum";
export * from "./axiosTransform";
/**
 * @description:  axios module
 */

export var VAxios = /*#__PURE__*/function () {
  function VAxios(options) {
    this.axiosInstance = void 0;
    this.options = void 0;
    this.lockCount = void 0;
    this.LockInstance = void 0;
    this.lockCount = 0;
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  var _proto = VAxios.prototype;

  _proto.getTransform = function getTransform() {
    var transform = this.options.transform;
    return transform;
  };

  _proto.getAxios = function getAxios() {
    return this.axiosInstance;
  }
  /**
   * @description: Set general header
   */
  ;

  _proto.setHeader = function setHeader(headers) {
    if (!this.axiosInstance) {
      return;
    }

    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
  /**
   * @description: Interceptor configuration
   */
  ;

  _proto.setupInterceptors = function setupInterceptors() {
    var _this = this;

    var transform = this.getTransform();

    if (!transform) {
      return;
    }

    var requestInterceptors = transform.requestInterceptors,
        requestInterceptorsCatch = transform.requestInterceptorsCatch,
        responseInterceptors = transform.responseInterceptors,
        responseInterceptorsCatch = transform.responseInterceptorsCatch;
    var axiosCanceler = new AxiosCanceler(); // Request interceptor configuration processing

    this.axiosInstance.interceptors.request.use(function (config) {
      var _this$options$request;

      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      var _config = config,
          ignoreCancelToken = _config.headers.ignoreCancelToken;
      var ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : (_this$options$request = _this.options.requestOptions) == null ? void 0 : _this$options$request.ignoreCancelToken;
      !ignoreCancel && axiosCanceler.addPending(config);

      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }

      return config;
    }, undefined); // Request interceptor error capture

    requestInterceptorsCatch && isFunction(requestInterceptorsCatch) && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch); // Response result interceptor processing

    this.axiosInstance.interceptors.response.use(function (res) {
      res && axiosCanceler.removePending(res.config);

      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }

      return res;
    }, undefined); // Response result interceptor error capture

    responseInterceptorsCatch && isFunction(responseInterceptorsCatch) && this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }
  /**
   * @description:  File Upload
   */
  ;

  _proto.uploadFile = function uploadFile(config, params) {
    var formData = new window.FormData();

    if (params.data) {
      Object.keys(params.data).forEach(function (key) {
        if (!params.data) return;
        var value = params.data[key];

        if (Array.isArray(value)) {
          value.forEach(function (item) {
            formData.append(key + "[]", item);
          });
          return;
        }

        formData.append(key, params.data[key]);
      });
    }

    formData.append(params.name || 'file', params.file, params.filename);
    return this.axiosInstance.request(_extends({}, config, {
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true
      }
    }));
  } // support form-data
  ;

  _proto.supportFormData = function supportFormData(config) {
    var _this$options, _config$method;

    var headers = (_this$options = this.options) == null ? void 0 : _this$options.headers;
    var contentType = (headers == null ? void 0 : headers['Content-Type']) || (headers == null ? void 0 : headers['content-type']);

    if (contentType !== ContentTypeEnum.FORM_URLENCODED || !Reflect.has(config, 'data') || ((_config$method = config.method) == null ? void 0 : _config$method.toUpperCase()) === RequestEnum.GET) {
      return config;
    }

    return _extends({}, config, {
      data: JSON.stringify(config.data)
    });
  };

  _proto.get = function get(config, options) {
    return this.request(_extends({}, config, {
      method: 'GET'
    }), options);
  };

  _proto.post = function post(config, options) {
    return this.request(_extends({}, config, {
      method: 'POST'
    }), options);
  };

  _proto.put = function put(config, options) {
    return this.request(_extends({}, config, {
      method: 'PUT'
    }), options);
  };

  _proto.delete = function _delete(config, options) {
    return this.request(_extends({}, config, {
      method: 'DELETE'
    }), options);
  };

  _proto.requestLifeCycle = function requestLifeCycle(methodType, name, options) {
    var lock = options.lock,
        ajaxLock = options.ajaxLock;
    var canLock = ['POST', 'PUT', 'DELETE'].includes(methodType);
    var combineLock = lock === false ? false : canLock ? lock || ajaxLock : false;

    if (name === 'start') {
      if (combineLock) {
        this.lockCount++;

        if (!this.LockInstance) {
          // TODO:增加loading实例
          this.LockInstance = useLoading(ajaxLock || '');
        }
      }
    } else {
      if (combineLock) {
        this.lockCount--;

        if (this.LockInstance && this.lockCount <= 0) {
          this.LockInstance.close();
          this.lockCount = 0;
          this.LockInstance = null;
        }
      }
    }
  };

  _proto.sendQuest = function sendQuest(config, options) {
    var _this2 = this;

    this.requestLifeCycle(config.method || 'get', 'start', options || {});

    var conf = _cloneDeep(config);

    var transform = this.getTransform();
    var requestOptions = this.options.requestOptions;
    var opt = Object.assign({}, requestOptions, options);

    var _ref = transform || {},
        beforeRequestHook = _ref.beforeRequestHook,
        requestCatchHook = _ref.requestCatchHook,
        transformRequestHook = _ref.transformRequestHook;

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }

    conf = this.supportFormData(conf);
    return new Promise(function (resolve, reject) {
      _this2.axiosInstance.request(conf).then(function (res) {
        if (transformRequestHook && isFunction(transformRequestHook)) {
          var ret = transformRequestHook(res, opt);
          ret !== errorResult ? resolve(ret) : reject(new Error('request error!'));
          return;
        }

        resolve(res);
      }).catch(function (e) {
        if (requestCatchHook && isFunction(requestCatchHook)) {
          reject(requestCatchHook(e));
          return;
        }

        reject(e);
      }).finally(function () {
        setTimeout(function () {
          _this2.requestLifeCycle(config.method || 'get', 'end', options || {});
        }, 400);
      });
    });
  };

  _proto.request = /*#__PURE__*/function () {
    var _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(config, options) {
      var _this3 = this;

      var _useMessage, createConfirm;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = _extends({
                lock: true,
                ajaxLock: '正在请求...'
              }, options);

              if (!(options && options.confirm)) {
                _context.next = 6;
                break;
              }

              _useMessage = useMessage(), createConfirm = _useMessage.createConfirm;
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                var _options;

                createConfirm(((_options = options) == null ? void 0 : _options.message) || '', '', {
                  type: 'warning',
                  callback: function callback(action) {
                    if (action === 'confirm') {
                      resolve(_this3.sendQuest(config, options));
                    } else {
                      reject('你已取消');
                    }
                  }
                });
              }));

            case 6:
              return _context.abrupt("return", this.sendQuest(config, options));

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function request(_x, _x2) {
      return _request.apply(this, arguments);
    }

    return request;
  }();

  return VAxios;
}();