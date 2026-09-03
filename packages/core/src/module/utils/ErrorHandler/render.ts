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
    issues: error.issues
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
      stack:
        opts.stack ||
        util
          .inspect(error, { depth: 10, colors: true, breakLength: 120, showHidden: true })
          // oxlint-disable-next-line no-control-regex
          .replace(/\x1b\[90m/g, '\x1b[90;2m')
          // oxlint-disable-next-line no-control-regex
          .replace(/\x1b\[32m/g, '\x1b[31m'),
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
