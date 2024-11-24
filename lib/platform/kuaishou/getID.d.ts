import { KuaishouOptionsType } from '@ikenxuan/amagi';
import { KuaishouDataTypes } from '../../types/index.js';
export interface ExtendedKuaishouOptionsType extends KuaishouOptionsType {
    type: KuaishouDataTypes[keyof KuaishouDataTypes];
    [x: string]: any;
}
/**
 *
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export declare function getKuaishouID(url: string, log?: boolean): Promise<ExtendedKuaishouOptionsType>;
