import type { RichTextDocument } from '@kkk/richtext'

import type { BaseComponentProps } from '../../../index'
import type { BilibiliDynamicBaseData } from './normal'

/**
 * B站视频动态组件属性接口
 */
export interface BilibiliVideoDynamicProps extends BaseComponentProps<
  BilibiliDynamicBaseData & {
    /** 视频标题 */
    text: RichTextDocument
    /** 视频描述 */
    desc: RichTextDocument
    /** 动态正文（富文本文档） */
    dynamic_text: RichTextDocument | null
    /** 视频封面图片URL */
    image_url: string
    /** 硬币数 */
    coin: string | number
    /** 浏览量 */
    view: string | number
    /** 视频时长 */
    duration_text: string
    /** 视频分P数量 */
    page_length: number
    /** 共创者列表 (可选) */
    staff?: Array<{
      /** 用户ID */
      mid: number
      /** 职位标题 (UP主/参演) */
      title: string
      /** 用户名 */
      name: string
      /** 头像URL */
      face: string
      /** 粉丝数 */
      follower: number
    }>
  }
> {}
