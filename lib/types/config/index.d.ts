import { appConfig } from './app.js';
import { bilibiliConfig } from './bilibili.js';
import { cookiesConfig } from './cookies.js';
import { douyinConfig } from './douyin.js';
import { kuaishouConfig } from './kuaishou.js';
import { pushlistConfig } from './pushlist.js';
import { uploadConfig } from './upload.js';
/** 插件配置类型 */
export interface ConfigType {
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
}
