import { Fn } from '../types/global';
interface WindowSizeOptions {
    once?: boolean;
    immediate?: boolean;
    listenerOptions?: AddEventListenerOptions | boolean;
}
export declare function useWindowSizeFn<T>(fn: Fn<T>, wait?: number, options?: WindowSizeOptions): (() => void)[];
export {};
