import util from 'node:util'

import amagi from '@ikenxuan/amagi'
import karin, { config, logger, type Message, segment } from 'node-karin'
import { ApiErrorProps } from 'template/types/ohter/handlerError'

import { formatBuildTime, getBuildMetadata, Render, Root } from '@/module'

import { Config } from './Config'

/**
 * 错误处理选项
 */
export type ErrorHandlerOptions = {
  /** 业务名称，用于错误报告 */
  businessName: string
  /** 自定义错误处理函数 */
  customErrorHandler?: (error: Error, logs: ApiErrorProps['data']['logs']) => Promise<void>
}

/**
 * 错误处理上下文
 */
export interface ErrorContext {
  error: Error
  options: ErrorHandlerOptions
  logs: ApiErrorProps['data']['logs']
  event?: Message
  buildMetadata: ReturnType<typeof getBuildMetadata>
  adapterInfo?: ApiErrorProps['data']['adapterInfo']
}

/**
 * 特殊错误处理策略接口
 */
export interface ErrorStrategy {
  /** 策略名称 */
  name: string
  /** 判断是否匹配该策略 */
  match: (ctx: ErrorContext) => boolean
  /** 处理错误，返回 'handled' 表示已完全处理，'continue' 继续默认处理 */
  handle: (ctx: ErrorContext) => Promise<'handled' | 'continue'>
}

// ==================== 策略注册 ====================

const strategies: ErrorStrategy[] = []

/** 注册错误处理策略 */
export const registerErrorStrategy = (strategy: ErrorStrategy) => {
  strategies.push(strategy)
  logger.debug(`[ErrorHandler] 注册策略: ${strategy.name}`)
}

// ==================== 工具函数 ====================

/** 解析日志字符串为结构化对象 */
const parseLogsToStructured = (logs: string[]): ApiErrorProps['data']['logs'] => {
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

/** 获取推送配置中的机器人ID */
const statBotId = (pushlist: any) => {
  const douyin = pushlist.douyin?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  const bilibili = pushlist.bilibili?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  return { douyin: { botId: douyin }, bilibili: { botId: bilibili } }
}

/** 渲染错误图片的选项 */
export interface RenderErrorOptions {
  platform?: ApiErrorProps['data']['platform']
  errorName?: string
  errorMessage?: string
  stack?: string
  isVerification?: boolean
  verificationUrl?: string
  share_url?: string
}

/** 渲染错误图片（供策略使用） */
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

/** 发送错误图片给主人（供策略使用） */
export const sendErrorToMaster = async (
  ctx: ErrorContext,
  img: Awaited<ReturnType<typeof renderErrorImage>>,
  customPrefix?: string
) => {
  const { options, event } = ctx

  if (!Config.app.errorLogSendTo.some(item => item === 'master')) return

  const list = config.master()
  const master = list[0] === 'console' ? list[1] : list[0]
  const isPushTask = (event && Object.keys(event).length === 0) || options.businessName.includes('推送')
  const botId = isPushTask
    ? (statBotId(Config.pushlist).douyin.botId || statBotId(Config.pushlist).bilibili.botId)
    : event?.bot?.selfId

  if (!botId || !master) return

  try {
    const prefix = customPrefix || (isPushTask
      ? `${options.businessName} 任务执行出错！\n请即时解决以消除警告`
      : `群：${(await karin.getBot(botId)?.getGroupInfo(event && 'groupId' in event ? event.groupId : ''))?.groupName || '未知'}(${event && 'groupId' in event ? event.groupId : ''})\n${options.businessName} 任务执行出错！\n请即时解决以消除警告`)
    await karin.sendMaster(botId, master, [segment.text(prefix), ...img])
  } catch (err) {
    logger.error(`[ErrorHandler] 发送错误消息给主人失败: ${err}`)
  }
}

// ==================== 核心错误处理 ====================

/** 处理业务错误的核心函数 */
const handleBusinessError = async (
  error: Error,
  options: ErrorHandlerOptions,
  logs: ApiErrorProps['data']['logs'],
  event?: Message
): Promise<'handled' | undefined> => {
  try {
    logger.debug(`[ErrorHandler] 开始处理业务错误: ${options.businessName}`)

    const buildMetadata = getBuildMetadata()
    const adapterInfo = event?.bot?.adapter
      ? {
        name: event.bot.adapter.name,
        version: event.bot.adapter.version,
        platform: event.bot.adapter.platform,
        protocol: event.bot.adapter.protocol,
        standard: event.bot.adapter.standard
      }
      : undefined

    const ctx: ErrorContext = { error, options, logs, event, buildMetadata, adapterInfo }

    // 遍历策略，找到匹配的进行处理
    for (const strategy of strategies) {
      if (strategy.match(ctx)) {
        logger.debug(`[ErrorHandler] 匹配策略: ${strategy.name}`)
        const result = await strategy.handle(ctx)
        if (result === 'handled') return 'handled'
      }
    }

    // 默认错误处理
    const img = await renderErrorImage(ctx)

    // 发送给触发者
    if (event && Config.app.errorLogSendTo.some(item => item === 'trigger')) {
      try {
        await event.reply(img)
      } catch (err) {
        logger.error(`[ErrorHandler] 发送错误消息给用户失败: ${err}`)
      }
    }

    // 发送给主人
    if (Config.app.errorLogSendTo.some(item => item === 'master')) {
      const list = config.master()
      const master = list[0] === 'console' ? list[1] : list[0]
      const isPushTask = (event && Object.keys(event).length === 0) || options.businessName.includes('推送')
      const botId = isPushTask
        ? (statBotId(Config.pushlist).douyin.botId || statBotId(Config.pushlist).bilibili.botId)
        : event?.bot?.selfId

      if (botId && master) {
        const prefix = isPushTask
          ? `${options.businessName} 任务执行出错！\n请即时解决以消除警告`
          : `群：${(await karin.getBot(botId)?.getGroupInfo(event && 'groupId' in event ? event.groupId : ''))?.groupName || '未知'}(${event && 'groupId' in event ? event.groupId : ''})\n${options.businessName} 任务执行出错！\n请即时解决以消除警告`
        await karin.sendMaster(botId, master, [segment.text(prefix), ...img])
      }
    }

    // 自定义错误处理
    if (options.customErrorHandler) {
      try {
        await options.customErrorHandler(error, logs)
      } catch (err) {
        logger.error(`[ErrorHandler] 自定义错误处理失败: ${err}`)
      }
    }
  } catch (handlerError) {
    logger.error(`[ErrorHandler] 错误处理器本身发生错误: ${handlerError}`)
  }
  return undefined
}

// ==================== 导出 ====================

/** 函数式错误处理包装器 */
export const wrapWithErrorHandler = <R>(
  fn: (e: Message, next: () => unknown) => R | Promise<R>,
  options: ErrorHandlerOptions
) => {
  return async (e: Message, next: () => unknown): Promise<R> => {
    const ctx = logger.runContext(async () => fn(e, next))

    try {
      return await ctx.run()
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 100))
      const structuredLogs = parseLogsToStructured(ctx.logs())
      const result = await handleBusinessError(error as Error, options, structuredLogs, e)
      if (result === 'handled') return undefined as R
      throw error
    }
  }
}
