import { logger } from 'node-karin'

import { douyinDB } from '@/module'

import type { DouyinPushItem } from './types'

/**
 * 处理直播推送
 * 检测用户是否开播，如果开播则推送
 * @returns 返回需要推送的直播项（如果有）
 */
export async function processLiveStream(
  sec_uid: string,
  userinfo: any,
  item: any,
  targets: Array<{ groupId: string, botId: string }>,
  amagi: any
): Promise<DouyinPushItem | null> {
  const pushType = 'live'

  // 获取缓存的直播状态
  const liveStatus = await douyinDB.getLiveStatus(sec_uid)

  // 检查用户是否正在直播
  if (userinfo.data.user.live_status === 1) {
    const UserInfoData = await amagi.douyin.fetcher.fetchUserProfile({ 
      sec_uid: userinfo.data.user.sec_uid, 
      typeMode: 'strict' 
    })

    if (!UserInfoData.data.user?.live_status || UserInfoData.data.user.live_status !== 1) {
      logger.error((UserInfoData?.data?.user?.nickname ?? '用户') + '当前未在直播')
      return null
    }
    
    if (!UserInfoData.data.user.room_data) {
      logger.error('未获取到直播间信息！')
      return null
    }

    const room_data = JSON.parse(UserInfoData.data.user.room_data)
    const liveInfo = await amagi.douyin.fetcher.fetchLiveRoomInfo({
      room_id: UserInfoData.data.user.room_id_str,
      web_rid: room_data.owner.web_rid,
      typeMode: 'strict'
    })

    // 如果之前没有直播，现在开播了，需要推送
    if (!liveStatus.living) {
      await douyinDB.updateLiveStatus(sec_uid, true)
      logger.info(`用户 ${item.remark ?? sec_uid} 开播了`)

      return {
        remark: item.remark,
        sec_uid,
        create_time: Date.now(),
        targets,
        pushType,
        Detail_Data: {
          user_info: userinfo,
          room_data: JSON.parse(userinfo.data.user.room_data),
          live_data: liveInfo,
          liveStatus: {
            liveStatus: 'open',
            isChanged: true,
            isliving: true
          }
        },
        avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.data.user.avatar_larger.uri,
        living: true
      }
    }
  } else if (liveStatus.living) {
    // 如果之前在直播，现在已经关播，需要更新状态
    await douyinDB.updateLiveStatus(sec_uid, false)
    logger.info(`用户 ${item.remark ?? sec_uid} 已关播，更新直播状态`)
  }

  return null
}
