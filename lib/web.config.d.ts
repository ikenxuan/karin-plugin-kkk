import { ConfigType } from './types/index.js';
declare const _default: {
    info: {};
    /** 动态渲染的组件 */
    components: () => (import("node-karin").DividerProps | import("node-karin").AccordionProps | import("node-karin").AccordionProProps)[];
    /** 前端点击保存之后调用的方法 */
    save: (config: any) => {
        fullData: ConfigType;
        formatCfg: ConfigType;
        success: boolean;
        message: string;
    };
};
export default _default;
