/** 定义B站解析工具的配置接口 */
export interface bilibiliConfig {
  /** B站解析开关，单独开关，受「总开关」影响 */
  switch: boolean

  /** B站解析提示，发送提示信息："检测到B站链接，开始解析" */
  tip: boolean

  /** B站评论图，发送哔哩哔哩作品评论图 */
  comment: boolean

  /** B站评论数量，设置接口返回的评论数量，范围1 ~ x 条 */
  numcomment: number

  /** 解析视频是否优先保内容，true为优先保证上传将使用最低分辨率，false为优先保清晰度将使用最高分辨率 */
  videopriority: boolean

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
   */
  videoQuality: 0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120

  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 0 时生效 */
  maxAutoVideoSize: number

  /** 评论解析前显示的内容，可选值：'cover'(封面)、'title'(标题)、'author'(作者)、'stats'(视频统计信息)、'desc'(简介)，数组为空则不显示任何内容 */
  displayContent: ['cover' | 'title' | 'author' | 'stats' | 'desc']

  /** 谁可以触发扫码登录，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'

  /** B站推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置B站推送 + 用户UID」配置推送列表 */
    switch: boolean
    /** 推送权限，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
    permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
    /** 推送表达式 */
    cron: string
    /** 推送时是否一同解析该动态 */
    parsedynamic: boolean,
    /** 是否打印日志 */
    log: boolean
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
