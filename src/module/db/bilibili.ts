import { join } from 'node:path'

import { basePath } from 'node-karin'
import { DataTypes, Model, Sequelize } from 'sequelize'

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
  storage: join(`${basePath}/${Version.pluginName}/data`, 'bilibili.db'),
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
  avatar_img: {
    type: DataTypes.STRING,
    comment: '头像URL'
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

// 建立关联关系
Bot.hasMany(Group, { foreignKey: 'botId' })
Group.belongsTo(Bot, { foreignKey: 'botId' })

Group.belongsToMany(BilibiliUser, { through: GroupUserSubscription, foreignKey: 'groupId' })
BilibiliUser.belongsToMany(Group, { through: GroupUserSubscription, foreignKey: 'host_mid' })

BilibiliUser.hasMany(DynamicCache, { foreignKey: 'host_mid' })
DynamicCache.belongsTo(BilibiliUser, { foreignKey: 'host_mid' })

Group.hasMany(DynamicCache, { foreignKey: 'groupId' })
DynamicCache.belongsTo(Group, { foreignKey: 'groupId' })

/** 数据库操作类 */
export class BilibiliDBBase {
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
   * @param avatar_img 头像URL
   */
  async getOrCreateBilibiliUser (host_mid: number, remark: string = '') {
    const [user] = await BilibiliUser.findOrCreate({
      where: { host_mid },
      defaults: { remark }
    })

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
   * 迁移旧数据到新数据库结构
   * @param oldData 旧的数据结构
   */
  async migrateOldData (oldData: any) {
    if (!oldData || !oldData.bilibili) return

    for (const groupIdWithBotId in oldData.bilibili) {
      const [groupId, botId] = groupIdWithBotId.split(':')
      if (!groupId || !botId) continue

      const groupData = oldData.bilibili[groupIdWithBotId]

      for (const hostMidKey in groupData) {
        const userData = groupData[hostMidKey]
        const host_mid = userData.host_mid
        const remark = userData.remark
        const dynamic_idlist = userData.dynamic_idlist || []
        const dynamic_type = userData.dynamic_type

        // 创建订阅关系
        await this.subscribeBilibiliUser(groupId, botId, host_mid, remark)

        // 添加动态缓存
        for (const dynamic_id of dynamic_idlist) {
          await this.addDynamicCache(dynamic_id, host_mid, groupId, dynamic_type)
        }
      }
    }
  }

  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions (configItems: bilibiliPushItem[]) {
    if (!configItems || configItems.length === 0) return

    for (const item of configItems) {
      const host_mid = item.host_mid
      const remark = item.remark || ''

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
}

export const bilibiliDB = new BilibiliDBBase()

// 同步数据库结构
await sequelize.sync({ alter: true, force: false })

export { BilibiliUser, Bot, DynamicCache, Group, GroupUserSubscription }

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
  GroupUserSubscription
}
