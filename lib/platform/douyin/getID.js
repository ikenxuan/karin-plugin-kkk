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
            const match = longLink.match(/share\/slides\/(\d+)/);
            result = {
                type: 'user_mix_videos',
                aweme_id: match ? match[1] : undefined,
                is_mp4: false
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