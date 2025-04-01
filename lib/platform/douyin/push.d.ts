import { Message } from 'node-karin';
import { Base } from '../../module/index.js';
import type { douyinPushItem } from '../../types/config/pushlist.js';
/** 每个推送项的类型定义 */
interface PushItem {
    /** 博主的昵称 */
    remark: string;
    /** 博主UID */
    sec_uid: string;
    /** 作品发布时间 */
    create_time: number;
    /** 要推送到的群组和机器人ID */
    targets: Array<{
        groupId: string;
        botId: string;
    }>;
    /** 作品详情信息 */
    Detail_Data: {
        /** 博主主页信息 */
        user_info: any;
        liveStatus?: {
            liveStatus: 'open' | 'close';
            isChanged: boolean;
            isliving: boolean;
        };
        [key: string]: any;
    };
    /** 博主头像url */
    avatar_img: string;
    /** 是否正在直播 */
    living: boolean;
}
/** 推送列表的类型定义 */
type WillBePushList = Record<string, PushItem>;
export declare class DouYinpush extends Base {
    private force;
    /**
     *
     * @param e  事件Message
     * @param force 是否强制推送
     * @default false
     * @returns
     */
    constructor(e?: Message, force?: boolean);
    action(): Promise<boolean | void>;
    /**
     * 同步配置文件中的订阅信息到数据库
     */
    syncConfigToDatabase(): Promise<void>;
    getdata(data: WillBePushList): Promise<boolean>;
    /**
     * 根据配置文件获取用户当天的动态列表。
     * @returns 将要推送的列表
     */
    getDynamicList(userList: douyinPushItem[]): Promise<WillBePushList>;
    /**
   * 检查作品是否已经推送过
   * @param aweme_id 作品ID
   * @param sec_uid 用户sec_uid
   * @param groupIds 群组ID列表
   * @returns 是否已经推送过
   */
    checkIfAlreadyPushed(aweme_id: string, sec_uid: string, groupIds: string[]): Promise<boolean>;
    /**
     * 设置或更新特定 sec_uid 的群组信息。
     * @param data 抖音的搜索结果数据。需要接口返回的原始数据
     * @returns 操作成功或失败的消息字符串。
     */
    setting(data: any): Promise<void>;
    /** 渲染推送列表图片 */
    renderPushList(): Promise<void>;
    /**
   * 强制推送
   * @param data 处理完成的推送列表
   */
    forcepush(data: WillBePushList): Promise<void>;
    /**
   * 检查并更新备注信息
   */
    checkremark(): Promise<boolean>;
    /**
   * 处理动态描述
   */
    desc(Detail_Data: any, desc: string): string;
    /**
   * 格式化数字
   */
    count(num: number): string;
}
export {};
