/**
 * 应用配置 Schema
 */
import os from 'node:os'

import type { SectionSchema } from './schema'
import { $ne, $not, $or, $var } from './schema'

export const appConfigSchema: SectionSchema = {
  key: 'app',
  title: '插件应用相关',
  subtitle: '此处用于管理插件的基本设置',
  fields: [
    { type: 'divider', title: '缓存设置' },
    {
      key: 'removeCache',
      type: 'switch',
      label: '缓存删除',
      description: '下载的视频缓存自动删除，非必要不修改！'
    },
    { type: 'divider', title: '解析优先级设置' },
    {
      key: 'videoTool',
      type: 'switch',
      label: '默认解析',
      description: '即识别最高优先级，修改后重启生效'
    },
    {
      key: 'priority',
      type: 'input',
      inputType: 'number',
      label: '自定义优先级',
      description: '自定义优先级，「默认解析」关闭后才会生效。修改后重启生效',
      disabled: $var('videoTool')
    },
    { type: 'divider', title: '渲染配置' },
    {
      key: 'renderScale',
      type: 'input',
      inputType: 'number',
      label: '渲染精度',
      description: '可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度',
      rules: [{ min: 50, max: 200 }]
    },
    {
      key: 'Theme',
      type: 'radio',
      label: '渲染图片的主题色',
      orientation: 'horizontal',
      options: [
        { label: '自动', value: '0', description: '06:00-18:00为浅色，18:00-06:00为深色' },
        { label: '浅色', value: '1' },
        { label: '深色', value: '2' }
      ]
    },
    {
      key: 'RemoveWatermark',
      type: 'switch',
      label: '移除水印',
      description: '渲染的图片是否移除底部水印'
    },
    {
      key: 'RenderWaitTime',
      type: 'input',
      inputType: 'number',
      label: '渲染图片的等待时间',
      description: os.platform() === 'linux' ? '单位：秒，Linux系统下不能为0' : '单位：秒，传递 0 可禁用',
      rules: [
        os.platform() === 'linux'
          ? { min: 1, error: 'Linux系统下渲染等待时间不能为0' }
          : { min: 0 }
      ]
    },
    {
      key: 'multiPageRender',
      type: 'switch',
      label: '分页渲染',
      description: '将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改！'
    },
    {
      key: 'multiPageHeight',
      type: 'input',
      inputType: 'number',
      label: '分页渲染时，每页的高度',
      description: '经测试最佳每页高度为12000px，默认12000px',
      disabled: $not('multiPageRender'),
      rules: [{ min: 1000, max: 20000, error: '请输入一个范围在 1000 到 20000 之间的数字' }]
    },
    { type: 'divider', title: 'API服务配置' },
    {
      key: 'APIServer',
      type: 'switch',
      label: 'API服务',
      description: '本地部署一个视频解析API服务，接口范围为本插件用到的所有'
    },
    {
      key: 'APIServerMount',
      type: 'switch',
      label: '挂载到 Karin',
      description: 'API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」',
      disabled: $not('APIServer')
    },
    {
      key: 'APIServerPort',
      type: 'input',
      inputType: 'number',
      label: 'API服务端口',
      disabled: $or($not('APIServer'), $var('APIServerMount')),
      rules: [{ min: 1024, max: 65535, error: '请输入一个范围在 1024 到 65535 之间的数字' }]
    },
    { type: 'divider', title: '交互与认证设置' },
    {
      key: 'EmojiReply',
      type: 'switch',
      label: '表情回应',
      description: '在解析任务开始时添加表情回应，若适配器不支持需要关闭'
    },
    {
      key: 'EmojiReplyID',
      type: 'input',
      inputType: 'number',
      label: '表情 ID',
      disabled: $not('EmojiReply'),
      description: '详情查看：https://koishi.js.org/QFace/#/qqnt 中调试信息的 emojiId 字段，Emoji则是 qcid',
      rules: [{ min: 0, max: 1145141919810 }]
    },
    {
      key: 'webAuth',
      type: 'switch',
      label: '插件 web 鉴权',
      description: '开启后，访问插件自带的 web 页面需要拥有 Karin 的 HTTP 鉴权密钥才能访问。修改后重启生效'
    },
    {
      key: 'errorLogSendTo',
      type: 'checkbox',
      label: '错误日志',
      description: '遇到错误时谁会收到错误日志。注：推送任务只可发送给主人。',
      orientation: 'horizontal',
      options: [
        { label: '除\'console\'外的第一个主人', value: 'master' },
        { label: '触发者（不支持私聊）', value: 'trigger' }
      ]
    },
    { type: 'divider', title: '我的小玩具配置' },
    {
      key: 'qrLoginAddrType',
      type: 'radio',
      label: '扫码登录地址类型',
      description: '生成登录二维码时使用的服务器地址',
      orientation: 'horizontal',
      options: [
        { label: '局域网', value: 'lan', description: '适用于手机和服务器在同一局域网' },
        { label: '外部地址', value: 'external', description: '适用于远程访问，需手动配置' }
      ]
    },
    {
      key: 'qrLoginExternalAddr',
      type: 'input',
      inputType: 'text',
      label: '外部访问地址',
      description: '公网 IP 或域名，如：123.45.67.89 或 example.com',
      placeholder: '请输入公网 IP 或域名',
      disabled: $ne('qrLoginAddrType', 'external')
    }
  ]
}
