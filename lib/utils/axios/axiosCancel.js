import axios from 'axios';
import { isFunction } from "../is"; // Used to store the identification and cancellation function of each request

var pendingMap = new Map();
export var getPendingUrl = function getPendingUrl(config) {
  return [config.method, config.url].join('&');
};
export var AxiosCanceler = /*#__PURE__*/function () {
  function AxiosCanceler() {}

  var _proto = AxiosCanceler.prototype;

  /**
   * Add request
   * @param {Object} config
   */
  _proto.addPending = function addPending(config) {
    this.removePending(config);
    var url = getPendingUrl(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken(function (cancel) {
      if (!pendingMap.has(url)) {
        // If there is no current request in pending, add it
        pendingMap.set(url, cancel);
      }
    });
  }
  /**
   * @description: Clear all pending
   */
  ;

  _proto.removeAllPending = function removeAllPending() {
    pendingMap.forEach(function (cancel) {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  /**
   * Removal request
   * @param {Object} config
   */
  ;

  _proto.removePending = function removePending(config) {
    var url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      var cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
  /**
   * @description: reset
   */
  ;

  _proto.reset = function reset() {
    pendingMap = new Map();
  };

  return AxiosCanceler;
}();