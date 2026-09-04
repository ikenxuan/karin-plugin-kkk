import type { AmagiSuccess, KsEmojiList, KsOneWork, KsWorkComments, KuaishouDataOptionsMap } from '@ikenxuan/amagi'

import { kuaishouFetcher } from '@/module/utils/amagiClient'
import { KuaishouDataTypes } from '@/types'

/**
 * `one_work` 分支打包返回的三个信封。
 *
 * 抽成命名类型是给 `KuaishouHandler` 用的：它的入参一直是 `any`，快手换成 H5 REST
 * 之后响应形状整个变了（少了 `data.visionVideoDetail` 两层），靠 `any` 读错字段
 * tsc 一声不响 —— 有了这个类型，处理函数里那几处取值才有编译期兜底。
 */
export type KuaishouOneWorkPayload = {
  /** 作品详情（H5 `photo/info`，字段都在顶层） */
  VideoData: AmagiSuccess<KsOneWork>
  /** 作品评论（H5 `photo/comment/list`，字段名是 snake_case） */
  CommentsData: AmagiSuccess<KsWorkComments>
  /** 表情映射表（仍走 graphql，形状没变） */
  EmojiData: AmagiSuccess<KsEmojiList>
}

/**
 * 按数据类型取快手数据。
 *
 * 返回类型必须显式写出来：不写的话 TS 推出的是 `Ks*_V0` 那批底层名，而
 * amagi 的 ReturnDataType 桶只对外导出 `KsOneWork` 这样的别名，底层名在包外
 * 叫不出来 —— 声明产物于是报 TS2883「inferred type cannot be named」。
 * @param type - 数据类型
 * @param opt - 该类型对应的参数
 * @returns 按 type 分支的成功信封或其 data
 */
export const fetchKuaishouData = async <T extends keyof KuaishouDataTypes>(
  type: T,
  opt?: any
): Promise<KuaishouOneWorkPayload | KsWorkComments | AmagiSuccess<KsEmojiList> | undefined> => {
  switch (type) {
    case 'one_work': {
      const VideoData = await kuaishouFetcher.fetchVideoWork({
        photoId: (opt as KuaishouDataOptionsMap['videoWork']['opt']).photoId
      })
      const CommentsData = await kuaishouFetcher.fetchWorkComments({
        photoId: (opt as KuaishouDataOptionsMap['comments']['opt']).photoId
      })
      const EmojiData = await kuaishouFetcher.fetchEmojiList()
      return { VideoData, CommentsData, EmojiData }
    }
    case 'work_comments': {
      const CommentsData = await kuaishouFetcher.fetchWorkComments({
        photoId: (opt as KuaishouDataOptionsMap['comments']['opt']).photoId
      })
      return CommentsData.data
    }
    case 'emoji_list': {
      const EmojiData = await kuaishouFetcher.fetchEmojiList()
      return EmojiData
    }
    default: {
      break
    }
  }
}
