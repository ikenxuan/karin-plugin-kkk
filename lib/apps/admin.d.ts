import * as node_karin2 from "node-karin";

//#region src/apps/admin.d.ts
declare const task: false | node_karin2.Task;
declare const biLogin: node_karin2.Command<keyof node_karin2.MessageEventMap>;
declare const dylogin: node_karin2.Command<keyof node_karin2.MessageEventMap>;
declare const setdyck: node_karin2.Command<"message.friend">;
declare const setbilick: node_karin2.Command<"message.friend">;
//#endregion
export { biLogin, dylogin, setbilick, setdyck, task };