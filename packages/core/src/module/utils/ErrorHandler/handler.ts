import type { ApiErrorData } from '@template/template/other/handlerError/components/types'
import { type Message } from 'node-karin'

import { getBuildMetadata } from '@/module'
import { EmojiReactionManager } from '@/module/utils/EmojiReaction'
import { logger } from '@/module/utils/logger'
import { runWithVerifyContext } from '@/module/utils/RiskVerify'

import { renderErrorImage } from './render'
import { sendErrorToAllMasters, sendErrorToMaster, sendErrorToTrigger } from './sender'
import { getStrategies } from './strategy'
import type { ErrorContext, ErrorHandlerOptions } from './types'
import { injectBotToEventForPushTask, isPushTask, parseLogsToStructured } from './utils'

export const handleBusinessError = async (
  error: Error,
  options: ErrorHandlerOptions,
  logs: ApiErrorData['logs'],
  event: Message
): Promise<'handled' | undefined> => {
  try {
    logger.debug(`[ErrorHandler] 开始处理业务错误: ${options.businessName}`)

    const buildMetadata = getBuildMetadata()
    const adapterInfo = event.bot?.adapter ? event.bot.adapter : undefined

    const ctx: ErrorContext = {
      error,
      options,
      logs,
      event,
      buildMetadata,
      adapterInfo
    }

    for (const strategy of getStrategies()) {
      if (strategy.match(ctx)) {
        logger.debug(`[ErrorHandler] 匹配策略: ${strategy.name}`)
        const result = await strategy.handle(ctx)
        if (result === 'handled') return 'handled'
      }
    }

    const img = await renderErrorImage(ctx)
    await sendErrorToTrigger(ctx, img)
    await sendErrorToMaster(ctx, img)
    await sendErrorToAllMasters(ctx, img)

    if (options.customErrorHandler) {
      try {
        await options.customErrorHandler(error, logs)
      } catch (err) {
        logger.error(`[ErrorHandler] 自定义错误处理失败: ${err}`)
      }
    }
  } catch (handlerError) {
    logger.error(`[ErrorHandler] 错误处理器本身发生错误: ${handlerError}`)
    throw handlerError
  }
  return undefined
}

export const wrapWithErrorHandler = <R>(fn: (e: Message, next: () => unknown) => R | Promise<R>, options: ErrorHandlerOptions) => {
  return async (e?: Message, next?: () => unknown): Promise<R> => {
    const rawEvent = e
    const normalizedEvent = await injectBotToEventForPushTask(rawEvent, options.businessName)
    const normalizedNext = next ?? (() => undefined)
    const shouldHandleEmoji = Boolean(rawEvent) && !isPushTask(rawEvent, options.businessName)
    const emojiManager = shouldHandleEmoji ? new EmojiReactionManager(rawEvent as Message) : undefined
    let processingTimer: NodeJS.Timeout | null = null
    let successTimer: NodeJS.Timeout | null = null

    if (emojiManager) {
      await emojiManager.add('EYES')
      processingTimer = setTimeout(() => {
        emojiManager.add('PROCESSING').catch(() => {})
      }, 1500)
    }

    // 风控验证要给主人发码，需要「触发本次解析的事件」——在这个唯一入口把事件存进 RiskVerify 的
    // ALS 上下文（代理层拿不到 e）；定时推送这类没有原始事件的调用不包，交给它自己放弃自动验证
    const runHandler = () => fn(normalizedEvent, normalizedNext)
    const ctx = logger.runContext(async () => (rawEvent ? runWithVerifyContext(rawEvent, runHandler) : runHandler()))

    try {
      const result = await ctx.run()

      if (emojiManager) {
        successTimer = setTimeout(() => {
          emojiManager.replace('PROCESSING', 'SUCCESS').catch(() => {})
        }, 1500)
      }

      return result
    } catch (error) {
      if (processingTimer) clearTimeout(processingTimer)
      if (successTimer) clearTimeout(successTimer)

      if (emojiManager) {
        const processingEmojiId = emojiManager['getPlatformEmojiId']('PROCESSING')
        if (emojiManager.has(processingEmojiId)) {
          await emojiManager.remove('PROCESSING')
        }
        await emojiManager.add('ERROR')
      }

      await new Promise((resolve) => setTimeout(resolve, 100))
      const structuredLogs = parseLogsToStructured(ctx.logs())

      const result = await handleBusinessError(error as Error, options, structuredLogs, normalizedEvent)
      if (result === 'handled') return undefined as R
      throw error
    }
  }
}
