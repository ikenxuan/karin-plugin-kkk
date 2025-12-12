import fs from 'node:fs'
import { resolve } from 'node:path'

import type { Plugin } from 'vite'

/**
 * 获取 Git commit ID
 * @returns Git commit 信息对象
 */
const getGitCommitInfo = () => {
  try {
    const { execSync } = require('node:child_process')
    // 确保在 git 仓库根目录下执行
    const gitRoot = execSync('git rev-parse --show-toplevel').toString().trim()
    const commitHash = execSync('git rev-parse HEAD', { cwd: gitRoot }).toString().trim()
    const shortCommitHash = execSync('git rev-parse --short HEAD', { cwd: gitRoot }).toString().trim()
    return {
      commitHash,
      shortCommitHash
    }
  } catch (error) {
    console.warn('⚠️ 无法获取 Git commit 信息:', error)
    return {
      commitHash: 'unknown',
      shortCommitHash: 'unknown'
    }
  }
}

/**
 * 生成构建元数据的 Vite 插件
 * @description 在构建时生成包含版本、构建时间、commit ID 等信息的元数据文件
 * @param rootDir 项目根目录路径
 * @returns Vite 插件对象
 */
export const generateBuildMetadataPlugin = (rootDir: string): Plugin => {
  return {
    name: 'generate-build-metadata',
    writeBundle() {
      const pkgPath = resolve(rootDir, 'package.json')
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
      const gitInfo = getGitCommitInfo()

      const metadata = {
        version: pkg.version,
        buildTime: new Date().toISOString(),
        buildTimestamp: Date.now(),
        name: pkg.name,
        description: pkg.description,
        homepage: pkg.homepage,
        commitHash: gitInfo.commitHash,
        shortCommitHash: gitInfo.shortCommitHash
      }

      const metadataPath = resolve(rootDir, 'lib/build-metadata.json')
      fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8')
      console.log('✅ 构建元数据已生成:', metadataPath)
      console.log('📦 版本:', metadata.version)
      console.log('🕐 构建时间:', metadata.buildTime)
      console.log('🔖 Commit:', metadata.shortCommitHash)
    }
  }
}
