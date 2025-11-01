import { n as __esmMin, o as __toESM, r as __export } from "./rolldown-runtime-DWBZqjDW.js";
import { $ as ExternalLink, A as ThumbsDown, B as Power, C as Zap, D as TriangleAlert, E as UserPlus, F as Share2, G as LogIn, H as Music, I as Send, It as Chalk, J as Info, K as List, L as RefreshCw, M as Star, N as Sparkles, O as TrendingUp, P as Shield, Q as Eye, R as Radio, S as init_lucide_react, T as User, U as MessageCircle, V as Play, W as MapPin, X as Hash, Y as Heart, Z as FileText, _ as code_default, a as remarkGfm, at as CircleQuestionMark, b as HeroUIProvider, c as init_rehype_raw, ct as Calendar, d as rehypeHighlight, dt as BookOpen, et as Crown, f as init_react_markdown, ft as Bell, g as init_dist, gt as require_react, h as init_fa6, ht as require_server_node, i as init_remark_gfm, it as Clock, j as Terminal, k as ThumbsUp, l as rehypeRaw, lt as Bot, m as FaBug, mt as init_clsx, nt as Coins, o as init_remark_breaks, ot as CircleCheckBig, p as Markdown, pt as clsx_default, q as Link, r as init_chalk, rt as Code, s as remarkBreaks, st as CircleAlert, tt as CornerDownLeft, u as init_rehype_highlight, ut as Bookmark, v as chip_default, w as Users, x as require_jsx_runtime, y as button_default, z as QrCode } from "./vendor-DV0VAN7Y.js";
import path from "node:path";
import fs from "node:fs";
var init_main$1 = __esmMin(() => {});
var PlatformType;
var init_platforms = __esmMin(() => {
	PlatformType = function(PlatformType$1) {
		PlatformType$1["DOUYIN"] = "douyin";
		PlatformType$1["BILIBILI"] = "bilibili";
		PlatformType$1["KUAISHOU"] = "kuaishou";
		PlatformType$1["XIAOHONGSHU"] = "xiaohongshu";
		PlatformType$1["HELP"] = "help";
		PlatformType$1["OTHER"] = "other";
		return PlatformType$1;
	}({});
});
var baseComponentConfigs;
var init_config_base = __esmMin(() => {
	init_platforms();
	baseComponentConfigs = [
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
					enabled: true,
					componentPath: "platforms/douyin/Comment",
					exportName: "DouyinComment"
				},
				{
					id: "dynamic",
					name: "动态作品",
					description: "抖音动态作品展示模板",
					enabled: true,
					componentPath: "platforms/douyin/Dynamic",
					exportName: "DouyinDynamic"
				},
				{
					id: "live",
					name: "直播间",
					description: "抖音直播间信息模板",
					enabled: true,
					componentPath: "platforms/douyin/Live",
					exportName: "DouyinLive"
				},
				{
					id: "musicinfo",
					name: "音乐信息",
					description: "抖音音乐信息展示模板",
					enabled: true,
					componentPath: "platforms/douyin/MusicInfo",
					exportName: "DouyinMusicInfo"
				},
				{
					id: "user_profile",
					name: "用户主页",
					description: "抖音用户主页信息模板",
					enabled: false,
					componentPath: "platforms/douyin/UserProfile",
					exportName: "DouyinUserProfile"
				},
				{
					id: "userlist",
					name: "抖音推送列表",
					description: "抖音用户推送列表组件",
					enabled: true,
					componentPath: "platforms/douyin/UserList",
					exportName: "default"
				},
				{
					id: "videoInfo",
					name: "视频信息",
					description: "抖音视频信息展示模板",
					enabled: true,
					componentPath: "platforms/douyin/videoInfo",
					exportName: "DouyinVideoInfo"
				},
				{
					id: "qrcodeImg",
					name: "登录二维码",
					description: "抖音登录二维码展示模板",
					enabled: true,
					componentPath: "platforms/douyin/qrcodeImg",
					exportName: "DouyinQrcodeImg"
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
					enabled: true,
					componentPath: "platforms/bilibili/Comment",
					exportName: "default"
				},
				{
					id: "userlist",
					name: "B站推送列表",
					description: "B站用户推送列表组件",
					enabled: true,
					componentPath: "platforms/bilibili/UserList",
					exportName: "default"
				},
				{
					id: "bangumi",
					name: "B站番剧列表",
					description: "B站番剧列表组件",
					enabled: true,
					componentPath: "platforms/bilibili/bangumi/BangumiBilibili",
					exportName: "default"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_DRAW",
					name: "图文动态",
					description: "B站图文动态展示模板",
					enabled: true,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW",
					exportName: "BilibiliDrawDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_AV",
					name: "视频动态",
					description: "B站视频动态展示模板",
					enabled: true,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_AV",
					exportName: "BilibiliVideoDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_FORWARD",
					name: "转发动态",
					description: "B站转发动态展示模板",
					enabled: true,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD",
					exportName: "BilibiliForwardDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_LIVE_RCMD",
					name: "直播动态",
					description: "B站直播动态展示模板",
					enabled: true,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
					exportName: "BilibiliLiveDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_ARTICLE",
					name: "专栏动态",
					description: "B站专栏动态展示模板",
					enabled: true,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_ARTICLE",
					exportName: "BilibiliArticleDynamic"
				},
				{
					id: "dynamic/DYNAMIC_TYPE_WORD",
					name: "纯文字动态",
					description: "B站纯文字动态展示模板",
					enabled: false,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_WORD",
					exportName: "BilibiliWordDynamic"
				},
				{
					id: "videoInfo",
					name: "视频信息",
					description: "B站视频信息展示模板",
					enabled: true,
					componentPath: "platforms/bilibili/videoInfo",
					exportName: "BilibiliVideoInfo"
				},
				{
					id: "qrcodeImg",
					name: "登录二维码",
					description: "B站登录二维码展示模板",
					enabled: true,
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
				enabled: true,
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
				enabled: true,
				componentPath: "platforms/xiaohongshu/noteInfo",
				exportName: "XiaohongshuNoteInfo"
			}, {
				id: "comment",
				name: "评论列表",
				description: "小红书评论列表展示模板",
				enabled: true,
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
					enabled: true,
					componentPath: "platforms/help/Help",
					exportName: "Help"
				},
				{
					id: "handlerError",
					name: "错误页面",
					description: "KKK插件错误页面",
					enabled: true,
					componentPath: "platforms/other/handlerError",
					exportName: "handlerError"
				},
				{
					id: "changelog",
					name: "更新日志",
					description: "KKK插件更新日志",
					enabled: true,
					componentPath: "platforms/other/changelog",
					exportName: "changelog"
				}
			]
		}
	];
});
var import_react$26, import_jsx_runtime$25, GlowImage, GlowText, GlowIcon, GlowBorderContainer, SmartGlowBorder;
var init_GlowImage = __esmMin(() => {
	import_react$26 = __toESM(require_react());
	import_jsx_runtime$25 = __toESM(require_jsx_runtime());
	GlowImage = ({ src, alt, className, imgClassName, mode = "blur-layer", blurRadius = 18, glowStrength = .6, scale = 1.06, shadowRadius = 28, crossOrigin }) => {
		const [shadowColor, setShadowColor] = import_react$26.useState("rgba(255,255,255,0.5)");
		import_react$26.useEffect(() => {
			if (mode !== "dominant-shadow") return;
			const img = new Image();
			if (crossOrigin) img.crossOrigin = crossOrigin;
			img.src = src;
			img.onload = () => {
				try {
					const size = 16;
					const canvas = document.createElement("canvas");
					canvas.width = size;
					canvas.height = size;
					const ctx = canvas.getContext("2d");
					if (!ctx) return;
					ctx.drawImage(img, 0, 0, size, size);
					const data = ctx.getImageData(0, 0, size, size).data;
					let r = 0, g = 0, b = 0, count = 0;
					for (let i = 0; i < data.length; i += 4) {
						if (data[i + 3] < 10) continue;
						r += data[i];
						g += data[i + 1];
						b += data[i + 2];
						count++;
					}
					if (count > 0) {
						r = Math.round(r / count);
						g = Math.round(g / count);
						b = Math.round(b / count);
						setShadowColor(`rgba(${r}, ${g}, ${b}, ${Math.min(glowStrength, .85)})`);
					}
				} catch {}
			};
		}, [
			mode,
			src,
			glowStrength,
			crossOrigin
		]);
		if (mode === "dominant-shadow") return (0, import_jsx_runtime$25.jsx)("img", {
			src,
			alt,
			className: imgClassName,
			style: { filter: `drop-shadow(0 0 ${shadowRadius}px ${shadowColor}) drop-shadow(0 0 ${Math.round(shadowRadius * .6)}px ${shadowColor})` }
		});
		return (0, import_jsx_runtime$25.jsxs)("div", {
			className,
			style: {
				position: "relative",
				display: "inline-block"
			},
			children: [(0, import_jsx_runtime$25.jsx)("img", {
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
			}), (0, import_jsx_runtime$25.jsx)("img", {
				src,
				alt,
				className: imgClassName
			})]
		});
	};
	GlowText = ({ children, className, glowClassName, blurRadius = 12, glowStrength = .6, scale = 1.02 }) => (0, import_jsx_runtime$25.jsxs)("span", {
		className,
		style: {
			position: "relative",
			display: "inline-block"
		},
		children: [(0, import_jsx_runtime$25.jsx)("span", {
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
		}), (0, import_jsx_runtime$25.jsx)("span", { children })]
	});
	GlowIcon = ({ Icon, iconProps = {}, className, glowColor, glowStrength = .8, glowRadius = 12, glowLayers = 3, glowSpread = 4 }) => {
		const dropShadow = import_react$26.useMemo(() => Array.from({ length: glowLayers }, (_, i) => {
			const radius = glowRadius + i * glowSpread;
			const opacity = Math.min(glowStrength * (1 - i * .2), 1);
			return `drop-shadow(0 0 ${radius}px ${glowColor ? glowColor.replace(/rgb\(([^)]+)\)/, `rgba($1, ${opacity})`) : `rgba(255, 255, 255, ${opacity})`})`;
		}).join(" "), [
			glowColor,
			glowStrength,
			glowRadius,
			glowLayers,
			glowSpread
		]);
		return (0, import_jsx_runtime$25.jsx)("div", {
			className,
			style: { display: "inline-block" },
			children: (0, import_jsx_runtime$25.jsx)(Icon, {
				...iconProps,
				style: {
					filter: dropShadow,
					...iconProps.style
				}
			})
		});
	};
	GlowBorderContainer = ({ children, className, glowColor = "rgb(245, 158, 11)", glowStrength = .6, borderWidth = 1, borderRadius, glowPosition = "left-top", lightInfluenceRange = .3 }) => {
		const generateBorderGradient = (position) => {
			const glowRgbMatch = glowColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
			const glowRgb = glowRgbMatch ? `${glowRgbMatch[1]}, ${glowRgbMatch[2]}, ${glowRgbMatch[3]}` : "245, 158, 11";
			const maxGlow = `rgba(${glowRgb}, ${glowStrength})`;
			const strongGlow = `rgba(${glowRgb}, ${glowStrength * .7})`;
			const mediumGlow = `rgba(${glowRgb}, ${glowStrength * .4})`;
			const weakGlow = `rgba(${glowRgb}, ${glowStrength * .15})`;
			const maxInfluence = Math.round(lightInfluenceRange * 100);
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
		};
		return (0, import_jsx_runtime$25.jsx)("div", {
			className,
			style: {
				position: "relative",
				background: generateBorderGradient(glowPosition),
				padding: `${borderWidth}px`,
				borderRadius
			},
			children: (0, import_jsx_runtime$25.jsx)("div", {
				style: {
					borderRadius: borderRadius ? `calc(${borderRadius} - ${borderWidth}px)` : void 0,
					overflow: "hidden",
					background: "var(--background)",
					width: "100%",
					height: "100%"
				},
				children
			})
		});
	};
	SmartGlowBorder = ({ children, className, glowColor, glowStrength = .5, borderWidth = 1, borderRadius = "1.5rem", glowPosition = "left-top", lightInfluenceRange = .3, enableDynamicGlow = true }) => {
		const containerRef = import_react$26.useRef(null);
		const [detectedGlowColor, setDetectedGlowColor] = import_react$26.useState("rgb(245, 158, 11)");
		import_react$26.useEffect(() => {
			if (!enableDynamicGlow || glowColor) return;
			const container = containerRef.current;
			if (container) {
				if (container.querySelectorAll("[style*=\"drop-shadow\"], [style*=\"filter\"]").length > 0) setDetectedGlowColor("rgb(245, 158, 11)");
			}
		}, [
			enableDynamicGlow,
			glowColor,
			children
		]);
		return (0, import_jsx_runtime$25.jsx)("div", {
			ref: containerRef,
			children: (0, import_jsx_runtime$25.jsx)(GlowBorderContainer, {
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
}), import_jsx_runtime$24, DefaultLayout;
var init_DefaultLayout = __esmMin(() => {
	init_dist();
	init_clsx();
	init_lucide_react();
	__toESM(require_react());
	init_GlowImage();
	import_jsx_runtime$24 = __toESM(require_jsx_runtime());
	DefaultLayout = ({ children, version, data, scale = 3, className = "", style = {} }) => {
		const { useDarkTheme } = data;
		return (0, import_jsx_runtime$24.jsx)(HeroUIProvider, { children: (0, import_jsx_runtime$24.jsxs)("div", {
			className: clsx_default("w-[1440px]", "bg-default-50 text-default-900", "font-[HarmonyOSHans-Regular]", className, useDarkTheme),
			id: "container",
			style: {
				transform: `scale(${scale})`,
				transformOrigin: "top left",
				width: "1440px",
				...style
			},
			children: [children, version ? (0, import_jsx_runtime$24.jsxs)("div", {
				className: "pt-32 pb-20 text-default-800",
				children: [(0, import_jsx_runtime$24.jsxs)("div", {
					className: "flex relative justify-center items-center mb-12 space-x-8",
					children: [(0, import_jsx_runtime$24.jsxs)("div", {
						className: "flex items-end space-x-8",
						children: [(0, import_jsx_runtime$24.jsx)(GlowImage, {
							src: "/image/logo.png",
							alt: "logo",
							imgClassName: "w-auto h-18",
							glowStrength: 1,
							blurRadius: 50
						}), (0, import_jsx_runtime$24.jsxs)("div", {
							className: "flex flex-col items-start opacity-90",
							children: [(0, import_jsx_runtime$24.jsx)("div", {
								className: "flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900",
								children: (0, import_jsx_runtime$24.jsx)("span", { children: version.plugin })
							}), (0, import_jsx_runtime$24.jsx)("span", {
								className: "text-5xl font-black",
								children: version.pluginName
							})]
						})]
					}), (0, import_jsx_runtime$24.jsxs)("div", {
						className: "flex flex-col items-start opacity-90",
						children: [(0, import_jsx_runtime$24.jsxs)("div", {
							className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
							children: [version.releaseType === "Stable" ? (0, import_jsx_runtime$24.jsx)(CircleCheckBig, {
								strokeWidth: 3,
								className: "w-4 h-4 text-success/90"
							}) : version.releaseType === "Preview" ? (0, import_jsx_runtime$24.jsx)(TriangleAlert, {
								strokeWidth: 3,
								className: "w-4 h-4 text-warning"
							}) : (0, import_jsx_runtime$24.jsx)(Info, {
								strokeWidth: 3,
								className: "w-4 h-4"
							}), version.releaseType === "Stable" ? (0, import_jsx_runtime$24.jsx)("span", {
								className: "text-success/90",
								children: version.releaseType
							}) : (0, import_jsx_runtime$24.jsx)("span", {
								className: "text-warning",
								children: version.releaseType
							})]
						}), (0, import_jsx_runtime$24.jsx)("div", {
							className: "text-5xl font-bold tracking-wide",
							children: version.releaseType === "Stable" ? (0, import_jsx_runtime$24.jsxs)("span", {
								className: "text-success/90",
								children: ["v", version.pluginVersion]
							}) : (0, import_jsx_runtime$24.jsxs)("span", {
								className: "text-warning",
								children: ["v", version.pluginVersion]
							})
						})]
					})]
				}), (0, import_jsx_runtime$24.jsxs)("div", {
					className: "flex relative justify-center items-center space-x-8",
					children: [
						(0, import_jsx_runtime$24.jsxs)("div", {
							className: "flex items-end space-x-8",
							children: [(0, import_jsx_runtime$24.jsx)(GlowImage, {
								src: "/image/frame-logo.png",
								alt: "logo",
								imgClassName: "w-auto h-18",
								glowStrength: 1,
								blurRadius: 40
							}), (0, import_jsx_runtime$24.jsxs)("div", {
								className: "flex flex-col items-start",
								children: [(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
									children: [(0, import_jsx_runtime$24.jsx)(Zap, {
										strokeWidth: 3,
										className: "w-4 h-4 opacity-90"
									}), (0, import_jsx_runtime$24.jsx)("span", {
										className: "opacity-90",
										children: "Is Driven By"
									})]
								}), (0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-end space-x-2",
									children: [(0, import_jsx_runtime$24.jsx)("span", {
										className: "text-5xl font-black leading-none opacity-90",
										children: version.poweredBy
									}), (0, import_jsx_runtime$24.jsxs)("span", {
										className: "pb-1 text-2xl font-bold leading-none opacity-90",
										children: ["v", version.frameworkVersion]
									})]
								})]
							})]
						}),
						(0, import_jsx_runtime$24.jsx)("div", { className: "w-1 h-14 opacity-90 bg-default-900" }),
						(0, import_jsx_runtime$24.jsxs)("div", {
							className: "flex items-end space-x-8",
							children: [(0, import_jsx_runtime$24.jsx)(GlowImage, {
								src: "/image/vite.svg",
								alt: "logo",
								imgClassName: "w-auto h-18",
								glowStrength: 1,
								blurRadius: 20
							}), (0, import_jsx_runtime$24.jsxs)("div", {
								className: "flex flex-col items-start opacity-90",
								children: [(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
									children: [
										(0, import_jsx_runtime$24.jsx)(Code, {
											strokeWidth: 3,
											className: "w-4 h-4"
										}),
										(0, import_jsx_runtime$24.jsx)("span", { children: "Built with" }),
										(0, import_jsx_runtime$24.jsx)(GlowImage, {
											src: "/image/rolldown.svg",
											alt: "logo",
											imgClassName: "w-5 h-5",
											glowStrength: 3,
											blurRadius: 10
										})
									]
								}), (0, import_jsx_runtime$24.jsx)("span", {
									className: "text-5xl font-black",
									children: "Rolldown-Vite"
								})]
							})]
						})
					]
				})]
			}) : (0, import_jsx_runtime$24.jsx)("div", { className: "h-24" })]
		}) });
	};
});
var Comment_exports$3 = __export({
	DouyinComment: () => DouyinComment,
	default: () => Comment_default$3
});
var import_react$24, import_jsx_runtime$23, QRCodeSection$4, VideoInfoHeader$1, CommentItemComponent$2, DouyinComment, Comment_default$3;
var init_Comment$3 = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$24 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$23 = __toESM(require_jsx_runtime());
	QRCodeSection$4 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$23.jsx)("div", {
		className: "flex flex-col items-center -mr-10",
		children: (0, import_jsx_runtime$23.jsx)("div", {
			className: "flex justify-center items-center mt-20 rounded-lg w-120 h-120 bg-content1 shadow-medium",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$23.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full"
			}) : (0, import_jsx_runtime$23.jsxs)("div", {
				className: "flex flex-col justify-center items-center text-foreground-400",
				children: [(0, import_jsx_runtime$23.jsx)(QrCode, {
					size: 80,
					className: "mb-4"
				}), (0, import_jsx_runtime$23.jsx)("span", {
					className: "text-lg",
					children: "二维码生成失败"
				})]
			})
		})
	});
	VideoInfoHeader$1 = ({ type, commentLength, videoSize, videoFPS, imageLength, qrCodeDataUrl, useDarkTheme }) => (0, import_jsx_runtime$23.jsxs)("div", {
		className: "flex justify-between items-center max-w-[1200px] mx-auto p-5",
		children: [(0, import_jsx_runtime$23.jsxs)("div", {
			className: "mt-2.5 flex flex-col -ml-10",
			children: [(0, import_jsx_runtime$23.jsx)("div", {
				className: "absolute top-0 left-0 transform translate-x-[9%] translate-y-[17%] w-[650px] h-[300px]",
				children: (0, import_jsx_runtime$23.jsx)("img", {
					src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
					alt: "抖音Logo",
					className: "object-contain pb-10 w-full h-full",
					onError: (e) => {
						const target = e.target;
						target.style.display = "none";
						const parent = target.parentElement;
						if (parent) parent.innerHTML = "<div class=\"flex justify-center items-center h-full text-2xl font-bold text-foreground-600\">抖音</div>";
					}
				})
			}), (0, import_jsx_runtime$23.jsxs)("div", {
				className: "mt-[250px] space-y-2 text-foreground-500",
				children: [
					(0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: ["作品类型：", type]
					}),
					(0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"评论数量：",
							commentLength,
							"条"
						]
					}),
					type === "视频" && (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [(0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"视频大小：",
							videoSize,
							"MB"
						]
					}), (0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"视频帧率：",
							videoFPS,
							"Hz"
						]
					})] }),
					(type === "图集" || type === "合辑") && (0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text",
						children: [
							"图片数量：",
							imageLength,
							"张"
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$23.jsx)(QRCodeSection$4, { qrCodeDataUrl })]
	});
	CommentItemComponent$2 = ({ comment, isLast = false }) => (0, import_jsx_runtime$23.jsxs)("div", {
		className: clsx_default("flex px-10 pt-10", {
			"pb-0": isLast,
			"pb-10": !isLast
		}),
		children: [(0, import_jsx_runtime$23.jsx)("img", {
			src: comment.userimageurl,
			className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
			alt: "用户头像"
		}), (0, import_jsx_runtime$23.jsxs)("div", {
			className: "flex-1",
			children: [
				(0, import_jsx_runtime$23.jsxs)("div", {
					className: "mb-12.5 text-5xl text-foreground-600 relative flex items-center select-text",
					children: [
						(0, import_jsx_runtime$23.jsx)("span", {
							className: "font-medium",
							children: comment.nickname
						}),
						comment.label_type === 1 && (0, import_jsx_runtime$23.jsx)("div", {
							className: "inline-block px-4 py-3 rounded-xl ml-3 text-4xl bg-[#fe2c55] text-white",
							children: "作者"
						}),
						comment.status_label && (0, import_jsx_runtime$23.jsx)("div", {
							className: "inline-block px-4 py-3 ml-3 text-4xl rounded-xl bg-content3 text-foreground-700",
							children: comment.status_label
						})
					]
				}),
				(0, import_jsx_runtime$23.jsx)("div", {
					className: "text-6xl text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
					dangerouslySetInnerHTML: { __html: comment.text },
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				}),
				(comment.commentimage || comment.sticker) && (0, import_jsx_runtime$23.jsx)("div", {
					className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1",
					children: (0, import_jsx_runtime$23.jsx)("img", {
						className: "object-contain w-full h-full rounded-2xl",
						src: comment.commentimage || comment.sticker,
						alt: "评论图片"
					})
				}),
				(0, import_jsx_runtime$23.jsxs)("div", {
					className: "flex justify-between items-center mt-6 text-foreground-500",
					children: [(0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex items-center space-x-6 select-text",
						children: [
							(0, import_jsx_runtime$23.jsx)("span", {
								className: "text-5xl",
								children: comment.create_time
							}),
							(0, import_jsx_runtime$23.jsx)("span", {
								className: "text-5xl",
								children: comment.ip_label
							}),
							comment.reply_comment_total > 0 ? (0, import_jsx_runtime$23.jsxs)("span", {
								className: "text-5xl text-foreground-600",
								children: [
									"共",
									comment.reply_comment_total,
									"条回复"
								]
							}) : (0, import_jsx_runtime$23.jsx)("span", {
								className: "text-5xl text-foreground-600",
								children: "回复"
							})
						]
					}), (0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [(0, import_jsx_runtime$23.jsxs)("div", {
							className: "flex items-center space-x-2 transition-colors cursor-pointer",
							children: [(0, import_jsx_runtime$23.jsx)(Heart, {
								size: 60,
								className: "text-foreground-500"
							}), (0, import_jsx_runtime$23.jsx)("span", {
								className: "text-5xl select-text",
								children: comment.digg_count
							})]
						}), (0, import_jsx_runtime$23.jsx)("div", {
							className: "flex items-center transition-colors cursor-pointer",
							children: (0, import_jsx_runtime$23.jsx)(MessageCircle, {
								size: 60,
								className: "stroke-current text-foreground-500"
							})
						})]
					})]
				}),
				comment.replyComment && Object.keys(comment.replyComment).length > 0 && (0, import_jsx_runtime$23.jsx)("div", {
					className: "pl-6 mt-20",
					children: (0, import_jsx_runtime$23.jsx)("div", {
						className: "py-4",
						children: (0, import_jsx_runtime$23.jsxs)("div", {
							className: "flex items-start space-x-4",
							children: [(0, import_jsx_runtime$23.jsx)("img", {
								src: comment.replyComment.userimageurl,
								className: "object-cover mr-8 rounded-full w-26 h-26",
								alt: "用户头像"
							}), (0, import_jsx_runtime$23.jsxs)("div", {
								className: "flex-1",
								children: [
									(0, import_jsx_runtime$23.jsxs)("div", {
										className: "flex items-center mb-2 space-x-2",
										children: [(0, import_jsx_runtime$23.jsx)("span", {
											className: "text-5xl font-medium text-foreground-600",
											children: comment.replyComment.nickname
										}), comment.replyComment.label_text !== "" && (0, import_jsx_runtime$23.jsx)("div", {
											className: clsx_default("inline-block px-4 py-2 ml-2 text-3xl rounded-xl", comment.replyComment.label_text === "作者" ? "bg-[#fe2c55] text-white" : "bg-default-100 text-default-500"),
											children: comment.replyComment.label_text
										})]
									}),
									(0, import_jsx_runtime$23.jsx)("div", {
										className: "text-6xl text-foreground leading-relaxed mb-2 mt-8  select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
										dangerouslySetInnerHTML: { __html: comment.replyComment.text },
										style: {
											wordBreak: "break-word",
											overflowWrap: "break-word"
										}
									}),
									(0, import_jsx_runtime$23.jsxs)("div", {
										className: "flex justify-between items-center mt-10 text-foreground-500",
										children: [(0, import_jsx_runtime$23.jsxs)("div", {
											className: "flex items-center space-x-4",
											children: [(0, import_jsx_runtime$23.jsx)("span", {
												className: "text-5xl",
												children: comment.replyComment.create_time
											}), (0, import_jsx_runtime$23.jsx)("span", {
												className: "text-5xl",
												children: comment.replyComment.ip_label
											})]
										}), (0, import_jsx_runtime$23.jsxs)("div", {
											className: "flex items-center space-x-2",
											children: [(0, import_jsx_runtime$23.jsx)(Heart, {
												size: 60,
												className: "text-foreground-500"
											}), (0, import_jsx_runtime$23.jsx)("span", {
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
				comment.replyComment && Object.keys(comment.replyComment).length > 0 && (0, import_jsx_runtime$23.jsx)("div", { className: "mx-auto mt-4 border-b-1 border-divider" })
			]
		})]
	});
	DouyinComment = import_react$24.memo((props) => {
		const processedData = (0, import_react$24.useMemo)(() => {
			if (!props.data) return {
				commentsArray: [],
				type: "未知",
				commentLength: 0,
				videoSize: void 0,
				videoFPS: void 0,
				imageLength: void 0,
				useDarkTheme: false
			};
			return {
				commentsArray: props.data.CommentsData?.jsonArray || [],
				type: props.data.Type || "未知",
				commentLength: props.data.CommentLength || 0,
				videoSize: props.data.VideoSize,
				videoFPS: props.data.VideoFPS,
				imageLength: props.data.ImageLength,
				useDarkTheme: props.data.useDarkTheme || false
			};
		}, [props.data]);
		return (0, import_jsx_runtime$23.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$23.jsxs)("div", {
				className: "p-5",
				children: [(0, import_jsx_runtime$23.jsx)(VideoInfoHeader$1, {
					type: processedData.type,
					commentLength: processedData.commentLength,
					videoSize: processedData.videoSize,
					videoFPS: processedData.videoFPS,
					imageLength: processedData.imageLength,
					qrCodeDataUrl: props.qrCodeDataUrl || "",
					useDarkTheme: processedData.useDarkTheme
				}), (0, import_jsx_runtime$23.jsx)("div", {
					className: "overflow-auto mx-auto max-w-full",
					children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => (0, import_jsx_runtime$23.jsx)(CommentItemComponent$2, {
						comment,
						isLast: index === processedData.commentsArray.length - 1
					}, index)) : (0, import_jsx_runtime$23.jsx)("div", {
						className: "flex justify-center items-center py-20 text-foreground-400",
						children: (0, import_jsx_runtime$23.jsxs)("div", {
							className: "text-center",
							children: [(0, import_jsx_runtime$23.jsx)(MessageCircle, {
								size: 64,
								className: "mx-auto mb-4 text-foreground-300 text-comment"
							}), (0, import_jsx_runtime$23.jsx)("p", {
								className: "text-xl",
								children: "暂无评论数据"
							})]
						})
					})
				})]
			})
		});
	});
	Comment_default$3 = DouyinComment;
});
var Dynamic_exports = __export({
	DouyinDynamic: () => DouyinDynamic,
	default: () => Dynamic_default
});
var import_react$23, import_jsx_runtime$22, DouyinHeader$1, CoverSection$1, InfoSection, UserInfoSection$1, QRCodeSection$3, CoCreatorsInfo, DouyinDynamic, Dynamic_default;
var init_Dynamic = __esmMin(() => {
	init_lucide_react();
	import_react$23 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$22 = __toESM(require_jsx_runtime());
	DouyinHeader$1 = ({ useDarkTheme }) => (0, import_jsx_runtime$22.jsxs)("div", {
		className: "flex items-center px-12 py-15",
		children: [(0, import_jsx_runtime$22.jsx)("div", {
			className: "w-[39%] h-[200px] bg-cover bg-center bg-fixed",
			children: (0, import_jsx_runtime$22.jsx)("img", {
				src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
				alt: "抖音Logo",
				className: "object-contain w-full h-full"
			})
		}), (0, import_jsx_runtime$22.jsx)("span", {
			className: "text-[65px] ml-4 text-foreground-600",
			children: "记录美好生活"
		})]
	});
	CoverSection$1 = ({ imageUrl }) => (0, import_jsx_runtime$22.jsx)("div", {
		className: "flex flex-col items-center my-5",
		children: (0, import_jsx_runtime$22.jsx)("div", {
			className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative",
			children: (0, import_jsx_runtime$22.jsx)("img", {
				className: "rounded-[25px] object-contain w-full h-full",
				src: imageUrl,
				alt: "封面"
			})
		})
	});
	InfoSection = ({ desc, dianzan, pinglun, shouchang, share, createTime }) => (0, import_jsx_runtime$22.jsxs)("div", {
		className: "flex flex-col px-16 py-5",
		children: [
			(0, import_jsx_runtime$22.jsx)("div", {
				className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
				style: {
					letterSpacing: "1.5px",
					wordWrap: "break-word"
				},
				dangerouslySetInnerHTML: { __html: desc }
			}),
			(0, import_jsx_runtime$22.jsxs)("div", {
				className: "flex items-center gap-6 text-[45px] text-foreground-500 font-light mb-2.5 select-text",
				children: [
					(0, import_jsx_runtime$22.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$22.jsx)(Heart, { className: "w-11 h-11 text-like" }), (0, import_jsx_runtime$22.jsxs)("span", { children: [dianzan, "点赞"] })]
					}),
					(0, import_jsx_runtime$22.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$22.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$22.jsx)(MessageCircle, { className: "w-11 h-11 text-comment" }), (0, import_jsx_runtime$22.jsxs)("span", { children: [pinglun, "评论"] })]
					}),
					(0, import_jsx_runtime$22.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$22.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$22.jsx)(Bookmark, { className: "w-11 h-11" }), (0, import_jsx_runtime$22.jsxs)("span", { children: [shouchang, "收藏"] })]
					}),
					(0, import_jsx_runtime$22.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$22.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$22.jsx)(Share2, { className: "w-11 h-11 text-success" }), (0, import_jsx_runtime$22.jsxs)("span", { children: [share, "分享"] })]
					})
				]
			}),
			(0, import_jsx_runtime$22.jsxs)("div", {
				className: "flex items-center gap-2 text-[45px] text-foreground-500 font-light select-text",
				children: [(0, import_jsx_runtime$22.jsx)(Clock, { className: "w-11 h-11 text-time" }), (0, import_jsx_runtime$22.jsxs)("span", { children: ["发布于", createTime] })]
			})
		]
	});
	UserInfoSection$1 = ({ avater_url, username, douyinId, likes, following, followers, coCreatorCount }) => (0, import_jsx_runtime$22.jsxs)("div", {
		className: "flex flex-col pl-16",
		children: [(0, import_jsx_runtime$22.jsxs)("div", {
			className: "flex items-center mb-6",
			children: [(0, import_jsx_runtime$22.jsx)("div", {
				className: "flex justify-center items-center mr-7 bg-white rounded-full w-54 h-54",
				children: (0, import_jsx_runtime$22.jsx)("img", {
					src: avater_url,
					alt: "头像",
					className: "rounded-full w-51 h-51 shadow-large"
				})
			}), (0, import_jsx_runtime$22.jsxs)("div", {
				className: "flex flex-col flex-1 min-w-0",
				children: [(0, import_jsx_runtime$22.jsxs)("span", {
					className: "text-[80px] font-bold text-foreground-700 select-text break-words leading-tight max-w-full",
					children: ["@", username]
				}), coCreatorCount && coCreatorCount > 0 && (0, import_jsx_runtime$22.jsxs)("div", {
					className: "gap-2 mt-3 inline-flex items-center rounded-[20px] bg-foreground-200 text-foreground-700 px-6 py-3 self-start",
					children: [(0, import_jsx_runtime$22.jsx)(Users, { className: "w-8 h-8" }), (0, import_jsx_runtime$22.jsxs)("span", {
						className: "text-[34px] leading-none select-text text-foreground-700",
						children: [coCreatorCount, "人共创"]
					})]
				})]
			})]
		}), (0, import_jsx_runtime$22.jsxs)("div", {
			className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground-600 select-text",
			style: { letterSpacing: "2.5px" },
			children: [
				(0, import_jsx_runtime$22.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$22.jsx)(Hash, { className: "w-8 h-8" }), (0, import_jsx_runtime$22.jsxs)("span", { children: ["抖音号: ", douyinId] })]
				}),
				(0, import_jsx_runtime$22.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$22.jsx)(Heart, { className: "w-8 h-8 text-like" }), (0, import_jsx_runtime$22.jsxs)("span", { children: ["获赞: ", likes] })]
				}),
				(0, import_jsx_runtime$22.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$22.jsx)(Eye, { className: "w-8 h-8 text-view" }), (0, import_jsx_runtime$22.jsxs)("span", { children: ["关注: ", following] })]
				}),
				(0, import_jsx_runtime$22.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$22.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$22.jsxs)("span", { children: ["粉丝: ", followers] })]
				})
			]
		})]
	});
	QRCodeSection$3 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$22.jsxs)("div", {
		className: "flex flex-col items-center w-[420px] mr-18",
		children: [(0, import_jsx_runtime$22.jsx)("div", {
			className: "p-2.5 rounded-sm border-[7px] border-dashed border-divider",
			children: (0, import_jsx_runtime$22.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-[350px] h-[350px]"
			})
		}), (0, import_jsx_runtime$22.jsxs)("div", {
			className: "flex items-center gap-3 text-[40px] text-foreground-500 mt-5 select-text",
			children: [(0, import_jsx_runtime$22.jsx)(QrCode, { className: "w-10 h-10" }), (0, import_jsx_runtime$22.jsx)("span", {
				className: "whitespace-nowrap",
				children: "作品直链：永久有效"
			})]
		})]
	});
	CoCreatorsInfo = ({ info }) => {
		const creators = info?.co_creators ?? [];
		if (creators.length === 0) return null;
		const items = creators.slice(0, 50);
		const listRef = import_react$23.useRef(null);
		const [visibleCount, setVisibleCount] = import_react$23.useState(items.length);
		import_react$23.useEffect(() => {
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
		return (0, import_jsx_runtime$22.jsx)("div", {
			className: "flex flex-col pl-16 w-full",
			children: (0, import_jsx_runtime$22.jsxs)("div", {
				ref: listRef,
				className: "flex overflow-hidden gap-8 py-1 pr-2 w-full",
				style: { scrollbarWidth: "thin" },
				children: [items.slice(0, visibleCount).map((c, idx) => {
					const avatar = c.avatar_thumb?.url_list[0];
					return (0, import_jsx_runtime$22.jsxs)("div", {
						className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0",
						children: [
							(0, import_jsx_runtime$22.jsx)("div", {
								className: "flex justify-center items-center bg-white rounded-full w-38 h-38",
								children: (0, import_jsx_runtime$22.jsx)("img", {
									src: avatar,
									alt: "共创者头像",
									className: "object-cover w-36 h-36 rounded-full"
								})
							}),
							(0, import_jsx_runtime$22.jsx)("div", {
								className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700",
								children: c.nickname || "未提供"
							}),
							(0, import_jsx_runtime$22.jsx)("div", {
								className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600",
								children: c.role_title || "未提供"
							})
						]
					}, `${c.nickname || "creator"}-${idx}`);
				}), items.length > visibleCount && (0, import_jsx_runtime$22.jsxs)("div", {
					className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0",
					children: [
						(0, import_jsx_runtime$22.jsx)("div", {
							className: "flex justify-center items-center rounded-full bg-default-200 w-38 h-38",
							children: (0, import_jsx_runtime$22.jsx)("span", {
								className: "text-[42px] leading-none text-foreground-500",
								children: "···"
							})
						}),
						(0, import_jsx_runtime$22.jsxs)("div", {
							className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700",
							children: [
								"还有",
								items.length - visibleCount,
								"人"
							]
						}),
						(0, import_jsx_runtime$22.jsx)("div", {
							className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600",
							children: "共创"
						})
					]
				})]
			})
		});
	};
	DouyinDynamic = (props) => {
		const { data, qrCodeDataUrl } = props;
		const coCreatorCount = data.cooperation_info?.co_creator_nums ?? data.cooperation_info?.co_creators?.length ?? void 0;
		return (0, import_jsx_runtime$22.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$22.jsxs)("div", { children: [
				(0, import_jsx_runtime$22.jsx)("div", { className: "h-[60px]" }),
				(0, import_jsx_runtime$22.jsx)(DouyinHeader$1, { useDarkTheme: data.useDarkTheme }),
				(0, import_jsx_runtime$22.jsx)("div", { className: "h-[60px]" }),
				(0, import_jsx_runtime$22.jsx)(CoverSection$1, { imageUrl: data.image_url }),
				(0, import_jsx_runtime$22.jsx)("div", { className: "h-[20px]" }),
				(0, import_jsx_runtime$22.jsx)(InfoSection, {
					desc: data.desc,
					dianzan: data.dianzan,
					pinglun: data.pinglun,
					shouchang: data.shouchang,
					share: data.share,
					createTime: data.create_time,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$22.jsx)("div", { className: "h-[100px]" }),
				(0, import_jsx_runtime$22.jsxs)("div", {
					className: "flex flex-col gap-10 px-0 pt-25",
					children: [(0, import_jsx_runtime$22.jsx)("div", {
						className: "w-full",
						children: (0, import_jsx_runtime$22.jsx)(CoCreatorsInfo, { info: data.cooperation_info })
					}), (0, import_jsx_runtime$22.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [(0, import_jsx_runtime$22.jsx)("div", {
							className: "flex flex-col gap-8 items-start w-[960px]",
							children: (0, import_jsx_runtime$22.jsx)(UserInfoSection$1, {
								avater_url: data.avater_url,
								username: data.username,
								douyinId: data.抖音号,
								likes: data.获赞,
								following: data.关注,
								followers: data.粉丝,
								useDarkTheme: data.useDarkTheme,
								coCreatorCount
							})
						}), (0, import_jsx_runtime$22.jsx)(QRCodeSection$3, {
							qrCodeDataUrl,
							useDarkTheme: data.useDarkTheme
						})]
					})]
				})
			] })
		});
	};
	Dynamic_default = DouyinDynamic;
});
var Live_exports = __export({
	DouyinLive: () => DouyinLive,
	default: () => Live_default
}), import_jsx_runtime$21, CoverSection, UserInfoSection, QRCodeSection$2, DouyinLive, Live_default;
var init_Live = __esmMin(() => {
	init_lucide_react();
	__toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$21 = __toESM(require_jsx_runtime());
	CoverSection = ({ imageUrl }) => (0, import_jsx_runtime$21.jsx)("div", {
		className: "py-10",
		children: (0, import_jsx_runtime$21.jsx)("div", {
			className: "flex flex-col items-center",
			children: (0, import_jsx_runtime$21.jsx)("div", {
				className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[95%] flex-1 relative",
				children: (0, import_jsx_runtime$21.jsx)("img", {
					className: "rounded-[25px] object-contain w-full h-full select-text",
					src: imageUrl,
					alt: "封面"
				})
			})
		})
	});
	UserInfoSection = ({ avater_url, username, fans }) => (0, import_jsx_runtime$21.jsxs)("div", {
		className: "flex gap-10 items-center pr-20",
		children: [(0, import_jsx_runtime$21.jsx)("img", {
			src: avater_url,
			alt: "头像",
			className: "mr-[15px] rounded-full h-auto w-[130px] select-text"
		}), (0, import_jsx_runtime$21.jsxs)("div", {
			className: "flex flex-col items-start",
			children: [(0, import_jsx_runtime$21.jsxs)("div", {
				className: "flex flex-row items-center mb-[5px]",
				children: [
					(0, import_jsx_runtime$21.jsx)("div", {
						className: "text-[60px] text-foreground select-text",
						children: (0, import_jsx_runtime$21.jsx)("span", { children: username })
					}),
					(0, import_jsx_runtime$21.jsx)("div", { className: "w-4" }),
					(0, import_jsx_runtime$21.jsx)("img", {
						className: "w-[170px] h-auto select-text",
						src: "/image/douyin/抖音-直播中.png",
						alt: "直播中"
					})
				]
			}), (0, import_jsx_runtime$21.jsxs)("div", {
				className: "flex gap-2 items-center",
				children: [(0, import_jsx_runtime$21.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$21.jsxs)("span", {
					className: "text-default-500 text-[35px] select-text",
					children: [fans, "粉丝"]
				})]
			})]
		})]
	});
	QRCodeSection$2 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$21.jsxs)("div", {
		className: "flex flex-col-reverse items-center mt-[30px] mr-5",
		children: [(0, import_jsx_runtime$21.jsxs)("div", {
			className: "flex items-center gap-2 text-[50px] ml-[10px] text-right mr-[10px] text-foreground select-text",
			children: [(0, import_jsx_runtime$21.jsx)(QrCode, { className: "w-12 h-12" }), (0, import_jsx_runtime$21.jsx)("span", { children: "直播分享链接" })]
		}), (0, import_jsx_runtime$21.jsx)("div", {
			className: "p-[10px] rounded-[2%] border-[7px] border-dashed border-default-300",
			children: (0, import_jsx_runtime$21.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-[350px] select-text"
			})
		})]
	});
	DouyinLive = (props) => {
		const { qrCodeDataUrl } = props;
		return (0, import_jsx_runtime$21.jsxs)(DefaultLayout, {
			...props,
			children: [(0, import_jsx_runtime$21.jsx)(CoverSection, { imageUrl: props.data.image_url }), (0, import_jsx_runtime$21.jsxs)("div", {
				className: "flex flex-col px-20",
				children: [
					(0, import_jsx_runtime$21.jsx)("div", { className: "h-[10px]" }),
					(0, import_jsx_runtime$21.jsx)("div", {
						className: "text-[65px] items-center tracking-[1.5px] relative break-words font-bold text-foreground select-text",
						children: props.data.text
					}),
					(0, import_jsx_runtime$21.jsx)("div", { className: "h-[10px]" }),
					(0, import_jsx_runtime$21.jsx)("div", {
						className: "text-[45px] items-center tracking-[1.5px] relative break-words text-default-500 select-text",
						children: props.data.liveinf
					}),
					(0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex items-center gap-6 text-[45px] tracking-[1.5px] relative break-words text-default-500 select-text",
						children: [
							(0, import_jsx_runtime$21.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$21.jsx)(Eye, { className: "w-11 h-11 text-view" }), (0, import_jsx_runtime$21.jsxs)("span", { children: ["观看总人数", props.data.总观看次数] })]
							}),
							(0, import_jsx_runtime$21.jsx)("span", { children: "|" }),
							(0, import_jsx_runtime$21.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$21.jsx)(Users, { className: "w-11 h-11 text-follow" }), (0, import_jsx_runtime$21.jsxs)("span", { children: ["在线观众", props.data.在线观众] })]
							})
						]
					}),
					(0, import_jsx_runtime$21.jsx)("div", { className: "h-20" }),
					(0, import_jsx_runtime$21.jsx)(UserInfoSection, {
						avater_url: props.data.avater_url,
						username: props.data.username,
						fans: props.data.fans,
						useDarkTheme: props.data.useDarkTheme
					}),
					(0, import_jsx_runtime$21.jsx)("div", { className: "h-[120px]" }),
					(0, import_jsx_runtime$21.jsxs)("div", {
						className: "flex flex-col w-auto h-full",
						children: [(0, import_jsx_runtime$21.jsxs)("div", {
							className: "w-inherit text-[70px] text-right mr-5 -mb-[45px] z-[-1] text-foreground select-text",
							children: ["抖音", props.data.dynamicTYPE]
						}), (0, import_jsx_runtime$21.jsxs)("div", {
							className: "h-auto flex justify-between pt-[60px] items-center",
							children: [(0, import_jsx_runtime$21.jsx)("div", {
								className: "flex flex-col ml-[45px]",
								children: (0, import_jsx_runtime$21.jsxs)("div", {
									className: "flex flex-col justify-start items-start",
									children: [(0, import_jsx_runtime$21.jsx)("div", { className: `w-[130%] h-[245px] mb-[52px] bg-cover bg-center bg-fixed ${props.data.useDarkTheme ? "bg-[url(/image/douyin/dylogo-light.svg)]" : "bg-[url(/image/douyin/dylogo-dark.svg)]"}` }), (0, import_jsx_runtime$21.jsx)("div", {
										className: "flex flex-col items-start",
										children: (0, import_jsx_runtime$21.jsx)("div", {
											className: "text-[50px] tracking-[10px] text-foreground select-text",
											children: "抖音 记录美好生活"
										})
									})]
								})
							}), (0, import_jsx_runtime$21.jsx)(QRCodeSection$2, {
								qrCodeDataUrl,
								useDarkTheme: props.data.useDarkTheme
							})]
						})]
					})
				]
			})]
		});
	};
	Live_default = DouyinLive;
});
var MusicInfo_exports = __export({
	DouyinMusicInfo: () => DouyinMusicInfo,
	default: () => MusicInfo_default
}), import_jsx_runtime$20, DouyinHeader, MusicCoverSection, MusicInfoSection, MusicAuthorInfoSection, MusicQRCodeSection, DouyinMusicInfo, MusicInfo_default;
var init_MusicInfo = __esmMin(() => {
	init_lucide_react();
	__toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$20 = __toESM(require_jsx_runtime());
	DouyinHeader = ({ useDarkTheme }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: "flex items-center px-12 py-15",
		children: [(0, import_jsx_runtime$20.jsx)("div", {
			className: "w-[39%] h-[200px] bg-cover bg-center bg-fixed",
			children: (0, import_jsx_runtime$20.jsx)("img", {
				src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
				alt: "抖音Logo",
				className: "object-contain w-full h-full select-text"
			})
		}), (0, import_jsx_runtime$20.jsx)("span", {
			className: "text-[65px] ml-4 text-foreground select-text",
			children: "记录美好生活"
		})]
	});
	MusicCoverSection = ({ imageUrl }) => (0, import_jsx_runtime$20.jsx)("div", {
		className: "flex flex-col items-center my-5",
		children: (0, import_jsx_runtime$20.jsx)("div", {
			className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative",
			children: (0, import_jsx_runtime$20.jsx)("img", {
				className: "rounded-[25px] object-contain w-full h-full select-text",
				src: imageUrl,
				alt: "音乐封面"
			})
		})
	});
	MusicInfoSection = ({ desc, musicId, userCount, createTime }) => (0, import_jsx_runtime$20.jsxs)("div", {
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
				className: "flex flex-col gap-2 text-[45px] text-default-500 font-light mb-2.5",
				children: [(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center select-text",
					children: [(0, import_jsx_runtime$20.jsx)(Music, { className: "w-11 h-11" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["音乐ID: ", musicId] })]
				}), (0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center select-text",
					children: [(0, import_jsx_runtime$20.jsx)(Users, { className: "w-11 h-11 text-follow" }), (0, import_jsx_runtime$20.jsxs)("span", { children: [userCount, " 人使用过"] })]
				})]
			}),
			(0, import_jsx_runtime$20.jsxs)("div", {
				className: "flex items-center gap-2 text-[45px] text-default-500 font-light select-text",
				children: [(0, import_jsx_runtime$20.jsx)(Clock, { className: "w-11 h-11 text-time" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["图片生成于", createTime] })]
			})
		]
	});
	MusicAuthorInfoSection = ({ avatarUrl, username, userShortId, totalFavorited, followingCount, fans }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: "flex flex-col pl-16",
		children: [(0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex items-center mb-6",
			children: [(0, import_jsx_runtime$20.jsx)("img", {
				src: avatarUrl,
				alt: "头像",
				className: "w-[200px] h-[200px] rounded-full mr-7 shadow-large select-text"
			}), (0, import_jsx_runtime$20.jsx)("div", {
				className: "flex flex-col",
				children: (0, import_jsx_runtime$20.jsx)("span", {
					className: "text-[80px] font-bold text-foreground select-text",
					children: username
				})
			})]
		}), (0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground select-text",
			style: { letterSpacing: "2.5px" },
			children: [
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(Hash, { className: "w-8 h-8" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["ID: ", userShortId] })]
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(Heart, { className: "w-8 h-8 text-like" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["获赞: ", totalFavorited] })]
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(UserPlus, { className: "w-8 h-8" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["关注: ", followingCount] })]
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$20.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$20.jsxs)("span", { children: ["粉丝: ", fans] })]
				})
			]
		})]
	});
	MusicQRCodeSection = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: "flex flex-col-reverse items-center -mb-12 mr-18",
		children: [(0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text",
			children: [(0, import_jsx_runtime$20.jsx)(QrCode, { className: "w-11 h-11" }), (0, import_jsx_runtime$20.jsx)("span", { children: "文件直链：永久有效" })]
		}), (0, import_jsx_runtime$20.jsx)("div", {
			className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300",
			children: (0, import_jsx_runtime$20.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-[350px] h-[350px] select-text"
			})
		})]
	});
	DouyinMusicInfo = (props) => {
		const { data, qrCodeDataUrl } = props;
		return (0, import_jsx_runtime$20.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$20.jsxs)("div", { children: [
				(0, import_jsx_runtime$20.jsx)(DouyinHeader, { useDarkTheme: data.useDarkTheme }),
				(0, import_jsx_runtime$20.jsx)(MusicCoverSection, {
					imageUrl: data.image_url,
					description: data.desc,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$20.jsx)("div", { className: "h-[90px]" }),
				(0, import_jsx_runtime$20.jsx)(MusicInfoSection, {
					desc: data.desc,
					musicId: data.music_id,
					userCount: data.user_count,
					createTime: data.create_time,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$20.jsx)("div", { className: "h-[100px]" }),
				(0, import_jsx_runtime$20.jsx)("div", {
					className: "text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-500 select-text",
					children: "抖音音乐信息"
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex justify-between items-center px-0 pt-25",
					children: [(0, import_jsx_runtime$20.jsx)(MusicAuthorInfoSection, {
						avatarUrl: data.avater_url,
						username: data.username,
						userShortId: data.user_shortid,
						totalFavorited: data.total_favorited,
						followingCount: data.following_count,
						fans: data.fans,
						useDarkTheme: data.useDarkTheme
					}), (0, import_jsx_runtime$20.jsx)(MusicQRCodeSection, {
						qrCodeDataUrl,
						useDarkTheme: data.useDarkTheme
					})]
				})
			] })
		});
	};
	MusicInfo_default = DouyinMusicInfo;
});
var UserList_exports$1 = __export({ default: () => UserList_default$1 }), import_jsx_runtime$19, DouyinUserItem, DouyinUserList, UserList_default$1;
var init_UserList$1 = __esmMin(() => {
	init_dist();
	init_lucide_react();
	__toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$19 = __toESM(require_jsx_runtime());
	DouyinUserItem = (props) => (0, import_jsx_runtime$19.jsxs)("li", {
		className: "flex items-center p-8 gap-8 rounded-3xl shadow-large bg-content1 select-text",
		children: [(0, import_jsx_runtime$19.jsx)("img", {
			src: props.avatar_img,
			alt: "用户头像",
			className: "w-28 h-28 rounded-full object-cover select-text flex-shrink-0"
		}), (0, import_jsx_runtime$19.jsxs)("div", {
			className: "flex flex-col flex-grow min-w-0",
			children: [(0, import_jsx_runtime$19.jsxs)("div", {
				className: "flex items-center gap-5 mb-3",
				children: [(0, import_jsx_runtime$19.jsxs)("span", {
					className: "text-4xl font-medium text-foreground select-text inline-flex items-center gap-2.5 truncate",
					children: [(0, import_jsx_runtime$19.jsx)(User, {
						className: "w-8 h-8 opacity-80 flex-shrink-0",
						"aria-hidden": "true"
					}), (0, import_jsx_runtime$19.jsx)("span", {
						className: "truncate",
						children: props.username
					})]
				}), (0, import_jsx_runtime$19.jsx)(chip_default, {
					color: props.switch ? "success" : "default",
					variant: "flat",
					size: "lg",
					startContent: (0, import_jsx_runtime$19.jsx)(Power, {
						className: "w-4 h-4",
						"aria-hidden": "true"
					}),
					className: "flex-shrink-0",
					children: (0, import_jsx_runtime$19.jsx)("span", {
						className: "text-xl",
						children: props.switch ? "开启" : "关闭"
					})
				})]
			}), (0, import_jsx_runtime$19.jsxs)("div", {
				className: "grid grid-cols-2 gap-x-8 gap-y-3 text-xl text-foreground/80 select-text",
				children: [
					(0, import_jsx_runtime$19.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$19.jsx)(Hash, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$19.jsxs)("span", {
							className: "truncate",
							children: ["抖音号: ", props.short_id]
						})]
					}),
					(0, import_jsx_runtime$19.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$19.jsx)(Users, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$19.jsxs)("span", {
							className: "truncate",
							children: ["粉丝: ", props.fans]
						})]
					}),
					(0, import_jsx_runtime$19.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$19.jsx)(Heart, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$19.jsxs)("span", {
							className: "truncate",
							children: ["获赞: ", props.total_favorited]
						})]
					}),
					(0, import_jsx_runtime$19.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$19.jsx)(UserPlus, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$19.jsxs)("span", {
							className: "truncate",
							children: ["关注: ", props.following_count]
						})]
					})
				]
			})]
		})]
	});
	DouyinUserList = (prop) => (0, import_jsx_runtime$19.jsx)(DefaultLayout, {
		...prop,
		children: (0, import_jsx_runtime$19.jsxs)("div", {
			className: "w-full px-10 py-16",
			children: [(0, import_jsx_runtime$19.jsxs)("div", {
				className: "mb-8 p-7 rounded-3xl bg-content2 shadow-medium",
				children: [
					(0, import_jsx_runtime$19.jsx)("h2", {
						className: "text-5xl font-bold text-foreground mb-2 select-text",
						children: prop.data.groupInfo.groupName
					}),
					(0, import_jsx_runtime$19.jsxs)("p", {
						className: "text-2xl text-foreground/70 select-text",
						children: ["群号: ", prop.data.groupInfo.groupId]
					}),
					(0, import_jsx_runtime$19.jsxs)("p", {
						className: "text-xl text-foreground/60 mt-2 select-text",
						children: [
							"共订阅 ",
							prop.data.renderOpt.length,
							" 个博主"
						]
					})
				]
			}), (0, import_jsx_runtime$19.jsx)("ul", {
				className: "grid grid-cols-2 gap-7 list-none p-0",
				"aria-label": "抖音用户列表",
				children: prop.data.renderOpt.map((user, index) => (0, import_jsx_runtime$19.jsx)(DouyinUserItem, { ...user }, `${user.short_id}-${index}`))
			})]
		})
	});
	UserList_default$1 = DouyinUserList;
});
var videoInfo_exports$1 = __export({
	DouyinVideoInfo: () => DouyinVideoInfo,
	default: () => videoInfo_default$1
});
var import_react$19, import_jsx_runtime$18, formatNumber$3, formatDate$2, StatItem$2, DouyinVideoInfo, videoInfo_default$1;
var init_videoInfo$1 = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$19 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$18 = __toESM(require_jsx_runtime());
	formatNumber$3 = (num) => {
		if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`;
		return num.toLocaleString();
	};
	formatDate$2 = (timestamp) => (/* @__PURE__ */ new Date(timestamp * 1e3)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
	StatItem$2 = import_react$19.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$18.jsxs)("div", {
		className: "flex gap-4 items-center",
		children: [
			(0, import_jsx_runtime$18.jsx)("div", {
				className: iconColor,
				children: icon
			}),
			(0, import_jsx_runtime$18.jsx)("span", {
				className: "font-bold text-foreground-900",
				children: formatNumber$3(value)
			}),
			(0, import_jsx_runtime$18.jsx)("span", {
				className: "text-foreground-500",
				children: label
			})
		]
	}));
	StatItem$2.displayName = "StatItem";
	DouyinVideoInfo = import_react$19.memo((props) => {
		const formattedDate = (0, import_react$19.useMemo)(() => formatDate$2(props.data.create_time), [props.data.create_time]);
		const statsData = (0, import_react$19.useMemo)(() => [
			{
				icon: (0, import_jsx_runtime$18.jsx)(Heart, { size: 48 }),
				value: props.data.statistics.digg_count,
				label: "点赞",
				iconColor: "text-like"
			},
			{
				icon: (0, import_jsx_runtime$18.jsx)(MessageCircle, { size: 48 }),
				value: props.data.statistics.comment_count,
				label: "评论",
				iconColor: "text-comment"
			},
			{
				icon: (0, import_jsx_runtime$18.jsx)(Star, { size: 48 }),
				value: props.data.statistics.collect_count,
				label: "收藏",
				iconColor: "text-yellow-500"
			},
			{
				icon: (0, import_jsx_runtime$18.jsx)(Share2, { size: 48 }),
				value: props.data.statistics.share_count,
				label: "分享",
				iconColor: "text-view"
			}
		], [props.data.statistics]);
		return (0, import_jsx_runtime$18.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$18.jsx)("div", { children: (0, import_jsx_runtime$18.jsxs)("div", {
				className: "overflow-hidden transition-all",
				children: [
					(0, import_jsx_runtime$18.jsxs)("div", {
						className: "overflow-hidden relative",
						children: [(0, import_jsx_runtime$18.jsx)("img", {
							src: props.data.image_url,
							alt: props.data.desc,
							className: "object-cover w-full h-full"
						}), (0, import_jsx_runtime$18.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/30" })]
					}),
					(0, import_jsx_runtime$18.jsxs)("div", {
						className: "p-20 pb-36",
						children: [(0, import_jsx_runtime$18.jsx)("h1", {
							className: "mb-8 text-7xl font-bold leading-tight text-foreground-900",
							children: props.data.desc
						}), (0, import_jsx_runtime$18.jsx)("p", {
							className: "mb-6 text-4xl text-foreground-500",
							children: formattedDate
						})]
					}),
					(0, import_jsx_runtime$18.jsxs)("div", {
						className: "px-16",
						children: [
							(0, import_jsx_runtime$18.jsx)("div", {
								className: "grid grid-cols-2 text-5xl gap-18",
								children: statsData.map((stat, index) => (0, import_jsx_runtime$18.jsx)(StatItem$2, {
									icon: stat.icon,
									value: stat.value,
									label: stat.label,
									iconColor: stat.iconColor
								}, index))
							}),
							(0, import_jsx_runtime$18.jsx)("div", { className: "h-18" }),
							(0, import_jsx_runtime$18.jsxs)("div", {
								className: "flex justify-between items-center mb-8 text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$18.jsxs)("div", {
									className: "flex gap-16 items-center",
									children: [(0, import_jsx_runtime$18.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [
											(0, import_jsx_runtime$18.jsx)(TrendingUp, { size: 48 }),
											(0, import_jsx_runtime$18.jsx)("span", {
												className: "font-medium",
												children: formatNumber$3(props.data.statistics?.recommend_count ?? 0)
											}),
											(0, import_jsx_runtime$18.jsx)("span", {
												className: "text-4xl",
												children: "推荐"
											})
										]
									}), props.data.statistics.play_count > 0 && (0, import_jsx_runtime$18.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [
											(0, import_jsx_runtime$18.jsx)(Eye, { size: 48 }),
											(0, import_jsx_runtime$18.jsx)("span", {
												className: "font-medium",
												children: formatNumber$3(props.data.statistics.play_count)
											}),
											(0, import_jsx_runtime$18.jsx)("span", {
												className: "text-4xl",
												children: "播放"
											})
										]
									})]
								}), (0, import_jsx_runtime$18.jsx)("div", {
									className: "transform-gpu scale-[2.5] origin-right mb-8",
									children: (0, import_jsx_runtime$18.jsxs)(chip_default, {
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
					(0, import_jsx_runtime$18.jsx)("div", { className: "h-18" }),
					(0, import_jsx_runtime$18.jsx)("div", { className: "h-0.5 bg-default-300" }),
					(0, import_jsx_runtime$18.jsxs)("div", {
						className: "flex justify-between items-center px-16 py-12 pb-0",
						children: [(0, import_jsx_runtime$18.jsxs)("div", {
							className: "flex gap-8 items-center",
							children: [(0, import_jsx_runtime$18.jsx)("img", {
								src: props.data.author.avatar,
								alt: props.data.author.name,
								className: "object-cover w-48 h-48 rounded-full"
							}), (0, import_jsx_runtime$18.jsxs)("div", {
								className: "flex flex-col gap-6",
								children: [(0, import_jsx_runtime$18.jsx)("p", {
									className: "text-6xl font-semibold text-foreground-900",
									children: props.data.author.name
								}), (0, import_jsx_runtime$18.jsxs)("p", {
									className: "text-5xl text-foreground-500",
									children: ["抖音号: ", props.data.author.short_id]
								})]
							})]
						}), (0, import_jsx_runtime$18.jsx)("div", {
							className: "transform-gpu scale-[3.5] origin-right",
							children: (0, import_jsx_runtime$18.jsx)(button_default, {
								size: "sm",
								className: "bg-default-800 dark:bg-default-100",
								children: (0, import_jsx_runtime$18.jsxs)("div", {
									className: "flex items-center",
									children: [(0, import_jsx_runtime$18.jsxs)("div", {
										className: "relative mr-1",
										children: [
											(0, import_jsx_runtime$18.jsx)(ExternalLink, {
												className: "absolute w-4 h-4",
												style: {
													transform: "translate(-0.5px, -0.5px)",
													color: "#00e6f6"
												}
											}),
											(0, import_jsx_runtime$18.jsx)(ExternalLink, {
												className: "absolute w-4 h-4",
												style: {
													transform: "translate(0.5px, 0.5px)",
													color: "#ff013c"
												}
											}),
											(0, import_jsx_runtime$18.jsx)(ExternalLink, {
												className: "relative w-4 h-4",
												style: { color: "white" }
											})
										]
									}), (0, import_jsx_runtime$18.jsxs)("div", {
										className: "relative",
										children: [
											(0, import_jsx_runtime$18.jsx)("span", {
												className: "absolute",
												style: {
													transform: "translate(-0.5px, -0.5px)",
													color: "#00e6f6"
												},
												children: "观看"
											}),
											(0, import_jsx_runtime$18.jsx)("span", {
												className: "absolute",
												style: {
													transform: "translate(0.5px, 0.5px)",
													color: "#ff013c"
												},
												children: "观看"
											}),
											(0, import_jsx_runtime$18.jsx)("span", {
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
	});
	DouyinVideoInfo.displayName = "DouyinVideoInfo";
	videoInfo_default$1 = DouyinVideoInfo;
});
var qrcodeImg_exports$1 = __export({
	DouyinQrcodeImg: () => DouyinQrcodeImg,
	default: () => qrcodeImg_default$1
});
var import_react$18, import_jsx_runtime$17, DouyinQrcodeImg, qrcodeImg_default$1;
var init_qrcodeImg$1 = __esmMin(() => {
	init_lucide_react();
	import_react$18 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$17 = __toESM(require_jsx_runtime());
	DouyinQrcodeImg = import_react$18.memo((props) => {
		const disclaimer = [
			"免责声明:",
			"您将通过扫码完成获取抖音网页端的用户登录凭证（ck），该ck将用于请求抖音WEB API接口。",
			"本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。",
			"我方仅提供视频解析及相关抖音内容服务,若您的账号封禁、被盗等处罚与我方无关。",
			"害怕风险请勿扫码 ~"
		].join("\n");
		return (0, import_jsx_runtime$17.jsx)(DefaultLayout, {
			...props,
			className: "!bg-[#FFFFFF] dark:!bg-default-50",
			children: (0, import_jsx_runtime$17.jsxs)("div", {
				className: "p-4 px-12 pt-24",
				children: [
					(0, import_jsx_runtime$17.jsxs)("div", {
						className: "flex flex-col gap-6 items-center text-center",
						children: [(0, import_jsx_runtime$17.jsxs)("div", {
							className: "flex gap-4 items-center",
							children: [(0, import_jsx_runtime$17.jsx)(QrCode, { className: "w-12 h-12 text-foreground-600" }), (0, import_jsx_runtime$17.jsx)("h1", {
								className: "text-6xl font-bold text-foreground",
								children: "抖音扫码登录"
							})]
						}), (0, import_jsx_runtime$17.jsxs)("div", {
							className: "flex gap-3 items-center text-3xl text-default-600",
							children: [(0, import_jsx_runtime$17.jsx)(Clock, { className: "w-8 h-8" }), (0, import_jsx_runtime$17.jsx)("span", { children: "请在120秒内通过抖音APP扫码进行登录" })]
						})]
					}),
					(0, import_jsx_runtime$17.jsx)("div", { className: "h-12" }),
					(0, import_jsx_runtime$17.jsx)("div", {
						className: "flex flex-col items-center",
						children: (0, import_jsx_runtime$17.jsx)("div", {
							className: "flex overflow-hidden flex-col justify-center items-center p-12",
							children: props.data.qrCodeDataUrl ? (0, import_jsx_runtime$17.jsx)("div", {
								className: "flex justify-center items-center w-120 h-120",
								children: (0, import_jsx_runtime$17.jsx)("img", {
									src: props.data.qrCodeDataUrl,
									alt: "登录二维码",
									className: "object-contain w-full h-full"
								})
							}) : (0, import_jsx_runtime$17.jsxs)("div", {
								className: "flex flex-col gap-4 justify-center items-center w-120 h-120",
								children: [(0, import_jsx_runtime$17.jsx)(QrCode, { className: "w-16 h-16 text-default-500" }), (0, import_jsx_runtime$17.jsx)("span", {
									className: "text-2xl text-default-500",
									children: "未提供二维码图片"
								})]
							})
						})
					}),
					(0, import_jsx_runtime$17.jsx)("div", { className: "h-10" }),
					(0, import_jsx_runtime$17.jsxs)("div", {
						className: "p-8 rounded-3xl border-2 shadow-lg bg-warning-50 border-warning-200",
						children: [(0, import_jsx_runtime$17.jsxs)("h3", {
							className: "flex gap-4 items-center mb-6 text-4xl font-semibold text-warning-700",
							children: [(0, import_jsx_runtime$17.jsx)(Shield, { className: "w-10 h-10 text-warning-600" }), "注意事项与免责声明"]
						}), (0, import_jsx_runtime$17.jsx)("div", {
							className: "space-y-4",
							children: disclaimer.split("\n").map((line, index) => (0, import_jsx_runtime$17.jsx)("p", {
								className: `text-2xl leading-relaxed ${index === 0 ? "font-semibold text-warning-700" : "text-foreground-600"}`,
								children: line
							}, index))
						})]
					})
				]
			})
		});
	});
	DouyinQrcodeImg.displayName = "DouyinQrcodeImg";
	qrcodeImg_default$1 = DouyinQrcodeImg;
});
var Comment_exports$2 = __export({
	BilibiliComment: () => BilibiliComment,
	default: () => Comment_default$2
});
var import_react$17, import_jsx_runtime$16, processCommentHTML$1, ImageWithSkeleton, QRCodeSection$1, InfoItem, VideoInfoHeader, CommentItemComponent$1, BilibiliComment, Comment_default$2;
var init_Comment$2 = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$17 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$16 = __toESM(require_jsx_runtime());
	processCommentHTML$1 = (htmlContent) => htmlContent.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">");
	ImageWithSkeleton = ({ src, alt, className = "", placeholder }) => {
		const [hasError, setHasError] = (0, import_react$17.useState)(false);
		const handleError = () => {
			setHasError(true);
		};
		(0, import_react$17.useEffect)(() => {
			setHasError(false);
		}, [src]);
		if (hasError) return (0, import_jsx_runtime$16.jsx)("div", {
			className: `flex justify-center items-center text-sm select-text ${className} bg-content2 text-foreground-500`,
			children: placeholder || "图片加载失败"
		});
		return (0, import_jsx_runtime$16.jsx)("img", {
			src,
			alt,
			className: `select-text ${className}`,
			onError: handleError,
			referrerPolicy: "no-referrer",
			crossOrigin: "anonymous"
		});
	};
	QRCodeSection$1 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$16.jsx)("div", {
		className: "flex flex-col items-center -mr-10",
		children: (0, import_jsx_runtime$16.jsx)("div", {
			ref: (0, import_react$17.useRef)(null),
			className: "flex justify-center items-center mt-20 w-120 h-120",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$16.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full select-text"
			}) : (0, import_jsx_runtime$16.jsx)("div", {
				className: "flex justify-center items-center w-full h-full text-6xl select-text text-foreground-400",
				children: "二维码占位符"
			})
		})
	});
	InfoItem = ({ label, value, unit }) => (0, import_jsx_runtime$16.jsxs)("div", {
		className: "text-[45px] p-2.5 tracking-[6px] text-left break-all text-foreground-600 select-text",
		children: [
			label,
			"：",
			value,
			unit
		]
	});
	VideoInfoHeader = (props) => (0, import_jsx_runtime$16.jsxs)("div", {
		className: "flex flex-col mt-2.5 -ml-10",
		children: [
			(0, import_jsx_runtime$16.jsx)("div", {
				className: "w-[580px] h-auto mb-5",
				children: (0, import_jsx_runtime$16.jsx)("div", {
					className: "text-8xl font-bold text-primary",
					children: (0, import_jsx_runtime$16.jsx)("img", {
						src: "/image/bilibili/bilibili.png",
						alt: "B站Logo",
						className: "select-text"
					})
				})
			}),
			(0, import_jsx_runtime$16.jsx)(InfoItem, {
				label: "作品类型",
				value: props.data.Type
			}),
			(0, import_jsx_runtime$16.jsx)(InfoItem, {
				label: "评论数量",
				value: props.data.CommentLength,
				unit: "条"
			}),
			props.data.Type === "视频" && (0, import_jsx_runtime$16.jsxs)(import_jsx_runtime$16.Fragment, { children: [props.data.VideoSize && (0, import_jsx_runtime$16.jsx)(InfoItem, {
				label: "视频大小",
				value: props.data.VideoSize,
				unit: "MB"
			}), props.data.Clarity && (0, import_jsx_runtime$16.jsx)(InfoItem, {
				label: "视频画质",
				value: props.data.Clarity
			})] })
		]
	});
	CommentItemComponent$1 = ({ isLast = false,...props }) => (0, import_jsx_runtime$16.jsxs)("div", {
		className: clsx_default("flex relative px-10 py-10 max-w-full", { "pb-0": isLast }),
		children: [(0, import_jsx_runtime$16.jsxs)("div", {
			className: "relative mr-[33.75px] flex-shrink-0 w-50 h-50 flex items-center justify-center",
			children: [
				(0, import_jsx_runtime$16.jsx)(ImageWithSkeleton, {
					src: props.avatar || "AVATAR_PLACEHOLDER",
					alt: "用户头像",
					className: "rounded-full w-35 h-35 shadow-large",
					placeholder: "头像",
					isCircular: true
				}),
				props.frame && (0, import_jsx_runtime$16.jsx)(ImageWithSkeleton, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-120",
					placeholder: "头像框"
				}),
				props.vipstatus === 1 && (0, import_jsx_runtime$16.jsx)("div", {
					className: "absolute bottom-6 right-4 w-15 h-15 rounded-full bg-default-100 flex items-center justify-center z-20",
					children: (0, import_jsx_runtime$16.jsx)("img", {
						src: "/image/bilibili/res-local1.png",
						alt: "大会员",
						className: "w-12 h-12"
					})
				})
			]
		}), (0, import_jsx_runtime$16.jsxs)("div", {
			className: "flex-1 min-w-0",
			children: [
				(0, import_jsx_runtime$16.jsxs)("div", {
					className: "flex items-start gap-[10px] mb-[15px] text-[50px] relative",
					children: [
						(0, import_jsx_runtime$16.jsxs)("div", {
							className: "flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text",
							children: [
								(0, import_jsx_runtime$16.jsx)("div", {
									className: "[&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-[100px] [&>svg]:h-[100px] [&>svg]:align-middle [&>svg]:flex-shrink-0",
									dangerouslySetInnerHTML: { __html: props.uname }
								}),
								props.level !== void 0 && props.level >= 0 && props.level <= 7 && (0, import_jsx_runtime$16.jsx)("img", {
									src: `/image/bilibili/level/lv${props.level}.svg`,
									alt: `等级${props.level}`,
									className: "inline-block flex-shrink-0 w-24 h-24 align-middle"
								}),
								props.isUP && (0, import_jsx_runtime$16.jsx)("img", {
									src: "/image/bilibili/up_pb.svg",
									alt: "UP主标签",
									className: "inline-block flex-shrink-0 align-middle w-23 h-23"
								})
							]
						}),
						props.fanCard && props.fanCard.image && (0, import_jsx_runtime$16.jsx)("div", {
							className: "absolute -top-10 right-0 h-[180px] z-10 pointer-events-none",
							children: (0, import_jsx_runtime$16.jsxs)("div", {
								className: "relative h-full inline-block",
								children: [(0, import_jsx_runtime$16.jsx)("img", {
									src: props.fanCard.image,
									alt: "粉丝卡片",
									className: "block h-full w-auto object-contain",
									referrerPolicy: "no-referrer",
									crossOrigin: "anonymous"
								}), (0, import_jsx_runtime$16.jsxs)("div", {
									className: "absolute bottom-15 right-8 w-[14%] h-full flex flex-col items-start justify-end leading-10 font-[bilifont]",
									children: [(0, import_jsx_runtime$16.jsx)("span", {
										className: "text-4xl font-bold whitespace-nowrap",
										style: {
											backgroundImage: props.fanCard.gradientStyle,
											WebkitTextFillColor: "transparent",
											backgroundClip: "text",
											WebkitBackgroundClip: "text"
										},
										children: props.fanCard.numPrefix
									}), (0, import_jsx_runtime$16.jsx)("span", {
										className: "text-4xl font-bold whitespace-nowrap",
										style: {
											backgroundImage: props.fanCard.gradientStyle,
											WebkitTextFillColor: "transparent",
											backgroundClip: "text",
											WebkitBackgroundClip: "text"
										},
										children: props.fanCard.numDesc
									})]
								})]
							})
						}),
						props.label_type === 1 && (0, import_jsx_runtime$16.jsx)("div", {
							className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-danger text-danger-foreground flex-shrink-0 self-center select-text",
							children: "作者"
						}),
						props.status_label && (0, import_jsx_runtime$16.jsx)("div", {
							className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-content2 text-foreground-600 flex-shrink-0 self-center select-text",
							children: props.status_label
						})
					]
				}),
				(0, import_jsx_runtime$16.jsx)("div", {
					className: "text-[60px] tracking-[0.5px] leading-[1.6] text-foreground mb-[20px] select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					},
					dangerouslySetInnerHTML: { __html: (props.isTop ? "<span class=\"inline-flex justify-center items-center relative border-4 border-[#006A9E] rounded-xl text-[#006A9E] text-5xl px-2 py-1 leading-none mr-2 align-baseline\">置顶</span>" : "") + processCommentHTML$1(props.message) }
				}),
				(props.img_src || props.sticker) && (0, import_jsx_runtime$16.jsx)("div", {
					className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large",
					children: (0, import_jsx_runtime$16.jsx)(ImageWithSkeleton, {
						src: props.img_src || props.sticker || "IMAGE_PLACEHOLDER",
						alt: "评论图片",
						className: "rounded-[25px] object-contain w-full h-full",
						placeholder: "评论图片"
					})
				}),
				(0, import_jsx_runtime$16.jsxs)("div", {
					className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$16.jsx)("div", {
						className: "flex flex-1 items-center",
						children: (0, import_jsx_runtime$16.jsxs)("div", {
							className: "text-[45px] tracking-[2px] select-text",
							children: [
								props.ctime,
								" · ",
								props.location,
								props.replylength > 0 ? (0, import_jsx_runtime$16.jsxs)("span", {
									className: "text-foreground-400 tracking-[3px] ml-4",
									children: [props.replylength, "回复"]
								}) : (0, import_jsx_runtime$16.jsx)("span", {
									className: "ml-4 text-foreground-600",
									children: "回复"
								})
							]
						})
					}), (0, import_jsx_runtime$16.jsxs)("div", {
						className: "flex items-center gap-[75px] ml-auto",
						children: [(0, import_jsx_runtime$16.jsxs)("div", {
							className: "flex items-center gap-[15px]",
							children: [(0, import_jsx_runtime$16.jsx)(ThumbsUp, { className: "w-[60px] h-[60px] text-foreground-500" }), (0, import_jsx_runtime$16.jsx)("span", {
								className: "text-[45px] text-foreground-500 select-text",
								children: props.like
							})]
						}), (0, import_jsx_runtime$16.jsx)("div", {
							className: "flex items-center gap-[15px]",
							children: (0, import_jsx_runtime$16.jsx)(ThumbsDown, { className: "w-[60px] h-[60px] text-foreground-500" })
						})]
					})]
				}),
				props.replies && props.replies.length > 0 && (0, import_jsx_runtime$16.jsx)("div", {
					className: "mt-10",
					children: props.replies.map((subReply, index) => (0, import_jsx_runtime$16.jsx)("div", {
						className: `py-6 ${index !== (props.replies?.length ?? 0) - 1 ? "border-b border-divider" : ""}`,
						children: (0, import_jsx_runtime$16.jsxs)("div", {
							className: "flex items-start space-x-4",
							children: [(0, import_jsx_runtime$16.jsxs)("div", {
								className: "relative mr-[33.75px] flex-shrink-0 w-40 h-40 flex items-center justify-center",
								children: [
									(0, import_jsx_runtime$16.jsx)(ImageWithSkeleton, {
										src: subReply.avatar || "AVATAR_PLACEHOLDER",
										alt: "用户头像",
										className: "rounded-full w-30 h-30 shadow-large",
										placeholder: "头像",
										isCircular: true
									}),
									subReply.frame && (0, import_jsx_runtime$16.jsx)(ImageWithSkeleton, {
										src: subReply.frame,
										alt: "头像框",
										className: "absolute inset-0 transform scale-90",
										placeholder: "头像框"
									}),
									subReply.vipstatus === 1 && (0, import_jsx_runtime$16.jsx)("div", {
										className: "absolute bottom-5 right-4 w-12 h-12 rounded-full bg-default-100 flex items-center justify-center z-20",
										children: (0, import_jsx_runtime$16.jsx)("img", {
											src: "/image/bilibili/res-local1.png",
											alt: "大会员",
											className: "w-9 h-9"
										})
									})
								]
							}), (0, import_jsx_runtime$16.jsxs)("div", {
								className: "flex-1",
								children: [
									(0, import_jsx_runtime$16.jsxs)("div", {
										className: "flex items-start gap-[10px] mb-[15px] text-[50px] relative overflow-visible",
										children: [(0, import_jsx_runtime$16.jsxs)("div", {
											className: "flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text",
											children: [
												(0, import_jsx_runtime$16.jsx)("div", {
													className: "[&>span]:inline-block [&>span]:leading-[1.2]",
													dangerouslySetInnerHTML: { __html: subReply.uname }
												}),
												subReply.level !== void 0 && subReply.level >= 0 && subReply.level <= 7 && (0, import_jsx_runtime$16.jsx)("img", {
													src: `/image/bilibili/level/lv${subReply.level}.svg`,
													alt: `等级${subReply.level}`,
													className: "inline-block flex-shrink-0 w-24 h-24 align-middle"
												}),
												subReply.isUP && (0, import_jsx_runtime$16.jsx)("img", {
													src: "/image/bilibili/up_pb.svg",
													alt: "UP主标签",
													className: "inline-block flex-shrink-0 align-middle w-23 h-23"
												})
											]
										}), subReply.fanCard && subReply.fanCard.image && (0, import_jsx_runtime$16.jsx)("div", {
											className: "absolute -top-10 right-0 h-[180px] z-10 pointer-events-none",
											children: (0, import_jsx_runtime$16.jsxs)("div", {
												className: "relative h-full inline-block",
												children: [(0, import_jsx_runtime$16.jsx)("img", {
													src: subReply.fanCard.image,
													alt: "粉丝卡片",
													className: "block h-full w-auto object-contain",
													referrerPolicy: "no-referrer",
													crossOrigin: "anonymous"
												}), (0, import_jsx_runtime$16.jsxs)("div", {
													className: "absolute bottom-15 right-8 w-[14%] h-full flex flex-col items-start justify-end leading-10 font-[bilifont]",
													children: [(0, import_jsx_runtime$16.jsx)("span", {
														className: "text-4xl font-bold whitespace-nowrap",
														style: {
															backgroundImage: subReply.fanCard.gradientStyle,
															WebkitTextFillColor: "transparent",
															backgroundClip: "text",
															WebkitBackgroundClip: "text"
														},
														children: subReply.fanCard.numPrefix
													}), (0, import_jsx_runtime$16.jsx)("span", {
														className: "text-4xl font-bold whitespace-nowrap",
														style: {
															backgroundImage: subReply.fanCard.gradientStyle,
															WebkitTextFillColor: "transparent",
															backgroundClip: "text",
															WebkitBackgroundClip: "text"
														},
														children: subReply.fanCard.numDesc
													})]
												})]
											})
										})]
									}),
									(0, import_jsx_runtime$16.jsx)("div", {
										className: "text-[60px] tracking-[0.5px] leading-[1.6] text-foreground mb-[20px] select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
										style: {
											wordBreak: "break-word",
											overflowWrap: "break-word"
										},
										dangerouslySetInnerHTML: { __html: processCommentHTML$1(subReply.message) }
									}),
									subReply.img_src && (0, import_jsx_runtime$16.jsx)("div", {
										className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large",
										children: (0, import_jsx_runtime$16.jsx)(ImageWithSkeleton, {
											src: subReply.img_src,
											alt: "评论图片",
											className: "rounded-[25px] object-contain w-full h-full",
											placeholder: "评论图片"
										})
									}),
									(0, import_jsx_runtime$16.jsxs)("div", {
										className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500",
										children: [(0, import_jsx_runtime$16.jsx)("div", {
											className: "flex flex-1 items-center",
											children: (0, import_jsx_runtime$16.jsxs)("div", {
												className: "text-[45px] tracking-[2px] select-text",
												children: [
													subReply.ctime,
													" · ",
													subReply.location
												]
											})
										}), (0, import_jsx_runtime$16.jsxs)("div", {
											className: "flex items-center gap-[75px] ml-auto",
											children: [(0, import_jsx_runtime$16.jsxs)("div", {
												className: "flex items-center gap-[15px]",
												children: [(0, import_jsx_runtime$16.jsx)(ThumbsUp, { className: "w-[60px] h-[60px] text-foreground-500" }), (0, import_jsx_runtime$16.jsx)("span", {
													className: "text-[45px] text-foreground-500 select-text",
													children: subReply.like
												})]
											}), (0, import_jsx_runtime$16.jsx)("div", {
												className: "flex items-center gap-[15px]",
												children: (0, import_jsx_runtime$16.jsx)(ThumbsDown, { className: "w-[60px] h-[60px] text-foreground-500" })
											})]
										})]
									})
								]
							})]
						})
					}, index))
				})
			]
		})]
	});
	BilibiliComment = import_react$17.memo((props) => {
		const processedData = (0, import_react$17.useMemo)(() => {
			if (!props.data) return {
				useDarkTheme: false,
				Type: "视频",
				CommentLength: "0",
				VideoSize: void 0,
				Clarity: void 0,
				ImageLength: void 0,
				shareurl: "",
				share_url: "",
				CommentsData: [],
				host_mid: 0
			};
			return {
				useDarkTheme: props.data.useDarkTheme || false,
				Type: props.data.Type || "视频",
				CommentLength: props.data.CommentLength || "0",
				VideoSize: props.data.VideoSize,
				Clarity: props.data.Clarity,
				ImageLength: props.data.ImageLength,
				shareurl: props.data.shareurl || "",
				share_url: props.data.share_url || "",
				CommentsData: props.data.CommentsData || []
			};
		}, [props.data]);
		return (0, import_jsx_runtime$16.jsxs)(DefaultLayout, {
			...props,
			children: [(0, import_jsx_runtime$16.jsxs)("div", {
				className: "flex justify-between items-center max-w-[1200px] mx-auto p-5",
				children: [(0, import_jsx_runtime$16.jsx)(VideoInfoHeader, { ...props }), (0, import_jsx_runtime$16.jsx)(QRCodeSection$1, {
					shareurl: processedData.shareurl || processedData.share_url,
					qrCodeDataUrl: props.qrCodeDataUrl,
					useDarkTheme: processedData.useDarkTheme
				})]
			}), (0, import_jsx_runtime$16.jsx)("div", {
				className: "mx-0 max-w-full",
				children: processedData.CommentsData.length > 0 ? processedData.CommentsData.map((comment, index) => (0, import_jsx_runtime$16.jsx)(CommentItemComponent$1, {
					isLast: index === processedData.CommentsData.length - 1,
					...comment
				}, index)) : (0, import_jsx_runtime$16.jsx)("div", {
					className: "py-10 text-center select-text text-foreground-500",
					children: "暂无评论数据"
				})
			})]
		});
	});
	Comment_default$2 = BilibiliComment;
});
var import_react$16, import_jsx_runtime$15, processCommentHTML, CommentText, EnhancedImage, proxyImageUrl, processHtmlImages, DecorationCard;
var init_shared = __esmMin(() => {
	import_react$16 = __toESM(require_react());
	import_jsx_runtime$15 = __toESM(require_jsx_runtime());
	processCommentHTML = (htmlContent) => {
		if (!htmlContent || typeof htmlContent !== "string") return "";
		let processed = htmlContent;
		processed = processed.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">");
		processed = processed.replace(/¨/g, "•");
		return processed;
	};
	CommentText = ({ content, className, style }) => (0, import_jsx_runtime$15.jsx)("div", {
		className,
		style,
		dangerouslySetInnerHTML: { __html: processCommentHTML(content) }
	});
	EnhancedImage = ({ src, alt, className = "", placeholder, isCircular = false }) => {
		const [hasError, setHasError] = (0, import_react$16.useState)(false);
		const handleError = () => {
			setHasError(true);
		};
		if (!src || hasError) return (0, import_jsx_runtime$15.jsx)("div", {
			className: `${className} ${isCircular ? "rounded-full" : "rounded-md"} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`,
			children: (0, import_jsx_runtime$15.jsx)("span", {
				className: "text-sm text-gray-400",
				children: placeholder || alt
			})
		});
		return (0, import_jsx_runtime$15.jsx)("img", {
			src,
			alt,
			className,
			onError: handleError,
			referrerPolicy: "no-referrer",
			crossOrigin: "anonymous"
		});
	};
	proxyImageUrl = (url) => {
		if (!url || !url.startsWith("http")) return url;
		return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
	};
	processHtmlImages = (html) => {
		let processed = html;
		processed = processed.replace(/background-image:\s*url\(['"]?(https?:\/\/[^'")\s]+)['"]?\)/gi, (match, url) => `background-image: url('${proxyImageUrl(url)}')`);
		processed = processed.replace(/<img([^>]*?)src=['"]?(https?:\/\/[^'">\s]+)['"]?([^>]*?)>/gi, (match, before, url, after) => `<img${before}src="${proxyImageUrl(url)}"${after} referrerpolicy="no-referrer" crossorigin="anonymous">`);
		return processed;
	};
	DecorationCard = ({ html }) => (0, import_jsx_runtime$15.jsx)("div", {
		className: "font-bilifont",
		dangerouslySetInnerHTML: { __html: processHtmlImages(html) }
	});
});
var UserList_exports = __export({ default: () => UserList_default }), import_jsx_runtime$14, BilibiliUserItem, BilibiliUserList, UserList_default;
var init_UserList = __esmMin(() => {
	init_dist();
	init_lucide_react();
	__toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$14 = __toESM(require_jsx_runtime());
	BilibiliUserItem = (props) => (0, import_jsx_runtime$14.jsxs)("li", {
		className: "flex items-center p-8 gap-8 rounded-3xl shadow-large bg-content1 select-text",
		children: [(0, import_jsx_runtime$14.jsx)(EnhancedImage, {
			src: props.avatar_img,
			alt: "用户头像",
			className: "w-28 h-28 rounded-full object-cover select-text flex-shrink-0"
		}), (0, import_jsx_runtime$14.jsxs)("div", {
			className: "flex flex-col flex-grow min-w-0",
			children: [(0, import_jsx_runtime$14.jsxs)("div", {
				className: "flex items-center gap-5 mb-3",
				children: [(0, import_jsx_runtime$14.jsxs)("span", {
					className: "text-4xl font-medium text-foreground select-text inline-flex items-center gap-2.5 truncate",
					children: [(0, import_jsx_runtime$14.jsx)(User, {
						className: "w-8 h-8 opacity-80 flex-shrink-0",
						"aria-hidden": "true"
					}), (0, import_jsx_runtime$14.jsx)("span", {
						className: "truncate",
						children: props.username
					})]
				}), (0, import_jsx_runtime$14.jsx)(chip_default, {
					color: props.switch ? "success" : "default",
					variant: "flat",
					size: "lg",
					startContent: (0, import_jsx_runtime$14.jsx)(Power, {
						className: "w-5 h-5",
						"aria-hidden": "true"
					}),
					className: "flex-shrink-0",
					children: (0, import_jsx_runtime$14.jsx)("span", {
						className: "text-xl",
						children: props.switch ? "开启" : "关闭"
					})
				})]
			}), (0, import_jsx_runtime$14.jsxs)("div", {
				className: "grid grid-cols-2 gap-x-8 gap-y-3 text-xl text-foreground/80 select-text",
				children: [
					(0, import_jsx_runtime$14.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$14.jsx)(Hash, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$14.jsxs)("span", {
							className: "truncate",
							children: ["UID: ", props.host_mid]
						})]
					}),
					(0, import_jsx_runtime$14.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$14.jsx)(Users, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$14.jsxs)("span", {
							className: "truncate",
							children: ["粉丝: ", props.fans]
						})]
					}),
					(0, import_jsx_runtime$14.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$14.jsx)(Heart, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$14.jsxs)("span", {
							className: "truncate",
							children: ["获赞: ", props.total_favorited]
						})]
					}),
					(0, import_jsx_runtime$14.jsxs)("span", {
						className: "inline-flex items-center gap-2.5 truncate",
						children: [(0, import_jsx_runtime$14.jsx)(UserPlus, {
							className: "w-5 h-5 opacity-70 flex-shrink-0",
							"aria-hidden": "true"
						}), (0, import_jsx_runtime$14.jsxs)("span", {
							className: "truncate",
							children: ["关注: ", props.following_count]
						})]
					})
				]
			})]
		})]
	});
	BilibiliUserList = (prop) => (0, import_jsx_runtime$14.jsx)(DefaultLayout, {
		...prop,
		children: (0, import_jsx_runtime$14.jsxs)("div", {
			className: "w-full px-10 py-16",
			children: [(0, import_jsx_runtime$14.jsxs)("div", {
				className: "mb-8 p-7 rounded-3xl bg-content2 shadow-medium",
				children: [
					(0, import_jsx_runtime$14.jsx)("h2", {
						className: "text-5xl font-bold text-foreground mb-2 select-text",
						children: prop.data.groupInfo.groupName
					}),
					(0, import_jsx_runtime$14.jsxs)("p", {
						className: "text-2xl text-foreground/70 select-text",
						children: ["群号: ", prop.data.groupInfo.groupId]
					}),
					(0, import_jsx_runtime$14.jsxs)("p", {
						className: "text-xl text-foreground/60 mt-2 select-text",
						children: [
							"共订阅 ",
							prop.data.renderOpt.length,
							" 个UP主"
						]
					})
				]
			}), (0, import_jsx_runtime$14.jsx)("ul", {
				className: "grid grid-cols-2 gap-7 list-none p-0",
				"aria-label": "B站用户列表",
				children: prop.data.renderOpt.map((user, index) => (0, import_jsx_runtime$14.jsx)(BilibiliUserItem, { ...user }, `${user.host_mid}-${index}`))
			})]
		})
	});
	UserList_default = BilibiliUserList;
});
var bangumi_exports = __export({
	BangumiBilibili: () => BangumiBilibili,
	default: () => bangumi_default
});
var import_react$14, import_jsx_runtime$13, formatNumber$2, formatDateParts, formatDateTime, BangumiBilibiliHeader, BangumiBilibiliEpisodes, BangumiBilibili, bangumi_default;
var init_bangumi = __esmMin(() => {
	init_dist();
	init_clsx();
	init_lucide_react();
	import_react$14 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$13 = __toESM(require_jsx_runtime());
	formatNumber$2 = (num) => {
		if (num >= 1e8) return `${(num / 1e8).toFixed(1)}亿`;
		if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`;
		return num.toString();
	};
	formatDateParts = (timestamp) => {
		const date = /* @__PURE__ */ new Date(timestamp * 1e3);
		return {
			month: date.toLocaleDateString("zh-CN", { month: "short" }),
			day: date.getDate().toString().padStart(2, "0")
		};
	};
	formatDateTime = (timestamp) => (/* @__PURE__ */ new Date(timestamp * 1e3)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
	BangumiBilibiliHeader = (props) => {
		const actorList = props.actors ? props.actors.split(/[,，、\s]+/).filter((actor) => actor.trim()) : [];
		return (0, import_jsx_runtime$13.jsx)("div", {
			className: "overflow-hidden relative rounded-6xl",
			children: (0, import_jsx_runtime$13.jsxs)("div", {
				className: "flex relative z-10 gap-25 p-25",
				children: [(0, import_jsx_runtime$13.jsxs)("div", {
					className: "flex flex-col flex-shrink-0 gap-20",
					children: [
						(0, import_jsx_runtime$13.jsx)("div", {
							className: "overflow-hidden rounded-4xl w-120 h-160",
							children: (0, import_jsx_runtime$13.jsx)(EnhancedImage, {
								src: props.mainCover,
								alt: props.title,
								className: "object-cover w-full h-full select-text"
							})
						}),
						props.upInfo && (0, import_jsx_runtime$13.jsxs)("div", {
							className: "flex gap-12 items-center mt-15",
							children: [(0, import_jsx_runtime$13.jsxs)("div", {
								className: "relative",
								children: [
									(0, import_jsx_runtime$13.jsx)(EnhancedImage, {
										className: "w-28 h-28 rounded-full select-text",
										src: `https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`,
										alt: props.upInfo.uname
									}),
									props.upInfo.avatar_subscript_url && (0, import_jsx_runtime$13.jsx)(EnhancedImage, {
										className: "absolute -right-1 -bottom-1 w-8 h-8 select-text",
										src: props.upInfo.avatar_subscript_url,
										alt: "头像角标"
									}),
									props.upInfo.pendant?.image && (0, import_jsx_runtime$13.jsx)(EnhancedImage, {
										className: "absolute inset-0 w-full h-full transform select-text scale-160",
										src: props.upInfo.pendant.image,
										alt: props.upInfo.pendant.name || "挂件"
									})
								]
							}), (0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex flex-col gap-4",
								children: [
									(0, import_jsx_runtime$13.jsxs)("div", {
										className: "flex gap-3 items-center",
										children: [
											(0, import_jsx_runtime$13.jsx)("div", {
												className: "text-4xl font-medium select-text",
												style: { color: props.upInfo.vip_status === 1 ? props.upInfo.nickname_color || "#FB7299" : "#EDEDED" },
												children: props.upInfo.uname
											}),
											props.upInfo.verify_type > 0 && (0, import_jsx_runtime$13.jsx)("div", {
												className: "flex items-center",
												children: props.upInfo.verify_type === 1 ? (0, import_jsx_runtime$13.jsx)(Shield, {
													size: 20,
													className: "text-warning"
												}) : (0, import_jsx_runtime$13.jsx)(Crown, {
													size: 20,
													className: "text-primary"
												})
											}),
											props.upInfo.vip_status === 1 && props.upInfo.vip_label?.text && (0, import_jsx_runtime$13.jsx)(chip_default, {
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
									(0, import_jsx_runtime$13.jsxs)("div", {
										className: "flex gap-6 items-center text-3xl select-text text-foreground",
										children: [
											(0, import_jsx_runtime$13.jsx)(Users, { size: 30 }),
											(0, import_jsx_runtime$13.jsxs)("span", { children: [formatNumber$2(props.upInfo.follower), "粉丝"] }),
											props.upInfo.is_follow === 1 && (0, import_jsx_runtime$13.jsx)(chip_default, {
												size: "sm",
												color: "primary",
												variant: "flat",
												className: "text-xs select-text",
												children: "已关注"
											})
										]
									}),
									(0, import_jsx_runtime$13.jsxs)("div", {
										className: "flex gap-2 items-center text-2xl select-text text-foreground-600",
										children: [(0, import_jsx_runtime$13.jsx)(Hash, { size: 20 }), (0, import_jsx_runtime$13.jsxs)("span", { children: ["UID: ", props.upInfo.mid] })]
									})
								]
							})]
						}),
						(0, import_jsx_runtime$13.jsxs)("div", {
							className: "flex text-3xl select-text text-foreground",
							children: [
								(0, import_jsx_runtime$13.jsx)("span", { children: "提示：请在120秒内发送" }),
								(0, import_jsx_runtime$13.jsx)(code_default, {
									size: "lg",
									color: "danger",
									children: " 第 ？ 集 "
								}),
								(0, import_jsx_runtime$13.jsx)("span", { children: "选择集数" })
							]
						})
					]
				}), (0, import_jsx_runtime$13.jsxs)("div", {
					className: "flex flex-col flex-1 justify-between text-foreground",
					children: [(0, import_jsx_runtime$13.jsxs)("div", { children: [
						(0, import_jsx_runtime$13.jsx)("div", {
							className: "mb-8 text-8xl font-bold leading-tight select-text",
							children: props.title
						}),
						props.subtitle && (0, import_jsx_runtime$13.jsx)("div", {
							className: "mb-12 text-4xl select-text text-foreground",
							children: props.subtitle
						}),
						props.styles && props.styles.length > 0 && (0, import_jsx_runtime$13.jsx)("div", {
							className: "flex flex-wrap gap-8 mb-12",
							children: props.styles.map((style, index) => (0, import_jsx_runtime$13.jsx)(chip_default, {
								radius: "sm",
								size: "lg",
								className: "px-4 py-2 text-3xl backdrop-blur-sm select-text text-foreground bg-content2",
								classNames: { base: "w-32 h-12" },
								children: style
							}, index))
						}),
						actorList.length > 0 && (0, import_jsx_runtime$13.jsxs)("div", {
							className: "mb-12",
							children: [(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground",
								children: [(0, import_jsx_runtime$13.jsx)(Users, { size: 30 }), (0, import_jsx_runtime$13.jsx)("span", { children: "声优阵容" })]
							}), (0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex flex-wrap gap-8",
								children: [actorList.slice(0, 6).map((actor, index) => (0, import_jsx_runtime$13.jsx)("div", {
									className: "text-3xl select-text text-foreground",
									children: actor
								}, index)), actorList.length > 6 && (0, import_jsx_runtime$13.jsxs)("div", {
									className: "text-3xl select-text text-foreground",
									children: [
										"等",
										actorList.length,
										"人"
									]
								})]
							})]
						}),
						props.evaluate && (0, import_jsx_runtime$13.jsxs)("div", {
							className: "mb-12",
							children: [(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground",
								children: [(0, import_jsx_runtime$13.jsx)(Star, { size: 30 }), (0, import_jsx_runtime$13.jsx)("span", { children: "评价" })]
							}), (0, import_jsx_runtime$13.jsx)("div", {
								className: "text-3xl leading-relaxed select-text text-foreground",
								children: props.evaluate
							})]
						})
					] }), (0, import_jsx_runtime$13.jsxs)("div", {
						className: "grid grid-cols-4 gap-16",
						children: [
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$13.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$13.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.views).slice(0, -1)
									}), (0, import_jsx_runtime$13.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.views).slice(-1)
									})]
								}), (0, import_jsx_runtime$13.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "播放"
								})]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$13.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$13.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.favorites).slice(0, -1)
									}), (0, import_jsx_runtime$13.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.favorites).slice(-1)
									})]
								}), (0, import_jsx_runtime$13.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "收藏"
								})]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$13.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$13.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.danmakus).slice(0, -1)
									}), (0, import_jsx_runtime$13.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.danmakus).slice(-1)
									})]
								}), (0, import_jsx_runtime$13.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "弹幕"
								})]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$13.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$13.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.coins).slice(0, -1)
									}), (0, import_jsx_runtime$13.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.coins).slice(-1)
									})]
								}), (0, import_jsx_runtime$13.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "投币"
								})]
							})
						]
					})]
				})]
			})
		});
	};
	BangumiBilibiliEpisodes = (props) => {
		const sortedEpisodes = [...props.Episodes].sort((a, b) => b.pub_time - a.pub_time);
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
		return (0, import_jsx_runtime$13.jsxs)("div", {
			className: "px-10",
			children: [(0, import_jsx_runtime$13.jsxs)("div", {
				className: "flex gap-8 items-center mb-20 text-5xl font-bold select-text text-foreground",
				children: [
					(0, import_jsx_runtime$13.jsx)(Play, { size: 46 }),
					(0, import_jsx_runtime$13.jsx)("span", { children: "剧集列表" }),
					(0, import_jsx_runtime$13.jsxs)(chip_default, {
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
			}), (0, import_jsx_runtime$13.jsx)("div", { children: flattenedEpisodes.map((item) => {
				const { episode, isFirstOfDate, isLastOfAll, episodesInSameDate, isLastOfDate } = item;
				const { month, day } = formatDateParts(episode.pub_time);
				const episodeNumber = sortedEpisodes.findIndex((e) => e.bvid === episode.bvid);
				const actualEpisodeNumber = sortedEpisodes.length - episodeNumber;
				return (0, import_jsx_runtime$13.jsxs)("div", {
					className: "flex gap-15",
					children: [(0, import_jsx_runtime$13.jsx)("div", {
						className: "flex flex-col flex-shrink-0 items-center w-20",
						children: isFirstOfDate ? (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
							(0, import_jsx_runtime$13.jsx)("div", {
								className: "text-4xl select-text text-foreground",
								children: month
							}),
							(0, import_jsx_runtime$13.jsx)("div", {
								className: "flex justify-center items-center text-7xl font-bold select-text text-foreground",
								children: day
							}),
							!isLastOfAll && (0, import_jsx_runtime$13.jsx)("div", { className: clsx_default("mt-8 w-1 bg-divider", episodesInSameDate > 1 ? "h-110" : "h-95") })
						] }) : (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
							(0, import_jsx_runtime$13.jsx)("div", { className: "w-1 h-10 bg-divider" }),
							(0, import_jsx_runtime$13.jsx)("div", { className: "my-2 w-4 h-4 rounded-full bg-divider" }),
							(!isLastOfAll || episodesInSameDate > 1) && (0, import_jsx_runtime$13.jsx)("div", { className: clsx_default("w-1 bg-divider", isLastOfDate ? "h-110" : "h-130") })
						] })
					}), (0, import_jsx_runtime$13.jsxs)("div", {
						className: clsx_default("flex-1 min-w-0", !isLastOfAll && isLastOfDate && "mb-20"),
						children: [(0, import_jsx_runtime$13.jsxs)("div", {
							className: "flex justify-between items-center mb-10",
							children: [(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex flex-shrink-0 gap-8 items-center",
								children: [(0, import_jsx_runtime$13.jsx)("div", {
									className: "relative",
									children: (0, import_jsx_runtime$13.jsx)(EnhancedImage, {
										className: "w-32 h-32 rounded-full select-text",
										src: `https://images.weserv.nl/?url=${encodeURIComponent(props.UPInfo ? props.UPInfo.avatar : props.mainCover)}`,
										alt: ""
									})
								}), (0, import_jsx_runtime$13.jsxs)("div", {
									className: "flex flex-col gap-6",
									children: [(0, import_jsx_runtime$13.jsx)("div", {
										className: "text-4xl font-bold select-text text-foreground-700",
										children: props.UPInfo ? props.UPInfo.uname : props.Title
									}), (0, import_jsx_runtime$13.jsxs)("div", {
										className: "flex gap-4 items-center text-3xl select-text text-foreground-600",
										children: [(0, import_jsx_runtime$13.jsx)(Calendar, { size: 30 }), (0, import_jsx_runtime$13.jsx)("span", { children: "发布了内容" })]
									})]
								})]
							}), (0, import_jsx_runtime$13.jsx)("div", {
								className: "flex-shrink-0 pr-20",
								children: (0, import_jsx_runtime$13.jsxs)("div", {
									className: "text-5xl font-semibold select-text text-foreground-600",
									children: [
										"第",
										actualEpisodeNumber,
										"集"
									]
								})
							})]
						}), (0, import_jsx_runtime$13.jsx)("div", {
							className: "overflow-hidden shadow-large bg-content1 rounded-4xl",
							children: (0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-12 p-12",
								children: [(0, import_jsx_runtime$13.jsx)("div", {
									className: "relative flex-shrink-0",
									children: (0, import_jsx_runtime$13.jsxs)("div", {
										className: "overflow-hidden relative h-64 rounded-3xl w-112",
										children: [(0, import_jsx_runtime$13.jsx)(EnhancedImage, {
											src: episode.cover,
											alt: `第${actualEpisodeNumber}集 ${episode.long_title}`,
											className: "object-cover w-full h-full select-text"
										}), episode.badge && (0, import_jsx_runtime$13.jsx)(chip_default, {
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
								}), (0, import_jsx_runtime$13.jsxs)("div", {
									className: "flex flex-col flex-1 justify-center h-64",
									children: [(0, import_jsx_runtime$13.jsx)("div", {
										className: "mb-8 text-5xl font-semibold select-text text-foreground line-clamp-2",
										children: episode.long_title
									}), (0, import_jsx_runtime$13.jsxs)("div", {
										className: "space-y-4 text-4xl",
										children: [
											(0, import_jsx_runtime$13.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$13.jsx)(Hash, { size: 36 }), (0, import_jsx_runtime$13.jsx)("span", {
													className: "truncate",
													children: episode.bvid
												})]
											}),
											(0, import_jsx_runtime$13.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$13.jsx)(Clock, { size: 36 }), (0, import_jsx_runtime$13.jsx)("span", {
													className: "whitespace-nowrap",
													children: formatDateTime(episode.pub_time)
												})]
											}),
											(0, import_jsx_runtime$13.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$13.jsx)(Share2, { size: 36 }), (0, import_jsx_runtime$13.jsx)("span", {
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
	};
	BangumiBilibili = import_react$14.memo((props) => (0, import_jsx_runtime$13.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$13.jsxs)("div", {
			className: "p-4",
			children: [(0, import_jsx_runtime$13.jsx)(BangumiBilibiliHeader, {
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
			}), (0, import_jsx_runtime$13.jsx)(BangumiBilibiliEpisodes, { ...props.data })]
		})
	}));
	BangumiBilibili.displayName = "BangumiBilibili";
	bangumi_default = BangumiBilibili;
});
var DYNAMIC_TYPE_DRAW_exports = __export({
	BilibiliDrawDynamic: () => BilibiliDrawDynamic,
	default: () => DYNAMIC_TYPE_DRAW_default
});
var import_react$13, import_jsx_runtime$12, BilibiliDynamicUserInfo, BilibiliDynamicContent, BilibiliDynamicStatus, BilibiliDynamicFooter, BilibiliDrawDynamic, DYNAMIC_TYPE_DRAW_default;
var init_DYNAMIC_TYPE_DRAW = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$13 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$12 = __toESM(require_jsx_runtime());
	BilibiliDynamicUserInfo = (props) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$12.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "头像",
					className: "w-32 h-32 rounded-full shadow-medium",
					isCircular: true
				}), props.frame && (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$12.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$12.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$12.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.create_time]
				})]
			}),
			props.decoration_card && (0, import_jsx_runtime$12.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$12.jsx)("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } })
			})
		]
	});
	BilibiliDynamicContent = (props) => {
		const getLayoutType = () => {
			if (!props.image_url || props.image_url.length === 0) return "auto";
			switch (props.imageLayout) {
				case "vertical": return "vertical";
				case "waterfall": return "waterfall";
				case "grid": return "grid";
				case "auto":
				default:
					if (props.image_url.length <= 4) return "vertical";
					if (props.image_url.length >= 9) return "grid";
					return "waterfall";
			}
		};
		const layoutType = getLayoutType();
		return (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [(0, import_jsx_runtime$12.jsxs)("div", {
			className: "flex flex-col px-20 w-full leading-relaxed",
			children: [(0, import_jsx_runtime$12.jsx)("div", {
				className: "relative items-center text-5xl tracking-wider break-words text-foreground",
				children: (0, import_jsx_runtime$12.jsx)(CommentText, {
					className: clsx_default("text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text", "[&_svg]:inline [&_svg]:!mb-4", "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"),
					content: props.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}), (0, import_jsx_runtime$12.jsx)("div", { className: "h-15" })]
		}), props.image_url && Array.isArray(props.image_url) && props.image_url.length > 0 && (0, import_jsx_runtime$12.jsxs)("div", {
			className: "px-20",
			children: [
				layoutType === "grid" && (0, import_jsx_runtime$12.jsx)("div", {
					className: "grid grid-cols-3 gap-4 w-full",
					children: props.image_url.slice(0, 9).map((img, index) => (0, import_jsx_runtime$12.jsx)("div", {
						className: "overflow-hidden rounded-2xl aspect-square shadow-medium",
						children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
							src: img.image_src,
							alt: `图片${index + 1}`,
							className: "object-cover w-full h-full"
						})
					}, index))
				}),
				layoutType === "waterfall" && (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex gap-4 w-full",
					children: [(0, import_jsx_runtime$12.jsx)("div", {
						className: "flex flex-col flex-1 gap-4",
						children: props.image_url.filter((_, index) => index % 2 === 0).map((img, arrayIndex) => {
							const originalIndex = arrayIndex * 2;
							return (0, import_jsx_runtime$12.jsx)("div", {
								className: "overflow-hidden rounded-2xl shadow-medium",
								children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
									src: img.image_src,
									alt: `图片${originalIndex + 1}`,
									className: "object-cover w-full h-auto"
								})
							}, originalIndex);
						})
					}), (0, import_jsx_runtime$12.jsx)("div", {
						className: "flex flex-col flex-1 gap-4",
						children: props.image_url.filter((_, index) => index % 2 === 1).map((img, arrayIndex) => {
							const originalIndex = arrayIndex * 2 + 1;
							return (0, import_jsx_runtime$12.jsx)("div", {
								className: "overflow-hidden rounded-2xl shadow-medium",
								children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
									src: img.image_src,
									alt: `图片${originalIndex + 1}`,
									className: "object-cover w-full h-auto"
								})
							}, originalIndex);
						})
					})]
				}),
				layoutType === "vertical" && props.image_url.map((img, index) => (0, import_jsx_runtime$12.jsxs)(import_react$13.Fragment, { children: [(0, import_jsx_runtime$12.jsx)("div", {
					className: "flex flex-col items-center",
					children: (0, import_jsx_runtime$12.jsx)("div", {
						className: "flex overflow-hidden flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
						children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
							src: img.image_src,
							alt: "封面",
							className: "object-contain w-full h-full rounded-3xl"
						})
					})
				}), (0, import_jsx_runtime$12.jsx)("div", { className: "h-18" })] }, index)),
				(layoutType === "waterfall" || layoutType === "grid") && (0, import_jsx_runtime$12.jsx)("div", { className: "h-18" })
			]
		})] });
	};
	BilibiliDynamicStatus = (props) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "flex flex-col gap-10 px-20 w-full leading-relaxed",
		children: [
			(0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$12.jsx)(Heart, {
								size: 48,
								className: "text-like"
							}),
							props.dianzan,
							"点赞"
						]
					}),
					(0, import_jsx_runtime$12.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$12.jsx)(MessageCircle, {
								size: 48,
								className: "text-primary text-comment"
							}),
							props.pinglun,
							"评论"
						]
					}),
					(0, import_jsx_runtime$12.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$12.jsx)(Share2, {
								size: 48,
								className: "text-success"
							}),
							props.share,
							"分享"
						]
					})
				]
			}),
			(0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$12.jsx)(Clock, {
						size: 48,
						className: "text-time"
					}),
					"图片生成时间: ",
					props.render_time
				]
			}),
			(0, import_jsx_runtime$12.jsx)("div", { className: "h-3" })
		]
	});
	BilibiliDynamicFooter = (props) => (0, import_jsx_runtime$12.jsx)("div", {
		className: "flex flex-col h-full",
		children: (0, import_jsx_runtime$12.jsxs)("div", {
			className: "flex justify-between items-center h-auto pt-25",
			children: [(0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex flex-col self-start pl-16",
				children: [
					(0, import_jsx_runtime$12.jsx)("div", {
						className: "flex items-center text-6xl text-foreground-600",
						children: (0, import_jsx_runtime$12.jsx)("img", {
							src: "/image/bilibili/bilibili-light.png",
							alt: "B站Logo",
							className: "h-auto w-120"
						})
					}),
					(0, import_jsx_runtime$12.jsx)("br", {}),
					(0, import_jsx_runtime$12.jsx)("span", {
						className: "text-5xl select-text text-foreground-600",
						children: "长按识别二维码即可查看全文"
					}),
					(0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider select-text text-foreground-600",
						children: [
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$12.jsx)(Hash, {
									size: 36,
									className: "text-foreground-600"
								}), (0, import_jsx_runtime$12.jsxs)("span", { children: ["UID: ", props.user_shortid] })]
							}),
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$12.jsx)(Heart, {
									size: 36,
									className: "text-like"
								}), (0, import_jsx_runtime$12.jsxs)("span", { children: ["获赞: ", props.total_favorited] })]
							}),
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$12.jsx)(Eye, {
									size: 36,
									className: "text-view"
								}), (0, import_jsx_runtime$12.jsxs)("span", { children: ["关注: ", props.following_count] })]
							}),
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$12.jsx)(Users, {
									size: 36,
									className: "text-follow"
								}), (0, import_jsx_runtime$12.jsxs)("span", { children: ["粉丝: ", props.fans] })]
							})
						]
					})
				]
			}), (0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex flex-col-reverse items-center -mb-12 mr-19",
				children: [(0, import_jsx_runtime$12.jsx)("div", {
					className: "mt-5 ml-3 text-5xl text-right select-text text-foreground-600",
					children: props.dynamicTYPE
				}), (0, import_jsx_runtime$12.jsx)("div", {
					className: "p-3 rounded-sm border-8 border-dashed border-divider",
					children: props.qrCodeDataUrl ? (0, import_jsx_runtime$12.jsx)("img", {
						src: props.qrCodeDataUrl,
						alt: "二维码",
						className: "h-auto w-88"
					}) : (0, import_jsx_runtime$12.jsx)("div", {
						className: "flex justify-center items-center rounded bg-content2 w-88 h-88",
						children: (0, import_jsx_runtime$12.jsx)("span", {
							className: "text-foreground-400",
							children: "二维码"
						})
					})
				})]
			})]
		})
	});
	BilibiliDrawDynamic = import_react$13.memo((props) => (0, import_jsx_runtime$12.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$12.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$12.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$12.jsx)(BilibiliDynamicUserInfo, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					create_time: props.data.create_time,
					decoration_card: props.data.decoration_card
				}),
				(0, import_jsx_runtime$12.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$12.jsx)(BilibiliDynamicContent, {
					text: props.data.text,
					image_url: props.data.image_url,
					imageLayout: props.data.imageLayout
				}),
				(0, import_jsx_runtime$12.jsx)(BilibiliDynamicStatus, {
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					render_time: props.data.render_time
				}),
				(0, import_jsx_runtime$12.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$12.jsx)(BilibiliDynamicFooter, {
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
	}));
	BilibiliDrawDynamic.displayName = "BilibiliDrawDynamic";
	DYNAMIC_TYPE_DRAW_default = BilibiliDrawDynamic;
});
var DYNAMIC_TYPE_AV_exports = __export({
	BilibiliVideoDynamic: () => BilibiliVideoDynamic,
	default: () => DYNAMIC_TYPE_AV_default
});
var import_react$12, import_jsx_runtime$11, BilibiliVideoDynamicHeader, BilibiliVideoDynamicContent, BilibiliVideoDynamicFooter, BilibiliVideoDynamic, DYNAMIC_TYPE_AV_default;
var init_DYNAMIC_TYPE_AV = __esmMin(() => {
	init_lucide_react();
	import_react$12 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$11 = __toESM(require_jsx_runtime());
	BilibiliVideoDynamicHeader = () => (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
		(0, import_jsx_runtime$11.jsx)("div", { className: "h-20" }),
		(0, import_jsx_runtime$11.jsxs)("div", {
			className: "flex items-center pl-20 text-6xl text-default-500",
			children: [(0, import_jsx_runtime$11.jsx)("img", {
				src: "/image/bilibili/bilibili.png",
				alt: "bilibili",
				className: "h-auto w-120"
			}), (0, import_jsx_runtime$11.jsx)("span", {
				className: "ml-8 text-5xl select-text",
				children: "你感兴趣的视频都在哔哩哔哩"
			})]
		}),
		(0, import_jsx_runtime$11.jsx)("div", { className: "h-20" })
	] });
	BilibiliVideoDynamicContent = (props) => (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [props.image_url && (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [(0, import_jsx_runtime$11.jsx)("div", {
		className: "flex flex-col items-center",
		children: (0, import_jsx_runtime$11.jsxs)("div", {
			className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
			children: [(0, import_jsx_runtime$11.jsx)(EnhancedImage, {
				src: props.image_url,
				alt: "封面",
				className: "object-contain w-full h-full rounded-3xl"
			}), (0, import_jsx_runtime$11.jsx)("div", {
				className: "flex absolute bottom-12 right-16",
				children: (0, import_jsx_runtime$11.jsx)("img", {
					src: "/image/bilibili/play.svg",
					alt: "播放图标",
					className: "w-40 h-40"
				})
			})]
		})
	}), (0, import_jsx_runtime$11.jsx)("div", { className: "h-5" })] }), (0, import_jsx_runtime$11.jsxs)("div", {
		className: "flex flex-col w-full leading-relaxed px-21",
		children: [
			(0, import_jsx_runtime$11.jsx)("div", {
				className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground",
				children: (0, import_jsx_runtime$11.jsx)(CommentText, {
					className: "text-[80px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
					content: props.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}),
			(0, import_jsx_runtime$11.jsx)("div", { className: "h-10" }),
			(0, import_jsx_runtime$11.jsx)("div", {
				className: "text-6xl text-default-500",
				children: (0, import_jsx_runtime$11.jsx)(CommentText, {
					className: "text-[60px] leading-[1.5] whitespace-pre-wrap text-default-500 select-text",
					content: props.desc,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}),
			(0, import_jsx_runtime$11.jsx)("div", { className: "h-30" }),
			(0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex flex-col gap-15 text-default-600",
				children: [(0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex flex-col gap-8",
					children: [(0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-12 items-center text-5xl font-light tracking-normal",
						children: [
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Heart, {
									size: 48,
									className: "text-like"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: [props.dianzan, "点赞"]
								})]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(MessageCircle, {
									size: 48,
									className: "text-comment"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: [props.pinglun, "评论"]
								})]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Share2, {
									size: 48,
									className: "text-success"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: [props.share, "分享"]
								})]
							})
						]
					}), (0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-12 items-center text-5xl font-light tracking-normal",
						children: [
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Coins, {
									size: 48,
									className: "text-warning"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: [props.coin, "硬币"]
								})]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Eye, {
									size: 48,
									className: "text-default-400 text-view"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: [props.view, "浏览"]
								})]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-3 items-center text-5xl font-light tracking-normal",
								children: [(0, import_jsx_runtime$11.jsx)(Clock, {
									size: 48,
									className: "text-time"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: ["视频时长: ", props.duration_text]
								})]
							})
						]
					})]
				}), (0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex flex-col gap-4 text-4xl font-light",
					children: [(0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-3 items-center whitespace-nowrap",
						children: [(0, import_jsx_runtime$11.jsx)(Clock, {
							size: 32,
							className: "text-time"
						}), (0, import_jsx_runtime$11.jsxs)("span", {
							className: "select-text",
							children: ["发布于", props.create_time]
						})]
					}), (0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-3 items-center",
						children: [(0, import_jsx_runtime$11.jsx)(Hash, {
							size: 32,
							className: "text-default-400"
						}), (0, import_jsx_runtime$11.jsxs)("span", {
							className: "select-text",
							children: ["动态ID: ", props.dynamic_id]
						})]
					})]
				})]
			}),
			(0, import_jsx_runtime$11.jsx)("div", { className: "h-40" })
		]
	})] });
	BilibiliVideoDynamicFooter = (props) => (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
		(0, import_jsx_runtime$11.jsx)("div", { className: "h-25" }),
		(0, import_jsx_runtime$11.jsxs)("div", {
			className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500",
			children: ["哔哩哔哩", props.dynamicTYPE]
		}),
		(0, import_jsx_runtime$11.jsx)("div", {
			className: "flex flex-col h-full",
			children: (0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex justify-between items-center h-auto pt-25",
				children: [(0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex flex-col items-center pl-12",
					style: { padding: "0 0 0 50px" },
					children: [(0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex gap-8 items-center",
						children: [(0, import_jsx_runtime$11.jsxs)("div", {
							className: "relative",
							children: [(0, import_jsx_runtime$11.jsx)(EnhancedImage, {
								src: props.avatar_url,
								alt: "头像",
								className: "rounded-full shadow-medium w-50 h-50",
								isCircular: true
							}), props.frame && (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
								src: props.frame,
								alt: "头像框",
								className: "absolute inset-0 transform scale-180"
							})]
						}), (0, import_jsx_runtime$11.jsx)("div", {
							className: "flex flex-col",
							children: (0, import_jsx_runtime$11.jsx)("div", {
								className: "text-7xl font-bold select-text text-foreground",
								children: (0, import_jsx_runtime$11.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
							})
						})]
					}), (0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex flex-col gap-4 items-start pt-10 w-full text-4xl tracking-wider text-default-600",
						children: [
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Hash, {
									size: 32,
									className: "text-default-400"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: ["UID: ", props.user_shortid]
								})]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Heart, {
									size: 32,
									className: "text-like"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: ["获赞: ", props.total_favorited]
								})]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Eye, {
									size: 32,
									className: "text-default-400 text-view"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: ["关注: ", props.following_count]
								})]
							}),
							(0, import_jsx_runtime$11.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$11.jsx)(Users, {
									size: 32,
									className: "text-primary"
								}), (0, import_jsx_runtime$11.jsxs)("span", {
									className: "select-text",
									children: ["粉丝: ", props.fans]
								})]
							})
						]
					})]
				}), (0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex flex-col-reverse items-center -mb-12 mr-19",
					children: [(0, import_jsx_runtime$11.jsx)("div", {
						className: "mt-5 ml-3 text-5xl text-right select-text text-default-600",
						children: "动态分享链接"
					}), (0, import_jsx_runtime$11.jsx)("div", {
						className: "p-3 rounded-sm border-8 border-dashed border-default-300",
						children: props.qrCodeDataUrl ? (0, import_jsx_runtime$11.jsx)("img", {
							src: props.qrCodeDataUrl,
							alt: "二维码",
							className: "h-auto w-88"
						}) : (0, import_jsx_runtime$11.jsx)("div", {
							className: "flex justify-center items-center rounded bg-default-100 w-88 h-88",
							children: (0, import_jsx_runtime$11.jsx)("span", {
								className: "text-default-400",
								children: "二维码"
							})
						})
					})]
				})]
			})
		})
	] });
	BilibiliVideoDynamic = import_react$12.memo((props) => (0, import_jsx_runtime$11.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$11.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$11.jsx)(BilibiliVideoDynamicHeader, {}),
				(0, import_jsx_runtime$11.jsx)(BilibiliVideoDynamicContent, {
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
				(0, import_jsx_runtime$11.jsx)(BilibiliVideoDynamicFooter, {
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
	}));
	BilibiliVideoDynamic.displayName = "BilibiliVideoDynamic";
	DYNAMIC_TYPE_AV_default = BilibiliVideoDynamic;
});
var DYNAMIC_TYPE_FORWARD_exports = __export({
	BilibiliForwardDynamic: () => BilibiliForwardDynamic,
	default: () => DYNAMIC_TYPE_FORWARD_default
});
var import_react$11, import_jsx_runtime$10, BilibiliForwardUserInfo, OriginalUserInfo, OriginalAVContent, OriginalDrawContent, OriginalWordContent, OriginalLiveRcmdContent, BilibiliForwardContent, BilibiliForwardStatus, BilibiliForwardFooter, BilibiliForwardDynamic, DYNAMIC_TYPE_FORWARD_default;
var init_DYNAMIC_TYPE_FORWARD = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$11 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$10 = __toESM(require_jsx_runtime());
	BilibiliForwardUserInfo = (props) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$10.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "头像",
					className: "w-36 h-36 rounded-full shadow-medium",
					isCircular: true
				}), props.frame && (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$10.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$10.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$10.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.create_time]
				})]
			}),
			props.decoration_card && (0, import_jsx_runtime$10.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$10.jsx)("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } })
			})
		]
	});
	OriginalUserInfo = (props) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "flex justify-between items-center pt-5 pb-10 pl-10 pr-0",
		children: [(0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex gap-10 items-center min-w-0",
			children: [(0, import_jsx_runtime$10.jsxs)("div", {
				className: "relative flex-shrink-0",
				children: [(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "转发用户头像",
					className: "rounded-full shadow-medium w-30 h-30"
				}), props.frame && (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "转发用户头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}), (0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex flex-col gap-4 text-7xl",
				children: [(0, import_jsx_runtime$10.jsx)("div", {
					className: "text-5xl font-normal select-text text-foreground",
					children: (0, import_jsx_runtime$10.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$10.jsx)(Clock, {
						size: 32,
						className: "text-time"
					}), props.create_time]
				})]
			})]
		}), props.decoration_card && (0, import_jsx_runtime$10.jsx)("div", {
			className: "flex-shrink-0",
			children: (0, import_jsx_runtime$10.jsx)(DecorationCard, { html: props.decoration_card })
		})]
	});
	OriginalAVContent = ({ content }) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-3xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$10.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$10.jsx)("div", {
				className: "flex flex-col items-center py-11",
				children: (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex overflow-hidden relative flex-col items-center w-11/12 rounded-2xl rounded-10 aspect-video shadow-large",
					children: [
						(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
							src: content.cover,
							alt: "视频封面",
							className: "object-cover object-center absolute"
						}),
						(0, import_jsx_runtime$10.jsx)("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
						(0, import_jsx_runtime$10.jsxs)("div", {
							className: "absolute right-5 left-12 bottom-14 z-10 text-4xl font-light text-white select-text",
							children: [
								(0, import_jsx_runtime$10.jsx)("span", {
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
			(0, import_jsx_runtime$10.jsx)("div", {
				className: "pb-10 pl-8 text-6xl font-bold select-text leading-20 text-foreground",
				children: (0, import_jsx_runtime$10.jsx)("span", { dangerouslySetInnerHTML: { __html: content.title } })
			})
		]
	});
	OriginalDrawContent = ({ content }) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$10.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$10.jsx)("div", {
				className: "py-4",
				children: (0, import_jsx_runtime$10.jsxs)("div", {
					className: "text-5xl leading-relaxed text-foreground",
					children: [content.title && (0, import_jsx_runtime$10.jsx)("span", {
						className: "text-6xl font-bold",
						children: content.title
					}), (0, import_jsx_runtime$10.jsx)(CommentText, {
						className: clsx_default("text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text", "[&_svg]:inline [&_svg]:!mb-4"),
						content: content.text,
						style: {
							wordBreak: "break-word",
							overflowWrap: "break-word"
						}
					})]
				})
			}),
			content.image_url && content.image_url.length === 1 ? (0, import_jsx_runtime$10.jsx)("div", {
				className: "flex justify-center py-11",
				children: (0, import_jsx_runtime$10.jsx)("div", {
					className: "flex overflow-hidden flex-col items-center w-11/12 rounded-6 shadow-large",
					children: (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
						src: content.image_url[0].image_src,
						alt: "图片",
						className: "object-cover w-full h-full rounded-6"
					})
				})
			}) : (0, import_jsx_runtime$10.jsx)("div", {
				className: "grid grid-cols-3 gap-4 p-4",
				children: content.image_url?.map((img, index) => (0, import_jsx_runtime$10.jsx)("div", {
					className: "overflow-hidden relative shadow-medium aspect-square rounded-2",
					children: (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
						src: img.image_src,
						alt: `图片${index + 1}`,
						className: "object-cover absolute top-0 left-0 w-full h-full"
					})
				}, index))
			}),
			(0, import_jsx_runtime$10.jsx)("div", { className: "h-4" })
		]
	});
	OriginalWordContent = ({ content }) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [(0, import_jsx_runtime$10.jsx)(OriginalUserInfo, {
			avatar_url: content.avatar_url,
			frame: content.frame,
			username: content.username,
			create_time: content.create_time,
			decoration_card: content.decoration_card
		}), (0, import_jsx_runtime$10.jsx)("div", {
			className: "py-4",
			children: (0, import_jsx_runtime$10.jsx)("div", {
				className: "text-5xl leading-relaxed text-foreground",
				children: (0, import_jsx_runtime$10.jsx)(CommentText, {
					className: "text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
					content: content.text
				})
			})
		})]
	});
	OriginalLiveRcmdContent = ({ content }) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$10.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$10.jsx)("div", {
				className: "flex flex-col items-center py-11",
				children: (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex overflow-hidden relative flex-col items-center w-full rounded-10 aspect-video shadow-large",
					children: [
						(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
							src: content.cover,
							alt: "直播封面",
							className: "object-cover absolute w-full h-full"
						}),
						(0, import_jsx_runtime$10.jsx)("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
						(0, import_jsx_runtime$10.jsxs)("div", {
							className: "absolute right-5 bottom-8 left-12 z-10 text-4xl font-light text-white select-text",
							children: [
								(0, import_jsx_runtime$10.jsx)("span", {
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
			(0, import_jsx_runtime$10.jsx)("div", {
				className: "pl-8 text-6xl font-bold select-text text-foreground",
				children: (0, import_jsx_runtime$10.jsx)("span", { dangerouslySetInnerHTML: { __html: content.title } })
			})
		]
	});
	BilibiliForwardContent = (props) => (0, import_jsx_runtime$10.jsxs)(import_jsx_runtime$10.Fragment, { children: [
		(0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex flex-col px-20 w-full leading-relaxed",
			children: [(0, import_jsx_runtime$10.jsx)("div", {
				className: "relative items-center text-5xl tracking-wider break-words text-foreground",
				children: (0, import_jsx_runtime$10.jsx)(CommentText, {
					className: clsx_default("text-[65px] tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground mb-[20px] select-text", "[&_svg]:inline [&_svg]:!mb-4", "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"),
					content: props.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}), props.imgList && props.imgList.length === 0 && (0, import_jsx_runtime$10.jsx)("div", { className: "h-15" })]
		}),
		props.imgList && props.imgList.length > 0 && (0, import_jsx_runtime$10.jsx)("div", {
			className: "flex flex-col items-center px-20 w-full",
			children: props.imgList.map((img, idx) => (0, import_jsx_runtime$10.jsxs)(import_react$11.Fragment, { children: [(0, import_jsx_runtime$10.jsx)("div", {
				className: "flex overflow-hidden relative flex-col items-center rounded-3xl shadow-large",
				children: (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
					src: img,
					alt: `图片${idx + 1}`,
					className: "object-contain w-full h-full rounded-3xl"
				})
			}), (0, import_jsx_runtime$10.jsx)("div", { className: "h-10" })] }, `${img}-${idx}`))
		}),
		(0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex px-20",
			children: [
				props.original_content.DYNAMIC_TYPE_AV && (0, import_jsx_runtime$10.jsx)(OriginalAVContent, { content: props.original_content.DYNAMIC_TYPE_AV }),
				props.original_content.DYNAMIC_TYPE_DRAW && (0, import_jsx_runtime$10.jsx)(OriginalDrawContent, { content: props.original_content.DYNAMIC_TYPE_DRAW }),
				props.original_content.DYNAMIC_TYPE_WORD && (0, import_jsx_runtime$10.jsx)(OriginalWordContent, { content: props.original_content.DYNAMIC_TYPE_WORD }),
				props.original_content.DYNAMIC_TYPE_LIVE_RCMD && (0, import_jsx_runtime$10.jsx)(OriginalLiveRcmdContent, { content: props.original_content.DYNAMIC_TYPE_LIVE_RCMD })
			]
		})
	] });
	BilibiliForwardStatus = (props) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "flex flex-col gap-10 px-20 w-full leading-relaxed",
		children: [
			(0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$10.jsx)(Heart, {
								size: 48,
								className: "text-like"
							}),
							props.dianzan,
							"点赞"
						]
					}),
					(0, import_jsx_runtime$10.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$10.jsx)(MessageCircle, {
								size: 48,
								className: "text-primary text-comment"
							}),
							props.pinglun,
							"评论"
						]
					}),
					(0, import_jsx_runtime$10.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$10.jsx)(Share2, {
								size: 48,
								className: "text-success"
							}),
							props.share,
							"分享"
						]
					})
				]
			}),
			(0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$10.jsx)(Clock, {
						size: 48,
						className: "text-time"
					}),
					"图片生成时间: ",
					props.render_time
				]
			}),
			(0, import_jsx_runtime$10.jsx)("div", { className: "h-3" })
		]
	});
	BilibiliForwardFooter = (props) => (0, import_jsx_runtime$10.jsx)("div", {
		className: "flex flex-col h-full",
		children: (0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex justify-between items-center h-auto pt-25",
			children: [(0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex flex-col self-start pl-16",
				children: [
					(0, import_jsx_runtime$10.jsx)("div", {
						className: "flex items-center text-6xl text-foreground-600",
						children: (0, import_jsx_runtime$10.jsx)("img", {
							src: "/image/bilibili/bilibili-light.png",
							alt: "B站Logo",
							className: "w-80 h-auto"
						})
					}),
					(0, import_jsx_runtime$10.jsx)("br", {}),
					(0, import_jsx_runtime$10.jsx)("span", {
						className: "text-5xl select-text text-foreground-600",
						children: "长按识别二维码即可查看全文"
					}),
					(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider select-text text-foreground-600",
						children: [
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Hash, {
									size: 36,
									className: "text-foreground-600"
								}), (0, import_jsx_runtime$10.jsxs)("span", { children: ["UID: ", props.user_shortid] })]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Heart, {
									size: 36,
									className: "text-like"
								}), (0, import_jsx_runtime$10.jsxs)("span", { children: ["获赞: ", props.total_favorited] })]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Eye, {
									size: 36,
									className: "text-view"
								}), (0, import_jsx_runtime$10.jsxs)("span", { children: ["关注: ", props.following_count] })]
							}),
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Users, {
									size: 36,
									className: "text-follow"
								}), (0, import_jsx_runtime$10.jsxs)("span", { children: ["粉丝: ", props.fans] })]
							})
						]
					})
				]
			}), (0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex flex-col-reverse items-center -mb-12 mr-19",
				children: [(0, import_jsx_runtime$10.jsx)("div", {
					className: "mt-5 ml-3 text-5xl text-right select-text text-foreground-600",
					children: props.dynamicTYPE
				}), (0, import_jsx_runtime$10.jsx)("div", {
					className: "p-3 rounded-sm border-8 border-dashed border-divider",
					children: props.qrCodeDataUrl ? (0, import_jsx_runtime$10.jsx)("img", {
						src: props.qrCodeDataUrl,
						alt: "二维码",
						className: "h-auto w-88"
					}) : (0, import_jsx_runtime$10.jsx)("div", {
						className: "flex justify-center items-center rounded bg-content2 w-88 h-88",
						children: (0, import_jsx_runtime$10.jsx)("span", {
							className: "text-foreground-400",
							children: "二维码"
						})
					})
				})]
			})]
		})
	});
	BilibiliForwardDynamic = import_react$11.memo((props) => (0, import_jsx_runtime$10.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$10.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$10.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$10.jsx)(BilibiliForwardUserInfo, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					create_time: props.data.create_time,
					decoration_card: props.data.decoration_card
				}),
				(0, import_jsx_runtime$10.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$10.jsx)(BilibiliForwardContent, { ...props.data }),
				(0, import_jsx_runtime$10.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$10.jsx)(BilibiliForwardStatus, {
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					render_time: props.data.render_time
				}),
				(0, import_jsx_runtime$10.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$10.jsx)(BilibiliForwardFooter, {
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
	}));
	BilibiliForwardDynamic.displayName = "BilibiliForwardDynamic";
	DYNAMIC_TYPE_FORWARD_default = BilibiliForwardDynamic;
});
var DYNAMIC_TYPE_LIVE_RCMD_exports = __export({
	BilibiliLiveDynamic: () => BilibiliLiveDynamic,
	default: () => DYNAMIC_TYPE_LIVE_RCMD_default
});
var import_react$10, import_jsx_runtime$9, BilibiliLiveDynamicHeader, BilibiliLiveDynamicContent, BilibiliLiveDynamicFooter, BilibiliLiveDynamic, DYNAMIC_TYPE_LIVE_RCMD_default;
var init_DYNAMIC_TYPE_LIVE_RCMD = __esmMin(() => {
	init_lucide_react();
	import_react$10 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$9 = __toESM(require_jsx_runtime());
	BilibiliLiveDynamicHeader = () => (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
		(0, import_jsx_runtime$9.jsx)("div", { className: "h-5" }),
		(0, import_jsx_runtime$9.jsxs)("div", {
			className: "flex flex-col items-start text-6xl text-default-600",
			children: [(0, import_jsx_runtime$9.jsx)("img", {
				src: "/image/bilibili/bilibili-light.png",
				alt: "哔哩哔哩",
				className: "h-auto w-120"
			}), (0, import_jsx_runtime$9.jsx)("span", {
				className: "pt-10 text-6xl select-text",
				children: "你感兴趣的视频都在B站"
			})]
		}),
		(0, import_jsx_runtime$9.jsx)("div", { className: "h-5" })
	] });
	BilibiliLiveDynamicContent = (props) => (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [
		(0, import_jsx_runtime$9.jsx)("div", { className: "h-15" }),
		props.image_url && (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [(0, import_jsx_runtime$9.jsx)("div", {
			className: "flex flex-col items-center",
			children: (0, import_jsx_runtime$9.jsx)("div", {
				className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
				children: (0, import_jsx_runtime$9.jsx)(EnhancedImage, {
					src: props.image_url,
					alt: "封面",
					className: "object-contain w-full h-full rounded-3xl"
				})
			})
		}), (0, import_jsx_runtime$9.jsx)("div", { className: "h-10" })] }),
		(0, import_jsx_runtime$9.jsxs)("div", {
			className: "flex flex-col w-full leading-relaxed px-15",
			children: [
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-3" }),
				(0, import_jsx_runtime$9.jsx)("div", {
					className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground",
					children: (0, import_jsx_runtime$9.jsx)(CommentText, {
						className: "text-[65px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
						content: props.text,
						style: {
							wordBreak: "break-word",
							overflowWrap: "break-word"
						}
					})
				}),
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-10" }),
				(0, import_jsx_runtime$9.jsxs)("div", {
					className: "flex gap-2 items-center text-5xl tracking-normal text-default-500",
					children: [(0, import_jsx_runtime$9.jsx)(Radio, {
						size: 48,
						className: "text-primary"
					}), (0, import_jsx_runtime$9.jsx)("span", {
						className: "select-text",
						children: props.liveinf
					})]
				}),
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-5" }),
				(0, import_jsx_runtime$9.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl tracking-normal text-default-500",
					children: [(0, import_jsx_runtime$9.jsx)(Clock, {
						size: 32,
						className: "text-time"
					}), (0, import_jsx_runtime$9.jsxs)("span", {
						className: "select-text",
						children: ["直播开始时间: ", props.create_time]
					})]
				}),
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$9.jsxs)("div", {
					className: "flex gap-10 items-center",
					children: [(0, import_jsx_runtime$9.jsxs)("div", {
						className: "relative",
						children: [(0, import_jsx_runtime$9.jsx)(EnhancedImage, {
							src: props.avatar_url,
							alt: "头像",
							className: "w-32 h-32 rounded-full shadow-medium",
							isCircular: true
						}), props.frame && (0, import_jsx_runtime$9.jsx)(EnhancedImage, {
							src: props.frame,
							alt: "头像框",
							className: "absolute inset-0 transform scale-160"
						})]
					}), (0, import_jsx_runtime$9.jsxs)("div", {
						className: "flex flex-col gap-5 items-start",
						children: [(0, import_jsx_runtime$9.jsxs)("div", {
							className: "flex gap-4 items-center",
							children: [(0, import_jsx_runtime$9.jsx)("div", {
								className: "text-6xl font-bold select-text text-foreground",
								children: (0, import_jsx_runtime$9.jsx)(CommentText, { content: props.username })
							}), (0, import_jsx_runtime$9.jsx)("img", {
								className: "w-32 h-auto",
								src: "/image/bilibili/直播中.png",
								alt: "直播中"
							})]
						}), (0, import_jsx_runtime$9.jsxs)("div", {
							className: "flex gap-2 items-center text-4xl text-default-600",
							children: [(0, import_jsx_runtime$9.jsx)(Users, {
								size: 32,
								className: "text-follow"
							}), (0, import_jsx_runtime$9.jsxs)("span", {
								className: "select-text",
								children: [props.fans, "粉丝"]
							})]
						})]
					})]
				}),
				(0, import_jsx_runtime$9.jsx)("div", { className: "h-50" })
			]
		})
	] });
	BilibiliLiveDynamicFooter = (props) => (0, import_jsx_runtime$9.jsxs)(import_jsx_runtime$9.Fragment, { children: [(0, import_jsx_runtime$9.jsxs)("div", {
		className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500",
		children: ["哔哩哔哩", props.dynamicTYPE]
	}), (0, import_jsx_runtime$9.jsx)("div", {
		className: "flex flex-col h-full",
		children: (0, import_jsx_runtime$9.jsxs)("div", {
			className: "flex justify-between items-center h-auto pt-25",
			children: [(0, import_jsx_runtime$9.jsx)("div", {
				className: "flex flex-col items-center pl-16",
				children: (0, import_jsx_runtime$9.jsx)(BilibiliLiveDynamicHeader, {})
			}), (0, import_jsx_runtime$9.jsxs)("div", {
				className: "flex flex-col-reverse items-center -mb-12 mr-19",
				children: [(0, import_jsx_runtime$9.jsx)("div", {
					className: "mt-5 ml-3 text-5xl text-right select-text text-default-500",
					children: "动态分享链接"
				}), (0, import_jsx_runtime$9.jsx)("div", {
					className: "p-3 rounded-sm border-8 border-dashed border-default-300",
					children: props.qrCodeDataUrl ? (0, import_jsx_runtime$9.jsx)("img", {
						src: props.qrCodeDataUrl,
						alt: "二维码",
						className: "h-auto w-88"
					}) : (0, import_jsx_runtime$9.jsx)("div", {
						className: "flex justify-center items-center rounded bg-default-100 w-88 h-88",
						children: (0, import_jsx_runtime$9.jsx)("span", {
							className: "text-default-400",
							children: "二维码"
						})
					})
				})]
			})]
		})
	})] });
	BilibiliLiveDynamic = import_react$10.memo((props) => (0, import_jsx_runtime$9.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$9.jsxs)("div", {
			className: "p-4",
			children: [(0, import_jsx_runtime$9.jsx)(BilibiliLiveDynamicContent, {
				image_url: props.data.image_url,
				text: props.data.text,
				liveinf: props.data.liveinf,
				create_time: props.data.create_time,
				username: props.data.username,
				avatar_url: props.data.avatar_url,
				frame: props.data.frame,
				fans: props.data.fans
			}), (0, import_jsx_runtime$9.jsx)(BilibiliLiveDynamicFooter, {
				avatar_url: props.data.avatar_url,
				frame: props.data.frame,
				username: props.data.username,
				fans: props.data.fans,
				dynamicTYPE: props.data.dynamicTYPE,
				share_url: props.data.share_url,
				qrCodeDataUrl: props.qrCodeDataUrl
			})]
		})
	}));
	BilibiliLiveDynamic.displayName = "BilibiliLiveDynamic";
	DYNAMIC_TYPE_LIVE_RCMD_default = BilibiliLiveDynamic;
});
var DYNAMIC_TYPE_ARTICLE_exports = __export({
	BilibiliArticleDynamic: () => BilibiliArticleDynamic,
	default: () => DYNAMIC_TYPE_ARTICLE_default
});
var import_react$9, import_jsx_runtime$8, getFontLevelClass, renderTextNode, renderParagraphContent, parseOpusContent, sanitizeHtmlContent, BilibiliArticleUserInfo, BilibiliArticleContent, BilibiliArticleStatus, BilibiliArticleFooter, BilibiliArticleDynamic, DYNAMIC_TYPE_ARTICLE_default;
var init_DYNAMIC_TYPE_ARTICLE = __esmMin(() => {
	init_lucide_react();
	import_react$9 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$8 = __toESM(require_jsx_runtime());
	getFontLevelClass = (fontLevel) => {
		switch (fontLevel) {
			case "light": return "font-light";
			case "regular": return "font-normal";
			case "medium": return "font-medium";
			case "semibold": return "font-semibold";
			case "bold": return "font-bold";
			case "extrabold": return "font-extrabold";
			default: return "font-normal";
		}
	};
	renderTextNode = (node, nodeIndex) => {
		if (node.node_type !== 1 || !node.word) return null;
		const { words, style = {}, font_level = "regular", font_size = 17, color } = node.word;
		const classNames = [];
		const fontSize = Math.max(32, font_size * 2.5);
		if (style.bold) classNames.push("font-bold");
		else classNames.push(getFontLevelClass(font_level));
		if (style.italic) classNames.push("italic");
		if (style.strike) classNames.push("line-through");
		if (style.align) switch (style.align) {
			case "center":
				classNames.push("text-center");
				break;
			case "right":
				classNames.push("text-right");
				break;
			case "justify":
				classNames.push("text-justify");
				break;
			default: classNames.push("text-left");
		}
		if (style.blockquote) classNames.push("border-l-4", "border-foreground-300", "pl-4", "italic", "text-foreground-600");
		if (style.header) {
			const headerLevel = Math.min(Math.max(1, style.header), 6);
			classNames.push({
				1: "text-[72px] font-bold",
				2: "text-[64px] font-bold",
				3: "text-[56px] font-semibold",
				4: "text-[48px] font-semibold",
				5: "text-[40px] font-medium",
				6: "text-[36px] font-medium"
			}[headerLevel]);
		}
		if (style.list) {
			if (style.list === "bullet") classNames.push("list-disc", "list-inside");
			else if (style.list === "ordered") classNames.push("list-decimal", "list-inside");
		}
		if (style.class) classNames.push(style.class);
		const inlineStyle = { fontSize: `${fontSize}px` };
		if (color) inlineStyle.color = color;
		else if (style.color) inlineStyle.color = style.color;
		if (style.link) return (0, import_jsx_runtime$8.jsx)("a", {
			href: style.link,
			className: `${classNames.join(" ")} text-primary hover:text-primary-600 underline cursor-pointer`,
			style: inlineStyle,
			target: "_blank",
			rel: "noopener noreferrer",
			children: words
		}, nodeIndex);
		if (style.header) return (0, import_jsx_runtime$8.jsx)(`h${Math.min(Math.max(1, style.header), 6)}`, {
			className: classNames.join(" "),
			style: inlineStyle,
			children: words
		}, nodeIndex);
		if (style.blockquote) return (0, import_jsx_runtime$8.jsx)("blockquote", {
			className: classNames.join(" "),
			style: inlineStyle,
			children: words
		}, nodeIndex);
		if (style.list) return (0, import_jsx_runtime$8.jsx)(style.list === "ordered" ? "ol" : "ul", {
			className: classNames.join(" "),
			style: inlineStyle,
			children: (0, import_jsx_runtime$8.jsx)("li", { children: words })
		}, nodeIndex);
		return (0, import_jsx_runtime$8.jsx)("span", {
			className: classNames.join(" "),
			style: inlineStyle,
			children: words
		}, nodeIndex);
	};
	renderParagraphContent = (paragraph, paragraphIndex) => {
		const { para_type, text, pic } = paragraph;
		switch (para_type) {
			case 1:
				if (!text?.nodes) return null;
				return (0, import_jsx_runtime$8.jsx)("p", {
					className: "mb-10 leading-[1.7]",
					children: text.nodes.map((node, nodeIndex) => renderTextNode(node, nodeIndex))
				}, paragraphIndex);
			case 4:
				if (!text?.nodes) return null;
				return (0, import_jsx_runtime$8.jsx)("blockquote", {
					className: "pl-6 my-8 border-l-8 border-default-400 text-foreground-700 leading-[1.7]",
					children: text.nodes.map((node, nodeIndex) => renderTextNode(node, nodeIndex))
				}, paragraphIndex);
			case 2:
				if (!pic?.pics) return null;
				return (0, import_jsx_runtime$8.jsx)("div", {
					className: "my-6",
					children: pic.pics.map((picItem, picIndex) => (0, import_jsx_runtime$8.jsx)(EnhancedImage, {
						src: picItem.url,
						alt: "专栏图片",
						className: "mb-2 w-full rounded-4xl"
					}, picIndex))
				}, paragraphIndex);
			default: return null;
		}
	};
	parseOpusContent = (opus) => {
		try {
			if (!opus?.content?.paragraphs) return null;
			return opus.content.paragraphs.map((paragraph, index) => renderParagraphContent(paragraph, index));
		} catch (error) {
			console.error("解析结构化专栏内容失败:", error);
			return null;
		}
	};
	sanitizeHtmlContent = (htmlString) => {
		try {
			let processed = htmlString;
			Object.entries({
				"color-pink-01": "#FF6699",
				"color-pink-02": "#FF85C0",
				"color-pink-03": "#FFA0D0",
				"color-pink-04": "#FFB8E0",
				"color-blue-01": "#00A1D6",
				"color-blue-02": "#00B5E5",
				"color-blue-03": "#33C5F3",
				"color-purple-01": "#9B59B6",
				"color-yellow-01": "#FFC107",
				"color-orange-01": "#FF6600",
				"color-red-01": "#FF0000",
				"color-green-01": "#00C853"
			}).forEach(([className, color]) => {
				processed = processed.replace(new RegExp(`class="${className}"`, "gi"), `style="color: ${color}"`);
				processed = processed.replace(new RegExp(`class="([^"]*?)\\s*${className}\\s*([^"]*?)"`, "gi"), (match, before, after) => {
					const otherClasses = `${before} ${after}`.trim();
					if (otherClasses) return `class="${otherClasses}" style="color: ${color}"`;
					return `style="color: ${color}"`;
				});
			});
			processed = processed.replace(/\s+contenteditable="[^"]*"/gi, "");
			processed = processed.replace(/\s+contenteditable='[^']*'/gi, "");
			processed = processed.replace(/\s+contenteditable(?=\s|>)/gi, "");
			processed = processed.replace(/\s+class="[^"]*"/gi, "");
			processed = processed.replace(/\s+class='[^']*'/gi, "");
			processed = processed.replace(/src="\/\//gi, "src=\"https://");
			const addClassToTag = (html, tagName, className, extraAttrs = "") => {
				html = html.replace(new RegExp(`<${tagName}\\s+([^>]*?)>`, "gi"), (match, attrs) => `<${tagName} ${extraAttrs ? extraAttrs + " " : ""}${attrs} class="${className}">`);
				html = html.replace(new RegExp(`<${tagName}>`, "gi"), `<${tagName}${extraAttrs ? " " + extraAttrs : ""} class="${className}">`);
				return html;
			};
			processed = addClassToTag(processed, "img", "w-full rounded-4xl", "referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\"");
			processed = addClassToTag(processed, "figure", "my-8 w-full");
			processed = addClassToTag(processed, "figcaption", "text-center text-[36px] text-foreground-600 mt-4");
			processed = addClassToTag(processed, "h1", "text-[72px] font-bold mb-10 leading-[1.4]");
			processed = addClassToTag(processed, "h2", "text-[64px] font-bold mb-10 leading-[1.4]");
			processed = addClassToTag(processed, "h3", "text-[56px] font-semibold mb-8 leading-[1.4]");
			processed = addClassToTag(processed, "h4", "text-[48px] font-semibold mb-8 leading-[1.4]");
			processed = addClassToTag(processed, "h5", "text-[40px] font-medium mb-6 leading-[1.4]");
			processed = addClassToTag(processed, "h6", "text-[36px] font-medium mb-6 leading-[1.4]");
			processed = addClassToTag(processed, "p", "mb-10 leading-[1.7] text-[42px]");
			processed = addClassToTag(processed, "blockquote", "pl-6 my-8 border-l-8 border-default-400 text-foreground-700 leading-[1.7] text-[42px]");
			processed = addClassToTag(processed, "ul", "list-disc list-inside mb-8 text-[42px] leading-[1.7]");
			processed = addClassToTag(processed, "ol", "list-decimal list-inside mb-8 text-[42px] leading-[1.7]");
			processed = addClassToTag(processed, "li", "mb-4");
			processed = addClassToTag(processed, "strong", "font-bold");
			processed = addClassToTag(processed, "b", "font-bold");
			processed = addClassToTag(processed, "em", "italic");
			processed = addClassToTag(processed, "i", "italic");
			processed = addClassToTag(processed, "a", "text-primary hover:text-primary-600 underline", "target=\"_blank\" rel=\"noopener noreferrer\"");
			processed = addClassToTag(processed, "code", "px-2 py-1 bg-default-100 rounded text-[38px] font-mono");
			processed = addClassToTag(processed, "pre", "p-6 bg-default-100 rounded-2xl overflow-x-auto my-6");
			processed = addClassToTag(processed, "table", "w-full border-collapse my-8 text-[38px]");
			processed = addClassToTag(processed, "thead", "bg-default-100");
			processed = addClassToTag(processed, "tr", "border-b border-default-200");
			processed = addClassToTag(processed, "th", "p-4 text-left font-semibold");
			processed = addClassToTag(processed, "td", "p-4");
			processed = addClassToTag(processed, "hr", "my-8 border-default-300");
			return processed;
		} catch (error) {
			console.error("清理HTML内容失败:", error);
			return htmlString;
		}
	};
	BilibiliArticleUserInfo = import_react$9.memo((props) => (0, import_jsx_runtime$8.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$8.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$8.jsx)(EnhancedImage, {
					src: props.data.avatar_url,
					alt: "用户头像",
					className: "w-32 h-32 rounded-full shadow-medium",
					isCircular: true
				}), props.data.frame && (0, import_jsx_runtime$8.jsx)(EnhancedImage, {
					src: props.data.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$8.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$8.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$8.jsx)("span", { dangerouslySetInnerHTML: { __html: props.data.username } })
				}), (0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$8.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.data.create_time]
				})]
			}),
			props.data.decoration_card && (0, import_jsx_runtime$8.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$8.jsx)("div", { dangerouslySetInnerHTML: { __html: props.data.decoration_card.card_url } })
			})
		]
	}));
	BilibiliArticleContent = import_react$9.memo((props) => {
		const articleContentElements = import_react$9.useMemo(() => {
			if (props.data.opus) return parseOpusContent(props.data.opus);
			return null;
		}, [props.data.opus]);
		const sanitizedHtmlContent = import_react$9.useMemo(() => {
			const isJson = (() => {
				try {
					return typeof props.data.content === "string" && !!JSON.parse(props.data.content);
				} catch {
					return false;
				}
			})();
			if (props.data.content && typeof props.data.content === "string" && !isJson) return sanitizeHtmlContent(props.data.content);
			return null;
		}, [props.data.content]);
		return (0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex flex-col px-20 w-full leading-relaxed",
			children: [
				(0, import_jsx_runtime$8.jsx)("div", {
					className: "mb-8",
					children: (0, import_jsx_runtime$8.jsx)("h1", {
						className: "text-[60px] font-bold leading-[1.4] tracking-[0.5px] text-foreground select-text",
						children: (0, import_jsx_runtime$8.jsx)(CommentText, { content: props.data.title })
					})
				}),
				props.data.banner_url && (0, import_jsx_runtime$8.jsx)("div", {
					className: "mb-8",
					children: (0, import_jsx_runtime$8.jsx)(EnhancedImage, {
						src: props.data.banner_url,
						alt: "专栏封面",
						className: "w-full rounded-2xl shadow-medium"
					})
				}),
				props.data.summary && (0, import_jsx_runtime$8.jsx)("div", {
					className: "mb-8",
					children: (0, import_jsx_runtime$8.jsx)(CommentText, {
						content: props.data.summary,
						className: "text-[48px] leading-[1.6] text-foreground-600 select-text"
					})
				}),
				articleContentElements && (0, import_jsx_runtime$8.jsx)("div", {
					className: "flex-col items-center mb-8 select-text",
					children: articleContentElements
				}),
				sanitizedHtmlContent && (0, import_jsx_runtime$8.jsx)("div", {
					className: "flex-col items-center mb-8 select-text",
					dangerouslySetInnerHTML: { __html: sanitizedHtmlContent }
				})
			]
		});
	});
	BilibiliArticleStatus = import_react$9.memo((props) => (0, import_jsx_runtime$8.jsxs)("div", {
		className: "flex flex-col gap-12 px-20 py-16",
		children: [(0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex gap-24 items-center",
			children: [
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-3 items-center text-[42px] text-like",
					children: [
						(0, import_jsx_runtime$8.jsx)(Heart, { size: 32 }),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-medium",
							children: props.data.stats.like || 0
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "text-[36px] text-foreground-600",
							children: "点赞"
						})
					]
				}),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-3 items-center text-[42px] text-comment",
					children: [
						(0, import_jsx_runtime$8.jsx)(MessageCircle, { size: 32 }),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-medium",
							children: props.data.stats.reply || 0
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "text-[36px] text-foreground-600",
							children: "评论"
						})
					]
				}),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-3 items-center text-[42px] text-share",
					children: [
						(0, import_jsx_runtime$8.jsx)(Share2, { size: 32 }),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-medium",
							children: props.data.stats.dynamic || 0
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "text-[36px] text-foreground-600",
							children: "分享"
						})
					]
				})
			]
		}), (0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex gap-20 items-center text-[36px] text-default-700",
			children: [
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [
						(0, import_jsx_runtime$8.jsx)(Eye, {
							size: 28,
							className: "text-view"
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-medium",
							children: "阅读量"
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-bold text-foreground",
							children: props.data.stats.view || 0
						})
					]
				}),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [
						(0, import_jsx_runtime$8.jsx)(BookOpen, {
							size: 28,
							className: "text-coin"
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-medium",
							children: "收藏"
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-bold text-foreground",
							children: props.data.stats.favorite || 0
						})
					]
				}),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [
						(0, import_jsx_runtime$8.jsx)(Heart, {
							size: 28,
							className: "text-like"
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-medium",
							children: "获赞"
						}),
						(0, import_jsx_runtime$8.jsx)("span", {
							className: "font-bold text-foreground",
							children: props.data.stats.like || 0
						})
					]
				})
			]
		})]
	}));
	BilibiliArticleFooter = import_react$9.memo((props) => (0, import_jsx_runtime$8.jsxs)("div", {
		className: "flex justify-between items-end px-20 py-12",
		children: [(0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex flex-col gap-6",
			children: [
				(0, import_jsx_runtime$8.jsx)("div", {
					className: "flex items-center",
					children: (0, import_jsx_runtime$8.jsx)("img", {
						src: "/image/bilibili/bilibili-light.png",
						alt: "B站Logo",
						className: "w-80 h-auto"
					})
				}),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "flex flex-col gap-2 text-[32px] text-default-500",
					children: [(0, import_jsx_runtime$8.jsxs)("div", { children: ["发布于 ", props.data.create_time] }), (0, import_jsx_runtime$8.jsxs)("div", { children: ["图片渲染于 ", props.data.render_time] })]
				}),
				(0, import_jsx_runtime$8.jsx)("span", {
					className: "text-[36px] text-default-600 font-medium",
					children: "长按识别二维码即可查看全文"
				})
			]
		}), (0, import_jsx_runtime$8.jsxs)("div", {
			className: "flex flex-col items-center gap-4 text-[32px]",
			children: [(0, import_jsx_runtime$8.jsx)("div", {
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
			}), (0, import_jsx_runtime$8.jsx)("div", {
				className: "text-[38px] font-semibold text-default-700",
				children: props.data.dynamicTYPE
			})]
		})]
	}));
	BilibiliArticleDynamic = import_react$9.memo((props) => (0, import_jsx_runtime$8.jsx)(DefaultLayout, {
		data: props.data,
		version: props.version,
		scale: props.scale,
		children: (0, import_jsx_runtime$8.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$8.jsx)(BilibiliArticleUserInfo, { ...props }),
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$8.jsx)(BilibiliArticleContent, { ...props }),
				(0, import_jsx_runtime$8.jsx)(BilibiliArticleStatus, { ...props }),
				(0, import_jsx_runtime$8.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$8.jsx)(BilibiliArticleFooter, { ...props })
			]
		})
	}));
	BilibiliArticleDynamic.displayName = "BilibiliArticleDynamic";
	DYNAMIC_TYPE_ARTICLE_default = BilibiliArticleDynamic;
});
var videoInfo_exports = __export({
	BilibiliVideoInfo: () => BilibiliVideoInfo,
	default: () => videoInfo_default
});
var import_react$8, import_jsx_runtime$7, formatNumber$1, formatDate$1, StatItem$1, BilibiliVideoInfo, videoInfo_default;
var init_videoInfo = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$8 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$7 = __toESM(require_jsx_runtime());
	formatNumber$1 = (num) => {
		if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`;
		return num.toLocaleString();
	};
	formatDate$1 = (timestamp) => (/* @__PURE__ */ new Date(timestamp * 1e3)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
	StatItem$1 = import_react$8.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$7.jsxs)("div", {
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
	}));
	StatItem$1.displayName = "StatItem";
	BilibiliVideoInfo = import_react$8.memo((props) => {
		const formattedDate = (0, import_react$8.useMemo)(() => formatDate$1(props.data.ctime), [props.data.ctime]);
		const statsData = (0, import_react$8.useMemo)(() => [
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
								isCircular: true
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
	});
	BilibiliVideoInfo.displayName = "BilibiliVideoInfo";
	videoInfo_default = BilibiliVideoInfo;
});
var qrcodeImg_exports = __export({
	BilibiliQrcodeImg: () => BilibiliQrcodeImg,
	default: () => qrcodeImg_default
});
var import_react$7, import_jsx_runtime$6, BilibiliQrcodeImg, qrcodeImg_default;
var init_qrcodeImg = __esmMin(() => {
	init_lucide_react();
	import_react$7 = __toESM(require_react());
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$6 = __toESM(require_jsx_runtime());
	BilibiliQrcodeImg = import_react$7.memo((props) => {
		const { data, qrCodeDataUrl } = props;
		const { share_url } = data;
		const disclaimer = [
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
								className: `text-2xl leading-relaxed ${index === 0 ? "font-semibold text-warning-700" : "text-foreground-600"}`,
								children: line
							}, index))
						})]
					})
				]
			})
		});
	});
	BilibiliQrcodeImg.displayName = "BilibiliQrcodeImg";
	qrcodeImg_default = BilibiliQrcodeImg;
});
var Comment_exports$1 = __export({
	KuaishouComment: () => KuaishouComment,
	default: () => Comment_default$1
});
var import_react$6, import_jsx_runtime$5, KuaishouQRCodeSection, KuaishouVideoInfoHeader, KuaishouCommentItemComponent, KuaishouComment, Comment_default$1;
var init_Comment$1 = __esmMin(() => {
	init_lucide_react();
	import_react$6 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$5 = __toESM(require_jsx_runtime());
	KuaishouQRCodeSection = ({ qrCodeDataUrl, type, imageLength }) => (0, import_jsx_runtime$5.jsxs)("div", {
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
			children: type === "视频" ? "视频直链(永久)" : type === "图集" ? `图集分享链接 共${imageLength}张` : "分享链接"
		})]
	});
	KuaishouVideoInfoHeader = ({ type, commentLength, videoSize, likeCount, viewCount, imageLength }) => (0, import_jsx_runtime$5.jsx)("div", {
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
						if (parent) parent.innerHTML = "<div class=\"flex justify-center items-center h-full text-2xl font-bold text-foreground\">快手</div>";
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
					type === "视频" && (0, import_jsx_runtime$5.jsxs)(import_jsx_runtime$5.Fragment, { children: [
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
					type === "图集" && (0, import_jsx_runtime$5.jsxs)("div", {
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
	});
	KuaishouCommentItemComponent = ({ comment, isLast = false }) => (0, import_jsx_runtime$5.jsxs)("div", {
		className: `flex px-10 pt-10 ${isLast ? "pb-0" : "pb-10"}`,
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
	});
	KuaishouComment = import_react$6.memo((props) => {
		const processedData = (0, import_react$6.useMemo)(() => {
			if (!props.data) return {
				commentsArray: [],
				type: "未知",
				commentLength: 0,
				videoSize: void 0,
				likeCount: void 0,
				viewCount: void 0,
				imageLength: void 0,
				useDarkTheme: false
			};
			return {
				commentsArray: Array.isArray(props.data.CommentsData) ? props.data.CommentsData : props.data.CommentsData?.jsonArray || [],
				type: props.data.Type || "未知",
				commentLength: props.data.CommentLength || 0,
				videoSize: props.data.VideoSize,
				likeCount: props.data.likeCount,
				viewCount: props.data.viewCount,
				imageLength: props.data.ImageLength,
				useDarkTheme: props.data.useDarkTheme || false
			};
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
	});
	Comment_default$1 = KuaishouComment;
});
var noteInfo_exports = __export({
	XiaohongshuNoteInfo: () => XiaohongshuNoteInfo,
	default: () => noteInfo_default
});
var import_react$5, import_jsx_runtime$4, formatNumber, formatDate, StatItem, XiaohongshuNoteInfo, noteInfo_default;
var init_noteInfo = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$5 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$4 = __toESM(require_jsx_runtime());
	formatNumber = (num) => {
		const numValue = typeof num === "string" ? parseInt(num, 10) : num;
		if (numValue >= 1e4) return `${(numValue / 1e4).toFixed(1)}万`;
		return numValue.toLocaleString();
	};
	formatDate = (timestamp) => new Date(timestamp).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
	StatItem = import_react$5.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$4.jsxs)("div", {
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
	}));
	StatItem.displayName = "StatItem";
	XiaohongshuNoteInfo = import_react$5.memo((props) => {
		const formattedDate = (0, import_react$5.useMemo)(() => formatDate(props.data.time), [props.data.time]);
		const statsData = (0, import_react$5.useMemo)(() => [
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
	});
	XiaohongshuNoteInfo.displayName = "XiaohongshuNoteInfo";
	noteInfo_default = XiaohongshuNoteInfo;
});
var Comment_exports = __export({
	XiaohongshuComment: () => XiaohongshuComment,
	default: () => Comment_default
});
var import_react$4, import_jsx_runtime$3, QRCodeSection, NoteInfoHeader, CommentItemComponent, XiaohongshuComment, Comment_default;
var init_Comment = __esmMin(() => {
	init_lucide_react();
	import_react$4 = __toESM(require_react());
	init_DefaultLayout();
	import_jsx_runtime$3 = __toESM(require_jsx_runtime());
	QRCodeSection = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$3.jsxs)("div", {
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
	});
	NoteInfoHeader = ({ type, commentLength, imageLength, qrCodeDataUrl }) => (0, import_jsx_runtime$3.jsxs)("div", {
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
						if (parent) parent.innerHTML = "<div class=\"flex justify-start items-center h-full text-2xl font-bold text-foreground-600\">小红书</div>";
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
					type === "图文" && imageLength && (0, import_jsx_runtime$3.jsxs)("div", {
						className: "tracking-[6px] text-[45px] select-text",
						children: [
							"图片数量：",
							imageLength,
							"张"
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$3.jsx)(QRCodeSection, { qrCodeDataUrl })]
	});
	CommentItemComponent = ({ comment, isLast = false }) => (0, import_jsx_runtime$3.jsxs)("div", {
		className: `flex px-10 pt-15 ${isLast ? "pb-0" : "pb-15"}`,
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
					}), comment.show_tags && comment.show_tags.length > 0 && comment.show_tags.map((tag, index) => {
						if (tag === "is_author") return (0, import_jsx_runtime$3.jsx)("div", {
							className: "inline-block px-6 py-3 ml-3 text-4xl rounded-full bg-default-100 text-default-500",
							children: "作者"
						}, index);
						else if (tag === "user_top") return (0, import_jsx_runtime$3.jsx)("div", {
							className: "inline-block px-6 py-3 rounded-full ml-3 text-4xl bg-[#ff2e4d0f] text-[#ff2e4d]",
							children: "置顶评论"
						}, index);
						else return null;
					})]
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
						className: `py-4 ${index !== comment.sub_comments.length - 1 ? "border-b border-divider" : ""}`,
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
										}), subComment.show_tags && subComment.show_tags.length > 0 && subComment.show_tags.map((tag, tagIndex) => tag === "is_author" ? (0, import_jsx_runtime$3.jsx)("div", {
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
	});
	XiaohongshuComment = import_react$4.memo((props) => (0, import_jsx_runtime$3.jsxs)(DefaultLayout, {
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
	}));
	Comment_default = XiaohongshuComment;
});
var Help_exports = __export({
	Help: () => Help,
	default: () => Help_default
});
function iconForItem(icon) {
	const byIcon = icon && ICON_MAP[icon];
	if (byIcon) return byIcon;
	return CircleQuestionMark;
}
var import_react$3, import_jsx_runtime$2, ICON_MAP, MenuItemComponent, MenuGroupComponent, Help, Help_default;
var init_Help = __esmMin(() => {
	init_lucide_react();
	import_react$3 = __toESM(require_react());
	init_GlowImage();
	init_DefaultLayout();
	import_jsx_runtime$2 = __toESM(require_jsx_runtime());
	ICON_MAP = {
		Link,
		Sparkles,
		Send,
		List,
		Bell,
		LogIn,
		Bot,
		RefreshCw
	};
	MenuItemComponent = ({ item }) => (0, import_jsx_runtime$2.jsx)(SmartGlowBorder, {
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
	});
	MenuGroupComponent = ({ group, startIndex }) => {
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
	};
	Help = import_react$3.memo((props) => {
		const title = props.data?.title || "KKK插件帮助页面";
		const menuData = props.data?.menu || [];
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
						globalIndex += group.items.length + (group.subGroups?.reduce((sum, sub) => sum + sub.items.length, 0) || 0);
						return (0, import_jsx_runtime$2.jsx)(MenuGroupComponent, {
							group,
							startIndex
						}, index);
					})
				})
			]
		});
	});
	Help.displayName = "Help";
	Help_default = Help;
});
var PLATFORM_CONFIG;
var init_handlerError$1 = __esmMin(() => {
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
});
var handlerError_exports = __export({
	default: () => handlerError_default,
	handlerError: () => handlerError
});
var import_react$2, import_jsx_runtime$1, seededRandom, generateBugPositions, parseAnsiColors, ErrorHeader, BusinessErrorDetails, handlerError, handlerError_default;
var init_handlerError = __esmMin(() => {
	init_lucide_react();
	import_react$2 = __toESM(require_react());
	init_fa6();
	init_handlerError$1();
	init_DefaultLayout();
	import_jsx_runtime$1 = __toESM(require_jsx_runtime());
	seededRandom = (seed) => {
		let value = seed;
		return () => {
			value = (value * 9301 + 49297) % 233280;
			return value / 233280;
		};
	};
	generateBugPositions = (count) => {
		const random = seededRandom(Date.now() + Math.random() * 1e4);
		const positions = [];
		for (let i = 0; i < count; i++) positions.push({
			top: `${random() * 100}%`,
			left: `${random() * 100}%`,
			size: 50 + random() * 30,
			rotation: random() * 360 - 180,
			opacity: 10 + random() * 10
		});
		return positions;
	};
	parseAnsiColors = (text) => {
		const colorMap = {
			30: "#000000",
			31: "#f31260",
			32: "#17c964",
			33: "#f5a524",
			34: "#006FEE",
			35: "#7828c8",
			36: "#45d4ff",
			37: "#d4d4d8",
			90: "#a1a1aa",
			91: "#ff6090",
			92: "#7ee7b7",
			93: "#fbbf24",
			94: "#3b9eff",
			95: "#a855f7",
			96: "#67e8f9",
			97: "#f4f4f5"
		};
		const ansiRegex = /\u001b\[(\d+)m/g;
		const parts = [];
		let lastIndex = 0;
		let currentColor = "";
		let match;
		while ((match = ansiRegex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				const formattedText = text.slice(lastIndex, match.index).replace(/\\n/g, "\n");
				if (currentColor) parts.push((0, import_jsx_runtime$1.jsx)("span", {
					style: { color: currentColor },
					children: formattedText
				}, `${lastIndex}-${match.index}`));
				else parts.push(formattedText);
			}
			const colorCode = match[1];
			if (colorCode === "39" || colorCode === "0") currentColor = "";
			else if (colorMap[colorCode]) currentColor = colorMap[colorCode];
			lastIndex = ansiRegex.lastIndex;
		}
		if (lastIndex < text.length) {
			const formattedText = text.slice(lastIndex).replace(/\\n/g, "\n");
			if (currentColor) parts.push((0, import_jsx_runtime$1.jsx)("span", {
				style: { color: currentColor },
				children: formattedText
			}, `${lastIndex}-end`));
			else parts.push(formattedText);
		}
		return parts.length > 0 ? parts : [text.replace(/\\n/g, "\n")];
	};
	ErrorHeader = ({ platform, method, timestamp, businessName }) => {
		const platformConfig = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.unknown;
		return (0, import_jsx_runtime$1.jsx)("div", {
			className: "w-full max-w-[1440px] mx-auto px-20 py-20",
			children: (0, import_jsx_runtime$1.jsx)("div", {
				className: "border-l-4 border-danger pl-12",
				children: (0, import_jsx_runtime$1.jsxs)("div", {
					className: "flex items-start gap-6 mb-10",
					children: [(0, import_jsx_runtime$1.jsx)(CircleAlert, { className: "w-16 h-16 text-danger mt-2" }), (0, import_jsx_runtime$1.jsxs)("div", {
						className: "flex-1",
						children: [
							(0, import_jsx_runtime$1.jsx)("h1", {
								className: "text-8xl font-bold text-foreground mb-6",
								children: "执行失败"
							}),
							(0, import_jsx_runtime$1.jsxs)("div", {
								className: "flex items-center gap-4 mb-4",
								children: [
									(0, import_jsx_runtime$1.jsx)("span", {
										className: "text-5xl font-semibold text-danger",
										children: businessName || method
									}),
									(0, import_jsx_runtime$1.jsx)("span", {
										className: "text-3xl text-default-400",
										children: "·"
									}),
									(0, import_jsx_runtime$1.jsx)("span", {
										className: "text-3xl text-default-500",
										children: platformConfig.displayName
									})
								]
							}),
							(0, import_jsx_runtime$1.jsxs)("div", {
								className: "flex items-center gap-3 text-default-400",
								children: [(0, import_jsx_runtime$1.jsx)(Clock, { className: "w-8 h-8" }), (0, import_jsx_runtime$1.jsx)("span", {
									className: "text-3xl font-medium",
									children: new Date(timestamp).toLocaleString("zh-CN", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										second: "2-digit",
										hour12: false
									})
								})]
							})
						]
					})]
				})
			})
		});
	};
	BusinessErrorDetails = ({ error, logs, triggerCommand }) => (0, import_jsx_runtime$1.jsx)("div", {
		className: "w-full max-w-[1440px] mx-auto px-20 py-8",
		children: (0, import_jsx_runtime$1.jsxs)("div", {
			className: "space-y-12",
			children: [
				triggerCommand && (0, import_jsx_runtime$1.jsxs)("div", {
					className: "border-l-2 border-default-200 pl-8",
					children: [(0, import_jsx_runtime$1.jsxs)("h3", {
						className: "flex items-center gap-3 mb-8 text-4xl font-medium text-foreground",
						children: [(0, import_jsx_runtime$1.jsx)(Terminal, { className: "w-10 h-10" }), "触发命令"]
					}), (0, import_jsx_runtime$1.jsx)("div", {
						className: "font-bold p-10 rounded-lg",
						children: (0, import_jsx_runtime$1.jsx)("pre", {
							className: "text-3xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground font-mono",
							children: triggerCommand
						})
					})]
				}),
				(0, import_jsx_runtime$1.jsxs)("div", {
					className: "border-l-2 border-danger pl-8",
					children: [(0, import_jsx_runtime$1.jsxs)("h3", {
						className: "flex items-center gap-3 mb-6 text-3xl font-medium text-foreground",
						children: [(0, import_jsx_runtime$1.jsx)(CircleAlert, { className: "w-8 h-8" }), "错误堆栈"]
					}), (0, import_jsx_runtime$1.jsx)("div", {
						className: "bg-danger/5 p-8 rounded-lg border border-danger/20",
						children: (0, import_jsx_runtime$1.jsx)("pre", {
							className: "text-xl leading-relaxed whitespace-pre-wrap break-all select-text text-danger-700 font-mono",
							children: String(error.stack || "")
						})
					})]
				}),
				logs && (typeof logs === "string" ? logs.length > 0 : logs.length > 0) && (0, import_jsx_runtime$1.jsxs)("div", {
					className: "border-l-2 border-default-200 pl-8",
					children: [(0, import_jsx_runtime$1.jsxs)("h3", {
						className: "flex items-center gap-3 mb-6 text-3xl font-medium text-foreground",
						children: [(0, import_jsx_runtime$1.jsx)(FileText, { className: "w-8 h-8" }), "执行日志"]
					}), (0, import_jsx_runtime$1.jsx)("div", {
						className: "p-8 rounded-lg border border-default-200",
						children: (0, import_jsx_runtime$1.jsx)("div", {
							className: "space-y-4",
							children: typeof logs === "string" ? logs.split("\n\n").map((logSection, index) => {
								const parsedLog = parseAnsiColors(logSection);
								return (0, import_jsx_runtime$1.jsx)("div", {
									className: "font-mono text-xl leading-relaxed whitespace-pre-wrap break-all select-text",
									children: parsedLog.length > 0 ? parsedLog : logSection
								}, index);
							}) : logs.map((log, index) => {
								const parsedLog = parseAnsiColors(log);
								return (0, import_jsx_runtime$1.jsx)("div", {
									className: "font-mono text-xl leading-relaxed whitespace-pre-wrap break-all select-text",
									children: parsedLog.length > 0 ? parsedLog : log
								}, index);
							})
						})
					})]
				})
			]
		})
	});
	handlerError = (props) => {
		const { data } = props;
		const { type, platform, error, method, timestamp, logs, triggerCommand, frameworkVersion, pluginVersion } = data;
		const businessError = type === "business_error" ? error : null;
		const bugPositions = import_react$2.useMemo(() => generateBugPositions(25), []);
		return (0, import_jsx_runtime$1.jsxs)(DefaultLayout, {
			...props,
			children: [(0, import_jsx_runtime$1.jsxs)("div", {
				className: "fixed inset-0 overflow-hidden pointer-events-none",
				style: { zIndex: 0 },
				children: [(0, import_jsx_runtime$1.jsx)(FaBug, {
					className: "absolute text-danger/10",
					style: {
						width: "50vw",
						height: "50vw",
						top: "10%",
						left: "50%",
						transform: "translateX(-50%) rotate(45deg)"
					}
				}), bugPositions.map((pos, index) => (0, import_jsx_runtime$1.jsx)(FaBug, {
					className: "absolute",
					style: {
						width: `${pos.size}px`,
						height: `${pos.size}px`,
						top: pos.top,
						left: pos.left,
						transform: `rotate(${pos.rotation}deg)`,
						color: `rgba(243, 18, 96, ${pos.opacity / 100})`
					}
				}, index))]
			}), (0, import_jsx_runtime$1.jsxs)("div", {
				className: "relative",
				style: { zIndex: 1 },
				children: [
					(0, import_jsx_runtime$1.jsx)("div", { className: "h-[60px]" }),
					(0, import_jsx_runtime$1.jsx)(ErrorHeader, {
						type,
						platform,
						method,
						timestamp,
						businessName: businessError?.businessName
					}),
					(0, import_jsx_runtime$1.jsx)(BusinessErrorDetails, {
						error: businessError,
						logs,
						triggerCommand
					}),
					(0, import_jsx_runtime$1.jsxs)("div", {
						className: "w-full max-w-[1440px] mx-auto px-20 py-16 space-y-8",
						children: [(0, import_jsx_runtime$1.jsxs)("div", {
							className: "flex items-center gap-8 text-default-400 text-3xl",
							children: [
								(0, import_jsx_runtime$1.jsxs)("span", { children: ["框架版本：", (0, import_jsx_runtime$1.jsx)("span", {
									className: "font-bold text-foreground",
									children: frameworkVersion
								})] }),
								(0, import_jsx_runtime$1.jsx)("span", { children: "·" }),
								(0, import_jsx_runtime$1.jsxs)("span", { children: ["插件版本：", (0, import_jsx_runtime$1.jsx)("span", {
									className: "font-bold text-foreground",
									children: pluginVersion
								})] })
							]
						}), (0, import_jsx_runtime$1.jsxs)("div", {
							className: "border-l-2 border-primary pl-8",
							children: [(0, import_jsx_runtime$1.jsxs)("p", {
								className: "text-3xl text-default-600 leading-relaxed",
								children: [
									"遇到问题了？请将",
									(0, import_jsx_runtime$1.jsx)("span", {
										className: "text-primary font-semibold",
										children: "完整的错误截图"
									}),
									"发送给开发者，这将帮助我们快速定位并解决问题。您可以通过以下方式联系："
								]
							}), (0, import_jsx_runtime$1.jsxs)("div", {
								className: "mt-6 space-y-3",
								children: [(0, import_jsx_runtime$1.jsxs)("p", {
									className: "text-3xl text-default-500",
									children: ["· 提交 ", (0, import_jsx_runtime$1.jsx)("span", {
										className: "text-primary font-semibold",
										children: "GitHub Issues"
									})]
								}), (0, import_jsx_runtime$1.jsxs)("p", {
									className: "text-3xl text-default-500",
									children: ["· 加入 QQ 群：", (0, import_jsx_runtime$1.jsx)("span", {
										className: "text-primary font-semibold font-mono",
										children: "795874649"
									})]
								})]
							})]
						})]
					})
				]
			})]
		});
	};
	handlerError.displayName = "handlerError";
	handlerError_default = handlerError;
});
var changelog_exports = __export({
	Changelog: () => Changelog,
	default: () => changelog_default
});
var import_react$1, import_jsx_runtime, Changelog, changelog_default;
var init_changelog = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$1 = __toESM(require_react());
	init_react_markdown();
	init_rehype_highlight();
	init_rehype_raw();
	init_remark_breaks();
	init_remark_gfm();
	init_GlowImage();
	init_DefaultLayout();
	import_jsx_runtime = __toESM(require_jsx_runtime());
	Changelog = import_react$1.memo((props) => (0, import_jsx_runtime.jsx)(DefaultLayout, {
		...props,
		style: {
			backgroundImage: `\n          linear-gradient(to right, rgb(163 163 163 / 0.1) 2px, transparent 2px),\n          linear-gradient(to bottom, rgb(163 163 163 / 0.1) 2px, transparent 2px)\n        `,
			backgroundSize: "60px 60px"
		},
		children: (0, import_jsx_runtime.jsxs)("div", {
			className: "relative px-20 pt-5 pb-0 w-full max-w-none prose prose-lg prose-invert from-default-50 to-default-100",
			children: [
				props.data.Tip && (0, import_jsx_runtime.jsxs)("div", {
					className: "inline-block relative mt-20",
					children: [(0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black rounded-2xl opacity-50 blur-xl translate-y-6 -z-10" }), (0, import_jsx_runtime.jsx)("img", {
						className: "block relative rounded-2xl",
						src: "/image/banner.webp",
						alt: "横幅"
					})]
				}),
				props.data.Tip && (0, import_jsx_runtime.jsxs)("div", {
					className: "pb-10 mt-20 text-5xl leading-relaxed text-center",
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
				}),
				(0, import_jsx_runtime.jsx)(Markdown, {
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
									children: typeof children === "string" ? children : "H2"
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
				})
			]
		})
	}));
	Changelog.displayName = "Changelog";
	changelog_default = Changelog;
});
function createComponentConfig(baseConfig, extensions = {}) {
	return {
		...baseConfig,
		...extensions
	};
}
var componentConfigs;
var init_config = __esmMin(() => {
	init_platforms();
	init_config_base();
	componentConfigs = baseComponentConfigs.map((basePlatform) => {
		const platform = {
			...basePlatform,
			components: []
		};
		switch (basePlatform.type) {
			case PlatformType.DOUYIN:
				platform.components = basePlatform.components.map((baseComponent) => {
					switch (baseComponent.id) {
						case "comment": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_Comment$3(), Comment_exports$3)).then((module) => ({ default: module.DouyinComment }))
						});
						case "dynamic": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_Dynamic(), Dynamic_exports)).then((module) => ({ default: module.DouyinDynamic }))
						});
						case "live": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_Live(), Live_exports)).then((module) => ({ default: module.DouyinLive }))
						});
						case "musicinfo": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_MusicInfo(), MusicInfo_exports)).then((module) => ({ default: module.DouyinMusicInfo }))
						});
						case "user_profile": return createComponentConfig(baseComponent, { validateData: (data) => data && typeof data.share_url === "string" });
						case "userlist": return createComponentConfig(baseComponent, {
							validateData: (data) => data && Array.isArray(data.renderOpt),
							lazyComponent: () => Promise.resolve().then(() => (init_UserList$1(), UserList_exports$1)).then((module) => ({ default: module.default }))
						});
						case "videoInfo": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_videoInfo$1(), videoInfo_exports$1)).then((module) => ({ default: module.DouyinVideoInfo })) });
						case "qrcodeImg": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_qrcodeImg$1(), qrcodeImg_exports$1)).then((module) => ({ default: module.DouyinQrcodeImg })) });
						default: return createComponentConfig(baseComponent);
					}
				});
				break;
			case PlatformType.BILIBILI:
				platform.components = basePlatform.components.map((baseComponent) => {
					switch (baseComponent.id) {
						case "comment": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_Comment$2(), Comment_exports$2)).then((module) => ({ default: module.BilibiliComment }))
						});
						case "userlist": return createComponentConfig(baseComponent, {
							validateData: (data) => data && Array.isArray(data.renderOpt),
							lazyComponent: () => Promise.resolve().then(() => (init_UserList(), UserList_exports)).then((module) => ({ default: module.default }))
						});
						case "bangumi": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_bangumi(), bangumi_exports)).then((module) => ({ default: module.default })) });
						case "dynamic/DYNAMIC_TYPE_DRAW": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_DRAW(), DYNAMIC_TYPE_DRAW_exports)).then((module) => ({ default: module.BilibiliDrawDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_AV": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_AV(), DYNAMIC_TYPE_AV_exports)).then((module) => ({ default: module.BilibiliVideoDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_FORWARD": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_FORWARD(), DYNAMIC_TYPE_FORWARD_exports)).then((module) => ({ default: module.BilibiliForwardDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_LIVE_RCMD": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_LIVE_RCMD(), DYNAMIC_TYPE_LIVE_RCMD_exports)).then((module) => ({ default: module.BilibiliLiveDynamic }))
						});
						case "dynamic/DYNAMIC_TYPE_WORD": return createComponentConfig(baseComponent, { validateData: (data) => data && typeof data.share_url === "string" });
						case "dynamic/DYNAMIC_TYPE_ARTICLE": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_ARTICLE(), DYNAMIC_TYPE_ARTICLE_exports)).then((module) => ({ default: module.BilibiliArticleDynamic })) });
						case "videoInfo": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_videoInfo(), videoInfo_exports)).then((module) => ({ default: module.BilibiliVideoInfo }))
						});
						case "qrcodeImg": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_qrcodeImg(), qrcodeImg_exports)).then((module) => ({ default: module.BilibiliQrcodeImg }))
						});
						default: return createComponentConfig(baseComponent);
					}
				});
				break;
			case PlatformType.KUAISHOU:
				platform.components = basePlatform.components.map((baseComponent) => {
					switch (baseComponent.id) {
						case "comment": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_Comment$1(), Comment_exports$1)).then((module) => ({ default: module.KuaishouComment }))
						});
						default: return createComponentConfig(baseComponent);
					}
				});
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
});
var LogLevel, getLogLevel, shouldEnableCallStack, shouldEnableColors, CustomLogger, logger;
var init_logger = __esmMin(() => {
	init_chalk();
	LogLevel = function(LogLevel$1) {
		LogLevel$1[LogLevel$1["DEBUG"] = 0] = "DEBUG";
		LogLevel$1[LogLevel$1["INFO"] = 1] = "INFO";
		LogLevel$1[LogLevel$1["WARN"] = 2] = "WARN";
		LogLevel$1[LogLevel$1["ERROR"] = 3] = "ERROR";
		LogLevel$1[LogLevel$1["MARK"] = 4] = "MARK";
		return LogLevel$1;
	}(LogLevel || {});
	getLogLevel = () => {
		switch ((process.env.LOG_LEVEL || "info").toLowerCase()) {
			case "debug": return LogLevel.DEBUG;
			case "info": return LogLevel.INFO;
			case "warn": return LogLevel.WARN;
			case "error": return LogLevel.ERROR;
			case "mark": return LogLevel.MARK;
			default: return LogLevel.INFO;
		}
	};
	shouldEnableCallStack = () => {
		if (process.env.ENABLE_CALL_STACK !== void 0) return process.env.ENABLE_CALL_STACK === "true";
		if (process.env.NODE_ENV === "development") return true;
		if (process.env.RUNTIME === "tsx") return true;
		try {
			const stack = (/* @__PURE__ */ new Error()).stack;
			if (stack) {
				if (stack.split("\n").some((line) => line && !line.includes("node_modules") && (line.includes(".ts:") || line.includes(".js:")) && !line.includes("at Error") && !line.includes("at shouldEnableCallStack"))) return true;
			}
		} catch {}
		return false;
	};
	shouldEnableColors = () => {
		if (process.env.FORCE_COLOR !== void 0) return process.env.FORCE_COLOR !== "0";
		if (process.stdout && process.stdout.isTTY) return true;
		if (process.env.CI || process.env.GITHUB_ACTIONS || process.env.GITLAB_CI) return false;
		return true;
	};
	CustomLogger = class {
		constructor() {
			this.enableCallStack = shouldEnableCallStack();
			this.enableColors = shouldEnableColors();
			this.chalk = new Chalk({ level: this.enableColors ? 3 : 0 });
			this.red = this.chalk.red;
			this.green = this.chalk.green;
			this.yellow = this.chalk.yellow;
			this.blue = this.chalk.blue;
			this.magenta = this.chalk.magenta;
			this.cyan = this.chalk.cyan;
			this.white = this.chalk.white;
			this.gray = this.chalk.gray;
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
					if (!line) continue;
					if (line.includes("getCallSite") || line.includes("CustomLogger.log") || line.includes("CustomLogger.debug") || line.includes("CustomLogger.info") || line.includes("CustomLogger.warn") || line.includes("CustomLogger.error") || line.includes("CustomLogger.mark")) continue;
					if (!line.includes("node_modules")) {
						targetLine = line;
						break;
					} else if (!targetLine && line.includes("node_modules")) targetLine = line;
				}
				if (!targetLine) return "";
				let match = targetLine.match(/at .+? \((.+?):(\d+):\d+\)/) || targetLine.match(/at (.+?):(\d+):\d+/);
				if (!match) return "";
				let fileName = match[1];
				const lineNumber = match[2];
				if (fileName.startsWith("file:///")) {
					fileName = fileName.replace("file:///", "");
					if (process.platform === "win32") fileName = fileName.replace(/\//g, "\\");
				} else if (fileName.startsWith("file://")) fileName = fileName.replace("file://", "");
				let relativePath = "";
				if (fileName.includes("node_modules")) {
					const nodeModulesMatch = fileName.match(/node_modules[\\\/]([^\\\/]+)[\\\/](.+)/);
					if (nodeModulesMatch) {
						const packageName = nodeModulesMatch[1];
						const packagePath = nodeModulesMatch[2];
						if (packageName === "karin-plugin-kkk" || packageName.startsWith("@")) relativePath = `${packageName}/${packagePath}`;
						else relativePath = `node_modules/${packageName}/${packagePath}`;
					} else relativePath = path.basename(fileName);
				} else {
					let currentDir = fileName;
					let monorepoRoot = "";
					while (currentDir !== path.dirname(currentDir)) {
						currentDir = path.dirname(currentDir);
						try {
							if (fs.existsSync(path.join(currentDir, "pnpm-workspace.yaml")) || fs.existsSync(path.join(currentDir, "lerna.json")) || fs.existsSync(path.join(currentDir, "rush.json")) || fs.existsSync(path.join(currentDir, "package.json"))) {
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
						if (packagesMatch) relativePath = `packages/${packagesMatch[1]}`;
						else relativePath = path.relative(process.cwd(), fileName);
					}
				}
				relativePath = relativePath.replace(/\\/g, "/");
				if (relativePath.length > 60) {
					const parts = relativePath.split("/");
					if (parts.length > 2) relativePath = `.../${parts.slice(-2).join("/")}`;
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
			const timestamp = this.formatTimestamp();
			const formattedLevel = levelStr.padEnd(4);
			const callSite = this.getCallSite();
			const basePrefix = `[kkk/template][${timestamp}][${formattedLevel}]`;
			const prefix = (this.enableColors ? color(basePrefix) : basePrefix) + (callSite ? ` ${this.enableColors ? this.gray(callSite) : callSite}` : "");
			switch (level) {
				case LogLevel.ERROR:
					console.error(prefix, message, ...args);
					break;
				case LogLevel.WARN:
					console.warn(prefix, message, ...args);
					break;
				default:
					console.log(prefix, message, ...args);
					break;
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
	};
	logger = new CustomLogger();
});
var ComponentAutoRegistry;
var init_ComponentAutoRegistry = __esmMin(() => {
	init_config();
	init_logger();
	ComponentAutoRegistry = class {
		static {
			this.components = /* @__PURE__ */ new Map();
		}
		static {
			this.initialized = false;
		}
		static async initialize() {
			if (this.initialized) return;
			const cwd = process.cwd();
			logger.debug("当前环境: NODE_ENV =", process.env.NODE_ENV || "production");
			logger.debug("当前工作目录:", cwd);
			logger.debug("开始自动注册组件...");
			for (const platformConfig of componentConfigs) await this.registerPlatformComponents(platformConfig);
			this.initialized = true;
			logger.debug(`✅ 组件自动注册完成，共注册 ${this.components.size} 个组件`);
			logger.debug(`📦 已注册组件: ${Array.from(this.components.keys()).join(", ")}`);
		}
		static async registerPlatformComponents(platformConfig) {
			for (const componentConfig of platformConfig.components) {
				if (!componentConfig.enabled) {
					logger.debug(`⏭️ 跳过未启用组件: ${platformConfig.type}:${componentConfig.id}`);
					continue;
				}
				try {
					await this.registerComponent(platformConfig.type, componentConfig);
				} catch (error) {
					logger.error(`❌ 注册组件失败: ${platformConfig.type}:${componentConfig.id}`, error);
				}
			}
		}
		static async registerComponent(platform, componentConfig) {
			const key = `${platform}:${componentConfig.id}`;
			if (componentConfig.lazyComponent) try {
				const module = await componentConfig.lazyComponent();
				this.components.set(key, {
					component: module.default,
					validateData: componentConfig.validateData,
					config: componentConfig
				});
				logger.debug(`📝 注册懒加载组件: ${key}`);
			} catch (error) {
				logger.error(`❌ 懒加载组件失败: ${key}`, error);
			}
			else try {
				const modulePath = `../components/${componentConfig.componentPath}`;
				const component = (await import(modulePath))[componentConfig.exportName];
				if (!component) throw new Error(`组件 ${componentConfig.exportName} 未在模块 ${modulePath} 中找到`);
				this.components.set(key, {
					component,
					validateData: componentConfig.validateData,
					config: componentConfig
				});
				logger.debug(`📝 注册动态导入组件: ${key}`);
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
			this.components.clear();
			this.initialized = false;
			await this.initialize();
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
});
var import_react, import_server_node, PluginContainer, ComponentRendererFactory, ResourcePathManager, HtmlWrapper, SSRRender, reactServerRender;
var init_main = __esmMin(() => {
	import_react = __toESM(require_react());
	import_server_node = __toESM(require_server_node());
	init_ComponentAutoRegistry();
	init_logger();
	PluginContainer = class {
		constructor(plugins) {
			this.plugins = [];
			const order = {
				pre: -1,
				normal: 0,
				post: 1
			};
			this.plugins = [...plugins].sort((a, b) => order[a.enforce ?? "normal"] - order[b.enforce ?? "normal"]);
		}
		shouldApply(plugin, request) {
			try {
				return plugin.apply ? plugin.apply(request) : true;
			} catch (err) {
				logger.warn(`插件 ${plugin.name} 的 apply() 抛出异常，已跳过`, err);
				return false;
			}
		}
		async runBefore(ctx) {
			for (const plugin of this.plugins) if (this.shouldApply(plugin, ctx.request)) await plugin.beforeRender?.(ctx);
		}
		async runDuring(ctx) {
			for (const plugin of this.plugins) if (this.shouldApply(plugin, ctx.request)) await plugin.render?.(ctx);
		}
		async runAfter(ctx) {
			for (const plugin of this.plugins) if (this.shouldApply(plugin, ctx.request)) await plugin.afterRender?.(ctx);
		}
	};
	ComponentRendererFactory = class {
		static async createComponent(request, extraProps = {}) {
			const { templateType, templateName } = request;
			const registryItem = ComponentAutoRegistry.get(templateType, templateName);
			if (!registryItem) throw new Error(`未找到组件配置: ${templateType}:${templateName}`);
			if (registryItem.validateData && !registryItem.validateData(request.data)) throw new Error(`数据验证失败: ${templateType}:${templateName}`);
			const props = {
				data: request.data,
				version: request.version,
				scale: request.scale,
				...extraProps
			};
			if (templateName.includes("/")) props.subType = templateName.split("/")[1];
			return import_react.createElement(registryItem.component, props);
		}
	};
	ResourcePathManager = class {
		constructor() {
			this.NODE_ENV = process.env.NODE_ENV || "production";
			this.packageDir = this.getPackageDir();
		}
		getPackageDir() {
			const cwd = process.cwd();
			switch (this.NODE_ENV) {
				case "development": return this.findDevelopmentDir(cwd);
				case "production":
				default: return this.getPackageDirFromImportMeta();
			}
		}
		findDevelopmentDir(cwd) {
			let currentDir = cwd;
			while (currentDir !== path.dirname(currentDir)) {
				const renderDir = path.join(currentDir, "render");
				if (fs.existsSync(renderDir)) {
					logger.debug("开发模式：找到 render 目录:", renderDir);
					return currentDir;
				}
				currentDir = path.dirname(currentDir);
			}
			return path.join(path.dirname(cwd), "render");
		}
		getPackageDirFromImportMeta() {
			try {
				const currentModuleUrl = import.meta.url;
				const currentModulePath = new URL(currentModuleUrl).pathname;
				const normalizedPath = process.platform === "win32" ? currentModulePath.slice(1) : currentModulePath;
				const pluginDir = this.extractPluginDirFromPnpmPath(normalizedPath);
				if (pluginDir) {
					logger.debug("从 pnpm 路径提取的插件目录:", pluginDir);
					return pluginDir;
				}
				const fallbackDir = this.findPluginDirByScanning();
				if (fallbackDir) {
					logger.debug("通过扫描找到的插件目录:", fallbackDir);
					return fallbackDir;
				}
				logger.debug(logger.yellow("无法找到插件目录，使用当前项目工作目录"));
				return process.cwd();
			} catch (error) {
				logger.error("获取 import.meta.url 失败:", error);
				return process.cwd();
			}
		}
		extractPluginDirFromPnpmPath(pnpmPath) {
			const pnpmIndex = pnpmPath.indexOf(".pnpm");
			if (pnpmIndex === -1) return null;
			const projectRoot = pnpmPath.substring(0, pnpmIndex - 14);
			logger.debug("从 pnpm 路径提取的项目根目录:", projectRoot);
			const pluginsDir = path.join(projectRoot, "plugins");
			if (!fs.existsSync(pluginsDir)) {
				logger.debug("plugins 目录不存在:", pluginsDir);
				return null;
			}
			return this.findKarinPluginInDir(pluginsDir);
		}
		findPluginDirByScanning() {
			const cwd = process.cwd();
			const pluginsDir = path.join(cwd, "plugins");
			if (!fs.existsSync(pluginsDir)) {
				logger.debug("当前工作目录下没有 plugins 目录");
				return null;
			}
			return this.findKarinPluginInDir(pluginsDir);
		}
		findKarinPluginInDir(pluginsDir) {
			try {
				const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());
				for (const pluginDir of pluginDirs) {
					const pluginPath = path.join(pluginsDir, pluginDir.name);
					const karinPluginPath = path.join(pluginPath, "node_modules", "karin-plugin-kkk");
					if (fs.existsSync(karinPluginPath)) {
						logger.debug("找到包含 karin-plugin-kkk 的插件目录:", pluginPath);
						return pluginPath;
					}
				}
			} catch (error) {
				logger.debug("扫描插件目录失败:", error);
			}
			return null;
		}
		isPluginMode() {
			const hasPluginsInPath = this.packageDir.includes("plugins");
			const pluginResourcesExists = fs.existsSync(path.join(this.packageDir, "resources"));
			const npmPackageExists = fs.existsSync(path.join(this.packageDir, "node_modules", "karin-plugin-kkk"));
			return hasPluginsInPath && pluginResourcesExists && npmPackageExists;
		}
		getResourcePaths() {
			switch (this.NODE_ENV) {
				case "development": return {
					cssDir: path.join(path.dirname(this.packageDir), "core", "lib"),
					imageDir: path.join(path.dirname(this.packageDir), "core/resources/image")
				};
				case "production":
				default: if (this.isPluginMode()) return {
					cssDir: fs.existsSync(path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib")) ? path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib") : path.join(this.packageDir, "lib"),
					imageDir: path.join(this.packageDir, "resources", "image")
				};
				else return {
					cssDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib"),
					imageDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "resources", "image")
				};
			}
		}
	};
	HtmlWrapper = class {
		constructor(resourceManager) {
			this.resourceManager = resourceManager;
		}
		wrapContent(htmlContent, htmlFilePath, isDark = false) {
			const htmlDir = path.dirname(htmlFilePath);
			const { cssDir, imageDir } = this.resourceManager.getResourcePaths();
			const cssRelativePath = path.relative(htmlDir, cssDir).replace(/\\/g, "/");
			const imageRelativePath = path.relative(htmlDir, imageDir).replace(/\\/g, "/");
			const cssUrl = path.join(cssRelativePath, "karin-plugin-kkk.css").replace(/\\/g, "/");
			const processedHtml = htmlContent.replace(/src="\/image\//g, `src="${imageRelativePath}/`);
			return `\n    <!DOCTYPE html>\n    <html lang="zh-CN">\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width">\n      <link rel="stylesheet" href="${cssUrl}">\n    </head>\n    <body class="${isDark ? "dark" : ""}">\n      ${processedHtml}\n    </body>\n    </html>\n    `;
		}
	};
	SSRRender = class {
		constructor(plugins = []) {
			this.cssContent = "";
			this.resourceManager = new ResourcePathManager();
			this.htmlWrapper = new HtmlWrapper(this.resourceManager);
			this.outputDir = "";
			this.pluginContainer = new PluginContainer(plugins);
			this.loadCssContent();
		}
		loadCssContent() {
			try {
				const { cssDir } = this.resourceManager.getResourcePaths();
				const cssPath = path.join(cssDir, "karin-plugin-kkk.css");
				if (fs.existsSync(cssPath)) this.cssContent = fs.readFileSync(cssPath, "utf-8");
				else {
					logger.warn("⚠️ CSS文件未找到:", cssPath);
					const fallbackPath = path.join(this.resourceManager["packageDir"], "dist/css/main.css");
					if (fs.existsSync(fallbackPath)) {
						this.cssContent = fs.readFileSync(fallbackPath, "utf-8");
						logger.debug("✅ 从后备路径加载CSS:", fallbackPath);
					}
				}
			} catch (error) {
				logger.error("❌ 加载CSS内容失败:", error);
			}
		}
		async renderComponent(request) {
			try {
				logger.debug("[SSR]开始渲染组件，预设模板:", `${logger.yellow(`${request.templateType}/`)}${request.templateName}`);
				const ctx = {
					request,
					outputDir: this.outputDir,
					resourceManager: this.resourceManager,
					state: {
						props: {},
						component: null
					}
				};
				await this.pluginContainer.runBefore(ctx);
				let component = await ComponentRendererFactory.createComponent(request, ctx.state.props);
				ctx.state.component = component;
				await this.pluginContainer.runDuring(ctx);
				const htmlContent = (0, import_server_node.renderToStaticMarkup)(ctx.state.component ?? component);
				ctx.state.html = htmlContent;
				await this.pluginContainer.runAfter(ctx);
				const safeTemplateName = request.templateName.replace(/\//g, "_");
				const fileName = `${request.templateType}_${safeTemplateName}_${Date.now()}.html`;
				const filePath = path.join(this.outputDir, fileName);
				const fullHtml = this.htmlWrapper.wrapContent(ctx.state.html ?? htmlContent, filePath, request.data.useDarkTheme ?? false);
				fs.writeFileSync(filePath, fullHtml, "utf-8");
				return {
					success: true,
					htmlPath: filePath
				};
			} catch (error) {
				logger.error("❌ 渲染组件失败:", error);
				return {
					success: false,
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
			logger.debug(`📁 HTML输出目录: ${this.outputDir}`);
			logger.debug(`🎨 CSS文件状态: ${this.cssContent ? "已加载" : "未加载"}`);
			logger.debug(`📦 已注册组件总数: ${stats.total}`);
			logger.debug("📊 各平台组件数量:", stats.byPlatform);
			logger.debug(`🔧 已注册组件: ${ComponentAutoRegistry.getAllKeys().join(", ")}`);
		}
		async render(request) {
			return this.renderComponent(request);
		}
	};
	reactServerRender = async (options) => {
		const { request, outputDir, plugins = [] } = options;
		if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
		await ComponentAutoRegistry.initialize();
		const tempServer = new SSRRender(plugins);
		tempServer["outputDir"] = outputDir;
		return await tempServer.render(request);
	};
});
var init_types = __esmMin(() => {});
var init_client = __esmMin(() => {
	init_main$1();
	init_main();
	init_main();
	init_types();
});
init_client();
init_client();
var template_default = reactServerRender;
export { init_client as n, reactServerRender as r, template_default as t };
