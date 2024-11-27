import { Networks } from '../../module/utils/index.js';
import { logger } from 'node-karin';
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
            const bvideoMatch = longLink.match(/video\/([A-Za-z0-9]+)|bvid=([A-Za-z0-9]+)/);
            result = {
                type: 'one_video',
                id: bvideoMatch ? bvideoMatch[1] || bvideoMatch[2] : undefined
            };
            break;
        }
        case /play\/(\S+?)\??/.test(longLink): {
            const playMatch = longLink.match(/play\/(\w+)/);
            let id = playMatch ? playMatch[1] : '', realid = '';
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
            const tMatch = longLink.match(/^https:\/\/t\.bilibili\.com\/(\d+)/);
            const opusMatch = longLink.match(/^https:\/\/www\.bilibili\.com\/opus\/(\d+)/);
            const dynamic_id = tMatch || opusMatch;
            result = {
                type: 'dynamic_info',
                dynamic_id: dynamic_id ? dynamic_id[1] : dynamic_id
            };
            break;
        }
        case /live\.bilibili\.com/.test(longLink): {
            const match = longLink.match(/https?:\/\/live\.bilibili\.com\/(\d+)/);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0vYmlsaWJpbGkvZ2V0SUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFRbkM7Ozs7R0FJRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYSxDQUFFLEdBQVc7SUFDOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDMUQsSUFBSSxNQUFNLEdBQUcsRUFBaUIsQ0FBQTtJQUU5QixRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxpQ0FBaUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQTtZQUMvRSxNQUFNLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7YUFDL0QsQ0FBQTtZQUNELE1BQUs7UUFDUCxDQUFDO1FBQ0QsS0FBSyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDL0MsSUFBSSxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFBO1lBQ25ELElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN4QixNQUFNLEdBQUcsV0FBVyxDQUFBO1lBQ3RCLENBQUM7aUJBQU0sSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sR0FBRyxPQUFPLENBQUE7WUFDbEIsQ0FBQztZQUNELE1BQU0sR0FBRztnQkFDUCxJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2FBQ3hDLENBQUE7WUFDRCxNQUFLO1FBQ1AsQ0FBQztRQUNELEtBQUssb0NBQW9DLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLDRDQUE0QyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEgsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO1lBQ25FLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtZQUM5RSxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksU0FBUyxDQUFBO1lBQ3RDLE1BQU0sR0FBRztnQkFDUCxJQUFJLEVBQUUsY0FBYztnQkFDcEIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO2FBQ3BELENBQUE7WUFDRCxNQUFLO1FBQ1AsQ0FBQztRQUNELEtBQUsscUJBQXFCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUE7WUFDckUsTUFBTSxHQUFHO2dCQUNQLElBQUksRUFBRSxrQkFBa0I7Z0JBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUzthQUN0QyxDQUFBO1lBQ0QsTUFBSztRQUNQLENBQUM7UUFDRDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDdkIsTUFBSztJQUNULENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMifQ==