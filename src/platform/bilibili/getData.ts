import amagi, { bilibiliAPI, getBilibiliData, wbi_sign } from '@ikenxuan/amagi'

import { Config } from '@/module'
import { genParams } from '@/platform/bilibili'
import { BilibiliDataTypes } from '@/types'

export async function fetchBilibiliData<T extends keyof BilibiliDataTypes> (
  type: T,
  opt?: any
): Promise<any> {
  const cl = new amagi({ bilibili: Config.cookies.bilibili })
  switch (type) {
    case 'one_video': {
      const INFODATA = await cl.getBilibiliData('单个视频作品数据', {
        id_type: 'bvid',
        id: opt.id
      })
      const DATA = await cl.getBilibiliData('单个视频下载信息数据', {
        avid: INFODATA.data.aid,
        cid: INFODATA.data.cid
      })
      const BASEURL = bilibiliAPI.视频流信息({ avid: INFODATA.data.aid, cid: INFODATA.data.cid })
      const SIGN = await genParams(BASEURL)
      const COMMENTSDATA = await cl.getBilibiliData('评论数据', {
        number: Config.bilibili.numcomment,
        type: 1,
        oid: INFODATA.data.aid
      })
      const EMOJIDATA = await cl.getBilibiliData('Emoji数据')

      return { INFODATA, DATA, COMMENTSDATA, EMOJIDATA, USER: SIGN, TYPE: 'one_video' }
    }
    case 'nock_video': {
      const dt = await getBilibiliData('单个视频下载信息数据', '', {
        avid: opt.avid,
        cid: opt.cid
      })
    }
    case 'work_comments': {
      const INFODATA = await cl.getBilibiliData('单个视频作品数据', {
        id_type: 'bvid',
        id: opt.id
      })
      const aCOMMENTSDATA = await cl.getBilibiliData('评论数据', {
        number: Config.bilibili.numcomment,
        type: 1,
        oid: INFODATA.data.aid
      })
      return aCOMMENTSDATA
    }
    case 'emoji_list':
      return await cl.getBilibiliData('Emoji数据')

    case 'new_login_qrcode':
      return await cl.getBilibiliData('申请二维码', Config.cookies.bilibili)

    case 'check_qrcode': {
      return await cl.getBilibiliData('二维码状态', { qrcode_key: opt.qrcode_key })
    }

    case 'bangumi_video_info': {
      let cleanedId = '', isep = false
      if (opt.ep_id) {
        cleanedId = opt.ep_id.replace('ep', '')
        isep = true
      } else if (opt.season_id) {
        cleanedId = opt.season_id.replace('ss', '')
        isep = false
      }
      const INFO = await cl.getBilibiliData('番剧基本信息数据', { ...opt })
      const QUERY = await genParams(isep ? bilibiliAPI.番剧明细({ id: cleanedId, isep }) : bilibiliAPI.番剧明细({ id: cleanedId, isep }))
      return { INFODATA: INFO, USER: QUERY, TYPE: 'bangumi_video_info' }
    }

    case 'user_dynamic': {
      const result = await cl.getBilibiliData('用户主页动态列表数据', { host_mid: opt.host_mid })
      return result
    }

    case 'dynamic_info': {
      const dynamicINFO = await cl.getBilibiliData('动态详情数据', { dynamic_id: opt.dynamic_id })
      const dynamicINFO_CARD = await cl.getBilibiliData('动态卡片数据', { dynamic_id: dynamicINFO.data.item.id_str })
      const PARAM = await wbi_sign(bilibiliAPI.评论区明细({ type: 1, oid: dynamicINFO_CARD.data.card.desc.rid, number: Config.bilibili.numcomment }), Config.cookies.bilibili)
      const COMMENTSDATA = await cl.getBilibiliData('评论数据', { type: mapping_table(dynamicINFO.data.item.type), oid: oid(dynamicINFO, dynamicINFO_CARD), number: Config.bilibili.numcomment })
      const EMOJIDATA = await cl.getBilibiliData('Emoji数据')
      const USERDATA = await cl.getBilibiliData('用户主页数据', { host_mid: dynamicINFO.data.item.modules.module_author.mid })
      return { dynamicINFO, dynamicINFO_CARD, COMMENTSDATA, EMOJIDATA, USERDATA, TYPE: 'dynamic_info' }
    }

    case 'user_profile': {
      const result = await cl.getBilibiliData('用户主页数据', { host_mid: opt.host_mid })
      return result
    }

    case 'dynamic_info': {
      const result = await cl.getBilibiliData('动态详情数据', { dynamic_id: opt.dynamic_id })
      return result
    }

    case 'dynamic_card': {
      const result = await cl.getBilibiliData('动态卡片数据', { dynamic_id: opt.dynamic_id })
      return result
    }

    case 'live_room_detail': {
      const live_info = await cl.getBilibiliData('直播间信息', { room_id: opt.room_id })
      const room_init_info = await cl.getBilibiliData('直播间初始化信息', { room_id: opt.room_id })
      const USERDATA = await cl.getBilibiliData('用户主页数据', { host_mid: room_init_info.data.uid })
      return { TYPE: type, live_info, room_init_info, USERDATA }
    }
    default:
      break
  }
  return { TYPE: 'undefined' }
}

function mapping_table (type: any): number {
  const Array: { [key: string]: string[] } = {
    1: [ 'DYNAMIC_TYPE_AV', 'DYNAMIC_TYPE_PGC', 'DYNAMIC_TYPE_UGC_SEASON' ],
    11: [ 'DYNAMIC_TYPE_DRAW' ],
    12: [ 'DYNAMIC_TYPE_ARTICLE' ],
    17: [ 'DYNAMIC_TYPE_LIVE_RCMD', 'DYNAMIC_TYPE_FORWARD', 'DYNAMIC_TYPE_WORD', 'DYNAMIC_TYPE_COMMON_SQUARE' ],
    19: [ 'DYNAMIC_TYPE_MEDIALIST' ]
  }
  for (const key in Array) {
    if (Array[key].includes(type)) {
      return parseInt(key, 10)
    }
  }
  return 1
}

function oid (dynamicINFO: any, dynamicINFO_CARD: any) {
  if (dynamicINFO.data.item.type === 'DYNAMIC_TYPE_WORD') {
    return dynamicINFO.data.item.id_str
  } else return dynamicINFO_CARD.data.card.desc.rid
}