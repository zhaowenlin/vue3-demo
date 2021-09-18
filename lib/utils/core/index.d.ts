export * from './useContext';
export * from './useDebounce';
export * from './useThrottle';
export interface DebounceAndThrottleOptions {
    immediate?: boolean;
    debounce?: boolean;
    once?: boolean;
}
export declare type CancelFn = () => void;
export declare type DebounceAndThrottleProcedure<T extends unknown[]> = (...args: T) => unknown;
export declare type DebounceAndThrottleProcedureResult<T extends unknown[]> = [
    DebounceAndThrottleProcedure<T>,
    CancelFn
];
