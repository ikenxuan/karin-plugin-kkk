import { constants, copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

import { karinPathBase, karinPathTemp } from 'node-karin/root'

import { logger } from '@/module/utils/logger'
import { Root } from '@/root'

type ShareDataFile = 'douyin-app-session.json' | 'douyin-share-command-patterns.json'

/** 只在 data 尚未有对应文件时导入旧 temp 文件，避免重置现有游客设备身份。 */
export const prepareDouyinShareDataFile = (filename: ShareDataFile): string => {
  const directory = join(karinPathBase, Root.pluginName, 'data')
  const file = join(directory, filename)
  if (existsSync(file)) return file

  const previous = join(karinPathTemp, Root.pluginName, filename)
  if (existsSync(previous)) {
    try {
      mkdirSync(directory, { recursive: true })
      copyFileSync(previous, file, constants.COPYFILE_EXCL)
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code
      if (code !== 'EEXIST' && code !== 'ENOENT') logger.warn(`[实验室] 无法将 ${filename} 导入插件数据目录：${code ?? '未知错误'}`)
    }
  }

  return file
}
