import util from 'node:util'

import amagi from '@ikenxuan/amagi'
import karin, { config, logger, type Message, segment } from 'node-karin'
import { ApiErrorProps } from 'template/types/ohter/handlerError'

import { formatBuildTime, getBuildMetadata, Render, Root } from '@/module'

import { Config } from './Config'

/**
 * 错误处理装饰器选项
 */
type ErrorHandlerOptions = {
  /** 业务名称，用于错误报告 */
  businessName: string
  /** 自定义错误处理函数 */
  customErrorHandler?: (error: Error, logs: ApiErrorProps['data']['logs']) => Promise<void>
}

/**
 * 解析日志字符串为结构化对象
 * @param logs 原始日志字符串数组
 * @returns 结构化日志对象数组（过滤掉 TRAC 等级）
 */
const parseLogsToStructured = (logs: string[]): ApiErrorProps['data']['logs'] => {
  // 移除 ^ 和 $ 锚点，使用 dotall 模式匹配多行内容
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
      // 如果无法解析，返回默认格式
      return {
        timestamp: '',
        level: 'INFO' as const,
        message: log,
        raw: log
      }
    })
    .filter(log => log.level !== 'TRAC') // 过滤掉 TRAC 等级的日志
}

/**
 * 函数式错误处理包装器
 * @param fn 要包装的函数
 * @param options 错误处理选项
 * @returns 包装后的函数
 */
export const wrapWithErrorHandler = <T extends (...args: any[]) => Promise<any>> (
  fn: T,
  options: ErrorHandlerOptions
) => {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const context = await logger.runContext(async () => {
      return await fn(...args)
    })
    
    try {
      return await context.run()
    } catch (error) {
      await new Promise(resolve => setTimeout(resolve, 100))
      const result = context.logs()
      /** 格式化日志 */
      const structuredLogs = parseLogsToStructured(result)
      await handleBusinessError(error as Error, options, structuredLogs, args[0] as Message)
      throw error
    }
  }
}

/**
 * 获取推送配置中的机器人ID
 * @param pushlist 推送配置列表
 * @returns 机器人ID配置
 */
const statBotId = (pushlist: any) => {
  const douyin = pushlist.douyin?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  const bilibili = pushlist.bilibili?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  return {
    douyin: { botId: douyin },
    bilibili: { botId: bilibili }
  }
}

/**
 * 处理业务错误的核心函数
 * @param error 错误对象
 * @param options 错误处理选项
 * @param logs 收集到的日志
 * @param event 消息事件对象
 */
const handleBusinessError = async (
  error: Error,
  options: ErrorHandlerOptions,
  logs: ApiErrorProps['data']['logs'],
  event?: Message
) => {
  try {
    logger.debug(`[ErrorHandler] 开始处理业务错误: ${options.businessName}`)

    // 获取触发命令信息
    const triggerCommand = event?.msg || '未知命令或处于非消息环境'
    const buildMetadata = getBuildMetadata()

    // 获取适配器信息
    const adapterInfo = event?.bot?.adapter ? {
      name: event.bot.adapter.name,
      version: event.bot.adapter.version,
      platform: event.bot.adapter.platform,
      protocol: event.bot.adapter.protocol,
      standard: event.bot.adapter.standard
    } : undefined

    // 生成错误报告图片
    logger.debug('[ErrorHandler] 正在渲染错误页面...')
    const img = await Render('other/handlerError', {
      type: 'business_error',
      platform: 'system',
      error: {
        message: error.message,
        name: error.name,
        stack: util.format(error),
        businessName: options.businessName
      },
      method: options.businessName,
      timestamp: new Date().toISOString(),
      logs: logs,
      triggerCommand: triggerCommand,
      frameworkVersion: Root.karinVersion,
      pluginVersion: Root.pluginVersion,
      buildTime: buildMetadata?.buildTime ? formatBuildTime(buildMetadata.buildTime) : undefined,
      commitHash: buildMetadata?.commitHash,
      adapterInfo: adapterInfo,
      amagiVersion: amagi.version
    })

    logger.debug('[ErrorHandler] 错误页面渲染完成')

    // 发送给触发者
    if (event && Config.app.errorLogSendTo.some(item => item === 'trigger')) {
      try {
        logger.debug('[ErrorHandler] 正在发送错误消息给触发者...')
        await event.reply(img)
        logger.debug('[ErrorHandler] 错误消息已发送给触发者')
      } catch (replyError) {
        logger.error(`[ErrorHandler] 发送错误消息给用户失败: ${replyError}`)
      }
    }

    // 发送给主人
    if (Config.app.errorLogSendTo.some(item => item === 'master')) {
      try {
        logger.debug('[ErrorHandler] 正在发送错误消息给主人...')
        const list = config.master()
        let master = list[0]
        if (master === 'console') {
          master = list[1]
        }

        // 判断是否为推送任务
        const isPushTask = (event && Object.keys(event).length === 0) || options.businessName.includes('推送')

        // 选择一个可用的机器人ID
        let selectedBotId = ''
        if (isPushTask) {
          // 推送任务场景：从推送列表中查找可用的机器人
          const botId = statBotId(Config.pushlist)
          selectedBotId = botId.douyin.botId || botId.bilibili.botId || ''
        } else {
          // 消息场景：直接使用event中的机器人ID
          selectedBotId = event?.bot?.selfId || ''
        }

        if (selectedBotId && master) {
          if (isPushTask) {
            await karin.sendMaster(
              selectedBotId,
              master,
              [
                segment.text(`${options.businessName} 任务执行出错！\n请即时解决以消除警告`),
                ...img
              ]
            )
          } else {
            const Adapter = karin.getBot(selectedBotId)
            const groupID = event && 'groupId' in event ? event.groupId : ''
            const groupInfo = await Adapter?.getGroupInfo(groupID)

            await karin.sendMaster(
              selectedBotId,
              master,
              [
                segment.text(`群：${groupInfo?.groupName || '未知'}(${groupID})\n${options.businessName} 任务执行出错！\n请即时解决以消除警告`),
                ...img
              ]
            )
          }
          logger.debug('[ErrorHandler] 错误消息已发送给主人')
        } else {
          logger.warn(`[ErrorHandler] 无法发送给主人: selectedBotId=${selectedBotId}, master=${master}`)
        }
      } catch (masterError) {
        logger.error(`[ErrorHandler] 发送错误消息给主人失败: ${masterError}`)
      }
    }

    // 执行自定义错误处理
    if (options.customErrorHandler) {
      try {
        logger.debug('[ErrorHandler] 执行自定义错误处理...')
        await options.customErrorHandler(error, logs)
      } catch (customError) {
        logger.error(`[ErrorHandler] 自定义错误处理失败: ${customError}`)
      }
    }

    logger.debug('[ErrorHandler] 业务错误处理完成')
  } catch (handlerError) {
    logger.error(`[ErrorHandler] 错误处理器本身发生错误: ${handlerError}`)
    logger.error(`[ErrorHandler] 原始错误: ${error.message}`)
  }
}