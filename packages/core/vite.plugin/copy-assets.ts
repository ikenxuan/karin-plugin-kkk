import fs from 'node:fs'
import { resolve } from 'node:path'

import type { Plugin } from 'vite'

/**
 * 递归复制目录
 * @param sourceDir 源目录路径
 * @param targetDir 目标目录路径
 */
const copyDirectory = (sourceDir: string, targetDir: string) => {
  if (!fs.existsSync(sourceDir)) {
    console.warn('⚠️ 源目录不存在:', sourceDir)
    return
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  const files = fs.readdirSync(sourceDir)

  files.forEach(file => {
    const sourcePath = resolve(sourceDir, file)
    const targetPath = resolve(targetDir, file)

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

/**
 * 复制 template 静态资源和 native bindings 的 Vite 插件
 * @description 在构建时将 template 包的静态资源复制到 core 包的 resources 目录，同时把 watermark 的 bindings 复制到 lib/core_chunk
 * @param rootDir 项目根目录路径
 * @returns Vite 插件对象
 */
export const copyTemplateAssetsPlugin = (rootDir: string): Plugin => {
  return {
    name: 'copy-template-assets',
    writeBundle() {
      // 1. 复制 template 包的静态资源
      const SourceDir = resolve(rootDir, '../template/public')
      const TargetDir = resolve(rootDir, 'resources')

      console.log('🔍 开始复制 template 静态资源...')
      console.log('📁 源目录:', SourceDir)
      console.log('📁 目标目录:', TargetDir)

      copyDirectory(SourceDir, TargetDir)
      console.log('✅ template 静态资源已复制到:', TargetDir)

      // 2. 复制 watermark 编译产物 (*.node, index.js) 到 lib/core_chunk/watermark
      const watermarkSourceDir = resolve(rootDir, '../watermark')
      const watermarkTargetDir = resolve(rootDir, 'lib/core_chunk/watermark')

      if (fs.existsSync(watermarkSourceDir)) {
        if (!fs.existsSync(watermarkTargetDir)) {
          fs.mkdirSync(watermarkTargetDir, { recursive: true })
        }
        
        console.log('🔍 开始复制 watermark 原生模块...')
        const files = fs.readdirSync(watermarkSourceDir)
        let copied = 0
        files.forEach(file => {
          if (file.endsWith('.node') || file === 'index.js') {
            fs.copyFileSync(
              resolve(watermarkSourceDir, file),
              resolve(watermarkTargetDir, file)
            )
            copied++
          }
        })
        console.log(`✅ watermark 原生模块复制完成 (共 ${copied} 个文件) 到: ${watermarkTargetDir}`)
      }
    }
  }
}
