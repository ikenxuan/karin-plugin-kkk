import fs from 'node:fs'
import path from 'node:path'

import { logger } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import sqlite3, { sqlite3 as sqlite3Types } from 'node-karin/sqlite3'

// 直接吃 @/root 而不是 @/module/utils 桶：桶会把 ./Common 拖进来，
// 而 Common 又回头 import @/module（含本文件），形成环。
import { Root } from '@/root'

import { MigrationManager } from './migration'

/** 统计覆盖的平台 */
export type ParsePlatform = 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu'

/**
 * 解析内容形态。
 *
 * 跨平台取统一值域，便于出「平台 × 形态」的对比图：
 * 抖音走 `getWorkTypeInfo()`，B站取链接解析出的类型，快手/小红书按作品数据里有无视频流判定。
 * `unknown` 只是兜底，正常路径不应落进来。
 */
export type ParseWorkType = 'video' | 'gallery' | 'collection' | 'article' | 'live' | 'bangumi' | 'dynamic' | 'music' | 'unknown'

/**
 * 解析过程里采到的量化指标。
 *
 * 目前只保留「解析耗时」—— 作品时长、作品点赞属于**内容**属性，不是解析服务本身的表现，
 * 放进这张海报会跑题；而且它们的单位在各平台并不统一（抖音毫秒、B站秒、快手/小红书未知），
 * 口径本来也站不住。全部按分桶存（见 `METRIC_BUCKETS`），避免行数随解析次数无限增长。
 */
export type ParseMetric = 'duration'

/**
 * 指标的分桶边界（左闭右开）。`duration` 单位毫秒。
 *
 * 每条桶有两个标签：
 * - `label` 是**区间**口径（「这一档是什么范围」）
 * - `upper` 是**累计**口径，画累计曲线时用它 —— 「≤5s」可以直接读成「5 秒内跑完的占多少」；
 *   最后一档是兜底档，累计标签写「全部」（累计到这里必然是 100%，写 `>10min` 会被读反）
 *
 * 档位刻意拉宽到 `10min+`：早先只到 `30s+`，只要部署环境整体偏慢，
 * 所有数据就都掉进最后一格，累计曲线退化成「左边一长条 0%、右边直接 100%」，整张图作废。
 * 加密到 12 档是因为累计曲线要有足够折点，档太少那条线会变成几段直线。
 * 读侧会把两端没数据的档裁掉（见 `buildMetricDistributions`），所以档多不会让图变挤。
 */
export const METRIC_BUCKETS: Record<ParseMetric, Array<{ label: string; upper: string; max: number }>> = {
  duration: [
    { label: '<0.5s', upper: '≤0.5s', max: 500 },
    { label: '0.5-1s', upper: '≤1s', max: 1000 },
    { label: '1-2s', upper: '≤2s', max: 2000 },
    { label: '2-3s', upper: '≤3s', max: 3000 },
    { label: '3-5s', upper: '≤5s', max: 5000 },
    { label: '5-10s', upper: '≤10s', max: 10000 },
    { label: '10-20s', upper: '≤20s', max: 20000 },
    { label: '20-30s', upper: '≤30s', max: 30000 },
    { label: '30-60s', upper: '≤60s', max: 60000 },
    { label: '1-3min', upper: '≤3min', max: 180000 },
    { label: '3-10min', upper: '≤10min', max: 600000 },
    // 兜底档没有上界，累计口径上它代表「其余全部」，写成「>10min」会被误读成「100% 都超过 10 分钟」
    { label: '10min+', upper: '全部', max: Number.MAX_SAFE_INTEGER }
  ]
}

/**
 * 取数值落在哪个桶。负数与 NaN 都归到第一桶 —— 采到脏数据时宁可低估也不要抛错。
 * @param metric 指标名
 * @param value 原始数值
 */
export const resolveMetricBucket = (metric: ParseMetric, value: number): string => {
  const buckets = METRIC_BUCKETS[metric]
  if (!Number.isFinite(value) || value < 0) return buckets[0].label
  return (buckets.find((bucket) => value < bucket.max) ?? buckets[buckets.length - 1]).label
}

/** 指标分布的一行（群海报与全局海报共用） */
export interface ParseMetricBucketRow {
  /** 指标名 */
  metric: ParseMetric
  /** 分桶标签 */
  bucket: string
  /** 次数 */
  count: number
}

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
  platform: ParsePlatform
  /** 解析次数 */
  parseCount: number
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/** 群维度日粒度统计（群趋势图的数据源） */
export interface GroupParseHistory {
  /** 群组ID */
  groupId: string
  /** 日期 (YYYY-MM-DD) */
  date: string
  /** 平台类型 */
  platform: ParsePlatform
  /** 当日解析次数 */
  parseCount: number
  /** 更新时间 */
  updatedAt: string
}

/** 小时粒度统计（活跃时段图的数据源） */
export interface ParseHourStats {
  /** 群组ID */
  groupId: string
  /** 小时 (0-23，服务器本地时区) */
  hour: number
  /** 平台类型 */
  platform: ParsePlatform
  /** 解析次数 */
  parseCount: number
  /** 更新时间 */
  updatedAt: string
}

/** 内容形态统计（平台 × 形态图的数据源） */
export interface ParseWorkTypeStats {
  /** 群组ID */
  groupId: string
  /** 平台类型 */
  platform: ParsePlatform
  /** 内容形态 */
  workType: ParseWorkType
  /** 解析次数 */
  parseCount: number
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

  /**
   * @param dbPath 数据库文件路径；缺省用插件数据目录。
   *   显式传入只为测试：生产链路由 `getStatisticsDB()` 单例统一构造，不该走这个参数。
   */
  constructor(dbPath?: string) {
    this.dbPath = dbPath ?? path.join(`${karinPathBase}/${Root.pluginName}/data`, 'statistics.db')
    this.migrationManager = new MigrationManager(this.dbPath)
  }

  /**
   * 关闭数据库连接。
   * 生产链路上进程退出即可，不需要显式调用；测试里必须关，否则 Windows 下临时目录删不掉。
   */
  async close(): Promise<void> {
    if (!this.db) return
    await new Promise<void>((resolve, reject) => {
      this.db.close((err) => (err ? reject(err) : resolve()))
    })
  }

  /**
   * 初始化数据库
   */
  async init(): Promise<StatisticsDBBase> {
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
  private async createTables(): Promise<void> {
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
      )`,

      // 群维度日粒度：ParseHistory 只有全局日粒度，画不出单群趋势
      `CREATE TABLE IF NOT EXISTS GroupParseHistory (
        groupId TEXT NOT NULL,
        date TEXT NOT NULL,
        platform TEXT NOT NULL,
        parseCount INTEGER DEFAULT 0,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (groupId, date, platform)
      )`,

      // 小时粒度活跃分布：行数有界（群数 × 24 × 4），可以按小时永久聚合
      `CREATE TABLE IF NOT EXISTS ParseHourStats (
        groupId TEXT NOT NULL,
        hour INTEGER NOT NULL,
        platform TEXT NOT NULL,
        parseCount INTEGER DEFAULT 0,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (groupId, hour, platform)
      )`,

      // 内容形态分布：支撑「平台 × 形态」图
      `CREATE TABLE IF NOT EXISTS ParseWorkTypeStats (
        groupId TEXT NOT NULL,
        platform TEXT NOT NULL,
        workType TEXT NOT NULL,
        parseCount INTEGER DEFAULT 0,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (groupId, platform, workType)
      )`,

      // 解析耗时 / 作品时长 / 作品点赞的分桶分布。
      // 存桶而不是原值：原值每次解析都不同，行数会随解析次数无限涨；
      // 分桶后行数上界是 群数 × 指标数 × 桶数。
      `CREATE TABLE IF NOT EXISTS ParseMetricStats (
        groupId TEXT NOT NULL,
        metric TEXT NOT NULL,
        bucket TEXT NOT NULL,
        parseCount INTEGER DEFAULT 0,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (groupId, metric, bucket)
      )`
    ]

    for (const query of queries) {
      await this.runQuery(query)
    }
  }

  /**
   * 初始化全局统计数据
   */
  private async initGlobalStatistics(): Promise<void> {
    const keys = ['totalGroups', 'totalParses']
    for (const key of keys) {
      const exists = await this.getQuery<GlobalStatistics>('SELECT * FROM GlobalStatistics WHERE key = ?', [key])
      if (!exists) {
        await this.runQuery('INSERT INTO GlobalStatistics (key, value, updatedAt) VALUES (?, ?, ?)', [key, '0', new Date().toISOString()])
      }
    }
  }

  /**
   * 执行SQL查询
   */
  private runQuery(sql: string, params: any[] = []): Promise<any> {
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
   * @param options.workType 本次解析的内容形态，取不到时该维度不计数
   * @param options.durationMs 本次解析耗时（毫秒）
   */
  async recordParse(
    groupId: string,
    userId: string,
    platform: ParsePlatform,
    options: { workType?: ParseWorkType; durationMs?: number } = {}
  ): Promise<void> {
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

    // 以下是本次新增的维度。任何一张写失败都不该让解析主流程或其它维度受影响，
    // 所以逐条兜住，只记日志。
    await this.safeIncrement('群维度日粒度', () => this.incrementGroupHistory(groupId, today, platform))
    await this.safeIncrement('活跃时段', () => this.incrementHourStats(groupId, new Date().getHours(), platform))
    if (options.workType) {
      await this.safeIncrement('内容形态', () => this.incrementWorkTypeStats(groupId, platform, options.workType!))
    }

    // 解析耗时按桶落库。取不到就跳过 —— handler 在埋点之前抛错时就没有这个值
    if (options.durationMs !== undefined) {
      await this.safeIncrement('解析耗时', () =>
        this.incrementMetricStats(groupId, 'duration', resolveMetricBucket('duration', options.durationMs!))
      )
    }
  }

  /**
   * 跑一段自增写入，失败只记日志。
   * 新增维度都是「锦上添花」，不能反过来把解析统计主流程带崩。
   */
  private async safeIncrement(label: string, fn: () => Promise<void>): Promise<void> {
    try {
      await fn()
    } catch (error) {
      logger.error(`[StatisticsDB] 更新${label}统计失败:`, error)
    }
  }

  /**
   * 群维度日粒度自增
   */
  private async incrementGroupHistory(groupId: string, date: string, platform: ParsePlatform): Promise<void> {
    await this.runQuery(
      `INSERT INTO GroupParseHistory (groupId, date, platform, parseCount, updatedAt) VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(groupId, date, platform) DO UPDATE SET parseCount = parseCount + 1, updatedAt = excluded.updatedAt`,
      [groupId, date, platform, new Date().toISOString()]
    )
  }

  /**
   * 小时粒度自增
   */
  private async incrementHourStats(groupId: string, hour: number, platform: ParsePlatform): Promise<void> {
    await this.runQuery(
      `INSERT INTO ParseHourStats (groupId, hour, platform, parseCount, updatedAt) VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(groupId, hour, platform) DO UPDATE SET parseCount = parseCount + 1, updatedAt = excluded.updatedAt`,
      [groupId, hour, platform, new Date().toISOString()]
    )
  }

  /**
   * 内容形态自增
   */
  private async incrementWorkTypeStats(groupId: string, platform: ParsePlatform, workType: ParseWorkType): Promise<void> {
    await this.runQuery(
      `INSERT INTO ParseWorkTypeStats (groupId, platform, workType, parseCount, updatedAt) VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(groupId, platform, workType) DO UPDATE SET parseCount = parseCount + 1, updatedAt = excluded.updatedAt`,
      [groupId, platform, workType, new Date().toISOString()]
    )
  }

  /**
   * 指标分桶自增
   */
  private async incrementMetricStats(groupId: string, metric: ParseMetric, bucket: string): Promise<void> {
    await this.runQuery(
      `INSERT INTO ParseMetricStats (groupId, metric, bucket, parseCount, updatedAt) VALUES (?, ?, ?, 1, ?)
       ON CONFLICT(groupId, metric, bucket) DO UPDATE SET parseCount = parseCount + 1, updatedAt = excluded.updatedAt`,
      [groupId, metric, bucket, new Date().toISOString()]
    )
  }

  /**
   * 更新每日历史记录
   * @param date 日期 (YYYY-MM-DD)
   * @param platform 平台类型
   */
  private async updateDailyHistory(date: string, platform: ParsePlatform): Promise<void> {
    const now = new Date().toISOString()

    try {
      const existing = await this.getQuery<ParseHistory>('SELECT * FROM ParseHistory WHERE date = ?', [date])

      if (existing) {
        await this.runQuery(`UPDATE ParseHistory SET totalParses = totalParses + 1, ${platform} = ${platform} + 1 WHERE date = ?`, [date])
      } else {
        await this.runQuery(
          'INSERT INTO ParseHistory (date, totalParses, douyin, bilibili, kuaishou, xiaohongshu, createdAt) VALUES (?, 1, ?, ?, ?, ?, ?)',
          [
            date,
            platform === 'douyin' ? 1 : 0,
            platform === 'bilibili' ? 1 : 0,
            platform === 'kuaishou' ? 1 : 0,
            platform === 'xiaohongshu' ? 1 : 0,
            now
          ]
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
  async getRecentHistory(days: number = 30): Promise<ParseHistory[]> {
    return await this.allQuery<ParseHistory>('SELECT * FROM ParseHistory ORDER BY date DESC LIMIT ?', [days])
  }

  /**
   * 从现有统计数据同步历史记录（用于迁移后的数据修复）
   */
  async syncHistoryFromStats(): Promise<void> {
    try {
      // 检查 ParseHistory 表是否为空
      const historyCount = await this.getQuery<{ count: number }>('SELECT COUNT(*) as count FROM ParseHistory')

      // 如果已有历史数据，不需要同步
      if (historyCount && historyCount.count > 0) {
        return
      }

      // 获取所有统计数据
      const allStats = await this.getAllStatistics()

      // 按日期和平台聚合
      const dateMap = new Map<
        string,
        {
          douyin: number
          bilibili: number
          kuaishou: number
          xiaohongshu: number
        }
      >()

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
  async getGroupStatistics(groupId: string): Promise<ParseStatistics[]> {
    return await this.allQuery<ParseStatistics>('SELECT * FROM ParseStatistics WHERE groupId = ? ORDER BY platform, userId', [groupId])
  }

  /**
   * 获取群组的唯一用户数
   * @param groupId 群组ID
   */
  async getGroupUniqueUsers(groupId: string): Promise<number> {
    const result = await this.getQuery<{ count: number }>('SELECT COUNT(DISTINCT userId) as count FROM ParseStatistics WHERE groupId = ?', [
      groupId
    ])
    return result?.count || 0
  }

  /**
   * 获取全局唯一用户数
   */
  async getTotalUniqueUsers(): Promise<number> {
    const result = await this.getQuery<{ count: number }>('SELECT COUNT(DISTINCT userId) as count FROM ParseStatistics')
    return result?.count || 0
  }

  /**
   * 获取所有群组的解析统计
   */
  async getAllStatistics(): Promise<ParseStatistics[]> {
    return await this.allQuery<ParseStatistics>('SELECT * FROM ParseStatistics ORDER BY groupId, platform')
  }

  /**
   * 获取平台总解析次数
   * @param platform 平台类型
   */
  async getPlatformTotalParses(platform: ParsePlatform): Promise<number> {
    const result = await this.getQuery<{ total: number }>('SELECT SUM(parseCount) as total FROM ParseStatistics WHERE platform = ?', [
      platform
    ])
    return result?.total || 0
  }

  /**
   * 获取某个群最近 N 天的日粒度记录（按日期升序，便于直接喂折线图）
   *
   * 日期口径与写入端一致，都取 `toISOString()` 的 UTC 日期；
   * SQLite 的 `date('now')` 同样是 UTC，两边不会错位。
   * @param groupId 群组ID
   * @param days 天数，默认 30 天
   */
  async getGroupRecentHistory(groupId: string, days: number = 30): Promise<GroupParseHistory[]> {
    return await this.allQuery<GroupParseHistory>(
      `SELECT * FROM GroupParseHistory
       WHERE groupId = ? AND date >= date('now', ?)
       ORDER BY date`,
      [groupId, `-${Math.max(0, days - 1)} days`]
    )
  }

  /**
   * 获取某个群有解析记录的天数（不限于最近 N 天）
   * @param groupId 群组ID
   */
  async getGroupActiveDays(groupId: string): Promise<number> {
    const result = await this.getQuery<{ count: number }>(
      'SELECT COUNT(DISTINCT date) as count FROM GroupParseHistory WHERE groupId = ?',
      [groupId]
    )
    return result?.count || 0
  }

  /**
   * 获取某个群的小时粒度分布（0-23，缺失的小时由调用方补零）
   * @param groupId 群组ID
   */
  async getGroupHourStats(groupId: string): Promise<ParseHourStats[]> {
    return await this.allQuery<ParseHourStats>('SELECT * FROM ParseHourStats WHERE groupId = ? ORDER BY hour', [groupId])
  }

  /**
   * 获取某个群的内容形态分布
   * @param groupId 群组ID
   */
  async getGroupWorkTypeStats(groupId: string): Promise<ParseWorkTypeStats[]> {
    return await this.allQuery<ParseWorkTypeStats>(
      'SELECT * FROM ParseWorkTypeStats WHERE groupId = ? ORDER BY parseCount DESC',
      [groupId]
    )
  }

  /**
   * 获取全局内容形态分布（按平台 × 形态聚合）
   */
  async getGlobalWorkTypeStats(): Promise<ParseWorkTypeStats[]> {
    return await this.allQuery<ParseWorkTypeStats>(
      `SELECT groupId, platform, workType, SUM(parseCount) as parseCount, MAX(updatedAt) as updatedAt
       FROM ParseWorkTypeStats GROUP BY platform, workType ORDER BY platform, parseCount DESC`
    )
  }

  /**
   * 获取某个群的指标分桶分布（耗时 / 作品时长 / 点赞）
   * @param groupId 群组ID
   */
  async getGroupMetricStats(groupId: string): Promise<ParseMetricBucketRow[]> {
    return await this.allQuery<ParseMetricBucketRow>(
      'SELECT metric, bucket, SUM(parseCount) as count FROM ParseMetricStats WHERE groupId = ? GROUP BY metric, bucket',
      [groupId]
    )
  }

  /**
   * 获取全局指标分桶分布（耗时 / 作品时长 / 点赞）
   */
  async getGlobalMetricStats(): Promise<ParseMetricBucketRow[]> {
    return await this.allQuery<ParseMetricBucketRow>(
      'SELECT metric, bucket, SUM(parseCount) as count FROM ParseMetricStats GROUP BY metric, bucket'
    )
  }

  /**
   * 取全局日粒度趋势里「数据可信」的起始日期。
   * @returns 可信起始日（YYYY-MM-DD）；一行可信数据都没有时返回 undefined
   */
  async getHistoryCompleteFrom(): Promise<string | undefined> {    // 老库回填（syncHistoryFromStats）会把用户的历史总次数全记在他首次解析那天，
    // 那批行的特征是 date 与写入时间 createdAt 不在同一天；
    // 增量写入的行两者必然同天（都取 UTC）。据此切出可信区间的起点。
    const result = await this.getQuery<{ date: string | null }>(
      'SELECT MIN(date) as date FROM ParseHistory WHERE date = substr(createdAt, 1, 10)'
    )
    return result?.date || undefined
  }

  /**
   * 获取每个群首次被记录解析的日期（群增长曲线的数据源）
   */
  async getGroupFirstSeen(): Promise<Array<{ groupId: string; firstSeen: string }>> {
    return await this.allQuery<{ groupId: string; firstSeen: string }>(
      'SELECT groupId, MIN(createdAt) as firstSeen FROM ParseStatistics GROUP BY groupId'
    )
  }

  /**
   * 获取总群组数
   */
  async getTotalGroups(): Promise<number> {
    const result = await this.getQuery<{ count: number }>('SELECT COUNT(DISTINCT groupId) as count FROM ParseStatistics')
    return result?.count || 0
  }

  /**
   * 获取总解析次数
   */
  async getTotalParses(): Promise<number> {
    const result = await this.getQuery<GlobalStatistics>('SELECT value FROM GlobalStatistics WHERE key = ?', ['totalParses'])
    return parseInt(result?.value || '0', 10)
  }

  /**
   * 增加总群组数
   */
  private async incrementTotalGroups(): Promise<void> {
    const totalGroups = await this.getTotalGroups()
    await this.runQuery('UPDATE GlobalStatistics SET value = ?, updatedAt = ? WHERE key = ?', [
      totalGroups.toString(),
      new Date().toISOString(),
      'totalGroups'
    ])
  }

  /**
   * 增加总解析次数
   */
  private async incrementTotalParses(): Promise<void> {
    await this.runQuery('UPDATE GlobalStatistics SET value = value + 1, updatedAt = ? WHERE key = ?', [
      new Date().toISOString(),
      'totalParses'
    ])
  }

  /**
   * 获取全局统计摘要
   */
  async getGlobalSummary(): Promise<{
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
