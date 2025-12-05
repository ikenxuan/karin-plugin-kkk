import { createConsola } from 'consola'

/**
 * 日志实例
 */
export const logger = createConsola({
  formatOptions: {
    date: false,
    colors: true,
    compact: true,
  },
}).withTag('kkt')

/**
 * 设置日志级别
 */
export function setLogLevel(level: 'debug' | 'info' | 'warn' | 'error' | 'silent'): void {
  const levels: Record<string, number> = {
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    silent: 0,
  }
  logger.level = levels[level] ?? 3
}
