import fs from 'node:fs'

import { launch } from '@karinjs/puppeteer'
import type { Page } from '@karinjs/puppeteer/puppeteer-core'
import { handler, logger, Message, segment } from 'node-karin'

import { Common, Config } from '@/module'

export const douyinLogin = async (e: Message) => {
  const hal = await handler.call('kkk.douyinLogin', { e })
  if (hal) return true
  const msg_id: string[] = []
  const message1 = await e.reply('免责声明:\n您将通过扫码完成获取抖音网页端的用户登录凭证（ck），该ck将用于请求抖音WEB API接口。\n本Bot不会保存您的登录状态。\n我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~')
  try {
    // 环境检查
    // startXvfb()
    const { browser, close } = await launch({
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled', // 禁用自动化控制
        '--window-position=-10000,-10000', // 将窗口移到屏幕外
        '--start-minimized', // 启动时最小化
        '--mute-audio', // 静音
        '--no-sandbox'  // 使用无沙箱模式，适合无桌面环境
      ]
    })

    const page = await browser.newPage()
    await page.goto('https://www.douyin.com', { timeout: 120000 })

    const timeout = new Promise((resolve) => setTimeout(async () => {
      await browser.close() // 超时后关闭浏览器
    }, 120000))

    const qrCodePromise = (async () => {
      try {
        // 获取 img 的 src 属性内容
        const qrCodeBase64 = await waitQrcode(page)
        // 移除 base64 前缀，提取实际数据
        const base64Data = qrCodeBase64 ? qrCodeBase64.replace(/^data:image\/\w+;base64,/, '') : ''
        // 将 base64 转换为 Buffer 并保存为文件
        const buffer = Buffer.from(base64Data, 'base64')
        fs.writeFileSync(`${Common.tempDri.default}DouyinLoginQrcode.png`, buffer)

        const message2 = await e.reply([segment.image('base64://' + base64Data), segment.text('请在120秒内通过抖音APP扫码进行登录')], { reply: true })
        msg_id.push(message2.messageId, message1.messageId)

        await new Promise(resolve => {
          const timer = setTimeout(() => {
            resolve(false)
          }, 120 * 1000)

          page.on('response', async (response) => {
            if (response.status() === 302) {
              clearTimeout(timer)

              // 获取本地的 cookie
              const cookies = await browser.cookies()
              const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
              Config.Modify('cookies', 'douyin', cookieString)
              await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true })
              resolve(true)

              await close()
              await Promise.all(msg_id.map(async (id) => {
                await e.bot.recallMsg(e.contact, id)
              }))
            }
          })
        })
      } catch (error) {
        await browser.close()
        // 批量撤回
        await Promise.all(msg_id.map(async (id) => {
          await e.bot.recallMsg(e.contact, id)
        }))
        await e.reply('登录超时！二维码已失效！', { reply: true })
        logger.error(error)
      }
    })()

    // 同时等待二维码加载和超时事件，先完成的先执行
    await Promise.race([qrCodePromise, timeout])
  } catch (error: any) {
    logger.error(error)
    if (error.message.includes('npx playwright install')) {
      const msg = await e.reply('首次使用，正在初始化 puppeteer 环境，请稍等片刻...')
      await e.reply(`请确保已正确安装 puppeteer 依赖，请再次发送「${e.msg}」`)
      await e.bot.recallMsg(e.contact, msg.messageId)
      return true
    } else {
      await e.reply('浏览器环境初始化失败，请查看控制台错误日志', { reply: true })
    }
  }
  return true
}

/**
 * 等待二维码出现并获取二维码信息
 * @param page puppeteer的页面对象
 * @returns 二维码的base64数据
 */
const waitQrcode = async (page: Page) => {
  const qrCodeSelector = 'img[aria-label="二维码"]'
  try {
    await page.waitForSelector(qrCodeSelector, { timeout: 10000 })
  } catch (error) {
    // 截个图
    await page.screenshot({ path: `DouyinLoginQrcode.png` })
  }
  console.log('二维码加载完成')
  await new Promise(resolve => setTimeout(resolve, 5000))
  const images = await page.$$eval('img', (imgs) => {
    return imgs.map(img => ({
      src: img.src,
      ariaLabel: img.getAttribute('aria-label')
    }))
  })

  const qrCodeImages = images.filter(img => img.ariaLabel === '二维码')
  if (qrCodeImages.length === 0) {
    throw new Error('未找到二维码')
  }
  return qrCodeImages[0].src
}
