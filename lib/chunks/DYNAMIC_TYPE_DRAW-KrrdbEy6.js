import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, clsx_default, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";
import { CommentText, EnhancedImage } from "./shared-CZQvRjNx.js";

//#region ../template/src/components/platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* B站动态用户信息组件
*/
const BilibiliDynamicUserInfo = (props) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-10 items-center px-0 pb-0 pl-24" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.avatar_url,
		alt: "头像",
		className: "w-32 h-32 rounded-full shadow-medium",
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
* B站动态内容组件
*/
const BilibiliDynamicContent = (props) => {
	const getLayoutType = () => {
		if (!props.image_url || props.image_url.length === 0) return "auto";
		switch (props.imageLayout) {
			case "vertical": return "vertical";
			case "waterfall": return "waterfall";
			case "grid": return "grid";
			case "auto":
			default:
				if (props.image_url.length <= 4) return "vertical";
				if (props.image_url.length >= 9) return "grid";
				return "waterfall";
		}
	};
	const layoutType = getLayoutType();
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col px-20 w-full leading-relaxed" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative items-center text-5xl tracking-wider break-words text-foreground" }, /* @__PURE__ */ import_react.default.createElement(CommentText, {
		className: clsx_default("text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text", "[&_svg]:inline [&_svg]:!mb-4", "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"),
		content: props.text,
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-15" })), props.image_url && Array.isArray(props.image_url) && props.image_url.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "px-20" }, layoutType === "grid" && /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-3 gap-4 w-full" }, props.image_url.slice(0, 9).map((img, index) => /* @__PURE__ */ import_react.default.createElement("div", {
		key: index,
		className: "overflow-hidden rounded-2xl aspect-square shadow-medium"
	}, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: img.image_src,
		alt: `图片${index + 1}`,
		className: "object-cover w-full h-full"
	})))), layoutType === "waterfall" && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-4 w-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col flex-1 gap-4" }, props.image_url.filter((_, index) => index % 2 === 0).map((img, arrayIndex) => {
		const originalIndex = arrayIndex * 2;
		return /* @__PURE__ */ import_react.default.createElement("div", {
			key: originalIndex,
			className: "overflow-hidden rounded-2xl shadow-medium"
		}, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
			src: img.image_src,
			alt: `图片${originalIndex + 1}`,
			className: "object-cover w-full h-auto"
		}));
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col flex-1 gap-4" }, props.image_url.filter((_, index) => index % 2 === 1).map((img, arrayIndex) => {
		const originalIndex = arrayIndex * 2 + 1;
		return /* @__PURE__ */ import_react.default.createElement("div", {
			key: originalIndex,
			className: "overflow-hidden rounded-2xl shadow-medium"
		}, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
			src: img.image_src,
			alt: `图片${originalIndex + 1}`,
			className: "object-cover w-full h-auto"
		}));
	}))), layoutType === "vertical" && props.image_url.map((img, index) => /* @__PURE__ */ import_react.default.createElement(import_react.Fragment, { key: index }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: img.image_src,
		alt: "封面",
		className: "object-contain w-full h-full rounded-3xl"
	}))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" }))), (layoutType === "waterfall" || layoutType === "grid") && /* @__PURE__ */ import_react.default.createElement("div", { className: "h-18" })));
};
/**
* B站动态状态组件
*/
const BilibiliDynamicStatus = (props) => {
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
* B站动态底部信息组件
*/
const BilibiliDynamicFooter = (props) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col h-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center h-auto pt-25" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col self-start pl-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center text-6xl text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/bilibili/bilibili-light.png",
		alt: "B站Logo",
		className: "h-auto w-120"
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
* B站动态组件
*/
const BilibiliDrawDynamic = import_react.memo((props) => {
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-25" }), /* @__PURE__ */ import_react.default.createElement(BilibiliDynamicUserInfo, {
		avatar_url: props.data.avatar_url,
		frame: props.data.frame,
		username: props.data.username,
		create_time: props.data.create_time,
		decoration_card: props.data.decoration_card
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-15" }), /* @__PURE__ */ import_react.default.createElement(BilibiliDynamicContent, {
		text: props.data.text,
		image_url: props.data.image_url,
		imageLayout: props.data.imageLayout
	}), /* @__PURE__ */ import_react.default.createElement(BilibiliDynamicStatus, {
		dianzan: props.data.dianzan,
		pinglun: props.data.pinglun,
		share: props.data.share,
		render_time: props.data.render_time
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-23" }), /* @__PURE__ */ import_react.default.createElement(BilibiliDynamicFooter, {
		user_shortid: props.data.user_shortid,
		total_favorited: props.data.total_favorited,
		following_count: props.data.following_count,
		fans: props.data.fans,
		dynamicTYPE: props.data.dynamicTYPE,
		share_url: props.data.share_url,
		qrCodeDataUrl: props.qrCodeDataUrl
	})));
});
BilibiliDrawDynamic.displayName = "BilibiliDrawDynamic";

//#endregion
export { BilibiliDrawDynamic };