import { KarinMessage } from 'node-karin';
/** 常用工具合集 */
export declare const Common: {
    /**
     * 获取引用消息
     * @param e event 消息事件
     * @returns 被引用的消息
     */
    getReplyMessage: (e: KarinMessage) => Promise<string>;
    /**
     * 插件缓存文件夹
     */
    tempDri: {
        /** 视频缓存文件 */
        video: string;
        /** 图片缓存文件 */
        images: string;
    };
    /**
     * 将中文数字转换为阿拉伯数字的函数
     * @param chineseNumber 数字的中文
     * @returns 中文数字对应的阿拉伯数字映射
     */
    chineseToArabic: (chineseNumber: string) => number;
    /**
     * 格式化cookie字符串
     * @param cookies cookie数组
     * @returns 格式化后的cookie字符串
     */
    formatCookies: (cookies: any[]) => string;
    /**
     * 计算目标视频平均码率（单位：Kbps）
     * @param targetSizeMB 目标视频大小（MB）
     * @param duration 视频时长（秒）
     * @returns
     */
    calculateBitrate: (targetSizeMB: number, duration: number) => number;
    /**
     * 获取视频文件大小（单位MB）
     * @param filePath 视频文件绝对路径
     * @returns
     */
    getVideoFileSize: (filePath: string) => Promise<number>;
    /**
     * 根据配置文件的配置项，删除缓存文件
     * @param path 文件的绝对路径
     * @param force 是否强制删除，默认false
     * @returns
     */
    removeFile: (path: string, force?: boolean) => Promise<boolean>;
    /**
     * 将时间戳转换为日期时间字符串
     * @param timestamp 时间戳
     * @returns 格式为YYYY-MM-DD HH:MM的日期时间字符串
     */
    convertTimestampToDateTime: (timestamp: number) => string;
    /**
     * 获取当前时间：年-月-日 时:分:秒
     * @returns
     */
    getCurrentTime: () => string;
    /**
     * 评论图、推送图是否使用深色模式
     * @returns
     */
    useDarkTheme: () => boolean;
};
