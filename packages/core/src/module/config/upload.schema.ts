/**
 * 上传和下载配置 Schema
 */
import type { SectionSchema } from './schema'
import { $not, $or, $var } from './schema'

export const uploadConfigSchema: SectionSchema = {
  key: 'upload',
  title: '上传和下载相关',
  subtitle: '此处为视频上传和下载相关的用户偏好设置',
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
    },
    { type: 'divider', title: '下载限速配置' },
    {
      key: 'downloadThrottle',
      type: 'switch',
      label: '下载限速',
      description: '开启后会限制下载速度，避免触发服务器风控导致连接被重置（ECONNRESET）。如果下载时经常报错"连接被重置"，建议开启'
    },
    {
      key: 'downloadMaxSpeed',
      type: 'input',
      inputType: 'number',
      label: '最大下载速度',
      description: '单位：MB/s，建议设置为 5-20 之间。设置过高可能触发风控，设置过低会影响下载体验',
      disabled: $not('downloadThrottle'),
      rules: [{ min: 1, max: 1000, error: '请输入一个范围在 1 到 1000 之间的数字' }]
    },
    {
      key: 'downloadAutoReduce',
      type: 'switch',
      label: '断流自动降速',
      description: '当检测到连接被重置时自动降低下载速度，每次断流后速度会降低到当前的 60%',
      disabled: $not('downloadThrottle')
    },
    {
      key: 'downloadMinSpeed',
      type: 'input',
      inputType: 'number',
      label: '最低下载速度',
      description: '单位：MB/s，自动降速时不会低于此值',
      disabled: $or($not('downloadThrottle'), $not('downloadAutoReduce')),
      rules: [{ min: 0.1, max: 100, error: '请输入一个范围在 0.1 到 100 之间的数字' }]
    }
  ]
}
