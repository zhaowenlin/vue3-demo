import type { AxiosRequestConfig } from 'axios';
import type { AxiosTransform } from './axiosTransform';
import { App } from 'vue';
export declare type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
    loading?: boolean;
    lock?: boolean;
    ajaxLoaing?: string;
    ajaxLock?: string;
    confirm?: boolean;
    message?: string;
    joinParamsToUrl?: boolean;
    formatDate?: boolean;
    isTransformRequestResult?: boolean;
    joinPrefix?: boolean;
    prefix?: string;
    api?: string;
    errorMessageMode?: ErrorMessageMode;
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
    beforeRequest?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig | boolean;
    afterRequst?: (res: any, data: Result) => void;
}
export interface CreateAxiosOptions extends AxiosRequestConfig {
    app?: App;
    transform?: AxiosTransform;
    requestOptions?: RequestOptions;
    ext?: any;
}
export interface Result<T = any> {
    code: number;
    type: 'success' | 'error' | 'warning';
    message: string;
    result: T;
}
export interface UploadFileParams {
    data?: Indexable;
    name?: string;
    file: File | Blob;
    filename?: string;
    [key: string]: any;
}
