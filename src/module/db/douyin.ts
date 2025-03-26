import { join } from 'node:path'

import { basePath } from 'node-karin'
import { DataTypes, Model, Op, Sequelize } from 'sequelize'

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
  storage: join(`${basePath}/${Version.pluginName}/data`, 'douyin.db'),
  logging: false
})

/** 测试数据库连接是否成功 */
await sequelize.authenticate()

// 定义模型
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

// 建立关联关系
Bot.hasMany(Group, { foreignKey: 'botId' })
Group.belongsTo(Bot, { foreignKey: 'botId' })

GroupUserSubscription.belongsTo(Group, { foreignKey: 'groupId' })
Group.hasMany(GroupUserSubscription, { foreignKey: 'groupId' })

GroupUserSubscription.belongsTo(DouyinUser, { foreignKey: 'sec_uid' })
DouyinUser.hasMany(GroupUserSubscription, { foreignKey: 'sec_uid' })

Group.belongsToMany(DouyinUser, { through: GroupUserSubscription, foreignKey: 'groupId' })
DouyinUser.belongsToMany(Group, { through: GroupUserSubscription, foreignKey: 'sec_uid' })

DouyinUser.hasMany(AwemeCache, { foreignKey: 'sec_uid' })
AwemeCache.belongsTo(DouyinUser, { foreignKey: 'sec_uid' })

Group.hasMany(AwemeCache, { foreignKey: 'groupId' })
AwemeCache.belongsTo(Group, { foreignKey: 'groupId' })

/** 数据库操作类 */
export class DouyinDBBase {
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
      const short_id = item.short_id || ''
      const remark = item.remark || ''

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
}

export const douyinDB = new DouyinDBBase()

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
  GroupUserSubscription
}
