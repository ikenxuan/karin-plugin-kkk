import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, clsx_default, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";
import { CommentText, EnhancedImage } from "./shared-CZQvRjNx.js";

//#region ../template/src/components/platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* B站转发动态用户信息组件
*/
const BilibiliForwardUserInfo = (props) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-10 items-center px-0 pb-0 pl-24" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.avatar_url,
		alt: "头像",
		className: "w-36 h-36 rounded-full shadow-medium",
		isCircular: true
	}), props.frame && /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.frame,
		alt: "头像框",
		className: "absolute inset-0 transform scale-180"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-8 text-7xl" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-6xl font-bold select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: props.username } })), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, {
		size: 36,
		className: "text-time"
	}), props.create_time)), props.decoration_card && /* @__PURE__ */ import_react.default.createElement("div", { className: "pl-40" }, /* @__PURE__ */ import_react.default.createElement("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } })));
};
/**
* 原始内容用户信息组件
*/
const OriginalUserInfo = (props) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-10 items-center pt-5 pb-10 pl-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative flex-shrink-0" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.avatar_url,
		alt: "转发用户头像",
		className: "rounded-full shadow-medium w-30 h-30"
	}), props.frame && /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.frame,
		alt: "转发用户头像框",
		className: "absolute inset-0 transform scale-180"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-4 text-7xl" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-5xl font-normal select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: props.username } })), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, {
		size: 32,
		className: "text-time"
	}), props.create_time)), props.decoration_card && /* @__PURE__ */ import_react.default.createElement("div", { className: "ml-39" }, /* @__PURE__ */ import_react.default.createElement("div", {
		className: "font-bilifont",
		dangerouslySetInnerHTML: { __html: props.decoration_card }
	})));
};
/**
* AV类型原始内容组件
*/
const OriginalAVContent = ({ content }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "px-12 py-8 mt-4 w-full rounded-3xl bg-default-200/60" }, /* @__PURE__ */ import_react.default.createElement(OriginalUserInfo, {
		avatar_url: content.avatar_url,
		frame: content.frame,
		username: content.username,
		create_time: content.create_time,
		decoration_card: content.decoration_card
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center py-11" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden relative flex-col items-center w-11/12 rounded-2xl rounded-10 aspect-video shadow-large" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: content.cover,
		alt: "视频封面",
		className: "object-cover object-center absolute"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute right-5 left-12 bottom-14 z-10 text-4xl font-light text-white select-text" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "px-4 py-2 mr-3 text-4xl text-white rounded-2xl bg-black/50" }, content.duration_text), content.play, "观看   ", content.danmaku, "弹幕"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "pb-10 pl-8 text-6xl font-bold select-text leading-20 text-foreground" }, /* @__PURE__ */ import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: content.title } })));
};
/**
* DRAW类型原始内容组件
*/
const OriginalDrawContent = ({ content }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60" }, /* @__PURE__ */ import_react.default.createElement(OriginalUserInfo, {
		avatar_url: content.avatar_url,
		frame: content.frame,
		username: content.username,
		create_time: content.create_time,
		decoration_card: content.decoration_card
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "py-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-5xl leading-relaxed text-foreground" }, /* @__PURE__ */ import_react.default.createElement(CommentText, {
		className: clsx_default("text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text", "[&_svg]:inline [&_svg]:!mb-4"),
		content: content.text,
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	}))), content.image_url && content.image_url.length === 1 ? /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center py-11" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden flex-col items-center w-11/12 rounded-6 shadow-large" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: content.image_url[0].image_src,
		alt: "图片",
		className: "object-cover w-full h-full rounded-6"
	}))) : /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-3 gap-4 p-4" }, content.image_url?.map((img, index) => /* @__PURE__ */ import_react.default.createElement("div", {
		key: index,
		className: "overflow-hidden relative shadow-medium aspect-square rounded-2"
	}, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: img.image_src,
		alt: `图片${index + 1}`,
		className: "object-cover absolute top-0 left-0 w-full h-full"
	})))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-4" }));
};
/**
* WORD类型原始内容组件
*/
const OriginalWordContent = ({ content }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60" }, /* @__PURE__ */ import_react.default.createElement(OriginalUserInfo, {
		avatar_url: content.avatar_url,
		frame: content.frame,
		username: content.username,
		create_time: content.create_time,
		decoration_card: content.decoration_card
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "py-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-5xl leading-relaxed text-foreground" }, /* @__PURE__ */ import_react.default.createElement(CommentText, {
		className: "text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
		content: content.text
	}))));
};
/**
* LIVE_RCMD类型原始内容组件
*/
const OriginalLiveRcmdContent = ({ content }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60" }, /* @__PURE__ */ import_react.default.createElement(OriginalUserInfo, {
		avatar_url: content.avatar_url,
		frame: content.frame,
		username: content.username,
		create_time: content.create_time,
		decoration_card: content.decoration_card
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center py-11" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden relative flex-col items-center w-full rounded-10 aspect-video shadow-large" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: content.cover,
		alt: "直播封面",
		className: "object-cover absolute w-full h-full"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute right-5 bottom-8 left-12 z-10 text-4xl font-light text-white select-text" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "px-4 py-2 mr-3 text-4xl text-white bg-black/50 rounded-3" }, content.area_name), content.text_large, "   在线: ", content.online))), /* @__PURE__ */ import_react.default.createElement("div", { className: "pl-8 text-6xl font-bold select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: content.title } })));
};
/**
* B站转发动态内容组件
*/
const BilibiliForwardContent = (props) => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col px-20 w-full leading-relaxed" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative items-center text-5xl tracking-wider break-words text-foreground" }, /* @__PURE__ */ import_react.default.createElement(CommentText, {
		className: clsx_default("text-[65px] tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground mb-[20px] select-text", "[&_svg]:inline [&_svg]:!mb-4", "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"),
		content: props.text,
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	})), props.imgList && props.imgList.length === 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "h-15" })), props.imgList && props.imgList.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center px-20 w-full" }, props.imgList.map((img, idx) => /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, { key: `${img}-${idx}` }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden relative flex-col items-center rounded-3xl shadow-large" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: img,
		alt: `图片${idx + 1}`,
		className: "object-contain w-full h-full rounded-3xl"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-10" })))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex px-20" }, props.original_content.DYNAMIC_TYPE_AV && /* @__PURE__ */ import_react.default.createElement(OriginalAVContent, { content: props.original_content.DYNAMIC_TYPE_AV }), props.original_content.DYNAMIC_TYPE_DRAW && /* @__PURE__ */ import_react.default.createElement(OriginalDrawContent, { content: props.original_content.DYNAMIC_TYPE_DRAW }), props.original_content.DYNAMIC_TYPE_WORD && /* @__PURE__ */ import_react.default.createElement(OriginalWordContent, { content: props.original_content.DYNAMIC_TYPE_WORD }), props.original_content.DYNAMIC_TYPE_LIVE_RCMD && /* @__PURE__ */ import_react.default.createElement(OriginalLiveRcmdContent, { content: props.original_content.DYNAMIC_TYPE_LIVE_RCMD })));
};
/**
* B站转发动态状态组件
*/
const BilibiliForwardStatus = (props) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-10 px-20 w-full leading-relaxed" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 48,
		className: "text-like"
	}), props.dianzan, "点赞"), /* @__PURE__ */ import_react.default.createElement("span", null, "·"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, {
		size: 48,
		className: "text-primary text-comment"
	}), props.pinglun, "评论"), /* @__PURE__ */ import_react.default.createElement("span", null, "·"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, {
		size: 48,
		className: "text-success"
	}), props.share, "分享")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, {
		size: 48,
		className: "text-time"
	}), "图片生成时间: ", props.render_time), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-3" }));
};
/**
* B站转发动态底部信息组件
*/
const BilibiliForwardFooter = (props) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col h-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center h-auto pt-25" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col self-start pl-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center text-6xl text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/bilibili/bilibili-light.png",
		alt: "B站Logo",
		className: "w-80 h-auto"
	})), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl select-text text-foreground-600" }, "长按识别二维码即可查看全文"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, {
		size: 36,
		className: "text-foreground-600"
	}), /* @__PURE__ */ import_react.default.createElement("span", null, "UID: ", props.user_shortid)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 36,
		className: "text-like"
	}), /* @__PURE__ */ import_react.default.createElement("span", null, "获赞: ", props.total_favorited)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, {
		size: 36,
		className: "text-view"
	}), /* @__PURE__ */ import_react.default.createElement("span", null, "关注: ", props.following_count)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, {
		size: 36,
		className: "text-follow"
	}), /* @__PURE__ */ import_react.default.createElement("span", null, "粉丝: ", props.fans)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-5 ml-3 text-5xl text-right select-text text-foreground-600" }, props.dynamicTYPE), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-3 rounded-sm border-8 border-dashed border-divider" }, props.qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
		src: props.qrCodeDataUrl,
		alt: "二维码",
		className: "h-auto w-88"
	}) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center rounded bg-content2 w-88 h-88" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-foreground-400" }, "二维码"))))));
};
/**
* B站转发动态组件
*/
const BilibiliForwardDynamic = import_react.memo((props) => {
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-15" }), /* @__PURE__ */ import_react.default.createElement(BilibiliForwardUserInfo, {
		avatar_url: props.data.avatar_url,
		frame: props.data.frame,
		username: props.data.username,
		create_time: props.data.create_time,
		decoration_card: props.data.decoration_card
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-15" }), /* @__PURE__ */ import_react.default.createElement(BilibiliForwardContent, props.data), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-25" }), /* @__PURE__ */ import_react.default.createElement(BilibiliForwardStatus, {
		dianzan: props.data.dianzan,
		pinglun: props.data.pinglun,
		share: props.data.share,
		render_time: props.data.render_time
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-23" }), /* @__PURE__ */ import_react.default.createElement(BilibiliForwardFooter, {
		user_shortid: props.data.user_shortid,
		total_favorited: props.data.total_favorited,
		following_count: props.data.following_count,
		fans: props.data.fans,
		dynamicTYPE: props.data.dynamicTYPE,
		share_url: props.data.share_url,
		qrCodeDataUrl: props.qrCodeDataUrl
	})));
});
BilibiliForwardDynamic.displayName = "BilibiliForwardDynamic";

//#endregion
export { BilibiliForwardDynamic };