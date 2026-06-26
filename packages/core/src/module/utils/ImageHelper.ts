import fs from 'node:fs'

import { logger } from 'node-karin'
import axios from 'node-karin/axios'

import { Common } from './Common'
import { Config } from './Config'
import { ImageDownloader } from './Network'

/**
 * 全局图片下载器实例
 */
let imageDownloader: ImageDownloader | null = null

/**
 * 获取图片下载器实例
 * @returns 图片下载器实例
 */
export function getImageDownloader(): ImageDownloader {
  if (!imageDownloader) {
    const axiosInstance = axios.create({
      timeout: 30000,
      maxRedirects: 5
    })
    imageDownloader = new ImageDownloader(axiosInstance, Common.tempDri.images)
  }
  return imageDownloader
}

/**
 * 处理图片 URL，根据配置决定是否本地下载
 * 这是一个便捷函数，用于快速处理单个图片
 *
 * @param imageUrl - 图片 URL
 * @param title - 作品标题（用于文件命名）
 * @param index - 图片索引（用于多图场景）
 * @returns 处理后的图片路径（可能是 file:// 协议或原始 HTTP URL）
 *
 * @example
 * ```ts
 * // 单张图片
 * const imagePath = await processImageUrl('https://example.com/image.jpg', '作品标题')
 * await e.reply(segment.image(imagePath))
 *
 * // 多张图片
 * const imagePaths = await Promise.all(
 *   imageUrls.map((url, i) => processImageUrl(url, '作品标题', i))
 * )
 * ```
 */
export async function processImageUrl(imageUrl: string, title?: string, index?: number): Promise<string> {
  const downloader = getImageDownloader()
  return await downloader.processImage(imageUrl, title, index)
}

/**
 * 批量处理图片 URL
 *
 * @param imageUrls - 图片 URL 数组
 * @param title - 作品标题（用于文件命名）
 * @returns 处理后的图片路径数组
 *
 * @example
 * ```ts
 * const imagePaths = await processImageUrls(imageUrls, '作品标题')
 * const imageElements = imagePaths.map(path => segment.image(path))
 * ```
 */
export async function processImageUrls(imageUrls: string[], title?: string): Promise<string[]> {
  const downloader = getImageDownloader()
  return await downloader.processImages(imageUrls, title)
}

/**
 * 处理本地生成的图片文件。
 *
 * imageSendMode 的 url 只适用于已有 HTTP 图片；本地合成图没有可直接发送的公网 URL，
 * 因此在 url 模式下回退到 base64，避免依赖 file 协议。
 */
export function processLocalImageFile(filePath: string): string {
  const normalizedPath = filePath.replace(/\\/g, '/')
  if (Config.app.imageSendMode !== 'file') {
    if (Config.app.imageSendMode === 'url') {
      logger.debug(`本地生成图片不支持 imageSendMode=url，已回退到 base64 发送: ${normalizedPath}`)
    }
    return `base64://${fs.readFileSync(normalizedPath).toString('base64')}`
  }

  return `file://${normalizedPath}`
}
