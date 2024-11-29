import { join } from 'node:path';
import { DataTypes, Sequelize } from 'sequelize';
/** 创建 Sequelize 实例，需要传入配置对象。 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: join((process.cwd()).replace(/\\/g, '/'), 'data', 'karin-plugin-kkk', 'push.db'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlL2RiL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFFaEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFFaEQsZ0NBQWdDO0FBQ2hDLE1BQU0sU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDO0lBQzlCLE9BQU8sRUFBRSxRQUFRO0lBQ2pCLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxTQUFTLENBQUM7SUFDekYsT0FBTyxFQUFFLEtBQUs7Q0FDZixDQUFDLENBQUE7QUFFRixrQkFBa0I7QUFDbEIsTUFBTSxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUE7QUF1RDlCLFNBQVMsQ0FBQyxNQUFNLENBQ2QsUUFBUSxFQUNSO0lBQ0UsRUFBRSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxPQUFPO1FBQ3ZCLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLGFBQWEsRUFBRSxJQUFJO1FBQ25CLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLE9BQU8sRUFBRSxPQUFPO0tBQ2pCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsaUJBQWlCO1FBQ3pDLFlBQVksRUFBRSxJQUFJO1FBQ2xCLE9BQU8sRUFBRSxNQUFNO0tBQ2hCO0NBQ0YsRUFDRDtJQUNFLFVBQVUsRUFBRSxJQUFJO0NBQ2pCLENBQ0YsQ0FBQTtBQUVELFNBQVMsQ0FBQyxNQUFNLENBQ2QsVUFBVSxFQUNWO0lB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