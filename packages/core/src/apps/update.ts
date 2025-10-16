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

import { Root } from '@/module'
import { getChangelogImage } from '@/module/utils/changelog'
import { isSemverGreater } from '@/module/utils/semver'

const UPDATE_LOCK_KEY = 'kkk:update:lock'
const UPDATE_MSGID_KEY = 'kkk:update:msgId'

const Handler = async (e: Message) => {
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  logger.trace(e)

  // 版本提醒锁（只提醒一次，直到本地版本达到或超过锁定版本才解锁）
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

  let upd:
    | { status: 'yes'; local: string; remote: string }
    | { status: 'no'; local: string }
    | { status: 'error'; error: Error }

  try {
    upd = await checkPkgUpdate(Root.pluginName)
  } catch {
    // 检测异常则跳过
    return true
  }

  if (upd.status !== 'yes') {
    // 无更新或检测错误，结束本次任务
    return true
  }

  // 设置锁为当前远程版本，确保只推送一次
  try {
    await db.set(UPDATE_LOCK_KEY, upd.remote)
  } catch { }

  const ChangeLogImg = await getChangelogImage(Root.pluginVersion, upd.remote)

  // 通知主人
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
        segment.text('karin-plugin-kkk 有新的更新！'),
        ...ChangeLogImg
      ]
    )
    try {
      await db.set(UPDATE_MSGID_KEY, msgResult.messageId)
    } catch { }
  }
  return true
}

export const kkkUpdate = hooks.message.friend(async (e, next) => {
  if (e.msg.includes('更新')) {
    const msgId = (await db.get(UPDATE_MSGID_KEY)) as string
    if (e.replyId === msgId) {
      try {
        const upd = await checkPkgUpdate(Root.pluginName)
        if (upd.status === 'yes') {
          const result = await updatePkg(Root.pluginName)
          if (result.status === 'ok') {
            const msgResult = await e.reply(
              `${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`
            )
            if (msgResult.messageId) {
              try {
                await db.del(UPDATE_MSGID_KEY)
                await db.del(UPDATE_LOCK_KEY)
              } catch { }
            }
            await restart(e.selfId, e.contact, e.messageId)
          } else {
            await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? '更新执行失败'}`)
          }
        } else if (upd.status === 'no') {
          await e.reply('未检测到可更新版本。')
        } else {
          await e.reply(`${Root.pluginName} 更新失败: ${upd.error?.message ?? String(upd.error)}`)
        }
      } catch (error: any) {
        await e.reply(`${Root.pluginName} 更新失败: ${error.message}`)
      }
    }
  }
  next()
}, { priority: 100 })

export const kkkUpdateCommand = karin.command(/^#?kkk更新$/, async (e: Message) => {
  const upd = await checkPkgUpdate(Root.pluginName)
  if (upd.status === 'error') {
    await e.reply(`获取远程版本失败：${upd.error?.message ?? String(upd.error)}`)
    return
  }
  if (upd.status === 'no') {
    await e.reply(`当前已是最新版本：${upd.local}`, { reply: true })
    return
  }

  const ChangeLogImg = await getChangelogImage(Root.pluginVersion, upd.remote)
  if (ChangeLogImg) {
    await e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true })
  } else {
    await e.reply('获取更新日志失败，更新进程继续......', { reply: true })
  }

  // 执行更新并重启
  try {
    const result = await updatePkg(Root.pluginName)
    if (result.status === 'ok') {
      const msgResult = await e.reply(
        `${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`
      )
      if (msgResult.messageId) {
        try {
          await db.del(UPDATE_MSGID_KEY)
          await db.del(UPDATE_LOCK_KEY)
        } catch { }
      }
      const restartStartTime = Date.now()
      const restartResult = await restart(e.selfId, e.contact, e.messageId)
      if (restartResult.status === 'success') {
        await e.reply(`重启成功，耗时: ${((Date.now() - restartStartTime) / 1000).toFixed(2)}s`)
      } else {
        await e.reply(`重启失败: ${restartResult.data}`)
      }
    } else {
      await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? '更新执行失败'}`)
    }
  } catch (error: any) {
    await e.reply(`${Root.pluginName} 更新失败: ${error.message}`)
  }
}, { name: 'kkk-更新' })

export const update = karin.task('kkk-更新检测', '*/10 * * * *', Handler, {
  name: 'kkk-更新检测',
  log: false
})