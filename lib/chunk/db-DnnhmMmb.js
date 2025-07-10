import { DataSource, In, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Entity, Column, ManyToOne, ManyToMany, JoinTable, PrimaryGeneratedColumn, LessThan } from "typeorm";
import "./vendor-DeXixW7s.js";
import { existsSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { logger } from "node-karin";
import { karinPathBase } from "node-karin/root";
import { Root } from "../root.js";
import { C as Config, D as DynamicType } from "./main-0M_zPm_x.js";
import "node-karin/axios";
import "stream/promises";
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
let Bot$1 = class Bot {
  id;
  createdAt;
  updatedAt;
  groups;
};
__decorateClass$1([
  PrimaryColumn({ type: "varchar", comment: "机器人ID" })
], Bot$1.prototype, "id", 2);
__decorateClass$1([
  CreateDateColumn()
], Bot$1.prototype, "createdAt", 2);
__decorateClass$1([
  UpdateDateColumn()
], Bot$1.prototype, "updatedAt", 2);
__decorateClass$1([
  OneToMany(() => Group$1, (group) => group.bot)
], Bot$1.prototype, "groups", 2);
Bot$1 = __decorateClass$1([
  Entity("Bots")
], Bot$1);
let Group$1 = class Group {
  id;
  botId;
  createdAt;
  updatedAt;
  bot;
  bilibiliUsers;
  dynamicCaches;
};
__decorateClass$1([
  PrimaryColumn({ type: "varchar", comment: "群组ID" })
], Group$1.prototype, "id", 2);
__decorateClass$1([
  Column({ type: "varchar", comment: "所属机器人ID" })
], Group$1.prototype, "botId", 2);
__decorateClass$1([
  CreateDateColumn()
], Group$1.prototype, "createdAt", 2);
__decorateClass$1([
  UpdateDateColumn()
], Group$1.prototype, "updatedAt", 2);
__decorateClass$1([
  ManyToOne(() => Bot$1, (bot) => bot.groups)
], Group$1.prototype, "bot", 2);
__decorateClass$1([
  ManyToMany(() => BilibiliUser, (user) => user.groups),
  JoinTable({
    name: "GroupUserSubscriptions",
    joinColumn: { name: "groupId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "host_mid", referencedColumnName: "host_mid" }
  })
], Group$1.prototype, "bilibiliUsers", 2);
__decorateClass$1([
  OneToMany(() => DynamicCache, (cache) => cache.group)
], Group$1.prototype, "dynamicCaches", 2);
Group$1 = __decorateClass$1([
  Entity("Groups")
], Group$1);
let BilibiliUser = class {
  host_mid;
  remark;
  filterMode;
  createdAt;
  updatedAt;
  groups;
  dynamicCaches;
  filterWords;
  filterTags;
};
__decorateClass$1([
  PrimaryColumn({ type: "integer", comment: "B站用户UID" })
], BilibiliUser.prototype, "host_mid", 2);
__decorateClass$1([
  Column({ type: "varchar", nullable: true, comment: "B站用户昵称" })
], BilibiliUser.prototype, "remark", 2);
__decorateClass$1([
  Column({
    type: "varchar",
    default: "blacklist",
    comment: "过滤模式：黑名单或白名单"
  })
], BilibiliUser.prototype, "filterMode", 2);
__decorateClass$1([
  CreateDateColumn()
], BilibiliUser.prototype, "createdAt", 2);
__decorateClass$1([
  UpdateDateColumn()
], BilibiliUser.prototype, "updatedAt", 2);
__decorateClass$1([
  ManyToMany(() => Group$1, (group) => group.bilibiliUsers)
], BilibiliUser.prototype, "groups", 2);
__decorateClass$1([
  OneToMany(() => DynamicCache, (cache) => cache.bilibiliUser)
], BilibiliUser.prototype, "dynamicCaches", 2);
__decorateClass$1([
  OneToMany(() => FilterWord$1, (word) => word.bilibiliUser)
], BilibiliUser.prototype, "filterWords", 2);
__decorateClass$1([
  OneToMany(() => FilterTag$1, (tag) => tag.bilibiliUser)
], BilibiliUser.prototype, "filterTags", 2);
BilibiliUser = __decorateClass$1([
  Entity("BilibiliUsers")
], BilibiliUser);
let GroupUserSubscription$1 = class GroupUserSubscription {
  groupId;
  host_mid;
  createdAt;
  updatedAt;
};
__decorateClass$1([
  PrimaryColumn({ type: "varchar", comment: "群组ID" })
], GroupUserSubscription$1.prototype, "groupId", 2);
__decorateClass$1([
  PrimaryColumn({ type: "integer", comment: "B站用户UID" })
], GroupUserSubscription$1.prototype, "host_mid", 2);
__decorateClass$1([
  CreateDateColumn()
], GroupUserSubscription$1.prototype, "createdAt", 2);
__decorateClass$1([
  UpdateDateColumn()
], GroupUserSubscription$1.prototype, "updatedAt", 2);
GroupUserSubscription$1 = __decorateClass$1([
  Entity("GroupUserSubscriptions")
], GroupUserSubscription$1);
let DynamicCache = class {
  id;
  dynamic_id;
  host_mid;
  groupId;
  dynamic_type;
  createdAt;
  updatedAt;
  bilibiliUser;
  group;
};
__decorateClass$1([
  PrimaryGeneratedColumn({ comment: "缓存ID" })
], DynamicCache.prototype, "id", 2);
__decorateClass$1([
  Column({ type: "varchar", comment: "动态ID" })
], DynamicCache.prototype, "dynamic_id", 2);
__decorateClass$1([
  Column({ type: "integer", comment: "B站用户UID" })
], DynamicCache.prototype, "host_mid", 2);
__decorateClass$1([
  Column({ type: "varchar", comment: "群组ID" })
], DynamicCache.prototype, "groupId", 2);
__decorateClass$1([
  Column({ type: "varchar", nullable: true, comment: "动态类型" })
], DynamicCache.prototype, "dynamic_type", 2);
__decorateClass$1([
  CreateDateColumn()
], DynamicCache.prototype, "createdAt", 2);
__decorateClass$1([
  UpdateDateColumn()
], DynamicCache.prototype, "updatedAt", 2);
__decorateClass$1([
  ManyToOne(() => BilibiliUser, (user) => user.dynamicCaches)
], DynamicCache.prototype, "bilibiliUser", 2);
__decorateClass$1([
  ManyToOne(() => Group$1, (group) => group.dynamicCaches)
], DynamicCache.prototype, "group", 2);
DynamicCache = __decorateClass$1([
  Entity("DynamicCaches")
], DynamicCache);
let FilterWord$1 = class FilterWord {
  id;
  host_mid;
  word;
  createdAt;
  updatedAt;
  bilibiliUser;
};
__decorateClass$1([
  PrimaryGeneratedColumn({ comment: "过滤词ID" })
], FilterWord$1.prototype, "id", 2);
__decorateClass$1([
  Column({ type: "integer", comment: "B站用户UID" })
], FilterWord$1.prototype, "host_mid", 2);
__decorateClass$1([
  Column({ type: "varchar", comment: "过滤词" })
], FilterWord$1.prototype, "word", 2);
__decorateClass$1([
  CreateDateColumn()
], FilterWord$1.prototype, "createdAt", 2);
__decorateClass$1([
  UpdateDateColumn()
], FilterWord$1.prototype, "updatedAt", 2);
__decorateClass$1([
  ManyToOne(() => BilibiliUser, (user) => user.filterWords)
], FilterWord$1.prototype, "bilibiliUser", 2);
FilterWord$1 = __decorateClass$1([
  Entity("FilterWords")
], FilterWord$1);
let FilterTag$1 = class FilterTag {
  id;
  host_mid;
  tag;
  createdAt;
  updatedAt;
  bilibiliUser;
};
__decorateClass$1([
  PrimaryGeneratedColumn({ comment: "过滤标签ID" })
], FilterTag$1.prototype, "id", 2);
__decorateClass$1([
  Column({ type: "integer", comment: "B站用户UID" })
], FilterTag$1.prototype, "host_mid", 2);
__decorateClass$1([
  Column({ type: "varchar", comment: "过滤标签" })
], FilterTag$1.prototype, "tag", 2);
__decorateClass$1([
  CreateDateColumn()
], FilterTag$1.prototype, "createdAt", 2);
__decorateClass$1([
  UpdateDateColumn()
], FilterTag$1.prototype, "updatedAt", 2);
__decorateClass$1([
  ManyToOne(() => BilibiliUser, (user) => user.filterTags)
], FilterTag$1.prototype, "bilibiliUser", 2);
FilterTag$1 = __decorateClass$1([
  Entity("FilterTags")
], FilterTag$1);
(() => {
  const dataDir = join(`${karinPathBase}/${Root.pluginName}/data`);
  const oldDbPath = join(dataDir, "bilibili.db");
  const backupDbPath = join(dataDir, "bilibili_sequelize_backup.db");
  if (existsSync(backupDbPath)) {
    logger.info("[Bilibili DB] 检测到已存在备份文件，跳过备份操作");
    return;
  }
  if (existsSync(oldDbPath)) {
    try {
      copyFileSync(oldDbPath, backupDbPath);
      logger.info(`[Bilibili DB] 已备份旧版数据库文件到: ${backupDbPath}`);
    } catch (error) {
      logger.warn(`[Bilibili DB] 备份旧版数据库文件失败: ${error}`);
    }
  }
})();
const AppDataSource$1 = new DataSource({
  type: "sqlite",
  database: join(`${karinPathBase}/${Root.pluginName}/data`, "bilibili.db"),
  synchronize: true,
  logging: false,
  entities: [Bot$1, Group$1, BilibiliUser, GroupUserSubscription$1, DynamicCache, FilterWord$1, FilterTag$1],
  migrations: [],
  subscribers: []
});
class BilibiliDBBase {
  botRepository;
  groupRepository;
  bilibiliUserRepository;
  groupUserSubscriptionRepository;
  dynamicCacheRepository;
  filterWordRepository;
  filterTagRepository;
  /**
   * 初始化数据库
   */
  async init() {
    try {
      logger.debug(logger.green("--------------------------[BilibiliDB] 开始初始化数据库--------------------------"));
      logger.debug("[BilibiliDB] 正在连接数据库...");
      if (!AppDataSource$1.isInitialized) {
        await AppDataSource$1.initialize();
        logger.mark("[BilibiliDB] 数据库连接成功");
      } else {
        logger.mark("[BilibiliDB] 数据库连接已存在，跳过初始化");
      }
      this.botRepository = AppDataSource$1.getRepository(Bot$1);
      this.groupRepository = AppDataSource$1.getRepository(Group$1);
      this.bilibiliUserRepository = AppDataSource$1.getRepository(BilibiliUser);
      this.groupUserSubscriptionRepository = AppDataSource$1.getRepository(GroupUserSubscription$1);
      this.dynamicCacheRepository = AppDataSource$1.getRepository(DynamicCache);
      this.filterWordRepository = AppDataSource$1.getRepository(FilterWord$1);
      this.filterTagRepository = AppDataSource$1.getRepository(FilterTag$1);
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
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot(botId) {
    let bot = await this.botRepository.findOne({ where: { id: botId } });
    if (!bot) {
      bot = this.botRepository.create({ id: botId });
      await this.botRepository.save(bot);
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
    let group = await this.groupRepository.findOne({ where: { id: groupId, botId } });
    if (!group) {
      group = this.groupRepository.create({ id: groupId, botId });
      await this.groupRepository.save(group);
    }
    return group;
  }
  /**
   * 获取或创建B站用户记录
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async getOrCreateBilibiliUser(host_mid, remark = "") {
    let user = await this.bilibiliUserRepository.findOne({ where: { host_mid } });
    if (!user) {
      user = this.bilibiliUserRepository.create({ host_mid, remark });
      await this.bilibiliUserRepository.save(user);
    } else if (remark && user.remark !== remark) {
      user.remark = remark;
      await this.bilibiliUserRepository.save(user);
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
    let subscription = await this.groupUserSubscriptionRepository.findOne({
      where: { groupId, host_mid }
    });
    if (!subscription) {
      subscription = this.groupUserSubscriptionRepository.create({ groupId, host_mid });
      await this.groupUserSubscriptionRepository.save(subscription);
    }
    return subscription;
  }
  /**
   * 取消订阅B站用户
   * @param groupId 群组ID
   * @param host_mid B站用户UID
   */
  async unsubscribeBilibiliUser(groupId, host_mid) {
    const result = await this.groupUserSubscriptionRepository.delete({ groupId, host_mid });
    await this.dynamicCacheRepository.delete({ groupId, host_mid });
    return result.affected > 0;
  }
  /**
   * 添加动态缓存
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   * @param dynamic_type 动态类型
   */
  async addDynamicCache(dynamic_id, host_mid, groupId, dynamic_type) {
    let cache = await this.dynamicCacheRepository.findOne({
      where: { dynamic_id, host_mid, groupId }
    });
    if (!cache) {
      cache = this.dynamicCacheRepository.create({ dynamic_id, host_mid, groupId, dynamic_type });
      await this.dynamicCacheRepository.save(cache);
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
    const count = await this.dynamicCacheRepository.count({
      where: { dynamic_id, host_mid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await this.groupRepository.find({ where: { botId } });
  }
  /**
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    return await this.groupUserSubscriptionRepository.find({ where: { groupId } });
  }
  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups(host_mid) {
    const subscriptions = await this.groupUserSubscriptionRepository.find({
      where: { host_mid }
    });
    if (subscriptions.length === 0) {
      return [];
    }
    const groupIds = subscriptions.map((sub) => sub.groupId);
    const groups = await this.groupRepository.find({
      where: { id: In(groupIds) }
    });
    return groups;
  }
  /**
   * 获取群组的动态缓存
   * @param groupId 群组ID
   * @param host_mid 可选的B站用户UID过滤
   */
  async getGroupDynamicCache(groupId, host_mid) {
    const where = { groupId };
    if (host_mid) where.host_mid = host_mid;
    return await this.dynamicCacheRepository.find({
      where,
      order: { createdAt: "DESC" }
    });
  }
  /**
   * 检查群组是否已订阅B站用户
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isSubscribed(host_mid, groupId) {
    const count = await this.groupUserSubscriptionRepository.count({
      where: { host_mid, groupId }
    });
    return count > 0;
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
    const allGroups = await this.groupRepository.find();
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
    const allUsers = await this.bilibiliUserRepository.find();
    for (const user of allUsers) {
      const host_mid = user.host_mid;
      const subscribedGroups = await this.getUserSubscribedGroups(host_mid);
      if (subscribedGroups.length === 0) {
        await this.filterWordRepository.delete({ host_mid });
        await this.filterTagRepository.delete({ host_mid });
        await this.bilibiliUserRepository.delete({ host_mid });
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
    user.filterMode = filterMode;
    await this.bilibiliUserRepository.save(user);
    return user;
  }
  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord(host_mid, word) {
    await this.getOrCreateBilibiliUser(host_mid);
    let filterWord = await this.filterWordRepository.findOne({ where: { host_mid, word } });
    if (!filterWord) {
      filterWord = this.filterWordRepository.create({ host_mid, word });
      await this.filterWordRepository.save(filterWord);
    }
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async removeFilterWord(host_mid, word) {
    const result = await this.filterWordRepository.delete({ host_mid, word });
    return result.affected > 0;
  }
  /**
   * 添加过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async addFilterTag(host_mid, tag) {
    await this.getOrCreateBilibiliUser(host_mid);
    let filterTag = await this.filterTagRepository.findOne({ where: { host_mid, tag } });
    if (!filterTag) {
      filterTag = this.filterTagRepository.create({ host_mid, tag });
      await this.filterTagRepository.save(filterTag);
    }
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async removeFilterTag(host_mid, tag) {
    const result = await this.filterTagRepository.delete({ host_mid, tag });
    return result.affected > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param host_mid B站用户UID
   */
  async getFilterWords(host_mid) {
    const filterWords = await this.filterWordRepository.find({ where: { host_mid } });
    return filterWords.map((word) => word.word);
  }
  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags(host_mid) {
    const filterTags = await this.filterTagRepository.find({ where: { host_mid } });
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
  extractTextAndTags(dynamicData) {
    let text = "";
    const tags = [];
    if (!dynamicData || !dynamicData.modules || !dynamicData.modules.module_dynamic) {
      return { text, tags };
    }
    const moduleDynamic = dynamicData.modules.module_dynamic;
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
        text += dynamicData.orig.modules.module_dynamic.desc.text + " ";
        for (const node of dynamicData.orig.modules.module_dynamic.desc.rich_text_nodes) {
          tags.push(node.orig_text);
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
    if (PushItem.Dynamic_Data.type === DynamicType.LIVE_RCMD) {
      return false;
    }
    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(PushItem.host_mid);
    const { text: mainText, tags: mainTags } = this.extractTextAndTags(PushItem.Dynamic_Data);
    let allTags = [...mainTags, ...extraTags];
    let allText = mainText;
    if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && "orig" in PushItem.Dynamic_Data) {
      const { text: origText, tags: origTags } = this.extractTextAndTags(PushItem.Dynamic_Data.orig);
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
    命中词：${filterWords.join(", ")}
    命中标签：${filterTags.join(", ")}
    过滤模式：${filterMode}
    是否过滤：${hasFilterWord || hasFilterTag ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
    动态地址：${logger.green(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
    动态类型：${PushItem.dynamic_type}
    `);
    if (filterMode === "blacklist") {
      if (hasFilterWord) {
        return true;
      }
      if (hasFilterTag) {
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
      return true;
    }
  }
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
let Bot2 = class {
  id;
  createdAt;
  updatedAt;
  groups;
};
__decorateClass([
  PrimaryColumn({ type: "varchar", comment: "机器人ID" })
], Bot2.prototype, "id", 2);
__decorateClass([
  CreateDateColumn()
], Bot2.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn()
], Bot2.prototype, "updatedAt", 2);
__decorateClass([
  OneToMany(() => Group2, (group) => group.bot)
], Bot2.prototype, "groups", 2);
Bot2 = __decorateClass([
  Entity("Bots")
], Bot2);
let Group2 = class {
  id;
  botId;
  createdAt;
  updatedAt;
  bot;
  subscriptions;
  awemeCaches;
  subscribedUsers;
};
__decorateClass([
  PrimaryColumn({ type: "varchar", comment: "群组ID" })
], Group2.prototype, "id", 2);
__decorateClass([
  Column({ type: "varchar", comment: "所属机器人ID" })
], Group2.prototype, "botId", 2);
__decorateClass([
  CreateDateColumn()
], Group2.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn()
], Group2.prototype, "updatedAt", 2);
__decorateClass([
  ManyToOne(() => Bot2, (bot) => bot.groups)
], Group2.prototype, "bot", 2);
__decorateClass([
  OneToMany(() => GroupUserSubscription2, (subscription) => subscription.group)
], Group2.prototype, "subscriptions", 2);
__decorateClass([
  OneToMany(() => AwemeCache, (cache) => cache.group)
], Group2.prototype, "awemeCaches", 2);
__decorateClass([
  ManyToMany(() => DouyinUser, (user) => user.subscribedGroups),
  JoinTable({
    name: "GroupUserSubscriptions",
    joinColumn: { name: "groupId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "sec_uid", referencedColumnName: "sec_uid" }
  })
], Group2.prototype, "subscribedUsers", 2);
Group2 = __decorateClass([
  Entity("Groups")
], Group2);
let DouyinUser = class {
  sec_uid;
  short_id;
  remark;
  living;
  filterMode;
  createdAt;
  updatedAt;
  subscriptions;
  awemeCaches;
  filterWords;
  filterTags;
  subscribedGroups;
};
__decorateClass([
  PrimaryColumn({ type: "varchar", comment: "抖音用户sec_uid" })
], DouyinUser.prototype, "sec_uid", 2);
__decorateClass([
  Column({ type: "varchar", nullable: true, comment: "抖音号" })
], DouyinUser.prototype, "short_id", 2);
__decorateClass([
  Column({ type: "varchar", nullable: true, comment: "抖音用户昵称" })
], DouyinUser.prototype, "remark", 2);
__decorateClass([
  Column({ type: "boolean", default: false, comment: "是否正在直播" })
], DouyinUser.prototype, "living", 2);
__decorateClass([
  Column({
    type: "varchar",
    default: "blacklist",
    comment: "过滤模式：黑名单或白名单"
  })
], DouyinUser.prototype, "filterMode", 2);
__decorateClass([
  CreateDateColumn()
], DouyinUser.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn()
], DouyinUser.prototype, "updatedAt", 2);
__decorateClass([
  OneToMany(() => GroupUserSubscription2, (subscription) => subscription.douyinUser)
], DouyinUser.prototype, "subscriptions", 2);
__decorateClass([
  OneToMany(() => AwemeCache, (cache) => cache.douyinUser)
], DouyinUser.prototype, "awemeCaches", 2);
__decorateClass([
  OneToMany(() => FilterWord2, (filterWord) => filterWord.douyinUser)
], DouyinUser.prototype, "filterWords", 2);
__decorateClass([
  OneToMany(() => FilterTag2, (filterTag) => filterTag.douyinUser)
], DouyinUser.prototype, "filterTags", 2);
__decorateClass([
  ManyToMany(() => Group2, (group) => group.subscribedUsers)
], DouyinUser.prototype, "subscribedGroups", 2);
DouyinUser = __decorateClass([
  Entity("DouyinUsers")
], DouyinUser);
let GroupUserSubscription2 = class {
  groupId;
  sec_uid;
  createdAt;
  updatedAt;
  group;
  douyinUser;
};
__decorateClass([
  PrimaryColumn({ type: "varchar", comment: "群组ID" })
], GroupUserSubscription2.prototype, "groupId", 2);
__decorateClass([
  PrimaryColumn({ type: "varchar", comment: "抖音用户sec_uid" })
], GroupUserSubscription2.prototype, "sec_uid", 2);
__decorateClass([
  CreateDateColumn()
], GroupUserSubscription2.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn()
], GroupUserSubscription2.prototype, "updatedAt", 2);
__decorateClass([
  ManyToOne(() => Group2, (group) => group.subscriptions)
], GroupUserSubscription2.prototype, "group", 2);
__decorateClass([
  ManyToOne(() => DouyinUser, (user) => user.subscriptions)
], GroupUserSubscription2.prototype, "douyinUser", 2);
GroupUserSubscription2 = __decorateClass([
  Entity("GroupUserSubscriptions")
], GroupUserSubscription2);
let AwemeCache = class {
  id;
  aweme_id;
  sec_uid;
  groupId;
  createdAt;
  updatedAt;
  douyinUser;
  group;
};
__decorateClass([
  PrimaryGeneratedColumn({ comment: "缓存ID" })
], AwemeCache.prototype, "id", 2);
__decorateClass([
  Column({ type: "varchar", comment: "作品ID" })
], AwemeCache.prototype, "aweme_id", 2);
__decorateClass([
  Column({ type: "varchar", comment: "抖音用户sec_uid" })
], AwemeCache.prototype, "sec_uid", 2);
__decorateClass([
  Column({ type: "varchar", comment: "群组ID" })
], AwemeCache.prototype, "groupId", 2);
__decorateClass([
  CreateDateColumn()
], AwemeCache.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn()
], AwemeCache.prototype, "updatedAt", 2);
__decorateClass([
  ManyToOne(() => DouyinUser, (user) => user.awemeCaches)
], AwemeCache.prototype, "douyinUser", 2);
__decorateClass([
  ManyToOne(() => Group2, (group) => group.awemeCaches)
], AwemeCache.prototype, "group", 2);
AwemeCache = __decorateClass([
  Entity("AwemeCaches")
], AwemeCache);
let FilterWord2 = class {
  id;
  sec_uid;
  word;
  createdAt;
  updatedAt;
  douyinUser;
};
__decorateClass([
  PrimaryGeneratedColumn({ comment: "过滤词ID" })
], FilterWord2.prototype, "id", 2);
__decorateClass([
  Column({ type: "varchar", comment: "抖音用户sec_uid" })
], FilterWord2.prototype, "sec_uid", 2);
__decorateClass([
  Column({ type: "varchar", comment: "过滤词" })
], FilterWord2.prototype, "word", 2);
__decorateClass([
  CreateDateColumn()
], FilterWord2.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn()
], FilterWord2.prototype, "updatedAt", 2);
__decorateClass([
  ManyToOne(() => DouyinUser, (user) => user.filterWords)
], FilterWord2.prototype, "douyinUser", 2);
FilterWord2 = __decorateClass([
  Entity("FilterWords")
], FilterWord2);
let FilterTag2 = class {
  id;
  sec_uid;
  tag;
  createdAt;
  updatedAt;
  douyinUser;
};
__decorateClass([
  PrimaryGeneratedColumn({ comment: "过滤标签ID" })
], FilterTag2.prototype, "id", 2);
__decorateClass([
  Column({ type: "varchar", comment: "抖音用户sec_uid" })
], FilterTag2.prototype, "sec_uid", 2);
__decorateClass([
  Column({ type: "varchar", comment: "过滤标签" })
], FilterTag2.prototype, "tag", 2);
__decorateClass([
  CreateDateColumn()
], FilterTag2.prototype, "createdAt", 2);
__decorateClass([
  UpdateDateColumn()
], FilterTag2.prototype, "updatedAt", 2);
__decorateClass([
  ManyToOne(() => DouyinUser, (user) => user.filterTags)
], FilterTag2.prototype, "douyinUser", 2);
FilterTag2 = __decorateClass([
  Entity("FilterTags")
], FilterTag2);
(() => {
  const dataDir = join(`${karinPathBase}/${Root.pluginName}/data`);
  const oldDbPath = join(dataDir, "douyin.db");
  const backupDbPath = join(dataDir, "douyin_sequelize_backup.db");
  if (existsSync(backupDbPath)) {
    logger.info("[Douyin DB] 检测到已存在备份文件，跳过备份操作");
    return;
  }
  if (existsSync(oldDbPath)) {
    try {
      copyFileSync(oldDbPath, backupDbPath);
      logger.info(`[Douyin DB] 已备份旧版数据库文件到: ${backupDbPath}`);
    } catch (error) {
      logger.warn(`[Douyin DB] 备份旧版数据库文件失败: ${error}`);
    }
  }
})();
const AppDataSource = new DataSource({
  type: "sqlite",
  database: join(`${karinPathBase}/${Root.pluginName}/data`, "douyin.db"),
  synchronize: true,
  logging: false,
  entities: [Bot2, Group2, DouyinUser, GroupUserSubscription2, AwemeCache, FilterWord2, FilterTag2],
  extra: {
    // SQLite 连接池配置
    max: 5,
    min: 0,
    acquireTimeoutMillis: 3e4,
    idleTimeoutMillis: 1e4
  }
});
class DouyinDBBase {
  botRepository;
  groupRepository;
  douyinUserRepository;
  groupUserSubscriptionRepository;
  awemeCacheRepository;
  filterWordRepository;
  filterTagRepository;
  /**
   * 初始化数据库
   */
  async init() {
    try {
      logger.debug(logger.green("--------------------------[DouyinDB] 开始初始化数据库--------------------------"));
      logger.debug("[DouyinDB] 正在连接数据库...");
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        logger.mark("[DouyinDB] 数据库连接成功");
      } else {
        logger.mark("[DouyinDB] 数据库连接已存在，跳过初始化");
      }
      this.botRepository = AppDataSource.getRepository(Bot2);
      this.groupRepository = AppDataSource.getRepository(Group2);
      this.douyinUserRepository = AppDataSource.getRepository(DouyinUser);
      this.groupUserSubscriptionRepository = AppDataSource.getRepository(GroupUserSubscription2);
      this.awemeCacheRepository = AppDataSource.getRepository(AwemeCache);
      this.filterWordRepository = AppDataSource.getRepository(FilterWord2);
      this.filterTagRepository = AppDataSource.getRepository(FilterTag2);
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
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot(botId) {
    let bot = await this.botRepository.findOne({ where: { id: botId } });
    if (!bot) {
      bot = this.botRepository.create({ id: botId });
      await this.botRepository.save(bot);
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
    let group = await this.groupRepository.findOne({ where: { id: groupId, botId } });
    if (!group) {
      group = this.groupRepository.create({ id: groupId, botId });
      await this.groupRepository.save(group);
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
    let user = await this.douyinUserRepository.findOne({ where: { sec_uid } });
    if (!user) {
      user = this.douyinUserRepository.create({ sec_uid, short_id, remark });
      await this.douyinUserRepository.save(user);
    } else {
      let needUpdate = false;
      if (remark && user.remark !== remark) {
        user.remark = remark;
        needUpdate = true;
      }
      if (short_id && user.short_id !== short_id) {
        user.short_id = short_id;
        needUpdate = true;
      }
      if (needUpdate) {
        await this.douyinUserRepository.save(user);
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
    let subscription = await this.groupUserSubscriptionRepository.findOne({
      where: { groupId, sec_uid }
    });
    if (!subscription) {
      subscription = this.groupUserSubscriptionRepository.create({ groupId, sec_uid });
      await this.groupUserSubscriptionRepository.save(subscription);
    }
    return subscription;
  }
  /**
   * 取消订阅抖音用户
   * @param groupId 群组ID
   * @param sec_uid 抖音用户sec_uid
   */
  async unsubscribeDouyinUser(groupId, sec_uid) {
    const result = await this.groupUserSubscriptionRepository.delete({ groupId, sec_uid });
    await this.awemeCacheRepository.delete({ groupId, sec_uid });
    return result.affected > 0;
  }
  /**
   * 添加作品缓存
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async addAwemeCache(aweme_id, sec_uid, groupId) {
    let cache = await this.awemeCacheRepository.findOne({
      where: { aweme_id, sec_uid, groupId }
    });
    if (!cache) {
      cache = this.awemeCacheRepository.create({ aweme_id, sec_uid, groupId });
      await this.awemeCacheRepository.save(cache);
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
    const count = await this.awemeCacheRepository.count({
      where: { aweme_id, sec_uid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await this.groupRepository.find({ where: { botId } });
  }
  /**
   * 获取群组订阅的所有抖音用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    return await this.groupUserSubscriptionRepository.find({
      where: { groupId },
      relations: ["douyinUser"]
    });
  }
  /**
   * 获取抖音用户的所有订阅群组
   * @param sec_uid 抖音用户sec_uid
   */
  async getUserSubscribedGroups(sec_uid) {
    const subscriptions = await this.groupUserSubscriptionRepository.find({
      where: { sec_uid }
    });
    if (subscriptions.length === 0) {
      return [];
    }
    const groupIds = subscriptions.map((sub) => sub.groupId);
    const groups = await this.groupRepository.find({
      where: { id: In(groupIds) }
    });
    return groups;
  }
  /**
   * 检查群组是否已订阅抖音用户
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isSubscribed(sec_uid, groupId) {
    const count = await this.groupUserSubscriptionRepository.count({
      where: { sec_uid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取抖音用户信息
   * @param sec_uid 抖音用户sec_uid
   * @returns 返回用户信息，如果不存在则返回null
   */
  async getDouyinUser(sec_uid) {
    return await this.douyinUserRepository.findOne({ where: { sec_uid } });
  }
  /**
   * 更新用户直播状态
   * @param sec_uid 抖音用户sec_uid
   * @param living 是否正在直播
   */
  async updateLiveStatus(sec_uid, living) {
    const user = await this.douyinUserRepository.findOne({ where: { sec_uid } });
    if (!user) return false;
    user.living = living;
    await this.douyinUserRepository.save(user);
    return true;
  }
  /**
   * 获取用户直播状态
   * @param sec_uid 抖音用户sec_uid
   */
  async getLiveStatus(sec_uid) {
    const user = await this.douyinUserRepository.findOne({ where: { sec_uid } });
    if (!user) return { living: false };
    return { living: user.living };
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
    const allGroups = await this.groupRepository.find();
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
    const allUsers = await this.douyinUserRepository.find();
    for (const user of allUsers) {
      const sec_uid = user.sec_uid;
      const subscribedGroups = await this.getUserSubscribedGroups(sec_uid);
      if (subscribedGroups.length === 0) {
        await this.filterWordRepository.delete({ sec_uid });
        await this.filterTagRepository.delete({ sec_uid });
        await this.douyinUserRepository.delete({ sec_uid });
        logger.mark(`已删除抖音用户 ${sec_uid} 的记录及相关过滤设置（不再被任何群组订阅）`);
      }
    }
  }
  /**
   * 通过ID获取群组信息
   * @param groupId 群组ID
   */
  async getGroupById(groupId) {
    return await this.groupRepository.findOne({ where: { id: groupId } });
  }
  /**
   * 更新用户的过滤模式
   * @param sec_uid 抖音用户sec_uid
   * @param filterMode 过滤模式
   */
  async updateFilterMode(sec_uid, filterMode) {
    const user = await this.getOrCreateDouyinUser(sec_uid);
    user.filterMode = filterMode;
    await this.douyinUserRepository.save(user);
    return user;
  }
  /**
   * 添加过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async addFilterWord(sec_uid, word) {
    await this.getOrCreateDouyinUser(sec_uid);
    let filterWord = await this.filterWordRepository.findOne({
      where: { sec_uid, word }
    });
    if (!filterWord) {
      filterWord = this.filterWordRepository.create({ sec_uid, word });
      await this.filterWordRepository.save(filterWord);
    }
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async removeFilterWord(sec_uid, word) {
    const result = await this.filterWordRepository.delete({ sec_uid, word });
    return result.affected > 0;
  }
  /**
   * 添加过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async addFilterTag(sec_uid, tag) {
    await this.getOrCreateDouyinUser(sec_uid);
    let filterTag = await this.filterTagRepository.findOne({
      where: { sec_uid, tag }
    });
    if (!filterTag) {
      filterTag = this.filterTagRepository.create({ sec_uid, tag });
      await this.filterTagRepository.save(filterTag);
    }
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async removeFilterTag(sec_uid, tag) {
    const result = await this.filterTagRepository.delete({ sec_uid, tag });
    return result.affected > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterWords(sec_uid) {
    const filterWords = await this.filterWordRepository.find({ where: { sec_uid } });
    return filterWords.map((word) => word.word);
  }
  /**
   * 获取用户的所有过滤标签
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterTags(sec_uid) {
    const filterTags = await this.filterTagRepository.find({ where: { sec_uid } });
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
    const desc = PushItem.Detail_Data.desc ?? "";
    const hasFilterWord = filterWords.some((word) => desc.includes(word));
    const hasFilterTag = filterTags.some(
      (filterTag) => tags.some((tag) => tag === filterTag)
    );
    logger.debug(`
      作者：${PushItem.remark}
      检查内容：${desc}
      命中词：${filterWords.join(", ")}
      命中标签：${filterTags.join(", ")}
      过滤模式：${filterMode}
      是否过滤：${hasFilterWord || hasFilterTag ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
      作品地址：${logger.green(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}
      `);
    if (filterMode === "blacklist") {
      return hasFilterWord || hasFilterTag;
    } else {
      if (filterWords.length === 0 && filterTags.length === 0) {
        return false;
      }
      return !(hasFilterWord || hasFilterTag);
    }
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
    while (douyinInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
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
    while (bilibiliInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
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
const douyinDBInstance = await getDouyinDB();
const bilibiliDBInstance = await getBilibiliDB();
const cleanOldDynamicCache = async (platform, days = 7) => {
  const cutoffDate = /* @__PURE__ */ new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  let result;
  if (platform === "douyin") {
    const db = await getDouyinDB();
    result = await db["awemeCacheRepository"].delete({
      createdAt: LessThan(cutoffDate)
    });
  } else {
    const db = await getBilibiliDB();
    result = await db["dynamicCacheRepository"].delete({
      createdAt: LessThan(cutoffDate)
    });
  }
  return result.affected ?? 0;
};
export {
  getBilibiliDB as a,
  bilibiliDBInstance as b,
  cleanOldDynamicCache as c,
  douyinDBInstance as d,
  getDouyinDB as g
};
