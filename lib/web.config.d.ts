import { LocalApiResponse } from 'node-karin';
import { ConfigType } from './types/index.js';
/** 基础配置的类型 */
type BaseConfigType = {
    [key in keyof Omit<ConfigType, 'pushlist'>]: ConfigType[key];
};
/** 推送列表配置的类型，要单独处理 */
type PushConfigType = {
    'pushlist:douyin': ConfigType['pushlist']['douyin'];
    'pushlist:bilibili': ConfigType['pushlist']['bilibili'];
};
/** 前端传回来新配置的类型 */
type newConfigType = BaseConfigType & PushConfigType;
declare const _default: {
    info: LocalApiResponse;
    /** 动态渲染的组件 */
    components: () => (import("node-karin").DividerProps | import("node-karin").AccordionProps | import("node-karin").AccordionProProps)[];
    /** 前端点击保存之后调用的方法 */
    save: (config: newConfigType) => {
        mergeCfg: ConfigType;
        formatCfg: ConfigType;
        success: boolean;
        message: string;
    };
};
export default _default;
