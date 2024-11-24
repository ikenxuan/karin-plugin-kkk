interface Result {
    currentCommitId: string | null;
    remoteCommitId: string | null;
    latest: boolean;
    error: string | null;
    commitLog: string | null;
}
declare function checkCommitIdAndUpdateStatus(pluginPath: string): Promise<Result>;
export declare const Version: {
    /**
     * @type {string} 插件名称
     */
    pluginName: string;
    /**
     * @type {string} 插件版本号
     */
    pluginVersion: string | undefined;
    /**
     * @type {string} 插件路径
     */
    pluginPath: string;
    /**
     * @type {string} karin版本
     */
    karinVersion: string;
    /**
     * @type {string} 机器人程序/客户端路径
     */
    karinPath: string;
    /**
     * 检查更新状态
     */
    checkCommitIdAndUpdateStatus: typeof checkCommitIdAndUpdateStatus;
};
export {};
