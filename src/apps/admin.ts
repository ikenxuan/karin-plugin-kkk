import fs from 'node:fs'

import karin, { logger, Message, Plugin } from 'node-karin'
import path from 'path'

import { Common, Config, Render } from '@/module'
import { bilibiliLogin, douyinLogin } from '@/platform'

export const task = Config.app.rmmp4 && karin.task('[kkk-视频缓存自动删除]', '0 0 4 * * *', async () => {
  try {
    await removeAllFiles(Common.tempDri.video)
    logger.mark(Common.tempDri.video + '目录下所有文件已删除')
  } catch (err) {
    console.error('删除文件时出错:', err)
  }
})

export const biLogin = karin.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, async (e) => {
  await bilibiliLogin(e)
  return true
}, { perm: 'group.admin', name: 'kkk-ck管理' })

export const dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
  await douyinLogin(e)
  return true
}, { perm: 'group.admin', name: 'kkk-ck管理' })

export const setdyck = karin.command(/^#?(kkk)?s*设置抖音ck$/i, async (e) => {
  const msg = await e.reply('请发在120秒内送抖音ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n')
  const context = await karin.ctx(e)
  Config.Modify('cookies', 'douyin', context.msg)
  await e.bot.recallMsg(e.contact, msg.messageId)
  await e.reply('设置成功！', { at: true })
  return true
}, { perm: 'master', name: 'kkk-ck管理', event: 'message.friend' })

export const setbilick = karin.command(/^#?(kkk)?s*设置s*(B站)ck$/i, async (e) => {
  const msg = await e.reply('请发在120秒内送B站ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n')
  const context = await karin.ctx(e)
  Config.Modify('cookies', 'bilibili', context.msg)
  await e.bot.recallMsg(e.contact, msg.messageId)
  await e.reply('设置成功！', { at: true })
  return true
}, { perm: 'master', name: 'kkk-ck管理', event: 'message.friend' })

const authFailMsg = '你暂时没有这个权限使用这个功能啦 ~ 只有主人可以使用哦'
// 插件类
export class Admin extends Plugin {
  constructor () {
    super({
      name: 'kkk-管理',
      rule: [
        { reg: createSwitchRegExp('app'), fnc: 'ConfigSwitch', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('app'), fnc: 'ConfigNumber', permission: 'master', authFailMsg },
        { reg: createCustomRegExp('app'), fnc: 'ConfigCustom', permission: 'master', authFailMsg },
        { reg: createSwitchRegExp('douyin'), fnc: 'ConfigSwitch', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('douyin'), fnc: 'ConfigNumber', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('douyin'), fnc: 'ConfigCustom', permission: 'master', authFailMsg },
        { reg: createSwitchRegExp('bilibili'), fnc: 'ConfigSwitch', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('bilibili'), fnc: 'ConfigNumber', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('bilibili'), fnc: 'ConfigCustom', permission: 'master', authFailMsg },
        { reg: createSwitchRegExp('upload'), fnc: 'ConfigSwitch', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('upload'), fnc: 'ConfigNumber', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('upload'), fnc: 'ConfigCustom', permission: 'master', authFailMsg },
        { reg: createSwitchRegExp('kuaishou'), fnc: 'ConfigSwitch', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('kuaishou'), fnc: 'ConfigNumber', permission: 'master', authFailMsg },
        { reg: createNumberRegExp('kuaishou'), fnc: 'ConfigCustom', permission: 'master', authFailMsg },
        { reg: /^#kkk设置$/, fnc: 'index_Settings', permission: 'master', authFailMsg },
        { reg: /^#?kkk删除缓存$/, fnc: 'deleteCache', permission: 'master', authFailMsg }
      ]
    })
  }

  async deleteCache (e: Message): Promise<boolean> {
    await removeAllFiles(Common.tempDri.video)
    await e.reply(Common.tempDri.video + '目录下所有文件已删除')
    return true
  }

  // 配置开关
  async ConfigSwitch (e: any): Promise<boolean> {
    logger.debug('开关配置', e.msg)
    const platform = this.getPlatformFromMessage(e.msg)
    const regRet = createSwitchRegExp(platform).exec(e.msg)
    if (regRet) {
      const key = regRet[1]
      const isOn = regRet[2] === '开启'
      Config.Modify(platform, PlatformTypeConfig[platform].types[key], isOn)
      await this.index_Settings(e)
    }
    return false
  }

  // 修改数值配置
  async ConfigNumber (e: Message): Promise<boolean> {
    logger.debug('数值配置', e.msg)
    const platform = this.getPlatformFromMessage(e.msg)
    const regRet = createNumberRegExp(platform).exec(e.msg)
    if (regRet) {
      const configType = PlatformTypeConfig[platform].numberConfig[regRet[1]]
      const number = this.checkNumberValue(Number(regRet[2]), configType.limit)
      Config.Modify(platform, configType.key, number)
      await this.index_Settings(e)
    }
    return false
  }

  // 处理自定义内容
  async ConfigCustom (e: Message): Promise<boolean> {
    logger.debug('自定义内容', e.msg)
    const platform = this.getPlatformFromMessage(e.msg)
    const regRet = createCustomRegExp(platform).exec(e.msg)

    if (regRet) {
      const key = regRet[1] // 提取设置的关键字
      const customValue = regRet[2].trim() // 提取后方的内容

      // 检查 customConfig 是否存在
      const customConfig = PlatformTypeConfig[platform]?.customConfig
      if (!customConfig || !customConfig[key]) {
        logger.debug(logger.warn(`无效的设置项：${key}`))
        return false
      }
      const configKey = customConfig[key].key // 提取实际的 key
      Config.Modify(platform, configKey, customValue)
      await this.index_Settings(e)
    }
    return false
  }

  // 渲染设置图片
  async index_Settings (e: Message): Promise<boolean> {
    const _cfg = Config.All()
    const statusData = getStatus(_cfg) // 获取状态对象
    const img = await Render('admin/index', { data: statusData })
    await e.reply(img)
    return true
  }

  // 根据消息判断平台
  getPlatformFromMessage (msg: string): 'app' | 'douyin' | 'bilibili' | 'upload' | 'kuaishou' {
    if (msg.includes('抖音')) return 'douyin'
    if (msg.includes('B站')) return 'bilibili'
    if (msg.includes('上传')) return 'upload'
    if (msg.includes('快手')) return 'kuaishou'
    return 'app'
  }

  // 检查数值范围
  checkNumberValue (value: number, limit: string): number {
    const [min, max] = limit.split('-').map(Number)
    return Math.min(Math.max(value, min), max)
  }
}

// 文件删除工具
async function removeAllFiles (dir: string): Promise<void> {
  const files = await fs.promises.readdir(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = await fs.promises.stat(filePath)
    if (stats.isDirectory()) {
      await removeAllFiles(filePath)
      await fs.promises.rmdir(filePath)
    } else {
      await fs.promises.unlink(filePath)
    }
  }
}

// 获取状态渲染
function getStatus (data: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}

  const processValue = (value: any): string => {
    if (typeof value === 'boolean') {
      return `<div class="cfg-status ${value ? '' : 'status-off'}">${value ? '已开启' : '已关闭'}</div>`
    } else if (typeof value === 'number') {
      return `<div class="cfg-status ${value === null ? 'status-off' : ''}">${value ?? '未配置'}</div>`
    } else if (typeof value === 'string') {
      return `<div class="cfg-status">${value.length > 12 ? `${value.slice(0, 12)}...` : value}</div>`
    } else if (Array.isArray(value)) {
      return value.length === 0
        ? '<div class="cfg-status status-off">未配置</div>'
        : `<div class="cfg-status">已配置 ${value.length} 项</div>`
    } else if (value === null) {
      return '<div class="cfg-status status-off">未配置</div>'
    }
    return '<div class="cfg-status status-off">未知类型</div>'
  }

  const processObject = (obj: any): Record<string, any> => {
    const res: Record<string, any> = {}
    for (const key in obj) {
      const value = obj[key]
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        // 如果是子对象，递归处理
        res[key] = processObject(value)
      } else {
        // 处理基础类型
        res[key] = processValue(value)
      }
    }
    return res
  }

  for (const key in data) {
    result[key] = processObject(data[key])
  }

  return result
}

// 定义开关类型配置的接口
interface PlatformType {
  name: string
  types: Record<string, string>
  numberConfig: Record<string, { key: string; limit: string }>
  customConfig?: Record<string, { key: string; type: string }>
}

const PlatformTypeConfig: Record<string, PlatformType> = {
  upload: {
    name: '上传',
    types: {
      上传拦截: 'usefilelimit',
      上传base64: 'sendbase64',
      上传压缩: 'compress',
      上传群文件: 'usegroupfile'
    },
    numberConfig: {
      上传拦截阈值: { key: 'filelimit', limit: '0-1000000' },
      上传压缩触发值: { key: 'compresstrigger', limit: '0-1000000' },
      上传压缩后的值: { key: 'compressvalue', limit: '0-1000000' },
      上传群文件阈值: { key: 'groupfilevalue', limit: '0-1000000' }
    }
  },
  app: {
    name: 'APP',
    types: {
      缓存删除: 'rmmp4',
      视频解析: 'videotool',
      默认解析: 'defaulttool',
      转发: 'sendforwardmsg',
      上传限制: 'usefilelimit',
      API服务: 'APIServer',
      base64: 'sendbase64'
    },
    numberConfig: {
      渲染精度: { key: 'renderScale', limit: '50-200' },
      优先级: { key: 'priority', limit: '0-114514' },
      限制: { key: 'filelimit', limit: '5-114514' },
      主题: { key: 'Theme', limit: '0-2' }
    }
  },
  douyin: {
    name: '抖音',
    types: {
      抖音解析: 'switch',
      抖音评论: 'comment',
      抖音推送: 'push.switch',
      抖音推送日志: 'push.log',
      抖音解析提示: 'tip',
      抖音高清语音: 'sendHDrecord',
      抖音动态解析: 'push.parsedynamic',
      抖音自动清晰度: 'autoResolution'
    },
    numberConfig: {
      抖音评论数量: { key: 'numcomment', limit: '0-999999' }
    },
    customConfig: {
      抖音推送表达式: { key: 'push.cron', type: 'string' },
      抖音推送设置权限: { key: 'push.permission', type: 'string' }
    }
  },
  bilibili: {
    name: 'B站',
    types: {
      B站解析: 'switch',
      B站评论: 'comment',
      B站推送: 'push.switch',
      B站推送日志: 'push.log',
      B站解析提示: 'tip',
      B站动态解析: 'push.parsedynamic',
      B站内容优先: 'videopriority',
      B站自动清晰度: 'autoResolution'
    },
    numberConfig: {
      B站评论数量: { key: 'numcomment', limit: '0-999999' }
    },
    customConfig: {
      B站推送表达式: { key: 'push.cron', type: 'string' },
      B站推送设置权限: { key: 'push.permission', type: 'string' }
    }
  },
  kuaishou: {
    name: '快手',
    types: {
      快手解析: 'switch',
      快手解析提示: 'tip'
    },
    numberConfig: {
      快手评论数量: { key: 'numcomment', limit: '0-30' }
    }
  }
}

// 创建正则表达式的函数
const createSwitchRegExp = (platform: string): RegExp => {
  // 取出所有 'switch' 类型的命令
  const switchKeys = Object.keys(PlatformTypeConfig[platform].types)
  return new RegExp(`^#kkk设置(${switchKeys.join('|')})(开启|关闭)$`)
}

const createNumberRegExp = (platform: string): RegExp => {
  const numberKeys = Object.keys(PlatformTypeConfig[platform].numberConfig)
  return new RegExp(`^#kkk设置(${numberKeys.join('|')})(\\d+)$`)
}

const createCustomRegExp = (platform: string): RegExp => {
  const customKeys = Object.keys(PlatformTypeConfig[platform].customConfig ?? {})
  return new RegExp(`^#kkk设置(${customKeys.join('|')})(.*)$`)
}
