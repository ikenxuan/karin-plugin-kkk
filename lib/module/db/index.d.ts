export type BilibiliDBType = Record<string, {
    /** 该UP主的昵称 */
    remark: string;
    /** UP主UID */
    host_mid: number;
    /** 动态发布时间，时间戳 */
    create_time: number;
    /** 要推送到的群组 */
    group_id: string[];
    /** UP主头像url */
    avatar_img: string;
    /** 动态类型 */
    dynamic_type: string;
    /** 已缓存的动态ID列表 */
    dynamic_idlist: string[];
}>;
export type DouyinDBType = Record<string, {
    /** 该博主的昵称 */
    remark: string;
    /** 博主UID */
    sec_uid: string;
    /** 作品发布时间，时间戳 */
    create_time: number;
    /** 要推送到的群组 */
    group_id: string[];
    /** 已缓存的作品ID列表 */
    aweme_idlist: string[];
    /** 博主头像url */
    avatar_img: string;
    /** 是否正在直播 */
    living: boolean;
    /** 存储每个群的直播推送图相关 */
    message_id: Record<string, {
        /** 直播推送图的消息ID */
        message_id: string;
    }>;
    /** 直播开始时间，时间戳 */
    start_living_pn: number;
}>;
/** 单个群组数据 */
export type GroupDataType = DouyinDBType | BilibiliDBType;
export type AllDataType = {
    douyin: Record<string, DouyinDBType>;
    bilibili: Record<string, BilibiliDBType>;
};
export declare class DBBase {
    /**
     * 创建一个新的群组记录，具有默认值的新条目
     * @param ModelName 表单名称
     * @param groupId 群号
     * @param data 数据体
     * @returns
     */
    CreateSheet<T extends keyof AllDataType>(ModelName: T, groupId: string, data: AllDataType[T][string]): Promise<any>;
    /**
     * 获取对应表单的所有群组原始数据
     * @param ModelName 表单名称
     * @returns
     */
    FindAll<T extends keyof AllDataType>(ModelName: T): Promise<AllDataType[T]>;
    /**
     * 获取指定群组的数据
     * @param modelName 表单名称
     * @param groupId 群号
     * @returns
     */
    FindGroup<T extends keyof AllDataType>(modelName: T, groupId: string): Promise<AllDataType[T][string]>;
    /**
     * 更新指定群组的数据
     * @param ModelName 表单名称
     * @param groupId 群号
     * @param NewData 新的数据对象
     * @returns
     */
    UpdateGroupData(ModelName: keyof AllDataType, groupId: string, NewData?: object): Promise<number>;
}
export declare const DB: DBBase;
