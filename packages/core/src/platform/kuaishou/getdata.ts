import { type KuaishouDataOptionsMap } from '@ikenxuan/amagi'

import { kuaishouFetcher } from '@/module/utils/amagiClient'
import { KuaishouDataTypes } from '@/types'

export const fetchKuaishouData = async <T extends keyof KuaishouDataTypes> (
  type: T,
  opt?: any
) => {
  switch (type) {
    case 'one_work': {
      const VideoData = await kuaishouFetcher.fetchVideoWork({
        photoId: (opt as KuaishouDataOptionsMap['videoWork']['opt']).photoId,
        typeMode: 'strict'
      })
      const CommentsData = await kuaishouFetcher.fetchWorkComments({
        photoId: (opt as KuaishouDataOptionsMap['comments']['opt']).photoId,
        typeMode: 'strict'
      })
      const EmojiData = await kuaishouFetcher.fetchEmojiList({ typeMode: 'strict' })
      return { VideoData, CommentsData, EmojiData }
    }
    case 'work_comments': {
      const CommentsData = await kuaishouFetcher.fetchWorkComments({
        photoId: (opt as KuaishouDataOptionsMap['comments']['opt']).photoId,
        typeMode: 'strict'
      })
      return CommentsData.data
    }
    case 'emoji_list': {
      const EmojiData = await kuaishouFetcher.fetchEmojiList({ typeMode: 'strict' })
      return EmojiData
    }
    default: {
      break
    }
  }
}
