export interface kuaishouConfig {
  /** 快手解析开关，单独开关，受「总开关」影响 */
  switch: boolean

  /** 快手评论解析，发送快手作品评论图 */
  comment: boolean

  /** 快手评论数量，范围1~30条 */
  numcomment: number

  /** 谁可以触发扫码登录：all 所有人，admin 管理员，master 主人，group.owner 群主，group.admin 群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
}
