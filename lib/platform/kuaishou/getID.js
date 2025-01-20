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