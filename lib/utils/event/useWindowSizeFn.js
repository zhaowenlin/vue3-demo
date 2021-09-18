import { useDebounce } from "../core/index";
import { tryOnMounted, tryOnUnmounted } from "../helper/vueHelper";
export function useWindowSizeFn(fn, wait, options) {
  if (wait === void 0) {
    wait = 150;
  }

  var handler = function handler() {
    fn();
  };

  var _useDebounce = useDebounce(handler, wait, options),
      handleSize = _useDebounce[0],
      cancel = _useDebounce[1];

  handler = handleSize;

  var start = function start() {
    if (options && options.immediate) {
      handler();
    }

    window.addEventListener('resize', handler);
  };

  var stop = function stop() {
    window.removeEventListener('resize', handler);
    cancel();
  };

  tryOnMounted(function () {
    start();
  });
  tryOnUnmounted(function () {
    stop();
  });
  return [start, stop];
}