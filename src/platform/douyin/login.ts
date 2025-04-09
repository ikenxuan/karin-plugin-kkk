import { execSync, spawn } from 'node:child_process'
import fs from 'node:fs'

import karin, { handler, logger, Message, segment } from 'node-karin'
import { chromium, Page } from 'playwright'

import { Common, Config, Version } from '@/module'

/** 动态启动 Xvfb */
const startXvfb = async () => {
  if (process.platform !== 'linux') return
  const DISPLAY_NUMBER = ':150' // 指定唯一的 DISPLAY 编号
  const LOCK_FILE = '/tmp/.X150-lock'

  // ps aux | grep Xvfb
  // kill -9 PID
  // 检查当前是否有指定的 DISPLAY 环境正在运行
  try {
    execSync(`xdpyinfo -display ${DISPLAY_NUMBER}`, { stdio: 'ignore' })
    logger.debug(`检测到 DISPLAY ${DISPLAY_NUMBER} 已经在运行，无需启动新的 Xvfb。`)
    return // 如果 DISPLAY 已经存在，则直接返回，不再启动 Xvfb
  } catch (err) {
    logger.debug(logger.red(`未检测到 DISPLAY ${DISPLAY_NUMBER}，尝试启动 Xvfb...`))
  }

  // 如果没有显示环境，启动 Xvfb
  // 检查并清理锁文件
  if (fs.existsSync(LOCK_FILE)) {
    logger.debug(logger.red(`检测到锁文件 ${LOCK_FILE}，可能存在冲突。尝试清理...`))
    try {
      fs.unlinkSync(LOCK_FILE)
      logger.debug(`成功清理锁文件 ${LOCK_FILE}`)
    } catch (err) {
      logger.debug(logger.red(`无法清理锁文件 ${LOCK_FILE}，请检查权限或手动处理。`))
      throw err
    }
  }

  // 启动 Xvfb
  const xvfb = spawn('Xvfb', [DISPLAY_NUMBER, '-ac', '-screen', '0', '1280x1024x24'], {
    stdio: 'inherit'
  })
  xvfb.unref()
  process.env.DISPLAY = DISPLAY_NUMBER // 设置固定的 DISPLAY 编号

  // 等待 Xvfb 启动并确认 DISPLAY 可用
  let retries = 5
  while (retries > 0) {
    try {
      execSync(`xdpyinfo -display ${DISPLAY_NUMBER}`, { stdio: 'ignore' })
      logger.debug(`Xvfb (${DISPLAY_NUMBER}) 启动成功`)
      return // 启动成功，退出
    } catch (err) {
      logger.debug(logger.yellow(`Xvfb (${DISPLAY_NUMBER}) 启动失败，正在重试...`))
      retries -= 1
      if (retries > 0) {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        await new Promise((resolve) => setTimeout(resolve, 1000)) // 等待1秒后重试
      } else {
        logger.debug(logger.red('Xvfb 启动失败，重试多次后仍未成功'))
        throw err // 重试失败后抛出错误
      }
    }
  }
}

export const douyinLogin = async (e: Message) => {
  const hal = await handler.call('kkk.douyinLogin', { e })
  if (hal) return true
  const msg_id: string[] = []
  const message1 = await e.reply('免责声明:\n您将通过扫码完成获取抖音网页端的用户登录凭证（ck），该ck将用于请求抖音WEB API接口。\n本Bot不会保存您的登录状态。\n我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。\n害怕风险请勿扫码 ~')
  try {
    // 环境检查
    startXvfb()
    const browser = await chromium.launch({
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

        // 捕获页面的所有 response 事件
        page.on('response', async (response) => {
          try {
            logger.debug(`接收到响应：${response.url()}`)
            // 检查 302 重定向的响应
            if (response.status() === 302 && response.url().includes('/passport/sso/login/callback')) {
              // 获取本地的 cookie
              const localCookies = await page.context().cookies()
              const cookieString = localCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
              Config.Modify('cookies', 'douyin', cookieString)
              await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true })

              // 关闭浏览器
              await browser.close()

              // 批量撤回
              await Promise.all(msg_id.map(async (id) => {
                await e.bot.recallMsg(e.contact, id)
              }))
            } else if (response.headers()['content-type'] && response.headers()['content-type'].includes('application/json') && response.url().includes('https://sso.douyin.com')) {
              const responseBody = await response.body()
              const jsonResponse = JSON.parse(responseBody.toString())
              logger.debug(`SSO 回调 Code：${jsonResponse.error_code}`, `响应内容：${jsonResponse.description}`)
              if (jsonResponse.error_code === 2046) {
                logger.debug('需要短信验证码')
                await page.getByText('接收短信验证').click()
                const elements = page.locator(':has-text(\'为保护账号安全，请输入当前手机号\')')
                const texts = await elements.allInnerTexts()
                await page.getByText('获取验证码').click()
                const message3 = await e.reply(segment.text(texts.pop() as string))
                msg_id.push(message3.messageId)
                const ctx = await karin.ctx(e, { reply: true })
                await page.getByPlaceholder('请输入验证码').click()
                await page.getByPlaceholder('请输入验证码').fill(ctx.msg)
                await page.getByText('验证', { exact: true }).click()
              }
            }
          } catch (error) {
            await browser.close()
            // 批量撤回
            await Promise.all(msg_id.map(async (id) => {
              await e.bot.recallMsg(e.contact, id)
            }))
          }
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
      const msg = await e.reply('首次使用，正在初始化 playwright 环境，请稍等片刻...')
      execSync('npx playwright install chromium', { cwd: Version.pluginPath, stdio: 'inherit' })
      await e.reply(`playwright 初始化成功，请再次发送「${e.msg}」`)
      await e.bot.recallMsg(e.contact, msg.messageId)
      return true
    } else {
      await e.reply('chromiun 环境初始化失败，请查看控制台错误日志', { reply: true })
    }
  }
  return true
}

/**
 * 等待二维码出现并获取二维码信息
 * @param page 页面对象
 * @returns
 */
const waitQrcode = async (page: Page) => {
  // 首先检查二维码是否已经出现
  const qrCodeSelector = '.web-login-scan-code__content__qrcode-wrapper img'
  const loginButton = page.getByRole('button', { name: '登录' })

  // 检查二维码是否已经加载
  const qrCodeImage = await page.waitForSelector(qrCodeSelector, { state: 'attached', timeout: 30000 })
  if (qrCodeImage) {
    // 如果二维码已经出现，直接获取二维码信息
    const qrCodeBase64 = await qrCodeImage.getAttribute('src')
    return qrCodeBase64
  } else {
    // 如果二维码未出现，点击登录按钮以触发二维码显示
    await loginButton.click()
    // 等待二维码容器出现，给最多 20 秒
    await page.waitForSelector(qrCodeSelector, { timeout: 20000 })
    // 获取二维码图片元素
    const qrCodeImage = await page.waitForSelector(qrCodeSelector, { timeout: 20000 })
    // 获取二维码信息
    const qrCodeBase64 = await qrCodeImage.getAttribute('src')
    return qrCodeBase64
  }
}
