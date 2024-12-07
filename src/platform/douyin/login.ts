import { execSync } from 'node:child_process'
import fs from 'node:fs'

import karin, { AdapterType, handler, logger, Message, segment } from 'node-karin'
import { chromium } from 'playwright'

import { Config, Version } from '@/module'

export const douyinLogin = async (e: Message) => {
  const hal = await handler.call('kkk.douyinLogin', { e })
  if (hal) return true
  const msg_id: string[] = []
  const message1 = await e.reply('免责声明:\n您将通过扫码完成获取抖音网页端的用户登录凭证（ck），该ck将用于请求抖音WEB API接口。\n本Bot不会保存您的登录状态。\n我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~')
  try {
    const browser = await chromium.launch({
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled', // 禁用自动化控制
        '--window-position=-10000,-10000', // 将窗口移到屏幕外
        '--start-minimized', // 启动时最小化
        '--mute-audio' // 静音
      ]
    })
    const page = await browser.newPage()

    await page.goto('https://www.douyin.com')

    // 等待二维码容器出现
    await page.waitForSelector('.web-login-scan-code__content__qrcode-wrapper', { timeout: 10000 })
    // 等待 img 元素加载并变得可见
    const qrcodeImage = await page.waitForSelector('.web-login-scan-code__content__qrcode-wrapper img', { timeout: 10000 })

    // 获取 img 的 src 属性内容
    const qrCodeBase64 = await qrcodeImage.getAttribute('src')
    // 移除 base64 前缀，提取实际数据
    const base64Data = qrCodeBase64 ? qrCodeBase64.replace(/^data:image\/\w+;base64,/, '') : ''

    // 将 base64 转换为 Buffer 并保存为文件
    const buffer = Buffer.from(base64Data, 'base64')
    fs.writeFileSync(`${Version.karinPath}/temp/${Version.pluginName}/DouyinLoginQrcode.png`, buffer)

    const message2 = await e.reply([segment.image('base64://' + base64Data), segment.text('请在120秒内通过抖音APP扫码进行登录')], { reply: true })
    msg_id.push(message2.message_id, message1.message_id)

    try {
      // 监听页面的 response 事件，捕捉包含 Set-Cookie 的 302 重定向响应
      page.on('response', async (response) => {
        if (response.status() === 302 && response.url().includes('/passport/sso/login/callback')) {
          // 获取本地的 cookie
          const localCookies = await page.context().cookies()
          const cookieString = localCookies.map(cookie => {
            return `${cookie.name}=${cookie.value}`
          }).join('; ')
          Config.modify('cookies', 'douyin', cookieString)
          await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true })
          // 关闭浏览器
          await browser.close()
          // 批量撤回
          await Promise.all(msg_id.map(async (id) => {
            await e.bot.recallMsg(e.contact, id)
          }))
        }
      })
    } catch (err) {
      await browser.close()
      // 批量撤回
      await Promise.all(msg_id.map(async (id) => {
        await e.bot.recallMsg(e.contact, id)
      }))
      await e.reply('登录超时！二维码已失效！', { reply: true })
      logger.error(err)
    }
  } catch (error: any) {
    const msg = await e.reply('首次使用，正在初始化 playwright 环境，请稍等片刻...')
    logger.error(error)
    if (error.message.includes('npx playwright install')) {
      execSync('npx playwright install chromium', { cwd: Version.pluginPath, stdio: 'inherit' })
      await e.reply(`playwright 初始化成功，请再次发送「${e.msg}」`)
      await e.bot.recallMsg(e.contact, msg.message_id)
      return true
    }
  }

  return true
}
