import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { isDocker, logs, type Message } from 'node-karin'
import type { RuntimeReportProps } from 'template/types/platforms/other/runtime'

import { Root } from '../../root'
import { formatBuildTime, getBuildMetadata } from './build-metadata'
import { Config } from './Config'
import { formatBytes } from './Network/helpers'

type RuntimeReportData = Omit<RuntimeReportProps['data'], 'useDarkTheme'>
type PluginPackageMetadata = typeof Root.pkg & {
  karin?: {
    engines?: string
  }
}

/**
 * 将秒数格式化为适合诊断海报展示的紧凑时长。
 *
 * @param seconds 原始秒数
 * @returns 例如 `2天 6小时 18分钟`
 */
const formatDuration = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '未知'

  const totalMinutes = Math.floor(seconds / 60)
  const days = Math.floor(totalMinutes / 1440)
  const hours = Math.floor((totalMinutes % 1440) / 60)
  const minutes = totalMinutes % 60

  if (days > 0) return `${days}天 ${hours}小时 ${minutes}分钟`
  if (hours > 0) return `${hours}小时 ${minutes}分钟`
  if (minutes > 0) return `${minutes}分钟`
  return `${Math.floor(seconds)}秒`
}

/**
 * 从随包发布的 CHANGELOG 中提取指定数量的本地版本记录。
 * 读取失败时返回空字符串，让调用方决定降级展示或抛出错误。
 *
 * @param length 需要提取的版本数量
 */
export const getLocalChangelog = (length: number): string => {
  try {
    const changelogPath = path.join(Root.pluginPath, 'CHANGELOG.md')
    const changelogContent = fs.readFileSync(changelogPath, 'utf8')
    return logs({
      version: Root.pluginVersion,
      data: changelogContent,
      length
    })
  } catch {
    return ''
  }
}

/**
 * 采集 `#kkk版本` 使用的安全运行环境快照。
 *
 * 不采集账号、主机名、用户目录、网络地址、环境变量内容、启动参数或适配器鉴权信息，
 * 保证该命令在群聊中触发时不会把机器身份和凭据写入图片。
 *
 * @param event 当前消息事件
 */
export const collectRuntimeReport = (event: Message): RuntimeReportData => {
  const packageMetadata = Root.pkg as PluginPackageMetadata
  const adapter = event.bot.adapter
  const cpus = os.cpus()
  const memory = process.memoryUsage()
  const totalMemory = os.totalmem()
  const usedMemory = Math.max(0, totalMemory - os.freemem())
  const buildMetadata = getBuildMetadata()
  const currentChangelog = getLocalChangelog(1)
  const renderScale = Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100))
  const buildState = !buildMetadata ? 'unavailable' : buildMetadata.version === Root.pluginVersion ? 'matched' : 'mismatched'

  return {
    snapshotAt: new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(new Date()),
    identity: {
      pluginName: Root.pluginName,
      pluginVersion: Root.pluginVersion,
      karinVersion: Root.karinVersion || '未知',
      releaseType: /^\d+\.\d+\.\d+$/.test(Root.pluginVersion) ? 'Stable' : 'Preview',
      requiredNodeVersion: packageMetadata.engines?.node ?? '未声明',
      requiredKarinVersion: packageMetadata.karin?.engines ?? packageMetadata.engines?.karin ?? '未声明'
    },
    build: {
      state: buildState,
      version: buildMetadata?.version,
      buildTime: buildMetadata?.buildTime ? formatBuildTime(buildMetadata.buildTime) : undefined,
      shortCommitHash: buildMetadata?.shortCommitHash
    },
    runtime: {
      nodeVersion: process.version,
      nodeEnv: process.env.NODE_ENV ?? '未设置',
      os: `${os.type()} ${os.release()}`,
      platform: os.platform(),
      arch: os.arch(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '未知',
      container: isDocker,
      systemUptime: formatDuration(os.uptime()),
      processUptime: formatDuration(process.uptime())
    },
    adapter: {
      name: adapter.name || '未知',
      version: adapter.version || '未知',
      platform: String(adapter.platform || '未知'),
      protocol: String(adapter.protocol || '未知'),
      standard: String(adapter.standard || '未知'),
      communication: String(adapter.communication || '未知'),
      connectedFor: formatDuration(Math.max(0, (Date.now() - adapter.connectTime) / 1000))
    },
    renderer: {
      scale: `${renderScale.toFixed(2)}x`,
      timeout: `${Config.app.RenderWaitTime}秒`,
      multiPage: Config.app.multiPageRender && adapter.protocol !== 'qqbot'
    },
    resources: {
      cpuModel: cpus[0]?.model?.trim() || '未知处理器',
      cpuCores: cpus.length,
      totalMemory: formatBytes(totalMemory),
      usedMemory: formatBytes(usedMemory),
      memoryUsagePercent: totalMemory > 0 ? `${((usedMemory / totalMemory) * 100).toFixed(1)}%` : '未知',
      processRss: formatBytes(memory.rss),
      heapUsed: formatBytes(memory.heapUsed)
    },
    releaseNotes: {
      markdown: currentChangelog,
      available: currentChangelog.length > 0
    }
  }
}
