import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  getBot,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { getBilibiliDB, getDouyinDB } from '@/module/db'
import { AmagiError, getBilibiliData, getDouyinData } from '@/module/utils/amagiClient'

/**
 * 创建风控错误响应
 * @param res 响应对象
 * @param geetest 极验验证参数
 * @param token 验证 token
 * @param v_voucher 原始 v_voucher
 */
const createRiskControlResponse = (
  res: Parameters<RequestHandler>[1],
  geetest: { gt: string; challenge: string },
  token: string,
  v_voucher: string
) => {
  return res.status(452).json({
    message: 'B站风控验证',
    code: -352,
    data: {
      type: 'bilibili_risk_control',
      geetest,
      token,
      v_voucher
    }
  })
}

/**
 * 创建无法验证的风控错误响应
 * 当 -352 错误没有 v_voucher 时使用
 */
const createRiskControlNoVoucherResponse = (
  res: Parameters<RequestHandler>[1],
  code: number
) => {
  return res.status(452).json({
    message: 'B站风控',
    code,
    data: {
      type: 'bilibili_risk_control_no_voucher',
      message: code === -352 
        ? 'B站风控校验失败，请稍后重试或更换 Cookie'
        : '当前IP被B站风控，请稍后重试或更换网络'
    }
  })
}

/**
 * 处理 B站风控错误（保留备用）
 * 检测 -352 和 -412 错误并申请验证码
 * @param error 错误对象
 * @param res 响应对象
 * @returns 是否已处理风控错误
 */
const _handleBilibiliRiskControl = async (
  error: unknown,
  res: Parameters<RequestHandler>[1]
): Promise<boolean> => {
  if (!(error instanceof AmagiError)) {
    return false
  }

  // -352: 风控校验失败, -412: IP被风控
  if (error.code !== -352 && error.code !== -412) {
    return false
  }

  const v_voucher = error.data?.data?.v_voucher
  if (!v_voucher) {
    // 没有 v_voucher，无法申请验证码，返回特定错误
    logger.info(`[ContentRouter] 检测到B站风控(${error.code})，但无 v_voucher，无法申请验证码`)
    createRiskControlNoVoucherResponse(res, error.code)
    return true
  }

  try {
    logger.info(`[ContentRouter] 检测到B站风控(${error.code})，申请验证码...`)
    const verification = await getBilibiliData('从_v_voucher_申请_captcha', {
      v_voucher,
      typeMode: 'strict'
    })

    if (!verification.data?.data?.geetest) {
      logger.error('[ContentRouter] 申请验证码失败')
      createRiskControlNoVoucherResponse(res, error.code)
      return true
    }

    const geetest = verification.data.data.geetest
    const token = verification.data.data.token

    createRiskControlResponse(res, {
      gt: geetest.gt,
      challenge: geetest.challenge
    }, token, v_voucher)

    return true
  } catch (err) {
    logger.error('[ContentRouter] 申请验证码异常:', err)
    createRiskControlNoVoucherResponse(res, error.code)
    return true
  }
}

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
  /** Bot是否在线 */
  isOnline: boolean
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
        const bot = getBot(group.botId)
        
        let groupName = group.id
        let groupAvatarUrl = ''
        let isOnline = true

        if (!bot) {
          isOnline = false
        } else {
          try {
            const groupInfo = await bot.getGroupInfo(group.id)
            if (groupInfo) {
              groupName = groupInfo.groupName || groupName
            }
            groupAvatarUrl = await bot.getGroupAvatarUrl(group.id) || ''
          } catch (e) {
            logger.warn(`Failed to fetch group info for ${group.id}:`, e)
          }
        }

        groupList.push({
          id: group.id,
          name: groupName,
          avatar: groupAvatarUrl,
          botId: group.botId,
          isOnline,
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
              { sec_uid: subscription.douyinUser.sec_uid, typeMode: 'strict' }
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
     * 串行获取B站用户数据（遇到风控停止获取头像，但不影响返回列表）
     * @param subscriptions B站订阅列表
     * @returns Promise<AuthorOption[]> 作者选项数组
     */
    const fetchBilibiliAuthors = async (subscriptions: any[]): Promise<AuthorOption[]> => {
      const validSubscriptions = subscriptions.filter(sub => sub.bilibiliUser)

      if (validSubscriptions.length === 0) {
        return []
      }

      const results: AuthorOption[] = []
      let hitRiskControl = false

      // 串行获取，遇到风控停止获取头像但继续返回列表
      for (const subscription of validSubscriptions) {
        if (hitRiskControl) {
          // 风控后直接使用空头像
          results.push({
            id: subscription.bilibiliUser.host_mid.toString(),
            name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
            avatar: '',
            platform: 'bilibili' as const
          })
          continue
        }

        try {
          const userProfile = await getBilibiliData(
            '用户主页数据',
            { host_mid: subscription.bilibiliUser.host_mid, typeMode: 'strict' }
          )

          results.push({
            id: subscription.bilibiliUser.host_mid.toString(),
            name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
            avatar: userProfile.data.data.card.face,
            platform: 'bilibili' as const
          })
        } catch (error) {
          // 风控错误，标记并停止后续头像获取
          if (error instanceof AmagiError && (error.code === -352 || error.code === -412)) {
            logger.warn(`[ContentRouter] 获取作者头像时遇到风控(${error.code})`)
            hitRiskControl = true
          }
          results.push({
            id: subscription.bilibiliUser.host_mid.toString(),
            name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
            avatar: '',
            platform: 'bilibili' as const
          })
        }
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
    const caches = await douyinDB.awemeCacheRepository.find<{
      id: number
      aweme_id: string
      sec_uid: string
      groupId: string
      createdAt: Date
      updatedAt: Date
      douyinUser?: any
    }>({
      where: { groupId: groupId as string },
      relations: ['douyinUser'],
      order: { createdAt: 'DESC' },
      take: 100
    })

    const contentList: ContentItem[] = await Promise.all(caches.map(async cache => {
      // 确保获取到正确的作者信息
      let authorName = cache.sec_uid
      let avatarUrl = ''
      
      if (cache.douyinUser) {
        authorName = cache.douyinUser.remark || cache.douyinUser.short_id || cache.douyinUser.sec_uid
        try {
          const userProfile = await getDouyinData('用户主页数据', { sec_uid: cache.douyinUser.sec_uid, typeMode: 'strict' })
          avatarUrl = userProfile.data?.user?.avatar_larger?.url_list[0] || ''
        } catch {
          // 获取用户头像失败，使用空字符串
        }
      }

      return {
        id: cache.aweme_id,
        platform: 'douyin' as const,
        title: `抖音作品 ${cache.aweme_id}`,
        author: authorName,
        avatar: avatarUrl,
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
    const caches = await bilibiliDB.dynamicCacheRepository.find<{
      id: number,
      dynamic_id: string,
      host_mid: number,
      groupId: string,
      dynamic_type?: string,
      createdAt: Date,
      updatedAt: Date,
      bilibiliUser?: any
    }>({
      where: { groupId: groupId as string },
      relations: ['bilibiliUser'],
      order: { createdAt: 'DESC' },
      take: 100
    })

    // 收集所有不重复的 host_mid
    const uniqueMids = [...new Set(caches.map(c => c.host_mid))]
    
    // 缓存已获取的头像
    const avatarCache = new Map<number, string>()
    
    // 串行获取每个用户的头像，遇到风控就停止获取头像（但不影响返回列表）
    let hitRiskControl = false
    for (const mid of uniqueMids) {
      if (hitRiskControl) {
        avatarCache.set(mid, '')
        continue
      }
      
      try {
        const userProfile = await getBilibiliData('用户主页数据', { host_mid: mid, typeMode: 'strict' })
        avatarCache.set(mid, userProfile.data?.data?.card?.face || '')
      } catch (error) {
        // 风控错误，标记并停止后续头像获取，但继续返回列表
        if (error instanceof AmagiError && (error.code === -352 || error.code === -412)) {
          logger.warn(`[ContentRouter] 获取头像时遇到风控(${error.code})，后续头像将使用空值`)
          hitRiskControl = true
        }
        avatarCache.set(mid, '')
      }
    }

    // 构建内容列表（始终返回，即使头像获取失败）
    const contentList: ContentItem[] = caches.map(cache => {
      let authorName = cache.host_mid.toString()
      if (cache.bilibiliUser) {
        authorName = cache.bilibiliUser.remark || cache.host_mid.toString()
      }

      return {
        id: cache.dynamic_id,
        platform: 'bilibili' as const,
        title: `B站动态 ${cache.dynamic_id}`,
        author: authorName,
        avatar: avatarCache.get(cache.host_mid) || '',
        publishTime: cache.createdAt.toISOString(),
        thumbnail: '',
        type: 'dynamic' as const,
        isBlocked: false,
        pushStatus: 'success' as const,
        createdAt: cache.createdAt.toISOString()
      }
    })

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
    
    // 检查用户是否存在于数据库中（以 sec_uid 为准）
    const user = await douyinDB.getDouyinUser(authorId)
    if (!user) {
      return createBadRequestResponse(res, '该作者未在订阅列表中，请先添加订阅')
    }

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
    
    // 检查用户是否存在于数据库中（以 host_mid 为准）
    const user = await bilibiliDB.getBilibiliUser(host_mid)
    if (!user) {
      return createBadRequestResponse(res, '该UP主未在订阅列表中，请先添加订阅')
    }

    await bilibiliDB.addDynamicCache(contentId, host_mid, groupId, 'manual')

    return createSuccessResponse(res, { message: '添加成功' })
  } catch (error) {
    logger.error('添加B站内容失败:', error)
    return createServerErrorResponse(res, '添加B站内容失败')
  }
}

/**
 * 删除内容的路由处理器
 * 只删除指定群组中的内容，不影响其他群组
 * @param req 请求对象
 * @param res 响应对象
 */
export const deleteContentRouter: RequestHandler = async (req, res) => {
  try {
    const { id, platform, groupId } = req.body

    if (!id || !platform || !groupId) {
      return createBadRequestResponse(res, '请提供内容ID、平台类型和群组ID')
    }

    let affected = 0

    if (platform === 'douyin') {
      const douyinDB = await getDouyinDB()
      // 使用 aweme_id + groupId 精确删除，只删除该群组的记录
      const result = await douyinDB.awemeCacheRepository.delete({ aweme_id: id, groupId })
      affected = result.affected
    } else if (platform === 'bilibili') {
      const bilibiliDB = await getBilibiliDB()
      // 使用 dynamic_id + groupId 精确删除，只删除该群组的记录
      const result = await bilibiliDB.dynamicCacheRepository.delete({ dynamic_id: id, groupId })
      affected = result.affected
    }

    if (affected === 0) {
      return createBadRequestResponse(res, '未找到要删除的内容')
    }

    return createSuccessResponse(res, { message: '删除成功', affected })
  } catch (error) {
    logger.error('删除内容失败:', error)
    return createServerErrorResponse(res, '删除内容失败')
  }
}


/**
 * B站风控验证结果提交接口
 * @param req 请求对象
 * @param res 响应对象
 */
export const verifyBilibiliCaptchaRouter: RequestHandler = async (req, res) => {
  try {
    const { challenge, token, validate, seccode } = req.body

    if (!challenge || !token || !validate || !seccode) {
      return createBadRequestResponse(res, '验证参数不完整')
    }

    logger.info('[ContentRouter] 提交B站风控验证结果...')

    const verifyResult = await getBilibiliData('验证验证码结果', {
      challenge,
      token,
      validate,
      seccode,
      typeMode: 'strict'
    })

    if (verifyResult.success && verifyResult.data?.data?.grisk_id) {
      logger.info(`[ContentRouter] 验证成功，grisk_id: ${verifyResult.data.data.grisk_id}`)
      return createSuccessResponse(res, { 
        success: true, 
        message: '验证成功',
        grisk_id: verifyResult.data.data.grisk_id 
      })
    }

    return createSuccessResponse(res, { 
      success: false, 
      message: '验证失败，请重试' 
    })
  } catch (error) {
    logger.error('[ContentRouter] 验证请求失败:', error)
    
    if (error instanceof AmagiError) {
      // csrf 校验失败
      if (error.code === -111) {
        return createSuccessResponse(res, { 
          success: false, 
          message: '验证失败，建议重新配置 B站 Cookie' 
        })
      }
      return createSuccessResponse(res, { 
        success: false, 
        message: error.rawError?.errorDescription || '验证失败' 
      })
    }
    
    return createServerErrorResponse(res, '验证请求失败')
  }
}
