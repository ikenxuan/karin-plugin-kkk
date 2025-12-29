/**
 * B站作品解析 API
 * 使用严格类型声明，支持所有动态类型
 */
import type {
  BiliDynamicCard,
  BiliDynamicInfoUnion,
  BiliEmojiList,
  BiliOneWork,
  BiliVideoPlayurlIsLogin,
  BiliWorkComments,
  DynamicTypeArticle,
  DynamicTypeAV,
  DynamicTypeDraw,
  DynamicTypeForwardUnion,
  DynamicTypeLiveRcmd,
  DynamicTypeWord
} from '@ikenxuan/amagi'
import { DynamicType } from '@ikenxuan/amagi'
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { getBilibiliData } from '@/module/utils/amagiClient'

import { handleBilibiliRiskControl } from './risk-control'

// ==================== 类型定义 ====================

/**
 * 评论信息
 */
interface CommentInfo {
  id: string
  author: string
  avatar: string
  content: string
  images?: string[]
  likes: number
  timestamp: string
}

/**
 * 解析后的作品信息
 */
export interface BilibiliWorkInfo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  views: string
  likes: string
  author: {
    name: string
    avatar: string
    id: string
  }
  type: 'video' | 'note' | 'dynamic' | 'article' | 'live' | 'forward'
  dynamicType?: DynamicType
  downloadUrl?: {
    video?: string
    audio?: string
  }
  images?: string[]
  tags: string[]
  comments: CommentInfo[]
  commentCount: number
}

/**
 * 动态内容解析结果
 */
interface DynamicContentResult {
  title: string
  description: string
  thumbnail: string
  images: string[]
  type: BilibiliWorkInfo['type']
}

/**
 * 图片信息类型
 */
interface PicInfo {
  url?: string
  src?: string
  height?: number
  width?: number
}

// ==================== 类型守卫 ====================

/**
 * 判断是否为图文动态
 */
function isDynamicTypeDraw(data: BiliDynamicInfoUnion): data is DynamicTypeDraw {
  return data.data.item.type === DynamicType.DRAW
}

/**
 * 判断是否为文字动态
 */
function isDynamicTypeWord(data: BiliDynamicInfoUnion): data is DynamicTypeWord {
  return data.data.item.type === DynamicType.WORD
}

/**
 * 判断是否为视频动态
 */
function isDynamicTypeAV(data: BiliDynamicInfoUnion): data is DynamicTypeAV {
  return data.data.item.type === DynamicType.AV
}

/**
 * 判断是否为转发动态
 */
function isDynamicTypeForward(data: BiliDynamicInfoUnion): data is DynamicTypeForwardUnion {
  return data.data.item.type === DynamicType.FORWARD
}

/**
 * 判断是否为专栏文章动态
 */
function isDynamicTypeArticle(data: BiliDynamicInfoUnion): data is DynamicTypeArticle {
  return data.data.item.type === DynamicType.ARTICLE
}

/**
 * 判断是否为直播推荐动态
 */
function isDynamicTypeLiveRcmd(data: BiliDynamicInfoUnion): data is DynamicTypeLiveRcmd {
  return data.data.item.type === DynamicType.LIVE_RCMD
}

// ==================== 工具函数 ====================

/**
 * 格式化数字
 */
const formatCount = (count: number): string => {
  if (count >= 100000000) return `${(count / 100000000).toFixed(1)}亿`
  if (count >= 10000) return `${(count / 10000).toFixed(1)}万`
  return count.toString()
}

/**
 * 格式化时长
 */
const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

/**
 * 格式化时间戳
 */
const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 2592000000) return `${Math.floor(diff / 86400000)}天前`
  
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

/**
 * 处理评论中的表情
 */
const processCommentEmojis = (text: string, emojiData: BiliEmojiList): string => {
  if (!text || !emojiData?.data?.packages) return text
  
  const emojiMap = new Map<string, string>()
  emojiData.data.packages.forEach(pkg => {
    pkg.emote.forEach(emote => {
      emojiMap.set(emote.text, emote.url)
    })
  })
  
  let processedText = text
  const emojiRegex = /\[([^\]]+)\]/g
  
  processedText = processedText.replace(emojiRegex, (match, emojiName: string) => {
    const emojiUrl = emojiMap.get(match) || emojiMap.get(emojiName)
    if (emojiUrl) {
      return `<img src="${emojiUrl}" alt="${emojiName}" class="emoji" />`
    }
    return match
  })
  
  const parts = processedText.split(/(<img[^>]*>)/)
  const wrappedParts = parts.map(part => {
    if (part.startsWith('<img')) return part
    if (part.trim()) return `<span>${part}</span>`
    return part
  })
  
  return wrappedParts.join('')
}

/**
 * 解析评论数据
 */
const parseComments = (
  commentsData: BiliWorkComments['data']['replies'],
  emojiData: BiliEmojiList
): CommentInfo[] => {
  if (!commentsData || !Array.isArray(commentsData)) return []
  
  return commentsData.map((comment, index) => {
    let processedContent = comment.content?.message || ''
    if (emojiData && processedContent) {
      processedContent = processCommentEmojis(processedContent, emojiData)
    }
    
    const pictures = comment.content?.pictures as Array<{ img_src: string }> | undefined
    
    return {
      id: comment.rpid?.toString() || index.toString(),
      author: comment.member?.uname || '匿名用户',
      avatar: comment.member?.avatar || '',
      content: processedContent,
      images: pictures?.map(pic => pic.img_src) || [],
      likes: comment.like || 0,
      timestamp: formatTimestamp(comment.ctime || 0)
    }
  })
}

/**
 * 获取动态评论类型
 */
const getDynamicCommentType = (dynamicType: DynamicType): number => {
  switch (dynamicType) {
    case DynamicType.AV:
      return 1
    case DynamicType.DRAW:
    case DynamicType.WORD:
    case DynamicType.FORWARD:
    case DynamicType.ARTICLE:
    case DynamicType.LIVE_RCMD:
    default:
      return 17
  }
}

/**
 * 获取动态 OID（用于评论接口）
 */
const getDynamicOid = (
  dynamicInfo: BiliDynamicInfoUnion,
  dynamicCard: BiliDynamicCard['data']
): string => {
  const item = dynamicInfo.data.item
  
  if (isDynamicTypeAV(dynamicInfo)) {
    const archive = dynamicInfo.data.item.modules.module_dynamic.major?.archive
    return archive?.aid?.toString() || item.id_str
  }
  
  if (isDynamicTypeWord(dynamicInfo) || isDynamicTypeForward(dynamicInfo)) {
    return item.id_str
  }
  
  // 其他类型使用动态卡片的 rid
  return dynamicCard.card?.desc?.rid?.toString() || item.id_str
}

// ==================== 动态内容解析器 ====================

/**
 * 解析图文动态内容
 */
const parseDrawDynamic = (data: DynamicTypeDraw): DynamicContentResult => {
  const item = data.data.item
  const moduleDynamic = item.modules.module_dynamic
  
  // 获取描述文本
  const description = moduleDynamic.major?.opus?.summary?.text || ''
  
  // 获取图片列表 - opus.pics 结构
  const pics = moduleDynamic.major?.opus?.pics || []
  const images = pics
    .map((pic: PicInfo) => pic.url)
    .filter((url): url is string => typeof url === 'string')
  
  return {
    title: '图文动态',
    description,
    thumbnail: images[0] || '',
    images,
    type: 'note'
  }
}

/**
 * 解析文字动态内容
 */
const parseWordDynamic = (data: DynamicTypeWord): DynamicContentResult => {
  const item = data.data.item
  const moduleDynamic = item.modules.module_dynamic
  
  // 获取描述文本
  const description = moduleDynamic.major?.opus?.summary?.text || ''
  
  return {
    title: '文字动态',
    description,
    thumbnail: '',
    images: [],
    type: 'note'
  }
}

/**
 * 解析视频动态内容
 */
const parseAVDynamic = (data: DynamicTypeAV): DynamicContentResult => {
  const item = data.data.item
  const archive = item.modules.module_dynamic.major?.archive
  
  return {
    title: archive?.title || '视频动态',
    description: archive?.desc || '',
    thumbnail: archive?.cover || '',
    images: [],
    type: 'video'
  }
}

/**
 * 解析转发动态内容
 */
const parseForwardDynamic = (data: DynamicTypeForwardUnion): DynamicContentResult => {
  const item = data.data.item
  const moduleDynamic = item.modules.module_dynamic
  
  // 获取转发时的描述文本
  const description = moduleDynamic.desc?.text || ''
  
  return {
    title: '转发动态',
    description,
    thumbnail: '',
    images: [],
    type: 'forward'
  }
}

/**
 * 解析专栏文章动态内容
 */
const parseArticleDynamic = (data: DynamicTypeArticle): DynamicContentResult => {
  const item = data.data.item
  const opus = item.modules.module_dynamic.major?.opus
  
  return {
    title: opus?.title || '专栏文章',
    description: opus?.summary?.text || '',
    thumbnail: '',
    images: [],
    type: 'article'
  }
}

/**
 * 解析直播推荐动态内容
 */
const parseLiveRcmdDynamic = (data: DynamicTypeLiveRcmd): DynamicContentResult => {
  const item = data.data.item
  const liveRcmd = item.modules.module_dynamic.major?.live_rcmd
  
  // live_rcmd.content 是 JSON 字符串，包含直播间信息
  let title = '直播推荐'
  let thumbnail = ''
  
  if (liveRcmd?.content) {
    try {
      const liveInfo = JSON.parse(liveRcmd.content) as {
        live_play_info?: {
          title?: string
          cover?: string
        }
      }
      title = liveInfo.live_play_info?.title || '直播推荐'
      thumbnail = liveInfo.live_play_info?.cover || ''
    } catch {
      // JSON 解析失败，使用默认值
    }
  }
  
  return {
    title,
    description: '',
    thumbnail,
    images: [],
    type: 'live'
  }
}

/**
 * 解析动态内容（主入口）
 * 使用类型守卫进行类型安全的分发
 */
const parseDynamicContent = (dynamicInfo: BiliDynamicInfoUnion): DynamicContentResult => {
  if (isDynamicTypeDraw(dynamicInfo)) {
    return parseDrawDynamic(dynamicInfo)
  }
  
  if (isDynamicTypeWord(dynamicInfo)) {
    return parseWordDynamic(dynamicInfo)
  }
  
  if (isDynamicTypeAV(dynamicInfo)) {
    return parseAVDynamic(dynamicInfo)
  }
  
  if (isDynamicTypeForward(dynamicInfo)) {
    return parseForwardDynamic(dynamicInfo)
  }
  
  if (isDynamicTypeArticle(dynamicInfo)) {
    return parseArticleDynamic(dynamicInfo)
  }
  
  if (isDynamicTypeLiveRcmd(dynamicInfo)) {
    return parseLiveRcmdDynamic(dynamicInfo)
  }
  
  // 未知类型的兜底处理
  return {
    title: '动态内容',
    description: '',
    thumbnail: '',
    images: [],
    type: 'dynamic'
  }
}

/**
 * 获取动态作者信息
 */
const getDynamicAuthor = (dynamicInfo: BiliDynamicInfoUnion): BilibiliWorkInfo['author'] => {
  const moduleAuthor = dynamicInfo.data.item.modules.module_author
  return {
    name: moduleAuthor.name || '未知用户',
    avatar: moduleAuthor.face || '',
    id: moduleAuthor.mid?.toString() || ''
  }
}

/**
 * 获取动态统计信息
 */
const getDynamicStats = (dynamicInfo: BiliDynamicInfoUnion): { views: string; likes: string; commentCount: number } => {
  const moduleStat = dynamicInfo.data.item.modules.module_stat
  return {
    views: formatCount(moduleStat.forward?.count || 0),
    likes: formatCount(moduleStat.like?.count || 0),
    commentCount: moduleStat.comment?.count || 0
  }
}

// ==================== API 处理器 ====================

/**
 * 解析B站视频
 * POST /api/kkk/v1/platforms/bilibili/parse/video
 * Body: { bvid?: string, aid?: string }
 */
export const parseVideo: RequestHandler = async (req, res) => {
  try {
    const { bvid, aid } = req.body as { bvid?: string; aid?: string }
    
    if (!bvid && !aid) {
      return createBadRequestResponse(res, '请提供 bvid 或 aid')
    }
    
    // 获取视频信息
    const infoResponse = await getBilibiliData('单个视频作品数据', { 
      bvid: bvid || '', 
      typeMode: 'strict' 
    })
    const videoDetail = (infoResponse.data as BiliOneWork).data
    
    // 获取下载信息
    const streamResponse = await getBilibiliData('单个视频下载信息数据', {
      avid: videoDetail.aid,
      cid: videoDetail.cid,
      typeMode: 'strict'
    })
    const streamData = (streamResponse.data as BiliVideoPlayurlIsLogin).data
    
    // 获取评论和表情
    const [commentsResponse, emojiResponse] = await Promise.all([
      getBilibiliData('评论数据', { oid: videoDetail.aid.toString(), type: 1, number: 50, typeMode: 'strict' }),
      getBilibiliData('Emoji数据', { typeMode: 'strict' })
    ])
    
    const commentsData = (commentsResponse.data as BiliWorkComments).data
    const emojiData = emojiResponse.data as BiliEmojiList
    const comments = parseComments(commentsData.replies || [], emojiData)
    
    const workInfo: BilibiliWorkInfo = {
      id: videoDetail.bvid,
      title: videoDetail.title || '无标题',
      description: videoDetail.desc || '',
      thumbnail: videoDetail.pic || '',
      duration: formatDuration(videoDetail.duration || 0),
      views: formatCount(videoDetail.stat?.view || 0),
      likes: formatCount(videoDetail.stat?.like || 0),
      author: {
        name: videoDetail.owner?.name || '未知用户',
        avatar: videoDetail.owner?.face || '',
        id: videoDetail.owner?.mid?.toString() || ''
      },
      type: 'video',
      downloadUrl: {
        video: streamData.dash?.video?.[0]?.baseUrl,
        audio: streamData.dash?.audio?.[0]?.baseUrl
      },
      tags: videoDetail.tname ? [videoDetail.tname] : [],
      comments,
      commentCount: videoDetail.stat?.reply || 0
    }
    
    return createSuccessResponse(res, workInfo)
  } catch (error) {
    const err = error as Error
    if (await handleBilibiliRiskControl(err, res)) return
    logger.error('[BilibiliAPI] 解析视频失败:', err)
    return createServerErrorResponse(res, `解析失败: ${err.message}`)
  }
}

/**
 * 解析B站动态
 * POST /api/kkk/v1/platforms/bilibili/parse/dynamic
 * Body: { dynamic_id: string }
 */
export const parseDynamic: RequestHandler = async (req, res) => {
  try {
    const { dynamic_id } = req.body as { dynamic_id?: string }
    
    if (!dynamic_id) {
      return createBadRequestResponse(res, '请提供动态ID (dynamic_id)')
    }
    
    // 获取动态详情
    const dynamicInfoResponse = await getBilibiliData('动态详情数据', { dynamic_id, typeMode: 'strict' })
    const dynamicInfo = dynamicInfoResponse.data as BiliDynamicInfoUnion
    
    // 获取动态卡片
    const dynamicCardResponse = await getBilibiliData('动态卡片数据', { 
      dynamic_id: dynamicInfo.data.item.id_str, 
      typeMode: 'strict' 
    })
    const dynamicCard = (dynamicCardResponse.data as BiliDynamicCard).data
    
    // 解析动态内容
    const dynamicContent = parseDynamicContent(dynamicInfo)
    
    // 获取作者和统计信息
    const author = getDynamicAuthor(dynamicInfo)
    const stats = getDynamicStats(dynamicInfo)
    
    // 获取评论（非直播类型）
    let comments: CommentInfo[] = []
    
    const itemType = dynamicInfo.data.item.type
    if (itemType !== DynamicType.LIVE_RCMD) {
      try {
        const [commentsResponse, emojiResponse] = await Promise.all([
          getBilibiliData('评论数据', {
            type: getDynamicCommentType(itemType),
            oid: getDynamicOid(dynamicInfo, dynamicCard),
            number: 50,
            typeMode: 'strict'
          }),
          getBilibiliData('Emoji数据', { typeMode: 'strict' })
        ])
        
        const commentsData = (commentsResponse.data as BiliWorkComments).data
        const emojiData = emojiResponse.data as BiliEmojiList
        comments = parseComments(commentsData.replies || [], emojiData)
      } catch (error) {
        logger.warn('[BilibiliAPI] 获取动态评论失败:', error)
      }
    }
    
    const workInfo: BilibiliWorkInfo = {
      id: dynamicInfo.data.item.id_str,
      title: dynamicContent.title,
      description: dynamicContent.description,
      thumbnail: dynamicContent.thumbnail || author.avatar,
      duration: '0:00',
      views: stats.views,
      likes: stats.likes,
      author,
      type: dynamicContent.type,
      dynamicType: itemType,
      images: dynamicContent.images,
      tags: [],
      comments,
      commentCount: stats.commentCount
    }
    
    return createSuccessResponse(res, workInfo)
  } catch (error) {
    const err = error as Error
    if (await handleBilibiliRiskControl(err, res)) return
    logger.error('[BilibiliAPI] 解析动态失败:', err)
    return createServerErrorResponse(res, `解析失败: ${err.message}`)
  }
}

/**
 * 获取用户信息
 * GET /api/kkk/v1/platforms/bilibili/user?host_mid=xxx
 */
export const getUserInfo: RequestHandler = async (req, res) => {
  try {
    const { host_mid } = req.query as { host_mid?: string }
    
    if (!host_mid) {
      return createBadRequestResponse(res, '请提供用户ID (host_mid)')
    }
    
    const userResponse = await getBilibiliData('用户主页数据', { 
      host_mid: parseInt(host_mid), 
      typeMode: 'strict' 
    })
    const userData = userResponse.data.data.card
    
    return createSuccessResponse(res, {
      id: userData.mid?.toString(),
      name: userData.name,
      avatar: userData.face || '',
      signature: userData.sign || '',
      followerCount: userData.fans || 0,
      followingCount: userData.attention || 0,
      level: userData.level_info?.current_level || 0
    })
  } catch (error) {
    const err = error as Error
    if (await handleBilibiliRiskControl(err, res)) return
    logger.error('[BilibiliAPI] 获取用户信息失败:', err)
    return createServerErrorResponse(res, `获取用户信息失败: ${err.message}`)
  }
}
