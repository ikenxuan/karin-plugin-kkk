import type { AmagiSuccess, DyUserInfo, DyUserLiveVideos, DyVideoWork } from '@ikenxuan/amagi'

type AwemeDetail = DyVideoWork['aweme_detail']

/**
 * 作品描述 text_extra 数组项。
 * amagi 生成类型把它误标为 `string[]`，真实数据是对象数组：
 * type 0 为 @用户（带 sec_uid），type 1 为话题（带 hashtag_name / hashtag_id）。
 */
export interface DouyinTextExtra {
  start?: number
  end?: number
  hashtag_name?: string
  hashtag_id?: string
  sec_uid?: string
  type?: number
}

/**
 * 图文/合辑作品 images 数组项。
 * amagi 生成类型里视频作品的 images 标为 null，图文作品实为该对象数组。
 */
export interface DouyinAwemeImage {
  url_list: string[]
  /** 2/缺省为静态图，4 为短片，5 为实况动图 */
  clip_type?: number
  width?: number
  height?: number
  /** clip_type 为 4/5 时携带的动图视频源 */
  video?: {
    play_addr_h264?: {
      uri: string
      url_list?: string[]
    }
    [key: string]: any
  }
  [key: string]: any
}

/** 作品合作信息（多创作者共创） */
export interface DouyinCooperationInfo {
  co_creator_nums?: number
  co_creators?: Array<{
    uid?: string
    sec_uid?: string
    nickname?: string
    role_title?: string
    avatar_thumb?: {
      uri?: string
      url_list?: (string | undefined)[]
    }
  }>
}

/**
 * 抖音作品详情（aweme 对象）在渲染/推送链路上的消费侧视图。
 * 以 amagi 的 AwemeDetail 字段类型为准，修正其与真实数据不符的字段
 * （text_extra、images），并补充解析/推送流程注入的附加字段（user_info 等）。
 * 保留索引签名以穿透未列举的上游字段，与 amagi 自身约定一致。
 */
export interface DouyinWorkDetailData {
  aweme_id: string
  desc?: string
  create_time: number
  aweme_type?: number
  media_type?: number
  is_slides?: boolean
  share_url?: string
  duration?: number
  preview_title?: string
  statistics: AwemeDetail['statistics']
  author: AwemeDetail['author']
  video?: AwemeDetail['video']
  music?: AwemeDetail['music']
  images?: DouyinAwemeImage[] | null
  text_extra?: DouyinTextExtra[]
  suggest_words?: {
    suggest_words?: Array<{
      hint_text?: string
      words?: Array<{ word?: string }>
    }>
  }
  ip_location?: string
  article_info?: {
    article_title: string
    article_content: string
    fe_data: string
  }
  cooperation_info?: DouyinCooperationInfo
  /** 流程附加：作品作者/订阅者主页信息（解析与作品列表推送场景注入） */
  user_info?: AmagiSuccess<DyUserInfo>
  /** 流程附加：喜欢/推荐列表场景下作品作者的主页信息 */
  author_user_info?: AmagiSuccess<DyUserInfo>
  [key: string]: any
}

/** 直播推送的详情数据（非 aweme 结构） */
export interface DouyinLiveDetailData {
  /** 主播主页信息 */
  user_info: AmagiSuccess<DyUserInfo>
  /** 直播间信息，由 user_info.data.user.room_data JSON 解析而来 */
  room_data?: {
    owner: { web_rid: string }
    [key: string]: any
  }
  /** 直播间详情接口返回 */
  live_data?: AmagiSuccess<DyUserLiveVideos>
  /** 本次推送的直播状态标记 */
  liveStatus?: {
    liveStatus: 'open' | 'close'
    isChanged: boolean
    isliving: boolean
  }
}

/**
 * 把 amagi 返回的 aweme 对象装配成渲染/推送使用的作品详情。
 * amagi 的生成类型在 text_extra（实为对象数组）、images（图文作品实为数组）等字段上
 * 与真实数据不符，统一在这一处边界断言，下游全部享受精确类型。
 * 返回类型会带上 extra 的实际形状，例如传入 user_info 后下游可把它当作必填字段使用。
 * @param aweme - amagi 返回的作品详情（aweme_detail 或作品列表项）
 * @param extra - 流程附加字段（作者/订阅者主页信息）
 */
export const buildDouyinWorkDetail = <E extends { user_info?: AmagiSuccess<DyUserInfo>; author_user_info?: AmagiSuccess<DyUserInfo> }>(
  aweme: unknown,
  extra: E = {} as E
): DouyinWorkDetailData & E => ({ ...(aweme as object), ...extra }) as DouyinWorkDetailData & E
