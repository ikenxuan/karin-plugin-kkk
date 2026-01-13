import type { Message } from 'node-karin'
import type { ApiErrorProps } from 'template/types/platforms/ohter/handlerError'

import type { getBuildMetadata } from '@/module'

/**
 * 错误处理选项
 */
export interface ErrorHandlerOptions {
  /**
   * 业务名称，用于错误报告
   */
  businessName: string
  /**
   * 自定义错误处理函数
   * @param error - 捕获的错误对象
   * @param logs - 结构化日志数组
   */
  customErrorHandler?: (error: Error, logs: ApiErrorProps['data']['logs']) => Promise<void>
}

/**
 * 错误处理上下文
 */
export interface ErrorContext {
  /**
   * 捕获的错误对象
   */
  error: Error
  /**
   * 错误处理选项
   */
  options: ErrorHandlerOptions
  /**
   * 结构化日志数组
   */
  logs: ApiErrorProps['data']['logs']
  /**
   * 消息事件对象（可选）
   */
  event?: Message
  /**
   * 构建元数据
   */
  buildMetadata: ReturnType<typeof getBuildMetadata>
  /**
   * 适配器信息（可选）
   */
  adapterInfo?: ApiErrorProps['data']['adapterInfo']
}

/**
 * 特殊错误处理策略接口
 *
 * @remarks
 * 用于实现特定类型错误的自定义处理逻辑，如 B站风控验证等
 *
 * @example
 * ```ts
 * const myStrategy: ErrorStrategy = {
 *   name: 'MyStrategy',
 *   match: (ctx) => ctx.error.message.includes('特定错误'),
 *   handle: async (ctx) => {
 *     // 自定义处理逻辑
 *     return 'handled'
 *   }
 * }
 * registerErrorStrategy(myStrategy)
 * ```
 */
export interface ErrorStrategy {
  /**
   * 策略名称
   */
  name: string
  /**
   * 判断是否匹配该策略
   * @param ctx - 错误处理上下文
   * @returns 是否匹配
   */
  match: (ctx: ErrorContext) => boolean
  /**
   * 处理错误
   * @param ctx - 错误处理上下文
   * @returns `'handled'` 表示已完全处理，`'continue'` 继续默认处理
   */
  handle: (ctx: ErrorContext) => Promise<'handled' | 'continue'>
}

/**
 * 渲染错误图片的选项
 */
export interface RenderErrorOptions {
  /**
   * 平台标识
   */
  platform?: ApiErrorProps['data']['platform']
  /**
   * 自定义错误名称
   */
  errorName?: string
  /**
   * 自定义错误消息
   */
  errorMessage?: string
  /**
   * 自定义堆栈信息
   */
  stack?: string
  /**
   * 是否为验证类型错误
   */
  isVerification?: boolean
  /**
   * 验证 URL
   */
  verificationUrl?: string
  /**
   * 分享 URL
   */
  share_url?: string
}
