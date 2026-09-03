import util from 'node:util'

import { formatBuildTime, Render, Root } from '@/module'
import { AmagiError } from '@/module/utils/amagiClient'

import type { ErrorContext, RenderErrorOptions } from './types'

/**
 * 把 amagi 的 v7 错误摊成模板能直接印的一块。
 *
 * 非 amagi 异常返回 `undefined` —— 模板据此整块不渲染，而不是印一排空值。
 * @param error - 捕获的异常
 * @returns v7 分层错误信息，或 `undefined`
 */
const amagiDetailOf = (error: Error) => {
  if (!(error instanceof AmagiError)) return undefined
  const { meta } = error.envelope
  return {
    kind: error.kind,
    code: error.amagiCode,
    reason: error.reason,
    retryable: error.retryable,
    platformCode: error.rawError.platform?.code,
    httpStatus: error.httpStatus,
    requestId: meta?.requestId,
    attempts: meta?.attempts,
    durationMs: meta?.durationMs,
    issues: error.issues,
    // 逐个请求的明细。amagi 只在 debug: true 时填，封装层常开着
    trace: meta?.trace
  }
}

/**
 * 取 amagi 失败信封里记的平台名。
 * @param error - 捕获的异常
 * @returns 平台名，非 amagi 异常时为 `undefined`
 */
const amagiPlatformOf = (error: Error): RenderErrorOptions['platform'] | undefined => {
  if (!(error instanceof AmagiError)) return undefined
  return error.envelope.meta?.platform
}

/**
 * 错误堆栈：amagi 的错误只印真正的调用帧，其余异常保留完整对象转储。
 *
 * 对 `AmagiError` 做 `util.inspect(error, { depth: 10, showHidden: true })` 会把
 * 同一份数据打印四遍 —— message 一遍、`showHidden` 把 message 当自有属性再打一遍
 * （连 ANSI 转义都成了字面量）、`rawError` 一遍、`envelope` 又一遍，实测 118 行里
 * 只有 7 行是调用帧，`trace` 里那条上百字符的签名 URL 出现两次。
 *
 * 这些字段现在由「解析库错误诊断」那一节单独渲染，堆栈只需要回答「从哪儿抛的」。
 * 非 amagi 异常仍走转储：那种情况下自有属性往往是唯一线索。
 * @param error - 捕获的异常
 * @param override - 调用方显式指定的堆栈文本
 * @returns 供模板渲染的堆栈文本
 */
const stackOf = (error: Error, override?: string): string => {
  if (override) return override
  if (error instanceof AmagiError) return error.stack ?? error.message
  return util
    .inspect(error, { depth: 10, colors: true, breakLength: 120, showHidden: true })
    // oxlint-disable-next-line no-control-regex
    .replace(/\x1b\[90m/g, '\x1b[90;2m')
    // oxlint-disable-next-line no-control-regex
    .replace(/\x1b\[32m/g, '\x1b[31m')
}

/**
 * 渲染错误图片
 *
 * @param ctx - 错误处理上下文
 * @param opts - 渲染选项，可覆盖默认值
 * @returns 渲染后的图片元素数组
 *
 * @remarks
 * 使用 `other/handlerError` 模板渲染错误信息图片，
 * 包含错误详情、日志、触发命令、版本信息等
 *
 * @example
 * ```ts
 * const img = await renderErrorImage(ctx, {
 *   platform: 'bilibili',
 *   errorName: 'RiskControl',
 *   errorMessage: '风控验证'
 * })
 * await event.reply(img)
 * ```
 */
export const renderErrorImage = async (ctx: ErrorContext, opts: RenderErrorOptions = {}) => {
  const { error, options, logs, event, buildMetadata, adapterInfo } = ctx
  const amagi = amagiDetailOf(error)

  return Render(event, 'other/handlerError', {
    type: 'business_error',
    // amagi 的失败信封自带 meta.platform，比调用点顺手传的更准；
    // 小红书的报错原先一律落到 system，就是因为这里没人传
    platform: opts.platform ?? amagiPlatformOf(error) ?? 'system',
    error: {
      message: opts.errorMessage || error.message,
      name: opts.errorName || error.name,
      stack: stackOf(error, opts.stack),
      businessName: options.businessName
    },
    amagi,
    method: options.businessName,
    timestamp: new Date().toISOString(),
    logs: logs?.slice().reverse(),
    triggerCommand: event?.msg || '未知命令或处于非消息环境',
    frameworkVersion: Root.karinVersion,
    pluginVersion: Root.pluginVersion,
    buildTime: buildMetadata?.buildTime ? formatBuildTime(buildMetadata.buildTime) : undefined,
    commitHash: buildMetadata?.commitHash,
    adapterInfo,
    isVerification: opts.isVerification,
    verificationUrl: opts.verificationUrl,
    share_url: opts.share_url
  })
}
