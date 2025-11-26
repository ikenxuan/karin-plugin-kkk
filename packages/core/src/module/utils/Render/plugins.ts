import nodeCanvas from 'canvas'
import { JSDOM } from 'jsdom'
import QRCodeStyling from 'qr-code-styling'
import type { Plugin } from 'template'

/**
 * 二维码插件工厂
 * 为指定字段生成二维码数据 URL
 * @param options 插件配置选项
 * @returns 二维码插件实例
 */
export const createQrCodePlugin = (): Plugin => {
  return {
    name: 'qr-code',
    enforce: 'pre',
    async beforeRender (ctx) {
      const data = ctx.request.data || {}
      const useDarkTheme = Boolean(data.useDarkTheme)

      const toDataUrl = async (url: string): Promise<string> => {
        const qrCode = new QRCodeStyling({
          jsdom: JSDOM,
          nodeCanvas,
          type: 'svg',
          shape: 'square',
          width: 1200,
          height: 1200,
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
            color: useDarkTheme ? '#18181B' : '#FAFAFA'
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

      for (const field of ['share_url']) {
        const value = (data as Record<string, unknown>)[field]
        if (typeof value === 'string' && value.length > 0) {
          const dataUrl = await toDataUrl(value)
            ; (props.qrCodes as Record<string, string>)[field] = dataUrl
          if (!props.qrCodeDataUrl) {
            props.qrCodeDataUrl = dataUrl
          }
        }
      }

      ctx.state.props = props
    }
  }
}
