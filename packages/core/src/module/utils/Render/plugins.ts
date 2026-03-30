import DOMPurify from 'dompurify'
import { Window } from 'happy-dom'
import QRCodeStyling from 'qr-code-styling'
import type { Plugin } from 'template'


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
    beforeRender (ctx) {
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
    async beforeRender (ctx) {
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
