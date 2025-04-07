/** 定义抖音解析工具的配置接口 */
export interface douyinConfig {
  /** 抖音解析开关，单独开关，受「总开关」影响 */
  switch: boolean

  /** 抖音解析提示，发送提示信息："检测到抖音链接，开始解析" */
  tip: boolean

  /** 抖音评论解析，发送抖音作品评论图 */
  comment: boolean

  /** 抖音评论数量，范围1 ~ x 条 */
  numcomment: number

  /** 根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载 */
  autoResolution: boolean

  /** 抖音推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表 */
    switch: boolean
    /** 过滤模式：blacklist为黑名单模式，whitelist为白名单模式 */
    filterMode: 'blacklist' | 'whitelist'
    /** 黑名单模式：作品中有指定关键词时，不推送 */
    filterKeywords: string[]
    /** 黑名单模式：作品中有指定标签时，不推送 */
    filterTags: string[]
    /** 白名单模式：作品中有指定关键词时，才推送 */
    whitelistKeywords: string[]
    /** 白名单模式：作品中有指定标签时，才推送 */
    whitelistTags: string[]
    /** 推送权限，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员 */
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
