import { logger } from 'node-karin';
import { Networks } from '../../module/utils/index.js';
/**
 *
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export async function getDouyinID(url, log = true) {
    const longLink = await new Networks({ url }).getLongLink();
    let result = {};
    switch (true) {
        case /https:\/\/(?:www\.iesdouyin\.com)\/share\/slides/.test(longLink):
        case longLink === 'https://www.douyin.com/': {
            const newres = await new Networks({ url }).getLocation();
            const match = newres.match(/share\/slides\/(\d+)/);
            result = {
                type: 'user_mix_videos',
                aweme_id: match ? match[1] : undefined,
                is_mp4: true
            };
            break;
        }
        case longLink.includes('webcast.amemv.com'):
        case longLink.includes('live.douyin.com'): {
            if (longLink.includes('webcast.amemv.com')) {
                const sec_uid = /sec_user_id=([^&]+)/.exec(longLink);
                result = {
                    type: 'live_room_detail',
                    sec_uid: sec_uid ? sec_uid[1] : undefined
                };
            }
            else if (longLink.includes('live.douyin.com')) {
                result = {
                    type: 'live_room_detail',
                    room_id: longLink.split('/').pop()
                };
            }
            break;
        }
        case /video\/(\d+)/.test(longLink): {
            const videoMatch = /video\/(\d+)/.exec(longLink);
            result = {
                type: 'one_work',
                aweme_id: videoMatch ? videoMatch[1] : undefined,
                is_mp4: true
            };
            break;
        }
        case /note\/(\d+)/.test(longLink): {
            const noteMatch = /note\/(\d+)/.exec(longLink);
            result = {
                type: 'one_work',
                aweme_id: noteMatch ? noteMatch[1] : undefined,
                is_mp4: false
            };
            break;
        }
        case /https:\/\/(?:www\.douyin\.com|www\.iesdouyin\.com)\/share\/user\/(\S+)/.test(longLink): {
            const userMatch = /user\/([a-zA-Z0-9_-]+)\b/.exec(longLink);
            result = {
                type: 'user_dynamic',
                sec_uid: userMatch ? userMatch[1] : undefined
            };
            break;
        }
        case /music\/(\d+)/.test(longLink): {
            const musicMatch = /music\/(\d+)/.exec(longLink);
            result = {
                type: 'music_work',
                music_id: musicMatch ? musicMatch[1] : undefined
            };
            break;
        }
        default:
            logger.warn('无法获取作品ID');
            break;
    }
    log && console.log(result);
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vZG91eWluL2dldElELnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFFbkMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBU3pDOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUUsR0FBVyxFQUFFLEdBQUcsR0FBRyxJQUFJO0lBQ3hELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzFELElBQUksTUFBTSxHQUFHLEVBQStCLENBQUE7SUFFNUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNiLEtBQUssa0RBQWtELENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZFLEtBQUssUUFBUSxLQUFLLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtZQUN4RCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7WUFDbEQsTUFBTSxHQUFHO2dCQUNQLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDdEMsTUFBTSxFQUFFLElBQUk7YUFDYixDQUFBO1lBQ0QsTUFBSztRQUNQLENBQUM7UUFFRCxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1QyxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlC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