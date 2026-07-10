import karin, { type ImageElement, logger } from 'node-karin'

import { douyinFetcher } from '@/module/utils/amagiClient'
import { Config } from '@/module/utils/Config'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { getDouyinID } from '@/platform/douyin/getID'
import { renderFavoriteImage, renderLiveImage, renderRecommendImage, renderWorkImage } from '@/platform/douyin/push/render'
import { getWorkTypeInfo } from '@/platform/douyin/workType'

/** 构建与生产推送一致的作品二维码链接。 */
function buildWorkShareLink(aweme: any): string {
  const workTypeInfo = getWorkTypeInfo(aweme)
  if (workTypeInfo.isArticle) return `https://www.douyin.com/article/${aweme.aweme_id}`
  if (workTypeInfo.isImage) return `https://www.douyin.com/note/${aweme.aweme_id}`
  return aweme.video?.play_addr?.uri
    ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${aweme.video.play_addr.uri}&ratio=1080p&line=0`
    : `https://www.douyin.com/video/${aweme.aweme_id}`
}

/**
 * 测试抖音推送命令处理器
 * 支持四种推送类型的预览渲染，无数据库交互，仅用于调试和验证推送卡片效果
 *
 * 命令格式：
 * - #测试抖音作品推送 <作品链接>
 * - #测试抖音喜欢列表推送 <用户主页链接>
 * - #测试抖音推荐列表推送 <用户主页链接>
 * - #测试抖音直播状态推送 <用户主页链接>
 */
const handleTestPush = wrapWithErrorHandler(
  async (e) => {
    const match = e.msg.match(/^#测试抖音(作品|喜欢列表|推荐列表|直播状态)推送/)
    if (!match) {
      e.reply(
        '支持的命令：\n#测试抖音作品推送 <作品链接>\n#测试抖音喜欢列表推送 <用户主页链接>\n#测试抖音推荐列表推送 <用户主页链接>\n#测试抖音直播状态推送 <用户主页链接>'
      )
      return true
    }

    /** 提取推送类型和链接 */
    const pushType = match[1] as '作品' | '喜欢列表' | '推荐列表' | '直播状态'
    const restMsg = e.msg.replace(match[0], '').trim()

    const urlMatch = restMsg.match(/(https?:\/\/[^\s]+)/i)
    if (!urlMatch) {
      e.reply(`请在命令后提供对应的${pushType === '作品' ? '作品' : '用户主页'}链接`)
      return true
    }
    const url = urlMatch[1]
    const iddata = await getDouyinID(e, url, false)
    let images: ImageElement[] = []

    switch (pushType) {
      /** 作品推送：作品链接 → parseWork → 渲染 */
      case '作品': {
        if (iddata.type !== 'one_work' || !iddata.aweme_id) {
          e.reply('该链接不是作品链接，请提供视频/图集/文章链接')
          return true
        }
        logger.mark(`[测试抖音推送] 开始解析作品: ${iddata.aweme_id}`)
        const workData = await douyinFetcher.parseWork({ aweme_id: iddata.aweme_id, typeMode: 'strict' })
        if (!workData.data.aweme_detail) {
          e.reply('获取作品详情失败，作品可能已被删除或设为私密')
          return true
        }
        const aweme = workData.data.aweme_detail
        const userinfo = await douyinFetcher.fetchUserProfile({ sec_uid: aweme.author.sec_uid, typeMode: 'strict' })
        const Detail_Data = { ...aweme, user_info: userinfo }
        const shareLink = buildWorkShareLink(Detail_Data)
        images = await renderWorkImage({ e, Detail_Data, create_time: aweme.create_time, shareLink })
        if (images.length === 0) {
          e.reply('未能识别该作品类型，无法渲染推送图片')
          return true
        }
        break
      }

      /** 喜欢列表：用户主页 → fetchUserFavoriteList[0] → 渲染 */
      case '喜欢列表': {
        if (iddata.type !== 'user_dynamic' || !iddata.sec_uid) {
          e.reply('需要用户主页链接以获取喜欢列表')
          return true
        }
        logger.mark(`[测试抖音推送] 开始获取喜欢列表: sec_uid=${iddata.sec_uid}`)
        const userinfo = await douyinFetcher.fetchUserProfile({ sec_uid: iddata.sec_uid, typeMode: 'strict' })
        const favoriteData = await douyinFetcher.fetchUserFavoriteList({
          sec_uid: iddata.sec_uid,
          number: 1,
          typeMode: 'strict'
        })
        if (!favoriteData.data.aweme_list?.length) {
          e.reply('该用户的喜欢列表为空或未公开')
          return true
        }
        const aweme = favoriteData.data.aweme_list[0]
        let authorUserInfo: any
        try {
          authorUserInfo = await douyinFetcher.fetchUserProfile({ sec_uid: aweme.author.sec_uid, typeMode: 'strict' })
        } catch {
          /* ignore */
        }
        const Detail_Data = { ...aweme, user_info: userinfo, author_user_info: authorUserInfo }
        const shareLink = buildWorkShareLink(Detail_Data)
        images = await renderFavoriteImage({
          e,
          Detail_Data,
          create_time: aweme.create_time,
          shareLink,
          remark: userinfo.data.user.nickname
        })
        if (!images.length) {
          e.reply('渲染喜欢列表推送图片失败')
          return true
        }
        break
      }

      /** 推荐列表：用户主页 → fetchUserRecommendList[0] → 渲染 */
      case '推荐列表': {
        if (iddata.type !== 'user_dynamic' || !iddata.sec_uid) {
          e.reply('需要用户主页链接以获取推荐列表')
          return true
        }
        logger.mark(`[测试抖音推送] 开始获取推荐列表: sec_uid=${iddata.sec_uid}`)
        const userinfo = await douyinFetcher.fetchUserProfile({ sec_uid: iddata.sec_uid, typeMode: 'strict' })
        const recommendData = await douyinFetcher.fetchUserRecommendList({
          sec_uid: iddata.sec_uid,
          number: 1,
          typeMode: 'strict'
        })
        if (!recommendData.data.aweme_list?.length) {
          e.reply('该用户的推荐列表为空或未公开')
          return true
        }
        const aweme = recommendData.data.aweme_list[0]
        let authorUserInfo: any
        try {
          authorUserInfo = await douyinFetcher.fetchUserProfile({ sec_uid: aweme.author.sec_uid, typeMode: 'strict' })
        } catch {
          /* ignore */
        }
        const Detail_Data = { ...aweme, user_info: userinfo, author_user_info: authorUserInfo }
        const shareLink = buildWorkShareLink(Detail_Data)
        images = await renderRecommendImage({
          e,
          Detail_Data,
          create_time: aweme.create_time,
          shareLink,
          remark: userinfo.data.user.nickname
        })
        if (!images.length) {
          e.reply('渲染推荐列表推送图片失败')
          return true
        }
        break
      }

      /** 直播状态：用户主页 → 检查 live_status → fetchLiveRoomInfo → 渲染 */
      case '直播状态': {
        if (iddata.type !== 'user_dynamic' || !iddata.sec_uid) {
          e.reply('需要用户主页链接以检查直播状态')
          return true
        }
        const sec_uid = iddata.sec_uid
        logger.mark(`[测试抖音推送] 开始检查直播状态: sec_uid=${sec_uid}`)
        const userinfo = await douyinFetcher.fetchUserProfile({ sec_uid, typeMode: 'strict' })
        const user = userinfo.data.user
        if (user.live_status !== 1) {
          e.reply(`${user.nickname} 当前未在直播`)
          return true
        }
        if (!user.room_data) {
          e.reply('未获取到直播间信息')
          return true
        }
        const room_data = JSON.parse(user.room_data)
        const liveInfo = await douyinFetcher.fetchLiveRoomInfo({
          room_id: user.room_id_str,
          web_rid: room_data.owner.web_rid,
          typeMode: 'strict'
        })
        const Detail_Data = { user_info: userinfo, room_data, live_data: liveInfo }
        images = await renderLiveImage({ e, Detail_Data })
        if (!images.length) {
          e.reply('渲染直播状态推送图片失败')
          return true
        }
        break
      }
    }

    e.reply([
      ...images
      // segment.markdown('[跳转](mqqapi://forward/url?version=1&src_type=web&url_prefix=' + encodeURIComponent('https://www.douyin.com'))
    ])
    logger.mark(`[测试抖音推送] ${pushType}推送渲染完成`)
    return true
  },
  {
    businessName: '测试抖音推送'
  }
)

/** 注册测试推送命令 */
export const testPush =
  Config.douyin.switch &&
  karin.command(/^#测试抖音(作品|喜欢列表|推荐列表|直播状态)推送/, handleTestPush, {
    name: 'kkk-测试抖音推送',
    perm: 'master'
  })
