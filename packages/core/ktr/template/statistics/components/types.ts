/**
 * 统计海报共用的数据类型。
 *
 * 这两个联合类型与 core 侧 `ParsePlatform` / `ParseWorkType` 一一对应，
 * 但**刻意在这里裸写一份**：模板要能在开发面板的浏览器里跑，不能反向 import `@/module/db`
 * （那条链会把 node-karin/sqlite3 拖进浏览器包）。改 core 侧值域时记得同步这里。
 */

/** 统计覆盖的平台 */
export type StatisticsPlatform = 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu'

/** 解析内容形态 */
export type StatisticsWorkType =
  | 'video'
  | 'gallery'
  | 'collection'
  | 'article'
  | 'live'
  | 'bangumi'
  | 'dynamic'
  | 'music'
  | 'unknown'

/**
 * 解析过程里采集的量化指标（与 core 侧 `ParseMetric` 对齐）。
 * 目前只有解析耗时 —— 作品时长/点赞属于内容属性，不属于解析服务本身的表现。
 */
export type StatisticsMetric = 'duration'

/** 某个指标的分桶分布 */
export interface MetricDistribution {
  /** 指标名 */
  metric: StatisticsMetric
  /**
   * 按耗时从小到大排列的桶。两端连续为空的档已被 core 侧裁掉，
   * 所以**桶数不固定**，按 index 去对应档位是错的，一律用 `upper` 判断。
   */
  buckets: Array<{
    /** 区间口径的标签（如 `3-5s`），做区间图时用 */
    label: string
    /** 累计口径的标签（如 `≤5s`），画累计曲线时用 */
    upper: string
    /** 次数 */
    count: number
  }>
}

/** 平台 × 形态的计数（「平台 × 内容形态」图的数据单元） */
export interface WorkTypeCount {
  /** 平台 */
  platform: StatisticsPlatform
  /** 内容形态 */
  workType: StatisticsWorkType
  /** 解析次数 */
  count: number
}

/** 群组维度的汇总（全局海报的排行/分布图共用） */
export interface GroupSummary {
  /** 群号 */
  groupId: string
  /** 群名，取不到时为空 */
  groupName?: string
  /** 群头像，取不到时为空 */
  groupAvatar?: string
  /** 该群总解析次数 */
  totalParses: number
  /** 该群使用人数 */
  uniqueUsers: number
}

/** 二维分档热力图的数据 */
export interface ActivityHeatmap {
  /** 横轴分档标签 */
  xLabels: string[]
  /** 纵轴分档标签 */
  yLabels: string[]
  /** `[xIndex, yIndex, 人数]`，只包含有人落进去的格子 */
  cells: Array<[number, number, number]>
  /** 最密的格子有多少人，模板侧拿它做色阶归一 */
  max: number
}

/** 分档箱线的数据 */
export interface ActivityBox {
  /** 档位标签 */
  label: string
  /** 落在该档的群数 */
  count: number
  /** 五数概括 `[最小, 下四分位, 中位数, 上四分位, 最大]` */
  box: [number, number, number, number, number]
}
