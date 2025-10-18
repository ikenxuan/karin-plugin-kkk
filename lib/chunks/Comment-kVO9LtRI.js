import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, clsx_default, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/bilibili/Comment.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
const processCommentHTML = (htmlContent) => {
	return htmlContent.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">");
};
const CommentText = ({ content, className, style }) => {
	const processedContent = processCommentHTML(content);
	return /* @__PURE__ */ import_react.default.createElement("div", {
		className,
		style,
		dangerouslySetInnerHTML: { __html: processedContent }
	});
};
const ImageWithSkeleton = ({ src, alt, className = "", placeholder }) => {
	const [hasError, setHasError] = (0, import_react.useState)(false);
	/**
	* 处理图片加载失败
	*/
	const handleError = () => {
		setHasError(true);
	};
	(0, import_react.useEffect)(() => {
		setHasError(false);
	}, [src]);
	if (hasError) return /* @__PURE__ */ import_react.default.createElement("div", { className: `flex justify-center items-center text-sm select-text ${className} bg-content2 text-foreground-500` }, placeholder || "图片加载失败");
	return /* @__PURE__ */ import_react.default.createElement("img", {
		src,
		alt,
		className: `select-text ${className}`,
		onError: handleError,
		referrerPolicy: "no-referrer",
		crossOrigin: "anonymous"
	});
};
/**
* 二维码组件
* @param props 组件属性
* @returns JSX元素
*/
const QRCodeSection = ({ qrCodeDataUrl }) => {
	const qrCodeRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center -mr-10" }, /* @__PURE__ */ import_react.default.createElement("div", {
		ref: qrCodeRef,
		className: "flex justify-center items-center mt-20 w-120 h-120"
	}, qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "object-contain w-full h-full select-text"
	}) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center w-full h-full text-6xl select-text text-foreground-400" }, "二维码占位符")));
};
const InfoItem = ({ label, value, unit }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[45px] p-2.5 tracking-[6px] text-left break-all text-foreground-600 select-text" }, label, "：", value, unit);
};
/**
* 视频信息头部组件
* @param props 组件属性
* @returns JSX元素
*/
const VideoInfoHeader = ({ type, commentLength, videoSize, clarity }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col mt-2.5 -ml-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-[580px] h-auto mb-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-8xl font-bold text-primary" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/bilibili/bilibili.png",
		alt: "B站Logo",
		className: "select-text"
	}))), /* @__PURE__ */ import_react.default.createElement(InfoItem, {
		label: "作品类型",
		value: type
	}), /* @__PURE__ */ import_react.default.createElement(InfoItem, {
		label: "评论数量",
		value: commentLength,
		unit: "条"
	}), type === "视频" && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, videoSize && /* @__PURE__ */ import_react.default.createElement(InfoItem, {
		label: "视频大小",
		value: videoSize,
		unit: "MB"
	}), clarity && /* @__PURE__ */ import_react.default.createElement(InfoItem, {
		label: "视频画质",
		value: clarity
	})));
};
/**
* 评论项组件
* @param props 组件属性
* @returns JSX元素
*/
const CommentItemComponent = ({ comment, isLast = false }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: clsx_default("flex relative px-10 py-10 max-w-full", { "pb-0": isLast }) }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative mr-[33.75px] flex-shrink-0" }, /* @__PURE__ */ import_react.default.createElement(ImageWithSkeleton, {
		src: comment.avatar || "AVATAR_PLACEHOLDER",
		alt: "用户头像",
		className: "rounded-full w-50 h-50 shadow-large",
		placeholder: "头像",
		isCircular: true
	}), comment.frame && /* @__PURE__ */ import_react.default.createElement(ImageWithSkeleton, {
		src: comment.frame,
		alt: "头像框",
		className: "absolute inset-0 transform scale-180",
		placeholder: "头像框"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-start gap-[10px] mb-[15px] text-[50px]" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text" }, /* @__PURE__ */ import_react.default.createElement("div", {
		className: "[&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-[100px] [&>svg]:h-[100px] [&>svg]:align-middle [&>svg]:flex-shrink-0",
		dangerouslySetInnerHTML: { __html: comment.uname }
	}), comment.level !== void 0 && comment.level >= 0 && comment.level <= 7 && /* @__PURE__ */ import_react.default.createElement("img", {
		src: `/image/bilibili/level/lv${comment.level}.svg`,
		alt: `等级${comment.level}`,
		className: "inline-block flex-shrink-0 w-24 h-24 align-middle"
	}), comment.isUP && /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/bilibili/up_pb.svg",
		alt: "UP主标签",
		className: "inline-block flex-shrink-0 align-middle w-23 h-23"
	})), comment.label_type === 1 && /* @__PURE__ */ import_react.default.createElement("div", { className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-danger text-danger-foreground flex-shrink-0 self-center select-text" }, "作者"), comment.status_label && /* @__PURE__ */ import_react.default.createElement("div", { className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-content2 text-foreground-600 flex-shrink-0 self-center select-text" }, comment.status_label)), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text",
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	}, comment.isTop && /* @__PURE__ */ import_react.default.createElement("span", { className: "inline-flex justify-center items-center relative border-4 border-[#006A9E] rounded-xl text-[#006A9E] text-5xl px-2 py-1 leading-none mr-2 align-baseline" }, "置顶"), /* @__PURE__ */ import_react.default.createElement(CommentText, {
		content: comment.message,
		className: "inline [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]"
	})), (comment.img_src || comment.sticker) && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large" }, /* @__PURE__ */ import_react.default.createElement(ImageWithSkeleton, {
		src: comment.img_src || comment.sticker || "IMAGE_PLACEHOLDER",
		alt: "评论图片",
		className: "rounded-[25px] object-contain w-full h-full",
		placeholder: "评论图片"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-1 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[45px] tracking-[2px] select-text" }, comment.ctime, " · ", comment.location, comment.replylength > 0 ? /* @__PURE__ */ import_react.default.createElement("span", { className: "text-foreground-400 tracking-[3px] ml-4" }, comment.replylength, "回复") : /* @__PURE__ */ import_react.default.createElement("span", { className: "ml-4 text-foreground-600" }, "回复"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-[75px] ml-auto" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-[15px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ThumbsUp, { className: "w-[60px] h-[60px] text-foreground-500" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[45px] text-foreground-500 select-text" }, comment.like)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-[15px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.ThumbsDown, { className: "w-[60px] h-[60px] text-foreground-500" }))))));
};
const BilibiliComment = import_react.memo((props) => {
	const processedData = (0, import_react.useMemo)(() => {
		if (!props.data) return {
			useDarkTheme: false,
			Type: "视频",
			CommentLength: "0",
			VideoSize: void 0,
			Clarity: void 0,
			ImageLength: void 0,
			shareurl: "",
			share_url: "",
			CommentsData: [],
			host_mid: 0
		};
		return {
			useDarkTheme: props.data.useDarkTheme || false,
			Type: props.data.Type || "视频",
			CommentLength: props.data.CommentLength || "0",
			VideoSize: props.data.VideoSize,
			Clarity: props.data.Clarity,
			ImageLength: props.data.ImageLength,
			shareurl: props.data.shareurl || "",
			share_url: props.data.share_url || "",
			CommentsData: props.data.CommentsData || []
		};
	}, [props.data]);
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5" }, /* @__PURE__ */ import_react.default.createElement(VideoInfoHeader, {
		type: processedData.Type,
		commentLength: processedData.CommentLength,
		videoSize: processedData.VideoSize,
		clarity: processedData.Clarity,
		imageLength: processedData.ImageLength
	}), /* @__PURE__ */ import_react.default.createElement(QRCodeSection, {
		shareurl: processedData.shareurl || processedData.share_url,
		qrCodeDataUrl: props.qrCodeDataUrl,
		useDarkTheme: processedData.useDarkTheme
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "mx-0 max-w-full" }, processedData.CommentsData.length > 0 ? processedData.CommentsData.map((comment, index) => /* @__PURE__ */ import_react.default.createElement(CommentItemComponent, {
		key: index,
		comment,
		useDarkTheme: processedData.useDarkTheme,
		isLast: index === processedData.CommentsData.length - 1
	})) : /* @__PURE__ */ import_react.default.createElement("div", { className: "py-10 text-center select-text text-foreground-500" }, "暂无评论数据")));
});

//#endregion
export { BilibiliComment };