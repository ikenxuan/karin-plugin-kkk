/** 本模板的数据类型（路由 index.tsx 与 components/ 实现共用）。 */

/** 单个发布渠道的可用版本信息 */
export interface UpdateChannelInfo {
  /** 渠道显示名：正式版 / 测试版 / 预览版 */
  label: string
  /** npm dist-tag：latest / beta / rc */
  tag: string
  /** 对应命令 */
  command: string
  /** 渠道当前可用版本（获取失败为空串） */
  version: string
  /** 是否成功获取到版本 */
  available: boolean
  /** 渠道版本是否高于当前安装版本 */
  hasUpdate: boolean
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
