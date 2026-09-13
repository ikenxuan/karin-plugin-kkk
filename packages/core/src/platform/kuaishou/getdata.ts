import type {
  KuaishouCommentsResponse,
  KuaishouDataOptionsMap,
  KuaishouEmojiListResponse,
  KuaishouVideoWorkResponse
} from '@ikenxuan/amagi'

import { kuaishouFetcher } from '@/module/utils/amagiClient'
import { KuaishouDataTypes } from '@/types'

/**
 * `one_work` 分支打包返回的三个响应体。
 *
 * 抽成命名类型是给 `KuaishouHandler` 用的：它的入参一直是 `any`，快手换成 H5 REST
 * 之后响应形状整个变了（少了 `data.visionVideoDetail` 两层），靠 `any` 读错字段
 * tsc 一声不响 —— 有了这个类型，处理函数里那几处取值才有编译期兜底。
 * 存的是响应体本身（fetcher 失败即抛，信封没人读）。
 */
export type KuaishouOneWorkPayload = {
  /** 作品详情（H5 `photo/info`，字段都在顶层） */
  VideoData: KuaishouVideoWorkResponse
  /** 作品评论（H5 `photo/comment/list`，字段名是 snake_case） */
  CommentsData: KuaishouCommentsResponse
  /** 表情映射表（仍走 graphql，形状没变） */
  EmojiData: KuaishouEmojiListResponse
}

/**
 * 按数据类型取快手数据。
 *
 * 返回类型必须显式写出来：不写的话 TS 推出的是生成树的底层名（`Comments_V0` 这类），
 * 而那些名字不出现在包外 —— 声明产物于是报 TS2883「inferred type cannot be named」。
 * @param type - 数据类型
 * @param opt - 该类型对应的参数
 * @returns 按 type 分支的响应体
 */
export const fetchKuaishouData = async <T extends keyof KuaishouDataTypes>(
  type: T,
  opt?: any
): Promise<KuaishouOneWorkPayload | KuaishouCommentsResponse | KuaishouEmojiListResponse | undefined> => {
  switch (type) {
    case 'one_work': {
      const VideoData = await kuaishouFetcher.fetchVideoWork({
        photoId: (opt as KuaishouDataOptionsMap['videoWork']['opt']).photoId
      })
      const CommentsData = await kuaishouFetcher.fetchWorkComments({
        photoId: (opt as KuaishouDataOptionsMap['comments']['opt']).photoId
      })
      const EmojiData = await kuaishouFetcher.fetchEmojiList()
      return { VideoData: VideoData.data, CommentsData: CommentsData.data, EmojiData: EmojiData.data }
    }
    case 'work_comments': {
      const CommentsData = await kuaishouFetcher.fetchWorkComments({
        photoId: (opt as KuaishouDataOptionsMap['comments']['opt']).photoId
      })
      return CommentsData.data
    }
    case 'emoji_list': {
      const EmojiData = await kuaishouFetcher.fetchEmojiList()
      return EmojiData.data
    }
    default: {
      break
    }
  }
}
