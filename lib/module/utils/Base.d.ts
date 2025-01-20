import { Message } from 'node-karin';
type uploadFileOptions = {
    /** 是否使用群文件上传 */
    useGroupFile?: boolean;
    /** 消息ID，如果有，则将使用该消息ID制作回复元素 */
    message_id?: string;
    /** 是否为主动消息 */
    active?: boolean;
    /** 主动消息参数 */
    activeOption?: {
        /** 机器人账号 */
        uin: string;
        /** 群号 */
        group_id: string;
    };
};
/** 最少都要传一个 */
type title = {
    /** 文件名：自定义 */
    originTitle?: string;
    /** 文件名：tmp + 时间戳 */
    timestampTitle?: string;
};
type downloadFileOptions = {
    /** 视频链接 */
    video_url: string;
    /** 文件名 */
    title: title;
    /** 下载文件类型，默认为'.mp4'。 */
    filetype?: string;
    /** 自定义请求头，将使用该请求头下载文件。 */
    headers?: object;
};
export type fileInfo = {
    /** 视频文件的绝对路径 */
    filepath: string;
    /** 视频文件大小 */
    totalBytes: number;
    /** 文件名：自定义 */
    originTitle?: title['originTitle'];
    /** 文件名：tmp + 时间戳 */
    timestampTitle?: title['timestampTitle'];
};
type downLoadFileOptions = {
    /** 文件名 */
    title: string;
    /**
     * 将使用该请求头下载文件。
     * @default {}
     */
    headers?: object;
};
export declare class Base {
    e: Message;
    headers: any;
    _path: string;
    constructor(e: Message);
    /** 获取适配器名称 */
    get botadapter(): string;
    /**
     * 上传视频文件
     * @param file - 包含本地视频文件信息的对象。
     * @param videoUrl 视频直链，无则传空字符串
     * @param options 上传参数
     * @returns
     */
    upload_file(file: fileInfo, videoUrl: string, options?: uploadFileOptions): Promise<boolean>;
    /**
     * 下载视频并上传到群
     * @param video_url 视频链接
     * @param title 文件名，是一个对象，时间戳或自定义
     * @param opt 上传参数
     * @returns
     */
    DownLoadVideo(downloadOpt: downloadFileOptions, uploadOpt?: uploadFileOptions): Promise<boolean>;
    /**
     * 异步下载文件的函数。
     * @param videoUrl 下载地址。
     * @param opt 配置选项，包括标题、请求头等。
     * @returns 返回一个包含文件路径和总字节数的对象。
     */
    DownLoadFile(videoUrl: string, opt: downLoadFileOptions): Promise<fileInfo>;
    /** 删文件 */
    removeFile(path: string, force?: boolean): Promise<boolean>;
    /** 过万整除 */
    count(count: number): string;
}
export {};