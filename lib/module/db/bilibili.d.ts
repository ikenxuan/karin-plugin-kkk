import { Model } from 'sequelize';
import { bilibiliPushItem } from '../../types/config/pushlist.js';
type GroupUserSubscriptionAttributes = {
    id?: number;
    /** 群号 */
    groupId: string;
    /** UP主UID */
    host_mid: number;
};
/** Bots表 - 存储机器人信息 */
declare const Bot: import("sequelize").ModelCtor<Model<any, any>>;
/** Groups表 - 存储群组信息 */
declare const Group: import("sequelize").ModelCtor<Model<any, any>>;
/** BilibiliUsers表 - 存储B站用户信息 */
declare const BilibiliUser: import("sequelize").ModelCtor<Model<any, any>>;
/** GroupUserSubscriptions表 - 存储群组订阅的B站用户关系 */
declare const GroupUserSubscription: import("sequelize").ModelCtor<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>>;
/** DynamicCache表 - 存储已推送的动态ID */
declare const DynamicCache: import("sequelize").ModelCtor<Model<any, any>>;
/** 数据库操作类 */
export declare class BilibiliDBBase {
    /**
     * 获取或创建机器人记录
     * @param botId 机器人ID
     */
    getOrCreateBot(botId: string): Promise<Model<any, any>>;
    /**
     * 获取或创建群组记录
     * @param groupId 群组ID
     * @param botId 机器人ID
     */
    getOrCreateGroup(groupId: string, botId: string): Promise<Model<any, any>>;
    /**
     * 获取或创建B站用户记录
     * @param host_mid B站用户UID
     * @param remark UP主昵称
     * @param avatar_img 头像URL
     */
    getOrCreateBilibiliUser(host_mid: number, remark?: string): Promise<Model<any, any>>;
    /**
     * 订阅B站用户
     * @param groupId 群组ID
     * @param botId 机器人ID
     * @param host_mid B站用户UID
     * @param remark UP主昵称
     */
    subscribeBilibiliUser(groupId: string, botId: string, host_mid: number, remark?: string): Promise<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>>;
    /**
     * 取消订阅B站用户
     * @param groupId 群组ID
     * @param host_mid B站用户UID
     */
    unsubscribeBilibiliUser(groupId: string, host_mid: number): Promise<boolean>;
    /**
     * 添加动态缓存
     * @param dynamic_id 动态ID
     * @param host_mid B站用户UID
     * @param groupId 群组ID
     * @param dynamic_type 动态类型
     */
    addDynamicCache(dynamic_id: string, host_mid: number, groupId: string, dynamic_type: string): Promise<Model<any, any>>;
    /**
     * 检查动态是否已推送
     * @param dynamic_id 动态ID
     * @param host_mid B站用户UID
     * @param groupId 群组ID
     */
    isDynamicPushed(dynamic_id: string, host_mid: number, groupId: string): Promise<boolean>;
    /**
     * 获取机器人管理的所有群组
     * @param botId 机器人ID
     */
    getBotGroups(botId: string): Promise<Model<any, any>[]>;
    /**
     * 获取群组订阅的所有B站用户
     * @param groupId 群组ID
     */
    getGroupSubscriptions(groupId: string): Promise<Model<GroupUserSubscriptionAttributes>[]>;
    /**
     * 获取B站用户的所有订阅群组
     * @param host_mid B站用户UID
     */
    getUserSubscribedGroups(host_mid: number): Promise<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>[]>;
    /**
     * 获取群组的动态缓存
     * @param groupId 群组ID
     * @param host_mid 可选的B站用户UID过滤
     */
    getGroupDynamicCache(groupId: string, host_mid?: number): Promise<Model<any, any>[]>;
    /**
   * 检查群组是否已订阅B站用户
   * @param host_mid B站用户UID
   * @param groupId 群组ID
   */
    isSubscribed(host_mid: number, groupId: string): Promise<boolean>;
    /**
     * 批量同步配置文件中的订阅到数据库
     * @param configItems 配置文件中的订阅项
     */
    syncConfigSubscriptions(configItems: bilibiliPushItem[]): Promise<void>;
}
export declare const bilibiliDB: BilibiliDBBase;
export { BilibiliUser, Bot, DynamicCache, Group, GroupUserSubscription };
/** B站数据库模型集合 */
export declare const bilibiliModels: {
    /** BilibiliUsers表 - 存储B站用户信息 */
    BilibiliUser: import("sequelize").ModelCtor<Model<any, any>>;
    /** Bots表 - 存储机器人信息 */
    Bot: import("sequelize").ModelCtor<Model<any, any>>;
    /** DynamicCache表 - 存储已推送的动态ID */
    DynamicCache: import("sequelize").ModelCtor<Model<any, any>>;
    /** Groups表 - 存储群组信息 */
    Group: import("sequelize").ModelCtor<Model<any, any>>;
    /** GroupUserSubscriptions表 - 存储群组订阅的B站用户关系 */
    GroupUserSubscription: import("sequelize").ModelCtor<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>>;
};
