import { isProxyableAvatarUrl, toProxiedAvatarUrl } from './avatarProxy'

const MAX_QRCODE_AVATAR_BYTES = 2 * 1024 * 1024
const QRCODE_AVATAR_TIMEOUT_MS = 5000
const QRCODE_AVATAR_CACHE_SIZE = 128
const SUPPORTED_QRCODE_AVATAR_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp'])

const avatarRequestCache = new Map<string, Promise<Uint8Array | undefined>>()

const isSupportedImageBytes = (image: Uint8Array): boolean => {
  const isPng =
    image.byteLength >= 8 &&
    image[0] === 0x89 &&
    image[1] === 0x50 &&
    image[2] === 0x4e &&
    image[3] === 0x47 &&
    image[4] === 0x0d &&
    image[5] === 0x0a &&
    image[6] === 0x1a &&
    image[7] === 0x0a
  const isJpeg = image.byteLength >= 3 && image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff
  const isWebp =
    image.byteLength >= 12 &&
    image[0] === 0x52 &&
    image[1] === 0x49 &&
    image[2] === 0x46 &&
    image[3] === 0x46 &&
    image[8] === 0x57 &&
    image[9] === 0x45 &&
    image[10] === 0x42 &&
    image[11] === 0x50

  return isPng || isJpeg || isWebp
}

const requestAvatarBytes = async (url: string): Promise<Uint8Array | undefined> => {
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'image/png,image/jpeg,image/webp,image/*;q=0.8,*/*;q=0.5'
      },
      signal: AbortSignal.timeout(QRCODE_AVATAR_TIMEOUT_MS)
    })

    if (!response.ok) return undefined

    const declaredLength = Number(response.headers.get('content-length') ?? 0)
    if (declaredLength > MAX_QRCODE_AVATAR_BYTES) return undefined

    const contentType = response.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
    const image = new Uint8Array(await response.arrayBuffer())
    if (image.byteLength === 0 || image.byteLength > MAX_QRCODE_AVATAR_BYTES) return undefined
    if (contentType && SUPPORTED_QRCODE_AVATAR_TYPES.has(contentType)) return image

    return isSupportedImageBytes(image) ? image : undefined
  } catch {
    return undefined
  }
}

/**
 * 依次尝试的取图地址。
 *
 * 浏览器（只有 ktr 开发面板会走到）里头像 CDN 多半缺 CORS 头，直连必被同源策略拦，
 * 所以优先走 dev 服务器的同源代理，代理不在（如面板未启动）时再退回直连。
 * Node SSR 侧没有同源策略，始终直连。
 */
const avatarCandidates = (url: string): string[] => {
  if (typeof window === 'undefined' || !isProxyableAvatarUrl(url)) return [url]
  return [toProxiedAvatarUrl(url), url]
}

const fetchQRCodeAvatar = async (url: string): Promise<Uint8Array | undefined> => {
  for (const candidate of avatarCandidates(url)) {
    const image = await requestAvatarBytes(candidate)
    if (image) return image
  }

  return undefined
}

/**
 * 加载并缓存二维码头像。同一头像的并发渲染会复用请求，失败结果不会进入缓存。
 */
export const loadQRCodeAvatar = (url?: string): Promise<Uint8Array | undefined> => {
  if (!url || !/^https?:\/\//i.test(url)) return Promise.resolve(undefined)

  const cached = avatarRequestCache.get(url)
  if (cached) return cached

  if (avatarRequestCache.size >= QRCODE_AVATAR_CACHE_SIZE) {
    const oldestKey = avatarRequestCache.keys().next().value
    if (oldestKey) avatarRequestCache.delete(oldestKey)
  }

  const request = fetchQRCodeAvatar(url)
  avatarRequestCache.set(url, request)
  void request.then((image) => {
    if (!image) avatarRequestCache.delete(url)
  })
  return request
}
