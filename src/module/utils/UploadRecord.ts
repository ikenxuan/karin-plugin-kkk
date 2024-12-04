import { exec } from 'node:child_process'
import crypto from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import querystring from 'node:querystring'

import axios from 'axios'
import { core } from 'icqq'
import { Cfg, KarinMessage, logger } from 'node-karin'


const errors = {} as any

async function UploadRecord (e: KarinMessage, record_url: string, seconds = 0, transcoding = true, brief = ''): Promise<any> {
  const bot = { ...e.bot, super: {} as any }
  const result = await getPttBuffer(record_url, Cfg.Config.ffmpeg_path, transcoding)
  if (! result.buffer) {
    return false
  }
  const buf = result.buffer
  if (seconds === 0 && result.time) seconds = result.time.seconds
  const hash = md5(buf)
  const codec = String(buf.slice(0, 7)).includes('SILK') ? (transcoding ? 1 : 0) : 0
  const body = core.pb.encode({
    1: 3,
    2: 3,
    5: {
      1: bot.account.uin,
      2: bot.account.uin,
      3: 0,
      4: hash,
      5: buf.length,
      6: hash,
      7: 5,
      8: 9,
      9: 4,
      11: 0,
      10: '9.1.0',
      12: 1,
      13: 1,
      14: codec,
      15: 1
    }
  })
  const payload = await bot.super.sendUni('PttStore.GroupPttUp', body)
  const rsp = core.pb.decode(payload)[5]
  rsp[2] && errors.drop(rsp[2], rsp[3])
  const ip = rsp[5]?.[0] || rsp[5]
  const port = rsp[6]?.[0] || rsp[6]
  const ukey = rsp[7].toHex()
  const filekey = rsp[11].toHex()
  const params = {
    ver: 4679,
    ukey,
    filekey,
    filesize: buf.length,
    bmd5: hash.toString('hex'),
    mType: 'pttDu',
    voice_encodec: codec
  }
  const url = `http://${int32ip2str(ip)}:${port}/?` + querystring.stringify(params)
  const headers = {
    'User-Agent': `QQ/${'9.1.0'} CFNetwork/1126`,
    'Net-Type': 'Wifi'
  }
  await axios.post(url, buf, { headers })
  const fid = rsp[11].toBuffer()
  const b = core.pb.encode({
    1: 4,
    2: bot.account.uin,
    3: fid,
    4: hash,
    5: hash.toString('hex') + '.amr',
    6: seconds,
    11: 1,
    18: fid,
    19: seconds,
    29: codec,
    30: {
      1: 0, // 是否为变声语音
      5: 0, // 是否显示评级
      6: 'sss', // 评级
      7: 0, // 未知参数
      8: brief
    }
  })
  return {
    type: 'record',
    file: 'protobuf://' + Buffer.from(b).toString('base64')
  }
}

export { UploadRecord }

async function getPttBuffer (file: string, ffmpeg = 'ffmpeg', transcoding = true): Promise<{ buffer?: Buffer, time?: { seconds: number } }> {
  let buffer: Buffer | undefined
  let time: { seconds: number } | undefined
  if (Buffer.isBuffer(file) || file.startsWith('base64://')) {
    let buf: Buffer = Buffer.isBuffer(file) ? file : Buffer.from(file.slice(9), 'base64')
    const head = buf.slice(0, 7).toString()
    if (head.includes('SILK') || head.includes('AMR') || ! transcoding) {
      const tmpfile = `${TMP_DIR}/${uuid()}`
      await fs.promises.writeFile(tmpfile, buf)
      const result = await getAudioTime(tmpfile, ffmpeg)
      if (result.code === 1) time = result.data
      buf = await fs.promises.readFile(tmpfile)
      fs.unlink(tmpfile, () => {})
      buffer = result.buffer ?? buf
    } else {
      const tmpfile = `${TMP_DIR}/${uuid()}`
      const result = await getAudioTime(tmpfile, ffmpeg)
      if (result.code === 1) time = result.data
      await fs.promises.writeFile(tmpfile, buf)
      buffer = await audioTrans(tmpfile, ffmpeg) as any
      fs.unlink(tmpfile, () => {})
    }
  } else if (file.startsWith('http://') || file.startsWith('https://')) {
    const headers = {
      'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 12; MI 9 Build/SKQ1.211230.001)'
    }
    const response = await axios.get(file, { headers, responseType: 'arraybuffer' })
    const buf = Buffer.from(response.data)
    const tmpfile = `${TMP_DIR}/${uuid()}`
    await fs.promises.writeFile(tmpfile, buf)
    const head = await read7Bytes(tmpfile)
    const result = await getAudioTime(tmpfile, ffmpeg)
    if (result.code === 1) time = result.data
    if (head.includes('SILK') || head.includes('AMR') || ! transcoding) {
      buffer = result.buffer ?? buf
    } else {
      buffer = await audioTrans(tmpfile, ffmpeg) as any
    }
    fs.unlink(tmpfile, () => {})
  } else {
    file = String(file).replace(/^file:\/{2}/, '')
    IS_WIN && file.startsWith('/') && (file = file.slice(1))
    const head = await read7Bytes(file)
    const result = await getAudioTime(file, ffmpeg)
    if (result.code === 1) time = result.data
    if (head.includes('SILK') || head.includes('AMR') || ! transcoding) {
      buffer = result.buffer ?? (await fs.promises.readFile(file))
    } else {
      buffer = await audioTrans(file, ffmpeg) as any
    }
  }
  return { buffer, time }
}

async function getAudioTime (file: string, ffmpeg = 'ffmpeg'): Promise<{ code: number; buffer?: Buffer | null; data?: { time: string; seconds: number; exec_text: string } }> {
  return new Promise((resolve) => {
    const file_info = fs.statSync(file)
    let cmd = `${ffmpeg} -i "${file}"`
    let is_aac = false
    if (file_info.size >= 10485760) {
      cmd = `${ffmpeg} -i "${file}" -fs 10485600 -ab 128k "${file}.mp3"`
      is_aac = true
    }
    exec(cmd, (error, stdout, stderr) => {
      try {
        let buffer: Buffer | null = null
        if (is_aac) {
          buffer = fs.readFileSync(`${file}.mp3`)
          fs.unlinkSync(`${file}.mp3`)
        }
        const time = stderr.split('Duration:')[1]?.split(',')[0]?.trim()
        const arr = time?.split(':') ?? []
        arr.reverse()
        let n = 1
        let s = 0
        for (const val of arr) {
          if (parseInt(val) > 0) s += parseInt(val) * n
          n *= 60
        }
        resolve({
          code: 1,
          buffer,
          data: {
            time: time ?? '0:00:00',
            seconds: s,
            exec_text: stderr
          }
        })
      } catch (err) {
        resolve({ code: - 1 })
      }
    })
  })
}
async function audioTrans (file: string, ffmpeg = 'ffmpeg') {
  const result = await new Promise((resolve) => {
    const tmpfile = TMP_DIR + '/' + uuid() + '.pcm'
    exec(`${ffmpeg} -y -i "${file}" -f s16le -ar 24000 -ac 1 -fs 31457280 "${tmpfile}"`, async () => {
      try {
        const silk_worker = await import('./silk_worker/index.cjs' as any)
        const ret = await silk_worker.encode(tmpfile, 24000)
        resolve(Buffer.from(ret.data))
      } catch (err) {
        logger.error('音频转码到pcm失败，请确认你的ffmpeg可以处理此转换')
        resolve(false)
      } finally {
        fs.unlink(tmpfile, () => {})
      }
    })
  })
  if (result) return result
  return await audioTrans1(file, ffmpeg)
}

async function audioTrans1 (file: string, ffmpeg = 'ffmpeg') {
  return new Promise((resolve) => {
    const tmpfile = TMP_DIR + '/' + uuid()
    exec(`${ffmpeg} -y -i "${file}" -ac 1 -ar 8000 -f amr "${tmpfile}"`, async () => {
      try {
        const amr = await fs.promises.readFile(tmpfile)
        resolve(amr)
      } catch (err) {
        logger.error('音频转码到amr失败，请确认你的ffmpeg可以处理此转换')
        resolve(false)
      } finally {
        fs.unlink(tmpfile, () => {})
      }
    })
  })
}

async function read7Bytes (file: string) {
  const fd = await fs.promises.open(file, 'r')
  const buf = (await fd.read(Buffer.alloc(7), 0, 7, 0)).buffer
  fd.close()
  return buf
}

function uuid () {
  const hex = crypto.randomBytes(16).toString('hex')
  return hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20)
}

/** 计算流的md5 */
function md5Stream (readable: fs.ReadStream) {
  return new Promise((resolve, reject) => {
    readable.on('error', reject)
    readable.pipe(crypto.createHash('md5').on('error', reject).on('data', resolve))
  })
}


function int32ip2str (ip: number) {
  if (typeof ip === 'string') return ip
  ip = ip & 0xffffffff
  return [ ip & 0xff, (ip & 0xff00) >> 8, (ip & 0xff0000) >> 16, ((ip & 0xff000000) >> 24) & 0xff ].join('.')
}


const IS_WIN = os.platform() === 'win32'
/** 系统临时目录，用于临时存放下载的图片等内容 */
const TMP_DIR = os.tmpdir()
/** 最大上传和下载大小，以图片上传限制为准：30MB */
const MAX_UPLOAD_SIZE = 31457280

/** md5 hash */
const md5 = (data: Buffer | crypto.BinaryLike) => (0, crypto.createHash)('md5').update(data).digest()

errors.LoginErrorCode = errors.drop = errors.ErrorCode
let ErrorCode
(function (ErrorCode) {
  /** 客户端离线 */
  ErrorCode[(ErrorCode.ClientNotOnline = - 1)] = 'ClientNotOnline'
  /** 发包超时未收到服务器回应 */
  ErrorCode[(ErrorCode.PacketTimeout = - 2)] = 'PacketTimeout'
  /** 用户不存在 */
  ErrorCode[(ErrorCode.UserNotExists = - 10)] = 'UserNotExists'
  /** 群不存在(未加入) */
  ErrorCode[(ErrorCode.GroupNotJoined = - 20)] = 'GroupNotJoined'
  /** 群员不存在 */
  ErrorCode[(ErrorCode.MemberNotExists = - 30)] = 'MemberNotExists'
  /** 发消息时传入的参数不正确 */
  ErrorCode[(ErrorCode.MessageBuilderError = - 60)] = 'MessageBuilderError'
  /** 群消息被风控发送失败 */
  ErrorCode[(ErrorCode.RiskMessageError = - 70)] = 'RiskMessageError'
  /** 群消息有敏感词发送失败 */
  ErrorCode[(ErrorCode.SensitiveWordsError = - 80)] = 'SensitiveWordsError'
  /** 上传图片/文件/视频等数据超时 */
  ErrorCode[(ErrorCode.HighwayTimeout = - 110)] = 'HighwayTimeout'
  /** 上传图片/文件/视频等数据遇到网络错误 */
  ErrorCode[(ErrorCode.HighwayNetworkError = - 120)] = 'HighwayNetworkError'
  /** 没有上传通道 */
  ErrorCode[(ErrorCode.NoUploadChannel = - 130)] = 'NoUploadChannel'
  /** 不支持的file类型(没有流) */
  ErrorCode[(ErrorCode.HighwayFileTypeError = - 140)] = 'HighwayFileTypeError'
  /** 文件安全校验未通过不存在 */
  ErrorCode[(ErrorCode.UnsafeFile = - 150)] = 'UnsafeFile'
  /** 离线(私聊)文件不存在 */
  ErrorCode[(ErrorCode.OfflineFileNotExists = - 160)] = 'OfflineFileNotExists'
  /** 群文件不存在(无法转发) */
  ErrorCode[(ErrorCode.GroupFileNotExists = - 170)] = 'GroupFileNotExists'
  /** 获取视频中的图片失败 */
  ErrorCode[(ErrorCode.FFmpegVideoThumbError = - 210)] = 'FFmpegVideoThumbError'
  /** 音频转换失败 */
  ErrorCode[(ErrorCode.FFmpegPttTransError = - 220)] = 'FFmpegPttTransError'
})((ErrorCode = errors.ErrorCode || (errors.ErrorCode = {})))
const ErrorMessage = {
  [ErrorCode.UserNotExists]: '查无此人',
  [ErrorCode.GroupNotJoined]: '未加入的群',
  [ErrorCode.MemberNotExists]: '幽灵群员',
  [ErrorCode.RiskMessageError]: '群消息发送失败，可能被风控',
  [ErrorCode.SensitiveWordsError]: '群消息发送失败，请检查消息内容',
  10: '消息过长',
  34: '消息过长',
  120: '在该群被禁言',
  121: 'AT全体剩余次数不足'
}
function drop (code: string | number, message: string | any[]) {
  if (! message || ! message.length) message = ErrorMessage[code as any]
  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw new core.ApiRejection(code as number, message as string)
}
errors.drop = drop
/** 登录时可能出现的错误，不在列的都属于未知错误，暂时无法解决 */
let LoginErrorCode
(function (LoginErrorCode) {
  /** 密码错误 */
  LoginErrorCode[(LoginErrorCode.WrongPassword = 1)] = 'WrongPassword'
  /** 账号被冻结 */
  LoginErrorCode[(LoginErrorCode.AccountFrozen = 40)] = 'AccountFrozen'
  /** 发短信太频繁 */
  LoginErrorCode[(LoginErrorCode.TooManySms = 162)] = 'TooManySms'
  /** 短信验证码错误 */
  LoginErrorCode[(LoginErrorCode.WrongSmsCode = 163)] = 'WrongSmsCode'
  /** 滑块ticket错误 */
  LoginErrorCode[(LoginErrorCode.WrongTicket = 237)] = 'WrongTicket'
})((LoginErrorCode = errors.LoginErrorCode || (errors.LoginErrorCode = {})))
