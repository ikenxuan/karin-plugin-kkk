/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */
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
  platform: 'douyin' | 'bilibili' | 'kuaishou' | 'system' | 'unknown'
  /** 错误信息 */
  error: BusinessError
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
