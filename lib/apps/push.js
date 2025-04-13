import { createRequire } from 'module';
import '../chunk-FJODYXO3.js';
import { DouYinpush, Bilibilipush } from '../chunk-YI5IMXGL.js';
import { Config, getDouyinData, getBilibiliData } from '../chunk-NBLCDSW3.js';
import { init_esm_shims } from '../chunk-2FTP7FNI.js';
import karin from 'node-karin';

createRequire(import.meta.url);

// src/apps/push.ts
init_esm_shims();
var douyinPush = Config.douyin.push.switch && karin.task("\u6296\u97F3\u63A8\u9001", Config.douyin.push.cron, async () => {
  await new DouYinpush().action();
  return true;
}, { log: Config.douyin.push.log });
var bilibiliPush = Config.bilibili.push.switch && karin.task("B\u7AD9\u63A8\u9001", Config.bilibili.push.cron, async () => {
  await new Bilibilipush().action();
  return true;
}, { log: Config.bilibili.push.log });
var forcePush = karin.command(/#(抖音|B站)(全部)?强制推送/, async (e) => {
  if (e.msg.includes("\u6296\u97F3")) {
    await new DouYinpush(e, true).action();
    return true;
  } else if (e.msg.includes("B\u7AD9")) {
    await new Bilibilipush(e, true).action();
    return true;
  }
  return true;
}, { name: "\u{1D46A}\u{1D48A}\u{1D482}\u{1D48D}\u{1D48D}\u{1D490}\uFF5E(\u2220\u30FB\u03C9< )\u2312\u2605", perm: "master", event: "message.group" });
var setdyPush = karin.command(/^#设置抖音推送/, async (e) => {
  const data = await getDouyinData("\u641C\u7D22\u6570\u636E", Config.cookies.douyin, { query: e.msg.replace(/^#设置抖音推送/, "") });
  await new DouYinpush(e).setting(data);
  return true;
}, { name: "kkk-\u63A8\u9001\u529F\u80FD-\u8BBE\u7F6E", event: "message.group", perm: Config.douyin.push.permission, dsbAdapter: ["qqbot"] });
var setbiliPush = karin.command(/^#设置[bB]站推送(?:[Uu][Ii][Dd]:)?(\d+)$/, async (e) => {
  if (!Config.cookies.bilibili) {
    await e.reply("\n\u8BF7\u5148\u914D\u7F6EB\u7AD9Cookie", { at: true });
    return true;
  }
  const match = /^#设置[bB]站推送(?:UID:)?(\d+)$/.exec(e.msg);
  if (match && match[1]) {
    const data = await getBilibiliData("\u7528\u6237\u4E3B\u9875\u6570\u636E", Config.cookies.bilibili, { host_mid: Number(match[1]) });
    await new Bilibilipush(e).setting(data);
  }
  return true;
}, { name: "kkk-\u63A8\u9001\u529F\u80FD-\u8BBE\u7F6E", event: "message.group", perm: Config.bilibili.push.permission, dsbAdapter: ["qqbot"] });
var bilibiliPushList = karin.command(/^#?[bB]站推送列表$/, async (e) => {
  await new Bilibilipush(e).renderPushList();
}, { name: "kkk-\u63A8\u9001\u529F\u80FD-\u5217\u8868", event: "message.group" });
var douyinPushList = karin.command(/^#?抖音推送列表$/, async (e) => {
  await new DouYinpush(e).renderPushList();
}, { name: "kkk-\u63A8\u9001\u529F\u80FD-\u5217\u8868", event: "message.group" });
var changeBotID = karin.command(/^#kkk设置推送机器人/, async (e) => {
  const newDouyinlist = Config.pushlist.douyin.map((item) => {
    const modifiedGroupIds = item.group_id.map((groupId) => {
      const [group_id, uin] = groupId.split(":");
      return `${group_id}:${e.msg.replace(/^#kkk设置推送机器人/, "")}`;
    });
    return {
      ...item,
      group_id: modifiedGroupIds
    };
  });
  const newBilibililist = Config.pushlist.bilibili.map((item) => {
    const modifiedGroupIds = item.group_id.map((groupId) => {
      const [group_id, uin] = groupId.split(":");
      return `${group_id}:${e.msg.replace(/^#kkk设置推送机器人/, "")}`;
    });
    return {
      ...item,
      group_id: modifiedGroupIds
    };
  });
  Config.Modify("pushlist", "douyin", newDouyinlist);
  Config.Modify("pushlist", "bilibili", newBilibililist);
  await e.reply("\u63A8\u9001\u673A\u5668\u4EBA\u5DF2\u4FEE\u6539\u4E3A" + e.msg.replace(/^#kkk设置推送机器人/, ""));
  return true;
}, { name: "kkk-\u63A8\u9001\u529F\u80FD-\u8BBE\u7F6E", perm: "master" });

export { bilibiliPush, bilibiliPushList, changeBotID, douyinPush, douyinPushList, forcePush, setbiliPush, setdyPush };
