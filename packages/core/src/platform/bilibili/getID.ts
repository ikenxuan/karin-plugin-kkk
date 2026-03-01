import amagi from '@ikenxuan/amagi'
import { logger } from 'node-karin'
import axios from 'node-karin/axios'

import type { BilibiliDataTypes } from '@/types'

export interface BilibiliId {
  type: BilibiliDataTypes[keyof BilibiliDataTypes]
  [x: string]: any
}

/**
 * return aweme_id
 * @param {string} url 分享连接
 * @returns
 */
export const getBilibiliID = async (url: string) => {
  // 如果是专栏链接且带有 opus_fallback 参数，先去掉参数让它自然重定向
  if (/\/read\/cv\d+/.test(url) && url.includes('opus_fallback')) {
    url = url.split('?')[0]
  }
  
  const resp = await axios.get(url, {
    headers: {
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
    }
  })
  const longLink = resp?.request?.res?.responseUrl ?? resp?.config?.url ?? url
  let result = {} as BilibiliId
  let pValue: number | undefined
  const parsedUrl = new URL(longLink)
  const pParam = parsedUrl.searchParams.get('p')
  if (pParam) {
    pValue = parseInt(pParam, 10)
    if (isNaN(pValue)) {
      pValue = undefined
    }
  }
  const pathname = parsedUrl.pathname
  const hostname = parsedUrl.hostname

  switch (true) {
    case (hostname === 't.bilibili.com' && /^\/\d+/.test(pathname)) || (hostname === 'www.bilibili.com' && /^\/opus\/\d+/.test(pathname)): {
      const tMatch = hostname === 't.bilibili.com' ? pathname.match(/^\/(\d+)/) : null
      const opusMatch = hostname === 'www.bilibili.com' ? pathname.match(/^\/opus\/(\d+)/) : null
      const dynamic_id = tMatch ?? opusMatch
      result = {
        type: 'dynamic_info',
        dynamic_id: dynamic_id ? dynamic_id[1] : undefined
      }
      break
    }
    case /\/read\/cv(\d+)/.test(longLink): {
      const cvMatch = /\/read\/cv(\d+)/.exec(longLink)
      result = {
        type: 'dynamic_info',
        dynamic_id: cvMatch ? cvMatch[1] : undefined
      }
      break
    }
    case /\/bangumi\/play\/(\w+)/.test(longLink): {
      const playMatch = /\/bangumi\/play\/(\w+)/.exec(longLink)
      const id = playMatch ? playMatch[1] : ''
      let realid = ''
      let isEpid = false
      if (id.startsWith('ss')) {
        realid = id
      } else if (id.startsWith('ep')) {
        realid = id
        isEpid = true
      }
      result = {
        type: 'bangumi_video_info',
        isEpid,
        realid
      }
      break
    }
    case /(video\/|video-)([A-Za-z0-9]+)/.test(longLink): {
      const bvideoMatch = /video\/([A-Za-z0-9]+)|bvid=([A-Za-z0-9]+)/.exec(longLink)
      let bvid = bvideoMatch ? bvideoMatch[1] || bvideoMatch[2] : undefined

      if (bvid && bvid.toLowerCase().startsWith('av')) {
        const avid = parseInt(bvid.replace(/^av/i, ''))
        const convertResult = await amagi.bilibiliFetcher.convertAvToBv({ avid, typeMode: 'strict' })
        bvid = convertResult.data.data.bvid
      }

      result = {
        type: 'one_video',
        bvid,
        ...(pValue !== undefined && { p: pValue })
      }
      break
    }
    case /festival\/([A-Za-z0-9]+)/.test(longLink): {
      const festivalMatch = /festival\/([A-Za-z0-9]+)\?bvid=([A-Za-z0-9]+)/.exec(longLink)
      result = {
        type: 'one_video',
        id: festivalMatch ? festivalMatch[2] : undefined
      }
      break
    }
    case /play\/(\S+?)\??/.test(longLink): {
      const playMatch = /play\/(\w+)/.exec(longLink)
      const id = playMatch ? playMatch[1] : ''
      const isEpid = false
      if (id.startsWith('ss')) {
        result.realid = 'season_id'
      } else if (id.startsWith('ep')) {
        result.realid = 'ep_id'
      }
      result = {
        type: 'bangumi_video_info',
        isEpid,
        realid: playMatch ? playMatch[1] : ''
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

  console.log(result)
  return result
}
