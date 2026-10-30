/**
 * Emoji 表情回复工具模块
 */
import type { Message } from 'node-karin'

import { logger } from '@/module/utils/logger'

import { Config } from './Config'

/**
 * 各平台表情 ID 配置
 */
const PLATFORM_EMOJI_IDS = {
  qq: {
    /** 已读/注意：https://koishi.js.org/QFace/#/qqnt/%F0%9F%91%80 */
    EYES: 128064,
    /** 处理中：https://koishi.js.org/QFace/#/qqnt/366 */
    PROCESSING: 366,
    /** 成功完成：https://koishi.js.org/QFace/#/qqnt/389 */
    SUCCESS: 389,
    /** 失败：https://koishi.js.org/QFace/#/qqnt/379 */
    ERROR: 379
  },
  wechat: {
    /** 已读/注意 - 占位符 */
    EYES: 'WECHAT_EYES_PLACEHOLDER',
    /** 处理中 - 占位符 */
    PROCESSING: 'WECHAT_PROCESSING_PLACEHOLDER',
    /** 成功完成 - 占位符 */
    SUCCESS: 'WECHAT_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'WECHAT_ERROR_PLACEHOLDER'
  },
  telegram: {
    /** 已读/注意 - 占位符 */
    EYES: 'TELEGRAM_EYES_PLACEHOLDER',
    /** 处理中 - 占位符 */
    PROCESSING: 'TELEGRAM_PROCESSING_PLACEHOLDER',
    /** 成功完成 - 占位符 */
    SUCCESS: 'TELEGRAM_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'TELEGRAM_ERROR_PLACEHOLDER'
  },
  discord: {
    /** 已读/注意 */
    EYES: '👀',
    /** 处理中 */
    PROCESSING: '⏳',
    /** 成功完成 */
    SUCCESS: '✅',
    /** 失败 */
    ERROR: '❌'
  },
  koko: {
    /** 已读/注意 - 占位符 */
    EYES: 'KOKO_EYES_PLACEHOLDER',
    /** 处理中 - 占位符 */
    PROCESSING: 'KOKO_PROCESSING_PLACEHOLDER',
    /** 成功完成 - 占位符 */
    SUCCESS: 'KOKO_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'KOKO_ERROR_PLACEHOLDER'
  },
  other: {
    /** 已读/注意 - 占位符 */
    EYES: 'OTHER_EYES_PLACEHOLDER',
    /** 处理中 - 占位符 */
    PROCESSING: 'OTHER_PROCESSING_PLACEHOLDER',
    /** 成功完成 - 占位符 */
    SUCCESS: 'OTHER_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'OTHER_ERROR_PLACEHOLDER'
  }
} as const

/**
 * 表情类型
 */
export type EmojiType = 'EYES' | 'PROCESSING' | 'SUCCESS' | 'ERROR'

/**
 * 根据平台和表情类型获取表情 ID
 * @param e 消息事件对象
 * @param type 表情类型
 * @returns 表情 ID
 */
export function getEmojiId(e: Message, type: EmojiType): string | number {
  const platform = e.bot?.adapter?.platform || 'other'
  // node-karin 的 AdapterPlatform 联合里有本表未覆盖的取值（如 dingtalk），
  // 索引前先按「表里有没有这个键」收窄，缺的一律落到 other
  const platformEmojis =
    platform in PLATFORM_EMOJI_IDS ? PLATFORM_EMOJI_IDS[platform as keyof typeof PLATFORM_EMOJI_IDS] : PLATFORM_EMOJI_IDS.other
  return platformEmojis[type]
}

/**
 * 表情 ID 常量（向后兼容，使用 QQ 平台的 ID）
 * @deprecated 建议使用 getEmojiId 函数获取平台特定的表情 ID
 */
export const EMOJI_IDS = PLATFORM_EMOJI_IDS.qq

/** 同一条消息上的表情写操作按发起顺序串行执行：适配器并发处理时，后发的 remove 不能先于先发的 add 生效 */
const reactionChains = new WeakMap<Message, Promise<boolean>>()

/**
 * 设置消息表情回复
 * @param e 消息事件对象
 * @param emojiId 表情ID
 * @param isSet 是否设置表情（true=设置，false=取消），默认为 true
 * @returns 是否成功设置表情
 */
export async function setEmojiReaction(e: Message, emojiId: string | number, isSet: boolean = true): Promise<boolean> {
  // 如果未启用表情回复功能，直接返回
  if (!Config.app.EmojiReply) {
    return false
  }

  // 私聊不发送表情回复
  if (e.isPrivate) {
    return false
  }

  const write = async (): Promise<boolean> => {
    try {
      await e.bot.setMsgReaction(e.contact, e.messageId, emojiId, isSet)
      return true
    } catch (err) {
      // 始终忽略错误，不影响主流程
      logger.debug('[EmojiReaction] 设置表情回复失败（已忽略）:', err)
      return false
    }
  }

  // 串到上一条写操作之后：add/remove 交错发出时服务端处理顺序不保证，可能留下残影
  const previous = reactionChains.get(e)
  const current = previous ? previous.then(write, write) : write()
  reactionChains.set(e, current)
  return current
}

/**
 * 表情回复管理器
 */
export class EmojiReactionManager {
  private e: Message
  private emojiIds: Set<string | number> = new Set()

  constructor(e: Message) {
    this.e = e
  }

  /**
   * 根据表情类型获取平台特定的表情 ID
   * @param type 表情类型
   * @returns 表情 ID
   */
  private getPlatformEmojiId(type: EmojiType): string | number {
    return getEmojiId(this.e, type)
  }

  /**
   * 规范化表情 ID（如果是表情类型字符串，则转换为平台特定的 ID）
   * @param emojiId 表情ID 或表情类型
   * @returns 实际的表情 ID
   */
  private normalizeEmojiId(emojiId: string | number | EmojiType): string | number {
    return typeof emojiId === 'string' && ['EYES', 'PROCESSING', 'SUCCESS', 'ERROR'].includes(emojiId)
      ? this.getPlatformEmojiId(emojiId as EmojiType)
      : emojiId
  }

  /**
   * 添加表情
   * @param emojiId 表情ID 或表情类型
   * @returns 是否成功
   */
  async add(emojiId: string | number | EmojiType): Promise<boolean> {
    const actualEmojiId = this.normalizeEmojiId(emojiId)
    const success = await setEmojiReaction(this.e, actualEmojiId, true)
    if (success) {
      this.emojiIds.add(actualEmojiId)
    }
    return success
  }

  /**
   * 移除表情
   * @param emojiId 表情ID 或表情类型
   * @returns 是否成功
   */
  async remove(emojiId: string | number | EmojiType): Promise<boolean> {
    const actualEmojiId = this.normalizeEmojiId(emojiId)
    const success = await setEmojiReaction(this.e, actualEmojiId, false)
    if (success) {
      this.emojiIds.delete(actualEmojiId)
    }
    return success
  }

  /**
   * 替换表情（先添加新的，等待指定时间后移除旧的）
   * @param oldEmojiId 旧表情ID 或表情类型
   * @param newEmojiId 新表情ID 或表情类型
   * @param delayMs 添加新表情后等待多少毫秒再移除旧表情，默认 2000ms
   * @returns 是否成功
   */
  async replace(
    oldEmojiId: string | number | EmojiType,
    newEmojiId: string | number | EmojiType,
    delayMs: number = 2000
  ): Promise<boolean> {
    // 先添加新表情
    const addSuccess = await this.add(newEmojiId)
    // 等待指定时间
    await new Promise((resolve) => setTimeout(resolve, delayMs))
    // 再移除旧表情
    await this.remove(oldEmojiId)
    return addSuccess
  }

  /**
   * 清除所有表情
   * @returns 成功清除的数量
   */
  async clearAll(): Promise<number> {
    let count = 0
    for (const emojiId of this.emojiIds) {
      const success = await setEmojiReaction(this.e, emojiId, false)
      if (success) count++
    }
    this.emojiIds.clear()
    return count
  }

  /**
   * 只保留指定的表情，移除其他所有表情
   * @param keepEmojiIds 要保留的表情ID列表
   * @returns 移除的表情数量
   */
  async keepOnly(keepEmojiIds: (string | number)[]): Promise<number> {
    const keepSet = new Set(keepEmojiIds)
    let removedCount = 0

    for (const emojiId of this.emojiIds) {
      if (!keepSet.has(emojiId)) {
        const success = await this.remove(emojiId)
        if (success) removedCount++
      }
    }

    // 添加需要保留但当前不存在的表情
    for (const emojiId of keepEmojiIds) {
      if (!this.emojiIds.has(emojiId)) {
        await this.add(emojiId)
      }
    }

    return removedCount
  }

  /**
   * 获取当前所有表情ID
   */
  getCurrentEmojiIds(): (string | number)[] {
    return Array.from(this.emojiIds)
  }

  /**
   * 检查是否有指定的表情
   */
  has(emojiId: string | number): boolean {
    return this.emojiIds.has(emojiId)
  }

  /**
   * 获取当前表情数量
   */
  count(): number {
    return this.emojiIds.size
  }
}

/** 表情反馈节奏：收到消息 1.5 秒后补「处理中」，结束时再把「处理中」换成结果 */
const EMOJI_PROCESSING_DELAY_MS = 1500
const EMOJI_RESULT_DELAY_MS = 1500

/** 已由业务侧收尾的消息及结果；失败结果可以覆盖先前的成功，成功不会覆盖失败 */
const settledEvents = new WeakMap<Message, 'SUCCESS' | 'ERROR'>()

/** 这条消息最近一次收尾的完整过程；成功收尾前要等它落地，确认业务侧是否真的收尾成功 */
const settleTasks = new WeakMap<Message, Promise<void>>()

/**
 * 给一条消息的表情收尾：撤掉「处理中」，补上结果表情。
 *
 * 子上下文处理完成后用它把父消息也收尾；收尾过的消息会被标记，
 * 外层 `wrapWithErrorHandler` 之后不会再改它的表情。
 * 失败可以覆盖先前的成功（先撤掉 ✅ 再补 ❌），成功不会覆盖失败。
 * @param e 需要收尾的消息
 * @param type 结果表情，默认 SUCCESS
 */
export const settleEmojiReaction = async (e: Message, type: 'SUCCESS' | 'ERROR' = 'SUCCESS'): Promise<void> => {
  const settled = settledEvents.get(e)
  if (settled === 'ERROR' || settled === type) return
  settledEvents.set(e, type)
  const task = (async () => {
    await setEmojiReaction(e, getEmojiId(e, 'PROCESSING'), false)
    // 从成功降级为失败时先撤掉 ✅，避免同一条消息上同时挂着 ✅ 和 ❌
    if (settled === 'SUCCESS') {
      await setEmojiReaction(e, getEmojiId(e, 'SUCCESS'), false)
    }
    const applied = await setEmojiReaction(e, getEmojiId(e, type), true)
    // 结果表情没挂上（适配器瞬时失败）时撤回标记，外层命令入口还有机会补一次
    if (!applied && settledEvents.get(e) === type) {
      settledEvents.delete(e)
    }
  })()
  settleTasks.set(e, task)
  await task
}

/** 等这条消息上最近一次收尾过程落地（没有收尾过则立即返回）。 */
const waitForSettle = async (e: Message): Promise<void> => {
  const task = settleTasks.get(e)
  if (task) await task
}

/** 这条消息的表情是否已经由业务侧收尾。 */
export const isEmojiReactionSettled = (e: Message): boolean => settledEvents.has(e)

/**
 * 一条消息从「收到」到「处理结束」的表情反馈流程。
 *
 * 节奏与命令入口一致：收到消息先加 👀，1.5 秒后补 ⏳；
 * 处理成功把 ⏳ 换成 ✅（👀 保留），处理失败撤掉 ⏳ 补 ❌。
 * 命令入口（`wrapWithErrorHandler`）和 `karin.ctx` 拿到的子上下文消息共用这一套。
 */
export interface EmojiReactionFlow {
  /** 消息已收到：加 👀，并开始计时补 ⏳ */
  begin: () => Promise<void>
  /** 处理成功：1.5 秒后加 ✅ 并撤掉 ⏳ */
  succeed: () => Promise<void>
  /** 处理失败：撤掉 ⏳，补 ❌ */
  fail: () => Promise<void>
}

/**
 * 给一条消息创建表情反馈流程。
 * @param e 触发本次处理的消息
 */
export const createEmojiReactionFlow = (e: Message): EmojiReactionFlow => {
  const manager = new EmojiReactionManager(e)
  let processingTimer: NodeJS.Timeout | null = null
  /** 定时器补 ⏳ 的请求；失败时要等它落地再撤，否则本地还没记录会漏撤 */
  let processingAdd: Promise<boolean> | null = null
  let finished = false

  const begin = async (): Promise<void> => {
    await manager.add('EYES')
    processingTimer = setTimeout(() => {
      // 业务侧可能已经收尾（如选集子上下文处理完先更新了父消息），不再补「处理中」
      if (isEmojiReactionSettled(e)) return
      processingAdd = manager.add('PROCESSING')
    }, EMOJI_PROCESSING_DELAY_MS)
  }

  const succeed = async (): Promise<void> => {
    if (finished) return
    // 等业务侧已发起的收尾落地：收尾失败会撤回标记，这里仍有机会补 ✅
    await waitForSettle(e)
    // 业务侧已经收尾过的消息不再重复收尾
    if (finished || isEmojiReactionSettled(e)) return
    finished = true
    setTimeout(() => {
      manager.replace('PROCESSING', 'SUCCESS').catch(() => {})
    }, EMOJI_RESULT_DELAY_MS)
  }

  const fail = async (): Promise<void> => {
    if (finished) return
    finished = true
    if (processingTimer) clearTimeout(processingTimer)
    // 定时器已经触发时，等补 ⏳ 的请求落地，避免 ⏳ 和 ❌ 同时挂在消息上
    if (processingAdd) await processingAdd
    // 业务侧已经把这条消息收尾成成功（如选集翻页后的父消息），失败时要纠正成 ❌
    if (settledEvents.get(e) === 'SUCCESS') {
      await settleEmojiReaction(e, 'ERROR')
      return
    }
    if (manager.has(getEmojiId(e, 'PROCESSING'))) {
      await manager.remove('PROCESSING')
    }
    await manager.add('ERROR')
  }

  return { begin, succeed, fail }
}
