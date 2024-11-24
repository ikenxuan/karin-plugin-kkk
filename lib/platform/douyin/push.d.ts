import { Base, DouyinDBType, AllDataType } from '../../module/index.js';
import { KarinMessage } from 'node-karin';
/** 每个推送项的类型定义 */
interface PushItem {
    /** 博主的昵称 */
    remark: string;
    /** 博主UID */
    sec_uid: string;
    /** 作品发布时间 */
    create_time: number;
    /** 要推送到的群组 */
    group_id: string[];
    /** 作品详情信息 */
    Detail_Data: {
        /** 博主主页信息 */
        user_info: any;
        [key: string]: any;
    };
    /** 博主头像url */
    avatar_img: string;
    /** 是否正在直播 */
    living: boolean;
}
/** 推送列表的类型定义 */
interface WillBePushList {
    [key: string]: PushItem;
}
export declare class DouYinpush extends Base {
    private force;
    /**
     *
     * @param e  事件KarinMessage
     * @param force 是否强制推送
     * @default false
     * @returns
     */
    constructor(e?: KarinMessage, force?: boolean);
    action(): Promise<true | void>;
    getdata(data: WillBePushList): Promise<true | undefined>;
    /**
     * 根据配置文件获取UP当天的动态列表。
     * @returns
     */
    getDynamicList(): Promise<{
        willbepushlist: WillBePushList;
        DBdata: {
            [group_id: string]: DouyinDBType;
        };
    }>;
    /**
     * 排除已推送过的群组并返回更新后的推送列表
     * @param willBePushList 将要推送的列表
     * @param dbData 数据库缓存
     * @returns 更新后的推送列表
     */
    excludeAlreadyPushed(willBePushList: WillBePushList, dbData: AllDataType<'douyin'>['douyin']): WillBePushList;
    checkremark(): Promise<true | undefined>;
    desc(video_obj: any, text: string): string;
    /**
     * 强制推送
     * @param data 处理完成的推送列表
     */
    forcepush(data: WillBePushList): Promise<void>;
    /**
     * 设置或更新特定 sec_uid 的群组信息。
     * @param data 抖音的搜索结果数据。需要接口返回的原始数据
     * @returns 操作成功或失败的消息字符串。
     */
    setting(data: any): Promise<string>;
}
export {};
