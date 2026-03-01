/**
 * Cookies 配置 Schema
 */
import type { SectionSchema } from './schema'

export const cookiesConfigSchema: SectionSchema = {
  key: 'cookies',
  title: 'Cookies 相关',
  subtitle: '建议配置，否则大部分功能无法使用，配置教程请查看：https://karin-plugin-kkk-docs.vercel.app/zh-CN/docs/advanced/ck',
  fields: [
    {
      key: 'douyin',
      type: 'text',
      label: '抖音',
      description: '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢',
      placeholder: ''
    },
    {
      key: 'bilibili',
      type: 'text',
      label: 'B站',
      description: '请输入你的B站Cookies，不输入部分功能将受限噢',
      placeholder: ''
    },
    {
      key: 'kuaishou',
      type: 'text',
      label: '快手',
      description: '请输入你的快手Cookies，不输入则无法使用快手相关功能噢',
      placeholder: ''
    },
    {
      key: 'xiaohongshu',
      type: 'text',
      label: '小红书',
      description: '请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢',
      placeholder: ''
    }
  ]
}
