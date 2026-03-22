import { existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { logger } from 'node-karin'

type EmbedWatermarkFn = (pngBytes: Buffer | Uint8Array, watermarkText: string) => Buffer
type ExtractWatermarkFn = (pngBytes: Buffer | Uint8Array) => string

type WatermarkBinding = {
  embedWatermarkToPngBytes?: EmbedWatermarkFn
  extractWatermarkFromPngBytes?: ExtractWatermarkFn
}

let cachedBinding: WatermarkBinding | null = null

const resolveWatermarkEntry = (): string | null => {
  const currentDir = path.dirname(fileURLToPath(import.meta.url))
  const candidates = [
    path.resolve(currentDir, './watermark/index.cjs'),
    path.resolve(currentDir, '../core_chunk/watermark/index.js'),
    path.resolve(currentDir, '../../core_chunk/watermark/index.js'),
    path.resolve(currentDir, '../../watermark/index.js'),
    path.resolve(currentDir, '../../../../watermark/index.js')
  ]
  return candidates.find((item) => existsSync(item)) ?? null
}

const getWatermarkBinding = (): WatermarkBinding => {
  if (cachedBinding) {
    return cachedBinding
  }
  const entry = resolveWatermarkEntry()
  if (!entry) {
    throw new Error('未找到 watermark native 入口文件')
  }
  
  try {
    const require = createRequire(import.meta.url)
    const binding = require(entry) as WatermarkBinding
    cachedBinding = binding
    return binding
  } catch (e) {
    // ESM fallback (when the chunk uses top level import in prod)
    throw new Error(`加载 native 模块失败: ${e}`)
  }
}

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
  try {
    const input = pngBytes instanceof Buffer ? pngBytes : Buffer.from(pngBytes)
    const binding = getWatermarkBinding()
    if (!binding.embedWatermarkToPngBytes) {
      throw new Error('watermark native embed API 不可用')
    }
    return binding.embedWatermarkToPngBytes(input, watermarkText)
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
    const binding = getWatermarkBinding()
    if (!binding.extractWatermarkFromPngBytes) {
      throw new Error('watermark native extract API 不可用')
    }
    const result = binding.extractWatermarkFromPngBytes(input)
    return result
  } catch (error) {
    logger.error('提取隐水印失败:', error)
    return null
  }
}
