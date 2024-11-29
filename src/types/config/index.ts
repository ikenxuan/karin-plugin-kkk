import { appConfig } from './app'
import { bilibiliConfig } from './bilibili'
import { cookiesConfig } from './cookies'
import { douyinConfig } from './douyin'
import { kuaishouConfig } from './kuaishou'
import { pushlistConfig } from './pushlist'
import { uploadConfig } from './upload'

export interface ConfigType {
  app: appConfig,
  bilibili: bilibiliConfig,
  douyin: douyinConfig
  cookies: cookiesConfig,
  pushlist: pushlistConfig,
  upload: uploadConfig,
  kuaishou: kuaishouConfig
}