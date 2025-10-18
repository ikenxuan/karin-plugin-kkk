import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/types/ohter/handlerError.ts
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 平台配置映射表
*/
const PLATFORM_CONFIG = {
	douyin: {
		displayName: "抖音",
		color: "#fe2c55",
		icon: "🎵"
	},
	bilibili: {
		displayName: "哔哩哔哩",
		color: "#00a1d6",
		icon: "📺"
	},
	kuaishou: {
		displayName: "快手",
		color: "#ff6600",
		icon: "⚡"
	},
	system: {
		displayName: "系统",
		color: "#666666",
		icon: "⚙️"
	},
	unknown: {
		displayName: "未知平台",
		color: "#666666",
		icon: "❓"
	}
};

//#endregion
//#region ../template/src/components/platforms/other/handlerError.tsx
/**
* 解析ANSI颜色代码并转换为HTML，保留换行符和空格格式
* @param text 包含ANSI颜色代码的文本
* @returns 解析后的JSX元素数组
*/
const parseAnsiColors = (text) => {
	const colorMap = {
		"30": "text-foreground",
		"31": "text-danger",
		"32": "text-success",
		"33": "text-warning",
		"34": "text-primary",
		"35": "text-secondary",
		"36": "text-primary-400",
		"37": "text-default-300",
		"90": "text-default-400",
		"91": "text-danger-400",
		"92": "text-success-400",
		"93": "text-warning-400",
		"94": "text-primary-400",
		"95": "text-secondary-400",
		"96": "text-primary-300",
		"97": "text-default-100"
	};
	const ansiRegex = /\u001b\[(\d+)m/g;
	const parts = [];
	let lastIndex = 0;
	let currentColor = "";
	let match;
	while ((match = ansiRegex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			const formattedText = text.slice(lastIndex, match.index).replace(/\\n/g, "\n");
			if (currentColor) parts.push(/* @__PURE__ */ import_react.default.createElement("span", {
				key: `${lastIndex}-${match.index}`,
				className: currentColor
			}, formattedText));
			else parts.push(formattedText);
		}
		const colorCode = match[1];
		if (colorCode === "39" || colorCode === "0") currentColor = "";
		else if (colorMap[colorCode]) currentColor = colorMap[colorCode];
		lastIndex = ansiRegex.lastIndex;
	}
	if (lastIndex < text.length) {
		const formattedText = text.slice(lastIndex).replace(/\\n/g, "\n");
		if (currentColor) parts.push(/* @__PURE__ */ import_react.default.createElement("span", {
			key: `${lastIndex}-end`,
			className: currentColor
		}, formattedText));
		else parts.push(formattedText);
	}
	return parts.length > 0 ? parts : [text.replace(/\\n/g, "\n")];
};
/**
* 错误头部组件
* @param props 组件属性
* @returns JSX元素
*/
const ErrorHeader = ({ platform, method, timestamp }) => {
	const platformConfig = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.unknown;
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full max-w-[1440px] mx-auto px-20 py-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-16 rounded-3xl bg-danger-50" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-12" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.AlertCircle, { className: "mr-6 w-16 h-16 text-danger-600" }), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-6xl font-bold text-danger-600" }, "出错了~"), /* @__PURE__ */ import_react.default.createElement("p", { className: "mt-4 text-3xl text-default-600" }, platformConfig.displayName, " - ", method))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, { className: "mr-4 w-8 h-8 text-default-600" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-2xl text-default-600" }, "发生时间：", new Date(timestamp).toLocaleString("zh-CN")))));
};
/**
* 业务错误详情组件
* @param props 组件属性
* @returns JSX元素
*/
const BusinessErrorDetails = ({ error, logs, triggerCommand }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full max-w-[1440px] mx-auto px-20 py-12" }, /* @__PURE__ */ import_react.default.createElement("h2", { className: "mb-16 text-6xl font-bold text-foreground" }, "错误详情"), triggerCommand && /* @__PURE__ */ import_react.default.createElement("div", { className: "p-12 mb-16 rounded-3xl bg-content1" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "flex items-center mb-8 text-4xl font-semibold text-foreground" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Terminal, { className: "mr-4 w-10 h-10" }), "触发命令"), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-6 rounded-2xl bg-default-100" }, /* @__PURE__ */ import_react.default.createElement("pre", { className: "text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700" }, triggerCommand))), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-12 mb-16 rounded-3xl bg-danger-50" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "flex items-center mb-10 text-4xl font-semibold text-danger-800" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Terminal, { className: "mr-4 w-10 h-10" }), "调用栈信息"), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-10 rounded-2xl bg-content1" }, /* @__PURE__ */ import_react.default.createElement("pre", { className: "text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700" }, String(error.stack || "")))), logs && (typeof logs === "string" ? logs.length > 0 : logs.length > 0) && /* @__PURE__ */ import_react.default.createElement("div", { className: "p-12 rounded-3xl bg-content1" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "flex items-center mb-10 text-4xl font-semibold text-foreground" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.FileText, { className: "mr-4 w-10 h-10" }), "相关日志"), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-10 rounded-2xl bg-content1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-2" }, typeof logs === "string" ? logs.split("\n\n").map((logSection, index) => {
		const parsedLog = parseAnsiColors(logSection);
		return /* @__PURE__ */ import_react.default.createElement("div", {
			key: index,
			className: "mb-6 font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text"
		}, parsedLog.length > 0 ? parsedLog : logSection);
	}) : logs.map((log, index) => {
		const parsedLog = parseAnsiColors(log);
		return /* @__PURE__ */ import_react.default.createElement("div", {
			key: index,
			className: "font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text"
		}, parsedLog.length > 0 ? parsedLog : log);
	})))));
};
/**
* 二维码组件
* @param props 组件属性
* @returns JSX元素
*/
const QRCodeSection = ({ qrCodeDataUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col-reverse items-center -mb-12 mr-18" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, { className: "w-11 h-11" }), /* @__PURE__ */ import_react.default.createElement("span", null, "触发命令")), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "w-[350px] h-[350px] select-text"
	})));
};
/**
* API错误显示组件
* @param props 组件属性
* @returns JSX元素
*/
const handlerError = (props) => {
	const { data, qrCodeDataUrl } = props;
	const { type, platform, error, method, timestamp, logs, triggerCommand } = data;
	const businessError = type === "business_error" ? error : null;
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[60px]" }), /* @__PURE__ */ import_react.default.createElement(ErrorHeader, {
		type,
		platform,
		method,
		timestamp
	}), /* @__PURE__ */ import_react.default.createElement(BusinessErrorDetails, {
		error: businessError,
		logs,
		triggerCommand
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full max-w-[1440px] mx-auto px-20 py-12" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 p-16 mr-8 rounded-3xl bg-primary-50" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "flex items-center mb-10 text-5xl font-semibold text-primary-800" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Send, { className: "mr-6 w-12 h-12" }), "发送错误报告"), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-3xl leading-relaxed text-default-700" }, "请将此错误报告截图发送给开发者，以便快速定位和解决问题。"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-2xl text-default-600" }, "您可以通过以下方式联系开发者：GitHub Issues、QQ群：795874649。"))), qrCodeDataUrl && /* @__PURE__ */ import_react.default.createElement(QRCodeSection, { qrCodeDataUrl }))));
};
handlerError.displayName = "handlerError";

//#endregion
export { handlerError };