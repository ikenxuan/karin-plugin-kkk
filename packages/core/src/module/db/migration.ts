import { logger } from 'node-karin'
import { sqlite3 as sqlite3Types } from 'node-karin/sqlite3'

/**
 * 迁移记录接口
 */
interface MigrationRecord {
  id: number
  version: number
  name: string
  executedAt: string
}

/**
 * 迁移定义接口
 */
export interface Migration {
  /** 迁移版本号 */
  version: number
  /** 迁移名称 */
  name: string
  /** 升级 SQL 语句 */
  up: string[]
  /** 降级 SQL 语句（可选） */
  down?: string[]
}

/**
 * 数据库迁移管理器
 */
export class MigrationManager {
  private dbPath: string

  constructor(dbPath: string) {
    this.dbPath = dbPath
  }

  /**
   * 执行 SQL 查询
   */
  private runQuery(db: sqlite3Types['Database'], sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve({ lastID: this.lastID, changes: this.changes })
        }
      })
    })
  }

  /**
   * 执行 SQL 查询并获取单个结果
   */
  private getQuery<T>(db: sqlite3Types['Database'], sql: string, params: any[] = []): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row as T)
        }
      })
    })
  }

  /**
   * 执行 SQL 查询并获取所有结果
   */
  private allQuery<T>(db: sqlite3Types['Database'], sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows as T[])
        }
      })
    })
  }

  /**
   * 初始化迁移表
   */
  private async initMigrationTable(db: sqlite3Types['Database']): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS _migrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        version INTEGER NOT NULL UNIQUE,
        name TEXT NOT NULL,
        executedAt TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `
    await this.runQuery(db, sql)
  }

  /**
   * 获取已执行的迁移版本
   */
  private async getExecutedMigrations(db: sqlite3Types['Database']): Promise<MigrationRecord[]> {
    try {
      return await this.allQuery<MigrationRecord>(db, 'SELECT * FROM _migrations ORDER BY version')
    } catch {
      return []
    }
  }

  /**
   * 记录迁移执行
   */
  private async recordMigration(db: sqlite3Types['Database'], migration: Migration): Promise<void> {
    await this.runQuery(
      db,
      'INSERT INTO _migrations (version, name, executedAt) VALUES (?, ?, ?)',
      [migration.version, migration.name, new Date().toISOString()]
    )
  }

  /**
   * 执行单个迁移
   */
  private async executeMigration(db: sqlite3Types['Database'], migration: Migration): Promise<void> {
    logger.info(`[Migration] 执行迁移 v${migration.version}: ${migration.name}`)

    try {
      // 开始事务
      await this.runQuery(db, 'BEGIN TRANSACTION')

      // 执行所有 SQL 语句
      for (const sql of migration.up) {
        await this.runQuery(db, sql)
      }

      // 记录迁移
      await this.recordMigration(db, migration)

      // 提交事务
      await this.runQuery(db, 'COMMIT')

      logger.info(`[Migration] ✓ 迁移 v${migration.version} 执行成功`)
    } catch (error) {
      // 回滚事务
      await this.runQuery(db, 'ROLLBACK')
      logger.error(`[Migration] ✗ 迁移 v${migration.version} 执行失败:`, error)
      throw error
    }
  }

  /**
   * 运行所有待执行的迁移
   */
  async runMigrations(db: sqlite3Types['Database'], migrations: Migration[]): Promise<void> {
    // 初始化迁移表
    await this.initMigrationTable(db)

    // 获取已执行的迁移
    const executedMigrations = await this.getExecutedMigrations(db)
    const executedVersions = new Set(executedMigrations.map(m => m.version))

    // 验证迁移版本号是否连续且唯一
    const versions = migrations.map(m => m.version)
    const uniqueVersions = new Set(versions)
    if (versions.length !== uniqueVersions.size) {
      throw new Error('[Migration] 迁移版本号必须唯一')
    }

    // 按版本号排序
    const sortedMigrations = [...migrations].sort((a, b) => a.version - b.version)

    // 执行未执行的迁移
    const pendingMigrations = sortedMigrations.filter(m => !executedVersions.has(m.version))

    if (pendingMigrations.length === 0) {
      logger.debug('[Migration] 数据库已是最新版本，无需迁移')
      return
    }

    logger.info(`[Migration] 发现 ${pendingMigrations.length} 个待执行的迁移`)

    for (const migration of pendingMigrations) {
      await this.executeMigration(db, migration)
    }

    logger.info('[Migration] 所有迁移执行完成')
  }

  /**
   * 获取当前数据库版本
   */
  async getCurrentVersion(db: sqlite3Types['Database']): Promise<number> {
    try {
      await this.initMigrationTable(db)
      const result = await this.getQuery<{ version: number }>(
        db,
        'SELECT MAX(version) as version FROM _migrations'
      )
      return result?.version || 0
    } catch {
      return 0
    }
  }

  /**
   * 回滚到指定版本
   */
  async rollbackTo(db: sqlite3Types['Database'], targetVersion: number, migrations: Migration[]): Promise<void> {
    const currentVersion = await this.getCurrentVersion(db)

    if (targetVersion >= currentVersion) {
      logger.warn('[Migration] 目标版本不低于当前版本，无需回滚')
      return
    }

    // 获取需要回滚的迁移（降序）
    const migrationsToRollback = migrations
      .filter(m => m.version > targetVersion && m.version <= currentVersion)
      .sort((a, b) => b.version - a.version)

    logger.info(`[Migration] 开始回滚到版本 ${targetVersion}`)

    for (const migration of migrationsToRollback) {
      if (!migration.down || migration.down.length === 0) {
        throw new Error(`[Migration] 迁移 v${migration.version} 没有提供回滚脚本`)
      }

      logger.info(`[Migration] 回滚迁移 v${migration.version}: ${migration.name}`)

      try {
        await this.runQuery(db, 'BEGIN TRANSACTION')

        // 执行回滚 SQL
        for (const sql of migration.down) {
          await this.runQuery(db, sql)
        }

        // 删除迁移记录
        await this.runQuery(db, 'DELETE FROM _migrations WHERE version = ?', [migration.version])

        await this.runQuery(db, 'COMMIT')

        logger.info(`[Migration] ✓ 迁移 v${migration.version} 回滚成功`)
      } catch (error) {
        await this.runQuery(db, 'ROLLBACK')
        logger.error(`[Migration] ✗ 迁移 v${migration.version} 回滚失败:`, error)
        throw error
      }
    }

    logger.info('[Migration] 回滚完成')
  }
}
