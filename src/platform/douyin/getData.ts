import { DouyinDataOptionsMap, getDouyinData } from '@ikenxuan/amagi'

import { Config } from '@/module/utils'
import { DouyinDataTypes } from '@/types'

export async function fetchDouyinData<T extends keyof DouyinDataTypes> (
  type: T,
  opt?: any
): Promise<any> {
  const dyck = Config.cookies.douyin
  if (!dyck) throw new Error('获取抖音数据需要抖音ck，请使用 [#kkk设置抖音ck] 以设置抖音ck')

  switch (type) {
    case 'one_work': {
      const VideoData = await getDouyinData('图集作品数据', dyck, {
        aweme_id: (opt as DouyinDataOptionsMap['图集作品数据']).aweme_id
      })
      const CommentsData = await getDouyinData('评论数据', dyck, {
        aweme_id: (opt as DouyinDataOptionsMap['评论数据']).aweme_id,
        number: Config.douyin.numcomment
      })
      return { VideoData, CommentsData }
    }

    case 'work_comments': {
      const CommentsData = await getDouyinData('评论数据', dyck, {
        aweme_id: (opt as DouyinDataOptionsMap['评论数据']).aweme_id,
        number: Config.douyin.numcomment
      })
      return CommentsData
    }

    case 'user_mix_videos': {
      const LiveImageData = await getDouyinData('实况图片图集数据', dyck, {
        aweme_id: (opt as DouyinDataOptionsMap['实况图片图集数据']).aweme_id
      })
      return LiveImageData
    }
    case 'live_room_detail':
    case 'user_profile': {
      const UserInfoData = await getDouyinData('用户主页数据', dyck, {
        sec_uid: (opt as unknown as DouyinDataOptionsMap['用户主页数据']).sec_uid
      })
      return UserInfoData
    }
    case 'emoji_list': {
      const EmojiData = await getDouyinData('Emoji数据')
      return EmojiData
    }
    case 'user_dynamic': {
      const UserVideoListData = await getDouyinData('用户主页视频列表数据', dyck, {
        sec_uid: (opt as unknown as DouyinDataOptionsMap['用户主页视频列表数据']).sec_uid
      })
      return UserVideoListData
    }
    case 'suggest_words': {
      const SuggestWordsData = await getDouyinData('热点词数据', dyck, {
        query: (opt as unknown as DouyinDataOptionsMap['热点词数据']).query
      })
      return SuggestWordsData
    }
    case 'search_info': {
      const SearchData = await getDouyinData('搜索数据', dyck, {
        query: (opt as unknown as DouyinDataOptionsMap['热点词数据']).query
      })
      return SearchData
    }
    case 'music_work': {
      const MusicData = await getDouyinData('音乐数据', dyck, {
        music_id: (opt as unknown as DouyinDataOptionsMap['音乐数据']).music_id
      })
      return MusicData
    }
    default:
      break
  }
}
