import { getBilibiliData, getDouyinData } from '@ikenxuan/amagi'
import type { RequestHandler } from 'express'
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  getBot,
  logger
} from 'node-karin'

import { Config } from '@/module'
import { getBilibiliDB, getDouyinDB } from '@/module/db'

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

    // 获取所有群组
    const allGroups = await douyinDB.groupRepository.find()

    const groupList: GroupInfo[] = []

    for (const group of allGroups) {
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

    const authorOptions: AuthorOption[] = []

    // 获取抖音作者
    const douyinSubscriptions = await douyinDB.getGroupSubscriptions(groupId as string)
    for (const subscription of douyinSubscriptions) {
      if (subscription.douyinUser) {
        const userProfile = await getDouyinData('用户主页数据', { sec_uid: subscription.douyinUser.sec_uid, typeMode: 'strict' }, Config.cookies.douyin)

        authorOptions.push({
          id: subscription.douyinUser.sec_uid,
          name: subscription.douyinUser.remark || subscription.douyinUser.short_id || subscription.douyinUser.sec_uid,
          avatar: userProfile.data.user.avatar_larger.url_list[0],
          platform: 'douyin'
        })
      }
    }

    // 获取B站作者
    const bilibiliSubscriptions = await bilibiliDB.getGroupSubscriptions(groupId as string)
    for (const subscription of bilibiliSubscriptions) {
      if (subscription.bilibiliUser) {
        const userProfile = await getBilibiliData('用户主页数据', { host_mid: subscription.bilibiliUser.host_mid, typeMode: 'strict' }, Config.cookies.bilibili)

        authorOptions.push({
          id: subscription.bilibiliUser.host_mid.toString(),
          name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
          avatar: userProfile.data.data.card.face,
          platform: 'bilibili'
        })
      }
    }

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
        avatar: userProfile.data.user.avatar_larger.url_list[0],
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
    return createServerErrorResponse(res, '获取抖音内容列表失败')
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
    // 修复：确保正确加载关联的bilibiliUser数据
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
        avatar: userProfile.data.data.card.face,
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
    return createServerErrorResponse(res, '获取B站内容列表失败')
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
