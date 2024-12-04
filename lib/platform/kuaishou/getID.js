import { logger } from 'node-karin';
import { Networks } from '../../module/index.js';
/**
 *
 * @param url 分享链接
 * @param log 输出日志，默认true
 * @returns
 */
export async function getKuaishouID(url, log = true) {
    const longLink = await new Networks({ url }).getLongLink();
    let result = {};
    switch (true) {
        case /photoId=(.*)/.test(longLink): {
            const workid = /photoId=([^&]+)/.exec(longLink);
            result = {
                type: 'one_work',
                photoId: workid ? workid[1] : undefined
            };
            break;
        }
        default: {
            logger.warn('无法获取作品ID');
            break;
        }
    }
    log && console.log(result);
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SUQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGxhdGZvcm0va3VhaXNob3UvZ2V0SUQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUVuQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFBO0FBUW5DOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUUsR0FBVyxFQUFFLEdBQUcsR0FBRyxJQUFJO0lBQzFELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzFELElBQUksTUFBTSxHQUFHLEVBQWlDLENBQUE7SUFDOUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUNiLEtBQUssY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQy9DLE1BQU0sR0FBRztnQkFDUCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQ3hDLENBQUE7WUFDRCxNQUFLO1FBQ1AsQ0FBQztRQUVELE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3ZCLE1BQUs7UUFDUCxDQUFDO0lBQ0gsQ0FBQztJQUVELEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzFCLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyJ9