import decode from 'heic-decode'
import jpeg from 'jpeg-js'

import { Networks } from '@/module/utils'

import { isHeicImageUrl } from '../../../ktr/utils/imageUrl'
import { getWorkCoverCandidates, getWorkCoverUrl, type DouyinWorkTypeInfo } from './workType'

export { isHeicImageUrl as isHeicDouyinImageUrl, pickChromiumImageUrl } from '../../../ktr/utils/imageUrl'

/** 将抖音返回的 HEIC 图转成 Chromium 可显示的 JPEG；其他图片格式沿用原 URL。 */
export const processDouyinImageUrl = async (imageUrl: string, options: { forceKnownHeic?: boolean } = {}): Promise<string> => {
  if (!/^https?:\/\//i.test(imageUrl)) return imageUrl

  const shouldForceHeic = options.forceKnownHeic === true && isHeicImageUrl(imageUrl)
  const headers = shouldForceHeic ? {} : await new Networks({ url: imageUrl, type: 'arraybuffer' }).getHeaders()
  const contentType = String(headers['content-type'] ?? '')
    .split(';', 1)[0]
    .trim()
    .toLowerCase()
  if (!shouldForceHeic && contentType !== 'image/heic' && contentType !== 'image/heif') return imageUrl

  const response = await new Networks({ url: imageUrl, type: 'arraybuffer' }).returnResult()
  const decoded = await decode({ buffer: response.data })
  const jpegBuffer = jpeg.encode(
    {
      data: Buffer.from(decoded.data),
      width: decoded.width,
      height: decoded.height
    },
    90
  ).data

  return `data:image/jpeg;base64,${Buffer.from(jpegBuffer).toString('base64')}`
}

/**
 * 解析抖音作品封面；仅当不存在 Chromium 可显示的 URL 时，尝试下载并转码 HEIC/HEIF 候选。
 * 单个候选转码失败时继续尝试后续候选，绝不把已知 HEIC 原图传入模板。
 */
export const resolveDouyinWorkCoverUrl = async (
  workTypeInfo: DouyinWorkTypeInfo,
  data: Parameters<typeof getWorkCoverCandidates>[1]
): Promise<string> => {
  const coverUrl = getWorkCoverUrl(workTypeInfo, data)
  if (coverUrl) return coverUrl

  const heicCandidates = [...new Set(getWorkCoverCandidates(workTypeInfo, data).filter(isHeicImageUrl))]
  for (const imageUrl of heicCandidates) {
    try {
      const convertedUrl = await processDouyinImageUrl(imageUrl, { forceKnownHeic: true })
      if (convertedUrl && convertedUrl !== imageUrl && !isHeicImageUrl(convertedUrl)) return convertedUrl
    } catch {
      // 继续尝试同一封面的其他候选；全部失败时由调用方按无封面处理。
    }
  }

  return ''
}
