import { inflateSync } from 'node:zlib'

import jpeg from 'jpeg-js'
import axios from 'node-karin/axios'

import { Common } from '@/module'
import { Config } from '@/module/utils/Config'
import { logger } from '@/module/utils/logger'

/**
 * 智能主题（Config.app.Theme === 3）目前只对这几个模板生效：
 * 它们的氛围背景直接取自封面（AmbientCover），深浅主题跟随封面明暗观感最好。
 */
const SMART_THEME_PATHS = new Set([
  'douyin/video-work',
  'douyin/image-work',
  'douyin/mix',
  'douyin/article-work',
  'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD'
])

type RGB = {
  r: number
  g: number
  b: number
}

type CoverThemeDecision = {
  /** 明暗方向由整张封面的综合色亮度决定。 */
  useDarkTheme: boolean
  /** 非文章模板沿用既有像素分布算法，避免其他智能主题模板视觉回归。 */
  legacyUseDarkTheme: boolean
  /** 跳过透明像素后的整图平均 RGB 色，格式为 #RRGGBB。 */
  averageColor: string
  /** 平均 RGB 色自身的亮度，用于智能文章主题判定。 */
  averageColorLuma: number
  averageLuma: number
  darkRatio: number
  brightRatio: number
  vividRatio: number
}

/**
 * 从渲染数据中提取封面 URL（按模板路径分别取值）。
 * @param path 渲染路径，格式为 "平台/组件ID" 或 "平台/分类/组件ID"
 * @param data 渲染数据
 */
export const getCoverUrl = (path: string, data: unknown): string => {
  if (!data || typeof data !== 'object') return ''

  if (path === 'douyin/video-work' || path === 'douyin/mix' || path === 'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD') {
    const imageUrl = (data as { image_url?: unknown }).image_url
    return typeof imageUrl === 'string' ? imageUrl : ''
  }

  if (path === 'douyin/article-work') {
    const article = data as {
      cover_url?: unknown
      images?: Array<{
        ai_high_image_url?: unknown
        high_image_url?: unknown
        origin_image_url?: unknown
        markdown_url?: unknown
      }>
    }
    const image = article.images?.[0]
    const candidates = [article.cover_url, image?.ai_high_image_url, image?.high_image_url, image?.origin_image_url, image?.markdown_url]
    return candidates.find((url): url is string => typeof url === 'string' && url.length > 0) ?? ''
  }

  if (path === 'douyin/image-work') {
    const imageList = (data as { image_list?: { images?: Array<{ url?: unknown }> } }).image_list
    const cover = imageList?.images?.find((image) => typeof image.url === 'string' && image.url.length > 0)
    return typeof cover?.url === 'string' ? cover.url : ''
  }

  return ''
}

/** 通过图片代理把任意格式封面转成 96x96 PNG，便于无第三方库解码 */
const buildProxyImageUrl = (url: string, fit: 'cover' | 'inside' = 'cover'): string => {
  if (!url || !url.startsWith('http')) return url
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=96&h=96&fit=${fit}&output=png`
}

const relativeLuma = ({ r, g, b }: RGB): number => {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}

const rgbToHsl = ({ r, g, b }: RGB): { h: number; s: number; l: number } => {
  const nr = r / 255
  const ng = g / 255
  const nb = b / 255
  const max = Math.max(nr, ng, nb)
  const min = Math.min(nr, ng, nb)
  const l = (max + min) / 2
  const d = max - min

  if (d === 0) {
    return { h: 0, s: 0, l }
  }

  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0

  switch (max) {
    case nr:
      h = (ng - nb) / d + (ng < nb ? 6 : 0)
      break
    case ng:
      h = (nb - nr) / d + 2
      break
    default:
      h = (nr - ng) / d + 4
      break
  }

  return { h: h / 6, s, l }
}

/**
 * 手工解码 8-bit、非隔行 PNG（灰度、RGB、索引色、灰度 Alpha、RGBA）为 RGBA 像素数组。
 * 其他 PNG 变体返回 null 并安全回退；网络封面优先由代理归一化为普通 PNG。
 */
const decodePngToPixels = (buffer: Buffer): { data: Buffer; width: number; height: number } | null => {
  if (buffer[0] !== 0x89 || buffer[1] !== 0x50) return null
  let offset = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
  let interlaceMethod = 0
  let palette: Buffer | undefined
  let transparency: Buffer | undefined
  const idatChunks: Buffer[] = []

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset)
    const type = buffer.toString('ascii', offset + 4, offset + 8)
    const chunkData = buffer.subarray(offset + 8, offset + 8 + length)

    if (type === 'IHDR') {
      width = chunkData.readUInt32BE(0)
      height = chunkData.readUInt32BE(4)
      bitDepth = chunkData[8]
      colorType = chunkData[9]
      interlaceMethod = chunkData[12]
    } else if (type === 'PLTE') {
      palette = chunkData
    } else if (type === 'tRNS') {
      transparency = chunkData
    } else if (type === 'IDAT') {
      idatChunks.push(chunkData)
    } else if (type === 'IEND') {
      break
    }
    offset += 12 + length
  }

  if (!width || !height || bitDepth !== 8 || interlaceMethod !== 0) return null
  const channels = colorType === 0 || colorType === 3 ? 1 : colorType === 2 ? 3 : colorType === 4 ? 2 : colorType === 6 ? 4 : 0
  if (!channels || (colorType === 3 && (!palette || palette.length % 3 !== 0))) return null

  const raw = inflateSync(Buffer.concat(idatChunks))
  const stride = width * channels
  const pixels = Buffer.alloc(width * height * 4)

  const prevRow = Buffer.alloc(stride)
  let rawOffset = 0

  for (let y = 0; y < height; y++) {
    const filter = raw[rawOffset++]
    const curRow = Buffer.alloc(stride)

    for (let x = 0; x < stride; x++) {
      const val = raw[rawOffset++]
      const a = x >= channels ? curRow[x - channels] : 0
      const b = prevRow[x]
      const c = x >= channels ? prevRow[x - channels] : 0

      switch (filter) {
        case 0:
          curRow[x] = val
          break
        case 1:
          curRow[x] = (val + a) & 0xff
          break
        case 2:
          curRow[x] = (val + b) & 0xff
          break
        case 3:
          curRow[x] = (val + ((a + b) >> 1)) & 0xff
          break
        case 4: {
          const p = a + b - c
          const pa = Math.abs(p - a)
          const pb = Math.abs(p - b)
          const pc = Math.abs(p - c)
          curRow[x] = (val + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff
          break
        }
      }
    }

    for (let x = 0; x < width; x++) {
      const pi = (y * width + x) * 4
      const ci = x * channels
      if (colorType === 0) {
        pixels[pi] = curRow[ci]
        pixels[pi + 1] = curRow[ci]
        pixels[pi + 2] = curRow[ci]
        pixels[pi + 3] = 255
      } else if (colorType === 2) {
        pixels[pi] = curRow[ci]
        pixels[pi + 1] = curRow[ci + 1]
        pixels[pi + 2] = curRow[ci + 2]
        pixels[pi + 3] = 255
      } else if (colorType === 3) {
        const paletteIndex = curRow[ci]
        const paletteOffset = paletteIndex * 3
        if (paletteOffset + 2 >= (palette?.length ?? 0)) return null
        pixels[pi] = palette![paletteOffset]
        pixels[pi + 1] = palette![paletteOffset + 1]
        pixels[pi + 2] = palette![paletteOffset + 2]
        pixels[pi + 3] = transparency?.[paletteIndex] ?? 255
      } else if (colorType === 4) {
        pixels[pi] = curRow[ci]
        pixels[pi + 1] = curRow[ci]
        pixels[pi + 2] = curRow[ci]
        pixels[pi + 3] = curRow[ci + 1]
      } else {
        pixels[pi] = curRow[ci]
        pixels[pi + 1] = curRow[ci + 1]
        pixels[pi + 2] = curRow[ci + 2]
        pixels[pi + 3] = curRow[ci + 3]
      }
    }
    curRow.copy(prevRow)
  }

  return { data: pixels, width, height }
}

/**
 * 根据封面像素判断整张图的明暗倾向。
 * 封面偏深 -> 深色模式；偏浅 -> 浅色模式。
 */
export const analyzeCoverPixels = (pixels: Buffer): CoverThemeDecision | null => {
  const pixelCount = pixels.length / 4
  const pixelStep = Math.max(1, Math.floor(pixelCount / 1800))

  let total = 0
  let redSum = 0
  let greenSum = 0
  let blueSum = 0
  let lumaSum = 0
  let darkCount = 0
  let brightCount = 0
  let vividCount = 0

  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += pixelStep) {
    const i = pixelIndex * 4
    const alpha = pixels[i + 3]
    if (alpha < 20) continue

    const rgb = {
      r: pixels[i],
      g: pixels[i + 1],
      b: pixels[i + 2]
    }
    const luma = relativeLuma(rgb)
    const { s, l } = rgbToHsl(rgb)

    total += 1
    redSum += rgb.r
    greenSum += rgb.g
    blueSum += rgb.b
    lumaSum += luma
    if (luma < 0.38) darkCount += 1
    if (luma > 0.72) brightCount += 1
    if (s > 0.42 && l > 0.16 && l < 0.86) vividCount += 1
  }

  if (!total) return null

  const averageRgb = {
    r: Math.round(redSum / total),
    g: Math.round(greenSum / total),
    b: Math.round(blueSum / total)
  }
  const averageColor = `#${averageRgb.r.toString(16).padStart(2, '0')}${averageRgb.g.toString(16).padStart(2, '0')}${averageRgb.b.toString(16).padStart(2, '0')}`
  const averageColorLuma = relativeLuma(averageRgb)
  const averageLuma = lumaSum / total
  const darkRatio = darkCount / total
  const brightRatio = brightCount / total
  const vividRatio = vividCount / total
  const shouldUseLight = averageLuma > 0.72 && brightRatio > 0.48 && vividRatio < 0.28 && darkRatio < 0.18
  const shouldUseDark = averageLuma < 0.54 || darkRatio > 0.34 || (vividRatio > 0.38 && averageLuma < 0.72)

  return {
    useDarkTheme: averageColorLuma < 0.54,
    legacyUseDarkTheme: shouldUseLight ? false : shouldUseDark,
    averageColor,
    averageColorLuma,
    averageLuma,
    darkRatio,
    brightRatio,
    vividRatio
  }
}

/** 解码服务端取色支持的 PNG/JPEG 位图为 RGBA 像素。 */
const decodeCoverImage = (buffer: Buffer): Buffer | null => {
  try {
    const png = decodePngToPixels(buffer)
    if (png) return png.data
  } catch {
    // 非 PNG 或数据不完整时继续尝试 JPEG 解码。
  }

  try {
    return Buffer.from(jpeg.decode(buffer, { useTArray: true }).data)
  } catch {
    return null
  }
}

/** 解码模板开发面板 / captured.json 提供的 JPEG/PNG data URI，无需外部代理。 */
const decodeCoverDataUrl = (imageUrl: string): Buffer | null => {
  const match = imageUrl.match(/^data:image\/(?:png|jpe?g);base64,([a-z\d+/=]+)$/i)
  if (!match) return null

  try {
    return decodeCoverImage(Buffer.from(match[1], 'base64'))
  } catch {
    return null
  }
}

/** 日志中只保留封面协议/路径，不记录 base64 内容或签名查询参数。 */
const describeCoverUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith('data:')) {
    const mime = imageUrl.match(/^data:([^;,]+)/)?.[1] ?? 'image'
    return `${mime};[base64 omitted]`
  }

  try {
    const url = new URL(imageUrl)
    return `${url.origin}${url.pathname}`
  } catch {
    return '[invalid cover URL]'
  }
}

/** 拉取封面并解码为像素，依次尝试图片代理和原始 PNG/JPEG URL。 */
const fetchCoverPixels = async (imageUrl: string, fit: 'cover' | 'inside' = 'cover'): Promise<Buffer | null> => {
  if (imageUrl.startsWith('data:')) return decodeCoverDataUrl(imageUrl)

  const candidates = Array.from(new Set([buildProxyImageUrl(imageUrl, fit), imageUrl].filter(Boolean)))

  for (const candidate of candidates) {
    try {
      const response = await axios.get<ArrayBuffer>(candidate, {
        responseType: 'arraybuffer',
        headers: {
          accept: 'image/png,image/apng,image/*,*/*;q=0.8'
        }
      })

      const decoded = decodeCoverImage(Buffer.from(response.data))
      if (decoded) return decoded
    } catch (error) {
      logger.debug(`[Render] 封面智能主题取图失败，尝试候选图: ${describeCoverUrl(candidate)}`, error)
    }
  }

  return null
}

/**
 * 解析模板应使用的明暗主题。
 * 智能主题（Config.app.Theme === 3）下，对 SMART_THEME_PATHS 中的模板
 * 拉取封面计算明暗倾向并打印日志；其余情况回退到 Common.useDarkTheme()。
 *
 * @param path 渲染路径
 * @param data 渲染数据
 */
export type ResolvedCoverTheme = {
  useDarkTheme: boolean
  /** 只对抖音文章智能主题下发，作为文章画布综合色背景。 */
  coverColor?: string
}

export const resolveCoverTheme = async (path: string, data: unknown): Promise<ResolvedCoverTheme> => {
  if (Config.app.Theme === 3 && SMART_THEME_PATHS.has(path)) {
    const coverUrl = getCoverUrl(path, data)

    if (coverUrl) {
      const pixels = await fetchCoverPixels(coverUrl, path === 'douyin/article-work' ? 'inside' : 'cover')
      const decision = pixels ? analyzeCoverPixels(pixels) : null

      if (decision) {
        const isArticle = path === 'douyin/article-work'
        const useDarkTheme = isArticle ? decision.useDarkTheme : decision.legacyUseDarkTheme
        logger.info(
          `[Render] 封面智能主题: ${path} -> ${useDarkTheme ? '深色' : '浅色'} ` +
            `(color=${decision.averageColor}, colorLuma=${decision.averageColorLuma.toFixed(2)}, ` +
            `luma=${decision.averageLuma.toFixed(2)}, dark=${decision.darkRatio.toFixed(2)}, ` +
            `bright=${decision.brightRatio.toFixed(2)}, vivid=${decision.vividRatio.toFixed(2)})`
        )
        return { useDarkTheme, ...(isArticle ? { coverColor: decision.averageColor } : {}) }
      }

      logger.warn(`[Render] 封面智能主题: ${path} 封面取色失败，回退到按时间自动 (封面: ${describeCoverUrl(coverUrl)})`)
    }
  }

  return { useDarkTheme: Common.useDarkTheme() }
}
