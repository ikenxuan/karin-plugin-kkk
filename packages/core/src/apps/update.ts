import type { UpdateHelpData } from '@template/template/other/updateHelp/components/types'
import karin, {
  checkPkgUpdate,
  config,
  db,
  exec,
  getRemotePkgVersion,
  getPkgVersion,
  hooks,
  Message,
  restart,
  segment,
  updatePkg
} from 'node-karin'

import { Render, Root } from '@/module'
import { getChangelogImage } from '@/module/utils/changelog'
import { Config } from '@/module/utils/Config'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { parseReleaseChannel, RELEASE_CHANNEL_LABEL } from '@/module/utils/releaseChannel'
import { isSemverGreater } from '@/module/utils/semver'

const UPDATE_LOCK_KEY = 'kkk:update:lock'
const UPDATE_MSGID_KEY = 'kkk:update:msgid'

/**
 * 定时更新检测处理器
 * 按订阅渠道检查远程版本（latest 恒参与 —— 装 prerelease 的用户也要收到转正提醒），
 * 候选取 semver 最大且大于本地者，渲染变更日志并私聊通知所有主人。
 *
 * @returns 是否继续后续任务
 */
const Handler = async () => {
  // if (process.env.NODE_ENV === 'development') {
  //   return true
  // }

  // 订阅渠道（config 默认 ['stable']）：latest 恒参与，beta/rc 按订阅
  const channels = Config.app.UpdateNotifyChannels?.length ? Config.app.UpdateNotifyChannels : ['stable']
  const tags = ['latest', ...channels.filter((c) => c !== 'stable')]

  const remotes = await Promise.all(
    tags.map(async (tag) => {
      try {
        return (await getRemotePkgVersion(Root.pluginName, tag)) || null
      } catch {
        return null
      }
    })
  )
  const remote = [...new Set(remotes.filter((v): v is string => !!v))]
    .filter((v) => isSemverGreater(v, Root.pluginVersion))
    .sort((a, b) => (isSemverGreater(b, a) ? 1 : -1))[0]
  if (!remote) return true

  // 版本提醒锁（检查是否已经推送过相同或更高版本的更新通知）
  try {
    const lockedVersion = await db.get(UPDATE_LOCK_KEY)
    if (typeof lockedVersion === 'string' && lockedVersion.length > 0) {
      // 本地版本达到或超过锁定版本 => 解锁
      if (!isSemverGreater(lockedVersion, Root.pluginVersion)) {
        await db.del(UPDATE_LOCK_KEY)
      } else if (!isSemverGreater(remote, lockedVersion)) {
        // 远程版本不比锁定版本新，跳过本次提醒
        return true
      }
    }
  } catch {}

  // 设置锁为当前远程版本，确保只推送一次
  try {
    await db.set(UPDATE_LOCK_KEY, remote)
  } catch {}

  const masters = config.master().filter((id) => id !== 'console')
  if (masters.length === 0) return true

  const botItems = karin.getAllBotList().filter((b) => b.bot.account.name !== 'console')
  if (botItems.length === 0) return true

  // 预取好友列表（并发）
  const friendsMap = new Map<string, Array<{ userId: string }>>()
  await Promise.all(
    botItems.map(async (item) => {
      try {
        const list = await item.bot.getFriendList()
        friendsMap.set(item.bot.account.selfId, list || [])
      } catch {}
    })
  )

  // 为每个主人选择可用 Bot（好友命中）
  const masterToBot = new Map<string, (typeof botItems)[number]['bot']>()
  for (const owner of masters) {
    const matched = botItems.find((it) => (friendsMap.get(it.bot.account.selfId) || []).some((f) => f.userId === owner))
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
      remoteVersion: remote,
      Tip: true
    })
    if (img && img.length > 0) {
      botToImage.set(item.bot.account.selfId, [segment.text('karin-plugin-kkk 有新的更新！'), ...img])
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
    } catch {}
  }
  return true
}

const handleUpdateHook = wrapWithErrorHandler(
  async (e: Message) => {
    e.reply('开始更新 karin-plugin-kkk ...', { reply: true })
    const upd = await checkPkgUpdate(Root.pluginName, { compare: 'semver' })
    if (upd.status === 'yes') {
      const result = await updatePkg(Root.pluginName)
      if (result.status === 'ok') {
        const msgResult = await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)
        if (msgResult.messageId) {
          try {
            await db.del(UPDATE_MSGID_KEY)
            await db.del(UPDATE_LOCK_KEY)
          } catch {}
        }
        await restart(e.selfId, e.contact, msgResult.messageId)
      } else {
        e.reply(`${Root.pluginName} 更新失败: ${result.data ?? '更新执行失败'}`)
      }
    } else if (upd.status === 'no') {
      e.reply('未检测到可更新版本。')
    } else {
      e.reply(`${Root.pluginName} 更新失败: ${upd.error?.message ?? String(upd.error)}`)
    }
  },
  {
    businessName: '更新Hook'
  }
)

export const kkkUpdate = hooks.message.friend(
  async (e, next) => {
    if (e.msg.includes('更新')) {
      const msgId = (await db.get(UPDATE_MSGID_KEY)) as string
      if (e.replyId === msgId) {
        await handleUpdateHook(e)
      }
    }
    next()
  },
  { priority: 100 }
)

/** 解析 #kkk更新 的可选参数：缺省/stable=正式版，beta/rc=渠道 tag，其余识别为版本号 */
const parseUpdateArg = (
  arg?: string
): { type: 'latest' } | { type: 'tag'; tag: 'beta' | 'rc' } | { type: 'version'; version: string } | { type: 'unknown' } => {
  if (!arg) return { type: 'latest' }
  if (arg === 'stable' || arg === 'latest') return { type: 'latest' }
  if (arg === 'beta' || arg === 'rc') return { type: 'tag', tag: arg }
  if (/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(arg)) return { type: 'version', version: arg }
  return { type: 'unknown' }
}

/** 解析目标版本号：latest / 渠道 tag 取对应 dist-tag，指定版本号校验存在性 */
const resolveUpdateTarget = async (
  parsed: ReturnType<typeof parseUpdateArg>
): Promise<{ version: string; tag: string } | { error: string }> => {
  if (parsed.type === 'latest') {
    const version = await getRemotePkgVersion(Root.pluginName).catch(() => '')
    return version ? { version, tag: 'latest' } : { error: '获取远程版本失败' }
  }
  if (parsed.type === 'tag') {
    const version = await getRemotePkgVersion(Root.pluginName, parsed.tag).catch(() => '')
    return version ? { version, tag: parsed.tag } : { error: `渠道 ${parsed.tag} 暂无可用版本` }
  }
  if (parsed.type === 'version') {
    // 校验该版本在 registry 上存在
    const { status, stdout } = await exec(`npm view ${Root.pluginName}@${parsed.version} version`)
    const found = status ? stdout.toString().trim() : ''
    return found ? { version: found, tag: '' } : { error: `版本 ${parsed.version} 不存在` }
  }
  return { error: '未识别的渠道或版本' }
}

/** 安装指定版本并重启（含降级；调用前必须已完成二次确认） */
const installAndRestart = async (e: Message, version: string) => {
  await e.reply(`开始更新 karin-plugin-kkk → ${version} ......`, { reply: true })
  const { error } = await exec(`pnpm up ${Root.pluginName}@${version}`)
  if (error) {
    e.reply(`${Root.pluginName} 更新失败: ${error}`, { reply: true })
    return
  }
  const installed = await getPkgVersion(Root.pluginName)
  if (installed !== version) {
    e.reply(`更新失败：安装后版本为 ${installed}，预期 ${version}。可尝试手动执行 pnpm up ${Root.pluginName}@${version}`, { reply: true })
    return
  }
  const msgResult = await e.reply(`${Root.pluginName} 更新成功！→ ${version}\n开始执行重启......`)
  if (msgResult.messageId) {
    try {
      await db.del(UPDATE_MSGID_KEY)
      await db.del(UPDATE_LOCK_KEY)
    } catch {}
  }
  await restart(e.selfId, e.contact, msgResult.messageId)
}

/** 渲染 #kkk更新 用法面板（含各渠道可用版本） */
const getUpdateHelpImage = async (e: Message) => {
  const channelDefs = [
    { label: '正式版', tag: 'latest', command: '#kkk更新' },
    { label: '测试版', tag: 'beta', command: '#kkk更新beta' },
    { label: '预览版', tag: 'rc', command: '#kkk更新rc' }
  ]
  const channels = await Promise.all(
    channelDefs.map(async (def) => {
      const version = await getRemotePkgVersion(Root.pluginName, def.tag).catch(() => '')
      return {
        ...def,
        version,
        available: !!version,
        hasUpdate: !!version && isSemverGreater(version, Root.pluginVersion)
      }
    })
  )
  const data: UpdateHelpData = {
    currentVersion: Root.pluginVersion,
    currentChannel: RELEASE_CHANNEL_LABEL[parseReleaseChannel(Root.pluginVersion)],
    channels
  }
  return await Render(e, 'other/updateHelp', data)
}

const handleKkkUpdate = wrapWithErrorHandler(
  async (e: Message) => {
    const arg = /^#?kkk更新(?:\s*(\S+))?$/.exec(e.msg)?.[1]
    const parsed = parseUpdateArg(arg)
    if (parsed.type === 'unknown') {
      const img = await getUpdateHelpImage(e).catch(() => null)
      if (img && img.length > 0) {
        e.reply(img, { reply: true })
      } else {
        e.reply('渲染更新面板失败。用法：#kkk更新 | #kkk更新beta | #kkk更新rc | #kkk更新<版本号>', { reply: true })
      }
      return
    }

    const resolved = await resolveUpdateTarget(parsed)
    if ('error' in resolved) {
      e.reply(resolved.error, { reply: true })
      return
    }
    const { version: remote } = resolved
    const local = Root.pluginVersion

    if (remote === local) {
      e.reply(`当前已是该版本：${local}`, { reply: true })
      return
    }

    if (!isSemverGreater(remote, local)) {
      // 降级更新：单线程 main 模型下旧版本会覆盖新代码，必须二次确认
      e.reply(
        [
          `⚠️ 检测到降级更新：当前 ${local} → 目标 ${remote}`,
          '降级可能带来配置或数据兼容问题，请确认你知道自己在做什么。',
          '回复「确认」继续更新，回复其他内容放弃（2 分钟内有效）。'
        ].join('\n'),
        { reply: true }
      )
      const confirmCtx = await karin.ctx(e, { time: 120, reply: true, throwOnTimeout: false })
      if (!confirmCtx) return
      if (confirmCtx.msg.trim() !== '确认') {
        e.reply('已放弃降级更新。', { reply: true })
        return
      }
      await installAndRestart(e, remote)
      return
    }

    const ChangeLogImg = await getChangelogImage(e, {
      localVersion: local,
      remoteVersion: remote,
      Tip: false,
      isRemote: true
    })
    if (ChangeLogImg) {
      e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true })
    } else {
      e.reply('获取更新日志失败，更新进程继续......', { reply: true })
    }

    await installAndRestart(e, remote)
  },
  {
    businessName: 'KKK更新'
  }
)

export const kkkUpdateCommand = karin.command(/^#?kkk更新(?:\s*(\S+))?$/, handleKkkUpdate, { name: 'kkk-更新', perm: 'master' })

export const kkkUpdateTest =
  process.env.NODE_ENV === 'development' &&
  karin.command(
    'test',
    async (_e: Message, next) => {
      await db.del(UPDATE_MSGID_KEY)
      await db.del(UPDATE_LOCK_KEY)
      await Handler()
      next()
    },
    { name: 'kkk-更新检测-测试' }
  )

export const update = karin.task('kkk-更新检测', '*/3 * * * *', Handler, {
  name: 'kkk-更新检测',
  log: false
})
