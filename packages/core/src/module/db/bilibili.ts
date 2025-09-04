import { logger } from 'node-karin'

import { Config } from '@/module/utils'
import { BilibiliPushItem, DynamicType } from '@/platform/bilibili/push'
import { bilibiliPushItem } from '@/types/config/pushlist'

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

interface BilibiliUser {
  host_mid: number
  remark?: string
  filterMode: 'blacklist' | 'whitelist'
  createdAt: string
  updatedAt: string
}

interface GroupUserSubscription {
  groupId: string
  host_mid: number
  createdAt: string
  updatedAt: string
}

interface DynamicCache {
  id: number
  dynamic_id: string
  host_mid: number
  groupId: string
  dynamic_type?: string
  createdAt: string
  updatedAt: string
}

interface FilterWord {
  id: number
  host_mid: number
  word: string
  createdAt: string
  updatedAt: string
}

interface FilterTag {
  id: number
  host_mid: number
  tag: string
  createdAt: string
  updatedAt: string
}

/**
 * Bilibili 数据库操作类 (SQLite3)
 */
export class BilibiliDBSQLite extends SQLiteBase {
  constructor () {
    super('bilibili-sqlite.db')
  }

  /**
   * 兼容 TypeORM 的 repository 访问器
   */
  get groupRepository () {
    return {
      find: async () => {
        return await this.all<Group>('SELECT * FROM Groups')
      }
    }
  }

  get dynamicCacheRepository () {
    return {
      find: async (options?: any) => {
        let sql = `
          SELECT 
            dc.*,
            bu.host_mid as bilibiliUser_host_mid,
            bu.remark as bilibiliUser_remark,
            bu.filterMode as bilibiliUser_filterMode,
            bu.createdAt as bilibiliUser_createdAt,
            bu.updatedAt as bilibiliUser_updatedAt
          FROM DynamicCaches dc
          LEFT JOIN BilibiliUsers bu ON dc.host_mid = bu.host_mid
        `
        const params: any[] = []

        if (options?.where) {
          const conditions: string[] = []
          if (options.where.groupId) {
            conditions.push('dc.groupId = ?')
            params.push(options.where.groupId)
          }
          if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ')
          }
        }

        if (options?.order) {
          // 简单处理排序
          sql += ' ORDER BY dc.createdAt DESC'
        }

        if (options?.take) {
          sql += ' LIMIT ?'
          params.push(options.take)
        }

        const results = await this.all<any>(sql, params)

        // 转换结果格式，添加 bilibiliUser 属性和日期转换
        return results.map((row: any) => ({
          id: row.id,
          dynamic_id: row.dynamic_id,
          host_mid: row.host_mid,
          groupId: row.groupId,
          dynamic_type: row.dynamic_type,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt),
          bilibiliUser: row.bilibiliUser_host_mid
            ? {
                host_mid: row.bilibiliUser_host_mid,
                remark: row.bilibiliUser_remark,
                filterMode: row.bilibiliUser_filterMode,
                createdAt: new Date(row.bilibiliUser_createdAt),
                updatedAt: new Date(row.bilibiliUser_updatedAt)
              }
            : null
        }))
      },
      delete: async (criteria: any) => {
        if (criteria.dynamic_id && criteria.groupId) {
          const result = await this.run(
            'DELETE FROM DynamicCaches WHERE dynamic_id = ? AND groupId = ?',
            [criteria.dynamic_id, criteria.groupId]
          )
          return { affected: result.changes }
        }
        return { affected: 0 }
      }
    }
  }  /**
   * 初始化数据库
   */

  async init (): Promise<this> {
    try {
      logger.debug(logger.green('--------------------------[BilibiliDBSQLite] 开始初始化数据库--------------------------'))
      logger.debug('[BilibiliDBSQLite] 正在连接数据库...')

      // 初始化数据库连接
      await super.init()

      // 创建所有表
      await this.createTables()

      logger.debug('[BilibiliDBSQLite] 数据库模型同步成功')

      logger.debug('[BilibiliDBSQLite] 正在同步配置订阅...')
      logger.debug('[BilibiliDBSQLite] 配置项数量:', Config.pushlist.bilibili?.length || 0)
      await this.syncConfigSubscriptions(Config.pushlist.bilibili)
      logger.debug('[BilibiliDBSQLite] 配置订阅同步成功')
      logger.debug(logger.green('--------------------------[BilibiliDBSQLite] 初始化数据库完成--------------------------'))
    } catch (error) {
      logger.error('[BilibiliDBSQLite] 数据库初始化失败:', error)
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

      // BilibiliUsers表
      `CREATE TABLE IF NOT EXISTS BilibiliUsers (
        host_mid INTEGER PRIMARY KEY,
        remark TEXT,
        filterMode TEXT NOT NULL DEFAULT 'blacklist' CHECK(filterMode IN ('blacklist', 'whitelist')),
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
      )`,

      // GroupUserSubscriptions表
      `CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (
        groupId TEXT,
        host_mid INTEGER,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (groupId, host_mid),
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid)
      )`,

      // DynamicCaches表
      `CREATE TABLE IF NOT EXISTS DynamicCaches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dynamic_id TEXT NOT NULL,
        host_mid INTEGER NOT NULL,
        groupId TEXT NOT NULL,
        dynamic_type TEXT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid)
      )`,

      // FilterWords表
      `CREATE TABLE IF NOT EXISTS FilterWords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        host_mid INTEGER NOT NULL,
        word TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),
        UNIQUE(host_mid, word)
      )`,

      // FilterTags表
      `CREATE TABLE IF NOT EXISTS FilterTags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        host_mid INTEGER NOT NULL,
        tag TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')),
        updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),
        UNIQUE(host_mid, tag)
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
      'CREATE INDEX IF NOT EXISTS idx_subscriptions_host_mid ON GroupUserSubscriptions(host_mid)',
      'CREATE INDEX IF NOT EXISTS idx_dynamic_cache_lookup ON DynamicCaches(dynamic_id, host_mid, groupId)',
      'CREATE INDEX IF NOT EXISTS idx_dynamic_cache_group ON DynamicCaches(groupId)',
      'CREATE INDEX IF NOT EXISTS idx_filter_words_host_mid ON FilterWords(host_mid)',
      'CREATE INDEX IF NOT EXISTS idx_filter_tags_host_mid ON FilterTags(host_mid)'
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
   * 获取或创建B站用户记录
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async getOrCreateBilibiliUser (host_mid: number, remark: string = ''): Promise<BilibiliUser> {
    let user = await this.get<BilibiliUser>('SELECT * FROM BilibiliUsers WHERE host_mid = ?', [host_mid])
    if (!user) {
      const now = this.now()
      await this.run(
        'INSERT INTO BilibiliUsers (host_mid, remark, filterMode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        [host_mid, remark, 'blacklist', now, now]
      )
      user = { host_mid, remark, filterMode: 'blacklist', createdAt: now, updatedAt: now }
    } else if (remark && user.remark !== remark) {
      const now = this.now()
      await this.run(
        'UPDATE BilibiliUsers SET remark = ?, updatedAt = ? WHERE host_mid = ?',
        [remark, now, host_mid]
      )
      user.remark = remark
      user.updatedAt = now
    }
    return user
  }

  /**
   * 订阅B站用户
   * @param groupId 群组ID
   * @param botId 机器人ID
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async subscribeBilibiliUser (groupId: string, botId: string, host_mid: number, remark: string = ''): Promise<GroupUserSubscription> {
    await this.getOrCreateGroup(groupId, botId)
    await this.getOrCreateBilibiliUser(host_mid, remark)

    let subscription = await this.get<GroupUserSubscription>(
      'SELECT * FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?',
      [groupId, host_mid]
    )
    if (!subscription) {
      const now = this.now()
      await this.run(
        'INSERT INTO GroupUserSubscriptions (groupId, host_mid, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
        [groupId, host_mid, now, now]
      )
      subscription = { groupId, host_mid, createdAt: now, updatedAt: now }
    }

    return subscription
  }

  /**
   * 取消订阅B站用户
   * @param groupId 群组ID
   * @param host_mid B站用户UID
   */
  async unsubscribeBilibiliUser (groupId: string, host_mid: number): Promise<boolean> {
    const result = await this.run(
      'DELETE FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?',
      [groupId, host_mid]
    )

    // 清除相关的动态缓存
    await this.run(
      'DELETE FROM DynamicCaches WHERE groupId = ? AND host_mid = ?',
      [groupId, host_mid]
    )

    return result.changes > 0
  }

  /**
   * 添加动态缓存
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   * @param dynamic_type 动态类型
   */
  async addDynamicCache (dynamic_id: string, host_mid: number, groupId: string, dynamic_type: string): Promise<DynamicCache> {
    let cache = await this.get<DynamicCache>(
      'SELECT * FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?',
      [dynamic_id, host_mid, groupId]
    )
    if (!cache) {
      const now = this.now()
      const result = await this.run(
        'INSERT INTO DynamicCaches (dynamic_id, host_mid, groupId, dynamic_type, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
        [dynamic_id, host_mid, groupId, dynamic_type, now, now]
      )
      cache = {
        id: result.lastID,
        dynamic_id,
        host_mid,
        groupId,
        dynamic_type,
        createdAt: now,
        updatedAt: now
      }
    }
    return cache
  }

  /**
   * 检查动态是否已推送
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isDynamicPushed (dynamic_id: string, host_mid: number, groupId: string): Promise<boolean> {
    const row = await this.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?',
      [dynamic_id, host_mid, groupId]
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
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions (groupId: string): Promise<Array<GroupUserSubscription & { bilibiliUser: BilibiliUser }>> {
    const subscriptions = await this.all<GroupUserSubscription & BilibiliUser>(
      `SELECT s.*, u.remark, u.filterMode 
       FROM GroupUserSubscriptions s
       JOIN BilibiliUsers u ON s.host_mid = u.host_mid
       WHERE s.groupId = ?`,
      [groupId]
    )

    return subscriptions.map(sub => ({
      groupId: sub.groupId,
      host_mid: sub.host_mid,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
      bilibiliUser: {
        host_mid: sub.host_mid,
        remark: sub.remark,
        filterMode: sub.filterMode,
        createdAt: sub.createdAt,
        updatedAt: sub.updatedAt
      }
    }))
  }

  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups (host_mid: number): Promise<Group[]> {
    return await this.all<Group>(
      `SELECT g.* 
       FROM Groups g
       JOIN GroupUserSubscriptions s ON g.id = s.groupId
       WHERE s.host_mid = ?`,
      [host_mid]
    )
  }

  /**
   * 获取群组的动态缓存
   * @param groupId 群组ID
   * @param host_mid 可选的B站用户UID过滤
   */
  async getGroupDynamicCache (groupId: string, host_mid?: number): Promise<DynamicCache[]> {
    let sql = 'SELECT * FROM DynamicCaches WHERE groupId = ?'
    const params: any[] = [groupId]

    if (host_mid) {
      sql += ' AND host_mid = ?'
      params.push(host_mid)
    }

    sql += ' ORDER BY createdAt DESC'

    return await this.all<DynamicCache>(sql, params)
  }

  /**
   * 检查群组是否已订阅B站用户
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isSubscribed (host_mid: number, groupId: string): Promise<boolean> {
    const row = await this.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE host_mid = ? AND groupId = ?',
      [host_mid, groupId]
    )
    return (row?.count || 0) > 0
  }

  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions (configItems: bilibiliPushItem[]): Promise<void> {
    // 1. 收集配置文件中的所有订阅关系
    const configSubscriptions: Map<string, Set<number>> = new Map()

    // 初始化每个群组的订阅UP集合
    for (const item of configItems) {
      const host_mid = item.host_mid
      const remark = item.remark ?? ''

      // 创建或更新B站用户记录
      await this.getOrCreateBilibiliUser(host_mid, remark)

      // 处理该UP主的所有群组订阅
      for (const groupWithBot of item.group_id) {
        const [groupId, botId] = groupWithBot.split(':')
        if (!groupId || !botId) continue

        // 确保群组存在
        await this.getOrCreateGroup(groupId, botId)

        // 记录配置文件中的订阅关系
        if (!configSubscriptions.has(groupId)) {
          configSubscriptions.set(groupId, new Set())
        }
        configSubscriptions.get(groupId)?.add(host_mid)

        // 检查是否已订阅
        const isSubscribed = await this.isSubscribed(host_mid, groupId)

        // 如果未订阅，创建订阅关系
        if (!isSubscribed) {
          await this.subscribeBilibiliUser(groupId, botId, host_mid, remark)
        }
      }
    }

    // 2. 获取数据库中的所有订阅关系，并与配置文件比较，删除不在配置文件中的订阅
    // 获取所有群组
    const allGroups = await this.all<Group>('SELECT * FROM Groups')

    for (const group of allGroups) {
      const groupId = group.id
      const configUps = configSubscriptions.get(groupId) ?? new Set()

      // 获取该群组在数据库中的所有订阅
      const dbSubscriptions = await this.getGroupSubscriptions(groupId)

      // 找出需要删除的订阅（在数据库中存在但配置文件中不存在）
      for (const subscription of dbSubscriptions) {
        const host_mid = subscription.host_mid

        if (!configUps.has(host_mid)) {
          // 删除订阅关系
          await this.unsubscribeBilibiliUser(groupId, host_mid)
          logger.mark(`已删除群组 ${groupId} 对UP主 ${host_mid} 的订阅`)
        }
      }
    }

    // 3. 清理不再被任何群组订阅的UP主记录及其过滤词和过滤标签
    // 获取所有B站用户
    const allUsers = await this.all<BilibiliUser>('SELECT * FROM BilibiliUsers')

    for (const user of allUsers) {
      const host_mid = user.host_mid

      // 检查该UP主是否还有群组订阅
      const subscribedGroups = await this.getUserSubscribedGroups(host_mid)

      if (subscribedGroups.length === 0) {
        // 删除该UP主的过滤词和过滤标签
        await this.run('DELETE FROM FilterWords WHERE host_mid = ?', [host_mid])
        await this.run('DELETE FROM FilterTags WHERE host_mid = ?', [host_mid])

        // 删除该UP主记录
        await this.run('DELETE FROM BilibiliUsers WHERE host_mid = ?', [host_mid])

        logger.mark(`已删除UP主 ${host_mid} 的记录及相关过滤设置（不再被任何群组订阅）`)
      }
    }
  }

  /**
   * 更新用户的过滤模式
   * @param host_mid B站用户UID
   * @param filterMode 过滤模式
   */
  async updateFilterMode (host_mid: number, filterMode: 'blacklist' | 'whitelist'): Promise<BilibiliUser> {
    const user = await this.getOrCreateBilibiliUser(host_mid)
    const now = this.now()
    await this.run(
      'UPDATE BilibiliUsers SET filterMode = ?, updatedAt = ? WHERE host_mid = ?',
      [filterMode, now, host_mid]
    )
    user.filterMode = filterMode
    user.updatedAt = now
    return user
  }

  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord (host_mid: number, word: string): Promise<FilterWord> {
    await this.getOrCreateBilibiliUser(host_mid)

    let filterWord = await this.get<FilterWord>(
      'SELECT * FROM FilterWords WHERE host_mid = ? AND word = ?',
      [host_mid, word]
    )

    if (!filterWord) {
      const now = this.now()
      const result = await this.run(
        'INSERT INTO FilterWords (host_mid, word, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
        [host_mid, word, now, now]
      )
      filterWord = {
        id: result.lastID,
        host_mid,
        word,
        createdAt: now,
        updatedAt: now
      }
    }
    return filterWord
  }

  /**
   * 删除过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async removeFilterWord (host_mid: number, word: string): Promise<boolean> {
    const result = await this.run(
      'DELETE FROM FilterWords WHERE host_mid = ? AND word = ?',
      [host_mid, word]
    )
    return result.changes > 0
  }

  /**
   * 添加过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async addFilterTag (host_mid: number, tag: string): Promise<FilterTag> {
    await this.getOrCreateBilibiliUser(host_mid)

    let filterTag = await this.get<FilterTag>(
      'SELECT * FROM FilterTags WHERE host_mid = ? AND tag = ?',
      [host_mid, tag]
    )

    if (!filterTag) {
      const now = this.now()
      const result = await this.run(
        'INSERT INTO FilterTags (host_mid, tag, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
        [host_mid, tag, now, now]
      )
      filterTag = {
        id: result.lastID,
        host_mid,
        tag,
        createdAt: now,
        updatedAt: now
      }
    }
    return filterTag
  }

  /**
   * 删除过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async removeFilterTag (host_mid: number, tag: string): Promise<boolean> {
    const result = await this.run(
      'DELETE FROM FilterTags WHERE host_mid = ? AND tag = ?',
      [host_mid, tag]
    )
    return result.changes > 0
  }

  /**
   * 获取用户的所有过滤词
   * @param host_mid B站用户UID
   */
  async getFilterWords (host_mid: number): Promise<string[]> {
    const filterWords = await this.all<FilterWord>('SELECT * FROM FilterWords WHERE host_mid = ?', [host_mid])
    return filterWords.map(word => word.word)
  }

  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags (host_mid: number): Promise<string[]> {
    const filterTags = await this.all<FilterTag>('SELECT * FROM FilterTags WHERE host_mid = ?', [host_mid])
    return filterTags.map(tag => tag.tag)
  }

  /**
   * 获取用户的过滤配置
   * @param host_mid B站用户UID
   */
  async getFilterConfig (host_mid: number): Promise<{ filterMode: 'blacklist' | 'whitelist'; filterWords: string[]; filterTags: string[] }> {
    const user = await this.getOrCreateBilibiliUser(host_mid)
    const filterWords = await this.getFilterWords(host_mid)
    const filterTags = await this.getFilterTags(host_mid)

    return {
      filterMode: user.filterMode,
      filterWords,
      filterTags
    }
  }

  /**
   * 从动态中提取文本内容和标签
   * @param dynamicData 动态数据
   * @returns 提取的文本内容和标签
   */
  private async extractTextAndTags (dynamicData: any): Promise<{ text: string; tags: string[] }> {
    let text = ''
    const tags: string[] = []

    // 如果没有模块数据，返回空结果
    if (!dynamicData || !dynamicData.modules || !dynamicData.modules.module_dynamic) {
      return { text, tags }
    }

    const moduleDynamic = dynamicData.modules.module_dynamic

    // 提取直播标题和分区
    if (moduleDynamic.major && moduleDynamic.major.live_rcmd) {
      const content = JSON.parse(moduleDynamic.major.live_rcmd.content)
      text += content.live_play_info.title + ' '
      tags.push(content.live_play_info.area_name)
    }

    // 提取描述文本
    if (moduleDynamic.desc && moduleDynamic.desc.text) {
      text += moduleDynamic.desc.text + ' '
    }

    // 提取视频标题
    if (moduleDynamic.major && moduleDynamic.major.archive && moduleDynamic.major.archive.title) {
      text += moduleDynamic.major.archive.title + ' '
    }

    // 提取标签
    // 主动态
    if (moduleDynamic.desc && moduleDynamic.desc.rich_text_nodes) {
      for (const node of moduleDynamic.desc.rich_text_nodes) {
        if (node.type !== 'RICH_TEXT_NODE_TYPE_TEXT') {
          tags.push(node.orig_text)
        }
      }
    }
    // 若为转发动态，再检查子动态
    if (dynamicData.type === DynamicType.FORWARD && 'orig' in dynamicData) {
      if (dynamicData.orig.type === DynamicType.AV) {
        text += dynamicData.orig.modules.module_dynamic.major.archive.title + ''
      } else {
        logger.debug(`提取子动态文本和tag：https://t.bilibili.com/${dynamicData.id_str}`)
        try {
          text += dynamicData.orig.modules.module_dynamic.major.opus.summary.text + ' '
          for (const node of dynamicData.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes) {
            tags.push(node.orig_text)
          }
        } catch (error) {
          logger.error(`提取子动态文本和tag失败：${error}`)
        }
      }
    }

    return { text: text.trim(), tags }
  }

  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param extraTags 额外的标签列表
   */
  async shouldFilter (PushItem: BilibiliPushItem, extraTags: string[] = []): Promise<boolean> {
    // 获取用户的过滤配置
    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(PushItem.host_mid)
    logger.debug(`
      获取用户${PushItem.remark}（${PushItem.host_mid}）的过滤配置：
      过滤模式：${filterMode}
      过滤词：${filterWords}
      过滤标签：${filterTags}
      `)

    // 提取主动态的文本和标签
    const { text: mainText, tags: mainTags } = await this.extractTextAndTags(PushItem.Dynamic_Data)
    logger.debug(`
      提取主动态的文本和标签：
      文本：${mainText}
      标签：[${mainTags.join('][')}]
      `)

    // 合并所有标签
    let allTags = [...mainTags, ...extraTags]
    let allText = mainText

    // 如果是转发动态，还需要检查原动态
    if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && 'orig' in PushItem.Dynamic_Data) {
      const { text: origText, tags: origTags } = await this.extractTextAndTags(PushItem.Dynamic_Data.orig)
      allText += ' ' + origText
      allTags = [...allTags, ...origTags]
    }

    // 检查内容中是否包含过滤词
    const hasFilterWord = filterWords.some(word => allText.includes(word))

    // 检查标签中是否包含过滤标签
    const hasFilterTag = filterTags.some(filterTag =>
      allTags.some(tag => tag.includes(filterTag))
    )

    logger.debug(`
    UP主UID：${PushItem.host_mid}
    检查内容：${allText}
    检查标签：${allTags.join(', ')}
    命中词：[${filterWords.join('], [')}]
    命中标签：[${filterTags.join('], [')}]
    过滤模式：${filterMode}
    是否过滤：${(hasFilterWord || hasFilterTag) ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
    动态地址：${logger.green(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
    动态类型：${PushItem.dynamic_type}
    `)

    // 根据过滤模式决定是否过滤
    if (filterMode === 'blacklist') {
      // 黑名单模式：如果包含过滤词或过滤标签，则过滤
      if (hasFilterWord || hasFilterTag) {
        logger.warn(`
        动态内容命中黑名单规则，已过滤该动态不再推送
        动态地址：${logger.yellow(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
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
        动态内容未命中白名单规则，已过滤该动态不再推送
        动态地址：${logger.yellow(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
        当前白名单词：[${filterWords.join('], [')}]
        当前白名单标签：[${filterTags.join('], [')}]
      `)
      return true // 过滤
    }
  }
}

/**
 * B站数据库模型集合 (SQLite)
 */
export const bilibiliSQLiteModels = {
  /** BilibiliUsers表 - 存储B站用户信息 */
  BilibiliUser: 'BilibiliUsers',
  /** Bots表 - 存储机器人信息 */
  Bot: 'Bots',
  /** DynamicCache表 - 存储已推送的动态ID */
  DynamicCache: 'DynamicCaches',
  /** Groups表 - 存储群组信息 */
  Group: 'Groups',
  /** GroupUserSubscriptions表 - 存储群组订阅的B站用户关系 */
  GroupUserSubscription: 'GroupUserSubscriptions',
  /** FilterWord表 - 存储过滤词 */
  FilterWord: 'FilterWords',
  /** FilterTag表 - 存储过滤标签 */
  FilterTag: 'FilterTags'
}
