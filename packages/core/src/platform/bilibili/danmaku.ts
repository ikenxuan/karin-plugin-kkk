/**
 * B站弹幕处理模块
 * 负责B站弹幕数据转换、ASS 字幕生成、视频烧录等功能
 */
import fs from 'node:fs'
import os from 'node:os'

import { ffmpeg, ffprobe, logger } from 'node-karin'

import { Common } from '@/module/utils'

// ==================== 类型定义 ====================

/** B站弹幕元素 */
export interface BiliDanmakuElem {
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

/** 弹幕字号 */
export type DanmakuFontSize = 'small' | 'medium' | 'large'

/** B站弹幕烧录配置 */
export interface BiliDanmakuOptions {
  /** 弹幕显示区域比例（0.25/0.5/0.75/1） */
  danmakuArea?: number
  /** 横屏转竖屏模式 */
  verticalMode?: VerticalMode
  /** 滚动时间（秒） */
  scrollTime?: number
  /** 透明度（0-100，0为完全透明，100为完全不透明） */
  danmakuOpacity?: number
  /** 字体 */
  fontName?: string
  /** 删除源文件 */
  removeSource?: boolean
  /** 视频编码格式（默认 h265） */
  videoCodec?: VideoCodec
  /** 弹幕字号（默认 medium） */
  danmakuFontSize?: DanmakuFontSize
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

  logger.debug(`[BiliDanmaku] 开始检测 ${codec.toUpperCase()} 编码器...`)

  for (const encoder of ENCODER_PRIORITY[codec]) {
    logger.debug(`[BiliDanmaku] 测试编码器: ${encoder}`)
    try {
      const result = await ffmpeg(
        `-f lavfi -i color=c=black:s=320x240:d=0.1 -c:v ${encoder} -f null -`
      )
      logger.debug(`[BiliDanmaku] ${encoder} 测试结果: status=${result.status}`)
      if (result.status) {
        cachedEncoders[codec] = encoder
        logger.info(`[BiliDanmaku] 使用 ${codec.toUpperCase()} 编码器: ${encoder}`)
        return encoder
      }
    } catch (e) {
      logger.debug(`[BiliDanmaku] 编码器 ${encoder} 测试异常: ${e}`)
    }
  }

  const fallback = SOFTWARE_FALLBACK[codec]
  cachedEncoders[codec] = fallback
  logger.info(`[BiliDanmaku] 回退到软件编码器: ${fallback}`)
  return fallback
}

/** 获取视频码率（kbps） */
async function getVideoBitrate (path: string): Promise<number> {
  try {
    const fileSize = fs.statSync(path).size
    const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const duration = parseFloat(stdout.trim())
    if (duration > 0 && fileSize > 0) {
      const kbps = Math.round((fileSize * 8) / duration / 1000)
      logger.debug(`[BiliDanmaku] 通过文件大小计算码率: ${kbps}kbps`)
      return kbps
    }
  } catch (e) {
    logger.debug(`[BiliDanmaku] 通过文件大小计算码率失败: ${e}`)
  }

  try {
    const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const bitrate = parseInt(stdout.trim())
    if (bitrate > 0) return Math.round(bitrate / 1000)
  } catch { /* ignore */ }

  try {
    const { stdout } = await ffprobe(`-v error -show_entries format=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const bitrate = parseInt(stdout.trim())
    if (bitrate > 0) return Math.round(bitrate / 1000)
  } catch { /* ignore */ }

  logger.warn('[BiliDanmaku] 无法获取视频码率，将使用 CRF 模式')
  return 0
}

/** 获取编码器参数 */
function getEncoderParams (encoder: string, targetBitrate?: number): string {
  const threads = Math.max(1, Math.floor(os.cpus().length / 2))

  if (targetBitrate && targetBitrate > 0) {
    const bitrateK = `${targetBitrate}k`
    const maxrate = `${Math.round(targetBitrate * 2)}k`
    const bufsize = `${Math.round(targetBitrate * 4)}k`

    if (encoder === 'h264_nvenc') return `-c:v h264_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'h264_qsv') return `-c:v h264_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'h264_amf') return `-c:v h264_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`
    if (encoder === 'libx264') return `-c:v libx264 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`
    if (encoder === 'hevc_nvenc') return `-c:v hevc_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'hevc_qsv') return `-c:v hevc_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'hevc_amf') return `-c:v hevc_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`
    if (encoder === 'libx265') return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`
    if (encoder === 'av1_nvenc') return `-c:v av1_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'av1_qsv') return `-c:v av1_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`
    if (encoder === 'av1_amf') return `-c:v av1_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`
    if (encoder === 'libsvtav1') return `-c:v libsvtav1 -preset 6 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`
    if (encoder === 'libaom-av1') return `-c:v libaom-av1 -cpu-used 4 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`
    return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`
  }

  if (encoder === 'h264_nvenc') return '-c:v h264_nvenc -preset p4 -rc vbr -cq 23'
  if (encoder === 'h264_qsv') return '-c:v h264_qsv -preset medium -global_quality 23'
  if (encoder === 'h264_amf') return '-c:v h264_amf -quality balanced -rc cqp -qp_i 23 -qp_p 23'
  if (encoder === 'libx264') return `-c:v libx264 -crf 23 -preset medium -threads ${threads}`
  if (encoder === 'hevc_nvenc') return '-c:v hevc_nvenc -preset p4 -rc vbr -cq 28'
  if (encoder === 'hevc_qsv') return '-c:v hevc_qsv -preset medium -global_quality 28'
  if (encoder === 'hevc_amf') return '-c:v hevc_amf -quality balanced -rc cqp -qp_i 28 -qp_p 28'
  if (encoder === 'libx265') return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`
  if (encoder === 'av1_nvenc') return '-c:v av1_nvenc -preset p4 -rc vbr -cq 30'
  if (encoder === 'av1_qsv') return '-c:v av1_qsv -preset medium -global_quality 30'
  if (encoder === 'av1_amf') return '-c:v av1_amf -quality balanced -rc cqp -qp_i 30 -qp_p 30'
  if (encoder === 'libsvtav1') return `-c:v libsvtav1 -crf 30 -preset 6 -threads ${threads}`
  if (encoder === 'libaom-av1') return `-c:v libaom-av1 -crf 30 -cpu-used 4 -threads ${threads}`
  return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`
}

// ==================== 内部工具函数 ====================

const toASSColor = (color: number): string => {
  const r = (color >> 16) & 0xff
  const g = (color >> 8) & 0xff
  const b = color & 0xff
  return `${b.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${r.toString(16).padStart(2, '0')}`.toUpperCase()
}

const toASSTime = (ms: number): string => {
  const s = ms / 1000
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  const cs = Math.floor((s % 1) * 100)
  return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`
}

const estimateWidth = (text: string, fontSize: number): number => {
  let w = 0
  for (const c of text) {
    w += c.charCodeAt(0) > 127 ? fontSize : fontSize * 0.5
  }
  return w
}

const escapeASS = (text: string): string =>
  text.replace(/\\/g, '\\\\').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\n/g, '\\N')

const escapeWinPath = (path: string): string =>
  path.replace(/\\/g, '/').replace(/:/g, '\\:')

const isLandscape = (w: number, h: number) => w > h

// ==================== FFprobe 工具 ====================

export async function getResolution (path: string): Promise<{ width: number; height: number }> {
  try {
    const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${path}"`)
    const [w, h] = stdout.trim().split('x').map(Number)
    if (w && h) return { width: w, height: h }
  } catch { /* ignore */ }
  try {
    const result = await ffmpeg(`-i "${path}" -f null -`, { timeout: 5000 })
    const stderr = result.stderr || ''
    const match = stderr.match(/(\d{3,4})x(\d{3,4})/)
    if (match) return { width: parseInt(match[1]), height: parseInt(match[2]) }
  } catch { /* ignore */ }
  return { width: 1920, height: 1080 }
}

export async function getFrameRate (path: string): Promise<number> {
  try {
    const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const [num, den] = stdout.trim().split('/').map(Number)
    if (den > 0) return num / den
  } catch { /* ignore */ }
  try {
    const result = await ffmpeg(`-i "${path}" -f null -`, { timeout: 5000 })
    const stderr = result.stderr || ''
    const fpsMatch = stderr.match(/(\d+(?:\.\d+)?)\s*fps/)
    if (fpsMatch) return parseFloat(fpsMatch[1])
    const fracMatch = stderr.match(/(\d+)\/(\d+)\s*fps/)
    if (fracMatch) return parseInt(fracMatch[1]) / parseInt(fracMatch[2])
  } catch { /* ignore */ }
  return 30
}


// ==================== ASS 生成 ====================

interface TrackInfo {
  startTime: number
  duration: number
  textWidth: number
}

/** 字号配置映射 */
const FONT_SIZE_MAP: Record<DanmakuFontSize, { base: number; trackH: number }> = {
  small: { base: 25, trackH: 30 },
  medium: { base: 32, trackH: 38 },
  large: { base: 40, trackH: 46 }
}

/**
 * 生成B站弹幕 ASS 字幕内容
 */
export function generateBiliASS (
  danmakuList: BiliDanmakuElem[],
  width: number,
  height: number,
  options: BiliDanmakuOptions = {}
): string {
  const {
    scrollTime = 8,
    danmakuOpacity = 70,
    fontName = 'Microsoft YaHei',
    danmakuArea = 0.5,
    danmakuFontSize = 'medium'
  } = options

  const fontScale = height / 1080
  const sizeConfig = FONT_SIZE_MAP[danmakuFontSize]
  const fontSize = Math.round(sizeConfig.base * fontScale)
  const trackH = Math.round(sizeConfig.trackH * fontScale)
  const topMargin = Math.round(10 * fontScale)
  const bottomMargin = Math.round(10 * fontScale)

  const areaHeight = Math.floor(height * danmakuArea) - topMargin - bottomMargin
  const trackCount = Math.max(1, Math.floor((areaHeight - fontSize) / trackH))
  const fixedTrackCount = trackCount
  const minGap = Math.round(10 * fontScale)
  // 将 0-100 的透明度转换为 ASS 的 alpha 值（0-255，0为不透明，255为完全透明）
  const alpha = Math.round((100 - Math.max(0, Math.min(100, danmakuOpacity))) * 2.55).toString(16).padStart(2, '0').toUpperCase()

  let ass = `[Script Info]
Title: Bilibili Danmaku
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

  const scrollTracks: (TrackInfo | null)[] = Array(trackCount).fill(null)
  const topTracks: number[] = Array(fixedTrackCount).fill(0)
  const bottomTracks: number[] = Array(fixedTrackCount).fill(0)

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

  const sorted = [...danmakuList].sort((a, b) => a.progress - b.progress)

  for (const dm of sorted) {
    if (dm.mode > 5 || !dm.content.trim()) continue

    const startTime = dm.progress
    // 根据弹幕自带字号(18小/25标准/36大)相对于标准字号(25)的比例，缩放配置的基准字号
    const dmSizeRatio = (dm.fontsize || 25) / 25
    const dmFontSize = Math.round(fontSize * dmSizeRatio)
    const textWidth = estimateWidth(dm.content, dmFontSize)
    const content = escapeASS(dm.content)
    const colorTag = dm.color !== 16777215 ? `{\\c&H${toASSColor(dm.color)}&}` : ''
    const sizeTag = dmFontSize !== fontSize ? `{\\fs${dmFontSize}}` : ''

    if (dm.mode === 4) {
      const duration = 4000
      const endTime = startTime + duration
      let idx = bottomTracks.findIndex(t => t <= startTime)
      if (idx === -1) idx = Math.floor(Math.random() * bottomTracks.length)
      bottomTracks[idx] = endTime
      const y = height - bottomMargin - idx * trackH
      ass += `Dialogue: 0,${toASSTime(startTime)},${toASSTime(endTime)},Bottom,,0,0,0,,{\\an2}${colorTag}${sizeTag}{\\pos(${width / 2},${y})}${content}\n`
    } else if (dm.mode === 5) {
      const duration = 4000
      const endTime = startTime + duration
      let idx = topTracks.findIndex(t => t <= startTime)
      if (idx === -1) idx = Math.floor(Math.random() * topTracks.length)
      topTracks[idx] = endTime
      const y = topMargin + idx * trackH + fontSize
      ass += `Dialogue: 0,${toASSTime(startTime)},${toASSTime(endTime)},Top,,0,0,0,,{\\an8}${colorTag}${sizeTag}{\\pos(${width / 2},${y})}${content}\n`
    } else {
      const duration = scrollTime * 1000
      const endTime = startTime + duration

      for (let i = 0; i < scrollTracks.length; i++) {
        const t = scrollTracks[i]
        if (t && t.startTime + t.duration <= startTime) scrollTracks[i] = null
      }

      // 找最佳轨道：优先复用同一轨道，只有放不下才换轨道
      // 这样可以避免"阶梯"效果，让同时发送的弹幕尽量在同一水平线
      let bestIdx = -1
      let bestDist = -Infinity

      // 第一轮：找能放下的轨道中，距离最小但仍 >= 0 的（紧凑排列）
      for (let i = 0; i < scrollTracks.length; i++) {
        const t = scrollTracks[i]
        if (!t) {
          // 空轨道优先级最低，只有没有其他选择时才用
          if (bestIdx === -1) bestIdx = i
          continue
        }
        const d = calcDistance(t, startTime, duration, textWidth)
        if (d >= 0) {
          // 选择距离最小的可用轨道（紧凑排列，但不重叠）
          if (bestDist < 0 || d < bestDist) {
            bestDist = d
            bestIdx = i
          }
        }
      }

      // 如果没找到可用轨道（所有轨道都会重叠），跳过这条弹幕
      if (bestIdx === -1 || (bestDist < 0 && scrollTracks[bestIdx] !== null)) continue

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
  scale?: number
}

const MAX_OUTPUT_WIDTH = 2160

function calcCanvas (origW: number, origH: number, verticalMode: VerticalMode): CanvasInfo {
  if (verticalMode === 'off') {
    return { width: origW, height: origH, offsetY: 0, isVertical: false }
  }

  const ratio = origW / origH
  const isWide = isLandscape(origW, origH)

  if (verticalMode === 'force') {
    const targetRatio = 16 / 9

    if (isWide) {
      const newW = Math.min(origH, MAX_OUTPUT_WIDTH)
      const newH = Math.round(newW * targetRatio)
      const scaledH = Math.round(newW / ratio)
      const offsetY = Math.round((newH - scaledH) / 2)
      return { width: newW, height: newH, offsetY, isVertical: true, scale: newW / origW }
    } else {
      const newW = Math.min(origW, MAX_OUTPUT_WIDTH)
      const scaleRatio = newW / origW
      const scaledOrigH = Math.round(origH * scaleRatio)
      const newH = Math.round(newW * targetRatio)
      const offsetY = Math.round((newH - scaledOrigH) / 2)
      return { width: newW, height: newH, offsetY: Math.max(0, offsetY), isVertical: true, scale: scaleRatio }
    }
  }

  if (isWide && ratio >= 1.7) {
    const newW = Math.min(origH, MAX_OUTPUT_WIDTH)
    const scaleRatio = newW / origH
    const newH = Math.round(origW * scaleRatio)
    const scaledH = Math.round(newW / ratio)
    const offsetY = Math.round((newH - scaledH) / 2)
    return { width: newW, height: newH, offsetY, isVertical: true, scale: newW / origW }
  }

  return { width: origW, height: origH, offsetY: 0, isVertical: false }
}

function buildFilter (canvas: CanvasInfo, assPath: string): string {
  const escaped = escapeWinPath(assPath)
  if (canvas.isVertical) {
    if (canvas.scale && canvas.scale !== 1 && canvas.scale < 1) {
      return `scale=${canvas.width}:-1,pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`
    }
    return `pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`
  }
  return `subtitles='${escaped}'`
}

/**
 * 烧录B站弹幕到视频
 */
export async function burnBiliDanmaku (
  videoPath: string,
  danmakuList: BiliDanmakuElem[],
  outputPath: string,
  options: BiliDanmakuOptions = {}
): Promise<boolean> {
  const { removeSource = false, verticalMode = 'off', videoCodec = 'h265' } = options

  const resolution = await getResolution(videoPath)
  const frameRate = await getFrameRate(videoPath)
  const sourceBitrate = await getVideoBitrate(videoPath)
  const canvas = calcCanvas(resolution.width, resolution.height, verticalMode)

  if (canvas.isVertical) {
    logger.debug(`[BiliDanmaku] 竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`)
  }

  const assContent = generateBiliASS(danmakuList, canvas.width, canvas.height, options)
  const assPath = videoPath.replace(/\.[^.]+$/, '_danmaku.ass')
  fs.writeFileSync(assPath, assContent, 'utf-8')
  logger.debug(`[BiliDanmaku] 弹幕字幕已生成: ${assPath}`)

  const filter = buildFilter(canvas, assPath)
  const encoder = await detectEncoder(videoCodec)
  const encoderParams = getEncoderParams(encoder, sourceBitrate)
  const result = await ffmpeg(
    `-y -i "${videoPath}" -vf "${filter}" -r ${frameRate} ${encoderParams} -c:a copy "${outputPath}"`
  )

  Common.removeFile(assPath, true)

  if (result.status) {
    logger.mark(`[BiliDanmaku] 弹幕烧录成功: ${outputPath}`)
    if (removeSource) Common.removeFile(videoPath)
  } else {
    logger.error('[BiliDanmaku] 弹幕烧录失败', result)
  }

  return result.status
}

/**
 * 合并视频音频并烧录B站弹幕
 */
export async function mergeAndBurnBili (
  videoPath: string,
  audioPath: string,
  danmakuList: BiliDanmakuElem[],
  outputPath: string,
  options: BiliDanmakuOptions = {}
): Promise<boolean> {
  const { removeSource = false, verticalMode = 'off', videoCodec = 'h265' } = options

  if (!fs.existsSync(videoPath)) {
    logger.error(`[BiliDanmaku] 视频文件不存在: ${videoPath}`)
    return false
  }
  if (!fs.existsSync(audioPath)) {
    logger.error(`[BiliDanmaku] 音频文件不存在: ${audioPath}`)
    return false
  }

  const resolution = await getResolution(videoPath)
  const frameRate = await getFrameRate(videoPath)
  const sourceBitrate = await getVideoBitrate(videoPath)
  const canvas = calcCanvas(resolution.width, resolution.height, verticalMode)

  if (canvas.isVertical) {
    logger.debug(`[BiliDanmaku] 竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`)
  }
  logger.debug(`[BiliDanmaku] 分辨率: ${canvas.width}x${canvas.height}, 帧率: ${frameRate}fps, 码率: ${sourceBitrate}kbps`)

  const assContent = generateBiliASS(danmakuList, canvas.width, canvas.height, options)
  const assPath = videoPath.replace(/\.[^.]+$/, '_danmaku.ass')
  fs.writeFileSync(assPath, assContent, 'utf-8')
  logger.debug(`[BiliDanmaku] 弹幕字幕已生成: ${assPath}，共 ${danmakuList.length} 条`)

  const filter = buildFilter(canvas, assPath)
  const encoder = await detectEncoder(videoCodec)
  const encoderParams = getEncoderParams(encoder, sourceBitrate)
  const result = await ffmpeg(
    `-y -i "${videoPath}" -i "${audioPath}" -f mp4 -vf "${filter}" -r ${frameRate} ${encoderParams} -c:a aac -b:a 192k "${outputPath}"`
  )

  Common.removeFile(assPath, true)

  if (result.status) {
    logger.mark(`[BiliDanmaku] 视频合成+弹幕烧录成功: ${outputPath}`)
    if (removeSource) {
      Common.removeFile(videoPath)
      Common.removeFile(audioPath)
    }
  } else {
    logger.error('[BiliDanmaku] 视频合成+弹幕烧录失败', result)
  }

  return result.status
}
