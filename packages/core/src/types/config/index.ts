import { amagiConfig } from './amagi'
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
  /** amagi 解析库配置 */
  amagi: amagiConfig
  /** 插件应用设置 */
  app: appConfig
  /** bilibili 相关设置 */
  bilibili: bilibiliConfig
  /** 抖音相关设置 */
  douyin: douyinConfig
  /** 快手相关设置 */
  kuaishou: kuaishouConfig
  /** 小红书相关设置 */
  xiaohongshu: xiaohongshuConfig
  /** 推送列表 */
  pushlist: pushlistConfig
}

export type {
  amagiConfig,
  appConfig,
  bilibiliConfig,
  cookiesConfig,
  douyinConfig,
  kuaishouConfig,
  pushlistConfig,
  requestConfig,
  uploadConfig,
  xiaohongshuConfig
}
