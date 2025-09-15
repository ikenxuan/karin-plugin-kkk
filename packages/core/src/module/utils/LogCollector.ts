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
    this.originalMethods.set('warn', logger.warn.bind(logger))
    this.originalMethods.set('error', logger.error.bind(logger))
    this.originalMethods.set('info', logger.info.bind(logger))
    this.originalMethods.set('debug', logger.debug.bind(logger))

    // 备份解析库的logger方法
    this.originalAmagiMethods.set('warn', amagiLogger.warn.bind(amagiLogger))
    this.originalAmagiMethods.set('error', amagiLogger.error.bind(amagiLogger))
    this.originalAmagiMethods.set('info', amagiLogger.info.bind(amagiLogger))
    this.originalAmagiMethods.set('debug', amagiLogger.debug.bind(amagiLogger))

    // 拦截node-karin的logger方法
    logger.warn = (...args: any[]) => {
      this.collectLog('warn', args, 'node-karin')
      const originalMethod = this.originalMethods.get('warn')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }

    logger.error = (...args: any[]) => {
      this.collectLog('error', args, 'node-karin')
      const originalMethod = this.originalMethods.get('error')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }

    logger.info = (...args: any[]) => {
      this.collectLog('info', args, 'node-karin')
      const originalMethod = this.originalMethods.get('info')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }

    logger.debug = (...args: any[]) => {
      this.collectLog('debug', args, 'node-karin')
      const originalMethod = this.originalMethods.get('debug')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }

    // 拦截解析库的logger方法
    amagiLogger.warn = (...args: any[]) => {
      this.collectLog('warn', args, 'amagi')
      const originalMethod = this.originalAmagiMethods.get('warn')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }

    amagiLogger.error = (...args: any[]) => {
      this.collectLog('error', args, 'amagi')
      const originalMethod = this.originalAmagiMethods.get('error')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }

    amagiLogger.info = (...args: any[]) => {
      this.collectLog('info', args, 'amagi')
      const originalMethod = this.originalAmagiMethods.get('info')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }

    amagiLogger.debug = (...args: any[]) => {
      this.collectLog('debug', args, 'amagi')
      const originalMethod = this.originalAmagiMethods.get('debug')
      if (originalMethod) {
        return originalMethod(...args)
      }
    }
  }

  /**
   * 停止收集日志并恢复原始方法
   */
  stopCollecting () {
    if (!this.isCollecting) return

    this.isCollecting = false

    // 恢复node-karin的logger方法
    const warnMethod = this.originalMethods.get('warn')
    const errorMethod = this.originalMethods.get('error')
    const infoMethod = this.originalMethods.get('info')
    const debugMethod = this.originalMethods.get('debug')

    if (warnMethod) logger.warn = warnMethod
    if (errorMethod) logger.error = errorMethod
    if (infoMethod) logger.info = infoMethod
    if (debugMethod) logger.debug = debugMethod

    // 恢复解析库的logger方法
    const amagiWarnMethod = this.originalAmagiMethods.get('warn')
    const amagiErrorMethod = this.originalAmagiMethods.get('error')
    const amagiInfoMethod = this.originalAmagiMethods.get('info')
    const amagiDebugMethod = this.originalAmagiMethods.get('debug')

    if (amagiWarnMethod) amagiLogger.warn = amagiWarnMethod
    if (amagiErrorMethod) amagiLogger.error = amagiErrorMethod
    if (amagiInfoMethod) amagiLogger.info = amagiInfoMethod
    if (amagiDebugMethod) amagiLogger.debug = amagiDebugMethod

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