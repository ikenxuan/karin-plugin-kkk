import { join } from 'node:path'

import { ImageElementType, Options, render, segment } from 'node-karin'

import { Common, Config, Version } from '@/module'

function scale (pct = 1): string {
  const scale = Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100))
  pct = pct * scale
  return `style=transform:scale(${pct})`
}

/**
 *
 * @param {string} path html模板路径
 * @param {*} params 模板参数
 * @returns
 */
export async function Render (path: string, params?: any) {
  const basePaths: Record<string, string> = {
    douyin: 'douyin/html',
    bilibili: 'bilibili/html',
    admin: 'admin/html',
    kuaishou: 'kuaishou/html',
    help: 'help/html'
  }
  const platform = Object.keys(basePaths).find(key => path.startsWith(key))!
  let newPath = path.substring(platform.length)
  // 如果 newPath 以斜杠开头，去掉这个斜杠
  if (newPath.startsWith('/')) {
    newPath = newPath.substring(1)
  }
  path = `${basePaths[platform]}/${newPath}`
  const renderOpt: Options = {
    pageGotoParams: {
      waitUntil: 'load'
    },
    name: `${Version.pluginName}/${platform}/${newPath}/`.replace(/\\/g, '/'),
    file: `${Version.pluginPath}/resources/template/${path}.html`,
    type: 'jpeg'
  }

  const img = await render.render({
    ...renderOpt,
    multiPage: 12000,
    encoding: 'base64',
    data: {
      ...params,
      _res_path: (join(Version.pluginPath, '/resources') + '/').replace(/\\/g, '/'),
      _layout_path: (join(Version.pluginPath, '/resources', 'template', 'extend') + '/').replace(/\\/g, '/'),
      defaultLayout: (join(Version.pluginPath, '/resources', 'template', 'extend', 'html') + '/default.html').replace(/\\/g, '/'),
      sys: {
        scale: scale(params?.scale || 1)
      },
      pluResPath: `${Version.pluginPath}/resources/`,
      copyright: `<span class="name">kkk</span><span class="version">${Version.pluginVersion} Preview</span> Powered By <span class="name">Karin</span>`,
      useDarkTheme: Common.useDarkTheme()
    },
    screensEval: '#container'
  })
  // 分片截图传回来的是数组
  const ret: ImageElementType[] = []
  for (const imgae of img) {
    ret.push(segment.image('base64://' + imgae))
  }
  return ret
}
