import { createRequire } from 'module';
import { getDouyinID, DouYin, getBilibiliID, Bilibili, getKuaishouID, fetchKuaishouData, Kuaishou } from '../chunk-V6LMONNG.js';
import '../chunk-KXW35VFB.js';
import { Config, Common } from '../chunk-A7MBM6U4.js';
import { init_esm_shims } from '../chunk-QDZSZUZO.js';
import karin, { logger } from 'node-karin';

createRequire(import.meta.url);

// src/apps/tools.ts
init_esm_shims();
var reg = {
  douyin: new RegExp("^.*((www|v|jx|m)\\.(douyin|iesdouyin)\\.com|douyin\\.com\\/(video|note)).*"),
  bilibili: new RegExp(/(bilibili.com|b23.tv|t.bilibili.com|bili2233.cn|BV[a-zA-Z0-9]{10,})/),
  kuaishou: new RegExp("^((.*)\u5FEB\u624B(.*)\u5FEB\u624B(.*)|(.*)v.kuaishou(.*))$")
};
var douyin = karin.command(reg.douyin, async (e) => {
  const url = String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g));
  const iddata = await getDouyinID(url);
  await new DouYin(e, iddata).RESOURCES(iddata);
  return true;
}, { name: "kkk-\u89C6\u9891\u529F\u80FD-\u6296\u97F3", priority: Config.app.defaulttool ? -Infinity : 800 });
var bilibili = karin.command(reg.bilibili, async (e) => {
  e.msg = e.msg.replace(/\\/g, "");
  const urlRegex = /(https?:\/\/(?:www\.bilibili\.com|m\.bilibili\.com|t\.bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-\.~:\/\?#\[\]@!$&'\(\)\*\+,;=]+)/;
  const bvRegex = /^BV[1-9a-zA-Z]{10}$/;
  let url = null;
  const urlMatch = e.msg.match(urlRegex);
  if (urlMatch) {
    url = urlMatch[0];
  } else if (bvRegex.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`;
  }
  if (!url) {
    logger.warn(`\u672A\u80FD\u5728\u6D88\u606F\u4E2D\u627E\u5230\u6709\u6548\u7684B\u7AD9\u5206\u4EAB\u94FE\u63A5\u6216BV\u53F7: ${e.msg}`);
    return true;
  }
  const iddata = await getBilibiliID(url);
  await new Bilibili(e, iddata).RESOURCES(iddata);
  return true;
}, { name: "kkk-\u89C6\u9891\u529F\u80FD-B\u7AD9", priority: Config.app.defaulttool ? -Infinity : 800 });
var kuaishou = karin.command(reg.kuaishou, async (e) => {
  const iddata = await getKuaishouID(String(e.msg.replaceAll("\\", "").match(/https:\/\/v\.kuaishou\.com\/\w+/g)));
  const WorkData = await fetchKuaishouData(iddata.type, iddata);
  await new Kuaishou(e, iddata).RESOURCES(WorkData);
}, { name: "kkk-\u89C6\u9891\u529F\u80FD-\u5FEB\u624B", priority: Config.app.defaulttool ? -Infinity : 800 });
var prefix = karin.command(/^#?(解析|kkk解析)/, async (e, next) => {
  e.msg = await Common.getReplyMessage(e);
  if (reg.douyin.test(e.msg)) {
    return await douyin.fnc(e, next);
  } else if (reg.bilibili.test(e.msg)) {
    return await bilibili.fnc(e, next);
  } else if (reg.kuaishou.test(e.msg)) {
    return await kuaishou.fnc(e, next);
  }
}, { name: "kkk-\u89C6\u9891\u529F\u80FD-\u5F15\u7528\u89E3\u6790" });
var douyinAPP = Config.douyin.switch && douyin;
var bilibiliAPP = Config.bilibili.switch && bilibili;
var kuaishouAPP = Config.kuaishou.switch && kuaishou;

export { bilibiliAPP, douyinAPP, kuaishouAPP, prefix };
