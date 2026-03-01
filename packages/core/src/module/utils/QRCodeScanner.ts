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
   * 二值化处理（用于提高小二维码识别率）
   * @param imageData 图片数据
   * @param threshold 阈值（0-255），默认自动计算
   * @returns 二值化后的图片数据
   */
  private static binarize(
    imageData: { width: number; height: number; data: Uint8ClampedArray },
    threshold?: number
  ): { width: number; height: number; data: Uint8ClampedArray } {
    const { width, height, data } = imageData
    const newData = new Uint8ClampedArray(data.length)

    // 如果没有指定阈值，使用 Otsu 方法自动计算
    if (threshold === undefined) {
      // 计算灰度直方图
      const histogram = new Array(256).fill(0)
      for (let i = 0; i < data.length; i += 4) {
        const gray = Math.floor(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
        histogram[gray]++
      }

      // Otsu 方法计算最佳阈值
      const total = width * height
      let sum = 0
      for (let i = 0; i < 256; i++) {
        sum += i * histogram[i]
      }

      let sumB = 0
      let wB = 0
      let wF = 0
      let maxVariance = 0
      threshold = 0

      for (let t = 0; t < 256; t++) {
        wB += histogram[t]
        if (wB === 0) continue

        wF = total - wB
        if (wF === 0) break

        sumB += t * histogram[t]
        const mB = sumB / wB
        const mF = (sum - sumB) / wF
        const variance = wB * wF * (mB - mF) * (mB - mF)

        if (variance > maxVariance) {
          maxVariance = variance
          threshold = t
        }
      }
    }

    // 应用阈值
    for (let i = 0; i < data.length; i += 4) {
      const gray = Math.floor(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])
      const binary = gray > threshold ? 255 : 0
      
      newData[i] = binary // R
      newData[i + 1] = binary // G
      newData[i + 2] = binary // B
      newData[i + 3] = data[i + 3] // A
    }

    return { width, height, data: newData }
  }

  /**
   * 锐化处理（增强边缘）
   * @param imageData 图片数据
   * @returns 锐化后的图片数据
   */
  private static sharpen(
    imageData: { width: number; height: number; data: Uint8ClampedArray }
  ): { width: number; height: number; data: Uint8ClampedArray } {
    const { width, height, data } = imageData
    const newData = new Uint8ClampedArray(data.length)

    // 锐化卷积核
    const kernel = [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ]

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let r = 0, g = 0, b = 0

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4
            const k = kernel[(ky + 1) * 3 + (kx + 1)]
            r += data[idx] * k
            g += data[idx + 1] * k
            b += data[idx + 2] * k
          }
        }

        const idx = (y * width + x) * 4
        newData[idx] = Math.max(0, Math.min(255, r))
        newData[idx + 1] = Math.max(0, Math.min(255, g))
        newData[idx + 2] = Math.max(0, Math.min(255, b))
        newData[idx + 3] = data[idx + 3]
      }
    }

    // 复制边缘像素
    for (let x = 0; x < width; x++) {
      const topIdx = x * 4
      const bottomIdx = ((height - 1) * width + x) * 4
      for (let c = 0; c < 4; c++) {
        newData[topIdx + c] = data[topIdx + c]
        newData[bottomIdx + c] = data[bottomIdx + c]
      }
    }
    for (let y = 0; y < height; y++) {
      const leftIdx = y * width * 4
      const rightIdx = (y * width + width - 1) * 4
      for (let c = 0; c < 4; c++) {
        newData[leftIdx + c] = data[leftIdx + c]
        newData[rightIdx + c] = data[rightIdx + c]
      }
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
      { name: '默认', enhance: false, binarize: false, sharpen: false, options: undefined },
      { name: '二值化', enhance: false, binarize: true, sharpen: false, options: undefined },
      { name: '锐化', enhance: false, binarize: false, sharpen: true, options: undefined },
      { name: '增强对比度', enhance: true, binarize: false, sharpen: false, options: undefined },
      { name: '增强+二值化', enhance: true, binarize: true, sharpen: false, options: undefined },
      { name: '锐化+二值化', enhance: false, binarize: true, sharpen: true, options: undefined },
      { name: 'attemptBoth', enhance: false, binarize: false, sharpen: false, options: { inversionAttempts: 'attemptBoth' as const } },
      { name: '二值化+attemptBoth', enhance: false, binarize: true, sharpen: false, options: { inversionAttempts: 'attemptBoth' as const } }
    ]

    for (const strategy of strategies) {
      try {
        logger.debug(`  尝试策略: ${strategy.name}`)
        let processedData = imageData
        
        // 应用预处理
        if (strategy.sharpen) {
          processedData = this.sharpen(processedData)
        }
        if (strategy.enhance) {
          processedData = this.enhanceContrast(processedData)
        }
        if (strategy.binarize) {
          processedData = this.binarize(processedData)
        }
        
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

      // 多种块大小 - 用于识别不同尺寸的二维码
      const smallBlock = Math.min(400, Math.floor(Math.min(width, height) * 0.3)) // 小块，用于小二维码
      const mediumBlock = Math.min(600, Math.floor(Math.min(width, height) * 0.5)) // 中块
      const largeBlock = Math.min(800, Math.floor(Math.max(width, height) * 0.6)) // 大块

      // 1. 四个角 - 使用小块优先扫描（二维码最常出现的位置，且通常较小）
      logger.debug('添加四角小块扫描区域（优先）')
      // 左上角 - 小块
      scanRegions.push({ 
        name: '左上角-小', 
        x: 0, 
        y: 0, 
        w: Math.min(smallBlock, width), 
        h: Math.min(smallBlock, height) 
      })
      // 右上角 - 小块（紧贴右边缘）
      scanRegions.push({ 
        name: '右上角-小', 
        x: Math.max(0, width - smallBlock), 
        y: 0, 
        w: Math.min(smallBlock, width), 
        h: Math.min(smallBlock, height) 
      })
      // 左下角 - 小块
      scanRegions.push({ 
        name: '左下角-小', 
        x: 0, 
        y: Math.max(0, height - smallBlock), 
        w: Math.min(smallBlock, width), 
        h: Math.min(smallBlock, height) 
      })
      // 右下角 - 小块
      scanRegions.push({ 
        name: '右下角-小', 
        x: Math.max(0, width - smallBlock), 
        y: Math.max(0, height - smallBlock), 
        w: Math.min(smallBlock, width), 
        h: Math.min(smallBlock, height) 
      })

      // 2. 四个角 - 中等块
      logger.debug('添加四角中块扫描区域')
      scanRegions.push({ 
        name: '左上角-中', 
        x: 0, 
        y: 0, 
        w: Math.min(mediumBlock, width), 
        h: Math.min(mediumBlock, height) 
      })
      scanRegions.push({ 
        name: '右上角-中', 
        x: Math.max(0, width - mediumBlock), 
        y: 0, 
        w: Math.min(mediumBlock, width), 
        h: Math.min(mediumBlock, height) 
      })
      scanRegions.push({ 
        name: '左下角-中', 
        x: 0, 
        y: Math.max(0, height - mediumBlock), 
        w: Math.min(mediumBlock, width), 
        h: Math.min(mediumBlock, height) 
      })
      scanRegions.push({ 
        name: '右下角-中', 
        x: Math.max(0, width - mediumBlock), 
        y: Math.max(0, height - mediumBlock), 
        w: Math.min(mediumBlock, width), 
        h: Math.min(mediumBlock, height) 
      })

      // 3. 四个角 - 大块（作为后备）
      logger.debug('添加四角大块扫描区域')
      const blockW = Math.min(largeBlock, width)
      const blockH = Math.min(largeBlock, height)
      
      scanRegions.push({ 
        name: '左上角-大', 
        x: 0, 
        y: 0, 
        w: blockW, 
        h: blockH 
      })
      scanRegions.push({ 
        name: '右上角-大', 
        x: Math.max(0, width - blockW), 
        y: 0, 
        w: blockW, 
        h: blockH 
      })
      scanRegions.push({ 
        name: '左下角-大', 
        x: 0, 
        y: Math.max(0, height - blockH), 
        w: blockW, 
        h: blockH 
      })
      scanRegions.push({ 
        name: '右下角-大', 
        x: Math.max(0, width - blockW), 
        y: Math.max(0, height - blockH), 
        w: blockW, 
        h: blockH 
      })

      // 4. 顶部和底部中间
      if (width > mediumBlock * 1.5) {
        logger.debug('添加顶部/底部中间扫描区域')
        scanRegions.push({ 
          name: '顶部中-小', 
          x: Math.floor((width - smallBlock) / 2), 
          y: 0, 
          w: Math.min(smallBlock, width), 
          h: Math.min(smallBlock, height) 
        })
        if (height > mediumBlock * 1.5) {
          scanRegions.push({ 
            name: '底部中-小', 
            x: Math.floor((width - smallBlock) / 2), 
            y: Math.max(0, height - smallBlock), 
            w: Math.min(smallBlock, width), 
            h: Math.min(smallBlock, height) 
          })
        }
      }

      // 5. 左右中间
      if (height > mediumBlock * 1.5) {
        logger.debug('添加左右中间扫描区域')
        const middleY = Math.floor((height - smallBlock) / 2)
        scanRegions.push({ 
          name: '左中-小', 
          x: 0, 
          y: middleY, 
          w: Math.min(smallBlock, width), 
          h: Math.min(smallBlock, height) 
        })
        if (width > mediumBlock * 1.5) {
          scanRegions.push({ 
            name: '右中-小', 
            x: Math.max(0, width - smallBlock), 
            y: middleY, 
            w: Math.min(smallBlock, width), 
            h: Math.min(smallBlock, height) 
          })
        }
      }

      // 6. 中心区域
      if (width > mediumBlock && height > mediumBlock) {
        logger.debug('添加中心区域')
        scanRegions.push({ 
          name: '中心-小', 
          x: Math.floor((width - smallBlock) / 2), 
          y: Math.floor((height - smallBlock) / 2), 
          w: Math.min(smallBlock, width), 
          h: Math.min(smallBlock, height) 
        })
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
