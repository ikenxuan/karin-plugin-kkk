import fs from 'node:fs'
import path from 'node:path'

/**
 * 此脚本用于同步版本号 用于ci
 * @description 将packages目录下所有package.json的timestamp更新为当前时间
 */
const updateTimestamp = (): void => {
  const corePkgPath = path.join('packages', 'core', 'package.json')
  if (fs.existsSync(corePkgPath)) {
    const content = JSON.parse(fs.readFileSync(corePkgPath, 'utf-8'))
    content.timestamp = new Date().toISOString()
    fs.writeFileSync(corePkgPath, JSON.stringify(content, null, 2))
  }
}

updateTimestamp()
