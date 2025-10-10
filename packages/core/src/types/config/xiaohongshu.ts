/** 小红书配置 */
export interface xiaohongshuConfig {
  /** 是否开启小红书解析功能 */
  switch: boolean
  /** 小红书解析提示，发送提示信息：“检测到小红书链接，开始解析” */
  tip: boolean
  /** 解析时发送的内容，可选值：'info'(笔记、视频信息)、'comment'(评论图片)、'video'(视频文件) */
  sendContent: ('info' | 'comment' | 'video')[]
  /** 小红书评论数量 */
  numcomment: number
  /** 视频画质偏好设置，'adapt' 为自动根据「maxAutoVideoSize」大小选择，其他为固定画质 */
  videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'
  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
  maxAutoVideoSize: number
}