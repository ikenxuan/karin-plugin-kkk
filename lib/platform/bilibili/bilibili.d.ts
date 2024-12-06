import { KarinMessage } from 'node-karin';
import { Base } from '../../module/utils/index.js';
import { BilibiliDataTypes } from '../../types/index.js';
export declare class Bilibili extends Base {
    e: KarinMessage;
    type: any;
    STATUS: any;
    ISVIP: boolean;
    TYPE: BilibiliDataTypes[keyof BilibiliDataTypes];
    islogin: boolean;
    downloadfilename: string;
    get botadapter(): string;
    constructor(e: KarinMessage, data: any);
    RESOURCES(OBJECT: any): Promise<boolean | undefined>;
    getvideo(OBJECT: any): Promise<void>;
    getvideosize(videourl: any, audiourl: any, bvid: any): Promise<string>;
    /**
     * 检出应该下载的视频流
     * @param data 视频流数据
     * @returns 经过排除后的视频流数据（删减不符合Config.upload.filelimit条件的视频流）
     */
    processVideos(data: any): Promise<any>;
}
export declare const generateGradientStyle: (colors: string[], text: string) => string;
