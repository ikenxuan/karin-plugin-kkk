import { Message } from 'node-karin';
import { AllDataType, Base, BilibiliDBType } from '../../module/index.js';
import { bilibiliPushItem } from '../../types/config/pushlist.js';
/** 已支持推送的动态类型 */
export declare enum DynamicType {
    AV = "DYNAMIC_TYPE_AV",
    DRAW = "DYNAMIC_TYPE_DRAW",
    WORD = "DYNAMIC_TYPE_WORD",
    LIVE_RCMD = "DYNAMIC_TYPE_LIVE_RCMD",
    FORWARD = "DYNAMIC_TYPE_FORWARD"
}
/** 每个推送项的类型定义 */
interface PushItem {
    /** 该UP主的昵称 */
    remark: string;
    /** UP主UID */
    host_mid: number;
    /** 动态发布时间 */
    create_time: number;
    /** 要推送到的群组 */
    group_id: string[];
    /** 动态详情信息 */
    Dynamic_Data: any;
    /** UP主头像url */
    avatar_img: string;
    /** 动态类型 */
    dynamic_type: DynamicType;
}
/** 推送列表的类型定义 */
type WillBePushList = Record<string, PushItem>;
export declare class Bilibilipush extends Base {
    private force;
    /**
     *
     * @param e 事件对象，提供给实例使用的事件相关信息，默认为空对象{}
     * @param force 强制执行标志，用于控制实例行为，默认false
     * @returns
     */
    constructor(e?: Message, force?: boolean);
    /**
     * 执行主要的操作流程，包括检查缓存并根据需要获取和更新用户数据。
     * @returns
     */
    action(): Promise<true | void>;
    /**
     * 异步获取数据并根据动态类型处理和发送动态信息。
     * @param data 包含动态相关信息的对象。
     */
    getdata(data: WillBePushList): Promise<void>;
    /**
     * 根据配置文件获取UP当天的动态列表。
     * @returns
     */
    getDynamicList(userList: bilibiliPushItem[]): Promise<{
        willbepushlist: WillBePushList;
        DBdata: Record<string, BilibiliDBType>;
    }>;
    /**
     * 排除已推送过的群组并返回更新后的推送列表
     * @param willBePushList 将要推送的列表
     * @param dbData 数据库缓存
     * @returns 更新后的推送列表
     */
    excludeAlreadyPushed(willBePushList: WillBePushList, dbData: AllDataType['bilibili']): WillBePushList;
    /**
     * 设置或更新特定 host_mid 的群组信息。
     * @param data 包含 card 对象。
     * @returns 操作成功或失败的消息字符串。
     */
    setting(data: any): Promise<void>;
    /**
     * 检查并更新配置文件中指定用户的备注信息。
     * 该函数会遍历配置文件中的用户列表，对于没有备注或备注为空的用户，会从外部数据源获取其备注信息，并更新到配置文件中。
     */
    checkremark(): Promise<true | undefined>;
    /**
     * 强制推送
     * @param data 处理完成的推送列表
     */
    forcepush(data: WillBePushList): Promise<void>;
    /**
     * 渲染推送列表图片
     * @param pushList B站配置文件的推送列表
     * @returns
     */
    renderPushList(pushList: bilibiliPushItem[]): Promise<void>;
    /** 由于上游类型定义错误，导致下游需要手动对已设置的内容进行类型转换。。。 */
    mergeBilibiliItems(config: bilibiliPushItem[]): bilibiliPushItem[];
}
export {};
