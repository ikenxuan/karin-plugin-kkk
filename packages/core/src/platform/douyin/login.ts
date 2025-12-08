import fs from 'node:fs'
import { platform } from 'node:os'
import path from 'node:path'

import { snapka } from '@snapka/puppeteer'
import { newInjectedPage } from 'fingerprint-injector'
import { karin, karinPathTemp, logger, Message } from 'node-karin'

import { Common, Render, Root } from '@/module'
import { Config } from '@/module/utils/Config'

type Page = Awaited<ReturnType<Awaited<ReturnType<typeof snapka.launch>>['browser']['newPage']>>

/**
 * 截图函数
 * @param page Puppeteer 页面对象
 * @param screenshotPath 截图保存路径
 */
const safeScreenshot = async (page: Page, screenshotPath: string) => {
  try {
    await page.screenshot({
      path: screenshotPath
    })
    logger.debug(`截图已保存: ${screenshotPath}`)
  } catch (error) {
    logger.warn('截图失败（已忽略）:', error)
  }
}

export const douyinLogin = async (e: Message) => {
  const msg_id: string[] = []
  try {
    const puppeteer = await snapka.launch({
      headless: 'new',
      protocolTimeout: 60000,
      args: [
        '--disable-blink-features=AutomationControlled', // 禁用自动化控制特征，避免网站检测到自动化工具
        '--mute-audio', // 静音处理，防止页面播放音频
        '--window-size=800,600', // 设置浏览器窗口大小为 800x600 像素
        '--disable-gpu', // 禁用 GPU 加速，减少资源占用和潜在兼容性问题
        '--no-sandbox', // 禁用沙箱模式，某些环境下需要（如容器环境）
        '--disable-setuid-sandbox', // 禁用 setuid 沙箱，与 --no-sandbox 配合使用
        '--no-zygote', // 禁用 zygote 进程，减少内存占用和启动时间
        '--disable-extensions', // 禁用浏览器扩展，减少资源消耗
        '--disable-dev-shm-usage', // 禁用 /dev/shm 内存共享，解决某些环境下的内存限制问题
        '--disable-background-networking', // 禁用后台网络活动，减少不必要的网络请求
        '--disable-sync', // 禁用同步功能，如书签、设置等同步
        '--disable-crash-reporter', // 禁用崩溃报告器，减少资源占用
        '--disable-translate', // 禁用页面自动翻译功能
        '--disable-notifications', // 禁用浏览器通知，避免弹窗干扰
        '--disable-device-discovery-notifications', // 禁用设备发现通知（如附近的打印机等）
        '--disable-accelerated-2d-canvas', // 禁用加速的 2D 画布，减少 GPU 依赖
        '--autoplay-policy=user-gesture-required', // 设置自动播放策略为需要用户交互
        '--disable-web-security', // 禁用 Web 安全策略（如跨域限制），减少检查开销
        '--disable-features=IsolateOrigins,site-per-process', // 禁用-features=IsolateOrigins,site-per-process', // 禁用源隔离和站点进程隔离，减少进程数量
        '--disable-site-isolation-trials', // 禁用站点隔离试验功能
        '--disable-features=VizDisplayCompositor', // 禁用 Viz 显示合成器，简化渲染流程
        '--js-flags=--max-old-space-size=128', // 限制 V8 引擎的最大堆内存为 128MB
        '--disable-software-rasterizer', // 禁用软件光栅化器，减少 CPU 资源占用
        '--disable-webgl', // 禁用 WebGL 3D 图形 API
        '--disable-webgl2', // 禁用 WebGL2 3D 图形 API
        '--disable-3d-apis', // 禁用所有 3D 相关 API，减少资源消耗
        '--disable-accelerated-video-decode', // 禁用硬件加速视频解码
        '--disable-background-timer-throttling', // 禁用后台定时器节流，确保定时器正常运行
        '--disable-backgrounding-occluded-windows', // 禁用被遮挡窗口的后台处理，保持活跃状态
        '--disable-breakpad', // 禁用 Breakpad 崩溃报告系统
        '--disable-component-extensions-with-background-pages', // 禁用带有背景页面的组件扩展
        '--disable-features=TranslateUI,BlinkGenPropertyTrees', // 禁用翻译 UI 和 Blink 属性树生成
        '--disable-ipc-flooding-protection', // 禁用 IPC 洪水保护，提高进程间通信效率
        '--disable-renderer-backgrounding' // 禁用渲染器进程的后台处理，保持渲染性能
      ],
      ignoreDefaultArgs: ['--enable-automation']
    })

    // const pageTest = await browser.newPage()

    // await injector.attachFingerprintToPuppeteer(pageTest, fingerprint)
    // await pageTest.goto('https://bot.sannysoft.com')
    // await pageTest.screenshot({ path: 'testresult.png', fullPage: true })

    /** 根据当前系统平台选择操作系统类型 */
    const getOperatingSystem = (): 'windows' | 'macos' | 'linux' => {
      const os = platform()
      if (os === 'win32') return 'windows'
      if (os === 'darwin') return 'macos'
      return 'linux'
    }

    const page = await newInjectedPage(puppeteer.browser, {
      fingerprintOptions: {
        devices: ['desktop'],
        operatingSystems: [getOperatingSystem()]
      }
    }) as Page

    // 激进地拦截资源，只保留必要的 HTML、JS 和二维码图片
    await page.setRequestInterception(true)
    page.on('request', async (request) => {
      const resourceType = request.resourceType()
      const url = request.url()

      // 记录登录相关的请求
      if (url.includes('passport') || url.includes('login') || url.includes('qrconnect') || url.includes('qrcode')) {
        logger.debug(`[请求] ${resourceType}: ${url}`)
      }

      // 阻止明确不需要的资源
      const shouldBlock =
        resourceType === 'media' || // 视频/音频（Puppeteer 已识别的媒体类型）
        resourceType === 'font' || // 字体
        resourceType === 'stylesheet' || // CSS
        // 通过 URL 特征识别视频
        /\.(mp4|webm|m3u8|flv|avi|mov|wmv|mkv)(\?|$)/i.test(url) || // 视频文件扩展名
        url.includes('/aweme/') || // 抖音视频相关路径
        url.includes('/video/') || // 通用视频路径
        url.includes('v.douyin.com') || // 抖音视频域名
        // 阻止大图片但保留二维码
        (resourceType === 'image' && !url.includes('qrcode') && !url.includes('data:image') &&
          (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.webp')))

      if (shouldBlock) {
        if (url.includes('passport') || url.includes('login') || url.includes('qrconnect')) {
          logger.warn(`[拦截] 登录相关请求被拦截: ${url}`)
        }
        request.abort()
      } else {
        // 允许所有其他请求（包括 API 调用）
        request.continue()
      }
    })

    // 禁用视频播放和其他重量级功能
    await page.evaluateOnNewDocument(() => {
      // 禁止 video 元素播放
      HTMLMediaElement.prototype.play = function () {
        return Promise.reject(new Error('Video playback blocked'))
      }

      // 禁止创建 MediaSource 对象
      if (window.MediaSource) {
        window.MediaSource = undefined as any
      }

      // 禁用 IntersectionObserver（防止懒加载触发）
      window.IntersectionObserver = class {
        observe () { }
        unobserve () { }
        disconnect () { }
      } as any
    })

    // 访问首页
    await page.goto('https://www.douyin.com', { timeout: 120000, waitUntil: 'domcontentloaded' })

    // 阶段1: 获取二维码 (60秒超时)
    let qrCodeBase64: string
    try {
      logger.mark('开始等待二维码加载...')
      qrCodeBase64 = await Promise.race([
        waitQrcode(page),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('QR_CODE_TIMEOUT')), 60000)
        )
      ])
      logger.mark('二维码获取成功')
    } catch (error: any) {
      if (error.message === 'QR_CODE_TIMEOUT') {
        logger.warn('获取二维码超时')
        await safeScreenshot(page, path.join(karinPathTemp, Root.pluginName, 'DouyinLoginQrcodeError.png'))
        await e.reply('获取二维码超时，请稍后重试', { reply: true })
      } else {
        logger.error('获取二维码失败:', error)
        await e.reply('获取二维码失败，请查看控制台日志', { reply: true })
      }
      await puppeteer.browser.close()
      return true
    }

    // 渲染并发送二维码
    let gcInterval: NodeJS.Timeout | undefined
    try {
      const loginQRcode = await Render('douyin/qrcodeImg', { qrCodeDataUrl: qrCodeBase64 })

      const base64Data = loginQRcode[0]?.file
      if (!base64Data) {
        throw new Error('生成二维码图片失败')
      }

      const cleanBase64 = base64Data.replace(/^base64:\/\//, '')
      const buffer = Buffer.from(cleanBase64, 'base64')

      fs.writeFileSync(`${Common.tempDri.default}DouyinLoginQrcode.png`, buffer)

      const message2 = await e.reply(loginQRcode, { reply: true })
      logger.debug('二维码图片消息ID:', message2.messageId)
      msg_id.push(message2.messageId)

      // 定期触发垃圾回收以释放内存
      gcInterval = setInterval(async () => {
        try {
          await page.evaluate(() => {
            // 尝试触发浏览器的垃圾回收
            if ((window as any).gc) {
              (window as any).gc()
            }
          })
        } catch {
          // 忽略错误
        }
      }, 10000) // 每 10 秒清理一次

      logger.mark('开始等待用户扫码登录...')

      // 阶段2: 等待用户扫码 (120秒超时，因为消息只能撤回2分钟)
      const loginResult = await Promise.race([
        new Promise<boolean>((resolve) => {
          // 120秒后主动撤回二维码消息并结束
          const timer = setTimeout(async () => {
            logger.warn('扫码登录超时（2分钟），撤回二维码消息')
            // 撤回二维码消息
            await Promise.all(msg_id.map(async (id) => {
              await e.bot.recallMsg(e.contact, id)
            }))
            resolve(false)
          }, 120 * 1000)

          let secondVerifyHandled = false
          let scannedHandled = false
          let responseCount = 0

          // 监听所有响应以调试
          page.on('response', async (response) => {
            responseCount++
            const url = response.url()

            // 每 10 个响应打印一次心跳
            if (responseCount % 10 === 0) {
              logger.debug(`[心跳] 已收到 ${responseCount} 个响应`)
            }

            // 记录所有登录相关的请求
            if (url.includes('passport') || url.includes('login') || url.includes('qrconnect') || url.includes('qrcode')) {
              logger.debug(`[响应] 登录相关请求: ${url}, status: ${response.status()}`)
            }
          })

          logger.mark('响应监听器已注册')

          page.on('response', async (response) => {
            try {
              // 监听二维码轮询接口
              if (response.url().includes('check_qrconnect')) {
                logger.debug(`收到登录轮询响应: ${response.url()}`)

                // 检查响应头中是否包含 sid_guard（唯一登录凭证）
                const headers = response.headers()
                const setCookieHeaders = headers['set-cookie'] || ''
                const hasSidGuard = setCookieHeaders.includes('sid_guard')

                logger.debug(`响应头包含 sid_guard: ${hasSidGuard}`)

                if (hasSidGuard) {
                  clearTimeout(timer)
                  logger.mark('检测到 sid_guard，登录成功')

                  // 保存 cookie
                  logger.debug('开始获取 cookies...')
                  const cookies = await puppeteer.browser.cookies()
                  logger.debug(`获取到 ${cookies.length} 个 cookies`)
                  const cookieString = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
                  logger.debug('开始保存 cookies...')
                  Config.Modify('cookies', 'douyin', cookieString)
                  logger.debug('cookies 保存完成')
                  await e.reply('登录成功！用户登录凭证已保存至cookies.yaml', { reply: true })

                  // 批量撤回之前的消息
                  await Promise.all(msg_id.map(async (id) => {
                    await e.bot.recallMsg(e.contact, id)
                  }))

                  logger.mark('关闭浏览器...')
                  await puppeteer.browser.close()
                  logger.mark('浏览器已关闭')
                  resolve(true)
                  return
                }

                // 如果没有 sid_guard，检查响应体
                const responseBody = await response.text()
                const jsonResponse = JSON.parse(responseBody)

                logger.debug(`二维码状态：${jsonResponse.data?.status}, error_code: ${jsonResponse.data?.error_code}`)

                // 检查二维码是否已被扫描（只处理一次）
                if (jsonResponse.data?.status === 'scanned' && !scannedHandled) {
                  scannedHandled = true
                  logger.mark('检测到二维码已被扫描')
                  // 撤回二维码消息
                  await Promise.all(msg_id.map(async (id) => {
                    await e.bot.recallMsg(e.contact, id)
                  }))
                  // 清空消息ID列表，避免重复撤回
                  msg_id.length = 0
                  // 发送授权提示
                  const authMsg = await e.reply('此二维码已被扫描，请在手机上授权以登录', { reply: true })
                  msg_id.push(authMsg.messageId)
                }

                // 检查是否需要二次验证
                if (jsonResponse.data?.error_code === 2046 && !secondVerifyHandled) {
                  secondVerifyHandled = true
                  logger.mark('检测到需要二次验证')
                  clearTimeout(timer) // 清除扫码超时，进入2FA阶段

                  // 使用立即执行的异步函数，不阻塞响应监听
                  ; (async () => {
                    try {
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

                      // 验证码验证逻辑（最多2次机会）
                      let verifyAttempts = 0
                      const maxAttempts = 2
                      let verifySuccess = false

                      while (verifyAttempts < maxAttempts && !verifySuccess) {
                        verifyAttempts++
                        logger.debug(`验证码输入尝试 ${verifyAttempts}/${maxAttempts}`)

                        // 阶段3: 等待用户输入2FA验证码 (60秒超时)
                        const ctx = await Promise.race([
                          karin.ctx(e, { reply: true }),
                          new Promise<never>((_, reject) =>
                            setTimeout(() => reject(new Error('2FA_TIMEOUT')), 60000)
                          )
                        ]).catch(async (error) => {
                          if (error.message === '2FA_TIMEOUT') {
                            logger.warn('2FA验证码输入超时')
                            clearTimeout(timer)
                            if (gcInterval) clearInterval(gcInterval)
                            await puppeteer.browser.close()
                            // 撤回所有之前的消息
                            await Promise.all(msg_id.map(async (id) => {
                              await e.bot.recallMsg(e.contact, id)
                            }))
                            await e.reply('验证码验证码输入超时，登录失败', { reply: true })
                            resolve(true) // 返回true表示已处理完成
                          }
                          throw error
                        })

                        if (!ctx) return

                        // 清空输入框
                        await page.evaluate((selector) => {
                          const input = document.querySelector(selector) as HTMLInputElement
                          if (input) input.value = ''
                        }, inputSelector)

                        // 输入验证码
                        await page.type(inputSelector, ctx.msg)

                        // 监听验证码验证接口
                        const validatePromise = new Promise<boolean>((resolveValidate) => {
                          const validateHandler = async (resp: any) => {
                            if (resp.url().includes('validate_code')) {
                              try {
                                const validateBody = await resp.text()
                                const validateJson = JSON.parse(validateBody)
                                logger.debug('验证码验证响应:', validateJson)

                                if (validateJson.data?.error_code === 1202) {
                                  // 验证码错误
                                  logger.warn('验证码错误')
                                  page.off('response', validateHandler)
                                  resolveValidate(false)
                                } else if (validateJson.message === 'success' || !validateJson.data?.error_code) {
                                  // 验证成功
                                  logger.mark('验证码验证成功')
                                  page.off('response', validateHandler)
                                  resolveValidate(true)
                                }
                              } catch (err) {
                                logger.debug('解析验证响应失败:', err)
                              }
                            }
                          }
                          page.on('response', validateHandler)

                          // 5秒超时
                          setTimeout(() => {
                            page.off('response', validateHandler)
                            resolveValidate(false)
                          }, 5000)
                        })

                        // 点击"验证"按钮
                        await page.evaluate(() => {
                          const elements = Array.from(document.querySelectorAll('*'))
                          const verifyBtn = elements.find(el => el.textContent?.trim() === '验证')
                          if (verifyBtn) {
                            (verifyBtn as HTMLElement).click()
                          }
                        })

                        logger.mark('已提交验证码，等待验证结果...')

                        // 等待验证结果
                        verifySuccess = await validatePromise

                        if (!verifySuccess && verifyAttempts < maxAttempts) {
                          // 还有重试机会
                          const retryMsg = await e.reply('验证码错误，请重新发送正确的 6 位数验证码（剩余机会：1次）', { reply: true })
                          msg_id.push(retryMsg.messageId)
                        } else if (!verifySuccess && verifyAttempts >= maxAttempts) {
                          // 没有机会了
                          logger.warn('验证码错误次数过多，登录失败')
                          clearTimeout(timer)
                          if (gcInterval) clearInterval(gcInterval)
                          await puppeteer.browser.close()
                          // 撤回所有之前的消息
                          await Promise.all(msg_id.map(async (id) => {
                            await e.bot.recallMsg(e.contact, id)
                          }))
                          await e.reply('验证码错误，登录失败', { reply: true })
                          resolve(true) // 返回true表示已处理完成，避免外层再次处理
                          return
                        }
                      }

                      if (verifySuccess) {
                        logger.mark('2FA验证通过，等待最终登录确认...')
                      }
                    } catch (err) {
                      logger.error('二次验证处理失败:', err)
                      clearTimeout(timer)
                      if (gcInterval) clearInterval(gcInterval)
                      await puppeteer.browser.close()
                      // 撤回所有之前的消息
                      await Promise.all(msg_id.map(async (id) => {
                        await e.bot.recallMsg(e.contact, id)
                      }))
                      await e.reply('二次验证处理失败，登录失败', { reply: true })
                      resolve(true) // 返回true表示已处理完成
                    }
                  })()
                }
              }
            } catch (error) {
              logger.error('处理响应时出错:', error)
            }
          })
        })
      ])

      if (gcInterval) clearInterval(gcInterval)

      if (!loginResult) {
        logger.warn('登录超时或失败')
        await puppeteer.browser.close()
        await e.reply('登录超时！二维码已失效！', { reply: true })
        return true
      }
    } catch (err) {
      logger.error('登录流程出错:', err)
      if (gcInterval) clearInterval(gcInterval)
      await puppeteer.browser.close()
      await e.reply('登录过程出错，请查看控制台日志', { reply: true })
    }
  } catch (error: any) {
    logger.error(error)
    await e.reply('浏览器环境初始化失败，请查看控制台错误日志', { reply: true })
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
    await page.waitForSelector(qrCodeSelector, { timeout: 60000 })
  } catch {
    // 可能遇到验证码了，截个图
    await safeScreenshot(page, path.join(karinPathTemp, Root.pluginName, 'DouyinLoginQrcodeError.png'))
    throw new Error('加载超时了，或者遇到验证码了。。。')
  }
  logger.debug('二维码加载完成')
  // 减少等待时间，二维码已经加载完成
  await new Promise(resolve => setTimeout(resolve, 1000))
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
