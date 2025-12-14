/**
 * FFmpeg 通用工具模块
 */
import { ffmpeg, ffprobe, logger } from 'node-karin'

import { Common } from '@/module/utils'

// ==================== 媒体信息 ====================

/** 获取媒体时长（秒） */
export async function getMediaDuration (path: string): Promise<number> {
  const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path}"`)
  return parseFloat(parseFloat(stdout.trim()).toFixed(2))
}

// ==================== 视频合并 ====================

/** 合并视频和音频（直接复制流） */
export async function mergeVideoAudio (
  videoPath: string,
  audioPath: string,
  resultPath: string
): Promise<boolean> {
  const result = await ffmpeg(`-y -i "${videoPath}" -i "${audioPath}" -c copy "${resultPath}"`)
  if (result.status) {
    logger.mark(`视频合成成功: ${resultPath}`)
  } else {
    logger.error('视频合成失败', result)
  }
  return result.status
}

// ==================== 视频压缩 ====================

export interface CompressVideoOptions {
  inputPath: string
  outputPath: string
  targetBitrate: number
  maxRate?: number
  bufSize?: number
  crf?: number
  removeSource?: boolean
}

/** 压缩视频 */
export async function compressVideo (options: CompressVideoOptions): Promise<boolean> {
  const {
    inputPath,
    outputPath,
    targetBitrate,
    maxRate = targetBitrate * 1.5,
    bufSize = targetBitrate * 2,
    crf = 35,
    removeSource = true
  } = options

  const result = await ffmpeg(
    `-y -i "${inputPath}" -b:v ${targetBitrate}k -maxrate ${maxRate}k -bufsize ${bufSize}k ` +
    `-crf ${crf} -preset medium -c:v libx264 ` +
    '-vf "scale=\'if(gte(iw/ih,16/9),1280,-1)\':\'if(gte(iw/ih,16/9),-1,720)\',scale=ceil(iw/2)*2:ceil(ih/2)*2" ' +
    `"${outputPath}"`
  )

  if (result.status) {
    logger.mark(`视频压缩成功: ${outputPath}`)
    if (removeSource) Common.removeFile(inputPath)
  } else {
    logger.error(`视频压缩失败: ${inputPath}`, result)
  }
  return result.status
}

// ==================== Live 图合并 ====================

export type LiveImageMergeMode = 'independent' | 'continuous'

export interface LiveImageMergeContext {
  bgmPath: string
  bgmDuration: number
  usedDuration: number
}

export interface LiveImageMergeOptions {
  videoPath: string
  outputPath: string
  loopCount?: number
}

/** 创建 Live 图合并上下文 */
export async function createLiveImageContext (bgmPath: string): Promise<LiveImageMergeContext> {
  return {
    bgmPath,
    bgmDuration: await getMediaDuration(bgmPath),
    usedDuration: 0
  }
}

/** Live 图合并（独立模式） */
export async function mergeLiveImageIndependent (
  options: LiveImageMergeOptions,
  bgmPath: string
): Promise<boolean> {
  const { videoPath, outputPath, loopCount = 3 } = options

  const result = await ffmpeg(
    `-y -stream_loop ${loopCount - 1} -i "${videoPath}" -i "${bgmPath}" ` +
    '-filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" ' +
    `-map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest "${outputPath}"`
  )

  if (result.status) {
    logger.mark(`Live 图合成成功: ${outputPath}`)
  } else {
    logger.error('Live 图合成失败', result)
  }
  return result.status
}

/** Live 图合并（连续模式） */
export async function mergeLiveImageContinuous (
  options: LiveImageMergeOptions,
  context: LiveImageMergeContext
): Promise<{ success: boolean; context: LiveImageMergeContext }> {
  const { videoPath, outputPath, loopCount = 3 } = options
  const { bgmPath, bgmDuration, usedDuration } = context

  const originalDuration = await getMediaDuration(videoPath)
  const totalDuration = originalDuration * loopCount
  const bgmStartTime = usedDuration % bgmDuration
  const remainingBgm = bgmDuration - bgmStartTime

  let inputArgs: string
  if (totalDuration <= remainingBgm) {
    inputArgs = `-y -stream_loop ${loopCount - 1} -i "${videoPath}" -ss ${bgmStartTime} -i "${bgmPath}"`
  } else {
    const bgmLoopCount = Math.ceil(totalDuration / bgmDuration) + 1
    inputArgs = `-y -stream_loop ${loopCount - 1} -i "${videoPath}" -stream_loop ${bgmLoopCount} -ss ${bgmStartTime} -i "${bgmPath}"`
  }

  const result = await ffmpeg(
    `${inputArgs} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=3[aout]" ` +
    `-map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest "${outputPath}"`
  )

  const newUsedDuration = (usedDuration + totalDuration) % bgmDuration

  if (result.status) {
    logger.mark(`Live 图连续合成成功: ${outputPath}`)
  } else {
    logger.error('Live 图连续合成失败', result)
  }

  return {
    success: result.status,
    context: { ...context, usedDuration: newUsedDuration }
  }
}

/** 批量合并 Live 图 */
export async function batchMergeLiveImages (
  videos: Array<{ path: string; outputName: string }>,
  bgmPath: string,
  outputDir: string,
  mode: LiveImageMergeMode = 'independent',
  loopCount = 3
): Promise<Array<{ success: boolean; outputPath: string }>> {
  const results: Array<{ success: boolean; outputPath: string }> = []

  if (mode === 'independent') {
    for (const video of videos) {
      const outputPath = `${outputDir}${video.outputName}`
      const success = await mergeLiveImageIndependent({ videoPath: video.path, outputPath, loopCount }, bgmPath)
      results.push({ success, outputPath })
    }
  } else {
    let context = await createLiveImageContext(bgmPath)
    for (const video of videos) {
      const outputPath = `${outputDir}${video.outputName}`
      const result = await mergeLiveImageContinuous({ videoPath: video.path, outputPath, loopCount }, context)
      context = result.context
      results.push({ success: result.success, outputPath })
    }
  }

  return results
}

// ==================== 兼容导出（弹幕相关） ====================
// 从 Danmaku 模块重新导出，保持向后兼容

export {
  burnDanmaku as burnDanmakuToVideo,
  type DanmakuOptions as DanmakuBurnOptions,
  type DanmakuElem,
  generateASS as danmakuToASS,
  mergeAndBurn as mergeAndBurnDanmaku
} from './Danmaku'
