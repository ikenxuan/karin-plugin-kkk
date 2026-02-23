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
   * 提取图片的一个区域
   * @param imageData 原始图片数据
   * @param x 起始 x 坐标
   * @param y 起始 y 坐标
   * @param width 区域宽度
   * @param height 区域高度
   * @returns 区域图片数据
   */
  private static extractRegion(
    imageData: { width: number; height: number; data: Uint8ClampedArray },
    x: number,
    y: number,
    width: number,
    height: number
  ): { width: number; height: number; data: Uint8ClampedArray } {
    const newData = new Uint8ClampedArray(width * height * 4)

    for (let dy = 0; dy < height; dy++) {
      for (let dx = 0; dx < width; dx++) {
        const srcX = x + dx
        const srcY = y + dy
        
        // 边界检查
        if (srcX >= imageData.width || srcY >= imageData.height) {
          continue
        }

        const srcIndex = (srcY * imageData.width + srcX) * 4
        const dstIndex = (dy * width + dx) * 4

        newData[dstIndex] = imageData.data[srcIndex] // R
        newData[dstIndex + 1] = imageData.data[srcIndex + 1] // G
        newData[dstIndex + 2] = imageData.data[srcIndex + 2] // B
        newData[dstIndex + 3] = imageData.data[srcIndex + 3] // A
      }
    }

    return { width, height, data: newData }
  }

  /**
   * 增强图片对比度（用于提高二维码识别率）
   * @param imageData 图片数据
   * @returns 增强后的图片数据
   */
  private static enhanceContrast(
    imageData: { width: number; height: number; data: Uint8ClampedArray }
  ): { width: number; height: number; data: Uint8ClampedArray } {
    const { width, height, data } = imageData
    const newData = new Uint8ClampedArray(data.length)

    // 计算灰度直方图
    const histogram = new Array(256).fill(0)
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.floor(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
      histogram[gray]++
    }

    // 计算累积分布函数
    const cdf = new Array(256).fill(0)
    cdf[0] = histogram[0]
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + histogram[i]
    }

    // 归一化
    const totalPixels = width * height
    const cdfMin = cdf.find(v => v > 0) || 0
    
    // 直方图均衡化
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.floor(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
      const newGray = Math.floor(((cdf[gray] - cdfMin) / (totalPixels - cdfMin)) * 255)
      
      newData[i] = newGray // R
      newData[i + 1] = newGray // G
      newData[i + 2] = newGray // B
      newData[i + 3] = data[i + 3] // A
    }

    return { width, height, data: newData }
  }

  /**
   * 在图片区域中尝试识别二维码
   * @param imageData 图片数据
   * @param regionName 区域名称（用于日志）
   * @returns 二维码内容或 null
   */
  private static tryRecognizeInRegion(
    imageData: { width: number; height: number; data: Uint8ClampedArray },
    regionName: string
  ): string | null {
    const strategies = [
      { name: '默认', enhance: false, options: undefined },
      { name: '增强对比度', enhance: true, options: undefined },
      { name: 'attemptBoth', enhance: false, options: { inversionAttempts: 'attemptBoth' as const } },
      { name: '增强+attemptBoth', enhance: true, options: { inversionAttempts: 'attemptBoth' as const } }
    ]

    for (const strategy of strategies) {
      try {
        logger.debug(`  尝试策略: ${strategy.name}`)
        const processedData = strategy.enhance ? this.enhanceContrast(imageData) : imageData
        const code = jsQR(processedData.data, processedData.width, processedData.height, strategy.options)
        
        if (code && code.data) {
          logger.mark(`✓ 成功识别二维码 [区域: ${regionName}] [策略: ${strategy.name}]`)
          logger.mark(`  二维码内容: ${code.data}`)
          return code.data
        } else {
          logger.debug(`  策略 ${strategy.name} 未识别到二维码`)
        }
      } catch (err) {
        logger.debug(`  策略 ${strategy.name} 执行失败: ${err}`)
      }
    }

    logger.debug(`  区域 ${regionName} 识别失败，尝试下一个区域`)
    return null
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
        logger.mark(`图片解析成功: ${png.width}x${png.height}, 数据大小: ${(png.data.length / 1024 / 1024).toFixed(2)}MB`)
      } catch (err) {
        logger.warn('图片格式不支持，目前仅支持 PNG 格式的二维码识别', err)
        return null
      }

      const { width, height } = imageData

      // 策略1: 如果图片不是特别大，直接全图识别
      if (width <= 2048 && height <= 2048) {
        logger.debug('图片尺寸适中，使用全图识别策略')
        const result = this.tryRecognizeInRegion(imageData, '全图')
        if (result) return result
      }

      // 策略2: 对于超长图片，分块扫描
      logger.mark(`图片尺寸较大 (${width}x${height})，使用分块扫描策略`)
      
      // 定义扫描区域（优先扫描常见的二维码位置）
      const scanRegions: Array<{ name: string; x: number; y: number; w: number; h: number }> = []

      // 块大小
      const blockSize = 1024

      // 1. 顶部区域（二维码常在顶部）
      logger.debug('添加顶部扫描区域')
      scanRegions.push({ name: '顶部左', x: 0, y: 0, w: Math.min(blockSize, width), h: Math.min(blockSize, height) })
      if (width > blockSize) {
        scanRegions.push({ name: '顶部右', x: width - blockSize, y: 0, w: blockSize, h: Math.min(blockSize, height) })
      }
      if (width > blockSize * 2) {
        scanRegions.push({ name: '顶部中', x: Math.floor((width - blockSize) / 2), y: 0, w: blockSize, h: Math.min(blockSize, height) })
      }

      // 2. 底部区域
      if (height > blockSize) {
        logger.debug('添加底部扫描区域')
        scanRegions.push({ name: '底部左', x: 0, y: height - blockSize, w: Math.min(blockSize, width), h: blockSize })
        if (width > blockSize) {
          scanRegions.push({ name: '底部右', x: width - blockSize, y: height - blockSize, w: blockSize, h: blockSize })
        }
      }

      // 3. 中间区域（如果图片很长）
      if (height > blockSize * 2) {
        logger.debug('添加中部扫描区域')
        const middleY = Math.floor((height - blockSize) / 2)
        scanRegions.push({ name: '中部左', x: 0, y: middleY, w: Math.min(blockSize, width), h: blockSize })
        if (width > blockSize) {
          scanRegions.push({ name: '中部右', x: width - blockSize, y: middleY, w: blockSize, h: blockSize })
        }
      }

      // 4. 滑动窗口扫描（如果前面都没找到）
      logger.debug('添加滑动窗口扫描区域')
      const step = Math.floor(blockSize / 2)
      let slidingWindowCount = 0
      for (let y = 0; y < height - blockSize; y += step) {
        scanRegions.push({ 
          name: `滑动窗口-${Math.floor(y / step)}`, 
          x: 0, 
          y, 
          w: Math.min(blockSize, width), 
          h: blockSize 
        })
        slidingWindowCount++
        
        // 限制扫描区域数量，避免太慢
        if (scanRegions.length > 30) {
          logger.debug(`滑动窗口数量达到上限，停止添加 (已添加 ${slidingWindowCount} 个)`)
          break
        }
      }

      logger.mark(`共生成 ${scanRegions.length} 个扫描区域，开始逐个扫描`)

      // 扫描所有区域
      for (let i = 0; i < scanRegions.length; i++) {
        const region = scanRegions[i]
        logger.debug(`[${i + 1}/${scanRegions.length}] 扫描区域: ${region.name} (位置: ${region.x},${region.y}, 尺寸: ${region.w}x${region.h})`)
        
        const regionData = this.extractRegion(imageData, region.x, region.y, region.w, region.h)
        const result = this.tryRecognizeInRegion(regionData, region.name)
        
        if (result) {
          logger.mark(`二维码识别完成，共扫描了 ${i + 1}/${scanRegions.length} 个区域`)
          return result
        }
      }

      logger.warn(`图片中未识别到二维码，已扫描所有 ${scanRegions.length} 个区域`)
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
