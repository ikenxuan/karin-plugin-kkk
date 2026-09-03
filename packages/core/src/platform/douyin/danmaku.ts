/**
 * 抖音弹幕处理模块
 * 负责抖音弹幕数据转换、ASS 字幕生成、视频烧录等功能
 * 抖音弹幕只有滚动弹幕：纯文字弹幕走 ASS \move 烧录；
 * 含平台表情或被选中展示点赞角标的弹幕预渲染为透明 PNG 条，通过 overlay 滤镜叠加（libass 不支持内嵌图片）
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import pathModule from 'node:path'

import type { DyEmojiList } from '@ikenxuan/amagi'
import { ffmpeg, ffprobe, logger, render } from 'node-karin'

import { Common } from '@/module/utils'
import { douyinFetcher } from '@/module/utils/amagiClient'

// ==================== 类型定义 ====================

/** 抖音弹幕元素（来自API） */
export interface DouyinDanmakuElem {
  /** 弹幕ID */
  danmaku_id: string
  /** 出现时间（毫秒） */
  offset_time: number
  /** 弹幕内容 */
  text: string
  /** 弹幕类型 */
  danmaku_type?: number
  /** 点赞数 */
  digg_count?: number
}

/** 抖音视频编码格式 */
export type DouyinVideoCodec = 'h264' | 'h265' | 'av1'

/** 抖音横屏转竖屏模式 */
export type DouyinVerticalMode = 'off' | 'standard' | 'force'

/** 抖音弹幕字号 */
export type DouyinDanmakuFontSize = 'small' | 'medium' | 'large'

/** 抖音弹幕烧录配置 */
export interface DouyinDanmakuOptions {
  /** 弹幕显示区域比例（0.25/0.5/0.75/1） */
  danmakuArea?: number
  /** 横屏转竖屏模式 */
  verticalMode?: DouyinVerticalMode
  /** 滚动时间（秒） */
  scrollTime?: number
  /** 透明度（0-100，0为完全透明，100为完全不透明） */
  danmakuOpacity?: number
  /** 字体 */
  fontName?: string
  /** 删除源文件 */
  removeSource?: boolean
  /** 视频编码格式（默认 h265） */
  videoCodec?: DouyinVideoCodec
  /** 弹幕字号（默认 medium） */
  danmakuFontSize?: DouyinDanmakuFontSize
}

/** 抖音平台表情（name 为文本占位符，如 [捂脸]） */
export interface DouyinEmojiInfo {
  name: string
  url: string
}

/** 含表情/点赞角标弹幕的预渲染 PNG 条 */
interface DanmakuStrip {
  /** 弹幕原文 */
  text: string
  /** PNG 文件路径 */
  pngPath: string
  /** PNG 宽度（像素） */
  width: number
  /** PNG 高度（像素） */
  height: number
}

/** 图片弹幕 overlay 描述 */
export interface DanmakuOverlay {
  /** PNG 条文件路径 */
  pngPath: string
  /** 弹幕出现时间（毫秒） */
  startTime: number
  /** 弹幕消失时间（毫秒） */
  endTime: number
  /** 条顶部 y 坐标 */
  y: number
  /**
   * 滚动速度基准宽度（像素）
   * 与 ASS 弹幕使用同一宽度度量（估算宽度与条真实宽度的较大值），保证两类弹幕同速
   */
  moveW: number
}

/** ASS 生成结果 */
export interface DouyinAssResult {
  /** ASS 字幕内容（仅纯文字弹幕） */
  ass: string
  /** 图片弹幕（表情/点赞）overlay 列表 */
  overlays: DanmakuOverlay[]
  /** 过程中产生的临时文件（弹幕条 HTML/PNG），烧录结束后由调用方清理 */
  tempFiles: string[]
  /** 分类统计（用于日志） */
  stats: {
    /** 上屏的点赞角标弹幕数 */
    likedOverlays: number
    /** 上屏的表情弹幕数 */
    emojiOverlays: number
    /** 有点赞的候选弹幕数 */
    likedCandidates: number
    /** 点赞角标目标展示数 */
    likedTarget: number
  }
}

// ==================== 编码器检测与参数 ====================

const ENCODER_PRIORITY: Record<DouyinVideoCodec, readonly string[]> = {
  h264: ['h264_nvenc', 'h264_qsv', 'h264_amf', 'libx264'],
  h265: ['hevc_nvenc', 'hevc_qsv', 'hevc_amf', 'libx265'],
  av1: ['av1_nvenc', 'av1_qsv', 'av1_amf', 'libsvtav1', 'libaom-av1']
} as const

const SOFTWARE_FALLBACK: Record<DouyinVideoCodec, string> = {
  h264: 'libx264',
  h265: 'libx265',
  av1: 'libsvtav1'
}

const cachedEncoders: Partial<Record<DouyinVideoCodec, string>> = {}

/**
 * 按优先级探测可用的硬件/软件编码器（结果缓存）
 * @param codec 目标编码格式
 * @returns 可用的 ffmpeg 编码器名
 */
async function detectEncoder(codec: DouyinVideoCodec): Promise<string> {
  if (cachedEncoders[codec]) return cachedEncoders[codec]!

  logger.debug(`[DouyinDanmaku] 开始检测 ${codec.toUpperCase()} 编码器...`)

  for (const encoder of ENCODER_PRIORITY[codec]) {
    try {
      const result = await ffmpeg(`-f lavfi -i color=c=black:s=320x240:d=0.1 -c:v ${encoder} -f null -`)
      if (result.status) {
        cachedEncoders[codec] = encoder
        logger.info(`[DouyinDanmaku] 使用 ${codec.toUpperCase()} 编码器: ${encoder}`)
        return encoder
      }
    } catch {
      /* ignore */
    }
  }

  const fallback = SOFTWARE_FALLBACK[codec]
  cachedEncoders[codec] = fallback
  logger.info(`[DouyinDanmaku] 回退到软件编码器: ${fallback}`)
  return fallback
}

/**
 * 获取视频平均码率
 * @param path 视频文件路径
 * @returns 平均码率（kbps），获取失败返回 0
 */
async function getVideoBitrate(path: string): Promise<number> {
  // 用文件大小和时长计算平均码率，这是最准确的方式
  try {
    const fileSize = fs.statSync(path).size
    const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path}"`)
    const duration = parseFloat(stdout.trim())
    if (duration > 0 && fileSize > 0) {
      return Math.round((fileSize * 8) / duration / 1000)
    }
  } catch {
    /* ignore */
  }

  // 尝试从流信息获取
  try {
    const { stdout } = await ffprobe(
      `-v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path}"`
    )
    const bitrate = parseInt(stdout.trim())
    if (bitrate > 0) return Math.round(bitrate / 1000)
  } catch {
    /* ignore */
  }

  return 0
}

/** 码率模式参数：b 目标码率、m 峰值码率、u 缓冲区、t 线程数 */
interface RateModeParams {
  b: string
  m: string
  u: string
  t: number
}

/** 各编码器的目标码率模式参数模板 */
const BITRATE_MODE_PARAMS: Record<string, (p: RateModeParams) => string> = {
  h264_nvenc: ({ b, m, u }) => `-c:v h264_nvenc -preset p4 -rc vbr -b:v ${b} -maxrate ${m} -bufsize ${u}`,
  h264_qsv: ({ b, m, u }) => `-c:v h264_qsv -preset medium -b:v ${b} -maxrate ${m} -bufsize ${u}`,
  h264_amf: ({ b, m }) => `-c:v h264_amf -quality balanced -rc vbr_peak -b:v ${b} -maxrate ${m}`,
  libx264: ({ b, m, u, t }) => `-c:v libx264 -preset medium -b:v ${b} -maxrate ${m} -bufsize ${u} -threads ${t}`,
  hevc_nvenc: ({ b, m, u }) => `-c:v hevc_nvenc -preset p4 -rc vbr -b:v ${b} -maxrate ${m} -bufsize ${u}`,
  hevc_qsv: ({ b, m, u }) => `-c:v hevc_qsv -preset medium -b:v ${b} -maxrate ${m} -bufsize ${u}`,
  hevc_amf: ({ b, m }) => `-c:v hevc_amf -quality balanced -rc vbr_peak -b:v ${b} -maxrate ${m}`,
  libx265: ({ b, m, u, t }) => `-c:v libx265 -preset medium -b:v ${b} -maxrate ${m} -bufsize ${u} -threads ${t}`,
  av1_nvenc: ({ b, m, u }) => `-c:v av1_nvenc -preset p4 -rc vbr -b:v ${b} -maxrate ${m} -bufsize ${u}`,
  av1_qsv: ({ b, m, u }) => `-c:v av1_qsv -preset medium -b:v ${b} -maxrate ${m} -bufsize ${u}`,
  av1_amf: ({ b, m }) => `-c:v av1_amf -quality balanced -rc vbr_peak -b:v ${b} -maxrate ${m}`,
  libsvtav1: ({ b, m, u, t }) => `-c:v libsvtav1 -preset 6 -b:v ${b} -maxrate ${m} -bufsize ${u} -threads ${t}`,
  'libaom-av1': ({ b, m, u, t }) => `-c:v libaom-av1 -cpu-used 4 -b:v ${b} -maxrate ${m} -bufsize ${u} -threads ${t}`
}

/** 各编码器的 CRF/CQ 兜底模式参数模板（无码率信息时使用） */
const CRF_MODE_PARAMS: Record<string, (t: number) => string> = {
  h264_nvenc: () => '-c:v h264_nvenc -preset p4 -rc vbr -cq 23',
  h264_qsv: () => '-c:v h264_qsv -preset medium -global_quality 23',
  h264_amf: () => '-c:v h264_amf -quality balanced -rc cqp -qp_i 23 -qp_p 23',
  libx264: (t) => `-c:v libx264 -crf 23 -preset medium -threads ${t}`,
  hevc_nvenc: () => '-c:v hevc_nvenc -preset p4 -rc vbr -cq 28',
  hevc_qsv: () => '-c:v hevc_qsv -preset medium -global_quality 28',
  hevc_amf: () => '-c:v hevc_amf -quality balanced -rc cqp -qp_i 28 -qp_p 28',
  libx265: (t) => `-c:v libx265 -crf 28 -preset medium -threads ${t}`,
  av1_nvenc: () => '-c:v av1_nvenc -preset p4 -rc vbr -cq 30',
  av1_qsv: () => '-c:v av1_qsv -preset medium -global_quality 30',
  av1_amf: () => '-c:v av1_amf -quality balanced -rc cqp -qp_i 30 -qp_p 30',
  libsvtav1: (t) => `-c:v libsvtav1 -crf 30 -preset 6 -threads ${t}`,
  'libaom-av1': (t) => `-c:v libaom-av1 -crf 30 -cpu-used 4 -threads ${t}`
}

/**
 * 获取编码器参数
 * @param encoder detectEncoder 探测到的编码器名
 * @param targetBitrate 源视频平均码率（kbps），为空或 0 时使用 CRF/CQ 兜底模式
 * @returns ffmpeg 视频编码参数串
 */
function getEncoderParams(encoder: string, targetBitrate?: number): string {
  const threads = Math.max(1, Math.floor(os.cpus().length / 2))

  // 有码率时用目标码率模式
  // 二次编码会损失画质，目标码率设为原视频的 1.4 倍补偿，确保输出更清晰
  if (targetBitrate && targetBitrate > 0) {
    const adjusted = Math.round(targetBitrate * 1.4)
    const params: RateModeParams = {
      b: `${adjusted}k`,
      m: `${Math.round(adjusted * 2.5)}k`,
      u: `${Math.round(adjusted * 4)}k`,
      t: threads
    }
    const build = BITRATE_MODE_PARAMS[encoder] ?? BITRATE_MODE_PARAMS.libx265
    return build(params)
  }

  const build = CRF_MODE_PARAMS[encoder] ?? CRF_MODE_PARAMS.libx265
  return build(threads)
}

// ==================== 内部工具函数 ====================

/** 输出帧率：弹幕逐帧重算位置，高帧率下步进更小、观感更顺滑（视频帧复制，内容不变） */
const OUTPUT_FPS = 60

/**
 * 毫秒转 ASS 时间戳（h:mm:ss.cc，厘秒精度）
 * @param ms 毫秒时间
 * @returns ASS 时间戳字符串
 */
const toASSTime = (ms: number): string => {
  const s = ms / 1000
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = Math.floor(s % 60)
  const cs = Math.floor((s % 1) * 100)
  return `${h}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`
}

/**
 * 估算文本宽度（全角字符按 1 倍字号、半角按 0.5 倍）
 * @param text 文本内容
 * @param fontSize 字号（像素）
 * @returns 估算宽度（像素）
 */
const estimateWidth = (text: string, fontSize: number): number => {
  let w = 0
  for (const c of text) {
    w += c.charCodeAt(0) > 127 ? fontSize : fontSize * 0.5
  }
  return w
}

/**
 * ASS 文本转义
 * @param text 原始文本
 * @returns 转义后的文本
 */
const escapeASS = (text: string): string => text.replace(/\\/g, '\\\\').replace(/\{/g, '\\{').replace(/\}/g, '\\}').replace(/\n/g, '\\N')

/**
 * HTML 文本转义
 * @param text 原始文本
 * @returns 转义后的文本
 */
const escapeHTML = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

/**
 * Windows 路径转义为正斜杠形式（供 ffmpeg 滤镜内使用，盘符冒号需转义）
 * @param path 原始路径
 * @returns 转义后的路径
 */
const escapeWinPath = (path: string): string => path.replace(/\\/g, '/').replace(/:/g, '\\:')

/**
 * 判断是否为横屏
 * @param w 宽度
 * @param h 高度
 * @returns 宽大于高时为 true
 */
const isLandscape = (w: number, h: number) => w > h

/**
 * 从 PNG 文件头读取尺寸
 * @param buffer PNG 文件内容
 * @returns 宽高（像素），非 PNG 返回空对象
 */
const getPngSize = (buffer: Buffer): { width?: number; height?: number } => {
  if (buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) }
  }
  return {}
}

// ==================== FFprobe 工具 ====================

/**
 * 获取视频分辨率
 * @param path 视频文件路径
 * @returns 宽高，获取失败返回抖音默认竖屏 1080x1920
 */
export async function getDouyinResolution(path: string): Promise<{ width: number; height: number }> {
  try {
    const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${path}"`)
    const [w, h] = stdout.trim().split('x').map(Number)
    if (w && h) return { width: w, height: h }
  } catch {
    /* ignore */
  }
  try {
    const result = await ffmpeg(`-i "${path}" -f null -`, { timeout: 5000 })
    const stderr = result.stderr || ''
    const match = stderr.match(/(\d{3,4})x(\d{3,4})/)
    if (match) return { width: parseInt(match[1]), height: parseInt(match[2]) }
  } catch {
    /* ignore */
  }
  return { width: 1080, height: 1920 } // 抖音默认竖屏
}

// ==================== 平台表情与弹幕条渲染 ====================

/**
 * 获取抖音平台表情列表
 * 与评论处理一致：name 为文本占位符（如 [捂脸]），url 为表情图地址
 * 获取失败时返回空列表，含表情的弹幕将退化为纯文字烧录
 * @returns 表情列表（按名称长度降序，避免短名抢先匹配）
 */
async function fetchDouyinEmojiList(): Promise<DouyinEmojiInfo[]> {
  try {
    const res = await douyinFetcher.fetchEmojiList()
    const list: DyEmojiList['emoji_list'] = res.data?.emoji_list ?? []
    return list
      .map((item) => ({ name: item.display_name, url: item.emoji_url?.url_list?.[0] ?? '' }))
      .filter((item) => Boolean(item.name) && Boolean(item.url))
      .sort((a, b) => b.name.length - a.name.length)
  } catch (err) {
    logger.warn('[DouyinDanmaku] 获取表情列表失败，表情弹幕将按纯文字处理', err)
    return []
  }
}

/**
 * 判断弹幕文本是否包含平台表情
 * @param text 弹幕文本
 * @param emojiList 表情列表
 * @returns 包含任一表情占位符时为 true
 */
const hasEmoji = (text: string, emojiList: DouyinEmojiInfo[]): boolean => emojiList.some((e) => text.includes(e.name))

/** 弹幕条内容片段 */
type StripSegment = { type: 'text'; content: string } | { type: 'emoji'; name: string; url: string }

/**
 * 把弹幕文本拆成文字/表情片段（长名优先匹配，与评论处理一致）
 * @param text 弹幕文本
 * @param emojiList 表情列表（已按名称长度降序）
 * @returns 有序的片段列表
 */
function splitDanmakuSegments(text: string, emojiList: DouyinEmojiInfo[]): StripSegment[] {
  const segments: StripSegment[] = []
  let buffer = ''
  let index = 0

  const pushBuffer = () => {
    if (buffer.length > 0) {
      segments.push({ type: 'text', content: buffer })
      buffer = ''
    }
  }

  while (index < text.length) {
    const matched = emojiList.find((e) => text.startsWith(e.name, index))
    if (matched) {
      pushBuffer()
      segments.push({ type: 'emoji', name: matched.name, url: matched.url })
      index += matched.name.length
      continue
    }
    buffer += text[index]
    index += 1
  }
  pushBuffer()

  return segments
}

/** 抖音官方点赞图标（同 packages/template/src/components/platforms/douyin/Icons.tsx 的 DouyinLikeIcon） */
const LIKE_ICON_PATH =
  'M453.036 88.712C493.774 30.664 560.66 0 634.251 0 774.403 0 890.972 121.59 890.972 266.137v.054c.01-.02.019-.04.028-.06 0 4.121-.07 7.241-.122 9.537-.072 3.151-.108 4.747.122 5.247-.531 30.403-5.778 55.522-15.101 88.712-5.289 5.96-10.204 17.184-15.1 29.572-7.724 11.998-10.647 17.81-15.101 29.57a546.67 546.67 0 0 1-14.452 22.974c-37.449 56.8-87.537 113.33-137.579 163.509-78.331 79.025-158.123 144.805-192.835 173.422-9.585 7.901-15.732 12.969-17.464 14.7-12.301 12.303-24.603 12.611-36.905 12.619-.324.004-.649.006-.977.006-25.236 0-37.854-12.619-50.472-25.237-.963-.963-3.413-2.984-7.156-5.979-38.233-28.184-124.273-96.997-205.116-180C121.066 542.02 61.622 470.007 29.092 399.588 16.474 374.351.731 314.264 0 280.922c.269-.267.227-1.873.144-5.078C.083 273.498 0 270.297 0 266.137 0 121.524 116.502 0 256.721 0c73.458 0 140.405 30.664 196.315 88.712Z'

/**
 * 生成弹幕条 HTML：文字 + 内联表情图 + 可选点赞角标（白色图标 + 点赞数），透明背景，样式对齐 ASS（白字黑描边）
 * @param segments 弹幕内容片段
 * @param fontSize CSS 字号（像素）
 * @param fontName 字体名
 * @param opacity 整体不透明度（0-1）
 * @param likeLabel 点赞角标文本（如 "14"、"2.4w"），为 null 时不渲染角标
 * @returns 完整 HTML 文档
 */
function buildStripHTML(segments: StripSegment[], fontSize: number, fontName: string, opacity: number, likeLabel: string | null): string {
  const safeFontName = fontName.replace(/['\\]/g, '')
  const strokeW = Math.max(1, Math.round(fontSize / 21))
  const imgSize = Math.round(fontSize * 1.1)
  const body =
    segments
      .map((seg) =>
        seg.type === 'text'
          ? `<span>${escapeHTML(seg.content)}</span>`
          : `<img src="${escapeHTML(seg.url)}" alt="${escapeHTML(seg.name)}" referrerpolicy="no-referrer" crossorigin="anonymous" />`
      )
      .join('') +
    (likeLabel !== null
      ? `<svg viewBox="0 0 891 816" class="like-icon" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="${LIKE_ICON_PATH}" /></svg><span class="like-count">${escapeHTML(likeLabel)}</span>`
      : '')

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8" /><style>
html,body{margin:0;padding:0;background:transparent}
#container{display:inline-flex;align-items:center;white-space:nowrap;font-family:'${safeFontName}',sans-serif;font-size:${fontSize}px;line-height:1.2;color:#fff;opacity:${opacity}}
#container span{paint-order:stroke fill;-webkit-text-stroke:${strokeW}px rgba(0,0,0,0.85)}
#container img{height:${imgSize}px;width:auto;display:inline-block}
.like-icon{height:0.95em;width:0.95em;display:inline-block;margin-left:0.35em}
.like-count{margin-left:0.25em}
</style></head><body><div id="container">${body}</div></body></html>`
}

/** 弹幕条渲染样式 */
interface StripStyle {
  /** CSS 字号（已按 ASS 视觉大小换算，见 computeDanmakuLayout） */
  fontSize: number
  /** 字体名 */
  fontName: string
  /** 整体不透明度（0-1） */
  opacity: number
}

/**
 * 把含表情/点赞的弹幕渲染成透明 PNG 条（按内容缓存，相同文本复用同一张图）
 * 渲染失败时返回 null，调用方退化为纯文字 ASS 烧录
 * @param text 弹幕原文
 * @param likeLabel 点赞角标文本，为 null 时不渲染角标
 * @param emojiList 表情列表
 * @param style 渲染样式
 * @param cache 渲染缓存（内容 hash -> 渲染 Promise）
 * @param tempFiles 临时文件收集器（HTML/PNG 路径会追加进去，由调用方统一清理）
 * @returns 弹幕条信息，失败返回 null
 */
async function renderDanmakuStrip(
  text: string,
  likeLabel: string | null,
  emojiList: DouyinEmojiInfo[],
  style: StripStyle,
  cache: Map<string, Promise<DanmakuStrip | null>>,
  tempFiles: string[]
): Promise<DanmakuStrip | null> {
  const cacheKey = `${style.fontSize}:${style.fontName}:${style.opacity}:${likeLabel ?? ''}:${text}`
  let pending = cache.get(cacheKey)
  if (!pending) {
    pending = (async () => {
      const hash = crypto.createHash('md5').update(cacheKey).digest('hex').slice(0, 12)
      const htmlPath = `${Common.tempDri.video}danmaku_strip_${hash}.html`
      const pngPath = `${Common.tempDri.video}danmaku_strip_${hash}.png`
      tempFiles.push(htmlPath, pngPath)
      try {
        const segments = splitDanmakuSegments(text, emojiList)
        fs.writeFileSync(htmlPath, buildStripHTML(segments, style.fontSize, style.fontName, style.opacity, likeLabel), 'utf-8')
        const renderResult = (await render.render({
          name: 'karin-plugin-kkk/danmaku',
          file: htmlPath,
          selector: '#container',
          fullPage: false,
          type: 'png',
          omitBackground: true,
          pageGotoParams: { waitUntil: 'load', timeout: 15000 }
        })) as string | string[]
        const base64 = Array.isArray(renderResult) ? renderResult[0] : renderResult
        const pngBuffer = Buffer.from(base64, 'base64')
        const size = getPngSize(pngBuffer)
        if (!size.width || !size.height) throw new Error('无法读取弹幕条 PNG 尺寸')
        fs.writeFileSync(pngPath, pngBuffer)
        return { text, pngPath, width: size.width, height: size.height }
      } catch (err) {
        logger.warn(`[DouyinDanmaku] 弹幕条渲染失败，将按纯文字处理: ${text}`, err)
        return null
      }
    })()
    cache.set(cacheKey, pending)
  }
  return pending
}

/**
 * 预渲染需要 PNG 条的弹幕（含平台表情，或被选中展示点赞角标）
 * 渲染失败的弹幕退化为纯文字 ASS 烧录
 * @param sortedDanmaku 按出现时间升序的弹幕列表
 * @param emojiList 表情列表
 * @param liked 点赞角标选择结果
 * @param style 渲染样式
 * @returns 弹幕 ID -> PNG 条 的映射，以及过程中产生的临时文件
 */
async function prepareDanmakuStrips(
  sortedDanmaku: DouyinDanmakuElem[],
  emojiList: DouyinEmojiInfo[],
  liked: LikedSelection,
  style: StripStyle
): Promise<{ strips: Map<string, DanmakuStrip>; tempFiles: string[] }> {
  const strips = new Map<string, DanmakuStrip>()
  const tempFiles: string[] = []

  const needsStrip = (dm: DouyinDanmakuElem): boolean =>
    liked.ids.has(dm.danmaku_id) || (emojiList.length > 0 && hasEmoji(dm.text, emojiList))
  if (!sortedDanmaku.some(needsStrip)) return { strips, tempFiles }

  const cache = new Map<string, Promise<DanmakuStrip | null>>()
  for (const dm of sortedDanmaku) {
    if (!needsStrip(dm)) continue
    const likeLabel = liked.ids.has(dm.danmaku_id) ? formatLikeCount(dm.digg_count ?? 0) : null
    const strip = await renderDanmakuStrip(dm.text, likeLabel, emojiList, style, cache, tempFiles)
    if (strip) strips.set(dm.danmaku_id, strip)
  }
  return { strips, tempFiles }
}

// ==================== 点赞角标 ====================

/**
 * 格式化点赞数：破万保留一位小数并加 w 后缀，只舍不入（四舍不能五入）
 * 如 14 -> "14"，24800 -> "2.4w"，1001900 -> "100.1w"
 * @param count 点赞数
 * @returns 格式化后的文本
 */
const formatLikeCount = (count: number): string => {
  if (count < 10000) return String(count)
  return `${(Math.floor(count / 1000) / 10).toFixed(1)}w`
}

/** 点赞角标选择结果 */
interface LikedSelection {
  /** 选中展示点赞角标的弹幕 ID */
  ids: Set<string>
  /** 有点赞的候选弹幕数 */
  candidateCount: number
  /** 目标展示数 */
  target: number
}

/**
 * 从有点赞的弹幕中选出展示点赞角标的子集
 * 全部展示会非常拥挤，目标展示数随弹幕总量按 1.5√N 缩放（100 条弹幕约展示 15 条），
 * 弹幕越多比例越低（不是固定比例）；再按点赞量从高到低截取
 * @param sortedDanmaku 按出现时间升序的弹幕列表
 * @returns 选中的弹幕 ID 集合及统计
 */
function selectLikedDanmaku(sortedDanmaku: DouyinDanmakuElem[]): LikedSelection {
  const candidates = sortedDanmaku.filter((dm) => (dm.digg_count ?? 0) > 0)
  const target = Math.min(50, Math.max(5, Math.round(Math.sqrt(sortedDanmaku.length) * 1.5)))
  if (candidates.length === 0) return { ids: new Set(), candidateCount: 0, target }
  if (candidates.length <= target) return { ids: new Set(candidates.map((dm) => dm.danmaku_id)), candidateCount: candidates.length, target }

  // 按点赞量降序取前 target 条；与第 target 条点赞数并列的一并保留，避免随意截断
  const byDiggDesc = [...candidates].sort((a, b) => (b.digg_count ?? 0) - (a.digg_count ?? 0))
  const cutoff = byDiggDesc[target - 1].digg_count ?? 0
  return {
    ids: new Set(byDiggDesc.filter((dm) => (dm.digg_count ?? 0) >= cutoff).map((dm) => dm.danmaku_id)),
    candidateCount: candidates.length,
    target
  }
}

// ==================== 弹幕布局 ====================

/** 字号配置映射（1080 高度基准） */
const FONT_SIZE_MAP: Record<DouyinDanmakuFontSize, { base: number; trackH: number }> = {
  small: { base: 25, trackH: 30 },
  medium: { base: 32, trackH: 38 },
  large: { base: 40, trackH: 46 }
}

/** 弹幕布局参数（按画布高度缩放的几何与样式） */
interface DanmakuLayout {
  /** ASS 字号（脚本像素） */
  fontSize: number
  /** 弹幕条 CSS 字号（libass 按 pt 渲染，×0.75 与 ASS 视觉对齐） */
  stripFontSize: number
  /** 轨道高度（像素） */
  trackH: number
  /** 顶部留白（像素） */
  topMargin: number
  /** 轨道数量 */
  trackCount: number
  /** 同轨道相邻弹幕最小间距（像素） */
  minGap: number
  /** ASS 样式 alpha 值（两位十六进制大写，00 不透明 - FF 全透明） */
  alpha: string
}

/**
 * 计算弹幕布局参数
 * @param height 画布高度（像素），所有几何以 1080 高为基准等比缩放
 * @param danmakuArea 弹幕显示区域比例（0.25/0.5/0.75/1）
 * @param danmakuFontSize 弹幕字号档位
 * @param danmakuOpacity 弹幕不透明度（0-100）
 * @returns 布局参数
 */
function computeDanmakuLayout(
  height: number,
  danmakuArea: number,
  danmakuFontSize: DouyinDanmakuFontSize,
  danmakuOpacity: number
): DanmakuLayout {
  const fontScale = height / 1080
  const sizeConfig = FONT_SIZE_MAP[danmakuFontSize]
  const fontSize = Math.round(sizeConfig.base * fontScale)
  const trackH = Math.round(sizeConfig.trackH * fontScale)
  const topMargin = Math.round(5 * fontScale)

  const areaHeight = Math.floor(height * danmakuArea) - topMargin
  const trackCount = Math.max(1, Math.floor((areaHeight - fontSize) / trackH))
  const minGap = Math.round(15 * fontScale)

  // libass 的 Fontsize 近似按点（pt）渲染，同名字号下字形约为 CSS px 的 3/4（实测 32 -> 288/381）
  // 弹幕条要与之视觉对齐，CSS 字号按 0.75 换算
  const stripFontSize = Math.max(1, Math.round(fontSize * 0.75))

  // 将 0-100 的透明度转换为 ASS 的 alpha 值（0-255，0为不透明，255为完全透明）
  const alpha = Math.round((100 - Math.max(0, Math.min(100, danmakuOpacity))) * 2.55)
    .toString(16)
    .padStart(2, '0')
    .toUpperCase()

  return { fontSize, stripFontSize, trackH, topMargin, trackCount, minGap, alpha }
}

// ==================== 轨道分配算法 ====================

/** 轨道上已承诺的弹幕条目 */
interface TrackInfo {
  /** 出现时间（毫秒） */
  startTime: number
  /** 滚动时长（毫秒） */
  duration: number
  /** 滚动宽度基准（像素） */
  textWidth: number
}

/**
 * 计算同轨道上后一条弹幕与前一条弹幕的间距是否安全
 * 间距指 next 头部进入屏幕右缘时与 prev 尾部的距离；若 next 更快，还会校验 prev 消失前不被追尾
 * @param prev 先入轨（时间上更早）的弹幕
 * @param next 后入轨（时间上更晚）的弹幕
 * @param canvasWidth 画布宽度（像素）
 * @param minGap 最小间距（像素）
 * @returns 间距（像素），>= 0 表示不重叠
 */
const calcTrackDistance = (prev: TrackInfo, next: TrackInfo, canvasWidth: number, minGap: number): number => {
  const prevSpeed = (canvasWidth + prev.textWidth) / prev.duration
  const nextSpeed = (canvasWidth + next.textWidth) / next.duration
  const elapsed = next.startTime - prev.startTime
  const prevRightX = canvasWidth - prevSpeed * elapsed + prev.textWidth
  let dist = canvasWidth - prevRightX - minGap

  if (nextSpeed > prevSpeed) {
    const totalElapsed = next.startTime + next.duration - prev.startTime
    const prevRightXAtEnd = canvasWidth - prevSpeed * totalElapsed + prev.textWidth
    dist = Math.min(dist, -next.textWidth - prevRightXAtEnd - minGap)
  }
  return dist
}

/**
 * 单条弹幕入轨（区间表模型）：每条轨道维护按时间排序的已承诺弹幕列表，
 * 新弹幕只需与直接前驱/后继做间距检查（所有弹幕滚动时长相同，起止时间同序，最近邻居必是最强约束）
 * @param lanes 所有轨道的区间表
 * @param entry 待入轨弹幕
 * @param canvasWidth 画布宽度（像素）
 * @param minGap 同轨道相邻弹幕最小间距（像素）
 * @param preferFreeLane true 时优先随机选择空闲轨道（用于点赞角标，使其散布到任意行）；
 *                       false 时优先紧凑复用（普通弹幕，保持"避免阶梯"的观感）
 * @returns 轨道下标，放不下返回 -1
 */
const allocateTrack = (lanes: TrackInfo[][], entry: TrackInfo, canvasWidth: number, minGap: number, preferFreeLane: boolean): number => {
  const { startTime, duration } = entry
  let bestIdx = -1
  let bestDist = Infinity
  const freeLanes: number[] = []

  for (let i = 0; i < lanes.length; i++) {
    const lane = lanes[i]
    // 找直接前驱（最后一个不晚于当前弹幕的已承诺条目；常见情况是追加在末尾，从后往前扫）
    let predIdx = -1
    for (let j = lane.length - 1; j >= 0; j--) {
      if (lane[j].startTime <= startTime) {
        predIdx = j
        break
      }
    }
    const pred = predIdx >= 0 ? lane[predIdx] : null
    const succ = predIdx + 1 < lane.length ? lane[predIdx + 1] : null

    // 前驱仍在屏时必须保持间距；后继与当前弹幕时间交叠时，当前弹幕也不能挡住后继
    const predActive = pred !== null && pred.startTime + pred.duration > startTime
    if (predActive && calcTrackDistance(pred, entry, canvasWidth, minGap) < 0) continue
    if (succ !== null && startTime + duration > succ.startTime && calcTrackDistance(entry, succ, canvasWidth, minGap) < 0) continue

    if (!predActive) {
      // 当前时段空闲的轨道（含全空轨道），优先级最低，只有没有紧凑选择时才用
      freeLanes.push(i)
      continue
    }
    // 紧凑排列：距离最小但仍 >= 0 的轨道，避免"阶梯"效果
    const d = calcTrackDistance(pred, entry, canvasWidth, minGap)
    if (d < bestDist) {
      bestDist = d
      bestIdx = i
    }
  }

  if (preferFreeLane && freeLanes.length > 0) return freeLanes[Math.floor(Math.random() * freeLanes.length)]
  if (bestIdx !== -1) return bestIdx
  if (freeLanes.length > 0) return freeLanes[0]
  return -1
}

/**
 * 把弹幕按时间序插入轨道区间表
 * @param lane 目标轨道的区间表
 * @param entry 待插入弹幕
 */
const insertIntoLane = (lane: TrackInfo[], entry: TrackInfo): void => {
  let j = lane.length - 1
  while (j >= 0 && lane[j].startTime > entry.startTime) j--
  lane.splice(j + 1, 0, entry)
}

/**
 * 弹幕滚动宽度基准：ASS 与 overlay 必须使用同一度量，否则两类弹幕速度不一致、会错开
 * 纯文字用估算宽度；PNG 条取估算宽度与真实宽度的较大值（角标图标可能让真实宽度超过估算，
 * 取大者保证条尾在 endTime 前完全滚出屏幕，不会突然消失）
 * @param text 弹幕文本
 * @param strip 预渲染弹幕条（纯文字弹幕为 undefined）
 * @param fontSize ASS 字号（像素）
 * @returns 滚动宽度基准（像素）
 */
const resolveMoveWidth = (text: string, strip: DanmakuStrip | undefined, fontSize: number): number => {
  return strip ? Math.max(estimateWidth(text, fontSize), strip.width) : estimateWidth(text, fontSize)
}

// ==================== ASS 生成 ====================

/**
 * 生成 ASS 文件头（Script Info + 样式表 + 事件格式声明）
 * @param width 画布宽度（ASS PlayResX）
 * @param height 画布高度（ASS PlayResY）
 * @param fontName 字体名
 * @param layout 布局参数
 * @returns ASS 头部内容
 */
function buildAssHeader(width: number, height: number, fontName: string, layout: DanmakuLayout): string {
  return `[Script Info]
Title: Douyin Danmaku
ScriptType: v4.00+
PlayResX: ${width}
PlayResY: ${height}
Timer: 100.0000

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Scroll,${fontName},${layout.fontSize},&H${layout.alpha}FFFFFF,&H${layout.alpha}FFFFFF,&H${layout.alpha}000000,&H${layout.alpha}000000,0,0,0,0,100,100,0,0,1,0.8,0,2,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`
}

/**
 * 生成一条纯文字弹幕的 ASS Dialogue 行（滚动弹幕，\move 从右缘外滚到左缘外）
 * @param text 弹幕文本
 * @param entry 轨道条目（时间/宽度基准）
 * @param trackIdx 轨道下标
 * @param canvasWidth 画布宽度（像素）
 * @param layout 布局参数
 * @returns Dialogue 行（含换行符）
 */
function buildScrollDialogue(text: string, entry: TrackInfo, trackIdx: number, canvasWidth: number, layout: DanmakuLayout): string {
  const y = layout.topMargin + trackIdx * layout.trackH + layout.fontSize
  const content = escapeASS(text)
  return `Dialogue: 0,${toASSTime(entry.startTime)},${toASSTime(entry.startTime + entry.duration)},Scroll,,0,0,0,,{\\an7}{\\move(${canvasWidth},${y},${-entry.textWidth},${y})}${content}\n`
}

/**
 * 生成一条图片弹幕的 overlay 描述
 * @param strip 预渲染弹幕条
 * @param entry 轨道条目（时间/宽度基准）
 * @param trackIdx 轨道下标
 * @param layout 布局参数
 * @returns overlay 描述
 */
function buildOverlay(strip: DanmakuStrip, entry: TrackInfo, trackIdx: number, layout: DanmakuLayout): DanmakuOverlay {
  // ASS \an7 的 y 是文字顶部；条按视觉中心对齐文字中心
  const textTop = layout.topMargin + trackIdx * layout.trackH + layout.fontSize
  const y = Math.max(0, Math.round(textTop + (layout.fontSize - strip.height) / 2))
  return { pngPath: strip.pngPath, startTime: entry.startTime, endTime: entry.startTime + entry.duration, y, moveW: entry.textWidth }
}

/**
 * 生成弹幕 ASS 与图片弹幕（表情/点赞）overlay 列表
 * 纯文字弹幕输出 ASS \move 行；含表情或被选中展示点赞角标的弹幕预渲染为 PNG 条，统一参与轨道分配后转为 overlay
 * @param danmakuList 弹幕列表
 * @param width 画布宽度（像素）
 * @param height 画布高度（像素）
 * @param options 烧录配置
 * @returns ASS 内容、overlay 列表、临时文件与分类统计
 */
export async function generateDouyinASS(
  danmakuList: DouyinDanmakuElem[],
  width: number,
  height: number,
  options: DouyinDanmakuOptions = {}
): Promise<DouyinAssResult> {
  const { scrollTime = 8, danmakuOpacity = 70, fontName = 'Microsoft YaHei', danmakuArea = 0.5, danmakuFontSize = 'medium' } = options
  const layout = computeDanmakuLayout(height, danmakuArea, danmakuFontSize, danmakuOpacity)

  // 过滤并排序弹幕
  const sorted = danmakuList.filter((dm) => dm.text && dm.text.trim()).sort((a, b) => a.offset_time - b.offset_time)

  const emojiList = await fetchDouyinEmojiList()
  const liked = selectLikedDanmaku(sorted)
  const stripStyle: StripStyle = { fontSize: layout.stripFontSize, fontName, opacity: Math.max(0, Math.min(100, danmakuOpacity)) / 100 }
  const { strips, tempFiles } = await prepareDanmakuStrips(sorted, emojiList, liked, stripStyle)

  const assLines: string[] = []
  const overlays: DanmakuOverlay[] = []
  let likedOverlayCount = 0
  let emojiOverlayCount = 0

  /**
   * 弹幕入轨并上屏：写入 ASS（纯文字）或 overlay 列表（PNG 条）
   * @param dm 弹幕元素
   * @param preferFreeLane 是否优先随机选择空闲轨道（点赞角标弹幕为 true）
   */
  const placeDanmaku = (dm: DouyinDanmakuElem, preferFreeLane: boolean): void => {
    const strip = strips.get(dm.danmaku_id)
    const entry: TrackInfo = {
      startTime: dm.offset_time,
      duration: scrollTime * 1000,
      textWidth: resolveMoveWidth(dm.text, strip, layout.fontSize)
    }
    const trackIdx = allocateTrack(lanes, entry, width, layout.minGap, preferFreeLane)
    if (trackIdx === -1) return
    insertIntoLane(lanes[trackIdx], entry)

    if (strip) {
      overlays.push(buildOverlay(strip, entry, trackIdx, layout))
      if (liked.ids.has(dm.danmaku_id)) likedOverlayCount++
      else emojiOverlayCount++
      return
    }
    assLines.push(buildScrollDialogue(dm.text, entry, trackIdx, width, layout))
  }

  // 所有轨道共享，点赞角标弹幕按时间序先提交（获得优先级），普通弹幕后提交并绕开已承诺的角标。
  // 弹幕密集时普通轨道会按比例丢弃弹幕，先提交保证被选中的高点赞弹幕不被丢弃；
  // 角标优先随机选择空闲轨道，使其像普通弹幕一样散布在任意行
  const lanes: TrackInfo[][] = Array.from({ length: layout.trackCount }, () => [])

  // 第一遍：点赞角标弹幕（时间序），优先随机空闲轨道
  for (const dm of sorted) {
    if (liked.ids.has(dm.danmaku_id)) placeDanmaku(dm, true)
  }

  // 第二遍：普通弹幕（时间序），紧凑复用，绕开已承诺的角标弹幕
  for (const dm of sorted) {
    if (!liked.ids.has(dm.danmaku_id)) placeDanmaku(dm, false)
  }

  return {
    ass: buildAssHeader(width, height, fontName, layout) + assLines.join(''),
    overlays,
    tempFiles,
    stats: {
      likedOverlays: likedOverlayCount,
      emojiOverlays: emojiOverlayCount,
      likedCandidates: liked.candidateCount,
      likedTarget: liked.target
    }
  }
}

// ==================== 视频处理 ====================

/** 画布信息 */
interface CanvasInfo {
  /** 画布宽度（像素） */
  width: number
  /** 画布高度（像素） */
  height: number
  /** 视频内容在画布中的垂直偏移（像素） */
  offsetY: number
  /** 是否进行了竖屏适配 */
  isVertical: boolean
  /** 缩放比例（仅在竖屏适配且需要缩小时存在） */
  scale?: number
}

const MAX_OUTPUT_WIDTH = 2160

/**
 * 计算画布尺寸（竖屏适配）
 * 抖音视频大多是竖屏，但也可能有横屏视频需要转竖屏
 * @param origW 源视频宽度（像素）
 * @param origH 源视频高度（像素）
 * @param verticalMode 横屏转竖屏模式
 * @returns 画布信息
 */
function calcCanvas(origW: number, origH: number, verticalMode: DouyinVerticalMode): CanvasInfo {
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

  // standard 模式：只对宽屏视频进行转换
  if (isWide && ratio >= 1.7) {
    const newW = Math.min(origH, MAX_OUTPUT_WIDTH)
    const scaleRatio = newW / origW
    const newH = Math.round(origW * scaleRatio)
    const scaledH = Math.round(newW / ratio)
    const offsetY = Math.round((newH - scaledH) / 2)
    return { width: newW, height: newH, offsetY, isVertical: true, scale: newW / origW }
  }

  return { width: origW, height: origH, offsetY: 0, isVertical: false }
}

/**
 * 构建 FFmpeg 滤镜（无图片弹幕时的 -vf 简单滤镜链）
 * fps=60 放最前：视频帧复制（内容不变），libass 在每个新帧重新求值 \move，弹幕步进更小更顺滑
 * @param canvas 画布信息
 * @param assPath ASS 字幕文件路径
 * @returns -vf 滤镜链字符串
 */
function buildFilter(canvas: CanvasInfo, assPath: string): string {
  const escaped = escapeWinPath(assPath)
  if (canvas.isVertical) {
    if (canvas.scale && canvas.scale !== 1 && canvas.scale < 1) {
      return `fps=${OUTPUT_FPS},scale=${canvas.width}:-1,pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`
    }
    return `fps=${OUTPUT_FPS},pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`
  }
  return `fps=${OUTPUT_FPS},subtitles='${escaped}'`
}

/**
 * 构建 FFmpeg filter_complex（含图片弹幕时的叠加链）
 * 每条图片弹幕对应一个 PNG 输入（内容相同的弹幕条复用同一输入，见 burnDouyinDanmaku），
 * 用 overlay 按 \move 同语义滚动：x(t) = width - (t - start) * speed，speed = (width + moveW) / scrollTime
 * @param canvas 画布信息
 * @param assPath ASS 字幕文件路径
 * @param overlays 图片弹幕 overlay 列表
 * @param inputIndices 每条 overlay 对应的 ffmpeg 输入序号（与去重后的 -i 顺序一致）
 * @param scrollTime 滚动时间（秒）
 * @returns filter_complex 字符串
 */
function buildFilterComplex(
  canvas: CanvasInfo,
  assPath: string,
  overlays: DanmakuOverlay[],
  inputIndices: number[],
  scrollTime: number
): string {
  const escaped = escapeWinPath(assPath)

  let base = `[0:v]fps=${OUTPUT_FPS}`
  if (canvas.isVertical) {
    if (canvas.scale && canvas.scale !== 1 && canvas.scale < 1) {
      base += `,scale=${canvas.width}:-1`
    }
    base += `,pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black`
  }
  base += `,subtitles='${escaped}'[base]`

  const parts = [base]
  let prev = 'base'
  overlays.forEach((o, i) => {
    const speed = ((canvas.width + o.moveW) / scrollTime).toFixed(3)
    const s = (o.startTime / 1000).toFixed(3)
    const e = (o.endTime / 1000).toFixed(3)
    const label = i === overlays.length - 1 ? 'vout' : `v${i}`
    parts.push(
      `[${prev}][${inputIndices[i]}:v]overlay=x='${canvas.width}-(t-${s})*${speed}':y=${o.y}:enable='between(t,${s},${e})'[${label}]`
    )
    prev = label
  })

  return parts.join(';')
}

/**
 * 生成相对路径转换器：能相对化的转相对路径（正斜杠），否则保留绝对路径
 * 用于把 ffmpeg 命令行长度控制在 Windows cmd 的 8191 字符上限内
 * @param workDir 工作目录（ffmpeg 的 cwd）
 * @returns 路径转换函数
 */
const createRelativizer = (workDir: string): ((p: string) => string) => {
  return (p: string): string => {
    const rel = pathModule.relative(workDir, p).replace(/\\/g, '/')
    return rel && !rel.startsWith('..') ? rel : p.replace(/\\/g, '/')
  }
}

/** 图片弹幕输入规划 */
interface OverlayInputPlan {
  /** -i 参数列表（含视频输入） */
  inputArgs: string[]
  /** 每条 overlay 对应的输入序号 */
  inputIndices: number[]
}

/**
 * 规划图片弹幕的 ffmpeg 输入：内容相同的弹幕条复用同一个输入，减少命令行长度
 * @param videoPath 视频文件路径（相对化后）
 * @param overlays 图片弹幕 overlay 列表
 * @param toRel 相对路径转换器
 * @returns 输入参数列表与每条 overlay 的输入序号
 */
function planOverlayInputs(videoPath: string, overlays: DanmakuOverlay[], toRel: (p: string) => string): OverlayInputPlan {
  const inputIndexByPath = new Map<string, number>()
  const inputArgs: string[] = [`-i "${toRel(videoPath)}"`]
  const inputIndices = overlays.map((o) => {
    let idx = inputIndexByPath.get(o.pngPath)
    if (idx === undefined) {
      idx = inputIndexByPath.size + 1
      inputIndexByPath.set(o.pngPath, idx)
      inputArgs.push(`-i "${toRel(o.pngPath)}"`)
    }
    return idx
  })
  return { inputArgs, inputIndices }
}

/**
 * 烧录抖音弹幕到视频
 * @param videoPath 源视频文件路径
 * @param danmakuList 弹幕列表
 * @param outputPath 输出视频文件路径
 * @param options 烧录配置
 * @returns 是否烧录成功
 */
export async function burnDouyinDanmaku(
  videoPath: string,
  danmakuList: DouyinDanmakuElem[],
  outputPath: string,
  options: DouyinDanmakuOptions = {}
): Promise<boolean> {
  const { removeSource = false, verticalMode = 'off', videoCodec = 'h265', scrollTime = 8 } = options

  if (!fs.existsSync(videoPath)) {
    logger.error(`[DouyinDanmaku] 视频文件不存在: ${videoPath}`)
    return false
  }

  const resolution = await getDouyinResolution(videoPath)
  const sourceBitrate = await getVideoBitrate(videoPath)
  const canvas = calcCanvas(resolution.width, resolution.height, verticalMode)

  if (canvas.isVertical) {
    logger.debug(`[DouyinDanmaku] 竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`)
  }
  logger.debug(`[DouyinDanmaku] 分辨率: ${canvas.width}x${canvas.height}, 码率: ${sourceBitrate}kbps`)

  // 生成 ASS 与图片弹幕 overlay（使用画布尺寸）
  const { ass, overlays, tempFiles, stats } = await generateDouyinASS(danmakuList, canvas.width, canvas.height, options)
  const assPath = videoPath.replace(/\.[^.]+$/, '_danmaku.ass')
  fs.writeFileSync(assPath, ass, 'utf-8')
  logger.debug(
    `[DouyinDanmaku] 弹幕字幕已生成: ${assPath}，共 ${danmakuList.length} 条，` +
      `图片弹幕 ${overlays.length} 条（点赞角标 ${stats.likedOverlays} 条 [候选 ${stats.likedCandidates}/目标 ${stats.likedTarget}]，表情 ${stats.emojiOverlays} 条）`
  )

  // 编码（使用原视频码率作为目标）
  const encoder = await detectEncoder(videoCodec)
  const encoderParams = getEncoderParams(encoder, sourceBitrate)

  let command: string
  let execCwd: string | undefined
  if (overlays.length === 0) {
    const filter = buildFilter(canvas, assPath)
    command = `-y -i "${videoPath}" -vf "${filter}" -r ${OUTPUT_FPS} ${encoderParams} -c:a copy "${outputPath}"`
  } else {
    // PNG 是单帧输入，overlay 默认 eof_action=repeat 会保持最后一帧，无需 -loop（looped 输入会导致编码无法终止）
    // 图片弹幕多的时候命令行会超过 Windows cmd 的 8191 字符上限，因此：
    // 1. 以视频所在目录为 cwd，所有路径转相对路径
    // 2. 内容相同的弹幕条复用同一个输入
    // 3. filter_complex 写入脚本文件，用 -filter_complex_script 引用
    const workDir = pathModule.dirname(videoPath)
    execCwd = workDir
    const toRel = createRelativizer(workDir)
    const { inputArgs, inputIndices } = planOverlayInputs(videoPath, overlays, toRel)

    const graphPath = videoPath.replace(/\.[^.]+$/, '_danmaku.graph.txt')
    fs.writeFileSync(graphPath, buildFilterComplex(canvas, toRel(assPath), overlays, inputIndices, scrollTime), 'utf-8')
    tempFiles.push(graphPath)

    command = `-y ${inputArgs.join(' ')} -filter_complex_script "${toRel(graphPath)}" -map "[vout]" -map "0:a?" -r ${OUTPUT_FPS} ${encoderParams} -c:a copy "${toRel(outputPath)}"`
  }
  const result = await ffmpeg(command, execCwd ? { cwd: execCwd } : undefined)

  Common.removeFile(assPath, true)
  for (const file of tempFiles) {
    Common.removeFile(file, true)
  }

  if (result.status) {
    logger.mark(`[DouyinDanmaku] 弹幕烧录成功: ${outputPath}`)
    if (removeSource) Common.removeFile(videoPath)
  } else {
    logger.error('[DouyinDanmaku] 弹幕烧录失败', result)
  }

  return result.status
}
