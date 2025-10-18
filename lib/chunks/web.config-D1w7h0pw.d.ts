import * as node_karin13 from "node-karin";

//#region src/types/config/app.d.ts
/** 定义视频解析工具的配置接口 */
interface appConfig {
  /** 默认解析，即识别最高优先级，修改后重启生效 */
  videoTool: boolean;
  /** 自定义优先级，「默认解析」关闭后才会生效。修改后重启生效 */
  priority: number;
  /** 缓存自动删除，非必要不修改！ */
  removeCache: boolean;
  /** 渲染精度，可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度 */
  renderScale: number;
  /** 本地部署一个视频解析API服务，接口范围为本插件用到的所有，默认端口4567 */
  APIServer: boolean;
  /** API服务端口 */
  APIServerPort: number;
  /** API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启 */
  APIServerMount: boolean;
  /** 渲染图片的主题色，0为自动，1为浅色，2为深色 */
  Theme: number;
  /** 渲染的图片是否移除底部水印 */
  RemoveWatermark: boolean;
  /** 渲染图片的等待时间，单位：秒；传递0可禁用 */
  RenderWaitTime: number;
  /** 表情回应，若适配器不支持需要关闭 */
  EmojiReply: boolean;
  /**
   * 表情 ID
   * @see https://github.com/NapNeko/NapCatQQ/blob/main/src/core/external/face_config.json
   */
  EmojiReplyID: number;
  /** web解析页面是否启用鉴权 */
  webAuth: boolean;
  /** 遇到错误时谁会收到错误日志？可选值：'master'（除console'外的第一个主人）、'trigger'（触发者） */
  errorLogSendTo: ['master' | 'trigger'];
  /** 分页渲染，将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改 */
  multiPageRender: boolean;
  /** 分页渲染时，每页的高度，经测试最佳每页高度为12000px，默认12000px */
  multiPageHeight: number;
}
//#endregion
//#region src/types/config/bilibili.d.ts
/** 定义B站解析工具的配置接口 */
interface bilibiliConfig {
  /** B站解析开关，单独开关，受「总开关」影响 */
  switch: boolean;
  /** B站解析提示，发送提示信息："检测到B站链接，开始解析" */
  tip: boolean;
  /** 解析时发送的内容，可选值：'info'(视频信息)、'comment'(评论图片)、'video'(视频文件) */
  sendContent: ['info' | 'comment' | 'video'];
  /** B站评论数量，设置接口返回的评论数量，范围1 ~ x 条 */
  numcomment: number;
  /** 评论图是否显示真实评论数量，关闭则显示解析到的评论数量 */
  realCommentCount: boolean;
  /** 解析视频是否优先保内容，true为优先保证上传将使用最低分辨率，false则使用自定义画质偏好 */
  videopriority: boolean;
  /** 视频画质偏好设置，0 为自动根据大小选择，其他为固定画质
   * - 0: 自动根据大小选择
   * - 6: 240P 极速 (仅MP4格式支持)
   * - 16: 360P 流畅
   * - 32: 480P 清晰
   * - 64: 720P 高清 (WEB默认值)
   * - 74: 720P60 高帧率 (需登录)
   * - 80: 1080P 高清 (TV/APP默认值，需登录)
   * - 112: 1080P+ 高码率 (需大会员)
   * - 116: 1080P60 高帧率 (需大会员)
   * - 120: 4K 超清 (需大会员且支持4K)
   * - 127: 8K 超高清 (需大会员且支持8K)
   */
  videoQuality: 0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120 | 127;
  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 0 时生效 */
  maxAutoVideoSize: number;
  /** 谁可以触发扫码登录，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin';
  /** 解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）：
   * - 'vertical'(逐张上下排列)
   * - 'waterfall'(瀑布流排列)
   * - 'grid'(九宫格排列)
   * - 'auto'（自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格） */
  imageLayout: 'vertical' | 'waterfall' | 'grid' | 'auto';
  /** 视频信息返回形式：
   * - 'text'(文本模式)
   * - 'image'(图片模式) */
  videoInfoMode: 'text' | 'image';
  /** 视频信息的内容，可选值：'cover'(封面)、'title'(标题)、'author'(作者)、'stats'(视频统计信息)、'desc'(简介)，数组为空则不显示任何内容 */
  displayContent: ('cover' | 'title' | 'author' | 'stats' | 'desc')[];
  /** B站推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置B站推送 + 用户UID」配置推送列表 */
    switch: boolean;
    /** 谁可以设置推送，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
    permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin';
    /** 推送表达式 */
    cron: string;
    /** 推送时是否一同解析该动态 */
    parsedynamic: boolean;
    /** 是否打印日志 */
    log: boolean;
    /** 推送时遇到视频动态时解析的画质偏好设置，0 为自动根据「pushMaxAutoVideoSize」大小选择，其他为固定画质，仅「parsedynamic」为 true 时生效
     * - 0: 自动根据大小选择
     * - 6: 240P 极速 (仅MP4格式支持)
     * - 16: 360P 流畅
     * - 32: 480P 清晰
     * - 64: 720P 高清 (WEB默认值)
     * - 74: 720P60 高帧率 (需登录)
     * - 80: 1080P 高清 (TV/APP默认值，需登录)
     * - 112: 1080P+ 高码率 (需大会员)
     * - 116: 1080P60 高帧率 (需大会员)
     * - 120: 4K 超清 (需大会员且支持4K)
     */
    pushVideoQuality: 0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120;
    /** 推送时遇到视频动态时解析的视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「pushVideoQuality」 为 0 且「parsedynamic」为 true时生效 */
    pushMaxAutoVideoSize: number;
  };
}
//#endregion
//#region src/types/config/cookies.d.ts
/** 定义不同平台用户ck的配置接口 */
interface cookiesConfig {
  /** B站ck */
  bilibili: string;
  /** 抖音ck */
  douyin: string;
  /** 快手ck */
  kuaishou: string;
  /** 小红书ck */
  xiaohongshu: string;
}
//#endregion
//#region src/types/config/douyin.d.ts
/** 定义抖音解析工具的配置接口 */
interface douyinConfig {
  /** 抖音解析开关，单独开关，受「总开关」影响 */
  switch: boolean;
  /** 抖音解析提示，发送提示信息："检测到抖音链接，开始解析" */
  tip: boolean;
  /** 解析时发送的内容，可选值：'info'(视频信息)、'comment'(评论图片)、'video'(视频文件) */
  sendContent: ['info' | 'comment' | 'video'];
  /** 抖音评论数量，范围1 ~ x 条 */
  numcomment: number;
  /** 评论图是否显示真实评论数量，关闭则显示解析到的评论数量 */
  realCommentCount: boolean;
  /** 视频画质偏好设置，'adapt' 为自动根据「maxAutoVideoSize」大小选择，其他为固定画质 */
  videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k';
  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
  maxAutoVideoSize: number;
  /** 谁可以触发扫码登录，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
  loginPerm: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin';
  /** 视频信息返回形式：
   * - 'text'(文本模式)
   * - 'image'(图片模式) */
  videoInfoMode: 'text' | 'image';
  /** 视频信息的内容，可选值：'cover'(封面)、'title'(标题)、'author'(作者)、'stats'(视频统计信息)，数组为空则不显示任何内容 */
  displayContent: ('cover' | 'title' | 'author' | 'stats')[];
  /** 抖音推送相关配置 */
  push: {
    /** 推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表 */
    switch: boolean;
    /** 谁可以设置推送，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员。修改后需重启 */
    permission: 'all' | 'admin' | 'master' | 'group.owner' | 'group.admin';
    /** 推送表达式 */
    cron: string;
    /** 推送时是否一同解析该作品 */
    parsedynamic: boolean;
    /** 是否打印日志 */
    log: boolean;
    /** 分享链接二维码的类型，web为跳转到抖音网页，download为视频下载直链 */
    shareType: 'web' | 'download';
    /** 推送解析时视频画质偏好设置，'adapt' 为自动根据「maxAutoVideoSize」大小选择，其他为固定画质 */
    videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k';
    /** 推送解析时视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
    maxAutoVideoSize: number;
  };
}
//#endregion
//#region src/types/config/kuaishou.d.ts
interface kuaishouConfig {
  /** 快手解析开关，单独开关，受「总开关」影响 */
  switch: boolean;
  /** 快手解析提示，发送提示信息：“检测到快手链接，开始解析” */
  tip: boolean;
  /** 快手评论解析，发送快手作品评论图 */
  comment: boolean;
  /** 快手评论数量，范围1~30条 */
  numcomment: number;
}
//#endregion
//#region src/types/config/pushlist.d.ts
/** 定义推送列表项的接口 */
type douyinPushItem = {
  /** 是否启用 */
  switch: boolean;
  /** sec_uid，与short_id二选一 */
  sec_uid: string;
  /** 抖音号，与sec_uid二选一 */
  short_id: string;
  /** 推送群号和机器人账号，多个则使用逗号隔开，必填。如：群号1:机器人账号1 */
  group_id: string[];
  /** 博主或UP主的名字信息，可不填 */
  remark: string;
  /** 黑名单：命中不推送；白名单：命中才推送 */
  filterMode?: 'blacklist' | 'whitelist';
  /** 指定关键词 */
  Keywords?: string[];
  /** 指定标签 */
  Tags?: string[];
};
/** 定义推送列表项的接口 */
type bilibiliPushItem = {
  /** 是否启用 */
  switch: boolean;
  /** B站用户的UID，必填 */
  host_mid: number;
  /** 推送群号和机器人账号，多个则使用逗号隔开，必填。如：群号1:机器人账号1 */
  group_id: string[];
  /** 博主或UP主的名字信息，可不填 */
  remark: string;
  /** 黑名单：命中不推送；白名单：命中才推送 */
  filterMode?: 'blacklist' | 'whitelist';
  /** 指定关键词 */
  Keywords?: string[];
  /** 指定标签 */
  Tags?: string[];
};
/** 定义抖音和B站推送列表的接口 */
type pushlistConfig = {
  /** 抖音推送列表的接口 */
  douyin: douyinPushItem[];
  /** B站推送列表的接口 */
  bilibili: bilibiliPushItem[];
};
//#endregion
//#region src/types/config/request.d.ts
/** amagi 解析库请求配置 */
type requestConfig = {
  /** 请求超时时间，单位：毫秒 */
  timeout: number;
  /** 浏览器用户代理 */
  'User-Agent': string;
  /** 代理配置 */
  proxy?: {
    /** 代理开关 */
    switch: boolean;
    /** 代理主机 */
    host: string;
    /** 代理端口 */
    port: number;
    /** 代理协议 */
    protocol: 'http' | 'https';
    /** 代理认证 */
    auth?: {
      /** 用户名 */
      username: string;
      /** 密码 */
      password: string;
    };
  };
};
//#endregion
//#region src/types/config/upload.d.ts
interface uploadConfig {
  /** 发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启 */
  sendbase64: boolean;
  /** 视频上传拦截，开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。 */
  usefilelimit: boolean;
  /** 视频拦截阈值，视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。 */
  filelimit: number;
  /** 压缩视频，开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」 */
  compress: boolean;
  /** 压缩触发阈值，触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效 */
  compresstrigger: number;
  /** 压缩后的值，单位：MB。若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效 */
  compressvalue: number;
  /** 群文件上传，使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」 */
  usegroupfile: boolean;
  /** 群文件上传阈值，当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效 */
  groupfilevalue: number;
}
//#endregion
//#region src/types/config/xiaohongshu.d.ts
/** 小红书配置 */
interface xiaohongshuConfig {
  /** 是否开启小红书解析功能 */
  switch: boolean;
  /** 小红书解析提示，发送提示信息：“检测到小红书链接，开始解析” */
  tip: boolean;
  /** 解析时发送的内容，可选值：'info'(笔记、视频信息)、'comment'(评论图片)、'image'(笔记图片)、'video'(视频文件) */
  sendContent: ('info' | 'comment' | 'image' | 'video')[];
  /** 小红书评论数量 */
  numcomment: number;
  /** 视频画质偏好设置，'adapt' 为自动根据「maxAutoVideoSize」大小选择，其他为固定画质 */
  videoQuality: 'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k';
  /** 视频体积上限，自动画质模式下可接受的最大视频大小（单位：MB），仅在 「videoQuality」 为 'adapt' 时生效 */
  maxAutoVideoSize: number;
}
//#endregion
//#region src/types/config/index.d.ts
/** 插件配置类型 */
interface ConfigType {
  /** 插件应用设置 */
  app: appConfig;
  /** bilibili 相关设置 */
  bilibili: bilibiliConfig;
  /** 抖音相关设置 */
  douyin: douyinConfig;
  /** CK 相关设置 */
  cookies: cookiesConfig;
  /** 推送列表 */
  pushlist: pushlistConfig;
  /** 上传相关设置 */
  upload: uploadConfig;
  /** 快手相关设置 */
  kuaishou: kuaishouConfig;
  /** 小红书相关设置 */
  xiaohongshu: xiaohongshuConfig;
  /** 解析库请求配置设置 */
  request: requestConfig;
}
//#endregion
//#region src/web.config.d.ts
/** 基础配置的类型 */
type BaseConfigType = { [key in keyof Omit<ConfigType, 'pushlist'>]: ConfigType[key] };
/** 推送列表配置的类型，要单独处理 */
type PushConfigType = {
  'pushlist:douyin': ConfigType['pushlist']['douyin'];
  'pushlist:bilibili': ConfigType['pushlist']['bilibili'];
};
/** 前端传回来新配置的类型 */
type newConfigType = BaseConfigType & PushConfigType;
declare const webConfig: node_karin13.DefineConfig<newConfigType>;
//#endregion
export { webConfig };