import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from './types';
export declare abstract class AxiosTransform {
    setUrlPrefix?: (prefix: string, url: string) => void;
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
    transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;
    requestCatchHook?: (e: Error) => Promise<any>;
    requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
    requestInterceptorsCatch?: (error: Error) => void;
    responseInterceptorsCatch?: (error: Error) => void;
}
