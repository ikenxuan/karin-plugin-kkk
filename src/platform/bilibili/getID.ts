import { logger } from 'node-karin'

import { Networks } from '@/module/utils'
import { BilibiliDataTypes } from '@/types'

export interface IDDataTypes {
  type: BilibiliDataTypes[keyof BilibiliDataTypes]
  [x: string]: any
}

/**
 * return aweme_id
 * @param {string} url 分享连接
 * @returns
 */
export async function getBilibiliID (url: string) {
  const longLink = await new Networks({ url }).getLongLink()
  let result = {} as IDDataTypes

  switch (true) {
    case /(video\/|video\-)([A-Za-z0-9]+)/.test(longLink): {
      const bvideoMatch = /video\/([A-Za-z0-9]+)|bvid=([A-Za-z0-9]+)/.exec(longLink)
      result = {
        type: 'one_video',
        id: bvideoMatch ? bvideoMatch[1] || bvideoMatch[2] : undefined
      }
      break
    }
    case /play\/(\S+?)\??/.test(longLink): {
      const playMatch = /play\/(\w+)/.exec(longLink)
      const id = playMatch ? playMatch[1] : ''
      let realid = ''
      if (id.startsWith('ss')) {
        realid = 'season_id'
      } else if (id.startsWith('ep')) {
        realid = 'ep_id'
      }
      result = {
        type: 'bangumi_video_info',
        [realid]: playMatch ? playMatch[1] : ''
      }
      break
    }
    case /^https:\/\/t\.bilibili\.com\/(\d+)/.test(longLink) || /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.test(longLink): {
      const tMatch = /^https:\/\/t\.bilibili\.com\/(\d+)/.exec(longLink)
      const opusMatch = /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.exec(longLink)
      const dynamic_id = tMatch ?? opusMatch
      result = {
        type: 'dynamic_info',
        dynamic_id: dynamic_id ? dynamic_id[1] : dynamic_id
      }
      break
    }
    case longLink.includes('live.bilibili.com'): {
      const match = /https?:\/\/live\.bilibili\.com\/(\d+)/.exec(longLink)
      result = {
        type: 'live_room_detail',
        room_id: match ? match[1] : undefined
      }
      break
    }
    default:
      logger.warn('无法获取作品ID')
      break
  }

  return result
}
