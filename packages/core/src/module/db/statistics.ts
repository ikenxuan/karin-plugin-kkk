import fs from 'node:fs'
import path from 'node:path'

import { logger } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import sqlite3, { sqlite3 as sqlite3Types } from 'node-karin/sqlite3'

import { Root } from '@/module/utils'

import { MigrationManager } from './migration'

/**
 * 解析统计接口 - 存储各平台解析统计数据
 */
interface ParseStatistics {
  /** 统计ID */
  id: number
  /** 群组ID */
  groupId: string
  /** 用户ID */
  userId: string
  /** 平台类型：douyin、bilibili、kuaishou、xiaohongshu */
  platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu'
  /** 解析次数 */
  parseCount: number
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 解析历史接口 - 存储每日解析统计数据
 */
interface ParseHistory {
  /** 统计ID */
  id: number
  /** 日期 (YYYY-MM-DD) */
  date: string
  /** 总解析次数 */
  totalParses: number
  /** 抖音解析次数 */
  douyin: number
  /** 哔哩哔哩解析次数 */
  bilibili: number
  /** 快手解析次数 */
  kuaishou: number
  /** 小红书解析次数 */
  xiaohongshu: number
  /** 创建时间 */
  createdAt: string
}

/**
 * 全局统计接口 - 存储插件全局统计数据
 */
interface GlobalStatistics {
  /** 统计键 */
  key: string
  /** 统计值 */
  value: string
  /** 更新时间 */
  updatedAt: string
}

/** 统计数据库操作类 */
export class StatisticsDBBase {
  private db!: sqlite3Types['Database']
  private dbPath: string
  private migrationManager: MigrationManager

  constructor () {
    this.dbPath = path.join(`${karinPathBase}/${Root.pluginName}/data`, 'statistics.db')
    this.migrationManager = new MigrationManager(this.dbPath)
  }

  /**
   * 初始化数据库
   */
  async init (): Promise<StatisticsDBBase> {
    try {
      logger.debug(logger.green('--------------------------[StatisticsDB] 开始初始化数据库--------------------------'))
      logger.debug('[StatisticsDB] 正在连接数据库...')

      // 创建数据库连接
      fs.mkdirSync(path.dirname(this.dbPath), { recursive: true })
      this.db = new sqlite3.Database(this.dbPath)

      // 创建表结构
      await this.createTables()

      logger.debug('[StatisticsDB] 数据库模型同步成功')

      // 初始化全局统计数据
      await this.initGlobalStatistics()

      // 同步历史数据（仅在首次迁移后执行）
      await this.syncHistoryFromStats()

      logger.debug(logger.green('--------------------------[StatisticsDB] 初始化数据库完成--------------------------'))
    } catch (error) {
      logger.error('[StatisticsDB] 数据库初始化失败:', error)
      throw error
    }

    return this
  }

  /**
   * 创建数据库表结构
   */
  private async createTables (): Promise<void> {
    const queries = [
      // 创建解析统计表
      `CREATE TABLE IF NOT EXISTS ParseStatistics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        groupId TEXT NOT NULL,
        userId TEXT NOT NULL,
        platform TEXT NOT NULL,
        parseCount INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(groupId, userId, platform)
      )`,

      // 创建解析历史表
      `CREATE TABLE IF NOT EXISTS ParseHistory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE,
        totalParses INTEGER DEFAULT 0,
        douyin INTEGER DEFAULT 0,
        bilibili INTEGER DEFAULT 0,
        kuaishou INTEGER DEFAULT 0,
        xiaohongshu INTEGER DEFAULT 0,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP
      )`,

      // 创建全局统计表
      `CREATE TABLE IF NOT EXISTS GlobalStatistics (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )`
    ]

    for (const query of queries) {
      await this.runQuery(query)
    }
  }

  /**
   * 初始化全局统计数据
   */
  private async initGlobalStatistics (): Promise<void> {
    const keys = ['totalGroups', 'totalParses']
    for (const key of keys) {
      const exists = await this.getQuery<GlobalStatistics>(
        'SELECT * FROM GlobalStatistics WHERE key = ?',
        [key]
      )
      if (!exists) {
        await this.runQuery(
          'INSERT INTO GlobalStatistics (key, value, updatedAt) VALUES (?, ?, ?)',
          [key, '0', new Date().toISOString()]
        )
      }
    }
  }

  /**
   * 执行SQL查询
   */
  private runQuery (sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ lastID: this.lastID, changes: this.changes })
        }
      })
    })
  }

  /**
   * 执行SQL查询并获取单个结果
   */
  private getQuery<T>(sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row as T)
        }
      })
    })
  }

  /**
   * 执行SQL查询并获取所有结果
   */
  private allQuery<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows as T[])
        }
      })
    })
  }

  /**
   * 记录解析统计
   * @param groupId 群组ID
   * @param userId 用户ID
   * @param platform 平台类型
   */
  async recordParse (groupId: string, userId: string, platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu'): Promise<void> {
    const now = new Date().toISOString()
    const today = new Date().toISOString().split('T')[0]

    // 检查是否已存在该用户在该群组的统计记录
    const existing = await this.getQuery<ParseStatistics>(
      'SELECT * FROM ParseStatistics WHERE groupId = ? AND userId = ? AND platform = ?',
      [groupId, userId, platform]
    )

    if (existing) {
      // 更新解析次数
      await this.runQuery(
        'UPDATE ParseStatistics SET parseCount = parseCount + 1, updatedAt = ? WHERE groupId = ? AND userId = ? AND platform = ?',
        [now, groupId, userId, platform]
      )
    } else {
      // 创建新记录
      await this.runQuery(
        'INSERT INTO ParseStatistics (groupId, userId, platform, parseCount, createdAt, updatedAt) VALUES (?, ?, ?, 1, ?, ?)',
        [groupId, userId, platform, now, now]
      )

      // 检查是否是新群组
      const groupExists = await this.getQuery<{ count: number }>(
        'SELECT COUNT(DISTINCT groupId) as count FROM ParseStatistics WHERE groupId = ?',
        [groupId]
      )
      if (groupExists && groupExists.count === 1) {
        await this.incrementTotalGroups()
      }
    }

    // 更新总解析次数
    await this.incrementTotalParses()

    // 更新每日历史记录
    await this.updateDailyHistory(today, platform)
  }

  /**
   * 更新每日历史记录
   * @param date 日期 (YYYY-MM-DD)
   * @param platform 平台类型
   */
  private async updateDailyHistory (date: string, platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu'): Promise<void> {
    const now = new Date().toISOString()

    try {
      const existing = await this.getQuery<ParseHistory>(
        'SELECT * FROM ParseHistory WHERE date = ?',
        [date]
      )

      if (existing) {
        await this.runQuery(
          `UPDATE ParseHistory SET totalParses = totalParses + 1, ${platform} = ${platform} + 1 WHERE date = ?`,
          [date]
        )
      } else {
        await this.runQuery(
          'INSERT INTO ParseHistory (date, totalParses, douyin, bilibili, kuaishou, xiaohongshu, createdAt) VALUES (?, 1, ?, ?, ?, ?, ?)',
          [date, platform === 'douyin' ? 1 : 0, platform === 'bilibili' ? 1 : 0, platform === 'kuaishou' ? 1 : 0, platform === 'xiaohongshu' ? 1 : 0, now]
        )
      }
    } catch (error) {
      logger.error('[StatisticsDB] 更新每日历史记录失败:', error)
    }
  }

  /**
   * 获取最近N天的解析历史
   * @param days 天数，默认30天
   */
  async getRecentHistory (days: number = 30): Promise<ParseHistory[]> {
    return await this.allQuery<ParseHistory>(
      'SELECT * FROM ParseHistory ORDER BY date DESC LIMIT ?',
      [days]
    )
  }

  /**
   * 从现有统计数据同步历史记录（用于迁移后的数据修复）
   */
  async syncHistoryFromStats (): Promise<void> {
    try {
      // 检查 ParseHistory 表是否为空
      const historyCount = await this.getQuery<{ count: number }>(
        'SELECT COUNT(*) as count FROM ParseHistory'
      )

      // 如果已有历史数据，不需要同步
      if (historyCount && historyCount.count > 0) {
        return
      }

      // 获取所有统计数据
      const allStats = await this.getAllStatistics()

      // 按日期和平台聚合
      const dateMap = new Map<string, {
        douyin: number
        bilibili: number
        kuaishou: number
        xiaohongshu: number
      }>()

      for (const stat of allStats) {
        const date = stat.createdAt.split('T')[0]
        
        if (!dateMap.has(date)) {
          dateMap.set(date, {
            douyin: 0,
            bilibili: 0,
            kuaishou: 0,
            xiaohongshu: 0
          })
        }

        const dateData = dateMap.get(date)!
        dateData[stat.platform] += stat.parseCount
      }

      // 插入历史记录
      for (const [date, platforms] of dateMap.entries()) {
        const totalParses = platforms.douyin + platforms.bilibili + platforms.kuaishou + platforms.xiaohongshu
        
        await this.runQuery(
          'INSERT OR IGNORE INTO ParseHistory (date, totalParses, douyin, bilibili, kuaishou, xiaohongshu, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [date, totalParses, platforms.douyin, platforms.bilibili, platforms.kuaishou, platforms.xiaohongshu, new Date().toISOString()]
        )
      }

      logger.info(`[StatisticsDB] 已同步 ${dateMap.size} 天的历史数据`)
    } catch (error) {
      logger.error('[StatisticsDB] 同步历史数据失败:', error)
    }
  }

  /**
   * 获取群组的解析统计
   * @param groupId 群组ID
   */
  async getGroupStatistics (groupId: string): Promise<ParseStatistics[]> {
    return await this.allQuery<ParseStatistics>(
      'SELECT * FROM ParseStatistics WHERE groupId = ? ORDER BY platform, userId',
      [groupId]
    )
  }

  /**
   * 获取群组的唯一用户数
   * @param groupId 群组ID
   */
  async getGroupUniqueUsers (groupId: string): Promise<number> {
    const result = await this.getQuery<{ count: number }>(
      'SELECT COUNT(DISTINCT userId) as count FROM ParseStatistics WHERE groupId = ?',
      [groupId]
    )
    return result?.count || 0
  }

  /**
   * 获取全局唯一用户数
   */
  async getTotalUniqueUsers (): Promise<number> {
    const result = await this.getQuery<{ count: number }>(
      'SELECT COUNT(DISTINCT userId) as count FROM ParseStatistics'
    )
    return result?.count || 0
  }

  /**
   * 获取所有群组的解析统计
   */
  async getAllStatistics (): Promise<ParseStatistics[]> {
    return await this.allQuery<ParseStatistics>(
      'SELECT * FROM ParseStatistics ORDER BY groupId, platform'
    )
  }

  /**
   * 获取平台总解析次数
   * @param platform 平台类型
   */
  async getPlatformTotalParses (platform: 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu'): Promise<number> {
    const result = await this.getQuery<{ total: number }>(
      'SELECT SUM(parseCount) as total FROM ParseStatistics WHERE platform = ?',
      [platform]
    )
    return result?.total || 0
  }

  /**
   * 获取总群组数
   */
  async getTotalGroups (): Promise<number> {
    const result = await this.getQuery<{ count: number }>(
      'SELECT COUNT(DISTINCT groupId) as count FROM ParseStatistics'
    )
    return result?.count || 0
  }

  /**
   * 获取总解析次数
   */
  async getTotalParses (): Promise<number> {
    const result = await this.getQuery<GlobalStatistics>(
      'SELECT value FROM GlobalStatistics WHERE key = ?',
      ['totalParses']
    )
    return parseInt(result?.value || '0', 10)
  }

  /**
   * 增加总群组数
   */
  private async incrementTotalGroups (): Promise<void> {
    const totalGroups = await this.getTotalGroups()
    await this.runQuery(
      'UPDATE GlobalStatistics SET value = ?, updatedAt = ? WHERE key = ?',
      [totalGroups.toString(), new Date().toISOString(), 'totalGroups']
    )
  }

  /**
   * 增加总解析次数
   */
  private async incrementTotalParses (): Promise<void> {
    await this.runQuery(
      'UPDATE GlobalStatistics SET value = value + 1, updatedAt = ? WHERE key = ?',
      [new Date().toISOString(), 'totalParses']
    )
  }

  /**
   * 获取全局统计摘要
   */
  async getGlobalSummary (): Promise<{
    totalGroups: number
    totalParses: number
    platformStats: {
      douyin: number
      bilibili: number
      kuaishou: number
      xiaohongshu: number
    }
  }> {
    const totalGroups = await this.getTotalGroups()
    const totalParses = await this.getTotalParses()

    const platformStats = {
      douyin: await this.getPlatformTotalParses('douyin'),
      bilibili: await this.getPlatformTotalParses('bilibili'),
      kuaishou: await this.getPlatformTotalParses('kuaishou'),
      xiaohongshu: await this.getPlatformTotalParses('xiaohongshu')
    }

    return {
      totalGroups,
      totalParses,
      platformStats
    }
  }
}
