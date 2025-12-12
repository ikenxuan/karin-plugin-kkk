import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

import { Chalk, type ChalkInstance } from 'node-karin/chalk'
import type { Logger, LogLevel } from 'node-karin/log4js'
import log4js from 'node-karin/log4js'

/** 获取包的绝对路径 */
const getPackageLogsPath = () => {
  const currentFileUrl = import.meta.url
  const currentFilePath = url.fileURLToPath(currentFileUrl)
  const currentDir = path.dirname(currentFilePath)

  let packageRoot = currentDir

  while (packageRoot !== path.dirname(packageRoot)) {
    if (fs.existsSync(path.join(packageRoot, 'package.json'))) {
      break
    }
    packageRoot = path.dirname(packageRoot)
  }

  // 确保 logs 目录存在
  const logsDir = path.join(packageRoot, 'logs')
  try {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true })
    }
  } catch {
    // 忽略创建目录错误，可能没有权限或者是在只读文件系统中
    // 在这种情况下，我们可能无法写入日志文件，但至少不会让程序崩溃
  }

  return logsDir
}

const logsPath = getPackageLogsPath()

/** 获取日志级别，优先使用环境变量，默认为 info */
const getLogLevel = (): string => {
  const logLevel = process.env.LOG_LEVEL ?? 'info'
  return logLevel
}

const currentLogLevel = getLogLevel()

/** 初始化 logger 配置 */
export const initLogger = () => {
  log4js.configure({
    appenders: {
      console: {
        type: 'stdout',
        layout: {
          type: 'pattern',
          pattern: '%[[kkk/template][%d{hh:mm:ss.SSS}][%4.4p]%] %m'
        }
      },
      command: {
        type: 'dateFile',
        filename: path.join(logsPath, 'application', 'command'),
        pattern: 'yyyy-MM-dd.log',
        numBackups: 15,
        alwaysIncludePattern: true,
        layout: {
          type: 'pattern',
          pattern: '[%d{hh:mm:ss.SSS}][%4.4p] %m'
        }
      }
    },
    categories: {
      default: { appenders: ['console', 'command'], level: currentLogLevel as LogLevel }
    },
    pm2: true
  })
}

class CustomLogger {
  private logger: Logger
  public chalk: ChalkInstance
  public red: (text: string) => string
  public green: (text: string) => string
  public yellow: (text: string) => string
  public blue: (text: string) => string
  public magenta: (text: string) => string
  public cyan: (text: string) => string
  public white: (text: string) => string
  public gray: (text: string) => string

  constructor (name: string) {
    this.logger = log4js.getLogger(name)
    this.chalk = new Chalk()
    this.red = this.chalk.red
    this.green = this.chalk.green
    this.yellow = this.chalk.yellow
    this.blue = this.chalk.blue
    this.magenta = this.chalk.magenta
    this.cyan = this.chalk.cyan
    this.white = this.chalk.white
    this.gray = this.chalk.gray
  }

  // 代理 log4js.Logger 的方法
  public info (message: any, ...args: any[]): void {
    this.logger.info(message, ...args)
  }

  public warn (message: any, ...args: any[]): void {
    this.logger.warn(message, ...args)
  }

  public error (message: any, ...args: any[]): void {
    this.logger.error(message, ...args)
  }

  public mark (message: any, ...args: any[]): void {
    this.logger.mark(message, ...args)
  }

  public debug (message: any, ...args: any[]): void {
    this.logger.debug(message, ...args)
  }
}

const logger: CustomLogger = new CustomLogger('default')

export { logger }
