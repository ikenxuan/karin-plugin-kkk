import "../chunks/react-tSI5bnDQ.js";
import "../chunks/src-CM898wRa.js";
import { Render, baseHeaders } from "../chunks/module-CIiJvDgv.js";
import { Root } from "../root-BijQeroW.js";
import "../chunks/react-dom-DjLB5oxT.js";
import karin, { checkPkgUpdate, config, db, hooks, logger, range, restart, segment, updatePkg } from "node-karin";
import axios from "node-karin/axios";

//#region src/module/utils/changelog.ts
/**
* 规范化为 x.x.x（剔除 v 前缀、预发布、构建标识）
* @param v 版本字符串
* @returns 核心版本字符串
*/
const versionCore = (v) => {
	v = v.trim();
	if (v.startsWith("v") || v.startsWith("V")) v = v.slice(1);
	const [preBuild] = v.split("+", 2);
	const [core] = preBuild.split("-", 2);
	return core;
};
/**
* 获取变更日志图片
* @param props 获取变更日志图片选项
* @returns 变更日志图片base64字符串
*/
const getChangelogImage = async (props) => {
	const urls = [
		`https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://npm.onmicrosoft.cn/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://npm.onmicrosoft.cn/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://cdn.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://fastly.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://unpkg.com/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://jiashu.1win.eu.org/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`
	];
	let changelog = "";
	const requests = urls.map((url) => axios.get(url, {
		timeout: 1e4,
		headers: baseHeaders
	}).then((res) => {
		if (typeof res.data === "string" && res.data.length > 0) return res.data;
		throw new Error("Invalid changelog content");
	}));
	try {
		changelog = await Promise.any(requests);
	} catch {
		return null;
	}
	if (!changelog) return null;
	return await Render("other/changelog", {
		markdown: range(changelog, versionCore(props.localVersion), versionCore(props.remoteVersion)),
		Tip: props.Tip
	}) || null;
};

//#endregion
//#region src/module/utils/semver.ts
/**
* 语义化版本比较
* @param remote 远程版本字符串
* @param local 本地版本字符串
* @returns 如果远程版本大于本地版本则返回true，否则返回false
*/
const isSemverGreater = (remote, local) => {
	const parse = (v) => {
		v = v.trim();
		if (v.startsWith("v") || v.startsWith("V")) v = v.slice(1);
		const [preBuild] = v.split("+", 2);
		const [core, pre] = preBuild.split("-", 2);
		const parts = core.split(".");
		return {
			major: parseInt(parts[0] || "0", 10) || 0,
			minor: parseInt(parts[1] || "0", 10) || 0,
			patch: parseInt(parts[2] || "0", 10) || 0,
			prerelease: pre ? pre.split(".") : []
		};
	};
	const cmpId = (a, b) => {
		const an = /^\d+$/.test(a);
		const bn = /^\d+$/.test(b);
		if (an && bn) {
			const na = parseInt(a, 10);
			const nb = parseInt(b, 10);
			if (na === nb) return 0;
			return na > nb ? 1 : -1;
		}
		if (an && !bn) return -1;
		if (!an && bn) return 1;
		if (a === b) return 0;
		return a > b ? 1 : -1;
	};
	const r = parse(remote);
	const l = parse(local);
	if (r.major !== l.major) return r.major > l.major;
	if (r.minor !== l.minor) return r.minor > l.minor;
	if (r.patch !== l.patch) return r.patch > l.patch;
	const ra = r.prerelease;
	const la = l.prerelease;
	if (ra.length === 0 && la.length === 0) return false;
	if (ra.length === 0 && la.length > 0) return true;
	if (ra.length > 0 && la.length === 0) return false;
	const len = Math.min(ra.length, la.length);
	for (const [i, raItem] of ra.entries()) {
		if (i >= len) break;
		const c = cmpId(raItem, la[i]);
		if (c !== 0) return c > 0;
	}
	if (ra.length !== la.length) return ra.length > la.length;
	return false;
};

//#endregion
//#region src/apps/update.ts
const UPDATE_LOCK_KEY = "kkk:update:lock";
const UPDATE_MSGID_KEY = "kkk:update:msgId";
const Handler = async (e) => {
	if (process.env.NODE_ENV === "development") return true;
	logger.trace(e);
	let upd;
	try {
		upd = await checkPkgUpdate(Root.pluginName);
	} catch {
		return true;
	}
	if (upd.status === "yes" && !isSemverGreater(upd.remote, upd.local)) return true;
	if (upd.status !== "yes") return true;
	try {
		const lockedVersion = await db.get(UPDATE_LOCK_KEY);
		if (typeof lockedVersion === "string" && lockedVersion.length > 0) {
			if (!isSemverGreater(lockedVersion, Root.pluginVersion)) await db.del(UPDATE_LOCK_KEY);
			else if (!isSemverGreater(upd.remote, lockedVersion)) return true;
		}
	} catch {}
	try {
		await db.set(UPDATE_LOCK_KEY, upd.remote);
	} catch {}
	const ChangeLogImg = await getChangelogImage({
		localVersion: Root.pluginVersion,
		remoteVersion: upd.remote,
		Tip: true
	});
	const list = config.master();
	let master = list[0];
	if (master === "console") master = list[1];
	const botList = karin.getAllBotList();
	if (ChangeLogImg) {
		const msgResult = await karin.sendMaster(botList[0].bot.account.name === "console" ? botList[1].bot.account.selfId : botList[0].bot.account.selfId, master, [segment.text("karin-plugin-kkk 有新的更新！"), ...ChangeLogImg]);
		try {
			await db.set(UPDATE_MSGID_KEY, msgResult.messageId);
		} catch {}
	}
	return true;
};
const kkkUpdate = hooks.message.friend(async (e, next) => {
	if (e.msg.includes("更新")) {
		const msgId = await db.get(UPDATE_MSGID_KEY);
		if (e.replyId === msgId) try {
			const upd = await checkPkgUpdate(Root.pluginName);
			if (upd.status === "yes") {
				const result = await updatePkg(Root.pluginName);
				if (result.status === "ok") {
					if ((await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)).messageId) try {
						await db.del(UPDATE_MSGID_KEY);
						await db.del(UPDATE_LOCK_KEY);
					} catch {}
					await restart(e.selfId, e.contact, e.messageId);
				} else await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
			} else if (upd.status === "no") await e.reply("未检测到可更新版本。");
			else await e.reply(`${Root.pluginName} 更新失败: ${upd.error?.message ?? String(upd.error)}`);
		} catch (error) {
			await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
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
	if (ChangeLogImg) await e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true });
	else await e.reply("获取更新日志失败，更新进程继续......", { reply: true });
	try {
		const result = await updatePkg(Root.pluginName);
		if (result.status === "ok") {
			if ((await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)).messageId) try {
				await db.del(UPDATE_MSGID_KEY);
				await db.del(UPDATE_LOCK_KEY);
			} catch {}
			await restart(e.selfId, e.contact, e.messageId);
		} else await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
	} catch (error) {
		await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
	}
}, { name: "kkk-更新" });
const update = karin.task("kkk-更新检测", "*/10 * * * *", Handler, {
	name: "kkk-更新检测",
	log: false
});

//#endregion
export { kkkUpdate, kkkUpdateCommand, update };