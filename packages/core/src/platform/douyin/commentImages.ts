import { common, type Elements, type Message } from 'node-karin'

import { Config } from '@/module/utils/Config'

/** 控制台不支持合并转发，逐张发送收集到的评论图片。 */
export const sendDouyinCommentImages = async (event: Message, images: Elements[]): Promise<void> => {
  if (event.bot.adapter.name === '@karinjs/console') {
    for (const image of images) await event.reply(image)
    return
  }

  const forward = common.makeForward(
    images,
    Config.app.fakeForward ? event.sender.userId : event.bot.account.selfId,
    Config.app.fakeForward ? event.sender.nick : event.bot.account.name
  )
  await event.bot.sendForwardMsg(event.contact, forward, {
    source: '评论图片收集',
    summary: `查看${images.length}张图片`,
    prompt: '抖音评论解析结果',
    news: [{ text: '点击查看解析结果' }]
  })
}
