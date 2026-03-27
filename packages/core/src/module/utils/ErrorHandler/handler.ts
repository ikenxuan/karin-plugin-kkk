import { logger, type Message } from 'node-karin'
import type { ApiErrorProps } from 'template/types/platforms/other/handlerError'

import { getBuildMetadata } from '@/module'
import { EmojiReactionManager } from '@/module/utils/EmojiReaction'

import { renderErrorImage } from './render'
import { sendErrorToAllMasters, sendErrorToMaster, sendErrorToTrigger } from './sender'
import { getStrategies } from './strategy'
import type { ErrorContext, ErrorHandlerOptions } from './types'
import { injectBotToEventForPushTask, isPushTask, parseLogsToStructured } from './utils'

export const handleBusinessError = async (
  error: Error,
  options: ErrorHandlerOptions,
  logs: ApiErrorProps['data']['logs'],
  event: Message
): Promise<'handled' | undefined> => {
  try {
    logger.debug(`[ErrorHandler] 开始处理业务错误: ${options.businessName}`)

    const buildMetadata = getBuildMetadata()
    const adapterInfo = event.bot?.adapter
      ? {
        name: event.bot.adapter.name,
        version: event.bot.adapter.version,
        platform: event.bot.adapter.platform,
        protocol: event.bot.adapter.protocol,
        standard: event.bot.adapter.standard
      }
      : undefined

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

export const wrapWithErrorHandler = <R> (
  fn: (e: Message, next?: () => unknown) => R | Promise<R>,
  options: ErrorHandlerOptions
) => {
  return async (e?: Message, next?: () => unknown): Promise<R> => {
    const rawEvent = e
    const normalizedEvent = await injectBotToEventForPushTask(rawEvent, options.businessName)
    const shouldHandleEmoji = Boolean(rawEvent) && !isPushTask(rawEvent, options.businessName)
    const emojiManager = shouldHandleEmoji ? new EmojiReactionManager(rawEvent as Message) : undefined
    let processingTimer: NodeJS.Timeout | null = null
    let successTimer: NodeJS.Timeout | null = null

    if (emojiManager) {
      await emojiManager.add('EYES')
      processingTimer = setTimeout(() => {
        emojiManager.add('PROCESSING').catch(() => { })
      }, 1500)
    }

    const ctx = logger.runContext(async () => fn(normalizedEvent, next))

    try {
      const result = await ctx.run()

      if (emojiManager) {
        successTimer = setTimeout(() => {
          emojiManager.replace('PROCESSING', 'SUCCESS').catch(() => { })
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

      await new Promise(resolve => setTimeout(resolve, 100))
      const structuredLogs = parseLogsToStructured(ctx.logs())

      const result = await handleBusinessError(error as Error, options, structuredLogs, normalizedEvent)
      if (result === 'handled') return undefined as R
      throw error
    }
  }
}
