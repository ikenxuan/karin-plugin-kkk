/**
 * 小红书配置 Schema
 */
import type { SectionSchema } from './schema'
import { $includes, $ne, $not, $or } from './schema'

export const xiaohongshuConfigSchema: SectionSchema = {
  key: 'xiaohongshu',
  title: '小红书相关',
  subtitle: '此处为小红书相关的用户偏好设置',
  fields: [
    {
      key: 'switch',
      label: '解析开关',
      description: '小红书解析开关，此开关为单独开关'
    },
    {
      key: 'sendContent',
      label: '解析时发送的内容',
      description: '若什么都不选，可能不会返回任何解析结果',
      orientation: 'horizontal',
      disabled: $not('switch'),
      checkbox: [
        { key: 'sendContent:checkbox:1', label: '笔记信息', value: 'info' },
        { key: 'sendContent:checkbox:2', label: '评论列表', value: 'comment' },
        { key: 'sendContent:checkbox:3', label: '笔记图片', value: 'image' },
        { key: 'sendContent:checkbox:4', label: '视频文件', value: 'video', description: '仅对视频笔记有效' }
      ]
    },
    {
      key: 'numcomment',
      type: 'number',
      label: '评论解析数量',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment'))),
      rules: [{ min: 1 }]
    },
    { description: '渲染与画质设置', descPosition: 20 },
    {
      key: 'videoQuality',
      label: '画质偏好',
      description: '解析视频的分辨率偏好。',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video'))),
      radio: [
        { key: 'videoQuality:radio-1', label: '自动选择', value: 'adapt', description: '根据「视频体积上限（MB）」自动选择分辨率进行下载' },
        { key: 'videoQuality:radio-2', label: '标清 540p', value: '540p' },
        { key: 'videoQuality:radio-3', label: '高清 720p', value: '720p' },
        { key: 'videoQuality:radio-4', label: '高清 1080p', value: '1080p' },
        { key: 'videoQuality:radio-5', label: '超清 2k', value: '2k' },
        { key: 'videoQuality:radio-6', label: '超清 4k', value: '4k' }
      ]
    },
    {
      key: 'maxAutoVideoSize',
      type: 'number',
      label: '视频体积上限（MB）',
      description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video')), $ne('videoQuality', 'adapt')),
      rules: [{ min: 1, max: 20000 }]
    }
  ]
}
