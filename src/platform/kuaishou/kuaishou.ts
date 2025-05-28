import { Message } from 'node-karin'

import { Base, Config, downloadVideo, Networks, Render } from '@/module'
import { kuaishouComments } from '@/platform/kuaishou'
import { ExtendedKuaishouOptionsType, KuaishouDataTypes } from '@/types'

export class Kuaishou extends Base {
  e: Message
  type: KuaishouDataTypes[keyof KuaishouDataTypes]
  is_mp4: any
  constructor (e: Message, iddata: ExtendedKuaishouOptionsType) {
    super(e)
    this.e = e
    this.type = iddata?.type
  }

  async RESOURCES (data: any) {
    Config.app.EmojiReply && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true)
    if (data.VideoData.data.visionVideoDetail.status !== 1) {
      await this.e.reply('不支持解析的视频')
      return true
    }
    Config.kuaishou.tip && await this.e.reply('检测到快手链接，开始解析')
    const video_url = data.VideoData.data.visionVideoDetail.photo.photoUrl
    const transformedData = Object.entries(data.EmojiData.data.visionBaseEmoticons.iconUrls).map(([name, path]) => {
      return { name, url: `https:${path}` }
    })
    const CommentsData = await kuaishouComments(data.CommentsData, transformedData)
    const fileHeaders = await new Networks({ url: video_url, headers: this.headers }).getHeaders()
    const fileSizeContent = fileHeaders['content-range']?.match(/\/(\d+)/) ? parseInt(fileHeaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2)
    const img = await Render('kuaishou/comment', {
      Type: '视频',
      viewCount: data.VideoData.data.visionVideoDetail.photo.viewCount,
      CommentsData,
      CommentLength: String(CommentsData?.length ?? 0),
      share_url: video_url,
      VideoSize: fileSizeInMB,
      likeCount: data.VideoData.data.visionVideoDetail.photo.likeCount
    })
    await this.e.reply(img)
    await downloadVideo(this.e, { video_url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${data.VideoData.data.visionVideoDetail.photo.caption}.mp4` } })
    return true
  }
}
