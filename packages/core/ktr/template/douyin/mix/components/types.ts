/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

/**
 * 抖音合集选集页数据（短剧 / 普通合集）
 */
export interface DouyinMixData {
  /** 合集类型：短剧每集共用一段简介，按集号网格选集；普通合集每集是独立作品，按标题列表选集 */
  kind: 'playlet' | 'collection'
  /** 合集名称 */
  mix_name: string
  /** 合集封面 URL（短剧是 2:3 竖版海报，普通合集是方图） */
  image_url: string
  /** 剧情简介（短剧取第一集文案，已去掉话题标签；普通合集为空） */
  desc: string
  /** 合集总集数（普通合集没有计划集数，等于已更新集数） */
  total_episode: number
  /** 已更新到第几集 */
  updated_to_episode: number
  /** 作者信息 */
  author: {
    /** 昵称 */
    nickname: string
    /** 头像 URL */
    avatar: string
    /** 抖音号 */
    short_id: string
    /** 粉丝数 */
    follower_count: number
    /** 是否认证 */
    verified: boolean
  }
  /** 已拉取剧集的数据汇总 */
  statistics: {
    /** 总播放 */
    play_count: number
    /** 总点赞 */
    digg_count: number
    /** 总收藏 */
    collect_count: number
  }
  /** 已拉取到的剧集，顺序同接口返回；接口没返回的集不在这里 */
  episodes: Array<{
    /** 第几集 */
    episode: number
    /** 本集标题（作品文案，已去掉话题标签；可能为空） */
    title: string
    /** 时长（毫秒） */
    duration: number
  }>
  /** 等待用户选集的秒数（与 core 的 karin.ctx 超时一致） */
  timeoutSeconds: number
}
