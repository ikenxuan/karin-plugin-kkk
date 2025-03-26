import { Op } from 'sequelize'

import { bilibiliModels } from './bilibili'
import { douyinModels } from './douyin'

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

  const Cache = platform === 'douyin' ? douyinModels.AwemeCache : bilibiliModels.DynamicCache

  const result = await Cache.destroy({
    where: {
      createdAt: {
        [Op.lt]: cutoffDate
      }
    }
  })

  return result
}
