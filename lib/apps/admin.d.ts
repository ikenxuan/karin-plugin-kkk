import * as node_karin24 from "node-karin";

//#region src/apps/admin.d.ts
declare const task: false | node_karin24.Task;
declare const biLogin: node_karin24.Command<keyof node_karin24.MessageEventMap>;
declare const dylogin: node_karin24.Command<keyof node_karin24.MessageEventMap>;
declare const setdyck: node_karin24.Command<"message.friend">;
declare const setbilick: node_karin24.Command<"message.friend">;
//#endregion
export { biLogin, dylogin, setbilick, setdyck, task };