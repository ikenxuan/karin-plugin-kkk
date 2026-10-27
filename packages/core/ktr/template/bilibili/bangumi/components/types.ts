/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */
import type { BangumiBilibiliEpisode, BangumiBilibiliNewEP, BangumiBilibiliStat, BangumiBilibiliUPInfo } from '../../components/types'

/**
 * B站番剧组件数据接口
 */
export interface BangumiBilibiliData {
  /** 主封面图片URL */
  mainCover: string
  /** 演员信息 */
  Actors: string
  /** 番剧评价描述 */
  Evaluate: string
  /** 番剧链接 */
  Link: string
  /** 最新剧集信息 */
  newEP: BangumiBilibiliNewEP
  /** 番剧标题 */
  Title: string
  /** 番剧风格标签 */
  Styles: string[]
  /** 季度ID */
  seasonID: number
  /** 副标题信息 */
  subtitle: string
  /** UP主信息 */
  UPInfo: BangumiBilibiliUPInfo
  /** 版权信息 */
  Copyright: string
  /** 统计数据 */
  Stat: BangumiBilibiliStat
  /** 剧集列表（按展示顺序传入，最新一集在前） */
  Episodes: BangumiBilibiliEpisode[]
  /** 剧集总数 */
  length: number
  /** 选集交互方式：text 为回复集数，button 为按钮（QQBot）；不传按 text 处理 */
  selectionMode?: 'text' | 'button'
  /** 海报当前页码（从 1 开始），不传按第 1 页处理 */
  posterPage?: number
  /** 海报每页展示的剧集数，不传按 15 集处理 */
  posterPageSize?: number
}
