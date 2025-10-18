import karin, { hooks, db, checkPkgUpdate, updatePkg, restart, segment, logger, config } from "node-karin";
import "../core_chunk/db-unce5HHg.js";
import { Root } from "../root.js";
import "node:fs";
import "../core_chunk/vendor-D4npnrky.js";
import { z as isSemverGreater, A as getChangelogImage } from "../core_chunk/main-Dk1VWrrs.js";
import "node-karin/axios";
import "stream/promises";
import "node:path";
import "../core_chunk/template.js";
const UPDATE_LOCK_KEY = "kkk:update:lock";
const UPDATE_MSGID_KEY = "kkk:update:msgId";
const Handler = async (e) => {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  logger.trace(e);
  let upd;
  try {
    upd = await checkPkgUpdate(Root.pluginName);
  } catch {
    return true;
  }
  if (upd.status === "yes" && !isSemverGreater(upd.remote, upd.local)) {
    return true;
  }
  if (upd.status !== "yes") {
    return true;
  }
  try {
    const lockedVersion = await db.get(UPDATE_LOCK_KEY);
    if (typeof lockedVersion === "string" && lockedVersion.length > 0) {
      if (!isSemverGreater(lockedVersion, Root.pluginVersion)) {
        await db.del(UPDATE_LOCK_KEY);
      } else {
        if (!isSemverGreater(upd.remote, lockedVersion)) {
          return true;
        }
      }
    }
  } catch {
  }
  try {
    await db.set(UPDATE_LOCK_KEY, upd.remote);
  } catch {
  }
  const ChangeLogImg = await getChangelogImage({
    localVersion: Root.pluginVersion,
    remoteVersion: upd.remote,
    Tip: true
  });
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
    } catch {
    }
  }
  return true;
};
const kkkUpdate = hooks.message.friend(async (e, next) => {
  if (e.msg.includes("更新")) {
    const msgId = await db.get(UPDATE_MSGID_KEY);
    if (e.replyId === msgId) {
      try {
        const upd = await checkPkgUpdate(Root.pluginName);
        if (upd.status === "yes") {
          const result = await updatePkg(Root.pluginName);
          if (result.status === "ok") {
            const msgResult = await e.reply(
              `${Root.pluginName} 更新成功！
${result.local} -> ${result.remote}
开始执行重启......`
            );
            if (msgResult.messageId) {
              try {
                await db.del(UPDATE_MSGID_KEY);
                await db.del(UPDATE_LOCK_KEY);
              } catch {
              }
            }
            await restart(e.selfId, e.contact, e.messageId);
          } else {
            await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
          }
        } else if (upd.status === "no") {
          await e.reply("未检测到可更新版本。");
        } else {
          await e.reply(`${Root.pluginName} 更新失败: ${upd.error?.message ?? String(upd.error)}`);
        }
      } catch (error) {
        await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
      }
    }
  }
  next();
}, { priority: 100 });
const kkkUpdateCommand = karin.command(/^#?kkk更新$/, async (e) => {
  const upd = await checkPkgUpdate(Root.pluginName);
  if (upd.status === "error") {
    await e.reply(`获取远程版本失败：${upd.error?.message ?? String(upd.error)}`);
    return;
  }
  if (upd.status === "no") {
    await e.reply(`当前已是最新版本：${upd.local}`, { reply: true });
    return;
  }
  if (upd.status === "yes" && !isSemverGreater(upd.remote, upd.local)) {
    await e.reply(`当前已是最新或预览版本：${upd.local}`, { reply: true });
    return;
  }
  const ChangeLogImg = await getChangelogImage({
    localVersion: Root.pluginVersion,
    remoteVersion: upd.remote,
    Tip: false
  });
  if (ChangeLogImg) {
    await e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true });
  } else {
    await e.reply("获取更新日志失败，更新进程继续......", { reply: true });
  }
  try {
    const result = await updatePkg(Root.pluginName);
    if (result.status === "ok") {
      const msgResult = await e.reply(
        `${Root.pluginName} 更新成功！
${result.local} -> ${result.remote}
开始执行重启......`
      );
      if (msgResult.messageId) {
        try {
          await db.del(UPDATE_MSGID_KEY);
          await db.del(UPDATE_LOCK_KEY);
        } catch {
        }
      }
      await restart(e.selfId, e.contact, e.messageId);
    } else {
      await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
    }
  } catch (error) {
    await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
  }
}, { name: "kkk-更新" });
const update = karin.task("kkk-更新检测", "*/10 * * * *", Handler, {
  name: "kkk-更新检测",
  log: false
});
export {
  kkkUpdate,
  kkkUpdateCommand,
  update
};
