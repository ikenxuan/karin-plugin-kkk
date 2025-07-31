import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const pluginPath = path.join(fileURLToPath(import.meta.url), '../..')
const pkg = JSON.parse(fs.readFileSync(path.join(pluginPath, 'package.json'), 'utf-8'))

export const Root: {
  /** 插件名字 */
  pluginName: string
  /** 插件版本号 */
  pluginVersion: string
  /** 插件路径 */
  pluginPath: string
  /** Karin版本 */
  karinVersion: string
} = {
  pluginName: pkg.name,
  pluginVersion: pkg.version,
  pluginPath,
  karinVersion: process.env.KARIN_VERSION!
}
