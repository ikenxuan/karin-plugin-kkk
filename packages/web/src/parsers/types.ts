/**
 * 后端数据响应接口
 */
export type ResponseData<T> = {
  /** 数据 */
  data: T,
  /** 平台 */
  platform: string,
  /** 数据类型 */
  dataType: string,
}

/**
 * 评论信息接口
 */
export interface CommentInfo {
  /** 评论ID */
  id: string
  /** 评论作者 */
  author: string
  /** 作者头像 */
  avatar: string
  /** 评论内容（可能包含HTML） */
  content: string
  /** 评论中的图片 */
  images?: string[]
  /** 点赞数 */
  likes: number
  /** 时间戳 */
  timestamp: string
}

/**
 * 合辑项目接口
 * @description 合辑中的单个项目，可以是静态图片、Live Photo或视频
 */
export interface SlideItem {
  /** 项目类型 */
  type: 'image' | 'livephoto' | 'video'
  /** 图片或视频URL */
  url: string
  /** 缩略图URL */
  thumbnail?: string
  /** 视频时长（仅视频和livephoto类型） */
  duration?: string
  /** Live Photo的视频URL（仅livephoto类型） */
  videoUrl?: string
}

/**
 * 视频信息接口
 */
export interface VideoInfo {
  /** 作品ID */
  id: string
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 缩略图 */
  thumbnail: string
  /** 时长 */
  duration: string
  /** 观看数 */
  views: string
  /** 点赞数 */
  likes: string
  /** 作者 */
  author: string
  /** 作品类型 */
  type: 'video' | 'note' | 'slides' | 'dynamic'
  /** 下载链接 */
  downloadUrl?: {
    video?: string,
    audio: string
  }
  /** 图片列表（图集类型） */
  images?: string[]
  /** 合辑项目列表（合辑类型） */
  slides?: SlideItem[]
  /** 标签 */
  tags: string[]
  /** 评论列表 */
  comments: CommentInfo[]
  /** 评论总数 */
  commentCount: number
}

/**
 * 解析后的作品信息
 */
export interface ParsedWorkInfo {
  /** 平台名称 */
  platform: string
  /** 作品ID */
  workId: string
  /** 作品类型 */
  workType: string
  /** 请求参数 */
  params: Record<string, any>
}

export enum HTTPStatusCode {
  /** 成功 */
  OK = 200,
  /** 请求错误 */
  BadRequest = 400,
  /** 未授权 */
  Unauthorized = 401,
  /** 禁止访问 */
  Forbidden = 403,
  /** 未找到 */
  NotFound = 404,
  /** 方法不允许 */
  MethodNotAllowed = 405,
  /** 请求体过大 */
  PayloadTooLarge = 413,
  /** 服务器错误 */
  InternalServerError = 500,
  /** 访问令牌已过期 */
  AccessTokenExpired = 419,
  /** 刷新令牌已过期 */
  RefreshTokenExpired = 420
}

/**
 * 链接解析响应
 */
export interface LinkParseResponse {
  originalUrl: string
  finalUrl: string
  platform: string
}

/**
 * 平台数据响应
 */
export interface PlatformDataResponse {
  code: HTTPStatusCode
  data: any
  platform: string
  dataType: string
  message?: string
}
