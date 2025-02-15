import { ConfigType } from './types/index.js';
declare const _default: {
    info: {};
    /** 动态渲染的组件 */
    components: () => (import("node-karin").AccordionProps | import("node-karin").InputProps | import("node-karin").SwitchProps | import("node-karin").DividerProps)[];
    /** 前端点击保存之后调用的方法 */
    save: (config: ConfigType) => {
        success: boolean;
        message: string;
    };
};
export default _default;
