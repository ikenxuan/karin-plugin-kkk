/** 小红书配置 */
export interface xiaohongshuConfig {
  /** 是否开启小红书解析功能 */
  switch: boolean

  /** 解析时发送的内容，可选值：'info'(笔记、视频信息)、'comment'(评论图片)、'image'(笔记图片)、'video'(视频文件) */
  sendContent: ('info' | 'comment' | 'image' | 'video')[]

  /** 小红书评论数量 */
  numcomment: number

  /**
   * 子评论（楼中楼）请求数量。
   *
   * ≤ 2 时不请求子评论接口 —— 一级评论响应自带的预览就是每条最多 2 条，直接渲染即可；
   * 大于 2 时对带子评论的一级评论逐条请求，取回后与预览合并去重再渲染。
   * 仅在配置了小红书 ck 时生效（平台不允许游客拿二级评论）。
   */
  subCommentLimit: number

  /**
   * 视频画质偏好设置，'adapt' 为自动根据「maxAutoVideoSize」大小选择，其他为固定画质
   * - '540p': 540P 标清
   * - '720p': 720P 高清
   * - '1080p': 1080P 超清
   * - '2k': 2K 超高清
   * - '4k': 4K 超高清
   */
  videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'

  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
  maxAutoVideoSize: number

  /** 谁可以触发扫码登录：all 所有人，admin 管理员，master 主人，group.owner 群主，group.admin 群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
}
