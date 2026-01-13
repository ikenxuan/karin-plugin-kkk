import type { AxiosRequestConfig } from 'node-karin/axios'
import { AxiosError } from 'node-karin/axios'

import { ERROR_CODE_MAP, RECOVERABLE_ERROR_CODES, RECOVERABLE_KEYWORDS } from './constants'

/**
 * 获取错误的中英文描述
 * @param error 错误对象
 * @returns 格式化的错误描述
 */
export const getErrorDescription = (error: any): string => {
  const code = error?.code || (error instanceof AxiosError ? error.code : null)
  const message = error?.message || String(error)

  if (code && ERROR_CODE_MAP[code]) {
    return `${ERROR_CODE_MAP[code]} (${code}): ${message}`
  } else if (code) {
    return `错误代码 ${code}: ${message}`
  } else {
    return message
  }
}

/**
 * 脱敏处理IP地址
 * @param text 包含IP的文本
 * @returns 脱敏后的文本
 */
export const sanitizeIP = (text: string): string => {
  if (!text) return text

  // IPv4 脱敏: 192.168.1.1 -> 192.168.*.*
  text = text.replace(/\b(\d{1,3}\.\d{1,3})\.\d{1,3}\.\d{1,3}\b/g, '$1.*.*')

  // IPv6 脱敏: 2001:0db8:85a3::8a2e:0370:7334 -> 2001:0db8:****
  text = text.replace(/\b([0-9a-fA-F]{1,4}:[0-9a-fA-F]{1,4}):[0-9a-fA-F:]+\b/g, '$1:****')

  return text
}

/**
 * 脱敏处理敏感请求头信息
 * @param headers 原始请求头
 * @returns 脱敏后的请求头（敏感字段直接删除）
 */
export const sanitizeHeaders = (
  headers: Record<string, string> | AxiosRequestConfig['headers']
): Record<string, string> => {
  if (!headers) return {}

  const sanitized: Record<string, string> = {}
  const sensitiveKeys = ['cookie', 'cookies', 'authorization', 'x-api-key', 'api-key', 'token']
  const ipSensitiveKeys = ['x-forwarded-for', 'x-real-ip', 'x-client-ip', 'x-originating-ip']

  for (const [key, value] of Object.entries(headers)) {
    const lowerKey = key.toLowerCase()

    // 敏感字段直接跳过，不添加到结果中
    if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
      continue
    }
    // IP 相关字段也直接跳过
    if (ipSensitiveKeys.some(sk => lowerKey.includes(sk))) {
      continue
    }
    // 其他字段保留
    sanitized[key] = String(value)
  }

  return sanitized
}

/**
 * 判断错误是否为可恢复的网络错误
 * @param error 错误对象
 * @returns 是否为可恢复错误
 */
export const isRecoverableNetworkError = (error: any): boolean => {
  // 检查错误代码
  if (error?.code && RECOVERABLE_ERROR_CODES.includes(error.code)) {
    return true
  }

  // 检查 AxiosError
  if (error instanceof AxiosError) {
    if (error.code && RECOVERABLE_ERROR_CODES.includes(error.code)) {
      return true
    }

    const errorMessage = error.message?.toLowerCase() || ''
    if (RECOVERABLE_KEYWORDS.some(keyword => errorMessage.includes(keyword.toLowerCase()))) {
      return true
    }
  }

  // 检查普通 Error
  if (error instanceof Error) {
    const errorMessage = error.message?.toLowerCase() || ''
    if (RECOVERABLE_KEYWORDS.some(keyword => errorMessage.includes(keyword.toLowerCase()))) {
      return true
    }
  }

  return false
}

/**
 * 判断是否为服务器断流（风控）导致的错误
 * @param error 错误对象
 * @returns 是否为断流错误
 */
export const isThrottlingError = (error: any): boolean => {
  const code = error?.code || (error instanceof AxiosError ? error.code : null)
  
  // ECONNRESET 是最常见的断流错误
  if (code === 'ECONNRESET') {
    return true
  }

  // 检查错误消息
  const message = error?.message?.toLowerCase() || ''
  const throttlingKeywords = ['connection reset', 'socket hang up', 'econnreset']
  
  return throttlingKeywords.some(keyword => message.includes(keyword))
}

/**
 * 计算指数退避延迟
 * @param retryCount 当前重试次数
 * @param baseDelay 基础延迟（毫秒）
 * @param maxDelay 最大延迟（毫秒）
 * @returns 延迟时间（毫秒）
 */
export const calculateBackoffDelay = (
  retryCount: number,
  baseDelay = 1000,
  maxDelay = 8000
): number => {
  return Math.min(2 ** retryCount * baseDelay, maxDelay)
}

/**
 * 格式化字节数为可读字符串
 * @param bytes 字节数
 * @returns 格式化后的字符串
 */
export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}
