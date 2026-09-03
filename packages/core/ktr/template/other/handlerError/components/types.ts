/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */
import type { AmagiErrorCode, ErrorKind, RequestTrace, ValidationIssue } from '@ikenxuan/amagi'
import type { AdapterInfo as KarinAdapterInfo } from 'node-karin'

/** 业务错误类型。组件内需要时从总类型取：ApiErrorData['error'] */
interface BusinessError {
  /** 错误消息 */
  message: string
  /** 错误名称 */
  name: string
  /** 调用栈信息 */
  stack: string
  /** 业务名称 */
  businessName: string
}

/**
 * amagi v7 的分层错误信息。
 *
 * v6 只有一个混装的 `code`（HTTP 状态码、平台业务码、内部码挤在一起），错误图
 * 也就只能印那个数字。v7 把三种码分了层，另外还给出可重试与请求归因信息 ——
 * 这些正是「这次失败该怎么办」的判据，所以整块透到模板上：
 * `kind` 决定是配置问题还是平台问题，`retryable` 决定要不要让用户重试，
 * `requestId` / `attempts` 决定排查时从哪条日志看起。
 *
 * 只有 amagi 抛出的错误才有这一块；插件自身的异常没有。
 */
export interface AmagiErrorDetail {
  /** 跨平台统一的错误大类，12 个之一 */
  kind: ErrorKind
  /** amagi 自己的字符串错误码，22 个之一 */
  code: AmagiErrorCode
  /** 平台返回的原文（未经 inspect 包装） */
  reason: string
  /** 是否值得重试 */
  retryable: boolean
  /** 平台业务码，如 B站的 -352（风控）/ 12061（评论区关闭） */
  platformCode?: string | number
  /** 真实发生的 HTTP 状态 */
  httpStatus?: number
  /** 一次逻辑调用的 id，事件、日志、trace 共用 */
  requestId?: string
  /** 实际发出的请求数，含重试与翻页 */
  attempts?: number
  /** 从 fetcher 入口到信封返回的耗时（毫秒） */
  durationMs?: number
  /** 参数校验的字段级错误，仅 `kind === 'validation'` 时有 */
  issues?: ValidationIssue[]
  /**
   * 逐个请求的明细：URL（含签名参数）、方法、HTTP 状态、耗时与发起原因
   * （`initial` / `retry` / `page` / `segment` / `prepare`）。
   *
   * amagi 只在 `debug: true` 时把它放进 `meta.trace`。它替代了原先靠
   * `util.inspect` 整体转储才能看到的那部分上下文 —— 一次「翻 3 页 + 重试 1 次」
   * 的调用在这里就是 4 行，而转储要几十行还会把同一个 URL 印两遍。
   */
  trace?: RequestTrace[]
}

/** 日志等级类型。组件内需要时从总类型逐步取：NonNullable<ApiErrorData['logs']>[number]['level'] */
type LogLevel = 'TRAC' | 'DEBU' | 'MARK' | 'INFO' | 'ERRO' | 'WARN' | 'FATA'

/** 日志条目接口。 */
interface LogEntry {
  /** 时间戳 */
  timestamp: string
  /** 日志等级 */
  level: LogLevel
  /** 日志内容 */
  message: string
  /** 原始日志字符串 */
  raw: string
}

/** 适配器信息接口。 */
type AdapterInfo = Omit<KarinAdapterInfo, 'index' | 'secret' | 'connectTime' | 'address'>

/**
 * API错误组件属性接口
 */
export interface ApiErrorData {
  /** 错误类型 */
  type: 'business_error'
  /** 平台名称 */
  platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu' | 'system' | 'unknown'
  /** 错误信息 */
  error: BusinessError
  /** amagi v7 的分层错误信息，仅当这次失败来自 amagi 时有 */
  amagi?: AmagiErrorDetail
  /** 调用的方法名 */
  method: string
  /** 错误发生时间 */
  timestamp: string
  /** 收集到的日志信息 */
  logs?: LogEntry[]
  /** 触发命令 */
  triggerCommand?: string
  /** 框架版本 */
  frameworkVersion: string
  /** 插件版本 */
  pluginVersion: string
  /** 构建时间 */
  buildTime?: string
  /** Commit ID */
  commitHash?: string
  /** 适配器信息 */
  adapterInfo?: AdapterInfo
  /** 是否为验证流程 */
  isVerification?: boolean
  /** 验证链接 */
  verificationUrl?: string
  /** 分享链接（用于生成二维码） */
  share_url?: string
}
