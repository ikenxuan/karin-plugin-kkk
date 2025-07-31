import type { DyEmojiList, DyImageAlbumWork, DySlidesWork, DyVideoWork, DyWorkComments } from '@ikenxuan/amagi'

import request from '@/lib/request'
import type { apiResponse, CommentInfo, ParsedWorkInfo, SlideItem,VideoInfo } from '@/parsers/types'
import { formatCount, formatDuration, formatTimestamp } from '@/parsers/utils'

/**
 * 抖音作品ID解析器
 * @param finalUrl 最终重定向后的URL
 * @returns 解析后的作品信息
 */
export const parseDouyinWorkId = (finalUrl: string): ParsedWorkInfo => {
  // 从URL中提取aweme_id
  const videoMatch = /video\/(\d+)/.exec(finalUrl)
  const noteMatch = /note\/(\d+)/.exec(finalUrl)
  const modalMatch = /modal_id=(\d+)/.exec(finalUrl)

  switch (true) {
    case /video\/(\d+)/.test(finalUrl): {
      return {
        platform: 'douyin',
        workId: videoMatch ? videoMatch[1] : '',
        workType: 'video',
        params: {
          aweme_id: videoMatch ? videoMatch[1] : ''
        }
      }
    }
    case /note\/(\d+)/.test(finalUrl): {
      return {
        platform: 'douyin',
        workId: noteMatch ? noteMatch[1] : '',
        workType: 'video',
        params: {
          aweme_id: noteMatch ? noteMatch[1] : '',
        }
      }
    }
    case /modal_id=(\d+)/.test(finalUrl): {
      return {
        platform: 'douyin',
        workId: modalMatch ? modalMatch[1] : '',
        workType: 'video',
        params: {
          aweme_id: modalMatch ? modalMatch[1] : ''
        }
      }
    }
    default: {
      throw new Error('无法从URL中提取抖音作品ID')
    }
  }
}

/**
 * 从标题中移除标签
 * @param title 原始标题
 * @param tags 标签数组
 * @returns 移除标签后的标题
 */
const removeTags = (title: string, tags: string[]): string => {
  if (!title || !tags || tags.length === 0) {
    return title
  }
  
  let cleanTitle = title
  
  // 移除每个标签（支持#标签和@标签格式）
  tags.forEach(tag => {
    if (tag) {
      // 移除 #标签名 格式
      const hashtagPattern = new RegExp(`#${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`, 'gi')
      cleanTitle = cleanTitle.replace(hashtagPattern, '')
      
      // 移除 @标签名 格式
      const atPattern = new RegExp(`@${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:\\s|$)`, 'gi')
      cleanTitle = cleanTitle.replace(atPattern, '')
      
      // 移除纯标签名
      const plainPattern = new RegExp(`\\b${tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      cleanTitle = cleanTitle.replace(plainPattern, '')
    }
  })
  
  // 清理多余的空格和换行符
  return cleanTitle.replace(/\s+/g, ' ').trim()
}

/**
 * 解析抖音作品详细信息
 * @param workInfo 作品基础信息
 * @returns 格式化后的视频信息
 */
export const parseDouyinVideoDetail = async (workInfo: ParsedWorkInfo): Promise<VideoInfo> => {
  try {
    // 获取作品详细数据
    const videoResponse = await request.post<apiResponse<DyVideoWork | DyImageAlbumWork | DySlidesWork>>('/api/kkk/douyin/data', {
      dataType: '聚合解析',
      params: workInfo.params
    })

    // 获取评论数据
    const commentsResponse = await request.post<apiResponse<DyWorkComments>>('/api/kkk/douyin/data', {
      dataType: '评论数据',
      params: workInfo.params
    })

    // 获取表情数据
    const emojiResponse = await request.post<apiResponse<DyEmojiList>>('/api/kkk/douyin/data', {
      dataType: 'Emoji数据',
      params: {}
    })

    const awemeDetail = videoResponse.data.data.data.aweme_detail
    const commentsData = commentsResponse.data.data.data
    const emojiData = emojiResponse.data.data.data

    // 判断作品类型
    const isSlides = awemeDetail.is_slides === true && awemeDetail.images !== null
    const isVideo = !awemeDetail.images && !isSlides
    const workType = isSlides ? 'slides' : (isVideo ? 'video' : 'note')

    // 解析评论数据
    const comments = parseDouyinComments(commentsData.comments, emojiData)

    // 提取标签
    const tags = Array.isArray(awemeDetail.text_extra)
      ? awemeDetail.text_extra.map(tag => 
          typeof tag === 'string' ? tag : tag.hashtag_name
        ).filter(Boolean)
      : []
    
    // 从标题中移除标签
    const originalTitle = awemeDetail.desc || '无标题'
    const cleanTitle = removeTags(originalTitle, tags)

    // 处理合辑项目
    let slides: SlideItem[] | undefined
    if (isSlides && awemeDetail.images) {
      slides = awemeDetail.images.map((item) => {
        // 静态图片，clip_type为2
        if (item.clip_type === 2) {
          return {
            type: 'image',
            url: item.url_list[2],
            thumbnail: item.url_list[2]
          }
        } else if (item.clip_type === 3) {
          // Live Photo
          return {
            type: 'livephoto',
            url: item.url_list[2], // 静态图片作为主URL
            videoUrl: item.video.play_addr_h264.url_list[0], // Live Photo的视频URL
            thumbnail: item.url_list[2],
            duration: formatDuration(item.video?.duration / 1000 || 0)
          }
        } else {
          // 视频，clip_type = 4
          return {
            type: 'video',
            url: item.video.play_addr_h264.url_list[0],
            thumbnail: item.url_list[2],
            duration: formatDuration(item.video?.duration / 1000 || 0)
          }
        }
      })
    }

    // 格式化为统一的VideoInfo接口
    const videoInfo: VideoInfo = {
      id: `${awemeDetail.aweme_id}_${Date.now()}`,
      title: cleanTitle,
      description: awemeDetail.desc || '',
      thumbnail: isVideo
        ? awemeDetail.video?.cover?.url_list?.[0]
        : awemeDetail.images?.[0]?.url_list?.[0] || '',
      duration: isVideo ? formatDuration(awemeDetail.video?.duration / 1000 || 0) : '0:00',
      views: formatCount(awemeDetail.statistics?.play_count || 0),
      likes: formatCount(awemeDetail.statistics?.digg_count || 0),
      author: awemeDetail.author?.nickname || '未知用户',
      type: workType,
      downloadUrl: {
        video: isVideo
          ? awemeDetail.video?.play_addr?.url_list?.[0] || '获取失败'
          : isSlides && slides
            ? slides.find(slide => slide.type === 'video')?.url || undefined
            : undefined,
        audio: isSlides && awemeDetail.video
          ? awemeDetail.video?.play_addr?.url_list?.[0] || '获取失败'
          : awemeDetail.music?.play_url?.uri || '获取失败'
      },
      images: workType === 'note' ? awemeDetail.images?.map(img => img.url_list?.[2]).filter(Boolean) : undefined,
      slides: slides,
      tags,
      comments,
      commentCount: awemeDetail.statistics?.comment_count || 0
    }

    return videoInfo
  } catch (error: any) {
    throw new Error(`抖音数据解析失败: ${error.message}`)
  }
}

/**
 * 解析抖音评论数据
 * @param commentsData 原始评论数据
 * @param emojiData 表情数据
 * @returns 格式化后的评论列表
 */
const parseDouyinComments = (commentsData: DyWorkComments['comments'], emojiData: DyEmojiList): CommentInfo[] => {
  if (!commentsData || !Array.isArray(commentsData)) {
    return []
  }

  return commentsData.map((comment, index) => {
    // 处理评论文本中的表情
    let processedText = comment.text || ''
    if (emojiData && comment.text) {
      // 直接处理文本中内嵌的表情
      processedText = processCommentEmojis(comment.text, emojiData)
    }

    return {
      id: `${comment.cid || index.toString()}_${Date.now()}`,
      author: comment.user?.nickname || '匿名用户',
      avatar: comment.user?.avatar_thumb?.url_list?.[0] || '',
      content: processedText,
      images: comment.image_list ? comment.image_list.map((img: any) => img.origin_url?.url_list?.[3]).filter(Boolean) : [],
      likes: comment.digg_count || 0,
      timestamp: formatTimestamp(comment.create_time || 0)
    }
  })
}

/**
 * 处理评论中的表情
 * @param text 原始文本
 * @param emojiData 表情数据
 * @returns 处理后的文本
 */
const processCommentEmojis = (text: string, emojiData: DyEmojiList): string => {
  if (!text || !emojiData?.emoji_list) {
    return text
  }

  let processedText = text

  // 使用正则表达式匹配文本中的表情 [表情名]
  const emojiRegex = /\[([^\]]+)\]/g

  processedText = processedText.replace(emojiRegex, (match, emojiName) => {
    // 在表情列表中查找匹配的表情
    const emojiInfo = emojiData.emoji_list.find(emoji => emoji.display_name === `[${emojiName}]`)

    if (emojiInfo && emojiInfo.emoji_url?.url_list?.[0]) {
      // 返回img标签替换表情文本
      return `<img src="${emojiInfo.emoji_url.url_list[0]}" alt="${emojiName}" class="emoji" />`
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