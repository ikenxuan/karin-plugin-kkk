import { common, ImageElement, type Message, segment } from 'node-karin'

import { Base } from '@/module'
import { Config } from '@/module/utils/Config'

import { XiaohongshuIdData } from './getID'


export class Xiaohongshu extends Base {
  e: Message
  type: XiaohongshuIdData['type']

  constructor (e: Message, iddata: XiaohongshuIdData) {
    super(e)
    this.e = e
    this.type = iddata?.type
  }

  async RESOURCES (data: XiaohongshuIdData) {
    Config.xiaohongshu?.tip && await this.e.reply('检测到小红书链接，开始解析')
    const NoteData = await this.amagi.getXiaohongshuData('单个笔记数据', {
      typeMode: 'strict',
      note_id: data.note_id,
      xsec_token: data.xsec_token
    })
    const Imgs: ImageElement[] = []
    const imgUrl = NoteData.data.data.items[0].note_card!.image_list[0].url_default

    for (const item of NoteData.data.data.items[0].note_card!.image_list) {
      Imgs.push(segment.image(item.url_default))
    }
    const res = common.makeForward(Imgs, this.e.sender.userId, this.e.sender.nick)
    if (imgUrl.length === 1) {
      await this.e.reply(segment.image(imgUrl))
    } else {
      await this.e.bot.sendForwardMsg(this.e.contact, res, {
        source: '图片合集',
        summary: `查看${res.length}张图片消息`,
        prompt: '小红书图集解析结果',
        news: [{ text: '点击查看解析结果' }]
      })
    }

    return true
  }
}