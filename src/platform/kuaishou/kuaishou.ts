import { Base, Config, Render, Networks } from '@/module'
import { kuaishouComments } from '@/platform/kuaishou'
import { KarinMessage } from 'node-karin'
import { KuaishouDataTypes, ExtendedKuaishouOptionsType } from '@/types'

export class Kuaishou extends Base {
  e: KarinMessage
  type: KuaishouDataTypes[keyof KuaishouDataTypes]
  is_mp4: any
  constructor (e: KarinMessage, iddata: ExtendedKuaishouOptionsType) {
    super(e)
    this.e = e
    this.type = iddata?.type
  }

  async RESOURCES (data: any) {
    if (data.VideoData.data.visionVideoDetail.status !== 1) {
      await this.e.reply('不支持解析的视频')
      return true
    }
    Config.kuaishou.kuaishoutip && await this.e.reply('检测到快手链接，开始解析')
    const video_url = data.VideoData.data.visionVideoDetail.photo.photoUrl
    const transformedData = Object.entries(data.EmojiData.data.visionBaseEmoticons.iconUrls).map(([ name, path ]) => {
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
      CommentLength: String(CommentsData?.length ? CommentsData.length : 0),
      share_url: video_url,
      VideoSize: fileSizeInMB,
      likeCount: data.VideoData.data.visionVideoDetail.photo.likeCount
    })
    await this.e.reply(img)
    await this.DownLoadVideo({ video_url, title: Config.app.rmmp4 ? 'tmp_' + Date.now() : data.VideoData.data.visionVideoDetail.photo.caption })
    return true
  }
}
