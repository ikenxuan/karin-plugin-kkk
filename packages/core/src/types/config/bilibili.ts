/** 定义B站解析工具的配置接口 */
export interface bilibiliConfig {
  /** B站解析开关，单独开关，受「总开关」影响 */
  switch: boolean

  /** B站解析提示，发送提示信息："检测到B站链接，开始解析" */
  tip: boolean

  /** 解析时发送的内容，可选值：'info'(视频信息)、'comment'(评论图片)、'video'(视频文件) */
  sendContent: ['info' | 'comment' | 'video']

  /** B站评论数量，设置接口返回的评论数量，范围1 ~ x 条 */
  numcomment: number

  /** 评论图是否显示真实评论数量，关闭则显示解析到的评论数量 */
  realCommentCount: boolean

  /** 是否收集评论区的图片 */
  commentImageCollection: boolean

  /** 视频画质偏好设置，0 为自动根据大小选择，其他为固定画质
   * - 0: 自动根据大小选择
   * - 6: 240P 极速 (仅MP4格式支持)
   * - 16: 360P 流畅
   * - 32: 480P 清晰
   * - 64: 720P 高清 (WEB默认值)
   * - 74: 720P60 高帧率 (需登录)
   * - 80: 1080P 高清 (TV/APP默认值，需登录)
   * - 112: 1080P+ 高码率 (需大会员)
   * - 116: 1080P60 高帧率 (需大会员)
   * - 120: 4K 超清 (需大会员且支持4K)
   * - 127: 8K 超高清 (需大会员且支持8K)
   */
  videoQuality: 0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120 | 127

  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 0 时生效 */
  maxAutoVideoSize: number

  /** 谁可以触发扫码登录，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'

  /** 解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）：
   * - 'vertical'(逐张上下排列)
   * - 'waterfall'(瀑布流排列)
   * - 'grid'(九宫格排列)
   * - 'auto'（自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格） */
  imageLayout: 'vertical' | 'waterfall' | 'grid' | 'auto'

  /** 视频信息返回形式：
   * - 'text'(文本模式)
   * - 'image'(图片模式) */
  videoInfoMode: 'text' | 'image'

  /** 视频信息的内容，可选值：'cover'(封面)、'title'(标题)、'author'(作者)、'stats'(视频统计信息)、'desc'(简介)，数组为空则不显示任何内容 */
  displayContent: ('cover' | 'title' | 'author' | 'stats' | 'desc')[]

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

  /** 弹幕透明度（0-100，0为完全透明，100为完全不透明） */
  danmakuOpacity: number

  /** 竖屏适配模式（模拟手机端竖屏观看体验）
   * - 'off': 关闭，保持原始视频比例
   * - 'standard': 智能模式，仅对 16:9、21:9 等常见宽屏比例生效
   * - 'force': 强制 9:16，所有视频统一转为竖屏，弹幕大小一致
   */
  verticalMode: 'off' | 'standard' | 'force'

  /** 视频编码格式
   * - 'h264': 兼容性最好，支持几乎所有设备
   * - 'h265': 压缩率更高，近几年设备支持良好（默认）
   * - 'av1': 最新编码格式，压缩率最高，但编码较慢
   */
  videoCodec: 'h264' | 'h265' | 'av1'

  /** B站推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置B站推送 + 用户UID」配置推送列表 */
    switch: boolean
    /** 谁可以设置推送，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
    permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
    /** 推送表达式 */
    cron: string
    /** 推送时是否一同解析该动态 */
    parsedynamic: boolean,
    /** 推送时遇到视频动态时解析的画质偏好设置，0 为自动根据「pushMaxAutoVideoSize」大小选择，其他为固定画质，仅「parsedynamic」为 true 时生效
     * - 0: 自动根据大小选择
     * - 6: 240P 极速 (仅MP4格式支持)
     * - 16: 360P 流畅
     * - 32: 480P 清晰
     * - 64: 720P 高清 (WEB默认值)
     * - 74: 720P60 高帧率 (需登录)
     * - 80: 1080P 高清 (TV/APP默认值，需登录)
     * - 112: 1080P+ 高码率 (需大会员)
     * - 116: 1080P60 高帧率 (需大会员)
     * - 120: 4K 超清 (需大会员且支持4K)
     */
    pushVideoQuality: 0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120

    /** 推送时遇到视频动态时解析的视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「pushVideoQuality」 为 0 且「parsedynamic」为 true时生效 */
    pushMaxAutoVideoSize: number
  }
}
