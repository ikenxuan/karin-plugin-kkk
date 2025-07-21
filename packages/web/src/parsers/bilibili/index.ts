import type { BiliEmojiList,BiliOneWork, BiliVideoPlayurlIsLogin, BiliWorkComments } from '@ikenxuan/amagi'

import request from '@/lib/request'
import type { apiResponse,CommentInfo, ParsedWorkInfo, VideoInfo } from '@/parsers/types'
import { formatCount, formatDuration, formatTimestamp } from '@/parsers/utils'

/**
 * 哔哩哔哩作品ID解析器
 * @param finalUrl 最终重定向后的URL
 * @returns 解析后的作品信息
 */
export const parseBilibiliWorkId = (finalUrl: string): ParsedWorkInfo => {
  // 从URL中提取bvid或aid
  const bvidMatch = finalUrl.match(/\/video\/(BV[a-zA-Z0-9]+)/)
  const aidMatch = finalUrl.match(/\/video\/av(\d+)/)
  
  if (bvidMatch) {
    return {
      platform: 'bilibili',
      workId: bvidMatch[1],
      workType: 'video',
      params: {
        bvid: bvidMatch[1]
      }
    }
  } else if (aidMatch) {
    return {
      platform: 'bilibili',
      workId: aidMatch[1],
      workType: 'video',
      params: {
        aid: aidMatch[1]
      }
    }
  }
  
  throw new Error('无法从URL中提取哔哩哔哩作品ID')
}

/**
 * 解析哔哩哔哩作品详细信息
 * @param workInfo 作品基础信息
 * @returns 格式化后的视频信息
 */
export const parseBilibiliVideoDetail = async (workInfo: ParsedWorkInfo): Promise<VideoInfo> => {
  try {
    // 获取视频详细数据
    const infoDataResponse = await request.post<apiResponse<BiliOneWork>>('/api/kkk/bilibili/data', {
      dataType: '单个视频作品数据',
      params: workInfo.params
    })

    const videoStreamResponse = await request.post<apiResponse<BiliVideoPlayurlIsLogin>>('/api/kkk/bilibili/data', {
      dataType: '单个视频下载信息数据',
      params: {
        avid: infoDataResponse.data.data.data.data.aid,
        cid: infoDataResponse.data.data.data.data.cid,
      }
    })

    const videoDetail = infoDataResponse.data.data.data.data

    // 获取评论数据
    const commentsResponse = await request.post<apiResponse<BiliWorkComments>>('/api/kkk/bilibili/data', {
      dataType: '评论数据',
      params: {
        oid: videoDetail.aid.toString(),
        type: 1,
        number: 50
      }
    })

    // 获取表情包数据
    const emojiResponse = await request.post<apiResponse<BiliEmojiList>>('/api/kkk/bilibili/data', {
      dataType: 'Emoji数据',
      params: {}
    })

    const commentsData = commentsResponse.data.data.data
    const emojiData = emojiResponse.data.data.data

    // 解析评论数据
    const comments = parseBilibiliComments(commentsData.data?.replies || [], emojiData)

    // 格式化为统一的VideoInfo接口
    const videoInfo: VideoInfo = {
      id: videoDetail.bvid,
      title: videoDetail.title || '无标题',
      description: videoDetail.desc || '',
      thumbnail: videoDetail.pic || '',
      duration: formatDuration(videoDetail.duration || 0),
      views: formatCount(videoDetail.stat?.view || 0),
      likes: formatCount(videoDetail.stat?.like || 0),
      author: videoDetail.owner?.name || '未知用户',
      type: 'video',
      downloadUrl: {
        video: videoStreamResponse.data.data.data.data.dash.video[0].baseUrl || '获取失败',
        audio: videoStreamResponse.data.data.data.data.dash.audio[0].baseUrl || '获取失败',
      },
      images: undefined,
      tags: videoDetail.tname ? [videoDetail.tname] : [],
      comments,
      commentCount: videoDetail.stat?.reply || 0
    }

    return videoInfo
  } catch (error: any) {
    throw new Error(`哔哩哔哩数据解析失败: ${error.message}`)
  }
}

/**
 * 解析哔哩哔哩评论数据
 * @param commentsData 原始评论数据
 * @param emojiData 表情包数据
 * @returns 格式化后的评论列表
 */
const parseBilibiliComments = (commentsData: BiliWorkComments['data']['replies'], emojiData: BiliEmojiList): CommentInfo[] => {
  if (!commentsData || !Array.isArray(commentsData)) {
    return []
  }

  return commentsData.map((comment, index) => {
    // 处理评论文本中的表情
    let processedContent = comment.content?.message || ''
    if (emojiData && processedContent) {
      processedContent = processBilibiliCommentEmojis(processedContent, emojiData)
    }

    return {
      id: comment.rpid?.toString() || index.toString(),
      author: comment.member?.uname || '匿名用户',
      avatar: comment.member?.avatar || '',
      content: processedContent,
      images: comment.content?.pictures ? comment.content.pictures.map((pic: { img_src: string }) => pic.img_src) : [],
      likes: comment.like || 0,
      timestamp: formatTimestamp(comment.ctime || 0)
    }
  })
}

/**
 * 处理B站评论中的表情包
 * @param text 原始文本
 * @param emojiData B站表情包数据
 * @returns 处理后的文本
 */
const processBilibiliCommentEmojis = (text: string, emojiData: BiliEmojiList): string => {
  if (!text || !emojiData?.data?.packages) {
    return text
  }

  let processedText = text

  // 创建表情包映射表，用于快速查找
  const emojiMap = new Map<string, string>()
  emojiData.data.packages.forEach(pkg => {
    pkg.emote.forEach(emote => {
      // B站表情格式通常是 [表情名] 或者直接是表情文本
      emojiMap.set(emote.text, emote.url)
    })
  })

  // 使用正则表达式匹配文本中的表情 [表情名]
  const emojiRegex = /\[([^\]]+)\]/g

  processedText = processedText.replace(emojiRegex, (match, emojiName) => {
    // 查找匹配的表情
    const emojiUrl = emojiMap.get(match) || emojiMap.get(emojiName)
    
    if (emojiUrl) {
      // 返回img标签替换表情文本
      return `<img src="${emojiUrl}" alt="${emojiName}" class="emoji" />`
    }

    // 如果找不到对应的表情，保持原文本
    return match
  })

  // 处理表情和文本混合的情况，将非表情文本用span包裹
  // 先分割文本，区分表情和普通文本
  const parts = processedText.split(/(<img[^>]*>)/)

  const wrappedParts = parts.map(part => {
    // 如果是img标签（表情），直接返回
    if (part.startsWith('<img')) {
      return part
    }
    // 如果是普通文本且不为空，用span包裹
    if (part.trim()) {
      return `<span>${part}</span>`
    }
    return part
  })

  return wrappedParts.join('')
}