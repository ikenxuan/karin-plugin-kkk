import { BilibiliDataTypes } from '../../types/index.js';
export interface IDDataTypes {
    type: BilibiliDataTypes[keyof BilibiliDataTypes];
    [x: string]: any;
}
/**
 * return aweme_id
 * @param {string} url 分享连接
 * @returns
 */
export declare function getBilibiliID(url: string): Promise<IDDataTypes>;
