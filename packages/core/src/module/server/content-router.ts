import { getBilibiliData, getDouyinData } from '@ikenxuan/amagi'
import type { RequestHandler } from 'express'
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  getBot,
  logger
} from 'node-karin'

import { getBilibiliDB, getDouyinDB } from '@/module/db'
import { Config } from '@/module/utils/Config'

/**
 * 内容项接口定义
 */
interface ContentItem {
  /** 内容ID */
  id: string
  /** 平台类型 */
  platform: 'douyin' | 'bilibili'
  /** 标题 */
  title: string
  /** 作者 */
  author: string
  /** 头像 */
  avatar: string
  /** 发布时间 */
  publishTime: string
  /** 缩略图 */
  thumbnail: string
  /** 内容类型 */
  type: 'video' | 'note' | 'dynamic'
  /** 是否已屏蔽 */
  isBlocked: boolean
  /** 推送状态 */
  pushStatus: 'pending' | 'success' | 'failed' | 'blocked'
  /** 创建时间 */
  createdAt: string
}

/**
 * 群组信息接口定义
 */
interface GroupInfo {
  /** 群组ID */
  id: string
  /** 群组名称 */
  name: string
  /** 机器人ID */
  botId: string
  /** 群头像 */
  avatar: string
  /** 订阅数量统计 */
  subscriptionCount: {
    /** 抖音订阅数 */
    douyin: number
    /** B站订阅数 */
    bilibili: number
  }
}

/**
 * 作者选项接口定义
 */
interface AuthorOption {
  /** 用户ID */
  id: string
  /** 显示名称 */
  name: string
  /** 头像 */
  avatar: string
  /** 平台类型 */
  platform: 'douyin' | 'bilibili'
}

/**
 * 获取所有已订阅推送功能的群组列表
 * @param req 请求对象
 * @param res 响应对象
 */
export const getGroupsRouter: RequestHandler = async (req, res) => {
  try {
    const douyinDB = await getDouyinDB()
    const bilibiliDB = await getBilibiliDB()

    // 获取两个数据库中的所有群组
    const [douyinGroups, bilibiliGroups] = await Promise.all([
      douyinDB.groupRepository.find(),
      bilibiliDB.groupRepository.find()
    ])

    // 合并群组并去重（使用Map以群组ID为key）
    const allGroupsMap = new Map<string, { id: string; botId: string }>()

    // 添加抖音群组
    douyinGroups.forEach(group => {
      allGroupsMap.set(group.id, { id: group.id, botId: group.botId })
    })

    // 添加B站群组（如果已存在则保持原有的，确保botId一致性）
    bilibiliGroups.forEach(group => {
      if (!allGroupsMap.has(group.id)) {
        allGroupsMap.set(group.id, { id: group.id, botId: group.botId })
      }
    })

    const groupList: GroupInfo[] = []

    for (const group of allGroupsMap.values()) {
      // 获取该群组的抖音订阅数
      const douyinSubscriptions = await douyinDB.getGroupSubscriptions(group.id)
      // 获取该群组的B站订阅数
      const bilibiliSubscriptions = await bilibiliDB.getGroupSubscriptions(group.id)

      // 只有有订阅的群组才返回
      if (douyinSubscriptions.length > 0 || bilibiliSubscriptions.length > 0) {
        const bot = getBot(group.botId)!
        const groupInfo = await bot.getGroupInfo(group.id)
        const groupAvatarUrl = await bot.getGroupAvatarUrl(group.id)
        groupList.push({
          id: group.id,
          name: groupInfo.groupName || `群组${group.id}`,
          avatar: groupAvatarUrl,
          botId: group.botId,
          subscriptionCount: {
            douyin: douyinSubscriptions.length,
            bilibili: bilibiliSubscriptions.length
          }
        })
      }
    }

    return createSuccessResponse(res, groupList)
  } catch (error) {
    logger.error('获取群组列表失败:', error)
    return createServerErrorResponse(res, '获取群组列表失败')
  }
}
/**
 * 获取群组的作者选项列表
 * @param req 请求对象
 * @param res 响应对象
 */
export const getAuthorsRouter: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.query

    if (!groupId) {
      return createBadRequestResponse(res, '请提供群组ID')
    }

    const douyinDB = await getDouyinDB()
    const bilibiliDB = await getBilibiliDB()

    // 并发获取订阅数据
    const [douyinSubscriptions, bilibiliSubscriptions] = await Promise.all([
      douyinDB.getGroupSubscriptions(groupId as string),
      bilibiliDB.getGroupSubscriptions(groupId as string)
    ])

    /**
     * 并发获取抖音用户数据
     * @param subscriptions 抖音订阅列表
     * @returns Promise<AuthorOption[]> 作者选项数组
     */
    const fetchDouyinAuthors = async (subscriptions: any[]): Promise<AuthorOption[]> => {
      // 过滤出有效的订阅
      const validSubscriptions = subscriptions.filter(sub => sub.douyinUser)

      if (validSubscriptions.length === 0) {
        return []
      }

      const batchSize = 5 // 每批最多5个并发请求
      const results: AuthorOption[] = []

      for (let i = 0; i < validSubscriptions.length; i += batchSize) {
        const batch = validSubscriptions.slice(i, i + batchSize)

        // 并发处理当前批次
        const batchPromises = batch.map(async (subscription) => {
          try {
            const userProfile = await getDouyinData(
              '用户主页数据',
              { sec_uid: subscription.douyinUser.sec_uid, typeMode: 'strict' },
              Config.cookies.douyin
            )

            return {
              id: subscription.douyinUser.sec_uid,
              name: subscription.douyinUser.remark || subscription.douyinUser.short_id || subscription.douyinUser.sec_uid,
              avatar: userProfile.data.user.avatar_larger.url_list[0],
              platform: 'douyin' as const
            }
          } catch (error) {
            logger.warn(`获取抖音用户数据失败 (${subscription.douyinUser.sec_uid}):`, error)
            return {
              id: subscription.douyinUser.sec_uid,
              name: subscription.douyinUser.remark || subscription.douyinUser.short_id || subscription.douyinUser.sec_uid,
              avatar: '',
              platform: 'douyin' as const
            }
          }
        })

        const batchResults = await Promise.all(batchPromises)
        results.push(...batchResults)
      }

      return results
    }

    /**
     * 并发获取B站用户数据
     * @param subscriptions B站订阅列表
     * @returns Promise<AuthorOption[]> 作者选项数组
     */
    const fetchBilibiliAuthors = async (subscriptions: any[]): Promise<AuthorOption[]> => {
      // 过滤出有效的订阅
      const validSubscriptions = subscriptions.filter(sub => sub.bilibiliUser)

      if (validSubscriptions.length === 0) {
        return []
      }

      const batchSize = 5 // 每批最多5个并发请求
      const results: AuthorOption[] = []

      for (let i = 0; i < validSubscriptions.length; i += batchSize) {
        const batch = validSubscriptions.slice(i, i + batchSize)

        // 并发处理当前批次
        const batchPromises = batch.map(async (subscription) => {
          try {
            const userProfile = await getBilibiliData(
              '用户主页数据',
              { host_mid: subscription.bilibiliUser.host_mid, typeMode: 'strict' },
              Config.cookies.bilibili
            )

            return {
              id: subscription.bilibiliUser.host_mid.toString(),
              name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
              avatar: userProfile.data.data.card.face,
              platform: 'bilibili' as const
            }
          } catch (error) {
            logger.warn(`获取B站用户数据失败 (${subscription.bilibiliUser.host_mid}):`, error)
            return {
              id: subscription.bilibiliUser.host_mid.toString(),
              name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
              avatar: '',
              platform: 'bilibili' as const
            }
          }
        })

        const batchResults = await Promise.all(batchPromises)
        results.push(...batchResults)
      }

      return results
    }

    const [douyinAuthors, bilibiliAuthors] = await Promise.all([
      fetchDouyinAuthors(douyinSubscriptions),
      fetchBilibiliAuthors(bilibiliSubscriptions)
    ])

    const authorOptions = [...douyinAuthors, ...bilibiliAuthors]

    return createSuccessResponse(res, authorOptions)
  } catch (error) {
    logger.error('获取作者列表失败:', error)
    return createServerErrorResponse(res, '获取作者列表失败')
  }
}

/**
 * 获取抖音内容列表的路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const getDouyinContentRouter: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.query

    if (!groupId) {
      return createBadRequestResponse(res, '请提供群组ID')
    }

    const douyinDB = await getDouyinDB()
    // 修复：确保正确加载关联的douyinUser数据
    const caches = await douyinDB.awemeCacheRepository.find({
      where: { groupId: groupId as string },
      relations: ['douyinUser'],
      order: { createdAt: 'DESC' },
      take: 100
    })

    const contentList: ContentItem[] = await Promise.all(caches.map(async cache => {
      // 确保获取到正确的作者信息
      let authorName = cache.sec_uid
      if (cache.douyinUser) {
        authorName = cache.douyinUser.remark || cache.douyinUser.short_id || cache.douyinUser.sec_uid
      }
      const userProfile = await getDouyinData('用户主页数据', { sec_uid: cache.douyinUser.sec_uid, typeMode: 'strict' }, Config.cookies.douyin)

      return {
        id: cache.aweme_id,
        platform: 'douyin' as const,
        title: `抖音作品 ${cache.aweme_id}`,
        author: authorName,
        avatar: userProfile.data?.user?.avatar_larger?.url_list[0] || '',
        publishTime: cache.createdAt.toISOString(),
        thumbnail: '',
        type: 'video' as const,
        isBlocked: false,
        pushStatus: 'success' as const,
        createdAt: cache.createdAt.toISOString()
      }
    }))

    return createSuccessResponse(res, contentList)
  } catch (error) {
    logger.error('获取抖音内容列表失败:', error)
    return createServerErrorResponse(res, '获取抖音内容列表失败: ' + error)
  }
}

/**
 * 获取B站内容列表的路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const getBilibiliContentRouter: RequestHandler = async (req, res) => {
  try {
    const { groupId } = req.query

    if (!groupId) {
      return createBadRequestResponse(res, '请提供群组ID')
    }

    const bilibiliDB = await getBilibiliDB()
    const caches = await bilibiliDB.dynamicCacheRepository.find({
      where: { groupId: groupId as string },
      relations: ['bilibiliUser'],
      order: { createdAt: 'DESC' },
      take: 100
    })

    const contentList: ContentItem[] = await Promise.all(caches.map(async cache => {
      // 确保获取到正确的作者信息
      let authorName = cache.host_mid.toString()
      if (cache.bilibiliUser) {
        authorName = cache.bilibiliUser.remark || cache.host_mid.toString()
      }
      const userProfile = await getBilibiliData('用户主页数据', { host_mid: cache.host_mid, typeMode: 'strict' }, Config.cookies.bilibili)

      return {
        id: cache.dynamic_id,
        platform: 'bilibili' as const,
        title: `B站动态 ${cache.dynamic_id}`,
        author: authorName,
        avatar: userProfile.data?.data?.card?.face || '',
        publishTime: cache.createdAt.toISOString(),
        thumbnail: '',
        type: 'dynamic' as const,
        isBlocked: false,
        pushStatus: 'success' as const,
        createdAt: cache.createdAt.toISOString()
      }
    }))

    return createSuccessResponse(res, contentList)
  } catch (error) {
    logger.error('获取B站内容列表失败:', error)
    return createServerErrorResponse(res, '获取B站内容列表失败: ' + error)
  }
}

/**
 * 添加抖音内容的路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const addDouyinContentRouter: RequestHandler = async (req, res) => {
  try {
    const { contentId, groupId, authorId } = req.body

    if (!contentId || !groupId || !authorId) {
      return createBadRequestResponse(res, '请提供内容ID、群组ID和作者ID')
    }

    const douyinDB = await getDouyinDB()
    await douyinDB.addAwemeCache(contentId, authorId, groupId)

    return createSuccessResponse(res, { message: '添加成功' })
  } catch (error) {
    logger.error('添加抖音内容失败:', error)
    return createServerErrorResponse(res, '添加抖音内容失败')
  }
}

/**
 * 添加B站内容的路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const addBilibiliContentRouter: RequestHandler = async (req, res) => {
  try {
    const { contentId, groupId, authorId } = req.body

    if (!contentId || !groupId || !authorId) {
      return createBadRequestResponse(res, '请提供内容ID、群组ID和作者ID')
    }

    const bilibiliDB = await getBilibiliDB()
    const host_mid = parseInt(authorId)
    await bilibiliDB.addDynamicCache(contentId, host_mid, groupId, 'manual')

    return createSuccessResponse(res, { message: '添加成功' })
  } catch (error) {
    logger.error('添加B站内容失败:', error)
    return createServerErrorResponse(res, '添加B站内容失败')
  }
}

/**
 * 删除内容的路由处理器
 * @param req 请求对象
 * @param res 响应对象
 */
export const deleteContentRouter: RequestHandler = async (req, res) => {
  try {
    const { id, platform, groupId } = req.body

    if (!id || !platform || !groupId) {
      return createBadRequestResponse(res, '请提供内容ID、平台类型和群组ID')
    }

    if (platform === 'douyin') {
      const douyinDB = await getDouyinDB()
      await douyinDB.awemeCacheRepository.delete({ aweme_id: id, groupId })
    } else if (platform === 'bilibili') {
      const bilibiliDB = await getBilibiliDB()
      await bilibiliDB.dynamicCacheRepository.delete({ dynamic_id: id, groupId })
    }

    return createSuccessResponse(res, { message: '删除成功' })
  } catch (error) {
    logger.error('删除内容失败:', error)
    return createServerErrorResponse(res, '删除内容失败')
  }
}
