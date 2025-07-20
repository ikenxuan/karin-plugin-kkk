import request from '@/lib/request'
import { formatDuration, formatCount, formatTimestamp } from '@/parsers/utils'
import type { VideoInfo, CommentInfo, ParsedWorkInfo } from '@/parsers/types'

/**
 * 快手作品ID解析器
 * @param finalUrl 最终重定向后的URL
 * @returns 解析后的作品信息
 */
export function parseKuaishouWorkId(finalUrl: string): ParsedWorkInfo {
  // 从URL中提取photoId
  const photoIdMatch = finalUrl.match(/\/short-video\/(\w+)/)
  if (!photoIdMatch) {
    throw new Error('无法从URL中提取快手作品ID')
  }

  const photoId = photoIdMatch[1]
  
  return {
    platform: 'kuaishou',
    workId: photoId,
    workType: 'video',
    params: {
      photoId: photoId
    }
  }
}

/**
 * 解析快手作品详细信息
 * @param workInfo 作品基础信息
 * @returns 格式化后的视频信息
 */
export async function parseKuaishouVideoDetail(workInfo: ParsedWorkInfo): Promise<VideoInfo> {
  try {
    // 获取作品详细数据
    const videoResponse = await request.post('/api/kkk/kuaishou/data', {
      dataType: '单个作品数据',
      params: workInfo.params
    })

    // 获取评论数据
    const commentsResponse = await request.post('/api/kkk/kuaishou/data', {
      dataType: '评论数据',
      params: workInfo.params
    })

    // 获取表情数据
    const emojiResponse = await request.post('/api/kkk/kuaishou/data', {
      dataType: 'Emoji数据',
      params: {}
    })

    const videoDetail = videoResponse.data.data.photo
    const commentsData = commentsResponse.data.data
    const emojiData = emojiResponse.data.data

    // 解析评论数据
    const comments = parseKuaishouComments(commentsData.rootComments || [], emojiData)

    // 格式化为统一的VideoInfo接口
    const videoInfo: VideoInfo = {
      id: videoDetail.photoId || workInfo.workId,
      title: videoDetail.caption || '无标题',
      description: videoDetail.caption || '暂无描述',
      thumbnail: videoDetail.coverUrl || '',
      duration: formatDuration(videoDetail.duration || 0),
      views: formatCount(videoDetail.viewCount || 0),
      likes: formatCount(videoDetail.likeCount || 0),
      author: videoDetail.userName || '未知用户',
      type: 'video',
      downloadUrl: {
        video: videoDetail.mainMvUrls?.[0]?.url || '',
        audio: videoDetail.mainMvUrls?.[0]?.url || ''
      },
      images: undefined,
      tags: videoDetail.tags?.map((tag: any) => tag.name).filter(Boolean) || [],
      comments: comments.slice(0, 20),
      commentCount: videoDetail.commentCount || 0
    }

    return videoInfo
  } catch (error: any) {
    throw new Error(`快手数据解析失败: ${error.message}`)
  }
}

/**
 * 解析快手评论数据
 * @param commentsData 原始评论数据
 * @param emojiData 表情数据
 * @returns 格式化后的评论列表
 */
function parseKuaishouComments(commentsData: any[], emojiData: any): CommentInfo[] {
  if (!commentsData || !Array.isArray(commentsData)) {
    return []
  }

  return commentsData.map((comment, index) => {
    // 处理评论文本中的表情
    let processedText = comment.content || ''
    if (emojiData && comment.content) {
      processedText = processKuaishouCommentEmojis(comment.content, emojiData)
    }

    return {
      id: comment.commentId || index.toString(),
      author: comment.authorName || '匿名用户',
      avatar: comment.headUrl || '',
      content: processedText,
      images: [],
      likes: comment.likedCount || 0,
      timestamp: formatTimestamp(comment.timestamp || 0)
    }
  })
}

/**
 * 处理快手评论中的表情
 * @param text 原始文本
 * @param emojiData 表情数据
 * @returns 处理后的文本
 */
function processKuaishouCommentEmojis(text: string, emojiData: any): string {
  // 根据实际的快手表情数据结构来实现
  let processedText = text
  
  if (emojiData && emojiData.emoji_list) {
    emojiData.emoji_list.forEach((emoji: any) => {
      const emojiRegex = new RegExp(`\\[${emoji.name}\\]`, 'g')
      const emojiImg = `<img src="${emoji.url}" alt="${emoji.name}" class="emoji" />`
      processedText = processedText.replace(emojiRegex, emojiImg)
    })
  }
  
  return processedText
}