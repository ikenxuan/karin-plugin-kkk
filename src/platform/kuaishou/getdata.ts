import Amagi, { KuaishouDataOptionsMap } from '@ikenxuan/amagi'

import { Config } from '@/module'
import { KuaishouDataTypes } from '@/types'

export async function fetchKuaishouData<T extends keyof KuaishouDataTypes> (
  type: T,
  opt?: any
) {
  const client = new Amagi({ kuaishou: Config.cookies.kuaishou })
  switch (type) {
    case 'one_work': {
      const VideoData = await client.getKuaishouData('单个视频作品数据', {
        photoId: (opt as KuaishouDataOptionsMap['单个视频作品数据']['opt']).photoId
      })
      const CommentsData = await client.getKuaishouData('评论数据', {
        photoId: (opt as KuaishouDataOptionsMap['评论数据']['opt']).photoId
      })
      const EmojiData = await client.getKuaishouData('Emoji数据')
      return { VideoData, CommentsData, EmojiData }
    }
    case 'work_comments': {
      const CommentsData = await client.getKuaishouData('评论数据', {
        photoId: (opt as KuaishouDataOptionsMap['评论数据']['opt']).photoId
      })
      return CommentsData
    }
    case 'emoji_list': {
      const EmojiData = await client.getKuaishouData('Emoji数据')
      return EmojiData
    }
    default: {
      break
    }
  }
}
