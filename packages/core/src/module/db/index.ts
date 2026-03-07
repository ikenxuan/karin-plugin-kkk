import { BilibiliDBBase } from './bilibili'
import { DouyinDBBase } from './douyin'
import { StatisticsDBBase } from './statistics'

export * from './bilibili'
export * from './douyin'
export * from './statistics'

/** 抖音数据库实例 */
let douyinDB: DouyinDBBase | null = null
let douyinInitializing = false

/** B站数据库实例 */
let bilibiliDB: BilibiliDBBase | null = null
let bilibiliInitializing = false

/** 统计数据库实例 */
let statisticsDB: StatisticsDBBase | null = null
let statisticsInitializing = false

/**
 * 获取或初始化 DouyinDB 实例（单例模式）
 * @returns DouyinDB实例
 */
export const getDouyinDB = async (): Promise<DouyinDBBase> => {
  if (douyinDB) {
    return douyinDB
  }

  if (douyinInitializing) {
    await new Promise(resolve => setTimeout(resolve, 100))
    return douyinDB!
  }

  douyinInitializing = true
  try {
    douyinDB = await new DouyinDBBase().init()
    return douyinDB
  } finally {
    douyinInitializing = false
  }
}

/**
 * 获取或初始化 BilibiliDB 实例（单例模式）
 * @returns BilibiliDB实例
 */
export const getBilibiliDB = async (): Promise<BilibiliDBBase> => {
  if (bilibiliDB) {
    return bilibiliDB
  }

  if (bilibiliInitializing) {
    await new Promise(resolve => setTimeout(resolve, 100))
    return bilibiliDB!
  }

  bilibiliInitializing = true
  try {
    bilibiliDB = await new BilibiliDBBase().init()
    return bilibiliDB
  } finally {
    bilibiliInitializing = false
  }
}

/**
 * 获取或初始化 StatisticsDB 实例（单例模式）
 * @returns StatisticsDB实例
 */
export const getStatisticsDB = async (): Promise<StatisticsDBBase> => {
  if (statisticsDB) {
    return statisticsDB
  }

  if (statisticsInitializing) {
    await new Promise(resolve => setTimeout(resolve, 100))
    return statisticsDB!
  }

  statisticsInitializing = true
  try {
    statisticsDB = await new StatisticsDBBase().init()
    return statisticsDB
  } finally {
    statisticsInitializing = false
  }
}

/**
 * 初始化所有数据库
 * @returns 初始化后的数据库实例
 */
export const initAllDatabases = async () => {
  const [douyin, bilibili, statistics] = await Promise.all([
    getDouyinDB(),
    getBilibiliDB(),
    getStatisticsDB()
  ])

  return { douyinDB: douyin, bilibiliDB: bilibili, statisticsDB: statistics }
}

// 导出数据库实例（延迟初始化）
export const douyinDBInstance = await getDouyinDB()
export const bilibiliDBInstance = await getBilibiliDB()
export const statisticsDBInstance = await getStatisticsDB()

// 为了保持向后兼容性，保留原有的导出名称
export { bilibiliDBInstance as bilibiliDB, douyinDBInstance as douyinDB, statisticsDBInstance as statisticsDB }

/**
 * 清理旧的动态缓存记录
 * @param platform 指定数据库，'douyin' | 'bilibili'
 * @param days 保留最近几天的记录，默认为7天
 * @returns 删除的记录数量
 */
export const cleanOldDynamicCache = async (platform: 'douyin' | 'bilibili', days: number = 7): Promise<number> => {
  if (platform === 'douyin') {
    const db = await getDouyinDB()
    return await db.cleanOldAwemeCache(days)
  } else {
    const db = await getBilibiliDB()
    return await db.cleanOldDynamicCache(days)
  }
}
