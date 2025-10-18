import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/douyin/MusicInfo.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* 抖音Logo头部组件
* @param props 组件属性
* @returns JSX元素
*/
const DouyinHeader = ({ useDarkTheme }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center px-12 py-15" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-[39%] h-[200px] bg-cover bg-center bg-fixed" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
		alt: "抖音Logo",
		className: "object-contain w-full h-full select-text"
	})), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[65px] ml-4 text-foreground select-text" }, "记录美好生活"));
};
/**
* 音乐封面组件
* @param props 组件属性
* @returns JSX元素
*/
const MusicCoverSection = ({ imageUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center my-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative" }, /* @__PURE__ */ import_react.default.createElement("img", {
		className: "rounded-[25px] object-contain w-full h-full select-text",
		src: imageUrl,
		alt: "音乐封面"
	})));
};
/**
* 音乐信息组件
* @param props 组件属性
* @returns JSX元素
*/
const MusicInfoSection = ({ desc, musicId, userCount, createTime }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col px-16 py-5" }, /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
		style: {
			letterSpacing: "1.5px",
			wordWrap: "break-word"
		},
		dangerouslySetInnerHTML: { __html: desc }
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-2 text-[45px] text-default-500 font-light mb-2.5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Music, { className: "w-11 h-11" }), /* @__PURE__ */ import_react.default.createElement("span", null, "音乐ID: ", musicId)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { className: "w-11 h-11 text-follow" }), /* @__PURE__ */ import_react.default.createElement("span", null, userCount, " 人使用过"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 text-[45px] text-default-500 font-light select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, { className: "w-11 h-11 text-time" }), /* @__PURE__ */ import_react.default.createElement("span", null, "图片生成于", createTime)));
};
/**
* 音乐作者信息组件
* @param props 组件属性
* @returns JSX元素
*/
const MusicAuthorInfoSection = ({ avatarUrl, username, userShortId, totalFavorited, followingCount, fans }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col pl-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-6" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: avatarUrl,
		alt: "头像",
		className: "w-[200px] h-[200px] rounded-full mr-7 shadow-large select-text"
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[80px] font-bold text-foreground select-text" }, username))), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground select-text",
		style: { letterSpacing: "2.5px" }
	}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, { className: "w-8 h-8" }), /* @__PURE__ */ import_react.default.createElement("span", null, "ID: ", userShortId)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, { className: "w-8 h-8 text-like" }), /* @__PURE__ */ import_react.default.createElement("span", null, "获赞: ", totalFavorited)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.UserPlus, { className: "w-8 h-8" }), /* @__PURE__ */ import_react.default.createElement("span", null, "关注: ", followingCount)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { className: "w-8 h-8 text-follow" }), /* @__PURE__ */ import_react.default.createElement("span", null, "粉丝: ", fans))));
};
/**
* 音乐二维码组件
* @param props 组件属性
* @returns JSX元素
*/
const MusicQRCodeSection = ({ qrCodeDataUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col-reverse items-center -mb-12 mr-18" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, { className: "w-11 h-11" }), /* @__PURE__ */ import_react.default.createElement("span", null, "文件直链：永久有效")), /* @__PURE__ */ import_react.default.createElement("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "w-[350px] h-[350px] select-text"
	})));
};
/**
* 抖音音乐信息组件
* @param props 组件属性
* @returns JSX元素
*/
const DouyinMusicInfo = (props) => {
	const { data, qrCodeDataUrl } = props;
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(DouyinHeader, { useDarkTheme: data.useDarkTheme }), /* @__PURE__ */ import_react.default.createElement(MusicCoverSection, {
		imageUrl: data.image_url,
		description: data.desc,
		useDarkTheme: data.useDarkTheme
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[90px]" }), /* @__PURE__ */ import_react.default.createElement(MusicInfoSection, {
		desc: data.desc,
		musicId: data.music_id,
		userCount: data.user_count,
		createTime: data.create_time,
		useDarkTheme: data.useDarkTheme
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[100px]" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-500 select-text" }, "抖音音乐信息"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center px-0 pt-25" }, /* @__PURE__ */ import_react.default.createElement(MusicAuthorInfoSection, {
		avatarUrl: data.avater_url,
		username: data.username,
		userShortId: data.user_shortid,
		totalFavorited: data.total_favorited,
		followingCount: data.following_count,
		fans: data.fans,
		useDarkTheme: data.useDarkTheme
	}), /* @__PURE__ */ import_react.default.createElement(MusicQRCodeSection, {
		qrCodeDataUrl,
		useDarkTheme: data.useDarkTheme
	}))));
};

//#endregion
export { DouyinMusicInfo };