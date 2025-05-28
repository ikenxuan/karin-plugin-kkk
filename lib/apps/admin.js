import fs from "node:fs";
import karin, { logger } from "node-karin";
import require$$1 from "path";
import "sequelize";
import { C as Config, a as Common, b as bilibiliLogin, d as douyinLogin } from "../chunk/main-Bavjz2gk.js";
import "../root.js";
import "../chunk/vendor-BnVODeEf.js";
import "node-karin/axios";
import "stream/promises";
import "node:path";
const task = Config.app.rmmp4 && karin.task("[kkk-视频缓存自动删除]", "0 0 4 * * *", async () => {
  try {
    await removeAllFiles(Common.tempDri.video);
    logger.mark(Common.tempDri.video + "目录下所有文件已删除");
  } catch (err) {
    console.error("删除文件时出错:", err);
  }
});
const biLogin = karin.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, async (e) => {
  await bilibiliLogin(e);
  return true;
}, { perm: Config.bilibili.loginPerm, name: "kkk-ck管理" });
const dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
  await douyinLogin(e);
  return true;
}, { perm: Config.douyin.loginPerm, name: "kkk-ck管理" });
const setdyck = karin.command(/^#?(kkk)?s*设置抖音ck$/i, async (e) => {
  const msg = await e.reply("请发在120秒内送抖音ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
  const context = await karin.ctx(e);
  Config.Modify("cookies", "douyin", context.msg);
  await e.bot.recallMsg(e.contact, msg.messageId);
  await e.reply("设置成功！", { at: true });
  return true;
}, { perm: "master", name: "kkk-ck管理", event: "message.friend" });
const setbilick = karin.command(/^#?(kkk)?s*设置s*(B站)ck$/i, async (e) => {
  const msg = await e.reply("请发在120秒内送B站ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
  const context = await karin.ctx(e);
  Config.Modify("cookies", "bilibili", context.msg);
  await e.bot.recallMsg(e.contact, msg.messageId);
  await e.reply("设置成功！", { at: true });
  return true;
}, { perm: "master", name: "kkk-ck管理", event: "message.friend" });
async function removeAllFiles(dir) {
  const files = await fs.promises.readdir(dir);
  for (const file of files) {
    const filePath = require$$1.join(dir, file);
    const stats = await fs.promises.stat(filePath);
    if (stats.isDirectory()) {
      await removeAllFiles(filePath);
      await fs.promises.rmdir(filePath);
    } else {
      await fs.promises.unlink(filePath);
    }
  }
}
export {
  biLogin,
  dylogin,
  setbilick,
  setdyck,
  task
};
