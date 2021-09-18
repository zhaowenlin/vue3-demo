import { DebounceAndThrottleOptions, DebounceAndThrottleProcedure, DebounceAndThrottleProcedureResult } from './index';
export declare function useDebounce<T extends unknown[]>(handle: DebounceAndThrottleProcedure<T>, wait: number, options?: DebounceAndThrottleOptions): DebounceAndThrottleProcedureResult<T>;
