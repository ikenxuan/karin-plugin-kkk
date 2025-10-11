import fs from "node:fs";
import path from "node:path";
import { logger } from "node-karin";
import { karinPathBase } from "node-karin/root";
import sqlite3 from "node-karin/sqlite3";
import { Root } from "../root.js";
import { D as DynamicType } from "./vendor-ClxefV4m.js";
import { C as Config } from "./main-PJBwqzbd.js";
import "node-karin/axios";
import "stream/promises";
import "./template.js";
class BilibiliDBBase {
  db;
  dbPath;
  constructor() {
    this.dbPath = path.join(`${karinPathBase}/${Root.pluginName}/data`, "bilibili.db");
  }
  /**
   * 初始化数据库
   */
  async init() {
    try {
      logger.debug(logger.green("--------------------------[BilibiliDB] 开始初始化数据库--------------------------"));
      logger.debug("[BilibiliDB] 正在连接数据库...");
      await fs.promises.mkdir(path.dirname(this.dbPath), { recursive: true });
      this.db = new sqlite3.Database(this.dbPath);
      await this.createTables();
      logger.debug("[BilibiliDB] 数据库模型同步成功");
      logger.debug("[BilibiliDB] 正在同步配置订阅...");
      logger.debug("[BilibiliDB] 配置项数量:", Config.pushlist.bilibili?.length || 0);
      await this.syncConfigSubscriptions(Config.pushlist.bilibili);
      logger.debug("[BilibiliDB] 配置订阅同步成功");
      logger.debug(logger.green("--------------------------[BilibiliDB] 初始化数据库完成--------------------------"));
    } catch (error) {
      logger.error("[BilibiliDB] 数据库初始化失败:", error);
      throw error;
    }
    return this;
  }
  /**
   * 创建数据库表结构
   */
  async createTables() {
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
    ];
    for (const query of queries) {
      await this.runQuery(query);
    }
  }
  /**
   * 执行SQL查询
   */
  runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }
  /**
   * 执行SQL查询并获取单个结果
   */
  getQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  /**
   * 执行SQL查询并获取所有结果
   */
  allQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  /**
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot(botId) {
    let bot = await this.getQuery("SELECT * FROM Bots WHERE id = ?", [botId]);
    if (!bot) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO Bots (id, createdAt, updatedAt) VALUES (?, ?, ?)",
        [botId, now, now]
      );
      bot = { id: botId, createdAt: now, updatedAt: now };
    }
    return bot;
  }
  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup(groupId, botId) {
    await this.getOrCreateBot(botId);
    let group = await this.getQuery("SELECT * FROM Groups WHERE id = ? AND botId = ?", [groupId, botId]);
    if (!group) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO Groups (id, botId, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [groupId, botId, now, now]
      );
      group = { id: groupId, botId, createdAt: now, updatedAt: now };
    }
    return group;
  }
  /**
   * 获取或创建B站用户记录
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async getOrCreateBilibiliUser(host_mid, remark = "") {
    let user = await this.getQuery("SELECT * FROM BilibiliUsers WHERE host_mid = ?", [host_mid]);
    if (!user) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO BilibiliUsers (host_mid, remark, filterMode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
        [host_mid, remark, "blacklist", now, now]
      );
      user = {
        host_mid,
        remark,
        filterMode: "blacklist",
        createdAt: now,
        updatedAt: now
      };
    } else {
      if (remark && user.remark !== remark) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        await this.runQuery(
          "UPDATE BilibiliUsers SET remark = ?, updatedAt = ? WHERE host_mid = ?",
          [remark, now, host_mid]
        );
        user.remark = remark;
        user.updatedAt = now;
      }
    }
    return user;
  }
  /**
   * 订阅B站用户
   * @param groupId 群组ID
   * @param botId 机器人ID
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async subscribeBilibiliUser(groupId, botId, host_mid, remark = "") {
    await this.getOrCreateGroup(groupId, botId);
    await this.getOrCreateBilibiliUser(host_mid, remark);
    let subscription = await this.getQuery(
      "SELECT * FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?",
      [groupId, host_mid]
    );
    if (!subscription) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO GroupUserSubscriptions (groupId, host_mid, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [groupId, host_mid, now, now]
      );
      subscription = { groupId, host_mid, createdAt: now, updatedAt: now };
    }
    return subscription;
  }
  /**
   * 取消订阅B站用户
   * @param groupId 群组ID
   * @param host_mid B站用户UID
   */
  async unsubscribeBilibiliUser(groupId, host_mid) {
    const result = await this.runQuery(
      "DELETE FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?",
      [groupId, host_mid]
    );
    await this.runQuery(
      "DELETE FROM DynamicCaches WHERE groupId = ? AND host_mid = ?",
      [groupId, host_mid]
    );
    return result.changes > 0;
  }
  /**
   * 添加动态缓存
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   * @param dynamic_type 动态类型
   */
  async addDynamicCache(dynamic_id, host_mid, groupId, dynamic_type) {
    let cache = await this.getQuery(
      "SELECT * FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?",
      [dynamic_id, host_mid, groupId]
    );
    if (!cache) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const result = await this.runQuery(
        "INSERT INTO DynamicCaches (dynamic_id, host_mid, groupId, dynamic_type, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
        [dynamic_id, host_mid, groupId, dynamic_type, now, now]
      );
      cache = {
        id: result.lastID,
        dynamic_id,
        host_mid,
        groupId,
        dynamic_type,
        createdAt: now,
        updatedAt: now
      };
    }
    return cache;
  }
  /**
   * 检查动态是否已推送
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isDynamicPushed(dynamic_id, host_mid, groupId) {
    const result = await this.getQuery(
      "SELECT COUNT(*) as count FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?",
      [dynamic_id, host_mid, groupId]
    );
    return (result?.count || 0) > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await this.allQuery("SELECT * FROM Groups WHERE botId = ?", [botId]);
  }
  /**
   * 更新群组的机器人ID
   * @param groupId 群组ID
   * @param oldBotId 旧的机器人ID
   * @param newBotId 新的机器人ID
   */
  async updateGroupBotId(groupId, oldBotId, newBotId) {
    await this.getOrCreateBot(newBotId);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.runQuery(
      "UPDATE Groups SET botId = ?, updatedAt = ? WHERE id = ? AND botId = ?",
      [newBotId, now, groupId, oldBotId]
    );
  }
  /**
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    const subscriptions = await this.allQuery(
      `SELECT 
        gus.groupId, gus.host_mid, gus.createdAt, gus.updatedAt,
        bu.remark, bu.filterMode,
        bu.createdAt as bu_createdAt, bu.updatedAt as bu_updatedAt
      FROM GroupUserSubscriptions gus
      LEFT JOIN BilibiliUsers bu ON gus.host_mid = bu.host_mid
      WHERE gus.groupId = ?`,
      [groupId]
    );
    return subscriptions.map((sub) => ({
      groupId: sub.groupId,
      host_mid: sub.host_mid,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
      bilibiliUser: {
        host_mid: sub.host_mid,
        remark: sub.remark,
        filterMode: sub.filterMode,
        createdAt: sub.bu_createdAt,
        updatedAt: sub.bu_updatedAt
      }
    }));
  }
  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups(host_mid) {
    return await this.allQuery(
      `SELECT g.* FROM Groups g
      INNER JOIN GroupUserSubscriptions gus ON g.id = gus.groupId
      WHERE gus.host_mid = ?`,
      [host_mid]
    );
  }
  /**
   * 获取群组的动态缓存
   * @param groupId 群组ID
   * @param host_mid 可选的B站用户UID过滤
   */
  async getGroupDynamicCache(groupId, host_mid) {
    let sql = "SELECT * FROM DynamicCaches WHERE groupId = ?";
    const params = [groupId];
    if (host_mid) {
      sql += " AND host_mid = ?";
      params.push(host_mid);
    }
    sql += " ORDER BY createdAt DESC";
    return await this.allQuery(sql, params);
  }
  /**
   * 检查群组是否已订阅B站用户
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isSubscribed(host_mid, groupId) {
    const result = await this.getQuery(
      "SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE host_mid = ? AND groupId = ?",
      [host_mid, groupId]
    );
    return (result?.count || 0) > 0;
  }
  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions(configItems) {
    const configSubscriptions = /* @__PURE__ */ new Map();
    for (const item of configItems) {
      const host_mid = item.host_mid;
      const remark = item.remark ?? "";
      await this.getOrCreateBilibiliUser(host_mid, remark);
      for (const groupWithBot of item.group_id) {
        const [groupId, botId] = groupWithBot.split(":");
        if (!groupId || !botId) continue;
        await this.getOrCreateGroup(groupId, botId);
        if (!configSubscriptions.has(groupId)) {
          configSubscriptions.set(groupId, /* @__PURE__ */ new Set());
        }
        configSubscriptions.get(groupId)?.add(host_mid);
        const isSubscribed = await this.isSubscribed(host_mid, groupId);
        if (!isSubscribed) {
          await this.subscribeBilibiliUser(groupId, botId, host_mid, remark);
        }
      }
    }
    const allGroups = await this.allQuery("SELECT * FROM Groups");
    for (const group of allGroups) {
      const groupId = group.id;
      const configUps = configSubscriptions.get(groupId) ?? /* @__PURE__ */ new Set();
      const dbSubscriptions = await this.getGroupSubscriptions(groupId);
      for (const subscription of dbSubscriptions) {
        const host_mid = subscription.host_mid;
        if (!configUps.has(host_mid)) {
          await this.unsubscribeBilibiliUser(groupId, host_mid);
          logger.mark(`已删除群组 ${groupId} 对UP主 ${host_mid} 的订阅`);
        }
      }
    }
    const allUsers = await this.allQuery("SELECT * FROM BilibiliUsers");
    for (const user of allUsers) {
      const host_mid = user.host_mid;
      const subscribedGroups = await this.getUserSubscribedGroups(host_mid);
      if (subscribedGroups.length === 0) {
        await this.runQuery("DELETE FROM FilterWords WHERE host_mid = ?", [host_mid]);
        await this.runQuery("DELETE FROM FilterTags WHERE host_mid = ?", [host_mid]);
        await this.runQuery("DELETE FROM BilibiliUsers WHERE host_mid = ?", [host_mid]);
        logger.mark(`已删除UP主 ${host_mid} 的记录及相关过滤设置（不再被任何群组订阅）`);
      }
    }
  }
  /**
   * 更新用户的过滤模式
   * @param host_mid B站用户UID
   * @param filterMode 过滤模式
   */
  async updateFilterMode(host_mid, filterMode) {
    const user = await this.getOrCreateBilibiliUser(host_mid);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.runQuery(
      "UPDATE BilibiliUsers SET filterMode = ?, updatedAt = ? WHERE host_mid = ?",
      [filterMode, now, host_mid]
    );
    return { ...user, filterMode, updatedAt: now };
  }
  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord(host_mid, word) {
    await this.getOrCreateBilibiliUser(host_mid);
    let filterWord = await this.getQuery(
      "SELECT * FROM FilterWords WHERE host_mid = ? AND word = ?",
      [host_mid, word]
    );
    if (!filterWord) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const result = await this.runQuery(
        "INSERT INTO FilterWords (host_mid, word, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [host_mid, word, now, now]
      );
      filterWord = {
        id: result.lastID,
        host_mid,
        word,
        createdAt: now,
        updatedAt: now
      };
    }
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async removeFilterWord(host_mid, word) {
    const result = await this.runQuery(
      "DELETE FROM FilterWords WHERE host_mid = ? AND word = ?",
      [host_mid, word]
    );
    return result.changes > 0;
  }
  /**
   * 添加过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async addFilterTag(host_mid, tag) {
    await this.getOrCreateBilibiliUser(host_mid);
    let filterTag = await this.getQuery(
      "SELECT * FROM FilterTags WHERE host_mid = ? AND tag = ?",
      [host_mid, tag]
    );
    if (!filterTag) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const result = await this.runQuery(
        "INSERT INTO FilterTags (host_mid, tag, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [host_mid, tag, now, now]
      );
      filterTag = {
        id: result.lastID,
        host_mid,
        tag,
        createdAt: now,
        updatedAt: now
      };
    }
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async removeFilterTag(host_mid, tag) {
    const result = await this.runQuery(
      "DELETE FROM FilterTags WHERE host_mid = ? AND tag = ?",
      [host_mid, tag]
    );
    return result.changes > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param host_mid B站用户UID
   */
  async getFilterWords(host_mid) {
    const filterWords = await this.allQuery("SELECT * FROM FilterWords WHERE host_mid = ?", [host_mid]);
    return filterWords.map((word) => word.word);
  }
  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags(host_mid) {
    const filterTags = await this.allQuery("SELECT * FROM FilterTags WHERE host_mid = ?", [host_mid]);
    return filterTags.map((tag) => tag.tag);
  }
  /**
   * 获取用户的过滤配置
   * @param host_mid B站用户UID
   */
  async getFilterConfig(host_mid) {
    const user = await this.getOrCreateBilibiliUser(host_mid);
    const filterWords = await this.getFilterWords(host_mid);
    const filterTags = await this.getFilterTags(host_mid);
    return {
      filterMode: user.filterMode,
      filterWords,
      filterTags
    };
  }
  /**
   * 从动态中提取文本内容和标签
   * @param dynamicData 动态数据
   * @returns 提取的文本内容和标签
   */
  async extractTextAndTags(dynamicData) {
    let text = "";
    const tags = [];
    if (!dynamicData || !dynamicData.modules || !dynamicData.modules.module_dynamic) {
      return { text, tags };
    }
    const moduleDynamic = dynamicData.modules.module_dynamic;
    if (moduleDynamic.major && moduleDynamic.major.live_rcmd) {
      const content = JSON.parse(moduleDynamic.major.live_rcmd.content);
      text += content.live_play_info.title + " ";
      tags.push(content.live_play_info.area_name);
    }
    if (moduleDynamic.desc && moduleDynamic.desc.text) {
      text += moduleDynamic.desc.text + " ";
    }
    if (moduleDynamic.major && moduleDynamic.major.archive && moduleDynamic.major.archive.title) {
      text += moduleDynamic.major.archive.title + " ";
    }
    if (moduleDynamic.desc && moduleDynamic.desc.rich_text_nodes) {
      for (const node of moduleDynamic.desc.rich_text_nodes) {
        if (node.type !== "RICH_TEXT_NODE_TYPE_TEXT") {
          tags.push(node.orig_text);
        }
      }
    }
    if (dynamicData.type === DynamicType.FORWARD && "orig" in dynamicData) {
      if (dynamicData.orig.type === DynamicType.AV) {
        text += dynamicData.orig.modules.module_dynamic.major.archive.title + "";
      } else {
        logger.debug(`提取子动态文本和tag：https://t.bilibili.com/${dynamicData.id_str}`);
        try {
          text += dynamicData.orig.modules.module_dynamic.major.opus.summary.text + " ";
          for (const node of dynamicData.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes) {
            tags.push(node.orig_text);
          }
        } catch (error) {
          logger.error(`提取子动态文本和tag失败：${error}`);
        }
      }
    }
    return { text: text.trim(), tags };
  }
  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param tags 额外的标签列表
   */
  async shouldFilter(PushItem, extraTags = []) {
    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(PushItem.host_mid);
    logger.debug(`
      获取用户${PushItem.remark}（${PushItem.host_mid}）的过滤配置：
      过滤模式：${filterMode}
      过滤词：${filterWords}
      过滤标签：${filterTags}
      `);
    const { text: mainText, tags: mainTags } = await this.extractTextAndTags(PushItem.Dynamic_Data);
    logger.debug(`
      提取主动态的文本和标签：
      文本：${mainText}
      标签：[${mainTags.join("][")}]
      `);
    let allTags = [...mainTags, ...extraTags];
    let allText = mainText;
    if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && "orig" in PushItem.Dynamic_Data) {
      const { text: origText, tags: origTags } = await this.extractTextAndTags(PushItem.Dynamic_Data.orig);
      allText += " " + origText;
      allTags = [...allTags, ...origTags];
    }
    const hasFilterWord = filterWords.some((word) => allText.includes(word));
    const hasFilterTag = filterTags.some(
      (filterTag) => allTags.some((tag) => tag.includes(filterTag))
    );
    logger.debug(`
    UP主UID：${PushItem.host_mid}
    检查内容：${allText}
    检查标签：${allTags.join(", ")}
    命中词：[${filterWords.join("], [")}]
    命中标签：[${filterTags.join("], [")}]
    过滤模式：${filterMode}
    是否过滤：${hasFilterWord || hasFilterTag ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
    动态地址：${logger.green(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
    动态类型：${PushItem.dynamic_type}
    `);
    if (filterMode === "blacklist") {
      if (hasFilterWord || hasFilterTag) {
        logger.warn(`
        动态内容命中黑名单规则，已过滤该动态不再推送
        动态地址：${logger.yellow(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
        命中的黑名单词：[${filterWords.join("], [")}]
        命中的黑名单标签：[${filterTags.join("], [")}]
        `);
        return true;
      }
      return false;
    } else {
      if (filterWords.length === 0 && filterTags.length === 0) {
        return false;
      }
      if (hasFilterWord || hasFilterTag) {
        return false;
      }
      logger.warn(`
        动态内容未命中白名单规则，已过滤该动态不再推送
        动态地址：${logger.yellow(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
        当前白名单词：[${filterWords.join("], [")}]
        当前白名单标签：[${filterTags.join("], [")}]
      `);
      return true;
    }
  }
  /**
   * 清理旧的动态缓存记录
   * @param days 保留最近几天的记录
   * @returns 删除的记录数量
   */
  async cleanOldDynamicCache(days = 7) {
    const cutoffDate = /* @__PURE__ */ new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffDateStr = cutoffDate.toISOString();
    const result = await this.runQuery(
      "DELETE FROM DynamicCaches WHERE createdAt < ?",
      [cutoffDateStr]
    );
    return result.changes ?? 0;
  }
  /** 为了向后兼容，保留groupRepository和dynamicCacheRepository属性 */
  get groupRepository() {
    return {
      find: async (options) => {
        if (options?.where?.botId) {
          return await this.getBotGroups(options.where.botId);
        }
        return await this.allQuery("SELECT * FROM Groups");
      }
    };
  }
  get dynamicCacheRepository() {
    return {
      find: async (options = {}) => {
        const { where = {}, order, take, relations } = options;
        let sql = "SELECT * FROM DynamicCaches";
        const params = [];
        const conditions = [];
        if (where.groupId) {
          conditions.push("groupId = ?");
          params.push(where.groupId);
        }
        if (where.host_mid) {
          conditions.push("host_mid = ?");
          params.push(where.host_mid);
        }
        if (where.dynamic_id) {
          conditions.push("dynamic_id = ?");
          params.push(where.dynamic_id);
        }
        if (conditions.length > 0) {
          sql += " WHERE " + conditions.join(" AND ");
        }
        if (order) {
          const orderClauses = [];
          const allowedFields = ["id", "dynamic_id", "host_mid", "groupId", "dynamic_type", "createdAt", "updatedAt"];
          const allowedDirections = ["ASC", "DESC"];
          for (const [field, direction] of Object.entries(order)) {
            if (allowedFields.includes(field) && allowedDirections.includes(direction)) {
              orderClauses.push(`${field} ${direction}`);
            }
          }
          if (orderClauses.length > 0) {
            sql += " ORDER BY " + orderClauses.join(", ");
          }
        }
        if (take) {
          sql += " LIMIT ?";
          params.push(take.toString());
        }
        const caches = await this.allQuery(sql, params);
        if (relations && relations.includes("bilibiliUser")) {
          const result = [];
          for (const cache of caches) {
            const bilibiliUser = await this.getQuery("SELECT * FROM BilibiliUsers WHERE host_mid = ?", [cache.host_mid]);
            result.push({
              ...cache,
              bilibiliUser,
              createdAt: new Date(cache.createdAt),
              // 转换为Date对象
              updatedAt: new Date(cache.updatedAt)
            });
          }
          return result;
        }
        return caches.map((cache) => ({
          ...cache,
          createdAt: new Date(cache.createdAt),
          updatedAt: new Date(cache.updatedAt)
        }));
      },
      delete: async (conditions) => {
        const { groupId, host_mid, dynamic_id } = conditions;
        if (groupId && host_mid) {
          const result = await this.runQuery(
            "DELETE FROM DynamicCaches WHERE groupId = ? AND host_mid = ?",
            [groupId, host_mid]
          );
          return { affected: result.changes };
        }
        if (groupId) {
          const result = await this.runQuery(
            "DELETE FROM DynamicCaches WHERE groupId = ?",
            [groupId]
          );
          return { affected: result.changes };
        }
        if (host_mid) {
          const result = await this.runQuery(
            "DELETE FROM DynamicCaches WHERE host_mid = ?",
            [host_mid]
          );
          return { affected: result.changes };
        }
        if (dynamic_id) {
          const result = await this.runQuery(
            "DELETE FROM DynamicCaches WHERE dynamic_id = ?",
            [dynamic_id]
          );
          return { affected: result.changes };
        }
        return { affected: 0 };
      }
    };
  }
}
class DouyinDBBase {
  db;
  dbPath;
  constructor() {
    this.dbPath = path.join(`${karinPathBase}/${Root.pluginName}/data`, "douyin.db");
  }
  /**
   * 初始化数据库
   */
  async init() {
    try {
      logger.debug(logger.green("--------------------------[DouyinDB] 开始初始化数据库--------------------------"));
      logger.debug("[DouyinDB] 正在连接数据库...");
      await fs.promises.mkdir(path.dirname(this.dbPath), { recursive: true });
      this.db = new sqlite3.Database(this.dbPath);
      await this.createTables();
      logger.debug("[DouyinDB] 数据库模型同步成功");
      logger.debug("[DouyinDB] 正在同步配置订阅...");
      logger.debug("[DouyinDB] 配置项数量:", Config.pushlist.douyin?.length || 0);
      await this.syncConfigSubscriptions(Config.pushlist.douyin);
      logger.debug("[DouyinDB] 配置订阅同步成功");
      logger.debug(logger.green("--------------------------[DouyinDB] 初始化数据库完成--------------------------"));
    } catch (error) {
      logger.error("[DouyinDB] 数据库初始化失败:", error);
      throw error;
    }
    return this;
  }
  /**
   * 创建数据库表结构
   */
  async createTables() {
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
      // 创建抖音用户表
      `CREATE TABLE IF NOT EXISTS DouyinUsers (
        sec_uid TEXT PRIMARY KEY,
        short_id TEXT,
        remark TEXT,
        living INTEGER DEFAULT 0,
        filterMode TEXT DEFAULT 'blacklist',
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )`,
      // 创建群组用户订阅关系表
      `CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (
        groupId TEXT,
        sec_uid TEXT,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (groupId, sec_uid),
        FOREIGN KEY (groupId) REFERENCES Groups(id),
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid)
      )`,
      // 创建作品缓存表
      `CREATE TABLE IF NOT EXISTS AwemeCaches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        aweme_id TEXT NOT NULL,
        sec_uid TEXT NOT NULL,
        groupId TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),
        FOREIGN KEY (groupId) REFERENCES Groups(id),
        UNIQUE(aweme_id, sec_uid, groupId)
      )`,
      // 创建过滤词表
      `CREATE TABLE IF NOT EXISTS FilterWords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sec_uid TEXT NOT NULL,
        word TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),
        UNIQUE(sec_uid, word)
      )`,
      // 创建过滤标签表
      `CREATE TABLE IF NOT EXISTS FilterTags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sec_uid TEXT NOT NULL,
        tag TEXT NOT NULL,
        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),
        UNIQUE(sec_uid, tag)
      )`
    ];
    for (const query of queries) {
      await this.runQuery(query);
    }
  }
  /**
   * 执行SQL查询
   */
  runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ lastID: this.lastID, changes: this.changes });
        }
      });
    });
  }
  /**
   * 执行SQL查询并获取单个结果
   */
  getQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  /**
   * 执行SQL查询并获取所有结果
   */
  allQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  /**
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot(botId) {
    let bot = await this.getQuery("SELECT * FROM Bots WHERE id = ?", [botId]);
    if (!bot) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO Bots (id, createdAt, updatedAt) VALUES (?, ?, ?)",
        [botId, now, now]
      );
      bot = { id: botId, createdAt: now, updatedAt: now };
    }
    return bot;
  }
  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup(groupId, botId) {
    await this.getOrCreateBot(botId);
    let group = await this.getQuery("SELECT * FROM Groups WHERE id = ? AND botId = ?", [groupId, botId]);
    if (!group) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO Groups (id, botId, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [groupId, botId, now, now]
      );
      group = { id: groupId, botId, createdAt: now, updatedAt: now };
    }
    return group;
  }
  /**
   * 获取或创建抖音用户记录
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async getOrCreateDouyinUser(sec_uid, short_id = "", remark = "") {
    let user = await this.getQuery("SELECT * FROM DouyinUsers WHERE sec_uid = ?", [sec_uid]);
    if (!user) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO DouyinUsers (sec_uid, short_id, remark, living, filterMode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [sec_uid, short_id, remark, 0, "blacklist", now, now]
      );
      user = {
        sec_uid,
        short_id,
        remark,
        living: false,
        filterMode: "blacklist",
        createdAt: now,
        updatedAt: now
      };
    } else {
      let needUpdate = false;
      const updates = [];
      const params = [];
      if (remark && user.remark !== remark) {
        updates.push("remark = ?");
        params.push(remark);
        user.remark = remark;
        needUpdate = true;
      }
      if (short_id && user.short_id !== short_id) {
        updates.push("short_id = ?");
        params.push(short_id);
        user.short_id = short_id;
        needUpdate = true;
      }
      if (needUpdate) {
        const now = (/* @__PURE__ */ new Date()).toISOString();
        updates.push("updatedAt = ?");
        params.push(now);
        params.push(sec_uid);
        await this.runQuery(
          `UPDATE DouyinUsers SET ${updates.join(", ")} WHERE sec_uid = ?`,
          params
        );
        user.updatedAt = now;
      }
    }
    return user;
  }
  /**
   * 订阅抖音用户
   * @param groupId 群组ID
   * @param botId 机器人ID
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async subscribeDouyinUser(groupId, botId, sec_uid, short_id = "", remark = "") {
    await this.getOrCreateGroup(groupId, botId);
    await this.getOrCreateDouyinUser(sec_uid, short_id, remark);
    let subscription = await this.getQuery(
      "SELECT * FROM GroupUserSubscriptions WHERE groupId = ? AND sec_uid = ?",
      [groupId, sec_uid]
    );
    if (!subscription) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      await this.runQuery(
        "INSERT INTO GroupUserSubscriptions (groupId, sec_uid, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [groupId, sec_uid, now, now]
      );
      subscription = { groupId, sec_uid, createdAt: now, updatedAt: now };
    }
    return subscription;
  }
  /**
   * 取消订阅抖音用户
   * @param groupId 群组ID
   * @param sec_uid 抖音用户sec_uid
   */
  async unsubscribeDouyinUser(groupId, sec_uid) {
    const result = await this.runQuery(
      "DELETE FROM GroupUserSubscriptions WHERE groupId = ? AND sec_uid = ?",
      [groupId, sec_uid]
    );
    await this.runQuery(
      "DELETE FROM AwemeCaches WHERE groupId = ? AND sec_uid = ?",
      [groupId, sec_uid]
    );
    return result.changes > 0;
  }
  /**
   * 添加作品缓存
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async addAwemeCache(aweme_id, sec_uid, groupId) {
    let cache = await this.getQuery(
      "SELECT * FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ?",
      [aweme_id, sec_uid, groupId]
    );
    if (!cache) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const result = await this.runQuery(
        "INSERT INTO AwemeCaches (aweme_id, sec_uid, groupId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
        [aweme_id, sec_uid, groupId, now, now]
      );
      cache = {
        id: result.lastID,
        aweme_id,
        sec_uid,
        groupId,
        createdAt: now,
        updatedAt: now
      };
    }
    return cache;
  }
  /**
   * 检查作品是否已推送
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isAwemePushed(aweme_id, sec_uid, groupId) {
    const result = await this.getQuery(
      "SELECT COUNT(*) as count FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ?",
      [aweme_id, sec_uid, groupId]
    );
    return (result?.count || 0) > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await this.allQuery("SELECT * FROM Groups WHERE botId = ?", [botId]);
  }
  /**
   * 更新群组的机器人ID
   * @param groupId 群组ID
   * @param oldBotId 旧的机器人ID
   * @param newBotId 新的机器人ID
   */
  async updateGroupBotId(groupId, oldBotId, newBotId) {
    await this.getOrCreateBot(newBotId);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.runQuery(
      "UPDATE Groups SET botId = ?, updatedAt = ? WHERE id = ? AND botId = ?",
      [newBotId, now, groupId, oldBotId]
    );
  }
  /**
   * 获取群组订阅的所有抖音用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    const subscriptions = await this.allQuery(
      `SELECT 
        gus.groupId, gus.sec_uid, gus.createdAt, gus.updatedAt,
        du.short_id, du.remark, du.living, du.filterMode,
        du.createdAt as du_createdAt, du.updatedAt as du_updatedAt
      FROM GroupUserSubscriptions gus
      LEFT JOIN DouyinUsers du ON gus.sec_uid = du.sec_uid
      WHERE gus.groupId = ?`,
      [groupId]
    );
    return subscriptions.map((sub) => ({
      groupId: sub.groupId,
      sec_uid: sub.sec_uid,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
      douyinUser: {
        sec_uid: sub.sec_uid,
        short_id: sub.short_id,
        remark: sub.remark,
        living: !!sub.living,
        filterMode: sub.filterMode,
        createdAt: sub.du_createdAt,
        updatedAt: sub.du_updatedAt
      }
    }));
  }
  /**
   * 获取抖音用户的所有订阅群组
   * @param sec_uid 抖音用户sec_uid
   */
  async getUserSubscribedGroups(sec_uid) {
    return await this.allQuery(
      `SELECT g.* FROM Groups g
      INNER JOIN GroupUserSubscriptions gus ON g.id = gus.groupId
      WHERE gus.sec_uid = ?`,
      [sec_uid]
    );
  }
  /**
   * 检查群组是否已订阅抖音用户
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isSubscribed(sec_uid, groupId) {
    const result = await this.getQuery(
      "SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE sec_uid = ? AND groupId = ?",
      [sec_uid, groupId]
    );
    return (result?.count || 0) > 0;
  }
  /**
   * 获取抖音用户信息
   * @param sec_uid 抖音用户sec_uid
   * @returns 返回用户信息，如果不存在则返回null
   */
  async getDouyinUser(sec_uid) {
    const user = await this.getQuery("SELECT * FROM DouyinUsers WHERE sec_uid = ?", [sec_uid]);
    if (user) {
      user.living = !!user.living;
    }
    return user || null;
  }
  /**
   * 更新用户直播状态
   * @param sec_uid 抖音用户sec_uid
   * @param living 是否正在直播
   */
  async updateLiveStatus(sec_uid, living) {
    const user = await this.getDouyinUser(sec_uid);
    if (!user) return false;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const result = await this.runQuery(
      "UPDATE DouyinUsers SET living = ?, updatedAt = ? WHERE sec_uid = ?",
      [living ? 1 : 0, now, sec_uid]
    );
    return result.changes > 0;
  }
  /**
   * 获取用户直播状态
   * @param sec_uid 抖音用户sec_uid
   */
  async getLiveStatus(sec_uid) {
    const user = await this.getDouyinUser(sec_uid);
    return { living: user?.living || false };
  }
  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions(configItems) {
    const configSubscriptions = /* @__PURE__ */ new Map();
    for (const item of configItems) {
      const sec_uid = item.sec_uid;
      const short_id = item.short_id ?? "";
      const remark = item.remark ?? "";
      await this.getOrCreateDouyinUser(sec_uid, short_id, remark);
      for (const groupWithBot of item.group_id) {
        const [groupId, botId] = groupWithBot.split(":");
        if (!groupId || !botId) continue;
        await this.getOrCreateGroup(groupId, botId);
        if (!configSubscriptions.has(groupId)) {
          configSubscriptions.set(groupId, /* @__PURE__ */ new Set());
        }
        configSubscriptions.get(groupId)?.add(sec_uid);
        const isSubscribed = await this.isSubscribed(sec_uid, groupId);
        if (!isSubscribed) {
          await this.subscribeDouyinUser(groupId, botId, sec_uid, short_id, remark);
        }
      }
    }
    const allGroups = await this.allQuery("SELECT * FROM Groups");
    for (const group of allGroups) {
      const groupId = group.id;
      const configUsers = configSubscriptions.get(groupId) ?? /* @__PURE__ */ new Set();
      const dbSubscriptions = await this.getGroupSubscriptions(groupId);
      for (const subscription of dbSubscriptions) {
        const sec_uid = subscription.sec_uid;
        if (!configUsers.has(sec_uid)) {
          await this.unsubscribeDouyinUser(groupId, sec_uid);
          logger.mark(`已删除群组 ${groupId} 对抖音用户 ${sec_uid} 的订阅`);
        }
      }
    }
    const allUsers = await this.allQuery("SELECT * FROM DouyinUsers");
    for (const user of allUsers) {
      const sec_uid = user.sec_uid;
      const subscribedGroups = await this.getUserSubscribedGroups(sec_uid);
      if (subscribedGroups.length === 0) {
        await this.runQuery("DELETE FROM FilterWords WHERE sec_uid = ?", [sec_uid]);
        await this.runQuery("DELETE FROM FilterTags WHERE sec_uid = ?", [sec_uid]);
        await this.runQuery("DELETE FROM DouyinUsers WHERE sec_uid = ?", [sec_uid]);
        logger.mark(`已删除抖音用户 ${sec_uid} 的记录及相关过滤设置（不再被任何群组订阅）`);
      }
    }
  }
  /**
   * 通过ID获取群组信息
   * @param groupId 群组ID
   */
  async getGroupById(groupId) {
    return await this.getQuery("SELECT * FROM Groups WHERE id = ?", [groupId]) || null;
  }
  /**
   * 更新用户的过滤模式
   * @param sec_uid 抖音用户sec_uid
   * @param filterMode 过滤模式
   */
  async updateFilterMode(sec_uid, filterMode) {
    const user = await this.getOrCreateDouyinUser(sec_uid);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await this.runQuery(
      "UPDATE DouyinUsers SET filterMode = ?, updatedAt = ? WHERE sec_uid = ?",
      [filterMode, now, sec_uid]
    );
    return { ...user, filterMode, updatedAt: now };
  }
  /**
   * 添加过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async addFilterWord(sec_uid, word) {
    await this.getOrCreateDouyinUser(sec_uid);
    let filterWord = await this.getQuery(
      "SELECT * FROM FilterWords WHERE sec_uid = ? AND word = ?",
      [sec_uid, word]
    );
    if (!filterWord) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const result = await this.runQuery(
        "INSERT INTO FilterWords (sec_uid, word, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [sec_uid, word, now, now]
      );
      filterWord = {
        id: result.lastID,
        sec_uid,
        word,
        createdAt: now,
        updatedAt: now
      };
    }
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async removeFilterWord(sec_uid, word) {
    const result = await this.runQuery(
      "DELETE FROM FilterWords WHERE sec_uid = ? AND word = ?",
      [sec_uid, word]
    );
    return result.changes > 0;
  }
  /**
   * 添加过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async addFilterTag(sec_uid, tag) {
    await this.getOrCreateDouyinUser(sec_uid);
    let filterTag = await this.getQuery(
      "SELECT * FROM FilterTags WHERE sec_uid = ? AND tag = ?",
      [sec_uid, tag]
    );
    if (!filterTag) {
      const now = (/* @__PURE__ */ new Date()).toISOString();
      const result = await this.runQuery(
        "INSERT INTO FilterTags (sec_uid, tag, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
        [sec_uid, tag, now, now]
      );
      filterTag = {
        id: result.lastID,
        sec_uid,
        tag,
        createdAt: now,
        updatedAt: now
      };
    }
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async removeFilterTag(sec_uid, tag) {
    const result = await this.runQuery(
      "DELETE FROM FilterTags WHERE sec_uid = ? AND tag = ?",
      [sec_uid, tag]
    );
    return result.changes > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterWords(sec_uid) {
    const filterWords = await this.allQuery("SELECT * FROM FilterWords WHERE sec_uid = ?", [sec_uid]);
    return filterWords.map((word) => word.word);
  }
  /**
   * 获取用户的所有过滤标签
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterTags(sec_uid) {
    const filterTags = await this.allQuery("SELECT * FROM FilterTags WHERE sec_uid = ?", [sec_uid]);
    return filterTags.map((tag) => tag.tag);
  }
  /**
   * 获取用户的过滤配置
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterConfig(sec_uid) {
    const user = await this.getOrCreateDouyinUser(sec_uid);
    const filterWords = await this.getFilterWords(sec_uid);
    const filterTags = await this.getFilterTags(sec_uid);
    return {
      filterMode: user.filterMode,
      filterWords,
      filterTags
    };
  }
  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param tags 标签列表
   */
  async shouldFilter(PushItem, tags = []) {
    const sec_uid = PushItem.sec_uid;
    if (!sec_uid) {
      logger.warn(`推送项缺少 sec_uid 参数: ${JSON.stringify(PushItem)}`);
      return false;
    }
    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(sec_uid);
    logger.debug(`
      获取用户${PushItem.remark}（${PushItem.sec_uid}）的过滤配置：
      过滤模式：${filterMode}
      过滤词：${filterWords}
      过滤标签：${filterTags}
      `);
    const desc = PushItem.Detail_Data.desc ?? "";
    const hasFilterWord = filterWords.some((word) => desc.includes(word));
    const hasFilterTag = filterTags.some(
      (filterTag) => tags.some((tag) => tag === filterTag)
    );
    logger.debug(`
      作者：${PushItem.remark}
      检查内容：${desc}
      命中词：[${filterWords.join("], [")}]
      命中标签：[${filterTags.join("], [")}]
      过滤模式：${filterMode}
      是否过滤：${hasFilterWord || hasFilterTag ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
      作品地址：${logger.green(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}
      `);
    if (filterMode === "blacklist") {
      if (hasFilterWord || hasFilterTag) {
        logger.warn(`
          作品内容命中黑名单规则，已过滤该作品不再推送
          作品地址：${logger.yellow(PushItem.Detail_Data.share_url)}
          命中的黑名单词：[${filterWords.join("], [")}]
          命中的黑名单标签：[${filterTags.join("], [")}]
          `);
        return true;
      }
      return false;
    } else {
      if (filterWords.length === 0 && filterTags.length === 0) {
        return false;
      }
      if (hasFilterWord || hasFilterTag) {
        return false;
      }
      logger.warn(`
        作品内容未命中白名单规则，已过滤该作品不再推送
        作品地址：${logger.yellow(PushItem.Detail_Data.share_url)}
        命中的黑名单词：[${filterWords.join("], [")}]
        命中的黑名单标签：[${filterTags.join("], [")}]
        `);
      return true;
    }
  }
  /**
   * 清理旧的作品缓存记录
   * @param days 保留最近几天的记录
   * @returns 删除的记录数量
   */
  async cleanOldAwemeCache(days = 7) {
    const cutoffDate = /* @__PURE__ */ new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffDateStr = cutoffDate.toISOString();
    const result = await this.runQuery(
      "DELETE FROM AwemeCaches WHERE createdAt < ?",
      [cutoffDateStr]
    );
    return result.changes ?? 0;
  }
  /** 为了向后兼容，保留groupRepository和awemeCacheRepository属性 */
  get groupRepository() {
    return {
      find: async (options) => {
        if (options?.where?.botId) {
          return await this.getBotGroups(options.where.botId);
        }
        return await this.allQuery("SELECT * FROM Groups");
      }
    };
  }
  get awemeCacheRepository() {
    return {
      find: async (options = {}) => {
        const { where = {}, order, take, relations } = options;
        let sql = "SELECT * FROM AwemeCaches";
        const params = [];
        const conditions = [];
        if (where.groupId) {
          conditions.push("groupId = ?");
          params.push(where.groupId);
        }
        if (where.sec_uid) {
          conditions.push("sec_uid = ?");
          params.push(where.sec_uid);
        }
        if (where.aweme_id) {
          conditions.push("aweme_id = ?");
          params.push(where.aweme_id);
        }
        if (conditions.length > 0) {
          sql += " WHERE " + conditions.join(" AND ");
        }
        if (order) {
          const orderClauses = [];
          const allowedFields = ["id", "aweme_id", "sec_uid", "groupId", "createdAt", "updatedAt"];
          const allowedDirections = ["ASC", "DESC"];
          for (const [field, direction] of Object.entries(order)) {
            if (allowedFields.includes(field) && allowedDirections.includes(direction)) {
              orderClauses.push(`${field} ${direction}`);
            }
          }
          if (orderClauses.length > 0) {
            sql += " ORDER BY " + orderClauses.join(", ");
          }
        }
        if (take) {
          sql += " LIMIT ?";
          params.push(take.toString());
        }
        const caches = await this.allQuery(sql, params);
        if (relations && relations.includes("douyinUser")) {
          const result = [];
          for (const cache of caches) {
            const douyinUser = await this.getDouyinUser(cache.sec_uid);
            result.push({
              ...cache,
              douyinUser,
              createdAt: new Date(cache.createdAt),
              // 转换为Date对象
              updatedAt: new Date(cache.updatedAt)
            });
          }
          return result;
        }
        return caches.map((cache) => ({
          ...cache,
          createdAt: new Date(cache.createdAt),
          updatedAt: new Date(cache.updatedAt)
        }));
      },
      delete: async (conditions) => {
        const { groupId, sec_uid, aweme_id } = conditions;
        if (groupId && sec_uid) {
          const result = await this.runQuery(
            "DELETE FROM AwemeCaches WHERE groupId = ? AND sec_uid = ?",
            [groupId, sec_uid]
          );
          return { affected: result.changes };
        }
        if (groupId) {
          const result = await this.runQuery(
            "DELETE FROM AwemeCaches WHERE groupId = ?",
            [groupId]
          );
          return { affected: result.changes };
        }
        if (sec_uid) {
          const result = await this.runQuery(
            "DELETE FROM AwemeCaches WHERE sec_uid = ?",
            [sec_uid]
          );
          return { affected: result.changes };
        }
        if (aweme_id) {
          const result = await this.runQuery(
            "DELETE FROM AwemeCaches WHERE aweme_id = ?",
            [aweme_id]
          );
          return { affected: result.changes };
        }
        return { affected: 0 };
      }
    };
  }
}
let douyinDB = null;
let douyinInitializing = false;
let bilibiliDB = null;
let bilibiliInitializing = false;
const getDouyinDB = async () => {
  if (douyinDB) {
    return douyinDB;
  }
  if (douyinInitializing) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return douyinDB;
  }
  douyinInitializing = true;
  try {
    douyinDB = await new DouyinDBBase().init();
    return douyinDB;
  } finally {
    douyinInitializing = false;
  }
};
const getBilibiliDB = async () => {
  if (bilibiliDB) {
    return bilibiliDB;
  }
  if (bilibiliInitializing) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return bilibiliDB;
  }
  bilibiliInitializing = true;
  try {
    bilibiliDB = await new BilibiliDBBase().init();
    return bilibiliDB;
  } finally {
    bilibiliInitializing = false;
  }
};
const initAllDatabases = async () => {
  const [douyin, bilibili] = await Promise.all([
    getDouyinDB(),
    getBilibiliDB()
  ]);
  return { douyinDB: douyin, bilibiliDB: bilibili };
};
const douyinDBInstance = await getDouyinDB();
const bilibiliDBInstance = await getBilibiliDB();
const cleanOldDynamicCache = async (platform, days = 7) => {
  if (platform === "douyin") {
    const db = await getDouyinDB();
    return await db.cleanOldAwemeCache(days);
  } else {
    const db = await getBilibiliDB();
    return await db.cleanOldDynamicCache(days);
  }
};
export {
  BilibiliDBBase,
  DouyinDBBase,
  bilibiliDBInstance as bilibiliDB,
  bilibiliDBInstance,
  cleanOldDynamicCache,
  douyinDBInstance as douyinDB,
  douyinDBInstance,
  getBilibiliDB,
  getDouyinDB,
  initAllDatabases
};
