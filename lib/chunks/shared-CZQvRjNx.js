import { __toESM, require_react } from "./react-tSI5bnDQ.js";

//#region ../template/src/components/platforms/bilibili/shared.tsx
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 处理评论文本中的图片防盗链问题
* @param htmlContent HTML内容
* @returns 处理后的HTML内容
*/
const processCommentHTML = (htmlContent) => {
	if (!htmlContent || typeof htmlContent !== "string") return "";
	return htmlContent.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">");
};
/**
* 评论文本组件
* @param props 组件属性
* @returns JSX元素
*/
const CommentText = ({ content, className, style }) => {
	const processedContent = processCommentHTML(content);
	return /* @__PURE__ */ import_react.default.createElement("div", {
		className,
		style,
		dangerouslySetInnerHTML: { __html: processedContent }
	});
};
/**
* 增强型图片组件
* 主要功能:
* 1. 图片加载失败时显示占位符
* 2. 支持圆形和方形两种样式
* 3. 自动处理防盗链(添加referrerPolicy和crossOrigin属性)
*/
const EnhancedImage = ({ src, alt, className = "", placeholder, isCircular = false }) => {
	const [hasError, setHasError] = (0, import_react.useState)(false);
	/**
	* 处理图片加载失败
	*/
	const handleError = () => {
		setHasError(true);
	};
	if (!src || hasError) return /* @__PURE__ */ import_react.default.createElement("div", { className: `${className} ${isCircular ? "rounded-full" : "rounded-md"} bg-gray-200 dark:bg-gray-700 flex items-center justify-center` }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-sm text-gray-400" }, placeholder || alt));
	return /* @__PURE__ */ import_react.default.createElement("img", {
		src,
		alt,
		className,
		onError: handleError,
		referrerPolicy: "no-referrer",
		crossOrigin: "anonymous"
	});
};

//#endregion
export { CommentText, EnhancedImage };