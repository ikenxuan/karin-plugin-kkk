import { logger } from 'node-karin'

import type { ErrorStrategy } from './types'

/**
 * 策略注册表
 * @internal
 */
const strategies: ErrorStrategy[] = []

/**
 * 注册错误处理策略
 *
 * @param strategy - 要注册的错误处理策略
 *
 * @remarks
 * 策略按注册顺序依次匹配，匹配成功后执行对应的处理函数
 *
 * @example
 * ```ts
 * registerErrorStrategy({
 *   name: 'MyStrategy',
 *   match: (ctx) => ctx.error instanceof MyError,
 *   handle: async (ctx) => {
 *     // 处理逻辑
 *     return 'handled'
 *   }
 * })
 * ```
 */
export const registerErrorStrategy = (strategy: ErrorStrategy) => {
  strategies.push(strategy)
  logger.debug(`[ErrorHandler] 注册策略: ${strategy.name}`)
}

/**
 * 获取所有已注册的策略
 *
 * @returns 只读的策略数组
 */
export const getStrategies = (): readonly ErrorStrategy[] => strategies
