/**
 * 错误处理模块
 *
 * @remarks
 * 提供统一的错误处理机制，支持：
 * - 策略模式：注册自定义错误处理策略
 * - 错误图片渲染：生成包含详细信息的错误报告图片
 * - 多目标发送：支持发送给触发者、单个主人或所有主人
 * - 函数包装器：自动捕获并处理业务函数中的错误
 *
 * @example
 * ```ts
 * import { wrapWithErrorHandler, registerErrorStrategy } from '@/module/utils/ErrorHandler'
 *
 * // 使用包装器
 * const handler = wrapWithErrorHandler(
 *   async (e) => await doSomething(e),
 *   { businessName: '我的业务' }
 * )
 *
 * // 注册自定义策略
 * registerErrorStrategy({
 *   name: 'MyStrategy',
 *   match: (ctx) => ctx.error instanceof MyError,
 *   handle: async (ctx) => 'handled'
 * })
 * ```
 *
 * @packageDocumentation
 */

// 类型导出
export type {
  ErrorContext,
  ErrorHandlerOptions,
  ErrorStrategy,
  RenderErrorOptions
} from './types'

// 策略注册
export { getStrategies, registerErrorStrategy } from './strategy'

// 渲染
export { renderErrorImage } from './render'

// 发送
export {
  sendErrorToAllMasters,
  sendErrorToMaster,
  sendErrorToTrigger
} from './sender'

// 核心处理
export { handleBusinessError, wrapWithErrorHandler } from './handler'

// 工具函数
export {
  getPushTaskBotId,
  isPushTask,
  parseLogsToStructured,
  statBotId
} from './utils'
