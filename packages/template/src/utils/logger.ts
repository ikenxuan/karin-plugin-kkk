import path from 'node:path'

import { Chalk, type ChalkInstance } from '@ikenxuan/amagi/chalk'

/**
 * 日志级别枚举
 */
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  MARK = 4
}

/**
 * 获取日志级别，优先使用环境变量，默认为 info
 */
const getLogLevel = (): LogLevel => {
  const logLevel = process.env.LOG_LEVEL || 'info'
  switch (logLevel.toLowerCase()) {
    case 'debug': return LogLevel.DEBUG
    case 'info': return LogLevel.INFO
    case 'warn': return LogLevel.WARN
    case 'error': return LogLevel.ERROR
    case 'mark': return LogLevel.MARK
    default: return LogLevel.INFO
  }
}

/**
 * 检查是否应该启用调用栈
 */
const shouldEnableCallStack = (): boolean => {
  // 显式设置环境变量
  if (process.env.ENABLE_CALL_STACK !== undefined) {
    return process.env.ENABLE_CALL_STACK === 'true'
  }
  
  // 开发环境默认启用
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  
  // tsx 运行时启用
  if (process.env.RUNTIME === 'tsx') {
    return true
  }
  
  // 生产环境下检查是否有可用的调用栈信息
  try {
    const stack = new Error().stack
    if (stack) {
      const stackLines = stack.split('\n')
      // 检查是否有非 node_modules 的调用栈
      const hasUserCode = stackLines.some(line => 
        line && 
        !line.includes('node_modules') && 
        (line.includes('.ts:') || line.includes('.js:')) &&
        !line.includes('at Error') &&
        !line.includes('at shouldEnableCallStack')
      )
      if (hasUserCode) {
        return true
      }
    }
  } catch {
    // 忽略错误
  }
  
  return false
}

/**
 * 检查是否应该启用颜色
 */
const shouldEnableColors = (): boolean => {
  // 显式设置环境变量
  if (process.env.FORCE_COLOR !== undefined) {
    return process.env.FORCE_COLOR !== '0'
  }
  
  // 检查是否在 TTY 环境中
  if (process.stdout && process.stdout.isTTY) {
    return true
  }
  
  // 检查常见的 CI 环境变量
  if (process.env.CI || process.env.GITHUB_ACTIONS || process.env.GITLAB_CI) {
    return false
  }
  
  return true
}

/**
 * 自定义日志器类
 */
class CustomLogger {
  private enableCallStack: boolean
  private enableColors: boolean
  public chalk: ChalkInstance
  public red: (text: string) => string
  public green: (text: string) => string
  public yellow: (text: string) => string
  public blue: (text: string) => string
  public magenta: (text: string) => string
  public cyan: (text: string) => string
  public white: (text: string) => string
  public gray: (text: string) => string

  constructor () {
    this.enableCallStack = shouldEnableCallStack()
    this.enableColors = shouldEnableColors()
    
    // 根据颜色支持情况初始化 chalk
    this.chalk = new Chalk({ level: this.enableColors ? 3 : 0 })
    this.red = this.chalk.red
    this.green = this.chalk.green
    this.yellow = this.chalk.yellow
    this.blue = this.chalk.blue
    this.magenta = this.chalk.magenta
    this.cyan = this.chalk.cyan
    this.white = this.chalk.white
    this.gray = this.chalk.gray
  }

  /**
   * 获取调用栈信息
   * @returns 调用点信息字符串 [文件名:行号]
   */
  private getCallSite (): string {
    if (!this.enableCallStack) return ''

    try {
      const stack = new Error().stack
      if (!stack) return ''

      const stackLines = stack.split('\n')
      
      // 寻找第一个有效的用户代码调用栈
      let targetLine = ''
      for (let i = 1; i < stackLines.length; i++) {
        const line = stackLines[i]
        if (!line) continue
        
        // 跳过当前 logger 相关的调用
        if (line.includes('getCallSite') || 
            line.includes('CustomLogger.log') ||
            line.includes('CustomLogger.debug') ||
            line.includes('CustomLogger.info') ||
            line.includes('CustomLogger.warn') ||
            line.includes('CustomLogger.error') ||
            line.includes('CustomLogger.mark')) {
          continue
        }
        
        if (!line.includes('node_modules')) {
          targetLine = line
          break
        } else if (!targetLine && line.includes('node_modules')) {
          targetLine = line
        }
      }

      if (!targetLine) return ''

      // 解析调用栈行，支持多种格式
      let match = targetLine.match(/at .+? \((.+?):(\d+):\d+\)/) || 
                  targetLine.match(/at (.+?):(\d+):\d+/)
      
      if (!match) return ''

      let fileName = match[1]
      const lineNumber = match[2]

      // 处理 file:// 协议
      if (fileName.startsWith('file:///')) {
        fileName = fileName.replace('file:///', '')
        if (process.platform === 'win32') {
          fileName = fileName.replace(/\//g, '\\')
        }
      } else if (fileName.startsWith('file://')) {
        fileName = fileName.replace('file://', '')
      }

      let relativePath = ''
      
      // 生产环境特殊处理：如果是 node_modules 中的文件
      if (fileName.includes('node_modules')) {
        // 提取包名和相对路径
        const nodeModulesMatch = fileName.match(/node_modules[\\\/]([^\\\/]+)[\\\/](.+)/)
        if (nodeModulesMatch) {
          const packageName = nodeModulesMatch[1]
          const packagePath = nodeModulesMatch[2]
          
          if (packageName === 'karin-plugin-kkk' || packageName.startsWith('@')) {
            relativePath = `${packageName}/${packagePath}`
          } else {
            relativePath = `node_modules/${packageName}/${packagePath}`
          }
        } else {
          // 备用方案：显示文件名
          relativePath = path.basename(fileName)
        }
      } else {
        // 开发环境：查找 monorepo 根目录
        let currentDir = fileName
        let monorepoRoot = ''
        
        while (currentDir !== path.dirname(currentDir)) {
          currentDir = path.dirname(currentDir)
          try {
            const fs = require('fs')
            if (fs.existsSync(path.join(currentDir, 'pnpm-workspace.yaml')) ||
                fs.existsSync(path.join(currentDir, 'lerna.json')) ||
                fs.existsSync(path.join(currentDir, 'rush.json')) ||
                fs.existsSync(path.join(currentDir, 'package.json'))) {
              monorepoRoot = currentDir
              break
            }
          } catch {
            continue
          }
        }
        
        if (monorepoRoot) {
          relativePath = path.relative(monorepoRoot, fileName)
        } else {
          // 处理 packages 目录结构
          const packagesMatch = fileName.match(/.*[\\\/]packages[\\\/](.+)/)
          if (packagesMatch) {
            relativePath = `packages/${packagesMatch[1]}`
          } else {
            relativePath = path.relative(process.cwd(), fileName)
          }
        }
      }
      
      // 统一使用正斜杠
      relativePath = relativePath.replace(/\\/g, '/')
      
      // 限制路径长度，避免过长的路径影响日志可读性
      if (relativePath.length > 60) {
        const parts = relativePath.split('/')
        if (parts.length > 2) {
          relativePath = `.../${parts.slice(-2).join('/')}`
        }
      }
      
      return `[${relativePath}:${lineNumber}] `
    } catch {
      // 生产环境或出错时返回空字符串
      return ''
    }
  }

  /**
   * 格式化时间戳
   * @returns 格式化的时间字符串
   */
  private formatTimestamp (): string {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0')
    return `${hours}:${minutes}:${seconds}.${milliseconds}`
  }

  /**
   * 输出日志
   * @param level 日志级别
   * @param levelStr 日志级别字符串
   * @param color 颜色函数
   * @param message 日志消息
   * @param args 额外参数
   */
  private log (level: LogLevel, levelStr: string, color: (text: string) => string, message: any, ...args: any[]) {
    const currentLevel = getLogLevel()
    if (level < currentLevel) return

    const timestamp = this.formatTimestamp()
    const formattedLevel = levelStr.padEnd(4)
    const callSite = this.getCallSite()
    
    // 构建日志前缀，根据颜色支持情况决定是否使用颜色
    const basePrefix = `[kkk/template][${timestamp}][${formattedLevel}]`
    const coloredPrefix = this.enableColors ? color(basePrefix) : basePrefix
    const prefix = coloredPrefix + (callSite ? ` ${this.enableColors ? this.gray(callSite) : callSite}` : '')

    // 根据日志级别选择不同的输出方法
    switch (level) {
      case LogLevel.ERROR:
        console.error(prefix, message, ...args)
        break
      case LogLevel.WARN:
        console.warn(prefix, message, ...args)
        break
      default:
        console.log(prefix, message, ...args)
        break
    }
  }

  /**
   * 打印调试级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  public debug (message: any, ...args: any[]) {
    this.log(LogLevel.DEBUG, 'DEBU', this.cyan, message, ...args)
  }

  /**
   * 打印信息级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  public info (message: any, ...args: any[]) {
    this.log(LogLevel.INFO, 'INFO', this.green, message, ...args)
  }

  /**
   * 打印警告级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  public warn (message: any, ...args: any[]) {
    this.log(LogLevel.WARN, 'WARN', this.yellow, message, ...args)
  }

  /**
   * 打印错误级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  public error (message: any, ...args: any[]) {
    this.log(LogLevel.ERROR, 'ERRO', this.red, message, ...args)
  }

  /**
   * 打印标记级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  public mark (message: any, ...args: any[]) {
    this.log(LogLevel.MARK, 'MARK', this.gray, message, ...args)
  }
}

const logger = new CustomLogger()

export { logger }