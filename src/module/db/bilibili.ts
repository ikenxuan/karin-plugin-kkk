import { join } from 'node:path'

import { logger } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import { DataTypes, Model, Sequelize } from 'sequelize'

import { PushItem } from '@/platform/bilibili/push'
import { bilibiliPushItem } from '@/types/config/pushlist'

import { Version } from '../utils'

type GroupUserSubscriptionAttributes = {
  id?: number
  /** 群号 */
  groupId: string
  /** UP主UID */
  host_mid: number
}

/** 创建 Sequelize 实例，需要传入配置对象。 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(`${karinPathBase}/${Version.pluginName}/data`, 'bilibili.db'),
  logging: false,
  pool: {
    max: 5, // 连接池最大连接数
    min: 0, // 连接池最小连接数
    acquire: 30000, // 获取连接的超时时间(毫秒)
    idle: 10000 // 连接在释放前可以空闲的最长时间(毫秒)
  },
  retry: {
    max: 3 // 连接失败时的最大重试次数
  },
  isolationLevel: 'READ COMMITTED' // 隔离级别
})

/** Bots表 - 存储机器人信息 */
const Bot = sequelize.define('Bot', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: '机器人ID'
  }
}, {
  timestamps: true
})

/** Groups表 - 存储群组信息 */
const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: '群组ID'
  },
  botId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '所属机器人ID',
    references: {
      model: 'Bots',
      key: 'id'
    }
  }
}, {
  timestamps: true
})

/** BilibiliUsers表 - 存储B站用户信息 */
const BilibiliUser = sequelize.define('BilibiliUser', {
  host_mid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    comment: 'B站用户UID'
  },
  remark: {
    type: DataTypes.STRING,
    comment: 'B站用户昵称'
  },
  filterMode: {
    type: DataTypes.ENUM('blacklist', 'whitelist'),
    defaultValue: 'blacklist',
    comment: '过滤模式：黑名单或白名单'
  }
}, {
  timestamps: true
})

/** GroupUserSubscriptions表 - 存储群组订阅的B站用户关系 */
const GroupUserSubscription = sequelize.define<Model<GroupUserSubscriptionAttributes>>('GroupUserSubscription', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '订阅ID'
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '群组ID',
    references: {
      model: 'Groups',
      key: 'id'
    }
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'B站用户UID',
    references: {
      model: 'BilibiliUsers',
      key: 'host_mid'
    }
  }
}, {
  timestamps: true
})

/** DynamicCache表 - 存储已推送的动态ID */
const DynamicCache = sequelize.define('DynamicCache', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '缓存ID'
  },
  dynamic_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '动态ID'
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'B站用户UID',
    references: {
      model: 'BilibiliUsers',
      key: 'host_mid'
    }
  },
  groupId: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '群组ID',
    references: {
      model: 'Groups',
      key: 'id'
    }
  },
  dynamic_type: {
    type: DataTypes.STRING,
    comment: '动态类型'
  }
}, {
  timestamps: true
})

/** FilterWords表 - 存储过滤词 */
const FilterWord = sequelize.define('FilterWord', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '过滤词ID'
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'B站用户UID',
    references: {
      model: 'BilibiliUsers',
      key: 'host_mid'
    }
  },
  word: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '过滤词'
  }
}, {
  timestamps: true
})

/** FilterTags表 - 存储过滤标签 */
const FilterTag = sequelize.define('FilterTag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '过滤标签ID'
  },
  host_mid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'B站用户UID',
    references: {
      model: 'BilibiliUsers',
      key: 'host_mid'
    }
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '过滤标签'
  }
}, {
  timestamps: true
})

// 建立关联关系
/** 一个机器人可以管理多个群组，一对多关系 */
Bot.hasMany(Group, { foreignKey: 'botId' })
/** 一个群组属于一个机器人，多对一关系 */
Group.belongsTo(Bot, { foreignKey: 'botId' })

/** 群组和B站用户是多对多关系，通过 GroupUserSubscription 表关联 */
Group.belongsToMany(BilibiliUser, { through: GroupUserSubscription, foreignKey: 'groupId' })
/** B站用户和群组是多对多关系，通过 GroupUserSubscription 表关联 */
BilibiliUser.belongsToMany(Group, { through: GroupUserSubscription, foreignKey: 'host_mid' })

/** 一个B站用户可以有多条动态缓存记录，一对多关系 */
BilibiliUser.hasMany(DynamicCache, { foreignKey: 'host_mid' })
/** 一条动态缓存记录属于一个B站用户，多对一关系 */
DynamicCache.belongsTo(BilibiliUser, { foreignKey: 'host_mid' })

/** 一个群组可以有多条动态缓存记录，一对多关系 */
Group.hasMany(DynamicCache, { foreignKey: 'groupId' })
/** 一条动态缓存记录属于一个群组，多对一关系 */
DynamicCache.belongsTo(Group, { foreignKey: 'groupId' })

/** BilibiliUser和FilterWord是一对多关系：一个B站用户可以有多个过滤词 */
BilibiliUser.hasMany(FilterWord, { foreignKey: 'host_mid' })
/** FilterWord从属于BilibiliUser：每个过滤词都属于一个B站用户 */
FilterWord.belongsTo(BilibiliUser, { foreignKey: 'host_mid' })

/** BilibiliUser和FilterTag是一对多关系：一个B站用户可以有多个过滤标签 */
BilibiliUser.hasMany(FilterTag, { foreignKey: 'host_mid' })
/** FilterTag从属于BilibiliUser：每个过滤标签都属于一个B站用户 */
FilterTag.belongsTo(BilibiliUser, { foreignKey: 'host_mid' })

/** 数据库操作类 */
export class BilibiliDBBase {
  /**
   * 初始化数据库
   */
  async init () {
    await sequelize.authenticate()
    await sequelize.sync()
    return this
  }

  /**
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot (botId: string) {
    const [bot] = await Bot.findOrCreate({
      where: { id: botId }
    })
    return bot
  }

  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup (groupId: string, botId: string) {
    await this.getOrCreateBot(botId)
    const [group] = await Group.findOrCreate({
      where: { id: groupId, botId }
    })
    return group
  }

  /**
   * 获取或创建B站用户记录
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async getOrCreateBilibiliUser (host_mid: number, remark: string = '') {
    const [user] = await BilibiliUser.findOrCreate({
      where: { host_mid },
      defaults: { remark }
    })

    // 如果提供了新的信息，更新用户记录
    if (remark && user.get('remark') !== remark) {
      await user.update({
        remark: remark || user.get('remark')
      })
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
  async subscribeBilibiliUser (groupId: string, botId: string, host_mid: number, remark: string = '') {
    await this.getOrCreateGroup(groupId, botId)
    await this.getOrCreateBilibiliUser(host_mid, remark)

    const [subscription] = await GroupUserSubscription.findOrCreate({
      where: { groupId, host_mid }
    })

    return subscription
  }

  /**
   * 取消订阅B站用户
   * @param groupId 群组ID
   * @param host_mid B站用户UID
   */
  async unsubscribeBilibiliUser (groupId: string, host_mid: number) {
    const result = await GroupUserSubscription.destroy({
      where: { groupId, host_mid }
    })

    // 清除相关的动态缓存
    await DynamicCache.destroy({
      where: { groupId, host_mid }
    })

    return result > 0
  }

  /**
   * 添加动态缓存
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   * @param dynamic_type 动态类型
   */
  async addDynamicCache (dynamic_id: string, host_mid: number, groupId: string, dynamic_type: string) {
    const [cache] = await DynamicCache.findOrCreate({
      where: { dynamic_id, host_mid, groupId },
      defaults: { dynamic_type }
    })

    return cache
  }

  /**
   * 检查动态是否已推送
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isDynamicPushed (dynamic_id: string, host_mid: number, groupId: string) {
    const count = await DynamicCache.count({
      where: { dynamic_id, host_mid, groupId }
    })

    return count > 0
  }

  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups (botId: string) {
    return await Group.findAll({
      where: { botId }
    })
  }

  /**
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions (groupId: string): Promise<Model<GroupUserSubscriptionAttributes>[]> {
    return await GroupUserSubscription.findAll({
      where: { groupId }
    })
  }

  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups (host_mid: number) {
    return await GroupUserSubscription.findAll({
      where: { host_mid },
      include: [Group]
    })
  }

  /**
   * 获取群组的动态缓存
   * @param groupId 群组ID
   * @param host_mid 可选的B站用户UID过滤
   */
  async getGroupDynamicCache (groupId: string, host_mid?: number) {
    const where: any = { groupId }
    if (host_mid) where.host_mid = host_mid

    return await DynamicCache.findAll({
      where,
      order: [['createdAt', 'DESC']]
    })
  }

  /**
 * 检查群组是否已订阅B站用户
 * @param host_mid B站用户UID
 * @param groupId 群组ID
 */
  async isSubscribed (host_mid: number, groupId: string) {
    const count = await GroupUserSubscription.count({
      where: { host_mid, groupId }
    })

    return count > 0
  }

  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions (configItems: bilibiliPushItem[]) {
    if (!configItems || configItems.length === 0) return

    for (const item of configItems) {
      const host_mid = item.host_mid
      const remark = item.remark ?? ''

      // 创建或更新B站用户记录
      await this.getOrCreateBilibiliUser(host_mid, remark)

      // 处理该UP主的所有群组订阅
      for (const groupWithBot of item.group_id) {
        const [groupId, botId] = groupWithBot.split(':')
        if (!groupId || !botId) continue

        // 检查是否已订阅
        const isSubscribed = await this.isSubscribed(host_mid, groupId)

        // 如果未订阅，创建订阅关系
        if (!isSubscribed) {
          await this.subscribeBilibiliUser(groupId, botId, host_mid, remark)
        }
      }
    }
  }

  /**
 * 更新用户的过滤模式
 * @param host_mid B站用户UID
 * @param filterMode 过滤模式
 */
  async updateFilterMode (host_mid: number, filterMode: 'blacklist' | 'whitelist') {
    const user = await this.getOrCreateBilibiliUser(host_mid)
    await user.update({ filterMode })
    return user
  }

  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord (host_mid: number, word: string) {
    await this.getOrCreateBilibiliUser(host_mid)
    const [filterWord] = await FilterWord.findOrCreate({
      where: {
        host_mid,
        word
      }
    })
    return filterWord
  }

  /**
   * 删除过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async removeFilterWord (host_mid: number, word: string) {
    const result = await FilterWord.destroy({
      where: {
        host_mid,
        word
      }
    })
    return result > 0
  }

  /**
   * 添加过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async addFilterTag (host_mid: number, tag: string) {
    await this.getOrCreateBilibiliUser(host_mid)
    const [filterTag] = await FilterTag.findOrCreate({
      where: {
        host_mid,
        tag
      }
    })
    return filterTag
  }

  /**
   * 删除过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async removeFilterTag (host_mid: number, tag: string) {
    const result = await FilterTag.destroy({
      where: {
        host_mid,
        tag
      }
    })
    return result > 0
  }

  /**
   * 获取用户的所有过滤词
   * @param host_mid B站用户UID
   */
  async getFilterWords (host_mid: number) {
    const filterWords = await FilterWord.findAll({
      where: { host_mid }
    })
    return filterWords.map(word => word.get('word') as string)
  }

  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags (host_mid: number) {
    const filterTags = await FilterTag.findAll({
      where: { host_mid }
    })
    return filterTags.map(tag => tag.get('tag') as string)
  }

  /**
   * 获取用户的过滤配置
   * @param host_mid B站用户UID
   */
  async getFilterConfig (host_mid: number) {
    const user = await this.getOrCreateBilibiliUser(host_mid)
    const filterWords = await this.getFilterWords(host_mid)
    const filterTags = await this.getFilterTags(host_mid)

    return {
      filterMode: user.get('filterMode') as 'blacklist' | 'whitelist',
      filterWords,
      filterTags
    }
  }

  /**
   * 从动态中提取文本内容和标签
   * @param dynamicData 动态数据
   * @returns 提取的文本内容和标签
   */
  private extractTextAndTags (dynamicData: any): { text: string, tags: string[] } {
    let text = ''
    const tags: string[] = []

    // 如果没有模块数据，返回空结果
    if (!dynamicData || !dynamicData.modules || !dynamicData.modules.module_dynamic) {
      return { text, tags }
    }

    const moduleDynamic = dynamicData.modules.module_dynamic

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
    if (dynamicData.type === 'DYNAMIC_TYPE_FORWARD' && 'orig' in dynamicData) {
      text += dynamicData.orig.modules.module_dynamic.desc.text + ' '
      for (const node of dynamicData.orig.modules.module_dynamic.desc.rich_text_nodes) {
        tags.push(node.orig_text)
      }
    }

    return { text: text.trim(), tags }
  }

  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param tags 额外的标签列表
   */
  async shouldFilter (PushItem: PushItem, extraTags: string[] = []): Promise<boolean> {
    // 如果是直播动态，不过滤
    if (PushItem.Dynamic_Data.type === 'DYNAMIC_TYPE_LIVE_RCMD') {
      return false
    }

    // 获取用户的过滤配置
    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(PushItem.host_mid)

    // 提取主动态的文本和标签
    const { text: mainText, tags: mainTags } = this.extractTextAndTags(PushItem.Dynamic_Data)

    // 合并所有标签
    let allTags = [...mainTags, ...extraTags]
    let allText = mainText

    // 如果是转发动态，还需要检查原动态
    if (PushItem.Dynamic_Data.type === 'DYNAMIC_TYPE_FORWARD' && 'orig' in PushItem.Dynamic_Data) {
      const { text: origText, tags: origTags } = this.extractTextAndTags(PushItem.Dynamic_Data.orig)
      allText += ' ' + origText
      allTags = [...allTags, ...origTags]
    }

    // 检查内容中是否包含过滤词
    const hasFilterWord = filterWords.some(word => allText.includes(word))

    // 检查标签中是否包含过滤标签
    const hasFilterTag = filterTags.some(filterTag =>
      allTags.some(tag => tag.includes(filterTag))
    )

    logger.warn(`
    UP主UID：${PushItem.host_mid}，
    检查内容：${allText}，
    检查标签：${allTags.join(', ')}，
    命中词：${filterWords.join(', ')}，
    命中标签：${filterTags.join(', ')}，
    过滤模式：${filterMode}，
    是否过滤：${(hasFilterWord || hasFilterTag) ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}，
    动态地址：${logger.green(`https://t.bilibili.com/${PushItem.Dynamic_Data.dynamic_id_str}`)}，
    动态类型：${PushItem.dynamic_type}
    `)

    // 根据过滤模式决定是否过滤
    if (filterMode === 'blacklist') {
      // 黑名单模式：如果包含过滤词或过滤标签，则过滤
      if (hasFilterWord) {
        return true
      }
      if (hasFilterTag) {
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
      return true // 过滤
    }
  }
}

/** 哔哩哔哩数据库实例 */
export let bilibiliDB: BilibiliDBBase

/** B站数据库模型集合 */
export const bilibiliModels = {
  /** BilibiliUsers表 - 存储B站用户信息 */
  BilibiliUser,
  /** Bots表 - 存储机器人信息 */
  Bot,
  /** DynamicCache表 - 存储已推送的动态ID */
  DynamicCache,
  /** Groups表 - 存储群组信息 */
  Group,
  /** GroupUserSubscriptions表 - 存储群组订阅的B站用户关系 */
  GroupUserSubscription,
  /** FilterWord表 - 存储过滤词 */
  FilterWord,
  /** FilterTag表 - 存储过滤标签 */
  FilterTag
};

(async () => {
  bilibiliDB = await new BilibiliDBBase().init()
})()
