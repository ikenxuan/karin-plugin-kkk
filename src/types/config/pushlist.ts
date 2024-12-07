/** 定义推送列表项的接口 */
export interface douyinPushItem {
  /** sec_uid，与short_id二选一 */
  sec_uid: string
  /** 抖音号，与sec_uid二选一 */
  short_id: string
  /** 推送群号和机器人账号，多个则使用逗号隔开，必填。如：群号1:机器人账号1 */
  group_id: string[]
  /** 博主或UP主的名字信息，可不填 */
  remark: string
}

/** 定义推送列表项的接口 */
export interface bilibiliPushItem {
  /** B站用户的UID，必填 */
  host_mid: string
  /** 推送群号和机器人账号，多个则使用逗号隔开，必填。如：群号1:机器人账号1 */
  group_id: string[]
  /** 博主或UP主的名字信息，可不填 */
  remark: string
}

/** 定义抖音和B站推送列表的接口 */
export interface pushlistConfig {
  [key: string]: any
  /** 抖音推送列表的接口 */
  douyin: douyinPushItem[]
  /** B站推送列表的接口 */
  bilibili: bilibiliPushItem[]
}
