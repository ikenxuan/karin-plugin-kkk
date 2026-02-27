import { logger, type Message } from 'node-karin'
import type { ApiErrorProps } from 'template/types/platforms/other/handlerError'

import { getBuildMetadata } from '@/module'
import { EmojiReactionManager } from '@/module/utils/EmojiReaction'

import { renderErrorImage } from './render'
import { sendErrorToAllMasters, sendErrorToMaster, sendErrorToTrigger } from './sender'
import { getStrategies } from './strategy'
import type { ErrorContext, ErrorHandlerOptions } from './types'
import { parseLogsToStructured } from './utils'

/**
 * 处理业务错误的核心函数
 *
 * @param error - 捕获的错误对象
 * @param options - 错误处理选项
 * @param logs - 结构化日志数组
 * @param event - 消息事件对象（可选）
 * @returns `'handled'` 表示错误已被策略完全处理，`undefined` 表示使用默认处理
 *
 * @remarks
 * 处理流程：
 * 1. 构建错误上下文
 * 2. 遍历已注册策略，匹配则执行策略处理
 * 3. 若无策略匹配或策略返回 `'continue'`，执行默认处理
 * 4. 默认处理：渲染错误图片 → 发送给触发者 → 发送给主人 → 执行自定义处理器
 *
 * @example
 * ```ts
 * try {
 *   await someOperation()
 * } catch (error) {
 *   await handleBusinessError(error, { businessName: '视频解析' }, logs, event)
 * }
 * ```
 */
export const handleBusinessError = async (
  error: Error,
  options: ErrorHandlerOptions,
  logs: ApiErrorProps['data']['logs'],
  event?: Message
): Promise<'handled' | undefined> => {
  try {
    logger.debug(`[ErrorHandler] 开始处理业务错误: ${options.businessName}`)

    const buildMetadata = getBuildMetadata()
    const adapterInfo = event?.bot?.adapter
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

    // 遍历策略，找到匹配的进行处理
    for (const strategy of getStrategies()) {
      if (strategy.match(ctx)) {
        logger.debug(`[ErrorHandler] 匹配策略: ${strategy.name}`)
        const result = await strategy.handle(ctx)
        if (result === 'handled') return 'handled'
      }
    }

    // 默认错误处理
    const img = await renderErrorImage(ctx)

    // 发送给触发者
    await sendErrorToTrigger(ctx, img)

    // 发送给单个主人（除 console 外的第一个主人）
    await sendErrorToMaster(ctx, img)

    // 发送给所有主人（排除 console）
    await sendErrorToAllMasters(ctx, img)

    // 自定义错误处理
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

/**
 * 函数式错误处理包装器
 *
 * @typeParam R - 被包装函数的返回类型
 * @param fn - 要包装的业务函数
 * @param options - 错误处理选项
 * @returns 包装后的函数，自动捕获错误并处理
 *
 * @remarks
 * 使用 `logger.runContext` 收集执行期间的日志，
 * 自动管理表情回复的完整生命周期：
 * - 开始时添加"处理中"表情
 * - 成功时替换为"完成"表情
 * - 失败时清除所有表情并添加"失败"表情
 */
export const wrapWithErrorHandler = <R> (
  fn: (e: Message, next?: () => unknown) => R | Promise<R>,
  options: ErrorHandlerOptions
) => {
  return async (e: Message, next?: () => unknown): Promise<R> => {
    // 拥有事件对象才能对消息进行回应表情，定时任务中e是undefined
    const emojiManager = e ? new EmojiReactionManager(e) : undefined
    if (emojiManager) {
      await emojiManager.add('EYES')
      setTimeout(() => {
        emojiManager.add('PROCESSING').catch(() => {})
      }, 1500)
    }
    
    const ctx = logger.runContext(async () => fn(e, next))

    try {
      const result = await ctx.run()
      
      // 成功完成，替换为"完成"表情
      if (emojiManager) {
        setTimeout(() => {
          emojiManager.replace('PROCESSING', 'SUCCESS').catch(() => { })
        }, 1500)
      }
      
      return result
    } catch (error) {
      // 失败，清除所有表情并添加"失败"表情
      if (emojiManager) {
        await emojiManager.clearAll()
        await emojiManager.add('ERROR')
      }
      
      await new Promise(resolve => setTimeout(resolve, 100))
      const structuredLogs = parseLogsToStructured(ctx.logs())
      
      const result = await handleBusinessError(error as Error, options, structuredLogs, e)
      if (result === 'handled') return undefined as R
      throw error
    }
  }
}
