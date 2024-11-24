import { logger, ffmpeg } from 'node-karin';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { Common } from '../../module/utils/index.js';
const execPromise = promisify(exec);
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
        const ffmpegClient = await ffmpeg();
        if (ffmpegClient === false) {
            return false; // 若ffmpeg初始化失败，返回 false
        }
        switch (this.type) {
            case '二合一（视频 + 音频）': {
                const result = await ffmpegClient(`-y -i ${opt.path} -i ${opt.path2} -c copy ${opt.resultPath}`);
                const success = result.status === 'ok';
                success ? logger.mark('视频合成成功！') : logger.error('视频合成失败！');
                await opt.callback(success);
                return success; // 布尔类型
            }
            case '视频*3 + 音频': {
                const result = await ffmpegClient(`-y -stream_loop 2 -i ${opt.path} -i ${opt.path2} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest ${opt.resultPath}`);
                const success = result.status === 'ok';
                success ? logger.mark('视频合成成功！') : logger.error('视频合成失败！');
                await opt.callback(success);
                return success; // 布尔类型
            }
            case '获取指定视频文件时长': {
                const { stdout } = await execPromise(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${opt.path}`);
                return parseFloat(stdout.trim()); // 数字类型
            }
            case '压缩视频': {
                const result = await ffmpegClient(`-y -i "${opt.path}" -b:v ${opt.targetBitrate}k -maxrate ${opt.maxRate || opt.targetBitrate * 1.5}k -bufsize ${opt.bufSize || opt.targetBitrate * 2}k -crf ${opt.crf || 35} -preset medium -c:v libx264 -vf "scale='if(gte(iw/ih,16/9),1280,-1)':'if(gte(iw/ih,16/9),-1,720)',scale=ceil(iw/2)*2:ceil(ih/2)*2" "${opt.resultPath}"`);
                if (result.status === 'ok') {
                    logger.mark(`视频已压缩并保存到: ${opt.resultPath}`);
                    await Common.removeFile(opt.path);
                }
                else
                    logger.error(opt.path + ' 压缩失败！');
                return opt.resultPath; // 字符串类型
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkZtcGVnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZHVsZS91dGlscy9GRm1wZWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFDM0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFDckMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ3ZDLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQW1FbkM7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsS0FBSyxFQUM1QixJQUFPLEVBQ1AsT0FBNEIsRUFDQyxFQUFFO0lBQy9CLE9BQU8sTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDL0MsQ0FBQyxDQUFBO0FBRUQsTUFBTSxNQUFNO0lBQ1YsSUFBSSxDQUF3QjtJQUM1QixZQUFhLElBQTRCO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBTSxDQUF3QyxHQUFRO1FBQzFELE1BQU0sWUFBWSxHQUFHLE1BQU0sTUFBTSxFQUFFLENBQUE7UUFDbkMsSUFBSSxZQUFZLEtBQUssS0FBSyxFQUFFLENBQUM7WUFDM0IsT0FBTyxLQUFzQyxDQUFBLENBQUUsd0JBQXdCO1FBQ3pFLENBQUM7UUFFRCxRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksT0FBTyxHQUFHLENBQUMsS0FBSyxZQUFZLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO2dCQUNoRyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQTtnQkFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUMxRCxNQUFNLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzNCLE9BQU8sT0FBd0MsQ0FBQSxDQUFDLE9BQU87WUFDekQsQ0FBQztZQUNELEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxZQUFZLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssNkxBQTZMLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO2dCQUNoUyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQTtnQkFDdEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUMxRCxNQUFNLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzNCLE9BQU8sT0FBd0MsQ0FBQSxDQUFDLE9BQU87WUFDekQsQ0FBQztZQUNELEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sV0FBVyxDQUFDLHlGQUF5RixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtnQkFDekksT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFrQyxDQUFBLENBQUUsT0FBTztZQUM1RSxDQUFDO1lBQ0QsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLE1BQU0sTUFBTSxHQUFHLE1BQU0sWUFBWSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksVUFBVSxHQUFHLENBQUMsYUFBYSxjQUFjLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLGFBQWEsR0FBRyxHQUFHLGNBQWMsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsYUFBYSxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsd0lBQXdJLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO2dCQUN0VyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtvQkFDM0MsTUFBTSxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDbkMsQ0FBQzs7b0JBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFBO2dCQUN4QyxPQUFPLEdBQUcsQ0FBQyxVQUEyQyxDQUFBLENBQUUsUUFBUTtZQUNsRSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FDRiJ9