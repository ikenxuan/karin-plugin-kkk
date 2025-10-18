import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, clsx_default, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/douyin/Comment.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 二维码组件
* @param props 组件属性
* @returns JSX元素
*/
const QRCodeSection = ({ qrCodeDataUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center -mr-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center mt-20 rounded-lg w-120 h-120 bg-content1 shadow-medium" }, qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "object-contain w-full h-full"
	}) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col justify-center items-center text-foreground-400" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, {
		size: 80,
		className: "mb-4"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-lg" }, "二维码生成失败"))));
};
/**
* 视频信息头部组件
* @param props 组件属性
* @returns JSX元素
*/
const VideoInfoHeader = ({ type, commentLength, videoSize, videoFPS, imageLength, qrCodeDataUrl, useDarkTheme }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-2.5 flex flex-col -ml-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "absolute top-0 left-0 transform translate-x-[9%] translate-y-[17%] w-[650px] h-[300px]" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
		alt: "抖音Logo",
		className: "object-contain pb-10 w-full h-full",
		onError: (e) => {
			const target = e.target;
			target.style.display = "none";
			const parent = target.parentElement;
			if (parent) parent.innerHTML = "<div class=\"flex justify-center items-center h-full text-2xl font-bold text-foreground-600\">抖音</div>";
		}
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-[250px] space-y-2 text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text" }, "作品类型：", type), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text" }, "评论数量：", commentLength, "条"), type === "视频" && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text" }, "视频大小：", videoSize, "MB"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text" }, "视频帧率：", videoFPS, "Hz")), (type === "图集" || type === "合辑") && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text" }, "图片数量：", imageLength, "张"))), /* @__PURE__ */ import_react.default.createElement(QRCodeSection, { qrCodeDataUrl }));
};
/**
* 单个评论组件
* @param props 组件属性
* @returns JSX元素
*/
const CommentItemComponent = ({ comment, isLast = false }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: clsx_default("flex px-10 pt-10", {
		"pb-0": isLast,
		"pb-10": !isLast
	}) }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: comment.userimageurl,
		className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
		alt: "用户头像"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-12.5 text-5xl text-foreground-600 relative flex items-center select-text" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-medium" }, comment.nickname), comment.label_type === 1 && /* @__PURE__ */ import_react.default.createElement("div", { className: "inline-block px-4 py-3 rounded-xl ml-3 text-4xl bg-[#fe2c55] text-white" }, "作者"), comment.status_label && /* @__PURE__ */ import_react.default.createElement("div", { className: "inline-block px-4 py-3 ml-3 text-4xl rounded-xl bg-content3 text-foreground-700" }, comment.status_label)), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-6xl text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
		dangerouslySetInnerHTML: { __html: comment.text },
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	}), (comment.commentimage || comment.sticker) && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1" }, /* @__PURE__ */ import_react.default.createElement("img", {
		className: "object-contain w-full h-full rounded-2xl",
		src: comment.commentimage || comment.sticker,
		alt: "评论图片"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mt-6 text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-6 select-text" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl" }, comment.create_time), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl" }, comment.ip_label), comment.reply_comment_total > 0 ? /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl text-foreground-600" }, "共", comment.reply_comment_total, "条回复") : /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl text-foreground-600" }, "回复")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 60,
		className: "text-foreground-500"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl select-text" }, comment.digg_count)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center transition-colors cursor-pointer" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, {
		size: 60,
		className: "stroke-current text-foreground-500"
	})))), comment.replyComment && Object.keys(comment.replyComment).length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "pl-6 mt-20" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "py-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-start space-x-4" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: comment.replyComment.userimageurl,
		className: "object-cover mr-8 rounded-full w-26 h-26",
		alt: "用户头像"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-2 space-x-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl font-medium text-foreground-600" }, comment.replyComment.nickname), comment.replyComment.label_text !== "" && /* @__PURE__ */ import_react.default.createElement("div", { className: clsx_default("inline-block px-4 py-2 ml-2 text-3xl rounded-xl", comment.replyComment.label_text === "作者" ? "bg-[#fe2c55] text-white" : "bg-default-100 text-default-500") }, comment.replyComment.label_text)), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-6xl text-foreground leading-relaxed mb-2 mt-8  select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
		dangerouslySetInnerHTML: { __html: comment.replyComment.text },
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mt-10 text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl" }, comment.replyComment.create_time), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl" }, comment.replyComment.ip_label)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 60,
		className: "text-foreground-500"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl" }, comment.replyComment.digg_count))))))), comment.replyComment && Object.keys(comment.replyComment).length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "mx-auto mt-4 border-b-1 border-divider" })));
};
/**
* 抖音评论组件
* @param props 组件属性
* @returns JSX元素
*/
const DouyinComment = import_react.memo((props) => {
	const processedData = (0, import_react.useMemo)(() => {
		if (!props.data) return {
			commentsArray: [],
			type: "未知",
			commentLength: 0,
			videoSize: void 0,
			videoFPS: void 0,
			imageLength: void 0,
			useDarkTheme: false
		};
		return {
			commentsArray: props.data.CommentsData?.jsonArray || [],
			type: props.data.Type || "未知",
			commentLength: props.data.CommentLength || 0,
			videoSize: props.data.VideoSize,
			videoFPS: props.data.VideoFPS,
			imageLength: props.data.ImageLength,
			useDarkTheme: props.data.useDarkTheme || false
		};
	}, [props.data]);
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-5" }, /* @__PURE__ */ import_react.default.createElement(VideoInfoHeader, {
		type: processedData.type,
		commentLength: processedData.commentLength,
		videoSize: processedData.videoSize,
		videoFPS: processedData.videoFPS,
		imageLength: processedData.imageLength,
		qrCodeDataUrl: props.qrCodeDataUrl || "",
		useDarkTheme: processedData.useDarkTheme
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-auto mx-auto max-w-full" }, processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => /* @__PURE__ */ import_react.default.createElement(CommentItemComponent, {
		key: index,
		comment,
		isLast: index === processedData.commentsArray.length - 1
	})) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center py-20 text-foreground-400" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, {
		size: 64,
		className: "mx-auto mb-4 text-foreground-300 text-comment"
	}), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xl" }, "暂无评论数据"))))));
});

//#endregion
export { DouyinComment };