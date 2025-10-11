/** 适配器账号列表配置 */
export type accountListsConfig = {
  /** QQ账号列表 */
  qq: string[]
  /** 其他平台账号列表可以在这里扩展 */
  [platform: string]: string[]
}

/** 定义推送列表项的接口 */
export type douyinPushItem = {
  /** 是否启用 */
  switch: boolean
  /** sec_uid，与short_id二选一 */
  sec_uid: string
  /** 抖音号，与sec_uid二选一 */
  short_id: string
  /** 推送群号和平台账号，格式: 群号@平台.索引 */
  group_id: string[]
  /** 博主或UP主的名字信息，可不填 */
  remark: string
  /** 黑名单：命中不推送；白名单：命中才推送 */
  filterMode?: 'blacklist' | 'whitelist'
  /** 指定关键词 */
  Keywords?: string[]
  /** 指定标签 */
  Tags?: string[]
}

/** 定义推送列表项的接口 */
export type bilibiliPushItem = {
  /** 是否启用 */
  switch: boolean
  /** B站用户的UID，必填 */
  host_mid: number
  /** 推送群号和平台账号，格式: 群号@平台.索引 */
  group_id: string[]
  /** 博主或UP主的名字信息，可不填 */
  remark: string
  /** 黑名单：命中不推送；白名单：命中才推送 */
  filterMode?: 'blacklist' | 'whitelist'
  /** 指定关键词 */
  Keywords?: string[]
  /** 指定标签 */
  Tags?: string[]
}

/** 定义抖音和B站推送列表的接口 */
export type pushlistConfig = {
  /** 适配器账号列表（按平台分组，数组形式） */
  account_lists: accountListsConfig
  /** 抖音推送列表的接口 */
  douyin: douyinPushItem[]
  /** B站推送列表的接口 */
  bilibili: bilibiliPushItem[]
}
