import { DyUserInfo, Result } from '@ikenxuan/amagi'
import { logger } from 'node-karin'

import { douyinDB } from '@/module'
import { douyinFetcher } from '@/module/utils/amagiClient'
import { douyinPushItem } from '@/types/config/pushlist'

import type { DouyinPushItem } from './types'

/**
 * 处理喜欢列表推送
 * 通过对比aweme_id判断是否有新增的喜欢作品
 * @returns 返回需要推送的作品项数组
 */
export async function processFavoriteList (
  contentList: any[],
  sec_uid: string,
  userinfo: Result<DyUserInfo>,
  item: douyinPushItem,
  targets: Array<{ groupId: string, botId: string }>,
  force: boolean = false
): Promise<DouyinPushItem[]> {
  const pushType = 'favorite'
  const listName = '喜欢列表'
  const result: DouyinPushItem[] = []

  // 获取所有目标群组的历史状态
  const groupHistoryStatus = new Map<string, boolean>()
  for (const target of targets) {
    const hasHistory = await douyinDB.hasHistory(sec_uid, target.groupId, pushType)
    groupHistoryStatus.set(target.groupId, hasHistory)
  }

  for (const [index, aweme] of contentList.entries()) {
    // 过滤掉已经推送过的群组
    const validTargets: Array<{ groupId: string, botId: string }> = []
    for (const target of targets) {
      const isPushed = await douyinDB.isAwemePushed(aweme.aweme_id, sec_uid, target.groupId, pushType)
      if (!isPushed) {
        const hasHistory = groupHistoryStatus.get(target.groupId)
        // 如果是强制推送、老订阅者（有历史记录），或者这是最新的一条作品（index === 0），则推送
        if (force || hasHistory || index === 0) {
          validTargets.push(target)
        } else {
          // 如果是新订阅者且不是最新作品，则不推送，但写入缓存避免下次重复推送
          await douyinDB.addAwemeCache(aweme.aweme_id, sec_uid, target.groupId, pushType)
          logger.debug(`新订阅群组 ${target.groupId} 跳过旧作品 ${aweme.aweme_id} 并已标记为已读`)
        }
      }
    }

    // 如果所有群组都已推送过（或被跳过），则跳过
    if (validTargets.length === 0) {
      continue
    }

    // 获取作品作者的用户信息
    let authorUserInfo: Result<DyUserInfo> | undefined
    try {
      if (aweme.author?.sec_uid) {
        authorUserInfo = await douyinFetcher.fetchUserProfile({
          sec_uid: aweme.author.sec_uid,
          typeMode: 'strict'
        })
        logger.debug(`获取作品作者 ${aweme.author.nickname} 的用户信息成功`)
      }
    } catch (error) {
      logger.warn(`获取作品作者用户信息失败: ${error}`)
    }

    // 新增的作品，需要推送
    result.push({
      remark: item.remark,
      sec_uid,
      create_time: aweme.create_time,
      targets: validTargets,
      pushType,
      Detail_Data: {
        ...aweme,
        user_info: userinfo, // 点赞者（订阅者）的信息
        author_user_info: authorUserInfo // 作品作者的信息
      },
      avatar_img: 'https://p3-pc.douyinpic.com/aweme/1080x1080/' + userinfo.data.user.avatar_larger.uri,
      living: false
    })

    logger.debug(`发现新${listName}作品：${aweme.aweme_id}`)
  }

  // 更新列表快照
  await douyinDB.updateListSnapshot(sec_uid, pushType, contentList.map(a => a.aweme_id))

  return result
}
