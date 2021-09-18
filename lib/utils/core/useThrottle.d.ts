import { DebounceAndThrottleOptions, DebounceAndThrottleProcedure, DebounceAndThrottleProcedureResult } from './index';
export declare function throttle<T extends unknown[]>(handle: DebounceAndThrottleProcedure<T>, wait: number, options?: DebounceAndThrottleOptions): DebounceAndThrottleProcedureResult<T>;
export declare function useThrottle<T extends unknown[]>(handle: DebounceAndThrottleProcedure<T>, wait: number, options?: DebounceAndThrottleOptions): DebounceAndThrottleProcedureResult<T>;
