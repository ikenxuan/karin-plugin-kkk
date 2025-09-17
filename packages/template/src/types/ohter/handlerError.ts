import type { BaseComponentProps } from '../index'

/**
 * 业务错误类型
 */
export interface BusinessError {
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
 * 内部错误类型
 */
export interface InternalError {
  /** 错误消息 */
  message: string
  /** 错误名称 */
  name: string
  /** 调用栈信息 */
  stack: string
}

/**
 * 平台配置映射
 */
export interface PlatformConfig {
  /** 平台显示名称 */
  displayName: string
  /** 平台颜色主题 */
  color: string
  /** 平台图标 */
  icon: string
}

/**
 * API错误组件属性接口
 */
export interface ApiErrorProps extends BaseComponentProps {
  /** 渲染请求数据 */
  data: {
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
    logs?: string | string[]
    /** 触发命令 - 新增字段 */
    triggerCommand?: string
    /** 分享链接 - 新增字段 */
    share_url?: string
    /** 是否使用暗色主题 - 新增字段 */
    useDarkTheme?: boolean
  }
  /** 分享链接 */
  qrCodeDataUrl: string
}

/**
 * 平台配置映射表
 */
export const PLATFORM_CONFIG: Record<ApiErrorProps['data']['platform'], PlatformConfig> = {
  douyin: {
    displayName: '抖音',
    color: '#fe2c55',
    icon: '🎵'
  },
  bilibili: {
    displayName: '哔哩哔哩',
    color: '#00a1d6',
    icon: '📺'
  },
  kuaishou: {
    displayName: '快手',
    color: '#ff6600',
    icon: '⚡'
  },
  system: {
    displayName: '系统',
    color: '#666666',
    icon: '⚙️'
  },
  unknown: {
    displayName: '未知平台',
    color: '#666666',
    icon: '❓'
  }
}

/**
 * 错误处理组件属性接口
 * 定义错误处理组件的完整属性结构
 */
export interface HandlerErrorProps {
  /** 错误类型 */
  type: 'api_error' | 'internal_error' | 'business_error'
  /** 平台标识 */
  platform: string
  /** 错误对象 */
  error: BusinessError
  /** 方法名称 */
  method: string
  /** 时间戳 */
  timestamp: string
  /** 相关日志，可以是字符串或字符串数组 */
  logs?: string | string[]
  /** 触发命令 - 新增字段 */
  triggerCommand?: string
  /** 分享链接 - 新增字段 */
  share_url?: string
  /** 是否使用暗色主题 - 新增字段 */
  useDarkTheme?: boolean
  /** 模板类型 */
  templateType: string
  /** 模板名称 */
  templateName: string
}