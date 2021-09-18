import { InjectionKey } from 'vue';
export interface CreateContextOptions {
    readonly?: boolean;
    createProvider?: boolean;
    native?: boolean;
}
export declare function createContext<T>(context: any, key?: InjectionKey<T>, options?: CreateContextOptions): {
    Provider: import("vue").DefineComponent<{}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[], {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {}>, {}>;
    state: any;
};
export declare function useContext<T>(key: InjectionKey<T>, native?: boolean): T;
export declare function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T;
