import { isFunction } from "../is";
export function throttle(handle, wait, options) {
  if (options === void 0) {
    options = {};
  }

  if (!isFunction(handle)) {
    throw new Error('handle is not Function!');
  }

  var _options = options,
      _options$immediate = _options.immediate,
      immediate = _options$immediate === void 0 ? false : _options$immediate;
  var _options2 = options,
      _options2$once = _options2.once,
      once = _options2$once === void 0 ? false : _options2$once,
      _options2$debounce = _options2.debounce,
      debounce = _options2$debounce === void 0 ? false : _options2$debounce;
  var timeoutId; // Has it been cancelled

  var cancelled = false;
  /**
   * @description: clear timer
   */

  function clearTimer() {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
  /** cancel exec */


  function cancel() {
    clearTimer();
    cancelled = true;
  } // If once is true, only execute once


  function cancelExec() {
    once && cancel();
  }

  function fn() {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // If it has been cancelled, it will not be executed
    if (cancelled) {
      return;
    }

    var exec = function exec() {
      !debounce && clearTimer();
      handle.apply(_this, args);
      cancelExec();
    };

    if (immediate) {
      immediate = false;
      var callNow = !timeoutId;

      if (callNow) {
        exec();
        timeoutId = null;
      }
    } else {
      debounce && clearTimer();

      if (!timeoutId || debounce) {
        timeoutId = setTimeout(exec, wait);
      }
    }
  }

  return [fn, cancel];
}
export function useThrottle(handle, wait, options) {
  if (options === void 0) {
    options = {};
  }

  return throttle(handle, wait, options);
}