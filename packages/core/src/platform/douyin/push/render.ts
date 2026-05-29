import { format, fromUnixTime } from 'date-fns'
import type { ImageElement, Message } from 'node-karin'

import { Count, Render } from '@/module/utils'

import { DouyinWorkMainType, getWorkCoverUrl, getWorkTypeInfo } from '../workType'

/**
 * 处理作品描述
 * @param Desc - 作品原始描述文本
 * @returns 如果描述为空则返回默认提示，否则返回原文
 */
function desc (Desc: string) {
  return Desc === '' ? '该作品没有描述' : Desc
}

/**
 * 构建合作信息数据
 * 从作品详情中提取创作者合作信息，包括合作者列表和订阅者角色
 * @param Detail_Data - 作品详情数据，包含 cooperation_info、user_info、author 等字段
 * @returns 合作信息对象，如果不存在则返回 undefined
 */
function buildCooperationInfo (Detail_Data: any): {
  co_creator_nums: number
  co_creators: Array<{
    avatar_url?: string
    nickname: string
    role_title: string
  }>
  subscriber_role?: string
} | undefined {
  const raw = Detail_Data.cooperation_info
  if (!raw) return undefined

  const rawCreators = Array.isArray(raw.co_creators) ? raw.co_creators : []

  const subscriberUid = Detail_Data.user_info.data.user.uid
  const subscriberSecUid = Detail_Data.user_info.data.user.sec_uid

  const subscriberInCreators = rawCreators.find((c: { uid: string; sec_uid: string }) =>
    (subscriberUid && c.uid && c.uid === subscriberUid) ||
    (subscriberSecUid && c.sec_uid && c.sec_uid === subscriberSecUid)
  )

  const co_creators = rawCreators.map((c: {
    avatar_thumb: { url_list: (string | undefined)[]; uri: any }
    nickname: any
    role_title: any
  }) => {
    const avatarUrl = c.avatar_thumb?.url_list?.[0] ??
      (c.avatar_thumb?.uri ? `https://p3.douyinpic.com/${c.avatar_thumb.uri}` : undefined)

    return {
      avatar_url: avatarUrl,
      nickname: c.nickname,
      role_title: c.role_title
    }
  })

  if (
    Detail_Data.author &&
    !rawCreators.some((c: { uid: string; sec_uid: string; nickname: string }) =>
      (Detail_Data.author?.uid && c.uid && c.uid === Detail_Data.author.uid) ||
      (Detail_Data.author?.sec_uid && c.sec_uid && c.sec_uid === Detail_Data.author.sec_uid) ||
      (Detail_Data.author?.nickname && c.nickname && c.nickname === Detail_Data.author.nickname)
    )
  ) {
    co_creators.unshift({
      avatar_url: Detail_Data.author.avatar_thumb?.url_list?.[0] ??
        (Detail_Data.author.avatar_thumb?.uri ? `https://p3.douyinpic.com/${Detail_Data.author.avatar_thumb.uri}` : undefined),
      nickname: Detail_Data.author.nickname,
      role_title: '作者'
    })
  }

  return {
    co_creator_nums: Math.max(Number(raw.co_creator_nums || 0), co_creators.length),
    co_creators,
    subscriber_role: subscriberInCreators?.role_title ?? (
      (subscriberUid && Detail_Data.author?.uid && subscriberUid === Detail_Data.author.uid) ||
        (subscriberSecUid && Detail_Data.author?.sec_uid && subscriberSecUid === Detail_Data.author.sec_uid) ||
        (Detail_Data.user_info.data.user.nickname && Detail_Data.author?.nickname && Detail_Data.user_info.data.user.nickname === Detail_Data.author.nickname)
        ? '作者'
        : undefined
    )
  }
}

/**
 * 构建 Douyin CDN 头像 URL
 * @param uri - 头像资源的 URI 标识
 * @returns 完整的 1080x1080 分辨率头像 CDN 地址
 */
function cdnAvatar (uri: string): string {
  return 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + uri
}

/**
 * 构建图文作品图片列表
 * 从作品详情中提取全部图片 URL（排除封面首图），优先取中分辨率 url_list[1]
 * 限制最多返回 3 张预览图，并提供作品总图数供前端视觉锚点使用
 * @param images - 作品原始图片数组，每项包含 url_list（多分辨率 URL）
 * @returns 图片列表数据，若作品无多图则返回 undefined
 */
function buildImageList (images: Array<{ url_list: string[] }> | null | undefined): {
  images: string[]
  total_count: number
} | undefined {
  if (!images || images.length <= 1) return undefined

  const total_count = images.length
  const previews = images.slice(1, 4).map(
    (img) => img.url_list[1] ?? img.url_list[0] ?? img.url_list[2] ?? ''
  ).filter(Boolean)

  return { images: previews, total_count }
}

/**
 * 获取用户抖音号
 * @param user - 用户对象，包含 unique_id 和 short_id
 * @returns 优先返回抖音号（unique_id），为空则返回短 ID
 */
function douyinId (user: { unique_id: string; short_id: string }): string {
  return user.unique_id === '' ? user.short_id : user.unique_id
}

/** 作品推送图片渲染参数 */
export interface RenderWorkImageOptions {
  /** Karin 消息事件，传递给 Render 用于获取 bot 信息 */
  e: Message
  /** 作品详情数据，包含 user_info、statistics、author 等字段 */
  Detail_Data: any
  /** 作品创建时间（Unix 时间戳，秒） */
  create_time: number
  /** 分享链接地址 */
  shareLink: string
  /** 是否跳过水印嵌入（推送场景为 true，避免重复水印） */
  skipWatermark?: boolean
  /** 推送类型标签，显示在图片头部 */
  dynamicTypeLabel?: string
}

/**
 * 渲染作品推送图片
 * 根据作品类型（文章/视频/图文）自动选择对应模板进行渲染
 * 支持视频、图集、文章三种作品类型，未知类型返回空数组
 * @param options - 渲染参数
 * @returns 渲染后的图片元素数组
 */
export async function renderWorkImage (options: RenderWorkImageOptions): Promise<ImageElement[]> {
  const { e, Detail_Data, create_time, shareLink, skipWatermark = false } = options
  const dynamicTypeLabel = options.dynamicTypeLabel ?? '作品动态推送'
  const workTypeInfo = getWorkTypeInfo(Detail_Data)
  const coverUrl = getWorkCoverUrl(workTypeInfo, Detail_Data)
  const formatTime = format(fromUnixTime(create_time), 'yyyy-MM-dd HH:mm')
  const user = Detail_Data.user_info.data.user
  const userDouyinId = douyinId(user)
  const avatarUrl = cdnAvatar(user.avatar_larger.uri)
  const authorNickname = Detail_Data.author?.nickname ?? user.nickname
  const cooperationInfo = buildCooperationInfo(Detail_Data)

  const renderOpts = skipWatermark ? { skipWatermark: true } : undefined

  switch (workTypeInfo.mainType) {
    case DouyinWorkMainType.ARTICLE: {
      const content = JSON.parse(Detail_Data.article_info.article_content)
      const fe_data = JSON.parse(Detail_Data.article_info.fe_data)
      return await Render(e, 'douyin/article-work', {
        title: Detail_Data.article_info.article_title,
        markdown: content.markdown,
        images: fe_data.image_list || [],
        read_time: fe_data.read_time || 0,
        dianzan: Count(Detail_Data.statistics.digg_count),
        pinglun: Count(Detail_Data.statistics.comment_count),
        shouchang: Count(Detail_Data.statistics.collect_count),
        share: Count(Detail_Data.statistics.share_count),
        create_time: formatTime,
        avater_url: avatarUrl,
        username: authorNickname,
        抖音号: userDouyinId,
        获赞: Count(user.total_favorited),
        关注: Count(user.following_count),
        粉丝: Count(user.follower_count),
        share_url: Detail_Data.share_url
      }, renderOpts)
    }

    case DouyinWorkMainType.VIDEO: {
      return await Render(e, 'douyin/video-work', {
        image_url: coverUrl,
        desc: desc(Detail_Data.desc),
        dianzan: Count(Detail_Data.statistics.digg_count),
        pinglun: Count(Detail_Data.statistics.comment_count),
        share: Count(Detail_Data.statistics.share_count),
        shouchang: Count(Detail_Data.statistics.collect_count),
        create_time: formatTime,
        avater_url: avatarUrl,
        share_url: shareLink,
        username: user.nickname,
        抖音号: userDouyinId,
        粉丝: Count(user.follower_count),
        获赞: Count(user.total_favorited),
        关注: Count(user.following_count),
        dynamicTYPE: dynamicTypeLabel,
        cooperation_info: cooperationInfo
      }, renderOpts)
    }

    case DouyinWorkMainType.IMAGE: {
      const cover = Detail_Data.images?.[0]?.url_list[2]
        ?? Detail_Data.images?.[0]?.url_list[1]
        ?? coverUrl
      return await Render(e, 'douyin/image-work', {
        image_url: cover,
        image_list: buildImageList(Detail_Data.images),
        desc: desc(Detail_Data.desc),
        dianzan: Count(Detail_Data.statistics.digg_count),
        pinglun: Count(Detail_Data.statistics.comment_count),
        share: Count(Detail_Data.statistics.share_count),
        shouchang: Count(Detail_Data.statistics.collect_count),
        create_time: formatTime,
        avater_url: avatarUrl,
        share_url: shareLink,
        username: user.nickname,
        抖音号: userDouyinId,
        粉丝: Count(user.follower_count),
        获赞: Count(user.total_favorited),
        关注: Count(user.following_count),
        dynamicTYPE: dynamicTypeLabel,
        cooperation_info: cooperationInfo
      }, renderOpts)
    }

    default:
      return []
  }
}

/** 喜欢列表/推荐列表推送图片渲染参数 */
export interface RenderFavoriteRecommendOptions {
  /** Karin 消息事件 */
  e: Message
  /** 作品详情数据，包含 user_info（订阅者/推荐者）、author（作品作者）、author_user_info（作者用户信息）、statistics */
  Detail_Data: any
  /** 作品创建时间（Unix 时间戳，秒） */
  create_time: number
  /** 分享链接地址 */
  shareLink: string
  /** 订阅者/推荐者昵称（remark） */
  remark: string
  /** 是否跳过水印 */
  skipWatermark?: boolean
}

/**
 * 渲染喜欢列表推送图片
 * 展示用户喜欢的作品，同时显示点赞者和作品原作者的信息
 * @param options - 渲染参数
 * @returns 渲染后的图片元素数组
 */
export async function renderFavoriteImage (options: RenderFavoriteRecommendOptions): Promise<ImageElement[]> {
  const { e, Detail_Data, create_time, shareLink, remark, skipWatermark = false } = options
  const workTypeInfo = getWorkTypeInfo(Detail_Data)
  const coverUrl = getWorkCoverUrl(workTypeInfo, Detail_Data)
  const authorUserInfo = Detail_Data.author_user_info
  const subscriberUser = Detail_Data.user_info.data.user

  return await Render(e, 'douyin/favorite-list', {
    image_url: coverUrl,
    desc: desc(Detail_Data.desc),
    dianzan: Count(Detail_Data.statistics.digg_count),
    pinglun: Count(Detail_Data.statistics.comment_count),
    share: Count(Detail_Data.statistics.share_count),
    shouchang: Count(Detail_Data.statistics.collect_count),
    tuijian: Count(Detail_Data.statistics.recommend_count),
    create_time: format(fromUnixTime(create_time), 'yyyy-MM-dd HH:mm'),
    liker_username: remark,
    liker_avatar: cdnAvatar(subscriberUser.avatar_larger.uri),
    liker_douyin_id: douyinId(subscriberUser),
    author_username: Detail_Data.author.nickname,
    author_avatar: authorUserInfo ? cdnAvatar(authorUserInfo.data.user.avatar_larger.uri) : Detail_Data.author.avatar_thumb.url_list[0],
    author_douyin_id: authorUserInfo ? douyinId(authorUserInfo.data.user) : douyinId(Detail_Data.author),
    share_url: shareLink
  }, skipWatermark ? { skipWatermark: true } : undefined)
}

/**
 * 渲染推荐列表推送图片
 * 展示用户推荐的作品，同时显示推荐者和作品原作者的信息
 * @param options - 渲染参数
 * @returns 渲染后的图片元素数组
 */
export async function renderRecommendImage (options: RenderFavoriteRecommendOptions): Promise<ImageElement[]> {
  const { e, Detail_Data, create_time, shareLink, remark, skipWatermark = false } = options
  const workTypeInfo = getWorkTypeInfo(Detail_Data)
  const coverUrl = getWorkCoverUrl(workTypeInfo, Detail_Data)
  const authorUserInfo = Detail_Data.author_user_info
  const recommenderUser = Detail_Data.user_info.data.user

  return await Render(e, 'douyin/recommend-list', {
    image_url: coverUrl,
    desc: desc(Detail_Data.desc),
    dianzan: Count(Detail_Data.statistics.digg_count),
    pinglun: Count(Detail_Data.statistics.comment_count),
    share: Count(Detail_Data.statistics.share_count),
    shouchang: Count(Detail_Data.statistics.collect_count),
    tuijian: Count(Detail_Data.statistics.recommend_count),
    create_time: format(fromUnixTime(create_time), 'yyyy-MM-dd HH:mm'),
    recommender_username: remark,
    recommender_avatar: cdnAvatar(recommenderUser.avatar_larger.uri),
    recommender_douyin_id: douyinId(recommenderUser),
    author_username: Detail_Data.author.nickname,
    author_avatar: authorUserInfo ? cdnAvatar(authorUserInfo.data.user.avatar_larger.uri) : Detail_Data.author.avatar_thumb.url_list[0],
    author_douyin_id: authorUserInfo ? douyinId(authorUserInfo.data.user) : douyinId(Detail_Data.author),
    share_url: shareLink
  }, skipWatermark ? { skipWatermark: true } : undefined)
}

/** 直播状态推送图片渲染参数 */
export interface RenderLiveImageOptions {
  /** Karin 消息事件 */
  e: Message
  /** 直播详情数据，包含 user_info、room_data、live_data 等字段 */
  Detail_Data: any
  /** 是否跳过水印 */
  skipWatermark?: boolean
  /** 推送类型标签，显示在图片头部 */
  dynamicTypeLabel?: string
}

/**
 * 渲染直播状态推送图片
 * 展示直播间封面、主播信息、在线人数、分区等数据
 * 如果 room_data 或 live_data 缺失则返回空数组
 * @param options - 渲染参数
 * @returns 渲染后的图片元素数组
 */
export async function renderLiveImage (options: RenderLiveImageOptions): Promise<ImageElement[]> {
  const { e, Detail_Data, skipWatermark = false } = options
  const dynamicTypeLabel = options.dynamicTypeLabel ?? '直播动态推送'
  const user = Detail_Data.user_info.data.user

  if (!Detail_Data.room_data || !Detail_Data.live_data) return []

  const liveItem = Detail_Data.live_data.data.data.data[0]
  const room_data = Detail_Data.room_data
  //@ts-ignore
  const streamExtra = liveItem.stream_url?.extra
  const resolution = streamExtra
    ? `${streamExtra.width}x${streamExtra.height}`
    //@ts-ignore
    : liveItem.stream_url?.default_resolution

  return await Render(e, 'douyin/live', {
    //@ts-ignore
    image_url: liveItem.cover?.url_list[0],
    //@ts-ignore
    text: liveItem.title,
    partition_title: Detail_Data.live_data.data.data.partition_road_map?.partition?.title || '未知分区',
    room_id: room_data.owner.web_rid,
    //@ts-ignore
    online_viewers: Count(Number(liveItem.room_view_stats?.display_value)),
    //@ts-ignore
    total_viewers: liveItem.stats?.total_user_str || '',
    username: user.nickname,
    avater_url: cdnAvatar(user.avatar_larger.uri),
    fans: Count(user.follower_count),
    share_url: 'https://live.douyin.com/' + room_data.owner.web_rid,
    dynamicTYPE: dynamicTypeLabel,
    //@ts-ignore
    like_count: Count(Number(liveItem.like_count || 0)),
    //@ts-ignore
    user_count_str: liveItem.user_count_str || '',
    resolution,
    signature: user.signature || '',
    //@ts-ignore
    city: user.city || '',
    aweme_count: Count(user.aweme_count || 0),
    following_count: Count(user.following_count || 0),
    total_favorited: Count(user.total_favorited || 0),
    //@ts-ignore
    has_commerce_goods: liveItem.has_commerce_goods || false
  }, skipWatermark ? { skipWatermark: true } : undefined)
}
