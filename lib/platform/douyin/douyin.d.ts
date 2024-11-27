import { Base } from '../../module/utils/index.js';
import { DouyinDataTypes, ExtendedDouyinOptionsType } from '../../types/index.js';
import { KarinMessage } from 'node-karin';
export declare class DouYin extends Base {
    e: KarinMessage;
    type: DouyinDataTypes[keyof DouyinDataTypes];
    is_mp4: any;
    get botadapter(): string;
    constructor(e: KarinMessage, iddata: ExtendedDouyinOptionsType);
    RESOURCES(data: any): Promise<true | undefined>;
}
