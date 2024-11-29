import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Cfg, common } from 'node-karin'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const pluginPath = join(__dirname, '..', '..', '..').replace(/\\/g, '/')

export const Version = {
  /** 插件名字 */
  pluginName: basename(pluginPath),
  /** 插件版本号 */
  pluginVersion: common.pkgJson('karin-plugin-kkk')?.version,
  /** 插件路径 */
  pluginPath: join(__dirname, '..', '..', '..').replace(/\\/g, '/'),
  /** Karin版本 */
  karinVersion: Cfg.package.version,
  /** Karin程序/客户端路径 */
  karinPath: (process.cwd()).replace(/\\/g, '/')
}
