/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

/**
 * 渠道版本查询状态。
 * - `ok`      成功取到 dist-tag 版本
 * - `missing` npm 上不存在该 dist-tag（从未发布过该渠道）
 * - `error`   registry 查询失败（网络/镜像异常）
 * - `skipped` 该渠道不走 npm 订阅（金丝雀经 pkg.pr.new 分发）
 */
export type UpdateChannelStatus = 'ok' | 'missing' | 'error' | 'skipped'

/** 单个发布渠道的可用版本信息 */
export interface UpdateChannelInfo {
  /** 渠道显示名：正式版 / 测试版 / 预览版 / 金丝雀 */
  label: string
  /** npm dist-tag：latest / beta / rc；金丝雀为分发方式名 */
  tag: string
  /** 对应命令；金丝雀无命令 */
  command?: string
  /** 渠道当前可用版本（仅 status=ok 时有值） */
  version?: string
  /** 渠道版本查询状态 */
  status: UpdateChannelStatus
  /** 渠道版本是否高于当前安装版本（仅 status=ok 时有意义） */
  hasUpdate?: boolean
}

/** #kkk更新 用法面板数据 */
export interface UpdateHelpData {
  /** 当前安装版本号 */
  currentVersion: string
  /** 当前安装渠道显示名 */
  currentChannel: string
  /** 各渠道可用版本 */
  channels: UpdateChannelInfo[]
}
