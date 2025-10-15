import karin, { 
  checkPkgUpdate,
  config,
  db,
  hooks,
  logger,
  Message,
  restart,
  segment,
  updatePkg
} from 'node-karin'
import axios from 'node-karin/axios'

import { Root } from '@/module'
import { getChangelogImage } from '@/module/utils/changelog'
import { isSemverGreater } from '@/module/utils/semver'

const UPDATE_LOCK_KEY = 'kkk:update:lock'
const UPDATE_MSGID_KEY = 'kkk:update:msgId'

const Handler = async (e: Message) => {
  logger.trace(e)
  // 1) 获取远程最新版本
  const registryUrl = `https://registry.npmjs.org/${Root.pluginName}`
  let latestVersion: string | null = null
  try {
    const res = await axios.get(registryUrl, { timeout: 10000 })
    latestVersion = res.data?.['dist-tags']?.latest || res.data?.version || null
  } catch {
    // 拉取失败，直接结束本次任务
    return true
  }
  if (!latestVersion) {
    return true
  }

  // 2) 版本提醒锁（只提醒一次，直到本地版本达到或超过锁定版本才解锁）
  try {
    const lockedVersion = await db.get(UPDATE_LOCK_KEY)
    if (typeof lockedVersion === 'string' && lockedVersion.length > 0) {
      // 本地版本达到或超过锁定版本 => 解锁
      if (!isSemverGreater(lockedVersion, Root.pluginVersion)) {
        await db.del(UPDATE_LOCK_KEY)
      } else {
        // 仍处于锁定状态（本地版本小于锁定版本）=> 跳过本次提醒
        return true
      }
    }
  } catch { }

  // 3) 判断是否有可更新版本（远程 > 本地）
  if (!isSemverGreater(latestVersion, Root.pluginVersion)) {
    // 没有可更新版本
    return true
  }

  // 4) 设置锁为当前远程版本，确保只推送一次
  try {
    await db.set(UPDATE_LOCK_KEY, latestVersion)
  } catch { }

  const ChangeLogImg = await getChangelogImage(Root.pluginVersion, latestVersion)

  // 5) 通知主人
  const list = config.master()
  let master = list[0]
  if (master === 'console') {
    master = list[1]
  }

  const botList = karin.getAllBotList()
  if (ChangeLogImg) {
    const msgResult = await karin.sendMaster(
      botList[0].bot.account.name === 'console' ? botList[1].bot.account.selfId : botList[0].bot.account.selfId,
      master,
      [
        segment.text('karin-plugin-kkk 有新的更新！\n引用该消息发送「更新」以更新插件'),
        ...ChangeLogImg
      ]
    )
    try {
      await db.set(UPDATE_MSGID_KEY, msgResult.messageId)
      // 不再重复写入锁，前面已设置
    } catch { }
  }
  return true
}

export const kkkUpdate = hooks.message.friend(async (e, next) => {
  if (e.msg.includes('更新')) {
    const msgId = await db.get(UPDATE_MSGID_KEY) as string
    if (e.replyId === msgId) {
      const updateStatus = await checkPkgUpdate(Root.pluginName)
      if (updateStatus.status === 'yes') {
        try {
          const result = await updatePkg(Root.pluginName)
          if (result.status === 'ok') {
            const msgResult = await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)
            msgResult.messageId && await db.del(UPDATE_MSGID_KEY) && await db.del(UPDATE_LOCK_KEY)
            const restartStartTime = Date.now()
            const restartResult = await restart(e.selfId, e.contact, e.messageId)
            if (restartResult.status === 'success') {
              await e.reply(`重启成功，耗时: ${(Date.now() - restartStartTime / 1000).toFixed(2)}s`)
            } else {
              await e.reply(`重启失败: ${restartResult.data}`)
            }
          } else if (result.status === 'failed') {
            await e.reply(`${Root.pluginName} 更新失败: ${result.data}`)
          }
        } catch (error: any) {
          await e.reply(`${Root.pluginName} 更新失败: ${error.message}`)
        }
      }
    }
  }
  next()
}, { priority: 100 })

export const kkkUpdateCommand = karin.command(/^#?kkk更新$/, async (e: Message) => {
  // 1) 获取远程最新版本
  const registryUrl = `https://registry.npmjs.org/${Root.pluginName}`
  let latestVersion: string | null = null
  try {
    const res = await axios.get(registryUrl, { timeout: 10000 })
    latestVersion = res.data?.['dist-tags']?.latest || res.data?.version || null
  } catch {
    await e.reply('获取远程版本失败，请稍后再试。')
    return
  }
  if (!latestVersion) {
    await e.reply('未获取到最新版本信息。')
    return
  }

  if (!isSemverGreater(latestVersion, Root.pluginVersion)) {
    await e.reply(`当前已是最新版本：${Root.pluginVersion}`, { reply: true })
    return
  }


  const ChangeLogImg = await getChangelogImage(Root.pluginVersion, latestVersion)
  if (ChangeLogImg) {
    await e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true })
  } else {
    await e.reply('获取更新日志失败，更新进程继续......', { reply: true })
  }

  // 5) 执行更新并重启
  const updateStatus = await checkPkgUpdate(Root.pluginName)
  if (updateStatus.status === 'yes') {
    try {
      const result = await updatePkg(Root.pluginName)
      if (result.status === 'ok') {
        const msgResult = await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)
        msgResult.messageId && await db.del(UPDATE_MSGID_KEY) && await db.del(UPDATE_LOCK_KEY)
        const restartStartTime = Date.now()
        const restartResult = await restart(e.selfId, e.contact, e.messageId)
        if (restartResult.status === 'success') {
          await e.reply(`重启成功，耗时: ${((Date.now() - restartStartTime) / 1000).toFixed(2)}s`)
        } else {
          await e.reply(`重启失败: ${restartResult.data}`)
        }
      } else if (result.status === 'failed') {
        await e.reply(`${Root.pluginName} 更新失败: ${result.data}`)
      }
    } catch (error: any) {
      await e.reply(`${Root.pluginName} 更新失败: ${error.message}`)
    }
  } else {
    await e.reply('未检测到可更新版本。')
  }
}, { name: 'kkk-更新' })

export const updateTest = karin.command('test', async (e: Message) => {
  return Handler(e)
}, {
  name: 'kkk-更新检测'
})

export const update = karin.task('kkk-更新检测', '*/10 * * * *', Handler, {
  name: 'kkk-更新检测',
  log: true
})