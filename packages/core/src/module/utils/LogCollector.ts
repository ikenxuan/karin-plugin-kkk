import { logger as amagiLogger } from '@ikenxuan/amagi'

/**
 * 日志收集器类，收集任务执行期间的amagi日志信息
 */
export class LogCollector {
  /** 收集到的日志列表 */
  private logs: Array<{
    level: string
    message: string
    timestamp: string
    source: string
  }> = []

  /** 是否正在收集日志 */
  private isCollecting = false

  /** amagi logger原始方法备份 */
  private originalAmagiWarn: typeof amagiLogger.warn | null = null
  private originalAmagiError: typeof amagiLogger.error | null = null
  /** 是否已经拦截过amagi logger */
  private static isAmagiIntercepted = false

  /**
   * 构造函数
   */
  constructor () {
    // 如果还没有拦截过amagi logger，则进行拦截
    if (!LogCollector.isAmagiIntercepted) {
      this.interceptAmagiLogger()
      LogCollector.isAmagiIntercepted = true
    }
    // 注册当前实例
    this.registerInstance()
  }

  /**
   * 开始收集日志
   */
  startCollecting () {
    if (this.isCollecting) return

    this.isCollecting = true
    this.logs = []
  }

  /**
   * 停止收集日志
   */
  stopCollecting () {
    if (!this.isCollecting) return

    this.isCollecting = false
    // 停止收集时注销实例
    this.unregisterInstance()
  }

  /**
   * 拦截amagi logger的warn和error方法
   */
  private interceptAmagiLogger () {
    // 备份原始方法
    this.originalAmagiWarn = amagiLogger.warn.bind(amagiLogger)
    this.originalAmagiError = amagiLogger.error.bind(amagiLogger)

    // 替换warn方法
    amagiLogger.warn = (message: any, ...args: any[]) => {
      // 收集日志到所有活跃的收集器实例
      LogCollector.collectToAllInstances('warn', [message, ...args])
      // 调用原始方法
      if (this.originalAmagiWarn) {
        this.originalAmagiWarn(message, ...args)
      }
    }

    // 替换error方法
    amagiLogger.error = (message: any, ...args: any[]) => {
      // 收集日志到所有活跃的收集器实例
      LogCollector.collectToAllInstances('error', [message, ...args])
      // 调用原始方法
      if (this.originalAmagiError) {
        this.originalAmagiError(message, ...args)
      }
    }
  }

  /** 所有活跃的收集器实例 */
  private static activeInstances: LogCollector[] = []

  /**
   * 向所有活跃的收集器实例收集日志
   * @param level 日志级别
   * @param args 日志参数
   */
  private static collectToAllInstances (level: string, args: any[]) {
    LogCollector.activeInstances.forEach(instance => {
      if (instance.isCollecting) {
        instance.collectAmagiLog(level, args)
      }
    })
  }

  /**
   * 收集amagi日志
   * @param level 日志级别
   * @param args 日志参数
   */
  private collectAmagiLog (level: string, args: any[]) {
    if (!this.isCollecting) return

    const message = args.map(arg =>
      typeof arg === 'string' ? arg : JSON.stringify(arg)
    ).join(' ')

    const logEntry = {
      level,
      message,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      source: 'amagi'
    }

    this.logs.push(logEntry)
  }

  /**
   * 获取收集期间的所有日志
   * @returns 日志条目数组
   */
  getCollectedLogs (): Array<{
    level: string
    message: string
    timestamp: string
    source: string
  }> {
    return [...this.logs]
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

  /**
   * 清空收集到的日志
   */
  clearLogs () {
    this.logs = []
  }

  /**
   * 注册活跃实例
   */
  private registerInstance () {
    if (!LogCollector.activeInstances.includes(this)) {
      LogCollector.activeInstances.push(this)
    }
  }

  /**
   * 注销活跃实例
   */
  private unregisterInstance () {
    const index = LogCollector.activeInstances.indexOf(this)
    if (index > -1) {
      LogCollector.activeInstances.splice(index, 1)
    }
  }
}