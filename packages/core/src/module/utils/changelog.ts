import fs from 'node:fs'
import path from 'node:path'

import { markdown } from '@karinjs/md-html'
import { karinPathTemp, mkdirSync, range, render } from 'node-karin'
import axios from 'node-karin/axios'

import { baseHeaders, Common, Render, Root } from '@/module'

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

/**
 * 获取变更日志图片
 * @param localVersion 本地版本字符串
 * @param remoteVersion 远程版本字符串
 * @returns 变更日志图片base64字符串
 */
export const getChangelogImage = async (localVersion: string, remoteVersion: string) => {
  const urls = [
    // 国内镜像（优先）
    `https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    `https://npm.onmicrosoft.cn/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    // 国内代理
    `https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    `https://npm.onmicrosoft.cn/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    // 海外源
    `https://cdn.jsdelivr.net/npm/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    `https://fastly.jsdelivr.net/npm/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    `https://unpkg.com/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    // GitHub Raw 代理
    `https://jiashu.1win.eu.org/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${remoteVersion}/packages/core/CHANGELOG.md`
  ]

  // 并发竞速
  let changelog = ''
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

  const forwardLogs = range(changelog, versionCore(localVersion), versionCore(remoteVersion))
  const html = markdown(forwardLogs, {
    gitcss: Common.useDarkTheme() ? 'github-markdown-dark.css' : 'github-markdown-light.css',
    scale: 5,
    customCSSFiles: [Root.pluginPath + '/resources/font/font.css'],
    fontFamily: 'HarmonyOSHans-Regular'
  })
  fs.writeFileSync(path.join(process.cwd(), '1.html'), html)
  mkdirSync(`${karinPathTemp}/html/${Root.pluginName}/version`)
  const htmlPath = `${karinPathTemp}/html/${Root.pluginName}/version/version.html`
  fs.writeFileSync(htmlPath, html)
  const base64 = await render.renderHtml(htmlPath)
  const img = await Render('other/changelog', {
    changeLogImg: `data:image/png;base64,${base64}`
  })
  return img || null
}