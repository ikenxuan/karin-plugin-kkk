import { randomBytes } from 'node:crypto'

import { segment, type ElementTypes, type KarinButton, type Message } from 'node-karin'

import { Common } from '@/module/utils/Common'

/** 选集会话有效期，单位秒 */
export const EPISODE_SELECTION_TTL_SECONDS = 120
/** 平台撤回窗口 120 秒，决策线留 10 秒余量 */
export const EPISODE_SELECTION_RECALL_WINDOW_MS = 110_000
/** 每页最多展示的集数，海报和按钮共用同一套页码 */
export const EPISODE_SELECTION_PAGE_SIZE = 15
/** QQBot 键盘每行最多 5 个按钮 */
export const EPISODE_SELECTION_BUTTONS_PER_ROW = 5
/** 每个会话最多缓存几张海报，避免长番剧来回翻页把图片全留在内存里 */
const MAX_CACHED_POSTERS = 3
/** 会话表上限，防止异常流量无限堆积 */
const MAX_SESSIONS = 500

/** 句中的「第N集」，集数可以是阿拉伯数字或中文数字，数字两侧允许空格 */
const EPISODE_IN_TEXT = /第\s*([0-9]+|[零一二三四五六七八九十百千]+)\s*集/
/** 整条回复只有集数：「12」「12集」「十二」 */
const EPISODE_ONLY = /^([0-9]+|[零一二三四五六七八九十百千]+)\s*集?$/

export type EpisodeSelectionScene = 'friend' | 'group'
export type EpisodeSelectionPlatform = 'douyin' | 'bilibili'

export interface DouyinEpisodeTarget {
  platform: 'douyin'
  awemeId: string
}

export interface BilibiliEpisodeTarget {
  platform: 'bilibili'
  epId: string
}

export type EpisodeSelectionTarget = DouyinEpisodeTarget | BilibiliEpisodeTarget

export interface EpisodeSelectionEpisode {
  /** 用户看到的实际集号 */
  episode: number
  target: EpisodeSelectionTarget
}

export interface CreateEpisodeSelectionOptions {
  title: string
  platform: EpisodeSelectionPlatform
  scene: EpisodeSelectionScene
  /** 发起选集的用户 ID；只有本人能翻页/选集 */
  ownerId: string
  poster: ElementTypes[]
  /** 每页集数，默认 15（海报和按钮共用）；抖音合集海报是整张图，可传 5 */
  pageSize?: number
  /** 初始海报对应的海报页码，默认 1 */
  posterPage?: number
  /** 按海报页码懒渲染海报；不提供时所有页码都复用 poster */
  renderPoster?: (page: number) => Promise<ElementTypes[]>
  episodes: EpisodeSelectionEpisode[]
  forceBurnDanmaku?: boolean
}

export interface EpisodeSelectionSession {
  token: string
  scope: string
  title: string
  platform: EpisodeSelectionPlatform
  scene: EpisodeSelectionScene
  /** 发起选集的用户 ID；QQBot 按钮据此设置点击权限，命令侧也用它校验 */
  ownerId: string
  /** 每页集数 */
  pageSize: number
  /** 初始海报（海报第 1 页或创建时指定页） */
  poster: ElementTypes[]
  /** 已渲染的海报页缓存，key 为海报页码 */
  posterPages: Map<number, ElementTypes[]>
  /** 按海报页码渲染海报；文字选集/短合集没有分页时不设置 */
  renderPoster?: (page: number) => Promise<ElementTypes[]>
  episodes: EpisodeSelectionEpisode[]
  forceBurnDanmaku: boolean
  expiresAt: number
  /** 当前选集消息 ID，用于翻页时撤回上一页 */
  currentMessageId: string
  /** 当前选集消息发送时间 */
  currentMessageSentAt: number
}

export interface EpisodeSelectionPage {
  page: number
  pageCount: number
  items: EpisodeSelectionEpisode[]
  firstEpisode: number
  lastEpisode: number
}

export type EpisodeSelectionAction = { type: 'page'; page: number } | { type: 'episode'; episode: number }
export type EpisodePosterPageAction = { type: 'prev' } | { type: 'next' } | { type: 'page'; page: number }

/**
 * 支持按钮 + 上下文交互选集的适配器。
 * 目前只有 QQBot；后续适配器确认支持 callback 按钮和指令按钮（输入框）后再加入。
 */
const BUTTON_SELECTION_PROTOCOLS = new Set(['qqbot'])

const sessions = new Map<string, EpisodeSelectionSession>()
const parseStatSkipped = new WeakSet<Message>()
const bilibiliAutoSelectEvents = new WeakSet<Message>()

/**
 * 从用户输入中解析集数。
 * @param text 用户输入
 * @returns 集数（从 1 开始）；没解析出来返回 null
 */
export const parseEpisodeNumber = (text: string): number | null => {
  const normalized = text.trim()
  const raw = (EPISODE_IN_TEXT.exec(normalized) ?? EPISODE_ONLY.exec(normalized))?.[1]
  if (!raw) return null
  const episode = /^[0-9]+$/.test(raw) ? Number(raw) : Common.chineseToArabic(raw)
  return Number.isInteger(episode) && episode > 0 ? episode : null
}

/** 解析 `#选集` 命令的第二个参数，支持页码和集数。 */
export const parseEpisodeSelectionAction = (action: string): EpisodeSelectionAction | null => {
  const pageMatch = /^page:\s*(\d+)$/.exec(action.trim())
  if (pageMatch) {
    const page = Number(pageMatch[1])
    return Number.isInteger(page) && page > 0 ? { type: 'page', page } : null
  }

  const episode = parseEpisodeNumber(action)
  return episode === null ? null : { type: 'episode', episode }
}

/**
 * 解析文字选集的翻页命令。
 * 支持「上一页」「下一页」「第12页」「十二页」「12页」「page:12」；
 * 单独的「12」仍然表示集数，避免和选集输入冲突。
 */
export const parseEpisodePosterPageAction = (text: string): EpisodePosterPageAction | null => {
  const normalized = text.trim()
  if (/^(?:上一页|上页|上一頁)$/.test(normalized)) return { type: 'prev' }
  if (/^(?:下一页|下页|下一頁)$/.test(normalized)) return { type: 'next' }

  const pageCommand = /^page:(\d+)$/.exec(normalized)
  const rawPage = pageCommand?.[1] ?? /^(?:第\s*)?([0-9]+|[零一二三四五六七八九十百千]+)\s*页$/.exec(normalized)?.[1]
  if (!rawPage) return null
  const page = /^[0-9]+$/.test(rawPage) ? Number(rawPage) : Common.chineseToArabic(rawPage)
  return Number.isInteger(page) && page > 0 ? { type: 'page', page } : null
}

/** 生成会话作用域；群聊内所有人共用，私聊只绑定当前用户。 */
export const getEpisodeSelectionScope = (event: Pick<Message, 'selfId' | 'contact'>): string => {
  const subPeer = event.contact.subPeer || ''
  return `${event.selfId}:${event.contact.peer}:${subPeer}`
}

/** 当前适配器是否支持按钮 + 上下文交互选集（目前为 QQBot 群聊/单聊）。 */
export const isButtonSelectionScene = (event: Message): boolean => {
  return BUTTON_SELECTION_PROTOCOLS.has(event.bot.adapter.protocol) && (event.isGroup || event.isFriend)
}

/** 标记本次解析只负责发选集，不计入解析统计。 */
export const markParseStatSkipped = (event: Message): void => {
  parseStatSkipped.add(event)
}

/** 消费一次性统计跳过标记。 */
export const consumeParseStatSkip = (event: Message): boolean => {
  return parseStatSkipped.delete(event)
}

/** 标记本次 B 站 ep 解析来自选集按钮，需要直接选中对应集。 */
export const markBilibiliEpisodeAutoSelect = (event: Message): void => {
  bilibiliAutoSelectEvents.add(event)
}

/** 消费一次 B 站自动选集标记，用户分享的 ep 链接不会命中。 */
export const consumeBilibiliEpisodeAutoSelect = (event: Message): boolean => {
  return bilibiliAutoSelectEvents.delete(event)
}

const cleanupExpiredSessions = (): void => {
  const now = Date.now()
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token)
  }
}

const createToken = (): string => {
  for (;;) {
    const token = randomBytes(6).toString('base64url')
    if (!sessions.has(token)) return token
  }
}

/**
 * 创建一次选集会话。
 * @param scope 由 {@link getEpisodeSelectionScope} 生成
 * @param options 海报、剧集和平台信息
 * @returns 可放进按钮 data 的短 token 会话
 */
export const createEpisodeSelection = (scope: string, options: CreateEpisodeSelectionOptions): EpisodeSelectionSession => {
  cleanupExpiredSessions()
  if (sessions.size >= MAX_SESSIONS) {
    const oldest = sessions.keys().next().value
    if (oldest) sessions.delete(oldest)
  }

  const session: EpisodeSelectionSession = {
    token: createToken(),
    scope,
    title: options.title,
    platform: options.platform,
    scene: options.scene,
    ownerId: options.ownerId,
    pageSize: Math.max(1, options.pageSize ?? EPISODE_SELECTION_PAGE_SIZE),
    poster: options.poster,
    posterPages: new Map([[options.posterPage ?? 1, options.poster]]),
    renderPoster: options.renderPoster,
    episodes: options.episodes,
    forceBurnDanmaku: options.forceBurnDanmaku ?? false,
    expiresAt: Date.now() + EPISODE_SELECTION_TTL_SECONDS * 1000,
    currentMessageId: '',
    currentMessageSentAt: 0
  }
  sessions.set(session.token, session)
  return session
}

/** 任务结束后立即关闭会话，旧按钮再次点击时只提示不再解析。 */
export const endEpisodeSelection = (token: string, scope: string): boolean => {
  const session = sessions.get(token)
  if (!session || session.scope !== scope) return false
  return sessions.delete(token)
}

/** 读取有效会话；token 不存在、scope 不匹配或已过期时返回 null。 */
export const getEpisodeSelection = (token: string, scope: string): EpisodeSelectionSession | null => {
  const session = sessions.get(token)
  if (!session) return null
  if (session.scope !== scope) return null
  if (session.expiresAt <= Date.now()) {
    sessions.delete(token)
    return null
  }
  return session
}

/**
 * 判断用户是否有权操作这次选集。
 * 只有发起人本人能翻页/选集；没有记录发起人时退回旧行为（不做限制）。
 */
export const isEpisodeSelectionOwner = (session: EpisodeSelectionSession, userId: string): boolean => {
  return !session.ownerId || session.ownerId === userId
}

/** 翻页成功后重新计算 120 秒有效期。 */
export const touchEpisodeSelection = (token: string, scope: string): boolean => {
  const session = getEpisodeSelection(token, scope)
  if (!session) return false
  session.expiresAt = Date.now() + EPISODE_SELECTION_TTL_SECONDS * 1000
  return true
}

/** 记录当前选集消息，供下一次翻页撤回。 */
export const setEpisodeSelectionMessage = (session: EpisodeSelectionSession, messageId: string, sentAt = Date.now()): void => {
  session.currentMessageId = messageId
  session.currentMessageSentAt = messageId ? sentAt : 0
}

/** 只有距离发送不超过 110 秒时才尝试撤回，避免顶格撞平台 120 秒窗口。 */
export const canRecallEpisodeMessage = (messageId: string, sentAt: number, now = Date.now()): boolean => {
  if (!messageId || !sentAt) return false
  const age = now - sentAt
  return age >= 0 && age <= EPISODE_SELECTION_RECALL_WINDOW_MS
}

/** 会话里记录的当前消息是否还能撤回。 */
export const canRecallEpisodeSelectionMessage = (session: EpisodeSelectionSession, now = Date.now()): boolean => {
  return canRecallEpisodeMessage(session.currentMessageId, session.currentMessageSentAt, now)
}

/** 总页数；海报和按钮共用。空选集返回 0。 */
export const getEpisodePageCount = (session: EpisodeSelectionSession): number => {
  return Math.ceil(session.episodes.length / session.pageSize)
}

/** 取指定页；页码越界返回 null。 */
export const getEpisodePage = (session: EpisodeSelectionSession, page: number): EpisodeSelectionPage | null => {
  if (!Number.isInteger(page) || page < 1) return null
  const pageCount = getEpisodePageCount(session)
  if (page > pageCount) return null

  const start = (page - 1) * session.pageSize
  const items = session.episodes.slice(start, start + session.pageSize)
  if (!items.length) return null

  // 剧集按展示顺序传入（B 站最新一集在前），范围也按展示顺序取首尾
  return {
    page,
    pageCount,
    items,
    firstEpisode: items[0].episode,
    lastEpisode: items[items.length - 1].episode
  }
}

/** 取海报页（按需渲染并缓存）；没有分页渲染器时始终返回初始海报。 */
export const getEpisodeSelectionPoster = async (
  session: EpisodeSelectionSession,
  posterPage: number
): Promise<ElementTypes[]> => {
  const cached = session.posterPages.get(posterPage)
  if (cached) return cached
  if (!session.renderPoster) return session.poster

  const poster = await session.renderPoster(posterPage)
  session.posterPages.set(posterPage, poster)
  // Map 保持插入顺序，超限时删最旧的页
  while (session.posterPages.size > MAX_CACHED_POSTERS) {
    const oldest = session.posterPages.keys().next().value
    if (oldest === undefined) break
    session.posterPages.delete(oldest)
  }
  return poster
}

/**
 * 生成 QQBot keyboard 行。
 * 跳转输入行在最上面，集数按钮每行 5 个，翻页按钮单独一行；
 * 15 集一页时正好 1 + 3 + 1 = 5 行，不会超过 QQBot 的上限。
 * 每个按钮都带发起人的点击权限（QQBot 原生 permission），别人点了不生效。
 */
export const buildEpisodeKeyboardRows = (session: EpisodeSelectionSession, page: number): KarinButton[][] => {
  const data = getEpisodePage(session, page)
  if (!data) return []

  // QQBot 原生按钮权限：只有发起人能点；没有发起人 ID 时不加限制
  const ownerPermission: Pick<KarinButton, 'list'> = session.ownerId ? { list: [session.ownerId] } : {}
  const rows: KarinButton[][] = []

  // 指令按钮（不带 callback/link）点击后把 data 填进输入框，用户补页码再发送；
  // 不用内嵌 Markdown，避免 segment.text 变长。
  if (data.pageCount > 1) {
    rows.push([
      {
        text: '跳转到第x页',
        data: `#选集 ${session.token} page:`,
        enter: false,
        style: 1,
        ...ownerPermission
      }
    ])
  }

  for (let index = 0; index < data.items.length; index += EPISODE_SELECTION_BUTTONS_PER_ROW) {
    rows.push(
      data.items.slice(index, index + EPISODE_SELECTION_BUTTONS_PER_ROW).map((item) => ({
        text: String(item.episode),
        show: String(item.episode),
        callback: true,
        data: `#选集 ${session.token} ${item.episode}`,
        style: 1,
        ...ownerPermission
      }))
    )
  }

  const navigation: KarinButton[] = []
  if (data.page > 1) {
    navigation.push({ text: '上一页', callback: true, data: `#选集 ${session.token} page:${data.page - 1}`, ...ownerPermission })
  }
  if (data.page < data.pageCount) {
    navigation.push({ text: '下一页', callback: true, data: `#选集 ${session.token} page:${data.page + 1}`, ...ownerPermission })
  }
  if (navigation.length) rows.push(navigation)

  return rows
}

/** 生成选集提示文本。 */
export const buildEpisodeSelectionText = (session: EpisodeSelectionSession, page: number): string => {
  const data = getEpisodePage(session, page)
  if (!data) return ''
  const range =
    data.firstEpisode === data.lastEpisode ? `第 ${data.firstEpisode} 集` : `第 ${data.firstEpisode}–${data.lastEpisode} 集`
  // 群聊里所有人都看得到海报和按钮，提前说明按钮只对发起人生效
  const ownerHint = session.scene === 'group' ? '，仅发起人可操作' : ''
  return (
    `《${session.title}》\n` +
    `${range} · 第 ${data.page}/${data.pageCount} 页\n` +
    `点击下方按钮选集（${EPISODE_SELECTION_TTL_SECONDS} 秒内有效${ownerHint}）。`
  )
}

/** 按实际集号查找目标。 */
export const resolveEpisodeTarget = (session: EpisodeSelectionSession, episode: number): EpisodeSelectionTarget | null => {
  return session.episodes.find((item) => item.episode === episode)?.target ?? null
}

/** 生成现有解析命令能识别的目标链接。 */
export const buildEpisodeTargetUrl = (target: EpisodeSelectionTarget): string => {
  return target.platform === 'douyin'
    ? `https://www.douyin.com/video/${target.awemeId}`
    : `https://www.bilibili.com/bangumi/play/ep${target.epId}`
}

/**
 * 组装 QQBot 选集消息：复用已渲染海报，并附当前页文本和 keyboard。
 * 海报按需传入（翻页跨 15 集区块时由调用方重新渲染），默认复用初始海报。
 */
export const buildEpisodeSelectionReply = (
  session: EpisodeSelectionSession,
  page: number,
  poster: ElementTypes[] = session.poster
): ElementTypes[] => {
  const text = buildEpisodeSelectionText(session, page)
  const rows = buildEpisodeKeyboardRows(session, page)

  const elements: ElementTypes[] = [...poster, segment.text(text)]
  if (rows.length) elements.push(segment.keyboard(rows))
  return elements
}
