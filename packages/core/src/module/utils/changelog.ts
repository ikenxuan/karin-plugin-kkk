import fs from 'node:fs'

import { markdown } from '@karinjs/md-html'
import { karinPathTemp, mkdirSync, range, render } from 'node-karin'
import axios from 'node-karin/axios'

import { Common, Render, Root } from '@/module'

import { Config } from './Config'

/**
 * 获取变更日志图片
 * @param localVersion 本地版本字符串
 * @param remoteVersion 远程版本字符串
 * @returns 变更日志图片base64字符串
 */
export const getChangelogImage = async (localVersion: string, remoteVersion: string) => {
  const urls = [
    `https://cdn.jsdelivr.net/npm/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`,
    `https://unpkg.com/${Root.pluginName}@${remoteVersion}/CHANGELOG.md`
  ]
  let changelog = ''
  for (const url of urls) {
    try {
      const res = await axios.get(url, { timeout: 10000 })
      if (typeof res.data === 'string' && res.data.length > 0) {
        changelog = res.data
        break
      }
    } catch { }
  }
  if (!changelog) return null

  const forwardLogs = range(changelog, localVersion, remoteVersion)
  const html = markdown(forwardLogs, {
    gitcss: Common.useDarkTheme() ? 'github-markdown-dark.css' : 'github-markdown-light.css',
    scale: 5,
    customCSSFiles: [Root.pluginPath + '/resources/font/font.css'],
    fontFamily: 'HarmonyOSHans-Regular'
  })
  mkdirSync(`${karinPathTemp}/html/${Root.pluginName}/version`)
  const htmlPath = `${karinPathTemp}/html/${Root.pluginName}/version/version.html`
  fs.writeFileSync(htmlPath, html)
  const base64 = await render.render({
    file: htmlPath,
    multiPage: Config.app.multiPageRender ? Config.app.multiPageHeight : false,
    selector: '#container',
    fullPage: false,
    type: 'png',
    pageGotoParams: {
      waitUntil: 'load',
      timeout: Config.app.RenderWaitTime * 1000
    }
  })
  const img = await Render('other/changelog', {
    changeLogImg: `data:image/png;base64,${base64}`
  })
  return img || null
}