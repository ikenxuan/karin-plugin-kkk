/**
 * 抖音作品类型工具模块
 * 提供统一的作品类型判断和处理逻辑
 */

/**
 * 抖音作品主类型
 */
export enum DouyinWorkMainType {
  /** 视频作品 */
  VIDEO = 'video',
  /** 图文作品（包含图集和合辑） */
  IMAGE = 'image',
  /** 文章作品 */
  ARTICLE = 'article',
  /** 直播 */
  LIVE = 'live',
  /** 音乐 */
  MUSIC = 'music',
  /** 未知类型 */
  UNKNOWN = 'unknown'
}

/**
 * 图文作品子类型
 */
export enum DouyinImageSubType {
  /** 图集（纯静态图片或包含 live 图） */
  GALLERY = 'gallery',
  /** 合辑（图片+视频混合） */
  COLLECTION = 'collection'
}

/**
 * 作品类型详细信息
 */
export interface DouyinWorkTypeInfo {
  /** 主类型 */
  mainType: DouyinWorkMainType
  /** 子类型（仅图文作品有） */
  subType?: DouyinImageSubType
  /** 是否为视频 */
  isVideo: boolean
  /** 是否为图文 */
  isImage: boolean
  /** 是否为文章 */
  isArticle: boolean
  /** 是否为直播 */
  isLive: boolean
  /** 是否为图集 */
  isGallery: boolean
  /** 是否为合辑 */
  isCollection: boolean
  /** 模板路径 */
  templatePath: 'douyin/video-work' | 'douyin/image-work' | 'douyin/article-work' | 'douyin/live'
}

export type DouyinLivePhotoMode = 'video_and_livephoto' | 'video_only' | 'livephoto_only'

export interface DouyinLiveImageSendPolicy {
  shouldGenerateVideo: boolean
  shouldGenerateLivePhoto: boolean
}

/**
 * 从 URL 路径判断作品类型
 */
export function getWorkTypeFromUrl(url: string): DouyinWorkMainType {
  if (/\/video\//.test(url)) return DouyinWorkMainType.VIDEO
  if (/\/note\//.test(url)) return DouyinWorkMainType.IMAGE
  if (/\/article\//.test(url)) return DouyinWorkMainType.ARTICLE
  if (/live\.douyin\.com/.test(url) || /webcast\.amemv\.com/.test(url)) return DouyinWorkMainType.LIVE
  if (/\/music\//.test(url)) return DouyinWorkMainType.MUSIC
  return DouyinWorkMainType.UNKNOWN
}

/**
 * 从作品数据判断详细类型信息
 */
export function getWorkTypeInfo(data: {
  aweme_type?: number
  media_type?: number
  images?: any[] | null
  video?: any
  is_slides?: boolean
  article_info?: any
  live_data?: any
}): DouyinWorkTypeInfo {
  // 直播类型（有 live_data 对象）
  if (data.live_data) {
    return {
      mainType: DouyinWorkMainType.LIVE,
      isVideo: false,
      isImage: false,
      isArticle: false,
      isLive: true,
      isGallery: false,
      isCollection: false,
      templatePath: 'douyin/live'
    }
  }

  // 文章类型（aweme_type === 163）
  if (data.aweme_type === 163 || data.article_info) {
    return {
      mainType: DouyinWorkMainType.ARTICLE,
      isVideo: false,
      isImage: false,
      isArticle: true,
      isLive: false,
      isGallery: false,
      isCollection: false,
      templatePath: 'douyin/article-work'
    }
  }

  // 图文类型（有 images 数组）
  if (data.images && data.images.length > 0) {
    const subType = data.is_slides === true ? DouyinImageSubType.COLLECTION : DouyinImageSubType.GALLERY

    return {
      mainType: DouyinWorkMainType.IMAGE,
      subType,
      isVideo: false,
      isImage: true,
      isArticle: false,
      isLive: false,
      isGallery: subType === DouyinImageSubType.GALLERY,
      isCollection: subType === DouyinImageSubType.COLLECTION,
      templatePath: 'douyin/image-work'
    }
  }

  // 视频类型（默认）
  return {
    mainType: DouyinWorkMainType.VIDEO,
    isVideo: true,
    isImage: false,
    isArticle: false,
    isLive: false,
    isGallery: false,
    isCollection: false,
    templatePath: 'douyin/video-work'
  }
}

/** 抖音图床低分辨率处理模板（如 ~tplv-dy-360p.jpeg），命中说明该封面 URL 被 CDN 降质 */
const LOW_RES_COVER_PATTERN = /~tplv-[^/?]*(?:270p|360p|480p|540p)/i

/**
 * 获取作品封面 URL
 */
export function getWorkCoverUrl(
  workTypeInfo: DouyinWorkTypeInfo,
  data: {
    video?: {
      animated_cover?: { url_list: string[] }
      cover_original_scale?: { url_list: string[] }
      origin_cover?: { url_list: string[] }
      cover?: { url_list: string[] }
    }
    images?: Array<{ url_list: string[] }>
    article_info?: {
      article_content?: string
    }
  }
): string {
  // 视频封面
  if (workTypeInfo.isVideo && data.video) {
    // 详情接口没有 animated_cover，会落到 cover_original_scale，
    // 而它的 url_list[0] 常是 ~tplv-dy-360p 这类 CDN 降质模板（签名绑定路径，无法改 URL 还原）。
    // 所以按优先级收集所有候选后，优先取未命中低清模板的；全部命中时维持原优先级兜底。
    const candidates = [
      data.video.animated_cover,
      data.video.cover_original_scale,
      data.video.origin_cover,
      data.video.cover
    ].flatMap((field) => field?.url_list ?? [])
    return candidates.find((url) => !LOW_RES_COVER_PATTERN.test(url)) ?? candidates[0] ?? ''
  }

  // 图文封面
  if (workTypeInfo.isImage && data.images && data.images.length > 0) {
    return data.images[0].url_list[0] ?? ''
  }

  // 文章封面
  if (workTypeInfo.isArticle && data.article_info?.article_content) {
    try {
      const content = JSON.parse(data.article_info.article_content)
      return content.head_poster_list?.url_list?.[0] ?? ''
    } catch {
      return ''
    }
  }

  return ''
}

/**
 * 获取作品类型的显示名称
 */
export function getWorkTypeDisplayName(workTypeInfo: DouyinWorkTypeInfo): string {
  if (workTypeInfo.isVideo) return '视频'
  if (workTypeInfo.isGallery) return '图集'
  if (workTypeInfo.isCollection) return '合辑'
  if (workTypeInfo.isArticle) return '文章'
  if (workTypeInfo.isLive) return '直播'
  return '未知'
}

/**
 * 判断是否需要特殊处理（如 live 图）
 */
export function needsSpecialImageProcessing(workTypeInfo: DouyinWorkTypeInfo, images?: Array<{ clip_type?: number }>): boolean {
  if (!workTypeInfo.isImage || !images) return false

  // 检查是否包含 live 图（clip_type !== 2）
  return images.some((item) => item.clip_type !== 2 && item.clip_type !== undefined)
}

/**
 * 抖音图文里的 clip_type=5 才能生成系统实况图；clip_type=4 是短片。
 * 用户选择仅发送实况图时，短片仍需兜底成视频节点，避免生成空合并转发。
 */
export function getDouyinLiveImageSendPolicy(
  clipType: number | undefined,
  livePhotoMode: DouyinLivePhotoMode = 'video_and_livephoto'
): DouyinLiveImageSendPolicy {
  const isStaticImage = clipType === 2 || clipType === undefined
  const canGenerateLivePhoto = clipType === 5
  const shouldFallbackToVideo = livePhotoMode === 'livephoto_only' && !isStaticImage && !canGenerateLivePhoto

  return {
    shouldGenerateVideo: livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'video_only' || shouldFallbackToVideo,
    shouldGenerateLivePhoto: canGenerateLivePhoto && (livePhotoMode === 'video_and_livephoto' || livePhotoMode === 'livephoto_only')
  }
}
