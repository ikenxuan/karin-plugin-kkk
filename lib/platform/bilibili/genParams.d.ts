/**
 * 计算请求参数
 * @param apiURL 请求地址
 * @returns
 */
export declare function genParams(apiURL: string): Promise<string>;
export declare function checkCk(): Promise<{
    Status: 'isLogin' | '!isLogin';
    isVIP: boolean;
}>;
