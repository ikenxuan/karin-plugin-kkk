import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import { button_default } from "./chunk-WBUKVQRU-D_eiKKis.js";
import "./data-id-rnp0ln5R.js";
import "./global-config-CeRFn-Gh.js";
import { chip_default } from "./chunk-IHOGUXIG-CUNEm6kh.js";
import { EnhancedImage } from "./shared-CZQvRjNx.js";

//#region ../template/src/components/platforms/bilibili/videoInfo.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 格式化数字显示
* @param num 数字
* @returns 格式化后的字符串
*/
const formatNumber = (num) => {
	if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`;
	return num.toLocaleString();
};
/**
* 格式化时间戳为可读日期
* @param timestamp 时间戳
* @returns 格式化后的日期字符串
*/
const formatDate = (timestamp) => {
	return (/* @__PURE__ */ new Date(timestamp * 1e3)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
};
const StatItem = import_react.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-4 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: iconColor }, icon), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold text-foreground-900" }, formatNumber(value)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-foreground-500" }, label)));
StatItem.displayName = "StatItem";
/**
* B站视频信息组件
* @param props 组件属性
* @returns JSX元素
*/
const BilibiliVideoInfo = import_react.memo((props) => {
	const formattedDate = (0, import_react.useMemo)(() => formatDate(props.data.ctime), [props.data.ctime]);
	const statsData = (0, import_react.useMemo)(() => [
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 48 }),
			value: props.data.stat.view,
			label: "播放",
			iconColor: "text-view"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, { size: 48 }),
			value: props.data.stat.like,
			label: "点赞",
			iconColor: "text-like"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, { size: 48 }),
			value: props.data.stat.reply,
			label: "评论",
			iconColor: "text-comment"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Star, { size: 48 }),
			value: props.data.stat.favorite,
			label: "收藏",
			iconColor: "text-yellow-500"
		}
	], [props.data.stat]);
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden transition-all" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden relative aspect-video" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.data.pic,
		alt: props.data.title,
		className: "object-cover w-full h-full",
		placeholder: "视频封面"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/20" })), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-20 pb-36" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "mb-8 text-7xl font-bold leading-tight text-foreground-900" }, props.data.title), /* @__PURE__ */ import_react.default.createElement("p", { className: "mb-8 text-5xl leading-normal whitespace-pre-wrap text-foreground-700" }, props.data.desc), /* @__PURE__ */ import_react.default.createElement("p", { className: "mb-6 text-4xl text-foreground-500" }, formattedDate)), /* @__PURE__ */ import_react.default.createElement("div", { className: "px-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 text-5xl gap-18" }, statsData.map((stat, index) => /* @__PURE__ */ import_react.default.createElement(StatItem, {
		key: index,
		icon: stat.icon,
		value: stat.value,
		label: stat.label,
		iconColor: stat.iconColor
	}))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-8 text-5xl text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-16 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Coins, { size: 48 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-medium" }, props.data.stat.coin)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, { size: 48 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-medium" }, props.data.stat.share))), /* @__PURE__ */ import_react.default.createElement("div", { className: "transform-gpu scale-[2.5] origin-right mb-8" }, /* @__PURE__ */ import_react.default.createElement(chip_default, {
		color: "warning",
		variant: "flat",
		size: "lg",
		radius: "sm"
	}, "稿件BV号：", props.data.bvid)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-0.5 bg-default-300" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center px-16 py-12 pb-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-8 items-center" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.data.owner.face,
		alt: props.data.owner.name,
		className: "object-cover w-48 h-48 rounded-full",
		placeholder: props.data.owner.name.charAt(0),
		isCircular: true
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-6" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-6xl font-semibold text-foreground-900" }, props.data.owner.name), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-5xl text-foreground-500" }, "ID: ", props.data.owner.mid))), /* @__PURE__ */ import_react.default.createElement("div", { className: "transform-gpu scale-[3.5] origin-right" }, /* @__PURE__ */ import_react.default.createElement(button_default, {
		size: "sm",
		className: "bg-[#FF6699] text-default-100 dark:text-default-900"
	}, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ExternalLink, { className: "mr-1 w-4 h-4" }), "观看"))))));
});
BilibiliVideoInfo.displayName = "BilibiliVideoInfo";

//#endregion
export { BilibiliVideoInfo };