export * from './useContext'
export * from './useDebounce'
export * from './useThrottle'
export interface DebounceAndThrottleOptions {
    // 立即执行
    immediate?: boolean

    // 是否为debounce
    debounce?: boolean
    // 只执行一次
    once?: boolean
  }

export type CancelFn = () => void;
export type DebounceAndThrottleProcedure<T extends unknown[]> = (...args: T) => unknown;

export type DebounceAndThrottleProcedureResult<T extends unknown[]> = [
    DebounceAndThrottleProcedure<T>,
    CancelFn
  ];
