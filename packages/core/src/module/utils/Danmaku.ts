/**
 * 弹幕处理模块
 * 负责弹幕数据转换、ASS 字幕生成、视频烧录等功能
 */
import fs from 'node:fs'
import os from 'node:os'

import { ffmpeg, ffprobe, logger } from 'node-karin'

import { Common } from '@/module/utils'

// ==================== 类型定义 ====================

/** 弹幕元素 */
export interface DanmakuElem {
  /** 出现时间（毫秒） */
  progress: number
  /** 类型：1/2/3 滚动，4 底部，5 顶部 */
  mode: number
  /** 字号：18 小，25 标准，36 大 */
  fontsize: number
  /** 颜色（十进制 RGB888） */
  color: number
  /** 内容 */
  content: string
}

/** 横屏转竖屏模式 */
export type VerticalMode = 'off' | 'standard' | 'force'

/** 视频编码格式 */
export type VideoCodec = 'h264' | 'h265' | 'av1'

/** 弹幕烧录配置 */
export interface DanmakuOptions {
  /** 弹幕显示区域比例（0.25/0.5/0.75/1） */
  danmakuArea?: number
  /** 横屏转竖屏模式 */
  verticalMode?: VerticalMode
  /** 滚动时间（秒） */
  scrollTime?: number
  /** 透明度（0-255） */
  opacity?: number
  /** 字体 */
  fontName?: string
  /** 删除源文件 */
  removeSource?: boolean
  /** 视频编码格式（默认 h265） */
  videoCodec?: VideoCodec
}

// ==================== 编码器检测 ====================

/** 各编码格式的硬件编码器优先级 */
const ENCODER_PRIORITY: Record<VideoCodec, readonly string[]> = {
  h264: ['h264_nvenc', 'h264_qsv', 'h264_amf', 'libx264'],
  h265: ['hevc_nvenc', 'hevc_qsv', 'hevc_amf', 'libx265'],
  av1: ['av1_nvenc', 'av1_qsv', 'av1_amf', 'libsvtav1', 'libaom-av1']
} as const

/** 各编码格式的软件回退编码器 */
const SOFTWARE_FALLBACK: Record<VideoCodec, string> = {
  h264: 'libx264',
  h265: 'libx265',
  av1: 'libsvtav1'
}

/** 缓存检测结果（按编码格式） */
const cachedEncoders: Partial<Record<VideoCodec, string>> = {}

/** 检测可用的硬件编码器 */
async function detectEncoder (codec: VideoCodec): Promise<string> {
  if (cachedEncoders[codec]) return cachedEncoders[codec]!

  logger.debug(`[Danmaku] 开始检测 ${codec.toUpperCase()} 编码器...`)

  for (const encoder of ENCODER_PRIORITY[codec]) {
    logger.debug(`[Danmaku] 测试编码器: ${encoder}`)
    try {
      // NVENC 最小支持 256x256，用 320x240 测试
      const result = await ffmpeg(
        `-f lavfi -i color=c=black:s=320x240:d=0.1 -c:v ${encoder} -f null -`
      )
      logger.debug(`[Danmaku] ${encoder} 测试结果: status=${result.status}`)
      if (result.status) {
        cachedEncoders[codec] = encoder
        logger.info(`[Danmaku] 使用 ${codec.toUpperCase()} 编码器: ${encoder}`)
        return encoder
      }
    } catch (e) {
      logger.debug(`[Danmaku] 编码器 ${encoder} 测试异常: ${e}`)
    }
  }

  const fallback = SOFTWARE_FALLBACK[codec]
  cachedEncoders[codec] = fallback
  logger.info(`[Danmaku] 回退到软件编码器: ${fallback}`)
  return fallback
}

/** 获取视频码率（kbps） */
async function getVideoBitrate (path: string): Promise<number> {
  // 优先使用文件大小和时长计算码率（最准确，因为 DASH 片段的元数据可能不准确）
  try {
    const fileSize = fs.statSync(path).size // 字节
    const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const duration = parseFloat(stdout.trim())
    if (duration > 0 && fileSize > 0) {
      const kbps = Math.round((fileSize * 8) / duration / 1000)
      logger.debug(`[Danmaku] 通过文件大小计算码率: ${kbps}kbps (文件: ${(fileSize / 1024 / 1024).toFixed(2)}MB, 时长: ${duration.toFixed(2)}s)`)
      return kbps
    }
  } catch (e) {
    logger.debug(`[Danmaku] 通过文件大小计算码率失败: ${e}`)
  }

  // 备用方法：从流信息读取码率
  try {
    const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const bitrate = parseInt(stdout.trim())
    if (bitrate > 0) {
      const kbps = Math.round(bitrate / 1000)
      logger.debug(`[Danmaku] 从流信息读取码率: ${kbps}kbps`)
      return kbps
    }
  } catch {
    logger.debug('[Danmaku] ffprobe 读取流码率失败')
  }

  // 备用方法：从格式信息读取码率
  try {
    const { stdout } = await ffprobe(`-v error -show_entries format=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const bitrate = parseInt(stdout.trim())
    if (bitrate > 0) {
      const kbps = Math.round(bitrate / 1000)
      logger.debug(`[Danmaku] 从格式信息读取码率: ${kbps}kbps`)
      return kbps
    }
  } catch {
    logger.debug('[Danmaku] ffprobe 读取格式码率失败')
  }

  logger.warn('[Danmaku] 无法获取视频码率，将使用 CRF 模式')
  return 0
}

/** 获取编码器参数（支持目标码率） */
function getEncoderParams (encoder: string, targetBitrate?: number): string {
  const threads = Math.max(1, Math.floor(os.cpus().length / 2))

  // 如果有目标码率，使用 VBR 模式，允许复杂画面使用更高码率
  if (targetBitrate && targetBitrate > 0) {
    const bitrateK = `${targetBitrate}k`
    const maxrate = `${Math.round(targetBitrate * 2)}k` // 最大码率为目标的 2 倍，保证复杂画面质量
    const bufsize = `${Math.round(targetBitrate * 4)}k` // 缓冲区为目标的 4 倍

    // H.264 编码器（VBR 模式）
    if (encoder === 'h264_nvenc') return `-c:v h264_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'h264_qsv') return `-c:v h264_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'h264_amf') return `-c:v h264_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`
    if (encoder === 'libx264') return `-c:v libx264 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`

    // H.265 编码器（VBR 模式）
    if (encoder === 'hevc_nvenc') return `-c:v hevc_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'hevc_qsv') return `-c:v hevc_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'hevc_amf') return `-c:v hevc_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`
    if (encoder === 'libx265') return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`

    // AV1 编码器（VBR 模式）
    if (encoder === 'av1_nvenc') return `-c:v av1_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'av1_qsv') return `-c:v av1_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'av1_amf') return `-c:v av1_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`
    if (encoder === 'libsvtav1') return `-c:v libsvtav1 -preset 6 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`
    if (encoder === 'libaom-av1') return `-c:v libaom-av1 -cpu-used 4 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`

    return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`
  }

  // 无目标码率时使用 CRF/CQ 模式
  // H.264 编码器（CRF 23 是视觉无损的推荐值）
  if (encoder === 'h264_nvenc') return '-c:v h264_nvenc -preset p4 -rc vbr -cq 23'
  if (encoder === 'h264_qsv') return '-c:v h264_qsv -preset medium -global_quality 23'
  if (encoder === 'h264_amf') return '-c:v h264_amf -quality balanced -rc cqp -qp_i 23 -qp_p 23'
  if (encoder === 'libx264') return `-c:v libx264 -crf 23 -preset medium -threads ${threads}`

  // H.265 编码器（CRF 28 是默认推荐值）
  if (encoder === 'hevc_nvenc') return '-c:v hevc_nvenc -preset p4 -rc vbr -cq 28'
  if (encoder === 'hevc_qsv') return '-c:v hevc_qsv -preset medium -global_quality 28'
  if (encoder === 'hevc_amf') return '-c:v hevc_amf -quality balanced -rc cqp -qp_i 28 -qp_p 28'
  if (encoder === 'libx265') return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`

  // AV1 编码器（CRF 30 是推荐值，AV1 压缩效率更高）
  if (encoder === 'av1_nvenc') return '-c:v av1_nvenc -preset p4 -rc vbr -cq 30'
  if (encoder === 'av1_qsv') return '-c:v av1_qsv -preset medium -global_quality 30'
  if (encoder === 'av1_amf') return '-c:v av1_amf -quality balanced -rc cqp -qp_i 30 -qp_p 30'
  if (encoder === 'libsvtav1') return `-c:v libsvtav1 -crf 30 -preset 6 -threads ${threads}`
  if (encoder === 'libaom-av1') return `-c:v libaom-av1 -crf 30 -cpu-used 4 -threads ${threads}`

  // 默认回退到 libx265
  return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`
}

// ==================== 内部工具函数 ====================

/** 颜色转 ASS 格式（BGR） */
const toASSColor = (color: number): string => {
  const r = (color >> 16) & 0xff
  const g = (color >> 8) & 0xff
  const b = color & 0xff
  return `${b.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${r.toString(16).padStart(2, '0')}`.toUpperCase()
}

/** 毫秒转 ASS 时间格式 */
const toASSTime = (ms: number): string => {
  const s = ms / 1000
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  const cs = Math.floor((s % 1) * 100)
  return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`
}

/** 估算文本宽度 */
const estimateWidth = (text: string, fontSize: number): number => {
  let w = 0
  for (const c of text) {
    w += c.charCodeAt(0) > 127 ? fontSize : fontSize * 0.5
  }
  return w
}

/** 转义 ASS 特殊字符 */
const escapeASS = (text: string): string =>
  text.replace(/\\/g, '\\\\').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\n/g, '\\N')

/** 转义 Windows 路径 */
const escapeWinPath = (path: string): string =>
  path.replace(/\\/g, '/').replace(/:/g, '\\:')

/** 是否横屏 */
const isLandscape = (w: number, h: number) => w > h

// ==================== FFprobe 工具 ====================

/** 获取视频分辨率（支持 DASH 片段） */
export async function getResolution (path: string): Promise<{ width: number; height: number }> {
  try {
    const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${path}"`)
    const [w, h] = stdout.trim().split('x').map(Number)
    if (w && h) return { width: w, height: h }
  } catch {
    logger.debug('[Danmaku] ffprobe 读取分辨率失败，尝试使用 ffmpeg')
  }
  // 对于 DASH 片段，使用 ffmpeg 读取
  try {
    const result = await ffmpeg(`-i "${path}" -f null -`, { timeout: 5000 })
    const stderr = result.stderr || ''
    const match = stderr.match(/(\d{3,4})x(\d{3,4})/)
    if (match) {
      return { width: parseInt(match[1]), height: parseInt(match[2]) }
    }
  } catch {
    // ignore
  }
  return { width: 1920, height: 1080 }
}

/** 获取视频帧率（支持 DASH 片段） */
export async function getFrameRate (path: string): Promise<number> {
  try {
    const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const [num, den] = stdout.trim().split('/').map(Number)
    if (den > 0) return num / den
  } catch {
    logger.debug('[Danmaku] ffprobe 读取帧率失败，尝试使用 ffmpeg')
  }
  // 对于 DASH 片段，使用 ffmpeg 读取
  try {
    const result = await ffmpeg(`-i "${path}" -f null -`, { timeout: 5000 })
    const stderr = result.stderr || ''
    // 匹配 "30 fps" 或 "29.97 fps" 或 "30000/1001 fps"
    const fpsMatch = stderr.match(/(\d+(?:\.\d+)?)\s*fps/)
    if (fpsMatch) return parseFloat(fpsMatch[1])
    const fracMatch = stderr.match(/(\d+)\/(\d+)\s*fps/)
    if (fracMatch) return parseInt(fracMatch[1]) / parseInt(fracMatch[2])
  } catch {
    // ignore
  }
  return 30
}

// ==================== ASS 生成 ====================

interface TrackInfo {
  startTime: number
  duration: number
  textWidth: number
}

/**
 * 生成 ASS 字幕内容
 */
export function generateASS (
  danmakuList: DanmakuElem[],
  width: number,
  height: number,
  options: DanmakuOptions = {}
): string {
  const {
    scrollTime = 8,
    opacity = 180,
    fontName = 'Microsoft YaHei',
    danmakuArea = 0.5
  } = options

  // 计算参数
  const fontScale = height / 1080
  const fontSize = Math.round(25 * fontScale)
  const trackH = Math.round(30 * fontScale)
  const topMargin = Math.round(10 * fontScale) // 顶部边距
  const bottomMargin = Math.round(10 * fontScale) // 底部边距

  // 弹幕区域高度（去除上下边距）
  const areaHeight = Math.floor(height * danmakuArea) - topMargin - bottomMargin
  // 滚动弹幕轨道数量：需要预留一个字体高度的空间，避免最后一条轨道超出区域
  const trackCount = Math.max(1, Math.floor((areaHeight - fontSize) / trackH))
  // 顶部/底部固定弹幕的轨道数量：与滚动弹幕共用相同的轨道数
  const fixedTrackCount = trackCount
  const minGap = Math.round(10 * fontScale)
  const alpha = (255 - opacity).toString(16).padStart(2, '0').toUpperCase()

  // ASS 头部
  let ass = `[Script Info]
Title: Danmaku
ScriptType: v4.00+
PlayResX: ${width}
PlayResY: ${height}
Timer: 100.0000

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Scroll,${fontName},${fontSize},&H${alpha}FFFFFF,&H${alpha}FFFFFF,&H${alpha}000000,&H${alpha}000000,0,0,0,0,100,100,0,0,1,1,0,2,0,0,0,1
Style: Top,${fontName},${fontSize},&H${alpha}FFFFFF,&H${alpha}FFFFFF,&H${alpha}000000,&H${alpha}000000,0,0,0,0,100,100,0,0,1,1,0,8,0,0,0,1
Style: Bottom,${fontName},${fontSize},&H${alpha}FFFFFF,&H${alpha}FFFFFF,&H${alpha}000000,&H${alpha}000000,0,0,0,0,100,100,0,0,1,1,0,2,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`

  // 轨道状态
  const scrollTracks: (TrackInfo | null)[] = Array(trackCount).fill(null)
  // 顶部/底部固定弹幕使用独立的轨道数量
  const topTracks: number[] = Array(fixedTrackCount).fill(0)
  const bottomTracks: number[] = Array(fixedTrackCount).fill(0)

  // 碰撞检测
  const calcDistance = (last: TrackInfo, startTime: number, duration: number, textWidth: number): number => {
    const lastSpeed = (width + last.textWidth) / last.duration
    const newSpeed = (width + textWidth) / duration
    const elapsed = startTime - last.startTime
    const lastRightX = width - lastSpeed * elapsed + last.textWidth
    let dist = width - lastRightX - minGap

    if (newSpeed > lastSpeed) {
      const totalElapsed = startTime + duration - last.startTime
      const lastRightXAtEnd = width - lastSpeed * totalElapsed + last.textWidth
      dist = Math.min(dist, -textWidth - lastRightXAtEnd - minGap)
    }
    return dist
  }

  // 处理弹幕
  const sorted = [...danmakuList].sort((a, b) => a.progress - b.progress)

  for (const dm of sorted) {
    if (dm.mode > 5 || !dm.content.trim()) continue

    const startTime = dm.progress
    const dmFontSize = Math.round((dm.fontsize || 25) * fontScale)
    const textWidth = estimateWidth(dm.content, dmFontSize)
    const content = escapeASS(dm.content)
    const colorTag = dm.color !== 16777215 ? `{\\c&H${toASSColor(dm.color)}&}` : ''
    const sizeTag = dmFontSize !== fontSize ? `{\\fs${dmFontSize}}` : ''

    if (dm.mode === 4) {
      // 底部弹幕：从画布底部往上排列
      const duration = 4000
      const endTime = startTime + duration
      let idx = bottomTracks.findIndex(t => t <= startTime)
      if (idx === -1) {
        // 轨道已满，随机覆盖一条
        idx = Math.floor(Math.random() * bottomTracks.length)
      }
      bottomTracks[idx] = endTime
      // 使用 \an2（底部居中对齐），Y 坐标从画布底部往上计算
      // idx=0 时在最底部（y = height - bottomMargin），idx 越大越往上
      const y = height - bottomMargin - idx * trackH
      ass += `Dialogue: 0,${toASSTime(startTime)},${toASSTime(endTime)},Bottom,,0,0,0,,{\\an2}${colorTag}${sizeTag}{\\pos(${width / 2},${y})}${content}\n`
    } else if (dm.mode === 5) {
      // 顶部弹幕：从画布顶部往下排列
      const duration = 4000
      const endTime = startTime + duration
      let idx = topTracks.findIndex(t => t <= startTime)
      if (idx === -1) {
        // 轨道已满，随机覆盖一条
        idx = Math.floor(Math.random() * topTracks.length)
      }
      topTracks[idx] = endTime
      // 使用 \an8（顶部居中对齐），Y 坐标从画布顶部往下计算
      // idx=0 时在最顶部，idx 越大越往下
      const y = topMargin + idx * trackH + fontSize
      ass += `Dialogue: 0,${toASSTime(startTime)},${toASSTime(endTime)},Top,,0,0,0,,{\\an8}${colorTag}${sizeTag}{\\pos(${width / 2},${y})}${content}\n`
    } else {
      // 滚动弹幕
      const duration = scrollTime * 1000
      const endTime = startTime + duration

      // 清理过期轨道
      for (let i = 0; i < scrollTracks.length; i++) {
        const t = scrollTracks[i]
        if (t && t.startTime + t.duration <= startTime) scrollTracks[i] = null
      }

      // 找最佳轨道
      let bestIdx = -1
      let maxDist = -Infinity
      for (let i = 0; i < scrollTracks.length; i++) {
        const t = scrollTracks[i]
        if (!t) { bestIdx = i; maxDist = Infinity; break }
        const d = calcDistance(t, startTime, duration, textWidth)
        if (d > maxDist) { maxDist = d; bestIdx = i }
      }

      if (maxDist < 0) continue

      scrollTracks[bestIdx] = { startTime, duration, textWidth }
      const y = (bestIdx + 1) * trackH
      ass += `Dialogue: 0,${toASSTime(startTime)},${toASSTime(endTime)},Scroll,,0,0,0,,{\\an7}${colorTag}${sizeTag}{\\move(${width},${y},${-textWidth},${y})}${content}\n`
    }
  }

  return ass
}

// ==================== 视频处理 ====================

interface CanvasInfo {
  width: number
  height: number
  offsetY: number
  isVertical: boolean
  /** 视频缩放比例（用于宽屏转竖屏时缩小视频） */
  scale?: number
}

/** 最大输出宽度（4K 竖屏宽度上限） */
const MAX_OUTPUT_WIDTH = 2160

/** 计算画布尺寸 */
function calcCanvas (origW: number, origH: number, verticalMode: VerticalMode): CanvasInfo {
  // 关闭模式：保持原比例
  if (verticalMode === 'off') {
    return { width: origW, height: origH, offsetY: 0, isVertical: false }
  }

  const ratio = origW / origH
  const isWide = isLandscape(origW, origH)

  // 强制模式：任意比例都转为 9:16
  if (verticalMode === 'force') {
    const targetRatio = 16 / 9 // 9:16 竖屏

    if (isWide) {
      // 横屏视频：用原高度作为新宽度，但不超过 MAX_OUTPUT_WIDTH
      let newW = Math.min(origH, MAX_OUTPUT_WIDTH)
      const newH = Math.round(newW * targetRatio)
      const scaledH = Math.round(newW / ratio) // 视频缩放后的高度
      const offsetY = Math.round((newH - scaledH) / 2)
      logger.debug(`[Danmaku] 强制模式(横屏): ${origW}x${origH} -> ${newW}x${newH}, 视频高度=${scaledH}, offsetY=${offsetY}`)
      return {
        width: newW,
        height: newH,
        offsetY,
        isVertical: true,
        scale: newW / origW
      }
    } else {
      // 竖屏/正方形视频：用原宽度，按 9:16 计算高度，但宽度不超过 MAX_OUTPUT_WIDTH
      let newW = Math.min(origW, MAX_OUTPUT_WIDTH)
      const scaleRatio = newW / origW
      const scaledOrigH = Math.round(origH * scaleRatio)
      const newH = Math.round(newW * targetRatio)
      // 视频缩放后居中
      const offsetY = Math.round((newH - scaledOrigH) / 2)
      logger.debug(`[Danmaku] 强制模式(竖屏): ${origW}x${origH} -> ${newW}x${newH}, offsetY=${offsetY}`)
      return {
        width: newW,
        height: newH,
        offsetY: Math.max(0, offsetY),
        isVertical: true,
        scale: scaleRatio
      }
    }
  }

  // 标准模式：仅处理横屏且 ratio >= 1.7 的视频
  if (isWide && ratio >= 1.7) {
    // 宽度不超过 MAX_OUTPUT_WIDTH
    const newW = Math.min(origH, MAX_OUTPUT_WIDTH)
    const scaleRatio = newW / origH
    const newH = Math.round(origW * scaleRatio)
    const scaledH = Math.round(newW / ratio)
    const offsetY = Math.round((newH - scaledH) / 2)
    logger.debug(`[Danmaku] 标准模式: ${origW}x${origH} -> ${newW}x${newH}, offsetY=${offsetY}`)
    return {
      width: newW,
      height: newH,
      offsetY,
      isVertical: true,
      scale: newW / origW
    }
  }

  // 标准模式下非宽屏比例，不处理
  return { width: origW, height: origH, offsetY: 0, isVertical: false }
}

/** 构建 FFmpeg 滤镜 */
function buildFilter (canvas: CanvasInfo, assPath: string): string {
  const escaped = escapeWinPath(assPath)
  if (canvas.isVertical) {
    if (canvas.scale && canvas.scale !== 1 && canvas.scale < 1) {
      // 需要缩放：先缩放视频，再填充黑边，最后烧字幕
      return `scale=${canvas.width}:-1,pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`
    }
    // 不需要缩放：直接填充黑边
    return `pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`
  }
  return `subtitles='${escaped}'`
}

/**
 * 烧录弹幕到视频
 */
export async function burnDanmaku (
  videoPath: string,
  danmakuList: DanmakuElem[],
  outputPath: string,
  options: DanmakuOptions = {}
): Promise<boolean> {
  const { removeSource = false, verticalMode = 'off', videoCodec = 'h265' } = options

  const resolution = await getResolution(videoPath)
  const frameRate = await getFrameRate(videoPath)
  const sourceBitrate = await getVideoBitrate(videoPath)
  const canvas = calcCanvas(resolution.width, resolution.height, verticalMode)

  if (canvas.isVertical) {
    logger.debug(`竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`)
  }
  logger.debug(`[Danmaku] 原视频码率: ${sourceBitrate}kbps`)

  // 生成 ASS
  const assContent = generateASS(danmakuList, canvas.width, canvas.height, options)
  const assPath = videoPath.replace(/\.[^.]+$/, '_danmaku.ass')
  fs.writeFileSync(assPath, assContent, 'utf-8')
  logger.debug(`弹幕字幕已生成: ${assPath}`)

  // 编码（使用原视频码率作为目标码率）
  const filter = buildFilter(canvas, assPath)
  const encoder = await detectEncoder(videoCodec)
  const encoderParams = getEncoderParams(encoder, sourceBitrate)
  const result = await ffmpeg(
    `-y -i "${videoPath}" -vf "${filter}" -r ${frameRate} ${encoderParams} -c:a copy "${outputPath}"`
  )

  Common.removeFile(assPath)

  if (result.status) {
    logger.mark(`弹幕烧录成功: ${outputPath}`)
    if (removeSource) Common.removeFile(videoPath)
  } else {
    logger.error('弹幕烧录失败', result)
  }

  return result.status
}

/**
 * 合并视频音频并烧录弹幕
 */
export async function mergeAndBurn (
  videoPath: string,
  audioPath: string,
  danmakuList: DanmakuElem[],
  outputPath: string,
  options: DanmakuOptions = {}
): Promise<boolean> {
  const { removeSource = false, verticalMode = 'off', videoCodec = 'h265' } = options

  // 检查文件是否存在
  if (!fs.existsSync(videoPath)) {
    logger.error(`[Danmaku] 视频文件不存在: ${videoPath}`)
    return false
  }
  if (!fs.existsSync(audioPath)) {
    logger.error(`[Danmaku] 音频文件不存在: ${audioPath}`)
    return false
  }

  const videoSize = fs.statSync(videoPath).size
  const audioSize = fs.statSync(audioPath).size
  logger.debug(`[Danmaku] 视频文件大小: ${(videoSize / 1024 / 1024).toFixed(2)} MB`)
  logger.debug(`[Danmaku] 音频文件大小: ${(audioSize / 1024 / 1024).toFixed(2)} MB`)

  const resolution = await getResolution(videoPath)
  const frameRate = await getFrameRate(videoPath)
  const sourceBitrate = await getVideoBitrate(videoPath)
  const canvas = calcCanvas(resolution.width, resolution.height, verticalMode)

  if (canvas.isVertical) {
    logger.debug(`竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`)
  }
  logger.debug(`分辨率: ${canvas.width}x${canvas.height}, 帧率: ${frameRate}fps, 原视频码率: ${sourceBitrate}kbps`)

  // 生成 ASS
  const assContent = generateASS(danmakuList, canvas.width, canvas.height, options)
  const assPath = videoPath.replace(/\.[^.]+$/, '_danmaku.ass')
  fs.writeFileSync(assPath, assContent, 'utf-8')
  logger.debug(`弹幕字幕已生成: ${assPath}，共 ${danmakuList.length} 条`)

  // 编码（B站音频实际是 m4a 格式，需要 -f mp4 指定格式）
  // 使用原视频码率作为目标码率，保持文件大小接近原始
  const filter = buildFilter(canvas, assPath)
  const encoder = await detectEncoder(videoCodec)
  const encoderParams = getEncoderParams(encoder, sourceBitrate)
  const result = await ffmpeg(
    `-y -i "${videoPath}" -i "${audioPath}" -f mp4 -vf "${filter}" -r ${frameRate} ${encoderParams} -c:a aac -b:a 192k "${outputPath}"`
  )

  Common.removeFile(assPath, true)

  if (result.status) {
    logger.mark(`视频合成+弹幕烧录成功: ${outputPath}`)
    if (removeSource) {
      Common.removeFile(videoPath)
      Common.removeFile(audioPath)
    }
  } else {
    logger.error('视频合成+弹幕烧录失败', result)
  }

  return result.status
}
