import { Networks } from '@/module/utils'
import { logger } from 'node-karin'
import { DouyinOptionsType } from '@ikenxuan/amagi'
import { DouyinDataTypes } from '@/types'

export interface ExtendedDouyinOptionsType extends DouyinOptionsType {
  type: DouyinDataTypes[keyof DouyinDataTypes],
  /** 该作品是否为视频 */
  is_mp4?: boolean
}

/**
 *
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export async function getDouyinID (url: string, log = true): Promise<ExtendedDouyinOptionsType> {
  const longLink = await new Networks({ url }).getLongLink()
  let result = {} as ExtendedDouyinOptionsType

  switch (true) {
    case /https:\/\/(?:www\.iesdouyin\.com)\/share\/slides/.test(longLink):
    case longLink === 'https://www.douyin.com/': {
      const newres = await new Networks({ url }).getLocation()
      const match = newres.match(/share\/slides\/(\d+)/)
      result = {
        type: 'user_mix_videos',
        aweme_id: match ? match[1] : undefined,
        is_mp4: true
      }
      break
    }

    case longLink.includes('webcast.amemv.com'):
    case longLink.includes('live.douyin.com'): {
      if (longLink.includes('webcast.amemv.com')) {
        const sec_uid = longLink.match(/sec_user_id=([^&]+)/)
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
      const videoMatch = longLink.match(/video\/(\d+)/)
      result = {
        type: 'one_work',
        aweme_id: videoMatch ? videoMatch[1] : undefined,
        is_mp4: true
      }
      break
    }
    case /note\/(\d+)/.test(longLink): {
      const noteMatch = longLink.match(/note\/(\d+)/)
      result = {
        type: 'one_work',
        aweme_id: noteMatch ? noteMatch[1] : undefined,
        is_mp4: false
      }
      break
    }
    case /https:\/\/(?:www\.douyin\.com|www\.iesdouyin\.com)\/share\/user\/(\S+)/.test(longLink): {
      const userMatch = longLink.match(/user\/([a-zA-Z0-9_-]+)\b/)
      result = {
        type: 'user_dynamic',
        sec_uid: userMatch ? userMatch[1] : undefined
      }
      break
    }
    case /music\/(\d+)/.test(longLink): {
      const musicMatch = longLink.match(/music\/(\d+)/)
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
