import { appConfig } from './app'
import { bilibiliConfig } from './bilibili'
import { cookiesConfig } from './cookies'
import { pushlistConfig } from './pushlist'
import { douyinConfig } from './douyin'
import { uploadConfig } from './upload'
import { kuaishouConfig } from './kuaishou'

export interface ConfigType {
  app: appConfig,
  bilibili: bilibiliConfig,
  douyin: douyinConfig
  cookies: cookiesConfig,
  pushlist: pushlistConfig,
  upload: uploadConfig,
  kuaishou: kuaishouConfig
}