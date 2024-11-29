import { appConfig } from './app.js';
import { bilibiliConfig } from './bilibili.js';
import { cookiesConfig } from './cookies.js';
import { douyinConfig } from './douyin.js';
import { kuaishouConfig } from './kuaishou.js';
import { pushlistConfig } from './pushlist.js';
import { uploadConfig } from './upload.js';
export interface ConfigType {
    app: appConfig;
    bilibili: bilibiliConfig;
    douyin: douyinConfig;
    cookies: cookiesConfig;
    pushlist: pushlistConfig;
    upload: uploadConfig;
    kuaishou: kuaishouConfig;
}
