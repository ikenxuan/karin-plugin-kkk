import * as node_karin9 from "node-karin";

//#region src/apps/help.d.ts
declare const help: node_karin9.Command<keyof node_karin9.MessageEventMap>;
declare const version: node_karin9.Command<keyof node_karin9.MessageEventMap>;
//#endregion
export { help, version };