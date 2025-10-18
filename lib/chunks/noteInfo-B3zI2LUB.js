import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import { button_default } from "./chunk-WBUKVQRU-D_eiKKis.js";
import "./data-id-rnp0ln5R.js";
import "./global-config-CeRFn-Gh.js";
import { chip_default } from "./chunk-IHOGUXIG-CUNEm6kh.js";

//#region ../template/src/components/platforms/xiaohongshu/noteInfo.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 格式化数字显示
* @param num 数字
* @returns 格式化后的字符串
*/
const formatNumber = (num) => {
	const numValue = typeof num === "string" ? parseInt(num, 10) : num;
	if (numValue >= 1e4) return `${(numValue / 1e4).toFixed(1)}万`;
	return numValue.toLocaleString();
};
/**
* 格式化时间戳为可读日期
* @param timestamp 时间戳
* @returns 格式化后的日期字符串
*/
const formatDate = (timestamp) => {
	return new Date(timestamp).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
};
/**
* 统计项组件
* @param props 组件属性
* @returns JSX元素
*/
const StatItem = import_react.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-4 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: iconColor }, icon), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold text-foreground-900" }, formatNumber(value)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-foreground-500" }, label)));
StatItem.displayName = "StatItem";
/**
* 小红书笔记信息组件
* @param props 组件属性
* @returns JSX元素
*/
const XiaohongshuNoteInfo = import_react.memo((props) => {
	/** 格式化的发布日期 */
	const formattedDate = (0, import_react.useMemo)(() => formatDate(props.data.time), [props.data.time]);
	/** 统计数据配置 - 小红书特色配色 */
	const statsData = (0, import_react.useMemo)(() => [
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, { size: 48 }),
			value: props.data.statistics.liked_count,
			label: "点赞",
			iconColor: "text-red-500"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, { size: 48 }),
			value: props.data.statistics.comment_count,
			label: "评论",
			iconColor: "text-blue-500"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Star, { size: 48 }),
			value: props.data.statistics.collected_count,
			label: "收藏",
			iconColor: "text-yellow-500"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, { size: 48 }),
			value: props.data.statistics.share_count,
			label: "分享",
			iconColor: "text-green-500"
		}
	], [props.data.statistics]);
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden transition-all" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden relative" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: props.data.image_url,
		alt: props.data.desc,
		className: "object-cover w-full h-full"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/30" })), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-20 pb-36" }, props.data.title && /* @__PURE__ */ import_react.default.createElement("h1", { className: "mb-6 text-7xl font-bold leading-tight text-foreground-900" }, props.data.title), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-5xl text-foreground-700 leading-relaxed mb-8 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
		dangerouslySetInnerHTML: { __html: props.data.desc }
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-8 items-center text-5xl text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Calendar, { size: 32 }), /* @__PURE__ */ import_react.default.createElement("span", null, formattedDate)), props.data.ip_location && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MapPin, { size: 32 }), /* @__PURE__ */ import_react.default.createElement("span", null, props.data.ip_location)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "px-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 text-5xl gap-18" }, statsData.map((stat, index) => /* @__PURE__ */ import_react.default.createElement(StatItem, {
		key: index,
		icon: stat.icon,
		value: stat.value,
		label: stat.label,
		iconColor: stat.iconColor
	}))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-8 text-5xl text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-16 items-center" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "transform-gpu scale-[2.5] origin-right mb-8" }, /* @__PURE__ */ import_react.default.createElement(chip_default, {
		color: "danger",
		variant: "flat",
		size: "lg",
		radius: "sm"
	}, "笔记ID：", props.data.note_id)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-0.5 bg-default-300" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center px-16 py-12 pb-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-8 items-center" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: props.data.author.avatar,
		alt: props.data.author.nickname,
		className: "object-cover w-48 h-48 rounded-full border-red-200 border-3"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-6" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-6xl font-semibold text-foreground-900" }, props.data.author.nickname), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-5xl text-foreground-500" }, "用户ID: ", props.data.author.user_id.slice(0, 8), "..."))), /* @__PURE__ */ import_react.default.createElement("div", { className: "transform-gpu scale-[3.5] origin-right" }, /* @__PURE__ */ import_react.default.createElement(button_default, {
		size: "sm",
		className: "text-white bg-[#FF2442]"
	}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ExternalLink, { className: "mr-1 w-4 h-4" }), /* @__PURE__ */ import_react.default.createElement("span", null, "查看原文"))))))));
});
XiaohongshuNoteInfo.displayName = "XiaohongshuNoteInfo";

//#endregion
export { XiaohongshuNoteInfo };