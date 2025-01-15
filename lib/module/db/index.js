import { join } from 'node:path';
import { basePath } from 'node-karin';
import { DataTypes, Sequelize } from 'sequelize';
import { Version } from '../utils/index.js';
/** 创建 Sequelize 实例，需要传入配置对象。 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join(`${basePath}/${Version.pluginName}/data`, 'push.db'),
    logging: false
});
/** 测试数据库连接是否成功 */
await sequelize.authenticate();
sequelize.define('douyin', {
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
}, {
    timestamps: true
});
sequelize.define('bilibili', {
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
}, {
    timestamps: true
});
export class DBBase {
    /**
     * 创建一个新的群组记录，具有默认值的新条目
     * @param ModelName 表单名称
     * @param groupId 群号
     * @param data 数据体
     * @returns
     */
    async CreateSheet(ModelName, groupId, data) {
        const Model = sequelize.models[ModelName];
        const resolve = (await Model.create({
            group_id: String(groupId),
            data: JSON.stringify(data)
        }, {
            raw: true
        })).dataValues;
        return resolve;
    }
    /**
     * 获取对应表单的所有群组原始数据
     * @param ModelName 表单名称
     * @returns
     */
    async FindAll(ModelName) {
        const Model = sequelize.models[ModelName];
        const groups = await Model.findAll({
            raw: true
        });
        // 使用reduce方法将数组转换为对象
        const result = groups.reduce((accumulator, group) => {
            // 将group_id作为键名，data作为键值
            accumulator[group.group_id] = JSON.parse(group.data);
            return accumulator;
        }, {});
        return result;
    }
    /**
     * 获取指定群组的数据
     * @param modelName 表单名称
     * @param groupId 群号
     * @returns
     */
    async FindGroup(modelName, groupId) {
        // AllDataType<'douyin'> 表示 { douyin: { [group_id: string]: DouyinDBType } }，
        // AllDataType<'douyin'>['douyin'] 或 AllDataType<'douyin'>[T] 表示 { [group_id: string]: DouyinDBType }，也就是 'douyin' 模型下，按照 group_id 索引的 DouyinDBType 对象。
        const AllData = await this.FindAll(modelName);
        const groupData = AllData[groupId]; // 获取对应群组数据
        // 返回获取的群组数据，类型推导将根据 ModelName 自动选择
        return groupData;
    }
    /**
     * 更新指定群组的数据
     * @param ModelName 表单名称
     * @param groupId 群号
     * @param NewData 新的数据对象
     * @returns
     */
    async UpdateGroupData(ModelName, groupId, NewData = {}) {
        const Model = sequelize.models[ModelName];
        const [affectedRowsData] = await Model.update({
            data: JSON.stringify(NewData)
        }, {
            where: {
                group_id: groupId
            },
            individualHooks: true
        });
        return affectedRowsData;
    }
}
export const DB = new DBBase();
/** 每次调用都将强制同步已定义的模型 */
await sequelize.sync({ alter: true });
