import { join } from 'node:path'

import { logger } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import { DataTypes, Model, Sequelize } from 'sequelize'

import { DouyinPushItem } from '@/platform/douyin/push'
import { douyinPushItem } from '@/types/config/pushlist'

import { Version } from '../utils'

type GroupUserSubscriptionAttributes = {
  id?: number
  /** 群号 */
  groupId: string
  /** 抖音用户sec_uid */
  sec_uid: string
}

/** 创建 Sequelize 实例，需要传入配置对象。 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(`${karinPathBase}/${Version.pluginName}/data`, 'douyin.db'),
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

/** DouyinUsers表 - 存储抖音用户信息 */
const DouyinUser = sequelize.define('DouyinUser', {
  sec_uid: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: '抖音用户sec_uid'
  },
  short_id: {
    type: DataTypes.STRING,
    comment: '抖音号'
  },
  remark: {
    type: DataTypes.STRING,
    comment: '抖音用户昵称'
  },
  living: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: '是否正在直播'
  },
  filterMode: {
    type: DataTypes.ENUM('blacklist', 'whitelist'),
    defaultValue: 'blacklist',
    comment: '过滤模式：黑名单或白名单'
  }
}, {
  timestamps: true
})

/** GroupUserSubscriptions表 - 存储群组订阅的抖音用户关系 */
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
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '抖音用户sec_uid',
    references: {
      model: 'DouyinUsers',
      key: 'sec_uid'
    }
  }
}, {
  timestamps: true
})

/** AwemeCache表 - 存储已推送的作品ID */
const AwemeCache = sequelize.define('AwemeCache', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '缓存ID'
  },
  aweme_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '作品ID'
  },
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '抖音用户sec_uid',
    references: {
      model: 'DouyinUsers',
      key: 'sec_uid'
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
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '抖音用户sec_uid',
    references: {
      model: 'DouyinUsers',
      key: 'sec_uid'
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
  sec_uid: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '抖音用户sec_uid',
    references: {
      model: 'DouyinUsers',
      key: 'sec_uid'
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
/** Bot和Group是一对多关系：一个机器人可以管理多个群组 */
Bot.hasMany(Group, { foreignKey: 'botId' })
/** Group从属于Bot：每个群组都有一个所属的机器人 */
Group.belongsTo(Bot, { foreignKey: 'botId' })

/** Group和DouyinUser是多对多关系：通过GroupUserSubscription表建立关联 */
Group.belongsToMany(DouyinUser, { through: GroupUserSubscription, foreignKey: 'groupId' })
/** 一个群组可以订阅多个抖音用户，一个抖音用户也可以被多个群组订阅 */
DouyinUser.belongsToMany(Group, { through: GroupUserSubscription, foreignKey: 'sec_uid' })

/** 添加Group和GroupUserSubscription之间的直接关联 */
Group.hasMany(GroupUserSubscription, { foreignKey: 'groupId' })
GroupUserSubscription.belongsTo(Group, { foreignKey: 'groupId' })

/** 添加DouyinUser和GroupUserSubscription之间的直接关联 */
DouyinUser.hasMany(GroupUserSubscription, { foreignKey: 'sec_uid' })
GroupUserSubscription.belongsTo(DouyinUser, { foreignKey: 'sec_uid' })

/** DouyinUser和AwemeCache是一对多关系：一个抖音用户可以有多个作品缓存 */
DouyinUser.hasMany(AwemeCache, { foreignKey: 'sec_uid' })
/** AwemeCache从属于DouyinUser：每个作品缓存都属于一个抖音用户 */
AwemeCache.belongsTo(DouyinUser, { foreignKey: 'sec_uid' })

/** Group和AwemeCache是一对多关系：一个群组可以有多个作品缓存 */
Group.hasMany(AwemeCache, { foreignKey: 'groupId' })
/** AwemeCache从属于Group：每个作品缓存都属于一个群组 */
AwemeCache.belongsTo(Group, { foreignKey: 'groupId' })

/** DouyinUser和FilterWord是一对多关系：一个抖音用户可以有多个过滤词 */
DouyinUser.hasMany(FilterWord, { foreignKey: 'sec_uid' })
/** FilterWord从属于DouyinUser：每个过滤词都属于一个抖音用户 */
FilterWord.belongsTo(DouyinUser, { foreignKey: 'sec_uid' })

/** DouyinUser和FilterTag是一对多关系：一个抖音用户可以有多个过滤标签 */
DouyinUser.hasMany(FilterTag, { foreignKey: 'sec_uid' })
/** FilterTag从属于DouyinUser：每个过滤标签都属于一个抖音用户 */
FilterTag.belongsTo(DouyinUser, { foreignKey: 'sec_uid' })

/** 数据库操作类 */
export class DouyinDBBase {
  /**
   * 初始化数据库
   */
  async init () {
    try {
      await sequelize.authenticate()
      try {
        const queryInterface = sequelize.getQueryInterface()

        // 检查 DouyinUsers 表是否存在
        const tables = await queryInterface.showAllTables()
        if (tables.includes('DouyinUsers')) {
          // 获取表结构
          const tableInfo = await queryInterface.describeTable('DouyinUsers')

          // 如果表中没有 filterMode 列，则添加它
          if (!tableInfo.filterMode) {
            logger.warn('正在添加缺失的 filterMode 列到 DouyinUsers 表...')
            await queryInterface.addColumn('DouyinUsers', 'filterMode', {
              type: DataTypes.STRING,
              defaultValue: 'blacklist',
              allowNull: false
            })
            logger.mark('成功添加 filterMode 列')
          }
        } else {
          await sequelize.sync()
        }
      } catch (error) {
        logger.error('检查或添加 filterMode 列时出错:', error)
        await sequelize.sync()
      }
    } catch (error) {
      logger.error('数据库初始化失败:', error)
      throw error
    }

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
   * 获取或创建抖音用户记录
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async getOrCreateDouyinUser (sec_uid: string, short_id: string = '', remark: string = '') {
    const [user] = await DouyinUser.findOrCreate({
      where: { sec_uid },
      defaults: { short_id, remark }
    })

    // 如果提供了新的信息，更新用户记录
    if ((remark && user.get('remark') !== remark) ||
      (short_id && user.get('short_id') !== short_id)) {
      await user.update({
        remark: remark || user.get('remark'),
        short_id: short_id || user.get('short_id')
      })
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
  async subscribeDouyinUser (groupId: string, botId: string, sec_uid: string, short_id: string = '', remark: string = '') {
    await this.getOrCreateGroup(groupId, botId)
    await this.getOrCreateDouyinUser(sec_uid, short_id, remark)

    const [subscription] = await GroupUserSubscription.findOrCreate({
      where: { groupId, sec_uid }
    })

    return subscription
  }

  /**
   * 取消订阅抖音用户
   * @param groupId 群组ID
   * @param sec_uid 抖音用户sec_uid
   */
  async unsubscribeDouyinUser (groupId: string, sec_uid: string) {
    const result = await GroupUserSubscription.destroy({
      where: { groupId, sec_uid }
    })

    // 清除相关的作品缓存
    await AwemeCache.destroy({
      where: { groupId, sec_uid }
    })

    return result > 0
  }

  /**
   * 添加作品缓存
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async addAwemeCache (aweme_id: string, sec_uid: string, groupId: string) {
    const [cache] = await AwemeCache.findOrCreate({
      where: { aweme_id, sec_uid, groupId }
    })

    return cache
  }

  /**
   * 检查作品是否已推送
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isAwemePushed (aweme_id: string, sec_uid: string, groupId: string) {
    const count = await AwemeCache.count({
      where: { aweme_id, sec_uid, groupId }
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
   * 获取群组订阅的所有抖音用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions (groupId: string) {
    return await GroupUserSubscription.findAll({
      where: { groupId },
      include: [{
        model: DouyinUser,
        required: true
      }]
    })
  }

  /**
   * 获取抖音用户的所有订阅群组
   * @param sec_uid 抖音用户sec_uid
   */
  async getUserSubscribedGroups (sec_uid: string) {
    return await GroupUserSubscription.findAll({
      where: { sec_uid },
      include: [{
        model: Group,
        required: true
      }]
    })
  }

  /**
   * 检查群组是否已订阅抖音用户
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isSubscribed (sec_uid: string, groupId: string) {
    const count = await GroupUserSubscription.count({
      where: { sec_uid, groupId }
    })

    return count > 0
  }

  /**
   * 获取抖音用户信息
   * @param sec_uid 抖音用户sec_uid
   * @returns 返回用户信息，如果不存在则返回null
   */
  async getDouyinUser (sec_uid: string) {
    return await DouyinUser.findByPk(sec_uid)
  }

  /**
   * 更新用户直播状态
   * @param sec_uid 抖音用户sec_uid
   * @param living 是否正在直播
   */
  async updateLiveStatus (sec_uid: string, living: boolean) {
    const user = await DouyinUser.findByPk(sec_uid)
    if (!user) return false

    await user.update({ living })

    return true
  }

  /**
   * 获取用户直播状态
   * @param sec_uid 抖音用户sec_uid
   */
  async getLiveStatus (sec_uid: string) {
    const user = await DouyinUser.findByPk(sec_uid)
    if (!user) return { living: false }

    return {
      living: user.get('living') as boolean
    }
  }

  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions (configItems: douyinPushItem[]) {
    if (!configItems || configItems.length === 0) return

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

        // 检查是否已订阅
        const isSubscribed = await this.isSubscribed(sec_uid, groupId)

        // 如果未订阅，创建订阅关系
        if (!isSubscribed) {
          await this.subscribeDouyinUser(groupId, botId, sec_uid, short_id, remark)
        }
      }
    }
  }

  /**
   * 通过ID获取群组信息
   * @param groupId 群组ID
   */
  async getGroupById (groupId: string) {
    return await Group.findByPk(groupId)
  }

  /**
   * 更新用户的过滤模式
   * @param sec_uid 抖音用户sec_uid
   * @param filterMode 过滤模式
   */
  async updateFilterMode (sec_uid: string, filterMode: 'blacklist' | 'whitelist') {
    const user = await this.getOrCreateDouyinUser(sec_uid)
    await user.update({ filterMode })
    return user
  }

  /**
   * 添加过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async addFilterWord (sec_uid: string, word: string) {
    await this.getOrCreateDouyinUser(sec_uid)
    const [filterWord] = await FilterWord.findOrCreate({
      where: {
        sec_uid,
        word
      }
    })
    return filterWord
  }

  /**
   * 删除过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async removeFilterWord (sec_uid: string, word: string) {
    const result = await FilterWord.destroy({
      where: {
        sec_uid,
        word
      }
    })
    return result > 0
  }

  /**
   * 添加过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async addFilterTag (sec_uid: string, tag: string) {
    await this.getOrCreateDouyinUser(sec_uid)
    const [filterTag] = await FilterTag.findOrCreate({
      where: {
        sec_uid,
        tag
      }
    })
    return filterTag
  }

  /**
   * 删除过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async removeFilterTag (sec_uid: string, tag: string) {
    const result = await FilterTag.destroy({
      where: {
        sec_uid,
        tag
      }
    })
    return result > 0
  }

  /**
   * 获取用户的所有过滤词
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterWords (sec_uid: string) {
    const filterWords = await FilterWord.findAll({
      where: { sec_uid }
    })
    return filterWords.map(word => word.get('word') as string)
  }

  /**
   * 获取用户的所有过滤标签
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterTags (sec_uid: string) {
    const filterTags = await FilterTag.findAll({
      where: { sec_uid }
    })
    return filterTags.map(tag => tag.get('tag') as string)
  }

  /**
   * 获取用户的过滤配置
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterConfig (sec_uid: string) {
    const user = await this.getOrCreateDouyinUser(sec_uid)
    const filterWords = await this.getFilterWords(sec_uid)
    const filterTags = await this.getFilterTags(sec_uid)

    return {
      filterMode: user.get('filterMode') as 'blacklist' | 'whitelist',
      filterWords,
      filterTags
    }
  }

  /**
   * 检查内容是否应该被过滤
   * @param PushItem 推送项
   * @param tags 标签列表
   */
  async shouldFilter (PushItem: DouyinPushItem, tags: string[] = []) {
    // 使用 PushItem.sec_uid 而不是 PushItem.Detail_Data.sec_uid
    const sec_uid = PushItem.sec_uid
    if (!sec_uid) {
      logger.warn(`推送项缺少 sec_uid 参数: ${JSON.stringify(PushItem)}`)
      return false // 如果没有 sec_uid，默认不过滤
    }

    const { filterMode, filterWords, filterTags } = await this.getFilterConfig(sec_uid)
    const desc = PushItem.Detail_Data.desc ?? ''

    // 检查内容中是否包含过滤词
    const hasFilterWord = filterWords.some(word => desc.includes(word))

    // 检查标签中是否包含过滤标签
    const hasFilterTag = filterTags.some(filterTag =>
      tags.some(tag => tag === filterTag)
    )

    logger.warn(`
      作者：${PushItem.remark}，
      检查内容：${desc}，
      命中词：${filterWords.join(', ')}，
      命中标签：${filterTags.join(', ')}，
      过滤模式：${filterMode}，
      是否过滤：${(hasFilterWord || hasFilterTag) ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}，
      作品地址：${logger.green(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}，
      `)

    // 根据过滤模式决定是否过滤
    if (filterMode === 'blacklist') {
      // 黑名单模式：如果包含过滤词或过滤标签，则过滤
      return hasFilterWord || hasFilterTag
    } else {
      // 白名单模式：如果不包含任何白名单词或白名单标签，则过滤
      // 注意：如果白名单为空，则不过滤任何内容
      if (filterWords.length === 0 && filterTags.length === 0) {
        return false
      }
      return !(hasFilterWord || hasFilterTag)
    }
  }
}

/** 抖音数据库模型集合 */
export const douyinModels = {
  /** AwemeCache表 - 存储已推送的作品ID */
  AwemeCache,
  /** Bots表 - 存储机器人信息 */
  Bot,
  /** DouyinUsers表 - 存储抖音用户信息 */
  DouyinUser,
  /** Groups表 - 存储群组信息 */
  Group,
  /** GroupUserSubscriptions表 - 存储群组订阅的抖音用户关系 */
  GroupUserSubscription,
  /** FilterWord表 - 存储过滤词 */
  FilterWord,
  /** FilterTag表 - 存储过滤标签 */
  FilterTag
}

/** 抖音数据库实例 */
export let douyinDB: DouyinDBBase

(async () => {
  douyinDB = await new DouyinDBBase().init()
})()
