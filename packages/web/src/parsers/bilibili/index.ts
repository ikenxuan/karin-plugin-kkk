import type { BiliDynamicCard, BiliDynamicInfo, BiliEmojiList, BiliOneWork, BiliVideoPlayurlIsLogin, BiliWorkComments } from '@ikenxuan/amagi'

import request from '@/lib/request'
import type { CommentInfo, ParsedWorkInfo, ResponseData, VideoInfo } from '@/parsers/types'
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
  const tMatch = finalUrl.match(/^https:\/\/t\.bilibili\.com\/(\d+)/)
  const opusMatch = finalUrl.match(/^https:\/\/www\.bilibili\.com\/opus\/(\d+)/)

  let matchResult = null
  let matchType = ''

  if (bvidMatch) {
    matchResult = bvidMatch
    matchType = 'bvid'
  } else if (aidMatch) {
    matchResult = aidMatch
    matchType = 'aid'
  } else if (tMatch) {
    matchResult = tMatch
    matchType = 'dynamic'
  } else if (opusMatch) {
    matchResult = opusMatch
    matchType = 'dynamic'
  }

  switch (matchType) {
    case 'bvid':
      return {
        platform: 'bilibili',
        workId: matchResult?.[1] ?? '',
        workType: 'video',
        params: {
          bvid: matchResult?.[1] ?? ''
        }
      }
    case 'aid':
      return {
        platform: 'bilibili',
        workId: matchResult?.[1] ?? '',
        workType: 'video',
        params: {
          aid: matchResult?.[1] ?? ''
        }
      }
    case 'dynamic':
      return {
        platform: 'bilibili',
        workId: matchResult?.[1] ?? '',
        workType: 'dynamic_info',
        params: {
          dynamic_id: matchResult?.[1] ?? ''
        }
      }
    default:
      break
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
    // 根据作品类型选择不同的处理逻辑
    if (workInfo.workType === 'dynamic_info') {
      return await parseBilibiliDynamicDetail(workInfo)
    }

    // 获取视频详细数据
    const infoDataResponse = await request.serverPost<ResponseData<BiliOneWork>, any>('/api/kkk/bilibili/data', {
      dataType: '单个视频作品数据',
      params: workInfo.params
    })

    const videoStreamResponse = await request.serverPost<ResponseData<BiliVideoPlayurlIsLogin>, any>('/api/kkk/bilibili/data', {
      dataType: '单个视频下载信息数据',
      params: {
        avid: infoDataResponse.data.data.aid,
        cid: infoDataResponse.data.data.cid
      }
    })

    const videoDetail = infoDataResponse.data.data

    // 获取评论数据
    const commentsResponse = await request.serverPost<ResponseData<BiliWorkComments>, any>('/api/kkk/bilibili/data', {
      dataType: '评论数据',
      params: {
        oid: videoDetail.aid.toString(),
        type: 1,
        number: 50
      }
    })

    // 获取表情包数据
    const emojiResponse = await request.serverPost<ResponseData<BiliEmojiList>, any>('/api/kkk/bilibili/data', {

      dataType: 'Emoji数据',
      params: {}
    })

    const commentsData = commentsResponse.data.data
    const emojiData = emojiResponse.data

    // 解析评论数据
    const comments = parseBilibiliComments(commentsData.replies || [], emojiData)

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
        video: videoStreamResponse.data.data.dash.video[0].baseUrl || '获取失败',
        audio: videoStreamResponse.data.data.dash.audio[0].baseUrl || '获取失败'
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
 * 解析哔哩哔哩动态详细信息
 * @param workInfo 动态基础信息
 * @returns 格式化后的动态信息
 */
const parseBilibiliDynamicDetail = async (workInfo: ParsedWorkInfo): Promise<VideoInfo> => {
  try {
    // 获取动态详情数据
    const dynamicInfoResponse = await request.serverPost<ResponseData<BiliDynamicInfo>, any>('/api/kkk/bilibili/data', {
      dataType: '动态详情数据',
      params: {
        dynamic_id: workInfo.params.dynamic_id,
        typeMode: 'strict'
      }
    })

    // 获取动态卡片数据
    const dynamicCardResponse = await request.serverPost<ResponseData<BiliDynamicCard>, any>('/api/kkk/bilibili/data', {
      dataType: '动态卡片数据',
      params: {
        dynamic_id: dynamicInfoResponse.data.data.data.data.item.id_str,
        typeMode: 'strict'
      }
    })

    const dynamicInfo = dynamicInfoResponse.data.data.data.data
    const dynamicCard = dynamicCardResponse.data.data.data.data

    // 获取评论数据（如果动态类型支持评论）
    let comments: CommentInfo[] = []
    let commentCount = 0

    if (dynamicInfo.item.type !== 'LIVE_RCMD') {
      try {
        const commentsResponse = await request.serverPost<ResponseData<BiliWorkComments>, any>('/api/kkk/bilibili/data', {
          dataType: '评论数据',
          params: {
            type: getDynamicCommentType(dynamicInfo.item.type),
            oid: getDynamicOid(dynamicInfo, dynamicCard),
            number: 50
          }
        })

        // 获取表情包数据
        const emojiResponse = await request.serverPost<ResponseData<BiliEmojiList>, any>('/api/kkk/bilibili/data', {
          dataType: 'Emoji数据',
          params: {}
        })

        const commentsData = commentsResponse.data.data
        const emojiData = emojiResponse.data.data.data
        comments = parseBilibiliComments(commentsData.data?.replies || [], emojiData)
        commentCount = dynamicInfo.item.modules?.module_stat?.comment?.count || 0
      } catch (error) {
        console.warn('获取动态评论失败:', error)
      }
    }

    // 解析动态内容
    const dynamicContent = parseDynamicContent(dynamicInfo)

    // 格式化为统一的VideoInfo接口
    const videoInfo: VideoInfo = {
      id: dynamicInfo.item.id_str,
      title: dynamicContent.title || `${dynamicInfo.item.modules.module_author.name}的动态`,
      description: dynamicContent.description || '',
      thumbnail: dynamicContent.thumbnail || dynamicInfo.item.modules.module_author.face,
      duration: '0:00',
      views: formatCount(dynamicInfo.item.modules?.module_stat?.view?.count || 0),
      likes: formatCount(dynamicInfo.item.modules?.module_stat?.like?.count || 0),
      author: dynamicInfo.item.modules.module_author.name || '未知用户',
      type: dynamicContent.type,
      downloadUrl: undefined,
      images: dynamicContent.images,
      tags: [],
      comments,
      commentCount
    }

    return videoInfo
  } catch (error: any) {
    throw new Error(`哔哩哔哩动态解析失败: ${error.message}`)
  }
}

/**
 * 解析动态内容
 * @param dynamicInfo 动态信息
 * @returns 解析后的动态内容
 */
const parseDynamicContent = (dynamicInfo: BiliDynamicInfo['data']['data']) => {
  const item = dynamicInfo.item
  const moduleType = item.type

  switch (moduleType) {
    case 'DYNAMIC_TYPE_DRAW': // 图文动态
      return {
        title: '图文动态',
        description: item.modules.module_dynamic?.desc?.text || '',
        thumbnail: item.modules.module_dynamic?.major?.draw?.items?.[0]?.src || '',
        images: item.modules.module_dynamic?.major?.draw?.items?.map((img: any) => img.src) || [],
        type: 'note' as const
      }

    case 'DYNAMIC_TYPE_WORD': // 纯文字动态
      return {
        title: '文字动态',
        description: item.modules.module_dynamic?.desc?.text || '',
        thumbnail: '',
        images: [],
        type: 'note' as const
      }

    case 'DYNAMIC_TYPE_AV': // 视频动态
      return {
        title: item.modules.module_dynamic?.major?.archive?.title || '视频动态',
        description: item.modules.module_dynamic?.major?.archive?.desc || '',
        thumbnail: item.modules.module_dynamic?.major?.archive?.cover || '',
        images: [],
        type: 'video' as const
      }

    case 'DYNAMIC_TYPE_FORWARD': // 转发动态
      return {
        title: '转发动态',
        description: item.modules.module_dynamic?.desc?.text || '',
        thumbnail: '',
        images: [],
        type: 'note' as const
      }

    default:
      return {
        title: '动态内容',
        description: item.modules.module_dynamic?.desc?.text || '',
        thumbnail: '',
        images: [],
        type: 'note' as const
      }
  }
}

/**
 * 获取动态评论类型映射
 * @param dynamicType 动态类型
 * @returns 评论类型
 */
const getDynamicCommentType = (dynamicType: string): number => {
  // 根据动态类型返回对应的评论类型
  // 这个映射需要根据B站API文档确定
  switch (dynamicType) {
    case 'DYNAMIC_TYPE_AV':
      return 1 // 视频评论
    case 'DYNAMIC_TYPE_DRAW':
    case 'DYNAMIC_TYPE_WORD':
    case 'DYNAMIC_TYPE_FORWARD':
      return 17 // 动态评论
    default:
      return 17
  }
}

/**
 * 获取动态OID
 * @param dynamicInfo 动态信息
 * @param dynamicCard 动态卡片信息
 * @returns OID
 */
const getDynamicOid = (dynamicInfo: BiliDynamicInfo['data'], dynamicCard: BiliDynamicCard['data']): string => {
  // 根据动态类型返回对应的OID
  const item = dynamicInfo.item

  switch (item.type) {
    case 'DYNAMIC_TYPE_AV':
      return item.modules.module_dynamic?.major?.archive?.aid?.toString() || item.id_str
    case 'DYNAMIC_TYPE_WORD':
    case 'DYNAMIC_TYPE_FORWARD':
      return item.id_str
    default:
      return dynamicCard.card.desc.rid.toString()
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
