import { createRequire } from 'module';
import '../chunk-FJODYXO3.js';
import { bilibiliLogin, douyinLogin } from '../chunk-4KHPIB27.js';
import { Config, Common, Render } from '../chunk-R3POE3NG.js';
import { init_esm_shims } from '../chunk-2FTP7FNI.js';
import fs from 'node:fs';
import karin, { logger, Plugin } from 'node-karin';
import path from 'path';

createRequire(import.meta.url);

// src/apps/admin.ts
init_esm_shims();
var task = Config.app.rmmp4 && karin.task("[kkk-\u89C6\u9891\u7F13\u5B58\u81EA\u52A8\u5220\u9664]", "0 0 4 * * *", async () => {
  try {
    await removeAllFiles(Common.tempDri.video);
    logger.mark(Common.tempDri.video + "\u76EE\u5F55\u4E0B\u6240\u6709\u6587\u4EF6\u5DF2\u5220\u9664");
  } catch (err) {
    console.error("\u5220\u9664\u6587\u4EF6\u65F6\u51FA\u9519:", err);
  }
});
var biLogin = karin.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, async (e) => {
  await bilibiliLogin(e);
  return true;
}, { perm: "group.admin", name: "kkk-ck\u7BA1\u7406" });
var dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
  await douyinLogin(e);
  return true;
}, { perm: "group.admin", name: "kkk-ck\u7BA1\u7406" });
var setdyck = karin.command(/^#?(kkk)?s*设置抖音ck$/i, async (e) => {
  const msg = await e.reply("\u8BF7\u53D1\u5728120\u79D2\u5185\u9001\u6296\u97F3ck\n\u6559\u7A0B\uFF1Ahttps://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
  const context = await karin.ctx(e);
  Config.Modify("cookies", "douyin", context.msg);
  await e.bot.recallMsg(e.contact, msg.messageId);
  await e.reply("\u8BBE\u7F6E\u6210\u529F\uFF01", { at: true });
  return true;
}, { perm: "master", name: "kkk-ck\u7BA1\u7406", event: "message.friend" });
var setbilick = karin.command(/^#?(kkk)?s*设置s*(B站)ck$/i, async (e) => {
  const msg = await e.reply("\u8BF7\u53D1\u5728120\u79D2\u5185\u9001B\u7AD9ck\n\u6559\u7A0B\uFF1Ahttps://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
  const context = await karin.ctx(e);
  Config.Modify("cookies", "bilibili", context.msg);
  await e.bot.recallMsg(e.contact, msg.messageId);
  await e.reply("\u8BBE\u7F6E\u6210\u529F\uFF01", { at: true });
  return true;
}, { perm: "master", name: "kkk-ck\u7BA1\u7406", event: "message.friend" });
var Admin = class extends Plugin {
  constructor() {
    super({
      name: "kkk-\u7BA1\u7406",
      rule: [
        { reg: createSwitchRegExp("app"), fnc: "ConfigSwitch", permission: "master" },
        { reg: createNumberRegExp("app"), fnc: "ConfigNumber", permission: "master" },
        { reg: createCustomRegExp("app"), fnc: "ConfigCustom", permission: "master" },
        { reg: createSwitchRegExp("douyin"), fnc: "ConfigSwitch", permission: "master" },
        { reg: createNumberRegExp("douyin"), fnc: "ConfigNumber", permission: "master" },
        { reg: createNumberRegExp("douyin"), fnc: "ConfigCustom", permission: "master" },
        { reg: createSwitchRegExp("bilibili"), fnc: "ConfigSwitch", permission: "master" },
        { reg: createNumberRegExp("bilibili"), fnc: "ConfigNumber", permission: "master" },
        { reg: createNumberRegExp("bilibili"), fnc: "ConfigCustom", permission: "master" },
        { reg: createSwitchRegExp("upload"), fnc: "ConfigSwitch", permission: "master" },
        { reg: createNumberRegExp("upload"), fnc: "ConfigNumber", permission: "master" },
        { reg: createNumberRegExp("upload"), fnc: "ConfigCustom", permission: "master" },
        { reg: createSwitchRegExp("kuaishou"), fnc: "ConfigSwitch", permission: "master" },
        { reg: createNumberRegExp("kuaishou"), fnc: "ConfigNumber", permission: "master" },
        { reg: createNumberRegExp("kuaishou"), fnc: "ConfigCustom", permission: "master" },
        { reg: /^#kkk设置$/, fnc: "index_Settings", permission: "master" },
        { reg: /^#?kkk删除缓存$/, fnc: "deleteCache", permission: "master" }
      ]
    });
  }
  async deleteCache(e) {
    await removeAllFiles(Common.tempDri.video);
    await e.reply(Common.tempDri.video + "\u76EE\u5F55\u4E0B\u6240\u6709\u6587\u4EF6\u5DF2\u5220\u9664");
    return true;
  }
  // 配置开关
  async ConfigSwitch(e) {
    logger.debug("\u5F00\u5173\u914D\u7F6E", e.msg);
    const platform = this.getPlatformFromMessage(e.msg);
    const regRet = createSwitchRegExp(platform).exec(e.msg);
    if (regRet) {
      const key = regRet[1];
      const isOn = regRet[2] === "\u5F00\u542F";
      Config.Modify(platform, PlatformTypeConfig[platform].types[key], isOn);
      await this.index_Settings(e);
    }
    return false;
  }
  // 修改数值配置
  async ConfigNumber(e) {
    logger.debug("\u6570\u503C\u914D\u7F6E", e.msg);
    const platform = this.getPlatformFromMessage(e.msg);
    const regRet = createNumberRegExp(platform).exec(e.msg);
    if (regRet) {
      const configType = PlatformTypeConfig[platform].numberConfig[regRet[1]];
      const number = this.checkNumberValue(Number(regRet[2]), configType.limit);
      Config.Modify(platform, configType.key, number);
      await this.index_Settings(e);
    }
    return false;
  }
  // 处理自定义内容
  async ConfigCustom(e) {
    logger.debug("\u81EA\u5B9A\u4E49\u5185\u5BB9", e.msg);
    const platform = this.getPlatformFromMessage(e.msg);
    const regRet = createCustomRegExp(platform).exec(e.msg);
    if (regRet) {
      const key = regRet[1];
      const customValue = regRet[2].trim();
      const customConfig = PlatformTypeConfig[platform]?.customConfig;
      if (!customConfig || !customConfig[key]) {
        logger.debug(logger.warn(`\u65E0\u6548\u7684\u8BBE\u7F6E\u9879\uFF1A${key}`));
        return false;
      }
      const configKey = customConfig[key].key;
      Config.Modify(platform, configKey, customValue);
      await this.index_Settings(e);
    }
    return false;
  }
  // 渲染设置图片
  async index_Settings(e) {
    const _cfg = Config.All();
    const statusData = getStatus(_cfg);
    const img = await Render("admin/index", { data: statusData });
    await e.reply(img);
    return true;
  }
  // 根据消息判断平台
  getPlatformFromMessage(msg) {
    if (msg.includes("\u6296\u97F3")) return "douyin";
    if (msg.includes("B\u7AD9")) return "bilibili";
    if (msg.includes("\u4E0A\u4F20")) return "upload";
    if (msg.includes("\u5FEB\u624B")) return "kuaishou";
    return "app";
  }
  // 检查数值范围
  checkNumberValue(value, limit) {
    const [min, max] = limit.split("-").map(Number);
    return Math.min(Math.max(value, min), max);
  }
};
async function removeAllFiles(dir) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await removeAllFiles(filePath);
      await fs.promises.rmdir(filePath);
    } else {
      await fs.promises.unlink(filePath);
    }
  }
}
function getStatus(data) {
  const result = {};
  const processValue = (value) => {
    if (typeof value === "boolean") {
      return `<div class="cfg-status ${value ? "" : "status-off"}">${value ? "\u5DF2\u5F00\u542F" : "\u5DF2\u5173\u95ED"}</div>`;
    } else if (typeof value === "number") {
      return `<div class="cfg-status ${value === null ? "status-off" : ""}">${value ?? "\u672A\u914D\u7F6E"}</div>`;
    } else if (typeof value === "string") {
      return `<div class="cfg-status">${value.length > 12 ? `${value.slice(0, 12)}...` : value}</div>`;
    } else if (Array.isArray(value)) {
      return value.length === 0 ? '<div class="cfg-status status-off">\u672A\u914D\u7F6E</div>' : `<div class="cfg-status">\u5DF2\u914D\u7F6E ${value.length} \u9879</div>`;
    } else if (value === null) {
      return '<div class="cfg-status status-off">\u672A\u914D\u7F6E</div>';
    }
    return '<div class="cfg-status status-off">\u672A\u77E5\u7C7B\u578B</div>';
  };
  const processObject = (obj) => {
    const res = {};
    for (const key in obj) {
      const value = obj[key];
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        res[key] = processObject(value);
      } else {
        res[key] = processValue(value);
      }
    }
    return res;
  };
  for (const key in data) {
    result[key] = processObject(data[key]);
  }
  return result;
}
var PlatformTypeConfig = {
  upload: {
    name: "\u4E0A\u4F20",
    types: {
      \u4E0A\u4F20\u62E6\u622A: "usefilelimit",
      \u4E0A\u4F20base64: "sendbase64",
      \u4E0A\u4F20\u538B\u7F29: "compress",
      \u4E0A\u4F20\u7FA4\u6587\u4EF6: "usegroupfile"
    },
    numberConfig: {
      \u4E0A\u4F20\u62E6\u622A\u9608\u503C: { key: "filelimit", limit: "0-1000000" },
      \u4E0A\u4F20\u538B\u7F29\u89E6\u53D1\u503C: { key: "compresstrigger", limit: "0-1000000" },
      \u4E0A\u4F20\u538B\u7F29\u540E\u7684\u503C: { key: "compressvalue", limit: "0-1000000" },
      \u4E0A\u4F20\u7FA4\u6587\u4EF6\u9608\u503C: { key: "groupfilevalue", limit: "0-1000000" }
    }
  },
  app: {
    name: "APP",
    types: {
      \u7F13\u5B58\u5220\u9664: "rmmp4",
      \u89C6\u9891\u89E3\u6790: "videotool",
      \u9ED8\u8BA4\u89E3\u6790: "defaulttool",
      \u4E0A\u4F20\u9650\u5236: "usefilelimit",
      API\u670D\u52A1: "APIServer",
      base64: "sendbase64"
    },
    numberConfig: {
      \u6E32\u67D3\u7CBE\u5EA6: { key: "renderScale", limit: "50-200" },
      \u4F18\u5148\u7EA7: { key: "priority", limit: "0-114514" },
      \u9650\u5236: { key: "filelimit", limit: "5-114514" },
      \u4E3B\u9898: { key: "Theme", limit: "0-2" }
    }
  },
  douyin: {
    name: "\u6296\u97F3",
    types: {
      \u6296\u97F3\u89E3\u6790: "switch",
      \u6296\u97F3\u8BC4\u8BBA: "comment",
      \u6296\u97F3\u63A8\u9001: "push.switch",
      \u6296\u97F3\u63A8\u9001\u65E5\u5FD7: "push.log",
      \u6296\u97F3\u89E3\u6790\u63D0\u793A: "tip",
      \u6296\u97F3\u9AD8\u6E05\u8BED\u97F3: "sendHDrecord",
      \u6296\u97F3\u52A8\u6001\u89E3\u6790: "push.parsedynamic",
      \u6296\u97F3\u81EA\u52A8\u6E05\u6670\u5EA6: "autoResolution"
    },
    numberConfig: {
      \u6296\u97F3\u8BC4\u8BBA\u6570\u91CF: { key: "numcomment", limit: "0-999999" }
    },
    customConfig: {
      \u6296\u97F3\u63A8\u9001\u8868\u8FBE\u5F0F: { key: "push.cron", type: "string" },
      \u6296\u97F3\u63A8\u9001\u8BBE\u7F6E\u6743\u9650: { key: "push.permission", type: "string" }
    }
  },
  bilibili: {
    name: "B\u7AD9",
    types: {
      B\u7AD9\u89E3\u6790: "switch",
      B\u7AD9\u8BC4\u8BBA: "comment",
      B\u7AD9\u63A8\u9001: "push.switch",
      B\u7AD9\u63A8\u9001\u65E5\u5FD7: "push.log",
      B\u7AD9\u89E3\u6790\u63D0\u793A: "tip",
      B\u7AD9\u52A8\u6001\u89E3\u6790: "push.parsedynamic",
      B\u7AD9\u5185\u5BB9\u4F18\u5148: "videopriority",
      B\u7AD9\u81EA\u52A8\u6E05\u6670\u5EA6: "autoResolution"
    },
    numberConfig: {
      B\u7AD9\u8BC4\u8BBA\u6570\u91CF: { key: "numcomment", limit: "0-999999" }
    },
    customConfig: {
      B\u7AD9\u63A8\u9001\u8868\u8FBE\u5F0F: { key: "push.cron", type: "string" },
      B\u7AD9\u63A8\u9001\u8BBE\u7F6E\u6743\u9650: { key: "push.permission", type: "string" }
    }
  },
  kuaishou: {
    name: "\u5FEB\u624B",
    types: {
      \u5FEB\u624B\u89E3\u6790: "switch",
      \u5FEB\u624B\u89E3\u6790\u63D0\u793A: "tip"
    },
    numberConfig: {
      \u5FEB\u624B\u8BC4\u8BBA\u6570\u91CF: { key: "numcomment", limit: "0-30" }
    }
  }
};
var createSwitchRegExp = (platform) => {
  const switchKeys = Object.keys(PlatformTypeConfig[platform].types);
  return new RegExp(`^#kkk\u8BBE\u7F6E(${switchKeys.join("|")})(\u5F00\u542F|\u5173\u95ED)$`);
};
var createNumberRegExp = (platform) => {
  const numberKeys = Object.keys(PlatformTypeConfig[platform].numberConfig);
  return new RegExp(`^#kkk\u8BBE\u7F6E(${numberKeys.join("|")})(\\d+)$`);
};
var createCustomRegExp = (platform) => {
  const customKeys = Object.keys(PlatformTypeConfig[platform].customConfig ?? {});
  return new RegExp(`^#kkk\u8BBE\u7F6E(${customKeys.join("|")})(.*)$`);
};

export { Admin, biLogin, dylogin, setbilick, setdyck, task };
