import type { ApiErrorProps } from 'template/types/platforms/ohter/handlerError'

import { Config } from '../Config'

/**
 * 解析日志字符串为结构化对象
 *
 * @param logs - 原始日志字符串数组
 * @returns 结构化日志对象数组，过滤掉 TRAC 级别日志
 *
 * @example
 * ```ts
 * const logs = ['[12:00:00.000][INFO] 消息内容']
 * const structured = parseLogsToStructured(logs)
 * // [{ timestamp: '12:00:00.000', level: 'INFO', message: '消息内容', raw: '...' }]
 * ```
 */
export const parseLogsToStructured = (logs: string[]): ApiErrorProps['data']['logs'] => {
  const logRegex = /\[(\d{2}:\d{2}:\d{2}\.\d{3})\]\[([A-Z]{4})\]\s(.+)/s
  return logs
    .map(log => {
      const match = log.match(logRegex)
      if (match) {
        return {
          timestamp: match[1],
          level: match[2] as 'TRAC' | 'DEBU' | 'MARK' | 'INFO' | 'ERRO' | 'WARN' | 'FATA',
          message: match[3],
          raw: log
        }
      }
      return { timestamp: '', level: 'INFO' as const, message: log, raw: log }
    })
    .filter(log => log.level !== 'TRAC')
}

/**
 * 获取推送配置中的机器人 ID
 *
 * @param pushlist - 推送列表配置对象
 * @returns 包含抖音和 B站 botId 的对象
 *
 * @example
 * ```ts
 * const ids = statBotId(Config.pushlist)
 * console.log(ids.douyin.botId) // '123456'
 * ```
 */
export const statBotId = (pushlist: any) => {
  const douyin = pushlist.douyin?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  const bilibili = pushlist.bilibili?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  return { douyin: { botId: douyin }, bilibili: { botId: bilibili } }
}

/**
 * 判断是否为推送任务
 *
 * @param event - 消息事件对象
 * @param businessName - 业务名称
 * @returns 是否为推送任务
 */
export const isPushTask = (event: any, businessName: string): boolean => {
  return (event && Object.keys(event).length === 0) || businessName.includes('推送')
}

/**
 * 获取推送任务的 botId
 *
 * @returns 优先返回抖音 botId，其次 B站 botId
 */
export const getPushTaskBotId = (): string => {
  const ids = statBotId(Config.pushlist)
  return ids.douyin.botId || ids.bilibili.botId
}
