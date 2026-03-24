import karin, {
  checkPkgUpdate,
  config,
  db,
  hooks,
  Message,
  restart,
  segment,
  updatePkg
} from 'node-karin'

import { Root } from '@/module'
import { getChangelogImage } from '@/module/utils/changelog'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { isSemverGreater } from '@/module/utils/semver'

const UPDATE_LOCK_KEY = 'kkk:update:lock'
const UPDATE_MSGID_KEY = 'kkk:update:msgId'

/**
 * 定时更新检测处理器
 * 主动获取 Bot 列表与好友关系，匹配主人可用的 Bot，
 * 渲染更新日志并私聊通知所有主人。
 *
 * @returns 是否继续后续任务
 */
const Handler = async () => {
  if (process.env.NODE_ENV === 'development') {
    return true
  }

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

  const masters = config.master().filter(id => id !== 'console')
  if (masters.length === 0) return true

  const botItems = karin.getAllBotList()
    .filter(b => b.bot.account.name !== 'console')
  if (botItems.length === 0) return true

  // 预取好友列表（并发）
  const friendsMap = new Map<string, Array<{ userId: string }>>()
  await Promise.all(
    botItems.map(async (item) => {
      try {
        const list = await item.bot.getFriendList()
        friendsMap.set(item.bot.account.selfId, list || [])
      } catch {
        friendsMap.set(item.bot.account.selfId, [])
      }
    })
  )

  // 为每个主人选择可用 Bot（好友命中）
  const masterToBot = new Map<string, typeof botItems[number]['bot']>()
  for (const owner of masters) {
    const matched = botItems.find(it => (friendsMap.get(it.bot.account.selfId) || []).some(f => f.userId === owner))
    if (matched) {
      masterToBot.set(owner, matched.bot)
    }
  }

  // 分组渲染：每个 Bot 渲染一次
  const botToImage = new Map<string, Array<ReturnType<typeof segment.image> | ReturnType<typeof segment.text>>>()
  for (const item of botItems) {
    // 仅在该 Bot 存在主人匹配时渲染
    const hasOwners = Array.from(masterToBot.entries()).some(([, b]) => b.account.selfId === item.bot.account.selfId)
    if (!hasOwners) continue
    const img = await getChangelogImage({ bot: item.bot } as Message, {
      localVersion: Root.pluginVersion,
      remoteVersion: upd.remote,
      Tip: true
    })
    if (img && img.length > 0) {
      botToImage.set(item.bot.account.selfId, [
        segment.text('karin-plugin-kkk 有新的更新！'),
        ...img
      ])
    }
  }

  // 依次私聊所有主人（存在好友命中的才发送）
  let storedMsgId: string | undefined
  for (const owner of masters) {
    const bot = masterToBot.get(owner)
    if (!bot) continue
    const elements = botToImage.get(bot.account.selfId)
    if (!elements) continue
    const msg = await karin.sendMaster(bot.account.selfId, owner, elements)
    if (!storedMsgId && msg?.messageId) {
      storedMsgId = msg.messageId
    }
  }

  // 记录首条提醒消息ID用于后续 Hook 的「更新」响应
  if (storedMsgId) {
    try {
      await db.set(UPDATE_MSGID_KEY, storedMsgId)
    } catch { }
  }
  return true
}

const handleUpdateHook = wrapWithErrorHandler(async (e: Message) => {
  e.reply('开始更新 karin-plugin-kkk ...', { reply: true })
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
      e.reply(`${Root.pluginName} 更新失败: ${result.data ?? '更新执行失败'}`)
    }
  } else if (upd.status === 'no') {
    e.reply('未检测到可更新版本。')
  } else {
    e.reply(`${Root.pluginName} 更新失败: ${upd.error?.message ?? String(upd.error)}`)
  }
}, {
  businessName: '更新Hook'
})

export const kkkUpdate = hooks.message.friend(async (e, next) => {
  if (e.msg.includes('更新')) {
    const msgId = (await db.get(UPDATE_MSGID_KEY)) as string
    if (e.replyId === msgId) {
      await handleUpdateHook(e)
    }
  }
  next()
}, { priority: 100 })

const handleKkkUpdate = wrapWithErrorHandler(async (e: Message) => {
  const upd = await checkPkgUpdate(Root.pluginName, { compare: 'semver' })
  if (upd.status === 'error') {
    e.reply(`获取远程版本失败：${upd.error?.message ?? String(upd.error)}`)
    return
  }
  if (upd.status === 'no') {
    e.reply(`当前已是最新版本：${upd.local}`, { reply: true })
    return
  }

  // 防守性校验：远程必须严格大于本地，否则视为无更新
  if (upd.status === 'yes' && !isSemverGreater(upd.remote, upd.local)) {
    e.reply(`当前已是最新或预览版本：${upd.local}`, { reply: true })
    return
  }

  const ChangeLogImg = await getChangelogImage(e, {
    localVersion: Root.pluginVersion,
    remoteVersion: upd.remote,
    Tip: false,
    isRemote: true
  })
  if (ChangeLogImg) {
    e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true })
  } else {
    e.reply('获取更新日志失败，更新进程继续......', { reply: true })
  }

  // 执行更新并重启
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
    await restart(e.selfId, e.contact, msgResult.messageId)
  } else {
    e.reply(`${Root.pluginName} 更新失败: ${result.data ?? '更新执行失败'}`)
  }
}, {
  businessName: 'KKK更新'
})

export const kkkUpdateCommand = karin.command(/^#?kkk更新$/, handleKkkUpdate, { name: 'kkk-更新' })

// export const kkkUpdateTest = karin.command('test', async (_e: Message) => {
//   await db.del(UPDATE_MSGID_KEY)
//   await db.del(UPDATE_LOCK_KEY)
//   return Handler()
// })

export const update = karin.task('kkk-更新检测', '*/1 * * * *', Handler, {
  name: 'kkk-更新检测',
  log: false
})
