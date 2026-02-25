/**
 * Emoji 表情回复工具模块
 */
import type { Message } from 'node-karin'
import { logger } from 'node-karin'

import { Config } from './Config'

/**
 * 设置消息表情回复
 * @param e 消息事件对象
 * @param emojiId 表情ID，如果不传则使用配置文件中的默认值
 * @param isSet 是否设置表情（true=设置，false=取消），默认为 true
 * @param ignoreError 是否忽略错误，默认使用配置文件中的设置
 * @returns 是否成功设置表情
 */
export async function setEmojiReaction (
  e: Message,
  emojiId?: string | number,
  isSet: boolean = true,
  ignoreError?: boolean
): Promise<boolean> {
  // 如果未启用表情回复功能，直接返回
  if (!Config.app.EmojiReply) {
    return false
  }

  // 私聊不发送表情回复
  if (e.isPrivate) {
    return false
  }

  // 使用传入的 emojiId 或配置文件中的默认值
  const reactionId = emojiId ?? Config.app.EmojiReplyID
  
  // 使用传入的 ignoreError 或配置文件中的设置
  const shouldIgnoreError = ignoreError ?? Config.app.EmojiReplyIgnoreError

  try {
    await e.bot.setMsgReaction(e.contact, e.messageId, reactionId, isSet)
    return true
  } catch (err) {
    if (!shouldIgnoreError) {
      logger.error('[EmojiReaction] 设置表情回复失败:', err)
      throw err
    }
    logger.debug('[EmojiReaction] 设置表情回复失败（已忽略）:', err)
    return false
  }
}

/**
 * 表情回复管理器 - 支持管理多个表情
 */
export class EmojiReactionManager {
  private e: Message
  private emojiIds: Set<string | number> = new Set()
  private ignoreError: boolean

  constructor (e: Message, ignoreError?: boolean) {
    this.e = e
    this.ignoreError = ignoreError ?? Config.app.EmojiReplyIgnoreError
  }

  /**
   * 添加表情
   * @param emojiId 表情ID
   * @returns 是否成功
   */
  async add (emojiId: string | number): Promise<boolean> {
    const success = await setEmojiReaction(this.e, emojiId, true, this.ignoreError)
    if (success) {
      this.emojiIds.add(emojiId)
    }
    return success
  }

  /**
   * 移除表情
   * @param emojiId 表情ID
   * @returns 是否成功
   */
  async remove (emojiId: string | number): Promise<boolean> {
    const success = await setEmojiReaction(this.e, emojiId, false, this.ignoreError)
    if (success) {
      this.emojiIds.delete(emojiId)
    }
    return success
  }

  /**
   * 替换表情（移除旧的，添加新的）
   * @param oldEmojiId 旧表情ID
   * @param newEmojiId 新表情ID
   * @returns 是否成功
   */
  async replace (oldEmojiId: string | number, newEmojiId: string | number): Promise<boolean> {
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
      const success = await setEmojiReaction(this.e, emojiId, false, this.ignoreError)
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

