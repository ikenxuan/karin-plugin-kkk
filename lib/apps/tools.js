import { createRequire } from 'module';
import { getDouyinID, DouYin, getBilibiliID, Bilibili, getKuaishouID, fetchKuaishouData, Kuaishou } from '../chunk-J5OWCZQU.js';
import { Config, Common } from '../chunk-NBLCDSW3.js';
import { init_esm_shims } from '../chunk-2FTP7FNI.js';
import karin from 'node-karin';

createRequire(import.meta.url);

// src/apps/tools.ts
init_esm_shims();
var reg = {
  douyin: new RegExp("^.*((www|v|jx)\\.(douyin|iesdouyin)\\.com|douyin\\.com\\/(video|note)).*"),
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
  const urlRex = /(https?:\/\/)?(www\.bilibili\.com|m\.bilibili\.com|t\.bilibili\.com|bili2233\.cn)\/[a-zA-Z0-9._%&+=\-\/?]*[a-zA-Z0-9_\/?=&#%+]*$/g;
  const bShortRex = /https?:\/\/(b23\.tv|bili2233\.cn)\/([a-zA-Z0-9]+)/;
  let url = "";
  if (urlRex.test(e.msg)) {
    const matchResult = e.msg.match(urlRex);
    url = matchResult ? matchResult[0] : null;
  } else if (bShortRex.test(e.msg)) {
    const match = bShortRex.exec(e.msg);
    url = match && match[0];
  } else if (/^BV[1-9a-zA-Z]{10}$/.test(e.msg)) {
    url = `https://www.bilibili.com/video/${e.msg}`;
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
