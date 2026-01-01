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
      type: 'switch',
      label: '解析开关',
      description: '小红书解析开关，此开关为单独开关'
    },
    {
      key: 'tip',
      type: 'switch',
      label: '解析提示',
      description: '小红书解析提示，发送提示信息："检测到小红书链接，开始解析"',
      disabled: $not('switch')
    },
    {
      key: 'sendContent',
      type: 'checkbox',
      label: '解析时发送的内容',
      description: '若什么都不选，可能不会返回任何解析结果',
      orientation: 'horizontal',
      disabled: $not('switch'),
      options: [
        { label: '笔记信息', value: 'info' },
        { label: '评论列表', value: 'comment' },
        { label: '笔记图片', value: 'image' },
        { label: '视频文件', value: 'video', description: '仅对视频笔记有效' }
      ]
    },
    {
      key: 'numcomment',
      type: 'input',
      inputType: 'number',
      label: '评论解析数量',
      disabled: $or($not('switch'), $not($includes('sendContent', 'comment'))),
      rules: [{ min: 1 }]
    },
    { type: 'divider', title: '渲染与画质设置' },
    {
      key: 'videoQuality',
      type: 'radio',
      label: '画质偏好',
      description: '解析视频的分辨率偏好。',
      orientation: 'horizontal',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video'))),
      options: [
        { label: '自动选择', value: 'adapt', description: '根据「视频体积上限（MB）」自动选择分辨率进行下载' },
        { label: '标清 540p', value: '540p' },
        { label: '高清 720p', value: '720p' },
        { label: '高清 1080p', value: '1080p' },
        { label: '超清 2k', value: '2k' },
        { label: '超清 4k', value: '4k' }
      ]
    },
    {
      key: 'maxAutoVideoSize',
      type: 'input',
      inputType: 'number',
      label: '视频体积上限（MB）',
      description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
      disabled: $or($not('switch'), $not($includes('sendContent', 'video')), $ne('videoQuality', 'adapt')),
      rules: [{ min: 1, max: 20000 }]
    }
  ]
}
