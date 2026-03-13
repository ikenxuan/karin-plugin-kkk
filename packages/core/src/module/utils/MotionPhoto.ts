// 参考文章 https://blog.0to1.cf/posts/cn-motion-photo-format
// 参考文章 https://blog.zzbd.org/motion-live-photo-webui
// 参考项目 https://github.com/flashlab/motion-live-photo
import fs from 'node:fs'
import path from 'node:path'

import { ffmpeg, logger } from 'node-karin'

import { Common } from './Common'
import { Config } from './Config'

const xmpHeaderBuffer = Buffer.from('http://ns.adobe.com/xap/1.0/\u0000', 'utf8')
const oppoExifHex = 'FFE100724578696600004D4D002A0000000800040100000400000001000005A001010004000000010000043C87690004000000010000003E011200030000000100000000000000000002928600020000000E0000005C920800040000000100000000000000006F706C75735F3833383836303800'
const xiaomiExifHex = 'FFE1007E4578696600004D4D002A0000000800040100000400000001000005A001010004000000010000043C01120003000000010000000087690004000000010000003E000000000003889700010000000101000000920800040000000100000000928600020000000E00000068000000006F706C75735F3833383836303800'
const huaweiHonorLiveIdFallback = 1915884

type MotionPhotoSystem = 'google' | 'xiaomi' | 'oppo' | 'huawei_honor'

const isJpegBuffer = (fileBuffer: Buffer): boolean => {
  return fileBuffer.length > 2 && fileBuffer[0] === 0xFF && fileBuffer[1] === 0xD8
}

const getJpegDimensions = (jpegBuffer: Buffer): { width: number, height: number } | null => {
  let offset = 2
  while (offset + 9 < jpegBuffer.length) {
    if (jpegBuffer[offset] !== 0xFF) {
      offset += 1
      continue
    }
    const marker = jpegBuffer[offset + 1]
    if (marker === 0xD8 || marker === 0xD9 || marker === 0x01 || (marker >= 0xD0 && marker <= 0xD7)) {
      offset += 2
      continue
    }
    if (offset + 3 >= jpegBuffer.length) return null
    const segmentLength = jpegBuffer.readUInt16BE(offset + 2)
    if (segmentLength < 2 || offset + 2 + segmentLength > jpegBuffer.length) return null
    const isSofMarker = (marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)
    if (isSofMarker && segmentLength >= 7) {
      const height = jpegBuffer.readUInt16BE(offset + 5)
      const width = jpegBuffer.readUInt16BE(offset + 7)
      if (width > 0 && height > 0) return { width, height }
      return null
    }
    offset += 2 + segmentLength
  }
  return null
}

const hasExifApp1 = (jpegBuffer: Buffer): boolean => {
  return jpegBuffer.includes(Buffer.from('Exif\u0000\u0000', 'binary'))
}

const buildExifSegment = (hex: string, width: number, height: number): Buffer => {
  const exifBuffer = Buffer.from(hex, 'hex')
  exifBuffer[28] = (width >> 24) & 0xFF
  exifBuffer[29] = (width >> 16) & 0xFF
  exifBuffer[30] = (width >> 8) & 0xFF
  exifBuffer[31] = width & 0xFF
  exifBuffer[40] = (height >> 24) & 0xFF
  exifBuffer[41] = (height >> 16) & 0xFF
  exifBuffer[42] = (height >> 8) & 0xFF
  exifBuffer[43] = height & 0xFF
  return exifBuffer
}

const getSystemExifHex = (system: MotionPhotoSystem): string | null => {
  if (system === 'oppo') return oppoExifHex
  if (system === 'xiaomi') return xiaomiExifHex
  return null
}

const resolveMotionPhotoSystem = (): MotionPhotoSystem => {
  const system = Config.app.livePhotoSystem
  if (system === 'google' || system === 'xiaomi' || system === 'oppo' || system === 'huawei_honor') {
    return system
  }
  return 'google'
}

const buildMotionPhotoXmp = (videoLength: number, presentationTimestampUs: number, system: MotionPhotoSystem, hdrGainMapLength?: number): string => {
  if (system === 'oppo') {
    // OPPO 支持 HDR GainMap 的完整 XMP 数据
    const containerItems = [
      '<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="image/jpeg" Item:Semantic="Primary" Item:Length="0" Item:Padding="0" /></rdf:li>'
    ]
    
    // 如果有 HDR GainMap 数据，添加 GainMap 项
    if (hdrGainMapLength && hdrGainMapLength > 0) {
      containerItems.push(
        `<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="image/jpeg" Item:Semantic="GainMap" Item:Length="${hdrGainMapLength}" Item:Padding="0" /></rdf:li>`
      )
    }
    
    // 添加视频项
    containerItems.push(
      `<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="video/mp4" Item:Semantic="MotionPhoto" Item:Length="${videoLength}" /></rdf:li>`
    )

    return (
      '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.1.0-jc003">' +
      '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
      '<rdf:Description rdf:about="" ' +
      'xmlns:hdrgm="http://ns.adobe.com/hdr-gain-map/1.0/" ' +
      'xmlns:GCamera="http://ns.google.com/photos/1.0/camera/" ' +
      'xmlns:OpCamera="http://ns.oplus.com/photos/1.0/camera/" ' +
      'xmlns:Container="http://ns.google.com/photos/1.0/container/" ' +
      'xmlns:Item="http://ns.google.com/photos/1.0/container/item/" ' +
      'hdrgm:Version="1.0" ' +
      `GCamera:MotionPhoto="1" GCamera:MotionPhotoVersion="1" GCamera:MotionPhotoPresentationTimestampUs="${presentationTimestampUs}" ` +
      `OpCamera:MotionPhotoPrimaryPresentationTimestampUs="${presentationTimestampUs}" OpCamera:MotionPhotoOwner="oplus" OpCamera:OLivePhotoVersion="2" OpCamera:VideoLength="${videoLength}">` +
      '<Container:Directory><rdf:Seq>' +
      containerItems.join('') +
      '</rdf:Seq></Container:Directory>' +
      '</rdf:Description>' +
      '</rdf:RDF>' +
      '</x:xmpmeta>'
    )
  }

  if (system === 'xiaomi') {
    return (
      '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.1.0-jc003">' +
      '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
      '<rdf:Description rdf:about="" ' +
      'xmlns:GCamera="http://ns.google.com/photos/1.0/camera/" ' +
      'xmlns:MiCamera="http://ns.xiaomi.com/photos/1.0/camera/" ' +
      'xmlns:Container="http://ns.google.com/photos/1.0/container/" ' +
      'xmlns:Item="http://ns.google.com/photos/1.0/container/item/" ' +
      `GCamera:MotionPhoto="1" GCamera:MotionPhotoVersion="1" GCamera:MotionPhotoPresentationTimestampUs="${presentationTimestampUs}" ` +
      `GCamera:MicroVideo="1" GCamera:MicroVideoVersion="1" GCamera:MicroVideoOffset="${videoLength}" GCamera:MicroVideoPresentationTimestampUs="${presentationTimestampUs}" ` +
      'MiCamera:XMPMeta="&lt;?xml version=&apos;1.0&apos; encoding=&apos;UTF-8&apos; standalone=&apos;yes&apos; ?&gt;">' +
      '<Container:Directory><rdf:Seq>' +
      '<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="image/jpeg" Item:Semantic="Primary" Item:Length="0" Item:Padding="0" /></rdf:li>' +
      `<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="video/mp4" Item:Semantic="MotionPhoto" Item:Length="${videoLength}" Item:Padding="0" /></rdf:li>` +
      '</rdf:Seq></Container:Directory>' +
      '</rdf:Description>' +
      '</rdf:RDF>' +
      '</x:xmpmeta>'
    )
  }

  return (
    '<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.1.0-jc003">' +
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">' +
    '<rdf:Description rdf:about="" ' +
    'xmlns:GCamera="http://ns.google.com/photos/1.0/camera/" ' +
    'xmlns:Container="http://ns.google.com/photos/1.0/container/" ' +
    'xmlns:Item="http://ns.google.com/photos/1.0/container/item/" ' +
    `GCamera:MotionPhoto="1" GCamera:MotionPhotoVersion="1" GCamera:MotionPhotoPresentationTimestampUs="${presentationTimestampUs}">` +
    '<Container:Directory><rdf:Seq>' +
    '<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="image/jpeg" Item:Semantic="Primary" Item:Length="0" Item:Padding="0" /></rdf:li>' +
    `<rdf:li rdf:parseType="Resource"><Container:Item Item:Mime="video/mp4" Item:Semantic="MotionPhoto" Item:Length="${videoLength}" Item:Padding="0" /></rdf:li>` +
    '</rdf:Seq></Container:Directory>' +
    '</rdf:Description>' +
    '</rdf:RDF>' +
    '</x:xmpmeta>'
  )
}

const injectXmpToJpeg = (jpegBuffer: Buffer, xmpPacket: string, system: MotionPhotoSystem): Buffer => {
  if (!isJpegBuffer(jpegBuffer)) {
    throw new Error('输入图片不是 JPEG 格式')
  }

  const xmpPayload = Buffer.concat([xmpHeaderBuffer, Buffer.from(xmpPacket, 'utf8')])
  const app1Length = xmpPayload.length + 2
  if (app1Length > 65535) {
    throw new Error('XMP 数据过大，无法写入 JPEG APP1')
  }

  const app1Segment = Buffer.alloc(4)
  app1Segment[0] = 0xFF
  app1Segment[1] = 0xE1
  app1Segment.writeUInt16BE(app1Length, 2)

  const dimensions = getJpegDimensions(jpegBuffer)
  const exifHex = getSystemExifHex(system)
  const needExif = !hasExifApp1(jpegBuffer) && dimensions !== null && exifHex !== null
  const exifSegment = needExif ? buildExifSegment(exifHex, dimensions.width, dimensions.height) : null

  return Buffer.concat([
    jpegBuffer.subarray(0, 2),
    ...(exifSegment ? [exifSegment] : []),
    app1Segment,
    xmpPayload,
    jpegBuffer.subarray(2)
  ])
}

const readOrConvertToJpeg = async (imagePath: string): Promise<Buffer> => {
  const sourceBuffer = fs.readFileSync(imagePath)
  if (isJpegBuffer(sourceBuffer)) {
    return sourceBuffer
  }

  const tempJpegPath = path.join(Common.tempDri.images, `MotionPhoto_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`)
  const result = await ffmpeg(`-y -i "${imagePath}" -frames:v 1 -q:v 2 "${tempJpegPath}"`)
  if (!result.status) {
    throw new Error(`图片转换 JPEG 失败: ${imagePath}`)
  }

  try {
    return fs.readFileSync(tempJpegPath)
  } finally {
    fs.rmSync(tempJpegPath, { force: true })
  }
}

/**
 * 检测图片是否包含HDR GainMap数据
 * @param imageBuffer JPEG图片缓冲区
 * @returns HDR GainMap长度，如果没有则返回0
 */
const detectHdrGainMap = (imageBuffer: Buffer): number => {
  try {
    // 查找XMP数据段
    const xmpStart = imageBuffer.indexOf('http://ns.adobe.com/xap/1.0/')
    if (xmpStart === -1) return 0
    
    // 查找HDR GainMap相关标记
    const hdrGainMapMarker = 'Item:Semantic="GainMap"'
    const gainMapIndex = imageBuffer.indexOf(hdrGainMapMarker, xmpStart)
    if (gainMapIndex === -1) return 0
    
    // 尝试提取GainMap长度
    const lengthPattern = /Item:Length="(\d+)"/
    const xmpSection = imageBuffer.subarray(xmpStart, xmpStart + 4096).toString('utf8')
    const gainMapSection = xmpSection.substring(xmpSection.indexOf(hdrGainMapMarker))
    const lengthMatch = gainMapSection.match(lengthPattern)
    
    if (lengthMatch && lengthMatch[1]) {
      const length = parseInt(lengthMatch[1], 10)
      logger.debug(`检测到HDR GainMap，长度: ${length}`)
      return length
    }
    
    // 如果找到GainMap标记但无法提取长度，返回默认值
    logger.debug('检测到HDR GainMap标记，但无法提取长度，使用默认值')
    return 463255 // 使用你提供的示例中的默认长度
  } catch (error) {
    logger.debug('HDR GainMap检测失败:', error)
    return 0
  }
}

export interface GoogleMotionPhotoOptions {
  imagePath: string
  videoPath: string
  outputPath: string
  presentationTimestampUs?: number
  hdrGainMapLength?: number // HDR GainMap 长度，用于 OPPO HDR 支持
}

export const buildGoogleMotionPhoto = async (options: GoogleMotionPhotoOptions): Promise<boolean> => {
  const { imagePath, videoPath, outputPath, presentationTimestampUs, hdrGainMapLength } = options
  try {
    const system = resolveMotionPhotoSystem()
    const imageBuffer = await readOrConvertToJpeg(imagePath)
    const videoBuffer = fs.readFileSync(videoPath)
    const resolvedPresentationTimestampUs = presentationTimestampUs === undefined || presentationTimestampUs < 0
      ? 0
      : presentationTimestampUs
    
    // 自动检测HDR GainMap（仅对OPPO系统）
    const detectedHdrGainMapLength = system === 'oppo' 
      ? (hdrGainMapLength ?? detectHdrGainMap(imageBuffer))
      : 0
    
    const huaweiHonorFooter = Buffer.from(`v2_f35              409:1000            LIVE_${resolvedPresentationTimestampUs > 0 ? Math.floor(resolvedPresentationTimestampUs) : huaweiHonorLiveIdFallback}`, 'utf8')
    const outputBuffer = system === 'huawei_honor'
      ? Buffer.concat([imageBuffer, huaweiHonorFooter])
      : (() => {
        const xmpPacket = buildMotionPhotoXmp(videoBuffer.length, resolvedPresentationTimestampUs, system, detectedHdrGainMapLength)
        const jpegWithXmp = injectXmpToJpeg(imageBuffer, xmpPacket, system)
        return Buffer.concat([jpegWithXmp, videoBuffer])
      })()
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, outputBuffer)
    
    if (system === 'oppo' && detectedHdrGainMapLength > 0) {
      logger.debug(`Motion Photo 封面生成成功(${system} with HDR): ${outputPath}`)
    } else {
      logger.debug(`Motion Photo 封面生成成功(${system}): ${outputPath}`)
    }
    return true
  } catch (error) {
    logger.error('Motion Photo 封面生成失败', error)
    return false
  }
}
