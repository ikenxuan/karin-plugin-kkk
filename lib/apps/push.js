import { a as Config, B as Bilibilipush, h as getDouyinData, g as getBilibiliData } from "../chunk/index-DTQeTO4l.js";
import karin from "node-karin";
import "sequelize";
import "../Version.js";
import "node:fs";
import "node-karin/axios";
import "stream/promises";
import "node:path";
import { D as DouYinpush } from "../chunk/push-BRW5enQU.js";
import "../chunk/index-BDlGFCbK.js";
import "node:child_process";
import "playwright";
const douyinPush = Config.douyin.push.switch && karin.task("抖音推送", Config.douyin.push.cron, async () => {
  await new DouYinpush().action();
  return true;
}, { log: Config.douyin.push.log });
const bilibiliPush = Config.bilibili.push.switch && karin.task("B站推送", Config.bilibili.push.cron, async () => {
  await new Bilibilipush().action();
  return true;
}, { log: Config.bilibili.push.log });
const forcePush = karin.command(/#(抖音|B站)(全部)?强制推送/, async (e) => {
  if (e.msg.includes("抖音")) {
    await new DouYinpush(e, true).action();
    return true;
  } else if (e.msg.includes("B站")) {
    await new Bilibilipush(e, true).action();
    return true;
  }
  return true;
}, { name: "𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★", perm: "master", event: "message.group" });
const setdyPush = karin.command(/^#设置抖音推送/, async (e) => {
  const data = await getDouyinData("搜索数据", Config.cookies.douyin, { query: e.msg.replace(/^#设置抖音推送/, ""), typeMode: "strict" });
  await new DouYinpush(e).setting(data);
  return true;
}, { name: "kkk-推送功能-设置", event: "message.group", perm: Config.douyin.push.permission, dsbAdapter: ["qqbot"] });
const setbiliPush = karin.command(/^#设置[bB]站推送(?:[Uu][Ii][Dd]:)?(\d+)$/, async (e) => {
  if (!Config.cookies.bilibili) {
    await e.reply("\n请先配置B站Cookie", { at: true });
    return true;
  }
  const match = /^#设置[bB]站推送(?:UID:)?(\d+)$/.exec(e.msg);
  if (match && match[1]) {
    const data = await getBilibiliData("用户主页数据", Config.cookies.bilibili, { host_mid: Number(match[1]), typeMode: "strict" });
    await new Bilibilipush(e).setting(data);
  }
  return true;
}, { name: "kkk-推送功能-设置", event: "message.group", perm: Config.bilibili.push.permission, dsbAdapter: ["qqbot"] });
const bilibiliPushList = karin.command(/^#?[bB]站推送列表$/, async (e) => {
  await new Bilibilipush(e).renderPushList();
}, { name: "kkk-推送功能-列表", event: "message.group" });
const douyinPushList = karin.command(/^#?抖音推送列表$/, async (e) => {
  await new DouYinpush(e).renderPushList();
}, { name: "kkk-推送功能-列表", event: "message.group" });
const changeBotID = karin.command(/^#kkk设置推送机器人/, async (e) => {
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
  await e.reply("推送机器人已修改为" + e.msg.replace(/^#kkk设置推送机器人/, ""));
  return true;
}, { name: "kkk-推送功能-设置", perm: "master" });
export {
  bilibiliPush,
  bilibiliPushList,
  changeBotID,
  douyinPush,
  douyinPushList,
  forcePush,
  setbiliPush,
  setdyPush
};
