import QRCode from 'qrcode'
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
      const isDark = Boolean(data.useDarkTheme)

      const toDataUrl = async (url: string): Promise<string> => {
        const svg = await QRCode.toString(url, {
          type: 'svg',
          width: 600,
          errorCorrectionLevel: 'L',
          color: {
            dark: isDark ? '#C3C3C3' : '#3A3A3A',
            light: isDark ? '#18181B' : '#FAFAFA'
          },
          margin: 0
        })
        return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
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
