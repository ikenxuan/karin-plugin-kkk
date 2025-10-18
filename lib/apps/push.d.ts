import * as node_karin14 from "node-karin";

//#region src/apps/push.d.ts
declare const douyinPush: false | node_karin14.Task;
declare const bilibiliPush: false | node_karin14.Task;
declare const forcePush: node_karin14.Command<"message.group">;
declare const setdyPush: node_karin14.Command<"message.group">;
declare const setbiliPush: node_karin14.Command<"message.group">;
declare const bilibiliPushList: node_karin14.Command<"message.group">;
declare const douyinPushList: node_karin14.Command<"message.group">;
declare const changeBotID: node_karin14.Command<keyof node_karin14.MessageEventMap>;
declare const testDouyinPush: node_karin14.Command<"message.group">;
//#endregion
export { bilibiliPush, bilibiliPushList, changeBotID, douyinPush, douyinPushList, forcePush, setbiliPush, setdyPush, testDouyinPush };