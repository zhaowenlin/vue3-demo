import { // throttle,
useThrottle } from "./useThrottle";
/**
 * @description: Applicable in components
 */

export function useDebounce(handle, wait, options) {
  if (options === void 0) {
    options = {};
  }

  return useThrottle(handle, wait, Object.assign(options, {
    debounce: true
  }));
}