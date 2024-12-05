import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { config, getPluginInfo } from 'node-karin'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const pluginPath = join(__dirname, '..', '..', '..').replace(/\\/g, '/')

class Ver {
  /** 插件名字 */
  get pluginName () {
    return basename(pluginPath)
  }

  /** 插件版本号 */
  get pluginVersion () {
    return getPluginInfo('karin-plugin-kkk')?.pkg?.version
  }

  /** 插件路径 */
  get pluginPath () {
    return join(__dirname, '..', '..', '..').replace(/\\/g, '/')
  }

  /** Karin版本 */
  get karinVersion () {
    return config.pkg().version
  }

  /** Karin程序/客户端路径 */
  get karinPath () {
    return (process.cwd()).replace(/\\/g, '/')
  }
}

export const Version = new Ver()
