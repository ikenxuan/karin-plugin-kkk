import fs from 'node:fs'
import path from 'node:path'

import { DynamicType } from '@ikenxuan/amagi'
import { logger } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import sqlite3 from 'node-karin/sqlite3'

import { Root } from '@/module/utils'
import { Config } from '@/module/utils/Config'
import { BilibiliPushItem } from '@/platform/bilibili/push'
import { bilibiliPushItem } from '@/types/config/pushlist'

/**
 * 机器人接口 - 存储机器人信息
 */
interface Bot {
  /** 机器人ID */
  id: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 群组接口 - 存储群组信息
 */
interface Group {
  /** 群组ID */
  id: string
  /** 所属机器人ID */
  botId: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * B站用户接口 - 存储B站用户信息
 */
interface BilibiliUser {
  /** B站用户UID */
  host_mid: number
  /** B站用户昵称 */
  remark?: string
  /** 过滤模式：黑名单或白名单 */
  filterMode: 'blacklist' | 'whitelist'
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 群组用户订阅关系接口 - 存储群组订阅的B站用户关系
 */
interface GroupUserSubscription {
  /** 群组ID */
  groupId: string
  /** B站用户UID */
  host_mid: number
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 动态缓存接口 - 存储已推送的动态ID
 */
interface DynamicCache {
  /** 缓存ID */
  id: number
  /** 动态ID */
  dynamic_id: string
  /** B站用户UID */
  host_mid: number
  /** 群组ID */
  groupId: string
  /** 动态类型 */
  dynamic_type?: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 过滤词接口 - 存储过滤词
 */
interface FilterWord {
  /** 过滤词ID */
  id: number
  /** B站用户UID */
  host_mid: number
  /** 过滤词 */
  word: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/**
 * 过滤标签接口 - 存储过滤标签
 */
interface FilterTag {
  /** 过滤标签ID */
  id: number
  /** B站用户UID */
  host_mid: number
  /** 过滤标签 */
  tag: string
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/** 数据库操作类 */
export class BilibiliDBBase {
  private db!: sqlite3.Database
  private dbPath: string

  constructor () {
    this.dbPath = path.join(`${karinPathBase}/${Root.pluginName}/data`, 'bilibili.db')
  }

  /**
   * 初始化数据库
   */
  async init (): Promise<BilibiliDBBase> {
    try {
      logger.debug(logger.green('--------------------------[BilibiliDB] 开始初始化数据库--------------------------'))
      logger.debug('[BilibiliDB] 正在连接数据库...')

      // 创建数据库连接
      await fs.promises.mkdir(path.dirname(this.dbPath), { recursive: true })
      this.db = new sqlite3.Database(this.dbPath)

      // 创建表结构
      await this.createTables()

      logger.debug('[BilibiliDB] 数据库模型同步成功')

      logger.debug('[BilibiliDB] 正在同步配置订阅...')
      logger.debug('[BilibiliDB] 配置项数量:', Config.pushlist.bilibili?.length || 0)
      await this.syncConfigSubscriptions(Config.pushlist.bilibili)
      logger.debug('[BilibiliDB] 配置订阅同步成功')
      logger.debug(logger.green('--------------------------[BilibiliDB] 初始化数据库完成--------------------------'))
    } catch (error) {
      logger.error('[BilibiliDB] 数据库初始化失败:', error)
      throw error
    }

    return this
  }

  /**
   * 创建数据库表结构
   */
  private async createTables (): Promise<void> {
    const queries = [
      // 创建机器人表
      `CREATE TABLE IF NOT EXISTS Bots (
        id TEXT PRIMARY KEY,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )`,

      // 创建群组表
      `CREATE TABLE IF NOT EXISTS Groups (
        id TEXT PRIMARY KEY,
        botId TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (botId) REFERENCES Bots(id)
      )`,

      // 创建B站用户表
      `CREATE TABLE IF NOT EXISTS BilibiliUsers (
        host_mid INTEGER PRIMARY KEY,
        remark TEXT,
        filterMode TEXT DEFAULT 'blacklist',
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )`,

      // 创建群组用户订阅关系表
      `CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (
        groupId TEXT,
        host_mid INTEGER,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (groupId, host_mid),
        FOREIGN KEY (groupId) REFERENCES Groups(id),
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid)
      )`,

      // 创建动态缓存表
      `CREATE TABLE IF NOT EXISTS DynamicCaches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dynamic_id TEXT NOT NULL,
        host_mid INTEGER NOT NULL,
        groupId TEXT NOT NULL,
        dynamic_type TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),
        FOREIGN KEY (groupId) REFERENCES Groups(id),
        UNIQUE(dynamic_id, host_mid, groupId)
      )`,

      // 创建过滤词表
      `CREATE TABLE IF NOT EXISTS FilterWords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        host_mid INTEGER NOT NULL,
        word TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),
        UNIQUE(host_mid, word)
      )`,

      // 创建过滤标签表
      `CREATE TABLE IF NOT EXISTS FilterTags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        host_mid INTEGER NOT NULL,
        tag TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),
        UNIQUE(host_mid, tag)
      )`
    ]

    for (const query of queries) {
      await this.runQuery(query)
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
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot (botId: string): Promise<Bot> {
    let bot = await this.getQuery<Bot>('SELECT * FROM Bots WHERE id = ?', [botId])

    if (!bot) {
      const now = new Date().toISOString()
      await this.runQuery(
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

    let group = await this.getQuery<Group>('SELECT * FROM Groups WHERE id = ? AND botId = ?', [groupId, botId])

    if (!group) {
      const now = new Date().toISOString()
      await this.runQuery(
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
    let user = await this.getQuery<BilibiliUser>('SELECT * FROM BilibiliUsers WHERE host_mid = ?', [host_mid])

    if (!user) {
      const now = new Date().toISOString()
      await this.runQuery(
        'INSERT INTO BilibiliUsers (host_mid, remark, filterMode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        [host_mid, remark, 'blacklist', now, now]
      )
      user = {
        host_mid,
        remark,
        filterMode: 'blacklist',
        createdAt: now,
        updatedAt: now
      }
    } else {
      // 如果提供了新的remark，更新用户记录
      if (remark && user.remark !== remark) {
        const now = new Date().toISOString()
        await this.runQuery(
          'UPDATE BilibiliUsers SET remark = ?, updatedAt = ? WHERE host_mid = ?',
          [remark, now, host_mid]
        )
        user.remark = remark
        user.updatedAt = now
      }
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

    let subscription = await this.getQuery<GroupUserSubscription>(
      'SELECT * FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?',
      [groupId, host_mid]
    )

    if (!subscription) {
      const now = new Date().toISOString()
      await this.runQuery(
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
    const result = await this.runQuery(
      'DELETE FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?',
      [groupId, host_mid]
    )

    // 清除相关的动态缓存
    await this.runQuery(
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
    let cache = await this.getQuery<DynamicCache>(
      'SELECT * FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?',
      [dynamic_id, host_mid, groupId]
    )

    if (!cache) {
      const now = new Date().toISOString()
      const result = await this.runQuery(
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
    const result = await this.getQuery<{ count: number }>(
      'SELECT COUNT(*) as count FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?',
      [dynamic_id, host_mid, groupId]
    )

    return (result?.count || 0) > 0
  }

  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups (botId: string): Promise<Group[]> {
    return await this.allQuery<Group>('SELECT * FROM Groups WHERE botId = ?', [botId])
  }

  /**
   * 更新群组的机器人ID
   * @param groupId 群组ID
   * @param oldBotId 旧的机器人ID
   * @param newBotId 新的机器人ID
   */
  async updateGroupBotId (groupId: string, oldBotId: string, newBotId: string): Promise<void> {
    await this.getOrCreateBot(newBotId)
    const now = new Date().toISOString()
    await this.runQuery(
      'UPDATE Groups SET botId = ?, updatedAt = ? WHERE id = ? AND botId = ?',
      [newBotId, now, groupId, oldBotId]
    )
  }

  /**
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions (groupId: string): Promise<(GroupUserSubscription & { bilibiliUser: BilibiliUser })[]> {
    const subscriptions = await this.allQuery<any>(
      `SELECT 
        gus.groupId, gus.host_mid, gus.createdAt, gus.updatedAt,
        bu.remark, bu.filterMode,
        bu.createdAt as bu_createdAt, bu.updatedAt as bu_updatedAt
      FROM GroupUserSubscriptions gus
      LEFT JOIN BilibiliUsers bu ON gus.host_mid = bu.host_mid
      WHERE gus.groupId = ?`,
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
        filterMode: sub.filterMode as 'blacklist' | 'whitelist',
        createdAt: sub.bu_createdAt,
        updatedAt: sub.bu_updatedAt
      }
    }))
  }

  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups (host_mid: number): Promise<Group[]> {
    return await this.allQuery<Group>(
      `SELECT g.* FROM Groups g
      INNER JOIN GroupUserSubscriptions gus ON g.id = gus.groupId
      WHERE gus.host_mid = ?`,
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

    return await this.allQuery<DynamicCache>(sql, params)
  }

  /**
   * 检查群组是否已订阅B站用户
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isSubscribed (host_mid: number, groupId: string): Promise<boolean> {
    const result = await this.getQuery<{ count: number }>(
      'SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE host_mid = ? AND groupId = ?',
      [host_mid, groupId]
    )

    return (result?.count || 0) > 0
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
    const allGroups = await this.allQuery<Group>('SELECT * FROM Groups')

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
    const allUsers = await this.allQuery<BilibiliUser>('SELECT * FROM BilibiliUsers')

    for (const user of allUsers) {
      const host_mid = user.host_mid

      // 检查该UP主是否还有群组订阅
      const subscribedGroups = await this.getUserSubscribedGroups(host_mid)

      if (subscribedGroups.length === 0) {
        // 删除该UP主的过滤词和过滤标签
        await this.runQuery('DELETE FROM FilterWords WHERE host_mid = ?', [host_mid])
        await this.runQuery('DELETE FROM FilterTags WHERE host_mid = ?', [host_mid])

        // 删除该UP主记录
        await this.runQuery('DELETE FROM BilibiliUsers WHERE host_mid = ?', [host_mid])

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
    const now = new Date().toISOString()

    await this.runQuery(
      'UPDATE BilibiliUsers SET filterMode = ?, updatedAt = ? WHERE host_mid = ?',
      [filterMode, now, host_mid]
    )

    return { ...user, filterMode, updatedAt: now }
  }

  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord (host_mid: number, word: string): Promise<FilterWord> {
    await this.getOrCreateBilibiliUser(host_mid)

    let filterWord = await this.getQuery<FilterWord>(
      'SELECT * FROM FilterWords WHERE host_mid = ? AND word = ?',
      [host_mid, word]
    )

    if (!filterWord) {
      const now = new Date().toISOString()
      const result = await this.runQuery(
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
    const result = await this.runQuery(
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

    let filterTag = await this.getQuery<FilterTag>(
      'SELECT * FROM FilterTags WHERE host_mid = ? AND tag = ?',
      [host_mid, tag]
    )

    if (!filterTag) {
      const now = new Date().toISOString()
      const result = await this.runQuery(
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
    const result = await this.runQuery(
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
    const filterWords = await this.allQuery<FilterWord>('SELECT * FROM FilterWords WHERE host_mid = ?', [host_mid])
    return filterWords.map(word => word.word)
  }

  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags (host_mid: number): Promise<string[]> {
    const filterTags = await this.allQuery<FilterTag>('SELECT * FROM FilterTags WHERE host_mid = ?', [host_mid])
    return filterTags.map(tag => tag.tag)
  }

  /**
   * 获取用户的过滤配置
   * @param host_mid B站用户UID
   */
  async getFilterConfig (host_mid: number): Promise<{ filterMode: 'blacklist' | 'whitelist', filterWords: string[], filterTags: string[] }> {
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
   * @param tags 额外的标签列表
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
    const hasFilterWord = filterWords.some((word: string) => allText.includes(word))

    // 检查标签中是否包含过滤标签
    const hasFilterTag = filterTags.some((filterTag: string) =>
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

  /**
   * 清理旧的动态缓存记录
   * @param days 保留最近几天的记录
   * @returns 删除的记录数量
   */
  async cleanOldDynamicCache (days: number = 7): Promise<number> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    const cutoffDateStr = cutoffDate.toISOString()

    const result = await this.runQuery(
      'DELETE FROM DynamicCaches WHERE createdAt < ?',
      [cutoffDateStr]
    )
    return result.changes ?? 0
  }

  /** 为了向后兼容，保留groupRepository和dynamicCacheRepository属性 */
  get groupRepository () {
    return {
      find: async (options?: {
        where?: {
          botId?: string
          id?: string
        }
      }) => {
        if (options?.where?.botId) {
          return await this.getBotGroups(options.where.botId)
        }
        return await this.allQuery<Group>('SELECT * FROM Groups')
      }
    }
  }

  get dynamicCacheRepository () {
    return {
      find: async <T = DynamicCache & { createdAt: Date, updatedAt: Date }>(options: {
        where?: {
          groupId?: string
          host_mid?: number
          dynamic_id?: string
        }
        order?: Record<string, 'ASC' | 'DESC'>
        take?: number
        relations?: string[]
      } = {}): Promise<T[]> => {
        const { where = {}, order, take, relations } = options
        let sql = 'SELECT * FROM DynamicCaches'
        const params: any[] = []

        // 构建WHERE条件
        const conditions: string[] = []
        if (where.groupId) {
          conditions.push('groupId = ?')
          params.push(where.groupId)
        }
        if (where.host_mid) {
          conditions.push('host_mid = ?')
          params.push(where.host_mid)
        }
        if (where.dynamic_id) {
          conditions.push('dynamic_id = ?')
          params.push(where.dynamic_id)
        }

        if (conditions.length > 0) {
          sql += ' WHERE ' + conditions.join(' AND ')
        }

        // 构建ORDER BY
        if (order) {
          const orderClauses: string[] = []
          const allowedFields = ['id', 'dynamic_id', 'host_mid', 'groupId', 'dynamic_type', 'createdAt', 'updatedAt']
          const allowedDirections = ['ASC', 'DESC']

          for (const [field, direction] of Object.entries(order)) {
            // 验证字段名和排序方向，防止SQL注入
            if (allowedFields.includes(field) && allowedDirections.includes(direction)) {
              orderClauses.push(`${field} ${direction}`)
            }
          }
          if (orderClauses.length > 0) {
            sql += ' ORDER BY ' + orderClauses.join(', ')
          }
        }

        // 构建LIMIT
        if (take) {
          sql += ' LIMIT ?'
          params.push(take.toString())
        }

        const caches = await this.allQuery<DynamicCache>(sql, params)

        // 如果需要关联bilibiliUser数据
        if (relations && relations.includes('bilibiliUser')) {
          const result = []
          for (const cache of caches) {
            const bilibiliUser = await this.getQuery<BilibiliUser>('SELECT * FROM BilibiliUsers WHERE host_mid = ?', [cache.host_mid])
            result.push({
              ...cache,
              bilibiliUser,
              createdAt: new Date(cache.createdAt), // 转换为Date对象
              updatedAt: new Date(cache.updatedAt)
            })
          }
          return result as T[]
        }

        // 转换日期字符串为Date对象
        return caches.map(cache => ({
          ...cache,
          createdAt: new Date(cache.createdAt),
          updatedAt: new Date(cache.updatedAt)
        })) as T[]
      },
      delete: async (conditions: {
        groupId?: string
        host_mid?: number
        dynamic_id?: string
      }) => {
        const { groupId, host_mid, dynamic_id } = conditions

        if (groupId && host_mid) {
          const result = await this.runQuery(
            'DELETE FROM DynamicCaches WHERE groupId = ? AND host_mid = ?',
            [groupId, host_mid]
          )
          return { affected: result.changes }
        }
        if (groupId) {
          const result = await this.runQuery(
            'DELETE FROM DynamicCaches WHERE groupId = ?',
            [groupId]
          )
          return { affected: result.changes }
        }
        if (host_mid) {
          const result = await this.runQuery(
            'DELETE FROM DynamicCaches WHERE host_mid = ?',
            [host_mid]
          )
          return { affected: result.changes }
        }
        if (dynamic_id) {
          const result = await this.runQuery(
            'DELETE FROM DynamicCaches WHERE dynamic_id = ?',
            [dynamic_id]
          )
          return { affected: result.changes }
        }
        return { affected: 0 }
      }
    }
  }
}
