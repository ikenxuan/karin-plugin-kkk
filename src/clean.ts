#!/usr/bin/env node

import fs from 'node:fs'

/**
 * @description 获取package.json路径
 */
const getPkgPath = () => process.cwd() + '/package.json'

/**
 * @description 读取package.json
 */
const readPkg = () => JSON.parse(fs.readFileSync(getPkgPath(), 'utf-8'))

/**
 * @description 写入package.json
 * @param pkg package.json
 */
const writePkg = (pkg: any) => fs.writeFileSync(getPkgPath(), JSON.stringify(pkg, null, 2))

/**
 * @description 删除devDependencies
 */
const clean = () => {
  const pkg = readPkg()
  delete pkg.devDependencies
  writePkg(pkg)
}

clean()
