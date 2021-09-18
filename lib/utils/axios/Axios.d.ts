import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import type { RequestOptions, CreateAxiosOptions, UploadFileParams } from './types';
export * from './axiosTransform';
export declare class VAxios {
    private axiosInstance;
    private readonly options;
    private lockCount;
    private LockInstance;
    constructor(options: CreateAxiosOptions);
    private getTransform;
    getAxios(): AxiosInstance;
    setHeader(headers: any): void;
    private setupInterceptors;
    uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams): Promise<AxiosResponse<T>>;
    supportFormData(config: AxiosRequestConfig): AxiosRequestConfig;
    get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    requestLifeCycle(methodType: string, name: string, options: RequestOptions): void;
    sendQuest<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
    request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T>;
}
