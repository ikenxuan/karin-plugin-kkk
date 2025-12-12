import fs from 'node:fs'
import { dirname, resolve } from 'node:path'

/**
 * 获取 node-karin 版本
 * @param dir 当前目录
 */
export const getKarinVersion = (dir: string): string => {
  // 查找工作区根目录
  let currentDir = dir
  while (currentDir !== dirname(currentDir)) {
    if (fs.existsSync(resolve(currentDir, 'pnpm-workspace.yaml'))) {
      const pkgPath = resolve(currentDir, 'package.json')
      if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
        const version = pkg.dependencies?.['node-karin'] || pkg.devDependencies?.['node-karin']
        if (version) return version.replace(/[\^~]/g, '')
      }
    }
    currentDir = dirname(currentDir)
  }
  return '0.0.0'
}
