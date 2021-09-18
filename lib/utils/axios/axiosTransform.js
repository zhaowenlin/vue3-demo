/**
 * Data processing class, can be configured according to the project
 */
export var AxiosTransform = function AxiosTransform() {
  this.setUrlPrefix = void 0;
  this.beforeRequestHook = void 0;
  this.transformRequestHook = void 0;
  this.requestCatchHook = void 0;
  this.requestInterceptors = void 0;
  this.responseInterceptors = void 0;
  this.requestInterceptorsCatch = void 0;
  this.responseInterceptorsCatch = void 0;
};