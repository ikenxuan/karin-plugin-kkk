/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

/**
 * 渠道版本查询状态。
 * - `ok`      成功取到 dist-tag 版本
 * - `missing` npm 上不存在该 dist-tag（从未发布过该渠道）
 * - `error`   registry / pkg.pr.new 查询失败（网络异常）
 * - `canary`  金丝雀行：展示 pkg.pr.new 上 main 分支的最新构建，纯展示无更新订阅
 */
export type UpdateChannelStatus = 'ok' | 'missing' | 'error' | 'canary'

/** 单个发布渠道的可用版本信息 */
export interface UpdateChannelInfo {
  /** 渠道显示名：正式版 / 测试版 / 预览版 / 金丝雀 */
  label: string
  /** npm dist-tag：latest / beta / rc；金丝雀行固定为 pkg.pr.new · main */
  tag: string
  /** 对应命令；金丝雀无渠道命令（安装命令见 installCommand） */
  command?: string
  /** 渠道当前可用版本（status=ok 时为 dist-tag 版本；canary 时为短 sha） */
  version?: string
  /** 渠道版本查询状态 */
  status: UpdateChannelStatus
  /** 渠道版本是否高于当前安装版本（仅 status=ok 时有意义） */
  hasUpdate?: boolean
  /** 金丝雀：安装命令 `pnpm add {pkg.pr.new url} -w`（用户自行复制执行） */
  installCommand?: string
  /** 金丝雀：发布时间（ISO 字符串原样透传，模板侧用 date-fns 格式化） */
  publishedAt?: string
  /** 金丝雀：commit 信息（截断） */
  commitMessage?: string
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
