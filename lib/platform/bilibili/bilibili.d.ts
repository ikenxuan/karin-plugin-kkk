import { Message } from 'node-karin';
import { Base } from '../../module/utils/index.js';
import { BilibiliDataTypes } from '../../types/index.js';
type videoDownloadUrlList = {
    /**
     * 清晰度标识
     *
     * 详情见 [qn视频清晰度标识](https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/video/videostream_url.md#qn%E8%A7%86%E9%A2%91%E6%B8%85%E6%99%B0%E5%BA%A6%E6%A0%87%E8%AF%86)
     */
    id: number;
    /** 视频文件下载地址 */
    base_url: string;
}[];
export declare class Bilibili extends Base {
    e: Message;
    type: any;
    STATUS: any;
    ISVIP: boolean;
    TYPE: BilibiliDataTypes[keyof BilibiliDataTypes];
    islogin: boolean;
    downloadfilename: string;
    get botadapter(): string;
    constructor(e: Message, data: any);
    RESOURCES(OBJECT: any): Promise<boolean | undefined>;
    getvideo(OBJECT: any): Promise<void>;
    getvideosize(videourl: any, audiourl: any, bvid: any): Promise<string>;
    /**
     * 检出应该下载的视频流
     * @param data 视频流数据
     * @returns 经过排除后的视频流数据（删减不符合Config.upload.filelimit条件的视频流）
     */
    /**
     * 检出符合大小的视频流信息对象
     * @param accept_description 视频流清晰度列表
     * @param videoList 包含所有清晰度的视频流信息对象
     * @param audioUrl 音频流地址
     * @param bvid 视频bvid（BV号）
     * @returns
     */
    processVideos(accept_description: string[], videoList: videoDownloadUrlList, audioUrl: string, bvid: string): Promise<{
        accept_description: string[];
        videoList: videoDownloadUrlList;
    }>;
}
export declare function replacetext(text: string, rich_text_nodes: any[]): string;
export declare const generateGradientStyle: (colors: string[], text: string) => string;
export declare const cover: (pic: {
    img_src: string;
}[]) => {
    image_src: string;
}[];
export declare const generateDecorationCard: (decorate: any) => string;
export {};
