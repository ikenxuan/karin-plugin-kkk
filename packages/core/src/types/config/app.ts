/** 定义视频解析工具的配置接口 */
export interface appConfig {
  /** 默认解析，即识别最高优先级，修改后重启生效 */
  videoTool: boolean

  /** 自定义优先级，「默认解析」关闭后才会生效。修改后重启生效 */
  priority: number

  /** 缓存自动删除，非必要不修改！ */
  removeCache: boolean

  /** 渲染精度，可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度 */
  renderScale: number

  /** 本地部署一个视频解析API服务，接口范围为本插件用到的所有，默认端口4567 */
  APIServer: boolean

  /** API服务端口 */
  APIServerPort: number

  /** API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启 */
  APIServerMount: boolean

  /** 渲染图片的主题色，0为自动，1为浅色，2为深色 */
  Theme: number

  /** 渲染的图片是否移除底部水印 */
  RemoveWatermark: boolean

  /** 渲染图片的等待时间，单位：秒；传递0可禁用 */
  RenderWaitTime: number

  /** 表情回应，若适配器不支持需要关闭 */
  EmojiReply: boolean

  // /**
  //  * 表情 ID
  //  * @see https://github.com/NapNeko/NapCatQQ/blob/main/packages/napcat-core/external/face_config.json
  //  */
  // EmojiReplyID: number

  // /** 忽略表情回应失败，开启后表情回应失败时不会抛出错误 */
  // EmojiReplyIgnoreError: boolean

  /** 遇到错误时谁会收到错误日志？可选值：'master'（除'console'外的第一个主人）、'allMasters'（所有主人，排除console）、'trigger'（触发者） */
  errorLogSendTo: Array<'master' | 'allMasters' | 'trigger'>

  /** 分页渲染，将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改 */
  multiPageRender: boolean

  /** 分页渲染时，每页的高度，经测试最佳每页高度为12000px，默认12000px */
  multiPageHeight: number

  /** 扫码登录时使用的地址类型，可选值：'lan'（局域网IP）、'external'（外部地址） */
  qrLoginAddrType: 'lan' | 'external'

  /** 外部访问地址（当 qrLoginAddrType 为 'external' 时使用，可以是公网IP或域名） */
  qrLoginExternalAddr: string
}
