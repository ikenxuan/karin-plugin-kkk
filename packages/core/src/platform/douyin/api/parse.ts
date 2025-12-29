/**
 * 抖音作品解析 API
 */
import type {
  DyEmojiList,
  DyImageAlbumWork,
  DySlidesWork,
  DyVideoWork,
  DyWorkComments
} from '@ikenxuan/amagi'
import {
  createBadRequestResponse,
  createServerErrorResponse,
  createSuccessResponse,
  logger
} from 'node-karin'
import type { RequestHandler } from 'node-karin/express'

import { getDouyinData } from '@/module/utils/amagiClient'

/**
 * 合辑项目类型
 */
interface SlideItem {
  type: 'image' | 'livephoto' | 'video'
  url: string
  thumbnail?: string
  duration?: string
  videoUrl?: string
}

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
export interface DouyinWorkInfo {
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
  type: 'video' | 'note' | 'slides'
  downloadUrl?: {
    video?: string
    audio?: string
  }
  images?: string[]
  slides?: SlideItem[]
  tags: string[]
  comments: CommentInfo[]
  commentCount: number
}

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
 * 从标题中移除标签
 */
const removeTags = (title: string, tags: string[]): string => {
  if (!title || !tags || tags.length === 0) return title
  
  let cleanTitle = title
  tags.forEach(tag => {
    if (tag) {
      const hashtagPattern = new RegExp(`#${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`, 'gi')
      cleanTitle = cleanTitle.replace(hashtagPattern, '')
      const atPattern = new RegExp(`@${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`, 'gi')
      cleanTitle = cleanTitle.replace(atPattern, '')
    }
  })
  
  return cleanTitle.replace(/\s+/g, ' ').trim()
}

/**
 * 处理评论中的表情
 */
const processCommentEmojis = (text: string, emojiData: DyEmojiList): string => {
  if (!text || !emojiData?.emoji_list) return text
  
  let processedText = text
  const emojiRegex = /\[([^\]]+)\]/g
  
  processedText = processedText.replace(emojiRegex, (match, emojiName) => {
    const emojiInfo = emojiData.emoji_list.find(emoji => emoji.display_name === `[${emojiName}]`)
    if (emojiInfo && emojiInfo.emoji_url?.url_list?.[0]) {
      return `<img src="${emojiInfo.emoji_url.url_list[0]}" alt="${emojiName}" class="emoji" />`
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
const parseComments = (commentsData: DyWorkComments['comments'], emojiData: DyEmojiList): CommentInfo[] => {
  if (!commentsData || !Array.isArray(commentsData)) return []
  
  return commentsData.map((comment, index) => {
    let processedText = comment.text || ''
    if (emojiData && comment.text) {
      processedText = processCommentEmojis(comment.text, emojiData)
    }
    
    return {
      id: comment.cid?.toString() || index.toString(),
      author: comment.user?.nickname || '匿名用户',
      avatar: comment.user?.avatar_thumb?.url_list?.[0] || '',
      content: processedText,
      images: comment.image_list?.map((img: any) => img.origin_url?.url_list?.[3]).filter(Boolean) || [],
      likes: comment.digg_count || 0,
      timestamp: formatTimestamp(comment.create_time || 0)
    }
  })
}

/**
 * 解析抖音作品
 * POST /api/v1/platforms/douyin/parse
 * Body: { aweme_id: string }
 */
export const parseWork: RequestHandler = async (req, res) => {
  try {
    const { aweme_id } = req.body
    
    if (!aweme_id) {
      return createBadRequestResponse(res, '请提供作品ID (aweme_id)')
    }
    
    // 并发获取作品数据、评论数据、表情数据
    const [workResponse, commentsResponse, emojiResponse] = await Promise.all([
      getDouyinData('聚合解析', { aweme_id, typeMode: 'strict' }),
      getDouyinData('评论数据', { aweme_id, typeMode: 'strict' }),
      getDouyinData('Emoji数据', { typeMode: 'strict' })
    ])
    
    const awemeDetail = (workResponse.data as DyVideoWork | DyImageAlbumWork | DySlidesWork).aweme_detail
    const commentsData = (commentsResponse.data as DyWorkComments).comments
    const emojiData = emojiResponse.data as DyEmojiList
    
    // 判断作品类型
    const isSlides = awemeDetail.is_slides === true && awemeDetail.images !== null
    const isVideo = !awemeDetail.images && !isSlides
    const workType = isSlides ? 'slides' : (isVideo ? 'video' : 'note')
    
    // 解析评论
    const comments = parseComments(commentsData, emojiData)
    
    // 提取标签
    const tags = Array.isArray(awemeDetail.text_extra)
      ? awemeDetail.text_extra.map(tag => typeof tag === 'string' ? tag : tag.hashtag_name).filter(Boolean)
      : []
    
    // 清理标题
    const cleanTitle = removeTags(awemeDetail.desc || '无标题', tags)
    
    // 处理合辑项目
    let slides: SlideItem[] | undefined
    if (isSlides && awemeDetail.images) {
      slides = awemeDetail.images.map((item) => {
        if (item.clip_type === 2) {
          return { type: 'image' as const, url: item.url_list[2], thumbnail: item.url_list[2] }
        } else if (item.clip_type === 3) {
          const videoUri = item.video?.play_addr_h264?.uri
          const videoUrl = videoUri
            ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${videoUri}&ratio=1080p&line=0`
            : item.video?.play_addr_h264?.url_list?.[0]
          return {
            type: 'livephoto' as const,
            url: item.url_list[2],
            videoUrl,
            thumbnail: item.url_list[2],
            duration: formatDuration(item.video?.duration / 1000 || 0)
          }
        } else {
          return {
            type: 'video' as const,
            url: item.video.play_addr_h264.url_list[0],
            thumbnail: item.url_list[2],
            duration: formatDuration(item.video?.duration / 1000 || 0)
          }
        }
      })
    }
    
    const workInfo: DouyinWorkInfo = {
      id: awemeDetail.aweme_id,
      title: cleanTitle,
      description: awemeDetail.desc || '',
      thumbnail: isVideo
        ? awemeDetail.video?.cover?.url_list?.[0]
        : awemeDetail.images?.[0]?.url_list?.[0] || '',
      duration: isVideo ? formatDuration(awemeDetail.video?.duration / 1000 || 0) : '0:00',
      views: formatCount(awemeDetail.statistics?.play_count || 0),
      likes: formatCount(awemeDetail.statistics?.digg_count || 0),
      author: {
        name: awemeDetail.author?.nickname || '未知用户',
        avatar: awemeDetail.author?.avatar_thumb?.url_list?.[0] || '',
        id: awemeDetail.author?.sec_uid || ''
      },
      type: workType,
      downloadUrl: {
        video: isVideo
          ? awemeDetail.video?.play_addr?.url_list?.[0]
          : isSlides && slides
            ? slides.find(slide => slide.type === 'video')?.url
            : undefined,
        audio: isSlides && awemeDetail.video
          ? awemeDetail.video?.play_addr?.url_list?.[0]
          : awemeDetail.music?.play_url?.uri
      },
      images: workType === 'note' ? awemeDetail.images?.map(img => img.url_list?.[2]).filter(Boolean) : undefined,
      slides,
      tags,
      comments,
      commentCount: awemeDetail.statistics?.comment_count || 0
    }
    
    return createSuccessResponse(res, workInfo)
  } catch (error: any) {
    logger.error('[DouyinAPI] 解析作品失败:', error)
    return createServerErrorResponse(res, `解析失败: ${error.message}`)
  }
}

/**
 * 获取用户信息
 * GET /api/v1/platforms/douyin/user?sec_uid=xxx
 */
export const getUserInfo: RequestHandler = async (req, res) => {
  try {
    const { sec_uid } = req.query
    
    if (!sec_uid || typeof sec_uid !== 'string') {
      return createBadRequestResponse(res, '请提供用户ID (sec_uid)')
    }
    
    const userResponse = await getDouyinData('用户主页数据', { sec_uid, typeMode: 'strict' })
    const userData = userResponse.data.user
    
    return createSuccessResponse(res, {
      id: userData.sec_uid,
      name: userData.nickname,
      avatar: userData.avatar_larger?.url_list?.[0] || '',
      signature: userData.signature || '',
      followerCount: userData.follower_count || 0,
      followingCount: userData.following_count || 0,
      totalFavorited: userData.total_favorited || 0
    })
  } catch (error: any) {
    logger.error('[DouyinAPI] 获取用户信息失败:', error)
    return createServerErrorResponse(res, `获取用户信息失败: ${error.message}`)
  }
}
