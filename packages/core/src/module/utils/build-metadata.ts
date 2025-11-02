import fs from 'node:fs'
import { resolve } from 'node:path'

import { logger } from 'node-karin'

import { Root } from '../../root'

export interface BuildMetadata {
  version: string
  buildTime: string
  buildTimestamp: number
  name: string
  description: string
  homepage: string
  commitHash: string
  shortCommitHash: string
}

let cachedMetadata: BuildMetadata | null = null

/**
 * 获取构建元数据
 * @returns 构建元数据对象，如果读取失败则返回 null
 */
export const getBuildMetadata = (): BuildMetadata | null => {
  if (cachedMetadata) {
    return cachedMetadata
  }

  try {
    // 使用插件路径 + lib/build-metadata.json
    // Root.pluginPath 指向插件根目录，构建后的元数据在 lib 目录下
    const metadataPath = resolve(Root.pluginPath, 'lib/build-metadata.json')
    if (fs.existsSync(metadataPath)) {
      const content = fs.readFileSync(metadataPath, 'utf-8')
      cachedMetadata = JSON.parse(content)
      return cachedMetadata
    }
  } catch (error) {
    logger.error('无法读取构建元数据:', error)
  }

  return null
}

/**
 * 格式化构建时间为可读格式
 * @param isoString ISO 格式的时间字符串
 * @returns 格式化后的时间字符串，格式：2025年11月02日 17:30
 */
export const formatBuildTime = (isoString: string): string => {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${year}年${month}月${day}日 ${hour}:${minute}`
}
