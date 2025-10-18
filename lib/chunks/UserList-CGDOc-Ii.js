import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/douyin/UserList.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 抖音用户项组件
* @param props 组件属性
* @returns 抖音用户项JSX元素
*/
const DouyinUserItem = ({ user, index }) => {
	return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("li", {
		className: "flex w-[92%] items-center p-[40px] gap-[40px] rounded-[28px] shadow-large bg-content1 select-text",
		"data-index": index
	}, /* @__PURE__ */ import_react.default.createElement("img", {
		src: user.avatar_img,
		alt: "用户头像",
		className: "w-[140px] h-[140px] rounded-full object-cover select-text"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-grow items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[52px] mb-[14px] font-medium text-foreground select-text inline-flex items-center gap-[12px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.User, {
		className: "w-[36px] h-[36px] opacity-80",
		"aria-hidden": "true"
	}), user.username), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 gap-x-[40px] gap-y-[18px] text-[26px] text-foreground select-text" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "inline-flex items-center gap-[12px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, {
		className: "w-[26px] h-[26px] opacity-70",
		"aria-hidden": "true"
	}), "抖音号: ", user.short_id), /* @__PURE__ */ import_react.default.createElement("span", { className: "inline-flex items-center gap-[12px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, {
		className: "w-[26px] h-[26px] opacity-70",
		"aria-hidden": "true"
	}), "粉丝: ", user.fans), /* @__PURE__ */ import_react.default.createElement("span", { className: "inline-flex items-center gap-[12px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, {
		className: "w-[26px] h-[26px] opacity-70",
		"aria-hidden": "true"
	}), "获赞: ", user.total_favorited), /* @__PURE__ */ import_react.default.createElement("span", { className: "inline-flex items-center gap-[12px]" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.UserPlus, {
		className: "w-[26px] h-[26px] opacity-70",
		"aria-hidden": "true"
	}), "关注: ", user.following_count))))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[36px]" }));
};
/**
* 抖音用户列表组件
* @param props 组件属性，包含用户列表数据和主题设置
* @returns 抖音用户列表JSX元素
*/
const DouyinUserList = (prop) => {
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, prop, /* @__PURE__ */ import_react.default.createElement("ul", {
		className: "flex flex-col-reverse items-center p-0 list-none",
		"aria-label": "抖音用户列表"
	}, prop.data.renderOpt.map((user, index) => /* @__PURE__ */ import_react.default.createElement(DouyinUserItem, {
		key: `${user.short_id}-${index}`,
		user,
		index
	}))));
};
var UserList_default = DouyinUserList;

//#endregion
export { UserList_default as default };