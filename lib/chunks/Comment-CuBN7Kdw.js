import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/kuaishou/Comment.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 快手二维码组件
* @param props 组件属性
* @returns JSX元素
*/
const KuaishouQRCodeSection = ({ qrCodeDataUrl, type, imageLength }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center -mr-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-20 flex items-center justify-center w-[600px] h-[600px] bg-content1 rounded-lg shadow-medium" }, qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "object-contain w-full h-full"
	}) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col justify-center items-center text-default-400" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, {
		size: 80,
		className: "mb-4"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-lg" }, "二维码生成失败"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-5 text-[45px] text-center text-foreground" }, type === "视频" ? "视频直链(永久)" : type === "图集" ? `图集分享链接 共${imageLength}张` : "分享链接"));
};
/**
* 快手视频信息头部组件
* @param props 组件属性
* @returns JSX元素
*/
const KuaishouVideoInfoHeader = ({ type, commentLength, videoSize, likeCount, viewCount, imageLength }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-2.5 flex flex-col -ml-11" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-5" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/kuaishou/logo.png",
		alt: "快手Logo",
		className: "w-[650px] h-auto",
		onError: (e) => {
			const target = e.target;
			target.style.display = "none";
			const parent = target.parentElement;
			if (parent) parent.innerHTML = "<div class=\"flex justify-center items-center h-full text-2xl font-bold text-foreground\">快手</div>";
		}
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-2 text-foreground" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left" }, "评论数量：", commentLength, "条"), type === "视频" && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left" }, "视频大小：", videoSize, "MB"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left" }, "点赞数量：", likeCount), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left" }, "观看次数：", viewCount)), type === "图集" && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left" }, "图片数量：", imageLength, "张"))));
};
/**
* 快手单个评论组件
* @param props 组件属性
* @returns JSX元素
*/
const KuaishouCommentItemComponent = ({ comment, isLast = false }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: `flex px-10 pt-10 ${isLast ? "pb-0" : "pb-10"}` }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: comment.userimageurl,
		className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
		alt: "用户头像"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "font-medium" }, comment.nickname)), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] select-text",
		dangerouslySetInnerHTML: { __html: comment.text },
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	}), (comment.commentimage || comment.sticker) && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1" }, /* @__PURE__ */ import_react.default.createElement("img", {
		className: "object-contain w-full h-full rounded-2xl",
		src: comment.commentimage || comment.sticker,
		alt: "评论图片"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mt-6 text-default-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-6" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[45px] select-text" }, comment.create_time), comment.ip_label && /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[45px] select-text" }, comment.ip_label), comment.reply_comment_total && comment.reply_comment_total > 0 ? /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[40px] text-foreground-600" }, "共", comment.reply_comment_total, "条回复") : /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[40px] text-default-600" }, "回复")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer hover:text-danger" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 60,
		className: "stroke-current"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[50px] select-text" }, comment.digg_count)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center transition-colors cursor-pointer hover:text-primary" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, {
		size: 60,
		className: "stroke-current"
	}))))));
};
/**
* 快手评论组件
* @param props 组件属性
* @returns JSX元素
*/
const KuaishouComment = import_react.memo((props) => {
	const processedData = (0, import_react.useMemo)(() => {
		if (!props.data) return {
			commentsArray: [],
			type: "未知",
			commentLength: 0,
			videoSize: void 0,
			likeCount: void 0,
			viewCount: void 0,
			imageLength: void 0,
			useDarkTheme: false
		};
		return {
			commentsArray: Array.isArray(props.data.CommentsData) ? props.data.CommentsData : props.data.CommentsData?.jsonArray || [],
			type: props.data.Type || "未知",
			commentLength: props.data.CommentLength || 0,
			videoSize: props.data.VideoSize,
			likeCount: props.data.likeCount,
			viewCount: props.data.viewCount,
			imageLength: props.data.ImageLength,
			useDarkTheme: props.data.useDarkTheme || false
		};
	}, [props.data]);
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5" }, /* @__PURE__ */ import_react.default.createElement(KuaishouVideoInfoHeader, {
		type: processedData.type,
		commentLength: processedData.commentLength,
		videoSize: processedData.videoSize,
		likeCount: processedData.likeCount,
		viewCount: processedData.viewCount,
		imageLength: processedData.imageLength,
		useDarkTheme: processedData.useDarkTheme
	}), /* @__PURE__ */ import_react.default.createElement(KuaishouQRCodeSection, {
		qrCodeDataUrl: props.qrCodeDataUrl || "",
		type: processedData.type,
		imageLength: processedData.imageLength,
		useDarkTheme: processedData.useDarkTheme
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-auto mx-auto max-w-full" }, processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => /* @__PURE__ */ import_react.default.createElement(KuaishouCommentItemComponent, {
		key: index,
		comment,
		isLast: index === processedData.commentsArray.length - 1
	})) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center py-20 text-default-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, {
		size: 64,
		className: "mx-auto mb-4 text-default-300"
	}), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xl" }, "暂无评论数据"))))));
});

//#endregion
export { KuaishouComment };