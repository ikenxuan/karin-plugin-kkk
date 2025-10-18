import { Config, Render, logger as logger$1 } from "./module-eOc7Zf1N.js";
import karin, { config, logger, segment } from "node-karin";
import util from "node:util";

//#region src/module/utils/LogCollector.ts
/**
* 日志收集器类，收集任务执行期间的amagi日志信息
*/
var LogCollector = class LogCollector {
	/** 收集到的日志列表 */
	logs = [];
	/** 是否正在收集日志 */
	isCollecting = false;
	/** amagi logger原始方法备份 */
	originalAmagiWarn = null;
	originalAmagiError = null;
	/** 是否已经拦截过amagi logger */
	static isAmagiIntercepted = false;
	/**
	* 构造函数
	*/
	constructor() {
		if (!LogCollector.isAmagiIntercepted) {
			this.interceptAmagiLogger();
			LogCollector.isAmagiIntercepted = true;
		}
		this.registerInstance();
	}
	/**
	* 开始收集日志
	*/
	startCollecting() {
		if (this.isCollecting) return;
		this.isCollecting = true;
		this.logs = [];
	}
	/**
	* 停止收集日志
	*/
	stopCollecting() {
		if (!this.isCollecting) return;
		this.isCollecting = false;
		this.unregisterInstance();
	}
	/**
	* 拦截amagi logger的warn和error方法
	*/
	interceptAmagiLogger() {
		this.originalAmagiWarn = logger$1.warn.bind(logger$1);
		this.originalAmagiError = logger$1.error.bind(logger$1);
		logger$1.warn = (message, ...args) => {
			LogCollector.collectToAllInstances("warn", [message, ...args]);
			if (this.originalAmagiWarn) this.originalAmagiWarn(message, ...args);
		};
		logger$1.error = (message, ...args) => {
			LogCollector.collectToAllInstances("error", [message, ...args]);
			if (this.originalAmagiError) this.originalAmagiError(message, ...args);
		};
	}
	/** 所有活跃的收集器实例 */
	static activeInstances = [];
	/**
	* 向所有活跃的收集器实例收集日志
	* @param level 日志级别
	* @param args 日志参数
	*/
	static collectToAllInstances(level, args) {
		LogCollector.activeInstances.forEach((instance) => {
			if (instance.isCollecting) instance.collectAmagiLog(level, args);
		});
	}
	/**
	* 收集amagi日志
	* @param level 日志级别
	* @param args 日志参数
	*/
	collectAmagiLog(level, args) {
		if (!this.isCollecting) return;
		const logEntry = {
			level,
			message: args.map((arg) => typeof arg === "string" ? arg : JSON.stringify(arg)).join(" "),
			timestamp: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19),
			source: "amagi"
		};
		this.logs.push(logEntry);
	}
	/**
	* 获取收集期间的所有日志
	* @returns 日志条目数组
	*/
	getCollectedLogs() {
		return [...this.logs];
	}
	/**
	* 获取格式化的日志字符串
	* @returns 格式化的日志字符串
	*/
	getFormattedLogs() {
		return this.logs.map((log) => {
			return `[${log.timestamp}] [${log.source}] [${log.level.toUpperCase()}] ${log.message}`;
		}).join("\n\n");
	}
	/**
	* 清空收集到的日志
	*/
	clearLogs() {
		this.logs = [];
	}
	/**
	* 注册活跃实例
	*/
	registerInstance() {
		if (!LogCollector.activeInstances.includes(this)) LogCollector.activeInstances.push(this);
	}
	/**
	* 注销活跃实例
	*/
	unregisterInstance() {
		const index = LogCollector.activeInstances.indexOf(this);
		if (index > -1) LogCollector.activeInstances.splice(index, 1);
	}
};

//#endregion
//#region src/module/utils/ErrorHandler.ts
/**
* 获取推送配置中的机器人ID
* @param pushlist 推送配置列表
* @returns 机器人ID配置
*/
function statBotId(pushlist) {
	const douyin = pushlist.douyin?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
	const bilibili = pushlist.bilibili?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
	return {
		douyin: { botId: douyin },
		bilibili: { botId: bilibili }
	};
}
/**
* 函数式错误处理包装器
* @param fn 要包装的函数
* @param options 错误处理选项
* @returns 包装后的函数
*/
const wrapWithErrorHandler = (fn, options) => {
	return (async (...args) => {
		const logCollector = new LogCollector();
		try {
			logCollector.startCollecting();
			return await fn(...args);
		} catch (error) {
			const collectedLogs = logCollector.getFormattedLogs();
			if (!Config.app.errorLogSendTo) throw error;
			await handleBusinessError(error, options, collectedLogs, args[0]);
			throw error;
		} finally {
			logCollector.stopCollecting();
		}
	});
};
/**
* 处理业务错误的核心函数
* @param error 错误对象
* @param options 错误处理选项
* @param logs 收集到的日志
* @param event 消息事件对象
*/
const handleBusinessError = async (error, options, logs$1, event) => {
	const triggerCommand = event?.msg || "未知命令或处于非消息环境";
	const img = await Render("other/handlerError", {
		type: "business_error",
		platform: "system",
		error: {
			message: error.message,
			name: error.name,
			stack: util.format(error),
			businessName: options.businessName
		},
		method: options.businessName,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		logs: logs$1,
		triggerCommand,
		share_url: triggerCommand
	});
	if (event && Config.app.errorLogSendTo.some((item) => item === "trigger")) try {
		event.reply(img);
	} catch (replyError) {
		logger.error(`发送错误消息给用户失败: ${replyError}`);
	}
	if (Config.app.errorLogSendTo.some((item) => item === "master")) try {
		const botId = statBotId(Config.pushlist);
		const list = config.master();
		let master = list[0];
		if (master === "console") master = list[1];
		const selectedBotId = botId.douyin.botId || botId.bilibili.botId || "";
		const isPushTask = !event || options.businessName.includes("推送");
		if (selectedBotId && master) if (isPushTask) await karin.sendMaster(selectedBotId, master, [segment.text(`${options.businessName} 任务执行出错！\n请即时解决以消除警告`), ...img]);
		else {
			const Adapter = karin.getBot(selectedBotId);
			const groupID = event && "groupId" in event ? event.groupId : "";
			const groupInfo = await Adapter?.getGroupInfo(groupID);
			await karin.sendMaster(selectedBotId, master, [segment.text(`群：${groupInfo?.groupName || "未知"}(${groupID})\n${options.businessName} 任务执行出错！\n请即时解决以消除警告`), ...img]);
		}
	} catch (masterError) {
		logger.error(`发送错误消息给主人失败: ${masterError}`);
	}
	if (options.customErrorHandler) try {
		await options.customErrorHandler(error, logs$1);
	} catch (customError) {
		logger.error(`自定义错误处理失败: ${customError}`);
	}
};

//#endregion
export { wrapWithErrorHandler };