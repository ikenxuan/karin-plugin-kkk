import { n as __esmMin, o as __toESM, r as __export } from "./rolldown-runtime-BMXAG3ag.js";
import { $ as init_date_fns, $t as BookOpen, A as RiHeart2Line, At as Play, B as RiRobot2Fill, Bt as Eye, C as init_ai, Ct as ShieldCheck, D as RiBellFill, Dt as Quote, E as RiArrowRightFill, Et as Radio, F as RiLiveLine, Ft as Heart, G as RiStarLine, Gt as Clock, H as RiShareForwardFill, Ht as Crown, I as RiLoginCircleFill, It as Hash, J as RiUserFollowLine, Jt as CircleCheckBig, K as RiThumbUpFill, Kt as CircleFadingArrowUp, L as RiMessage3Fill, Lt as Gift, M as RiHeart3Line, Mt as MessageCircle, N as RiLinkM, Nt as MapPin, O as RiGroupLine, Ot as QrCode, P as RiListCheck2, Pt as Info, Q as init_lu, Qt as Bookmark, R as RiQuestionFill, Rt as Gamepad2, S as AiFillStar, St as Shield, T as zhCN, Tt as ScanLine, U as RiSparkling2Fill, Ut as CornerDownLeft, V as RiSendPlaneFill, Vt as ExternalLink, W as RiStarFill, Wt as Coins, X as init_ri, Xt as ChartColumn, Y as RiVideoLine, Yt as CircleAlert, Z as LuFullscreen, Zt as Calendar, _ as init_hi, _t as TriangleAlert, at as code_default, b as init_fa6, bt as Star, c as init_react_markdown, ct as HeroUIProvider, d as init_md, dt as init_io5, en as Bell, f as SiBilibili, ft as init_lucide_react, g as HiOutlineMenuAlt2, gt as UserPlus, h as init_tb, ht as User, in as require_react, it as init_dist, j as RiHeart3Fill, jt as Music, k as RiHashtag, kt as Plug2, l as Markdown, lt as require_jsx_runtime, m as TbScan, mt as Users, nn as init_clsx, nt as format, o as init_rehype_highlight, ot as chip_default, p as init_si, pt as Zap, q as RiTiktokFill, qt as CircleEllipsis, rn as require_server_node, s as rehypeHighlight, st as button_default, tn as clsx_default, tt as formatDistanceToNow, u as MdAccessTime, ut as IoSearch, v as FaCodeBranch, vt as ThumbsUp, w as init_locale, wt as Share2, x as AiFillHeart, xt as Smartphone, y as FaCommentDots, yt as Terminal, z as RiRefreshLine, zt as FileText } from "./vendor-D9vwdT0t.js";
import { logger as logger$1 } from "node-karin";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
					name: "作品列表",
					description: "抖音作品列表推送模板",
					enabled: true,
					componentPath: "platforms/douyin/Dynamic",
					exportName: "DouyinDynamic"
				},
				{
					id: "favorite-list",
					name: "喜欢列表",
					description: "抖音喜欢列表推送模板",
					enabled: true,
					componentPath: "platforms/douyin/FavoriteList",
					exportName: "DouyinFavoriteList"
				},
				{
					id: "recommend-list",
					name: "推荐列表",
					description: "抖音推荐列表推送模板",
					enabled: true,
					componentPath: "platforms/douyin/RecommendList",
					exportName: "DouyinRecommendList"
				},
				{
					id: "live",
					name: "直播状态",
					description: "抖音直播状态推送模板",
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
					enabled: true,
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
					id: "dynamic/DYNAMIC_TYPE_WORD",
					name: "纯文动态",
					description: "B站纯文动态展示模板",
					enabled: true,
					componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_WORD",
					exportName: "BilibiliWordDynamic"
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
				},
				{
					id: "version_warning",
					name: "版本警告",
					description: "版本不兼容警告页面",
					enabled: true,
					componentPath: "platforms/other/VersionWarning",
					exportName: "VersionWarning"
				},
				{
					id: "qrlogin",
					name: "APP扫码登录",
					description: "APP扫码登录二维码页面",
					enabled: true,
					componentPath: "platforms/other/qrlogin",
					exportName: "QrLogin"
				}
			]
		}
	];
});
var import_react$36, import_jsx_runtime$34, GlowImage, GlowText;
var init_GlowImage = __esmMin(() => {
	import_react$36 = __toESM(require_react(), 1);
	import_jsx_runtime$34 = __toESM(require_jsx_runtime(), 1);
	GlowImage = ({ src, children, alt, className, imgClassName, mode = "blur-layer", blurRadius = 18, glowStrength = .6, scale = 1.06, shadowRadius = 28, crossOrigin }) => {
		const [shadowColor, setShadowColor] = import_react$36.useState("rgba(255,255,255,0.5)");
		import_react$36.useEffect(() => {
			if (mode !== "dominant-shadow" || !src) return;
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
		if (children) return (0, import_jsx_runtime$34.jsxs)("div", {
			className,
			style: {
				position: "relative",
				display: "inline-block"
			},
			children: [(0, import_jsx_runtime$34.jsx)("div", {
				"aria-hidden": "true",
				className: imgClassName,
				style: {
					position: "absolute",
					inset: 0,
					transform: `scale(${scale})`,
					filter: `blur(${blurRadius}px) saturate(1.2)`,
					opacity: glowStrength,
					pointerEvents: "none",
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				},
				children
			}), (0, import_jsx_runtime$34.jsx)("div", {
				className: imgClassName,
				style: { position: "relative" },
				children
			})]
		});
		if (mode === "dominant-shadow") return (0, import_jsx_runtime$34.jsx)("img", {
			src,
			alt,
			className: imgClassName,
			style: { filter: `drop-shadow(0 0 ${shadowRadius}px ${shadowColor}) drop-shadow(0 0 ${Math.round(shadowRadius * .6)}px ${shadowColor})` }
		});
		return (0, import_jsx_runtime$34.jsxs)("div", {
			className,
			style: {
				position: "relative",
				display: "inline-block"
			},
			children: [(0, import_jsx_runtime$34.jsx)("img", {
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
			}), (0, import_jsx_runtime$34.jsx)("img", {
				src,
				alt,
				className: imgClassName
			})]
		});
	};
	GlowText = ({ children, className, glowClassName, blurRadius = 12, glowStrength = .6, scale = 1.02 }) => (0, import_jsx_runtime$34.jsxs)("span", {
		className,
		style: {
			position: "relative",
			display: "inline-block"
		},
		children: [(0, import_jsx_runtime$34.jsx)("span", {
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
		}), (0, import_jsx_runtime$34.jsx)("span", { children })]
	});
}), import_jsx_runtime$33, RolldownLogo;
var init_RolldownLogo = __esmMin(() => {
	__toESM(require_react(), 1);
	import_jsx_runtime$33 = __toESM(require_jsx_runtime(), 1);
	RolldownLogo = ({ className = "w-auto h-10" }) => (0, import_jsx_runtime$33.jsxs)("svg", {
		viewBox: "0 0 177 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		children: [
			(0, import_jsx_runtime$33.jsx)("path", {
				d: "M27.21 0C33.32 0 36.53 2.57 36.53 7.5C36.53 12.43 33.32 15 27.21 15C21.1 15 17.91 12.43 17.91 7.5C17.91 2.57 21.1 0 27.21 0ZM97.57 0C103.68 0 106.89 2.57 106.89 7.5C106.89 12.43 103.68 15 97.57 15C91.46 15 88.27 12.43 88.27 7.5C88.27 2.57 91.46 0 97.57 0ZM11.33 0.25C14.65 0.25 16.53 1.97 16.53 4.99C16.53 6.73 15.7 8.02 14.42 8.76L16.6 14.75H11.31L9.8 10.05H4.97V14.75H0V0.25H11.33ZM43.41 11.13H52.09V14.75H38.44V0.25H43.41V11.13ZM58.92 11.13H67.6V14.75H53.95V0.25H58.92V11.13ZM78.71 0.25C83.75 0.25 86.63 2.53 86.63 7.5C86.63 12.47 83.73 14.75 78.69 14.75H69.6V0.25H78.71ZM114.34 10.21L116.46 2.84H122.03L124.27 10.5L126.03 0.25H130.88L127.89 14.75H121.61L119.21 6.55L116.87 14.75H110.57L107.59 0.25H112.52L114.34 10.21ZM138.78 0.25L144.76 9.68H144.81V0.25H149.53V14.75H143.56L137.53 5.28H137.47V14.75H132.77V0.25H138.78ZM27.21 3.56C24.33 3.56 22.98 4.81 22.98 7.5C22.98 10.19 24.33 11.42 27.21 11.42C30.09 11.42 31.44 10.21 31.44 7.5C31.44 4.79 30.09 3.56 27.21 3.56ZM97.57 3.56C94.69 3.56 93.34 4.81 93.34 7.5C93.34 10.19 94.69 11.42 97.57 11.42C100.45 11.42 101.8 10.21 101.8 7.5C101.8 4.79 100.45 3.56 97.57 3.56ZM74.57 11.23H78.01C80.37 11.23 81.53 10.21 81.53 7.5C81.53 4.79 80.37 3.77 78.01 3.77H74.57V11.23ZM4.97 6.63H9.92C10.94 6.63 11.44 6.09 11.44 5.14C11.44 4.18 10.94 3.67 9.92 3.67H4.97V6.63Z",
				fill: "currentColor"
			}),
			(0, import_jsx_runtime$33.jsx)("path", {
				d: "M170.23 0.25C170.54 0.25 170.71 0.61 170.51 0.84L167.16 4.86C166.77 5.33 167.11 6.05 167.72 6.05H170.96C171.27 6.05 171.43 6.41 171.24 6.64L164.76 14.42C164.61 14.59 164.35 14.59 164.2 14.42L157.72 6.64C157.53 6.41 157.69 6.05 158 6.05H161.24C161.85 6.05 162.19 5.33 161.8 4.86L158.45 0.84C158.25 0.61 158.42 0.25 158.73 0.25H170.23Z",
				fill: "#FF5500"
			}),
			(0, import_jsx_runtime$33.jsx)("mask", {
				id: "mask0_rd",
				style: { maskType: "alpha" },
				maskUnits: "userSpaceOnUse",
				x: "157",
				y: "0",
				width: "15",
				height: "15",
				children: (0, import_jsx_runtime$33.jsx)("path", {
					d: "M170.23 0.25C170.54 0.25 170.71 0.61 170.51 0.84L167.16 4.86C166.77 5.33 167.11 6.05 167.72 6.05H170.96C171.27 6.05 171.43 6.41 171.24 6.64L164.76 14.42C164.61 14.59 164.35 14.59 164.2 14.42L157.72 6.64C157.53 6.41 157.69 6.05 158 6.05H161.24C161.85 6.05 162.19 5.33 161.8 4.86L158.45 0.84C158.25 0.61 158.42 0.25 158.73 0.25H170.23Z",
					fill: "black"
				})
			}),
			(0, import_jsx_runtime$33.jsxs)("g", {
				mask: "url(#mask0_rd)",
				children: [
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f0_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "1.73",
							cy: "7.56",
							rx: "1.73",
							ry: "7.56",
							transform: "matrix(-0.864 -0.504 -0.504 0.864 176.76 -5.36)",
							fill: "#FFE7E5"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f1_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "1.73",
							cy: "7.56",
							rx: "1.73",
							ry: "7.56",
							transform: "matrix(-0.864 -0.504 -0.504 0.864 176.39 2.01)",
							fill: "#FFE7E5"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f2_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "157.85",
							cy: "0.46",
							rx: "1.19",
							ry: "7",
							transform: "rotate(-36.09 157.85 0.46)",
							fill: "#FF19AF"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f3_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "159.7",
							cy: "10.93",
							rx: "1.19",
							ry: "7",
							transform: "rotate(-36.09 159.7 10.93)",
							fill: "#FF19AF"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f4_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "1.19",
							cy: "7",
							rx: "1.19",
							ry: "7",
							transform: "matrix(-0.808 -0.589 -0.589 0.808 176.2 -4.49)",
							fill: "#FF19AF"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f5_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "1.19",
							cy: "7",
							rx: "1.19",
							ry: "7",
							transform: "matrix(-0.808 -0.589 -0.589 0.808 173.99 5.98)",
							fill: "#FF19AF"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f6_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "1.19",
							cy: "7",
							rx: "1.19",
							ry: "7",
							transform: "matrix(-0.808 -0.589 -0.589 0.808 175.1 -4.49)",
							fill: "#FF19AF"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f7_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "1.19",
							cy: "7",
							rx: "1.19",
							ry: "7",
							transform: "matrix(-0.808 -0.589 -0.589 0.808 173.25 5.98)",
							fill: "#FF19AF"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f8_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "158.53",
							cy: "0.97",
							rx: "1.73",
							ry: "7.56",
							transform: "rotate(-40.91 158.53 0.97)",
							fill: "#D14B2A"
						})
					}),
					(0, import_jsx_runtime$33.jsx)("g", {
						filter: "url(#f9_rd)",
						children: (0, import_jsx_runtime$33.jsx)("ellipse", {
							cx: "159.71",
							cy: "9.14",
							rx: "1.73",
							ry: "7.56",
							transform: "rotate(-35.89 159.71 9.14)",
							fill: "#D14B2A"
						})
					})
				]
			}),
			(0, import_jsx_runtime$33.jsx)("path", {
				d: "M154.47 0C151.53 4.22 151.51 10.76 154.47 15H156.47C153.5 10.76 153.52 4.22 156.47 0H154.47Z",
				fill: "currentColor"
			}),
			(0, import_jsx_runtime$33.jsx)("path", {
				d: "M174.49 0H172.49C175.44 4.22 175.46 10.76 172.49 15H174.49C177.45 10.76 177.43 4.22 174.49 0Z",
				fill: "currentColor"
			}),
			(0, import_jsx_runtime$33.jsxs)("defs", { children: [
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f0_rd",
					x: "165.15",
					y: "-8.5",
					width: "12.61",
					height: "17.6",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f1_rd",
					x: "164.78",
					y: "-1.13",
					width: "12.61",
					height: "17.6",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f2_rd",
					x: "151.41",
					y: "-7.45",
					width: "12.89",
					height: "15.82",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f3_rd",
					x: "153.25",
					y: "3.02",
					width: "12.89",
					height: "15.82",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f4_rd",
					x: "164.67",
					y: "-7.45",
					width: "12.89",
					height: "15.82",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f5_rd",
					x: "162.46",
					y: "3.02",
					width: "12.89",
					height: "15.82",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f6_rd",
					x: "163.56",
					y: "-7.45",
					width: "12.89",
					height: "15.82",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f7_rd",
					x: "161.72",
					y: "3.02",
					width: "12.89",
					height: "15.82",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f8_rd",
					x: "151.2",
					y: "-7.07",
					width: "14.66",
					height: "16.07",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$33.jsxs)("filter", {
					id: "f9_rd",
					x: "152.85",
					y: "0.72",
					width: "13.72",
					height: "16.84",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$33.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$33.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$33.jsx)("feGaussianBlur", {
							stdDeviation: "1.1",
							result: "blur"
						})
					]
				})
			] })
		]
	});
}), import_jsx_runtime$32, ViteLogo;
var init_ViteLogo = __esmMin(() => {
	__toESM(require_react(), 1);
	import_jsx_runtime$32 = __toESM(require_jsx_runtime(), 1);
	ViteLogo = ({ className = "w-auto h-12" }) => (0, import_jsx_runtime$32.jsxs)("svg", {
		viewBox: "0 0 87 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		children: [
			(0, import_jsx_runtime$32.jsx)("path", {
				d: "M74.9427 14.6539C74.73 14.9246 74.295 14.7741 74.295 14.4301V11.127C74.295 10.7264 73.9704 10.4019 73.5698 10.4019H69.9228C69.6279 10.4019 69.4559 10.0683 69.6279 9.82865L72.0256 6.47163C72.3689 5.99166 72.0256 5.32454 71.4352 5.32454H67.0215C66.7266 5.32454 66.5547 4.99098 66.7266 4.75134L69.835 0.399156C69.9034 0.303852 70.0132 0.247223 70.1299 0.247223H79.393C79.6879 0.247223 79.8598 0.580784 79.6879 0.820424L77.2901 4.17745C76.9469 4.65742 77.2901 5.32454 77.8806 5.32454H81.5277C81.8301 5.32454 82 5.67329 81.8129 5.91155L74.9434 14.6546L74.9427 14.6539Z",
				fill: "#863BFF"
			}),
			(0, import_jsx_runtime$32.jsx)("mask", {
				id: "mask0_vite",
				style: { maskType: "alpha" },
				maskUnits: "userSpaceOnUse",
				x: "66",
				y: "0",
				width: "16",
				height: "15",
				children: (0, import_jsx_runtime$32.jsx)("path", {
					d: "M74.9095 14.6538C74.6968 14.9246 74.2618 14.774 74.2618 14.4301V11.1269C74.2618 10.7264 73.9372 10.4018 73.5366 10.4018H69.8896C69.5947 10.4018 69.4227 10.0682 69.5947 9.82859L71.9924 6.47157C72.3357 5.9916 71.9924 5.32448 71.402 5.32448H66.9883C66.6934 5.32448 66.5215 4.99092 66.6934 4.75128L69.8018 0.399095C69.8702 0.303791 69.98 0.247162 70.0967 0.247162H79.3598C79.6547 0.247162 79.8266 0.580723 79.6547 0.820363L77.2569 4.17739C76.9137 4.65735 77.2569 5.32448 77.8474 5.32448H81.4945C81.7969 5.32448 81.9668 5.67323 81.7797 5.91149L74.9102 14.6545L74.9095 14.6538Z",
					fill: "black"
				})
			}),
			(0, import_jsx_runtime$32.jsxs)("g", {
				mask: "url(#mask0_vite)",
				children: [
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f0_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "1.766",
							cy: "4.714",
							rx: "1.766",
							ry: "4.714",
							transform: "matrix(0.003 1 1 -0.003 65.19 10.35)",
							fill: "#EDE6FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f1_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "3.334",
							cy: "9.57",
							rx: "3.334",
							ry: "9.57",
							transform: "matrix(0.003 1 1 -0.003 54.02 2.77)",
							fill: "#EDE6FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f2_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "1.766",
							cy: "9.774",
							rx: "1.766",
							ry: "9.774",
							transform: "matrix(0.003 1 1 -0.003 53.65 3.88)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f3_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "1.766",
							cy: "9.81",
							rx: "1.766",
							ry: "9.81",
							transform: "matrix(0.003 1 1 -0.003 55.13 9.65)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f4_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "1.766",
							cy: "9.81",
							rx: "1.766",
							ry: "9.81",
							transform: "matrix(0.003 1 1 -0.003 55.62 10.02)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f5_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "4.511",
							cy: "7.078",
							rx: "4.511",
							ry: "7.078",
							transform: "matrix(0.058 -0.998 -0.998 -0.058 90.46 8.86)",
							fill: "#EDE6FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f6_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "1.113",
							cy: "6.893",
							rx: "1.113",
							ry: "6.893",
							transform: "matrix(-0.017 -1 -1 0.017 90.92 6.04)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f7_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "66.749",
							cy: "3.123",
							rx: "1.413",
							ry: "9.332",
							transform: "rotate(39.51 66.749 3.123)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f8_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "81.86",
							cy: "-1.706",
							rx: "1.413",
							ry: "9.332",
							transform: "rotate(37.89 81.86 -1.706)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f9_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "79.902",
							cy: "2.278",
							rx: "1.914",
							ry: "3.099",
							transform: "rotate(37.89 79.902 2.278)",
							fill: "#47BFFF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f10_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "66.022",
							cy: "12.536",
							rx: "1.413",
							ry: "9.332",
							transform: "rotate(37.89 66.022 12.536)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f11_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "78.055",
							cy: "9.835",
							rx: "1.413",
							ry: "9.332",
							transform: "rotate(37.89 78.055 9.835)",
							fill: "#7E14FF"
						})
					}),
					(0, import_jsx_runtime$32.jsx)("g", {
						filter: "url(#f12_vite)",
						children: (0, import_jsx_runtime$32.jsx)("ellipse", {
							cx: "78.941",
							cy: "10.634",
							rx: "1.914",
							ry: "4.904",
							transform: "rotate(37.89 78.941 10.634)",
							fill: "#47BFFF"
						})
					})
				]
			}),
			(0, import_jsx_runtime$32.jsx)("path", {
				d: "M64.29 0C61.34 4.22 61.32 10.76 64.29 15H66.28C63.32 10.76 63.33 4.22 66.28 0H64.29Z",
				fill: "currentColor"
			}),
			(0, import_jsx_runtime$32.jsx)("path", {
				d: "M84.3 0H82.31C85.26 4.22 85.28 10.76 82.31 15H84.3C87.27 10.76 87.25 4.22 84.3 0Z",
				fill: "currentColor"
			}),
			(0, import_jsx_runtime$32.jsx)("path", {
				d: "M9.14 10.69L12.91 0.25H18.07L12.35 14.75H5.72L0 0.25H5.3L9.14 10.69ZM24.76 14.75H19.79V0.25H24.76V14.75ZM42.82 3.81H37.24V14.75H32.27V3.81H26.7V0.25H42.82V3.81ZM59.07 3.77H49.73V5.72H58.93V9.14H49.73V11.23H59.34V14.75H44.76V0.25H59.07V3.77Z",
				fill: "currentColor"
			}),
			(0, import_jsx_runtime$32.jsxs)("defs", { children: [
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f0_vite",
					x: "60.29",
					y: "5.42",
					width: "19.25",
					height: "13.35",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "2.46",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f1_vite",
					x: "49.12",
					y: "-2.17",
					width: "28.96",
					height: "16.49",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "2.46",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f2_vite",
					x: "50.71",
					y: "0.9",
					width: "25.44",
					height: "9.43",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f3_vite",
					x: "52.18",
					y: "6.67",
					width: "25.51",
					height: "9.43",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f4_vite",
					x: "52.68",
					y: "7.04",
					width: "25.51",
					height: "9.43",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f5_vite",
					x: "71.68",
					y: "-5.49",
					width: "23.96",
					height: "18.87",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "2.46",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f6_vite",
					x: "74.17",
					y: "0.98",
					width: "19.68",
					height: "8.13",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f7_vite",
					x: "57.77",
					y: "-7.08",
					width: "17.97",
					height: "20.41",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f8_vite",
					x: "73.07",
					y: "-12.07",
					width: "17.57",
					height: "20.72",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f9_vite",
					x: "74.53",
					y: "-3.38",
					width: "10.75",
					height: "11.32",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f10_vite",
					x: "57.24",
					y: "2.17",
					width: "17.57",
					height: "20.72",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f11_vite",
					x: "69.27",
					y: "-0.53",
					width: "17.57",
					height: "20.72",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				}),
				(0, import_jsx_runtime$32.jsxs)("filter", {
					id: "f12_vite",
					x: "72.62",
					y: "3.64",
					width: "12.63",
					height: "13.99",
					filterUnits: "userSpaceOnUse",
					colorInterpolationFilters: "sRGB",
					children: [
						(0, import_jsx_runtime$32.jsx)("feFlood", {
							floodOpacity: "0",
							result: "bg"
						}),
						(0, import_jsx_runtime$32.jsx)("feBlend", {
							in: "SourceGraphic",
							in2: "bg",
							result: "shape"
						}),
						(0, import_jsx_runtime$32.jsx)("feGaussianBlur", {
							stdDeviation: "1.47",
							result: "blur"
						})
					]
				})
			] })
		]
	});
}), import_jsx_runtime$31, DefaultLayout;
var init_DefaultLayout = __esmMin(() => {
	init_dist();
	init_clsx();
	init_lucide_react();
	__toESM(require_react(), 1);
	init_GlowImage();
	init_RolldownLogo();
	init_ViteLogo();
	import_jsx_runtime$31 = __toESM(require_jsx_runtime(), 1);
	DefaultLayout = ({ children, version, data, scale = 3, className = "", style = {} }) => {
		const { useDarkTheme } = data;
		return (0, import_jsx_runtime$31.jsx)(HeroUIProvider, { children: (0, import_jsx_runtime$31.jsxs)("div", {
			className: clsx_default("w-360", "bg-default-50 text-default-900", "font-[HarmonyOSHans-Regular]", className, { dark: useDarkTheme }),
			id: "container",
			style: {
				transform: `scale(${scale})`,
				transformOrigin: "top left",
				width: "1440px",
				...style
			},
			children: [children, version ? (0, import_jsx_runtime$31.jsx)("div", {
				className: "relative z-50 pt-32 pb-20 text-default-800",
				children: (0, import_jsx_runtime$31.jsxs)("div", {
					className: "flex relative justify-center items-center space-x-8",
					children: [
						(0, import_jsx_runtime$31.jsxs)("div", {
							className: "flex items-end space-x-8",
							children: [(0, import_jsx_runtime$31.jsx)(GlowImage, {
								glowStrength: useDarkTheme ? 1 : 0,
								blurRadius: 20,
								children: (0, import_jsx_runtime$31.jsxs)("svg", {
									id: "114514",
									xmlns: "http://www.w3.org/2000/svg",
									viewBox: "0 0 230 221",
									className: "w-auto h-18",
									children: [
										(0, import_jsx_runtime$31.jsx)("path", {
											id: "_1",
											d: "M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z",
											fill: "currentColor"
										}),
										(0, import_jsx_runtime$31.jsx)("path", {
											id: "_2",
											d: "M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z",
											fill: "currentColor"
										}),
										(0, import_jsx_runtime$31.jsx)("path", {
											d: "M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z",
											fill: "currentColor"
										})
									]
								})
							}), (0, import_jsx_runtime$31.jsxs)("div", {
								className: "flex flex-col items-start opacity-90",
								children: [(0, import_jsx_runtime$31.jsx)("div", {
									className: "flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900",
									children: (0, import_jsx_runtime$31.jsx)("span", { children: version.plugin })
								}), (0, import_jsx_runtime$31.jsx)("span", {
									className: "text-5xl font-black",
									children: version.pluginName
								})]
							})]
						}),
						(0, import_jsx_runtime$31.jsxs)("div", {
							className: "flex flex-col items-start opacity-90",
							children: [(0, import_jsx_runtime$31.jsxs)("div", {
								className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
								children: [
									version.hasUpdate && (0, import_jsx_runtime$31.jsx)(CircleFadingArrowUp, {
										strokeWidth: 3,
										className: "w-4 h-4 text-success"
									}),
									!version.hasUpdate && version.releaseType === "Stable" && (0, import_jsx_runtime$31.jsx)(CircleCheckBig, {
										strokeWidth: 3,
										className: "w-4 h-4"
									}),
									!version.hasUpdate && version.releaseType === "Preview" && (0, import_jsx_runtime$31.jsx)(TriangleAlert, {
										strokeWidth: 3,
										className: "w-4 h-4 text-warning"
									}),
									!version.hasUpdate && version.releaseType !== "Stable" && version.releaseType !== "Preview" && (0, import_jsx_runtime$31.jsx)(Info, {
										strokeWidth: 3,
										className: "w-4 h-4"
									}),
									(0, import_jsx_runtime$31.jsx)("span", {
										className: clsx_default(version.hasUpdate && "text-success", !version.hasUpdate && version.releaseType === "Preview" && "text-warning"),
										children: version.hasUpdate ? "有可用更新" : version.releaseType
									})
								]
							}), (0, import_jsx_runtime$31.jsxs)("span", {
								className: clsx_default("text-5xl font-bold tracking-wide", version.hasUpdate && "text-success", !version.hasUpdate && version.releaseType === "Preview" && "text-warning"),
								children: ["v", version.pluginVersion]
							})]
						}),
						(0, import_jsx_runtime$31.jsx)("div", { className: "w-1 h-14 opacity-90 bg-default-900" }),
						(0, import_jsx_runtime$31.jsxs)("div", {
							className: "flex items-end space-x-8",
							children: [(0, import_jsx_runtime$31.jsx)(GlowImage, {
								src: "/image/frame-logo.png",
								alt: "logo",
								imgClassName: "w-auto h-18",
								glowStrength: useDarkTheme ? 1 : 0,
								blurRadius: 40
							}), (0, import_jsx_runtime$31.jsxs)("div", {
								className: "flex flex-col items-start",
								children: [(0, import_jsx_runtime$31.jsxs)("div", {
									className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900",
									children: [(0, import_jsx_runtime$31.jsx)(Zap, {
										strokeWidth: 3,
										className: "w-4 h-4 opacity-90"
									}), (0, import_jsx_runtime$31.jsx)("span", {
										className: "opacity-90",
										children: "Power By"
									})]
								}), (0, import_jsx_runtime$31.jsxs)("div", {
									className: "flex items-end space-x-2",
									children: [(0, import_jsx_runtime$31.jsx)("span", {
										className: "text-5xl font-black leading-none opacity-90",
										children: version.poweredBy
									}), (0, import_jsx_runtime$31.jsxs)("span", {
										className: "pb-1 text-2xl font-bold leading-none opacity-90",
										children: ["v", version.frameworkVersion]
									})]
								})]
							})]
						}),
						version.releaseType === "Stable" && (0, import_jsx_runtime$31.jsxs)(import_jsx_runtime$31.Fragment, { children: [(0, import_jsx_runtime$31.jsx)("div", { className: "w-1 h-14 opacity-90 bg-default-900" }), (0, import_jsx_runtime$31.jsxs)("div", {
							className: "flex flex-col items-start space-y-4",
							children: [(0, import_jsx_runtime$31.jsx)("div", {
								className: "flex items-end space-x-2",
								children: (0, import_jsx_runtime$31.jsx)(GlowImage, {
									glowStrength: useDarkTheme ? 1 : 0,
									blurRadius: 6,
									children: (0, import_jsx_runtime$31.jsx)(RolldownLogo, { className: "w-auto h-4" })
								})
							}), (0, import_jsx_runtime$31.jsx)(GlowImage, {
								glowStrength: useDarkTheme ? 1 : 0,
								blurRadius: 12,
								children: (0, import_jsx_runtime$31.jsx)(ViteLogo, { className: "w-auto h-8" })
							})]
						})] })
					]
				})
			}) : (0, import_jsx_runtime$31.jsx)("div", { className: "h-24" })]
		}) });
	};
});
var Comment_exports$3 = __export({
	DouyinComment: () => DouyinComment,
	default: () => Comment_default$3
}, 1);
var import_react$32, import_jsx_runtime$30, QRCodeSection$3, VideoInfoHeader$1, organizeReplies, ReplyItemComponent, CommentItemComponent$2, DouyinComment, Comment_default$3;
var init_Comment$3 = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$32 = __toESM(require_react(), 1);
	init_io5();
	init_DefaultLayout();
	import_jsx_runtime$30 = __toESM(require_jsx_runtime(), 1);
	QRCodeSection$3 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$30.jsx)("div", {
		className: "flex flex-col items-center",
		children: (0, import_jsx_runtime$30.jsx)("div", {
			className: "flex justify-center items-center w-100 h-100 p-4",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$30.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full rounded-lg"
			}) : (0, import_jsx_runtime$30.jsxs)("div", {
				className: "flex flex-col justify-center items-center text-foreground-400",
				children: [(0, import_jsx_runtime$30.jsx)(QrCode, {
					size: 80,
					className: "mb-4"
				}), (0, import_jsx_runtime$30.jsx)("span", {
					className: "text-lg",
					children: "二维码生成失败"
				})]
			})
		})
	});
	VideoInfoHeader$1 = (props) => (0, import_jsx_runtime$30.jsx)("div", {
		className: "max-w-350 mx-auto px-10 py-8",
		children: (0, import_jsx_runtime$30.jsxs)("div", {
			className: "flex gap-16 justify-between items-start",
			children: [(0, import_jsx_runtime$30.jsxs)("div", {
				className: "flex flex-col flex-1",
				children: [(0, import_jsx_runtime$30.jsx)("div", {
					className: "mb-12",
					children: (0, import_jsx_runtime$30.jsxs)("div", {
						className: "h-45 flex items-center",
						children: [(0, import_jsx_runtime$30.jsx)("img", {
							src: props.useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
							alt: "抖音Logo",
							className: "object-contain h-full w-auto max-w-125",
							onError: (e) => {
								const target = e.target;
								target.style.display = "none";
								const parent = target.parentElement;
								if (parent) parent.innerHTML = "<div class=\"flex items-center h-full text-6xl font-bold text-foreground-600\">抖音</div>";
							}
						}), props.Type === "视频" && props.Resolution && (0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex flex-col gap-2 px-8 py-4 ml-8 rounded-3xl bg-default-100/50 w-fit",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "text-[42px] text-foreground-400",
								children: "分辨率（px）"
							}), (0, import_jsx_runtime$30.jsx)("span", {
								className: "text-[48px] font-medium text-foreground-600",
								children: props.Resolution
							})]
						})]
					})
				}), (0, import_jsx_runtime$30.jsxs)("div", {
					className: "grid grid-cols-2 gap-y-6 gap-x-16 pl-2",
					children: [
						(0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "mr-4 text-foreground-400",
								children: "类型"
							}), (0, import_jsx_runtime$30.jsx)("span", {
								className: "font-medium text-foreground-600",
								children: props.Type
							})]
						}),
						(0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "mr-4 text-foreground-400",
								children: "评论"
							}), (0, import_jsx_runtime$30.jsxs)("span", {
								className: "font-medium text-foreground-600",
								children: [props.CommentLength, "条"]
							})]
						}),
						props.Type === "视频" ? (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [(0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "mr-4 text-foreground-400",
								children: "大小"
							}), (0, import_jsx_runtime$30.jsxs)("span", {
								className: "font-medium text-foreground-600",
								children: [props.VideoSize, "MB"]
							})]
						}), (0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "mr-4 text-foreground-400",
								children: "帧率"
							}), (0, import_jsx_runtime$30.jsxs)("span", {
								className: "font-medium text-foreground-600",
								children: [props.VideoFPS, "Hz"]
							})]
						})] }) : (0, import_jsx_runtime$30.jsxs)(import_jsx_runtime$30.Fragment, { children: [(0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "mr-4 text-foreground-400",
								children: "区域"
							}), (0, import_jsx_runtime$30.jsx)("span", {
								className: "font-medium text-foreground-600",
								children: props.Region
							})]
						}), (0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "mr-4 text-foreground-400",
								children: "数量"
							}), (0, import_jsx_runtime$30.jsxs)("span", {
								className: "font-medium text-foreground-600",
								children: [props.ImageLength, "张"]
							})]
						})] })
					]
				})]
			}), (0, import_jsx_runtime$30.jsx)("div", {
				className: "shrink-0",
				children: (0, import_jsx_runtime$30.jsx)(QRCodeSection$3, { qrCodeDataUrl: props.qrCodeDataUrl })
			})]
		})
	});
	organizeReplies = (replies, rootCid, maxDepth = 6) => {
		const map = /* @__PURE__ */ new Map();
		const roots = [];
		replies.forEach((r) => {
			map.set(r.cid, {
				...r,
				children: []
			});
		});
		replies.forEach((r) => {
			const node = map.get(r.cid);
			const parentId = r.reply_to_reply_id;
			if (parentId && map.has(parentId) && parentId !== rootCid && parentId !== "0") map.get(parentId).children.push(node);
			else roots.push(node);
		});
		const pruneTree = (nodes, currentDepth) => {
			if (currentDepth > maxDepth) {
				const count = nodes.length + nodes.reduce((acc, node) => acc + countChildren(node), 0);
				if (count > 0) return [{
					cid: `more-${Date.now()}-${Math.random()}`,
					text: "",
					digg_count: 0,
					create_time: "",
					nickname: "",
					userimageurl: "",
					ip_label: "",
					text_extra: [],
					label_text: "",
					image_list: null,
					reply_to_reply_id: "",
					reply_to_username: "",
					children: [],
					hiddenCount: count
				}];
				return [];
			}
			return nodes.map((node) => {
				node.children = pruneTree(node.children, currentDepth + 1);
				return node;
			});
		};
		const countChildren = (node) => node.children.length + node.children.reduce((acc, child) => acc + countChildren(child), 0);
		return pruneTree(roots, 1);
	};
	ReplyItemComponent = ({ reply, depth = 0, isLast, maxDepth = 6 }) => {
		const isNicknameLonger = reply.nickname.length >= (reply.reply_to_username?.length || 0);
		if (reply.hiddenCount) return (0, import_jsx_runtime$30.jsx)("div", {
			className: "flex relative flex-col mb-6",
			children: (0, import_jsx_runtime$30.jsxs)("div", {
				className: "grid grid-cols-[100px_minmax(0,1fr)] relative",
				children: [(0, import_jsx_runtime$30.jsxs)("div", {
					className: "flex relative justify-center",
					children: [
						!isLast && (0, import_jsx_runtime$30.jsx)("div", { className: "absolute top-0 bottom-0 left-1/2 w-0.5 bg-default-300 -ml-px" }),
						!isLast && (0, import_jsx_runtime$30.jsx)("div", { className: "absolute -bottom-6 left-1/2 w-0.5 h-6 bg-default-300 -ml-px" }),
						(0, import_jsx_runtime$30.jsx)("svg", {
							className: "absolute top-0 left-0 w-full h-12.5 pointer-events-none overflow-visible z-0 text-default-300",
							children: (0, import_jsx_runtime$30.jsx)("path", {
								d: "M 50 0 V 15 Q 50 50 85 50 H 90",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round"
							})
						})
					]
				}), (0, import_jsx_runtime$30.jsx)("div", {
					className: "flex flex-col mt-6 min-w-0",
					children: (0, import_jsx_runtime$30.jsx)("div", {
						className: "flex items-center h-12.5",
						children: (0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex items-center text-foreground-500",
							children: [(0, import_jsx_runtime$30.jsx)(CircleEllipsis, {
								size: 45,
								className: "mr-5"
							}), (0, import_jsx_runtime$30.jsxs)("span", {
								className: "text-4xl font-medium tracking-wide",
								children: [
									"另外 ",
									reply.hiddenCount,
									" 条回复"
								]
							})]
						})
					})
				})]
			})
		});
		return (0, import_jsx_runtime$30.jsx)("div", {
			className: "flex relative flex-col",
			children: (0, import_jsx_runtime$30.jsxs)("div", {
				className: "grid grid-cols-[100px_minmax(0,1fr)] relative",
				children: [(0, import_jsx_runtime$30.jsxs)("div", {
					className: "flex relative justify-center",
					children: [
						!isLast && (0, import_jsx_runtime$30.jsx)("div", { className: "absolute top-0 bottom-0 left-1/2 w-0.5 bg-default-300 -ml-px" }),
						!isLast && (0, import_jsx_runtime$30.jsx)("div", { className: "absolute -bottom-6 left-1/2 w-0.5 h-6 bg-default-300 -ml-px" }),
						(0, import_jsx_runtime$30.jsx)("svg", {
							className: "absolute top-0 left-0 w-full h-12.5 pointer-events-none overflow-visible z-0 text-default-300",
							children: (0, import_jsx_runtime$30.jsx)("path", {
								d: "M 50 0 V 15 Q 50 50 85 50 H 90",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2",
								strokeLinecap: "round"
							})
						})
					]
				}), (0, import_jsx_runtime$30.jsxs)("div", {
					className: "flex flex-col min-w-0",
					children: [(0, import_jsx_runtime$30.jsxs)("div", {
						className: "grid grid-cols-[100px_minmax(0,1fr)] relative",
						children: [(0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex relative flex-col items-center h-full",
							children: [(0, import_jsx_runtime$30.jsx)("div", {
								className: "w-25 h-25 shrink-0 z-10 relative",
								children: (0, import_jsx_runtime$30.jsx)("img", {
									src: reply.userimageurl,
									className: "object-cover rounded-full w-25 h-25 bg-background",
									alt: "用户头像"
								})
							}), reply.children.length > 0 && (0, import_jsx_runtime$30.jsx)("div", { className: "w-0.5 bg-default-300 h-full grow mt-3 rounded-t-full" })]
						}), (0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex flex-col pb-8 pl-3 min-w-0",
							children: [
								(0, import_jsx_runtime$30.jsxs)("div", {
									className: "flex flex-nowrap items-center h-25 content-center w-full overflow-hidden",
									children: [
										(0, import_jsx_runtime$30.jsx)("span", {
											className: clsx_default("mr-2 text-5xl font-medium text-foreground-500", isNicknameLonger ? "min-w-0 truncate shrink" : "shrink-0"),
											children: reply.nickname
										}),
										reply.label_text !== "" && (0, import_jsx_runtime$30.jsx)("div", {
											className: clsx_default("inline-flex shrink-0 items-center px-3 py-1 text-3xl rounded-lg mr-2", reply.label_text === "作者" ? "bg-[#fe2c55] text-white" : "bg-default-100 text-default-500"),
											children: reply.label_text
										}),
										reply.reply_to_username && (0, import_jsx_runtime$30.jsxs)("div", {
											className: clsx_default("flex items-center", !isNicknameLonger ? "overflow-hidden min-w-0 shrink" : "shrink-0"),
											children: [(0, import_jsx_runtime$30.jsx)(Play, {
												size: 35,
												className: "mr-3.5 mx-1 text-foreground-300 shrink-0",
												fill: "currentColor"
											}), (0, import_jsx_runtime$30.jsx)("span", {
												className: clsx_default("text-5xl font-medium text-foreground-500", !isNicknameLonger && "truncate"),
												children: reply.reply_to_username
											})]
										})
									]
								}),
								(0, import_jsx_runtime$30.jsxs)("div", {
									className: "py-2",
									children: [(0, import_jsx_runtime$30.jsx)("div", {
										className: "text-5xl text-foreground leading-normal whitespace-pre-wrap select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.3em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
										dangerouslySetInnerHTML: { __html: reply.text },
										style: {
											wordBreak: "break-word",
											overflowWrap: "break-word"
										}
									}), reply.image_list && reply.image_list.length > 0 && reply.image_list.filter(Boolean).map((img, idx) => (0, import_jsx_runtime$30.jsx)("div", {
										className: "my-4 overflow-hidden shadow-sm rounded-xl max-w-150",
										children: (0, import_jsx_runtime$30.jsx)("img", {
											className: "object-contain w-full h-auto rounded-xl",
											src: img,
											alt: "评论图片"
										})
									}, idx))]
								}),
								(0, import_jsx_runtime$30.jsx)("div", {
									className: "pb-4",
									children: (0, import_jsx_runtime$30.jsxs)("div", {
										className: "flex gap-6 items-center text-foreground-500",
										children: [
											(0, import_jsx_runtime$30.jsxs)("div", {
												className: "flex gap-2 items-center",
												children: [(0, import_jsx_runtime$30.jsx)(Heart, {
													size: 40,
													className: "text-foreground-500"
												}), (0, import_jsx_runtime$30.jsx)("span", {
													className: "text-4xl",
													children: reply.digg_count
												})]
											}),
											(0, import_jsx_runtime$30.jsx)("span", {
												className: "text-4xl",
												children: reply.ip_label
											}),
											(0, import_jsx_runtime$30.jsx)("span", {
												className: "ml-2 text-4xl",
												children: reply.create_time
											})
										]
									})
								})
							]
						})]
					}), reply.children.length > 0 && (0, import_jsx_runtime$30.jsx)("div", {
						className: "flex relative flex-col",
						children: (0, import_jsx_runtime$30.jsx)("div", { children: reply.children.map((child, index) => (0, import_jsx_runtime$30.jsx)(ReplyItemComponent, {
							reply: child,
							depth: depth + 1,
							isLast: index === reply.children.length - 1,
							maxDepth
						}, child.cid)) })
					})]
				})]
			})
		});
	};
	CommentItemComponent$2 = (props) => (0, import_jsx_runtime$30.jsx)("div", {
		className: clsx_default("flex flex-col px-6 pt-8", {
			"pb-0": props.isLast,
			"pb-10": !props.isLast
		}),
		children: (0, import_jsx_runtime$30.jsxs)("div", {
			className: "flex flex-col min-w-0",
			children: [(0, import_jsx_runtime$30.jsxs)("div", {
				className: "grid grid-cols-[140px_minmax(0,1fr)] relative",
				children: [(0, import_jsx_runtime$30.jsxs)("div", {
					className: "flex relative flex-col items-center",
					children: [(0, import_jsx_runtime$30.jsx)("div", {
						className: "w-35 h-35 shrink-0 z-10 relative",
						children: (0, import_jsx_runtime$30.jsx)("img", {
							src: props.userimageurl,
							className: "w-35 h-35 rounded-full object-cover shadow-md bg-background",
							alt: "用户头像"
						})
					}), props.replyComment && props.replyComment.length > 0 && (0, import_jsx_runtime$30.jsx)("div", { className: "w-0.5 bg-default-300 h-full grow mt-4 rounded-t-full" })]
				}), (0, import_jsx_runtime$30.jsxs)("div", {
					className: "flex flex-col pb-4 pl-4 min-w-0",
					children: [
						(0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex flex-wrap gap-4 items-center mb-3 text-5xl select-text min-h-35 content-center",
							children: [
								(0, import_jsx_runtime$30.jsx)("span", {
									className: "font-medium text-foreground-500",
									children: props.nickname
								}),
								props.label_type === 1 && (0, import_jsx_runtime$30.jsx)("div", {
									className: "inline-flex items-center px-3 py-1 rounded-lg text-3xl bg-[#fe2c55] text-white",
									children: "作者"
								}),
								props.is_author_digged && props.status_label !== "作者赞过" && (0, import_jsx_runtime$30.jsx)("div", {
									className: "inline-flex items-center px-3 py-1 text-3xl font-light rounded-lg bg-content2 text-foreground-700",
									children: "作者赞过"
								}),
								props.status_label && (0, import_jsx_runtime$30.jsx)("div", {
									className: "inline-flex items-center px-3 py-1 text-3xl font-light rounded-lg bg-content2 text-foreground-700",
									children: props.status_label
								})
							]
						}),
						(0, import_jsx_runtime$30.jsx)("div", {
							className: "text-5xl text-foreground leading-normal mb-4 whitespace-pre-wrap select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.3em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
							dangerouslySetInnerHTML: { __html: props.text },
							style: {
								wordBreak: "break-word",
								overflowWrap: "break-word"
							}
						}),
						(props.commentimage || props.sticker) && (0, import_jsx_runtime$30.jsx)("div", {
							className: "my-6 overflow-hidden shadow-sm rounded-2xl max-w-200",
							children: (0, import_jsx_runtime$30.jsx)("img", {
								className: "object-contain w-full h-auto rounded-2xl",
								src: props.commentimage || props.sticker,
								alt: "评论图片"
							})
						}),
						(0, import_jsx_runtime$30.jsx)("div", {
							className: "flex justify-between items-center mt-3 text-foreground-500",
							children: (0, import_jsx_runtime$30.jsxs)("div", {
								className: "flex gap-6 items-center shrink-0",
								children: [
									(0, import_jsx_runtime$30.jsxs)("div", {
										className: "flex gap-2 items-center transition-colors cursor-pointer",
										children: [(0, import_jsx_runtime$30.jsx)(Heart, {
											size: 44,
											className: "text-foreground-500"
										}), (0, import_jsx_runtime$30.jsx)("span", {
											className: "text-4xl select-text",
											children: props.digg_count
										})]
									}),
									(0, import_jsx_runtime$30.jsx)("span", {
										className: "text-4xl",
										children: props.ip_label
									}),
									(0, import_jsx_runtime$30.jsx)("span", {
										className: "ml-2 text-4xl",
										children: props.create_time
									})
								]
							})
						})
					]
				})]
			}), props.replyComment && props.replyComment.length > 0 && (0, import_jsx_runtime$30.jsxs)("div", {
				className: "flex relative flex-col mt-8 ml-5",
				children: [(0, import_jsx_runtime$30.jsx)("div", { className: "absolute -top-8 left-12.5 w-0.5 h-8 bg-default-300 -ml-px" }), organizeReplies(props.replyComment, props.cid || "", props.maxDepth).map((reply, index, arr) => (0, import_jsx_runtime$30.jsx)(ReplyItemComponent, {
					reply,
					depth: 1,
					isLast: index === arr.length - 1,
					maxDepth: props.maxDepth
				}, reply.cid))]
			})]
		})
	});
	DouyinComment = import_react$32.memo((props) => {
		const randomSuggestWord = import_react$32.useMemo(() => {
			if (props.data.suggestWrod && props.data.suggestWrod.length > 0) {
				const randomIndex = Math.floor(Math.random() * props.data.suggestWrod.length);
				return props.data.suggestWrod[randomIndex];
			}
			return null;
		}, [props.data.suggestWrod]);
		return (0, import_jsx_runtime$30.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$30.jsxs)("div", {
				className: "p-5",
				children: [
					(0, import_jsx_runtime$30.jsx)("div", { className: "h-20" }),
					(0, import_jsx_runtime$30.jsx)(VideoInfoHeader$1, {
						...props.data,
						qrCodeDataUrl: props.qrCodeDataUrl
					}),
					randomSuggestWord && (0, import_jsx_runtime$30.jsx)("div", {
						className: "mx-auto my-20 mb-5 ml-10",
						children: (0, import_jsx_runtime$30.jsxs)("div", {
							className: "flex gap-3 items-center px-6 py-4 rounded-2xl",
							children: [(0, import_jsx_runtime$30.jsx)("span", {
								className: "text-5xl text-default-500",
								children: "大家都在搜："
							}), (0, import_jsx_runtime$30.jsxs)("span", {
								className: "relative text-5xl text-[#04498d] dark:text-[#face15]",
								children: [randomSuggestWord, (0, import_jsx_runtime$30.jsx)(IoSearch, {
									size: 32,
									className: "absolute -top-2 -right-8"
								})]
							})]
						})
					}),
					(0, import_jsx_runtime$30.jsx)("div", {
						className: "overflow-hidden mt-8",
						children: props.data.CommentsData.length > 0 ? (0, import_jsx_runtime$30.jsx)(import_jsx_runtime$30.Fragment, { children: props.data.CommentsData.map((comment, index) => (0, import_jsx_runtime$30.jsx)(CommentItemComponent$2, {
							...comment,
							isLast: index === props.data.CommentsData.length - 1,
							maxDepth: props.data.maxDepth
						}, comment.cid || index)) }) : (0, import_jsx_runtime$30.jsx)("div", {
							className: "flex justify-center items-center py-20 text-foreground-400",
							children: (0, import_jsx_runtime$30.jsx)("div", {
								className: "text-center",
								children: (0, import_jsx_runtime$30.jsx)("p", {
									className: "text-xl",
									children: "暂无评论数据"
								})
							})
						})
					})
				]
			})
		});
	});
	Comment_default$3 = DouyinComment;
});
var Dynamic_exports = __export({
	DouyinDynamic: () => DouyinDynamic,
	default: () => Dynamic_default
}, 1);
var import_react$31, import_jsx_runtime$29, DouyinHeader$1, CoverSection$1, InfoSection, UserInfoSection$1, CoCreatorsInfo, DouyinDynamic, Dynamic_default;
var init_Dynamic = __esmMin(() => {
	init_date_fns();
	init_lucide_react();
	import_react$31 = __toESM(require_react(), 1);
	init_lu();
	init_DefaultLayout();
	import_jsx_runtime$29 = __toESM(require_jsx_runtime(), 1);
	DouyinHeader$1 = ({ useDarkTheme }) => (0, import_jsx_runtime$29.jsxs)("div", {
		className: "flex items-center px-12 py-15",
		children: [(0, import_jsx_runtime$29.jsx)("div", {
			className: "w-[39%] h-50 bg-cover bg-center bg-fixed",
			children: (0, import_jsx_runtime$29.jsx)("img", {
				src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
				alt: "抖音Logo",
				className: "object-contain w-full h-full"
			})
		}), (0, import_jsx_runtime$29.jsx)("span", {
			className: "text-[65px] ml-4 text-foreground-600",
			children: "记录美好生活"
		})]
	});
	CoverSection$1 = ({ imageUrl }) => (0, import_jsx_runtime$29.jsx)("div", {
		className: "flex flex-col items-center my-5",
		children: (0, import_jsx_runtime$29.jsx)("div", {
			className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative",
			children: (0, import_jsx_runtime$29.jsx)("img", {
				className: "rounded-[25px] object-contain w-full h-full",
				src: imageUrl,
				alt: "封面"
			})
		})
	});
	InfoSection = (props) => (0, import_jsx_runtime$29.jsxs)("div", {
		className: "flex flex-col px-16 py-5",
		children: [
			(0, import_jsx_runtime$29.jsx)("div", {
				className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
				style: {
					letterSpacing: "1.5px",
					wordWrap: "break-word"
				},
				dangerouslySetInnerHTML: { __html: props.data.desc }
			}),
			(0, import_jsx_runtime$29.jsxs)("div", {
				className: "flex items-center gap-6 text-[45px] text-foreground-500 font-light mb-2.5 select-text",
				children: [
					(0, import_jsx_runtime$29.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$29.jsx)(Heart, { className: "w-11 h-11 text-like" }), (0, import_jsx_runtime$29.jsxs)("span", { children: [props.data.dianzan, "点赞"] })]
					}),
					(0, import_jsx_runtime$29.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$29.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$29.jsx)(MessageCircle, { className: "w-11 h-11 text-comment" }), (0, import_jsx_runtime$29.jsxs)("span", { children: [props.data.pinglun, "评论"] })]
					}),
					(0, import_jsx_runtime$29.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$29.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$29.jsx)(Bookmark, { className: "w-11 h-11" }), (0, import_jsx_runtime$29.jsxs)("span", { children: [props.data.shouchang, "收藏"] })]
					}),
					(0, import_jsx_runtime$29.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$29.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [(0, import_jsx_runtime$29.jsx)(Share2, { className: "w-11 h-11 text-success" }), (0, import_jsx_runtime$29.jsxs)("span", { children: [props.data.share, "分享"] })]
					})
				]
			}),
			(0, import_jsx_runtime$29.jsxs)("div", {
				className: "flex items-center gap-2 text-[45px] text-foreground-500 font-light select-text",
				children: [(0, import_jsx_runtime$29.jsx)(Clock, { className: "w-11 h-11 text-time" }), (0, import_jsx_runtime$29.jsxs)("span", { children: ["发布于: ", props.data.create_time] })]
			}),
			(0, import_jsx_runtime$29.jsxs)("div", {
				className: "flex items-center gap-2 text-[45px] text-foreground-500 font-light select-text",
				children: [(0, import_jsx_runtime$29.jsx)(LuFullscreen, { className: "w-11 h-11 text-time text-time" }), (0, import_jsx_runtime$29.jsxs)("span", { children: ["图片生成于: ", format(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss")] })]
			})
		]
	});
	UserInfoSection$1 = (props) => (0, import_jsx_runtime$29.jsxs)("div", {
		className: "flex flex-col gap-12",
		children: [(0, import_jsx_runtime$29.jsxs)("div", {
			className: "flex gap-12 items-start",
			children: [(0, import_jsx_runtime$29.jsx)("div", {
				className: "relative shrink-0",
				children: (0, import_jsx_runtime$29.jsx)("div", {
					className: "flex justify-center items-center bg-white rounded-full w-35 h-35",
					children: (0, import_jsx_runtime$29.jsx)("img", {
						src: props.data.avater_url,
						alt: "头像",
						className: "rounded-full w-33 h-33 shadow-large"
					})
				})
			}), (0, import_jsx_runtime$29.jsxs)("div", {
				className: "flex flex-col gap-5",
				children: [(0, import_jsx_runtime$29.jsxs)("div", {
					className: "text-7xl font-bold select-text text-foreground",
					children: ["@", props.data.username]
				}), (0, import_jsx_runtime$29.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl text-default-500",
					children: [(0, import_jsx_runtime$29.jsx)(Hash, {
						size: 32,
						className: "text-default-400"
					}), (0, import_jsx_runtime$29.jsxs)("span", {
						className: "select-text",
						children: ["抖音号: ", props.data.抖音号]
					})]
				})]
			})]
		}), (0, import_jsx_runtime$29.jsxs)("div", {
			className: "text-3xl flex gap-6 items-center text-default-600",
			children: [
				(0, import_jsx_runtime$29.jsxs)("div", {
					className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
					children: [
						(0, import_jsx_runtime$29.jsxs)("div", {
							className: "flex gap-1 items-center",
							children: [(0, import_jsx_runtime$29.jsx)(Heart, {
								size: 28,
								className: "text-like"
							}), (0, import_jsx_runtime$29.jsx)("span", {
								className: "text-default-400",
								children: "获赞"
							})]
						}),
						(0, import_jsx_runtime$29.jsx)("div", { className: "w-full h-px bg-default-300" }),
						(0, import_jsx_runtime$29.jsx)("span", {
							className: "select-text font-medium text-4xl",
							children: props.data.获赞
						})
					]
				}),
				(0, import_jsx_runtime$29.jsxs)("div", {
					className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
					children: [
						(0, import_jsx_runtime$29.jsxs)("div", {
							className: "flex gap-1 items-center",
							children: [(0, import_jsx_runtime$29.jsx)(Eye, {
								size: 28,
								className: "text-view"
							}), (0, import_jsx_runtime$29.jsx)("span", {
								className: "text-default-400",
								children: "关注"
							})]
						}),
						(0, import_jsx_runtime$29.jsx)("div", { className: "w-full h-px bg-default-300" }),
						(0, import_jsx_runtime$29.jsx)("span", {
							className: "select-text font-medium text-4xl",
							children: props.data.关注
						})
					]
				}),
				(0, import_jsx_runtime$29.jsxs)("div", {
					className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
					children: [
						(0, import_jsx_runtime$29.jsxs)("div", {
							className: "flex gap-1 items-center",
							children: [(0, import_jsx_runtime$29.jsx)(Users, {
								size: 28,
								className: "text-primary"
							}), (0, import_jsx_runtime$29.jsx)("span", {
								className: "text-default-400",
								children: "粉丝"
							})]
						}),
						(0, import_jsx_runtime$29.jsx)("div", { className: "w-full h-px bg-default-300" }),
						(0, import_jsx_runtime$29.jsx)("span", {
							className: "select-text font-medium text-4xl",
							children: props.data.粉丝
						})
					]
				})
			]
		})]
	});
	CoCreatorsInfo = ({ info }) => {
		const creators = info?.co_creators ?? [];
		if (creators.length === 0) return null;
		const items = creators.slice(0, 50);
		const listRef = import_react$31.useRef(null);
		const [visibleCount, setVisibleCount] = import_react$31.useState(items.length);
		import_react$31.useEffect(() => {
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
		return (0, import_jsx_runtime$29.jsx)("div", {
			className: "flex flex-col pl-16 w-full",
			children: (0, import_jsx_runtime$29.jsxs)("div", {
				ref: listRef,
				className: "flex overflow-hidden gap-8 py-1 pr-2 w-full",
				style: { scrollbarWidth: "thin" },
				children: [items.slice(0, visibleCount).map((c, idx) => {
					const avatar = c.avatar_thumb?.url_list[0];
					return (0, import_jsx_runtime$29.jsxs)("div", {
						className: "flex flex-col items-center min-w-38 w-38 shrink-0",
						children: [
							(0, import_jsx_runtime$29.jsx)("div", {
								className: "flex justify-center items-center bg-white rounded-full w-30 h-30",
								children: (0, import_jsx_runtime$29.jsx)("img", {
									src: avatar,
									alt: "共创者头像",
									className: "object-cover w-28 h-auto rounded-full"
								})
							}),
							(0, import_jsx_runtime$29.jsx)("div", {
								className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700",
								children: c.nickname || "未提供"
							}),
							(0, import_jsx_runtime$29.jsx)("div", {
								className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600",
								children: c.role_title || "未提供"
							})
						]
					}, `${c.nickname || "creator"}-${idx}`);
				}), items.length > visibleCount && (0, import_jsx_runtime$29.jsxs)("div", {
					className: "flex flex-col items-center min-w-38 w-38 shrink-0",
					children: [
						(0, import_jsx_runtime$29.jsx)("div", {
							className: "flex justify-center items-center rounded-full bg-default-200 w-38 h-38",
							children: (0, import_jsx_runtime$29.jsx)("span", {
								className: "text-[42px] leading-none text-foreground-500",
								children: "···"
							})
						}),
						(0, import_jsx_runtime$29.jsxs)("div", {
							className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700",
							children: [
								"还有",
								items.length - visibleCount,
								"人"
							]
						}),
						(0, import_jsx_runtime$29.jsx)("div", {
							className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600",
							children: "共创"
						})
					]
				})]
			})
		});
	};
	DouyinDynamic = (props) => {
		const coCreatorCount = props.data.cooperation_info?.co_creator_nums ?? props.data.cooperation_info?.co_creators?.length ?? void 0;
		return (0, import_jsx_runtime$29.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$29.jsxs)("div", { children: [
				(0, import_jsx_runtime$29.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$29.jsx)(DouyinHeader$1, { useDarkTheme: props.data.useDarkTheme }),
				(0, import_jsx_runtime$29.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$29.jsx)(CoverSection$1, { imageUrl: props.data.image_url }),
				(0, import_jsx_runtime$29.jsx)("div", { className: "h-5" }),
				(0, import_jsx_runtime$29.jsx)(InfoSection, { ...props }),
				(0, import_jsx_runtime$29.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$29.jsxs)("div", {
					className: "flex flex-col gap-10 px-0 pt-25",
					children: [(0, import_jsx_runtime$29.jsxs)("div", {
						className: "w-full",
						children: [coCreatorCount && coCreatorCount > 0 && (0, import_jsx_runtime$29.jsx)("div", {
							className: "px-16 pb-8",
							children: (0, import_jsx_runtime$29.jsxs)("div", {
								className: "gap-2 inline-flex items-center rounded-2xl bg-default-100 text-foreground-700 px-6 py-3",
								children: [(0, import_jsx_runtime$29.jsx)(Users, { className: "w-7 h-7" }), (0, import_jsx_runtime$29.jsxs)("span", {
									className: "text-3xl font-medium leading-none select-text text-foreground-700",
									children: [coCreatorCount, "人共创"]
								})]
							})
						}), (0, import_jsx_runtime$29.jsx)(CoCreatorsInfo, { info: props.data.cooperation_info })]
					}), (0, import_jsx_runtime$29.jsxs)("div", {
						className: "flex justify-between items-start px-20 pb-20",
						children: [(0, import_jsx_runtime$29.jsx)(UserInfoSection$1, { ...props }), (0, import_jsx_runtime$29.jsx)("div", {
							className: "flex flex-col items-center gap-4",
							children: props.qrCodeDataUrl ? (0, import_jsx_runtime$29.jsx)("img", {
								src: props.qrCodeDataUrl,
								alt: "二维码",
								className: "h-auto w-75 rounded-xl"
							}) : (0, import_jsx_runtime$29.jsx)("div", {
								className: "flex justify-center items-center rounded-2xl bg-default-100 w-100 h-100",
								children: (0, import_jsx_runtime$29.jsx)("span", {
									className: "text-default-400",
									children: "二维码"
								})
							})
						})]
					})]
				})
			] })
		});
	};
	Dynamic_default = DouyinDynamic;
});
var FavoriteList_exports = __export({ DouyinFavoriteList: () => DouyinFavoriteList }, 1), import_jsx_runtime$28, DouyinFavoriteList, StatItem$4;
var init_FavoriteList = __esmMin(() => {
	init_date_fns();
	init_lucide_react();
	__toESM(require_react(), 1);
	init_ri();
	init_DefaultLayout();
	import_jsx_runtime$28 = __toESM(require_jsx_runtime(), 1);
	DouyinFavoriteList = (props) => {
		const glowColors = props.data.useDarkTheme ?? false ? {
			primary: "rgba(225, 29, 72, 0.15)",
			secondary: "rgba(20, 184, 166, 0.15)"
		} : {
			primary: "rgba(244, 63, 94, 0.25)",
			secondary: "rgba(20, 184, 166, 0.2)"
		};
		return (0, import_jsx_runtime$28.jsxs)(DefaultLayout, {
			...props,
			className: "relative overflow-hidden bg-default-50",
			children: [
				(0, import_jsx_runtime$28.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0",
					children: [(0, import_jsx_runtime$28.jsx)("div", {
						className: "absolute rounded-full w-full h-[60%] -top-[20%] -left-[20%] blur-[150px]",
						style: { background: glowColors.primary }
					}), (0, import_jsx_runtime$28.jsx)("div", {
						className: "absolute rounded-full w-full h-[60%] -bottom-[20%] -right-[20%] blur-[180px]",
						style: { background: glowColors.secondary }
					})]
				}),
				(0, import_jsx_runtime$28.jsx)("div", {
					className: "absolute inset-0 pointer-events-none z-10 mix-blend-overlay",
					children: (0, import_jsx_runtime$28.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$28.jsxs)("filter", {
							id: "noiseFilter",
							children: [(0, import_jsx_runtime$28.jsx)("feTurbulence", {
								type: "fractalNoise",
								baseFrequency: "0.8",
								numOctaves: "3",
								stitchTiles: "stitch"
							}), (0, import_jsx_runtime$28.jsx)("feColorMatrix", {
								type: "saturate",
								values: "0"
							})]
						}), (0, import_jsx_runtime$28.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#noiseFilter)"
						})]
					})
				}),
				(0, import_jsx_runtime$28.jsxs)("div", {
					className: "relative z-20 p-12 pb-0 grid grid-cols-12 gap-12 min-h-screen items-stretch",
					children: [(0, import_jsx_runtime$28.jsxs)("div", {
						className: "col-span-4 flex flex-col justify-between py-8",
						children: [
							(0, import_jsx_runtime$28.jsxs)("div", {
								className: "flex flex-col gap-1 select-none",
								children: [
									(0, import_jsx_runtime$28.jsx)("span", {
										className: "text-6xl font-black text-default-900/10 tracking-tighter leading-none",
										children: "LIKE"
									}),
									(0, import_jsx_runtime$28.jsx)("span", {
										className: "text-6xl font-black text-rose-500/20 tracking-tighter leading-none",
										children: "FAVORITE"
									}),
									(0, import_jsx_runtime$28.jsxs)("div", {
										className: "flex items-center gap-3 mt-2",
										children: [(0, import_jsx_runtime$28.jsx)("div", { className: "h-1.5 w-16 bg-rose-500 rounded-full" }), (0, import_jsx_runtime$28.jsx)("span", {
											className: "text-base text-default-400 font-mono tracking-widest uppercase",
											children: "Push Notification"
										})]
									})
								]
							}),
							(0, import_jsx_runtime$28.jsxs)("div", {
								className: "flex flex-col gap-10 relative",
								children: [
									(0, import_jsx_runtime$28.jsx)("div", { className: "absolute -left-8 top-10 w-16 h-16 rounded-full border-4 border-rose-300/30 animate-[bounce_4s_infinite]" }),
									(0, import_jsx_runtime$28.jsx)("div", { className: "absolute right-10 -top-4 w-6 h-6 rounded-full bg-orange-300/40" }),
									(0, import_jsx_runtime$28.jsxs)("div", {
										className: "relative w-fit self-center",
										children: [
											(0, import_jsx_runtime$28.jsx)("div", { className: "absolute -inset-8 bg-linear-to-br from-rose-400 to-orange-400 rounded-full blur-2xl opacity-40 animate-pulse" }),
											(0, import_jsx_runtime$28.jsx)("div", { className: "absolute -inset-4 rounded-full border-2 border-dashed border-rose-400/30 animate-[spin_10s_linear_infinite]" }),
											(0, import_jsx_runtime$28.jsx)("img", {
												src: props.data.liker_avatar,
												className: "relative w-64 h-64 rounded-full border-[6px] border-white object-cover shadow-2xl",
												alt: "Liker"
											}),
											(0, import_jsx_runtime$28.jsxs)("div", {
												className: "absolute -bottom-3 -right-3 bg-rose-500 text-white px-5 py-2 rounded-full border-[5px] border-white font-bold text-xl shadow-xl flex items-center gap-2",
												children: [(0, import_jsx_runtime$28.jsx)(RiHeart3Fill, { className: "w-5 h-5 fill-current" }), (0, import_jsx_runtime$28.jsx)("span", { children: "赞了" })]
											})
										]
									}),
									(0, import_jsx_runtime$28.jsxs)("div", {
										className: "flex flex-col items-center text-center",
										children: [
											(0, import_jsx_runtime$28.jsxs)("span", {
												className: "text-6xl font-black text-default-900 leading-tight relative",
												children: [props.data.liker_username, (0, import_jsx_runtime$28.jsx)("svg", {
													className: "absolute -right-8 -top-2 text-orange-400 w-8 h-8 opacity-60",
													viewBox: "0 0 24 24",
													fill: "currentColor",
													children: (0, import_jsx_runtime$28.jsx)("path", { d: "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" })
												})]
											}),
											(0, import_jsx_runtime$28.jsxs)("div", {
												className: "px-6 py-6 pt-0 rounded-full text-3xl text-default-500 font-mono",
												children: ["@", props.data.liker_douyin_id]
											}),
											(0, import_jsx_runtime$28.jsxs)("div", {
												className: "mt-6 flex flex-col items-center gap-2 text-rose-500",
												children: [(0, import_jsx_runtime$28.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [(0, import_jsx_runtime$28.jsx)(RiHeart3Fill, { className: "w-10 h-10 fill-current" }), (0, import_jsx_runtime$28.jsx)("span", {
														className: "text-4xl font-bold",
														children: "刚刚赞了这个作品"
													})]
												}), (0, import_jsx_runtime$28.jsx)("svg", {
													width: "200",
													height: "20",
													viewBox: "0 0 200 20",
													className: "opacity-60",
													children: (0, import_jsx_runtime$28.jsx)("path", {
														d: "M0 10 Q 50 20, 100 10 T 200 10",
														stroke: "currentColor",
														strokeWidth: "3",
														fill: "none",
														strokeLinecap: "round"
													})
												})]
											})
										]
									})
								]
							}),
							(0, import_jsx_runtime$28.jsxs)("div", {
								className: "flex flex-col gap-8 relative",
								children: [
									(0, import_jsx_runtime$28.jsx)("div", { className: "absolute left-4 bottom-4 w-32 h-32 bg-rose-500/5 rounded-2xl -z-10 rotate-12" }),
									(0, import_jsx_runtime$28.jsx)("div", { className: "h-px w-full bg-linear-to-r from-default-200 via-default-300 to-transparent" }),
									(0, import_jsx_runtime$28.jsxs)("div", {
										className: "flex items-end gap-6",
										children: [props.qrCodeDataUrl && (0, import_jsx_runtime$28.jsx)("img", {
											src: props.qrCodeDataUrl,
											className: "w-65 h-auto rounded-2xl mix-blend-multiply",
											alt: "QR"
										}), (0, import_jsx_runtime$28.jsxs)("div", {
											className: "flex flex-col justify-end h-56 pb-2",
											children: [
												(0, import_jsx_runtime$28.jsx)("span", {
													className: "text-default-400 text-sm font-mono mb-2",
													children: "SCAN TO VIEW"
												}),
												(0, import_jsx_runtime$28.jsx)("span", {
													className: "text-3xl font-bold text-default-700 leading-none",
													children: format(/* @__PURE__ */ new Date(), "HH:mm")
												}),
												(0, import_jsx_runtime$28.jsx)("span", {
													className: "text-lg text-default-400 font-medium",
													children: format(/* @__PURE__ */ new Date(), "yyyy.MM.dd")
												})
											]
										})]
									})
								]
							})
						]
					}), (0, import_jsx_runtime$28.jsx)("div", {
						className: "col-span-8 h-full",
						children: (0, import_jsx_runtime$28.jsxs)("div", {
							className: "h-full bg-default-50/60 backdrop-blur-xl rounded-[3rem] p-10 border border-default-200 flex flex-col gap-8 shadow-2xl relative overflow-hidden",
							children: [
								(0, import_jsx_runtime$28.jsxs)("div", {
									className: "flex items-center justify-between z-10",
									children: [(0, import_jsx_runtime$28.jsxs)("div", {
										className: "flex items-center gap-6 flex-1 min-w-0 mr-6",
										children: [(0, import_jsx_runtime$28.jsx)("img", {
											src: props.data.author_avatar,
											className: "w-24 h-24 rounded-full border-2 border-default-100 shadow-md shrink-0",
											alt: "Author"
										}), (0, import_jsx_runtime$28.jsxs)("div", {
											className: "flex flex-col gap-1 min-w-0",
											children: [(0, import_jsx_runtime$28.jsx)("span", {
												className: "text-4xl font-bold text-default-800 truncate",
												title: props.data.author_username,
												children: props.data.author_username
											}), (0, import_jsx_runtime$28.jsxs)("span", {
												className: "text-xl text-default-400 font-mono truncate",
												children: ["抖音号: ", props.data.author_douyin_id]
											})]
										})]
									}), (0, import_jsx_runtime$28.jsxs)("div", {
										className: "px-6 py-3 bg-default-100/80 backdrop-blur-md rounded-full text-default-500 font-medium text-lg shrink-0",
										children: ["发布于 ", props.data.create_time.split(" ")[0]]
									})]
								}),
								(0, import_jsx_runtime$28.jsxs)("div", {
									className: "flex-1 relative rounded-[2.5rem] overflow-hidden group shadow-inner bg-black/5",
									children: [(0, import_jsx_runtime$28.jsx)("img", {
										src: props.data.image_url,
										className: "w-full h-full object-cover transition-transform duration-700",
										alt: "Cover"
									}), (0, import_jsx_runtime$28.jsx)("div", {
										className: "absolute inset-x-0 bottom-0 pt-40 pb-12 px-12 bg-linear-to-t from-black/90 via-black/50 to-transparent",
										children: (0, import_jsx_runtime$28.jsxs)("div", {
											className: "flex gap-6 items-start",
											children: [(0, import_jsx_runtime$28.jsx)(Quote, {
												size: 48,
												className: "text-rose-500/90 shrink-0 rotate-180 mt-2"
											}), (0, import_jsx_runtime$28.jsx)("div", {
												className: "text-white text-4xl font-medium leading-relaxed line-clamp-3 drop-shadow-lg tracking-wide",
												dangerouslySetInnerHTML: { __html: props.data.desc || "分享视频" }
											})]
										})
									})]
								}),
								(0, import_jsx_runtime$28.jsxs)("div", {
									className: "grid grid-cols-5 gap-6 z-10",
									children: [
										(0, import_jsx_runtime$28.jsx)(StatItem$4, {
											icon: RiHeart3Fill,
											value: props.data.dianzan,
											iconClassName: "text-rose-500/80"
										}),
										(0, import_jsx_runtime$28.jsx)(StatItem$4, {
											icon: RiThumbUpFill,
											value: props.data.tuijian
										}),
										(0, import_jsx_runtime$28.jsx)(StatItem$4, {
											icon: RiMessage3Fill,
											value: props.data.pinglun
										}),
										(0, import_jsx_runtime$28.jsx)(StatItem$4, {
											icon: RiStarFill,
											value: props.data.shouchang
										}),
										(0, import_jsx_runtime$28.jsx)(StatItem$4, {
											icon: RiShareForwardFill,
											value: props.data.share
										})
									]
								})
							]
						})
					})]
				})
			]
		});
	};
	StatItem$4 = ({ icon: Icon, value, iconClassName }) => (0, import_jsx_runtime$28.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-2 py-6 rounded-3xl bg-default-100",
		children: [(0, import_jsx_runtime$28.jsx)(Icon, { className: `w-12 h-12 fill-current opacity-90 ${iconClassName || "text-default-400"}` }), (0, import_jsx_runtime$28.jsx)("span", {
			className: "text-2xl font-bold text-default-600 mt-1",
			children: value
		})]
	});
});
var RecommendList_exports = __export({ DouyinRecommendList: () => DouyinRecommendList }, 1), import_jsx_runtime$27, DouyinRecommendList, StatItem$3;
var init_RecommendList = __esmMin(() => {
	init_date_fns();
	init_lucide_react();
	__toESM(require_react(), 1);
	init_ri();
	init_DefaultLayout();
	import_jsx_runtime$27 = __toESM(require_jsx_runtime(), 1);
	DouyinRecommendList = (props) => {
		const glowColors = props.data.useDarkTheme ?? false ? {
			primary: "rgba(16, 185, 129, 0.15)",
			secondary: "rgba(59, 130, 246, 0.15)"
		} : {
			primary: "rgba(34, 197, 94, 0.25)",
			secondary: "rgba(59, 130, 246, 0.25)"
		};
		return (0, import_jsx_runtime$27.jsxs)(DefaultLayout, {
			...props,
			className: "relative overflow-hidden bg-default-50",
			children: [
				(0, import_jsx_runtime$27.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0",
					children: [(0, import_jsx_runtime$27.jsx)("div", {
						className: "absolute rounded-full w-full h-[60%] -top-[20%] -left-[20%] blur-[150px]",
						style: { background: glowColors.primary }
					}), (0, import_jsx_runtime$27.jsx)("div", {
						className: "absolute rounded-full w-full h-[60%] -bottom-[20%] -right-[20%] blur-[180px]",
						style: { background: glowColors.secondary }
					})]
				}),
				(0, import_jsx_runtime$27.jsx)("div", {
					className: "absolute inset-0 pointer-events-none z-10 mix-blend-overlay",
					children: (0, import_jsx_runtime$27.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$27.jsxs)("filter", {
							id: "noiseFilter",
							children: [(0, import_jsx_runtime$27.jsx)("feTurbulence", {
								type: "fractalNoise",
								baseFrequency: "0.8",
								numOctaves: "3",
								stitchTiles: "stitch"
							}), (0, import_jsx_runtime$27.jsx)("feColorMatrix", {
								type: "saturate",
								values: "0"
							})]
						}), (0, import_jsx_runtime$27.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#noiseFilter)"
						})]
					})
				}),
				(0, import_jsx_runtime$27.jsxs)("div", {
					className: "relative z-20 p-12 pb-0 grid grid-cols-12 gap-12 min-h-screen items-stretch",
					children: [(0, import_jsx_runtime$27.jsxs)("div", {
						className: "col-span-4 flex flex-col justify-between py-8",
						children: [
							(0, import_jsx_runtime$27.jsxs)("div", {
								className: "flex flex-col gap-1 select-none",
								children: [
									(0, import_jsx_runtime$27.jsx)("span", {
										className: "text-6xl font-black text-default-900/10 tracking-tighter leading-none",
										children: "DOUYIN"
									}),
									(0, import_jsx_runtime$27.jsx)("span", {
										className: "text-6xl font-black text-emerald-500/20 tracking-tighter leading-none",
										children: "RECOMMEND"
									}),
									(0, import_jsx_runtime$27.jsxs)("div", {
										className: "flex items-center gap-3 mt-2",
										children: [(0, import_jsx_runtime$27.jsx)("div", { className: "h-1.5 w-16 bg-emerald-500 rounded-full" }), (0, import_jsx_runtime$27.jsx)("span", {
											className: "text-base text-default-400 font-mono tracking-widest uppercase",
											children: "Push Notification"
										})]
									})
								]
							}),
							(0, import_jsx_runtime$27.jsxs)("div", {
								className: "flex flex-col gap-10 relative",
								children: [
									(0, import_jsx_runtime$27.jsx)("div", { className: "absolute -left-8 top-10 w-16 h-16 rounded-full border-4 border-emerald-300/30 animate-[bounce_4s_infinite]" }),
									(0, import_jsx_runtime$27.jsx)("div", { className: "absolute right-10 -top-4 w-6 h-6 rounded-full bg-blue-300/40" }),
									(0, import_jsx_runtime$27.jsxs)("div", {
										className: "relative w-fit self-center",
										children: [
											(0, import_jsx_runtime$27.jsx)("div", { className: "absolute -inset-8 bg-linear-to-br from-emerald-400 to-blue-400 rounded-full blur-2xl opacity-40 animate-pulse" }),
											(0, import_jsx_runtime$27.jsx)("div", { className: "absolute -inset-4 rounded-full border-2 border-dashed border-emerald-400/30 animate-[spin_10s_linear_infinite]" }),
											(0, import_jsx_runtime$27.jsx)("img", {
												src: props.data.recommender_avatar,
												className: "relative w-64 h-64 rounded-full border-[6px] border-white object-cover shadow-2xl",
												alt: "Recommender"
											}),
											(0, import_jsx_runtime$27.jsxs)("div", {
												className: "absolute -bottom-3 -right-3 bg-emerald-500 text-white px-5 py-2 rounded-full border-[5px] border-white font-bold text-xl shadow-xl flex items-center gap-2",
												children: [(0, import_jsx_runtime$27.jsx)(RiThumbUpFill, { className: "w-5 h-5 fill-current" }), (0, import_jsx_runtime$27.jsx)("span", { children: "推荐" })]
											})
										]
									}),
									(0, import_jsx_runtime$27.jsxs)("div", {
										className: "flex flex-col items-center text-center",
										children: [
											(0, import_jsx_runtime$27.jsxs)("span", {
												className: "text-6xl font-black text-default-900 leading-tight relative",
												children: [props.data.recommender_username, (0, import_jsx_runtime$27.jsx)("svg", {
													className: "absolute -right-8 -top-2 text-blue-400 w-8 h-8 opacity-60",
													viewBox: "0 0 24 24",
													fill: "currentColor",
													children: (0, import_jsx_runtime$27.jsx)("path", { d: "M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" })
												})]
											}),
											(0, import_jsx_runtime$27.jsxs)("div", {
												className: "px-6 py-6 pt-0 rounded-full text-2xl text-default-500 font-mono",
												children: ["@", props.data.recommender_douyin_id]
											}),
											(0, import_jsx_runtime$27.jsxs)("div", {
												className: "mt-6 flex flex-col items-center gap-2 text-emerald-500",
												children: [(0, import_jsx_runtime$27.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [(0, import_jsx_runtime$27.jsx)(RiThumbUpFill, { className: "w-10 h-10 fill-current" }), (0, import_jsx_runtime$27.jsx)("span", {
														className: "text-4xl font-bold",
														children: "刚刚推荐了这个作品"
													})]
												}), (0, import_jsx_runtime$27.jsx)("svg", {
													width: "200",
													height: "20",
													viewBox: "0 0 200 20",
													className: "opacity-60",
													children: (0, import_jsx_runtime$27.jsx)("path", {
														d: "M0 10 Q 50 20, 100 10 T 200 10",
														stroke: "currentColor",
														strokeWidth: "3",
														fill: "none",
														strokeLinecap: "round"
													})
												})]
											})
										]
									})
								]
							}),
							(0, import_jsx_runtime$27.jsxs)("div", {
								className: "flex flex-col gap-8 relative",
								children: [
									(0, import_jsx_runtime$27.jsx)("div", { className: "absolute left-4 bottom-4 w-32 h-32 bg-emerald-500/5 rounded-2xl -z-10 rotate-12" }),
									(0, import_jsx_runtime$27.jsx)("div", { className: "h-px w-full bg-linear-to-r from-default-200 via-default-300 to-transparent" }),
									(0, import_jsx_runtime$27.jsxs)("div", {
										className: "flex items-end gap-6",
										children: [props.qrCodeDataUrl && (0, import_jsx_runtime$27.jsx)("img", {
											src: props.qrCodeDataUrl,
											className: "w-65 h-auto rounded-2xl mix-blend-multiply",
											alt: "QR"
										}), (0, import_jsx_runtime$27.jsxs)("div", {
											className: "flex flex-col justify-end h-56 pb-2",
											children: [
												(0, import_jsx_runtime$27.jsx)("span", {
													className: "text-default-400 text-sm font-mono mb-2",
													children: "SCAN TO VIEW"
												}),
												(0, import_jsx_runtime$27.jsx)("span", {
													className: "text-3xl font-bold text-default-700 leading-none",
													children: format(/* @__PURE__ */ new Date(), "HH:mm")
												}),
												(0, import_jsx_runtime$27.jsx)("span", {
													className: "text-lg text-default-400 font-medium",
													children: format(/* @__PURE__ */ new Date(), "yyyy.MM.dd")
												})
											]
										})]
									})
								]
							})
						]
					}), (0, import_jsx_runtime$27.jsx)("div", {
						className: "col-span-8 h-full",
						children: (0, import_jsx_runtime$27.jsxs)("div", {
							className: "h-full bg-default-50/60 backdrop-blur-xl rounded-[3rem] p-10 border border-default-200 flex flex-col gap-8 shadow-2xl relative overflow-hidden",
							children: [
								(0, import_jsx_runtime$27.jsxs)("div", {
									className: "flex items-center justify-between z-10",
									children: [(0, import_jsx_runtime$27.jsxs)("div", {
										className: "flex items-center gap-6 flex-1 min-w-0 mr-6",
										children: [(0, import_jsx_runtime$27.jsx)("img", {
											src: props.data.author_avatar,
											className: "w-24 h-24 rounded-full border-2 border-default-100 shadow-md shrink-0",
											alt: "Author"
										}), (0, import_jsx_runtime$27.jsxs)("div", {
											className: "flex flex-col gap-1 min-w-0",
											children: [(0, import_jsx_runtime$27.jsx)("span", {
												className: "text-4xl font-bold text-default-800 truncate",
												title: props.data.author_username,
												children: props.data.author_username
											}), (0, import_jsx_runtime$27.jsxs)("span", {
												className: "text-xl text-default-400 font-mono truncate",
												children: ["抖音号: ", props.data.author_douyin_id]
											})]
										})]
									}), (0, import_jsx_runtime$27.jsxs)("div", {
										className: "px-6 py-3 bg-default-100/80 backdrop-blur-md rounded-full text-default-500 font-medium text-lg shrink-0",
										children: ["发布于 ", props.data.create_time.split(" ")[0]]
									})]
								}),
								(0, import_jsx_runtime$27.jsxs)("div", {
									className: "flex-1 relative rounded-[2.5rem] overflow-hidden group shadow-inner bg-black/5",
									children: [(0, import_jsx_runtime$27.jsx)("img", {
										src: props.data.image_url,
										className: "w-full h-full object-cover transition-transform duration-700",
										alt: "Cover"
									}), (0, import_jsx_runtime$27.jsx)("div", {
										className: "absolute inset-x-0 bottom-0 pt-40 pb-12 px-12 bg-linear-to-t from-black/90 via-black/50 to-transparent",
										children: (0, import_jsx_runtime$27.jsxs)("div", {
											className: "flex gap-6 items-start",
											children: [(0, import_jsx_runtime$27.jsx)(Quote, {
												size: 48,
												className: "text-emerald-500/90 shrink-0 rotate-180 mt-2"
											}), (0, import_jsx_runtime$27.jsx)("div", {
												className: "text-white text-4xl font-medium leading-relaxed line-clamp-3 drop-shadow-lg tracking-wide",
												dangerouslySetInnerHTML: { __html: props.data.desc || "分享视频" }
											})]
										})
									})]
								}),
								(0, import_jsx_runtime$27.jsxs)("div", {
									className: "grid grid-cols-5 gap-6 z-10",
									children: [
										(0, import_jsx_runtime$27.jsx)(StatItem$3, {
											icon: RiHeart3Fill,
											value: props.data.dianzan
										}),
										(0, import_jsx_runtime$27.jsx)(StatItem$3, {
											icon: RiThumbUpFill,
											value: props.data.tuijian,
											iconClassName: "text-emerald-500/80"
										}),
										(0, import_jsx_runtime$27.jsx)(StatItem$3, {
											icon: RiMessage3Fill,
											value: props.data.pinglun
										}),
										(0, import_jsx_runtime$27.jsx)(StatItem$3, {
											icon: RiStarFill,
											value: props.data.shouchang
										}),
										(0, import_jsx_runtime$27.jsx)(StatItem$3, {
											icon: RiShareForwardFill,
											value: props.data.share
										})
									]
								})
							]
						})
					})]
				})
			]
		});
	};
	StatItem$3 = ({ icon: Icon, value, iconClassName }) => (0, import_jsx_runtime$27.jsxs)("div", {
		className: "flex flex-col items-center justify-center gap-2 py-6 rounded-3xl bg-default-100",
		children: [(0, import_jsx_runtime$27.jsx)(Icon, { className: `w-12 h-12 fill-current opacity-90 ${iconClassName || "text-default-400"}` }), (0, import_jsx_runtime$27.jsx)("span", {
			className: "text-2xl font-bold text-default-600 mt-1",
			children: value
		})]
	});
});
var Live_exports = __export({
	DouyinLive: () => DouyinLive,
	default: () => Live_default
}, 1), import_jsx_runtime$26, CoverSection, UserInfoSection, QRCodeSection$2, DouyinLive, Live_default;
var init_Live = __esmMin(() => {
	init_lucide_react();
	__toESM(require_react(), 1);
	init_DefaultLayout();
	import_jsx_runtime$26 = __toESM(require_jsx_runtime(), 1);
	CoverSection = ({ imageUrl }) => (0, import_jsx_runtime$26.jsx)("div", {
		className: "py-10",
		children: (0, import_jsx_runtime$26.jsx)("div", {
			className: "flex flex-col items-center",
			children: (0, import_jsx_runtime$26.jsx)("div", {
				className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[95%] flex-1 relative",
				children: (0, import_jsx_runtime$26.jsx)("img", {
					className: "rounded-[25px] object-contain w-full h-full select-text",
					src: imageUrl,
					alt: "封面"
				})
			})
		})
	});
	UserInfoSection = ({ avater_url, username, fans }) => (0, import_jsx_runtime$26.jsxs)("div", {
		className: "flex gap-10 items-center pr-20",
		children: [(0, import_jsx_runtime$26.jsx)("img", {
			src: avater_url,
			alt: "头像",
			className: "mr-3.75 rounded-full h-auto w-32.5 select-text"
		}), (0, import_jsx_runtime$26.jsxs)("div", {
			className: "flex flex-col items-start",
			children: [(0, import_jsx_runtime$26.jsxs)("div", {
				className: "flex flex-row items-center mb-1.25",
				children: [
					(0, import_jsx_runtime$26.jsx)("div", {
						className: "text-[60px] text-foreground select-text",
						children: (0, import_jsx_runtime$26.jsx)("span", { children: username })
					}),
					(0, import_jsx_runtime$26.jsx)("div", { className: "w-4" }),
					(0, import_jsx_runtime$26.jsx)("img", {
						className: "w-42.5 h-auto select-text",
						src: "/image/douyin/抖音-直播中.png",
						alt: "直播中"
					})
				]
			}), (0, import_jsx_runtime$26.jsxs)("div", {
				className: "flex gap-2 items-center",
				children: [(0, import_jsx_runtime$26.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$26.jsxs)("span", {
					className: "text-default-500 text-[35px] select-text",
					children: [fans, "粉丝"]
				})]
			})]
		})]
	});
	QRCodeSection$2 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$26.jsxs)("div", {
		className: "flex flex-col-reverse items-center mt-7.5 mr-5",
		children: [(0, import_jsx_runtime$26.jsxs)("div", {
			className: "flex items-center gap-2 text-[50px] ml-2.5 text-right mr-2.5 text-foreground select-text",
			children: [(0, import_jsx_runtime$26.jsx)(QrCode, { className: "w-12 h-12" }), (0, import_jsx_runtime$26.jsx)("span", { children: "直播分享链接" })]
		}), (0, import_jsx_runtime$26.jsx)("div", {
			className: "p-2.5 rounded-[2%] border-[7px] border-dashed border-default-300",
			children: (0, import_jsx_runtime$26.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-87.5 select-text"
			})
		})]
	});
	DouyinLive = (props) => {
		const { qrCodeDataUrl } = props;
		return (0, import_jsx_runtime$26.jsxs)(DefaultLayout, {
			...props,
			children: [(0, import_jsx_runtime$26.jsx)(CoverSection, { imageUrl: props.data.image_url }), (0, import_jsx_runtime$26.jsxs)("div", {
				className: "flex flex-col px-20",
				children: [
					(0, import_jsx_runtime$26.jsx)("div", { className: "h-2.5" }),
					(0, import_jsx_runtime$26.jsx)("div", {
						className: "text-[65px] items-center tracking-[1.5px] relative wrap-break-word font-bold text-foreground select-text",
						children: props.data.text
					}),
					(0, import_jsx_runtime$26.jsx)("div", { className: "h-2.5" }),
					(0, import_jsx_runtime$26.jsx)("div", {
						className: "text-[45px] items-center tracking-[1.5px] relative wrap-break-word text-default-500 select-text",
						children: props.data.liveinf
					}),
					(0, import_jsx_runtime$26.jsxs)("div", {
						className: "flex items-center gap-6 text-[45px] tracking-[1.5px] relative wrap-break-word text-default-500 select-text",
						children: [
							(0, import_jsx_runtime$26.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$26.jsx)(Eye, { className: "w-11 h-11 text-view" }), (0, import_jsx_runtime$26.jsxs)("span", { children: ["观看总人数", props.data.总观看次数] })]
							}),
							(0, import_jsx_runtime$26.jsx)("span", { children: "|" }),
							(0, import_jsx_runtime$26.jsxs)("div", {
								className: "flex gap-2 items-center",
								children: [(0, import_jsx_runtime$26.jsx)(Users, { className: "w-11 h-11 text-follow" }), (0, import_jsx_runtime$26.jsxs)("span", { children: ["在线观众", props.data.在线观众] })]
							})
						]
					}),
					(0, import_jsx_runtime$26.jsx)("div", { className: "h-20" }),
					(0, import_jsx_runtime$26.jsx)(UserInfoSection, {
						avater_url: props.data.avater_url,
						username: props.data.username,
						fans: props.data.fans,
						useDarkTheme: props.data.useDarkTheme
					}),
					(0, import_jsx_runtime$26.jsx)("div", { className: "h-30" }),
					(0, import_jsx_runtime$26.jsxs)("div", {
						className: "flex flex-col w-auto h-full",
						children: [(0, import_jsx_runtime$26.jsxs)("div", {
							className: "w-inherit text-[70px] text-right mr-5 -mb-11.25 z-[-1] text-foreground select-text",
							children: ["抖音", props.data.dynamicTYPE]
						}), (0, import_jsx_runtime$26.jsxs)("div", {
							className: "h-auto flex justify-between pt-15 items-center",
							children: [(0, import_jsx_runtime$26.jsx)("div", {
								className: "flex flex-col ml-11.25",
								children: (0, import_jsx_runtime$26.jsxs)("div", {
									className: "flex flex-col justify-start items-start",
									children: [(0, import_jsx_runtime$26.jsx)("div", {
										className: "w-[130%] h-61.25 mb-13 bg-cover bg-center bg-fixed",
										style: { backgroundImage: `url(/image/douyin/${props.data.useDarkTheme ? "dylogo-light" : "dylogo-dark"}.svg)` }
									}), (0, import_jsx_runtime$26.jsx)("div", {
										className: "flex flex-col items-start",
										children: (0, import_jsx_runtime$26.jsx)("div", {
											className: "text-[50px] tracking-[10px] text-foreground select-text",
											children: "抖音 记录美好生活"
										})
									})]
								})
							}), (0, import_jsx_runtime$26.jsx)(QRCodeSection$2, {
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
}, 1), import_jsx_runtime$25, DouyinHeader, MusicCoverSection, MusicInfoSection, MusicAuthorInfoSection, MusicQRCodeSection, DouyinMusicInfo, MusicInfo_default;
var init_MusicInfo = __esmMin(() => {
	init_lucide_react();
	__toESM(require_react(), 1);
	init_lu();
	init_DefaultLayout();
	import_jsx_runtime$25 = __toESM(require_jsx_runtime(), 1);
	DouyinHeader = ({ useDarkTheme }) => (0, import_jsx_runtime$25.jsxs)("div", {
		className: "flex items-center px-12 py-15",
		children: [(0, import_jsx_runtime$25.jsx)("div", {
			className: "w-[39%] h-50 bg-cover bg-center bg-fixed",
			children: (0, import_jsx_runtime$25.jsx)("img", {
				src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
				alt: "抖音Logo",
				className: "object-contain w-full h-full select-text"
			})
		}), (0, import_jsx_runtime$25.jsx)("span", {
			className: "text-[65px] ml-4 text-foreground select-text",
			children: "记录美好生活"
		})]
	});
	MusicCoverSection = ({ imageUrl }) => (0, import_jsx_runtime$25.jsx)("div", {
		className: "flex flex-col items-center my-5",
		children: (0, import_jsx_runtime$25.jsx)("div", {
			className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative",
			children: (0, import_jsx_runtime$25.jsx)("img", {
				className: "rounded-[25px] object-contain w-full h-full select-text",
				src: imageUrl,
				alt: "音乐封面"
			})
		})
	});
	MusicInfoSection = ({ desc, musicId, userCount, createTime }) => (0, import_jsx_runtime$25.jsxs)("div", {
		className: "flex flex-col px-16 py-5",
		children: [
			(0, import_jsx_runtime$25.jsx)("div", {
				className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
				style: {
					letterSpacing: "1.5px",
					wordWrap: "break-word"
				},
				dangerouslySetInnerHTML: { __html: desc }
			}),
			(0, import_jsx_runtime$25.jsxs)("div", {
				className: "flex flex-col gap-2 text-[45px] text-default-500 font-light mb-2.5",
				children: [(0, import_jsx_runtime$25.jsxs)("div", {
					className: "flex gap-2 items-center select-text",
					children: [(0, import_jsx_runtime$25.jsx)(Music, { className: "w-11 h-11" }), (0, import_jsx_runtime$25.jsxs)("span", { children: ["音乐ID: ", musicId] })]
				}), (0, import_jsx_runtime$25.jsxs)("div", {
					className: "flex gap-2 items-center select-text",
					children: [(0, import_jsx_runtime$25.jsx)(Users, { className: "w-11 h-11 text-follow" }), (0, import_jsx_runtime$25.jsxs)("span", { children: [userCount, " 人使用过"] })]
				})]
			}),
			(0, import_jsx_runtime$25.jsxs)("div", {
				className: "flex items-center gap-2 text-[45px] text-default-500 font-light select-text",
				children: [(0, import_jsx_runtime$25.jsx)(LuFullscreen, { className: "w-11 h-11 text-time" }), (0, import_jsx_runtime$25.jsxs)("span", { children: ["图片生成于: ", createTime] })]
			})
		]
	});
	MusicAuthorInfoSection = ({ avatarUrl, username, userShortId, totalFavorited, followingCount, fans }) => (0, import_jsx_runtime$25.jsxs)("div", {
		className: "flex flex-col pl-16",
		children: [(0, import_jsx_runtime$25.jsxs)("div", {
			className: "flex items-center mb-6",
			children: [(0, import_jsx_runtime$25.jsx)("img", {
				src: avatarUrl,
				alt: "头像",
				className: "w-50 h-50 rounded-full mr-7 shadow-large select-text"
			}), (0, import_jsx_runtime$25.jsx)("div", {
				className: "flex flex-col",
				children: (0, import_jsx_runtime$25.jsx)("span", {
					className: "text-[80px] font-bold text-foreground select-text",
					children: username
				})
			})]
		}), (0, import_jsx_runtime$25.jsxs)("div", {
			className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground select-text",
			style: { letterSpacing: "2.5px" },
			children: [
				(0, import_jsx_runtime$25.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$25.jsx)(Hash, { className: "w-8 h-8" }), (0, import_jsx_runtime$25.jsxs)("span", { children: ["ID: ", userShortId] })]
				}),
				(0, import_jsx_runtime$25.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$25.jsx)(Heart, { className: "w-8 h-8 text-like" }), (0, import_jsx_runtime$25.jsxs)("span", { children: ["获赞: ", totalFavorited] })]
				}),
				(0, import_jsx_runtime$25.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$25.jsx)(UserPlus, { className: "w-8 h-8" }), (0, import_jsx_runtime$25.jsxs)("span", { children: ["关注: ", followingCount] })]
				}),
				(0, import_jsx_runtime$25.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [(0, import_jsx_runtime$25.jsx)(Users, { className: "w-8 h-8 text-follow" }), (0, import_jsx_runtime$25.jsxs)("span", { children: ["粉丝: ", fans] })]
				})
			]
		})]
	});
	MusicQRCodeSection = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$25.jsxs)("div", {
		className: "flex flex-col-reverse items-center -mb-12 mr-18",
		children: [(0, import_jsx_runtime$25.jsxs)("div", {
			className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text",
			children: [(0, import_jsx_runtime$25.jsx)(QrCode, { className: "w-11 h-11" }), (0, import_jsx_runtime$25.jsx)("span", { children: "文件直链：永久有效" })]
		}), (0, import_jsx_runtime$25.jsx)("div", {
			className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300",
			children: (0, import_jsx_runtime$25.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "w-87.5 h-87.5 select-text"
			})
		})]
	});
	DouyinMusicInfo = (props) => {
		const { data, qrCodeDataUrl } = props;
		return (0, import_jsx_runtime$25.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$25.jsxs)("div", { children: [
				(0, import_jsx_runtime$25.jsx)(DouyinHeader, { useDarkTheme: data.useDarkTheme }),
				(0, import_jsx_runtime$25.jsx)(MusicCoverSection, {
					imageUrl: data.image_url,
					description: data.desc,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$25.jsx)("div", { className: "h-22.5" }),
				(0, import_jsx_runtime$25.jsx)(MusicInfoSection, {
					desc: data.desc,
					musicId: data.music_id,
					userCount: data.user_count,
					createTime: data.create_time,
					useDarkTheme: data.useDarkTheme
				}),
				(0, import_jsx_runtime$25.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$25.jsx)("div", {
					className: "text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-500 select-text",
					children: "抖音音乐信息"
				}),
				(0, import_jsx_runtime$25.jsxs)("div", {
					className: "flex justify-between items-center px-0 pt-25",
					children: [(0, import_jsx_runtime$25.jsx)(MusicAuthorInfoSection, {
						avatarUrl: data.avater_url,
						username: data.username,
						userShortId: data.user_shortid,
						totalFavorited: data.total_favorited,
						followingCount: data.following_count,
						fans: data.fans,
						useDarkTheme: data.useDarkTheme
					}), (0, import_jsx_runtime$25.jsx)(MusicQRCodeSection, {
						qrCodeDataUrl,
						useDarkTheme: data.useDarkTheme
					})]
				})
			] })
		});
	};
	MusicInfo_default = DouyinMusicInfo;
});
var UserVideoList_exports = __export({ DouyinUserVideoList: () => DouyinUserVideoList }, 1);
var import_react$26, import_jsx_runtime$24, formatCount, formatDuration$1, VideoCard, DouyinUserVideoList;
var init_UserVideoList = __esmMin(() => {
	init_date_fns();
	init_locale();
	import_react$26 = __toESM(require_react(), 1);
	init_ai();
	init_fa6();
	init_ri();
	init_DefaultLayout();
	import_jsx_runtime$24 = __toESM(require_jsx_runtime(), 1);
	formatCount = (count) => {
		if (count >= 1e8) return (count / 1e8).toFixed(1) + "亿";
		if (count >= 1e4) return (count / 1e4).toFixed(1) + "万";
		return count.toString();
	};
	formatDuration$1 = (milliseconds) => {
		const seconds = Math.floor(milliseconds / 1e3);
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
	VideoCard = ({ video }) => {
		const [titleLineCount, setTitleLineCount] = import_react$26.useState(2);
		const titleRef = import_react$26.useRef(null);
		import_react$26.useEffect(() => {
			if (titleRef.current) setTitleLineCount(Math.ceil(titleRef.current.clientHeight / parseInt(window.getComputedStyle(titleRef.current).lineHeight)));
		}, [video.title]);
		return (0, import_jsx_runtime$24.jsxs)("div", {
			className: "bg-default-100 rounded-3xl overflow-hidden flex flex-col h-full",
			children: [(0, import_jsx_runtime$24.jsxs)("div", {
				className: "relative bg-default-900 overflow-hidden",
				style: { aspectRatio: "3 / 4" },
				children: [
					(0, import_jsx_runtime$24.jsx)("img", {
						src: video.cover,
						alt: video.title,
						className: "w-full h-full object-cover"
					}),
					(0, import_jsx_runtime$24.jsxs)("div", {
						className: "absolute top-4 right-4 flex flex-col gap-2",
						children: [(0, import_jsx_runtime$24.jsx)("div", {
							className: "px-6 py-4 rounded-2xl text-4xl bg-white/50 text-black backdrop-blur-xs shadow-lg",
							children: video.is_video ? "视频" : "图集"
						}), video.is_top && (0, import_jsx_runtime$24.jsx)("div", {
							className: "px-6 py-4 rounded-2xl text-4xl bg-warning-500 text-black backdrop-blur-xs shadow-lg",
							children: "置顶"
						})]
					}),
					video.is_video && (0, import_jsx_runtime$24.jsx)("div", {
						className: "absolute bottom-4 right-4 px-8 py-3 rounded-2xl text-4xl bg-white/50 text-black backdrop-blur-xs shadow-lg",
						children: formatDuration$1(video.duration)
					}),
					video.music && (0, import_jsx_runtime$24.jsxs)("div", {
						className: "absolute bottom-4 left-4 flex items-center gap-2 px-6 py-3 rounded-2xl text-xl bg-white/50 text-black backdrop-blur-xs shadow-lg",
						children: [(0, import_jsx_runtime$24.jsx)("span", { children: "♫" }), (0, import_jsx_runtime$24.jsx)("span", {
							className: "max-w-80 truncate",
							children: video.music.title
						})]
					})
				]
			}), (0, import_jsx_runtime$24.jsxs)("div", {
				className: "p-4 px-8 pb-8 flex flex-col flex-1",
				children: [
					(0, import_jsx_runtime$24.jsx)("h3", {
						ref: titleRef,
						className: "text-4xl font-semibold text-default-900 line-clamp-2 my-2",
						children: video.title || "无标题"
					}),
					(0, import_jsx_runtime$24.jsx)("p", {
						className: "text-3xl text-default-600 mb-8",
						children: formatDistanceToNow(/* @__PURE__ */ new Date(video.create_time * 1e3), {
							locale: zhCN,
							addSuffix: true
						})
					}),
					(0, import_jsx_runtime$24.jsx)("div", {
						className: titleLineCount < 2 ? "mt-auto" : "",
						children: (0, import_jsx_runtime$24.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-3xl",
							children: [
								(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-center gap-2 text-default-600",
									children: [(0, import_jsx_runtime$24.jsx)(AiFillHeart, { size: 34 }), (0, import_jsx_runtime$24.jsx)("span", { children: formatCount(video.statistics.like_count) })]
								}),
								(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-center gap-2 text-default-600",
									children: [(0, import_jsx_runtime$24.jsx)(FaCommentDots, { size: 34 }), (0, import_jsx_runtime$24.jsx)("span", { children: formatCount(video.statistics.comment_count) })]
								}),
								(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-center gap-2 text-default-600",
									children: [(0, import_jsx_runtime$24.jsx)(AiFillStar, { size: 34 }), (0, import_jsx_runtime$24.jsx)("span", { children: formatCount(video.statistics.collect_count) })]
								}),
								(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-center gap-2 text-default-600",
									children: [(0, import_jsx_runtime$24.jsx)(RiShareForwardFill, { size: 34 }), (0, import_jsx_runtime$24.jsx)("span", { children: formatCount(video.statistics.share_count) })]
								})
							]
						})
					})
				]
			})]
		});
	};
	DouyinUserVideoList = (prpos) => (0, import_jsx_runtime$24.jsxs)(DefaultLayout, {
		...prpos,
		children: [prpos.data.user.head_image && (0, import_jsx_runtime$24.jsxs)("div", {
			className: "relative w-full overflow-hidden",
			children: [(0, import_jsx_runtime$24.jsx)("img", {
				src: prpos.data.user.head_image,
				alt: "头部背景",
				className: "w-full h-auto object-cover"
			}), (0, import_jsx_runtime$24.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-transparent via-default-50/40 to-default-50" })]
		}), (0, import_jsx_runtime$24.jsx)("div", {
			className: "flex justify-center",
			children: (0, import_jsx_runtime$24.jsxs)("div", {
				className: "px-20",
				children: [(0, import_jsx_runtime$24.jsxs)("div", {
					className: `bg-default-100/60 backdrop-blur-xl mb-30 rounded-4xl p-10 relative ${prpos.data.user.head_image ? "-mt-170" : "mt-35"}`,
					children: [(0, import_jsx_runtime$24.jsxs)("div", {
						className: "flex items-start gap-8 pb-8 border-b border-default-200 mb-8",
						children: [(0, import_jsx_runtime$24.jsx)("img", {
							src: prpos.data.user.avatar,
							alt: prpos.data.user.nickname,
							className: "w-45 h-auto rounded-2xl object-cover shrink-0"
						}), (0, import_jsx_runtime$24.jsxs)("div", {
							className: "flex-1",
							children: [
								(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex items-center gap-3 mb-4",
									children: [(0, import_jsx_runtime$24.jsx)("h1", {
										className: "text-6xl font-bold text-default-900",
										children: prpos.data.user.nickname
									}), prpos.data.user.verified && (0, import_jsx_runtime$24.jsx)("span", {
										className: "text-4xl text-primary-500",
										children: "✓"
									})]
								}),
								(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex gap-6 mb-6 text-2xl text-default-500",
									children: [(0, import_jsx_runtime$24.jsxs)("span", { children: ["抖音号：", prpos.data.user.short_id] }), prpos.data.user.ip_location && (0, import_jsx_runtime$24.jsx)("span", { children: prpos.data.user.ip_location })]
								}),
								(0, import_jsx_runtime$24.jsxs)("div", {
									className: "flex gap-8 text-3xl",
									children: [
										(0, import_jsx_runtime$24.jsxs)("div", { children: [(0, import_jsx_runtime$24.jsx)("span", {
											className: "text-default-500",
											children: "关注"
										}), (0, import_jsx_runtime$24.jsxs)("span", {
											className: "font-medium text-4xl text-default-900",
											children: [" ", formatCount(prpos.data.user.following_count)]
										})] }),
										(0, import_jsx_runtime$24.jsxs)("div", { children: [(0, import_jsx_runtime$24.jsx)("span", {
											className: "text-default-500",
											children: "粉丝"
										}), (0, import_jsx_runtime$24.jsxs)("span", {
											className: "font-medium text-4xl text-default-900",
											children: [" ", formatCount(prpos.data.user.follower_count)]
										})] }),
										(0, import_jsx_runtime$24.jsxs)("div", { children: [(0, import_jsx_runtime$24.jsx)("span", {
											className: "text-default-500",
											children: "获赞"
										}), (0, import_jsx_runtime$24.jsxs)("span", {
											className: "font-medium text-4xl  text-default-900",
											children: [" ", formatCount(prpos.data.user.total_favorited)]
										})] })
									]
								})
							]
						})]
					}), (0, import_jsx_runtime$24.jsx)("p", {
						className: "text-3xl text-default-700 line-clamp-3",
						children: prpos.data.user.signature || "这个用户很懒，还没有签名"
					})]
				}), prpos.data.videos.length > 0 ? (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, { children: (0, import_jsx_runtime$24.jsx)("div", {
					className: "grid grid-cols-2 gap-6 mb-8",
					children: prpos.data.videos.map((video) => (0, import_jsx_runtime$24.jsx)(VideoCard, { video }, video.aweme_id))
				}) }) : (0, import_jsx_runtime$24.jsx)("div", {
					className: "text-center py-20",
					children: (0, import_jsx_runtime$24.jsx)("p", {
						className: "text-[32px] text-default-500",
						children: "暂无视频内容"
					})
				})]
			})
		})]
	});
});
var UserList_exports$1 = __export({ default: () => UserList_default$1 }, 1), import_jsx_runtime$23, pushTypeConfig, DouyinUserItem, DouyinUserList, UserList_default$1;
var init_UserList$1 = __esmMin(() => {
	__toESM(require_react(), 1);
	init_ri();
	init_DefaultLayout();
	import_jsx_runtime$23 = __toESM(require_jsx_runtime(), 1);
	pushTypeConfig = {
		post: {
			label: "作品更新",
			color: "bg-primary-500/5 text-primary-500 border-primary-500/20",
			icon: RiVideoLine
		},
		favorite: {
			label: "喜欢列表",
			color: "bg-danger-500/5 text-danger-500 border-danger-500/20",
			icon: RiHeart2Line
		},
		recommend: {
			label: "推荐列表",
			color: "bg-warning-500/5 text-warning-500 border-warning-500/20",
			icon: RiStarLine
		},
		live: {
			label: "直播状态",
			color: "bg-secondary-500/5 text-secondary-500 border-secondary-500/20",
			icon: RiLiveLine
		}
	};
	DouyinUserItem = (props) => (0, import_jsx_runtime$23.jsxs)("li", {
		className: "relative group overflow-hidden rounded-4xl bg-content1/60 border border-default-200/50 backdrop-blur-xl shadow-xl",
		children: [
			(0, import_jsx_runtime$23.jsx)("div", {
				className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
				children: (0, import_jsx_runtime$23.jsx)("img", {
					src: props.avatar_img,
					alt: "",
					className: "w-full h-full object-cover opacity-20 blur-3xl scale-150 saturate-100 brightness-110",
					style: {
						maskImage: "linear-gradient(135deg, black 0%, transparent 100%)",
						WebkitMaskImage: "linear-gradient(135deg, black 0%, transparent 100%)"
					}
				})
			}),
			(0, import_jsx_runtime$23.jsx)("div", {
				className: "absolute inset-0 pointer-events-none z-0 opacity-[0.08] mix-blend-overlay",
				children: (0, import_jsx_runtime$23.jsxs)("svg", {
					className: "w-full h-full",
					xmlns: "http://www.w3.org/2000/svg",
					children: [(0, import_jsx_runtime$23.jsxs)("filter", {
						id: "cardNoise",
						x: "0%",
						y: "0%",
						width: "100%",
						height: "100%",
						children: [
							(0, import_jsx_runtime$23.jsx)("feTurbulence", {
								type: "fractalNoise",
								baseFrequency: "0.8",
								numOctaves: "3",
								stitchTiles: "stitch",
								result: "noise"
							}),
							(0, import_jsx_runtime$23.jsx)("feColorMatrix", {
								type: "saturate",
								values: "0",
								result: "gray"
							}),
							(0, import_jsx_runtime$23.jsxs)("feComponentTransfer", { children: [
								(0, import_jsx_runtime$23.jsx)("feFuncR", {
									type: "discrete",
									tableValues: "0 1"
								}),
								(0, import_jsx_runtime$23.jsx)("feFuncG", {
									type: "discrete",
									tableValues: "0 1"
								}),
								(0, import_jsx_runtime$23.jsx)("feFuncB", {
									type: "discrete",
									tableValues: "0 1"
								})
							] })
						]
					}), (0, import_jsx_runtime$23.jsx)("rect", {
						width: "100%",
						height: "100%",
						filter: "url(#cardNoise)"
					})]
				})
			}),
			(0, import_jsx_runtime$23.jsxs)("div", {
				className: "relative z-10 p-8 flex items-center gap-8",
				children: [(0, import_jsx_runtime$23.jsxs)("div", {
					className: "relative shrink-0",
					children: [(0, import_jsx_runtime$23.jsx)("div", {
						className: "w-28 h-28 rounded-full p-1 bg-default-100/20 backdrop-blur-md border border-default-200/30 shadow-lg",
						children: (0, import_jsx_runtime$23.jsx)("img", {
							src: props.avatar_img,
							alt: "Avatar",
							className: "w-full h-full rounded-full object-cover"
						})
					}), (0, import_jsx_runtime$23.jsxs)("div", {
						className: `absolute -bottom-1 -right-1 px-3 py-1 rounded-full border-2 border-background flex items-center gap-1.5 shadow-md ${props.switch ? "bg-success text-white" : "bg-danger-500 text-default-100"}`,
						children: [(0, import_jsx_runtime$23.jsx)("div", { className: `w-1.5 h-1.5 rounded-full ${props.switch ? "bg-white" : "bg-default-300"}` }), (0, import_jsx_runtime$23.jsx)("span", {
							className: "text-[10px] font-bold uppercase tracking-wider leading-none",
							children: props.switch ? "ON" : "OFF"
						})]
					})]
				}), (0, import_jsx_runtime$23.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						(0, import_jsx_runtime$23.jsxs)("div", {
							className: "mb-3",
							children: [(0, import_jsx_runtime$23.jsx)("h3", {
								className: "text-2xl font-black tracking-tight text-foreground truncate drop-shadow-sm",
								children: props.username
							}), (0, import_jsx_runtime$23.jsx)("div", {
								className: "flex items-center gap-2 mt-1",
								children: (0, import_jsx_runtime$23.jsxs)("span", {
									className: "px-1.5 py-0.5 rounded-md bg-default-100/50 border border-default-200/50 text-[10px] font-mono font-bold text-default-500 flex items-center gap-1",
									children: [(0, import_jsx_runtime$23.jsx)(RiHashtag, { className: "w-2.5 h-2.5 opacity-70" }), props.short_id]
								})
							})]
						}),
						(0, import_jsx_runtime$23.jsx)("div", {
							className: "flex flex-wrap gap-2 mb-4",
							children: Object.entries(pushTypeConfig).map(([type, config$1]) => {
								const isActive = props.pushTypes?.includes(type);
								const Icon = config$1.icon;
								return (0, import_jsx_runtime$23.jsxs)("div", {
									className: `px-2 py-0.5 rounded-md border flex items-center gap-1.5 transition-colors duration-200 ${isActive ? config$1.color : "bg-default-100/50 text-default-400 border-transparent dark:bg-default-100/10"}`,
									children: [(0, import_jsx_runtime$23.jsx)(Icon, { className: `w-3 h-3 ${isActive ? "" : "opacity-50"}` }), (0, import_jsx_runtime$23.jsx)("span", {
										className: "text-[10px] font-bold",
										children: config$1.label
									})]
								}, type);
							})
						}),
						(0, import_jsx_runtime$23.jsxs)("div", {
							className: "flex items-center gap-2 w-full",
							children: [
								(0, import_jsx_runtime$23.jsxs)("div", {
									className: "flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-content2/20 border border-default-200/20 backdrop-blur-sm",
									children: [(0, import_jsx_runtime$23.jsx)(RiGroupLine, { className: "w-3.5 h-3.5 mb-0.5 text-default-400" }), (0, import_jsx_runtime$23.jsx)("span", {
										className: "text-sm font-bold font-mono text-default-600 leading-none",
										children: props.fans
									})]
								}),
								(0, import_jsx_runtime$23.jsxs)("div", {
									className: "flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-content2/20 border border-default-200/20 backdrop-blur-sm",
									children: [(0, import_jsx_runtime$23.jsx)(RiHeart3Line, { className: "w-3.5 h-3.5 mb-0.5 text-default-400" }), (0, import_jsx_runtime$23.jsx)("span", {
										className: "text-sm font-bold font-mono text-default-600 leading-none",
										children: props.total_favorited
									})]
								}),
								(0, import_jsx_runtime$23.jsxs)("div", {
									className: "flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-content2/20 border border-default-200/20 backdrop-blur-sm",
									children: [(0, import_jsx_runtime$23.jsx)(RiUserFollowLine, { className: "w-3.5 h-3.5 mb-0.5 text-default-400" }), (0, import_jsx_runtime$23.jsx)("span", {
										className: "text-sm font-bold font-mono text-default-600 leading-none",
										children: props.following_count
									})]
								})
							]
						})
					]
				})]
			})
		]
	});
	DouyinUserList = (props) => {
		const isDark = props.data.useDarkTheme !== false;
		const primaryColor = isDark ? "#ef4444" : "#dc2626";
		const secondaryColor = isDark ? "#000000" : "#171717";
		return (0, import_jsx_runtime$23.jsxs)(DefaultLayout, {
			...props,
			className: "relative overflow-hidden bg-background",
			style: {
				width: "1440px",
				minHeight: "100vh"
			},
			children: [
				(0, import_jsx_runtime$23.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0",
					children: [(0, import_jsx_runtime$23.jsx)("div", {
						className: "absolute rounded-full w-350 h-350 -top-125 -left-100 blur-[150px] opacity-15 dark:opacity-10",
						style: { background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }
					}), (0, import_jsx_runtime$23.jsx)("div", {
						className: "absolute rounded-full w-300 h-300 top-25 -right-100 blur-[140px] opacity-10 dark:opacity-20",
						style: { background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)` }
					})]
				}),
				(0, import_jsx_runtime$23.jsx)("div", {
					className: "absolute inset-0 pointer-events-none z-0 opacity-[0.08]",
					children: (0, import_jsx_runtime$23.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$23.jsxs)("filter", {
							id: "globalNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime$23.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "3",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime$23.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime$23.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime$23.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$23.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$23.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime$23.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#globalNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime$23.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0",
					children: [(0, import_jsx_runtime$23.jsx)("div", { className: "absolute left-16 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-default-300 to-transparent" }), (0, import_jsx_runtime$23.jsx)("div", {
						className: "absolute top-0 right-0 p-16 opacity-10",
						children: (0, import_jsx_runtime$23.jsxs)("svg", {
							width: "400",
							height: "400",
							viewBox: "0 0 400 400",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							className: "text-foreground",
							children: [
								(0, import_jsx_runtime$23.jsx)("rect", {
									x: "100",
									y: "100",
									width: "200",
									height: "200",
									stroke: "currentColor",
									strokeWidth: "1"
								}),
								(0, import_jsx_runtime$23.jsx)("path", {
									d: "M200 0V400M0 200H400",
									stroke: "currentColor",
									strokeWidth: "0.5"
								}),
								(0, import_jsx_runtime$23.jsx)("circle", {
									cx: "200",
									cy: "200",
									r: "50",
									fill: "currentColor",
									fillOpacity: "0.1"
								})
							]
						})
					})]
				}),
				(0, import_jsx_runtime$23.jsxs)("div", {
					className: "relative z-10 px-24 py-20 flex flex-col min-h-screen",
					children: [(0, import_jsx_runtime$23.jsxs)("div", {
						className: "flex justify-between items-end mb-16",
						children: [(0, import_jsx_runtime$23.jsxs)("div", { children: [
							(0, import_jsx_runtime$23.jsxs)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [(0, import_jsx_runtime$23.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-foreground flex items-center justify-center text-background shadow-lg",
									children: (0, import_jsx_runtime$23.jsx)("svg", {
										className: "w-6 h-6",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: (0, import_jsx_runtime$23.jsx)("path", { d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" })
									})
								}), (0, import_jsx_runtime$23.jsx)("span", {
									className: "font-mono text-sm font-bold tracking-widest uppercase opacity-50 text-foreground",
									children: "Douyin Monitor"
								})]
							}),
							(0, import_jsx_runtime$23.jsx)("h1", {
								className: "text-7xl font-black text-foreground tracking-tighter mb-2",
								children: props.data.groupInfo.groupName
							}),
							(0, import_jsx_runtime$23.jsxs)("p", {
								className: "font-mono text-xl opacity-40 text-foreground flex items-center gap-2",
								children: [
									(0, import_jsx_runtime$23.jsx)("span", { children: "GROUP_ID" }),
									(0, import_jsx_runtime$23.jsx)("span", { className: "w-12 h-px bg-current opacity-50" }),
									(0, import_jsx_runtime$23.jsx)("span", { children: props.data.groupInfo.groupId })
								]
							})
						] }), (0, import_jsx_runtime$23.jsxs)("div", {
							className: "text-right",
							children: [(0, import_jsx_runtime$23.jsx)("div", {
								className: "text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-foreground to-default-400 leading-none",
								children: String(props.data.renderOpt.length).padStart(2, "0")
							}), (0, import_jsx_runtime$23.jsx)("div", {
								className: "text-sm font-bold tracking-[0.3em] uppercase opacity-40 mt-2 text-foreground",
								children: "Monitoring"
							})]
						})]
					}), (0, import_jsx_runtime$23.jsx)("ul", {
						className: "grid grid-cols-2 gap-x-10 gap-y-10",
						children: props.data.renderOpt.map((user, index) => (0, import_jsx_runtime$23.jsx)(DouyinUserItem, { ...user }, `${user.short_id}-${index}`))
					})]
				})
			]
		});
	};
	UserList_default$1 = DouyinUserList;
});
var videoInfo_exports$1 = __export({
	DouyinVideoInfo: () => DouyinVideoInfo,
	default: () => videoInfo_default$1
}, 1);
var import_react$24, import_jsx_runtime$22, formatNumber$3, formatDuration, DouyinVideoInfo, StatItem$2, videoInfo_default$1;
var init_videoInfo$1 = __esmMin(() => {
	init_lucide_react();
	import_react$24 = __toESM(require_react(), 1);
	init_DefaultLayout();
	import_jsx_runtime$22 = __toESM(require_jsx_runtime(), 1);
	formatNumber$3 = (num) => {
		if (num >= 1e8) return `${(num / 1e8).toFixed(1)}亿`;
		if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`;
		return num.toLocaleString();
	};
	formatDuration = (ms) => {
		const seconds = Math.floor(ms / 1e3);
		return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
	};
	DouyinVideoInfo = import_react$24.memo((props) => {
		const duration = (0, import_react$24.useMemo)(() => props.data.video ? formatDuration(props.data.video.duration) : null, [props.data.video]);
		const coverMaskStyle = (0, import_react$24.useMemo)(() => ({
			maskImage: `linear-gradient(to bottom, \n        transparent 0%,\n        rgba(0,0,0,0.3) 8%,\n        rgba(0,0,0,0.7) 15%,\n        black 25%, \n        black 55%, \n        rgba(0,0,0,0.6) 75%,\n        rgba(0,0,0,0.2) 90%,\n        transparent 100%\n      )`,
			WebkitMaskImage: `linear-gradient(to bottom, \n        transparent 0%,\n        rgba(0,0,0,0.3) 8%,\n        rgba(0,0,0,0.7) 15%,\n        black 25%, \n        black 55%, \n        rgba(0,0,0,0.6) 75%,\n        rgba(0,0,0,0.2) 90%,\n        transparent 100%\n      )`
		}), []);
		return (0, import_jsx_runtime$22.jsxs)(DefaultLayout, {
			...props,
			className: "dark relative",
			children: [(0, import_jsx_runtime$22.jsxs)("div", {
				className: "absolute inset-0 overflow-hidden -z-10",
				children: [(0, import_jsx_runtime$22.jsx)("img", {
					src: props.data.image_url,
					alt: "",
					className: "w-full h-full object-cover scale-150 blur-[120px] saturate-[1.8] opacity-50"
				}), (0, import_jsx_runtime$22.jsx)("div", { className: "absolute inset-0 bg-black/50" })]
			}), (0, import_jsx_runtime$22.jsx)("div", {
				className: "relative w-full overflow-hidden text-white",
				children: (0, import_jsx_runtime$22.jsxs)("div", {
					className: "relative z-10",
					children: [
						(0, import_jsx_runtime$22.jsxs)("div", {
							className: "flex items-center justify-between px-16 pt-20 pb-16 gap-12",
							children: [(0, import_jsx_runtime$22.jsxs)("div", {
								className: "flex items-center gap-10 min-w-0 shrink",
								children: [(0, import_jsx_runtime$22.jsx)("img", {
									src: props.data.author.avatar,
									alt: props.data.author.name,
									className: "w-36 h-36 rounded-full object-cover ring-4 ring-white/10 shrink-0"
								}), (0, import_jsx_runtime$22.jsxs)("div", {
									className: "flex flex-col gap-4 min-w-0",
									children: [(0, import_jsx_runtime$22.jsx)("span", {
										className: "text-6xl text-white font-bold leading-tight line-clamp-2",
										children: props.data.author.name
									}), (0, import_jsx_runtime$22.jsxs)("div", {
										className: "flex items-center gap-4 text-4xl text-white/50",
										children: [props.data.user_profile?.follower_count !== void 0 && (0, import_jsx_runtime$22.jsxs)("span", { children: [formatNumber$3(props.data.user_profile.follower_count), " 粉丝"] }), props.data.user_profile?.ip_location && (0, import_jsx_runtime$22.jsxs)(import_jsx_runtime$22.Fragment, { children: [(0, import_jsx_runtime$22.jsx)("span", { children: "·" }), (0, import_jsx_runtime$22.jsx)("span", { children: props.data.user_profile.ip_location.replace("IP属地：", "") })] })]
									})]
								})]
							}), (0, import_jsx_runtime$22.jsxs)("div", {
								className: "flex items-center gap-14 shrink-0",
								children: [
									(0, import_jsx_runtime$22.jsx)(StatItem$2, {
										icon: (0, import_jsx_runtime$22.jsx)(Heart, { size: 48 }),
										value: props.data.statistics.digg_count
									}),
									(0, import_jsx_runtime$22.jsx)(StatItem$2, {
										icon: (0, import_jsx_runtime$22.jsx)(MessageCircle, { size: 48 }),
										value: props.data.statistics.comment_count
									}),
									(0, import_jsx_runtime$22.jsx)(StatItem$2, {
										icon: (0, import_jsx_runtime$22.jsx)(Star, { size: 48 }),
										value: props.data.statistics.collect_count
									}),
									(0, import_jsx_runtime$22.jsx)(StatItem$2, {
										icon: (0, import_jsx_runtime$22.jsx)(Share2, { size: 48 }),
										value: props.data.statistics.share_count
									})
								]
							})]
						}),
						(0, import_jsx_runtime$22.jsx)("div", {
							className: "relative -mt-16",
							children: (0, import_jsx_runtime$22.jsx)("img", {
								src: props.data.image_url,
								alt: "Cover",
								className: "w-full h-auto",
								style: coverMaskStyle
							})
						}),
						(0, import_jsx_runtime$22.jsxs)("div", {
							className: "relative -mt-36 px-16 pb-12",
							children: [(0, import_jsx_runtime$22.jsxs)("div", {
								className: "flex items-center justify-between mb-10",
								children: [duration ? (0, import_jsx_runtime$22.jsx)("div", {
									className: "px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg text-white text-3xl tracking-wider",
									children: duration
								}) : (0, import_jsx_runtime$22.jsx)("div", {}), props.data.music && (0, import_jsx_runtime$22.jsxs)("div", {
									className: "flex items-center gap-6 p-4 rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-lg overflow-hidden",
									children: [(0, import_jsx_runtime$22.jsxs)("div", {
										className: "relative w-24 h-24",
										children: [(0, import_jsx_runtime$22.jsx)("img", {
											src: props.data.music.cover,
											alt: "",
											className: "absolute inset-0 w-full h-full rounded-2xl object-cover blur-md scale-110"
										}), (0, import_jsx_runtime$22.jsx)("img", {
											src: props.data.music.cover,
											alt: "",
											className: "relative w-full h-full rounded-2xl object-cover z-10"
										})]
									}), (0, import_jsx_runtime$22.jsxs)("div", {
										className: "flex flex-col gap-3 pr-4",
										children: [(0, import_jsx_runtime$22.jsx)("span", {
											className: "text-4xl font-semibold text-white max-w-150 truncate",
											children: props.data.music.title
										}), (0, import_jsx_runtime$22.jsx)("span", {
											className: "text-3xl text-white/50",
											children: props.data.music.author
										})]
									})]
								})]
							}), (0, import_jsx_runtime$22.jsx)("h1", {
								className: "w-full text-6xl font-bold leading-relaxed tracking-wide text-white text-center",
								children: props.data.desc || "无标题"
							})]
						})
					]
				})
			})]
		});
	});
	StatItem$2 = ({ icon, value }) => (0, import_jsx_runtime$22.jsxs)("div", {
		className: "flex flex-col items-center gap-3",
		children: [(0, import_jsx_runtime$22.jsx)("div", {
			className: "text-white/60",
			children: icon
		}), (0, import_jsx_runtime$22.jsx)("span", {
			className: "text-4xl text-white/90 tabular-nums whitespace-nowrap",
			children: formatNumber$3(value)
		})]
	});
	DouyinVideoInfo.displayName = "DouyinVideoInfo";
	videoInfo_default$1 = DouyinVideoInfo;
});
var qrcodeImg_exports$1 = __export({
	DouyinQrcodeImg: () => DouyinQrcodeImg,
	default: () => qrcodeImg_default$1
}, 1);
var import_react$23, import_jsx_runtime$21, DouyinQrcodeImg, qrcodeImg_default$1;
var init_qrcodeImg$1 = __esmMin(() => {
	init_lucide_react();
	import_react$23 = __toESM(require_react(), 1);
	init_hi();
	init_ri();
	init_tb();
	init_DefaultLayout();
	import_jsx_runtime$21 = __toESM(require_jsx_runtime(), 1);
	DouyinQrcodeImg = import_react$23.memo((props) => {
		const isDark = props.data?.useDarkTheme ?? false;
		const qrCodeImage = props.data.qrCodeDataUrl || props.qrCodeDataUrl;
		const theme = {
			bg: isDark ? "#000000" : "#FFFFFF",
			text: isDark ? "#FFFFFF" : "#000000",
			subText: isDark ? "#888888" : "#666666",
			accent: "#FF2C55",
			gradientTL: "#fe1700",
			gradientBR: "#0fffff"
		};
		return (0, import_jsx_runtime$21.jsxs)(DefaultLayout, {
			...props,
			className: "relative overflow-hidden font-sans",
			style: {
				background: theme.bg,
				color: theme.text
			},
			children: [
				(0, import_jsx_runtime$21.jsxs)("div", {
					className: "absolute inset-0 overflow-hidden pointer-events-none",
					children: [(0, import_jsx_runtime$21.jsx)("div", {
						className: "absolute top-[-40%] left-[-50%] w-400 h-600 rounded-full blur-[200px] opacity-25",
						style: { background: theme.gradientTL }
					}), (0, import_jsx_runtime$21.jsx)("div", {
						className: "absolute top-[80%] right-[-50%] w-400 h-600 rounded-full blur-[200px] opacity-25",
						style: { background: theme.gradientBR }
					})]
				}),
				(0, import_jsx_runtime$21.jsx)("div", {
					className: "absolute inset-0 pointer-events-none",
					style: { opacity: isDark ? .16 : .2 },
					children: (0, import_jsx_runtime$21.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$21.jsxs)("filter", {
							id: "pixelNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime$21.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "2",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime$21.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime$21.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime$21.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$21.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$21.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime$21.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#pixelNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime$21.jsxs)("div", {
					className: "relative z-10 flex flex-col items-center justify-center h-full py-40 px-24 space-y-32",
					children: [
						(0, import_jsx_runtime$21.jsxs)("div", {
							className: "text-center space-y-12",
							children: [(0, import_jsx_runtime$21.jsx)("h1", {
								className: "text-8xl font-bold tracking-tight",
								children: (0, import_jsx_runtime$21.jsx)("span", {
									className: "bg-linear-to-r from-default-foreground to-default-500 bg-clip-text text-transparent",
									children: "扫码登录"
								})
							}), (0, import_jsx_runtime$21.jsxs)("div", {
								className: "flex items-start justify-center gap-10 opacity-90",
								style: { color: theme.text },
								children: [
									(0, import_jsx_runtime$21.jsxs)("div", {
										className: "flex flex-col items-center gap-4",
										children: [(0, import_jsx_runtime$21.jsx)("div", {
											className: "p-5 rounded-3xl bg-default-100/50 backdrop-blur-md",
											children: (0, import_jsx_runtime$21.jsx)(RiTiktokFill, { className: "w-16 h-16" })
										}), (0, import_jsx_runtime$21.jsx)("span", {
											className: "text-[28px] font-medium tracking-wide",
											children: "打开抖音"
										})]
									}),
									(0, import_jsx_runtime$21.jsx)(RiArrowRightFill, { className: "w-10 h-10 mt-8 opacity-40" }),
									(0, import_jsx_runtime$21.jsxs)("div", {
										className: "flex flex-col items-center gap-4",
										children: [(0, import_jsx_runtime$21.jsx)("div", {
											className: "p-5 rounded-3xl bg-default-100/50 backdrop-blur-md",
											children: (0, import_jsx_runtime$21.jsx)(HiOutlineMenuAlt2, { className: "w-16 h-16" })
										}), (0, import_jsx_runtime$21.jsx)("span", {
											className: "text-[28px] font-medium tracking-wide",
											children: "左上角菜单"
										})]
									}),
									(0, import_jsx_runtime$21.jsx)(RiArrowRightFill, { className: "w-10 h-10 mt-8 opacity-40" }),
									(0, import_jsx_runtime$21.jsxs)("div", {
										className: "flex flex-col items-center gap-4",
										children: [(0, import_jsx_runtime$21.jsx)("div", {
											className: "p-5 rounded-3xl bg-default-100/50 backdrop-blur-md",
											children: (0, import_jsx_runtime$21.jsx)(TbScan, { className: "w-16 h-16" })
										}), (0, import_jsx_runtime$21.jsx)("span", {
											className: "text-[28px] font-medium tracking-wide",
											children: "顶部扫一扫"
										})]
									})
								]
							})]
						}),
						(0, import_jsx_runtime$21.jsxs)("div", {
							className: "relative group",
							children: [(0, import_jsx_runtime$21.jsx)("div", {
								className: "relative p-4",
								style: {
									width: "800px",
									height: "800px"
								},
								children: qrCodeImage ? (0, import_jsx_runtime$21.jsx)("img", {
									src: qrCodeImage,
									alt: "QR Code",
									className: "w-full h-full object-contain"
								}) : (0, import_jsx_runtime$21.jsx)("div", {
									className: "w-full h-full flex flex-col items-center justify-center gap-8",
									children: (0, import_jsx_runtime$21.jsx)("div", { className: "w-24 h-24 border-4 border-gray-200 border-t-black rounded-full animate-spin" })
								})
							}), (0, import_jsx_runtime$21.jsx)("div", {
								className: "absolute -bottom-24 left-0 right-0 text-center",
								children: (0, import_jsx_runtime$21.jsxs)("p", {
									className: "text-[28px] font-medium tracking-wide flex items-center justify-center gap-3",
									style: { color: theme.subText },
									children: [(0, import_jsx_runtime$21.jsx)("span", { className: "h-6 w-1.5 rounded-full bg-danger-500 shadow-[0_0_8px_rgba(255,44,85,0.8)]" }), "此二维码 120 秒内有效，请及时扫码登录。"]
								})
							})]
						}),
						(0, import_jsx_runtime$21.jsxs)("div", {
							className: "w-full max-w-225 grid grid-cols-2 gap-24 pt-20",
							children: [(0, import_jsx_runtime$21.jsxs)("div", {
								className: "flex flex-col items-start space-y-6 mt-1.5",
								children: [
									(0, import_jsx_runtime$21.jsx)("div", {
										className: "flex items-center justify-center w-16 h-16 mb-2",
										children: (0, import_jsx_runtime$21.jsx)(Smartphone, {
											className: "w-16 h-16",
											style: { color: theme.text },
											strokeWidth: 1
										})
									}),
									(0, import_jsx_runtime$21.jsx)("h3", {
										className: "text-[40px] font-bold",
										style: { color: theme.text },
										children: "扫码登录说明"
									}),
									(0, import_jsx_runtime$21.jsx)("p", {
										className: "text-[24px] leading-relaxed opacity-60",
										style: { color: theme.text },
										children: "抖音目前仅禁止相册扫码，无法通过截图在本机自助登录，请在另一台设备上展示二维码，并使用手机抖音扫码完成登录。"
									})
								]
							}), (0, import_jsx_runtime$21.jsxs)("div", {
								className: "flex flex-col items-start space-y-6",
								children: [
									(0, import_jsx_runtime$21.jsx)("div", {
										className: "flex items-center justify-center w-16 h-16 mb-2",
										children: (0, import_jsx_runtime$21.jsx)(ShieldCheck, {
											className: "w-16 h-16",
											style: { color: theme.text },
											strokeWidth: 1
										})
									}),
									(0, import_jsx_runtime$21.jsx)("h3", {
										className: "text-[40px] font-bold",
										style: { color: theme.text },
										children: "安全承诺"
									}),
									(0, import_jsx_runtime$21.jsx)("p", {
										className: "text-[24px] leading-relaxed opacity-60",
										style: { color: theme.text },
										children: "扫码后仅会在本地获取您的登录凭据（CK），用于视频解析等相关业务，不会上传至任何第三方，也不会用于与本工具无关的操作，请在可信环境下使用本功能。"
									})
								]
							})]
						})
					]
				})
			]
		});
	});
	DouyinQrcodeImg.displayName = "DouyinQrcodeImg";
	qrcodeImg_default$1 = DouyinQrcodeImg;
});
var Comment_exports$2 = __export({
	BilibiliComment: () => BilibiliComment,
	default: () => Comment_default$2
}, 1);
var import_react$22, import_jsx_runtime$20, processCommentHTML$1, ImageWithSkeleton, QRCodeSection$1, VideoInfoHeader, CommentItemComponent$1, BilibiliComment, Comment_default$2;
var init_Comment$2 = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$22 = __toESM(require_react(), 1);
	init_DefaultLayout();
	import_jsx_runtime$20 = __toESM(require_jsx_runtime(), 1);
	processCommentHTML$1 = (htmlContent) => htmlContent.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">");
	ImageWithSkeleton = ({ src, alt, className = "", placeholder }) => {
		const [hasError, setHasError] = (0, import_react$22.useState)(false);
		const handleError = () => {
			setHasError(true);
		};
		(0, import_react$22.useEffect)(() => {
			setHasError(false);
		}, [src]);
		if (hasError) return (0, import_jsx_runtime$20.jsx)("div", {
			className: `flex justify-center items-center text-sm select-text ${className} bg-content2 text-foreground-500`,
			children: placeholder || "图片加载失败"
		});
		return (0, import_jsx_runtime$20.jsx)("img", {
			src,
			alt,
			className: `select-text ${className}`,
			onError: handleError,
			referrerPolicy: "no-referrer",
			crossOrigin: "anonymous"
		});
	};
	QRCodeSection$1 = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$20.jsx)("div", {
		className: "flex flex-col items-center",
		children: (0, import_jsx_runtime$20.jsx)("div", {
			className: "flex justify-center items-center w-100 h-100 p-4",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$20.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full rounded-lg"
			}) : (0, import_jsx_runtime$20.jsx)("div", {
				className: "flex flex-col justify-center items-center text-foreground-400",
				children: (0, import_jsx_runtime$20.jsx)("span", {
					className: "text-lg",
					children: "二维码生成失败"
				})
			})
		})
	});
	VideoInfoHeader = (props) => (0, import_jsx_runtime$20.jsx)("div", {
		className: "max-w-350 mx-auto px-10 py-8",
		children: (0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex gap-16 justify-between items-start",
			children: [(0, import_jsx_runtime$20.jsxs)("div", {
				className: "flex flex-col flex-1",
				children: [(0, import_jsx_runtime$20.jsx)("div", {
					className: "mb-12",
					children: (0, import_jsx_runtime$20.jsxs)("div", {
						className: "h-45 flex items-center",
						children: [(0, import_jsx_runtime$20.jsx)("img", {
							src: "/image/bilibili/bilibili.png",
							alt: "B站Logo",
							className: "object-contain h-full w-auto max-w-112.5",
							onError: (e) => {
								const target = e.target;
								target.style.display = "none";
								const parent = target.parentElement;
								if (parent) parent.innerHTML = "<div class=\"flex items-center h-full text-6xl font-bold text-foreground-600\">哔哩哔哩</div>";
							}
						}), props.Type === "视频" && props.Resolution && (0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex flex-col gap-2 px-8 py-4 ml-12 rounded-3xl bg-default-100/50 w-fit",
							children: [(0, import_jsx_runtime$20.jsx)("span", {
								className: "text-[42px] text-foreground-400",
								children: "分辨率（px）"
							}), (0, import_jsx_runtime$20.jsx)("span", {
								className: "text-[48px] font-medium text-foreground-600",
								children: props.Resolution
							})]
						})]
					})
				}), (0, import_jsx_runtime$20.jsxs)("div", {
					className: "grid grid-cols-2 gap-y-6 gap-x-16 pl-2",
					children: [
						(0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text whitespace-nowrap",
							children: [(0, import_jsx_runtime$20.jsx)("span", {
								className: "shrink-0 mr-4 text-foreground-400",
								children: "类型"
							}), (0, import_jsx_runtime$20.jsx)("span", {
								className: "font-medium text-foreground-600",
								children: props.Type
							})]
						}),
						(0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text whitespace-nowrap",
							children: [(0, import_jsx_runtime$20.jsx)("span", {
								className: "shrink-0 mr-4 text-foreground-400",
								children: "评论"
							}), (0, import_jsx_runtime$20.jsxs)("span", {
								className: "font-medium text-foreground-600",
								children: [props.CommentLength, "条"]
							})]
						}),
						props.Type === "视频" ? (0, import_jsx_runtime$20.jsxs)(import_jsx_runtime$20.Fragment, { children: [(0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text whitespace-nowrap",
							children: [(0, import_jsx_runtime$20.jsx)("span", {
								className: "shrink-0 mr-4 text-foreground-400",
								children: "大小"
							}), (0, import_jsx_runtime$20.jsx)("span", {
								className: "font-medium text-foreground-600",
								children: props.VideoSize
							})]
						}), (0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text whitespace-nowrap",
							children: [(0, import_jsx_runtime$20.jsx)("span", {
								className: "shrink-0 mr-4 text-foreground-400",
								children: "画质"
							}), (0, import_jsx_runtime$20.jsx)("span", {
								className: "font-medium text-foreground-600",
								children: props.Clarity
							})]
						})] }) : (0, import_jsx_runtime$20.jsx)(import_jsx_runtime$20.Fragment, { children: (0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex items-center tracking-[6px] text-[45px] text-foreground-500 select-text whitespace-nowrap",
							children: [(0, import_jsx_runtime$20.jsx)("span", {
								className: "shrink-0 mr-4 text-foreground-400",
								children: "图片"
							}), (0, import_jsx_runtime$20.jsxs)("span", {
								className: "font-medium text-foreground-600",
								children: [props.ImageLength, "张"]
							})]
						}) })
					]
				})]
			}), (0, import_jsx_runtime$20.jsx)("div", {
				className: "shrink-0",
				children: (0, import_jsx_runtime$20.jsx)(QRCodeSection$1, { qrCodeDataUrl: props.qrCodeDataUrl })
			})]
		})
	});
	CommentItemComponent$1 = ({ isLast = false, ...props }) => (0, import_jsx_runtime$20.jsxs)("div", {
		className: clsx_default("flex relative px-10 py-10 max-w-full", { "pb-0": isLast }),
		children: [(0, import_jsx_runtime$20.jsxs)("div", {
			className: "relative mr-[33.75px] shrink-0 w-50 h-50 flex items-center justify-center",
			children: [
				(0, import_jsx_runtime$20.jsx)(ImageWithSkeleton, {
					src: props.avatar || "AVATAR_PLACEHOLDER",
					alt: "用户头像",
					className: "rounded-full w-35 h-35 shadow-large",
					placeholder: "头像",
					isCircular: true
				}),
				props.frame && (0, import_jsx_runtime$20.jsx)(ImageWithSkeleton, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-120",
					placeholder: "头像框"
				}),
				props.vipstatus === 1 && (0, import_jsx_runtime$20.jsx)("div", {
					className: "flex absolute right-4 bottom-6 z-20 justify-center items-center rounded-full w-15 h-15 bg-default-100",
					children: (0, import_jsx_runtime$20.jsx)("img", {
						src: "/image/bilibili/res-local1.png",
						alt: "大会员",
						className: "w-12 h-12"
					})
				})
			]
		}), (0, import_jsx_runtime$20.jsxs)("div", {
			className: "flex-1 min-w-0",
			children: [
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex items-start gap-2.5 mb-3.75 text-[50px] relative",
					children: [
						(0, import_jsx_runtime$20.jsxs)("div", {
							className: "shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text",
							children: [
								(0, import_jsx_runtime$20.jsx)("div", {
									className: "[&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-25 [&>svg]:h-25 [&>svg]:align-middle [&>svg]:shrink-0",
									dangerouslySetInnerHTML: { __html: props.uname }
								}),
								props.level !== void 0 && props.level >= 0 && props.level <= 7 && (0, import_jsx_runtime$20.jsx)("img", {
									src: `/image/bilibili/level/lv${props.level}.svg`,
									alt: `等级${props.level}`,
									className: "inline-block shrink-0 w-24 h-24 align-middle"
								}),
								props.isUP && (0, import_jsx_runtime$20.jsx)("img", {
									src: "/image/bilibili/up_pb.svg",
									alt: "UP主标签",
									className: "inline-block shrink-0 align-middle w-23 h-23"
								})
							]
						}),
						props.fanCard && props.fanCard.image && (0, import_jsx_runtime$20.jsx)("div", {
							className: "absolute -top-10 right-0 h-45 z-10 pointer-events-none",
							children: (0, import_jsx_runtime$20.jsxs)("div", {
								className: "inline-block relative h-full",
								children: [(0, import_jsx_runtime$20.jsx)("img", {
									src: props.fanCard.image,
									alt: "粉丝卡片",
									className: "block object-contain w-auto h-full",
									referrerPolicy: "no-referrer",
									crossOrigin: "anonymous"
								}), (0, import_jsx_runtime$20.jsxs)("div", {
									className: "absolute bottom-15 right-8 w-[14%] h-full flex flex-col items-start justify-end leading-10 font-[bilifont]",
									children: [(0, import_jsx_runtime$20.jsx)("span", {
										className: "text-4xl font-bold whitespace-nowrap",
										style: {
											backgroundImage: props.fanCard.gradientStyle,
											WebkitTextFillColor: "transparent",
											backgroundClip: "text",
											WebkitBackgroundClip: "text"
										},
										children: props.fanCard.numPrefix
									}), (0, import_jsx_runtime$20.jsx)("span", {
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
						props.label_type === 1 && (0, import_jsx_runtime$20.jsx)("div", {
							className: "inline-block px-5 py-0.5 rounded-[10px] text-[45px] bg-danger text-danger-foreground shrink-0 self-center select-text",
							children: "作者"
						}),
						props.status_label && (0, import_jsx_runtime$20.jsx)("div", {
							className: "inline-block px-5 py-0.5 rounded-[10px] text-[45px] bg-content2 text-foreground-600 shrink-0 self-center select-text",
							children: props.status_label
						})
					]
				}),
				(0, import_jsx_runtime$20.jsx)("div", {
					className: "text-[60px] tracking-[0.5px] leading-[1.6] text-foreground mb-5 select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					},
					dangerouslySetInnerHTML: { __html: (props.isTop ? "<span class=\"inline-flex justify-center items-center relative border-4 border-[#006A9E] rounded-xl text-[#006A9E] text-5xl px-2 py-1 leading-none mr-2 align-baseline\">置顶</span>" : "") + processCommentHTML$1(props.message) }
				}),
				(props.img_src || props.sticker) && (0, import_jsx_runtime$20.jsx)("div", {
					className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large",
					children: (0, import_jsx_runtime$20.jsx)(ImageWithSkeleton, {
						src: props.img_src || props.sticker || "IMAGE_PLACEHOLDER",
						alt: "评论图片",
						className: "rounded-[25px] object-contain w-full h-full",
						placeholder: "评论图片"
					})
				}),
				(0, import_jsx_runtime$20.jsxs)("div", {
					className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$20.jsx)("div", {
						className: "flex flex-1 items-center",
						children: (0, import_jsx_runtime$20.jsxs)("div", {
							className: "text-[45px] tracking-[2px] select-text",
							children: [
								props.ctime,
								" · ",
								props.location,
								props.replylength > 0 ? (0, import_jsx_runtime$20.jsxs)("span", {
									className: "text-foreground-400 tracking-[3px] ml-4",
									children: [props.replylength, "回复"]
								}) : (0, import_jsx_runtime$20.jsx)("span", {
									className: "ml-4 text-foreground-600",
									children: "回复"
								})
							]
						})
					}), (0, import_jsx_runtime$20.jsx)("div", {
						className: "flex items-center gap-18.75 ml-auto",
						children: (0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex items-center gap-3.75",
							children: [(0, import_jsx_runtime$20.jsx)(ThumbsUp, { className: "w-15 h-15 text-foreground-500" }), (0, import_jsx_runtime$20.jsx)("span", {
								className: "text-[45px] text-foreground-500 select-text",
								children: props.like
							})]
						})
					})]
				}),
				props.replies && props.replies.length > 0 && (0, import_jsx_runtime$20.jsx)("div", {
					className: "mt-10",
					children: props.replies.map((subReply, index) => (0, import_jsx_runtime$20.jsx)("div", { children: (0, import_jsx_runtime$20.jsxs)("div", {
						className: "flex items-start space-x-4",
						children: [(0, import_jsx_runtime$20.jsxs)("div", {
							className: "relative mr-[33.75px] shrink-0 w-40 h-40 flex items-center justify-center",
							children: [
								(0, import_jsx_runtime$20.jsx)(ImageWithSkeleton, {
									src: subReply.avatar || "AVATAR_PLACEHOLDER",
									alt: "用户头像",
									className: "rounded-full w-30 h-30 shadow-large",
									placeholder: "头像",
									isCircular: true
								}),
								subReply.frame && (0, import_jsx_runtime$20.jsx)(ImageWithSkeleton, {
									src: subReply.frame,
									alt: "头像框",
									className: "absolute inset-0 transform scale-90",
									placeholder: "头像框"
								}),
								subReply.vipstatus === 1 && (0, import_jsx_runtime$20.jsx)("div", {
									className: "flex absolute right-4 bottom-5 z-20 justify-center items-center w-12 h-12 rounded-full bg-default-100",
									children: (0, import_jsx_runtime$20.jsx)("img", {
										src: "/image/bilibili/res-local1.png",
										alt: "大会员",
										className: "w-9 h-9"
									})
								})
							]
						}), (0, import_jsx_runtime$20.jsxs)("div", {
							className: "flex-1",
							children: [
								(0, import_jsx_runtime$20.jsxs)("div", {
									className: "flex items-start gap-2.5 mb-3.75 text-[50px] relative overflow-visible",
									children: [(0, import_jsx_runtime$20.jsxs)("div", {
										className: "shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text",
										children: [
											(0, import_jsx_runtime$20.jsx)("div", {
												className: "[&>span]:inline-block [&>span]:leading-[1.2]",
												dangerouslySetInnerHTML: { __html: subReply.uname }
											}),
											subReply.level !== void 0 && subReply.level >= 0 && subReply.level <= 7 && (0, import_jsx_runtime$20.jsx)("img", {
												src: `/image/bilibili/level/lv${subReply.level}.svg`,
												alt: `等级${subReply.level}`,
												className: "inline-block shrink-0 w-24 h-24 align-middle"
											}),
											subReply.isUP && (0, import_jsx_runtime$20.jsx)("img", {
												src: "/image/bilibili/up_pb.svg",
												alt: "UP主标签",
												className: "inline-block shrink-0 align-middle w-23 h-23"
											})
										]
									}), subReply.fanCard && subReply.fanCard.image && (0, import_jsx_runtime$20.jsx)("div", {
										className: "absolute -top-10 right-0 h-45 z-10 pointer-events-none",
										children: (0, import_jsx_runtime$20.jsxs)("div", {
											className: "inline-block relative h-full",
											children: [(0, import_jsx_runtime$20.jsx)("img", {
												src: subReply.fanCard.image,
												alt: "粉丝卡片",
												className: "block object-contain w-auto h-full",
												referrerPolicy: "no-referrer",
												crossOrigin: "anonymous"
											}), (0, import_jsx_runtime$20.jsxs)("div", {
												className: "absolute bottom-15 right-8 w-[14%] h-full flex flex-col items-start justify-end leading-10 font-[bilifont]",
												children: [(0, import_jsx_runtime$20.jsx)("span", {
													className: "text-4xl font-bold whitespace-nowrap",
													style: {
														backgroundImage: subReply.fanCard.gradientStyle,
														WebkitTextFillColor: "transparent",
														backgroundClip: "text",
														WebkitBackgroundClip: "text"
													},
													children: subReply.fanCard.numPrefix
												}), (0, import_jsx_runtime$20.jsx)("span", {
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
								(0, import_jsx_runtime$20.jsx)("div", {
									className: "text-[60px] tracking-[0.5px] leading-[1.6] text-foreground mb-5 select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
									style: {
										wordBreak: "break-word",
										overflowWrap: "break-word"
									},
									dangerouslySetInnerHTML: { __html: processCommentHTML$1(subReply.message) }
								}),
								subReply.img_src && (0, import_jsx_runtime$20.jsx)("div", {
									className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large",
									children: (0, import_jsx_runtime$20.jsx)(ImageWithSkeleton, {
										src: subReply.img_src,
										alt: "评论图片",
										className: "rounded-[25px] object-contain w-full h-full",
										placeholder: "评论图片"
									})
								}),
								(0, import_jsx_runtime$20.jsxs)("div", {
									className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500",
									children: [(0, import_jsx_runtime$20.jsx)("div", {
										className: "flex flex-1 items-center",
										children: (0, import_jsx_runtime$20.jsxs)("div", {
											className: "text-[45px] tracking-[2px] select-text",
											children: [
												subReply.ctime,
												" · ",
												subReply.location
											]
										})
									}), (0, import_jsx_runtime$20.jsx)("div", {
										className: "flex items-center gap-18.75 ml-auto",
										children: (0, import_jsx_runtime$20.jsxs)("div", {
											className: "flex items-center gap-3.75",
											children: [(0, import_jsx_runtime$20.jsx)(ThumbsUp, { className: "w-15 h-15 text-foreground-500" }), (0, import_jsx_runtime$20.jsx)("span", {
												className: "text-[45px] text-foreground-500 select-text",
												children: subReply.like
											})]
										})
									})]
								})
							]
						})]
					}) }, index))
				})
			]
		})]
	});
	BilibiliComment = import_react$22.memo((props) => {
		const processedData = (0, import_react$22.useMemo)(() => {
			if (!props.data) return {
				useDarkTheme: false,
				Type: "视频",
				CommentLength: "0",
				VideoSize: void 0,
				Clarity: void 0,
				ImageLength: void 0,
				Resolution: null,
				shareurl: "",
				share_url: "",
				CommentsData: []
			};
			return {
				useDarkTheme: props.data.useDarkTheme || false,
				Type: props.data.Type || "视频",
				CommentLength: props.data.CommentLength || "0",
				VideoSize: props.data.VideoSize,
				Clarity: props.data.Clarity,
				ImageLength: props.data.ImageLength,
				Resolution: props.data.Resolution,
				shareurl: props.data.shareurl || "",
				share_url: props.data.share_url || "",
				CommentsData: props.data.CommentsData || []
			};
		}, [props.data]);
		return (0, import_jsx_runtime$20.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$20.jsxs)("div", {
				className: "p-5",
				children: [
					(0, import_jsx_runtime$20.jsx)("div", { className: "h-20" }),
					(0, import_jsx_runtime$20.jsx)(VideoInfoHeader, {
						...processedData,
						qrCodeDataUrl: props.qrCodeDataUrl
					}),
					(0, import_jsx_runtime$20.jsx)("div", {
						className: "overflow-hidden mt-8",
						children: processedData.CommentsData.length > 0 ? processedData.CommentsData.map((comment, index) => (0, import_jsx_runtime$20.jsx)(CommentItemComponent$1, {
							isLast: index === processedData.CommentsData.length - 1,
							...comment
						}, index)) : (0, import_jsx_runtime$20.jsx)("div", {
							className: "flex justify-center items-center py-20 text-foreground-400",
							children: (0, import_jsx_runtime$20.jsx)("div", {
								className: "text-center",
								children: (0, import_jsx_runtime$20.jsx)("p", {
									className: "text-xl",
									children: "暂无评论数据"
								})
							})
						})
					})
				]
			})
		});
	});
	Comment_default$2 = BilibiliComment;
});
var import_react$21, import_jsx_runtime$19, processCommentHTML, CommentText, EnhancedImage, proxyImageUrl, processHtmlImages, DecorationCard;
var init_shared = __esmMin(() => {
	import_react$21 = __toESM(require_react(), 1);
	import_jsx_runtime$19 = __toESM(require_jsx_runtime(), 1);
	processCommentHTML = (htmlContent) => {
		if (!htmlContent || typeof htmlContent !== "string") return "";
		let processed = htmlContent;
		processed = processed.replace(/<img([^>]*?)>/gi, "<img$1 referrerpolicy=\"no-referrer\" crossorigin=\"anonymous\">");
		processed = processed.replace(/¨/g, "•");
		return processed;
	};
	CommentText = ({ content, className, style }) => (0, import_jsx_runtime$19.jsx)("div", {
		className,
		style,
		dangerouslySetInnerHTML: { __html: processCommentHTML(content) }
	});
	EnhancedImage = ({ src, alt, className = "", placeholder, isCircular = false }) => {
		const [hasError, setHasError] = (0, import_react$21.useState)(false);
		const handleError = () => {
			setHasError(true);
		};
		if (!src || hasError) return (0, import_jsx_runtime$19.jsx)("div", {
			className: `${className} ${isCircular ? "rounded-full" : "rounded-md"} bg-content2 flex items-center justify-center`,
			children: (0, import_jsx_runtime$19.jsx)("span", {
				className: "text-sm text-default-400",
				children: placeholder || alt
			})
		});
		return (0, import_jsx_runtime$19.jsx)("img", {
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
	DecorationCard = ({ html }) => (0, import_jsx_runtime$19.jsx)("div", {
		className: "font-bilifont",
		dangerouslySetInnerHTML: { __html: processHtmlImages(html) }
	});
});
var UserList_exports = __export({ default: () => UserList_default }, 1), import_jsx_runtime$18, BilibiliUserItem, BilibiliUserList, UserList_default;
var init_UserList = __esmMin(() => {
	__toESM(require_react(), 1);
	init_ri();
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$18 = __toESM(require_jsx_runtime(), 1);
	BilibiliUserItem = (props) => (0, import_jsx_runtime$18.jsxs)("li", {
		className: "relative group overflow-hidden rounded-4xl bg-content1/60 border border-default-200/50 backdrop-blur-xl shadow-xl",
		children: [
			(0, import_jsx_runtime$18.jsx)("div", {
				className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
				children: (0, import_jsx_runtime$18.jsx)(EnhancedImage, {
					src: props.avatar_img,
					alt: "",
					className: "w-full h-full object-cover opacity-20 blur-3xl scale-150 saturate-100 brightness-110",
					style: {
						maskImage: "linear-gradient(135deg, black 0%, transparent 100%)",
						WebkitMaskImage: "linear-gradient(135deg, black 0%, transparent 100%)"
					}
				})
			}),
			(0, import_jsx_runtime$18.jsx)("div", {
				className: "absolute inset-0 pointer-events-none z-0 opacity-[0.08] mix-blend-overlay",
				children: (0, import_jsx_runtime$18.jsxs)("svg", {
					className: "w-full h-full",
					xmlns: "http://www.w3.org/2000/svg",
					children: [(0, import_jsx_runtime$18.jsxs)("filter", {
						id: "cardNoise",
						x: "0%",
						y: "0%",
						width: "100%",
						height: "100%",
						children: [
							(0, import_jsx_runtime$18.jsx)("feTurbulence", {
								type: "fractalNoise",
								baseFrequency: "0.8",
								numOctaves: "3",
								stitchTiles: "stitch",
								result: "noise"
							}),
							(0, import_jsx_runtime$18.jsx)("feColorMatrix", {
								type: "saturate",
								values: "0",
								result: "gray"
							}),
							(0, import_jsx_runtime$18.jsxs)("feComponentTransfer", { children: [
								(0, import_jsx_runtime$18.jsx)("feFuncR", {
									type: "discrete",
									tableValues: "0 1"
								}),
								(0, import_jsx_runtime$18.jsx)("feFuncG", {
									type: "discrete",
									tableValues: "0 1"
								}),
								(0, import_jsx_runtime$18.jsx)("feFuncB", {
									type: "discrete",
									tableValues: "0 1"
								})
							] })
						]
					}), (0, import_jsx_runtime$18.jsx)("rect", {
						width: "100%",
						height: "100%",
						filter: "url(#cardNoise)"
					})]
				})
			}),
			(0, import_jsx_runtime$18.jsxs)("div", {
				className: "relative z-10 p-8 flex items-center gap-8",
				children: [(0, import_jsx_runtime$18.jsxs)("div", {
					className: "relative shrink-0",
					children: [(0, import_jsx_runtime$18.jsx)("div", {
						className: "w-28 h-28 rounded-full p-1 bg-default-100/20 backdrop-blur-md border border-default-200/30 shadow-lg",
						children: (0, import_jsx_runtime$18.jsx)(EnhancedImage, {
							src: props.avatar_img,
							alt: "Avatar",
							className: "w-full h-full rounded-full object-cover"
						})
					}), (0, import_jsx_runtime$18.jsxs)("div", {
						className: `absolute -bottom-1 -right-1 px-3 py-1 rounded-full border-2 border-background flex items-center gap-1.5 shadow-md ${props.switch ? "bg-success text-white" : "bg-danger-500 text-default-100"}`,
						children: [(0, import_jsx_runtime$18.jsx)("div", { className: `w-1.5 h-1.5 rounded-full ${props.switch ? "bg-white" : "bg-default-300"}` }), (0, import_jsx_runtime$18.jsx)("span", {
							className: "text-[10px] font-bold uppercase tracking-wider leading-none",
							children: props.switch ? "ON" : "OFF"
						})]
					})]
				}), (0, import_jsx_runtime$18.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [(0, import_jsx_runtime$18.jsxs)("div", {
						className: "mb-5",
						children: [(0, import_jsx_runtime$18.jsx)("h3", {
							className: "text-3xl font-black tracking-tight text-foreground truncate drop-shadow-sm",
							children: props.username
						}), (0, import_jsx_runtime$18.jsx)("div", {
							className: "flex items-center gap-2 mt-1",
							children: (0, import_jsx_runtime$18.jsxs)("span", {
								className: "px-2 py-0.5 rounded-md bg-default-100 border border-default-200 text-xs font-mono font-bold text-default-500 flex items-center gap-1",
								children: [(0, import_jsx_runtime$18.jsx)(RiHashtag, { className: "w-3 h-3 opacity-70" }), props.host_mid]
							})
						})]
					}), (0, import_jsx_runtime$18.jsxs)("div", {
						className: "flex items-center gap-3 w-full",
						children: [
							(0, import_jsx_runtime$18.jsxs)("div", {
								className: "flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-content2/40 border border-default-200/40 backdrop-blur-sm",
								children: [
									(0, import_jsx_runtime$18.jsx)(RiGroupLine, { className: "w-5 h-5 mb-1 text-default-500" }),
									(0, import_jsx_runtime$18.jsx)("span", {
										className: "text-lg font-black font-mono bg-linear-to-b from-foreground to-default-500 bg-clip-text text-transparent leading-none",
										children: props.fans
									}),
									(0, import_jsx_runtime$18.jsx)("span", {
										className: "text-[10px] font-bold uppercase opacity-40 mt-1 text-foreground",
										children: "Fans"
									})
								]
							}),
							(0, import_jsx_runtime$18.jsxs)("div", {
								className: "flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-content2/40 border border-default-200/40 backdrop-blur-sm",
								children: [
									(0, import_jsx_runtime$18.jsx)(RiHeart3Line, { className: "w-5 h-5 mb-1 text-default-500" }),
									(0, import_jsx_runtime$18.jsx)("span", {
										className: "text-lg font-black font-mono bg-linear-to-b from-foreground to-default-500 bg-clip-text text-transparent leading-none",
										children: props.total_favorited
									}),
									(0, import_jsx_runtime$18.jsx)("span", {
										className: "text-[10px] font-bold uppercase opacity-40 mt-1 text-foreground",
										children: "Likes"
									})
								]
							}),
							(0, import_jsx_runtime$18.jsxs)("div", {
								className: "flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-2xl bg-content2/40 border border-default-200/40 backdrop-blur-sm",
								children: [
									(0, import_jsx_runtime$18.jsx)(RiUserFollowLine, { className: "w-5 h-5 mb-1 text-default-500" }),
									(0, import_jsx_runtime$18.jsx)("span", {
										className: "text-lg font-black font-mono bg-linear-to-b from-foreground to-default-500 bg-clip-text text-transparent leading-none",
										children: props.following_count
									}),
									(0, import_jsx_runtime$18.jsx)("span", {
										className: "text-[10px] font-bold uppercase opacity-40 mt-1 text-foreground",
										children: "Follow"
									})
								]
							})
						]
					})]
				})]
			})
		]
	});
	BilibiliUserList = (props) => {
		const isDark = props.data.useDarkTheme !== false;
		const primaryColor = isDark ? "#23ade5" : "#00a1d6";
		const secondaryColor = isDark ? "#4f46e5" : "#60a5fa";
		return (0, import_jsx_runtime$18.jsxs)(DefaultLayout, {
			...props,
			className: "relative overflow-hidden bg-background",
			style: {
				width: "1440px",
				minHeight: "100vh"
			},
			children: [
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0",
					children: [(0, import_jsx_runtime$18.jsx)("div", {
						className: "absolute rounded-full w-350 h-350 -top-125 -left-100 blur-[150px] opacity-20 dark:opacity-10",
						style: { background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)` }
					}), (0, import_jsx_runtime$18.jsx)("div", {
						className: "absolute rounded-full w-300 h-300 top-25 -right-100 blur-[140px] opacity-15 dark:opacity-10",
						style: { background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)` }
					})]
				}),
				(0, import_jsx_runtime$18.jsx)("div", {
					className: "absolute inset-0 pointer-events-none z-0 opacity-[0.08]",
					children: (0, import_jsx_runtime$18.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$18.jsxs)("filter", {
							id: "globalNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime$18.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "3",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime$18.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime$18.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime$18.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$18.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$18.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime$18.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#globalNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0",
					children: [(0, import_jsx_runtime$18.jsx)("div", { className: "absolute left-16 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-default-300 to-transparent" }), (0, import_jsx_runtime$18.jsx)("div", {
						className: "absolute top-0 right-0 p-16 opacity-10",
						children: (0, import_jsx_runtime$18.jsxs)("svg", {
							width: "400",
							height: "400",
							viewBox: "0 0 400 400",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							className: "text-foreground",
							children: [
								(0, import_jsx_runtime$18.jsx)("circle", {
									cx: "200",
									cy: "200",
									r: "199.5",
									stroke: "currentColor"
								}),
								(0, import_jsx_runtime$18.jsx)("circle", {
									cx: "200",
									cy: "200",
									r: "149.5",
									stroke: "currentColor",
									strokeDasharray: "10 10"
								}),
								(0, import_jsx_runtime$18.jsx)("circle", {
									cx: "200",
									cy: "200",
									r: "99.5",
									stroke: "currentColor"
								}),
								(0, import_jsx_runtime$18.jsx)("path", {
									d: "M200 0V400M0 200H400",
									stroke: "currentColor",
									strokeWidth: "0.5"
								})
							]
						})
					})]
				}),
				(0, import_jsx_runtime$18.jsxs)("div", {
					className: "relative z-10 px-24 py-20 flex flex-col min-h-screen",
					children: [(0, import_jsx_runtime$18.jsxs)("div", {
						className: "flex justify-between items-end mb-16",
						children: [(0, import_jsx_runtime$18.jsxs)("div", { children: [
							(0, import_jsx_runtime$18.jsxs)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [(0, import_jsx_runtime$18.jsx)("div", {
									className: "w-10 h-10 rounded-xl bg-foreground flex items-center justify-center text-background shadow-lg",
									children: (0, import_jsx_runtime$18.jsx)("svg", {
										className: "w-6 h-6",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: (0, import_jsx_runtime$18.jsx)("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-4.41-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z" })
									})
								}), (0, import_jsx_runtime$18.jsx)("span", {
									className: "font-mono text-sm font-bold tracking-widest uppercase opacity-50 text-foreground",
									children: "Subscriber List"
								})]
							}),
							(0, import_jsx_runtime$18.jsx)("h1", {
								className: "text-7xl font-black text-foreground tracking-tighter mb-2",
								children: props.data.groupInfo.groupName
							}),
							(0, import_jsx_runtime$18.jsxs)("p", {
								className: "font-mono text-xl opacity-40 text-foreground flex items-center gap-2",
								children: [
									(0, import_jsx_runtime$18.jsx)("span", { children: "GROUP_ID" }),
									(0, import_jsx_runtime$18.jsx)("span", { className: "w-12 h-px bg-current opacity-50" }),
									(0, import_jsx_runtime$18.jsx)("span", { children: props.data.groupInfo.groupId })
								]
							})
						] }), (0, import_jsx_runtime$18.jsxs)("div", {
							className: "text-right",
							children: [(0, import_jsx_runtime$18.jsx)("div", {
								className: "text-8xl font-black text-transparent bg-clip-text bg-linear-to-b from-foreground to-default-400 leading-none",
								children: String(props.data.renderOpt.length).padStart(2, "0")
							}), (0, import_jsx_runtime$18.jsx)("div", {
								className: "text-sm font-bold tracking-[0.3em] uppercase opacity-40 mt-2 text-foreground",
								children: "Total Users"
							})]
						})]
					}), (0, import_jsx_runtime$18.jsx)("ul", {
						className: "grid grid-cols-2 gap-x-10 gap-y-10",
						children: props.data.renderOpt.map((user, index) => (0, import_jsx_runtime$18.jsx)(BilibiliUserItem, { ...user }, `${user.host_mid}-${index}`))
					})]
				})
			]
		});
	};
	UserList_default = BilibiliUserList;
});
var bangumi_exports = __export({
	BangumiBilibili: () => BangumiBilibili,
	default: () => bangumi_default
}, 1);
var import_react$19, import_jsx_runtime$17, formatNumber$2, formatDateParts, formatDateTime, BangumiBilibiliHeader, BangumiBilibiliEpisodes, BangumiBilibili, bangumi_default;
var init_bangumi = __esmMin(() => {
	init_dist();
	init_clsx();
	init_lucide_react();
	import_react$19 = __toESM(require_react(), 1);
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$17 = __toESM(require_jsx_runtime(), 1);
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
		return (0, import_jsx_runtime$17.jsx)("div", {
			className: "overflow-hidden relative rounded-6xl",
			children: (0, import_jsx_runtime$17.jsxs)("div", {
				className: "flex relative z-10 gap-25 p-25",
				children: [(0, import_jsx_runtime$17.jsxs)("div", {
					className: "flex flex-col shrink-0 gap-20",
					children: [
						(0, import_jsx_runtime$17.jsx)("div", {
							className: "overflow-hidden rounded-4xl w-120 h-160",
							children: (0, import_jsx_runtime$17.jsx)(EnhancedImage, {
								src: props.mainCover,
								alt: props.title,
								className: "object-cover w-full h-full select-text"
							})
						}),
						props.upInfo && (0, import_jsx_runtime$17.jsxs)("div", {
							className: "flex gap-12 items-center mt-15",
							children: [(0, import_jsx_runtime$17.jsxs)("div", {
								className: "relative",
								children: [
									(0, import_jsx_runtime$17.jsx)(EnhancedImage, {
										className: "w-28 h-28 rounded-full select-text",
										src: `https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`,
										alt: props.upInfo.uname
									}),
									props.upInfo.avatar_subscript_url && (0, import_jsx_runtime$17.jsx)(EnhancedImage, {
										className: "absolute -right-1 -bottom-1 w-8 h-8 select-text",
										src: props.upInfo.avatar_subscript_url,
										alt: "头像角标"
									}),
									props.upInfo.pendant?.image && (0, import_jsx_runtime$17.jsx)(EnhancedImage, {
										className: "absolute inset-0 w-full h-full transform select-text scale-160",
										src: props.upInfo.pendant.image,
										alt: props.upInfo.pendant.name || "挂件"
									})
								]
							}), (0, import_jsx_runtime$17.jsxs)("div", {
								className: "flex flex-col gap-4",
								children: [
									(0, import_jsx_runtime$17.jsxs)("div", {
										className: "flex gap-3 items-center",
										children: [
											(0, import_jsx_runtime$17.jsx)("div", {
												className: "text-4xl font-medium select-text",
												style: { color: props.upInfo.vip_status === 1 ? props.upInfo.nickname_color || "#FB7299" : "#EDEDED" },
												children: props.upInfo.uname
											}),
											props.upInfo.verify_type > 0 && (0, import_jsx_runtime$17.jsx)("div", {
												className: "flex items-center",
												children: props.upInfo.verify_type === 1 ? (0, import_jsx_runtime$17.jsx)(Shield, {
													size: 20,
													className: "text-warning"
												}) : (0, import_jsx_runtime$17.jsx)(Crown, {
													size: 20,
													className: "text-primary"
												})
											}),
											props.upInfo.vip_status === 1 && props.upInfo.vip_label?.text && (0, import_jsx_runtime$17.jsx)(chip_default, {
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
									(0, import_jsx_runtime$17.jsxs)("div", {
										className: "flex gap-6 items-center text-3xl select-text text-foreground",
										children: [
											(0, import_jsx_runtime$17.jsx)(Users, { size: 30 }),
											(0, import_jsx_runtime$17.jsxs)("span", { children: [formatNumber$2(props.upInfo.follower), "粉丝"] }),
											props.upInfo.is_follow === 1 && (0, import_jsx_runtime$17.jsx)(chip_default, {
												size: "sm",
												color: "primary",
												variant: "flat",
												className: "text-xs select-text",
												children: "已关注"
											})
										]
									}),
									(0, import_jsx_runtime$17.jsxs)("div", {
										className: "flex gap-2 items-center text-2xl select-text text-foreground-600",
										children: [(0, import_jsx_runtime$17.jsx)(Hash, { size: 20 }), (0, import_jsx_runtime$17.jsxs)("span", { children: ["UID: ", props.upInfo.mid] })]
									})
								]
							})]
						}),
						(0, import_jsx_runtime$17.jsxs)("div", {
							className: "flex text-3xl select-text text-foreground",
							children: [
								(0, import_jsx_runtime$17.jsx)("span", { children: "提示：请在120秒内发送" }),
								(0, import_jsx_runtime$17.jsx)(code_default, {
									size: "lg",
									color: "danger",
									children: " 第 ？ 集 "
								}),
								(0, import_jsx_runtime$17.jsx)("span", { children: "选择集数" })
							]
						})
					]
				}), (0, import_jsx_runtime$17.jsxs)("div", {
					className: "flex flex-col flex-1 justify-between text-foreground",
					children: [(0, import_jsx_runtime$17.jsxs)("div", { children: [
						(0, import_jsx_runtime$17.jsx)("div", {
							className: "mb-8 text-8xl font-bold leading-tight select-text",
							children: props.title
						}),
						props.subtitle && (0, import_jsx_runtime$17.jsx)("div", {
							className: "mb-12 text-4xl select-text text-foreground",
							children: props.subtitle
						}),
						props.styles && props.styles.length > 0 && (0, import_jsx_runtime$17.jsx)("div", {
							className: "flex flex-wrap gap-8 mb-12",
							children: props.styles.map((style, index) => (0, import_jsx_runtime$17.jsx)(chip_default, {
								radius: "sm",
								size: "lg",
								className: "px-4 py-2 text-3xl backdrop-blur-sm select-text text-foreground bg-content2",
								classNames: { base: "w-32 h-12" },
								children: style
							}, index))
						}),
						actorList.length > 0 && (0, import_jsx_runtime$17.jsxs)("div", {
							className: "mb-12",
							children: [(0, import_jsx_runtime$17.jsxs)("div", {
								className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground",
								children: [(0, import_jsx_runtime$17.jsx)(Users, { size: 30 }), (0, import_jsx_runtime$17.jsx)("span", { children: "声优阵容" })]
							}), (0, import_jsx_runtime$17.jsxs)("div", {
								className: "flex flex-wrap gap-8",
								children: [actorList.slice(0, 6).map((actor, index) => (0, import_jsx_runtime$17.jsx)("div", {
									className: "text-3xl select-text text-foreground",
									children: actor
								}, index)), actorList.length > 6 && (0, import_jsx_runtime$17.jsxs)("div", {
									className: "text-3xl select-text text-foreground",
									children: [
										"等",
										actorList.length,
										"人"
									]
								})]
							})]
						}),
						props.evaluate && (0, import_jsx_runtime$17.jsxs)("div", {
							className: "mb-12",
							children: [(0, import_jsx_runtime$17.jsxs)("div", {
								className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground",
								children: [(0, import_jsx_runtime$17.jsx)(Star, { size: 30 }), (0, import_jsx_runtime$17.jsx)("span", { children: "评价" })]
							}), (0, import_jsx_runtime$17.jsx)("div", {
								className: "text-3xl leading-relaxed select-text text-foreground",
								children: props.evaluate
							})]
						})
					] }), (0, import_jsx_runtime$17.jsxs)("div", {
						className: "grid grid-cols-4 gap-16",
						children: [
							(0, import_jsx_runtime$17.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$17.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$17.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.views).slice(0, -1)
									}), (0, import_jsx_runtime$17.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.views).slice(-1)
									})]
								}), (0, import_jsx_runtime$17.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "播放"
								})]
							}),
							(0, import_jsx_runtime$17.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$17.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$17.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.favorites).slice(0, -1)
									}), (0, import_jsx_runtime$17.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.favorites).slice(-1)
									})]
								}), (0, import_jsx_runtime$17.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "收藏"
								})]
							}),
							(0, import_jsx_runtime$17.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$17.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$17.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.danmakus).slice(0, -1)
									}), (0, import_jsx_runtime$17.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.danmakus).slice(-1)
									})]
								}), (0, import_jsx_runtime$17.jsx)("span", {
									className: "text-2xl whitespace-nowrap select-text",
									children: "弹幕"
								})]
							}),
							(0, import_jsx_runtime$17.jsxs)("div", {
								className: "items-center min-w-0",
								children: [(0, import_jsx_runtime$17.jsxs)("div", {
									className: "flex items-baseline",
									children: [(0, import_jsx_runtime$17.jsx)("span", {
										className: "text-4xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.coins).slice(0, -1)
									}), (0, import_jsx_runtime$17.jsx)("span", {
										className: "text-xl font-bold select-text text-foreground",
										children: formatNumber$2(props.stat.coins).slice(-1)
									})]
								}), (0, import_jsx_runtime$17.jsx)("span", {
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
		return (0, import_jsx_runtime$17.jsxs)("div", {
			className: "px-10",
			children: [(0, import_jsx_runtime$17.jsxs)("div", {
				className: "flex gap-8 items-center mb-20 text-5xl font-bold select-text text-foreground",
				children: [
					(0, import_jsx_runtime$17.jsx)(Play, { size: 46 }),
					(0, import_jsx_runtime$17.jsx)("span", { children: "剧集列表" }),
					(0, import_jsx_runtime$17.jsxs)(chip_default, {
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
			}), (0, import_jsx_runtime$17.jsx)("div", { children: flattenedEpisodes.map((item) => {
				const { episode, isFirstOfDate, isLastOfAll, episodesInSameDate, isLastOfDate } = item;
				const { month, day } = formatDateParts(episode.pub_time);
				const episodeNumber = sortedEpisodes.findIndex((e) => e.bvid === episode.bvid);
				const actualEpisodeNumber = sortedEpisodes.length - episodeNumber;
				return (0, import_jsx_runtime$17.jsxs)("div", {
					className: "flex gap-15",
					children: [(0, import_jsx_runtime$17.jsx)("div", {
						className: "flex flex-col shrink-0 items-center w-20",
						children: isFirstOfDate ? (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [
							(0, import_jsx_runtime$17.jsx)("div", {
								className: "text-4xl select-text text-foreground",
								children: month
							}),
							(0, import_jsx_runtime$17.jsx)("div", {
								className: "flex justify-center items-center text-7xl font-bold select-text text-foreground",
								children: day
							}),
							!isLastOfAll && (0, import_jsx_runtime$17.jsx)("div", { className: clsx_default("mt-8 w-1 bg-divider", episodesInSameDate > 1 ? "h-110" : "h-95") })
						] }) : (0, import_jsx_runtime$17.jsxs)(import_jsx_runtime$17.Fragment, { children: [
							(0, import_jsx_runtime$17.jsx)("div", { className: "w-1 h-10 bg-divider" }),
							(0, import_jsx_runtime$17.jsx)("div", { className: "my-2 w-4 h-4 rounded-full bg-divider" }),
							(!isLastOfAll || episodesInSameDate > 1) && (0, import_jsx_runtime$17.jsx)("div", { className: clsx_default("w-1 bg-divider", isLastOfDate ? "h-110" : "h-130") })
						] })
					}), (0, import_jsx_runtime$17.jsxs)("div", {
						className: clsx_default("flex-1 min-w-0", !isLastOfAll && isLastOfDate && "mb-20"),
						children: [(0, import_jsx_runtime$17.jsxs)("div", {
							className: "flex justify-between items-center mb-10",
							children: [(0, import_jsx_runtime$17.jsxs)("div", {
								className: "flex shrink-0 gap-8 items-center",
								children: [(0, import_jsx_runtime$17.jsx)("div", {
									className: "relative",
									children: (0, import_jsx_runtime$17.jsx)(EnhancedImage, {
										className: "w-32 h-32 rounded-full select-text",
										src: `https://images.weserv.nl/?url=${encodeURIComponent(props.UPInfo ? props.UPInfo.avatar : props.mainCover)}`,
										alt: ""
									})
								}), (0, import_jsx_runtime$17.jsxs)("div", {
									className: "flex flex-col gap-6",
									children: [(0, import_jsx_runtime$17.jsx)("div", {
										className: "text-4xl font-bold select-text text-foreground-700",
										children: props.UPInfo ? props.UPInfo.uname : props.Title
									}), (0, import_jsx_runtime$17.jsxs)("div", {
										className: "flex gap-4 items-center text-3xl select-text text-foreground-600",
										children: [(0, import_jsx_runtime$17.jsx)(Calendar, { size: 30 }), (0, import_jsx_runtime$17.jsx)("span", { children: "发布了内容" })]
									})]
								})]
							}), (0, import_jsx_runtime$17.jsx)("div", {
								className: "shrink-0 pr-20",
								children: (0, import_jsx_runtime$17.jsxs)("div", {
									className: "text-5xl font-semibold select-text text-foreground-600",
									children: [
										"第",
										actualEpisodeNumber,
										"集"
									]
								})
							})]
						}), (0, import_jsx_runtime$17.jsx)("div", {
							className: "overflow-hidden shadow-large bg-content1 rounded-4xl",
							children: (0, import_jsx_runtime$17.jsxs)("div", {
								className: "flex gap-12 p-12",
								children: [(0, import_jsx_runtime$17.jsx)("div", {
									className: "relative shrink-0",
									children: (0, import_jsx_runtime$17.jsxs)("div", {
										className: "overflow-hidden relative h-64 rounded-3xl w-md",
										children: [(0, import_jsx_runtime$17.jsx)(EnhancedImage, {
											src: episode.cover,
											alt: `第${actualEpisodeNumber}集 ${episode.long_title}`,
											className: "object-cover w-full h-full select-text"
										}), episode.badge && (0, import_jsx_runtime$17.jsx)(chip_default, {
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
								}), (0, import_jsx_runtime$17.jsxs)("div", {
									className: "flex flex-col flex-1 justify-center h-64",
									children: [(0, import_jsx_runtime$17.jsx)("div", {
										className: "mb-8 text-5xl font-semibold select-text text-foreground line-clamp-2",
										children: episode.long_title
									}), (0, import_jsx_runtime$17.jsxs)("div", {
										className: "space-y-4 text-4xl",
										children: [
											(0, import_jsx_runtime$17.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$17.jsx)(Hash, { size: 36 }), (0, import_jsx_runtime$17.jsx)("span", {
													className: "truncate",
													children: episode.bvid
												})]
											}),
											(0, import_jsx_runtime$17.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$17.jsx)(Clock, { size: 36 }), (0, import_jsx_runtime$17.jsx)("span", {
													className: "whitespace-nowrap",
													children: formatDateTime(episode.pub_time)
												})]
											}),
											(0, import_jsx_runtime$17.jsxs)("div", {
												className: "flex gap-6 items-center select-text text-foreground-600",
												children: [(0, import_jsx_runtime$17.jsx)(Share2, { size: 36 }), (0, import_jsx_runtime$17.jsx)("span", {
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
	BangumiBilibili = import_react$19.memo((props) => (0, import_jsx_runtime$17.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$17.jsxs)("div", {
			className: "p-4",
			children: [(0, import_jsx_runtime$17.jsx)(BangumiBilibiliHeader, {
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
			}), (0, import_jsx_runtime$17.jsx)(BangumiBilibiliEpisodes, { ...props.data })]
		})
	}));
	BangumiBilibili.displayName = "BangumiBilibili";
	bangumi_default = BangumiBilibili;
}), import_jsx_runtime$16, BilibiliReserveCard, BilibiliVoteCard, BilibiliCommonCard, BilibiliUgcCard, BilibiliAdditionalCard;
var init_AdditionalCard = __esmMin(() => {
	init_dist();
	init_lucide_react();
	__toESM(require_react(), 1);
	init_shared();
	import_jsx_runtime$16 = __toESM(require_jsx_runtime(), 1);
	BilibiliReserveCard = ({ reserve }) => {
		if (!reserve) return null;
		return (0, import_jsx_runtime$16.jsx)("div", {
			className: "overflow-hidden rounded-2xl bg-default-100",
			children: (0, import_jsx_runtime$16.jsxs)("div", {
				className: "flex gap-8 justify-between items-center px-10 py-10",
				children: [(0, import_jsx_runtime$16.jsxs)("div", {
					className: "flex flex-col gap-4 flex-1",
					children: [
						(0, import_jsx_runtime$16.jsx)("div", {
							className: "text-5xl font-normal text-foreground select-text leading-tight",
							children: reserve.title
						}),
						(0, import_jsx_runtime$16.jsxs)("div", {
							className: "flex gap-8 items-center font-light text-4xl text-foreground-500",
							children: [(0, import_jsx_runtime$16.jsx)("span", {
								className: "select-text",
								children: reserve.desc1
							}), (0, import_jsx_runtime$16.jsx)("span", {
								className: "select-text",
								children: reserve.desc2
							})]
						}),
						reserve.desc3 && (0, import_jsx_runtime$16.jsxs)("div", {
							className: "flex gap-2 items-center text-4xl select-text leading-none text-[#fb7299]",
							children: [(0, import_jsx_runtime$16.jsx)(Gift, {
								size: 40,
								className: "shrink-0"
							}), (0, import_jsx_runtime$16.jsx)("span", {
								className: "line-clamp-1",
								children: reserve.desc3
							})]
						})
					]
				}), (0, import_jsx_runtime$16.jsx)("div", {
					className: "shrink-0",
					children: (0, import_jsx_runtime$16.jsx)(button_default, {
						startContent: reserve.buttonText !== "已结束" ? (0, import_jsx_runtime$16.jsx)(Bell, { className: "scale-180 mr-4" }) : void 0,
						className: `text-5xl font-normal px-8 py-5 h-auto min-w-0 ${reserve.buttonText === "已结束" ? "bg-default/70 text-default-400" : "bg-[#fb7299] text-white"}`,
						radius: "md",
						children: reserve.buttonText
					})
				})]
			})
		});
	};
	BilibiliVoteCard = ({ vote }) => {
		if (!vote) return null;
		const isEnded = vote.status === 4;
		return (0, import_jsx_runtime$16.jsx)("div", {
			className: "overflow-hidden rounded-2xl bg-default-100",
			children: (0, import_jsx_runtime$16.jsxs)("div", {
				className: "flex gap-8 items-center px-10 py-8",
				children: [
					(0, import_jsx_runtime$16.jsx)("div", {
						className: "shrink-0",
						children: (0, import_jsx_runtime$16.jsx)(ChartColumn, {
							size: 56,
							className: "text-foreground-400"
						})
					}),
					(0, import_jsx_runtime$16.jsxs)("div", {
						className: "flex flex-col gap-3 flex-1 min-w-0",
						children: [(0, import_jsx_runtime$16.jsx)("div", {
							className: "text-5xl font-medium text-foreground select-text line-clamp-1",
							children: vote.title
						}), (0, import_jsx_runtime$16.jsx)("div", {
							className: "text-4xl text-foreground-500 select-text",
							children: vote.desc
						})]
					}),
					(0, import_jsx_runtime$16.jsx)("div", {
						className: "shrink-0",
						children: (0, import_jsx_runtime$16.jsx)(button_default, {
							className: `text-5xl font-normal px-8 py-5 h-auto min-w-0 ${isEnded ? "bg-default/70 text-default-400" : "bg-[#fb7299] text-white"}`,
							radius: "md",
							children: isEnded ? "已结束" : "参与"
						})
					})
				]
			})
		});
	};
	BilibiliCommonCard = ({ common: common$1 }) => {
		if (!common$1) return null;
		const getTagText = () => {
			if (common$1.sub_type === "game") return "游戏";
			return common$1.desc1;
		};
		return (0, import_jsx_runtime$16.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [common$1.head_text && (0, import_jsx_runtime$16.jsxs)("div", {
				className: "flex gap-2 items-center text-4xl text-foreground-500",
				children: [(0, import_jsx_runtime$16.jsx)(Gamepad2, { size: 40 }), (0, import_jsx_runtime$16.jsx)("span", { children: common$1.head_text })]
			}), (0, import_jsx_runtime$16.jsx)("div", {
				className: "overflow-hidden rounded-2xl bg-default-100",
				children: (0, import_jsx_runtime$16.jsxs)("div", {
					className: "flex gap-8 items-center px-10 py-8",
					children: [
						(0, import_jsx_runtime$16.jsx)("div", {
							className: "shrink-0",
							children: (0, import_jsx_runtime$16.jsx)(EnhancedImage, {
								src: common$1.cover,
								alt: common$1.title,
								className: "w-40 h-40 rounded-2xl object-cover"
							})
						}),
						(0, import_jsx_runtime$16.jsxs)("div", {
							className: "flex flex-col gap-3 flex-1 min-w-0",
							children: [
								(0, import_jsx_runtime$16.jsx)("div", {
									className: "text-5xl font-medium text-foreground select-text line-clamp-1",
									children: common$1.title
								}),
								(0, import_jsx_runtime$16.jsxs)("div", {
									className: "flex gap-3 items-center text-4xl",
									children: [(0, import_jsx_runtime$16.jsx)("span", {
										className: "shrink-0 px-3 py-1 rounded-md bg-[#fb7299]/10 text-[#fb7299] text-3xl",
										children: getTagText()
									}), common$1.sub_type === "game" && common$1.desc1 && (0, import_jsx_runtime$16.jsx)("span", {
										className: "text-foreground-500 line-clamp-1 select-text",
										children: common$1.desc1
									})]
								}),
								common$1.desc2 && (0, import_jsx_runtime$16.jsx)("div", {
									className: "text-4xl text-foreground-500 line-clamp-1 select-text",
									children: common$1.desc2
								})
							]
						}),
						common$1.button_text && (0, import_jsx_runtime$16.jsx)("div", {
							className: "shrink-0",
							children: (0, import_jsx_runtime$16.jsx)(button_default, {
								className: "text-5xl font-normal px-8 py-5 h-auto min-w-0 bg-[#fb7299] text-white",
								radius: "md",
								children: common$1.button_text
							})
						})
					]
				})
			})]
		});
	};
	BilibiliUgcCard = ({ ugc }) => {
		if (!ugc) return null;
		return (0, import_jsx_runtime$16.jsx)("div", {
			className: "overflow-hidden rounded-3xl bg-default-100",
			children: (0, import_jsx_runtime$16.jsxs)("div", {
				className: "flex gap-8 items-center pr-8",
				children: [(0, import_jsx_runtime$16.jsxs)("div", {
					className: "relative shrink-0 p-5",
					children: [(0, import_jsx_runtime$16.jsx)(EnhancedImage, {
						src: ugc.cover,
						alt: ugc.title,
						className: "h-52 w-auto rounded-2xl"
					}), (0, import_jsx_runtime$16.jsx)("div", {
						className: "absolute bottom-7 right-7 px-3 py-1 rounded-lg bg-black/70 text-white text-3xl",
						children: ugc.duration
					})]
				}), (0, import_jsx_runtime$16.jsxs)("div", {
					className: "flex flex-col gap-4 flex-1 min-w-0",
					children: [(0, import_jsx_runtime$16.jsx)("div", {
						className: "text-5xl font-medium text-foreground select-text line-clamp-2 leading-normal",
						children: ugc.title
					}), (0, import_jsx_runtime$16.jsxs)("div", {
						className: "flex gap-8 items-center text-4xl text-foreground-500",
						children: [(0, import_jsx_runtime$16.jsxs)("span", { children: [ugc.play, "播放"] }), (0, import_jsx_runtime$16.jsxs)("span", { children: [ugc.danmaku, "弹幕"] })]
					})]
				})]
			})
		});
	};
	BilibiliAdditionalCard = ({ additional }) => {
		if (!additional) return null;
		return (0, import_jsx_runtime$16.jsxs)("div", {
			className: "px-20 pb-20",
			children: [
				additional.type === "ADDITIONAL_TYPE_RESERVE" && additional.reserve && (0, import_jsx_runtime$16.jsx)(BilibiliReserveCard, { reserve: additional.reserve }),
				additional.type === "ADDITIONAL_TYPE_VOTE" && additional.vote && (0, import_jsx_runtime$16.jsx)(BilibiliVoteCard, { vote: additional.vote }),
				additional.type === "ADDITIONAL_TYPE_COMMON" && additional.common && (0, import_jsx_runtime$16.jsx)(BilibiliCommonCard, { common: additional.common }),
				additional.type === "ADDITIONAL_TYPE_UGC" && additional.ugc && (0, import_jsx_runtime$16.jsx)(BilibiliUgcCard, { ugc: additional.ugc })
			]
		});
	};
});
var DYNAMIC_TYPE_DRAW_exports = __export({
	BilibiliDrawDynamic: () => BilibiliDrawDynamic,
	default: () => DYNAMIC_TYPE_DRAW_default
}, 1);
var import_react$17, import_jsx_runtime$15, BilibiliDynamicUserInfo$1, BilibiliDynamicContent, BilibiliDynamicStatus$1, BilibiliDynamicFooter$1, BilibiliDrawDynamic, DYNAMIC_TYPE_DRAW_default;
var init_DYNAMIC_TYPE_DRAW = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$17 = __toESM(require_react(), 1);
	init_lu();
	init_DefaultLayout();
	init_shared();
	init_AdditionalCard();
	import_jsx_runtime$15 = __toESM(require_jsx_runtime(), 1);
	BilibiliDynamicUserInfo$1 = (props) => (0, import_jsx_runtime$15.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$15.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$15.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "头像",
					className: "w-32 h-32 rounded-full shadow-medium",
					isCircular: true
				}), props.frame && (0, import_jsx_runtime$15.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$15.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$15.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$15.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$15.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$15.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.create_time]
				})]
			}),
			props.decoration_card && (0, import_jsx_runtime$15.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$15.jsx)(DecorationCard, { html: props.decoration_card })
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
		return (0, import_jsx_runtime$15.jsxs)(import_jsx_runtime$15.Fragment, { children: [
			(0, import_jsx_runtime$15.jsxs)("div", {
				className: "flex flex-col px-20 w-full leading-relaxed",
				children: [(0, import_jsx_runtime$15.jsx)("div", {
					className: "relative items-center text-5xl tracking-wider wrap-break-word text-foreground",
					children: (0, import_jsx_runtime$15.jsx)(CommentText, {
						className: clsx_default("text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-5 select-text", "[&_svg]:inline [&_svg]:mb-4!", "[&_img]:inline [&_img]:mx-1 [&_img]:align-text-bottom"),
						content: props.text,
						style: {
							wordBreak: "break-word",
							overflowWrap: "break-word"
						}
					})
				}), (0, import_jsx_runtime$15.jsx)("div", { className: "h-15" })]
			}),
			props.image_url && Array.isArray(props.image_url) && props.image_url.length > 0 && (0, import_jsx_runtime$15.jsxs)("div", {
				className: "px-20",
				children: [
					layoutType === "grid" && (0, import_jsx_runtime$15.jsx)("div", {
						className: "grid grid-cols-3 gap-4 w-full",
						children: props.image_url.slice(0, 9).map((img, index) => (0, import_jsx_runtime$15.jsx)("div", {
							className: "overflow-hidden rounded-2xl aspect-square shadow-medium",
							children: (0, import_jsx_runtime$15.jsx)(EnhancedImage, {
								src: img.image_src,
								alt: `图片${index + 1}`,
								className: "object-cover w-full h-full"
							})
						}, index))
					}),
					layoutType === "waterfall" && (0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex gap-4 w-full",
						children: [(0, import_jsx_runtime$15.jsx)("div", {
							className: "flex flex-col flex-1 gap-4",
							children: props.image_url.filter((_, index) => index % 2 === 0).map((img, arrayIndex) => {
								const originalIndex = arrayIndex * 2;
								return (0, import_jsx_runtime$15.jsx)("div", {
									className: "overflow-hidden rounded-2xl shadow-medium",
									children: (0, import_jsx_runtime$15.jsx)(EnhancedImage, {
										src: img.image_src,
										alt: `图片${originalIndex + 1}`,
										className: "object-cover w-full h-auto"
									})
								}, originalIndex);
							})
						}), (0, import_jsx_runtime$15.jsx)("div", {
							className: "flex flex-col flex-1 gap-4",
							children: props.image_url.filter((_, index) => index % 2 === 1).map((img, arrayIndex) => {
								const originalIndex = arrayIndex * 2 + 1;
								return (0, import_jsx_runtime$15.jsx)("div", {
									className: "overflow-hidden rounded-2xl shadow-medium",
									children: (0, import_jsx_runtime$15.jsx)(EnhancedImage, {
										src: img.image_src,
										alt: `图片${originalIndex + 1}`,
										className: "object-cover w-full h-auto"
									})
								}, originalIndex);
							})
						})]
					}),
					layoutType === "vertical" && props.image_url.map((img, index) => (0, import_jsx_runtime$15.jsxs)(import_react$17.Fragment, { children: [(0, import_jsx_runtime$15.jsx)("div", {
						className: "flex flex-col items-center",
						children: (0, import_jsx_runtime$15.jsx)("div", {
							className: "flex overflow-hidden flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
							children: (0, import_jsx_runtime$15.jsx)(EnhancedImage, {
								src: img.image_src,
								alt: "封面",
								className: "object-contain w-full h-full rounded-3xl"
							})
						})
					}), (0, import_jsx_runtime$15.jsx)("div", { className: "h-18" })] }, index)),
					(layoutType === "waterfall" || layoutType === "grid") && (0, import_jsx_runtime$15.jsx)("div", { className: "h-18" })
				]
			}),
			props.additional && (0, import_jsx_runtime$15.jsx)(BilibiliAdditionalCard, { additional: props.additional })
		] });
	};
	BilibiliDynamicStatus$1 = (props) => (0, import_jsx_runtime$15.jsxs)("div", {
		className: "flex flex-col gap-10 px-20 w-full leading-relaxed",
		children: [
			(0, import_jsx_runtime$15.jsxs)("div", {
				className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$15.jsx)(Heart, {
								size: 48,
								className: "text-like"
							}),
							props.dianzan,
							"点赞"
						]
					}),
					(0, import_jsx_runtime$15.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$15.jsx)(MessageCircle, {
								size: 48,
								className: "text-primary text-comment"
							}),
							props.pinglun,
							"评论"
						]
					}),
					(0, import_jsx_runtime$15.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$15.jsx)(Share2, {
								size: 48,
								className: "text-success"
							}),
							props.share,
							"分享"
						]
					})
				]
			}),
			(0, import_jsx_runtime$15.jsxs)("div", {
				className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$15.jsx)(LuFullscreen, {
						size: 48,
						className: "text-time"
					}),
					"图片生成于: ",
					props.render_time
				]
			}),
			(0, import_jsx_runtime$15.jsx)("div", { className: "h-3" })
		]
	});
	BilibiliDynamicFooter$1 = (props) => (0, import_jsx_runtime$15.jsxs)("div", {
		className: "flex justify-between items-start px-20 pb-20",
		children: [(0, import_jsx_runtime$15.jsxs)("div", {
			className: "flex flex-col gap-12",
			children: [(0, import_jsx_runtime$15.jsxs)("div", {
				className: "flex gap-12 items-start",
				children: [(0, import_jsx_runtime$15.jsxs)("div", {
					className: "relative shrink-0",
					children: [(0, import_jsx_runtime$15.jsx)(EnhancedImage, {
						src: props.avatar_url,
						alt: "头像",
						className: "rounded-full shadow-medium w-35 h-auto",
						isCircular: true
					}), props.frame && (0, import_jsx_runtime$15.jsx)(EnhancedImage, {
						src: props.frame,
						alt: "头像框",
						className: "absolute inset-0 transform scale-180"
					})]
				}), (0, import_jsx_runtime$15.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [(0, import_jsx_runtime$15.jsx)("div", {
						className: "text-7xl font-bold select-text text-foreground",
						children: (0, import_jsx_runtime$15.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
					}), (0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex gap-2 items-center text-4xl text-default-500",
						children: [(0, import_jsx_runtime$15.jsx)(Hash, {
							size: 32,
							className: "text-default-400"
						}), (0, import_jsx_runtime$15.jsxs)("span", {
							className: "select-text",
							children: ["UID: ", props.user_shortid]
						})]
					})]
				})]
			}), (0, import_jsx_runtime$15.jsxs)("div", {
				className: "text-3xl flex gap-6 items-center text-default-600",
				children: [
					(0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$15.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$15.jsx)(Heart, {
									size: 28,
									className: "text-like"
								}), (0, import_jsx_runtime$15.jsx)("span", {
									className: "text-default-400",
									children: "获赞"
								})]
							}),
							(0, import_jsx_runtime$15.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$15.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.total_favorited
							})
						]
					}),
					(0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$15.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$15.jsx)(Eye, {
									size: 28,
									className: "text-view"
								}), (0, import_jsx_runtime$15.jsx)("span", {
									className: "text-default-400",
									children: "关注"
								})]
							}),
							(0, import_jsx_runtime$15.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$15.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.following_count
							})
						]
					}),
					(0, import_jsx_runtime$15.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$15.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$15.jsx)(Users, {
									size: 28,
									className: "text-primary"
								}), (0, import_jsx_runtime$15.jsx)("span", {
									className: "text-default-400",
									children: "粉丝"
								})]
							}),
							(0, import_jsx_runtime$15.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$15.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.fans
							})
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$15.jsx)("div", {
			className: "flex flex-col items-center gap-4",
			children: props.qrCodeDataUrl ? (0, import_jsx_runtime$15.jsx)("img", {
				src: props.qrCodeDataUrl,
				alt: "二维码",
				className: "h-auto w-75 rounded-2xl"
			}) : (0, import_jsx_runtime$15.jsx)("div", {
				className: "flex justify-center items-center rounded-2xl bg-default-100 w-100 h-100",
				children: (0, import_jsx_runtime$15.jsx)("span", {
					className: "text-default-400",
					children: "二维码"
				})
			})
		})]
	});
	BilibiliDrawDynamic = import_react$17.memo((props) => (0, import_jsx_runtime$15.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$15.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$15.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$15.jsx)(BilibiliDynamicUserInfo$1, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					create_time: props.data.create_time,
					decoration_card: props.data.decoration_card
				}),
				(0, import_jsx_runtime$15.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$15.jsx)(BilibiliDynamicContent, {
					text: props.data.text,
					image_url: props.data.image_url,
					imageLayout: props.data.imageLayout,
					additional: props.data.additional
				}),
				(0, import_jsx_runtime$15.jsx)(BilibiliDynamicStatus$1, {
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					render_time: props.data.render_time
				}),
				(0, import_jsx_runtime$15.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$15.jsx)(BilibiliDynamicFooter$1, {
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
	BilibiliDrawDynamic.displayName = "BilibiliDrawDynamic";
	DYNAMIC_TYPE_DRAW_default = BilibiliDrawDynamic;
});
var DYNAMIC_TYPE_WORD_exports = __export({
	BilibiliWordDynamic: () => BilibiliWordDynamic,
	default: () => DYNAMIC_TYPE_WORD_default
}, 1);
var import_react$16, import_jsx_runtime$14, BilibiliDynamicUserInfo, BilibiliWordContent, BilibiliDynamicStatus, BilibiliDynamicFooter, BilibiliWordDynamic, DYNAMIC_TYPE_WORD_default;
var init_DYNAMIC_TYPE_WORD = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$16 = __toESM(require_react(), 1);
	init_lu();
	init_DefaultLayout();
	init_shared();
	init_AdditionalCard();
	import_jsx_runtime$14 = __toESM(require_jsx_runtime(), 1);
	BilibiliDynamicUserInfo = (props) => (0, import_jsx_runtime$14.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$14.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$14.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "头像",
					className: "w-32 h-32 rounded-full shadow-medium",
					isCircular: true
				}), props.frame && (0, import_jsx_runtime$14.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$14.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$14.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$14.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$14.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$14.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.create_time]
				})]
			}),
			props.decoration_card && (0, import_jsx_runtime$14.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$14.jsx)(DecorationCard, { html: props.decoration_card })
			})
		]
	});
	BilibiliWordContent = (props) => (0, import_jsx_runtime$14.jsxs)(import_jsx_runtime$14.Fragment, { children: [(0, import_jsx_runtime$14.jsxs)("div", {
		className: "flex flex-col px-20 w-full leading-relaxed",
		children: [(0, import_jsx_runtime$14.jsx)("div", {
			className: "relative items-center text-5xl tracking-wider wrap-break-word text-foreground",
			children: (0, import_jsx_runtime$14.jsx)(CommentText, {
				className: clsx_default("text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-5 select-text", "[&_svg]:inline [&_svg]:mb-4!", "[&_img]:inline [&_img]:mx-1 [&_img]:align-bottom [&_img]:relative [&_img]:-top-2"),
				content: props.text,
				style: {
					wordBreak: "break-word",
					overflowWrap: "break-word"
				}
			})
		}), (0, import_jsx_runtime$14.jsx)("div", { className: "h-15" })]
	}), props.additional && (0, import_jsx_runtime$14.jsx)(BilibiliAdditionalCard, { additional: props.additional })] });
	BilibiliDynamicStatus = (props) => (0, import_jsx_runtime$14.jsxs)("div", {
		className: "flex flex-col gap-10 px-20 w-full leading-relaxed",
		children: [
			(0, import_jsx_runtime$14.jsxs)("div", {
				className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$14.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$14.jsx)(Heart, {
								size: 48,
								className: "text-like"
							}),
							props.dianzan,
							"点赞"
						]
					}),
					(0, import_jsx_runtime$14.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$14.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$14.jsx)(MessageCircle, {
								size: 48,
								className: "text-primary text-comment"
							}),
							props.pinglun,
							"评论"
						]
					}),
					(0, import_jsx_runtime$14.jsx)("span", { children: "·" }),
					(0, import_jsx_runtime$14.jsxs)("div", {
						className: "flex gap-2 items-center",
						children: [
							(0, import_jsx_runtime$14.jsx)(Share2, {
								size: 48,
								className: "text-success"
							}),
							props.share,
							"分享"
						]
					})
				]
			}),
			(0, import_jsx_runtime$14.jsxs)("div", {
				className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600",
				children: [
					(0, import_jsx_runtime$14.jsx)(LuFullscreen, {
						size: 48,
						className: "text-time"
					}),
					"图片生成于: ",
					props.render_time
				]
			}),
			(0, import_jsx_runtime$14.jsx)("div", { className: "h-3" })
		]
	});
	BilibiliDynamicFooter = (props) => (0, import_jsx_runtime$14.jsxs)("div", {
		className: "flex justify-between items-start px-20 pb-20",
		children: [(0, import_jsx_runtime$14.jsxs)("div", {
			className: "flex flex-col gap-12",
			children: [(0, import_jsx_runtime$14.jsxs)("div", {
				className: "flex gap-12 items-start",
				children: [(0, import_jsx_runtime$14.jsxs)("div", {
					className: "relative shrink-0",
					children: [(0, import_jsx_runtime$14.jsx)(EnhancedImage, {
						src: props.avatar_url,
						alt: "头像",
						className: "rounded-full shadow-medium w-35 h-auto",
						isCircular: true
					}), props.frame && (0, import_jsx_runtime$14.jsx)(EnhancedImage, {
						src: props.frame,
						alt: "头像框",
						className: "absolute inset-0 transform scale-180"
					})]
				}), (0, import_jsx_runtime$14.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [(0, import_jsx_runtime$14.jsx)("div", {
						className: "text-7xl font-bold select-text text-foreground",
						children: (0, import_jsx_runtime$14.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
					}), (0, import_jsx_runtime$14.jsxs)("div", {
						className: "flex gap-2 items-center text-4xl text-default-500",
						children: [(0, import_jsx_runtime$14.jsx)(Hash, {
							size: 32,
							className: "text-default-400"
						}), (0, import_jsx_runtime$14.jsxs)("span", {
							className: "select-text",
							children: ["UID: ", props.user_shortid]
						})]
					})]
				})]
			}), (0, import_jsx_runtime$14.jsxs)("div", {
				className: "text-3xl flex gap-6 items-center text-default-600",
				children: [
					(0, import_jsx_runtime$14.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$14.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$14.jsx)(Heart, {
									size: 28,
									className: "text-like"
								}), (0, import_jsx_runtime$14.jsx)("span", {
									className: "text-default-400",
									children: "获赞"
								})]
							}),
							(0, import_jsx_runtime$14.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$14.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.total_favorited
							})
						]
					}),
					(0, import_jsx_runtime$14.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$14.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$14.jsx)(Eye, {
									size: 28,
									className: "text-view"
								}), (0, import_jsx_runtime$14.jsx)("span", {
									className: "text-default-400",
									children: "关注"
								})]
							}),
							(0, import_jsx_runtime$14.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$14.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.following_count
							})
						]
					}),
					(0, import_jsx_runtime$14.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$14.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$14.jsx)(Users, {
									size: 28,
									className: "text-primary"
								}), (0, import_jsx_runtime$14.jsx)("span", {
									className: "text-default-400",
									children: "粉丝"
								})]
							}),
							(0, import_jsx_runtime$14.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$14.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.fans
							})
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$14.jsx)("div", {
			className: "flex flex-col items-center gap-4",
			children: props.qrCodeDataUrl ? (0, import_jsx_runtime$14.jsx)("img", {
				src: props.qrCodeDataUrl,
				alt: "二维码",
				className: "h-auto w-75 rounded-2xl"
			}) : (0, import_jsx_runtime$14.jsx)("div", {
				className: "flex justify-center items-center rounded-2xl bg-default-100 w-100 h-100",
				children: (0, import_jsx_runtime$14.jsx)("span", {
					className: "text-default-400",
					children: "二维码"
				})
			})
		})]
	});
	BilibiliWordDynamic = import_react$16.memo((props) => (0, import_jsx_runtime$14.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$14.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$14.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$14.jsx)(BilibiliDynamicUserInfo, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					create_time: props.data.create_time,
					decoration_card: props.data.decoration_card
				}),
				(0, import_jsx_runtime$14.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$14.jsx)(BilibiliWordContent, {
					text: props.data.text,
					additional: props.data.additional
				}),
				(0, import_jsx_runtime$14.jsx)(BilibiliDynamicStatus, {
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					render_time: props.data.render_time
				}),
				(0, import_jsx_runtime$14.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$14.jsx)(BilibiliDynamicFooter, {
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
	BilibiliWordDynamic.displayName = "BilibiliWordDynamic";
	DYNAMIC_TYPE_WORD_default = BilibiliWordDynamic;
});
var DYNAMIC_TYPE_AV_exports = __export({
	BilibiliVideoDynamic: () => BilibiliVideoDynamic,
	default: () => DYNAMIC_TYPE_AV_default
}, 1);
var import_react$15, import_jsx_runtime$13, BilibiliVideoDynamicHeader, BilibiliVideoDynamicContent, BilibiliVideoDynamicFooter, BilibiliVideoDynamic, DYNAMIC_TYPE_AV_default;
var init_DYNAMIC_TYPE_AV = __esmMin(() => {
	init_date_fns();
	init_lucide_react();
	import_react$15 = __toESM(require_react(), 1);
	init_lu();
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$13 = __toESM(require_jsx_runtime(), 1);
	BilibiliVideoDynamicHeader = () => (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
		(0, import_jsx_runtime$13.jsx)("div", { className: "h-20" }),
		(0, import_jsx_runtime$13.jsxs)("div", {
			className: "flex items-center pl-20 text-6xl text-default-500",
			children: [(0, import_jsx_runtime$13.jsx)("img", {
				src: "/image/bilibili/bilibili.png",
				alt: "bilibili",
				className: "h-auto w-120"
			}), (0, import_jsx_runtime$13.jsx)("span", {
				className: "ml-8 text-5xl select-text",
				children: "你感兴趣的视频都在哔哩哔哩"
			})]
		}),
		(0, import_jsx_runtime$13.jsx)("div", { className: "h-20" })
	] });
	BilibiliVideoDynamicContent = (props) => (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [props.data.image_url && (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [(0, import_jsx_runtime$13.jsx)("div", {
		className: "flex flex-col items-center",
		children: (0, import_jsx_runtime$13.jsxs)("div", {
			className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
			children: [(0, import_jsx_runtime$13.jsx)(EnhancedImage, {
				src: props.data.image_url,
				alt: "封面",
				className: "object-contain w-full h-full rounded-3xl"
			}), (0, import_jsx_runtime$13.jsx)("div", {
				className: "flex absolute bottom-12 right-16",
				children: (0, import_jsx_runtime$13.jsx)("img", {
					src: "/image/bilibili/play.svg",
					alt: "播放图标",
					className: "w-40 h-40"
				})
			})]
		})
	}), (0, import_jsx_runtime$13.jsx)("div", { className: "h-5" })] }), (0, import_jsx_runtime$13.jsxs)("div", {
		className: "flex flex-col w-full leading-relaxed px-21",
		children: [
			(0, import_jsx_runtime$13.jsx)("div", {
				className: "relative items-center text-8xl font-bold tracking-wider wrap-break-word text-foreground",
				children: (0, import_jsx_runtime$13.jsx)(CommentText, {
					className: "text-[80px] font-bold tracking-[1.5px] leading-normal whitespace-pre-wrap text-foreground select-text",
					content: props.data.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}),
			(0, import_jsx_runtime$13.jsx)("div", { className: "h-10" }),
			(0, import_jsx_runtime$13.jsx)("div", {
				className: "text-6xl text-default-500",
				children: (0, import_jsx_runtime$13.jsx)(CommentText, {
					className: "text-[60px] leading-normal whitespace-pre-wrap text-default-500 select-text",
					content: props.data.desc,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}),
			(0, import_jsx_runtime$13.jsx)("div", { className: "h-30" }),
			(0, import_jsx_runtime$13.jsxs)("div", {
				className: "flex flex-col gap-15 text-default-600",
				children: [(0, import_jsx_runtime$13.jsxs)("div", {
					className: "flex flex-col gap-8",
					children: [(0, import_jsx_runtime$13.jsxs)("div", {
						className: "flex gap-12 items-center text-5xl font-light tracking-normal",
						children: [
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$13.jsx)(Heart, {
									size: 48,
									className: "text-like"
								}), (0, import_jsx_runtime$13.jsxs)("span", {
									className: "select-text",
									children: [props.data.dianzan, "点赞"]
								})]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$13.jsx)(MessageCircle, {
									size: 48,
									className: "text-comment"
								}), (0, import_jsx_runtime$13.jsxs)("span", {
									className: "select-text",
									children: [props.data.pinglun, "评论"]
								})]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$13.jsx)(Share2, {
									size: 48,
									className: "text-success"
								}), (0, import_jsx_runtime$13.jsxs)("span", {
									className: "select-text",
									children: [props.data.share, "分享"]
								})]
							})
						]
					}), (0, import_jsx_runtime$13.jsxs)("div", {
						className: "flex gap-12 items-center text-5xl font-light tracking-normal",
						children: [
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$13.jsx)(Coins, {
									size: 48,
									className: "text-warning"
								}), (0, import_jsx_runtime$13.jsxs)("span", {
									className: "select-text",
									children: [props.data.coin, "硬币"]
								})]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-3 items-center",
								children: [(0, import_jsx_runtime$13.jsx)(Eye, {
									size: 48,
									className: "text-default-400 text-view"
								}), (0, import_jsx_runtime$13.jsxs)("span", {
									className: "select-text",
									children: [props.data.view, "浏览"]
								})]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-3 items-center text-5xl font-light tracking-normal",
								children: [(0, import_jsx_runtime$13.jsx)(Clock, {
									size: 48,
									className: "text-time"
								}), (0, import_jsx_runtime$13.jsxs)("span", {
									className: "select-text",
									children: ["视频时长: ", props.data.duration_text]
								})]
							})
						]
					})]
				}), (0, import_jsx_runtime$13.jsxs)("div", {
					className: "flex flex-col gap-4 text-4xl font-light",
					children: [
						(0, import_jsx_runtime$13.jsxs)("div", {
							className: "flex gap-3 items-center whitespace-nowrap",
							children: [(0, import_jsx_runtime$13.jsx)(Clock, {
								size: 32,
								className: "text-time"
							}), (0, import_jsx_runtime$13.jsxs)("span", {
								className: "select-text",
								children: ["发布于", props.data.create_time]
							})]
						}),
						(0, import_jsx_runtime$13.jsxs)("div", {
							className: "flex gap-3 items-center whitespace-nowrap",
							children: [(0, import_jsx_runtime$13.jsx)(LuFullscreen, {
								size: 32,
								className: "text-time"
							}), (0, import_jsx_runtime$13.jsxs)("span", { children: ["图片生成于: ", format(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss")] })]
						}),
						(0, import_jsx_runtime$13.jsxs)("div", {
							className: "flex gap-3 items-center",
							children: [(0, import_jsx_runtime$13.jsx)(Hash, {
								size: 32,
								className: "text-default-400"
							}), (0, import_jsx_runtime$13.jsxs)("span", {
								className: "select-text",
								children: ["动态ID: ", props.data.dynamic_id]
							})]
						})
					]
				})]
			}),
			(0, import_jsx_runtime$13.jsx)("div", { className: "h-40" })
		]
	})] });
	BilibiliVideoDynamicFooter = (props) => {
		const otherStaff = props.data.staff?.filter((member) => member.mid !== Number(props.data.user_shortid)) || [];
		const currentUserRole = props.data.staff?.find((member) => member.mid === Number(props.data.user_shortid))?.title;
		const listRef = import_react$15.useRef(null);
		const [visibleCount, setVisibleCount] = import_react$15.useState(otherStaff.length);
		import_react$15.useEffect(() => {
			const calc = () => {
				const el = listRef.current;
				if (!el || otherStaff.length === 0) return;
				const containerWidth = el.offsetWidth;
				const capacity = Math.floor(containerWidth / 200);
				setVisibleCount(otherStaff.length > capacity ? Math.max(0, capacity - 1) : otherStaff.length);
			};
			calc();
			window.addEventListener("resize", calc);
			return () => window.removeEventListener("resize", calc);
		}, [otherStaff.length]);
		return (0, import_jsx_runtime$13.jsxs)(import_jsx_runtime$13.Fragment, { children: [
			otherStaff.length > 0 && (0, import_jsx_runtime$13.jsx)("div", {
				className: "flex flex-col px-20 w-full",
				children: (0, import_jsx_runtime$13.jsxs)("div", {
					ref: listRef,
					className: "flex overflow-hidden gap-8 py-1 w-full",
					children: [otherStaff.slice(0, visibleCount).map((member) => (0, import_jsx_runtime$13.jsxs)("div", {
						className: "flex flex-col items-center min-w-42 w-42 shrink-0",
						children: [
							(0, import_jsx_runtime$13.jsx)("div", {
								className: "flex justify-center items-center bg-white rounded-full w-30 h-30",
								children: (0, import_jsx_runtime$13.jsx)(EnhancedImage, {
									src: member.face,
									alt: member.name,
									className: "object-cover w-28 h-28 rounded-full",
									isCircular: true
								})
							}),
							(0, import_jsx_runtime$13.jsx)("div", {
								className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground",
								children: member.name
							}),
							(0, import_jsx_runtime$13.jsx)("div", {
								className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-default-500",
								children: member.title
							})
						]
					}, member.mid)), otherStaff.length > visibleCount && (0, import_jsx_runtime$13.jsxs)("div", {
						className: "flex flex-col items-center min-w-42 w-42 shrink-0",
						children: [
							(0, import_jsx_runtime$13.jsx)("div", {
								className: "flex justify-center items-center rounded-full bg-default-200 w-30 h-30",
								children: (0, import_jsx_runtime$13.jsx)("span", {
									className: "text-[42px] leading-none text-default-500",
									children: "···"
								})
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground",
								children: [
									"还有",
									otherStaff.length - visibleCount,
									"人"
								]
							}),
							(0, import_jsx_runtime$13.jsx)("div", {
								className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-default-500",
								children: "共创"
							})
						]
					})]
				})
			}),
			(0, import_jsx_runtime$13.jsx)("div", { className: "h-15" }),
			(0, import_jsx_runtime$13.jsxs)("div", {
				className: "flex justify-between items-start px-20 pb-20",
				children: [(0, import_jsx_runtime$13.jsxs)("div", {
					className: "flex flex-col gap-12",
					children: [(0, import_jsx_runtime$13.jsxs)("div", {
						className: "flex gap-12 items-start",
						children: [(0, import_jsx_runtime$13.jsxs)("div", {
							className: "relative shrink-0",
							children: [(0, import_jsx_runtime$13.jsx)(EnhancedImage, {
								src: props.data.avatar_url,
								alt: "头像",
								className: "rounded-full shadow-medium w-35 h-auto",
								isCircular: true
							}), props.data.frame && (0, import_jsx_runtime$13.jsx)(EnhancedImage, {
								src: props.data.frame,
								alt: "头像框",
								className: "absolute inset-0 transform scale-180"
							})]
						}), (0, import_jsx_runtime$13.jsxs)("div", {
							className: "flex flex-col gap-5",
							children: [(0, import_jsx_runtime$13.jsx)("div", {
								className: "text-7xl font-bold select-text text-foreground",
								children: (0, import_jsx_runtime$13.jsx)("span", { dangerouslySetInnerHTML: { __html: props.data.username } })
							}), (0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex gap-2 items-center text-4xl text-default-500",
								children: [
									(0, import_jsx_runtime$13.jsx)(Hash, { size: 32 }),
									(0, import_jsx_runtime$13.jsxs)("span", { children: ["UID: ", props.data.user_shortid] }),
									currentUserRole && (0, import_jsx_runtime$13.jsx)("span", {
										className: "ml-5 px-3 py-1 rounded-xl bg-default-200 text-3xl",
										children: currentUserRole
									})
								]
							})]
						})]
					}), (0, import_jsx_runtime$13.jsxs)("div", {
						className: "text-3xl flex gap-6 items-center text-default-600",
						children: [
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
								children: [
									(0, import_jsx_runtime$13.jsxs)("div", {
										className: "flex gap-1 items-center",
										children: [(0, import_jsx_runtime$13.jsx)(Heart, {
											size: 28,
											className: "text-like"
										}), (0, import_jsx_runtime$13.jsx)("span", {
											className: "text-default-400",
											children: "获赞"
										})]
									}),
									(0, import_jsx_runtime$13.jsx)("div", { className: "w-full h-px bg-default-300" }),
									(0, import_jsx_runtime$13.jsx)("span", {
										className: "select-text font-medium text-4xl",
										children: props.data.total_favorited
									})
								]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
								children: [
									(0, import_jsx_runtime$13.jsxs)("div", {
										className: "flex gap-1 items-center",
										children: [(0, import_jsx_runtime$13.jsx)(Eye, {
											size: 28,
											className: "text-view"
										}), (0, import_jsx_runtime$13.jsx)("span", {
											className: "text-default-400",
											children: "关注"
										})]
									}),
									(0, import_jsx_runtime$13.jsx)("div", { className: "w-full h-px bg-default-300" }),
									(0, import_jsx_runtime$13.jsx)("span", {
										className: "select-text font-medium text-4xl",
										children: props.data.following_count
									})
								]
							}),
							(0, import_jsx_runtime$13.jsxs)("div", {
								className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
								children: [
									(0, import_jsx_runtime$13.jsxs)("div", {
										className: "flex gap-1 items-center",
										children: [(0, import_jsx_runtime$13.jsx)(Users, {
											size: 28,
											className: "text-primary"
										}), (0, import_jsx_runtime$13.jsx)("span", {
											className: "text-default-400",
											children: "粉丝"
										})]
									}),
									(0, import_jsx_runtime$13.jsx)("div", { className: "w-full h-px bg-default-300" }),
									(0, import_jsx_runtime$13.jsx)("span", {
										className: "select-text font-medium text-4xl",
										children: props.data.fans
									})
								]
							})
						]
					})]
				}), (0, import_jsx_runtime$13.jsx)("div", {
					className: "flex flex-col items-center gap-4",
					children: props.qrCodeDataUrl ? (0, import_jsx_runtime$13.jsx)("img", {
						src: props.qrCodeDataUrl,
						alt: "二维码",
						className: "h-auto w-75 rounded-xl"
					}) : (0, import_jsx_runtime$13.jsx)("div", {
						className: "flex justify-center items-center rounded-xl bg-default-100 w-100 h-100",
						children: (0, import_jsx_runtime$13.jsx)("span", {
							className: "text-default-400",
							children: "二维码"
						})
					})
				})]
			})
		] });
	};
	BilibiliVideoDynamic = import_react$15.memo((props) => (0, import_jsx_runtime$13.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$13.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$13.jsx)(BilibiliVideoDynamicHeader, {}),
				(0, import_jsx_runtime$13.jsx)(BilibiliVideoDynamicContent, { ...props }),
				(0, import_jsx_runtime$13.jsx)(BilibiliVideoDynamicFooter, { ...props })
			]
		})
	}));
	BilibiliVideoDynamic.displayName = "BilibiliVideoDynamic";
	DYNAMIC_TYPE_AV_default = BilibiliVideoDynamic;
});
var DYNAMIC_TYPE_FORWARD_exports = __export({
	BilibiliForwardDynamic: () => BilibiliForwardDynamic,
	default: () => DYNAMIC_TYPE_FORWARD_default
}, 1);
var import_react$14, import_jsx_runtime$12, BilibiliForwardUserInfo, OriginalUserInfo, OriginalAVContent, OriginalDrawContent, OriginalWordContent, OriginalLiveRcmdContent, BilibiliForwardContent, BilibiliForwardStatus, BilibiliForwardFooter, BilibiliForwardDynamic, DYNAMIC_TYPE_FORWARD_default;
var init_DYNAMIC_TYPE_FORWARD = __esmMin(() => {
	init_clsx();
	init_lucide_react();
	import_react$14 = __toESM(require_react(), 1);
	init_lu();
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$12 = __toESM(require_jsx_runtime(), 1);
	BilibiliForwardUserInfo = (props) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$12.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "头像",
					className: "w-36 h-36 rounded-full shadow-medium",
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
				children: (0, import_jsx_runtime$12.jsx)(DecorationCard, { html: props.decoration_card })
			})
		]
	});
	OriginalUserInfo = (props) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "flex justify-between items-center pt-5 pb-10 pl-10 pr-0",
		children: [(0, import_jsx_runtime$12.jsxs)("div", {
			className: "flex gap-10 items-center min-w-0",
			children: [(0, import_jsx_runtime$12.jsxs)("div", {
				className: "relative shrink-0",
				children: [(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
					src: props.avatar_url,
					alt: "转发用户头像",
					className: "rounded-full shadow-medium w-30 h-30"
				}), props.frame && (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
					src: props.frame,
					alt: "转发用户头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}), (0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex flex-col gap-4 text-7xl",
				children: [(0, import_jsx_runtime$12.jsx)("div", {
					className: "text-5xl font-normal select-text text-foreground",
					children: (0, import_jsx_runtime$12.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
				}), (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$12.jsx)(Clock, {
						size: 32,
						className: "text-time"
					}), props.create_time]
				})]
			})]
		}), props.decoration_card && (0, import_jsx_runtime$12.jsx)("div", {
			className: "shrink-0",
			children: (0, import_jsx_runtime$12.jsx)(DecorationCard, { html: props.decoration_card })
		})]
	});
	OriginalAVContent = ({ content }) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-3xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$12.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$12.jsx)("div", {
				className: "flex flex-col items-center py-11",
				children: (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex overflow-hidden relative flex-col items-center w-11/12 rounded-2xl rounded-10 aspect-video shadow-large",
					children: [
						(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
							src: content.cover,
							alt: "视频封面",
							className: "object-cover object-center absolute"
						}),
						(0, import_jsx_runtime$12.jsx)("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-linear-to-t to-transparent pointer-events-none from-black/75" }),
						(0, import_jsx_runtime$12.jsxs)("div", {
							className: "absolute right-5 left-12 bottom-14 z-10 text-4xl font-light text-white select-text",
							children: [
								(0, import_jsx_runtime$12.jsx)("span", {
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
			(0, import_jsx_runtime$12.jsx)("div", {
				className: "pb-10 pl-8 text-6xl font-bold select-text leading-20 text-foreground",
				children: (0, import_jsx_runtime$12.jsx)("span", { dangerouslySetInnerHTML: { __html: content.title } })
			})
		]
	});
	OriginalDrawContent = ({ content }) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$12.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$12.jsx)("div", {
				className: "py-4",
				children: (0, import_jsx_runtime$12.jsxs)("div", {
					className: "text-5xl leading-relaxed text-foreground",
					children: [content.title && (0, import_jsx_runtime$12.jsx)("span", {
						className: "text-6xl font-bold",
						children: content.title
					}), (0, import_jsx_runtime$12.jsx)(CommentText, {
						className: clsx_default("text-[50px] tracking-[0.5px] leading-normal whitespace-pre-wrap text-foreground select-text", "[&_svg]:inline [&_svg]:mb-4!"),
						content: content.text,
						style: {
							wordBreak: "break-word",
							overflowWrap: "break-word"
						}
					})]
				})
			}),
			content.image_url && content.image_url.length === 1 ? (0, import_jsx_runtime$12.jsx)("div", {
				className: "flex justify-center py-11",
				children: (0, import_jsx_runtime$12.jsx)("div", {
					className: "flex overflow-hidden flex-col items-center w-11/12 rounded-6 shadow-large",
					children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
						src: content.image_url[0].image_src,
						alt: "图片",
						className: "object-cover w-full h-full rounded-6"
					})
				})
			}) : (0, import_jsx_runtime$12.jsx)("div", {
				className: "grid grid-cols-3 gap-4 p-4",
				children: content.image_url?.map((img, index) => (0, import_jsx_runtime$12.jsx)("div", {
					className: "overflow-hidden relative shadow-medium aspect-square rounded-2",
					children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
						src: img.image_src,
						alt: `图片${index + 1}`,
						className: "object-cover absolute top-0 left-0 w-full h-full"
					})
				}, index))
			}),
			(0, import_jsx_runtime$12.jsx)("div", { className: "h-4" })
		]
	});
	OriginalWordContent = ({ content }) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [(0, import_jsx_runtime$12.jsx)(OriginalUserInfo, {
			avatar_url: content.avatar_url,
			frame: content.frame,
			username: content.username,
			create_time: content.create_time,
			decoration_card: content.decoration_card
		}), (0, import_jsx_runtime$12.jsx)("div", {
			className: "py-4",
			children: (0, import_jsx_runtime$12.jsx)("div", {
				className: "text-5xl leading-relaxed text-foreground",
				children: (0, import_jsx_runtime$12.jsx)(CommentText, {
					className: "text-[50px] tracking-[0.5px] leading-normal whitespace-pre-wrap text-foreground select-text",
					content: content.text
				})
			})
		})]
	});
	OriginalLiveRcmdContent = ({ content }) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-200/60",
		children: [
			(0, import_jsx_runtime$12.jsx)(OriginalUserInfo, {
				avatar_url: content.avatar_url,
				frame: content.frame,
				username: content.username,
				create_time: content.create_time,
				decoration_card: content.decoration_card
			}),
			(0, import_jsx_runtime$12.jsx)("div", {
				className: "flex flex-col items-center py-11",
				children: (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex overflow-hidden relative flex-col items-center w-full rounded-10 aspect-video shadow-large",
					children: [
						(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
							src: content.cover,
							alt: "直播封面",
							className: "object-cover absolute w-full h-full"
						}),
						(0, import_jsx_runtime$12.jsx)("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-linear-to-t to-transparent pointer-events-none from-black/75" }),
						(0, import_jsx_runtime$12.jsxs)("div", {
							className: "absolute right-5 bottom-8 left-12 z-10 text-4xl font-light text-white select-text",
							children: [
								(0, import_jsx_runtime$12.jsx)("span", {
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
			(0, import_jsx_runtime$12.jsx)("div", {
				className: "pl-8 text-6xl font-bold select-text text-foreground",
				children: (0, import_jsx_runtime$12.jsx)("span", { dangerouslySetInnerHTML: { __html: content.title } })
			})
		]
	});
	BilibiliForwardContent = (props) => (0, import_jsx_runtime$12.jsxs)(import_jsx_runtime$12.Fragment, { children: [
		(0, import_jsx_runtime$12.jsxs)("div", {
			className: "flex flex-col px-20 w-full leading-relaxed",
			children: [(0, import_jsx_runtime$12.jsx)("div", {
				className: "relative items-center text-5xl tracking-wider wrap-break-word text-foreground",
				children: (0, import_jsx_runtime$12.jsx)(CommentText, {
					className: clsx_default("text-[65px] tracking-[1.5px] leading-normal whitespace-pre-wrap text-foreground mb-5 select-text", "[&_svg]:inline [&_svg]:mb-4!", "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"),
					content: props.text,
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				})
			}), props.imgList && props.imgList.length === 0 && (0, import_jsx_runtime$12.jsx)("div", { className: "h-15" })]
		}),
		props.imgList && props.imgList.length > 0 && (0, import_jsx_runtime$12.jsx)("div", {
			className: "flex flex-col items-center px-20 w-full",
			children: props.imgList.map((img, idx) => (0, import_jsx_runtime$12.jsxs)(import_react$14.Fragment, { children: [(0, import_jsx_runtime$12.jsx)("div", {
				className: "flex overflow-hidden relative flex-col items-center rounded-3xl shadow-large",
				children: (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
					src: img,
					alt: `图片${idx + 1}`,
					className: "object-contain w-full h-full rounded-3xl"
				})
			}), (0, import_jsx_runtime$12.jsx)("div", { className: "h-10" })] }, `${img}-${idx}`))
		}),
		(0, import_jsx_runtime$12.jsxs)("div", {
			className: "flex px-20",
			children: [
				props.original_content.DYNAMIC_TYPE_AV && (0, import_jsx_runtime$12.jsx)(OriginalAVContent, { content: props.original_content.DYNAMIC_TYPE_AV }),
				props.original_content.DYNAMIC_TYPE_DRAW && (0, import_jsx_runtime$12.jsx)(OriginalDrawContent, { content: props.original_content.DYNAMIC_TYPE_DRAW }),
				props.original_content.DYNAMIC_TYPE_WORD && (0, import_jsx_runtime$12.jsx)(OriginalWordContent, { content: props.original_content.DYNAMIC_TYPE_WORD }),
				props.original_content.DYNAMIC_TYPE_LIVE_RCMD && (0, import_jsx_runtime$12.jsx)(OriginalLiveRcmdContent, { content: props.original_content.DYNAMIC_TYPE_LIVE_RCMD })
			]
		})
	] });
	BilibiliForwardStatus = (props) => (0, import_jsx_runtime$12.jsxs)("div", {
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
					(0, import_jsx_runtime$12.jsx)(LuFullscreen, {
						size: 48,
						className: "text-time"
					}),
					"图片生成于: ",
					props.render_time
				]
			}),
			(0, import_jsx_runtime$12.jsx)("div", { className: "h-3" })
		]
	});
	BilibiliForwardFooter = (props) => (0, import_jsx_runtime$12.jsxs)("div", {
		className: "flex justify-between items-start px-20 pb-20",
		children: [(0, import_jsx_runtime$12.jsxs)("div", {
			className: "flex flex-col gap-12",
			children: [(0, import_jsx_runtime$12.jsxs)("div", {
				className: "flex gap-12 items-start",
				children: [(0, import_jsx_runtime$12.jsxs)("div", {
					className: "relative shrink-0",
					children: [(0, import_jsx_runtime$12.jsx)(EnhancedImage, {
						src: props.avatar_url,
						alt: "头像",
						className: "rounded-full shadow-medium w-35 h-auto",
						isCircular: true
					}), props.frame && (0, import_jsx_runtime$12.jsx)(EnhancedImage, {
						src: props.frame,
						alt: "头像框",
						className: "absolute inset-0 transform scale-180"
					})]
				}), (0, import_jsx_runtime$12.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [(0, import_jsx_runtime$12.jsx)("div", {
						className: "text-7xl font-bold select-text text-foreground",
						children: (0, import_jsx_runtime$12.jsx)("span", { dangerouslySetInnerHTML: { __html: props.username } })
					}), (0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex gap-2 items-center text-4xl text-default-500",
						children: [(0, import_jsx_runtime$12.jsx)(Hash, {
							size: 32,
							className: "text-default-400"
						}), (0, import_jsx_runtime$12.jsxs)("span", {
							className: "select-text",
							children: ["UID: ", props.user_shortid]
						})]
					})]
				})]
			}), (0, import_jsx_runtime$12.jsxs)("div", {
				className: "text-3xl flex gap-6 items-center text-default-600",
				children: [
					(0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$12.jsx)(Heart, {
									size: 28,
									className: "text-like"
								}), (0, import_jsx_runtime$12.jsx)("span", {
									className: "text-default-400",
									children: "获赞"
								})]
							}),
							(0, import_jsx_runtime$12.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$12.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.total_favorited
							})
						]
					}),
					(0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$12.jsx)(Eye, {
									size: 28,
									className: "text-view"
								}), (0, import_jsx_runtime$12.jsx)("span", {
									className: "text-default-400",
									children: "关注"
								})]
							}),
							(0, import_jsx_runtime$12.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$12.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.following_count
							})
						]
					}),
					(0, import_jsx_runtime$12.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$12.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$12.jsx)(Users, {
									size: 28,
									className: "text-primary"
								}), (0, import_jsx_runtime$12.jsx)("span", {
									className: "text-default-400",
									children: "粉丝"
								})]
							}),
							(0, import_jsx_runtime$12.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$12.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.fans
							})
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$12.jsx)("div", {
			className: "flex flex-col items-center gap-4",
			children: props.qrCodeDataUrl ? (0, import_jsx_runtime$12.jsx)("img", {
				src: props.qrCodeDataUrl,
				alt: "二维码",
				className: "h-auto w-75 rounded-2xl"
			}) : (0, import_jsx_runtime$12.jsx)("div", {
				className: "flex justify-center items-center rounded-2xl bg-default-100 w-100 h-100",
				children: (0, import_jsx_runtime$12.jsx)("span", {
					className: "text-default-400",
					children: "二维码"
				})
			})
		})]
	});
	BilibiliForwardDynamic = import_react$14.memo((props) => (0, import_jsx_runtime$12.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$12.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$12.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$12.jsx)(BilibiliForwardUserInfo, {
					avatar_url: props.data.avatar_url,
					frame: props.data.frame,
					username: props.data.username,
					create_time: props.data.create_time,
					decoration_card: props.data.decoration_card
				}),
				(0, import_jsx_runtime$12.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$12.jsx)(BilibiliForwardContent, { ...props.data }),
				(0, import_jsx_runtime$12.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$12.jsx)(BilibiliForwardStatus, {
					dianzan: props.data.dianzan,
					pinglun: props.data.pinglun,
					share: props.data.share,
					render_time: props.data.render_time
				}),
				(0, import_jsx_runtime$12.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$12.jsx)(BilibiliForwardFooter, {
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
	BilibiliForwardDynamic.displayName = "BilibiliForwardDynamic";
	DYNAMIC_TYPE_FORWARD_default = BilibiliForwardDynamic;
});
var DYNAMIC_TYPE_LIVE_RCMD_exports = __export({
	BilibiliLiveDynamic: () => BilibiliLiveDynamic,
	default: () => DYNAMIC_TYPE_LIVE_RCMD_default
}, 1);
var import_react$13, import_jsx_runtime$11, BilibiliLiveDynamicHeader, BilibiliLiveDynamicContent, BilibiliLiveDynamicFooter, BilibiliLiveDynamic, DYNAMIC_TYPE_LIVE_RCMD_default;
var init_DYNAMIC_TYPE_LIVE_RCMD = __esmMin(() => {
	init_lucide_react();
	import_react$13 = __toESM(require_react(), 1);
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$11 = __toESM(require_jsx_runtime(), 1);
	BilibiliLiveDynamicHeader = () => (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
		(0, import_jsx_runtime$11.jsx)("div", { className: "h-5" }),
		(0, import_jsx_runtime$11.jsxs)("div", {
			className: "flex flex-col items-start text-6xl text-default-600",
			children: [(0, import_jsx_runtime$11.jsx)("img", {
				src: "/image/bilibili/bilibili-light.png",
				alt: "哔哩哔哩",
				className: "h-auto w-120"
			}), (0, import_jsx_runtime$11.jsx)("span", {
				className: "pt-10 text-6xl select-text",
				children: "你感兴趣的视频都在B站"
			})]
		}),
		(0, import_jsx_runtime$11.jsx)("div", { className: "h-5" })
	] });
	BilibiliLiveDynamicContent = (props) => (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [
		(0, import_jsx_runtime$11.jsx)("div", { className: "h-15" }),
		props.image_url && (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [(0, import_jsx_runtime$11.jsx)("div", {
			className: "flex flex-col items-center",
			children: (0, import_jsx_runtime$11.jsx)("div", {
				className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large",
				children: (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
					src: props.image_url,
					alt: "封面",
					className: "object-contain w-full h-full rounded-3xl"
				})
			})
		}), (0, import_jsx_runtime$11.jsx)("div", { className: "h-10" })] }),
		(0, import_jsx_runtime$11.jsxs)("div", {
			className: "flex flex-col w-full leading-relaxed px-15",
			children: [
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-3" }),
				(0, import_jsx_runtime$11.jsx)("div", {
					className: "relative items-center text-8xl font-bold tracking-wider wrap-break-word text-foreground",
					children: (0, import_jsx_runtime$11.jsx)(CommentText, {
						className: "text-[65px] font-bold tracking-[1.5px] leading-normal whitespace-pre-wrap text-foreground select-text",
						content: props.text,
						style: {
							wordBreak: "break-word",
							overflowWrap: "break-word"
						}
					})
				}),
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-10" }),
				(0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex gap-2 items-center text-5xl tracking-normal text-default-500",
					children: [(0, import_jsx_runtime$11.jsx)(Radio, {
						size: 48,
						className: "text-primary"
					}), (0, import_jsx_runtime$11.jsx)("span", {
						className: "select-text",
						children: props.liveinf
					})]
				}),
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-5" }),
				(0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl tracking-normal text-default-500",
					children: [(0, import_jsx_runtime$11.jsx)(Clock, {
						size: 32,
						className: "text-time"
					}), (0, import_jsx_runtime$11.jsxs)("span", {
						className: "select-text",
						children: ["直播开始时间: ", props.create_time]
					})]
				}),
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$11.jsxs)("div", {
					className: "flex gap-10 items-center",
					children: [(0, import_jsx_runtime$11.jsxs)("div", {
						className: "relative",
						children: [(0, import_jsx_runtime$11.jsx)(EnhancedImage, {
							src: props.avatar_url,
							alt: "头像",
							className: "w-32 h-32 rounded-full shadow-medium",
							isCircular: true
						}), props.frame && (0, import_jsx_runtime$11.jsx)(EnhancedImage, {
							src: props.frame,
							alt: "头像框",
							className: "absolute inset-0 transform scale-160"
						})]
					}), (0, import_jsx_runtime$11.jsxs)("div", {
						className: "flex flex-col gap-5 items-start",
						children: [(0, import_jsx_runtime$11.jsxs)("div", {
							className: "flex gap-4 items-center",
							children: [(0, import_jsx_runtime$11.jsx)("div", {
								className: "text-6xl font-bold select-text text-foreground",
								children: (0, import_jsx_runtime$11.jsx)(CommentText, { content: props.username })
							}), (0, import_jsx_runtime$11.jsx)("img", {
								className: "w-32 h-auto",
								src: "/image/bilibili/直播中.png",
								alt: "直播中"
							})]
						}), (0, import_jsx_runtime$11.jsxs)("div", {
							className: "flex gap-2 items-center text-4xl text-default-600",
							children: [(0, import_jsx_runtime$11.jsx)(Users, {
								size: 32,
								className: "text-follow"
							}), (0, import_jsx_runtime$11.jsxs)("span", {
								className: "select-text",
								children: [props.fans, "粉丝"]
							})]
						})]
					})]
				}),
				(0, import_jsx_runtime$11.jsx)("div", { className: "h-50" })
			]
		})
	] });
	BilibiliLiveDynamicFooter = (props) => (0, import_jsx_runtime$11.jsxs)(import_jsx_runtime$11.Fragment, { children: [(0, import_jsx_runtime$11.jsxs)("div", {
		className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500",
		children: ["哔哩哔哩", props.dynamicTYPE]
	}), (0, import_jsx_runtime$11.jsx)("div", {
		className: "flex flex-col h-full",
		children: (0, import_jsx_runtime$11.jsxs)("div", {
			className: "flex justify-between items-center h-auto pt-25",
			children: [(0, import_jsx_runtime$11.jsx)("div", {
				className: "flex flex-col items-center pl-16",
				children: (0, import_jsx_runtime$11.jsx)(BilibiliLiveDynamicHeader, {})
			}), (0, import_jsx_runtime$11.jsxs)("div", {
				className: "flex flex-col-reverse items-center -mb-12 mr-19",
				children: [(0, import_jsx_runtime$11.jsx)("div", {
					className: "mt-5 ml-3 text-5xl text-right select-text text-default-500",
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
	})] });
	BilibiliLiveDynamic = import_react$13.memo((props) => (0, import_jsx_runtime$11.jsx)(DefaultLayout, {
		...props,
		children: (0, import_jsx_runtime$11.jsxs)("div", {
			className: "p-4",
			children: [(0, import_jsx_runtime$11.jsx)(BilibiliLiveDynamicContent, {
				image_url: props.data.image_url,
				text: props.data.text,
				liveinf: props.data.liveinf,
				create_time: props.data.create_time,
				username: props.data.username,
				avatar_url: props.data.avatar_url,
				frame: props.data.frame,
				fans: props.data.fans
			}), (0, import_jsx_runtime$11.jsx)(BilibiliLiveDynamicFooter, {
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
}, 1);
var import_react$12, import_jsx_runtime$10, getFontLevelClass, renderTextNode, renderParagraphContent, parseOpusContent, sanitizeHtmlContent, BilibiliArticleUserInfo, BilibiliArticleContent, BilibiliArticleStatus, BilibiliArticleFooter, BilibiliArticleDynamic, DYNAMIC_TYPE_ARTICLE_default;
var init_DYNAMIC_TYPE_ARTICLE = __esmMin(() => {
	init_lucide_react();
	import_react$12 = __toESM(require_react(), 1);
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$10 = __toESM(require_jsx_runtime(), 1);
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
		if (style.link) return (0, import_jsx_runtime$10.jsx)("a", {
			href: style.link,
			className: `${classNames.join(" ")} text-primary hover:text-primary-600 underline cursor-pointer`,
			style: inlineStyle,
			target: "_blank",
			rel: "noopener noreferrer",
			children: words
		}, nodeIndex);
		if (style.header) return (0, import_jsx_runtime$10.jsx)(`h${Math.min(Math.max(1, style.header), 6)}`, {
			className: classNames.join(" "),
			style: inlineStyle,
			children: words
		}, nodeIndex);
		if (style.blockquote) return (0, import_jsx_runtime$10.jsx)("blockquote", {
			className: classNames.join(" "),
			style: inlineStyle,
			children: words
		}, nodeIndex);
		if (style.list) return (0, import_jsx_runtime$10.jsx)(style.list === "ordered" ? "ol" : "ul", {
			className: classNames.join(" "),
			style: inlineStyle,
			children: (0, import_jsx_runtime$10.jsx)("li", { children: words })
		}, nodeIndex);
		return (0, import_jsx_runtime$10.jsx)("span", {
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
				return (0, import_jsx_runtime$10.jsx)("p", {
					className: "mb-10 leading-[1.7]",
					children: text.nodes.map((node, nodeIndex) => renderTextNode(node, nodeIndex))
				}, paragraphIndex);
			case 4:
				if (!text?.nodes) return null;
				return (0, import_jsx_runtime$10.jsx)("blockquote", {
					className: "pl-6 my-8 border-l-8 border-default-400 text-foreground-700 leading-[1.7]",
					children: text.nodes.map((node, nodeIndex) => renderTextNode(node, nodeIndex))
				}, paragraphIndex);
			case 2:
				if (!pic?.pics) return null;
				return (0, import_jsx_runtime$10.jsx)("div", {
					className: "my-6",
					children: pic.pics.map((picItem, picIndex) => (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
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
	BilibiliArticleUserInfo = import_react$12.memo((props) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "flex gap-10 items-center px-0 pb-0 pl-24",
		children: [
			(0, import_jsx_runtime$10.jsxs)("div", {
				className: "relative",
				children: [(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
					src: props.data.avatar_url,
					alt: "用户头像",
					className: "w-32 h-32 rounded-full shadow-medium",
					isCircular: true
				}), props.data.frame && (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
					src: props.data.frame,
					alt: "头像框",
					className: "absolute inset-0 transform scale-180"
				})]
			}),
			(0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex flex-col gap-8 text-7xl",
				children: [(0, import_jsx_runtime$10.jsx)("div", {
					className: "text-6xl font-bold select-text text-foreground",
					children: (0, import_jsx_runtime$10.jsx)("span", { dangerouslySetInnerHTML: { __html: props.data.username } })
				}), (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500",
					children: [(0, import_jsx_runtime$10.jsx)(Clock, {
						size: 36,
						className: "text-time"
					}), props.data.create_time]
				})]
			}),
			props.data.decoration_card && (0, import_jsx_runtime$10.jsx)("div", {
				className: "pl-40",
				children: (0, import_jsx_runtime$10.jsx)(DecorationCard, { html: props.data.decoration_card.card_url })
			})
		]
	}));
	BilibiliArticleContent = import_react$12.memo((props) => {
		const articleContentElements = import_react$12.useMemo(() => {
			if (props.data.opus) return parseOpusContent(props.data.opus);
			return null;
		}, [props.data.opus]);
		const sanitizedHtmlContent = import_react$12.useMemo(() => {
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
		return (0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex flex-col px-20 w-full leading-relaxed",
			children: [
				(0, import_jsx_runtime$10.jsx)("div", {
					className: "mb-8",
					children: (0, import_jsx_runtime$10.jsx)("h1", {
						className: "text-[60px] font-bold leading-[1.4] tracking-[0.5px] text-foreground select-text",
						children: (0, import_jsx_runtime$10.jsx)(CommentText, { content: props.data.title })
					})
				}),
				props.data.banner_url && (0, import_jsx_runtime$10.jsx)("div", {
					className: "mb-8",
					children: (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
						src: props.data.banner_url,
						alt: "专栏封面",
						className: "w-full rounded-2xl shadow-medium"
					})
				}),
				props.data.summary && (0, import_jsx_runtime$10.jsx)("div", {
					className: "mb-8",
					children: (0, import_jsx_runtime$10.jsx)(CommentText, {
						content: props.data.summary,
						className: "text-[48px] leading-[1.6] text-foreground-600 select-text"
					})
				}),
				articleContentElements && (0, import_jsx_runtime$10.jsx)("div", {
					className: "flex-col items-center mb-8 select-text",
					children: articleContentElements
				}),
				sanitizedHtmlContent && (0, import_jsx_runtime$10.jsx)("div", {
					className: "flex-col items-center mb-8 select-text",
					dangerouslySetInnerHTML: { __html: sanitizedHtmlContent }
				})
			]
		});
	});
	BilibiliArticleStatus = import_react$12.memo((props) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "flex flex-col gap-12 px-20 py-16",
		children: [(0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex gap-24 items-center",
			children: [
				(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-3 items-center text-[42px] text-like",
					children: [
						(0, import_jsx_runtime$10.jsx)(Heart, { size: 32 }),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-medium",
							children: props.data.stats.like || 0
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "text-[36px] text-foreground-600",
							children: "点赞"
						})
					]
				}),
				(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-3 items-center text-[42px] text-comment",
					children: [
						(0, import_jsx_runtime$10.jsx)(MessageCircle, { size: 32 }),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-medium",
							children: props.data.stats.reply || 0
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "text-[36px] text-foreground-600",
							children: "评论"
						})
					]
				}),
				(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-3 items-center text-[42px] text-share",
					children: [
						(0, import_jsx_runtime$10.jsx)(Share2, { size: 32 }),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-medium",
							children: props.data.stats.dynamic || 0
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "text-[36px] text-foreground-600",
							children: "分享"
						})
					]
				})
			]
		}), (0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex gap-20 items-center text-[36px] text-default-700",
			children: [
				(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [
						(0, import_jsx_runtime$10.jsx)(Eye, {
							size: 28,
							className: "text-view"
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-medium",
							children: "阅读量"
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-bold text-foreground",
							children: props.data.stats.view || 0
						})
					]
				}),
				(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [
						(0, import_jsx_runtime$10.jsx)(BookOpen, {
							size: 28,
							className: "text-coin"
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-medium",
							children: "收藏"
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-bold text-foreground",
							children: props.data.stats.favorite || 0
						})
					]
				}),
				(0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex gap-2 items-center",
					children: [
						(0, import_jsx_runtime$10.jsx)(Heart, {
							size: 28,
							className: "text-like"
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-medium",
							children: "获赞"
						}),
						(0, import_jsx_runtime$10.jsx)("span", {
							className: "font-bold text-foreground",
							children: props.data.stats.like || 0
						})
					]
				})
			]
		})]
	}));
	BilibiliArticleFooter = import_react$12.memo((props) => (0, import_jsx_runtime$10.jsxs)("div", {
		className: "flex justify-between items-start px-20 pb-20",
		children: [(0, import_jsx_runtime$10.jsxs)("div", {
			className: "flex flex-col gap-12",
			children: [(0, import_jsx_runtime$10.jsxs)("div", {
				className: "flex gap-12 items-start",
				children: [(0, import_jsx_runtime$10.jsxs)("div", {
					className: "relative shrink-0",
					children: [(0, import_jsx_runtime$10.jsx)(EnhancedImage, {
						src: props.data.avatar_url,
						alt: "头像",
						className: "rounded-full shadow-medium w-35 h-auto",
						isCircular: true
					}), props.data.frame && (0, import_jsx_runtime$10.jsx)(EnhancedImage, {
						src: props.data.frame,
						alt: "头像框",
						className: "absolute inset-0 transform scale-175"
					})]
				}), (0, import_jsx_runtime$10.jsxs)("div", {
					className: "flex flex-col gap-5",
					children: [(0, import_jsx_runtime$10.jsx)("div", {
						className: "text-7xl font-bold select-text text-foreground",
						children: (0, import_jsx_runtime$10.jsx)("span", { dangerouslySetInnerHTML: { __html: props.data.username } })
					}), (0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex gap-2 items-center text-4xl text-default-500",
						children: [(0, import_jsx_runtime$10.jsx)(Hash, {
							size: 32,
							className: "text-default-400"
						}), (0, import_jsx_runtime$10.jsxs)("span", {
							className: "select-text",
							children: ["UID: ", props.data.user_shortid]
						})]
					})]
				})]
			}), (0, import_jsx_runtime$10.jsxs)("div", {
				className: "text-3xl flex gap-6 items-center text-default-600",
				children: [
					(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Heart, {
									size: 28,
									className: "text-like"
								}), (0, import_jsx_runtime$10.jsx)("span", {
									className: "text-default-400",
									children: "获赞"
								})]
							}),
							(0, import_jsx_runtime$10.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$10.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.data.total_favorited
							})
						]
					}),
					(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Eye, {
									size: 28,
									className: "text-view"
								}), (0, import_jsx_runtime$10.jsx)("span", {
									className: "text-default-400",
									children: "关注"
								})]
							}),
							(0, import_jsx_runtime$10.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$10.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.data.following_count
							})
						]
					}),
					(0, import_jsx_runtime$10.jsxs)("div", {
						className: "flex flex-col gap-1 items-start px-6 py-3 rounded-2xl bg-default-100",
						children: [
							(0, import_jsx_runtime$10.jsxs)("div", {
								className: "flex gap-1 items-center",
								children: [(0, import_jsx_runtime$10.jsx)(Users, {
									size: 28,
									className: "text-primary"
								}), (0, import_jsx_runtime$10.jsx)("span", {
									className: "text-default-400",
									children: "粉丝"
								})]
							}),
							(0, import_jsx_runtime$10.jsx)("div", { className: "w-full h-px bg-default-300" }),
							(0, import_jsx_runtime$10.jsx)("span", {
								className: "select-text font-medium text-4xl",
								children: props.data.fans
							})
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$10.jsx)("div", {
			className: "flex flex-col items-center gap-4",
			children: props.qrCodeDataUrl ? (0, import_jsx_runtime$10.jsx)("img", {
				src: props.qrCodeDataUrl,
				alt: "二维码",
				className: "h-auto w-75 rounded-2xl"
			}) : (0, import_jsx_runtime$10.jsx)("div", {
				className: "flex justify-center items-center rounded-2xl bg-default-100 w-100 h-100",
				children: (0, import_jsx_runtime$10.jsx)("span", {
					className: "text-default-400",
					children: "二维码"
				})
			})
		})]
	}));
	BilibiliArticleDynamic = import_react$12.memo((props) => (0, import_jsx_runtime$10.jsx)(DefaultLayout, {
		data: props.data,
		version: props.version,
		scale: props.scale,
		children: (0, import_jsx_runtime$10.jsxs)("div", {
			className: "p-4",
			children: [
				(0, import_jsx_runtime$10.jsx)("div", { className: "h-25" }),
				(0, import_jsx_runtime$10.jsx)(BilibiliArticleUserInfo, { ...props }),
				(0, import_jsx_runtime$10.jsx)("div", { className: "h-15" }),
				(0, import_jsx_runtime$10.jsx)(BilibiliArticleContent, { ...props }),
				(0, import_jsx_runtime$10.jsx)(BilibiliArticleStatus, { ...props }),
				(0, import_jsx_runtime$10.jsx)("div", { className: "h-23" }),
				(0, import_jsx_runtime$10.jsx)(BilibiliArticleFooter, { ...props })
			]
		})
	}));
	BilibiliArticleDynamic.displayName = "BilibiliArticleDynamic";
	DYNAMIC_TYPE_ARTICLE_default = BilibiliArticleDynamic;
});
var videoInfo_exports = __export({
	BilibiliVideoInfo: () => BilibiliVideoInfo,
	default: () => videoInfo_default
}, 1);
var import_react$11, import_jsx_runtime$9, formatNumber$1, formatDate$1, StatItem$1, BilibiliVideoInfo, videoInfo_default;
var init_videoInfo = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$11 = __toESM(require_react(), 1);
	init_DefaultLayout();
	init_shared();
	import_jsx_runtime$9 = __toESM(require_jsx_runtime(), 1);
	formatNumber$1 = (num) => {
		if (num >= 1e4) return `${(num / 1e4).toFixed(1)}万`;
		return num.toLocaleString();
	};
	formatDate$1 = (timestamp) => (/* @__PURE__ */ new Date(timestamp * 1e3)).toLocaleDateString("zh-CN", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
	StatItem$1 = import_react$11.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$9.jsxs)("div", {
		className: "flex gap-4 items-center",
		children: [
			(0, import_jsx_runtime$9.jsx)("div", {
				className: iconColor,
				children: icon
			}),
			(0, import_jsx_runtime$9.jsx)("span", {
				className: "font-bold text-foreground-900",
				children: formatNumber$1(value)
			}),
			(0, import_jsx_runtime$9.jsx)("span", {
				className: "text-foreground-500",
				children: label
			})
		]
	}));
	StatItem$1.displayName = "StatItem";
	BilibiliVideoInfo = import_react$11.memo((props) => {
		const formattedDate = (0, import_react$11.useMemo)(() => formatDate$1(props.data.ctime), [props.data.ctime]);
		const statsData = (0, import_react$11.useMemo)(() => [
			{
				icon: (0, import_jsx_runtime$9.jsx)(Eye, { size: 48 }),
				value: props.data.stat.view,
				label: "播放",
				iconColor: "text-view"
			},
			{
				icon: (0, import_jsx_runtime$9.jsx)(Heart, { size: 48 }),
				value: props.data.stat.like,
				label: "点赞",
				iconColor: "text-like"
			},
			{
				icon: (0, import_jsx_runtime$9.jsx)(MessageCircle, { size: 48 }),
				value: props.data.stat.reply,
				label: "评论",
				iconColor: "text-comment"
			},
			{
				icon: (0, import_jsx_runtime$9.jsx)(Star, { size: 48 }),
				value: props.data.stat.favorite,
				label: "收藏",
				iconColor: "text-yellow-500"
			}
		], [props.data.stat]);
		return (0, import_jsx_runtime$9.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$9.jsx)("div", { children: (0, import_jsx_runtime$9.jsxs)("div", {
				className: "overflow-hidden transition-all",
				children: [
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "overflow-hidden relative aspect-video",
						children: [(0, import_jsx_runtime$9.jsx)(EnhancedImage, {
							src: props.data.pic,
							alt: props.data.title,
							className: "object-cover w-full h-full",
							placeholder: "视频封面"
						}), (0, import_jsx_runtime$9.jsx)("div", { className: "absolute inset-0 bg-linear-to-t to-transparent from-black/20" })]
					}),
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "p-20 pb-36",
						children: [
							(0, import_jsx_runtime$9.jsx)("h1", {
								className: "mb-8 text-7xl font-bold leading-tight text-foreground-900",
								children: props.data.title
							}),
							(0, import_jsx_runtime$9.jsx)("p", {
								className: "mb-8 text-5xl leading-normal whitespace-pre-wrap text-foreground-700",
								children: props.data.desc
							}),
							(0, import_jsx_runtime$9.jsx)("p", {
								className: "mb-6 text-4xl text-foreground-500",
								children: formattedDate
							})
						]
					}),
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "px-16",
						children: [
							(0, import_jsx_runtime$9.jsx)("div", {
								className: "grid grid-cols-2 text-5xl gap-18",
								children: statsData.map((stat, index) => (0, import_jsx_runtime$9.jsx)(StatItem$1, {
									icon: stat.icon,
									value: stat.value,
									label: stat.label,
									iconColor: stat.iconColor
								}, index))
							}),
							(0, import_jsx_runtime$9.jsx)("div", { className: "h-18" }),
							(0, import_jsx_runtime$9.jsxs)("div", {
								className: "flex justify-between items-center mb-8 text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$9.jsxs)("div", {
									className: "flex gap-16 items-center",
									children: [(0, import_jsx_runtime$9.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [(0, import_jsx_runtime$9.jsx)(Coins, { size: 48 }), (0, import_jsx_runtime$9.jsx)("span", {
											className: "font-medium",
											children: props.data.stat.coin
										})]
									}), (0, import_jsx_runtime$9.jsxs)("div", {
										className: "flex gap-2 items-center",
										children: [(0, import_jsx_runtime$9.jsx)(Share2, { size: 48 }), (0, import_jsx_runtime$9.jsx)("span", {
											className: "font-medium",
											children: props.data.stat.share
										})]
									})]
								}), (0, import_jsx_runtime$9.jsx)("div", {
									className: "transform-gpu scale-[2.5] origin-right mb-8",
									children: (0, import_jsx_runtime$9.jsxs)(chip_default, {
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
					(0, import_jsx_runtime$9.jsx)("div", { className: "h-18" }),
					(0, import_jsx_runtime$9.jsx)("div", { className: "h-0.5 bg-default-300" }),
					(0, import_jsx_runtime$9.jsxs)("div", {
						className: "flex justify-between items-center px-16 py-12 pb-0",
						children: [(0, import_jsx_runtime$9.jsxs)("div", {
							className: "flex gap-8 items-center",
							children: [(0, import_jsx_runtime$9.jsx)(EnhancedImage, {
								src: props.data.owner.face,
								alt: props.data.owner.name,
								className: "object-cover w-48 h-48 rounded-full",
								placeholder: props.data.owner.name.charAt(0),
								isCircular: true
							}), (0, import_jsx_runtime$9.jsxs)("div", {
								className: "flex flex-col gap-6",
								children: [(0, import_jsx_runtime$9.jsx)("p", {
									className: "text-6xl font-semibold text-foreground-900",
									children: props.data.owner.name
								}), (0, import_jsx_runtime$9.jsxs)("p", {
									className: "text-5xl text-foreground-500",
									children: ["ID: ", props.data.owner.mid]
								})]
							})]
						}), (0, import_jsx_runtime$9.jsx)("div", {
							className: "transform-gpu scale-[3.5] origin-right",
							children: (0, import_jsx_runtime$9.jsxs)(button_default, {
								size: "sm",
								className: "bg-[#FF6699] text-white",
								children: [(0, import_jsx_runtime$9.jsx)(ExternalLink, { className: "mr-1 w-4 h-4" }), "观看"]
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
}, 1);
var import_react$10, import_jsx_runtime$8, BilibiliQrcodeImg, qrcodeImg_default;
var init_qrcodeImg = __esmMin(() => {
	init_lucide_react();
	import_react$10 = __toESM(require_react(), 1);
	init_ri();
	init_si();
	init_DefaultLayout();
	import_jsx_runtime$8 = __toESM(require_jsx_runtime(), 1);
	BilibiliQrcodeImg = import_react$10.memo((props) => {
		const isDark = props.data?.useDarkTheme ?? false;
		const { qrCodeDataUrl } = props;
		const theme = {
			bg: isDark ? "#000000" : "#FFFFFF",
			text: isDark ? "#FFFFFF" : "#000000",
			subText: isDark ? "#888888" : "#666666",
			accent: "#FF6699",
			gradientTL: "#FF6699",
			gradientBR: "#00AEEC"
		};
		const disclaimer = [
			"您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。",
			"本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。",
			"我方仅提供视频解析及相关哔哩哔哩内容服务,若您的账号封禁、被盗等处罚与我方无关。",
			"害怕风险请勿扫码 ~"
		];
		return (0, import_jsx_runtime$8.jsxs)(DefaultLayout, {
			...props,
			className: "relative overflow-hidden font-sans",
			style: {
				background: theme.bg,
				color: theme.text
			},
			children: [
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "absolute inset-0 overflow-hidden pointer-events-none",
					children: [(0, import_jsx_runtime$8.jsx)("div", {
						className: "absolute top-[-40%] right-[-50%] w-400 h-600 rounded-full blur-[200px] opacity-25",
						style: { background: theme.gradientBR }
					}), (0, import_jsx_runtime$8.jsx)("div", {
						className: "absolute bottom-[-40%] left-[-50%] w-400 h-600 rounded-full blur-[200px] opacity-25",
						style: { background: theme.gradientTL }
					})]
				}),
				(0, import_jsx_runtime$8.jsx)("div", {
					className: "absolute inset-0 pointer-events-none",
					style: { opacity: isDark ? .16 : .2 },
					children: (0, import_jsx_runtime$8.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$8.jsxs)("filter", {
							id: "pixelNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime$8.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "2",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime$8.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime$8.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime$8.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$8.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$8.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime$8.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#pixelNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime$8.jsxs)("div", {
					className: "relative z-10 flex flex-col items-center justify-center h-full py-40 px-24 space-y-32",
					children: [
						(0, import_jsx_runtime$8.jsxs)("div", {
							className: "text-center space-y-12",
							children: [(0, import_jsx_runtime$8.jsx)("h1", {
								className: "text-8xl font-bold tracking-tight",
								children: (0, import_jsx_runtime$8.jsx)("span", {
									className: "bg-clip-text text-transparent",
									style: { backgroundImage: `linear-gradient(to right, ${theme.text}, ${theme.subText})` },
									children: "B站扫码登录"
								})
							}), (0, import_jsx_runtime$8.jsxs)("div", {
								className: "flex items-start justify-center gap-10 opacity-90",
								style: { color: theme.text },
								children: [
									(0, import_jsx_runtime$8.jsxs)("div", {
										className: "flex flex-col items-center gap-4",
										children: [(0, import_jsx_runtime$8.jsx)("div", {
											className: "p-5 rounded-3xl bg-default-100/50 backdrop-blur-md",
											children: (0, import_jsx_runtime$8.jsx)(SiBilibili, { className: "w-16 h-16" })
										}), (0, import_jsx_runtime$8.jsx)("span", {
											className: "text-[28px] font-medium tracking-wide",
											children: "打开哔哩哔哩"
										})]
									}),
									(0, import_jsx_runtime$8.jsx)(RiArrowRightFill, { className: "w-10 h-10 mt-8 opacity-40" }),
									(0, import_jsx_runtime$8.jsxs)("div", {
										className: "flex flex-col items-center gap-4",
										children: [(0, import_jsx_runtime$8.jsx)("div", {
											className: "p-5 rounded-3xl bg-default-100/50 backdrop-blur-md",
											children: (0, import_jsx_runtime$8.jsx)(User, { className: "w-16 h-16" })
										}), (0, import_jsx_runtime$8.jsx)("span", {
											className: "text-[28px] font-medium tracking-wide",
											children: "点击我的"
										})]
									}),
									(0, import_jsx_runtime$8.jsx)(RiArrowRightFill, { className: "w-10 h-10 mt-8 opacity-40" }),
									(0, import_jsx_runtime$8.jsxs)("div", {
										className: "flex flex-col items-center gap-4",
										children: [(0, import_jsx_runtime$8.jsx)("div", {
											className: "p-5 rounded-3xl bg-default-100/50 backdrop-blur-md",
											children: (0, import_jsx_runtime$8.jsx)(ScanLine, { className: "w-16 h-16" })
										}), (0, import_jsx_runtime$8.jsx)("span", {
											className: "text-[28px] font-medium tracking-wide",
											children: "右上角扫一扫"
										})]
									})
								]
							})]
						}),
						(0, import_jsx_runtime$8.jsxs)("div", {
							className: "relative group",
							children: [(0, import_jsx_runtime$8.jsx)("div", {
								className: "relative p-4",
								style: {
									width: "800px",
									height: "800px"
								},
								children: qrCodeDataUrl ? (0, import_jsx_runtime$8.jsx)("img", {
									src: qrCodeDataUrl,
									alt: "QR Code",
									className: "w-full h-full object-contain"
								}) : (0, import_jsx_runtime$8.jsxs)("div", {
									className: "w-full h-full flex flex-col items-center justify-center gap-8",
									children: [(0, import_jsx_runtime$8.jsx)("div", {
										className: "w-24 h-24 border-4 border-gray-200 rounded-full animate-spin",
										style: { borderTopColor: theme.accent }
									}), (0, import_jsx_runtime$8.jsx)("span", {
										className: "text-3xl text-default-500",
										children: "未提供二维码图片"
									})]
								})
							}), (0, import_jsx_runtime$8.jsx)("div", {
								className: "absolute -bottom-24 left-0 right-0 text-center",
								children: (0, import_jsx_runtime$8.jsxs)("p", {
									className: "text-[28px] font-medium tracking-wide flex items-center justify-center gap-3",
									style: { color: theme.subText },
									children: [(0, import_jsx_runtime$8.jsx)("span", {
										className: "h-6 w-1.5 rounded-full shadow-[0_0_8px_rgba(255,102,153,0.8)]",
										style: { backgroundColor: theme.accent }
									}), "此二维码 120 秒内有效，请及时扫码登录。"]
								})
							})]
						}),
						(0, import_jsx_runtime$8.jsx)("div", {
							className: "w-full max-w-4xl pt-20",
							children: (0, import_jsx_runtime$8.jsxs)("div", {
								className: "flex flex-col items-center space-y-6 text-center",
								children: [
									(0, import_jsx_runtime$8.jsx)("div", {
										className: "flex items-center justify-center w-16 h-16 mb-2",
										children: (0, import_jsx_runtime$8.jsx)(TriangleAlert, {
											className: "w-16 h-16",
											style: { color: theme.text },
											strokeWidth: 1.5
										})
									}),
									(0, import_jsx_runtime$8.jsx)("h3", {
										className: "text-[40px] font-bold",
										style: { color: theme.text },
										children: "免责声明"
									}),
									(0, import_jsx_runtime$8.jsx)("div", {
										className: "text-[24px] leading-relaxed opacity-60 space-y-2 max-w-3xl",
										style: { color: theme.text },
										children: disclaimer.map((line, index) => (0, import_jsx_runtime$8.jsx)("p", { children: line }, index))
									})
								]
							})
						})
					]
				})
			]
		});
	});
	BilibiliQrcodeImg.displayName = "BilibiliQrcodeImg";
	qrcodeImg_default = BilibiliQrcodeImg;
});
var Comment_exports$1 = __export({
	KuaishouComment: () => KuaishouComment,
	default: () => Comment_default$1
}, 1);
var import_react$9, import_jsx_runtime$7, KuaishouQRCodeSection, KuaishouVideoInfoHeader, KuaishouCommentItemComponent, KuaishouComment, Comment_default$1;
var init_Comment$1 = __esmMin(() => {
	init_lucide_react();
	import_react$9 = __toESM(require_react(), 1);
	init_DefaultLayout();
	import_jsx_runtime$7 = __toESM(require_jsx_runtime(), 1);
	KuaishouQRCodeSection = ({ qrCodeDataUrl, type, imageLength }) => (0, import_jsx_runtime$7.jsxs)("div", {
		className: "flex flex-col items-center -mr-10",
		children: [(0, import_jsx_runtime$7.jsx)("div", {
			className: "mt-20 flex items-center justify-center w-150 h-150 bg-content1 rounded-lg shadow-medium",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$7.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain w-full h-full"
			}) : (0, import_jsx_runtime$7.jsxs)("div", {
				className: "flex flex-col justify-center items-center text-default-400",
				children: [(0, import_jsx_runtime$7.jsx)(QrCode, {
					size: 80,
					className: "mb-4"
				}), (0, import_jsx_runtime$7.jsx)("span", {
					className: "text-lg",
					children: "二维码生成失败"
				})]
			})
		}), (0, import_jsx_runtime$7.jsx)("div", {
			className: "mt-5 text-[45px] text-center text-foreground",
			children: type === "视频" ? "视频直链(永久)" : type === "图集" ? `图集分享链接 共${imageLength}张` : "分享链接"
		})]
	});
	KuaishouVideoInfoHeader = ({ type, commentLength, videoSize, likeCount, viewCount, imageLength }) => (0, import_jsx_runtime$7.jsx)("div", {
		className: "flex justify-between items-center max-w-300 mx-auto p-5",
		children: (0, import_jsx_runtime$7.jsxs)("div", {
			className: "mt-2.5 flex flex-col -ml-11",
			children: [(0, import_jsx_runtime$7.jsx)("div", {
				className: "mb-5",
				children: (0, import_jsx_runtime$7.jsx)("img", {
					src: "/image/kuaishou/logo.png",
					alt: "快手Logo",
					className: "w-162.5 h-auto",
					onError: (e) => {
						const target = e.target;
						target.style.display = "none";
						const parent = target.parentElement;
						if (parent) parent.innerHTML = "<div class=\"flex justify-center items-center h-full text-2xl font-bold text-foreground\">快手</div>";
					}
				})
			}), (0, import_jsx_runtime$7.jsxs)("div", {
				className: "space-y-2 text-foreground",
				children: [
					(0, import_jsx_runtime$7.jsxs)("div", {
						className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
						children: [
							"评论数量：",
							commentLength,
							"条"
						]
					}),
					type === "视频" && (0, import_jsx_runtime$7.jsxs)(import_jsx_runtime$7.Fragment, { children: [
						(0, import_jsx_runtime$7.jsxs)("div", {
							className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
							children: [
								"视频大小：",
								videoSize,
								"MB"
							]
						}),
						(0, import_jsx_runtime$7.jsxs)("div", {
							className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
							children: ["点赞数量：", likeCount]
						}),
						(0, import_jsx_runtime$7.jsxs)("div", {
							className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left",
							children: ["观看次数：", viewCount]
						})
					] }),
					type === "图集" && (0, import_jsx_runtime$7.jsxs)("div", {
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
	KuaishouCommentItemComponent = ({ comment, isLast = false }) => (0, import_jsx_runtime$7.jsxs)("div", {
		className: `flex px-10 pt-10 ${isLast ? "pb-0" : "pb-10"}`,
		children: [(0, import_jsx_runtime$7.jsx)("img", {
			src: comment.userimageurl,
			className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
			alt: "用户头像"
		}), (0, import_jsx_runtime$7.jsxs)("div", {
			className: "flex-1",
			children: [
				(0, import_jsx_runtime$7.jsx)("div", {
					className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center",
					children: (0, import_jsx_runtime$7.jsx)("span", {
						className: "font-medium",
						children: comment.nickname
					})
				}),
				(0, import_jsx_runtime$7.jsx)("div", {
					className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] select-text",
					dangerouslySetInnerHTML: { __html: comment.text },
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				}),
				(comment.commentimage || comment.sticker) && (0, import_jsx_runtime$7.jsx)("div", {
					className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1",
					children: (0, import_jsx_runtime$7.jsx)("img", {
						className: "object-contain w-full h-full rounded-2xl",
						src: comment.commentimage || comment.sticker,
						alt: "评论图片"
					})
				}),
				(0, import_jsx_runtime$7.jsxs)("div", {
					className: "flex justify-between items-center mt-6 text-default-500",
					children: [(0, import_jsx_runtime$7.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [
							(0, import_jsx_runtime$7.jsx)("span", {
								className: "text-[45px] select-text",
								children: comment.create_time
							}),
							comment.ip_label && (0, import_jsx_runtime$7.jsx)("span", {
								className: "text-[45px] select-text",
								children: comment.ip_label
							}),
							comment.reply_comment_total && comment.reply_comment_total > 0 ? (0, import_jsx_runtime$7.jsxs)("span", {
								className: "text-[40px] text-foreground-600",
								children: [
									"共",
									comment.reply_comment_total,
									"条回复"
								]
							}) : (0, import_jsx_runtime$7.jsx)("span", {
								className: "text-[40px] text-default-600",
								children: "回复"
							})
						]
					}), (0, import_jsx_runtime$7.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [(0, import_jsx_runtime$7.jsxs)("div", {
							className: "flex items-center space-x-2 transition-colors cursor-pointer hover:text-danger",
							children: [(0, import_jsx_runtime$7.jsx)(Heart, {
								size: 60,
								className: "stroke-current"
							}), (0, import_jsx_runtime$7.jsx)("span", {
								className: "text-[50px] select-text",
								children: comment.digg_count
							})]
						}), (0, import_jsx_runtime$7.jsx)("div", {
							className: "flex items-center transition-colors cursor-pointer hover:text-primary",
							children: (0, import_jsx_runtime$7.jsx)(MessageCircle, {
								size: 60,
								className: "stroke-current"
							})
						})]
					})]
				})
			]
		})]
	});
	KuaishouComment = import_react$9.memo((props) => {
		const processedData = (0, import_react$9.useMemo)(() => {
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
		return (0, import_jsx_runtime$7.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$7.jsxs)("div", {
				className: "p-5",
				children: [(0, import_jsx_runtime$7.jsxs)("div", {
					className: "flex justify-between items-center max-w-300 mx-auto p-5",
					children: [(0, import_jsx_runtime$7.jsx)(KuaishouVideoInfoHeader, {
						type: processedData.type,
						commentLength: processedData.commentLength,
						videoSize: processedData.videoSize,
						likeCount: processedData.likeCount,
						viewCount: processedData.viewCount,
						imageLength: processedData.imageLength,
						useDarkTheme: processedData.useDarkTheme
					}), (0, import_jsx_runtime$7.jsx)(KuaishouQRCodeSection, {
						qrCodeDataUrl: props.qrCodeDataUrl || "",
						type: processedData.type,
						imageLength: processedData.imageLength,
						useDarkTheme: processedData.useDarkTheme
					})]
				}), (0, import_jsx_runtime$7.jsx)("div", {
					className: "overflow-auto mx-auto max-w-full",
					children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => (0, import_jsx_runtime$7.jsx)(KuaishouCommentItemComponent, {
						comment,
						isLast: index === processedData.commentsArray.length - 1
					}, index)) : (0, import_jsx_runtime$7.jsx)("div", {
						className: "flex justify-center items-center py-20 text-default-500",
						children: (0, import_jsx_runtime$7.jsxs)("div", {
							className: "text-center",
							children: [(0, import_jsx_runtime$7.jsx)(MessageCircle, {
								size: 64,
								className: "mx-auto mb-4 text-default-300"
							}), (0, import_jsx_runtime$7.jsx)("p", {
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
}, 1);
var import_react$8, import_jsx_runtime$6, formatNumber, formatDate, StatItem, XiaohongshuNoteInfo, noteInfo_default;
var init_noteInfo = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$8 = __toESM(require_react(), 1);
	init_DefaultLayout();
	import_jsx_runtime$6 = __toESM(require_jsx_runtime(), 1);
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
	StatItem = import_react$8.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => (0, import_jsx_runtime$6.jsxs)("div", {
		className: "flex gap-4 items-center",
		children: [
			(0, import_jsx_runtime$6.jsx)("div", {
				className: iconColor,
				children: icon
			}),
			(0, import_jsx_runtime$6.jsx)("span", {
				className: "font-bold text-foreground-900",
				children: formatNumber(value)
			}),
			(0, import_jsx_runtime$6.jsx)("span", {
				className: "text-foreground-500",
				children: label
			})
		]
	}));
	StatItem.displayName = "StatItem";
	XiaohongshuNoteInfo = import_react$8.memo((props) => {
		const formattedDate = (0, import_react$8.useMemo)(() => formatDate(props.data.time), [props.data.time]);
		const statsData = (0, import_react$8.useMemo)(() => [
			{
				icon: (0, import_jsx_runtime$6.jsx)(Heart, { size: 48 }),
				value: props.data.statistics.liked_count,
				label: "点赞",
				iconColor: "text-red-500"
			},
			{
				icon: (0, import_jsx_runtime$6.jsx)(MessageCircle, { size: 48 }),
				value: props.data.statistics.comment_count,
				label: "评论",
				iconColor: "text-blue-500"
			},
			{
				icon: (0, import_jsx_runtime$6.jsx)(Star, { size: 48 }),
				value: props.data.statistics.collected_count,
				label: "收藏",
				iconColor: "text-yellow-500"
			},
			{
				icon: (0, import_jsx_runtime$6.jsx)(Share2, { size: 48 }),
				value: props.data.statistics.share_count,
				label: "分享",
				iconColor: "text-green-500"
			}
		], [props.data.statistics]);
		return (0, import_jsx_runtime$6.jsx)(DefaultLayout, {
			...props,
			children: (0, import_jsx_runtime$6.jsx)("div", { children: (0, import_jsx_runtime$6.jsxs)("div", {
				className: "overflow-hidden transition-all",
				children: [
					(0, import_jsx_runtime$6.jsxs)("div", {
						className: "overflow-hidden relative",
						children: [(0, import_jsx_runtime$6.jsx)("img", {
							src: props.data.image_url,
							alt: props.data.desc,
							className: "object-cover w-full h-full"
						}), (0, import_jsx_runtime$6.jsx)("div", { className: "absolute inset-0 bg-linear-to-t to-transparent from-black/30" })]
					}),
					(0, import_jsx_runtime$6.jsxs)("div", {
						className: "p-20 pb-36",
						children: [
							props.data.title && (0, import_jsx_runtime$6.jsx)("h1", {
								className: "mb-6 text-7xl font-bold leading-tight text-foreground-900",
								children: props.data.title
							}),
							(0, import_jsx_runtime$6.jsx)("div", {
								className: "text-5xl text-foreground-700 leading-relaxed mb-8 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
								dangerouslySetInnerHTML: { __html: props.data.desc }
							}),
							(0, import_jsx_runtime$6.jsxs)("div", {
								className: "flex gap-8 items-center text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$6.jsxs)("div", {
									className: "flex gap-2 items-center",
									children: [(0, import_jsx_runtime$6.jsx)(Calendar, { size: 32 }), (0, import_jsx_runtime$6.jsx)("span", { children: formattedDate })]
								}), props.data.ip_location && (0, import_jsx_runtime$6.jsxs)("div", {
									className: "flex gap-2 items-center",
									children: [(0, import_jsx_runtime$6.jsx)(MapPin, { size: 32 }), (0, import_jsx_runtime$6.jsx)("span", { children: props.data.ip_location })]
								})]
							})
						]
					}),
					(0, import_jsx_runtime$6.jsxs)("div", {
						className: "px-16",
						children: [
							(0, import_jsx_runtime$6.jsx)("div", {
								className: "grid grid-cols-2 text-5xl gap-18",
								children: statsData.map((stat, index) => (0, import_jsx_runtime$6.jsx)(StatItem, {
									icon: stat.icon,
									value: stat.value,
									label: stat.label,
									iconColor: stat.iconColor
								}, index))
							}),
							(0, import_jsx_runtime$6.jsx)("div", { className: "h-18" }),
							(0, import_jsx_runtime$6.jsxs)("div", {
								className: "flex justify-between items-center mb-8 text-5xl text-foreground-500",
								children: [(0, import_jsx_runtime$6.jsx)("div", { className: "flex gap-16 items-center" }), (0, import_jsx_runtime$6.jsx)("div", {
									className: "transform-gpu scale-[2.5] origin-right mb-8",
									children: (0, import_jsx_runtime$6.jsxs)(chip_default, {
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
					(0, import_jsx_runtime$6.jsx)("div", { className: "h-18" }),
					(0, import_jsx_runtime$6.jsx)("div", { className: "h-0.5 bg-default-300" }),
					(0, import_jsx_runtime$6.jsxs)("div", {
						className: "flex justify-between items-center px-16 py-12 pb-0",
						children: [(0, import_jsx_runtime$6.jsxs)("div", {
							className: "flex gap-8 items-center",
							children: [(0, import_jsx_runtime$6.jsx)("img", {
								src: props.data.author.avatar,
								alt: props.data.author.nickname,
								className: "object-cover w-48 h-48 rounded-full border-red-200 border-3"
							}), (0, import_jsx_runtime$6.jsxs)("div", {
								className: "flex flex-col gap-6",
								children: [(0, import_jsx_runtime$6.jsx)("p", {
									className: "text-6xl font-semibold text-foreground-900",
									children: props.data.author.nickname
								}), (0, import_jsx_runtime$6.jsxs)("p", {
									className: "text-5xl text-foreground-500",
									children: [
										"用户ID: ",
										props.data.author.user_id.slice(0, 8),
										"..."
									]
								})]
							})]
						}), (0, import_jsx_runtime$6.jsx)("div", {
							className: "transform-gpu scale-[3.5] origin-right",
							children: (0, import_jsx_runtime$6.jsx)(button_default, {
								size: "sm",
								className: "text-white bg-[#FF2442]",
								children: (0, import_jsx_runtime$6.jsxs)("div", {
									className: "flex items-center",
									children: [(0, import_jsx_runtime$6.jsx)(ExternalLink, { className: "mr-1 w-4 h-4" }), (0, import_jsx_runtime$6.jsx)("span", { children: "查看原文" })]
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
}, 1);
var import_react$7, import_jsx_runtime$5, QRCodeSection, NoteInfoHeader, CommentItemComponent, XiaohongshuComment, Comment_default;
var init_Comment = __esmMin(() => {
	init_lucide_react();
	import_react$7 = __toESM(require_react(), 1);
	init_DefaultLayout();
	import_jsx_runtime$5 = __toESM(require_jsx_runtime(), 1);
	QRCodeSection = ({ qrCodeDataUrl }) => (0, import_jsx_runtime$5.jsxs)("div", {
		className: "flex flex-col justify-center items-center p-5",
		children: [(0, import_jsx_runtime$5.jsx)("div", {
			className: "flex overflow-hidden justify-center items-center bg-white w-110 h-110",
			children: qrCodeDataUrl ? (0, import_jsx_runtime$5.jsx)("img", {
				src: qrCodeDataUrl,
				alt: "二维码",
				className: "object-contain"
			}) : (0, import_jsx_runtime$5.jsx)(QrCode, {
				size: 200,
				className: "text-foreground-400"
			})
		}), (0, import_jsx_runtime$5.jsx)("p", {
			className: "mt-5 text-[40px] text-foreground-500 text-center",
			children: "扫码查看原笔记"
		})]
	});
	NoteInfoHeader = ({ type, commentLength, imageLength, qrCodeDataUrl }) => (0, import_jsx_runtime$5.jsxs)("div", {
		className: "flex justify-between items-center max-w-300 mx-auto p-5",
		children: [(0, import_jsx_runtime$5.jsxs)("div", {
			className: "flex flex-col justify-center items-start",
			children: [(0, import_jsx_runtime$5.jsx)("div", {
				className: "flex justify-start items-center",
				children: (0, import_jsx_runtime$5.jsx)("img", {
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
			}), (0, import_jsx_runtime$5.jsxs)("div", {
				className: "mt-8 space-y-4 text-left text-foreground-500",
				children: [
					(0, import_jsx_runtime$5.jsxs)("div", {
						className: "tracking-[6px] text-[45px] select-text",
						children: ["笔记类型：", type]
					}),
					(0, import_jsx_runtime$5.jsxs)("div", {
						className: "tracking-[6px] text-[45px] select-text",
						children: [
							"评论数量：",
							commentLength,
							"条"
						]
					}),
					type === "图文" && imageLength && (0, import_jsx_runtime$5.jsxs)("div", {
						className: "tracking-[6px] text-[45px] select-text",
						children: [
							"图片数量：",
							imageLength,
							"张"
						]
					})
				]
			})]
		}), (0, import_jsx_runtime$5.jsx)(QRCodeSection, { qrCodeDataUrl })]
	});
	CommentItemComponent = ({ comment, isLast = false }) => (0, import_jsx_runtime$5.jsxs)("div", {
		className: `flex px-10 pt-15 ${isLast ? "pb-0" : "pb-15"}`,
		children: [(0, import_jsx_runtime$5.jsx)("img", {
			src: comment.user_info.image,
			className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
			alt: "用户头像"
		}), (0, import_jsx_runtime$5.jsxs)("div", {
			className: "flex-1",
			children: [
				(0, import_jsx_runtime$5.jsxs)("div", {
					className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center select-text",
					children: [(0, import_jsx_runtime$5.jsx)("span", {
						className: "text-5xl",
						children: comment.user_info.nickname
					}), comment.show_tags && comment.show_tags.length > 0 && comment.show_tags.map((tag, index) => {
						if (tag === "is_author") return (0, import_jsx_runtime$5.jsx)("div", {
							className: "inline-block px-6 py-3 ml-3 text-4xl rounded-full bg-default-100 text-default-500",
							children: "作者"
						}, index);
						else if (tag === "user_top") return (0, import_jsx_runtime$5.jsx)("div", {
							className: "inline-block px-6 py-3 rounded-full ml-3 text-4xl bg-[#ff2e4d0f] text-[#ff2e4d]",
							children: "置顶评论"
						}, index);
						else return null;
					})]
				}),
				(0, import_jsx_runtime$5.jsx)("div", {
					className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] [&_span]:inline",
					dangerouslySetInnerHTML: { __html: comment.content },
					style: {
						wordBreak: "break-word",
						overflowWrap: "break-word"
					}
				}),
				comment.pictures && comment.pictures.length > 0 && (0, import_jsx_runtime$5.jsx)("div", {
					className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1",
					children: (0, import_jsx_runtime$5.jsx)("img", {
						className: "object-contain w-full h-full rounded-2xl",
						src: comment.pictures[0].url_default,
						alt: "评论图片"
					})
				}),
				(0, import_jsx_runtime$5.jsxs)("div", {
					className: "flex justify-between items-center mt-6 text-foreground-500",
					children: [(0, import_jsx_runtime$5.jsxs)("div", {
						className: "flex items-center space-x-6 select-text",
						children: [
							(0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[45px]",
								children: comment.create_time
							}),
							(0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[45px]",
								children: comment.ip_location
							}),
							parseInt(comment.sub_comment_count) > 0 ? (0, import_jsx_runtime$5.jsxs)("span", {
								className: "text-[40px] text-foreground-600",
								children: [
									"共",
									comment.sub_comment_count,
									"条回复"
								]
							}) : (0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[40px] text-foreground-600",
								children: "回复"
							})
						]
					}), (0, import_jsx_runtime$5.jsxs)("div", {
						className: "flex items-center space-x-6",
						children: [(0, import_jsx_runtime$5.jsxs)("div", {
							className: "flex items-center space-x-2 transition-colors cursor-pointer",
							children: [(0, import_jsx_runtime$5.jsx)(Heart, {
								size: 60,
								className: comment.liked ? "text-red-500 fill-current" : "text-foreground-500"
							}), (0, import_jsx_runtime$5.jsx)("span", {
								className: "text-[50px] select-text",
								children: comment.like_count
							})]
						}), (0, import_jsx_runtime$5.jsx)("div", {
							className: "flex items-center transition-colors cursor-pointer",
							children: (0, import_jsx_runtime$5.jsx)(MessageCircle, {
								size: 60,
								className: "stroke-current text-foreground-500"
							})
						})]
					})]
				}),
				comment.sub_comments && comment.sub_comments.length > 0 && (0, import_jsx_runtime$5.jsx)("div", {
					className: "pl-6 mt-6",
					children: comment.sub_comments.map((subComment, index) => (0, import_jsx_runtime$5.jsx)("div", {
						className: `py-4 ${index !== comment.sub_comments.length - 1 ? "border-b border-divider" : ""}`,
						children: (0, import_jsx_runtime$5.jsxs)("div", {
							className: "flex items-start space-x-4",
							children: [(0, import_jsx_runtime$5.jsx)("img", {
								src: subComment.user_info.image,
								className: "object-cover mr-8 w-32 h-32 rounded-full",
								alt: "用户头像"
							}), (0, import_jsx_runtime$5.jsxs)("div", {
								className: "flex-1",
								children: [
									(0, import_jsx_runtime$5.jsxs)("div", {
										className: "flex items-center mb-2 space-x-2",
										children: [(0, import_jsx_runtime$5.jsx)("span", {
											className: "text-[40px] font-medium text-foreground-600",
											children: subComment.user_info.nickname
										}), subComment.show_tags && subComment.show_tags.length > 0 && subComment.show_tags.map((tag, tagIndex) => tag === "is_author" ? (0, import_jsx_runtime$5.jsx)("div", {
											className: "inline-block px-5 py-2 ml-2 text-3xl rounded-full bg-default-100 text-default-500",
											children: "作者"
										}, tagIndex) : null)]
									}),
									(0, import_jsx_runtime$5.jsx)("div", {
										className: "text-[45px] text-foreground leading-relaxed mb-2 select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
										dangerouslySetInnerHTML: { __html: subComment.content },
										style: {
											wordBreak: "break-word",
											overflowWrap: "break-word"
										}
									}),
									(0, import_jsx_runtime$5.jsxs)("div", {
										className: "flex justify-between items-center text-foreground-500",
										children: [(0, import_jsx_runtime$5.jsxs)("div", {
											className: "flex items-center space-x-4",
											children: [(0, import_jsx_runtime$5.jsx)("span", {
												className: "text-[35px]",
												children: subComment.create_time
											}), (0, import_jsx_runtime$5.jsx)("span", {
												className: "text-[35px]",
												children: subComment.ip_location
											})]
										}), (0, import_jsx_runtime$5.jsxs)("div", {
											className: "flex items-center space-x-2",
											children: [(0, import_jsx_runtime$5.jsx)(Heart, {
												size: 40,
												className: subComment.liked ? "text-red-500 fill-current" : "text-foreground-500"
											}), (0, import_jsx_runtime$5.jsx)("span", {
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
	XiaohongshuComment = import_react$7.memo((props) => (0, import_jsx_runtime$5.jsxs)(DefaultLayout, {
		...props,
		children: [
			(0, import_jsx_runtime$5.jsx)("div", { className: "h-30" }),
			(0, import_jsx_runtime$5.jsx)(NoteInfoHeader, {
				type: props.data.Type,
				commentLength: props.data.CommentLength,
				imageLength: props.data.ImageLength,
				qrCodeDataUrl: props.qrCodeDataUrl
			}),
			(0, import_jsx_runtime$5.jsx)("div", {
				className: "overflow-auto mx-20 max-w-full",
				children: props.data.CommentsData.length > 0 ? (0, import_jsx_runtime$5.jsx)("div", {
					className: "divide-y divide-divider",
					children: props.data.CommentsData.map((comment, index) => (0, import_jsx_runtime$5.jsx)(CommentItemComponent, {
						comment,
						isLast: index === props.data.CommentsData.length - 1
					}, comment.id))
				}) : (0, import_jsx_runtime$5.jsx)("div", {
					className: "flex justify-center items-center py-20",
					children: (0, import_jsx_runtime$5.jsx)("p", {
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
}, 1);
var import_react$6, import_jsx_runtime$4, ICON_MAP, getIconForItem, MenuItemComponent, MenuGroupComponent, Help, Help_default;
var init_Help = __esmMin(() => {
	import_react$6 = __toESM(require_react(), 1);
	init_ri();
	init_DefaultLayout();
	import_jsx_runtime$4 = __toESM(require_jsx_runtime(), 1);
	ICON_MAP = {
		Link: RiLinkM,
		Sparkles: RiSparkling2Fill,
		Send: RiSendPlaneFill,
		List: RiListCheck2,
		Bell: RiBellFill,
		LogIn: RiLoginCircleFill,
		Bot: RiRobot2Fill,
		RefreshCw: RiRefreshLine
	};
	getIconForItem = (icon) => {
		const byIcon = icon && ICON_MAP[icon];
		if (byIcon) return byIcon;
		return RiQuestionFill;
	};
	MenuItemComponent = ({ item, themeColor }) => (0, import_jsx_runtime$4.jsxs)("div", {
		className: "flex flex-row gap-8 py-2 relative",
		children: [(0, import_jsx_runtime$4.jsx)("div", {
			className: "pt-2 shrink-0 relative",
			children: (0, import_jsx_runtime$4.jsx)(getIconForItem(item.icon), {
				className: "w-16 h-16 relative z-10 text-slate-900 dark:text-white",
				style: { color: themeColor }
			})
		}), (0, import_jsx_runtime$4.jsxs)("div", {
			className: "flex-1 min-w-0",
			children: [(0, import_jsx_runtime$4.jsx)("h3", {
				className: "mb-3 text-4xl font-black leading-tight tracking-wide text-slate-900 dark:text-white",
				children: item.title
			}), (0, import_jsx_runtime$4.jsx)("p", {
				className: "text-2xl font-medium leading-relaxed whitespace-pre-line opacity-80 text-slate-600 dark:text-white/70",
				children: item.description
			})]
		})]
	});
	MenuGroupComponent = ({ group, themeColor }) => (0, import_jsx_runtime$4.jsxs)("div", {
		className: "relative py-8",
		children: [
			(0, import_jsx_runtime$4.jsxs)("div", {
				className: "flex items-center gap-6 mb-16",
				children: [(0, import_jsx_runtime$4.jsx)("div", {
					className: "w-3 h-16 rounded-full",
					style: { backgroundColor: themeColor }
				}), (0, import_jsx_runtime$4.jsx)("h2", {
					className: "m-0 text-[4rem] font-black tracking-tight uppercase leading-none text-slate-900 dark:text-white",
					children: group.title
				})]
			}),
			(0, import_jsx_runtime$4.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16",
				children: group.items.map((item, idx) => (0, import_jsx_runtime$4.jsx)(MenuItemComponent, {
					item,
					themeColor
				}, idx))
			}),
			group.subGroups?.map((sub, i) => (0, import_jsx_runtime$4.jsxs)("div", {
				className: "mt-20 relative",
				children: [(0, import_jsx_runtime$4.jsxs)("h3", {
					className: "m-0 mb-10 text-3xl font-bold tracking-wide uppercase opacity-60 flex items-center gap-4 text-slate-900 dark:text-white",
					children: [(0, import_jsx_runtime$4.jsx)("div", { className: "w-2 h-2 rounded-full bg-current" }), sub.title]
				}), (0, import_jsx_runtime$4.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16",
					children: sub.items.map((item, idx) => (0, import_jsx_runtime$4.jsx)(MenuItemComponent, {
						item,
						themeColor
					}, idx))
				})]
			}, i))
		]
	});
	Help = import_react$6.memo((props) => {
		const title = props.data?.title || "KKK PLUGIN";
		const menuData = props.data?.menu || [];
		const isDark = props.data?.useDarkTheme ?? false;
		const glowColors = isDark ? {
			primary: "rgba(59, 130, 246, 0.4)",
			secondary: "rgba(139, 92, 246, 0.3)",
			accent: "rgba(6, 182, 212, 0.25)"
		} : {
			primary: "rgba(56, 189, 248, 0.5)",
			secondary: "rgba(167, 139, 250, 0.4)",
			accent: "rgba(45, 212, 191, 0.3)"
		};
		const contentColors = isDark ? [
			"#60a5fa",
			"#a78bfa",
			"#2dd4bf"
		] : [
			"#2563eb",
			"#7c3aed",
			"#0d9488"
		];
		return (0, import_jsx_runtime$4.jsxs)(DefaultLayout, {
			...props,
			className: "relative overflow-hidden bg-slate-50 dark:bg-[#09090b]",
			children: [
				(0, import_jsx_runtime$4.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0",
					children: [
						(0, import_jsx_runtime$4.jsx)("div", {
							className: "absolute rounded-full w-315 h-360 -top-67.5 -left-45 blur-[128px] -rotate-20",
							style: { background: `radial-gradient(ellipse at 40% 40%, ${glowColors.primary} 0%, transparent 70%)` }
						}),
						(0, import_jsx_runtime$4.jsx)("div", {
							className: "absolute rounded-full w-225 h-270 top-112.5 -right-22.5 blur-[108px] rotate-15",
							style: { background: `radial-gradient(ellipse at 50% 50%, ${glowColors.secondary} 0%, transparent 70%)` }
						}),
						(0, import_jsx_runtime$4.jsx)("div", {
							className: "absolute rounded-full w-270 h-225 -bottom-45 left-45 blur-[128px] -rotate-10",
							style: { background: `radial-gradient(ellipse at 50% 60%, ${glowColors.accent} 0%, transparent 70%)` }
						})
					]
				}),
				(0, import_jsx_runtime$4.jsx)("div", {
					className: "absolute inset-0 pointer-events-none z-0 opacity-[0.08] dark:opacity-[0.12]",
					children: (0, import_jsx_runtime$4.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$4.jsxs)("filter", {
							id: "pixelNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime$4.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "1",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime$4.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime$4.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime$4.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$4.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$4.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime$4.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#pixelNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime$4.jsx)("div", {
					className: "absolute top-30 right-15 pointer-events-none select-none opacity-[0.03] z-0",
					children: (0, import_jsx_runtime$4.jsx)("span", {
						className: "text-[200px] font-black tracking-tighter leading-none block text-right text-black dark:text-white",
						style: {
							writingMode: "vertical-rl",
							textOrientation: "mixed"
						},
						children: "GUIDE"
					})
				}),
				(0, import_jsx_runtime$4.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none z-0 overflow-hidden",
					children: [
						(0, import_jsx_runtime$4.jsx)("div", {
							className: "absolute top-12 left-12 grid grid-cols-4 gap-2 opacity-20",
							children: [...Array(16)].map((_, i) => (0, import_jsx_runtime$4.jsx)("div", { className: "w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" }, i))
						}),
						(0, import_jsx_runtime$4.jsxs)("div", {
							className: "absolute top-12 right-12 flex flex-col items-end gap-1 opacity-20",
							children: [
								(0, import_jsx_runtime$4.jsx)("div", { className: "w-32 h-1 bg-slate-900 dark:bg-white" }),
								(0, import_jsx_runtime$4.jsx)("div", { className: "w-24 h-1 bg-slate-900 dark:bg-white" }),
								(0, import_jsx_runtime$4.jsx)("div", { className: "w-16 h-1 bg-slate-900 dark:bg-white" }),
								(0, import_jsx_runtime$4.jsx)("div", {
									className: "text-xs font-mono mt-1 text-slate-900 dark:text-white",
									children: "SYS.32.91"
								})
							]
						}),
						(0, import_jsx_runtime$4.jsx)("div", {
							className: "absolute top-1/2 -translate-y-1/2 left-0 w-8 h-64 flex flex-col justify-between opacity-10",
							children: [...Array(20)].map((_, i) => (0, import_jsx_runtime$4.jsx)("div", {
								className: "w-full bg-slate-900 dark:bg-white",
								style: {
									height: Math.random() > .5 ? "4px" : "2px",
									width: Math.random() * 100 + "%"
								}
							}, i))
						}),
						(0, import_jsx_runtime$4.jsx)("div", { className: "absolute top-1/3 right-0 w-0 h-0 border-t-20 border-t-transparent border-r-30 border-r-slate-900 dark:border-r-white border-b-20 border-b-transparent opacity-10" }),
						(0, import_jsx_runtime$4.jsxs)("div", {
							className: "absolute bottom-0 left-0 right-0 h-48 pointer-events-none",
							children: [(0, import_jsx_runtime$4.jsx)("div", {
								className: "absolute bottom-0 left-0 w-130 h-100 opacity-[0.04]",
								style: { background: `repeating-linear-gradient(45deg, ${isDark ? "#fff" : "#000"}, ${isDark ? "#fff" : "#000"} 5px, transparent 2px, transparent 10px)` }
							}), (0, import_jsx_runtime$4.jsx)("div", { className: "absolute -bottom-120 -right-90 w-300 h-300 rounded-full border-200 border-slate-900 dark:border-white opacity-[0.04]" })]
						})
					]
				}),
				(0, import_jsx_runtime$4.jsxs)("div", {
					className: "relative z-10 p-18 flex flex-col min-h-[calc(100vh-200px)]",
					children: [(0, import_jsx_runtime$4.jsxs)("div", {
						className: "flex justify-between items-end mb-24 border-b-4 border-slate-900/10 dark:border-white/10 pb-8",
						children: [(0, import_jsx_runtime$4.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [(0, import_jsx_runtime$4.jsxs)("div", {
								className: "flex items-center gap-3 opacity-60",
								children: [(0, import_jsx_runtime$4.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-500 animate-pulse" }), (0, import_jsx_runtime$4.jsx)("span", {
									className: "text-sm font-mono tracking-widest text-slate-500 dark:text-slate-400",
									children: "SYSTEM_READY"
								})]
							}), (0, import_jsx_runtime$4.jsx)("h1", {
								className: "text-[5rem] font-black leading-none tracking-tighter text-slate-900 dark:text-white",
								children: "COMMANDS"
							})]
						}), (0, import_jsx_runtime$4.jsxs)("div", {
							className: "text-right pb-2 opacity-80",
							children: [(0, import_jsx_runtime$4.jsx)("div", {
								className: "text-xs font-bold tracking-[0.2em] uppercase text-slate-500 dark:text-slate-400 mb-1",
								children: "CURRENT MODULE"
							}), (0, import_jsx_runtime$4.jsx)("div", {
								className: "text-2xl font-bold text-slate-900 dark:text-white",
								children: title
							})]
						})]
					}), (0, import_jsx_runtime$4.jsx)("div", {
						className: "space-y-28 flex-1 pb-48",
						children: menuData.map((group, index) => {
							const themeColor = contentColors[index % contentColors.length];
							return (0, import_jsx_runtime$4.jsx)(MenuGroupComponent, {
								group,
								themeColor
							}, index);
						})
					})]
				})
			]
		});
	});
	Help.displayName = "Help";
	Help_default = Help;
});
var ERROR_TITLES, getRandomErrorTitle;
var init_errorTitles = __esmMin(() => {
	ERROR_TITLES = [
		"哎呀",
		"糟糕",
		"完蛋",
		"坏事",
		"不妙",
		"惨啦",
		"呜呜",
		"嘤嘤",
		"哦豁",
		"我去",
		"天哪",
		"妈呀",
		"救命",
		"完球",
		"凉凉",
		"芭比Q",
		"麻麻",
		"裂开",
		"碎掉",
		"散架",
		"异常",
		"故障",
		"中断",
		"停摆",
		"瘫痪",
		"失灵",
		"失效",
		"无效",
		"超时",
		"过期",
		"失联",
		"断线",
		"掉线",
		"卡顿",
		"阻塞",
		"崩溃",
		"宕机",
		"死机",
		"罢工",
		"歇菜",
		"出问题",
		"有状况",
		"不对劲",
		"搞砸啦",
		"翻车啦",
		"掉坑里",
		"踩雷区",
		"碰钉子",
		"撞南墙",
		"栽跟头",
		"开天窗",
		"掉链子",
		"拉胯中",
		"摆烂中",
		"躺平中",
		"摸鱼中",
		"划水中",
		"神游中",
		"发呆中",
		"走神中",
		"累趴下",
		"晕过去",
		"迷路啦",
		"走丢啦",
		"睡着啦",
		"偷懒中",
		"休息中",
		"打盹中",
		"放空中",
		"恍惚中",
		"溜号啦",
		"跑路啦",
		"消失啦",
		"隐身啦",
		"躲起来",
		"闹脾气",
		"耍性子",
		"撂挑子",
		"甩锅中",
		"装死中",
		"寄寄寄",
		"完犊子",
		"药丸啊",
		"GG思密",
		"凉透透",
		"没救啊",
		"没戏啊",
		"没治啊",
		"没辙啊",
		"没招啊",
		"人麻啊",
		"人傻啊",
		"头秃啊",
		"心累啊",
		"绝望啊",
		"无语子",
		"无奈子",
		"崩溃子",
		"裂开子",
		"碎掉子",
		"寄!",
		"挂!",
		"凉!",
		"完!",
		"废!",
		"毁!",
		"崩!",
		"炸!",
		"散!",
		"碎!",
		"噶!",
		"嘎!",
		"呃!",
		"啊!",
		"哦!",
		"嗯?",
		"啥?",
		"咋?",
		"为啥",
		"咋回事",
		"怎么肥事",
		"咋回事啊",
		"发生甚么",
		"出啥事啦",
		"搞啥呢",
		"闹哪样",
		"整啥呢",
		"干嘛呢",
		"玩啥呢",
		"作甚",
		"何故",
		"为何",
		"缘何",
		"因何",
		"所以呢",
		"然后呢",
		"接下来",
		"怎么办",
		"咋整啊",
		"咋搞",
		"坏菜",
		"黄汤",
		"泡汤",
		"打水漂",
		"竹篮水",
		"白忙活",
		"白费劲",
		"白搭啊",
		"白瞎啊",
		"白干啊",
		"歇逼",
		"趴窝",
		"熄火",
		"抛锚",
		"瘫软",
		"软脚",
		"腿软",
		"手抖",
		"心慌",
		"脑壳疼",
		"(╯°□°)",
		"(┬┬﹏┬┬)",
		"(´;ω;`)",
		"(ノД`)",
		"QAQ",
		"TAT",
		"TvT",
		"QwQ",
		"OwO?",
		"OvO?",
		":-((",
		":'-(",
		"T_T",
		">_<",
		"x_x",
		"@_@",
		"#_#",
		"$_$",
		"%__%",
		"&_&",
		"折戟沉沙",
		"马失前蹄",
		"阴沟翻船",
		"功亏一篑",
		"前功尽弃",
		"付诸东流",
		"化为乌有",
		"灰飞烟灭",
		"烟消云散",
		"土崩瓦解",
		"分崩离析",
		"支离破碎",
		"七零八落",
		"一塌糊涂",
		"乱七八糟",
		"一团乱麻",
		"焦头烂额",
		"手忙脚乱",
		"措手不及",
		"猝不及防"
	];
	getRandomErrorTitle = () => ERROR_TITLES[Math.floor(Math.random() * ERROR_TITLES.length)];
});
var handlerError_exports = __export({
	default: () => handlerError_default,
	handlerError: () => handlerError
}, 1);
var import_react$5, import_jsx_runtime$3, ansiColorMap, ansi256ToColor, convertAnsiToHtml, getLogLevelTheme, ADAPTER_LOGO_MAP, getAdapterLogo, handlerError, handlerError_default;
var init_handlerError = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$5 = __toESM(require_react(), 1);
	init_fa6();
	init_md();
	init_DefaultLayout();
	init_errorTitles();
	import_jsx_runtime$3 = __toESM(require_jsx_runtime(), 1);
	ansiColorMap = {
		30: "text-default-900",
		31: "text-danger",
		32: "text-success",
		33: "text-warning",
		34: "text-primary",
		35: "text-secondary",
		36: "text-cyan-600",
		37: "text-default-500",
		90: "text-default-600",
		91: "text-danger",
		92: "text-success",
		93: "text-warning",
		94: "text-primary",
		95: "text-secondary",
		96: "text-default-500",
		97: "text-default-200"
	};
	ansi256ToColor = (colorCode) => {
		const standardColors = [
			"#000000",
			"#800000",
			"#008000",
			"#808000",
			"#000080",
			"#800080",
			"#008080",
			"#c0c0c0",
			"#808080",
			"#ff0000",
			"#00ff00",
			"#ffff00",
			"#0000ff",
			"#ff00ff",
			"#00ffff",
			"#ffffff"
		];
		if (colorCode < 16) return standardColors[colorCode];
		if (colorCode < 232) {
			const index = colorCode - 16;
			const r = Math.floor(index / 36), g = Math.floor(index % 36 / 6), b = index % 6;
			const toHex = (v) => (v === 0 ? 0 : 55 + v * 40).toString(16).padStart(2, "0");
			return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
		}
		const hex = ((colorCode - 232) * 10 + 8).toString(16).padStart(2, "0");
		return `#${hex}${hex}${hex}`;
	};
	convertAnsiToHtml = (text) => {
		const ansiRegex = /\x1b\[([0-9;]+)m/g;
		let result = "", lastIndex = 0;
		let currentStyles = { classes: [] };
		let match;
		const escapeHtml = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
		const makeSpan = (content) => {
			const hasClass = currentStyles.classes.length > 0, hasInline = currentStyles.inlineColor;
			if (!hasClass && !hasInline) return escapeHtml(content);
			return `<span${hasClass ? ` class="${currentStyles.classes.join(" ")}"` : ""}${hasInline ? ` style="color: ${currentStyles.inlineColor}"` : ""}>${escapeHtml(content)}</span>`;
		};
		while ((match = ansiRegex.exec(text)) !== null) {
			if (match.index > lastIndex) result += makeSpan(text.substring(lastIndex, match.index));
			const codes = match[1].split(";").map(Number);
			let i = 0;
			while (i < codes.length) {
				const code = codes[i];
				if (code === 90 && codes[i + 1] === 2) {
					currentStyles.classes = currentStyles.classes.filter((c) => !c.startsWith("text-"));
					currentStyles.inlineColor = void 0;
					currentStyles.classes.push("text-default-400");
					i++;
				} else if (code === 0 || code === 39 || code === 49) {
					currentStyles.classes = currentStyles.classes.filter((c) => !c.startsWith("text-") && !c.startsWith("bg-") && !c.startsWith("dark:"));
					currentStyles.inlineColor = void 0;
				} else if (code === 1) {
					if (!currentStyles.classes.includes("font-bold")) currentStyles.classes.push("font-bold");
				} else if (code === 22) currentStyles.classes = currentStyles.classes.filter((c) => c !== "font-bold");
				else if (code === 38 && codes[i + 1] === 5) {
					const colorCode = codes[i + 2];
					if (colorCode !== void 0) {
						currentStyles.classes = currentStyles.classes.filter((c) => !c.startsWith("text-") && !c.startsWith("dark:"));
						currentStyles.inlineColor = ansi256ToColor(colorCode);
						i += 2;
					}
				} else if (ansiColorMap[code]) {
					currentStyles.classes = currentStyles.classes.filter((c) => !c.startsWith("text-") && !c.startsWith("dark:"));
					currentStyles.inlineColor = void 0;
					currentStyles.classes.push(ansiColorMap[code]);
				}
				i++;
			}
			lastIndex = ansiRegex.lastIndex;
		}
		if (lastIndex < text.length) result += makeSpan(text.substring(lastIndex));
		return result;
	};
	getLogLevelTheme = (level, isDark) => {
		const themeMap = {
			TRAC: {
				bgClass: isDark ? "bg-default/10" : "bg-default/5",
				borderClass: "border-default/20",
				textClass: isDark ? "text-default-400" : "text-default-500",
				iconClass: "text-default-400"
			},
			DEBU: {
				bgClass: isDark ? "bg-primary/15" : "bg-primary/5",
				borderClass: "border-primary/25",
				textClass: "text-primary",
				iconClass: "text-primary"
			},
			MARK: {
				bgClass: isDark ? "bg-secondary/15" : "bg-secondary/5",
				borderClass: "border-secondary/25",
				textClass: "text-secondary",
				iconClass: "text-secondary"
			},
			INFO: {
				bgClass: isDark ? "bg-success/15" : "bg-success/5",
				borderClass: "border-success/25",
				textClass: "text-success",
				iconClass: "text-success"
			},
			WARN: {
				bgClass: isDark ? "bg-warning/15" : "bg-warning/5",
				borderClass: "border-warning/25",
				textClass: "text-warning",
				iconClass: "text-warning"
			},
			ERRO: {
				bgClass: isDark ? "bg-danger/15" : "bg-danger/5",
				borderClass: "border-danger/25",
				textClass: "text-danger",
				iconClass: "text-danger"
			},
			FATA: {
				bgClass: isDark ? "bg-danger/20" : "bg-danger/10",
				borderClass: "border-danger/35",
				textClass: "text-danger",
				iconClass: "text-danger"
			}
		};
		return themeMap[level] || themeMap["TRAC"];
	};
	ADAPTER_LOGO_MAP = {
		napcat: "/image/other/handlerError/napcat.webp",
		lagrange: "/image/other/handlerError/lagrange.webp",
		chronocat: "/image/other/handlerError/chronocat.svg",
		llonebot: "/image/other/handlerError/llonebot.webp",
		lltwobot: "/image/other/handlerError/llonebot.webp",
		conwechat: "/image/other/handlerError/conwechat.webp",
		gocq: "/image/other/handlerError/gocq-http.webp"
	};
	getAdapterLogo = (adapterName) => {
		const nameLower = adapterName.toLowerCase();
		for (const [key, logoPath] of Object.entries(ADAPTER_LOGO_MAP)) if (nameLower.includes(key)) return (0, import_jsx_runtime$3.jsx)("img", {
			src: logoPath,
			className: "h-16 w-auto",
			alt: adapterName
		});
		return (0, import_jsx_runtime$3.jsx)(Plug2, { className: "w-14 h-14 text-default-400" });
	};
	handlerError = (props) => {
		const { data, qrCodeDataUrl } = props;
		const isDark = data.useDarkTheme === true;
		const businessError = data.type === "business_error" ? data.error : null;
		const displayMethod = businessError?.businessName || data.method;
		const errorTitle = import_react$5.useMemo(() => getRandomErrorTitle(), []);
		const bgColor = isDark ? "#0f0a0a" : "#faf5f5";
		const primaryColor = isDark ? "#f87171" : "#dc2626";
		const secondaryColor = isDark ? "#fca5a5" : "#b91c1c";
		const mutedColor = isDark ? "rgba(248,113,113,0.7)" : "#991b1b";
		const accentColor = isDark ? "#fecaca" : "#7f1d1d";
		return (0, import_jsx_runtime$3.jsxs)(DefaultLayout, {
			...props,
			version: void 0,
			className: "relative overflow-hidden",
			style: {
				backgroundColor: bgColor,
				width: "1440px",
				minHeight: "1800px"
			},
			children: [
				(0, import_jsx_runtime$3.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none",
					children: [
						(0, import_jsx_runtime$3.jsx)("div", {
							className: "absolute rounded-full w-300 h-350 -top-75 -left-50 blur-[120px] -rotate-15",
							style: { background: isDark ? "radial-gradient(ellipse at 40% 40%, rgba(220,38,38,0.35) 0%, rgba(185,28,28,0.18) 50%, transparent 100%)" : "radial-gradient(ellipse at 40% 40%, rgba(248,113,113,0.45) 0%, rgba(252,165,165,0.22) 50%, transparent 100%)" }
						}),
						(0, import_jsx_runtime$3.jsx)("div", {
							className: "absolute rounded-full w-225 h-250 top-100 -right-25 blur-[100px] rotate-20",
							style: { background: isDark ? "radial-gradient(ellipse at 50% 50%, rgba(127,29,29,0.3) 0%, rgba(69,10,10,0.15) 50%, transparent 100%)" : "radial-gradient(ellipse at 50% 50%, rgba(254,202,202,0.4) 0%, rgba(254,226,226,0.2) 50%, transparent 100%)" }
						}),
						(0, import_jsx_runtime$3.jsx)("div", {
							className: "absolute rounded-full w-250 h-200 -bottom-50 left-50 blur-[140px] -rotate-10",
							style: { background: isDark ? "radial-gradient(ellipse at 50% 60%, rgba(153,27,27,0.3) 0%, rgba(127,29,29,0.15) 50%, transparent 100%)" : "radial-gradient(ellipse at 50% 60%, rgba(252,165,165,0.35) 0%, rgba(254,202,202,0.18) 50%, transparent 100%)" }
						})
					]
				}),
				(0, import_jsx_runtime$3.jsx)("div", {
					className: "absolute inset-0 pointer-events-none",
					style: { opacity: isDark ? .12 : .18 },
					children: (0, import_jsx_runtime$3.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$3.jsxs)("filter", {
							id: "errorPixelNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime$3.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "1",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime$3.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime$3.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime$3.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$3.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$3.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime$3.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#errorPixelNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime$3.jsx)("div", {
					className: "absolute bottom-20 right-15 pointer-events-none select-none opacity-[0.03]",
					children: (0, import_jsx_runtime$3.jsx)("span", {
						className: "text-[180px] font-black tracking-tighter leading-none block text-right",
						style: { color: isDark ? "#fff" : "#7f1d1d" },
						children: "ERROR"
					})
				}),
				(0, import_jsx_runtime$3.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none overflow-hidden z-0",
					children: [
						(0, import_jsx_runtime$3.jsxs)("div", {
							className: "absolute top-10 right-10 grid grid-cols-2 gap-3 opacity-20",
							children: [
								(0, import_jsx_runtime$3.jsx)("div", {
									className: "w-4 h-4",
									style: { backgroundColor: primaryColor }
								}),
								(0, import_jsx_runtime$3.jsx)("div", {
									className: "w-4 h-4",
									style: { backgroundColor: secondaryColor }
								}),
								(0, import_jsx_runtime$3.jsx)("div", {
									className: "w-4 h-4",
									style: { backgroundColor: secondaryColor }
								}),
								(0, import_jsx_runtime$3.jsx)("div", {
									className: "w-4 h-4",
									style: { backgroundColor: primaryColor }
								})
							]
						}),
						(0, import_jsx_runtime$3.jsx)("div", {
							className: "absolute bottom-0 left-0 w-125 h-125 opacity-[0.06] pointer-events-none",
							style: {
								backgroundImage: `repeating-linear-gradient(45deg, ${primaryColor}, ${primaryColor} 4px, transparent 2px, transparent 12px)`,
								maskImage: "linear-gradient(to top right, black, transparent 70%)",
								WebkitMaskImage: "linear-gradient(to top right, black, transparent 70%)"
							}
						}),
						(0, import_jsx_runtime$3.jsxs)("div", {
							className: "absolute -bottom-20 -right-20 w-150 h-150 opacity-10 pointer-events-none",
							children: [
								(0, import_jsx_runtime$3.jsx)("div", {
									className: "absolute bottom-0 right-0 w-full h-full border-40 rounded-full",
									style: { borderColor: primaryColor }
								}),
								(0, import_jsx_runtime$3.jsx)("div", {
									className: "absolute bottom-20 right-20 w-[calc(100%-160px)] h-[calc(100%-160px)] border-20 rounded-full",
									style: { borderColor: secondaryColor }
								}),
								(0, import_jsx_runtime$3.jsx)("div", {
									className: "absolute bottom-35 right-35 w-[calc(100%-280px)] h-[calc(100%-280px)] border-10 rounded-full",
									style: { borderColor: mutedColor }
								})
							]
						})
					]
				}),
				(0, import_jsx_runtime$3.jsxs)("div", {
					className: "relative z-10 flex flex-col h-full p-16",
					children: [
						(0, import_jsx_runtime$3.jsxs)("div", {
							className: "flex items-center justify-between mb-14",
							children: [(0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex items-center",
								children: [(0, import_jsx_runtime$3.jsx)("div", {
									className: "h-16 w-3 mr-4 opacity-80",
									style: {
										backgroundColor: primaryColor,
										backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)"
									}
								}), (0, import_jsx_runtime$3.jsxs)("div", {
									className: "relative px-8 py-3 backdrop-blur-md",
									style: {
										backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
										border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`
									},
									children: [
										(0, import_jsx_runtime$3.jsx)("div", {
											className: "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2",
											style: { borderColor: primaryColor }
										}),
										(0, import_jsx_runtime$3.jsx)("div", {
											className: "absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2",
											style: { borderColor: primaryColor }
										}),
										(0, import_jsx_runtime$3.jsx)("div", {
											className: "absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2",
											style: { borderColor: primaryColor }
										}),
										(0, import_jsx_runtime$3.jsx)("div", {
											className: "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2",
											style: { borderColor: primaryColor }
										}),
										(0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center gap-6",
											children: [(0, import_jsx_runtime$3.jsxs)("div", {
												className: "flex flex-col items-center justify-center border-r pr-6",
												style: { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" },
												children: [(0, import_jsx_runtime$3.jsx)("div", {
													className: "w-4 h-4 rounded-full shadow-[0_0_15px_currentColor] animate-pulse",
													style: {
														backgroundColor: primaryColor,
														color: primaryColor
													}
												}), (0, import_jsx_runtime$3.jsx)("span", {
													className: "text-[10px] font-mono mt-2 tracking-wider opacity-50",
													style: { color: mutedColor },
													children: "ERR.01"
												})]
											}), (0, import_jsx_runtime$3.jsxs)("div", {
												className: "flex flex-col",
												children: [(0, import_jsx_runtime$3.jsx)("span", {
													className: "text-xs font-mono font-bold tracking-[0.4em] uppercase mb-1 opacity-50",
													style: { color: secondaryColor },
													children: "System Alert"
												}), (0, import_jsx_runtime$3.jsx)("span", {
													className: "text-2xl font-black tracking-[0.25em] uppercase",
													style: { color: primaryColor },
													children: "Runtime Exception"
												})]
											})]
										})
									]
								})]
							}), (0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex items-center gap-8 pr-12",
								children: [
									(0, import_jsx_runtime$3.jsxs)("div", {
										className: "flex flex-col gap-1 items-end opacity-40",
										children: [(0, import_jsx_runtime$3.jsx)("div", {
											className: "w-16 h-0.5",
											style: { backgroundColor: primaryColor }
										}), (0, import_jsx_runtime$3.jsx)("div", {
											className: "w-8 h-0.5",
											style: { backgroundColor: secondaryColor }
										})]
									}),
									(0, import_jsx_runtime$3.jsxs)("div", {
										className: "text-right",
										children: [(0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center justify-end gap-3 mb-1",
											children: [(0, import_jsx_runtime$3.jsx)("span", {
												className: "text-xs font-black tracking-[0.3em] uppercase opacity-60",
												style: { color: mutedColor },
												children: "System Time"
											}), (0, import_jsx_runtime$3.jsx)("span", {
												className: "w-2 h-2 rounded-full animate-pulse",
												style: { backgroundColor: primaryColor }
											})]
										}), (0, import_jsx_runtime$3.jsx)("div", {
											className: "font-mono text-5xl font-black tracking-widest leading-none",
											style: { color: mutedColor },
											children: new Date(data.timestamp).toLocaleTimeString("en-GB", { hour12: false })
										})]
									}),
									(0, import_jsx_runtime$3.jsx)("div", {
										className: "h-12 w-0.5 opacity-20",
										style: { backgroundColor: mutedColor }
									}),
									(0, import_jsx_runtime$3.jsxs)("div", {
										className: "text-right",
										children: [(0, import_jsx_runtime$3.jsx)("div", {
											className: "text-xs font-black tracking-[0.3em] uppercase opacity-60 mb-1",
											style: { color: mutedColor },
											children: "Date"
										}), (0, import_jsx_runtime$3.jsx)("div", {
											className: "font-mono text-3xl font-bold tracking-widest",
											style: { color: secondaryColor },
											children: new Date(data.timestamp).toLocaleDateString("en-GB", {
												day: "2-digit",
												month: "2-digit"
											}).replace("/", ".")
										})]
									})
								]
							})]
						}),
						(0, import_jsx_runtime$3.jsxs)("div", {
							className: "mb-20",
							children: [(0, import_jsx_runtime$3.jsx)("h1", {
								className: "text-[120px] font-black leading-none tracking-tight mb-10",
								style: { color: accentColor },
								children: errorTitle
							}), (0, import_jsx_runtime$3.jsx)("p", {
								className: "text-5xl font-semibold",
								style: { color: primaryColor },
								children: displayMethod
							})]
						}),
						data.isVerification && qrCodeDataUrl && (0, import_jsx_runtime$3.jsxs)("div", {
							className: "mb-16 p-12 rounded-[40px]",
							style: { backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.6)" },
							children: [(0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex items-center gap-6 mb-10",
								children: [(0, import_jsx_runtime$3.jsx)(QrCode, { className: "w-10 h-10 text-warning" }), (0, import_jsx_runtime$3.jsx)("span", {
									className: "text-3xl font-semibold",
									style: { color: accentColor },
									children: "人机验证"
								})]
							}), (0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex gap-16 items-center",
								children: [(0, import_jsx_runtime$3.jsx)("img", {
									src: qrCodeDataUrl,
									alt: "验证二维码",
									className: "w-64 h-64 rounded-3xl"
								}), (0, import_jsx_runtime$3.jsxs)("div", {
									className: "space-y-6",
									children: [
										(0, import_jsx_runtime$3.jsx)("p", {
											className: "text-3xl",
											style: { color: secondaryColor },
											children: "请在 120 秒内完成验证"
										}),
										(0, import_jsx_runtime$3.jsxs)("ol", {
											className: "space-y-4 text-2xl",
											style: { color: mutedColor },
											children: [
												(0, import_jsx_runtime$3.jsx)("li", { children: "1. 使用手机扫描二维码" }),
												(0, import_jsx_runtime$3.jsx)("li", { children: "2. 在网页中完成人机验证" }),
												(0, import_jsx_runtime$3.jsx)("li", { children: "3. 将验证结果发送至此对话" })
											]
										}),
										data.verificationUrl && (0, import_jsx_runtime$3.jsx)("p", {
											className: "text-xl break-all mt-8",
											style: { color: mutedColor },
											children: data.verificationUrl
										})
									]
								})]
							})]
						}),
						data.triggerCommand && (0, import_jsx_runtime$3.jsxs)("div", {
							className: "mb-14",
							children: [(0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex items-center gap-5 mb-6",
								children: [(0, import_jsx_runtime$3.jsx)(Terminal, {
									className: "w-9 h-9",
									style: { color: mutedColor }
								}), (0, import_jsx_runtime$3.jsx)("span", {
									className: "text-xl font-semibold tracking-[0.2em] uppercase",
									style: { color: mutedColor },
									children: "Trigger Command"
								})]
							}), (0, import_jsx_runtime$3.jsx)("div", {
								className: "p-10 rounded-[36px]",
								style: { backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)" },
								children: (0, import_jsx_runtime$3.jsx)("pre", {
									className: "text-3xl leading-relaxed whitespace-pre-wrap break-all font-mono",
									style: { color: accentColor },
									dangerouslySetInnerHTML: { __html: convertAnsiToHtml(data.triggerCommand) }
								})
							})]
						}),
						(0, import_jsx_runtime$3.jsxs)("div", {
							className: "mb-14",
							children: [(0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex items-center gap-5 mb-6",
								children: [(0, import_jsx_runtime$3.jsx)(CircleAlert, {
									className: "w-9 h-9",
									style: { color: primaryColor }
								}), (0, import_jsx_runtime$3.jsx)("span", {
									className: "text-xl font-semibold tracking-[0.2em] uppercase",
									style: { color: mutedColor },
									children: "Stack Trace"
								})]
							}), (0, import_jsx_runtime$3.jsx)("div", {
								className: "p-10 rounded-[36px]",
								style: {
									backgroundColor: isDark ? "rgba(220,38,38,0.1)" : "rgba(254,202,202,0.4)",
									border: `1px solid ${isDark ? "rgba(248,113,113,0.2)" : "rgba(252,165,165,0.5)"}`
								},
								children: (0, import_jsx_runtime$3.jsx)("pre", {
									className: "text-2xl leading-relaxed whitespace-pre-wrap break-all font-mono",
									style: { color: isDark ? "rgba(255,255,255,0.85)" : "rgba(127,29,29,0.9)" },
									dangerouslySetInnerHTML: { __html: convertAnsiToHtml(String(businessError?.stack || data.error?.stack || "")) }
								})
							})]
						}),
						data.logs && data.logs.length > 0 && (0, import_jsx_runtime$3.jsxs)("div", {
							className: "mb-14",
							children: [(0, import_jsx_runtime$3.jsxs)("div", {
								className: "flex items-center gap-5 mb-6",
								children: [(0, import_jsx_runtime$3.jsx)(FileText, {
									className: "w-9 h-9",
									style: { color: mutedColor }
								}), (0, import_jsx_runtime$3.jsx)("span", {
									className: "text-xl font-semibold tracking-[0.2em] uppercase",
									style: { color: mutedColor },
									children: "Execution Logs"
								})]
							}), (0, import_jsx_runtime$3.jsx)("div", {
								className: "space-y-6",
								children: data.logs.map((log, index) => {
									const theme = getLogLevelTheme(log.level, isDark);
									const levelColor = theme.textClass.includes("danger") ? isDark ? "rgba(248,113,113,0.1)" : "rgba(220,38,38,0.07)" : theme.textClass.includes("warning") ? isDark ? "rgba(251,191,36,0.1)" : "rgba(245,158,11,0.07)" : theme.textClass.includes("success") ? isDark ? "rgba(34,197,94,0.1)" : "rgba(22,163,74,0.07)" : theme.textClass.includes("primary") ? isDark ? "rgba(59,130,246,0.1)" : "rgba(37,99,235,0.07)" : theme.textClass.includes("secondary") ? isDark ? "rgba(168,85,247,0.1)" : "rgba(147,51,234,0.07)" : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
									const borderColor = theme.textClass.includes("danger") ? isDark ? "rgba(248,113,113,0.3)" : "rgba(220,38,38,0.2)" : theme.textClass.includes("warning") ? isDark ? "rgba(251,191,36,0.3)" : "rgba(245,158,11,0.2)" : theme.textClass.includes("success") ? isDark ? "rgba(34,197,94,0.3)" : "rgba(22,163,74,0.2)" : theme.textClass.includes("primary") ? isDark ? "rgba(59,130,246,0.3)" : "rgba(37,99,235,0.2)" : theme.textClass.includes("secondary") ? isDark ? "rgba(168,85,247,0.3)" : "rgba(147,51,234,0.2)" : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
									return (0, import_jsx_runtime$3.jsxs)("fieldset", {
										className: `relative rounded-3xl ${theme.bgClass} border-2 p-6`,
										style: { borderColor },
										children: [
											(0, import_jsx_runtime$3.jsxs)("legend", {
												className: "flex items-center gap-2 ml-4",
												children: [
													(0, import_jsx_runtime$3.jsx)("span", {
														className: "w-3 h-3 rounded-full -mr-1.5",
														style: { backgroundColor: borderColor }
													}),
													(0, import_jsx_runtime$3.jsxs)("span", {
														className: "flex items-center gap-2 px-3",
														children: [(0, import_jsx_runtime$3.jsx)(Clock, {
															size: 18,
															className: theme.iconClass
														}), (0, import_jsx_runtime$3.jsx)("span", {
															className: `text-xl font-mono font-medium ${theme.textClass}`,
															children: log.timestamp
														})]
													}),
													(0, import_jsx_runtime$3.jsx)("span", {
														className: "w-3 h-3 rounded-full -ml-1.5",
														style: { backgroundColor: borderColor }
													})
												]
											}),
											(0, import_jsx_runtime$3.jsx)("div", {
												className: "absolute bottom-2 right-6 pointer-events-none",
												children: (0, import_jsx_runtime$3.jsx)("span", {
													className: "text-[56px] font-black uppercase leading-none tracking-tight",
													style: { color: levelColor },
													children: log.level
												})
											}),
											(0, import_jsx_runtime$3.jsx)("div", {
												className: "relative z-1 text-2xl font-mono whitespace-pre-wrap break-all leading-relaxed",
												style: { color: isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.82)" },
												dangerouslySetInnerHTML: { __html: convertAnsiToHtml(log.message) }
											})
										]
									}, index);
								})
							})]
						}),
						(0, import_jsx_runtime$3.jsxs)("div", {
							className: "mt-auto pt-12",
							style: { borderTop: `2px solid ${isDark ? "rgba(248,113,113,0.15)" : "rgba(252,165,165,0.3)"}` },
							children: [
								(0, import_jsx_runtime$3.jsxs)("div", {
									className: "grid grid-cols-2 gap-10 mb-12",
									children: [
										(0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center gap-6",
											children: [(0, import_jsx_runtime$3.jsx)("img", {
												src: "/image/frame-logo.png",
												className: "h-16 w-auto",
												alt: "Framework"
											}), (0, import_jsx_runtime$3.jsxs)("div", { children: [(0, import_jsx_runtime$3.jsx)("p", {
												className: "text-xl",
												style: { color: mutedColor },
												children: "Framework"
											}), (0, import_jsx_runtime$3.jsx)("p", {
												className: "text-3xl font-bold",
												style: { color: accentColor },
												children: data.frameworkVersion
											})] })]
										}),
										(0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center gap-6",
											children: [(0, import_jsx_runtime$3.jsxs)("svg", {
												xmlns: "http://www.w3.org/2000/svg",
												viewBox: "0 0 230 221",
												className: "h-16 w-auto",
												style: { color: accentColor },
												children: [
													(0, import_jsx_runtime$3.jsx)("path", {
														d: "M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z",
														fill: "currentColor"
													}),
													(0, import_jsx_runtime$3.jsx)("path", {
														d: "M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z",
														fill: "currentColor"
													}),
													(0, import_jsx_runtime$3.jsx)("path", {
														d: "M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z",
														fill: "currentColor"
													})
												]
											}), (0, import_jsx_runtime$3.jsxs)("div", { children: [(0, import_jsx_runtime$3.jsx)("p", {
												className: "text-xl",
												style: { color: mutedColor },
												children: "Plugin"
											}), (0, import_jsx_runtime$3.jsx)("p", {
												className: "text-3xl font-bold",
												style: { color: accentColor },
												children: data.pluginVersion
											})] })]
										}),
										data.amagiVersion && (0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center gap-6",
											children: [(0, import_jsx_runtime$3.jsx)("img", {
												src: "/image/other/handlerError/cxk.png",
												alt: "Amagi",
												className: "w-16 h-16"
											}), (0, import_jsx_runtime$3.jsxs)("div", { children: [(0, import_jsx_runtime$3.jsx)("p", {
												className: "text-xl",
												style: { color: mutedColor },
												children: "API Library"
											}), (0, import_jsx_runtime$3.jsx)("p", {
												className: "text-3xl font-bold",
												style: { color: accentColor },
												children: data.amagiVersion
											})] })]
										}),
										data.adapterInfo && (0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center gap-6",
											children: [getAdapterLogo(data.adapterInfo.name), (0, import_jsx_runtime$3.jsxs)("div", { children: [(0, import_jsx_runtime$3.jsx)("p", {
												className: "text-xl",
												style: { color: mutedColor },
												children: "Adapter"
											}), (0, import_jsx_runtime$3.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [(0, import_jsx_runtime$3.jsx)("p", {
													className: "text-3xl font-bold",
													style: { color: accentColor },
													children: data.adapterInfo.name
												}), (0, import_jsx_runtime$3.jsx)(chip_default, {
													size: "lg",
													variant: "flat",
													className: "h-8 text-lg",
													children: data.adapterInfo.version.startsWith("v") ? data.adapterInfo.version : `v${data.adapterInfo.version}`
												})]
											})] })]
										})
									]
								}),
								(0, import_jsx_runtime$3.jsxs)("div", {
									className: "flex items-center gap-10 text-xl mb-12",
									style: { color: mutedColor },
									children: [data.buildTime && (0, import_jsx_runtime$3.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [(0, import_jsx_runtime$3.jsx)(MdAccessTime, { className: "w-6 h-6" }), (0, import_jsx_runtime$3.jsxs)("span", { children: ["Built ", data.buildTime] })]
									}), data.commitHash && (0, import_jsx_runtime$3.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [(0, import_jsx_runtime$3.jsx)(FaCodeBranch, { className: "w-6 h-6" }), (0, import_jsx_runtime$3.jsxs)("span", { children: ["Commit ", data.commitHash] })]
									})]
								}),
								(0, import_jsx_runtime$3.jsxs)("div", {
									className: "p-10 rounded-[36px]",
									style: { backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)" },
									children: [
										(0, import_jsx_runtime$3.jsx)("p", {
											className: "text-3xl font-semibold mb-5",
											style: { color: accentColor },
											children: "需要帮助？"
										}),
										(0, import_jsx_runtime$3.jsx)("p", {
											className: "text-2xl mb-8",
											style: { color: secondaryColor },
											children: "请提供完整的错误截图和问题复现步骤"
										}),
										(0, import_jsx_runtime$3.jsxs)("div", {
											className: "flex items-center gap-10 text-2xl",
											children: [
												(0, import_jsx_runtime$3.jsx)("span", {
													style: { color: secondaryColor },
													children: "GitHub Issues"
												}),
												(0, import_jsx_runtime$3.jsx)("span", {
													style: { color: mutedColor },
													children: "·"
												}),
												(0, import_jsx_runtime$3.jsxs)("span", {
													style: { color: secondaryColor },
													children: ["QQ 群: ", (0, import_jsx_runtime$3.jsx)("span", {
														className: "font-bold",
														style: { color: primaryColor },
														children: "795874649"
													})]
												})
											]
										})
									]
								})
							]
						})
					]
				})
			]
		});
	};
	handlerError.displayName = "handlerError";
	handlerError_default = handlerError;
});
var changelog_exports = __export({
	Changelog: () => Changelog,
	default: () => changelog_default
}, 1);
var import_react$4, import_jsx_runtime$2, Changelog, changelog_default;
var init_changelog = __esmMin(() => {
	init_dist();
	init_lucide_react();
	import_react$4 = __toESM(require_react(), 1);
	init_react_markdown();
	init_rehype_highlight();
	init_GlowImage();
	init_DefaultLayout();
	import_jsx_runtime$2 = __toESM(require_jsx_runtime(), 1);
	Changelog = import_react$4.memo((props) => (0, import_jsx_runtime$2.jsx)(DefaultLayout, {
		...props,
		style: {
			backgroundImage: `\n          linear-gradient(to right, rgb(163 163 163 / 0.1) 2px, transparent 2px),\n          linear-gradient(to bottom, rgb(163 163 163 / 0.1) 2px, transparent 2px)\n        `,
			backgroundSize: "60px 60px"
		},
		children: (0, import_jsx_runtime$2.jsxs)("div", {
			className: "relative px-20 pt-5 pb-0 w-full max-w-none prose prose-lg prose-invert from-default-50 to-default-100",
			children: [props.data.Tip === true ? (0, import_jsx_runtime$2.jsxs)(import_jsx_runtime$2.Fragment, { children: [
				(0, import_jsx_runtime$2.jsxs)("div", {
					className: "inline-block relative mt-20",
					children: [
						(0, import_jsx_runtime$2.jsx)("div", { className: "absolute inset-0 bg-black rounded-2xl opacity-50 blur-xl translate-y-6 -z-10" }),
						(0, import_jsx_runtime$2.jsx)("img", {
							className: "block relative rounded-2xl",
							src: "/image/other/changelog/banner.webp",
							alt: "横幅"
						}),
						(0, import_jsx_runtime$2.jsx)("div", {
							className: "flex absolute inset-0 flex-col justify-center items-center left-50 bottom-50",
							children: (0, import_jsx_runtime$2.jsxs)("span", {
								className: "text-9xl font-bold text-white opacity-10",
								children: ["v", props.data.remoteVersion]
							})
						})
					]
				}),
				(0, import_jsx_runtime$2.jsxs)("div", {
					className: "py-16 pb-4 text-5xl leading-relaxed text-center",
					children: [
						"引用回复此消息包含",
						(0, import_jsx_runtime$2.jsx)("span", {
							className: "text-7xl",
							children: "「"
						}),
						(0, import_jsx_runtime$2.jsx)(GlowText, {
							className: "text-7xl font-bold text-warning",
							blurRadius: 20,
							glowStrength: 2,
							scale: 1.2,
							children: "更新"
						}),
						(0, import_jsx_runtime$2.jsx)("span", {
							className: "text-7xl",
							children: "」"
						}),
						"字眼，即可开始更新"
					]
				}),
				props.data.buildTime && (0, import_jsx_runtime$2.jsxs)("div", {
					className: "flex gap-4 opacity-50",
					children: [(0, import_jsx_runtime$2.jsxs)("div", {
						className: "text-4xl ml-17",
						children: ["更新频道:", (0, import_jsx_runtime$2.jsx)("span", {
							className: "font-bold text-warning-200",
							children: " 正式版"
						})]
					}), (0, import_jsx_runtime$2.jsxs)("div", {
						className: "text-4xl ml-15",
						children: ["编译于:", (0, import_jsx_runtime$2.jsxs)("span", {
							className: "font-bold text-warning-200",
							children: [" ", props.data.buildTime]
						})]
					})]
				})
			] }) : null, (0, import_jsx_runtime$2.jsx)(Markdown, {
				rehypePlugins: [rehypeHighlight],
				components: {
					h1: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("h1", {
						className: "text-[5.28em] font-semibold mb-8 pb-2 border-b-2 border-default-400 text-default-900",
						...props$1,
						children
					}),
					h2: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsxs)("div", {
						className: "relative mt-20 mb-5",
						children: [
							(0, import_jsx_runtime$2.jsx)("div", {
								className: "absolute -top-13 left-0 text-[11em] font-black text-default-200/50 select-none pointer-events-none uppercase leading-none",
								"aria-hidden": "true",
								children: typeof children === "string" ? children : "H2"
							}),
							(0, import_jsx_runtime$2.jsx)("h2", {
								className: "ml-15 relative z-10 text-[3.8em] pb-2  text-default-900 font-medium",
								...props$1,
								children
							}),
							(0, import_jsx_runtime$2.jsx)("div", { className: "w-full border-b border-default-400" })
						]
					}),
					h3: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsxs)("h3", {
						className: "flex items-baseline gap-3 text-[3.3em] font-semibold mb-6 text-default-900",
						...props$1,
						children: [children, (0, import_jsx_runtime$2.jsx)(CornerDownLeft, {
							strokeWidth: 2.5,
							className: "w-[1em] h-[1em] text-default-200"
						})]
					}),
					h4: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("h4", {
						className: "text-[2.64em] font-semibold mb-5 text-default-900",
						...props$1,
						children
					}),
					h5: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("h5", {
						className: "text-[2.38em] font-semibold mb-5 text-default-900",
						...props$1,
						children
					}),
					h6: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("h6", {
						className: "text-[2.11em] font-semibold mb-4 text-default-600",
						...props$1,
						children
					}),
					p: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("p", {
						className: "text-[2.64em] leading-[1.75] mb-[2.64em] text-default-900",
						...props$1,
						children
					}),
					ul: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("ul", {
						className: "pl-[5em] mb-[2em] list-disc text-default-900",
						...props$1,
						children
					}),
					ol: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("ol", {
						className: "pl-[3.6em] mb-[1.8em] list-decimal text-default-900",
						...props$1,
						children
					}),
					li: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("li", {
						className: "text-[2.6em] leading-[1.6] text-default-900",
						...props$1,
						children
					}),
					blockquote: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("blockquote", {
						className: "border-l-4 border-default-500 pl-[1.8em] py-[0.9em] mb-[1.8em] text-default-700 bg-default-100",
						...props$1,
						children
					}),
					code: ({ children }) => (0, import_jsx_runtime$2.jsx)(code_default, {
						radius: "lg",
						color: "warning",
						className: "inline align-text-bottom leading-inherit text-[0.8em] whitespace-normal break-all box-decoration-slice",
						children
					}),
					pre: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("pre", {
						className: "p-[1.8em] mb-[1.8em] bg-default-200 rounded overflow-x-auto font-mono",
						...props$1,
						children
					}),
					a: ({ children, href, ...props$1 }) => (0, import_jsx_runtime$2.jsxs)("a", {
						className: "inline-flex gap-3 items-baseline cursor-pointer text-warning hover:underline",
						onClick: (e) => e.preventDefault(),
						...props$1,
						children: [(0, import_jsx_runtime$2.jsx)(GlowText, {
							blurRadius: 10,
							glowStrength: 3,
							scale: 1.2,
							children
						}), (0, import_jsx_runtime$2.jsx)(GlowText, {
							blurRadius: 10,
							glowStrength: 3,
							scale: 1.2,
							children: (0, import_jsx_runtime$2.jsx)(ExternalLink, { className: "w-[1.1em] h-[1.1em] -mb-[0.1em]" })
						})]
					}),
					img: ({ ...props$1 }) => (0, import_jsx_runtime$2.jsx)("img", {
						className: "max-w-full h-auto rounded",
						...props$1
					}),
					table: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("table", {
						className: "w-full border-collapse mb-[1.8em] text-default-900",
						...props$1,
						children
					}),
					th: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("th", {
						className: "px-5 py-3 font-semibold text-left border text-default-900 bg-default-200 border-default-400",
						...props$1,
						children
					}),
					td: ({ children, ...props$1 }) => (0, import_jsx_runtime$2.jsx)("td", {
						className: "px-5 py-3 border text-default-900 border-default-400",
						...props$1,
						children
					})
				},
				children: props.data?.markdown ?? ""
			})]
		})
	}));
	Changelog.displayName = "Changelog";
	changelog_default = Changelog;
});
var VersionWarning_exports = __export({ VersionWarning: () => VersionWarning }, 1), import_jsx_runtime$1, VersionWarning;
var init_VersionWarning = __esmMin(() => {
	init_dist();
	__toESM(require_react(), 1);
	init_GlowImage();
	init_DefaultLayout();
	import_jsx_runtime$1 = __toESM(require_jsx_runtime(), 1);
	VersionWarning = (props) => {
		const isDark = props.data.useDarkTheme;
		const bgColor = isDark ? "#1c1917" : "#faf5ef";
		const primaryColor = isDark ? "#fb923c" : "#c2410c";
		const secondaryColor = isDark ? "#fdba74" : "#9a3412";
		const mutedColor = isDark ? "rgba(251,146,60,0.7)" : "#b45309";
		const accentColor = isDark ? "#fed7aa" : "#7c2d12";
		return (0, import_jsx_runtime$1.jsxs)(DefaultLayout, {
			...props,
			version: void 0,
			className: "relative overflow-hidden",
			style: {
				backgroundColor: bgColor,
				height: "2450px"
			},
			children: [
				(0, import_jsx_runtime$1.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none",
					children: [
						(0, import_jsx_runtime$1.jsx)("div", {
							className: "absolute rounded-full w-315 h-360 -top-67.5 -left-45 blur-[108px] -rotate-20",
							style: { background: isDark ? "radial-gradient(ellipse at 40% 40%, rgba(194,65,12,0.4) 0%, rgba(154,52,18,0.2) 50%, transparent 100%)" : "radial-gradient(ellipse at 40% 40%, rgba(234,88,12,0.5) 0%, rgba(251,146,60,0.25) 50%, transparent 100%)" }
						}),
						(0, import_jsx_runtime$1.jsx)("div", {
							className: "absolute rounded-full w-225 h-270 top-112.5 -right-22.5 blur-[90px] rotate-15",
							style: { background: isDark ? "radial-gradient(ellipse at 50% 50%, rgba(68,44,21,0.35) 0%, rgba(41,26,13,0.18) 50%, transparent 100%)" : "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.3) 0%, rgba(245,158,11,0.15) 50%, transparent 100%)" }
						}),
						(0, import_jsx_runtime$1.jsx)("div", {
							className: "absolute rounded-full w-270 h-225 -bottom-45 left-45 blur-[126px] -rotate-10",
							style: { background: isDark ? "radial-gradient(ellipse at 50% 60%, rgba(180,83,9,0.35) 0%, rgba(146,64,14,0.18) 50%, transparent 100%)" : "radial-gradient(ellipse at 50% 60%, rgba(194,65,12,0.4) 0%, rgba(180,83,9,0.2) 50%, transparent 100%)" }
						})
					]
				}),
				(0, import_jsx_runtime$1.jsx)("div", {
					className: "absolute inset-0 pointer-events-none",
					style: { opacity: isDark ? .1 : .15 },
					children: (0, import_jsx_runtime$1.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime$1.jsxs)("filter", {
							id: "pixelNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime$1.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "1",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime$1.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime$1.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime$1.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$1.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime$1.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime$1.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#pixelNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime$1.jsxs)("div", {
					className: "absolute bottom-25 right-18 pointer-events-none select-none opacity-[0.03]",
					children: [(0, import_jsx_runtime$1.jsx)("span", {
						className: "text-[200px] font-black tracking-tighter leading-none block text-right",
						style: { color: isDark ? "#fff" : "#78350f" },
						children: "VERSION"
					}), (0, import_jsx_runtime$1.jsx)("span", {
						className: "text-[200px] font-black tracking-tighter leading-none block text-right",
						style: { color: isDark ? "#fff" : "#78350f" },
						children: "WARNING"
					})]
				}),
				(0, import_jsx_runtime$1.jsxs)("div", {
					className: "relative z-10 flex flex-col justify-between h-full p-18",
					children: [
						(0, import_jsx_runtime$1.jsxs)("div", {
							className: "flex justify-between items-start",
							children: [(0, import_jsx_runtime$1.jsxs)("div", {
								className: "flex flex-col gap-12",
								children: [
									(0, import_jsx_runtime$1.jsx)("p", {
										className: "text-[28px] font-medium tracking-[0.3em] uppercase",
										style: { color: mutedColor },
										children: "karin-plugin-kkk"
									}),
									(0, import_jsx_runtime$1.jsx)("h1", {
										className: "text-[180px] font-black leading-none",
										style: { color: accentColor },
										children: "请升级你的"
									}),
									(0, import_jsx_runtime$1.jsx)("h1", {
										className: "text-[120px] font-black leading-none",
										style: { color: accentColor },
										children: (0, import_jsx_runtime$1.jsx)("span", {
											className: "font-mono",
											children: "node-karin"
										})
									})
								]
							}), (0, import_jsx_runtime$1.jsxs)("div", {
								className: "flex flex-col items-end space-y-3 mt-4",
								children: [
									(0, import_jsx_runtime$1.jsxs)("div", {
										className: "flex space-x-3",
										children: [
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-8 h-8 rounded-full",
												style: {
													backgroundColor: accentColor,
													opacity: .2
												}
											}),
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-8 h-8 rounded-full",
												style: {
													backgroundColor: accentColor,
													opacity: .4
												}
											}),
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-8 h-8 rounded-full",
												style: {
													backgroundColor: accentColor,
													opacity: .6
												}
											}),
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-8 h-8 rounded-full",
												style: { backgroundColor: accentColor }
											})
										]
									}),
									(0, import_jsx_runtime$1.jsxs)("div", {
										className: "flex space-x-3",
										children: [
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-8 h-8 rounded",
												style: {
													backgroundColor: secondaryColor,
													opacity: .15
												}
											}),
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-8 h-8 rounded",
												style: {
													backgroundColor: secondaryColor,
													opacity: .3
												}
											}),
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-8 h-8 rounded",
												style: {
													backgroundColor: secondaryColor,
													opacity: .5
												}
											})
										]
									}),
									(0, import_jsx_runtime$1.jsxs)("div", {
										className: "flex space-x-3",
										children: [(0, import_jsx_runtime$1.jsx)("div", {
											className: "w-8 h-8 rotate-45",
											style: {
												backgroundColor: mutedColor,
												opacity: .1
											}
										}), (0, import_jsx_runtime$1.jsx)("div", {
											className: "w-8 h-8 rotate-45",
											style: {
												backgroundColor: mutedColor,
												opacity: .25
											}
										})]
									})
								]
							})]
						}),
						(0, import_jsx_runtime$1.jsx)("div", {
							className: "flex-1 flex flex-col justify-center",
							children: (0, import_jsx_runtime$1.jsxs)("div", {
								className: "rounded-3xl p-12",
								style: { backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)" },
								children: [
									(0, import_jsx_runtime$1.jsxs)("div", {
										className: "flex items-stretch mb-10",
										children: [
											(0, import_jsx_runtime$1.jsxs)("div", {
												className: "flex-1",
												children: [(0, import_jsx_runtime$1.jsxs)("div", {
													className: "flex items-center space-x-3 mb-4",
													children: [(0, import_jsx_runtime$1.jsx)("div", {
														className: "w-4 h-4 rounded-full",
														style: { backgroundColor: primaryColor }
													}), (0, import_jsx_runtime$1.jsx)("span", {
														className: "text-[28px] font-medium",
														style: { color: mutedColor },
														children: "当前运行时版本"
													})]
												}), (0, import_jsx_runtime$1.jsxs)("div", {
													className: "relative inline-block",
													children: [(0, import_jsx_runtime$1.jsxs)("span", {
														className: "text-[56px] font-black font-mono leading-tight opacity-50 break-all",
														style: { color: primaryColor },
														children: ["v", props.data.currentVersion]
													}), (0, import_jsx_runtime$1.jsx)("div", {
														className: "absolute top-1/2 -left-2 -right-2 h-1.5 -rotate-3 rounded-full",
														style: { backgroundColor: primaryColor }
													})]
												})]
											}),
											(0, import_jsx_runtime$1.jsx)("div", {
												className: "w-0.5 rounded-full mx-10",
												style: { backgroundColor: isDark ? "rgba(251,146,60,0.2)" : "rgba(180,83,9,0.15)" }
											}),
											(0, import_jsx_runtime$1.jsxs)("div", {
												className: "flex-1",
												children: [(0, import_jsx_runtime$1.jsxs)("div", {
													className: "flex items-center space-x-3 mb-4",
													children: [
														(0, import_jsx_runtime$1.jsx)("div", {
															className: "w-4 h-4 rounded-full",
															style: { backgroundColor: accentColor }
														}),
														(0, import_jsx_runtime$1.jsx)("span", {
															className: "text-[28px] font-medium",
															style: { color: mutedColor },
															children: "需要/建议的版本"
														}),
														(0, import_jsx_runtime$1.jsx)(chip_default, {
															className: "text-lg font-bold",
															style: {
																backgroundColor: accentColor,
																color: bgColor
															},
															size: "md",
															children: "推荐"
														})
													]
												}), (0, import_jsx_runtime$1.jsxs)("span", {
													className: "text-[56px] font-black font-mono leading-tight break-all",
													style: { color: accentColor },
													children: ["v", props.data.requireVersion]
												})]
											})
										]
									}),
									(0, import_jsx_runtime$1.jsx)("div", {
										className: "h-0.5 rounded-full mb-10",
										style: { backgroundColor: isDark ? "rgba(251,146,60,0.2)" : "rgba(180,83,9,0.15)" }
									}),
									(0, import_jsx_runtime$1.jsxs)("div", {
										className: "space-y-20",
										children: [(0, import_jsx_runtime$1.jsxs)("div", { children: [(0, import_jsx_runtime$1.jsxs)("div", {
											className: "flex items-center space-x-4 mb-6",
											children: [
												(0, import_jsx_runtime$1.jsx)("div", {
													className: "flex items-center justify-center w-10 h-10 rounded-lg",
													style: { backgroundColor: isDark ? "rgba(251,146,60,0.15)" : "rgba(194,65,12,0.1)" },
													children: (0, import_jsx_runtime$1.jsx)("span", {
														className: "text-[28px] font-black",
														style: { color: accentColor },
														children: "1"
													})
												}),
												(0, import_jsx_runtime$1.jsxs)("svg", {
													className: "w-8 h-8",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: mutedColor,
													strokeWidth: "2",
													children: [(0, import_jsx_runtime$1.jsx)("rect", {
														x: "3",
														y: "3",
														width: "18",
														height: "18",
														rx: "2",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													}), (0, import_jsx_runtime$1.jsx)("path", {
														d: "M9 3v18M3 9h18M3 15h18",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													})]
												}),
												(0, import_jsx_runtime$1.jsx)("span", {
													className: "text-[32px] font-bold",
													style: { color: mutedColor },
													children: "Web 控制台更新"
												}),
												(0, import_jsx_runtime$1.jsx)(chip_default, {
													className: "text-[20px] font-semibold px-4",
													style: {
														backgroundColor: isDark ? "rgba(251,146,60,0.2)" : "rgba(194,65,12,0.15)",
														color: accentColor
													},
													size: "lg",
													children: "推荐"
												})
											]
										}), (0, import_jsx_runtime$1.jsxs)("div", {
											className: "ml-14 space-y-4",
											children: [
												(0, import_jsx_runtime$1.jsxs)("div", {
													className: "flex items-start space-x-4",
													children: [(0, import_jsx_runtime$1.jsx)("div", {
														className: "w-3 h-3 rounded-full mt-3 flex-shrink-0",
														style: { backgroundColor: mutedColor }
													}), (0, import_jsx_runtime$1.jsx)("span", {
														className: "text-[28px] leading-relaxed",
														style: { color: secondaryColor },
														children: "访问 Karin Web 控制台首页，查看 Karin 版本信息"
													})]
												}),
												(0, import_jsx_runtime$1.jsxs)("div", {
													className: "flex items-start space-x-4",
													children: [(0, import_jsx_runtime$1.jsx)("div", {
														className: "w-3 h-3 rounded-full mt-3 flex-shrink-0",
														style: { backgroundColor: mutedColor }
													}), (0, import_jsx_runtime$1.jsx)("span", {
														className: "text-[28px] leading-relaxed",
														style: { color: secondaryColor },
														children: "当有新版本时会高亮提示，点击查看更新日志"
													})]
												}),
												(0, import_jsx_runtime$1.jsxs)("div", {
													className: "flex items-start space-x-4",
													children: [(0, import_jsx_runtime$1.jsx)("div", {
														className: "w-3 h-3 rounded-full mt-3 flex-shrink-0",
														style: { backgroundColor: mutedColor }
													}), (0, import_jsx_runtime$1.jsx)("span", {
														className: "text-[28px] leading-relaxed",
														style: { color: secondaryColor },
														children: "点击「更新」按钮，系统将自动完成更新并重启"
													})]
												})
											]
										})] }), (0, import_jsx_runtime$1.jsxs)("div", { children: [(0, import_jsx_runtime$1.jsxs)("div", {
											className: "flex items-center space-x-4 mb-6",
											children: [
												(0, import_jsx_runtime$1.jsx)("div", {
													className: "flex items-center justify-center w-10 h-10 rounded-lg",
													style: { backgroundColor: isDark ? "rgba(251,146,60,0.15)" : "rgba(194,65,12,0.1)" },
													children: (0, import_jsx_runtime$1.jsx)("span", {
														className: "text-[28px] font-black",
														style: { color: accentColor },
														children: "2"
													})
												}),
												(0, import_jsx_runtime$1.jsx)("svg", {
													className: "w-8 h-8",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: mutedColor,
													strokeWidth: "2",
													children: (0, import_jsx_runtime$1.jsx)("path", {
														d: "M4 17l6-6-6-6M12 19h8",
														strokeLinecap: "round",
														strokeLinejoin: "round"
													})
												}),
												(0, import_jsx_runtime$1.jsx)("span", {
													className: "text-[32px] font-bold",
													style: { color: mutedColor },
													children: "命令行更新"
												})
											]
										}), (0, import_jsx_runtime$1.jsxs)("div", {
											className: "ml-14 space-y-4",
											children: [
												(0, import_jsx_runtime$1.jsx)("p", {
													className: "text-[28px]",
													style: { color: secondaryColor },
													children: "在 Karin 根目录下执行以下命令"
												}),
												(0, import_jsx_runtime$1.jsx)("div", {
													className: "rounded-xl p-6",
													style: { backgroundColor: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.7)" },
													children: (0, import_jsx_runtime$1.jsxs)("code", {
														className: "text-[40px] font-mono font-bold block",
														style: { color: accentColor },
														children: [
															"pnpm add node-karin@",
															props.data.requireVersion,
															" -w"
														]
													})
												}),
												(0, import_jsx_runtime$1.jsx)("p", {
													className: "text-[28px] opacity-80",
													style: { color: secondaryColor },
													children: "更新完成后手动重启 Karin 即可"
												})
											]
										})] })]
									}),
									(0, import_jsx_runtime$1.jsx)("div", {
										className: "h-0.5 rounded-full my-10",
										style: { backgroundColor: isDark ? "rgba(251,146,60,0.2)" : "rgba(180,83,9,0.15)" }
									}),
									(0, import_jsx_runtime$1.jsxs)("div", {
										className: "rounded-2xl p-6 flex items-start space-x-5",
										style: { backgroundColor: isDark ? "rgba(251,146,60,0.08)" : "rgba(194,65,12,0.08)" },
										children: [(0, import_jsx_runtime$1.jsxs)("svg", {
											className: "w-10 h-10 mt-1 flex-shrink-0",
											viewBox: "0 0 24 24",
											fill: accentColor,
											children: [(0, import_jsx_runtime$1.jsx)("path", { d: "M12 2L22 20H2L12 2Z" }), (0, import_jsx_runtime$1.jsx)("path", {
												d: "M12 9v4M12 17h.01",
												stroke: bgColor,
												strokeWidth: "2",
												strokeLinecap: "round"
											})]
										}), (0, import_jsx_runtime$1.jsxs)("div", {
											className: "flex-1",
											children: [(0, import_jsx_runtime$1.jsx)("p", {
												className: "text-[28px] font-semibold mb-2",
												style: { color: accentColor },
												children: "版本兼容性提示"
											}), (0, import_jsx_runtime$1.jsxs)("p", {
												className: "text-[26px] leading-relaxed",
												style: { color: secondaryColor },
												children: [
													"当前插件版本基于 ",
													(0, import_jsx_runtime$1.jsxs)("span", {
														className: "font-bold font-mono",
														style: { color: accentColor },
														children: ["node-karin v", props.data.requireVersion]
													}),
													" 开发，低版本运行时可能出现功能异常或兼容性问题，请及时更新以获得最佳体验"
												]
											})]
										})]
									})
								]
							})
						}),
						(0, import_jsx_runtime$1.jsxs)("div", {
							className: "flex justify-between items-end",
							children: [(0, import_jsx_runtime$1.jsxs)("div", {
								className: "flex flex-col space-y-3",
								children: [
									(0, import_jsx_runtime$1.jsx)("svg", {
										className: "w-9 h-9 opacity-25",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: mutedColor,
										strokeWidth: "1.5",
										children: (0, import_jsx_runtime$1.jsx)("path", { d: "M12 2L22 20H2L12 2Z" })
									}),
									(0, import_jsx_runtime$1.jsx)("svg", {
										className: "w-9 h-9 opacity-40",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: mutedColor,
										strokeWidth: "1.5",
										children: (0, import_jsx_runtime$1.jsx)("path", { d: "M12 2L22 20H2L12 2Z" })
									}),
									(0, import_jsx_runtime$1.jsx)("svg", {
										className: "w-9 h-9 opacity-60",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: mutedColor,
										strokeWidth: "1.5",
										children: (0, import_jsx_runtime$1.jsx)("path", { d: "M12 2L22 20H2L12 2Z" })
									}),
									(0, import_jsx_runtime$1.jsx)("svg", {
										className: "w-9 h-9",
										viewBox: "0 0 24 24",
										fill: accentColor,
										children: (0, import_jsx_runtime$1.jsx)("path", { d: "M12 2L22 20H2L12 2Z" })
									})
								]
							}), (0, import_jsx_runtime$1.jsxs)("div", {
								className: "flex items-end space-x-7",
								children: [(0, import_jsx_runtime$1.jsxs)("div", {
									className: "flex flex-col items-end justify-end h-25",
									children: [(0, import_jsx_runtime$1.jsx)("span", {
										className: "text-[22px] font-bold tracking-widest uppercase",
										style: { color: mutedColor },
										children: "KARIN-PLUGIN"
									}), (0, import_jsx_runtime$1.jsx)("span", {
										className: "text-[54px] font-black leading-none",
										style: { color: accentColor },
										children: "kkk"
									})]
								}), (0, import_jsx_runtime$1.jsx)(GlowImage, {
									glowStrength: 1,
									blurRadius: 20,
									children: (0, import_jsx_runtime$1.jsxs)("svg", {
										xmlns: "http://www.w3.org/2000/svg",
										viewBox: "0 0 230 221",
										className: "h-22 w-auto",
										style: { color: accentColor },
										children: [
											(0, import_jsx_runtime$1.jsx)("path", {
												d: "M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z",
												fill: "currentColor"
											}),
											(0, import_jsx_runtime$1.jsx)("path", {
												d: "M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z",
												fill: "currentColor"
											}),
											(0, import_jsx_runtime$1.jsx)("path", {
												d: "M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z",
												fill: "currentColor"
											})
										]
									})
								})]
							})]
						})
					]
				})
			]
		});
	};
});
var qrlogin_exports = __export({
	QrLogin: () => QrLogin,
	default: () => qrlogin_default
}, 1);
var import_react$2, import_jsx_runtime, QrLogin, qrlogin_default;
var init_qrlogin = __esmMin(() => {
	init_lucide_react();
	import_react$2 = __toESM(require_react(), 1);
	init_GlowImage();
	init_DefaultLayout();
	import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
	QrLogin = import_react$2.memo((props) => {
		const qrCodeDataUrl = props.qrCodeDataUrl;
		const isDark = props.data.useDarkTheme ?? false;
		const bgColor = isDark ? "#0f0f1a" : "#f8f6ff";
		const secondaryColor = isDark ? "#a78bfa" : "#8b5cf6";
		const mutedColor = isDark ? "rgba(129,140,248,0.7)" : "#7c3aed";
		const accentColor = isDark ? "#c4b5fd" : "#4f46e5";
		const warningColor = isDark ? "#f87171" : "#dc2626";
		return (0, import_jsx_runtime.jsxs)(DefaultLayout, {
			...props,
			version: void 0,
			className: "relative overflow-hidden",
			style: {
				backgroundColor: bgColor,
				minHeight: "2000px"
			},
			children: [
				(0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 pointer-events-none",
					children: [
						(0, import_jsx_runtime.jsx)("div", {
							className: "absolute rounded-full w-[800px] h-[600px] -top-[200px] left-1/2 -translate-x-1/2 blur-[150px]",
							style: { background: isDark ? "radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.25) 50%, transparent 100%)" : "radial-gradient(ellipse at 50% 30%, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.18) 50%, transparent 100%)" }
						}),
						(0, import_jsx_runtime.jsx)("div", {
							className: "absolute rounded-full w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[140px]",
							style: { background: isDark ? "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.4) 0%, rgba(196,181,253,0.2) 50%, transparent 100%)" : "radial-gradient(ellipse at 50% 50%, rgba(167,139,250,0.3) 0%, rgba(196,181,253,0.12) 50%, transparent 100%)" }
						}),
						(0, import_jsx_runtime.jsx)("div", {
							className: "absolute rounded-full w-[800px] h-[600px] -bottom-[200px] left-1/2 -translate-x-1/2 blur-[150px]",
							style: { background: isDark ? "radial-gradient(ellipse at 50% 70%, rgba(124,58,237,0.35) 0%, rgba(99,102,241,0.18) 50%, transparent 100%)" : "radial-gradient(ellipse at 50% 70%, rgba(124,58,237,0.25) 0%, rgba(99,102,241,0.12) 50%, transparent 100%)" }
						})
					]
				}),
				(0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 pointer-events-none",
					style: { opacity: isDark ? .08 : .1 },
					children: (0, import_jsx_runtime.jsxs)("svg", {
						className: "w-full h-full",
						xmlns: "http://www.w3.org/2000/svg",
						children: [(0, import_jsx_runtime.jsxs)("filter", {
							id: "qrNoise",
							x: "0%",
							y: "0%",
							width: "100%",
							height: "100%",
							children: [
								(0, import_jsx_runtime.jsx)("feTurbulence", {
									type: "fractalNoise",
									baseFrequency: "0.8",
									numOctaves: "1",
									stitchTiles: "stitch",
									result: "noise"
								}),
								(0, import_jsx_runtime.jsx)("feColorMatrix", {
									type: "saturate",
									values: "0",
									result: "gray"
								}),
								(0, import_jsx_runtime.jsxs)("feComponentTransfer", { children: [
									(0, import_jsx_runtime.jsx)("feFuncR", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime.jsx)("feFuncG", {
										type: "discrete",
										tableValues: "0 1"
									}),
									(0, import_jsx_runtime.jsx)("feFuncB", {
										type: "discrete",
										tableValues: "0 1"
									})
								] })
							]
						}), (0, import_jsx_runtime.jsx)("rect", {
							width: "100%",
							height: "100%",
							filter: "url(#qrNoise)"
						})]
					})
				}),
				(0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex flex-col min-h-[2000px] pt-20 pb-20 px-32",
					children: [
						(0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-5",
							children: [
								(0, import_jsx_runtime.jsx)("p", {
									className: "text-2xl font-medium tracking-[0.3em] uppercase",
									style: { color: mutedColor },
									children: "karin-plugin-kkk"
								}),
								(0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-6",
									children: [(0, import_jsx_runtime.jsx)(GlowImage, {
										glowStrength: .8,
										blurRadius: 25,
										children: (0, import_jsx_runtime.jsx)(Smartphone, {
											className: "w-20 h-20",
											style: { color: accentColor }
										})
									}), (0, import_jsx_runtime.jsx)("h1", {
										className: "text-[90px] font-black leading-none",
										style: { color: accentColor },
										children: "扫码登录"
									})]
								}),
								(0, import_jsx_runtime.jsx)("p", {
									className: "text-3xl font-medium",
									style: { color: secondaryColor },
									children: "使用手机 APP 扫描二维码快速连接"
								})
							]
						}),
						(0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 mb-10",
							children: (0, import_jsx_runtime.jsxs)("div", {
								className: "relative rounded-3xl p-10 border-4",
								style: {
									background: isDark ? "linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(124,58,237,0.15) 100%)" : "linear-gradient(135deg, rgba(196,181,253,0.4) 0%, rgba(167,139,250,0.3) 100%)",
									borderColor: isDark ? "#a78bfa" : "#8b5cf6",
									boxShadow: isDark ? "0 0 60px rgba(139,92,246,0.4), inset 0 0 40px rgba(139,92,246,0.15)" : "0 0 60px rgba(139,92,246,0.3), inset 0 0 40px rgba(196,181,253,0.4)"
								},
								children: [
									(0, import_jsx_runtime.jsx)("div", {
										className: "absolute -top-12 left-1/2 -translate-x-1/2",
										children: (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-full p-6",
											style: {
												background: isDark ? "linear-gradient(135deg, #f87171 0%, #dc2626 100%)" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
												boxShadow: isDark ? "0 0 40px rgba(248,113,113,0.6)" : "0 0 40px rgba(239,68,68,0.5)"
											},
											children: (0, import_jsx_runtime.jsx)(TriangleAlert, {
												className: "w-16 h-16 text-white",
												strokeWidth: 3
											})
										})
									}),
									(0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-6 mt-8",
										children: [
											(0, import_jsx_runtime.jsxs)("div", {
												className: "text-center",
												children: [(0, import_jsx_runtime.jsx)("h3", {
													className: "text-6xl font-black tracking-wider mb-4",
													style: { color: warningColor },
													children: "⚠ 安全警告 ⚠"
												}), (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-3",
													children: [(0, import_jsx_runtime.jsx)("p", {
														className: "text-4xl font-bold",
														style: { color: isDark ? "#c4b5fd" : "#7c3aed" },
														children: "请勿截图转发此二维码"
													}), (0, import_jsx_runtime.jsx)("p", {
														className: "text-3xl font-medium",
														style: { color: isDark ? "#a78bfa" : "#8b5cf6" },
														children: "图片含敏感登录信息"
													})]
												})]
											}),
											(0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4",
												children: [
													(0, import_jsx_runtime.jsx)("div", {
														className: "flex-1 h-1 rounded-full",
														style: {
															backgroundColor: isDark ? "#8b5cf6" : "#a78bfa",
															opacity: .5
														}
													}),
													(0, import_jsx_runtime.jsx)("span", {
														className: "text-3xl",
														style: { color: isDark ? "#a78bfa" : "#8b5cf6" },
														children: "◆"
													}),
													(0, import_jsx_runtime.jsx)("div", {
														className: "flex-1 h-1 rounded-full",
														style: {
															backgroundColor: isDark ? "#8b5cf6" : "#a78bfa",
															opacity: .5
														}
													})
												]
											}),
											(0, import_jsx_runtime.jsxs)("div", {
												className: "text-center",
												children: [(0, import_jsx_runtime.jsx)("p", {
													className: "text-4xl font-bold tracking-wide",
													style: { color: warningColor },
													children: "泄露将导致服务器安全风险"
												}), (0, import_jsx_runtime.jsx)("p", {
													className: "text-3xl font-medium mt-3",
													style: { color: isDark ? "#a78bfa" : "#8b5cf6" },
													children: "CONFIDENTIAL · 机密信息"
												})]
											})
										]
									}),
									(0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 rounded-tl-2xl",
										style: { borderColor: isDark ? "#a78bfa" : "#8b5cf6" }
									}),
									(0, import_jsx_runtime.jsx)("div", {
										className: "absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 rounded-tr-2xl",
										style: { borderColor: isDark ? "#a78bfa" : "#8b5cf6" }
									}),
									(0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 rounded-bl-2xl",
										style: { borderColor: isDark ? "#a78bfa" : "#8b5cf6" }
									}),
									(0, import_jsx_runtime.jsx)("div", {
										className: "absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 rounded-br-2xl",
										style: { borderColor: isDark ? "#a78bfa" : "#8b5cf6" }
									})
								]
							})
						}),
						(0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col justify-center items-center py-12",
							children: [qrCodeDataUrl ? (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center items-center w-[800px] h-[800px]",
								children: (0, import_jsx_runtime.jsx)("img", {
									src: qrCodeDataUrl,
									alt: "登录二维码",
									className: "object-contain w-full h-full"
								})
							}) : (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-8 justify-center items-center w-[800px] h-[800px]",
								children: [(0, import_jsx_runtime.jsx)(QrCode, {
									className: "w-40 h-40",
									style: { color: mutedColor }
								}), (0, import_jsx_runtime.jsx)("span", {
									className: "text-5xl font-medium",
									style: { color: mutedColor },
									children: "二维码生成中..."
								})]
							}), (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 flex items-center gap-8",
								children: [
									(0, import_jsx_runtime.jsx)("div", {
										className: "w-32 h-2 rounded-full",
										style: { background: `linear-gradient(90deg, transparent, ${mutedColor})` }
									}),
									(0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4",
										children: [(0, import_jsx_runtime.jsx)(Smartphone, {
											className: "w-12 h-12",
											style: { color: mutedColor }
										}), (0, import_jsx_runtime.jsx)("span", {
											className: "text-5xl font-bold",
											style: { color: mutedColor },
											children: "打开 APP 扫一扫"
										})]
									}),
									(0, import_jsx_runtime.jsx)("div", {
										className: "w-32 h-2 rounded-full",
										style: { background: `linear-gradient(90deg, ${mutedColor}, transparent)` }
									})
								]
							})]
						}),
						(0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-6 mt-12",
							children: (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl p-10",
								style: {
									background: isDark ? "rgba(139,92,246,0.1)" : "rgba(139,92,246,0.05)",
									border: `2px solid ${isDark ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.2)"}`
								},
								children: [(0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 mb-6",
									children: [(0, import_jsx_runtime.jsxs)("svg", {
										className: "w-12 h-12",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: mutedColor,
										strokeWidth: "2",
										children: [
											(0, import_jsx_runtime.jsx)("rect", {
												x: "2",
												y: "2",
												width: "20",
												height: "8",
												rx: "2"
											}),
											(0, import_jsx_runtime.jsx)("rect", {
												x: "2",
												y: "14",
												width: "20",
												height: "8",
												rx: "2"
											}),
											(0, import_jsx_runtime.jsx)("circle", {
												cx: "6",
												cy: "6",
												r: "1",
												fill: mutedColor
											}),
											(0, import_jsx_runtime.jsx)("circle", {
												cx: "6",
												cy: "18",
												r: "1",
												fill: mutedColor
											})
										]
									}), (0, import_jsx_runtime.jsx)("span", {
										className: "text-4xl font-bold",
										style: { color: mutedColor },
										children: "服务器地址"
									})]
								}), (0, import_jsx_runtime.jsx)("code", {
									className: "text-6xl font-mono font-bold block text-center",
									style: { color: accentColor },
									children: props.data.serverUrl
								})]
							})
						}),
						(0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-end mt-32",
							children: [(0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col space-y-3",
								children: [
									(0, import_jsx_runtime.jsx)("svg", {
										className: "w-12 h-12 opacity-20",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: mutedColor,
										strokeWidth: "1.5",
										children: (0, import_jsx_runtime.jsx)("rect", {
											x: "3",
											y: "3",
											width: "18",
											height: "18",
											rx: "2"
										})
									}),
									(0, import_jsx_runtime.jsx)("svg", {
										className: "w-12 h-12 opacity-40",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: mutedColor,
										strokeWidth: "1.5",
										children: (0, import_jsx_runtime.jsx)("rect", {
											x: "3",
											y: "3",
											width: "18",
											height: "18",
											rx: "2"
										})
									}),
									(0, import_jsx_runtime.jsx)("svg", {
										className: "w-12 h-12",
										viewBox: "0 0 24 24",
										fill: accentColor,
										children: (0, import_jsx_runtime.jsx)("rect", {
											x: "3",
											y: "3",
											width: "18",
											height: "18",
											rx: "2"
										})
									})
								]
							}), (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end gap-6",
								children: [(0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-end justify-end",
									children: [(0, import_jsx_runtime.jsx)("span", {
										className: "text-3xl font-bold tracking-widest uppercase leading-tight mb-1",
										style: { color: mutedColor },
										children: "KARIN-PLUGIN"
									}), (0, import_jsx_runtime.jsx)("span", {
										className: "text-8xl font-black leading-none",
										style: { color: accentColor },
										children: "kkk"
									})]
								}), (0, import_jsx_runtime.jsx)(GlowImage, {
									glowStrength: 1,
									blurRadius: 25,
									children: (0, import_jsx_runtime.jsxs)("svg", {
										xmlns: "http://www.w3.org/2000/svg",
										viewBox: "0 0 230 221",
										className: "w-auto h-36",
										style: { color: accentColor },
										children: [
											(0, import_jsx_runtime.jsx)("path", {
												d: "M132.75,87.37l-53.72-53.37c-4.66-4.63-1.38-12.58,5.18-12.58h115.13c6.57,0,9.84,7.95,5.18,12.58l-53.72,53.37c-4.99,4.96-13.06,4.96-18.05,0Z",
												fill: "currentColor"
											}),
											(0, import_jsx_runtime.jsx)("path", {
												d: "M28.49,186.89l.03-51.42c-.02-6.57,7.92-9.87,12.56-5.23l57.02,57.02c4.64,4.64,1.34,12.41-5.23,12.39h-51.42c-7.04-.02-12.94-5.72-12.96-12.76Z",
												fill: "currentColor"
											}),
											(0, import_jsx_runtime.jsx)("path", {
												d: "M41.54,23.68l163.04,163.05c4.78,4.78,1.39,12.95-5.36,12.94h-47.88c-9.69,0-18.99-3.86-25.84-10.71L39.3,102.75c-6.85-6.85-10.7-16.15-10.7-25.84V29.04c0-6.76,8.16-10.14,12.94-5.36Z",
												fill: "currentColor"
											})
										]
									})
								})]
							})]
						})
					]
				})
			]
		});
	});
	QrLogin.displayName = "QrLogin";
	qrlogin_default = QrLogin;
});
function createComponentConfig(baseConfig, extensions = {}) {
	return {
		...baseConfig,
		...extensions
	};
}
var componentConfigs;
var init_config = __esmMin(() => {
	__toESM(require_react(), 1);
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
						case "favorite-list": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_FavoriteList(), FavoriteList_exports)).then((module) => ({ default: module.DouyinFavoriteList }))
						});
						case "recommend-list": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_RecommendList(), RecommendList_exports)).then((module) => ({ default: module.DouyinRecommendList }))
						});
						case "live": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_Live(), Live_exports)).then((module) => ({ default: module.DouyinLive }))
						});
						case "musicinfo": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_MusicInfo(), MusicInfo_exports)).then((module) => ({ default: module.DouyinMusicInfo }))
						});
						case "user_profile": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_UserVideoList(), UserVideoList_exports)).then((module) => ({ default: module.DouyinUserVideoList })) });
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
						case "dynamic/DYNAMIC_TYPE_WORD": return createComponentConfig(baseComponent, {
							validateData: (data) => data && typeof data.share_url === "string",
							lazyComponent: () => Promise.resolve().then(() => (init_DYNAMIC_TYPE_WORD(), DYNAMIC_TYPE_WORD_exports)).then((module) => ({ default: module.BilibiliWordDynamic }))
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
						case "help": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_Help(), Help_exports)).then((module) => ({ default: module.default })) });
						case "handlerError": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_handlerError(), handlerError_exports)).then((module) => ({ default: module.handlerError })) });
						case "changelog": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_changelog(), changelog_exports)).then((module) => ({ default: module.Changelog })) });
						case "version_warning": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_VersionWarning(), VersionWarning_exports)).then((module) => ({ default: module.VersionWarning })) });
						case "qrlogin": return createComponentConfig(baseComponent, { lazyComponent: () => Promise.resolve().then(() => (init_qrlogin(), qrlogin_exports)).then((module) => ({ default: module.QrLogin })) });
						default: return createComponentConfig(baseComponent);
					}
				});
				break;
			default: platform.components = basePlatform.components.map((baseComponent) => createComponentConfig(baseComponent));
		}
		return platform;
	});
});
var init_logger = __esmMin(() => {});
var ComponentAutoRegistry;
var init_ComponentAutoRegistry = __esmMin(() => {
	init_config();
	init_logger();
	ComponentAutoRegistry = class {
		static components = /* @__PURE__ */ new Map();
		static initialized = false;
		static registrationProgress = {
			completed: 0,
			total: 0,
			currentPlatform: "",
			currentComponent: ""
		};
		static async initialize() {
			if (this.initialized) return;
			this.registrationProgress.total = componentConfigs.reduce((sum, p) => sum + p.components.filter((c) => c.enabled).length, 0);
			this.registrationProgress.completed = 0;
			const isTTY = process.stdout.isTTY;
			const updateProgress = () => {
				const { completed, total, currentPlatform, currentComponent } = this.registrationProgress;
				const message = `🔄 注册组件中... ${completed}/${total} [${currentPlatform}:${currentComponent}]`;
				if (isTTY) process.stdout.write(`\r[K${message}`);
				else logger$1.debug(message);
			};
			if (isTTY) process.stdout.write("🔄 开始注册组件...");
			else logger$1.info("🔄 开始注册组件...");
			for (const platformConfig of componentConfigs) if (platformConfig.components.filter((c) => c.enabled).length > 0) {
				this.registrationProgress.currentPlatform = platformConfig.type;
				updateProgress();
				await this.registerPlatformComponents(platformConfig, updateProgress);
			}
			this.initialized = true;
			const stats = this.getStats();
			const platforms = Object.entries(stats.byPlatform).map(([name, count]) => `${name}(${count})`).join(", ");
			if (isTTY) process.stdout.write("\r\x1B[K");
			logger$1.info(`✅ 组件注册完成: 共 ${stats.total} 个 [${platforms}]`);
		}
		static async registerPlatformComponents(platformConfig, onProgress) {
			const enabledComponents = platformConfig.components.filter((c) => c.enabled);
			if (enabledComponents.length === 0) return;
			for (const componentConfig of enabledComponents) try {
				this.registrationProgress.currentComponent = componentConfig.id;
				onProgress?.();
				await this.registerComponent(platformConfig.type, componentConfig);
			} catch (error) {
				logger$1.error(`❌ 注册组件失败: ${platformConfig.type}:${componentConfig.id}`, error);
			} finally {
				this.registrationProgress.completed++;
				onProgress?.();
			}
		}
		static async registerComponent(platform, componentConfig) {
			const key = `${platform}:${componentConfig.id}`;
			if (componentConfig.lazyComponent) {
				const module = await componentConfig.lazyComponent();
				this.components.set(key, {
					component: module.default,
					validateData: componentConfig.validateData,
					config: componentConfig
				});
			} else {
				const modulePath = `../components/${componentConfig.componentPath}`;
				const component = (await import(modulePath))[componentConfig.exportName];
				if (!component) throw new Error(`组件 ${componentConfig.exportName} 未在模块 ${modulePath} 中找到`);
				this.components.set(key, {
					component,
					validateData: componentConfig.validateData,
					config: componentConfig
				});
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
var devDataDir, MAX_VERSIONS_PER_TEMPLATE, DevDataManager;
var init_DevDataManager = __esmMin(() => {
	init_logger();
	try {
		if (process.env.NODE_ENV === "development") {
			const __dirname = fileURLToPath(new URL("data:video/mp2t;base64,ZXhwb3J0ICogZnJvbSAnLi9tYWluJwpleHBvcnQgeyByZWFjdFNlcnZlclJlbmRlciBhcyBkZWZhdWx0IH0gZnJvbSAnLi9tYWluJwpleHBvcnQgKiBmcm9tICcuL3R5cGVzJwo=", "" + import.meta.url));
			devDataDir = path.resolve(__dirname, "../dev-data");
		} else devDataDir = "";
	} catch {
		devDataDir = "";
	}
	MAX_VERSIONS_PER_TEMPLATE = 10;
	DevDataManager = class {
		static isDevEnvironment() {
			return process.env.NODE_ENV === "development";
		}
		static ensureDir(dirPath) {
			if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
		}
		static getTemplateDataDir(platform, templateName) {
			if (!devDataDir) {
				logger$1.debug("DevDataManager: 当前不在开发环境，数据保存功能将被禁用");
				return "";
			}
			const dir = path.join(devDataDir, platform, templateName);
			this.ensureDir(dir);
			return dir;
		}
		static generateVersionedFilename() {
			const now = /* @__PURE__ */ new Date();
			return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}h${String(now.getMinutes()).padStart(2, "0")}m${String(now.getSeconds()).padStart(2, "0")}s.json`;
		}
		static getVersionsFilePath(dir) {
			return path.join(dir, "versions.json");
		}
		static readVersionsFile(dir) {
			try {
				const filePath = this.getVersionsFilePath(dir);
				if (fs.existsSync(filePath)) {
					const content = fs.readFileSync(filePath, "utf-8");
					return JSON.parse(content);
				}
			} catch (error) {
				logger$1.error("读取版本记录文件失败:", error);
			}
			return {
				versions: [],
				lastUpdated: 0
			};
		}
		static writeVersionsFile(dir, versionsData) {
			try {
				const filePath = this.getVersionsFilePath(dir);
				fs.writeFileSync(filePath, JSON.stringify(versionsData, null, 2), "utf-8");
			} catch (error) {
				logger$1.error("写入版本记录文件失败:", error);
			}
		}
		static cleanupOldVersions(dir, versionsData) {
			try {
				while (versionsData.versions.length > MAX_VERSIONS_PER_TEMPLATE) {
					const oldestVersion = versionsData.versions.shift();
					if (oldestVersion) {
						const filePath = path.join(dir, oldestVersion.file);
						if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
					}
				}
				this.writeVersionsFile(dir, versionsData);
			} catch (error) {
				logger$1.error("清理旧版本文件出错:", error);
			}
		}
		static saveRenderData(platform, templateName, data) {
			if (!this.isDevEnvironment()) return false;
			try {
				const dir = this.getTemplateDataDir(platform, templateName);
				if (!dir) return false;
				const defaultFilePath = path.join(dir, "default.json");
				let versionsData = this.readVersionsFile(dir);
				if (fs.existsSync(defaultFilePath)) {
					const versionedFilename = this.generateVersionedFilename();
					const versionedFilePath = path.join(dir, versionedFilename);
					const oldData = fs.readFileSync(defaultFilePath, "utf-8");
					fs.writeFileSync(versionedFilePath, oldData, "utf-8");
					const now = /* @__PURE__ */ new Date();
					versionsData.versions.push({
						file: versionedFilename,
						timestamp: now.getTime(),
						date: now.toISOString()
					});
					this.cleanupOldVersions(dir, versionsData);
				}
				fs.writeFileSync(defaultFilePath, JSON.stringify(data, null, 2), "utf-8");
				versionsData.lastUpdated = Date.now();
				this.writeVersionsFile(dir, versionsData);
				return true;
			} catch (error) {
				logger$1.error(`❌ 保存渲染数据失败: ${platform}/${templateName}`, error);
				return false;
			}
		}
		static getVersions(platform, templateName) {
			try {
				const dir = this.getTemplateDataDir(platform, templateName);
				return this.readVersionsFile(dir).versions;
			} catch (error) {
				logger$1.error(`获取版本列表失败: ${platform}/${templateName}`, error);
				return [];
			}
		}
		static getVersionData(platform, templateName, versionFile) {
			try {
				const dir = this.getTemplateDataDir(platform, templateName);
				const filename = versionFile || "default.json";
				const filePath = path.join(dir, filename);
				if (!fs.existsSync(filePath)) return null;
				return JSON.parse(fs.readFileSync(filePath, "utf-8"));
			} catch (error) {
				logger$1.error(`获取版本数据失败: ${platform}/${templateName}/${versionFile || "default.json"}`, error);
				return null;
			}
		}
		static getDevDataDir() {
			return devDataDir;
		}
		static hasDevDataDir() {
			return fs.existsSync(devDataDir);
		}
	};
});
var import_react, import_server_node, PluginContainer, ComponentRendererFactory, ResourcePathManager, HtmlWrapper, SSRRender, reactServerRender;
var init_main = __esmMin(() => {
	import_react = __toESM(require_react(), 1);
	import_server_node = require_server_node();
	init_ComponentAutoRegistry();
	init_DevDataManager();
	init_logger();
	PluginContainer = class {
		plugins = [];
		constructor(plugins) {
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
				logger$1.warn(`插件 ${plugin.name} 的 apply() 抛出异常，已跳过`, err);
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
	ResourcePathManager = class ResourcePathManager {
		packageDir;
		NODE_ENV;
		static initialized = false;
		isDevelopment;
		constructor() {
			this.NODE_ENV = process.env.NODE_ENV || "production";
			this.isDevelopment = this.NODE_ENV === "development";
			this.packageDir = this.getPackageDir();
			ResourcePathManager.initialized = true;
		}
		getPackageDir() {
			const cwd = process.cwd();
			const metaDir = this.getPackageDirFromImportMeta();
			if (this.isDevelopment) return this.findDevelopmentDir(cwd) || metaDir;
			return metaDir;
		}
		findDevelopmentDir(cwd) {
			let currentDir = cwd;
			while (currentDir !== path.dirname(currentDir)) {
				const renderDir = path.join(currentDir, "render");
				if (fs.existsSync(renderDir)) {
					if (!ResourcePathManager.initialized) logger$1.debug("开发模式：找到 render 目录:", renderDir);
					return currentDir;
				}
				currentDir = path.dirname(currentDir);
			}
			if (!ResourcePathManager.initialized) logger$1.debug("开发模式：未找到 render 目录，将使用生产模式路径");
			return null;
		}
		getPackageDirFromImportMeta() {
			try {
				const currentModuleUrl = import.meta.url;
				const currentModulePath = new URL(currentModuleUrl).pathname;
				const normalizedPath = process.platform === "win32" ? currentModulePath.slice(1) : currentModulePath;
				const pluginDir = this.extractPluginDirFromPnpmPath(normalizedPath);
				if (pluginDir) {
					if (!ResourcePathManager.initialized) logger$1.debug("从 pnpm 路径提取的插件目录:", pluginDir);
					return pluginDir;
				}
				const fallbackDir = this.findPluginDirByScanning();
				if (fallbackDir) {
					if (!ResourcePathManager.initialized) logger$1.debug("通过扫描找到的插件目录:", fallbackDir);
					return fallbackDir;
				}
				if (!ResourcePathManager.initialized) logger$1.debug(logger$1.yellow("无法找到插件目录，使用当前项目工作目录"));
				return process.cwd();
			} catch (error) {
				logger$1.error("获取 import.meta.url 失败:", error);
				return process.cwd();
			}
		}
		extractPluginDirFromPnpmPath(pnpmPath) {
			const pnpmIndex = pnpmPath.indexOf(".pnpm");
			if (pnpmIndex === -1) return null;
			const projectRoot = pnpmPath.substring(0, pnpmIndex - 14);
			if (!ResourcePathManager.initialized) logger$1.debug("从 pnpm 路径提取的项目根目录:", projectRoot);
			const pluginsDir = path.join(projectRoot, "plugins");
			if (!fs.existsSync(pluginsDir)) {
				if (!ResourcePathManager.initialized) logger$1.debug("plugins 目录不存在:", pluginsDir);
				return null;
			}
			return this.findKarinPluginInDir(pluginsDir);
		}
		findPluginDirByScanning() {
			const cwd = process.cwd();
			const pluginsDir = path.join(cwd, "plugins");
			if (!fs.existsSync(pluginsDir)) {
				if (!ResourcePathManager.initialized) logger$1.debug("当前工作目录下没有 plugins 目录");
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
						if (!ResourcePathManager.initialized) logger$1.debug("找到包含 karin-plugin-kkk 的插件目录:", pluginPath);
						return pluginPath;
					}
				}
			} catch (error) {
				if (!ResourcePathManager.initialized) logger$1.debug("扫描插件目录失败:", error);
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
			const possiblePaths = this.getPossibleResourcePaths();
			let cssDir = "";
			for (const cssPath of possiblePaths.cssPaths) if (fs.existsSync(cssPath)) {
				cssDir = cssPath;
				if (!ResourcePathManager.initialized) logger$1.debug("找到 CSS 目录:", cssDir);
				break;
			}
			let imageDir = "";
			for (const imagePath of possiblePaths.imagePaths) if (fs.existsSync(imagePath)) {
				imageDir = imagePath;
				if (!ResourcePathManager.initialized) logger$1.debug("找到图片目录:", imageDir);
				break;
			}
			if (!cssDir) {
				cssDir = possiblePaths.cssPaths[0];
				if (!ResourcePathManager.initialized) logger$1.warn("未找到 CSS 目录，使用默认路径:", cssDir);
			}
			if (!imageDir) {
				imageDir = possiblePaths.imagePaths[0];
				if (!ResourcePathManager.initialized) logger$1.warn("未找到图片目录，使用默认路径:", imageDir);
			}
			return {
				cssDir,
				imageDir
			};
		}
		getPossibleResourcePaths() {
			const cssPaths = [];
			const imagePaths = [];
			const karinPluginPath = this.findKarinPluginKkkPackage();
			if (karinPluginPath) {
				cssPaths.push(path.join(karinPluginPath, "lib"));
				imagePaths.push(path.join(karinPluginPath, "resources", "image"));
			}
			if (this.isDevelopment) {
				const parentDir = path.dirname(this.packageDir);
				cssPaths.push(path.join(parentDir, "core", "lib"), path.join(this.packageDir, "../core/lib"));
				imagePaths.push(path.join(parentDir, "core", "resources", "image"), path.join(this.packageDir, "../core/resources/image"));
			}
			if (this.isPluginMode()) {
				cssPaths.push(path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib"), path.join(this.packageDir, "lib"));
				imagePaths.push(path.join(this.packageDir, "resources", "image"));
			}
			cssPaths.push(path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib"), path.join(this.packageDir, "lib"), path.join(this.packageDir, "dist"));
			imagePaths.push(path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "resources", "image"), path.join(this.packageDir, "resources", "image"), path.join(this.packageDir, "public", "image"));
			return {
				cssPaths,
				imagePaths
			};
		}
		findKarinPluginKkkPackage() {
			try {
				const currentModuleUrl = import.meta.url;
				const currentModulePath = new URL(currentModuleUrl).pathname;
				const normalizedPath = process.platform === "win32" ? currentModulePath.slice(1) : currentModulePath;
				let currentDir = path.dirname(normalizedPath);
				for (let i = 0; i < 10; i++) {
					const packageJsonPath = path.join(currentDir, "package.json");
					if (fs.existsSync(packageJsonPath)) try {
						if (JSON.parse(fs.readFileSync(packageJsonPath, "utf-8")).name === "karin-plugin-kkk") {
							if (!ResourcePathManager.initialized) logger$1.debug("找到 karin-plugin-kkk 包:", currentDir);
							return currentDir;
						}
					} catch {}
					const nodeModulesPath = path.join(currentDir, "node_modules", "karin-plugin-kkk");
					if (fs.existsSync(nodeModulesPath)) {
						const packageJsonPath$1 = path.join(nodeModulesPath, "package.json");
						if (fs.existsSync(packageJsonPath$1)) {
							if (!ResourcePathManager.initialized) logger$1.debug("在 node_modules 中找到 karin-plugin-kkk:", nodeModulesPath);
							return nodeModulesPath;
						}
					}
					const parentDir = path.dirname(currentDir);
					if (parentDir === currentDir) break;
					currentDir = parentDir;
				}
			} catch (error) {
				if (!ResourcePathManager.initialized) logger$1.debug("查找 karin-plugin-kkk 包失败:", error);
			}
			return null;
		}
	};
	HtmlWrapper = class {
		resourceManager;
		constructor(resourceManager) {
			this.resourceManager = resourceManager;
		}
		wrapContent(htmlContent, htmlFilePath, isDark = false) {
			const htmlDir = path.dirname(htmlFilePath);
			const { cssDir, imageDir } = this.resourceManager.getResourcePaths();
			const cssRelativePath = path.relative(htmlDir, cssDir).replace(/\\/g, "/");
			const imageRelativePath = path.relative(htmlDir, imageDir).replace(/\\/g, "/");
			const cssUrl = path.join(cssRelativePath, "karin-plugin-kkk.css").replace(/\\/g, "/");
			const fontDir = path.join(path.dirname(imageDir), "font");
			const fontRelativePath = path.relative(htmlDir, fontDir).replace(/\\/g, "/");
			const bilifontUrl = path.join(fontRelativePath, "bilifont/font.css").replace(/\\/g, "/");
			const monoFontUrl = path.join(fontRelativePath, "mono/font.css").replace(/\\/g, "/");
			let processedHtml = htmlContent.replace(/src="\/image\//g, `src="${imageRelativePath}/`).replace(/src='\/image\//g, `src='${imageRelativePath}/`).replace(/src="image\//g, `src="${imageRelativePath}/`);
			return `\n    <!DOCTYPE html>\n    <html lang="zh-CN">\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width">\n      <link rel="stylesheet" href="${bilifontUrl}">\n      <link rel="stylesheet" href="${monoFontUrl}">\n      <link rel="stylesheet" href="${cssUrl}">\n      <style>\n        html, body {\n          margin: 0;\n          padding: 0;\n          background: transparent !important;\n        }\n        body {\n          display: flex;\n          align-items: flex-start;\n          justify-content: flex-start;\n        }\n        #container {\n          border-radius: 3rem;\n          overflow: hidden;\n          background-clip: padding-box;\n        }\n      </style>\n    </head>\n    <body class="${isDark ? "dark" : ""}">\n      ${processedHtml}\n    </body>\n    </html>\n    `;
		}
	};
	SSRRender = class {
		outputDir;
		resourceManager;
		htmlWrapper;
		pluginContainer;
		constructor(options) {
			const { plugins = [], outputDir } = options;
			this.resourceManager = new ResourcePathManager();
			this.htmlWrapper = new HtmlWrapper(this.resourceManager);
			this.outputDir = outputDir;
			this.pluginContainer = new PluginContainer(plugins);
		}
		async render(request) {
			try {
				logger$1.debug("[SSR] 开始渲染组件，预设模板:", `${logger$1.yellow(`${request.templateType}/`)}${request.templateName}`);
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
				const htmlContent = (0, import_server_node.renderToString)(ctx.state.component ?? component);
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
				logger$1.error("❌ 渲染组件失败:", error);
				return {
					success: false,
					htmlPath: "",
					error: error instanceof Error ? error.message : String(error)
				};
			}
		}
	};
	reactServerRender = async (options) => {
		const { request, outputDir, plugins = [] } = options;
		if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
		await ComponentAutoRegistry.initialize();
		const result = await new SSRRender({
			plugins,
			outputDir
		}).render(request);
		if (process.env.NODE_ENV === "development") DevDataManager.saveRenderData(request.templateType, request.templateName, request.data);
		return result;
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
