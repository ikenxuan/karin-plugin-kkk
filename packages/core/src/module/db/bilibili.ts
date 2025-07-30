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
  JoinColumn,
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
import { BilibiliPushItem, DynamicType } from '@/platform/bilibili/push'
import { bilibiliPushItem } from '@/types/config/pushlist'

/** Bots表 - 存储机器人信息 */
@Entity('Bots')
class Bot {
  @PrimaryColumn({ type: 'varchar', comment: '机器人ID' })
  id!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @OneToMany(() => Group, group => group.bot)
  groups!: Group[]
}

/** Groups表 - 存储群组信息 */
@Entity('Groups')
class Group {
  @PrimaryColumn({ type: 'varchar', comment: '群组ID' })
  id!: string

  @Column({ type: 'varchar', comment: '所属机器人ID' })
  botId!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => Bot, bot => bot.groups)
  bot!: Bot

  @ManyToMany(() => BilibiliUser, user => user.groups)
  @JoinTable({
    name: 'GroupUserSubscriptions',
    joinColumn: { name: 'groupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'host_mid', referencedColumnName: 'host_mid' }
  })
  bilibiliUsers!: BilibiliUser[]

  @OneToMany(() => DynamicCache, cache => cache.group)
  dynamicCaches!: DynamicCache[]

  /** 订阅关系 */
  @OneToMany(() => GroupUserSubscription, subscription => subscription.group)
  subscriptions!: GroupUserSubscription[]
}

/** BilibiliUsers表 - 存储B站用户信息 */
@Entity('BilibiliUsers')
class BilibiliUser {
  @PrimaryColumn({ type: 'integer', comment: 'B站用户UID' })
  host_mid!: number

  @Column({ type: 'varchar', nullable: true, comment: 'B站用户昵称' })
  remark?: string

  @Column({
    type: 'varchar',
    default: 'blacklist',
    comment: '过滤模式：黑名单或白名单'
  })
  filterMode!: 'blacklist' | 'whitelist'

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToMany(() => Group, group => group.bilibiliUsers)
  groups!: Group[]

  @OneToMany(() => DynamicCache, cache => cache.bilibiliUser)
  dynamicCaches!: DynamicCache[]

  @OneToMany(() => FilterWord, word => word.bilibiliUser)
  filterWords!: FilterWord[]

  @OneToMany(() => FilterTag, tag => tag.bilibiliUser)
  filterTags!: FilterTag[]

  /** 订阅关系 */
  @OneToMany(() => GroupUserSubscription, subscription => subscription.bilibiliUser)
  subscriptions!: GroupUserSubscription[]
}

/** GroupUserSubscriptions表 - 存储群组订阅的B站用户关系 */
@Entity('GroupUserSubscriptions')
class GroupUserSubscription {
  @PrimaryColumn({ type: 'varchar', comment: '群组ID' })
  groupId!: string

  @PrimaryColumn({ type: 'integer', comment: 'B站用户UID' })
  host_mid!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  /** 关联的群组 */
  @ManyToOne(() => Group, group => group.subscriptions)
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
  group!: Group

  /** 关联的B站用户 */
  @ManyToOne(() => BilibiliUser, user => user.subscriptions)
  @JoinColumn({ name: 'host_mid', referencedColumnName: 'host_mid' })
  bilibiliUser!: BilibiliUser
}

/** DynamicCache表 - 存储已推送的动态ID */
@Entity('DynamicCaches')
class DynamicCache {
  @PrimaryGeneratedColumn({ comment: '缓存ID' })
  id!: number

  @Column({ type: 'varchar', comment: '动态ID' })
  dynamic_id!: string

  @Column({ type: 'integer', comment: 'B站用户UID' })
  host_mid!: number

  @Column({ type: 'varchar', comment: '群组ID' })
  groupId!: string

  @Column({ type: 'varchar', nullable: true, comment: '动态类型' })
  dynamic_type?: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => BilibiliUser, user => user.dynamicCaches)
  @JoinColumn({ name: 'host_mid', referencedColumnName: 'host_mid' })
  bilibiliUser!: BilibiliUser

  @ManyToOne(() => Group, group => group.dynamicCaches)
  @JoinColumn({ name: 'groupId', referencedColumnName: 'id' })
  group!: Group
}

/** FilterWords表 - 存储过滤词 */
@Entity('FilterWords')
class FilterWord {
  @PrimaryGeneratedColumn({ comment: '过滤词ID' })
  id!: number

  @Column({ type: 'integer', comment: 'B站用户UID' })
  host_mid!: number

  @Column({ type: 'varchar', comment: '过滤词' })
  word!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => BilibiliUser, user => user.filterWords)
  bilibiliUser!: BilibiliUser
}

/** FilterTags表 - 存储过滤标签 */
@Entity('FilterTags')
class FilterTag {
  @PrimaryGeneratedColumn({ comment: '过滤标签ID' })
  id!: number

  @Column({ type: 'integer', comment: 'B站用户UID' })
  host_mid!: number

  @Column({ type: 'varchar', comment: '过滤标签' })
  tag!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date

  @ManyToOne(() => BilibiliUser, user => user.filterTags)
  bilibiliUser!: BilibiliUser
}

/** TypeORM 数据源配置 */
const AppDataSource = new DataSource({
  type: 'sqlite',
  database: join(`${karinPathBase}/${Root.pluginName}/data`, 'bilibili.db'),
  synchronize: true,
  logging: false,
  entities: [Bot, Group, BilibiliUser, GroupUserSubscription, DynamicCache, FilterWord, FilterTag],
  migrations: [],
  subscribers: []
})

/** 数据库操作类 */
export class BilibiliDBBase {
  private botRepository!: Repository<Bot>
  private groupRepository!: Repository<Group>
  private bilibiliUserRepository!: Repository<BilibiliUser>
  private groupUserSubscriptionRepository!: Repository<GroupUserSubscription>
  dynamicCacheRepository!: Repository<DynamicCache>
  private filterWordRepository!: Repository<FilterWord>
  private filterTagRepository!: Repository<FilterTag>

  /**
   * 初始化数据库
   */
  async init () {
    try {
      logger.debug(logger.green('--------------------------[BilibiliDB] 开始初始化数据库--------------------------'))
      logger.debug('[BilibiliDB] 正在连接数据库...')

      // 检查连接是否已经建立
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize()
        logger.debug('[BilibiliDB] 数据库连接成功')
      } else {
        logger.debug('[BilibiliDB] 数据库连接已存在，跳过初始化')
      }

      // 初始化 Repository
      this.botRepository = AppDataSource.getRepository(Bot)
      this.groupRepository = AppDataSource.getRepository(Group)
      this.bilibiliUserRepository = AppDataSource.getRepository(BilibiliUser)
      this.groupUserSubscriptionRepository = AppDataSource.getRepository(GroupUserSubscription)
      this.dynamicCacheRepository = AppDataSource.getRepository(DynamicCache)
      this.filterWordRepository = AppDataSource.getRepository(FilterWord)
      this.filterTagRepository = AppDataSource.getRepository(FilterTag)

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
   * 获取或创建B站用户记录
   * @param host_mid B站用户UID
   * @param remark UP主昵称
   */
  async getOrCreateBilibiliUser (host_mid: number, remark: string = '') {
    let user = await this.bilibiliUserRepository.findOne({ where: { host_mid } })
    if (!user) {
      user = this.bilibiliUserRepository.create({ host_mid, remark })
      await this.bilibiliUserRepository.save(user)
    } else if (remark && user.remark !== remark) {
      user.remark = remark
      await this.bilibiliUserRepository.save(user)
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

    let subscription = await this.groupUserSubscriptionRepository.findOne({
      where: { groupId, host_mid }
    })
    if (!subscription) {
      subscription = this.groupUserSubscriptionRepository.create({ groupId, host_mid })
      await this.groupUserSubscriptionRepository.save(subscription)
    }
    return subscription
  }

  /**
   * 取消订阅B站用户
   * @param groupId 群组ID
   * @param host_mid B站用户UID
   */
  async unsubscribeBilibiliUser (groupId: string, host_mid: number) {
    const result = await this.groupUserSubscriptionRepository.delete({ groupId, host_mid })

    // 清除相关的动态缓存
    await this.dynamicCacheRepository.delete({ groupId, host_mid })

    return result.affected! > 0
  }

  /**
   * 添加动态缓存
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   * @param dynamic_type 动态类型
   */
  async addDynamicCache (dynamic_id: string, host_mid: number, groupId: string, dynamic_type: string) {
    let cache = await this.dynamicCacheRepository.findOne({
      where: { dynamic_id, host_mid, groupId }
    })
    if (!cache) {
      cache = this.dynamicCacheRepository.create({ dynamic_id, host_mid, groupId, dynamic_type })
      await this.dynamicCacheRepository.save(cache)
    }
    return cache
  }

  /**
   * 检查动态是否已推送
   * @param dynamic_id 动态ID
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isDynamicPushed (dynamic_id: string, host_mid: number, groupId: string) {
    const count = await this.dynamicCacheRepository.count({
      where: { dynamic_id, host_mid, groupId }
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
   * 获取群组订阅的所有B站用户
   * @param groupId 群组ID
   */
  async getGroupSubscriptions (groupId: string) {
    return await this.groupUserSubscriptionRepository.find({
      where: { groupId },
      relations: ['bilibiliUser']
    })
  }

  /**
   * 获取B站用户的所有订阅群组
   * @param host_mid B站用户UID
   */
  async getUserSubscribedGroups (host_mid: number) {
    // 获取所有订阅关系
    const subscriptions = await this.groupUserSubscriptionRepository.find({
      where: { host_mid }
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
   * 获取群组的动态缓存
   * @param groupId 群组ID
   * @param host_mid 可选的B站用户UID过滤
   */
  async getGroupDynamicCache (groupId: string, host_mid?: number) {
    const where: any = { groupId }
    if (host_mid) where.host_mid = host_mid

    return await this.dynamicCacheRepository.find({
      where,
      order: { createdAt: 'DESC' }
    })
  }

  /**
   * 检查群组是否已订阅B站用户
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
  async isSubscribed (host_mid: number, groupId: string) {
    const count = await this.groupUserSubscriptionRepository.count({
      where: { host_mid, groupId }
    })
    return count > 0
  }

  /**
   * 批量同步配置文件中的订阅到数据库
   * @param configItems 配置文件中的订阅项
   */
  async syncConfigSubscriptions (configItems: bilibiliPushItem[]) {
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
    const allGroups = await this.groupRepository.find()

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
    const allUsers = await this.bilibiliUserRepository.find()

    for (const user of allUsers) {
      const host_mid = user.host_mid

      // 检查该UP主是否还有群组订阅
      const subscribedGroups = await this.getUserSubscribedGroups(host_mid)

      if (subscribedGroups.length === 0) {
        // 删除该UP主的过滤词和过滤标签
        await this.filterWordRepository.delete({ host_mid })
        await this.filterTagRepository.delete({ host_mid })

        // 删除该UP主记录
        await this.bilibiliUserRepository.delete({ host_mid })

        logger.mark(`已删除UP主 ${host_mid} 的记录及相关过滤设置（不再被任何群组订阅）`)
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
    user.filterMode = filterMode
    await this.bilibiliUserRepository.save(user)
    return user
  }

  /**
   * 添加过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async addFilterWord (host_mid: number, word: string) {
    await this.getOrCreateBilibiliUser(host_mid)
    let filterWord = await this.filterWordRepository.findOne({ where: { host_mid, word } })
    if (!filterWord) {
      filterWord = this.filterWordRepository.create({ host_mid, word })
      await this.filterWordRepository.save(filterWord)
    }
    return filterWord
  }

  /**
   * 删除过滤词
   * @param host_mid B站用户UID
   * @param word 过滤词
   */
  async removeFilterWord (host_mid: number, word: string) {
    const result = await this.filterWordRepository.delete({ host_mid, word })
    return result.affected! > 0
  }

  /**
   * 添加过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async addFilterTag (host_mid: number, tag: string) {
    await this.getOrCreateBilibiliUser(host_mid)
    let filterTag = await this.filterTagRepository.findOne({ where: { host_mid, tag } })
    if (!filterTag) {
      filterTag = this.filterTagRepository.create({ host_mid, tag })
      await this.filterTagRepository.save(filterTag)
    }
    return filterTag
  }

  /**
   * 删除过滤标签
   * @param host_mid B站用户UID
   * @param tag 过滤标签
   */
  async removeFilterTag (host_mid: number, tag: string) {
    const result = await this.filterTagRepository.delete({ host_mid, tag })
    return result.affected! > 0
  }

  /**
   * 获取用户的所有过滤词
   * @param host_mid B站用户UID
   */
  async getFilterWords (host_mid: number) {
    const filterWords = await this.filterWordRepository.find({ where: { host_mid } })
    return filterWords.map(word => word.word)
  }

  /**
   * 获取用户的所有过滤标签
   * @param host_mid B站用户UID
   */
  async getFilterTags (host_mid: number) {
    const filterTags = await this.filterTagRepository.find({ where: { host_mid } })
    return filterTags.map(tag => tag.tag)
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
    if (dynamicData.type === DynamicType.FORWARD && 'orig' in dynamicData) {
      if (dynamicData.orig.type === DynamicType.AV) {
        text += dynamicData.orig.modules.module_dynamic.major.archive.title + ''
      } else {
        text += dynamicData.orig.modules.module_dynamic.desc.text + ' '
        for (const node of dynamicData.orig.modules.module_dynamic.desc.rich_text_nodes) {
          tags.push(node.orig_text)
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
    // 如果是直播动态，不过滤
    if (PushItem.Dynamic_Data.type === DynamicType.LIVE_RCMD) {
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
    if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && 'orig' in PushItem.Dynamic_Data) {
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

    logger.debug(`
    UP主UID：${PushItem.host_mid}
    检查内容：${allText}
    检查标签：${allTags.join(', ')}
    命中词：${filterWords.join(', ')}
    命中标签：${filterTags.join(', ')}
    过滤模式：${filterMode}
    是否过滤：${(hasFilterWord || hasFilterTag) ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}
    动态地址：${logger.green(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}
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
}
