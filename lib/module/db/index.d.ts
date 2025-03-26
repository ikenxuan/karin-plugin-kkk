export * from './bilibili.js';
export * from './douyin.js';
/**
 * 清理旧的动态缓存记录
 * @param platform 指定数据库，'douyin' | 'bilibili'
 * @param days 保留最近几天的记录，默认为7天
 * @returns 删除的记录数量
 */
export declare const cleanOldDynamicCache: (platform: "douyin" | "bilibili", days?: number) => Promise<number>;
