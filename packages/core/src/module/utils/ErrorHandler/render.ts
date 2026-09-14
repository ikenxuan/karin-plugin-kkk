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
 * 自有属性的转储（`util.inspect`，带 ANSI）。
 *
 * 三样东西不进转储：`stack`（调用帧在上面的「错误堆栈」一节已经有结构高亮的那份）、
 * `message` 与 `name`（栈首行就是 `名字: message`）。剩下的是调用点或上游挂上的
 * 数据：Node 的 `errno` / `syscall`、三方库的响应体、OneBot 的 `cause`（`retcode`
 * / `wording`）—— 这些堆栈里一个字都没有，是转储存在的全部理由。
 *
 * 一个都不剩就返回 `undefined`：引擎抛的 `TypeError: Cannot read properties of
 * null` 只有 message，再来一块空转储没有意义。
 *
 * `cause` 链原样保留 —— 它的帧在上层栈里恰好被 `... N lines matching cause stack
 * trace ...` 省略掉了，属于补充而非重复。
 * @param error - 捕获的异常
 * @returns 供模板渲染的转储文本，没有额外信息时为 `undefined`
 */
const dumpOf = (error: Error): string | undefined => {
  const source = error as unknown as Record<string, unknown>
  const skip = new Set(['stack', 'message', 'name'])
  const own: Record<string, unknown> = {}
  for (const key of Object.getOwnPropertyNames(error)) {
    if (skip.has(key)) continue
    try {
      own[key] = source[key]
    } catch {
      // 取值就抛的 getter（罕见）跳过，别让转储把渲染带崩
    }
  }
  if (Object.keys(own).length === 0) return undefined
  return (
    util
      .inspect(own, { depth: 10, colors: true, breakLength: 120, showHidden: true })
      // oxlint-disable-next-line no-control-regex
      .replace(/\x1b\[90m/g, '\x1b[90;2m')
      // oxlint-disable-next-line no-control-regex
      .replace(/\x1b\[32m/g, '\x1b[31m')
  )
}

/**
 * 错误堆栈与对象转储：调用帧一律走纯文本，交给模板按结构上色。
 *
 * 对 `AmagiError` 做 `util.inspect(error, { depth: 10, showHidden: true })` 会把
 * 同一份数据打印四遍 —— message 一遍、`showHidden` 把 message 当自有属性再打一遍
 * （连 ANSI 转义都成了字面量）、`rawError` 一遍、`envelope` 又一遍，实测 118 行里
 * 只有 7 行是调用帧，`trace` 里那条上百字符的签名 URL 出现两次。这些字段现在由
 * 「解析库错误诊断」那一节单独渲染，堆栈只需要回答「从哪儿抛的」。
 *
 * 非 amagi 异常同样只把帧交给堆栈一节：`error.stack` 本身就是纯文本，模板据此按
 * 结构上色（整对象转储一并塞进去的话，那些帧会掉进 ANSI 解析器里渲染成一片单色），
 * 自有属性另走 {@link dumpOf} —— 上游协议实现那一层（OneBot 的 retcode/wording、
 * Node 的 errno/syscall）没有调用栈，只能靠它呈现。
 * @param error - 捕获的异常
 * @param override - 调用方显式指定的堆栈文本
 * @returns 纯文本堆栈；非 amagi 异常且确有 message / name 之外的自有属性时，附带转储
 */
const stackPartsOf = (error: Error, override?: string): { stack: string; dump?: string } => {
  if (override) return { stack: override }
  if (error instanceof AmagiError) return { stack: error.stack ?? error.message }
  return { stack: error.stack ?? error.message, dump: dumpOf(error) }
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
  const { stack, dump } = stackPartsOf(error, opts.stack)

  return Render(event, 'other/handlerError', {
    type: 'business_error',
    // amagi 的失败信封自带 meta.platform，比调用点顺手传的更准；
    // 小红书的报错原先一律落到 system，就是因为这里没人传
    platform: opts.platform ?? amagiPlatformOf(error) ?? 'system',
    error: {
      message: opts.errorMessage || error.message,
      name: opts.errorName || error.name,
      stack,
      dump,
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
