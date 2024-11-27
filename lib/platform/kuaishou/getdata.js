import { Config } from '../../module/index.js';
import amagi from '@ikenxuan/amagi';
export async function fetchKuaishouData(type, opt) {
    const client = new amagi({ kuaishou: Config.cookies.kuaishou });
    switch (type) {
        case 'one_work': {
            const VideoData = await client.getKuaishouData('单个视频作品数据', {
                photoId: opt.photoId
            });
            const CommentsData = await client.getKuaishouData('评论数据', {
                photoId: opt.photoId
            });
            const EmojiData = await client.getKuaishouData('Emoji数据');
            return { VideoData, CommentsData, EmojiData };
        }
        case 'work_comments': {
            const CommentsData = await client.getKuaishouData('评论数据', {
                photoId: opt.photoId
            });
            return CommentsData;
        }
        case 'emoji_list': {
            const EmojiData = await client.getKuaishouData('Emoji数据');
            return EmojiData;
        }
        default: {
            break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0ZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbGF0Zm9ybS9rdWFpc2hvdS9nZXRkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUE7QUFFakMsT0FBTyxLQUFpQyxNQUFNLGlCQUFpQixDQUFBO0FBRS9ELE1BQU0sQ0FBQyxLQUFLLFVBQVUsaUJBQWlCLENBQ3JDLElBQU8sRUFDUCxHQUFTO0lBRVQsTUFBTSxNQUFNLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQy9ELFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDYixLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxTQUFTLEdBQUcsTUFBTSxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRTtnQkFDekQsT0FBTyxFQUFHLEdBQTBDLENBQUMsT0FBTzthQUM3RCxDQUFDLENBQUE7WUFDRixNQUFNLFlBQVksR0FBRyxNQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFO2dCQUN4RCxPQUFPLEVBQUcsR0FBc0MsQ0FBQyxPQUFPO2FBQ3pELENBQUMsQ0FBQTtZQUNGLE1BQU0sU0FBUyxHQUFHLE1BQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsQ0FBQTtRQUMvQyxDQUFDO1FBQ0QsS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sWUFBWSxHQUFHLE1BQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hELE9BQU8sRUFBRyxHQUFzQyxDQUFDLE9BQU87YUFDekQsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxZQUFZLENBQUE7UUFDckIsQ0FBQztRQUNELEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQixNQUFNLFNBQVMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDekQsT0FBTyxTQUFTLENBQUE7UUFDbEIsQ0FBQztRQUNELE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDUixNQUFLO1FBQ1AsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDIn0=