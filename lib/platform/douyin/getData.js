import { getDouyinData } from '@ikenxuan/amagi';
import { Config } from '../../module/utils/index.js';
export async function fetchDouyinData(type, opt) {
    const dyck = Config.cookies.douyin;
    if (!dyck)
        throw new Error('获取抖音数据需要抖音ck，请使用 [#kkk设置抖音ck] 以设置抖音ck');
    switch (type) {
        case 'one_work': {
            const VideoData = await getDouyinData('图集作品数据', dyck, {
                aweme_id: opt.aweme_id
            });
            const CommentsData = await getDouyinData('评论数据', dyck, {
                aweme_id: opt.aweme_id,
                number: Config.douyin.numcomment
            });
            return { VideoData, CommentsData };
        }
        case 'work_comments': {
            const CommentsData = await getDouyinData('评论数据', dyck, {
                aweme_id: opt.aweme_id,
                number: Config.douyin.numcomment
            });
            return CommentsData;
        }
        case 'user_mix_videos': {
            const LiveImageData = await getDouyinData('实况图片图集数据', dyck, {
                aweme_id: opt.aweme_id
            });
            return LiveImageData;
        }
        case 'live_room_detail':
        case 'user_profile': {
            const UserInfoData = await getDouyinData('用户主页数据', dyck, {
                sec_uid: opt.sec_uid
            });
            return UserInfoData;
        }
        case 'emoji_list': {
            const EmojiData = await getDouyinData('Emoji数据');
            return EmojiData;
        }
        case 'user_dynamic': {
            const UserVideoListData = await getDouyinData('用户主页视频列表数据', dyck, {
                sec_uid: opt.sec_uid
            });
            return UserVideoListData;
        }
        case 'suggest_words': {
            const SuggestWordsData = await getDouyinData('热点词数据', dyck, {
                query: opt.query
            });
            return SuggestWordsData;
        }
        case 'search_info': {
            const SearchData = await getDouyinData('搜索数据', dyck, {
                query: opt.query
            });
            return SearchData;
        }
        case 'music_work': {
            const MusicData = await getDouyinData('音乐数据', dyck, {
                music_id: opt.music_id
            });
            return MusicData;
        }
        default:
            break;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS9kb3V5aW4vZ2V0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQXdCLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFBO0FBRXJFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUd2QyxNQUFNLENBQUMsS0FBSyxVQUFVLGVBQWUsQ0FDbkMsSUFBTyxFQUNQLEdBQVM7SUFFVCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQTtJQUNsQyxJQUFJLENBQUUsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQTtJQUVwRSxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7Z0JBQ3BELFFBQVEsRUFBRyxHQUFzQyxDQUFDLFFBQVE7YUFDM0QsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDckQsUUFBUSxFQUFHLEdBQW9DLENBQUMsUUFBUTtnQkFDeEQsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVTthQUNqQyxDQUFDLENBQUE7WUFDRixPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxDQUFBO1FBQ3BDLENBQUM7UUFFRCxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDckQsUUFBUSxFQUFHLEdBQW9DLENBQUMsUUFBUTtnQkFDeEQsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVTthQUNqQyxDQUFDLENBQUE7WUFDRixPQUFPLFlBQVksQ0FBQTtRQUNyQixDQUFDO1FBRUQsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxhQUFhLEdBQUcsTUFBTSxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRTtnQkFDMUQsUUFBUSxFQUFHLEdBQXdDLENBQUMsUUFBUTthQUM3RCxDQUFDLENBQUE7WUFDRixPQUFPLGFBQWEsQ0FBQTtRQUN0QixDQUFDO1FBQ0QsS0FBSyxrQkFBa0IsQ0FBQztRQUN4QixLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxZQUFZLEdBQUcsTUFBTSxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRTtnQkFDdkQsT0FBTyxFQUFHLEdBQWlELENBQUMsT0FBTzthQUNwRSxDQUFDLENBQUE7WUFDRixPQUFPLFlBQVksQ0FBQTtRQUNyQixDQUFDO1FBQ0QsS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2hELE9BQU8sU0FBUyxDQUFBO1FBQ2xCLENBQUM7UUFDRCxLQUFLLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLGFBQWEsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFO2dCQUNoRSxPQUFPLEVBQUcsR0FBcUQsQ0FBQyxPQUFPO2FBQ3hFLENBQUMsQ0FBQTtZQUNGLE9BQU8saUJBQWlCLENBQUE7UUFDMUIsQ0FBQztRQUNELEtBQUssZUFBZSxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7Z0JBQzFELEtBQUssRUFBRyxHQUFnRCxDQUFDLEtBQUs7YUFDL0QsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxnQkFBZ0IsQ0FBQTtRQUN6QixDQUFDO1FBQ0QsS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sVUFBVSxHQUFHLE1BQU0sYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBQ25ELEtBQUssRUFBRyxHQUFnRCxDQUFDLEtBQUs7YUFDL0QsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxVQUFVLENBQUE7UUFDbkIsQ0FBQztRQUNELEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLFNBQVMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNsRCxRQUFRLEVBQUcsR0FBK0MsQ0FBQyxRQUFRO2FBQ3BFLENBQUMsQ0FBQTtZQUNGLE9BQU8sU0FBUyxDQUFBO1FBQ2xCLENBQUM7UUFDRDtZQUNFLE1BQUs7SUFDVCxDQUFDO0FBRUgsQ0FBQyJ9