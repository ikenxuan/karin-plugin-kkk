/** 定义抖音解析工具的配置接口 */
export interface douyinConfig {
  /** 抖音解析开关，单独开关，受「总开关」影响 */
  switch: boolean

  /** 抖音解析提示，发送提示信息："检测到抖音链接，开始解析" */
  tip: boolean

  /** 解析时发送的内容，可选值：'info'(视频信息)、'comment'(评论图片)、'video'(视频文件) */
  sendContent: ['info' | 'comment' | 'video']

  /** 抖音评论数量，范围1 ~ x 条 */
  numcomment: number

  /** 次级评论请求数量，范围1 ~ x 条，最高尽量 8 条左右，当前逻辑不仅无法判断请求的来的评论的嵌套深度，而且「subCommentDepth」会限制嵌套深度，超过深度的评论会被截断 */
  subCommentLimit: number

  /** 次级评论嵌套深度，范围1 ~ 6 层 */
  subCommentDepth: number

  /** 评论图是否显示真实评论数量，关闭则显示解析到的评论数量 */
  realCommentCount: boolean

  /** 是否收集评论区的图片 */
  commentImageCollection: boolean

  /** 合辑 Live 图 BGM 合并模式
   * - 'continuous': 连续模式，BGM 接续播放
   * - 'independent': 独立模式，每张图 BGM 从头开始
   */
  liveImageMergeMode: 'continuous' | 'independent'

  /** 视频画质偏好设置，'adapt' 为自动根据「maxAutoVideoSize」大小选择，其他为固定画质 */
  videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'

  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
  maxAutoVideoSize: number

  /** 谁可以触发扫码登录，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'

  /** 视频信息返回形式：
   * - 'text'(文本模式)
   * - 'image'(图片模式) */
  videoInfoMode: 'text' | 'image'

  /** 视频信息的内容，可选值：'cover'(封面)、'title'(标题)、'author'(作者)、'stats'(视频统计信息)，数组为空则不显示任何内容 */
  displayContent: ('cover' | 'title' | 'author' | 'stats')[]

  /** 弹幕烧录（将弹幕硬编码到视频画面中，需要重新编码视频） */
  burnDanmaku: boolean

  /** 弹幕显示区域（限制弹幕范围，避免遮挡视频主体）
   * - 0.25: 1/4 屏，仅顶部区域
   * - 0.5: 半屏，上半部分（推荐）
   * - 0.75: 3/4 屏，大部分区域
   * - 1: 全屏，铺满整个画面
   */
  danmakuArea: 0.25 | 0.5 | 0.75 | 1

  /** 弹幕字号
   * - 'small': 小号
   * - 'medium': 中号（推荐）
   * - 'large': 大号
   */
  danmakuFontSize: 'small' | 'medium' | 'large'

  /** 横屏转竖屏模式（针对横屏视频）
   * - 'off': 关闭，保持原始比例
   * - 'standard': 智能模式，仅对宽高比 ≥1.7 的横屏视频转竖屏
   * - 'force': 强制 9:16，所有视频统一转为竖屏
   */
  verticalMode: 'off' | 'standard' | 'force'

  /** 视频编码格式
   * - 'h264': 兼容性最好，支持几乎所有设备
   * - 'h265': 压缩率更高，近几年设备支持良好（默认）
   * - 'av1': 最新编码格式，压缩率最高，但编码较慢
   */
  videoCodec: 'h264' | 'h265' | 'av1'

  /** 抖音推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表 */
    switch: boolean
    /** 谁可以设置推送，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
    permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
    /** 推送表达式 */
    cron: string
    /** 推送时是否一同解析该作品 */
    parsedynamic: boolean,
    /** 是否打印日志 */
    log: boolean
    /** 分享链接二维码的类型，web为跳转到抖音网页，download为视频下载直链 */
    shareType: 'web' | 'download'
    /** 推送解析时视频画质偏好设置，'adapt' 为自动根据「maxAutoVideoSize」大小选择，其他为固定画质 */
    pushVideoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'
    /** 推送解析时视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
    pushMaxAutoVideoSize: number
  }
}
