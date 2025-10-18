import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";
import { CommentText, EnhancedImage } from "./shared-CZQvRjNx.js";

//#region ../template/src/components/platforms/bilibili/dynamic/DYNAMIC_TYPE_AV.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* B站视频动态头部组件
* @param props - 头部组件属性
*/
const BilibiliVideoDynamicHeader = () => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-20" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center pl-20 text-6xl text-default-500" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/bilibili/bilibili.png",
		alt: "bilibili",
		className: "h-auto w-120"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "ml-8 text-5xl select-text" }, "你感兴趣的视频都在哔哩哔哩")), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-20" }));
};
/**
* B站视频动态内容组件
* @param props - 内容组件属性
*/
const BilibiliVideoDynamicContent = (props) => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, props.image_url && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.image_url,
		alt: "封面",
		className: "object-contain w-full h-full rounded-3xl"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex absolute bottom-12 right-16" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/bilibili/play.svg",
		alt: "播放图标",
		className: "w-40 h-40"
	})))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-5" })), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col w-full leading-relaxed px-21" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground" }, /* @__PURE__ */ import_react.default.createElement(CommentText, {
		className: "text-[80px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
		content: props.text,
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-10" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-6xl text-default-500" }, /* @__PURE__ */ import_react.default.createElement(CommentText, {
		className: "text-[60px] leading-[1.5] whitespace-pre-wrap text-default-500 select-text",
		content: props.desc,
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-30" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-15 text-default-600" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-8" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-12 items-center text-5xl font-light tracking-normal" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 48,
		className: "text-like"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, props.dianzan, "点赞")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, {
		size: 48,
		className: "text-comment"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, props.pinglun, "评论")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, {
		size: 48,
		className: "text-success"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, props.share, "分享"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-12 items-center text-5xl font-light tracking-normal" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Coins, {
		size: 48,
		className: "text-warning"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, props.coin, "硬币")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, {
		size: 48,
		className: "text-default-400 text-view"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, props.view, "浏览")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center text-5xl font-light tracking-normal" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, {
		size: 48,
		className: "text-time"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "视频时长: ", props.duration_text)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-4 text-4xl font-light" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center whitespace-nowrap" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, {
		size: 32,
		className: "text-time"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "发布于", props.create_time)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, {
		size: 32,
		className: "text-default-400"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "动态ID: ", props.dynamic_id)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-40" })));
};
/**
* B站视频动态底部信息组件
* @param props - 底部组件属性
*/
const BilibiliVideoDynamicFooter = (props) => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-25" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500" }, "哔哩哔哩", props.dynamicTYPE), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col h-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center h-auto pt-25" }, /* @__PURE__ */ import_react.default.createElement("div", {
		className: "flex flex-col items-center pl-12",
		style: { padding: "0 0 0 50px" }
	}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-8 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.avatar_url,
		alt: "头像",
		className: "rounded-full shadow-medium w-50 h-50",
		isCircular: true
	}), props.frame && /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.frame,
		alt: "头像框",
		className: "absolute inset-0 transform scale-180"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-7xl font-bold select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: props.username } })))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-4 items-start pt-10 w-full text-4xl tracking-wider text-default-600" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, {
		size: 32,
		className: "text-default-400"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "UID: ", props.user_shortid)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 32,
		className: "text-like"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "获赞: ", props.total_favorited)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, {
		size: 32,
		className: "text-default-400 text-view"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "关注: ", props.following_count)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, {
		size: 32,
		className: "text-primary"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "粉丝: ", props.fans)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-5 ml-3 text-5xl text-right select-text text-default-600" }, "动态分享链接"), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-300" }, props.qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
		src: props.qrCodeDataUrl,
		alt: "二维码",
		className: "h-auto w-88"
	}) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center rounded bg-default-100 w-88 h-88" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-default-400" }, "二维码")))))));
};
/**
* B站视频动态组件
* @param props - 视频动态组件属性
*/
const BilibiliVideoDynamic = import_react.memo((props) => {
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement(BilibiliVideoDynamicHeader, null), /* @__PURE__ */ import_react.default.createElement(BilibiliVideoDynamicContent, {
		text: props.data.text,
		desc: props.data.desc,
		image_url: props.data.image_url,
		dianzan: props.data.dianzan,
		pinglun: props.data.pinglun,
		share: props.data.share,
		coin: props.data.coin,
		view: props.data.view,
		duration_text: props.data.duration_text,
		create_time: props.data.create_time,
		dynamic_id: props.data.dynamic_id
	}), /* @__PURE__ */ import_react.default.createElement(BilibiliVideoDynamicFooter, {
		avatar_url: props.data.avatar_url,
		frame: props.data.frame,
		username: props.data.username,
		user_shortid: props.data.user_shortid,
		total_favorited: props.data.total_favorited,
		following_count: props.data.following_count,
		fans: props.data.fans,
		dynamicTYPE: props.data.dynamicTYPE,
		share_url: props.data.share_url,
		qrCodeDataUrl: props.qrCodeDataUrl
	})));
});
BilibiliVideoDynamic.displayName = "BilibiliVideoDynamic";

//#endregion
export { BilibiliVideoDynamic };