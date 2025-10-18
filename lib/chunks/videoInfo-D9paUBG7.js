import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import { button_default } from "./chunk-WBUKVQRU-D_eiKKis.js";
import "./data-id-rnp0ln5R.js";
import "./global-config-CeRFn-Gh.js";
import { chip_default } from "./chunk-IHOGUXIG-CUNEm6kh.js";

//#region ../template/src/components/platforms/douyin/videoInfo.tsx
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
/**
* 统计项组件
* @param props 组件属性
* @returns JSX元素
*/
const StatItem = import_react.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-4 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: iconColor }, icon), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-bold text-foreground-900" }, formatNumber(value)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-foreground-500" }, label)));
StatItem.displayName = "StatItem";
/**
* 抖音视频信息组件
* @param props 组件属性
* @returns JSX元素
*/
const DouyinVideoInfo = import_react.memo((props) => {
	/** 格式化的发布日期 */
	const formattedDate = (0, import_react.useMemo)(() => formatDate(props.data.create_time), [props.data.create_time]);
	/** 统计数据配置 */
	const statsData = (0, import_react.useMemo)(() => [
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, { size: 48 }),
			value: props.data.statistics.digg_count,
			label: "点赞",
			iconColor: "text-like"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, { size: 48 }),
			value: props.data.statistics.comment_count,
			label: "评论",
			iconColor: "text-comment"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Star, { size: 48 }),
			value: props.data.statistics.collect_count,
			label: "收藏",
			iconColor: "text-yellow-500"
		},
		{
			icon: /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, { size: 48 }),
			value: props.data.statistics.share_count,
			label: "分享",
			iconColor: "text-view"
		}
	], [props.data.statistics]);
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden transition-all" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden relative" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: props.data.image_url,
		alt: props.data.desc,
		className: "object-cover w-full h-full"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/30" })), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-20 pb-36" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "mb-8 text-7xl font-bold leading-tight text-foreground-900" }, props.data.desc), /* @__PURE__ */ import_react.default.createElement("p", { className: "mb-6 text-4xl text-foreground-500" }, formattedDate)), /* @__PURE__ */ import_react.default.createElement("div", { className: "px-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 text-5xl gap-18" }, statsData.map((stat, index) => /* @__PURE__ */ import_react.default.createElement(StatItem, {
		key: index,
		icon: stat.icon,
		value: stat.value,
		label: stat.label,
		iconColor: stat.iconColor
	}))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-8 text-5xl text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-16 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.TrendingUp, { size: 48 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-medium" }, formatNumber(props.data.statistics?.recommend_count ?? 0)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-4xl" }, "推荐")), props.data.statistics.play_count > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { size: 48 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "font-medium" }, formatNumber(props.data.statistics.play_count)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-4xl" }, "播放"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "transform-gpu scale-[2.5] origin-right mb-8" }, /* @__PURE__ */ import_react.default.createElement(chip_default, {
		color: "primary",
		variant: "flat",
		size: "lg",
		radius: "sm"
	}, "作品ID：", props.data.aweme_id)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-0.5 bg-default-300" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center px-16 py-12 pb-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-8 items-center" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: props.data.author.avatar,
		alt: props.data.author.name,
		className: "object-cover w-48 h-48 rounded-full"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-6" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-6xl font-semibold text-foreground-900" }, props.data.author.name), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-5xl text-foreground-500" }, "抖音号: ", props.data.author.short_id))), /* @__PURE__ */ import_react.default.createElement("div", { className: "transform-gpu scale-[3.5] origin-right" }, /* @__PURE__ */ import_react.default.createElement(button_default, {
		size: "sm",
		className: "bg-default-800 dark:bg-default-100"
	}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative mr-1" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ExternalLink, {
		className: "absolute w-4 h-4",
		style: {
			transform: "translate(-0.5px, -0.5px)",
			color: "#00e6f6"
		}
	}), /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ExternalLink, {
		className: "absolute w-4 h-4",
		style: {
			transform: "translate(0.5px, 0.5px)",
			color: "#ff013c"
		}
	}), /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ExternalLink, {
		className: "relative w-4 h-4",
		style: { color: "white" }
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement("span", {
		className: "absolute",
		style: {
			transform: "translate(-0.5px, -0.5px)",
			color: "#00e6f6"
		}
	}, "观看"), /* @__PURE__ */ import_react.default.createElement("span", {
		className: "absolute",
		style: {
			transform: "translate(0.5px, 0.5px)",
			color: "#ff013c"
		}
	}, "观看"), /* @__PURE__ */ import_react.default.createElement("span", {
		className: "relative",
		style: { color: "white" }
	}, "观看")))))))));
});
DouyinVideoInfo.displayName = "DouyinVideoInfo";

//#endregion
export { DouyinVideoInfo };