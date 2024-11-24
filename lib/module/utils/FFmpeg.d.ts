interface fffmpegClientOptions {
    VideoAudioOptions: {
        /** 文件1绝对路径 */
        path: string;
        /** 文件2绝对路径 */
        path2: string;
        /** 合并完成后存放的绝对路径路径 */
        resultPath: string;
        /** 处理结果的回调函数 */
        callback: (success: boolean) => boolean | Promise<boolean>;
    };
    Video3AudioOptions: {
        /** 文件1绝对路径 */
        path: string;
        /** 文件2绝对路径 */
        path2: string;
        /** 合并完成后存放的绝对路径路径 */
        resultPath: string;
        /** 处理结果的回调函数 */
        callback: (success: boolean) => boolean | Promise<boolean>;
    };
    getVideoSizeOptions: {
        /** 视频文件路径 */
        path: string;
    };
    compressVideoOptions: {
        /** 文件绝对路径 */
        path: string;
        /** 目标比特率 */
        targetBitrate: number;
        /**
         * 最大码率
         * @default targetBitrate * 1.5
         */
        maxRate?: number;
        /**
         * 缓冲区大小
         * @default targetBitrate * 2
         */
        bufSize?: number;
        /**
         * 恒定码率因子
         * @default 30
         */
        crf?: number;
        /** 合并完成后存放的绝对路径路径 */
        resultPath: string;
    };
}
type MergeFileResult<T> = T extends '二合一（视频 + 音频）' ? void : T extends '视频*3 + 音频' ? void : T extends '获取指定视频文件时长' ? number : T extends '压缩视频' ? string : never;
interface ffhandlerOptions {
    '二合一（视频 + 音频）': fffmpegClientOptions['VideoAudioOptions'];
    '视频*3 + 音频': fffmpegClientOptions['Video3AudioOptions'];
    '获取指定视频文件时长': fffmpegClientOptions['getVideoSizeOptions'];
    '压缩视频': fffmpegClientOptions['compressVideoOptions'];
}
/**
 * 使用 FFmpeg 对文件进行处理
 * @param type 处理方法
 * @param options 参数
 * @returns
 */
export declare const mergeFile: <T extends keyof ffhandlerOptions>(type: T, options: ffhandlerOptions[T]) => Promise<MergeFileResult<T>>;
export {};
