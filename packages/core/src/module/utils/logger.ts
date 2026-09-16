import { logger as karinLogger, type Logger, type LogMethodNames } from 'node-karin'

import { Root } from '@/root'

/**
 * 强制打开 chalk 颜色。
 *
 * chalk 只在输出是终端时才上色，Karin 挂到后台（pm2、`> log` 重定向）时 `stdout` 不是 TTY，
 * 等级标记、插件前缀和 `logger.green` 这类颜色调用会全部褪成纯文本。
 * chalk 的导出是单例，这里设一次，全进程（含 node-karin 自己渲染等级标记）都按 24 位真彩输出。
 *
 * 代价是颜色码会一并写进日志文件，用编辑器直接看会看到转义序列；换来的是 pm2 logs / docker logs
 * 里仍然分得清来源。日志里不想留转义序列的话，出管道时自己 strip 一道，`NO_COLOR` 在这里不起作用
 * （Karin 的 `%[[...]]` 等级标记本来就是无条件下色的，只关 chalk 会让同一行半彩半素）。
 */
karinLogger.chalk.level = 3

/** 日志等级方法名，与 Karin logger 的各等级一一对应 */
const LEVELS: LogMethodNames[] = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

/** 前缀配色。用 hex 而不是 `logger.violet`：后者在运行时会被覆盖成白色 */
const prefixColor = karinLogger.chalk.hex('#868ECC')

/**
 * 统一的插件日志接口：与 `node-karin` 的 `logger` 完全同形，
 * 区别只在每条日志都由本对象统一带上插件前缀。
 */
export interface PluginLogger extends Logger {}

/**
 * 插件日志，全仓统一从这里取 `logger`，不要再从 `node-karin` 直接导入。
 *
 * 前缀取 `Root.pluginName`（即 package.json 的 name），安装成什么名字就用什么前缀；
 * 各等级方法在转发前统一拼上染色后的 `[插件名]`，调用处只写正文即可。
 *
 * 其余成员（`chalk` 及各颜色方法、`bot` 等）按需从 Karin 的 logger 上取，取回来的函数先绑定到
 * 原对象——log4js 的等级方法内部依赖 `this._log`，脱离实例直接调用会抛错。
 *
 * 注意：`templateFonts.ts` 这类同时被 ktr 构建配置引用的模块不能用本 logger（构建进程里没有 Karin）。
 */
export const logger: PluginLogger = new Proxy(karinLogger, {
  get(target, prop, receiver) {
    if (typeof prop === 'string' && LEVELS.includes(prop as LogMethodNames)) {
      const level = prop as LogMethodNames
      return (...args: any[]) => target[level](prefixColor(`[${Root.pluginName}]`), ...args)
    }

    const value = Reflect.get(target, prop, receiver)
    return typeof value === 'function' ? value.bind(target) : value
  }
})
