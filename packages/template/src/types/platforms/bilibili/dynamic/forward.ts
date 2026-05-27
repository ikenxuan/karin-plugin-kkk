import type { RichTextDocument } from '@kkk/richtext'

import type { BaseComponentProps } from '../../../index'
import type { BilibiliAdditionalData, BilibiliDynamicBaseData, DecorationCardData, UsernameMetadata } from './normal'

/**
 * 原始内容AV类型接口
 */
export interface OriginalContentAV {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: DecorationCardData
  /** 视频封面 */
  cover: string
  /** 视频时长文本 */
  duration_text: string
  /** 播放量 */
  play: string
  /** 弹幕数 */
  danmaku: string
  /** 视频标题 */
  title: RichTextDocument,
  /** 动态文本内容（富文本文档） */
  text: RichTextDocument
}

/**
 * 原始内容图文类型接口
 */
export interface OriginalContentDraw {
  /** 标题 */
  title?: string
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: DecorationCardData
  /** 动态文本内容（富文本文档） */
  text: RichTextDocument
  /** 图片URL数组 */
  image_url: Array<{ image_src: string }>
}

/**
 * 原始内容文字类型接口
 */
export interface OriginalContentWord {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: DecorationCardData
  /** 动态文本内容（富文本文档） */
  text: RichTextDocument,
  /** 相关内容卡片 */
  additional?: BilibiliAdditionalData
}

/**
 * 原始内容直播推荐类型接口
 */
export interface OriginalContentLiveRcmd {
  /** 用户头像URL */
  avatar_url: string
  /** 头像框 */
  frame?: string
  /** 用户名元数据 */
  usernameMeta: UsernameMetadata
  /** 创建时间 */
  create_time: string
  /** 装饰卡片 */
  decoration_card?: DecorationCardData
  /** 直播封面 */
  cover: string
  /** 分区名称 */
  area_name: string
  /** 大文本 */
  text_large: string
  /** 在线人数 */
  online: string
  /** 直播标题 */
  title: RichTextDocument
}

/**
 * 转发动态原始内容Props接口
 */
export interface BilibiliForwardOriginalContentProps {
  /** 原始内容 */
  original_content: {
    /** AV类型内容 */
    DYNAMIC_TYPE_AV?: OriginalContentAV
    /** 图文类型内容 */
    DYNAMIC_TYPE_DRAW?: OriginalContentDraw
    /** 文字类型内容 */
    DYNAMIC_TYPE_WORD?: OriginalContentWord
    /** 直播推荐类型内容 */
    DYNAMIC_TYPE_LIVE_RCMD?: OriginalContentLiveRcmd
  }
}

/**
 * 转发动态内容Props接口
 */
export interface BilibiliForwardContentProps {
  /** 动态文本内容（富文本文档） */
  text: RichTextDocument
  /** 原始内容 */
  original_content: BilibiliForwardOriginalContentProps['original_content']
}

/**
 * B站转发动态组件属性接口
 */
export interface BilibiliForwardDynamicProps extends BaseComponentProps<BilibiliDynamicBaseData & {
  /** 动态文本内容（富文本文档） */
  text: RichTextDocument
  /** 原始内容 */
  original_content: BilibiliForwardOriginalContentProps['original_content']
  /** 图片URL */
  imgList: string[] | null
}> {
}