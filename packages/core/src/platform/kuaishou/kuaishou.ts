import { type Message } from 'node-karin'

import { Base, downloadVideo, Networks, Render } from '@/module'
import { Config } from '@/module/utils/Config'
import { kuaishouComments } from '@/platform/kuaishou'
import type { ExtendedKuaishouOptionsType, KuaishouDataTypes } from '@/types'

export class Kuaishou extends Base {
  e: Message
  type: KuaishouDataTypes[keyof KuaishouDataTypes]
  is_mp4: any
  constructor (e: Message, iddata: ExtendedKuaishouOptionsType) {
    super(e)
    this.e = e
    this.type = iddata?.type
  }

  async KuaishouHandler (data: any) {
    if (data.VideoData.data.data.visionVideoDetail.status !== 1) {
      await this.e.reply('不支持解析的视频')
      return true
    }
    Config.kuaishou.tip && await this.e.reply('检测到快手链接，开始解析')
    const video_url = data.VideoData.data.data.visionVideoDetail.photo.photoUrl
    const transformedData = Object.entries(data.EmojiData.data.data.visionBaseEmoticons.iconUrls).map(([name, path]) => {
      return { name, url: `https:${path}` }
    })
    const CommentsData = await kuaishouComments(data.CommentsData.data, transformedData)
    const fileHeaders = await new Networks({ url: video_url, headers: this.headers }).getHeaders()
    const fileSizeContent = fileHeaders['content-range']?.match(/\/(\d+)/) ? parseInt(fileHeaders['content-range']?.match(/\/(\d+)/)[1], 10) : 0
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2)
    const img = await Render('kuaishou/comment', {
      Type: '视频',
      viewCount: data.VideoData.data.data.visionVideoDetail.photo.viewCount,
      CommentsData,
      CommentLength: CommentsData?.length ?? 0,
      share_url: video_url,
      VideoSize: fileSizeInMB,
      likeCount: data.VideoData.data.data.visionVideoDetail.photo.likeCount
    })
    await this.e.reply(img)
    await downloadVideo(this.e, { video_url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${data.VideoData.data.data.visionVideoDetail.photo.caption}.mp4` } })
    return true
  }
}
