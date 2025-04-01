import { ffmpeg, ffprobe, logger } from 'node-karin';
import { Common } from '../../module/utils/index.js';
/**
 * 使用 FFmpeg 对文件进行处理
 * @param type 处理方法
 * @param options 参数
 * @returns
 */
export const mergeFile = async (type, options) => {
    return await new FFmpeg(type).FFmpeg(options);
};
class FFmpeg {
    type;
    constructor(type) {
        this.type = type;
    }
    async FFmpeg(opt) {
        switch (this.type) {
            case '二合一（视频 + 音频）': {
                const result = await ffmpeg(`-y -i ${opt.path} -i ${opt.path2} -c copy ${opt.resultPath}`);
                result.status ? logger.mark('视频合成成功！') : logger.error(result);
                await opt.callback(result.status, opt.resultPath);
                return result; // 布尔类型
            }
            case '视频*3 + 音频': {
                const result = await ffmpeg(`-y -stream_loop 2 -i ${opt.path} -i ${opt.path2} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest ${opt.resultPath}`);
                result ? logger.mark('视频合成成功！') : logger.error(result);
                await opt.callback(result.status, opt.resultPath);
                return result; // 布尔类型
            }
            case '获取指定视频文件时长': {
                const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${opt.path}`);
                return parseFloat(parseFloat(stdout.trim()).toFixed(2)); // 数字类型
            }
            case '压缩视频': {
                const result = await ffmpeg(`-y -i "${opt.path}" -b:v ${opt.targetBitrate}k -maxrate ${opt.maxRate || opt.targetBitrate * 1.5}k -bufsize ${opt.bufSize || opt.targetBitrate * 2}k -crf ${opt.crf || 35} -preset medium -c:v libx264 -vf "scale='if(gte(iw/ih,16/9),1280,-1)':'if(gte(iw/ih,16/9),-1,720)',scale=ceil(iw/2)*2:ceil(ih/2)*2" "${opt.resultPath}"`);
                if (result.status) {
                    logger.mark(`视频已压缩并保存到: ${opt.resultPath}`);
                    Common.removeFile(opt.path);
                }
                else {
                    logger.error(opt.path + ' 压缩失败！');
                    logger.error(result);
                }
                return opt.resultPath; // 字符串类型
            }
        }
    }
}
