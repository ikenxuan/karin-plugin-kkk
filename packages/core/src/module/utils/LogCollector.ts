import { logger as amagiLogger } from '@ikenxuan/amagi'
import { logger } from 'node-karin'

/**
 * 日志收集器类，用于收集任务执行期间的所有日志信息
 */
export class LogCollector {
  /** 收集到的日志列表 */
  private logs: Array<{
    level: string
    message: string
    timestamp: string
    stack?: string
    source: string
  }> = []

  /** 原始的logger方法备份 */
  private originalMethods: Map<string, (...args: any[]) => void> = new Map()
  /** 原始的解析库logger方法备份 */
  private originalAmagiMethods: Map<string, (...args: any[]) => void> = new Map()

  /** 是否正在收集日志 */
  private isCollecting = false

  /**
   * 开始收集日志
   */
  startCollecting () {
    if (this.isCollecting) return

    this.isCollecting = true
    this.logs = []

    // 备份node-karin的logger方法
    this.originalMethods.set('warn', logger.warn)
    this.originalMethods.set('error', logger.error)
    this.originalMethods.set('info', logger.info)
    this.originalMethods.set('debug', logger.debug)

    // 备份解析库的logger方法
    this.originalAmagiMethods.set('warn', amagiLogger.warn)
    this.originalAmagiMethods.set('error', amagiLogger.error)
    this.originalAmagiMethods.set('info', amagiLogger.info)
    this.originalAmagiMethods.set('debug', amagiLogger.debug)

    // 拦截node-karin的logger方法
    logger.warn = (...args: any[]) => {
      this.collectLog('warn', args, 'node-karin')
      return this.originalMethods.get('warn')!.apply(logger, args)
    }

    logger.error = (...args: any[]) => {
      this.collectLog('error', args, 'node-karin')
      return this.originalMethods.get('error')!.apply(logger, args)
    }

    logger.info = (...args: any[]) => {
      this.collectLog('info', args, 'node-karin')
      return this.originalMethods.get('info')!.apply(logger, args)
    }

    logger.debug = (...args: any[]) => {
      this.collectLog('debug', args, 'node-karin')
      return this.originalMethods.get('debug')!.apply(logger, args)
    }

    // 拦截解析库的logger方法
    amagiLogger.warn = (...args: any[]) => {
      this.collectLog('warn', args, 'amagi')
      return this.originalAmagiMethods.get('warn')!.apply(amagiLogger, args)
    }

    amagiLogger.error = (...args: any[]) => {
      this.collectLog('error', args, 'amagi')
      return this.originalAmagiMethods.get('error')!.apply(amagiLogger, args)
    }

    amagiLogger.info = (...args: any[]) => {
      this.collectLog('info', args, 'amagi')
      return this.originalAmagiMethods.get('info')!.apply(amagiLogger, args)
    }

    amagiLogger.debug = (...args: any[]) => {
      this.collectLog('debug', args, 'amagi')
      return this.originalAmagiMethods.get('debug')!.apply(amagiLogger, args)
    }
  }

  /**
   * 停止收集日志并恢复原始方法
   */
  stopCollecting () {
    if (!this.isCollecting) return

    this.isCollecting = false

    // 恢复node-karin的logger方法
    logger.warn = this.originalMethods.get('warn')!
    logger.error = this.originalMethods.get('error')!
    logger.info = this.originalMethods.get('info')!
    logger.debug = this.originalMethods.get('debug')!

    // 恢复解析库的logger方法
    amagiLogger.warn = this.originalAmagiMethods.get('warn')!
    amagiLogger.error = this.originalAmagiMethods.get('error')!
    amagiLogger.info = this.originalAmagiMethods.get('info')!
    amagiLogger.debug = this.originalAmagiMethods.get('debug')!

    this.originalMethods.clear()
    this.originalAmagiMethods.clear()
  }

  /**
   * 收集日志信息
   * @param level 日志级别
   * @param args 日志参数
   * @param source 日志来源
   */
  private collectLog (level: string, args: any[], source: string) {
    if (!this.isCollecting) return

    const message = args.map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ')

    // 获取调用栈
    const stack = new Error().stack

    this.logs.push({
      level,
      message,
      timestamp: new Date().toISOString(),
      stack,
      source
    })
  }

  /**
   * 获取格式化的日志字符串
   * @returns 格式化的日志字符串
   */
  getFormattedLogs (): string {
    return this.logs.map(log => {
      return `[${log.timestamp}] [${log.source}] [${log.level.toUpperCase()}] ${log.message}`
    }).join('\n\n')
  }
}