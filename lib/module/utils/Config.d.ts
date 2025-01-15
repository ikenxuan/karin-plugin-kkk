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
    getDefOrConfig(name: keyof ConfigType): any;
    /** 获取所有配置文件 */
    All(): ConfigType;
    /**
     * 获取 YAML 文件内容
     * @param type 配置文件类型
     * @param name 配置文件名
     * @returns 返回 YAML 文件内容
     */
    private getYaml;
    /**
     * 修改配置文件
     * @param name 文件名
     * @param key 键
     * @param value 值
     * @param type 配置文件类型，默认为用户配置文件 `config`
     */
    Modify(name: keyof ConfigType, key: string, value: any, type?: ConfigDirType): void;
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
type Config = ConfigType & Pick<Cfg, 'All' | 'Modify'>;
export declare const Config: Config;
export {};
