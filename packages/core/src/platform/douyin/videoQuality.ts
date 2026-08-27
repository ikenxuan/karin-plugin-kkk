import type { DyVideoWork } from '@ikenxuan/amagi'
import { logger } from 'node-karin'

import { Config } from '@/module/utils/Config'

/** 抖音视频源对象，对应 `aweme_detail.video.bit_rate` 数组项（直接复用 amagi 生成类型，避免手写漂移） */
export type dyVideo = DyVideoWork['aweme_detail']['video']['bit_rate'][number]

/** 插件内部使用的清晰度档位，取值域与 `Config.douyin.videoQuality` 保持一致 */
export type DouyinQualityLevel = '4k' | '2k' | '1080p' | '720p' | '540p'

/** 档位优先级，从高到低 */
const QUALITY_PRIORITY: DouyinQualityLevel[] = ['4k', '2k', '1080p', '720p', '540p']

/**
 * `video_extra.definition` → 内部档位名。
 * 抖音上游把 2K 记作 `1440p`，而配置项 `videoQuality` 用的是 `2k`，
 * 这张表是两套词表唯一的翻译点，配置域不需要跟着上游改。
 */
const DEFINITION_TO_LEVEL: Record<string, DouyinQualityLevel> = {
  '4k': '4k',
  '2k': '2k',
  '1440p': '2k',
  '1080p': '1080p',
  '720p': '720p',
  '540p': '540p'
}

/** 档位 → 展示标签，沿用抖音 Web 端播放器的说法 */
const QUALITY_LABEL: Record<DouyinQualityLevel, string> = {
  '4k': '超清4K',
  '2k': '超清2K',
  '1080p': '高清1080P',
  '720p': '高清720P',
  '540p': '标清540P'
}

/**
 * 安全解析 `video_extra`
 * @param extra - 原始 JSON 字符串
 * @returns 解析结果，为空或非法 JSON 时返回 null
 */
const parseVideoExtra = (extra: string | undefined): { definition?: string } | null => {
  if (!extra) return null
  try {
    return JSON.parse(extra)
  } catch {
    return null
  }
}

/**
 * 从 `gear_name` 猜测档位。
 * 只作为 `video_extra.definition` 缺失时的兜底：抖音随时可能新增 gear_name，
 * 认不出来就返回 undefined 交给调用方处理，不再默认落到 540p 污染分档。
 * @param gearName - 视频源的 gear_name
 * @returns 档位名，认不出时返回 undefined
 */
const guessLevelFromGearName = (gearName: string): DouyinQualityLevel | undefined => {
  if (gearName.includes('lowest_4') || gearName.includes('2160')) return '4k'
  if (gearName.includes('1440') || gearName.includes('2k')) return '2k'
  if (gearName.includes('1080')) return '1080p'
  if (gearName.includes('720')) return '720p'
  if (gearName.includes('540')) return '540p'
  return undefined
}

/**
 * 判定单个视频源的清晰度档位。
 * `video_extra.definition` 是唯一可信来源：抖音视频比例不固定（存在 21:9、1:1 等），
 * 一个 3840x1608 的视频不满足 3840x2160 但官方仍定义为 4K，所以不能拿 play_addr 的宽高硬匹配。
 * @param video - 视频源对象
 * @returns 档位名，无法判定时返回 undefined
 */
export const getDouyinQualityLevel = (video: dyVideo): DouyinQualityLevel | undefined => {
  const definition = parseVideoExtra(video.video_extra)?.definition
  const level = definition ? DEFINITION_TO_LEVEL[definition] : undefined
  return level ?? guessLevelFromGearName(video.gear_name ?? '')
}

/**
 * 同档位内的取源顺序：先 H.264，再按体积从大到小。
 * 1080p / 720p 的 H.265（ByteVC1）在部分协议端软解失败，同档位下 H.264 更稳；
 * 4K / 2K 上游通常只提供 H.265，此时全组同权重，自然退化为按体积排序。
 * @param a - 视频源 A
 * @param b - 视频源 B
 * @returns 排序比较值
 */
const compareVideoPreference = (a: dyVideo, b: dyVideo): number => {
  if (a.is_bytevc1 !== b.is_bytevc1) return a.is_bytevc1 - b.is_bytevc1
  return b.play_addr.data_size - a.play_addr.data_size
}

/**
 * 按档位给 mp4 视频源分组，组内已按 {@link compareVideoPreference} 排好序
 * @param videos - 视频源数组
 * @returns 档位 → 该档位下的视频源
 */
const groupByQualityLevel = (videos: dyVideo[]): Map<DouyinQualityLevel, dyVideo[]> => {
  const grouped = new Map<DouyinQualityLevel, dyVideo[]>()
  for (const video of videos) {
    const level = getDouyinQualityLevel(video)
    if (!level) {
      logger.debug(`无法判定清晰度档位，跳过该视频源：gear_name=${video.gear_name}`)
      continue
    }
    const bucket = grouped.get(level)
    if (bucket) {
      bucket.push(video)
    } else {
      grouped.set(level, [video])
    }
  }
  grouped.forEach((bucket) => bucket.sort(compareVideoPreference))
  return grouped
}

/**
 * 构建抖音视频播放地址（二维码分享链接与下载共用）。
 * 上游 play 接口现在除 video_id 外还要求携带 file_id（从 play_addr.url_list[2] 的查询参数中提取），
 * 旧的 ratio/line 参数不再需要；file_id 提取失败时回退为仅带 video_id。
 * @param playAddr - 视频源的 play_addr 对象（bit_rate 项或 images 项的 play_addr_h264）
 * @returns 完整的播放地址
 */
export const buildDouyinPlayUrl = (playAddr: { uri: string; url_list?: string[] }): string => {
  const fileId = (() => {
    try {
      const wrappedUrl = playAddr.url_list?.[2]
      return wrappedUrl ? new URL(wrappedUrl).searchParams.get('file_id') : null
    } catch {
      return null
    }
  })()
  return fileId
    ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${playAddr.uri}&&file_id=${fileId}`
    : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${playAddr.uri}`
}

/**
 * 把选中的视频源格式化成展示用的清晰度字符串。
 * 传入的必须是 {@link douyinProcessVideos} 选中的那一路源 —— 卡片上展示的清晰度要和实际下载的一致，
 * 否则会出现「卡片写 4K、实际下载 720p」的错位。
 * @param video - 选中的视频源
 * @returns 形如 `超清4K`；档位认不出时返回空字符串
 */
export const formatDouyinQualityLabel = (video: dyVideo | undefined | null) => {
  if (!video) return ''
  const level = getDouyinQualityLevel(video)
  if (!level) return ''
  return QUALITY_LABEL[level]
}

/**
 * 按画质偏好从抖音视频源列表里挑出唯一一路可下载的源
 * @param videos - `aweme_detail.video.bit_rate` 数组
 * @param videoQuality - 画质偏好，`adapt` 为按体积上限自动选择，其余为固定档位
 * @param maxAutoVideoSize - 自动模式下可接受的最大体积（MB），缺省回落到 `Config.app.filelimit`
 * @returns 长度为 1 的数组，元素为选中的视频源
 */
export const douyinProcessVideos = (videos: dyVideo[], videoQuality: string, maxAutoVideoSize?: number): dyVideo[] => {
  // Web 端与下载都只认 mp4 封装，dash 是 App 端流媒体专用
  const mp4Videos = videos.filter((video) => video.format === 'mp4')

  if (mp4Videos.length === 0) {
    logger.warn('没有找到可用的 mp4 格式视频')
    return videos.slice(0, 1) // 返回第一个视频作为备选
  }

  logger.debug(`过滤后剩余 ${mp4Videos.length} 个 mp4 格式视频`)

  const videosByQuality = groupByQualityLevel(mp4Videos)

  // 如果是自动模式
  if (videoQuality === 'adapt') {
    const sizeLimitBytes = (maxAutoVideoSize || Config.app.filelimit) * 1024 * 1024

    for (const quality of QUALITY_PRIORITY) {
      const qualityVideos = videosByQuality.get(quality)
      if (qualityVideos && qualityVideos.length > 0) {
        // 该档位下第一个不超过体积上限的源（组内已按 H.264 优先、体积从大到小排序）
        const suitableVideo = qualityVideos.find((video) => video.play_addr.data_size <= sizeLimitBytes)
        if (suitableVideo) {
          logger.debug(`自动选择画质: ${quality}, 文件大小: ${(suitableVideo.play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`)
          return [suitableVideo]
        }
      }
    }

    // 如果没有找到符合大小限制的视频，选择最小的视频
    let smallestVideo = mp4Videos[0]
    mp4Videos.forEach((video) => {
      if (video.play_addr.data_size < smallestVideo.play_addr.data_size) {
        smallestVideo = video
      }
    })
    logger.debug(`未找到符合大小限制的视频，选择最小视频: ${(smallestVideo.play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`)
    return [smallestVideo]
  }

  // 固定画质模式
  const targetQuality = videoQuality as DouyinQualityLevel
  const targetVideos = videosByQuality.get(targetQuality)

  if (targetVideos && targetVideos.length > 0) {
    // 选择该画质下最优的视频源
    logger.debug(`选择固定画质: ${targetQuality}, 文件大小: ${(targetVideos[0].play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`)
    return [targetVideos[0]]
  }

  // 如果没有找到目标画质，选择最接近的画质
  const targetIndex = QUALITY_PRIORITY.indexOf(targetQuality)

  // 先尝试向下找（更低画质）
  for (let i = targetIndex + 1; i < QUALITY_PRIORITY.length; i++) {
    const fallbackVideos = videosByQuality.get(QUALITY_PRIORITY[i])
    if (fallbackVideos && fallbackVideos.length > 0) {
      logger.debug(`目标画质 ${targetQuality} 不可用，降级到: ${QUALITY_PRIORITY[i]}`)
      return [fallbackVideos[0]]
    }
  }

  // 再尝试向上找（更高画质）
  for (let i = targetIndex - 1; i >= 0; i--) {
    const fallbackVideos = videosByQuality.get(QUALITY_PRIORITY[i])
    if (fallbackVideos && fallbackVideos.length > 0) {
      logger.debug(`目标画质 ${targetQuality} 不可用，升级到: ${QUALITY_PRIORITY[i]}`)
      return [fallbackVideos[0]]
    }
  }

  // 如果都没找到，返回第一个可用视频
  logger.warn('未找到任何匹配的画质，返回默认视频')
  return [mp4Videos[0]]
}
