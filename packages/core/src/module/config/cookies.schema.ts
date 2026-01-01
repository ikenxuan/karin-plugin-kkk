/**
 * Cookies 配置 Schema
 */
import type { SectionSchema } from './schema'

export const cookiesConfigSchema: SectionSchema = {
  key: 'cookies',
  title: 'Cookies 相关',
  subtitle: '建议配置，否则大部分功能无法使用，此部分修改后需重启方可生效！',
  fields: [
    {
      key: 'douyin',
      type: 'input',
      inputType: 'text',
      label: '抖音',
      description: '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢'
    },
    {
      key: 'bilibili',
      type: 'input',
      inputType: 'text',
      label: 'B站',
      description: '请输入你的B站Cookies，不输入则无法使用B站相关功能噢'
    },
    {
      key: 'kuaishou',
      type: 'input',
      inputType: 'text',
      label: '快手',
      description: '请输入你的快手Cookies，不输入则无法使用快手相关功能噢'
    },
    {
      key: 'xiaohongshu',
      type: 'input',
      inputType: 'text',
      label: '小红书',
      description: '请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢'
    }
  ]
}

