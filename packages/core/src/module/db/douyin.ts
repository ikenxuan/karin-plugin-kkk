import 'reflect-metadata'

import { join } from 'node:path'

import { logger } from 'node-karin'
import { karinPathBase } from 'node-karin/root'
import {
  Column,
  CreateDateColumn,
  DataSource,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Repository,
  UpdateDateColumn
} from 'typeorm'

import { Config, Root } from '@/module/utils'
import { DouyinPushItem } from '@/platform/douyin/push'
import { douyinPushItem } from '@/types/config/pushlist'

/**
 * 机器人实体 - 存储机器人信息
 */
@Entity('Bots')
class Bot {
  /** 机器人ID */
  @PrimaryColumn({ type: 'varchar', comment: '机器人ID' })
  id!: string

  /** 创建时间 */
  @CreateDateColumn()
  createdAt!: Date

  /** 更新时间 */
  @UpdateDateColumn()
  updatedAt!: Date

  /** 关联的群组 */
  @OneToMany(() => Group, group => group.bot)
  groups!: Group[]
}

/**
 * 群组实体 - 存储群组信息
 */
@Entity('Groups')
class Group {
  /** 群组ID */
  @PrimaryColumn({ type: 'varchar', comment: '群组ID' })
  id!: string

  /** 所属机器人ID */
  @Column({ type: 'varchar', comment: '所属机器人ID' })
  botId!: string

  /** 创建时间 */
  @CreateDateColumn()
  createdAt!: Date

  /** 更新时间 */
  @UpdateDateColumn()
  updatedAt!: Date

  /** 所属机器人 */
  @ManyToOne(() => Bot, bot => bot.groups)
  bot!: Bot

  /** 订阅关系 */
  @OneToMany(() => GroupUserSubscription, subscription => subscription.group)
  subscriptions!: GroupUserSubscription[]

  /** 作品缓存 */
  @OneToMany(() => AwemeCache, cache => cache.group)
  awemeCaches!: AwemeCache[]

  /** 订阅的抖音用户（多对多关系） */
  @ManyToMany(() => DouyinUser, user => user.subscribedGroups)
  @JoinTable({
    name: 'GroupUserSubscriptions',
    joinColumn: { name: 'groupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sec_uid', referencedColumnName: 'sec_uid' }
  })
  subscribedUsers!: DouyinUser[]
}

/**
 * 抖音用户实体 - 存储抖音用户信息
 */
@Entity('DouyinUsers')
class DouyinUser {
  /** 抖音用户sec_uid */
  @PrimaryColumn({ type: 'varchar', comment: '抖音用户sec_uid' })
  sec_uid!: string

  /** 抖音号 */
  @Column({ type: 'varchar', nullable: true, comment: '抖音号' })
  short_id?: string

  /** 抖音用户昵称 */
  @Column({ type: 'varchar', nullable: true, comment: '抖音用户昵称' })
  remark?: string

  /** 是否正在直播 */
  @Column({ type: 'boolean', default: false, comment: '是否正在直播' })
  living!: boolean

  /** 过滤模式：黑名单或白名单 */
  @Column({
    type: 'varchar',
    default: 'blacklist',
    comment: '过滤模式：黑名单或白名单'
  })
  filterMode!: 'blacklist' | 'whitelist'

  /** 创建时间 */
  @CreateDateColumn()
  createdAt!: Date

  /** 更新时间 */
  @UpdateDateColumn()
  updatedAt!: Date

  /** 订阅关系 */
  @OneToMany(() => GroupUserSubscription, subscription => subscription.douyinUser)
  subscriptions!: GroupUserSubscription[]

  /** 作品缓存 */
  @OneToMany(() => AwemeCache, cache => cache.douyinUser)
  awemeCaches!: AwemeCache[]

  /** 过滤词 */
  @OneToMany(() => FilterWord, filterWord => filterWord.douyinUser)
  filterWords!: FilterWord[]

  /** 过滤标签 */
  @OneToMany(() => FilterTag, filterTag => filterTag.douyinUser)
  filterTags!: FilterTag[]

  /** 订阅的群组（多对多关系） */
  @ManyToMany(() => Group, group => group.subscribedUsers)
  subscribedGroups!: Group[]
}

/**
 * 群组用户订阅关系实体 - 存储群组订阅的抖音用户关系
 */
@Entity('GroupUserSubscriptions')
class GroupUserSubscription {
  /** 群组ID */
  @PrimaryColumn({ type: 'varchar', comment: '群组ID' })
  groupId!: string

  /** 抖音用户sec_uid */
  @PrimaryColumn({ type: 'varchar', comment: '抖音用户sec_uid' })
  sec_uid!: string

  /** 创建时间 */
  @CreateDateColumn()
  createdAt!: Date

  /** 更新时间 */
  @UpdateDateColumn()
  updatedAt!: Date

  /** 关联的群组 */
  @ManyToOne(() => Group, group => group.subscriptions)
  group!: Group

  /** 关联的抖音用户 */
  @ManyToOne(() => DouyinUser, user => user.subscriptions)
  douyinUser!: DouyinUser
}

/**
 * 作品缓存实体 - 存储已推送的作品ID
 */
@Entity('AwemeCaches')
class AwemeCache {
  /** 缓存ID */
  @PrimaryGeneratedColumn({ comment: '缓存ID' })
  id!: number

  /** 作品ID */
  @Column({ type: 'varchar', comment: '作品ID' })
  aweme_id!: string

  /** 抖音用户sec_uid */
  @Column({ type: 'varchar', comment: '抖音用户sec_uid' })
  sec_uid!: string

  /** 群组ID */
  @Column({ type: 'varchar', comment: '群组ID' })
  groupId!: string

  /** 创建时间 */
  @CreateDateColumn()
  createdAt!: Date

  /** 更新时间 */
  @UpdateDateColumn()
  updatedAt!: Date

  /** 关联的抖音用户 */
  @ManyToOne(() => DouyinUser, user => user.awemeCaches)
  douyinUser!: DouyinUser

  /** 关联的群组 */
  @ManyToOne(() => Group, group => group.awemeCaches)
  group!: Group
}

/**
 * 过滤词实体 - 存储过滤词
 */
@Entity('FilterWords')
class FilterWord {
  /** 过滤词ID */
  @PrimaryGeneratedColumn({ comment: '过滤词ID' })
  id!: number

  /** 抖音用户sec_uid */
  @Column({ type: 'varchar', comment: '抖音用户sec_uid' })
  sec_uid!: string

  /** 过滤词 */
  @Column({ type: 'varchar', comment: '过滤词' })
  word!: string

  /** 创建时间 */
  @CreateDateColumn()
  createdAt!: Date

  /** 更新时间 */
  @UpdateDateColumn()
  updatedAt!: Date

  /** 关联的抖音用户 */
  @ManyToOne(() => DouyinUser, user => user.filterWords)
  douyinUser!: DouyinUser
}

/**
 * 过滤标签实体 - 存储过滤标签
 */
@Entity('FilterTags')
class FilterTag {
  /** 过滤标签ID */
  @PrimaryGeneratedColumn({ comment: '过滤标签ID' })
  id!: number

  /** 抖音用户sec_uid */
  @Column({ type: 'varchar', comment: '抖音用户sec_uid' })
  sec_uid!: string

  /** 过滤标签 */
  @Column({ type: 'varchar', comment: '过滤标签' })
  tag!: string

  /** 创建时间 */
  @CreateDateColumn()
  createdAt!: Date

  /** 更新时间 */
  @UpdateDateColumn()
  updatedAt!: Date

  /** 关联的抖音用户 */
  @ManyToOne(() => DouyinUser, user => user.filterTags)
  douyinUser!: DouyinUser
}

/** 创建 TypeORM 数据源 */
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: join(`${karinPathBase}/${Root.pluginName}/data`, 'douyin.db'),
  synchronize: true,
  logging: false,
  entities: [Bot, Group, DouyinUser, GroupUserSubscription, AwemeCache, FilterWord, FilterTag],
  extra: {
    // SQLite 连接池配置
    max: 5,
    min: 0,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 10000
  }
})

/** 数据库操作类 */
export class DouyinDBBase {
  private botRepository!: Repository<Bot>
  private groupRepository!: Repository<Group>
  private douyinUserRepository!: Repository<DouyinUser>
  private groupUserSubscriptionRepository!: Repository<GroupUserSubscription>
  private awemeCacheRepository!: Repository<AwemeCache>
  private filterWordRepository!: Repository<FilterWord>
  private filterTagRepository!: Repository<FilterTag>

  /**
   * 初始化数据库
   */
  async init () {
    try {
      logger.debug(logger.green('--------------------------[DouyinDB] 开始初始化数据库--------------------------'))
      logger.debug('[DouyinDB] 正在连接数据库...')

      // 检查连接是否已经建立
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
        logger.debug('[DouyinDB] 数据库连接成功')
      } else {
        logger.debug('[DouyinDB] 数据库连接已存在，跳过初始化')
      }

      // 初始化仓库
      this.botRepository = AppDataSource.getRepository(Bot)
      this.groupRepository = AppDataSource.getRepository(Group)
      this.douyinUserRepository = AppDataSource.getRepository(DouyinUser)
      this.groupUserSubscriptionRepository = AppDataSource.getRepository(GroupUserSubscription)
      this.awemeCacheRepository = AppDataSource.getRepository(AwemeCache)
      this.filterWordRepository = AppDataSource.getRepository(FilterWord)
      this.filterTagRepository = AppDataSource.getRepository(FilterTag)

      logger.debug('[DouyinDB] 数据库模型同步成功')

      logger.debug('[DouyinDB] 正在同步配置订阅...')
      logger.debug('[DouyinDB] 配置项数量:', Config.pushlist.douyin?.length || 0)
      await this.syncConfigSubscriptions(Config.pushlist.douyin)
      logger.debug('[DouyinDB] 配置订阅同步成功')
      logger.debug(logger.green('--------------------------[DouyinDB] 初始化数据库完成--------------------------'))
    } catch (error) {
      logger.error('[DouyinDB] 数据库初始化失败:', error)
      throw error
    }

    return this
  }

  /**
   * 获取或创建机器人记录
   * @param botId 机器人ID
   */
  async getOrCreateBot (botId: string) {
    let bot = await this.botRepository.findOne({ where: { id: botId } })
    if (!bot) {
      bot = this.botRepository.create({ id: botId })
      await this.botRepository.save(bot)
    }
    return bot
  }

  /**
   * 获取或创建群组记录
   * @param groupId 群组ID
   * @param botId 机器人ID
   */
  async getOrCreateGroup (groupId: string, botId: string) {
    await this.getOrCreateBot(botId)
    let group = await this.groupRepository.findOne({ where: { id: groupId, botId } })
    if (!group) {
      group = this.groupRepository.create({ id: groupId, botId })
      await this.groupRepository.save(group)
    }
    return group
  }

  /**
   * 获取或创建抖音用户记录
   * @param sec_uid 抖音用户sec_uid
   * @param short_id 抖音号
   * @param remark 用户昵称
   */
  async getOrCreateDouyinUser (sec_uid: string, short_id: string = '', remark: string = '') {
    let user = await this.douyinUserRepository.findOne({ where: { sec_uid } })
    if (!user) {
      user = this.douyinUserRepository.create({ sec_uid, short_id, remark })
      await this.douyinUserRepository.save(user)
    } else {
      // 如果提供了新的信息，更新用户记录
      let needUpdate = false
      if (remark && user.remark !== remark) {
        user.remark = remark
        needUpdate = true
      }
      if (short_id && user.short_id !== short_id) {
        user.short_id = short_id
        needUpdate = true
      }
      if (needUpdate) {
        await this.douyinUserRepository.save(user)
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
  async subscribeDouyinUser (groupId: string, botId: string, sec_uid: string, short_id: string = '', remark: string = '') {
    await this.getOrCreateGroup(groupId, botId)
    await this.getOrCreateDouyinUser(sec_uid, short_id, remark)

    let subscription = await this.groupUserSubscriptionRepository.findOne({
      where: { groupId, sec_uid }
    })
    if (!subscription) {
      subscription = this.groupUserSubscriptionRepository.create({ groupId, sec_uid })
      await this.groupUserSubscriptionRepository.save(subscription)
    }

    return subscription
  }

  /**
   * 取消订阅抖音用户
   * @param groupId 群组ID
   * @param sec_uid 抖音用户sec_uid
   */
  async unsubscribeDouyinUser (groupId: string, sec_uid: string) {
    const result = await this.groupUserSubscriptionRepository.delete({ groupId, sec_uid })

    // 清除相关的作品缓存
    await this.awemeCacheRepository.delete({ groupId, sec_uid })

    return result.affected! > 0
  }

  /**
   * 添加作品缓存
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async addAwemeCache (aweme_id: string, sec_uid: string, groupId: string) {
    let cache = await this.awemeCacheRepository.findOne({
      where: { aweme_id, sec_uid, groupId }
    })
    if (!cache) {
      cache = this.awemeCacheRepository.create({ aweme_id, sec_uid, groupId })
      await this.awemeCacheRepository.save(cache)
    }
    return cache
  }

  /**
   * 检查作品是否已推送
   * @param aweme_id 作品ID
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isAwemePushed (aweme_id: string, sec_uid: string, groupId: string) {
    const count = await this.awemeCacheRepository.count({
      where: { aweme_id, sec_uid, groupId }
    })
    return count > 0
  }

  /**
   * 获取机器人管理的所有群组
   * @param botId 机器人ID
   */
  async getBotGroups (botId: string) {
    return await this.groupRepository.find({ where: { botId } })
  }

  /**
   * 获取群组订阅的所有抖音用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions (groupId: string) {
    return await this.groupUserSubscriptionRepository.find({
      where: { groupId },
      relations: ['douyinUser']
    })
  }

  /**
   * 获取抖音用户的所有订阅群组
   * @param sec_uid 抖音用户sec_uid
   */
  async getUserSubscribedGroups (sec_uid: string) {
    // 获取所有订阅关系
    const subscriptions = await this.groupUserSubscriptionRepository.find({
      where: { sec_uid }
    })

    // 如果没有订阅关系，返回空数组
    if (subscriptions.length === 0) {
      return []
    }

    // 提取所有群组ID
    const groupIds = subscriptions.map(sub => sub.groupId)

    // 获取这些群组的详细信息
    const groups = await this.groupRepository.find({
      where: { id: In(groupIds) }
    })

    return groups
  }

  /**
   * 检查群组是否已订阅抖音用户
   * @param sec_uid 抖音用户sec_uid
   * @param groupId 群组ID
   */
  async isSubscribed (sec_uid: string, groupId: string) {
    const count = await this.groupUserSubscriptionRepository.count({
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
    return await this.douyinUserRepository.findOne({ where: { sec_uid } })
  }

  /**
   * 更新用户直播状态
   * @param sec_uid 抖音用户sec_uid
   * @param living 是否正在直播
   */
  async updateLiveStatus (sec_uid: string, living: boolean) {
    const user = await this.douyinUserRepository.findOne({ where: { sec_uid } })
    if (!user) return false

    user.living = living
    await this.douyinUserRepository.save(user)

    return true
  }

  /**
   * 获取用户直播状态
   * @param sec_uid 抖音用户sec_uid
   */
  async getLiveStatus (sec_uid: string) {
    const user = await this.douyinUserRepository.findOne({ where: { sec_uid } })
    if (!user) return { living: false }

    return { living: user.living }
  }

  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions (configItems: douyinPushItem[]) {
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
    const allGroups = await this.groupRepository.find()

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
    const allUsers = await this.douyinUserRepository.find()

    for (const user of allUsers) {
      const sec_uid = user.sec_uid

      // 检查该用户是否还有群组订阅
      const subscribedGroups = await this.getUserSubscribedGroups(sec_uid)

      if (subscribedGroups.length === 0) {
        // 删除该用户的过滤词和过滤标签
        await this.filterWordRepository.delete({ sec_uid })
        await this.filterTagRepository.delete({ sec_uid })

        // 删除该用户记录
        await this.douyinUserRepository.delete({ sec_uid })

        logger.mark(`已删除抖音用户 ${sec_uid} 的记录及相关过滤设置（不再被任何群组订阅）`)
      }
    }
  }

  /**
   * 通过ID获取群组信息
   * @param groupId 群组ID
   */
  async getGroupById (groupId: string) {
    return await this.groupRepository.findOne({ where: { id: groupId } })
  }

  /**
   * 更新用户的过滤模式
   * @param sec_uid 抖音用户sec_uid
   * @param filterMode 过滤模式
   */
  async updateFilterMode (sec_uid: string, filterMode: 'blacklist' | 'whitelist') {
    const user = await this.getOrCreateDouyinUser(sec_uid)
    user.filterMode = filterMode
    await this.douyinUserRepository.save(user)
    return user
  }

  /**
   * 添加过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async addFilterWord (sec_uid: string, word: string) {
    await this.getOrCreateDouyinUser(sec_uid)
    let filterWord = await this.filterWordRepository.findOne({
      where: { sec_uid, word }
    })
    if (!filterWord) {
      filterWord = this.filterWordRepository.create({ sec_uid, word })
      await this.filterWordRepository.save(filterWord)
    }
    return filterWord
  }

  /**
   * 删除过滤词
   * @param sec_uid 抖音用户sec_uid
   * @param word 过滤词
   */
  async removeFilterWord (sec_uid: string, word: string) {
    const result = await this.filterWordRepository.delete({ sec_uid, word })
    return result.affected! > 0
  }

  /**
   * 添加过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async addFilterTag (sec_uid: string, tag: string) {
    await this.getOrCreateDouyinUser(sec_uid)
    let filterTag = await this.filterTagRepository.findOne({
      where: { sec_uid, tag }
    })
    if (!filterTag) {
      filterTag = this.filterTagRepository.create({ sec_uid, tag })
      await this.filterTagRepository.save(filterTag)
    }
    return filterTag
  }

  /**
   * 删除过滤标签
   * @param sec_uid 抖音用户sec_uid
   * @param tag 过滤标签
   */
  async removeFilterTag (sec_uid: string, tag: string) {
    const result = await this.filterTagRepository.delete({ sec_uid, tag })
    return result.affected! > 0
  }

  /**
   * 获取用户的所有过滤词
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterWords (sec_uid: string) {
    const filterWords = await this.filterWordRepository.find({ where: { sec_uid } })
    return filterWords.map(word => word.word)
  }

  /**
   * 获取用户的所有过滤标签
   * @param sec_uid 抖音用户sec_uid
   */
  async getFilterTags (sec_uid: string) {
    const filterTags = await this.filterTagRepository.find({ where: { sec_uid } })
    return filterTags.map(tag => tag.tag)
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

    logger.debug(`
      作者：${PushItem.remark}
      检查内容：${desc}
      命中词：${filterWords.join(', ')}
      命中标签：${filterTags.join(', ')}
      过滤模式：${filterMode}
      是否过滤：${(hasFilterWord || hasFilterTag) ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
      作品地址：${logger.green(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}
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
