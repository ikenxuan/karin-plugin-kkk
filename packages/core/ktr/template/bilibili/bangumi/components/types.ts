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
  /** UP主信息（部分版权番剧接口不返回，缺失时用制作公司与追番数兜底） */
  UPInfo?: BangumiBilibiliUPInfo
  /** 制作人员（部分番剧的 actors 只有声优，制作信息在这里；UPInfo 缺失时用于兜底） */
  Staff?: string
  /** 版权信息 */
  Copyright: string
  /** 统计数据 */
  Stat: BangumiBilibiliStat
  /** 剧集列表（按展示顺序传入，最新一集在前） */
  Episodes: BangumiBilibiliEpisode[]
  /** 剧集总数 */
  length: number
  /** 选集有效期（秒，与 core 的 EPISODE_SELECTION_TTL_SECONDS 一致）；不传按 120 秒处理 */
  timeoutSeconds?: number
  /** 选集交互方式：text 为回复集数，button 为按钮（QQBot）；不传按 text 处理 */
  selectionMode?: 'text' | 'button'
  /** 海报当前页码（从 1 开始），不传按第 1 页处理 */
  posterPage?: number
  /** 海报每页展示的剧集数，不传按 15 集处理 */
  posterPageSize?: number
}
