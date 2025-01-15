export interface uploadConfig {
  [key: string]: any

  /** 发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启 */
  sendbase64: boolean

  /** 视频文件上传限制，开启后会根据解析的视频文件大小判断是否需要上传 */
  usefilelimit: boolean

  /** 视频文件大小限制（填数字），视频文件大于该数值则不会上传 单位: MB，「usefilelimit」开启后才会生效 */
  filelimit: number

  /** 压缩视频，开启后会将视频文件压缩后再上传，适合上传大文件 */
  compress: boolean

  /** 压缩视频触发阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「compress」开启后才会生效 */
  compresstrigger: number

  /** 压缩后的视频大小，单位：MB。若下载的视频大于该值，则会由本插件进行压缩至该值（±10 %），「compress」开启后才会生效 */
  compressvalue: number

  /** 使用群文件上传，开启后会将视频文件上传到群文件中 */
  usegroupfile: boolean

  /** 群文件上传阈值，当文件大小超过该值时将使用群文件上传，单位：MB，「usegroupfile」开启后才会生效 */
  groupfilevalue: number
}
