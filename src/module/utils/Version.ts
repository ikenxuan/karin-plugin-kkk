import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { config, getPkgVersion, getPluginInfo } from 'node-karin'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const pluginPath = join(__dirname, '..', '..', '..').replace(/\\/g, '/')

const pluginName = basename(pluginPath)

const Ver = {
  /** 插件名字 */
  pluginName,

  /** 插件版本号 */
  pluginVersion: getPluginInfo('karin-plugin-kkk')?.pkg?.version as string || await getPkgVersion(pluginName),

  /** 插件路径 */
  pluginPath: join(__dirname, '..', '..', '..').replace(/\\/g, '/'),

  /** Karin版本 */
  karinVersion: config.pkg().version,

  /** Karin程序/客户端路径 */
  karinPath: (process.cwd()).replace(/\\/g, '/')
}

export const Version = Ver
