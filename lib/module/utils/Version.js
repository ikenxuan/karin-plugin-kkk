import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import simpleGit from 'simple-git';
import { Cfg, common } from 'node-karin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pluginVersion = common.pkgJson('karin-plugin-kkk')?.version;
const pluginPath = join(__dirname, '..', '..', '..').replace(/\\/g, '/');
const pluginName = basename(pluginPath);
const karinVersion = Cfg.package.version;
const karinPath = (process.cwd()).replace(/\\/g, '/');
async function checkCommitIdAndUpdateStatus(pluginPath) {
    const git = simpleGit({ baseDir: pluginPath });
    const result = {
        currentCommitId: null,
        remoteCommitId: null,
        latest: false,
        error: null,
        commitLog: null
    };
    // Timeout Promise
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Operation timed out')), 5000));
    // Main logic wrapped in a promise
    const mainLogic = (async () => {
        try {
            // Attempt to get the current commit ID (short version)
            const stdout = execSync(`git -C "${pluginPath}" rev-parse --short=7 HEAD`).toString().trim();
            result.currentCommitId = stdout;
            // Perform git fetch
            await git.fetch();
            // Get the remote commit ID (short version)
            const remoteCommitId = (await git.revparse(['HEAD@{u}'])).substring(0, 7);
            result.remoteCommitId = remoteCommitId;
            // Compare local and remote commit IDs
            if (result.currentCommitId === result.remoteCommitId) {
                result.latest = true;
                const log = await git.log({ from: result.currentCommitId, to: result.currentCommitId });
                if (log && log.all && log.all.length > 0) {
                    result.commitLog = log.all[0].message;
                }
            }
        }
        catch (error) {
            console.error(`Failed to check update status: ${error.message}`);
            result.error = 'Failed to check update status';
        }
        return result;
    })();
    // Race the main logic against the timeout
    try {
        return await Promise.race([mainLogic, timeoutPromise]);
    }
    catch (error) {
        console.error(error.message);
        result.error = error.message;
        return result;
    }
}
export const Version = {
    /**
     * @type {string} 插件名称
     */
    pluginName,
    /**
     * @type {string} 插件版本号
     */
    pluginVersion,
    /**
     * @type {string} 插件路径
     */
    pluginPath,
    /**
     * @type {string} karin版本
     */
    karinVersion,
    /**
     * @type {string} 机器人程序/客户端路径
     */
    karinPath,
    /**
     * 检查更新状态
     */
    checkCommitIdAndUpdateStatus
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGUvdXRpbHMvVmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQTtBQUN4QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFDN0MsT0FBTyxTQUFtQyxNQUFNLFlBQVksQ0FBQTtBQUM1RCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUV4QyxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUVqRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUE7QUFFckMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU8sQ0FBQTtBQUdqRSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUV4RSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7QUFHdkMsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUE7QUFHeEMsTUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0FBVXJELEtBQUssVUFBVSw0QkFBNEIsQ0FBRSxVQUFrQjtJQUM3RCxNQUFNLEdBQUcsR0FBYyxTQUFTLENBQUMsRUFBRSxP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