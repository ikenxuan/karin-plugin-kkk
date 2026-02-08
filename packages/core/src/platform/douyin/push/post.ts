import { DyUserInfo, Result } from '@ikenxuan/amagi'
import { format, fromUnixTime } from 'date-fns'
import { logger } from 'node-karin'

import { douyinDB } from '@/module'
import { douyinPushItem } from '@/types/config/pushlist'

import type { DouyinPushItem } from './types'

/**
 * 处理作品列表推送
 * 按照作品发布时间进行过滤，只推送24小时内的作品
 * @returns 返回需要推送的作品项数组
 */
export async function processPostList (
  contentList: any[],
  sec_uid: string,
  userinfo: Result<DyUserInfo>,
  item: douyinPushItem,
  targets: Array<{ groupId: string; botId: string }>
): Promise<DouyinPushItem[]> {
  const pushType = 'post'
  const listName = '作品列表'
  const result: DouyinPushItem[] = []

  for (const aweme of contentList) {
    const nowSeconds = Math.floor(Date.now() / 1000)
    const createTime = aweme.create_time
    const timeDifference = nowSeconds - createTime
    const is_top = aweme.is_top === 1

    const timeDiffHours = Math.round((timeDifference / 3600) * 100) / 100

    logger.trace(`
      前期获取该作品基本信息：
      推送类型：${pushType}（${listName}）
      作者：${aweme.author.nickname}
      作品ID：${aweme.aweme_id}
      发布时间：${format(fromUnixTime(aweme.create_time), 'yyyy-MM-dd HH:mm')}
      发布时间戳（s）：${createTime}
      当前时间戳（s）：${nowSeconds}
      时间差（s）：${timeDifference}s (${timeDiffHours}h)
      是否置顶：${is_top}
      是否在一天内：${timeDifference < 86400 ? logger.green('true') : logger.red('false')}
      `)

    // 判断是否需要推送（86400秒 = 1天）
    if ((is_top && timeDifference < 86400) || (timeDifference < 86400 && !is_top)) {
      // 过滤掉已经推送过的群组
      const validTargets: Array<{ groupId: string; botId: string }> = []
      for (const target of targets) {
        const isPushed = await douyinDB.isAwemePushed(aweme.aweme_id, sec_uid, target.groupId, pushType)
        if (!isPushed) {
          validTargets.push(target)
        }
      }

      if (validTargets.length > 0) {
        result.push({
          remark: item.remark,
          sec_uid,
          create_time: aweme.create_time,
          targets: validTargets,
          pushType,
          Detail_Data: {
            ...aweme,
            user_info: userinfo
          },
          avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.data.user.avatar_larger.uri,
          living: false
        })
      }
    }
  }

  return result
}
