import fs from 'node:fs'
import path from 'node:path'

import karin, { logger } from 'node-karin'

import { Common } from '@/module'
import { Config } from '@/module/utils/Config'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { bilibiliLogin } from '@/platform'
import { douyinLogin } from '@/platform/douyin/login'

// 包装缓存清理任务
const handleCacheCleanup = wrapWithErrorHandler(async () => {
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000 // 2小时前的时间戳

  // 清理视频缓存
  const videoDeleted = removeOldFiles(Common.tempDri.video, twoHoursAgo)
  logger.debug(`${Common.tempDri.video} 目录下已删除 ${videoDeleted} 个文件`)

  // 如果启用了本地下载图片，也清理图片缓存目录
  if (Config.upload.imageSendMode === 'file') {
    const imageDeleted = removeOldFiles(Common.tempDri.images, twoHoursAgo)
    logger.debug(`${Common.tempDri.images} 目录下已删除 ${imageDeleted} 个文件`)
  }
}, {
  businessName: '缓存自动删除'
})

export const task = Config.app.removeCache && karin.task('[kkk-缓存自动删除]', '*/30 * * * *', handleCacheCleanup, { log: false })

// 包装B站登录命令
const handleBilibiliLogin = wrapWithErrorHandler(async (e) => {
  // await e.reply('暂时不可用')
  // return true
  await bilibiliLogin(e)
  return true
}, {
  businessName: 'B站登录'
})

// 包装抖音登录命令
const handleDouyinLogin = wrapWithErrorHandler(async (e) => {
  // await e.reply('暂时不可用')
  // return true
  await douyinLogin(e)
  return true
}, {
  businessName: '抖音登录'
})

export const biLogin = karin.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, handleBilibiliLogin, { perm: Config.bilibili.loginPerm, name: 'kkk-ck管理' })

export const dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, handleDouyinLogin, { perm: Config.douyin.loginPerm, name: 'kkk-ck管理' })

// 删除指定时间之前的文件
export const removeOldFiles = (dir: string, beforeTimestamp: number): number => {
  let deletedCount = 0

  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      // 递归处理子目录
      deletedCount += removeOldFiles(filePath, beforeTimestamp)

      // 检查目录是否为空，如果为空则删除
      const remainingFiles = fs.readdirSync(filePath)
      if (remainingFiles.length === 0) {
        fs.rmdirSync(filePath)
      }
    } else {
      // 检查文件的创建时间
      const fileCreatedTime = stats.birthtimeMs

      // 如果文件创建时间早于指定时间戳，则删除
      if (fileCreatedTime < beforeTimestamp) {
        fs.unlinkSync(filePath)
        deletedCount++
      }
    }
  }

  return deletedCount
}
