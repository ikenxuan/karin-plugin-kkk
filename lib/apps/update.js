import karin, { hooks, db, checkPkgUpdate, updatePkg, restart, segment, logger, config } from "node-karin";
import axios from "node-karin/axios";
import "../core_chunk/db-Ep6PKst3.js";
import { Root } from "../root.js";
import "node:fs";
import "../core_chunk/vendor-IyMLJerg.js";
import { z as isSemverGreater, A as getChangelogImage } from "../core_chunk/main-BkbyCA7s.js";
import "stream/promises";
import "node:path";
import "../core_chunk/template.js";
const UPDATE_LOCK_KEY = "kkk:update:lock";
const UPDATE_MSGID_KEY = "kkk:update:msgId";
const Handler = async (e) => {
  logger.trace(e);
  const registryUrl = `https://registry.npmjs.org/${Root.pluginName}`;
  let latestVersion = null;
  try {
    const res = await axios.get(registryUrl, { timeout: 1e4 });
    latestVersion = res.data?.["dist-tags"]?.latest || res.data?.version || null;
  } catch {
    return true;
  }
  if (!latestVersion) {
    return true;
  }
  const lockKey = UPDATE_LOCK_KEY;
  try {
    const lockedVersion = await db.get(lockKey);
    if (typeof lockedVersion === "string" && lockedVersion.length > 0) {
      if (!isSemverGreater(lockedVersion, Root.pluginVersion)) {
        await db.del(lockKey);
      } else {
        return true;
      }
    }
  } catch {
  }
  if (!isSemverGreater(latestVersion, Root.pluginVersion)) {
    return true;
  }
  try {
    await db.set(lockKey, latestVersion);
  } catch {
  }
  const ChangeLogImg = await getChangelogImage(Root.pluginVersion, latestVersion);
  const list = config.master();
  let master = list[0];
  if (master === "console") {
    master = list[1];
  }
  const botList = karin.getAllBotList();
  if (ChangeLogImg) {
    const msgResult = await karin.sendMaster(
      botList[0].bot.account.name === "console" ? botList[1].bot.account.selfId : botList[0].bot.account.selfId,
      master,
      [
        segment.text("karin-plugin-kkk 有新的更新！"),
        ...ChangeLogImg
      ]
    );
    try {
      await db.set(UPDATE_MSGID_KEY, msgResult.messageId);
      await db.set(lockKey, latestVersion);
    } catch {
    }
  }
  return true;
};
const kkkUpdate = hooks.message.friend(async (e, next) => {
  if (e.msg.includes("更新")) {
    const msgId = await db.get(UPDATE_MSGID_KEY);
    if (e.replyId === msgId) {
      const updateStatus = await checkPkgUpdate(Root.pluginName);
      if (updateStatus.status === "yes") {
        try {
          const result = await updatePkg(Root.pluginName);
          if (result.status === "ok") {
            const msgResult = await e.reply(`${Root.pluginName} 更新成功！
${result.local} -> ${result.remote}
开始执行重启......`);
            msgResult.messageId && await db.del(UPDATE_MSGID_KEY) && await db.del(UPDATE_LOCK_KEY);
            const restartStartTime = Date.now();
            const restartResult = await restart(e.selfId, e.contact, e.messageId);
            if (restartResult.status === "success") {
              await e.reply(`重启成功，耗时: ${(Date.now() - restartStartTime / 1e3).toFixed(2)}s`);
            } else {
              await e.reply(`重启失败: ${restartResult.data}`);
            }
          } else if (result.status === "failed") {
            await e.reply(`${Root.pluginName} 更新失败: ${result.data}`);
          }
        } catch (error) {
          await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
        }
      }
    }
  }
  next();
}, { priority: 100 });
const kkkUpdateCommand = karin.command(/^#?kkk更新$/, async (e) => {
  const registryUrl = `https://registry.npmjs.org/${Root.pluginName}`;
  let latestVersion = null;
  try {
    const res = await axios.get(registryUrl, { timeout: 1e4 });
    latestVersion = res.data?.["dist-tags"]?.latest || res.data?.version || null;
  } catch {
    await e.reply("获取远程版本失败，请稍后再试。");
    return;
  }
  if (!latestVersion) {
    await e.reply("未获取到最新版本信息。");
    return;
  }
  if (!isSemverGreater(latestVersion, Root.pluginVersion)) {
    await e.reply(`当前已是最新版本：${Root.pluginVersion}`, { reply: true });
    return;
  }
  const ChangeLogImg = await getChangelogImage(Root.pluginVersion, latestVersion);
  if (ChangeLogImg) {
    await e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true });
  } else {
    await e.reply("获取更新日志失败，更新进程继续......", { reply: true });
  }
  const updateStatus = await checkPkgUpdate(Root.pluginName);
  if (updateStatus.status === "yes") {
    try {
      const result = await updatePkg(Root.pluginName);
      if (result.status === "ok") {
        const msgResult = await e.reply(`${Root.pluginName} 更新成功！
${result.local} -> ${result.remote}
开始执行重启......`);
        msgResult.messageId && await db.del(UPDATE_MSGID_KEY) && await db.del(UPDATE_LOCK_KEY);
        const restartStartTime = Date.now();
        const restartResult = await restart(e.selfId, e.contact, e.messageId);
        if (restartResult.status === "success") {
          await e.reply(`重启成功，耗时: ${((Date.now() - restartStartTime) / 1e3).toFixed(2)}s`);
        } else {
          await e.reply(`重启失败: ${restartResult.data}`);
        }
      } else if (result.status === "failed") {
        await e.reply(`${Root.pluginName} 更新失败: ${result.data}`);
      }
    } catch (error) {
      await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
    }
  } else {
    await e.reply("未检测到可更新版本。");
  }
}, { name: "kkk-更新" });
const updateTest = karin.command("test", async (e) => {
  return Handler(e);
}, {
  name: "kkk-更新检测"
});
const update = karin.task("kkk-更新检测", "*/10 * * * *", Handler, {
  name: "kkk-更新检测",
  log: false
});
export {
  kkkUpdate,
  kkkUpdateCommand,
  update,
  updateTest
};
