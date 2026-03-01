import decode from 'heic-decode'
import jpeg from 'jpeg-js'
import jsQR from 'jsqr'
import { logger } from 'node-karin'
import axios from 'node-karin/axios'
import { PNG } from 'pngjs'

/**
 * 二维码扫描工具类
 * 
 * 使用纯 JavaScript 实现，无需任何 native 模块依赖
 * 
 * 支持的图片格式：
 * - PNG (使用 pngjs)
 * - JPEG/JPG (使用 jpeg-js)
 * - HEIC/HEIF (使用 heic-decode，基于 WASM)
 * 
 * 注意：所有图片解码库均为纯 JavaScript/WASM 实现，
 * 不依赖任何 native 模块，可在任何平台上运行
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
      return this.scanFromBuffer(buffer)
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
          logger.debug(`✓ 成功识别二维码 [区域: ${regionName}] [策略: ${strategy.name}]`)
          logger.debug(`  二维码内容: ${code.data}`)
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
   * 检测图片格式
   * @param buffer 图片 Buffer
   * @returns 图片格式或 null
   */
  private static detectImageFormat(buffer: Buffer): string | null {
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (buffer.length >= 8 && 
        buffer[0] === 0x89 && buffer[1] === 0x50 && 
        buffer[2] === 0x4E && buffer[3] === 0x47) {
      return 'png'
    }
    
    // JPEG: FF D8 FF
    if (buffer.length >= 3 && 
        buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
      return 'jpeg'
    }
    
    // HEIC/HEIF: ftyp box at offset 4
    if (buffer.length >= 12) {
      const ftyp = buffer.toString('ascii', 4, 8)
      if (ftyp === 'ftyp') {
        const brand = buffer.toString('ascii', 8, 12)
        if (brand === 'heic' || brand === 'heix' || brand === 'hevc' || 
            brand === 'hevx' || brand === 'mif1' || brand === 'msf1') {
          return 'heic'
        }
      }
    }
    
    // GIF: 47 49 46 38
    if (buffer.length >= 6 && 
        buffer[0] === 0x47 && buffer[1] === 0x49 && 
        buffer[2] === 0x46 && buffer[3] === 0x38) {
      return 'gif'
    }
    
    // BMP: 42 4D
    if (buffer.length >= 2 && 
        buffer[0] === 0x42 && buffer[1] === 0x4D) {
      return 'bmp'
    }
    
    // WebP: RIFF....WEBP
    if (buffer.length >= 12 && 
        buffer[0] === 0x52 && buffer[1] === 0x49 && 
        buffer[2] === 0x46 && buffer[3] === 0x46 &&
        buffer[8] === 0x57 && buffer[9] === 0x45 && 
        buffer[10] === 0x42 && buffer[11] === 0x50) {
      return 'webp'
    }
    
    return null
  }

  /**
   * 解析 PNG 图片
   * @param buffer 图片 Buffer
   * @returns 图片数据或 null
   */
  private static parsePNG(buffer: Buffer): { width: number; height: number; data: Uint8ClampedArray } | null {
    try {
      const png = PNG.sync.read(buffer)
      logger.debug(`PNG 解析成功: ${png.width}x${png.height}`)
      return {
        width: png.width,
        height: png.height,
        data: Uint8ClampedArray.from(png.data)
      }
    } catch (err) {
      logger.warn('PNG 解析失败:', err)
      return null
    }
  }

  /**
   * 解析 JPEG 图片
   * @param buffer 图片 Buffer
   * @returns 图片数据或 null
   */
  private static parseJPEG(buffer: Buffer): { width: number; height: number; data: Uint8ClampedArray } | null {
    try {
      const decoded = jpeg.decode(buffer, { useTArray: true })
      logger.debug(`JPEG 解析成功: ${decoded.width}x${decoded.height}`)
      return {
        width: decoded.width,
        height: decoded.height,
        data: Uint8ClampedArray.from(decoded.data)
      }
    } catch (err) {
      logger.warn('JPEG 解析失败:', err)
      return null
    }
  }

  /**
   * 解析 HEIC/HEIF 图片
   * @param buffer 图片 Buffer
   * @returns 图片数据或 null
   */
  private static async parseHEIC(buffer: Buffer): Promise<{ width: number; height: number; data: Uint8ClampedArray } | null> {
    try {
      const decoded = await decode({ buffer })
      logger.debug(`HEIC 解析成功: ${decoded.width}x${decoded.height}`)
      return {
        width: decoded.width,
        height: decoded.height,
        data: Uint8ClampedArray.from(decoded.data)
      }
    } catch (err) {
      logger.warn('HEIC 解析失败:', err)
      return null
    }
  }

  /**
   * 解析图片 Buffer 为像素数据
   * @param buffer 图片 Buffer
   * @returns 图片数据或 null
   */
  private static async parseImageBuffer(
    buffer: Buffer
  ): Promise<{ width: number; height: number; data: Uint8ClampedArray } | null> {
    try {
      const format = this.detectImageFormat(buffer)
      logger.debug(`检测到图片格式: ${format || '未知'}`)
      
      if (!format) {
        logger.warn('无法识别图片格式')
        return null
      }

      switch (format) {
        case 'png':
          return this.parsePNG(buffer)
        case 'jpeg':
          return this.parseJPEG(buffer)
        case 'heic':
          return await this.parseHEIC(buffer)
        default:
          logger.warn(`不支持的图片格式: ${format}`)
          return null
      }
    } catch (err) {
      logger.warn('图片解析失败:', err)
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
      // 解析图片
      const imageData = await this.parseImageBuffer(buffer)
      if (!imageData) {
        return null
      }

      const { width, height } = imageData
      const dataSizeMB = (width * height * 4 / 1024 / 1024).toFixed(2)
      logger.debug(`图片数据: ${width}x${height}, 内存占用: ${dataSizeMB}MB`)

      // 策略1: 优先尝试全图识别（仅对小图片）
      if (width <= 1024 && height <= 1024) {
        logger.debug('图片尺寸较小，使用全图识别策略')
        const result = this.tryRecognizeInRegion(imageData, '全图')
        if (result) return result
      }

      // 策略2: 分块扫描（适用于所有图片）
      logger.debug(`使用分块扫描策略 (${width}x${height})`)
      
      // 定义扫描区域（优先扫描常见的二维码位置）
      const scanRegions: Array<{ name: string; x: number; y: number; w: number; h: number }> = []

      // 块大小 - 动态调整
      const blockSize = Math.min(800, Math.floor(Math.max(width, height) * 0.6))
      const blockW = Math.min(blockSize, width)
      const blockH = Math.min(blockSize, height)

      // 1. 四个角（二维码最常出现的位置）
      logger.debug('添加四角扫描区域')
      // 左上角
      scanRegions.push({ 
        name: '左上角', 
        x: 0, 
        y: 0, 
        w: blockW, 
        h: blockH 
      })
      // 右上角
      scanRegions.push({ 
        name: '右上角', 
        x: Math.max(0, width - blockW), 
        y: 0, 
        w: blockW, 
        h: blockH 
      })
      // 左下角
      scanRegions.push({ 
        name: '左下角', 
        x: 0, 
        y: Math.max(0, height - blockH), 
        w: blockW, 
        h: blockH 
      })
      // 右下角
      scanRegions.push({ 
        name: '右下角', 
        x: Math.max(0, width - blockW), 
        y: Math.max(0, height - blockH), 
        w: blockW, 
        h: blockH 
      })

      // 2. 顶部和底部中间
      if (width > blockW * 1.5) {
        logger.debug('添加顶部/底部中间扫描区域')
        scanRegions.push({ 
          name: '顶部中', 
          x: Math.floor((width - blockW) / 2), 
          y: 0, 
          w: blockW, 
          h: blockH 
        })
        if (height > blockH * 1.5) {
          scanRegions.push({ 
            name: '底部中', 
            x: Math.floor((width - blockW) / 2), 
            y: Math.max(0, height - blockH), 
            w: blockW, 
            h: blockH 
          })
        }
      }

      // 3. 左右中间
      if (height > blockH * 1.5) {
        logger.debug('添加左右中间扫描区域')
        const middleY = Math.floor((height - blockH) / 2)
        scanRegions.push({ 
          name: '左中', 
          x: 0, 
          y: middleY, 
          w: blockW, 
          h: blockH 
        })
        if (width > blockW * 1.5) {
          scanRegions.push({ 
            name: '右中', 
            x: Math.max(0, width - blockW), 
            y: middleY, 
            w: blockW, 
            h: blockH 
          })
        }
      }

      // 4. 中心区域
      if (width > blockW && height > blockH) {
        logger.debug('添加中心区域')
        scanRegions.push({ 
          name: '中心', 
          x: Math.floor((width - blockW) / 2), 
          y: Math.floor((height - blockH) / 2), 
          w: blockW, 
          h: blockH 
        })
      }

      // 5. 滑动窗口扫描（如果前面都没找到）
      logger.debug('添加滑动窗口扫描区域')
      const step = Math.floor(blockSize * 0.6)
      let slidingWindowCount = 0
      
      // 垂直和水平滑动
      for (let y = 0; y <= height - blockH; y += step) {
        for (let x = 0; x <= width - blockW; x += step) {
          scanRegions.push({ 
            name: `滑动-${slidingWindowCount}`, 
            x, 
            y, 
            w: blockW, 
            h: blockH 
          })
          slidingWindowCount++
          
          // 限制扫描区域数量
          if (scanRegions.length > 40) {
            logger.debug(`滑动窗口数量达到上限，停止添加 (已添加 ${slidingWindowCount} 个)`)
            break
          }
        }
        if (scanRegions.length > 40) break
      }

      logger.debug(`共生成 ${scanRegions.length} 个扫描区域，开始逐个扫描`)

      // 扫描所有区域
      for (let i = 0; i < scanRegions.length; i++) {
        const region = scanRegions[i]
        logger.debug(`[${i + 1}/${scanRegions.length}] 扫描区域: ${region.name} (位置: ${region.x},${region.y}, 尺寸: ${region.w}x${region.h})`)
        
        const regionData = this.extractRegion(imageData, region.x, region.y, region.w, region.h)
        const result = this.tryRecognizeInRegion(regionData, region.name)
        
        if (result) {
          logger.debug(`二维码识别完成，共扫描了 ${i + 1}/${scanRegions.length} 个区域`)
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
