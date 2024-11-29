import { common } from 'node-karin'
import { join } from 'path'
import { DataTypes, Sequelize } from 'sequelize'

import { Version } from '@/module'

common.mkdir(`${Version.karinPath}/data/${Version.pluginName}`)

const dataPath = join(Version.karinPath, 'data', Version.pluginName, 'push.db')

/** 创建 Sequelize 实例，需要传入配置对象。 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dataPath,
  logging: false
})

/** 测试数据库连接是否成功 */
await sequelize.authenticate()

export { DataTypes, sequelize }