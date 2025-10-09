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

  /** 评论图是否显示真实评论数量，关闭则显示解析到的评论数量 */
  realCommentCount: boolean

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

  /** 抖音推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表 */
    switch: boolean
    /** 推送权限，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
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
    videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'
    /** 推送解析时视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
    maxAutoVideoSize: number
  }
}
