import { appConfig } from './app'
import { bilibiliConfig } from './bilibili'
import { cookiesConfig } from './cookies'
import { douyinConfig } from './douyin'
import { kuaishouConfig } from './kuaishou'
import { pushlistConfig } from './pushlist'
import { requestConfig } from './request'
import { uploadConfig } from './upload'
import { xiaohongshuConfig } from './xiaohongshu'

/** 插件配置类型 */
export interface ConfigType {
  /** 插件应用设置 */
  app: appConfig,
  /** bilibili 相关设置 */
  bilibili: bilibiliConfig,
  /** 抖音相关设置 */
  douyin: douyinConfig
  /** CK 相关设置 */
  cookies: cookiesConfig,
  /** 推送列表 */
  pushlist: pushlistConfig,
  /** 上传相关设置 */
  upload: uploadConfig,
  /** 快手相关设置 */
  kuaishou: kuaishouConfig,
  /** 小红书相关设置 */
  xiaohongshu: xiaohongshuConfig,
  /** 解析库请求配置设置 */
  request: requestConfig
}
