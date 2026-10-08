import type { UpdateChannelInfo, UpdateHelpData } from '@template/template/other/updateHelp/components/types'
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
import axios from 'node-karin/axios'

import { Render, Root } from '@/module'
import { getBuildMetadata } from '@/module/utils/build-metadata'
import { getChangelogImage } from '@/module/utils/changelog'
import { Config } from '@/module/utils/Config'
import { wrapWithErrorHandler } from '@/module/utils/ErrorHandler'
import { parseReleaseChannel, RELEASE_CHANNEL_LABEL } from '@/module/utils/releaseChannel'
import { isSemverGreater } from '@/module/utils/semver'

/** 更新提醒的订阅渠道（与面板 UpdateNotifyChannels 可选项一致） */
const UPDATE_CHANNELS = ['stable', 'beta', 'rc'] as const

/** 各渠道更新提醒锁：记录该渠道上次已推送的版本，检测到新版本推送一次后上锁 */
const updateLockKey = (channel: string) => `kkk:update:lock:${channel}`
/** 推送文本用的渠道中文名（UpdateNotifyChannels 的取值 → 展示标签） */
const UPDATE_CHANNEL_LABELS: Record<string, string> = { stable: '正式版', beta: '测试版', rc: '预览版' }

const UPDATE_MSGID_KEY = 'kkk:update:msgid'
/** 推送图对应的安装目标版本（引用回复推送图「更新」时安装它） */
const UPDATE_PUSHED_KEY = 'kkk:update:pushed'

/**
 * 定时更新检测处理器
 * 逐渠道检查远程 dist-tag 版本：检测到该渠道有新版本就推送一次然后上锁，
 * 各渠道锁相互独立、互不挤占；金丝雀安装按构建时间线判定新版本。
 *
 * @returns 是否继续后续任务
 */
const Handler = async () => {
  // if (process.env.NODE_ENV === 'development') {
  //   return true
  // }

  // 订阅渠道（config 默认 ['stable']）：每个渠道独立检测、独立上锁，
  // 检测到该渠道有新版本就推送一次然后上锁，互不挤占；stable 即 latest tag
  const channels = Config.app.UpdateNotifyChannels?.length ? Config.app.UpdateNotifyChannels : ['stable']
  const tagOf = (c: string) => (c === 'stable' ? 'latest' : c)

  // 金丝雀用户的时间线比较基准：本机构建时间与构建指纹（build-metadata）
  const installedIsCanary = parseReleaseChannel(Root.pluginVersion) === 'Canary'
  const build = getBuildMetadata()
  const installedBuildTime = build?.buildTimestamp

  // 逐渠道检测远程版本：非金丝雀用框架 checkPkgUpdate 按渠道 tag 检测（判定有更新
  // 才记录版本号）；金丝雀因 semver 的 ASCII 序（beta < canary）对跨标识比较无意义，
  // 仅取版本号、留待时间线判定
  const tagVersions = new Map<string, string | null>()
  await Promise.all(
    [...new Set(channels.map(tagOf))].map(async (tag) => {
      try {
        if (!installedIsCanary) {
          const upd = await checkPkgUpdate(Root.pluginName, { tag, compare: 'semver' })
          tagVersions.set(tag, upd.status === 'yes' ? upd.remote : null)
        } else {
          tagVersions.set(tag, (await getRemotePkgVersion(Root.pluginName, tag)) || null)
        }
      } catch {
        tagVersions.set(tag, null)
      }
    })
  )

  // 金丝雀用户：semver 的 ASCII 序（beta < canary）对跨渠道比较无意义，
  // 新版本判定与面板同款改按构建时间线——渠道发布节点晚于本机构建时间即为新版本；
  // 找不到发布节点时回退 semver 比较
  const canaryInfo = installedIsCanary ? await fetchCanaryInfo() : null
  const isNewVersion = (version: string): boolean => {
    if (installedIsCanary && installedBuildTime !== undefined) {
      const releaseNode = canaryInfo?.nodes.find((n) => n.message.includes(version))
      if (releaseNode) return releaseNode.time > installedBuildTime
    }
    return isSemverGreater(version, Root.pluginVersion)
  }

  // 逐渠道判定并上锁：该渠道有新版本且未曾推送过 → 记为待推送并写入该渠道的锁
  // （锁在发送前写入，渲染/发送失败也不会反复重推同一版本）
  const versionChannels = new Map<string, string[]>()
  for (const channel of channels) {
    const version = tagVersions.get(tagOf(channel)) ?? null
    if (!version || !isNewVersion(version)) continue
    try {
      const locked = await db.get(updateLockKey(channel))
      if (typeof locked === 'string' && locked === version) continue
      await db.set(updateLockKey(channel), version)
    } catch {}
    versionChannels.set(version, [...(versionChannels.get(version) ?? []), channel])
  }
  if (versionChannels.size === 0) return true

  // 引用回复推送图「更新」时的安装目标：多渠道同时待推送时取 semver 最大者
  const installTarget = [...versionChannels.keys()].sort((a, b) => (isSemverGreater(b, a) ? 1 : -1))[0]

  // 金丝雀用户：stable/beta/rc 发布的是同一条 main 的快照，stable 转正条目还全量
  // 归纳了整条版本线 —— 逐渠道各推一张图会把同一批变更重复多遍。只渲染 semver 最大
  // 的待推送版本（其变更日志覆盖其余渠道内容）；各渠道锁已按版本写好，不会被重推
  const rendered = installedIsCanary && versionChannels.size > 1 ? [installTarget] : [...versionChannels.keys()]

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

  // 分组渲染：每个 Bot 渲染一次；多个渠道同时有待推送版本时逐版本拼接
  const botToImage = new Map<string, Array<ReturnType<typeof segment.image> | ReturnType<typeof segment.text>>>()
  for (const item of botItems) {
    // 仅在该 Bot 存在主人匹配时渲染
    const hasOwners = Array.from(masterToBot.entries()).some(([, b]) => b.account.selfId === item.bot.account.selfId)
    if (!hasOwners) continue
    // 推送文本标注渠道与版本：多渠道订阅时不用点开图片即可区分是哪条渠道的更新
    const describe = (version: string): string => {
      const labels = (versionChannels.get(version) ?? []).map((c) => UPDATE_CHANNEL_LABELS[c] ?? c).join('/')
      return labels ? `${labels} ${version}` : version
    }
    const elements: Array<ReturnType<typeof segment.image> | ReturnType<typeof segment.text>> = [
      segment.text(`karin-plugin-kkk 更新提醒 · ${rendered.map(describe).join(' / ')}`)
    ]
    for (const version of rendered) {
      const img = await getChangelogImage({ bot: item.bot } as Message, {
        localVersion: Root.pluginVersion,
        remoteVersion: version,
        Tip: true
      })
      if (img && img.length > 0) elements.push(...img)
    }
    if (elements.length > 1) botToImage.set(item.bot.account.selfId, elements)
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
      await db.set(UPDATE_PUSHED_KEY, installTarget)
    } catch {}
  }
  return true
}

const handleUpdateHook = wrapWithErrorHandler(
  async (e: Message) => {
    // 引用回复推送图：直接安装推送时记录的版本 —— 框架 checkPkgUpdate 即便支持
    // tag 也覆盖不了金丝雀安装（semver 的 ASCII 序恒判「无更新」），且回复图
    // 对应的具体版本以推送时的记录为准
    const pushedVersion = await db.get(UPDATE_PUSHED_KEY)
    if (typeof pushedVersion === 'string' && pushedVersion) {
      await installAndRestart(e, pushedVersion)
      return
    }
    e.reply('开始更新 karin-plugin-kkk ...', { reply: true })
    const upd = await checkPkgUpdate(Root.pluginName, { compare: 'semver' })
    if (upd.status === 'yes') {
      const result = await updatePkg(Root.pluginName)
      if (result.status === 'ok') {
        const msgResult = await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)
        if (msgResult.messageId) {
          try {
            await db.del(UPDATE_MSGID_KEY)
            await db.del(UPDATE_PUSHED_KEY)
            for (const ch of UPDATE_CHANNELS) {
              await db.del(updateLockKey(ch))
            }
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
      await db.del(UPDATE_PUSHED_KEY)
      for (const ch of UPDATE_CHANNELS) {
        await db.del(updateLockKey(ch))
      }
    } catch {}
  }
  await restart(e.selfId, e.contact, msgResult.messageId)
}

/** pkg.pr.new 仓库（金丝雀数据源，只跟踪 main 分支构建） */
const PKG_PR_NEW_REPO = 'ikenxuan/karin-plugin-kkk'

/** 拉取 pkg.pr.new 上 main 分支的最新金丝雀构建（失败返回 null，由调用方降级展示） */
interface CanaryNode {
  sha: string
  time: number
  message: string
}

interface CanaryInfo {
  channel: UpdateChannelInfo
  nodes: CanaryNode[]
}

/** 拉取 pkg.pr.new 的发布历史与 main 分支最新构建（失败返回 null，由调用方降级展示） */
const fetchCanaryInfo = async (): Promise<CanaryInfo | null> => {
  try {
    const [owner, repo] = PKG_PR_NEW_REPO.split('/')
    const res = await axios.get(`https://pkg.pr.new/api/repo/commits?owner=${owner}&repo=${repo}`, { timeout: 10000 })
    const nodes = res.data?.target?.history?.nodes as
      | Array<{
          branch?: string | null
          abbreviatedOid?: string
          authoredDate?: string
          message?: string
          statusCheckRollup?: { contexts?: { nodes?: Array<{ packages?: Array<{ installUrl?: string }> }> } }
        }>
      | undefined
    if (!Array.isArray(nodes)) return null

    const history: CanaryNode[] = nodes.map((n) => ({
      sha: (n.abbreviatedOid ?? '').slice(0, 7),
      time: n.authoredDate ? new Date(n.authoredDate).getTime() : 0,
      message: n.message ?? ''
    }))

    const mainNode = nodes.find(
      (n) => n.branch === 'main' && n.statusCheckRollup?.contexts?.nodes?.some((c) => c.packages?.some((pkg) => pkg.installUrl))
    )
    const pkg = mainNode?.statusCheckRollup?.contexts?.nodes?.flatMap((c) => c.packages ?? []).find((p) => p.installUrl)
    if (!mainNode?.abbreviatedOid || !pkg?.installUrl) return null

    return {
      channel: {
        label: '金丝雀',
        tag: 'pkg.pr.new · main',
        status: 'canary',
        version: mainNode.abbreviatedOid.slice(0, 7),
        installCommand: `pnpm add ${pkg.installUrl} -w`,
        publishedAt: mainNode.authoredDate
      },
      nodes: history
    }
  } catch {
    return null
  }
}

/** 渲染 #kkk更新 用法面板（含各渠道可用版本） */
const getUpdateHelpImage = async (e: Message) => {
  // 单次查询全部 dist-tags：既能拿到各渠道版本，也能区分「渠道不存在」与「查询失败」
  const { status, stdout } = await exec(`npm view ${Root.pluginName} dist-tags --json`)
  let distTags: Record<string, string> = {}
  if (status) {
    try {
      distTags = JSON.parse(stdout.toString())
    } catch {}
  }

  // 金丝雀：pkg.pr.new 发布历史（含各 main 构建的 sha 与时间），失败降级为 error 行
  const canaryInfo = await fetchCanaryInfo()

  // 金丝雀用户的时间线比较基准：本机构建时间与构建指纹（build-metadata）
  const installedIsCanary = parseReleaseChannel(Root.pluginVersion) === 'Canary'
  const build = getBuildMetadata()
  const installedBuildTime = build?.buildTimestamp

  // 渠道按稳定度排序：rc 最接近正式版，排在 beta 之前
  const channels: UpdateHelpData['channels'] = [
    { label: '正式版', tag: 'latest', command: '#kkk更新' },
    { label: '预览版', tag: 'rc', command: '#kkk更新rc' },
    { label: '测试版', tag: 'beta', command: '#kkk更新beta' }
  ].map((def) => {
    if (!status) return { ...def, status: 'error' as const }
    const version = distTags[def.tag]
    if (!version) return { ...def, status: 'missing' as const }

    // 金丝雀用户：semver 的 ASCII 序（beta < canary）对跨渠道比较无意义，
    // 改按构建时间线——渠道的发布节点（release 提交）晚于本机构建时间即为有新版本；
    // 找不到发布节点（如历史遗留 tag）时回退 semver 比较
    if (installedIsCanary && installedBuildTime !== undefined) {
      const releaseNode = canaryInfo?.nodes.find((n) => n.message.includes(version))
      if (releaseNode) {
        return { ...def, status: 'ok' as const, version, hasUpdate: releaseNode.time > installedBuildTime }
      }
    }
    return { ...def, status: 'ok' as const, version, hasUpdate: isSemverGreater(version, Root.pluginVersion) }
  })

  // 金丝雀行：最新 main 构建；canary 用户比对本机构建指纹判定有无新构建
  const canaryChannel = canaryInfo?.channel ?? { label: '金丝雀', tag: 'pkg.pr.new · main', status: 'error' as const }
  // 指纹比较归一化到 7 位：git rev-parse --short 在歧义时会扩展到 8 位，
  // 而 pkg.pr.new API 固定 7 位——不归一会出现同构建误判「有新构建」
  const installedSha = (build?.shortCommitHash ?? '').slice(0, 7)
  // 指纹比对不限于金丝雀安装：tag 构建同样携带 build-metadata（如 beta.6 构建于
  // bd1cf9b，与 main 最新构建同源提交）→ 置灰；本机无构建指纹时保持信息展示
  if (canaryChannel.status === 'canary' && installedSha) {
    canaryChannel.hasUpdate = installedSha !== canaryChannel.version
  }
  channels.push(canaryChannel)

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
      await db.del(UPDATE_PUSHED_KEY)
      for (const ch of UPDATE_CHANNELS) {
        await db.del(updateLockKey(ch))
      }
      await Handler()
      next()
    },
    { name: 'kkk-更新检测-测试' }
  )

export const update = karin.task('kkk-更新检测', '*/3 * * * *', Handler, {
  name: 'kkk-更新检测',
  log: false
})
