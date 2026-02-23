import jsQR from 'jsqr'
import { logger } from 'node-karin'
import axios from 'node-karin/axios'
import { PNG } from 'pngjs'

/**
 * 二维码扫描工具类
 */
export class QRCodeScanner {
  /**
   * 从图片 URL 识别二维码
   * @param imageUrl 图片 URL
   * @returns 二维码内容，如果没有识别到则返回 null
   */
  static async scanFromUrl(imageUrl: string): Promise<string | null> {
    try {
      // 下载图片
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
      const buffer = Buffer.from(response.data)

      // 解析图片
      return await this.scanFromBuffer(buffer)
    } catch (error) {
      logger.error('识别二维码时发生错误:', error)
      return null
    }
  }

  /**
   * 从图片 Buffer 识别二维码
   * @param buffer 图片 Buffer
   * @returns 二维码内容，如果没有识别到则返回 null
   */
  static async scanFromBuffer(buffer: Buffer): Promise<string | null> {
    try {
      let imageData: { width: number; height: number; data: Uint8ClampedArray }

      // 尝试解析 PNG
      try {
        const png = PNG.sync.read(buffer)
        imageData = {
          width: png.width,
          height: png.height,
          data: Uint8ClampedArray.from(png.data)
        }
        logger.debug(`图片解析成功: ${png.width}x${png.height}, 数据长度: ${png.data.length}`)
      } catch (err) {
        logger.warn('图片格式不支持，目前仅支持 PNG 格式的二维码识别', err)
        return null
      }

      // 先尝试不带参数的识别（与现有代码保持一致）
      try {
        logger.debug('尝试默认识别策略（无参数）')
        const code = jsQR(imageData.data, imageData.width, imageData.height)
        if (code && code.data) {
          logger.debug(`成功识别二维码（默认策略）: ${code.data}`)
          return code.data
        }
      } catch (err) {
        logger.debug('默认识别策略失败:', err)
      }

      // 尝试多种识别策略
      const strategies = [
        { inversionAttempts: 'attemptBoth' as const },
        { inversionAttempts: 'invertFirst' as const },
        { inversionAttempts: 'onlyInvert' as const },
        { inversionAttempts: 'dontInvert' as const }
      ]

      for (const strategy of strategies) {
        try {
          logger.debug(`尝试识别策略: ${strategy.inversionAttempts}`)
          const code = jsQR(imageData.data, imageData.width, imageData.height, strategy)
          if (code && code.data) {
            logger.debug(`成功识别二维码 (策略: ${strategy.inversionAttempts}): ${code.data}`)
            return code.data
          }
        } catch (err) {
          logger.debug(`识别策略 ${strategy.inversionAttempts} 失败:`, err)
        }
      }

      logger.warn('图片中未识别到二维码，已尝试所有识别策略')
      return null
    } catch (error) {
      logger.error('解析图片时发生错误:', error)
      return null
    }
  }

  /**
   * 检查二维码内容是否包含支持的平台链接
   * @param qrContent 二维码内容
   * @returns 是否包含支持的平台链接
   */
  static isSupportedPlatform(qrContent: string): boolean {
    const patterns = [
      /(https?:\/\/)?(www|v|jx|m|jingxuan)\.(douyin|iesdouyin)\.com/i, // 抖音分享链接
      /https:\/\/aweme\.snssdk\.com\/aweme\/v1\/play/i, // 抖音 CDN 下载链接
      /(bilibili\.com|b23\.tv|t\.bilibili\.com|bili2233\.cn|\bBV[1-9a-zA-Z]{10}\b|\bav\d+\b)/i, // B站
      /(快手.*快手|v\.kuaishou\.com|kuaishou\.com)/, // 快手
      /(xiaohongshu\.com|xhslink\.com)/ // 小红书
    ]

    return patterns.some(pattern => pattern.test(qrContent))
  }
}
