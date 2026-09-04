import type { KsOneWork } from '@ikenxuan/amagi'
import { type Message } from 'node-karin'

import { Base, downloadVideo, extractTotalBytesFromHeaders, Networks, Render } from '@/module'
import { Config } from '@/module/utils/Config'
import { kuaishouComments, type KuaishouOneWorkPayload } from '@/platform/kuaishou'
import type { ExtendedKuaishouOptionsType, KuaishouDataTypes } from '@/types'

/**
 * 从作品详情里挑一条视频直链。
 *
 * PC GraphQL 那条有现成的 `photo.photoUrl`，H5 `photo/info` **没有这个字段**，
 * 只能按 amagi 类型里写明的分发规则自己挑：优先 `manifest.adaptationSet` 的档位
 * （`defaultSelect` 是平台自己标的默认清晰度），没有 `manifest` 再回落到单档的
 * `mainMvUrls`。
 *
 * 图集 / 单图作品这两处都是空的（原图在 `atlas` / `single`，本插件目前只解析视频），
 * 所以取不到时返回空串，交给调用方走原有的「不支持解析」分支，而不是拿空串去发请求。
 * @param work - `fetchVideoWork` 的响应体
 * @returns 视频直链；取不到时为空串
 */
const pickVideoUrl = (work: KsOneWork): string => {
  const representations = work.photo?.manifest?.adaptationSet?.flatMap((set) => set.representation ?? []) ?? []
  const preferred = representations.find((item) => item.defaultSelect) ?? representations[0]
  return preferred?.url ?? work.photo?.mainMvUrls?.[0]?.url ?? ''
}

export class Kuaishou extends Base {
  e: Message
  type: KuaishouDataTypes[keyof KuaishouDataTypes]
  is_mp4: any
  constructor(e: Message, iddata: ExtendedKuaishouOptionsType) {
    super(e)
    this.e = e
    this.type = iddata?.type
  }

  async KuaishouHandler(data: any) {
    // 入参保持 any（调用方给的是 fetchKuaishouData 的联合类型），这里先收窄到
    // one_work 那一支：H5 换形状后所有取值都得靠 tsc 检查，不能再裸读 any
    const payload = data as KuaishouOneWorkPayload
    const work = payload.VideoData.data

    // H5 这条响应没有 `data.visionVideoDetail.status`（那是 PC GraphQL 的字段），
    // 顶层 `result` 才是接口状态位（1 = 成功）；再加一道「拿不到视频直链」，
    // 图集 / 单图落到这里也能给出原来那句提示而不是报错
    const video_url = pickVideoUrl(work)
    if (work.result !== 1 || !video_url) {
      await this.e.reply('不支持解析的视频')
      return true
    }
    if (Config.app.parseTip) {
      this.e.reply('检测到快手链接，开始解析')
    }
    // 表情接口没换，还是 graphql 那条，`data.visionBaseEmoticons` 两层照旧
    const transformedData = Object.entries(payload.EmojiData.data.data.visionBaseEmoticons.iconUrls).map(([name, path]) => {
      return { name, url: `https:${path}` }
    })
    const CommentsData = await kuaishouComments(payload.CommentsData.data, transformedData)
    const fileHeaders = await new Networks({ url: video_url, headers: this.headers }).getHeaders()
    const fileSizeContent = extractTotalBytesFromHeaders(fileHeaders)
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2)
    const img = await Render(this.e, 'kuaishou/comment', {
      Type: '视频',
      // 这两个计数在 GraphQL 那条是字符串，H5 直接给数字，正好对上模板声明的 number
      viewCount: work.photo.viewCount,
      CommentsData,
      CommentLength: CommentsData?.length ?? 0,
      share_url: video_url,
      VideoSize: fileSizeInMB,
      likeCount: work.photo.likeCount
    })
    await this.e.reply(img)
    await downloadVideo(this.e, {
      video_url,
      title: {
        timestampTitle: `tmp_${Date.now()}.mp4`,
        originTitle: `${work.photo.caption}.mp4`
      }
    })
    return true
  }
}
