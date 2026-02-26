/**
 * Emoji 表情回复工具模块
 */
import type { Message } from 'node-karin'
import { logger } from 'node-karin'

import { Config } from './Config'

/**
 * 各平台表情 ID 配置
 */
const PLATFORM_EMOJI_IDS = {
  qq: {
    /** 处理中：https://koishi.js.org/QFace/#/qqnt/366 */
    PROCESSING: 366,
    /** 成功完成：https://koishi.js.org/QFace/#/qqnt/370 */
    SUCCESS: 370,
    /** 失败：https://koishi.js.org/QFace/#/qqnt/379 */
    ERROR: 379
  },
  wechat: {
    /** 处理中 - 占位符 */
    PROCESSING: 'WECHAT_PROCESSING_PLACEHOLDER',
    /** 成功完成 - 占位符 */
    SUCCESS: 'WECHAT_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'WECHAT_ERROR_PLACEHOLDER'
  },
  telegram: {
    /** 处理中 - 占位符 */
    PROCESSING: 'TELEGRAM_PROCESSING_PLACEHOLDER',
    /** 成功完成 - 占位符 */
    SUCCESS: 'TELEGRAM_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'TELEGRAM_ERROR_PLACEHOLDER'
  },
  discord: {
    /** 处理中 - 占位符 */
    PROCESSING: '👀',
    /** 成功完成 - 占位符 */
    SUCCESS: 'DISCORD_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'DISCORD_ERROR_PLACEHOLDER'
  },
  koko: {
    /** 处理中 - 占位符 */
    PROCESSING: 'KOKO_PROCESSING_PLACEHOLDER',
    /** 成功完成 - 占位符 */
    SUCCESS: 'KOKO_SUCCESS_PLACEHOLDER',
    /** 失败 - 占位符 */
    ERROR: 'KOKO_ERROR_PLACEHOLDER'
  },
  other: {
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
export type EmojiType = 'PROCESSING' | 'SUCCESS' | 'ERROR'

/**
 * 根据平台和表情类型获取表情 ID
 * @param e 消息事件对象
 * @param type 表情类型
 * @returns 表情 ID
 */
export function getEmojiId (e: Message, type: EmojiType): string | number {
  const platform = e.bot?.adapter?.platform || 'other'
  const platformEmojis = PLATFORM_EMOJI_IDS[platform] || PLATFORM_EMOJI_IDS.other
  return platformEmojis[type]
}

/**
 * 表情 ID 常量（向后兼容，使用 QQ 平台的 ID）
 * @deprecated 建议使用 getEmojiId 函数获取平台特定的表情 ID
 */
export const EMOJI_IDS = PLATFORM_EMOJI_IDS.qq

/**
 * 设置消息表情回复
 * @param e 消息事件对象
 * @param emojiId 表情ID
 * @param isSet 是否设置表情（true=设置，false=取消），默认为 true
 * @returns 是否成功设置表情
 */
export async function setEmojiReaction (
  e: Message,
  emojiId: string | number,
  isSet: boolean = true
): Promise<boolean> {
  // 如果未启用表情回复功能，直接返回
  if (!Config.app.EmojiReply) {
    return false
  }

  // 私聊不发送表情回复
  if (e.isPrivate) {
    return false
  }
  
  try {
    await e.bot.setMsgReaction(e.contact, e.messageId, emojiId, isSet)
    return true
  } catch (err) {
    // 始终忽略错误，不影响主流程
    logger.debug('[EmojiReaction] 设置表情回复失败（已忽略）:', err)
    return false
  }
}

/**
 * 表情回复管理器
 */
export class EmojiReactionManager {
  private e: Message
  private emojiIds: Set<string | number> = new Set()

  constructor (e: Message) {
    this.e = e
  }

  /**
   * 根据表情类型获取平台特定的表情 ID
   * @param type 表情类型
   * @returns 表情 ID
   */
  private getPlatformEmojiId (type: EmojiType): string | number {
    return getEmojiId(this.e, type)
  }

  /**
   * 规范化表情 ID（如果是表情类型字符串，则转换为平台特定的 ID）
   * @param emojiId 表情ID 或表情类型
   * @returns 实际的表情 ID
   */
  private normalizeEmojiId (emojiId: string | number | EmojiType): string | number {
    return typeof emojiId === 'string' && ['PROCESSING', 'SUCCESS', 'ERROR'].includes(emojiId)
      ? this.getPlatformEmojiId(emojiId as EmojiType)
      : emojiId
  }

  /**
   * 添加表情
   * @param emojiId 表情ID 或表情类型
   * @returns 是否成功
   */
  async add (emojiId: string | number | EmojiType): Promise<boolean> {
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
  async remove (emojiId: string | number | EmojiType): Promise<boolean> {
    const actualEmojiId = this.normalizeEmojiId(emojiId)
    const success = await setEmojiReaction(this.e, actualEmojiId, false)
    if (success) {
      this.emojiIds.delete(actualEmojiId)
    }
    return success
  }

  /**
   * 替换表情（移除旧的，添加新的）
   * @param oldEmojiId 旧表情ID 或表情类型
   * @param newEmojiId 新表情ID 或表情类型
   * @returns 是否成功
   */
  async replace (oldEmojiId: string | number | EmojiType, newEmojiId: string | number | EmojiType): Promise<boolean> {
    await this.remove(oldEmojiId)
    return await this.add(newEmojiId)
  }

  /**
   * 清除所有表情
   * @returns 成功清除的数量
   */
  async clearAll (): Promise<number> {
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
  async keepOnly (keepEmojiIds: (string | number)[]): Promise<number> {
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
  getCurrentEmojiIds (): (string | number)[] {
    return Array.from(this.emojiIds)
  }

  /**
   * 检查是否有指定的表情
   */
  has (emojiId: string | number): boolean {
    return this.emojiIds.has(emojiId)
  }

  /**
   * 获取当前表情数量
   */
  count (): number {
    return this.emojiIds.size
  }
}

