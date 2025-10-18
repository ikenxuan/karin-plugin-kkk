import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";
import { CommentText, EnhancedImage } from "./shared-CZQvRjNx.js";

//#region ../template/src/components/platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* B站直播动态头部组件
* @param props - 头部组件属性
*/
const BilibiliLiveDynamicHeader = () => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-5" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-start text-6xl text-default-600" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/bilibili/bilibili-light.png",
		alt: "哔哩哔哩",
		className: "h-auto w-120"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "pt-10 text-6xl select-text" }, "你感兴趣的视频都在B站")), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-5" }));
};
/**
* B站直播动态内容组件
* @param props - 内容组件属性
*/
const BilibiliLiveDynamicContent = (props) => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-15" }), props.image_url && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.image_url,
		alt: "封面",
		className: "object-contain w-full h-full rounded-3xl"
	}))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-10" })), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col w-full leading-relaxed px-15" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-3" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground" }, /* @__PURE__ */ import_react.default.createElement(CommentText, {
		className: "text-[65px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
		content: props.text,
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-10" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center text-5xl tracking-normal text-default-500" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Radio, {
		size: 48,
		className: "text-primary"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, props.liveinf)), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-5" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center text-4xl tracking-normal text-default-500" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, {
		size: 32,
		className: "text-time"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, "直播开始时间: ", props.create_time)), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-25" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-10 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.avatar_url,
		alt: "头像",
		className: "w-32 h-32 rounded-full shadow-medium",
		isCircular: true
	}), props.frame && /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.frame,
		alt: "头像框",
		className: "absolute inset-0 transform scale-160"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-5 items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-4 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-6xl font-bold select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement(CommentText, { content: props.username })), /* @__PURE__ */ import_react.default.createElement("img", {
		className: "w-32 h-auto",
		src: "/image/bilibili/直播中.png",
		alt: "直播中"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center text-4xl text-default-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, {
		size: 32,
		className: "text-follow"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "select-text" }, props.fans, "粉丝")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-50" })));
};
/**
* B站直播动态底部信息组件
* @param props - 底部组件属性
*/
const BilibiliLiveDynamicFooter = (props) => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500" }, "哔哩哔哩", props.dynamicTYPE), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col h-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center h-auto pt-25" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center pl-16" }, /* @__PURE__ */ import_react.default.createElement(BilibiliLiveDynamicHeader, null)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-5 ml-3 text-5xl text-right select-text text-default-500" }, "动态分享链接"), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-300" }, props.qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
		src: props.qrCodeDataUrl,
		alt: "二维码",
		className: "h-auto w-88"
	}) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center rounded bg-default-100 w-88 h-88" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-default-400" }, "二维码")))))));
};
/**
* B站直播动态组件
* @param props - 直播动态组件属性
*/
const BilibiliLiveDynamic = import_react.memo((props) => {
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement(BilibiliLiveDynamicContent, {
		image_url: props.data.image_url,
		text: props.data.text,
		liveinf: props.data.liveinf,
		create_time: props.data.create_time,
		username: props.data.username,
		avatar_url: props.data.avatar_url,
		frame: props.data.frame,
		fans: props.data.fans
	}), /* @__PURE__ */ import_react.default.createElement(BilibiliLiveDynamicFooter, {
		avatar_url: props.data.avatar_url,
		frame: props.data.frame,
		username: props.data.username,
		fans: props.data.fans,
		dynamicTYPE: props.data.dynamicTYPE,
		share_url: props.data.share_url,
		qrCodeDataUrl: props.qrCodeDataUrl
	})));
});
BilibiliLiveDynamic.displayName = "BilibiliLiveDynamic";

//#endregion
export { BilibiliLiveDynamic };