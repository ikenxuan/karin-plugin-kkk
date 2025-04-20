import { createRequire } from 'module';
import '../chunk-TCA4JYL2.js';
import { bilibiliLogin, douyinLogin } from '../chunk-ZODWKWBB.js';
import { Config, Common } from '../chunk-Z3A7JMXI.js';
import { init_esm_shims } from '../chunk-U2PMGOCW.js';
import fs from 'node:fs';
import karin, { logger } from 'node-karin';
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

export { biLogin, dylogin, setbilick, setdyck, task };
