import util from 'node:util'

import amagi from '@ikenxuan/amagi'

import { formatBuildTime, Render, Root } from '@/module'

import type { ErrorContext, RenderErrorOptions } from './types'

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

  return Render('other/handlerError', {
    type: 'business_error',
    platform: opts.platform || 'system',
    error: {
      message: opts.errorMessage || error.message,
      name: opts.errorName || error.name,
      stack: opts.stack || util.inspect(error, { depth: 10, colors: true, breakLength: 120, showHidden: true })
        .replace(/\x1b\[90m/g, '\x1b[90;2m')
        .replace(/\x1b\[32m/g, '\x1b[31m'),
      businessName: options.businessName
    },
    method: options.businessName,
    timestamp: new Date().toISOString(),
    logs: logs?.slice().reverse(),
    triggerCommand: event?.msg || '未知命令或处于非消息环境',
    frameworkVersion: Root.karinVersion,
    pluginVersion: Root.pluginVersion,
    buildTime: buildMetadata?.buildTime ? formatBuildTime(buildMetadata.buildTime) : undefined,
    commitHash: buildMetadata?.commitHash,
    adapterInfo,
    amagiVersion: amagi.version,
    isVerification: opts.isVerification,
    verificationUrl: opts.verificationUrl,
    share_url: opts.share_url
  })
}
