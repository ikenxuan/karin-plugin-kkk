import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";

//#region ../template/src/components/platforms/douyin/Dynamic.tsx
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
		className: "object-contain w-full h-full"
	})), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[65px] ml-4 text-foreground-600" }, "记录美好生活"));
};
/**
* 作品封面组件
* @param props 组件属性
* @returns JSX元素
*/
const CoverSection = ({ imageUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center my-5" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative" }, /* @__PURE__ */ import_react.default.createElement("img", {
		className: "rounded-[25px] object-contain w-full h-full",
		src: imageUrl,
		alt: "封面"
	})));
};
/**
* 作品信息组件
* @param props 组件属性
* @returns JSX元素
*/
const InfoSection = ({ desc, dianzan, pinglun, shouchang, share, createTime }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col px-16 py-5" }, /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
		style: {
			letterSpacing: "1.5px",
			wordWrap: "break-word"
		},
		dangerouslySetInnerHTML: { __html: desc }
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-6 text-[45px] text-foreground-500 font-light mb-2.5 select-text" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, { className: "w-11 h-11 text-like" }), /* @__PURE__ */ import_react.default.createElement("span", null, dianzan, "点赞")), /* @__PURE__ */ import_react.default.createElement("span", null, "·"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.MessageCircle, { className: "w-11 h-11 text-comment" }), /* @__PURE__ */ import_react.default.createElement("span", null, pinglun, "评论")), /* @__PURE__ */ import_react.default.createElement("span", null, "·"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Bookmark, { className: "w-11 h-11" }), /* @__PURE__ */ import_react.default.createElement("span", null, shouchang, "收藏")), /* @__PURE__ */ import_react.default.createElement("span", null, "·"), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, { className: "w-11 h-11 text-success" }), /* @__PURE__ */ import_react.default.createElement("span", null, share, "分享"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2 text-[45px] text-foreground-500 font-light select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, { className: "w-11 h-11 text-time" }), /* @__PURE__ */ import_react.default.createElement("span", null, "发布于", createTime)));
};
/**
* 用户信息组件
* @param props 组件属性
* @returns JSX元素
*/
const UserInfoSection = ({ avater_url, username, douyinId, likes, following, followers, coCreatorCount }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col pl-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center mb-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center mr-7 bg-white rounded-full w-54 h-54" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: avater_url,
		alt: "头像",
		className: "rounded-full w-51 h-51 shadow-large"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col flex-1 min-w-0" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[80px] font-bold text-foreground-700 select-text break-words leading-tight max-w-full" }, "@", username), coCreatorCount && coCreatorCount > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "gap-2 mt-3 inline-flex items-center rounded-[20px] bg-foreground-200 text-foreground-700 px-6 py-3 self-start" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { className: "w-8 h-8" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[34px] leading-none select-text text-foreground-700" }, coCreatorCount, "人共创")))), /* @__PURE__ */ import_react.default.createElement("div", {
		className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground-600 select-text",
		style: { letterSpacing: "2.5px" }
	}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, { className: "w-8 h-8" }), /* @__PURE__ */ import_react.default.createElement("span", null, "抖音号: ", douyinId)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Heart, { className: "w-8 h-8 text-like" }), /* @__PURE__ */ import_react.default.createElement("span", null, "获赞: ", likes)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Eye, { className: "w-8 h-8 text-view" }), /* @__PURE__ */ import_react.default.createElement("span", null, "关注: ", following)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { className: "w-8 h-8 text-follow" }), /* @__PURE__ */ import_react.default.createElement("span", null, "粉丝: ", followers))));
};
/**
* 二维码组件
* @param props 组件属性
* @returns JSX元素
*/
const QRCodeSection = ({ qrCodeDataUrl }) => {
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center w-[420px] mr-18" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-divider" }, /* @__PURE__ */ import_react.default.createElement("img", {
		src: qrCodeDataUrl,
		alt: "二维码",
		className: "w-[350px] h-[350px]"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-3 text-[40px] text-foreground-500 mt-5 select-text" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.QrCode, { className: "w-10 h-10" }), /* @__PURE__ */ import_react.default.createElement("span", { className: "whitespace-nowrap" }, "作品直链：永久有效")));
};
/** 共创者信息 */
const CoCreatorsInfo = ({ info }) => {
	const creators = info?.co_creators ?? [];
	if (creators.length === 0) return null;
	const items = creators.slice(0, 50);
	const listRef = import_react.useRef(null);
	const [visibleCount, setVisibleCount] = import_react.useState(items.length);
	import_react.useEffect(() => {
		const calc = () => {
			const el = listRef.current;
			if (!el) return;
			const containerWidth = el.offsetWidth;
			const capacity = Math.floor((containerWidth - 8) / 184);
			setVisibleCount(items.length > capacity ? Math.max(0, capacity - 1) : items.length);
		};
		calc();
		window.addEventListener("resize", calc);
		return () => window.removeEventListener("resize", calc);
	}, [items.length]);
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col pl-16 w-full" }, /* @__PURE__ */ import_react.default.createElement("div", {
		ref: listRef,
		className: "flex overflow-hidden gap-8 py-1 pr-2 w-full",
		style: { scrollbarWidth: "thin" }
	}, items.slice(0, visibleCount).map((c, idx) => {
		const avatar = c.avatar_thumb?.url_list[0];
		return /* @__PURE__ */ import_react.default.createElement("div", {
			key: `${c.nickname || "creator"}-${idx}`,
			className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0"
		}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center bg-white rounded-full w-38 h-38" }, /* @__PURE__ */ import_react.default.createElement("img", {
			src: avatar,
			alt: "共创者头像",
			className: "object-cover w-36 h-36 rounded-full"
		})), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700" }, c.nickname || "未提供"), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600" }, c.role_title || "未提供"));
	}), items.length > visibleCount && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center rounded-full bg-default-200 w-38 h-38" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-[42px] leading-none text-foreground-500" }, "···")), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700" }, "还有", items.length - visibleCount, "人"), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600" }, "共创"))));
};
/**
* 抖音动态组件
* @param props 组件属性
* @returns JSX元素
*/
const DouyinDynamic = (props) => {
	const { data, qrCodeDataUrl } = props;
	const coCreatorCount = data.cooperation_info?.co_creator_nums ?? data.cooperation_info?.co_creators?.length ?? void 0;
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[60px]" }), /* @__PURE__ */ import_react.default.createElement(DouyinHeader, { useDarkTheme: data.useDarkTheme }), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[60px]" }), /* @__PURE__ */ import_react.default.createElement(CoverSection, { imageUrl: data.image_url }), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[20px]" }), /* @__PURE__ */ import_react.default.createElement(InfoSection, {
		desc: data.desc,
		dianzan: data.dianzan,
		pinglun: data.pinglun,
		shouchang: data.shouchang,
		share: data.share,
		createTime: data.create_time,
		useDarkTheme: data.useDarkTheme
	}), /* @__PURE__ */ import_react.default.createElement("div", { className: "h-[100px]" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-10 px-0 pt-25" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-full" }, /* @__PURE__ */ import_react.default.createElement(CoCreatorsInfo, { info: data.cooperation_info })), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-8 items-start w-[960px]" }, /* @__PURE__ */ import_react.default.createElement(UserInfoSection, {
		avater_url: data.avater_url,
		username: data.username,
		douyinId: data.抖音号,
		likes: data.获赞,
		following: data.关注,
		followers: data.粉丝,
		useDarkTheme: data.useDarkTheme,
		coCreatorCount
	})), /* @__PURE__ */ import_react.default.createElement(QRCodeSection, {
		qrCodeDataUrl,
		useDarkTheme: data.useDarkTheme
	})))));
};

//#endregion
export { DouyinDynamic };