import fs from 'node:fs'
import { platform } from 'node:os'
import path from 'node:path'

import { launch } from '@karinjs/puppeteer'
import { FingerprintGenerator } from 'fingerprint-generator'
import { FingerprintInjector, newInjectedPage } from 'fingerprint-injector'
import { karin, karinPathTemp, logger, Message } from 'node-karin'

import { Common, Render, Root } from '@/module'
import { Config } from '@/module/utils/Config'


export const douyinLogin = async (e: Message) => {
  const msg_id: string[] = []
  try {
    const fingerprint = new FingerprintGenerator({
      browsers: [{
        name: 'chrome',
        minVersion: 141
      }]
    }).getFingerprint()
    const injector = new FingerprintInjector()

    const { browser } = await launch({
      headless: true,
      args: [
        '--disable-blink-features=AutomationControlled', // 禁用自动化控制
        // '--window-position=-10000,-10000', // 将窗口移到屏幕外
        // '--start-minimized', // 启动时最小化
        '--mute-audio',
        '--no-sandbox',
        '--disable-web-security'
      ],
      ignoreDefaultArgs: ['--enable-automation']
    })

    // const pageTest = await browser.newPage()

    // await injector.attachFingerprintToPuppeteer(pageTest, fingerprint)
    // await pageTest.goto('https://bot.sannysoft.com')
    // await pageTest.screenshot({ path: 'testresult.png', fullPage: true })

    // 根据当前系统平台选择操作系统类型
    const getOperatingSystem = (): 'windows' | 'macos' | 'linux' => {
      const os = platform()
      if (os === 'win32') return 'windows'
      if (os === 'darwin') return 'macos'
      return 'linux'
    }

    const page = await newInjectedPage(browser, {
      fingerprintOptions: {
        devices: ['desktop'],
        operatingSystems: [getOperatingSystem()]
      }
    }) as Awaited<ReturnType<Awaited<ReturnType<typeof launch>>['browser']['newPage']>>
    await injector.attachFingerprintToPuppeteer(page, fingerprint)
    await page.goto('https://www.douyin.com', { timeout: 120000 })

    const timeout = new Promise((_resolve) => setTimeout(async () => {
      await browser.close() // 超时后关闭浏览器
    }, 120000))

    const qrCodePromise = (async () => {
      try {
        // 获取 img 的 src 属性内容
        const qrCodeBase64 = await waitQrcode(page)
        const loginQRcode = await Render('douyin/qrcodeImg', { qrCodeDataUrl: qrCodeBase64 })

        const base64Data = loginQRcode[0]?.file
        if (!base64Data) {
          throw new Error('生成二维码图片失败')
        }

        const cleanBase64 = base64Data.replace(/^base64:\/\//, '')
        const buffer = Buffer.from(cleanBase64, 'base64')

        fs.writeFileSync(`${Common.tempDri.default}DouyinLoginQrcode.png`, buffer)

        const message2 = await e.reply(loginQRcode, { reply: true })
        msg_id.push(message2.messageId)

        await new Promise(resolve => {
          const timer = setTimeout(() => {
            resolve(false)
          }, 120 * 1000)

          let secondVerifyHandled = false

          page.on('response', async (response) => {
            try {
              // 监听二维码轮询接口
              if (response.url().includes('check_qrconnect')) {
                // 检查响应头中是否包含 sid_guard（唯一登录凭证）
                const headers = response.headers()
                const setCookieHeaders = headers['set-cookie'] || ''
                const hasSidGuard = setCookieHeaders.includes('sid_guard')

                if (hasSidGuard) {
                  clearTimeout(timer)
                  logger.info('检测到 sid_guard，登录成功')

                  // 等待一下让 cookie 完全设置
                  await new Promise(resolve => setTimeout(resolve, 1000))

                  // 保存 cookie
                  const cookies = await browser.cookies()
                  const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
                  Config.Modify('cookies', 'douyin', cookieString)
                  await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true })

                  resolve(true)
                  await browser.close()
                  await Promise.all(msg_id.map(async (id) => {
                    await e.bot.recallMsg(e.contact, id)
                  }))
                  return
                }

                // 如果没有 sid_guard，检查响应体
                const responseBody = await response.text()
                const jsonResponse = JSON.parse(responseBody)

                logger.debug(`二维码状态：${jsonResponse.data?.status}, error_code: ${jsonResponse.data?.error_code}`)

                // 检查是否需要二次验证
                if (jsonResponse.data?.error_code === 2046 && !secondVerifyHandled) {
                  secondVerifyHandled = true


                  // 等待二次验证弹窗出现
                  await page.waitForSelector('#uc-second-verify', { timeout: 5000 })

                  // 点击"接收短信验证码"按钮
                  const clicked = await page.evaluate(() => {
                    const xpath = '//text()[contains(., \'接收短信验证码\')]/ancestor::*[1]'
                    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
                    const element = result.singleNodeValue as HTMLElement
                    if (element) {
                      element.click()
                      return true
                    }
                    return false
                  })

                  if (!clicked) {
                    logger.warn('未找到"接收短信验证码"按钮')
                  }

                  // 等待输入框出现
                  await new Promise(resolve => setTimeout(resolve, 2000))
                  const inputSelector = '#uc-second-verify input'
                  await page.waitForSelector(inputSelector, { timeout: 10000 })

                  const tipMsg = await e.reply('此次验证需要进行 2FA\n6 位数的验证码已发送至扫码设备绑定的手机号\n请在 60 秒内发送此验证码以通过 2FA', { reply: true })
                  msg_id.push(tipMsg.messageId)

                  // 等待用户输入验证码
                  const ctx = await karin.ctx(e, { reply: true })

                  // 输入验证码
                  await page.type(inputSelector, ctx.msg)

                  // 点击"验证"按钮
                  await page.evaluate(() => {
                    const elements = Array.from(document.querySelectorAll('*'))
                    const verifyBtn = elements.find(el => el.textContent?.trim() === '验证')
                    if (verifyBtn) {
                      (verifyBtn as HTMLElement).click()
                    }
                  })

                  logger.info('已提交验证码，等待验证结果...')
                }
              }
            } catch (error) {
              logger.error('处理响应时出错:', error)
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
const waitQrcode = async (page: Awaited<ReturnType<Awaited<ReturnType<typeof launch>>['browser']['newPage']>>) => {
  const qrCodeSelector = 'img[aria-label="二维码"]'
  try {
    await page.waitForSelector(qrCodeSelector, { timeout: 10000 })
  } catch {
    // 可能遇到验证码了，截个图
    await page.screenshot({ path: path.join(karinPathTemp, Root.pluginName, 'DouyinLoginQrcodeError.png') })
  }
  logger.debug('二维码加载完成')
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
