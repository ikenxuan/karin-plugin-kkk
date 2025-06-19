import { DeleteResult, LessThan } from 'typeorm'

import { getBilibiliDB } from './bilibili'
import { getDouyinDB } from './douyin'

export * from './bilibili'
export * from './douyin'

/**
 * 清理旧的动态缓存记录
 * @param platform 指定数据库，'douyin' | 'bilibili'
 * @param days 保留最近几天的记录，默认为7天
 * @returns 删除的记录数量
 */
export const cleanOldDynamicCache = async (platform: 'douyin' | 'bilibili', days: number = 7): Promise<number> => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  let result: DeleteResult

  if (platform === 'douyin') {
    // 使用 getDouyinDB 获取实例
    const douyinDB = await getDouyinDB()
    result = await douyinDB['awemeCacheRepository'].delete({
      createdAt: LessThan(cutoffDate)
    })
  } else {
    // 使用 getBilibiliDB 获取实例
    const bilibiliDB = await getBilibiliDB()
    result = await bilibiliDB['dynamicCacheRepository'].delete({
      createdAt: LessThan(cutoffDate)
    })
  }

  return result.affected ?? 0
}
