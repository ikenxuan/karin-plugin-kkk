import DOMPurify from 'dompurify'
import { Window } from 'happy-dom'
import jpeg from 'jpeg-js'
import { logger } from 'node-karin'
import { PNG } from 'pngjs'
import QRCodeStyling from 'qr-code-styling'
import type { Plugin } from 'template'
import type { BilibiliPosterPalette } from 'template/types/platforms/bilibili/dynamic/live'

type BeforeRenderContext = Parameters<NonNullable<Plugin['beforeRender']>>[0]
type ApplyRequest = Parameters<NonNullable<Plugin['apply']>>[0]


/**
 * 创建 DOMPurify 实例
 * 使用 happy-dom 的 Window 来创建隔离的 DOM 环境
 */
const createDomPurify = () => {
  // @ts-ignore
  return DOMPurify(new Window())
}

/**
 * 对值进行消毒处理
 * 如果是字符串则进行 HTML 消毒
 * 如果是数组则递归处理每个元素
 * 如果是对象则递归处理每个属性值
 * 其他类型直接返回原值
 * @param value 需要消毒的值
 * @returns 消毒后的值
 */
const sanitizeValue = <T> (value: T): T => {
  const domPurify = createDomPurify()
  if (typeof value === 'string') {
    return domPurify.sanitize(value) as T
  }

  if (Array.isArray(value)) {
    return value.map(item => sanitizeValue(item)) as T
  }

  if (value && typeof value === 'object') {
    const output: Record<string, unknown> = {}

    for (const [key, item] of Object.entries(value)) {
      output[key] = sanitizeValue(item)
    }

    return output as T
  }

  return value
}

/**
 * 对渲染数据进行消毒处理，防止 XSS 攻击。
 * 在渲染前调用，确保数据安全。
 */
export const createSanitizeContentPlugin = (): Plugin => {
  return {
    name: '数据消毒',
    enforce: 'pre',
    beforeRender (ctx: BeforeRenderContext) {
      ctx.request.data = sanitizeValue(ctx.request.data)
      ctx.state.props = sanitizeValue(ctx.state.props)
    }
  }
}

/**
 * 二维码插件工厂
 * 为指定字段生成二维码数据 URL
 * @param options 插件配置选项
 * @returns 二维码插件实例
 */
export const createQrCodePlugin = (): Plugin => {
  return {
    name: '生成二维码',
    enforce: 'pre',
    async beforeRender (ctx: BeforeRenderContext) {
      const data = ctx.request.data || {}
      const useDarkTheme = Boolean(data.useDarkTheme)

      const toDataUrl = async (url: string): Promise<string> => {
        const qrCode = new QRCodeStyling({
          // @ts-ignore
          jsdom: Window,
          type: 'svg',
          shape: 'square',
          width: 2000,
          height: 2000,
          data: url,
          margin: 0,
          qrOptions: {
            typeNumber: 0,
            mode: 'Byte',
            errorCorrectionLevel: 'L'
          },
          imageOptions: {
            hideBackgroundDots: false,
            imageSize: 0.4,
            margin: 0
          },
          dotsOptions: {
            type: 'rounded',
            color: useDarkTheme ? '#C3C3C3' : '#3A3A3A',
            roundSize: false
          },
          backgroundOptions: {
            color: 'transparent'
          },
          cornersSquareOptions: {
            type: 'extra-rounded',
            color: useDarkTheme ? '#C3C3C3' : '#3A3A3A'
          },
          cornersDotOptions: {
            color: useDarkTheme ? '#C3C3C3' : '#3A3A3A'
          }
        })

        const buffer = await qrCode.getRawData('svg')
        if (!buffer) {
          throw new Error('Failed to generate QR code')
        }
        return `data:image/svg+xml;base64,${buffer.toString('base64')}`
      }

      const props = ctx.state.props || {}
      if (!props.qrCodes) {
        props.qrCodes = {}
      }
      if (!props.qrCodeDataUrl) {
        props.qrCodeDataUrl = undefined
      }

      if (typeof data.share_url === 'string' && data.share_url.length > 0) {
        const dataUrl = await toDataUrl(data.share_url)
        const qrCodes = props.qrCodes as Record<string, string>
        qrCodes.share_url = dataUrl
        if (!props.qrCodeDataUrl) {
          props.qrCodeDataUrl = dataUrl
        }
      }

      ctx.state.props = props
    }
  }
}

type RGB = {
  r: number
  g: number
  b: number
}

type PosterPaletteSeed = {
  dominant: RGB
  vividCandidate: RGB
}

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(max, Math.max(min, value))
}

const buildProxyImageUrl = (url: string): string => {
  if (!url || !url.startsWith('http')) return url
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=96&h=96&fit=cover&output=jpg`
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

const decodeImageToPixels = (buffer: Buffer, contentType: string): { data: Uint8Array | Uint8ClampedArray; width: number; height: number } => {
  if (contentType.includes('png')) {
    const decoded = PNG.sync.read(buffer)
    return {
      data: decoded.data,
      width: decoded.width,
      height: decoded.height
    }
  }

  const decoded = jpeg.decode(buffer, { useTArray: true })
  return {
    data: decoded.data,
    width: decoded.width,
    height: decoded.height
  }
}

const createPosterPalette = (seed: PosterPaletteSeed, isDark: boolean): BilibiliPosterPalette => {
  const { dominant, vividCandidate } = seed
  const tunedPrimary = tuneRgb(dominant, 0.46, isDark ? 0.66 : 0.46)
  const tunedAccent = tuneRgb(vividCandidate, 0.58, isDark ? 0.72 : 0.58)
  const bgBase = mixRgb(
    tunedPrimary,
    isDark ? { r: 7, g: 15, b: 24 } : { r: 255, g: 255, b: 255 },
    isDark ? 0.78 : 0.88
  )
  const deepColor = mixRgb(
    tunedAccent,
    isDark ? { r: 234, g: 249, b: 255 } : { r: 11, g: 32, b: 42 },
    0.62
  )

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

const extractPosterPaletteSeedFromBuffer = (buffer: Buffer, contentType: string): PosterPaletteSeed | null => {
  const decoded = decodeImageToPixels(buffer, contentType)
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

export const createPosterPalettePlugin = (): Plugin => {
  return {
    name: '封面动态取色',
    enforce: 'pre',
    apply (request: ApplyRequest) {
      return request.templateType === 'bilibili' && request.templateName === 'dynamic/DYNAMIC_TYPE_LIVE_RCMD'
    },
    async beforeRender (ctx: BeforeRenderContext) {
      const data = ctx.request.data || {}
      const imageUrl = typeof data.image_url === 'string' ? data.image_url : ''

      if (!imageUrl) {
        return
      }

      const useDarkTheme = Boolean(ctx.request.useDarkTheme ?? data.useDarkTheme)
      const candidates = [buildProxyImageUrl(imageUrl), imageUrl]

      for (const candidate of candidates) {
        try {
          const response = await fetch(candidate, {
            headers: {
              accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            }
          })

          if (!response.ok) {
            continue
          }

          const buffer = Buffer.from(await response.arrayBuffer())
          const contentType = response.headers.get('content-type') || 'image/jpeg'
          const paletteSeed = extractPosterPaletteSeedFromBuffer(buffer, contentType)

          if (paletteSeed) {
            const lightPalette = createPosterPalette(paletteSeed, false)
            const darkPalette = createPosterPalette(paletteSeed, true)

            ctx.state.props = {
              ...ctx.state.props,
              posterPalettes: {
                light: lightPalette,
                dark: darkPalette
              },
              posterPalette: useDarkTheme ? darkPalette : lightPalette
            }
            return
          }
        } catch (error) {
          logger.debug(`[Render] 封面动态取色失败，尝试候选图: ${candidate}`, error)
        }
      }
    }
  }
}
