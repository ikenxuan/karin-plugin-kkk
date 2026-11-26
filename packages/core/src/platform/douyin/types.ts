import type {
  DouyinUserProfileResponse,
  DouyinLiveRoomInfoResponse,
  DouyinUserFavoriteListResponse,
  DouyinUserRecommendListResponse,
  DouyinUserVideoListResponse,
  DouyinVideoWorkResponse
} from '@ikenxuan/amagi'

type AwemeDetail = NonNullable<DouyinVideoWorkResponse['aweme_detail']>

/**
 * 作品列表推送要遍历的条目。
 *
 * 作品 / 喜欢 / 推荐三个列表拿到的是同一套 aweme 对象，但生成树按各自样本分别派生了一份形状
 * （字段可选性略有出入），这里取三者的并集 —— 推送链路只读 `aweme_id` / `create_time` /
 * `author.nickname` / `author.sec_uid` / `is_top`，三个形状都带这些字段。
 */
export type DouyinListItem =
  | DouyinUserVideoListResponse['aweme_list'][number]
  | DouyinUserFavoriteListResponse['aweme_list'][number]
  | DouyinUserRecommendListResponse['aweme_list'][number]

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
  /** 是否为限时日常作品（任一标记为 1 即为限时内容）。 */
  is_25_story?: number
  is_story?: number
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
  /**
   * 流程附加：作品作者/订阅者主页信息（解析与作品列表推送场景注入）。
   *
   * 存的是响应体本身，不是 amagi 的信封 —— fetcher 失败即抛，信封的 `success`/`message`/`meta`
   * 在这条链路上没人读。
   */
  user_info?: DouyinUserProfileResponse
  /** 流程附加：喜欢/推荐列表场景下作品作者的主页信息 */
  author_user_info?: DouyinUserProfileResponse
  [key: string]: any
}

type DouyinArticleInfo = NonNullable<DouyinWorkDetailData['article_info']>

/** 解析文章接口中的 JSON 字段；脏数据只影响对应补充字段，不中断作品解析。 */
const parseArticleJson = (value: string): Record<string, unknown> => {
  try {
    const parsed: unknown = JSON.parse(value)
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

/**
 * 合并文章 App/Web 双端数据：Web 的 article_content 提供 Markdown 正文，App 的
 * fe_data / article_content 优先提供头图；Web 的正文图片与其余字段保留。
 */
export const mergeDouyinArticleInfo = (appInfo: DouyinArticleInfo, webInfo: DouyinArticleInfo): DouyinArticleInfo => {
  const appContent = parseArticleJson(appInfo.article_content)
  const webContent = parseArticleJson(webInfo.article_content)
  const appFeData = parseArticleJson(appInfo.fe_data)
  const webFeData = parseArticleJson(webInfo.fe_data)
  const appCover = appFeData.head_poster_list ?? appContent.head_poster_list
  const webCover = webFeData.head_poster_list ?? webContent.head_poster_list

  return {
    ...appInfo,
    ...webInfo,
    article_content: webInfo.article_content || appInfo.article_content,
    fe_data: JSON.stringify({
      ...appFeData,
      ...webFeData,
      head_poster_list: appCover ?? webCover
    })
  }
}

/** 直播推送的详情数据（非 aweme 结构） */
export interface DouyinLiveDetailData {
  /** 主播主页信息（响应体，非信封） */
  user_info: DouyinUserProfileResponse
  /** 直播间信息，由 user_info.user.room_data JSON 解析而来 */
  room_data?: {
    owner: { web_rid: string }
    [key: string]: any
  }
  /** 直播间详情接口返回 */
  live_data?: DouyinLiveRoomInfoResponse
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
export const buildDouyinWorkDetail = <E extends { user_info?: DouyinUserProfileResponse; author_user_info?: DouyinUserProfileResponse }>(
  aweme: unknown,
  extra: E = {} as E
): DouyinWorkDetailData & E => ({ ...(aweme as object), ...extra }) as DouyinWorkDetailData & E
