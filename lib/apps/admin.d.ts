import { Message, Plugin } from 'node-karin';
export declare const task: false | import("node-karin").Task;
export declare const biLogin: import("node-karin").Command<keyof import("node-karin").MessageEventMap>;
export declare const dylogin: import("node-karin").Command<keyof import("node-karin").MessageEventMap>;
export declare const setdyck: import("node-karin").Command<"message.friend">;
export declare const setbilick: import("node-karin").Command<"message.friend">;
export declare class Admin extends Plugin {
    constructor();
    deleteCache(e: Message): Promise<boolean>;
    ConfigSwitch(e: any): Promise<boolean>;
    ConfigNumber(e: Message): Promise<boolean>;
    ConfigCustom(e: Message): Promise<boolean>;
    index_Settings(e: Message): Promise<boolean>;
    getPlatformFromMessage(msg: string): 'app' | 'douyin' | 'bilibili' | 'upload' | 'kuaishou';
    checkNumberValue(value: number, limit: string): number;
}
