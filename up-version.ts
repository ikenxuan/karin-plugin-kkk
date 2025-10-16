import fs from 'node:fs'
import path from 'node:path'

/**
 * 此脚本用于同步版本号 用于ci
 * @description 将packages目录下所有package.json的timestamp更新为当前时间
 */
const updateTimestamp = (): void => {
  const packagesDir = 'packages'
  const packageJsonFiles = fs.readdirSync(packagesDir)
  console.log(packageJsonFiles)

  packageJsonFiles.forEach(file => {
    const filePath = path.join(packagesDir, file, 'package.json')
    if (fs.existsSync(filePath)) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      content.timestamp = new Date().toISOString()
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2))
    }
  })
}

updateTimestamp()
