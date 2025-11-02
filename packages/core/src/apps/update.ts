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

  let upd:
    | { status: 'yes'; local: string; remote: string }
    | { status: 'no'; local: string }
    | { status: 'error'; error: Error }

  try {
    upd = await checkPkgUpdate(Root.pluginName, { compare: 'semver' })
  } catch {
    return true
  }

  // 防守性校验：远程必须严格大于本地，否则视为无更新
  if (upd.status === 'yes' && !isSemverGreater(upd.remote, upd.local)) {
    return true
  }

  if (upd.status !== 'yes') {
    return true
  }

  // 版本提醒锁（检查是否已经推送过相同或更高版本的更新通知）
  try {
    const lockedVersion = await db.get(UPDATE_LOCK_KEY)
    if (typeof lockedVersion === 'string' && lockedVersion.length > 0) {
      // 本地版本达到或超过锁定版本 => 解锁
      if (!isSemverGreater(lockedVersion, Root.pluginVersion)) {
        await db.del(UPDATE_LOCK_KEY)
      } else {
        // 检查远程版本是否比锁定版本更新
        if (!isSemverGreater(upd.remote, lockedVersion)) {
          // 远程版本不比锁定版本新，跳过本次提醒
          return true
        }
        // 远程版本比锁定版本新，继续推送并更新锁定版本
      }
    }
  } catch { }

  // 设置锁为当前远程版本，确保只推送一次
  try {
    await db.set(UPDATE_LOCK_KEY, upd.remote)
  } catch { }

  const ChangeLogImg = await getChangelogImage({ 
    localVersion: Root.pluginVersion, 
    remoteVersion: upd.remote, 
    Tip: true 
  })

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
        const upd = await checkPkgUpdate(Root.pluginName, { compare: 'semver' })
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
  const upd = await checkPkgUpdate(Root.pluginName, { compare: 'semver' })
  if (upd.status === 'error') {
    await e.reply(`获取远程版本失败：${upd.error?.message ?? String(upd.error)}`)
    return
  }
  if (upd.status === 'no') {
    await e.reply(`当前已是最新版本：${upd.local}`, { reply: true })
    return
  }

  // 防守性校验：远程必须严格大于本地，否则视为无更新
  if (upd.status === 'yes' && !isSemverGreater(upd.remote, upd.local)) {
    await e.reply(`当前已是最新或预览版本：${upd.local}`, { reply: true })
    return
  }

  const ChangeLogImg = await getChangelogImage({
    localVersion: Root.pluginVersion, 
    remoteVersion: upd.remote, 
    Tip: false
  })
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
      await restart(e.selfId, e.contact, e.messageId)
    } else {
      await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? '更新执行失败'}`)
    }
  } catch (error: any) {
    await e.reply(`${Root.pluginName} 更新失败: ${error.message}`)
  }
}, { name: 'kkk-更新' })

export const kkkUpdateTest = karin.command('test', async (e: Message) => {
  await db.del(UPDATE_MSGID_KEY)
  await db.del(UPDATE_LOCK_KEY)
  return Handler(e)
})

export const update = karin.task('kkk-更新检测', '*/10 * * * *', Handler, {
  name: 'kkk-更新检测',
  log: false
})