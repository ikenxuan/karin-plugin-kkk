import { KarinMessage, Plugin } from 'node-karin'
export declare const task: false | import("node-karin").TaskInfo
export declare const biLogin: import("node-karin").CommandInfo
export declare const dylogin: import("node-karin").CommandInfo
export declare const setdyck: import("node-karin").CommandInfo
export declare const setbilick: import("node-karin").CommandInfo
export declare class Admin extends Plugin {
  constructor();
  deleteCache(e: KarinMessage): Promise<boolean>;
  ConfigSwitch(e: any): Promise<boolean>;
  ConfigNumber(e: KarinMessage): Promise<boolean>;
  ConfigCustom(e: KarinMessage): Promise<boolean>;
  index_Settings(e: KarinMessage): Promise<boolean>;
  getPlatformFromMessage(msg: string): 'app' | 'douyin' | 'bilibili' | 'upload' | 'kuaishou';
  checkNumberValue(value: number, limit: string): number;
}
