import karin, { logger } from "node-karin";
import "../core_chunk/db-B3gwzi4J.js";
import "../root.js";
import "node:fs";
import "../core_chunk/vendor-RKDtco_K.js";
import { o as getDouyinID, p as DouYin, C as Config, q as getBilibiliID, r as Bilibili, t as getKuaishouID, u as fetchKuaishouData, K as Kuaishou, m as Common } from "../core_chunk/main-DzqeguSD.js";
import "node-karin/axios";
import "stream/promises";
import "node:path";
import "node:child_process";
import "playwright";
const reg = {
  douyin: /^.*((www|v|jx|m)\.(douyin|iesdouyin)\.com|douyin\.com\/(video|note)).*/,
  bilibili: /(bilibili.com|b23.tv|t.bilibili.com|bili2233.cn|BV[a-zA-Z0-9]{10,})/,
  kuaishou: /^((.*)快手(.*)快手(.*)|(.*)v\.kuaishou(.*))$/
};
const douyin = karin.command(reg.douyin, async (e) => {
  const url = String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g));
  const iddata = await getDouyinID(e, url);
  await new DouYin(e, iddata).RESOURCES(iddata);
  return true;
}, { name: "kkk-视频功能-抖音", priority: Config.app.videoTool ? -Infinity : 800 });
const bilibili = karin.command(reg.bilibili, async (e) => {
  e.msg = e.msg.replace(/\\/g, "");
  const urlRegex = /(https?:\/\/(?:www\.bilibili\.com|m\.bilibili\.com|t\.bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-.~:/?#[\]@!$&'()*+,;=]+)/;
  const bvRegex = /^BV[1-9a-zA-Z]{10}$/;
  let url = null;
  const urlMatch = e.msg.match(urlRegex);
  if (urlMatch) {
    url = urlMatch[0];
  } else if (bvRegex.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`;
  }
  if (!url) {
    logger.warn(`未能在消息中找到有效的B站分享链接或BV号: ${e.msg}`);
    return true;
  }
  const iddata = await getBilibiliID(url);
  await new Bilibili(e, iddata).RESOURCES(iddata);
  return true;
}, { name: "kkk-视频功能-B站", priority: Config.app.videoTool ? -Infinity : 800 });
const kuaishou = karin.command(reg.kuaishou, async (e) => {
  const iddata = await getKuaishouID(String(e.msg.replaceAll("\\", "").match(/https:\/\/v\.kuaishou\.com\/\w+/g)));
  const WorkData = await fetchKuaishouData(iddata.type, iddata);
  await new Kuaishou(e, iddata).RESOURCES(WorkData);
}, { name: "kkk-视频功能-快手", priority: Config.app.videoTool ? -Infinity : 800 });
const prefix = karin.command(/^#?(解析|kkk解析)/, async (e, next) => {
  e.msg = await Common.getReplyMessage(e);
  if (reg.douyin.test(e.msg)) {
    return await douyin.fnc(e, next);
  } else if (reg.bilibili.test(e.msg)) {
    return await bilibili.fnc(e, next);
  } else if (reg.kuaishou.test(e.msg)) {
    return await kuaishou.fnc(e, next);
  }
}, { name: "kkk-视频功能-引用解析" });
const douyinAPP = Config.douyin.switch && douyin;
const bilibiliAPP = Config.bilibili.switch && bilibili;
const kuaishouAPP = Config.kuaishou.switch && kuaishou;
export {
  bilibiliAPP,
  douyinAPP,
  kuaishouAPP,
  prefix
};
