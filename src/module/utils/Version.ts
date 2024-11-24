import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import simpleGit, { SimpleGit, LogResult } from 'simple-git'
import { Cfg, common } from 'node-karin'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const pluginVersion = common.pkgJson('karin-plugin-kkk')?.version


const pluginPath = join(__dirname, '..', '..', '..').replace(/\\/g, '/')

const pluginName = basename(pluginPath)


const karinVersion = Cfg.package.version


const karinPath = (process.cwd()).replace(/\\/g, '/')

interface Result {
  currentCommitId: string | null
  remoteCommitId: string | null
  latest: boolean
  error: string | null
  commitLog: string | null
}

async function checkCommitIdAndUpdateStatus (pluginPath: string): Promise<Result> {
  const git: SimpleGit = simpleGit({ baseDir: pluginPath })
  const result: Result = {
    currentCommitId: null,
    remoteCommitId: null,
    latest: false,
    error: null,
    commitLog: null
  }

  // Timeout Promise
  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), 5000)
  )

  // Main logic wrapped in a promise
  const mainLogic = (async (): Promise<Result> => {
    try {
      // Attempt to get the current commit ID (short version)
      const stdout = execSync(`git -C "${pluginPath}" rev-parse --short=7 HEAD`).toString().trim()
      result.currentCommitId = stdout

      // Perform git fetch
      await git.fetch()

      // Get the remote commit ID (short version)
      const remoteCommitId = (await git.revparse([ 'HEAD@{u}' ])).substring(0, 7)
      result.remoteCommitId = remoteCommitId

      // Compare local and remote commit IDs
      if (result.currentCommitId === result.remoteCommitId) {
        result.latest = true
        const log: LogResult = await git.log({ from: result.currentCommitId, to: result.currentCommitId })
        if (log && log.all && log.all.length > 0) {
          result.commitLog = log.all[0].message
        }
      }
    } catch (error) {
      console.error(`Failed to check update status: ${(error as Error).message}`)
      result.error = 'Failed to check update status'
    }

    return result
  })()

  // Race the main logic against the timeout
  try {
    return await Promise.race([ mainLogic, timeoutPromise ])
  } catch (error) {
    console.error((error as Error).message)
    result.error = (error as Error).message
    return result
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
}
