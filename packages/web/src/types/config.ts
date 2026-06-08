/**
 * 配置类型定义
 */

export interface ConfigType {
  /** Cookies 配置 */
  cookies?: {
    douyin?: string
    bilibili?: string
    kuaishou?: string
    xiaohongshu?: string
  }

  /** 应用配置 */
  app?: {
    /** 自动删除缓存 */
    removeCache?: boolean
    /** 默认解析优先级 */
    videoTool?: boolean
    /** 自定义优先级 */
    priority?: number
    /** 渲染精度 */
    renderScale?: number
    /** 主题 */
    Theme?: number
    /** 移除水印 */
    RemoveWatermark?: boolean
    /** 渲染等待时间 */
    RenderWaitTime?: number
    /** 分页渲染 */
    multiPageRender?: boolean
    /** 分页高度 */
    multiPageHeight?: number
    /** Live Photo 模式 */
    livePhotoMode?: string
    /** Live Photo 系统 */
    livePhotoSystem?: string
    /** API 服务 */
    APIServer?: boolean
    /** API 服务挂载 */
    APIServerMount?: boolean
    /** API 服务端口 */
    APIServerPort?: number
    /** 表情回应 */
    EmojiReply?: boolean
    /** 解析提示 */
    parseTip?: boolean
    /** 伪造合并转发 */
    fakeForward?: boolean
    /** 错误日志发送目标 */
    errorLogSendTo?: string[]
    /** 扫码登录地址类型 */
    qrLoginAddrType?: string
    /** 扫码登录外部地址 */
    qrLoginExternalAddr?: string
  }

  /** 抖音配置 */
  douyin?: {
    switch?: boolean
    sendContent?: string[]
    numcomment?: number
    subCommentLimit?: number
    subCommentDepth?: number
    realCommentCount?: boolean
    commentImageCollection?: boolean
    liveImageMergeMode?: string
    textMode?: boolean
    videoQuality?: string
    maxAutoVideoSize?: number
    loginPerm?: string
    videoInfoMode?: string
    displayContent?: string[]
    burnDanmaku?: boolean
    danmakuArea?: number
    danmakuFontSize?: string
    danmakuOpacity?: number
    verticalMode?: string
    videoCodec?: string
    push?: {
      switch?: boolean
      permission?: string
      cron?: string
      parsedynamic?: boolean
      shareType?: string
      pushVideoQuality?: string
      pushMaxAutoVideoSize?: number
    }
  }

  /** B站配置 */
  bilibili?: {
    switch?: boolean
    sendContent?: string[]
    numcomment?: number
    realCommentCount?: boolean
    commentImageCollection?: boolean
    videoQuality?: number
    maxAutoVideoSize?: number
    loginPerm?: string
    imageLayout?: string
    videoInfoMode?: string
    displayContent?: string[]
    burnDanmaku?: boolean
    danmakuArea?: number
    danmakuFontSize?: string
    danmakuOpacity?: number
    verticalMode?: string
    videoCodec?: string
    push?: {
      switch?: boolean
      permission?: string
      cron?: string
      parsedynamic?: boolean
      pushVideoQuality?: number
      pushMaxAutoVideoSize?: number
    }
  }

  /** 快手配置 */
  kuaishou?: {
    switch?: boolean
    comment?: boolean
    numcomment?: number
  }

  /** 小红书配置 */
  xiaohongshu?: {
    switch?: boolean
    sendContent?: string[]
    numcomment?: number
    videoQuality?: string
    maxAutoVideoSize?: number
  }

  /** 上传配置 */
  upload?: {
    /** 视频发送模式 */
    videoSendMode?: string
    /** 使用群文件 */
    usegroupfile?: boolean
    /** 群文件上传阈值 */
    groupfilevalue?: number
    /** 图片发送模式 */
    imageSendMode?: string
    /** 视频上传拦截 */
    usefilelimit?: boolean
    /** 视频拦截阈值 */
    filelimit?: number
    /** 压缩视频 */
    compress?: boolean
    /** 压缩触发阈值 */
    compresstrigger?: number
    /** 压缩后的值 */
    compressvalue?: number
    /** 下载限速 */
    downloadThrottle?: boolean
    /** 最大下载速度 */
    downloadMaxSpeed?: number
    /** 断流自动降速 */
    downloadAutoReduce?: boolean
    /** 最低下载速度 */
    downloadMinSpeed?: number
  }

  /** 请求配置 */
  request?: {
    /** 超时时间 */
    timeout?: number
    /** User-Agent */
    'User-Agent'?: string
    /** 代理配置 */
    proxy?: {
      switch?: boolean
      host?: string
      port?: number
      protocol?: string
      auth?: {
        username?: string
        password?: string
      }
    }
  }

  /** 推送列表 */
  pushlist?: {
    douyin?: unknown[]
    bilibili?: unknown[]
  }
}
