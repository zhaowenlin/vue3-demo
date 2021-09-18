import { WatchSource, ComponentInternalInstance } from 'vue';
export declare function explicitComputed<T, S>(source: WatchSource<S>, fn: () => T): import("vue").ComputedRef<T>;
export declare function tryOnMounted(fn: () => void, sync?: boolean): void;
export declare function tryOnUnmounted(fn: () => Promise<void> | void): void;
export declare function tryTsxEmit<T extends any = ComponentInternalInstance>(fn: (_instance: T) => Promise<void> | void): void;
export declare function isInSetup(): void;
