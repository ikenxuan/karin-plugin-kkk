import karin, { config, logger, type Message, segment } from 'node-karin'

import { Render } from '@/module'

import { Config } from './Config'
import { LogCollector } from './LogCollector'

/**
 * 错误处理装饰器选项
 */
interface ErrorHandlerOptions {
  /** 业务名称，用于错误报告 */
  businessName: string
  /** 是否发送错误图片给用户，默认true */
  sendToUser?: boolean
  /** 是否发送错误图片给主人，默认true */
  sendToMaster?: boolean
  /** 自定义错误处理函数 */
  customErrorHandler?: (error: Error, logs: string) => Promise<void>
}

/**
 * 获取推送配置中的机器人ID
 * @param pushlist 推送配置列表
 * @returns 机器人ID配置
 */
function statBotId(pushlist: any) {
  const douyin = pushlist.douyin?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  const bilibili = pushlist.bilibili?.[0]?.group_id?.[0]?.split(':')?.[1] || ''
  return {
    douyin: { botId: douyin },
    bilibili: { botId: bilibili }
  }
}

/**
 * 通用错误处理装饰器
 * @param options 错误处理选项
 * @returns 装饰器函数
 */
export function withErrorHandler(options: ErrorHandlerOptions) {
  return function <T extends (...args: any[]) => Promise<any>>(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T>
  ) {
    const originalMethod = descriptor.value!
    
    descriptor.value = async function (this: any, ...args: any[]) {
      const logCollector = new LogCollector()
      
      try {
        // 开始收集日志
        logCollector.startCollecting()
        
        // 执行原始方法
        const result = await originalMethod.apply(this, args)
        
        return result
      } catch (error) {
        // 获取收集到的日志
        const collectedLogs = logCollector.getFormattedLogs()
        
        // 处理错误
        await handleBusinessError(error as Error, options, collectedLogs, args[0] as Message)
        
        // 重新抛出错误
        throw error
      } finally {
        // 停止日志收集
        logCollector.stopCollecting()
      }
    } as T
    
    return descriptor
  }
}

/**
 * 函数式错误处理包装器
 * @param fn 要包装的函数
 * @param options 错误处理选项
 * @returns 包装后的函数
 */
export function wrapWithErrorHandler<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: ErrorHandlerOptions
): T {
  return (async (...args: any[]) => {
    const logCollector = new LogCollector()
    
    try {
      // 开始收集日志
      logCollector.startCollecting()
      
      // 执行原始函数
      const result = await fn(...args)
      
      return result
    } catch (error) {
      // 获取收集到的日志
      const collectedLogs = logCollector.getFormattedLogs()
      
      // 处理错误
      await handleBusinessError(error as Error, options, collectedLogs, args[0] as Message)
      
      // 重新抛出错误
      throw error
    } finally {
      // 停止日志收集
      logCollector.stopCollecting()
    }
  }) as T
}

/**
 * 处理业务错误的核心函数
 * @param error 错误对象
 * @param options 错误处理选项
 * @param logs 收集到的日志
 * @param event 消息事件对象
 */
async function handleBusinessError(
  error: Error,
  options: ErrorHandlerOptions,
  logs: string,
  event?: Message
) {
  // 获取完整的调用栈
  const stackTrace = error.stack || '无法获取调用栈信息'
    
  // 生成错误报告图片
  const img = await Render('other/handlerError', {
    type: 'business_error',
    platform: 'system',
    error: {
      message: error.message,
      name: error.name,
      stack: stackTrace,
      businessName: options.businessName
    },
    method: options.businessName,
    timestamp: new Date().toISOString(),
    logs: logs
  })
    
  // 发送给用户
  if (event && options.sendToUser !== false) {
    try {
      await event.reply(img)
    } catch (replyError) {
      logger.error(`发送错误消息给用户失败: ${replyError}`)
    }
  }
    
  // 发送给主人（如果允许发送）
  if (options.sendToMaster !== false) {
    try {
      const botId = statBotId(Config.pushlist)
      const list = config.master()
      let master = list[0]
      if (master === 'console') {
        master = list[1]
      }
        
      // 选择一个可用的机器人ID
      const selectedBotId = botId.douyin.botId || botId.bilibili.botId || ''
        
      if (selectedBotId && master) {
        await karin.sendMaster(
          selectedBotId, 
          master, 
          [
            segment.text(`${options.businessName}执行出错！请即时解决以消除警告`),
            ...img
          ]
        )
      }
    } catch (masterError) {
      logger.error(`发送错误消息给主人失败: ${masterError}`)
    }
  }
    
  // 执行自定义错误处理
  if (options.customErrorHandler) {
    try {
      await options.customErrorHandler(error, logs)
    } catch (customError) {
      logger.error(`自定义错误处理失败: ${customError}`)
    }
  }
}