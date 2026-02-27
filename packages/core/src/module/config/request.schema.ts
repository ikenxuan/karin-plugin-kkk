/**
 * 请求配置 Schema
 */
import type { SectionSchema } from './schema'
import { $not } from './schema'

export const requestConfigSchema: SectionSchema = {
  key: 'request',
  title: '解析库请求配置相关',
  subtitle: '此处用于管理解析库的网络请求配置',
  fields: [
    {
      key: 'timeout',
      type: 'number',
      label: '请求超时时间',
      description: '网络请求的超时时间，单位：毫秒',
      rules: [{ min: 1000, max: 300000, error: '请输入一个范围在 1000 到 300000 之间的数字' }]
    },
    {
      key: 'User-Agent',
      type: 'text',
      label: 'User-Agent',
      description: '请求头中的User-Agent字段，用于标识客户端类型',
      placeholder: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    { description: '代理配置（可选）', descPosition: 20 },
    {
      key: 'proxy.switch',
      label: '代理开关',
      description: '开启后需要配置「代理主机」「代理端口」'
    },
    {
      key: 'proxy.host',
      type: 'text',
      label: '代理主机',
      description: '代理服务器的主机地址，如：127.0.0.1',
      placeholder: '127.0.0.1',
      disabled: $not('proxy.switch')
    },
    {
      key: 'proxy.port',
      type: 'number',
      label: '代理端口',
      description: '代理服务器的端口号',
      disabled: $not('proxy.switch'),
      rules: [{ min: 1, max: 65535, error: '请输入一个范围在 1 到 65535 之间的数字' }]
    },
    {
      key: 'proxy.protocol',
      label: '代理协议',
      orientation: 'horizontal',
      disabled: $not('proxy.switch'),
      radio: [
        { key: 'proxy.protocol:radio-1', label: 'HTTP', value: 'http' },
        { key: 'proxy.protocol:radio-2', label: 'HTTPS', value: 'https' }
      ]
    },
    {
      key: 'proxy.auth.username',
      type: 'text',
      label: '代理用户名',
      description: '代理服务器的认证用户名（如果需要）',
      disabled: $not('proxy.switch')
    },
    {
      key: 'proxy.auth.password',
      type: 'password',
      label: '代理密码',
      description: '代理服务器的认证密码（如果需要）',
      disabled: $not('proxy.switch')
    }
  ]
}
