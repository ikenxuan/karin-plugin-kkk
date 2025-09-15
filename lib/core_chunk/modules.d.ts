/**
 * 渲染请求参数接口
 */
interface RenderRequest<T = any> {
    /** 模板类型 */
    templateType: 'douyin' | 'bilibili' | 'kuaishou' | 'admin' | 'help' | 'apiError';
    /** 模板名称 */
    templateName: string;
    /** 缩放比例 */
    scale?: number;
    /** 是否使用深色主题 */
    useDarkTheme?: boolean;
    /** 版本信息 */
    version: {
        /** 插件名称 */
        pluginName: string;
        /** 插件版本 */
        pluginVersion: string;
        /** 发布类型 */
        releaseType: string;
        /** 驱动框架 */
        poweredBy: string;
    };
    /** 渲染数据 */
    data: T & {
        /** 是否使用深色主题 */
        useDarkTheme?: boolean;
        /** 二维码分享链接 */
        share_url?: string;
    };
}
/**
 * 渲染响应结果接口
 */
interface RenderResponse {
    /** 是否成功 */
    success: boolean;
    /** HTML文件路径 */
    htmlPath?: string;
    /** 错误信息 */
    error?: string;
}
/**
 * 组件属性基础接口 - 泛型T为子组件的具体数据类型
 * @template T 子组件的数据类型
 */
interface BaseComponentProps<T = Record<string, any>> extends Pick<RenderRequest<T>, 'data' | 'version' | 'scale'> {
    /** 渲染数据 - 子组件的具体参数 */
    data: {
        /** 是否使用深色主题 */
        useDarkTheme?: boolean;
    } & T;
}

/**
 * SSR预渲染组件为HTML预渲染组件为HTML
 * @param request 渲染请求参数
 * @param outputDir 输出目录路径
 * @returns 渲染结果Promise
 */
declare const reactServerRender: <T>(request: RenderRequest<T>, outputDir: string) => Promise<RenderResponse>;

export { type BaseComponentProps, type RenderRequest, type RenderResponse, reactServerRender };
