import { logger, type Message } from 'node-karin'
import axios from 'node-karin/axios'

import type { DouyinDataTypes } from '@/types'

export interface DouyinIdData {
  type: DouyinDataTypes[keyof DouyinDataTypes]
  /** 该作品是否为视频 */
  is_mp4?: boolean
  [key: string]: any
}

/**
 * 获取抖音作品ID
 * @param event 消息事件
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export async function getDouyinID (event: Message, url: string, log = true): Promise<DouyinIdData> {
  const resp = await axios.get(url, {
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
    }
  })
  const longLink = resp.request.res.responseUrl
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

    case /video\/(\d+)/.test(longLink): {
      const videoMatch = /video\/(\d+)/.exec(longLink)
      result = {
        type: 'one_work',
        aweme_id: videoMatch ? videoMatch[1] : undefined,
        is_mp4: true
      }
      break
    }
    case /note\/(\d+)/.test(longLink): {
      const noteMatch = /note\/(\d+)/.exec(longLink)
      result = {
        type: 'one_work',
        aweme_id: noteMatch ? noteMatch[1] : undefined,
        is_mp4: false
      }
      break
    }
    case /https:\/\/(?:www\.douyin\.com|www\.iesdouyin\.com)\/share\/user\/(\S+)/.test(longLink): {
      const userMatch = /user\/([a-zA-Z0-9_-]+)\b/.exec(longLink)
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

  log && console.log(result)
  return result
}
