const HEIC_DATA_URL = /^data:image\/(?:heic|heif)(?:;|,)/i
const HEIC_EXTENSION = /\.(?:heic|heif)$/i
const HEIC_MIME = /^image\/(?:x-)?(?:heic|heif)(?:\s*;|$)/i

/** 判断 URL 路径、文件名或显式格式参数是否标注为 Chromium 不支持的 HEIC/HEIF。 */
export const isHeicImageUrl = (imageUrl: string): boolean => {
  if (!imageUrl) return false

  let normalizedUrl = imageUrl
  try {
    normalizedUrl = decodeURIComponent(imageUrl)
  } catch {
    // 对不完整的转义链接按原始文本继续解析。
  }

  if (HEIC_DATA_URL.test(normalizedUrl)) return true

  try {
    const url = new URL(normalizedUrl, 'https://douyin-image.invalid')
    if (HEIC_EXTENSION.test(url.pathname)) return true

    for (const [key, value] of url.searchParams.entries()) {
      if (!/^(?:fmt|format|image[_-]?format|file[_-]?format|type|image[_-]?type|mime(?:[_-]?type)?|content[_-]?type)$/i.test(key)) {
        continue
      }
      const format = value.trim()
      if (/^(?:heic|heif)$/i.test(format) || HEIC_MIME.test(format) || HEIC_EXTENSION.test(format)) return true
    }
  } catch {
    return HEIC_EXTENSION.test(normalizedUrl)
  }

  return false
}

/** 按候选优先顺序选择 Chromium 可显示的静态图片 URL，跳过显式 HEIC/HEIF。 */
export const pickChromiumImageUrl = (
  ...candidates: Array<string | readonly (string | null | undefined)[] | null | undefined>
): string | undefined => {
  for (const candidate of candidates) {
    const urls = typeof candidate === 'string' ? [candidate] : (candidate ?? [])
    const match = urls.find((url): url is string => typeof url === 'string' && url.trim().length > 0 && !isHeicImageUrl(url))
    if (match) return match
  }

  return undefined
}
