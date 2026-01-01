/**
 * 上传配置 Schema
 */
import type { SectionSchema } from './schema'
import { $not, $or, $var } from './schema'

export const uploadConfigSchema: SectionSchema = {
  key: 'upload',
  title: '上传相关',
  subtitle: '此处为上传相关的用户偏好设置',
  fields: [
    { type: 'divider', title: '发送方式配置' },
    {
      key: 'sendbase64',
      type: 'switch',
      label: '转换Base64',
      description: '发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启。与「群文件上传」互斥。',
      disabled: $var('usegroupfile')
    },
    {
      key: 'usegroupfile',
      type: 'switch',
      label: '群文件上传',
      description: '使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」。与「转换Base64」互斥',
      disabled: $var('sendbase64')
    },
    {
      key: 'groupfilevalue',
      type: 'input',
      inputType: 'number',
      label: '群文件上传阈值',
      description: '当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效',
      disabled: $or($not('usegroupfile'), $var('sendbase64')),
      rules: [{ min: 1 }]
    },
    { type: 'divider', title: '上传拦截配置' },
    {
      key: 'usefilelimit',
      type: 'switch',
      label: '视频上传拦截',
      description: '开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。'
    },
    {
      key: 'filelimit',
      type: 'input',
      inputType: 'number',
      label: '视频拦截阈值',
      description: '视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。',
      disabled: $not('usefilelimit'),
      rules: [{ min: 1 }]
    },
    { type: 'divider', title: '视频压缩配置' },
    {
      key: 'compress',
      type: 'switch',
      label: '压缩视频',
      description: '开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」'
    },
    {
      key: 'compresstrigger',
      type: 'input',
      inputType: 'number',
      label: '压缩触发阈值',
      description: '触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效',
      disabled: $not('compress'),
      rules: [{ min: 1 }]
    },
    {
      key: 'compressvalue',
      type: 'input',
      inputType: 'number',
      label: '压缩后的值',
      description: '单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效',
      disabled: $not('compress'),
      rules: [{ min: 1 }]
    }
  ]
}
