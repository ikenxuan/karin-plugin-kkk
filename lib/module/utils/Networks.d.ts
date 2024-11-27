import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NetworksConfigType } from '../../types/index.js';
export declare class Networks {
    private url;
    private method;
    private headers;
    private type;
    private body?;
    private axiosInstance;
    private isGetResult;
    private timeout;
    private timer;
    private data;
    private filepath;
    private maxRetries;
    constructor(data: NetworksConfigType);
    get config(): AxiosRequestConfig;
    /**
     * 异步下载流方法
     *
     * @param progressCallback 下载进度回调函数，接收已下载字节数和总字节数作为参数
     * @param retryCount 重试次数，默认为0
     * @returns 返回一个Promise，解析为包含文件路径和总字节数的对象
     *
     * 此函数通过axios库发送HTTP请求，下载指定URL的资源，并将下载的资源流保存到本地文件系统中
     * 它还提供了一个回调函数来报告下载进度，并在下载失败时根据配置自动重试
     */
    downloadStream(progressCallback: (downloadedBytes: number, totalBytes: number) => void, retryCount?: number): Promise<{
        filepath: string;
        totalBytes: number;
    }>;
    getfetch(): Promise<AxiosResponse | boolean>;
    returnResult(): Promise<AxiosResponse>;
    /** 最终地址（跟随重定向） */
    getLongLink(): Promise<string>;
    /** 获取首个302链接 */
    getLocation(): Promise<AxiosResponse['headers']['location']>;
    /** 获取数据并处理数据的格式化，默认json */
    getData(): Promise<AxiosResponse['data'] | boolean>;
    /**
     * 获取响应头信息（仅首个字节）
     * 适用于获取视频流的完整大小
     * @returns
     */
    getHeaders(): Promise<AxiosResponse['headers']>;
    /**
     * 获取响应头信息（完整）
     * @returns
     */
    getHeadersFull(): Promise<AxiosResponse['headers']>;
}
