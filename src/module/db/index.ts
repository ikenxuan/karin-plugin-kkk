import { join } from 'node:path'

import { basePath } from 'node-karin'
import { DataTypes, Sequelize } from 'sequelize'

import { Version } from '../utils'

/** 创建 Sequelize 实例，需要传入配置对象。 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(`${basePath}/${Version.pluginName}/data`, 'push.db'),
  logging: false
})

/** 测试数据库连接是否成功 */
await sequelize.authenticate()

export type BilibiliDBType = Record<string, {
  /** 该UP主的昵称 */
  remark: string
  /** UP主UID */
  host_mid: number
  /** 动态发布时间，时间戳 */
  create_time: number
  /** 要推送到的群组 */
  group_id: string[]
  /** UP主头像url */
  avatar_img: string
  /** 动态类型 */
  dynamic_type: string
  /** 已缓存的动态ID列表 */
  dynamic_idlist: string[]
}>

export type DouyinDBType = Record<string, {
  /** 该博主的昵称 */
  remark: string
  /** 博主UID */
  sec_uid: string
  /** 作品发布时间，时间戳 */
  create_time: number
  /** 要推送到的群组 */
  group_id: string[]
  /** 已缓存的作品ID列表 */
  aweme_idlist: string[],
  /** 博主头像url */
  avatar_img: string
  /** 是否正在直播 */
  living: boolean
  /** 存储每个群的直播推送图相关 */
  message_id: Record<string, {
    /** 直播推送图的消息ID */
    message_id: string
  }>
  /** 直播开始时间，时间戳 */
  start_living_pn: number
}>

/** 单个群组数据 */
export type GroupDataType = DouyinDBType | BilibiliDBType

export type AllDataType = {
  douyin: Record<string, DouyinDBType>
  bilibili: Record<string, BilibiliDBType>
}

sequelize.define(
  'douyin',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID'
    },
    group_id: {
      type: DataTypes.STRING,
      comment: '群组标识符'
    },
    data: {
      type: DataTypes.STRING, // 存储为字符串，JSON 格式
      defaultValue: '{}',
      comment: '缓存数据'
    }
  },
  {
    timestamps: true
  }
)

sequelize.define(
  'bilibili',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键ID'
    },
    group_id: {
      type: DataTypes.STRING,
      comment: '群组标识符'
    },
    data: {
      type: DataTypes.STRING, // 存储为字符串，JSON 格式
      defaultValue: '{}',
      comment: '缓存数据'
    }
  },
  {
    timestamps: true
  }
)

export class DBBase {
  /**
   * 创建一个新的群组记录，具有默认值的新条目
   * @param ModelName 表单名称
   * @param groupId 群号
   * @param data 数据体
   * @returns
   */
  async CreateSheet<T extends keyof AllDataType> (ModelName: T, groupId: string, data: AllDataType[T][string]): Promise<any> {
    const Model = sequelize.models[ModelName]
    const resolve = (
      await Model.create(
        {
          group_id: String(groupId),
          data: JSON.stringify(data)
        },
        {
          raw: true
        }
      )
    ).dataValues

    return resolve
  }

  /**
   * 获取对应表单的所有群组原始数据
   * @param ModelName 表单名称
   * @returns
   */
  async FindAll<T extends keyof AllDataType> (ModelName: T): Promise<AllDataType[T]> {
    const Model = sequelize.models[ModelName]

    const groups = await Model.findAll({
      raw: true
    })
    // 使用reduce方法将数组转换为对象
    const result = groups.reduce((accumulator: any, group: any) => {
      // 将group_id作为键名，data作为键值
      accumulator[group.group_id] = JSON.parse(group.data)
      return accumulator
    }, {} as Record<string | number, any>)

    return result as AllDataType[T]
  }

  /**
   * 获取指定群组的数据
   * @param modelName 表单名称
   * @param groupId 群号
   * @returns
   */
  async FindGroup<T extends keyof AllDataType> (modelName: T, groupId: string): Promise<AllDataType[T][string]> {
    // AllDataType<'douyin'> 表示 { douyin: { [group_id: string]: DouyinDBType } }，
    // AllDataType<'douyin'>['douyin'] 或 AllDataType<'douyin'>[T] 表示 { [group_id: string]: DouyinDBType }，也就是 'douyin' 模型下，按照 group_id 索引的 DouyinDBType 对象。

    const AllData = await this.FindAll(modelName)
    const groupData = AllData[groupId]  // 获取对应群组数据

    // 返回获取的群组数据，类型推导将根据 ModelName 自动选择
    return groupData as AllDataType[T][string]
  }

  /**
   * 更新指定群组的数据
   * @param ModelName 表单名称
   * @param groupId 群号
   * @param NewData 新的数据对象
   * @returns
   */
  async UpdateGroupData (ModelName: keyof AllDataType, groupId: string, NewData: object = {}): Promise<number> {
    const Model = sequelize.models[ModelName]
    const [affectedRowsData] = await Model.update(
      {
        data: JSON.stringify(NewData)
      },
      {
        where: {
          group_id: groupId
        },
        individualHooks: true
      }
    )
    return affectedRowsData
  }
}

export const DB = new DBBase()

/** 每次调用都将强制同步已定义的模型 */
await sequelize.sync({ alter: true })
