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

  /** 根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载 */
  autoResolution: boolean

  /** 谁可以触发扫码登录，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'

  /** 解析时是否直接输出文本，关闭后渲染为图片 */
  textMode: boolean

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
  }
}
