/**
 * 配置项禁用规则映射
 * 集中管理所有配置项的禁用条件和对应提示
 */

import type { ConfigType } from '../types/config'

export type ConfigPath = Array<string | number>

/**
 * 禁用规则：检查条件 + 对应提示
 */
export interface DisabledRule {
  /** 配置路径 */
  path: ConfigPath
  /** 禁用条件列表（从上到下检查，返回第一个匹配的提示） */
  rules: Array<{
    /** 返回 true 表示触发该禁用条件 */
    condition: (config: ConfigType | null) => boolean
    /** 对应的提示文案 */
    message: string
  }>
}

/**
 * 判断值是否为可继续访问的配置对象
 */
const isConfigRecord = (value: unknown): value is Record<string | number, unknown> => {
  return Boolean(value && typeof value === 'object')
}

/**
 * 读取嵌套路径上的配置值
 */
const getValue = <T>(source: ConfigType | null, path: ConfigPath, fallback: T): T => {
  if (!source) return fallback

  const result = path.reduce<unknown>((current, key) => {
    if (!isConfigRecord(current)) return undefined
    return current[key]
  }, source)

  return (result === undefined || result === null ? fallback : result) as T
}

/**
 * 判断数组中是否包含指定值
 */
const includesValue = (values: unknown, value: string): boolean => {
  return Array.isArray(values) && values.includes(value)
}

/**
 * 所有配置项的禁用规则
 */
export const disabledRules: DisabledRule[] = [
  // ==================== 应用配置 ====================
  {
    path: ['app', 'priority'],
    rules: [
      {
        condition: (cfg) => getValue<boolean>(cfg, ['app', 'videoTool'], true),
        message: '修改此配置项需要先将「默认解析优先级」关闭'
      }
    ]
  },
  {
    path: ['app', 'multiPageHeight'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'multiPageRender'], true),
        message: '修改此配置项需要先将「分页渲染」打开'
      }
    ]
  },
  {
    path: ['app', 'livePhotoSystem'],
    rules: [
      {
        condition: (cfg) => getValue<string>(cfg, ['app', 'livePhotoMode'], 'video_and_livephoto') === 'video_only',
        message: '修改此配置项需要先将「Live Photo 处理和发送方式」改为非「仅视频」模式'
      }
    ]
  },
  {
    path: ['amagi', 'APIServerMount'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['amagi', 'APIServer'], false),
        message: '修改此配置项需要先将「API 服务」打开'
      }
    ]
  },
  {
    path: ['amagi', 'APIServerPort'],
    rules: [
      {
        condition: (cfg) => getValue<boolean>(cfg, ['amagi', 'APIServerMount'], true),
        message: '修改此配置项需要先将「挂载到 Karin」关闭'
      }
    ]
  },
  {
    path: ['app', 'qrLoginExternalAddr'],
    rules: [
      {
        condition: (cfg) => getValue<string>(cfg, ['app', 'qrLoginAddrType'], 'lan') !== 'external',
        message: '修改此配置项需要先将「扫码登录地址」改为「外部地址」'
      }
    ]
  },

  // ==================== 上传下载配置 ====================
  {
    path: ['app', 'videoSendMode'],
    rules: [
      {
        condition: (cfg) => getValue<boolean>(cfg, ['app', 'usegroupfile'], false),
        message: '修改此配置项需要先将「群文件上传」关闭'
      }
    ]
  },
  {
    path: ['app', 'usegroupfile'],
    rules: [
      {
        condition: (cfg) => getValue<string>(cfg, ['app', 'videoSendMode'], 'file') === 'base64',
        message: '修改此配置项需要先将「本地视频发送方式」改为「File 协议」'
      }
    ]
  },
  {
    path: ['app', 'groupfilevalue'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'usegroupfile'], false),
        message: '修改此配置项需要先将「群文件上传」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['app', 'videoSendMode'], 'file') === 'base64',
        message: '修改此配置项需要先将「本地视频发送方式」改为「File 协议」'
      }
    ]
  },
  {
    path: ['app', 'filelimit'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'usefilelimit'], false),
        message: '修改此配置项需要先将「视频上传拦截」打开'
      }
    ]
  },
  {
    path: ['app', 'compresstrigger'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'compress'], false),
        message: '修改此配置项需要先将「压缩视频」打开'
      }
    ]
  },
  {
    path: ['app', 'compressvalue'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'compress'], false),
        message: '修改此配置项需要先将「压缩视频」打开'
      }
    ]
  },
  {
    path: ['app', 'downloadMaxSpeed'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'downloadThrottle'], false),
        message: '修改此配置项需要先将「下载限速」打开'
      }
    ]
  },
  {
    path: ['app', 'downloadAutoReduce'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'downloadThrottle'], false),
        message: '修改此配置项需要先将「下载限速」打开'
      }
    ]
  },
  {
    path: ['app', 'downloadMinSpeed'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'downloadThrottle'], false),
        message: '修改此配置项需要先将「下载限速」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['app', 'downloadAutoReduce'], false),
        message: '修改此配置项需要先将「断流自动降速」打开'
      }
    ]
  },

  // ==================== 请求配置 ====================
  {
    path: ['amagi', 'proxy', 'protocol'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['amagi', 'proxy', 'switch'], false),
        message: '修改此配置项需要先将「代理开关」打开'
      }
    ]
  },
  {
    path: ['amagi', 'proxy', 'host'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['amagi', 'proxy', 'switch'], false),
        message: '修改此配置项需要先将「代理开关」打开'
      }
    ]
  },
  {
    path: ['amagi', 'proxy', 'port'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['amagi', 'proxy', 'switch'], false),
        message: '修改此配置项需要先将「代理开关」打开'
      }
    ]
  },
  {
    path: ['amagi', 'proxy', 'auth', 'username'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['amagi', 'proxy', 'switch'], false),
        message: '修改此配置项需要先将「代理开关」打开'
      }
    ]
  },
  {
    path: ['amagi', 'proxy', 'auth', 'password'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['amagi', 'proxy', 'switch'], false),
        message: '修改此配置项需要先将「代理开关」打开'
      }
    ]
  },

  // ==================== 抖音配置 ====================
  {
    path: ['douyin', 'sendContent'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'numcomment'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !includesValue(getValue(cfg, ['douyin', 'sendContent'], []), 'comment'),
        message: '修改此配置项需要在「解析时发送的内容」中勾选「评论图」'
      }
    ]
  },
  {
    path: ['douyin', 'subCommentLimit'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !includesValue(getValue(cfg, ['douyin', 'sendContent'], []), 'comment'),
        message: '修改此配置项需要在「解析时发送的内容」中勾选「评论图」'
      }
    ]
  },
  {
    path: ['douyin', 'commentImageCollection'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !includesValue(getValue(cfg, ['douyin', 'sendContent'], []), 'comment'),
        message: '修改此配置项需要在「解析时发送的内容」中勾选「评论图」'
      }
    ]
  },
  {
    path: ['douyin', 'liveImageMergeMode'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['app', 'livePhotoMode'], 'video_and_livephoto') === 'livephoto_only',
        message: '修改此配置项需要先将「Live Photo 处理和发送方式」改为非「仅实况图」模式'
      }
    ]
  },
  {
    path: ['douyin', 'videoQuality'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'maxAutoVideoSize'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['douyin', 'videoQuality'], 'adapt') !== 'adapt',
        message: '修改此配置项需要先将「画质偏好」改为「自动选择」'
      }
    ]
  },
  {
    path: ['douyin', 'videoInfoMode'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'displayContent'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['douyin', 'videoInfoMode'], 'text') === 'image',
        message: '修改此配置项需要先将「视频信息返回形式」改为「文本模式」'
      }
    ]
  },
  {
    path: ['douyin', 'burnDanmaku'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'danmakuArea'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['douyin', 'danmakuFontSize'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['douyin', 'danmakuOpacity'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['douyin', 'verticalMode'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['douyin', 'videoCodec'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['douyin', 'push', 'permission'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'push', 'cron'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'push', 'parsedynamic'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'push', 'shareType'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'push', 'pushVideoQuality'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['douyin', 'push', 'pushMaxAutoVideoSize'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['douyin', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['douyin', 'push', 'pushVideoQuality'], 'adapt') !== 'adapt',
        message: '修改此配置项需要先将「画质偏好」改为「自动选择」'
      }
    ]
  },

  // ==================== B站配置 ====================
  {
    path: ['bilibili', 'sendContent'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'numcomment'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !includesValue(getValue(cfg, ['bilibili', 'sendContent'], []), 'comment'),
        message: '修改此配置项需要在「解析时发送的内容」中勾选「评论图」'
      }
    ]
  },
  {
    path: ['bilibili', 'realCommentCount'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !includesValue(getValue(cfg, ['bilibili', 'sendContent'], []), 'comment'),
        message: '修改此配置项需要在「解析时发送的内容」中勾选「评论图」'
      }
    ]
  },
  {
    path: ['bilibili', 'commentImageCollection'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !includesValue(getValue(cfg, ['bilibili', 'sendContent'], []), 'comment'),
        message: '修改此配置项需要在「解析时发送的内容」中勾选「评论图」'
      }
    ]
  },
  {
    path: ['bilibili', 'videoQuality'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'maxAutoVideoSize'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => Number(getValue(cfg, ['bilibili', 'videoQuality'], 0)) !== 0,
        message: '修改此配置项需要先将「画质偏好」改为「自动选择」'
      }
    ]
  },
  {
    path: ['bilibili', 'videoInfoMode'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'displayContent'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['bilibili', 'videoInfoMode'], 'text') === 'image',
        message: '修改此配置项需要先将「视频信息返回形式」改为「文本模式」'
      }
    ]
  },
  {
    path: ['bilibili', 'showDanmakuInVideoInfo'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['bilibili', 'videoInfoMode'], 'text') === 'text',
        message: '修改此配置项需要先将「视频信息返回形式」改为「图片模式」'
      }
    ]
  },
  {
    path: ['bilibili', 'burnDanmaku'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'danmakuArea'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'danmakuFontSize'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'danmakuOpacity'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'verticalMode'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'videoCodec'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'burnDanmaku'], false),
        message: '修改此配置项需要先将「弹幕烧录」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'push', 'permission'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'push', 'cron'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'push', 'parsedynamic'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'push', 'parseDynamicTypes'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'parsedynamic'], false),
        message: '修改此配置项需要先将「作品解析」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'push', 'pushVideoQuality'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'parsedynamic'], false),
        message: '修改此配置项需要先将「作品解析」打开'
      }
    ]
  },
  {
    path: ['bilibili', 'push', 'pushMaxAutoVideoSize'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'switch'], false),
        message: '修改此配置项需要先将「推送开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['bilibili', 'push', 'parsedynamic'], false),
        message: '修改此配置项需要先将「作品解析」打开'
      },
      {
        condition: (cfg) => Number(getValue(cfg, ['bilibili', 'push', 'pushVideoQuality'], 0)) !== 0,
        message: '修改此配置项需要先将「解析视频动态时的画质偏好」改为「自动选择」'
      }
    ]
  },

  // ==================== 快手配置 ====================
  {
    path: ['kuaishou', 'comment'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['kuaishou', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['kuaishou', 'numcomment'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['kuaishou', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['kuaishou', 'comment'], false),
        message: '修改此配置项需要先将「评论解析」打开'
      }
    ]
  },

  // ==================== 小红书配置 ====================
  {
    path: ['xiaohongshu', 'sendContent'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['xiaohongshu', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['xiaohongshu', 'numcomment'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['xiaohongshu', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => !includesValue(getValue(cfg, ['xiaohongshu', 'sendContent'], []), 'comment'),
        message: '修改此配置项需要在「解析时发送的内容」中勾选「评论图」'
      }
    ]
  },
  {
    path: ['xiaohongshu', 'videoQuality'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['xiaohongshu', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      }
    ]
  },
  {
    path: ['xiaohongshu', 'maxAutoVideoSize'],
    rules: [
      {
        condition: (cfg) => !getValue<boolean>(cfg, ['xiaohongshu', 'switch'], false),
        message: '修改此配置项需要先将「解析开关」打开'
      },
      {
        condition: (cfg) => getValue<string>(cfg, ['xiaohongshu', 'videoQuality'], 'adapt') !== 'adapt',
        message: '修改此配置项需要先将「画质偏好」改为「自动选择」'
      }
    ]
  }
]

/**
 * 将配置路径转换为稳定 key
 */
const toPathKey = (path: ConfigPath): string => {
  return path.join('.')
}

/**
 * 根据配置路径查找对应的禁用提示
 * @param config 当前配置对象
 * @param path 配置路径
 * @returns 禁用提示文案，如果没有匹配的规则或字段未被禁用则返回空字符串
 */
export const getDisabledTooltip = (config: ConfigType | null, path: ConfigPath): string => {
  const key = toPathKey(path)
  const rule = disabledRules.find((r) => toPathKey(r.path) === key)

  if (!rule) return ''

  // 按顺序检查规则，返回第一个匹配的提示
  for (const r of rule.rules) {
    if (r.condition(config)) {
      return r.message
    }
  }

  return ''
}
