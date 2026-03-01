/**
 * 应用配置 Schema
 */
import os from 'node:os'

import type { SectionSchema } from './schema'
import { $ne, $not, $or, $var } from './schema'

/**
 * 获取本机局域网 IP 地址
 * 优先返回常见局域网网段的 IP（192.168.x.x, 10.x.x.x, 172.16-31.x.x）
 */
function getLocalIP(): string {
  const interfaces = os.networkInterfaces()
  const candidates: string[] = []

  for (const name of Object.keys(interfaces)) {
    const netInterface = interfaces[name]
    if (!netInterface) continue
    for (const net of netInterface) {
      if (net.family === 'IPv4' && !net.internal) {
        candidates.push(net.address)
      }
    }
  }

  // 优先选择常见局域网网段
  const preferredIP = candidates.find(ip => {
    if (ip.startsWith('192.168.')) return true
    if (ip.startsWith('10.')) return true
    if (ip.startsWith('172.')) {
      const second = parseInt(ip.split('.')[1], 10)
      if (second >= 16 && second <= 31) return true
    }
    return false
  })

  return preferredIP || candidates[0] || '127.0.0.1'
}

export const appConfigSchema: SectionSchema = {
  key: 'app',
  title: '插件应用相关',
  subtitle: '此处用于管理插件的基本设置',
  fields: [
    { description: '缓存设置', descPosition: 20 },
    {
      key: 'removeCache',
      label: '缓存删除',
      description: '下载的视频缓存自动删除，非必要不修改！'
    },
    {
      key: 'downloadImageLocally',
      label: '本地下载图片',
      description: '发送图片时由插件本地下载后使用 file 协议传递，而非直接传递 HTTP 链接给上游下载'
    },
    { description: '解析优先级设置', descPosition: 20 },
    {
      key: 'videoTool',
      label: '默认解析',
      description: '即识别最高优先级，修改后重启生效'
    },
    {
      key: 'priority',
      type: 'number',
      label: '自定义优先级',
      description: '自定义优先级，「默认解析」关闭后才会生效。修改后重启生效',
      disabled: $var('videoTool')
    },
    { description: '渲染配置', descPosition: 20 },
    {
      key: 'renderScale',
      type: 'number',
      label: '渲染精度',
      description: '可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度',
      rules: [{ min: 50, max: 200 }]
    },
    {
      key: 'Theme',
      label: '渲染图片的主题色',
      orientation: 'horizontal',
      radio: [
        { key: 'Theme:radio-1', label: '自动', value: '0', description: '06:00-18:00为浅色，18:00-06:00为深色' },
        { key: 'Theme:radio-2', label: '浅色', value: '1' },
        { key: 'Theme:radio-3', label: '深色', value: '2' }
      ]
    },
    {
      key: 'RemoveWatermark',
      label: '移除水印',
      description: '渲染的图片是否移除底部水印'
    },
    {
      key: 'RenderWaitTime',
      type: 'number',
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
      label: '分页渲染',
      description: '将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改！'
    },
    {
      key: 'multiPageHeight',
      type: 'number',
      label: '分页渲染时，每页的高度',
      description: '经测试最佳每页高度为12000px，默认12000px',
      disabled: $not('multiPageRender'),
      rules: [{ min: 1000, max: 20000, error: '请输入一个范围在 1000 到 20000 之间的数字' }]
    },
    { description: 'API服务配置', descPosition: 20 },
    {
      key: 'APIServer',
      label: 'API服务',
      description: '本地部署一个视频解析API服务，接口范围为本插件用到的所有'
    },
    {
      key: 'APIServerMount',
      label: '挂载到 Karin',
      description: 'API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」',
      disabled: $not('APIServer')
    },
    {
      key: 'APIServerPort',
      type: 'number',
      label: 'API服务端口',
      disabled: $or($not('APIServer'), $var('APIServerMount')),
      rules: [{ min: 1024, max: 65535, error: '请输入一个范围在 1024 到 65535 之间的数字' }]
    },
    { description: '交互与认证设置', descPosition: 20 },
    {
      key: 'EmojiReply',
      label: '表情回应',
      description: '在解析任务开始时添加表情回应，若适配器不支持需要关闭'
    },
    {
      key: 'parseTip',
      label: '解析提示',
      description: '发送提示信息："检测到xxx链接，开始解析"'
    },
    {
      key: 'errorLogSendTo',
      label: '错误日志',
      description: '遇到错误时谁会收到错误日志。注：推送任务只可发送给主人。「第一个主人」与「所有主人」互斥。',
      orientation: 'horizontal',
      checkbox: [
        { key: 'errorLogSendTo:checkbox:1', label: '第一个主人', value: 'master' },
        { key: 'errorLogSendTo:checkbox:2', label: '所有主人', value: 'allMasters' },
        { key: 'errorLogSendTo:checkbox:3', label: '触发者的群聊', value: 'trigger' }
      ]
    },
    { description: '我的小玩具配置', descPosition: 20 },
    {
      key: 'qrLoginAddrType',
      label: '扫码登录地址类型',
      description: '生成登录二维码时使用的服务器地址',
      orientation: 'horizontal',
      radio: [
        { key: 'qrLoginAddrType:radio-1', label: `局域网（${getLocalIP()}）`, value: 'lan', description: '适用于手机和服务器在同一局域网' },
        { key: 'qrLoginAddrType:radio-2', label: '外部地址', value: 'external', description: '适用于远程访问，需手动配置' }
      ]
    },
    {
      key: 'qrLoginExternalAddr',
      type: 'text',
      label: '外部访问地址',
      description: '公网 IP 或域名，如：123.45.67.89 或 example.com',
      placeholder: '请输入公网 IP 或域名',
      disabled: $ne('qrLoginAddrType', 'external')
    }
  ]
}
