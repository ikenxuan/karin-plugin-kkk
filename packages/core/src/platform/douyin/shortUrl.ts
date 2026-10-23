import { douyinFetcher } from '@/module/utils/amagiClient'
import { logger } from '@/module/utils/logger'

/**
 * 把分享链接换成抖音签发的 `v.douyin.com` 短链（二维码专用）。
 *
 * 短链由 amagi 的 `douyin.shortUrl` 端点签发：同一 target 恒得同一短码，
 * 内容比任何规范链接都短，能明显降低二维码密度。该端点免登录但仍要 `a_bogus` 签名，
 * 可能因签名或平台策略失败 —— 失败不阻塞推送，回退原链接即可。
 * @param target - 待缩短的分享链接（规范链接或视频直链均可）
 * @returns 短链；签发失败时原样返回 target
 */
export const toDouyinShortUrl = async (target: string): Promise<string> => {
  try {
    const result = await douyinFetcher.fetchShortUrl({ target })
    const shortUrl = result.data?.data
    return typeof shortUrl === 'string' && shortUrl.length > 0 ? shortUrl : target
  } catch (error) {
    logger.debug(`[抖音短链] 签发失败，二维码回退原链接：${error instanceof Error ? error.message : String(error)}`)
    return target
  }
}
