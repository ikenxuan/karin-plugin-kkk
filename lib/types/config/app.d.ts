/** 定义视频解析工具的配置接口 */
export interface appConfig {
    /** 默认解析，即识别最高优先级，修改后重启生效 */
    defaulttool: boolean;
    /** 自定义优先级，「默认解析」关闭后才会生效。修改后重启生效 */
    priority: number;
    /** 缓存自动删除，非必要不修改！ */
    rmmp4: boolean;
    /** 渲染精度，可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度 */
    renderScale: number;
    /** 本地部署一个视频解析API服务，接口范围为本插件用到的所有，默认端口4567 */
    APIServer: boolean;
    /** API服务端口 */
    APIServerPort: number;
    /** 渲染图片的主题色，0为自动，1为浅色，2为深色 */
    Theme: number;
}
