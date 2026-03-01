import fs from 'node:fs'
import path from 'node:path'

import karin, { logger } from 'node-karin'

import { Common } from '@/module'
import { Config } from '@/module/utils/Config'
import { bilibiliLogin } from '@/platform'
import { douyinLogin } from '@/platform/douyin/login'

export const task = Config.app.removeCache && karin.task('[kkk-缓存自动删除]', '0 */4 * * *', async () => {
  try {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000 // 2小时前的时间戳
    
    // 清理视频缓存
    const videoDeleted = removeOldFiles(Common.tempDri.video, twoHoursAgo)
    logger.mark(`${Common.tempDri.video} 目录下已删除 ${videoDeleted} 个文件`)
    
    // 如果启用了本地下载图片，也清理图片缓存目录
    if (Config.app.downloadImageLocally) {
      const imageDeleted = removeOldFiles(Common.tempDri.images, twoHoursAgo)
      logger.mark(`${Common.tempDri.images} 目录下已删除 ${imageDeleted} 个文件`)
    }
  } catch (err) {
    console.error('删除文件时出错:', err)
  }
})

export const biLogin = karin.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, async (e) => {
  // await e.reply('暂时不可用')
  // return true
  await bilibiliLogin(e)
  return true
}, { perm: Config.bilibili.loginPerm, name: 'kkk-ck管理' })

export const dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
  // await e.reply('暂时不可用')
  // return true
  await douyinLogin(e)
  return true
}, { perm: Config.douyin.loginPerm, name: 'kkk-ck管理' })

// 删除指定时间之前的文件
export const removeOldFiles = (dir: string, beforeTimestamp: number): number => {
  let deletedCount = 0
  
  try {
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
        // 检查文件的修改时间
        const fileModifiedTime = stats.mtimeMs
        
        // 如果文件修改时间早于指定时间戳，则删除
        if (fileModifiedTime < beforeTimestamp) {
          fs.unlinkSync(filePath)
          deletedCount++
        }
      }
    }
  } catch (err) {
    logger.error(`处理目录 ${dir} 时出错:`, err)
  }
  
  return deletedCount
}
