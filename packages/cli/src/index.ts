#!/usr/bin/env node
import { spawn } from 'node:child_process'
import pc from 'picocolors'

interface BuildTarget {
  name: string
  command: string[]
}

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
    console.log(pc.bold(pc.red('❌ 请使用: kkk build <target1> [target2] ...')))
    console.log('\n可用的构建目标:')
    Object.keys(TARGETS).forEach(key => {
      console.log(`  - ${key}`)
    })
    process.exit(1)
  }

  const targets = args.slice(1)
  
  if (targets.length === 0) {
    console.log(pc.bold(pc.red('❌ 请指定至少一个构建目标')))
    process.exit(1)
  }

  // 验证目标
  const invalidTargets = targets.filter(t => !TARGETS[t])
  if (invalidTargets.length > 0) {
    console.log(pc.bold(pc.red(`❌ 无效的构建目标: ${invalidTargets.join(', ')}`)))
    console.log('\n可用的构建目标:')
    Object.keys(TARGETS).forEach(key => {
      console.log(`  - ${key}`)
    })
    process.exit(1)
  }

  const totalStartTime = Date.now()
  const results: Array<{ name: string; success: boolean; duration: number }> = []

  console.log(pc.bold(pc.cyan(`🚀 开始构建 ${targets.length} 个包: ${targets.join(', ')}\n`)))

  // 串行构建
  for (const target of targets) {
    console.log(pc.bold(pc.blue(`\n📦 构建 ${target}...`)))
    const result = await buildTarget(target, TARGETS[target])
    results.push({ name: target, ...result })
    
    if (result.success) {
      console.log(pc.bold(pc.green(`✨ ${target} 构建成功！耗时: ${formatTime(result.duration)}`)))
    } else {
      console.log(pc.bold(pc.red(`❌ ${target} 构建失败！耗时: ${formatTime(result.duration)}`)))
      break // 失败则停止后续构建
    }
  }

  const totalDuration = Date.now() - totalStartTime
  const allSuccess = results.every(r => r.success)

  console.log('\n' + pc.bold('='.repeat(50)))
  console.log(pc.bold('📊 构建统计:'))
  results.forEach(r => {
    const status = r.success ? pc.green('✓') : pc.red('✗')
    console.log(`  ${status} ${r.name}: ${formatTime(r.duration)}`)
  })
  console.log(pc.bold(`\n⏱️  总耗时: ${formatTime(totalDuration)}`))
  console.log(pc.bold('='.repeat(50)))

  if (allSuccess) {
    console.log(pc.bold(pc.green('\n🎉 所有包构建成功！')))
    process.exit(0)
  } else {
    console.log(pc.bold(pc.red('\n💥 构建失败！')))
    process.exit(1)
  }
}

main()
