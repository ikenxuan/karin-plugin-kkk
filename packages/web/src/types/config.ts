/**
 * 配置类型定义（匹配后端 JSON 结构）
 */

export interface ConfigType {
  /** Amagi 解析库配置（包含 cookies 和 request） */
  amagi: {
    /** 请求超时时间 */
    timeout: number
    /** User-Agent */
    'User-Agent': string
    /** 代理配置 */
    proxy?: {
      switch: boolean
      host: string
      port: number
      protocol: 'http' | 'https'
      auth?: {
        username: string
        password: string
      }
    }
    /** 各平台 Cookies */
    cookies: {
      bilibili: string
      douyin: string
      kuaishou: string
      xiaohongshu: string
    }
    /** API 服务开关 */
    APIServer: boolean
    /** API 服务是否挂载到 Karin */
    APIServerMount: boolean
    /** API 服务端口 */
    APIServerPort: number
  }

  /** 应用配置（包含 upload 配置） */
  app: {
    /** 默认解析优先级 */
    videoTool: boolean
    /** 自定义优先级 */
    priority: number
    /** 自动删除缓存 */
    removeCache: boolean
    /** 渲染精度 */
    renderScale: number
    /** 主题 */
    Theme: number
    /** 移除水印 */
    RemoveWatermark: boolean
    /** 渲染等待时间 */
    RenderWaitTime: number
    /** 表情回应 */
    EmojiReply: boolean
    /** 解析提示 */
    parseTip: boolean
    /** 伪造合并转发 */
    fakeForward: boolean
    /** 错误日志发送目标 */
    errorLogSendTo: Array<'master' | 'allMasters' | 'trigger'>
    /** 分页渲染 */
    multiPageRender: boolean
    /** 分页高度 */
    multiPageHeight: number
    /** Live Photo 系统 */
    livePhotoSystem: 'google' | 'xiaomi' | 'oppo' | 'huawei_honor'
    /** Live Photo 模式 */
    livePhotoMode: 'video_and_livephoto' | 'video_only' | 'livephoto_only'
    /** 扫码登录地址类型 */
    qrLoginAddrType: 'lan' | 'external'
    /** 扫码登录外部地址 */
    qrLoginExternalAddr: string
    /** 视频发送模式 */
    videoSendMode: 'file' | 'base64'
    /** 视频上传拦截 */
    usefilelimit: boolean
    /** 视频拦截阈值 */
    filelimit: number
    /** 压缩视频 */
    compress: boolean
    /** 压缩触发阈值 */
    compresstrigger: number
    /** 压缩后的值 */
    compressvalue: number
    /** 使用群文件 */
    usegroupfile: boolean
    /** 群文件上传阈值 */
    groupfilevalue: number
    /** 图片发送模式 */
    imageSendMode: 'url' | 'file' | 'base64'
    /** 下载限速 */
    downloadThrottle: boolean
    /** 最大下载速度 */
    downloadMaxSpeed: number
    /** 断流自动降速 */
    downloadAutoReduce: boolean
    /** 最低下载速度 */
    downloadMinSpeed: number
  }

  /** 抖音配置 */
  douyin: {
    switch: boolean
    sendContent: Array<'info' | 'comment' | 'video'>
    numcomment: number
    subCommentLimit: number
    commentImageCollection: boolean
    liveImageMergeMode: 'continuous' | 'independent'
    videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'
    maxAutoVideoSize: number
    loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
    videoInfoMode: 'text' | 'image'
    displayContent: Array<'cover' | 'title' | 'author' | 'stats'>
    burnDanmaku: boolean
    danmakuArea: 0.25 | 0.5 | 0.75 | 1
    danmakuFontSize: 'small' | 'medium' | 'large'
    danmakuOpacity: number
    verticalMode: 'off' | 'standard' | 'force'
    videoCodec: 'h264' | 'h265' | 'av1'
    push: {
      switch: boolean
      permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
      cron: string
      parsedynamic: boolean
      shareType: 'web' | 'download'
      pushVideoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'
      pushMaxAutoVideoSize: number
    }
  }

  /** B站配置 */
  bilibili: {
    switch: boolean
    sendContent: Array<'info' | 'comment' | 'video'>
    numcomment: number
    realCommentCount: boolean
    commentImageCollection: boolean
    videoQuality: 0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120 | 127
    maxAutoVideoSize: number
    loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
    imageLayout: 'vertical' | 'waterfall' | 'grid' | 'auto'
    videoInfoMode: 'text' | 'image'
    displayContent: Array<'cover' | 'title' | 'author' | 'stats' | 'desc'>
    burnDanmaku: boolean
    danmakuArea: 0.25 | 0.5 | 0.75 | 1
    danmakuFontSize: 'small' | 'medium' | 'large'
    danmakuOpacity: number
    verticalMode: 'off' | 'standard' | 'force'
    videoCodec: 'h264' | 'h265' | 'av1'
    push: {
      switch: boolean
      permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin'
      cron: string
      parsedynamic: boolean
      pushVideoQuality: 0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120
      pushMaxAutoVideoSize: number
    }
  }

  /** 快手配置 */
  kuaishou: {
    switch: boolean
  }

  /** 小红书配置 */
  xiaohongshu: {
    switch: boolean
    sendContent: Array<'info' | 'comment' | 'image' | 'video'>
    numcomment: number
    videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'
    maxAutoVideoSize: number
  }

  /** 推送列表 */
  pushlist: {
    douyin: unknown[]
    bilibili: unknown[]
  }
}
