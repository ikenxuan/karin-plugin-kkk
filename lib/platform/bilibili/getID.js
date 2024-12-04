import { logger } from 'node-karin';
import { Networks } from '../../module/utils/index.js';
/**
 * return aweme_id
 * @param {string} url 分享连接
 * @returns
 */
export async function getBilibiliID(url) {
    const longLink = await new Networks({ url }).getLongLink();
    let result = {};
    switch (true) {
        case /(video\/|video\-)([A-Za-z0-9]+)/.test(longLink): {
            const bvideoMatch = /video\/([A-Za-z0-9]+)|bvid=([A-Za-z0-9]+)/.exec(longLink);
            result = {
                type: 'one_video',
                id: bvideoMatch ? bvideoMatch[1] || bvideoMatch[2] : undefined
            };
            break;
        }
        case /play\/(\S+?)\??/.test(longLink): {
            const playMatch = /play\/(\w+)/.exec(longLink);
            const id = playMatch ? playMatch[1] : '';
            let realid = '';
            if (id.startsWith('ss')) {
                realid = 'season_id';
            }
            else if (id.startsWith('ep')) {
                realid = 'ep_id';
            }
            result = {
                type: 'bangumi_video_info',
                [realid]: playMatch ? playMatch[1] : ''
            };
            break;
        }
        case /^https:\/\/t\.bilibili\.com\/(\d+)/.test(longLink) || /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.test(longLink): {
            const tMatch = /^https:\/\/t\.bilibili\.com\/(\d+)/.exec(longLink);
            const opusMatch = /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.exec(longLink);
            const dynamic_id = tMatch ?? opusMatch;
            result = {
                type: 'dynamic_info',
                dynamic_id: dynamic_id ? dynamic_id[1] : dynamic_id
            };
            break;
        }
        case longLink.includes('live.bilibili.com'): {
            const match = /https?:\/\/live\.bilibili\.com\/(\d+)/.exec(longLink);
            result = {
                type: 'live_room_detail',
                room_id: match ? match[1] : undefined
            };
            break;
        }
        default:
            logger.warn('无法获取作品ID');
            break;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vYmlsaWJpbGkvZ2V0SUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUVuQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFRekM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUFFLEdBQVc7SUFDOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDMUQsSUFBSSxNQUFNLEdBQUcsRUFBaUIsQ0FBQTtJQUU5QixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sV0FBVyxHQUFHLDJDQUEyQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM5RSxNQUFNLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDL0QsQ0FBQTtZQUNELE1BQUs7UUFDUCxDQUFDO1FBQ0QsS0FBSyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDOUMsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtZQUN4QyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDZixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxHQUFHLFdBQVcsQ0FBQTtZQUN0QixDQUFDO2lCQUFNLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUMvQixNQUFNLEdBQUcsT0FBTyxDQUFBO1lBQ2xCLENBQUM7WUFDRCxNQUFNLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLG9CQUFvQjtnQkFDMUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUN4QyxDQUFBO1lBQ0QsTUFBSztRQUNQLENBQUM7UUFDRCxLQUFLLG9DQUFvQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSw0Q0FBNEMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hILE1BQU0sTUFBTSxHQUFHLG9DQUFvQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNsRSxNQUFNLFNBQVMsR0FBRyw0Q0FBNEMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDN0UsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLFNBQVMsQ0FBQTtZQUN0QyxNQUFNLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVTthQUNwRCxDQUFBO1lBQ0QsTUFBSztRQUNQLENBQUM7UUFDRCxLQUFLLFFBQVEsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsdUNBQXVDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3BFLE1BQU0sR0FBRztnQkFDUCxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDdEMsQ0FBQTtZQUNELE1BQUs7UUFDUCxDQUFDO1FBQ0Q7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3ZCLE1BQUs7SUFDVCxDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDIn0=