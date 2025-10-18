import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, GlowIcon, SmartGlowBorder, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/other/Help.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
const ICON_MAP = {
	Link: import_lucide_react.Link,
	Sparkles: import_lucide_react.Sparkles,
	Send: import_lucide_react.Send,
	List: import_lucide_react.List,
	Bell: import_lucide_react.Bell,
	LogIn: import_lucide_react.LogIn,
	Bot: import_lucide_react.Bot,
	RefreshCw: import_lucide_react.RefreshCw
};
function iconForItem(icon) {
	const byIcon = icon && ICON_MAP[icon];
	if (byIcon) return byIcon;
	return import_lucide_react.HelpCircle;
}
const MenuItemComponent = ({ item }) => {
	const Icon = iconForItem(item.icon);
	return /* @__PURE__ */ import_react.default.createElement(SmartGlowBorder, {
		className: "block",
		glowColor: "rgb(245,165, 36)",
		glowStrength: 1,
		borderWidth: 1.5,
		borderRadius: "1.5rem",
		glowPosition: "left-top",
		lightInfluenceRange: .3
	}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-row gap-6 p-8 rounded-3xl backdrop-blur-sm bg-background" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-shrink-0 pt-1" }, /* @__PURE__ */ import_react.default.createElement(GlowIcon, {
		Icon,
		iconProps: {
			className: "w-18 h-18 text-warning",
			strokeWidth: 2
		},
		glowColor: "rgb(245, 158, 11)",
		glowStrength: 1,
		glowRadius: 20,
		glowLayers: 4,
		glowSpread: 20
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ import_react.default.createElement("h3", { className: "mb-4 text-4xl font-bold leading-tight text-foreground" }, item.title), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-2xl leading-relaxed whitespace-pre-line text-muted-foreground" }, item.description))));
};
const MenuGroupComponent = ({ group, startIndex }) => {
	let itemIndex = startIndex;
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "px-10 py-10 rounded-2xl bg-muted/50" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h2", { className: "m-0 mb-8 text-[3rem] font-bold text-foreground" }, group.title), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 gap-6" }, group.items.map((item, idx) => /* @__PURE__ */ import_react.default.createElement(MenuItemComponent, {
		key: idx,
		item,
		index: itemIndex++
	}))), group.subGroups?.map((sub, i) => /* @__PURE__ */ import_react.default.createElement("div", {
		key: i,
		className: "mt-10"
	}, /* @__PURE__ */ import_react.default.createElement("h3", { className: "m-0 mb-6 text-4xl text-foreground/90" }, sub.title), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-2 gap-6" }, sub.items.map((item, idx) => /* @__PURE__ */ import_react.default.createElement(MenuItemComponent, {
		key: idx,
		item,
		index: itemIndex++
	})))))));
};
const Help = import_react.memo((props) => {
	const title = props.data?.title || "KKK插件帮助页面";
	const menuData = props.data?.menu || [];
	let globalIndex = 0;
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-12" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full max-w-[1440px] mx-auto px-8" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "px-12 py-10 rounded-2xl backdrop-blur-sm" }, /* @__PURE__ */ import_react.default.createElement("h1", { className: "mb-2 text-7xl font-bold leading-tight text-foreground" }, title), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-4xl font-medium text-muted-foreground" }, "功能说明与使用指南"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-8" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "px-8 mx-auto space-y-8 w-full" }, menuData.map((group, index) => {
		const startIndex = globalIndex;
		globalIndex += group.items.length + (group.subGroups?.reduce((sum, sub) => sum + sub.items.length, 0) || 0);
		return /* @__PURE__ */ import_react.default.createElement(MenuGroupComponent, {
			key: index,
			group,
			startIndex
		});
	})));
});
Help.displayName = "Help";

//#endregion
export { Help };