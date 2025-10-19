import { i as __require, n as __esmMin, o as __toESM, r as __export } from "./rolldown-runtime-B88OHfCz.js";
import { $ as Code, A as Sparkles, At as Chalk, B as MapPin, C as UserPlus, D as ThumbsDown, E as ThumbsUp, F as Radio, G as Heart, H as List, I as QrCode, J as Eye, K as Hash, L as Play, M as Share2, N as Send, O as Terminal, P as RefreshCw, Q as Coins, R as Music, S as User, T as TrendingUp, U as Link, V as LogIn, W as Info, X as Crown, Y as ExternalLink, Z as CornerDownLeft, _ as HeroUIProvider, a as init_remark_breaks, at as Bot, b as Zap, c as rehypeRaw, ct as clsx_default, d as init_react_markdown, dt as require_react, et as Clock, f as Markdown, ft as require_browser, g as button_default, h as chip_default, i as remarkGfm, it as Calendar, j as Shield, k as Star, l as init_rehype_highlight, lt as init_clsx, m as code_default, n as init_chalk, nt as CircleCheckBig, o as remarkBreaks, ot as Bookmark, p as init_dist, q as FileText, r as init_remark_gfm, rt as CircleAlert, s as init_rehype_raw, st as Bell, tt as CircleQuestionMark, u as rehypeHighlight, ut as require_server_node, v as require_jsx_runtime, w as TriangleAlert, x as Users, y as init_lucide_react, z as MessageCircle } from "./vendor-BF_bg3y9.js";
import path from "node:path";
import fs from "node:fs";
var PlatformType, baseComponentConfigs, import_react$24, import_jsx_runtime$23, GlowImage, GlowText, GlowIcon, GlowBorderContainer, SmartGlowBorder, import_jsx_runtime$22, DefaultLayout, import_react$22, import_jsx_runtime$21, QRCodeSection$5, VideoInfoHeader$1, CommentItemComponent$2, DouyinComment, Comment_default$3, import_react$21, import_jsx_runtime$20, DouyinHeader$1, CoverSection$1, InfoSection, UserInfoSection$1, QRCodeSection$4, CoCreatorsInfo, DouyinDynamic, Dynamic_default, import_jsx_runtime$19, CoverSection, UserInfoSection, QRCodeSection$3, DouyinLive, Live_default, import_jsx_runtime$18, DouyinHeader, MusicCoverSection, MusicInfoSection, MusicAuthorInfoSection, MusicQRCodeSection, DouyinMusicInfo, MusicInfo_default, import_jsx_runtime$17, DouyinUserItem, UserList_default$1, import_react$17, import_jsx_runtime$16, formatNumber$3, formatDate$2, StatItem$2, DouyinVideoInfo, videoInfo_default$1, import_react$16, import_jsx_runtime$15, processCommentHTML$1, CommentText$1, ImageWithSkeleton, QRCodeSection$2, InfoItem, VideoInfoHeader, CommentItemComponent$1, BilibiliComment, Comment_default$2, import_react$15, import_jsx_runtime$14, processCommentHTML, CommentText, EnhancedImage, import_jsx_runtime$13, BilibiliUserItem, UserList_default, import_react$13, import_jsx_runtime$12, formatNumber$2, formatDateParts, formatDateTime, BangumiBilibiliHeader, BangumiBilibiliEpisodes, BangumiBilibili, bangumi_default, import_react$12, import_jsx_runtime$11, BilibiliDynamicUserInfo, BilibiliDynamicContent, BilibiliDynamicStatus, BilibiliDynamicFooter, BilibiliDrawDynamic, DYNAMIC_TYPE_DRAW_default, import_react$11, import_jsx_runtime$10, BilibiliVideoDynamicHeader, BilibiliVideoDynamicContent, BilibiliVideoDynamicFooter, BilibiliVideoDynamic, DYNAMIC_TYPE_AV_default, import_react$10, import_jsx_runtime$9, BilibiliForwardUserInfo, OriginalUserInfo, OriginalAVContent, OriginalDrawContent, OriginalWordContent, OriginalLiveRcmdContent, BilibiliForwardContent, BilibiliForwardStatus, BilibiliForwardFooter, BilibiliForwardDynamic, DYNAMIC_TYPE_FORWARD_default, import_react$9, import_jsx_runtime$8, BilibiliLiveDynamicHeader, BilibiliLiveDynamicContent, BilibiliLiveDynamicFooter, BilibiliLiveDynamic, DYNAMIC_TYPE_LIVE_RCMD_default, import_react$8, import_jsx_runtime$7, formatNumber$1, formatDate$1, StatItem$1, BilibiliVideoInfo, videoInfo_default, import_react$7, import_jsx_runtime$6, BilibiliQrcodeImg, qrcodeImg_default, import_react$6, import_jsx_runtime$5, KuaishouQRCodeSection, KuaishouVideoInfoHeader, KuaishouCommentItemComponent, KuaishouComment, Comment_default$1, import_react$5, import_jsx_runtime$4, formatNumber, formatDate, StatItem, XiaohongshuNoteInfo, noteInfo_default, import_react$4, import_jsx_runtime$3, QRCodeSection$1, NoteInfoHeader, CommentItemComponent, XiaohongshuComment, Comment_default, import_react$3, import_jsx_runtime$2, ICON_MAP, MenuItemComponent, MenuGroupComponent, Help, Help_default, init_main$1 = __esmMin(() => {}), init_platforms = __esmMin(() => {
	PlatformType = function(PlatformType$1) {
		return PlatformType$1.DOUYIN = "douyin", PlatformType$1.BILIBILI = "bilibili", PlatformType$1.KUAISHOU = "kuaishou", PlatformType$1.XIAOHONGSHU = "xiaohongshu", PlatformType$1.HELP = "help", PlatformType$1.OTHER = "other", PlatformType$1;
	}({});
}), init_config_base = __esmMin(() => {
	init_platforms(), baseComponentConfigs = [
		{
			type: PlatformType.DOUYIN,
			name: "抖音",
			icon: "🎵",
			color: "danger",
			components: [
				{
					id: "comment",
					name: "评论列表",
					description: "抖音评论列表展示模板",
					enabled: !0,
					componentPath: "platforms/douyin/Comment",
					exportName: "DouyinComment"
				},
				{
					id: "dynamic",
					name: "动态作品",
					description: "抖音动态作品展示模板",
					enabled: !0,
					componentPath: "platforms/douyin/Dynamic",
					exportName: "DouyinDynamic"
				},
				{
					id: "live",
					name: "直播间",
					description: "抖音直播间信息模板",
					enabled: !0,
					componentPath: "platforms/douyin/Live",
					exportName: "DouyinLive"
				},
				{
					id: "musicinfo",
					name: "音乐信息",
					description: "抖音音乐信息展示模板",
					enabled: !0,
					componentPath: "platforms/douyin/MusicInfo",
					exportName: "DouyinMusicInfo"
				},
				{
					id: "user_profile",
					name: "用户主页",
					description: "抖音用户主页信息模板",
					enabled: !1,
					componentPath: "platforms/douyin/UserProfile",
					exportName: "DouyinUserProfile"
				},
				{
					id: "userlist",
					name: "抖音推送列表",
					description: "抖音用户推送列表组件",
					enabled: !0,
					componentPath: "platforms/douyin/UserList",
					exportName: "default"
				},
				{
					id: "videoInfo",
					name: "视频信息",
					description: "抖音视频信息展示模板",
					enabled: !0,
					componentPath: "platforms/douyin/videoInfo",
					exportName: "DouyinVideoInfo"
				}
			]
		},
		{
			type: PlatformType.BILIBILI,
			name: "B站",
			icon: "📺",
			color: "primary",
			components: [
				{
					id: "comment",
					name: "评论列表",
					description: "B站视频稿件评论列表展示模板",
					enabled: !0,
					componentPath: "platforms/bilibili/Comment",
					exportName: "default"
				},
				{
					id: "userlist",
					name: "B站推送列表",
					description: "B站用户推送列表组件",
					enabled: !0,
					componentPath: "platforms/bilibili/UserList",
					exportName: "default"
				},
				{
					id: "bangumi",
					name: "B站番剧列表",
					description: "B站番剧列表组件",
					enabled: !0,
					componentPath: "platforms/bilibili/bangumi/BangumiBilibili",
					exportName: "default"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_DRAW",
					name: "图文动态",
					description: "B站图文动态展示模板",
					enabled: !0,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW",
					exportName: "BilibiliDrawDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_AV",
					name: "视频动态",
					description: "B站视频动态展示模板",
					enabled: !0,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_AV",
					exportName: "BilibiliVideoDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_FORWARD",
					name: "转发动态",
					description: "B站转发动态展示模板",
					enabled: !0,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD",
					exportName: "BilibiliForwardDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_LIVE_RCMD",
					name: "直播动态",
					description: "B站直播动态展示模板",
					enabled: !0,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
					exportName: "BilibiliLiveDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_WORD",
					name: "纯文字动态",
					description: "B站纯文字动态展示模板",
					enabled: !1,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_WORD",
					exportName: "BilibiliWordDynamic"
				},
				{
					id: "videoInfo",
					name: "视频信息",
					description: "B站视频信息展示模板",
					enabled: !0,
					componentPath: "platforms/bilibili/videoInfo",
					exportName: "BilibiliVideoInfo"
				},
				{
					id: "qrcodeImg",
					name: "登录二维码",
					description: "B站登录二维码展示模板",
					enabled: !0,
					componentPath: "platforms/bilibili/qrcodeImg",
					exportName: "BilibiliQrcodeImg"
				}
			]
		},
		{
			type: PlatformType.KUAISHOU,
			name: "快手",
			icon: "⚡",
			color: "warning",
			components: [{
				id: "comment",
				name: "评论列表",
				description: "快手视频评论列表展示模板",
				enabled: !0,
				componentPath: "platforms/kuaishou/Comment",
				exportName: "KuaishouComment"
			}]
		},
		{
			type: PlatformType.XIAOHONGSHU,
			name: "小红书",
			icon: "⚡",
			color: "warning",
			components: [{
				id: "noteInfo",
				name: "笔记信息",
				description: "小红书笔记信息展示模板",
				enabled: !0,
				componentPath: "platforms/xiaohongshu/noteInfo",
				exportName: "XiaohongshuNoteInfo"
			}, {
				id: "comment",
				name: "评论列表",
				description: "小红书评论列表展示模板",
				enabled: !0,
				componentPath: "platforms/xiaohongshu/comment",
				exportName: "XiaohongshuComment"
			}]
		},
		{
			type: PlatformType.OTHER,
			name: "其他",
			icon: "❓",
			color: "secondary",
			components: [
				{
					id: "help",
					name: "帮助页面",
					description: "KKK插件帮助页面",
					enabled: !0,
					componentPath: "platforms/help/Help",
					exportName: "Help"
				},
				{
					id: "handlerError",
					name: "错误页面",
					description: "KKK插件错误页面",
					enabled: !0,
					componentPath: "platforms/other/handlerError",
					exportName: "handlerError"
				},
				{
					id: "changelog",
					name: "更新日志",
					description: "KKK插件更新日志",
					enabled: !0,
					componentPath: "platforms/other/changelog",
					exportName: "changelog"
				}
			]
		}
	];
}), init_GlowImage = __esmMin(() => {
	import_react$24 = __toESM(require_react()), import_jsx_runtime$23 = __toESM(require_jsx_runtime()), GlowImage = ({ src, alt, className, imgClassName, mode = "blur-layer", blurRadius = 18, glowStrength = .6, scale = 1.06, shadowRadius = 28, crossOrigin }) => {
		const [shadowColor, setShadowColor] = import_react$24.useState("rgba(255,255,255,0.5)");
		return import_react$24.useEffect(() => {
			if ("dominant-shadow" !== mode) return;
			const img = new Image();
			crossOrigin && (img.crossOrigin = crossOrigin), img.src = src, img.onload = () => {
				try {
					const size = 16, canvas = document.createElement("canvas");
					canvas.width = size, canvas.height = size;
					const ctx = canvas.getContext("2d");
					if (!ctx) return;
					ctx.drawImage(img, 0, 0, size, size);
					const data = ctx.getImageData(0, 0, size, size).data;
					let r = 0, g = 0, b = 0, count = 0;
					for (let i = 0; i < data.length; i += 4) data[i + 3] < 10 || (r += data[i], g += data[i + 1], b += data[i + 2], count++);
					count > 0 && (r = Math.round(r / count), g = Math.round(g / count), b = Math.round(b / count), setShadowColor(`rgba(${r}, ${g}, ${b}, ${Math.min(glowStrength, .85)})`));
				} catch {}
			};
		}, [
			mode,
			src,
			glowStrength,
			crossOrigin
		]), "dominant-shadow" === mode ? (0, import_jsx_runtime$23.jsx)("img", {
			src,
			alt,
			className: imgClassName,
			style: { filter: `drop-shadow(0 0 ${shadowRadius}px ${shadowColor}) drop-shadow(0 0 ${Math.round(.6 * shadowRadius)}px ${shadowColor})` }
		}) : (0, import_jsx_runtime$23.jsxs)("div", {
			className,
			style: {
				position: "relative",
				display: "inline-block"
			},
			children: [(0, import_jsx_runtime$23.jsx)("img", {
				src,
				alt,
				"aria-hidden": "true",
				style: {
					position: "absolute",
					inset: 0,
					transform: `scale(${scale})`,
					filter: `blur(${blurRadius}px) saturate(1.2)`,
					opacity: glowStrength,
					pointerEvents: "none"
				}
			}), (0, import_jsx_runtime$23.jsx)("img", {
				src,
				alt,
				className: imgClassName
			})]
		});
	}, GlowText = ({ children, className, glowClassName, blurRadius = 12, glowStrength = .6, scale = 1.02 }) => (0, import_jsx_runtime$23.jsxs)("span", {
		className,
		style: {
			position: "relative",
			display: "inline-block"
		},
		children: [(0, import_jsx_runtime$23.jsx)("span", {
			"aria-hidden": "true",
			className: glowClassName,
			style: {
				position: "absolute",
				inset: 0,
				transform: `scale(${scale})`,
				filter: `blur(${blurRadius}px) saturate(1.1)`,
				opacity: glowStrength,
				pointerEvents: "none"
			},
			children
		}), (0, import_jsx_runtime$23.jsx)("span", { children })]
	}), GlowIcon = ({ Icon, iconProps = {}, className, glowColor, glowStrength = .8, glowRadius = 12, glowLayers = 3, glowSpread = 4 }) => {
		const dropShadow = import_react$24.useMemo(() => Array.from({ length: glowLayers }, (_, i) => {
			const radius = glowRadius + i * glowSpread, opacity = Math.min(glowStrength * (1 - .2 * i), 1);
			return `drop-shadow(0 0 ${radius}px ${glowColor ? glowColor.replace(/rgb\(([^)]+)\)/, `rgba($1, ${opacity})`) : `rgba(255, 255, 255, ${opacity})`})`;
		}).join(" "), [
			glowColor,
			glowStrength,
			glowRadius,
			glowLayers,
			glowSpread
		]);
		return (0, import_jsx_runtime$23.jsx)("div", {
			className,
			style: { display: "inline-block" },
			children: (0, import_jsx_runtime$23.jsx)(Icon, {
				...iconProps,
				style: {
					filter: dropShadow,
					...iconProps.style
				}
			})
		});
	}, GlowBorderContainer = ({ children, className, glowColor = "rgb(245, 158, 11)", glowStrength = .6, borderWidth = 1, borderRadius, glowPosition = "left-top", lightInfluenceRange = .3 }) => (0, import_jsx_runtime$23.jsx)("div", {
		className,
		style: {
			position: "relative",
			background: ((position) => {
				const glowRgbMatch = glowColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/), glowRgb = glowRgbMatch ? `${glowRgbMatch[1]}, ${glowRgbMatch[2]}, ${glowRgbMatch[3]}` : "245, 158, 11", maxGlow = `rgba(${glowRgb}, ${glowStrength})`, strongGlow = `rgba(${glowRgb}, ${.7 * glowStrength})`, mediumGlow = `rgba(${glowRgb}, ${.4 * glowStrength})`, weakGlow = `rgba(${glowRgb}, ${.15 * glowStrength})`, maxInfluence = Math.round(100 * lightInfluenceRange);
				switch (position) {
					case "left-top": return `\n          radial-gradient(circle 220px at 5% 15%, \n            ${maxGlow} 0%, \n            ${strongGlow} 20%, \n            ${mediumGlow} 40%, \n            ${weakGlow} 65%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "left": return `\n          radial-gradient(circle 150px at 10% 50%, \n            ${maxGlow} 0%, \n            ${strongGlow} 25%, \n            ${mediumGlow} 45%, \n            ${weakGlow} 70%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "right": return `\n          radial-gradient(circle 150px at 90% 50%, \n            ${maxGlow} 0%, \n            ${strongGlow} 25%, \n            ${mediumGlow} 45%, \n            ${weakGlow} 70%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "top": return `\n          radial-gradient(circle 150px at 50% 10%, \n            ${maxGlow} 0%, \n            ${strongGlow} 25%, \n            ${mediumGlow} 45%, \n            ${weakGlow} 70%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "bottom": return `\n          radial-gradient(circle 150px at 50% 90%, \n            ${maxGlow} 0%, \n            ${strongGlow} 25%, \n            ${mediumGlow} 45%, \n            ${weakGlow} 70%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "right-top": return `\n          radial-gradient(circle 150px at 92% 15%, \n            ${maxGlow} 0%, \n            ${strongGlow} 20%, \n            ${mediumGlow} 40%, \n            ${weakGlow} 65%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "left-bottom": return `\n          radial-gradient(circle 150px at 8% 85%, \n            ${maxGlow} 0%, \n            ${strongGlow} 20%, \n            ${mediumGlow} 40%, \n            ${weakGlow} 65%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "right-bottom": return `\n          radial-gradient(circle 150px at 92% 85%, \n            ${maxGlow} 0%, \n            ${strongGlow} 20%, \n            ${mediumGlow} 40%, \n            ${weakGlow} 65%, \n            transparent ${maxInfluence}%\n          )\n        `;
					case "center": return `\n          radial-gradient(circle at center, \n            ${maxGlow} 0%, \n            ${strongGlow} 30%, \n            ${mediumGlow} 55%, \n            ${weakGlow} 80%, \n            transparent ${maxInfluence}%\n          )\n        `;
					default: return "transparent";
				}
			})(glowPosition),
			padding: `${borderWidth}px`,
			borderRadius
		},
		children: (0, import_jsx_runtime$23.jsx)("div", {
			style: {
				borderRadius: borderRadius ? `calc(${borderRadius} - ${borderWidth}px)` : void 0,
				overflow: "hidden",
				background: "var(--background)",
				width: "100%",
				height: "100%"
			},
			children
		})
	}), SmartGlowBorder = ({ children, className, glowColor, glowStrength = .5, borderWidth = 1, borderRadius = "1.5rem", glowPosition = "left-top", lightInfluenceRange = .3, enableDynamicGlow = !0 }) => {
		const containerRef = import_react$24.useRef(null), [detectedGlowColor, setDetectedGlowColor] = import_react$24.useState("rgb(245, 158, 11)");
		return import_react$24.useEffect(() => {
			if (!enableDynamicGlow || glowColor) return;
			const container = containerRef.current;
			container && container.querySelectorAll("[style*=\"drop-shadow\"], [style*=\"filter\"]").length > 0 && setDetectedGlowColor("rgb(245, 158, 11)");
		}, [
			enableDynamicGlow,
			glowColor,
			children
		]), (0, import_jsx_runtime$23.jsx)("div", {
			ref: containerRef,
			children: (0, import_jsx_runtime$23.jsx)(GlowBorderContainer, {
				className,
				glowColor: glowColor || detectedGlowColor,
				glowStrength,
				borderWidth,
				borderRadius,
				glowPosition,
				lightInfluenceRange,
				children
			})
		});
	};
}), init_DefaultLayout = __esmMin(() => {
	init_dist(), init_clsx(), init_lucide_react(), __toESM(require_react()), init_GlowImage(), import_jsx_runtime$22 = __toESM(require_jsx_runtime()), DefaultLayout = ({ children, version, data, scale = 3, className = "", style = {} }) => {
		const { useDarkTheme } = data;
		return (0, import_jsx_runtime$22.jsx)(HeroUIProvider, { children: (0, import_jsx_runtime$22.jsxs)("div", {
			className: clsx_default("w-[1440px]", "bg-default-50 text-default-900", className, useDarkTheme),
			id: "container",
			style: {
				transform: `scale(${scale})`,
				transformOrigin: "top left",
				width: "1440px",
				...style
			},
			children: [children, version ? (0, import_jsx_runtime$22.jsx)("div", {
				className: "pt-32 pb-20 text-default-800",
				children: (0, import_jsx_runtime$22.jsxs)("div", {
					className: "flex relative justify-center items-center space-x-8",
					children: [
						(0, import_jsx_runtime$22.jsxs)("div", {
							className: "flex items-end space-x-8",
							children: [(0, import_jsx_runtime$22.jsx)(GlowImage, {
								src: "/image/logo.png",
								alt: "logo",
								imgClassName: "w-auto h-18",
								glowStrength: 1,
								blurRadius: 50
							}), (0, import_jsx_runtime$22.jsxs)("div", {
								className: "flex flex-col items-start",
								children: [(0, import_jsx_runtime$22.jsx)("div", {
									className: "flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900",
									children: (0, import_jsx_runtime$22.jsx)("span", {
										className: "opacity-50 text-warning",
										children: "karin-plugin"
									})
								}), (0, import_jsx_runtime$22.jsx)("span", {
									className: "text-5xl font-black text-warning",
									children: version.pluginName
								})]
							})]
						}),
						(0, import_jsx_runtime$22.jsxs)("div", {
							className: "flex flex-col items-start opacity-80",
							children: [(0, import_jsx_runtime$22.jsxs)("div", {
								className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
								children: ["Stable" === version.releaseType ? (0, import_jsx_runtime$22.jsx)(CircleCheckBig, {
									strokeWidth: 3,
									className: "w-4 h-4"
								}) : "Preview" === version.releaseType ? (0, import_jsx_runtime$22.jsx)(TriangleAlert, {
									strokeWidth: 3,
									className: "w-4 h-4"
								}) : (0, import_jsx_runtime$22.jsx)(Info, {
									strokeWidth: 3,
									className: "w-4 h-4"
								}), (0, import_jsx_runtime$22.jsx)("span", { children: version.releaseType })]
							}), (0, import_jsx_runtime$22.jsxs)("div", {
								className: "text-5xl font-bold tracking-wide",
								children: ["v", version.pluginVersion]
							})]
						}),
						(0, import_jsx_runtime$22.jsx)("div", { className: "w-1 h-14 opacity-80 bg-default-900" }),
						(0, import_jsx_runtime$22.jsxs)("div", {
							className: "flex items-end space-x-8",
							children: [(0, import_jsx_runtime$22.jsx)("img", {
								src: "/image/frame-logo.png",
								className: "self-center w-auto h-18"
							}), (0, import_jsx_runtime$22.jsxs)("div", {
								className: "flex flex-col items-start",
								children: [(0, import_jsx_runtime$22.jsxs)("div", {
									className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
									children: [(0, import_jsx_runtime$22.jsx)(Zap, {
										strokeWidth: 3,
										className: "w-4 h-4 opacity-50 text-warning"
									}), (0, import_jsx_runtime$22.jsx)("span", {
										className: "opacity-50 text-warning",
										children: "Powered By"
									})]
								}), (0, import_jsx_runtime$22.jsx)("span", {
									className: "text-5xl font-black text-warning",
									children: version.poweredBy
								})]
							})]
						}),
						(0, import_jsx_runtime$22.jsx)("div", { className: "w-1 h-14 opacity-80 bg-default-900" }),
						(0, import_jsx_runtime$22.jsxs)("div", {
							className: "flex items-end space-x-8",
							children: [(0, import_jsx_runtime$22.jsx)("img", {
								src: "/image/vite.svg",
								className: "self-center w-auto h-16"
							}), (0, import_jsx_runtime$22.jsxs)("div", {
								className: "flex flex-col items-start opacity-80",
								children: [(0, import_jsx_runtime$22.jsxs)("div", {
									className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
									children: [(0, import_jsx_runtime$22.jsx)(Code, {
										strokeWidth: 3,
										className: "w-4 h-4"
									}), (0, import_jsx_runtime$22.jsx)("span", { children: "Built with" })]
								}), (0, import_jsx_runtime$22.jsx)("span", {
									className: "text-5xl font-black",
									children: "Vite"
								})]
							})]
						})
					]
				})
			}) : (0, import_jsx_runtime$22.jsx)("div", { className: "h-24" })]
		}) });
	};
}), Comment_exports$3 = __export({
	DouyinComment: () => DouyinComment,
	default: () => Comment_default$3
}), init_Comment$3 = __esmMin(() => {
	init_clsx(), init_lucide_react(), import_react$22 = __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$21 = __toESM(require_jsx_runtime()), QRCodeSection$5 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$21.jsx)("div", {
		className: "flex flex-col items-center -mr-10",
		children: (0, import_jsx_runtime$21.jsx)("div", {
			className: "flex justify-center items-center mt-20 rounded-lg w-120 h-120 bg-content1 shadow-medium",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$21.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full"
			}) : (0, import_jsx_runtime$21.jsxs)("div", {
				className: "flex flex-col justify-center items-center text-foreground-400",
				children: [(0, import_jsx_runtime$21.jsx)(QrCode, {
					size: 80,
					className: "mb-4"
				}), (0, import_jsx_runtime$21.jsx)("span", {
					className: "text-lg",
					children: "二维码生成失败"
				})]
			})
		})
	}), VideoInfoHeader$1 = ({ type, commentLength, videoSize, videoFPS, imageLength, qrCodeDataUrl, useDarkTheme }) => (0, import_jsx_runtime$21.jsxs)("div", {
		className: "flex justify-between items-center max-w-[1200px] mx-auto p-5",
		children: [(0, import_jsx_runtime$21.jsxs)("div", {
			className: "mt-2.5 flex flex-col -ml-10",
			children: [(0, import_jsx_runtime$21.jsx)("div", {
				className: "absolute top-0 left-0 transform translate-x-[9%] translate-y-[17%] w-[650px] h-[300px]",
				children: (0, import_jsx_runtime$21.jsx)("img", {
					src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
					alt: "抖音Logo",
					className: "object-contain pb-10 w-full h-full",
					onError: (e) => {
						const target = e.target;
						target.style.display = "none";
						const parent = target.parentElement;
						parent && (parent.innerHTML = "<div class=\"flex justify-center items-center h-full text-2xl font-bold text-foreground-600\">抖音</div>");
					}
				})
			}), (0, import_jsx_runtime$21.jsxs)("div", {
				className: "mt-[250px] space-y-2 text-foreground-500",
				children: [
					(0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: ["作品类型：", type]
					}),
					(0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"评论数量：",
							commentLength,
							"条"
						]
					}),
					"视频" === type && (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [(0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"视频大小：",
							videoSize,
							"MB"
						]
					}), (0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"视频帧率：",
							videoFPS,
							"Hz"
						]
					})] }),
					("图集" === type || "合辑" === type) && (0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"图片数量：",
							imageLength,
							"张"
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$21.jsx)(QRCodeSection$5, { qrCodeDataUrl })]
	}), CommentItemComponent$2 = ({ comment, isLast = !1 }) => (0, import_jsx_runtime$21.jsxs)("div", {
		className: clsx_default("flex px-10 pt-10", {
			"pb-0": isLast,
			"pb-10": !isLast
		}),
		children: [(0, import_jsx_runtime$21.jsx)("img", {
			src: comment.userimageurl,
			className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
			alt: "用户头像"
		}), (0, import_jsx_runtime$21.jsxs)("div", {
			className: "flex-1",
			children: [
				(0, import_jsx_runtime$21.jsxs)("div", {
					className: "mb-12.5 text-5xl text-foreground-600 relative flex items-center select-text",
					children: [
						(0, import_jsx_runtime$21.jsx)("span", {
							className: "font-medium",
							children: comment.nickname
						}),
						1 === comment.label_type && (0, import_jsx_runtime$21.jsx)("div", {
							className: "inline-block px-4 py-3 rounded-xl ml-3 text-4xl bg-[#fe2c55] text-white",
							children: "作者"
						}),
						comment.status_label && (0, import_jsx_runtime$21.jsx)("div", {
							className: "inline-block px-4 py-3 ml-3 text-4xl rounded-xl bg-content3 text-foreground-700",
							children: comment.status_label
						})
					]
				}),
				(0, import_jsx_runtime$21.jsx)("div", {
					className: "text-6xl text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
					dangerouslySetInnerHTML: { __html: comment.text },
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				}),
				(comment.commentimage || comment.sticker) && (0, import_jsx_runtime$21.jsx)("div", {
					className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1",
					children: (0, import_jsx_runtime$21.jsx)("img", {
						className: "object-contain w-full h-full rounded-2xl",
						src: comment.commentimage || comment.sticker,
						alt: "评论图片"
					})
				}),
				(0, import_jsx_runtime$21.jsxs)("div", {
					className: "flex justify-between items-center mt-6 text-foreground-500",
					children: [(0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center space-x-6 select-text",
						children: [
							(0, import_jsx_runtime$21.jsx)("span", {
								className: "text-5xl",
								children: comment.create_time
							}),
							(0, import_jsx_runtime$21.jsx)("span", {
								className: "text-5xl",
								children: comment.ip_label
							}),
							comment.reply_comment_total > 0 ? (0, import_jsx_runtime$21.jsxs)("span", {
								className: "text-5xl text-foreground-600",
								children: [
									"共",
									comment.reply_comment_total,
									"条回复"
								]
							}) : (0, import_jsx_runtime$21.jsx)("span", {
								className: "text-5xl text-foreground-600",
								children: "回复"
							})
						]
					}), (0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [(0, import_jsx_runtime$21.jsxs)("div", {
							className: "flex items-center space-x-2 transition-colors cursor-pointer",
							children: [(0, import_jsx_runtime$21.jsx)(Heart, {
								size: 60,
								className: "text-foreground-500"
							}), (0, import_jsx_runtime$21.jsx)("span", {
								className: "text-5xl select-text",
								children: comment.digg_count
							})]
						}), (0, import_jsx_runtime$21.jsx)("div", {
							className: "flex items-center transition-colors cursor-pointer",
							children: (0, import_jsx_runtime$21.jsx)(MessageCircle, {
								size: 60,
								className: "stroke-current text-foreground-500"
							})
						})]
					})]
				}),
				comment.replyComment && Object.keys(comment.replyComment).length > 0 && (0, import_jsx_runtime$21.jsx)("div", {
					className: "pl-6 mt-20",
					children: (0, import_jsx_runtime$21.jsx)("div", {
						className: "py-4",
						children: (0, import_jsx_runtime$21.jsxs)("div", {
							className: "flex items-start space-x-4",
							children: [(0, import_jsx_runtime$21.jsx)("img", {
								src: comment.replyComment.userimageurl,
								className: "object-cover mr-8 rounded-full w-26 h-26",
								alt: "用户头像"
							}), (0, import_jsx_runtime$21.jsxs)("div", {
								className: "flex-1",
								children: [
									(0, import_jsx_runtime$21.jsxs)("div", {
										className: "flex items-center mb-2 space-x-2",
										children: [(0, import_jsx_runtime$21.jsx)("span", {
											className: "text-5xl font-medium text-foreground-600",
											children: comment.replyComment.nickname
										}), "" !== comment.replyComment.label_text && (0, import_jsx_runtime$21.jsx)("div", {
											className: clsx_default("inline-block px-4 py-2 ml-2 text-3xl rounded-xl", "作者" === comment.replyComment.label_text ? "bg-[#fe2c55] text-white" : "bg-default-100 text-default-500"),
											children: comment.replyComment.label_text
										})]
									}),
									(0, import_jsx_runtime$21.jsx)("div", {
										className: "text-6xl text-foreground leading-relaxed mb-2 mt-8  select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
										dangerouslySetInnerHTML: { __html: comment.replyComment.text },
										style: {
											wordBreak: "break-word",
											overflowWrap: "break-word"
										}
									}),
									(0, import_jsx_runtime$21.jsxs)("div", {
										className: "flex justify-between items-center mt-10 text-foreground-500",
										children: [(0, import_jsx_runtime$21.jsxs)("div", {
											className: "flex items-center space-x-4",
											children: [(0, import_jsx_runtime$21.jsx)("span", {
												className: "text-5xl",
												children: comment.replyComment.create_time
											}), (0, import_jsx_runtime$21.jsx)("span", {
												className: "text-5xl",
												children: comment.replyComment.ip_label
											})]
										}), (0, import_jsx_runtime$21.jsxs)("div", {
											className: "flex items-center space-x-2",
											children: [(0, import_jsx_runtime$21.jsx)(Heart, {
												size: 60,
												className: "text-foreground-500"
											}), (0, import_jsx_runtime$21.jsx)("span", {
												className: "text-5xl",
												children: comment.replyComment.digg_count
											})]
										})]
									})
								]
							})]
						})
					})
				}),
				comment.replyComment && Object.keys(comment.replyComment).length > 0 && (0, import_jsx_runtime$21.jsx)("div", { className: "mx-auto mt-4 border-b-1 border-divider" })
			]
		})]
	}), DouyinComment = import_react$22.memo((props) => {
		const processedData = (0, import_react$22.useMemo)(() => props.data ? {
			commentsArray: props.data.CommentsData?.jsonArray || [],
			type: props.data.Type || "未知",
			commentLength: props.data.CommentLength || 0,
			videoSize: props.data.VideoSize,
			videoFPS: props.data.VideoFPS,
			imageLength: props.data.ImageLength,
			useDarkTheme: props.data.useDarkTheme || !1
		} : {
			commentsArray: [],
			type: "未知",
			commentLength: 0,
			videoSize: void 0,
			videoFPS: void 0,
			imageLength: void 0,
			useDarkTheme: !1
		}, [props.data]);
		return (0, import_jsx_runtime$21.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$21.jsxs)("div", {
				className: "p-5",
				children: [(0, import_jsx_runtime$21.jsx)(VideoInfoHeader$1, {
					type: processedData.type,
					commentLength: processedData.commentLength,
					videoSize: processedData.videoSize,
					videoFPS: processedData.videoFPS,
					imageLength: processedData.imageLength,
					qrCodeDataUrl: props.qrCodeDataUrl || "",
					useDarkTheme: processedData.useDarkTheme
				}), (0, import_jsx_runtime$21.jsx)("div", {
					className: "overflow-auto mx-auto max-w-full",
					children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => (0, import_jsx_runtime$21.jsx)(CommentItemComponent$2, {
						comment,
						isLast: index === processedData.commentsArray.length - 1
					}, index)) : (0, import_jsx_runtime$21.jsx)("div", {
						className: "flex justify-center items-center py-20 text-foreground-400",
						children: (0, import_jsx_runtime$21.jsxs)("div", {
							className: "text-center",
							children: [(0, import_jsx_runtime$21.jsx)(MessageCircle, {
								size: 64,
								className: "mx-auto mb-4 text-foreground-300 text-comment"
							}), (0, import_jsx_runtime$21.jsx)("p", {
								className: "text-xl",
								children: "暂无评论数据"
							})]
						})
					})
				})]
			})
		});
	}), Comment_default$3 = DouyinComment;
}), Dynamic_exports = __export({
	DouyinDynamic: () => DouyinDynamic,
	default: () => Dynamic_default
}), init_Dynamic = __esmMin(() => {
	init_lucide_react(), import_react$21 = __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$20 = __toESM(require_jsx_runtime()), DouyinHeader$1 = ({ useDarkTheme }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: "flex items-center px-12 py-15",
		children: [(0, import_jsx_runtime$20.jsx)("div", {
			className: "w-[39%] h-[200px] bg-cover bg-center bg-fixed",
			children: (0, import_jsx_runtime$20.jsx)("img", {
				src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
				alt: "抖音Logo",
				className: "object-contain w-full h-full"
			})
		}), (0, import_jsx_runtime$20.jsx)("span", {
			className: "text-[65px] ml-4 text-foreground-600",
			children: "记录美好生活"
		})]
	}), CoverSection$1 = ({ imageUrl }) => (0, import_jsx_runtime$20.jsx)("div", {
		className: "flex flex-col items-center my-5",
		children: (0, import_jsx_runtime$20.jsx)("div", {
			className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative",
			children: (0, import_jsx_runtime$20.jsx)("img", {
				className: "rounded-[25px] object-contain w-full h-full",
				src: imageUrl,
				alt: "封面"
			})
		})
	}), InfoSection = ({ desc, dianzan, pinglun, shouchang, share, createTime }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: "flex flex-col px-16 py-5",
		children: [
			(0, import_jsx_runtime$20.jsx)("div", {
				className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
				style: {
					letterSpacing: "1.5px",
					wordWrap: "break-word"
				},
				dangerouslySetInnerHTML: { __html: desc }
			}),
			(0, import_jsx_runtime$20.jsxs)("div", {
				className: "flex items-center gap-6 text-[45px] text-foreground-500 font-light mb-2.5 select-text",
				children: [
					(0, import_jsx_runtime$20.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$20.jsx)(Heart, { className: "w-11 h-11 text-like" }), (0, import_jsx_runtime$20.jsxs)("span", { children: [dianzan, "点赞"] })]
					}),
					(0, import_jsx_runtime$20.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$20.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$20.jsx)(MessageCircle, { className: "w-11 h-11 text-comment" }), (0, import_jsx_runtime$20.jsxs)("span", { children: [pinglun, "评论"] })]
					}),
					(0, import_jsx_runtime$20.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$20.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$20.jsx)(Bookmark, { className: "w-11 h-11" }), (0, import_jsx_runtime$20.jsxs)("span", { children: [shouchang, "收藏"] })]
					}),
					(0, import_jsx_runtime$20.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$20.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$20.jsx)(Share2, { className: "w-11 h-11 text-success" }), (0, import_jsx_runtime$20.jsxs)("span", { children: [share, "分享"] })]
					})
				]
			}),
			(0, import_jsx_runtime$20.jsxs)("div", {
				className: "flex items-center gap-2 text-[45px] text-foreground-500 font-light select-text",
				children: [(0, import_jsx_runtime$20.jsx)(Clock, { className: "w-11 h-11 text-time" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["发布于", createTime] })]
			})
		]
	}), UserInfoSection$1 = ({ avater_url, username, douyinId, likes, following, followers, coCreatorCount }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: "flex flex-col pl-16",
		children: [(0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex items-center mb-6",
			children: [(0, import_jsx_runtime$20.jsx)("div", {
				className: "flex justify-center items-center mr-7 bg-white rounded-full w-54 h-54",
				children: (0, import_jsx_runtime$20.jsx)("img", {
					src: avater_url,
					alt: "头像",
					className: "rounded-full w-51 h-51 shadow-large"
				})
			}), (0, import_jsx_runtime$20.jsxs)("div", {
				className: "flex flex-col flex-1 min-w-0",
				children: [(0, import_jsx_runtime$20.jsxs)("span", {
					className: "text-[80px] font-bold text-foreground-700 select-text break-words leading-tight max-w-full",
					children: ["@", username]
				}), coCreatorCount && coCreatorCount > 0 && (0, import_jsx_runtime$20.jsxs)("div", {
					className: "gap-2 mt-3 inline-flex items-center rounded-[20px] bg-foreground-200 text-foreground-700 px-6 py-3 self-start",
					children: [(0, import_jsx_runtime$20.jsx)(Users, { className: "w-8 h-8" }), (0, import_jsx_runtime$20.jsxs)("span", {
						className: "text-[34px] leading-none select-text text-foreground-700",
						children: [coCreatorCount, "人共创"]
					})]
				})]
			})]
		}), (0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground-600 select-text",
			style: { letterSpacing: "2.5px" },
			children: [
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(Hash, { className: "w-8 h-8" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["抖音号: ", douyinId] })]
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(Heart, { className: "w-8 h-8 text-like" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["获赞: ", likes] })]
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(Eye, { className: "w-8 h-8 text-view" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["关注: ", following] })]
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["粉丝: ", followers] })]
				})
			]
		})]
	}), QRCodeSection$4 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: "flex flex-col items-center w-[420px] mr-18",
		children: [(0, import_jsx_runtime$20.jsx)("div", {
			className: "p-2.5 rounded-sm border-[7px] border-dashed border-divider",
			children: (0, import_jsx_runtime$20.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-[350px] h-[350px]"
			})
		}), (0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex items-center gap-3 text-[40px] text-foreground-500 mt-5 select-text",
			children: [(0, import_jsx_runtime$20.jsx)(QrCode, { className: "w-10 h-10" }), (0, import_jsx_runtime$20.jsx)("span", {
				className: "whitespace-nowrap",
				children: "作品直链：永久有效"
			})]
		})]
	}), CoCreatorsInfo = ({ info }) => {
		const creators = info?.co_creators ?? [];
		if (0 === creators.length) return null;
		const items = creators.slice(0, 50), listRef = import_react$21.useRef(null), [visibleCount, setVisibleCount] = import_react$21.useState(items.length);
		return import_react$21.useEffect(() => {
			const calc = () => {
				const el = listRef.current;
				if (!el) return;
				const containerWidth = el.offsetWidth, capacity = Math.floor((containerWidth - 8) / 184);
				setVisibleCount(items.length > capacity ? Math.max(0, capacity - 1) : items.length);
			};
			return calc(), window.addEventListener("resize", calc), () => window.removeEventListener("resize", calc);
		}, [items.length]), (0, import_jsx_runtime$20.jsx)("div", {
			className: "flex flex-col pl-16 w-full",
			children: (0, import_jsx_runtime$20.jsxs)("div", {
				ref: listRef,
				className: "flex overflow-hidden gap-8 py-1 pr-2 w-full",
				style: { scrollbarWidth: "thin" },
				children: [items.slice(0, visibleCount).map((c, idx) => {
					const avatar = c.avatar_thumb?.url_list[0];
					return (0, import_jsx_runtime$20.jsxs)("div", {
						className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0",
						children: [
							(0, import_jsx_runtime$20.jsx)("div", {
								className: "flex justify-center items-center bg-white rounded-full w-38 h-38",
								children: (0, import_jsx_runtime$20.jsx)("img", {
									src: avatar,
									alt: "共创者头像",
									className: "object-cover w-36 h-36 rounded-full"
								})
							}),
							(0, import_jsx_runtime$20.jsx)("div", {
								className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700",
								children: c.nickname || "未提供"
							}),
							(0, import_jsx_runtime$20.jsx)("div", {
								className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600",
								children: c.role_title || "未提供"
							})
						]
					}, `${c.nickname || "creator"}-${idx}`);
				}), items.length > visibleCount && (0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0",
					children: [
						(0, import_jsx_runtime$20.jsx)("div", {
							className: "flex justify-center items-center rounded-full bg-default-200 w-38 h-38",
							children: (0, import_jsx_runtime$20.jsx)("span", {
								className: "text-[42px] leading-none text-foreground-500",
								children: "···"
							})
						}),
						(0, import_jsx_runtime$20.jsxs)("div", {
							className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700",
							children: [
								"还有",
								items.length - visibleCount,
								"人"
							]
						}),
						(0, import_jsx_runtime$20.jsx)("div", {
							className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600",
							children: "共创"
						})
					]
				})]
			})
		});
	}, Dynamic_default = DouyinDynamic = (props) => {
		const { data, qrCodeDataUrl } = props, coCreatorCount = data.cooperation_info?.co_creator_nums ?? data.cooperation_info?.co_creators?.length ?? void 0;
		return (0, import_jsx_runtime$20.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$20.jsxs)("div", { children: [
				(0, import_jsx_runtime$20.jsx)("div", { className: "h-[60px]" }),
				(0, import_jsx_runtime$20.jsx)(DouyinHeader$1, { useDarkTheme: data.useDarkTheme }),
				(0, import_jsx_runtime$20.jsx)("div", { className: "h-[60px]" }),
				(0, import_jsx_runtime$20.jsx)(CoverSection$1, { imageUrl: data.image_url }),
				(0, import_jsx_runtime$20.jsx)("div", { className: "h-[20px]" }),
				(0, import_jsx_runtime$20.jsx)(InfoSection, {
					desc: data.desc,
					dianzan: data.dianzan,
					pinglun: data.pinglun,
					shouchang: data.shouchang,
					share: data.share,
					createTime: data.create_time,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$20.jsx)("div", { className: "h-[100px]" }),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex flex-col gap-10 px-0 pt-25",
					children: [(0, import_jsx_runtime$20.jsx)("div", {
						className: "w-full",
						children: (0, import_jsx_runtime$20.jsx)(CoCreatorsInfo, { info: data.cooperation_info })
					}), (0, import_jsx_runtime$20.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [(0, import_jsx_runtime$20.jsx)("div", {
							className: "flex flex-col gap-8 items-start w-[960px]",
							children: (0, import_jsx_runtime$20.jsx)(UserInfoSection$1, {
								avater_url: data.avater_url,
								username: data.username,
								douyinId: data.抖音号,
								likes: data.获赞,
								following: data.关注,
								followers: data.粉丝,
								useDarkTheme: data.useDarkTheme,
								coCreatorCount
							})
						}), (0, import_jsx_runtime$20.jsx)(QRCodeSection$4, {
							qrCodeDataUrl,
							useDarkTheme: data.useDarkTheme
						})]
					})]
				})
			] })
		});
	};
}), Live_exports = __export({
	DouyinLive: () => DouyinLive,
	default: () => Live_default
}), init_Live = __esmMin(() => {
	init_lucide_react(), __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$19 = __toESM(require_jsx_runtime()), CoverSection = ({ imageUrl }) => (0, import_jsx_runtime$19.jsx)("div", {
		className: "py-10",
		children: (0, import_jsx_runtime$19.jsx)("div", {
			className: "flex flex-col items-center",
			children: (0, import_jsx_runtime$19.jsx)("div", {
				className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[95%] flex-1 relative",
				children: (0, import_jsx_runtime$19.jsx)("img", {
					className: "rounded-[25px] object-contain w-full h-full select-text",
					src: imageUrl,
					alt: "封面"
				})
			})
		})
	}), UserInfoSection = ({ avater_url, username, fans }) => (0, import_jsx_runtime$19.jsxs)("div", {
		className: "flex gap-10 items-center pr-20",
		children: [(0, import_jsx_runtime$19.jsx)("img", {
			src: avater_url,
			alt: "头像",
			className: "mr-[15px] rounded-full h-auto w-[130px] select-text"
		}), (0, import_jsx_runtime$19.jsxs)("div", {
			className: "flex flex-col items-start",
			children: [(0, import_jsx_runtime$19.jsxs)("div", {
				className: "flex flex-row items-center mb-[5px]",
				children: [
					(0, import_jsx_runtime$19.jsx)("div", {
						className: "text-[60px] text-foreground select-text",
						children: (0, import_jsx_runtime$19.jsx)("span", { children: username })
					}),
					(0, import_jsx_runtime$19.jsx)("div", { className: "w-4" }),
					(0, import_jsx_runtime$19.jsx)("img", {
						className: "w-[170px] h-auto select-text",
						src: "/image/douyin/抖音-直播中.png",
						alt: "直播中"
					})
				]
			}), (0, import_jsx_runtime$19.jsxs)("div", {
				className: "flex gap-2 items-center",
				children: [(0, import_jsx_runtime$19.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$19.jsxs)("span", {
					className: "text-default-500 text-[35px] select-text",
					children: [fans, "粉丝"]
				})]
			})]
		})]
	}), QRCodeSection$3 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$19.jsxs)("div", {
		className: "flex flex-col-reverse items-center mt-[30px] mr-5",
		children: [(0, import_jsx_runtime$19.jsxs)("div", {
			className: "flex items-center gap-2 text-[50px] ml-[10px] text-right mr-[10px] text-foreground select-text",
			children: [(0, import_jsx_runtime$19.jsx)(QrCode, { className: "w-12 h-12" }), (0, import_jsx_runtime$19.jsx)("span", { children: "直播分享链接" })]
		}), (0, import_jsx_runtime$19.jsx)("div", {
			className: "p-[10px] rounded-[2%] border-[7px] border-dashed border-default-300",
			children: (0, import_jsx_runtime$19.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-[350px] select-text"
			})
		})]
	}), Live_default = DouyinLive = (props) => {
		const { qrCodeDataUrl } = props;
		return (0, import_jsx_runtime$19.jsxs)(DefaultLayout, {
			...props,
			children: [(0, import_jsx_runtime$19.jsx)(CoverSection, { imageUrl: props.data.image_url }), (0, import_jsx_runtime$19.jsxs)("div", {
				className: "flex flex-col px-20",
				children: [
					(0, import_jsx_runtime$19.jsx)("div", { className: "h-[10px]" }),
					(0, import_jsx_runtime$19.jsx)("div", {
						className: "text-[65px] items-center tracking-[1.5px] relative break-words font-bold text-foreground select-text",
						children: props.data.text
					}),
					(0, import_jsx_runtime$19.jsx)("div", { className: "h-[10px]" }),
					(0, import_jsx_runtime$19.jsx)("div", {
						className: "text-[45px] items-center tracking-[1.5px] relative break-words text-default-500 select-text",
						children: props.data.liveinf
					}),
					(0, import_jsx_runtime$19.jsxs)("div", {
						className: "flex items-center gap-6 text-[45px] tracking-[1.5px] relative break-words text-default-500 select-text",
						children: [
							(0, import_jsx_runtime$19.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$19.jsx)(Eye, { className: "w-11 h-11 text-view" }), (0, import_jsx_runtime$19.jsxs)("span", { children: ["观看总人数", props.data.总观看次数] })]
							}),
							(0, import_jsx_runtime$19.jsx)("span", { children: "|" }),
							(0, import_jsx_runtime$19.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$19.jsx)(Users, { className: "w-11 h-11 text-follow" }), (0, import_jsx_runtime$19.jsxs)("span", { children: ["在线观众", props.data.在线观众] })]
							})
						]
					}),
					(0, import_jsx_runtime$19.jsx)("div", { className: "h-20" }),
					(0, import_jsx_runtime$19.jsx)(UserInfoSection, {
						avater_url: props.data.avater_url,
						username: props.data.username,
						fans: props.data.fans,
						useDarkTheme: props.data.useDarkTheme
					}),
					(0, import_jsx_runtime$19.jsx)("div", { className: "h-[120px]" }),
					(0, import_jsx_runtime$19.jsxs)("div", {
						className: "flex flex-col w-auto h-full",
						children: [(0, import_jsx_runtime$19.jsxs)("div", {
							className: "w-inherit text-[70px] text-right mr-5 -mb-[45px] z-[-1] text-foreground select-text",
							children: ["抖音", props.data.dynamicTYPE]
						}), (0, import_jsx_runtime$19.jsxs)("div", {
							className: "h-auto flex justify-between pt-[60px] items-center",
							children: [(0, import_jsx_runtime$19.jsx)("div", {
								className: "flex flex-col ml-[45px]",
								children: (0, import_jsx_runtime$19.jsxs)("div", {
									className: "flex flex-col justify-start items-start",
									children: [(0, import_jsx_runtime$19.jsx)("div", { className: "w-[130%] h-[245px] mb-[52px] bg-cover bg-center bg-fixed " + (props.data.useDarkTheme ? "bg-[url(/image/douyin/dylogo-light.svg)]" : "bg-[url(/image/douyin/dylogo-dark.svg)]") }), (0, import_jsx_runtime$19.jsx)("div", {
										className: "flex flex-col items-start",
										children: (0, import_jsx_runtime$19.jsx)("div", {
											className: "text-[50px] tracking-[10px] text-foreground select-text",
											children: "抖音 记录美好生活"
										})
									})]
								})
							}), (0, import_jsx_runtime$19.jsx)(QRCodeSection$3, {
								qrCodeDataUrl,
								useDarkTheme: props.data.useDarkTheme
							})]
						})]
					})
				]
			})]
		});
	};
}), MusicInfo_exports = __export({
	DouyinMusicInfo: () => DouyinMusicInfo,
	default: () => MusicInfo_default
}), init_MusicInfo = __esmMin(() => {
	init_lucide_react(), __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$18 = __toESM(require_jsx_runtime()), DouyinHeader = ({ useDarkTheme }) => (0, import_jsx_runtime$18.jsxs)("div", {
		className: "flex items-center px-12 py-15",
		children: [(0, import_jsx_runtime$18.jsx)("div", {
			className: "w-[39%] h-[200px] bg-cover bg-center bg-fixed",
			children: (0, import_jsx_runtime$18.jsx)("img", {
				src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
				alt: "抖音Logo",
				className: "object-contain w-full h-full select-text"
			})
		}), (0, import_jsx_runtime$18.jsx)("span", {
			className: "text-[65px] ml-4 text-foreground select-text",
			children: "记录美好生活"
		})]
	}), MusicCoverSection = ({ imageUrl }) => (0, import_jsx_runtime$18.jsx)("div", {
		className: "flex flex-col items-center my-5",
		children: (0, import_jsx_runtime$18.jsx)("div", {
			className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative",
			children: (0, import_jsx_runtime$18.jsx)("img", {
				className: "rounded-[25px] object-contain w-full h-full select-text",
				src: imageUrl,
				alt: "音乐封面"
			})
		})
	}), MusicInfoSection = ({ desc, musicId, userCount, createTime }) => (0, import_jsx_runtime$18.jsxs)("div", {
		className: "flex flex-col px-16 py-5",
		children: [
			(0, import_jsx_runtime$18.jsx)("div", {
				className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
				style: {
					letterSpacing: "1.5px",
					wordWrap: "break-word"
				},
				dangerouslySetInnerHTML: { __html: desc }
			}),
			(0, import_jsx_runtime$18.jsxs)("div", {
				className: "flex flex-col gap-2 text-[45px] text-default-500 font-light mb-2.5",
				children: [(0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex gap-2 items-center select-text",
					children: [(0, import_jsx_runtime$18.jsx)(Music, { className: "w-11 h-11" }), (0, import_jsx_runtime$18.jsxs)("span", { children: ["音乐ID: ", musicId] })]
				}), (0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex gap-2 items-center select-text",
					children: [(0, import_jsx_runtime$18.jsx)(Users, { className: "w-11 h-11 text-follow" }), (0, import_jsx_runtime$18.jsxs)("span", { children: [userCount, " 人使用过"] })]
				})]
			}),
			(0, import_jsx_runtime$18.jsxs)("div", {
				className: "flex items-center gap-2 text-[45px] text-default-500 font-light select-text",
				children: [(0, import_jsx_runtime$18.jsx)(Clock, { className: "w-11 h-11 text-time" }), (0, import_jsx_runtime$18.jsxs)("span", { children: ["图片生成于", createTime] })]
			})
		]
	}), MusicAuthorInfoSection = ({ avatarUrl, username, userShortId, totalFavorited, followingCount, fans }) => (0, import_jsx_runtime$18.jsxs)("div", {
		className: "flex flex-col pl-16",
		children: [(0, import_jsx_runtime$18.jsxs)("div", {
			className: "flex items-center mb-6",
			children: [(0, import_jsx_runtime$18.jsx)("img", {
				src: avatarUrl,
				alt: "头像",
				className: "w-[200px] h-[200px] rounded-full mr-7 shadow-large select-text"
			}), (0, import_jsx_runtime$18.jsx)("div", {
				className: "flex flex-col",
				children: (0, import_jsx_runtime$18.jsx)("span", {
					className: "text-[80px] font-bold text-foreground select-text",
					children: username
				})
			})]
		}), (0, import_jsx_runtime$18.jsxs)("div", {
			className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground select-text",
			style: { letterSpacing: "2.5px" },
			children: [
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$18.jsx)(Hash, { className: "w-8 h-8" }), (0, import_jsx_runtime$18.jsxs)("span", { children: ["ID: ", userShortId] })]
				}),
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$18.jsx)(Heart, { className: "w-8 h-8 text-like" }), (0, import_jsx_runtime$18.jsxs)("span", { children: ["获赞: ", totalFavorited] })]
				}),
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$18.jsx)(UserPlus, { className: "w-8 h-8" }), (0, import_jsx_runtime$18.jsxs)("span", { children: ["关注: ", followingCount] })]
				}),
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$18.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$18.jsxs)("span", { children: ["粉丝: ", fans] })]
				})
			]
		})]
	}), MusicQRCodeSection = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$18.jsxs)("div", {
		className: "flex flex-col-reverse items-center -mb-12 mr-18",
		children: [(0, import_jsx_runtime$18.jsxs)("div", {
			className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text",
			children: [(0, import_jsx_runtime$18.jsx)(QrCode, { className: "w-11 h-11" }), (0, import_jsx_runtime$18.jsx)("span", { children: "文件直链：永久有效" })]
		}), (0, import_jsx_runtime$18.jsx)("div", {
			className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300",
			children: (0, import_jsx_runtime$18.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-[350px] h-[350px] select-text"
			})
		})]
	}), MusicInfo_default = DouyinMusicInfo = (props) => {
		const { data, qrCodeDataUrl } = props;
		return (0, import_jsx_runtime$18.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$18.jsxs)("div", { children: [
				(0, import_jsx_runtime$18.jsx)(DouyinHeader, { useDarkTheme: data.useDarkTheme }),
				(0, import_jsx_runtime$18.jsx)(MusicCoverSection, {
					imageUrl: data.image_url,
					description: data.desc,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$18.jsx)("div", { className: "h-[90px]" }),
				(0, import_jsx_runtime$18.jsx)(MusicInfoSection, {
					desc: data.desc,
					musicId: data.music_id,
					userCount: data.user_count,
					createTime: data.create_time,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$18.jsx)("div", { className: "h-[100px]" }),
				(0, import_jsx_runtime$18.jsx)("div", {
					className: "text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-500 select-text",
					children: "抖音音乐信息"
				}),
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex justify-between items-center px-0 pt-25",
					children: [(0, import_jsx_runtime$18.jsx)(MusicAuthorInfoSection, {
						avatarUrl: data.avater_url,
						username: data.username,
						userShortId: data.user_shortid,
						totalFavorited: data.total_favorited,
						followingCount: data.following_count,
						fans: data.fans,
						useDarkTheme: data.useDarkTheme
					}), (0, import_jsx_runtime$18.jsx)(MusicQRCodeSection, {
						qrCodeDataUrl,
						useDarkTheme: data.useDarkTheme
					})]
				})
			] })
		});
	};
}), UserList_exports$1 = __export({ default: () => UserList_default$1 }), init_UserList$1 = __esmMin(() => {
	init_lucide_react(), __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$17 = __toESM(require_jsx_runtime()), DouyinUserItem = ({ user, index }) => (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [(0, import_jsx_runtime$17.jsxs)("li", {
		className: "flex w-[92%] items-center p-[40px] gap-[40px] rounded-[28px] shadow-large bg-content1 select-text",
		"data-index": index,
		children: [(0, import_jsx_runtime$17.jsx)("img", {
			src: user.avatar_img,
			alt: "用户头像",
			className: "w-[140px] h-[140px] rounded-full object-cover select-text"
		}), (0, import_jsx_runtime$17.jsx)("div", {
			className: "flex flex-grow items-start",
			children: (0, import_jsx_runtime$17.jsxs)("div", {
				className: "flex flex-col",
				children: [(0, import_jsx_runtime$17.jsxs)("span", {
					className: "text-[52px] mb-[14px] font-medium text-foreground select-text inline-flex items-center gap-[12px]",
					children: [(0, import_jsx_runtime$17.jsx)(User, {
						className: "w-[36px] h-[36px] opacity-80",
						"aria-hidden": "true"
					}), user.username]
				}), (0, import_jsx_runtime$17.jsxs)("div", {
					className: "grid grid-cols-2 gap-x-[40px] gap-y-[18px] text-[26px] text-foreground select-text",
					children: [
						(0, import_jsx_runtime$17.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$17.jsx)(Hash, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"抖音号: ",
								user.short_id
							]
						}),
						(0, import_jsx_runtime$17.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$17.jsx)(Users, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"粉丝: ",
								user.fans
							]
						}),
						(0, import_jsx_runtime$17.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$17.jsx)(Heart, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"获赞: ",
								user.total_favorited
							]
						}),
						(0, import_jsx_runtime$17.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$17.jsx)(UserPlus, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"关注: ",
								user.following_count
							]
						})
					]
				})]
			})
		})]
	}), (0, import_jsx_runtime$17.jsx)("div", { className: "h-[36px]" })] }), UserList_default$1 = (prop) => (0, import_jsx_runtime$17.jsx)(DefaultLayout, {
		...prop,
		children: (0, import_jsx_runtime$17.jsx)("ul", {
			className: "flex flex-col-reverse items-center p-0 list-none",
			"aria-label": "抖音用户列表",
			children: prop.data.renderOpt.map((user, index) => (0, import_jsx_runtime$17.jsx)(DouyinUserItem, {
				user,
				index
			}, `${user.short_id}-${index}`))
		})
	});
}), videoInfo_exports$1 = __export({
	DouyinVideoInfo: () => DouyinVideoInfo,
	default: () => videoInfo_default$1
}), init_videoInfo$1 = __esmMin(() => {
	init_dist(), init_lucide_react(), import_react$17 = __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$16 = __toESM(require_jsx_runtime()), formatNumber$3 = (num) => num >= 1e4 ? `${(num / 1e4).toFixed(1)}万` : num.toLocaleString(), formatDate$2 = (timestamp) => (/* @__PURE__ */ new Date(1e3 * timestamp)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	}), (StatItem$2 = import_react$17.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$16.jsxs)("div", {
		className: "flex gap-4 items-center",
		children: [
			(0, import_jsx_runtime$16.jsx)("div", {
				className: iconColor,
				children: icon
			}),
			(0, import_jsx_runtime$16.jsx)("span", {
				className: "font-bold text-foreground-900",
				children: formatNumber$3(value)
			}),
			(0, import_jsx_runtime$16.jsx)("span", {
				className: "text-foreground-500",
				children: label
			})
		]
	}))).displayName = "StatItem", (DouyinVideoInfo = import_react$17.memo((props) => {
		const formattedDate = (0, import_react$17.useMemo)(() => formatDate$2(props.data.create_time), [props.data.create_time]), statsData = (0, import_react$17.useMemo)(() => [
			{
				icon: (0, import_jsx_runtime$16.jsx)(Heart, { size: 48 }),
				value: props.data.statistics.digg_count,
				label: "点赞",
				iconColor: "text-like"
			},
			{
				icon: (0, import_jsx_runtime$16.jsx)(MessageCircle, { size: 48 }),
				value: props.data.statistics.comment_count,
				label: "评论",
				iconColor: "text-comment"
			},
			{
				icon: (0, import_jsx_runtime$16.jsx)(Star, { size: 48 }),
				value: props.data.statistics.collect_count,
				label: "收藏",
				iconColor: "text-yellow-500"
			},
			{
				icon: (0, import_jsx_runtime$16.jsx)(Share2, { size: 48 }),
				value: props.data.statistics.share_count,
				label: "分享",
				iconColor: "text-view"
			}
		], [props.data.statistics]);
		return (0, import_jsx_runtime$16.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$16.jsx)("div", { children: (0, import_jsx_runtime$16.jsxs)("div", {
				className: "overflow-hidden transition-all",
				children: [
					(0, import_jsx_runtime$16.jsxs)("div", {
						className: "overflow-hidden relative",
						children: [(0, import_jsx_runtime$16.jsx)("img", {
							src: props.data.image_url,
							alt: props.data.desc,
							className: "object-cover w-full h-full"
						}), (0, import_jsx_runtime$16.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/30" })]
					}),
					(0, import_jsx_runtime$16.jsxs)("div", {
						className: "p-20 pb-36",
						children: [(0, import_jsx_runtime$16.jsx)("h1", {
							className: "mb-8 text-7xl font-bold leading-tight text-foreground-900",
							children: props.data.desc
						}), (0, import_jsx_runtime$16.jsx)("p", {
							className: "mb-6 text-4xl text-foreground-500",
							children: formattedDate
						})]
					}),
					(0, import_jsx_runtime$16.jsxs)("div", {
						className: "px-16",
						children: [
							(0, import_jsx_runtime$16.jsx)("div", {
								className: "grid grid-cols-2 text-5xl gap-18",
								children: statsData.map((stat, index) => (0, import_jsx_runtime$16.jsx)(StatItem$2, {
									icon: stat.icon,
									value: stat.value,
									label: stat.label,
									iconColor: stat.iconColor
								}, index))
							}),
							(0, import_jsx_runtime$16.jsx)("div", { className: "h-18" }),
							(0, import_jsx_runtime$16.jsxs)("div", {
								className: "flex justify-between items-center mb-8 text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$16.jsxs)("div", {
									className: "flex gap-16 items-center",
									children: [(0, import_jsx_runtime$16.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [
											(0, import_jsx_runtime$16.jsx)(TrendingUp, { size: 48 }),
											(0, import_jsx_runtime$16.jsx)("span", {
												className: "font-medium",
												children: formatNumber$3(props.data.statistics?.recommend_count ?? 0)
											}),
											(0, import_jsx_runtime$16.jsx)("span", {
												className: "text-4xl",
												children: "推荐"
											})
										]
									}), props.data.statistics.play_count > 0 && (0, import_jsx_runtime$16.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [
											(0, import_jsx_runtime$16.jsx)(Eye, { size: 48 }),
											(0, import_jsx_runtime$16.jsx)("span", {
												className: "font-medium",
												children: formatNumber$3(props.data.statistics.play_count)
											}),
											(0, import_jsx_runtime$16.jsx)("span", {
												className: "text-4xl",
												children: "播放"
											})
										]
									})]
								}), (0, import_jsx_runtime$16.jsx)("div", {
									className: "transform-gpu scale-[2.5] origin-right mb-8",
									children: (0, import_jsx_runtime$16.jsxs)(chip_default, {
										color: "primary",
										variant: "flat",
										size: "lg",
										radius: "sm",
										children: ["作品ID：", props.data.aweme_id]
									})
								})]
							})
						]
					}),
					(0, import_jsx_runtime$16.jsx)("div", { className: "h-18" }),
					(0, import_jsx_runtime$16.jsx)("div", { className: "h-0.5 bg-default-300" }),
					(0, import_jsx_runtime$16.jsxs)("div", {
						className: "flex justify-between items-center px-16 py-12 pb-0",
						children: [(0, import_jsx_runtime$16.jsxs)("div", {
							className: "flex gap-8 items-center",
							children: [(0, import_jsx_runtime$16.jsx)("img", {
								src: props.data.author.avatar,
								alt: props.data.author.name,
								className: "object-cover w-48 h-48 rounded-full"
							}), (0, import_jsx_runtime$16.jsxs)("div", {
								className: "flex flex-col gap-6",
								children: [(0, import_jsx_runtime$16.jsx)("p", {
									className: "text-6xl font-semibold text-foreground-900",
									children: props.data.author.name
								}), (0, import_jsx_runtime$16.jsxs)("p", {
									className: "text-5xl text-foreground-500",
									children: ["抖音号: ", props.data.author.short_id]
								})]
							})]
						}), (0, import_jsx_runtime$16.jsx)("div", {
							className: "transform-gpu scale-[3.5] origin-right",
							children: (0, import_jsx_runtime$16.jsx)(button_default, {
								size: "sm",
								className: "bg-default-800 dark:bg-default-100",
								children: (0, import_jsx_runtime$16.jsxs)("div", {
									className: "flex items-center",
									children: [(0, import_jsx_runtime$16.jsxs)("div", {
										className: "relative mr-1",
										children: [
											(0, import_jsx_runtime$16.jsx)(ExternalLink, {
												className: "absolute w-4 h-4",
												style: {
													transform: "translate(-0.5px, -0.5px)",
													color: "#00e6f6"
												}
											}),
											(0, import_jsx_runtime$16.jsx)(ExternalLink, {
												className: "absolute w-4 h-4",
												style: {
													transform: "translate(0.5px, 0.5px)",
													color: "#ff013c"
												}
											}),
											(0, import_jsx_runtime$16.jsx)(ExternalLink, {
												className: "relative w-4 h-4",
												style: { color: "white" }
											})
										]
									}), (0, import_jsx_runtime$16.jsxs)("div", {
										className: "relative",
										children: [
											(0, import_jsx_runtime$16.jsx)("span", {
												className: "absolute",
												style: {
													transform: "translate(-0.5px, -0.5px)",
													color: "#00e6f6"
												},
												children: "观看"
											}),
											(0, import_jsx_runtime$16.jsx)("span", {
												className: "absolute",
												style: {
													transform: "translate(0.5px, 0.5px)",
													color: "#ff013c"
												},
												children: "观看"
											}),
											(0, import_jsx_runtime$16.jsx)("span", {
												className: "relative",
												style: { color: "white" },
												children: "观看"
											})
										]
									})]
								})
							})
						})]
					})
				]
			}) })
		});
	})).displayName = "DouyinVideoInfo", videoInfo_default$1 = DouyinVideoInfo;
}), Comment_exports$2 = __export({
	BilibiliComment: () => BilibiliComment,
	default: () => Comment_default$2
}), init_Comment$2 = __esmMin(() => {
	init_clsx(), init_lucide_react(), import_react$16 = __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$15 = __toESM(require_jsx_runtime()), processCommentHTML$1 = (htmlContent) => htmlContent.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">"), CommentText$1 = ({ content, className, style }) => (0, import_jsx_runtime$15.jsx)("div", {
		className,
		style,
		dangerouslySetInnerHTML: { __html: processCommentHTML$1(content) }
	}), ImageWithSkeleton = ({ src, alt, className = "", placeholder }) => {
		const [hasError, setHasError] = (0, import_react$16.useState)(!1);
		return (0, import_react$16.useEffect)(() => {
			setHasError(!1);
		}, [src]), hasError ? (0, import_jsx_runtime$15.jsx)("div", {
			className: `flex justify-center items-center text-sm select-text ${className} bg-content2 text-foreground-500`,
			children: placeholder || "图片加载失败"
		}) : (0, import_jsx_runtime$15.jsx)("img", {
			src,
			alt,
			className: `select-text ${className}`,
			onError: () => {
				setHasError(!0);
			},
			referrerPolicy: "no-referrer",
			crossOrigin: "anonymous"
		});
	}, QRCodeSection$2 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$15.jsx)("div", {
		className: "flex flex-col items-center -mr-10",
		children: (0, import_jsx_runtime$15.jsx)("div", {
			ref: (0, import_react$16.useRef)(null),
			className: "flex justify-center items-center mt-20 w-120 h-120",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$15.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full select-text"
			}) : (0, import_jsx_runtime$15.jsx)("div", {
				className: "flex justify-center items-center w-full h-full text-6xl select-text text-foreground-400",
				children: "二维码占位符"
			})
		})
	}), InfoItem = ({ label, value, unit }) => (0, import_jsx_runtime$15.jsxs)("div", {
		className: "text-[45px] p-2.5 tracking-[6px] text-left break-all text-foreground-600 select-text",
		children: [
			label,
			"：",
			value,
			unit
		]
	}), VideoInfoHeader = ({ type, commentLength, videoSize, clarity }) => (0, import_jsx_runtime$15.jsxs)("div", {
		className: "flex flex-col mt-2.5 -ml-10",
		children: [
			(0, import_jsx_runtime$15.jsx)("div", {
				className: "w-[580px] h-auto mb-5",
				children: (0, import_jsx_runtime$15.jsx)("div", {
					className: "text-8xl font-bold text-primary",
					children: (0, import_jsx_runtime$15.jsx)("img", {
						src: "/image/bilibili/bilibili.png",
						alt: "B站Logo",
						className: "select-text"
					})
				})
			}),
			(0, import_jsx_runtime$15.jsx)(InfoItem, {
				label: "作品类型",
				value: type
			}),
			(0, import_jsx_runtime$15.jsx)(InfoItem, {
				label: "评论数量",
				value: commentLength,
				unit: "条"
			}),
			"视频" === type && (0, import_jsx_runtime$15.jsxs)(import_jsx_runtime$15.Fragment, { children: [videoSize && (0, import_jsx_runtime$15.jsx)(InfoItem, {
				label: "视频大小",
				value: videoSize,
				unit: "MB"
			}), clarity && (0, import_jsx_runtime$15.jsx)(InfoItem, {
				label: "视频画质",
				value: clarity
			})] })
		]
	}), CommentItemComponent$1 = ({ comment, isLast = !1 }) => (0, import_jsx_runtime$15.jsxs)("div", {
		className: clsx_default("flex relative px-10 py-10 max-w-full", { "pb-0": isLast }),
		children: [(0, import_jsx_runtime$15.jsxs)("div", {
			className: "relative mr-[33.75px] flex-shrink-0",
			children: [(0, import_jsx_runtime$15.jsx)(ImageWithSkeleton, {
				src: comment.avatar || "AVATAR_PLACEHOLDER",
				alt: "用户头像",
				className: "rounded-full w-50 h-50 shadow-large",
				placeholder: "头像",
				isCircular: !0
			}), comment.frame && (0, import_jsx_runtime$15.jsx)(ImageWithSkeleton, {
				src: comment.frame,
				alt: "头像框",
				className: "absolute inset-0 transform scale-180",
				placeholder: "头像框"
			})]
		}), (0, import_jsx_runtime$15.jsxs)("div", {
			className: "flex-1 min-w-0",
			children: [
				(0, import_jsx_runtime$15.jsxs)("div", {
					className: "flex items-start gap-[10px] mb-[15px] text-[50px]",
					children: [
						(0, import_jsx_runtime$15.jsxs)("div", {
							className: "flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text",
							children: [
								(0, import_jsx_runtime$15.jsx)("div", {
									className: "[&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-[100px] [&>svg]:h-[100px] [&>svg]:align-middle [&>svg]:flex-shrink-0",
									dangerouslySetInnerHTML: { __html: comment.uname }
								}),
								void 0 !== comment.level && comment.level >= 0 && comment.level <= 7 && (0, import_jsx_runtime$15.jsx)("img", {
									src: `/image/bilibili/level/lv${comment.level}.svg`,
									alt: `等级${comment.level}`,
									className: "inline-block flex-shrink-0 w-24 h-24 align-middle"
								}),
								comment.isUP && (0, import_jsx_runtime$15.jsx)("img", {
									src: "/image/bilibili/up_pb.svg",
									alt: "UP主标签",
									className: "inline-block flex-shrink-0 align-middle w-23 h-23"
								})
							]
						}),
						1 === comment.label_type && (0, import_jsx_runtime$15.jsx)("div", {
							className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-danger text-danger-foreground flex-shrink-0 self-center select-text",
							children: "作者"
						}),
						comment.status_label && (0, import_jsx_runtime$15.jsx)("div", {
							className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-content2 text-foreground-600 flex-shrink-0 self-center select-text",
							children: comment.status_label
						})
					]
				}),
				(0, import_jsx_runtime$15.jsxs)("div", {
					className: "text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text",
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					},
					children: [comment.isTop && (0, import_jsx_runtime$15.jsx)("span", {
						className: "inline-flex justify-center items-center relative border-4 border-[#006A9E] rounded-xl text-[#006A9E] text-5xl px-2 py-1 leading-none mr-2 align-baseline",
						children: "置顶"
					}), (0, import_jsx_runtime$15.jsx)(CommentText$1, {
						content: comment.message,
						className: "inline [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]"
					})]
				}),
				(comment.img_src || comment.sticker) && (0, import_jsx_runtime$15.jsx)("div", {
					className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large",
					children: (0, import_jsx_runtime$15.jsx)(ImageWithSkeleton, {
						src: comment.img_src || comment.sticker || "IMAGE_PLACEHOLDER",
						alt: "评论图片",
						className: "rounded-[25px] object-contain w-full h-full",
						placeholder: "评论图片"
					})
				}),
				(0, import_jsx_runtime$15.jsxs)("div", {
					className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$15.jsx)("div", {
						className: "flex flex-1 items-center",
						children: (0, import_jsx_runtime$15.jsxs)("div", {
							className: "text-[45px] tracking-[2px] select-text",
							children: [
								comment.ctime,
								" · ",
								comment.location,
								comment.replylength > 0 ? (0, import_jsx_runtime$15.jsxs)("span", {
									className: "text-foreground-400 tracking-[3px] ml-4",
									children: [comment.replylength, "回复"]
								}) : (0, import_jsx_runtime$15.jsx)("span", {
									className: "ml-4 text-foreground-600",
									children: "回复"
								})
							]
						})
					}), (0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex items-center gap-[75px] ml-auto",
						children: [(0, import_jsx_runtime$15.jsxs)("div", {
							className: "flex items-center gap-[15px]",
							children: [(0, import_jsx_runtime$15.jsx)(ThumbsUp, { className: "w-[60px] h-[60px] text-foreground-500" }), (0, import_jsx_runtime$15.jsx)("span", {
								className: "text-[45px] text-foreground-500 select-text",
								children: comment.like
							})]
						}), (0, import_jsx_runtime$15.jsx)("div", {
							className: "flex items-center gap-[15px]",
							children: (0, import_jsx_runtime$15.jsx)(ThumbsDown, { className: "w-[60px] h-[60px] text-foreground-500" })
						})]
					})]
				})
			]
		})]
	}), BilibiliComment = import_react$16.memo((props) => {
		const processedData = (0, import_react$16.useMemo)(() => props.data ? {
			useDarkTheme: props.data.useDarkTheme || !1,
			Type: props.data.Type || "视频",
			CommentLength: props.data.CommentLength || "0",
			VideoSize: props.data.VideoSize,
			Clarity: props.data.Clarity,
			ImageLength: props.data.ImageLength,
			shareurl: props.data.shareurl || "",
			share_url: props.data.share_url || "",
			CommentsData: props.data.CommentsData || []
		} : {
			useDarkTheme: !1,
			Type: "视频",
			CommentLength: "0",
			VideoSize: void 0,
			Clarity: void 0,
			ImageLength: void 0,
			shareurl: "",
			share_url: "",
			CommentsData: [],
			host_mid: 0
		}, [props.data]);
		return (0, import_jsx_runtime$15.jsxs)(DefaultLayout, {
			...props,
			children: [(0, import_jsx_runtime$15.jsxs)("div", {
				className: "flex justify-between items-center max-w-[1200px] mx-auto p-5",
				children: [(0, import_jsx_runtime$15.jsx)(VideoInfoHeader, {
					type: processedData.Type,
					commentLength: processedData.CommentLength,
					videoSize: processedData.VideoSize,
					clarity: processedData.Clarity,
					imageLength: processedData.ImageLength
				}), (0, import_jsx_runtime$15.jsx)(QRCodeSection$2, {
					shareurl: processedData.shareurl || processedData.share_url,
					qrCodeDataUrl: props.qrCodeDataUrl,
					useDarkTheme: processedData.useDarkTheme
				})]
			}), (0, import_jsx_runtime$15.jsx)("div", {
				className: "mx-0 max-w-full",
				children: processedData.CommentsData.length > 0 ? processedData.CommentsData.map((comment, index) => (0, import_jsx_runtime$15.jsx)(CommentItemComponent$1, {
					comment,
					useDarkTheme: processedData.useDarkTheme,
					isLast: index === processedData.CommentsData.length - 1
				}, index)) : (0, import_jsx_runtime$15.jsx)("div", {
					className: "py-10 text-center select-text text-foreground-500",
					children: "暂无评论数据"
				})
			})]
		});
	}), Comment_default$2 = BilibiliComment;
}), init_shared = __esmMin(() => {
	import_react$15 = __toESM(require_react()), import_jsx_runtime$14 = __toESM(require_jsx_runtime()), processCommentHTML = (htmlContent) => htmlContent && "string" == typeof htmlContent ? htmlContent.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">") : "", CommentText = ({ content, className, style }) => (0, import_jsx_runtime$14.jsx)("div", {
		className,
		style,
		dangerouslySetInnerHTML: { __html: processCommentHTML(content) }
	}), EnhancedImage = ({ src, alt, className = "", placeholder, isCircular = !1 }) => {
		const [hasError, setHasError] = (0, import_react$15.useState)(!1);
		return !src || hasError ? (0, import_jsx_runtime$14.jsx)("div", {
			className: `${className} ${isCircular ? "rounded-full" : "rounded-md"} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`,
			children: (0, import_jsx_runtime$14.jsx)("span", {
				className: "text-sm text-gray-400",
				children: placeholder || alt
			})
		}) : (0, import_jsx_runtime$14.jsx)("img", {
			src,
			alt,
			className,
			onError: () => {
				setHasError(!0);
			},
			referrerPolicy: "no-referrer",
			crossOrigin: "anonymous"
		});
	};
}), UserList_exports = __export({ default: () => UserList_default }), init_UserList = __esmMin(() => {
	init_lucide_react(), __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$13 = __toESM(require_jsx_runtime()), BilibiliUserItem = ({ user }) => (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [(0, import_jsx_runtime$13.jsxs)("li", {
		className: "flex w-[92%] items-center p-[40px] gap-[40px] rounded-[28px] shadow-large bg-content1 select-text",
		children: [(0, import_jsx_runtime$13.jsx)(EnhancedImage, {
			src: user.avatar_img,
			alt: "用户头像",
			className: "w-[140px] h-[140px] rounded-full object-cover select-text"
		}), (0, import_jsx_runtime$13.jsx)("div", {
			className: "flex flex-grow items-start",
			children: (0, import_jsx_runtime$13.jsxs)("div", {
				className: "flex flex-col",
				children: [(0, import_jsx_runtime$13.jsxs)("span", {
					className: "text-[52px] mb-[14px] font-medium text-foreground select-text inline-flex items-center gap-[12px]",
					children: [(0, import_jsx_runtime$13.jsx)(User, {
						className: "w-[36px] h-[36px] opacity-80",
						"aria-hidden": "true"
					}), user.username]
				}), (0, import_jsx_runtime$13.jsxs)("div", {
					className: "grid grid-cols-2 gap-x-[40px] gap-y-[18px] text-[26px] text-foreground select-text",
					children: [
						(0, import_jsx_runtime$13.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$13.jsx)(Hash, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"UID: ",
								user.host_mid
							]
						}),
						(0, import_jsx_runtime$13.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$13.jsx)(Users, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"粉丝: ",
								user.fans
							]
						}),
						(0, import_jsx_runtime$13.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$13.jsx)(Heart, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"获赞: ",
								user.total_favorited
							]
						}),
						(0, import_jsx_runtime$13.jsxs)("span", {
							className: "inline-flex items-center gap-[12px]",
							children: [
								(0, import_jsx_runtime$13.jsx)(UserPlus, {
									className: "w-[26px] h-[26px] opacity-70",
									"aria-hidden": "true"
								}),
								"关注: ",
								user.following_count
							]
						})
					]
				})]
			})
		})]
	}), (0, import_jsx_runtime$13.jsx)("div", { className: "h-[36px]" })] }), UserList_default = (prop) => (0, import_jsx_runtime$13.jsx)(DefaultLayout, {
		...prop,
		children: (0, import_jsx_runtime$13.jsx)("ul", {
			className: "flex flex-col-reverse items-center p-0 list-none",
			"aria-label": "B站用户列表",
			children: prop.data.renderOpt.map((user, index) => (0, import_jsx_runtime$13.jsx)(BilibiliUserItem, {
				user,
				useDarkTheme: prop.data.useDarkTheme
			}, `${user.host_mid}-${index}`))
		})
	});
}), bangumi_exports = __export({
	BangumiBilibili: () => BangumiBilibili,
	default: () => bangumi_default
}), init_bangumi = __esmMin(() => {
	init_dist(), init_clsx(), init_lucide_react(), import_react$13 = __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$12 = __toESM(require_jsx_runtime()), formatNumber$2 = (num) => num >= 1e8 ? `${(num / 1e8).toFixed(1)}亿` : num >= 1e4 ? `${(num / 1e4).toFixed(1)}万` : num.toString(), formatDateParts = (timestamp) => {
		const date = /* @__PURE__ */ new Date(1e3 * timestamp);
		return {
			month: date.toLocaleDateString("zh-CN", { month: "short" }),
			day: date.getDate().toString().padStart(2, "0")
		};
	}, formatDateTime = (timestamp) => (/* @__PURE__ */ new Date(1e3 * timestamp)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	}), BangumiBilibiliHeader = (props) => {
		const actorList = props.actors ? props.actors.split(/[,，、\s]+/).filter((actor) => actor.trim()) : [];
		return (0, import_jsx_runtime$12.jsx)("div", {
			className: "overflow-hidden relative rounded-6xl",
			children: (0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex relative z-10 gap-25 p-25",
				children: [(0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex flex-col flex-shrink-0 gap-20",
					children: [
						(0, import_jsx_runtime$12.jsx)("div", {
							className: "overflow-hidden rounded-4xl w-120 h-160",
							children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
								src: props.mainCover,
								alt: props.title,
								className: "object-cover w-full h-full select-text"
							})
						}),
						props.upInfo && (0, import_jsx_runtime$12.jsxs)("div", {
							className: "flex gap-12 items-center mt-15",
							children: [(0, import_jsx_runtime$12.jsxs)("div", {
								className: "relative",
								children: [
									(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
										className: "w-28 h-28 rounded-full select-text",
										src: `https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`,
										alt: props.upInfo.uname
									}),
									props.upInfo.avatar_subscript_url && (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
										className: "absolute -right-1 -bottom-1 w-8 h-8 select-text",
										src: props.upInfo.avatar_subscript_url,
										alt: "头像角标"
									}),
									props.upInfo.pendant?.image && (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
										className: "absolute inset-0 w-full h-full transform select-text scale-160",
										src: props.upInfo.pendant.image,
										alt: props.upInfo.pendant.name || "挂件"
									})
								]
							}), (0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex flex-col gap-4",
								children: [
									(0, import_jsx_runtime$12.jsxs)("div", {
										className: "flex gap-3 items-center",
										children: [
											(0, import_jsx_runtime$12.jsx)("div", {
												className: "text-4xl font-medium select-text",
												style: { color: 1 === props.upInfo.vip_status ? props.upInfo.nickname_color || "#FB7299" : "#EDEDED" },
												children: props.upInfo.uname
											}),
											props.upInfo.verify_type > 0 && (0, import_jsx_runtime$12.jsx)("div", {
												className: "flex items-center",
												children: 1 === props.upInfo.verify_type ? (0, import_jsx_runtime$12.jsx)(Shield, {
													size: 20,
													className: "text-warning"
												}) : (0, import_jsx_runtime$12.jsx)(Crown, {
													size: 20,
													className: "text-primary"
												})
											}),
											1 === props.upInfo.vip_status && props.upInfo.vip_label?.text && (0, import_jsx_runtime$12.jsx)(chip_default, {
												size: "sm",
												className: "px-2 py-1 text-xs select-text",
												style: {
													backgroundColor: props.upInfo.vip_label.bg_color || "#FB7299",
													color: props.upInfo.vip_label.text_color || "#FFFFFF",
													borderColor: props.upInfo.vip_label.border_color || "transparent"
												},
												children: props.upInfo.vip_label.text
											})
										]
									}),
									(0, import_jsx_runtime$12.jsxs)("div", {
										className: "flex gap-6 items-center text-3xl select-text text-foreground",
										children: [
											(0, import_jsx_runtime$12.jsx)(Users, { size: 30 }),
											(0, import_jsx_runtime$12.jsxs)("span", { children: [formatNumber$2(props.upInfo.follower), "粉丝"] }),
											1 === props.upInfo.is_follow && (0, import_jsx_runtime$12.jsx)(chip_default, {
												size: "sm",
												color: "primary",
												variant: "flat",
												className: "text-xs select-text",
												children: "已关注"
											})
										]
									}),
									(0, import_jsx_runtime$12.jsxs)("div", {
										className: "flex gap-2 items-center text-2xl select-text text-foreground-600",
										children: [(0, import_jsx_runtime$12.jsx)(Hash, { size: 20 }), (0, import_jsx_runtime$12.jsxs)("span", { children: ["UID: ", props.upInfo.mid] })]
									})
								]
							})]
						}),
						(0, import_jsx_runtime$12.jsxs)("div", {
							className: "flex text-3xl select-text text-foreground",
							children: [
								(0, import_jsx_runtime$12.jsx)("span", { children: "提示：请在120秒内发送" }),
								(0, import_jsx_runtime$12.jsx)(code_default, {
									size: "lg",
									color: "danger",
									children: " 第 ？ 集 "
								}),
								(0, import_jsx_runtime$12.jsx)("span", { children: "选择集数" })
							]
						})
					]
				}), (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex flex-col flex-1 justify-between text-foreground",
					children: [(0, import_jsx_runtime$12.jsxs)("div", { children: [
						(0, import_jsx_runtime$12.jsx)("div", {
							className: "mb-8 text-8xl font-bold leading-tight select-text",
							children: props.title
						}),
						props.subtitle && (0, import_jsx_runtime$12.jsx)("div", {
							className: "mb-12 text-4xl select-text text-foreground",
							children: props.subtitle
						}),
						props.styles && props.styles.length > 0 && (0, import_jsx_runtime$12.jsx)("div", {
							className: "flex flex-wrap gap-8 mb-12",
							children: props.styles.map((style, index) => (0, import_jsx_runtime$12.jsx)(chip_default, {
								radius: "sm",
								size: "lg",
								className: "px-4 py-2 text-3xl backdrop-blur-sm select-text text-foreground bg-content2",
								classNames: { base: "w-32 h-12" },
								children: style
							}, index))
						}),
						actorList.length > 0 && (0, import_jsx_runtime$12.jsxs)("div", {
							className: "mb-12",
							children: [(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground",
								children: [(0, import_jsx_runtime$12.jsx)(Users, { size: 30 }), (0, import_jsx_runtime$12.jsx)("span", { children: "声优阵容" })]
							}), (0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex flex-wrap gap-8",
								children: [actorList.slice(0, 6).map((actor, index) => (0, import_jsx_runtime$12.jsx)("div", {
									className: "text-3xl select-text text-foreground",
									children: actor
								}, index)), actorList.length > 6 && (0, import_jsx_runtime$12.jsxs)("div", {
									className: "text-3xl select-text text-foreground",
									children: [
										"等",
										actorList.length,
										"人"
									]
								})]
							})]
						}),
						props.evaluate && (0, import_jsx_runtime$12.jsxs)("div", {
							className: "mb-12",
							children: [(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground",
								children: [(0, import_jsx_runtime$12.jsx)(Star, { size: 30 }), (0, import_jsx_runtime$12.jsx)("span", { children: "评价" })]
							}), (0, import_jsx_runtime$12.jsx)("div", {
								className: "text-3xl leading-relaxed select-text text-foreground",
								children: props.evaluate
							})]
						})
					] }), (0, import_jsx_runtime$12.jsxs)("div", {
						className: "grid grid-cols-4 gap-16",
						children: [
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$12.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$12.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.views).slice(0, -1)
									}), (0, import_jsx_runtime$12.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.views).slice(-1)
									})]
								}), (0, import_jsx_runtime$12.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "播放"
								})]
							}),
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$12.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$12.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.favorites).slice(0, -1)
									}), (0, import_jsx_runtime$12.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.favorites).slice(-1)
									})]
								}), (0, import_jsx_runtime$12.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "收藏"
								})]
							}),
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$12.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$12.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.danmakus).slice(0, -1)
									}), (0, import_jsx_runtime$12.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.danmakus).slice(-1)
									})]
								}), (0, import_jsx_runtime$12.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "弹幕"
								})]
							}),
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$12.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$12.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.coins).slice(0, -1)
									}), (0, import_jsx_runtime$12.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.coins).slice(-1)
									})]
								}), (0, import_jsx_runtime$12.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "投币"
								})]
							})
						]
					})]
				})]
			})
		});
	}, BangumiBilibiliEpisodes = (props) => {
		const sortedEpisodes = [...props.Episodes].sort((a, b) => b.pub_time - a.pub_time), groupedEpisodes = sortedEpisodes.reduce((groups, episode) => {
			const date = /* @__PURE__ */ new Date(1e3 * episode.pub_time), dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
			return groups[dateKey] || (groups[dateKey] = []), groups[dateKey].push(episode), groups;
		}, {}), dateKeys = Object.keys(groupedEpisodes).sort((a, b) => b.localeCompare(a)), flattenedEpisodes = [];
		return dateKeys.forEach((dateIndex) => {
			const episodesInDate = groupedEpisodes[dateIndex];
			episodesInDate.forEach((episode, episodeIndex) => {
				flattenedEpisodes.push({
					episode,
					isFirstOfDate: 0 === episodeIndex,
					isLastOfDate: episodeIndex === episodesInDate.length - 1,
					isLastOfAll: !1,
					dateKey: dateIndex,
					episodesInSameDate: episodesInDate.length
				});
			});
		}), flattenedEpisodes.length > 0 && (flattenedEpisodes[flattenedEpisodes.length - 1].isLastOfAll = !0), (0, import_jsx_runtime$12.jsxs)("div", {
			className: "px-10",
			children: [(0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex gap-8 items-center mb-20 text-5xl font-bold select-text text-foreground",
				children: [
					(0, import_jsx_runtime$12.jsx)(Play, { size: 46 }),
					(0, import_jsx_runtime$12.jsx)("span", { children: "剧集列表" }),
					(0, import_jsx_runtime$12.jsxs)(chip_default, {
						size: "lg",
						color: "danger",
						variant: "flat",
						className: "px-4 py-2 text-4xl select-text",
						classNames: { base: "h-18" },
						children: [
							"共",
							sortedEpisodes.length,
							"集"
						]
					})
				]
			}), (0, import_jsx_runtime$12.jsx)("div", { children: flattenedEpisodes.map((item) => {
				const { episode, isFirstOfDate, isLastOfAll, episodesInSameDate, isLastOfDate } = item, { month, day } = formatDateParts(episode.pub_time), episodeNumber = sortedEpisodes.findIndex((e) => e.bvid === episode.bvid), actualEpisodeNumber = sortedEpisodes.length - episodeNumber;
				return (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex gap-15",
					children: [(0, import_jsx_runtime$12.jsx)("div", {
						className: "flex flex-col flex-shrink-0 items-center w-20",
						children: isFirstOfDate ? (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
							(0, import_jsx_runtime$12.jsx)("div", {
								className: "text-4xl select-text text-foreground",
								children: month
							}),
							(0, import_jsx_runtime$12.jsx)("div", {
								className: "flex justify-center items-center text-7xl font-bold select-text text-foreground",
								children: day
							}),
							!isLastOfAll && (0, import_jsx_runtime$12.jsx)("div", { className: clsx_default("mt-8 w-1 bg-divider", episodesInSameDate > 1 ? "h-110" : "h-95") })
						] }) : (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
							(0, import_jsx_runtime$12.jsx)("div", { className: "w-1 h-10 bg-divider" }),
							(0, import_jsx_runtime$12.jsx)("div", { className: "my-2 w-4 h-4 rounded-full bg-divider" }),
							(!isLastOfAll || episodesInSameDate > 1) && (0, import_jsx_runtime$12.jsx)("div", { className: clsx_default("w-1 bg-divider", isLastOfDate ? "h-110" : "h-130") })
						] })
					}), (0, import_jsx_runtime$12.jsxs)("div", {
						className: clsx_default("flex-1 min-w-0", !isLastOfAll && isLastOfDate && "mb-20"),
						children: [(0, import_jsx_runtime$12.jsxs)("div", {
							className: "flex justify-between items-center mb-10",
							children: [(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex flex-shrink-0 gap-8 items-center",
								children: [(0, import_jsx_runtime$12.jsx)("div", {
									className: "relative",
									children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
										className: "w-32 h-32 rounded-full select-text",
										src: `https://images.weserv.nl/?url=${encodeURIComponent(props.UPInfo ? props.UPInfo.avatar : props.mainCover)}`,
										alt: ""
									})
								}), (0, import_jsx_runtime$12.jsxs)("div", {
									className: "flex flex-col gap-6",
									children: [(0, import_jsx_runtime$12.jsx)("div", {
										className: "text-4xl font-bold select-text text-foreground-700",
										children: props.UPInfo ? props.UPInfo.uname : props.Title
									}), (0, import_jsx_runtime$12.jsxs)("div", {
										className: "flex gap-4 items-center text-3xl select-text text-foreground-600",
										children: [(0, import_jsx_runtime$12.jsx)(Calendar, { size: 30 }), (0, import_jsx_runtime$12.jsx)("span", { children: "发布了内容" })]
									})]
								})]
							}), (0, import_jsx_runtime$12.jsx)("div", {
								className: "flex-shrink-0 pr-20",
								children: (0, import_jsx_runtime$12.jsxs)("div", {
									className: "text-5xl font-semibold select-text text-foreground-600",
									children: [
										"第",
										actualEpisodeNumber,
										"集"
									]
								})
							})]
						}), (0, import_jsx_runtime$12.jsx)("div", {
							className: "overflow-hidden shadow-large bg-content1 rounded-4xl",
							children: (0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-12 p-12",
								children: [(0, import_jsx_runtime$12.jsx)("div", {
									className: "relative flex-shrink-0",
									children: (0, import_jsx_runtime$12.jsxs)("div", {
										className: "overflow-hidden relative h-64 rounded-3xl w-112",
										children: [(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
											src: episode.cover,
											alt: `第${actualEpisodeNumber}集 ${episode.long_title}`,
											className: "object-cover w-full h-full select-text"
										}), episode.badge && (0, import_jsx_runtime$12.jsx)(chip_default, {
											radius: "lg",
											size: "lg",
											className: "absolute top-3 right-3 py-1 text-2xl font-medium select-text",
											style: {
												backgroundColor: episode.badge_info?.bg_color || "#FB7299",
												color: "#FFFFFF"
											},
											children: episode.badge_info?.text || episode.badge
										})]
									})
								}), (0, import_jsx_runtime$12.jsxs)("div", {
									className: "flex flex-col flex-1 justify-center h-64",
									children: [(0, import_jsx_runtime$12.jsx)("div", {
										className: "mb-8 text-5xl font-semibold select-text text-foreground line-clamp-2",
										children: episode.long_title
									}), (0, import_jsx_runtime$12.jsxs)("div", {
										className: "space-y-4 text-4xl",
										children: [
											(0, import_jsx_runtime$12.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$12.jsx)(Hash, { size: 36 }), (0, import_jsx_runtime$12.jsx)("span", {
													className: "truncate",
													children: episode.bvid
												})]
											}),
											(0, import_jsx_runtime$12.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$12.jsx)(Clock, { size: 36 }), (0, import_jsx_runtime$12.jsx)("span", {
													className: "whitespace-nowrap",
													children: formatDateTime(episode.pub_time)
												})]
											}),
											(0, import_jsx_runtime$12.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$12.jsx)(Share2, { size: 36 }), (0, import_jsx_runtime$12.jsx)("span", {
													className: "truncate",
													children: episode.link
												})]
											})
										]
									})]
								})]
							})
						})]
					})]
				}, episode.bvid);
			}) })]
		});
	}, (BangumiBilibili = import_react$13.memo((props) => (0, import_jsx_runtime$12.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$12.jsxs)("div", {
			className: "p-4",
			children: [(0, import_jsx_runtime$12.jsx)(BangumiBilibiliHeader, {
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
			}), (0, import_jsx_runtime$12.jsx)(BangumiBilibiliEpisodes, { ...props.data })]
		})
	}))).displayName = "BangumiBilibili", bangumi_default = BangumiBilibili;
}), DYNAMIC_TYPE_DRAW_exports = __export({
	BilibiliDrawDynamic: () => BilibiliDrawDynamic,
	default: () => DYNAMIC_TYPE_DRAW_default
}), init_DYNAMIC_TYPE_DRAW = __esmMin(() => {
	init_clsx(), init_lucide_react(), import_react$12 = __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$11 = __toESM(require_jsx_runtime()), BilibiliDynamicUserInfo = (props) => (0, import_jsx_runtime$11.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$11.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$11.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "头像",
					className: "w-32 h-32 rounded-full shadow-medium",
					isCircular: !0
				}), props.frame && (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$11.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$11.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$11.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.create_time]
				})]
			}),
			props.decoration_card && (0, import_jsx_runtime$11.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$11.jsx)("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } })
			})
		]
	}), BilibiliDynamicContent = (props) => {
		const layoutType = (() => {
			if (!props.image_url || 0 === props.image_url.length) return "auto";
			switch (props.imageLayout) {
				case "vertical": return "vertical";
				case "waterfall": return "waterfall";
				case "grid": return "grid";
				default: return props.image_url.length <= 4 ? "vertical" : props.image_url.length >= 9 ? "grid" : "waterfall";
			}
		})();
		return (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [(0, import_jsx_runtime$11.jsxs)("div", {
			className: "flex flex-col px-20 w-full leading-relaxed",
			children: [(0, import_jsx_runtime$11.jsx)("div", {
				className: "relative items-center text-5xl tracking-wider break-words text-foreground",
				children: (0, import_jsx_runtime$11.jsx)(CommentText, {
					className: clsx_default("text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text", "[&_svg]:inline [&_svg]:!mb-4", "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"),
					content: props.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}), (0, import_jsx_runtime$11.jsx)("div", { className: "h-15" })]
		}), props.image_url && Array.isArray(props.image_url) && props.image_url.length > 0 && (0, import_jsx_runtime$11.jsxs)("div", {
			className: "px-20",
			children: [
				"grid" === layoutType && (0, import_jsx_runtime$11.jsx)("div", {
					className: "grid grid-cols-3 gap-4 w-full",
					children: props.image_url.slice(0, 9).map((img, index) => (0, import_jsx_runtime$11.jsx)("div", {
						className: "overflow-hidden rounded-2xl aspect-square shadow-medium",
						children: (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
							src: img.image_src,
							alt: `图片${index + 1}`,
							className: "object-cover w-full h-full"
						})
					}, index))
				}),
				"waterfall" === layoutType && (0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex gap-4 w-full",
					children: [(0, import_jsx_runtime$11.jsx)("div", {
						className: "flex flex-col flex-1 gap-4",
						children: props.image_url.filter((_, index) => index % 2 == 0).map((img, arrayIndex) => {
							const originalIndex = 2 * arrayIndex;
							return (0, import_jsx_runtime$11.jsx)("div", {
								className: "overflow-hidden rounded-2xl shadow-medium",
								children: (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
									src: img.image_src,
									alt: `图片${originalIndex + 1}`,
									className: "object-cover w-full h-auto"
								})
							}, originalIndex);
						})
					}), (0, import_jsx_runtime$11.jsx)("div", {
						className: "flex flex-col flex-1 gap-4",
						children: props.image_url.filter((_, index) => index % 2 == 1).map((img, arrayIndex) => {
							const originalIndex = 2 * arrayIndex + 1;
							return (0, import_jsx_runtime$11.jsx)("div", {
								className: "overflow-hidden rounded-2xl shadow-medium",
								children: (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
									src: img.image_src,
									alt: `图片${originalIndex + 1}`,
									className: "object-cover w-full h-auto"
								})
							}, originalIndex);
						})
					})]
				}),
				"vertical" === layoutType && props.image_url.map((img, index) => (0, import_jsx_runtime$11.jsxs)(import_react$12.Fragment, { children: [(0, import_jsx_runtime$11.jsx)("div", {
					className: "flex flex-col items-center",
					children: (0, import_jsx_runtime$11.jsx)("div", {
						className: "flex overflow-hidden flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
						children: (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
							src: img.image_src,
							alt: "封面",
							className: "object-contain w-full h-full rounded-3xl"
						})
					})
				}), (0, import_jsx_runtime$11.jsx)("div", { className: "h-18" })] }, index)),
				("waterfall" === layoutType || "grid" === layoutType) && (0, import_jsx_runtime$11.jsx)("div", { className: "h-18" })
			]
		})] });
	}, BilibiliDynamicStatus = (props) => (0, import_jsx_runtime$11.jsxs)("div", {
		className: "flex flex-col gap-10 px-20 w-full leading-relaxed",
		children: [
			(0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$11.jsx)(Heart, {
								size: 48,
								className: "text-like"
							}),
							props.dianzan,
							"点赞"
						]
					}),
					(0, import_jsx_runtime$11.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$11.jsx)(MessageCircle, {
								size: 48,
								className: "text-primary text-comment"
							}),
							props.pinglun,
							"评论"
						]
					}),
					(0, import_jsx_runtime$11.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$11.jsx)(Share2, {
								size: 48,
								className: "text-success"
							}),
							props.share,
							"分享"
						]
					})
				]
			}),
			(0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$11.jsx)(Clock, {
						size: 48,
						className: "text-time"
					}),
					"图片生成时间: ",
					props.render_time
				]
			}),
			(0, import_jsx_runtime$11.jsx)("div", { className: "h-3" })
		]
	}), BilibiliDynamicFooter = (props) => (0, import_jsx_runtime$11.jsx)("div", {
		className: "flex flex-col h-full",
		children: (0, import_jsx_runtime$11.jsxs)("div", {
			className: "flex justify-between items-center h-auto pt-25",
			children: [(0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex flex-col self-start pl-16",
				children: [
					(0, import_jsx_runtime$11.jsx)("div", {
						className: "flex items-center text-6xl text-foreground-600",
						children: (0, import_jsx_runtime$11.jsx)("img", {
							src: "/image/bilibili/bilibili-light.png",
							alt: "B站Logo",
							className: "h-auto w-120"
						})
					}),
					(0, import_jsx_runtime$11.jsx)("br", {}),
					(0, import_jsx_runtime$11.jsx)("span", {
						className: "text-5xl select-text text-foreground-600",
						children: "长按识别二维码即可查看全文"
					}),
					(0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider select-text text-foreground-600",
						children: [
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Hash, {
									size: 36,
									className: "text-foreground-600"
								}), (0, import_jsx_runtime$11.jsxs)("span", { children: ["UID: ", props.user_shortid] })]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Heart, {
									size: 36,
									className: "text-like"
								}), (0, import_jsx_runtime$11.jsxs)("span", { children: ["获赞: ", props.total_favorited] })]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Eye, {
									size: 36,
									className: "text-view"
								}), (0, import_jsx_runtime$11.jsxs)("span", { children: ["关注: ", props.following_count] })]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Users, {
									size: 36,
									className: "text-follow"
								}), (0, import_jsx_runtime$11.jsxs)("span", { children: ["粉丝: ", props.fans] })]
							})
						]
					})
				]
			}), (0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex flex-col-reverse items-center -mb-12 mr-19",
				children: [(0, import_jsx_runtime$11.jsx)("div", {
					className: "mt-5 ml-3 text-5xl text-right select-text text-foreground-600",
					children: props.dynamicTYPE
				}), (0, import_jsx_runtime$11.jsx)("div", {
					className: "p-3 rounded-sm border-8 border-dashed border-divider",
					children: props.qrCodeDataUrl ? (0, import_jsx_runtime$11.jsx)("img", {
						src: props.qrCodeDataUrl,
						alt: "二维码",
						className: "h-auto w-88"
					}) : (0, import_jsx_runtime$11.jsx)("div", {
						className: "flex justify-center items-center rounded bg-content2 w-88 h-88",
						children: (0, import_jsx_runtime$11.jsx)("span", {
							className: "text-foreground-400",
							children: "二维码"
						})
					})
				})]
			})]
		})
	}), (BilibiliDrawDynamic = import_react$12.memo((props) => (0, import_jsx_runtime$11.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$11.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$11.jsx)(BilibiliDynamicUserInfo, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					create_time: props.data.create_time,
					decoration_card: props.data.decoration_card
				}),
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$11.jsx)(BilibiliDynamicContent, {
					text: props.data.text,
					image_url: props.data.image_url,
					imageLayout: props.data.imageLayout
				}),
				(0, import_jsx_runtime$11.jsx)(BilibiliDynamicStatus, {
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					render_time: props.data.render_time
				}),
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$11.jsx)(BilibiliDynamicFooter, {
					user_shortid: props.data.user_shortid,
					total_favorited: props.data.total_favorited,
					following_count: props.data.following_count,
					fans: props.data.fans,
					dynamicTYPE: props.data.dynamicTYPE,
					share_url: props.data.share_url,
					qrCodeDataUrl: props.qrCodeDataUrl
				})
			]
		})
	}))).displayName = "BilibiliDrawDynamic", DYNAMIC_TYPE_DRAW_default = BilibiliDrawDynamic;
}), DYNAMIC_TYPE_AV_exports = __export({
	BilibiliVideoDynamic: () => BilibiliVideoDynamic,
	default: () => DYNAMIC_TYPE_AV_default
}), init_DYNAMIC_TYPE_AV = __esmMin(() => {
	init_lucide_react(), import_react$11 = __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$10 = __toESM(require_jsx_runtime()), BilibiliVideoDynamicHeader = () => (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
		(0, import_jsx_runtime$10.jsx)("div", { className: "h-20" }),
		(0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex items-center pl-20 text-6xl text-default-500",
			children: [(0, import_jsx_runtime$10.jsx)("img", {
				src: "/image/bilibili/bilibili.png",
				alt: "bilibili",
				className: "h-auto w-120"
			}), (0, import_jsx_runtime$10.jsx)("span", {
				className: "ml-8 text-5xl select-text",
				children: "你感兴趣的视频都在哔哩哔哩"
			})]
		}),
		(0, import_jsx_runtime$10.jsx)("div", { className: "h-20" })
	] }), BilibiliVideoDynamicContent = (props) => (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [props.image_url && (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [(0, import_jsx_runtime$10.jsx)("div", {
		className: "flex flex-col items-center",
		children: (0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
			children: [(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
				src: props.image_url,
				alt: "封面",
				className: "object-contain w-full h-full rounded-3xl"
			}), (0, import_jsx_runtime$10.jsx)("div", {
				className: "flex absolute bottom-12 right-16",
				children: (0, import_jsx_runtime$10.jsx)("img", {
					src: "/image/bilibili/play.svg",
					alt: "播放图标",
					className: "w-40 h-40"
				})
			})]
		})
	}), (0, import_jsx_runtime$10.jsx)("div", { className: "h-5" })] }), (0, import_jsx_runtime$10.jsxs)("div", {
		className: "flex flex-col w-full leading-relaxed px-21",
		children: [
			(0, import_jsx_runtime$10.jsx)("div", {
				className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground",
				children: (0, import_jsx_runtime$10.jsx)(CommentText, {
					className: "text-[80px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
					content: props.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}),
			(0, import_jsx_runtime$10.jsx)("div", { className: "h-10" }),
			(0, import_jsx_runtime$10.jsx)("div", {
				className: "text-6xl text-default-500",
				children: (0, import_jsx_runtime$10.jsx)(CommentText, {
					className: "text-[60px] leading-[1.5] whitespace-pre-wrap text-default-500 select-text",
					content: props.desc,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}),
			(0, import_jsx_runtime$10.jsx)("div", { className: "h-30" }),
			(0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex flex-col gap-15 text-default-600",
				children: [(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex flex-col gap-8",
					children: [(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-12 items-center text-5xl font-light tracking-normal",
						children: [
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Heart, {
									size: 48,
									className: "text-like"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: [props.dianzan, "点赞"]
								})]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(MessageCircle, {
									size: 48,
									className: "text-comment"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: [props.pinglun, "评论"]
								})]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Share2, {
									size: 48,
									className: "text-success"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: [props.share, "分享"]
								})]
							})
						]
					}), (0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-12 items-center text-5xl font-light tracking-normal",
						children: [
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Coins, {
									size: 48,
									className: "text-warning"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: [props.coin, "硬币"]
								})]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Eye, {
									size: 48,
									className: "text-default-400 text-view"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: [props.view, "浏览"]
								})]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-3 items-center text-5xl font-light tracking-normal",
								children: [(0, import_jsx_runtime$10.jsx)(Clock, {
									size: 48,
									className: "text-time"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: ["视频时长: ", props.duration_text]
								})]
							})
						]
					})]
				}), (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex flex-col gap-4 text-4xl font-light",
					children: [(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-3 items-center whitespace-nowrap",
						children: [(0, import_jsx_runtime$10.jsx)(Clock, {
							size: 32,
							className: "text-time"
						}), (0, import_jsx_runtime$10.jsxs)("span", {
							className: "select-text",
							children: ["发布于", props.create_time]
						})]
					}), (0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-3 items-center",
						children: [(0, import_jsx_runtime$10.jsx)(Hash, {
							size: 32,
							className: "text-default-400"
						}), (0, import_jsx_runtime$10.jsxs)("span", {
							className: "select-text",
							children: ["动态ID: ", props.dynamic_id]
						})]
					})]
				})]
			}),
			(0, import_jsx_runtime$10.jsx)("div", { className: "h-40" })
		]
	})] }), BilibiliVideoDynamicFooter = (props) => (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
		(0, import_jsx_runtime$10.jsx)("div", { className: "h-25" }),
		(0, import_jsx_runtime$10.jsxs)("div", {
			className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500",
			children: ["哔哩哔哩", props.dynamicTYPE]
		}),
		(0, import_jsx_runtime$10.jsx)("div", {
			className: "flex flex-col h-full",
			children: (0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex justify-between items-center h-auto pt-25",
				children: [(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex flex-col items-center pl-12",
					style: { padding: "0 0 0 50px" },
					children: [(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-8 items-center",
						children: [(0, import_jsx_runtime$10.jsxs)("div", {
							className: "relative",
							children: [(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
								src: props.avatar_url,
								alt: "头像",
								className: "rounded-full shadow-medium w-50 h-50",
								isCircular: !0
							}), props.frame && (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
								src: props.frame,
								alt: "头像框",
								className: "absolute inset-0 transform scale-180"
							})]
						}), (0, import_jsx_runtime$10.jsx)("div", {
							className: "flex flex-col",
							children: (0, import_jsx_runtime$10.jsx)("div", {
								className: "text-7xl font-bold select-text text-foreground",
								children: (0, import_jsx_runtime$10.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
							})
						})]
					}), (0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex flex-col gap-4 items-start pt-10 w-full text-4xl tracking-wider text-default-600",
						children: [
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Hash, {
									size: 32,
									className: "text-default-400"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: ["UID: ", props.user_shortid]
								})]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Heart, {
									size: 32,
									className: "text-like"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: ["获赞: ", props.total_favorited]
								})]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Eye, {
									size: 32,
									className: "text-default-400 text-view"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: ["关注: ", props.following_count]
								})]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Users, {
									size: 32,
									className: "text-primary"
								}), (0, import_jsx_runtime$10.jsxs)("span", {
									className: "select-text",
									children: ["粉丝: ", props.fans]
								})]
							})
						]
					})]
				}), (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex flex-col-reverse items-center -mb-12 mr-19",
					children: [(0, import_jsx_runtime$10.jsx)("div", {
						className: "mt-5 ml-3 text-5xl text-right select-text text-default-600",
						children: "动态分享链接"
					}), (0, import_jsx_runtime$10.jsx)("div", {
						className: "p-3 rounded-sm border-8 border-dashed border-default-300",
						children: props.qrCodeDataUrl ? (0, import_jsx_runtime$10.jsx)("img", {
							src: props.qrCodeDataUrl,
							alt: "二维码",
							className: "h-auto w-88"
						}) : (0, import_jsx_runtime$10.jsx)("div", {
							className: "flex justify-center items-center rounded bg-default-100 w-88 h-88",
							children: (0, import_jsx_runtime$10.jsx)("span", {
								className: "text-default-400",
								children: "二维码"
							})
						})
					})]
				})]
			})
		})
	] }), (BilibiliVideoDynamic = import_react$11.memo((props) => (0, import_jsx_runtime$10.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$10.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$10.jsx)(BilibiliVideoDynamicHeader, {}),
				(0, import_jsx_runtime$10.jsx)(BilibiliVideoDynamicContent, {
					text: props.data.text,
					desc: props.data.desc,
					image_url: props.data.image_url,
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					coin: props.data.coin,
					view: props.data.view,
					duration_text: props.data.duration_text,
					create_time: props.data.create_time,
					dynamic_id: props.data.dynamic_id
				}),
				(0, import_jsx_runtime$10.jsx)(BilibiliVideoDynamicFooter, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					user_shortid: props.data.user_shortid,
					total_favorited: props.data.total_favorited,
					following_count: props.data.following_count,
					fans: props.data.fans,
					dynamicTYPE: props.data.dynamicTYPE,
					share_url: props.data.share_url,
					qrCodeDataUrl: props.qrCodeDataUrl
				})
			]
		})
	}))).displayName = "BilibiliVideoDynamic", DYNAMIC_TYPE_AV_default = BilibiliVideoDynamic;
}), DYNAMIC_TYPE_FORWARD_exports = __export({
	BilibiliForwardDynamic: () => BilibiliForwardDynamic,
	default: () => DYNAMIC_TYPE_FORWARD_default
}), init_DYNAMIC_TYPE_FORWARD = __esmMin(() => {
	init_clsx(), init_lucide_react(), import_react$10 = __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$9 = __toESM(require_jsx_runtime()), BilibiliForwardUserInfo = (props) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$9.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$9.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "头像",
					className: "w-36 h-36 rounded-full shadow-medium",
					isCircular: !0
				}), props.frame && (0, import_jsx_runtime$9.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$9.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$9.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$9.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$9.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$9.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.create_time]
				})]
			}),
			props.decoration_card && (0, import_jsx_runtime$9.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$9.jsx)("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } })
			})
		]
	}), OriginalUserInfo = (props) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "flex gap-10 items-center pt-5 pb-10 pl-10",
		children: [
			(0, import_jsx_runtime$9.jsxs)("div", {
				className: "relative flex-shrink-0",
				children: [(0, import_jsx_runtime$9.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "转发用户头像",
					className: "rounded-full shadow-medium w-30 h-30"
				}), props.frame && (0, import_jsx_runtime$9.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "转发用户头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$9.jsxs)("div", {
				className: "flex flex-col gap-4 text-7xl",
				children: [(0, import_jsx_runtime$9.jsx)("div", {
					className: "text-5xl font-normal select-text text-foreground",
					children: (0, import_jsx_runtime$9.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$9.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$9.jsx)(Clock, {
						size: 32,
						className: "text-time"
					}), props.create_time]
				})]
			}),
			props.decoration_card && (0, import_jsx_runtime$9.jsx)("div", {
				className: "ml-39",
				children: (0, import_jsx_runtime$9.jsx)("div", {
					className: "font-bilifont",
					dangerouslySetInnerHTML: { __html: props.decoration_card }
				})
			})
		]
	}), OriginalAVContent = ({ content }) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-3xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$9.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$9.jsx)("div", {
				className: "flex flex-col items-center py-11",
				children: (0, import_jsx_runtime$9.jsxs)("div", {
					className: "flex overflow-hidden relative flex-col items-center w-11/12 rounded-2xl rounded-10 aspect-video shadow-large",
					children: [
						(0, import_jsx_runtime$9.jsx)(EnhancedImage, {
							src: content.cover,
							alt: "视频封面",
							className: "object-cover object-center absolute"
						}),
						(0, import_jsx_runtime$9.jsx)("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
						(0, import_jsx_runtime$9.jsxs)("div", {
							className: "absolute right-5 left-12 bottom-14 z-10 text-4xl font-light text-white select-text",
							children: [
								(0, import_jsx_runtime$9.jsx)("span", {
									className: "px-4 py-2 mr-3 text-4xl text-white rounded-2xl bg-black/50",
									children: content.duration_text
								}),
								content.play,
								"观看   ",
								content.danmaku,
								"弹幕"
							]
						})
					]
				})
			}),
			(0, import_jsx_runtime$9.jsx)("div", {
				className: "pb-10 pl-8 text-6xl font-bold select-text leading-20 text-foreground",
				children: (0, import_jsx_runtime$9.jsx)("span", { dangerouslySetInnerHTML: { __html: content.title } })
			})
		]
	}), OriginalDrawContent = ({ content }) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$9.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$9.jsx)("div", {
				className: "py-4",
				children: (0, import_jsx_runtime$9.jsx)("div", {
					className: "text-5xl leading-relaxed text-foreground",
					children: (0, import_jsx_runtime$9.jsx)(CommentText, {
						className: clsx_default("text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text", "[&_svg]:inline [&_svg]:!mb-4"),
						content: content.text,
						style: {
							wordBreak: "break-word",
							overflowWrap: "break-word"
						}
					})
				})
			}),
			content.image_url && 1 === content.image_url.length ? (0, import_jsx_runtime$9.jsx)("div", {
				className: "flex justify-center py-11",
				children: (0, import_jsx_runtime$9.jsx)("div", {
					className: "flex overflow-hidden flex-col items-center w-11/12 rounded-6 shadow-large",
					children: (0, import_jsx_runtime$9.jsx)(EnhancedImage, {
						src: content.image_url[0].image_src,
						alt: "图片",
						className: "object-cover w-full h-full rounded-6"
					})
				})
			}) : (0, import_jsx_runtime$9.jsx)("div", {
				className: "grid grid-cols-3 gap-4 p-4",
				children: content.image_url?.map((img, index) => (0, import_jsx_runtime$9.jsx)("div", {
					className: "overflow-hidden relative shadow-medium aspect-square rounded-2",
					children: (0, import_jsx_runtime$9.jsx)(EnhancedImage, {
						src: img.image_src,
						alt: `图片${index + 1}`,
						className: "object-cover absolute top-0 left-0 w-full h-full"
					})
				}, index))
			}),
			(0, import_jsx_runtime$9.jsx)("div", { className: "h-4" })
		]
	}), OriginalWordContent = ({ content }) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [(0, import_jsx_runtime$9.jsx)(OriginalUserInfo, {
			avatar_url: content.avatar_url,
			frame: content.frame,
			username: content.username,
			create_time: content.create_time,
			decoration_card: content.decoration_card
		}), (0, import_jsx_runtime$9.jsx)("div", {
			className: "py-4",
			children: (0, import_jsx_runtime$9.jsx)("div", {
				className: "text-5xl leading-relaxed text-foreground",
				children: (0, import_jsx_runtime$9.jsx)(CommentText, {
					className: "text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
					content: content.text
				})
			})
		})]
	}), OriginalLiveRcmdContent = ({ content }) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$9.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$9.jsx)("div", {
				className: "flex flex-col items-center py-11",
				children: (0, import_jsx_runtime$9.jsxs)("div", {
					className: "flex overflow-hidden relative flex-col items-center w-full rounded-10 aspect-video shadow-large",
					children: [
						(0, import_jsx_runtime$9.jsx)(EnhancedImage, {
							src: content.cover,
							alt: "直播封面",
							className: "object-cover absolute w-full h-full"
						}),
						(0, import_jsx_runtime$9.jsx)("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
						(0, import_jsx_runtime$9.jsxs)("div", {
							className: "absolute right-5 bottom-8 left-12 z-10 text-4xl font-light text-white select-text",
							children: [
								(0, import_jsx_runtime$9.jsx)("span", {
									className: "px-4 py-2 mr-3 text-4xl text-white bg-black/50 rounded-3",
									children: content.area_name
								}),
								content.text_large,
								"   在线: ",
								content.online
							]
						})
					]
				})
			}),
			(0, import_jsx_runtime$9.jsx)("div", {
				className: "pl-8 text-6xl font-bold select-text text-foreground",
				children: (0, import_jsx_runtime$9.jsx)("span", { dangerouslySetInnerHTML: { __html: content.title } })
			})
		]
	}), BilibiliForwardContent = (props) => (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
		(0, import_jsx_runtime$9.jsxs)("div", {
			className: "flex flex-col px-20 w-full leading-relaxed",
			children: [(0, import_jsx_runtime$9.jsx)("div", {
				className: "relative items-center text-5xl tracking-wider break-words text-foreground",
				children: (0, import_jsx_runtime$9.jsx)(CommentText, {
					className: clsx_default("text-[65px] tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground mb-[20px] select-text", "[&_svg]:inline [&_svg]:!mb-4", "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"),
					content: props.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}), props.imgList && 0 === props.imgList.length && (0, import_jsx_runtime$9.jsx)("div", { className: "h-15" })]
		}),
		props.imgList && props.imgList.length > 0 && (0, import_jsx_runtime$9.jsx)("div", {
			className: "flex flex-col items-center px-20 w-full",
			children: props.imgList.map((img, idx) => (0, import_jsx_runtime$9.jsxs)(import_react$10.Fragment, { children: [(0, import_jsx_runtime$9.jsx)("div", {
				className: "flex overflow-hidden relative flex-col items-center rounded-3xl shadow-large",
				children: (0, import_jsx_runtime$9.jsx)(EnhancedImage, {
					src: img,
					alt: `图片${idx + 1}`,
					className: "object-contain w-full h-full rounded-3xl"
				})
			}), (0, import_jsx_runtime$9.jsx)("div", { className: "h-10" })] }, `${img}-${idx}`))
		}),
		(0, import_jsx_runtime$9.jsxs)("div", {
			className: "flex px-20",
			children: [
				props.original_content.DYNAMIC_TYPE_AV && (0, import_jsx_runtime$9.jsx)(OriginalAVContent, { content: props.original_content.DYNAMIC_TYPE_AV }),
				props.original_content.DYNAMIC_TYPE_DRAW && (0, import_jsx_runtime$9.jsx)(OriginalDrawContent, { content: props.original_content.DYNAMIC_TYPE_DRAW }),
				props.original_content.DYNAMIC_TYPE_WORD && (0, import_jsx_runtime$9.jsx)(OriginalWordContent, { content: props.original_content.DYNAMIC_TYPE_WORD }),
				props.original_content.DYNAMIC_TYPE_LIVE_RCMD && (0, import_jsx_runtime$9.jsx)(OriginalLiveRcmdContent, { content: props.original_content.DYNAMIC_TYPE_LIVE_RCMD })
			]
		})
	] }), BilibiliForwardStatus = (props) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "flex flex-col gap-10 px-20 w-full leading-relaxed",
		children: [
			(0, import_jsx_runtime$9.jsxs)("div", {
				className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$9.jsx)(Heart, {
								size: 48,
								className: "text-like"
							}),
							props.dianzan,
							"点赞"
						]
					}),
					(0, import_jsx_runtime$9.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$9.jsx)(MessageCircle, {
								size: 48,
								className: "text-primary text-comment"
							}),
							props.pinglun,
							"评论"
						]
					}),
					(0, import_jsx_runtime$9.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$9.jsx)(Share2, {
								size: 48,
								className: "text-success"
							}),
							props.share,
							"分享"
						]
					})
				]
			}),
			(0, import_jsx_runtime$9.jsxs)("div", {
				className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$9.jsx)(Clock, {
						size: 48,
						className: "text-time"
					}),
					"图片生成时间: ",
					props.render_time
				]
			}),
			(0, import_jsx_runtime$9.jsx)("div", { className: "h-3" })
		]
	}), BilibiliForwardFooter = (props) => (0, import_jsx_runtime$9.jsx)("div", {
		className: "flex flex-col h-full",
		children: (0, import_jsx_runtime$9.jsxs)("div", {
			className: "flex justify-between items-center h-auto pt-25",
			children: [(0, import_jsx_runtime$9.jsxs)("div", {
				className: "flex flex-col self-start pl-16",
				children: [
					(0, import_jsx_runtime$9.jsx)("div", {
						className: "flex items-center text-6xl text-foreground-600",
						children: (0, import_jsx_runtime$9.jsx)("img", {
							src: "/image/bilibili/bilibili-light.png",
							alt: "B站Logo",
							className: "w-80 h-auto"
						})
					}),
					(0, import_jsx_runtime$9.jsx)("br", {}),
					(0, import_jsx_runtime$9.jsx)("span", {
						className: "text-5xl select-text text-foreground-600",
						children: "长按识别二维码即可查看全文"
					}),
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider select-text text-foreground-600",
						children: [
							(0, import_jsx_runtime$9.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$9.jsx)(Hash, {
									size: 36,
									className: "text-foreground-600"
								}), (0, import_jsx_runtime$9.jsxs)("span", { children: ["UID: ", props.user_shortid] })]
							}),
							(0, import_jsx_runtime$9.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$9.jsx)(Heart, {
									size: 36,
									className: "text-like"
								}), (0, import_jsx_runtime$9.jsxs)("span", { children: ["获赞: ", props.total_favorited] })]
							}),
							(0, import_jsx_runtime$9.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$9.jsx)(Eye, {
									size: 36,
									className: "text-view"
								}), (0, import_jsx_runtime$9.jsxs)("span", { children: ["关注: ", props.following_count] })]
							}),
							(0, import_jsx_runtime$9.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$9.jsx)(Users, {
									size: 36,
									className: "text-follow"
								}), (0, import_jsx_runtime$9.jsxs)("span", { children: ["粉丝: ", props.fans] })]
							})
						]
					})
				]
			}), (0, import_jsx_runtime$9.jsxs)("div", {
				className: "flex flex-col-reverse items-center -mb-12 mr-19",
				children: [(0, import_jsx_runtime$9.jsx)("div", {
					className: "mt-5 ml-3 text-5xl text-right select-text text-foreground-600",
					children: props.dynamicTYPE
				}), (0, import_jsx_runtime$9.jsx)("div", {
					className: "p-3 rounded-sm border-8 border-dashed border-divider",
					children: props.qrCodeDataUrl ? (0, import_jsx_runtime$9.jsx)("img", {
						src: props.qrCodeDataUrl,
						alt: "二维码",
						className: "h-auto w-88"
					}) : (0, import_jsx_runtime$9.jsx)("div", {
						className: "flex justify-center items-center rounded bg-content2 w-88 h-88",
						children: (0, import_jsx_runtime$9.jsx)("span", {
							className: "text-foreground-400",
							children: "二维码"
						})
					})
				})]
			})]
		})
	}), (BilibiliForwardDynamic = import_react$10.memo((props) => (0, import_jsx_runtime$9.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$9.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$9.jsx)(BilibiliForwardUserInfo, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					create_time: props.data.create_time,
					decoration_card: props.data.decoration_card
				}),
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$9.jsx)(BilibiliForwardContent, { ...props.data }),
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$9.jsx)(BilibiliForwardStatus, {
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					render_time: props.data.render_time
				}),
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$9.jsx)(BilibiliForwardFooter, {
					user_shortid: props.data.user_shortid,
					total_favorited: props.data.total_favorited,
					following_count: props.data.following_count,
					fans: props.data.fans,
					dynamicTYPE: props.data.dynamicTYPE,
					share_url: props.data.share_url,
					qrCodeDataUrl: props.qrCodeDataUrl
				})
			]
		})
	}))).displayName = "BilibiliForwardDynamic", DYNAMIC_TYPE_FORWARD_default = BilibiliForwardDynamic;
}), DYNAMIC_TYPE_LIVE_RCMD_exports = __export({
	BilibiliLiveDynamic: () => BilibiliLiveDynamic,
	default: () => DYNAMIC_TYPE_LIVE_RCMD_default
}), init_DYNAMIC_TYPE_LIVE_RCMD = __esmMin(() => {
	init_lucide_react(), import_react$9 = __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$8 = __toESM(require_jsx_runtime()), BilibiliLiveDynamicHeader = () => (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
		(0, import_jsx_runtime$8.jsx)("div", { className: "h-5" }),
		(0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex flex-col items-start text-6xl text-default-600",
			children: [(0, import_jsx_runtime$8.jsx)("img", {
				src: "/image/bilibili/bilibili-light.png",
				alt: "哔哩哔哩",
				className: "h-auto w-120"
			}), (0, import_jsx_runtime$8.jsx)("span", {
				className: "pt-10 text-6xl select-text",
				children: "你感兴趣的视频都在B站"
			})]
		}),
		(0, import_jsx_runtime$8.jsx)("div", { className: "h-5" })
	] }), BilibiliLiveDynamicContent = (props) => (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [
		(0, import_jsx_runtime$8.jsx)("div", { className: "h-15" }),
		props.image_url && (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [(0, import_jsx_runtime$8.jsx)("div", {
			className: "flex flex-col items-center",
			children: (0, import_jsx_runtime$8.jsx)("div", {
				className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
				children: (0, import_jsx_runtime$8.jsx)(EnhancedImage, {
					src: props.image_url,
					alt: "封面",
					className: "object-contain w-full h-full rounded-3xl"
				})
			})
		}), (0, import_jsx_runtime$8.jsx)("div", { className: "h-10" })] }),
		(0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex flex-col w-full leading-relaxed px-15",
			children: [
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-3" }),
				(0, import_jsx_runtime$8.jsx)("div", {
					className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground",
					children: (0, import_jsx_runtime$8.jsx)(CommentText, {
						className: "text-[65px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
						content: props.text,
						style: {
							wordBreak: "break-word",
							overflowWrap: "break-word"
						}
					})
				}),
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-10" }),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-2 items-center text-5xl tracking-normal text-default-500",
					children: [(0, import_jsx_runtime$8.jsx)(Radio, {
						size: 48,
						className: "text-primary"
					}), (0, import_jsx_runtime$8.jsx)("span", {
						className: "select-text",
						children: props.liveinf
					})]
				}),
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-5" }),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl tracking-normal text-default-500",
					children: [(0, import_jsx_runtime$8.jsx)(Clock, {
						size: 32,
						className: "text-time"
					}), (0, import_jsx_runtime$8.jsxs)("span", {
						className: "select-text",
						children: ["直播开始时间: ", props.create_time]
					})]
				}),
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-10 items-center",
					children: [(0, import_jsx_runtime$8.jsxs)("div", {
						className: "relative",
						children: [(0, import_jsx_runtime$8.jsx)(EnhancedImage, {
							src: props.avatar_url,
							alt: "头像",
							className: "w-32 h-32 rounded-full shadow-medium",
							isCircular: !0
						}), props.frame && (0, import_jsx_runtime$8.jsx)(EnhancedImage, {
							src: props.frame,
							alt: "头像框",
							className: "absolute inset-0 transform scale-160"
						})]
					}), (0, import_jsx_runtime$8.jsxs)("div", {
						className: "flex flex-col gap-5 items-start",
						children: [(0, import_jsx_runtime$8.jsxs)("div", {
							className: "flex gap-4 items-center",
							children: [(0, import_jsx_runtime$8.jsx)("div", {
								className: "text-6xl font-bold select-text text-foreground",
								children: (0, import_jsx_runtime$8.jsx)(CommentText, { content: props.username })
							}), (0, import_jsx_runtime$8.jsx)("img", {
								className: "w-32 h-auto",
								src: "/image/bilibili/直播中.png",
								alt: "直播中"
							})]
						}), (0, import_jsx_runtime$8.jsxs)("div", {
							className: "flex gap-2 items-center text-4xl text-default-600",
							children: [(0, import_jsx_runtime$8.jsx)(Users, {
								size: 32,
								className: "text-follow"
							}), (0, import_jsx_runtime$8.jsxs)("span", {
								className: "select-text",
								children: [props.fans, "粉丝"]
							})]
						})]
					})]
				}),
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-50" })
			]
		})
	] }), BilibiliLiveDynamicFooter = (props) => (0, import_jsx_runtime$8.jsxs)(import_jsx_runtime$8.Fragment, { children: [(0, import_jsx_runtime$8.jsxs)("div", {
		className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500",
		children: ["哔哩哔哩", props.dynamicTYPE]
	}), (0, import_jsx_runtime$8.jsx)("div", {
		className: "flex flex-col h-full",
		children: (0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex justify-between items-center h-auto pt-25",
			children: [(0, import_jsx_runtime$8.jsx)("div", {
				className: "flex flex-col items-center pl-16",
				children: (0, import_jsx_runtime$8.jsx)(BilibiliLiveDynamicHeader, {})
			}), (0, import_jsx_runtime$8.jsxs)("div", {
				className: "flex flex-col-reverse items-center -mb-12 mr-19",
				children: [(0, import_jsx_runtime$8.jsx)("div", {
					className: "mt-5 ml-3 text-5xl text-right select-text text-default-500",
					children: "动态分享链接"
				}), (0, import_jsx_runtime$8.jsx)("div", {
					className: "p-3 rounded-sm border-8 border-dashed border-default-300",
					children: props.qrCodeDataUrl ? (0, import_jsx_runtime$8.jsx)("img", {
						src: props.qrCodeDataUrl,
						alt: "二维码",
						className: "h-auto w-88"
					}) : (0, import_jsx_runtime$8.jsx)("div", {
						className: "flex justify-center items-center rounded bg-default-100 w-88 h-88",
						children: (0, import_jsx_runtime$8.jsx)("span", {
							className: "text-default-400",
							children: "二维码"
						})
					})
				})]
			})]
		})
	})] }), (BilibiliLiveDynamic = import_react$9.memo((props) => (0, import_jsx_runtime$8.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$8.jsxs)("div", {
			className: "p-4",
			children: [(0, import_jsx_runtime$8.jsx)(BilibiliLiveDynamicContent, {
				image_url: props.data.image_url,
				text: props.data.text,
				liveinf: props.data.liveinf,
				create_time: props.data.create_time,
				username: props.data.username,
				avatar_url: props.data.avatar_url,
				frame: props.data.frame,
				fans: props.data.fans
			}), (0, import_jsx_runtime$8.jsx)(BilibiliLiveDynamicFooter, {
				avatar_url: props.data.avatar_url,
				frame: props.data.frame,
				username: props.data.username,
				fans: props.data.fans,
				dynamicTYPE: props.data.dynamicTYPE,
				share_url: props.data.share_url,
				qrCodeDataUrl: props.qrCodeDataUrl
			})]
		})
	}))).displayName = "BilibiliLiveDynamic", DYNAMIC_TYPE_LIVE_RCMD_default = BilibiliLiveDynamic;
}), videoInfo_exports = __export({
	BilibiliVideoInfo: () => BilibiliVideoInfo,
	default: () => videoInfo_default
}), init_videoInfo = __esmMin(() => {
	init_dist(), init_lucide_react(), import_react$8 = __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$7 = __toESM(require_jsx_runtime()), formatNumber$1 = (num) => num >= 1e4 ? `${(num / 1e4).toFixed(1)}万` : num.toLocaleString(), formatDate$1 = (timestamp) => (/* @__PURE__ */ new Date(1e3 * timestamp)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	}), (StatItem$1 = import_react$8.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$7.jsxs)("div", {
		className: "flex gap-4 items-center",
		children: [
			(0, import_jsx_runtime$7.jsx)("div", {
				className: iconColor,
				children: icon
			}),
			(0, import_jsx_runtime$7.jsx)("span", {
				className: "font-bold text-foreground-900",
				children: formatNumber$1(value)
			}),
			(0, import_jsx_runtime$7.jsx)("span", {
				className: "text-foreground-500",
				children: label
			})
		]
	}))).displayName = "StatItem", (BilibiliVideoInfo = import_react$8.memo((props) => {
		const formattedDate = (0, import_react$8.useMemo)(() => formatDate$1(props.data.ctime), [props.data.ctime]), statsData = (0, import_react$8.useMemo)(() => [
			{
				icon: (0, import_jsx_runtime$7.jsx)(Eye, { size: 48 }),
				value: props.data.stat.view,
				label: "播放",
				iconColor: "text-view"
			},
			{
				icon: (0, import_jsx_runtime$7.jsx)(Heart, { size: 48 }),
				value: props.data.stat.like,
				label: "点赞",
				iconColor: "text-like"
			},
			{
				icon: (0, import_jsx_runtime$7.jsx)(MessageCircle, { size: 48 }),
				value: props.data.stat.reply,
				label: "评论",
				iconColor: "text-comment"
			},
			{
				icon: (0, import_jsx_runtime$7.jsx)(Star, { size: 48 }),
				value: props.data.stat.favorite,
				label: "收藏",
				iconColor: "text-yellow-500"
			}
		], [props.data.stat]);
		return (0, import_jsx_runtime$7.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$7.jsx)("div", { children: (0, import_jsx_runtime$7.jsxs)("div", {
				className: "overflow-hidden transition-all",
				children: [
					(0, import_jsx_runtime$7.jsxs)("div", {
						className: "overflow-hidden relative aspect-video",
						children: [(0, import_jsx_runtime$7.jsx)(EnhancedImage, {
							src: props.data.pic,
							alt: props.data.title,
							className: "object-cover w-full h-full",
							placeholder: "视频封面"
						}), (0, import_jsx_runtime$7.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/20" })]
					}),
					(0, import_jsx_runtime$7.jsxs)("div", {
						className: "p-20 pb-36",
						children: [
							(0, import_jsx_runtime$7.jsx)("h1", {
								className: "mb-8 text-7xl font-bold leading-tight text-foreground-900",
								children: props.data.title
							}),
							(0, import_jsx_runtime$7.jsx)("p", {
								className: "mb-8 text-5xl leading-normal whitespace-pre-wrap text-foreground-700",
								children: props.data.desc
							}),
							(0, import_jsx_runtime$7.jsx)("p", {
								className: "mb-6 text-4xl text-foreground-500",
								children: formattedDate
							})
						]
					}),
					(0, import_jsx_runtime$7.jsxs)("div", {
						className: "px-16",
						children: [
							(0, import_jsx_runtime$7.jsx)("div", {
								className: "grid grid-cols-2 text-5xl gap-18",
								children: statsData.map((stat, index) => (0, import_jsx_runtime$7.jsx)(StatItem$1, {
									icon: stat.icon,
									value: stat.value,
									label: stat.label,
									iconColor: stat.iconColor
								}, index))
							}),
							(0, import_jsx_runtime$7.jsx)("div", { className: "h-18" }),
							(0, import_jsx_runtime$7.jsxs)("div", {
								className: "flex justify-between items-center mb-8 text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$7.jsxs)("div", {
									className: "flex gap-16 items-center",
									children: [(0, import_jsx_runtime$7.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [(0, import_jsx_runtime$7.jsx)(Coins, { size: 48 }), (0, import_jsx_runtime$7.jsx)("span", {
											className: "font-medium",
											children: props.data.stat.coin
										})]
									}), (0, import_jsx_runtime$7.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [(0, import_jsx_runtime$7.jsx)(Share2, { size: 48 }), (0, import_jsx_runtime$7.jsx)("span", {
											className: "font-medium",
											children: props.data.stat.share
										})]
									})]
								}), (0, import_jsx_runtime$7.jsx)("div", {
									className: "transform-gpu scale-[2.5] origin-right mb-8",
									children: (0, import_jsx_runtime$7.jsxs)(chip_default, {
										color: "warning",
										variant: "flat",
										size: "lg",
										radius: "sm",
										children: ["稿件BV号：", props.data.bvid]
									})
								})]
							})
						]
					}),
					(0, import_jsx_runtime$7.jsx)("div", { className: "h-18" }),
					(0, import_jsx_runtime$7.jsx)("div", { className: "h-0.5 bg-default-300" }),
					(0, import_jsx_runtime$7.jsxs)("div", {
						className: "flex justify-between items-center px-16 py-12 pb-0",
						children: [(0, import_jsx_runtime$7.jsxs)("div", {
							className: "flex gap-8 items-center",
							children: [(0, import_jsx_runtime$7.jsx)(EnhancedImage, {
								src: props.data.owner.face,
								alt: props.data.owner.name,
								className: "object-cover w-48 h-48 rounded-full",
								placeholder: props.data.owner.name.charAt(0),
								isCircular: !0
							}), (0, import_jsx_runtime$7.jsxs)("div", {
								className: "flex flex-col gap-6",
								children: [(0, import_jsx_runtime$7.jsx)("p", {
									className: "text-6xl font-semibold text-foreground-900",
									children: props.data.owner.name
								}), (0, import_jsx_runtime$7.jsxs)("p", {
									className: "text-5xl text-foreground-500",
									children: ["ID: ", props.data.owner.mid]
								})]
							})]
						}), (0, import_jsx_runtime$7.jsx)("div", {
							className: "transform-gpu scale-[3.5] origin-right",
							children: (0, import_jsx_runtime$7.jsxs)(button_default, {
								size: "sm",
								className: "bg-[#FF6699] text-default-100 dark:text-default-900",
								children: [(0, import_jsx_runtime$7.jsx)(ExternalLink, { className: "mr-1 w-4 h-4" }), "观看"]
							})
						})]
					})
				]
			}) })
		});
	})).displayName = "BilibiliVideoInfo", videoInfo_default = BilibiliVideoInfo;
}), qrcodeImg_exports = __export({
	BilibiliQrcodeImg: () => BilibiliQrcodeImg,
	default: () => qrcodeImg_default
}), init_qrcodeImg = __esmMin(() => {
	init_lucide_react(), import_react$7 = __toESM(require_react()), init_DefaultLayout(), init_shared(), import_jsx_runtime$6 = __toESM(require_jsx_runtime()), (BilibiliQrcodeImg = import_react$7.memo((props) => {
		const { data, qrCodeDataUrl } = props, { share_url } = data, disclaimer = [
			"免责声明:",
			"您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。",
			"本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。",
			"我方仅提供视频解析及相关哔哩哔哩内容服务,若您的账号封禁、被盗等处罚与我方无关。",
			"害怕风险请勿扫码 ~"
		].join("\n");
		return (0, import_jsx_runtime$6.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$6.jsxs)("div", {
				className: "p-4 px-12 pt-24",
				children: [
					(0, import_jsx_runtime$6.jsxs)("div", {
						className: "flex flex-col gap-6 items-center text-center",
						children: [(0, import_jsx_runtime$6.jsxs)("div", {
							className: "flex gap-4 items-center",
							children: [(0, import_jsx_runtime$6.jsx)(QrCode, { className: "w-12 h-12 text-foreground-600" }), (0, import_jsx_runtime$6.jsx)("h1", {
								className: "text-6xl font-bold text-foreground",
								children: "B站扫码登录"
							})]
						}), (0, import_jsx_runtime$6.jsxs)("div", {
							className: "flex gap-3 items-center text-3xl text-default-600",
							children: [(0, import_jsx_runtime$6.jsx)(Clock, { className: "w-8 h-8" }), (0, import_jsx_runtime$6.jsx)("span", { children: "请在120秒内通过哔哩哔哩APP扫码进行登录" })]
						})]
					}),
					(0, import_jsx_runtime$6.jsx)("div", { className: "h-12" }),
					(0, import_jsx_runtime$6.jsx)("div", {
						className: "flex flex-col items-center",
						children: (0, import_jsx_runtime$6.jsxs)("div", {
							className: "flex overflow-hidden flex-col justify-center items-center p-12",
							children: [qrCodeDataUrl ? (0, import_jsx_runtime$6.jsx)("div", {
								className: "flex justify-center items-center w-120 h-120",
								children: (0, import_jsx_runtime$6.jsx)(EnhancedImage, {
									src: qrCodeDataUrl,
									alt: "登录二维码",
									className: "object-contain w-full h-full"
								})
							}) : (0, import_jsx_runtime$6.jsxs)("div", {
								className: "flex flex-col gap-4 justify-center items-center w-120 h-120",
								children: [(0, import_jsx_runtime$6.jsx)(QrCode, { className: "w-16 h-16 text-default-500" }), (0, import_jsx_runtime$6.jsx)("span", {
									className: "text-2xl text-default-500",
									children: "未提供二维码图片"
								})]
							}), (0, import_jsx_runtime$6.jsxs)("div", {
								className: "mt-8 w-full",
								children: [(0, import_jsx_runtime$6.jsx)("div", {
									className: "text-3xl font-medium text-foreground-600",
									children: "链接（share_url）"
								}), (0, import_jsx_runtime$6.jsx)("pre", {
									className: "overflow-auto p-6 mt-3 text-2xl leading-relaxed whitespace-pre-wrap break-all rounded-2xl select-text bg-content2 text-foreground-700",
									children: share_url
								})]
							})]
						})
					}),
					(0, import_jsx_runtime$6.jsx)("div", { className: "h-10" }),
					(0, import_jsx_runtime$6.jsxs)("div", {
						className: "p-8 rounded-3xl border-2 shadow-lg bg-warning-50 border-warning-200",
						children: [(0, import_jsx_runtime$6.jsxs)("h3", {
							className: "flex gap-4 items-center mb-6 text-4xl font-semibold text-warning-700",
							children: [(0, import_jsx_runtime$6.jsx)(Shield, { className: "w-10 h-10 text-warning-600" }), "注意事项与免责声明"]
						}), (0, import_jsx_runtime$6.jsx)("div", {
							className: "space-y-4",
							children: disclaimer.split("\n").map((line, index) => (0, import_jsx_runtime$6.jsx)("p", {
								className: "text-2xl leading-relaxed " + (0 === index ? "font-semibold text-warning-700" : "text-foreground-600"),
								children: line
							}, index))
						})]
					})
				]
			})
		});
	})).displayName = "BilibiliQrcodeImg", qrcodeImg_default = BilibiliQrcodeImg;
}), Comment_exports$1 = __export({
	KuaishouComment: () => KuaishouComment,
	default: () => Comment_default$1
}), init_Comment$1 = __esmMin(() => {
	init_lucide_react(), import_react$6 = __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$5 = __toESM(require_jsx_runtime()), KuaishouQRCodeSection = ({ qrCodeDataUrl, type, imageLength }) => (0, import_jsx_runtime$5.jsxs)("div", {
		className: "flex flex-col items-center -mr-10",
		children: [(0, import_jsx_runtime$5.jsx)("div", {
			className: "mt-20 flex items-center justify-center w-[600px] h-[600px] bg-content1 rounded-lg shadow-medium",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$5.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full"
			}) : (0, import_jsx_runtime$5.jsxs)("div", {
				className: "flex flex-col justify-center items-center text-default-400",
				children: [(0, import_jsx_runtime$5.jsx)(QrCode, {
					size: 80,
					className: "mb-4"
				}), (0, import_jsx_runtime$5.jsx)("span", {
					className: "text-lg",
					children: "二维码生成失败"
				})]
			})
		}), (0, import_jsx_runtime$5.jsx)("div", {
			className: "mt-5 text-[45px] text-center text-foreground",
			children: "视频" === type ? "视频直链(永久)" : "图集" === type ? `图集分享链接 共${imageLength}张` : "分享链接"
		})]
	}), KuaishouVideoInfoHeader = ({ type, commentLength, videoSize, likeCount, viewCount, imageLength }) => (0, import_jsx_runtime$5.jsx)("div", {
		className: "flex justify-between items-center max-w-[1200px] mx-auto p-5",
		children: (0, import_jsx_runtime$5.jsxs)("div", {
			className: "mt-2.5 flex flex-col -ml-11",
			children: [(0, import_jsx_runtime$5.jsx)("div", {
				className: "mb-5",
				children: (0, import_jsx_runtime$5.jsx)("img", {
					src: "/image/kuaishou/logo.png",
					alt: "快手Logo",
					className: "w-[650px] h-auto",
					onError: (e) => {
						const target = e.target;
						target.style.display = "none";
						const parent = target.parentElement;
						parent && (parent.innerHTML = "<div class=\"flex justify-center items-center h-full text-2xl font-bold text-foreground\">快手</div>");
					}
				})
			}), (0, import_jsx_runtime$5.jsxs)("div", {
				className: "space-y-2 text-foreground",
				children: [
					(0, import_jsx_runtime$5.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
						children: [
							"评论数量：",
							commentLength,
							"条"
						]
					}),
					"视频" === type && (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
						(0, import_jsx_runtime$5.jsxs)("div", {
							className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
							children: [
								"视频大小：",
								videoSize,
								"MB"
							]
						}),
						(0, import_jsx_runtime$5.jsxs)("div", {
							className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
							children: ["点赞数量：", likeCount]
						}),
						(0, import_jsx_runtime$5.jsxs)("div", {
							className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
							children: ["观看次数：", viewCount]
						})
					] }),
					"图集" === type && (0, import_jsx_runtime$5.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
						children: [
							"图片数量：",
							imageLength,
							"张"
						]
					})
				]
			})]
		})
	}), KuaishouCommentItemComponent = ({ comment, isLast = !1 }) => (0, import_jsx_runtime$5.jsxs)("div", {
		className: "flex px-10 pt-10 " + (isLast ? "pb-0" : "pb-10"),
		children: [(0, import_jsx_runtime$5.jsx)("img", {
			src: comment.userimageurl,
			className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
			alt: "用户头像"
		}), (0, import_jsx_runtime$5.jsxs)("div", {
			className: "flex-1",
			children: [
				(0, import_jsx_runtime$5.jsx)("div", {
					className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center",
					children: (0, import_jsx_runtime$5.jsx)("span", {
						className: "font-medium",
						children: comment.nickname
					})
				}),
				(0, import_jsx_runtime$5.jsx)("div", {
					className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] select-text",
					dangerouslySetInnerHTML: { __html: comment.text },
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				}),
				(comment.commentimage || comment.sticker) && (0, import_jsx_runtime$5.jsx)("div", {
					className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1",
					children: (0, import_jsx_runtime$5.jsx)("img", {
						className: "object-contain w-full h-full rounded-2xl",
						src: comment.commentimage || comment.sticker,
						alt: "评论图片"
					})
				}),
				(0, import_jsx_runtime$5.jsxs)("div", {
					className: "flex justify-between items-center mt-6 text-default-500",
					children: [(0, import_jsx_runtime$5.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [
							(0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[45px] select-text",
								children: comment.create_time
							}),
							comment.ip_label && (0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[45px] select-text",
								children: comment.ip_label
							}),
							comment.reply_comment_total && comment.reply_comment_total > 0 ? (0, import_jsx_runtime$5.jsxs)("span", {
								className: "text-[40px] text-foreground-600",
								children: [
									"共",
									comment.reply_comment_total,
									"条回复"
								]
							}) : (0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[40px] text-default-600",
								children: "回复"
							})
						]
					}), (0, import_jsx_runtime$5.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [(0, import_jsx_runtime$5.jsxs)("div", {
							className: "flex items-center space-x-2 transition-colors cursor-pointer hover:text-danger",
							children: [(0, import_jsx_runtime$5.jsx)(Heart, {
								size: 60,
								className: "stroke-current"
							}), (0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[50px] select-text",
								children: comment.digg_count
							})]
						}), (0, import_jsx_runtime$5.jsx)("div", {
							className: "flex items-center transition-colors cursor-pointer hover:text-primary",
							children: (0, import_jsx_runtime$5.jsx)(MessageCircle, {
								size: 60,
								className: "stroke-current"
							})
						})]
					})]
				})
			]
		})]
	}), KuaishouComment = import_react$6.memo((props) => {
		const processedData = (0, import_react$6.useMemo)(() => props.data ? {
			commentsArray: Array.isArray(props.data.CommentsData) ? props.data.CommentsData : props.data.CommentsData?.jsonArray || [],
			type: props.data.Type || "未知",
			commentLength: props.data.CommentLength || 0,
			videoSize: props.data.VideoSize,
			likeCount: props.data.likeCount,
			viewCount: props.data.viewCount,
			imageLength: props.data.ImageLength,
			useDarkTheme: props.data.useDarkTheme || !1
		} : {
			commentsArray: [],
			type: "未知",
			commentLength: 0,
			videoSize: void 0,
			likeCount: void 0,
			viewCount: void 0,
			imageLength: void 0,
			useDarkTheme: !1
		}, [props.data]);
		return (0, import_jsx_runtime$5.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$5.jsxs)("div", {
				className: "p-5",
				children: [(0, import_jsx_runtime$5.jsxs)("div", {
					className: "flex justify-between items-center max-w-[1200px] mx-auto p-5",
					children: [(0, import_jsx_runtime$5.jsx)(KuaishouVideoInfoHeader, {
						type: processedData.type,
						commentLength: processedData.commentLength,
						videoSize: processedData.videoSize,
						likeCount: processedData.likeCount,
						viewCount: processedData.viewCount,
						imageLength: processedData.imageLength,
						useDarkTheme: processedData.useDarkTheme
					}), (0, import_jsx_runtime$5.jsx)(KuaishouQRCodeSection, {
						qrCodeDataUrl: props.qrCodeDataUrl || "",
						type: processedData.type,
						imageLength: processedData.imageLength,
						useDarkTheme: processedData.useDarkTheme
					})]
				}), (0, import_jsx_runtime$5.jsx)("div", {
					className: "overflow-auto mx-auto max-w-full",
					children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => (0, import_jsx_runtime$5.jsx)(KuaishouCommentItemComponent, {
						comment,
						isLast: index === processedData.commentsArray.length - 1
					}, index)) : (0, import_jsx_runtime$5.jsx)("div", {
						className: "flex justify-center items-center py-20 text-default-500",
						children: (0, import_jsx_runtime$5.jsxs)("div", {
							className: "text-center",
							children: [(0, import_jsx_runtime$5.jsx)(MessageCircle, {
								size: 64,
								className: "mx-auto mb-4 text-default-300"
							}), (0, import_jsx_runtime$5.jsx)("p", {
								className: "text-xl",
								children: "暂无评论数据"
							})]
						})
					})
				})]
			})
		});
	}), Comment_default$1 = KuaishouComment;
}), noteInfo_exports = __export({
	XiaohongshuNoteInfo: () => XiaohongshuNoteInfo,
	default: () => noteInfo_default
}), init_noteInfo = __esmMin(() => {
	init_dist(), init_lucide_react(), import_react$5 = __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$4 = __toESM(require_jsx_runtime()), formatNumber = (num) => {
		const numValue = "string" == typeof num ? parseInt(num, 10) : num;
		return numValue >= 1e4 ? `${(numValue / 1e4).toFixed(1)}万` : numValue.toLocaleString();
	}, formatDate = (timestamp) => new Date(timestamp).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	}), (StatItem = import_react$5.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$4.jsxs)("div", {
		className: "flex gap-4 items-center",
		children: [
			(0, import_jsx_runtime$4.jsx)("div", {
				className: iconColor,
				children: icon
			}),
			(0, import_jsx_runtime$4.jsx)("span", {
				className: "font-bold text-foreground-900",
				children: formatNumber(value)
			}),
			(0, import_jsx_runtime$4.jsx)("span", {
				className: "text-foreground-500",
				children: label
			})
		]
	}))).displayName = "StatItem", (XiaohongshuNoteInfo = import_react$5.memo((props) => {
		const formattedDate = (0, import_react$5.useMemo)(() => formatDate(props.data.time), [props.data.time]), statsData = (0, import_react$5.useMemo)(() => [
			{
				icon: (0, import_jsx_runtime$4.jsx)(Heart, { size: 48 }),
				value: props.data.statistics.liked_count,
				label: "点赞",
				iconColor: "text-red-500"
			},
			{
				icon: (0, import_jsx_runtime$4.jsx)(MessageCircle, { size: 48 }),
				value: props.data.statistics.comment_count,
				label: "评论",
				iconColor: "text-blue-500"
			},
			{
				icon: (0, import_jsx_runtime$4.jsx)(Star, { size: 48 }),
				value: props.data.statistics.collected_count,
				label: "收藏",
				iconColor: "text-yellow-500"
			},
			{
				icon: (0, import_jsx_runtime$4.jsx)(Share2, { size: 48 }),
				value: props.data.statistics.share_count,
				label: "分享",
				iconColor: "text-green-500"
			}
		], [props.data.statistics]);
		return (0, import_jsx_runtime$4.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$4.jsx)("div", { children: (0, import_jsx_runtime$4.jsxs)("div", {
				className: "overflow-hidden transition-all",
				children: [
					(0, import_jsx_runtime$4.jsxs)("div", {
						className: "overflow-hidden relative",
						children: [(0, import_jsx_runtime$4.jsx)("img", {
							src: props.data.image_url,
							alt: props.data.desc,
							className: "object-cover w-full h-full"
						}), (0, import_jsx_runtime$4.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/30" })]
					}),
					(0, import_jsx_runtime$4.jsxs)("div", {
						className: "p-20 pb-36",
						children: [
							props.data.title && (0, import_jsx_runtime$4.jsx)("h1", {
								className: "mb-6 text-7xl font-bold leading-tight text-foreground-900",
								children: props.data.title
							}),
							(0, import_jsx_runtime$4.jsx)("div", {
								className: "text-5xl text-foreground-700 leading-relaxed mb-8 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
								dangerouslySetInnerHTML: { __html: props.data.desc }
							}),
							(0, import_jsx_runtime$4.jsxs)("div", {
								className: "flex gap-8 items-center text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$4.jsxs)("div", {
									className: "flex gap-2 items-center",
									children: [(0, import_jsx_runtime$4.jsx)(Calendar, { size: 32 }), (0, import_jsx_runtime$4.jsx)("span", { children: formattedDate })]
								}), props.data.ip_location && (0, import_jsx_runtime$4.jsxs)("div", {
									className: "flex gap-2 items-center",
									children: [(0, import_jsx_runtime$4.jsx)(MapPin, { size: 32 }), (0, import_jsx_runtime$4.jsx)("span", { children: props.data.ip_location })]
								})]
							})
						]
					}),
					(0, import_jsx_runtime$4.jsxs)("div", {
						className: "px-16",
						children: [
							(0, import_jsx_runtime$4.jsx)("div", {
								className: "grid grid-cols-2 text-5xl gap-18",
								children: statsData.map((stat, index) => (0, import_jsx_runtime$4.jsx)(StatItem, {
									icon: stat.icon,
									value: stat.value,
									label: stat.label,
									iconColor: stat.iconColor
								}, index))
							}),
							(0, import_jsx_runtime$4.jsx)("div", { className: "h-18" }),
							(0, import_jsx_runtime$4.jsxs)("div", {
								className: "flex justify-between items-center mb-8 text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$4.jsx)("div", { className: "flex gap-16 items-center" }), (0, import_jsx_runtime$4.jsx)("div", {
									className: "transform-gpu scale-[2.5] origin-right mb-8",
									children: (0, import_jsx_runtime$4.jsxs)(chip_default, {
										color: "danger",
										variant: "flat",
										size: "lg",
										radius: "sm",
										children: ["笔记ID：", props.data.note_id]
									})
								})]
							})
						]
					}),
					(0, import_jsx_runtime$4.jsx)("div", { className: "h-18" }),
					(0, import_jsx_runtime$4.jsx)("div", { className: "h-0.5 bg-default-300" }),
					(0, import_jsx_runtime$4.jsxs)("div", {
						className: "flex justify-between items-center px-16 py-12 pb-0",
						children: [(0, import_jsx_runtime$4.jsxs)("div", {
							className: "flex gap-8 items-center",
							children: [(0, import_jsx_runtime$4.jsx)("img", {
								src: props.data.author.avatar,
								alt: props.data.author.nickname,
								className: "object-cover w-48 h-48 rounded-full border-red-200 border-3"
							}), (0, import_jsx_runtime$4.jsxs)("div", {
								className: "flex flex-col gap-6",
								children: [(0, import_jsx_runtime$4.jsx)("p", {
									className: "text-6xl font-semibold text-foreground-900",
									children: props.data.author.nickname
								}), (0, import_jsx_runtime$4.jsxs)("p", {
									className: "text-5xl text-foreground-500",
									children: [
										"用户ID: ",
										props.data.author.user_id.slice(0, 8),
										"..."
									]
								})]
							})]
						}), (0, import_jsx_runtime$4.jsx)("div", {
							className: "transform-gpu scale-[3.5] origin-right",
							children: (0, import_jsx_runtime$4.jsx)(button_default, {
								size: "sm",
								className: "text-white bg-[#FF2442]",
								children: (0, import_jsx_runtime$4.jsxs)("div", {
									className: "flex items-center",
									children: [(0, import_jsx_runtime$4.jsx)(ExternalLink, { className: "mr-1 w-4 h-4" }), (0, import_jsx_runtime$4.jsx)("span", { children: "查看原文" })]
								})
							})
						})]
					})
				]
			}) })
		});
	})).displayName = "XiaohongshuNoteInfo", noteInfo_default = XiaohongshuNoteInfo;
}), Comment_exports = __export({
	XiaohongshuComment: () => XiaohongshuComment,
	default: () => Comment_default
}), init_Comment = __esmMin(() => {
	init_lucide_react(), import_react$4 = __toESM(require_react()), init_DefaultLayout(), import_jsx_runtime$3 = __toESM(require_jsx_runtime()), QRCodeSection$1 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$3.jsxs)("div", {
		className: "flex flex-col justify-center items-center p-5",
		children: [(0, import_jsx_runtime$3.jsx)("div", {
			className: "flex overflow-hidden justify-center items-center bg-white w-110 h-110",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$3.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain"
			}) : (0, import_jsx_runtime$3.jsx)(QrCode, {
				size: 200,
				className: "text-foreground-400"
			})
		}), (0, import_jsx_runtime$3.jsx)("p", {
			className: "mt-5 text-[40px] text-foreground-500 text-center",
			children: "扫码查看原笔记"
		})]
	}), NoteInfoHeader = ({ type, commentLength, imageLength, qrCodeDataUrl }) => (0, import_jsx_runtime$3.jsxs)("div", {
		className: "flex justify-between items-center max-w-[1200px] mx-auto p-5",
		children: [(0, import_jsx_runtime$3.jsxs)("div", {
			className: "flex flex-col justify-center items-start",
			children: [(0, import_jsx_runtime$3.jsx)("div", {
				className: "flex justify-start items-center",
				children: (0, import_jsx_runtime$3.jsx)("img", {
					src: "/image/xiaohongshu/logo.png",
					alt: "小红书Logo",
					className: "object-contain mb-20 max-w-full max-h-full scale-180 ml-15",
					onError: (e) => {
						const target = e.target;
						target.style.display = "none";
						const parent = target.parentElement;
						parent && (parent.innerHTML = "<div class=\"flex justify-start items-center h-full text-2xl font-bold text-foreground-600\">小红书</div>");
					}
				})
			}), (0, import_jsx_runtime$3.jsxs)("div", {
				className: "mt-8 space-y-4 text-left text-foreground-500",
				children: [
					(0, import_jsx_runtime$3.jsxs)("div", {
						className: "tracking-[6px] text-[45px] select-text",
						children: ["笔记类型：", type]
					}),
					(0, import_jsx_runtime$3.jsxs)("div", {
						className: "tracking-[6px] text-[45px] select-text",
						children: [
							"评论数量：",
							commentLength,
							"条"
						]
					}),
					"图文" === type && imageLength && (0, import_jsx_runtime$3.jsxs)("div", {
						className: "tracking-[6px] text-[45px] select-text",
						children: [
							"图片数量：",
							imageLength,
							"张"
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$3.jsx)(QRCodeSection$1, { qrCodeDataUrl })]
	}), CommentItemComponent = ({ comment, isLast = !1 }) => (0, import_jsx_runtime$3.jsxs)("div", {
		className: "flex px-10 pt-15 " + (isLast ? "pb-0" : "pb-15"),
		children: [(0, import_jsx_runtime$3.jsx)("img", {
			src: comment.user_info.image,
			className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
			alt: "用户头像"
		}), (0, import_jsx_runtime$3.jsxs)("div", {
			className: "flex-1",
			children: [
				(0, import_jsx_runtime$3.jsxs)("div", {
					className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center select-text",
					children: [(0, import_jsx_runtime$3.jsx)("span", {
						className: "text-5xl",
						children: comment.user_info.nickname
					}), comment.show_tags && comment.show_tags.length > 0 && comment.show_tags.map((tag, index) => "is_author" === tag ? (0, import_jsx_runtime$3.jsx)("div", {
						className: "inline-block px-6 py-3 ml-3 text-4xl rounded-full bg-default-100 text-default-500",
						children: "作者"
					}, index) : "user_top" === tag ? (0, import_jsx_runtime$3.jsx)("div", {
						className: "inline-block px-6 py-3 rounded-full ml-3 text-4xl bg-[#ff2e4d0f] text-[#ff2e4d]",
						children: "置顶评论"
					}, index) : null)]
				}),
				(0, import_jsx_runtime$3.jsx)("div", {
					className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] [&_span]:inline",
					dangerouslySetInnerHTML: { __html: comment.content },
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				}),
				comment.pictures && comment.pictures.length > 0 && (0, import_jsx_runtime$3.jsx)("div", {
					className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1",
					children: (0, import_jsx_runtime$3.jsx)("img", {
						className: "object-contain w-full h-full rounded-2xl",
						src: comment.pictures[0].url_default,
						alt: "评论图片"
					})
				}),
				(0, import_jsx_runtime$3.jsxs)("div", {
					className: "flex justify-between items-center mt-6 text-foreground-500",
					children: [(0, import_jsx_runtime$3.jsxs)("div", {
						className: "flex items-center space-x-6 select-text",
						children: [
							(0, import_jsx_runtime$3.jsx)("span", {
								className: "text-[45px]",
								children: comment.create_time
							}),
							(0, import_jsx_runtime$3.jsx)("span", {
								className: "text-[45px]",
								children: comment.ip_location
							}),
							parseInt(comment.sub_comment_count) > 0 ? (0, import_jsx_runtime$3.jsxs)("span", {
								className: "text-[40px] text-foreground-600",
								children: [
									"共",
									comment.sub_comment_count,
									"条回复"
								]
							}) : (0, import_jsx_runtime$3.jsx)("span", {
								className: "text-[40px] text-foreground-600",
								children: "回复"
							})
						]
					}), (0, import_jsx_runtime$3.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [(0, import_jsx_runtime$3.jsxs)("div", {
							className: "flex items-center space-x-2 transition-colors cursor-pointer",
							children: [(0, import_jsx_runtime$3.jsx)(Heart, {
								size: 60,
								className: comment.liked ? "text-red-500 fill-current" : "text-foreground-500"
							}), (0, import_jsx_runtime$3.jsx)("span", {
								className: "text-[50px] select-text",
								children: comment.like_count
							})]
						}), (0, import_jsx_runtime$3.jsx)("div", {
							className: "flex items-center transition-colors cursor-pointer",
							children: (0, import_jsx_runtime$3.jsx)(MessageCircle, {
								size: 60,
								className: "stroke-current text-foreground-500"
							})
						})]
					})]
				}),
				comment.sub_comments && comment.sub_comments.length > 0 && (0, import_jsx_runtime$3.jsx)("div", {
					className: "pl-6 mt-6",
					children: comment.sub_comments.map((subComment, index) => (0, import_jsx_runtime$3.jsx)("div", {
						className: "py-4 " + (index !== comment.sub_comments.length - 1 ? "border-b border-divider" : ""),
						children: (0, import_jsx_runtime$3.jsxs)("div", {
							className: "flex items-start space-x-4",
							children: [(0, import_jsx_runtime$3.jsx)("img", {
								src: subComment.user_info.image,
								className: "object-cover mr-8 w-32 h-32 rounded-full",
								alt: "用户头像"
							}), (0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex-1",
								children: [
									(0, import_jsx_runtime$3.jsxs)("div", {
										className: "flex items-center mb-2 space-x-2",
										children: [(0, import_jsx_runtime$3.jsx)("span", {
											className: "text-[40px] font-medium text-foreground-600",
											children: subComment.user_info.nickname
										}), subComment.show_tags && subComment.show_tags.length > 0 && subComment.show_tags.map((tag, tagIndex) => "is_author" === tag ? (0, import_jsx_runtime$3.jsx)("div", {
											className: "inline-block px-5 py-2 ml-2 text-3xl rounded-full bg-default-100 text-default-500",
											children: "作者"
										}, tagIndex) : null)]
									}),
									(0, import_jsx_runtime$3.jsx)("div", {
										className: "text-[45px] text-foreground leading-relaxed mb-2 select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
										dangerouslySetInnerHTML: { __html: subComment.content },
										style: {
											wordBreak: "break-word",
											overflowWrap: "break-word"
										}
									}),
									(0, import_jsx_runtime$3.jsxs)("div", {
										className: "flex justify-between items-center text-foreground-500",
										children: [(0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center space-x-4",
											children: [(0, import_jsx_runtime$3.jsx)("span", {
												className: "text-[35px]",
												children: subComment.create_time
											}), (0, import_jsx_runtime$3.jsx)("span", {
												className: "text-[35px]",
												children: subComment.ip_location
											})]
										}), (0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center space-x-2",
											children: [(0, import_jsx_runtime$3.jsx)(Heart, {
												size: 40,
												className: subComment.liked ? "text-red-500 fill-current" : "text-foreground-500"
											}), (0, import_jsx_runtime$3.jsx)("span", {
												className: "text-[35px]",
												children: subComment.like_count
											})]
										})]
									})
								]
							})]
						})
					}, subComment.id))
				})
			]
		})]
	}), XiaohongshuComment = import_react$4.memo((props) => (0, import_jsx_runtime$3.jsxs)(DefaultLayout, {
		...props,
		children: [
			(0, import_jsx_runtime$3.jsx)("div", { className: "h-30" }),
			(0, import_jsx_runtime$3.jsx)(NoteInfoHeader, {
				type: props.data.Type,
				commentLength: props.data.CommentLength,
				imageLength: props.data.ImageLength,
				qrCodeDataUrl: props.qrCodeDataUrl
			}),
			(0, import_jsx_runtime$3.jsx)("div", {
				className: "overflow-auto mx-20 max-w-full",
				children: props.data.CommentsData.length > 0 ? (0, import_jsx_runtime$3.jsx)("div", {
					className: "divide-y divide-divider",
					children: props.data.CommentsData.map((comment, index) => (0, import_jsx_runtime$3.jsx)(CommentItemComponent, {
						comment,
						isLast: index === props.data.CommentsData.length - 1
					}, comment.id))
				}) : (0, import_jsx_runtime$3.jsx)("div", {
					className: "flex justify-center items-center py-20",
					children: (0, import_jsx_runtime$3.jsx)("p", {
						className: "text-[60px] text-foreground-400",
						children: "暂无评论"
					})
				})
			})
		]
	})), Comment_default = XiaohongshuComment;
}), Help_exports = __export({
	Help: () => Help,
	default: () => Help_default
});
function iconForItem(icon) {
	return icon && ICON_MAP[icon] || CircleQuestionMark;
}
var PLATFORM_CONFIG, import_jsx_runtime$1, parseAnsiColors, ErrorHeader, BusinessErrorDetails, QRCodeSection, handlerError, handlerError_default, import_react$1, import_jsx_runtime, Changelog, changelog_default, componentConfigs, init_Help = __esmMin(() => {
	init_lucide_react(), import_react$3 = __toESM(require_react()), init_GlowImage(), init_DefaultLayout(), import_jsx_runtime$2 = __toESM(require_jsx_runtime()), ICON_MAP = {
		Link,
		Sparkles,
		Send,
		List,
		Bell,
		LogIn,
		Bot,
		RefreshCw
	}, MenuItemComponent = ({ item }) => (0, import_jsx_runtime$2.jsx)(SmartGlowBorder, {
		className: "block",
		glowColor: "rgb(245,165, 36)",
		glowStrength: 1,
		borderWidth: 1.5,
		borderRadius: "1.5rem",
		glowPosition: "left-top",
		lightInfluenceRange: .3,
		children: (0, import_jsx_runtime$2.jsxs)("div", {
			className: "flex flex-row gap-6 p-8 rounded-3xl backdrop-blur-sm bg-background",
			children: [(0, import_jsx_runtime$2.jsx)("div", {
				className: "flex-shrink-0 pt-1",
				children: (0, import_jsx_runtime$2.jsx)(GlowIcon, {
					Icon: iconForItem(item.icon),
					iconProps: {
						className: "w-18 h-18 text-warning",
						strokeWidth: 2
					},
					glowColor: "rgb(245, 158, 11)",
					glowStrength: 1,
					glowRadius: 20,
					glowLayers: 4,
					glowSpread: 20
				})
			}), (0, import_jsx_runtime$2.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [(0, import_jsx_runtime$2.jsx)("h3", {
					className: "mb-4 text-4xl font-bold leading-tight text-foreground",
					children: item.title
				}), (0, import_jsx_runtime$2.jsx)("p", {
					className: "text-2xl leading-relaxed whitespace-pre-line text-muted-foreground",
					children: item.description
				})]
			})]
		})
	}), MenuGroupComponent = ({ group, startIndex }) => {
		let itemIndex = startIndex;
		return (0, import_jsx_runtime$2.jsx)("div", {
			className: "px-10 py-10 rounded-2xl bg-muted/50",
			children: (0, import_jsx_runtime$2.jsxs)("div", { children: [
				(0, import_jsx_runtime$2.jsx)("h2", {
					className: "m-0 mb-8 text-[3rem] font-bold text-foreground",
					children: group.title
				}),
				(0, import_jsx_runtime$2.jsx)("div", {
					className: "grid grid-cols-2 gap-6",
					children: group.items.map((item, idx) => (0, import_jsx_runtime$2.jsx)(MenuItemComponent, {
						item,
						index: itemIndex++
					}, idx))
				}),
				group.subGroups?.map((sub, i) => (0, import_jsx_runtime$2.jsxs)("div", {
					className: "mt-10",
					children: [(0, import_jsx_runtime$2.jsx)("h3", {
						className: "m-0 mb-6 text-4xl text-foreground/90",
						children: sub.title
					}), (0, import_jsx_runtime$2.jsx)("div", {
						className: "grid grid-cols-2 gap-6",
						children: sub.items.map((item, idx) => (0, import_jsx_runtime$2.jsx)(MenuItemComponent, {
							item,
							index: itemIndex++
						}, idx))
					})]
				}, i))
			] })
		});
	}, (Help = import_react$3.memo((props) => {
		const title = props.data?.title || "KKK插件帮助页面", menuData = props.data?.menu || [];
		let globalIndex = 0;
		return (0, import_jsx_runtime$2.jsxs)(DefaultLayout, {
			...props,
			children: [
				(0, import_jsx_runtime$2.jsx)("div", { className: "h-12" }),
				(0, import_jsx_runtime$2.jsx)("div", {
					className: "w-full max-w-[1440px] mx-auto px-8",
					children: (0, import_jsx_runtime$2.jsxs)("div", {
						className: "px-12 py-10 rounded-2xl backdrop-blur-sm",
						children: [(0, import_jsx_runtime$2.jsx)("h1", {
							className: "mb-2 text-7xl font-bold leading-tight text-foreground",
							children: title
						}), (0, import_jsx_runtime$2.jsx)("p", {
							className: "text-4xl font-medium text-muted-foreground",
							children: "功能说明与使用指南"
						})]
					})
				}),
				(0, import_jsx_runtime$2.jsx)("div", { className: "h-8" }),
				(0, import_jsx_runtime$2.jsx)("div", {
					className: "px-8 mx-auto space-y-8 w-full",
					children: menuData.map((group, index) => {
						const startIndex = globalIndex;
						return globalIndex += group.items.length + (group.subGroups?.reduce((sum, sub) => sum + sub.items.length, 0) || 0), (0, import_jsx_runtime$2.jsx)(MenuGroupComponent, {
							group,
							startIndex
						}, index);
					})
				})
			]
		});
	})).displayName = "Help", Help_default = Help;
}), init_handlerError$1 = __esmMin(() => {
	PLATFORM_CONFIG = {
		douyin: {
			displayName: "抖音",
			color: "#fe2c55",
			icon: "🎵"
		},
		bilibili: {
			displayName: "哔哩哔哩",
			color: "#00a1d6",
			icon: "📺"
		},
		kuaishou: {
			displayName: "快手",
			color: "#ff6600",
			icon: "⚡"
		},
		system: {
			displayName: "系统",
			color: "#666666",
			icon: "⚙️"
		},
		unknown: {
			displayName: "未知平台",
			color: "#666666",
			icon: "❓"
		}
	};
}), handlerError_exports = __export({
	default: () => handlerError_default,
	handlerError: () => handlerError
}), init_handlerError = __esmMin(() => {
	init_lucide_react(), __toESM(require_react()), init_handlerError$1(), init_DefaultLayout(), import_jsx_runtime$1 = __toESM(require_jsx_runtime()), parseAnsiColors = (text) => {
		const colorMap = {
			30: "text-foreground",
			31: "text-danger",
			32: "text-success",
			33: "text-warning",
			34: "text-primary",
			35: "text-secondary",
			36: "text-primary-400",
			37: "text-default-300",
			90: "text-default-400",
			91: "text-danger-400",
			92: "text-success-400",
			93: "text-warning-400",
			94: "text-primary-400",
			95: "text-secondary-400",
			96: "text-primary-300",
			97: "text-default-100"
		}, ansiRegex = /\u001b\[(\d+)m/g, parts = [];
		let match, lastIndex = 0, currentColor = "";
		for (; null !== (match = ansiRegex.exec(text));) {
			if (match.index > lastIndex) {
				const formattedText = text.slice(lastIndex, match.index).replace(/\\n/g, "\n");
				currentColor ? parts.push((0, import_jsx_runtime$1.jsx)("span", {
					className: currentColor,
					children: formattedText
				}, `${lastIndex}-${match.index}`)) : parts.push(formattedText);
			}
			const colorCode = match[1];
			"39" === colorCode || "0" === colorCode ? currentColor = "" : colorMap[colorCode] && (currentColor = colorMap[colorCode]), lastIndex = ansiRegex.lastIndex;
		}
		if (lastIndex < text.length) {
			const formattedText = text.slice(lastIndex).replace(/\\n/g, "\n");
			currentColor ? parts.push((0, import_jsx_runtime$1.jsx)("span", {
				className: currentColor,
				children: formattedText
			}, `${lastIndex}-end`)) : parts.push(formattedText);
		}
		return parts.length > 0 ? parts : [text.replace(/\\n/g, "\n")];
	}, ErrorHeader = ({ platform, method, timestamp }) => {
		const platformConfig = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.unknown;
		return (0, import_jsx_runtime$1.jsx)("div", {
			className: "w-full max-w-[1440px] mx-auto px-20 py-16",
			children: (0, import_jsx_runtime$1.jsxs)("div", {
				className: "p-16 rounded-3xl bg-danger-50",
				children: [(0, import_jsx_runtime$1.jsxs)("div", {
					className: "flex items-center mb-12",
					children: [(0, import_jsx_runtime$1.jsx)(CircleAlert, { className: "mr-6 w-16 h-16 text-danger-600" }), (0, import_jsx_runtime$1.jsxs)("div", { children: [(0, import_jsx_runtime$1.jsx)("h1", {
						className: "text-6xl font-bold text-danger-600",
						children: "出错了~"
					}), (0, import_jsx_runtime$1.jsxs)("p", {
						className: "mt-4 text-3xl text-default-600",
						children: [
							platformConfig.displayName,
							" - ",
							method
						]
					})] })]
				}), (0, import_jsx_runtime$1.jsxs)("div", {
					className: "flex items-center",
					children: [(0, import_jsx_runtime$1.jsx)(Clock, { className: "mr-4 w-8 h-8 text-default-600" }), (0, import_jsx_runtime$1.jsxs)("span", {
						className: "text-2xl text-default-600",
						children: ["发生时间：", new Date(timestamp).toLocaleString("zh-CN")]
					})]
				})]
			})
		});
	}, BusinessErrorDetails = ({ error, logs, triggerCommand }) => (0, import_jsx_runtime$1.jsxs)("div", {
		className: "w-full max-w-[1440px] mx-auto px-20 py-12",
		children: [
			(0, import_jsx_runtime$1.jsx)("h2", {
				className: "mb-16 text-6xl font-bold text-foreground",
				children: "错误详情"
			}),
			triggerCommand && (0, import_jsx_runtime$1.jsxs)("div", {
				className: "p-12 mb-16 rounded-3xl bg-content1",
				children: [(0, import_jsx_runtime$1.jsxs)("h3", {
					className: "flex items-center mb-8 text-4xl font-semibold text-foreground",
					children: [(0, import_jsx_runtime$1.jsx)(Terminal, { className: "mr-4 w-10 h-10" }), "触发命令"]
				}), (0, import_jsx_runtime$1.jsx)("div", {
					className: "p-6 rounded-2xl bg-default-100",
					children: (0, import_jsx_runtime$1.jsx)("pre", {
						className: "text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700",
						children: triggerCommand
					})
				})]
			}),
			(0, import_jsx_runtime$1.jsxs)("div", {
				className: "p-12 mb-16 rounded-3xl bg-danger-50",
				children: [(0, import_jsx_runtime$1.jsxs)("h3", {
					className: "flex items-center mb-10 text-4xl font-semibold text-danger-800",
					children: [(0, import_jsx_runtime$1.jsx)(Terminal, { className: "mr-4 w-10 h-10" }), "调用栈信息"]
				}), (0, import_jsx_runtime$1.jsx)("div", {
					className: "p-10 rounded-2xl bg-content1",
					children: (0, import_jsx_runtime$1.jsx)("pre", {
						className: "text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700",
						children: String(error.stack || "")
					})
				})]
			}),
			logs && logs.length > 0 && (0, import_jsx_runtime$1.jsxs)("div", {
				className: "p-12 rounded-3xl bg-content1",
				children: [(0, import_jsx_runtime$1.jsxs)("h3", {
					className: "flex items-center mb-10 text-4xl font-semibold text-foreground",
					children: [(0, import_jsx_runtime$1.jsx)(FileText, { className: "mr-4 w-10 h-10" }), "相关日志"]
				}), (0, import_jsx_runtime$1.jsx)("div", {
					className: "p-10 rounded-2xl bg-content1",
					children: (0, import_jsx_runtime$1.jsx)("div", {
						className: "space-y-2",
						children: "string" == typeof logs ? logs.split("\n\n").map((logSection, index) => {
							const parsedLog = parseAnsiColors(logSection);
							return (0, import_jsx_runtime$1.jsx)("div", {
								className: "mb-6 font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text",
								children: parsedLog.length > 0 ? parsedLog : logSection
							}, index);
						}) : logs.map((log, index) => {
							const parsedLog = parseAnsiColors(log);
							return (0, import_jsx_runtime$1.jsx)("div", {
								className: "font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text",
								children: parsedLog.length > 0 ? parsedLog : log
							}, index);
						})
					})
				})]
			})
		]
	}), QRCodeSection = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$1.jsxs)("div", {
		className: "flex flex-col-reverse items-center -mb-12 mr-18",
		children: [(0, import_jsx_runtime$1.jsxs)("div", {
			className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text",
			children: [(0, import_jsx_runtime$1.jsx)(QrCode, { className: "w-11 h-11" }), (0, import_jsx_runtime$1.jsx)("span", { children: "触发命令" })]
		}), (0, import_jsx_runtime$1.jsx)("div", {
			className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300",
			children: (0, import_jsx_runtime$1.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-[350px] h-[350px] select-text"
			})
		})]
	}), (handlerError = (props) => {
		const { data, qrCodeDataUrl } = props, { type, platform, error, method, timestamp, logs, triggerCommand } = data, businessError = "business_error" === type ? error : null;
		return (0, import_jsx_runtime$1.jsxs)(DefaultLayout, {
			...props,
			children: [
				(0, import_jsx_runtime$1.jsx)("div", { className: "h-[60px]" }),
				(0, import_jsx_runtime$1.jsx)(ErrorHeader, {
					type,
					platform,
					method,
					timestamp
				}),
				(0, import_jsx_runtime$1.jsx)(BusinessErrorDetails, {
					error: businessError,
					logs,
					triggerCommand
				}),
				(0, import_jsx_runtime$1.jsx)("div", {
					className: "w-full max-w-[1440px] mx-auto px-20 py-12",
					children: (0, import_jsx_runtime$1.jsxs)("div", {
						className: "flex justify-between items-center",
						children: [(0, import_jsx_runtime$1.jsxs)("div", {
							className: "flex-1 p-16 mr-8 rounded-3xl bg-primary-50",
							children: [(0, import_jsx_runtime$1.jsxs)("h3", {
								className: "flex items-center mb-10 text-5xl font-semibold text-primary-800",
								children: [(0, import_jsx_runtime$1.jsx)(Send, { className: "mr-6 w-12 h-12" }), "发送错误报告"]
							}), (0, import_jsx_runtime$1.jsxs)("div", {
								className: "space-y-6",
								children: [(0, import_jsx_runtime$1.jsx)("p", {
									className: "text-3xl leading-relaxed text-default-700",
									children: "请将此错误报告截图发送给开发者，以便快速定位和解决问题。"
								}), (0, import_jsx_runtime$1.jsx)("p", {
									className: "text-2xl text-default-600",
									children: "您可以通过以下方式联系开发者：GitHub Issues、QQ群：795874649。"
								})]
							})]
						}), qrCodeDataUrl && (0, import_jsx_runtime$1.jsx)(QRCodeSection, { qrCodeDataUrl })]
					})
				})
			]
		});
	}).displayName = "handlerError", handlerError_default = handlerError;
}), changelog_exports = __export({
	Changelog: () => Changelog,
	default: () => changelog_default
}), init_changelog = __esmMin(() => {
	init_dist(), init_lucide_react(), import_react$1 = __toESM(require_react()), init_react_markdown(), init_rehype_highlight(), init_rehype_raw(), init_remark_breaks(), init_remark_gfm(), init_GlowImage(), init_DefaultLayout(), import_jsx_runtime = __toESM(require_jsx_runtime()), (Changelog = import_react$1.memo((props) => (0, import_jsx_runtime.jsx)(DefaultLayout, {
		...props,
		style: {
			backgroundImage: "\n          linear-gradient(to right, rgb(163 163 163 / 0.1) 2px, transparent 2px),\n          linear-gradient(to bottom, rgb(163 163 163 / 0.1) 2px, transparent 2px)\n        ",
			backgroundSize: "60px 60px"
		},
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: "relative px-20 pt-5 pb-0 w-full max-w-none prose prose-lg prose-invert from-default-50 to-default-100",
			children: [props.data.Tip && (0, import_jsx_runtime.jsxs)("div", {
				className: "pb-10 text-5xl leading-relaxed text-center mt-30",
				children: [
					"引用回复此消息包含",
					(0, import_jsx_runtime.jsx)("span", {
						className: "text-7xl",
						children: "「"
					}),
					(0, import_jsx_runtime.jsx)(GlowText, {
						className: "text-7xl font-bold text-warning",
						blurRadius: 20,
						glowStrength: 2,
						scale: 1.2,
						children: "更新"
					}),
					(0, import_jsx_runtime.jsx)("span", {
						className: "text-7xl",
						children: "」"
					}),
					"字眼，即可开始更新"
				]
			}), (0, import_jsx_runtime.jsx)(Markdown, {
				remarkPlugins: [remarkGfm, remarkBreaks],
				rehypePlugins: [rehypeHighlight, rehypeRaw],
				components: {
					h1: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[5.28em] font-semibold mb-8 pb-2 border-b-2 border-default-400 text-default-900",
						...props$1,
						children
					}),
					h2: ({ children,...props$1 }) => (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mt-20 mb-5",
						children: [
							(0, import_jsx_runtime.jsx)("div", {
								className: "absolute -top-13 left-0 text-[11em] font-black text-default-200/50 select-none pointer-events-none uppercase leading-none",
								"aria-hidden": "true",
								children: "string" == typeof children ? children : "H2"
							}),
							(0, import_jsx_runtime.jsx)("h2", {
								className: "ml-15 relative z-10 text-[3.8em] pb-2  text-default-900 font-medium",
								...props$1,
								children
							}),
							(0, import_jsx_runtime.jsx)("div", { className: "w-full border-b border-default-400" })
						]
					}),
					h3: ({ children,...props$1 }) => (0, import_jsx_runtime.jsxs)("h3", {
						className: "flex items-baseline gap-3 text-[3.3em] font-semibold mb-6 text-default-900",
						...props$1,
						children: [children, (0, import_jsx_runtime.jsx)(CornerDownLeft, {
							strokeWidth: 2.5,
							className: "w-[1em] h-[1em] text-default-200"
						})]
					}),
					h4: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("h4", {
						className: "text-[2.64em] font-semibold mb-5 text-default-900",
						...props$1,
						children
					}),
					h5: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("h5", {
						className: "text-[2.38em] font-semibold mb-5 text-default-900",
						...props$1,
						children
					}),
					h6: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("h6", {
						className: "text-[2.11em] font-semibold mb-4 text-default-600",
						...props$1,
						children
					}),
					p: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("p", {
						className: "text-[2.64em] leading-[1.75] mb-[2.64em] text-default-900",
						...props$1,
						children
					}),
					ul: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("ul", {
						className: "pl-[5em] mb-[2em] list-disc text-default-900",
						...props$1,
						children
					}),
					ol: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("ol", {
						className: "pl-[3.6em] mb-[1.8em] list-decimal text-default-900",
						...props$1,
						children
					}),
					li: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("li", {
						className: "text-[2.6em] leading-[1.6] text-default-900",
						...props$1,
						children
					}),
					blockquote: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("blockquote", {
						className: "border-l-4 border-default-500 pl-[1.8em] py-[0.9em] mb-[1.8em] text-default-700 bg-default-100",
						...props$1,
						children
					}),
					code: ({ children }) => (0, import_jsx_runtime.jsx)(code_default, {
						radius: "lg",
						color: "warning",
						className: "inline align-text-bottom leading-[inherit] text-[0.8em] whitespace-normal break-all box-decoration-slice",
						children
					}),
					pre: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("pre", {
						className: "p-[1.8em] mb-[1.8em] bg-default-200 rounded overflow-x-auto font-mono",
						...props$1,
						children
					}),
					a: ({ children, href,...props$1 }) => (0, import_jsx_runtime.jsxs)("a", {
						className: "inline-flex gap-3 items-baseline cursor-pointer text-warning hover:underline",
						onClick: (e) => e.preventDefault(),
						...props$1,
						children: [(0, import_jsx_runtime.jsx)(GlowText, {
							blurRadius: 10,
							glowStrength: 3,
							scale: 1.2,
							children
						}), (0, import_jsx_runtime.jsx)(GlowText, {
							blurRadius: 10,
							glowStrength: 3,
							scale: 1.2,
							children: (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-[1.1em] h-[1.1em] -mb-[0.1em]" })
						})]
					}),
					img: ({ ...props$1 }) => (0, import_jsx_runtime.jsx)("img", {
						className: "max-w-full h-auto rounded",
						...props$1
					}),
					table: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("table", {
						className: "w-full border-collapse mb-[1.8em] text-default-900",
						...props$1,
						children
					}),
					th: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("th", {
						className: "px-5 py-3 font-semibold text-left border text-default-900 bg-default-200 border-default-400",
						...props$1,
						children
					}),
					td: ({ children,...props$1 }) => (0, import_jsx_runtime.jsx)("td", {
						className: "px-5 py-3 border text-default-900 border-default-400",
						...props$1,
						children
					})
				},
				children: props.data?.markdown ?? ""
			})]
		})
	}))).displayName = "Changelog", changelog_default = Changelog;
});
function createComponentConfig(baseConfig, extensions = {}) {
	return {
		...baseConfig,
		...extensions
	};
}
var LogLevel, getLogLevel, shouldEnableCallStack, shouldEnableColors, logger, ComponentAutoRegistry, import_browser, import_react, import_server_node, QRCodeGenerator, ComponentRendererFactory, ResourcePathManager, HtmlWrapper, SSRRender, reactServerRender, client_default, init_config = __esmMin(() => {
	init_platforms(), init_config_base(), componentConfigs = baseComponentConfigs.map((basePlatform) => {
		const platform = {
			...basePlatform,
			components: []
		};
		switch (basePlatform.type) {
			case PlatformType.DOUYIN:
				platform.components = basePlatform.components.map((baseComponent) => {
					switch (baseComponent.id) {
						case "comment": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_Comment$3(), Comment_exports$3)).then((module) => ({ default: module.DouyinComment }))
						});
						case "dynamic": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_Dynamic(), Dynamic_exports)).then((module) => ({ default: module.DouyinDynamic }))
						});
						case "live": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_Live(), Live_exports)).then((module) => ({ default: module.DouyinLive }))
						});
						case "musicinfo": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_MusicInfo(), MusicInfo_exports)).then((module) => ({ default: module.DouyinMusicInfo }))
						});
						case "user_profile": return createComponentConfig(baseComponent, { validateData: (data) => data && "string" == typeof data.share_url });
						case "userlist": return createComponentConfig(baseComponent, {
							validateData: (data) => data && Array.isArray(data.renderOpt),
							lazyComponent: () => Promise.resolve().then(() => (init_UserList$1(), UserList_exports$1)).then((module) => ({ default: module.default }))
						});
						case "videoInfo": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_videoInfo$1(), videoInfo_exports$1)).then((module) => ({ default: module.DouyinVideoInfo })) });
						default: return createComponentConfig(baseComponent);
					}
				});
				break;
			case PlatformType.BILIBILI:
				platform.components = basePlatform.components.map((baseComponent) => {
					switch (baseComponent.id) {
						case "comment": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_Comment$2(), Comment_exports$2)).then((module) => ({ default: module.BilibiliComment }))
						});
						case "userlist": return createComponentConfig(baseComponent, {
							validateData: (data) => data && Array.isArray(data.renderOpt),
							lazyComponent: () => Promise.resolve().then(() => (init_UserList(), UserList_exports)).then((module) => ({ default: module.default }))
						});
						case "bangumi": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_bangumi(), bangumi_exports)).then((module) => ({ default: module.default })) });
						case "dynamic/DYNAMIC_TYPE_DRAW": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_DRAW(), DYNAMIC_TYPE_DRAW_exports)).then((module) => ({ default: module.BilibiliDrawDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_AV": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_AV(), DYNAMIC_TYPE_AV_exports)).then((module) => ({ default: module.BilibiliVideoDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_FORWARD": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_FORWARD(), DYNAMIC_TYPE_FORWARD_exports)).then((module) => ({ default: module.BilibiliForwardDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_LIVE_RCMD": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_LIVE_RCMD(), DYNAMIC_TYPE_LIVE_RCMD_exports)).then((module) => ({ default: module.BilibiliLiveDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_WORD": return createComponentConfig(baseComponent, { validateData: (data) => data && "string" == typeof data.share_url });
						case "videoInfo": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_videoInfo(), videoInfo_exports)).then((module) => ({ default: module.BilibiliVideoInfo }))
						});
						case "qrcodeImg": return createComponentConfig(baseComponent, {
							validateData: (data) => data && "string" == typeof data.share_url,
							lazyComponent: () => Promise.resolve().then(() => (init_qrcodeImg(), qrcodeImg_exports)).then((module) => ({ default: module.BilibiliQrcodeImg }))
						});
						default: return createComponentConfig(baseComponent);
					}
				});
				break;
			case PlatformType.KUAISHOU:
				platform.components = basePlatform.components.map((baseComponent) => "comment" === baseComponent.id ? createComponentConfig(baseComponent, {
					validateData: (data) => data && "string" == typeof data.share_url,
					lazyComponent: () => Promise.resolve().then(() => (init_Comment$1(), Comment_exports$1)).then((module) => ({ default: module.KuaishouComment }))
				}) : createComponentConfig(baseComponent));
				break;
			case PlatformType.XIAOHONGSHU:
				platform.components = basePlatform.components.map((baseComponent) => {
					switch (baseComponent.id) {
						case "noteInfo": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_noteInfo(), noteInfo_exports)).then((module) => ({ default: module.XiaohongshuNoteInfo })) });
						case "comment": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_Comment(), Comment_exports)).then((module) => ({ default: module.XiaohongshuComment })) });
						default: return createComponentConfig(baseComponent);
					}
				});
				break;
			case PlatformType.OTHER:
				platform.components = basePlatform.components.map((baseComponent) => {
					switch (baseComponent.id) {
						case "help": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_Help(), Help_exports)).then((module) => ({ default: module.Help })) });
						case "handlerError": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_handlerError(), handlerError_exports)).then((module) => ({ default: module.handlerError })) });
						case "changelog": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_changelog(), changelog_exports)).then((module) => ({ default: module.Changelog })) });
						default: return createComponentConfig(baseComponent);
					}
				});
				break;
			default: platform.components = basePlatform.components.map((baseComponent) => createComponentConfig(baseComponent));
		}
		return platform;
	});
}), init_logger = __esmMin(() => {
	init_chalk(), LogLevel = function(LogLevel$1) {
		return LogLevel$1[LogLevel$1.DEBUG = 0] = "DEBUG", LogLevel$1[LogLevel$1.INFO = 1] = "INFO", LogLevel$1[LogLevel$1.WARN = 2] = "WARN", LogLevel$1[LogLevel$1.ERROR = 3] = "ERROR", LogLevel$1[LogLevel$1.MARK = 4] = "MARK", LogLevel$1;
	}(LogLevel || {}), getLogLevel = () => {
		switch ((process.env.LOG_LEVEL || "info").toLowerCase()) {
			case "debug": return LogLevel.DEBUG;
			case "info":
			default: return LogLevel.INFO;
			case "warn": return LogLevel.WARN;
			case "error": return LogLevel.ERROR;
			case "mark": return LogLevel.MARK;
		}
	}, shouldEnableCallStack = () => {
		if (void 0 !== process.env.ENABLE_CALL_STACK) return "true" === process.env.ENABLE_CALL_STACK;
		if ("development" === process.env.NODE_ENV) return !0;
		if ("tsx" === process.env.RUNTIME) return !0;
		try {
			const stack = (/* @__PURE__ */ new Error()).stack;
			if (stack && stack.split("\n").some((line) => line && !line.includes("node_modules") && (line.includes(".ts:") || line.includes(".js:")) && !line.includes("at Error") && !line.includes("at shouldEnableCallStack"))) return !0;
		} catch {}
		return !1;
	}, shouldEnableColors = () => void 0 !== process.env.FORCE_COLOR ? "0" !== process.env.FORCE_COLOR : !(!process.stdout || !process.stdout.isTTY) || !(process.env.CI || process.env.GITHUB_ACTIONS || process.env.GITLAB_CI), logger = new class {
		constructor() {
			this.enableCallStack = shouldEnableCallStack(), this.enableColors = shouldEnableColors(), this.chalk = new Chalk({ level: this.enableColors ? 3 : 0 }), this.red = this.chalk.red, this.green = this.chalk.green, this.yellow = this.chalk.yellow, this.blue = this.chalk.blue, this.magenta = this.chalk.magenta, this.cyan = this.chalk.cyan, this.white = this.chalk.white, this.gray = this.chalk.gray;
		}
		getCallSite() {
			if (!this.enableCallStack) return "";
			try {
				const stack = (/* @__PURE__ */ new Error()).stack;
				if (!stack) return "";
				const stackLines = stack.split("\n");
				let targetLine = "";
				for (let i = 1; i < stackLines.length; i++) {
					const line = stackLines[i];
					if (line && !(line.includes("getCallSite") || line.includes("CustomLogger.log") || line.includes("CustomLogger.debug") || line.includes("CustomLogger.info") || line.includes("CustomLogger.warn") || line.includes("CustomLogger.error") || line.includes("CustomLogger.mark"))) {
						if (!line.includes("node_modules")) {
							targetLine = line;
							break;
						}
						!targetLine && line.includes("node_modules") && (targetLine = line);
					}
				}
				if (!targetLine) return "";
				let match = targetLine.match(/at .+? \((.+?):(\d+):\d+\)/) || targetLine.match(/at (.+?):(\d+):\d+/);
				if (!match) return "";
				let fileName = match[1];
				const lineNumber = match[2];
				fileName.startsWith("file:///") ? (fileName = fileName.replace("file:///", ""), "win32" === process.platform && (fileName = fileName.replace(/\//g, "\\"))) : fileName.startsWith("file://") && (fileName = fileName.replace("file://", ""));
				let relativePath = "";
				if (fileName.includes("node_modules")) {
					const nodeModulesMatch = fileName.match(/node_modules[\\\/]([^\\\/]+)[\\\/](.+)/);
					if (nodeModulesMatch) {
						const packageName = nodeModulesMatch[1], packagePath = nodeModulesMatch[2];
						relativePath = "karin-plugin-kkk" === packageName || packageName.startsWith("@") ? `${packageName}/${packagePath}` : `node_modules/${packageName}/${packagePath}`;
					} else relativePath = path.basename(fileName);
				} else {
					let currentDir = fileName, monorepoRoot = "";
					for (; currentDir !== path.dirname(currentDir);) {
						currentDir = path.dirname(currentDir);
						try {
							const fs$1 = __require("fs");
							if (fs$1.existsSync(path.join(currentDir, "pnpm-workspace.yaml")) || fs$1.existsSync(path.join(currentDir, "lerna.json")) || fs$1.existsSync(path.join(currentDir, "rush.json")) || fs$1.existsSync(path.join(currentDir, "package.json"))) {
								monorepoRoot = currentDir;
								break;
							}
						} catch {
							continue;
						}
					}
					if (monorepoRoot) relativePath = path.relative(monorepoRoot, fileName);
					else {
						const packagesMatch = fileName.match(/.*[\\\/]packages[\\\/](.+)/);
						relativePath = packagesMatch ? `packages/${packagesMatch[1]}` : path.relative(process.cwd(), fileName);
					}
				}
				if (relativePath = relativePath.replace(/\\/g, "/"), relativePath.length > 60) {
					const parts = relativePath.split("/");
					parts.length > 2 && (relativePath = `.../${parts.slice(-2).join("/")}`);
				}
				return `[${relativePath}:${lineNumber}] `;
			} catch {
				return "";
			}
		}
		formatTimestamp() {
			const now = /* @__PURE__ */ new Date();
			return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}`;
		}
		log(level, levelStr, color, message, ...args) {
			if (level < getLogLevel()) return;
			const timestamp = this.formatTimestamp(), formattedLevel = levelStr.padEnd(4), callSite = this.getCallSite(), basePrefix = `[kkk/template][${timestamp}][${formattedLevel}]`, prefix = (this.enableColors ? color(basePrefix) : basePrefix) + (callSite ? ` ${this.enableColors ? this.gray(callSite) : callSite}` : "");
			switch (level) {
				case LogLevel.ERROR:
					console.error(prefix, message, ...args);
					break;
				case LogLevel.WARN:
					console.warn(prefix, message, ...args);
					break;
				default: console.log(prefix, message, ...args);
			}
		}
		debug(message, ...args) {
			this.log(LogLevel.DEBUG, "DEBU", this.cyan, message, ...args);
		}
		info(message, ...args) {
			this.log(LogLevel.INFO, "INFO", this.green, message, ...args);
		}
		warn(message, ...args) {
			this.log(LogLevel.WARN, "WARN", this.yellow, message, ...args);
		}
		error(message, ...args) {
			this.log(LogLevel.ERROR, "ERRO", this.red, message, ...args);
		}
		mark(message, ...args) {
			this.log(LogLevel.MARK, "MARK", this.gray, message, ...args);
		}
	}();
}), init_ComponentAutoRegistry = __esmMin(() => {
	init_config(), init_logger(), ComponentAutoRegistry = class {
		static {
			this.components = /* @__PURE__ */ new Map();
		}
		static {
			this.initialized = !1;
		}
		static async initialize() {
			if (this.initialized) return;
			const cwd = process.cwd();
			logger.debug("当前环境: NODE_ENV =", process.env.NODE_ENV || "production"), logger.debug("当前工作目录:", cwd), logger.debug("开始自动注册组件...");
			for (const platformConfig of componentConfigs) await this.registerPlatformComponents(platformConfig);
			this.initialized = !0, logger.debug(`✅ 组件自动注册完成，共注册 ${this.components.size} 个组件`), logger.debug(`📦 已注册组件: ${Array.from(this.components.keys()).join(", ")}`);
		}
		static async registerPlatformComponents(platformConfig) {
			for (const componentConfig of platformConfig.components) if (componentConfig.enabled) try {
				await this.registerComponent(platformConfig.type, componentConfig);
			} catch (error) {
				logger.error(`❌ 注册组件失败: ${platformConfig.type}:${componentConfig.id}`, error);
			}
			else logger.debug(`⏭️ 跳过未启用组件: ${platformConfig.type}:${componentConfig.id}`);
		}
		static async registerComponent(platform, componentConfig) {
			const key = `${platform}:${componentConfig.id}`;
			if (componentConfig.lazyComponent) try {
				const module = await componentConfig.lazyComponent();
				this.components.set(key, {
					component: module.default,
					validateData: componentConfig.validateData,
					config: componentConfig
				}), logger.debug(`📝 注册懒加载组件: ${key}`);
			} catch (error) {
				logger.error(`❌ 懒加载组件失败: ${key}`, error);
			}
			else try {
				const modulePath = `../components/${componentConfig.componentPath}`, component = (await import(modulePath))[componentConfig.exportName];
				if (!component) throw new Error(`组件 ${componentConfig.exportName} 未在模块 ${modulePath} 中找到`);
				this.components.set(key, {
					component,
					validateData: componentConfig.validateData,
					config: componentConfig
				}), logger.debug(`📝 注册动态导入组件: ${key}`);
			} catch (error) {
				logger.error(`❌ 动态导入组件失败: ${key}`, error);
			}
		}
		static get(platform, componentId) {
			const key = `${platform}:${componentId}`;
			return this.components.get(key);
		}
		static has(platform, componentId) {
			const key = `${platform}:${componentId}`;
			return this.components.has(key);
		}
		static getAllKeys() {
			return Array.from(this.components.keys());
		}
		static async reload() {
			this.components.clear(), this.initialized = !1, await this.initialize();
		}
		static getStats() {
			const stats = {
				total: this.components.size,
				byPlatform: {}
			};
			for (const key of this.components.keys()) {
				const platform = key.split(":")[0];
				stats.byPlatform[platform] = (stats.byPlatform[platform] || 0) + 1;
			}
			return stats;
		}
	};
}), init_main = __esmMin(() => {
	import_browser = __toESM(require_browser()), import_react = __toESM(require_react()), import_server_node = __toESM(require_server_node()), init_ComponentAutoRegistry(), init_logger(), QRCodeGenerator = class {
		static async generateDataUrl(url, useDarkTheme = !1, config = {}) {
			const { width = 600, errorCorrectionLevel = "L" } = config, qrCodeSvg = await import_browser.toString(url, {
				type: "svg",
				width,
				errorCorrectionLevel,
				color: {
					dark: useDarkTheme ? "#C3C3C3" : "#3A3A3A",
					light: useDarkTheme ? "#18181B" : "#FAFAFA"
				},
				margin: 0
			});
			return `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg).toString("base64")}`;
		}
	}, ComponentRendererFactory = class {
		static async createComponent(request, qrCodeDataUrl) {
			const { templateType, templateName } = request, registryItem = ComponentAutoRegistry.get(templateType, templateName);
			if (!registryItem) throw new Error(`未找到组件配置: ${templateType}:${templateName}`);
			if (registryItem.validateData && !registryItem.validateData(request.data)) throw new Error(`数据验证失败: ${templateType}:${templateName}`);
			const props = {
				data: request.data,
				qrCodeDataUrl,
				version: request.version,
				scale: request.scale
			};
			return templateName.includes("/") && (props.subType = templateName.split("/")[1]), import_react.createElement(registryItem.component, props);
		}
	}, ResourcePathManager = class {
		constructor() {
			this.NODE_ENV = process.env.NODE_ENV || "production", this.packageDir = this.getPackageDir();
		}
		getPackageDir() {
			const cwd = process.cwd();
			if ("development" === this.NODE_ENV) {
				let currentDir = cwd;
				for (; currentDir !== path.dirname(currentDir);) {
					const renderDir = path.join(currentDir, "render");
					if (fs.existsSync(renderDir)) return logger.debug("开发模式：找到 render 目录:", renderDir), currentDir;
					currentDir = path.dirname(currentDir);
				}
				return path.join(path.dirname(cwd), "render");
			}
			return this.getPackageDirFromImportMeta();
		}
		getPackageDirFromImportMeta() {
			try {
				const currentModuleUrl = import.meta.url, currentModulePath = new URL(currentModuleUrl).pathname, normalizedPath = "win32" === process.platform ? currentModulePath.slice(1) : currentModulePath, pluginDir = this.extractPluginDirFromPnpmPath(normalizedPath);
				if (pluginDir) return logger.debug("从 pnpm 路径提取的插件目录:", pluginDir), pluginDir;
				const fallbackDir = this.findPluginDirByScanning();
				return fallbackDir ? (logger.debug("通过扫描找到的插件目录:", fallbackDir), fallbackDir) : (logger.debug(logger.yellow("无法找到插件目录，使用当前项目工作目录")), process.cwd());
			} catch (error) {
				return logger.error("获取 import.meta.url 失败:", error), process.cwd();
			}
		}
		extractPluginDirFromPnpmPath(pnpmPath) {
			const pnpmIndex = pnpmPath.indexOf(".pnpm");
			if (-1 === pnpmIndex) return null;
			const projectRoot = pnpmPath.substring(0, pnpmIndex - 14);
			logger.debug("从 pnpm 路径提取的项目根目录:", projectRoot);
			const pluginsDir = path.join(projectRoot, "plugins");
			if (!fs.existsSync(pluginsDir)) return logger.debug("plugins 目录不存在:", pluginsDir), null;
			try {
				const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: !0 }).filter((dirent) => dirent.isDirectory());
				for (const pluginDir of pluginDirs) {
					const pluginPath = path.join(pluginsDir, pluginDir.name), karinPluginPath = path.join(pluginPath, "node_modules", "karin-plugin-kkk");
					if (fs.existsSync(karinPluginPath)) return logger.debug("找到包含 karin-plugin-kkk 的插件目录:", pluginPath), pluginPath;
				}
			} catch (error) {
				logger.debug("扫描 plugins 目录失败:", error);
			}
			return null;
		}
		findPluginDirByScanning() {
			const cwd = process.cwd(), pluginsDir = path.join(cwd, "plugins");
			if (!fs.existsSync(pluginsDir)) return logger.debug("当前工作目录下没有 plugins 目录"), null;
			try {
				const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: !0 }).filter((dirent) => dirent.isDirectory());
				for (const pluginDir of pluginDirs) {
					const pluginPath = path.join(pluginsDir, pluginDir.name), karinPluginPath = path.join(pluginPath, "node_modules", "karin-plugin-kkk");
					if (fs.existsSync(karinPluginPath)) return logger.debug("通过扫描找到包含 karin-plugin-kkk 的插件目录:", pluginPath), pluginPath;
				}
			} catch (error) {
				logger.debug("扫描失败:", error);
			}
			return null;
		}
		isPluginMode() {
			const hasPluginsInPath = this.packageDir.includes("plugins"), pluginResourcesExists = fs.existsSync(path.join(this.packageDir, "resources")), npmPackageExists = fs.existsSync(path.join(this.packageDir, "node_modules", "karin-plugin-kkk"));
			return hasPluginsInPath && pluginResourcesExists && npmPackageExists;
		}
		getResourcePaths() {
			return "development" === this.NODE_ENV ? {
				cssDir: path.join(path.dirname(this.packageDir), "core", "lib"),
				imageDir: path.join(path.dirname(this.packageDir), "core/resources/image")
			} : this.isPluginMode() ? {
				cssDir: fs.existsSync(path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib")) ? path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib") : path.join(this.packageDir, "lib"),
				imageDir: path.join(this.packageDir, "resources", "image")
			} : {
				cssDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib"),
				imageDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "resources", "image")
			};
		}
	}, HtmlWrapper = class {
		constructor(resourceManager) {
			this.resourceManager = resourceManager;
		}
		wrapContent(htmlContent, htmlFilePath, isDark = !1) {
			const htmlDir = path.dirname(htmlFilePath), { cssDir, imageDir } = this.resourceManager.getResourcePaths(), cssRelativePath = path.relative(htmlDir, cssDir).replace(/\\/g, "/"), imageRelativePath = path.relative(htmlDir, imageDir).replace(/\\/g, "/");
			return `\n    <!DOCTYPE html>\n    <html lang="zh-CN">\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width">\n      <link rel="stylesheet" href="${path.join(cssRelativePath, "karin-plugin-kkk.css").replace(/\\/g, "/")}">\n    </head>\n    <body class="${isDark ? "dark" : ""}">\n      ${htmlContent.replace(/src="\/image\//g, `src="${imageRelativePath}/`)}\n    </body>\n    </html>\n    `;
		}
	}, SSRRender = class {
		constructor() {
			this.cssContent = "", this.resourceManager = new ResourcePathManager(), this.htmlWrapper = new HtmlWrapper(this.resourceManager), this.outputDir = "", this.loadCssContent();
		}
		loadCssContent() {
			try {
				const { cssDir } = this.resourceManager.getResourcePaths(), cssPath = path.join(cssDir, "karin-plugin-kkk.css");
				if (fs.existsSync(cssPath)) this.cssContent = fs.readFileSync(cssPath, "utf-8");
				else {
					logger.warn("⚠️ CSS文件未找到:", cssPath);
					const fallbackPath = path.join(this.resourceManager.packageDir, "dist/css/main.css");
					fs.existsSync(fallbackPath) && (this.cssContent = fs.readFileSync(fallbackPath, "utf-8"), logger.debug("✅ 从后备路径加载CSS:", fallbackPath));
				}
			} catch (error) {
				logger.error("❌ 加载CSS内容失败:", error);
			}
		}
		async renderComponent(request) {
			try {
				logger.debug("[SSR]开始渲染组件，预设模板:", `${logger.yellow(`${request.templateType}/`)}${request.templateName}`);
				const qrCodeDataUrl = await QRCodeGenerator.generateDataUrl(request.data.share_url || "https://github.com/ikenxuan/karin-plugin-kkk", request.data.useDarkTheme || !1), htmlContent = (0, import_server_node.renderToString)(await ComponentRendererFactory.createComponent(request, qrCodeDataUrl)), safeTemplateName = request.templateName.replace(/\//g, "_"), fileName = `${request.templateType}_${safeTemplateName}_${Date.now()}.html`, filePath = path.join(this.outputDir, fileName), fullHtml = this.htmlWrapper.wrapContent(htmlContent, filePath, request.data.useDarkTheme || !1);
				return fs.writeFileSync(filePath, fullHtml, "utf-8"), {
					success: !0,
					htmlPath: filePath
				};
			} catch (error) {
				return logger.error("❌ 渲染组件失败:", error), {
					success: !1,
					htmlPath: "",
					error: error instanceof Error ? error.message : String(error)
				};
			}
		}
		reloadCss() {
			this.loadCssContent();
		}
		async start() {
			await ComponentAutoRegistry.initialize();
			const stats = ComponentAutoRegistry.getStats();
			logger.debug(`📁 HTML输出目录: ${this.outputDir}`), logger.debug("🎨 CSS文件状态: " + (this.cssContent ? "已加载" : "未加载")), logger.debug(`📦 已注册组件总数: ${stats.total}`), logger.debug("📊 各平台组件数量:", stats.byPlatform), logger.debug(`🔧 已注册组件: ${ComponentAutoRegistry.getAllKeys().join(", ")}`);
		}
		async render(request) {
			return this.renderComponent(request);
		}
	}, reactServerRender = async (request, outputDir) => {
		fs.existsSync(outputDir) || fs.mkdirSync(outputDir, { recursive: !0 }), await ComponentAutoRegistry.initialize();
		const tempServer = new SSRRender();
		return tempServer.outputDir = outputDir, await tempServer.render(request);
	};
}), init_types = __esmMin(() => {}), init_client = __esmMin(() => {
	init_main$1(), init_main(), init_types(), client_default = reactServerRender;
});
init_client(), init_client();
var template_default = client_default;
export { reactServerRender as i, client_default as n, init_client as r, template_default as t };
