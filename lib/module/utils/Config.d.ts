import { ConfigType } from '../../types/index.js';
type ConfigDirType = 'config' | 'default_config';
declare class config {
    private config;
    private watcher;
    constructor();
    /** 初始化配置 */
    private initCfg;
    /** 插件相关配置 */
    get app(): ConfigType['app'];
    /** ck相关配置 */
    get cookies(): ConfigType['cookies'];
    /** 抖音相关配置 */
    get douyin(): ConfigType['douyin'];
    /** B站相关配置 */
    get bilibili(): ConfigType['bilibili'];
    /** 推送列表 */
    get pushlist(): ConfigType['pushlist'];
    /** 上传相关配置 */
    get upload(): ConfigType['upload'];
    /** 快手相关配置 */
    get kuaishou(): ConfigType['kuaishou'];
    All(): ConfigType;
    /** 默认配置和用户配置 */
    private getDefOrConfig;
    /** 默认配置 */
    private getdefSet;
    /** 用户配置 */
    private getConfig;
    /**
     * 获取配置yaml
     * @param type 默认跑配置-defSet，用户配置-config
     * @param name 名称
     */
    private getYaml;
    /** 监听配置文件 */
    private watch;
    /**
     * 修改设置
     * @param name 文件名
     * @param key 修改的key值
     * @param value 修改的value值
     * @param type 配置文件或默认
     */
    modify(name: 'cookies' | 'app' | 'douyin' | 'bilibili' | 'pushlist' | 'upload' | 'kuaishou', key: string, value: any, type?: ConfigDirType): void;
    private mergeObjectsWithPriority;
}
export declare const Config: config;
export {};
