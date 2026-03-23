import { embedWatermarkToPngBytes, extractWatermarkFromPngBytes } from '@ikenxuan/watermark'
import { logger } from 'node-karin'


/**
 * 使用 exiftool 写入图片详细信息
 *
 * @param pngBuffer - PNG 图片二进制数据
 * @returns 写入后的 PNG Buffer
 */
// const writeMetadataWithExiftool = async (pngBuffer: Buffer): Promise<Buffer> => {
//   const tempDirectory = path.join(process.cwd(), 'temp', 'wm')
//   await fs.mkdir(tempDirectory, { recursive: true })
//   const fileId = randomUUID()
//   const inputPath = path.join(tempDirectory, `${fileId}.png`)

//   try {
//     await fs.writeFile(inputPath, pngBuffer)
//     await exiftool.write(
//       inputPath,
//       {
//         Creator: Root.pkg.author,
//         Copyright: Root.pkg.license,
//         CreatorTool: `${Root.pluginName} v${Root.pluginVersion}`,
//         CreateDate: format(new Date(Date.now()), 'yyyy:MM:dd HH:mm')
//       }, 
//       { writeArgs: ['-overwrite_original'] }
//     )
//     return await fs.readFile(inputPath)
//   } finally {
//     await fs.rm(inputPath, { force: true })
//   }
// }

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
    const resultBuffer = result instanceof Buffer ? result : Buffer.from(result)
    return resultBuffer
    // logger.info(`嵌入隐水印耗时: ${Date.now() - start}ms`)
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
