/**
 * 计算请求参数
 * @param apiURL 请求地址
 * @returns
 */
export declare function genParams(apiURL: string): Promise<{
    QUERY: string;
    STATUS: string;
    isvip?: undefined;
} | {
    QUERY: string;
    STATUS: string;
    isvip: true;
} | {
    QUERY: string;
    STATUS: string;
    isvip: false;
}>;
