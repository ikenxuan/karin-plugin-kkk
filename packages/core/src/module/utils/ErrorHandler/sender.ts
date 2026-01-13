import karin, { config, logger, segment } from 'node-karin'

import { Config } from '../Config'
import type { renderErrorImage } from './render'
import type { ErrorContext } from './types'
import { getPushTaskBotId, isPushTask } from './utils'

/**
 * 发送错误图片给触发者
 *
 * @param ctx - 错误处理上下文
 * @param img - 渲染后的错误图片
 *
 * @remarks
 * 仅当配置 `errorLogSendTo` 包含 `'trigger'` 且存在 event 时发送
 */
export const sendErrorToTrigger = async (
  ctx: ErrorContext,
  img: Awaited<ReturnType<typeof renderErrorImage>>
) => {
  const { event } = ctx

  if (!event) return
  if (!Config.app.errorLogSendTo.some(item => item === 'trigger')) return

  try {
    await event.reply(img)
  } catch (err) {
    logger.error(`[ErrorHandler] 发送错误消息给用户失败: ${err}`)
  }
}

/**
 * 发送错误图片给单个主人
 *
 * @param ctx - 错误处理上下文
 * @param img - 渲染后的错误图片
 * @param customPrefix - 自定义消息前缀（可选）
 *
 * @remarks
 * 发送给除 `'console'` 外的第一个主人，
 * 仅当配置 `errorLogSendTo` 包含 `'master'` 时发送
 *
 * @example
 * ```ts
 * const img = await renderErrorImage(ctx)
 * await sendErrorToMaster(ctx, img, '自定义前缀消息')
 * ```
 */
export const sendErrorToMaster = async (
  ctx: ErrorContext,
  img: Awaited<ReturnType<typeof renderErrorImage>>,
  customPrefix?: string
) => {
  const { options, event } = ctx

  if (!Config.app.errorLogSendTo.some(item => item === 'master')) return

  const list = config.master()
  const master = list[0] === 'console' ? list[1] : list[0]
  const isPush = isPushTask(event, options.businessName)
  const botId = isPush ? getPushTaskBotId() : event?.bot?.selfId

  if (!botId || !master) return

  try {
    const prefix = customPrefix || await buildErrorPrefix(ctx, isPush, botId)
    await karin.sendMaster(botId, master, [segment.text(prefix), ...img])
  } catch (err) {
    logger.error(`[ErrorHandler] 发送错误消息给主人失败: ${err}`)
  }
}

/**
 * 发送错误图片给所有主人
 *
 * @param ctx - 错误处理上下文
 * @param img - 渲染后的错误图片
 * @param customPrefix - 自定义消息前缀（可选）
 *
 * @remarks
 * 发送给所有主人（排除 `'console'`），
 * 仅当配置 `errorLogSendTo` 包含 `'allMasters'` 时发送，
 * 内部会去重避免重复发送
 *
 * @example
 * ```ts
 * const img = await renderErrorImage(ctx)
 * await sendErrorToAllMasters(ctx, img)
 * ```
 */
export const sendErrorToAllMasters = async (
  ctx: ErrorContext,
  img: Awaited<ReturnType<typeof renderErrorImage>>,
  customPrefix?: string
) => {
  const { options, event } = ctx

  if (!Config.app.errorLogSendTo.some(item => item === 'allMasters')) return

  const masters = config.master().filter(m => m !== 'console')
  if (masters.length === 0) return

  const isPush = isPushTask(event, options.businessName)
  const botId = isPush ? getPushTaskBotId() : event?.bot?.selfId

  if (!botId) return

  const prefix = customPrefix || await buildErrorPrefix(ctx, isPush, botId)

  // 已发送通知的主人 ID，避免重复发送
  const notifiedSet = new Set<string>()

  for (const master of masters) {
    const key = `${botId}:${master}`
    if (notifiedSet.has(key)) continue

    try {
      await karin.sendMaster(botId, master, [segment.text(prefix), ...img])
      notifiedSet.add(key)
      logger.debug(`[ErrorHandler] 已发送错误消息给主人: ${master} (via ${botId})`)
    } catch (err) {
      logger.error(`[ErrorHandler] 发送错误消息给主人 (${master}) 失败: ${err}`)
    }
  }
}

/**
 * 构建错误消息前缀
 *
 * @param ctx - 错误处理上下文
 * @param isPush - 是否为推送任务
 * @param botId - 机器人 ID
 * @returns 格式化的消息前缀
 *
 * @internal
 */
const buildErrorPrefix = async (
  ctx: ErrorContext,
  isPush: boolean,
  botId: string
): Promise<string> => {
  const { options, event } = ctx

  if (isPush) {
    return `${options.businessName} 任务执行出错！\n请即时解决以消除警告`
  }

  const groupId = event && 'groupId' in event ? event.groupId : ''
  const groupInfo = await karin.getBot(botId)?.getGroupInfo(groupId)
  const groupName = groupInfo?.groupName || '未知'

  return `群：${groupName}(${groupId})\n${options.businessName} 任务执行出错！\n请即时解决以消除警告`
}
