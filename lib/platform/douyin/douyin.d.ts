import { Message } from 'node-karin';
import { Base } from '../../module/utils/index.js';
import { DouyinDataTypes, ExtendedDouyinOptionsType } from '../../types/index.js';
export type dyVideo = {
    FPS: number;
    HDR_bit: string;
    HDR_type: string;
    bit_rate: number;
    format: string;
    gear_name: string;
    is_bytevc1: number;
    is_h265: number;
    play_addr: {
        data_size: number;
        file_cs: string;
        file_hash: string;
        height: number;
        uri: string;
        url_key: string;
        url_list: string[];
        width: number;
    };
    quality_type: number;
    video_extra: string;
};
export declare class DouYin extends Base {
    e: Message;
    type: DouyinDataTypes[keyof DouyinDataTypes];
    is_mp4: boolean | undefined;
    is_slides: boolean;
    get botadapter(): string;
    constructor(e: Message, iddata: ExtendedDouyinOptionsType);
    RESOURCES(data: any): Promise<true | undefined>;
}
export declare function processVideos(videos: dyVideo[], filelimit: number): dyVideo[];
