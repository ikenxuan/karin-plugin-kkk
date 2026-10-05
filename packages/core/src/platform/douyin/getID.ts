import { type Message } from 'node-karin'
import axios from 'node-karin/axios'

import { logger } from '@/module/utils/logger'
import type { DouyinDataTypes } from '@/types'

import { DouyinWorkMainType } from './workType'

export interface DouyinIdData {
  type: DouyinDataTypes[keyof DouyinDataTypes]
  /** 该作品是否为视频（已废弃，使用 work_type） */
  is_mp4?: boolean
  /** 作品主类型 */
  work_type?: DouyinWorkMainType
  [key: string]: any
}

/**
 * 抖音分享链接的合法主域。
 * 展开短链前先校验输入域名，避免把消息里伪装成抖音链接的任意 URL 交给请求器（SSRF）。
 */
const DOUYIN_HOST_SUFFIXES = ['douyin.com', 'iesdouyin.com']

const isDouyinUrl = (url: string): boolean => {
  try {
    const { hostname } = new URL(url)
    return DOUYIN_HOST_SUFFIXES.some((suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`))
  } catch {
    return false
  }
}

/**
 * 获取抖音作品ID
 * @param event 消息事件
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export const getDouyinID = async (event: Message, url: string, log = true): Promise<DouyinIdData> => {
  // 非抖音域名的链接不发起请求，按原样进入下方识别，走既有「无法获取作品ID」兜底
  let longLink = url
  if (isDouyinUrl(url)) {
    const resp = await axios.get(url, {
      headers: {
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
      },
      maxRedirects: 10 // 确保跟随所有重定向
    })
    // 使用 responseUrl 或 request.res.responseUrl 获取最终 URL
    longLink = resp.request?.res?.responseUrl || resp.request?.responseURL || url
  } else {
    logger.warn(`链接不是抖音域名，跳过短链展开: ${url}`)
  }
  let result = {} as DouyinIdData
  switch (true) {
    case longLink.includes('webcast.amemv.com'):
    case longLink.includes('live.douyin.com'): {
      if (longLink.includes('webcast.amemv.com')) {
        const sec_uid = /sec_user_id=([^&]+)/.exec(longLink)
        result = {
          type: 'live_room_detail',
          sec_uid: sec_uid ? sec_uid[1] : undefined
        }
      } else if (longLink.includes('live.douyin.com')) {
        result = {
          type: 'live_room_detail',
          room_id: longLink.split('/').pop()
        }
      }
      break
    }

    case /video\/(\d+)/.test(longLink):
    case /article\/(\d+)/.test(longLink):
    case /note\/(\d+)/.test(longLink): {
      // 统一处理 video/article/note 类型，不在这里判断具体类型
      // 因为抖音会先重定向到 /video/ 再通过 JS 跳转到 /article/
      // 具体类型由后续 API 返回的 aweme_type 字段决定
      const match = /(?:video|article|note)\/(\d+)/.exec(longLink)
      result = {
        type: 'one_work',
        aweme_id: match ? match[1] : undefined
        // 暂不设置 is_mp4 和 work_type，由后续 API 数据决定
      }
      break
    }
    case /modal_id=(\d+)/.test(longLink): {
      const modalMatch = /modal_id=(\d+)/.exec(longLink)
      result = {
        type: 'one_work',
        aweme_id: modalMatch ? modalMatch[1] : undefined,
        is_mp4: true,
        work_type: DouyinWorkMainType.VIDEO
      }
      break
    }
    case /https:\/\/(?:www\.douyin\.com|www\.iesdouyin\.com)\/(?:share\/)?user\/(\S+)/.test(longLink): {
      const userMatch = /user\/([a-zA-Z0-9_-]+)/.exec(longLink)
      result = {
        type: 'user_dynamic',
        sec_uid: userMatch ? userMatch[1] : undefined
      }
      break
    }
    case /music\/(\d+)/.test(longLink): {
      const musicMatch = /music\/(\d+)/.exec(longLink)
      result = {
        type: 'music_work',
        music_id: musicMatch ? musicMatch[1] : undefined
      }
      break
    }
    default:
      logger.warn('无法获取作品ID')
      break
  }

  if (log) {
    logger.debug(result)
  }
  return result
}
