export type DouyinPushType = 'post' | 'favorite' | 'recommend' | 'live'
export type BilibiliPushType = 'video' | 'draw' | 'word' | 'live' | 'forward' | 'article'
export type PushFilterMode = 'blacklist' | 'whitelist'
export type PushPlatform = 'douyin' | 'bilibili'
export type PushlistDevice = 'desktop' | 'mobile'

export interface PushTypeOption<T extends string = string> {
  label: string
  value: T
  description: string
}

export interface PushFilterModeOption {
  label: string
  value: PushFilterMode
  description: string
}

export interface PushTargetMapping {
  groupId: string
  botId: string
  groupName?: string
  groupAvatar?: string
  botName?: string
  botAvatar?: string
  isOnline?: boolean
}

export interface DouyinPushItem {
  switch: boolean
  sec_uid: string
  short_id: string
  group_id: string[]
  remark: string
  pushTypes?: DouyinPushType[]
  filterMode?: PushFilterMode
  Keywords?: string[]
  Tags?: string[]
}

export interface BilibiliPushItem {
  switch: boolean
  host_mid: number
  group_id: string[]
  remark: string
  pushTypes?: BilibiliPushType[]
  filterMode?: PushFilterMode
  Keywords?: string[]
  Tags?: string[]
}

export interface PushlistManagerProps {
  douyinList: DouyinPushItem[]
  bilibiliList: BilibiliPushItem[]
  onDouyinChange: (list: DouyinPushItem[]) => void
  onBilibiliChange: (list: BilibiliPushItem[]) => void
  device: PushlistDevice
}
