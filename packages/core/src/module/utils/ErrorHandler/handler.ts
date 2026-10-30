import type { ApiErrorData } from '@template/template/other/handlerError/components/types'
import { type Message } from 'node-karin'

import { getBuildMetadata } from '@/module'
import { createEmojiReactionFlow } from '@/module/utils/EmojiReaction'
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
    const emojiFlow = shouldHandleEmoji ? createEmojiReactionFlow(rawEvent as Message) : undefined

    // 命令入口和 karin.ctx 子上下文共用同一套表情节奏：👀 → ⏳ → ✅/❌
    if (emojiFlow) await emojiFlow.begin()

    // 风控验证要给主人发码，需要「触发本次解析的事件」——在这个唯一入口把事件存进 RiskVerify 的
    // ALS 上下文（代理层拿不到 e）；定时推送这类没有原始事件的调用不包，交给它自己放弃自动验证
    const runHandler = () => fn(normalizedEvent, normalizedNext)
    const ctx = logger.runContext(async () => (rawEvent ? runWithVerifyContext(rawEvent, runHandler) : runHandler()))

    try {
      const result = await ctx.run()

      // 业务侧可能已经收尾（如选集子上下文处理完先更新了父消息），流程内部会跳过
      await emojiFlow?.succeed()

      return result
    } catch (error) {
      // 业务侧可能已把父消息收尾成成功（选集翻页），失败时流程内部会纠正成 ❌
      await emojiFlow?.fail()

      await new Promise((resolve) => setTimeout(resolve, 100))
      const structuredLogs = parseLogsToStructured(ctx.logs())

      const result = await handleBusinessError(error as Error, options, structuredLogs, normalizedEvent)
      if (result === 'handled') return undefined as R
      throw error
    }
  }
}
