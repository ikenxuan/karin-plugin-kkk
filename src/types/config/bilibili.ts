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

  /** 根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载 */
  autoResolution: boolean

  /** 谁可以触发扫码登录，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'

  /** B站推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置B站推送 + 用户UID」配置推送列表 */
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
    /** 推送权限，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
    permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
    /** 推送表达式 */
    cron: string
    /** 推送时是否一同解析该动态 */
    parsedynamic: boolean,
    /** 是否打印日志 */
    log: boolean
  }
}
