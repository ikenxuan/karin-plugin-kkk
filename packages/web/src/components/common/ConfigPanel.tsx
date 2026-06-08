/**
 * 通用配置管理面板。
 * 配置项直接在前端硬编码，不依赖 Karin schema 数据。
 */

import { useEffect, useMemo, useRef, type FormEvent, type Key, type ReactNode } from 'react'
import {
  Button,
  Card,
  Checkbox,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Popover,
  Select,
  Spinner,
  Switch,
  Tabs,
  TextField,
  Tooltip,
  toast
} from '@heroui/react'
import { useMemoizedFn, useRequest, useSetState, useUpdateEffect } from 'ahooks'
import gsap from 'gsap'
import { Info, RotateCcw, Save } from 'lucide-react'
import { getConfig, saveConfig } from '../../api/config'
import type { ConfigType } from '../../types/config'
import { desktopConfigPanelClasses } from '../../styles/desktopConfigPanel'
import { mobileConfigPanelClasses } from '../../styles/mobileConfigPanel'
import { fadeInFrom, fadeInTo, getAnimationDuration, getStaggerDelay } from '../../utils/animations'
import { getDisabledTooltip } from '../../config/disabledRules'
import PushlistManager, { type DouyinPushItem, type BilibiliPushItem } from '../pushlist/PushlistManager'

type ConfigPath = Array<string | number>
type ConfigRecord = Record<string | number, unknown>
type SelectOption = {
  label: string
  value: string
  description?: string
  disabled?: boolean
}
type TextFieldOptions = {
  type?: 'text' | 'number' | 'password'
  placeholder?: string
  disabled?: boolean
  fallback?: number
  min?: number
  max?: number
  step?: number
  pattern?: string
  error?: string
}
type NumberValidationRule = {
  path: ConfigPath
  label: string
  min?: number
  max?: number
  disabled?: boolean
  error?: string
}
type DeviceLayout = 'desktop' | 'mobile'
export type ConfigFileKey = 'cookies' | 'app' | 'upload' | 'request' | 'douyin' | 'bilibili' | 'kuaishou' | 'xiaohongshu' | 'pushlist'
export type ConfigDescription = ReactNode | ConfigHelp

export interface ConfigHelp {
  description: ReactNode
  desktopContent?: ReactNode
  mobileContent?: ReactNode
  extra?: ReactNode
}

interface ConfigPanelProps {
  device?: DeviceLayout
}

const sendContentOptions: SelectOption[] = [
  { label: '信息', value: 'info' },
  { label: '评论图', value: 'comment' },
  { label: '视频', value: 'video' },
  { label: '图片', value: 'image' }
]

const displayContentOptions: SelectOption[] = [
  { label: '封面', value: 'cover' },
  { label: '标题', value: 'title' },
  { label: '作者', value: 'author' },
  { label: '统计', value: 'stats' },
  { label: '简介', value: 'desc' }
]

const qualityOptions: SelectOption[] = [
  { label: '自动选择', value: 'adapt', description: '根据「视频体积上限（MB）」自动选择分辨率进行下载' },
  { label: '标清 540p', value: '540p' },
  { label: '高清 720p', value: '720p' },
  { label: '高清 1080p', value: '1080p' },
  { label: '超清 2k', value: '2k' },
  { label: '超清 4k', value: '4k' }
]

const bilibiliQualityOptions: SelectOption[] = [
  { label: '自动选择', value: '0' },
  { label: '240P 极速', value: '6' },
  { label: '360P 流畅', value: '16' },
  { label: '480P 清晰', value: '32', description: '需登录（配置ck）' },
  { label: '720P 高清', value: '64', description: '需登录（配置ck）' },
  { label: '720P60 高帧率', value: '74', description: '需登录（配置ck）' },
  { label: '1080P 高清', value: '80', description: '需登录（配置ck）' },
  { label: '1080P+ 高码率', value: '112', description: '需大会员&视频支持' },
  { label: '1080P60 高帧率', value: '116', description: '需大会员&视频支持' },
  { label: '4K 超清', value: '120', description: '需大会员&视频支持' },
  { label: '8K 超高清', value: '127', description: '需大会员&视频支持' }
]

const permissionOptions: SelectOption[] = [
  { label: '所有人', value: 'all' },
  { label: '管理员', value: 'admin' },
  { label: '主人', value: 'master' },
  { label: '群主', value: 'group.owner' },
  { label: '群管理员', value: 'group.admin' }
]

const videoCodecOptions: SelectOption[] = [
  { label: 'H.264', value: 'h264', description: '兼容性最好，支持几乎所有设备' },
  { label: 'H.265', value: 'h265', description: '压缩率更高，近几年设备支持良好（推荐）' },
  { label: 'AV1', value: 'av1', description: '最新编码格式，压缩率最高，但编码较慢' }
]

const verticalModeOptions: SelectOption[] = [
  { label: '关闭', value: 'off', description: '保持原始比例，不做转换' },
  { label: '智能', value: 'standard', description: '仅对宽屏比例视频生效' },
  { label: '强制 9:16', value: 'force', description: '所有视频统一转为 9:16 竖屏' }
]

const danmakuAreaOptions: SelectOption[] = [
  { label: '1/4 屏', value: '0.25', description: '仅顶部区域' },
  { label: '半屏', value: '0.5', description: '上半部分（推荐）' },
  { label: '3/4 屏', value: '0.75', description: '大部分区域' },
  { label: '全屏', value: '1', description: '铺满整个画面' }
]

const fontSizeOptions: SelectOption[] = [
  { label: '小号', value: 'small' },
  { label: '中号', value: 'medium' },
  { label: '大号', value: 'large' }
]

const booleanText = {
  enabled: '已开启',
  disabled: '已关闭'
}

const configFiles: Array<{ key: ConfigFileKey; label: string; description: string }> = [
  { key: 'cookies', label: 'Cookies', description: '各平台 Cookie' },
  { key: 'app', label: '应用', description: '运行与交互' },
  { key: 'upload', label: '上传下载', description: '上传与限速' },
  { key: 'request', label: '请求', description: 'UA 与代理' },
  { key: 'douyin', label: '抖音', description: '解析与推送' },
  { key: 'bilibili', label: 'B站', description: '解析与推送' },
  { key: 'kuaishou', label: '快手', description: '快手解析' },
  { key: 'xiaohongshu', label: '小红书', description: '小红书解析' },
  { key: 'pushlist', label: '推送列表', description: '订阅 JSON' }
]

/**
 * 将配置路径转换为稳定 key。
 */
const toPathKey = (path: ConfigPath): string => {
  return path.join('.')
}

/**
 * 判断值是否为可继续访问的配置对象。
 */
const isConfigRecord = (value: unknown): value is ConfigRecord => {
  return Boolean(value && typeof value === 'object')
}

/**
 * 按设备选择独立文件中的配置面板布局类。
 */
const getLayoutClasses = (device: DeviceLayout) => {
  return device === 'mobile' ? mobileConfigPanelClasses : desktopConfigPanelClasses
}

/**
 * 读取嵌套路径上的配置值。
 */
const getValue = <T,>(source: ConfigType | null, path: ConfigPath, fallback: T): T => {
  if (!source) return fallback

  const result = path.reduce<unknown>((current, key) => {
    if (!isConfigRecord(current)) return undefined
    return current[key]
  }, source)

  return (result === undefined || result === null ? fallback : result) as T
}

/**
 * 写入嵌套路径上的配置值，并保留未展示字段。
 */
const setValue = (source: ConfigType, path: ConfigPath, value: unknown): ConfigType => {
  const cloned = structuredClone(source)
  let current: ConfigRecord = cloned as ConfigRecord

  for (let index = 0; index < path.length - 1; index++) {
    const key = path[index]
    const nextValue = current[key]
    // 缺失路径时按对象补齐，避免局部字段更新失败。
    if (!isConfigRecord(nextValue)) {
      current[key] = {}
    }
    current = current[key] as ConfigRecord
  }

  current[path[path.length - 1]] = value
  return cloned
}

/**
 * 将字符串转换为数字，空值时使用 fallback。
 */
const toNumber = (value: string, fallback: number): number => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

/**
 * 判断数组中是否包含指定值。
 */
const includesValue = (values: unknown, value: string): boolean => {
  return Array.isArray(values) && values.includes(value)
}

/**
 * 判断配置说明是否包含额外的桌面或手机提示内容。
 */
const isConfigHelp = (value: ConfigDescription): value is ConfigHelp => {
  return Boolean(value && typeof value === 'object' && 'description' in value)
}

/**
 * 获取数字字段的校验错误。
 */
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

/**
 * 写入数字字段校验结果。
 */
const addNumberValidation = (
  errors: Record<string, string>,
  config: ConfigType,
  rule: NumberValidationRule
) => {
  if (rule.disabled) return
  const error = getNumberError(getValue(config, rule.path, 0), rule)
  if (error) errors[toPathKey(rule.path)] = error
}

/**
 * 判断推送群绑定格式是否正确。
 */
const isValidGroupBinding = (value: unknown): value is string => {
  return typeof value === 'string' && /.+:.+/.test(value)
}

/**
 * 校验推送列表 JSON 中的旧 web.config.ts 规则。
 */
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

/**
 * 校验当前硬编码配置字段。
 */
const validateConfig = (config: ConfigType | null): Record<string, string> => {
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

/**
 * 通用配置面板组件。
 */
const ConfigPanel = ({ device = 'desktop' }: ConfigPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const [state, setPanelState] = useSetState({
    config: null as ConfigType | null,
    savedSnapshot: '',
    activeFile: 'cookies' as ConfigFileKey
  })
  const { activeFile, config, savedSnapshot } = state
  const classes = useMemo(() => getLayoutClasses(device), [device])
  const controlSize = device === 'mobile' ? 'sm' : 'md'
  const appLivePhotoMode = getValue<string>(config, ['app', 'livePhotoMode'], 'video_and_livephoto')
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
  const douyinVideoInfoMode = getValue<string>(config, ['douyin', 'videoInfoMode'], 'text')
  const douyinPushEnabled = getValue<boolean>(config, ['douyin', 'push', 'switch'], false)
  const douyinPushQuality = getValue<string>(config, ['douyin', 'push', 'pushVideoQuality'], 'adapt')
  const bilibiliEnabled = getValue<boolean>(config, ['bilibili', 'switch'], false)
  const bilibiliSendContent = getValue<string[]>(config, ['bilibili', 'sendContent'], [])
  const bilibiliBurnDanmaku = getValue<boolean>(config, ['bilibili', 'burnDanmaku'], false)
  const bilibiliVideoQuality = getValue<number>(config, ['bilibili', 'videoQuality'], 0)
  const bilibiliVideoInfoMode = getValue<string>(config, ['bilibili', 'videoInfoMode'], 'text')
  const bilibiliPushEnabled = getValue<boolean>(config, ['bilibili', 'push', 'switch'], false)
  const bilibiliPushParsedynamic = getValue<boolean>(config, ['bilibili', 'push', 'parsedynamic'], false)
  const bilibiliPushQuality = getValue<number>(config, ['bilibili', 'push', 'pushVideoQuality'], 0)
  const kuaishouEnabled = getValue<boolean>(config, ['kuaishou', 'switch'], false)
  const kuaishouComment = getValue<boolean>(config, ['kuaishou', 'comment'], false)
  const xiaohongshuEnabled = getValue<boolean>(config, ['xiaohongshu', 'switch'], false)
  const xiaohongshuSendContent = getValue<string[]>(config, ['xiaohongshu', 'sendContent'], [])
  const xiaohongshuVideoQuality = getValue<string>(config, ['xiaohongshu', 'videoQuality'], 'adapt')

  /**
   * 获取配置并建立保存基准快照。
   */
  const { loading, run: fetchConfig } = useRequest(getConfig, {
    onSuccess: (data) => {
      setPanelState({
        config: data,
        savedSnapshot: JSON.stringify(data)
      })
    },
    onError: (error) => {
      toast.danger('加载配置失败', { description: error.message })
    }
  })

  /**
   * 保存当前配置。
   */
  const { loading: saving, runAsync: submitConfig } = useRequest(saveConfig, {
    manual: true
  })

  const hasChanges = useMemo(() => {
    return config ? JSON.stringify(config) !== savedSnapshot : false
  }, [config, savedSnapshot])

  const validationErrors = useMemo(() => {
    return validateConfig(config)
  }, [config])

  const hasValidationError = useMemo(() => {
    return Object.values(validationErrors).some(Boolean)
  }, [validationErrors])

  /**
   * 更新某个配置路径。
   */
  const updateConfigValue = useMemoizedFn((path: ConfigPath, value: unknown) => {
    setPanelState((current) => {
      if (!current.config) return null
      return { config: setValue(current.config, path, value) }
    })
  })

  /**
   * 切换多选数组中的一个值。
   */
  const toggleArrayValue = useMemoizedFn((path: ConfigPath, value: string, selected: boolean) => {
    const currentValues = getValue<string[]>(config, path, [])
    const nextValues = selected
      ? Array.from(new Set([...currentValues, value]))
      : currentValues.filter((item) => item !== value)

    updateConfigValue(path, nextValues)
  })

  /**
   * 提交保存。
   */
  const handleSave = useMemoizedFn(() => {
    if (!config || hasValidationError) return

    const nextConfig = config
    const nextSnapshot = JSON.stringify(nextConfig)
    const savePromise = submitConfig(nextConfig).then(() => {
      setPanelState({ savedSnapshot: nextSnapshot })
    })

    toast.promise(savePromise, {
      loading: '正在保存配置...',
      success: '配置已保存',
      error: (error) => error instanceof Error ? error.message : '保存配置失败'
    })
  })

  /**
   * 重新拉取配置，丢弃本地未保存改动。
   */
  const handleReset = useMemoizedFn(() => {
    fetchConfig()
  })

  const handleTabChange = useMemoizedFn((key: Key) => {
    setPanelState({ activeFile: key as ConfigFileKey })
  })

  const handleFormSubmit = useMemoizedFn((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSave()
  })

  /**
   * 渲染配置字段说明，并按设备提供可扩展的 Tooltip 内容。
   */
  const renderHelp = (help: ConfigDescription) => {
    const normalizedHelp: ConfigHelp = isConfigHelp(help) ? help : { description: help }
    const tooltipContent = device === 'mobile'
      ? normalizedHelp.mobileContent ?? normalizedHelp.desktopContent
      : normalizedHelp.desktopContent

    return (
      <Description className="flex items-center gap-2">
        <span>{normalizedHelp.description}</span>
        {tooltipContent ? (
          <Tooltip delay={0}>
            <Tooltip.Trigger aria-label="查看详细说明">
              <Button isIconOnly size="sm" variant="tertiary">
                <Info className="size-4" aria-hidden="true" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content showArrow placement={device === 'mobile' ? 'bottom' : 'top'}>
              <Tooltip.Arrow />
              <div className="max-w-72">{tooltipContent}</div>
            </Tooltip.Content>
          </Tooltip>
        ) : null}
        {normalizedHelp.extra}
      </Description>
    )
  }

  /**
   * 给禁用的字段包装 Tooltip（桌面端）或 Popover（移动端）提示
   */
  const wrapWithDisabledTooltip = (element: ReactNode, path: ConfigPath, disabled: boolean) => {
    if (!disabled) return element

    const tooltipMessage = getDisabledTooltip(config, path)
    if (!tooltipMessage) return element

    // 移动端使用 Popover（点击触发），桌面端使用 Tooltip（悬停触发）
    if (device === 'mobile') {
      return (
        <Popover>
          <Popover.Trigger className="w-full cursor-not-allowed">
            {element}
          </Popover.Trigger>
          <Popover.Content placement="bottom">
            <Popover.Dialog>
              <Popover.Arrow />
              <div className="max-w-72 text-sm">{tooltipMessage}</div>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      )
    }

    // 桌面端使用 Tooltip
    return (
      <Tooltip delay={0}>
        <Tooltip.Trigger className="w-full cursor-not-allowed">
          {element}
        </Tooltip.Trigger>
        <Tooltip.Content showArrow placement="top">
          <Tooltip.Arrow />
          <div className="max-w-72">{tooltipMessage}</div>
        </Tooltip.Content>
      </Tooltip>
    )
  }

  /**
   * 渲染布尔开关字段。
   */
  const renderSwitch = (path: ConfigPath, label: string, help?: ConfigDescription, disabled = false) => {
    const selected = getValue<boolean>(config, path, false)

    const switchElement = (
      <Switch
        isDisabled={disabled}
        isSelected={selected}
        onChange={(isSelected) => updateConfigValue(path, isSelected)}
      >
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Content>
          <Label className='font-semibold'>{label}</Label>
          {renderHelp(help || (selected ? booleanText.enabled : booleanText.disabled))}
        </Switch.Content>
      </Switch>
    )

    return wrapWithDisabledTooltip(switchElement, path, disabled)
  }

  /**
   * 渲染单行文本或数字字段。
   */
  const renderTextField = (
    path: ConfigPath,
    label: string,
    help: ConfigDescription,
    options?: TextFieldOptions
  ) => {
    const type = options?.type || 'text'
    const value = String(getValue(config, path, type === 'number' ? options?.fallback ?? 0 : ''))
    const error = validationErrors[toPathKey(path)]
    const disabled = options?.disabled ?? false

    const fieldElement = (
      <TextField
        fullWidth
        isInvalid={Boolean(error)}
        isDisabled={disabled}
        name={path.join('.')}
        type={type}
        value={value}
        onChange={(nextValue) => {
          const parsedValue = type === 'number' ? toNumber(nextValue, options?.fallback ?? 0) : nextValue
          updateConfigValue(path, parsedValue)
        }}
      >
        <Label className='font-semibold'>{label}</Label>
        <Input
          max={options?.max}
          min={options?.min}
          pattern={options?.pattern}
          placeholder={options?.placeholder || label}
          step={options?.step}
        />
        {error ? <FieldError>{error}</FieldError> : renderHelp(help)}
      </TextField>
    )

    return wrapWithDisabledTooltip(fieldElement, path, disabled)
  }

  /**
   * 渲染下拉选择字段。
   */
  const renderSelectField = (
    path: ConfigPath,
    label: string,
    help: ConfigDescription,
    options: SelectOption[],
    parser: (value: string) => unknown = (value) => value,
    disabled = false
  ) => {
    const value = String(getValue(config, path, options[0]?.value || ''))
    const disabledKeys = options.filter((item) => item.disabled).map((item) => item.value)

    const selectElement = (
      <Select
        disabledKeys={disabledKeys}
        fullWidth
        isDisabled={disabled}
        name={path.join('.')}
        placeholder={label}
        value={value}
        variant="secondary"
        onChange={(nextValue) => {
          if (nextValue === null || Array.isArray(nextValue)) return
          updateConfigValue(path, parser(String(nextValue)))
        }}
      >
        <Label className='font-semibold'>{label}</Label>
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        {renderHelp(help)}
        <Select.Popover>
          <ListBox>
            {options.map((item) => (
              <ListBox.Item key={item.value} id={item.value} textValue={item.label}>
                <div className="flex min-w-0 flex-col gap-1">
                  <Label>{item.label}</Label>
                  {item.description ? <Description>{item.description}</Description> : null}
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>
    )

    return wrapWithDisabledTooltip(selectElement, path, disabled)
  }

  /**
   * 渲染多选字段。
   */
  const renderCheckboxGroup = (
    path: ConfigPath,
    label: string,
    help: ConfigDescription,
    options: SelectOption[],
    disabled = false
  ) => {
    const values = getValue<string[]>(config, path, [])

    const groupElement = (
      <div className={classes.field}>
        <Label className='font-semibold'>{label}</Label>
        {renderHelp(help)}
        <div className={classes.choiceGrid}>
          {options.map((item) => {
            const selected = includesValue(values, item.value)
            return (
              <Checkbox
                key={item.value}
                isDisabled={disabled}
                isSelected={selected}
                onChange={(isSelected) => toggleArrayValue(path, item.value, isSelected)}
              >
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Checkbox.Content>
                  <Label>{item.label}</Label>
                  {item.description ? <Description>{item.description}</Description> : null}
                </Checkbox.Content>
              </Checkbox>
            )
          })}
        </div>
      </div>
    )

    return wrapWithDisabledTooltip(groupElement, path, disabled)
  }

  /**
   * 渲染页面标题（不带卡片）
   */
  const renderPageHeader = (title: string, description: string) => {
    return (
      <div className="mb-6" data-config-section>
        <h2 className="text-2xl font-bold">{title}</h2>
        <Description className="mt-1">{description}</Description>
      </div>
    )
  }

  /**
   * 渲染子卡片分组
   */
  const renderSubSection = (title: string, children: ReactNode) => {
    return (
      <Card data-config-section className="mb-4">
        <Card.Header className={classes.sectionHeader}>
          <Card.Title className="text-lg font-semibold">{title}</Card.Title>
        </Card.Header>
        <Card.Content className={classes.sectionContent}>
          <div className={classes.fields}>{children}</div>
        </Card.Content>
      </Card>
    )
  }

  /**
   * 播放当前配置文件面板的入场动画。
   */
  const animateCurrentPanel = useMemoizedFn(() => {
    if (!panelRef.current) return

    gsap.fromTo(
      panelRef.current.querySelectorAll('[data-config-section]'),
      fadeInFrom,
      {
        ...fadeInTo,
        duration: getAnimationDuration(0.35),
        stagger: getStaggerDelay(0.03)
      }
    )
  })

  useEffect(() => {
    if (!config || panelRef.current?.dataset.animated === 'true') return
    if (panelRef.current) panelRef.current.dataset.animated = 'true'
    animateCurrentPanel()
  }, [config, animateCurrentPanel])

  useUpdateEffect(() => {
    animateCurrentPanel()
  }, [activeFile])

  if (loading || !config) {
    return (
      <div className={`${classes.root} ${classes.loading}`}>
        <Spinner size="sm" aria-label="正在读取配置" />
        <span>正在读取配置</span>
      </div>
    )
  }

  return (
    <div ref={panelRef} className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerCopy}>
          <h2 className="text-2xl font-bold">配置管理</h2>
          <Description>直接读取并写回 Karin 插件配置文件，未展示字段会原样保留。</Description>
        </div>
      </div>
      <div className={classes.floatingActions}>
        <Tooltip delay={0}>
          <Tooltip.Trigger aria-label="重新读取配置">
            <Button isIconOnly size={controlSize} variant="secondary" isDisabled={loading || saving} onPress={handleReset}>
              <RotateCcw size={16} aria-hidden="true" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content showArrow placement="bottom">
            <Tooltip.Arrow />
            重新读取
          </Tooltip.Content>
        </Tooltip>
        <Button size={controlSize} isDisabled={!hasChanges || hasValidationError || loading} isPending={saving} onPress={handleSave} variant='tertiary'>
          <Save size={16} aria-hidden="true" />
          <span>保存</span>
        </Button>
      </div>

      <Form className={classes.form} onSubmit={handleFormSubmit}>
        <Tabs selectedKey={activeFile} onSelectionChange={handleTabChange}>
          <Tabs.ListContainer className={classes.tabsListContainer} data-scrollbar="none">
            <Tabs.List aria-label="配置文件选择" className={classes.tabsList}>
              {configFiles.map((item, index) => (
                <Tabs.Tab key={item.key} id={item.key}>
                  {index > 0 ? <Tabs.Separator /> : null}
                  <span>{item.label}</span>
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>

        {activeFile === 'cookies' ? (
          <>
            {renderPageHeader('Cookies', '各平台 Cookie。保存后后端会重载 amagi 客户端。')}

            {renderSubSection('平台 Cookies', (
              <>
                {renderTextField(['cookies', 'douyin'], '抖音 Cookies', '请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢。', { type: 'password' })}
                {renderTextField(['cookies', 'bilibili'], 'B站 Cookies', '请输入你的B站Cookies，不输入部分功能将受限噢。', { type: 'password' })}
                {renderTextField(['cookies', 'kuaishou'], '快手 Cookies', '请输入你的快手Cookies，不输入则无法使用快手相关功能噢。', { type: 'password' })}
                {renderTextField(['cookies', 'xiaohongshu'], '小红书 Cookies', '请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢。', { type: 'password' })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'app' ? (
          <>
            {renderPageHeader('应用', '插件运行、渲染、API 和交互相关配置。')}

            {renderSubSection('缓存设置', (
              <>
                {renderSwitch(['app', 'removeCache'], '自动删除视频缓存', '任务完成后删除下载缓存。')}
              </>
            ))}

            {renderSubSection('解析优先级设置', (
              <>
                {renderSwitch(['app', 'videoTool'], '默认解析优先级', '关闭后使用自定义优先级，修改后需重启。')}
                {renderTextField(['app', 'priority'], '自定义优先级', '默认解析优先级关闭后生效。', {
                  type: 'number',
                  disabled: getValue<boolean>(config, ['app', 'videoTool'], true),
                  fallback: 800
                })}
              </>
            ))}

            {renderSubSection('渲染配置', (
              <>
                {renderTextField(['app', 'renderScale'], '渲染精度', '可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度。', { type: 'number', fallback: 100, min: 50, max: 200 })}
                {renderSelectField(['app', 'Theme'], '渲染图片的主题色', '渲染评论图和推送图的主题色。', [
                  { label: '自动', value: '0', description: '06:00-18:00为浅色，18:00-06:00为深色' },
                  { label: '浅色', value: '1' },
                  { label: '深色', value: '2' }
                ], (value) => Number(value))}
                {renderSwitch(['app', 'RemoveWatermark'], '移除版本信息', '渲染的图片是否移除底部版本信息。')}
                {renderTextField(['app', 'RenderWaitTime'], '渲染图片的等待时间', '单位：秒，Linux系统下不能为0；其他系统传递 0 可禁用。', { type: 'number', fallback: 60, min: 0 })}
                {renderSwitch(['app', 'multiPageRender'], '分页渲染', '将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改！')}
                {renderTextField(['app', 'multiPageHeight'], '分页渲染时，每页的高度', '经测试最佳每页高度为12000px，默认12000px。', {
                  type: 'number',
                  disabled: !getValue<boolean>(config, ['app', 'multiPageRender'], true),
                  fallback: 12000,
                  min: 1000,
                  max: 20000
                })}
              </>
            ))}

            {renderSubSection('Live Photo 兼容设置', (
              <>
                {renderSelectField(['app', 'livePhotoMode'], 'Live Photo 处理和发送方式', '解析遇到实况图时的处理和发送方式。注意：生成视频性能开销大，2C2G 服务器单张约需 20 秒。', [
                  { label: '视频 + 实况图', value: 'video_and_livephoto', description: '生成并发送仿 iPhone Live Photo 播放效果的视频（播放三次）+ 对应系统的实况图' },
                  { label: '仅视频', value: 'video_only', description: '仅生成并发送仿 iPhone Live Photo 播放效果的视频（播放三次）' },
                  { label: '仅实况图', value: 'livephoto_only', description: '仅生成并发送对应系统的实况图，性能开销小' }
                ])}
                {renderSelectField(['app', 'livePhotoSystem'], 'Live Photo 静态图兼容系统', '当解析到作品/动态包含 Live Photo 时，合并转发里发送的 Live Photo 静态图按所选系统生成。推荐 OPPO，兼容性最广。', [
                  { label: 'Google', value: 'google', description: 'Google Motion Photo 格式' },
                  { label: '小米（HyperOS）', value: 'xiaomi', description: '兼容小米（任何版本）和 Google，但无法被 OPPO 识别' },
                  { label: 'OPPO（ColorOS）', value: 'oppo', description: '推荐，兼容 OPPO、小米（较新版本）和 Google' },
                  { label: '华为/荣耀（HarmonyOS/MagicOS）', value: 'huawei_honor', description: '理论可行但未实测（作者无对应设备）' },
                  { label: 'vivo（Origin OS）', value: 'vivo', description: '需要独立的图片和同名视频文件，暂不支持', disabled: true },
                  { label: 'iPhone（iOS）', value: 'iphone', description: '需要独立的图片和同名视频文件，暂不支持', disabled: true }
                ], (value) => value, appLivePhotoMode === 'video_only')}
              </>
            ))}

            {renderSubSection('API服务配置', (
              <>
                {renderSwitch(['app', 'APIServer'], 'API 服务', '本地部署一个视频解析API服务，接口范围为本插件用到的所有。')}
                {renderSwitch(['app', 'APIServerMount'], '挂载到 Karin', 'API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」。', !getValue<boolean>(config, ['app', 'APIServer'], false))}
                {renderTextField(['app', 'APIServerPort'], 'API 服务端口', '仅未挂载到 Karin 时生效。', {
                  type: 'number',
                  disabled: getValue<boolean>(config, ['app', 'APIServerMount'], true),
                  fallback: 4567,
                  min: 1024,
                  max: 65535
                })}
              </>
            ))}

            {renderSubSection('交互与认证设置', (
              <>
                {renderSwitch(['app', 'EmojiReply'], '表情回应', '在解析任务开始时添加表情回应，若适配器不支持需要关闭。')}
                {renderSwitch(['app', 'parseTip'], '解析提示', '发送提示信息："检测到xxx链接，开始解析"。')}
                {renderSwitch(['app', 'fakeForward'], '伪造合并转发消息', '开启后合并转发将使用触发者身份展示；关闭后使用机器人身份展示。')}
                {renderCheckboxGroup(['app', 'errorLogSendTo'], '错误日志', '遇到错误时谁会收到错误日志。注：推送任务只可发送给主人。「第一个主人」与「所有主人」互斥。', [
                  { label: '第一个主人', value: 'master' },
                  { label: '所有主人', value: 'allMasters' },
                  { label: '触发者的群聊', value: 'trigger' }
                ])}
              </>
            ))}

            {renderSubSection('我的小玩具配置', (
              <>
                {renderSelectField(['app', 'qrLoginAddrType'], '扫码登录地址', '生成登录二维码时使用的服务器地址。', [
                  { label: '局域网', value: 'lan', description: '适用于手机和服务器在同一局域网' },
                  { label: '外部地址', value: 'external', description: '适用于远程访问，需手动配置' }
                ])}
                {renderTextField(['app', 'qrLoginExternalAddr'], '外部访问地址', '公网 IP 或域名，如：123.45.67.89 或 example.com。', {
                  disabled: getValue<string>(config, ['app', 'qrLoginAddrType'], 'lan') !== 'external'
                })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'upload' ? (
          <>
            {renderPageHeader('上传与下载', '视频、图片发送方式和下载限速策略。')}

            {renderSubSection('发送方式配置', (
              <>
                {renderSelectField(['upload', 'videoSendMode'], '本地视频发送方式', '选择本地视频交付给协议端的方式。', [
                  { label: 'File 协议（本地文件）', value: 'file', description: '使用 file 协议发送本地视频，需 Karin 与协议端在同一系统' },
                  { label: 'Base64（编码传输）', value: 'base64', description: '将本地视频转换为 base64 发送，传输数据量增大约 30%，不在同一网络环境可能导致额外带宽成本，适合 karin 和协议端不在同一网络环境' }
                ], (value) => value, uploadUseGroupFile)}
                {renderSwitch(['upload', 'usegroupfile'], '群文件上传', '使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」。与「本地视频发送方式 = Base64」互斥。', getValue<string>(config, ['upload', 'videoSendMode'], 'file') === 'base64')}
                {renderTextField(['upload', 'groupfilevalue'], '群文件上传阈值', '当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效。', { type: 'number', fallback: 100, min: 1, disabled: !uploadUseGroupFile || uploadVideoSendMode === 'base64' })}
                {renderSelectField(['upload', 'imageSendMode'], '网络图片发送方式', '图片资源发送给协议端的方式。', [
                  { label: 'URL 链接（直接传递）', value: 'url', description: '直接传递 HTTP 链接给上游下载，可能因上游网络问题导致下载超时' },
                  { label: 'File 协议（本地文件）', value: 'file', description: '下载到本地后使用 file 协议发送，需 Karin 与协议端在同一系统' },
                  { label: 'Base64（编码传输）', value: 'base64', description: '下载后转换为 base64 发送，传输数据量增大约 30%，不在同一网络环境可能导致额外带宽成本' }
                ])}
              </>
            ))}

            {renderSubSection('上传拦截配置', (
              <>
                {renderSwitch(['upload', 'usefilelimit'], '视频上传拦截', '开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。')}
                {renderTextField(['upload', 'filelimit'], '视频拦截阈值', '视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。', { type: 'number', fallback: 20, min: 1, disabled: !uploadUseFileLimit })}
              </>
            ))}

            {renderSubSection('视频压缩配置', (
              <>
                {renderSwitch(['upload', 'compress'], '压缩视频', '开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」。')}
                {renderTextField(['upload', 'compresstrigger'], '压缩触发阈值', '触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效。', { type: 'number', fallback: 80, min: 1, disabled: !uploadCompress })}
                {renderTextField(['upload', 'compressvalue'], '压缩后的值', '单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效。', { type: 'number', fallback: 30, min: 1, disabled: !uploadCompress })}
              </>
            ))}

            {renderSubSection('下载限速配置', (
              <>
                {renderSwitch(['upload', 'downloadThrottle'], '下载限速', '开启后会限制下载速度，避免触发服务器风控导致连接被重置（ECONNRESET）。如果下载时经常报错"连接被重置"，建议开启。')}
                {renderTextField(['upload', 'downloadMaxSpeed'], '最大下载速度', '单位：MB/s，建议设置为 5-20 之间。设置过高可能触发风控，设置过低会影响下载体验。', { type: 'number', fallback: 10, min: 1, max: 1000, disabled: !uploadDownloadThrottle })}
                {renderSwitch(['upload', 'downloadAutoReduce'], '断流自动降速', '当检测到连接被重置时自动降低下载速度，每次断流后速度会降低到当前的 60%。', !uploadDownloadThrottle)}
                {renderTextField(['upload', 'downloadMinSpeed'], '最低下载速度', '单位：MB/s，自动降速时不会低于此值。', { type: 'number', fallback: 1, min: 0.1, max: 100, step: 0.1, disabled: !uploadDownloadThrottle || !uploadDownloadAutoReduce })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'request' ? (
          <>
            {renderPageHeader('请求', 'amagi 解析库的请求超时、UA 和代理配置。')}

            <div className={classes.topLevelFields} data-config-section>
              {renderTextField(['request', 'timeout'], '请求超时时间', '网络请求的超时时间，单位：毫秒。', { type: 'number', fallback: 15000, min: 1000, max: 300000 })}
              {renderTextField(['request', 'User-Agent'], 'User-Agent', '请求头中的User-Agent字段，用于标识客户端类型。')}
            </div>

            {renderSubSection('代理配置（可选）', (
              <>
                {renderSwitch(['request', 'proxy', 'switch'], '代理开关', '开启后需要配置「代理主机」「代理端口」。')}
                {renderSelectField(['request', 'proxy', 'protocol'], '代理协议', '代理服务使用的协议。', [
                  { label: 'HTTP', value: 'http' },
                  { label: 'HTTPS', value: 'https' }
                ], (value) => value, !proxyEnabled)}
                {renderTextField(['request', 'proxy', 'host'], '代理主机', '代理服务器的主机地址，如：127.0.0.1。', { disabled: !proxyEnabled })}
                {renderTextField(['request', 'proxy', 'port'], '代理端口', '代理服务器的端口号。', { type: 'number', fallback: 7890, min: 1, max: 65535, disabled: !proxyEnabled })}
                {renderTextField(['request', 'proxy', 'auth', 'username'], '代理用户名', '代理服务器的认证用户名（如果需要）。', { disabled: !proxyEnabled })}
                {renderTextField(['request', 'proxy', 'auth', 'password'], '代理密码', '代理服务器的认证密码（如果需要）。', { type: 'password', disabled: !proxyEnabled })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'douyin' ? (
          <>
            {renderPageHeader('抖音', '抖音解析、画质、弹幕和推送基础设置。')}

            {/* 顶层配置 */}
            <div className={classes.topLevelFields} data-config-section>
              {renderSwitch(['douyin', 'switch'], '解析开关', '抖音解析开关，此开关为单独开关。')}
              {renderCheckboxGroup(['douyin', 'sendContent'], '解析时发送的内容', '若什么都不选，可能不会返回任何解析结果。', sendContentOptions.filter((item) => item.value !== 'image'), !douyinEnabled)}
            </div>

            {/* 评论详情设置 */}
            {renderSubSection('评论详情设置', (
              <>
                {renderTextField(['douyin', 'numcomment'], '评论解析数量', '主评论解析数量。', { type: 'number', fallback: 5, min: 1, disabled: !douyinEnabled || !includesValue(douyinSendContent, 'comment') })}
                {renderTextField(['douyin', 'subCommentLimit'], '次级评论解析数量', '次级评论解析数量，当前逻辑不仅无法判断请求的来的评论的嵌套深度，而且「次级评论解析深度」会限制嵌套深度，超过深度的评论会被截断。', { type: 'number', fallback: 5, min: 1, max: 20, disabled: !douyinEnabled || !includesValue(douyinSendContent, 'comment') })}
                {renderSwitch(['douyin', 'commentImageCollection'], '是否收集评论区的图片', '开启后将收集评论区的图片，以合并转发的形式返回。', !douyinEnabled || !includesValue(douyinSendContent, 'comment'))}
              </>
            ))}

            {/* 渲染与画质设置 */}
            {renderSubSection('渲染与画质设置', (
              <>
                {renderSelectField(['douyin', 'liveImageMergeMode'], '合辑 Live 图 BGM 合并方式', '合辑 Live 图 BGM 合并方式，仅 Live Photo 模式不是「仅实况图」时生效。', [
                  { label: '连续', value: 'continuous', description: 'BGM 接续播放，结束后自动循环' },
                  { label: '独立', value: 'independent', description: '每张图 BGM 从头开始' }
                ], (value) => value, !douyinEnabled || appLivePhotoMode === 'livephoto_only')}
                {renderSelectField(['douyin', 'videoQuality'], '画质偏好', '解析视频的分辨率偏好。', qualityOptions, (value) => value, !douyinEnabled)}
                {renderTextField(['douyin', 'maxAutoVideoSize'], '视频体积上限（MB）', '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。', { type: 'number', fallback: 50, min: 1, max: 20000, disabled: !douyinEnabled || douyinVideoQuality !== 'adapt' })}
                {renderSelectField(['douyin', 'videoInfoMode'], '视频信息返回形式', '视频信息返回文本或图片。', [
                  { label: '图片模式', value: 'image' },
                  { label: '文本模式', value: 'text' }
                ], (value) => value, !douyinEnabled)}
                {renderCheckboxGroup(['douyin', 'displayContent'], '视频信息的内容', '若什么都不选，则不会返回任何视频相关信息。', displayContentOptions.filter((item) => item.value !== 'desc'), !douyinEnabled || douyinVideoInfoMode === 'image')}
              </>
            ))}

            {/* 权限设置 */}
            {renderSubSection('权限设置', (
              <>
                {renderSelectField(['douyin', 'loginPerm'], '谁可以触发扫码登录', '修改后需重启。', permissionOptions)}
              </>
            ))}

            {/* 弹幕烧录相关 */}
            {renderSubSection('弹幕烧录相关', (
              <>
                {renderSwitch(['douyin', 'burnDanmaku'], '弹幕烧录', '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长。', !douyinEnabled)}
                {renderSelectField(['douyin', 'danmakuArea'], '弹幕显示区域', '限制弹幕范围，避免遮挡视频主体。', danmakuAreaOptions, Number, !douyinEnabled || !douyinBurnDanmaku)}
                {renderSelectField(['douyin', 'danmakuFontSize'], '弹幕字号', '弹幕文字大小。', fontSizeOptions, (value) => value, !douyinEnabled || !douyinBurnDanmaku)}
                {renderTextField(['douyin', 'danmakuOpacity'], '弹幕透明度', '0为完全透明，100为完全不透明，推荐70。', { type: 'number', fallback: 70, min: 0, max: 100, disabled: !douyinEnabled || !douyinBurnDanmaku })}
                {renderSelectField(['douyin', 'verticalMode'], '竖屏适配', '针对横屏视频，模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕。', verticalModeOptions, (value) => value, !douyinEnabled || !douyinBurnDanmaku)}
                {renderSelectField(['douyin', 'videoCodec'], '视频编码格式', '烧录弹幕后的视频编码格式。', videoCodecOptions, (value) => value, !douyinEnabled || !douyinBurnDanmaku)}
              </>
            ))}

            {/* 抖音推送相关 */}
            {renderSubSection('抖音推送相关', (
              <>
                {renderSwitch(['douyin', 'push', 'switch'], '推送开关', '推送开关，修改后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表。')}
                {renderSelectField(['douyin', 'push', 'permission'], '谁可以设置推送', '修改后需重启。', permissionOptions, (value) => value, !douyinPushEnabled)}
                {renderTextField(['douyin', 'push', 'cron'], '定时任务表达式', '定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）。', { disabled: !douyinPushEnabled })}
                {renderSwitch(['douyin', 'push', 'parsedynamic'], '作品解析', '触发推送时是否一同解析该作品。', !douyinPushEnabled)}
                {renderSelectField(['douyin', 'push', 'shareType'], '推送图二维码的类型', '推送图二维码识别后的跳转类型。', [
                  { label: '网页链接', value: 'web', description: '识别后访问抖音官网对应的作品地址' },
                  { label: '下载链接', value: 'download', description: '识别后访问无水印作品下载地址' }
                ], (value) => value, !douyinPushEnabled)}
                {renderSelectField(['douyin', 'push', 'pushVideoQuality'], '画质偏好', '推送解析时解析视频的分辨率偏好。', qualityOptions, (value) => value, !douyinPushEnabled)}
                {renderTextField(['douyin', 'push', 'pushMaxAutoVideoSize'], '视频体积上限（MB）', '推送解析时根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。', { type: 'number', fallback: 50, min: 1, max: 20000, disabled: !douyinPushEnabled || douyinPushQuality !== 'adapt' })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'bilibili' ? (
          <>
            {renderPageHeader('B站', 'B站解析、动态图片布局、弹幕和推送基础设置。')}

            <div className={classes.topLevelFields} data-config-section>
              {renderSwitch(['bilibili', 'switch'], '解析开关', 'B站解析开关，此开关为单独开关。')}
              {renderCheckboxGroup(['bilibili', 'sendContent'], '解析时发送的内容', '若什么都不选，可能不会返回任何解析结果。', sendContentOptions.filter((item) => item.value !== 'image'), !bilibiliEnabled)}
            </div>

            {renderSubSection('评论详情设置', (
              <>
                {renderTextField(['bilibili', 'numcomment'], '评论解析数量', '主评论解析数量。', { type: 'number', fallback: 5, min: 1, disabled: !bilibiliEnabled || !includesValue(bilibiliSendContent, 'comment') })}
                {renderSwitch(['bilibili', 'realCommentCount'], '显示真实评论数量', '关闭则显示解析到的评论数量。', !bilibiliEnabled || !includesValue(bilibiliSendContent, 'comment'))}
                {renderSwitch(['bilibili', 'commentImageCollection'], '是否收集评论区的图片', '开启后将收集评论区的图片，以合并转发的形式返回。', !bilibiliEnabled || !includesValue(bilibiliSendContent, 'comment'))}
              </>
            ))}

            {renderSubSection('渲染与画质设置', (
              <>
                {renderSelectField(['bilibili', 'videoQuality'], '画质偏好', '解析视频的分辨率偏好。', bilibiliQualityOptions, Number, !bilibiliEnabled)}
                {renderTextField(['bilibili', 'maxAutoVideoSize'], '视频体积上限（MB）', '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。', { type: 'number', fallback: 50, min: 1, max: 20000, disabled: !bilibiliEnabled || Number(bilibiliVideoQuality) !== 0 })}
                {renderSelectField(['bilibili', 'imageLayout'], '解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）', '自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格。', [
                  { label: '自动布局', value: 'auto' },
                  { label: '逐张上下排列', value: 'vertical' },
                  { label: '瀑布流排列', value: 'waterfall' },
                  { label: '九宫格排列', value: 'grid' }
                ])}
                {renderSelectField(['bilibili', 'videoInfoMode'], '视频信息返回形式', '视频信息返回文本或图片。', [
                  { label: '图片模式', value: 'image' },
                  { label: '文本模式', value: 'text' }
                ], (value) => value, !bilibiliEnabled)}
                {renderCheckboxGroup(['bilibili', 'displayContent'], '视频信息前返回的内容', '若什么都不选，则不会返回任何视频相关信息。', displayContentOptions, !bilibiliEnabled || bilibiliVideoInfoMode === 'image')}
              </>
            ))}

            {renderSubSection('权限设置', (
              <>
                {renderSelectField(['bilibili', 'loginPerm'], '谁可以触发扫码登录', '修改后需重启。', permissionOptions)}
              </>
            ))}

            {renderSubSection('弹幕烧录相关', (
              <>
                {renderSwitch(['bilibili', 'burnDanmaku'], '弹幕烧录', '将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长，高分辨率视频会占用较多资源。', !bilibiliEnabled)}
                {renderSelectField(['bilibili', 'danmakuArea'], '弹幕区域', '限制弹幕的显示范围，避免遮挡视频主体内容。', danmakuAreaOptions, Number, !bilibiliEnabled || !bilibiliBurnDanmaku)}
                {renderSelectField(['bilibili', 'danmakuFontSize'], '弹幕字号', '弹幕文字大小。', fontSizeOptions, (value) => value, !bilibiliEnabled || !bilibiliBurnDanmaku)}
                {renderTextField(['bilibili', 'danmakuOpacity'], '弹幕透明度', '0为完全透明，100为完全不透明，推荐70。', { type: 'number', fallback: 70, min: 0, max: 100, disabled: !bilibiliEnabled || !bilibiliBurnDanmaku })}
                {renderSelectField(['bilibili', 'verticalMode'], '竖屏适配', '模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕。', verticalModeOptions, (value) => value, !bilibiliEnabled || !bilibiliBurnDanmaku)}
                {renderSelectField(['bilibili', 'videoCodec'], '视频编码格式', '弹幕烧录时使用的视频编码格式，会自动检测硬件加速。', videoCodecOptions, (value) => value, !bilibiliEnabled || !bilibiliBurnDanmaku)}
              </>
            ))}

            {renderSubSection('B站推送相关', (
              <>
                {renderSwitch(['bilibili', 'push', 'switch'], '推送开关', '推送开关，修改后需重启；使用「#设置B站推送 + UID」配置推送列表。')}
                {renderSelectField(['bilibili', 'push', 'permission'], '谁可以设置推送', '修改后需重启。', permissionOptions, (value) => value, !bilibiliPushEnabled)}
                {renderTextField(['bilibili', 'push', 'cron'], '定时任务表达式', '定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）。', { disabled: !bilibiliPushEnabled })}
                {renderSwitch(['bilibili', 'push', 'parsedynamic'], '作品解析', '触发推送时是否一同解析该作品。', !bilibiliPushEnabled)}
                {renderSelectField(['bilibili', 'push', 'pushVideoQuality'], '解析视频动态时的画质偏好', '「作品解析」开启时生效，仅对视频动态有效。', bilibiliQualityOptions.filter((item) => item.value !== '127'), Number, !bilibiliPushEnabled || !bilibiliPushParsedynamic)}
                {renderTextField(['bilibili', 'push', 'pushMaxAutoVideoSize'], '视频动态的视频体积上限（MB）', '根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 "自动选择" 且「作品解析」开启时生效，仅对视频动态有效。', { type: 'number', fallback: 50, min: 1, max: 20000, disabled: !bilibiliPushEnabled || !bilibiliPushParsedynamic || Number(bilibiliPushQuality) !== 0 })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'kuaishou' ? (
          <>
            {renderPageHeader('快手', '快手解析基础设置。')}

            <div className={classes.topLevelFields} data-config-section>
              {renderSwitch(['kuaishou', 'switch'], '解析开关', '快手解析开关，此开关为单独开关。')}
            </div>

            {renderSubSection('评论详情设置', (
              <>
                {renderSwitch(['kuaishou', 'comment'], '评论解析', '快手评论解析，开启后可发送快手作品评论图。', !kuaishouEnabled)}
                {renderTextField(['kuaishou', 'numcomment'], '评论解析数量', '快手评论解析数量。', { type: 'number', fallback: 5, min: 1, disabled: !kuaishouEnabled || !kuaishouComment })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'xiaohongshu' ? (
          <>
            {renderPageHeader('小红书', '小红书解析基础设置。')}

            <div className={classes.topLevelFields} data-config-section>
              {renderSwitch(['xiaohongshu', 'switch'], '解析开关', '小红书解析开关，此开关为单独开关。')}
              {renderCheckboxGroup(['xiaohongshu', 'sendContent'], '解析时发送的内容', '若什么都不选，可能不会返回任何解析结果。', sendContentOptions, !xiaohongshuEnabled)}
              {renderTextField(['xiaohongshu', 'numcomment'], '评论解析数量', '小红书评论解析数量。', { type: 'number', fallback: 5, min: 1, disabled: !xiaohongshuEnabled || !includesValue(xiaohongshuSendContent, 'comment') })}
            </div>

            {renderSubSection('渲染与画质设置', (
              <>
                {renderSelectField(['xiaohongshu', 'videoQuality'], '画质偏好', '解析视频的分辨率偏好。', qualityOptions, (value) => value, !xiaohongshuEnabled)}
                {renderTextField(['xiaohongshu', 'maxAutoVideoSize'], '视频体积上限（MB）', '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效。', { type: 'number', fallback: 50, min: 1, max: 20000, disabled: !xiaohongshuEnabled || xiaohongshuVideoQuality !== 'adapt' })}
              </>
            ))}
          </>
        ) : null}

        {activeFile === 'pushlist' ? (
          <>
            {renderPageHeader('推送列表', '管理抖音与 B站的推送订阅。')}

            <PushlistManager
              douyinList={(config.pushlist?.douyin as DouyinPushItem[]) || []}
              bilibiliList={(config.pushlist?.bilibili as BilibiliPushItem[]) || []}
              onDouyinChange={(list) => {
                updateConfigValue(['pushlist', 'douyin'], list)
              }}
              onBilibiliChange={(list) => {
                updateConfigValue(['pushlist', 'bilibili'], list)
              }}
              device={device}
            />
          </>
        ) : null}
      </Form>
    </div>
  )
}

export default ConfigPanel
