import Client, { type KuaishouDataOptionsMap } from '@ikenxuan/amagi'

import { Config } from '@/module/utils/Config'
import { KuaishouDataTypes } from '@/types'

export const fetchKuaishouData = async <T extends keyof KuaishouDataTypes> (
  type: T,
  opt?: any
) => {
  const client = Client({
    cookies: { kuaishou: Config.cookies.kuaishou },
    request: {
      timeout: Config.request.timeout,
      headers: { 'User-Agent': Config.request['User-Agent'] },
      proxy: Config.request.proxy
    }
  })
  switch (type) {
    case 'one_work': {
      const VideoData = await client.getKuaishouData('单个视频作品数据', {
        photoId: (opt as KuaishouDataOptionsMap['单个视频作品数据']['opt']).photoId,
        typeMode: 'strict'
      })
      const CommentsData = await client.getKuaishouData('评论数据', {
        photoId: (opt as KuaishouDataOptionsMap['评论数据']['opt']).photoId,
        typeMode: 'strict'
      })
      const EmojiData = await client.getKuaishouData('Emoji数据', {
        typeMode: 'strict'
      })
      return { VideoData, CommentsData, EmojiData }
    }
    case 'work_comments': {
      const CommentsData = await client.getKuaishouData('评论数据', {
        photoId: (opt as KuaishouDataOptionsMap['评论数据']['opt']).photoId,
        typeMode: 'strict'
      })
      return CommentsData.data
    }
    case 'emoji_list': {
      const EmojiData = await client.getKuaishouData('Emoji数据', {
        typeMode: 'strict'
      })
      return EmojiData
    }
    default: {
      break
    }
  }
}
