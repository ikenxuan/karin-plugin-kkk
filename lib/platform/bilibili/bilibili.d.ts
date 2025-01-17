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
/**
 * 拼接B站动态卡片的html字符串
 * @param colors 颜色数组
 * @param text 卡片的文字
 * @returns 拼接好的html字符串
 */
export declare const generateGradientStyle: (colors: string[], text: string) => string;
/**
 * 将给定的图片源数组转换为一个新的对象数组，每个对象包含单个图片源
 * @param pic 一个包含图片源字符串的数组
 * @returns 返回一个对象数组，每个对象包含单个图片源
 */
export declare const cover: (pic: {
    img_src: string;
}[]) => {
    image_src: string;
}[];
/**
 * 生成装饰卡片的HTML字符串
 * @param decorate 装饰对象，包含卡片的URL和颜色信息
 * @returns 返回装饰卡片的HTML字符串或空div字符串
 */
export declare const generateDecorationCard: (decorate: any) => string;
export {};
