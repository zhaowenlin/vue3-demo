import { Recordable } from 'perfintech';
import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    method: {
        type: StringConstructor;
        default: string;
    };
    url: {
        type: StringConstructor;
        default: string;
    };
    tableData: {
        type: ArrayConstructor;
        default: () => any[];
    };
    reqParams: {
        type: ObjectConstructor;
        default: () => {};
    };
    ajaxOption: {
        type: ObjectConstructor;
        default: {};
    };
    requestOptions: {
        type: ObjectConstructor;
        default: {};
    };
    currentPage: {
        type: NumberConstructor;
        default: number;
    };
    totalPage: {
        type: NumberConstructor;
        default: number;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    resDataKey: {
        type: StringConstructor;
        default: string;
    };
    resTotalPageKey: {
        type: StringConstructor;
        default: string;
    };
    resCurrentPageKey: {
        type: StringConstructor;
        default: string;
    };
    resPageSizeKey: {
        type: StringConstructor;
        default: string;
    };
    beforeRequestHook: {
        type: PropType<(...args: any[]) => unknown>;
    };
    afterRequestHook: {
        type: PropType<(...args: any[]) => unknown>;
    };
    finallyRequestHook: {
        type: PropType<(...args: any[]) => unknown>;
    };
}, {
    currentPageChange: (num: number) => void;
    reqTableData: (params?: Recordable) => void;
    loading: import("vue").Ref<boolean>;
    internalPageSize: import("vue").Ref<number>;
    internalTotal: import("vue").Ref<number>;
    internalCurrentPage: import("vue").Ref<number>;
    internalTableData: import("vue").Ref<unknown[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    totalPage: number;
    currentPage: number;
    pageSize: number;
    method: string;
    url: string;
    tableData: unknown[];
    reqParams: Record<string, any>;
    ajaxOption: Record<string, any>;
    requestOptions: Record<string, any>;
    resDataKey: string;
    resTotalPageKey: string;
    resCurrentPageKey: string;
    resPageSizeKey: string;
} & {
    beforeRequestHook?: (...args: any[]) => unknown;
    afterRequestHook?: (...args: any[]) => unknown;
    finallyRequestHook?: (...args: any[]) => unknown;
}>, {
    totalPage: number;
    currentPage: number;
    pageSize: number;
    method: string;
    url: string;
    tableData: unknown[];
    reqParams: Record<string, any>;
    ajaxOption: Record<string, any>;
    requestOptions: Record<string, any>;
    resDataKey: string;
    resTotalPageKey: string;
    resCurrentPageKey: string;
    resPageSizeKey: string;
}>;
export default _default;
