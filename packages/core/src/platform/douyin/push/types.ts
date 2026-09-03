import type { AmagiSuccess, DyUserInfo } from '@ikenxuan/amagi'

import type { DouyinLiveDetailData, DouyinWorkDetailData } from '@/platform/douyin/types'
import type { DouyinPushType } from '@/types/config/pushlist'

/** 推送项的公共字段 */
interface DouyinPushItemBase {
  /** 博主的昵称 */
  remark: string
  /** 博主UID */
  sec_uid: string
  /** 作品发布时间 */
  create_time: number
  /** 要推送到的群组和机器人ID */
  targets: Array<{ groupId: string; botId: string }>
  /** 博主头像url */
  avatar_img: string
  /** 是否正在直播 */
  living: boolean
}

/** 作品类推送项（作品/喜欢/推荐列表），Detail_Data 为 aweme 作品详情 */
export type DouyinWorkPushItem = DouyinPushItemBase & {
  pushType: Exclude<DouyinPushType, 'live'>
  Detail_Data: DouyinWorkDetailData & {
    /** 博主（订阅者）主页信息，作品类推送必带 */
    user_info: AmagiSuccess<DyUserInfo>
  }
}

/** 直播推送项，Detail_Data 为直播间数据 */
export type DouyinLivePushItem = DouyinPushItemBase & {
  pushType: 'live'
  Detail_Data: DouyinLiveDetailData
}

/** 每个推送项的类型定义，按 pushType 可判别 */
export type DouyinPushItem = DouyinWorkPushItem | DouyinLivePushItem

/** 推送列表的类型定义 */
export type WillBePushList = Record<string, DouyinPushItem>
