import { inflateSync } from 'node:zlib'

import { logger } from 'node-karin'
import axios from 'node-karin/axios'

import { Common } from '@/module'
import { Config } from '@/module/utils/Config'

/**
 * 智能主题（Config.app.Theme === 3）目前只对这几个模板生效：
 * 它们的氛围背景直接取自封面（AmbientCover），深浅主题跟随封面明暗观感最好。
 */
const SMART_THEME_PATHS = new Set(['douyin/video-work', 'douyin/image-work', 'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD'])

type RGB = {
  r: number
  g: number
  b: number
}

type CoverThemeDecision = {
  useDarkTheme: boolean
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
const getCoverUrl = (path: string, data: unknown): string => {
  if (!data || typeof data !== 'object') return ''

  if (path === 'douyin/video-work' || path === 'bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD') {
    const imageUrl = (data as { image_url?: unknown }).image_url
    return typeof imageUrl === 'string' ? imageUrl : ''
  }

  if (path === 'douyin/image-work') {
    const imageList = (data as { image_list?: { images?: Array<{ url?: unknown }> } }).image_list
    const cover = imageList?.images?.find((image) => typeof image.url === 'string' && image.url.length > 0)
    return typeof cover?.url === 'string' ? cover.url : ''
  }

  return ''
}

/** 通过图片代理把任意格式封面转成 96x96 PNG，便于无第三方库解码 */
const buildProxyImageUrl = (url: string): string => {
  if (!url || !url.startsWith('http')) return url
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=96&h=96&fit=cover&output=png`
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
 * 手工解码 PNG（8bit、RGB/RGBA）为 RGBA 像素数组。
 * 配合图片代理的 output=png，避免引入额外的图片解码依赖。
 */
const decodePngToPixels = (buffer: Buffer): { data: Buffer; width: number; height: number } | null => {
  if (buffer[0] !== 0x89 || buffer[1] !== 0x50) return null
  let offset = 8
  let width = 0
  let height = 0
  let bitDepth = 0
  let colorType = 0
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
    } else if (type === 'IDAT') {
      idatChunks.push(chunkData)
    } else if (type === 'IEND') {
      break
    }
    offset += 12 + length
  }

  if (!width || !height || bitDepth !== 8) return null
  const channels = colorType === 6 ? 4 : colorType === 2 ? 3 : 0
  if (!channels) return null

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
      pixels[pi] = curRow[ci]
      pixels[pi + 1] = curRow[ci + 1]
      pixels[pi + 2] = curRow[ci + 2]
      pixels[pi + 3] = channels === 4 ? curRow[ci + 3] : 255
    }
    curRow.copy(prevRow)
  }

  return { data: pixels, width, height }
}

/**
 * 根据封面像素判断整张图的明暗倾向。
 * 封面偏深 -> 深色模式；偏浅 -> 浅色模式。
 */
const decideCoverTheme = (pixels: Buffer): CoverThemeDecision | null => {
  const pixelCount = pixels.length / 4
  const pixelStep = Math.max(1, Math.floor(pixelCount / 1800))

  let total = 0
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
    lumaSum += luma
    if (luma < 0.38) darkCount += 1
    if (luma > 0.72) brightCount += 1
    if (s > 0.42 && l > 0.16 && l < 0.86) vividCount += 1
  }

  if (!total) return null

  const averageLuma = lumaSum / total
  const darkRatio = darkCount / total
  const brightRatio = brightCount / total
  const vividRatio = vividCount / total
  const shouldUseLight = averageLuma > 0.72 && brightRatio > 0.48 && vividRatio < 0.28 && darkRatio < 0.18
  const shouldUseDark = averageLuma < 0.54 || darkRatio > 0.34 || (vividRatio > 0.38 && averageLuma < 0.72)

  return {
    useDarkTheme: shouldUseLight ? false : shouldUseDark,
    averageLuma,
    darkRatio,
    brightRatio,
    vividRatio
  }
}

/** 拉取封面并解码为像素，依次尝试图片代理（转 PNG）和原始 URL（本身即 PNG 时） */
const fetchCoverPixels = async (imageUrl: string): Promise<Buffer | null> => {
  const candidates = Array.from(new Set([buildProxyImageUrl(imageUrl), imageUrl].filter(Boolean)))

  for (const candidate of candidates) {
    try {
      const response = await axios.get<ArrayBuffer>(candidate, {
        responseType: 'arraybuffer',
        headers: {
          accept: 'image/png,image/apng,image/*,*/*;q=0.8'
        }
      })

      const decoded = decodePngToPixels(Buffer.from(response.data))
      if (decoded) {
        return decoded.data
      }
    } catch (error) {
      logger.debug(`[Render] 封面智能主题取图失败，尝试候选图: ${candidate}`, error)
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
export const resolveUseDarkTheme = async (path: string, data: unknown): Promise<boolean> => {
  if (Config.app.Theme === 3 && SMART_THEME_PATHS.has(path)) {
    const coverUrl = getCoverUrl(path, data)

    if (coverUrl) {
      const pixels = await fetchCoverPixels(coverUrl)
      const decision = pixels ? decideCoverTheme(pixels) : null

      if (decision) {
        logger.info(
          `[Render] 封面智能主题: ${path} -> ${decision.useDarkTheme ? '深色' : '浅色'} ` +
            `(luma=${decision.averageLuma.toFixed(2)}, dark=${decision.darkRatio.toFixed(2)}, ` +
            `bright=${decision.brightRatio.toFixed(2)}, vivid=${decision.vividRatio.toFixed(2)})`
        )
        return decision.useDarkTheme
      }

      logger.warn(`[Render] 封面智能主题: ${path} 封面取色失败，回退到按时间自动 (封面: ${coverUrl})`)
    }
  }

  return Common.useDarkTheme()
}
