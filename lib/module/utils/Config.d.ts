import YAML from 'node-karin/yaml';
import { ConfigType } from '../../types/index.js';
type ConfigDirType = 'config' | 'default_config';
declare class Cfg {
    /** 用户配置文件路径 */
    private dirCfgPath;
    /** 默认配置文件路径 */
    private defCfgPath;
    constructor();
    /** 初始化配置 */
    initCfg(): this;
    /**
     * 获取默认配置和用户配置
     * @param name 配置文件名
     * @returns 返回合并后的配置
     */
    getDefOrConfig(name: keyof ConfigType): {
        bilibili: string;
        douyin: string;
        kuaishou: string;
    } | {
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
        bilibili: string;
        douyin: string;
        kuaishou: string;
    } | {
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
        bilibili: string;
        douyin: string;
        kuaishou: string;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        bilibili: string;
        douyin: string;
        kuaishou: string;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        bilibili: string;
        douyin: string;
        kuaishou: string;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        bilibili: string;
        douyin: string;
        kuaishou: string;
    } | {
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
        kuaishou: string;
    } | {
        bilibili: string;
        douyin: string;
        kuaishou: string;
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
    } | {
        [x: string]: any;
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
    } | {
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
    } | {
        [x: string]: any;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
    } | {
        [x: string]: any;
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
    } | {
        bilibili: string;
        douyin: string;
        kuaishou: string;
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
    } | {
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
    } | {
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
    } | {
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
    } | {
        bilibili: string;
        douyin: string;
        kuaishou: string;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        videopriority: boolean;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        bilibili: string;
        douyin: string;
        kuaishou: string;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        bilibili: string;
        douyin: string;
        kuaishou: string;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
    } | {
        [x: string]: any;
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
    } | {
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
    } | {
        [x: string]: any;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
    } | {
        [x: string]: any;
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
    } | {
        bilibili: string;
        douyin: string;
        kuaishou: string;
    } | {
        [x: string]: any;
        sendbase64: boolean;
        usefilelimit: boolean;
        filelimit: number;
        compress: boolean;
        compresstrigger: number;
        compressvalue: number;
        usegroupfile: boolean;
        groupfilevalue: number;
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
    } | {
        defaulttool: boolean;
        priority: number;
        rmmp4: boolean;
        renderScale: number;
        APIServer: boolean;
        APIServerPort: number;
        APIServerMount: boolean;
        Theme: number;
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        videopriority: boolean;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
    } | {
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        autoResolution: boolean;
        push: {
            switch: boolean;
            banWords: string[];
            banTags: string[];
            permission: "all" | "admin" | "master" | "group.owner" | "group.admin";
            cron: string;
            parsedynamic: boolean;
            log: boolean;
        };
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
    } | {
        [x: string]: any;
        switch: boolean;
        tip: boolean;
        comment: boolean;
        numcomment: number;
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
    } | {
        [x: string]: any;
        douyin: import("../../types/config/pushlist.js").douyinPushItem[];
        bilibili: import("../../types/config/pushlist.js").bilibiliPushItem[];
    };
    /** 获取所有配置文件 */
    All(): ConfigType;
    /**
     * 获取 YAML 文件内容
     * @param type 配置文件类型
     * @param name 配置文件名
     * @returns 返回 YAML 文件内容
     */
    private getYaml;
    /** 由于上游类型定义错误，导致下游需要手动对已设置的内容进行类型转换。。。 */
    private convertType;
    /**
     * 修改配置文件
     * @param name 文件名
     * @param key 键
     * @param value 值
     * @param type 配置文件类型，默认为用户配置文件 `config`
     */
    Modify(name: keyof ConfigType, key: string, value: any, type?: ConfigDirType): void;
    /**
   * 修改整个配置文件，保留注释
   * @param name 文件名
   * @param config 完整的配置对象
   * @param type 配置文件类型，默认为用户配置文件 `config`
   */
    ModifyPro<T extends keyof ConfigType>(name: T, config: ConfigType[T], type?: ConfigDirType): boolean;
    /**
   * 深度合并YAML节点（保留目标注释）
   * @param target 目标节点（保留注释的原始节点）
   * @param source 源节点（提供新值的节点）
   */
    private deepMergeYaml;
    /**
     * 在YAML映射中设置嵌套值
     *
     * 该函数用于在给定的YAML映射（map）中，根据指定的键路径（keys）设置值（value）
     * 如果键路径不存在，该函数会创建必要的嵌套映射结构并设置值
     *
     * @param map YAML映射，作为设置值的目标
     * @param keys 键路径，表示要设置的值的位置
     * @param value 要设置的值
     */
    setNestedValue(map: YAML.YAMLMap, keys: string[], value: any): void;
    mergeObjectsWithPriority(userDoc: YAML.Document.Parsed, defaultDoc: YAML.Document.Parsed): {
        result: YAML.Document.Parsed;
        differences: boolean;
    };
}
type Config = ConfigType & Pick<Cfg, 'All' | 'Modify' | 'ModifyPro'>;
export declare const Config: Config;
export {};
