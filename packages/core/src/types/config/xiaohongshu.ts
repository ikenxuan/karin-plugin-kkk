/** 小红书配置 */
export interface xiaohongshuConfig {
  /** 是否开启小红书解析功能 */
  switch: boolean
  /** 解析提示 */
  tip?: string
  /** 解析时发送的内容，可选值：'info'(笔记、视频信息)、'comment'(评论图片)、'video'(视频文件) */
  sendContent: ['info' | 'comment']
  /** 小红书评论数量 */
  numcomment: number
}