import { __toESM, require_react } from "./react-tSI5bnDQ.js";
import "./react-dom-DjLB5oxT.js";
import { DefaultLayout, clsx_default, require_jsx_runtime, require_lucide_react } from "./DefaultLayout-Di27JJeb.js";
import "./global-config-CeRFn-Gh.js";
import { chip_default, colorVariants, forwardRef, mapPropsVariants, objectToDeps, tv } from "./chunk-IHOGUXIG-CUNEm6kh.js";
import { EnhancedImage } from "./shared-CZQvRjNx.js";

//#region ../../node_modules/.pnpm/@heroui+theme@2.4.23_tailwindcss@4.1.14/node_modules/@heroui/theme/dist/chunk-6N2H53XF.mjs
var code = tv({
	base: [
		"px-2",
		"py-1",
		"h-fit",
		"font-mono",
		"font-normal",
		"inline-block",
		"whitespace-nowrap"
	],
	variants: {
		color: {
			default: colorVariants.flat.default,
			primary: colorVariants.flat.primary,
			secondary: colorVariants.flat.secondary,
			success: colorVariants.flat.success,
			warning: colorVariants.flat.warning,
			danger: colorVariants.flat.danger
		},
		size: {
			sm: "text-small",
			md: "text-medium",
			lg: "text-large"
		},
		radius: {
			none: "rounded-none",
			sm: "rounded-small",
			md: "rounded-medium",
			lg: "rounded-large",
			full: "rounded-full"
		}
	},
	defaultVariants: {
		color: "default",
		size: "sm",
		radius: "sm"
	}
});

//#endregion
//#region ../../node_modules/.pnpm/@heroui+code@2.2.21_@heroui+theme@2.4.23_tailwindcss@4.1.14__react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@heroui/code/dist/chunk-UDFNFZDA.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function useCode(originalProps) {
	const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);
	const { as, children, className,...otherProps } = props;
	const Component = as || "code";
	const styles = (0, import_react.useMemo)(() => code({
		...variantProps,
		className
	}), [objectToDeps(variantProps), className]);
	const getCodeProps = () => {
		return {
			className: styles,
			...otherProps
		};
	};
	return {
		Component,
		children,
		getCodeProps
	};
}

//#endregion
//#region ../../node_modules/.pnpm/@heroui+code@2.2.21_@heroui+theme@2.4.23_tailwindcss@4.1.14__react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@heroui/code/dist/chunk-C3KKIFEX.mjs
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var Code = forwardRef((props, ref) => {
	const { Component, children, getCodeProps } = useCode({ ...props });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
		ref,
		...getCodeProps(),
		children
	});
});
Code.displayName = "HeroUI.Code";
var code_default = Code;

//#endregion
//#region ../template/src/components/platforms/bilibili/bangumi/bangumi.tsx
var import_lucide_react = /* @__PURE__ */ __toESM(require_lucide_react());
/**
* 格式化数字显示
* @param num 要格式化的数字
* @returns 格式化后的字符串
*/
const formatNumber = (num) => {
	if (num >= 1e8) return `${(num / 1e8).toFixed(1)}亿`;
	if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`;
	return num.toString();
};
/**
* 格式化日期部分
* @param timestamp 时间戳
* @returns 包含月份和日期的对象
*/
const formatDateParts = (timestamp) => {
	const date = /* @__PURE__ */ new Date(timestamp * 1e3);
	return {
		month: date.toLocaleDateString("zh-CN", { month: "short" }),
		day: date.getDate().toString().padStart(2, "0")
	};
};
/**
* 格式化完整日期时间
* @param timestamp 时间戳
* @returns 格式化的日期时间字符串
*/
const formatDateTime = (timestamp) => {
	return (/* @__PURE__ */ new Date(timestamp * 1e3)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
};
/**
* B站番剧头部组件
* @param props 头部组件属性
*/
const BangumiBilibiliHeader = (props) => {
	const actorList = props.actors ? props.actors.split(/[,，、\s]+/).filter((actor) => actor.trim()) : [];
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden relative rounded-6xl" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex relative z-10 gap-25 p-25" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col flex-shrink-0 gap-20" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden rounded-4xl w-120 h-160" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		src: props.mainCover,
		alt: props.title,
		className: "object-cover w-full h-full select-text"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-12 items-center mt-15" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		className: "w-28 h-28 rounded-full select-text",
		src: `https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`,
		alt: props.upInfo.uname
	}), props.upInfo.avatar_subscript_url && /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		className: "absolute -right-1 -bottom-1 w-8 h-8 select-text",
		src: props.upInfo.avatar_subscript_url,
		alt: "头像角标"
	}), props.upInfo.pendant?.image && /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
		className: "absolute inset-0 w-full h-full transform select-text scale-160",
		src: props.upInfo.pendant.image,
		alt: props.upInfo.pendant.name || "挂件"
	})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-3 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", {
		className: "text-4xl font-medium select-text",
		style: { color: props.upInfo.vip_status === 1 ? props.upInfo.nickname_color || "#FB7299" : "#EDEDED" }
	}, props.upInfo.uname), props.upInfo.verify_type > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center" }, props.upInfo.verify_type === 1 ? /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Shield, {
		size: 20,
		className: "text-warning"
	}) : /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Crown, {
		size: 20,
		className: "text-primary"
	})), props.upInfo.vip_status === 1 && props.upInfo.vip_label?.text && /* @__PURE__ */ import_react.default.createElement(chip_default, {
		size: "sm",
		className: "px-2 py-1 text-xs select-text",
		style: {
			backgroundColor: props.upInfo.vip_label.bg_color || "#FB7299",
			color: props.upInfo.vip_label.text_color || "#FFFFFF",
			borderColor: props.upInfo.vip_label.border_color || "transparent"
		}
	}, props.upInfo.vip_label.text)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-6 items-center text-3xl select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { size: 30 }), /* @__PURE__ */ import_react.default.createElement("span", null, formatNumber(props.upInfo.follower), "粉丝"), props.upInfo.is_follow === 1 && /* @__PURE__ */ import_react.default.createElement(chip_default, {
		size: "sm",
		color: "primary",
		variant: "flat",
		className: "text-xs select-text"
	}, "已关注")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-2 items-center text-2xl select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, { size: 20 }), /* @__PURE__ */ import_react.default.createElement("span", null, "UID: ", props.upInfo.mid)))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex text-3xl select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement("span", null, "提示：请在120秒内发送"), /* @__PURE__ */ import_react.default.createElement(code_default, {
		size: "lg",
		color: "danger"
	}, " 第 ？ 集 "), /* @__PURE__ */ import_react.default.createElement("span", null, "选择集数"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col flex-1 justify-between text-foreground" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-8 text-8xl font-bold leading-tight select-text" }, props.title), props.subtitle && /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-12 text-4xl select-text text-foreground" }, props.subtitle), props.styles && props.styles.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-wrap gap-8 mb-12" }, props.styles.map((style, index) => /* @__PURE__ */ import_react.default.createElement(chip_default, {
		key: index,
		radius: "sm",
		size: "lg",
		className: "px-4 py-2 text-3xl backdrop-blur-sm select-text text-foreground bg-content2",
		classNames: { base: "w-32 h-12" }
	}, style))), actorList.length > 0 && /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-12" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Users, { size: 30 }), /* @__PURE__ */ import_react.default.createElement("span", null, "声优阵容")), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-wrap gap-8" }, actorList.slice(0, 6).map((actor, index) => /* @__PURE__ */ import_react.default.createElement("div", {
		key: index,
		className: "text-3xl select-text text-foreground"
	}, actor)), actorList.length > 6 && /* @__PURE__ */ import_react.default.createElement("div", { className: "text-3xl select-text text-foreground" }, "等", actorList.length, "人"))), props.evaluate && /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-12" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Star, { size: 30 }), /* @__PURE__ */ import_react.default.createElement("span", null, "评价")), /* @__PURE__ */ import_react.default.createElement("div", { className: "text-3xl leading-relaxed select-text text-foreground" }, props.evaluate))), /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-4 gap-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "items-center min-w-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-baseline" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-4xl font-bold select-text text-foreground" }, formatNumber(props.stat.views).slice(0, -1)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xl font-bold select-text text-foreground" }, formatNumber(props.stat.views).slice(-1))), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-2xl whitespace-nowrap select-text" }, "播放")), /* @__PURE__ */ import_react.default.createElement("div", { className: "items-center min-w-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-baseline" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-4xl font-bold select-text text-foreground" }, formatNumber(props.stat.favorites).slice(0, -1)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xl font-bold select-text text-foreground" }, formatNumber(props.stat.favorites).slice(-1))), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-2xl whitespace-nowrap select-text" }, "收藏")), /* @__PURE__ */ import_react.default.createElement("div", { className: "items-center min-w-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-baseline" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-4xl font-bold select-text text-foreground" }, formatNumber(props.stat.danmakus).slice(0, -1)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xl font-bold select-text text-foreground" }, formatNumber(props.stat.danmakus).slice(-1))), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-2xl whitespace-nowrap select-text" }, "弹幕")), /* @__PURE__ */ import_react.default.createElement("div", { className: "items-center min-w-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-baseline" }, /* @__PURE__ */ import_react.default.createElement("span", { className: "text-4xl font-bold select-text text-foreground" }, formatNumber(props.stat.coins).slice(0, -1)), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-xl font-bold select-text text-foreground" }, formatNumber(props.stat.coins).slice(-1))), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-2xl whitespace-nowrap select-text" }, "投币"))))));
};
/**
* B站番剧剧集列表组件
* @param props 剧集列表组件属性
*/
const BangumiBilibiliEpisodes = (props) => {
	const sortedEpisodes = [...props.episodes].sort((a, b) => b.pub_time - a.pub_time);
	const groupedEpisodes = sortedEpisodes.reduce((groups, episode) => {
		const date = /* @__PURE__ */ new Date(episode.pub_time * 1e3);
		const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
		if (!groups[dateKey]) groups[dateKey] = [];
		groups[dateKey].push(episode);
		return groups;
	}, {});
	const dateKeys = Object.keys(groupedEpisodes).sort((a, b) => b.localeCompare(a));
	const flattenedEpisodes = [];
	dateKeys.forEach((dateIndex) => {
		const episodesInDate = groupedEpisodes[dateIndex];
		episodesInDate.forEach((episode, episodeIndex) => {
			flattenedEpisodes.push({
				episode,
				isFirstOfDate: episodeIndex === 0,
				isLastOfDate: episodeIndex === episodesInDate.length - 1,
				isLastOfAll: false,
				dateKey: dateIndex,
				episodesInSameDate: episodesInDate.length
			});
		});
	});
	if (flattenedEpisodes.length > 0) flattenedEpisodes[flattenedEpisodes.length - 1].isLastOfAll = true;
	return /* @__PURE__ */ import_react.default.createElement("div", { className: "px-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-8 items-center mb-20 text-5xl font-bold select-text text-foreground" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Play, { size: 46 }), /* @__PURE__ */ import_react.default.createElement("span", null, "剧集列表"), /* @__PURE__ */ import_react.default.createElement(chip_default, {
		size: "lg",
		color: "danger",
		variant: "flat",
		className: "px-4 py-2 text-4xl select-text",
		classNames: { base: "h-18" }
	}, "共", sortedEpisodes.length, "集")), /* @__PURE__ */ import_react.default.createElement("div", null, flattenedEpisodes.map((item) => {
		const { episode, isFirstOfDate, isLastOfAll, episodesInSameDate, isLastOfDate } = item;
		const { month, day } = formatDateParts(episode.pub_time);
		const episodeNumber = sortedEpisodes.findIndex((e) => e.bvid === episode.bvid);
		const actualEpisodeNumber = sortedEpisodes.length - episodeNumber;
		return /* @__PURE__ */ import_react.default.createElement("div", {
			key: episode.bvid,
			className: "flex gap-15"
		}, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col flex-shrink-0 items-center w-20" }, isFirstOfDate ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-4xl select-text text-foreground" }, month), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-center items-center text-7xl font-bold select-text text-foreground" }, day), !isLastOfAll && /* @__PURE__ */ import_react.default.createElement("div", { className: clsx_default("mt-8 w-1 bg-divider", episodesInSameDate > 1 ? "h-110" : "h-95") })) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: "w-1 h-10 bg-divider" }), /* @__PURE__ */ import_react.default.createElement("div", { className: "my-2 w-4 h-4 rounded-full bg-divider" }), (!isLastOfAll || episodesInSameDate > 1) && /* @__PURE__ */ import_react.default.createElement("div", { className: clsx_default("w-1 bg-divider", isLastOfDate ? "h-110" : "h-130") }))), /* @__PURE__ */ import_react.default.createElement("div", { className: clsx_default("flex-1 min-w-0", !isLastOfAll && isLastOfDate && "mb-20") }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex justify-between items-center mb-10" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-shrink-0 gap-8 items-center" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
			className: "w-32 h-32 rounded-full select-text",
			src: `https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`,
			alt: ""
		})), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col gap-6" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-4xl font-bold select-text text-foreground-700" }, props.upInfo.uname), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-4 items-center text-3xl select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Calendar, { size: 30 }), /* @__PURE__ */ import_react.default.createElement("span", null, "发布了内容")))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-shrink-0 pr-20" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "text-5xl font-semibold select-text text-foreground-600" }, "第", actualEpisodeNumber, "集"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden shadow-large bg-content1 rounded-4xl" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-12 p-12" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "relative flex-shrink-0" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "overflow-hidden relative h-64 rounded-3xl w-112" }, /* @__PURE__ */ import_react.default.createElement(EnhancedImage, {
			src: episode.cover,
			alt: `第${actualEpisodeNumber}集 ${episode.long_title}`,
			className: "object-cover w-full h-full select-text"
		}), episode.badge && /* @__PURE__ */ import_react.default.createElement(chip_default, {
			radius: "lg",
			size: "lg",
			className: "absolute top-3 right-3 py-1 text-2xl font-medium select-text",
			style: {
				backgroundColor: episode.badge_info?.bg_color || "#FB7299",
				color: "#FFFFFF"
			}
		}, episode.badge_info?.text || episode.badge))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex flex-col flex-1 justify-center h-64" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "mb-8 text-5xl font-semibold select-text text-foreground line-clamp-2" }, episode.long_title), /* @__PURE__ */ import_react.default.createElement("div", { className: "space-y-4 text-4xl" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-6 items-center select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Hash, { size: 36 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "truncate" }, episode.bvid)), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-6 items-center select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Clock, { size: 36 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "whitespace-nowrap" }, formatDateTime(episode.pub_time))), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex gap-6 items-center select-text text-foreground-600" }, /* @__PURE__ */ import_react.default.createElement(import_lucide_react.Share2, { size: 36 }), /* @__PURE__ */ import_react.default.createElement("span", { className: "truncate" }, episode.link))))))));
	})));
};
const BangumiBilibili = import_react.memo((props) => {
	return /* @__PURE__ */ import_react.default.createElement(DefaultLayout, props, /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react.default.createElement(BangumiBilibiliHeader, {
		title: props.data.Title,
		mainCover: props.data.mainCover,
		evaluate: props.data.Evaluate,
		actors: props.data.Actors,
		styles: props.data.Styles,
		subtitle: props.data.subtitle,
		upInfo: props.data.UPInfo,
		stat: props.data.Stat,
		copyright: props.data.Copyright,
		seasonID: props.data.seasonID
	}), /* @__PURE__ */ import_react.default.createElement(BangumiBilibiliEpisodes, {
		episodes: props.data.Episodes,
		upInfo: props.data.UPInfo
	})));
});
BangumiBilibili.displayName = "BangumiBilibili";
var bangumi_default = BangumiBilibili;

//#endregion
export { bangumi_default as default };