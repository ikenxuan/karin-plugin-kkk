import os from 'node:os'

import karin from 'node-karin'

import { Render } from '@/module/utils/Render'

/**
 * 获取本机局域网 IP 地址
 * 优先返回常见局域网网段的 IP（192.168.x.x, 10.x.x.x, 172.16-31.x.x）
 */
function getLocalIP(): string {
  const interfaces = os.networkInterfaces()
  const candidates: string[] = []

  for (const name of Object.keys(interfaces)) {
    const netInterface = interfaces[name]
    if (!netInterface) continue
    for (const net of netInterface) {
      if (net.family === 'IPv4' && !net.internal) {
        candidates.push(net.address)
      }
    }
  }

  // 优先选择常见局域网网段
  const preferredIP = candidates.find(ip => {
    // 192.168.x.x
    if (ip.startsWith('192.168.')) return true
    // 10.x.x.x
    if (ip.startsWith('10.')) return true
    // 172.16.x.x - 172.31.x.x
    if (ip.startsWith('172.')) {
      const second = parseInt(ip.split('.')[1], 10)
      if (second >= 16 && second <= 31) return true
    }
    return false
  })

  return preferredIP || candidates[0] || '127.0.0.1'
}

/**
 * 生成登录二维码（仅私发给主人）
 */
export const qrLogin = karin.command(/^#?(kkk)?登录$/i, async (e) => {
  const bot = karin.getBot(e.selfId)
  const userId = e.userId

  // 先检查好友关系，避免渲染后无法发送浪费资源
  if (e.isGroup) {
    const friendList = await bot?.getFriendList()
    const isFriend = friendList?.some(f => f.userId === userId)
    if (!isFriend) {
      await e.reply('请先添加 Bot 为好友后再试')
      return true
    }
  }

  const port = process.env.HTTP_PORT || '7777'
  const authKey = process.env.HTTP_AUTH_KEY || ''
  const ip = getLocalIP()
  const protocol = 'http'

  if (!authKey) {
    await e.reply('未配置 HTTP_AUTH_KEY 环境变量，无法生成登录二维码')
    return true
  }

  // 构建二维码数据（JSON 格式，包含服务器信息）
  const qrData = JSON.stringify({
    protocol,
    host: ip,
    port,
    authKey
  })

  const serverUrl = `${protocol}://${ip}:${port}`

  try {
    // 使用模板系统渲染二维码图片
    const images = await Render('other/qrlogin', {
      share_url: qrData,
      serverUrl
    })

    // 私发给触发命令的用户
    await karin.sendMaster(e.selfId, userId, images)
    
    // 如果是群聊触发，提示已私发
    if (e.isGroup) {
      await e.reply('登录二维码已私聊发送，请查收~')
    }
  } catch (error) {
    await e.reply('生成二维码失败: ' + (error instanceof Error ? error.message : String(error)))
  }

  return true
}, { perm: 'master', name: 'kkk-扫码登录' })
