/**
 * 快手配置 Schema
 */
import type { SectionSchema } from './schema'
import { $not, $or } from './schema'

export const kuaishouConfigSchema: SectionSchema = {
  key: 'kuaishou',
  title: '快手相关',
  subtitle: '此处为快手相关的用户偏好设置',
  fields: [
    {
      key: 'switch',
      label: '解析开关',
      description: '快手解析开关，此开关为单独开关'
    },
    { description: '评论详情设置', descPosition: 20 },
    {
      key: 'comment',
      label: '评论解析',
      description: '快手评论解析，开启后可发送快手作品评论图',
      disabled: $not('switch')
    },
    {
      key: 'numcomment',
      type: 'number',
      label: '评论解析数量',
      disabled: $or($not('switch'), $not('comment')),
      rules: [{ min: 1 }]
    }
  ]
}
