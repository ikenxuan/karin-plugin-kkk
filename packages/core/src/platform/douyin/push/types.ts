import type { DyUserInfo, DyUserLiveVideos, Result } from '@ikenxuan/amagi'

import type { DouyinPushType } from '@/types/config/pushlist'

/** 每个推送项的类型定义 */
export type DouyinPushItem = {
  /** 博主的昵称 */
  remark: string
  /** 博主UID */
  sec_uid: string
  /** 作品发布时间 */
  create_time: number
  /** 要推送到的群组和机器人ID */
  targets: Array<{ groupId: string, botId: string }>
  /** 推送类型 */
  pushType: DouyinPushType
  /** 作品详情信息 */
  Detail_Data: {
    /** 博主主页信息 */
    user_info: Result<DyUserInfo>
    liveStatus?: { liveStatus: 'open' | 'close', isChanged: boolean, isliving: boolean }
    live_data?: Result<DyUserLiveVideos>
    [key: string]: any
  }
  /** 博主头像url */
  avatar_img: string
  /** 是否正在直播 */
  living: boolean
}

/** 推送列表的类型定义 */
export type WillBePushList = Record<string, DouyinPushItem>
