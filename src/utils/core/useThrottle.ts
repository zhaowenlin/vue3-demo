

import { DebounceAndThrottleOptions, DebounceAndThrottleProcedure, DebounceAndThrottleProcedureResult } from './index'



import { isFunction } from '../is'
import { Nullable, TimeoutHandle } from '../types/global'
export function throttle<T extends unknown[]>(
  handle: DebounceAndThrottleProcedure<T>,
  wait: number,
  options: DebounceAndThrottleOptions = {},
): DebounceAndThrottleProcedureResult<T> {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!')
  }
  let { immediate = false } = options
  const { once = false, debounce = false } = options
  let timeoutId: Nullable<TimeoutHandle>
  // Has it been cancelled
  let cancelled: boolean | null = false
  /**
   * @description: clear timer
   */
  function clearTimer() {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
  }
  /** cancel exec */
  function cancel() {
    clearTimer()
    cancelled = true
  }
  // If once is true, only execute once
  function cancelExec(): void {
    once && cancel()
  }
  function fn(this: unknown, ...args: T) {
    // If it has been cancelled, it will not be executed
    if (cancelled) {
      return
    }
    const exec = () => {
      !debounce && clearTimer()
      handle.apply(this, args)
      cancelExec()
    }
    if (immediate) {
      immediate = false
      const callNow = !timeoutId
      if (callNow) {
        exec()
        timeoutId = null
      }
    } else {
      debounce && clearTimer()
      if (!timeoutId || debounce) {
        timeoutId = setTimeout(exec, wait)
      }
    }
  }
  return [fn, cancel]
}

export function useThrottle<T extends unknown[]>(
  handle: DebounceAndThrottleProcedure<T>,
  wait: number,
  options: DebounceAndThrottleOptions = {},
): DebounceAndThrottleProcedureResult<T> {
  return throttle(handle, wait, options)
}
