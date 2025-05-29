import { Sequelize, DataTypes, Op } from "sequelize";
import { join } from "node:path";
import { logger } from "node-karin";
import { karinPathBase } from "node-karin/root";
import { Root } from "../root.js";
import "node:fs";
import "./vendor-BnVODeEf.js";
import { C as Config, D as DynamicType } from "./main-C2aSrfMh.js";
import "node-karin/axios";
import "stream/promises";
const sequelize$1 = new Sequelize({
  dialect: "sqlite",
  storage: join(`${karinPathBase}/${Root.pluginName}/data`, "bilibili.db"),
  logging: false,
  pool: {
    max: 5,
    // 连接池最大连接数
    min: 0,
    // 连接池最小连接数
    acquire: 3e4,
    // 获取连接的超时时间(毫秒)
    idle: 1e4
    // 连接在释放前可以空闲的最长时间(毫秒)
  },
  retry: {
    max: 3
    // 连接失败时的最大重试次数
  },
  isolationLevel: "READ COMMITTED"
  // 隔离级别
});
const Bot$1 = sequelize$1.define("Bot", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "机器人ID"
  }
}, {
  timestamps: true
});
const Group$1 = sequelize$1.define("Group", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "群组ID"
  },
  botId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "所属机器人ID",
    references: {
      model: "Bots",
      key: "id"
    }
  }
}, {
  timestamps: true
});
const BilibiliUser = sequelize$1.define("BilibiliUser", {
  host_mid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    comment: "B站用户UID"
  },
  remark: {
    type: DataTypes.STRING,
    comment: "B站用户昵称"
  },
  filterMode: {
    type: DataTypes.ENUM("blacklist", "whitelist"),
    defaultValue: "blacklist",
    comment: "过滤模式：黑名单或白名单"
  }
}, {
  timestamps: true
});
const GroupUserSubscription$1 = sequelize$1.define("GroupUserSubscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "订阅ID"
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "群组ID",
    references: {
      model: "Groups",
      key: "id"
    }
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B站用户UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  }
}, {
  timestamps: true
});
const DynamicCache = sequelize$1.define("DynamicCache", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "缓存ID"
  },
  dynamic_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "动态ID"
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B站用户UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "群组ID",
    references: {
      model: "Groups",
      key: "id"
    }
  },
  dynamic_type: {
    type: DataTypes.STRING,
    comment: "动态类型"
  }
}, {
  timestamps: true
});
const FilterWord$1 = sequelize$1.define("FilterWord", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "过滤词ID"
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B站用户UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "过滤词"
  }
}, {
  timestamps: true
});
const FilterTag$1 = sequelize$1.define("FilterTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "过滤标签ID"
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "B站用户UID",
    references: {
      model: "BilibiliUsers",
      key: "host_mid"
    }
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "过滤标签"
  }
}, {
  timestamps: true
});
Bot$1.hasMany(Group$1, { foreignKey: "botId" });
Group$1.belongsTo(Bot$1, { foreignKey: "botId" });
Group$1.belongsToMany(BilibiliUser, { through: GroupUserSubscription$1, foreignKey: "groupId" });
BilibiliUser.belongsToMany(Group$1, { through: GroupUserSubscription$1, foreignKey: "host_mid" });
BilibiliUser.hasMany(DynamicCache, { foreignKey: "host_mid" });
DynamicCache.belongsTo(BilibiliUser, { foreignKey: "host_mid" });
Group$1.hasMany(DynamicCache, { foreignKey: "groupId" });
DynamicCache.belongsTo(Group$1, { foreignKey: "groupId" });
BilibiliUser.hasMany(FilterWord$1, { foreignKey: "host_mid" });
FilterWord$1.belongsTo(BilibiliUser, { foreignKey: "host_mid" });
BilibiliUser.hasMany(FilterTag$1, { foreignKey: "host_mid" });
FilterTag$1.belongsTo(BilibiliUser, { foreignKey: "host_mid" });
class BilibiliDBBase {
  /**
   * 初始化数据库
   */
  async init() {
    try {
      logger.debug(logger.green("--------------------------[BilibiliDB] 开始初始化数据库--------------------------"));
      logger.debug("[BilibiliDB] 正在连接数据库...");
      await sequelize$1.authenticate();
      logger.debug("[BilibiliDB] 数据库连接成功");
      logger.debug("[BilibiliDB] 正在同步数据库模型...");
      await sequelize$1.sync();
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
    const [bot] = await Bot$1.findOrCreate({
      where: { id: botId }
    });
    return bot;
  }
  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup(groupId, botId) {
    await this.getOrCreateBot(botId);
    const [group] = await Group$1.findOrCreate({
      where: { id: groupId, botId }
    });
    return group;
  }
  /**
   * 获取或创建B站用户记录
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async getOrCreateBilibiliUser(host_mid, remark = "") {
    const [user] = await BilibiliUser.findOrCreate({
      where: { host_mid },
      defaults: { remark }
    });
    if (remark && user.get("remark") !== remark) {
      await user.update({
        remark: remark || user.get("remark")
      });
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
    const [subscription] = await GroupUserSubscription$1.findOrCreate({
      where: { groupId, host_mid }
    });
    return subscription;
  }
  /**
   * 取消订阅B站用户
   * @param groupId 群组ID
   * @param host_mid B站用户UID
   */
  async unsubscribeBilibiliUser(groupId, host_mid) {
    const result = await GroupUserSubscription$1.destroy({
      where: { groupId, host_mid }
    });
    await DynamicCache.destroy({
      where: { groupId, host_mid }
    });
    return result > 0;
  }
  /**
   * 添加动态缓存
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   * @param dynamic_type 动态类型
   */
  async addDynamicCache(dynamic_id, host_mid, groupId, dynamic_type) {
    const [cache] = await DynamicCache.findOrCreate({
      where: { dynamic_id, host_mid, groupId },
      defaults: { dynamic_type }
    });
    return cache;
  }
  /**
   * 检查动态是否已推送
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isDynamicPushed(dynamic_id, host_mid, groupId) {
    const count = await DynamicCache.count({
      where: { dynamic_id, host_mid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await Group$1.findAll({
      where: { botId }
    });
  }
  /**
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    return await GroupUserSubscription$1.findAll({
      where: { groupId }
    });
  }
  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups(host_mid) {
    const subscriptions = await GroupUserSubscription$1.findAll({
      where: { host_mid }
    });
    if (subscriptions.length === 0) {
      return [];
    }
    const groupIds = subscriptions.map((sub) => sub.get("groupId"));
    const groups = await Group$1.findAll({
      where: {
        id: {
          [Op.in]: groupIds
        }
      }
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
    return await DynamicCache.findAll({
      where,
      order: [["createdAt", "DESC"]]
    });
  }
  /**
  * 检查群组是否已订阅B站用户
  * @param host_mid B站用户UID
  * @param groupId 群组ID
  */
  async isSubscribed(host_mid, groupId) {
    const count = await GroupUserSubscription$1.count({
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
    const allGroups = await Group$1.findAll();
    for (const group of allGroups) {
      const groupId = group.get("id");
      const configUps = configSubscriptions.get(groupId) ?? /* @__PURE__ */ new Set();
      const dbSubscriptions = await this.getGroupSubscriptions(groupId);
      for (const subscription of dbSubscriptions) {
        const host_mid = subscription.get("host_mid");
        if (!configUps.has(host_mid)) {
          await this.unsubscribeBilibiliUser(groupId, host_mid);
          logger.mark(`已删除群组 ${groupId} 对UP主 ${host_mid} 的订阅`);
        }
      }
    }
    const allUsers = await BilibiliUser.findAll();
    for (const user of allUsers) {
      const host_mid = user.get("host_mid");
      const subscribedGroups = await this.getUserSubscribedGroups(host_mid);
      if (subscribedGroups.length === 0) {
        await FilterWord$1.destroy({ where: { host_mid } });
        await FilterTag$1.destroy({ where: { host_mid } });
        await BilibiliUser.destroy({ where: { host_mid } });
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
    await user.update({ filterMode });
    return user;
  }
  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord(host_mid, word) {
    await this.getOrCreateBilibiliUser(host_mid);
    const [filterWord] = await FilterWord$1.findOrCreate({
      where: {
        host_mid,
        word
      }
    });
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async removeFilterWord(host_mid, word) {
    const result = await FilterWord$1.destroy({
      where: {
        host_mid,
        word
      }
    });
    return result > 0;
  }
  /**
   * 添加过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async addFilterTag(host_mid, tag) {
    await this.getOrCreateBilibiliUser(host_mid);
    const [filterTag] = await FilterTag$1.findOrCreate({
      where: {
        host_mid,
        tag
      }
    });
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async removeFilterTag(host_mid, tag) {
    const result = await FilterTag$1.destroy({
      where: {
        host_mid,
        tag
      }
    });
    return result > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param host_mid B站用户UID
   */
  async getFilterWords(host_mid) {
    const filterWords = await FilterWord$1.findAll({
      where: { host_mid }
    });
    return filterWords.map((word) => word.get("word"));
  }
  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags(host_mid) {
    const filterTags = await FilterTag$1.findAll({
      where: { host_mid }
    });
    return filterTags.map((tag) => tag.get("tag"));
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
      filterMode: user.get("filterMode"),
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
    logger.warn(`
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
let bilibiliDB;
const bilibiliModels = {
  /** DynamicCache表 - 存储已推送的动态ID */
  DynamicCache
};
(async () => {
  bilibiliDB = await new BilibiliDBBase().init();
})();
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(`${karinPathBase}/${Root.pluginName}/data`, "douyin.db"),
  logging: false,
  pool: {
    max: 5,
    // 连接池最大连接数
    min: 0,
    // 连接池最小连接数
    acquire: 3e4,
    // 获取连接的超时时间(毫秒)
    idle: 1e4
    // 连接在释放前可以空闲的最长时间(毫秒)
  },
  retry: {
    max: 3
    // 连接失败时的最大重试次数
  },
  isolationLevel: "READ COMMITTED"
  // 隔离级别
});
const Bot = sequelize.define("Bot", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "机器人ID"
  }
}, {
  timestamps: true
});
const Group = sequelize.define("Group", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "群组ID"
  },
  botId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "所属机器人ID",
    references: {
      model: "Bots",
      key: "id"
    }
  }
}, {
  timestamps: true
});
const DouyinUser = sequelize.define("DouyinUser", {
  sec_uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: "抖音用户sec_uid"
  },
  short_id: {
    type: DataTypes.STRING,
    comment: "抖音号"
  },
  remark: {
    type: DataTypes.STRING,
    comment: "抖音用户昵称"
  },
  living: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: "是否正在直播"
  },
  filterMode: {
    type: DataTypes.ENUM("blacklist", "whitelist"),
    defaultValue: "blacklist",
    comment: "过滤模式：黑名单或白名单"
  }
}, {
  timestamps: true
});
const GroupUserSubscription = sequelize.define("GroupUserSubscription", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "订阅ID"
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "群组ID",
    references: {
      model: "Groups",
      key: "id"
    }
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "抖音用户sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  }
}, {
  timestamps: true
});
const AwemeCache = sequelize.define("AwemeCache", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "缓存ID"
  },
  aweme_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "作品ID"
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "抖音用户sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "群组ID",
    references: {
      model: "Groups",
      key: "id"
    }
  }
}, {
  timestamps: true
});
const FilterWord = sequelize.define("FilterWord", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "过滤词ID"
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "抖音用户sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "过滤词"
  }
}, {
  timestamps: true
});
const FilterTag = sequelize.define("FilterTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "过滤标签ID"
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "抖音用户sec_uid",
    references: {
      model: "DouyinUsers",
      key: "sec_uid"
    }
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "过滤标签"
  }
}, {
  timestamps: true
});
Bot.hasMany(Group, { foreignKey: "botId" });
Group.belongsTo(Bot, { foreignKey: "botId" });
Group.belongsToMany(DouyinUser, { through: GroupUserSubscription, foreignKey: "groupId" });
DouyinUser.belongsToMany(Group, { through: GroupUserSubscription, foreignKey: "sec_uid" });
Group.hasMany(GroupUserSubscription, { foreignKey: "groupId" });
GroupUserSubscription.belongsTo(Group, { foreignKey: "groupId" });
DouyinUser.hasMany(GroupUserSubscription, { foreignKey: "sec_uid" });
GroupUserSubscription.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
DouyinUser.hasMany(AwemeCache, { foreignKey: "sec_uid" });
AwemeCache.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
Group.hasMany(AwemeCache, { foreignKey: "groupId" });
AwemeCache.belongsTo(Group, { foreignKey: "groupId" });
DouyinUser.hasMany(FilterWord, { foreignKey: "sec_uid" });
FilterWord.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
DouyinUser.hasMany(FilterTag, { foreignKey: "sec_uid" });
FilterTag.belongsTo(DouyinUser, { foreignKey: "sec_uid" });
class DouyinDBBase {
  /**
   * 初始化数据库
   */
  async init() {
    try {
      logger.debug(logger.green("--------------------------[DouyinDB] 开始初始化数据库--------------------------"));
      logger.debug("[DouyinDB] 正在连接数据库...");
      await sequelize.authenticate();
      logger.debug("[DouyinDB] 数据库连接成功");
      logger.debug("[DouyinDB] 正在同步数据库模型...");
      await sequelize.sync();
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
    const [bot] = await Bot.findOrCreate({
      where: { id: botId }
    });
    return bot;
  }
  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup(groupId, botId) {
    await this.getOrCreateBot(botId);
    const [group] = await Group.findOrCreate({
      where: { id: groupId, botId }
    });
    return group;
  }
  /**
   * 获取或创建抖音用户记录
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async getOrCreateDouyinUser(sec_uid, short_id = "", remark = "") {
    const [user] = await DouyinUser.findOrCreate({
      where: { sec_uid },
      defaults: { short_id, remark }
    });
    if (remark && user.get("remark") !== remark || short_id && user.get("short_id") !== short_id) {
      await user.update({
        remark: remark || user.get("remark"),
        short_id: short_id || user.get("short_id")
      });
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
    const [subscription] = await GroupUserSubscription.findOrCreate({
      where: { groupId, sec_uid }
    });
    return subscription;
  }
  /**
   * 取消订阅抖音用户
   * @param groupId 群组ID
   * @param sec_uid 抖音用户sec_uid
   */
  async unsubscribeDouyinUser(groupId, sec_uid) {
    const result = await GroupUserSubscription.destroy({
      where: { groupId, sec_uid }
    });
    await AwemeCache.destroy({
      where: { groupId, sec_uid }
    });
    return result > 0;
  }
  /**
   * 添加作品缓存
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async addAwemeCache(aweme_id, sec_uid, groupId) {
    const [cache] = await AwemeCache.findOrCreate({
      where: { aweme_id, sec_uid, groupId }
    });
    return cache;
  }
  /**
   * 检查作品是否已推送
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isAwemePushed(aweme_id, sec_uid, groupId) {
    const count = await AwemeCache.count({
      where: { aweme_id, sec_uid, groupId }
    });
    return count > 0;
  }
  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups(botId) {
    return await Group.findAll({
      where: { botId }
    });
  }
  /**
   * 获取群组订阅的所有抖音用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions(groupId) {
    return await GroupUserSubscription.findAll({
      where: { groupId },
      include: [{
        model: DouyinUser,
        required: true
      }]
    });
  }
  /**
   * 获取抖音用户的所有订阅群组
   * @param sec_uid 抖音用户sec_uid
   */
  async getUserSubscribedGroups(sec_uid) {
    const subscriptions = await GroupUserSubscription.findAll({
      where: { sec_uid }
    });
    if (subscriptions.length === 0) {
      return [];
    }
    const groupIds = subscriptions.map((sub) => sub.get("groupId"));
    const groups = await Group.findAll({
      where: {
        id: {
          [Op.in]: groupIds
        }
      }
    });
    return groups;
  }
  /**
   * 检查群组是否已订阅抖音用户
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isSubscribed(sec_uid, groupId) {
    const count = await GroupUserSubscription.count({
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
    return await DouyinUser.findByPk(sec_uid);
  }
  /**
   * 更新用户直播状态
   * @param sec_uid 抖音用户sec_uid
   * @param living 是否正在直播
   */
  async updateLiveStatus(sec_uid, living) {
    const user = await DouyinUser.findByPk(sec_uid);
    if (!user) return false;
    await user.update({ living });
    return true;
  }
  /**
   * 获取用户直播状态
   * @param sec_uid 抖音用户sec_uid
   */
  async getLiveStatus(sec_uid) {
    const user = await DouyinUser.findByPk(sec_uid);
    if (!user) return { living: false };
    return {
      living: user.get("living")
    };
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
    const allGroups = await Group.findAll();
    for (const group of allGroups) {
      const groupId = group.get("id");
      const configUsers = configSubscriptions.get(groupId) ?? /* @__PURE__ */ new Set();
      const dbSubscriptions = await this.getGroupSubscriptions(groupId);
      for (const subscription of dbSubscriptions) {
        const sec_uid = subscription.get("sec_uid");
        if (!configUsers.has(sec_uid)) {
          await this.unsubscribeDouyinUser(groupId, sec_uid);
          logger.mark(`已删除群组 ${groupId} 对抖音用户 ${sec_uid} 的订阅`);
        }
      }
    }
    const allUsers = await DouyinUser.findAll();
    for (const user of allUsers) {
      const sec_uid = user.get("sec_uid");
      const subscribedGroups = await this.getUserSubscribedGroups(sec_uid);
      if (subscribedGroups.length === 0) {
        await FilterWord.destroy({ where: { sec_uid } });
        await FilterTag.destroy({ where: { sec_uid } });
        await DouyinUser.destroy({ where: { sec_uid } });
        logger.mark(`已删除抖音用户 ${sec_uid} 的记录及相关过滤设置（不再被任何群组订阅）`);
      }
    }
  }
  /**
   * 通过ID获取群组信息
   * @param groupId 群组ID
   */
  async getGroupById(groupId) {
    return await Group.findByPk(groupId);
  }
  /**
   * 更新用户的过滤模式
   * @param sec_uid 抖音用户sec_uid
   * @param filterMode 过滤模式
   */
  async updateFilterMode(sec_uid, filterMode) {
    const user = await this.getOrCreateDouyinUser(sec_uid);
    await user.update({ filterMode });
    return user;
  }
  /**
   * 添加过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async addFilterWord(sec_uid, word) {
    await this.getOrCreateDouyinUser(sec_uid);
    const [filterWord] = await FilterWord.findOrCreate({
      where: {
        sec_uid,
        word
      }
    });
    return filterWord;
  }
  /**
   * 删除过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async removeFilterWord(sec_uid, word) {
    const result = await FilterWord.destroy({
      where: {
        sec_uid,
        word
      }
    });
    return result > 0;
  }
  /**
   * 添加过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async addFilterTag(sec_uid, tag) {
    await this.getOrCreateDouyinUser(sec_uid);
    const [filterTag] = await FilterTag.findOrCreate({
      where: {
        sec_uid,
        tag
      }
    });
    return filterTag;
  }
  /**
   * 删除过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async removeFilterTag(sec_uid, tag) {
    const result = await FilterTag.destroy({
      where: {
        sec_uid,
        tag
      }
    });
    return result > 0;
  }
  /**
   * 获取用户的所有过滤词
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterWords(sec_uid) {
    const filterWords = await FilterWord.findAll({
      where: { sec_uid }
    });
    return filterWords.map((word) => word.get("word"));
  }
  /**
   * 获取用户的所有过滤标签
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterTags(sec_uid) {
    const filterTags = await FilterTag.findAll({
      where: { sec_uid }
    });
    return filterTags.map((tag) => tag.get("tag"));
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
      filterMode: user.get("filterMode"),
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
    logger.warn(`
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
const douyinModels = {
  /** AwemeCache表 - 存储已推送的作品ID */
  AwemeCache
};
let douyinDB;
(async () => {
  douyinDB = await new DouyinDBBase().init();
})();
const cleanOldDynamicCache = async (platform, days = 7) => {
  const cutoffDate = /* @__PURE__ */ new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const Cache = platform === "douyin" ? douyinModels.AwemeCache : bilibiliModels.DynamicCache;
  const result = await Cache.destroy({
    where: {
      createdAt: {
        [Op.lt]: cutoffDate
      }
    }
  });
  return result;
};
export {
  BilibiliDBBase,
  DouyinDBBase,
  bilibiliDB,
  bilibiliModels,
  cleanOldDynamicCache,
  douyinDB,
  douyinModels
};
