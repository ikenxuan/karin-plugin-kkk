import fs from 'node:fs'

import { Message, parseChangelog, range } from 'node-karin'
import axios from 'node-karin/axios'
import { ChangelogProps } from 'template/types/platforms/other/changelog'

import { baseHeaders, Render, Root } from '@/module'

import { formatBuildTime, getBuildMetadata } from './build-metadata'
import { isSemverGreater } from './semver'

/**
 * 规范化为 x.x.x（剔除 v 前缀、预发布、构建标识）
 * @param v 版本字符串
 * @returns 核心版本字符串
 */
const versionCore = (v: string): string => {
  v = v.trim()
  if (v.startsWith('v') || v.startsWith('V')) v = v.slice(1)
  const [preBuild] = v.split('+', 2)
  const [core] = preBuild.split('-', 2)
  return core
}

const getLagVersionCount = (changelog: string, localVersion: string, remoteVersion: string): number => {
  const local = versionCore(localVersion)
  const remote = versionCore(remoteVersion)

  if (!local || !remote || !isSemverGreater(remote, local)) return 0

  const versions = Object.keys(parseChangelog(changelog))
    .map(versionCore)
    .filter(Boolean)

  const uniqueVersions = [...new Set(versions)]
  return uniqueVersions.filter((version) => {
    const afterLocal = isSemverGreater(version, local)
    const notAfterRemote = !isSemverGreater(version, remote)
    return afterLocal && notAfterRemote
  }).length
}

/**
 * 获取远程构建元数据
 * @param version 远程版本号
 * @returns 构建元数据对象，如果获取失败则返回 null
 */
const getRemoteBuildMetadata = async (version: string) => {
  const urls = [
    // 国内镜像（优先）
    `https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${version}/lib/build-metadata.json`,
    `https://npm.onmicrosoft.cn/${Root.pluginName}@${version}/lib/build-metadata.json`,
    // 海外源
    `https://cdn.jsdelivr.net/npm/${Root.pluginName}@${version}/lib/build-metadata.json`,
    `https://fastly.jsdelivr.net/npm/${Root.pluginName}@${version}/lib/build-metadata.json`,
    `https://unpkg.com/${Root.pluginName}@${version}/lib/build-metadata.json`
  ]

  const requests = urls.map((url) =>
    axios.get(url, { timeout: 10000, headers: baseHeaders })
      .then((res) => {
        if (res.data && typeof res.data === 'object') {
          return res.data
        }
        throw new Error('Invalid metadata')
      })
  )

  try {
    const metadata = await Promise.any(requests)
    return metadata
  } catch {
    return null
  }
}

/**
 * 获取变更日志图片
 *
 * @param ctx - 渲染上下文，可传入消息事件或 Bot 实例
 * @param props - 获取变更日志图片选项
 * @param props.isRemote - 是否强制获取远程变更日志
 * @returns 变更日志图片元素数组（base64）
 */
export const getChangelogImage = async (
  ctx: Message,
  props: Omit<ChangelogProps['data'], 'markdown'> & { isRemote?: boolean }
) => {
  let changelog = ''
  let buildTime: string | undefined
  let lagVersionCount = 0
  const event = ('bot' in (ctx as any))
    ? (ctx as Message)
    : ({ bot: ctx } as unknown as Message)

  if (props.Tip || props.isRemote) {
    const urls = [
      // 国内代理
      `https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
      `https://npm.onmicrosoft.cn/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
      // 海外源
      `https://cdn.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
      `https://fastly.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
      `https://unpkg.com/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
      // GitHub Raw 代理
      `https://gh.llkk.cc/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://j.1lin.dpdns.org/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://tvv.tw/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://git.yylx.win/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://gitproxy.127731.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://ghm.078465.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://ghfile.geekertao.top/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://github.tbedu.top/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://j.1win.ggff.net/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://ghm.078465.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://ghm.078465.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
      `https://jiashu.1win.eu.org/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`
    ]

    // 并发竞速获取 CHANGELOG
    const requests = urls.map((url) =>
      axios.get(url, { timeout: 10000, headers: baseHeaders })
        .then((res) => {
          if (typeof res.data === 'string' && res.data.length > 0) {
            return res.data as string
          }
          throw new Error('Invalid changelog content')
        })
    )
    try {
      changelog = await Promise.any(requests)
    } catch {
      return null
    }
    if (!changelog) return null
    lagVersionCount = getLagVersionCount(changelog, props.localVersion, props.remoteVersion)

    // 获取远程构建元数据
    const remoteMeta = await getRemoteBuildMetadata(props.remoteVersion)
    if (remoteMeta?.buildTime) {
      buildTime = formatBuildTime(remoteMeta.buildTime)
    }

    changelog = range({
      data: changelog,
      startVersion: props.localVersion,
      endVersion: versionCore(props.remoteVersion),
      compare: 'semver'
    })
  } else {
    try {
      changelog = fs.readFileSync(Root.pluginPath + '/CHANGELOG.md', 'utf8')
      lagVersionCount = getLagVersionCount(changelog, props.localVersion, props.remoteVersion)
      changelog = range({
        data: changelog,
        startVersion: props.localVersion,
        endVersion: versionCore(props.remoteVersion),
        compare: 'semver'
      })
    } catch {
      return null
    }

    // 获取本地构建元数据
    const localMeta = getBuildMetadata()
    if (localMeta?.buildTime) {
      buildTime = formatBuildTime(localMeta.buildTime)
    }
  }

  const img = await Render(event, 'other/changelog', {
    markdown: changelog,
    Tip: props.Tip,
    localVersion: props.localVersion,
    remoteVersion: props.remoteVersion,
    lagVersionCount,
    buildTime
  })
  return img || null
}
