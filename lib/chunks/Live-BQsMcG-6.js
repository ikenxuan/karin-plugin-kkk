import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/douyin/Live.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 直播封面组件
* @param props 组件属性
* @returns JSX元素
*/
const CoverSection = ({ imageUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "py-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[95%] flex-1 relative" }, /* @__PURE__ */ import_react.default.createElement("img", {
		className: "rounded-[25px] object-contain w-full h-full select-text",
		src: imageUrl,
		alt: "封面"
	}))));
};
/**
* 用户信息组件
* @param props 组件属性
* @returns JSX元素
*/
const UserInfoSection = ({ avater_url, username, fans }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-10 items-center pr-20" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: avater_url,
		alt: "头像",
		className: "mr-[15px] rounded-full h-auto w-[130px] select-text"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-row items-center mb-[5px]" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[60px] text-foreground select-text" }, /* @__PURE__ */ import_react.default.createElement("span", null, username)), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-4" }), /* @__PURE__ */ import_react.default.createElement("img", {
		className: "w-[170px] h-auto select-text",
		src: "/image/douyin/抖音-直播中.png",
		alt: "直播中"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { className: "w-8 h-8 text-follow" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-default-500 text-[35px] select-text" }, fans, "粉丝"))));
};
/**
* 二维码组件
* @param props 组件属性
* @returns JSX元素
*/
const QRCodeSection = ({ qrCodeDataUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col-reverse items-center mt-[30px] mr-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 text-[50px] ml-[10px] text-right mr-[10px] text-foreground select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, { className: "w-12 h-12" }), /* @__PURE__ */ import_react.default.createElement("span", null, "直播分享链接")), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-[10px] rounded-[2%] border-[7px] border-dashed border-default-300" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "w-[350px] select-text"
	})));
};
/**
* 抖音直播组件
* @param props 组件属性
* @returns JSX元素
*/
const DouyinLive = (props) => {
	const { qrCodeDataUrl } = props;
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement(CoverSection, { imageUrl: props.data.image_url }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col px-20" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[10px]" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[65px] items-center tracking-[1.5px] relative break-words font-bold text-foreground select-text" }, props.data.text), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[10px]" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[45px] items-center tracking-[1.5px] relative break-words text-default-500 select-text" }, props.data.liveinf), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-6 text-[45px] tracking-[1.5px] relative break-words text-default-500 select-text" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { className: "w-11 h-11 text-view" }), /* @__PURE__ */ import_react.default.createElement("span", null, "观看总人数", props.data.总观看次数)), /* @__PURE__ */ import_react.default.createElement("span", null, "|"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { className: "w-11 h-11 text-follow" }), /* @__PURE__ */ import_react.default.createElement("span", null, "在线观众", props.data.在线观众))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-20" }), /* @__PURE__ */ import_react.default.createElement(UserInfoSection, {
		avater_url: props.data.avater_url,
		username: props.data.username,
		fans: props.data.fans,
		useDarkTheme: props.data.useDarkTheme
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[120px]" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col w-auto h-full" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-inherit text-[70px] text-right mr-5 -mb-[45px] z-[-1] text-foreground select-text" }, "抖音", props.data.dynamicTYPE), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-auto flex justify-between pt-[60px] items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col ml-[45px]" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col justify-start items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: `w-[130%] h-[245px] mb-[52px] bg-cover bg-center bg-fixed ${props.data.useDarkTheme ? "bg-[url(/image/douyin/dylogo-light.svg)]" : "bg-[url(/image/douyin/dylogo-dark.svg)]"}` }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[50px] tracking-[10px] text-foreground select-text" }, "抖音 记录美好生活")))), /* @__PURE__ */ import_react.default.createElement(QRCodeSection, {
		qrCodeDataUrl,
		useDarkTheme: props.data.useDarkTheme
	})))));
};

//#endregion
export { DouyinLive };