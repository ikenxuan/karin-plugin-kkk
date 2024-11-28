import { logger, ffmpeg } from 'node-karin'
import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { Common, Version } from '@/module/utils'
const execPromise = promisify(exec)

interface fffmpegClientOptions {
  VideoAudioOptions: {
    /** 文件1绝对路径 */
    path: string
    /** 文件2绝对路径 */
    path2: string
    /** 合并完成后存放的绝对路径路径 */
    resultPath: string
    /** 处理结果的回调函数 */
    callback: (success: boolean) => boolean | Promise<boolean>
  }
  Video3AudioOptions: {
    /** 文件1绝对路径 */
    path: string
    /** 文件2绝对路径 */
    path2: string
    /** 合并完成后存放的绝对路径路径 */
    resultPath: string
    /** 处理结果的回调函数 */
    callback: (success: boolean) => boolean | Promise<boolean>
  }
  getVideoSizeOptions: {
    /** 视频文件路径 */
    path: string
  }
  compressVideoOptions: {
    /** 文件绝对路径 */
    path: string
    /** 目标比特率 */
    targetBitrate: number
    /**
     * 最大码率
     * @default targetBitrate * 1.5
     */
    maxRate?: number
    /**
     * 缓冲区大小
     * @default targetBitrate * 2
     */
    bufSize?: number
    /**
     * 恒定码率因子
     * @default 30
     */
    crf?: number
    /** 合并完成后存放的绝对路径路径 */
    resultPath: string
  }
}

// 为每个执行方法定义返回类型
type MergeFileResult<T> =
  T extends '二合一（视频 + 音频）' ? void :
  T extends '视频*3 + 音频' ? void :
  T extends '获取指定视频文件时长' ? number :
  T extends '压缩视频' ? string :
  never

interface ffhandlerOptions {
  '二合一（视频 + 音频）': fffmpegClientOptions['VideoAudioOptions']
  '视频*3 + 音频': fffmpegClientOptions['Video3AudioOptions']
  '获取指定视频文件时长': fffmpegClientOptions['getVideoSizeOptions']
  '压缩视频': fffmpegClientOptions['compressVideoOptions']
}

/**
 * 使用 FFmpeg 对文件进行处理
 * @param type 处理方法
 * @param options 参数
 * @returns
 */
export const mergeFile = async <T extends keyof ffhandlerOptions> (
  type: T,
  options: ffhandlerOptions[T]
): Promise<MergeFileResult<T>> => {
  return await new FFmpeg(type).FFmpeg(options)
}

class FFmpeg {
  type: keyof ffhandlerOptions
  constructor (type: keyof ffhandlerOptions) {
    this.type = type
  }
  async FFmpeg<T extends keyof fffmpegClientOptions> (opt: any): Promise<MergeFileResult<T>> {
    const ffmpegClient = await ffmpeg(Version.pluginPath, {})
    if (ffmpegClient === false) {
      return false as unknown as MergeFileResult<T>  // 若ffmpeg初始化失败，返回 false
    }

    switch (this.type) {
      case '二合一（视频 + 音频）': {
        const result = await ffmpeg(`-y -i ${opt.path} -i ${opt.path2} -c copy ${opt.resultPath}`, { booleanResult:true })
        result ? logger.mark('视频合成成功！') : logger.error('视频合成失败！')
        await opt.callback(result)
        return result as unknown as MergeFileResult<T> // 布尔类型
      }
      case '视频*3 + 音频': {
        const result = await ffmpeg(`-y -stream_loop 2 -i ${opt.path} -i ${opt.path2} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest ${opt.resultPath}`, { booleanResult:true })
        result ? logger.mark('视频合成成功！') : logger.error('视频合成失败！')
        await opt.callback(result)
        return result as unknown as MergeFileResult<T> // 布尔类型
      }
      case '获取指定视频文件时长': {
        const { stdout } = await execPromise(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${opt.path}`)
        return parseFloat(stdout.trim()) as unknown as MergeFileResult<T>  // 数字类型
      }
      case '压缩视频': {
        const result = await ffmpeg(`-y -i "${opt.path}" -b:v ${opt.targetBitrate}k -maxrate ${opt.maxRate || opt.targetBitrate * 1.5}k -bufsize ${opt.bufSize || opt.targetBitrate * 2}k -crf ${opt.crf || 35} -preset medium -c:v libx264 -vf "scale='if(gte(iw/ih,16/9),1280,-1)':'if(gte(iw/ih,16/9),-1,720)',scale=ceil(iw/2)*2:ceil(ih/2)*2" "${opt.resultPath}"`,{ booleanResult:true })
        if (result) {
          logger.mark(`视频已压缩并保存到: ${opt.resultPath}`)
          await Common.removeFile(opt.path)
        } else logger.error(opt.path + ' 压缩失败！')
        return opt.resultPath as unknown as MergeFileResult<T>  // 字符串类型
      }
    }
  }
}
