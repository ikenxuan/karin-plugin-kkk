import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";
import { EnhancedImage } from "./shared-CZQvRjNx.js";

//#region ../template/src/components/platforms/bilibili/qrcodeImg.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* B站二维码登录组件
* @param props 组件属性
* @returns JSX元素
*/
const BilibiliQrcodeImg = import_react.memo((props) => {
	const { data, qrCodeDataUrl } = props;
	const { share_url } = data;
	const disclaimer = [
		"免责声明:",
		"您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。",
		"本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。",
		"我方仅提供视频解析及相关哔哩哔哩内容服务,若您的账号封禁、被盗等处罚与我方无关。",
		"害怕风险请勿扫码 ~"
	].join("\n");
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 px-12 pt-24" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-6 items-center text-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-4 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, { className: "w-12 h-12 text-foreground-600" }), /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-6xl font-bold text-foreground" }, "B站扫码登录")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center text-3xl text-default-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, { className: "w-8 h-8" }), /* @__PURE__ */ import_react.default.createElement("span", null, "请在120秒内通过哔哩哔哩APP扫码进行登录"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-12" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex overflow-hidden flex-col justify-center items-center p-12" }, qrCodeDataUrl ? /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center w-120 h-120" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: qrCodeDataUrl,
		alt: "登录二维码",
		className: "object-contain w-full h-full"
	})) : /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-4 justify-center items-center w-120 h-120" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, { className: "w-16 h-16 text-default-500" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-2xl text-default-500" }, "未提供二维码图片")), /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-8 w-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-3xl font-medium text-foreground-600" }, "链接（share_url）"), /* @__PURE__ */ import_react.default.createElement("pre", { className: "overflow-auto p-6 mt-3 text-2xl leading-relaxed whitespace-pre-wrap break-all rounded-2xl select-text bg-content2 text-foreground-700" }, share_url)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-10" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-8 rounded-3xl border-2 shadow-lg bg-warning-50 border-warning-200" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "flex gap-4 items-center mb-6 text-4xl font-semibold text-warning-700" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Shield, { className: "w-10 h-10 text-warning-600" }), "注意事项与免责声明"), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4" }, disclaimer.split("\n").map((line, index) => /* @__PURE__ */ import_react.default.createElement("p", {
		key: index,
		className: `text-2xl leading-relaxed ${index === 0 ? "font-semibold text-warning-700" : "text-foreground-600"}`
	}, line))))));
});
BilibiliQrcodeImg.displayName = "BilibiliQrcodeImg";

//#endregion
export { BilibiliQrcodeImg };