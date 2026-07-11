import { inflateSync } from 'node:zlib'

import { logger } from 'node-karin'
import axios from 'node-karin/axios'
import type { Plugin } from 'template'
import type { BilibiliPosterPalette } from 'template/types/platforms/bilibili/dynamic/live'

import { Config } from '@/module/utils/Config'

type BeforeRenderContext = Parameters<NonNullable<Plugin['beforeRender']>>[0]
type ApplyRequest = Parameters<NonNullable<Plugin['apply']>>[0]

type RGB = {
  r: number
  g: number
  b: number
}

type PosterPaletteSeed = {
  dominant: RGB
  vividCandidate: RGB
}

type PosterImageSample = {
  buffer: Buffer
  paletteSeed: PosterPaletteSeed
}

type CoverThemeDecision = {
  useDarkTheme: boolean
  averageLuma: number
  darkRatio: number
  brightRatio: number
  vividRatio: number
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value))
}

const buildProxyImageUrl = (url: string): string => {
  if (!url || !url.startsWith('http')) return url
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=96&h=96&fit=cover&output=png`
}

const mixRgb = (a: RGB, b: RGB, weight: number): RGB => {
  const w = clamp(weight, 0, 1)
  return {
    r: Math.round(a.r * (1 - w) + b.r * w),
    g: Math.round(a.g * (1 - w) + b.g * w),
    b: Math.round(a.b * (1 - w) + b.b * w)
  }
}

const rgbToCss = (rgb: RGB): string => {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

const rgba = (rgb: RGB, alpha: number): string => {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
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

const hslToRgb = (h: number, s: number, l: number): RGB => {
  if (s === 0) {
    const gray = Math.round(l * 255)
    return { r: gray, g: gray, b: gray }
  }

  const hue2rgb = (p: number, q: number, t: number): number => {
    let next = t
    if (next < 0) next += 1
    if (next > 1) next -= 1
    if (next < 1 / 6) return p + (q - p) * 6 * next
    if (next < 1 / 2) return q
    if (next < 2 / 3) return p + (q - p) * (2 / 3 - next) * 6
    return p
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q

  return {
    r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
  }
}

const tuneRgb = (rgb: RGB, saturationMin: number, lightnessTarget: number): RGB => {
  const { h, s } = rgbToHsl(rgb)
  return hslToRgb(h, Math.max(s, saturationMin), clamp(lightnessTarget, 0, 1))
}

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

const createPosterPalette = (seed: PosterPaletteSeed, isDark: boolean): BilibiliPosterPalette => {
  const { dominant, vividCandidate } = seed
  const tunedPrimary = tuneRgb(dominant, 0.46, isDark ? 0.66 : 0.46)
  const tunedAccent = tuneRgb(vividCandidate, 0.58, isDark ? 0.72 : 0.58)
  const bgBase = mixRgb(tunedPrimary, isDark ? { r: 7, g: 15, b: 24 } : { r: 255, g: 255, b: 255 }, isDark ? 0.78 : 0.88)
  const deepColor = mixRgb(tunedAccent, isDark ? { r: 234, g: 249, b: 255 } : { r: 11, g: 32, b: 42 }, 0.62)

  return {
    bgColor: rgbToCss(bgBase),
    primaryColor: rgbToCss(tunedPrimary),
    secondaryColor: rgbToCss(mixRgb(tunedPrimary, tunedAccent, 0.35)),
    mutedColor: rgba(mixRgb(deepColor, bgBase, 0.28), isDark ? 0.76 : 0.72),
    accentColor: rgbToCss(tunedAccent),
    deepColor: rgbToCss(deepColor),
    coverShade: isDark ? 'rgba(0, 0, 0, 0.42)' : 'rgba(10, 24, 32, 0.34)'
  }
}

const extractPosterPaletteSeedFromBuffer = (buffer: Buffer): PosterPaletteSeed | null => {
  const decoded = decodePngToPixels(buffer)
  if (!decoded) return null
  const { data } = decoded

  let weightedR = 0
  let weightedG = 0
  let weightedB = 0
  let totalWeight = 0
  let vividCandidate: RGB = { r: 0, g: 0, b: 0 }
  let vividScore = 0

  for (let i = 0; i < data.length; i += 16) {
    const alpha = data[i + 3]
    if (alpha < 20) continue

    const rgb = {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2]
    }

    const { s, l } = rgbToHsl(rgb)
    const visibility = l > 0.08 && l < 0.92 ? 1 : 0.45
    const weight = (0.35 + s * 0.95) * visibility

    weightedR += rgb.r * weight
    weightedG += rgb.g * weight
    weightedB += rgb.b * weight
    totalWeight += weight

    const localScore = s * (0.6 + (1 - Math.abs(0.5 - l)) * 0.4)
    if (localScore > vividScore) {
      vividScore = localScore
      vividCandidate = rgb
    }
  }

  if (!totalWeight) {
    return null
  }

  return {
    dominant: {
      r: Math.round(weightedR / totalWeight),
      g: Math.round(weightedG / totalWeight),
      b: Math.round(weightedB / totalWeight)
    },
    vividCandidate
  }
}

const resolvePosterImageSample = async (imageUrl: string): Promise<PosterImageSample | null> => {
  const candidates = Array.from(new Set([buildProxyImageUrl(imageUrl), imageUrl].filter(Boolean)))

  for (const candidate of candidates) {
    try {
      const response = await axios.get<ArrayBuffer>(candidate, {
        responseType: 'arraybuffer',
        headers: {
          accept: 'image/png,image/apng,image/*,*/*;q=0.8'
        }
      })

      const buffer = Buffer.from(response.data)
      const paletteSeed = extractPosterPaletteSeedFromBuffer(buffer)

      if (paletteSeed) {
        return { buffer, paletteSeed }
      }
    } catch (error) {
      logger.debug(`[Render] 封面取色失败，尝试候选图: ${candidate}`, error)
    }
  }

  return null
}

const decideCoverTheme = (buffer: Buffer): CoverThemeDecision | null => {
  const decoded = decodePngToPixels(buffer)
  if (!decoded) return null

  const { data } = decoded
  const pixelCount = data.length / 4
  const pixelStep = Math.max(1, Math.floor(pixelCount / 1800))

  let total = 0
  let lumaSum = 0
  let darkCount = 0
  let brightCount = 0
  let vividCount = 0

  for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += pixelStep) {
    const i = pixelIndex * 4
    const alpha = data[i + 3]
    if (alpha < 20) continue

    const rgb = {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2]
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

const isBilibiliPosterPaletteRequest = (request: ApplyRequest): boolean => {
  return request.templateType === 'bilibili' && request.templateName === 'dynamic/DYNAMIC_TYPE_LIVE_RCMD'
}

const isCoverThemeRequest = (request: ApplyRequest): boolean => {
  if (request.templateType === 'bilibili') {
    return request.templateName === 'videoInfo'
  }

  return request.templateType === 'douyin' && (request.templateName === 'video-work' || request.templateName === 'image-work')
}

const getCoverUrl = (request: ApplyRequest): string => {
  const data = request.data || {}

  if (request.templateType === 'bilibili' && request.templateName === 'videoInfo') {
    return typeof data.pic === 'string' ? data.pic : ''
  }

  if (request.templateName === 'video-work') {
    return typeof data.image_url === 'string' ? data.image_url : ''
  }

  if (request.templateName === 'image-work') {
    const imageList = (data as { image_list?: { images?: Array<{ url?: unknown }> } }).image_list
    const cover = imageList?.images?.find((image) => typeof image.url === 'string' && image.url.length > 0)
    return typeof cover?.url === 'string' ? cover.url : ''
  }

  return ''
}

const applyCoverTheme = async (ctx: BeforeRenderContext): Promise<void> => {
  const imageUrl = getCoverUrl(ctx.request)
  if (!imageUrl) return

  const sample = await resolvePosterImageSample(imageUrl)
  if (!sample) return

  const decision = decideCoverTheme(sample.buffer)
  if (!decision) return

  const data = ctx.request.data || {}
  ctx.request.useDarkTheme = decision.useDarkTheme
  data.useDarkTheme = decision.useDarkTheme

  logger.debug(
    `[Render] 封面智能主题: ${ctx.request.templateType}/${ctx.request.templateName} -> ${decision.useDarkTheme ? '深色' : '浅色'} ` +
      `(luma=${decision.averageLuma.toFixed(2)}, dark=${decision.darkRatio.toFixed(2)}, bright=${decision.brightRatio.toFixed(2)}, vivid=${decision.vividRatio.toFixed(2)})`
  )
}

export const createPosterPalettePlugin = (): Plugin => {
  return {
    name: '封面动态取色与智能主题',
    enforce: 'pre',
    apply(request: ApplyRequest) {
      return isBilibiliPosterPaletteRequest(request) || (Config.app.Theme === 3 && isCoverThemeRequest(request))
    },
    async beforeRender(ctx: BeforeRenderContext) {
      if (Config.app.Theme === 3 && isCoverThemeRequest(ctx.request)) {
        await applyCoverTheme(ctx)
      }

      if (!isBilibiliPosterPaletteRequest(ctx.request)) {
        return
      }

      const data = ctx.request.data || {}
      const imageUrl = typeof data.image_url === 'string' ? data.image_url : ''

      if (!imageUrl) {
        return
      }

      const useDarkTheme = Boolean(ctx.request.useDarkTheme ?? data.useDarkTheme)
      const sample = await resolvePosterImageSample(imageUrl)
      if (!sample) return

      const lightPalette = createPosterPalette(sample.paletteSeed, false)
      const darkPalette = createPosterPalette(sample.paletteSeed, true)

      ctx.state.props = {
        ...ctx.state.props,
        posterPalettes: {
          light: lightPalette,
          dark: darkPalette
        },
        posterPalette: useDarkTheme ? darkPalette : lightPalette
      }
    }
  }
}
