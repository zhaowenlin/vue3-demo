export declare const timestamp: () => number;
export declare const clamp: (n: number, min: number, max: number) => number;
export declare const noop: () => void;
export declare const now: () => number;
export declare function getPopupContainer(node?: HTMLElement): HTMLElement;
export declare function generateUUID(): string;
export declare function setObjToUrlParams(baseUrl: string, obj: any): string;
export declare function deepMerge<T = any>(src?: any, target?: any): T;
export declare function openWindow(url: string, opt?: {
    target?: TargetContext | string;
    noopener?: boolean;
    noreferrer?: boolean;
}): void;
export declare function getDynamicProps<T, U>(props: T): Partial<U>;
export declare function setTitle(title: string, appTitle?: string): void;
