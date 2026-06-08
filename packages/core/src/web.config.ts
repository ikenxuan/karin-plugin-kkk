import { defineConfig } from 'node-karin'

import { Root } from '@/module'

export const webConfig = defineConfig({
  info: {
    id: 'karin-plugin-kkk',
    name: 'kkk插件',
    description: `Karin 的「抖音」「B站」视频解析/动态推送插件。v${Root.pluginVersion}`,
    icon: {
      name: 'radio_button_checked',
      color: '#F31260'
    },
    version: Root.pluginVersion,
    author: [
      {
        name: 'ikenxuan',
        home: 'https://github.com/ikenxuan',
        avatar: 'https://github.com/ikenxuan.png'
      },
      {
        name: 'sj817',
        home: 'https://github.com/sj817',
        avatar: 'https://github.com/sj817.png'
      }
    ]
  },
  page: {
    url: 'http://localhost:5176/kkk/karin-config',
    title: 'kkk插件配置管理',
    description: '使用 kkk 插件自带的配置管理页面'
  }
})

export default webConfig
