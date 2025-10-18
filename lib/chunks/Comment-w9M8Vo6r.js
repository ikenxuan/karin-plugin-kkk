import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/xiaohongshu/Comment.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 二维码区域组件
* @param props 组件属性
* @returns JSX元素
*/
const QRCodeSection = ({ qrCodeDataUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col justify-center items-center p-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden justify-center items-center bg-white w-110 h-110" }, qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "object-contain"
	}) : /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, {
		size: 200,
		className: "text-foreground-400"
	})), /* @__PURE__ */ import_react.default.createElement("p", { className: "mt-5 text-[40px] text-foreground-500 text-center" }, "扫码查看原笔记"));
};
/**
* 笔记信息头部组件
* @param props 组件属性
* @returns JSX元素
*/
const NoteInfoHeader = ({ type, commentLength, imageLength, qrCodeDataUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col justify-center items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-start items-center" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: "/image/xiaohongshu/logo.png",
		alt: "小红书Logo",
		className: "object-contain mb-20 max-w-full max-h-full scale-180 ml-15",
		onError: (e) => {
			const target = e.target;
			target.style.display = "none";
			const parent = target.parentElement;
			if (parent) parent.innerHTML = "<div class=\"flex justify-start items-center h-full text-2xl font-bold text-foreground-600\">小红书</div>";
		}
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-8 space-y-4 text-left text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "tracking-[6px] text-[45px] select-text" }, "笔记类型：", type), /* @__PURE__ */ import_react.default.createElement("div", { className: "tracking-[6px] text-[45px] select-text" }, "评论数量：", commentLength, "条"), type === "图文" && imageLength && /* @__PURE__ */ import_react.default.createElement("div", { className: "tracking-[6px] text-[45px] select-text" }, "图片数量：", imageLength, "张"))), /* @__PURE__ */ import_react.default.createElement(QRCodeSection, { qrCodeDataUrl }));
};
/**
* 单个评论组件
* @param props 组件属性
* @returns JSX元素
*/
const CommentItemComponent = ({ comment, isLast = false }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: `flex px-10 pt-15 ${isLast ? "pb-0" : "pb-15"}` }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: comment.user_info.image,
		className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
		alt: "用户头像"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center select-text" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-5xl" }, comment.user_info.nickname), comment.show_tags && comment.show_tags.length > 0 && comment.show_tags.map((tag, index) => {
		if (tag === "is_author") return /* @__PURE__ */ import_react.default.createElement("div", {
			key: index,
			className: "inline-block px-6 py-3 ml-3 text-4xl rounded-full bg-default-100 text-default-500"
		}, "作者");
		else if (tag === "user_top") return /* @__PURE__ */ import_react.default.createElement("div", {
			key: index,
			className: "inline-block px-6 py-3 rounded-full ml-3 text-4xl bg-[#ff2e4d0f] text-[#ff2e4d]"
		}, "置顶评论");
		else return null;
	})), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] [&_span]:inline",
		dangerouslySetInnerHTML: { __html: comment.content },
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	}), comment.pictures && comment.pictures.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1" }, /* @__PURE__ */ import_react.default.createElement("img", {
		className: "object-contain w-full h-full rounded-2xl",
		src: comment.pictures[0].url_default,
		alt: "评论图片"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mt-6 text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-6 select-text" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[45px]" }, comment.create_time), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[45px]" }, comment.ip_location), parseInt(comment.sub_comment_count) > 0 ? /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[40px] text-foreground-600" }, "共", comment.sub_comment_count, "条回复") : /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[40px] text-foreground-600" }, "回复")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 60,
		className: comment.liked ? "text-red-500 fill-current" : "text-foreground-500"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[50px] select-text" }, comment.like_count)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center transition-colors cursor-pointer" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, {
		size: 60,
		className: "stroke-current text-foreground-500"
	})))), comment.sub_comments && comment.sub_comments.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "pl-6 mt-6" }, comment.sub_comments.map((subComment, index) => /* @__PURE__ */ import_react.default.createElement("div", {
		key: subComment.id,
		className: `py-4 ${index !== comment.sub_comments.length - 1 ? "border-b border-divider" : ""}`
	}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-start space-x-4" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: subComment.user_info.image,
		className: "object-cover mr-8 w-32 h-32 rounded-full",
		alt: "用户头像"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-2 space-x-2" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[40px] font-medium text-foreground-600" }, subComment.user_info.nickname), subComment.show_tags && subComment.show_tags.length > 0 && subComment.show_tags.map((tag, tagIndex) => tag === "is_author" ? /* @__PURE__ */ import_react.default.createElement("div", {
		key: tagIndex,
		className: "inline-block px-5 py-2 ml-2 text-3xl rounded-full bg-default-100 text-default-500"
	}, "作者") : null)), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-[45px] text-foreground leading-relaxed mb-2 select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
		dangerouslySetInnerHTML: { __html: subComment.content },
		style: {
			wordBreak: "break-word",
			overflowWrap: "break-word"
		}
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center text-foreground-500" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[35px]" }, subComment.create_time), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[35px]" }, subComment.ip_location)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		size: 40,
		className: subComment.liked ? "text-red-500 fill-current" : "text-foreground-500"
	}), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[35px]" }, subComment.like_count))))))))));
};
/**
* 小红书评论组件
* @param props 组件属性
* @returns JSX元素
*/
const XiaohongshuComment = import_react.memo((props) => {
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-30" }), /* @__PURE__ */ import_react.default.createElement(NoteInfoHeader, {
		type: props.data.Type,
		commentLength: props.data.CommentLength,
		imageLength: props.data.ImageLength,
		qrCodeDataUrl: props.qrCodeDataUrl
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-auto mx-20 max-w-full" }, props.data.CommentsData.length > 0 ? /* @__PURE__ */ import_react.default.createElement("div", { className: "divide-y divide-divider" }, props.data.CommentsData.map((comment, index) => /* @__PURE__ */ import_react.default.createElement(CommentItemComponent, {
		key: comment.id,
		comment,
		isLast: index === props.data.CommentsData.length - 1
	}))) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center py-20" }, /* @__PURE__ */ import_react.default.createElement("p", { className: "text-[60px] text-foreground-400" }, "暂无评论"))));
});

//#endregion
export { XiaohongshuComment };