import decode from 'heic-decode'
import jpeg from 'jpeg-js'

import { Networks } from '@/module/utils'

/** 将抖音返回的 HEIC 图转成 Chromium 可显示的 JPEG；其他图片格式沿用原 URL。 */
export const processDouyinImageUrl = async (imageUrl: string): Promise<string> => {
  if (!/^https?:\/\//i.test(imageUrl)) return imageUrl

  const headers = await new Networks({ url: imageUrl, type: 'arraybuffer' }).getHeaders()
  const contentType = String(headers['content-type'] ?? '')
    .split(';', 1)[0]
    .trim()
    .toLowerCase()
  if (contentType !== 'image/heic' && contentType !== 'image/heif') return imageUrl

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
