import fs from 'node:fs'
import path from 'node:path'

import { logger } from 'node-karin'
import type { AxiosInstance } from 'node-karin/axios'

import { Config } from '../Config'
import { sanitizeFilename } from './helpers'

/**
 * 图片下载结果
 */
export interface ImageDownloadResult {
  /**
   * 本地文件路径（使用 file:// 协议）
   */
  filePath: string
  /**
   * 是否需要自动删除
   */
  shouldDelete: boolean
}

/**
 * 图片下载管理器
 * 根据配置决定是否本地下载图片，并管理临时文件的生命周期
 */
export class ImageDownloader {
  private axiosInstance: AxiosInstance
  private tempDir: string

  /**
   * 创建图片下载管理器实例
   * @param axiosInstance - Axios 实例
   * @param tempDir - 临时文件目录
   */
  constructor(axiosInstance: AxiosInstance, tempDir: string) {
    this.axiosInstance = axiosInstance
    this.tempDir = tempDir

    // 确保临时目录存在
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true })
    }
  }

  /**
   * 处理图片 URL，根据配置决定是否下载
   * @param imageUrl - 图片 URL
   * @param title - 作品标题（用于文件命名）
   * @param index - 图片索引（用于多图场景）
   * @returns 处理后的图片路径或原始 URL
   */
  async processImage(
    imageUrl: string,
    title?: string,
    index?: number
  ): Promise<string> {
    // 如果未启用本地下载，直接返回原始 URL
    if (!Config.app.downloadImageLocally) {
      return imageUrl
    }

    try {
      const result = await this.downloadImage(imageUrl, title, index)
      
      // 如果需要自动删除，设置延迟删除任务
      if (result.shouldDelete) {
        this.scheduleDelete(result.filePath)
      }

      return result.filePath
    } catch (error) {
      logger.error(`图片下载失败，回退到原始 URL: ${imageUrl}`, error)
      return imageUrl
    }
  }

  /**
   * 下载图片到本地
   * @param imageUrl - 图片 URL
   * @param title - 作品标题
   * @param index - 图片索引
   * @returns 下载结果
   */
  private async downloadImage(
    imageUrl: string,
    title?: string,
    index?: number
  ): Promise<ImageDownloadResult> {
    // 生成文件名
    const filename = this.generateFilename(imageUrl, title, index)
    const filePath = path.join(this.tempDir, filename)

    // 下载图片
    const response = await this.axiosInstance.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000
    })

    // 保存到本地
    fs.writeFileSync(filePath, response.data)

    logger.debug(`图片已下载: ${filePath}`)

    return {
      filePath: `file://${filePath}`,
      shouldDelete: true
    }
  }

  /**
   * 生成文件名
   * @param imageUrl - 图片 URL
   * @param title - 作品标题
   * @param index - 图片索引
   * @returns 文件名
   */
  private generateFilename(
    imageUrl: string,
    title?: string,
    index?: number
  ): string {
    // 获取文件扩展名
    const ext = this.getExtension(imageUrl)
    
    // 根据 removeCache 配置决定文件名
    if (Config.app.removeCache) {
      // 使用时间戳
      const timestamp = Date.now()
      const indexSuffix = index !== undefined ? `_${index}` : ''
      return `tmp_${timestamp}${indexSuffix}${ext}`
    } else {
      // 使用作品标题
      const safeTitle = title ? sanitizeFilename(title) : `image_${Date.now()}`
      const indexSuffix = index !== undefined ? `_${index}` : ''
      return `${safeTitle}${indexSuffix}${ext}`
    }
  }

  /**
   * 从 URL 中提取文件扩展名
   * @param url - 图片 URL
   * @returns 文件扩展名（包含点号）
   */
  private getExtension(url: string): string {
    try {
      const urlObj = new URL(url)
      const pathname = urlObj.pathname
      const ext = path.extname(pathname)
      
      // 如果有扩展名且是常见图片格式，使用它
      if (ext && /^\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(ext)) {
        return ext
      }
    } catch {
      // URL 解析失败，继续使用默认扩展名
    }
    
    // 默认使用 .jpg
    return '.jpg'
  }

  /**
   * 安排文件删除任务
   * @param filePath - 文件路径（file:// 协议）
   */
  private scheduleDelete(filePath: string): void {
    // 移除 file:// 协议前缀
    const actualPath = filePath.replace(/^file:\/\//, '')
    
    // 10 分钟后删除文件
    setTimeout(() => {
      this.deleteFile(actualPath)
    }, 10 * 60 * 1000)
  }

  /**
   * 删除文件
   * @param filePath - 文件路径
   */
  private deleteFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        logger.debug(`临时图片已删除: ${filePath}`)
      }
    } catch (error) {
      logger.error(`删除临时图片失败: ${filePath}`, error)
    }
  }

  /**
   * 批量处理图片
   * @param imageUrls - 图片 URL 数组
   * @param title - 作品标题
   * @returns 处理后的图片路径数组
   */
  async processImages(
    imageUrls: string[],
    title?: string
  ): Promise<string[]> {
    const results = await Promise.all(
      imageUrls.map((url, index) => this.processImage(url, title, index))
    )
    return results
  }
}
