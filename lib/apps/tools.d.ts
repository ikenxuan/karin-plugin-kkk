import * as node_karin0 from "node-karin";

//#region src/apps/tools.d.ts
declare const prefix: node_karin0.Command<keyof node_karin0.MessageEventMap>;
declare const douyinAPP: false | node_karin0.Command<keyof node_karin0.MessageEventMap>;
declare const bilibiliAPP: false | node_karin0.Command<keyof node_karin0.MessageEventMap>;
declare const kuaishouAPP: false | node_karin0.Command<keyof node_karin0.MessageEventMap>;
declare const xiaohongshuAPP: false | node_karin0.Command<keyof node_karin0.MessageEventMap>;
//#endregion
export { bilibiliAPP, douyinAPP, kuaishouAPP, prefix, xiaohongshuAPP };