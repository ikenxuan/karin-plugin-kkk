import * as node_karin24 from "node-karin";

//#region src/apps/tools.d.ts
declare const prefix: node_karin24.Command<keyof node_karin24.MessageEventMap>;
declare const douyinAPP: false | node_karin24.Command<keyof node_karin24.MessageEventMap>;
declare const bilibiliAPP: false | node_karin24.Command<keyof node_karin24.MessageEventMap>;
declare const kuaishouAPP: false | node_karin24.Command<keyof node_karin24.MessageEventMap>;
declare const xiaohongshuAPP: false | node_karin24.Command<keyof node_karin24.MessageEventMap>;
//#endregion
export { bilibiliAPP, douyinAPP, kuaishouAPP, prefix, xiaohongshuAPP };