import { Model } from 'sequelize';
import { douyinPushItem } from '../../types/config/pushlist.js';
type GroupUserSubscriptionAttributes = {
    id?: number;
    /** 群号 */
    groupId: string;
    /** 抖音用户sec_uid */
    sec_uid: string;
};
/** 数据库操作类 */
export declare class DouyinDBBase {
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
     * 获取或创建抖音用户记录
     * @param sec_uid 抖音用户sec_uid
     * @param short_id 抖音号
     * @param remark 用户昵称
     */
    getOrCreateDouyinUser(sec_uid: string, short_id?: string, remark?: string): Promise<Model<any, any>>;
    /**
     * 订阅抖音用户
     * @param groupId 群组ID
     * @param botId 机器人ID
     * @param sec_uid 抖音用户sec_uid
     * @param short_id 抖音号
     * @param remark 用户昵称
     */
    subscribeDouyinUser(groupId: string, botId: string, sec_uid: string, short_id?: string, remark?: string): Promise<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>>;
    /**
     * 取消订阅抖音用户
     * @param groupId 群组ID
     * @param sec_uid 抖音用户sec_uid
     */
    unsubscribeDouyinUser(groupId: string, sec_uid: string): Promise<boolean>;
    /**
     * 添加作品缓存
     * @param aweme_id 作品ID
     * @param sec_uid 抖音用户sec_uid
     * @param groupId 群组ID
     */
    addAwemeCache(aweme_id: string, sec_uid: string, groupId: string): Promise<Model<any, any>>;
    /**
     * 检查作品是否已推送
     * @param aweme_id 作品ID
     * @param sec_uid 抖音用户sec_uid
     * @param groupId 群组ID
     */
    isAwemePushed(aweme_id: string, sec_uid: string, groupId: string): Promise<boolean>;
    /**
     * 获取机器人管理的所有群组
     * @param botId 机器人ID
     */
    getBotGroups(botId: string): Promise<Model<any, any>[]>;
    /**
     * 获取群组订阅的所有抖音用户
     * @param groupId 群组ID
     */
    getGroupSubscriptions(groupId: string): Promise<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>[]>;
    /**
     * 获取抖音用户的所有订阅群组
     * @param sec_uid 抖音用户sec_uid
     */
    getUserSubscribedGroups(sec_uid: string): Promise<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>[]>;
    /**
     * 检查群组是否已订阅抖音用户
     * @param sec_uid 抖音用户sec_uid
     * @param groupId 群组ID
     */
    isSubscribed(sec_uid: string, groupId: string): Promise<boolean>;
    /**
     * 更新用户直播状态
     * @param sec_uid 抖音用户sec_uid
     * @param living 是否正在直播
     */
    updateLiveStatus(sec_uid: string, living: boolean): Promise<boolean>;
    /**
     * 获取用户直播状态
     * @param sec_uid 抖音用户sec_uid
     */
    getLiveStatus(sec_uid: string): Promise<{
        living: boolean;
    }>;
    /**
     * 批量同步配置文件中的订阅到数据库
     * @param configItems 配置文件中的订阅项
     */
    syncConfigSubscriptions(configItems: douyinPushItem[]): Promise<void>;
    /**
     * 通过ID获取群组信息
     * @param groupId 群组ID
     */
    getGroupById(groupId: string): Promise<Model<any, any> | null>;
}
export declare const douyinDB: DouyinDBBase;
/** 抖音数据库模型集合 */
export declare const douyinModels: {
    /** AwemeCache表 - 存储已推送的作品ID */
    AwemeCache: import("sequelize").ModelCtor<Model<any, any>>;
    /** Bots表 - 存储机器人信息 */
    Bot: import("sequelize").ModelCtor<Model<any, any>>;
    /** DouyinUsers表 - 存储抖音用户信息 */
    DouyinUser: import("sequelize").ModelCtor<Model<any, any>>;
    /** Groups表 - 存储群组信息 */
    Group: import("sequelize").ModelCtor<Model<any, any>>;
    /** GroupUserSubscriptions表 - 存储群组订阅的抖音用户关系 */
    GroupUserSubscription: import("sequelize").ModelCtor<Model<GroupUserSubscriptionAttributes, GroupUserSubscriptionAttributes>>;
};
export {};
