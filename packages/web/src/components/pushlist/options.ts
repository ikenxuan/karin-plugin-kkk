import type {
  BilibiliPushType,
  DouyinPushType,
  PushFilterModeOption,
  PushTypeOption
} from './types'

export const douyinPushTypeOptions: Array<PushTypeOption<DouyinPushType>> = [
  { label: '作品列表', value: 'post', description: '推送用户发布的作品' },
  { label: '喜欢列表', value: 'favorite', description: '推送用户喜欢的作品' },
  { label: '推荐列表', value: 'recommend', description: '推送推荐的作品' },
  { label: '直播', value: 'live', description: '推送直播状态' }
]

export const bilibiliPushTypeOptions: Array<PushTypeOption<BilibiliPushType>> = [
  { label: '投稿视频', value: 'video', description: '推送UP主投稿的视频' },
  { label: '图文动态', value: 'draw', description: '推送图文动态' },
  { label: '纯文动态', value: 'word', description: '推送纯文字动态' },
  { label: '直播动态', value: 'live', description: '推送直播状态' },
  { label: '转发动态', value: 'forward', description: '推送转发的动态' },
  { label: '投稿专栏', value: 'article', description: '推送专栏文章' }
]

export const filterModeOptions: PushFilterModeOption[] = [
  { label: '黑名单', value: 'blacklist', description: '命中关键词/标签则不推送' },
  { label: '白名单', value: 'whitelist', description: '只推送命中关键词/标签的内容' }
]

