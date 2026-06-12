import type { ConfigFileKey, SelectOption } from './types'

export const sendContentOptions: SelectOption[] = [
  { label: '信息', value: 'info' },
  { label: '评论图', value: 'comment' },
  { label: '视频', value: 'video' },
  { label: '图片', value: 'image' }
]

export const displayContentOptions: SelectOption[] = [
  { label: '封面', value: 'cover' },
  { label: '标题', value: 'title' },
  { label: '作者', value: 'author' },
  { label: '统计', value: 'stats' },
  { label: '简介', value: 'desc' }
]

export const qualityOptions: SelectOption[] = [
  { label: '自动选择', value: 'adapt', description: '根据「视频体积上限（MB）」自动选择分辨率进行下载' },
  { label: '标清 540p', value: '540p' },
  { label: '高清 720p', value: '720p' },
  { label: '高清 1080p', value: '1080p' },
  { label: '超清 2k', value: '2k' },
  { label: '超清 4k', value: '4k' }
]

export const bilibiliQualityOptions: SelectOption[] = [
  { label: '自动选择', value: '0' },
  { label: '240P 极速', value: '6' },
  { label: '360P 流畅', value: '16' },
  { label: '480P 清晰', value: '32', description: '需登录（配置ck）' },
  { label: '720P 高清', value: '64', description: '需登录（配置ck）' },
  { label: '720P60 高帧率', value: '74', description: '需登录（配置ck）' },
  { label: '1080P 高清', value: '80', description: '需登录（配置ck）' },
  { label: '1080P+ 高码率', value: '112', description: '需大会员&视频支持' },
  { label: '1080P60 高帧率', value: '116', description: '需大会员&视频支持' },
  { label: '4K 超清', value: '120', description: '需大会员&视频支持' },
  { label: '8K 超高清', value: '127', description: '需大会员&视频支持' }
]

export const permissionOptions: SelectOption[] = [
  { label: '所有人', value: 'all' },
  { label: '管理员', value: 'admin' },
  { label: '主人', value: 'master' },
  { label: '群主', value: 'group.owner' },
  { label: '群管理员', value: 'group.admin' }
]

export const videoCodecOptions: SelectOption[] = [
  { label: 'H.264', value: 'h264', description: '兼容性最好，支持几乎所有设备' },
  { label: 'H.265', value: 'h265', description: '压缩率更高，近几年设备支持良好（推荐）' },
  { label: 'AV1', value: 'av1', description: '最新编码格式，压缩率最高，但编码较慢' }
]

export const verticalModeOptions: SelectOption[] = [
  { label: '关闭', value: 'off', description: '保持原始比例，不做转换' },
  { label: '智能', value: 'standard', description: '仅对宽屏比例视频生效' },
  { label: '强制 9:16', value: 'force', description: '所有视频统一转为 9:16 竖屏' }
]

export const danmakuAreaOptions: SelectOption[] = [
  { label: '1/4 屏', value: '0.25', description: '仅顶部区域' },
  { label: '半屏', value: '0.5', description: '上半部分（推荐）' },
  { label: '3/4 屏', value: '0.75', description: '大部分区域' },
  { label: '全屏', value: '1', description: '铺满整个画面' }
]

export const fontSizeOptions: SelectOption[] = [
  { label: '小号', value: 'small' },
  { label: '中号', value: 'medium' },
  { label: '大号', value: 'large' }
]

export const booleanText = {
  enabled: '已开启',
  disabled: '已关闭'
}

export const configFiles: Array<{ key: ConfigFileKey; label: string; description: string }> = [
  { key: 'amagi', label: '解析库', description: '请求与 Cookies' },
  { key: 'app', label: '通用', description: '运行与交互' },
  { key: 'douyin', label: '抖音', description: '解析与推送' },
  { key: 'bilibili', label: '哔哩哔哩', description: '解析与推送' },
  { key: 'kuaishou', label: '快手', description: '快手解析' },
  { key: 'xiaohongshu', label: '小红书', description: '小红书解析' },
  { key: 'pushlist', label: '推送列表', description: '订阅 JSON' }
]
