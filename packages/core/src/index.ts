import type { AdapterType, ImageElement, SendMessage } from 'node-karin'
import karin, { BOT_CONNECT, config, logger } from 'node-karin'

import { Root } from '@/module'
import { isSemverGreater } from '@/module/utils/semver'

declare const __REQUIRE_KARIN_VERSION__: string

// ----------------- VERSION CHECK -----------------
const requireVersion = typeof __REQUIRE_KARIN_VERSION__ !== 'undefined' ? __REQUIRE_KARIN_VERSION__ : '1.1145.14'
// const requireVersion = '1.14514.1'
if (process.env.NODE_ENV !== 'development' && isSemverGreater(requireVersion, Root.karinVersion)) {
  const msg = `[karin-plugin-kkk] 插件构建时的 karin 版本 (${requireVersion}) 高于当前运行版本 (${Root.karinVersion})，可能会出现兼容性问题！`
  logger.warn(msg)

  /** 已发送通知的 Bot ID 和主人 ID 组合，格式：`${botId}:${master}` */
  const notifiedSet = new Set<string>()

  karin.on(BOT_CONNECT, async (bot: AdapterType) => {
    const botId = bot.selfId
    
    // 跳过 console Bot
    if (botId === 'console') return
    
    // 增加延迟，确保 bot 完全初始化
    await new Promise(resolve => setTimeout(resolve, 2000))
    const masters = config.master()

    logger.info(`[karin-plugin-kkk] 监测到 Bot 连接: ${botId}, 准备发送版本警告`)

    // 生成警告图片
    let warningImage: ImageElement[] | null = null
    try {
      const { Render } = await import('@/module/utils/Render')
      warningImage = await Render('other/version_warning', {
        requireVersion,
        currentVersion: Root.karinVersion
      })
    } catch (error) {
      logger.error(`[karin-plugin-kkk] 生成版本警告图片失败: ${error}`)
    }

    for (const master of masters) {
      if (master === 'console') continue

      const key = `${botId}:${master}`
      if (notifiedSet.has(key)) continue

      try {
        const elements: SendMessage = []
        if (warningImage) {
          elements.push(...warningImage)
        }

        await karin.sendMaster(botId, master, elements)
        notifiedSet.add(key)
        logger.info(`[karin-plugin-kkk] 已发送版本警告给主人: ${master} (via ${botId})`)
      } catch (error) {
        logger.error(`[karin-plugin-kkk] 发送版本警告给主人 (${master}) 失败: ${error}`)
      }
    }
  })
}

// ----------------- MAIN ENTRY -----------------
await import('./setup')
