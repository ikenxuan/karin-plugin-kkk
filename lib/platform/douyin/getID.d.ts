import { DouyinOptionsType } from '@ikenxuan/amagi';
import { DouyinDataTypes } from '../../types/index.js';
export interface ExtendedDouyinOptionsType extends DouyinOptionsType {
    type: DouyinDataTypes[keyof DouyinDataTypes];
    /** 该作品是否为视频 */
    is_mp4?: boolean;
}
/**
 *
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export declare function getDouyinID(url: string, log?: boolean): Promise<ExtendedDouyinOptionsType>;
