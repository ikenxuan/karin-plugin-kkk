import {
  createHashtagNode,
  createLineBreakNode,
  createMentionNode,
  createRichTextDocument,
  createTextNode,
  type RichTextDocument,
  type RichTextNode
} from '@kkk/richtext'
import { format, fromUnixTime } from 'date-fns'
import type { ImageElement, Message } from 'node-karin'

import { Count, Render } from '@/module/utils'
import { douyinFetcher } from '@/module/utils/amagiClient'

import { DouyinWorkMainType, type DouyinWorkTypeInfo, getWorkCoverUrl, getWorkTypeInfo } from '../workType'

/**
 * 处理作品描述
 * @param Desc - 作品原始描述文本
 * @returns 如果描述为空则返回默认提示，否则返回原文
 */
function desc(Desc: string) {
  return Desc === '' ? '该作品没有描述' : Desc
}

/**
 * 构建合作信息数据
 * 从作品详情中提取创作者合作信息，包括合作者列表和订阅者角色
 * @param Detail_Data - 作品详情数据，包含 cooperation_info、user_info、author 等字段
 * @returns 合作信息对象，如果不存在则返回 undefined
 */
function buildCooperationInfo(Detail_Data: any):
  | {
      co_creator_nums: number
      co_creators: Array<{
        avatar_url?: string
        nickname: string
        role_title: string
      }>
      subscriber_role?: string
    }
  | undefined {
  const raw = Detail_Data.cooperation_info
  if (!raw) return undefined

  const rawCreators = Array.isArray(raw.co_creators) ? raw.co_creators : []
  const subscriber = Detail_Data.user_info?.data?.user ?? Detail_Data.author

  const subscriberUid = subscriber?.uid
  const subscriberSecUid = subscriber?.sec_uid

  const subscriberInCreators = rawCreators.find(
    (c: { uid: string; sec_uid: string }) =>
      (subscriberUid && c.uid && c.uid === subscriberUid) || (subscriberSecUid && c.sec_uid && c.sec_uid === subscriberSecUid)
  )

  const co_creators = rawCreators.map(
    (c: { avatar_thumb: { url_list: (string | undefined)[]; uri: any }; nickname: any; role_title: any }) => {
      const avatarUrl =
        c.avatar_thumb?.url_list?.[0] ?? (c.avatar_thumb?.uri ? `https://p3.douyinpic.com/${c.avatar_thumb.uri}` : undefined)

      return {
        avatar_url: avatarUrl,
        nickname: c.nickname,
        role_title: c.role_title
      }
    }
  )

  if (
    Detail_Data.author &&
    !rawCreators.some(
      (c: { uid: string; sec_uid: string; nickname: string }) =>
        (Detail_Data.author?.uid && c.uid && c.uid === Detail_Data.author.uid) ||
        (Detail_Data.author?.sec_uid && c.sec_uid && c.sec_uid === Detail_Data.author.sec_uid) ||
        (Detail_Data.author?.nickname && c.nickname && c.nickname === Detail_Data.author.nickname)
    )
  ) {
    co_creators.unshift({
      avatar_url:
        Detail_Data.author.avatar_thumb?.url_list?.[0] ??
        (Detail_Data.author.avatar_thumb?.uri ? `https://p3.douyinpic.com/${Detail_Data.author.avatar_thumb.uri}` : undefined),
      nickname: Detail_Data.author.nickname,
      role_title: '作者'
    })
  }

  return {
    co_creator_nums: Math.max(Number(raw.co_creator_nums || 0), co_creators.length),
    co_creators,
    subscriber_role:
      subscriberInCreators?.role_title ??
      ((subscriberUid && Detail_Data.author?.uid && subscriberUid === Detail_Data.author.uid) ||
      (subscriberSecUid && Detail_Data.author?.sec_uid && subscriberSecUid === Detail_Data.author.sec_uid) ||
      (subscriber?.nickname && Detail_Data.author?.nickname && subscriber.nickname === Detail_Data.author.nickname)
        ? '作者'
        : undefined)
  }
}

/**
 * 构建 Douyin CDN 头像 URL
 * @param uri - 头像资源的 URI 标识
 * @returns 完整的 1080x1080 分辨率头像 CDN 地址
 */
function cdnAvatar(uri: string): string {
  return 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + uri
}

/**
 * 获取作品作者头像，优先沿用用户主页的高清头像，解析侧缺少主页数据时回退到作品作者头像。
 */
function getUserAvatar(user: any): string {
  if (user?.avatar_larger?.uri) return cdnAvatar(user.avatar_larger.uri)
  return pickImageUrl(user?.avatar_larger, user?.avatar_medium, user?.avatar_thumb) ?? ''
}

/** 图文内单张媒体的模板类型。 */
type ImageMediaType = 'static' | 'live' | 'clip'

/**
 * 解析图文/合辑中单张图片的媒体类型。
 * clip_type 规则参考普通解析逻辑：2/空为静态图，5 为实况动图，4 为短片。
 * @param image - 抖音 images 数组中的单项
 * @returns 模板可识别的媒体类型
 */
function getImageMediaType(image: { clip_type?: number } | null | undefined): ImageMediaType {
  switch (image?.clip_type) {
    case 4:
      return 'clip'
    case 5:
      return 'live'
    case 2:
    case undefined:
    default:
      return 'static'
  }
}

/**
 * 构建图文作品图片列表。
 * 第一项为封面，保留全部后续图片供模板从索引 1 起按需预览，并在每项上携带媒体类型。
 * @param images - 作品原始图片数组，每项包含 url_list（多分辨率 URL）
 * @param fallbackCover - images 缺失时使用的兜底封面
 * @returns 图片列表数据
 */
function buildImageList(
  images: Array<{ url_list: string[]; clip_type?: number }> | null | undefined,
  fallbackCover: string
): {
  images: Array<{
    url: string
    media_type: ImageMediaType
  }>
  total_count: number
} {
  if (!images || images.length === 0) {
    return {
      images: fallbackCover ? [{ url: fallbackCover, media_type: 'static' }] : [],
      total_count: fallbackCover ? 1 : 0
    }
  }

  const usedUrls = new Set<string>()
  const imageItems = images
    .map((img, index) => ({
      url:
        index === 0
          ? (img.url_list[2] ?? img.url_list[1] ?? img.url_list[0] ?? fallbackCover)
          : (img.url_list[1] ?? img.url_list[0] ?? img.url_list[2] ?? ''),
      media_type: getImageMediaType(img)
    }))
    .filter((item) => {
      if (!item.url) return false
      const key = normalizeImageUrl(item.url)
      if (usedUrls.has(key)) return false
      usedUrls.add(key)
      return true
    })

  return {
    images: imageItems,
    total_count: images.length
  }
}

/**
 * 去掉签名参数，避免同一张图因 CDN 查询参数不同被重复放入预览列表。
 * @param url - 原始图片 URL
 * @returns 用于去重的稳定 URL key
 */
function normalizeImageUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return `${parsed.host}${parsed.pathname}`
  } catch {
    return url.split('?')[0]
  }
}

/**
 * 将作品描述按首句句号/感叹号/问号拆分为标题和正文
 * @param desc - 原始描述文本
 * @returns `{ title, body }`，若无句点分隔符则 title 为空字符串
 */
function splitTitleAndBody(desc: string): { title: string; body: string } {
  const match = desc.match(/^[^。！？!?\n]*[。！？!?]/)
  if (!match) return { title: '', body: desc }
  const title = match[0].replace(/[。！？!?]$/, '')
  const body = desc.slice(match[0].length)
  return { title, body }
}

type DouyinDescTextExtra = {
  start?: number
  end?: number
  hashtag_name?: string
  hashtag_id?: string
  sec_uid?: string
  type?: number
}

type DouyinDescRichTextToken = {
  start: number
  end: number
  kind: 'hashtag' | 'mention'
  text: string
  userId?: string
}

type DouyinMentionToken = {
  start: number
  end: number
  text: string
  userId: string
}

/**
 * 根据抖音作品描述和 text_extra 构建富文本文档
 * 普通正文走 text 节点，换行走 lineBreak 节点，hashtag 与有效 @ 用户走高亮节点。
 * @param body - 需要编排的文本片段
 * @param textExtra - 抖音作品 text_extra 数组
 * @param titleOffset - 当前片段在原始 desc 中的起始偏移字符数
 * @param mentionCache - 本次渲染内复用的 @ 校验结果，避免重复请求同一个用户主页
 * @returns 构建好的 RichTextDocument
 */
async function buildDescRichText(
  text: string,
  textExtra?: DouyinDescTextExtra[],
  titleOffset = 0,
  mentionCache: Map<string, string | null> = new Map()
): Promise<RichTextDocument> {
  if (!text) return createRichTextDocument([], { platform: 'douyin' })

  const tokens = [
    ...extractHashtagTokens(text, textExtra, titleOffset),
    ...(await resolveMentionTokens(text, textExtra, titleOffset, mentionCache)).map((item) => ({
      start: item.start,
      end: item.end,
      kind: 'mention' as const,
      text: item.text,
      userId: item.userId
    }))
  ].sort((a, b) => a.start - b.start || b.end - b.start - (a.end - a.start))

  const nodes: RichTextNode[] = []
  let cursor = 0

  for (const token of tokens) {
    if (token.start < cursor) continue
    const before = text.slice(cursor, token.start)
    appendTextSegments(before, nodes)
    if (token.kind === 'hashtag') {
      nodes.push(createHashtagNode(token.text))
    } else {
      nodes.push(createMentionNode(token.text, token.userId))
    }
    cursor = token.end
  }

  appendTextSegments(text.slice(cursor), nodes)
  return createRichTextDocument(nodes, { platform: 'douyin' })
}

function extractHashtagTokens(body: string, textExtra: DouyinDescTextExtra[] | undefined, titleOffset = 0): DouyinDescRichTextToken[] {
  return (textExtra ?? [])
    .filter(
      (item): item is { start: number; end: number; hashtag_name: string; hashtag_id?: string; type: number } =>
        item.type === 1 && !!item.hashtag_name && typeof item.start === 'number' && typeof item.end === 'number'
    )
    .map((item) => ({
      start: item.start - titleOffset,
      end: item.end - titleOffset,
      kind: 'hashtag' as const,
      text: '#' + item.hashtag_name
    }))
    .filter((item) => item.start >= 0 && item.end > item.start && item.end <= body.length)
    .filter((item) => body.slice(item.start, item.end) === item.text)
}

/**
 * 根据 text_extra 中的 sec_uid 反查当前昵称，并只在原文片段完全等于 @昵称 时生成 mention。
 * 这样可以过滤掉失效、改名或 text_extra 范围异常的 @。
 */
async function resolveMentionTokens(
  text: string,
  textExtra: DouyinDescTextExtra[] | undefined,
  titleOffset: number,
  mentionCache: Map<string, string | null>
): Promise<DouyinMentionToken[]> {
  const candidates = (textExtra ?? [])
    .filter(
      (item): item is { start: number; end: number; sec_uid: string; type: number } =>
        item.type === 0 &&
        typeof item.start === 'number' &&
        typeof item.end === 'number' &&
        typeof item.sec_uid === 'string' &&
        item.sec_uid.length > 0
    )
    .map((item) => ({
      start: item.start - titleOffset,
      end: item.end - titleOffset,
      sec_uid: item.sec_uid
    }))
    .filter((item) => item.start >= 0 && item.end > item.start && item.end <= text.length)

  if (candidates.length === 0) return []

  const uniqueSecUids = [...new Set(candidates.map((item) => item.sec_uid))]
  await Promise.all(
    uniqueSecUids.map(async (secUid) => {
      if (mentionCache.has(secUid)) return
      try {
        const userInfo = await douyinFetcher.fetchUserProfile({ sec_uid: secUid, typeMode: 'strict' })
        const user = userInfo.data.user
        const nickname = user.nickname?.trim()
        mentionCache.set(secUid, user.sec_uid === secUid && nickname ? `@${nickname}` : null)
      } catch {
        mentionCache.set(secUid, null)
      }
    })
  )

  return candidates.flatMap((item): DouyinMentionToken[] => {
    const mentionText = mentionCache.get(item.sec_uid)
    if (!mentionText) return []
    if (text.slice(item.start, item.end) !== mentionText) return []
    return [
      {
        start: item.start,
        end: item.end,
        text: mentionText,
        userId: item.sec_uid
      }
    ]
  })
}

/**
 * 将文本按换行拆分为 text 节点和 lineBreak 节点并推入目标数组
 */
function appendTextSegments(text: string, target: RichTextNode[]) {
  if (!text) return
  const parts = text.split(/(\r?\n)/)
  for (const part of parts) {
    if (part === '\r\n' || part === '\n') {
      target.push(createLineBreakNode())
    } else if (part) {
      target.push(createTextNode(part))
    }
  }
}

/**
 * 提取博主 IP 属地
 * @param Detail_Data - 作品详情数据
 * @returns IP 属地文本（如 "重庆"），不存在时返回 undefined
 */
function extractIpLocation(Detail_Data: any): string | undefined {
  let raw: string | undefined = Detail_Data.user_info?.data?.user?.ip_location
  if (!raw) raw = Detail_Data.ip_location
  if (!raw || typeof raw !== 'string') return undefined
  const label = raw.replace(/^IP属地[：:]?\s*/, '').trim()
  return label || undefined
}

/**
 * 从 suggest_words 中随机选择一条热点词
 * @param Detail_Data - 作品详情数据
 * @returns `{ hint_text, word }` 或 undefined
 */
function extractSuggestWord(Detail_Data: any): { hint_text: string; word: string } | undefined {
  const groups = Detail_Data.suggest_words?.suggest_words
  if (!Array.isArray(groups) || groups.length === 0) return undefined
  const group = groups[0]
  const words: Array<{ word?: string }> = Array.isArray(group?.words) ? group.words : []
  if (words.length === 0) return undefined
  const pick = words[Math.floor(Math.random() * words.length)]
  if (!pick?.word) return undefined
  return {
    hint_text: group.hint_text ?? '大家都在搜：',
    word: pick.word
  }
}

/**
 * 从抖音图片对象中提取第一个可用 URL。
 * @param images - 可能存在的多种封面对象
 * @returns 可直接渲染的图片 URL，不存在时返回 undefined
 */
function pickImageUrl(...images: any[]): string | undefined {
  for (const image of images) {
    const url = image?.url_list?.find((item: unknown): item is string => typeof item === 'string' && item.length > 0)
    if (url) return url
  }
  return undefined
}

/**
 * 安全解析 music.extra JSON。
 * @param extra - 抖音 music.extra 原始字符串
 * @returns 解析后的对象，解析失败时返回空对象
 */
function parseMusicExtra(extra: unknown): Record<string, any> {
  if (typeof extra !== 'string' || extra.length === 0) return {}
  try {
    return JSON.parse(extra)
  } catch {
    return {}
  }
}

/**
 * 构建图文作品 BGM 展示信息。
 * 优先使用 matched_pgc_sound 的标准曲目信息，再回退到原声/作者字段和 extra 中的映射标题。
 * @param music - 抖音作品 music 字段
 * @returns 可传给模板的音乐信息；无有效音乐数据时返回 undefined
 */
function buildMusicInfo(music: any): { author: string; title: string; cover?: string } | undefined {
  if (!music || typeof music !== 'object') return undefined

  const extra = parseMusicExtra(music.extra)
  const matched = music.matched_pgc_sound
  const title = matched?.title || matched?.mixed_title || extra.music_display_mapping_title || music.title
  const author = matched?.author || matched?.mixed_author || music.author || music.owner_nickname
  const cover = pickImageUrl(
    matched?.cover_medium,
    music.cover_hd,
    music.cover_large,
    music.cover_medium,
    music.cover_thumb,
    music.avatar_large,
    music.avatar_medium,
    music.avatar_thumb
  )

  if (!title && !author && !cover) return undefined

  return {
    title: title || '未知音乐',
    author: author || '未知作者',
    cover
  }
}

/**
 * 获取用户抖音号
 * @param user - 用户对象，包含 unique_id 和 short_id
 * @returns 优先返回抖音号（unique_id），为空则返回短 ID
 */
function douyinId(user: { unique_id?: string; short_id?: string }): string {
  return user.unique_id || user.short_id || ''
}

/** 作品信息图片渲染参数，供普通解析与推送共用。 */
export interface RenderWorkImageOptions {
  /** Karin 消息事件，传递给 Render 用于获取 bot 信息 */
  e: Message
  /** 作品详情数据，包含 statistics、author，可选包含用户主页 user_info */
  Detail_Data: any
  /** 作品创建时间（Unix 时间戳，秒） */
  create_time: number
  /** 分享链接地址 */
  shareLink: string
  /** 是否跳过水印嵌入（推送场景为 true，避免重复水印） */
  skipWatermark?: boolean
  /** 作品类型标签，显示在图片头部 */
  dynamicTypeLabel?: string
}

/**
 * 根据作品类型计算默认推送标签
 * @param workTypeInfo - 作品类型信息
 * @returns 视频/图文/合辑/文章/直播 之一的推送标签
 */
function getDefaultPushLabel(workTypeInfo: DouyinWorkTypeInfo): string {
  if (workTypeInfo.isVideo) return '视频作品推送'
  if (workTypeInfo.isArticle) return '文章作品推送'
  if (workTypeInfo.isCollection) return '合辑作品推送'
  if (workTypeInfo.isImage) return '图文作品推送'
  if (workTypeInfo.isLive) return '直播动态推送'
  return '作品动态推送'
}

/**
 * 渲染作品信息图片
 * 根据作品类型（文章/视频/图文/合辑）自动选择对应模板进行渲染
 * 类型标签按优先级：调用方显式传入 → 根据作品主/子类型自动计算推送标签
 * @param options - 渲染参数
 * @returns 渲染后的图片元素数组
 */
export async function renderWorkImage(options: RenderWorkImageOptions): Promise<ImageElement[]> {
  const { e, Detail_Data, create_time, shareLink, skipWatermark = false } = options
  const workTypeInfo = getWorkTypeInfo(Detail_Data)
  const dynamicTypeLabel = options.dynamicTypeLabel ?? getDefaultPushLabel(workTypeInfo)
  const coverUrl = getWorkCoverUrl(workTypeInfo, Detail_Data)
  const formatTime = format(fromUnixTime(create_time), 'yyyy-MM-dd HH:mm')
  const user = Detail_Data.user_info?.data?.user ?? Detail_Data.author
  if (!user) return []
  const userDouyinId = douyinId(user)
  const avatarUrl = getUserAvatar(user) || getUserAvatar(Detail_Data.author)
  const authorNickname = Detail_Data.author?.nickname ?? user.nickname
  const cooperationInfo = buildCooperationInfo(Detail_Data)
  const mentionCache = new Map<string, string | null>()

  const renderOpts = skipWatermark ? { skipWatermark: true } : undefined

  switch (workTypeInfo.mainType) {
    case DouyinWorkMainType.ARTICLE: {
      const content = JSON.parse(Detail_Data.article_info.article_content)
      const fe_data = JSON.parse(Detail_Data.article_info.fe_data)
      return await Render(
        e,
        'douyin/article-work',
        {
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
          share_url: shareLink
        },
        renderOpts
      )
    }

    case DouyinWorkMainType.VIDEO: {
      const rawDesc = Detail_Data.desc ?? ''
      const title = await buildDescRichText(desc(rawDesc), Detail_Data.text_extra, 0, mentionCache)
      const emptyDesc = createRichTextDocument([], { platform: 'douyin' })

      return await Render(
        e,
        'douyin/video-work',
        {
          image_url: coverUrl,
          title,
          desc: emptyDesc,
          ip_location: extractIpLocation(Detail_Data),
          suggest_word: extractSuggestWord(Detail_Data),
          music: buildMusicInfo(Detail_Data.music),
          duration: Detail_Data.duration,
          dianzan: Count(Detail_Data.statistics.digg_count),
          pinglun: Count(Detail_Data.statistics.comment_count),
          share: Count(Detail_Data.statistics.share_count),
          shouchang: Count(Detail_Data.statistics.collect_count),
          create_time,
          avater_url: avatarUrl,
          share_url: shareLink,
          username: user.nickname,
          抖音号: userDouyinId,
          粉丝: Count(user.follower_count),
          获赞: Count(user.total_favorited),
          关注: Count(user.following_count),
          dynamicTYPE: dynamicTypeLabel,
          cooperation_info: cooperationInfo
        },
        renderOpts
      )
    }

    case DouyinWorkMainType.IMAGE: {
      const cover = Detail_Data.images?.[0]?.url_list[2] ?? Detail_Data.images?.[0]?.url_list[1] ?? coverUrl
      const rawDesc = Detail_Data.desc ?? ''
      const splitDesc = splitTitleAndBody(rawDesc)
      const titleOffset = rawDesc.length - splitDesc.body.length
      const title = splitDesc.title ? await buildDescRichText(splitDesc.title, Detail_Data.text_extra, 0, mentionCache) : undefined
      const bodyText = splitDesc.title && !splitDesc.body ? '' : desc(splitDesc.body)
      const richDesc = await buildDescRichText(bodyText, Detail_Data.text_extra, titleOffset, mentionCache)
      return await Render(
        e,
        'douyin/image-work',
        {
          image_list: buildImageList(Detail_Data.images, cover),
          title,
          desc: richDesc,
          ip_location: extractIpLocation(Detail_Data),
          suggest_word: extractSuggestWord(Detail_Data),
          music: buildMusicInfo(Detail_Data.music),
          dianzan: Count(Detail_Data.statistics.digg_count),
          pinglun: Count(Detail_Data.statistics.comment_count),
          share: Count(Detail_Data.statistics.share_count),
          shouchang: Count(Detail_Data.statistics.collect_count),
          create_time,
          avater_url: avatarUrl,
          share_url: shareLink,
          username: user.nickname,
          抖音号: userDouyinId,
          粉丝: Count(user.follower_count),
          获赞: Count(user.total_favorited),
          关注: Count(user.following_count),
          dynamicTYPE: dynamicTypeLabel,
          cooperation_info: cooperationInfo
        },
        renderOpts
      )
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
export async function renderFavoriteImage(options: RenderFavoriteRecommendOptions): Promise<ImageElement[]> {
  const { e, Detail_Data, create_time, shareLink, remark, skipWatermark = false } = options
  const workTypeInfo = getWorkTypeInfo(Detail_Data)
  const coverUrl = getWorkCoverUrl(workTypeInfo, Detail_Data)
  const authorUserInfo = Detail_Data.author_user_info
  const subscriberUser = Detail_Data.user_info.data.user

  return await Render(
    e,
    'douyin/favorite-list',
    {
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
    },
    skipWatermark ? { skipWatermark: true } : undefined
  )
}

/**
 * 渲染推荐列表推送图片
 * 展示用户推荐的作品，同时显示推荐者和作品原作者的信息
 * @param options - 渲染参数
 * @returns 渲染后的图片元素数组
 */
export async function renderRecommendImage(options: RenderFavoriteRecommendOptions): Promise<ImageElement[]> {
  const { e, Detail_Data, create_time, shareLink, remark, skipWatermark = false } = options
  const workTypeInfo = getWorkTypeInfo(Detail_Data)
  const coverUrl = getWorkCoverUrl(workTypeInfo, Detail_Data)
  const authorUserInfo = Detail_Data.author_user_info
  const recommenderUser = Detail_Data.user_info.data.user

  return await Render(
    e,
    'douyin/recommend-list',
    {
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
    },
    skipWatermark ? { skipWatermark: true } : undefined
  )
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
export async function renderLiveImage(options: RenderLiveImageOptions): Promise<ImageElement[]> {
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
    : //@ts-ignore
      liveItem.stream_url?.default_resolution

  return await Render(
    e,
    'douyin/live',
    {
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
    },
    skipWatermark ? { skipWatermark: true } : undefined
  )
}
