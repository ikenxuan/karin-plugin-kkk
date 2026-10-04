import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

import { setUnicodeEmojiSrcResolver } from '@kkk/richtext'

import { logger } from '@/module/utils/logger'

/**
 * Unicode emoji 图源：emoji-datasource-apple（Apple 64px PNG）。
 *
 * 图源不进插件发布产物——以 dependencies 随 node_modules 安装（pnpm 全局去重），
 * 渲染时直读文件转 data: URL 内联进富文本 JSON：data: 协议在 richtext 的图片来源
 * 白名单里天然放行，file:// 页面、bridge http 页面、开发面板三条加载路径都能用，
 * 不依赖任何静态路由。
 *
 * 本模块被 Render/index.ts 引入即完成解析器注册；文件内容按文件名做进程级缓存。
 */
const require = createRequire(import.meta.url)

let assetDir: string | null = null
const getAssetDir = (): string | null => {
  if (assetDir === null) {
    try {
      assetDir = path.join(path.dirname(require.resolve('emoji-datasource-apple/package.json')), 'img', 'apple', '64')
    } catch (error) {
      // 包缺失时解析器保持返回 null，emoji 回退为文本渲染，不阻断启动
      logger.warn(
        `未找到 emoji-datasource-apple 包，Unicode emoji 将回退为文本渲染: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }
  return assetDir
}

const dataUrlCache = new Map<string, string | null>()

const resolveEmojiSrc = (filename: string): string | null => {
  if (dataUrlCache.has(filename)) {
    return dataUrlCache.get(filename) as string | null
  }

  let src: string | null = null
  const dir = getAssetDir()
  if (dir !== null) {
    try {
      const file = path.join(dir, `${filename}.png`)
      if (fs.existsSync(file)) {
        src = `data:image/png;base64,${fs.readFileSync(file).toString('base64')}`
      }
    } catch {
      src = null
    }
  }

  dataUrlCache.set(filename, src)
  return src
}

setUnicodeEmojiSrcResolver(resolveEmojiSrc)
