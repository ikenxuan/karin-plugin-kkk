declare class version {
    /** 插件名字 */
    get pluginName(): string;
    /** 插件版本号 */
    get pluginVersion(): string | undefined;
    /** 插件路径 */
    get pluginPath(): string;
    /** Karin版本 */
    get karinVersion(): string;
    /** Karin程序/客户端路径 */
    get karinPath(): string;
}
export declare const Version: version;
export {};
