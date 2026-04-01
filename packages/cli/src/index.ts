#!/usr/bin/env node
import { spawn, execSync } from 'node:child_process'
import { statSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'
import pc from 'picocolors'

const TARGETS: Record<string, string[]> = {
  core: ['pnpm', '--filter', 'karin-plugin-kkk', 'run', 'build'],
  docs: ['pnpm', '--filter', 'docs', 'run', 'build'],
  template: ['pnpm', '--filter', 'template', 'run', 'build'],
  web: ['pnpm', '--filter', 'web', 'run', 'build']
}

function formatTime(ms: number): string {
  return (ms / 1000).toFixed(2) + 's'
}

async function buildTarget(name: string, command: string[]): Promise<{ success: boolean; duration: number }> {
  const startTime = Date.now()
  
  return new Promise((resolve) => {
    const [cmd, ...args] = command
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true
    })

    child.on('close', (code) => {
      const duration = Date.now() - startTime
      resolve({ success: code === 0, duration })
    })

    child.on('error', () => {
      const duration = Date.now() - startTime
      resolve({ success: false, duration })
    })
  })
}

async function main() {
  const args = process.argv.slice(2)
  
  if (args.length === 0 || args[0] !== 'build') {
    console.log(pc.bold(pc.red('\n ✖ 错误: 缺少构建命令\n')))
    console.log(pc.gray('  用法: kkk build <target1> [target2] ...'))
    console.log(pc.gray('  可用的构建目标:'))
    Object.keys(TARGETS).forEach(key => {
      console.log(pc.gray(`    • ${key}`))
    })
    console.log()
    process.exit(1)
  }

  const targets = args.slice(1)
  
  if (targets.length === 0) {
    console.log(pc.bold(pc.red('\n ✖ 错误: 必须指定至少一个构建目标\n')))
    process.exit(1)
  }

  // 验证目标
  const invalidTargets = targets.filter(t => !TARGETS[t])
  if (invalidTargets.length > 0) {
    console.log(pc.bold(pc.red(`\n ✖ 错误: 无效的构建目标: ${invalidTargets.join(', ')}\n`)))
    console.log(pc.gray('  可用的构建目标:'))
    Object.keys(TARGETS).forEach(key => {
      console.log(pc.gray(`    • ${key}`))
    })
    console.log()
    process.exit(1)
  }

  const totalStartTime = Date.now()
  const results: Array<{ name: string; success: boolean; duration: number }> = []

  console.log()
  console.log(pc.bold(pc.cyan('  ┌───────────────────────────────────────────┐')))
  console.log(pc.bold(pc.cyan('  │  🚀  构建开始                              │')))
  console.log(pc.bold(pc.cyan('  └───────────────────────────────────────────┘')))
  console.log(pc.gray(`  📦 目标: ${targets.join(pc.gray(' → '))}\n`))

  // 串行构建
  for (const target of targets) {
    console.log(pc.bold(pc.blue(`  ▶ ${target.padEnd(12)}`)) + pc.gray('构建中...'))
    const result = await buildTarget(target, TARGETS[target])
    results.push({ name: target, ...result })
    
    if (result.success) {
      console.log(pc.bold(pc.green(`  ✓ ${target.padEnd(12)}`)) + pc.green(`${formatTime(result.duration)}`))
    } else {
      console.log(pc.bold(pc.red(`  ✗ ${target.padEnd(12)}`)) + pc.red(`${formatTime(result.duration)}`))
      break // 失败则停止后续构建
    }
  }

  const totalDuration = Date.now() - totalStartTime
  const allSuccess = results.every(r => r.success)

  console.log()
  console.log(pc.bold(pc.cyan('  ┌───────────────────────────────────────────┐')))
  console.log(pc.bold(pc.cyan('  │  📊  构建统计                               │')))
  console.log(pc.bold(pc.cyan('  ├───────────────────────────────────────────┤')))
  
  results.forEach(r => {
    const status = r.success ? pc.green('✓') : pc.red('✗')
    const time = formatTime(r.duration)
    const name = r.name.padEnd(20)
    console.log(pc.bold(pc.cyan('  │ ')) + status + '  ' + pc.cyan(name) + pc.gray(time.padStart(8)) + pc.bold(pc.cyan('  │')))
  })
  
  console.log(pc.bold(pc.cyan('  ├───────────────────────────────────────────┤')))
  const totalTime = formatTime(totalDuration)
  console.log(pc.bold(pc.cyan('  │ ')) + '   ' + pc.gray('总耗时'.padEnd(20)) + pc.cyan(totalTime.padStart(8)) + pc.bold(pc.cyan('  │')))
  console.log(pc.bold(pc.cyan('  └───────────────────────────────────────────┘')))

  if (allSuccess) {
    // 如果构建了 core，统计 npm 包大小
    if (targets.includes('core')) {
      await printCorePackageSize()
    }
    console.log()
    console.log(pc.bold(pc.green('  ✓  所有包构建成功！')))
    console.log()
    process.exit(0)
  } else {
    console.log()
    console.log(pc.bold(pc.red('  ✗  构建失败！')))
    console.log()
    process.exit(1)
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

function getDirSize(dir: string): number {
  let size = 0
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        size += getDirSize(fullPath)
      } else if (entry.isFile()) {
        size += statSync(fullPath).size
      }
    }
  } catch {
    // 目录不存在或无法访问
  }
  return size
}

function getFileSize(filePath: string): number {
  try {
    return statSync(filePath).size
  } catch {
    return 0
  }
}

function getCompressedSize(dir: string): number {
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    let buffers: Buffer[] = []
    
    const walk = (dirPath: string) => {
      const items = readdirSync(dirPath, { withFileTypes: true })
      for (const item of items) {
        const fullPath = join(dirPath, item.name)
        if (item.isDirectory()) {
          walk(fullPath)
        } else if (item.isFile()) {
          buffers.push(readFileSync(fullPath))
        }
      }
    }
    
    walk(dir)
    return gzipSync(Buffer.concat(buffers)).length
  } catch {
    return 0
  }
}

async function printCorePackageSize() {
  const coreDir = 'packages/core'
  
  // 根据 package.json 的 files 字段统计
  const files = ['config/', 'lib/', 'resources/', 'LICENSE', 'package.json', 'README.md', 'CHANGELOG.md']
  
  let totalSize = 0
  const details: Array<{ name: string; size: number }> = []
  
  for (const file of files) {
    const fullPath = join(coreDir, file)
    let size = 0
    if (file.endsWith('/')) {
      size = getDirSize(fullPath)
    } else {
      size = getFileSize(fullPath)
    }
    if (size > 0) {
      details.push({ name: file, size })
      totalSize += size
    }
  }
  
  console.log()
  console.log(pc.bold(pc.cyan('  ┌───────────────────────────────────────────┐')))
  console.log(pc.bold(pc.cyan('  │  📦  Package 大小统计                      │')))
  console.log(pc.bold(pc.cyan('  ├───────────────────────────────────────────┤')))
  
  details.forEach(d => {
    const size = formatSize(d.size)
    const name = d.name.padEnd(25)
    console.log(pc.bold(pc.cyan('  │  ')) + name + pc.gray(size.padStart(10)) + pc.bold(pc.cyan('  │')))
  })
  
  console.log(pc.bold(pc.cyan('  ├───────────────────────────────────────────┤')))
  
  // 计算实际压缩后的大小
  let compressedSize = 0
  for (const file of files) {
    const fullPath = join(coreDir, file)
    if (file.endsWith('/')) {
      compressedSize += getCompressedSize(fullPath)
    } else {
      try {
        const content = readFileSync(fullPath)
        compressedSize += gzipSync(content).length
      } catch {
        // 文件不存在
      }
    }
  }
  
  const uncompressed = formatSize(totalSize)
  const compressed = formatSize(compressedSize)
  const ratio = ((1 - compressedSize / totalSize) * 100).toFixed(1)
  
  console.log(pc.bold(pc.cyan('  │  ')) + pc.gray('未压缩').padEnd(25) + uncompressed.padStart(10) + pc.bold(pc.cyan('  │')))
  console.log(pc.bold(pc.cyan('  │  ')) + pc.cyan('Gzip 压缩').padEnd(25) + pc.green(compressed.padStart(10)) + pc.bold(pc.cyan('  │')))
  console.log(pc.bold(pc.cyan('  │  ')) + pc.gray('压缩率').padEnd(25) + pc.gray((ratio + '%').padStart(10)) + pc.bold(pc.cyan('  │')))
  console.log(pc.bold(pc.cyan('  └───────────────────────────────────────────┘')))
}

main()
