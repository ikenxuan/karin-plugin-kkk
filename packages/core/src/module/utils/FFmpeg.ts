import fs from 'node:fs'
import path from 'node:path'

import { ffmpeg, ffprobe, logger } from 'node-karin'

import { Common } from '@/module/utils'

// ==================== 媒体信息 ====================

/** 
 * 修复 m4s 文件为标准 MP4 格式
 * B站的 DASH 流使用 m4s 格式，缺少 moov atom，需要转换
 */
export async function fixM4sFile (
  inputPath: string,
  outputPath: string
): Promise<boolean> {
  // 使用 -c copy 直接复制流，只重新封装容器
  const result = await ffmpeg(`-y -i "${inputPath}" -c copy -movflags +faststart "${outputPath}"`)
  if (result.status) {
    logger.debug(`m4s 文件修复成功: ${outputPath}`)
  } else {
    logger.error('m4s 文件修复失败', result)
  }
  return result.status
}

/**
 * 获取媒体时长（秒）
 * @param path 媒体路径
 * @returns 媒体时长（秒）
 */
export async function getMediaDuration (path: string): Promise<number> {
  const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path}"`)
  return Number.parseFloat(stdout.trim())
}

/**
 * 获取媒体帧率（fps）
 * @param path 媒体路径
 */
export const getMediaFrameRate = async (path: string): Promise<number> => {
  const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`)
  const rate = stdout.trim()
  if (!rate) return 30
  if (rate.includes('/')) {
    const [num, den] = rate.split('/', 2).map(value => Number(value))
    if (!num || !den) return 30
    return Math.round((num / den) * 100) / 100
  }
  const parsed = Number(rate)
  if (!parsed || Number.isNaN(parsed)) return 30
  return Math.round(parsed * 100) / 100
}

/** 重放视频（不添加 BGM） */
export async function loopVideo (
  inputPath: string,
  outputPath: string,
  loopCount: number
): Promise<boolean> {
  if (loopCount <= 1) {
    fs.copyFileSync(inputPath, outputPath)
    return true
  }

  const result = await ffmpeg(
    `-y -stream_loop ${loopCount - 1} -i "${inputPath}" -c copy "${outputPath}"`
  )

  if (result.status) {
    logger.debug(`视频重放成功: ${outputPath}`)
  } else {
    logger.error('视频重放失败', result)
  }
  return result.status
}

/**
 * 生成 iPhone Live Photo 风格视频并按需合并 BGM
 * @param options 合成参数
 */
export const loopVideoWithTransition = async (
  options: LiveImageMergeOptions
): Promise<{ success: boolean; context?: LiveImageMergeOptions['context'] }> => {
  /** 步骤 1：解析参数与基础配置 */
  const {
    inputPath,
    outputPath,
    loopCount,
    staticImagePath,
    transitionEnabled = true,
    bgmPath,
    mergeMode = 'independent',
    context
  } = options

  /** 步骤 2：计算时长与过渡参数 */
  /** 原始视频时长（秒，使用高精度，避免分段累计误差） */
  const { stdout: durationStdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${inputPath}"`)
  const duration = Number(durationStdout.trim()) || 0
  /** 视频帧率（fps） */
  const videoFps = await getMediaFrameRate(inputPath)
  /** 过渡淡入淡出时长（秒） */
  const fadeDuration = transitionEnabled ? Math.min(0.5, Math.max(0.12, duration * 0.18)) : 0
  /** 静态图停留时长（秒），目标为 2.5s */
  const staticDuration = transitionEnabled ? 2.5 : 0
  /** 视频结束到静态图过渡的起始偏移（秒） */
  const videoFadeOffset = transitionEnabled ? Math.max(0, duration - fadeDuration) : 0

  /** 步骤 3：构建视频滤镜链（包含 Live Photo 过渡与停留） */
  /** 视频输入参数 */
  let inputArgs = `-stream_loop ${Math.max(0, loopCount - 1)} -i "${inputPath}"`
  /** 滤镜链定义 */
  let filterComplex = '[0:v]setpts=PTS-STARTPTS,format=yuv420p,setsar=1[outv]'
  /** 组合后视频时长（秒） */
  let composedDuration = duration * Math.max(1, loopCount)

  if (transitionEnabled) {
    /** 追加静态图输入 */
    inputArgs = `-stream_loop ${Math.max(0, loopCount)} -i "${inputPath}" -loop 1 -i "${staticImagePath}"`
    /** 拆分视频与静态图输入，构建多段过渡链 */
    const splitLabels = Array.from({ length: loopCount }, (_, index) => `[vsplit${index}]`).join('')
    const stillSplitLabels = Array.from({ length: loopCount }, (_, index) => `[still${index}]`).join('')
    const filterParts: string[] = [
      `[0:v]setpts=PTS-STARTPTS,settb=1/1000,format=yuv420p,setsar=1,fps=${videoFps}[vbase]`,
      `[vbase]split=${loopCount}${splitLabels}`,
      `[1:v]setpts=PTS-STARTPTS,settb=1/1000,format=yuv420p,setsar=1,fps=${videoFps}[still_base]`,
      `[still_base]split=${loopCount}${stillSplitLabels}`
    ]

    for (let i = 0; i < loopCount; i += 1) {
      /** 单段视频裁切 */
      const start = Math.max(0, duration * i)
      filterParts.push(`[vsplit${i}]trim=start=${start}:duration=${duration},setpts=PTS-STARTPTS,settb=1/1000[v${i}]`)
      /** 静态图与视频对齐尺寸 */
      filterParts.push(`[still${i}][v${i}]scale2ref=iw:ih:flags=lanczos[s${i}raw][v${i}r]`)
      /** 静态图裁切为固定停留时间 */
      filterParts.push(`[s${i}raw]trim=duration=${staticDuration},setpts=PTS-STARTPTS,settb=1/1000[s${i}]`)
    }

    /** 通过 xfade 串联视频与静态图片段 */
    let lastLabel = 'x_s0'
    /** 初始时长为第一段视频 */
    composedDuration = duration
    filterParts.push(`[v0r][s0]xfade=transition=fade:duration=${fadeDuration}:offset=${videoFadeOffset}[${lastLabel}]`)
    /** 累加静态图停留时长 */
    composedDuration = composedDuration + staticDuration - fadeDuration

    for (let i = 1; i < loopCount; i += 1) {
      const toVideoLabel = `x_v${i}`
      const toStillLabel = `x_s${i}`
      /** 从静态图过渡到下一段视频 */
      const offsetToVideo = Math.max(0, composedDuration - fadeDuration)
      filterParts.push(`[${lastLabel}][v${i}r]xfade=transition=fade:duration=${fadeDuration}:offset=${offsetToVideo}[${toVideoLabel}]`)
      /** 累加当前视频片段时长 */
      composedDuration = composedDuration + duration - fadeDuration
      /** 从视频过渡到静态图 */
      const offsetToStill = Math.max(0, composedDuration - fadeDuration)
      filterParts.push(`[${toVideoLabel}][s${i}]xfade=transition=fade:duration=${fadeDuration}:offset=${offsetToStill}[${toStillLabel}]`)
      /** 累加静态图停留时长 */
      composedDuration = composedDuration + staticDuration - fadeDuration
      lastLabel = toStillLabel
    }

    /** 生成最终输出 */
    filterParts.push(`[${lastLabel}]null[outv]`)
    filterComplex = filterParts.join(';')
  }

  /** 步骤 4：按需合并 BGM（独立/连续） */
  let mergeContext: LiveImageMergeOptions['context'] | undefined
  if (bgmPath) {
    /** 初始化连续模式上下文 */
    const baseContext = context ?? {
      bgmPath,
      bgmDuration: await getMediaDuration(bgmPath),
      usedDuration: 0
    }
    /** 合成总时长（秒） */
    const totalDuration = transitionEnabled ? composedDuration : duration * Math.max(1, loopCount)
    /** BGM 输入参数 */
    let bgmInputArgs = `-i "${bgmPath}"`
    /** BGM 输入序号（与静态图输入数量相关） */
    const bgmInputIndex = transitionEnabled ? 2 : 1
    /** BGM 是否需要循环覆盖视频时长 */
    const bgmNeedLoop = totalDuration > baseContext.bgmDuration

    if (mergeMode === 'continuous') {
      /** 连续模式：从上次使用位置开始拼接 */
      const bgmStartTime = baseContext.usedDuration % baseContext.bgmDuration
      const remainingBgm = baseContext.bgmDuration - bgmStartTime
      if (totalDuration <= remainingBgm) {
        bgmInputArgs = `-ss ${bgmStartTime} -i "${bgmPath}"`
      } else {
        /** 需要循环 BGM 来覆盖合成时长 */
        const bgmLoopCount = Math.ceil(totalDuration / baseContext.bgmDuration) + 1
        bgmInputArgs = `-stream_loop ${bgmLoopCount} -ss ${bgmStartTime} -i "${bgmPath}"`
      }
    } else if (bgmNeedLoop) {
      /** 独立模式：从开头循环 BGM 覆盖视频时长 */
      const bgmLoopCount = Math.max(0, Math.ceil(totalDuration / baseContext.bgmDuration) - 1)
      bgmInputArgs = `-stream_loop ${bgmLoopCount} -i "${bgmPath}"`
    }

    /** 选择混音时长策略：以视频为准，保证循环次数不被截断 */
    const audioDurationMode = 'longest'
    const result = await ffmpeg(
      `-y ${inputArgs} ${bgmInputArgs} -filter_complex "${filterComplex};[0:a][${bgmInputIndex}:a]amix=inputs=2:duration=${audioDurationMode}:dropout_transition=3[aout]" ` +
      `-map "[outv]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -pix_fmt yuv420p -shortest "${outputPath}"`
    )

    if (result.status) {
      logger.debug(`Live Photo 效果视频重放成功: ${outputPath}`)
    } else {
      logger.error('Live Photo 效果视频重放失败', result)
    }

    if (mergeMode === 'continuous') {
      const outputDuration = result.status ? await getMediaDuration(outputPath) : totalDuration
      const validDuration = Number.isFinite(outputDuration) && outputDuration > 0 ? outputDuration : totalDuration
      /** 更新连续模式上下文 */
      mergeContext = {
        ...baseContext,
        usedDuration: (baseContext.usedDuration + validDuration) % baseContext.bgmDuration
      }
    }

    return {
      success: result.status,
      context: mergeContext
    }
  }

  /** 步骤 5：仅输出视频（无 BGM） */
  const result = await ffmpeg(
    `-y ${inputArgs} -filter_complex "${filterComplex}" -map "[outv]" -c:v libx264 -pix_fmt yuv420p "${outputPath}"`
  )

  if (result.status) {
    logger.debug(`Live Photo 效果视频重放成功: ${outputPath}`)
  } else {
    logger.error('Live Photo 效果视频重放失败', result)
  }

  return {
    success: result.status
  }
}

const xmpHeaderBuffer = Buffer.from('http://ns.adobe.com/xap/1.0/\u0000', 'utf8')

/**
 * 判断是否为 JPEG 文件头
 * @param fileBuffer 文件字节流
 * @returns 是否为 JPEG
 */
const isJpegBuffer = (fileBuffer: Buffer): boolean => {
  return fileBuffer.length > 2 && fileBuffer[0] === 0xFF && fileBuffer[1] === 0xD8
}

/**
 * 构建 Motion Photo 所需 XMP 内容
 * @param videoLength 视频字节长度
 * @param presentationTimestampUs 主帧时间戳（微秒）
 * @returns XMP 字符串
 */
const buildMotionPhotoXmp = (videoLength: number, presentationTimestampUs: number): string => {
  const descriptionAttrs = [
    'xmlns:GCamera="http://ns.google.com/photos/1.0/camera/"',
    'xmlns:MiCamera="http://ns.xiaomi.com/photos/1.0/camera/"',
    'xmlns:Container="http://ns.google.com/photos/1.0/container/"',
    'xmlns:Item="http://ns.google.com/photos/1.0/container/item/"',
    `GCamera:MotionPhoto="1" GCamera:MotionPhotoVersion="1" GCamera:MotionPhotoPresentationTimestampUs="${presentationTimestampUs}"`,
    `GCamera:MicroVideo="1" GCamera:MicroVideoVersion="1" GCamera:MicroVideoOffset="${videoLength}"`,
    `GCamera:MicroVideoPresentationTimestampUs="${presentationTimestampUs}"`,
    'MiCamera:XMPMeta="&lt;?xml version=&apos;1.0&apos; encoding=&apos;UTF-8&apos; standalone=&apos;yes&apos; ?&gt;"',
    'xmlns:OpCamera="http://ns.oplus.com/photos/1.0/camera/"',
    `OpCamera:MotionPhotoPrimaryPresentationTimestampUs="${presentationTimestampUs}"`,
    'OpCamera:MotionPhotoOwner="oplus"',
    'OpCamera:OLivePhotoVersion="2"',
    `OpCamera:VideoLength="${videoLength}"`
  ]
  return (
    '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.1.0-jc003">' +
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
    '<rdf:Description rdf:about="" ' +
    `${descriptionAttrs.join(' ')}>` +
    '<Container:Directory><rdf:Seq>' +
    '<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="image/jpeg" Item:Semantic="Primary" Item:Length="0" Item:Padding="0" /></rdf:li>' +
    `<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="video/mp4" Item:Semantic="MotionPhoto" Item:Length="${videoLength}" Item:Padding="0" /></rdf:li>` +
    '</rdf:Seq></Container:Directory>' +
    '</rdf:Description>' +
    '</rdf:RDF>' +
    '</x:xmpmeta>'
  )
}

/**
 * 将 XMP 写入 JPEG APP1 段
 * @param jpegBuffer JPEG 内容
 * @param xmpPacket XMP 内容
 * @returns 写入 XMP 后的 JPEG 内容
 */
const injectXmpToJpeg = (jpegBuffer: Buffer, xmpPacket: string): Buffer => {
  if (!isJpegBuffer(jpegBuffer)) {
    throw new Error('输入图片不是 JPEG 格式')
  }

  const xmpPayload = Buffer.concat([xmpHeaderBuffer, Buffer.from(xmpPacket, 'utf8')])
  const app1Length = xmpPayload.length + 2
  if (app1Length > 65535) {
    throw new Error('XMP 数据过大，无法写入 JPEG APP1')
  }

  const app1Segment = Buffer.alloc(4)
  app1Segment[0] = 0xFF
  app1Segment[1] = 0xE1
  app1Segment.writeUInt16BE(app1Length, 2)

  return Buffer.concat([
    jpegBuffer.subarray(0, 2),
    app1Segment,
    xmpPayload,
    jpegBuffer.subarray(2)
  ])
}

/**
 * 读取图片并保证输出为 JPEG 字节流
 * @param imagePath 图片路径
 * @returns JPEG 字节流
 */
const readOrConvertToJpeg = async (imagePath: string): Promise<Buffer> => {
  const sourceBuffer = fs.readFileSync(imagePath)
  if (isJpegBuffer(sourceBuffer)) {
    return sourceBuffer
  }

  const tempJpegPath = path.join(Common.tempDri.images, `MotionPhoto_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`)
  const result = await ffmpeg(`-y -i "${imagePath}" -frames:v 1 -q:v 2 "${tempJpegPath}"`)
  if (!result.status) {
    throw new Error(`图片转换 JPEG 失败: ${imagePath}`)
  }

  try {
    return fs.readFileSync(tempJpegPath)
  } finally {
    fs.rmSync(tempJpegPath, { force: true })
  }
}

/**
 * Google Motion Photo 构建参数
 */
export interface GoogleMotionPhotoOptions {
  /** 原图路径 */
  imagePath: string
  /** 视频路径 */
  videoPath: string
  /** 输出文件路径 */
  outputPath: string
  /** 主帧时间戳（微秒） */
  presentationTimestampUs?: number
}

/**
 * 生成 Google Motion Photo 文件（JPEG + MP4 trailer）
 * @param options 构建参数
 * @returns 是否生成成功
 */
export const buildGoogleMotionPhoto = async (options: GoogleMotionPhotoOptions): Promise<boolean> => {
  const {
    imagePath,
    videoPath,
    outputPath,
    presentationTimestampUs
  } = options

  try {
    const imageBuffer = await readOrConvertToJpeg(imagePath)
    const videoBuffer = fs.readFileSync(videoPath)
    let resolvedPresentationTimestampUs = presentationTimestampUs
    if (resolvedPresentationTimestampUs === undefined || resolvedPresentationTimestampUs < 0) {
      const videoDurationSeconds = await getMediaDuration(videoPath)
      if (Number.isFinite(videoDurationSeconds) && videoDurationSeconds > 0) {
        resolvedPresentationTimestampUs = Math.round(videoDurationSeconds * 500000)
      } else {
        resolvedPresentationTimestampUs = 1500000
      }
    }
    const xmpPacket = buildMotionPhotoXmp(videoBuffer.length, resolvedPresentationTimestampUs)
    const jpegWithXmp = injectXmpToJpeg(imageBuffer, xmpPacket)
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, Buffer.concat([jpegWithXmp, videoBuffer]))
    logger.debug(`Google Motion Photo 封面生成成功: ${outputPath}`)
    return true
  } catch (error) {
    logger.error('Google Motion Photo 封面生成失败', error)
    return false
  }
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
    logger.debug(`视频合成成功: ${resultPath}`)
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
    logger.debug(`视频压缩成功: ${outputPath}`)
    if (removeSource) Common.removeFile(inputPath)
  } else {
    logger.error(`视频压缩失败: ${inputPath}`, result)
  }
  return result.status
}

// ==================== Live 图合并 ====================

/**
 * Live 图合并模式
 * @remarks
 * - independent：每张图从 BGM 开始
 * - continuous：BGM 连续衔接播放
 */
export type LiveImageMergeMode = 'independent' | 'continuous'

/**
 * Live Photo 合成参数
 */
export interface LiveImageMergeOptions {
  /** 输入视频路径 */
  inputPath: string
  /** 输出视频路径 */
  outputPath: string
  /** 循环次数 */
  loopCount: number
  /** 静态图路径 */
  staticImagePath: string
  /** 是否启用 Live Photo 过渡 */
  transitionEnabled?: boolean
  /** BGM 路径 */
  bgmPath?: string
  /**
   * Live 图 BGM 的合并模式
   * @remarks
   * - independent：每张图从 BGM 开始
   * - continuous：BGM 连续衔接播放
   */
  mergeMode?: LiveImageMergeMode
  /** 连续模式上下文 */
  context?: {
    /** BGM 路径 */
    bgmPath: string
    /** BGM 时长（秒） */
    bgmDuration: number
    /** 已使用的 BGM 时长（秒） */
    usedDuration: number
  }
}
