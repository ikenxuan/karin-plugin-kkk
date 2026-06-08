import type { ConfigType } from '../../../types/config'
import type { NumberValidationRule } from './types'
import { getValue, includesValue, isConfigRecord, toPathKey } from './utils'

const getNumberError = (value: unknown, rule: NumberValidationRule): string => {
  const numberValue = Number(value)

  if (!Number.isFinite(numberValue)) {
    return `${rule.label} 必须是数字`
  }

  if (rule.min !== undefined && numberValue < rule.min) {
    return rule.error || `${rule.label} 不能小于 ${rule.min}`
  }

  if (rule.max !== undefined && numberValue > rule.max) {
    return rule.error || `${rule.label} 不能大于 ${rule.max}`
  }

  return ''
}

const addNumberValidation = (
  errors: Record<string, string>,
  config: ConfigType,
  rule: NumberValidationRule
) => {
  if (rule.disabled) return
  const error = getNumberError(getValue(config, rule.path, 0), rule)
  if (error) errors[toPathKey(rule.path)] = error
}

const isValidGroupBinding = (value: unknown): value is string => {
  return typeof value === 'string' && /.+:.+/.test(value)
}

const validatePushList = (
  errors: Record<string, string>,
  key: 'douyin' | 'bilibili',
  items: unknown
) => {
  if (!Array.isArray(items)) {
    errors[`pushlist.${key}`] = `${key} 推送列表必须是数组`
    return
  }

  const invalidIndex = items.findIndex((item) => {
    if (!isConfigRecord(item)) return true
    const groupId = item.group_id
    const requiredId = key === 'douyin' ? item.short_id : item.host_mid

    if (requiredId === undefined || requiredId === null || String(requiredId).trim() === '') {
      return true
    }

    return !Array.isArray(groupId) || groupId.length === 0 || groupId.some((value) => !isValidGroupBinding(value))
  })

  if (invalidIndex >= 0) {
    errors[`pushlist.${key}`] = `${key} 推送列表第 ${invalidIndex + 1} 项缺少必填 UID/抖音号，或 group_id 未使用「群号:机器人账号」格式`
  }
}

export const validateConfig = (config: ConfigType | null): Record<string, string> => {
  if (!config) return {}

  const errors: Record<string, string> = {}
  const appLivePhotoMode = getValue<string>(config, ['app', 'livePhotoMode'], 'video_and_livephoto')
  const appApiServerMount = getValue<boolean>(config, ['app', 'APIServerMount'], false)
  const uploadVideoSendMode = getValue<string>(config, ['upload', 'videoSendMode'], 'file')
  const uploadUseGroupFile = getValue<boolean>(config, ['upload', 'usegroupfile'], false)
  const uploadUseFileLimit = getValue<boolean>(config, ['upload', 'usefilelimit'], false)
  const uploadCompress = getValue<boolean>(config, ['upload', 'compress'], false)
  const uploadDownloadThrottle = getValue<boolean>(config, ['upload', 'downloadThrottle'], false)
  const uploadDownloadAutoReduce = getValue<boolean>(config, ['upload', 'downloadAutoReduce'], false)
  const proxyEnabled = getValue<boolean>(config, ['request', 'proxy', 'switch'], false)
  const douyinEnabled = getValue<boolean>(config, ['douyin', 'switch'], false)
  const douyinSendContent = getValue<string[]>(config, ['douyin', 'sendContent'], [])
  const douyinBurnDanmaku = getValue<boolean>(config, ['douyin', 'burnDanmaku'], false)
  const douyinVideoQuality = getValue<string>(config, ['douyin', 'videoQuality'], 'adapt')
  const douyinPushEnabled = getValue<boolean>(config, ['douyin', 'push', 'switch'], false)
  const douyinPushQuality = getValue<string>(config, ['douyin', 'push', 'pushVideoQuality'], 'adapt')
  const bilibiliEnabled = getValue<boolean>(config, ['bilibili', 'switch'], false)
  const bilibiliSendContent = getValue<string[]>(config, ['bilibili', 'sendContent'], [])
  const bilibiliBurnDanmaku = getValue<boolean>(config, ['bilibili', 'burnDanmaku'], false)
  const bilibiliVideoQuality = getValue<number>(config, ['bilibili', 'videoQuality'], 0)
  const bilibiliPushEnabled = getValue<boolean>(config, ['bilibili', 'push', 'switch'], false)
  const bilibiliPushParsedynamic = getValue<boolean>(config, ['bilibili', 'push', 'parsedynamic'], false)
  const bilibiliPushQuality = getValue<number>(config, ['bilibili', 'push', 'pushVideoQuality'], 0)
  const kuaishouEnabled = getValue<boolean>(config, ['kuaishou', 'switch'], false)
  const kuaishouComment = getValue<boolean>(config, ['kuaishou', 'comment'], false)
  const xiaohongshuEnabled = getValue<boolean>(config, ['xiaohongshu', 'switch'], false)
  const xiaohongshuSendContent = getValue<string[]>(config, ['xiaohongshu', 'sendContent'], [])
  const xiaohongshuVideoQuality = getValue<string>(config, ['xiaohongshu', 'videoQuality'], 'adapt')

  const numberRules: NumberValidationRule[] = [
    { path: ['app', 'renderScale'], label: '渲染精度', min: 50, max: 200 },
    { path: ['app', 'RenderWaitTime'], label: '渲染图片的等待时间', min: 0 },
    { path: ['app', 'multiPageHeight'], label: '分页渲染时，每页的高度', min: 1000, max: 20000, disabled: !getValue<boolean>(config, ['app', 'multiPageRender'], true), error: '请输入一个范围在 1000 到 20000 之间的数字' },
    { path: ['app', 'APIServerPort'], label: 'API服务端口', min: 1024, max: 65535, disabled: appApiServerMount, error: '请输入一个范围在 1024 到 65535 之间的数字' },
    { path: ['upload', 'groupfilevalue'], label: '群文件上传阈值', min: 1, disabled: !uploadUseGroupFile || uploadVideoSendMode === 'base64' },
    { path: ['upload', 'filelimit'], label: '视频拦截阈值', min: 1, disabled: !uploadUseFileLimit },
    { path: ['upload', 'compresstrigger'], label: '压缩触发阈值', min: 1, disabled: !uploadCompress },
    { path: ['upload', 'compressvalue'], label: '压缩后的值', min: 1, disabled: !uploadCompress },
    { path: ['upload', 'downloadMaxSpeed'], label: '最大下载速度', min: 1, max: 1000, disabled: !uploadDownloadThrottle, error: '请输入一个范围在 1 到 1000 之间的数字' },
    { path: ['upload', 'downloadMinSpeed'], label: '最低下载速度', min: 0.1, max: 100, disabled: !uploadDownloadThrottle || !uploadDownloadAutoReduce, error: '请输入一个范围在 0.1 到 100 之间的数字' },
    { path: ['request', 'timeout'], label: '请求超时时间', min: 1000, max: 300000, error: '请输入一个范围在 1000 到 300000 之间的数字' },
    { path: ['request', 'proxy', 'port'], label: '代理端口', min: 1, max: 65535, disabled: !proxyEnabled, error: '请输入一个范围在 1 到 65535 之间的数字' },
    { path: ['douyin', 'numcomment'], label: '评论解析数量', min: 1, disabled: !douyinEnabled || !includesValue(douyinSendContent, 'comment') },
    { path: ['douyin', 'subCommentLimit'], label: '次级评论解析数量', min: 1, max: 20, disabled: !douyinEnabled || !includesValue(douyinSendContent, 'comment') },
    { path: ['douyin', 'maxAutoVideoSize'], label: '视频体积上限（MB）', min: 1, max: 20000, disabled: !douyinEnabled || douyinVideoQuality !== 'adapt' },
    { path: ['douyin', 'danmakuOpacity'], label: '弹幕透明度', min: 0, max: 100, disabled: !douyinEnabled || !douyinBurnDanmaku },
    { path: ['douyin', 'push', 'pushMaxAutoVideoSize'], label: '推送视频体积上限（MB）', min: 1, max: 20000, disabled: !douyinPushEnabled || douyinPushQuality !== 'adapt' },
    { path: ['bilibili', 'numcomment'], label: '评论解析数量', min: 1, disabled: !bilibiliEnabled || !includesValue(bilibiliSendContent, 'comment') },
    { path: ['bilibili', 'maxAutoVideoSize'], label: '视频体积上限（MB）', min: 1, max: 20000, disabled: !bilibiliEnabled || Number(bilibiliVideoQuality) !== 0 },
    { path: ['bilibili', 'danmakuOpacity'], label: '弹幕透明度', min: 0, max: 100, disabled: !bilibiliEnabled || !bilibiliBurnDanmaku },
    { path: ['bilibili', 'push', 'pushMaxAutoVideoSize'], label: '视频动态的视频体积上限（MB）', min: 1, max: 20000, disabled: !bilibiliPushEnabled || !bilibiliPushParsedynamic || Number(bilibiliPushQuality) !== 0 },
    { path: ['kuaishou', 'numcomment'], label: '评论解析数量', min: 1, disabled: !kuaishouEnabled || !kuaishouComment },
    { path: ['xiaohongshu', 'numcomment'], label: '评论解析数量', min: 1, disabled: !xiaohongshuEnabled || !includesValue(xiaohongshuSendContent, 'comment') },
    { path: ['xiaohongshu', 'maxAutoVideoSize'], label: '视频体积上限（MB）', min: 1, max: 20000, disabled: !xiaohongshuEnabled || xiaohongshuVideoQuality !== 'adapt' }
  ]

  numberRules.forEach((rule) => addNumberValidation(errors, config, rule))

  if (appLivePhotoMode === 'video_only') {
    delete errors['app.livePhotoSystem']
  }

  validatePushList(errors, 'douyin', config.pushlist?.douyin || [])
  validatePushList(errors, 'bilibili', config.pushlist?.bilibili || [])

  return errors
}
