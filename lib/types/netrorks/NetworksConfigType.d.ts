import { ResponseType } from 'node-karin/axios';
export interface NetworksConfigType {
    /**
     * 请求地址
     */
    url?: string;
    /**
     * 请求方法
     */
    method?: string;
    /**
     * 请求头
     */
    headers?: any;
    /**
     * 返回数据类型，默认json
     */
    type?: ResponseType;
    /**
     * 请求体
     */
    body?: string;
    /**
     * 超时时间，单位毫秒
     */
    timeout?: number;
    /**
     * 默认跟随重定向到: 'follow'，不跟随: manual
     */
    redirect?: RequestRedirect;
    /**
     * 文件保存路径
     */
    filepath?: string;
    /**
     * 最大重试请求次数
     */
    maxRetries?: number;
}
