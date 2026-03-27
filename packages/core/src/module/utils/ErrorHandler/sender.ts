import karin, { config, logger, segment } from 'node-karin'

import { getReachableMasterBots } from '../bot'
import { Config } from '../Config'
import type { renderErrorImage } from './render'
import type { ErrorContext } from './types'
import { isPushTask } from './utils'

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
    logger.error(`[ErrorHandler] 发送错误消息给触发者失败: ${err}`)
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

  const isPush = isPushTask(event, options.businessName)
  const target = await resolveSingleMasterTarget(event, isPush)
  if (!target) return

  try {
    const prefix = customPrefix || await buildErrorPrefix(ctx, isPush, target.botId)
    await karin.sendMaster(target.botId, target.master, [segment.text(prefix), ...img])
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

  const isPush = isPushTask(event, options.businessName)
  const targets = await resolveAllMasterTargets(event, isPush)
  if (targets.length === 0) return

  const prefix = customPrefix || await buildErrorPrefix(ctx, isPush, targets[0].botId)
  const notifiedSet = new Set<string>()

  for (const target of targets) {
    const key = `${target.botId}:${target.master}`
    if (notifiedSet.has(key)) continue

    try {
      await karin.sendMaster(target.botId, target.master, [segment.text(prefix), ...img])
      notifiedSet.add(key)
      logger.debug(`[ErrorHandler] 已发送错误消息给主人: ${target.master} (via ${target.botId})`)
    } catch (err) {
      logger.error(`[ErrorHandler] 发送错误消息给主人 (${target.master}) 失败: ${err}`)
    }
  }
}

/**
 * 解析单个主人目标
 *
 * @param event - 错误事件上下文
 * @param isPush - 是否为推送任务
 *
 * @returns 
 */
const resolveSingleMasterTarget = async (
  event: ErrorContext['event'],
  isPush: boolean
): Promise<{ master: string, botId: string } | undefined> => {
  if (isPush) {
    const bindings = await getReachableMasterBots()
    const matched = bindings[0]
    if (!matched) return undefined
    return {
      master: matched.master,
      botId: matched.bot.account.selfId
    }
  }

  const master = config.master().find(item => item !== 'console')
  const botId = event?.bot?.account.selfId ?? event?.selfId
  if (!master || !botId) return undefined

  return { master, botId }
}

const resolveAllMasterTargets = async (
  event: ErrorContext['event'],
  isPush: boolean
): Promise<Array<{ master: string, botId: string }>> => {
  const masters = config.master().filter(item => item !== 'console')
  if (masters.length === 0) return []

  if (isPush) {
    const bindings = await getReachableMasterBots(masters)
    return bindings.map(item => ({
      master: item.master,
      botId: item.bot.account.selfId
    }))
  }

  const botId = event?.bot?.account.selfId ?? event?.selfId
  if (!botId) return []

  return masters.map(master => ({ master, botId }))
}

const buildErrorPrefix = async (
  ctx: ErrorContext,
  isPush: boolean,
  botId: string
): Promise<string> => {
  const { options, event } = ctx

  if (isPush) {
    return `${options.businessName} 任务执行出错\n请尽快解决以消除警告`
  }

  const groupId = event && 'groupId' in event ? event.groupId : ''
  const groupInfo = await karin.getBot(botId)?.getGroupInfo(groupId)
  const groupName = groupInfo?.groupName || '未知'

  return `群：${groupName}(${groupId})\n${options.businessName} 任务执行出错\n请尽快解决以消除警告`
}
