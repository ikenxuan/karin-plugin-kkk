import express from 'node-karin/express'

import { resolveBrowserBaseUrl, takeCaptchaSession } from '@/module/utils/CaptchaSession'
import { Config } from '@/module/utils/Config'
import { reloadAmagiConfig } from '@/module/utils/amagiClient'
import { logger } from '@/module/utils/logger'

/**
 * 自托管人工验证路由。
 *
 * 抖音撞 TTGCaptcha 滑块（`subtype: 'slide'`）时纯程序化过不去，由
 * `DouyinRiskControl` 策略把挑战存成一次性会话并给用户一个验证页链接：
 * 用户在浏览器里完成真人滑块，页面把验证期间浏览器新种的可读 cookie
 * 上报回 `/done`，后端合并进 `Config.amagi.cookies.douyin` 并重载 client，
 * 提示用户重发原命令 —— 重放时带上新凭证即可过 WAF。
 *
 * 挂在 `/kkk` 前缀下：Karin 的鉴权中间件只覆盖 `/api/v1/*`，浏览器无 token
 * 也能直接打开验证页。
 */

/**
 * 把 `name=value; name2=value2` 的 cookie 串解析成字典。
 * 跳过 `=` 缺失或名为空的片段。
 */
const parseCookieString = (cookie: string): Record<string, string> => {
  const out: Record<string, string> = {}
  for (const pair of cookie.split(';')) {
    const eq = pair.indexOf('=')
    if (eq <= 0) continue
    const name = pair.slice(0, eq).trim()
    const value = pair.slice(eq + 1).trim()
    if (name) out[name] = value
  }
  return out
}

/**
 * 合并 cookie：字段级合并，`extra` 中同名项覆盖 `base`。
 * 验证页上报的新 cookie 与既有登录 cookie 冲突时，新凭证优先。
 */
const mergeCookieStrings = (base: string, extra: string): string => {
  const merged = parseCookieString(base)
  for (const [name, value] of Object.entries(parseCookieString(extra))) merged[name] = value
  return Object.entries(merged)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')
}

/**
 * 内联 JSON 防 `</script>` 截断：把 `<` 转义成 `\u003c`，JSON.stringify 的
 * 结果仍是合法 JSON，但不会提前闭合外层的 script 标签。
 */
const inlineJson = (value: unknown): string => JSON.stringify(value).replace(/</g, '\\u003c')

/**
 * 渲染自托管验证页。
 *
 * 结构与抖音官方中间页一致：加载官方 sec_sdk 的 `captcha/index.js`，
 * 用挑战里原样带出的完整 `verify_data` 调 `TTGCaptcha.init/render`。
 * `successCb` 不像官方那样 reload，而是把验证期间浏览器新种的可读 cookie
 * 上报回 `/done`，随后提示用户回到聊天窗口重发命令。
 */
const renderCaptchaPage = (session: { jsSdkUrl: string; verifyData: Record<string, unknown> }, doneUrl: string): string => {
  const verifyDataJson = inlineJson(session.verifyData)
  const doneUrlJson = inlineJson(doneUrl)

  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
<title>抖音人机验证</title>
<style>
  html, body { margin: 0; padding: 0; height: 100%; background: #f5f6f7; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; }
  #page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 24px; box-sizing: border-box; }
  #captcha { min-height: 120px; }
  #status { color: #666; font-size: 14px; text-align: center; }
  #tip { color: #999; font-size: 13px; text-align: center; }
</style>
</head>
<body>
  <div id="page">
    <div id="captcha"></div>
    <div id="status"></div>
    <div id="tip">请完成滑块验证，完成后回到聊天窗口重发原命令</div>
  </div>
  <script src="${session.jsSdkUrl}"></script>
  <script>
    function reportDone() {
      fetch(${doneUrlJson}, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookies: document.cookie || '', ts: Date.now() })
      })
        .then(function (r) { return r.json().catch(function () { return { message: '验证完成' } }) })
        .then(function (d) {
          var el = document.getElementById('status')
          if (el) el.textContent = (d && d.message) || '验证完成，请回到聊天窗口重发原命令'
          setTimeout(function () { try { window.close() } catch (e) {} }, 2000)
        })
        .catch(function () {
          var el = document.getElementById('status')
          if (el) el.textContent = '上报失败，请回到聊天窗口重试'
        })
    }
    window.TTGCaptcha.init({
      commonOptions: { aid: 339757, iid: '0', did: '0' },
      captchaOptions: {
        ele: 'captcha',
        hideCloseBtn: true,
        showMode: 'mask',
        successCb: function () { reportDone() }
      }
    })
    window.TTGCaptcha.render({ verify_data: ${verifyDataJson} })
  </script>
</body>
</html>`
}

const router = express.Router()

/** 验证页：GET /douyin/:token */
router.get('/douyin/:token', async (req, res) => {
  const session = takeCaptchaSession(req.params.token)
  if (!session) {
    res.status(404).type('html').send('<meta charset="utf-8"><h3>验证链接已失效或已被使用，请回到聊天窗口重新触发</h3>')
    return
  }

  const { jsSdkUrl, verifyData } = session.challenge
  if (!jsSdkUrl || !verifyData || typeof verifyData !== 'object') {
    logger.warn('[CaptchaRouter] 挑战缺少验证页必需信息（jsSdkUrl / verifyData），无法渲染')
    res.status(422).type('html').send('<meta charset="utf-8"><h3>验证页信息不完整，请稍后重试或检查日志</h3>')
    return
  }

  const baseUrl = await resolveBrowserBaseUrl()
  const doneUrl = `${baseUrl}/kkk/captcha/douyin/${req.params.token}/done`
  res.type('html').send(renderCaptchaPage({ jsSdkUrl, verifyData }, doneUrl))
})

/**
 * 验证完成回填：POST /douyin/:token/done
 *
 * body: `{ cookies?: string }` —— 验证期间浏览器新种的可读 cookie
 * （`document.cookie`）。后端与触发前的登录 cookie 合并后写回配置并
 * 重载 Amagi client，随后回话提示用户重发原命令。
 */
router.post('/douyin/:token/done', async (req, res) => {
  const session = takeCaptchaSession(req.params.token)
  if (!session) {
    res.status(404).json({ ok: false, message: '验证链接已失效或已被使用' })
    return
  }

  const body = (req.body ?? {}) as { cookies?: string }
  const extraCookies = typeof body.cookies === 'string' ? body.cookies.trim() : ''
  const mergedCookie = mergeCookieStrings(session.existingCookie, extraCookies)

  if (mergedCookie) {
    try {
      await Config.Modify('amagi', 'cookies.douyin', mergedCookie)
      reloadAmagiConfig()
      logger.mark('[CaptchaRouter] 抖音人机验证完成，cookie 已回填并重载 Amagi Client')
    } catch (error) {
      logger.error(`[CaptchaRouter] cookie 回填失败: ${error}`)
      res.status(500).json({ ok: false, message: 'cookie 回填失败，请查看服务端日志' })
      return
    }
  }

  try {
    await session.event.reply('✅ 抖音人机验证已完成，请重新发送原命令')
  } catch (error) {
    logger.debug(`[CaptchaRouter] 验证完成后回话失败: ${error}`)
  }

  res.json({ ok: true, message: '验证完成，请回到聊天窗口重发原命令' })
})

export const captchaRouter = router