import { sequelize, DataTypes } from './base.js';
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
export class db {
    /**
     * 创建一个新的群组记录，具有默认值的新条目
     * @param ModelName 表单名称
     * @param group_id 群号
     * @param data 数据体
     * @returns
     */
    async CreateSheet(ModelName, group_id, data) {
        const Model = sequelize.models[ModelName];
        const resolve = (await Model.create({
            group_id: String(group_id),
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
     * @param ModelName 表单名称
     * @param Group_ID 群号
     * @returns
     */
    async FindGroup(ModelName, Group_ID) {
        // AllDataType<'douyin'> 表示 { douyin: { [group_id: string]: DouyinDBType } }，
        // AllDataType<'douyin'>['douyin'] 或 AllDataType<'douyin'>[T] 表示 { [group_id: string]: DouyinDBType }，也就是 'douyin' 模型下，按照 group_id 索引的 DouyinDBType 对象。
        const AllData = await this.FindAll(ModelName);
        const groupData = AllData[Group_ID]; // 获取对应群组数据
        // 返回获取的群组数据，类型推导将根据 ModelName 自动选择
        return groupData;
    }
    /**
     * 更新指定群组的数据
     * @param ModelName 表单名称
     * @param Group_ID 群号
     * @param NewData 新的数据对象
     * @returns
     */
    async UpdateGroupData(ModelName, Group_ID, NewData = {}) {
        const Model = sequelize.models[ModelName];
        const [affectedRowsData] = await Model.update({
            data: JSON.stringify(NewData)
        }, {
            where: {
                group_id: Group_ID
            },
            individualHooks: true
        });
        return affectedRowsData;
    }
}
export const DB = new db();
/** 每次调用都将强制同步已定义的模型 */
await sequelize.sync({ alter: true });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlL2RiL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFBO0FBeUQ3QyxTQUFTLENBQUMsTUFBTSxDQUNkLFFBQVEsRUFDUjtJQUNFLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsT0FBTztRQUN2QixVQUFVLEVBQUUsSUFBSTtRQUNoQixhQUFhLEVBQUUsSUFBSTtRQUNuQixPQUFPLEVBQUUsTUFBTTtLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixPQUFPLEVBQUUsT0FBTztLQUNqQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QyxZQUFZLEVBQUUsSUFBSTtRQUNsQixPQUFPLEVBQUUsTUFBTTtLQUNoQjtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtDQUNqQixDQUNGLENBQUE7QUFFRCxTQUFTLENBQUMsTUFBTSxDQUNkLFVBQVUsRUFDVjtJQUNFLEVBQUUsRUFBRTtRQUNGLElBQUksRUFBRSxTQUFTLENBQUMsT0FBTztRQUN2QixVQUFVLEVBQUUsSUFBSTtRQUNoQixhQUFhLEVBQUUsSUFBSTtRQUNuQixPQUFPLEVBQUUsTUFBTTtLQUNoQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTTtRQUN0QixPQUFPLEVBQUUsT0FBTztLQUNqQjtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxTQUFTLENBQUMsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QyxZQUFZLEVBQUUsSUFBSTtRQUNsQixPQUFPLEVBQUUsTUFBTTtLQUNoQjtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtDQUNq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