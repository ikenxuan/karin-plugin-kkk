import { logger } from 'node-karin'

import { Config } from '@/module/utils'
import { DouyinPushItem } from '@/platform/douyin/push'
import { douyinPushItem } from '@/types/config/pushlist'

import { SQLiteBase } from './sqlite-base'

/**
 * 数据库表接口定义
 */
interface Bot {
  id: string
  createdAt: string
  updatedAt: string
}

interface Group {
  id: string
  botId: string
  createdAt: string
  updatedAt: string
}

interface DouyinUser {
  sec_uid: string
  short_id?: string
  remark?: string
  living: number // SQLite boolean as integer
  filterMode: 'blacklist' | 'whitelist'
  createdAt: string
  updatedAt: string
}

interface GroupUserSubscription {
  groupId: string
  sec_uid: string
  createdAt: string
  updatedAt: string
}

interface AwemeCache {
  id: number
  aweme_id: string
  sec_uid: string
  groupId: string
  createdAt: string
  updatedAt: string
}

interface FilterWord {
  id: number
  sec_uid: string
  word: string
  createdAt: string
  updatedAt: string
}

interface FilterTag {
  id: number
  sec_uid: string
  tag: string
  createdAt: string
  updatedAt: string
}

/**
 * Douyin 数据库操作类 (SQLite3)
 */
export class DouyinDBSQLite extends SQLiteBase {
  constructor () {
    super('douyin-sqlite.db')
  }

  /**
   * 兼容 TypeORM 的 repository 访问器
   */
  get groupRepository () {
    return {
      find: async () => {
        return await this.all<Group>('SELECT * FROM Groups')
      },
      delete: async (criteria: any) => {
        if (criteria.aweme_id && criteria.groupId) {
          return await this.run(
            'DELETE FROM AwemeCaches WHERE aweme_id = ? AND groupId = ?',
            [criteria.aweme_id, criteria.groupId]
          )
        }
        return { affected: 0 }
      }
    }
  }

  get awemeCacheRepository () {
    return {
      find: async (options?: any) => {
        let sql = `
          SELECT 
            ac.*,
            du.sec_uid as douyinUser_sec_uid,
            du.short_id as douyinUser_short_id,
            du.remark as douyinUser_remark,
            du.living as douyinUser_living,
            du.filterMode as douyinUser_filterMode,
            du.createdAt as douyinUser_createdAt,
            du.updatedAt as douyinUser_updatedAt
          FROM AwemeCaches ac
          LEFT JOIN DouyinUsers du ON ac.sec_uid = du.sec_uid
        `
        const params: any[] = []

        if (options?.where) {
          const conditions: string[] = []
          if (options.where.groupId) {
            conditions.push('ac.groupId = ?')
            params.push(options.where.groupId)
          }
          if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ')
          }
        }

        if (options?.order) {
          // 简单处理排序
          sql += ' ORDER BY ac.createdAt DESC'
        }

        if (options?.take) {
          sql += ' LIMIT ?'
          params.push(options.take)
        }

        const results = await this.all<any>(sql, params)

        // 转换结果格式，添加 douyinUser 属性和日期转换
        return results.map((row: any) => ({
          id: row.id,
          aweme_id: row.aweme_id,
          sec_uid: row.sec_uid,
          groupId: row.groupId,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt),
          douyinUser: row.douyinUser_sec_uid
            ? {
                sec_uid: row.douyinUser_sec_uid,
                short_id: row.douyinUser_short_id,
                remark: row.douyinUser_remark,
                living: Boolean(row.douyinUser_living),
                filterMode: row.douyinUser_filterMode,
                createdAt: new Date(row.douyinUser_createdAt),
                updatedAt: new Date(row.douyinUser_updatedAt)
              }
            : null
        }))
      },
      delete: async (criteria: any) => {
        if (criteria.aweme_id && criteria.groupId) {
          const result = await this.run(
            'DELETE FROM AwemeCaches WHERE aweme_id = ? AND groupId = ?',
            [criteria.aweme_id, criteria.groupId]
          )
          return { affected: result.changes }
        }
        return { affected: 0 }
      }
    }
  }

  /**
   * 初始化数据库
   */
  async init (): Promise<this> {
    try {
      logger.debug(logger.green('--------------------------[DouyinDBSQLite] 开始初始化数据库--------------------------'))
      logger.debug('[DouyinDBSQLite] 正在连接数据库...')

      // 初始化数据库连接
      await super.init()

      // 创建所有表
      await this.createTables()

      logger.debug('[DouyinDBSQLite] 数据库模型同步成功')

      logger.debug('[DouyinDBSQLite] 正在同步配置订阅...')
      logger.debug('[DouyinDBSQLite] 配置项数量:', Config.pushlist.douyin?.length || 0)
      await this.syncConfigSubscriptions(Config.pushlist.douyin)
      logger.debug('[DouyinDBSQLite] 配置订阅同步成功')
      logger.debug(logger.green('--------------------------[DouyinDBSQLite] 初始化数据库完成--------------------------'))
    } catch (error) {
      logger.error('[DouyinDBSQLite] 数据库初始化失败:', error)
      throw error
    }

    return this
  }

  /**
   * 创建所有数据库表
   */
  private async createTables (): Promise<void> {
    const tables = [
      // Bots表
      `CREATE TABLE IF NOT EXISTS Bots (
        id TEXT PRIMARY KEY,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      )`,

      // Groups表
      `CREATE TABLE IF NOT EXISTS Groups (
        id TEXT,
        botId TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (id, botId),
        FOREIGN KEY (botId) REFERENCES Bots(id)
      )`,

      // DouyinUsers表
      `CREATE TABLE IF NOT EXISTS DouyinUsers (
        sec_uid TEXT PRIMARY KEY,
        short_id TEXT,
        remark TEXT,
        living INTEGER NOT NULL DEFAULT 0,
        filterMode TEXT NOT NULL DEFAULT 'blacklist' CHECK(filterMode IN ('blacklist', 'whitelist')),
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      )`,

      // GroupUserSubscriptions表
      `CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (
        groupId TEXT,
        sec_uid TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (groupId, sec_uid),
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid)
      )`,

      // AwemeCaches表
      `CREATE TABLE IF NOT EXISTS AwemeCaches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        aweme_id TEXT NOT NULL,
        sec_uid TEXT NOT NULL,
        groupId TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid)
      )`,

      // FilterWords表
      `CREATE TABLE IF NOT EXISTS FilterWords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sec_uid TEXT NOT NULL,
        word TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),
        UNIQUE(sec_uid, word)
      )`,

      // FilterTags表
      `CREATE TABLE IF NOT EXISTS FilterTags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sec_uid TEXT NOT NULL,
        tag TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),
        UNIQUE(sec_uid, tag)
      )`
    ]

    // 执行表创建
    for (const sql of tables) {
      await this.createTableIfNotExists(sql)
    }

    // 创建索引
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_groups_botId ON Groups(botId)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_groupId ON GroupUserSubscriptions(groupId)',
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_sec_uid ON GroupUserSubscriptions(sec_uid)',
      'CREATE INDEX IF NOT EXISTS idx_aweme_cache_lookup ON AwemeCaches(aweme_id, sec_uid, groupId)',
      'CREATE INDEX IF NOT EXISTS idx_aweme_cache_group ON AwemeCaches(groupId)',
      'CREATE INDEX IF NOT EXISTS idx_filter_words_sec_uid ON FilterWords(sec_uid)',
      'CREATE INDEX IF NOT EXISTS idx_filter_tags_sec_uid ON FilterTags(sec_uid)'
    ]

    for (const indexSql of indexes) {
      await this.run(indexSql)
    }
  }

  /**
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot (botId: string): Promise<Bot> {
    let bot = await this.get<Bot>('SELECT * FROM Bots WHERE id = ?', [botId])
    if (!bot) {
      const now = this.now()
      await this.run(
        'INSERT INTO Bots (id, createdAt, updatedAt) VALUES (?, ?, ?)',
        [botId, now, now]
      )
      bot = { id: botId, createdAt: now, updatedAt: now }
    }
    return bot
  }

  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup (groupId: string, botId: string): Promise<Group> {
    await this.getOrCreateBot(botId)
    let group = await this.get<Group>(
      'SELECT * FROM Groups WHERE id = ? AND botId = ?',
      [groupId, botId]
    )
    if (!group) {
      const now = this.now()
      await this.run(
        'INSERT INTO Groups (id, botId, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
        [groupId, botId, now, now]
      )
      group = { id: groupId, botId, createdAt: now, updatedAt: now }
    }
    return group
  }

  /**
   * 获取或创建抖音用户记录
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async getOrCreateDouyinUser (sec_uid: string, short_id: string = '', remark: string = ''): Promise<DouyinUser> {
    let user = await this.get<DouyinUser>('SELECT * FROM DouyinUsers WHERE sec_uid = ?', [sec_uid])
    if (!user) {
      const now = this.now()
      await this.run(
        'INSERT INTO DouyinUsers (sec_uid, short_id, remark, living, filterMode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [sec_uid, short_id, remark, 0, 'blacklist', now, now]
      )
      user = { sec_uid, short_id, remark, living: 0, filterMode: 'blacklist', createdAt: now, updatedAt: now }
    } else {
      // 如果提供了新的信息，更新用户记录
      let needUpdate = false
      const updates: any[] = []
      let sql = 'UPDATE DouyinUsers SET '

      if (remark && user.remark !== remark) {
        sql += 'remark = ?, '
        updates.push(remark)
        needUpdate = true
      }
      if (short_id && user.short_id !== short_id) {
        sql += 'short_id = ?, '
        updates.push(short_id)
        needUpdate = true
      }

      if (needUpdate) {
        const now = this.now()
        sql += 'updatedAt = ? WHERE sec_uid = ?'
        updates.push(now, sec_uid)
        await this.run(sql, updates)
        user.updatedAt = now
        if (remark && user.remark !== remark) user.remark = remark
        if (short_id && user.short_id !== short_id) user.short_id = short_id
      }
    }
    return user
  }

  /**
   * 订阅抖音用户
   * @param groupId 群组ID
   * @param botId 机器人ID
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async subscribeDouyinUser (groupId: string, botId: string, sec_uid: string, short_id: string = '', remark: string = ''): Promise<GroupUserSubscription> {
    await this.getOrCreateGroup(groupId, botId)
    await this.getOrCreateDouyinUser(sec_uid, short_id, remark)

    let subscription = await this.get<GroupUserSubscription>(
      'SELECT * FROM GroupUserSubscriptions WHERE groupId = ? AND sec_uid = ?',
      [groupId, sec_uid]
    )
    if (!subscription) {
      const now = this.now()
      await this.run(
        'INSERT INTO GroupUserSubscriptions (groupId, sec_uid, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
        [groupId, sec_uid, now, now]
      )
      subscription = { groupId, sec_uid, createdAt: now, updatedAt: now }
    }

    return subscription
  }

  /**
   * 取消订阅抖音用户
   * @param groupId 群组ID
   * @param sec_uid 抖音用户sec_uid
   */
  async unsubscribeDouyinUser (groupId: string, sec_uid: string): Promise<boolean> {
    const result = await this.run(
      'DELETE FROM GroupUserSubscriptions WHERE groupId = ? AND sec_uid = ?',
      [groupId, sec_uid]
    )

    // 清除相关的作品缓存
    await this.run(
      'DELETE FROM AwemeCaches WHERE groupId = ? AND sec_uid = ?',
      [groupId, sec_uid]
    )

    return result.changes > 0
  }

  /**
   * 添加作品缓存
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async addAwemeCache (aweme_id: string, sec_uid: string, groupId: string): Promise<AwemeCache> {
    let cache = await this.get<AwemeCache>(
      'SELECT * FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ?',
      [aweme_id, sec_uid, groupId]
    )
    if (!cache) {
      const now = this.now()
      const result = await this.run(
        'INSERT INTO AwemeCaches (aweme_id, sec_uid, groupId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        [aweme_id, sec_uid, groupId, now, now]
      )
      cache = {
        id: result.lastID,
        aweme_id,
        sec_uid,
        groupId,
        createdAt: now,
        updatedAt: now
      }
    }
    return cache
  }

  /**
   * 检查作品是否已推送
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isAwemePushed (aweme_id: string, sec_uid: string, groupId: string): Promise<boolean> {
    const row = await this.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ?',
      [aweme_id, sec_uid, groupId]
    )
    return (row?.count || 0) > 0
  }

  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups (botId: string): Promise<Group[]> {
    return await this.all<Group>('SELECT * FROM Groups WHERE botId = ?', [botId])
  }

  /**
   * 获取群组订阅的所有抖音用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions (groupId: string): Promise<Array<GroupUserSubscription & { douyinUser: DouyinUser }>> {
    const subscriptions = await this.all<GroupUserSubscription & DouyinUser>(
      `SELECT s.*, u.short_id, u.remark, u.living, u.filterMode 
       FROM GroupUserSubscriptions s
       JOIN DouyinUsers u ON s.sec_uid = u.sec_uid
       WHERE s.groupId = ?`,
      [groupId]
    )

    return subscriptions.map(sub => ({
      groupId: sub.groupId,
      sec_uid: sub.sec_uid,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
      douyinUser: {
        sec_uid: sub.sec_uid,
        short_id: sub.short_id,
        remark: sub.remark,
        living: sub.living,
        filterMode: sub.filterMode,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt
      }
    }))
  }

  /**
   * 获取抖音用户的所有订阅群组
   * @param sec_uid 抖音用户sec_uid
   */
  async getUserSubscribedGroups (sec_uid: string): Promise<Group[]> {
    return await this.all<Group>(
      `SELECT g.* 
       FROM Groups g
       JOIN GroupUserSubscriptions s ON g.id = s.groupId
       WHERE s.sec_uid = ?`,
      [sec_uid]
    )
  }

  /**
   * 检查群组是否已订阅抖音用户
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isSubscribed (sec_uid: string, groupId: string): Promise<boolean> {
    const row = await this.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE sec_uid = ? AND groupId = ?',
      [sec_uid, groupId]
    )
    return (row?.count || 0) > 0
  }

  /**
   * 获取抖音用户信息
   * @param sec_uid 抖音用户sec_uid
   * @returns 返回用户信息，如果不存在则返回null
   */
  async getDouyinUser (sec_uid: string): Promise<DouyinUser | undefined> {
    return await this.get<DouyinUser>('SELECT * FROM DouyinUsers WHERE sec_uid = ?', [sec_uid])
  }

  /**
   * 更新用户直播状态
   * @param sec_uid 抖音用户sec_uid
   * @param living 是否正在直播
   */
  async updateLiveStatus (sec_uid: string, living: boolean): Promise<boolean> {
    const user = await this.get<DouyinUser>('SELECT * FROM DouyinUsers WHERE sec_uid = ?', [sec_uid])
    if (!user) return false

    const now = this.now()
    await this.run(
      'UPDATE DouyinUsers SET living = ?, updatedAt = ? WHERE sec_uid = ?',
      [living ? 1 : 0, now, sec_uid]
    )

    return true
  }

  /**
   * 获取用户直播状态
   * @param sec_uid 抖音用户sec_uid
   */
  async getLiveStatus (sec_uid: string): Promise<{ living: boolean }> {
    const user = await this.get<DouyinUser>('SELECT * FROM DouyinUsers WHERE sec_uid = ?', [sec_uid])
    if (!user) return { living: false }

    return { living: Boolean(user.living) }
  }

  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions (configItems: douyinPushItem[]): Promise<void> {
    // 1. 收集配置文件中的所有订阅关系
    const configSubscriptions: Map<string, Set<string>> = new Map()

    // 初始化每个群组的订阅用户集合
    for (const item of configItems) {
      const sec_uid = item.sec_uid
      const short_id = item.short_id ?? ''
      const remark = item.remark ?? ''

      // 创建或更新抖音用户记录
      await this.getOrCreateDouyinUser(sec_uid, short_id, remark)

      // 处理该用户的所有群组订阅
      for (const groupWithBot of item.group_id) {
        const [groupId, botId] = groupWithBot.split(':')
        if (!groupId || !botId) continue

        // 确保群组存在
        await this.getOrCreateGroup(groupId, botId)

        // 记录配置文件中的订阅关系
        if (!configSubscriptions.has(groupId)) {
          configSubscriptions.set(groupId, new Set())
        }
        configSubscriptions.get(groupId)?.add(sec_uid)

        // 检查是否已订阅
        const isSubscribed = await this.isSubscribed(sec_uid, groupId)

        // 如果未订阅，创建订阅关系
        if (!isSubscribed) {
          await this.subscribeDouyinUser(groupId, botId, sec_uid, short_id, remark)
        }
      }
    }

    // 2. 获取数据库中的所有订阅关系，并与配置文件比较，删除不在配置文件中的订阅
    // 获取所有群组
    const allGroups = await this.all<Group>('SELECT * FROM Groups')

    for (const group of allGroups) {
      const groupId = group.id
      const configUsers = configSubscriptions.get(groupId) ?? new Set()

      // 获取该群组在数据库中的所有订阅
      const dbSubscriptions = await this.getGroupSubscriptions(groupId)

      // 找出需要删除的订阅（在数据库中存在但配置文件中不存在）
      for (const subscription of dbSubscriptions) {
        const sec_uid = subscription.sec_uid

        if (!configUsers.has(sec_uid)) {
          // 删除订阅关系
          await this.unsubscribeDouyinUser(groupId, sec_uid)
          logger.mark(`已删除群组 ${groupId} 对抖音用户 ${sec_uid} 的订阅`)
        }
      }
    }

    // 3. 清理不再被任何群组订阅的抖音用户记录及其过滤词和过滤标签
    // 获取所有抖音用户
    const allUsers = await this.all<DouyinUser>('SELECT * FROM DouyinUsers')

    for (const user of allUsers) {
      const sec_uid = user.sec_uid

      // 检查该用户是否还有群组订阅
      const subscribedGroups = await this.getUserSubscribedGroups(sec_uid)

      if (subscribedGroups.length === 0) {
        // 删除该用户的过滤词和过滤标签
        await this.run('DELETE FROM FilterWords WHERE sec_uid = ?', [sec_uid])
        await this.run('DELETE FROM FilterTags WHERE sec_uid = ?', [sec_uid])

        // 删除该用户记录
        await this.run('DELETE FROM DouyinUsers WHERE sec_uid = ?', [sec_uid])

        logger.mark(`已删除抖音用户 ${sec_uid} 的记录及相关过滤设置（不再被任何群组订阅）`)
      }
    }
  }

  /**
   * 通过ID获取群组信息
   * @param groupId 群组ID
   */
  async getGroupById (groupId: string): Promise<Group | undefined> {
    return await this.get<Group>('SELECT * FROM Groups WHERE id = ?', [groupId])
  }

  /**
   * 更新用户的过滤模式
   * @param sec_uid 抖音用户sec_uid
   * @param filterMode 过滤模式
   */
  async updateFilterMode (sec_uid: string, filterMode: 'blacklist' | 'whitelist'): Promise<DouyinUser> {
    const user = await this.getOrCreateDouyinUser(sec_uid)
    const now = this.now()
    await this.run(
      'UPDATE DouyinUsers SET filterMode = ?, updatedAt = ? WHERE sec_uid = ?',
      [filterMode, now, sec_uid]
    )
    user.filterMode = filterMode
    user.updatedAt = now
    return user
  }

  /**
   * 添加过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async addFilterWord (sec_uid: string, word: string): Promise<FilterWord> {
    await this.getOrCreateDouyinUser(sec_uid)

    let filterWord = await this.get<FilterWord>(
      'SELECT * FROM FilterWords WHERE sec_uid = ? AND word = ?',
      [sec_uid, word]
    )

    if (!filterWord) {
      const now = this.now()
      const result = await this.run(
        'INSERT INTO FilterWords (sec_uid, word, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
        [sec_uid, word, now, now]
      )
      filterWord = {
        id: result.lastID,
        sec_uid,
        word,
        createdAt: now,
        updatedAt: now
      }
    }
    return filterWord
  }

  /**
   * 删除过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async removeFilterWord (sec_uid: string, word: string): Promise<boolean> {
    const result = await this.run(
      'DELETE FROM FilterWords WHERE sec_uid = ? AND word = ?',
      [sec_uid, word]
    )
    return result.changes > 0
  }

  /**
   * 添加过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async addFilterTag (sec_uid: string, tag: string): Promise<FilterTag> {
    await this.getOrCreateDouyinUser(sec_uid)

    let filterTag = await this.get<FilterTag>(
      'SELECT * FROM FilterTags WHERE sec_uid = ? AND tag = ?',
      [sec_uid, tag]
    )

    if (!filterTag) {
      const now = this.now()
      const result = await this.run(
        'INSERT INTO FilterTags (sec_uid, tag, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
        [sec_uid, tag, now, now]
      )
      filterTag = {
        id: result.lastID,
        sec_uid,
        tag,
        createdAt: now,
        updatedAt: now
      }
    }
    return filterTag
  }

  /**
   * 删除过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async removeFilterTag (sec_uid: string, tag: string): Promise<boolean> {
    const result = await this.run(
      'DELETE FROM FilterTags WHERE sec_uid = ? AND tag = ?',
      [sec_uid, tag]
    )
    return result.changes > 0
  }

  /**
   * 获取用户的所有过滤词
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterWords (sec_uid: string): Promise<string[]> {
    const filterWords = await this.all<FilterWord>('SELECT * FROM FilterWords WHERE sec_uid = ?', [sec_uid])
    return filterWords.map(word => word.word)
  }

  /**
   * 获取用户的所有过滤标签
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterTags (sec_uid: string): Promise<string[]> {
    const filterTags = await this.all<FilterTag>('SELECT * FROM FilterTags WHERE sec_uid = ?', [sec_uid])
    return filterTags.map(tag => tag.tag)
  }

  /**
   * 获取用户的过滤配置
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterConfig (sec_uid: string): Promise<{ filterMode: 'blacklist' | 'whitelist'; filterWords: string[]; filterTags: string[] }> {
    const user = await this.getOrCreateDouyinUser(sec_uid)
    const filterWords = await this.getFilterWords(sec_uid)
    const filterTags = await this.getFilterTags(sec_uid)

    return {
      filterMode: user.filterMode,
      filterWords,
      filterTags
    }
  }

  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param tags 标签列表
   */
  async shouldFilter (PushItem: DouyinPushItem, tags: string[] = []): Promise<boolean> {
    // 使用 PushItem.sec_uid 而不是 PushItem.Detail_Data.sec_uid
    const sec_uid = PushItem.sec_uid
    if (!sec_uid) {
      logger.warn(`推送项缺少 sec_uid 参数: ${JSON.stringify(PushItem)}`)
      return false
    }

    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(sec_uid)
    logger.debug(`
      获取用户${PushItem.remark}（${PushItem.sec_uid}）的过滤配置：
      过滤模式：${filterMode}
      过滤词：${filterWords}
      过滤标签：${filterTags}
      `)
    const desc = PushItem.Detail_Data.desc ?? ''

    // 检查内容中是否包含过滤词
    const hasFilterWord = filterWords.some(word => desc.includes(word))

    // 检查标签中是否包含过滤标签
    const hasFilterTag = filterTags.some(filterTag =>
      tags.some(tag => tag === filterTag)
    )

    logger.debug(`
      作者：${PushItem.remark}
      检查内容：${desc}
      命中词：[${filterWords.join('], [')}]
      命中标签：[${filterTags.join('], [')}]
      过滤模式：${filterMode}
      是否过滤：${(hasFilterWord || hasFilterTag) ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
      作品地址：${logger.green(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}
      `)

    // 根据过滤模式决定是否过滤
    if (filterMode === 'blacklist') {
      // 黑名单模式：如果包含过滤词或过滤标签，则过滤
      if (hasFilterWord || hasFilterTag) {
        logger.warn(`
        作品内容命中黑名单规则，已过滤该作品不再推送
        作品地址：${logger.yellow(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}
        命中的黑名单词：[${filterWords.join('], [')}]
        命中的黑名单标签：[${filterTags.join('], [')}]
        `)
        return true
      }
      return false
    } else {
      // 白名单模式：如果不包含任何白名单词或白名单标签，则过滤
      // 注意：如果白名单为空，则不过滤任何内容
      if (filterWords.length === 0 && filterTags.length === 0) {
        return false
      }

      if (hasFilterWord || hasFilterTag) {
        return false // 不过滤
      }
      logger.warn(`
        作品内容未命中白名单规则，已过滤该作品不再推送
        作品地址：${logger.yellow(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}
        当前白名单词：[${filterWords.join('], [')}]
        当前白名单标签：[${filterTags.join('], [')}]
      `)
      return true // 过滤
    }
  }
}

/** 抖音数据库模型集合 (SQLite) */
export const douyinSQLiteModels = {
  /** AwemeCache表 - 存储已推送的作品ID */
  AwemeCache: 'AwemeCaches',
  /** Bots表 - 存储机器人信息 */
  Bot: 'Bots',
  /** DouyinUsers表 - 存储抖音用户信息 */
  DouyinUser: 'DouyinUsers',
  /** Groups表 - 存储群组信息 */
  Group: 'Groups',
  /** GroupUserSubscriptions表 - 存储群组订阅的抖音用户关系 */
  GroupUserSubscription: 'GroupUserSubscriptions',
  /** FilterWord表 - 存储过滤词 */
  FilterWord: 'FilterWords',
  /** FilterTag表 - 存储过滤标签 */
  FilterTag: 'FilterTags'
}
