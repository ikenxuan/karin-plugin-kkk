import fs from 'fs'
import {
  AlignLeft,
  Bookmark,
  Clock,
  Coins,
  Flame,
  Gamepad2,
  MessageCircle,
  Mic,
  Play,
  Share,
  Star,
  Tag,
  ThumbsUp,
  TrendingUp,
  Trophy,
  User
} from 'lucide-vue-next'
import karin, { ImageElement, Options, render, segment } from 'node-karin'
import path, { join } from 'path'

import { Common, Config, Version } from '@/module'

import { compileVueToHTML } from './vueCompiler'
export const renderData = {
  authorInfo: {
    name: '诗羽',
    role: '内容创作者'
  },
  contentInfo: {
    title: '白虎vs眼镜 你们知道吗',
    category: '游戏解说',
    status: '热门',
    imageCaption: '精彩战斗场面'
  },
  mainStats: [
    {
      key: 'views',
      icon: Play,
      value: '39.9万',
      label: '播放量',
      bgClass: 'bg-blue-50',
      iconClass: 'text-blue-500'
    },
    {
      key: 'likes',
      icon: ThumbsUp,
      value: '7810',
      label: '点赞',
      bgClass: 'bg-green-50',
      iconClass: 'text-green-500'
    },
    {
      key: 'comments',
      icon: MessageCircle,
      value: '350',
      label: '弹幕',
      bgClass: 'bg-purple-50',
      iconClass: 'text-purple-500'
    },
    {
      key: 'coins',
      icon: Coins,
      value: '109',
      label: '投币',
      bgClass: 'bg-yellow-50',
      iconClass: 'text-yellow-500'
    }
  ],
  secondaryStats: [
    {
      key: 'shares',
      icon: Share,
      value: '7417',
      label: '转发',
      bgClass: 'bg-red-50',
      iconClass: 'text-red-500'
    },
    {
      key: 'favorites',
      icon: Star,
      value: '1093',
      label: '收藏',
      bgClass: 'bg-indigo-50',
      iconClass: 'text-indigo-500'
    }
  ],
  description: {
    main: '这里是内容简介区域，可以容纳大量的文字内容。设计采用了毛玻璃效果和柔和的阴影，确保即使在长文本的情况下也能保持良好的可读性和视觉层次。',
    detail: '这个区域具有足够的垂直空间来容纳详细的内容描述、背景信息、制作花絮等各种类型的文字内容。布局设计考虑了内容的可扩展性，无论文字多少都能保持整体的美观和平衡。'
  },
  tags: [
    {
      name: '游戏',
      icon: Gamepad2,
      class: 'bg-blue-500/20 text-blue-200'
    },
    {
      name: '解说',
      icon: Mic,
      class: 'bg-purple-500/20 text-purple-200'
    },
    {
      name: '竞技',
      icon: Trophy,
      class: 'bg-green-500/20 text-green-200'
    }
  ]
}
export const help = karin.command(/^test$/, async (e) => {
  const templatePath = path.join(Version.pluginPath, 'resources/template')

  const html = compileVueToHTML(renderData)
  fs.writeFileSync(join(templatePath, 'vueTest.html'), html)

  const renderOpt: Options = {
    pageGotoParams: {
      waitUntil: 'load',
      timeout: Config.app.RenderWaitTime * 1000
    },
    name: `${Version.pluginName}/vueTest/index/`.replace(/\\/g, '/'),
    file: `${Version.pluginPath}/resources/template/vueTest.html`,
    type: 'jpeg'
  }

  const img = await render.render({
    ...renderOpt,
    multiPage: 12000,
    encoding: 'base64',
    data: renderData,
    screensEval: '#container'
  })
  // 分片截图传回来的是数组
  const ret: ImageElement[] = []
  for (const imgae of img) {
    ret.push(segment.image('base64://' + imgae))
  }
  await e.reply(ret)
  return true
}, { name: 'vue渲染模板' })
