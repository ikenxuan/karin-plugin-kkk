export interface uploadConfig {
  [key: string]: any

  /** 发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启 */
  sendbase64: boolean

  /** 视频上传拦截，开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。 */
  usefilelimit: boolean

  /** 视频拦截阈值，视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。 */
  filelimit: number

  /** 压缩视频，开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」 */
  compress: boolean

  /** 压缩触发阈值，触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效 */
  compresstrigger: number

  /** 压缩后的值，单位：MB。若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效 */
  compressvalue: number

  /** 群文件上传，使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」 */
  usegroupfile: boolean

  /** 群文件上传阈值，当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效 */
  groupfilevalue: number
}
