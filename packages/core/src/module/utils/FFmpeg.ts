import { ffmpeg, ffprobe, logger } from 'node-karin'

import { Common } from '@/module/utils'

/** 获取媒体文件时长 */
export async function getMediaDuration (path: string): Promise<number> {
  const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path}"`)
  return parseFloat(parseFloat(stdout.trim()).toFixed(2))
}

/** 合并视频和音频（直接复制流） */
export async function mergeVideoAudio (
  videoPath: string,
  audioPath: string,
  resultPath: string
): Promise<boolean> {
  const result = await ffmpeg(`-y -i "${videoPath}" -i "${audioPath}" -c copy "${resultPath}"`)
  if (result.status) {
    logger.mark(`视频合成成功！文件地址：${resultPath}`)
  } else {
    logger.error('视频合成失败', result)
  }
  return result.status
}

/** 压缩视频选项 */
export interface CompressVideoOptions {
  /** 源文件路径 */
  inputPath: string
  /** 输出文件路径 */
  outputPath: string
  /** 目标比特率 (kbps) */
  targetBitrate: number
  /** 最大码率 (kbps)，默认 targetBitrate * 1.5 */
  maxRate?: number
  /** 缓冲区大小 (kbps)，默认 targetBitrate * 2 */
  bufSize?: number
  /** 恒定码率因子，默认 35 */
  crf?: number
  /** 是否删除源文件，默认 true */
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
    logger.mark(`视频已压缩并保存到: ${outputPath}`)
    if (removeSource) {
      Common.removeFile(inputPath)
    }
  } else {
    logger.error(`${inputPath} 压缩失败！`, result)
  }
  return result.status
}

/** Live 图合并模式 */
export type LiveImageMergeMode = 'independent' | 'continuous'

/** Live 图合并上下文（用于连续模式追踪 BGM 进度） */
export interface LiveImageMergeContext {
  /** BGM 文件路径 */
  bgmPath: string
  /** BGM 总时长（秒） */
  bgmDuration: number
  /** 当前已使用的 BGM 时长（秒） */
  usedDuration: number
}

/** 创建 Live 图合并上下文 */
export async function createLiveImageContext (bgmPath: string): Promise<LiveImageMergeContext> {
  const bgmDuration = await getMediaDuration(bgmPath)
  return {
    bgmPath,
    bgmDuration,
    usedDuration: 0
  }
}


/** Live 图合并选项 */
export interface LiveImageMergeOptions {
  /** Live 图视频路径 */
  videoPath: string
  /** 输出路径 */
  outputPath: string
  /** 视频循环次数，默认 3 */
  loopCount?: number
}

/**
 * 合并 Live 图视频与 BGM（独立模式）
 * 每张 Live 图都从 BGM 开头开始烧录
 */
export async function mergeLiveImageIndependent (
  options: LiveImageMergeOptions,
  bgmPath: string
): Promise<boolean> {
  const { videoPath, outputPath, loopCount = 3 } = options
  const streamLoop = loopCount - 1

  const result = await ffmpeg(
    `-y -stream_loop ${streamLoop} -i "${videoPath}" -i "${bgmPath}" ` +
    '-filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" ' +
    `-map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest "${outputPath}"`
  )

  if (result.status) {
    logger.mark(`Live 图合成成功！文件地址：${outputPath}`)
  } else {
    logger.error('Live 图合成失败', result)
  }
  return result.status
}

/**
 * 合并 Live 图视频与 BGM（连续模式）
 * BGM 从上次结束位置继续，结束后循环
 * @returns 更新后的上下文（包含新的 usedDuration）
 */
export async function mergeLiveImageContinuous (
  options: LiveImageMergeOptions,
  context: LiveImageMergeContext
): Promise<{ success: boolean; context: LiveImageMergeContext }> {
  const { videoPath, outputPath, loopCount = 3 } = options
  const { bgmPath, bgmDuration, usedDuration } = context
  const streamLoop = loopCount - 1

  // 获取原始视频时长
  const originalDuration = await getMediaDuration(videoPath)
  // 循环后的实际视频时长
  const totalVideoDuration = originalDuration * loopCount

  // 计算 BGM 起始位置（考虑循环）
  const bgmStartTime = usedDuration % bgmDuration

  // 计算需要的 BGM 时长，如果超过剩余 BGM 时长需要循环
  const remainingBgm = bgmDuration - bgmStartTime
  
  let filterComplex: string
  let inputArgs: string

  if (totalVideoDuration <= remainingBgm) {
    // BGM 剩余时长足够，直接从 bgmStartTime 开始截取
    inputArgs = `-y -stream_loop ${streamLoop} -i "${videoPath}" -ss ${bgmStartTime} -i "${bgmPath}"`
    filterComplex = '[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=3[aout]'
  } else {
    // BGM 需要循环，计算需要循环几次
    const bgmLoopCount = Math.ceil(totalVideoDuration / bgmDuration) + 1
    inputArgs = `-y -stream_loop ${streamLoop} -i "${videoPath}" -stream_loop ${bgmLoopCount} -ss ${bgmStartTime} -i "${bgmPath}"`
    filterComplex = '[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=3[aout]'
  }

  const result = await ffmpeg(
    `${inputArgs} -filter_complex "${filterComplex}" ` +
    `-map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest "${outputPath}"`
  )

  // 更新已使用时长
  const newUsedDuration = (usedDuration + totalVideoDuration) % bgmDuration

  if (result.status) {
    const remainingBgmTime = bgmDuration - newUsedDuration
    logger.mark(
      `Live 图连续合成成功！文件地址：${outputPath}\n` +
      `  本次使用 BGM：${totalVideoDuration.toFixed(2)}s（视频时长 ${originalDuration.toFixed(2)}s × ${loopCount}）\n` +
      `  BGM 进度：${newUsedDuration.toFixed(2)}s / ${bgmDuration.toFixed(2)}s，剩余 ${remainingBgmTime.toFixed(2)}s`
    )
  } else {
    logger.error('Live 图连续合成失败', result)
  }

  return {
    success: result.status,
    context: {
      ...context,
      usedDuration: newUsedDuration
    }
  }
}

/**
 * 批量合并 Live 图视频与 BGM
 * @param videos Live 图视频列表
 * @param bgmPath BGM 路径
 * @param outputDir 输出目录
 * @param mode 合并模式
 * @param loopCount 视频循环次数
 * @returns 合并结果列表
 */
export async function batchMergeLiveImages (
  videos: Array<{ path: string; outputName: string }>,
  bgmPath: string,
  outputDir: string,
  mode: LiveImageMergeMode = 'independent',
  loopCount: number = 3
): Promise<Array<{ success: boolean; outputPath: string }>> {
  const results: Array<{ success: boolean; outputPath: string }> = []

  if (mode === 'independent') {
    // 独立模式：每张图都从 BGM 开头开始
    for (const video of videos) {
      const outputPath = `${outputDir}${video.outputName}`
      const success = await mergeLiveImageIndependent(
        { videoPath: video.path, outputPath, loopCount },
        bgmPath
      )
      results.push({ success, outputPath })
    }
  } else {
    // 连续模式：BGM 连续播放
    let context = await createLiveImageContext(bgmPath)
    for (const video of videos) {
      const outputPath = `${outputDir}${video.outputName}`
      const result = await mergeLiveImageContinuous(
        { videoPath: video.path, outputPath, loopCount },
        context
      )
      context = result.context
      results.push({ success: result.success, outputPath })
    }
  }

  return results
}