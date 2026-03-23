import { embedWatermarkToPngBytes, extractWatermarkFromPngBytes } from '@ikenxuan/watermark'
import { logger } from 'node-karin'

/**
 * 将隐水印嵌入到 PNG 图片中
 * 
 * @param pngBytes - PNG 图片的 Buffer 或 Uint8Array
 * @param watermarkText - 要嵌入的水印文本
 * @returns 嵌入水印后的 PNG Buffer，失败返回 null
 */
export const embedWatermark = (
  pngBytes: Buffer | Uint8Array,
  watermarkText: string
): Buffer | null => {
  // const start = Date.now()
  try {
    const input = pngBytes instanceof Buffer ? pngBytes : Buffer.from(pngBytes)
    const result = embedWatermarkToPngBytes(input, watermarkText)
    // logger.info(`嵌入隐水印耗时: ${Date.now() - start}ms`)
    return result
  } catch (error) {
    logger.error('嵌入隐水印失败:', error)
    return null
  }
}

/**
 * 从 PNG 图片中提取隐水印文本
 * 
 * @param pngBytes - PNG 图片的 Buffer 或 Uint8Array
 * @returns 提取出的水印文本，失败返回 null
 */
export const extractWatermark = (
  pngBytes: Buffer | Uint8Array
): string | null => {
  try {
    const input = pngBytes instanceof Buffer ? pngBytes : Buffer.from(pngBytes)
    const result = extractWatermarkFromPngBytes(input)
    return result
  } catch (error) {
    logger.error('提取隐水印失败:', error)
    return null
  }
}
