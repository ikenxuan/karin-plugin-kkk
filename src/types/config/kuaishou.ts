export interface kuaishouConfig {
  [key: string]: any
  /** 快手解析开关，单独开关，受「总开关」影响 */
  switch: boolean

  /** 快手解析提示，发送提示信息：“检测到快手链接，开始解析” */
  tip: boolean

  /** 快手评论数量，范围1~30条 */
  numcomment: number
}