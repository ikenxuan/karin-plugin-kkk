import { n as __esmMin, o as __toESM, r as __export } from "./rolldown-runtime-BMXAG3ag.js";
import { $ as init_date_fns, T as zhCN, _n as init_dist, a as Window, an as require_png, cn as require_heic_decode, dn as Chalk, et as fromUnixTime, fn as init_source, gn as Xhshow, hn as axios_default, i as init_lib, ln as require_express, mn as init_axios, n as require_lib, nt as format, on as require_jsQR, pn as AxiosError$1, r as require_qr_code_styling, rt as differenceInSeconds, sn as require_jpeg_js, t as require_dist, tt as formatDistanceToNow, un as require_protobufjs, vn as init_zod, w as init_locale, yn as zod_default } from "./vendor-D9vwdT0t.js";
import { n as init_client, r as reactServerRender } from "./template-DSKN1aMs.js";
import { createRequire } from "node:module";
import karin$1, { BOT_CONNECT, app, authMiddleware, checkPkgUpdate, checkPort, common, components, config, copyConfigSync, createBadRequestResponse, createNotFoundResponse, createServerErrorResponse, createSuccessResponse, db, defineConfig, ffmpeg, ffprobe, filesByExt, getBot, hooks, karin, karinPathHtml, karinPathTemp, logger, logs, mkdirSync, range, render, requireFileSync, restart, segment, updatePkg, watch } from "node-karin";
import fs from "node:fs";
import path, { resolve } from "node:path";
import URL$1, { fileURLToPath } from "node:url";
import { EventEmitter } from "node:events";
import crypto from "node:crypto";
import os, { platform } from "node:os";
import { karinPathBase, karinPathTemp as karinPathTemp$1 } from "node-karin/root";
import sqlite3 from "node-karin/sqlite3";
import YAML from "node-karin/yaml";
import util from "node:util";
import axios, { AxiosError } from "node-karin/axios";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import express from "node-karin/express";
import template from "node-karin/template";
import _ from "node-karin/lodash";
import { snapka } from "@snapka/puppeteer";
import { newInjectedPage } from "fingerprint-injector";
function registerDeprecatedApi(config$1) {
	deprecatedApis.set(config$1.name, config$1);
}
function checkDeprecation(apiName) {
	const config$1 = deprecatedApis.get(apiName);
	if (!config$1) return;
	const message = buildDeprecationMessage(config$1);
	if (config$1.throwError) throw new DeprecatedApiError(message, config$1);
	else console.warn(message);
}
function buildDeprecationMessage(config$1) {
	const lines = [`[DEPRECATED] "${config$1.name}" 已在 v${config$1.deprecatedIn} 版本废弃。`, `请使用 "${config$1.replacement}" 替代。`];
	if (config$1.removedIn) lines.push(`此 API 将在 v${config$1.removedIn} 版本移除。`);
	if (config$1.migrationGuide) lines.push(`迁移指南: ${config$1.migrationGuide}`);
	return lines.join("\n");
}
var deprecatedApis, DeprecatedApiError;
var init_deprecation = __esmMin(() => {
	deprecatedApis = /* @__PURE__ */ new Map();
	DeprecatedApiError = class DeprecatedApiError extends Error {
		config;
		constructor(message, config$1) {
			super(message);
			this.name = "DeprecatedApiError";
			this.config = config$1;
			Error.captureStackTrace?.(this, DeprecatedApiError);
		}
	};
	registerDeprecatedApi({
		name: "getDouyinData",
		deprecatedIn: "6.0.0",
		removedIn: "7.0.0",
		replacement: "douyinFetcher 或 client.douyin.fetcher",
		migrationGuide: "https://github.com/ikenxuan/amagi/blob/main/packages/core/MIGRATION-v6.md",
		throwError: true
	});
	registerDeprecatedApi({
		name: "getBilibiliData",
		deprecatedIn: "6.0.0",
		removedIn: "7.0.0",
		replacement: "bilibiliFetcher 或 client.bilibili.fetcher",
		migrationGuide: "https://github.com/ikenxuan/amagi/blob/main/packages/core/MIGRATION-v6.md",
		throwError: true
	});
	registerDeprecatedApi({
		name: "getKuaishouData",
		deprecatedIn: "6.0.0",
		removedIn: "7.0.0",
		replacement: "kuaishouFetcher 或 client.kuaishou.fetcher",
		migrationGuide: "https://github.com/ikenxuan/amagi/blob/main/packages/core/MIGRATION-v6.md",
		throwError: true
	});
	registerDeprecatedApi({
		name: "getXiaohongshuData",
		deprecatedIn: "6.0.0",
		removedIn: "7.0.0",
		replacement: "xiaohongshuFetcher 或 client.xiaohongshu.fetcher",
		migrationGuide: "https://github.com/ikenxuan/amagi/blob/main/packages/core/MIGRATION-v6.md",
		throwError: true
	});
	[
		{
			name: "单个视频作品数据",
			replacement: "fetchVideoInfo"
		},
		{
			name: "单个视频下载信息数据",
			replacement: "fetchVideoStreamUrl"
		},
		{
			name: "评论数据",
			replacement: "fetchComments"
		},
		{
			name: "指定评论的回复",
			replacement: "fetchCommentReplies"
		},
		{
			name: "用户主页数据",
			replacement: "fetchUserCard"
		},
		{
			name: "用户主页动态列表数据",
			replacement: "fetchUserDynamicList"
		},
		{
			name: "用户空间详细信息",
			replacement: "fetchUserSpaceInfo"
		},
		{
			name: "获取UP主总播放量",
			replacement: "fetchUploaderTotalViews"
		},
		{
			name: "Emoji数据",
			replacement: "fetchEmojiList"
		},
		{
			name: "番剧基本信息数据",
			replacement: "fetchBangumiInfo"
		},
		{
			name: "番剧下载信息数据",
			replacement: "fetchBangumiStreamUrl"
		},
		{
			name: "动态详情数据",
			replacement: "fetchDynamicDetail"
		},
		{
			name: "动态卡片数据",
			replacement: "fetchDynamicCard"
		},
		{
			name: "直播间信息",
			replacement: "fetchLiveRoomInfo"
		},
		{
			name: "直播间初始化信息",
			replacement: "fetchLiveRoomInitInfo"
		},
		{
			name: "登录基本信息",
			replacement: "fetchLoginStatus"
		},
		{
			name: "申请二维码",
			replacement: "requestLoginQrcode"
		},
		{
			name: "二维码状态",
			replacement: "checkQrcodeStatus"
		},
		{
			name: "AV转BV",
			replacement: "convertAvToBv"
		},
		{
			name: "BV转AV",
			replacement: "convertBvToAv"
		},
		{
			name: "专栏正文内容",
			replacement: "fetchArticleContent"
		},
		{
			name: "专栏显示卡片信息",
			replacement: "fetchArticleCards"
		},
		{
			name: "专栏文章基本信息",
			replacement: "fetchArticleInfo"
		},
		{
			name: "文集基本信息",
			replacement: "fetchArticleListInfo"
		},
		{
			name: "实时弹幕",
			replacement: "fetchVideoDanmaku"
		},
		{
			name: "从_v_voucher_申请_captcha",
			replacement: "requestCaptchaFromVoucher"
		},
		{
			name: "验证验证码结果",
			replacement: "validateCaptchaResult"
		},
		{
			name: "视频作品数据",
			replacement: "fetchVideoWork"
		},
		{
			name: "图集作品数据",
			replacement: "fetchImageAlbumWork"
		},
		{
			name: "合辑作品数据",
			replacement: "fetchSlidesWork"
		},
		{
			name: "文字作品数据",
			replacement: "fetchTextWork"
		},
		{
			name: "聚合解析",
			replacement: "parseWork"
		},
		{
			name: "指定评论回复数据",
			replacement: "fetchCommentReplies"
		},
		{
			name: "用户主页视频列表数据",
			replacement: "fetchUserVideoList"
		},
		{
			name: "热点词数据",
			replacement: "fetchSuggestWords"
		},
		{
			name: "搜索数据",
			replacement: "searchContent"
		},
		{
			name: "音乐数据",
			replacement: "fetchMusicInfo"
		},
		{
			name: "直播间信息数据",
			replacement: "fetchLiveRoomInfo"
		},
		{
			name: "申请二维码数据",
			replacement: "requestLoginQrcode"
		},
		{
			name: "动态表情数据",
			replacement: "fetchDynamicEmojiList"
		},
		{
			name: "弹幕数据",
			replacement: "fetchDanmakuList"
		},
		{
			name: "单个视频作品数据",
			replacement: "fetchVideoWork"
		},
		{
			name: "首页推荐数据",
			replacement: "fetchHomeFeed"
		},
		{
			name: "单个笔记数据",
			replacement: "fetchNoteDetail"
		},
		{
			name: "用户数据",
			replacement: "fetchUserProfile"
		},
		{
			name: "用户笔记数据",
			replacement: "fetchUserNoteList"
		},
		{
			name: "表情列表",
			replacement: "fetchEmojiList"
		},
		{
			name: "搜索笔记",
			replacement: "searchNotes"
		}
	].forEach(({ name, replacement }) => {
		registerDeprecatedApi({
			name: `methodType: '${name}'`,
			deprecatedIn: "6.0.0",
			removedIn: "7.0.0",
			replacement: `fetcher.${replacement}()`,
			throwError: true
		});
	});
});
function getDouyinData(..._args) {
	checkDeprecation("getDouyinData");
	throw new Error("getDouyinData 已废弃");
}
function getBilibiliData(..._args) {
	checkDeprecation("getBilibiliData");
	throw new Error("getBilibiliData 已废弃");
}
function getKuaishouData(..._args) {
	checkDeprecation("getKuaishouData");
	throw new Error("getKuaishouData 已废弃");
}
function getXiaohongshuData(..._args) {
	checkDeprecation("getXiaohongshuData");
	throw new Error("getXiaohongshuData 已废弃");
}
var init_DataFetchers = __esmMin(() => {
	init_deprecation();
});
var BilibiliAPI, bilibiliApiUrls;
var init_API$3 = __esmMin(() => {
	BilibiliAPI = class {
		getLoginStatus() {
			return "https://api.bilibili.com/x/web-interface/nav";
		}
		getVideoInfo(data$1) {
			return `https://api.bilibili.com/x/web-interface/view?bvid=${data$1.bvid}`;
		}
		getVideoStream(data$1) {
			return `https://api.bilibili.com/x/player/playurl?avid=${data$1.avid}&cid=${data$1.cid}`;
		}
		getComments(data$1) {
			const params = new URLSearchParams({
				oid: data$1.oid.toString(),
				type: data$1.type.toString(),
				mode: (data$1.mode ?? 3).toString(),
				plat: "1",
				seek_rpid: "",
				web_location: "1315875"
			});
			if (data$1.pagination_str) params.append("pagination_str", JSON.stringify({ offset: data$1.pagination_str }));
			else params.append("pagination_str", JSON.stringify({ offset: "" }));
			return `https://api.bilibili.com/x/v2/reply/wbi/main?${params.toString()}`;
		}
		getCommentStatus(data$1) {
			return `https://api.bilibili.com/x/v2/reply/subject/description?type=${data$1.type}&oid=${data$1.oid}`;
		}
		getCommentReplies(data$1) {
			return `https://api.bilibili.com/x/v2/reply/reply?type=${data$1.type}&oid=${data$1.oid}&root=${data$1.root}&ps=${data$1.number}`;
		}
		getEmojiList() {
			return "https://api.bilibili.com/x/emote/user/panel/web?business=reply&web_location=0.0";
		}
		getBangumiInfo(data$1) {
			if (data$1.ep_id) return `https://api.bilibili.com/pgc/view/web/season?ep_id=${data$1.ep_id}`;
			else if (data$1.season_id) return `https://api.bilibili.com/pgc/view/web/season?season_id=${data$1.season_id}`;
			else throw new Error("Missing required parameter: ep_id or season_id");
		}
		getBangumiStream(data$1) {
			return `https://api.bilibili.com/pgc/player/web/playurl?cid=${data$1.cid}&ep_id=${data$1.ep_id}`;
		}
		getUserDynamicList(data$1) {
			return `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/space?${new URLSearchParams({
				host_mid: data$1.host_mid.toString(),
				offset: "",
				platform: "web",
				features: "itemOpusStyle,listOnlyfans,opusBigCover,onlyfansVote,forwardListHidden,decorationCard,commentsNewVersion,onlyfansAssetsV2,ugcDelete,onlyfansQaCard,avatarAutoTheme,sunflowerStyle,eva3CardOpus,eva3CardVideo,eva3CardComment"
			}).toString()}`;
		}
		getDynamicDetail(data$1) {
			return `https://api.bilibili.com/x/polymer/web-dynamic/v1/detail?id=${data$1.dynamic_id}&features=itemOpusStyle,opusBigCover,onlyfansVote,endFooterHidden,decorationCard,onlyfansAssetsV2,ugcDelete,onlyfansQaCard,editable,opusPrivateVisible,avatarAutoTheme`;
		}
		getDynamicCard(data$1) {
			return `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/get_dynamic_detail?dynamic_id=${data$1.dynamic_id}`;
		}
		getUserCard(data$1) {
			return `https://api.bilibili.com/x/web-interface/card?mid=${data$1.host_mid}&photo=true`;
		}
		getLiveRoomInfo(data$1) {
			return `https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${data$1.room_id}`;
		}
		getLiveRoomInit(data$1) {
			return `https://api.live.bilibili.com/room/v1/Room/room_init?id=${data$1.room_id}`;
		}
		getLoginQrcode() {
			return "https://passport.bilibili.com/x/passport-login/web/qrcode/generate";
		}
		getQrcodeStatus(data$1) {
			return `https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${data$1.qrcode_key}`;
		}
		getUploaderTotalViews(data$1) {
			return `https://api.bilibili.com/x/space/upstat?mid=${data$1.host_mid}`;
		}
		getArticleContent(data$1) {
			return `https://api.bilibili.com/x/article/view?id=${data$1.id}`;
		}
		getArticleCards(data$1) {
			return `https://api.bilibili.com/x/article/cards?ids=${Array.isArray(data$1.ids) ? data$1.ids.join(",") : data$1.ids}`;
		}
		getArticleInfo(data$1) {
			return `https://api.bilibili.com/x/article/viewinfo?id=${data$1.id}`;
		}
		getArticleListInfo(data$1) {
			return `https://api.bilibili.com/x/article/list/web/articles?id=${data$1.id}`;
		}
		getUserSpaceInfo(data$1) {
			return `https://api.bilibili.com/x/space/wbi/acc/info?mid=${data$1.host_mid}`;
		}
		getCaptchaFromVoucher(data$1) {
			return {
				Url: "https://api.bilibili.com/x/gaia-vgate/v1/register",
				Body: {
					...data$1.csrf !== void 0 && { csrf: data$1.csrf },
					v_voucher: data$1.v_voucher
				}
			};
		}
		validateCaptcha(data$1) {
			return {
				Url: "https://api.bilibili.com/x/gaia-vgate/v1/validate",
				Body: {
					challenge: data$1.challenge,
					token: data$1.token,
					validate: data$1.validate,
					seccode: data$1.seccode,
					...data$1.csrf !== void 0 && { csrf: data$1.csrf }
				}
			};
		}
		getVideoDanmaku(data$1) {
			return `https://api.bilibili.com/x/v2/dm/web/seg.so?${new URLSearchParams({
				type: "1",
				oid: data$1.cid.toString(),
				segment_index: (data$1.segment_index ?? 1).toString()
			}).toString()}`;
		}
	};
	bilibiliApiUrls = new BilibiliAPI();
});
var createDeprecatedStub$3, bilibili$1, createBoundBilibiliApi;
var init_BilibiliApi = __esmMin(() => {
	init_deprecation();
	createDeprecatedStub$3 = (methodName) => (..._args) => {
		checkDeprecation("getBilibiliData");
		throw new Error(`bilibili.${methodName} 已废弃，请使用 bilibiliFetcher 替代`);
	};
	bilibili$1 = {
		getVideoInfo: createDeprecatedStub$3("getVideoInfo"),
		getVideoStream: createDeprecatedStub$3("getVideoStream"),
		getComments: createDeprecatedStub$3("getComments"),
		getCommentReply: createDeprecatedStub$3("getCommentReply"),
		getUserProfile: createDeprecatedStub$3("getUserProfile"),
		getUserDynamic: createDeprecatedStub$3("getUserDynamic"),
		getEmojiList: createDeprecatedStub$3("getEmojiList"),
		getBangumiInfo: createDeprecatedStub$3("getBangumiInfo"),
		getBangumiStream: createDeprecatedStub$3("getBangumiStream"),
		getDynamicInfo: createDeprecatedStub$3("getDynamicInfo"),
		getDynamicCard: createDeprecatedStub$3("getDynamicCard"),
		getLiveRoomDetail: createDeprecatedStub$3("getLiveRoomDetail"),
		getLiveRoomInitInfo: createDeprecatedStub$3("getLiveRoomInitInfo"),
		getLoginBasicInfo: createDeprecatedStub$3("getLoginBasicInfo"),
		getLoginQrcode: createDeprecatedStub$3("getLoginQrcode"),
		checkQrcodeStatus: createDeprecatedStub$3("checkQrcodeStatus"),
		getUserTotalPlayCount: createDeprecatedStub$3("getUserTotalPlayCount"),
		convertAvToBv: createDeprecatedStub$3("convertAvToBv"),
		convertBvToAv: createDeprecatedStub$3("convertBvToAv"),
		getArticleContent: createDeprecatedStub$3("getArticleContent"),
		getArticleCard: createDeprecatedStub$3("getArticleCard"),
		getArticleInfo: createDeprecatedStub$3("getArticleInfo"),
		getColumnInfo: createDeprecatedStub$3("getColumnInfo"),
		getUserProfileDetail: createDeprecatedStub$3("getUserProfileDetail"),
		applyVoucherCaptcha: createDeprecatedStub$3("applyVoucherCaptcha"),
		validateCaptcha: createDeprecatedStub$3("validateCaptcha"),
		getDanmaku: createDeprecatedStub$3("getDanmaku")
	};
	createBoundBilibiliApi = (_cookie, _requestConfig) => ({ ...bilibili$1 });
});
var TypedEventEmitter, amagiEvents, emitLog, emitNetworkRetry, emitNetworkError, emitApiSuccess, emitApiError, emitLogMark;
var init_events = __esmMin(() => {
	TypedEventEmitter = class extends EventEmitter {
		emit(event, data$1) {
			return super.emit(event, data$1);
		}
		on(event, listener) {
			return super.on(event, listener);
		}
		once(event, listener) {
			return super.once(event, listener);
		}
		off(event, listener) {
			return super.off(event, listener);
		}
	};
	amagiEvents = new TypedEventEmitter();
	emitLog = (level, message, ...args) => {
		amagiEvents.emit(`log:${level}`, {
			level,
			message,
			args: args.length > 0 ? args : void 0,
			timestamp: /* @__PURE__ */ new Date()
		});
	};
	emitNetworkRetry = (data$1) => {
		amagiEvents.emit("network:retry", {
			...data$1,
			timestamp: /* @__PURE__ */ new Date()
		});
	};
	emitNetworkError = (data$1) => {
		amagiEvents.emit("network:error", {
			...data$1,
			timestamp: /* @__PURE__ */ new Date()
		});
	};
	emitApiSuccess = (data$1) => {
		amagiEvents.emit("api:success", {
			...data$1,
			timestamp: /* @__PURE__ */ new Date()
		});
	};
	emitApiError = (data$1) => {
		amagiEvents.emit("api:error", {
			...data$1,
			timestamp: /* @__PURE__ */ new Date()
		});
	};
	emitLogMark = (message, ...args) => {
		emitLog("mark", message, ...args);
	};
});
function smartNumber(errorMessage, minValue = 1, isInteger = false) {
	if (isInteger) return zod_default.coerce.number({ error: errorMessage }).int({ error: `${errorMessage.replace("不能为空", "")}必须是整数，不能包含小数` }).min(minValue, { error: `${errorMessage.replace("不能为空", "")}必须大于等于${minValue}` });
	else return zod_default.coerce.number({ error: errorMessage }).min(minValue, { error: `${errorMessage.replace("不能为空", "")}必须大于等于${minValue}` });
}
var smartPositiveInteger, extractCreatorInfoFromHtml;
var init_utils$3 = __esmMin(() => {
	init_zod();
	smartPositiveInteger = (errorMessage) => smartNumber(errorMessage, 1, true);
	extractCreatorInfoFromHtml = (html) => {
		const match = html.match(/<script>window\.__INITIAL_STATE__=(.+)<\/script>/m);
		if (!match) return null;
		try {
			const jsonStr = match[1].replace(/:undefined/g, ":null");
			return JSON.parse(jsonStr)?.user?.userPageData ?? null;
		} catch (error) {
			console.error("解析用户信息失败:", error);
			return null;
		}
	};
});
var BilibiliVideoParamsSchema, BilibiliVideoDownloadParamsSchema, BilibiliCommentParamsSchema, BilibiliCommentReplyParamsSchema, BilibiliUserParamsSchema, BilibiliEmojiParamsSchema, BilibiliBangumiInfoParamsSchema, BilibiliBangumiStreamParamsSchema, BilibiliDynamicParamsSchema, BilibiliLiveParamsSchema, BilibiliLoginParamsSchema, BilibiliQrcodeParamsSchema, BilibiliQrcodeStatusParamsSchema, BilibiliAv2BvParamsSchema, BilibiliBv2AvParamsSchema, BilibiliArticleParamsSchema, BilibiliArticleCardParamsSchema, BilibiliArticleInfoParamsSchema, BilibiliColumnInfoParamsSchema, BilibiliApplyCaptchaParamsSchema, BilibiliValidateCaptchaParamsSchema, BilibiliDanmakuParamsSchema, BilibiliValidationSchemas, BilibiliMethodRoutes;
var init_bilibili$3 = __esmMin(() => {
	init_zod();
	init_utils$3();
	BilibiliVideoParamsSchema = zod_default.object({
		methodType: zod_default.literal("videoInfo", { error: "方法类型必须是\"videoInfo\"" }),
		bvid: zod_default.string({ error: "BVID必须是字符串" }).min(1, { error: "BVID不能为空" })
	});
	BilibiliVideoDownloadParamsSchema = zod_default.object({
		methodType: zod_default.literal("videoStream", { error: "方法类型必须是\"videoStream\"" }),
		avid: smartNumber("AVID不能为空", 1, true),
		cid: smartNumber("CID不能为空", 1, true)
	});
	BilibiliCommentParamsSchema = zod_default.object({
		methodType: zod_default.literal("comments", { error: "方法类型必须是\"comments\"" }),
		oid: zod_default.string({ error: "OID必须是字符串" }).min(1, { error: "OID不能为空" }),
		type: smartNumber("评论类型不能为空", 1, true).refine((val) => [
			1,
			2,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			20,
			21,
			22,
			33
		].includes(val), { error: "无效的评论区类型" }),
		number: zod_default.coerce.number({ error: "评论数量必须是数字" }).int({ error: "评论数量必须是整数" }).positive({ error: "评论数量必须是正数" }).default(20).optional(),
		pn: zod_default.coerce.number({ error: "页码必须是数字" }).int({ error: "页码必须是整数" }).positive({ error: "页码必须是正数" }).default(1).optional()
	});
	BilibiliCommentReplyParamsSchema = zod_default.object({
		methodType: zod_default.literal("commentReplies", { error: "方法类型必须是\"commentReplies\"" }),
		oid: zod_default.string({ error: "OID必须是字符串" }).min(1, { error: "OID不能为空" }),
		type: smartNumber("评论类型不能为空", 1, true).refine((val) => [
			1,
			2,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			14,
			15,
			16,
			17,
			18,
			19,
			20,
			21,
			22,
			33
		].includes(val), { error: "无效的评论区类型" }),
		root: zod_default.string({ error: "根评论ID必须是字符串" }).min(1, { error: "根评论ID不能为空" }),
		number: zod_default.coerce.number({ error: "评论数量必须是数字" }).int({ error: "评论数量必须是整数" }).positive({ error: "评论数量必须是正数" }).default(20).optional(),
		pn: zod_default.coerce.number({ error: "页码必须是数字" }).int({ error: "页码必须是整数" }).positive({ error: "页码必须是正数" }).default(1).optional()
	});
	BilibiliUserParamsSchema = zod_default.object({
		methodType: zod_default.enum([
			"userCard",
			"userDynamicList",
			"uploaderTotalViews",
			"userSpaceInfo"
		], { error: "方法类型必须是指定的枚举值之一" }),
		host_mid: smartNumber("UP主UID不能为空", 1, true)
	});
	BilibiliEmojiParamsSchema = zod_default.object({ methodType: zod_default.literal("emojiList", { error: "方法类型必须是\"emojiList\"" }) });
	BilibiliBangumiInfoParamsSchema = zod_default.object({
		methodType: zod_default.literal("bangumiInfo", { error: "方法类型必须是\"bangumiInfo\"" }),
		ep_id: zod_default.string({ error: "番剧EP ID必须是字符串" }).min(1, { error: "番剧EP ID不能为空" }).optional(),
		season_id: zod_default.string({ error: "番剧季度ID必须是字符串" }).optional()
	}).refine((data$1) => data$1.ep_id ?? data$1.season_id, {
		error: "ep_id 和 season_id 至少需要提供一个",
		path: ["ep_id"]
	});
	BilibiliBangumiStreamParamsSchema = zod_default.object({
		methodType: zod_default.literal("bangumiStream", { error: "方法类型必须是\"bangumiStream\"" }),
		cid: smartNumber("CID不能为空", 1, true),
		ep_id: zod_default.string({ error: "番剧EP ID必须是字符串" }).min(1, { error: "番剧EP ID不能为空" })
	});
	BilibiliDynamicParamsSchema = zod_default.object({
		methodType: zod_default.enum(["dynamicDetail", "dynamicCard"], { error: "方法类型必须是\"dynamicDetail\"或\"dynamicCard\"" }),
		dynamic_id: zod_default.string({ error: "动态ID必须是字符串" }).min(1, { error: "动态ID不能为空" })
	});
	BilibiliLiveParamsSchema = zod_default.object({
		methodType: zod_default.enum(["liveRoomInfo", "liveRoomInit"], { error: "方法类型必须是\"liveRoomInfo\"或\"liveRoomInit\"" }),
		room_id: zod_default.string({ error: "直播间ID必须是字符串" }).min(1, { error: "直播间ID不能为空" })
	});
	BilibiliLoginParamsSchema = zod_default.object({ methodType: zod_default.literal("loginStatus", { error: "方法类型必须是\"loginStatus\"" }) });
	BilibiliQrcodeParamsSchema = zod_default.object({ methodType: zod_default.literal("loginQrcode", { error: "方法类型必须是\"loginQrcode\"" }) });
	BilibiliQrcodeStatusParamsSchema = zod_default.object({
		methodType: zod_default.literal("qrcodeStatus", { error: "方法类型必须是\"qrcodeStatus\"" }),
		qrcode_key: zod_default.string({ error: "二维码key必须是字符串" }).min(1, { error: "二维码key不能为空" })
	});
	BilibiliAv2BvParamsSchema = zod_default.object({
		methodType: zod_default.literal("avToBv", { error: "方法类型必须是\"avToBv\"" }),
		avid: zod_default.coerce.number({ error: "AVID必须是数字" }).int({ error: "AVID必须是整数" }).positive({ error: "AVID必须是正数" })
	});
	BilibiliBv2AvParamsSchema = zod_default.object({
		methodType: zod_default.literal("bvToAv", { error: "方法类型必须是\"bvToAv\"" }),
		bvid: zod_default.string({ error: "BVID必须是字符串" }).min(1, { error: "BVID不能为空" })
	});
	BilibiliArticleParamsSchema = zod_default.object({
		methodType: zod_default.literal("articleContent", { error: "方法类型必须是\"articleContent\"" }),
		id: zod_default.string({ error: "专栏ID必须是字符串" }).min(1, { error: "专栏ID不能为空" })
	});
	BilibiliArticleCardParamsSchema = zod_default.object({
		methodType: zod_default.literal("articleCards", { error: "方法类型必须是\"articleCards\"" }),
		ids: zod_default.union([zod_default.array(zod_default.string({ error: "被查询的 id 列表必须是字符串数组" })).min(1, { error: "被查询的 id 列表不能为空" }), zod_default.string({ error: "被查询的 id 列表必须是字符串" }).min(1, { error: "被查询的 id 列表不能为空" })])
	});
	BilibiliArticleInfoParamsSchema = zod_default.object({
		methodType: zod_default.literal("articleInfo", { error: "方法类型必须是\"articleInfo\"" }),
		id: zod_default.string({ error: "专栏ID必须是字符串" }).min(1, { error: "专栏ID不能为空" })
	});
	BilibiliColumnInfoParamsSchema = zod_default.object({
		methodType: zod_default.literal("articleListInfo", { error: "方法类型必须是\"articleListInfo\"" }),
		id: zod_default.string({ error: "文集ID必须是字符串" }).min(1, { error: "文集ID不能为空" })
	});
	BilibiliApplyCaptchaParamsSchema = zod_default.object({
		methodType: zod_default.literal("captchaFromVoucher", { error: "方法类型必须是\"captchaFromVoucher\"" }),
		csrf: zod_default.string({ error: "CSRF Token必须是字符串" }).optional(),
		v_voucher: zod_default.string({ error: "验证码ID必须是字符串" }).min(1, { error: "验证码ID不能为空" })
	});
	BilibiliValidateCaptchaParamsSchema = zod_default.object({
		methodType: zod_default.literal("validateCaptcha", { error: "方法类型必须是\"validateCaptcha\"" }),
		csrf: zod_default.string({ error: "CSRF Token必须是字符串" }).optional(),
		challenge: zod_default.string({ error: "验证码challenge必须是字符串" }).min(1, { error: "验证码challenge不能为空" }),
		token: zod_default.string({ error: "验证码token必须是字符串" }).min(1, { error: "验证码token不能为空" }),
		validate: zod_default.string({ error: "验证码validate必须是字符串" }).min(1, { error: "验证码validate不能为空" }),
		seccode: zod_default.string({ error: "验证码seccode必须是字符串" }).min(1, { error: "验证码seccode不能为空" })
	});
	BilibiliDanmakuParamsSchema = zod_default.object({
		methodType: zod_default.literal("videoDanmaku", { error: "方法类型必须是\"videoDanmaku\"" }),
		cid: smartNumber("CID不能为空", 1, true),
		segment_index: zod_default.coerce.number({ error: "分段序号必须是数字" }).int({ error: "分段序号必须是整数" }).positive({ error: "分段序号必须是正数" }).default(1).optional()
	});
	BilibiliValidationSchemas = {
		videoInfo: BilibiliVideoParamsSchema,
		videoStream: BilibiliVideoDownloadParamsSchema,
		comments: BilibiliCommentParamsSchema,
		commentReplies: BilibiliCommentReplyParamsSchema,
		userCard: BilibiliUserParamsSchema,
		userDynamicList: BilibiliUserParamsSchema,
		userSpaceInfo: BilibiliUserParamsSchema,
		emojiList: BilibiliEmojiParamsSchema,
		bangumiInfo: BilibiliBangumiInfoParamsSchema,
		bangumiStream: BilibiliBangumiStreamParamsSchema,
		dynamicDetail: BilibiliDynamicParamsSchema,
		dynamicCard: BilibiliDynamicParamsSchema,
		liveRoomInfo: BilibiliLiveParamsSchema,
		liveRoomInit: BilibiliLiveParamsSchema,
		loginStatus: BilibiliLoginParamsSchema,
		loginQrcode: BilibiliQrcodeParamsSchema,
		qrcodeStatus: BilibiliQrcodeStatusParamsSchema,
		uploaderTotalViews: BilibiliUserParamsSchema,
		avToBv: BilibiliAv2BvParamsSchema,
		bvToAv: BilibiliBv2AvParamsSchema,
		articleContent: BilibiliArticleParamsSchema,
		articleCards: BilibiliArticleCardParamsSchema,
		articleInfo: BilibiliArticleInfoParamsSchema,
		articleListInfo: BilibiliColumnInfoParamsSchema,
		captchaFromVoucher: BilibiliApplyCaptchaParamsSchema,
		validateCaptcha: BilibiliValidateCaptchaParamsSchema,
		videoDanmaku: BilibiliDanmakuParamsSchema
	};
	BilibiliMethodRoutes = {
		videoInfo: "/fetch_one_video",
		videoStream: "/fetch_video_playurl",
		comments: "/fetch_work_comments",
		commentReplies: "/fetch_comment_reply",
		userCard: "/fetch_user_profile",
		userDynamicList: "/fetch_user_dynamic",
		userSpaceInfo: "/fetch_user_space_info",
		emojiList: "/fetch_emoji_list",
		bangumiInfo: "/fetch_bangumi_video_info",
		bangumiStream: "/fetch_bangumi_video_playurl",
		dynamicDetail: "/fetch_dynamic_info",
		dynamicCard: "/fetch_dynamic_card",
		liveRoomInfo: "/fetch_live_room_detail",
		liveRoomInit: "/fetch_liveroom_def",
		loginStatus: "/login_basic_info",
		loginQrcode: "/new_login_qrcode",
		qrcodeStatus: "/check_qrcode",
		uploaderTotalViews: "/fetch_user_full_view",
		avToBv: "/av_to_bv",
		bvToAv: "/bv_to_av",
		articleContent: "/fetch_article_content",
		articleCards: "/fetch_article_card",
		articleInfo: "/fetch_article_info",
		articleListInfo: "/fetch_column_info",
		captchaFromVoucher: "/apply_captcha",
		validateCaptcha: "/validate_captcha",
		videoDanmaku: "/fetch_danmaku"
	};
});
var DouyinWorkParamsSchema, DouyinCommentParamsSchema, DouyinHotWordsParamsSchema, DouyinSearchParamsSchema, DouyinCommentReplyParamsSchema, DouyinUserParamsSchema, DouyinUserListParamsSchema, DouyinMusicParamsSchema, DouyinLiveRoomParamsSchema, DouyinQrcodeParamsSchema, DouyinEmojiListParamsSchema, DouyinEmojiProParamsSchema, DouyinDanmakuParamsSchema, DouyinValidationSchemas, DouyinMethodRoutes;
var init_douyin$3 = __esmMin(() => {
	init_zod();
	init_utils$3();
	DouyinWorkParamsSchema = zod_default.object({
		methodType: zod_default.enum([
			"videoWork",
			"imageAlbumWork",
			"slidesWork",
			"parseWork",
			"textWork"
		], { error: "方法类型必须是指定的枚举值之一" }),
		aweme_id: zod_default.string({ error: "视频ID必须是字符串" }).min(1, { error: "视频ID不能为空" })
	});
	DouyinCommentParamsSchema = zod_default.object({
		methodType: zod_default.literal("comments", { error: "方法类型必须是\"comments\"" }),
		aweme_id: zod_default.string({ error: "视频ID必须是字符串" }).min(1, { error: "视频ID不能为空" }),
		number: smartPositiveInteger("评论数量必须是正整数").optional().default(50),
		cursor: zod_default.coerce.number({ error: "游标必须是数字" }).int({ error: "游标必须是整数" }).min(0, { error: "游标不能小于0" }).default(0).optional()
	});
	DouyinHotWordsParamsSchema = zod_default.object({
		methodType: zod_default.literal("suggestWords", { error: "方法类型必须是\"suggestWords\"" }),
		query: zod_default.string({ error: "搜索词必须是字符串" }).min(1, { error: "搜索词不能为空" })
	});
	DouyinSearchParamsSchema = zod_default.object({
		methodType: zod_default.literal("search", { error: "方法类型必须是\"search\"" }),
		query: zod_default.string({ error: "搜索词必须是字符串" }).min(1, { error: "搜索词不能为空" }),
		type: zod_default.enum([
			"general",
			"user",
			"video"
		], { error: "搜索类型必须是\"general\"、\"user\"或\"video\"" }).optional().default("general"),
		number: smartPositiveInteger("搜索数量必须是正整数").optional().default(10),
		search_id: zod_default.string({ error: "搜索ID必须是字符串" }).optional()
	});
	DouyinCommentReplyParamsSchema = zod_default.object({
		methodType: zod_default.literal("commentReplies", { error: "方法类型必须是\"commentReplies\"" }),
		aweme_id: zod_default.string({ error: "视频ID必须是字符串" }).min(1, { error: "视频ID不能为空" }),
		comment_id: zod_default.string({ error: "评论ID必须是字符串" }).min(1, { error: "评论ID不能为空" }),
		number: smartPositiveInteger("评论数量必须是正整数").optional().default(5),
		cursor: zod_default.coerce.number({ error: "游标必须是数字" }).int({ error: "游标必须是整数" }).min(0, { error: "游标不能小于0" }).default(0).optional()
	});
	DouyinUserParamsSchema = zod_default.object({
		methodType: zod_default.literal("userProfile", { error: "方法类型必须是\"userProfile\"" }),
		sec_uid: zod_default.string({ error: "用户ID必须是字符串" }).min(1, { error: "用户ID不能为空" })
	});
	DouyinUserListParamsSchema = zod_default.object({
		methodType: zod_default.enum([
			"userVideoList",
			"userFavoriteList",
			"userRecommendList"
		], { error: "方法类型必须是指定的枚举值之一" }),
		sec_uid: zod_default.string({ error: "用户ID必须是字符串" }).min(1, { error: "用户ID不能为空" }),
		number: smartPositiveInteger("获取数量必须是正整数").optional().default(18),
		max_cursor: zod_default.string({ error: "游标必须是字符串" }).optional()
	});
	DouyinMusicParamsSchema = zod_default.object({
		methodType: zod_default.literal("musicInfo", { error: "方法类型必须是\"musicInfo\"" }),
		music_id: zod_default.string({ error: "音乐ID必须是字符串" }).min(1, { error: "音乐ID不能为空" })
	});
	DouyinLiveRoomParamsSchema = zod_default.object({
		methodType: zod_default.literal("liveRoomInfo", { error: "方法类型必须是\"liveRoomInfo\"" }),
		web_rid: zod_default.string({ error: "直播间ID必须是字符串" }).min(1, { error: "直播间ID不能为空" }),
		room_id: zod_default.string({ error: "直播间ID必须是字符串" }).min(1, { error: "直播间ID不能为空" })
	});
	DouyinQrcodeParamsSchema = zod_default.object({
		methodType: zod_default.literal("loginQrcode", { error: "方法类型必须是\"loginQrcode\"" }),
		verify_fp: zod_default.string({ error: "fp指纹必须是字符串" }).min(1, { error: "fp指纹不能为空" })
	});
	DouyinEmojiListParamsSchema = zod_default.object({ methodType: zod_default.literal("emojiList", { error: "方法类型必须是\"emojiList\"" }) });
	DouyinEmojiProParamsSchema = zod_default.object({ methodType: zod_default.literal("dynamicEmojiList", { error: "方法类型必须是\"dynamicEmojiList\"" }) });
	DouyinDanmakuParamsSchema = zod_default.object({
		methodType: zod_default.literal("danmakuList", { error: "方法类型必须是\"danmakuList\"" }),
		aweme_id: zod_default.string({ error: "视频ID必须是字符串" }).min(1, { error: "视频ID不能为空" }),
		start_time: zod_default.coerce.number({ error: "开始时间必须是数字" }).int({ error: "开始时间必须是整数" }).min(0, { error: "开始时间不能小于0" }).optional(),
		end_time: zod_default.coerce.number({ error: "结束时间必须是数字" }).int({ error: "结束时间必须是整数" }).min(0, { error: "结束时间不能小于0" }).optional(),
		duration: zod_default.coerce.number({ error: "视频时长必须是数字" }).int({ error: "视频时长必须是整数" }).min(0, { error: "视频时长不能小于0" })
	}).refine((data$1) => {
		if (data$1.end_time !== void 0) return data$1.end_time <= data$1.duration;
		return true;
	}, {
		error: "获取弹幕区间的结束时间不能超过视频总时长",
		path: ["end_time"]
	}).refine((data$1) => {
		if (data$1.start_time !== void 0 && data$1.end_time !== void 0) return data$1.start_time < data$1.end_time;
		return true;
	}, {
		error: "获取弹幕区间的开始时间必须小于结束时间",
		path: ["start_time"]
	});
	DouyinValidationSchemas = {
		textWork: DouyinWorkParamsSchema,
		parseWork: DouyinWorkParamsSchema,
		videoWork: DouyinWorkParamsSchema,
		imageAlbumWork: DouyinWorkParamsSchema,
		slidesWork: DouyinWorkParamsSchema,
		comments: DouyinCommentParamsSchema,
		userProfile: DouyinUserParamsSchema,
		userVideoList: DouyinUserListParamsSchema,
		userFavoriteList: DouyinUserListParamsSchema,
		userRecommendList: DouyinUserListParamsSchema,
		suggestWords: DouyinHotWordsParamsSchema,
		search: DouyinSearchParamsSchema,
		musicInfo: DouyinMusicParamsSchema,
		liveRoomInfo: DouyinLiveRoomParamsSchema,
		loginQrcode: DouyinQrcodeParamsSchema,
		emojiList: DouyinEmojiListParamsSchema,
		dynamicEmojiList: DouyinEmojiProParamsSchema,
		commentReplies: DouyinCommentReplyParamsSchema,
		danmakuList: DouyinDanmakuParamsSchema
	};
	DouyinMethodRoutes = {
		parseWork: "/fetch_one_work",
		textWork: "/fetch_one_work",
		videoWork: "/fetch_one_work",
		imageAlbumWork: "/fetch_one_work",
		slidesWork: "/fetch_one_work",
		comments: "/fetch_work_comments",
		commentReplies: "/fetch_video_comment_replies",
		userProfile: "/fetch_user_info",
		userVideoList: "/fetch_user_post_videos",
		userFavoriteList: "/fetch_user_favorite_list",
		userRecommendList: "/fetch_user_recommend_list",
		search: "/fetch_search_info",
		suggestWords: "/fetch_suggest_words",
		musicInfo: "/fetch_music_work",
		emojiList: "/fetch_emoji_list",
		dynamicEmojiList: "/fetch_emoji_pro_list",
		liveRoomInfo: "/fetch_user_live_videos",
		danmakuList: "/fetch_work_danmaku",
		loginQrcode: "/fetch_login_qrcode"
	};
});
var KuaishouVideoParamsSchema, KuaishouCommentParamsSchema, KuaishouEmojiParamsSchema, KuaishouValidationSchemas, KuaishouMethodRoutes;
var init_kuaishou$2 = __esmMin(() => {
	init_zod();
	KuaishouVideoParamsSchema = zod_default.object({
		methodType: zod_default.literal("videoWork", { error: "methodType must be \"videoWork\"" }),
		photoId: zod_default.string({ error: "photoId must be a string" }).min(1, { error: "photoId cannot be empty" })
	});
	KuaishouCommentParamsSchema = zod_default.object({
		methodType: zod_default.literal("comments", { error: "methodType must be \"comments\"" }),
		photoId: zod_default.string({ error: "photoId must be a string" }).min(1, { error: "photoId cannot be empty" })
	});
	KuaishouEmojiParamsSchema = zod_default.object({ methodType: zod_default.literal("emojiList", { error: "methodType must be \"emojiList\"" }) });
	KuaishouValidationSchemas = {
		videoWork: KuaishouVideoParamsSchema,
		comments: KuaishouCommentParamsSchema,
		emojiList: KuaishouEmojiParamsSchema
	};
	KuaishouMethodRoutes = {
		videoWork: "/fetch_one_work",
		comments: "/fetch_work_comments",
		emojiList: "/fetch_emoji_list"
	};
});
var xiaohongshuSign;
var init_sign$1 = __esmMin(() => {
	init_dist();
	xiaohongshuSign = class {
		static client = new Xhshow();
		static generateXSGet(path$1, a1Cookie, clientType = "xhs-pc-web", params = {}) {
			return this.client.signXsGet(path$1, a1Cookie, clientType, params);
		}
		static generateXSPost(path$1, a1Cookie, clientType = "xhs-pc-web", body = {}) {
			return this.client.signXsPost(path$1, a1Cookie, clientType, body);
		}
		static generateXSCommon(cookies) {
			return this.client.signXsCommon(cookies);
		}
		static generateXT() {
			return this.client.getXT();
		}
		static generateXB3Traceid() {
			return this.client.getB3TraceId();
		}
		static extractA1FromCookie(cookieString) {
			const match = cookieString.match(/a1=([^;]+)/);
			return match ? match[1] : "";
		}
		static getSearchId = () => (BigInt(Date.now()) << 64n) + BigInt(Math.floor(Math.random() * 2147483646)).toString(36);
	};
});
var SearchSortType, SearchNoteType, buildQueryString$1, xiaohongshuApiUrls, createXiaohongshuApiUrls;
var init_API$2 = __esmMin(() => {
	init_sign$1();
	SearchSortType = function(SearchSortType$1) {
		SearchSortType$1["GENERAL"] = "general";
		SearchSortType$1["MOST_POPULAR"] = "popularity_descending";
		SearchSortType$1["LATEST"] = "time_descending";
		return SearchSortType$1;
	}({});
	SearchNoteType = function(SearchNoteType$1) {
		SearchNoteType$1[SearchNoteType$1["ALL"] = 0] = "ALL";
		SearchNoteType$1[SearchNoteType$1["VIDEO"] = 1] = "VIDEO";
		SearchNoteType$1[SearchNoteType$1["IMAGE"] = 2] = "IMAGE";
		return SearchNoteType$1;
	}({});
	buildQueryString$1 = (params) => Object.entries(params).filter(([_$1, value]) => value !== void 0 && value !== null).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
	xiaohongshuApiUrls = {
		homeFeed(data$1 = {}) {
			return {
				apiPath: "/api/sns/web/v1/homefeed",
				Url: "https://edith.xiaohongshu.com/api/sns/web/v1/homefeed",
				Body: {
					cursor_score: data$1.cursor_score ?? "1.7599348899670024E9",
					num: data$1.num ?? 33,
					refresh_type: data$1.refresh_type ?? 3,
					note_index: data$1.note_index ?? 33,
					category: data$1.category ?? "homefeed_recommend",
					search_key: data$1.search_key ?? "",
					image_formats: [
						"jpg",
						"webp",
						"avif"
					]
				}
			};
		},
		noteDetail(data$1) {
			return {
				apiPath: "/api/sns/web/v1/feed",
				Url: "https://edith.xiaohongshu.com/api/sns/web/v1/feed",
				Body: {
					source_note_id: data$1.note_id,
					image_formats: [
						"jpg",
						"webp",
						"avif"
					],
					extra: { need_body_topic: "1" },
					xsec_source: "pc_feed",
					xsec_token: data$1.xsec_token
				}
			};
		},
		noteComments(data$1) {
			return {
				apiPath: "/api/sns/web/v2/comment/page",
				Url: `https://edith.xiaohongshu.com/api/sns/web/v2/comment/page?${buildQueryString$1({
					note_id: data$1.note_id,
					cursor: data$1.cursor ?? "",
					image_formats: [
						"jpg",
						"webp",
						"avif"
					].join(","),
					xsec_token: data$1.xsec_token
				})}`
			};
		},
		userProfile(data$1) {
			return {
				apiPath: "/api/sns/web/v1/user/otherinfo",
				Url: `https://www.xiaohongshu.com/user/profile/${data$1.user_id}`
			};
		},
		userNoteList(data$1) {
			return {
				apiPath: "/api/sns/web/v1/user_posted",
				Url: `https://edith.xiaohongshu.com/api/sns/web/v1/user_posted?${buildQueryString$1({
					user_id: data$1.user_id,
					cursor: data$1.cursor ?? "",
					num: data$1.num ?? 30,
					image_formats: [
						"jpg",
						"webp",
						"avif"
					].join(","),
					xsec_source: "pc_feed"
				})}`
			};
		},
		emojiList(data$1) {
			return {
				apiPath: "/api/im/redmoji/detail",
				Url: "https://edith.xiaohongshu.com/api/im/redmoji/detail"
			};
		},
		searchNotes(data$1) {
			return {
				apiPath: "/api/sns/web/v1/search/notes",
				Body: {
					keyword: data$1.keyword,
					page: data$1.page ?? 1,
					page_size: data$1.page_size ?? 20,
					sort: SearchSortType.GENERAL,
					note_type: SearchNoteType.ALL,
					search_id: xiaohongshuSign.getSearchId(),
					image_formats: [
						"jpg",
						"webp",
						"avif"
					]
				},
				Url: "https://edith.xiaohongshu.com/api/sns/web/v1/search/notes"
			};
		}
	};
	createXiaohongshuApiUrls = () => xiaohongshuApiUrls;
});
var SearchSortTypeValues, SearchNoteTypeValues, HomeFeedParamsSchema, NoteParamsSchema, CommentParamsSchema, UserParamsSchema, UserNoteParamsSchema, EmojiListParamsSchema, SearchNoteParamsSchema, XiaohongshuValidationSchemas, XiaohongshuMethodRoutes;
var init_xiaohongshu$2 = __esmMin(() => {
	init_API$2();
	init_zod();
	SearchSortTypeValues = Object.values(SearchSortType).filter((v) => typeof v === "string");
	SearchNoteTypeValues = Object.values(SearchNoteType).filter((v) => typeof v === "number");
	HomeFeedParamsSchema = zod_default.object({
		methodType: zod_default.literal("homeFeed", { error: "methodType must be \"homeFeed\"" }),
		cursor_score: zod_default.string({ error: "cursor_score must be a string" }).optional(),
		num: zod_default.coerce.number({ error: "num must be a number" }).int({ error: "num must be an integer" }).min(1, { error: "num cannot be less than 1" }).max(100, { error: "num cannot be greater than 100" }).optional(),
		refresh_type: zod_default.coerce.number({ error: "refresh_type must be a number" }).int({ error: "refresh_type must be an integer" }).optional(),
		note_index: zod_default.coerce.number({ error: "note_index must be a number" }).int({ error: "note_index must be an integer" }).optional(),
		category: zod_default.string({ error: "category must be a string" }).optional(),
		search_key: zod_default.string({ error: "search_key must be a string" }).optional()
	});
	NoteParamsSchema = zod_default.object({
		methodType: zod_default.literal("noteDetail", { error: "methodType must be \"noteDetail\"" }),
		note_id: zod_default.string({ error: "note_id must be a string" }),
		xsec_token: zod_default.string({ error: "xsec_token must be a string" })
	});
	CommentParamsSchema = zod_default.object({
		methodType: zod_default.literal("noteComments", { error: "methodType must be \"noteComments\"" }),
		note_id: zod_default.string({ error: "note_id must be a string" }),
		cursor: zod_default.string({ error: "cursor must be a string" }).optional(),
		xsec_token: zod_default.string({ error: "xsec_token must be a string" })
	});
	UserParamsSchema = zod_default.object({
		methodType: zod_default.literal("userProfile", { error: "methodType must be \"userProfile\"" }),
		user_id: zod_default.string({ error: "user_id must be a string" })
	});
	UserNoteParamsSchema = zod_default.object({
		methodType: zod_default.literal("userNoteList", { error: "methodType must be \"userNoteList\"" }),
		user_id: zod_default.string({ error: "user_id must be a string" }),
		cursor: zod_default.string({ error: "cursor must be a string" }).optional(),
		num: zod_default.coerce.number({ error: "num must be a number" }).int({ error: "num must be an integer" }).min(1, { error: "num cannot be less than 1" }).max(100, { error: "num cannot be greater than 100" }).optional()
	});
	EmojiListParamsSchema = zod_default.object({ methodType: zod_default.literal("emojiList", { error: "methodType must be \"emojiList\"" }) });
	SearchNoteParamsSchema = zod_default.object({
		methodType: zod_default.literal("searchNotes", { error: "methodType must be \"searchNotes\"" }),
		keyword: zod_default.string({ error: "keyword must be a string" }),
		page: zod_default.coerce.number({ error: "page must be a number" }).int({ error: "page must be an integer" }).min(1, { error: "page cannot be less than 1" }).optional(),
		page_size: zod_default.coerce.number({ error: "page_size must be a number" }).int({ error: "page_size must be an integer" }).min(1, { error: "page_size cannot be less than 1" }).max(100, { error: "page_size cannot be greater than 100" }).optional(),
		sort: zod_default.enum(SearchSortTypeValues, { error: "Invalid sort type" }).optional(),
		note_type: zod_default.coerce.number({ error: "note_type must be a number" }).int({ error: "note_type must be an integer" }).refine((val) => SearchNoteTypeValues.includes(val), { message: "Invalid note type" }).optional()
	});
	XiaohongshuValidationSchemas = {
		homeFeed: HomeFeedParamsSchema,
		noteDetail: NoteParamsSchema,
		noteComments: CommentParamsSchema,
		userProfile: UserParamsSchema,
		userNoteList: UserNoteParamsSchema,
		emojiList: EmojiListParamsSchema,
		searchNotes: SearchNoteParamsSchema
	};
	XiaohongshuMethodRoutes = {
		homeFeed: "/fetch_home_feed",
		noteDetail: "/fetch_one_note",
		noteComments: "/fetch_note_comments",
		userProfile: "/fetch_user_profile",
		userNoteList: "/fetch_user_notes",
		emojiList: "/fetch_emoji_list",
		searchNotes: "/fetch_search_notes"
	};
});
var validateDouyinParams, validateBilibiliParams, validateKuaishouParams, validateXiaohongshuParams, createSuccessResponse$1, createErrorResponse;
var init_validation$1 = __esmMin(() => {
	init_bilibili$3();
	init_douyin$3();
	init_kuaishou$2();
	init_xiaohongshu$2();
	init_bilibili$3();
	init_douyin$3();
	init_kuaishou$2();
	init_xiaohongshu$2();
	validateDouyinParams = (methodType, params) => DouyinValidationSchemas[methodType].parse(typeof params === "object" && params !== null ? {
		methodType,
		...params
	} : {
		methodType,
		params
	});
	validateBilibiliParams = (methodType, params) => BilibiliValidationSchemas[methodType].parse(typeof params === "object" && params !== null ? {
		methodType,
		...params
	} : {
		methodType,
		params
	});
	validateKuaishouParams = (methodType, params) => KuaishouValidationSchemas[methodType].parse(typeof params === "object" && params !== null ? {
		methodType,
		...params
	} : {
		methodType,
		params
	});
	validateXiaohongshuParams = (methodType, params) => XiaohongshuValidationSchemas[methodType].parse(typeof params === "object" && params !== null ? {
		methodType,
		...params
	} : {
		methodType,
		params
	});
	createSuccessResponse$1 = (data$1, message, code = 200) => ({
		success: true,
		data: data$1,
		message,
		code,
		error: void 0
	});
	createErrorResponse = (error, message, code = 500, data$1) => ({
		success: false,
		error,
		message,
		code,
		data: data$1
	});
});
async function fetchBilibiliInternal(methodType, options, config$1) {
	const startTime = Date.now();
	try {
		const rawData = await fetchBilibili({ ...validateBilibiliParams(methodType, options) }, config$1.cookie, config$1.requestConfig);
		const duration = Date.now() - startTime;
		if (rawData.code !== 0) {
			emitApiError({
				platform: "bilibili",
				methodType,
				errorCode: rawData.code,
				errorMessage: "B站数据获取失败",
				url: void 0,
				duration
			});
			return createErrorResponse(rawData.amagiError, "B站数据获取失败", rawData.code, rawData.data);
		}
		const result = createSuccessResponse$1(rawData, "获取成功", 200);
		emitApiSuccess({
			platform: "bilibili",
			methodType,
			response: result,
			statusCode: 200,
			duration
		});
		return result;
	} catch (error) {
		const duration = Date.now() - startTime;
		const errorMessage = error instanceof Error ? error.message : "未知错误";
		emitApiError({
			platform: "bilibili",
			methodType,
			errorMessage,
			duration
		});
		throw new Error(`B站数据获取失败: ${errorMessage}`);
	}
}
var init_internal$3 = __esmMin(() => {
	init_events();
	init_validation$1();
	init_getdata();
});
async function fetchArticleContent(options, cookie, requestConfig) {
	return fetchBilibiliInternal("articleContent", options, {
		cookie,
		requestConfig
	});
}
async function fetchArticleCards(options, cookie, requestConfig) {
	return fetchBilibiliInternal("articleCards", options, {
		cookie,
		requestConfig
	});
}
async function fetchArticleInfo(options, cookie, requestConfig) {
	return fetchBilibiliInternal("articleInfo", options, {
		cookie,
		requestConfig
	});
}
async function fetchArticleListInfo(options, cookie, requestConfig) {
	return fetchBilibiliInternal("articleListInfo", options, {
		cookie,
		requestConfig
	});
}
var init_article = __esmMin(() => {
	init_internal$3();
});
async function fetchLoginStatus(options, cookie, requestConfig) {
	return fetchBilibiliInternal("loginStatus", {}, {
		cookie,
		requestConfig
	});
}
async function requestLoginQrcode$1(options, cookie, requestConfig) {
	return fetchBilibiliInternal("loginQrcode", {}, {
		cookie,
		requestConfig
	});
}
async function checkQrcodeStatus(options, cookie, requestConfig) {
	return fetchBilibiliInternal("qrcodeStatus", options, {
		cookie,
		requestConfig
	});
}
async function requestCaptchaFromVoucher(options, cookie, requestConfig) {
	return fetchBilibiliInternal("captchaFromVoucher", options, {
		cookie,
		requestConfig
	});
}
async function validateCaptchaResult(options, cookie, requestConfig) {
	return fetchBilibiliInternal("validateCaptcha", options, {
		cookie,
		requestConfig
	});
}
var init_auth$1 = __esmMin(() => {
	init_internal$3();
});
async function fetchBangumiInfo(options, cookie, requestConfig) {
	return fetchBilibiliInternal("bangumiInfo", options, {
		cookie,
		requestConfig
	});
}
async function fetchBangumiStreamUrl(options, cookie, requestConfig) {
	return fetchBilibiliInternal("bangumiStream", options, {
		cookie,
		requestConfig
	});
}
var init_bangumi = __esmMin(() => {
	init_internal$3();
});
async function fetchComments(options, cookie, requestConfig) {
	return fetchBilibiliInternal("comments", options, {
		cookie,
		requestConfig
	});
}
async function fetchCommentReplies$1(options, cookie, requestConfig) {
	return fetchBilibiliInternal("commentReplies", options, {
		cookie,
		requestConfig
	});
}
var init_comment$1 = __esmMin(() => {
	init_internal$3();
});
async function fetchDynamicDetail(options, cookie, requestConfig) {
	return fetchBilibiliInternal("dynamicDetail", options, {
		cookie,
		requestConfig
	});
}
async function fetchDynamicCard(options, cookie, requestConfig) {
	return fetchBilibiliInternal("dynamicCard", options, {
		cookie,
		requestConfig
	});
}
var init_dynamic = __esmMin(() => {
	init_internal$3();
});
async function fetchLiveRoomInfo$1(options, cookie, requestConfig) {
	return fetchBilibiliInternal("liveRoomInfo", options, {
		cookie,
		requestConfig
	});
}
async function fetchLiveRoomInitInfo(options, cookie, requestConfig) {
	return fetchBilibiliInternal("liveRoomInit", options, {
		cookie,
		requestConfig
	});
}
var init_live = __esmMin(() => {
	init_internal$3();
});
async function fetchUserCard(options, cookie, requestConfig) {
	return fetchBilibiliInternal("userCard", options, {
		cookie,
		requestConfig
	});
}
async function fetchUserDynamicList(options, cookie, requestConfig) {
	return fetchBilibiliInternal("userDynamicList", options, {
		cookie,
		requestConfig
	});
}
async function fetchUserSpaceInfo(options, cookie, requestConfig) {
	return fetchBilibiliInternal("userSpaceInfo", options, {
		cookie,
		requestConfig
	});
}
async function fetchUploaderTotalViews(options, cookie, requestConfig) {
	return fetchBilibiliInternal("uploaderTotalViews", options, {
		cookie,
		requestConfig
	});
}
var init_user$2 = __esmMin(() => {
	init_internal$3();
});
async function convertAvToBv(options, cookie, requestConfig) {
	return fetchBilibiliInternal("avToBv", options, {
		cookie,
		requestConfig
	});
}
async function convertBvToAv(options, cookie, requestConfig) {
	return fetchBilibiliInternal("bvToAv", options, {
		cookie,
		requestConfig
	});
}
async function fetchEmojiList$3(options, cookie, requestConfig) {
	return fetchBilibiliInternal("emojiList", {}, {
		cookie,
		requestConfig
	});
}
var init_utils$2 = __esmMin(() => {
	init_internal$3();
});
async function fetchVideoInfo(options, cookie, requestConfig) {
	return fetchBilibiliInternal("videoInfo", options, {
		cookie,
		requestConfig
	});
}
async function fetchVideoStreamUrl(options, cookie, requestConfig) {
	return fetchBilibiliInternal("videoStream", options, {
		cookie,
		requestConfig
	});
}
async function fetchVideoDanmaku(options, cookie, requestConfig) {
	return fetchBilibiliInternal("videoDanmaku", options, {
		cookie,
		requestConfig
	});
}
var init_video$2 = __esmMin(() => {
	init_internal$3();
});
function createBoundBilibiliFetcher(cookie, requestConfig) {
	return {
		fetchVideoInfo: (options) => fetchVideoInfo(options, cookie, requestConfig),
		fetchVideoStreamUrl: (options) => fetchVideoStreamUrl(options, cookie, requestConfig),
		fetchVideoDanmaku: (options) => fetchVideoDanmaku(options, cookie, requestConfig),
		fetchComments: (options) => fetchComments(options, cookie, requestConfig),
		fetchCommentReplies: (options) => fetchCommentReplies$1(options, cookie, requestConfig),
		fetchUserCard: (options) => fetchUserCard(options, cookie, requestConfig),
		fetchUserDynamicList: (options) => fetchUserDynamicList(options, cookie, requestConfig),
		fetchUserSpaceInfo: (options) => fetchUserSpaceInfo(options, cookie, requestConfig),
		fetchUploaderTotalViews: (options) => fetchUploaderTotalViews(options, cookie, requestConfig),
		fetchDynamicDetail: (options) => fetchDynamicDetail(options, cookie, requestConfig),
		fetchDynamicCard: (options) => fetchDynamicCard(options, cookie, requestConfig),
		fetchBangumiInfo: (options) => fetchBangumiInfo(options, cookie, requestConfig),
		fetchBangumiStreamUrl: (options) => fetchBangumiStreamUrl(options, cookie, requestConfig),
		fetchLiveRoomInfo: (options) => fetchLiveRoomInfo$1(options, cookie, requestConfig),
		fetchLiveRoomInitInfo: (options) => fetchLiveRoomInitInfo(options, cookie, requestConfig),
		fetchArticleContent: (options) => fetchArticleContent(options, cookie, requestConfig),
		fetchArticleCards: (options) => fetchArticleCards(options, cookie, requestConfig),
		fetchArticleInfo: (options) => fetchArticleInfo(options, cookie, requestConfig),
		fetchArticleListInfo: (options) => fetchArticleListInfo(options, cookie, requestConfig),
		fetchLoginStatus: (options) => fetchLoginStatus(options, cookie, requestConfig),
		requestLoginQrcode: (options) => requestLoginQrcode$1(options, cookie, requestConfig),
		checkQrcodeStatus: (options) => checkQrcodeStatus(options, cookie, requestConfig),
		requestCaptchaFromVoucher: (options) => requestCaptchaFromVoucher(options, cookie, requestConfig),
		validateCaptchaResult: (options) => validateCaptchaResult(options, cookie, requestConfig),
		convertAvToBv: (options) => convertAvToBv(options, cookie, requestConfig),
		convertBvToAv: (options) => convertBvToAv(options, cookie, requestConfig),
		fetchEmojiList: (options) => fetchEmojiList$3(options, cookie, requestConfig)
	};
}
var init_bound$1 = __esmMin(() => {
	init_article();
	init_auth$1();
	init_bangumi();
	init_comment$1();
	init_dynamic();
	init_live();
	init_user$2();
	init_utils$2();
	init_video$2();
});
var bilibiliFetcher$1;
var init_bilibili$2 = __esmMin(() => {
	init_article();
	init_auth$1();
	init_bangumi();
	init_comment$1();
	init_dynamic();
	init_live();
	init_user$2();
	init_utils$2();
	init_video$2();
	init_article();
	init_auth$1();
	init_bangumi();
	init_comment$1();
	init_dynamic();
	init_live();
	init_user$2();
	init_utils$2();
	init_video$2();
	init_bound$1();
	bilibiliFetcher$1 = {
		fetchVideoInfo,
		fetchVideoStreamUrl,
		fetchVideoDanmaku,
		fetchComments,
		fetchCommentReplies: fetchCommentReplies$1,
		fetchUserCard,
		fetchUserDynamicList,
		fetchUserSpaceInfo,
		fetchUploaderTotalViews,
		fetchDynamicDetail,
		fetchDynamicCard,
		fetchBangumiInfo,
		fetchBangumiStreamUrl,
		fetchLiveRoomInfo: fetchLiveRoomInfo$1,
		fetchLiveRoomInitInfo,
		fetchArticleContent,
		fetchArticleCards,
		fetchArticleInfo,
		fetchArticleListInfo,
		fetchLoginStatus,
		requestLoginQrcode: requestLoginQrcode$1,
		checkQrcodeStatus,
		requestCaptchaFromVoucher,
		validateCaptchaResult,
		convertAvToBv,
		convertBvToAv,
		fetchEmojiList: fetchEmojiList$3
	};
});
var generateSecChUa, getDouyinDefaultConfig, getBilibiliDefaultConfig, getKuaishouDefaultConfig, getXiaohongshuDefaultConfig;
var init_defaultConfigs = __esmMin(() => {
	generateSecChUa = (userAgent) => {
		const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
		const chromeVersion = chromeMatch ? chromeMatch[1] : "125";
		return `"Not_A Brand";v="99", "Chromium";v="${chromeVersion}", "Google Chrome";v="${chromeVersion}"`;
	};
	getDouyinDefaultConfig = (cookie, requestConfig) => {
		let finalUserAgent = requestConfig?.headers?.["User-Agent"] ?? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";
		finalUserAgent = finalUserAgent.replace(/\s+Edg\/[\d\.]+/g, "");
		const defHeaders = {
			Accept: "application/json, text/plain, */*",
			"Accept-Encoding": "gzip, deflate, br, zstd",
			"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
			Cookie: cookie?.trim() ?? "",
			Priority: "u=1, i",
			Referer: "https://www.douyin.com/",
			"Sec-Ch-Ua": generateSecChUa(finalUserAgent),
			"Sec-Ch-Ua-Mobile": "?0",
			"Sec-Ch-Ua-Platform": "\"Windows\"",
			"Sec-Fetch-Dest": "empty",
			"Sec-Fetch-Mode": "cors",
			"Sec-Fetch-Site": "same-origin",
			"User-Agent": finalUserAgent
		};
		return {
			method: "GET",
			timeout: 1e4,
			...requestConfig,
			headers: {
				...defHeaders,
				...requestConfig?.headers ?? {}
			}
		};
	};
	getBilibiliDefaultConfig = (cookie, requestConfig) => {
		let finalUserAgent = requestConfig?.headers?.["User-Agent"] ?? "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36";
		finalUserAgent = finalUserAgent.replace(/\s+Edg\/[\d.]+/g, "");
		const defHeaders = {
			Accept: "application/json, text/plain, */*",
			"Accept-Language": "zh-CN,zh;q=0.9",
			"Accept-Encoding": "gzip, deflate, br, zstd",
			"Cache-Control": "no-cache",
			Pragma: "no-cache",
			Referer: "https://www.bilibili.com/",
			Priority: "u=1, i",
			"Sec-Ch-Ua": generateSecChUa(finalUserAgent),
			"Sec-Ch-Ua-Mobile": "?0",
			"Sec-Ch-Ua-Platform": "\"Windows\"",
			"Sec-Fetch-Dest": "empty",
			"Sec-Fetch-Mode": "cors",
			"Sec-Fetch-Site": "same-site",
			"User-Agent": finalUserAgent,
			Cookie: cookie?.trim() ?? ""
		};
		return {
			method: "GET",
			timeout: 1e4,
			...requestConfig,
			headers: {
				...defHeaders,
				...requestConfig?.headers ?? {}
			}
		};
	};
	getKuaishouDefaultConfig = (cookie, requestConfig) => {
		const defHeaders = {
			Referer: "https://www.kuaishou.com/new-reco",
			Origin: "https://www.kuaishou.com",
			Accept: "application/json, text/plain, */*",
			"Accept-Encoding": "gzip, deflate, br, zstd",
			"Content-Type": "application/json",
			"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
			Priority: "u=0, i",
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0",
			Cookie: cookie?.trim() ?? ""
		};
		return {
			method: "POST",
			timeout: 1e4,
			...requestConfig,
			headers: {
				...defHeaders,
				...requestConfig?.headers ?? {}
			}
		};
	};
	getXiaohongshuDefaultConfig = (cookie) => ({ headers: {
		accept: "application/json, text/plain, */*",
		"accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
		"cache-control": "no-cache",
		"content-type": "application/json;charset=UTF-8",
		pragma: "no-cache",
		priority: "u=1, i",
		referer: "https://www.xiaohongshu.com/",
		"sec-ch-ua": "\"Microsoft Edge\";v=\"141\", \"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"141\"",
		"sec-ch-ua-mobile": "?0",
		"sec-ch-ua-platform": "\"Windows\"",
		"sec-fetch-dest": "empty",
		"sec-fetch-mode": "cors",
		"sec-fetch-site": "same-site",
		"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0",
		cookie: cookie ?? ""
	} });
});
var amagiAPIErrorCode, douoyinAPIErrorCode, bilibiliAPIErrorCode, kuaishouAPIErrorCode, xiaohongshuAPIErrorCode;
var init_NetworksConfigType = __esmMin(() => {
	amagiAPIErrorCode = function(amagiAPIErrorCode$1) {
		amagiAPIErrorCode$1["UNKNOWN"] = "UNKNOWN_ERROR";
		return amagiAPIErrorCode$1;
	}({});
	douoyinAPIErrorCode = function(douoyinAPIErrorCode$1) {
		douoyinAPIErrorCode$1["COOKIE"] = "INVALID_COOKIE";
		douoyinAPIErrorCode$1["FILTER"] = "CONTENT_FILTERED";
		douoyinAPIErrorCode$1["NOT_LIVE"] = "USER_NOT_LIVE";
		douoyinAPIErrorCode$1["UNKNOWN"] = "UNKNOWN_ERROR";
		return douoyinAPIErrorCode$1;
	}({});
	bilibiliAPIErrorCode = function(bilibiliAPIErrorCode$1) {
		bilibiliAPIErrorCode$1["APP_NOT_FOUND"] = "-1";
		bilibiliAPIErrorCode$1["ACCESS_KEY_ERROR"] = "-2";
		bilibiliAPIErrorCode$1["API_KEY_ERROR"] = "-3";
		bilibiliAPIErrorCode$1["METHOD_NOT_PERMITTED"] = "-4";
		bilibiliAPIErrorCode$1["NOT_LOGGED_IN"] = "-101";
		bilibiliAPIErrorCode$1["ACCOUNT_BANNED"] = "-102";
		bilibiliAPIErrorCode$1["POINTS_INSUFFICIENT"] = "-103";
		bilibiliAPIErrorCode$1["COINS_INSUFFICIENT"] = "-104";
		bilibiliAPIErrorCode$1["CAPTCHA_ERROR"] = "-105";
		bilibiliAPIErrorCode$1["MEMBERSHIP_LIMITED"] = "-106";
		bilibiliAPIErrorCode$1["APP_BANNED"] = "-107";
		bilibiliAPIErrorCode$1["PHONE_NOT_BOUND"] = "-108";
		bilibiliAPIErrorCode$1["PHONE_NOT_BOUND_2"] = "-110";
		bilibiliAPIErrorCode$1["CSRF_ERROR"] = "-111";
		bilibiliAPIErrorCode$1["SYSTEM_UPDATING"] = "-112";
		bilibiliAPIErrorCode$1["NOT_REAL_NAME_VERIFIED"] = "-113";
		bilibiliAPIErrorCode$1["NEED_BIND_PHONE"] = "-114";
		bilibiliAPIErrorCode$1["NEED_REAL_NAME_VERIFICATION"] = "-115";
		bilibiliAPIErrorCode$1["NO_CHANGE"] = "-304";
		bilibiliAPIErrorCode$1["CONFLICT_REDIRECT"] = "-307";
		bilibiliAPIErrorCode$1["RISK_CONTROL_FAILED"] = "-352";
		bilibiliAPIErrorCode$1["BAD_REQUEST"] = "-400";
		bilibiliAPIErrorCode$1["UNAUTHORIZED"] = "-401";
		bilibiliAPIErrorCode$1["FORBIDDEN"] = "-403";
		bilibiliAPIErrorCode$1["NOT_FOUND"] = "-404";
		bilibiliAPIErrorCode$1["METHOD_NOT_ALLOWED"] = "-405";
		bilibiliAPIErrorCode$1["CONFLICT"] = "-409";
		bilibiliAPIErrorCode$1["IP_BLOCKED"] = "-412";
		bilibiliAPIErrorCode$1["SERVER_ERROR"] = "-500";
		bilibiliAPIErrorCode$1["SERVICE_UNAVAILABLE"] = "-503";
		bilibiliAPIErrorCode$1["GATEWAY_TIMEOUT"] = "-504";
		bilibiliAPIErrorCode$1["RATE_LIMITED"] = "-509";
		bilibiliAPIErrorCode$1["FILE_NOT_FOUND"] = "-616";
		bilibiliAPIErrorCode$1["FILE_TOO_LARGE"] = "-617";
		bilibiliAPIErrorCode$1["LOGIN_ATTEMPTS_EXCEEDED"] = "-625";
		bilibiliAPIErrorCode$1["USER_NOT_FOUND"] = "-626";
		bilibiliAPIErrorCode$1["WEAK_PASSWORD"] = "-628";
		bilibiliAPIErrorCode$1["INVALID_CREDENTIALS"] = "-629";
		bilibiliAPIErrorCode$1["OBJECT_LIMIT_EXCEEDED"] = "-632";
		bilibiliAPIErrorCode$1["ACCOUNT_LOCKED"] = "-643";
		bilibiliAPIErrorCode$1["USER_LEVEL_TOO_LOW"] = "-650";
		bilibiliAPIErrorCode$1["DUPLICATE_USER"] = "-652";
		bilibiliAPIErrorCode$1["TOKEN_EXPIRED"] = "-658";
		bilibiliAPIErrorCode$1["PASSWORD_TIMESTAMP_EXPIRED"] = "-662";
		bilibiliAPIErrorCode$1["GEO_RESTRICTED"] = "-688";
		bilibiliAPIErrorCode$1["COPYRIGHT_RESTRICTED"] = "-689";
		bilibiliAPIErrorCode$1["REPUTATION_DEDUCTION_FAILED"] = "-701";
		bilibiliAPIErrorCode$1["TOO_MANY_REQUESTS"] = "-799";
		bilibiliAPIErrorCode$1["SERVER_TEMPORARILY_UNAVAILABLE"] = "-8888";
		bilibiliAPIErrorCode$1["UNKNOWN"] = "UNKNOWN";
		return bilibiliAPIErrorCode$1;
	}({});
	kuaishouAPIErrorCode = function(kuaishouAPIErrorCode$1) {
		kuaishouAPIErrorCode$1["COOKIE"] = "INVALID_COOKIE";
		kuaishouAPIErrorCode$1["UNKNOWN"] = "UNKNOWN_ERROR";
		return kuaishouAPIErrorCode$1;
	}({});
	xiaohongshuAPIErrorCode = function(xiaohongshuAPIErrorCode$1) {
		xiaohongshuAPIErrorCode$1["COOKIE"] = "INVALID_COOKIE";
		xiaohongshuAPIErrorCode$1["UNKNOWN"] = "UNKNOWN_ERROR";
		xiaohongshuAPIErrorCode$1[xiaohongshuAPIErrorCode$1["ILLEGAL_REQUEST"] = 500] = "ILLEGAL_REQUEST";
		xiaohongshuAPIErrorCode$1[xiaohongshuAPIErrorCode$1["ACCOUNT_ABNORMAL"] = 300011] = "ACCOUNT_ABNORMAL";
		xiaohongshuAPIErrorCode$1[xiaohongshuAPIErrorCode$1["NETWORK_ERROR"] = 300012] = "NETWORK_ERROR";
		xiaohongshuAPIErrorCode$1[xiaohongshuAPIErrorCode$1["FREQUENCY_ERROR"] = 300013] = "FREQUENCY_ERROR";
		xiaohongshuAPIErrorCode$1[xiaohongshuAPIErrorCode$1["BROWSER_ERROR"] = 300015] = "BROWSER_ERROR";
		return xiaohongshuAPIErrorCode$1;
	}({});
});
function rc4_encrypt(plaintext, key) {
	const s = [];
	for (var i = 0; i < 256; i++) s[i] = i;
	var j = 0;
	for (var i = 0; i < 256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		var temp = s[i];
		s[i] = s[j];
		s[j] = temp;
	}
	var i = 0;
	var j = 0;
	const cipher = [];
	for (let k = 0; k < plaintext.length; k++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		var temp = s[i];
		s[i] = s[j];
		s[j] = temp;
		const t = (s[i] + s[j]) % 256;
		cipher.push(String.fromCharCode(s[t] ^ plaintext.charCodeAt(k)));
	}
	return cipher.join("");
}
function result_encrypt(long_str, num) {
	const s_obj = {
		s0: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		s1: "Dkdpgh4ZKsQB80/Mfvw36XI1R25+WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
		s2: "Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=",
		s3: "ckdp1h4ZKsUB80/Mfvw36XIgR25+WQAlEi7NLboqYTOPuzmFjJnryx9HVGDaStCe",
		s4: "Dkdpgh2ZmsQB80/MfvV36XI1R45-WUAlEixNLwoqYTOPuzKFjJnry79HbGcaStCe"
	};
	const constant = {
		0: 16515072,
		1: 258048,
		2: 4032,
		str: s_obj[num]
	};
	let result = "";
	let lound = 0;
	let long_int = get_long_int(lound, long_str);
	for (let i = 0; i < long_str.length / 3 * 4; i++) {
		if (Math.floor(i / 4) !== lound) {
			lound += 1;
			long_int = get_long_int(lound, long_str);
		}
		let key = i % 4;
		let temp_int;
		switch (key) {
			case 0:
				temp_int = (long_int & constant["0"]) >> 18;
				result += constant["str"].charAt(temp_int);
				break;
			case 1:
				temp_int = (long_int & constant["1"]) >> 12;
				result += constant["str"].charAt(temp_int);
				break;
			case 2:
				temp_int = (long_int & constant["2"]) >> 6;
				result += constant["str"].charAt(temp_int);
				break;
			case 3:
				temp_int = long_int & 63;
				result += constant["str"].charAt(temp_int);
				break;
			default: break;
		}
	}
	return result;
}
function get_long_int(round, long_str) {
	round = round * 3;
	return long_str.charCodeAt(round) << 16 | long_str.charCodeAt(round + 1) << 8 | long_str.charCodeAt(round + 2);
}
function gener_random(random, option) {
	return [
		random & 170 | option[0] & 85,
		random & 85 | option[0] & 170,
		random >> 8 & 170 | option[1] & 85,
		random >> 8 & 85 | option[1] & 170
	];
}
function generate_rc4_bb_str(url_search_params, user_agent, window_env_str, suffix = "cus", Arguments = [
	0,
	1,
	14
]) {
	let sm3 = new SM3();
	let start_time = Date.now();
	const url_search_params_list = sm3.sum(sm3.sum(url_search_params + suffix));
	const cus = sm3.sum(sm3.sum(suffix));
	const ua = sm3.sum(result_encrypt(rc4_encrypt(user_agent, String.fromCharCode.apply(null, [
		.00390625,
		1,
		14
	])), "s3"));
	const end_time = Date.now();
	let b = {
		8: 3,
		10: end_time,
		15: {
			aid: 6383,
			pageId: 6241,
			boe: false,
			ddrt: 7,
			paths: {
				include: [
					{},
					{},
					{},
					{},
					{},
					{},
					{}
				],
				exclude: []
			},
			track: {
				mode: 0,
				delay: 300,
				paths: []
			},
			dump: true,
			rpU: ""
		},
		16: start_time,
		18: 44,
		19: [
			1,
			0,
			1,
			5
		]
	};
	b[20] = b[16] >> 24 & 255;
	b[21] = b[16] >> 16 & 255;
	b[22] = b[16] >> 8 & 255;
	b[23] = b[16] & 255;
	b[24] = b[16] / 256 / 256 / 256 / 256 >> 0;
	b[25] = b[16] / 256 / 256 / 256 / 256 / 256 >> 0;
	b[26] = Arguments[0] >> 24 & 255;
	b[27] = Arguments[0] >> 16 & 255;
	b[28] = Arguments[0] >> 8 & 255;
	b[29] = Arguments[0] & 255;
	b[30] = Arguments[1] / 256 & 255;
	b[31] = Arguments[1] % 256 & 255;
	b[32] = Arguments[1] >> 24 & 255;
	b[33] = Arguments[1] >> 16 & 255;
	b[34] = Arguments[2] >> 24 & 255;
	b[35] = Arguments[2] >> 16 & 255;
	b[36] = Arguments[2] >> 8 & 255;
	b[37] = Arguments[2] & 255;
	b[38] = url_search_params_list[21];
	b[39] = url_search_params_list[22];
	b[40] = cus[21];
	b[41] = cus[22];
	b[42] = ua[23];
	b[43] = ua[24];
	b[44] = b[10] >> 24 & 255;
	b[45] = b[10] >> 16 & 255;
	b[46] = b[10] >> 8 & 255;
	b[47] = b[10] & 255;
	b[48] = b[8];
	b[49] = b[10] / 256 / 256 / 256 / 256 >> 0;
	b[50] = b[10] / 256 / 256 / 256 / 256 / 256 >> 0;
	b[51] = b[15].pageId;
	b[52] = b[15].pageId >> 24 & 255;
	b[53] = b[15].pageId >> 16 & 255;
	b[54] = b[15].pageId >> 8 & 255;
	b[55] = b[15].pageId & 255;
	b[56] = b[15].aid;
	b[57] = b[15].aid & 255;
	b[58] = b[15].aid >> 8 & 255;
	b[59] = b[15].aid >> 16 & 255;
	b[60] = b[15].aid >> 24 & 255;
	const window_env_list = [];
	for (let index = 0; index < window_env_str.length; index++) window_env_list.push(window_env_str.charCodeAt(index));
	b[64] = window_env_list.length;
	b[65] = b[64] & 255;
	b[66] = b[64] >> 8 & 255;
	b[69] = 0;
	b[70] = b[69] & 255;
	b[71] = b[69] >> 8 & 255;
	b[72] = b[18] ^ b[20] ^ b[26] ^ b[30] ^ b[38] ^ b[40] ^ b[42] ^ b[21] ^ b[27] ^ b[31] ^ b[35] ^ b[39] ^ b[41] ^ b[43] ^ b[22] ^ b[28] ^ b[32] ^ b[36] ^ b[23] ^ b[29] ^ b[33] ^ b[37] ^ b[44] ^ b[45] ^ b[46] ^ b[47] ^ b[48] ^ b[49] ^ b[50] ^ b[24] ^ b[25] ^ b[52] ^ b[53] ^ b[54] ^ b[55] ^ b[57] ^ b[58] ^ b[59] ^ b[60] ^ b[65] ^ b[66] ^ b[70] ^ b[71];
	let bb = [
		b[18],
		b[20],
		b[52],
		b[26],
		b[30],
		b[34],
		b[58],
		b[38],
		b[40],
		b[53],
		b[42],
		b[21],
		b[27],
		b[54],
		b[55],
		b[31],
		b[35],
		b[57],
		b[39],
		b[41],
		b[43],
		b[22],
		b[28],
		b[32],
		b[60],
		b[36],
		b[23],
		b[29],
		b[33],
		b[37],
		b[44],
		b[45],
		b[59],
		b[46],
		b[47],
		b[48],
		b[49],
		b[50],
		b[24],
		b[25],
		b[65],
		b[66],
		b[70],
		b[71]
	];
	bb = bb.concat(window_env_list).concat(b[72]);
	return rc4_encrypt(String.fromCharCode.apply(null, bb), String.fromCharCode.apply(null, [121]));
}
function generate_random_str() {
	let random_str_list = [];
	random_str_list = random_str_list.concat(gener_random(Math.random() * 1e4, [3, 45]));
	random_str_list = random_str_list.concat(gener_random(Math.random() * 1e4, [1, 0]));
	random_str_list = random_str_list.concat(gener_random(Math.random() * 1e4, [1, 5]));
	return String.fromCharCode.apply(null, random_str_list);
}
var SM3, cleanUserAgentForSigning, a_bogus_default;
var init_a_bogus = __esmMin(() => {
	SM3 = class {
		reg;
		chunk;
		size;
		constructor() {
			this.reg = [];
			this.chunk = [];
			this.size = 0;
			this.reset();
		}
		reset() {
			this.reg[0] = 1937774191;
			this.reg[1] = 1226093241;
			this.reg[2] = 388252375;
			this.reg[3] = 3666478592;
			this.reg[4] = 2842636476;
			this.reg[5] = 372324522;
			this.reg[6] = 3817729613;
			this.reg[7] = 2969243214;
			this.chunk = [];
			this.size = 0;
		}
		write(e) {
			const a = typeof e === "string" ? this.stringToBytes(e) : e;
			this.size += a.length;
			let f = 64 - this.chunk.length;
			if (a.length < f) this.chunk = this.chunk.concat(a);
			else {
				this.chunk = this.chunk.concat(a.slice(0, f));
				while (this.chunk.length >= 64) {
					this._compress(this.chunk);
					f < a.length ? this.chunk = a.slice(f, Math.min(f + 64, a.length)) : this.chunk = [];
					f += 64;
				}
			}
		}
		sum(e, t) {
			if (e) {
				this.reset();
				this.write(e);
			}
			this._fill();
			for (let f = 0; f < this.chunk.length; f += 64) this._compress(this.chunk.slice(f, f + 64));
			let i = null;
			if (t === "hex") {
				i = "";
				for (let f = 0; f < 8; f++) i += this.padHex(this.reg[f].toString(16), 8);
			} else {
				i = new Array(32);
				for (let f = 0; f < 8; f++) {
					let c = this.reg[f];
					i[4 * f + 3] = (255 & c) >>> 0;
					c >>>= 8;
					i[4 * f + 2] = (255 & c) >>> 0;
					c >>>= 8;
					i[4 * f + 1] = (255 & c) >>> 0;
					c >>>= 8;
					i[4 * f] = (255 & c) >>> 0;
				}
			}
			this.reset();
			return i;
		}
		_compress(t) {
			if (t.length < 64) console.error("compress error: not enough data");
			else {
				for (var f = ((e) => {
					for (var r = new Array(132), t$1 = 0; t$1 < 16; t$1++) r[t$1] = e[4 * t$1] << 24, r[t$1] |= e[4 * t$1 + 1] << 16, r[t$1] |= e[4 * t$1 + 2] << 8, r[t$1] |= e[4 * t$1 + 3], r[t$1] >>>= 0;
					for (var n = 16; n < 68; n++) {
						let a = r[n - 16] ^ r[n - 9] ^ this.le(r[n - 3], 15);
						a = a ^ this.le(a, 15) ^ this.le(a, 23), r[n] = (a ^ this.le(r[n - 13], 7) ^ r[n - 6]) >>> 0;
					}
					for (n = 0; n < 64; n++) r[n + 68] = (r[n] ^ r[n + 4]) >>> 0;
					return r;
				})(t), i = this.reg.slice(0), c = 0; c < 64; c++) {
					let o = this.le(i[0], 12) + i[4] + this.le(this.de(c), c);
					const s = ((o = this.le(o = (4294967295 & o) >>> 0, 7)) ^ this.le(i[0], 12)) >>> 0;
					let u = this.pe(c, i[0], i[1], i[2]);
					u = (4294967295 & (u = u + i[3] + s + f[c + 68])) >>> 0;
					let b = this.he(c, i[4], i[5], i[6]);
					b = (4294967295 & (b = b + i[7] + o + f[c])) >>> 0, i[3] = i[2], i[2] = this.le(i[1], 9), i[1] = i[0], i[0] = u, i[7] = i[6], i[6] = this.le(i[5], 19), i[5] = i[4], i[4] = (b ^ this.le(b, 9) ^ this.le(b, 17)) >>> 0;
				}
				for (let l = 0; l < 8; l++) this.reg[l] = (this.reg[l] ^ i[l]) >>> 0;
			}
		}
		_fill() {
			let a = 8 * this.size;
			let f = this.chunk.push(128) % 64;
			while (64 - f < 8) f -= 64;
			while (f < 56) {
				this.chunk.push(0);
				f++;
			}
			for (let i = 0; i < 4; i++) {
				const c = Math.floor(a / 4294967296);
				this.chunk.push(c >>> 8 * (3 - i) & 255);
			}
			for (let i = 0; i < 4; i++) this.chunk.push(a >>> 8 * (3 - i) & 255);
		}
		de(e) {
			return e >= 0 && e < 16 ? 2043430169 : e >= 16 && e < 64 ? 2055708042 : (console.error("invalid j for constant Tj"), 0);
		}
		pe(e, r, t, n) {
			return e >= 0 && e < 16 ? (r ^ t ^ n) >>> 0 : e >= 16 && e < 64 ? (r & t | r & n | t & n) >>> 0 : (console.error("invalid j for bool function FF"), 0);
		}
		he(e, r, t, n) {
			return e >= 0 && e < 16 ? (r ^ t ^ n) >>> 0 : e >= 16 && e < 64 ? (r & t | ~r & n) >>> 0 : (console.error("invalid j for bool function GG"), 0);
		}
		le(e, r) {
			return (e << (r %= 32) | e >>> 32 - r) >>> 0;
		}
		stringToBytes(str) {
			const n = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_$1, r) => String.fromCharCode(parseInt(r, 16)));
			const a = new Array(n.length);
			for (let i = 0; i < n.length; i++) a[i] = n.charCodeAt(i);
			return a;
		}
		padHex(num, size) {
			return num.padStart(size, "0");
		}
	};
	cleanUserAgentForSigning = (userAgent) => userAgent.replace(/\s+Edg\/[\d\.]+/g, "");
	a_bogus_default = (url, user_agent) => {
		const cleanedUserAgent = cleanUserAgentForSigning(user_agent);
		return result_encrypt(generate_random_str() + generate_rc4_bb_str(new URLSearchParams(new URL(url).search).toString(), cleanedUserAgent, "1536|747|1536|834|0|30|0|0|1536|834|1536|864|1525|747|24|24|Win32"), "s4") + "=";
	};
});
var XBogus;
var init_x_bogus = __esmMin(() => {
	XBogus = class {
		charMap;
		base64Charset;
		uaKey;
		defaultUa;
		params;
		xb;
		constructor() {
			this.charMap = new Array(128).fill(null);
			for (let i = 48; i <= 57; i++) this.charMap[i] = i - 48;
			for (let i = 65; i <= 70; i++) this.charMap[i] = i - 55;
			for (let i = 97; i <= 102; i++) this.charMap[i] = i - 87;
			this.base64Charset = "Dkdpgh4ZKsQB80/Mfvw36XI1R25-WUAlEi7NLboqYTOPuzmFjJnryx9HVGcaStCe=";
			this.uaKey = Buffer.from([
				0,
				1,
				12
			]);
			this.defaultUa = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0";
		}
		md5StrToArray(md5Str) {
			const result = [];
			if (md5Str.length > 32) {
				for (const char of md5Str) result.push(char.charCodeAt(0));
				return result;
			}
			let idx = 0;
			while (idx < md5Str.length) {
				const leftCharCode = md5Str.charCodeAt(idx);
				const rightCharCode = md5Str.charCodeAt(idx + 1);
				const left = this.charMap[leftCharCode];
				const right = this.charMap[rightCharCode];
				if (left === null || right === null) throw new Error(`Invalid MD5 character: ${md5Str[idx]}${md5Str[idx + 1]}`);
				result.push(left << 4 | right);
				idx += 2;
			}
			return result;
		}
		md5(input) {
			const dataArray = typeof input === "string" ? this.md5StrToArray(input) : input;
			const dataBuffer = Buffer.from(dataArray);
			return crypto.createHash("md5").update(dataBuffer).digest("hex");
		}
		md5Encrypt(urlPath) {
			const firstMd5 = this.md5(urlPath);
			const firstArray = this.md5StrToArray(firstMd5);
			const secondMd5 = this.md5(firstArray);
			return this.md5StrToArray(secondMd5);
		}
		encodingConversion(...params) {
			const byteList = [];
			for (const param of params) if (typeof param === "number") byteList.push(Math.floor(param));
			else if (typeof param === "string") for (const char of param) byteList.push(char.charCodeAt(0));
			return Buffer.from(byteList).toString("latin1");
		}
		encodingConversion2(a, b, c) {
			return String.fromCharCode(a) + String.fromCharCode(b) + c;
		}
		rc4Encrypt(key, data$1) {
			const keyBuffer = typeof key === "string" ? Buffer.from(key, "latin1") : key;
			const dataBuffer = Buffer.from(data$1, "latin1");
			const S = Array.from({ length: 256 }, (_$1, i$1) => i$1);
			let j = 0;
			for (let i$1 = 0; i$1 < 256; i$1++) {
				j = (j + S[i$1] + keyBuffer[i$1 % keyBuffer.length]) % 256;
				[S[i$1], S[j]] = [S[j], S[i$1]];
			}
			const encryptedBuffer = Buffer.alloc(dataBuffer.length);
			let i = 0;
			j = 0;
			for (let k = 0; k < dataBuffer.length; k++) {
				i = (i + 1) % 256;
				j = (j + S[i]) % 256;
				[S[i], S[j]] = [S[j], S[i]];
				const t = (S[i] + S[j]) % 256;
				encryptedBuffer[k] = dataBuffer[k] ^ S[t];
			}
			return encryptedBuffer.toString("latin1");
		}
		calculation(a1, a2, a3) {
			const x3 = (a1 & 255) << 16 | (a2 & 255) << 8 | a3 & 255;
			const c1 = this.base64Charset[(x3 & 16760832) >> 18];
			const c2 = this.base64Charset[(x3 & 258048) >> 12];
			const c3 = this.base64Charset[(x3 & 4032) >> 6];
			const c4 = this.base64Charset[x3 & 63];
			return c1 + c2 + c3 + c4;
		}
		getXBogus(url, ua) {
			const parsedUrl = new URL$1.URL(url);
			const urlPath = parsedUrl.pathname + parsedUrl.search;
			const currentUa = ua ?? this.defaultUa;
			const rc4EncryptedUa = this.rc4Encrypt(this.uaKey, currentUa);
			const base64Ua = Buffer.from(rc4EncryptedUa, "latin1").toString("base64");
			const md5Ua = this.md5(base64Ua);
			const array1 = this.md5StrToArray(md5Ua);
			const array2 = this.md5StrToArray(this.md5(this.md5StrToArray("d41d8cd98f00b204e9800998ecf8427e")));
			const urlEncryptedArray = this.md5Encrypt(urlPath);
			const timestamp = Math.floor(Date.now() / 1e3);
			const ct = 536919696;
			const newArray = [
				64,
				1,
				1,
				12,
				urlEncryptedArray[14],
				urlEncryptedArray[15],
				array2[14],
				array2[15],
				array1[14],
				array1[15],
				timestamp >> 24 & 255,
				timestamp >> 16 & 255,
				timestamp >> 8 & 255,
				timestamp & 255,
				ct >> 24 & 255,
				ct >> 16 & 255,
				ct >> 8 & 255,
				ct & 255
			];
			let xorResult = newArray[0];
			for (let i = 1; i < newArray.length; i++) xorResult ^= newArray[i];
			newArray.push(xorResult);
			const array3 = [];
			const array4 = [];
			let idx = 0;
			while (idx < newArray.length) {
				array3.push(newArray[idx]);
				if (idx + 1 < newArray.length) array4.push(newArray[idx + 1]);
				idx += 2;
			}
			const mergedArray = [...array3, ...array4];
			const firstConversion = this.encodingConversion(...mergedArray);
			const rc4Garbled = this.rc4Encrypt("ÿ", firstConversion);
			const garbledCode = this.encodingConversion2(2, 255, rc4Garbled);
			let xb = "";
			idx = 0;
			while (idx < garbledCode.length) {
				if (idx + 2 >= garbledCode.length) break;
				const a1 = garbledCode.charCodeAt(idx);
				const a2 = garbledCode.charCodeAt(idx + 1);
				const a3 = garbledCode.charCodeAt(idx + 2);
				xb += this.calculation(a1, a2, a3);
				idx += 3;
			}
			return {
				fullUrl: url.includes("?") ? `${url}&X-Bogus=${xb}` : `${url}?X-Bogus=${xb}`,
				xbogus: xb,
				userAgent: currentUa
			};
		}
	};
});
var defaultUserAgent, douyinSign;
var init_sign = __esmMin(() => {
	init_a_bogus();
	init_x_bogus();
	defaultUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";
	douyinSign = class {
		static Mstoken(length) {
			const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			const randomBytes$1 = crypto.randomBytes(length ?? 116);
			return Array.from(randomBytes$1, (byte) => characters[byte % 62]).join("");
		}
		static AB(url, userAgent) {
			return a_bogus_default(url, userAgent ?? defaultUserAgent);
		}
		static XB(url, userAgent) {
			return new XBogus().getXBogus(url, userAgent ?? defaultUserAgent).xbogus;
		}
		static VerifyFpManager() {
			const e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
			const t = e.length;
			const n = (/* @__PURE__ */ new Date()).getTime().toString(36);
			const r = [];
			r[8] = "_";
			r[13] = "_";
			r[18] = "_";
			r[23] = "_";
			r[14] = "4";
			for (let o, i = 0; i < 36; i++) if (!r[i]) {
				o = 0 | Math.random() * t;
				r[i] = e[i === 19 ? 3 & o | 8 : o];
			}
			return "verify_" + n + "_" + r.join("");
		}
	};
});
var extractBrowserVersion, buildQueryString, fp, DouyinAPI, createDouyinApiUrls, douyinApiUrls;
var init_API$1 = __esmMin(() => {
	init_sign();
	extractBrowserVersion = (userAgent) => {
		if (!userAgent) return "125.0.0.0";
		const chromeMatch = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
		if (chromeMatch) return chromeMatch[1];
		const edgeMatch = userAgent.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/);
		if (edgeMatch) return edgeMatch[1];
		return "125.0.0.0";
	};
	buildQueryString = (params) => Object.entries(params).filter(([_$1, value]) => value !== void 0 && value !== null).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&");
	fp = douyinSign.VerifyFpManager();
	DouyinAPI = class {
		browserVersion;
		constructor(userAgent) {
			this.browserVersion = extractBrowserVersion(userAgent);
		}
		getBaseParams() {
			return {
				device_platform: "webapp",
				aid: "6383",
				channel: "channel_pc_web",
				pc_client_type: "1",
				cookie_enabled: "true",
				browser_language: "zh-CN",
				browser_platform: "Win32",
				browser_name: "Chrome",
				browser_version: this.browserVersion,
				browser_online: "true",
				engine_name: "Blink",
				engine_version: this.browserVersion,
				os_name: "Windows",
				os_version: "10",
				cpu_core_num: "16",
				device_memory: "8",
				platform: "PC",
				downlink: "10",
				effective_type: "4g",
				msToken: douyinSign.Mstoken(184),
				verifyFp: fp,
				fp
			};
		}
		getWorkDetail(data$1) {
			return `https://www.douyin.com/aweme/v1/web/aweme/detail/?${buildQueryString({
				...this.getBaseParams(),
				aweme_id: data$1.aweme_id,
				update_version_code: "170400",
				version_code: "190500",
				version_name: "19.5.0",
				screen_width: "2328",
				screen_height: "1310",
				round_trip_time: "150",
				webid: "7351848354471872041"
			})}`;
		}
		getComments(data$1) {
			return `https://www.douyin.com/aweme/v1/web/comment/list/?${buildQueryString({
				...this.getBaseParams(),
				aweme_id: data$1.aweme_id,
				cursor: data$1.cursor ?? 0,
				count: data$1.number ?? 50,
				item_type: "0",
				insert_ids: "",
				whale_cut_token: "",
				cut_version: "1",
				rcFT: "",
				version_code: "170400",
				version_name: "17.4.0",
				screen_width: "1552",
				screen_height: "970",
				round_trip_time: "50"
			})}`;
		}
		getCommentReplies(data$1) {
			return `https://www-hj.douyin.com/aweme/v1/web/comment/list/reply/?${buildQueryString({
				device_platform: "webapp",
				aid: "6383",
				channel: "channel_pc_web",
				item_id: data$1.aweme_id,
				comment_id: data$1.comment_id,
				cut_version: "1",
				cursor: data$1.cursor,
				count: data$1.number,
				item_type: "0",
				update_version_code: "170400",
				pc_client_type: "1",
				pc_libra_divert: "Windows",
				support_h265: "1",
				support_dash: "1",
				version_code: "170400",
				version_name: "17.4.0",
				cookie_enabled: "true",
				screen_width: "1552",
				screen_height: "970",
				browser_language: "zh-CN",
				browser_platform: "Win32",
				browser_name: "Edge",
				browser_version: this.browserVersion,
				browser_online: "true",
				engine_name: "Blink",
				engine_version: this.browserVersion,
				os_name: "Windows",
				os_version: "10",
				cpu_core_num: "16",
				device_memory: "8",
				platform: "PC",
				downlink: "10",
				effective_type: "4g",
				round_trip_time: "50",
				webid: "7487210762873685515",
				verifyFp: fp,
				fp
			})}`;
		}
		getSlidesInfo(data$1) {
			return `https://www.iesdouyin.com/web/api/v2/aweme/slidesinfo/?${buildQueryString({
				reflow_source: "reflow_page",
				web_id: "7326472315356857893",
				device_id: "7326472315356857893",
				aweme_ids: `[${data$1.aweme_id}]`,
				request_source: "200",
				msToken: douyinSign.Mstoken(116),
				verifyFp: fp,
				fp
			})}`;
		}
		getEmojiList() {
			return "https://www.douyin.com/aweme/v1/web/emoji/list";
		}
		getUserVideoList(data$1) {
			return `https://www.douyin.com/aweme/v1/web/aweme/post/?${buildQueryString({
				...this.getBaseParams(),
				sec_user_id: data$1.sec_uid,
				max_cursor: data$1.max_cursor ?? "0",
				locate_query: "false",
				show_live_replay_strategy: "1",
				need_time_list: "1",
				time_list_query: "0",
				whale_cut_token: "",
				cut_version: "1",
				count: data$1.number ?? 18,
				publish_video_strategy_type: "2",
				version_code: "170400",
				version_name: "17.4.0",
				screen_width: "1552",
				screen_height: "970",
				round_trip_time: "50",
				webid: "7338423850134226495"
			})}`;
		}
		getUserFavoriteList(data$1) {
			return `https://www-hj.douyin.com/aweme/v1/web/aweme/favorite/?${buildQueryString({
				...this.getBaseParams(),
				sec_user_id: data$1.sec_uid,
				max_cursor: data$1.max_cursor ?? "0",
				min_cursor: "0",
				whale_cut_token: "",
				cut_version: "1",
				count: data$1.number ?? 18,
				publish_video_strategy_type: "2",
				update_version_code: "170400",
				pc_libra_divert: "Windows",
				support_h265: "1",
				support_dash: "1",
				version_code: "170400",
				version_name: "17.4.0",
				screen_width: "2328",
				screen_height: "1310",
				round_trip_time: "0",
				webid: "7487210762873685515"
			})}`;
		}
		getUserRecommendList(data$1) {
			return `https://www.douyin.com/aweme/v1/web/familiar/recommend/feed/?${buildQueryString({
				device_platform: "",
				aid: "6383",
				channel: "channel_pc_web",
				sec_user_id: data$1.sec_uid,
				max_cursor: data$1.max_cursor ?? "0",
				min_cursor: "0",
				whale_cut_token: "",
				count: data$1.number ?? 18,
				from: "1",
				update_version_code: "170400",
				pc_client_type: "1",
				pc_libra_divert: "Windows",
				support_h265: "1",
				support_dash: "1",
				cpu_core_num: "16",
				version_code: "170400",
				version_name: "17.4.0",
				cookie_enabled: "true",
				screen_width: "2328",
				screen_height: "1310",
				browser_language: "zh-CN",
				browser_platform: "Win32",
				browser_name: "Edge",
				browser_version: this.browserVersion,
				browser_online: "true",
				engine_name: "Blink",
				engine_version: this.browserVersion,
				os_name: "Windows",
				os_version: "10",
				device_memory: "8",
				platform: "PC",
				downlink: "10",
				effective_type: "4g",
				round_trip_time: "50",
				webid: "7487210762873685515",
				msToken: douyinSign.Mstoken(184),
				verifyFp: fp,
				fp
			})}`;
		}
		getUserProfile(data$1) {
			return `https://www.douyin.com/aweme/v1/web/user/profile/other/?${buildQueryString({
				...this.getBaseParams(),
				publish_video_strategy_type: "2",
				source: "channel_pc_web",
				sec_user_id: data$1.sec_uid,
				personal_center_strategy: "1",
				version_code: "170400",
				version_name: "17.4.0",
				screen_width: "1552",
				screen_height: "970",
				round_trip_time: "0",
				webid: "7327957959955580467"
			})}`;
		}
		getSuggestWords(data$1) {
			return `https://www.douyin.com/aweme/v1/web/api/suggest_words/?${buildQueryString({
				...this.getBaseParams(),
				query: data$1.query,
				business_id: "30088",
				from_group_id: "7129543174929812767",
				version_code: "170400",
				version_name: "17.4.0",
				screen_width: "1552",
				screen_height: "970",
				round_trip_time: "50",
				webid: "7327957959955580467"
			})}`;
		}
		search(data$1) {
			const searchType = data$1.type ?? "general";
			const { verifyFp, fp: fp$1, ...baseParamsWithoutFp } = this.getBaseParams();
			if (searchType === "user") return `https://www.douyin.com/aweme/v1/web/discover/search/?${buildQueryString({
				...baseParamsWithoutFp,
				count: data$1.number ?? 10,
				disable_rs: "0",
				from_group_id: "",
				is_filter_search: "0",
				keyword: data$1.query,
				list_type: "single",
				need_filter_settings: "1",
				offset: "0",
				pc_libra_divert: "Windows",
				pc_search_top_1_params: "{\"enable_ai_search_top_1\":1}",
				query_correct_type: "1",
				round_trip_time: "250",
				screen_height: "1310",
				screen_width: "2328",
				search_channel: "aweme_user_web",
				search_source: "switch_tab",
				support_dash: "1",
				support_h265: "1",
				version_code: "170400",
				version_name: "17.4.0",
				webid: "7521399115230610959",
				...data$1.search_id && { search_id: data$1.search_id }
			})}`;
			else if (searchType === "video") return `https://www.douyin.com/aweme/v1/web/search/item/?${buildQueryString({
				...baseParamsWithoutFp,
				count: data$1.number ?? 10,
				disable_rs: "0",
				enable_history: "1",
				from_group_id: "",
				is_filter_search: "0",
				keyword: data$1.query,
				list_type: "single",
				need_filter_settings: "1",
				offset: "0",
				pc_libra_divert: "Windows",
				pc_search_top_1_params: "{\"enable_ai_search_top_1\":1}",
				query_correct_type: "1",
				round_trip_time: "50",
				screen_height: "1310",
				screen_width: "2328",
				search_channel: "aweme_video_web",
				search_source: "switch_tab",
				support_dash: "1",
				support_h265: "1",
				version_code: "170400",
				version_name: "17.4.0",
				webid: "7521399115230610959",
				...data$1.search_id && { search_id: data$1.search_id }
			})}`;
			else return `https://www.douyin.com/aweme/v1/web/general/search/stream/?${buildQueryString({
				...baseParamsWithoutFp,
				count: data$1.number ?? 10,
				disable_rs: "0",
				enable_history: "1",
				is_filter_search: "0",
				keyword: data$1.query,
				list_type: "",
				need_filter_settings: "1",
				offset: "0",
				pc_libra_divert: "Windows",
				pc_search_top_1_params: "{\"enable_ai_search_top_1\":1}",
				query_correct_type: "1",
				round_trip_time: "0",
				screen_height: "1310",
				screen_width: "2328",
				search_channel: "aweme_general",
				search_source: "normal_search",
				support_dash: "1",
				support_h265: "1",
				version_code: "190600",
				version_name: "19.6.0",
				webid: "7521399115230610959"
			})}`;
		}
		getDynamicEmojiList() {
			return `https://www.douyin.com/aweme/v1/web/im/strategy/config?${buildQueryString({
				device_platform: "webapp",
				aid: "1128",
				channel: "channel_pc_web",
				publish_video_strategy_type: "2",
				app_id: "1128",
				scenes: "[%22interactive_resources%22]",
				pc_client_type: "1",
				version_code: "170400",
				version_name: "17.4.0",
				cookie_enabled: "true",
				screen_width: "2328",
				screen_height: "1310",
				browser_language: "zh-CN",
				browser_platform: "Win32",
				browser_name: "Chrome",
				browser_version: "126.0.0.0",
				browser_online: "true",
				engine_name: "Blink",
				engine_version: "126.0.0.0",
				os_name: "Windows",
				os_version: "10",
				cpu_core_num: "16",
				device_memory: "8",
				platform: "PC",
				downlink: "1.5",
				effective_type: "4g",
				round_trip_time: "350",
				webid: "7347329698282833447",
				msToken: douyinSign.Mstoken(116),
				verifyFp: fp,
				fp
			})}`;
		}
		getMusicInfo(data$1) {
			return `https://www.douyin.com/aweme/v1/web/music/detail/?${buildQueryString({
				device_platform: "webapp",
				aid: "6383",
				channel: "channel_pc_web",
				music_id: data$1.music_id,
				scene: "1",
				pc_client_type: "1",
				version_code: "170400",
				version_name: "17.4.0",
				cookie_enabled: "true",
				screen_width: "2328",
				screen_height: "1310",
				browser_language: "zh-CN",
				browser_platform: "Win32",
				browser_name: "Chrome",
				browser_version: "126.0.0.0",
				browser_online: "true",
				engine_name: "Blink",
				engine_version: "126.0.0.0",
				os_name: "Windows",
				os_version: "10",
				cpu_core_num: "16",
				device_memory: "8",
				platform: "PC",
				downlink: "1.5",
				effective_type: "4g",
				round_trip_time: "350",
				webid: "7347329698282833447",
				msToken: douyinSign.Mstoken(116),
				verifyFp: fp,
				fp
			})}`;
		}
		getLiveRoomInfo(data$1) {
			return `https://live.douyin.com/webcast/room/web/enter/?${buildQueryString({
				aid: "6383",
				app_name: "douyin_web",
				live_id: "1",
				device_platform: "web",
				language: "zh-CN",
				enter_from: "web_share_link",
				cookie_enabled: "true",
				screen_width: "2048",
				screen_height: "1152",
				browser_language: "zh-CN",
				browser_platform: "Win32",
				browser_name: "Chrome",
				browser_version: "125.0.0.0",
				web_rid: data$1.web_rid,
				room_id_str: data$1.room_id,
				enter_source: "",
				is_need_double_stream: "false",
				insert_task_id: "",
				live_reason: "",
				msToken: douyinSign.Mstoken(116),
				verifyFp: fp,
				fp
			})}`;
		}
		getLoginQrcode(data$1) {
			return `https://sso.douyin.com/get_qrcode/?${buildQueryString({
				verifyFp: data$1.verify_fp,
				fp: data$1.verify_fp
			})}`;
		}
		getDanmakuList(data$1) {
			return `https://www-hj.douyin.com/aweme/v1/web/danmaku/get_v2/?${buildQueryString({
				...this.getBaseParams(),
				app_name: "aweme",
				format: "json",
				group_id: data$1.aweme_id,
				item_id: data$1.aweme_id,
				start_time: data$1.start_time ?? "0",
				end_time: data$1.end_time ?? "32000",
				duration: data$1.duration,
				update_version_code: "170400",
				pc_libra_divert: "Windows",
				support_h265: "1",
				support_dash: "1",
				version_code: "170400",
				version_name: "17.4.0",
				screen_width: "2328",
				screen_height: "1310",
				browser_name: "Edge",
				browser_version: "140.0.0.0",
				engine_name: "Blink",
				engine_version: "140.0.0.0",
				downlink: "1.55",
				round_trip_time: "200",
				webid: "7487210762873685515",
				msToken: douyinSign.Mstoken(116),
				verifyFp: fp,
				fp
			})}`;
		}
	};
	createDouyinApiUrls = (userAgent) => new DouyinAPI(userAgent);
	douyinApiUrls = new DouyinAPI();
});
var getSignature, getSignParamName, buildSignedUrl, DouyinData, fetchPaginatedData, GlobalGetData$3, parseDouyinMultiJson, filterSearchResponses;
var init_getdata$3 = __esmMin(() => {
	init_model();
	init_defaultConfigs();
	init_NetworksConfigType();
	init_API$1();
	init_sign();
	getSignature = (url, signType = "a_bogus", userAgent) => {
		switch (signType) {
			case "x_bogus": return douyinSign.XB(url, userAgent);
			case "a_bogus":
			default: return douyinSign.AB(url, userAgent);
		}
	};
	getSignParamName = (signType = "a_bogus") => {
		switch (signType) {
			case "x_bogus": return "X-Bogus";
			case "a_bogus":
			default: return "a_bogus";
		}
	};
	buildSignedUrl = (url, signType = "a_bogus", userAgent) => {
		const signature = getSignature(url, signType, userAgent);
		return `${url}&${getSignParamName(signType)}=${signature}`;
	};
	DouyinData = async (data$1, cookie, requestConfig) => {
		const defHeaders = getDouyinDefaultConfig(cookie)["headers"];
		const baseRequestConfig = {
			method: "GET",
			timeout: 1e4,
			...requestConfig,
			headers: {
				...defHeaders,
				...requestConfig?.headers ?? {}
			}
		};
		const userAgent = baseRequestConfig.headers?.["User-Agent"];
		const douyinApiUrls$1 = createDouyinApiUrls(userAgent);
		const signType = data$1.signType ?? "a_bogus";
		switch (data$1.methodType) {
			case "textWork":
			case "parseWork":
			case "videoWork":
			case "imageAlbumWork":
			case "slidesWork": {
				const url = douyinApiUrls$1.getWorkDetail({ aweme_id: data$1.aweme_id });
				return await GlobalGetData$3(data$1.methodType, {
					...baseRequestConfig,
					url: buildSignedUrl(url, signType, userAgent)
				});
			}
			case "comments": {
				const urlGenerator = (params) => douyinApiUrls$1.getComments(params);
				return await fetchPaginatedData({
					type: data$1.methodType,
					apiUrlGenerator: urlGenerator,
					params: {
						...data$1,
						cursor: data$1.cursor ?? 0
					},
					maxPageSize: 50,
					requestConfig: baseRequestConfig,
					signType,
					extractList: (resp) => resp.comments ?? [],
					updateParams: (params, resp) => ({
						...params,
						cursor: resp.cursor
					}),
					hasMore: (resp) => resp.has_more === 1,
					formatFinalResponse: (resp, list) => ({
						...resp,
						comments: list,
						cursor: resp.cursor ?? list.length
					})
				});
			}
			case "commentReplies": {
				const urlGenerator = (params) => douyinApiUrls$1.getCommentReplies(params);
				return await fetchPaginatedData({
					type: data$1.methodType,
					apiUrlGenerator: urlGenerator,
					params: {
						...data$1,
						cursor: data$1.cursor ?? 0
					},
					maxPageSize: 3,
					requestConfig: baseRequestConfig,
					signType: "x_bogus",
					extractList: (resp) => resp.comments ?? [],
					updateParams: (params, resp) => ({
						...params,
						cursor: resp.cursor
					}),
					hasMore: (resp) => resp.has_more === 1,
					formatFinalResponse: (resp, list) => ({
						...resp,
						comments: list,
						cursor: resp.cursor ?? list.length
					})
				});
			}
			case "userProfile": {
				const url = douyinApiUrls$1.getUserProfile({ sec_uid: data$1.sec_uid });
				const customConfig = {
					...baseRequestConfig,
					headers: {
						...baseRequestConfig.headers,
						...(!requestConfig?.headers || !("Referer" in requestConfig.headers)) && { Referer: `https://www.douyin.com/user/${data$1.sec_uid}` }
					}
				};
				return await GlobalGetData$3(data$1.methodType, {
					...customConfig,
					url: buildSignedUrl(url, signType, userAgent)
				});
			}
			case "emojiList": {
				const url = douyinApiUrls$1.getEmojiList();
				return await GlobalGetData$3(data$1.methodType, {
					...baseRequestConfig,
					url
				});
			}
			case "userVideoList": {
				const urlGenerator = (params) => douyinApiUrls$1.getUserVideoList(params);
				return await fetchPaginatedData({
					type: data$1.methodType,
					apiUrlGenerator: urlGenerator,
					params: {
						...data$1,
						max_cursor: data$1.max_cursor
					},
					maxPageSize: 18,
					requestConfig: {
						...baseRequestConfig,
						headers: {
							...baseRequestConfig.headers,
							...(!requestConfig?.headers || !("Referer" in requestConfig.headers)) && { Referer: `https://www.douyin.com/user/${data$1.sec_uid}` }
						}
					},
					signType,
					extractList: (resp) => resp.aweme_list ?? [],
					updateParams: (params, resp) => ({
						...params,
						max_cursor: resp.max_cursor?.toString() ?? "0"
					}),
					hasMore: (resp) => resp.has_more === 1,
					formatFinalResponse: (resp, list) => ({
						...resp,
						aweme_list: list
					})
				});
			}
			case "userFavoriteList": {
				const urlGenerator = (params) => douyinApiUrls$1.getUserFavoriteList(params);
				return await fetchPaginatedData({
					type: data$1.methodType,
					apiUrlGenerator: urlGenerator,
					params: {
						...data$1,
						max_cursor: data$1.max_cursor
					},
					maxPageSize: 18,
					requestConfig: {
						...baseRequestConfig,
						headers: {
							...baseRequestConfig.headers,
							...(!requestConfig?.headers || !("Referer" in requestConfig.headers)) && { Referer: `https://www.douyin.com/user/${data$1.sec_uid}` }
						}
					},
					signType,
					extractList: (resp) => resp.aweme_list ?? [],
					updateParams: (params, resp) => ({
						...params,
						max_cursor: resp.max_cursor?.toString() ?? "0"
					}),
					hasMore: (resp) => resp.has_more === 1,
					formatFinalResponse: (resp, list) => ({
						...resp,
						aweme_list: list
					})
				});
			}
			case "userRecommendList": {
				const urlGenerator = (params) => douyinApiUrls$1.getUserRecommendList(params);
				return await fetchPaginatedData({
					type: data$1.methodType,
					apiUrlGenerator: urlGenerator,
					params: {
						...data$1,
						max_cursor: data$1.max_cursor
					},
					maxPageSize: 18,
					requestConfig: {
						...baseRequestConfig,
						headers: {
							...baseRequestConfig.headers,
							...(!requestConfig?.headers || !("Referer" in requestConfig.headers)) && { Referer: `https://www.douyin.com/user/${data$1.sec_uid}` }
						}
					},
					signType,
					extractList: (resp) => resp.aweme_list ?? [],
					updateParams: (params, resp) => ({
						...params,
						max_cursor: resp.max_cursor?.toString() ?? "0"
					}),
					hasMore: (resp) => resp.has_more === true,
					formatFinalResponse: (resp, list) => ({
						...resp,
						aweme_list: list
					})
				});
			}
			case "suggestWords": {
				const url = douyinApiUrls$1.getSuggestWords({ query: data$1.query });
				const customConfig = {
					...baseRequestConfig,
					headers: {
						...baseRequestConfig.headers,
						...(!requestConfig?.headers || !("Referer" in requestConfig.headers)) && { Referer: `https://www.douyin.com/search/${encodeURIComponent(String(data$1.query))}` }
					}
				};
				return await GlobalGetData$3(data$1.methodType, {
					...customConfig,
					url: buildSignedUrl(url, signType, userAgent)
				});
			}
			case "search": {
				const searchType = data$1.type ?? "general";
				const refererUrl = searchType === "user" ? `https://www.douyin.com/search/${encodeURIComponent(String(data$1.query))}?type=user` : searchType === "video" ? `https://www.douyin.com/search/${encodeURIComponent(String(data$1.query))}?type=video` : `https://www.douyin.com/root/search/${encodeURIComponent(String(data$1.query))}`;
				const customConfig = {
					...baseRequestConfig,
					headers: {
						...baseRequestConfig.headers,
						...(!requestConfig?.headers || !("Referer" in requestConfig.headers)) && { referer: refererUrl }
					}
				};
				const isUserSearch = searchType === "user";
				const isVideoSearch = searchType === "video";
				return await fetchPaginatedData({
					type: data$1.methodType,
					apiUrlGenerator: (params) => douyinApiUrls$1.search(params),
					params: {
						query: data$1.query,
						type: data$1.type,
						number: data$1.number ?? 10,
						search_id: ""
					},
					maxPageSize: 15,
					requestConfig: customConfig,
					signType: null,
					processRawResponse: (raw) => {
						if (!isUserSearch && !isVideoSearch) {
							const responses = filterSearchResponses(typeof raw === "string" ? parseDouyinMultiJson(raw) : [raw]);
							if (responses.length === 0) return raw;
							const mergedData = [];
							let lastValid = {};
							for (const resp of responses) {
								if (Array.isArray(resp.data) && resp.data.length > 0) mergedData.push(...resp.data);
								lastValid = resp;
							}
							return {
								...lastValid,
								data: mergedData
							};
						}
						return raw;
					},
					extractList: (resp) => {
						if (isUserSearch) return resp.user_list ?? [];
						return resp.data ?? [];
					},
					updateParams: (params, resp) => {
						let nextSearchId = params.search_id;
						if (isUserSearch) nextSearchId = resp.rid ?? nextSearchId;
						else nextSearchId = resp.log_pb?.impr_id ?? nextSearchId;
						return {
							...params,
							search_id: nextSearchId
						};
					},
					hasMore: (resp) => resp.has_more !== 0,
					validateFirstPage: (list, raw, url) => {
						const typeStr = isUserSearch ? "用户" : isVideoSearch ? "视频" : "综合";
						let isInvalidResponse = false;
						const rawAny = raw;
						if (!rawAny || typeof rawAny !== "object") isInvalidResponse = true;
						else if (isUserSearch && !rawAny.user_list) isInvalidResponse = true;
						else if (isVideoSearch && !rawAny.data) isInvalidResponse = true;
						else if (!isUserSearch && !isVideoSearch && !rawAny.data) isInvalidResponse = true;
						if (isInvalidResponse) {
							const desc = `抖音${typeStr}搜索返回无有效数据，疑似触发反爬机制，你的抖音Cookie可能已经失效！`;
							const warningMessage = `\n            获取响应数据失败！原因：${logger$1.yellow(`${typeStr}搜索返回无有效数据，疑似触发反爬机制`)}\n            请求类型：「${data$1.methodType}」\n            搜索关键词：「${data$1.query}」\n            请求URL：${url}\n            `;
							return {
								code: douoyinAPIErrorCode.COOKIE,
								data: raw,
								amagiError: {
									errorDescription: desc,
									requestType: data$1.methodType ?? "未知请求类型",
									requestUrl: url
								},
								amagiMessage: warningMessage
							};
						}
						if (!list || list.length === 0) {
							const desc = `抖音${typeStr}搜索接口第一次请求就返回空数组，可能该关键词无搜索结果或触发风控限制，你的抖音Cookie可能已经失效！`;
							const warningMessage = `\n            获取响应数据失败！原因：${logger$1.yellow(`${typeStr}搜索接口第一次请求就返回空数组，你的抖音Cookie可能已经失效！`)}\n            请求类型：「${data$1.methodType}」\n            搜索关键词：「${data$1.query}」\n            请求URL：${url}\n            `;
							logger$1.warn(warningMessage);
							return {
								data: raw,
								amagiError: {
									errorDescription: desc,
									requestType: data$1.methodType ?? "未知请求类型",
									requestUrl: url
								},
								amagiMessage: warningMessage
							};
						}
						return null;
					},
					formatFinalResponse: (resp, list) => {
						if (isUserSearch) return {
							...resp,
							user_list: list
						};
						return {
							...resp,
							data: list
						};
					}
				});
			}
			case "dynamicEmojiList": {
				const url = douyinApiUrls$1.getDynamicEmojiList();
				return await GlobalGetData$3(data$1.methodType, {
					...baseRequestConfig,
					url: buildSignedUrl(url, signType, userAgent)
				});
			}
			case "musicInfo": {
				const url = douyinApiUrls$1.getMusicInfo({ music_id: data$1.music_id });
				return await GlobalGetData$3(data$1.methodType, {
					...baseRequestConfig,
					url: buildSignedUrl(url, signType, userAgent)
				});
			}
			case "liveRoomInfo": {
				let url = douyinApiUrls$1.getLiveRoomInfo({
					room_id: data$1.room_id,
					web_rid: data$1.web_rid
				});
				const liveCustomConfig = {
					...baseRequestConfig,
					url: buildSignedUrl(url, signType, userAgent),
					headers: {
						...baseRequestConfig.headers,
						...(!requestConfig?.headers || !("Referer" in requestConfig.headers)) && { Referer: `https://live.douyin.com/${data$1.web_rid}` }
					}
				};
				return await GlobalGetData$3(data$1.methodType, {
					...liveCustomConfig,
					url: buildSignedUrl(url, signType, userAgent)
				});
			}
			case "loginQrcode": {
				const url = douyinApiUrls$1.getLoginQrcode({ verify_fp: data$1.verify_fp });
				return await GlobalGetData$3(data$1.methodType, {
					...baseRequestConfig,
					url: buildSignedUrl(url, signType, userAgent)
				});
			}
			case "danmakuList": {
				const MAX_SEGMENT_DURATION = 32e3;
				const startTime = data$1.start_time ?? 0;
				const endTime = data$1.end_time ?? data$1.duration;
				const totalDuration = endTime - startTime;
				if (totalDuration <= MAX_SEGMENT_DURATION) {
					const url = douyinApiUrls$1.getDanmakuList({
						aweme_id: data$1.aweme_id,
						start_time: startTime,
						end_time: endTime,
						duration: data$1.duration
					});
					return await GlobalGetData$3(data$1.methodType, {
						...baseRequestConfig,
						url: buildSignedUrl(url, signType, userAgent)
					});
				}
				const segments = [];
				let currentStart = startTime;
				while (currentStart < endTime) {
					const currentEnd = Math.min(currentStart + MAX_SEGMENT_DURATION, endTime);
					segments.push({
						start: currentStart,
						end: currentEnd
					});
					currentStart = currentEnd;
				}
				logger$1.debug(`弹幕数据需要分${segments.length}段获取，总时长：${totalDuration}ms`);
				const segmentPromises = segments.map(async (segment$1, index) => {
					const url = douyinApiUrls$1.getDanmakuList({
						aweme_id: data$1.aweme_id,
						start_time: segment$1.start,
						end_time: segment$1.end,
						duration: data$1.duration
					});
					try {
						const segmentData = await GlobalGetData$3(`${data$1.methodType}-segment${index + 1}`, {
							...baseRequestConfig,
							url: buildSignedUrl(url, signType, userAgent)
						});
						logger$1.debug(`弹幕第${index + 1}段获取成功 (${segment$1.start}ms-${segment$1.end}ms)`);
						return segmentData;
					} catch (error) {
						logger$1.debug(`弹幕第${index + 1}段获取失败 (${segment$1.start}ms-${segment$1.end}ms):`, error);
						return null;
					}
				});
				const segmentResults = await Promise.all(segmentPromises);
				const mergedDanmakuList = [];
				let finalExtra = null;
				let finalLogPb = null;
				let finalStatusCode = 0;
				segmentResults.forEach((segmentData, index) => {
					if (segmentData && segmentData.danmaku_list) {
						mergedDanmakuList.push(...segmentData.danmaku_list);
						if (index === 0) {
							finalExtra = segmentData.extra;
							finalLogPb = segmentData.log_pb;
							finalStatusCode = segmentData.status_code;
						}
					}
				});
				mergedDanmakuList.sort((a, b) => (a.offset_time ?? 0) - (b.offset_time ?? 0));
				const finalDanmakuData = {
					danmaku_list: mergedDanmakuList,
					start_time: startTime,
					end_time: endTime,
					total: mergedDanmakuList.length,
					status_code: finalStatusCode,
					extra: finalExtra,
					log_pb: finalLogPb
				};
				logger$1.debug(`弹幕数据合并完成，共获取${mergedDanmakuList.length}条弹幕`);
				return finalDanmakuData;
			}
			default: {
				const customUrl = data$1.custom_url;
				if (typeof customUrl === "string" && customUrl.length > 0) {
					const url = buildSignedUrl(customUrl, signType, userAgent);
					return await GlobalGetData$3(data$1.methodType ?? "customRequest", {
						...baseRequestConfig,
						url
					});
				}
				logger$1.warn(`未知的抖音数据接口：「${logger$1.red(data$1.methodType)}」`);
				return null;
			}
		}
	};
	fetchPaginatedData = async (config$1) => {
		const { type, apiUrlGenerator, params, maxPageSize, requestConfig, signType = "a_bogus", extractList, updateParams, hasMore, formatFinalResponse, processRawResponse, validateFirstPage } = config$1;
		let currentParams = { ...params };
		const fetchedData = [];
		let lastResponse = {};
		let isFirstRequest = true;
		const userAgent = requestConfig.headers?.["User-Agent"];
		const targetNumber = Number(params.number ?? maxPageSize);
		while (fetchedData.length < targetNumber) {
			const remaining = targetNumber - fetchedData.length;
			currentParams.number = Math.min(remaining, maxPageSize);
			const url = apiUrlGenerator(currentParams);
			const finalUrl = signType ? buildSignedUrl(url, signType, userAgent) : url;
			const raw = await GlobalGetData$3(type, {
				...requestConfig,
				url: finalUrl
			});
			const response = processRawResponse ? processRawResponse(raw) : raw;
			if (response && response.amagiError) return response;
			const list = extractList(response);
			if (isFirstRequest && validateFirstPage) {
				const error = validateFirstPage(list, response, finalUrl);
				if (error) return error;
			}
			if (Array.isArray(list) && list.length > 0) fetchedData.push(...list);
			lastResponse = response;
			if (!hasMore(response)) break;
			if (!list || list.length === 0) break;
			currentParams = updateParams(currentParams, response);
			isFirstRequest = false;
		}
		const slicedData = targetNumber === 0 ? [] : fetchedData.slice(0, targetNumber);
		return formatFinalResponse(lastResponse, slicedData);
	};
	GlobalGetData$3 = async (type, config$1) => {
		let warningMessage = "";
		try {
			const result = await fetchData(config$1);
			if (isNetworkErrorResult(result)) {
				const networkError = new Error(result.error.amagiError.errorDescription);
				Object.assign(networkError, {
					code: result.error.code,
					data: null,
					amagiError: {
						...result.error.amagiError,
						requestType: type
					}
				});
				throw networkError;
			}
			if (!result || result === "") {
				const Err = {
					errorDescription: "获取响应数据失败！接口返回内容为空，你的抖音ck可能已经失效！",
					requestType: type ?? "未知请求类型",
					requestUrl: config$1.url
				};
				warningMessage = `\n      获取响应数据失败！原因：${logger$1.yellow("接口返回内容为空，你的抖音ck可能已经失效！")}\n      请求类型：「${type}」\n      请求URL：${config$1.url}\n      `;
				logger$1.warn(warningMessage);
				const cookieError = new Error(Err.errorDescription);
				Object.assign(cookieError, {
					code: douoyinAPIErrorCode.COOKIE,
					data: result,
					amagiError: Err
				});
				throw cookieError;
			}
			if (result.filter_detail && result.filter_detail.filter_reason) {
				const filterReason = result.filter_detail.filter_reason;
				const Err = {
					errorDescription: `获取响应数据失败！原因：${filterReason}！`,
					requestType: type ?? "未知请求类型",
					requestUrl: config$1.url
				};
				warningMessage = `\n      获取响应数据失败！原因：${logger$1.yellow(filterReason)}\n      请求类型：「${type}」\n      请求URL：${config$1.url}\n      `;
				logger$1.warn(warningMessage);
				const filterError = new Error(Err.errorDescription);
				Object.assign(filterError, {
					code: douoyinAPIErrorCode.FILTER,
					data: result,
					amagiError: Err
				});
				throw filterError;
			}
			return result;
		} catch (error) {
			if (error && typeof error === "object") return {
				...error,
				amagiMessage: warningMessage
			};
			return {
				code: amagiAPIErrorCode.UNKNOWN,
				data: null,
				amagiError: {
					errorDescription: "未知错误",
					requestType: type,
					requestUrl: config$1.url
				},
				amagiMessage: warningMessage
			};
		}
	};
	parseDouyinMultiJson = (raw) => {
		const blocks = [];
		let depth = 0;
		let start = -1;
		for (let i = 0; i < raw.length; i++) {
			const c = raw[i];
			if (c === "{") {
				if (depth === 0) start = i;
				depth++;
			} else if (c === "}") {
				depth--;
				if (depth === 0 && start !== -1) {
					blocks.push(raw.slice(start, i + 1));
					start = -1;
				}
			}
		}
		const parsed = [];
		for (const block of blocks) try {
			parsed.push(JSON.parse(block));
		} catch {}
		return parsed;
	};
	filterSearchResponses = (objs) => objs.filter((o) => o && typeof o.cursor === "number" && typeof o.has_more === "number" && Array.isArray(o.data));
});
async function fetchDouyinInternal(methodType, options, config$1) {
	const startTime = Date.now();
	try {
		const rawData = await DouyinData({ ...validateDouyinParams(methodType, options) }, config$1.cookie, config$1.requestConfig);
		const duration = Date.now() - startTime;
		if (rawData.data === "" || rawData.status_code !== 0) {
			emitApiError({
				platform: "douyin",
				methodType,
				errorCode: rawData.status_code,
				errorMessage: rawData.status_msg ?? "抖音数据获取失败",
				url: void 0,
				duration
			});
			return createErrorResponse(rawData.amagiError, rawData.status_msg ?? "抖音数据获取失败");
		}
		const result = createSuccessResponse$1(rawData, "获取成功", 200);
		emitApiSuccess({
			platform: "douyin",
			methodType,
			response: result,
			statusCode: 200,
			duration
		});
		return result;
	} catch (error) {
		const duration = Date.now() - startTime;
		const errorMessage = error instanceof Error ? error.message : "未知错误";
		emitApiError({
			platform: "douyin",
			methodType,
			errorMessage,
			duration
		});
		throw new Error(`抖音数据获取失败: ${errorMessage}`);
	}
}
var init_internal$2 = __esmMin(() => {
	init_events();
	init_validation$1();
	init_getdata$3();
});
async function fetchWorkComments$1(options, cookie, requestConfig) {
	return fetchDouyinInternal("comments", options, {
		cookie,
		requestConfig
	});
}
async function fetchCommentReplies(options, cookie, requestConfig) {
	return fetchDouyinInternal("commentReplies", options, {
		cookie,
		requestConfig
	});
}
var init_comment = __esmMin(() => {
	init_internal$2();
});
async function fetchMusicInfo(options, cookie, requestConfig) {
	return fetchDouyinInternal("musicInfo", options, {
		cookie,
		requestConfig
	});
}
async function fetchLiveRoomInfo(options, cookie, requestConfig) {
	return fetchDouyinInternal("liveRoomInfo", options, {
		cookie,
		requestConfig
	});
}
async function requestLoginQrcode(options, cookie, requestConfig) {
	return fetchDouyinInternal("loginQrcode", options, {
		cookie,
		requestConfig
	});
}
async function fetchEmojiList$2(options, cookie, requestConfig) {
	return fetchDouyinInternal("emojiList", {}, {
		cookie,
		requestConfig
	});
}
async function fetchDynamicEmojiList(options, cookie, requestConfig) {
	return fetchDouyinInternal("dynamicEmojiList", {}, {
		cookie,
		requestConfig
	});
}
var init_misc$1 = __esmMin(() => {
	init_internal$2();
});
async function searchContent(options, cookie, requestConfig) {
	return fetchDouyinInternal("search", options, {
		cookie,
		requestConfig
	});
}
async function fetchSuggestWords(options, cookie, requestConfig) {
	return fetchDouyinInternal("suggestWords", options, {
		cookie,
		requestConfig
	});
}
var init_search$1 = __esmMin(() => {
	init_internal$2();
});
async function fetchUserProfile$1(options, cookie, requestConfig) {
	return fetchDouyinInternal("userProfile", options, {
		cookie,
		requestConfig
	});
}
async function fetchUserVideoList(options, cookie, requestConfig) {
	return fetchDouyinInternal("userVideoList", options, {
		cookie,
		requestConfig
	});
}
async function fetchUserFavoriteList(options, cookie, requestConfig) {
	return fetchDouyinInternal("userFavoriteList", options, {
		cookie,
		requestConfig
	});
}
async function fetchUserRecommendList(options, cookie, requestConfig) {
	return fetchDouyinInternal("userRecommendList", options, {
		cookie,
		requestConfig
	});
}
var init_user$1 = __esmMin(() => {
	init_internal$2();
});
async function fetchVideoWork$1(options, cookie, requestConfig) {
	return fetchDouyinInternal("videoWork", options, {
		cookie,
		requestConfig
	});
}
async function fetchImageAlbumWork(options, cookie, requestConfig) {
	return fetchDouyinInternal("imageAlbumWork", options, {
		cookie,
		requestConfig
	});
}
async function fetchSlidesWork(options, cookie, requestConfig) {
	return fetchDouyinInternal("slidesWork", options, {
		cookie,
		requestConfig
	});
}
async function fetchTextWork(options, cookie, requestConfig) {
	return fetchDouyinInternal("textWork", options, {
		cookie,
		requestConfig
	});
}
async function parseWork$1(options, cookie, requestConfig) {
	return fetchDouyinInternal("parseWork", options, {
		cookie,
		requestConfig
	});
}
async function fetchDanmakuList(options, cookie, requestConfig) {
	return fetchDouyinInternal("danmakuList", options, {
		cookie,
		requestConfig
	});
}
var init_video$1 = __esmMin(() => {
	init_internal$2();
});
function createBoundDouyinFetcher(cookie, requestConfig) {
	return {
		fetchVideoWork: (options, reqConfig) => fetchVideoWork$1(options, cookie, reqConfig ?? requestConfig),
		fetchImageAlbumWork: (options, reqConfig) => fetchImageAlbumWork(options, cookie, reqConfig ?? requestConfig),
		fetchSlidesWork: (options, reqConfig) => fetchSlidesWork(options, cookie, reqConfig ?? requestConfig),
		fetchTextWork: (options, reqConfig) => fetchTextWork(options, cookie, reqConfig ?? requestConfig),
		parseWork: (options, reqConfig) => parseWork$1(options, cookie, reqConfig ?? requestConfig),
		fetchDanmakuList: (options, reqConfig) => fetchDanmakuList(options, cookie, reqConfig ?? requestConfig),
		fetchWorkComments: (options, reqConfig) => fetchWorkComments$1(options, cookie, reqConfig ?? requestConfig),
		fetchCommentReplies: (options, reqConfig) => fetchCommentReplies(options, cookie, reqConfig ?? requestConfig),
		fetchUserProfile: (options, reqConfig) => fetchUserProfile$1(options, cookie, reqConfig ?? requestConfig),
		fetchUserVideoList: (options, reqConfig) => fetchUserVideoList(options, cookie, reqConfig ?? requestConfig),
		fetchUserFavoriteList: (options, reqConfig) => fetchUserFavoriteList(options, cookie, reqConfig ?? requestConfig),
		fetchUserRecommendList: (options, reqConfig) => fetchUserRecommendList(options, cookie, reqConfig ?? requestConfig),
		searchContent: (options, reqConfig) => searchContent(options, cookie, reqConfig ?? requestConfig),
		fetchSuggestWords: (options, reqConfig) => fetchSuggestWords(options, cookie, reqConfig ?? requestConfig),
		fetchMusicInfo: (options, reqConfig) => fetchMusicInfo(options, cookie, reqConfig ?? requestConfig),
		fetchLiveRoomInfo: (options, reqConfig) => fetchLiveRoomInfo(options, cookie, reqConfig ?? requestConfig),
		requestLoginQrcode: (options, reqConfig) => requestLoginQrcode(options, cookie, reqConfig ?? requestConfig),
		fetchEmojiList: (options, reqConfig) => fetchEmojiList$2(options, cookie, reqConfig ?? requestConfig),
		fetchDynamicEmojiList: (options, reqConfig) => fetchDynamicEmojiList(options, cookie, reqConfig ?? requestConfig)
	};
}
var init_bound = __esmMin(() => {
	init_comment();
	init_misc$1();
	init_search$1();
	init_user$1();
	init_video$1();
});
var douyinFetcher$1;
var init_douyin$2 = __esmMin(() => {
	init_comment();
	init_misc$1();
	init_search$1();
	init_user$1();
	init_video$1();
	init_comment();
	init_misc$1();
	init_search$1();
	init_user$1();
	init_video$1();
	init_bound();
	douyinFetcher$1 = {
		fetchVideoWork: fetchVideoWork$1,
		fetchImageAlbumWork,
		fetchSlidesWork,
		fetchTextWork,
		parseWork: parseWork$1,
		fetchDanmakuList,
		fetchWorkComments: fetchWorkComments$1,
		fetchCommentReplies,
		fetchUserProfile: fetchUserProfile$1,
		fetchUserVideoList,
		fetchUserFavoriteList,
		fetchUserRecommendList,
		searchContent,
		fetchSuggestWords,
		fetchMusicInfo,
		fetchLiveRoomInfo,
		requestLoginQrcode,
		fetchEmojiList: fetchEmojiList$2,
		fetchDynamicEmojiList
	};
});
var API, kuaishouApiUrls;
var init_API = __esmMin(() => {
	API = class {
		videoWork(data$1) {
			return {
				type: "visionVideoDetail",
				url: "https://www.kuaishou.com/graphql",
				body: {
					operationName: "visionVideoDetail",
					variables: {
						photoId: data$1.photoId,
						page: "detail"
					},
					query: "query visionVideoDetail($photoId: String, $type: String, $page: String, $webPageArea: String) {\n  visionVideoDetail(photoId: $photoId, type: $type, page: $page, webPageArea: $webPageArea) {\n    status\n    type\n    author {\n      id\n      name\n      following\n      headerUrl\n      __typename\n    }\n    photo {\n      id\n      duration\n      caption\n      likeCount\n      realLikeCount\n      coverUrl\n      photoUrl\n      liked\n      timestamp\n      expTag\n      llsid\n      viewCount\n      videoRatio\n      stereoType\n      musicBlocked\n      manifest {\n        mediaType\n        businessType\n        version\n        adaptationSet {\n          id\n          duration\n          representation {\n            id\n            defaultSelect\n            backupUrl\n            codecs\n            url\n            height\n            width\n            avgBitrate\n            maxBitrate\n            m3u8Slice\n            qualityType\n            qualityLabel\n            frameRate\n            featureP2sp\n            hidden\n            disableAdaptive\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      manifestH265\n      photoH265Url\n      coronaCropManifest\n      coronaCropManifestH265\n      croppedPhotoH265Url\n      croppedPhotoUrl\n      videoResource\n      __typename\n    }\n    tags {\n      type\n      name\n      __typename\n    }\n    commentLimit {\n      canAddComment\n      __typename\n    }\n    llsid\n    danmakuSwitch\n    __typename\n  }\n}\n"
				}
			};
		}
		comments(data$1) {
			return {
				type: "commentListQuery",
				url: "https://www.kuaishou.com/graphql",
				body: {
					operationName: "commentListQuery",
					variables: {
						photoId: data$1.photoId,
						pcursor: ""
					},
					query: "query commentListQuery($photoId: String, $pcursor: String) {\n  visionCommentList(photoId: $photoId, pcursor: $pcursor) {\n    commentCount\n    pcursor\n    rootComments {\n      commentId\n      authorId\n      authorName\n      content\n      headurl\n      timestamp\n      likedCount\n      realLikedCount\n      liked\n      status\n      authorLiked\n      subCommentCount\n      subCommentsPcursor\n      subComments {\n        commentId\n        authorId\n        authorName\n        content\n        headurl\n        timestamp\n        likedCount\n        realLikedCount\n        liked\n        status\n        authorLiked\n        replyToUserName\n        replyTo\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"
				}
			};
		}
		emojiList() {
			return {
				type: "visionBaseEmoticons",
				url: "https://www.kuaishou.com/graphql",
				body: {
					operationName: "visionBaseEmoticons",
					variables: {},
					query: "query visionBaseEmoticons {\n  visionBaseEmoticons {\n    iconUrls\n    __typename\n  }\n}\n"
				}
			};
		}
	};
	kuaishouApiUrls = new API();
});
var KuaishouData, GlobalGetData$2;
var init_getdata$2 = __esmMin(() => {
	init_model();
	init_defaultConfigs();
	init_NetworksConfigType();
	init_API();
	KuaishouData = async (data$1, cookie, requestConfig) => {
		const defHeaders = getKuaishouDefaultConfig(cookie)["headers"];
		const baseRequestConfig = {
			method: "POST",
			timeout: 1e4,
			...requestConfig,
			headers: {
				...defHeaders,
				...requestConfig?.headers ?? {}
			}
		};
		switch (data$1.methodType) {
			case "videoWork": {
				const body = kuaishouApiUrls.videoWork({ photoId: data$1.photoId });
				return await GlobalGetData$2(data$1.methodType, {
					...baseRequestConfig,
					url: body.url,
					data: body.body
				});
			}
			case "comments": {
				const body = kuaishouApiUrls.comments({ photoId: data$1.photoId });
				return await GlobalGetData$2(data$1.methodType, {
					...baseRequestConfig,
					url: body.url,
					data: body.body
				});
			}
			case "emojiList": {
				const body = kuaishouApiUrls.emojiList();
				return await GlobalGetData$2(data$1.methodType, {
					...baseRequestConfig,
					url: body.url,
					data: body.body
				});
			}
			default:
				logger$1.warn(`Unknown Kuaishou API method: "${logger$1.red(data$1.methodType)}"`);
				return null;
		}
	};
	GlobalGetData$2 = async (type, options) => {
		let warningMessage = "";
		try {
			const result = await fetchData(options);
			if (isNetworkErrorResult(result)) {
				const networkError = new Error(result.error.amagiError.errorDescription);
				Object.assign(networkError, {
					code: result.error.code,
					data: null,
					amagiError: {
						...result.error.amagiError,
						requestType: type
					}
				});
				throw networkError;
			}
			if (result === "" || !result || result.result === 2) {
				const Err = {
					errorDescription: "获取响应数据失败！接口返回内容为空！",
					requestType: type ?? "未知请求类型",
					requestUrl: options.url,
					requestBody: JSON.stringify(options.data)
				};
				warningMessage = `\n      获取响应数据失败！原因：${logger$1.yellow("接口返回内容为空，你的快手ck可能已经失效！")}\n      请求类型：「${type}」\n      请求URL：${options.url}\n      请求参数：${JSON.stringify(options.data, null, 2)}\n      `;
				logger$1.warn(warningMessage);
				const cookieError = new Error(Err.errorDescription);
				Object.assign(cookieError, {
					code: kuaishouAPIErrorCode.COOKIE,
					data: result,
					amagiError: Err
				});
				throw cookieError;
			}
			return result;
		} catch (error) {
			if (error && typeof error === "object") return {
				...error,
				amagiMessage: warningMessage
			};
			return {
				code: amagiAPIErrorCode.UNKNOWN,
				data: null,
				amagiError: {
					errorDescription: "未知错误",
					requestType: type,
					requestUrl: options.url
				},
				amagiMessage: warningMessage
			};
		}
	};
});
async function fetchKuaishouInternal(methodType, options, config$1) {
	const startTime = Date.now();
	try {
		const rawData = await KuaishouData({ ...validateKuaishouParams(methodType, options) }, config$1.cookie, config$1.requestConfig);
		const duration = Date.now() - startTime;
		if (rawData.code && Object.values(kuaishouAPIErrorCode).includes(rawData.code)) {
			emitApiError({
				platform: "kuaishou",
				methodType,
				errorCode: rawData.code,
				errorMessage: "快手数据获取失败",
				url: void 0,
				duration
			});
			return createErrorResponse(rawData.amagiError, "快手数据获取失败");
		}
		const result = createSuccessResponse$1(rawData, "获取成功", 200);
		emitApiSuccess({
			platform: "kuaishou",
			methodType,
			response: result,
			statusCode: 200,
			duration
		});
		return result;
	} catch (error) {
		const duration = Date.now() - startTime;
		const errorMessage = error instanceof Error ? error.message : "未知错误";
		emitApiError({
			platform: "kuaishou",
			methodType,
			errorMessage,
			duration
		});
		throw new Error(`快手数据获取失败: ${errorMessage}`);
	}
}
var init_internal$1 = __esmMin(() => {
	init_events();
	init_NetworksConfigType();
	init_validation$1();
	init_getdata$2();
});
async function fetchVideoWork(options, cookie, requestConfig) {
	return fetchKuaishouInternal("videoWork", options, {
		cookie,
		requestConfig
	});
}
async function fetchWorkComments(options, cookie, requestConfig) {
	return fetchKuaishouInternal("comments", options, {
		cookie,
		requestConfig
	});
}
async function fetchEmojiList$1(options, cookie, requestConfig) {
	return fetchKuaishouInternal("emojiList", {}, {
		cookie,
		requestConfig
	});
}
var init_api$3 = __esmMin(() => {
	init_internal$1();
});
function createBoundKuaishouFetcher(cookie, requestConfig) {
	return {
		fetchVideoWork: (options, reqConfig) => fetchVideoWork(options, cookie, reqConfig ?? requestConfig),
		fetchWorkComments: (options, reqConfig) => fetchWorkComments(options, cookie, reqConfig ?? requestConfig),
		fetchEmojiList: (options, reqConfig) => fetchEmojiList$1(options, cookie, reqConfig ?? requestConfig)
	};
}
var kuaishouFetcher$1;
var init_kuaishou$1 = __esmMin(() => {
	init_api$3();
	init_api$3();
	kuaishouFetcher$1 = {
		fetchVideoWork,
		fetchWorkComments,
		fetchEmojiList: fetchEmojiList$1
	};
});
var XiaohongshuData, GlobalGetData$1;
var init_getdata$1 = __esmMin(() => {
	init_model();
	init_defaultConfigs();
	init_utils$3();
	init_API$2();
	init_sign$1();
	XiaohongshuData = async (data$1, cookie, requestConfig) => {
		const defHeaders = getXiaohongshuDefaultConfig(cookie)["headers"];
		const baseRequestConfig = {
			method: "POST",
			timeout: 1e4,
			...requestConfig,
			headers: {
				...defHeaders,
				...requestConfig?.headers ?? {}
			}
		};
		const xiaohongshuApiUrls$1 = createXiaohongshuApiUrls();
		switch (data$1.methodType) {
			case "homeFeed": return await GlobalGetData$1(data$1.methodType, {
				...baseRequestConfig,
				url: xiaohongshuApiUrls$1.homeFeed(data$1).Url,
				data: JSON.stringify(xiaohongshuApiUrls$1.homeFeed(data$1).Body),
				headers: {
					...baseRequestConfig.headers,
					"x-s": xiaohongshuSign.generateXSPost(xiaohongshuApiUrls$1.homeFeed(data$1).apiPath, xiaohongshuSign.extractA1FromCookie(cookie ?? ""), "xhs-pc-web", xiaohongshuApiUrls$1.homeFeed(data$1).Body),
					"x-s-common": xiaohongshuSign.generateXSCommon(cookie ?? ""),
					"x-t": xiaohongshuSign.generateXT()
				}
			});
			case "noteDetail": return await GlobalGetData$1(data$1.methodType, {
				...baseRequestConfig,
				url: xiaohongshuApiUrls$1.noteDetail(data$1).Url,
				data: xiaohongshuApiUrls$1.noteDetail(data$1).Body,
				headers: {
					...baseRequestConfig.headers,
					"x-s": xiaohongshuSign.generateXSPost(xiaohongshuApiUrls$1.noteDetail(data$1).apiPath, xiaohongshuSign.extractA1FromCookie(cookie ?? ""), "xhs-pc-web", xiaohongshuApiUrls$1.noteDetail(data$1).Body),
					"x-s-common": xiaohongshuSign.generateXSCommon(cookie ?? ""),
					"x-t": xiaohongshuSign.generateXT()
				}
			});
			case "noteComments": {
				const baseRequestConfig$1 = {
					method: "GET",
					timeout: 1e4,
					...requestConfig,
					headers: {
						...defHeaders,
						...requestConfig?.headers ?? {}
					}
				};
				return await GlobalGetData$1(data$1.methodType, {
					...baseRequestConfig$1,
					url: xiaohongshuApiUrls$1.noteComments(data$1).Url,
					headers: {
						...baseRequestConfig$1.headers,
						"x-s": xiaohongshuSign.generateXSGet(xiaohongshuApiUrls$1.noteComments(data$1).apiPath, xiaohongshuSign.extractA1FromCookie(cookie ?? ""), "xhs-pc-web"),
						"x-s-common": xiaohongshuSign.generateXSCommon(cookie ?? ""),
						"x-t": xiaohongshuSign.generateXT()
					}
				});
			}
			case "userProfile": {
				const baseRequestConfig$1 = {
					method: "GET",
					timeout: 1e4,
					...requestConfig,
					headers: {
						...defHeaders,
						...requestConfig?.headers ?? {}
					}
				};
				return {
					code: 0,
					data: extractCreatorInfoFromHtml(await GlobalGetData$1(data$1.methodType, {
						...baseRequestConfig$1,
						url: xiaohongshuApiUrls$1.userProfile(data$1).Url,
						headers: {
							...baseRequestConfig$1.headers,
							"x-s": xiaohongshuSign.generateXSGet(xiaohongshuApiUrls$1.userProfile(data$1).apiPath, xiaohongshuSign.extractA1FromCookie(cookie ?? ""), "xhs-pc-web"),
							"x-s-common": xiaohongshuSign.generateXSCommon(cookie ?? ""),
							"x-t": xiaohongshuSign.generateXT()
						}
					})),
					msg: "success"
				};
			}
			case "userNoteList": return await GlobalGetData$1(data$1.methodType, {
				...baseRequestConfig,
				method: "GET",
				url: xiaohongshuApiUrls$1.userNoteList(data$1).Url,
				headers: {
					...baseRequestConfig.headers,
					"x-b3-traceid": xiaohongshuSign.generateXB3Traceid(),
					"x-s": xiaohongshuSign.generateXSGet(xiaohongshuApiUrls$1.userNoteList(data$1).apiPath, xiaohongshuSign.extractA1FromCookie(cookie ?? ""), "xhs-pc-web"),
					"x-s-common": xiaohongshuSign.generateXSCommon(cookie ?? ""),
					"x-t": xiaohongshuSign.generateXT()
				}
			});
			case "emojiList": {
				const baseRequestConfig$1 = {
					method: "GET",
					timeout: 1e4,
					...requestConfig,
					headers: {
						...defHeaders,
						...requestConfig?.headers ?? {}
					}
				};
				return await GlobalGetData$1(data$1.methodType, {
					...baseRequestConfig$1,
					url: xiaohongshuApiUrls$1.emojiList(data$1).Url,
					headers: {
						...baseRequestConfig$1.headers,
						"x-s": xiaohongshuSign.generateXSGet(xiaohongshuApiUrls$1.emojiList(data$1).apiPath, xiaohongshuSign.extractA1FromCookie(cookie ?? ""), "xhs-pc-web"),
						"x-s-common": xiaohongshuSign.generateXSCommon(cookie ?? ""),
						"x-t": xiaohongshuSign.generateXT()
					}
				});
			}
			case "searchNotes": return await GlobalGetData$1(data$1.methodType, {
				...baseRequestConfig,
				url: xiaohongshuApiUrls$1.searchNotes(data$1).Url,
				data: xiaohongshuApiUrls$1.searchNotes(data$1).Body,
				headers: {
					...baseRequestConfig.headers,
					"x-s": xiaohongshuSign.generateXSPost(xiaohongshuApiUrls$1.searchNotes(data$1).apiPath, xiaohongshuSign.extractA1FromCookie(cookie ?? ""), "xhs-pc-web"),
					"x-s-common": xiaohongshuSign.generateXSCommon(cookie ?? ""),
					"x-t": xiaohongshuSign.generateXT()
				}
			});
			default: throw new Error(`Unknown Xiaohongshu API method: "${logger$1.red(data$1.methodType)}"`);
		}
	};
	GlobalGetData$1 = async (methodType, config$1) => {
		try {
			const response = await fetchData(config$1);
			if (isNetworkErrorResult(response)) {
				const networkError = new Error(response.error.amagiError.errorDescription);
				Object.assign(networkError, {
					code: response.error.code,
					data: null,
					amagiError: {
						...response.error.amagiError,
						requestType: methodType
					}
				});
				throw networkError;
			}
			if (typeof response === "string" && response.includes("<html>")) return response;
			if (response.code !== 0) throw new Error(`API request failed: ${response.data?.msg ?? response.msg ?? "Unknown error"}, code: ${response.code}`);
			return response;
		} catch (error) {
			logger$1.error(`Xiaohongshu API request failed [${methodType}]:`, error.message);
			return {
				code: 500,
				message: "error",
				data: null,
				amagiError: {
					errorDescription: error.message ?? "Unknown error",
					requestType: methodType,
					requestUrl: config$1.url ?? ""
				},
				amagiMessage: `Xiaohongshu API request failed: ${error.message}`
			};
		}
	};
});
async function fetchXiaohongshuInternal(methodType, options, config$1) {
	const startTime = Date.now();
	try {
		const rawData = await XiaohongshuData({ ...validateXiaohongshuParams(methodType, options) }, config$1.cookie, config$1.requestConfig);
		const duration = Date.now() - startTime;
		if (rawData.code && Object.values(xiaohongshuAPIErrorCode).includes(rawData.code)) {
			emitApiError({
				platform: "xiaohongshu",
				methodType,
				errorCode: rawData.code,
				errorMessage: "小红书数据获取失败",
				url: void 0,
				duration
			});
			return createErrorResponse(rawData.amagiError, "小红书数据获取失败");
		}
		const result = createSuccessResponse$1(rawData, "获取成功", 200);
		emitApiSuccess({
			platform: "xiaohongshu",
			methodType,
			response: result,
			statusCode: 200,
			duration
		});
		return result;
	} catch (error) {
		const duration = Date.now() - startTime;
		const errorMessage = error instanceof Error ? error.message : "未知错误";
		emitApiError({
			platform: "xiaohongshu",
			methodType,
			errorMessage,
			duration
		});
		throw new Error(`小红书数据获取失败: ${errorMessage}`);
	}
}
var sortTypeMapping;
var init_internal = __esmMin(() => {
	init_events();
	init_API$2();
	init_NetworksConfigType();
	init_validation$1();
	init_getdata$1();
	sortTypeMapping = {
		general: SearchSortType.GENERAL,
		time_descending: SearchSortType.LATEST,
		popularity_descending: SearchSortType.MOST_POPULAR
	};
});
async function fetchEmojiList(options, cookie, requestConfig) {
	return fetchXiaohongshuInternal("emojiList", {}, {
		cookie,
		requestConfig
	});
}
var init_misc = __esmMin(() => {
	init_internal();
});
async function fetchHomeFeed(options = {}, cookie, requestConfig) {
	return fetchXiaohongshuInternal("homeFeed", options, {
		cookie,
		requestConfig
	});
}
async function fetchNoteDetail(options, cookie, requestConfig) {
	return fetchXiaohongshuInternal("noteDetail", options, {
		cookie,
		requestConfig
	});
}
async function fetchNoteComments(options, cookie, requestConfig) {
	return fetchXiaohongshuInternal("noteComments", options, {
		cookie,
		requestConfig
	});
}
var init_note = __esmMin(() => {
	init_internal();
});
async function searchNotes(options, cookie, requestConfig) {
	const { sort, note_type, ...rest } = options;
	return fetchXiaohongshuInternal("searchNotes", {
		...rest,
		sort: sort ? sortTypeMapping[sort] : void 0,
		note_type
	}, {
		cookie,
		requestConfig
	});
}
var init_search = __esmMin(() => {
	init_internal();
});
async function fetchUserProfile(options, cookie, requestConfig) {
	return fetchXiaohongshuInternal("userProfile", options, {
		cookie,
		requestConfig
	});
}
async function fetchUserNoteList(options, cookie, requestConfig) {
	return fetchXiaohongshuInternal("userNoteList", options, {
		cookie,
		requestConfig
	});
}
var init_user = __esmMin(() => {
	init_internal();
});
function createBoundXiaohongshuFetcher(cookie, requestConfig) {
	return {
		fetchHomeFeed: (options = {}, reqConfig) => fetchHomeFeed(options, cookie, reqConfig ?? requestConfig),
		fetchNoteDetail: (options, reqConfig) => fetchNoteDetail(options, cookie, reqConfig ?? requestConfig),
		fetchNoteComments: (options, reqConfig) => fetchNoteComments(options, cookie, reqConfig ?? requestConfig),
		fetchUserProfile: (options, reqConfig) => fetchUserProfile(options, cookie, reqConfig ?? requestConfig),
		fetchUserNoteList: (options, reqConfig) => fetchUserNoteList(options, cookie, reqConfig ?? requestConfig),
		searchNotes: (options, reqConfig) => searchNotes(options, cookie, reqConfig ?? requestConfig),
		fetchEmojiList: (options, reqConfig) => fetchEmojiList(options, cookie, reqConfig ?? requestConfig)
	};
}
var xiaohongshuFetcher$1;
var init_xiaohongshu$1 = __esmMin(() => {
	init_misc();
	init_note();
	init_search();
	init_user();
	init_misc();
	init_note();
	init_search();
	init_user();
	xiaohongshuFetcher$1 = {
		fetchHomeFeed,
		fetchNoteDetail,
		fetchNoteComments,
		fetchUserProfile,
		fetchUserNoteList,
		searchNotes,
		fetchEmojiList
	};
});
var init_types$2 = __esmMin(() => {});
var init_fetchers = __esmMin(() => {
	init_bilibili$2();
	init_douyin$2();
	init_kuaishou$1();
	init_xiaohongshu$1();
	init_types$2();
});
var RECOVERABLE_ERROR_CODES$1, DEFAULT_MAX_RETRIES, RETRY_DELAY_BASE, isRecoverableError, delay, createNetworkErrorResult, cleanUserAgent, fetchData, normalizeHeaders, fetchResponse, isNetworkErrorResult, getHeadersAndData;
var init_networks = __esmMin(() => {
	init_axios();
	init_NetworksConfigType();
	init_validation$1();
	init_events();
	RECOVERABLE_ERROR_CODES$1 = [
		"ECONNRESET",
		"ETIMEDOUT",
		"ECONNREFUSED",
		"ENOTFOUND",
		"ENETUNREACH",
		"EHOSTUNREACH",
		"EPIPE",
		"EAI_AGAIN",
		"ECONNABORTED"
	];
	DEFAULT_MAX_RETRIES = 3;
	RETRY_DELAY_BASE = 1e3;
	isRecoverableError = (error) => RECOVERABLE_ERROR_CODES$1.includes(error.code);
	delay = (ms) => new Promise((resolve$1) => setTimeout(resolve$1, ms));
	createNetworkErrorResult = (error, retries) => {
		const errorCode = error.code ?? "UNKNOWN";
		const message = `网络请求失败 [${errorCode}]: ${error.message} (已重试 ${retries} 次)`;
		return createErrorResponse({
			code: amagiAPIErrorCode.UNKNOWN,
			data: null,
			amagiError: {
				errorDescription: `${error.message} (已重试 ${retries} 次)`,
				requestType: error.config?.method?.toUpperCase() ?? "UNKNOWN",
				requestUrl: error.config?.url ?? "",
				responseCode: errorCode
			},
			amagiMessage: error.message
		}, message, 500);
	};
	cleanUserAgent = (userAgent) => userAgent.replace(/\s+Edg\/[\d\.]+/g, "");
	fetchData = async (config$1, maxRetries = DEFAULT_MAX_RETRIES) => {
		const cleanedConfig = { ...config$1 };
		if (cleanedConfig.headers && cleanedConfig.headers["User-Agent"]) cleanedConfig.headers["User-Agent"] = cleanUserAgent(cleanedConfig.headers["User-Agent"]);
		let lastError = null;
		for (let attempt = 0; attempt <= maxRetries; attempt++) try {
			return (await axios_default({
				...cleanedConfig,
				validateStatus: () => true
			})).data;
		} catch (error) {
			if (error instanceof AxiosError$1) {
				lastError = error;
				if (isRecoverableError(error) && attempt < maxRetries) {
					const delayMs = RETRY_DELAY_BASE * Math.pow(2, attempt);
					emitNetworkRetry({
						errorCode: error.code ?? "UNKNOWN",
						attempt: attempt + 1,
						maxRetries,
						delayMs,
						url: config$1.url
					});
					emitLog("warn", `网络请求失败 [${error.code}]，${delayMs}ms 后进行第 ${attempt + 1} 次重试...`);
					await delay(delayMs);
					continue;
				}
				emitNetworkError({
					errorCode: error.code ?? "UNKNOWN",
					message: error.message,
					retries: attempt,
					url: config$1.url
				});
				emitLog("error", "网络请求失败:", error.message);
				return createNetworkErrorResult(error, attempt);
			}
			throw error;
		}
		return createNetworkErrorResult(lastError, maxRetries);
	};
	normalizeHeaders = (headers) => {
		if (headers && typeof headers.toJSON === "function") return headers.toJSON();
		return headers ?? {};
	};
	fetchResponse = async (config$1, maxRetries = DEFAULT_MAX_RETRIES) => {
		const cleanedConfig = { ...config$1 };
		if (cleanedConfig.headers && cleanedConfig.headers["User-Agent"]) cleanedConfig.headers["User-Agent"] = cleanUserAgent(cleanedConfig.headers["User-Agent"]);
		let lastError = null;
		for (let attempt = 0; attempt <= maxRetries; attempt++) try {
			return await axios_default({
				...cleanedConfig,
				validateStatus: () => true
			});
		} catch (error) {
			if (error instanceof AxiosError$1) {
				lastError = error;
				if (isRecoverableError(error) && attempt < maxRetries) {
					const delayMs = RETRY_DELAY_BASE * Math.pow(2, attempt);
					emitNetworkRetry({
						errorCode: error.code ?? "UNKNOWN",
						attempt: attempt + 1,
						maxRetries,
						delayMs,
						url: config$1.url
					});
					emitLog("warn", `网络请求失败 [${error.code}]，${delayMs}ms 后进行第 ${attempt + 1} 次重试...`);
					await delay(delayMs);
					continue;
				}
				emitNetworkError({
					errorCode: error.code ?? "UNKNOWN",
					message: error.message,
					retries: attempt,
					url: config$1.url
				});
				emitLog("error", "网络请求失败:", error.message);
				return createNetworkErrorResult(error, attempt);
			}
			throw error;
		}
		return createNetworkErrorResult(lastError, maxRetries);
	};
	isNetworkErrorResult = (result) => {
		if (result === null || typeof result !== "object") return false;
		const obj = result;
		return obj.success === false && obj.error !== null && typeof obj.error === "object" && "amagiError" in obj.error;
	};
	getHeadersAndData = async (config$1, maxRetries = DEFAULT_MAX_RETRIES) => {
		const response = await fetchResponse(config$1, maxRetries);
		if ("success" in response && response.success === false) return response;
		return {
			headers: normalizeHeaders(response.headers),
			data: response.data
		};
	};
}), SimpleLogger, logger$1;
var init_logger = __esmMin(() => {
	init_source();
	init_events();
	SimpleLogger = class {
		chalk;
		red;
		green;
		yellow;
		blue;
		magenta;
		cyan;
		white;
		gray;
		constructor() {
			this.chalk = new Chalk();
			this.red = this.chalk.red;
			this.green = this.chalk.green;
			this.yellow = this.chalk.yellow;
			this.blue = this.chalk.blue;
			this.magenta = this.chalk.magenta;
			this.cyan = this.chalk.cyan;
			this.white = this.chalk.white;
			this.gray = this.chalk.gray;
		}
		info(message, ...args) {
			emitLog("info", String(message), ...args);
		}
		warn(message, ...args) {
			emitLog("warn", String(message), ...args);
		}
		error(message, ...args) {
			emitLog("error", String(message), ...args);
		}
		mark(message, ...args) {
			emitLog("mark", String(message), ...args);
		}
		debug(message, ...args) {
			emitLog("debug", String(message), ...args);
		}
	};
	logger$1 = new SimpleLogger();
	new SimpleLogger();
});
var init_model = __esmMin(() => {
	init_events();
	init_fetchers();
	init_networks();
	init_logger();
});
var qtparam;
var init_qtparam = __esmMin(() => {
	init_model();
	init_bilibili$1();
	qtparam = async (BASEURL, cookie) => {
		if (cookie === "") return {
			QUERY: "&platform=html5",
			STATUS: "!isLogin"
		};
		const logininfo = await fetchData({
			url: bilibiliApiUrls.getLoginStatus(),
			headers: { Cookie: cookie }
		});
		const sign = await wbi_sign(BASEURL, cookie);
		const qn = [
			6,
			16,
			32,
			64,
			74,
			80,
			112,
			116,
			120,
			125,
			126,
			127
		];
		let isvip;
		logininfo.data.vipStatus === 1 ? isvip = true : isvip = false;
		if (isvip) return {
			QUERY: `&fnval=4048&fourk=1&${sign}`,
			STATUS: "isLogin",
			isvip
		};
		else return {
			QUERY: `&qn=${qn[3]}&fnval=16&${sign}`,
			STATUS: "isLogin",
			isvip
		};
	};
});
var XOR_CODE, MASK_CODE, MAX_AID, BASE, data, av2bv, bv2av;
var init_bv2av = __esmMin(() => {
	XOR_CODE = 23442827791579n;
	MASK_CODE = 2251799813685247n;
	MAX_AID = 1n << 51n;
	BASE = 58n;
	data = "FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf";
	av2bv = (aid) => {
		const bytes = [
			"B",
			"V",
			"1",
			"0",
			"0",
			"0",
			"0",
			"0",
			"0",
			"0",
			"0",
			"0"
		];
		let bvIndex = bytes.length - 1;
		let tmp = (MAX_AID | BigInt(aid)) ^ XOR_CODE;
		while (tmp > 0) {
			bytes[bvIndex] = data[Number(tmp % BigInt(BASE))];
			tmp = tmp / BASE;
			bvIndex -= 1;
		}
		[bytes[3], bytes[9]] = [bytes[9], bytes[3]];
		[bytes[4], bytes[7]] = [bytes[7], bytes[4]];
		return bytes.join("");
	};
	bv2av = (bvid) => {
		const bvidArr = Array.from(bvid);
		[bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
		[bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
		bvidArr.splice(0, 3);
		const tmp = bvidArr.reduce((pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)), 0n);
		return Number(tmp & MASK_CODE ^ XOR_CODE);
	};
});
function getProtoType() {
	if (DmSegMobileReplyType) return DmSegMobileReplyType;
	DmSegMobileReplyType = import_protobufjs.default.Root.fromJSON(DANMAKU_PROTO_JSON).lookupType("bilibili.community.service.dm.v1.DmSegMobileReply");
	return DmSegMobileReplyType;
}
function parseDmSegMobileReply(data$1) {
	const messageType = getProtoType();
	const buffer = data$1 instanceof Uint8Array ? data$1 : new Uint8Array(data$1);
	const message = messageType.decode(buffer);
	return messageType.toObject(message, {
		longs: String,
		defaults: true
	});
}
var import_protobufjs, DANMAKU_PROTO_JSON, DmSegMobileReplyType;
var init_danmaku_proto = __esmMin(() => {
	import_protobufjs = __toESM(require_protobufjs(), 1);
	DANMAKU_PROTO_JSON = { nested: { bilibili: { nested: { community: { nested: { service: { nested: { dm: { nested: { v1: { nested: {
		DmSegMobileReply: { fields: { elems: {
			rule: "repeated",
			type: "DanmakuElem",
			id: 1
		} } },
		DanmakuElem: { fields: {
			id: {
				type: "int64",
				id: 1
			},
			progress: {
				type: "int32",
				id: 2
			},
			mode: {
				type: "int32",
				id: 3
			},
			fontsize: {
				type: "int32",
				id: 4
			},
			color: {
				type: "uint32",
				id: 5
			},
			midHash: {
				type: "string",
				id: 6
			},
			content: {
				type: "string",
				id: 7
			},
			ctime: {
				type: "int64",
				id: 8
			},
			weight: {
				type: "int32",
				id: 9
			},
			action: {
				type: "string",
				id: 10
			},
			pool: {
				type: "int32",
				id: 11
			},
			idStr: {
				type: "string",
				id: 12
			},
			attr: {
				type: "int32",
				id: 13
			},
			animation: {
				type: "string",
				id: 22
			}
		} }
	} } } } } } } } } } } };
	DmSegMobileReplyType = null;
});
var mixinKeyEncTab, getMixinKey, encWbi, getWbiKeys, wbi_sign;
var init_wbi = __esmMin(() => {
	init_axios();
	mixinKeyEncTab = [
		46,
		47,
		18,
		2,
		53,
		8,
		23,
		32,
		15,
		50,
		10,
		31,
		58,
		3,
		45,
		35,
		27,
		43,
		5,
		49,
		33,
		9,
		42,
		19,
		29,
		28,
		14,
		39,
		12,
		38,
		41,
		13,
		37,
		48,
		7,
		16,
		24,
		55,
		40,
		61,
		26,
		17,
		0,
		1,
		60,
		51,
		30,
		4,
		22,
		25,
		54,
		21,
		56,
		59,
		6,
		63,
		57,
		62,
		11,
		36,
		20,
		34,
		44,
		52
	];
	getMixinKey = (orig) => mixinKeyEncTab.map((n) => orig[n]).join("").slice(0, 32);
	encWbi = (params, img_key, sub_key) => {
		const mixin_key = getMixinKey(img_key + sub_key);
		const curr_time = Math.round(Date.now() / 1e3);
		const chr_filter = /[!'()*]/g;
		Object.assign(params, { wts: curr_time });
		const query = Object.keys(params).sort().map((key) => {
			const value = params[key].toString().replace(chr_filter, "");
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
		}).join("&");
		return `&wts=${curr_time}&w_rid=${crypto.createHash("md5").update(query + mixin_key).digest("hex")}`;
	};
	getWbiKeys = async (cookie) => {
		const { data: { wbi_img: { img_url, sub_url } } } = (await axios_default("https://api.bilibili.com/x/web-interface/nav", { headers: { Cookie: cookie } })).data;
		return {
			img_key: img_url.slice(img_url.lastIndexOf("/") + 1, img_url.lastIndexOf(".")),
			sub_key: sub_url.slice(sub_url.lastIndexOf("/") + 1, sub_url.lastIndexOf("."))
		};
	};
	wbi_sign = async (BASEURL, cookie) => {
		const web_keys = await getWbiKeys(cookie);
		const url = new URL(BASEURL);
		const params = {};
		for (const [key, value] of url.searchParams.entries()) params[key] = value;
		return encWbi(params, web_keys.img_key, web_keys.sub_key);
	};
});
var fetchBilibili, GlobalGetData, bilibiliErrorCodeMap;
var init_getdata = __esmMin(() => {
	init_model();
	init_defaultConfigs();
	init_NetworksConfigType();
	init_API$3();
	init_qtparam();
	init_bv2av();
	init_danmaku_proto();
	init_wbi();
	fetchBilibili = async (data$1, cookie, requestConfig) => {
		const baseRequestConfig = getBilibiliDefaultConfig(cookie, requestConfig);
		switch (data$1.methodType) {
			case "videoInfo": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getVideoInfo({ bvid: data$1.bvid })
			});
			case "videoStream": {
				const sign = await qtparam(bilibiliApiUrls.getVideoStream({
					avid: data$1.avid,
					cid: data$1.cid
				}), baseRequestConfig.headers?.Cookie);
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					url: bilibiliApiUrls.getVideoStream({
						avid: data$1.avid,
						cid: data$1.cid
					}) + sign.QUERY
				});
			}
			case "comments": {
				let { oid: oid$1, number, type, mode, pagination_str, plat, seek_rpid, web_location } = data$1;
				let fetchedComments = [];
				const maxRequestCount = 100;
				let requestCount = 0;
				let tmpresp;
				let nextPaginationStr = pagination_str;
				let isEnd = false;
				const checkStatusUrl = bilibiliApiUrls.getCommentStatus({
					oid: oid$1,
					type
				});
				if ((await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					url: checkStatusUrl
				})).data === null) {
					logger$1.error("评论区未开放");
					return {
						code: 404,
						message: "评论区未开放",
						data: null
					};
				}
				while (fetchedComments.length < Number(number ?? 20) && requestCount < maxRequestCount && !isEnd) {
					const baseUrl = bilibiliApiUrls.getComments({
						type,
						oid: oid$1,
						mode: mode ?? 3,
						pagination_str: nextPaginationStr,
						plat: plat ?? 1,
						seek_rpid,
						web_location: web_location ?? "1315875"
					});
					const finalUrl = baseUrl + await wbi_sign(baseUrl, baseRequestConfig.headers?.cookie);
					const response = await GlobalGetData(data$1.methodType, {
						...baseRequestConfig,
						url: finalUrl
					});
					tmpresp = response;
					const currentComments = response.data?.replies ?? [];
					fetchedComments.push(...currentComments);
					if (response.data?.cursor) {
						nextPaginationStr = response.data.cursor.pagination_reply?.next_offset;
						isEnd = response.data.cursor.is_end;
					} else isEnd = true;
					requestCount++;
					if (isEnd || currentComments.length === 0 || !nextPaginationStr) {
						logger$1.info("已到达评论末尾或无更多评论");
						break;
					}
				}
				return {
					...tmpresp,
					data: {
						...tmpresp.data,
						replies: Array.from(new Map(fetchedComments.map((item) => [item.rpid, item])).values()).slice(0, Number(data$1.number ?? 20))
					}
				};
			}
			case "commentReplies": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getCommentReplies(data$1)
			});
			case "emojiList": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getEmojiList()
			});
			case "bangumiInfo": {
				let id = data$1.ep_id ?? data$1.season_id;
				if (!id) return false;
				const idType = id ? id.startsWith("ep") ? "ep_id" : "season_id" : "ep_id";
				const newId = idType === "ep_id" ? id.replace("ep", "") : id.replace("ss", "");
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					url: bilibiliApiUrls.getBangumiInfo({ [idType]: newId })
				});
			}
			case "bangumiStream": {
				const sign = await qtparam(bilibiliApiUrls.getBangumiStream({
					cid: data$1.cid,
					ep_id: data$1.ep_id.replace("ep", "")
				}), baseRequestConfig.headers?.cookie);
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					url: bilibiliApiUrls.getBangumiStream({
						cid: data$1.cid,
						ep_id: data$1.ep_id.replace("ep", "")
					}) + sign.QUERY
				});
			}
			case "userDynamicList": {
				const { host_mid } = data$1;
				const hasExternalReferer = requestConfig?.headers && ("referer" in requestConfig.headers || "Referer" in requestConfig.headers);
				const customHeaders = {
					...baseRequestConfig.headers,
					Origin: "https://space.bilibili.com",
					...!hasExternalReferer && { Referer: `https://space.bilibili.com/${host_mid}/dynamic` }
				};
				const wbiSignQuery = await wbi_sign(bilibiliApiUrls.getUserDynamicList({ host_mid }), baseRequestConfig.headers?.cookie);
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					headers: customHeaders,
					url: bilibiliApiUrls.getUserDynamicList({ host_mid }) + wbiSignQuery
				});
			}
			case "dynamicDetail": {
				const hasExternalReferer = requestConfig?.headers && "referer" in requestConfig.headers;
				const customHeaders = {
					...baseRequestConfig.headers,
					...!hasExternalReferer && { Referer: void 0 }
				};
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					headers: customHeaders,
					url: bilibiliApiUrls.getDynamicDetail({ dynamic_id: data$1.dynamic_id })
				});
			}
			case "dynamicCard": {
				const { dynamic_id } = data$1;
				const hasExternalReferer = requestConfig?.headers && "referer" in requestConfig.headers;
				const customHeaders = {
					...baseRequestConfig.headers,
					...!hasExternalReferer && { Referer: void 0 }
				};
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					headers: customHeaders,
					url: bilibiliApiUrls.getDynamicCard({ dynamic_id })
				});
			}
			case "userCard": {
				const { host_mid } = data$1;
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					url: bilibiliApiUrls.getUserCard({ host_mid })
				});
			}
			case "userSpaceInfo": {
				const wbiSignQuery = await wbi_sign(bilibiliApiUrls.getUserSpaceInfo({ host_mid: data$1.host_mid }), baseRequestConfig.headers?.cookie);
				return await GlobalGetData(data$1.methodType, {
					...baseRequestConfig,
					url: bilibiliApiUrls.getUserSpaceInfo({ host_mid: data$1.host_mid }) + wbiSignQuery
				});
			}
			case "liveRoomInfo": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getLiveRoomInfo({ room_id: data$1.room_id })
			});
			case "liveRoomInit": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getLiveRoomInit({ room_id: data$1.room_id })
			});
			case "loginQrcode": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getLoginQrcode()
			});
			case "qrcodeStatus": try {
				const result = await getHeadersAndData({
					...baseRequestConfig,
					url: bilibiliApiUrls.getQrcodeStatus({ qrcode_key: data$1.qrcode_key })
				});
				if (isNetworkErrorResult(result)) {
					const networkError = new Error(result.error.amagiError.errorDescription);
					Object.assign(networkError, {
						code: result.error.code,
						data: null,
						amagiError: {
							...result.error.amagiError,
							requestType: data$1.methodType
						}
					});
					throw networkError;
				}
				if (result.data.code !== 0) {
					const Err = {
						errorDescription: `获取响应数据失败！原因：${bilibiliErrorCodeMap[String(result.data.code)] || result.data.message || "未知错误"}！`,
						requestType: data$1.methodType,
						requestUrl: bilibiliApiUrls.getQrcodeStatus({ qrcode_key: data$1.qrcode_key })
					};
					return {
						code: result.data.code,
						data: result.data,
						amagiError: Err
					};
				}
				return {
					code: 0,
					data: {
						data: result.data.data,
						headers: result.headers
					},
					message: "0"
				};
			} catch (error) {
				if (error && typeof error === "object") return error;
				return {
					code: amagiAPIErrorCode.UNKNOWN,
					data: error.data,
					amagiError: {
						errorDescription: "未知错误",
						requestType: data$1.methodType,
						requestUrl: bilibiliApiUrls.getQrcodeStatus({ qrcode_key: data$1.qrcode_key })
					}
				};
			}
			case "loginStatus": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getLoginStatus()
			});
			case "uploaderTotalViews": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getUploaderTotalViews({ host_mid: data$1.host_mid })
			});
			case "avToBv": return {
				code: 0,
				message: "success",
				data: { bvid: av2bv(Number(data$1.avid.toString().replace(/^av/i, ""))) }
			};
			case "bvToAv": return {
				code: 0,
				message: "success",
				data: { aid: "av" + bv2av(data$1.bvid) }
			};
			case "articleContent": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getArticleContent({ id: data$1.id })
			});
			case "articleCards": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getArticleCards({ ids: data$1.ids })
			});
			case "articleInfo": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getArticleInfo({ id: data$1.id })
			});
			case "articleListInfo": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				url: bilibiliApiUrls.getArticleListInfo({ id: data$1.id })
			});
			case "captchaFromVoucher": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				method: "POST",
				url: bilibiliApiUrls.getCaptchaFromVoucher(data$1).Url,
				data: bilibiliApiUrls.getCaptchaFromVoucher(data$1).Body
			});
			case "validateCaptcha": return await GlobalGetData(data$1.methodType, {
				...baseRequestConfig,
				method: "POST",
				url: bilibiliApiUrls.validateCaptcha(data$1).Url,
				data: bilibiliApiUrls.validateCaptcha(data$1).Body
			});
			case "videoDanmaku": {
				const url = bilibiliApiUrls.getVideoDanmaku({
					cid: data$1.cid,
					segment_index: data$1.segment_index
				});
				try {
					const response = await fetchData({
						...baseRequestConfig,
						url,
						responseType: "arraybuffer"
					});
					if (isNetworkErrorResult(response)) {
						const networkError = new Error(response.error.amagiError.errorDescription);
						Object.assign(networkError, {
							code: response.error.code,
							data: null,
							amagiError: {
								...response.error.amagiError,
								requestType: data$1.methodType
							}
						});
						throw networkError;
					}
					return {
						code: 0,
						message: "success",
						data: { elems: parseDmSegMobileReply(response).elems }
					};
				} catch (error) {
					if (error && typeof error === "object" && "code" in error) return error;
					const Err = {
						errorDescription: `获取弹幕数据失败：${error instanceof Error ? error.message : "未知错误"}`,
						requestType: data$1.methodType,
						requestUrl: url
					};
					return {
						code: amagiAPIErrorCode.UNKNOWN,
						data: null,
						amagiError: Err
					};
				}
			}
			default:
				logger$1.warn(`未知的B站数据接口：「${logger$1.red(data$1.methodType)}」`);
				return null;
		}
	};
	GlobalGetData = async (type, options, retryCount = 0) => {
		const MAX_RETRIES = 3;
		let warningMessage = "";
		try {
			const result = await fetchData(options);
			if (isNetworkErrorResult(result)) {
				const networkError = new Error(result.error.amagiError.errorDescription);
				Object.assign(networkError, {
					code: result.error.code,
					data: null,
					amagiError: {
						...result.error.amagiError,
						requestType: type
					}
				});
				throw networkError;
			}
			if (!result || result === "") {
				const Err = {
					errorDescription: "获取响应数据失败！接口返回内容为空，你的B站ck可能已经失效！",
					requestType: type ?? "未知请求类型",
					requestUrl: options.url
				};
				warningMessage = `\n      获取响应数据失败！原因：${logger$1.yellow("接口返回内容为空，你的B站ck可能已经失效！")}\n      请求类型：「${type}」\n      请求URL：${options.url}\n      `;
				logger$1.warn(warningMessage);
				const riskError = new Error(Err.errorDescription);
				Object.assign(riskError, {
					code: bilibiliAPIErrorCode.RISK_CONTROL_FAILED,
					data: result,
					amagiError: Err
				});
				throw riskError;
			}
			if (result.code !== 0 || !result.data || typeof result.data === "object" && Object.keys(result.data).length === 0) {
				if (result.code === -412 && retryCount < MAX_RETRIES) return await GlobalGetData(type, options, retryCount + 1);
				const errorMessage = bilibiliErrorCodeMap[result.code] || typeof result.data === "object" && Object.keys(result.data).length === 0 && "请求成功但无返回内容" || (result.message ?? "未知错误");
				const Err = {
					errorDescription: `获取响应数据失败！原因：${errorMessage}！`,
					requestType: type ?? "未知请求类型",
					requestUrl: options.url,
					responseCode: result.code
				};
				warningMessage = `\n      获取响应数据失败！原因：${logger$1.yellow(errorMessage)}\n      错误代码：${result.code}\n      请求类型：「${type}」\n      请求URL：${options.url}\n      `;
				logger$1.warn(warningMessage);
				const apiError = new Error(Err.errorDescription);
				Object.assign(apiError, {
					code: result.code,
					data: result,
					amagiError: Err
				});
				throw apiError;
			}
			return result;
		} catch (error) {
			if (error && typeof error === "object") return {
				...error,
				amagiMessage: warningMessage
			};
			return {
				code: amagiAPIErrorCode.UNKNOWN,
				data: error.data,
				amagiError: {
					errorDescription: "未知错误",
					requestType: type,
					requestUrl: options.url
				},
				amagiMessage: warningMessage
			};
		}
	};
	bilibiliErrorCodeMap = {
		"-1": "应用程序不存在或已被封禁",
		"-2": "Access Key 错误",
		"-3": "API 校验密匙错误",
		"-4": "调用方对该 Method 没有权限",
		"-101": "账号未登录",
		"-102": "账号被封停",
		"-103": "积分不足",
		"-104": "硬币不足",
		"-105": "验证码错误",
		"-106": "账号非正式会员或在适应期",
		"-107": "应用不存在或者被封禁",
		"-108": "未绑定手机",
		"-110": "未绑定手机",
		"-111": "csrf 校验失败",
		"-112": "系统升级中",
		"-113": "账号尚未实名认证",
		"-114": "请先绑定手机",
		"-115": "请先完成实名认证",
		"-304": "木有改动",
		"-307": "撞车跳转",
		"-352": "风控校验失败 (UA 或 wbi 参数不合法)",
		"-400": "请求错误",
		"-401": "未认证 (或非法请求)",
		"-403": "访问权限不足",
		"-404": "啥都木有",
		"-405": "不支持该方法",
		"-409": "冲突",
		"-412": "请求被拦截 (客户端 ip 被服务端风控)",
		"-500": "服务器错误",
		"-503": "过载保护,服务暂不可用",
		"-504": "服务调用超时",
		"-509": "超出限制",
		"-616": "上传文件不存在",
		"-617": "上传文件太大",
		"-625": "登录失败次数太多",
		"-626": "用户不存在",
		"-628": "密码太弱",
		"-629": "用户名或密码错误",
		"-632": "操作对象数量限制",
		"-643": "被锁定",
		"-650": "用户等级太低",
		"-652": "重复的用户",
		"-658": "Token 过期",
		"-662": "密码时间戳过期",
		"-688": "地理区域限制",
		"-689": "版权限制",
		"-701": "扣节操失败",
		"-799": "请求过于频繁，请稍后再试",
		"-8888": "对不起，服务器开小差了~ (ಥ﹏ಥ)",
		1e5: "验证码获取失败",
		100003: "验证码过期"
	};
});
var ApiError, ValidationError, handleError;
var init_errors = __esmMin(() => {
	init_zod();
	ApiError = class extends Error {
		code;
		platform;
		constructor(message, code = 500, platform$1 = "unknown") {
			super(message);
			this.name = "ApiError";
			this.code = code;
			this.platform = platform$1;
		}
	};
	ValidationError = class ValidationError extends Error {
		errors;
		requestPath;
		constructor(message, errors, requestPath) {
			super(message);
			this.name = "ValidationError";
			this.errors = errors;
			this.requestPath = requestPath;
		}
		static fromZodError(zodError, requestPath) {
			return new ValidationError("参数验证失败", zodError.issues.map((err) => ({
				field: err.path.join("."),
				message: err.message
			})), requestPath);
		}
	};
	handleError = (error, requestPath) => {
		if (error instanceof ValidationError) return {
			code: 400,
			message: error.message,
			data: null,
			errors: error.errors,
			requestPath: error.requestPath ?? requestPath
		};
		if (error instanceof ApiError) return {
			code: error.code,
			message: error.message,
			data: null,
			platform: error.platform,
			requestPath
		};
		if (error instanceof zod_default.ZodError) return handleError(ValidationError.fromZodError(error, requestPath), requestPath);
		return {
			code: 500,
			message: error instanceof Error ? error.message : "未知错误",
			data: null,
			requestPath
		};
	};
});
var createValidationMiddleware, createDouyinValidationMiddleware, createBilibiliValidationMiddleware, createKuaishouValidationMiddleware, createXiaohongshuValidationMiddleware;
var init_validation = __esmMin(() => {
	init_errors();
	init_validation$1();
	createValidationMiddleware = (validateFn, methodType) => (req, res, next) => {
		try {
			req.validatedParams = validateFn(methodType, {
				...req.query,
				...req.body
			});
			next();
		} catch (error) {
			const errorResponse = handleError(error, req.originalUrl);
			res.status(errorResponse.code || 500).json(errorResponse);
		}
	};
	createDouyinValidationMiddleware = (methodType) => createValidationMiddleware(validateDouyinParams, methodType);
	createBilibiliValidationMiddleware = (methodType) => createValidationMiddleware(validateBilibiliParams, methodType);
	createKuaishouValidationMiddleware = (methodType) => createValidationMiddleware(validateKuaishouParams, methodType);
	createXiaohongshuValidationMiddleware = (methodType) => createValidationMiddleware(validateXiaohongshuParams, methodType);
});
var import_express$4, createBilibiliRouteHandler, createBilibiliRoutes;
var init_routes$3 = __esmMin(() => {
	init_validation();
	init_internal$3();
	init_defaultConfigs();
	init_errors();
	init_bilibili$3();
	import_express$4 = __toESM(require_express(), 1);
	createBilibiliRouteHandler = (methodType, cookie, requestConfig = getBilibiliDefaultConfig(cookie)) => async (req, res) => {
		try {
			const result = await fetchBilibiliInternal(methodType, req.validatedParams, {
				cookie,
				requestConfig
			});
			res.json({
				...result,
				requestPath: req.originalUrl
			});
		} catch (error) {
			const errorResponse = handleError(error);
			res.status(errorResponse.code || 500).json({
				...errorResponse,
				requestPath: req.originalUrl
			});
		}
	};
	createBilibiliRoutes = (cookie, requestConfig = getBilibiliDefaultConfig(cookie)) => {
		const router$2 = import_express$4.Router();
		for (const [method, path$1] of Object.entries(BilibiliMethodRoutes)) router$2.get(path$1, createBilibiliValidationMiddleware(method), createBilibiliRouteHandler(method, cookie, requestConfig));
		return router$2;
	};
});
var bilibiliUtils;
var init_bilibili$1 = __esmMin(() => {
	init_API$3();
	init_BilibiliApi();
	init_getdata();
	init_qtparam();
	init_bv2av();
	init_danmaku_proto();
	init_wbi();
	init_BilibiliApi();
	init_routes$3();
	bilibiliUtils = {
		sign: {
			wbi_sign,
			av2bv,
			bv2av
		},
		danmaku: { parseDmSegMobileReply },
		bilibiliApiUrls,
		api: bilibili$1
	};
});
var createDeprecatedStub$2, douyin$1, createBoundDouyinApi;
var init_DouyinApi = __esmMin(() => {
	init_deprecation();
	createDeprecatedStub$2 = (methodName) => (..._args) => {
		checkDeprecation("getDouyinData");
		throw new Error(`douyin.${methodName} 已废弃，请使用 douyinFetcher 替代`);
	};
	douyin$1 = {
		getTextWorkInfo: createDeprecatedStub$2("getTextWorkInfo"),
		getWorkInfo: createDeprecatedStub$2("getWorkInfo"),
		getVideoWorkInfo: createDeprecatedStub$2("getVideoWorkInfo"),
		getImageAlbumWorkInfo: createDeprecatedStub$2("getImageAlbumWorkInfo"),
		getSlidesWorkInfo: createDeprecatedStub$2("getSlidesWorkInfo"),
		getComments: createDeprecatedStub$2("getComments"),
		getCommentReplies: createDeprecatedStub$2("getCommentReplies"),
		getUserProfile: createDeprecatedStub$2("getUserProfile"),
		getEmojiList: createDeprecatedStub$2("getEmojiList"),
		getEmojiProList: createDeprecatedStub$2("getEmojiProList"),
		getUserVideos: createDeprecatedStub$2("getUserVideos"),
		getMusicInfo: createDeprecatedStub$2("getMusicInfo"),
		getSuggestWords: createDeprecatedStub$2("getSuggestWords"),
		search: createDeprecatedStub$2("search"),
		getLiveRoomInfo: createDeprecatedStub$2("getLiveRoomInfo"),
		getDanmaku: createDeprecatedStub$2("getDanmaku"),
		invoke: createDeprecatedStub$2("invoke")
	};
	createBoundDouyinApi = (_cookie, _requestConfig) => ({
		...douyin$1,
		getSearchData: createDeprecatedStub$2("getSearchData")
	});
});
var import_express$3, createDouyinRouteHandler, createDouyinRoutes;
var init_routes$2 = __esmMin(() => {
	init_validation();
	init_internal$2();
	init_defaultConfigs();
	init_errors();
	init_douyin$3();
	import_express$3 = __toESM(require_express(), 1);
	createDouyinRouteHandler = (methodType, cookie, requestConfig = getDouyinDefaultConfig(cookie)) => async (req, res) => {
		try {
			const result = await fetchDouyinInternal(methodType, req.validatedParams, {
				cookie,
				requestConfig
			});
			res.json({
				...result,
				requestPath: req.originalUrl
			});
		} catch (error) {
			const errorResponse = handleError(error);
			res.status(errorResponse.code || 500).json({
				...errorResponse,
				requestPath: req.originalUrl
			});
		}
	};
	createDouyinRoutes = (cookie, requestConfig = getDouyinDefaultConfig(cookie)) => {
		const router$2 = import_express$3.Router();
		for (const [method, path$1] of Object.entries(DouyinMethodRoutes)) router$2.get(path$1, createDouyinValidationMiddleware(method), createDouyinRouteHandler(method, cookie, requestConfig));
		return router$2;
	};
});
var douyinUtils;
var init_douyin$1 = __esmMin(() => {
	init_API$1();
	init_DouyinApi();
	init_sign();
	init_DouyinApi();
	init_routes$2();
	douyinUtils = {
		sign: douyinSign,
		douyinApiUrls,
		api: douyin$1
	};
});
var createDeprecatedStub$1, kuaishou$1, createBoundKuaishouApi;
var init_KuaishouApi = __esmMin(() => {
	init_deprecation();
	createDeprecatedStub$1 = (methodName) => (..._args) => {
		checkDeprecation("getKuaishouData");
		throw new Error(`kuaishou.${methodName} 已废弃，请使用 kuaishouFetcher 替代`);
	};
	kuaishou$1 = {
		getWorkInfo: createDeprecatedStub$1("getWorkInfo"),
		getComments: createDeprecatedStub$1("getComments"),
		getEmojiList: createDeprecatedStub$1("getEmojiList")
	};
	createBoundKuaishouApi = (_cookie, _requestConfig) => ({ ...kuaishou$1 });
});
var import_express$2, createKuaishouRouteHandler, createKuaishouRoutes;
var init_routes$1 = __esmMin(() => {
	init_validation();
	init_internal$1();
	init_defaultConfigs();
	init_errors();
	init_kuaishou$2();
	import_express$2 = __toESM(require_express(), 1);
	createKuaishouRouteHandler = (methodType, cookie, requestConfig = getKuaishouDefaultConfig(cookie)) => async (req, res) => {
		try {
			const result = await fetchKuaishouInternal(methodType, req.validatedParams, {
				cookie,
				requestConfig
			});
			res.json({
				...result,
				requestPath: req.originalUrl
			});
		} catch (error) {
			const errorResponse = handleError(error);
			res.status(errorResponse.code || 500).json({
				...errorResponse,
				requestPath: req.originalUrl
			});
		}
	};
	createKuaishouRoutes = (cookie, requestConfig = getKuaishouDefaultConfig(cookie)) => {
		const router$2 = import_express$2.Router();
		for (const [method, path$1] of Object.entries(KuaishouMethodRoutes)) router$2.get(path$1, createKuaishouValidationMiddleware(method), createKuaishouRouteHandler(method, cookie, requestConfig));
		return router$2;
	};
});
var kuaishouUtils;
var init_kuaishou = __esmMin(() => {
	init_API();
	init_KuaishouApi();
	init_routes$1();
	init_KuaishouApi();
	init_routes$1();
	kuaishouUtils = {
		kuaishouApiUrls,
		api: kuaishou$1
	};
});
var createDeprecatedStub, xiaohongshu$1, createBoundXiaohongshuApi;
var init_XiaohongshuApi = __esmMin(() => {
	init_deprecation();
	createDeprecatedStub = (methodName) => (..._args) => {
		checkDeprecation("getXiaohongshuData");
		throw new Error(`xiaohongshu.${methodName} 已废弃，请使用 xiaohongshuFetcher 替代`);
	};
	xiaohongshu$1 = {
		getHomeFeed: createDeprecatedStub("getHomeFeed"),
		getNote: createDeprecatedStub("getNote"),
		getComments: createDeprecatedStub("getComments"),
		getUser: createDeprecatedStub("getUser"),
		getUserNotes: createDeprecatedStub("getUserNotes"),
		getSearchNotes: createDeprecatedStub("getSearchNotes"),
		getEmojiList: createDeprecatedStub("getEmojiList")
	};
	createBoundXiaohongshuApi = (_cookie, _requestConfig) => ({ ...xiaohongshu$1 });
});
var import_express$1, createXiaohongshuRouteHandler, createXiaohongshuRoutes;
var init_routes = __esmMin(() => {
	init_validation();
	init_internal();
	init_defaultConfigs();
	init_errors();
	init_xiaohongshu$2();
	import_express$1 = __toESM(require_express(), 1);
	createXiaohongshuRouteHandler = (methodType, cookie, requestConfig = getXiaohongshuDefaultConfig(cookie)) => async (req, res) => {
		try {
			const result = await fetchXiaohongshuInternal(methodType, req.validatedParams, {
				cookie,
				requestConfig
			});
			res.json({
				...result,
				requestPath: req.originalUrl
			});
		} catch (error) {
			const errorResponse = handleError(error);
			res.status(errorResponse.code || 500).json({
				...errorResponse,
				requestPath: req.originalUrl
			});
		}
	};
	createXiaohongshuRoutes = (cookie, requestConfig = getXiaohongshuDefaultConfig(cookie)) => {
		const router$2 = import_express$1.Router();
		for (const [method, path$1] of Object.entries(XiaohongshuMethodRoutes)) router$2.get(path$1, createXiaohongshuValidationMiddleware(method), createXiaohongshuRouteHandler(method, cookie, requestConfig));
		return router$2;
	};
});
var xiaohongshuUtils;
var init_xiaohongshu = __esmMin(() => {
	init_API$2();
	init_sign$1();
	init_XiaohongshuApi();
	init_routes();
	init_XiaohongshuApi();
	xiaohongshuUtils = {
		sign: xiaohongshuSign,
		xiaohongshuApiUrls,
		api: xiaohongshu$1
	};
});
var init_platform = __esmMin(() => {
	init_bilibili$1();
	init_douyin$1();
	init_kuaishou();
	init_xiaohongshu();
});
var import_express, chalk, createAmagiClient;
var init_server = __esmMin(() => {
	init_events();
	init_fetchers();
	init_platform();
	init_BilibiliApi();
	init_DouyinApi();
	init_KuaishouApi();
	init_xiaohongshu();
	init_deprecation();
	init_source();
	import_express = __toESM(require_express(), 1);
	chalk = new Chalk();
	createAmagiClient = (options) => {
		const douyinCookie = options?.cookies?.douyin ?? "";
		const bilibiliCookie = options?.cookies?.bilibili ?? "";
		const kuaishouCookie = options?.cookies?.kuaishou ?? "";
		const xiaohongshuCookie = options?.cookies?.xiaohongshu ?? "";
		const requestConfig = options?.request ?? {};
		const startServer = (port = 4567) => {
			const app$2 = (0, import_express.default)();
			app$2.use(import_express.json());
			app$2.use(import_express.urlencoded({ extended: true }));
			app$2.get("/", (_req, res) => {
				res.redirect(301, "https://amagi.apifox.cn");
			});
			app$2.get("/docs", (_req, res) => {
				res.redirect(301, "https://amagi.apifox.cn");
			});
			app$2.use("/api/douyin", createDouyinRoutes(douyinCookie, requestConfig));
			app$2.use("/api/bilibili", createBilibiliRoutes(bilibiliCookie, requestConfig));
			app$2.use("/api/kuaishou", createKuaishouRoutes(kuaishouCookie, requestConfig));
			app$2.use("/api/xiaohongshu", createXiaohongshuRoutes(xiaohongshuCookie, requestConfig));
			app$2.listen(port, "::", () => {
				emitLogMark(`Amagi server listening on ${chalk.green(`http://localhost:${port}`)} ${chalk.yellow("API docs: https://amagi.apifox.cn ")}`);
			});
			return app$2;
		};
		const getDouyinData$1 = (..._args) => {
			checkDeprecation("getDouyinData");
			throw new Error("getDouyinData 已废弃");
		};
		const getBilibiliData$1 = (..._args) => {
			checkDeprecation("getBilibiliData");
			throw new Error("getBilibiliData 已废弃");
		};
		const getKuaishouData$1 = (..._args) => {
			checkDeprecation("getKuaishouData");
			throw new Error("getKuaishouData 已废弃");
		};
		const getXiaohongshuData$1 = (..._args) => {
			checkDeprecation("getXiaohongshuData");
			throw new Error("getXiaohongshuData 已废弃");
		};
		return {
			startServer,
			events: amagiEvents,
			on: amagiEvents.on.bind(amagiEvents),
			once: amagiEvents.once.bind(amagiEvents),
			getDouyinData: getDouyinData$1,
			getBilibiliData: getBilibiliData$1,
			getKuaishouData: getKuaishouData$1,
			getXiaohongshuData: getXiaohongshuData$1,
			douyin: {
				...douyinUtils,
				api: createBoundDouyinApi(douyinCookie, requestConfig),
				fetcher: createBoundDouyinFetcher(douyinCookie, requestConfig)
			},
			bilibili: {
				...bilibiliUtils,
				api: createBoundBilibiliApi(bilibiliCookie, requestConfig),
				fetcher: createBoundBilibiliFetcher(bilibiliCookie, requestConfig)
			},
			kuaishou: {
				...kuaishouUtils,
				api: createBoundKuaishouApi(kuaishouCookie, requestConfig),
				fetcher: createBoundKuaishouFetcher(kuaishouCookie, requestConfig)
			},
			xiaohongshu: {
				...xiaohongshuUtils,
				api: createBoundXiaohongshuApi(xiaohongshuCookie, requestConfig),
				fetcher: createBoundXiaohongshuFetcher(xiaohongshuCookie, requestConfig)
			}
		};
	};
});
var init_BilibiliAPIParams = __esmMin(() => {});
var init_DouyinAPIParams = __esmMin(() => {});
var init_KuaishouAPIParams = __esmMin(() => {});
var init_ArticleCard = __esmMin(() => {});
var init_ArticleContent = __esmMin(() => {});
var init_ArticleInfo = __esmMin(() => {});
var init_AV2BV = __esmMin(() => {});
var init_BangumiVideoInfo = __esmMin(() => {});
var init_BangumiVideoPlayurlIsLogin = __esmMin(() => {});
var init_BangumiVideoPlayurlNoLogin = __esmMin(() => {});
var init_BiliCommentReply = __esmMin(() => {});
var init_BV2AV = __esmMin(() => {});
var init_ColumnInfo = __esmMin(() => {});
var init_DYNAMIC_TYPE_ARTICLE = __esmMin(() => {});
var init_DYNAMIC_TYPE_AV = __esmMin(() => {});
var init_DYNAMIC_TYPE_DRAW = __esmMin(() => {});
var init_DYNAMIC_TYPE_FORWARD = __esmMin(() => {});
var init_DYNAMIC_TYPE_LIVE_RCMD = __esmMin(() => {});
var init_DYNAMIC_TYPE_WORD = __esmMin(() => {});
var MajorType;
var init_Dynamic = __esmMin(() => {
	init_DYNAMIC_TYPE_ARTICLE();
	init_DYNAMIC_TYPE_AV();
	init_DYNAMIC_TYPE_DRAW();
	init_DYNAMIC_TYPE_FORWARD();
	init_DYNAMIC_TYPE_LIVE_RCMD();
	init_DYNAMIC_TYPE_WORD();
	MajorType = function(MajorType$1) {
		MajorType$1["NONE"] = "MAJOR_TYPE_NONE";
		MajorType$1["OPUS"] = "MAJOR_TYPE_OPUS";
		MajorType$1["ARCHIVE"] = "MAJOR_TYPE_ARCHIVE";
		MajorType$1["PGC"] = "MAJOR_TYPE_PGC";
		MajorType$1["COURSES"] = "MAJOR_TYPE_COURSES";
		MajorType$1["DRAW"] = "MAJOR_TYPE_DRAW";
		MajorType$1["ARTICLE"] = "MAJOR_TYPE_ARTICLE";
		MajorType$1["MUSIC"] = "MAJOR_TYPE_MUSIC";
		MajorType$1["COMMON"] = "MAJOR_TYPE_COMMON";
		MajorType$1["LIVE"] = "MAJOR_TYPE_LIVE";
		MajorType$1["MEDIALIST"] = "MAJOR_TYPE_MEDIALIST";
		MajorType$1["APPLET"] = "MAJOR_TYPE_APPLET";
		MajorType$1["SUBSCRIPTION"] = "MAJOR_TYPE_SUBSCRIPTION";
		MajorType$1["LIVE_RCMD"] = "MAJOR_TYPE_LIVE_RCMD";
		MajorType$1["UGC_SEASON"] = "MAJOR_TYPE_UGC_SEASON";
		MajorType$1["SUBSCRIPTION_NEW"] = "MAJOR_TYPE_SUBSCRIPTION_NEW";
		MajorType$1["UPOWER_COMMON"] = "MAJOR_TYPE_UPOWER_COMMON";
		return MajorType$1;
	}({});
});
var init_DynamicCard = __esmMin(() => {});
var DynamicType;
var init_DynamicInfo = __esmMin(() => {
	DynamicType = function(DynamicType$1) {
		DynamicType$1["AV"] = "DYNAMIC_TYPE_AV";
		DynamicType$1["DRAW"] = "DYNAMIC_TYPE_DRAW";
		DynamicType$1["WORD"] = "DYNAMIC_TYPE_WORD";
		DynamicType$1["LIVE_RCMD"] = "DYNAMIC_TYPE_LIVE_RCMD";
		DynamicType$1["FORWARD"] = "DYNAMIC_TYPE_FORWARD";
		DynamicType$1["ARTICLE"] = "DYNAMIC_TYPE_ARTICLE";
		return DynamicType$1;
	}({});
});
var init_EmojiList$2 = __esmMin(() => {});
var init_LiveRoomDef = __esmMin(() => {});
var init_LiveRoomDetail = __esmMin(() => {});
var init_CheckQrcode = __esmMin(() => {});
var init_NewLoginQrcode = __esmMin(() => {});
var init_Login = __esmMin(() => {
	init_CheckQrcode();
	init_NewLoginQrcode();
});
var init_OneWork$1 = __esmMin(() => {});
var init_ProtobufDanmaku = __esmMin(() => {});
var init_UserDynamic = __esmMin(() => {});
var init_UserFullView = __esmMin(() => {});
var init_UserProfile = __esmMin(() => {});
var init_VideoPlayurlIsLogin = __esmMin(() => {});
var init_VideoPlayurlNoLogin = __esmMin(() => {});
var init_WorkComments$2 = __esmMin(() => {});
var init_Bilibili = __esmMin(() => {
	init_ArticleCard();
	init_ArticleContent();
	init_ArticleInfo();
	init_AV2BV();
	init_BangumiVideoInfo();
	init_BangumiVideoPlayurlIsLogin();
	init_BangumiVideoPlayurlNoLogin();
	init_BiliCommentReply();
	init_BV2AV();
	init_ColumnInfo();
	init_Dynamic();
	init_DynamicCard();
	init_DynamicInfo();
	init_EmojiList$2();
	init_LiveRoomDef();
	init_LiveRoomDetail();
	init_Login();
	init_OneWork$1();
	init_ProtobufDanmaku();
	init_UserDynamic();
	init_UserFullView();
	init_UserProfile();
	init_VideoPlayurlIsLogin();
	init_VideoPlayurlNoLogin();
	init_WorkComments$2();
});
var init_CommentReply = __esmMin(() => {});
var init_DyDanmakuList = __esmMin(() => {});
var init_EmojiList$1 = __esmMin(() => {});
var init_EmojiProList = __esmMin(() => {});
var init_ImageAlbumWork = __esmMin(() => {});
var init_MusicWork = __esmMin(() => {});
var init_SearchInfoGeneral = __esmMin(() => {});
var init_SearchInfoUser = __esmMin(() => {});
var init_SearchInfoVideo = __esmMin(() => {});
var init_SearchInfo = __esmMin(() => {
	init_SearchInfoGeneral();
	init_SearchInfoUser();
	init_SearchInfoVideo();
});
var init_SlidesWork = __esmMin(() => {});
var init_SuggestWords = __esmMin(() => {});
var init_TextWork = __esmMin(() => {});
var init_UserInfo = __esmMin(() => {});
var init_UserLiveVideos = __esmMin(() => {});
var init_UserPostVideos = __esmMin(() => {});
var init_VideoWork = __esmMin(() => {});
var init_WorkComments$1 = __esmMin(() => {});
var init_Douyin = __esmMin(() => {
	init_CommentReply();
	init_DyDanmakuList();
	init_EmojiList$1();
	init_EmojiProList();
	init_ImageAlbumWork();
	init_MusicWork();
	init_SearchInfo();
	init_SlidesWork();
	init_SuggestWords();
	init_TextWork();
	init_UserInfo();
	init_UserLiveVideos();
	init_UserPostVideos();
	init_VideoWork();
	init_WorkComments$1();
});
var init_EmojiList = __esmMin(() => {});
var init_OneWork = __esmMin(() => {});
var init_WorkComments = __esmMin(() => {});
var init_Kuaishou = __esmMin(() => {
	init_EmojiList();
	init_OneWork();
	init_WorkComments();
});
var init_HomeFeed = __esmMin(() => {});
var init_NoteComments = __esmMin(() => {});
var init_OneNote = __esmMin(() => {});
var init_SearchNotes = __esmMin(() => {});
var init_XiaohongshuEmojiList = __esmMin(() => {});
var init_XiaohongshuUserProfile = __esmMin(() => {});
var init_Xiaohongshu = __esmMin(() => {
	init_HomeFeed();
	init_NoteComments();
	init_OneNote();
	init_SearchNotes();
	init_XiaohongshuEmojiList();
	init_XiaohongshuUserProfile();
});
var init_ReturnDataType = __esmMin(() => {
	init_Bilibili();
	init_Douyin();
	init_Kuaishou();
	init_Xiaohongshu();
});
var init_XiaohongshuAPIParams = __esmMin(() => {}), BilibiliInternalMethods, BilibiliFetcherMethods, DouyinInternalMethods, DouyinFetcherMethods, KuaishouInternalMethods, KuaishouFetcherMethods, XiaohongshuInternalMethods, XiaohongshuFetcherMethods;
var init_method_keys = __esmMin(() => {
	BilibiliInternalMethods = {
		VIDEO_INFO: "单个视频作品数据",
		VIDEO_STREAM: "单个视频下载信息数据",
		VIDEO_DANMAKU: "实时弹幕",
		COMMENTS: "评论数据",
		COMMENT_REPLIES: "指定评论的回复",
		USER_CARD: "用户主页数据",
		USER_DYNAMICS: "用户主页动态列表数据",
		USER_SPACE_INFO: "用户空间详细信息",
		USER_TOTAL_VIEWS: "获取UP主总播放量",
		DYNAMIC_DETAIL: "动态详情数据",
		DYNAMIC_CARD: "动态卡片数据",
		BANGUMI_INFO: "番剧基本信息数据",
		BANGUMI_STREAM: "番剧下载信息数据",
		LIVE_ROOM_INFO: "直播间信息",
		LIVE_ROOM_INIT: "直播间初始化信息",
		ARTICLE_CONTENT: "专栏正文内容",
		ARTICLE_CARDS: "专栏显示卡片信息",
		ARTICLE_INFO: "专栏文章基本信息",
		ARTICLE_LIST_INFO: "文集基本信息",
		LOGIN_STATUS: "登录基本信息",
		LOGIN_QRCODE: "申请二维码",
		QRCODE_STATUS: "二维码状态",
		APPLY_CAPTCHA: "从_v_voucher_申请_captcha",
		VALIDATE_CAPTCHA: "验证验证码结果",
		AV_TO_BV: "AV转BV",
		BV_TO_AV: "BV转AV",
		EMOJI_LIST: "Emoji数据"
	};
	BilibiliFetcherMethods = {
		VIDEO_INFO: "fetchVideoInfo",
		VIDEO_STREAM: "fetchVideoStreamUrl",
		VIDEO_DANMAKU: "fetchVideoDanmaku",
		COMMENTS: "fetchComments",
		COMMENT_REPLIES: "fetchCommentReplies",
		USER_CARD: "fetchUserCard",
		USER_DYNAMICS: "fetchUserDynamicList",
		USER_SPACE_INFO: "fetchUserSpaceInfo",
		USER_TOTAL_VIEWS: "fetchUploaderTotalViews",
		DYNAMIC_DETAIL: "fetchDynamicDetail",
		DYNAMIC_CARD: "fetchDynamicCard",
		BANGUMI_INFO: "fetchBangumiInfo",
		BANGUMI_STREAM: "fetchBangumiStreamUrl",
		LIVE_ROOM_INFO: "fetchLiveRoomInfo",
		LIVE_ROOM_INIT: "fetchLiveRoomInitInfo",
		ARTICLE_CONTENT: "fetchArticleContent",
		ARTICLE_CARDS: "fetchArticleCards",
		ARTICLE_INFO: "fetchArticleInfo",
		ARTICLE_LIST_INFO: "fetchArticleListInfo",
		LOGIN_STATUS: "fetchLoginStatus",
		LOGIN_QRCODE: "requestLoginQrcode",
		QRCODE_STATUS: "checkQrcodeStatus",
		APPLY_CAPTCHA: "requestCaptchaFromVoucher",
		VALIDATE_CAPTCHA: "validateCaptchaResult",
		AV_TO_BV: "convertAvToBv",
		BV_TO_AV: "convertBvToAv",
		EMOJI_LIST: "fetchEmojiList"
	};
	DouyinInternalMethods = {
		VIDEO_WORK: "视频作品数据",
		IMAGE_ALBUM_WORK: "图集作品数据",
		SLIDES_WORK: "合辑作品数据",
		TEXT_WORK: "文字作品数据",
		PARSE_WORK: "聚合解析",
		DANMAKU: "弹幕数据",
		WORK_COMMENTS: "评论数据",
		COMMENT_REPLIES: "指定评论回复数据",
		USER_PROFILE: "用户主页数据",
		USER_VIDEO_LIST: "用户主页视频列表数据",
		SEARCH: "搜索数据",
		SUGGEST_WORDS: "热点词数据",
		MUSIC_INFO: "音乐数据",
		LIVE_ROOM_INFO: "直播间信息数据",
		LOGIN_QRCODE: "申请二维码数据",
		EMOJI_LIST: "Emoji数据",
		DYNAMIC_EMOJI_LIST: "动态表情数据"
	};
	DouyinFetcherMethods = {
		VIDEO_WORK: "fetchVideoWork",
		IMAGE_ALBUM_WORK: "fetchImageAlbumWork",
		SLIDES_WORK: "fetchSlidesWork",
		TEXT_WORK: "fetchTextWork",
		PARSE_WORK: "parseWork",
		DANMAKU: "fetchDanmakuList",
		WORK_COMMENTS: "fetchWorkComments",
		COMMENT_REPLIES: "fetchCommentReplies",
		USER_PROFILE: "fetchUserProfile",
		USER_VIDEO_LIST: "fetchUserVideoList",
		SEARCH: "searchContent",
		SUGGEST_WORDS: "fetchSuggestWords",
		MUSIC_INFO: "fetchMusicInfo",
		LIVE_ROOM_INFO: "fetchLiveRoomInfo",
		LOGIN_QRCODE: "requestLoginQrcode",
		EMOJI_LIST: "fetchEmojiList",
		DYNAMIC_EMOJI_LIST: "fetchDynamicEmojiList"
	};
	KuaishouInternalMethods = {
		VIDEO_WORK: "单个视频作品数据",
		WORK_COMMENTS: "评论数据",
		EMOJI_LIST: "Emoji数据"
	};
	KuaishouFetcherMethods = {
		VIDEO_WORK: "fetchVideoWork",
		WORK_COMMENTS: "fetchWorkComments",
		EMOJI_LIST: "fetchEmojiList"
	};
	XiaohongshuInternalMethods = {
		HOME_FEED: "首页推荐数据",
		NOTE_DETAIL: "单个笔记数据",
		NOTE_COMMENTS: "评论数据",
		USER_PROFILE: "用户数据",
		USER_NOTES: "用户笔记数据",
		SEARCH_NOTES: "搜索笔记",
		EMOJI_LIST: "表情列表"
	};
	XiaohongshuFetcherMethods = {
		HOME_FEED: "fetchHomeFeed",
		NOTE_DETAIL: "fetchNoteDetail",
		NOTE_COMMENTS: "fetchNoteComments",
		USER_PROFILE: "fetchUserProfile",
		USER_NOTES: "fetchUserNoteList",
		SEARCH_NOTES: "searchNotes",
		EMOJI_LIST: "fetchEmojiList"
	};
	BilibiliInternalMethods.VIDEO_INFO, BilibiliFetcherMethods.VIDEO_INFO, BilibiliInternalMethods.VIDEO_STREAM, BilibiliFetcherMethods.VIDEO_STREAM, BilibiliInternalMethods.VIDEO_DANMAKU, BilibiliFetcherMethods.VIDEO_DANMAKU, BilibiliInternalMethods.COMMENTS, BilibiliFetcherMethods.COMMENTS, BilibiliInternalMethods.COMMENT_REPLIES, BilibiliFetcherMethods.COMMENT_REPLIES, BilibiliInternalMethods.USER_CARD, BilibiliFetcherMethods.USER_CARD, BilibiliInternalMethods.USER_DYNAMICS, BilibiliFetcherMethods.USER_DYNAMICS, BilibiliInternalMethods.USER_SPACE_INFO, BilibiliFetcherMethods.USER_SPACE_INFO, BilibiliInternalMethods.USER_TOTAL_VIEWS, BilibiliFetcherMethods.USER_TOTAL_VIEWS, BilibiliInternalMethods.DYNAMIC_DETAIL, BilibiliFetcherMethods.DYNAMIC_DETAIL, BilibiliInternalMethods.DYNAMIC_CARD, BilibiliFetcherMethods.DYNAMIC_CARD, BilibiliInternalMethods.BANGUMI_INFO, BilibiliFetcherMethods.BANGUMI_INFO, BilibiliInternalMethods.BANGUMI_STREAM, BilibiliFetcherMethods.BANGUMI_STREAM, BilibiliInternalMethods.LIVE_ROOM_INFO, BilibiliFetcherMethods.LIVE_ROOM_INFO, BilibiliInternalMethods.LIVE_ROOM_INIT, BilibiliFetcherMethods.LIVE_ROOM_INIT, BilibiliInternalMethods.ARTICLE_CONTENT, BilibiliFetcherMethods.ARTICLE_CONTENT, BilibiliInternalMethods.ARTICLE_CARDS, BilibiliFetcherMethods.ARTICLE_CARDS, BilibiliInternalMethods.ARTICLE_INFO, BilibiliFetcherMethods.ARTICLE_INFO, BilibiliInternalMethods.ARTICLE_LIST_INFO, BilibiliFetcherMethods.ARTICLE_LIST_INFO, BilibiliInternalMethods.LOGIN_STATUS, BilibiliFetcherMethods.LOGIN_STATUS, BilibiliInternalMethods.LOGIN_QRCODE, BilibiliFetcherMethods.LOGIN_QRCODE, BilibiliInternalMethods.QRCODE_STATUS, BilibiliFetcherMethods.QRCODE_STATUS, BilibiliInternalMethods.APPLY_CAPTCHA, BilibiliFetcherMethods.APPLY_CAPTCHA, BilibiliInternalMethods.VALIDATE_CAPTCHA, BilibiliFetcherMethods.VALIDATE_CAPTCHA, BilibiliInternalMethods.AV_TO_BV, BilibiliFetcherMethods.AV_TO_BV, BilibiliInternalMethods.BV_TO_AV, BilibiliFetcherMethods.BV_TO_AV, BilibiliInternalMethods.EMOJI_LIST, BilibiliFetcherMethods.EMOJI_LIST;
	DouyinInternalMethods.VIDEO_WORK, DouyinFetcherMethods.VIDEO_WORK, DouyinInternalMethods.IMAGE_ALBUM_WORK, DouyinFetcherMethods.IMAGE_ALBUM_WORK, DouyinInternalMethods.SLIDES_WORK, DouyinFetcherMethods.SLIDES_WORK, DouyinInternalMethods.TEXT_WORK, DouyinFetcherMethods.TEXT_WORK, DouyinInternalMethods.PARSE_WORK, DouyinFetcherMethods.PARSE_WORK, DouyinInternalMethods.DANMAKU, DouyinFetcherMethods.DANMAKU, DouyinInternalMethods.WORK_COMMENTS, DouyinFetcherMethods.WORK_COMMENTS, DouyinInternalMethods.COMMENT_REPLIES, DouyinFetcherMethods.COMMENT_REPLIES, DouyinInternalMethods.USER_PROFILE, DouyinFetcherMethods.USER_PROFILE, DouyinInternalMethods.USER_VIDEO_LIST, DouyinFetcherMethods.USER_VIDEO_LIST, DouyinInternalMethods.SEARCH, DouyinFetcherMethods.SEARCH, DouyinInternalMethods.SUGGEST_WORDS, DouyinFetcherMethods.SUGGEST_WORDS, DouyinInternalMethods.MUSIC_INFO, DouyinFetcherMethods.MUSIC_INFO, DouyinInternalMethods.LIVE_ROOM_INFO, DouyinFetcherMethods.LIVE_ROOM_INFO, DouyinInternalMethods.LOGIN_QRCODE, DouyinFetcherMethods.LOGIN_QRCODE, DouyinInternalMethods.EMOJI_LIST, DouyinFetcherMethods.EMOJI_LIST, DouyinInternalMethods.DYNAMIC_EMOJI_LIST, DouyinFetcherMethods.DYNAMIC_EMOJI_LIST;
	KuaishouInternalMethods.VIDEO_WORK, KuaishouFetcherMethods.VIDEO_WORK, KuaishouInternalMethods.WORK_COMMENTS, KuaishouFetcherMethods.WORK_COMMENTS, KuaishouInternalMethods.EMOJI_LIST, KuaishouFetcherMethods.EMOJI_LIST;
	XiaohongshuInternalMethods.HOME_FEED, XiaohongshuFetcherMethods.HOME_FEED, XiaohongshuInternalMethods.NOTE_DETAIL, XiaohongshuFetcherMethods.NOTE_DETAIL, XiaohongshuInternalMethods.NOTE_COMMENTS, XiaohongshuFetcherMethods.NOTE_COMMENTS, XiaohongshuInternalMethods.USER_PROFILE, XiaohongshuFetcherMethods.USER_PROFILE, XiaohongshuInternalMethods.USER_NOTES, XiaohongshuFetcherMethods.USER_NOTES, XiaohongshuInternalMethods.SEARCH_NOTES, XiaohongshuFetcherMethods.SEARCH_NOTES, XiaohongshuInternalMethods.EMOJI_LIST, XiaohongshuFetcherMethods.EMOJI_LIST;
});
var init_types$1 = __esmMin(() => {
	init_xiaohongshu$2();
	init_BilibiliAPIParams();
	init_DouyinAPIParams();
	init_KuaishouAPIParams();
	init_ReturnDataType();
	init_XiaohongshuAPIParams();
	init_method_keys();
}), DouyinMethodMapping, BilibiliMethodMapping, KuaishouMethodMapping, XiaohongshuMethodMapping;
var init_api_spec = __esmMin(() => {
	DouyinMethodMapping = {
		"视频作品数据": "fetchVideoWork",
		"图集作品数据": "fetchImageAlbumWork",
		"合辑作品数据": "fetchSlidesWork",
		"文字作品数据": "fetchTextWork",
		"聚合解析": "parseWork",
		"评论数据": "fetchWorkComments",
		"指定评论回复数据": "fetchCommentReplies",
		"用户主页数据": "fetchUserProfile",
		"用户主页视频列表数据": "fetchUserVideoList",
		"搜索数据": "searchContent",
		"热点词数据": "fetchSuggestWords",
		"音乐数据": "fetchMusicInfo",
		"直播间信息数据": "fetchLiveRoomInfo",
		"申请二维码数据": "requestLoginQrcode",
		"Emoji数据": "fetchEmojiList",
		"动态表情数据": "fetchDynamicEmojiList",
		"弹幕数据": "fetchDanmakuList"
	};
	Object.fromEntries(Object.entries(DouyinMethodMapping).map(([k, v]) => [v, k]));
	BilibiliMethodMapping = {
		"单个视频作品数据": "fetchVideoInfo",
		"单个视频下载信息数据": "fetchVideoStreamUrl",
		"实时弹幕": "fetchVideoDanmaku",
		"评论数据": "fetchComments",
		"指定评论的回复": "fetchCommentReplies",
		"用户主页数据": "fetchUserCard",
		"用户主页动态列表数据": "fetchUserDynamicList",
		"用户空间详细信息": "fetchUserSpaceInfo",
		"获取UP主总播放量": "fetchUploaderTotalViews",
		"动态详情数据": "fetchDynamicDetail",
		"动态卡片数据": "fetchDynamicCard",
		"番剧基本信息数据": "fetchBangumiInfo",
		"番剧下载信息数据": "fetchBangumiStreamUrl",
		"直播间信息": "fetchLiveRoomInfo",
		"直播间初始化信息": "fetchLiveRoomInitInfo",
		"专栏正文内容": "fetchArticleContent",
		"专栏显示卡片信息": "fetchArticleCards",
		"专栏文章基本信息": "fetchArticleInfo",
		"文集基本信息": "fetchArticleListInfo",
		"登录基本信息": "fetchLoginStatus",
		"申请二维码": "requestLoginQrcode",
		"二维码状态": "checkQrcodeStatus",
		"AV转BV": "convertAvToBv",
		"BV转AV": "convertBvToAv",
		"Emoji数据": "fetchEmojiList",
		"从_v_voucher_申请_captcha": "requestCaptchaFromVoucher",
		"验证验证码结果": "validateCaptchaResult"
	};
	Object.fromEntries(Object.entries(BilibiliMethodMapping).map(([k, v]) => [v, k]));
	KuaishouMethodMapping = {
		"单个视频作品数据": "fetchVideoWork",
		"评论数据": "fetchWorkComments",
		"Emoji数据": "fetchEmojiList"
	};
	Object.fromEntries(Object.entries(KuaishouMethodMapping).map(([k, v]) => [v, k]));
	XiaohongshuMethodMapping = {
		"首页推荐数据": "fetchHomeFeed",
		"单个笔记数据": "fetchNoteDetail",
		"评论数据": "fetchNoteComments",
		"用户数据": "fetchUserProfile",
		"用户笔记数据": "fetchUserNoteList",
		"表情列表": "fetchEmojiList",
		"搜索笔记": "searchNotes"
	};
	Object.fromEntries(Object.entries(XiaohongshuMethodMapping).map(([k, v]) => [v, k]));
});
function CreateAmagiApp(options = {}) {
	if (!(this instanceof CreateAmagiApp)) return createAmagiClient(options);
	return createAmagiClient(options);
}
var getVersion, VERSION, CreateApp, Client;
var init_src = __esmMin(() => {
	init_DataFetchers();
	init_platform();
	init_events();
	init_fetchers();
	init_xiaohongshu();
	init_server();
	init_errors();
	init_validation$1();
	init_model();
	init_platform();
	init_server();
	init_types$1();
	init_api_spec();
	getVersion = () => "6.0.0-beta.3";
	VERSION = getVersion();
	Object.defineProperty(CreateAmagiApp, "version", {
		value: VERSION,
		writable: false,
		enumerable: true,
		configurable: false
	});
	CreateAmagiApp.douyin = douyinUtils;
	CreateAmagiApp.bilibili = bilibiliUtils;
	CreateAmagiApp.kuaishou = kuaishouUtils;
	CreateAmagiApp.xiaohongshu = xiaohongshuUtils;
	CreateAmagiApp.getDouyinData = getDouyinData;
	CreateAmagiApp.getBilibiliData = getBilibiliData;
	CreateAmagiApp.getKuaishouData = getKuaishouData;
	CreateAmagiApp.getXiaohongshuData = getXiaohongshuData;
	CreateAmagiApp.events = amagiEvents;
	CreateAmagiApp.on = amagiEvents.on.bind(amagiEvents);
	CreateAmagiApp.once = amagiEvents.once.bind(amagiEvents);
	CreateAmagiApp.bilibiliFetcher = bilibiliFetcher$1;
	CreateAmagiApp.douyinFetcher = douyinFetcher$1;
	CreateAmagiApp.kuaishouFetcher = kuaishouFetcher$1;
	CreateAmagiApp.xiaohongshuFetcher = xiaohongshuFetcher$1;
	CreateAmagiApp.createBoundBilibiliFetcher = createBoundBilibiliFetcher;
	CreateAmagiApp.createBoundDouyinFetcher = createBoundDouyinFetcher;
	CreateAmagiApp.createBoundKuaishouFetcher = createBoundKuaishouFetcher;
	CreateAmagiApp.createBoundXiaohongshuFetcher = createBoundXiaohongshuFetcher;
	CreateApp = CreateAmagiApp;
	Client = CreateApp;
});
var resolvePluginRoot, pluginPath, pkg, Root;
var init_root = __esmMin(() => {
	resolvePluginRoot = (startUrl) => {
		let dir = path.dirname(startUrl);
		for (let i = 0; i < 8; i++) {
			const pkgPath = path.join(dir, "package.json");
			if (fs.existsSync(pkgPath)) return dir;
			const parent = path.dirname(dir);
			if (parent === dir) break;
			dir = parent;
		}
		return path.resolve(startUrl, "../..");
	};
	pluginPath = resolvePluginRoot(fileURLToPath(import.meta.url));
	pkg = JSON.parse(fs.readFileSync(path.join(pluginPath, "package.json"), "utf-8"));
	Root = {
		pluginName: pkg.name,
		pluginVersion: pkg.version,
		pluginPath,
		karinVersion: process.env.KARIN_VERSION
	};
});
var amagiClient_exports = __export({
	AmagiBase: () => AmagiBase,
	AmagiError: () => AmagiError,
	bilibiliFetcher: () => bilibiliFetcher,
	douyinFetcher: () => douyinFetcher,
	kuaishouFetcher: () => kuaishouFetcher,
	reloadAmagiConfig: () => reloadAmagiConfig,
	xiaohongshuFetcher: () => xiaohongshuFetcher
}, 1);
var AmagiError, AmagiBase, amagiClientInstance, amagiClient, reloadAmagiConfig, bilibiliFetcher, douyinFetcher, kuaishouFetcher, xiaohongshuFetcher;
var init_amagiClient = __esmMin(() => {
	init_src();
	init_Config();
	AmagiError = class extends Error {
		code;
		data;
		rawError;
		constructor(code, message, data$1, rawError) {
			super(message);
			this.name = "AmagiError";
			this.code = code;
			this.data = data$1;
			this.rawError = rawError;
		}
	};
	AmagiBase = class {
		amagi;
		constructor() {
			const client = this.createAmagiClient();
			this.amagi = this.wrapAmagiClient(client);
		}
		createAmagiClient = () => Client({
			cookies: {
				douyin: Config.cookies.douyin,
				bilibili: Config.cookies.bilibili,
				kuaishou: Config.cookies.kuaishou,
				xiaohongshu: Config.cookies.xiaohongshu
			},
			request: {
				timeout: Config.request.timeout,
				headers: { "User-Agent": Config.request["User-Agent"] },
				proxy: Config.request.proxy?.switch ? Config.request.proxy : false
			}
		});
		reloadConfig() {
			logger.debug("[AmagiClient] 检测到配置变化，正在重载...");
			const oldCookies = {
				douyin: Config.cookies.douyin?.substring(0, 20) + "...",
				bilibili: Config.cookies.bilibili?.substring(0, 20) + "...",
				kuaishou: Config.cookies.kuaishou?.substring(0, 20) + "...",
				xiaohongshu: Config.cookies.xiaohongshu?.substring(0, 20) + "..."
			};
			const client = this.createAmagiClient();
			this.amagi = this.wrapAmagiClient(client);
			const newCookies = {
				douyin: Config.cookies.douyin?.substring(0, 20) + "...",
				bilibili: Config.cookies.bilibili?.substring(0, 20) + "...",
				kuaishou: Config.cookies.kuaishou?.substring(0, 20) + "...",
				xiaohongshu: Config.cookies.xiaohongshu?.substring(0, 20) + "..."
			};
			logger.debug("[AmagiClient] 配置重载完成");
			logger.debug(`[AmagiClient] Cookie 变化对比:\n${util.inspect({
				"旧配置": oldCookies,
				"新配置": newCookies
			}, {
				colors: true,
				depth: 2
			})}`);
		}
		wrapAmagiClient = (client) => {
			const createProxy = (target) => new Proxy(target, { get(obj, prop) {
				const value = obj[prop];
				if (value && typeof value === "object" && !Array.isArray(value)) return createProxy(value);
				if (typeof value === "function") return async (...args) => {
					const result = await value.apply(obj, args);
					const isResultType = (val) => {
						if (!val || typeof val !== "object") return false;
						if (!("success" in val) || typeof val.success !== "boolean") return false;
						if (!("code" in val) || !("message" in val)) return false;
						return true;
					};
					if (isResultType(result)) {
						if (result.success === true) return result;
						const errMessage = result.message || result.error?.amagiMessage || "请求失败";
						const errorDetails = util.inspect({
							code: result.code,
							data: result.data,
							message: errMessage,
							error: result.error
						}, {
							depth: 10,
							colors: true,
							compact: false,
							breakLength: 120,
							showHidden: true
						});
						throw new AmagiError(result.code, errorDetails, result.data, result.error);
					}
					return result;
				};
				return value;
			} });
			return createProxy(client);
		};
	};
	amagiClientInstance = new AmagiBase();
	amagiClient = amagiClientInstance.amagi;
	reloadAmagiConfig = () => {
		amagiClientInstance.reloadConfig();
	};
	bilibiliFetcher = amagiClient.bilibili.fetcher;
	douyinFetcher = amagiClient.douyin.fetcher;
	kuaishouFetcher = amagiClient.kuaishou.fetcher;
	xiaohongshuFetcher = amagiClient.xiaohongshu.fetcher;
});
var Cfg, configInstance, getConfigInstance, Config;
var init_Config = __esmMin(() => {
	init_root();
	Cfg = class {
		dirCfgPath;
		defCfgPath;
		constructor() {
			this.dirCfgPath = `${karinPathBase}/${Root.pluginName}/config`;
			this.defCfgPath = `${Root.pluginPath}/config/default_config/`;
		}
		initCfg() {
			copyConfigSync(this.defCfgPath, this.dirCfgPath);
			const files = filesByExt(this.dirCfgPath, ".yaml", "name");
			for (const file of files) {
				const config$1 = YAML.parseDocument(fs.readFileSync(`${this.dirCfgPath}/${file}`, "utf8"));
				const defConfig = YAML.parseDocument(fs.readFileSync(`${this.defCfgPath}/${file}`, "utf8"));
				const { differences, result } = this.mergeObjectsWithPriority(config$1, defConfig);
				if (differences) fs.writeFileSync(`${this.dirCfgPath}/${file}`, result.toString({ lineWidth: -1 }));
			}
			setTimeout(() => {
				filesByExt(this.dirCfgPath, ".yaml", "abs").forEach((file) => watch(file, (_old, _now) => {
					const fileName = path.basename(file, ".yaml");
					if (fileName === "cookies" || fileName === "request") {
						logger.debug(`[Config] 检测到 ${fileName} 配置变化，正在重载 Amagi Client...`);
						Promise.resolve().then(() => (init_amagiClient(), amagiClient_exports)).then(({ reloadAmagiConfig: reloadAmagiConfig$1 }) => {
							reloadAmagiConfig$1();
						}).catch((error) => {
							logger.error(`[Config] 重载 Amagi Client 失败: ${error}`);
						});
					}
				}));
			}, 2e3);
			return this;
		}
		getDefOrConfig(name) {
			const def = this.getYaml("default_config", name);
			const config$1 = this.getYaml("config", name);
			return {
				...def,
				...config$1
			};
		}
		async All() {
			const { getDouyinDB: getDouyinDB$1, getBilibiliDB: getBilibiliDB$1 } = await init_db().then(() => db_exports);
			const douyinDB$1 = await getDouyinDB$1();
			const bilibiliDB$1 = await getBilibiliDB$1();
			const allConfig = {};
			const files = fs.readdirSync(this.defCfgPath);
			for (const file of files) {
				const fileName = path.basename(file, ".yaml");
				allConfig[fileName] = this.getDefOrConfig(fileName) || {};
			}
			if (allConfig.pushlist) try {
				if (allConfig.pushlist.douyin) for (const item of allConfig.pushlist.douyin) {
					const filterWords = await douyinDB$1.getFilterWords(item.sec_uid);
					const filterTags = await douyinDB$1.getFilterTags(item.sec_uid);
					const userInfo = await douyinDB$1.getDouyinUser(item.sec_uid);
					if (userInfo) item.filterMode = userInfo.filterMode || "blacklist";
					item.Keywords = filterWords;
					item.Tags = filterTags;
				}
				if (allConfig.pushlist.bilibili) for (const item of allConfig.pushlist.bilibili) {
					const filterWords = await bilibiliDB$1.getFilterWords(item.host_mid);
					const filterTags = await bilibiliDB$1.getFilterTags(item.host_mid);
					const userInfo = await bilibiliDB$1.getOrCreateBilibiliUser(item.host_mid);
					if (userInfo) item.filterMode = userInfo.filterMode || "blacklist";
					item.Keywords = filterWords;
					item.Tags = filterTags;
				}
			} catch (error) {
				logger.error(`从数据库获取过滤配置时出错: ${error}`);
			}
			return allConfig;
		}
		getYaml(type, name) {
			return requireFileSync(type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`, { force: true });
		}
		Modify(name, key, value, type = "config") {
			const path$1 = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
			const yamlData = YAML.parseDocument(fs.readFileSync(path$1, "utf8"));
			const keys = key.split(".");
			this.setNestedValue(yamlData.contents, keys, value);
			fs.writeFileSync(path$1, yamlData.toString({ lineWidth: -1 }), "utf8");
		}
		async ModifyPro(name, config$1, type = "config") {
			const { getDouyinDB: getDouyinDB$1, getBilibiliDB: getBilibiliDB$1 } = await init_db().then(() => db_exports);
			const douyinDB$1 = await getDouyinDB$1();
			const bilibiliDB$1 = await getBilibiliDB$1();
			const filePath = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
			try {
				const existingContent = fs.readFileSync(filePath, "utf8");
				const doc = YAML.parseDocument(existingContent);
				let filterCfg = config$1;
				if (name === "pushlist" && ("douyin" in config$1 || "bilibili" in config$1)) {
					const cleanedConfig = { ...config$1 };
					if ("douyin" in cleanedConfig) cleanedConfig.douyin = cleanedConfig.douyin.map((item) => {
						const { Keywords, Tags, filterMode, ...rest } = item;
						return rest;
					});
					if ("bilibili" in cleanedConfig) cleanedConfig.bilibili = cleanedConfig.bilibili.map((item) => {
						const { Keywords, Tags, filterMode, ...rest } = item;
						return rest;
					});
					filterCfg = cleanedConfig;
				}
				const newConfigNode = YAML.parseDocument(YAML.stringify(filterCfg)).contents;
				this.deepMergeYaml(doc.contents, newConfigNode);
				fs.writeFileSync(filePath, doc.toString({ lineWidth: -1 }), "utf8");
				if ("douyin" in config$1) {
					await this.syncFilterConfigToDb(config$1.douyin, douyinDB$1, "sec_uid");
					logger.debug("已同步抖音过滤配置到数据库");
				}
				if ("bilibili" in config$1) {
					await this.syncFilterConfigToDb(config$1.bilibili, bilibiliDB$1, "host_mid");
					logger.debug("已同步B站过滤配置到数据库");
				}
				return true;
			} catch (error) {
				logger.error(`修改配置文件时发生错误：${error}`);
				return false;
			}
		}
		async syncFilterConfigToDb(items, db$1, idField) {
			for (const item of items) {
				const id = item[idField];
				if (!id) continue;
				if (item.filterMode) await db$1.updateFilterMode(id, item.filterMode);
				if (item.Keywords && Array.isArray(item.Keywords)) {
					const existingWords = await db$1.getFilterWords(id);
					for (const word of existingWords) if (!item.Keywords.includes(word)) await db$1.removeFilterWord(id, word);
					for (const word of item.Keywords) if (!existingWords.includes(word)) await db$1.addFilterWord(id, word);
				}
				if (item.Tags && Array.isArray(item.Tags)) {
					const existingTags = await db$1.getFilterTags(id);
					for (const tag of existingTags) if (!item.Tags.includes(tag)) await db$1.removeFilterTag(id, tag);
					for (const tag of item.Tags) if (!existingTags.includes(tag)) await db$1.addFilterTag(id, tag);
				}
			}
		}
		deepMergeYaml(target, source) {
			if (YAML.isMap(target) && YAML.isMap(source)) for (const pair of source.items) {
				const key = pair.key;
				const sourceVal = pair.value;
				const targetVal = target.get(key);
				if (targetVal === void 0) target.set(key, sourceVal);
				else if (YAML.isMap(targetVal) && YAML.isMap(sourceVal)) this.deepMergeYaml(targetVal, sourceVal);
				else if (YAML.isSeq(targetVal) && YAML.isSeq(sourceVal)) {
					targetVal.items = sourceVal.items;
					targetVal.flow = sourceVal.flow;
				} else target.set(key, sourceVal);
			}
		}
		setNestedValue(map, keys, value) {
			if (keys.length === 1) {
				map.set(keys[0], value);
				return;
			}
			const subKey = keys[0];
			let subMap = map.get(subKey);
			if (!subMap || !YAML.isMap(subMap)) {
				subMap = new YAML.YAMLMap();
				map.set(subKey, subMap);
			}
			this.setNestedValue(subMap, keys.slice(1), value);
		}
		mergeObjectsWithPriority(userDoc, defaultDoc) {
			let differences = false;
			const mergeYamlNodes = (target, source) => {
				if (YAML.isMap(target) && YAML.isMap(source)) for (const pair of source.items) {
					const key = pair.key;
					const value = pair.value;
					const existing = target.get(key);
					if (existing === void 0) {
						differences = true;
						target.set(key, value);
					} else if (YAML.isMap(value) && YAML.isMap(existing)) mergeYamlNodes(existing, value);
					else if (existing !== value) {
						differences = true;
						target.set(key, value);
					}
				}
			};
			mergeYamlNodes(defaultDoc.contents, userDoc.contents);
			return {
				differences,
				result: defaultDoc
			};
		}
		async syncConfigToDatabase() {
			try {
				const { getDouyinDB: getDouyinDB$1, getBilibiliDB: getBilibiliDB$1 } = await init_db().then(() => db_exports);
				const douyinDB$1 = await getDouyinDB$1();
				const bilibiliDB$1 = await getBilibiliDB$1();
				const pushCfg = this.getYaml("config", "pushlist");
				if (pushCfg.bilibili) await bilibiliDB$1.syncConfigSubscriptions(pushCfg.bilibili);
				if (pushCfg.douyin) await douyinDB$1.syncConfigSubscriptions(pushCfg.douyin);
				logger.debug("[BilibiliDB] + [DouyinDB] 配置已同步到数据库");
			} catch (error) {
				logger.error("同步配置到数据库失败:", error);
			}
		}
	};
	configInstance = null;
	getConfigInstance = () => {
		if (!configInstance) configInstance = new Proxy(new Cfg().initCfg(), { get(target, prop) {
			if (prop in target) return target[prop];
			return target.getDefOrConfig(prop);
		} });
		return configInstance;
	};
	Config = new Proxy({}, { get(target, prop) {
		return getConfigInstance()[prop];
	} });
});
var Base, Count, uploadFile, downloadVideo, downloadFile, processFilename;
var init_Base = __esmMin(() => {
	init_utils$1();
	init_Config();
	init_amagiClient();
	Base = class extends AmagiBase {
		e;
		headers;
		constructor(e) {
			super();
			this.e = e;
			this.headers = BASE_HEADERS;
		}
	};
	Count = (count) => {
		if (count >= 1e8) return (count / 1e8).toFixed(1) + "亿";
		else if (count >= 1e4) return (count / 1e4).toFixed(1) + "万";
		else return count?.toString() ?? "无法获取";
	};
	uploadFile = async (event, file, videoUrl, options) => {
		let sendStatus = true;
		let File;
		let newFileSize = file.totalBytes;
		let selfId;
		let contact;
		if (options?.active) {
			selfId = options?.activeOption?.uin;
			contact = karin$1.contactGroup(options?.activeOption?.group_id);
		} else {
			selfId = event.selfId;
			contact = event.contact;
		}
		if (Config.upload.compress && file.totalBytes > Config.upload.compresstrigger) {
			const Duration = await getMediaDuration(file.filepath);
			logger.warn(logger.yellow(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`));
			const message = [segment.text(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`), options?.message_id ? segment.reply(options.message_id) : segment.text("")];
			const msg1 = await karin$1.sendMsg(selfId, contact, message);
			const targetBitrate = Common.calculateBitrate(Config.upload.compresstrigger, Duration) * .75;
			const startTime = Date.now();
			const outputPath = `${Common.tempDri.video}tmp_${Date.now()}.mp4`;
			await compressVideo({
				inputPath: file.filepath,
				outputPath,
				targetBitrate
			});
			file.filepath = outputPath;
			const endTime = Date.now();
			newFileSize = await Common.getVideoFileSize(file.filepath);
			logger.debug(`原始视频大小为: ${file.totalBytes.toFixed(1)} MB, ${logger.green(`经 FFmpeg 压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，原视频文件已删除`)}`);
			const message2 = [segment.text(`压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，压缩耗时：${((endTime - startTime) / 1e3).toFixed(1)} 秒`), segment.reply(msg1.messageId)];
			await karin$1.sendMsg(selfId, contact, message2);
		}
		if (options) options.useGroupFile = Config.upload.usegroupfile && newFileSize > Config.upload.groupfilevalue;
		if (Config.upload.sendbase64 && !options?.useGroupFile) {
			File = `base64://${(await fs.promises.readFile(file.filepath)).toString("base64")}`;
			logger.mark(`已开启视频文件 base64转换 正在进行${logger.yellow("base64转换中")}...`);
		} else File = options?.useGroupFile ? file.filepath : `file://${file.filepath}`;
		try {
			if (options?.active) if (options.useGroupFile) {
				const bot = karin$1.getBot(String(options.activeOption?.uin));
				logger.mark(`${logger.blue("主动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("bot.uploadFile")}回复...`);
				await bot.uploadFile(contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split("/").pop()}`);
			} else {
				logger.mark(`${logger.blue("主动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("karin.sendMsg")}回复...`);
				(await karin$1.sendMsg(selfId, contact, [segment.video(File)])).messageId ? sendStatus = true : sendStatus = false;
			}
			else if (options?.useGroupFile) {
				logger.mark(`${logger.blue("被动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("e.bot.uploadFile")}回复...`);
				await event.bot.uploadFile(event.contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split("/").pop()}`);
			} else {
				logger.mark(`${logger.blue("被动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("e.reply")}回复...`);
				(await event.reply(segment.video(File) || videoUrl)).messageId ? sendStatus = true : sendStatus = false;
			}
			return sendStatus;
		} catch (error) {
			if (options && options.active === false) await event.reply("视频文件上传失败" + JSON.stringify(error, null, 2));
			logger.error("视频文件上传错误," + String(error));
			return false;
		} finally {
			const filePath = file.filepath;
			logger.mark(`临时预览地址：http://localhost:${process.env.HTTP_PORT}/api/kkk/video/${encodeURIComponent(filePath.split("/").pop() ?? "")}`);
			Config.app.removeCache && logger.info(`文件 ${filePath} 将在 10 分钟后删除`);
			setTimeout(async () => {
				await Common.removeFile(filePath);
			}, 600 * 1e3);
		}
	};
	downloadVideo = async (event, downloadOpt, uploadOpt) => {
		const fileHeaders = await new Network({
			url: downloadOpt.video_url,
			headers: downloadOpt.headers ?? BASE_HEADERS
		}).getHeaders();
		const fileSizeInMB = ((fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0) / (1024 * 1024)).toFixed(2);
		const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2));
		if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
			const message = segment.text(`视频：「${downloadOpt.title.originTitle ?? "Error: 文件名获取失败"}」大小 (${fileSizeInMB} MB) 超出最大限制（设定值：${Config.upload.filelimit} MB），已取消上传`);
			const selfId = event.selfId || uploadOpt?.activeOption?.uin;
			const contact = event.contact || karin$1.contactGroup(uploadOpt?.activeOption?.group_id) || karin$1.contactFriend(selfId);
			await karin$1.sendMsg(selfId, contact, message);
			return false;
		}
		let res = await downloadFile(downloadOpt.video_url, {
			title: Config.app.removeCache ? downloadOpt.title.timestampTitle : processFilename(downloadOpt.title.originTitle, 50),
			headers: downloadOpt.headers ?? BASE_HEADERS
		});
		res = {
			...res,
			...downloadOpt.title
		};
		res.totalBytes = Number((res.totalBytes / (1024 * 1024)).toFixed(2));
		return await uploadFile(event, res, downloadOpt.video_url, uploadOpt);
	};
	downloadFile = async (videoUrl, opt) => {
		const startTime = Date.now();
		const uploadConfig = Config.upload;
		const throttleConfig = {
			enabled: uploadConfig.downloadThrottle ?? false,
			maxSpeed: (uploadConfig.downloadMaxSpeed ?? 10) * 1024 * 1024,
			autoReduceRatio: uploadConfig.downloadAutoReduce ? .6 : 1,
			minSpeed: (uploadConfig.downloadMinSpeed ?? 1) * 1024 * 1024
		};
		try {
			const { filepath, totalBytes } = await new Network({
				url: videoUrl,
				headers: opt.headers ?? BASE_HEADERS,
				filepath: Common.tempDri.video + opt.title,
				timeout: 6e4,
				maxRetries: 3,
				throttle: throttleConfig
			}).downloadStream((downloadedBytes, totalBytes$1) => {
				const barLength = 45;
				const generateProgressBar = (progressPercentage$1) => {
					const clampedPercentage = Math.min(100, Math.max(0, progressPercentage$1));
					const filledLength = Math.floor(clampedPercentage / 100 * barLength);
					const emptyLength = Math.max(0, barLength - filledLength);
					return `[${"█".repeat(filledLength)}${"░".repeat(emptyLength)}]`;
				};
				const progressPercentage = totalBytes$1 > 0 ? Math.min(100, downloadedBytes / totalBytes$1 * 100) : 0;
				const red = Math.floor(255 - 255 * progressPercentage / 100);
				const coloredPercentage = logger.chalk.rgb(red, 255, 0)(`${progressPercentage.toFixed(1)}%`);
				const speed = downloadedBytes / ((Date.now() - startTime) / 1e3);
				const formattedSpeed = (speed / 1048576).toFixed(1) + " MB/s";
				const remainingTime = (totalBytes$1 - downloadedBytes) / speed;
				const formattedRemainingTime = remainingTime > 60 ? `${Math.floor(remainingTime / 60)}min ${Math.floor(remainingTime % 60)}s` : `${remainingTime.toFixed(0)}s`;
				const downloadedSizeMB = (downloadedBytes / 1048576).toFixed(1);
				const totalSizeMB = (totalBytes$1 / 1048576).toFixed(1);
				console.log(`⬇️  ${opt.title} ${generateProgressBar(progressPercentage)} ${coloredPercentage} ${downloadedSizeMB}/${totalSizeMB} MB | ${formattedSpeed} 剩余: ${formattedRemainingTime}\r`);
			});
			return {
				filepath,
				totalBytes
			};
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			if (/ECONNRESET|ETIMEDOUT|ECONNABORTED|aborted|timeout|network|连接被重置|连接超时|连接中止/i.test(errorMessage)) {
				logger.error("下载失败，可能是由于网络环境变化（如代理切换、VPN切换）或服务器风控导致");
				logger.error(`文件: ${opt.title}`);
				logger.error(`错误详情: ${errorMessage}`);
				if (!uploadConfig.downloadThrottle) logger.error("提示: 如果频繁出现此错误，建议在配置中开启「下载限速」功能");
			}
			throw error;
		}
	};
	processFilename = (filename, maxLength = 50) => {
		const lastDotIndex = filename.lastIndexOf(".");
		if (!(lastDotIndex > 0 && lastDotIndex < filename.length - 1)) return filename.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
		const nameWithoutExt = filename.substring(0, lastDotIndex);
		const extension = filename.substring(lastDotIndex);
		return nameWithoutExt.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, " ") + "..." + extension;
	};
});
var cachedMetadata, getBuildMetadata, formatBuildTime;
var init_build_metadata = __esmMin(() => {
	init_root();
	cachedMetadata = null;
	getBuildMetadata = () => {
		if (cachedMetadata) return cachedMetadata;
		try {
			const metadataPath = resolve(Root.pluginPath, "lib/build-metadata.json");
			if (fs.existsSync(metadataPath)) {
				const content = fs.readFileSync(metadataPath, "utf-8");
				cachedMetadata = JSON.parse(content);
				return cachedMetadata;
			}
		} catch (error) {
			logger.error("无法读取构建元数据:", error);
		}
		return null;
	};
	formatBuildTime = (isoString) => {
		const date = new Date(isoString);
		return `${date.getFullYear()}年${String(date.getMonth() + 1).padStart(2, "0")}月${String(date.getDate()).padStart(2, "0")}日 ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
	};
});
var import_heic_decode$1, import_jpeg_js$1, import_jsQR, import_png, QRCodeScanner;
var init_QRCodeScanner = __esmMin(() => {
	import_heic_decode$1 = __toESM(require_heic_decode(), 1);
	import_jpeg_js$1 = __toESM(require_jpeg_js(), 1);
	import_jsQR = __toESM(require_jsQR(), 1);
	import_png = require_png();
	QRCodeScanner = class {
		static async scanFromUrl(imageUrl) {
			try {
				const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
				const buffer = Buffer.from(response.data);
				return this.scanFromBuffer(buffer);
			} catch (error) {
				logger.error("识别二维码时发生错误:", error);
				return null;
			}
		}
		static extractRegion(imageData, x, y, width, height) {
			const newData = new Uint8ClampedArray(width * height * 4);
			for (let dy = 0; dy < height; dy++) for (let dx = 0; dx < width; dx++) {
				const srcX = x + dx;
				const srcY = y + dy;
				if (srcX >= imageData.width || srcY >= imageData.height) continue;
				const srcIndex = (srcY * imageData.width + srcX) * 4;
				const dstIndex = (dy * width + dx) * 4;
				newData[dstIndex] = imageData.data[srcIndex];
				newData[dstIndex + 1] = imageData.data[srcIndex + 1];
				newData[dstIndex + 2] = imageData.data[srcIndex + 2];
				newData[dstIndex + 3] = imageData.data[srcIndex + 3];
			}
			return {
				width,
				height,
				data: newData
			};
		}
		static enhanceContrast(imageData) {
			const { width, height, data: data$1 } = imageData;
			const newData = new Uint8ClampedArray(data$1.length);
			const histogram = new Array(256).fill(0);
			for (let i = 0; i < data$1.length; i += 4) {
				const gray = Math.floor(.299 * data$1[i] + .587 * data$1[i + 1] + .114 * data$1[i + 2]);
				histogram[gray]++;
			}
			const cdf = new Array(256).fill(0);
			cdf[0] = histogram[0];
			for (let i = 1; i < 256; i++) cdf[i] = cdf[i - 1] + histogram[i];
			const totalPixels = width * height;
			const cdfMin = cdf.find((v) => v > 0) || 0;
			for (let i = 0; i < data$1.length; i += 4) {
				const gray = Math.floor(.299 * data$1[i] + .587 * data$1[i + 1] + .114 * data$1[i + 2]);
				const newGray = Math.floor((cdf[gray] - cdfMin) / (totalPixels - cdfMin) * 255);
				newData[i] = newGray;
				newData[i + 1] = newGray;
				newData[i + 2] = newGray;
				newData[i + 3] = data$1[i + 3];
			}
			return {
				width,
				height,
				data: newData
			};
		}
		static tryRecognizeInRegion(imageData, regionName) {
			for (const strategy of [
				{
					name: "默认",
					enhance: false,
					options: void 0
				},
				{
					name: "增强对比度",
					enhance: true,
					options: void 0
				},
				{
					name: "attemptBoth",
					enhance: false,
					options: { inversionAttempts: "attemptBoth" }
				},
				{
					name: "增强+attemptBoth",
					enhance: true,
					options: { inversionAttempts: "attemptBoth" }
				}
			]) try {
				logger.debug(`  尝试策略: ${strategy.name}`);
				const processedData = strategy.enhance ? this.enhanceContrast(imageData) : imageData;
				const code = (0, import_jsQR.default)(processedData.data, processedData.width, processedData.height, strategy.options);
				if (code && code.data) {
					logger.debug(`✓ 成功识别二维码 [区域: ${regionName}] [策略: ${strategy.name}]`);
					logger.debug(`  二维码内容: ${code.data}`);
					return code.data;
				} else logger.debug(`  策略 ${strategy.name} 未识别到二维码`);
			} catch (err) {
				logger.debug(`  策略 ${strategy.name} 执行失败: ${err}`);
			}
			logger.debug(`  区域 ${regionName} 识别失败，尝试下一个区域`);
			return null;
		}
		static detectImageFormat(buffer) {
			if (buffer.length >= 8 && buffer[0] === 137 && buffer[1] === 80 && buffer[2] === 78 && buffer[3] === 71) return "png";
			if (buffer.length >= 3 && buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255) return "jpeg";
			if (buffer.length >= 12) {
				if (buffer.toString("ascii", 4, 8) === "ftyp") {
					const brand = buffer.toString("ascii", 8, 12);
					if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "hevx" || brand === "mif1" || brand === "msf1") return "heic";
				}
			}
			if (buffer.length >= 6 && buffer[0] === 71 && buffer[1] === 73 && buffer[2] === 70 && buffer[3] === 56) return "gif";
			if (buffer.length >= 2 && buffer[0] === 66 && buffer[1] === 77) return "bmp";
			if (buffer.length >= 12 && buffer[0] === 82 && buffer[1] === 73 && buffer[2] === 70 && buffer[3] === 70 && buffer[8] === 87 && buffer[9] === 69 && buffer[10] === 66 && buffer[11] === 80) return "webp";
			return null;
		}
		static parsePNG(buffer) {
			try {
				const png = import_png.PNG.sync.read(buffer);
				logger.debug(`PNG 解析成功: ${png.width}x${png.height}`);
				return {
					width: png.width,
					height: png.height,
					data: Uint8ClampedArray.from(png.data)
				};
			} catch (err) {
				logger.warn("PNG 解析失败:", err);
				return null;
			}
		}
		static parseJPEG(buffer) {
			try {
				const decoded = import_jpeg_js$1.default.decode(buffer, { useTArray: true });
				logger.debug(`JPEG 解析成功: ${decoded.width}x${decoded.height}`);
				return {
					width: decoded.width,
					height: decoded.height,
					data: Uint8ClampedArray.from(decoded.data)
				};
			} catch (err) {
				logger.warn("JPEG 解析失败:", err);
				return null;
			}
		}
		static async parseHEIC(buffer) {
			try {
				const decoded = await (0, import_heic_decode$1.default)({ buffer });
				logger.debug(`HEIC 解析成功: ${decoded.width}x${decoded.height}`);
				return {
					width: decoded.width,
					height: decoded.height,
					data: Uint8ClampedArray.from(decoded.data)
				};
			} catch (err) {
				logger.warn("HEIC 解析失败:", err);
				return null;
			}
		}
		static async parseImageBuffer(buffer) {
			try {
				const format$1 = this.detectImageFormat(buffer);
				logger.debug(`检测到图片格式: ${format$1 || "未知"}`);
				if (!format$1) {
					logger.warn("无法识别图片格式");
					return null;
				}
				switch (format$1) {
					case "png": return this.parsePNG(buffer);
					case "jpeg": return this.parseJPEG(buffer);
					case "heic": return await this.parseHEIC(buffer);
					default:
						logger.warn(`不支持的图片格式: ${format$1}`);
						return null;
				}
			} catch (err) {
				logger.warn("图片解析失败:", err);
				return null;
			}
		}
		static async scanFromBuffer(buffer) {
			try {
				const imageData = await this.parseImageBuffer(buffer);
				if (!imageData) return null;
				const { width, height } = imageData;
				const dataSizeMB = (width * height * 4 / 1024 / 1024).toFixed(2);
				logger.debug(`图片数据: ${width}x${height}, 内存占用: ${dataSizeMB}MB`);
				if (width <= 1024 && height <= 1024) {
					logger.debug("图片尺寸较小，使用全图识别策略");
					const result = this.tryRecognizeInRegion(imageData, "全图");
					if (result) return result;
				}
				logger.debug(`使用分块扫描策略 (${width}x${height})`);
				const scanRegions = [];
				const blockSize = Math.min(800, Math.floor(Math.max(width, height) * .6));
				const blockW = Math.min(blockSize, width);
				const blockH = Math.min(blockSize, height);
				logger.debug("添加四角扫描区域");
				scanRegions.push({
					name: "左上角",
					x: 0,
					y: 0,
					w: blockW,
					h: blockH
				});
				scanRegions.push({
					name: "右上角",
					x: Math.max(0, width - blockW),
					y: 0,
					w: blockW,
					h: blockH
				});
				scanRegions.push({
					name: "左下角",
					x: 0,
					y: Math.max(0, height - blockH),
					w: blockW,
					h: blockH
				});
				scanRegions.push({
					name: "右下角",
					x: Math.max(0, width - blockW),
					y: Math.max(0, height - blockH),
					w: blockW,
					h: blockH
				});
				if (width > blockW * 1.5) {
					logger.debug("添加顶部/底部中间扫描区域");
					scanRegions.push({
						name: "顶部中",
						x: Math.floor((width - blockW) / 2),
						y: 0,
						w: blockW,
						h: blockH
					});
					if (height > blockH * 1.5) scanRegions.push({
						name: "底部中",
						x: Math.floor((width - blockW) / 2),
						y: Math.max(0, height - blockH),
						w: blockW,
						h: blockH
					});
				}
				if (height > blockH * 1.5) {
					logger.debug("添加左右中间扫描区域");
					const middleY = Math.floor((height - blockH) / 2);
					scanRegions.push({
						name: "左中",
						x: 0,
						y: middleY,
						w: blockW,
						h: blockH
					});
					if (width > blockW * 1.5) scanRegions.push({
						name: "右中",
						x: Math.max(0, width - blockW),
						y: middleY,
						w: blockW,
						h: blockH
					});
				}
				if (width > blockW && height > blockH) {
					logger.debug("添加中心区域");
					scanRegions.push({
						name: "中心",
						x: Math.floor((width - blockW) / 2),
						y: Math.floor((height - blockH) / 2),
						w: blockW,
						h: blockH
					});
				}
				logger.debug("添加滑动窗口扫描区域");
				const step = Math.floor(blockSize * .6);
				let slidingWindowCount = 0;
				for (let y = 0; y <= height - blockH; y += step) {
					for (let x = 0; x <= width - blockW; x += step) {
						scanRegions.push({
							name: `滑动-${slidingWindowCount}`,
							x,
							y,
							w: blockW,
							h: blockH
						});
						slidingWindowCount++;
						if (scanRegions.length > 40) {
							logger.debug(`滑动窗口数量达到上限，停止添加 (已添加 ${slidingWindowCount} 个)`);
							break;
						}
					}
					if (scanRegions.length > 40) break;
				}
				logger.debug(`共生成 ${scanRegions.length} 个扫描区域，开始逐个扫描`);
				for (let i = 0; i < scanRegions.length; i++) {
					const region = scanRegions[i];
					logger.debug(`[${i + 1}/${scanRegions.length}] 扫描区域: ${region.name} (位置: ${region.x},${region.y}, 尺寸: ${region.w}x${region.h})`);
					const regionData = this.extractRegion(imageData, region.x, region.y, region.w, region.h);
					const result = this.tryRecognizeInRegion(regionData, region.name);
					if (result) {
						logger.debug(`二维码识别完成，共扫描了 ${i + 1}/${scanRegions.length} 个区域`);
						return result;
					}
				}
				logger.warn(`图片中未识别到二维码，已扫描所有 ${scanRegions.length} 个区域`);
				return null;
			} catch (error) {
				logger.error("解析图片时发生错误:", error);
				return null;
			}
		}
		static isSupportedPlatform(qrContent) {
			return [
				/(https?:\/\/)?(www|v|jx|m|jingxuan)\.(douyin|iesdouyin)\.com/i,
				/https:\/\/aweme\.snssdk\.com\/aweme\/v1\/play/i,
				/(bilibili\.com|b23\.tv|t\.bilibili\.com|bili2233\.cn|\bBV[1-9a-zA-Z]{10}\b|\bav\d+\b)/i,
				/(快手.*快手|v\.kuaishou\.com|kuaishou\.com)/,
				/(xiaohongshu\.com|xhslink\.com)/
			].some((pattern) => pattern.test(qrContent));
		}
	};
});
var Tools, Common;
var init_Common = __esmMin(async () => {
	await init_Config();
	await init_QRCodeScanner();
	await init_root();
	await init_module();
	Tools = class {
		tempDri;
		constructor() {
			this.tempDri = {
				default: `${karinPathTemp$1}/${Root.pluginName}/`.replace(/\\/g, "/"),
				video: `${karinPathTemp$1}/${Root.pluginName}/kkkdownload/video/`.replace(/\\/g, "/"),
				images: `${karinPathTemp$1}/${Root.pluginName}/kkkdownload/images/`.replace(/\\/g, "/")
			};
		}
		async getReplyMessage(e) {
			if (e.replyId) {
				const reply = await e.bot.getMsg(e.contact, e.replyId);
				for (const v of reply.elements) if (v.type === "text") return v.text;
				else if (v.type === "json") return v.data;
				else if (v.type === "image") try {
					logger.debug("检测到引用消息为图片，尝试识别二维码...");
					const imageUrl = v.file;
					if (imageUrl) {
						const qrContent = await QRCodeScanner.scanFromUrl(imageUrl);
						if (qrContent && QRCodeScanner.isSupportedPlatform(qrContent)) {
							logger.debug(`从图片二维码中识别到支持的平台链接: ${qrContent}`);
							return qrContent;
						} else if (qrContent) logger.debug(`识别到二维码内容但不是支持的平台: ${qrContent}`);
					}
				} catch (error) {
					logger.error("识别图片二维码时发生错误:", error);
				}
			}
			return "";
		}
		chineseToArabic(chineseNumber) {
			const chineseToArabicMap = {
				"零": 0,
				"一": 1,
				"二": 2,
				"三": 3,
				"四": 4,
				"五": 5,
				"六": 6,
				"七": 7,
				"八": 8,
				"九": 9
			};
			const units = {
				"十": 10,
				"百": 100,
				"千": 1e3,
				"万": 1e4,
				"亿": 1e8
			};
			let result = 0;
			let temp = 0;
			let unit = 1;
			for (let i = chineseNumber.length - 1; i >= 0; i--) {
				const char = chineseNumber[i];
				if (units[char] !== void 0) {
					unit = units[char];
					if (unit === 1e4 || unit === 1e8) {
						result += temp * unit;
						temp = 0;
					}
				} else {
					const num = chineseToArabicMap[char];
					if (unit > 1) temp += num * unit;
					else temp += num;
					unit = 1;
				}
			}
			return result + temp;
		}
		formatCookies(cookies) {
			return cookies.map((cookie) => {
				const [nameValue] = cookie.split(";").map((part) => part.trim());
				const [name, value] = nameValue.split("=");
				return `${name}=${value}`;
			}).join("; ");
		}
		calculateBitrate(targetSizeMB, duration) {
			return targetSizeMB * 1024 * 1024 * 8 / duration / 1024;
		}
		async getVideoFileSize(filePath) {
			try {
				return (await fs.promises.stat(filePath)).size / (1024 * 1024);
			} catch (error) {
				console.error("获取文件大小时发生错误:", error);
				throw error;
			}
		}
		async removeFile(path$1, force = false) {
			path$1 = path$1.replace(/\\/g, "/");
			if (Config.app.removeCache) try {
				await fs.promises.unlink(path$1);
				logger.mark("缓存文件: ", path$1 + " 删除成功！");
				return true;
			} catch (err) {
				logger.error("缓存文件: ", path$1 + " 删除失败！", err);
				return false;
			}
			else if (force) try {
				await fs.promises.unlink(path$1);
				logger.mark("缓存文件: ", path$1 + " 删除成功！");
				return true;
			} catch (err) {
				logger.error("缓存文件: ", path$1 + " 删除失败！", err);
				return false;
			}
			return true;
		}
		useDarkTheme() {
			let dark = true;
			const configTheme = Config.app.Theme;
			if (configTheme === 0) {
				const currentHour = (/* @__PURE__ */ new Date()).getHours();
				if (currentHour >= 6 && currentHour < 18) dark = false;
			} else if (configTheme === 1) dark = false;
			else if (configTheme === 2) dark = true;
			return dark;
		}
		validateVideoRequest(filename, res) {
			if (!filename) {
				createNotFoundResponse(res, "无效的文件名");
				return null;
			}
			const intendedBaseDir = path.resolve(Common.tempDri.video);
			const requestedPath = path.join(intendedBaseDir, filename);
			const resolvedPath = path.normalize(requestedPath);
			if (!resolvedPath.startsWith(intendedBaseDir + path.sep) || filename.includes("/") || filename.includes("\\")) {
				logger.warn(`潜在的路径穿越尝试或无效文件名: ${filename}, 解析路径: ${resolvedPath}`);
				createNotFoundResponse(res, "无效的文件名或路径");
				return null;
			}
			if (path.basename(filename) !== filename) {
				logger.warn(`文件名包含路径分隔符: ${filename}`);
				createNotFoundResponse(res, "无效的文件名");
				return null;
			}
			if (!fs.existsSync(resolvedPath)) {
				createNotFoundResponse(res, "视频文件未找到");
				return null;
			}
			return resolvedPath;
		}
		count(num) {
			return Count(num);
		}
		formatFileSize(sizeInMB) {
			const size = typeof sizeInMB === "string" ? parseFloat(sizeInMB) : sizeInMB;
			if (size < 1024) return `${size.toFixed(2)}MB`;
			else if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)}GB`;
			else return `${(size / (1024 * 1024)).toFixed(2)}TB`;
		}
	};
	Common = new Tools();
});
function getEmojiId(e, type) {
	return (PLATFORM_EMOJI_IDS[e.bot?.adapter?.platform || "other"] || PLATFORM_EMOJI_IDS.other)[type];
}
async function setEmojiReaction(e, emojiId, isSet = true) {
	if (!Config.app.EmojiReply) return false;
	if (e.isPrivate) return false;
	try {
		await e.bot.setMsgReaction(e.contact, e.messageId, emojiId, isSet);
		return true;
	} catch (err) {
		logger.debug("[EmojiReaction] 设置表情回复失败（已忽略）:", err);
		return false;
	}
}
var PLATFORM_EMOJI_IDS, EmojiReactionManager;
var init_EmojiReaction = __esmMin(() => {
	init_Config();
	PLATFORM_EMOJI_IDS = {
		qq: {
			EYES: 128064,
			PROCESSING: 366,
			SUCCESS: 389,
			ERROR: 379
		},
		wechat: {
			EYES: "WECHAT_EYES_PLACEHOLDER",
			PROCESSING: "WECHAT_PROCESSING_PLACEHOLDER",
			SUCCESS: "WECHAT_SUCCESS_PLACEHOLDER",
			ERROR: "WECHAT_ERROR_PLACEHOLDER"
		},
		telegram: {
			EYES: "TELEGRAM_EYES_PLACEHOLDER",
			PROCESSING: "TELEGRAM_PROCESSING_PLACEHOLDER",
			SUCCESS: "TELEGRAM_SUCCESS_PLACEHOLDER",
			ERROR: "TELEGRAM_ERROR_PLACEHOLDER"
		},
		discord: {
			EYES: "👀",
			PROCESSING: "⏳",
			SUCCESS: "✅",
			ERROR: "❌"
		},
		koko: {
			EYES: "KOKO_EYES_PLACEHOLDER",
			PROCESSING: "KOKO_PROCESSING_PLACEHOLDER",
			SUCCESS: "KOKO_SUCCESS_PLACEHOLDER",
			ERROR: "KOKO_ERROR_PLACEHOLDER"
		},
		other: {
			EYES: "OTHER_EYES_PLACEHOLDER",
			PROCESSING: "OTHER_PROCESSING_PLACEHOLDER",
			SUCCESS: "OTHER_SUCCESS_PLACEHOLDER",
			ERROR: "OTHER_ERROR_PLACEHOLDER"
		}
	};
	PLATFORM_EMOJI_IDS.qq;
	EmojiReactionManager = class {
		e;
		emojiIds = /* @__PURE__ */ new Set();
		constructor(e) {
			this.e = e;
		}
		getPlatformEmojiId(type) {
			return getEmojiId(this.e, type);
		}
		normalizeEmojiId(emojiId) {
			return typeof emojiId === "string" && [
				"EYES",
				"PROCESSING",
				"SUCCESS",
				"ERROR"
			].includes(emojiId) ? this.getPlatformEmojiId(emojiId) : emojiId;
		}
		async add(emojiId) {
			const actualEmojiId = this.normalizeEmojiId(emojiId);
			const success = await setEmojiReaction(this.e, actualEmojiId, true);
			if (success) this.emojiIds.add(actualEmojiId);
			return success;
		}
		async remove(emojiId) {
			const actualEmojiId = this.normalizeEmojiId(emojiId);
			const success = await setEmojiReaction(this.e, actualEmojiId, false);
			if (success) this.emojiIds.delete(actualEmojiId);
			return success;
		}
		async replace(oldEmojiId, newEmojiId, delayMs = 2e3) {
			const addSuccess = await this.add(newEmojiId);
			await new Promise((resolve$1) => setTimeout(resolve$1, delayMs));
			await this.remove(oldEmojiId);
			return addSuccess;
		}
		async clearAll() {
			let count = 0;
			for (const emojiId of this.emojiIds) if (await setEmojiReaction(this.e, emojiId, false)) count++;
			this.emojiIds.clear();
			return count;
		}
		async keepOnly(keepEmojiIds) {
			const keepSet = new Set(keepEmojiIds);
			let removedCount = 0;
			for (const emojiId of this.emojiIds) if (!keepSet.has(emojiId)) {
				if (await this.remove(emojiId)) removedCount++;
			}
			for (const emojiId of keepEmojiIds) if (!this.emojiIds.has(emojiId)) await this.add(emojiId);
			return removedCount;
		}
		getCurrentEmojiIds() {
			return Array.from(this.emojiIds);
		}
		has(emojiId) {
			return this.emojiIds.has(emojiId);
		}
		count() {
			return this.emojiIds.size;
		}
	};
});
async function detectEncoder$1(codec) {
	if (cachedEncoders$1[codec]) return cachedEncoders$1[codec];
	logger.debug(`[BiliDanmaku] 开始检测 ${codec.toUpperCase()} 编码器...`);
	for (const encoder of ENCODER_PRIORITY$1[codec]) {
		logger.debug(`[BiliDanmaku] 测试编码器: ${encoder}`);
		try {
			const result = await ffmpeg(`-f lavfi -i color=c=black:s=320x240:d=0.1 -c:v ${encoder} -f null -`);
			logger.debug(`[BiliDanmaku] ${encoder} 测试结果: status=${result.status}`);
			if (result.status) {
				cachedEncoders$1[codec] = encoder;
				logger.info(`[BiliDanmaku] 使用 ${codec.toUpperCase()} 编码器: ${encoder}`);
				return encoder;
			}
		} catch (e) {
			logger.debug(`[BiliDanmaku] 编码器 ${encoder} 测试异常: ${e}`);
		}
	}
	const fallback = SOFTWARE_FALLBACK$1[codec];
	cachedEncoders$1[codec] = fallback;
	logger.info(`[BiliDanmaku] 回退到软件编码器: ${fallback}`);
	return fallback;
}
async function getVideoBitrate$1(path$1) {
	try {
		const fileSize = fs.statSync(path$1).size;
		const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
		const duration = parseFloat(stdout.trim());
		if (duration > 0 && fileSize > 0) {
			const kbps = Math.round(fileSize * 8 / duration / 1e3);
			logger.debug(`[BiliDanmaku] 通过文件大小计算码率: ${kbps}kbps`);
			return kbps;
		}
	} catch (e) {
		logger.debug(`[BiliDanmaku] 通过文件大小计算码率失败: ${e}`);
	}
	try {
		const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
		const bitrate = parseInt(stdout.trim());
		if (bitrate > 0) return Math.round(bitrate / 1e3);
	} catch {}
	try {
		const { stdout } = await ffprobe(`-v error -show_entries format=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
		const bitrate = parseInt(stdout.trim());
		if (bitrate > 0) return Math.round(bitrate / 1e3);
	} catch {}
	logger.warn("[BiliDanmaku] 无法获取视频码率，将使用 CRF 模式");
	return 0;
}
function getEncoderParams$1(encoder, targetBitrate) {
	const threads = Math.max(1, Math.floor(os.cpus().length / 2));
	if (targetBitrate && targetBitrate > 0) {
		const bitrateK = `${targetBitrate}k`;
		const maxrate = `${Math.round(targetBitrate * 2)}k`;
		const bufsize = `${Math.round(targetBitrate * 4)}k`;
		if (encoder === "h264_nvenc") return `-c:v h264_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "h264_qsv") return `-c:v h264_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "h264_amf") return `-c:v h264_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`;
		if (encoder === "libx264") return `-c:v libx264 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		if (encoder === "hevc_nvenc") return `-c:v hevc_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "hevc_qsv") return `-c:v hevc_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "hevc_amf") return `-c:v hevc_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`;
		if (encoder === "libx265") return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		if (encoder === "av1_nvenc") return `-c:v av1_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "av1_qsv") return `-c:v av1_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "av1_amf") return `-c:v av1_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`;
		if (encoder === "libsvtav1") return `-c:v libsvtav1 -preset 6 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		if (encoder === "libaom-av1") return `-c:v libaom-av1 -cpu-used 4 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
	}
	if (encoder === "h264_nvenc") return "-c:v h264_nvenc -preset p4 -rc vbr -cq 23";
	if (encoder === "h264_qsv") return "-c:v h264_qsv -preset medium -global_quality 23";
	if (encoder === "h264_amf") return "-c:v h264_amf -quality balanced -rc cqp -qp_i 23 -qp_p 23";
	if (encoder === "libx264") return `-c:v libx264 -crf 23 -preset medium -threads ${threads}`;
	if (encoder === "hevc_nvenc") return "-c:v hevc_nvenc -preset p4 -rc vbr -cq 28";
	if (encoder === "hevc_qsv") return "-c:v hevc_qsv -preset medium -global_quality 28";
	if (encoder === "hevc_amf") return "-c:v hevc_amf -quality balanced -rc cqp -qp_i 28 -qp_p 28";
	if (encoder === "libx265") return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`;
	if (encoder === "av1_nvenc") return "-c:v av1_nvenc -preset p4 -rc vbr -cq 30";
	if (encoder === "av1_qsv") return "-c:v av1_qsv -preset medium -global_quality 30";
	if (encoder === "av1_amf") return "-c:v av1_amf -quality balanced -rc cqp -qp_i 30 -qp_p 30";
	if (encoder === "libsvtav1") return `-c:v libsvtav1 -crf 30 -preset 6 -threads ${threads}`;
	if (encoder === "libaom-av1") return `-c:v libaom-av1 -crf 30 -cpu-used 4 -threads ${threads}`;
	return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`;
}
async function getBiliResolution(path$1) {
	try {
		const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${path$1}"`);
		const [w, h] = stdout.trim().split("x").map(Number);
		if (w && h) return {
			width: w,
			height: h
		};
	} catch {}
	try {
		const match = ((await ffmpeg(`-i "${path$1}" -f null -`, { timeout: 5e3 })).stderr || "").match(/(\d{3,4})x(\d{3,4})/);
		if (match) return {
			width: parseInt(match[1]),
			height: parseInt(match[2])
		};
	} catch {}
	return {
		width: 1920,
		height: 1080
	};
}
async function getBiliFrameRate(path$1) {
	try {
		const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
		const [num, den] = stdout.trim().split("/").map(Number);
		if (den > 0) return num / den;
	} catch {}
	try {
		const stderr = (await ffmpeg(`-i "${path$1}" -f null -`, { timeout: 5e3 })).stderr || "";
		const fpsMatch = stderr.match(/(\d+(?:\.\d+)?)\s*fps/);
		if (fpsMatch) return parseFloat(fpsMatch[1]);
		const fracMatch = stderr.match(/(\d+)\/(\d+)\s*fps/);
		if (fracMatch) return parseInt(fracMatch[1]) / parseInt(fracMatch[2]);
	} catch {}
	return 30;
}
function generateBiliASS(danmakuList, width, height, options = {}) {
	const { scrollTime = 8, danmakuOpacity = 70, fontName = "Microsoft YaHei", danmakuArea = .5, danmakuFontSize = "medium" } = options;
	const fontScale = height / 1080;
	const sizeConfig = FONT_SIZE_MAP$1[danmakuFontSize];
	const fontSize = Math.round(sizeConfig.base * fontScale);
	const trackH = Math.round(sizeConfig.trackH * fontScale);
	const topMargin = Math.round(10 * fontScale);
	const bottomMargin = Math.round(10 * fontScale);
	const areaHeight = Math.floor(height * danmakuArea) - topMargin - bottomMargin;
	const trackCount = Math.max(1, Math.floor((areaHeight - fontSize) / trackH));
	const fixedTrackCount = trackCount;
	const minGap = Math.round(10 * fontScale);
	const alpha = Math.round((100 - Math.max(0, Math.min(100, danmakuOpacity))) * 2.55).toString(16).padStart(2, "0").toUpperCase();
	let ass = `[Script Info]\nTitle: Bilibili Danmaku\nScriptType: v4.00+\nPlayResX: ${width}\nPlayResY: ${height}\nTimer: 100.0000\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Scroll,${fontName},${fontSize},&H${alpha}FFFFFF,&H${alpha}FFFFFF,&H${alpha}000000,&H${alpha}000000,0,0,0,0,100,100,0,0,1,1,0,2,0,0,0,1\nStyle: Top,${fontName},${fontSize},&H${alpha}FFFFFF,&H${alpha}FFFFFF,&H${alpha}000000,&H${alpha}000000,0,0,0,0,100,100,0,0,1,1,0,8,0,0,0,1\nStyle: Bottom,${fontName},${fontSize},&H${alpha}FFFFFF,&H${alpha}FFFFFF,&H${alpha}000000,&H${alpha}000000,0,0,0,0,100,100,0,0,1,1,0,2,0,0,0,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;
	const scrollTracks = Array(trackCount).fill(null);
	const topTracks = Array(fixedTrackCount).fill(0);
	const bottomTracks = Array(fixedTrackCount).fill(0);
	const calcDistance = (last, startTime, duration, textWidth) => {
		const lastSpeed = (width + last.textWidth) / last.duration;
		const newSpeed = (width + textWidth) / duration;
		let dist = width - (width - lastSpeed * (startTime - last.startTime) + last.textWidth) - minGap;
		if (newSpeed > lastSpeed) {
			const lastRightXAtEnd = width - lastSpeed * (startTime + duration - last.startTime) + last.textWidth;
			dist = Math.min(dist, -textWidth - lastRightXAtEnd - minGap);
		}
		return dist;
	};
	const sorted = [...danmakuList].sort((a, b) => a.progress - b.progress);
	for (const dm of sorted) {
		if (dm.mode > 5 || !dm.content.trim()) continue;
		const startTime = dm.progress;
		const dmSizeRatio = (dm.fontsize || 25) / 25;
		const dmFontSize = Math.round(fontSize * dmSizeRatio);
		const textWidth = estimateWidth$1(dm.content, dmFontSize);
		const content = escapeASS$1(dm.content);
		const colorTag = dm.color !== 16777215 ? `{\\c&H${toASSColor(dm.color)}&}` : "";
		const sizeTag = dmFontSize !== fontSize ? `{\\fs${dmFontSize}}` : "";
		if (dm.mode === 4) {
			const endTime = startTime + 4e3;
			let idx = bottomTracks.findIndex((t) => t <= startTime);
			if (idx === -1) idx = Math.floor(Math.random() * bottomTracks.length);
			bottomTracks[idx] = endTime;
			const y = height - bottomMargin - idx * trackH;
			ass += `Dialogue: 0,${toASSTime$1(startTime)},${toASSTime$1(endTime)},Bottom,,0,0,0,,{\\an2}${colorTag}${sizeTag}{\\pos(${width / 2},${y})}${content}\n`;
		} else if (dm.mode === 5) {
			const endTime = startTime + 4e3;
			let idx = topTracks.findIndex((t) => t <= startTime);
			if (idx === -1) idx = Math.floor(Math.random() * topTracks.length);
			topTracks[idx] = endTime;
			const y = topMargin + idx * trackH + fontSize;
			ass += `Dialogue: 0,${toASSTime$1(startTime)},${toASSTime$1(endTime)},Top,,0,0,0,,{\\an8}${colorTag}${sizeTag}{\\pos(${width / 2},${y})}${content}\n`;
		} else {
			const duration = scrollTime * 1e3;
			const endTime = startTime + duration;
			for (let i = 0; i < scrollTracks.length; i++) {
				const t = scrollTracks[i];
				if (t && t.startTime + t.duration <= startTime) scrollTracks[i] = null;
			}
			let bestIdx = -1;
			let bestDist = -Infinity;
			for (let i = 0; i < scrollTracks.length; i++) {
				const t = scrollTracks[i];
				if (!t) {
					if (bestIdx === -1) bestIdx = i;
					continue;
				}
				const d = calcDistance(t, startTime, duration, textWidth);
				if (d >= 0) {
					if (bestDist < 0 || d < bestDist) {
						bestDist = d;
						bestIdx = i;
					}
				}
			}
			if (bestIdx === -1 || bestDist < 0 && scrollTracks[bestIdx] !== null) continue;
			scrollTracks[bestIdx] = {
				startTime,
				duration,
				textWidth
			};
			const y = (bestIdx + 1) * trackH;
			ass += `Dialogue: 0,${toASSTime$1(startTime)},${toASSTime$1(endTime)},Scroll,,0,0,0,,{\\an7}${colorTag}${sizeTag}{\\move(${width},${y},${-textWidth},${y})}${content}\n`;
		}
	}
	return ass;
}
function calcCanvas$1(origW, origH, verticalMode) {
	if (verticalMode === "off") return {
		width: origW,
		height: origH,
		offsetY: 0,
		isVertical: false
	};
	const ratio = origW / origH;
	const isWide = isLandscape$1(origW, origH);
	if (verticalMode === "force") {
		const targetRatio = 16 / 9;
		if (isWide) {
			const newW = Math.min(origH, MAX_OUTPUT_WIDTH$1);
			const newH = Math.round(newW * targetRatio);
			const scaledH = Math.round(newW / ratio);
			return {
				width: newW,
				height: newH,
				offsetY: Math.round((newH - scaledH) / 2),
				isVertical: true,
				scale: newW / origW
			};
		} else {
			const newW = Math.min(origW, MAX_OUTPUT_WIDTH$1);
			const scaleRatio = newW / origW;
			const scaledOrigH = Math.round(origH * scaleRatio);
			const newH = Math.round(newW * targetRatio);
			const offsetY = Math.round((newH - scaledOrigH) / 2);
			return {
				width: newW,
				height: newH,
				offsetY: Math.max(0, offsetY),
				isVertical: true,
				scale: scaleRatio
			};
		}
	}
	if (isWide && ratio >= 1.7) {
		const newW = Math.min(origH, MAX_OUTPUT_WIDTH$1);
		const scaleRatio = newW / origH;
		const newH = Math.round(origW * scaleRatio);
		const scaledH = Math.round(newW / ratio);
		return {
			width: newW,
			height: newH,
			offsetY: Math.round((newH - scaledH) / 2),
			isVertical: true,
			scale: newW / origW
		};
	}
	return {
		width: origW,
		height: origH,
		offsetY: 0,
		isVertical: false
	};
}
function buildFilter$1(canvas, assPath) {
	const escaped = escapeWinPath$1(assPath);
	if (canvas.isVertical) {
		if (canvas.scale && canvas.scale !== 1 && canvas.scale < 1) return `scale=${canvas.width}:-1,pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`;
		return `pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`;
	}
	return `subtitles='${escaped}'`;
}
async function burnBiliDanmaku(videoPath, danmakuList, outputPath, options = {}) {
	const { removeSource = false, verticalMode = "off", videoCodec = "h265" } = options;
	const resolution = await getBiliResolution(videoPath);
	const frameRate = await getBiliFrameRate(videoPath);
	const sourceBitrate = await getVideoBitrate$1(videoPath);
	const canvas = calcCanvas$1(resolution.width, resolution.height, verticalMode);
	if (canvas.isVertical) logger.debug(`[BiliDanmaku] 竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`);
	const assContent = generateBiliASS(danmakuList, canvas.width, canvas.height, options);
	const assPath = videoPath.replace(/\.[^.]+$/, "_danmaku.ass");
	fs.writeFileSync(assPath, assContent, "utf-8");
	logger.debug(`[BiliDanmaku] 弹幕字幕已生成: ${assPath}`);
	const result = await ffmpeg(`-y -i "${videoPath}" -vf "${buildFilter$1(canvas, assPath)}" -r ${frameRate} ${getEncoderParams$1(await detectEncoder$1(videoCodec), sourceBitrate)} -c:a copy "${outputPath}"`);
	Common.removeFile(assPath, true);
	if (result.status) {
		logger.mark(`[BiliDanmaku] 弹幕烧录成功: ${outputPath}`);
		if (removeSource) Common.removeFile(videoPath);
	} else logger.error("[BiliDanmaku] 弹幕烧录失败", result);
	return result.status;
}
async function mergeAndBurnBili(videoPath, audioPath, danmakuList, outputPath, options = {}) {
	const { removeSource = false, verticalMode = "off", videoCodec = "h265" } = options;
	if (!fs.existsSync(videoPath)) {
		logger.error(`[BiliDanmaku] 视频文件不存在: ${videoPath}`);
		return false;
	}
	if (!fs.existsSync(audioPath)) {
		logger.error(`[BiliDanmaku] 音频文件不存在: ${audioPath}`);
		return false;
	}
	const resolution = await getBiliResolution(videoPath);
	const frameRate = await getBiliFrameRate(videoPath);
	const sourceBitrate = await getVideoBitrate$1(videoPath);
	const canvas = calcCanvas$1(resolution.width, resolution.height, verticalMode);
	if (canvas.isVertical) logger.debug(`[BiliDanmaku] 竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`);
	logger.debug(`[BiliDanmaku] 分辨率: ${canvas.width}x${canvas.height}, 帧率: ${frameRate}fps, 码率: ${sourceBitrate}kbps`);
	const assContent = generateBiliASS(danmakuList, canvas.width, canvas.height, options);
	const assPath = videoPath.replace(/\.[^.]+$/, "_danmaku.ass");
	fs.writeFileSync(assPath, assContent, "utf-8");
	logger.debug(`[BiliDanmaku] 弹幕字幕已生成: ${assPath}，共 ${danmakuList.length} 条`);
	const result = await ffmpeg(`-y -i "${videoPath}" -i "${audioPath}" -f mp4 -vf "${buildFilter$1(canvas, assPath)}" -r ${frameRate} ${getEncoderParams$1(await detectEncoder$1(videoCodec), sourceBitrate)} -c:a aac -b:a 192k "${outputPath}"`);
	Common.removeFile(assPath, true);
	if (result.status) {
		logger.mark(`[BiliDanmaku] 视频合成+弹幕烧录成功: ${outputPath}`);
		if (removeSource) {
			Common.removeFile(videoPath);
			Common.removeFile(audioPath);
		}
	} else logger.error("[BiliDanmaku] 视频合成+弹幕烧录失败", result);
	return result.status;
}
var ENCODER_PRIORITY$1, SOFTWARE_FALLBACK$1, cachedEncoders$1, toASSColor, toASSTime$1, estimateWidth$1, escapeASS$1, escapeWinPath$1, isLandscape$1, FONT_SIZE_MAP$1, MAX_OUTPUT_WIDTH$1;
var init_danmaku$1 = __esmMin(async () => {
	await init_utils$1();
	ENCODER_PRIORITY$1 = {
		h264: [
			"h264_nvenc",
			"h264_qsv",
			"h264_amf",
			"libx264"
		],
		h265: [
			"hevc_nvenc",
			"hevc_qsv",
			"hevc_amf",
			"libx265"
		],
		av1: [
			"av1_nvenc",
			"av1_qsv",
			"av1_amf",
			"libsvtav1",
			"libaom-av1"
		]
	};
	SOFTWARE_FALLBACK$1 = {
		h264: "libx264",
		h265: "libx265",
		av1: "libsvtav1"
	};
	cachedEncoders$1 = {};
	toASSColor = (color) => {
		const r = color >> 16 & 255;
		const g = color >> 8 & 255;
		return `${(color & 255).toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${r.toString(16).padStart(2, "0")}`.toUpperCase();
	};
	toASSTime$1 = (ms) => {
		const s = ms / 1e3;
		const h = Math.floor(s / 3600);
		const m = Math.floor(s % 3600 / 60);
		const sec = Math.floor(s % 60);
		const cs = Math.floor(s % 1 * 100);
		return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`;
	};
	estimateWidth$1 = (text, fontSize) => {
		let w = 0;
		for (const c of text) w += c.charCodeAt(0) > 127 ? fontSize : fontSize * .5;
		return w;
	};
	escapeASS$1 = (text) => text.replace(/\\/g, "\\\\").replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/\n/g, "\\N");
	escapeWinPath$1 = (path$1) => path$1.replace(/\\/g, "/").replace(/:/g, "\\:");
	isLandscape$1 = (w, h) => w > h;
	FONT_SIZE_MAP$1 = {
		small: {
			base: 25,
			trackH: 30
		},
		medium: {
			base: 32,
			trackH: 38
		},
		large: {
			base: 40,
			trackH: 46
		}
	};
	MAX_OUTPUT_WIDTH$1 = 2160;
});
async function detectEncoder(codec) {
	if (cachedEncoders[codec]) return cachedEncoders[codec];
	logger.debug(`[DouyinDanmaku] 开始检测 ${codec.toUpperCase()} 编码器...`);
	for (const encoder of ENCODER_PRIORITY[codec]) try {
		if ((await ffmpeg(`-f lavfi -i color=c=black:s=320x240:d=0.1 -c:v ${encoder} -f null -`)).status) {
			cachedEncoders[codec] = encoder;
			logger.info(`[DouyinDanmaku] 使用 ${codec.toUpperCase()} 编码器: ${encoder}`);
			return encoder;
		}
	} catch {}
	const fallback = SOFTWARE_FALLBACK[codec];
	cachedEncoders[codec] = fallback;
	logger.info(`[DouyinDanmaku] 回退到软件编码器: ${fallback}`);
	return fallback;
}
async function getVideoBitrate(path$1) {
	try {
		const fileSize = fs.statSync(path$1).size;
		const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
		const duration = parseFloat(stdout.trim());
		if (duration > 0 && fileSize > 0) return Math.round(fileSize * 8 / duration / 1e3);
	} catch {}
	try {
		const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
		const bitrate = parseInt(stdout.trim());
		if (bitrate > 0) return Math.round(bitrate / 1e3);
	} catch {}
	return 0;
}
function getEncoderParams(encoder, targetBitrate) {
	const threads = Math.max(1, Math.floor(os.cpus().length / 2));
	if (targetBitrate && targetBitrate > 0) {
		const adjustedBitrate = Math.round(targetBitrate * 1.4);
		const bitrateK = `${adjustedBitrate}k`;
		const maxrate = `${Math.round(adjustedBitrate * 2.5)}k`;
		const bufsize = `${Math.round(adjustedBitrate * 4)}k`;
		if (encoder === "h264_nvenc") return `-c:v h264_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "h264_qsv") return `-c:v h264_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "h264_amf") return `-c:v h264_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`;
		if (encoder === "libx264") return `-c:v libx264 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		if (encoder === "hevc_nvenc") return `-c:v hevc_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "hevc_qsv") return `-c:v hevc_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "hevc_amf") return `-c:v hevc_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`;
		if (encoder === "libx265") return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		if (encoder === "av1_nvenc") return `-c:v av1_nvenc -preset p4 -rc vbr -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "av1_qsv") return `-c:v av1_qsv -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize}`;
		if (encoder === "av1_amf") return `-c:v av1_amf -quality balanced -rc vbr_peak -b:v ${bitrateK} -maxrate ${maxrate}`;
		if (encoder === "libsvtav1") return `-c:v libsvtav1 -preset 6 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		if (encoder === "libaom-av1") return `-c:v libaom-av1 -cpu-used 4 -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
		return `-c:v libx265 -preset medium -b:v ${bitrateK} -maxrate ${maxrate} -bufsize ${bufsize} -threads ${threads}`;
	}
	if (encoder === "h264_nvenc") return "-c:v h264_nvenc -preset p4 -rc vbr -cq 23";
	if (encoder === "h264_qsv") return "-c:v h264_qsv -preset medium -global_quality 23";
	if (encoder === "h264_amf") return "-c:v h264_amf -quality balanced -rc cqp -qp_i 23 -qp_p 23";
	if (encoder === "libx264") return `-c:v libx264 -crf 23 -preset medium -threads ${threads}`;
	if (encoder === "hevc_nvenc") return "-c:v hevc_nvenc -preset p4 -rc vbr -cq 28";
	if (encoder === "hevc_qsv") return "-c:v hevc_qsv -preset medium -global_quality 28";
	if (encoder === "hevc_amf") return "-c:v hevc_amf -quality balanced -rc cqp -qp_i 28 -qp_p 28";
	if (encoder === "libx265") return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`;
	if (encoder === "av1_nvenc") return "-c:v av1_nvenc -preset p4 -rc vbr -cq 30";
	if (encoder === "av1_qsv") return "-c:v av1_qsv -preset medium -global_quality 30";
	if (encoder === "av1_amf") return "-c:v av1_amf -quality balanced -rc cqp -qp_i 30 -qp_p 30";
	if (encoder === "libsvtav1") return `-c:v libsvtav1 -crf 30 -preset 6 -threads ${threads}`;
	if (encoder === "libaom-av1") return `-c:v libaom-av1 -crf 30 -cpu-used 4 -threads ${threads}`;
	return `-c:v libx265 -crf 28 -preset medium -threads ${threads}`;
}
async function getDouyinResolution(path$1) {
	try {
		const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${path$1}"`);
		const [w, h] = stdout.trim().split("x").map(Number);
		if (w && h) return {
			width: w,
			height: h
		};
	} catch {}
	try {
		const match = ((await ffmpeg(`-i "${path$1}" -f null -`, { timeout: 5e3 })).stderr || "").match(/(\d{3,4})x(\d{3,4})/);
		if (match) return {
			width: parseInt(match[1]),
			height: parseInt(match[2])
		};
	} catch {}
	return {
		width: 1080,
		height: 1920
	};
}
async function getDouyinFrameRate(path$1) {
	try {
		const { stdout } = await ffprobe(`-v error -select_streams v:0 -show_entries stream=r_frame_rate -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
		const [num, den] = stdout.trim().split("/").map(Number);
		if (den > 0) return num / den;
	} catch {}
	try {
		const fpsMatch = ((await ffmpeg(`-i "${path$1}" -f null -`, { timeout: 5e3 })).stderr || "").match(/(\d+(?:\.\d+)?)\s*fps/);
		if (fpsMatch) return parseFloat(fpsMatch[1]);
	} catch {}
	return 30;
}
function generateDouyinASS(danmakuList, width, height, options = {}) {
	const { scrollTime = 8, danmakuOpacity = 70, fontName = "Microsoft YaHei", danmakuArea = .5, danmakuFontSize = "medium" } = options;
	const fontScale = height / 1080;
	const sizeConfig = FONT_SIZE_MAP[danmakuFontSize];
	const fontSize = Math.round(sizeConfig.base * fontScale);
	const trackH = Math.round(sizeConfig.trackH * fontScale);
	const topMargin = Math.round(5 * fontScale);
	const areaHeight = Math.floor(height * danmakuArea) - topMargin;
	const trackCount = Math.max(1, Math.floor((areaHeight - fontSize) / trackH));
	const minGap = Math.round(15 * fontScale);
	const alpha = Math.round((100 - Math.max(0, Math.min(100, danmakuOpacity))) * 2.55).toString(16).padStart(2, "0").toUpperCase();
	let ass = `[Script Info]\nTitle: Douyin Danmaku\nScriptType: v4.00+\nPlayResX: ${width}\nPlayResY: ${height}\nTimer: 100.0000\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Scroll,${fontName},${fontSize},&H${alpha}FFFFFF,&H${alpha}FFFFFF,&H${alpha}000000,&H${alpha}000000,0,0,0,0,100,100,0,0,1,0.8,0,2,0,0,0,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;
	const scrollTracks = Array(trackCount).fill(null);
	const calcDistance = (last, startTime, duration, textWidth) => {
		const lastSpeed = (width + last.textWidth) / last.duration;
		const newSpeed = (width + textWidth) / duration;
		let dist = width - (width - lastSpeed * (startTime - last.startTime) + last.textWidth) - minGap;
		if (newSpeed > lastSpeed) {
			const lastRightXAtEnd = width - lastSpeed * (startTime + duration - last.startTime) + last.textWidth;
			dist = Math.min(dist, -textWidth - lastRightXAtEnd - minGap);
		}
		return dist;
	};
	const sorted = [...danmakuList.filter((dm) => dm.text && dm.text.trim())].sort((a, b) => a.offset_time - b.offset_time);
	for (const dm of sorted) {
		const startTime = dm.offset_time;
		const textWidth = estimateWidth(dm.text, fontSize);
		const content = escapeASS(dm.text);
		const duration = scrollTime * 1e3;
		const endTime = startTime + duration;
		for (let i = 0; i < scrollTracks.length; i++) {
			const t = scrollTracks[i];
			if (t && t.startTime + t.duration <= startTime) scrollTracks[i] = null;
		}
		let bestIdx = -1;
		let bestDist = -Infinity;
		for (let i = 0; i < scrollTracks.length; i++) {
			const t = scrollTracks[i];
			if (!t) {
				if (bestIdx === -1) bestIdx = i;
				continue;
			}
			const d = calcDistance(t, startTime, duration, textWidth);
			if (d >= 0) {
				if (bestDist < 0 || d < bestDist) {
					bestDist = d;
					bestIdx = i;
				}
			}
		}
		if (bestIdx === -1 || bestDist < 0 && scrollTracks[bestIdx] !== null) continue;
		scrollTracks[bestIdx] = {
			startTime,
			duration,
			textWidth
		};
		const y = topMargin + bestIdx * trackH + fontSize;
		ass += `Dialogue: 0,${toASSTime(startTime)},${toASSTime(endTime)},Scroll,,0,0,0,,{\\an7}{\\move(${width},${y},${-textWidth},${y})}${content}\n`;
	}
	return ass;
}
function calcCanvas(origW, origH, verticalMode) {
	if (verticalMode === "off") return {
		width: origW,
		height: origH,
		offsetY: 0,
		isVertical: false
	};
	const ratio = origW / origH;
	const isWide = isLandscape(origW, origH);
	if (verticalMode === "force") {
		const targetRatio = 16 / 9;
		if (isWide) {
			const newW = Math.min(origH, MAX_OUTPUT_WIDTH);
			const newH = Math.round(newW * targetRatio);
			const scaledH = Math.round(newW / ratio);
			return {
				width: newW,
				height: newH,
				offsetY: Math.round((newH - scaledH) / 2),
				isVertical: true,
				scale: newW / origW
			};
		} else {
			const newW = Math.min(origW, MAX_OUTPUT_WIDTH);
			const scaleRatio = newW / origW;
			const scaledOrigH = Math.round(origH * scaleRatio);
			const newH = Math.round(newW * targetRatio);
			const offsetY = Math.round((newH - scaledOrigH) / 2);
			return {
				width: newW,
				height: newH,
				offsetY: Math.max(0, offsetY),
				isVertical: true,
				scale: scaleRatio
			};
		}
	}
	if (isWide && ratio >= 1.7) {
		const newW = Math.min(origH, MAX_OUTPUT_WIDTH);
		const scaleRatio = newW / origH;
		const newH = Math.round(origW * scaleRatio);
		const scaledH = Math.round(newW / ratio);
		return {
			width: newW,
			height: newH,
			offsetY: Math.round((newH - scaledH) / 2),
			isVertical: true,
			scale: newW / origW
		};
	}
	return {
		width: origW,
		height: origH,
		offsetY: 0,
		isVertical: false
	};
}
function buildFilter(canvas, assPath) {
	const escaped = escapeWinPath(assPath);
	if (canvas.isVertical) {
		if (canvas.scale && canvas.scale !== 1 && canvas.scale < 1) return `scale=${canvas.width}:-1,pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`;
		return `pad=${canvas.width}:${canvas.height}:0:${canvas.offsetY}:black,subtitles='${escaped}'`;
	}
	return `subtitles='${escaped}'`;
}
async function burnDouyinDanmaku(videoPath, danmakuList, outputPath, options = {}) {
	const { removeSource = false, verticalMode = "off", videoCodec = "h265" } = options;
	if (!fs.existsSync(videoPath)) {
		logger.error(`[DouyinDanmaku] 视频文件不存在: ${videoPath}`);
		return false;
	}
	const resolution = await getDouyinResolution(videoPath);
	const frameRate = await getDouyinFrameRate(videoPath);
	const sourceBitrate = await getVideoBitrate(videoPath);
	const canvas = calcCanvas(resolution.width, resolution.height, verticalMode);
	if (canvas.isVertical) logger.debug(`[DouyinDanmaku] 竖屏模式: ${resolution.width}x${resolution.height} -> ${canvas.width}x${canvas.height}`);
	logger.debug(`[DouyinDanmaku] 分辨率: ${canvas.width}x${canvas.height}, 帧率: ${frameRate}fps, 码率: ${sourceBitrate}kbps`);
	const assContent = generateDouyinASS(danmakuList, canvas.width, canvas.height, options);
	const assPath = videoPath.replace(/\.[^.]+$/, "_danmaku.ass");
	fs.writeFileSync(assPath, assContent, "utf-8");
	logger.debug(`[DouyinDanmaku] 弹幕字幕已生成: ${assPath}，共 ${danmakuList.length} 条`);
	const result = await ffmpeg(`-y -i "${videoPath}" -vf "${buildFilter(canvas, assPath)}" -r ${frameRate} ${getEncoderParams(await detectEncoder(videoCodec), sourceBitrate)} -c:a copy "${outputPath}"`);
	Common.removeFile(assPath, true);
	if (result.status) {
		logger.mark(`[DouyinDanmaku] 弹幕烧录成功: ${outputPath}`);
		if (removeSource) Common.removeFile(videoPath);
	} else logger.error("[DouyinDanmaku] 弹幕烧录失败", result);
	return result.status;
}
var ENCODER_PRIORITY, SOFTWARE_FALLBACK, cachedEncoders, toASSTime, estimateWidth, escapeASS, escapeWinPath, isLandscape, FONT_SIZE_MAP, MAX_OUTPUT_WIDTH;
var init_danmaku = __esmMin(async () => {
	await init_utils$1();
	ENCODER_PRIORITY = {
		h264: [
			"h264_nvenc",
			"h264_qsv",
			"h264_amf",
			"libx264"
		],
		h265: [
			"hevc_nvenc",
			"hevc_qsv",
			"hevc_amf",
			"libx265"
		],
		av1: [
			"av1_nvenc",
			"av1_qsv",
			"av1_amf",
			"libsvtav1",
			"libaom-av1"
		]
	};
	SOFTWARE_FALLBACK = {
		h264: "libx264",
		h265: "libx265",
		av1: "libsvtav1"
	};
	cachedEncoders = {};
	toASSTime = (ms) => {
		const s = ms / 1e3;
		const h = Math.floor(s / 3600);
		const m = Math.floor(s % 3600 / 60);
		const sec = Math.floor(s % 60);
		const cs = Math.floor(s % 1 * 100);
		return `${h}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`;
	};
	estimateWidth = (text, fontSize) => {
		let w = 0;
		for (const c of text) w += c.charCodeAt(0) > 127 ? fontSize : fontSize * .5;
		return w;
	};
	escapeASS = (text) => text.replace(/\\/g, "\\\\").replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/\n/g, "\\N");
	escapeWinPath = (path$1) => path$1.replace(/\\/g, "/").replace(/:/g, "\\:");
	isLandscape = (w, h) => w > h;
	FONT_SIZE_MAP = {
		small: {
			base: 25,
			trackH: 30
		},
		medium: {
			base: 32,
			trackH: 38
		},
		large: {
			base: 40,
			trackH: 46
		}
	};
	MAX_OUTPUT_WIDTH = 2160;
});
async function fixM4sFile(inputPath, outputPath) {
	const result = await ffmpeg(`-y -i "${inputPath}" -c copy -movflags +faststart "${outputPath}"`);
	if (result.status) logger.debug(`m4s 文件修复成功: ${outputPath}`);
	else logger.error("m4s 文件修复失败", result);
	return result.status;
}
async function getMediaDuration(path$1) {
	const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${path$1}"`);
	return parseFloat(parseFloat(stdout.trim()).toFixed(2));
}
async function loopVideo(inputPath, outputPath, loopCount) {
	if (loopCount <= 1) {
		fs.copyFileSync(inputPath, outputPath);
		return true;
	}
	const result = await ffmpeg(`-y -stream_loop ${loopCount - 1} -i "${inputPath}" -c copy "${outputPath}"`);
	if (result.status) logger.mark(`视频重放成功: ${outputPath}`);
	else logger.error("视频重放失败", result);
	return result.status;
}
async function mergeVideoAudio(videoPath, audioPath, resultPath) {
	const result = await ffmpeg(`-y -i "${videoPath}" -i "${audioPath}" -c copy "${resultPath}"`);
	if (result.status) logger.mark(`视频合成成功: ${resultPath}`);
	else logger.error("视频合成失败", result);
	return result.status;
}
async function compressVideo(options) {
	const { inputPath, outputPath, targetBitrate, maxRate = targetBitrate * 1.5, bufSize = targetBitrate * 2, crf = 35, removeSource = true } = options;
	const result = await ffmpeg(`-y -i "${inputPath}" -b:v ${targetBitrate}k -maxrate ${maxRate}k -bufsize ${bufSize}k -crf ${crf} -preset medium -c:v libx264 -vf "scale='if(gte(iw/ih,16/9),1280,-1)':'if(gte(iw/ih,16/9),-1,720)',scale=ceil(iw/2)*2:ceil(ih/2)*2" "${outputPath}"`);
	if (result.status) {
		logger.mark(`视频压缩成功: ${outputPath}`);
		if (removeSource) Common.removeFile(inputPath);
	} else logger.error(`视频压缩失败: ${inputPath}`, result);
	return result.status;
}
async function createLiveImageContext(bgmPath) {
	return {
		bgmPath,
		bgmDuration: await getMediaDuration(bgmPath),
		usedDuration: 0
	};
}
async function mergeLiveImageIndependent(options, bgmPath) {
	const { videoPath, outputPath, loopCount = 3 } = options;
	const result = await ffmpeg(`-y -stream_loop ${loopCount - 1} -i "${videoPath}" -i "${bgmPath}" -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest "${outputPath}"`);
	if (result.status) logger.mark(`Live 图合成成功: ${outputPath}`);
	else logger.error("Live 图合成失败", result);
	return result.status;
}
async function mergeLiveImageContinuous(options, context) {
	const { videoPath, outputPath, loopCount = 3 } = options;
	const { bgmPath, bgmDuration, usedDuration } = context;
	const totalDuration = await getMediaDuration(videoPath) * loopCount;
	const bgmStartTime = usedDuration % bgmDuration;
	const remainingBgm = bgmDuration - bgmStartTime;
	let inputArgs;
	if (totalDuration <= remainingBgm) inputArgs = `-y -stream_loop ${loopCount - 1} -i "${videoPath}" -ss ${bgmStartTime} -i "${bgmPath}"`;
	else {
		const bgmLoopCount = Math.ceil(totalDuration / bgmDuration) + 1;
		inputArgs = `-y -stream_loop ${loopCount - 1} -i "${videoPath}" -stream_loop ${bgmLoopCount} -ss ${bgmStartTime} -i "${bgmPath}"`;
	}
	const result = await ffmpeg(`${inputArgs} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest "${outputPath}"`);
	const newUsedDuration = (usedDuration + totalDuration) % bgmDuration;
	if (result.status) logger.mark(`Live 图连续合成成功: ${outputPath}`);
	else logger.error("Live 图连续合成失败", result);
	return {
		success: result.status,
		context: {
			...context,
			usedDuration: newUsedDuration
		}
	};
}
var init_FFmpeg = __esmMin(async () => {
	await init_utils$1();
	await init_danmaku$1();
	await init_danmaku();
});
var ERROR_CODE_MAP, RECOVERABLE_ERROR_CODES, RECOVERABLE_KEYWORDS, BASE_HEADERS;
var init_constants = __esmMin(() => {
	ERROR_CODE_MAP = {
		ECONNRESET: "连接被重置",
		ECONNREFUSED: "连接被拒绝",
		ECONNABORTED: "连接中止",
		ETIMEDOUT: "连接超时",
		ENETUNREACH: "网络不可达",
		EHOSTUNREACH: "主机不可达",
		ENOTFOUND: "DNS解析失败",
		EPIPE: "管道破裂",
		EAI_AGAIN: "DNS临时失败",
		ERR_BAD_OPTION_VALUE: "无效的配置选项值",
		ERR_BAD_OPTION: "无效的配置选项",
		ERR_NETWORK: "网络错误",
		ERR_DEPRECATED: "使用了已弃用的功能",
		ERR_BAD_RESPONSE: "无效的响应",
		ERR_BAD_REQUEST: "无效的请求",
		ERR_CANCELED: "请求被取消",
		ERR_NOT_SUPPORT: "不支持的功能",
		ERR_INVALID_URL: "无效的URL",
		EHTTP: "HTTP错误",
		EACCES: "权限不足",
		ENOENT: "文件或目录不存在",
		EMFILE: "打开的文件过多",
		ENOSPC: "磁盘空间不足"
	};
	RECOVERABLE_ERROR_CODES = [
		"ECONNRESET",
		"ETIMEDOUT",
		"ECONNREFUSED",
		"ENOTFOUND",
		"ENETUNREACH",
		"EHOSTUNREACH",
		"EPIPE",
		"EAI_AGAIN",
		"ECONNABORTED"
	];
	RECOVERABLE_KEYWORDS = [
		"aborted",
		"timeout",
		"network",
		"ECONNRESET",
		"socket hang up",
		"connection reset"
	];
	BASE_HEADERS = {
		Accept: "*/*",
		"accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0"
	};
});
var getErrorDescription, sanitizeHeaders, isRecoverableNetworkError, isThrottlingError, calculateBackoffDelay, formatBytes, sanitizeFilename;
var init_helpers = __esmMin(() => {
	init_constants();
	getErrorDescription = (error) => {
		const code = error?.code || (error instanceof AxiosError ? error.code : null);
		const message = error?.message || String(error);
		if (code && ERROR_CODE_MAP[code]) return `${ERROR_CODE_MAP[code]} (${code}): ${message}`;
		else if (code) return `错误代码 ${code}: ${message}`;
		else return message;
	};
	sanitizeHeaders = (headers) => {
		if (!headers) return {};
		const sanitized = {};
		const sensitiveKeys = [
			"cookie",
			"cookies",
			"authorization",
			"x-api-key",
			"api-key",
			"token"
		];
		const ipSensitiveKeys = [
			"x-forwarded-for",
			"x-real-ip",
			"x-client-ip",
			"x-originating-ip"
		];
		for (const [key, value] of Object.entries(headers)) {
			const lowerKey = key.toLowerCase();
			if (sensitiveKeys.some((sk) => lowerKey.includes(sk))) continue;
			if (ipSensitiveKeys.some((sk) => lowerKey.includes(sk))) continue;
			sanitized[key] = String(value);
		}
		return sanitized;
	};
	isRecoverableNetworkError = (error) => {
		if (error?.code && RECOVERABLE_ERROR_CODES.includes(error.code)) return true;
		if (error instanceof AxiosError) {
			if (error.code && RECOVERABLE_ERROR_CODES.includes(error.code)) return true;
			const errorMessage = error.message?.toLowerCase() || "";
			if (RECOVERABLE_KEYWORDS.some((keyword) => errorMessage.includes(keyword.toLowerCase()))) return true;
		}
		if (error instanceof Error) {
			const errorMessage = error.message?.toLowerCase() || "";
			if (RECOVERABLE_KEYWORDS.some((keyword) => errorMessage.includes(keyword.toLowerCase()))) return true;
		}
		return false;
	};
	isThrottlingError = (error) => {
		if ((error?.code || (error instanceof AxiosError ? error.code : null)) === "ECONNRESET") return true;
		const message = error?.message?.toLowerCase() || "";
		return [
			"connection reset",
			"socket hang up",
			"econnreset"
		].some((keyword) => message.includes(keyword));
	};
	calculateBackoffDelay = (retryCount, baseDelay = 1e3, maxDelay = 8e3) => Math.min(2 ** retryCount * baseDelay, maxDelay);
	formatBytes = (bytes) => {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
		return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
	};
	sanitizeFilename = (filename) => filename.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").replace(/^\.+/, "").replace(/\.+$/, "").replace(/\s+/g, "_").substring(0, 200);
});
var ThrottleStream;
var init_ThrottleStream = __esmMin(() => {
	ThrottleStream = class extends Transform {
		bytesPerSecond;
		startTime;
		totalBytes;
		constructor(bytesPerSecond) {
			super();
			this.bytesPerSecond = bytesPerSecond;
			this.startTime = Date.now();
			this.totalBytes = 0;
		}
		setSpeed(newSpeed) {
			this.bytesPerSecond = newSpeed;
			this.startTime = Date.now();
			this.totalBytes = 0;
		}
		getSpeed() {
			return this.bytesPerSecond;
		}
		getCurrentSpeed() {
			const elapsed = (Date.now() - this.startTime) / 1e3;
			if (elapsed <= 0) return 0;
			return this.totalBytes / elapsed;
		}
		_transform(chunk, _encoding, callback) {
			this.totalBytes += chunk.length;
			const elapsed = (Date.now() - this.startTime) / 1e3;
			const expectedTime = this.totalBytes / this.bytesPerSecond;
			const delay$1 = Math.max(0, (expectedTime - elapsed) * 1e3);
			if (delay$1 > 0) setTimeout(() => {
				this.push(chunk);
				callback();
			}, delay$1);
			else {
				this.push(chunk);
				callback();
			}
		}
		_flush(callback) {
			callback();
		}
	};
});
var DEFAULT_THROTTLE_CONFIG;
var init_types = __esmMin(() => {
	DEFAULT_THROTTLE_CONFIG = {
		enabled: true,
		maxSpeed: 10 * 1024 * 1024,
		autoReduceRatio: .7,
		minSpeed: 1 * 1024 * 1024
	};
});
var Downloader;
var init_Downloader = __esmMin(() => {
	init_helpers();
	init_ThrottleStream();
	init_types();
	Downloader = class {
		axiosInstance;
		url;
		filepath;
		headers;
		timeout;
		maxRetries;
		throttleConfig;
		currentSpeed;
		consecutiveResets;
		constructor(axiosInstance, url, filepath, headers, timeout, maxRetries, throttleConfig) {
			this.axiosInstance = axiosInstance;
			this.url = url;
			this.filepath = filepath;
			this.headers = headers;
			this.timeout = timeout;
			this.maxRetries = maxRetries;
			this.throttleConfig = {
				...DEFAULT_THROTTLE_CONFIG,
				...throttleConfig
			};
			this.currentSpeed = this.throttleConfig.maxSpeed;
			this.consecutiveResets = 0;
		}
		async download(progressCallback, retryCount = 0) {
			if (!this.url || !/^https?:\/\//i.test(this.url)) {
				const sanitized = sanitizeHeaders(this.headers);
				throw new Error(`Invalid URL: ${this.url || "(empty)"}, Headers: ${JSON.stringify(sanitized)}`);
			}
			if (!this.filepath) throw new Error("未指定文件保存路径: filepath 为空");
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), this.timeout);
			let intervalId = null;
			let throttleStream = null;
			try {
				let startByte = 0;
				if (fs.existsSync(this.filepath)) {
					startByte = fs.statSync(this.filepath).size;
					logger.debug(`检测到部分下载文件，从 ${formatBytes(startByte)} 处继续下载`);
				}
				const requestConfig = {
					url: this.url,
					method: "GET",
					responseType: "stream",
					signal: controller.signal,
					headers: { ...this.headers },
					skipRetry: true
				};
				if (startByte > 0) requestConfig.headers = {
					...requestConfig.headers,
					Range: `bytes=${startByte}-`
				};
				logger.debug("开始下载流", {
					url: this.url,
					headers: sanitizeHeaders(requestConfig.headers),
					throttleEnabled: this.throttleConfig.enabled,
					currentSpeed: formatBytes(this.currentSpeed) + "/s"
				});
				const response = await this.axiosInstance(requestConfig);
				clearTimeout(timeoutId);
				if (response.status === 416) {
					logger.warn("服务器返回 416，文件可能已下载完成，验证文件大小...");
					if (fs.existsSync(this.filepath)) {
						const stats = fs.statSync(this.filepath);
						logger.debug(`当前文件大小: ${formatBytes(stats.size)}`);
						if (stats.size > 1024) {
							logger.debug("文件大小合理，认为下载已完成");
							return {
								filepath: this.filepath,
								totalBytes: stats.size
							};
						} else {
							logger.warn("文件太小，删除并重新下载");
							fs.unlinkSync(this.filepath);
							return this.download(progressCallback, retryCount + 1);
						}
					}
				}
				if (response.status !== 200 && response.status !== 206) {
					logger.error(`下载失败: HTTP ${response.status}, URL: ${this.url}`);
					logger.error(`响应头: ${JSON.stringify(response.headers)}`);
					if (response.headers["content-length"] && parseInt(response.headers["content-length"]) < 10240) {
						let errorBody = "";
						response.data.on("data", (chunk) => {
							errorBody += chunk.toString();
						});
						await new Promise((resolve$1) => setTimeout(resolve$1, 100));
						logger.error(`响应内容: ${errorBody}`);
					}
					throw new Error(`HTTP ${response.status}: ${this.url}`);
				}
				const supportsRange = response.status === 206;
				if (startByte > 0 && !supportsRange) {
					logger.warn("服务器不支持断点续传，将重新下载整个文件");
					if (fs.existsSync(this.filepath)) fs.unlinkSync(this.filepath);
					startByte = 0;
				}
				const rawContentLength = response.headers["content-length"];
				const contentLength = Number.parseInt(rawContentLength ?? "-1", 10);
				if (Number.isNaN(contentLength)) {
					const sanitized = sanitizeHeaders(this.headers);
					throw new Error(`无效的 content-length 响应头, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`);
				}
				const totalBytes = supportsRange ? startByte + contentLength : contentLength;
				let downloadedBytes = startByte;
				let lastPrintedPercentage = -1;
				const writer = fs.createWriteStream(this.filepath, { flags: startByte > 0 ? "a" : "w" });
				const printProgress = () => {
					if (totalBytes > 0) {
						const progressPercentage = Math.floor(downloadedBytes / totalBytes * 100);
						if (progressPercentage !== lastPrintedPercentage) {
							progressCallback(downloadedBytes, totalBytes);
							lastPrintedPercentage = progressPercentage;
						}
					} else progressCallback(downloadedBytes, totalBytes);
				};
				const interval = totalBytes > 0 && totalBytes < 10 * 1024 * 1024 ? 1e3 : 500;
				intervalId = setInterval(printProgress, interval);
				const counterStream = new Transform({ transform(chunk, encoding, callback) {
					downloadedBytes += chunk.length;
					callback(null, chunk);
				} });
				if (this.throttleConfig.enabled) {
					throttleStream = new ThrottleStream(this.currentSpeed);
					logger.debug(`启用限速下载: ${formatBytes(this.currentSpeed)}/s`);
					await pipeline(response.data, throttleStream, counterStream, writer);
				} else await pipeline(response.data, counterStream, writer);
				if (intervalId) clearInterval(intervalId);
				logger.debug("文件下载并写入完成");
				if (fs.existsSync(this.filepath)) {
					const actualSize = fs.statSync(this.filepath).size;
					const expectedSize = totalBytes > 0 ? totalBytes : downloadedBytes;
					if (actualSize < 1024 && expectedSize < 1024) {
						logger.error(`下载的文件异常小 (${formatBytes(actualSize)})，可能是错误响应`);
						try {
							const content = fs.readFileSync(this.filepath, "utf-8");
							logger.error(`文件内容: ${content}`);
						} catch {
							logger.error("无法读取文件内容（可能是二进制文件）");
						}
						throw new Error(`下载的文件异常小: ${formatBytes(actualSize)}，可能是错误响应或链接失效`);
					}
					if (actualSize < expectedSize) {
						logger.warn(`文件大小不匹配: 实际 ${formatBytes(actualSize)}, 预期 ${formatBytes(expectedSize)}`);
						logger.warn(`差异: ${formatBytes(expectedSize - actualSize)} (${((expectedSize - actualSize) / expectedSize * 100).toFixed(2)}%)`);
						if ((expectedSize - actualSize) / expectedSize > .01) throw new Error(`文件下载不完整: 实际 ${formatBytes(actualSize)}, 预期 ${formatBytes(expectedSize)}`);
					} else logger.debug(`文件大小验证通过: ${formatBytes(actualSize)}`);
				}
				this.consecutiveResets = 0;
				return {
					filepath: this.filepath,
					totalBytes: totalBytes > 0 ? totalBytes : downloadedBytes
				};
			} catch (error) {
				clearTimeout(timeoutId);
				if (intervalId) clearInterval(intervalId);
				const isRecoverable = isRecoverableNetworkError(error);
				const isThrottling = isThrottlingError(error);
				const errorDesc = getErrorDescription(error);
				if (error instanceof AxiosError) {
					const sanitized = sanitizeHeaders(this.headers);
					logger.error(`请求失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`);
				} else logger.error(`下载失败: ${errorDesc}`);
				if (isThrottling && this.throttleConfig.enabled) {
					this.consecutiveResets++;
					const newSpeed = Math.max(this.currentSpeed * this.throttleConfig.autoReduceRatio, this.throttleConfig.minSpeed);
					if (newSpeed < this.currentSpeed) {
						logger.warn(`检测到服务器断流 (连续 ${this.consecutiveResets} 次)，自动降速: ${formatBytes(this.currentSpeed)}/s -> ${formatBytes(newSpeed)}/s`);
						this.currentSpeed = newSpeed;
					} else logger.warn(`已达到最低速度限制 ${formatBytes(this.throttleConfig.minSpeed)}/s，无法继续降速`);
				}
				const nextDelay = calculateBackoffDelay(retryCount);
				if (retryCount < this.maxRetries) {
					if (isRecoverable && fs.existsSync(this.filepath)) {
						const stats = fs.statSync(this.filepath);
						logger.warn(`检测到可恢复的网络错误，保留已下载的 ${formatBytes(stats.size)} 数据`);
						logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1e3} 秒后使用断点续传重试`);
					} else logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1e3} 秒后重试`);
					await new Promise((resolve$1) => setTimeout(resolve$1, nextDelay));
					return this.download(progressCallback, retryCount + 1);
				} else {
					if (fs.existsSync(this.filepath)) {
						const stats = fs.statSync(this.filepath);
						if (isRecoverable && stats.size > 0) {
							logger.warn(`下载失败但保留了部分文件 (${formatBytes(stats.size)}): ${this.filepath}`);
							logger.warn("这可能是由于网络环境变化或服务器风控导致的，文件已保留供后续恢复");
							if (isThrottling) logger.warn("建议: 服务器可能有下载速度限制，请尝试在配置中降低 maxSpeed 参数");
						} else try {
							fs.unlinkSync(this.filepath);
							logger.debug("已清理部分下载的文件");
						} catch (cleanupError) {
							logger.warn("清理部分下载文件失败:", cleanupError);
						}
					}
					const sanitized = sanitizeHeaders(this.headers);
					throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`);
				}
			}
		}
		setSpeed(speed) {
			this.currentSpeed = Math.max(speed, this.throttleConfig.minSpeed);
			logger.debug(`手动设置下载速度: ${formatBytes(this.currentSpeed)}/s`);
		}
		getSpeed() {
			return this.currentSpeed;
		}
	};
});
var ImageDownloader;
var init_ImageDownloader = __esmMin(() => {
	init_Config();
	init_helpers();
	ImageDownloader = class {
		axiosInstance;
		tempDir;
		constructor(axiosInstance, tempDir) {
			this.axiosInstance = axiosInstance;
			this.tempDir = tempDir;
			if (!fs.existsSync(this.tempDir)) fs.mkdirSync(this.tempDir, { recursive: true });
		}
		async processImage(imageUrl, title, index) {
			if (!Config.app.downloadImageLocally) return imageUrl;
			try {
				const result = await this.downloadImage(imageUrl, title, index);
				if (result.shouldDelete) this.scheduleDelete(result.filePath);
				return result.filePath;
			} catch (error) {
				logger.error(`图片下载失败，回退到原始 URL: ${imageUrl}`, error);
				return imageUrl;
			}
		}
		async downloadImage(imageUrl, title, index) {
			const filename = this.generateFilename(imageUrl, title, index);
			const filePath = path.join(this.tempDir, filename);
			const response = await this.axiosInstance.get(imageUrl, {
				responseType: "arraybuffer",
				timeout: 3e4
			});
			fs.writeFileSync(filePath, response.data);
			logger.debug(`图片已下载: ${filePath}`);
			return {
				filePath: `file://${filePath}`,
				shouldDelete: true
			};
		}
		generateFilename(imageUrl, title, index) {
			const ext = this.getExtension(imageUrl);
			if (Config.app.removeCache) return `tmp_${Date.now()}${index !== void 0 ? `_${index}` : ""}${ext}`;
			else return `${title ? sanitizeFilename(title) : `image_${Date.now()}`}${index !== void 0 ? `_${index}` : ""}${ext}`;
		}
		getExtension(url) {
			try {
				const pathname = new URL(url).pathname;
				const ext = path.extname(pathname);
				if (ext && /^\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(ext)) return ext;
			} catch {}
			return ".jpg";
		}
		scheduleDelete(filePath) {
			const actualPath = filePath.replace(/^file:\/\//, "");
			setTimeout(() => {
				this.deleteFile(actualPath);
			}, 600 * 1e3);
		}
		deleteFile(filePath) {
			try {
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
					logger.debug(`临时图片已删除: ${filePath}`);
				}
			} catch (error) {
				logger.error(`删除临时图片失败: ${filePath}`, error);
			}
		}
		async processImages(imageUrls, title) {
			return await Promise.all(imageUrls.map((url, index) => this.processImage(url, title, index)));
		}
	};
});
var Network;
var init_Network$1 = __esmMin(() => {
	init_constants();
	init_Downloader();
	init_helpers();
	Network = class {
		url;
		method;
		headers;
		type;
		body;
		axiosInstance;
		timeout;
		filepath;
		maxRetries;
		throttleConfig;
		constructor(data$1) {
			this.headers = data$1.headers ? Object.fromEntries(Object.entries(data$1.headers).map(([key, value]) => [key, String(value)])) : {};
			this.headers = {
				...Object.fromEntries(Object.entries(BASE_HEADERS ?? {}).map(([key, value]) => [key, String(value)])),
				...this.headers
			};
			this.url = data$1.url ?? "";
			this.type = data$1.type ?? "json";
			this.method = data$1.method ?? "GET";
			this.body = data$1.body ?? null;
			this.timeout = data$1.timeout ?? 15e3;
			this.filepath = data$1.filepath ?? "";
			this.maxRetries = data$1.maxRetries ?? 3;
			this.throttleConfig = data$1.throttle;
			this.axiosInstance = axios.create({
				timeout: this.timeout,
				headers: this.headers,
				maxRedirects: 5,
				validateStatus: () => true
			});
			this.axiosInstance.interceptors.response.use(void 0, async (error) => {
				const config$1 = error.config;
				if (!config$1 || config$1.skipRetry) return Promise.reject(error);
				config$1.__retryCount = config$1.__retryCount || 0;
				if (config$1.__retryCount >= this.maxRetries) return Promise.reject(error);
				if (!isRecoverableNetworkError(error)) return Promise.reject(error);
				config$1.__retryCount += 1;
				const nextDelay = Math.max(1e3, Math.min(2 ** (config$1.__retryCount - 1) * 1e3, 8e3));
				logger.warn(`请求失败，正在重试... (${config$1.__retryCount}/${this.maxRetries})，将在 ${nextDelay / 1e3} 秒后重试`);
				await new Promise((resolve$1) => setTimeout(resolve$1, nextDelay));
				return this.axiosInstance(config$1);
			});
		}
		get config() {
			const config$1 = {
				url: this.url,
				method: this.method,
				headers: this.headers,
				responseType: this.type
			};
			if (this.method === "POST" && this.body) config$1.data = this.body;
			return config$1;
		}
		async downloadStream(progressCallback, retryCount = 0) {
			return new Downloader(this.axiosInstance, this.url, this.filepath, this.headers, this.timeout, this.maxRetries, this.throttleConfig).download(progressCallback, retryCount);
		}
		async getfetch() {
			try {
				return await this.returnResult();
			} catch (error) {
				logger.info(error);
				return false;
			}
		}
		async returnResult() {
			let response = {};
			try {
				response = await this.axiosInstance(this.config);
			} catch (error) {
				logger.error(error);
			}
			return response;
		}
		async getLongLink(url = "", depth = 0) {
			const MAX_REDIRECTS = 10;
			if (depth > MAX_REDIRECTS) throw new Error(`重定向次数超过限制 (${MAX_REDIRECTS})`);
			const targetUrl = this.url || url;
			try {
				new URL(targetUrl);
			} catch {
				const sanitized$1 = sanitizeHeaders(this.headers);
				throw new Error(`Invalid URL: ${targetUrl || "(empty)"}, Headers: ${JSON.stringify(sanitized$1)}`);
			}
			const methods = ["head", "get"];
			let lastError = null;
			for (const method of methods) try {
				const response = await this.axiosInstance.request({
					url: targetUrl,
					method,
					maxRedirects: 5,
					validateStatus: (status) => status >= 200 && status < 400,
					headers: method === "get" ? {
						...this.headers,
						Range: "bytes=0-0"
					} : this.headers,
					skipRetry: true
				});
				return response.request?.res?.responseUrl ?? response.config?.url ?? targetUrl;
			} catch (error) {
				const axiosError = error;
				if (axiosError.response?.status && [
					301,
					302,
					303,
					307,
					308
				].includes(axiosError.response.status) && axiosError.response.headers?.location) {
					const location = axiosError.response.headers.location;
					const redirectUrl = location.startsWith("http") ? location : new URL(location, targetUrl).href;
					logger.info(`检测到${axiosError.response.status}重定向 (深度: ${depth + 1}), 目标: ${redirectUrl}`);
					return await this.getLongLink(redirectUrl, depth + 1);
				}
				if (method === "head") {
					logger.debug(`HEAD 请求失败 (${axiosError.code || axiosError.message})，尝试 GET 请求`);
					lastError = axiosError;
					continue;
				}
				lastError = axiosError;
			}
			const sanitized = sanitizeHeaders(this.headers);
			const msg = `获取链接重定向失败: ${targetUrl} - ${getErrorDescription(lastError)}, Headers: ${JSON.stringify(sanitized)}`;
			logger.error(msg);
			throw new Error(msg);
		}
		async getLocation() {
			try {
				return (await this.axiosInstance({
					method: "GET",
					url: this.url,
					maxRedirects: 0,
					validateStatus: (status) => status >= 300 && status < 400
				})).headers.location;
			} catch (error) {
				if (error instanceof AxiosError) {
					const sanitized = sanitizeHeaders(this.headers);
					logger.error(`获取 ${this.url} 重定向地址失败，接口响应状态码: ${error.response?.status}, Headers: ${JSON.stringify(sanitized)}`);
					throw new Error(error.stack);
				}
			}
		}
		async getData() {
			try {
				const result = await this.returnResult();
				if (result.status === 504) return result;
				if (result.status === 429) {
					logger.error("HTTP 响应状态码: 429");
					throw new Error("ratelimit triggered, 触发 https://www.douyin.com/ 的速率限制！！！");
				}
				return result.data;
			} catch (error) {
				if (error instanceof AxiosError) {
					const sanitized = sanitizeHeaders(this.headers);
					const errorDesc = getErrorDescription(error);
					throw new Error(`${errorDesc}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`);
				}
				return false;
			}
		}
		async getHeaders() {
			try {
				return (await this.axiosInstance({
					...this.config,
					method: "GET",
					headers: {
						...this.config.headers,
						Range: "bytes=0-0"
					}
				})).headers;
			} catch (error) {
				if (error instanceof AxiosError) {
					const sanitized = sanitizeHeaders(this.headers);
					const errorMsg = `获取响应头失败: ${getErrorDescription(error)}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`;
					logger.error(errorMsg);
					throw new Error(errorMsg);
				}
				logger.error(error);
				throw error;
			}
		}
		async getHeadersFull() {
			try {
				return (await this.axiosInstance({
					...this.config,
					method: "GET"
				})).headers;
			} catch (error) {
				if (error instanceof AxiosError) {
					const sanitized = sanitizeHeaders(this.headers);
					const errorMsg = `获取完整响应头失败: ${getErrorDescription(error)}, URL: ${this.url}, Headers: ${JSON.stringify(sanitized)}`;
					logger.error(errorMsg);
					throw new Error(errorMsg);
				}
				logger.error(error);
				throw error;
			}
		}
	};
});
var init_Network = __esmMin(() => {
	init_Downloader();
	init_helpers();
	init_ImageDownloader();
	init_Network$1();
	init_ThrottleStream();
	init_types();
	init_constants();
});
function getImageDownloader() {
	if (!imageDownloader) imageDownloader = new ImageDownloader(axios.create({
		timeout: 3e4,
		maxRedirects: 5
	}), Common.tempDri.images);
	return imageDownloader;
}
async function processImageUrl(imageUrl, title, index) {
	return await getImageDownloader().processImage(imageUrl, title, index);
}
var imageDownloader;
var init_ImageHelper = __esmMin(async () => {
	await init_Common();
	await init_Network();
	imageDownloader = null;
});
var init_Networks = __esmMin(() => {
	init_Network();
});
var import_qr_code_styling, createQrCodePlugin;
var init_plugins = __esmMin(() => {
	init_lib();
	import_qr_code_styling = __toESM(require_qr_code_styling(), 1);
	createQrCodePlugin = () => ({
		name: "qr-code",
		enforce: "pre",
		async beforeRender(ctx) {
			const data$1 = ctx.request.data || {};
			const useDarkTheme = Boolean(data$1.useDarkTheme);
			const toDataUrl = async (url) => {
				const buffer = await new import_qr_code_styling.default({
					jsdom: Window,
					type: "svg",
					shape: "square",
					width: 2e3,
					height: 2e3,
					data: url,
					margin: 0,
					qrOptions: {
						typeNumber: 0,
						mode: "Byte",
						errorCorrectionLevel: "L"
					},
					imageOptions: {
						hideBackgroundDots: false,
						imageSize: .4,
						margin: 0
					},
					dotsOptions: {
						type: "rounded",
						color: useDarkTheme ? "#C3C3C3" : "#3A3A3A",
						roundSize: false
					},
					backgroundOptions: { color: "transparent" },
					cornersSquareOptions: {
						type: "extra-rounded",
						color: useDarkTheme ? "#C3C3C3" : "#3A3A3A"
					},
					cornersDotOptions: { color: useDarkTheme ? "#C3C3C3" : "#3A3A3A" }
				}).getRawData("svg");
				if (!buffer) throw new Error("Failed to generate QR code");
				return `data:image/svg+xml;base64,${buffer.toString("base64")}`;
			};
			const props = ctx.state.props || {};
			if (!props.qrCodes) props.qrCodes = {};
			if (!props.qrCodeDataUrl) props.qrCodeDataUrl = void 0;
			if (typeof data$1.share_url === "string" && data$1.share_url.length > 0) {
				const dataUrl = await toDataUrl(data$1.share_url);
				const qrCodes = props.qrCodes;
				qrCodes.share_url = dataUrl;
				if (!props.qrCodeDataUrl) props.qrCodeDataUrl = dataUrl;
			}
			ctx.state.props = props;
		}
	});
});
var semver_exports = __export({ isSemverGreater: () => isSemverGreater }, 1);
var isSemverGreater;
var init_semver = __esmMin(() => {
	isSemverGreater = (remote, local) => {
		if (!remote || !local) return false;
		const parse = (v) => {
			v = v.trim();
			if (v.startsWith("v") || v.startsWith("V")) v = v.slice(1);
			const [preBuild] = v.split("+", 2);
			const [core, pre] = preBuild.split("-", 2);
			const parts = core.split(".");
			return {
				major: parseInt(parts[0] || "0", 10) || 0,
				minor: parseInt(parts[1] || "0", 10) || 0,
				patch: parseInt(parts[2] || "0", 10) || 0,
				prerelease: pre ? pre.split(".") : []
			};
		};
		const cmpId = (a, b) => {
			const an = /^\d+$/.test(a);
			const bn = /^\d+$/.test(b);
			if (an && bn) {
				const na = parseInt(a, 10);
				const nb = parseInt(b, 10);
				if (na === nb) return 0;
				return na > nb ? 1 : -1;
			}
			if (an && !bn) return -1;
			if (!an && bn) return 1;
			if (a === b) return 0;
			return a > b ? 1 : -1;
		};
		const r = parse(remote);
		const l = parse(local);
		if (r.major !== l.major) return r.major > l.major;
		if (r.minor !== l.minor) return r.minor > l.minor;
		if (r.patch !== l.patch) return r.patch > l.patch;
		const ra = r.prerelease;
		const la = l.prerelease;
		if (ra.length === 0 && la.length === 0) return false;
		if (ra.length === 0 && la.length > 0) return true;
		if (ra.length > 0 && la.length === 0) return false;
		const len = Math.min(ra.length, la.length);
		for (const [i, raItem] of ra.entries()) {
			if (i >= len) break;
			const c = cmpId(raItem, la[i]);
			if (c !== 0) return c > 0;
		}
		if (ra.length !== la.length) return ra.length > la.length;
		return false;
	};
});
var Render_exports = __export({ Render: () => Render }, 1);
var Render;
var init_Render = __esmMin(async () => {
	await init_client();
	await init_module();
	await init_Config();
	await init_plugins();
	Render = async (path$1, data$1) => {
		const pathParts = path$1.split("/");
		let templateType;
		let templateName;
		if (pathParts.length === 2) [templateType, templateName] = pathParts;
		else if (pathParts.length === 3) {
			templateType = pathParts[0];
			templateName = `${pathParts[1]}/${pathParts[2]}`;
		} else throw new Error(`不支持的路径格式: ${path$1}`);
		const outputDir = path.join(karinPathHtml, Root.pluginName, templateType);
		let hasUpdate = false;
		if (!Config.app.RemoveWatermark) try {
			const { db: db$1 } = await import("node-karin");
			const { isSemverGreater: isSemverGreater$1 } = await Promise.resolve().then(() => (init_semver(), semver_exports));
			const lockedVersion = await db$1.get("kkk:update:lock");
			if (typeof lockedVersion === "string" && lockedVersion.length > 0) hasUpdate = isSemverGreater$1(lockedVersion, Root.pluginVersion);
		} catch {}
		const result = await reactServerRender({
			request: {
				templateType,
				templateName,
				scale: Math.min(2, Math.max(.5, Number(Config.app.renderScale) / 100)),
				useDarkTheme: Common.useDarkTheme(),
				version: Config.app.RemoveWatermark ? void 0 : {
					plugin: "karin-plugin",
					pluginName: "kkk",
					pluginVersion: Root.pluginVersion,
					releaseType: /^\d+\.\d+\.\d+$/.test(Root.pluginVersion) ? "Stable" : "Preview",
					poweredBy: "Karin",
					frameworkVersion: Root.karinVersion,
					hasUpdate
				},
				data: {
					...data$1,
					useDarkTheme: Common.useDarkTheme()
				}
			},
			outputDir,
			plugins: [createQrCodePlugin()]
		}).then((res) => {
			if (!res.success || !res.htmlPath) throw new Error(res.error);
			return res;
		}).catch((err) => {
			throw new Error(`SSR渲染失败: ${err.message || "未知错误"}`);
		});
		const renderResult = await render.render({
			name: `${Root.pluginName}/${templateType}/${templateName}`,
			file: result.htmlPath,
			multiPage: Config.app.multiPageRender ? Config.app.multiPageHeight : false,
			selector: "#container",
			fullPage: false,
			type: "png",
			pageGotoParams: {
				waitUntil: "load",
				timeout: Config.app.RenderWaitTime * 1e3
			},
			omitBackground: true
		});
		const ret = [];
		if (Array.isArray(renderResult)) for (const image of renderResult) ret.push(segment.image("base64://" + image));
		else ret.push(segment.image("base64://" + renderResult));
		return ret;
	};
});
var init_utils$1 = __esmMin(async () => {
	init_root();
	init_Base();
	init_build_metadata();
	init_Common();
	init_EmojiReaction();
	init_FFmpeg();
	init_ImageHelper();
	init_Networks();
	init_QRCodeScanner();
	init_Render();
});
var BilibiliDBBase;
var init_bilibili = __esmMin(async () => {
	await init_src();
	await init_utils$1();
	await init_Config();
	BilibiliDBBase = class {
		db;
		dbPath;
		constructor() {
			this.dbPath = path.join(`${karinPathBase}/${Root.pluginName}/data`, "bilibili.db");
		}
		async init() {
			try {
				logger.debug(logger.green("--------------------------[BilibiliDB] 开始初始化数据库--------------------------"));
				logger.debug("[BilibiliDB] 正在连接数据库...");
				await fs.promises.mkdir(path.dirname(this.dbPath), { recursive: true });
				this.db = new sqlite3.Database(this.dbPath);
				await this.createTables();
				logger.debug("[BilibiliDB] 数据库模型同步成功");
				logger.debug("[BilibiliDB] 正在同步配置订阅...");
				logger.debug("[BilibiliDB] 配置项数量:", Config.pushlist.bilibili?.length || 0);
				await this.syncConfigSubscriptions(Config.pushlist.bilibili);
				logger.debug("[BilibiliDB] 配置订阅同步成功");
				logger.debug(logger.green("--------------------------[BilibiliDB] 初始化数据库完成--------------------------"));
			} catch (error) {
				logger.error("[BilibiliDB] 数据库初始化失败:", error);
				throw error;
			}
			return this;
		}
		async createTables() {
			for (const query of [
				`CREATE TABLE IF NOT EXISTS Bots (\n        id TEXT PRIMARY KEY,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP\n      )`,
				`CREATE TABLE IF NOT EXISTS Groups (\n        id TEXT NOT NULL,\n        botId TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY (id, botId),\n        FOREIGN KEY (botId) REFERENCES Bots(id)\n      )`,
				`CREATE TABLE IF NOT EXISTS BilibiliUsers (\n        host_mid INTEGER PRIMARY KEY,\n        remark TEXT,\n        filterMode TEXT DEFAULT 'blacklist',\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP\n      )`,
				`CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (\n        groupId TEXT,\n        host_mid INTEGER,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY (groupId, host_mid),\n        FOREIGN KEY (groupId) REFERENCES Groups(id),\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid)\n      )`,
				`CREATE TABLE IF NOT EXISTS DynamicCaches (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        dynamic_id TEXT NOT NULL,\n        host_mid INTEGER NOT NULL,\n        groupId TEXT NOT NULL,\n        dynamic_type TEXT,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),\n        FOREIGN KEY (groupId) REFERENCES Groups(id),\n        UNIQUE(dynamic_id, host_mid, groupId)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterWords (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        host_mid INTEGER NOT NULL,\n        word TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),\n        UNIQUE(host_mid, word)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterTags (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        host_mid INTEGER NOT NULL,\n        tag TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),\n        UNIQUE(host_mid, tag)\n      )`
			]) await this.runQuery(query);
		}
		runQuery(sql, params = []) {
			return new Promise((resolve$1, reject) => {
				this.db.run(sql, params, function(err) {
					if (err) reject(err);
					else resolve$1({
						lastID: this.lastID,
						changes: this.changes
					});
				});
			});
		}
		getQuery(sql, params = []) {
			return new Promise((resolve$1, reject) => {
				this.db.get(sql, params, (err, row) => {
					if (err) reject(err);
					else resolve$1(row);
				});
			});
		}
		allQuery(sql, params = []) {
			return new Promise((resolve$1, reject) => {
				this.db.all(sql, params, (err, rows) => {
					if (err) reject(err);
					else resolve$1(rows);
				});
			});
		}
		async getOrCreateBot(botId) {
			let bot = await this.getQuery("SELECT * FROM Bots WHERE id = ?", [botId]);
			if (!bot) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO Bots (id, createdAt, updatedAt) VALUES (?, ?, ?)", [
					botId,
					now,
					now
				]);
				bot = {
					id: botId,
					createdAt: now,
					updatedAt: now
				};
			}
			return bot;
		}
		async getOrCreateGroup(groupId, botId) {
			await this.getOrCreateBot(botId);
			let group = await this.getQuery("SELECT * FROM Groups WHERE id = ? AND botId = ?", [groupId, botId]);
			if (!group) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO Groups (id, botId, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
					groupId,
					botId,
					now,
					now
				]);
				group = {
					id: groupId,
					botId,
					createdAt: now,
					updatedAt: now
				};
			}
			return group;
		}
		async getBilibiliUser(host_mid) {
			return await this.getQuery("SELECT * FROM BilibiliUsers WHERE host_mid = ?", [host_mid]) || null;
		}
		async getOrCreateBilibiliUser(host_mid, remark = "") {
			let user = await this.getQuery("SELECT * FROM BilibiliUsers WHERE host_mid = ?", [host_mid]);
			if (!user) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO BilibiliUsers (host_mid, remark, filterMode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)", [
					host_mid,
					remark,
					"blacklist",
					now,
					now
				]);
				user = {
					host_mid,
					remark,
					filterMode: "blacklist",
					createdAt: now,
					updatedAt: now
				};
			} else if (remark && user.remark !== remark) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("UPDATE BilibiliUsers SET remark = ?, updatedAt = ? WHERE host_mid = ?", [
					remark,
					now,
					host_mid
				]);
				user.remark = remark;
				user.updatedAt = now;
			}
			return user;
		}
		async subscribeBilibiliUser(groupId, botId, host_mid, remark = "") {
			await this.getOrCreateGroup(groupId, botId);
			await this.getOrCreateBilibiliUser(host_mid, remark);
			let subscription = await this.getQuery("SELECT * FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?", [groupId, host_mid]);
			if (!subscription) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO GroupUserSubscriptions (groupId, host_mid, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
					groupId,
					host_mid,
					now,
					now
				]);
				subscription = {
					groupId,
					host_mid,
					createdAt: now,
					updatedAt: now
				};
			}
			return subscription;
		}
		async unsubscribeBilibiliUser(groupId, host_mid) {
			const result = await this.runQuery("DELETE FROM GroupUserSubscriptions WHERE groupId = ? AND host_mid = ?", [groupId, host_mid]);
			await this.runQuery("DELETE FROM DynamicCaches WHERE groupId = ? AND host_mid = ?", [groupId, host_mid]);
			const remainingSubscriptions = await this.getQuery("SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE host_mid = ?", [host_mid]);
			if (remainingSubscriptions && remainingSubscriptions.count === 0) {
				logger.info(`[BilibiliDB] 用户 ${host_mid} 已无任何群组订阅，清理相关数据`);
				await this.runQuery("DELETE FROM BilibiliUsers WHERE host_mid = ?", [host_mid]);
				await this.runQuery("DELETE FROM FilterWords WHERE host_mid = ?", [host_mid]);
				await this.runQuery("DELETE FROM FilterTags WHERE host_mid = ?", [host_mid]);
				await this.runQuery("DELETE FROM DynamicCaches WHERE host_mid = ?", [host_mid]);
			}
			return result.changes > 0;
		}
		async addDynamicCache(dynamic_id, host_mid, groupId, dynamic_type) {
			let cache = await this.getQuery("SELECT * FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?", [
				dynamic_id,
				host_mid,
				groupId
			]);
			if (!cache) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				cache = {
					id: (await this.runQuery("INSERT INTO DynamicCaches (dynamic_id, host_mid, groupId, dynamic_type, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", [
						dynamic_id,
						host_mid,
						groupId,
						dynamic_type,
						now,
						now
					])).lastID,
					dynamic_id,
					host_mid,
					groupId,
					dynamic_type,
					createdAt: now,
					updatedAt: now
				};
			}
			return cache;
		}
		async isDynamicPushed(dynamic_id, host_mid, groupId) {
			return ((await this.getQuery("SELECT COUNT(*) as count FROM DynamicCaches WHERE dynamic_id = ? AND host_mid = ? AND groupId = ?", [
				dynamic_id,
				host_mid,
				groupId
			]))?.count || 0) > 0;
		}
		async getBotGroups(botId) {
			return await this.allQuery("SELECT * FROM Groups WHERE botId = ?", [botId]);
		}
		async updateGroupBotId(groupId, oldBotId, newBotId) {
			await this.getOrCreateBot(newBotId);
			const now = (/* @__PURE__ */ new Date()).toISOString();
			await this.runQuery("UPDATE Groups SET botId = ?, updatedAt = ? WHERE id = ? AND botId = ?", [
				newBotId,
				now,
				groupId,
				oldBotId
			]);
		}
		async getGroupSubscriptions(groupId) {
			return (await this.allQuery(`SELECT \n        gus.groupId, gus.host_mid, gus.createdAt, gus.updatedAt,\n        bu.remark, bu.filterMode,\n        bu.createdAt as bu_createdAt, bu.updatedAt as bu_updatedAt\n      FROM GroupUserSubscriptions gus\n      LEFT JOIN BilibiliUsers bu ON gus.host_mid = bu.host_mid\n      WHERE gus.groupId = ?`, [groupId])).map((sub) => ({
				groupId: sub.groupId,
				host_mid: sub.host_mid,
				createdAt: sub.createdAt,
				updatedAt: sub.updatedAt,
				bilibiliUser: {
					host_mid: sub.host_mid,
					remark: sub.remark,
					filterMode: sub.filterMode,
					createdAt: sub.bu_createdAt,
					updatedAt: sub.bu_updatedAt
				}
			}));
		}
		async getUserSubscribedGroups(host_mid) {
			return await this.allQuery(`SELECT g.* FROM Groups g\n      INNER JOIN GroupUserSubscriptions gus ON g.id = gus.groupId\n      WHERE gus.host_mid = ?`, [host_mid]);
		}
		async getGroupDynamicCache(groupId, host_mid) {
			let sql = "SELECT * FROM DynamicCaches WHERE groupId = ?";
			const params = [groupId];
			if (host_mid) {
				sql += " AND host_mid = ?";
				params.push(host_mid);
			}
			sql += " ORDER BY createdAt DESC";
			return await this.allQuery(sql, params);
		}
		async isSubscribed(host_mid, groupId) {
			return ((await this.getQuery("SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE host_mid = ? AND groupId = ?", [host_mid, groupId]))?.count || 0) > 0;
		}
		async syncConfigSubscriptions(configItems) {
			const configSubscriptions = /* @__PURE__ */ new Map();
			for (const item of configItems) {
				const host_mid = item.host_mid;
				const remark = item.remark ?? "";
				await this.getOrCreateBilibiliUser(host_mid, remark);
				for (const groupWithBot of item.group_id) {
					const [groupId, botId] = groupWithBot.split(":");
					if (!groupId || !botId) continue;
					await this.getOrCreateGroup(groupId, botId);
					if (!configSubscriptions.has(groupId)) configSubscriptions.set(groupId, /* @__PURE__ */ new Set());
					configSubscriptions.get(groupId)?.add(host_mid);
					if (!await this.isSubscribed(host_mid, groupId)) await this.subscribeBilibiliUser(groupId, botId, host_mid, remark);
				}
			}
			const allGroups = await this.allQuery("SELECT * FROM Groups");
			for (const group of allGroups) {
				const groupId = group.id;
				const configUps = configSubscriptions.get(groupId) ?? /* @__PURE__ */ new Set();
				const dbSubscriptions = await this.getGroupSubscriptions(groupId);
				for (const subscription of dbSubscriptions) {
					const host_mid = subscription.host_mid;
					if (!configUps.has(host_mid)) {
						await this.unsubscribeBilibiliUser(groupId, host_mid);
						logger.mark(`已删除群组 ${groupId} 对UP主 ${host_mid} 的订阅`);
					}
				}
			}
			const allUsers = await this.allQuery("SELECT * FROM BilibiliUsers");
			for (const user of allUsers) {
				const host_mid = user.host_mid;
				if ((await this.getUserSubscribedGroups(host_mid)).length === 0) {
					await this.runQuery("DELETE FROM FilterWords WHERE host_mid = ?", [host_mid]);
					await this.runQuery("DELETE FROM FilterTags WHERE host_mid = ?", [host_mid]);
					await this.runQuery("DELETE FROM BilibiliUsers WHERE host_mid = ?", [host_mid]);
					logger.mark(`已删除UP主 ${host_mid} 的记录及相关过滤设置（不再被任何群组订阅）`);
				}
			}
		}
		async updateFilterMode(host_mid, filterMode) {
			const user = await this.getOrCreateBilibiliUser(host_mid);
			const now = (/* @__PURE__ */ new Date()).toISOString();
			await this.runQuery("UPDATE BilibiliUsers SET filterMode = ?, updatedAt = ? WHERE host_mid = ?", [
				filterMode,
				now,
				host_mid
			]);
			return {
				...user,
				filterMode,
				updatedAt: now
			};
		}
		async addFilterWord(host_mid, word) {
			await this.getOrCreateBilibiliUser(host_mid);
			let filterWord = await this.getQuery("SELECT * FROM FilterWords WHERE host_mid = ? AND word = ?", [host_mid, word]);
			if (!filterWord) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				filterWord = {
					id: (await this.runQuery("INSERT INTO FilterWords (host_mid, word, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
						host_mid,
						word,
						now,
						now
					])).lastID,
					host_mid,
					word,
					createdAt: now,
					updatedAt: now
				};
			}
			return filterWord;
		}
		async removeFilterWord(host_mid, word) {
			return (await this.runQuery("DELETE FROM FilterWords WHERE host_mid = ? AND word = ?", [host_mid, word])).changes > 0;
		}
		async addFilterTag(host_mid, tag) {
			await this.getOrCreateBilibiliUser(host_mid);
			let filterTag = await this.getQuery("SELECT * FROM FilterTags WHERE host_mid = ? AND tag = ?", [host_mid, tag]);
			if (!filterTag) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				filterTag = {
					id: (await this.runQuery("INSERT INTO FilterTags (host_mid, tag, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
						host_mid,
						tag,
						now,
						now
					])).lastID,
					host_mid,
					tag,
					createdAt: now,
					updatedAt: now
				};
			}
			return filterTag;
		}
		async removeFilterTag(host_mid, tag) {
			return (await this.runQuery("DELETE FROM FilterTags WHERE host_mid = ? AND tag = ?", [host_mid, tag])).changes > 0;
		}
		async getFilterWords(host_mid) {
			return (await this.allQuery("SELECT * FROM FilterWords WHERE host_mid = ?", [host_mid])).map((word) => word.word);
		}
		async getFilterTags(host_mid) {
			return (await this.allQuery("SELECT * FROM FilterTags WHERE host_mid = ?", [host_mid])).map((tag) => tag.tag);
		}
		async getFilterConfig(host_mid) {
			const user = await this.getOrCreateBilibiliUser(host_mid);
			const filterWords = await this.getFilterWords(host_mid);
			const filterTags = await this.getFilterTags(host_mid);
			return {
				filterMode: user.filterMode,
				filterWords,
				filterTags
			};
		}
		async extractTextAndTags(dynamicData) {
			let text = "";
			const tags = [];
			if (!dynamicData || !dynamicData.modules || !dynamicData.modules.module_dynamic) return {
				text,
				tags
			};
			const moduleDynamic = dynamicData.modules.module_dynamic;
			if (moduleDynamic.major && moduleDynamic.major.live_rcmd) {
				const content = JSON.parse(moduleDynamic.major.live_rcmd.content);
				text += content.live_play_info.title + " ";
				tags.push(content.live_play_info.area_name);
			}
			if (moduleDynamic.desc && moduleDynamic.desc.text) text += moduleDynamic.desc.text + " ";
			if (moduleDynamic.major && moduleDynamic.major.archive && moduleDynamic.major.archive.title) text += moduleDynamic.major.archive.title + " ";
			if (moduleDynamic.desc && moduleDynamic.desc.rich_text_nodes) {
				for (const node of moduleDynamic.desc.rich_text_nodes) if (node.type !== "RICH_TEXT_NODE_TYPE_TEXT") tags.push(node.orig_text);
			}
			if (dynamicData.type === DynamicType.FORWARD && "orig" in dynamicData) if (dynamicData.orig.type === DynamicType.AV) text += dynamicData.orig.modules.module_dynamic.major.archive.title + "";
			else {
				logger.debug(`提取子动态文本和tag：https://t.bilibili.com/${dynamicData.id_str}`);
				try {
					text += dynamicData.orig.modules.module_dynamic.major.opus.summary.text + " ";
					for (const node of dynamicData.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes) tags.push(node.orig_text);
				} catch (error) {
					logger.error(`提取子动态文本和tag失败：${error}`);
				}
			}
			return {
				text: text.trim(),
				tags
			};
		}
		async shouldFilter(PushItem, extraTags = []) {
			const { filterMode, filterWords, filterTags } = await this.getFilterConfig(PushItem.host_mid);
			logger.debug(`\n      获取用户${PushItem.remark}（${PushItem.host_mid}）的过滤配置：\n      过滤模式：${filterMode}\n      过滤词：${filterWords}\n      过滤标签：${filterTags}\n      `);
			const { text: mainText, tags: mainTags } = await this.extractTextAndTags(PushItem.Dynamic_Data);
			logger.debug(`\n      提取主动态的文本和标签：\n      文本：${mainText}\n      标签：[${mainTags.join("][")}]\n      `);
			let allTags = [...mainTags, ...extraTags];
			let allText = mainText;
			if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && "orig" in PushItem.Dynamic_Data) {
				const { text: origText, tags: origTags } = await this.extractTextAndTags(PushItem.Dynamic_Data.orig);
				allText += " " + origText;
				allTags = [...allTags, ...origTags];
			}
			const hasFilterWord = filterWords.some((word) => allText.includes(word));
			const hasFilterTag = filterTags.some((filterTag) => allTags.some((tag) => tag.includes(filterTag)));
			logger.debug(`\n    UP主UID：${PushItem.host_mid}\n    检查内容：${allText}\n    检查标签：${allTags.join(", ")}\n    命中词：[${filterWords.join("], [")}]\n    命中标签：[${filterTags.join("], [")}]\n    过滤模式：${filterMode}\n    是否过滤：${hasFilterWord || hasFilterTag ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}\n    动态地址：${logger.green(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}\n    动态类型：${PushItem.dynamic_type}\n    `);
			if (filterMode === "blacklist") {
				if (hasFilterWord || hasFilterTag) {
					logger.warn(`\n        动态内容命中黑名单规则，已过滤该动态不再推送\n        动态地址：${logger.yellow(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}\n        命中的黑名单词：[${filterWords.join("], [")}]\n        命中的黑名单标签：[${filterTags.join("], [")}]\n        `);
					return true;
				}
				return false;
			} else {
				if (filterWords.length === 0 && filterTags.length === 0) return false;
				if (hasFilterWord || hasFilterTag) return false;
				logger.warn(`\n        动态内容未命中白名单规则，已过滤该动态不再推送\n        动态地址：${logger.yellow(`https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`)}\n        当前白名单词：[${filterWords.join("], [")}]\n        当前白名单标签：[${filterTags.join("], [")}]\n      `);
				return true;
			}
		}
		async cleanOldDynamicCache(days = 7) {
			const cutoffDate = /* @__PURE__ */ new Date();
			cutoffDate.setDate(cutoffDate.getDate() - days);
			const cutoffDateStr = cutoffDate.toISOString();
			return (await this.runQuery("DELETE FROM DynamicCaches WHERE createdAt < ?", [cutoffDateStr])).changes ?? 0;
		}
		get groupRepository() {
			return { find: async (options) => {
				if (options?.where?.botId) return await this.getBotGroups(options.where.botId);
				return await this.allQuery("SELECT * FROM Groups");
			} };
		}
		get dynamicCacheRepository() {
			return {
				find: async (options = {}) => {
					const { where = {}, order, take, relations } = options;
					let sql = "SELECT * FROM DynamicCaches";
					const params = [];
					const conditions = [];
					if (where.groupId) {
						conditions.push("groupId = ?");
						params.push(where.groupId);
					}
					if (where.host_mid) {
						conditions.push("host_mid = ?");
						params.push(where.host_mid);
					}
					if (where.dynamic_id) {
						conditions.push("dynamic_id = ?");
						params.push(where.dynamic_id);
					}
					if (conditions.length > 0) sql += " WHERE " + conditions.join(" AND ");
					if (order) {
						const orderClauses = [];
						const allowedFields = [
							"id",
							"dynamic_id",
							"host_mid",
							"groupId",
							"dynamic_type",
							"createdAt",
							"updatedAt"
						];
						const allowedDirections = ["ASC", "DESC"];
						for (const [field, direction] of Object.entries(order)) if (allowedFields.includes(field) && allowedDirections.includes(direction)) orderClauses.push(`${field} ${direction}`);
						if (orderClauses.length > 0) sql += " ORDER BY " + orderClauses.join(", ");
					}
					if (take) {
						sql += " LIMIT ?";
						params.push(take.toString());
					}
					const caches = await this.allQuery(sql, params);
					if (relations && relations.includes("bilibiliUser")) {
						const result = [];
						for (const cache of caches) {
							const bilibiliUser = await this.getQuery("SELECT * FROM BilibiliUsers WHERE host_mid = ?", [cache.host_mid]);
							result.push({
								...cache,
								bilibiliUser,
								createdAt: new Date(cache.createdAt),
								updatedAt: new Date(cache.updatedAt)
							});
						}
						return result;
					}
					return caches.map((cache) => ({
						...cache,
						createdAt: new Date(cache.createdAt),
						updatedAt: new Date(cache.updatedAt)
					}));
				},
				delete: async (conditions) => {
					const { groupId, host_mid, dynamic_id } = conditions;
					if (dynamic_id && groupId) return { affected: (await this.runQuery("DELETE FROM DynamicCaches WHERE dynamic_id = ? AND groupId = ?", [dynamic_id, groupId])).changes };
					if (groupId && host_mid) return { affected: (await this.runQuery("DELETE FROM DynamicCaches WHERE groupId = ? AND host_mid = ?", [groupId, host_mid])).changes };
					if (groupId) return { affected: (await this.runQuery("DELETE FROM DynamicCaches WHERE groupId = ?", [groupId])).changes };
					if (host_mid) return { affected: (await this.runQuery("DELETE FROM DynamicCaches WHERE host_mid = ?", [host_mid])).changes };
					if (dynamic_id) return { affected: (await this.runQuery("DELETE FROM DynamicCaches WHERE dynamic_id = ?", [dynamic_id])).changes };
					return { affected: 0 };
				}
			};
		}
	};
});
var DouyinDBBase;
var init_douyin = __esmMin(async () => {
	await init_utils$1();
	await init_Config();
	DouyinDBBase = class {
		db;
		dbPath;
		constructor() {
			this.dbPath = path.join(`${karinPathBase}/${Root.pluginName}/data`, "douyin.db");
		}
		async init() {
			try {
				logger.debug(logger.green("--------------------------[DouyinDB] 开始初始化数据库--------------------------"));
				logger.debug("[DouyinDB] 正在连接数据库...");
				await fs.promises.mkdir(path.dirname(this.dbPath), { recursive: true });
				this.db = new sqlite3.Database(this.dbPath);
				await this.createTables();
				await this.migrate();
				logger.debug("[DouyinDB] 数据库模型同步成功");
				logger.debug("[DouyinDB] 正在同步配置订阅...");
				logger.debug("[DouyinDB] 配置项数量:", Config.pushlist.douyin?.length || 0);
				await this.syncConfigSubscriptions(Config.pushlist.douyin);
				logger.debug("[DouyinDB] 配置订阅同步成功");
				logger.debug(logger.green("--------------------------[DouyinDB] 初始化数据库完成--------------------------"));
			} catch (error) {
				logger.error("[DouyinDB] 数据库初始化失败:", error);
				throw error;
			}
			return this;
		}
		async migrate() {
			try {
				try {
					await this.runQuery("SELECT pushType FROM AwemeCaches LIMIT 1");
				} catch {
					logger.info("[DouyinDB] 检测到 AwemeCaches 表缺少 pushType 字段，开始执行迁移...");
					await this.runQuery("ALTER TABLE AwemeCaches ADD COLUMN pushType TEXT DEFAULT 'post'");
					await this.runQuery("ALTER TABLE AwemeCaches RENAME TO AwemeCaches_old");
					await this.runQuery(`\n          CREATE TABLE IF NOT EXISTS AwemeCaches (\n            id INTEGER PRIMARY KEY AUTOINCREMENT,\n            aweme_id TEXT NOT NULL,\n            sec_uid TEXT NOT NULL,\n            groupId TEXT NOT NULL,\n            pushType TEXT DEFAULT 'post',\n            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n            updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n            FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n            UNIQUE(aweme_id, sec_uid, groupId, pushType)\n          )\n        `);
					await this.runQuery(`\n          INSERT INTO AwemeCaches (id, aweme_id, sec_uid, groupId, pushType, createdAt, updatedAt)\n          SELECT id, aweme_id, sec_uid, groupId, pushType, createdAt, updatedAt\n          FROM AwemeCaches_old\n        `);
					await this.runQuery("DROP TABLE AwemeCaches_old");
					logger.info("[DouyinDB] AwemeCaches 表迁移完成");
				}
				try {
					const tableInfo = await this.allQuery("SELECT sql FROM sqlite_master WHERE type='table' AND name='AwemeCaches'");
					if (tableInfo.length > 0 && tableInfo[0].sql.includes("FOREIGN KEY (groupId) REFERENCES Groups(id)")) {
						logger.info("[DouyinDB] 检测到 AwemeCaches 表存在错误的外键约束，开始修复...");
						await this.runQuery("ALTER TABLE AwemeCaches RENAME TO AwemeCaches_old");
						await this.runQuery(`\n            CREATE TABLE IF NOT EXISTS AwemeCaches (\n              id INTEGER PRIMARY KEY AUTOINCREMENT,\n              aweme_id TEXT NOT NULL,\n              sec_uid TEXT NOT NULL,\n              groupId TEXT NOT NULL,\n              pushType TEXT DEFAULT 'post',\n              createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n              updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n              FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n              UNIQUE(aweme_id, sec_uid, groupId, pushType)\n            )\n          `);
						await this.runQuery(`\n            INSERT INTO AwemeCaches (id, aweme_id, sec_uid, groupId, pushType, createdAt, updatedAt)\n            SELECT id, aweme_id, sec_uid, groupId, pushType, createdAt, updatedAt\n            FROM AwemeCaches_old\n          `);
						await this.runQuery("DROP TABLE AwemeCaches_old");
						logger.info("[DouyinDB] AwemeCaches 表外键约束修复完成");
					}
				} catch (error) {
					logger.debug("[DouyinDB] 外键约束检查/修复跳过:", error);
				}
			} catch (error) {
				logger.error("[DouyinDB] 数据库迁移失败:", error);
			}
		}
		async createTables() {
			for (const query of [
				`CREATE TABLE IF NOT EXISTS Bots (\n        id TEXT PRIMARY KEY,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP\n      )`,
				`CREATE TABLE IF NOT EXISTS Groups (\n        id TEXT NOT NULL,\n        botId TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY (id, botId),\n        FOREIGN KEY (botId) REFERENCES Bots(id)\n      )`,
				`CREATE TABLE IF NOT EXISTS DouyinUsers (\n        sec_uid TEXT PRIMARY KEY,\n        short_id TEXT,\n        remark TEXT,\n        living INTEGER DEFAULT 0,\n        filterMode TEXT DEFAULT 'blacklist',\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP\n      )`,
				`CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (\n        groupId TEXT,\n        sec_uid TEXT,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY (groupId, sec_uid),\n        FOREIGN KEY (groupId) REFERENCES Groups(id),\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid)\n      )`,
				`CREATE TABLE IF NOT EXISTS AwemeCaches (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        aweme_id TEXT NOT NULL,\n        sec_uid TEXT NOT NULL,\n        groupId TEXT NOT NULL,\n        pushType TEXT DEFAULT 'post',\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n        UNIQUE(aweme_id, sec_uid, groupId, pushType)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterWords (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        sec_uid TEXT NOT NULL,\n        word TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n        UNIQUE(sec_uid, word)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterTags (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        sec_uid TEXT NOT NULL,\n        tag TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n        UNIQUE(sec_uid, tag)\n      )`,
				`CREATE TABLE IF NOT EXISTS ListSnapshots (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        sec_uid TEXT NOT NULL,\n        pushType TEXT NOT NULL,\n        aweme_id TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n        UNIQUE(sec_uid, pushType, aweme_id)\n      )`
			]) await this.runQuery(query);
		}
		runQuery(sql, params = []) {
			return new Promise((resolve$1, reject) => {
				this.db.run(sql, params, function(err) {
					if (err) reject(err);
					else resolve$1({
						lastID: this.lastID,
						changes: this.changes
					});
				});
			});
		}
		getQuery(sql, params = []) {
			return new Promise((resolve$1, reject) => {
				this.db.get(sql, params, (err, row) => {
					if (err) reject(err);
					else resolve$1(row);
				});
			});
		}
		allQuery(sql, params = []) {
			return new Promise((resolve$1, reject) => {
				this.db.all(sql, params, (err, rows) => {
					if (err) reject(err);
					else resolve$1(rows);
				});
			});
		}
		async getOrCreateBot(botId) {
			let bot = await this.getQuery("SELECT * FROM Bots WHERE id = ?", [botId]);
			if (!bot) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO Bots (id, createdAt, updatedAt) VALUES (?, ?, ?)", [
					botId,
					now,
					now
				]);
				bot = {
					id: botId,
					createdAt: now,
					updatedAt: now
				};
			}
			return bot;
		}
		async getOrCreateGroup(groupId, botId) {
			await this.getOrCreateBot(botId);
			let group = await this.getQuery("SELECT * FROM Groups WHERE id = ? AND botId = ?", [groupId, botId]);
			if (!group) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO Groups (id, botId, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
					groupId,
					botId,
					now,
					now
				]);
				group = {
					id: groupId,
					botId,
					createdAt: now,
					updatedAt: now
				};
			}
			return group;
		}
		async getOrCreateDouyinUser(sec_uid, short_id = "", remark = "") {
			let user = await this.getQuery("SELECT * FROM DouyinUsers WHERE sec_uid = ?", [sec_uid]);
			if (!user) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO DouyinUsers (sec_uid, short_id, remark, living, filterMode, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)", [
					sec_uid,
					short_id,
					remark,
					0,
					"blacklist",
					now,
					now
				]);
				user = {
					sec_uid,
					short_id,
					remark,
					living: false,
					filterMode: "blacklist",
					createdAt: now,
					updatedAt: now
				};
			} else {
				let needUpdate = false;
				const updates = [];
				const params = [];
				if (remark && user.remark !== remark) {
					updates.push("remark = ?");
					params.push(remark);
					user.remark = remark;
					needUpdate = true;
				}
				if (short_id && user.short_id !== short_id) {
					updates.push("short_id = ?");
					params.push(short_id);
					user.short_id = short_id;
					needUpdate = true;
				}
				if (needUpdate) {
					const now = (/* @__PURE__ */ new Date()).toISOString();
					updates.push("updatedAt = ?");
					params.push(now);
					params.push(sec_uid);
					await this.runQuery(`UPDATE DouyinUsers SET ${updates.join(", ")} WHERE sec_uid = ?`, params);
					user.updatedAt = now;
				}
			}
			return user;
		}
		async subscribeDouyinUser(groupId, botId, sec_uid, short_id = "", remark = "") {
			await this.getOrCreateGroup(groupId, botId);
			await this.getOrCreateDouyinUser(sec_uid, short_id, remark);
			let subscription = await this.getQuery("SELECT * FROM GroupUserSubscriptions WHERE groupId = ? AND sec_uid = ?", [groupId, sec_uid]);
			if (!subscription) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				await this.runQuery("INSERT INTO GroupUserSubscriptions (groupId, sec_uid, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
					groupId,
					sec_uid,
					now,
					now
				]);
				subscription = {
					groupId,
					sec_uid,
					createdAt: now,
					updatedAt: now
				};
			}
			return subscription;
		}
		async unsubscribeDouyinUser(groupId, sec_uid) {
			const result = await this.runQuery("DELETE FROM GroupUserSubscriptions WHERE groupId = ? AND sec_uid = ?", [groupId, sec_uid]);
			await this.runQuery("DELETE FROM AwemeCaches WHERE groupId = ? AND sec_uid = ?", [groupId, sec_uid]);
			const remainingSubscriptions = await this.getQuery("SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE sec_uid = ?", [sec_uid]);
			if (remainingSubscriptions && remainingSubscriptions.count === 0) {
				logger.info(`[DouyinDB] 用户 ${sec_uid} 已无任何群组订阅，清理相关数据`);
				await this.runQuery("DELETE FROM DouyinUsers WHERE sec_uid = ?", [sec_uid]);
				await this.runQuery("DELETE FROM FilterWords WHERE sec_uid = ?", [sec_uid]);
				await this.runQuery("DELETE FROM FilterTags WHERE sec_uid = ?", [sec_uid]);
				await this.runQuery("DELETE FROM AwemeCaches WHERE sec_uid = ?", [sec_uid]);
			}
			return result.changes > 0;
		}
		async addAwemeCache(aweme_id, sec_uid, groupId, pushType = "post") {
			let cache = await this.getQuery("SELECT * FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ? AND pushType = ?", [
				aweme_id,
				sec_uid,
				groupId,
				pushType
			]);
			if (!cache) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				cache = {
					id: (await this.runQuery("INSERT INTO AwemeCaches (aweme_id, sec_uid, groupId, pushType, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)", [
						aweme_id,
						sec_uid,
						groupId,
						pushType,
						now,
						now
					])).lastID,
					aweme_id,
					sec_uid,
					groupId,
					pushType,
					createdAt: now,
					updatedAt: now
				};
			}
			return cache;
		}
		async isAwemePushed(aweme_id, sec_uid, groupId, pushType = "post") {
			return ((await this.getQuery("SELECT COUNT(*) as count FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ? AND pushType = ?", [
				aweme_id,
				sec_uid,
				groupId,
				pushType
			]))?.count || 0) > 0;
		}
		async hasHistory(sec_uid, groupId, pushType) {
			return ((await this.getQuery("SELECT COUNT(*) as count FROM AwemeCaches WHERE sec_uid = ? AND groupId = ? AND pushType = ? LIMIT 1", [
				sec_uid,
				groupId,
				pushType
			]))?.count || 0) > 0;
		}
		async getBotGroups(botId) {
			return await this.allQuery("SELECT * FROM Groups WHERE botId = ?", [botId]);
		}
		async updateGroupBotId(groupId, oldBotId, newBotId) {
			await this.getOrCreateBot(newBotId);
			const now = (/* @__PURE__ */ new Date()).toISOString();
			await this.runQuery("UPDATE Groups SET botId = ?, updatedAt = ? WHERE id = ? AND botId = ?", [
				newBotId,
				now,
				groupId,
				oldBotId
			]);
		}
		async getGroupSubscriptions(groupId) {
			return (await this.allQuery(`SELECT \n        gus.groupId, gus.sec_uid, gus.createdAt, gus.updatedAt,\n        du.short_id, du.remark, du.living, du.filterMode,\n        du.createdAt as du_createdAt, du.updatedAt as du_updatedAt\n      FROM GroupUserSubscriptions gus\n      LEFT JOIN DouyinUsers du ON gus.sec_uid = du.sec_uid\n      WHERE gus.groupId = ?`, [groupId])).map((sub) => ({
				groupId: sub.groupId,
				sec_uid: sub.sec_uid,
				createdAt: sub.createdAt,
				updatedAt: sub.updatedAt,
				douyinUser: {
					sec_uid: sub.sec_uid,
					short_id: sub.short_id,
					remark: sub.remark,
					living: !!sub.living,
					filterMode: sub.filterMode,
					createdAt: sub.du_createdAt,
					updatedAt: sub.du_updatedAt
				}
			}));
		}
		async getUserSubscribedGroups(sec_uid) {
			return await this.allQuery(`SELECT g.* FROM Groups g\n      INNER JOIN GroupUserSubscriptions gus ON g.id = gus.groupId\n      WHERE gus.sec_uid = ?`, [sec_uid]);
		}
		async isSubscribed(sec_uid, groupId) {
			return ((await this.getQuery("SELECT COUNT(*) as count FROM GroupUserSubscriptions WHERE sec_uid = ? AND groupId = ?", [sec_uid, groupId]))?.count || 0) > 0;
		}
		async getDouyinUser(sec_uid) {
			const user = await this.getQuery("SELECT * FROM DouyinUsers WHERE sec_uid = ?", [sec_uid]);
			if (user) user.living = !!user.living;
			return user || null;
		}
		async updateLiveStatus(sec_uid, living) {
			if (!await this.getDouyinUser(sec_uid)) return false;
			const now = (/* @__PURE__ */ new Date()).toISOString();
			return (await this.runQuery("UPDATE DouyinUsers SET living = ?, updatedAt = ? WHERE sec_uid = ?", [
				living ? 1 : 0,
				now,
				sec_uid
			])).changes > 0;
		}
		async getLiveStatus(sec_uid) {
			return { living: (await this.getDouyinUser(sec_uid))?.living || false };
		}
		async syncConfigSubscriptions(configItems) {
			const configSubscriptions = /* @__PURE__ */ new Map();
			for (const item of configItems) {
				const sec_uid = item.sec_uid;
				const short_id = item.short_id ?? "";
				const remark = item.remark ?? "";
				await this.getOrCreateDouyinUser(sec_uid, short_id, remark);
				for (const groupWithBot of item.group_id) {
					const [groupId, botId] = groupWithBot.split(":");
					if (!groupId || !botId) continue;
					await this.getOrCreateGroup(groupId, botId);
					if (!configSubscriptions.has(groupId)) configSubscriptions.set(groupId, /* @__PURE__ */ new Set());
					configSubscriptions.get(groupId)?.add(sec_uid);
					if (!await this.isSubscribed(sec_uid, groupId)) await this.subscribeDouyinUser(groupId, botId, sec_uid, short_id, remark);
				}
			}
			const allGroups = await this.allQuery("SELECT * FROM Groups");
			for (const group of allGroups) {
				const groupId = group.id;
				const configUsers = configSubscriptions.get(groupId) ?? /* @__PURE__ */ new Set();
				const dbSubscriptions = await this.getGroupSubscriptions(groupId);
				for (const subscription of dbSubscriptions) {
					const sec_uid = subscription.sec_uid;
					if (!configUsers.has(sec_uid)) {
						await this.unsubscribeDouyinUser(groupId, sec_uid);
						logger.mark(`已删除群组 ${groupId} 对抖音用户 ${sec_uid} 的订阅`);
					}
				}
			}
			const allUsers = await this.allQuery("SELECT * FROM DouyinUsers");
			for (const user of allUsers) {
				const sec_uid = user.sec_uid;
				if ((await this.getUserSubscribedGroups(sec_uid)).length === 0) {
					await this.runQuery("DELETE FROM FilterWords WHERE sec_uid = ?", [sec_uid]);
					await this.runQuery("DELETE FROM FilterTags WHERE sec_uid = ?", [sec_uid]);
					await this.runQuery("DELETE FROM DouyinUsers WHERE sec_uid = ?", [sec_uid]);
					logger.mark(`已删除抖音用户 ${sec_uid} 的记录及相关过滤设置（不再被任何群组订阅）`);
				}
			}
		}
		async getGroupById(groupId) {
			return await this.getQuery("SELECT * FROM Groups WHERE id = ?", [groupId]) || null;
		}
		async updateFilterMode(sec_uid, filterMode) {
			const user = await this.getOrCreateDouyinUser(sec_uid);
			const now = (/* @__PURE__ */ new Date()).toISOString();
			await this.runQuery("UPDATE DouyinUsers SET filterMode = ?, updatedAt = ? WHERE sec_uid = ?", [
				filterMode,
				now,
				sec_uid
			]);
			return {
				...user,
				filterMode,
				updatedAt: now
			};
		}
		async addFilterWord(sec_uid, word) {
			await this.getOrCreateDouyinUser(sec_uid);
			let filterWord = await this.getQuery("SELECT * FROM FilterWords WHERE sec_uid = ? AND word = ?", [sec_uid, word]);
			if (!filterWord) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				filterWord = {
					id: (await this.runQuery("INSERT INTO FilterWords (sec_uid, word, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
						sec_uid,
						word,
						now,
						now
					])).lastID,
					sec_uid,
					word,
					createdAt: now,
					updatedAt: now
				};
			}
			return filterWord;
		}
		async removeFilterWord(sec_uid, word) {
			return (await this.runQuery("DELETE FROM FilterWords WHERE sec_uid = ? AND word = ?", [sec_uid, word])).changes > 0;
		}
		async addFilterTag(sec_uid, tag) {
			await this.getOrCreateDouyinUser(sec_uid);
			let filterTag = await this.getQuery("SELECT * FROM FilterTags WHERE sec_uid = ? AND tag = ?", [sec_uid, tag]);
			if (!filterTag) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				filterTag = {
					id: (await this.runQuery("INSERT INTO FilterTags (sec_uid, tag, createdAt, updatedAt) VALUES (?, ?, ?, ?)", [
						sec_uid,
						tag,
						now,
						now
					])).lastID,
					sec_uid,
					tag,
					createdAt: now,
					updatedAt: now
				};
			}
			return filterTag;
		}
		async removeFilterTag(sec_uid, tag) {
			return (await this.runQuery("DELETE FROM FilterTags WHERE sec_uid = ? AND tag = ?", [sec_uid, tag])).changes > 0;
		}
		async getFilterWords(sec_uid) {
			return (await this.allQuery("SELECT * FROM FilterWords WHERE sec_uid = ?", [sec_uid])).map((word) => word.word);
		}
		async getFilterTags(sec_uid) {
			return (await this.allQuery("SELECT * FROM FilterTags WHERE sec_uid = ?", [sec_uid])).map((tag) => tag.tag);
		}
		async getFilterConfig(sec_uid) {
			const user = await this.getOrCreateDouyinUser(sec_uid);
			const filterWords = await this.getFilterWords(sec_uid);
			const filterTags = await this.getFilterTags(sec_uid);
			return {
				filterMode: user.filterMode,
				filterWords,
				filterTags
			};
		}
		async shouldFilter(PushItem, tags = []) {
			const sec_uid = PushItem.sec_uid;
			if (!sec_uid) {
				logger.warn(`推送项缺少 sec_uid 参数: ${JSON.stringify(PushItem)}`);
				return false;
			}
			const { filterMode, filterWords, filterTags } = await this.getFilterConfig(sec_uid);
			logger.debug(`\n      获取用户${PushItem.remark}（${PushItem.sec_uid}）的过滤配置：\n      过滤模式：${filterMode}\n      过滤词：${filterWords}\n      过滤标签：${filterTags}\n      `);
			const desc = PushItem.Detail_Data.desc ?? "";
			const hasFilterWord = filterWords.some((word) => desc.includes(word));
			const hasFilterTag = filterTags.some((filterTag) => tags.some((tag) => tag === filterTag));
			logger.debug(`\n      作者：${PushItem.remark}\n      检查内容：${desc}\n      命中词：[${filterWords.join("], [")}]\n      命中标签：[${filterTags.join("], [")}]\n      过滤模式：${filterMode}\n      是否过滤：${hasFilterWord || hasFilterTag ? logger.red(`${hasFilterWord || hasFilterTag}`) : logger.green(`${hasFilterWord || hasFilterTag}`)}\n      作品地址：${logger.green(`https://www.douyin.com/video/${PushItem.Detail_Data.aweme_id}`)}\n      `);
			if (filterMode === "blacklist") {
				if (hasFilterWord || hasFilterTag) {
					logger.warn(`\n          作品内容命中黑名单规则，已过滤该作品不再推送\n          作品地址：${logger.yellow(PushItem.Detail_Data.share_url)}\n          命中的黑名单词：[${filterWords.join("], [")}]\n          命中的黑名单标签：[${filterTags.join("], [")}]\n          `);
					return true;
				}
				return false;
			} else {
				if (filterWords.length === 0 && filterTags.length === 0) return false;
				if (hasFilterWord || hasFilterTag) return false;
				logger.warn(`\n        作品内容未命中白名单规则，已过滤该作品不再推送\n        作品地址：${logger.yellow(PushItem.Detail_Data.share_url)}\n        命中的黑名单词：[${filterWords.join("], [")}]\n        命中的黑名单标签：[${filterTags.join("], [")}]\n        `);
				return true;
			}
		}
		async cleanOldAwemeCache(days = 7) {
			const cutoffDate = /* @__PURE__ */ new Date();
			cutoffDate.setDate(cutoffDate.getDate() - days);
			const cutoffDateStr = cutoffDate.toISOString();
			return (await this.runQuery("DELETE FROM AwemeCaches WHERE createdAt < ?", [cutoffDateStr])).changes ?? 0;
		}
		get groupRepository() {
			return { find: async (options) => {
				if (options?.where?.botId) return await this.getBotGroups(options.where.botId);
				return await this.allQuery("SELECT * FROM Groups");
			} };
		}
		get awemeCacheRepository() {
			return {
				find: async (options = {}) => {
					const { where = {}, order, take, relations } = options;
					let sql = "SELECT * FROM AwemeCaches";
					const params = [];
					const conditions = [];
					if (where.groupId) {
						conditions.push("groupId = ?");
						params.push(where.groupId);
					}
					if (where.sec_uid) {
						conditions.push("sec_uid = ?");
						params.push(where.sec_uid);
					}
					if (where.aweme_id) {
						conditions.push("aweme_id = ?");
						params.push(where.aweme_id);
					}
					if (conditions.length > 0) sql += " WHERE " + conditions.join(" AND ");
					if (order) {
						const orderClauses = [];
						const allowedFields = [
							"id",
							"aweme_id",
							"sec_uid",
							"groupId",
							"createdAt",
							"updatedAt"
						];
						const allowedDirections = ["ASC", "DESC"];
						for (const [field, direction] of Object.entries(order)) if (allowedFields.includes(field) && allowedDirections.includes(direction)) orderClauses.push(`${field} ${direction}`);
						if (orderClauses.length > 0) sql += " ORDER BY " + orderClauses.join(", ");
					}
					if (take) {
						sql += " LIMIT ?";
						params.push(take.toString());
					}
					const caches = await this.allQuery(sql, params);
					if (relations && relations.includes("douyinUser")) {
						const result = [];
						for (const cache of caches) {
							const douyinUser = await this.getDouyinUser(cache.sec_uid);
							result.push({
								...cache,
								douyinUser,
								createdAt: new Date(cache.createdAt),
								updatedAt: new Date(cache.updatedAt)
							});
						}
						return result;
					}
					return caches.map((cache) => ({
						...cache,
						createdAt: new Date(cache.createdAt),
						updatedAt: new Date(cache.updatedAt)
					}));
				},
				delete: async (conditions) => {
					const { groupId, sec_uid, aweme_id } = conditions;
					if (aweme_id && groupId) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE aweme_id = ? AND groupId = ?", [aweme_id, groupId])).changes };
					if (groupId && sec_uid) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE groupId = ? AND sec_uid = ?", [groupId, sec_uid])).changes };
					if (groupId) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE groupId = ?", [groupId])).changes };
					if (sec_uid) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE sec_uid = ?", [sec_uid])).changes };
					if (aweme_id) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE aweme_id = ?", [aweme_id])).changes };
					return { affected: 0 };
				}
			};
		}
		async isAwemeInList(aweme_id, sec_uid, pushType) {
			return ((await this.getQuery("SELECT COUNT(*) as count FROM ListSnapshots WHERE aweme_id = ? AND sec_uid = ? AND pushType = ?", [
				aweme_id,
				sec_uid,
				pushType
			]))?.count || 0) > 0;
		}
		async updateListSnapshot(sec_uid, pushType, aweme_ids) {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			await this.runQuery("DELETE FROM ListSnapshots WHERE sec_uid = ? AND pushType = ?", [sec_uid, pushType]);
			for (const aweme_id of aweme_ids) await this.runQuery("INSERT OR IGNORE INTO ListSnapshots (sec_uid, pushType, aweme_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)", [
				sec_uid,
				pushType,
				aweme_id,
				now,
				now
			]);
		}
	};
});
var db_exports = __export({
	BilibiliDBBase: () => BilibiliDBBase,
	DouyinDBBase: () => DouyinDBBase,
	bilibiliDB: () => bilibiliDBInstance,
	bilibiliDBInstance: () => bilibiliDBInstance,
	cleanOldDynamicCache: () => cleanOldDynamicCache,
	douyinDB: () => douyinDBInstance,
	douyinDBInstance: () => douyinDBInstance,
	getBilibiliDB: () => getBilibiliDB,
	getDouyinDB: () => getDouyinDB,
	initAllDatabases: () => initAllDatabases$1
}, 1);
var douyinDB, douyinInitializing, bilibiliDB, bilibiliInitializing, getDouyinDB, getBilibiliDB, initAllDatabases$1, douyinDBInstance, bilibiliDBInstance, cleanOldDynamicCache;
var init_db = __esmMin(async () => {
	await init_bilibili();
	await init_douyin();
	init_bilibili();
	init_douyin();
	douyinDB = null;
	douyinInitializing = false;
	bilibiliDB = null;
	bilibiliInitializing = false;
	getDouyinDB = async () => {
		if (douyinDB) return douyinDB;
		if (douyinInitializing) {
			await new Promise((resolve$1) => setTimeout(resolve$1, 100));
			return douyinDB;
		}
		douyinInitializing = true;
		try {
			douyinDB = await new DouyinDBBase().init();
			return douyinDB;
		} finally {
			douyinInitializing = false;
		}
	};
	getBilibiliDB = async () => {
		if (bilibiliDB) return bilibiliDB;
		if (bilibiliInitializing) {
			await new Promise((resolve$1) => setTimeout(resolve$1, 100));
			return bilibiliDB;
		}
		bilibiliInitializing = true;
		try {
			bilibiliDB = await new BilibiliDBBase().init();
			return bilibiliDB;
		} finally {
			bilibiliInitializing = false;
		}
	};
	initAllDatabases$1 = async () => {
		const [douyin$2, bilibili$2] = await Promise.all([getDouyinDB(), getBilibiliDB()]);
		return {
			douyinDB: douyin$2,
			bilibiliDB: bilibili$2
		};
	};
	douyinDBInstance = await getDouyinDB();
	bilibiliDBInstance = await getBilibiliDB();
	cleanOldDynamicCache = async (platform$1, days = 7) => {
		if (platform$1 === "douyin") return await (await getDouyinDB()).cleanOldAwemeCache(days);
		else return await (await getBilibiliDB()).cleanOldDynamicCache(days);
	};
});
var init_module = __esmMin(async () => {
	init_db();
	init_utils$1();
});
var getContents$1, addContent$1, deleteContent$1;
var init_contents$1 = __esmMin(async () => {
	await init_db();
	await init_amagiClient();
	getContents$1 = async (req, res) => {
		try {
			const { groupId } = req.query;
			if (!groupId || typeof groupId !== "string") return createBadRequestResponse(res, "请提供群组ID");
			const caches = await (await getBilibiliDB()).dynamicCacheRepository.find({
				where: { groupId },
				relations: ["bilibiliUser"],
				order: { createdAt: "DESC" },
				take: 100
			});
			const uniqueMids = [...new Set(caches.map((c) => c.host_mid))];
			const avatarCache = /* @__PURE__ */ new Map();
			let hitRiskControl = false;
			for (const mid of uniqueMids) {
				if (hitRiskControl) {
					avatarCache.set(mid, "");
					continue;
				}
				try {
					const userProfile = await bilibiliFetcher.fetchUserCard({
						host_mid: mid,
						typeMode: "strict"
					});
					avatarCache.set(mid, userProfile.data?.data?.card?.face || "");
				} catch (error) {
					if (error instanceof AmagiError && (error.code === -352 || error.code === -412)) {
						logger.warn(`[BilibiliAPI] 获取头像时遇到风控(${error.code})`);
						hitRiskControl = true;
					}
					avatarCache.set(mid, "");
				}
			}
			return createSuccessResponse(res, caches.map((cache) => {
				const authorName = cache.bilibiliUser?.remark || cache.host_mid.toString();
				return {
					id: cache.dynamic_id,
					platform: "bilibili",
					title: `B站动态 ${cache.dynamic_id}`,
					author: authorName,
					authorId: cache.host_mid.toString(),
					avatar: avatarCache.get(cache.host_mid) || "",
					thumbnail: "",
					type: "dynamic",
					dynamicType: cache.dynamic_type,
					createdAt: cache.createdAt.getTime()
				};
			}));
		} catch (error) {
			logger.error("[BilibiliAPI] 获取内容列表失败:", error);
			return createServerErrorResponse(res, "获取内容列表失败");
		}
	};
	addContent$1 = async (req, res) => {
		try {
			const { contentId, groupId, authorId } = req.body;
			if (!contentId || !groupId || !authorId) return createBadRequestResponse(res, "请提供 contentId、groupId 和 authorId");
			const bilibiliDB$1 = await getBilibiliDB();
			const hostMid = parseInt(authorId);
			if (!await bilibiliDB$1.getBilibiliUser(hostMid)) return createBadRequestResponse(res, "该UP主未在订阅列表中，请先添加订阅");
			await bilibiliDB$1.addDynamicCache(contentId, hostMid, groupId, "manual");
			return createSuccessResponse(res, { message: "添加成功" });
		} catch (error) {
			logger.error("[BilibiliAPI] 添加内容失败:", error);
			return createServerErrorResponse(res, "添加内容失败");
		}
	};
	deleteContent$1 = async (req, res) => {
		try {
			const { id } = req.params;
			const { groupId } = req.body;
			if (!id || !groupId) return createBadRequestResponse(res, "请提供内容ID和群组ID");
			const result = await (await getBilibiliDB()).dynamicCacheRepository.delete({
				dynamic_id: id,
				groupId
			});
			if (result.affected === 0) return createBadRequestResponse(res, "未找到要删除的内容");
			return createSuccessResponse(res, {
				message: "删除成功",
				affected: result.affected
			});
		} catch (error) {
			logger.error("[BilibiliAPI] 删除内容失败:", error);
			return createServerErrorResponse(res, "删除内容失败");
		}
	};
});
var createRiskControlResponse, createRiskControlNoVoucherResponse, handleBilibiliRiskControl, verifyCaptcha;
var init_risk_control = __esmMin(() => {
	init_amagiClient();
	createRiskControlResponse = (res, geetest, token, v_voucher) => res.status(452).json({
		message: "B站风控验证",
		code: -352,
		data: {
			type: "bilibili_risk_control",
			geetest,
			token,
			v_voucher
		}
	});
	createRiskControlNoVoucherResponse = (res, code) => res.status(452).json({
		message: "B站风控",
		code,
		data: {
			type: "bilibili_risk_control_no_voucher",
			message: code === -352 ? "B站风控校验失败，请稍后重试或更换 Cookie" : "当前IP被B站风控，请稍后重试或更换网络"
		}
	});
	handleBilibiliRiskControl = async (error, res) => {
		if (!(error instanceof AmagiError)) return false;
		if (error.code !== -352 && error.code !== -412) return false;
		const v_voucher = error.data?.data?.v_voucher;
		if (!v_voucher) {
			logger.info(`[BilibiliAPI] 检测到风控(${error.code})，但无 v_voucher`);
			createRiskControlNoVoucherResponse(res, error.code);
			return true;
		}
		try {
			logger.info(`[BilibiliAPI] 检测到风控(${error.code})，申请验证码...`);
			const verification = await bilibiliFetcher.requestCaptchaFromVoucher({
				v_voucher,
				typeMode: "strict"
			});
			if (!verification.data?.data?.geetest) {
				logger.error("[BilibiliAPI] 申请验证码失败");
				createRiskControlNoVoucherResponse(res, error.code);
				return true;
			}
			const geetest = verification.data.data.geetest;
			const token = verification.data.data.token;
			createRiskControlResponse(res, {
				gt: geetest.gt,
				challenge: geetest.challenge
			}, token, v_voucher);
			return true;
		} catch (err) {
			logger.error("[BilibiliAPI] 申请验证码异常:", err);
			createRiskControlNoVoucherResponse(res, error.code);
			return true;
		}
	};
	verifyCaptcha = async (req, res) => {
		try {
			const { challenge, token, validate, seccode } = req.body;
			if (!challenge || !token || !validate || !seccode) return createBadRequestResponse(res, "验证参数不完整");
			logger.info("[BilibiliAPI] 提交风控验证结果...");
			const verifyResult = await bilibiliFetcher.validateCaptchaResult({
				challenge,
				token,
				validate,
				seccode,
				typeMode: "strict"
			});
			if (verifyResult.success && verifyResult.data?.data?.grisk_id) {
				logger.info(`[BilibiliAPI] 验证成功，grisk_id: ${verifyResult.data.data.grisk_id}`);
				return createSuccessResponse(res, {
					success: true,
					message: "验证成功",
					grisk_id: verifyResult.data.data.grisk_id
				});
			}
			return createSuccessResponse(res, {
				success: false,
				message: "验证失败，请重试"
			});
		} catch (error) {
			logger.error("[BilibiliAPI] 验证请求失败:", error);
			if (error instanceof AmagiError) {
				if (error.code === -111) return createSuccessResponse(res, {
					success: false,
					message: "验证失败，建议重新配置 B站 Cookie"
				});
				return createSuccessResponse(res, {
					success: false,
					message: error.rawError?.errorDescription || "验证失败"
				});
			}
			return createServerErrorResponse(res, "验证请求失败");
		}
	};
});
function isDynamicTypeDraw(data$1) {
	return data$1.data.item.type === DynamicType.DRAW;
}
function isDynamicTypeWord(data$1) {
	return data$1.data.item.type === DynamicType.WORD;
}
function isDynamicTypeAV(data$1) {
	return data$1.data.item.type === DynamicType.AV;
}
function isDynamicTypeForward(data$1) {
	return data$1.data.item.type === DynamicType.FORWARD;
}
function isDynamicTypeArticle(data$1) {
	return data$1.data.item.type === DynamicType.ARTICLE;
}
function isDynamicTypeLiveRcmd(data$1) {
	return data$1.data.item.type === DynamicType.LIVE_RCMD;
}
var formatCount$1, formatDuration$1, formatTimestamp$1, processCommentEmojis$3, parseComments$1, getDynamicCommentType, getDynamicOid, parseDrawDynamic, parseWordDynamic, parseAVDynamic, parseForwardDynamic, parseArticleDynamic, parseLiveRcmdDynamic, parseDynamicContent, getDynamicAuthor, getDynamicStats, parseVideo, parseDynamicRaw, parseDynamic;
var init_parse$1 = __esmMin(() => {
	init_src();
	init_amagiClient();
	init_risk_control();
	formatCount$1 = (count) => {
		if (count >= 1e8) return `${(count / 1e8).toFixed(1)}亿`;
		if (count >= 1e4) return `${(count / 1e4).toFixed(1)}万`;
		return count.toString();
	};
	formatDuration$1 = (seconds) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
	formatTimestamp$1 = (timestamp) => {
		const date = /* @__PURE__ */ new Date(timestamp * 1e3);
		const diff = (/* @__PURE__ */ new Date()).getTime() - date.getTime();
		if (diff < 6e4) return "刚刚";
		if (diff < 36e5) return `${Math.floor(diff / 6e4)}分钟前`;
		if (diff < 864e5) return `${Math.floor(diff / 36e5)}小时前`;
		if (diff < 2592e6) return `${Math.floor(diff / 864e5)}天前`;
		return `${date.getMonth() + 1}月${date.getDate()}日`;
	};
	processCommentEmojis$3 = (text, emojiData) => {
		if (!text || !emojiData?.data?.packages) return text;
		const emojiMap = /* @__PURE__ */ new Map();
		emojiData.data.packages.forEach((pkg$1) => {
			pkg$1.emote.forEach((emote) => {
				emojiMap.set(emote.text, emote.url);
			});
		});
		let processedText = text;
		processedText = processedText.replace(/\[([^\]]+)\]/g, (match, emojiName) => {
			const emojiUrl = emojiMap.get(match) || emojiMap.get(emojiName);
			if (emojiUrl) return `<img src="${emojiUrl}" alt="${emojiName}" class="emoji" />`;
			return match;
		});
		return processedText.split(/(<img[^>]*>)/).map((part) => {
			if (part.startsWith("<img")) return part;
			if (part.trim()) return `<span>${part}</span>`;
			return part;
		}).join("");
	};
	parseComments$1 = (commentsData, emojiData) => {
		if (!commentsData || !Array.isArray(commentsData)) return [];
		return commentsData.map((comment, index) => {
			let processedContent = comment.content?.message || "";
			if (emojiData && processedContent) processedContent = processCommentEmojis$3(processedContent, emojiData);
			const pictures = comment.content?.pictures;
			return {
				id: comment.rpid?.toString() || index.toString(),
				author: comment.member?.uname || "匿名用户",
				avatar: comment.member?.avatar || "",
				content: processedContent,
				images: pictures?.map((pic) => pic.img_src) || [],
				likes: comment.like || 0,
				timestamp: formatTimestamp$1(comment.ctime || 0)
			};
		});
	};
	getDynamicCommentType = (dynamicType) => {
		switch (dynamicType) {
			case DynamicType.AV: return 1;
			case DynamicType.DRAW: return 11;
			case DynamicType.ARTICLE: return 12;
			case DynamicType.LIVE_RCMD:
			case DynamicType.FORWARD:
			case DynamicType.WORD:
			default: return 17;
		}
	};
	getDynamicOid = (dynamicInfo, dynamicCard) => {
		const item = dynamicInfo.data.item;
		if (isDynamicTypeAV(dynamicInfo)) return (dynamicInfo.data.item.modules.module_dynamic.major?.archive)?.aid?.toString() || item.id_str;
		if (isDynamicTypeWord(dynamicInfo) || isDynamicTypeForward(dynamicInfo)) return item.id_str;
		return dynamicCard.card?.desc?.rid?.toString() || item.id_str;
	};
	parseDrawDynamic = (data$1) => {
		const moduleDynamic = data$1.data.item.modules.module_dynamic;
		const description = moduleDynamic.major?.opus?.summary?.text || "";
		const images = (moduleDynamic.major?.opus?.pics || []).map((pic) => pic.url).filter((url) => typeof url === "string");
		return {
			title: "图文动态",
			description,
			thumbnail: images[0] || "",
			images,
			type: "note"
		};
	};
	parseWordDynamic = (data$1) => ({
		title: "文字动态",
		description: data$1.data.item.modules.module_dynamic.major?.opus?.summary?.text || "",
		thumbnail: "",
		images: [],
		type: "note"
	});
	parseAVDynamic = (data$1) => {
		const archive = data$1.data.item.modules.module_dynamic.major?.archive;
		return {
			title: archive?.title || "视频动态",
			description: archive?.desc || "",
			thumbnail: archive?.cover || "",
			images: [],
			type: "video"
		};
	};
	parseForwardDynamic = (data$1) => ({
		title: "转发动态",
		description: data$1.data.item.modules.module_dynamic.desc?.text || "",
		thumbnail: "",
		images: [],
		type: "forward"
	});
	parseArticleDynamic = (data$1) => {
		const opus = data$1.data.item.modules.module_dynamic.major?.opus;
		return {
			title: opus?.title || "专栏文章",
			description: opus?.summary?.text || "",
			thumbnail: "",
			images: [],
			type: "article"
		};
	};
	parseLiveRcmdDynamic = (data$1) => {
		const liveRcmd = data$1.data.item.modules.module_dynamic.major?.live_rcmd;
		let title = "直播推荐";
		let thumbnail = "";
		if (liveRcmd?.content) try {
			const liveInfo = JSON.parse(liveRcmd.content);
			title = liveInfo.live_play_info?.title || "直播推荐";
			thumbnail = liveInfo.live_play_info?.cover || "";
		} catch {}
		return {
			title,
			description: "",
			thumbnail,
			images: [],
			type: "live"
		};
	};
	parseDynamicContent = (dynamicInfo) => {
		if (isDynamicTypeDraw(dynamicInfo)) return parseDrawDynamic(dynamicInfo);
		if (isDynamicTypeWord(dynamicInfo)) return parseWordDynamic(dynamicInfo);
		if (isDynamicTypeAV(dynamicInfo)) return parseAVDynamic(dynamicInfo);
		if (isDynamicTypeForward(dynamicInfo)) return parseForwardDynamic(dynamicInfo);
		if (isDynamicTypeArticle(dynamicInfo)) return parseArticleDynamic(dynamicInfo);
		if (isDynamicTypeLiveRcmd(dynamicInfo)) return parseLiveRcmdDynamic(dynamicInfo);
		return {
			title: "动态内容",
			description: "",
			thumbnail: "",
			images: [],
			type: "dynamic"
		};
	};
	getDynamicAuthor = (dynamicInfo) => {
		const moduleAuthor = dynamicInfo.data.item.modules.module_author;
		return {
			name: moduleAuthor.name || "未知用户",
			avatar: moduleAuthor.face || "",
			id: moduleAuthor.mid?.toString() || ""
		};
	};
	getDynamicStats = (dynamicInfo) => {
		const moduleStat = dynamicInfo.data.item.modules.module_stat;
		return {
			views: formatCount$1(moduleStat.forward?.count || 0),
			likes: formatCount$1(moduleStat.like?.count || 0),
			commentCount: moduleStat.comment?.count || 0
		};
	};
	parseVideo = async (req, res) => {
		try {
			const { bvid, aid } = req.body;
			if (!bvid && !aid) return createBadRequestResponse(res, "请提供 bvid 或 aid");
			const videoDetail = (await bilibiliFetcher.fetchVideoInfo({
				bvid: bvid || "",
				typeMode: "strict"
			})).data.data;
			const streamData = (await bilibiliFetcher.fetchVideoStreamUrl({
				avid: videoDetail.aid,
				cid: videoDetail.cid,
				typeMode: "strict"
			})).data.data;
			const [commentsResponse, emojiResponse] = await Promise.all([bilibiliFetcher.fetchComments({
				oid: videoDetail.aid.toString(),
				type: 1,
				number: 50,
				typeMode: "strict"
			}), bilibiliFetcher.fetchEmojiList({ typeMode: "strict" })]);
			const commentsData = commentsResponse.data.data;
			const emojiData = emojiResponse.data;
			const comments = parseComments$1(commentsData.replies || [], emojiData);
			return createSuccessResponse(res, {
				id: videoDetail.bvid,
				title: videoDetail.title || "无标题",
				description: videoDetail.desc || "",
				thumbnail: videoDetail.pic || "",
				duration: formatDuration$1(videoDetail.duration || 0),
				views: formatCount$1(videoDetail.stat?.view || 0),
				likes: formatCount$1(videoDetail.stat?.like || 0),
				author: {
					name: videoDetail.owner?.name || "未知用户",
					avatar: videoDetail.owner?.face || "",
					id: videoDetail.owner?.mid?.toString() || ""
				},
				type: "video",
				downloadUrl: {
					video: streamData.dash?.video?.[0]?.baseUrl,
					audio: streamData.dash?.audio?.[0]?.baseUrl
				},
				tags: videoDetail.tname ? [videoDetail.tname] : [],
				comments,
				commentCount: videoDetail.stat?.reply || 0
			});
		} catch (error) {
			const err = error;
			if (await handleBilibiliRiskControl(err, res)) return;
			logger.error("[BilibiliAPI] 解析视频失败:", err);
			return createServerErrorResponse(res, `解析失败: ${err.message}`);
		}
	};
	parseDynamicRaw = async (req, res) => {
		try {
			const { dynamic_id } = req.body;
			if (!dynamic_id) return createBadRequestResponse(res, "请提供动态ID (dynamic_id)");
			const dynamicInfo = (await bilibiliFetcher.fetchDynamicDetail({
				dynamic_id,
				typeMode: "strict"
			})).data;
			const [dynamicCardResponse, userProfileResponse] = await Promise.all([bilibiliFetcher.fetchDynamicCard({
				dynamic_id: dynamicInfo.data.item.id_str,
				typeMode: "strict"
			}), bilibiliFetcher.fetchUserCard({
				host_mid: dynamicInfo.data.item.modules.module_author.mid,
				typeMode: "strict"
			})]);
			const dynamicCard = dynamicCardResponse.data.data;
			return createSuccessResponse(res, {
				dynamicInfo: dynamicInfo.data,
				dynamicCard,
				userProfile: userProfileResponse.data.data,
				comments: null,
				emoji: null
			});
		} catch (error) {
			const err = error;
			if (await handleBilibiliRiskControl(err, res)) return;
			logger.error("[BilibiliAPI] 解析动态失败:", err);
			return createServerErrorResponse(res, `解析失败: ${err.message}`);
		}
	};
	parseDynamic = async (req, res) => {
		try {
			const { dynamic_id } = req.body;
			if (!dynamic_id) return createBadRequestResponse(res, "请提供动态ID (dynamic_id)");
			const dynamicInfo = (await bilibiliFetcher.fetchDynamicDetail({
				dynamic_id,
				typeMode: "strict"
			})).data;
			const dynamicCard = (await bilibiliFetcher.fetchDynamicCard({
				dynamic_id: dynamicInfo.data.item.id_str,
				typeMode: "strict"
			})).data.data;
			const dynamicContent = parseDynamicContent(dynamicInfo);
			const author = getDynamicAuthor(dynamicInfo);
			const stats = getDynamicStats(dynamicInfo);
			let comments = [];
			const itemType = dynamicInfo.data.item.type;
			if (itemType !== DynamicType.LIVE_RCMD) try {
				const [commentsResponse, emojiResponse] = await Promise.all([bilibiliFetcher.fetchComments({
					type: getDynamicCommentType(itemType),
					oid: getDynamicOid(dynamicInfo, dynamicCard),
					typeMode: "strict"
				}), bilibiliFetcher.fetchEmojiList({ typeMode: "strict" })]);
				const commentsData = commentsResponse.data.data;
				const emojiData = emojiResponse.data;
				comments = parseComments$1(commentsData.replies || [], emojiData);
			} catch (error) {
				logger.warn("[BilibiliAPI] 获取动态评论失败:", error);
			}
			return createSuccessResponse(res, {
				id: dynamicInfo.data.item.id_str,
				title: dynamicContent.title,
				description: dynamicContent.description,
				thumbnail: dynamicContent.thumbnail || author.avatar,
				duration: "0:00",
				views: stats.views,
				likes: stats.likes,
				author,
				type: dynamicContent.type,
				dynamicType: itemType,
				images: dynamicContent.images,
				tags: [],
				comments,
				commentCount: stats.commentCount
			});
		} catch (error) {
			const err = error;
			if (await handleBilibiliRiskControl(err, res)) return;
			logger.error("[BilibiliAPI] 解析动态失败:", err);
			return createServerErrorResponse(res, `解析失败: ${err.message}`);
		}
	};
});
var QUALITY_MAP, getVideoPlayUrl;
var init_video = __esmMin(() => {
	init_amagiClient();
	init_risk_control();
	QUALITY_MAP = {
		6: "240P 极速",
		16: "360P 流畅",
		32: "480P 清晰",
		64: "720P 高清",
		74: "720P60 高帧率",
		80: "1080P 高清",
		112: "1080P+ 高码率",
		116: "1080P60 高帧率",
		120: "4K 超清",
		125: "HDR 真彩色",
		126: "杜比视界",
		127: "8K 超高清"
	};
	getVideoPlayUrl = async (req, res) => {
		try {
			const { bvid, p } = req.query;
			if (!bvid) return createBadRequestResponse(res, "请提供视频 BV 号 (bvid)");
			const pageNum = p ? parseInt(p, 10) : 1;
			const videoInfo = (await bilibiliFetcher.fetchVideoInfo({
				bvid,
				typeMode: "strict"
			})).data.data;
			const cid = pageNum > 1 && videoInfo.pages[pageNum - 1] ? videoInfo.pages[pageNum - 1].cid : videoInfo.cid;
			const playUrlData = (await bilibiliFetcher.fetchVideoStreamUrl({
				avid: videoInfo.aid,
				cid,
				typeMode: "strict"
			})).data.data;
			const response = {
				bvid: videoInfo.bvid,
				aid: videoInfo.aid,
				cid,
				title: videoInfo.title,
				duration: videoInfo.duration,
				cover: videoInfo.pic
			};
			if (playUrlData.dash) {
				response.streamType = "dash";
				const videoMap = /* @__PURE__ */ new Map();
				for (const video of playUrlData.dash.video) if (!videoMap.has(video.id)) videoMap.set(video.id, {
					url: video.baseUrl || video.base_url,
					quality: video.id,
					qualityDesc: QUALITY_MAP[video.id] || `${video.id}P`,
					codecs: video.codecs,
					width: video.width,
					height: video.height,
					bandwidth: video.bandwidth
				});
				response.videoStreams = Array.from(videoMap.values()).sort((a, b) => b.quality - a.quality);
				response.audioStreams = playUrlData.dash.audio.map((audio) => ({
					url: audio.baseUrl || audio.base_url,
					quality: audio.id,
					bandwidth: audio.bandwidth
				})).sort((a, b) => b.bandwidth - a.bandwidth);
			} else if (playUrlData.durl && playUrlData.durl.length > 0) {
				response.streamType = "durl";
				response.durlUrl = playUrlData.durl[0].url;
				response.durlQuality = playUrlData.accept_description?.[0] || "默认清晰度";
			} else return createServerErrorResponse(res, "无法获取视频播放地址");
			return createSuccessResponse(res, response);
		} catch (error) {
			const err = error;
			if (await handleBilibiliRiskControl(err, res)) return;
			logger.error("[BilibiliAPI] 获取视频播放地址失败:", err);
			return createServerErrorResponse(res, `获取播放地址失败: ${err.message}`);
		}
	};
});
var router;
var init_api$2 = __esmMin(async () => {
	await init_contents$1();
	await init_parse$1();
	await init_risk_control();
	await init_video();
	init_contents$1();
	init_parse$1();
	init_risk_control();
	init_video();
	router = express.Router();
	router.get("/contents", getContents$1);
	router.post("/contents", addContent$1);
	router.post("/contents/:id/delete", deleteContent$1);
	router.post("/parse/video", parseVideo);
	router.post("/parse/dynamic", parseDynamic);
	router.post("/parse/dynamic/raw", parseDynamicRaw);
	router.get("/video/playurl", getVideoPlayUrl);
	router.post("/verify", verifyCaptcha);
});
var getContents, addContent, deleteContent;
var init_contents = __esmMin(async () => {
	await init_db();
	await init_amagiClient();
	getContents = async (req, res) => {
		try {
			const { groupId } = req.query;
			if (!groupId || typeof groupId !== "string") return createBadRequestResponse(res, "请提供群组ID");
			const caches = await (await getDouyinDB()).awemeCacheRepository.find({
				where: { groupId },
				relations: ["douyinUser"],
				order: { createdAt: "DESC" },
				take: 100
			});
			const userAvatarMap = /* @__PURE__ */ new Map();
			const uniqueSecUids = [...new Set(caches.map((c) => c.sec_uid))];
			for (let i = 0; i < uniqueSecUids.length; i += 5) {
				const batch = uniqueSecUids.slice(i, i + 5);
				await Promise.all(batch.map(async (secUid) => {
					try {
						const userProfile = await douyinFetcher.fetchUserProfile({
							sec_uid: secUid,
							typeMode: "strict"
						});
						userAvatarMap.set(secUid, userProfile.data?.user?.avatar_larger?.url_list[0] || "");
					} catch {
						userAvatarMap.set(secUid, "");
					}
				}));
			}
			return createSuccessResponse(res, caches.map((cache) => {
				const cacheWithUser = cache;
				const authorName = cacheWithUser.douyinUser?.remark || cacheWithUser.douyinUser?.short_id || cache.sec_uid;
				return {
					id: cache.aweme_id,
					platform: "douyin",
					title: `抖音作品 ${cache.aweme_id}`,
					author: authorName,
					authorId: cache.sec_uid,
					avatar: userAvatarMap.get(cache.sec_uid) || "",
					thumbnail: "",
					type: "video",
					createdAt: cache.createdAt.getTime()
				};
			}));
		} catch (error) {
			logger.error("[DouyinAPI] 获取内容列表失败:", error);
			return createServerErrorResponse(res, "获取内容列表失败");
		}
	};
	addContent = async (req, res) => {
		try {
			const { contentId, groupId, authorId } = req.body;
			if (!contentId || !groupId || !authorId) return createBadRequestResponse(res, "请提供 contentId、groupId 和 authorId");
			const douyinDB$1 = await getDouyinDB();
			if (!await douyinDB$1.getDouyinUser(authorId)) return createBadRequestResponse(res, "该作者未在订阅列表中，请先添加订阅");
			await douyinDB$1.addAwemeCache(contentId, authorId, groupId);
			return createSuccessResponse(res, { message: "添加成功" });
		} catch (error) {
			logger.error("[DouyinAPI] 添加内容失败:", error);
			return createServerErrorResponse(res, "添加内容失败");
		}
	};
	deleteContent = async (req, res) => {
		try {
			const { id } = req.params;
			const { groupId } = req.body;
			if (!id || !groupId) return createBadRequestResponse(res, "请提供内容ID和群组ID");
			const result = await (await getDouyinDB()).awemeCacheRepository.delete({
				aweme_id: id,
				groupId
			});
			if (result.affected === 0) return createBadRequestResponse(res, "未找到要删除的内容");
			return createSuccessResponse(res, {
				message: "删除成功",
				affected: result.affected
			});
		} catch (error) {
			logger.error("[DouyinAPI] 删除内容失败:", error);
			return createServerErrorResponse(res, "删除内容失败");
		}
	};
});
var formatCount, formatDuration, formatTimestamp, removeTags, processCommentEmojis$2, parseComments, parseWork;
var init_parse = __esmMin(() => {
	init_amagiClient();
	formatCount = (count) => {
		if (count >= 1e8) return `${(count / 1e8).toFixed(1)}亿`;
		if (count >= 1e4) return `${(count / 1e4).toFixed(1)}万`;
		return count.toString();
	};
	formatDuration = (seconds) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
	formatTimestamp = (timestamp) => {
		const date = /* @__PURE__ */ new Date(timestamp * 1e3);
		const diff = (/* @__PURE__ */ new Date()).getTime() - date.getTime();
		if (diff < 6e4) return "刚刚";
		if (diff < 36e5) return `${Math.floor(diff / 6e4)}分钟前`;
		if (diff < 864e5) return `${Math.floor(diff / 36e5)}小时前`;
		if (diff < 2592e6) return `${Math.floor(diff / 864e5)}天前`;
		return `${date.getMonth() + 1}月${date.getDate()}日`;
	};
	removeTags = (title, tags) => {
		if (!title || !tags || tags.length === 0) return title;
		let cleanTitle = title;
		tags.forEach((tag) => {
			if (tag) {
				const hashtagPattern = new RegExp(`#${tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s|$)`, "gi");
				cleanTitle = cleanTitle.replace(hashtagPattern, "");
				const atPattern = new RegExp(`@${tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s|$)`, "gi");
				cleanTitle = cleanTitle.replace(atPattern, "");
			}
		});
		return cleanTitle.replace(/\s+/g, " ").trim();
	};
	processCommentEmojis$2 = (text, emojiData) => {
		if (!text || !emojiData?.emoji_list) return text;
		let processedText = text;
		processedText = processedText.replace(/\[([^\]]+)\]/g, (match, emojiName) => {
			const emojiInfo = emojiData.emoji_list.find((emoji) => emoji.display_name === `[${emojiName}]`);
			if (emojiInfo && emojiInfo.emoji_url?.url_list?.[0]) return `<img src="${emojiInfo.emoji_url.url_list[0]}" alt="${emojiName}" class="emoji" />`;
			return match;
		});
		return processedText.split(/(<img[^>]*>)/).map((part) => {
			if (part.startsWith("<img")) return part;
			if (part.trim()) return `<span>${part}</span>`;
			return part;
		}).join("");
	};
	parseComments = (commentsData, emojiData) => {
		if (!commentsData || !Array.isArray(commentsData)) return [];
		return commentsData.map((comment, index) => {
			let processedText = comment.text || "";
			if (emojiData && comment.text) processedText = processCommentEmojis$2(comment.text, emojiData);
			return {
				id: comment.cid?.toString() || index.toString(),
				author: comment.user?.nickname || "匿名用户",
				avatar: comment.user?.avatar_thumb?.url_list?.[0] || "",
				content: processedText,
				images: comment.image_list?.map((img$2) => img$2.origin_url?.url_list?.[3]).filter(Boolean) || [],
				likes: comment.digg_count || 0,
				timestamp: formatTimestamp(comment.create_time || 0)
			};
		});
	};
	parseWork = async (req, res) => {
		try {
			const { aweme_id } = req.body;
			if (!aweme_id) return createBadRequestResponse(res, "请提供作品ID (aweme_id)");
			const [workResponse, commentsResponse, emojiResponse] = await Promise.all([
				douyinFetcher.parseWork({
					aweme_id,
					typeMode: "strict"
				}),
				douyinFetcher.fetchWorkComments({
					aweme_id,
					typeMode: "strict"
				}),
				douyinFetcher.fetchEmojiList({ typeMode: "strict" })
			]);
			const awemeDetail = workResponse.data.aweme_detail;
			const commentsData = commentsResponse.data.comments;
			const emojiData = emojiResponse.data;
			const isSlides = awemeDetail.is_slides === true && awemeDetail.images !== null;
			const isVideo = !awemeDetail.images && !isSlides;
			const workType = isSlides ? "slides" : isVideo ? "video" : "note";
			const comments = parseComments(commentsData, emojiData);
			const tags = Array.isArray(awemeDetail.text_extra) ? awemeDetail.text_extra.map((tag) => typeof tag === "string" ? tag : tag.hashtag_name).filter(Boolean) : [];
			const cleanTitle = removeTags(awemeDetail.desc || "无标题", tags);
			let slides;
			if (isSlides && awemeDetail.images) slides = awemeDetail.images.map((item) => {
				if (item.clip_type === 2) return {
					type: "image",
					url: item.url_list[2],
					thumbnail: item.url_list[2]
				};
				else if (item.clip_type === 3) {
					const videoUri = item.video?.play_addr_h264?.uri;
					const videoUrl = videoUri ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${videoUri}&ratio=1080p&line=0` : item.video?.play_addr_h264?.url_list?.[0];
					return {
						type: "livephoto",
						url: item.url_list[2],
						videoUrl,
						thumbnail: item.url_list[2],
						duration: formatDuration(item.video?.duration / 1e3 || 0)
					};
				} else return {
					type: "video",
					url: item.video.play_addr_h264.url_list[0],
					thumbnail: item.url_list[2],
					duration: formatDuration(item.video?.duration / 1e3 || 0)
				};
			});
			return createSuccessResponse(res, {
				id: awemeDetail.aweme_id,
				title: cleanTitle,
				description: awemeDetail.desc || "",
				thumbnail: isVideo ? awemeDetail.video?.cover?.url_list?.[0] : awemeDetail.images?.[0]?.url_list?.[0] || "",
				duration: isVideo ? formatDuration(awemeDetail.video?.duration / 1e3 || 0) : "0:00",
				views: formatCount(awemeDetail.statistics?.play_count || 0),
				likes: formatCount(awemeDetail.statistics?.digg_count || 0),
				author: {
					name: awemeDetail.author?.nickname || "未知用户",
					avatar: awemeDetail.author?.avatar_thumb?.url_list?.[0] || "",
					id: awemeDetail.author?.sec_uid || ""
				},
				type: workType,
				downloadUrl: {
					video: isVideo ? awemeDetail.video?.play_addr?.url_list?.[0] : isSlides && slides ? slides.find((slide) => slide.type === "video")?.url : void 0,
					audio: isSlides && awemeDetail.video ? awemeDetail.video?.play_addr?.url_list?.[0] : awemeDetail.music?.play_url?.uri
				},
				images: workType === "note" ? awemeDetail.images?.map((img$2) => img$2.url_list?.[2]).filter(Boolean) : void 0,
				slides,
				tags,
				comments,
				commentCount: awemeDetail.statistics?.comment_count || 0
			});
		} catch (error) {
			logger.error("[DouyinAPI] 解析作品失败:", error);
			return createServerErrorResponse(res, `解析失败: ${error.message}`);
		}
	};
});
var router$1;
var init_api$1 = __esmMin(async () => {
	await init_contents();
	await init_parse();
	init_contents();
	init_parse();
	router$1 = express.Router();
	router$1.get("/contents", getContents);
	router$1.post("/contents", addContent);
	router$1.post("/contents/:id/delete", deleteContent);
	router$1.post("/parse", parseWork);
});
var base64Decode, urlDecode, hexDecode, reverseString, charOffsetDecode, multiLayerDecode, signatureVerificationMiddleware;
var init_auth = __esmMin(() => {
	base64Decode = (str) => Buffer.from(str, "base64").toString("utf8");
	urlDecode = (str) => decodeURIComponent(str);
	hexDecode = (str) => Buffer.from(str, "hex").toString("utf8");
	reverseString = (str) => str.split("").reverse().join("");
	charOffsetDecode = (str, offset = 5) => str.split("").map((char) => {
		const code = char.charCodeAt(0);
		return String.fromCharCode(code - offset);
	}).join("");
	multiLayerDecode = (str) => {
		try {
			let decoded = base64Decode(str);
			decoded = urlDecode(decoded);
			decoded = base64Decode(decoded);
			decoded = reverseString(decoded);
			decoded = hexDecode(decoded);
			decoded = charOffsetDecode(decoded, 5);
			return decoded;
		} catch (error) {
			throw new Error("多层解码失败：" + error);
		}
	};
	signatureVerificationMiddleware = (req, res, next) => {
		try {
			const encodedSignature = req.headers["x-signature"];
			const timestamp = req.headers["x-timestamp"];
			const nonce = req.headers["x-nonce"];
			const token = req.headers["authorization"]?.replace("Bearer ", "") || "";
			if (!encodedSignature || !timestamp || !nonce) return createBadRequestResponse(res, "缺少必要的签名参数");
			const currentTime = Date.now();
			const requestTime = parseInt(timestamp);
			if (Math.abs(currentTime - requestTime) > 300 * 1e3) return createBadRequestResponse(res, "请求时间戳已过期");
			let decodedSignature;
			try {
				decodedSignature = multiLayerDecode(encodedSignature);
			} catch (error) {
				return createBadRequestResponse(res, "签名格式错误：" + error);
			}
			const signatureString = `${req.method.toUpperCase()}|${req.headers["x-original-url"] || req.originalUrl}|${req.method === "GET" ? "" : JSON.stringify(req.body || {})}|${timestamp}|${nonce}`;
			const expectedSignature = crypto.createHmac("sha256", token).update(signatureString).digest("hex");
			if (decodedSignature !== expectedSignature) {
				logger.warn(`签名验证失败: 期望=${expectedSignature}, 解码后实际=${decodedSignature}, 签名字符串=${signatureString}`);
				return createBadRequestResponse(res, "签名验证失败");
			}
			next();
		} catch (error) {
			logger.error("签名验证中间件错误:", error);
			return createServerErrorResponse(res, "签名验证失败");
		}
	};
});
var getBots, getBotGroups, getGroupsBatch;
var init_bots = __esmMin(() => {
	getBots = async (_req, res) => {
		try {
			const botList = karin.getAllBotList();
			const bots = [];
			for (const item of botList) {
				const bot = item.bot;
				if (bot.account.name === "console") continue;
				let avatar = "";
				try {
					avatar = await bot.getAvatarUrl(bot.account.selfId) || "";
				} catch (e) {
					logger.warn(`[BotsAPI] 获取 Bot 头像失败 ${bot.account.selfId}:`, e);
				}
				bots.push({
					id: bot.account.selfId,
					name: bot.account.name || bot.account.selfId,
					avatar,
					isOnline: true
				});
			}
			return createSuccessResponse(res, bots);
		} catch (error) {
			logger.error("[BotsAPI] 获取 Bot 列表失败:", error);
			return createServerErrorResponse(res, "获取 Bot 列表失败");
		}
	};
	getBotGroups = async (req, res) => {
		try {
			const { botId } = req.params;
			if (!botId) return createServerErrorResponse(res, "缺少 botId 参数");
			const botItem = karin.getAllBotList().find((item) => item.bot.account.selfId === botId);
			if (!botItem) return createServerErrorResponse(res, "Bot 不存在或不在线");
			const bot = botItem.bot;
			const groupList = await bot.getGroupList();
			const groups = [];
			for (const group of groupList) {
				let avatar = "";
				try {
					avatar = await bot.getGroupAvatarUrl(group.groupId) || "";
				} catch {}
				groups.push({
					id: group.groupId,
					name: group.groupName || group.groupId,
					avatar
				});
			}
			return createSuccessResponse(res, groups);
		} catch (error) {
			logger.error("[BotsAPI] 获取 Bot 群列表失败:", error);
			return createServerErrorResponse(res, "获取群列表失败");
		}
	};
	getGroupsBatch = async (req, res) => {
		try {
			const { groups } = req.body;
			if (!groups || !Array.isArray(groups)) return createServerErrorResponse(res, "缺少 groups 参数");
			const result = [];
			const botList = karin.getAllBotList();
			for (const item of groups) {
				const botItem = botList.find((b) => b.bot.account.selfId === item.botId);
				if (!botItem) {
					result.push({
						groupId: item.groupId,
						botId: item.botId,
						groupName: item.groupId,
						groupAvatar: "",
						botName: item.botId,
						botAvatar: "",
						isOnline: false
					});
					continue;
				}
				const bot = botItem.bot;
				let groupName = item.groupId;
				let groupAvatar = "";
				let botName = bot.account.name || item.botId;
				let botAvatar = "";
				try {
					const groupInfo = await bot.getGroupInfo(item.groupId);
					if (groupInfo) groupName = groupInfo.groupName || groupName;
					groupAvatar = await bot.getGroupAvatarUrl(item.groupId) || "";
					botAvatar = await bot.getAvatarUrl(item.botId) || "";
				} catch (e) {
					logger.warn(`[BotsAPI] 获取群组信息失败 ${item.groupId}:`, e);
				}
				result.push({
					groupId: item.groupId,
					botId: item.botId,
					groupName,
					groupAvatar,
					botName,
					botAvatar,
					isOnline: true
				});
			}
			return createSuccessResponse(res, result);
		} catch (error) {
			logger.error("[BotsAPI] 批量获取群组信息失败:", error);
			return createServerErrorResponse(res, "批量获取群组信息失败");
		}
	};
});
var getAllConfig, getConfigModule, updateConfigModule, patchConfigItem, updateAllConfig;
var init_config$1 = __esmMin(() => {
	init_Config();
	getAllConfig = async (_req, res) => {
		try {
			const config$1 = await Config.All();
			res.json({
				success: true,
				message: "获取配置成功",
				data: config$1
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `获取配置失败: ${error.message}`,
				data: null
			});
		}
	};
	getConfigModule = async (req, res) => {
		try {
			const { module } = req.params;
			const allConfig = await Config.All();
			if (!(module in allConfig)) return res.status(400).json({
				success: false,
				message: `配置模块 "${module}" 不存在`,
				data: null
			});
			res.json({
				success: true,
				message: "获取配置成功",
				data: allConfig[module]
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `获取配置失败: ${error.message}`,
				data: null
			});
		}
	};
	updateConfigModule = async (req, res) => {
		try {
			const { module } = req.params;
			const newConfig = req.body?.config || req.body;
			if (!newConfig || typeof newConfig !== "object") return res.status(400).json({
				success: false,
				message: "请求体必须是有效的配置对象",
				data: null
			});
			if ("_method" in newConfig) delete newConfig._method;
			if (!(module in await Config.All())) return res.status(400).json({
				success: false,
				message: `配置模块 "${module}" 不存在`,
				data: null
			});
			if (await Config.ModifyPro(module, newConfig)) {
				if (module === "pushlist") await Config.syncConfigToDatabase();
				const updatedConfig = await Config.All();
				res.json({
					success: true,
					message: "配置更新成功",
					data: updatedConfig[module]
				});
			} else res.status(500).json({
				success: false,
				message: "配置更新失败",
				data: null
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `配置更新失败: ${error.message}`,
				data: null
			});
		}
	};
	patchConfigItem = async (req, res) => {
		try {
			const { module } = req.params;
			const { key, value } = req.body;
			if (!key) return res.status(400).json({
				success: false,
				message: "缺少配置项 key",
				data: null
			});
			if (!(module in await Config.All())) return res.status(400).json({
				success: false,
				message: `配置模块 "${module}" 不存在`,
				data: null
			});
			Config.Modify(module, key, value);
			const updatedConfig = await Config.All();
			res.json({
				success: true,
				message: "配置项更新成功",
				data: updatedConfig[module]
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `配置项更新失败: ${error.message}`,
				data: null
			});
		}
	};
	updateAllConfig = async (req, res) => {
		try {
			const newConfig = req.body;
			if (!newConfig || typeof newConfig !== "object") return res.status(400).json({
				success: false,
				message: "请求体必须是有效的配置对象",
				data: null
			});
			const results = [];
			for (const [module, config$1] of Object.entries(newConfig)) try {
				const success = await Config.ModifyPro(module, config$1);
				results.push({
					module,
					success
				});
			} catch (error) {
				results.push({
					module,
					success: false,
					error: error.message
				});
			}
			if ("pushlist" in newConfig) await Config.syncConfigToDatabase();
			const allSuccess = results.every((r) => r.success);
			const updatedConfig = await Config.All();
			res.json({
				success: allSuccess,
				message: allSuccess ? "所有配置更新成功" : "部分配置更新失败",
				data: {
					config: updatedConfig,
					results
				}
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `配置更新失败: ${error.message}`,
				data: null
			});
		}
	};
});
var getGroups;
var init_groups = __esmMin(async () => {
	await init_db();
	getGroups = async (_req, res) => {
		try {
			const douyinDB$1 = await getDouyinDB();
			const bilibiliDB$1 = await getBilibiliDB();
			const [douyinGroups, bilibiliGroups] = await Promise.all([douyinDB$1.groupRepository.find(), bilibiliDB$1.groupRepository.find()]);
			const allGroupsMap = /* @__PURE__ */ new Map();
			douyinGroups.forEach((group) => {
				allGroupsMap.set(group.id, {
					id: group.id,
					botId: group.botId
				});
			});
			bilibiliGroups.forEach((group) => {
				if (!allGroupsMap.has(group.id)) allGroupsMap.set(group.id, {
					id: group.id,
					botId: group.botId
				});
			});
			const groupList = [];
			for (const group of allGroupsMap.values()) {
				const [douyinSubscriptions, bilibiliSubscriptions] = await Promise.all([douyinDB$1.getGroupSubscriptions(group.id), bilibiliDB$1.getGroupSubscriptions(group.id)]);
				if (douyinSubscriptions.length > 0 || bilibiliSubscriptions.length > 0) {
					const bot = getBot(group.botId);
					let groupName = group.id;
					let groupAvatarUrl = "";
					let botAvatarUrl = "";
					let isOnline = true;
					if (!bot) isOnline = false;
					else try {
						const groupInfo = await bot.getGroupInfo(group.id);
						if (groupInfo) groupName = groupInfo.groupName || groupName;
						groupAvatarUrl = await bot.getGroupAvatarUrl(group.id) || "";
						botAvatarUrl = await bot.getAvatarUrl(group.botId) || "";
					} catch (e) {
						logger.warn(`[GroupsAPI] 获取群组信息失败 ${group.id}:`, e);
					}
					groupList.push({
						id: group.id,
						name: groupName,
						avatar: groupAvatarUrl,
						botId: group.botId,
						botAvatar: botAvatarUrl,
						isOnline,
						subscriptionCount: {
							douyin: douyinSubscriptions.length,
							bilibili: bilibiliSubscriptions.length
						}
					});
				}
			}
			return createSuccessResponse(res, groupList);
		} catch (error) {
			logger.error("[GroupsAPI] 获取群组列表失败:", error);
			return createServerErrorResponse(res, "获取群组列表失败");
		}
	};
});
var detectPlatform, extractWorkId, resolveLink;
var init_link = __esmMin(() => {
	detectPlatform = (url) => {
		if (url.includes("douyin.com") || url.includes("iesdouyin.com") || url.includes("webcast.amemv.com") || url.includes("live.douyin.com")) return "douyin";
		if (url.includes("bilibili.com") || url.includes("b23.tv")) return "bilibili";
		return "unknown";
	};
	extractWorkId = (url, platform$1) => {
		if (platform$1 === "douyin") {
			const videoMatch = /video\/(\d+)/.exec(url);
			if (videoMatch) return {
				type: "video",
				id: videoMatch[1]
			};
			const noteMatch = /note\/(\d+)/.exec(url);
			if (noteMatch) return {
				type: "note",
				id: noteMatch[1]
			};
			const modalMatch = /modal_id=(\d+)/.exec(url);
			if (modalMatch) return {
				type: "video",
				id: modalMatch[1]
			};
		}
		if (platform$1 === "bilibili") {
			const bvidMatch = /\/video\/(BV[a-zA-Z0-9]+)/.exec(url);
			if (bvidMatch) return {
				type: "video",
				id: bvidMatch[1]
			};
			const aidMatch = /\/video\/av(\d+)/.exec(url);
			if (aidMatch) return {
				type: "video",
				id: aidMatch[1]
			};
			const tMatch = /^https:\/\/t\.bilibili\.com\/(\d+)/.exec(url);
			if (tMatch) return {
				type: "dynamic",
				id: tMatch[1]
			};
			const opusMatch = /\/opus\/(\d+)/.exec(url);
			if (opusMatch) return {
				type: "dynamic",
				id: opusMatch[1]
			};
		}
		return null;
	};
	resolveLink = async (req, res) => {
		try {
			const { link } = req.body;
			if (!link || typeof link !== "string") return createBadRequestResponse(res, "请提供有效的链接");
			const finalUrl = (await axios.get(link, {
				headers: { "User-Agent": "Apifox/1.0.0 (https://apifox.com)" },
				maxRedirects: 10,
				validateStatus: () => true
			})).request.res?.responseUrl || link;
			if (finalUrl.includes("403 Forbidden")) return createServerErrorResponse(res, "无法获取链接的重定向地址");
			const platform$1 = detectPlatform(finalUrl);
			const workInfo = extractWorkId(finalUrl, platform$1);
			logger.debug(`[LinkAPI] 链接解析: ${link} -> ${platform$1} (${workInfo?.type}: ${workInfo?.id})`);
			return createSuccessResponse(res, {
				originalUrl: link,
				finalUrl,
				platform: platform$1,
				workType: workInfo?.type || null,
				workId: workInfo?.id || null
			});
		} catch (error) {
			logger.error("[LinkAPI] 链接解析失败:", error);
			return createServerErrorResponse(res, `链接解析失败: ${error.message}`);
		}
	};
});
var $var, $literal, $not, $or, $eq, $ne, $includes;
var init_schema$1 = __esmMin(() => {
	$var = (field) => ({
		type: "var",
		field
	});
	$literal = (value) => ({
		type: "literal",
		value
	});
	$not = (condition) => ({
		type: "not",
		condition: typeof condition === "string" ? $var(condition) : condition
	});
	$or = (...conditions) => ({
		type: "or",
		conditions
	});
	$eq = (left, right) => ({
		type: "compare",
		left: typeof left === "string" ? $var(left) : $literal(left),
		operator: "===",
		right: typeof right === "string" ? $var(right) : $literal(right)
	});
	$ne = (left, right) => ({
		type: "compare",
		left: typeof left === "string" ? $var(left) : $literal(left),
		operator: "!==",
		right: typeof right === "string" ? $var(right) : $literal(right)
	});
	$includes = (field, value) => ({
		type: "includes",
		field,
		value
	});
});
function getLocalIP$1() {
	const interfaces = os.networkInterfaces();
	const candidates = [];
	for (const name of Object.keys(interfaces)) {
		const netInterface = interfaces[name];
		if (!netInterface) continue;
		for (const net of netInterface) if (net.family === "IPv4" && !net.internal) candidates.push(net.address);
	}
	return candidates.find((ip) => {
		if (ip.startsWith("192.168.")) return true;
		if (ip.startsWith("10.")) return true;
		if (ip.startsWith("172.")) {
			const second = parseInt(ip.split(".")[1], 10);
			if (second >= 16 && second <= 31) return true;
		}
		return false;
	}) || candidates[0] || "127.0.0.1";
}
var appConfigSchema;
var init_app_schema = __esmMin(() => {
	init_schema$1();
	appConfigSchema = {
		key: "app",
		title: "插件应用相关",
		subtitle: "此处用于管理插件的基本设置",
		fields: [
			{
				description: "缓存设置",
				descPosition: 20
			},
			{
				key: "removeCache",
				label: "缓存删除",
				description: "下载的视频缓存自动删除，非必要不修改！"
			},
			{
				key: "downloadImageLocally",
				label: "本地下载图片",
				description: "发送图片时由插件本地下载后使用 file 协议传递，而非直接传递 HTTP 链接给上游下载"
			},
			{
				description: "解析优先级设置",
				descPosition: 20
			},
			{
				key: "videoTool",
				label: "默认解析",
				description: "即识别最高优先级，修改后重启生效"
			},
			{
				key: "priority",
				type: "number",
				label: "自定义优先级",
				description: "自定义优先级，「默认解析」关闭后才会生效。修改后重启生效",
				disabled: $var("videoTool")
			},
			{
				description: "渲染配置",
				descPosition: 20
			},
			{
				key: "renderScale",
				type: "number",
				label: "渲染精度",
				description: "可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度",
				rules: [{
					min: 50,
					max: 200
				}]
			},
			{
				key: "Theme",
				label: "渲染图片的主题色",
				orientation: "horizontal",
				radio: [
					{
						key: "Theme:radio-1",
						label: "自动",
						value: "0",
						description: "06:00-18:00为浅色，18:00-06:00为深色"
					},
					{
						key: "Theme:radio-2",
						label: "浅色",
						value: "1"
					},
					{
						key: "Theme:radio-3",
						label: "深色",
						value: "2"
					}
				]
			},
			{
				key: "RemoveWatermark",
				label: "移除水印",
				description: "渲染的图片是否移除底部水印"
			},
			{
				key: "RenderWaitTime",
				type: "number",
				label: "渲染图片的等待时间",
				description: os.platform() === "linux" ? "单位：秒，Linux系统下不能为0" : "单位：秒，传递 0 可禁用",
				rules: [os.platform() === "linux" ? {
					min: 1,
					error: "Linux系统下渲染等待时间不能为0"
				} : { min: 0 }]
			},
			{
				key: "multiPageRender",
				label: "分页渲染",
				description: "将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改！"
			},
			{
				key: "multiPageHeight",
				type: "number",
				label: "分页渲染时，每页的高度",
				description: "经测试最佳每页高度为12000px，默认12000px",
				disabled: $not("multiPageRender"),
				rules: [{
					min: 1e3,
					max: 2e4,
					error: "请输入一个范围在 1000 到 20000 之间的数字"
				}]
			},
			{
				description: "API服务配置",
				descPosition: 20
			},
			{
				key: "APIServer",
				label: "API服务",
				description: "本地部署一个视频解析API服务，接口范围为本插件用到的所有"
			},
			{
				key: "APIServerMount",
				label: "挂载到 Karin",
				description: "API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」",
				disabled: $not("APIServer")
			},
			{
				key: "APIServerPort",
				type: "number",
				label: "API服务端口",
				disabled: $or($not("APIServer"), $var("APIServerMount")),
				rules: [{
					min: 1024,
					max: 65535,
					error: "请输入一个范围在 1024 到 65535 之间的数字"
				}]
			},
			{
				description: "交互与认证设置",
				descPosition: 20
			},
			{
				key: "EmojiReply",
				label: "表情回应",
				description: "在解析任务开始时添加表情回应，若适配器不支持需要关闭"
			},
			{
				key: "errorLogSendTo",
				label: "错误日志",
				description: "遇到错误时谁会收到错误日志。注：推送任务只可发送给主人。「第一个主人」与「所有主人」互斥。",
				orientation: "horizontal",
				checkbox: [
					{
						key: "errorLogSendTo:checkbox:1",
						label: "除'console'外的第一个主人",
						value: "master"
					},
					{
						key: "errorLogSendTo:checkbox:2",
						label: "所有主人（排除console）",
						value: "allMasters"
					},
					{
						key: "errorLogSendTo:checkbox:3",
						label: "触发者（不支持私聊）",
						value: "trigger"
					}
				]
			},
			{
				description: "我的小玩具配置",
				descPosition: 20
			},
			{
				key: "qrLoginAddrType",
				label: "扫码登录地址类型",
				description: "生成登录二维码时使用的服务器地址",
				orientation: "horizontal",
				radio: [{
					key: "qrLoginAddrType:radio-1",
					label: `局域网（${getLocalIP$1()}）`,
					value: "lan",
					description: "适用于手机和服务器在同一局域网"
				}, {
					key: "qrLoginAddrType:radio-2",
					label: "外部地址",
					value: "external",
					description: "适用于远程访问，需手动配置"
				}]
			},
			{
				key: "qrLoginExternalAddr",
				type: "text",
				label: "外部访问地址",
				description: "公网 IP 或域名，如：123.45.67.89 或 example.com",
				placeholder: "请输入公网 IP 或域名",
				disabled: $ne("qrLoginAddrType", "external")
			}
		]
	};
});
var bilibiliConfigSchema;
var init_bilibili_schema = __esmMin(() => {
	init_schema$1();
	bilibiliConfigSchema = {
		key: "bilibili",
		title: "B站相关",
		subtitle: "此处为B站相关的用户偏好设置",
		fields: [
			{
				key: "switch",
				label: "解析开关",
				description: "B站解析开关，此开关为单独开关"
			},
			{
				key: "tip",
				label: "解析提示",
				description: "B站解析提示，发送提示信息：\"检测到B站链接，开始解析\"",
				disabled: $not("switch")
			},
			{
				key: "sendContent",
				label: "解析时发送的内容",
				description: "若什么都不选，可能不会返回任何解析结果",
				orientation: "horizontal",
				disabled: $not("switch"),
				checkbox: [
					{
						key: "sendContent:checkbox:1",
						label: "视频信息",
						value: "info",
						description: "仅解析视频时有效"
					},
					{
						key: "sendContent:checkbox:2",
						label: "评论列表",
						value: "comment"
					},
					{
						key: "sendContent:checkbox:3",
						label: "视频文件",
						value: "video",
						description: "仅对视频稿件有效"
					}
				]
			},
			{
				description: "评论详情设置",
				descPosition: 20
			},
			{
				key: "numcomment",
				type: "number",
				label: "评论解析数量",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment"))),
				rules: [{ min: 1 }]
			},
			{
				key: "realCommentCount",
				label: "显示真实评论数量",
				description: "评论图是否显示真实评论数量，关闭则显示解析到的评论数量",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment")))
			},
			{
				description: "渲染与画质设置",
				descPosition: 20
			},
			{
				key: "imageLayout",
				label: "解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）",
				description: "自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格",
				orientation: "horizontal",
				radio: [
					{
						key: "imageLayout:radio-1",
						label: "自动布局",
						value: "auto"
					},
					{
						key: "imageLayout:radio-2",
						label: "逐张上下排列",
						value: "vertical"
					},
					{
						key: "imageLayout:radio-3",
						label: "瀑布流排列",
						value: "waterfall"
					},
					{
						key: "imageLayout:radio-4",
						label: "九宫格排列",
						value: "grid"
					}
				]
			},
			{
				key: "videoQuality",
				label: "画质偏好",
				description: "解析视频的分辨率偏好。",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not($includes("sendContent", "video"))),
				radio: [
					{
						key: "videoQuality:radio-1",
						label: "自动选择",
						value: "0"
					},
					{
						key: "videoQuality:radio-2",
						label: "240P 极速",
						value: "6"
					},
					{
						key: "videoQuality:radio-3",
						label: "360P 流畅",
						value: "16"
					},
					{
						key: "videoQuality:radio-4",
						label: "480P 清晰",
						value: "32",
						description: "需登录（配置ck）"
					},
					{
						key: "videoQuality:radio-5",
						label: "720P 高清",
						value: "64",
						description: "需登录（配置ck）"
					},
					{
						key: "videoQuality:radio-6",
						label: "720P60 高帧率",
						value: "74",
						description: "需登录（配置ck）"
					},
					{
						key: "videoQuality:radio-7",
						label: "1080P 高清",
						value: "80",
						description: "需登录（配置ck）"
					},
					{
						key: "videoQuality:radio-8",
						label: "1080P+ 高码率",
						value: "112",
						description: "需大会员&视频支持"
					},
					{
						key: "videoQuality:radio-9",
						label: "1080P60 高帧率",
						value: "116",
						description: "需大会员&视频支持"
					},
					{
						key: "videoQuality:radio-10",
						label: "4K 超清",
						value: "120",
						description: "需大会员&视频支持"
					},
					{
						key: "videoQuality:radio-11",
						label: "8K 超高清",
						value: "127",
						description: "需大会员&视频支持"
					}
				]
			},
			{
				key: "maxAutoVideoSize",
				type: "number",
				label: "视频体积上限（MB）",
				description: "根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
				disabled: $or($not("switch"), $not($includes("sendContent", "video")), $ne("videoQuality", "0")),
				rules: [{
					min: 1,
					max: 2e4
				}]
			},
			{
				key: "videoInfoMode",
				label: "视频信息返回形式",
				disabled: $not("switch"),
				radio: [{
					key: "videoInfoMode:radio-1",
					label: "图片模式",
					value: "image"
				}, {
					key: "videoInfoMode:radio-2",
					label: "文本模式",
					value: "text"
				}]
			},
			{
				key: "displayContent",
				label: "视频信息前返回的内容",
				description: "若什么都不选，则不会返回任何视频相关信息",
				orientation: "horizontal",
				disabled: $or($not("switch"), $eq("videoInfoMode", "image")),
				checkbox: [
					{
						key: "displayContent:checkbox:1",
						label: "封面",
						value: "cover"
					},
					{
						key: "displayContent:checkbox:2",
						label: "标题",
						value: "title"
					},
					{
						key: "displayContent:checkbox:3",
						label: "作者",
						value: "author"
					},
					{
						key: "displayContent:checkbox:4",
						label: "视频统计信息",
						value: "stats"
					},
					{
						key: "displayContent:checkbox:5",
						label: "简介",
						value: "desc"
					}
				]
			},
			{
				description: "权限设置",
				descPosition: 20
			},
			{
				key: "loginPerm",
				label: "谁可以触发扫码登录",
				description: "修改后需重启",
				orientation: "horizontal",
				radio: [
					{
						key: "loginPerm:radio-1",
						label: "所有人",
						value: "all"
					},
					{
						key: "loginPerm:radio-2",
						label: "管理员",
						value: "admin"
					},
					{
						key: "loginPerm:radio-3",
						label: "主人",
						value: "master"
					},
					{
						key: "loginPerm:radio-4",
						label: "群主",
						value: "group.owner"
					},
					{
						key: "loginPerm:radio-5",
						label: "群管理员",
						value: "group.admin"
					}
				]
			},
			{
				description: "弹幕烧录相关",
				descPosition: 20
			},
			{
				key: "burnDanmaku",
				label: "弹幕烧录",
				description: "将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长，高分辨率视频会占用较多资源",
				disabled: $not("switch")
			},
			{
				key: "danmakuArea",
				label: "弹幕区域",
				description: "限制弹幕的显示范围，避免遮挡视频主体内容",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "danmakuArea:radio-1",
						label: "1/4 屏",
						value: "0.25",
						description: "仅顶部区域"
					},
					{
						key: "danmakuArea:radio-2",
						label: "半屏",
						value: "0.5",
						description: "上半部分（推荐）"
					},
					{
						key: "danmakuArea:radio-3",
						label: "3/4 屏",
						value: "0.75",
						description: "大部分区域"
					},
					{
						key: "danmakuArea:radio-4",
						label: "全屏",
						value: "1",
						description: "铺满整个画面"
					}
				]
			},
			{
				key: "danmakuFontSize",
				label: "弹幕字号",
				description: "弹幕文字大小",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "danmakuFontSize:radio-1",
						label: "小",
						value: "small"
					},
					{
						key: "danmakuFontSize:radio-2",
						label: "中",
						value: "medium"
					},
					{
						key: "danmakuFontSize:radio-3",
						label: "大",
						value: "large"
					}
				]
			},
			{
				key: "danmakuOpacity",
				type: "number",
				label: "弹幕透明度",
				description: "0为完全透明，100为完全不透明，推荐70",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				rules: [{
					min: 0,
					max: 100
				}]
			},
			{
				key: "verticalMode",
				label: "竖屏适配",
				description: "模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "verticalMode:radio-1",
						label: "关闭",
						value: "off",
						description: "保持原始比例，不做转换"
					},
					{
						key: "verticalMode:radio-2",
						label: "智能",
						value: "standard",
						description: "仅对 16:9、21:9 等常见宽屏比例生效"
					},
					{
						key: "verticalMode:radio-3",
						label: "强制 9:16",
						value: "force",
						description: "所有视频统一转为 9:16 竖屏，弹幕大小一致"
					}
				]
			},
			{
				key: "videoCodec",
				label: "视频编码格式",
				description: "弹幕烧录时使用的视频编码格式，会自动检测硬件加速",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "videoCodec:radio-1",
						label: "H.264",
						value: "h264",
						description: "兼容性最好，支持几乎所有设备"
					},
					{
						key: "videoCodec:radio-2",
						label: "H.265",
						value: "h265",
						description: "压缩率更高，近几年设备支持良好（推荐）"
					},
					{
						key: "videoCodec:radio-3",
						label: "AV1",
						value: "av1",
						description: "最新编码格式，压缩率最高，但编码较慢"
					}
				]
			},
			{
				description: "B站推送相关",
				descPosition: 20
			},
			{
				key: "push.switch",
				label: "推送开关",
				description: "推送开关，修改后需重启；使用「#设置B站推送 + UID」配置推送列表",
				color: "warning"
			},
			{
				key: "push.permission",
				label: "谁可以设置推送",
				description: "修改后需重启",
				orientation: "horizontal",
				color: "warning",
				disabled: $not("push.switch"),
				radio: [
					{
						key: "push.permission:radio-1",
						label: "所有人",
						value: "all"
					},
					{
						key: "push.permission:radio-2",
						label: "管理员",
						value: "admin"
					},
					{
						key: "push.permission:radio-3",
						label: "主人",
						value: "master"
					},
					{
						key: "push.permission:radio-4",
						label: "群主",
						value: "group.owner"
					},
					{
						key: "push.permission:radio-5",
						label: "群管理员",
						value: "group.admin"
					}
				]
			},
			{
				key: "push.cron",
				type: "text",
				label: "定时任务表达式",
				description: "定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）",
				color: "warning",
				disabled: $not("push.switch")
			},
			{
				key: "push.parsedynamic",
				label: "作品解析",
				description: "触发推送时是否一同解析该作品",
				color: "warning",
				disabled: $not("push.switch")
			},
			{
				key: "push.pushVideoQuality",
				label: "解析视频动态时的画质偏好",
				description: "「作品解析」开启时生效，仅对视频动态有效",
				orientation: "horizontal",
				disabled: $or($not("push.switch"), $not("push.parsedynamic")),
				color: "warning",
				radio: [
					{
						key: "push.pushVideoQuality:radio-1",
						label: "自动选择",
						value: "0"
					},
					{
						key: "push.pushVideoQuality:radio-2",
						label: "240P 极速",
						value: "6"
					},
					{
						key: "push.pushVideoQuality:radio-3",
						label: "360P 流畅",
						value: "16"
					},
					{
						key: "push.pushVideoQuality:radio-4",
						label: "480P 清晰",
						value: "32",
						description: "需登录（配置ck）"
					},
					{
						key: "push.pushVideoQuality:radio-5",
						label: "720P 高清",
						value: "64",
						description: "需登录（配置ck）"
					},
					{
						key: "push.pushVideoQuality:radio-6",
						label: "720P60 高帧率",
						value: "74",
						description: "需登录（配置ck）"
					},
					{
						key: "push.pushVideoQuality:radio-7",
						label: "1080P 高清",
						value: "80",
						description: "需登录（配置ck）"
					},
					{
						key: "push.pushVideoQuality:radio-8",
						label: "1080P+ 高码率",
						value: "112",
						description: "需大会员&视频支持"
					},
					{
						key: "push.pushVideoQuality:radio-9",
						label: "1080P60 高帧率",
						value: "116",
						description: "需大会员&视频支持"
					},
					{
						key: "push.pushVideoQuality:radio-10",
						label: "4K 超清",
						value: "120",
						description: "需大会员&视频支持"
					},
					{
						key: "push.pushVideoQuality:radio-11",
						label: "8K 超高清",
						value: "127",
						description: "需大会员&视频支持"
					}
				]
			},
			{
				key: "push.pushMaxAutoVideoSize",
				type: "number",
				label: "视频动态的视频体积上限（MB）",
				description: "根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 \"自动选择\" 且「作品解析」开启时生效，仅对视频动态有效",
				disabled: $or($not("push.switch"), $not("push.parsedynamic"), $ne("push.pushVideoQuality", "0")),
				color: "warning",
				rules: [{
					min: 1,
					max: 2e4
				}]
			}
		]
	};
});
var cookiesConfigSchema;
var init_cookies_schema = __esmMin(() => {
	cookiesConfigSchema = {
		key: "cookies",
		title: "Cookies 相关",
		subtitle: "建议配置，否则大部分功能无法使用",
		fields: [
			{
				key: "douyin",
				type: "text",
				label: "抖音",
				description: "请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢",
				placeholder: ""
			},
			{
				key: "bilibili",
				type: "text",
				label: "B站",
				description: "请输入你的B站Cookies，不输入部分功能将受限噢",
				placeholder: ""
			},
			{
				key: "kuaishou",
				type: "text",
				label: "快手",
				description: "请输入你的快手Cookies，不输入则无法使用快手相关功能噢",
				placeholder: ""
			},
			{
				key: "xiaohongshu",
				type: "text",
				label: "小红书",
				description: "请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢",
				placeholder: ""
			}
		]
	};
});
var douyinConfigSchema;
var init_douyin_schema = __esmMin(() => {
	init_schema$1();
	douyinConfigSchema = {
		key: "douyin",
		title: "抖音相关",
		subtitle: "此处为抖音相关的用户偏好设置",
		fields: [
			{
				key: "switch",
				label: "解析开关",
				description: "抖音解析开关，此开关为单独开关"
			},
			{
				key: "tip",
				label: "解析提示",
				description: "抖音解析提示，发送提示信息：\"检测到抖音链接，开始解析\"",
				disabled: $not("switch")
			},
			{
				key: "sendContent",
				label: "解析时发送的内容",
				description: "若什么都不选，可能不会返回任何解析结果",
				orientation: "horizontal",
				disabled: $not("switch"),
				checkbox: [
					{
						key: "sendContent:checkbox:1",
						label: "视频信息",
						value: "info",
						description: "仅解析视频时有效"
					},
					{
						key: "sendContent:checkbox:2",
						label: "评论列表",
						value: "comment"
					},
					{
						key: "sendContent:checkbox:3",
						label: "视频文件",
						value: "video",
						description: "仅对视频作品有效"
					}
				]
			},
			{
				description: "评论详情设置",
				descPosition: 20
			},
			{
				key: "numcomment",
				type: "number",
				label: "评论解析数量",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment"))),
				rules: [{ min: 1 }]
			},
			{
				key: "subCommentLimit",
				type: "number",
				label: "次级评论解析数量",
				description: "次级评论解析数量，当前逻辑不仅无法判断请求的来的评论的嵌套深度，而且「次级评论解析深度」会限制嵌套深度，超过深度的评论会被截断",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment"))),
				rules: [{
					min: 1,
					max: 20
				}]
			},
			{
				key: "subCommentDepth",
				type: "number",
				label: "次级评论解析深度",
				description: "次级评论解析深度",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment"))),
				rules: [{
					min: 1,
					max: 6,
					error: "嵌套深度最高只有 6 层，超过 6 层的评论会被强制截断"
				}]
			},
			{
				key: "commentImageCollection",
				label: "是否收集评论区的图片",
				description: "开启后将收集评论区的图片，以合并转发的形式返回",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment")))
			},
			{
				key: "realCommentCount",
				label: "显示真实评论数量",
				description: "评论图是否显示真实评论数量，关闭则显示解析到的评论数量",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment")))
			},
			{
				description: "渲染与画质设置",
				descPosition: 20
			},
			{
				key: "liveImageMergeMode",
				label: "合辑 Live 图 BGM 合并方式",
				orientation: "horizontal",
				disabled: $not("switch"),
				radio: [{
					key: "liveImageMergeMode:radio-1",
					label: "连续",
					value: "continuous",
					description: "BGM 接续播放，结束后自动循环"
				}, {
					key: "liveImageMergeMode:radio-2",
					label: "独立",
					value: "independent",
					description: "每张图 BGM 从头开始"
				}]
			},
			{
				key: "videoQuality",
				label: "画质偏好",
				description: "解析视频的分辨率偏好。",
				orientation: "horizontal",
				disabled: $not("switch"),
				radio: [
					{
						key: "videoQuality:radio-1",
						label: "自动选择",
						value: "adapt",
						description: "根据「视频体积上限（MB）」自动选择分辨率进行下载"
					},
					{
						key: "videoQuality:radio-2",
						label: "标清 540p",
						value: "540p"
					},
					{
						key: "videoQuality:radio-3",
						label: "高清 720p",
						value: "720p"
					},
					{
						key: "videoQuality:radio-4",
						label: "高清 1080p",
						value: "1080p"
					},
					{
						key: "videoQuality:radio-5",
						label: "超清 2k",
						value: "2k"
					},
					{
						key: "videoQuality:radio-6",
						label: "超清 4k",
						value: "4k"
					}
				]
			},
			{
				key: "maxAutoVideoSize",
				type: "number",
				label: "视频体积上限（MB）",
				description: "根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
				disabled: $or($not("switch"), $ne("videoQuality", "adapt")),
				rules: [{
					min: 1,
					max: 2e4
				}]
			},
			{
				key: "videoInfoMode",
				label: "视频信息返回形式",
				disabled: $not("switch"),
				radio: [{
					key: "videoInfoMode:radio-1",
					label: "图片模式",
					value: "image"
				}, {
					key: "videoInfoMode:radio-2",
					label: "文本模式",
					value: "text"
				}]
			},
			{
				key: "displayContent",
				label: "视频信息的内容",
				description: "若什么都不选，则不会返回任何视频相关信息",
				orientation: "horizontal",
				disabled: $or($not("switch"), $ne("videoInfoMode", "text")),
				checkbox: [
					{
						key: "displayContent:checkbox:1",
						label: "封面",
						value: "cover"
					},
					{
						key: "displayContent:checkbox:2",
						label: "标题",
						value: "title"
					},
					{
						key: "displayContent:checkbox:3",
						label: "作者",
						value: "author"
					},
					{
						key: "displayContent:checkbox:4",
						label: "视频统计信息",
						value: "stats"
					}
				]
			},
			{
				description: "权限设置",
				descPosition: 20
			},
			{
				key: "loginPerm",
				label: "谁可以触发扫码登录",
				description: "修改后需重启",
				orientation: "horizontal",
				radio: [
					{
						key: "loginPerm:radio-1",
						label: "所有人",
						value: "all"
					},
					{
						key: "loginPerm:radio-2",
						label: "管理员",
						value: "admin"
					},
					{
						key: "loginPerm:radio-3",
						label: "主人",
						value: "master"
					},
					{
						key: "loginPerm:radio-4",
						label: "群主",
						value: "group.owner"
					},
					{
						key: "loginPerm:radio-5",
						label: "群管理员",
						value: "group.admin"
					}
				]
			},
			{
				description: "弹幕烧录相关",
				descPosition: 20
			},
			{
				key: "burnDanmaku",
				label: "弹幕烧录",
				description: "将弹幕硬编码到视频画面中。开启后视频需要重新编码，耗时较长",
				disabled: $not("switch")
			},
			{
				key: "danmakuArea",
				label: "弹幕显示区域",
				description: "限制弹幕范围，避免遮挡视频主体",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "danmakuArea:radio-1",
						label: "1/4 屏",
						value: "0.25"
					},
					{
						key: "danmakuArea:radio-2",
						label: "半屏",
						value: "0.5"
					},
					{
						key: "danmakuArea:radio-3",
						label: "3/4 屏",
						value: "0.75"
					},
					{
						key: "danmakuArea:radio-4",
						label: "全屏",
						value: "1"
					}
				]
			},
			{
				key: "danmakuFontSize",
				label: "弹幕字号",
				description: "弹幕文字大小",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "danmakuFontSize:radio-1",
						label: "小",
						value: "small"
					},
					{
						key: "danmakuFontSize:radio-2",
						label: "中",
						value: "medium"
					},
					{
						key: "danmakuFontSize:radio-3",
						label: "大",
						value: "large"
					}
				]
			},
			{
				key: "danmakuOpacity",
				type: "number",
				label: "弹幕透明度",
				description: "0为完全透明，100为完全不透明，推荐70",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				rules: [{
					min: 0,
					max: 100
				}]
			},
			{
				key: "verticalMode",
				label: "竖屏适配",
				description: "针对横屏视频，模拟手机端竖屏观看体验，视频居中显示，上下黑边区域用于展示弹幕",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "verticalMode:radio-1",
						label: "关闭",
						value: "off",
						description: "保持原始比例，不做转换"
					},
					{
						key: "verticalMode:radio-2",
						label: "智能",
						value: "standard",
						description: "仅对宽高比 ≥1.7 的横屏视频生效"
					},
					{
						key: "verticalMode:radio-3",
						label: "强制 9:16",
						value: "force",
						description: "所有视频统一转为竖屏"
					}
				]
			},
			{
				key: "videoCodec",
				label: "视频编码格式",
				description: "烧录弹幕后的视频编码格式",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not("burnDanmaku")),
				radio: [
					{
						key: "videoCodec:radio-1",
						label: "H.264",
						value: "h264"
					},
					{
						key: "videoCodec:radio-2",
						label: "H.265",
						value: "h265"
					},
					{
						key: "videoCodec:radio-3",
						label: "AV1",
						value: "av1"
					}
				]
			},
			{
				description: "抖音推送相关",
				descPosition: 20
			},
			{
				key: "push.switch",
				label: "推送开关",
				description: "推送开关，修改后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表",
				color: "warning"
			},
			{
				key: "push.permission",
				label: "谁可以设置推送",
				description: "修改后需重启",
				orientation: "horizontal",
				disabled: $not("push.switch"),
				color: "warning",
				radio: [
					{
						key: "push.permission:radio-1",
						label: "所有人",
						value: "all"
					},
					{
						key: "push.permission:radio-2",
						label: "管理员",
						value: "admin"
					},
					{
						key: "push.permission:radio-3",
						label: "主人",
						value: "master"
					},
					{
						key: "push.permission:radio-4",
						label: "群主",
						value: "group.owner"
					},
					{
						key: "push.permission:radio-5",
						label: "群管理员",
						value: "group.admin"
					}
				]
			},
			{
				key: "push.cron",
				type: "text",
				label: "定时任务表达式",
				description: "定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）",
				color: "warning",
				disabled: $not("push.switch")
			},
			{
				key: "push.parsedynamic",
				label: "作品解析",
				description: "触发推送时是否一同解析该作品",
				color: "warning",
				disabled: $not("push.switch")
			},
			{
				key: "push.shareType",
				label: "推送图二维码的类型",
				orientation: "horizontal",
				color: "warning",
				disabled: $not("push.switch"),
				radio: [{
					key: "push.shareType:radio-1",
					label: "网页链接",
					value: "web",
					description: "识别后访问抖音官网对应的作品地址"
				}, {
					key: "push.shareType:radio-2",
					label: "下载链接",
					value: "download",
					description: "识别后访问无水印作品下载地址"
				}]
			},
			{
				key: "push.pushVideoQuality",
				label: "画质偏好",
				description: "推送解析时解析视频的分辨率偏好。",
				orientation: "horizontal",
				disabled: $not("push.switch"),
				color: "warning",
				radio: [
					{
						key: "push.pushVideoQuality:radio-1",
						label: "自动选择",
						value: "adapt",
						description: "根据「视频体积上限（MB）」自动选择分辨率进行下载"
					},
					{
						key: "push.pushVideoQuality:radio-2",
						label: "标清 540p",
						value: "540p"
					},
					{
						key: "push.pushVideoQuality:radio-3",
						label: "高清 720p",
						value: "720p"
					},
					{
						key: "push.pushVideoQuality:radio-4",
						label: "高清 1080p",
						value: "1080p"
					},
					{
						key: "push.pushVideoQuality:radio-5",
						label: "超清 2k",
						value: "2k"
					},
					{
						key: "push.pushVideoQuality:radio-6",
						label: "超清 4k",
						value: "4k"
					}
				]
			},
			{
				key: "push.pushMaxAutoVideoSize",
				type: "number",
				label: "视频体积上限（MB）",
				description: "推送解析时根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
				disabled: $or($not("push.switch"), $ne("push.pushVideoQuality", "adapt")),
				color: "warning",
				rules: [{
					min: 1,
					max: 2e4
				}]
			}
		]
	};
});
var kuaishouConfigSchema;
var init_kuaishou_schema = __esmMin(() => {
	init_schema$1();
	kuaishouConfigSchema = {
		key: "kuaishou",
		title: "快手相关",
		subtitle: "此处为快手相关的用户偏好设置",
		fields: [
			{
				key: "switch",
				label: "解析开关",
				description: "快手解析开关，此开关为单独开关"
			},
			{
				key: "tip",
				label: "解析提示",
				description: "快手解析提示，发送提示信息：\"检测到快手链接，开始解析\"",
				disabled: $not("switch")
			},
			{
				description: "评论详情设置",
				descPosition: 20
			},
			{
				key: "comment",
				label: "评论解析",
				description: "快手评论解析，开启后可发送快手作品评论图",
				disabled: $not("switch")
			},
			{
				key: "numcomment",
				type: "number",
				label: "评论解析数量",
				disabled: $or($not("switch"), $not("comment")),
				rules: [{ min: 1 }]
			}
		]
	};
});
var requestConfigSchema;
var init_request_schema = __esmMin(() => {
	init_schema$1();
	requestConfigSchema = {
		key: "request",
		title: "解析库请求配置相关",
		subtitle: "此处用于管理解析库的网络请求配置",
		fields: [
			{
				key: "timeout",
				type: "number",
				label: "请求超时时间",
				description: "网络请求的超时时间，单位：毫秒",
				rules: [{
					min: 1e3,
					max: 3e5,
					error: "请输入一个范围在 1000 到 300000 之间的数字"
				}]
			},
			{
				key: "User-Agent",
				type: "text",
				label: "User-Agent",
				description: "请求头中的User-Agent字段，用于标识客户端类型",
				placeholder: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
			},
			{
				description: "代理配置（可选）",
				descPosition: 20
			},
			{
				key: "proxy.switch",
				label: "代理开关",
				description: "开启后需要配置「代理主机」「代理端口」"
			},
			{
				key: "proxy.host",
				type: "text",
				label: "代理主机",
				description: "代理服务器的主机地址，如：127.0.0.1",
				placeholder: "127.0.0.1",
				disabled: $not("proxy.switch")
			},
			{
				key: "proxy.port",
				type: "number",
				label: "代理端口",
				description: "代理服务器的端口号",
				disabled: $not("proxy.switch"),
				rules: [{
					min: 1,
					max: 65535,
					error: "请输入一个范围在 1 到 65535 之间的数字"
				}]
			},
			{
				key: "proxy.protocol",
				label: "代理协议",
				orientation: "horizontal",
				disabled: $not("proxy.switch"),
				radio: [{
					key: "proxy.protocol:radio-1",
					label: "HTTP",
					value: "http"
				}, {
					key: "proxy.protocol:radio-2",
					label: "HTTPS",
					value: "https"
				}]
			},
			{
				key: "proxy.auth.username",
				type: "text",
				label: "代理用户名",
				description: "代理服务器的认证用户名（如果需要）",
				disabled: $not("proxy.switch")
			},
			{
				key: "proxy.auth.password",
				type: "password",
				label: "代理密码",
				description: "代理服务器的认证密码（如果需要）",
				disabled: $not("proxy.switch")
			}
		]
	};
});
var uploadConfigSchema;
var init_upload_schema = __esmMin(() => {
	init_schema$1();
	uploadConfigSchema = {
		key: "upload",
		title: "上传和下载相关",
		subtitle: "此处为视频上传和下载相关的用户偏好设置",
		fields: [
			{
				description: "发送方式配置",
				descPosition: 20
			},
			{
				key: "sendbase64",
				label: "转换Base64",
				description: "发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启。与「群文件上传」互斥。",
				disabled: $var("usegroupfile")
			},
			{
				key: "usegroupfile",
				label: "群文件上传",
				description: "使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」。与「转换Base64」互斥",
				disabled: $var("sendbase64")
			},
			{
				key: "groupfilevalue",
				type: "number",
				label: "群文件上传阈值",
				description: "当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效",
				disabled: $or($not("usegroupfile"), $var("sendbase64")),
				rules: [{ min: 1 }]
			},
			{
				description: "上传拦截配置",
				descPosition: 20
			},
			{
				key: "usefilelimit",
				label: "视频上传拦截",
				description: "开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。"
			},
			{
				key: "filelimit",
				type: "number",
				label: "视频拦截阈值",
				description: "视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。",
				disabled: $not("usefilelimit"),
				rules: [{ min: 1 }]
			},
			{
				description: "视频压缩配置",
				descPosition: 20
			},
			{
				key: "compress",
				label: "压缩视频",
				description: "开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」"
			},
			{
				key: "compresstrigger",
				type: "number",
				label: "压缩触发阈值",
				description: "触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效",
				disabled: $not("compress"),
				rules: [{ min: 1 }]
			},
			{
				key: "compressvalue",
				type: "number",
				label: "压缩后的值",
				description: "单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效",
				disabled: $not("compress"),
				rules: [{ min: 1 }]
			},
			{
				description: "下载限速配置",
				descPosition: 20
			},
			{
				key: "downloadThrottle",
				label: "下载限速",
				description: "开启后会限制下载速度，避免触发服务器风控导致连接被重置（ECONNRESET）。如果下载时经常报错\"连接被重置\"，建议开启"
			},
			{
				key: "downloadMaxSpeed",
				type: "number",
				label: "最大下载速度",
				description: "单位：MB/s，建议设置为 5-20 之间。设置过高可能触发风控，设置过低会影响下载体验",
				disabled: $not("downloadThrottle"),
				rules: [{
					min: 1,
					max: 1e3,
					error: "请输入一个范围在 1 到 1000 之间的数字"
				}]
			},
			{
				key: "downloadAutoReduce",
				label: "断流自动降速",
				description: "当检测到连接被重置时自动降低下载速度，每次断流后速度会降低到当前的 60%",
				disabled: $not("downloadThrottle")
			},
			{
				key: "downloadMinSpeed",
				type: "number",
				label: "最低下载速度",
				description: "单位：MB/s，自动降速时不会低于此值",
				disabled: $or($not("downloadThrottle"), $not("downloadAutoReduce")),
				rules: [{
					min: .1,
					max: 100,
					error: "请输入一个范围在 0.1 到 100 之间的数字"
				}]
			}
		]
	};
});
var xiaohongshuConfigSchema;
var init_xiaohongshu_schema = __esmMin(() => {
	init_schema$1();
	xiaohongshuConfigSchema = {
		key: "xiaohongshu",
		title: "小红书相关",
		subtitle: "此处为小红书相关的用户偏好设置",
		fields: [
			{
				key: "switch",
				label: "解析开关",
				description: "小红书解析开关，此开关为单独开关"
			},
			{
				key: "tip",
				label: "解析提示",
				description: "小红书解析提示，发送提示信息：\"检测到小红书链接，开始解析\"",
				disabled: $not("switch")
			},
			{
				key: "sendContent",
				label: "解析时发送的内容",
				description: "若什么都不选，可能不会返回任何解析结果",
				orientation: "horizontal",
				disabled: $not("switch"),
				checkbox: [
					{
						key: "sendContent:checkbox:1",
						label: "笔记信息",
						value: "info"
					},
					{
						key: "sendContent:checkbox:2",
						label: "评论列表",
						value: "comment"
					},
					{
						key: "sendContent:checkbox:3",
						label: "笔记图片",
						value: "image"
					},
					{
						key: "sendContent:checkbox:4",
						label: "视频文件",
						value: "video",
						description: "仅对视频笔记有效"
					}
				]
			},
			{
				key: "numcomment",
				type: "number",
				label: "评论解析数量",
				disabled: $or($not("switch"), $not($includes("sendContent", "comment"))),
				rules: [{ min: 1 }]
			},
			{
				description: "渲染与画质设置",
				descPosition: 20
			},
			{
				key: "videoQuality",
				label: "画质偏好",
				description: "解析视频的分辨率偏好。",
				orientation: "horizontal",
				disabled: $or($not("switch"), $not($includes("sendContent", "video"))),
				radio: [
					{
						key: "videoQuality:radio-1",
						label: "自动选择",
						value: "adapt",
						description: "根据「视频体积上限（MB）」自动选择分辨率进行下载"
					},
					{
						key: "videoQuality:radio-2",
						label: "标清 540p",
						value: "540p"
					},
					{
						key: "videoQuality:radio-3",
						label: "高清 720p",
						value: "720p"
					},
					{
						key: "videoQuality:radio-4",
						label: "高清 1080p",
						value: "1080p"
					},
					{
						key: "videoQuality:radio-5",
						label: "超清 2k",
						value: "2k"
					},
					{
						key: "videoQuality:radio-6",
						label: "超清 4k",
						value: "4k"
					}
				]
			},
			{
				key: "maxAutoVideoSize",
				type: "number",
				label: "视频体积上限（MB）",
				description: "根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
				disabled: $or($not("switch"), $not($includes("sendContent", "video")), $ne("videoQuality", "adapt")),
				rules: [{
					min: 1,
					max: 2e4
				}]
			}
		]
	};
});
function getConfigSchema() {
	return { modules: [
		{
			key: "cookies",
			label: "Cookies 相关",
			sections: [cookiesConfigSchema]
		},
		{
			key: "app",
			label: "插件应用相关",
			sections: [appConfigSchema]
		},
		{
			key: "douyin",
			label: "抖音相关",
			sections: [douyinConfigSchema]
		},
		{
			key: "bilibili",
			label: "B站相关",
			sections: [bilibiliConfigSchema]
		},
		{
			key: "kuaishou",
			label: "快手相关",
			sections: [kuaishouConfigSchema]
		},
		{
			key: "xiaohongshu",
			label: "小红书相关",
			sections: [xiaohongshuConfigSchema]
		},
		{
			key: "upload",
			label: "视频文件上传相关",
			sections: [uploadConfigSchema]
		},
		{
			key: "request",
			label: "解析库请求配置相关",
			sections: [requestConfigSchema]
		}
	] };
}
function getModuleSchema(moduleKey) {
	return allSectionSchemas[moduleKey];
}
var allSectionSchemas;
var init_config = __esmMin(() => {
	init_app_schema();
	init_bilibili_schema();
	init_douyin_schema();
	init_kuaishou_schema();
	init_request_schema();
	init_schema$1();
	init_upload_schema();
	init_xiaohongshu_schema();
	init_cookies_schema();
	allSectionSchemas = {
		cookies: cookiesConfigSchema,
		app: appConfigSchema,
		douyin: douyinConfigSchema,
		bilibili: bilibiliConfigSchema,
		kuaishou: kuaishouConfigSchema,
		xiaohongshu: xiaohongshuConfigSchema,
		upload: uploadConfigSchema,
		request: requestConfigSchema
	};
});
var getFullSchema, getModuleSchemaApi;
var init_schema = __esmMin(() => {
	init_config();
	getFullSchema = async (_req, res) => {
		try {
			const schema = getConfigSchema();
			res.json({
				success: true,
				message: "获取配置 Schema 成功",
				data: schema
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `获取配置 Schema 失败: ${error.message}`,
				data: null
			});
		}
	};
	getModuleSchemaApi = async (req, res) => {
		try {
			const { module } = req.params;
			const schema = getModuleSchema(module);
			if (!schema) return res.status(404).json({
				success: false,
				message: `配置模块 "${module}" 的 Schema 不存在`,
				data: null
			});
			res.json({
				success: true,
				message: "获取配置 Schema 成功",
				data: schema
			});
		} catch (error) {
			res.status(500).json({
				success: false,
				message: `获取配置 Schema 失败: ${error.message}`,
				data: null
			});
		}
	};
});
var apiRouter, authMiddlewares;
var init_api = __esmMin(async () => {
	await init_api$2();
	await init_api$1();
	await init_auth();
	await init_bots();
	await init_config$1();
	await init_groups();
	await init_link();
	await init_schema();
	init_bots();
	init_config$1();
	init_groups();
	init_link();
	init_schema();
	apiRouter = express.Router();
	authMiddlewares = [authMiddleware, signatureVerificationMiddleware];
	apiRouter.get("/bots", ...authMiddlewares, getBots);
	apiRouter.get("/bots/:botId/groups", ...authMiddlewares, getBotGroups);
	apiRouter.get("/groups", ...authMiddlewares, getGroups);
	apiRouter.post("/groups/batch", ...authMiddlewares, getGroupsBatch);
	apiRouter.post("/link/resolve", ...authMiddlewares, resolveLink);
	apiRouter.get("/config", ...authMiddlewares, getAllConfig);
	apiRouter.put("/config", ...authMiddlewares, updateAllConfig);
	apiRouter.post("/config", ...authMiddlewares, updateAllConfig);
	apiRouter.get("/config/:module", ...authMiddlewares, getConfigModule);
	apiRouter.put("/config/:module", ...authMiddlewares, updateConfigModule);
	apiRouter.post("/config/:module", ...authMiddlewares, updateConfigModule);
	apiRouter.patch("/config/:module", ...authMiddlewares, patchConfigItem);
	apiRouter.get("/schema", ...authMiddlewares, getFullSchema);
	apiRouter.get("/schema/:module", ...authMiddlewares, getModuleSchemaApi);
	apiRouter.use("/platforms/douyin", ...authMiddlewares, router$1);
	apiRouter.use("/platforms/bilibili", ...authMiddlewares, router);
});
var videoStreamRouter, getVideoRouter;
var init_router = __esmMin(async () => {
	await init_utils$1();
	videoStreamRouter = (req, res) => {
		const filename = req.params.filename;
		const videoPath = Common.validateVideoRequest(filename, res);
		if (!videoPath) return;
		try {
			const fileSize = fs.statSync(videoPath).size;
			const range$1 = req.headers.range;
			if (range$1) {
				const parts = range$1.replace(/bytes=/, "").split("-");
				const start = parseInt(parts[0], 10);
				const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
				if (start >= fileSize || end >= fileSize || start > end) {
					res.status(416).send("Requested range not satisfiable");
					return;
				}
				const chunksize = end - start + 1;
				const file = fs.createReadStream(videoPath, {
					start,
					end
				});
				const head = {
					"Content-Range": `bytes ${start}-${end}/${fileSize}`,
					"Accept-Ranges": "bytes",
					"Content-Length": chunksize,
					"Content-Type": "video/mp4"
				};
				res.writeHead(206, head);
				file.pipe(res);
				file.on("error", (err) => {
					logger.error(`读取视频文件流时出错 (Range: ${start}-${end}): ${err.message}`);
					if (!res.writableEnded) res.end();
				});
			} else {
				const head = {
					"Content-Length": fileSize,
					"Content-Type": "video/mp4",
					"Accept-Ranges": "bytes"
				};
				res.writeHead(200, head);
				const file = fs.createReadStream(videoPath);
				file.pipe(res);
				file.on("error", (err) => {
					logger.error(`读取视频文件流时出错 (Full): ${err.message}`);
					if (!res.headersSent) try {
						createNotFoundResponse(res, "读取视频文件时出错");
					} catch (e) {
						logger.error("发送读取错误响应失败:", e);
						if (!res.writableEnded) res.end();
					}
					else if (!res.writableEnded) res.end();
				});
			}
		} catch (error) {
			if (error.code === "ENOENT") {
				if (!res.headersSent) createNotFoundResponse(res, "视频文件未找到");
				else if (!res.writableEnded) res.end();
			} else {
				logger.error(`处理视频数据请求时发生错误: ${error.message}`);
				if (!res.headersSent) createNotFoundResponse(res, "服务器内部错误");
				else if (!res.writableEnded) res.end();
			}
		}
	};
	getVideoRouter = (req, res) => {
		const filename = req.params.filename;
		if (!Common.validateVideoRequest(filename, res)) return;
		const videoDataUrl = `/api/kkk/stream/${encodeURIComponent(filename)}`;
		const resPath = path.join(Root.pluginPath, "/resources") + "/".replace(/\\/g, "/");
		const htmlContent = template(path.join(resPath, "template", "videoView", "index.html"), {
			videoDataUrl,
			filename
		});
		res.setHeader("Content-Type", "text/html; charset=utf-8");
		res.send(htmlContent);
	};
});
var import_lib, import_dist, server, proxyOptions, app$1;
var init_Register = __esmMin(async () => {
	await init_src();
	import_lib = __toESM(require_lib(), 1);
	import_dist = __toESM(require_dist(), 1);
	await init_Config();
	await init_api();
	await init_router();
	server = express();
	proxyOptions = {
		target: "https://developer.huawei.com",
		changeOrigin: true
	};
	server.use(import_lib.default());
	server.use("/", import_dist.createProxyMiddleware(proxyOptions));
	if (process.env.NODE_ENV !== "test") checkPort(3780).then((isOpen) => {
		if (isOpen) {
			const s = server.listen(3780);
			s.on("error", (err) => {
				logger.error(`[karin-plugin-kkk] 字体代理服务器启动失败: ${err.message}`);
			});
			return s;
		}
		return logger.error("端口 3780 被占用，字体代理服务器将不会启动。");
	});
	app$1 = express.Router();
	app$1.use(express.json());
	app$1.use(express.urlencoded({ extended: true }));
	if (Config.app.APIServer && Config.app.APIServerMount) {
		app$1.use("/amagi/api/bilibili", createBilibiliRoutes(Config.cookies.bilibili));
		app$1.use("/amagi/api/douyin", createDouyinRoutes(Config.cookies.douyin));
	} else if (Config.app.APIServer) new Client({ cookies: {
		bilibili: Config.cookies.bilibili,
		douyin: Config.cookies.douyin
	} }).startServer(Config.app.APIServerPort);
	app$1.get("/stream/:filename", videoStreamRouter);
	app$1.get("/video/:filename", getVideoRouter);
	app$1.use("/v1", apiRouter);
	app.use("/api/kkk", app$1);
});
var strategies, registerErrorStrategy, getStrategies;
var init_strategy = __esmMin(() => {
	strategies = [];
	registerErrorStrategy = (strategy) => {
		strategies.push(strategy);
		logger.debug(`[ErrorHandler] 注册策略: ${strategy.name}`);
	};
	getStrategies = () => strategies;
});
var renderErrorImage;
var init_render = __esmMin(async () => {
	await init_src();
	await init_module();
	renderErrorImage = async (ctx, opts = {}) => {
		const { error, options, logs: logs$1, event, buildMetadata, adapterInfo } = ctx;
		return Render("other/handlerError", {
			type: "business_error",
			platform: opts.platform || "system",
			error: {
				message: opts.errorMessage || error.message,
				name: opts.errorName || error.name,
				stack: opts.stack || util.inspect(error, {
					depth: 10,
					colors: true,
					breakLength: 120,
					showHidden: true
				}).replace(/\x1b\[90m/g, "\x1B[90;2m").replace(/\x1b\[32m/g, "\x1B[31m"),
				businessName: options.businessName
			},
			method: options.businessName,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			logs: logs$1?.slice().reverse(),
			triggerCommand: event?.msg || "未知命令或处于非消息环境",
			frameworkVersion: Root.karinVersion,
			pluginVersion: Root.pluginVersion,
			buildTime: buildMetadata?.buildTime ? formatBuildTime(buildMetadata.buildTime) : void 0,
			commitHash: buildMetadata?.commitHash,
			adapterInfo,
			amagiVersion: Client.version,
			isVerification: opts.isVerification,
			verificationUrl: opts.verificationUrl,
			share_url: opts.share_url
		});
	};
});
var parseLogsToStructured, statBotId, isPushTask, getPushTaskBotId;
var init_utils = __esmMin(() => {
	init_Config();
	parseLogsToStructured = (logs$1) => {
		const logRegex = /\[(\d{2}:\d{2}:\d{2}\.\d{3})\]\[([A-Z]{4})\]\s(.+)/s;
		return logs$1.map((log) => {
			const match = log.match(logRegex);
			if (match) return {
				timestamp: match[1],
				level: match[2],
				message: match[3],
				raw: log
			};
			return {
				timestamp: "",
				level: "INFO",
				message: log,
				raw: log
			};
		}).filter((log) => log.level !== "TRAC");
	};
	statBotId = (pushlist) => {
		const douyin$2 = pushlist.douyin?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
		const bilibili$2 = pushlist.bilibili?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
		return {
			douyin: { botId: douyin$2 },
			bilibili: { botId: bilibili$2 }
		};
	};
	isPushTask = (event, businessName) => event && Object.keys(event).length === 0 || businessName.includes("推送");
	getPushTaskBotId = () => {
		const ids = statBotId(Config.pushlist);
		return ids.douyin.botId || ids.bilibili.botId;
	};
});
var sendErrorToTrigger, sendErrorToMaster, sendErrorToAllMasters, buildErrorPrefix;
var init_sender = __esmMin(() => {
	init_Config();
	init_utils();
	sendErrorToTrigger = async (ctx, img$2) => {
		const { event } = ctx;
		if (!event) return;
		if (!Config.app.errorLogSendTo.some((item) => item === "trigger")) return;
		try {
			await event.reply(img$2);
		} catch (err) {
			logger.error(`[ErrorHandler] 发送错误消息给用户失败: ${err}`);
		}
	};
	sendErrorToMaster = async (ctx, img$2, customPrefix) => {
		const { options, event } = ctx;
		if (!Config.app.errorLogSendTo.some((item) => item === "master")) return;
		const list = config.master();
		const master = list[0] === "console" ? list[1] : list[0];
		const isPush = isPushTask(event, options.businessName);
		const botId = isPush ? getPushTaskBotId() : event?.bot?.selfId;
		if (!botId || !master) return;
		try {
			const prefix$1 = customPrefix || await buildErrorPrefix(ctx, isPush, botId);
			await karin$1.sendMaster(botId, master, [segment.text(prefix$1), ...img$2]);
		} catch (err) {
			logger.error(`[ErrorHandler] 发送错误消息给主人失败: ${err}`);
		}
	};
	sendErrorToAllMasters = async (ctx, img$2, customPrefix) => {
		const { options, event } = ctx;
		if (!Config.app.errorLogSendTo.some((item) => item === "allMasters")) return;
		const masters = config.master().filter((m) => m !== "console");
		if (masters.length === 0) return;
		const isPush = isPushTask(event, options.businessName);
		const botId = isPush ? getPushTaskBotId() : event?.bot?.selfId;
		if (!botId) return;
		const prefix$1 = customPrefix || await buildErrorPrefix(ctx, isPush, botId);
		const notifiedSet = /* @__PURE__ */ new Set();
		for (const master of masters) {
			const key = `${botId}:${master}`;
			if (notifiedSet.has(key)) continue;
			try {
				await karin$1.sendMaster(botId, master, [segment.text(prefix$1), ...img$2]);
				notifiedSet.add(key);
				logger.debug(`[ErrorHandler] 已发送错误消息给主人: ${master} (via ${botId})`);
			} catch (err) {
				logger.error(`[ErrorHandler] 发送错误消息给主人 (${master}) 失败: ${err}`);
			}
		}
	};
	buildErrorPrefix = async (ctx, isPush, botId) => {
		const { options, event } = ctx;
		if (isPush) return `${options.businessName} 任务执行出错！\n请即时解决以消除警告`;
		const groupId = event && "groupId" in event ? event.groupId : "";
		return `群：${(await karin$1.getBot(botId)?.getGroupInfo(groupId))?.groupName || "未知"}(${groupId})\n${options.businessName} 任务执行出错！\n请即时解决以消除警告`;
	};
});
var handleBusinessError, wrapWithErrorHandler;
var init_handler = __esmMin(async () => {
	await init_module();
	await init_EmojiReaction();
	await init_render();
	await init_sender();
	await init_strategy();
	await init_utils();
	handleBusinessError = async (error, options, logs$1, event) => {
		try {
			logger.debug(`[ErrorHandler] 开始处理业务错误: ${options.businessName}`);
			const ctx = {
				error,
				options,
				logs: logs$1,
				event,
				buildMetadata: getBuildMetadata(),
				adapterInfo: event?.bot?.adapter ? {
					name: event.bot.adapter.name,
					version: event.bot.adapter.version,
					platform: event.bot.adapter.platform,
					protocol: event.bot.adapter.protocol,
					standard: event.bot.adapter.standard
				} : void 0
			};
			for (const strategy of getStrategies()) if (strategy.match(ctx)) {
				logger.debug(`[ErrorHandler] 匹配策略: ${strategy.name}`);
				if (await strategy.handle(ctx) === "handled") return "handled";
			}
			const img$2 = await renderErrorImage(ctx);
			await sendErrorToTrigger(ctx, img$2);
			await sendErrorToMaster(ctx, img$2);
			await sendErrorToAllMasters(ctx, img$2);
			if (options.customErrorHandler) try {
				await options.customErrorHandler(error, logs$1);
			} catch (err) {
				logger.error(`[ErrorHandler] 自定义错误处理失败: ${err}`);
			}
		} catch (handlerError) {
			logger.error(`[ErrorHandler] 错误处理器本身发生错误: ${handlerError}`);
			throw handlerError;
		}
	};
	wrapWithErrorHandler = (fn, options) => async (e, next) => {
		const emojiManager = e ? new EmojiReactionManager(e) : void 0;
		if (emojiManager) {
			await emojiManager.add("EYES");
			setTimeout(() => {
				emojiManager.add("PROCESSING").catch(() => {});
			}, 1500);
		}
		const ctx = logger.runContext(async () => fn(e, next));
		try {
			const result = await ctx.run();
			if (emojiManager) setTimeout(() => {
				emojiManager.replace("PROCESSING", "SUCCESS").catch(() => {});
			}, 1500);
			return result;
		} catch (error) {
			if (emojiManager) {
				await emojiManager.clearAll();
				await emojiManager.add("ERROR");
			}
			await new Promise((resolve$1) => setTimeout(resolve$1, 100));
			if (await handleBusinessError(error, options, parseLogsToStructured(ctx.logs()), e) === "handled") return void 0;
			throw error;
		}
	};
});
var init_ErrorHandler = __esmMin(async () => {
	await init_strategy();
	await init_render();
	await init_sender();
	await init_handler();
	await init_utils();
});
var bilibiliRiskControlStrategy;
var init_riskControl = __esmMin(async () => {
	await init_amagiClient();
	await init_ErrorHandler();
	bilibiliRiskControlStrategy = {
		name: "BilibiliRiskControl",
		match: (ctx) => {
			const { error, event } = ctx;
			return error instanceof AmagiError && error.code === -352 && !!error.data?.data?.v_voucher && !!event;
		},
		async handle(ctx) {
			const { error, event } = ctx;
			if (!event) return "continue";
			const amagiError = error;
			logger.info("[BilibiliRiskControl] 检测到B站风控(-352)，开始申请验证码...");
			const verification = await bilibiliFetcher.requestCaptchaFromVoucher({
				v_voucher: amagiError.data.data.v_voucher,
				typeMode: "strict"
			});
			if (!verification.data?.data?.geetest) {
				logger.error("[BilibiliRiskControl] 申请验证码失败");
				return "continue";
			}
			const geetest = verification.data.data.geetest;
			const token = verification.data.data.token;
			const verifyUrl = `https://karin-plugin-kkk-docs.vercel.app/geetest?v=3&gt=${geetest.gt}&challenge=${geetest.challenge}`;
			const img$2 = await renderErrorImage(ctx, {
				platform: "bilibili",
				errorName: "BilibiliRiskControl",
				errorMessage: "B站风控验证",
				stack: util.inspect(error, {
					depth: 1,
					colors: true
				}).replace(/\x1b\[90m/g, "\x1B[90;2m").replace(/\x1b\[32m/g, "\x1B[31m"),
				isVerification: true,
				verificationUrl: verifyUrl,
				share_url: verifyUrl
			});
			await event.reply([segment.text("检测到B站风控，请在「120 秒内」扫描二维码完成验证后发送验证结果\n"), ...img$2]);
			await sendErrorToMaster(ctx, img$2);
			await sendErrorToAllMasters(ctx, img$2);
			const resultCtx = await karin$1.ctx(event);
			const params = new URLSearchParams(resultCtx.msg);
			const validate = params.get("validate");
			const seccode = params.get("seccode");
			if (!validate || !seccode) {
				event.reply("验证参数不完整，请确保包含 validate 和 seccode");
				return "handled";
			}
			try {
				const verifyResult = await bilibiliFetcher.validateCaptchaResult({
					challenge: geetest.challenge,
					token,
					validate,
					seccode,
					typeMode: "strict"
				});
				if (verifyResult.success && verifyResult.data?.data?.grisk_id) {
					logger.info(`[BilibiliRiskControl] 验证成功，grisk_id: ${verifyResult.data.data.grisk_id}`);
					event.reply("✅ 验证成功！请重新发送命令");
					return "handled";
				}
				event.reply("❌ 验证失败，请重试");
			} catch (err) {
				logger.error(`[BilibiliRiskControl] 验证请求失败: ${err}`);
				if (err instanceof AmagiError) {
					if (err.code === -111) {
						event.reply("❌ 验证失败，建议使用「#B站登录」重新配置 ck 以绕过风控");
						return "handled";
					}
					event.reply(`❌ 验证失败: ${err.rawError?.errorDescription}`);
				} else event.reply(`❌ 验证失败: ${err.message}`);
			}
			return "handled";
		}
	};
	registerErrorStrategy(bilibiliRiskControlStrategy);
});
var setup_exports = {};
var initAllDatabases;
var init_setup = __esmMin(async () => {
	await init_Register();
	await init_riskControl();
	await init_module();
	({initAllDatabases: initAllDatabases} = await init_db().then(() => db_exports));
	await initAllDatabases().catch((err) => {
		logger.error(`[karin-plugin-kkk] 数据库初始化失败: ${err.message}`);
	});
	mkdirSync(`${karinPathBase}/${Root.pluginName}/data`);
	mkdirSync(Common.tempDri.images);
	mkdirSync(Common.tempDri.video);
	logger.info(`${logger.violet(`[插件:v${Root.pluginVersion}]`)} ${logger.green(Root.pluginName)} 初始化完成~`);
});
await init_module();
await init_semver();
var requireVersion = "1.14.4";
if (process.env.NODE_ENV !== "development" && isSemverGreater(requireVersion, Root.karinVersion)) {
	const msg = `[karin-plugin-kkk] 插件构建时的 karin 版本 (${requireVersion}) 高于当前运行版本 (${Root.karinVersion})，可能会出现兼容性问题！`;
	logger.warn(msg);
	const notifiedSet = /* @__PURE__ */ new Set();
	karin$1.on(BOT_CONNECT, async (bot) => {
		const botId = bot.selfId;
		if (botId === "console") return;
		await new Promise((resolve$1) => setTimeout(resolve$1, 2e3));
		const masters = config.master();
		logger.info(`[karin-plugin-kkk] 监测到 Bot 连接: ${botId}, 准备发送版本警告`);
		let warningImage = null;
		try {
			const { Render: Render$1 } = await init_Render().then(() => Render_exports);
			warningImage = await Render$1("other/version_warning", {
				requireVersion,
				currentVersion: Root.karinVersion
			});
		} catch (error) {
			logger.error(`[karin-plugin-kkk] 生成版本警告图片失败: ${error}`);
		}
		for (const master of masters) {
			if (master === "console") continue;
			const key = `${botId}:${master}`;
			if (notifiedSet.has(key)) continue;
			try {
				const elements = [];
				if (warningImage) elements.push(...warningImage);
				await karin$1.sendMaster(botId, master, elements);
				notifiedSet.add(key);
				logger.info(`[karin-plugin-kkk] 已发送版本警告给主人: ${master} (via ${botId})`);
			} catch (error) {
				logger.error(`[karin-plugin-kkk] 发送版本警告给主人 (${master}) 失败: ${error}`);
			}
		}
	});
}
await init_setup().then(() => setup_exports);
function getNestedValue(obj, path$1) {
	if (!obj) return void 0;
	const keys = path$1.split(".");
	let value = obj;
	for (const key of keys) if (value && typeof value === "object" && key in value) value = value[key];
	else return;
	return value;
}
function evaluateCondition(condition, config$1, sectionKey) {
	if (!condition) return false;
	const sectionConfig = config$1[sectionKey];
	const getValue = (field) => getNestedValue(sectionConfig, field);
	switch (condition.type) {
		case "var": return !!getValue(condition.field);
		case "literal": return !!condition.value;
		case "compare": {
			const left = condition.left.type === "var" ? getValue(condition.left.field) : condition.left.value;
			const right = condition.right.type === "var" ? getValue(condition.right.field) : condition.right.value;
			switch (condition.operator) {
				case "===": return left === right;
				case "!==": return left !== right;
				case ">": return left > right;
				case "<": return left < right;
				case ">=": return left >= right;
				case "<=": return left <= right;
				default: return false;
			}
		}
		case "not": return !evaluateCondition(condition.condition, config$1, sectionKey);
		case "and": return condition.conditions.every((c) => evaluateCondition(c, config$1, sectionKey));
		case "or": return condition.conditions.some((c) => evaluateCondition(c, config$1, sectionKey));
		case "includes": {
			const arr = getValue(condition.field);
			return Array.isArray(arr) && arr.includes(condition.value);
		}
		default: return false;
	}
}
function isDivider(field) {
	return !("key" in field);
}
function isSwitch(field) {
	return "key" in field && !("type" in field) && !("radio" in field) && !("checkbox" in field);
}
function isInput(field) {
	return "key" in field && "type" in field;
}
function isRadioGroup(field) {
	return "key" in field && "radio" in field;
}
function isCheckboxGroup(field) {
	return "key" in field && "checkbox" in field;
}
function fieldToComponent(field, config$1, sectionKey, componentId) {
	if (isDivider(field)) return null;
	const isDisabled = evaluateCondition("disabled" in field ? field.disabled : void 0, config$1, sectionKey);
	const sectionConfig = config$1[sectionKey];
	if (isSwitch(field)) {
		const { key, disabled, ...rest } = field;
		return components.switch.create(componentId, {
			...rest,
			isDisabled,
			defaultSelected: getNestedValue(sectionConfig, key)
		});
	}
	if (isInput(field)) {
		const { key, disabled, type, ...rest } = field;
		const value = getNestedValue(sectionConfig, key);
		if (type === "number") return components.input.number(componentId, {
			...rest,
			isDisabled,
			defaultValue: value?.toString() || ""
		});
		else return components.input.string(componentId, {
			...rest,
			type,
			isDisabled,
			defaultValue: value || ""
		});
	}
	if (isRadioGroup(field)) {
		const { key, disabled, radio, ...rest } = field;
		const value = getNestedValue(sectionConfig, key);
		return components.radio.group(componentId, {
			...rest,
			isDisabled,
			defaultValue: typeof value === "number" ? value.toString() : value,
			radio: radio.map((opt) => {
				const { key: optKey, ...optRest } = opt;
				return components.radio.create(optKey, optRest);
			})
		});
	}
	if (isCheckboxGroup(field)) {
		const { key, disabled, checkbox, ...rest } = field;
		const value = getNestedValue(sectionConfig, key);
		return components.checkbox.group(componentId, {
			...rest,
			isDisabled,
			defaultValue: value || [],
			checkbox: checkbox.map((opt) => {
				const { key: optKey, ...optRest } = opt;
				return components.checkbox.create(optKey, optRest);
			})
		});
	}
	return null;
}
function sectionToAccordionItem(schema, config$1, accordionId = `cfg:${schema.key}`) {
	const children = [];
	for (const field of schema.fields) if (isDivider(field)) children.push(components.divider.create(`divider-${schema.key}-${children.length}`, field));
	else if ("key" in field) {
		const componentId = field.key.replace(/\./g, ":");
		const component = fieldToComponent(field, config$1, schema.key, componentId);
		if (component) children.push(component);
	}
	return components.accordion.createItem(accordionId, {
		title: schema.title,
		className: "ml-4 mr-4",
		subtitle: schema.subtitle,
		children
	});
}
function sectionToAccordion(schema, config$1, label) {
	return components.accordion.create(schema.key, {
		label: label || schema.title,
		children: [sectionToAccordionItem(schema, config$1)]
	});
}
await init_module();
await init_config();
await init_Config();
const webConfig = defineConfig({
	info: {
		id: "karin-plugin-kkk",
		name: "kkk插件",
		description: `Karin 的「抖音」「B站」视频解析/动态推送插件。v${Root.pluginVersion}`,
		icon: {
			name: "radio_button_checked",
			color: "#F31260"
		},
		version: Root.pluginVersion,
		author: [{
			name: "ikenxuan",
			home: "https://github.com/ikenxuan",
			avatar: "https://github.com/ikenxuan.png"
		}, {
			name: "sj817",
			home: "https://github.com/sj817",
			avatar: "https://github.com/sj817.png"
		}]
	},
	components: async () => {
		const all = await Config.All();
		return [
			...getConfigSchema().modules.filter((module) => module.key !== "pushlist").flatMap((module) => module.sections.map((section) => sectionToAccordion(section, all, module.label))),
			components.divider.create("divider-7", {
				description: "抖音推送列表相关",
				descPosition: 20
			}),
			components.accordionPro.create("pushlist:douyin", all.pushlist.douyin.map((item) => ({
				...item,
				title: item.remark,
				subtitle: item.short_id
			})), {
				label: "抖音推送列表",
				children: components.accordion.createItem("accordion-item-douyin", {
					className: "ml-4 mr-4",
					children: [
						components.switch.create("switch", {
							label: "是否启用",
							description: "是否启用该订阅项",
							color: "warning"
						}),
						components.input.string("short_id", {
							placeholder: "",
							label: "抖音号",
							description: "抖音号, 必填",
							errorMessage: "抖音号不能为空 Ciallo～(∠・ω< )⌒☆",
							color: "warning"
						}),
						components.input.group("group_id", {
							label: "绑定推送群",
							maxRows: 2,
							data: [],
							template: components.input.string("accordion-item-douyin:push:douyin:group_id", {
								placeholder: "必填，不能出现空值",
								label: "群号:机器人账号",
								color: "warning",
								rules: [{
									regex: /.+:.+/,
									error: "请使用 `群号:机器人账号` 的格式"
								}]
							})
						}),
						components.input.string("sec_uid", {
							color: "default",
							placeholder: "可不填，会自动获取",
							label: "UID",
							isRequired: false,
							description: "获取方法：PC浏览器打开某个博主主页，https://www.douyin.com/user/MS4wLj..... 其中的user/后的即为UID"
						}),
						components.input.string("remark", {
							color: "default",
							placeholder: "可不填，会自动获取",
							label: "昵称",
							isRequired: false,
							description: "博主的抖音名称"
						}),
						components.divider.create("push:douyin:divider-pushTypes", {
							description: "推送类型配置",
							descPosition: 20
						}),
						components.checkbox.group("pushTypes", {
							label: "推送类型",
							description: "选择要推送的内容类型，可多选",
							orientation: "horizontal",
							color: "warning",
							checkbox: [
								components.checkbox.create("pushTypes:checkbox:post", {
									label: "作品列表",
									description: "推送博主发布的作品",
									value: "post"
								}),
								components.checkbox.create("pushTypes:checkbox:favorite", {
									label: "喜欢列表",
									description: "推送博主喜欢的作品",
									value: "favorite"
								}),
								components.checkbox.create("pushTypes:checkbox:recommend", {
									label: "推荐列表",
									description: "推送博主的推荐作品",
									value: "recommend"
								}),
								components.checkbox.create("pushTypes:checkbox:live", {
									label: "直播",
									description: "推送博主开播通知",
									value: "live"
								})
							]
						}),
						components.divider.create("push:douyin:divider-1", {
							description: "过滤系统",
							descPosition: 20
						}),
						components.radio.group("filterMode", {
							label: "过滤模式",
							orientation: "horizontal",
							color: "warning",
							radio: [components.radio.create("push:bilibili:filterMode.radio-1", {
								label: "黑名单模式",
								description: "命中以下内容时，不推送",
								value: "blacklist"
							}), components.radio.create("push:bilibili:filterMode.radio-2", {
								label: "白名单模式",
								description: "命中以下内容时，才推送",
								value: "whitelist"
							})]
						}),
						components.input.group("Keywords", {
							label: "关键词",
							maxRows: 2,
							itemsPerRow: 4,
							data: [],
							template: components.input.string("push:bilibili:filterKeywords", {
								placeholder: "严禁提交空值",
								label: "",
								color: "warning"
							})
						}),
						components.input.group("Tags", {
							label: "标签",
							maxRows: 2,
							itemsPerRow: 4,
							data: [],
							template: components.input.string("push:bilibili:filterTags", {
								placeholder: "严禁提交空值",
								label: "",
								color: "warning"
							})
						})
					]
				})
			}),
			components.divider.create("divider-8", {
				description: "B站推送列表相关",
				descPosition: 20
			}),
			components.accordionPro.create("pushlist:bilibili", all.pushlist.bilibili.map((item) => ({
				...item,
				title: item.remark,
				subtitle: item.host_mid
			})), {
				label: "B站推送列表",
				children: components.accordion.createItem("accordion-item-bilibili", {
					className: "ml-4 mr-4",
					children: [
						components.switch.create("switch", {
							label: "是否启用",
							description: "是否启用该订阅项",
							color: "warning"
						}),
						components.input.number("host_mid", {
							placeholder: "",
							label: "UID",
							rules: void 0,
							description: "B站用户的UID，必填",
							errorMessage: "UID 不能为空 Ciallo～(∠・ω< )⌒☆",
							color: "warning"
						}),
						components.input.group("group_id", {
							label: "绑定推送群",
							maxRows: 2,
							data: [],
							template: components.input.string("accordion-item-bilibili:push:bilibili:group_id", {
								placeholder: "必填，不能出现空值",
								label: "",
								color: "warning",
								rules: [{
									regex: /.+:.+/,
									error: "请使用 `群号:机器人账号` 的格式"
								}]
							})
						}),
						components.input.string("remark", {
							color: "default",
							placeholder: "可不填，会自动获取",
							label: "昵称",
							isRequired: false,
							description: "UP主的昵称"
						}),
						components.radio.group("filterMode", {
							label: "过滤模式",
							orientation: "horizontal",
							color: "warning",
							radio: [components.radio.create("push:bilibili:filterMode.radio-1", {
								label: "黑名单模式",
								description: "命中以下内容时，不推送",
								value: "blacklist"
							}), components.radio.create("push:bilibili:filterMode.radio-2", {
								label: "白名单模式",
								description: "命中以下内容时，才推送",
								value: "whitelist"
							})]
						}),
						components.input.group("Keywords", {
							label: "关键词",
							maxRows: 2,
							itemsPerRow: 4,
							data: [],
							description: "关键词，多个则使用逗号隔开",
							template: components.input.string("push:bilibili:filterKeywords", {
								placeholder: "严禁提交空值",
								label: "",
								color: "warning"
							})
						}),
						components.input.group("Tags", {
							label: "标签",
							maxRows: 2,
							itemsPerRow: 4,
							data: [],
							template: components.input.string("push:bilibili:filterTags", {
								placeholder: "严禁提交空值",
								label: "",
								color: "warning"
							})
						})
					]
				})
			})
		];
	},
	save: async (config$1) => {
		const formatCfg = processFrontendData(config$1);
		const oldAllCfg = await Config.All();
		const mergeCfg = _.mergeWith({}, oldAllCfg, formatCfg, customizer);
		cleanFlattenedFields(mergeCfg);
		let success = false;
		let isChange = false;
		let needReloadAmagi = false;
		for (const key of Object.keys(mergeCfg)) {
			const configValue = mergeCfg[key];
			if (configValue && typeof configValue === "object" && Object.keys(configValue).length > 0) {
				isChange = deepEqual(configValue, oldAllCfg[key]);
				if (isChange) {
					if (await Config.ModifyPro(key, configValue)) {
						success = true;
						if (key === "cookies" || key === "request") needReloadAmagi = true;
					}
				}
			}
		}
		await Config.syncConfigToDatabase();
		if (needReloadAmagi) try {
			const { reloadAmagiConfig: reloadAmagiConfig$1 } = await Promise.resolve().then(() => (init_amagiClient(), amagiClient_exports));
			reloadAmagiConfig$1();
		} catch (error) {
			logger.error(`[WebConfig] 重载 Amagi Client 失败: ${error}`);
		}
		return {
			mergeCfg,
			formatCfg,
			success,
			message: success ? "保存成功 Ciallo～(∠・ω< )⌒☆" : "配置无变化 Ciallo～(∠・ω< )⌒☆"
		};
	}
});
var web_config_default = webConfig;
var customizer = (value, srcValue) => {
	if (Array.isArray(srcValue)) return srcValue;
};
var deepEqual = (a, b) => {
	if (a === b) return false;
	if (typeof a === "string" && typeof b === "string") {
		if (a !== b) return true;
	}
	if (typeof a === "number" && typeof b === "number") {
		if (a !== b) return true;
	}
	if (typeof a === "boolean" && typeof b === "boolean") {
		if (a !== b) return true;
	}
	if (a === null || b === null || typeof a !== typeof b) return true;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return true;
		for (let i = 0; i < a.length; i++) if (deepEqual(a[i], b[i])) return true;
	}
	let isChange = false;
	if (typeof a === "object" && typeof b === "object") {
		if (isChange) return true;
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);
		if (keysA.length !== keysB.length) return true;
		for (const key of keysA) {
			if (!keysB.includes(key)) {
				isChange = true;
				return true;
			}
			if (deepEqual(a[key], b[key])) {
				isChange = true;
				return true;
			}
		}
	}
	return false;
};
var convertToNumber = (value) => {
	if (/^\d+$/.test(value)) return parseInt(value, 10);
	else return value;
};
var getFirstObject = (arr) => arr.length > 0 ? arr[0] : {};
var setNestedProperty = (obj, keys, value) => {
	let current = obj;
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (!current[key] || typeof current[key] !== "object") current[key] = {};
		current = current[key];
	}
	const lastKey = keys[keys.length - 1];
	current[lastKey] = value;
};
var processFrontendData = (data$1) => {
	const result = {};
	const configKeys = Object.keys(data$1).filter((key) => !key.includes("pushlist") && key in data$1);
	for (const key of configKeys) {
		const value = data$1[key];
		const firstObj = Array.isArray(value) ? getFirstObject(value) : {};
		const objKeys = Object.keys(firstObj);
		if (objKeys.length === 0) continue;
		const configObj = {};
		let hasValidData = false;
		const nestedProps = objKeys.filter((prop) => prop.includes(":"));
		const flatProps = objKeys.filter((prop) => !prop.includes(":"));
		for (const prop of nestedProps) {
			let propValue = firstObj[prop];
			if (typeof propValue === "string") propValue = convertToNumber(propValue);
			if (propValue !== void 0 && propValue !== null) {
				setNestedProperty(configObj, prop.split(":"), propValue);
				hasValidData = true;
			}
		}
		for (const prop of flatProps) {
			let propValue = firstObj[prop];
			if (typeof propValue === "string") propValue = convertToNumber(propValue);
			if (propValue !== void 0 && propValue !== null) {
				configObj[prop] = propValue;
				hasValidData = true;
			}
		}
		if (hasValidData && Object.keys(configObj).length > 0) result[key] = configObj;
	}
	result.pushlist = {
		douyin: data$1["pushlist:douyin"] || [],
		bilibili: (data$1["pushlist:bilibili"] || []).map((item) => ({
			...item,
			host_mid: Number(item.host_mid)
		}))
	};
	return result;
};
var cleanFlattenedFields = (obj) => {
	if (!obj || typeof obj !== "object") return;
	for (const [, value] of Object.entries(obj)) if (typeof value === "object" && value !== null && !Array.isArray(value)) {
		cleanFlattenedFields(value);
		const valueObj = value;
		const flattenedKeys = Object.keys(valueObj).filter((k) => k.includes("."));
		for (const flatKey of flattenedKeys) if (hasNestedStructure(valueObj, flatKey.split("."))) delete valueObj[flatKey];
	}
};
var hasNestedStructure = (obj, path$1) => {
	let current = obj;
	for (let i = 0; i < path$1.length - 1; i++) {
		const key = path$1[i];
		if (!current[key] || typeof current[key] !== "object") return false;
		current = current[key];
	}
	return path$1[path$1.length - 1] in current;
};
await init_src();
await init_date_fns();
await init_locale();
await init_utils$1();
await init_amagiClient();
await init_Config();
await init_danmaku$1();
var img$1;
var Bilibili = class extends Base {
	e;
	type;
	STATUS;
	isVIP;
	Type;
	islogin;
	downloadfilename;
	forceBurnDanmaku;
	get botadapter() {
		return this.e.bot?.adapter?.name;
	}
	constructor(e, data$1, options) {
		super(e);
		this.e = e;
		this.isVIP = false;
		this.Type = data$1?.type;
		this.islogin = data$1?.USER?.STATUS === "isLogin";
		this.downloadfilename = "";
		this.forceBurnDanmaku = options?.forceBurnDanmaku ?? false;
		this.headers.Referer = "https://api.bilibili.com/";
		this.headers.Cookie = Config.cookies.bilibili;
	}
	async BilibiliHandler(iddata) {
		Config.bilibili.tip && await this.e.reply("检测到B站链接，开始解析");
		switch (this.Type) {
			case "one_video": {
				const infoData = await this.amagi.bilibili.fetcher.fetchVideoInfo({
					bvid: iddata.bvid,
					typeMode: "strict"
				});
				const playUrlData = await this.amagi.bilibili.fetcher.fetchVideoStreamUrl({
					avid: infoData.data.data.aid,
					cid: iddata.p ? infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid : infoData.data.data.cid,
					typeMode: "strict"
				});
				this.islogin = (await checkCk()).Status === "isLogin";
				this.downloadfilename = infoData.data.data.title.substring(0, 50).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
				const nockData = await new Network({
					url: bilibiliApiUrls.getVideoStream({
						avid: infoData.data.data.aid,
						cid: iddata.p ? infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid : infoData.data.data.cid
					}) + "&platform=html5",
					headers: this.headers
				}).getData();
				if (Config.bilibili.sendContent.some((content) => content === "info")) if (Config.bilibili.videoInfoMode === "text") {
					const replyContent = [];
					const { coin, like, share, view, favorite, danmaku } = infoData.data.data.stat;
					const coverUrl = await processImageUrl(infoData.data.data.pic, infoData.data.data.title);
					const contentMap = {
						cover: segment.image(coverUrl),
						title: segment.text(`\n📺 标题: ${infoData.data.data.title}\n`),
						author: segment.text(`\n👤 作者: ${infoData.data.data.owner.name}\n`),
						stats: segment.text(formatVideoStats$1(view, danmaku, like, coin, share, favorite)),
						desc: segment.text(`\n\n📝 简介: ${infoData.data.data.desc}`)
					};
					[
						"cover",
						"title",
						"author",
						"stats",
						"desc"
					].forEach((item) => {
						if (Config.bilibili.displayContent.includes(item) && contentMap[item]) replyContent.push(contentMap[item]);
					});
					if (replyContent.length > 0) this.e.reply(replyContent);
				} else {
					const img$2 = await Render("bilibili/videoInfo", {
						share_url: "https://b23.tv/" + infoData.data.data.bvid,
						title: infoData.data.data.title,
						desc: infoData.data.data.desc,
						stat: infoData.data.data.stat,
						bvid: infoData.data.data.bvid,
						ctime: infoData.data.data.ctime,
						pic: infoData.data.data.pic,
						owner: infoData.data.data.owner
					});
					this.e.reply(img$2);
				}
				let videoSize = "";
				let correctList;
				if (this.islogin && (Config.bilibili.videoQuality > 64 || Config.bilibili.videoQuality === 0)) {
					const simplify = playUrlData.data.data.dash.video.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);
					playUrlData.data.data.dash.video = simplify;
					correctList = await bilibiliProcessVideos({
						accept_description: playUrlData.data.data.accept_description,
						bvid: infoData.data.data.bvid,
						qn: Config.bilibili.videoQuality
					}, simplify, playUrlData.data.data.dash.audio[0].base_url);
					playUrlData.data.data.dash.video = correctList.videoList;
					playUrlData.data.data.accept_description = correctList.accept_description;
					videoSize = await getvideosize(correctList.videoList[0].base_url, playUrlData.data.data.dash.audio[0].base_url, infoData.data.data.bvid);
				} else videoSize = (nockData.data.durl[0].size / (1024 * 1024)).toFixed(2);
				if (Config.bilibili.sendContent.some((content) => content === "comment")) {
					const commentsdata = bilibiliComments((await this.amagi.bilibili.fetcher.fetchComments({
						number: Config.bilibili.numcomment,
						type: 1,
						oid: infoData.data.data.aid.toString(),
						typeMode: "strict"
					})).data, infoData.data.data.owner.mid.toString());
					if (!commentsdata?.length) this.e.reply("这个视频没有评论 ~");
					else {
						img$1 = await Render("bilibili/comment", {
							Type: "视频",
							CommentsData: commentsdata,
							CommentLength: Config.bilibili.realCommentCount ? Count(infoData.data.data.stat.reply) : String(commentsdata.length),
							share_url: "https://b23.tv/" + infoData.data.data.bvid,
							Clarity: Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ? nockData.data.accept_description[nockData.data.accept_description.length - 1] : playUrlData.data.data.accept_description[0],
							VideoSize: Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ? Common.formatFileSize((nockData.data.durl[0].size / (1024 * 1024)).toFixed(2)) : Common.formatFileSize(videoSize),
							ImageLength: 0,
							shareurl: "https://b23.tv/" + infoData.data.data.bvid,
							Resolution: Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ? null : `${playUrlData.data.data.dash.video[0].width} x ${playUrlData.data.data.dash.video[0].height}`
						});
						this.e.reply(img$1);
					}
				}
				if (Config.bilibili.sendContent.some((content) => content === "video")) if (Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit) && !Config.upload.compress) this.e.reply(`设定的最大上传大小为 ${Config.upload.filelimit}MB\n当前解析到的视频大小为 ${Number(videoSize)}MB\n视频太大了，还是去B站看吧~`, { reply: true });
				else {
					if (Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64) this.islogin = false;
					let danmakuList = [];
					if (this.forceBurnDanmaku || Config.bilibili.burnDanmaku) try {
						const cid = iddata.p ? infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid : infoData.data.data.cid;
						const duration = iddata.p ? infoData.data.data.pages[iddata.p - 1]?.duration ?? infoData.data.data.duration : infoData.data.data.duration;
						const segmentCount = Math.ceil(duration / 360);
						logger.debug(`视频时长: ${duration}秒, 需要获取 ${segmentCount} 个弹幕分段`);
						const danmakuPromises = Array.from({ length: segmentCount }, (_$1, i) => this.amagi.bilibili.fetcher.fetchVideoDanmaku({
							cid,
							segment_index: i + 1,
							typeMode: "strict"
						}).then((res) => res.data?.data?.elems || []).catch(() => []));
						danmakuList = (await Promise.all(danmakuPromises)).flat();
						logger.debug(`获取到 ${danmakuList.length} 条弹幕（${segmentCount} 个分段）`);
					} catch (err) {
						logger.warn("获取弹幕失败，将不烧录弹幕", err);
					}
					await this.getvideo(Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ? {
						playUrlData: nockData.data,
						danmakuList
					} : {
						infoData: infoData.data,
						playUrlData: playUrlData.data,
						danmakuList
					});
				}
				break;
			}
			case "bangumi_video_info": {
				const videoInfo = await this.amagi.bilibili.fetcher.fetchBangumiInfo({
					[iddata.isEpid ? "ep_id" : "season_id"]: iddata.realid,
					typeMode: "strict"
				});
				this.islogin = (await checkCk()).Status === "isLogin";
				this.isVIP = (await checkCk()).isVIP;
				const Episodes = [];
				for (const item of videoInfo.data.result.episodes) Episodes.push({
					cover: item.cover,
					bvid: item.bvid,
					link: item.short_link,
					long_title: item.long_title,
					pub_time: item.pub_time,
					badge: item.badge === "" ? "限免" : item.badge,
					badge_info: item.badge_info
				});
				img$1 = await Render("bilibili/bangumi", {
					mainCover: videoInfo.data.result.cover,
					Actors: videoInfo.data.result.actors,
					Evaluate: videoInfo.data.result.evaluate,
					Link: videoInfo.data.result.link,
					newEP: videoInfo.data.result.new_ep,
					Title: videoInfo.data.result.title,
					Styles: videoInfo.data.result.styles,
					seasonID: videoInfo.data.result.season_id,
					subtitle: videoInfo.data.result.subtitle,
					UPInfo: videoInfo.data.result.up_info,
					Copyright: videoInfo.data.result.rights.copyright,
					Stat: videoInfo.data.result.stat,
					Episodes,
					length: videoInfo.data.result.episodes.length
				});
				this.e.reply([...img$1, segment.text("请在120秒内输入 第?集 选择集数")]);
				const context = await karin$1.ctx(this.e, { reply: true });
				const regex = /第([一二三四五六七八九十百千万0-9]+)集/.exec(context.msg);
				let Episode;
				if (regex && regex[1]) {
					Episode = regex[1];
					if (/^[一二三四五六七八九十百千万]+$/.test(Episode)) Episode = Common.chineseToArabic(Episode).toString();
					this.downloadfilename = videoInfo.data.result.episodes[Number(Episode) - 1].share_copy.substring(0, 50).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
					this.e.reply(`收到请求，第${Episode}集\n${this.downloadfilename}\n正在下载中`);
				} else {
					logger.debug(Episode);
					this.e.reply("匹配内容失败，请重新发送链接再次解析");
					return true;
				}
				const bangumidataBASEURL = bilibiliApiUrls.getBangumiStream({
					cid: videoInfo.data.result.episodes[Number(Episode) - 1].cid,
					ep_id: videoInfo.data.result.episodes[Number(Episode) - 1].ep_id.toString()
				});
				const Params = await genParams(bangumidataBASEURL);
				if (!this.islogin) this.e.reply("B站ck未配置或已失效，无法获取视频流，可尝试【#B站登录】以配置新ck");
				const playUrlData = await new Network({
					url: bangumidataBASEURL + Params,
					headers: this.headers
				}).getData();
				if (videoInfo.data.result.episodes[Number(Episode) - 1].badge === "会员" && !this.isVIP) {
					logger.warn("该CK不是大会员，无法获取视频流");
					return true;
				}
				if (Config.bilibili.videoQuality === 0) {
					const simplify = playUrlData.result.dash.video.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);
					playUrlData.result.dash.video = simplify;
					const correctList = await bilibiliProcessVideos({
						accept_description: playUrlData.result.accept_description,
						bvid: videoInfo.data.result.season_id.toString(),
						qn: Config.bilibili.videoQuality
					}, simplify, playUrlData.result.dash.audio[0].base_url);
					playUrlData.result.dash.video = correctList.videoList;
					playUrlData.result.cept_description = correctList.accept_description;
				}
				await this.getvideo({
					infoData: videoInfo.data,
					playUrlData
				});
				break;
			}
			case "dynamic_info": {
				const dynamicInfo = await this.amagi.bilibili.fetcher.fetchDynamicDetail({
					dynamic_id: iddata.dynamic_id,
					typeMode: "strict"
				});
				const dynamicInfoCard = await this.amagi.bilibili.fetcher.fetchDynamicCard({
					dynamic_id: dynamicInfo.data.data.item.id_str,
					typeMode: "strict"
				});
				const commentsData = dynamicInfo.data.data.item.type !== DynamicType.LIVE_RCMD && await this.amagi.bilibili.fetcher.fetchComments({
					type: mapping_table(dynamicInfo.data.data.item.type),
					oid: oid(dynamicInfo.data, dynamicInfoCard.data),
					number: Config.bilibili.numcomment,
					typeMode: "strict"
				});
				const dynamicCARD = JSON.parse(dynamicInfoCard.data.data.card.card);
				const userProfileData = await this.amagi.bilibili.fetcher.fetchUserCard({
					host_mid: dynamicInfo.data.data.item.modules.module_author.mid,
					typeMode: "strict"
				});
				switch (dynamicInfo.data.data.item.type) {
					case DynamicType.DRAW: {
						const imgArray = [];
						const title = dynamicInfo.data.data.item.modules.module_dynamic.major.opus.title || "bilibili_dynamic";
						for (const [index, img$2] of dynamicInfo.data.data.item.modules.module_dynamic.major.opus.pics.entries()) if (img$2.url) {
							const imageUrl = await processImageUrl(img$2.url, title, index);
							imgArray.push(segment.image(imageUrl));
						}
						if (Config.bilibili.sendContent.some((content) => content === "comment") && commentsData) {
							const commentsdata = bilibiliComments(commentsData.data, dynamicInfo.data.data.item.modules.module_author.mid.toString());
							img$1 = await Render("bilibili/comment", {
								Type: "动态",
								CommentsData: commentsdata,
								CommentLength: String(commentsdata?.length ?? 0),
								share_url: "https://t.bilibili.com/" + dynamicInfo.data.data.item.id_str,
								ImageLength: dynamicInfo.data.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? 0,
								shareurl: "动态分享链接",
								Resolution: null
							});
							this.e.reply(img$1);
						}
						if (imgArray.length === 1) this.e.reply(imgArray[0]);
						if (imgArray.length > 1) {
							const forwardMsg = common.makeForward(imgArray, this.e.userId, this.e.sender.nick);
							await this.e.bot.sendForwardMsg(this.e.contact, forwardMsg, {
								source: "图片合集",
								summary: `查看${imgArray.length}张图片消息`,
								prompt: "B站图文动态解析结果",
								news: [{ text: "点击查看解析结果" }]
							});
						}
						const dynamicCARD$1 = JSON.parse(dynamicInfoCard.data.data.card.card);
						if ("topic" in dynamicInfo.data.data.item.modules.module_dynamic && dynamicInfo.data.data.item.modules.module_dynamic.topic !== null) {
							const name = dynamicInfo.data.data.item.modules.module_dynamic.topic.name;
							dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.rich_text_nodes.unshift({
								orig_text: name,
								jump_url: "",
								text: name,
								type: "topic"
							});
							dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text = `${name}\n\n` + dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text;
						}
						this.e.reply(await Render("bilibili/dynamic/DYNAMIC_TYPE_DRAW", {
							image_url: dynamicCARD$1.item.pictures && cover(dynamicCARD$1.item.pictures),
							text: dynamicInfo.data.data.item.modules.module_dynamic.major ? replacetext(br$3(dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.text ?? ""), dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.rich_text_nodes ?? []) : "",
							dianzan: Count(dynamicInfo.data.data.item.modules.module_stat.like.count),
							pinglun: Count(dynamicInfo.data.data.item.modules.module_stat.comment.count),
							share: Count(dynamicInfo.data.data.item.modules.module_stat.forward.count),
							create_time: TimeFormatter.toRelative(dynamicInfo.data.data.item.modules.module_author.pub_ts),
							avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
							frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
							share_url: "https://t.bilibili.com/" + dynamicInfo.data.data.item.id_str,
							username: checkvip$2(userProfileData.data.data.card),
							fans: Count(userProfileData.data.data.follower),
							user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
							total_favorited: Count(userProfileData.data.data.like_num),
							following_count: Count(userProfileData.data.data.card.attention),
							decoration_card: generateDecorationCard(dynamicInfo.data.data.item.modules.module_author.decoration_card),
							render_time: TimeFormatter.now(),
							dynamicTYPE: "图文动态",
							imageLayout: Config.bilibili.imageLayout,
							additional: parseAdditionalCard(dynamicInfo.data.data.item.modules.module_dynamic.additional)
						}));
						break;
					}
					case DynamicType.WORD: {
						if ("topic" in dynamicInfo.data.data.item.modules.module_dynamic && dynamicInfo.data.data.item.modules.module_dynamic.topic !== null) {
							const name = dynamicInfo.data.data.item.modules.module_dynamic.topic.name;
							dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.rich_text_nodes.unshift({
								orig_text: name,
								jump_url: "",
								text: name,
								type: "topic"
							});
							dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text = `${name}\n\n` + dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text;
						}
						const text = replacetext(br$3(dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.text ?? ""), dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.rich_text_nodes ?? []);
						this.e.reply(await Render("bilibili/dynamic/DYNAMIC_TYPE_WORD", {
							text,
							dianzan: Count(dynamicInfo.data.data.item.modules.module_stat.like.count),
							pinglun: Count(dynamicInfo.data.data.item.modules.module_stat.comment.count),
							share: Count(dynamicInfo.data.data.item.modules.module_stat.forward.count),
							create_time: TimeFormatter.toRelative(dynamicInfo.data.data.item.modules.module_author.pub_ts),
							avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
							frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
							share_url: "https://t.bilibili.com/" + dynamicInfo.data.data.item.id_str,
							username: checkvip$2(userProfileData.data.data.card),
							fans: Count(userProfileData.data.data.follower),
							user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
							total_favorited: Count(userProfileData.data.data.like_num),
							following_count: Count(userProfileData.data.data.card.attention),
							decoration_card: generateDecorationCard(dynamicInfo.data.data.item.modules.module_author.decoration_card),
							render_time: TimeFormatter.now(),
							dynamicTYPE: "纯文动态",
							additional: parseAdditionalCard(dynamicInfo.data.data.item.modules.module_dynamic.additional)
						}));
						break;
					}
					case DynamicType.FORWARD: {
						const text = replacetext(br$3(dynamicInfo.data.data.item.modules.module_dynamic.desc.text), dynamicInfo.data.data.item.modules.module_dynamic.desc.rich_text_nodes);
						const imgList = [];
						for (const richTxtItem of dynamicInfo.data.data.item.modules.module_dynamic.desc.rich_text_nodes) if (richTxtItem.type === "RICH_TEXT_NODE_TYPE_VIEW_PICTURE") for (const pic of richTxtItem.pics) imgList.push(pic.src);
						let data$1 = {};
						switch (dynamicInfo.data.data.item.orig.type) {
							case DynamicType.AV:
								data$1 = {
									username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
									pub_action: dynamicInfo.data.data.item.orig.modules.module_author.pub_action,
									avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
									duration_text: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.duration_text,
									title: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.title,
									danmaku: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.danmaku,
									view: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.view,
									play: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.play,
									cover: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.cover,
									create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
									decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
									frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
								};
								break;
							case DynamicType.DRAW: {
								const dynamicCARD2 = await this.amagi.bilibili.fetcher.fetchDynamicCard({
									dynamic_id: dynamicInfo.data.data.item.orig.id_str,
									typeMode: "strict"
								});
								const cardData = JSON.parse(dynamicCARD2.data.data.card.card);
								data$1 = {
									title: dynamicInfo.data.data.item.orig.modules.module_dynamic.major?.opus?.title ?? null,
									username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
									create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
									avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
									text: replacetext(br$3(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
									image_url: cardData.item.pictures && cover(cardData.item.pictures),
									decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
									frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
								};
								break;
							}
							case DynamicType.WORD:
								data$1 = {
									username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
									create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
									avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
									text: replacetext(br$3(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
									decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
									frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
								};
								break;
							case DynamicType.LIVE_RCMD: {
								const liveData = JSON.parse(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.live_rcmd.content);
								data$1 = {
									username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
									create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
									avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
									decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
									frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image,
									cover: liveData.live_play_info.cover,
									text_large: liveData.live_play_info.watched_show.text_large,
									area_name: liveData.live_play_info.area_name,
									title: liveData.live_play_info.title,
									online: liveData.live_play_info.online
								};
								break;
							}
							case DynamicType.FORWARD:
							default:
								logger.warn(`UP主：${userProfileData.data.data.card.name}的${logger.green("转发动态")}转发的原动态类型为「${logger.yellow(dynamicInfo.data.item.orig.type)}」暂未支持解析`);
								break;
						}
						this.e.reply(await Render("bilibili/dynamic/DYNAMIC_TYPE_FORWARD", {
							text,
							imgList: imgList.length > 0 ? imgList : null,
							dianzan: Count(dynamicInfo.data.data.item.modules.module_stat.like.count),
							pinglun: Count(dynamicInfo.data.data.item.modules.module_stat.comment.count),
							share: Count(dynamicInfo.data.data.item.modules.module_stat.forward.count),
							create_time: TimeFormatter.toRelative(dynamicInfo.data.data.item.modules.module_author.pub_ts),
							avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
							frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
							share_url: "https://t.bilibili.com/" + dynamicInfo.data.data.item.id_str,
							username: checkvip$2(userProfileData.data.data.card),
							fans: Count(userProfileData.data.data.follower),
							user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
							total_favorited: Count(userProfileData.data.data.like_num),
							following_count: Count(userProfileData.data.data.card.attention),
							dynamicTYPE: "转发动态解析",
							decoration_card: generateDecorationCard(dynamicInfo.data.data.item.modules.module_author.decorate),
							render_time: TimeFormatter.now(),
							original_content: { [dynamicInfo.data.data.item.orig.type]: data$1 }
						}));
						break;
					}
					case DynamicType.AV:
						if (dynamicInfo.data.data.item.modules.module_dynamic.major.type === "MAJOR_TYPE_ARCHIVE") {
							const bvid = dynamicInfo.data.data.item.modules.module_dynamic.major.archive.bvid;
							const INFODATA = await bilibiliFetcher.fetchVideoInfo({
								bvid,
								typeMode: "strict"
							});
							const dycrad = dynamicInfoCard.data.data.card && dynamicInfoCard.data.data.card.card && JSON.parse(dynamicInfoCard.data.data.card.card);
							commentsData && Config.bilibili.sendContent.some((item) => item === "comment") && this.e.reply(await Render("bilibili/comment", {
								Type: "动态",
								CommentsData: bilibiliComments(commentsData.data, dynamicInfo.data.data.item.modules.module_author.mid.toString()),
								CommentLength: String(bilibiliComments(commentsData.data, dynamicInfo.data.data.item.modules.module_author.mid.toString())?.length ? bilibiliComments(commentsData.data, dynamicInfo.data.data.item.modules.module_author.mid.toString()).length : 0),
								share_url: "https://www.bilibili.com/video/" + bvid,
								ImageLength: dynamicInfo.data.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? 0,
								shareurl: "动态分享链接",
								Resolution: null
							}));
							let staff = void 0;
							if (INFODATA.data.data.staff && Array.isArray(INFODATA.data.data.staff)) {
								const currentMid = dynamicInfo.data.data.item.modules.module_author.mid;
								staff = INFODATA.data.data.staff.map((member) => ({
									mid: member.mid,
									title: member.title,
									name: member.name,
									face: member.face,
									follower: member.follower
								}));
								const currentUserIndex = staff.findIndex((member) => member.mid === currentMid);
								if (currentUserIndex > 0) {
									const currentUser = staff.splice(currentUserIndex, 1)[0];
									staff.unshift(currentUser);
								}
							}
							img$1 = await Render("bilibili/dynamic/DYNAMIC_TYPE_AV", {
								image_url: INFODATA.data.data.pic,
								text: br$3(INFODATA.data.data.title),
								desc: br$3(dycrad.desc),
								dianzan: Count(INFODATA.data.data.stat.like),
								pinglun: Count(INFODATA.data.data.stat.reply),
								share: Count(INFODATA.data.data.stat.share),
								view: Count(dycrad.stat.view),
								coin: Count(dycrad.stat.coin),
								duration_text: dynamicInfo.data.data.item.modules.module_dynamic.major.archive.duration_text,
								create_time: TimeFormatter.toDateTime(INFODATA.data.data.ctime),
								avatar_url: userProfileData.data.data.card.face,
								frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
								share_url: "https://www.bilibili.com/video/" + bvid,
								username: checkvip$2(userProfileData.data.data.card),
								fans: Count(userProfileData.data.data.follower),
								user_shortid: userProfileData.data.data.card.mid,
								total_favorited: Count(userProfileData.data.data.like_num),
								following_count: Count(userProfileData.data.data.card.attention),
								render_time: TimeFormatter.now(),
								dynamicTYPE: "视频动态",
								dynamic_id: dynamicInfo.data.data.item.id_str,
								staff
							});
							this.e.reply(img$1);
						}
						break;
					case DynamicType.LIVE_RCMD: {
						const userINFO = await bilibiliFetcher.fetchUserCard({
							host_mid: dynamicInfo.data.data.item.modules.module_author.mid,
							typeMode: "strict"
						});
						img$1 = await Render("bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD", {
							image_url: dynamicCARD.live_play_info.cover,
							text: br$3(dynamicCARD.live_play_info.title),
							liveinf: br$3(`${dynamicCARD.live_play_info.area_name} | 房间号: ${dynamicCARD.live_play_info.room_id}`),
							username: checkvip$2(userINFO.data.data.card),
							avatar_url: userINFO.data.data.card.face,
							frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
							fans: Count(userINFO.data.data.follower),
							create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.modules.module_author.pub_ts),
							now_time: TimeFormatter.now(),
							share_url: "https://live.bilibili.com/" + dynamicCARD.live_play_info.room_id,
							dynamicTYPE: "直播动态"
						});
						this.e.reply(img$1);
						break;
					}
					case DynamicType.ARTICLE: {
						const articleInfoBase = await this.amagi.bilibili.fetcher.fetchArticleInfo({
							id: dynamicInfo.data.data.item.basic.rid_str,
							typeMode: "strict"
						});
						const articleInfo = await this.amagi.bilibili.fetcher.fetchArticleContent({
							id: dynamicInfo.data.data.item.basic.rid_str,
							typeMode: "strict"
						});
						const articleData = articleInfoBase.data.data;
						const articleContent = articleInfo.data.data;
						const messageElements = [];
						const articleImages = extractArticleImages(articleContent);
						const title = articleData.title || "bilibili_article";
						for (const [index, item] of articleImages.entries()) {
							const imageUrl = await processImageUrl(item, title, index);
							messageElements.push(segment.image(imageUrl));
						}
						if (messageElements.length === 1) this.e.reply(messageElements[0]);
						if (messageElements.length > 1) {
							const forwardMsg = common.makeForward(messageElements, this.e.userId, this.e.sender.nick);
							this.e.bot.sendForwardMsg(this.e.contact, forwardMsg, {
								source: "图片合集",
								summary: `查看${messageElements.length}张图片消息`,
								prompt: "B站专栏动态解析结果",
								news: [{ text: "点击查看解析结果" }]
							});
						}
						const img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_ARTICLE", {
							username: checkvip$2(userProfileData.data.data.card),
							avatar_url: userProfileData.data.data.card.face,
							frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
							create_time: TimeFormatter.toDateTime(dynamicInfo.data.data.item.modules.module_author.pub_ts),
							title: articleData.title,
							summary: articleData.summary,
							banner_url: articleData.banner_url || articleData.image_urls && articleData.image_urls[0] || "",
							categories: articleData.categories || [],
							words: articleData.words || 0,
							opus: articleContent.opus || void 0,
							content: articleContent.content || void 0,
							stats: articleData.stats,
							render_time: TimeFormatter.now(),
							share_url: articleContent.dyn_id_str ? `https://www.bilibili.com/opus/${articleContent.dyn_id_str}` : `https://www.bilibili.com/read/cv${articleContent.id}`,
							dynamicTYPE: "专栏动态解析",
							user_shortid: userProfileData.data.data.card.mid,
							total_favorited: Count(userProfileData.data.data.like_num),
							following_count: Count(userProfileData.data.data.card.friend),
							fans: Count(userProfileData.data.data.card.fans)
						});
						this.e.reply(img$2);
						break;
					}
					default: {
						const unknownItem = dynamicInfo.data.data.item;
						this.e.reply(`该动态类型「${unknownItem.type}」暂未支持解析`);
						break;
					}
				}
				break;
			}
			case "live_room_detail": {
				const liveInfo = await this.amagi.bilibili.fetcher.fetchLiveRoomInfo({
					room_id: iddata.room_id,
					typeMode: "strict"
				});
				const roomInitInfo = await this.amagi.bilibili.fetcher.fetchLiveRoomInitInfo({
					room_id: iddata.room_id,
					typeMode: "strict"
				});
				const userProfileData = await this.amagi.bilibili.fetcher.fetchUserCard({
					host_mid: roomInitInfo.data.data.uid,
					typeMode: "strict"
				});
				if (roomInitInfo.data.data.live_status === 0) {
					this.e.reply(`「${userProfileData.data.data.card.name}」\n未开播，正在休息中~`);
					return true;
				}
				const img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD", {
					image_url: liveInfo.data.data.user_cover,
					text: br$3(liveInfo.data.data.title),
					liveinf: br$3(`${liveInfo.data.data.area_name} | 房间号: ${liveInfo.data.data.room_id}`),
					username: userProfileData.data.data.card.name,
					avatar_url: userProfileData.data.data.card.face,
					frame: userProfileData.data.data.card.pendant.image,
					fans: Count(userProfileData.data.data.card.fans),
					create_time: liveInfo.data.data.live_time === "-62170012800" ? "获取失败" : liveInfo.data.data.live_time,
					now_time: TimeFormatter.now(),
					share_url: "https://live.bilibili.com/" + liveInfo.data.data.room_id,
					dynamicTYPE: "直播"
				});
				this.e.reply(img$2);
				break;
			}
			default: break;
		}
	}
	async getvideo({ infoData, playUrlData, danmakuList = [] }) {
		logger.debug("是否登录:", this.islogin);
		switch (this.islogin) {
			case true: {
				logger.debug("视频 URL:", this.Type === "one_video" ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url);
				const downloadHeaders = {
					...this.headers,
					Referer: "https://www.bilibili.com"
				};
				const bmp4Raw = await downloadFile(this.Type === "one_video" ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url, {
					title: `Bil_V_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.m4s`,
					headers: downloadHeaders
				});
				const videoPath = Common.tempDri.video + `Bil_V_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`;
				if (!await fixM4sFile(bmp4Raw.filepath, videoPath)) {
					logger.error("视频文件修复失败");
					return false;
				}
				await Common.removeFile(bmp4Raw.filepath, true);
				logger.debug("音频 URL:", this.Type === "one_video" ? playUrlData.data?.dash?.audio[0].base_url : playUrlData.result.dash.audio[0].base_url);
				const bmp3Raw = await downloadFile(this.Type === "one_video" ? playUrlData.data?.dash?.audio[0].base_url : playUrlData.result.dash.audio[0].base_url, {
					title: `Bil_A_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.m4s`,
					headers: downloadHeaders
				});
				const audioPath = Common.tempDri.video + `Bil_A_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.m4a`;
				if (!await fixM4sFile(bmp3Raw.filepath, audioPath)) {
					logger.error("音频文件修复失败");
					return false;
				}
				await Common.removeFile(bmp3Raw.filepath, true);
				const bmp4 = {
					filepath: videoPath,
					totalBytes: bmp4Raw.totalBytes
				};
				const bmp3 = {
					filepath: audioPath,
					totalBytes: bmp3Raw.totalBytes
				};
				if (bmp4.filepath && bmp3.filepath) {
					const hasDanmaku = (this.forceBurnDanmaku || Config.bilibili.burnDanmaku) && danmakuList.length > 0;
					const resultPath = Common.tempDri.video + `Bil_Result_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`;
					let success;
					if (hasDanmaku) {
						logger.debug(`开始合成视频并烧录 ${danmakuList.length} 条弹幕...`);
						success = await mergeAndBurnBili(bmp4.filepath, bmp3.filepath, danmakuList, resultPath, {
							danmakuArea: Config.bilibili.danmakuArea,
							verticalMode: Config.bilibili.verticalMode,
							videoCodec: Config.bilibili.videoCodec,
							danmakuFontSize: Config.bilibili.danmakuFontSize,
							danmakuOpacity: Config.bilibili.danmakuOpacity
						});
					} else success = await mergeVideoAudio(bmp4.filepath, bmp3.filepath, resultPath);
					if (success) {
						const filePath = Common.tempDri.video + `${Config.app.removeCache ? "tmp_" + Date.now() : this.downloadfilename}.mp4`;
						fs.renameSync(resultPath, filePath);
						logger.mark(`视频文件重命名完成: ${resultPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
						logger.mark("正在尝试删除缓存文件");
						await Common.removeFile(bmp4.filepath, true);
						await Common.removeFile(bmp3.filepath, true);
						const stats = fs.statSync(filePath);
						const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
						if (fileSizeInMB > Config.upload.groupfilevalue) await uploadFile(this.e, {
							filepath: filePath,
							totalBytes: fileSizeInMB,
							originTitle: this.downloadfilename
						}, "", { useGroupFile: true });
						else await uploadFile(this.e, {
							filepath: filePath,
							totalBytes: fileSizeInMB,
							originTitle: this.downloadfilename
						}, "");
					} else {
						await Common.removeFile(bmp4.filepath, true);
						await Common.removeFile(bmp3.filepath, true);
					}
				}
				break;
			}
			case false:
				logger.debug("视频 URL:", playUrlData.durl[0].url);
				if ((this.forceBurnDanmaku || Config.bilibili.burnDanmaku) && danmakuList.length > 0) {
					const videoFile = await downloadFile(playUrlData.durl[0].url, {
						title: `Bil_V_tmp_${Date.now()}.mp4`,
						headers: this.headers
					});
					if (videoFile.filepath) {
						const resultPath = Common.tempDri.video + `Bil_Result_${Date.now()}.mp4`;
						logger.mark(`开始烧录 ${danmakuList.length} 条弹幕...`);
						if (await burnBiliDanmaku(videoFile.filepath, danmakuList, resultPath, {
							danmakuArea: Config.bilibili.danmakuArea,
							verticalMode: Config.bilibili.verticalMode,
							videoCodec: Config.bilibili.videoCodec,
							danmakuFontSize: Config.bilibili.danmakuFontSize,
							danmakuOpacity: Config.bilibili.danmakuOpacity
						})) {
							const filePath = Common.tempDri.video + `${Config.app.removeCache ? "tmp_" + Date.now() : this.downloadfilename}.mp4`;
							fs.renameSync(resultPath, filePath);
							await Common.removeFile(videoFile.filepath, true);
							const stats = fs.statSync(filePath);
							const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
							if (fileSizeInMB > Config.upload.groupfilevalue) await uploadFile(this.e, {
								filepath: filePath,
								totalBytes: fileSizeInMB,
								originTitle: this.downloadfilename
							}, "", { useGroupFile: true });
							else await uploadFile(this.e, {
								filepath: filePath,
								totalBytes: fileSizeInMB,
								originTitle: this.downloadfilename
							}, "");
						} else await Common.removeFile(videoFile.filepath, true);
					}
				} else await downloadVideo(this.e, {
					video_url: playUrlData.durl[0].url,
					title: {
						timestampTitle: `tmp_${Date.now()}.mp4`,
						originTitle: `${this.downloadfilename}.mp4`
					}
				});
				break;
			default: break;
		}
	}
};
var checkvip$2 = (member) => member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#e9e9e9" : "#313131"}; font-weight: 700;">${member.name}</span>`;
var br$3 = (data$1) => data$1 = data$1.replace(/\n/g, "<br>");
const TimeFormatter = {
	toRelative: (timestamp) => {
		try {
			return formatDistanceToNow(fromUnixTime(timestamp), {
				addSuffix: true,
				locale: zhCN
			});
		} catch (error) {
			logger.warn("相对时间格式化失败:", error);
			return TimeFormatter.toDateTime(timestamp);
		}
	},
	toDateTime: (timestamp) => {
		try {
			return format(fromUnixTime(timestamp), "yyyy-MM-dd HH:mm");
		} catch (error) {
			logger.warn("日期时间格式化失败:", error);
			return "时间格式错误";
		}
	},
	now: () => {
		try {
			return format(/* @__PURE__ */ new Date(), "yyyy-MM-dd HH:mm:ss");
		} catch (error) {
			logger.warn("当前时间格式化失败:", error);
			return (/* @__PURE__ */ new Date()).toISOString();
		}
	}
};
const replacetext = (text, rich_text_nodes) => {
	for (const tag of rich_text_nodes) {
		const escapedText = tag.orig_text.replace(/([.*+?^${}()|[\]\\])/g, "\\$1").replace(/\n/g, "\\n");
		const regex = new RegExp(escapedText, "g");
		switch (tag.type) {
			case "topic":
				text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width: 80px;height: 80px;margin: 0 -25px -25px 0;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="opus-module-topic__icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4302 2.57458C11.4416 2.51023 11.4439 2.43974 11.4218 2.3528C11.3281 1.98196 10.9517 1.72037 10.5284 1.7527C10.432 1.76018 10.3599 1.78383 10.297 1.81376C10.2347 1.84398 10.1832 1.88155 10.1401 1.92465C10.1195 1.94485 10.1017 1.96692 10.0839 1.98897L10.0808 1.99289L10.0237 2.06277L9.91103 2.2033C9.76177 2.39141 9.61593 2.58191 9.47513 2.77556C9.33433 2.96936 9.19744 3.16585 9.06672 3.36638C9.00275 3.46491 8.93968 3.56401 8.87883 3.66461L8.56966 3.6613C8.00282 3.6574 7.43605 3.65952 6.86935 3.67034C6.80747 3.56778 6.74325 3.46677 6.67818 3.3664C6.54732 3.16585 6.41045 2.96934 6.26968 2.77568C6.12891 2.58186 5.98309 2.39134 5.83387 2.20322L5.72122 2.06268L5.66416 1.99279L5.6622 1.99036C5.64401 1.96783 5.62586 1.94535 5.60483 1.92454C5.56192 1.88144 5.51022 1.84388 5.44797 1.81364C5.38522 1.78386 5.31305 1.76006 5.21665 1.75273C4.80555 1.72085 4.4203 1.97094 4.32341 2.35273C4.30147 2.43968 4.30358 2.51018 4.31512 2.57453C4.32715 2.63859 4.34975 2.69546 4.38112 2.74649C4.39567 2.77075 4.41283 2.79315 4.42999 2.81557C4.43104 2.81694 4.43209 2.81831 4.43314 2.81968L4.48759 2.89122L4.59781 3.03355C4.74589 3.22242 4.89739 3.40905 5.05377 3.59254C5.09243 3.63788 5.13136 3.68306 5.17057 3.72785C4.99083 3.73681 4.81112 3.7467 4.63143 3.75756C4.41278 3.771 4.19397 3.78537 3.97547 3.80206L3.64757 3.82786L3.48362 3.84177L3.39157 3.85181C3.36984 3.8543 3.34834 3.8577 3.32679 3.86111C3.31761 3.86257 3.30843 3.86402 3.29921 3.86541C3.05406 3.90681 2.81526 3.98901 2.59645 4.10752C2.37765 4.22603 2.17867 4.38039 2.00992 4.56302C1.84117 4.74565 1.70247 4.95593 1.60144 5.18337C1.50025 5.4105 1.43687 5.65447 1.41362 5.90153C1.33103 6.77513 1.27663 7.6515 1.25742 8.5302C1.23758 9.40951 1.25835 10.2891 1.3098 11.1655C1.32266 11.3846 1.33738 11.6035 1.35396 11.8223L1.38046 12.1505L1.39472 12.3144L1.39658 12.335L1.39906 12.3583L1.40417 12.4048C1.40671 12.4305 1.41072 12.4558 1.41473 12.4811C1.41561 12.4866 1.41648 12.4922 1.41734 12.4977C1.45717 12.7449 1.53806 12.9859 1.65567 13.2074C1.77314 13.4289 1.92779 13.6304 2.11049 13.8022C2.29319 13.974 2.50441 14.1159 2.73329 14.2197C2.96201 14.3235 3.2084 14.3901 3.45836 14.4135C3.47066 14.415 3.48114 14.4159 3.49135 14.4167C3.49477 14.417 3.49817 14.4173 3.50159 14.4176L3.5425 14.4212L3.62448 14.4283L3.78843 14.4417L4.11633 14.4674C4.33514 14.4831 4.55379 14.4983 4.7726 14.5111C6.52291 14.6145 8.27492 14.6346 10.0263 14.5706C10.4642 14.5547 10.9019 14.5332 11.3396 14.5062C11.5584 14.4923 11.7772 14.4776 11.9959 14.4604L12.3239 14.434L12.4881 14.4196L12.5813 14.4093C12.6035 14.4065 12.6255 14.403 12.6474 14.3995C12.6565 14.3981 12.6655 14.3966 12.6746 14.3952C12.9226 14.3527 13.1635 14.2691 13.3844 14.1486C13.6052 14.0284 13.8059 13.8716 13.9759 13.6868C14.1463 13.5022 14.2861 13.2892 14.3874 13.0593C14.4381 12.9444 14.4793 12.8253 14.5108 12.7037C14.519 12.6734 14.5257 12.6428 14.5322 12.612L14.5421 12.566L14.55 12.5196C14.5556 12.4887 14.5607 12.4578 14.5641 12.4266C14.5681 12.3959 14.5723 12.363 14.5746 12.3373C14.6642 11.4637 14.7237 10.5864 14.7435 9.70617C14.764 8.825 14.7347 7.94337 14.6719 7.06715C14.6561 6.8479 14.6385 6.62896 14.6183 6.41033L14.5867 6.08246L14.5697 5.91853L14.5655 5.87758C14.5641 5.86445 14.5618 5.8473 14.5599 5.83231C14.5588 5.8242 14.5578 5.81609 14.5567 5.80797C14.5538 5.78514 14.5509 5.76229 14.5466 5.7396C14.5064 5.49301 14.4252 5.25275 14.3067 5.03242C14.1886 4.81208 14.0343 4.61153 13.8519 4.44095C13.6695 4.27038 13.4589 4.12993 13.2311 4.02733C13.0033 3.92458 12.7583 3.85907 12.5099 3.83636C12.4974 3.83492 12.4865 3.83394 12.4759 3.833C12.4729 3.83273 12.4698 3.83246 12.4668 3.83219L12.4258 3.82879L12.3438 3.82199L12.1798 3.80886L11.8516 3.78413C11.633 3.76915 11.4143 3.75478 11.1955 3.74288C10.993 3.73147 10.7904 3.72134 10.5878 3.71243L10.6914 3.59236C10.8479 3.40903 10.9992 3.22242 11.1473 3.03341L11.2576 2.89124L11.312 2.81971C11.3136 2.81773 11.3151 2.81575 11.3166 2.81377C11.3333 2.79197 11.3501 2.77013 11.3641 2.74653C11.3954 2.6955 11.418 2.63863 11.4302 2.57458ZM9.33039 5.49268C9.38381 5.16945 9.67705 4.95281 9.98536 5.00882L9.98871 5.00944C10.2991 5.06783 10.5063 5.37802 10.4524 5.70377L10.2398 6.99039L11.3846 6.9904C11.7245 6.9904 12 7.27925 12 7.63557C12 7.99188 11.7245 8.28073 11.3846 8.28073L10.0266 8.28059L9.7707 9.82911L11.0154 9.82913C11.3553 9.82913 11.6308 10.118 11.6308 10.4743C11.6308 10.8306 11.3553 11.1195 11.0154 11.1195L9.55737 11.1195L9.32807 12.5073C9.27465 12.8306 8.98141 13.0472 8.6731 12.9912L8.66975 12.9906C8.35937 12.9322 8.1522 12.622 8.20604 12.2962L8.40041 11.1195H6.89891L6.66961 12.5073C6.61619 12.8306 6.32295 13.0472 6.01464 12.9912L6.01129 12.9906C5.7009 12.9322 5.49374 12.622 5.54758 12.2962L5.74196 11.1195L4.61538 11.1195C4.27552 11.1195 4 10.8306 4 10.4743C4 10.118 4.27552 9.82913 4.61538 9.82913L5.95514 9.82911L6.21103 8.28059L4.98462 8.28073C4.64475 8.28073 4.36923 7.99188 4.36923 7.63557C4.36923 7.27925 4.64475 6.9904 4.98462 6.9904L6.42421 6.99039L6.67193 5.49268C6.72535 5.16945 7.01859 4.95281 7.3269 5.00882L7.33025 5.00944C7.64063 5.06783 7.8478 5.37802 7.79396 5.70377L7.58132 6.99039H9.08281L9.33039 5.49268ZM8.61374 9.82911L8.86963 8.28059H7.36813L7.11225 9.82911H8.61374Z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
				break;
			case "RICH_TEXT_NODE_TYPE_TOPIC":
			case "RICH_TEXT_NODE_TYPE_AT":
				text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};">${tag.orig_text}</span>`);
				break;
			case "RICH_TEXT_NODE_TYPE_LOTTERY":
				text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width: 65px;height: 65px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M3.7499750000000005 9.732083333333334C4.095158333333333 9.732083333333334 4.374975 10.011875000000002 4.374975 10.357083333333334L4.374975 15.357083333333334C4.374975 15.899458333333335 4.8147 16.339166666666667 5.357116666666667 16.339166666666667L14.642833333333334 16.339166666666667C15.185250000000002 16.339166666666667 15.625 15.899458333333335 15.625 15.357083333333334L15.625 10.357083333333334C15.625 10.011875000000002 15.904791666666668 9.732083333333334 16.25 9.732083333333334C16.595166666666668 9.732083333333334 16.875 10.011875000000002 16.875 10.357083333333334L16.875 15.357083333333334C16.875 16.589833333333335 15.875625000000001 17.589166666666667 14.642833333333334 17.589166666666667L5.357116666666667 17.589166666666667C4.124341666666667 17.589166666666667 3.124975 16.589833333333335 3.124975 15.357083333333334L3.124975 10.357083333333334C3.124975 10.011875000000002 3.4048 9.732083333333334 3.7499750000000005 9.732083333333334z" fill="currentColor"></path><path d="M2.4106916666666667 7.3214250000000005C2.4106916666666667 6.384516666666666 3.1702083333333335 5.625 4.107116666666667 5.625L15.892833333333334 5.625C16.82975 5.625 17.58925 6.384516666666666 17.58925 7.3214250000000005L17.58925 8.917583333333335C17.58925 9.74225 16.987583333333337 10.467208333333334 16.13125 10.554C15.073666666666668 10.661208333333335 13.087708333333333 10.803583333333334 10 10.803583333333334C6.912275 10.803583333333334 4.9263 10.661208333333335 3.8687250000000004 10.554C3.0123833333333336 10.467208333333334 2.4106916666666667 9.74225 2.4106916666666667 8.917583333333335L2.4106916666666667 7.3214250000000005zM4.107116666666667 6.875C3.8605666666666667 6.875 3.6606916666666667 7.0748750000000005 3.6606916666666667 7.3214250000000005L3.6606916666666667 8.917583333333335C3.6606916666666667 9.135250000000001 3.8040833333333333 9.291041666666667 3.9947583333333334 9.310375C5.0068 9.412958333333334 6.950525000000001 9.553583333333334 10 9.553583333333334C13.049458333333334 9.553583333333334 14.993166666666669 9.412958333333334 16.005166666666668 9.310375C16.195875 9.291041666666667 16.33925 9.135250000000001 16.33925 8.917583333333335L16.33925 7.3214250000000005C16.33925 7.0748750000000005 16.139375 6.875 15.892833333333334 6.875L4.107116666666667 6.875z" fill="currentColor"></path><path d="M5.446408333333333 4.464341666666667C5.446408333333333 3.1329416666666665 6.525716666666667 2.0536333333333334 7.857116666666667 2.0536333333333334C9.188541666666666 2.0536333333333334 10.267833333333334 3.1329416666666665 10.267833333333334 4.464341666666667L10.267833333333334 6.875058333333333L7.857116666666667 6.875058333333333C6.525716666666667 6.875058333333333 5.446408333333333 5.795741666666666 5.446408333333333 4.464341666666667zM7.857116666666667 3.3036333333333334C7.216075000000001 3.3036333333333334 6.696408333333334 3.8233 6.696408333333334 4.464341666666667C6.696408333333334 5.105391666666667 7.216075000000001 5.6250583333333335 7.857116666666667 5.6250583333333335L9.017833333333334 5.6250583333333335L9.017833333333334 4.464341666666667C9.017833333333334 3.8233 8.498166666666668 3.3036333333333334 7.857116666666667 3.3036333333333334z" fill="currentColor"></path><path d="M9.732083333333334 4.464341666666667C9.732083333333334 3.1329416666666665 10.811416666666666 2.0536333333333334 12.142833333333334 2.0536333333333334C13.474250000000001 2.0536333333333334 14.553583333333336 3.1329416666666665 14.553583333333336 4.464341666666667C14.553583333333336 5.795741666666666 13.474250000000001 6.875058333333333 12.142833333333334 6.875058333333333L9.732083333333334 6.875058333333333L9.732083333333334 4.464341666666667zM12.142833333333334 3.3036333333333334C11.501791666666666 3.3036333333333334 10.982083333333334 3.8233 10.982083333333334 4.464341666666667L10.982083333333334 5.6250583333333335L12.142833333333334 5.6250583333333335C12.783875 5.6250583333333335 13.303583333333334 5.105391666666667 13.303583333333334 4.464341666666667C13.303583333333334 3.8233 12.783875 3.3036333333333334 12.142833333333334 3.3036333333333334z" fill="currentColor"></path><path d="M10 4.732058333333334C10.345166666666666 4.732058333333334 10.625 5.011875 10.625 5.357058333333334L10.625 16.428500000000003C10.625 16.773666666666667 10.345166666666666 17.053500000000003 10 17.053500000000003C9.654791666666668 17.053500000000003 9.375 16.773666666666667 9.375 16.428500000000003L9.375 5.357058333333334C9.375 5.011875 9.654791666666668 4.732058333333334 10 4.732058333333334z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
				break;
			case "RICH_TEXT_NODE_TYPE_WEB":
				text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width: 60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M9.571416666666666 7.6439C9.721125 7.33675 10.091416666666667 7.209108333333334 10.398583333333335 7.358808333333333C10.896041666666667 7.540316666666667 11.366333333333333 7.832000000000001 11.767333333333333 8.232975C13.475833333333334 9.941541666666668 13.475833333333334 12.711625 11.767333333333333 14.420166666666669L9.704916666666666 16.482583333333334C7.996383333333334 18.191125000000003 5.226283333333334 18.191125000000003 3.5177416666666668 16.482583333333334C1.8091916666666668 14.774041666666669 1.8091916666666668 12.003916666666667 3.5177416666666668 10.295375L5.008791666666667 8.804333333333334C5.252875 8.56025 5.6486 8.56025 5.892683333333334 8.804333333333334C6.136758333333334 9.048416666666668 6.136758333333334 9.444125000000001 5.892683333333334 9.688208333333334L4.401625 11.179250000000001C3.1812333333333336 12.399666666666667 3.1812333333333336 14.378291666666668 4.401625 15.598708333333335C5.622000000000001 16.819083333333335 7.60065 16.819083333333335 8.821041666666668 15.598708333333335L10.883416666666667 13.536291666666667C12.103833333333334 12.315916666666666 12.103833333333334 10.337250000000001 10.883416666666667 9.116875C10.582458333333333 8.815875 10.229416666666667 8.600908333333333 9.856458333333334 8.471066666666667C9.549333333333333 8.321375 9.421708333333335 7.9510499999999995 9.571416666666666 7.6439z" fill="currentColor"></path><path d="M15.597541666666668 4.402641666666667C14.377166666666668 3.1822500000000002 12.398541666666667 3.1822500000000002 11.178125000000001 4.402641666666667L9.11575 6.465033333333333C7.895358333333333 7.685425 7.895358333333333 9.664041666666668 9.11575 10.884458333333333C9.397666666666668 11.166375 9.725916666666667 11.371583333333334 10.073083333333333 11.500958333333333C10.376583333333334 11.658083333333334 10.495291666666667 12.031416666666667 10.338208333333332 12.334875C10.181083333333333 12.638375 9.80775 12.757083333333334 9.504291666666667 12.6C9.042416666666666 12.420333333333334 8.606383333333333 12.142833333333334 8.231858333333333 11.768333333333334C6.523316666666667 10.059791666666667 6.523316666666667 7.289691666666666 8.231858333333333 5.58115L10.29425 3.5187583333333334C12.002791666666667 1.8102083333333334 14.772875 1.8102083333333334 16.481458333333336 3.5187583333333334C18.19 5.2273000000000005 18.19 7.997400000000001 16.481458333333336 9.705916666666667L15.054916666666667 11.132458333333334C14.810875000000001 11.3765 14.415166666666668 11.3765 14.171041666666667 11.132458333333334C13.927 10.888333333333334 13.927 10.492625 14.171041666666667 10.248541666666666L15.597541666666668 8.822041666666667C16.81791666666667 7.601666666666667 16.81791666666667 5.623025 15.597541666666668 4.402641666666667z" fill="currentColor"></path></svg> ${tag.text}</span>`);
				break;
			case "RICH_TEXT_NODE_TYPE_EMOJI": {
				const regex$1 = new RegExp(tag.orig_text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
				const emojiUrl = tag.emoji.gif_url || tag.emoji.icon_url;
				text = text.replace(regex$1, `<img src='${emojiUrl}' style='height: 160px; margin: 0 0 -10px 0;'>`);
				break;
			}
			case "RICH_TEXT_NODE_TYPE_VOTE":
				text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width:60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M1.6666666666666667 11.875916666666667C1.6666666666666667 10.725333333333333 2.5994083333333333 9.792583333333333 3.75 9.792583333333333L4.583333333333334 9.792583333333333C5.733925 9.792583333333333 6.666666666666667 10.725333333333333 6.666666666666667 11.875916666666667L6.666666666666667 14.792583333333335C6.666666666666667 15.943166666666666 5.733925 16.87591666666667 4.583333333333334 16.87591666666667L3.75 16.87591666666667C2.5994083333333333 16.87591666666667 1.6666666666666667 15.943166666666666 1.6666666666666667 14.792583333333335L1.6666666666666667 11.875916666666667zM3.75 11.042583333333333C3.2897666666666665 11.042583333333333 2.916666666666667 11.415666666666667 2.916666666666667 11.875916666666667L2.916666666666667 14.792583333333335C2.916666666666667 15.252833333333333 3.2897666666666665 15.625916666666669 3.75 15.625916666666669L4.583333333333334 15.625916666666669C5.043575000000001 15.625916666666669 5.416666666666667 15.252833333333333 5.416666666666667 14.792583333333335L5.416666666666667 11.875916666666667C5.416666666666667 11.415666666666667 5.043575000000001 11.042583333333333 4.583333333333334 11.042583333333333L3.75 11.042583333333333z" fill="currentColor"></path><path d="M7.5 4.792483333333334C7.5 3.6418916666666665 8.432758333333334 2.70915 9.583333333333334 2.70915L10.416666666666668 2.70915C11.56725 2.70915 12.5 3.6418916666666665 12.5 4.792483333333334L12.5 14.792500000000002C12.5 15.943083333333332 11.56725 16.875833333333336 10.416666666666668 16.875833333333336L9.583333333333334 16.875833333333336C8.432758333333334 16.875833333333336 7.5 15.943083333333332 7.5 14.792500000000002L7.5 4.792483333333334zM9.583333333333334 3.95915C9.123083333333334 3.95915 8.75 4.3322416666666665 8.75 4.792483333333334L8.75 14.792500000000002C8.75 15.252708333333333 9.123083333333334 15.625833333333334 9.583333333333334 15.625833333333334L10.416666666666668 15.625833333333334C10.876916666666668 15.625833333333334 11.25 15.252708333333333 11.25 14.792500000000002L11.25 4.792483333333334C11.25 4.3322416666666665 10.876916666666668 3.95915 10.416666666666668 3.95915L9.583333333333334 3.95915z" fill="currentColor"></path><path d="M13.333333333333334 9.1675C13.333333333333334 8.016891666666666 14.266083333333333 7.08415 15.416666666666668 7.08415L16.25 7.08415C17.400583333333334 7.08415 18.333333333333336 8.016891666666666 18.333333333333336 9.1675L18.333333333333336 14.792500000000002C18.333333333333336 15.943083333333332 17.400583333333334 16.875833333333336 16.25 16.875833333333336L15.416666666666668 16.875833333333336C14.266083333333333 16.875833333333336 13.333333333333334 15.943083333333332 13.333333333333334 14.792500000000002L13.333333333333334 9.1675zM15.416666666666668 8.334158333333333C14.956416666666668 8.334158333333333 14.583333333333334 8.70725 14.583333333333334 9.1675L14.583333333333334 14.792500000000002C14.583333333333334 15.252708333333333 14.956416666666668 15.625833333333334 15.416666666666668 15.625833333333334L16.25 15.625833333333334C16.71025 15.625833333333334 17.083333333333336 15.252708333333333 17.083333333333336 14.792500000000002L17.083333333333336 9.1675C17.083333333333336 8.70725 16.71025 8.334158333333333 16.25 8.334158333333333L15.416666666666668 8.334158333333333z" fill="currentColor"></path></svg> ${tag.text} </span>`);
				break;
			case "RICH_TEXT_NODE_TYPE_VIEW_PICTURE":
				text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width: 80px; height: 80px;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 22 22" width="22" height="22"><path d="M7.791666666666666 7.733060333333333C7.253044666666666 7.733060333333333 6.816416666666667 8.169688333333333 6.816416666666667 8.708310333333333C6.816416666666667 9.246946 7.253044666666666 9.683544999999999 7.791666666666666 9.683544999999999C8.330281000000001 9.683544999999999 8.766916666666667 9.246946 8.766916666666667 8.708310333333333C8.766916666666667 8.169688333333333 8.330281000000001 7.733060333333333 7.791666666666666 7.733060333333333zM5.558583333333333 8.708310333333333C5.558583333333333 7.475007999999999 6.558372 6.4752193333333325 7.791666666666666 6.4752193333333325C9.024961333333332 6.4752193333333325 10.02475 7.475007999999999 10.02475 8.708310333333333C10.02475 9.941568333333333 9.024961333333332 10.941378333333333 7.791666666666666 10.941378333333333C6.558372 10.941378333333333 5.558583333333333 9.941568333333333 5.558583333333333 8.708310333333333z" fill="currentColor"></path><path d="M11 4.543596666666667C8.690401666666668 4.543596666666667 6.673815333333333 4.661083166666667 5.250284333333333 4.776523999999999C4.243521333333333 4.858162833333334 3.4624053333333333 5.627683666666666 3.37265 6.626020666666667C3.268142166666667 7.788485666666666 3.170833333333333 9.321563333333334 3.170833333333333 10.9978C3.170833333333333 12.673983333333332 3.268142166666667 14.207033333333332 3.37265 15.369535C3.4624053333333333 16.36785666666667 4.243521333333333 17.137388333333334 5.250284333333333 17.219013333333333C6.673816833333333 17.334481666666665 8.690401666666668 17.451966666666664 11 17.451966666666664C13.309854999999999 17.451966666666664 15.326548333333335 17.33439 16.750163333333333 17.218959999999996C17.756758333333334 17.137349999999998 18.5377 16.36804 18.627441666666666 15.36994C18.731925 14.207988333333333 18.829166666666666 12.675175 18.829166666666666 10.9978C18.829166666666666 9.320333333333332 18.731925 7.787542999999999 18.627441666666666 6.6255715C18.5377 5.627479 17.756758333333334 4.858190333333333 16.750163333333333 4.776553C15.326548333333335 4.661109166666666 13.309854999999999 4.543596666666667 11 4.543596666666667zM5.145209166666667 3.480780333333333C6.5952265 3.3631968333333333 8.647761666666666 3.2435966666666665 11 3.2435966666666665C13.352495000000001 3.2435966666666665 15.405159999999999 3.3632151666666665 16.855203333333332 3.4808078333333334C18.484758333333332 3.6129723333333335 19.775116666666666 4.873037 19.922241666666665 6.509160333333334C20.02923333333333 7.6992561666666655 20.129166666666666 9.272141666666666 20.129166666666666 10.9978C20.129166666666666 12.723366666666667 20.02923333333333 14.296258333333332 19.922241666666665 15.486381666666665C19.775116666666666 17.12246833333333 18.484758333333332 18.382566666666666 16.855203333333332 18.514723333333333C15.405159999999999 18.63231 13.352495000000001 18.751966666666664 11 18.751966666666664C8.647761666666666 18.751966666666664 6.5952265 18.63231 5.145209166666667 18.514761666666665C3.515391333333333 18.382566666666666 2.224978166666667 17.122193333333332 2.0778760000000003 15.485923333333332C1.970837 14.295341666666666 1.8708333333333333 12.722213333333332 1.8708333333333333 10.9978C1.8708333333333333 9.273295 1.970837 7.700146833333332 2.0778760000000003 6.509618666666666C2.224978166666667 4.8733365 3.515391333333333 3.6129448333333336 5.145209166666667 3.480780333333333z" fill="currentColor"></path><path d="M14.586553333333333 12.397246666666668C14.19608 12.006681666666665 13.562881666666666 12.006681666666665 13.172316666666665 12.397208333333333L11.288666666666668 14.280896666666665C10.517069999999999 15.052493333333333 9.265836666666667 15.052218333333332 8.494585500000001 14.280124999999998C8.166277166666667 13.951508333333333 7.633659333333334 13.951363333333331 7.305149499999999 14.279834999999999L5.922092833333333 15.66269C5.6682380000000006 15.91648833333333 5.256674833333333 15.91648833333333 5.002853666666667 15.662636666666666C4.7490248333333325 15.4088 4.749050833333333 14.99722 5.002907166666666 14.743368333333333L6.385979166666666 13.360513333333333C7.222356166666667 12.524223333333333 8.578404666666666 12.524628333333332 9.414303333333333 13.361376666666667C9.677975 13.6253 10.105658333333334 13.625445 10.369436666666665 13.361666666666666L12.253033333333333 11.477978333333331C13.151301666666665 10.57971 14.607698333333333 10.579763333333334 15.505913333333332 11.478108333333331L16.99718 12.969611666666665C17.250978333333336 13.223448333333334 17.25094 13.63499 16.997049999999998 13.888841666666666C16.743198333333332 14.142639999999998 16.331671666666665 14.142639999999998 16.07782 13.88875L14.586553333333333 12.397246666666668z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
				break;
		}
	}
	return text;
};
var qnd = {
	6: "极速 240P",
	16: "流畅 360P",
	32: "清晰480P",
	64: "高清720P",
	74: "高帧率 720P60",
	80: "高清 1080P",
	112: "高码率 1080P+",
	116: "高帧率 1080P60",
	120: "超清 4K",
	125: "真彩色 HDR ",
	126: "杜比视界",
	127: "超高清 8K"
};
const generateGradientStyle = (colors, text) => {
	if (!colors) return "";
	const gradientString = colors.map((color) => `${color}`).join(", ");
	return `<span style="font-family: bilifont; color: transparent; background-clip: text; margin: 0 200px 0 0; font-size: 43px; background-image: linear-gradient(135deg, ${gradientString} 0%, ${gradientString} 100%); ">${text}</span>`;
};
const cover = (pic) => {
	const imgArray = [];
	for (const i of pic) {
		const obj = { image_src: i.img_src };
		imgArray.push(obj);
	}
	return imgArray;
};
const generateDecorationCard = (decorate) => decorate ? `<div style="display: flex; width: 500px; height: 150px; background-position: center; background-attachment: fixed; background-repeat: no-repeat; background-size: contain; align-items: center; justify-content: flex-end; background-image: url('${decorate.card_url}')">${generateGradientStyle(decorate.fan?.color_format?.colors, decorate.fan.num_str || decorate.fan.num_desc)}</div>` : "<div></div>";
const parseAdditionalCard = (additional) => {
	if (!additional) return void 0;
	switch (additional.type) {
		case "ADDITIONAL_TYPE_RESERVE": {
			const reserve = additional.reserve;
			if (!reserve) return void 0;
			let buttonText = "";
			if (reserve.button.type === 1) buttonText = reserve.button.jump_style?.text ?? "预约";
			else buttonText = reserve.button.uncheck?.text ?? reserve.button.check?.text ?? "预约";
			return {
				type: "ADDITIONAL_TYPE_RESERVE",
				reserve: {
					title: reserve.title,
					desc1: reserve.desc1?.text ?? "",
					desc2: reserve.desc2?.text ?? "",
					desc3: reserve.desc3?.text,
					buttonText
				}
			};
		}
		case "ADDITIONAL_TYPE_VOTE": {
			const vote = additional.vote;
			if (!vote) return void 0;
			return {
				type: "ADDITIONAL_TYPE_VOTE",
				vote: {
					title: vote.title,
					desc: vote.desc,
					status: vote.status
				}
			};
		}
		case "ADDITIONAL_TYPE_COMMON":
			if (!additional.common) return void 0;
			return {
				type: "ADDITIONAL_TYPE_COMMON",
				common: {
					cover: additional.common.cover,
					title: additional.common.title,
					desc1: additional.common.desc1,
					desc2: additional.common.desc2,
					button_text: additional.common.button?.jump_style?.text,
					head_text: additional.common.head_text,
					sub_type: additional.common.sub_type
				}
			};
		case "ADDITIONAL_TYPE_UGC": {
			const ugc = additional.ugc;
			if (!ugc) return void 0;
			return {
				type: "ADDITIONAL_TYPE_UGC",
				ugc: {
					cover: ugc.cover,
					title: ugc.title,
					duration: ugc.duration,
					play: ugc.stat?.play ?? ugc.desc_second?.split(" ")[0]?.replace("观看", "播放") ?? "",
					danmaku: ugc.stat?.danmaku ?? ugc.desc_second?.split(" ")[1]?.replace("弹幕", "") ?? ""
				}
			};
		}
		case "ADDITIONAL_TYPE_GOODS":
			logger.error("商品卡片暂未实现，请将这次解析的内容反馈给开发者进行适配！");
			return;
		case "ADDITIONAL_TYPE_UPOWER_LOTTERY":
			logger.error("充电专属抽奖暂未实现，请将这次解析的内容反馈给开发者进行适配！");
			return;
		default:
			logger.error("此卡片内容暂未实现，请将这次解析的内容反馈给开发者进行适配！");
			return;
	}
};
var mapping_table = (type) => {
	const Array$1 = {
		1: [
			"DYNAMIC_TYPE_AV",
			"DYNAMIC_TYPE_PGC",
			"DYNAMIC_TYPE_UGC_SEASON"
		],
		11: ["DYNAMIC_TYPE_DRAW"],
		12: ["DYNAMIC_TYPE_ARTICLE"],
		17: [
			"DYNAMIC_TYPE_LIVE_RCMD",
			"DYNAMIC_TYPE_FORWARD",
			"DYNAMIC_TYPE_WORD",
			"DYNAMIC_TYPE_COMMON_SQUARE"
		],
		19: ["DYNAMIC_TYPE_MEDIALIST"]
	};
	for (const key in Array$1) if (Array$1[key].includes(type)) return parseInt(key, 10);
	return 1;
};
var oid = (dynamicINFO, dynamicInfoCard) => {
	switch (dynamicINFO.data.item.type) {
		case "DYNAMIC_TYPE_WORD":
		case "DYNAMIC_TYPE_FORWARD": return dynamicINFO.data.item.id_str;
		default: return dynamicInfoCard.data.card.desc.rid.toString();
	}
};
const bilibiliProcessVideos = async (qualityOptions, videoList, audioUrl) => {
	if (qualityOptions.qn !== 0 || Config.bilibili.videoQuality !== 0) {
		const targetQuality = qualityOptions.qn ?? Config.bilibili.videoQuality;
		let matchedVideo = videoList.find((video) => video.id === targetQuality);
		if (!matchedVideo) {
			const sortedVideos = [...videoList].sort((a, b) => a.id - b.id);
			const lowerVideos = sortedVideos.filter((video) => video.id < targetQuality);
			const higherVideos = sortedVideos.filter((video) => video.id > targetQuality);
			if (lowerVideos.length > 0) matchedVideo = lowerVideos[lowerVideos.length - 1];
			else if (higherVideos.length > 0) matchedVideo = higherVideos[0];
			else matchedVideo = sortedVideos[0];
		}
		qualityOptions.accept_description = [qnd[matchedVideo.id] || qualityOptions.accept_description[0]];
		videoList = [matchedVideo];
		return {
			accept_description: qualityOptions.accept_description,
			videoList
		};
	}
	const results = {};
	for (const video of videoList) {
		const size = await getvideosize(video.base_url, audioUrl, qualityOptions.bvid);
		results[video.id] = size;
	}
	const sizes = Object.values(results).map((size) => parseFloat(size.replace("MB", "")));
	let closestId = null;
	let smallestDifference = Infinity;
	sizes.forEach((size, index) => {
		if (size <= (qualityOptions?.maxAutoVideoSize ?? Config.bilibili.maxAutoVideoSize)) {
			const difference = Math.abs(size - (qualityOptions?.maxAutoVideoSize ?? Config.bilibili.maxAutoVideoSize));
			if (difference < smallestDifference) {
				smallestDifference = difference;
				closestId = Object.keys(results)[index];
			}
		}
	});
	if (closestId !== null) {
		const closestQuality = qnd[Number(closestId)];
		qualityOptions.accept_description = qualityOptions.accept_description.filter((desc) => desc === closestQuality);
		if (qualityOptions.accept_description.length === 0) qualityOptions.accept_description = [closestQuality];
		videoList = [videoList.find((video) => video.id === Number(closestId))];
	} else {
		videoList = [[...videoList].pop()];
		qualityOptions.accept_description = [[...qualityOptions.accept_description].pop()];
	}
	return {
		accept_description: qualityOptions.accept_description,
		videoList
	};
};
const getvideosize = async (videourl, audiourl, bvid) => {
	const videoheaders = await new Network({
		url: videourl,
		headers: {
			...BASE_HEADERS,
			Referer: `https://api.bilibili.com/video/${bvid}`,
			Cookie: Config.cookies.bilibili
		}
	}).getHeaders();
	const audioheaders = await new Network({
		url: audiourl,
		headers: {
			...BASE_HEADERS,
			Referer: `https://api.bilibili.com/video/${bvid}`,
			Cookie: Config.cookies.bilibili
		}
	}).getHeaders();
	const videoSize = videoheaders["content-range"]?.match(/\/(\d+)/) ? parseInt(videoheaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
	const audioSize = audioheaders["content-range"]?.match(/\/(\d+)/) ? parseInt(audioheaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
	const videoSizeInMB = (videoSize / (1024 * 1024)).toFixed(2);
	const audioSizeInMB = (audioSize / (1024 * 1024)).toFixed(2);
	return (parseFloat(videoSizeInMB) + parseFloat(audioSizeInMB)).toFixed(2);
};
var formatVideoStats$1 = (view, danmaku, like, coin, share, favorite) => {
	const viewText = `📊 播放量: ${Count(view)}`;
	const danmakuText = `💬 弹幕: ${Count(danmaku)}`;
	const likeText = `👍 点赞: ${Count(like)}`;
	const coinText = `🪙 投币: ${Count(coin)}`;
	const shareText = `🔄 转发: ${Count(share)}`;
	const favoriteText = `⭐ 收藏: ${Count(favorite)}`;
	const firstColItems = [
		viewText,
		likeText,
		shareText
	];
	const maxFirstColLength = Math.max(...firstColItems.map((item) => getStringDisplayWidth$1(item)));
	return `${alignTwoColumns$1(viewText, danmakuText, maxFirstColLength)}\n${alignTwoColumns$1(likeText, coinText, maxFirstColLength)}\n${alignTwoColumns$1(shareText, favoriteText, maxFirstColLength)}`;
};
var alignTwoColumns$1 = (col1, col2, targetLength) => {
	const spacesNeeded = targetLength - getStringDisplayWidth$1(col1) + 5;
	return col1 + " ".repeat(spacesNeeded) + col2;
};
var getStringDisplayWidth$1 = (str) => {
	let width = 0;
	for (let i = 0; i < str.length; i++) {
		const code = str.codePointAt(i);
		if (!code) continue;
		if (code > 65535) {
			width += 2;
			i++;
		} else if (code >= 12288 && code <= 40959 || code >= 65280 && code <= 65519 || code === 8230 || code === 8212 || code >= 11904 && code <= 12031 || code >= 12288 && code <= 12351 || code >= 12736 && code <= 12783 || code >= 12800 && code <= 13055 || code >= 13056 && code <= 13311 || code >= 44032 && code <= 55215 || code >= 63744 && code <= 64255 || code >= 65072 && code <= 65103) width += 2;
		else if (code === 8205 || code >= 65024 && code <= 65039 || code >= 127995 && code <= 127999) width += 0;
		else width += 1;
	}
	return width;
};
const extractArticleImages = (content) => {
	const images = [];
	if (content.opus?.content?.paragraphs) {
		for (const paragraph of content.opus.content.paragraphs) if (paragraph.para_type === 2 && paragraph.pic?.pics) {
			for (const pic of paragraph.pic.pics) if (pic.url) {
				const url = pic.url.startsWith("//") ? `https:${pic.url}` : pic.url;
				images.push(url);
			}
		}
	}
	if (content.content && typeof content.content === "string") {
		const imgRegex = /<img[^>]+src="([^"]+)"/gi;
		let match;
		while ((match = imgRegex.exec(content.content)) !== null) {
			let url = match[1];
			if (url.startsWith("//")) url = `https:${url}`;
			images.push(url);
		}
	}
	return images;
};
await init_date_fns();
await init_locale();
await init_module();
await init_Config();
const bilibiliComments = (commentsData, host_mid) => {
	if (!commentsData) return [];
	let jsonArray = [];
	if (commentsData.code === 404) return [];
	if (commentsData.data.top && commentsData.data.top.upper) {
		const topReply = commentsData.data.top.upper;
		const ctime = getRelativeTimeFromTimestamp$3(topReply.ctime);
		const emote = topReply.content.emote;
		let message = topReply.content.message;
		if (message && emote) message = emoteToUrl(message, emote);
		const avatar = topReply.member.avatar;
		const frame = topReply.member.pendant.image;
		const uname = checkvip$1(topReply.member);
		const level = topReply.member.level_info.current_level;
		const vipstatus = topReply.member.vip.status;
		const like = topReply.like;
		const replylength = topReply.rcount;
		const location = topReply.reply_control?.location?.replace("IP属地：", "") ?? "";
		const img_src = topReply.content && topReply.content.pictures && topReply.content.pictures.length > 0 ? topReply.content.pictures[0].img_src : null;
		const members = topReply.content.members;
		const isUP = topReply.mid_str === host_mid;
		const fanCard = extractFanCard(topReply.member);
		const obj = {
			id: 0,
			ctime,
			message,
			avatar,
			frame,
			uname,
			level,
			vipstatus,
			img_src,
			replylength,
			location,
			like,
			icon_big_vip: vipstatus === 1 ? "https://i0.hdslb.com/bfs/seed/jinkela/short/user-avatar/big-vip.svg" : null,
			members,
			isTop: true,
			isUP,
			fanCard
		};
		jsonArray.push(obj);
	}
	for (const [i, reply] of commentsData.data.replies.entries()) {
		const ctime = getRelativeTimeFromTimestamp$3(reply.ctime);
		const emote = reply.content.emote;
		let message = reply.content.message;
		if (message && emote) message = emoteToUrl(message, emote);
		const avatar = reply.member.avatar;
		const frame = reply.member.pendant.image;
		const uname = checkvip$1(reply.member);
		const level = reply.member.level_info.current_level;
		const vipstatus = reply.member.vip.vipStatus;
		const like = reply.like;
		const replylength = reply.rcount;
		const location = reply.reply_control?.location?.replace("IP属地：", "") ?? "";
		const img_src = reply.content && reply.content.pictures && reply.content.pictures.length > 0 ? reply.content.pictures[0].img_src : null;
		const members = reply.content.members;
		const isUP = reply.mid_str === host_mid;
		const fanCard = extractFanCard(reply.member);
		const subReplies = [];
		if (reply.replies && Array.isArray(reply.replies)) for (const subReply of reply.replies) {
			const subCtime = getRelativeTimeFromTimestamp$3(subReply.ctime);
			const subEmote = subReply.content.emote;
			let subMessage = subReply.content.message;
			if (subMessage && subEmote) subMessage = emoteToUrl(subMessage, subEmote);
			const subAvatar = subReply.member.avatar;
			const subFrame = subReply.member.pendant.image;
			const subUname = checkvip$1(subReply.member);
			const subLevel = subReply.member.level_info.current_level;
			const subVipstatus = subReply.member.vip.vipStatus;
			const subLike = subReply.like;
			const subLocation = subReply.reply_control?.location?.replace("IP属地：", "") ?? "";
			const subImgSrc = subReply.content && subReply.content.pictures && subReply.content.pictures.length > 0 ? subReply.content.pictures[0].img_src : null;
			const subMembers = subReply.content.members;
			const subIsUP = subReply.mid_str === host_mid;
			const subFanCard = extractFanCard(subReply.member);
			subReplies.push({
				ctime: subCtime,
				message: subMessage,
				avatar: subAvatar,
				frame: subFrame,
				uname: subUname,
				level: subLevel,
				vipstatus: subVipstatus,
				img_src: subImgSrc,
				location: subLocation,
				like: subLike,
				icon_big_vip: subVipstatus === 1 ? "https://i0.hdslb.com/bfs/seed/jinkela/short/user-avatar/big-vip.svg" : null,
				members: subMembers,
				isUP: subIsUP,
				fanCard: subFanCard
			});
		}
		const obj = {
			id: i + 1,
			ctime,
			message,
			avatar,
			frame,
			uname,
			level,
			vipstatus,
			img_src,
			replylength,
			location,
			like,
			icon_big_vip: vipstatus === 1 ? "https://i0.hdslb.com/bfs/seed/jinkela/short/user-avatar/big-vip.svg" : null,
			members,
			isTop: false,
			isUP,
			replies: subReplies,
			fanCard
		};
		jsonArray.push(obj);
	}
	jsonArray.sort((a, b) => {
		if (a.isTop && !b.isTop) return -1;
		if (!a.isTop && b.isTop) return 1;
		if (a.isTop && b.isTop) return 0;
		return b.like - a.like;
	});
	for (const i of jsonArray) {
		if (i.like > 1e4) i.like = (i.like / 1e4).toFixed(1) + "w";
		if (i.replies && Array.isArray(i.replies)) {
			for (const subReply of i.replies) if (subReply.like > 1e4) subReply.like = (subReply.like / 1e4).toFixed(1) + "w";
		}
	}
	jsonArray = space(jsonArray);
	for (const comment of jsonArray) {
		let originalText = comment.message;
		if (comment.members && comment.members.length > 0) for (const member of comment.members) {
			const regex = new RegExp(`@${member.uname}`, "g");
			originalText = originalText.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};">@${member.uname}</span>`);
		}
		comment.message = originalText;
		if (comment.replies && Array.isArray(comment.replies)) for (const subReply of comment.replies) {
			let subOriginalText = subReply.message;
			if (subReply.members && subReply.members.length > 0) for (const member of subReply.members) {
				const regex = new RegExp(`@${member.uname}`, "g");
				subOriginalText = subOriginalText.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};">@${member.uname}</span>`);
			}
			subReply.message = subOriginalText;
		}
	}
	let res;
	res = br$2(jsonArray);
	res = [...res.filter((c) => c.isTop), ...res.filter((c) => !c.isTop)].slice(0, Config.bilibili.numcomment);
	return res;
};
var emoteToUrl = (message, emote) => {
	for (const key in emote) if (Object.prototype.hasOwnProperty.call(emote, key)) {
		if (message.includes(key)) {
			if (message.includes("[") && message.includes("]")) message = message.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), `<img src="${emote[key].url}"/>`);
		}
	}
	return message;
};
var space = (data$1) => {
	for (const i in data$1) if (data$1[i].message) data$1[i].message = data$1[i].message.replace(/ /g, " ");
	return data$1;
};
var br$2 = (data$1) => {
	for (const i in data$1) {
		let message = data$1[i].message;
		message = message?.replace(/\n/g, "<br>");
		data$1[i].message = message;
		if (data$1[i].replies && Array.isArray(data$1[i].replies)) {
			for (const subReply of data$1[i].replies) if (subReply.message) subReply.message = subReply.message.replace(/\n/g, "<br>");
		}
	}
	return data$1;
};
var checkvip$1 = (member) => member.vip.vipStatus === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.uname}</span>` : `<span style="color: #888">${member.uname}</span>`;
var getRelativeTimeFromTimestamp$3 = (timestamp) => {
	const commentDate = fromUnixTime(timestamp);
	const diffSeconds = differenceInSeconds(/* @__PURE__ */ new Date(), commentDate);
	if (diffSeconds < 30) return "刚刚";
	if (diffSeconds < 7776e3) return formatDistanceToNow(commentDate, {
		locale: zhCN,
		addSuffix: true
	});
	return format(commentDate, "yyyy-MM-dd");
};
var extractFanCard = (member) => {
	if (member.user_sailing_v2 && typeof member.user_sailing_v2 === "object" && Object.keys(member.user_sailing_v2).length > 0) {
		if (!member.user_sailing_v2.card_bg) return null;
		const cardBg = member.user_sailing_v2.card_bg;
		const fan = cardBg.fan;
		if (!fan || !fan.is_fan) return null;
		let gradientStyle = "";
		if (fan.color_format && fan.color_format.colors && fan.color_format.gradients) {
			const colors = fan.color_format.colors;
			const gradients = fan.color_format.gradients;
			gradientStyle = `linear-gradient(135deg, ${colors.map((color, index) => `${color} ${gradients[index]}%`).join(", ")})`;
		} else if (fan.color) gradientStyle = fan.color;
		return {
			image: cardBg.image ?? null,
			numPrefix: fan.num_prefix || "",
			numDesc: fan.num_desc || "",
			gradientStyle
		};
	}
	return null;
};
init_src();
init_amagiClient();
init_Config();
const genParams = async (apiURL) => {
	if (Config.cookies.bilibili === "" || Config.cookies.bilibili === null) return "&platform=html5";
	const loginInfo = await bilibiliFetcher.fetchLoginStatus({ typeMode: "strict" });
	const genSign = await wbi_sign(apiURL, Config.cookies.bilibili);
	const qn = [
		6,
		16,
		32,
		64,
		74,
		80,
		112,
		116,
		120,
		125,
		126,
		127
	];
	let isvip;
	loginInfo.data.data.vipStatus === 1 ? isvip = true : isvip = false;
	if (isvip) return `&fnval=16&fourk=1&${genSign}`;
	else return `&qn=${qn[3]}&fnval=16`;
};
const checkCk = async () => {
	if (Config.cookies.bilibili === "" || Config.cookies.bilibili === null) return {
		Status: "!isLogin",
		isVIP: false
	};
	const loginInfo = await bilibiliFetcher.fetchLoginStatus({ typeMode: "strict" });
	let isVIP;
	loginInfo.data.data.vipStatus === 1 ? isVIP = true : isVIP = false;
	if (isVIP) return {
		Status: "isLogin",
		isVIP
	};
	else return {
		Status: "isLogin",
		isVIP
	};
};
init_src();
const getBilibiliID = async (url) => {
	const resp = await axios.get(url, { headers: { "User-Agent": "Apifox/1.0.0 (https://apifox.com)" } });
	const longLink = resp?.request?.res?.responseUrl ?? resp?.config?.url ?? url;
	let result = {};
	let pValue;
	const parsedUrl = new URL(longLink);
	const pParam = parsedUrl.searchParams.get("p");
	if (pParam) {
		pValue = parseInt(pParam, 10);
		if (isNaN(pValue)) pValue = void 0;
	}
	const pathname = parsedUrl.pathname;
	const hostname = parsedUrl.hostname;
	switch (true) {
		case hostname === "t.bilibili.com" && /^\/\d+/.test(pathname) || hostname === "www.bilibili.com" && /^\/opus\/\d+/.test(pathname): {
			const tMatch = hostname === "t.bilibili.com" ? pathname.match(/^\/(\d+)/) : null;
			const opusMatch = hostname === "www.bilibili.com" ? pathname.match(/^\/opus\/(\d+)/) : null;
			const dynamic_id = tMatch ?? opusMatch;
			result = {
				type: "dynamic_info",
				dynamic_id: dynamic_id ? dynamic_id[1] : void 0
			};
			break;
		}
		case /\/bangumi\/play\/(\w+)/.test(longLink): {
			const playMatch = /\/bangumi\/play\/(\w+)/.exec(longLink);
			const id = playMatch ? playMatch[1] : "";
			let realid = "";
			let isEpid = false;
			if (id.startsWith("ss")) realid = id;
			else if (id.startsWith("ep")) {
				realid = id;
				isEpid = true;
			}
			result = {
				type: "bangumi_video_info",
				isEpid,
				realid
			};
			break;
		}
		case /(video\/|video-)([A-Za-z0-9]+)/.test(longLink): {
			const bvideoMatch = /video\/([A-Za-z0-9]+)|bvid=([A-Za-z0-9]+)/.exec(longLink);
			let bvid = bvideoMatch ? bvideoMatch[1] || bvideoMatch[2] : void 0;
			if (bvid && bvid.toLowerCase().startsWith("av")) {
				const avid = parseInt(bvid.replace(/^av/i, ""));
				bvid = (await Client.bilibiliFetcher.convertAvToBv({
					avid,
					typeMode: "strict"
				})).data.data.bvid;
			}
			result = {
				type: "one_video",
				bvid,
				...pValue !== void 0 && { p: pValue }
			};
			break;
		}
		case /festival\/([A-Za-z0-9]+)/.test(longLink): {
			const festivalMatch = /festival\/([A-Za-z0-9]+)\?bvid=([A-Za-z0-9]+)/.exec(longLink);
			result = {
				type: "one_video",
				id: festivalMatch ? festivalMatch[2] : void 0
			};
			break;
		}
		case /play\/(\S+?)\??/.test(longLink): {
			const playMatch = /play\/(\w+)/.exec(longLink);
			const id = playMatch ? playMatch[1] : "";
			const isEpid = false;
			if (id.startsWith("ss")) result.realid = "season_id";
			else if (id.startsWith("ep")) result.realid = "ep_id";
			result = {
				type: "bangumi_video_info",
				isEpid,
				realid: playMatch ? playMatch[1] : ""
			};
			break;
		}
		case /^https:\/\/t\.bilibili\.com\/(\d+)/.test(longLink) || /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.test(longLink): {
			const tMatch = /^https:\/\/t\.bilibili\.com\/(\d+)/.exec(longLink);
			const opusMatch = /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.exec(longLink);
			const dynamic_id = tMatch ?? opusMatch;
			result = {
				type: "dynamic_info",
				dynamic_id: dynamic_id ? dynamic_id[1] : dynamic_id
			};
			break;
		}
		case longLink.includes("live.bilibili.com"): {
			const match = /https?:\/\/live\.bilibili\.com\/(\d+)/.exec(longLink);
			result = {
				type: "live_room_detail",
				room_id: match ? match[1] : void 0
			};
			break;
		}
		default:
			logger.warn("无法获取作品ID");
			break;
	}
	console.log(result);
	return result;
};
await init_utils$1();
await init_amagiClient();
await init_Config();
const bilibiliLogin = async (e) => {
	const qrcodeurl = await bilibiliFetcher.requestLoginQrcode({ typeMode: "strict" });
	const qrimg = await Render("bilibili/qrcodeImg", { share_url: qrcodeurl.data.data.url });
	const base64Data = qrimg[0]?.file;
	if (!base64Data) throw new Error("生成二维码图片失败");
	const cleanBase64 = base64Data.replace(/^base64:\/\//, "");
	const buffer = Buffer.from(cleanBase64, "base64");
	fs.writeFileSync(`${Common.tempDri.default}BilibiliLoginQrcode.png`, buffer);
	const qrcode_key = qrcodeurl.data.data.qrcode_key;
	const messageIds = [];
	const qrcodeMsg = await e.reply(qrimg, { reply: true });
	messageIds.push(qrcodeMsg.messageId);
	const recallMessages = async () => {
		await Promise.all(messageIds.map(async (id) => {
			try {
				await e.bot.recallMsg(e.contact, id);
			} catch {}
		}));
	};
	const handleLoginSuccess = async (responseData) => {
		const setCookieHeader = responseData.data.data.headers["set-cookie"];
		let cookieString;
		if (Array.isArray(setCookieHeader)) cookieString = setCookieHeader.join("; ");
		else cookieString = setCookieHeader || "";
		Config.Modify("cookies", "bilibili", cookieString);
		await e.reply("登录成功！用户登录凭证已保存至cookies.yaml", { reply: true });
		await recallMessages();
	};
	const handleQrScanned = async () => {
		const scannedMsg = await e.reply("二维码已扫码，未确认", { reply: true });
		messageIds.push(scannedMsg.messageId);
		try {
			await e.bot.recallMsg(e.contact, qrcodeMsg.messageId);
		} catch {}
		const index = messageIds.indexOf(qrcodeMsg.messageId);
		if (index > -1) messageIds.splice(index, 1);
	};
	const handleQrExpired = async () => {
		await e.reply("二维码已失效", { reply: true });
		await recallMessages();
	};
	let hasScanned = false;
	while (true) try {
		const qrcodeStatusData = await bilibiliFetcher.checkQrcodeStatus({
			qrcode_key,
			typeMode: "strict"
		});
		switch (qrcodeStatusData.data.data.data.code) {
			case 0:
				await handleLoginSuccess(qrcodeStatusData);
				return;
			case 86038:
				await handleQrExpired();
				return;
			case 86090:
				if (!hasScanned) {
					await handleQrScanned();
					hasScanned = true;
				}
				break;
			case 86101:
			default: break;
		}
		await common.sleep(3e3);
	} catch (error) {
		console.error("轮询二维码状态时发生错误:", error);
		await e.reply("登录过程中发生错误，请重试", { reply: true });
		await recallMessages();
		return;
	}
};
await init_src();
await init_module();
await init_amagiClient();
await init_Config();
var bilibiliBaseHeaders = {
	...BASE_HEADERS,
	Referer: "https://www.bilibili.com",
	Cookie: Config.cookies.bilibili
};
var Bilibilipush = class extends Base {
	force = false;
	constructor(e = {}, force = false) {
		super(e);
		if (this.e.bot?.adapter?.name === "QQBot") {
			e.reply("不支持QQBot，请使用其他适配器");
			return;
		}
		this.force = force;
	}
	async action() {
		await this.syncConfigToDatabase();
		const deletedCount = await cleanOldDynamicCache("bilibili");
		if (deletedCount > 0) logger.info(`已清理 ${deletedCount} 条过期的B站动态缓存记录`);
		const registeredBotIds = karin$1.getAllBotID();
		const filteredPushList = this.filterPushListByRegisteredBots(Config.pushlist.bilibili, registeredBotIds);
		if (filteredPushList.length === 0) {
			logger.warn("没有已注册的 bot 可用于B站推送");
			return true;
		}
		const data$1 = await this.getDynamicList(filteredPushList);
		const pushdata = await this.excludeAlreadyPushed(data$1.willbepushlist);
		if (Object.keys(pushdata).length === 0) return true;
		if (this.force) return await this.forcepush(pushdata);
		else return await this.getdata(pushdata);
	}
	filterPushListByRegisteredBots(pushList, registeredBotIds) {
		if (!pushList || pushList.length === 0) return [];
		const registeredSet = new Set(registeredBotIds);
		const filteredList = [];
		for (const item of pushList) {
			const filteredGroupIds = item.group_id.filter((groupWithBot) => {
				const botId = groupWithBot.split(":")[1];
				const isRegistered = registeredSet.has(botId);
				if (!isRegistered) logger.debug(`Bot ${botId} 未注册，跳过群组 ${groupWithBot.split(":")[0]} 的推送`);
				return isRegistered;
			});
			if (filteredGroupIds.length > 0) filteredList.push({
				...item,
				group_id: filteredGroupIds
			});
			else logger.debug(`UP主 ${item.remark ?? item.host_mid} 的所有推送目标 bot 均未注册，跳过`);
		}
		return filteredList;
	}
	async syncConfigToDatabase() {
		if (!Config.pushlist.bilibili || Config.pushlist.bilibili.length === 0) return;
		await bilibiliDBInstance.syncConfigSubscriptions(Config.pushlist.bilibili);
	}
	async getdata(data$1) {
		for (const dynamicId in data$1) {
			logger.mark(`\n        ${logger.blue("开始处理并渲染B站动态图片")}\n        ${logger.cyan("UP")}: ${logger.green(data$1[dynamicId].remark)}\n        ${logger.cyan("动态id")}：${logger.yellow(dynamicId)}\n        ${logger.cyan("访问地址")}：${logger.green("https://t.bilibili.com/" + dynamicId)}`);
			let skip = await skipDynamic$1(data$1[dynamicId]);
			skip && logger.warn(`动态 https://t.bilibili.com/${dynamicId} 已被处理，跳过`);
			let send_video = true;
			let img$2 = [];
			const dynamicCARDINFO = await this.amagi.bilibili.fetcher.fetchDynamicCard({
				dynamic_id: dynamicId,
				typeMode: "strict"
			});
			const dycrad = dynamicCARDINFO.data.data.card && dynamicCARDINFO.data.data.card.card && JSON.parse(dynamicCARDINFO.data.data.card.card);
			if (!skip) {
				const userINFO = await this.amagi.bilibili.fetcher.fetchUserCard({
					host_mid: data$1[dynamicId].host_mid,
					typeMode: "strict"
				});
				let emojiDATA = await this.amagi.bilibili.fetcher.fetchEmojiList({ typeMode: "strict" });
				emojiDATA = extractEmojisData(emojiDATA.data.data.packages);
				switch (data$1[dynamicId].dynamic_type) {
					case DynamicType.DRAW:
						if (data$1[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null && data$1[dynamicId].Dynamic_Data.modules.module_dynamic && data$1[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
							const name = data$1[dynamicId].Dynamic_Data.modules.module_dynamic.topic.name;
							data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus.summary.rich_text_nodes.unshift({
								orig_text: name,
								text: name,
								type: "topic",
								rid: data$1[dynamicId].Dynamic_Data.modules.module_dynamic.topic.id.toString()
							});
							data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major.opus.summary.text = `${name}\n\n` + data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text;
						}
						img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_DRAW", {
							image_url: dycrad.item.pictures && cover(dycrad.item.pictures),
							text: replacetext(br$1(data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text ?? ""), data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.rich_text_nodes ?? []),
							dianzan: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.like.count),
							pinglun: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
							share: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
							create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
							avatar_url: data$1[dynamicId].Dynamic_Data.modules.module_author.face,
							frame: data$1[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
							share_url: "https://t.bilibili.com/" + data$1[dynamicId].Dynamic_Data.id_str,
							username: checkvip(userINFO.data.data.card),
							fans: Count(userINFO.data.data.follower),
							user_shortid: data$1[dynamicId].host_mid,
							total_favorited: Count(userINFO.data.data.like_num),
							following_count: Count(userINFO.data.data.card.attention),
							decoration_card: generateDecorationCard(data$1[dynamicId].Dynamic_Data.modules.module_author.decoration_card),
							render_time: TimeFormatter.now(),
							imageLayout: Config.bilibili.imageLayout,
							additional: parseAdditionalCard(data$1[dynamicId].Dynamic_Data.modules.module_dynamic.additional),
							dynamicTYPE: "图文动态推送"
						});
						break;
					case DynamicType.WORD:
						if (data$1[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
							const name = data$1[dynamicId].Dynamic_Data.modules.module_dynamic.topic.name;
							data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus.summary.rich_text_nodes.unshift({
								orig_text: name,
								text: name,
								type: "topic",
								rid: data$1[dynamicId].Dynamic_Data.modules.module_dynamic.topic.id.toString()
							});
							data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major.opus.summary.text = `${name}\n\n` + data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text;
						}
						img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_WORD", {
							text: replacetext(br$1(data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text ?? ""), data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.rich_text_nodes ?? []),
							dianzan: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.like.count),
							pinglun: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
							share: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
							create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
							avatar_url: data$1[dynamicId].Dynamic_Data.modules.module_author.face,
							frame: data$1[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
							share_url: "https://t.bilibili.com/" + data$1[dynamicId].Dynamic_Data.id_str,
							username: checkvip(userINFO.data.data.card),
							fans: Count(userINFO.data.data.follower),
							user_shortid: data$1[dynamicId].host_mid,
							total_favorited: Count(userINFO.data.data.like_num),
							following_count: Count(userINFO.data.data.card.attention),
							decoration_card: generateDecorationCard(data$1[dynamicId].Dynamic_Data.modules.module_author.decoration_card),
							render_time: TimeFormatter.now(),
							additional: parseAdditionalCard(data$1[dynamicId].Dynamic_Data.modules.module_dynamic.additional),
							dynamicTYPE: "纯文动态推送"
						});
						break;
					case DynamicType.AV:
						if (data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.type === "MAJOR_TYPE_ARCHIVE") {
							const bvid = data$1[dynamicId].Dynamic_Data?.modules.module_dynamic.major?.archive?.bvid ?? "";
							const INFODATA = await bilibiliFetcher.fetchVideoInfo({
								bvid,
								typeMode: "strict"
							});
							if (INFODATA.data.data.redirect_url) {
								send_video = false;
								logger.debug(`UP主：${INFODATA.data.data.owner.name} 的该动态类型为${logger.yellow("番剧或影视")}，默认跳过不下载，直达：${logger.green(INFODATA.data.data.redirect_url)}`);
							}
							let staff = void 0;
							if (INFODATA.data.data.staff && Array.isArray(INFODATA.data.data.staff)) {
								const currentMid = data$1[dynamicId].host_mid;
								staff = INFODATA.data.data.staff.map((member) => ({
									mid: member.mid,
									title: member.title,
									name: member.name,
									face: member.face,
									follower: member.follower
								}));
								const currentUserIndex = staff.findIndex((member) => member.mid === currentMid);
								if (currentUserIndex > 0) {
									const currentUser = staff.splice(currentUserIndex, 1)[0];
									staff.unshift(currentUser);
								}
							}
							img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_AV", {
								image_url: INFODATA.data.data.pic,
								text: br$1(INFODATA.data.data.title),
								desc: br$1(dycrad.desc),
								dianzan: Count(INFODATA.data.data.stat.like),
								pinglun: Count(INFODATA.data.data.stat.reply),
								share: Count(INFODATA.data.data.stat.share),
								view: Count(dycrad.stat.view),
								coin: Count(dycrad.stat.coin),
								duration_text: data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.archive?.duration_text ?? "0:00",
								create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
								avatar_url: userINFO.data.data.card.face,
								frame: data$1[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
								share_url: "https://www.bilibili.com/video/" + bvid,
								username: checkvip(userINFO.data.data.card),
								fans: Count(userINFO.data.data.follower),
								user_shortid: data$1[dynamicId].host_mid,
								total_favorited: Count(userINFO.data.data.like_num),
								following_count: Count(userINFO.data.data.card.attention),
								render_time: TimeFormatter.now(),
								dynamicTYPE: "视频动态推送",
								dynamic_id: dynamicId,
								staff
							});
						}
						break;
					case DynamicType.LIVE_RCMD:
						img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD", {
							image_url: dycrad.live_play_info.cover,
							text: br$1(dycrad.live_play_info.title),
							liveinf: br$1(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
							username: checkvip(userINFO.data.data.card),
							avatar_url: userINFO.data.data.card.face,
							frame: data$1[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
							fans: Count(userINFO.data.data.follower),
							create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
							now_time: TimeFormatter.now(),
							share_url: "https://live.bilibili.com/" + dycrad.live_play_info.room_id,
							dynamicTYPE: "直播动态推送"
						});
						break;
					case DynamicType.FORWARD: {
						const text = replacetext(br$1(data$1[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data$1[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes);
						let param = {};
						const imgList = [];
						if (!data$1[dynamicId].Dynamic_Data.modules.module_dynamic.desc) {
							for (const richTxtItem of data$1[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) if (richTxtItem.type === "RICH_TEXT_NODE_TYPE_VIEW_PICTURE") for (const pic of richTxtItem.pics) imgList.push(pic.src);
						}
						switch (data$1[dynamicId].Dynamic_Data.orig.type) {
							case DynamicType.AV:
								param = {
									username: checkvip(data$1[dynamicId].Dynamic_Data.orig.modules.module_author),
									pub_action: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pub_action,
									avatar_url: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.face,
									duration_text: data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.duration_text,
									title: data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.title,
									danmaku: data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.danmaku,
									play: data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.play,
									cover: data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.cover,
									create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
									decoration_card: generateDecorationCard(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
									frame: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
								};
								break;
							case DynamicType.DRAW: {
								const dynamicCARD = await bilibiliFetcher.fetchDynamicCard({
									dynamic_id: data$1[dynamicId].Dynamic_Data.orig.id_str,
									typeMode: "strict"
								});
								const cardData = JSON.parse(dynamicCARD.data.data.card.card);
								param = {
									title: data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major?.opus?.title ?? null,
									username: checkvip(data$1[dynamicId].Dynamic_Data.orig.modules.module_author),
									create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
									avatar_url: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.face,
									text: replacetext(br$1(data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
									image_url: cardData.item.pictures && cover(cardData.item.pictures),
									decoration_card: generateDecorationCard(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
									frame: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
								};
								break;
							}
							case DynamicType.WORD:
								param = {
									username: checkvip(data$1[dynamicId].Dynamic_Data.orig.modules.module_author),
									create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
									avatar_url: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.face,
									text: replacetext(br$1(data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
									decoration_card: generateDecorationCard(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
									frame: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
								};
								break;
							case DynamicType.LIVE_RCMD: {
								const liveData = JSON.parse(data$1[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.live_rcmd.content);
								param = {
									username: checkvip(data$1[dynamicId].Dynamic_Data.orig.modules.module_author),
									create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
									avatar_url: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.face,
									decoration_card: generateDecorationCard(data$1[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
									frame: data$1[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image,
									cover: liveData.live_play_info.cover,
									text_large: liveData.live_play_info.watched_show.text_large,
									area_name: liveData.live_play_info.area_name,
									title: liveData.live_play_info.title,
									online: liveData.live_play_info.online
								};
								break;
							}
							case DynamicType.FORWARD:
							default:
								logger.warn(`UP主：${data$1[dynamicId].remark}的${logger.green("转发动态")}转发的原动态类型为「${logger.yellow(data$1[dynamicId].Dynamic_Data.orig.type)}」暂未支持解析`);
								break;
						}
						img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_FORWARD", {
							text,
							dianzan: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.like.count),
							pinglun: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
							share: Count(data$1[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
							create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
							avatar_url: data$1[dynamicId].Dynamic_Data.modules.module_author.face,
							frame: data$1[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
							share_url: "https://t.bilibili.com/" + data$1[dynamicId].Dynamic_Data.id_str,
							username: checkvip(userINFO.data.data.card),
							fans: Count(userINFO.data.data.follower),
							user_shortid: data$1[dynamicId].Dynamic_Data.modules.module_author.mid,
							total_favorited: Count(userINFO.data.data.like_num),
							following_count: Count(userINFO.data.data.card.attention),
							dynamicTYPE: "转发动态推送",
							decoration_card: generateDecorationCard(data$1[dynamicId].Dynamic_Data.modules.module_author.decorate),
							render_time: TimeFormatter.now(),
							original_content: { [data$1[dynamicId].Dynamic_Data.orig.type]: param },
							imgList: imgList.length > 0 ? imgList : null
						});
						break;
					}
					case DynamicType.ARTICLE: {
						const articleInfoBase = await this.amagi.bilibili.fetcher.fetchArticleInfo({
							id: data$1[dynamicId].Dynamic_Data.basic.rid_str,
							typeMode: "strict"
						});
						const articleInfo = await this.amagi.bilibili.fetcher.fetchArticleContent({
							id: data$1[dynamicId].Dynamic_Data.basic.rid_str,
							typeMode: "strict"
						});
						const articleData = articleInfoBase.data.data;
						const articleContent = articleInfo.data.data;
						img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_ARTICLE", {
							username: checkvip(data$1[dynamicId].Dynamic_Data.modules.module_author),
							avatar_url: data$1[dynamicId].Dynamic_Data.modules.module_author.face,
							frame: data$1[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
							create_time: TimeFormatter.toDateTime(data$1[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
							user_shortid: data$1[dynamicId].host_mid,
							fans: Count(userINFO.data.data.follower),
							total_favorited: Count(userINFO.data.data.like_num),
							following_count: Count(userINFO.data.data.card.attention),
							title: articleData.title,
							summary: articleData.summary,
							banner_url: articleData.banner_url || articleData.image_urls && articleData.image_urls[0] || "",
							categories: articleData.categories || [],
							words: articleData.words || 0,
							opus: articleContent.opus || void 0,
							content: articleContent.content || void 0,
							stats: articleData.stats,
							render_time: TimeFormatter.now(),
							share_url: articleContent.dyn_id_str ? `https://www.bilibili.com/opus/${articleContent.dyn_id_str}` : `https://www.bilibili.com/read/cv${articleContent.id}`,
							dynamicTYPE: "专栏动态推送"
						});
						break;
					}
					default:
						skip = true;
						logger.warn(`UP主：${data$1[dynamicId].remark}「${data$1[dynamicId].dynamic_type}」动态类型的暂未支持推送\n动态地址：${"https://t.bilibili.com/" + data$1[dynamicId].Dynamic_Data.id_str}`);
						break;
				}
			}
			for (const target of data$1[dynamicId].targets) {
				let status = null;
				if (!skip) {
					const { groupId, botId } = target;
					const bot = karin$1.getBot(botId);
					const Contact = karin$1.contactGroup(groupId);
					status = await karin$1.sendMsg(botId, Contact, img$2 ? [...img$2] : []);
					if (Config.bilibili.push.parsedynamic && status.messageId) switch (data$1[dynamicId].dynamic_type) {
						case "DYNAMIC_TYPE_AV":
							if (send_video) {
								let correctList;
								let videoSize = "";
								const playUrlData = await this.amagi.bilibili.fetcher.fetchVideoStreamUrl({
									avid: dycrad.aid,
									cid: dycrad.cid,
									typeMode: "strict"
								});
								const simplify = playUrlData.data.data.dash.video.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);
								playUrlData.data.data.dash.video = simplify;
								correctList = await bilibiliProcessVideos({
									accept_description: playUrlData.data.data.accept_description,
									bvid: dynamicCARDINFO.data.data.card.desc.bvid,
									qn: Config.bilibili.push.pushVideoQuality,
									maxAutoVideoSize: Config.bilibili.push.pushMaxAutoVideoSize
								}, simplify, playUrlData.data.data.dash.audio[0].base_url);
								playUrlData.data.data.dash.video = correctList.videoList;
								playUrlData.data.data.accept_description = correctList.accept_description;
								videoSize = await getvideosize(correctList.videoList[0].base_url, playUrlData.data.data.dash.audio[0].base_url, dynamicCARDINFO.data.data.card.desc.bvid);
								if (Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit) && !Config.upload.compress) {
									await karin$1.sendMsg(botId, Contact, [segment.text(`设定的最大上传大小为 ${Config.upload.filelimit}MB\n当前解析到的视频大小为 ${Number(videoSize)}MB\n视频太大了，还是去B站看吧~`), segment.reply(status.messageId)]);
									break;
								}
								logger.mark(`当前处于自动推送状态，解析到的视频大小为 ${logger.yellow(Number(videoSize))} MB`);
								const infoData = await this.amagi.bilibili.fetcher.fetchVideoInfo({
									bvid: dynamicCARDINFO.data.data.card.desc.bvid,
									typeMode: "strict"
								});
								const mp4File = await downloadFile(playUrlData.data?.data?.dash?.video[0].base_url, {
									title: `Bil_V_${infoData.data.data.bvid}.mp4`,
									headers: bilibiliBaseHeaders
								});
								const mp3File = await downloadFile(playUrlData.data?.data?.dash?.audio[0].base_url, {
									title: `Bil_A_${infoData.data.data.bvid}.mp3`,
									headers: bilibiliBaseHeaders
								});
								if (mp4File.filepath && mp3File.filepath) {
									const resultPath = Common.tempDri.video + `Bil_Result_${infoData.data.data.bvid}.mp4`;
									if (await mergeVideoAudio(mp4File.filepath, mp3File.filepath, resultPath)) {
										const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
										fs.renameSync(resultPath, filePath);
										logger.mark(`视频文件重命名完成: ${resultPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
										logger.mark("正在尝试删除缓存文件");
										await Common.removeFile(mp4File.filepath, true);
										await Common.removeFile(mp3File.filepath, true);
										const stats = fs.statSync(filePath);
										const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
										if (fileSizeInMB > Config.upload.groupfilevalue) await uploadFile(this.e, {
											filepath: filePath,
											totalBytes: fileSizeInMB,
											originTitle: `${infoData.data.data.desc.substring(0, 50).replace(/[\\/:\\*\\?"<>\\|\r\n\s]/g, " ")}`
										}, "", {
											useGroupFile: true,
											active: true,
											activeOption: {
												group_id: groupId,
												uin: botId
											}
										});
										else await uploadFile(this.e, {
											filepath: filePath,
											totalBytes: fileSizeInMB
										}, "", {
											active: true,
											activeOption: {
												group_id: groupId,
												uin: botId
											}
										});
									} else {
										await Common.removeFile(mp4File.filepath, true);
										await Common.removeFile(mp3File.filepath, true);
									}
								}
							}
							break;
						case "DYNAMIC_TYPE_DRAW": {
							const imgArray = [];
							const title = data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.title || "bilibili_dynamic";
							const images = data$1[dynamicId].Dynamic_Data.modules.module_dynamic.major && data$1[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items || data$1[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.opus.pics;
							for (const [index, img2] of images.entries()) {
								const imageUrl = await processImageUrl(img2.src ?? img2.url, title, index);
								imgArray.push(segment.image(imageUrl));
							}
							const forwardMsg = common.makeForward(imgArray, botId, bot.account.name);
							bot.sendForwardMsg(Contact, forwardMsg, {
								source: "图片合集",
								summary: `查看${imgArray.length}张图片消息`,
								prompt: "B站图文动态解析结果",
								news: [{ text: "点击查看解析结果" }]
							});
							break;
						}
						case "DYNAMIC_TYPE_ARTICLE": {
							const articleInfo = await this.amagi.bilibili.fetcher.fetchArticleContent({
								id: data$1[dynamicId].Dynamic_Data.basic.rid_str,
								typeMode: "strict"
							});
							const messageElements = [];
							const articleImages = extractArticleImages(articleInfo.data.data);
							const title = articleInfo.data.data.title || "bilibili_article";
							for (const [index, item] of articleImages.entries()) {
								const imageUrl = await processImageUrl(item, title, index);
								messageElements.push(segment.image(imageUrl));
							}
							if (messageElements.length === 1) bot.sendMsg(Contact, messageElements);
							if (messageElements.length > 1) {
								const forwardMsg = common.makeForward(messageElements, botId, bot.account.name);
								bot.sendForwardMsg(Contact, forwardMsg, {
									source: "图片合集",
									summary: `查看${messageElements.length}张图片消息`,
									prompt: "B站专栏动态解析结果",
									news: [{ text: "点击查看解析结果" }]
								});
							}
						}
					}
				}
				if (skip || status && status?.messageId) await bilibiliDBInstance.addDynamicCache(dynamicId, data$1[dynamicId].host_mid, target.groupId, data$1[dynamicId].dynamic_type);
			}
		}
	}
	async getDynamicList(userList) {
		const willbepushlist = {};
		try {
			const filteredUserList = userList.filter((item) => item.switch !== false);
			for (const item of filteredUserList) {
				await common.sleep(2e3);
				logger.debug(`[Bilibili 推送] 开始获取UP: ${item.remark}（${item.host_mid}） 的动态列表`);
				const dynamic_list = await this.amagi.bilibili.fetcher.fetchUserDynamicList({
					host_mid: item.host_mid,
					typeMode: "strict"
				});
				if (dynamic_list.data.data.items.length > 0) for (const dynamic of dynamic_list.data.data.items) {
					const nowSeconds = Math.floor(Date.now() / 1e3);
					const createTime = dynamic.modules.module_author.pub_ts;
					const timeDifference = nowSeconds - createTime;
					const is_top = dynamic.modules.module_tag?.text === "置顶";
					let shouldPush = false;
					const timeDiffHours = Math.round(timeDifference / 3600 * 100) / 100;
					logger.trace(`\n              前期获取该动态基本信息：\n              UP主：${dynamic.modules.module_author.name}\n              动态ID：${dynamic.id_str}\n              发布时间：${TimeFormatter.toDateTime(createTime)}\n              发布时间戳（s）：${createTime}\n              当前时间戳（s）：${nowSeconds}\n              时间差（s）：${timeDifference}s (${timeDiffHours}h)\n              是否置顶：${is_top}\n              是否在一天内：${timeDifference < 86400 ? logger.green("true") : logger.red("false")}\n              `);
					if (is_top && timeDifference < 86400 || timeDifference < 86400) {
						shouldPush = true;
						logger.trace(logger.green(`根据以上判断，shoulPush 为 true，将对该动态纳入当天推送列表：https://t.bilibili.com/${dynamic.id_str}\n`));
					} else logger.trace(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该动态：https://t.bilibili.com/${dynamic.id_str}\n`));
					if (timeDifference < 86400 || shouldPush) {
						const targets = item.group_id.map((groupWithBot) => {
							const [groupId, botId] = groupWithBot.split(":");
							return {
								groupId,
								botId
							};
						});
						if (!willbepushlist[dynamic.id_str]) willbepushlist[dynamic.id_str] = {
							remark: item.remark,
							host_mid: item.host_mid,
							create_time: dynamic.modules.module_author.pub_ts,
							targets,
							Dynamic_Data: dynamic,
							avatar_img: dynamic.modules.module_author.face,
							dynamic_type: dynamic.type
						};
					}
				}
			}
		} catch (error) {
			throw new Error(`获取动态列表失败: ${error}`);
		}
		return { willbepushlist };
	}
	async excludeAlreadyPushed(willBePushList) {
		for (const dynamicId in willBePushList) {
			const pushItem = willBePushList[dynamicId];
			const newTargets = [];
			for (const target of pushItem.targets) if (!await bilibiliDBInstance.isDynamicPushed(dynamicId, pushItem.host_mid, target.groupId)) newTargets.push(target);
			if (newTargets.length > 0) pushItem.targets = newTargets;
			else delete willBePushList[dynamicId];
		}
		return willBePushList;
	}
	async setting(data$1) {
		const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
		const host_mid = Number(data$1.data.card.mid);
		const config$1 = Config.pushlist;
		const groupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
		const botId = this.e.selfId;
		if (!config$1.bilibili) config$1.bilibili = [];
		const existingItem = config$1.bilibili.find((item) => item.host_mid === host_mid);
		const isSubscribed = await bilibiliDBInstance.isSubscribed(host_mid, groupId);
		if (existingItem) {
			let has = false;
			let groupIndexToRemove = -1;
			for (let index = 0; index < existingItem.group_id.length; index++) if (existingItem.group_id[index].split(":")[0] === String(groupId)) {
				has = true;
				groupIndexToRemove = index;
				break;
			}
			if (has) {
				existingItem.group_id.splice(groupIndexToRemove, 1);
				if (isSubscribed) await bilibiliDBInstance.unsubscribeBilibiliUser(groupId, host_mid);
				logger.info(`\n删除成功！${data$1.data.card.name}\nUID：${host_mid}`);
				await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n删除成功！${data$1.data.card.name}\nUID：${host_mid}`);
				if (existingItem.group_id.length === 0) {
					const index = config$1.bilibili.indexOf(existingItem);
					config$1.bilibili.splice(index, 1);
				}
			} else {
				await bilibiliDBInstance.subscribeBilibiliUser(groupId, botId, host_mid, data$1.data.card.name);
				existingItem.group_id.push(`${groupId}:${botId}`);
				await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${data$1.data.card.name}\nUID：${host_mid}`);
				if (Config.bilibili.push.switch === false) await this.e.reply("请发送「#设置B站推送开启」以进行推送");
				logger.info(`\n设置成功！${data$1.data.card.name}\nUID：${host_mid}`);
			}
		} else {
			await bilibiliDBInstance.subscribeBilibiliUser(groupId, botId, host_mid, data$1.data.card.name);
			config$1.bilibili.push({
				switch: true,
				host_mid,
				group_id: [`${groupId}:${botId}`],
				remark: data$1.data.card.name
			});
			await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${data$1.data.card.name}\nUID：${host_mid}`);
			if (Config.bilibili.push.switch === false) await this.e.reply("请发送「#设置B站推送开启」以进行推送");
		}
		Config.Modify("pushlist", "bilibili", config$1.bilibili);
		await this.renderPushList();
	}
	async checkremark() {
		const config$1 = Config.pushlist;
		const abclist = [];
		if (Config.pushlist.bilibili === null || Config.pushlist.bilibili.length === 0) return true;
		for (const i of Config.pushlist.bilibili) {
			const remark = i.remark;
			const group_id = i.group_id;
			const host_mid = i.host_mid;
			if (remark === void 0 || remark === "") abclist.push({
				host_mid,
				group_id
			});
		}
		if (abclist.length > 0) {
			for (const i of abclist) {
				const remark = (await this.amagi.bilibili.fetcher.fetchUserCard({
					host_mid: i.host_mid,
					typeMode: "strict"
				})).data.data.card.name;
				const matchingItemIndex = config$1.bilibili.findIndex((item) => item.host_mid === i.host_mid);
				if (matchingItemIndex !== -1) config$1.bilibili[matchingItemIndex].remark = remark;
			}
			Config.Modify("pushlist", "bilibili", config$1.bilibili);
		}
	}
	async forcepush(data$1) {
		const currentGroupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
		const currentBotId = this.e.selfId;
		if (!this.e.msg.includes("全部")) {
			const subscribedUids = (await bilibiliDBInstance.getGroupSubscriptions(currentGroupId)).map((sub) => sub.host_mid);
			const filteredData = {};
			for (const dynamicId in data$1) if (subscribedUids.includes(data$1[dynamicId].host_mid)) filteredData[dynamicId] = {
				...data$1[dynamicId],
				targets: [{
					groupId: currentGroupId,
					botId: currentBotId
				}]
			};
			await this.getdata(filteredData);
		} else await this.getdata(data$1);
	}
	async renderPushList() {
		await this.syncConfigToDatabase();
		const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
		const subscriptions = await bilibiliDBInstance.getGroupSubscriptions(groupInfo.groupId);
		if (subscriptions.length === 0) {
			await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})\n没有设置任何B站UP推送！\n可使用「#设置B站推送 + UP主UID」进行设置`);
			return;
		}
		const renderOpt = [];
		for (const subscription of subscriptions) {
			const host_mid = subscription.host_mid;
			const userInfo = await this.amagi.bilibili.fetcher.fetchUserCard({
				host_mid,
				typeMode: "strict"
			});
			const switchStatus = (Config.pushlist.bilibili?.find((item) => item.host_mid === host_mid))?.switch !== false;
			renderOpt.push({
				avatar_img: userInfo.data.data.card.face,
				username: userInfo.data.data.card.name,
				host_mid: userInfo.data.data.card.mid,
				fans: Count(userInfo.data.data.follower),
				total_favorited: Count(userInfo.data.data.like_num),
				following_count: Count(userInfo.data.data.card.attention),
				switch: switchStatus
			});
		}
		const img$2 = await Render("bilibili/userlist", {
			renderOpt,
			groupInfo: {
				groupId: groupInfo.groupId || "",
				groupName: groupInfo.groupName || ""
			}
		});
		await this.e.reply(img$2);
	}
};
var br$1 = (data$1) => data$1 = data$1.replace(/\n/g, "<br>");
var checkvip = (member) => member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#EDEDED" : "#606060"}">${member.name}</span>`;
var extractEmojisData = (data$1) => {
	const emojisData = [];
	data$1.forEach((packages) => {
		packages.emote.forEach((emote) => {
			emojisData.push({
				text: emote.text,
				url: emote.url
			});
		});
	});
	return emojisData;
};
var skipDynamic$1 = async (PushItem) => {
	const tags = [];
	if (PushItem.Dynamic_Data.modules.module_dynamic?.desc?.rich_text_nodes) {
		for (const node of PushItem.Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) if (node.type === "topic") {
			if (node.orig_text) tags.push(node.orig_text);
		}
	}
	if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && "orig" in PushItem.Dynamic_Data) {
		if (PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.DRAW || PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.OPUS || PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.LIVE_RCMD) {
			for (const node of PushItem.Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes) if (node.type === "topic") tags.push(node.orig_text);
		}
	}
	logger.debug(`检查动态是否需要过滤：https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`);
	return await bilibiliDBInstance.shouldFilter(PushItem, tags);
};
init_danmaku$1();
init_riskControl();
await init_date_fns();
await init_locale();
var import_heic_decode = __toESM(require_heic_decode(), 1);
var import_jpeg_js = __toESM(require_jpeg_js(), 1);
await init_utils$1();
await init_amagiClient();
await init_Config();
var processCommentEmojis$1 = (text, emojiData) => {
	if (!text || !emojiData || !Array.isArray(emojiData)) return text;
	let processedText = text;
	for (const emoji of emojiData) if (emoji.name && emoji.url && processedText.includes(emoji.name)) {
		const escapedName = emoji.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(escapedName, "g");
		processedText = processedText.replace(regex, `<img src="${emoji.url}" alt="${emoji.name}" />`);
	}
	return processedText.split(/(<img[^>]*>)/).map((part) => {
		if (part.startsWith("<img")) return part;
		if (part.trim()) return `<span>${part}</span>`;
		return part;
	}).join("");
};
var processTextFormatting = (text) => {
	let processedText = text.replace(/\n/g, "<br>");
	processedText = processedText.replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));
	return processedText;
};
var processAtUsers$1 = async (text, userIds) => {
	if (!userIds || !Array.isArray(userIds)) return text;
	const atColor = Common.useDarkTheme() ? "#face15" : "#04498d";
	let processedText = text;
	for (const secUid of userIds) {
		const UserInfoData = await douyinFetcher.fetchUserProfile({
			sec_uid: secUid,
			typeMode: "strict"
		});
		if (UserInfoData.data.user.sec_uid === secUid) {
			const regex = new RegExp(`@${UserInfoData.data.user.nickname?.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`, "g");
			processedText = processedText.replace(regex, (match) => `<span style="color: ${atColor};">${match}</span>`);
		}
	}
	return processedText;
};
var processCommentImage = async (imageUrl) => {
	if (!imageUrl) return null;
	const headers = await new Network({
		url: imageUrl,
		type: "arraybuffer"
	}).getHeaders();
	if (headers["content-type"] && headers["content-type"] === "image/heic") {
		const decoded = await (0, import_heic_decode.default)({ buffer: (await new Network({
			url: imageUrl,
			type: "arraybuffer"
		}).returnResult()).data });
		const jpegImageData = {
			data: Buffer.from(decoded.data),
			width: decoded.width,
			height: decoded.height
		};
		const jpegBuffer = import_jpeg_js.default.encode(jpegImageData, 90).data;
		return `data:image/jpeg;base64,${Buffer.from(jpegBuffer).toString("base64")}`;
	}
	return imageUrl;
};
const douyinComments = async (data$1, emojidata) => {
	let jsonArray = [];
	let imageUrls = [];
	if (data$1.data.comments === null) return {
		CommentsData: [],
		image_url: []
	};
	let id = 1;
	for (const comment of data$1.data.comments) {
		const cid = comment.cid;
		const aweme_id = comment.aweme_id;
		const nickname = comment.user.nickname;
		const userimageurl = comment.user.avatar_thumb.url_list[0];
		let text = comment.text;
		const ip = comment.ip_label ?? "未知";
		const time = comment.create_time;
		const label_type = comment.label_type ?? -1;
		const sticker = comment.sticker ? comment.sticker.animate_url.url_list[0] : null;
		let digg_count = comment.digg_count;
		const imageurl = comment.image_list && comment.image_list?.[0] && comment.image_list?.[0].origin_url && comment.image_list?.[0].origin_url.url_list ? comment.image_list?.[0].origin_url.url_list[0] : null;
		const status_label = comment.label_list?.[0]?.text ?? null;
		const userintextlongid = comment.text_extra && comment.text_extra[0] && comment.text_extra[0].sec_uid ? comment.text_extra.map((extra) => extra.sec_uid) : null;
		const search_text = comment.text_extra && comment.text_extra[0] && comment.text_extra[0].search_text ? comment.text_extra[0].search_text && comment.text_extra.map((extra) => ({
			search_text: extra.search_text,
			search_query_id: extra.search_query_id
		})) : null;
		const relativeTime = getRelativeTimeFromTimestamp$2(time);
		text = processTextFormatting(text);
		text = await processAtUsers$1(text, userintextlongid);
		text = processCommentEmojis$1(text, emojidata);
		const processedImageUrl = await processCommentImage(imageurl);
		if (processedImageUrl) imageUrls.push(processedImageUrl.startsWith("data:image/jpeg;base64,") ? `base64://${processedImageUrl.replace("data:image/jpeg;base64,", "")}` : processedImageUrl);
		if (sticker) imageUrls.push(sticker);
		if (digg_count > 1e4) digg_count = (digg_count / 1e4).toFixed(1) + "w";
		const replyComment = await douyinFetcher.fetchCommentReplies({
			aweme_id,
			comment_id: cid,
			typeMode: "strict",
			number: Config.douyin.subCommentLimit
		});
		const replyCommentsList = [];
		if (replyComment.data.comments && replyComment.data.comments.length > 0) for (const reply of replyComment.data.comments) {
			const replyItem = reply;
			const replyUserintextlongid = replyItem.text_extra && replyItem.text_extra[0] && replyItem.text_extra[0].sec_uid ? replyItem.text_extra.filter((extra) => extra.sec_uid).map((extra) => extra.sec_uid) : null;
			const processedReplyText = await processAtUsers$1(replyItem.text, replyUserintextlongid);
			const replyImageUrl = replyItem.image_list?.[0]?.origin_url?.url_list?.[0];
			const replyStickerUrl = replyItem.sticker?.animate_url?.url_list?.[0];
			let replyImageList = null;
			if (replyImageUrl) {
				const processedReplyImage = await processCommentImage(replyImageUrl);
				if (processedReplyImage) {
					replyImageList = [processedReplyImage];
					imageUrls.push(processedReplyImage.startsWith("data:image/jpeg;base64,") ? `base64://${processedReplyImage.replace("data:image/jpeg;base64,", "")}` : processedReplyImage);
				}
			} else if (replyStickerUrl) {
				replyImageList = [replyStickerUrl];
				imageUrls.push(replyStickerUrl);
			}
			replyCommentsList.push({
				create_time: getRelativeTimeFromTimestamp$2(replyItem.create_time),
				nickname: replyItem.user.nickname,
				userimageurl: replyItem.user.avatar_thumb.url_list[0],
				text: processCommentEmojis$1(processedReplyText, emojidata),
				digg_count: replyItem.digg_count > 1e4 ? (replyItem.digg_count / 1e4).toFixed(1) + "w" : replyItem.digg_count,
				ip_label: replyItem.ip_label,
				text_extra: replyItem.text_extra,
				label_text: replyItem.label_text,
				image_list: replyImageList,
				cid: replyItem.cid,
				reply_to_reply_id: replyItem.reply_to_reply_id,
				reply_to_username: replyItem.reply_to_username
			});
		}
		const commentObj = {
			id: id++,
			replyComment: replyCommentsList.length > 0 ? replyCommentsList : void 0,
			cid,
			aweme_id,
			nickname,
			userimageurl,
			text,
			digg_count,
			ip_label: ip,
			create_time: relativeTime,
			commentimage: processedImageUrl ?? void 0,
			label_type,
			sticker: sticker ?? void 0,
			status_label: status_label ?? void 0,
			is_At_user_id: userintextlongid,
			search_text,
			is_author_digged: comment.is_author_digged ?? false
		};
		jsonArray.push(commentObj);
	}
	jsonArray.sort((a, b) => {
		const aCount = typeof a.digg_count === "string" && a.digg_count.includes("w") ? parseFloat(a.digg_count) * 1e4 : typeof a.digg_count === "number" ? a.digg_count : 0;
		return (typeof b.digg_count === "string" && b.digg_count.includes("w") ? parseFloat(b.digg_count) * 1e4 : typeof b.digg_count === "number" ? b.digg_count : 0) - aCount;
	});
	const indexLabelTypeOne = jsonArray.findIndex((comment) => comment.label_type === 1);
	if (indexLabelTypeOne !== -1) {
		const commentTypeOne = jsonArray.splice(indexLabelTypeOne, 1)[0];
		jsonArray.unshift(commentTypeOne);
	}
	return {
		CommentsData: jsonArray,
		image_url: imageUrls
	};
};
var getRelativeTimeFromTimestamp$2 = (timestamp) => {
	const commentDate = fromUnixTime(timestamp);
	const diffSeconds = differenceInSeconds(/* @__PURE__ */ new Date(), commentDate);
	if (diffSeconds < 30) return "刚刚";
	if (diffSeconds < 7776e3) return formatDistanceToNow(commentDate, {
		locale: zhCN,
		addSuffix: true
	});
	return format(commentDate, "yyyy-MM-dd");
};
await init_utils$1();
await init_Config();
await init_danmaku();
var mp4size = "";
var img;
var DouYin = class extends Base {
	e;
	type;
	is_mp4;
	is_slides;
	forceBurnDanmaku;
	hasProcessedLiveImage;
	get botadapter() {
		return this.e.bot?.adapter?.name;
	}
	constructor(e, iddata, options) {
		super(e);
		this.e = e;
		this.type = iddata?.type;
		this.is_mp4 = iddata?.is_mp4;
		this.is_slides = false;
		this.forceBurnDanmaku = options?.forceBurnDanmaku ?? false;
		this.hasProcessedLiveImage = false;
	}
	async DouyinHandler(data$1) {
		if (Config.douyin.tip) this.e.reply("检测到抖音链接，开始解析");
		switch (this.type) {
			case "one_work": {
				const VideoData = await this.amagi.douyin.fetcher.parseWork({
					aweme_id: data$1.aweme_id,
					typeMode: "strict"
				});
				const CommentsData = await this.amagi.douyin.fetcher.fetchWorkComments({
					aweme_id: data$1.aweme_id,
					number: Config.douyin.numcomment,
					typeMode: "strict"
				});
				this.is_slides = VideoData.data.aweme_detail.is_slides === true;
				let g_video_url = "";
				let g_title;
				let imagenum = 0;
				const image_res = [];
				if (this.is_mp4 === false) switch (true) {
					case this.is_slides === false && VideoData.data.aweme_detail.images !== null: {
						const image_data = [];
						const imageres = [];
						let image_url = "";
						const images = VideoData.data.aweme_detail.images ?? [];
						if (images.some((item) => item.clip_type !== 2)) {
							const processedImages = [];
							const temp = [];
							g_title = VideoData.data.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:*?"<>|\r\n]/g, " ");
							let liveimgbgm = null;
							let bgmContext = null;
							const mergeMode = Config.douyin.liveImageMergeMode ?? "independent";
							if (VideoData.data.aweme_detail.music) {
								let mp3Path = "";
								if (VideoData.data.aweme_detail.music.play_url.uri === "") mp3Path = JSON.parse(VideoData.data.aweme_detail.music.extra).original_song_url;
								else mp3Path = VideoData.data.aweme_detail.music.play_url.uri;
								liveimgbgm = await downloadFile(mp3Path, {
									title: `Douyin_tmp_A_${Date.now()}.mp3`,
									headers: this.headers
								});
								temp.push(liveimgbgm);
								if (mergeMode === "continuous") bgmContext = await createLiveImageContext(liveimgbgm.filepath);
							}
							for (const [index, imageItem] of images.entries()) {
								imagenum++;
								if (imageItem.clip_type === 2 || imageItem.clip_type === void 0) {
									image_url = imageItem.url_list[2] || imageItem.url_list[1];
									const imageUrl = await processImageUrl(image_url, g_title, index);
									processedImages.push(segment.image(imageUrl));
									if (Config.app.removeCache === false) {
										mkdirSync(`${Common.tempDri.images}${g_title}`);
										const path$1 = `${Common.tempDri.images}${g_title}/${index + 1}.png`;
										await new Network({
											url: image_url,
											type: "arraybuffer"
										}).getData().then((data$2) => fs.promises.writeFile(path$1, Buffer.from(data$2)));
									}
									continue;
								}
								const liveimg = await downloadFile(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${imageItem.video.play_addr_h264.uri}&ratio=1080p&line=0`, {
									title: `Douyin_tmp_V_${Date.now()}.mp4`,
									headers: this.headers
								});
								if (liveimg.filepath) {
									const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
									let success;
									const loopCount = imageItem.clip_type === 4 ? 1 : 3;
									if (!liveimgbgm) if (loopCount > 1) success = await loopVideo(liveimg.filepath, outputPath, loopCount);
									else {
										fs.renameSync(liveimg.filepath, outputPath);
										success = true;
									}
									else if (mergeMode === "continuous" && bgmContext) {
										const result = await mergeLiveImageContinuous({
											videoPath: liveimg.filepath,
											outputPath,
											loopCount
										}, bgmContext);
										success = result.success;
										bgmContext = result.context;
									} else success = await mergeLiveImageIndependent({
										videoPath: liveimg.filepath,
										outputPath,
										loopCount
									}, liveimgbgm.filepath);
									if (success) {
										const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
										fs.renameSync(outputPath, filePath);
										logger.mark(`视频文件重命名完成: ${outputPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
										logger.mark("正在尝试删除缓存文件");
										await Common.removeFile(liveimg.filepath, true);
										temp.push({
											filepath: filePath,
											totalBytes: 0
										});
										processedImages.push(segment.video("file://" + filePath));
										if (imageItem.clip_type === 5 && imageItem.url_list?.[0]) {
											const imageUrl = await processImageUrl(imageItem.url_list[0], g_title, index);
											processedImages.push(segment.image(imageUrl));
										}
									} else await Common.removeFile(liveimg.filepath, true);
								}
							}
							const Element = common.makeForward(processedImages, this.e.sender.userId, this.e.sender.nick);
							try {
								await this.e.bot.sendForwardMsg(this.e.contact, Element, {
									source: "图集内容",
									summary: `查看${Element.length}张图片/视频消息`,
									prompt: "抖音图集解析结果",
									news: [{ text: "点击查看解析结果" }]
								});
							} catch (error) {
								await this.e.reply(JSON.stringify(error, null, 2));
							} finally {
								for (const item of temp) await Common.removeFile(item.filepath, true);
							}
							this.hasProcessedLiveImage = true;
						} else {
							for (const [index, imageItem] of images.entries()) {
								image_url = imageItem.url_list[2] || imageItem.url_list[1];
								g_title = VideoData.data.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:*?"<>|\r\n]/g, " ");
								const imageUrl = await processImageUrl(image_url, g_title, index);
								imageres.push(segment.image(imageUrl));
								imagenum++;
								if (Config.app.removeCache === false) {
									mkdirSync(`${Common.tempDri.images}${g_title}`);
									const path$1 = `${Common.tempDri.images}${g_title}/${index + 1}.png`;
									await new Network({
										url: image_url,
										type: "arraybuffer"
									}).getData().then((data$2) => fs.promises.writeFile(path$1, Buffer.from(data$2)));
								}
							}
							const res = common.makeForward(imageres, this.e.sender.userId, this.e.sender.nick);
							image_data.push(res);
							image_res.push(image_data);
							if (imageres.length === 1) {
								const imageUrl = await processImageUrl(image_url, g_title);
								await this.e.reply(segment.image(imageUrl));
							} else await this.e.bot.sendForwardMsg(this.e.contact, res, {
								source: "图片合集",
								summary: `查看${res.length}张图片消息`,
								prompt: "抖音图集解析结果",
								news: [{ text: "点击查看解析结果" }]
							});
						}
						break;
					}
					case VideoData.data.aweme_detail.is_slides === true && VideoData.data.aweme_detail.images !== null: {
						const images = [];
						const temp = [];
						let liveimgbgm = null;
						let bgmContext = null;
						const mergeMode = Config.douyin.liveImageMergeMode ?? "independent";
						if (VideoData.data.aweme_detail.music) {
							let mp3Path = "";
							if (VideoData.data.aweme_detail.music.play_url.uri === "") mp3Path = JSON.parse(VideoData.data.aweme_detail.music.extra).original_song_url;
							else mp3Path = VideoData.data.aweme_detail.music.play_url.uri;
							liveimgbgm = await downloadFile(mp3Path, {
								title: `Douyin_tmp_A_${Date.now()}.mp3`,
								headers: this.headers
							});
							temp.push(liveimgbgm);
							if (mergeMode === "continuous") bgmContext = await createLiveImageContext(liveimgbgm.filepath);
						}
						const images1 = VideoData.data.aweme_detail.images ?? [];
						if (!images1.length) logger.debug("未获取到合辑的图片数据");
						for (const [index, item] of images1.entries()) {
							imagenum++;
							if (item.clip_type === 2 || item.clip_type === void 0) {
								const imageUrl = await processImageUrl(item.url_list[0], g_title, index);
								images.push(segment.image(imageUrl));
								continue;
							}
							const liveimg = await downloadFile(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`, {
								title: `Douyin_tmp_V_${Date.now()}.mp4`,
								headers: this.headers
							});
							if (liveimg.filepath) {
								const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
								let success;
								const loopCount = item.clip_type === 4 ? 1 : 3;
								if (!liveimgbgm) if (loopCount > 1) success = await loopVideo(liveimg.filepath, outputPath, loopCount);
								else {
									fs.renameSync(liveimg.filepath, outputPath);
									success = true;
								}
								else if (mergeMode === "continuous" && bgmContext) {
									const result = await mergeLiveImageContinuous({
										videoPath: liveimg.filepath,
										outputPath,
										loopCount
									}, bgmContext);
									success = result.success;
									bgmContext = result.context;
								} else success = await mergeLiveImageIndependent({
									videoPath: liveimg.filepath,
									outputPath,
									loopCount
								}, liveimgbgm.filepath);
								if (success) {
									const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
									fs.renameSync(outputPath, filePath);
									logger.mark(`视频文件重命名完成: ${outputPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
									logger.mark("正在尝试删除缓存文件");
									await Common.removeFile(liveimg.filepath, true);
									temp.push({
										filepath: filePath,
										totalBytes: 0
									});
									images.push(segment.video("file://" + filePath));
									if (item.clip_type === 5 && item.url_list?.[0]) {
										const imageUrl = await processImageUrl(item.url_list[0], g_title, index);
										images.push(segment.image(imageUrl));
									}
								} else await Common.removeFile(liveimg.filepath, true);
							}
						}
						const Element = common.makeForward(images, this.e.sender.userId, this.e.sender.nick);
						try {
							await this.e.bot.sendForwardMsg(this.e.contact, Element, {
								source: "合辑内容",
								summary: `查看${Element.length}张图片/视频消息`,
								prompt: "抖音合辑解析结果",
								news: [{ text: "点击查看解析结果" }]
							});
						} catch (error) {
							await this.e.reply(JSON.stringify(error, null, 2));
						} finally {
							for (const item of temp) await Common.removeFile(item.filepath, true);
						}
						break;
					}
				}
				if (VideoData.data.aweme_detail.music) {
					const music = VideoData.data.aweme_detail.music;
					let music_url = "";
					if (music.play_url.uri === "") music_url = JSON.parse(music.extra).original_song_url;
					else music_url = music.play_url.uri;
					if (this.is_mp4 === false && Config.app.removeCache === false && music_url !== void 0) try {
						const path$1 = Common.tempDri.images + `${g_title}/BGM.mp3`;
						await new Network({
							url: music_url,
							type: "arraybuffer"
						}).getData().then((data$2) => fs.promises.writeFile(path$1, Buffer.from(data$2)));
					} catch (error) {
						console.log(error);
					}
					music_url && this.is_mp4 === false && music_url !== void 0 && !this.hasProcessedLiveImage && await this.e.reply(segment.record(music_url, false));
				}
				let FPS;
				let video = null;
				if (this.is_mp4) {
					video = VideoData.data.aweme_detail.video;
					FPS = video.bit_rate[0]?.FPS ?? "获取失败";
					logger.debug(`开始排除不符合条件的视频分辨率；\n\n              共拥有${logger.yellow(video.bit_rate.length)}个视频源\n\n              视频ID：${logger.green(VideoData.data.aweme_detail.aweme_id)}\n\n              分享链接：${logger.green(VideoData.data.aweme_detail.share_url)}\n              `);
					video.bit_rate = douyinProcessVideos(video.bit_rate, Config.douyin.videoQuality, Config.douyin.maxAutoVideoSize);
					g_video_url = await new Network({
						url: video.bit_rate[0].play_addr.url_list[2],
						headers: {
							...this.headers,
							Referer: video.bit_rate[0].play_addr.url_list[0]
						}
					}).getLongLink();
					g_title = VideoData.data.aweme_detail.preview_title.substring(0, 80).replace(/[\\/:*?"<>|\r\n]/g, " ");
					mp4size = (video.bit_rate[0].play_addr.data_size / (1024 * 1024)).toFixed(2);
				}
				if (Config.douyin.sendContent.includes("info")) if (Config.douyin.videoInfoMode === "text") {
					const replyContent = [];
					const { digg_count, share_count, collect_count, comment_count, recommend_count } = VideoData.data.aweme_detail.statistics;
					const coverUrl = await processImageUrl(this.is_mp4 ? VideoData.data.aweme_detail.video.animated_cover?.url_list[0] ?? VideoData.data.aweme_detail.video.cover.url_list[0] : VideoData.data.aweme_detail.images[0].url_list[0], VideoData.data.aweme_detail.desc);
					const contentMap = {
						cover: segment.image(coverUrl),
						title: segment.text(`\n📺 标题: ${VideoData.data.aweme_detail.desc}\n`),
						author: segment.text(`\n👤 作者: ${VideoData.data.aweme_detail.author.nickname}\n`),
						stats: segment.text(formatVideoStats(digg_count, share_count, collect_count, comment_count, recommend_count))
					};
					[
						"cover",
						"title",
						"author",
						"stats"
					].forEach((item) => {
						if (Config.douyin.displayContent.includes(item) && contentMap[item]) replyContent.push(contentMap[item]);
					});
					if (replyContent.length > 0) this.e.reply(replyContent);
				} else {
					const userProfile = await this.amagi.douyin.fetcher.fetchUserProfile({
						sec_uid: VideoData.data.aweme_detail.author.sec_uid,
						typeMode: "strict"
					});
					const videoInfoImg = await Render("douyin/videoInfo", {
						desc: VideoData.data.aweme_detail.desc,
						statistics: VideoData.data.aweme_detail.statistics,
						aweme_id: VideoData.data.aweme_detail.aweme_id,
						author: {
							name: VideoData.data.aweme_detail.author.nickname,
							avatar: VideoData.data.aweme_detail.author.avatar_thumb.url_list[0],
							short_id: VideoData.data.aweme_detail.author.unique_id === "" ? VideoData.data.aweme_detail.author.short_id : VideoData.data.aweme_detail.author.unique_id
						},
						user_profile: userProfile.success ? {
							ip_location: userProfile.data.user.ip_location,
							follower_count: userProfile.data.user.follower_count,
							total_favorited: userProfile.data.user.total_favorited,
							aweme_count: userProfile.data.user.aweme_count,
							gender: userProfile.data.user.gender ?? 0,
							user_age: userProfile.data.user.user_age ?? 0
						} : void 0,
						image_url: this.is_mp4 ? VideoData.data.aweme_detail.video.animated_cover?.url_list[0] ?? VideoData.data.aweme_detail.video.cover_original_scale?.url_list[0] ?? VideoData.data.aweme_detail.video.cover.url_list[0] : VideoData.data.aweme_detail.images[0].url_list[0],
						cover_size: this.is_mp4 ? VideoData.data.aweme_detail.video.cover ? {
							width: VideoData.data.aweme_detail.video.cover_original_scale.width,
							height: VideoData.data.aweme_detail.video.cover_original_scale.height
						} : void 0 : VideoData.data.aweme_detail.images?.[0] ? {
							width: VideoData.data.aweme_detail.images[0].width,
							height: VideoData.data.aweme_detail.images[0].height
						} : void 0,
						create_time: VideoData.data.aweme_detail.create_time,
						music: VideoData.data.aweme_detail.music ? {
							author: VideoData.data.aweme_detail.music.author,
							title: VideoData.data.aweme_detail.music.title,
							cover: VideoData.data.aweme_detail.music.cover_hd?.url_list[0] ?? VideoData.data.aweme_detail.music.cover_large?.url_list[0]
						} : void 0,
						video: this.is_mp4 ? {
							duration: VideoData.data.aweme_detail.video.duration,
							width: VideoData.data.aweme_detail.video.width,
							height: VideoData.data.aweme_detail.video.height,
							ratio: VideoData.data.aweme_detail.video.ratio
						} : void 0
					});
					this.e.reply(videoInfoImg);
				}
				if (Config.douyin.sendContent.includes("comment")) {
					const douyinCommentsRes = await douyinComments(CommentsData, Emoji((await this.amagi.douyin.fetcher.fetchEmojiList({ typeMode: "loose" })).data));
					if (!douyinCommentsRes.CommentsData.length) await this.e.reply("这个作品没有评论 ~");
					else {
						const suggest = [];
						if (VideoData.data.aweme_detail?.suggest_words?.suggest_words) {
							for (const item of VideoData.data.aweme_detail.suggest_words.suggest_words) if (item.words && item.scene === "comment_top_rec") for (const v of item.words) v.word && suggest.push(v.word);
						}
						const img$2 = await Render("douyin/comment", {
							Type: this.is_mp4 ? "视频" : this.is_slides ? "合辑" : "图集",
							CommentsData: douyinCommentsRes.CommentsData,
							CommentLength: Config.douyin.realCommentCount ? VideoData.data.aweme_detail.statistics.comment_count : douyinCommentsRes.CommentsData.length ?? 0,
							share_url: this.is_mp4 ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0` : VideoData.data.aweme_detail.share_url,
							VideoSize: mp4size,
							VideoFPS: FPS,
							ImageLength: imagenum,
							Region: VideoData.data.aweme_detail.region,
							suggestWrod: suggest,
							Resolution: this.is_mp4 && video ? `${video.bit_rate[0].play_addr.width} x ${video.bit_rate[0].play_addr.height}` : null,
							maxDepth: Config.douyin.subCommentDepth
						});
						const messageElements = [];
						if (Config.douyin.commentImageCollection && douyinCommentsRes.image_url.length > 0) {
							for (const [index, v] of douyinCommentsRes.image_url.entries()) {
								const imageUrl = await processImageUrl(v, VideoData.data.aweme_detail.desc, index);
								messageElements.push(segment.image(imageUrl));
							}
							const res = common.makeForward(messageElements, this.e.sender.userId, this.e.sender.nick);
							this.e.bot.sendForwardMsg(this.e.contact, res, {
								source: "评论图片收集",
								summary: `查看${messageElements.length}张图片`,
								prompt: "抖音评论解析结果",
								news: [{ text: "点击查看解析结果" }]
							});
						}
						this.e.reply(img$2);
					}
				}
				if (this.is_mp4 && Config.douyin.sendContent.includes("video")) {
					let danmakuList = [];
					if ((this.forceBurnDanmaku || Config.douyin.burnDanmaku) && video) try {
						const duration = video.duration;
						logger.debug(`[抖音] 视频时长: ${duration}ms, 开始获取弹幕数据`);
						const danmakuData = await this.amagi.douyin.fetcher.fetchDanmakuList({
							aweme_id: data$1.aweme_id,
							duration,
							typeMode: "strict"
						});
						if (danmakuData.data?.danmaku_list) {
							danmakuList = danmakuData.data.danmaku_list;
							logger.debug(`[抖音] 获取到 ${danmakuList.length} 条弹幕`);
						}
					} catch (err) {
						logger.warn("[抖音] 获取弹幕失败，将不烧录弹幕", err);
					}
					if ((this.forceBurnDanmaku || Config.douyin.burnDanmaku) && danmakuList.length > 0) {
						const videoFile = await downloadFile(g_video_url, {
							title: `Douyin_V_tmp_${Date.now()}.mp4`,
							headers: {
								...BASE_HEADERS,
								Referer: g_video_url
							}
						});
						if (videoFile.filepath) {
							const resultPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
							logger.mark(`[抖音] 开始烧录 ${danmakuList.length} 条弹幕...`);
							if (await burnDouyinDanmaku(videoFile.filepath, danmakuList, resultPath, {
								danmakuArea: Config.douyin.danmakuArea,
								verticalMode: Config.douyin.verticalMode,
								videoCodec: Config.douyin.videoCodec,
								danmakuFontSize: Config.douyin.danmakuFontSize,
								danmakuOpacity: Config.douyin.danmakuOpacity
							})) {
								const filePath = Common.tempDri.video + `${Config.app.removeCache ? "tmp_" + Date.now() : g_title}.mp4`;
								fs.renameSync(resultPath, filePath);
								await Common.removeFile(videoFile.filepath, true);
								const stats = fs.statSync(filePath);
								const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
								if (fileSizeInMB > Config.upload.groupfilevalue) await uploadFile(this.e, {
									filepath: filePath,
									totalBytes: fileSizeInMB,
									originTitle: g_title || ""
								}, "", { useGroupFile: true });
								else await uploadFile(this.e, {
									filepath: filePath,
									totalBytes: fileSizeInMB,
									originTitle: g_title || ""
								}, "");
							} else await Common.removeFile(videoFile.filepath, true);
						}
					} else await downloadVideo(this.e, {
						video_url: g_video_url,
						title: {
							timestampTitle: `tmp_${Date.now()}.mp4`,
							originTitle: `${g_title}.mp4`
						},
						headers: {
							...BASE_HEADERS,
							Referer: g_video_url
						}
					}, { message_id: this.e.messageId });
				}
				return true;
			}
			case "user_dynamic": {
				const rawData = await this.amagi.douyin.fetcher.fetchUserVideoList({
					sec_uid: data$1.sec_uid,
					typeMode: "strict"
				});
				const user = (await this.amagi.douyin.fetcher.fetchUserProfile({
					sec_uid: data$1.sec_uid,
					typeMode: "strict"
				})).data.user;
				const videos = rawData.data.aweme_list.map((aweme) => {
					const isVideo = aweme.aweme_type === 0 || aweme.media_type === 0;
					return {
						aweme_id: aweme.aweme_id,
						is_top: aweme.is_top === 1,
						title: aweme.desc || aweme.item_title || "无标题",
						cover: aweme.video.cover.url_list[0],
						duration: aweme.video?.duration || 0,
						create_time: aweme.create_time,
						statistics: {
							like_count: aweme.statistics.digg_count,
							comment_count: aweme.statistics.comment_count,
							share_count: aweme.statistics.share_count,
							collect_count: aweme.statistics.collect_count
						},
						is_video: isVideo,
						music: aweme.music ? {
							title: aweme.music.title || "",
							author: aweme.music.author || ""
						} : void 0
					};
				});
				const img$2 = await Render("douyin/user_profile", {
					user: {
						head_image: user.cover_and_head_image_info.profile_cover_list.length > 0 ? user.cover_and_head_image_info.profile_cover_list[0].cover_url?.url_list[0] || null : null,
						nickname: user.nickname,
						short_id: user.unique_id === "" ? user.short_id : user.unique_id,
						avatar: user.avatar_larger?.url_list?.[0] || user.avatar_thumb?.url_list?.[0] || "",
						signature: user.signature,
						follower_count: user.follower_count,
						following_count: user.following_count,
						total_favorited: user.total_favorited,
						verified: !!user.custom_verify || !!user.enterprise_verify_reason,
						ip_location: user.ip_location
					},
					videos: videos.slice(0, 16)
				});
				this.e.reply(img$2);
				return true;
			}
			case "music_work": {
				const MusicData = await this.amagi.douyin.fetcher.fetchMusicInfo({
					music_id: data$1.music_id,
					typeMode: "strict"
				});
				const sec_uid = MusicData.data.music_info.sec_uid;
				const UserData = await this.amagi.douyin.fetcher.fetchUserProfile({
					sec_uid,
					typeMode: "strict"
				});
				if (!MusicData.data.music_info.play_url) {
					await this.e.reply("解析错误！该音乐抖音未提供下载链接，无法下载", { reply: true });
					return true;
				}
				img = await Render("douyin/musicinfo", {
					image_url: MusicData.data.music_info.cover_hd.url_list[0],
					desc: MusicData.data.music_info.title,
					music_id: MusicData.data.music_info.id.toString(),
					create_time: Time(0),
					user_count: Count(MusicData.data.music_info.user_count),
					avater_url: MusicData.data.music_info.avatar_large?.url_list[0] || UserData.data.user.avatar_larger.url_list[0],
					fans: UserData.data.user.mplatform_followers_count || UserData.data.user.follower_count,
					following_count: UserData.data.user.following_count,
					total_favorited: UserData.data.user.total_favorited,
					user_shortid: UserData.data.user.unique_id === "" ? UserData.data.user.short_id : UserData.data.user.unique_id,
					share_url: MusicData.data.music_info.play_url.uri,
					username: MusicData.data.music_info?.original_musician_display_name || MusicData.data.music_info.owner_nickname === "" ? MusicData.data.music_info.author : MusicData.data.music_info.owner_nickname
				});
				await this.e.reply([
					...img,
					`\n正在上传 ${MusicData.data.music_info.title}\n`,
					`作曲: ${MusicData.data.music_info.original_musician_display_name || MusicData.data.music_info.owner_nickname === "" ? MusicData.data.music_info.author : MusicData.data.music_info.owner_nickname}\n`,
					`music_id: ${MusicData.data.music_info.id}`
				]);
				await this.e.reply(segment.record(MusicData.data.music_info.play_url.uri, false));
				return true;
			}
			case "live_room_detail": {
				const UserInfoData = await this.amagi.douyin.fetcher.fetchUserProfile({
					sec_uid: data$1.sec_uid,
					typeMode: "strict"
				});
				if (UserInfoData.data.user.live_status === 1) {
					if (!UserInfoData.data.user?.live_status || UserInfoData.data.user.live_status !== 1) logger.error((UserInfoData?.data?.user?.nickname ?? "用户") + "当前未在直播");
					if (!UserInfoData.data.user.room_data) logger.error("未获取到直播间信息！");
					const room_data = JSON.parse(UserInfoData.data.user.room_data);
					const live_data = await this.amagi.douyin.fetcher.fetchLiveRoomInfo({
						room_id: UserInfoData.data.user.room_id_str,
						web_rid: room_data.owner.web_rid,
						typeMode: "strict"
					});
					const img$2 = await Render("douyin/live", {
						image_url: live_data.data.data[0].cover?.url_list[0],
						text: live_data.data.data[0].title,
						liveinf: `${live_data.data.partition_road_map.partition.title} | 房间号: ${room_data.owner.web_rid}`,
						"在线观众": Count(Number(live_data.data.data[0].room_view_stats?.display_value)),
						"总观看次数": Count(Number(live_data.data.data[0].stats?.total_user_str)),
						username: UserInfoData.data.user.nickname,
						avater_url: UserInfoData.data.user.avatar_larger.url_list[0],
						fans: Count(UserInfoData.data.user.follower_count),
						share_url: "https://live.douyin.com/" + room_data.owner.web_rid,
						dynamicTYPE: "直播间信息"
					});
					await this.e.reply(img$2);
				} else this.e.reply(`「${UserInfoData.data.user.nickname}」\n未开播，正在休息中~`);
				return true;
			}
			default: break;
		}
	}
};
const douyinProcessVideos = (videos, videoQuality, maxAutoVideoSize) => {
	const mp4Videos = videos.filter((video) => video.format !== "dash");
	if (mp4Videos.length === 0) {
		logger.warn("没有找到可用的 mp4 格式视频");
		return videos.slice(0, 1);
	}
	logger.debug(`过滤后剩余 ${mp4Videos.length} 个 mp4 格式视频`);
	const getQualityLevel = (gearName) => {
		if (gearName.includes("lowest_4") || gearName.includes("2160")) return "4k";
		if (gearName.includes("1440") || gearName.includes("2k")) return "2k";
		if (gearName.includes("1080")) return "1080p";
		if (gearName.includes("720")) return "720p";
		if (gearName.includes("540")) return "540p";
		return "540p";
	};
	const videosByQuality = /* @__PURE__ */ new Map();
	mp4Videos.forEach((video) => {
		const quality = getQualityLevel(video.gear_name);
		if (!videosByQuality.has(quality)) videosByQuality.set(quality, []);
		videosByQuality.get(quality).push(video);
	});
	videosByQuality.forEach((videos$1) => {
		videos$1.sort((a, b) => b.play_addr.data_size - a.play_addr.data_size);
	});
	if (videoQuality === "adapt") {
		const sizeLimitBytes = (maxAutoVideoSize || Config.upload.filelimit) * 1024 * 1024;
		for (const quality of [
			"4k",
			"2k",
			"1080p",
			"720p",
			"540p"
		]) {
			const qualityVideos = videosByQuality.get(quality);
			if (qualityVideos && qualityVideos.length > 0) {
				const suitableVideo = qualityVideos.find((video) => video.play_addr.data_size <= sizeLimitBytes);
				if (suitableVideo) {
					logger.debug(`自动选择画质: ${quality}, 文件大小: ${(suitableVideo.play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`);
					return [suitableVideo];
				}
			}
		}
		let smallestVideo = mp4Videos[0];
		mp4Videos.forEach((video) => {
			if (video.play_addr.data_size < smallestVideo.play_addr.data_size) smallestVideo = video;
		});
		logger.debug(`未找到符合大小限制的视频，选择最小视频: ${(smallestVideo.play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`);
		return [smallestVideo];
	}
	const targetQuality = videoQuality;
	const targetVideos = videosByQuality.get(targetQuality);
	if (targetVideos && targetVideos.length > 0) {
		logger.debug(`选择固定画质: ${targetQuality}, 文件大小: ${(targetVideos[0].play_addr.data_size / (1024 * 1024)).toFixed(2)}MB`);
		return [targetVideos[0]];
	}
	const qualityPriority = [
		"4k",
		"2k",
		"1080p",
		"720p",
		"540p"
	];
	const targetIndex = qualityPriority.indexOf(targetQuality);
	for (let i = targetIndex + 1; i < qualityPriority.length; i++) {
		const fallbackVideos = videosByQuality.get(qualityPriority[i]);
		if (fallbackVideos && fallbackVideos.length > 0) {
			logger.debug(`目标画质 ${targetQuality} 不可用，降级到: ${qualityPriority[i]}`);
			return [fallbackVideos[0]];
		}
	}
	for (let i = targetIndex - 1; i >= 0; i--) {
		const fallbackVideos = videosByQuality.get(qualityPriority[i]);
		if (fallbackVideos && fallbackVideos.length > 0) {
			logger.debug(`目标画质 ${targetQuality} 不可用，升级到: ${qualityPriority[i]}`);
			return [fallbackVideos[0]];
		}
	}
	logger.warn("未找到任何匹配的画质，返回默认视频");
	return [mp4Videos[0]];
};
const Time = (delay$1) => {
	const currentDate = /* @__PURE__ */ new Date();
	currentDate.setHours(currentDate.getHours() + delay$1);
	return `${currentDate.getFullYear().toString()}/${(currentDate.getMonth() + 1).toString()}/${String(currentDate.getDate()).padStart(2, "0")} ${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
};
const Emoji = (data$1) => {
	const ListArray = [];
	for (const i of data$1.emoji_list) {
		const Objject = {
			name: i.display_name,
			url: i.emoji_url.url_list[0]
		};
		ListArray.push(Objject);
	}
	return ListArray;
};
var formatVideoStats = (digg_count, share_count, collect_count, comment_count, recommend_count) => {
	const diggText = `❤ 点赞: ${Count(digg_count)}`;
	const shareText = `🔄 转发: ${Count(share_count)}`;
	const collectText = `⭐ 收藏: ${Count(collect_count)}`;
	const commentText = `💬 评论: ${Count(comment_count)}`;
	const recommendText = `👍 推荐: ${Count(recommend_count)}`;
	const firstColItems = [diggText, shareText];
	const maxFirstColLength = Math.max(...firstColItems.map((item) => getStringDisplayWidth(item)));
	return `${alignTwoColumns(diggText, shareText, maxFirstColLength)}\n${alignTwoColumns(collectText, commentText, maxFirstColLength)}\n${alignTwoColumns(recommendText, "", maxFirstColLength)}`;
};
var alignTwoColumns = (col1, col2, targetLength) => {
	const spacesNeeded = targetLength - getStringDisplayWidth(col1) + 5;
	return col1 + " ".repeat(spacesNeeded) + col2;
};
var getStringDisplayWidth = (str) => {
	let width = 0;
	for (let i = 0; i < str.length; i++) {
		const code = str.codePointAt(i);
		if (!code) continue;
		if (code > 65535) {
			width += 2;
			i++;
		} else if (code >= 12288 && code <= 40959 || code >= 65280 && code <= 65519 || code === 8230 || code === 8212 || code >= 11904 && code <= 12031 || code >= 12288 && code <= 12351 || code >= 12736 && code <= 12783 || code >= 12800 && code <= 13055 || code >= 13056 && code <= 13311 || code >= 44032 && code <= 55215 || code >= 63744 && code <= 64255 || code >= 65072 && code <= 65103) width += 2;
		else if (code === 8205 || code >= 65024 && code <= 65039 || code >= 127995 && code <= 127999) width += 0;
		else width += 1;
	}
	return width;
};
const getDouyinID = async (event, url, log = true) => {
	const longLink = (await axios.get(url, { headers: { "User-Agent": "Apifox/1.0.0 (https://apifox.com)" } })).request.res.responseUrl;
	let result = {};
	switch (true) {
		case longLink.includes("webcast.amemv.com"):
		case longLink.includes("live.douyin.com"):
			if (longLink.includes("webcast.amemv.com")) {
				const sec_uid = /sec_user_id=([^&]+)/.exec(longLink);
				result = {
					type: "live_room_detail",
					sec_uid: sec_uid ? sec_uid[1] : void 0
				};
			} else if (longLink.includes("live.douyin.com")) result = {
				type: "live_room_detail",
				room_id: longLink.split("/").pop()
			};
			break;
		case /video\/(\d+)/.test(longLink): {
			const videoMatch = /video\/(\d+)/.exec(longLink);
			result = {
				type: "one_work",
				aweme_id: videoMatch ? videoMatch[1] : void 0,
				is_mp4: true
			};
			break;
		}
		case /note\/(\d+)/.test(longLink): {
			const noteMatch = /note\/(\d+)/.exec(longLink);
			result = {
				type: "one_work",
				aweme_id: noteMatch ? noteMatch[1] : void 0,
				is_mp4: false
			};
			break;
		}
		case /modal_id=(\d+)/.test(longLink): {
			const modalMatch = /modal_id=(\d+)/.exec(longLink);
			result = {
				type: "one_work",
				aweme_id: modalMatch ? modalMatch[1] : void 0,
				is_mp4: true
			};
			break;
		}
		case /https:\/\/(?:www\.douyin\.com|www\.iesdouyin\.com)\/share\/user\/(\S+)/.test(longLink): {
			const userMatch = /user\/([a-zA-Z0-9_-]+)/.exec(longLink);
			result = {
				type: "user_dynamic",
				sec_uid: userMatch ? userMatch[1] : void 0
			};
			break;
		}
		case /music\/(\d+)/.test(longLink): {
			const musicMatch = /music\/(\d+)/.exec(longLink);
			result = {
				type: "music_work",
				music_id: musicMatch ? musicMatch[1] : void 0
			};
			break;
		}
		default:
			logger.warn("无法获取作品ID");
			break;
	}
	log && console.log(result);
	return result;
};
await init_module();
await init_amagiClient();
async function processFavoriteList(contentList, sec_uid, userinfo, item, targets, force = false) {
	const pushType = "favorite";
	const listName = "喜欢列表";
	const result = [];
	const groupHistoryStatus = /* @__PURE__ */ new Map();
	for (const target of targets) {
		const hasHistory = await douyinDBInstance.hasHistory(sec_uid, target.groupId, pushType);
		groupHistoryStatus.set(target.groupId, hasHistory);
	}
	for (const [index, aweme] of contentList.entries()) {
		const validTargets = [];
		for (const target of targets) if (!await douyinDBInstance.isAwemePushed(aweme.aweme_id, sec_uid, target.groupId, pushType)) {
			const hasHistory = groupHistoryStatus.get(target.groupId);
			if (force || hasHistory || index === 0) validTargets.push(target);
			else {
				await douyinDBInstance.addAwemeCache(aweme.aweme_id, sec_uid, target.groupId, pushType);
				logger.debug(`新订阅群组 ${target.groupId} 跳过旧作品 ${aweme.aweme_id} 并已标记为已读`);
			}
		}
		if (validTargets.length === 0) continue;
		let authorUserInfo;
		try {
			if (aweme.author?.sec_uid) {
				authorUserInfo = await douyinFetcher.fetchUserProfile({
					sec_uid: aweme.author.sec_uid,
					typeMode: "strict"
				});
				logger.debug(`获取作品作者 ${aweme.author.nickname} 的用户信息成功`);
			}
		} catch (error) {
			logger.warn(`获取作品作者用户信息失败: ${error}`);
		}
		result.push({
			remark: item.remark,
			sec_uid,
			create_time: aweme.create_time,
			targets: validTargets,
			pushType,
			Detail_Data: {
				...aweme,
				user_info: userinfo,
				author_user_info: authorUserInfo
			},
			avatar_img: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userinfo.data.user.avatar_larger.uri,
			living: false
		});
		logger.debug(`发现新${listName}作品：${aweme.aweme_id}`);
	}
	await douyinDBInstance.updateListSnapshot(sec_uid, pushType, contentList.map((a) => a.aweme_id));
	return result;
}
await init_module();
async function processLiveStream(sec_uid, userinfo, item, targets, amagi) {
	const pushType = "live";
	const liveStatus = await douyinDBInstance.getLiveStatus(sec_uid);
	if (userinfo.data.user.live_status === 1) {
		const UserInfoData = await amagi.douyin.fetcher.fetchUserProfile({
			sec_uid: userinfo.data.user.sec_uid,
			typeMode: "strict"
		});
		if (!UserInfoData.data.user?.live_status || UserInfoData.data.user.live_status !== 1) {
			logger.error((UserInfoData?.data?.user?.nickname ?? "用户") + "当前未在直播");
			return null;
		}
		if (!UserInfoData.data.user.room_data) {
			logger.error("未获取到直播间信息！");
			return null;
		}
		const room_data = JSON.parse(UserInfoData.data.user.room_data);
		const liveInfo = await amagi.douyin.fetcher.fetchLiveRoomInfo({
			room_id: UserInfoData.data.user.room_id_str,
			web_rid: room_data.owner.web_rid,
			typeMode: "strict"
		});
		if (!liveStatus.living) {
			await douyinDBInstance.updateLiveStatus(sec_uid, true);
			logger.info(`用户 ${item.remark ?? sec_uid} 开播了`);
			return {
				remark: item.remark,
				sec_uid,
				create_time: Date.now(),
				targets,
				pushType,
				Detail_Data: {
					user_info: userinfo,
					room_data: JSON.parse(userinfo.data.user.room_data),
					live_data: liveInfo,
					liveStatus: {
						liveStatus: "open",
						isChanged: true,
						isliving: true
					}
				},
				avatar_img: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userinfo.data.user.avatar_larger.uri,
				living: true
			};
		}
	} else if (liveStatus.living) {
		await douyinDBInstance.updateLiveStatus(sec_uid, false);
		logger.info(`用户 ${item.remark ?? sec_uid} 已关播，更新直播状态`);
	}
	return null;
}
await init_date_fns();
await init_module();
async function processPostList(contentList, sec_uid, userinfo, item, targets) {
	const pushType = "post";
	const listName = "作品列表";
	const result = [];
	for (const aweme of contentList) {
		const nowSeconds = Math.floor(Date.now() / 1e3);
		const createTime = aweme.create_time;
		const timeDifference = nowSeconds - createTime;
		const is_top = aweme.is_top === 1;
		const timeDiffHours = Math.round(timeDifference / 3600 * 100) / 100;
		logger.trace(`\n      前期获取该作品基本信息：\n      推送类型：${pushType}（${listName}）\n      作者：${aweme.author.nickname}\n      作品ID：${aweme.aweme_id}\n      发布时间：${format(fromUnixTime(aweme.create_time), "yyyy-MM-dd HH:mm")}\n      发布时间戳（s）：${createTime}\n      当前时间戳（s）：${nowSeconds}\n      时间差（s）：${timeDifference}s (${timeDiffHours}h)\n      是否置顶：${is_top}\n      是否在一天内：${timeDifference < 86400 ? logger.green("true") : logger.red("false")}\n      `);
		if (is_top && timeDifference < 86400 || timeDifference < 86400 && !is_top) {
			const validTargets = [];
			for (const target of targets) if (!await douyinDBInstance.isAwemePushed(aweme.aweme_id, sec_uid, target.groupId, pushType)) validTargets.push(target);
			if (validTargets.length > 0) result.push({
				remark: item.remark,
				sec_uid,
				create_time: aweme.create_time,
				targets: validTargets,
				pushType,
				Detail_Data: {
					...aweme,
					user_info: userinfo
				},
				avatar_img: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userinfo.data.user.avatar_larger.uri,
				living: false
			});
		}
	}
	return result;
}
await init_module();
await init_amagiClient();
async function processRecommendList(contentList, sec_uid, userinfo, item, targets, force = false) {
	const pushType = "recommend";
	const listName = "推荐列表";
	const result = [];
	const groupHistoryStatus = /* @__PURE__ */ new Map();
	for (const target of targets) {
		const hasHistory = await douyinDBInstance.hasHistory(sec_uid, target.groupId, pushType);
		groupHistoryStatus.set(target.groupId, hasHistory);
	}
	for (const [index, aweme] of contentList.entries()) {
		const validTargets = [];
		for (const target of targets) if (!await douyinDBInstance.isAwemePushed(aweme.aweme_id, sec_uid, target.groupId, pushType)) {
			const hasHistory = groupHistoryStatus.get(target.groupId);
			if (force || hasHistory || index === 0) validTargets.push(target);
			else {
				await douyinDBInstance.addAwemeCache(aweme.aweme_id, sec_uid, target.groupId, pushType);
				logger.debug(`新订阅群组 ${target.groupId} 跳过旧作品 ${aweme.aweme_id} 并已标记为已读`);
			}
		}
		if (validTargets.length === 0) continue;
		let authorUserInfo;
		try {
			if (aweme.author?.sec_uid) {
				authorUserInfo = await douyinFetcher.fetchUserProfile({
					sec_uid: aweme.author.sec_uid,
					typeMode: "strict"
				});
				logger.debug(`获取作品作者 ${aweme.author.nickname} 的用户信息成功`);
			}
		} catch (error) {
			logger.warn(`获取作品作者用户信息失败: ${error}`);
		}
		result.push({
			remark: item.remark,
			sec_uid,
			create_time: aweme.create_time,
			targets: validTargets,
			pushType,
			Detail_Data: {
				...aweme,
				user_info: userinfo,
				author_user_info: authorUserInfo
			},
			avatar_img: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userinfo.data.user.avatar_larger.uri,
			living: false
		});
		logger.debug(`发现新${listName}作品：${aweme.aweme_id}`);
	}
	await douyinDBInstance.updateListSnapshot(sec_uid, pushType, contentList.map((a) => a.aweme_id));
	return result;
}
await init_date_fns();
await init_module();
await init_Config();
var douyinBaseHeaders = {
	...BASE_HEADERS,
	Referer: "https://www.douyin.com",
	Cookie: Config.cookies.douyin
};
var DouYinpush = class extends Base {
	force = false;
	constructor(e = {}, force = false) {
		super(e);
		if (this.e.bot?.adapter?.name === "QQBot") {
			e.reply("不支持QQBot，请使用其他适配器");
			return;
		}
		this.headers.Referer = "https://www.douyin.com";
		this.headers.Cookie = Config.cookies.douyin;
		this.force = force;
	}
	async action() {
		await this.syncConfigToDatabase();
		const deletedCount = await cleanOldDynamicCache("douyin");
		if (deletedCount > 0) logger.info(`已清理 ${deletedCount} 条过期的抖音作品缓存记录`);
		if (await this.checkremark()) return true;
		this.ensureConfigFields(Config.pushlist.douyin);
		const registeredBotIds = karin$1.getAllBotID();
		const filteredPushList = this.filterPushListByRegisteredBots(Config.pushlist.douyin, registeredBotIds);
		if (filteredPushList.length === 0) {
			logger.warn("没有已注册的 bot 可用于抖音推送");
			return true;
		}
		const data$1 = await this.getDynamicList(filteredPushList);
		if (Object.keys(data$1).length === 0) return true;
		if (this.force) return await this.forcepush(data$1);
		else return await this.getdata(data$1);
	}
	ensureConfigFields(pushList) {
		if (!pushList || pushList.length === 0) return;
		let hasChanges = false;
		for (const item of pushList) {
			if (!item.pushTypes || item.pushTypes.length === 0) {
				item.pushTypes = [
					"post",
					"live",
					"favorite",
					"recommend"
				];
				hasChanges = true;
				logger.info(`为用户 ${item.remark ?? item.sec_uid} 自动补全推送类型：作品列表、直播、收藏、推荐`);
			}
			if (item.switch === void 0) {
				item.switch = true;
				hasChanges = true;
			}
		}
		if (hasChanges) {
			Config.Modify("pushlist", "douyin", pushList);
			logger.info("已自动补全配置文件中缺失的字段并保存");
		}
	}
	filterPushListByRegisteredBots(pushList, registeredBotIds) {
		if (!pushList || pushList.length === 0) return [];
		const registeredSet = new Set(registeredBotIds);
		const filteredList = [];
		for (const item of pushList) {
			const filteredGroupIds = item.group_id.filter((groupWithBot) => {
				const botId = groupWithBot.split(":")[1];
				const isRegistered = registeredSet.has(botId);
				if (!isRegistered) logger.debug(`Bot ${botId} 未注册，跳过群组 ${groupWithBot.split(":")[0]} 的推送`);
				return isRegistered;
			});
			if (filteredGroupIds.length > 0) filteredList.push({
				...item,
				group_id: filteredGroupIds
			});
			else logger.debug(`用户 ${item.remark ?? item.sec_uid} 的所有推送目标 bot 均未注册，跳过`);
		}
		return filteredList;
	}
	async syncConfigToDatabase() {
		if (!Config.pushlist.douyin || Config.pushlist.douyin.length === 0) return;
		await douyinDBInstance.syncConfigSubscriptions(Config.pushlist.douyin);
	}
	async getdata(data$1) {
		if (Object.keys(data$1).length === 0) return true;
		for (const awemeId in data$1) {
			const pushItem = data$1[awemeId];
			const actualAwemeId = awemeId.replace(/^(post|favorite|recommend|live)_/, "");
			const pushTypeLabel = pushItem.pushType === "post" ? "作品列表" : pushItem.pushType === "favorite" ? "喜欢列表" : pushItem.pushType === "recommend" ? "推荐列表" : "直播";
			logger.mark(`\n        ${logger.blue("开始处理并渲染抖音动态图片")}\n        ${logger.blue("博主")}: ${logger.green(pushItem.remark)} \n        ${logger.blue("推送类型")}: ${logger.magenta(pushTypeLabel)}\n        ${logger.cyan("作品id")}：${logger.yellow(actualAwemeId)}\n        ${logger.cyan("访问地址")}：${logger.green("https://www.douyin.com/video/" + actualAwemeId)}`);
			const Detail_Data = pushItem.Detail_Data;
			const skip = await skipDynamic(pushItem);
			skip && logger.warn(`作品 https://www.douyin.com/video/${actualAwemeId} 已被处理，跳过`);
			let img$2 = [];
			let iddata = {
				is_mp4: true,
				type: "one_work"
			};
			if (!skip) iddata = await getDouyinID(this.e, Detail_Data.share_url ?? "https://live.douyin.com/" + Detail_Data.room_data?.owner.web_rid, false);
			if (!skip) if (pushItem.pushType === "live" && "room_data" in pushItem.Detail_Data && Detail_Data.live_data) img$2 = await Render("douyin/live", {
				image_url: Detail_Data.live_data.data.data.data[0]?.cover?.url_list[0] ?? Detail_Data.live_data.data.data.qrcode_url,
				text: Detail_Data.live_data.data.data.data[0]?.title ?? "",
				liveinf: `${Detail_Data.live_data.data.data.partition_road_map?.partition?.title ?? Detail_Data.live_data.data.data.data[0]?.title ?? "获取失败"} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
				"在线观众": Detail_Data.live_data.data.data.data.length > 0 && Detail_Data.live_data.data.data.data[0].room_view_stats?.display_value ? this.count(Detail_Data.live_data.data.data.data[0].room_view_stats.display_value) : "：语音直播或刚开播获取失败。",
				"总观看次数": Detail_Data.live_data.data.data.data.length > 0 ? this.count(Number(Detail_Data.live_data.data.data.data[0].stats.total_user_str)) : "：语音直播不支持",
				username: Detail_Data.user_info.data.user.nickname,
				avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.data.user.avatar_larger.uri,
				fans: this.count(Detail_Data.user_info.data.user.follower_count),
				share_url: "https://live.douyin.com/" + Detail_Data.room_data.owner.web_rid,
				dynamicTYPE: "直播动态推送"
			});
			else {
				const realUrl = Config.douyin.push.shareType === "web" && await new Network({
					url: Detail_Data.share_url,
					headers: {
						"User-Agent": "Apifox/1.0.0 (https://apifox.com)",
						Accept: "*/*",
						"Accept-Encoding": "gzip, deflate, br",
						Connection: "keep-alive"
					}
				}).getLocation();
				if (pushItem.pushType === "favorite") {
					const authorUserInfo = "author_user_info" in Detail_Data ? Detail_Data.author_user_info : void 0;
					img$2 = await Render("douyin/favorite-list", {
						image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover_original_scale?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
						desc: this.desc(Detail_Data, Detail_Data.desc),
						dianzan: this.count(Detail_Data.statistics.digg_count),
						pinglun: this.count(Detail_Data.statistics.comment_count),
						share: this.count(Detail_Data.statistics.share_count),
						shouchang: this.count(Detail_Data.statistics.collect_count),
						tuijian: this.count(Detail_Data.statistics.recommend_count),
						create_time: format(fromUnixTime(pushItem.create_time), "yyyy-MM-dd HH:mm"),
						liker_username: pushItem.remark,
						liker_avatar: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.data.user.avatar_larger.uri,
						liker_douyin_id: Detail_Data.user_info.data.user.unique_id === "" ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
						author_username: Detail_Data.author.nickname,
						author_avatar: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + authorUserInfo.data.user.avatar_larger.uri,
						author_douyin_id: authorUserInfo.data.user.unique_id === "" ? authorUserInfo.data.user.short_id : authorUserInfo.data.user.unique_id,
						share_url: Config.douyin.push.shareType === "web" ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`
					});
				} else if (pushItem.pushType === "recommend") {
					const authorUserInfo = "author_user_info" in Detail_Data ? Detail_Data.author_user_info : void 0;
					img$2 = await Render("douyin/recommend-list", {
						image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover_original_scale?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
						desc: this.desc(Detail_Data, Detail_Data.desc),
						dianzan: this.count(Detail_Data.statistics.digg_count),
						pinglun: this.count(Detail_Data.statistics.comment_count),
						share: this.count(Detail_Data.statistics.share_count),
						shouchang: this.count(Detail_Data.statistics.collect_count),
						tuijian: this.count(Detail_Data.statistics.recommend_count),
						create_time: format(fromUnixTime(pushItem.create_time), "yyyy-MM-dd HH:mm"),
						recommender_username: pushItem.remark,
						recommender_avatar: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.data.user.avatar_larger.uri,
						recommender_douyin_id: Detail_Data.user_info.data.user.unique_id === "" ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
						author_username: Detail_Data.author.nickname,
						author_avatar: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + authorUserInfo.data.user.avatar_larger.uri,
						author_douyin_id: authorUserInfo.data.user.unique_id === "" ? authorUserInfo.data.user.short_id : authorUserInfo.data.user.unique_id,
						share_url: Config.douyin.push.shareType === "web" ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`
					});
				} else img$2 = await Render("douyin/dynamic", {
					image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
					desc: this.desc(Detail_Data, Detail_Data.desc),
					dianzan: this.count(Detail_Data.statistics.digg_count),
					pinglun: this.count(Detail_Data.statistics.comment_count),
					share: this.count(Detail_Data.statistics.share_count),
					shouchang: this.count(Detail_Data.statistics.collect_count),
					create_time: format(fromUnixTime(pushItem.create_time), "yyyy-MM-dd HH:mm"),
					avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.data.user.avatar_larger.uri,
					share_url: Config.douyin.push.shareType === "web" ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`,
					username: Detail_Data.author.nickname,
					"抖音号": Detail_Data.user_info.data.user.unique_id === "" ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
					"粉丝": this.count(Detail_Data.user_info.data.user.follower_count),
					"获赞": this.count(Detail_Data.user_info.data.user.total_favorited),
					"关注": this.count(Detail_Data.user_info.data.user.following_count),
					dynamicTYPE: "作品动态推送",
					cooperation_info: (() => {
						const raw = Detail_Data.cooperation_info;
						if (!raw) return void 0;
						const rawCreators = Array.isArray(raw.co_creators) ? raw.co_creators : [];
						const author = Detail_Data.author;
						const authorUid = author?.uid;
						const authorSecUid = author?.sec_uid;
						const authorNickname = author?.nickname;
						const authorInCreators = rawCreators.some((c) => authorUid && c.uid && c.uid === authorUid || authorSecUid && c.sec_uid && c.sec_uid === authorSecUid || authorNickname && c.nickname && c.nickname === authorNickname);
						const co_creators = rawCreators.map((c) => {
							const firstUrl = c.avatar_thumb?.url_list?.[0] ?? (c.avatar_thumb?.uri ? `https://p3.douyinpic.com/${c.avatar_thumb.uri}` : void 0);
							return {
								avatar_thumb: firstUrl ? { url_list: [firstUrl] } : void 0,
								nickname: c.nickname,
								role_title: c.role_title
							};
						});
						return {
							co_creator_nums: Math.max(Number(raw.co_creator_nums || 0), co_creators.length) + (authorInCreators ? 0 : 1),
							co_creators
						};
					})()
				});
			}
			for (const target of pushItem.targets) {
				let status = { message_id: "" };
				const { groupId, botId } = target;
				if (!skip) {
					const Contact = karin$1.contactGroup(groupId);
					status = await karin$1.sendMsg(botId, Contact, img$2 ? [...img$2] : []);
					if (pushItem.pushType === "live" && "room_data" in pushItem.Detail_Data && status.message_id) await douyinDBInstance.updateLiveStatus(pushItem.sec_uid, true);
					if (Config.douyin.push.parsedynamic && status.message_id) {
						logger.debug(`开始解析作品，类型为：${iddata.is_mp4 ? "视频" : "图集"}`);
						if (iddata.is_mp4) try {
							let downloadUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`;
							logger.debug(`开始排除不符合条件的视频分辨率；\n\n                    共拥有${logger.yellow(Detail_Data.video.bit_rate.length)}个视频源\n\n                    视频ID：${logger.green(Detail_Data.aweme_id)}\n\n                    分享链接：${logger.green(Detail_Data.share_url)}\n                    `);
							const videoObj = douyinProcessVideos(Detail_Data.video.bit_rate, Config.douyin.videoQuality);
							logger.debug("获取精确下载地址");
							downloadUrl = await new Network({
								url: videoObj[0].play_addr.url_list[0],
								headers: douyinBaseHeaders
							}).getLongLink();
							await downloadVideo(this.e, {
								video_url: downloadUrl,
								title: {
									timestampTitle: `tmp_${Date.now()}.mp4`,
									originTitle: `${Detail_Data.desc}.mp4`
								}
							}, {
								active: true,
								activeOption: {
									uin: botId,
									group_id: groupId
								}
							});
						} catch (error) {
							throw new Error(`下载视频失败: ${error}`);
						}
						else if (!iddata.is_mp4 && iddata.type === "one_work") {
							if (Detail_Data.is_slides === true && Detail_Data.images) {
								const images = [];
								const temp = [];
								let liveimgbgm = null;
								let bgmContext = null;
								const mergeMode = Config.douyin.liveImageMergeMode ?? "independent";
								if (Detail_Data.music) {
									let mp3Path = "";
									if (Detail_Data.music.play_url.uri === "") mp3Path = JSON.parse(Detail_Data.music.extra).original_song_url;
									else mp3Path = Detail_Data.music.play_url.uri;
									liveimgbgm = await downloadFile(mp3Path, {
										title: `Douyin_tmp_A_${Date.now()}.mp3`,
										headers: douyinBaseHeaders
									});
									temp.push(liveimgbgm);
									if (mergeMode === "continuous") bgmContext = await createLiveImageContext(liveimgbgm.filepath);
								}
								const images1 = Detail_Data.images ?? [];
								if (!images1.length) logger.debug("未获取到合辑的图片数据");
								for (const [index, item] of images1.entries()) {
									if (item.clip_type === 2 || item.clip_type === void 0) {
										const imageUrl = await processImageUrl(item.url_list[0], Detail_Data.desc, index);
										images.push(segment.image(imageUrl));
										continue;
									}
									const liveimg = await downloadFile(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`, {
										title: `Douyin_tmp_V_${Date.now()}.mp4`,
										headers: douyinBaseHeaders
									});
									if (liveimg.filepath) {
										const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
										let success;
										const loopCount = item.clip_type === 4 ? 1 : 3;
										if (!liveimgbgm) if (loopCount > 1) success = await loopVideo(liveimg.filepath, outputPath, loopCount);
										else {
											fs.renameSync(liveimg.filepath, outputPath);
											success = true;
										}
										else if (mergeMode === "continuous" && bgmContext) {
											const result = await mergeLiveImageContinuous({
												videoPath: liveimg.filepath,
												outputPath,
												loopCount
											}, bgmContext);
											success = result.success;
											bgmContext = result.context;
										} else success = await mergeLiveImageIndependent({
											videoPath: liveimg.filepath,
											outputPath,
											loopCount
										}, liveimgbgm.filepath);
										if (success) {
											const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
											fs.renameSync(outputPath, filePath);
											logger.mark(`视频文件重命名完成: ${outputPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
											logger.mark("正在尝试删除缓存文件");
											await Common.removeFile(liveimg.filepath, true);
											temp.push({
												filepath: filePath,
												totalBytes: 0
											});
											images.push(segment.video("file://" + filePath));
											if (item.clip_type === 5 && item.url_list?.[0]) {
												const imageUrl = await processImageUrl(item.url_list[0], Detail_Data.desc, index);
												images.push(segment.image(imageUrl));
											}
										} else await Common.removeFile(liveimg.filepath, true);
									}
								}
								const bot = karin$1.getBot(botId);
								const Element = common.makeForward(images, botId, bot.account.name);
								try {
									await bot.sendForwardMsg(Contact, Element, {
										source: "合辑内容",
										summary: `查看${Element.length}张图片/视频消息`,
										prompt: "抖音合辑解析结果",
										news: [{ text: "点击查看解析结果" }]
									});
								} catch (error) {
									logger.error(`发送合辑失败: ${error}`);
								} finally {
									for (const item of temp) await Common.removeFile(item.filepath, true);
								}
							} else if (Detail_Data.images) if (Detail_Data.images.some((item) => item.clip_type !== 2 && item.clip_type !== void 0)) {
								const processedImages = [];
								const temp = [];
								let liveimgbgm = null;
								let bgmContext = null;
								const mergeMode = Config.douyin.liveImageMergeMode ?? "independent";
								if (Detail_Data.music) {
									let mp3Path = "";
									if (Detail_Data.music.play_url.uri === "") mp3Path = JSON.parse(Detail_Data.music.extra).original_song_url;
									else mp3Path = Detail_Data.music.play_url.uri;
									liveimgbgm = await downloadFile(mp3Path, {
										title: `Douyin_tmp_A_${Date.now()}.mp3`,
										headers: douyinBaseHeaders
									});
									temp.push(liveimgbgm);
									if (mergeMode === "continuous") bgmContext = await createLiveImageContext(liveimgbgm.filepath);
								}
								for (const [index, item] of Detail_Data.images.entries()) {
									if (item.clip_type === 2 || item.clip_type === void 0) {
										const imageUrl = await processImageUrl(item.url_list[2] ?? item.url_list[1], Detail_Data.desc, index);
										processedImages.push(segment.image(imageUrl));
										continue;
									}
									const liveimg = await downloadFile(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`, {
										title: `Douyin_tmp_V_${Date.now()}.mp4`,
										headers: douyinBaseHeaders
									});
									if (liveimg.filepath) {
										const outputPath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
										let success;
										const loopCount = item.clip_type === 4 ? 1 : 3;
										if (!liveimgbgm) if (loopCount > 1) success = await loopVideo(liveimg.filepath, outputPath, loopCount);
										else {
											fs.renameSync(liveimg.filepath, outputPath);
											success = true;
										}
										else if (mergeMode === "continuous" && bgmContext) {
											const result = await mergeLiveImageContinuous({
												videoPath: liveimg.filepath,
												outputPath,
												loopCount
											}, bgmContext);
											success = result.success;
											bgmContext = result.context;
										} else success = await mergeLiveImageIndependent({
											videoPath: liveimg.filepath,
											outputPath,
											loopCount
										}, liveimgbgm.filepath);
										if (success) {
											const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
											fs.renameSync(outputPath, filePath);
											logger.mark(`视频文件重命名完成: ${outputPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
											logger.mark("正在尝试删除缓存文件");
											await Common.removeFile(liveimg.filepath, true);
											temp.push({
												filepath: filePath,
												totalBytes: 0
											});
											processedImages.push(segment.video("file://" + filePath));
											if (item.clip_type === 5 && item.url_list?.[0]) {
												const imageUrl = await processImageUrl(item.url_list[0], Detail_Data.desc, index);
												processedImages.push(segment.image(imageUrl));
											}
										} else await Common.removeFile(liveimg.filepath, true);
									}
								}
								const bot = karin$1.getBot(botId);
								const Element = common.makeForward(processedImages, botId, bot.account.name);
								try {
									await bot.sendForwardMsg(Contact, Element, {
										source: "图集内容",
										summary: `查看${Element.length}张图片/视频消息`,
										prompt: "抖音图集解析结果",
										news: [{ text: "点击查看解析结果" }]
									});
								} catch (error) {
									logger.error(`发送图集失败: ${error}`);
								} finally {
									for (const item of temp) await Common.removeFile(item.filepath, true);
								}
							} else {
								const imageres = [];
								let image_url;
								for (const [index, item] of Detail_Data.images.entries()) {
									image_url = item.url_list[2] ?? item.url_list[1];
									const imageUrl = await processImageUrl(image_url, Detail_Data.desc, index);
									imageres.push(segment.image(imageUrl));
								}
								const bot = karin$1.getBot(botId);
								if (imageres.length === 1) {
									const imageUrl = await processImageUrl(image_url, Detail_Data.desc);
									await bot.sendMsg(Contact, [segment.image(imageUrl)]);
								} else {
									const forwardMsg = common.makeForward(imageres, botId, bot.account.name);
									await bot.sendForwardMsg(Contact, forwardMsg, {
										source: "图片合集",
										summary: `查看${forwardMsg.length}张图片消息`,
										prompt: "抖音图集解析结果",
										news: [{ text: "点击查看解析结果" }]
									});
								}
							}
						}
					}
				}
				if (skip || pushItem.pushType !== "live" && status.message_id) await douyinDBInstance.addAwemeCache(actualAwemeId, pushItem.sec_uid, groupId, pushItem.pushType);
			}
		}
		return true;
	}
	async getDynamicList(userList) {
		const willbepushlist = {};
		try {
			const filteredUserList = userList.filter((item) => item.switch !== false);
			for (const item of filteredUserList) {
				await common.sleep(2e3);
				const sec_uid = item.sec_uid;
				const pushTypes = item.pushTypes || ["post"];
				logger.debug(`开始获取用户：${item.remark}（${sec_uid}）的内容，推送类型：${pushTypes.join(", ")}`);
				const userinfo = await this.amagi.douyin.fetcher.fetchUserProfile({
					sec_uid,
					typeMode: "strict"
				});
				const targets = item.group_id.map((groupWithBot) => {
					const [groupId, botId] = groupWithBot.split(":");
					return {
						groupId,
						botId
					};
				});
				if (targets.length === 0) continue;
				if (userinfo.data.user?.special_state_info?.special_state === 1 && userinfo.data.user?.user_deleted === true) {
					logger.warn(`${item.remark}（${sec_uid}）${userinfo.data.user.special_state_info.title}`);
					continue;
				}
				for (const pushType of pushTypes) {
					await common.sleep(1e3);
					if (pushType === "live") {
						const liveItem = await processLiveStream(sec_uid, userinfo, item, targets, this.amagi);
						if (liveItem) willbepushlist[`live_${sec_uid}`] = liveItem;
						continue;
					}
					let contentList = [];
					let listName = "";
					switch (pushType) {
						case "post":
							listName = "作品列表";
							contentList = (await this.amagi.douyin.fetcher.fetchUserVideoList({
								sec_uid,
								number: 5,
								typeMode: "strict"
							})).data.aweme_list || [];
							break;
						case "favorite":
							listName = "喜欢列表";
							const favoritelist = await this.amagi.douyin.fetcher.fetchUserFavoriteList({
								sec_uid,
								number: 5,
								typeMode: "strict"
							});
							if (favoritelist.data.aweme_list.length === 0) logger.warn(`${item.remark}(${item.short_id}) 获取到的喜欢列表数量为零！此博主可能未公开他/她的喜欢列表`);
							contentList = favoritelist.data.aweme_list || [];
							break;
						case "recommend":
							listName = "推荐列表";
							const recommendlist = await this.amagi.douyin.fetcher.fetchUserRecommendList({
								sec_uid,
								number: 5,
								typeMode: "strict"
							});
							if (recommendlist.data.aweme_list.length === 0) logger.warn(`${item.remark}(${item.short_id}) 获取到的推荐列表数量为零！此博主可能未公开他/她的推荐列表`);
							contentList = recommendlist.data.aweme_list || [];
							break;
					}
					logger.debug(`获取到 ${item.remark} 的${listName}，共 ${contentList.length} 条`);
					if (contentList.length > 0) {
						let pushItems = [];
						switch (pushType) {
							case "post":
								pushItems = await processPostList(contentList, sec_uid, userinfo, item, targets);
								break;
							case "favorite":
								pushItems = await processFavoriteList(contentList, sec_uid, userinfo, item, targets, this.force);
								break;
							case "recommend":
								pushItems = await processRecommendList(contentList, sec_uid, userinfo, item, targets, this.force);
								break;
						}
						for (const pushItem of pushItems) {
							const key = `${pushType}_${pushItem.Detail_Data.aweme_id}`;
							willbepushlist[key] = pushItem;
						}
					}
				}
			}
		} catch (error) {
			throw new Error(`获取抖音用户内容列表失败: ${error}`);
		}
		return willbepushlist;
	}
	async checkIfAlreadyPushed(aweme_id, sec_uid, groupIds, pushType = "post") {
		for (const groupId of groupIds) if (!await douyinDBInstance.isAwemePushed(aweme_id, sec_uid, groupId, pushType)) return false;
		return true;
	}
	async setting(data$1) {
		const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
		const config$1 = Config.pushlist;
		const groupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
		const botId = this.e.selfId;
		try {
			const inputDouyinId = this.e.msg.replace(/^#设置抖音推送/, "").trim();
			let matchedUser = null;
			for (const userItem of data$1.user_list) if ((userItem.user_info.unique_id === "" ? userItem.user_info.short_id : userItem.user_info.unique_id) === inputDouyinId) {
				matchedUser = userItem.user_info;
				break;
			}
			if (!matchedUser) throw new Error(`未找到抖音号为 ${inputDouyinId} 的用户`);
			const sec_uid = matchedUser.sec_uid;
			const UserInfoData = await this.amagi.douyin.fetcher.fetchUserProfile({
				sec_uid,
				typeMode: "strict"
			});
			let user_shortid;
			UserInfoData.data.user.unique_id === "" ? user_shortid = UserInfoData.data.user.short_id : user_shortid = UserInfoData.data.user.unique_id;
			config$1.douyin ??= [];
			const existingItem = config$1.douyin.find((item) => item.sec_uid === sec_uid);
			const isSubscribed = await douyinDBInstance.isSubscribed(sec_uid, groupId);
			if (existingItem) {
				let has = false;
				let groupIndexToRemove = -1;
				for (let index = 0; index < existingItem.group_id.length; index++) if (existingItem.group_id[index].split(":")[0] === String(groupId)) {
					has = true;
					groupIndexToRemove = index;
					break;
				}
				if (has) {
					existingItem.group_id.splice(groupIndexToRemove, 1);
					if (isSubscribed) await douyinDBInstance.unsubscribeDouyinUser(groupId, sec_uid);
					logger.info(`\n删除成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.data.user.sec_uid}`);
					await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n删除成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}`);
					if (existingItem.group_id.length === 0) {
						const index = config$1.douyin.indexOf(existingItem);
						config$1.douyin.splice(index, 1);
					}
				} else {
					existingItem.group_id.push(`${groupId}:${botId}`);
					if (!existingItem.pushTypes || existingItem.pushTypes.length === 0) existingItem.pushTypes = ["post", "live"];
					if (!isSubscribed) await douyinDBInstance.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.data.user.nickname);
					await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}`);
					if (Config.douyin.push.switch === false) await this.e.reply("请发送「#设置抖音推送开启」以进行推送");
					logger.info(`\n设置成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.data.user.sec_uid}`);
				}
			} else {
				config$1.douyin.push({
					switch: true,
					sec_uid,
					group_id: [`${groupId}:${botId}`],
					remark: UserInfoData.data.user.nickname,
					short_id: user_shortid,
					pushTypes: ["post", "live"]
				});
				if (!isSubscribed) await douyinDBInstance.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.data.user.nickname);
				await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}`);
				if (Config.douyin.push.switch === false) await this.e.reply("请发送「#设置抖音推送开启」以进行推送");
				logger.info(`\n设置成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.data.user.sec_uid}`);
			}
			Config.Modify("pushlist", "douyin", config$1.douyin);
			await this.renderPushList();
		} catch (error) {
			throw new Error(`设置失败，请查看日志: ${error}`);
		}
	}
	async renderPushList() {
		await this.syncConfigToDatabase();
		const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
		const subscriptions = await douyinDBInstance.getGroupSubscriptions(groupInfo.groupId);
		if (subscriptions.length === 0) {
			await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})\n没有设置任何抖音博主推送！\n可使用「#设置抖音推送 + 抖音号」进行设置`);
			return;
		}
		const renderOpt = [];
		for (const subscription of subscriptions) {
			const sec_uid = subscription.sec_uid;
			const userInfo = await this.amagi.douyin.fetcher.fetchUserProfile({
				sec_uid,
				typeMode: "strict"
			});
			const configItem = Config.pushlist.douyin?.find((item) => item.sec_uid === sec_uid);
			const switchStatus = configItem?.switch !== false;
			const pushTypes = configItem?.pushTypes || ["post"];
			renderOpt.push({
				avatar_img: userInfo.data.user.avatar_larger.url_list[0],
				username: userInfo.data.user.nickname,
				short_id: userInfo.data.user.unique_id === "" ? userInfo.data.user.short_id : userInfo.data.user.unique_id,
				fans: this.count(userInfo.data.user.follower_count),
				total_favorited: this.count(userInfo.data.user.total_favorited),
				following_count: this.count(userInfo.data.user.following_count),
				switch: switchStatus,
				pushTypes
			});
		}
		const img$2 = await Render("douyin/userlist", {
			renderOpt,
			groupInfo: {
				groupId: groupInfo.groupId || "",
				groupName: groupInfo.groupName || ""
			}
		});
		await this.e.reply(img$2);
	}
	async forcepush(data$1) {
		const currentGroupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
		const currentBotId = this.e.selfId;
		if (!this.e.msg.includes("全部")) {
			const subscribedUids = (await douyinDBInstance.getGroupSubscriptions(currentGroupId)).map((sub) => sub.sec_uid);
			const filteredData = {};
			for (const awemeId in data$1) if (subscribedUids.includes(data$1[awemeId].sec_uid)) filteredData[awemeId] = {
				...data$1[awemeId],
				targets: [{
					groupId: currentGroupId,
					botId: currentBotId
				}]
			};
			await this.getdata(filteredData);
		} else await this.getdata(data$1);
	}
	async checkremark() {
		const config$1 = Config.pushlist;
		const updateList = [];
		if (Config.pushlist.douyin === null || Config.pushlist.douyin.length === 0) return true;
		for (const i of Config.pushlist.douyin) {
			const remark = i.remark;
			const sec_uid = i.sec_uid;
			if (remark === void 0 || remark === "") updateList.push({ sec_uid });
		}
		if (updateList.length > 0) {
			for (const i of updateList) {
				const remark = (await this.amagi.douyin.fetcher.fetchUserProfile({
					sec_uid: i.sec_uid,
					typeMode: "strict"
				})).data.user.nickname;
				const matchingItemIndex = config$1.douyin.findIndex((item) => item.sec_uid === i.sec_uid);
				if (matchingItemIndex !== -1) config$1.douyin[matchingItemIndex].remark = remark;
			}
			Config.Modify("pushlist", "douyin", config$1.douyin);
		}
		return false;
	}
	desc(Detail_Data, desc) {
		if (desc === "") return "该作品没有描述";
		return desc;
	}
	count(num) {
		if (num > 1e4) return (num / 1e4).toFixed(1) + "万";
		return num.toString();
	}
};
var skipDynamic = async (PushItem) => {
	if ("liveStatus" in PushItem.Detail_Data) return false;
	const tags = [];
	if (PushItem.Detail_Data.text_extra) {
		for (const item of PushItem.Detail_Data.text_extra) if (item.hashtag_name) tags.push(item.hashtag_name);
	}
	logger.debug(`检查作品是否需要过滤：${PushItem.Detail_Data.share_url}`);
	return await douyinDBInstance.shouldFilter(PushItem, tags);
};
init_danmaku();
init_date_fns();
init_locale();
init_Config();
const kuaishouComments = async (data$1, emojidata) => {
	let jsonArray = [];
	for (const i of data$1.data.visionCommentList.rootComments) {
		const cid = i.commentId;
		const aweme_id = i.commentId;
		const nickname = i.authorName;
		const userimageurl = i.headurl;
		const text = i.content;
		const time = getRelativeTimeFromTimestamp$1(i.timestamp);
		const commentObj = {
			cid,
			aweme_id,
			nickname,
			userimageurl,
			text,
			digg_count: Number(i.likedCount),
			create_time: time
		};
		jsonArray.push(commentObj);
	}
	jsonArray.sort((a, b) => b.digg_count - a.digg_count);
	jsonArray = br(jsonArray);
	jsonArray = await handling_at(jsonArray);
	for (const i of jsonArray) if (i.digg_count > 1e4) i.digg_count = (i.digg_count / 1e4).toFixed(1) + "w";
	for (const item1 of jsonArray) for (const item2 of emojidata) if (item1.text.includes(item2.name)) {
		if (item1.text.includes("[") && item1.text.includes("]")) item1.text = item1.text.replace(/\[[^\]]*\]/g, `<img src="${item2.url}"/>`).replace(/\\/g, "");
		else item1.text = `<img src="${item2.url}"/>`;
		item1.text += "&#160";
	}
	return jsonArray.slice(0, Math.min(jsonArray.length, Config.kuaishou.numcomment));
};
var getRelativeTimeFromTimestamp$1 = (timestamp) => {
	const commentDate = new Date(timestamp);
	const diffSeconds = differenceInSeconds(/* @__PURE__ */ new Date(), commentDate);
	if (diffSeconds < 30) return "刚刚";
	if (diffSeconds < 7776e3) return formatDistanceToNow(commentDate, {
		locale: zhCN,
		addSuffix: true
	});
	return format(commentDate, "yyyy-MM-dd");
};
const br = (data$1) => {
	for (const i of data$1) {
		let text = i.text;
		text = text.replace(/\n/g, "<br>");
		i.text = text;
	}
	return data$1;
};
const handling_at = (data$1) => {
	for (const i of data$1) {
		let text = i.text;
		text = text.replace(/(@[\S\s]+?)\(\w+\)/g, (match, p1) => `<span style="color: rgb(3,72,141);">${p1.trim()}</span>`);
		i.text = text;
	}
	return data$1;
};
init_amagiClient();
const fetchKuaishouData = async (type, opt) => {
	switch (type) {
		case "one_work": return {
			VideoData: await kuaishouFetcher.fetchVideoWork({
				photoId: opt.photoId,
				typeMode: "strict"
			}),
			CommentsData: await kuaishouFetcher.fetchWorkComments({
				photoId: opt.photoId,
				typeMode: "strict"
			}),
			EmojiData: await kuaishouFetcher.fetchEmojiList({ typeMode: "strict" })
		};
		case "work_comments": return (await kuaishouFetcher.fetchWorkComments({
			photoId: opt.photoId,
			typeMode: "strict"
		})).data;
		case "emoji_list": return await kuaishouFetcher.fetchEmojiList({ typeMode: "strict" });
		default: break;
	}
};
await init_module();
const getKuaishouID = async (url, log = true) => {
	const longLink = await new Network({ url }).getLongLink();
	let result = {};
	switch (true) {
		case /photoId=(.*)/.test(longLink): {
			const workid = /photoId=([^&]+)/.exec(longLink);
			result = {
				type: "one_work",
				photoId: workid ? workid[1] : void 0
			};
			break;
		}
		case /kuaishou\.com\/short-video\/([^?]+)/.test(longLink): {
			const workid = /short-video\/([^?]+)/.exec(longLink);
			result = {
				type: "one_work",
				photoId: workid ? workid[1] : void 0
			};
			break;
		}
		default:
			logger.warn("无法获取作品ID");
			break;
	}
	log && console.log(result);
	return result;
};
await init_module();
await init_Config();
var Kuaishou = class extends Base {
	e;
	type;
	is_mp4;
	constructor(e, iddata) {
		super(e);
		this.e = e;
		this.type = iddata?.type;
	}
	async KuaishouHandler(data$1) {
		if (data$1.VideoData.data.data.visionVideoDetail.status !== 1) {
			await this.e.reply("不支持解析的视频");
			return true;
		}
		Config.kuaishou.tip && await this.e.reply("检测到快手链接，开始解析");
		const video_url = data$1.VideoData.data.data.visionVideoDetail.photo.photoUrl;
		const transformedData = Object.entries(data$1.EmojiData.data.data.visionBaseEmoticons.iconUrls).map(([name, path$1]) => ({
			name,
			url: `https:${path$1}`
		}));
		const CommentsData = await kuaishouComments(data$1.CommentsData.data, transformedData);
		const fileHeaders = await new Network({
			url: video_url,
			headers: this.headers
		}).getHeaders();
		const fileSizeInMB = ((fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0) / (1024 * 1024)).toFixed(2);
		const img$2 = await Render("kuaishou/comment", {
			Type: "视频",
			viewCount: data$1.VideoData.data.data.visionVideoDetail.photo.viewCount,
			CommentsData,
			CommentLength: CommentsData?.length ?? 0,
			share_url: video_url,
			VideoSize: fileSizeInMB,
			likeCount: data$1.VideoData.data.data.visionVideoDetail.photo.likeCount
		});
		await this.e.reply(img$2);
		await downloadVideo(this.e, {
			video_url,
			title: {
				timestampTitle: `tmp_${Date.now()}.mp4`,
				originTitle: `${data$1.VideoData.data.data.visionVideoDetail.photo.caption}.mp4`
			}
		});
		return true;
	}
};
await init_module();
await init_Config();
var safeScreenshot = async (page, screenshotPath) => {
	try {
		await page.screenshot({ path: screenshotPath });
		logger.debug(`截图已保存: ${screenshotPath}`);
	} catch (error) {
		logger.warn("截图失败（已忽略）:", error);
	}
};
const douyinLogin = async (e) => {
	const msg_id = [];
	try {
		const puppeteer = await snapka.launch({
			headless: "new",
			protocolTimeout: 6e4,
			args: [
				"--disable-blink-features=AutomationControlled",
				"--mute-audio",
				"--window-size=800,600",
				"--disable-gpu",
				"--no-sandbox",
				"--disable-setuid-sandbox",
				"--no-zygote",
				"--disable-extensions",
				"--disable-dev-shm-usage",
				"--disable-background-networking",
				"--disable-sync",
				"--disable-crash-reporter",
				"--disable-translate",
				"--disable-notifications",
				"--disable-device-discovery-notifications",
				"--disable-accelerated-2d-canvas",
				"--autoplay-policy=user-gesture-required",
				"--disable-web-security",
				"--disable-features=IsolateOrigins,site-per-process",
				"--disable-site-isolation-trials",
				"--disable-features=VizDisplayCompositor",
				"--js-flags=--max-old-space-size=128",
				"--disable-software-rasterizer",
				"--disable-webgl",
				"--disable-webgl2",
				"--disable-3d-apis",
				"--disable-accelerated-video-decode",
				"--disable-background-timer-throttling",
				"--disable-backgrounding-occluded-windows",
				"--disable-breakpad",
				"--disable-component-extensions-with-background-pages",
				"--disable-features=TranslateUI,BlinkGenPropertyTrees",
				"--disable-ipc-flooding-protection",
				"--disable-renderer-backgrounding"
			],
			ignoreDefaultArgs: ["--enable-automation"]
		});
		const getOperatingSystem = () => {
			const os$1 = platform();
			if (os$1 === "win32") return "windows";
			if (os$1 === "darwin") return "macos";
			return "linux";
		};
		const page = await newInjectedPage(puppeteer.browser, { fingerprintOptions: {
			devices: ["desktop"],
			operatingSystems: [getOperatingSystem()]
		} });
		await page.setRequestInterception(true);
		page.on("request", async (request) => {
			const resourceType = request.resourceType();
			const url = request.url();
			if (url.includes("passport") || url.includes("login") || url.includes("qrconnect") || url.includes("qrcode")) logger.debug(`[请求] ${resourceType}: ${url}`);
			if (resourceType === "media" || resourceType === "font" || resourceType === "stylesheet" || /\.(mp4|webm|m3u8|flv|avi|mov|wmv|mkv)(\?|$)/i.test(url) || url.includes("/aweme/") || url.includes("/video/") || url.includes("v.douyin.com") || resourceType === "image" && !url.includes("qrcode") && !url.includes("data:image") && (url.includes(".jpg") || url.includes(".jpeg") || url.includes(".webp"))) {
				if (url.includes("passport") || url.includes("login") || url.includes("qrconnect")) logger.warn(`[拦截] 登录相关请求被拦截: ${url}`);
				request.abort();
			} else request.continue();
		});
		await page.evaluateOnNewDocument(() => {
			HTMLMediaElement.prototype.play = function() {
				return Promise.reject(/* @__PURE__ */ new Error("Video playback blocked"));
			};
			if (window.MediaSource) window.MediaSource = void 0;
			window.IntersectionObserver = class {
				observe() {}
				unobserve() {}
				disconnect() {}
			};
		});
		await page.goto("https://www.douyin.com", {
			timeout: 12e4,
			waitUntil: "domcontentloaded"
		});
		let qrCodeData;
		try {
			logger.mark("开始等待二维码加载...");
			qrCodeData = await Promise.race([waitQrcode(page), new Promise((_$1, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error("QR_CODE_TIMEOUT")), 6e4))]);
			logger.mark("二维码获取成功");
		} catch (error) {
			if (error.message === "QR_CODE_TIMEOUT") {
				logger.warn("获取二维码超时");
				await safeScreenshot(page, path.join(karinPathTemp, Root.pluginName, "DouyinLoginQrcodeError.png"));
				await e.reply("获取二维码超时，请稍后重试", { reply: true });
			} else {
				logger.error("获取二维码失败:", error);
				await e.reply("获取二维码失败，请查看控制台日志", { reply: true });
			}
			await puppeteer.browser.close();
			return true;
		}
		let gcInterval;
		try {
			const loginQRcode = await Render("douyin/qrcodeImg", qrCodeData.url ? { share_url: qrCodeData.url } : { qrCodeDataUrl: qrCodeData.originalImage });
			const base64Data = loginQRcode[0]?.file;
			if (!base64Data) throw new Error("生成二维码图片失败");
			const cleanBase64 = base64Data.replace(/^base64:\/\//, "");
			const buffer = Buffer.from(cleanBase64, "base64");
			fs.writeFileSync(`${Common.tempDri.default}DouyinLoginQrcode.png`, buffer);
			const message2 = await e.reply(loginQRcode, { reply: true });
			logger.debug("二维码图片消息ID:", message2.messageId);
			msg_id.push(message2.messageId);
			gcInterval = setInterval(async () => {
				try {
					await page.evaluate(() => {
						if (window.gc) window.gc();
					});
				} catch {}
			}, 1e4);
			logger.mark("开始等待用户扫码登录...");
			const loginResult = await Promise.race([new Promise((resolve$1) => {
				const timer = setTimeout(async () => {
					logger.warn("扫码登录超时（2分钟），撤回二维码消息");
					await Promise.all(msg_id.map(async (id) => {
						await e.bot.recallMsg(e.contact, id);
					}));
					resolve$1(false);
				}, 120 * 1e3);
				let secondVerifyHandled = false;
				let scannedHandled = false;
				let responseCount = 0;
				page.on("response", async (response) => {
					responseCount++;
					const url = response.url();
					if (responseCount % 10 === 0) logger.debug(`[心跳] 已收到 ${responseCount} 个响应`);
					if (url.includes("passport") || url.includes("login") || url.includes("qrconnect") || url.includes("qrcode")) logger.debug(`[响应] 登录相关请求: ${url}, status: ${response.status()}`);
				});
				logger.mark("响应监听器已注册");
				page.on("response", async (response) => {
					try {
						if (response.url().includes("check_qrconnect")) {
							logger.debug(`收到登录轮询响应: ${response.url()}`);
							const hasSidGuard = (response.headers()["set-cookie"] || "").includes("sid_guard");
							logger.debug(`响应头包含 sid_guard: ${hasSidGuard}`);
							if (hasSidGuard) {
								clearTimeout(timer);
								logger.mark("检测到 sid_guard，登录成功");
								logger.debug("开始获取 cookies...");
								const cookies = await puppeteer.browser.cookies();
								logger.debug(`获取到 ${cookies.length} 个 cookies`);
								const cookieString = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");
								logger.debug("开始保存 cookies...");
								Config.Modify("cookies", "douyin", cookieString);
								logger.debug("cookies 保存完成");
								await e.reply("登录成功！用户登录凭证已保存至cookies.yaml", { reply: true });
								await Promise.all(msg_id.map(async (id) => {
									await e.bot.recallMsg(e.contact, id);
								}));
								logger.mark("关闭浏览器...");
								await puppeteer.browser.close();
								logger.mark("浏览器已关闭");
								resolve$1(true);
								return;
							}
							const responseBody = await response.text();
							const jsonResponse = JSON.parse(responseBody);
							logger.debug(`二维码状态：${jsonResponse.data?.status}, error_code: ${jsonResponse.data?.error_code}`);
							if (jsonResponse.data?.status === "scanned" && !scannedHandled) {
								scannedHandled = true;
								logger.mark("检测到二维码已被扫描");
								await Promise.all(msg_id.map(async (id) => {
									await e.bot.recallMsg(e.contact, id);
								}));
								msg_id.length = 0;
								const authMsg = await e.reply("此二维码已被扫描，请在手机上授权以登录", { reply: true });
								msg_id.push(authMsg.messageId);
							}
							if (jsonResponse.data?.error_code === 2046 && !secondVerifyHandled) {
								secondVerifyHandled = true;
								logger.mark("检测到需要二次验证");
								clearTimeout(timer);
								(async () => {
									try {
										await page.waitForSelector("#uc-second-verify", { timeout: 5e3 });
										if (!await page.evaluate(() => {
											const element = document.evaluate("//text()[contains(., '接收短信验证码')]/ancestor::*[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
											if (element) {
												element.click();
												return true;
											}
											return false;
										})) logger.warn("未找到\"接收短信验证码\"按钮");
										await new Promise((resolve$2) => setTimeout(resolve$2, 2e3));
										const inputSelector = "#uc-second-verify input";
										await page.waitForSelector(inputSelector, { timeout: 1e4 });
										const tipMsg = await e.reply("此次验证需要进行 2FA\n6 位数的验证码已发送至扫码设备绑定的手机号\n请在 60 秒内发送此验证码以通过 2FA", { reply: true });
										msg_id.push(tipMsg.messageId);
										let verifyAttempts = 0;
										const maxAttempts = 2;
										let verifySuccess = false;
										while (verifyAttempts < maxAttempts && !verifySuccess) {
											verifyAttempts++;
											logger.debug(`验证码输入尝试 ${verifyAttempts}/${maxAttempts}`);
											const ctx = await Promise.race([karin.ctx(e, { reply: true }), new Promise((_$1, reject) => setTimeout(() => reject(/* @__PURE__ */ new Error("2FA_TIMEOUT")), 6e4))]).catch(async (error) => {
												if (error.message === "2FA_TIMEOUT") {
													logger.warn("2FA验证码输入超时");
													clearTimeout(timer);
													if (gcInterval) clearInterval(gcInterval);
													await puppeteer.browser.close();
													await Promise.all(msg_id.map(async (id) => {
														await e.bot.recallMsg(e.contact, id);
													}));
													await e.reply("验证码验证码输入超时，登录失败", { reply: true });
													resolve$1(true);
												}
												throw error;
											});
											if (!ctx) return;
											await page.evaluate((selector) => {
												const input = document.querySelector(selector);
												if (input) input.value = "";
											}, inputSelector);
											await page.type(inputSelector, ctx.msg);
											const validatePromise = new Promise((resolveValidate) => {
												const validateHandler = async (resp) => {
													if (resp.url().includes("validate_code")) try {
														const validateBody = await resp.text();
														const validateJson = JSON.parse(validateBody);
														logger.debug("验证码验证响应:", validateJson);
														if (validateJson.data?.error_code === 1202) {
															logger.warn("验证码错误");
															page.off("response", validateHandler);
															resolveValidate(false);
														} else if (validateJson.message === "success" || !validateJson.data?.error_code) {
															logger.mark("验证码验证成功");
															page.off("response", validateHandler);
															resolveValidate(true);
														}
													} catch (err) {
														logger.debug("解析验证响应失败:", err);
													}
												};
												page.on("response", validateHandler);
												setTimeout(() => {
													page.off("response", validateHandler);
													resolveValidate(false);
												}, 5e3);
											});
											await page.evaluate(() => {
												const verifyBtn = Array.from(document.querySelectorAll("*")).find((el) => el.textContent?.trim() === "验证");
												if (verifyBtn) verifyBtn.click();
											});
											logger.mark("已提交验证码，等待验证结果...");
											verifySuccess = await validatePromise;
											if (!verifySuccess && verifyAttempts < maxAttempts) {
												const retryMsg = await e.reply("验证码错误，请重新发送正确的 6 位数验证码（剩余机会：1次）", { reply: true });
												msg_id.push(retryMsg.messageId);
											} else if (!verifySuccess && verifyAttempts >= maxAttempts) {
												logger.warn("验证码错误次数过多，登录失败");
												clearTimeout(timer);
												if (gcInterval) clearInterval(gcInterval);
												await puppeteer.browser.close();
												await Promise.all(msg_id.map(async (id) => {
													await e.bot.recallMsg(e.contact, id);
												}));
												await e.reply("验证码错误，登录失败", { reply: true });
												resolve$1(true);
												return;
											}
										}
										if (verifySuccess) logger.mark("2FA验证通过，等待最终登录确认...");
									} catch (err) {
										logger.error("二次验证处理失败:", err);
										clearTimeout(timer);
										if (gcInterval) clearInterval(gcInterval);
										await puppeteer.browser.close();
										await Promise.all(msg_id.map(async (id) => {
											await e.bot.recallMsg(e.contact, id);
										}));
										await e.reply("二次验证处理失败，登录失败", { reply: true });
										resolve$1(true);
									}
								})();
							}
						}
					} catch (error) {
						logger.error("处理响应时出错:", error);
					}
				});
			})]);
			if (gcInterval) clearInterval(gcInterval);
			if (!loginResult) {
				logger.warn("登录超时或失败");
				await puppeteer.browser.close();
				await e.reply("登录超时！二维码已失效！", { reply: true });
				return true;
			}
		} catch (err) {
			logger.error("登录流程出错:", err);
			if (gcInterval) clearInterval(gcInterval);
			await puppeteer.browser.close();
			await e.reply("登录过程出错，请查看控制台日志", { reply: true });
		}
	} catch (error) {
		logger.error(error);
		await e.reply("浏览器环境初始化失败，请查看控制台错误日志", { reply: true });
	}
	return true;
};
var waitQrcode = async (page) => {
	const qrCodeSelector = "img[aria-label=\"二维码\"]";
	try {
		await page.waitForSelector(qrCodeSelector, { timeout: 6e4 });
	} catch {
		await safeScreenshot(page, path.join(karinPathTemp, Root.pluginName, "DouyinLoginQrcodeError.png"));
		throw new Error("加载超时了，或者遇到验证码了。。。");
	}
	logger.debug("二维码加载完成");
	await new Promise((resolve$1) => setTimeout(resolve$1, 1e3));
	const qrCodeImages = (await page.$$eval("img", (imgs) => imgs.map((img$2) => ({
		src: img$2.src,
		ariaLabel: img$2.getAttribute("aria-label")
	})))).filter((img$2) => img$2.ariaLabel === "二维码");
	if (qrCodeImages.length === 0) throw new Error("未找到二维码");
	const originalImage = qrCodeImages[0].src;
	try {
		let imageBuffer;
		if (originalImage.startsWith("data:image")) {
			const base64Data = originalImage.split(",")[1];
			imageBuffer = Buffer.from(base64Data, "base64");
		} else {
			const response = await fetch(originalImage);
			imageBuffer = Buffer.from(await response.arrayBuffer());
		}
		const qrContent = QRCodeScanner.scanFromBuffer(imageBuffer);
		if (qrContent) {
			logger.mark("二维码解码成功:", qrContent);
			return {
				url: qrContent,
				originalImage
			};
		}
	} catch (error) {
		logger.warn("二维码解码失败:", error);
	}
	logger.warn("解码失败，将使用原始二维码图片");
	return {
		url: null,
		originalImage
	};
};
await init_module();
await init_Config();
const task = Config.app.removeCache && karin$1.task("[kkk-缓存自动删除]", "0 */4 * * *", async () => {
	try {
		const twoHoursAgo = Date.now() - 7200 * 1e3;
		const videoDeleted = removeOldFiles(Common.tempDri.video, twoHoursAgo);
		logger.mark(`${Common.tempDri.video} 目录下已删除 ${videoDeleted} 个文件`);
		if (Config.app.downloadImageLocally) {
			const imageDeleted = removeOldFiles(Common.tempDri.images, twoHoursAgo);
			logger.mark(`${Common.tempDri.images} 目录下已删除 ${imageDeleted} 个文件`);
		}
	} catch (err) {
		console.error("删除文件时出错:", err);
	}
});
const biLogin = karin$1.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, async (e) => {
	await bilibiliLogin(e);
	return true;
}, {
	perm: Config.bilibili.loginPerm,
	name: "kkk-ck管理"
});
const dylogin = karin$1.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
	await douyinLogin(e);
	return true;
}, {
	perm: Config.douyin.loginPerm,
	name: "kkk-ck管理"
});
const removeOldFiles = (dir, beforeTimestamp) => {
	let deletedCount = 0;
	try {
		const files = fs.readdirSync(dir);
		for (const file of files) {
			const filePath = path.join(dir, file);
			const stats = fs.statSync(filePath);
			if (stats.isDirectory()) {
				deletedCount += removeOldFiles(filePath, beforeTimestamp);
				if (fs.readdirSync(filePath).length === 0) fs.rmdirSync(filePath);
			} else if (stats.mtimeMs < beforeTimestamp) {
				fs.unlinkSync(filePath);
				deletedCount++;
			}
		}
	} catch (err) {
		logger.error(`处理目录 ${dir} 时出错:`, err);
	}
	return deletedCount;
};
await init_module();
await init_Config();
var HELP_MENU_CONFIG = [
	{
		title: "常用功能",
		items: [{
			title: "自动识别分享链接进行解析",
			description: (() => {
				const platforms = [];
				if (Config.douyin?.switch) platforms.push("抖音");
				if (Config.bilibili?.switch) platforms.push("哔哩哔哩");
				if (Config.kuaishou?.switch) platforms.push("快手");
				if (Config.xiaohongshu?.switch) platforms.push("小红书");
				return platforms.length > 0 ? `支持「${platforms.join("」「")}」` : "暂无可用平台";
			})(),
			icon: "Link",
			roles: ["member", "master"]
		}, {
			title: "「#解析」「#kkk解析」「#弹幕解析」",
			description: "在解析功能关闭的情况下，可对引用消息进行解析；弹幕解析仅使用于「抖音」「哔哩哔哩」",
			icon: "Sparkles",
			roles: ["member", "master"]
		}]
	},
	{
		title: "推送相关",
		items: [{
			title: "#抖音/B站推送列表",
			description: "查看当前群的订阅推送列表",
			icon: "List",
			roles: ["master"]
		}, {
			title: "#抖音/B站全部?强制推送",
			description: "全部强制推送：手动模拟一次定时任务；\n强制推送：只在触发群模拟一次定时任务；\n已推送过的不会再推送",
			icon: "Send",
			roles: ["master"]
		}],
		subGroups: [{
			title: "在群聊中再发送一次即可取消订阅",
			items: [{
				title: "#设置抖音推送 + 抖音号",
				description: "在群聊中发送以对该群订阅该抖音博主的作品更新",
				icon: "Bell",
				roles: Config.douyin.push.permission === "all" ? ["member", "master"] : ["master"]
			}, {
				title: "#设置B站推送 + UP主UID",
				description: "在群聊中发送以对该群订阅该B站UP主的稿件/动态更新",
				icon: "Bell",
				roles: Config.bilibili.push.permission === "all" ? ["member", "master"] : ["master"]
			}]
		}]
	},
	{
		title: "设置相关",
		items: [{
			title: "#kkk设置推送机器人 + Bot ID",
			description: "一键更换推送机器人",
			icon: "Bot",
			roles: ["master"]
		}, {
			title: "#B站登录",
			description: "使用哔哩哔哩APP扫码登录获取 Cookies",
			icon: "LogIn",
			roles: ["master"]
		}]
	},
	{
		title: "其他",
		items: [{
			title: "「#kkk更新日志」「#kkk更新」",
			description: "字面意思~",
			icon: "RefreshCw",
			roles: ["master"]
		}]
	}
];
var buildMenuForRole = (role) => {
	const filterItems = (items = []) => items.filter((i) => !i.roles || i.roles.includes(role)).map(({ title, description, icon }) => ({
		title,
		description,
		icon
	}));
	return HELP_MENU_CONFIG.map((group) => {
		const items = filterItems(group.items);
		const subGroups = group.subGroups?.map((sg) => ({
			title: sg.title,
			items: filterItems(sg.items)
		})).filter((s) => s.items.length > 0);
		return {
			title: group.title,
			items,
			subGroups
		};
	}).filter((g) => g.items.length > 0 || g.subGroups && g.subGroups.length > 0);
};
const help = karin$1.command(/^#?kkk帮助$/, async (e) => {
	const masters = config.master().filter((id) => id !== "console");
	const role = !!e.sender && masters.includes(e.sender.userId) ? "master" : "member";
	const menu = buildMenuForRole(role);
	const img$2 = await Render("other/help", {
		title: "KKK插件帮助页面",
		menu,
		list: menu.flatMap((group) => {
			const groupItems = group.items.map((item) => ({
				title: item.title,
				description: item.description
			}));
			const subItems = group.subGroups?.flatMap((sg) => sg.items.map((item) => ({
				title: item.title,
				description: item.description
			}))) || [];
			return [...groupItems, ...subItems];
		}),
		role
	});
	await e.reply(img$2);
	return true;
}, { name: "kkk-帮助" });
const version = karin$1.command(/^#?kkk(版本|更新日志)$/, async (e) => {
	const changelogContent = fs.readFileSync(Root.pluginPath + "/CHANGELOG.md", "utf8");
	const img$2 = await Render("other/changelog", {
		markdown: logs({
			version: Root.pluginVersion,
			data: changelogContent,
			length: 10
		}),
		Tip: false,
		localVersion: "",
		remoteVersion: ""
	});
	e.reply(img$2);
	return true;
}, { name: "kkk-版本" });
await init_date_fns();
await init_module();
await init_db();
await init_amagiClient();
await init_Config();
await init_ErrorHandler();
var handleDouyinPush = wrapWithErrorHandler(async () => {
	await new DouYinpush().action();
	return true;
}, { businessName: "抖音推送任务" });
var handleBilibiliPush = wrapWithErrorHandler(async () => {
	await new Bilibilipush().action();
	return true;
}, { businessName: "B站推送任务" });
var handleForcePush = wrapWithErrorHandler(async (e) => {
	if (e.msg.includes("抖音")) {
		await new DouYinpush().action();
		return true;
	} else if (e.msg.includes("B站")) {
		await new Bilibilipush().action();
		return true;
	}
	return true;
}, { businessName: "强制推送" });
var handleSetDouyinPush = wrapWithErrorHandler(async (e) => {
	const query = e.msg.replace(/^#设置抖音推送/, "").trim();
	if (query === "开启" || query === "关闭") {
		const enable = query === "开启";
		Config.Modify("douyin", "push.switch", enable);
		await e.reply(`抖音推送已${enable ? "开启" : "关闭"}，${enable ? "需要重启后生效" : "将在下次重启后停止推送"}`);
		logger.info(`抖音推送已${enable ? "开启" : "关闭"}`);
		return true;
	}
	const data$1 = await douyinFetcher.searchContent({
		query,
		type: "user",
		typeMode: "strict"
	});
	await new DouYinpush(e).setting(data$1.data);
	return true;
}, { businessName: "设置抖音推送" });
var handleSetBilibiliPush = wrapWithErrorHandler(async (e) => {
	const query = e.msg.replace(/^#设置[bB]站推送/, "").replace(/^(?:[Uu][Ii][Dd]:)?/, "").trim();
	if (query === "开启" || query === "关闭") {
		const enable = query === "开启";
		Config.Modify("bilibili", "push.switch", enable);
		await e.reply(`B站推送已${enable ? "开启" : "关闭"}，${enable ? "需要重启后生效" : "将在下次重启后停止推送"}`);
		logger.info(`B站推送已${enable ? "开启" : "关闭"}`);
		return true;
	}
	if (!Config.cookies.bilibili) {
		await e.reply("\n请先配置B站Cookie", { at: true });
		return true;
	}
	const match = /^(\d+)$/.exec(query);
	if (match && match[1]) {
		const data$1 = await bilibiliFetcher.fetchUserCard({
			host_mid: Number(match[1]),
			typeMode: "strict"
		});
		await new Bilibilipush(e).setting(data$1.data);
	}
	return true;
}, { businessName: "设置B站推送" });
var handleBilibiliPushList = wrapWithErrorHandler(async (e) => {
	await new Bilibilipush(e).renderPushList();
}, { businessName: "B站推送列表" });
var handleDouyinPushList = wrapWithErrorHandler(async (e) => {
	await new DouYinpush(e).renderPushList();
}, { businessName: "抖音推送列表" });
var handleChangeBotID = wrapWithErrorHandler(async (e) => {
	const newBotId = e.msg.replace(/^#kkk设置推送机器人/, "");
	const newDouyinlist = Config.pushlist.douyin.map((item) => {
		const modifiedGroupIds = item.group_id.map((groupId) => {
			const [group_id, oldBotId] = groupId.split(":");
			if (oldBotId && oldBotId !== newBotId) douyinDBInstance.updateGroupBotId(group_id, oldBotId, newBotId).catch((err) => {
				logger.error(`Failed to update douyin group ${group_id}:`, err);
			});
			return `${group_id}:${newBotId}`;
		});
		return {
			...item,
			group_id: modifiedGroupIds
		};
	});
	const newBilibililist = Config.pushlist.bilibili.map((item) => {
		const modifiedGroupIds = item.group_id.map((groupId) => {
			const [group_id, oldBotId] = groupId.split(":");
			if (oldBotId && oldBotId !== newBotId) bilibiliDBInstance.updateGroupBotId(group_id, oldBotId, newBotId).catch((err) => {
				logger.error(`Failed to update bilibili group ${group_id}:`, err);
			});
			return `${group_id}:${newBotId}`;
		});
		return {
			...item,
			group_id: modifiedGroupIds
		};
	});
	Config.Modify("pushlist", "douyin", newDouyinlist);
	Config.Modify("pushlist", "bilibili", newBilibililist);
	await e.reply("推送机器人已修改为" + newBotId);
	return true;
}, { businessName: "设置推送机器人" });
var handleTestDouyinPush = wrapWithErrorHandler(async (e) => {
	const iddata = await getDouyinID(e, String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g)));
	const workInfo = await douyinFetcher.parseWork({
		aweme_id: iddata.aweme_id,
		typeMode: "strict"
	});
	const userProfile = await douyinFetcher.fetchUserProfile({
		sec_uid: workInfo.data.aweme_detail.author.sec_uid,
		typeMode: "strict"
	});
	const realUrl = Config.douyin.push.shareType === "web" && await new Network({
		url: workInfo.data.aweme_detail.share_url,
		headers: {
			"User-Agent": "Apifox/1.0.0 (https://apifox.com)",
			Accept: "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			Connection: "keep-alive"
		}
	}).getLocation();
	const img$2 = await Render("douyin/dynamic", {
		image_url: iddata.is_mp4 ? workInfo.data.aweme_detail.video.animated_cover?.url_list[0] ?? workInfo.data.aweme_detail.video.cover.url_list[0] : workInfo.data.aweme_detail.images[0].url_list[0],
		desc: workInfo.data.aweme_detail.desc,
		dianzan: Common.count(workInfo.data.aweme_detail.statistics.digg_count),
		pinglun: Common.count(workInfo.data.aweme_detail.statistics.comment_count),
		share: Common.count(workInfo.data.aweme_detail.statistics.share_count),
		shouchang: Common.count(workInfo.data.aweme_detail.statistics.collect_count),
		create_time: format(fromUnixTime(workInfo.data.aweme_detail.create_time), "yyyy-MM-dd HH:mm"),
		avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userProfile.data.user.avatar_larger.uri,
		share_url: Config.douyin.push.shareType === "web" ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${workInfo.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`,
		username: workInfo.data.aweme_detail.author.nickname,
		"抖音号": userProfile.data.user.unique_id === "" ? userProfile.data.user.short_id : userProfile.data.user.unique_id,
		"粉丝": Common.count(userProfile.data.user.follower_count),
		"获赞": Common.count(userProfile.data.user.total_favorited),
		"关注": Common.count(userProfile.data.user.following_count),
		cooperation_info: (() => {
			const raw = workInfo.data.aweme_detail.cooperation_info;
			if (!raw) return void 0;
			const rawCreators = Array.isArray(raw.co_creators) ? raw.co_creators : [];
			const author = workInfo.data.aweme_detail.author;
			const authorUid = author?.uid;
			const authorSecUid = author?.sec_uid;
			const authorNickname = author?.nickname;
			const authorInCreators = rawCreators.some((c) => authorUid && c.uid && c.uid === authorUid || authorSecUid && c.sec_uid && c.sec_uid === authorSecUid || authorNickname && c.nickname && c.nickname === authorNickname);
			const co_creators = rawCreators.map((c) => {
				const firstUrl = c.avatar_thumb?.url_list?.[0] ?? (c.avatar_thumb?.uri ? `https://p3.douyinpic.com/${c.avatar_thumb.uri}` : void 0);
				return {
					avatar_thumb: firstUrl ? { url_list: [firstUrl] } : void 0,
					nickname: c.nickname,
					role_title: c.role_title
				};
			});
			return {
				co_creator_nums: Math.max(Number(raw.co_creator_nums || 0), co_creators.length) + (authorInCreators ? 0 : 1),
				co_creators
			};
		})()
	});
	e.reply(img$2);
	return true;
}, { businessName: "测试抖音推送" });
const douyinPush = Config.douyin.push.switch && karin$1.task("抖音推送", Config.douyin.push.cron, handleDouyinPush, {
	log: true,
	type: "skip"
});
const bilibiliPush = Config.bilibili.push.switch && karin$1.task("B站推送", Config.bilibili.push.cron, handleBilibiliPush, {
	log: true,
	type: "skip"
});
const forcePush = karin$1.command(/#(抖音|B站)(全部)?强制推送/, handleForcePush, {
	name: "𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★",
	perm: "master",
	event: "message.group"
});
const setdyPush = karin$1.command(/^#设置抖音推送/, handleSetDouyinPush, {
	name: "kkk-推送功能-设置",
	event: "message.group",
	perm: Config.douyin.push.permission,
	dsbAdapter: ["qqbot"]
});
const setbiliPush = karin$1.command(/^#设置[bB]站推送/, handleSetBilibiliPush, {
	name: "kkk-推送功能-设置",
	event: "message.group",
	perm: Config.bilibili.push.permission,
	dsbAdapter: ["qqbot"]
});
const bilibiliPushList = karin$1.command(/^#?[bB]站推送列表$/, handleBilibiliPushList, {
	name: "kkk-推送功能-列表",
	event: "message.group"
});
const douyinPushList = karin$1.command(/^#?抖音推送列表$/, handleDouyinPushList, {
	name: "kkk-推送功能-列表",
	event: "message.group"
});
const changeBotID = karin$1.command(/^#kkk设置推送机器人/, handleChangeBotID, {
	name: "kkk-推送功能-设置",
	perm: "master"
});
const testDouyinPush = karin$1.command(/^#测试抖音推送\s*(https?:\/\/[^\s]+)?/, handleTestDouyinPush, {
	name: "kkk-推送功能-测试",
	event: "message.group",
	perm: Config.douyin.push.permission,
	dsbAdapter: ["qqbot"],
	priority: -Infinity
});
await init_Config();
await init_Render();
function getLocalIP() {
	const interfaces = os.networkInterfaces();
	const candidates = [];
	for (const name of Object.keys(interfaces)) {
		const netInterface = interfaces[name];
		if (!netInterface) continue;
		for (const net of netInterface) if (net.family === "IPv4" && !net.internal) candidates.push(net.address);
	}
	return candidates.find((ip) => {
		if (ip.startsWith("192.168.")) return true;
		if (ip.startsWith("10.")) return true;
		if (ip.startsWith("172.")) {
			const second = parseInt(ip.split(".")[1], 10);
			if (second >= 16 && second <= 31) return true;
		}
		return false;
	}) || candidates[0] || "127.0.0.1";
}
async function getPublicIP() {
	for (const api of [
		"4.ipw.cn",
		"https://api.ipify.org",
		"https://icanhazip.com",
		"https://ifconfig.me/ip",
		"https://api.ip.sb/ip"
	]) try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 5e3);
		const response = await fetch(api, { signal: controller.signal });
		clearTimeout(timeout);
		if (response.ok) {
			const ip = (await response.text()).trim();
			if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return ip;
		}
	} catch {}
	return null;
}
async function getHostByConfig() {
	if ((Config.app.qrLoginAddrType || "lan") === "external") {
		const externalAddr = Config.app.qrLoginExternalAddr;
		if (externalAddr && externalAddr.trim()) return externalAddr.trim();
		logger.debug("[APP扫码登录] 未配置外部地址，正在尝试获取公网 IP...");
		const publicIP = await getPublicIP();
		if (publicIP) {
			logger.debug(`[APP扫码登录] 获取到公网 IP: ${publicIP}`);
			return publicIP;
		}
		logger.warn("[APP扫码登录] 无法获取公网 IP，回退到局域网 IP");
		return getLocalIP();
	}
	return getLocalIP();
}
const qrLogin = karin$1.command(/^#?(kkk)?登录$/i, async (e) => {
	const bot = karin$1.getBot(e.selfId);
	const userId = e.userId;
	if (e.isGroup) {
		if (!(await bot?.getFriendList())?.some((f) => f.userId === userId)) {
			await e.reply("请先添加 Bot 为好友后再试");
			return true;
		}
	}
	const port = process.env.HTTP_PORT || "7777";
	const authKey = process.env.HTTP_AUTH_KEY || "";
	const host = await getHostByConfig();
	const protocol = "http";
	if (!authKey) {
		await e.reply("未配置 HTTP_AUTH_KEY 环境变量，无法生成登录二维码");
		return true;
	}
	const qrData = JSON.stringify({
		protocol,
		host,
		port,
		authKey
	});
	const serverUrl = `${protocol}://${host}:${port}`;
	try {
		const images = await Render("other/qrlogin", {
			share_url: qrData,
			serverUrl
		});
		await karin$1.sendMaster(e.selfId, userId, images);
		if (e.isGroup) await e.reply("登录二维码已私聊发送，请查收~");
	} catch (error) {
		await e.reply("生成二维码失败: " + (error instanceof Error ? error.message : String(error)));
	}
	return true;
}, {
	perm: "master",
	name: "kkk-APP扫码登录"
});
const getXiaohongshuID = async (url, log = true) => {
	const longLink = (await axios.get(url, { headers: { "User-Agent": "Apifox/1.0.0 (https://apifox.com)" } }))?.request?.res?.responseUrl ?? url;
	const normalizedLink = (() => {
		try {
			return decodeURIComponent(longLink);
		} catch {
			return longLink;
		}
	})();
	const effectiveLink = (() => {
		try {
			const u = new URL(normalizedLink);
			if (u.pathname.startsWith("/404")) {
				const rp = u.searchParams.get("redirectPath");
				if (rp) try {
					return decodeURIComponent(rp);
				} catch {
					return rp;
				}
			}
			const mm = /[?&]redirectPath=([^&#]+)/.exec(normalizedLink);
			if (mm?.[1]) try {
				return decodeURIComponent(mm[1]);
			} catch {
				return mm[1];
			}
			return normalizedLink;
		} catch {
			const mm = /[?&]redirectPath=([^&#]+)/.exec(normalizedLink);
			if (mm?.[1]) try {
				return decodeURIComponent(mm[1]);
			} catch {
				return mm[1];
			}
			return normalizedLink;
		}
	})();
	const pickToken = (s) => {
		try {
			const u = new URL(s);
			const t = u.searchParams.get("xsec_token") || u.searchParams.get("XSEC_TOKEN") || void 0;
			if (t) return t;
			if (u.hash) {
				const mm = /(?:^|[?&#])(?:xsec_token|XSEC_TOKEN)=([^&#]+)/.exec(u.hash);
				if (mm?.[1]) return mm[1];
			}
			return;
		} catch {
			return /(?:^|[?&#])(?:xsec_token|XSEC_TOKEN)=([^&#]+)/.exec(s)?.[1];
		}
	};
	const finalToken = pickToken(effectiveLink) ?? pickToken(normalizedLink);
	let result = { type: "unknown" };
	switch (true) {
		case /xiaohongshu\.com\/discovery\/item\/([0-9a-zA-Z]+)/.test(effectiveLink): {
			const m = /xiaohongshu\.com\/discovery\/item\/([0-9a-zA-Z]+)/.exec(effectiveLink);
			result = {
				type: "note",
				note_id: m ? m[1] : void 0,
				xsec_token: finalToken
			};
			break;
		}
		case /xiaohongshu\.com\/explore\/([0-9a-zA-Z]+)/.test(effectiveLink): {
			const m = /xiaohongshu\.com\/explore\/([0-9a-zA-Z]+)/.exec(effectiveLink);
			result = {
				type: "note",
				note_id: m ? m[1] : void 0,
				xsec_token: finalToken
			};
			break;
		}
		default:
			result = { type: "unknown" };
			break;
	}
	if (result.type === "unknown") throw new Error("无法从链接中提取小红书笔记ID");
	log && console.log(result);
	return result;
};
init_date_fns();
init_locale();
init_Config();
var processCommentEmojis = (text, emojiData) => {
	if (!text || !emojiData || !Array.isArray(emojiData)) return text;
	let processedText = text;
	for (const emoji of emojiData) if (emoji.name && emoji.url && processedText.includes(emoji.name)) {
		const escapedName = emoji.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(escapedName, "g");
		processedText = processedText.replace(regex, `<img src="${emoji.url}" alt="" />`);
	}
	return processedText.split(/(<img[^>]*>)/).map((part) => {
		if (part.startsWith("<img")) return part;
		if (part.trim()) return `<span>${part}</span>`;
		return part;
	}).join("");
};
var processAtUsers = (text, atUsers, useDarkTheme = false) => {
	if (!text || !atUsers || !Array.isArray(atUsers) || atUsers.length === 0) return text;
	let processedText = text;
	for (const atUser of atUsers) if (atUser.nickname && processedText.includes(`@${atUser.nickname}`)) {
		const escapedNickname = atUser.nickname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`@${escapedNickname}`, "g");
		const color = useDarkTheme ? "#c7daef" : "#13386c";
		processedText = processedText.replace(regex, `<span style="color: ${color};">@${atUser.nickname}</span>`);
	}
	return processedText;
};
const getRelativeTimeFromTimestamp = (timestamp) => {
	const commentDate = new Date(timestamp);
	const diffSeconds = differenceInSeconds(/* @__PURE__ */ new Date(), commentDate);
	if (diffSeconds < 30) return "刚刚";
	if (diffSeconds < 7776e3) return formatDistanceToNow(commentDate, {
		locale: zhCN,
		addSuffix: true
	});
	return format(commentDate, "yyyy-MM-dd");
};
const xiaohongshuComments = async (data$1, emojiData, useDarkTheme = false) => {
	if (!data$1.data || !data$1.data.comments || data$1.data.comments.length === 0) return [];
	const comments = [];
	for (const comment of data$1.data.comments) {
		const processedComment = {
			id: comment.id,
			note_id: comment.note_id,
			content: comment.content,
			user_info: comment.user_info,
			create_time: getRelativeTimeFromTimestamp(comment.create_time),
			ip_location: comment.ip_location || "未知",
			like_count: comment.like_count,
			liked: comment.liked,
			pictures: comment.pictures || [],
			sub_comment_count: comment.sub_comment_count,
			sub_comments: comment.sub_comments || [],
			show_tags: comment.show_tags || [],
			at_users: comment.at_users || [],
			status: comment.status,
			isTop: Array.isArray(comment.show_tags) && comment.show_tags.some((t) => {
				if (typeof t === "string") return t === "user_top";
				if (t && typeof t === "object") return t.name === "user_top" || t.tag === "user_top";
				return false;
			})
		};
		if (comment.sub_comments && Array.isArray(comment.sub_comments)) processedComment.sub_comments = comment.sub_comments.map((subComment) => ({
			id: subComment.id,
			note_id: subComment.note_id,
			content: subComment.content,
			user_info: subComment.user_info,
			create_time: getRelativeTimeFromTimestamp(subComment.create_time),
			ip_location: subComment.ip_location || "未知",
			like_count: subComment.like_count,
			liked: subComment.liked,
			pictures: subComment.pictures || [],
			show_tags: subComment.show_tags || [],
			at_users: subComment.at_users || [],
			status: subComment.status,
			target_comment: subComment.target_comment,
			isTop: Array.isArray(subComment.show_tags) && subComment.show_tags.some((t) => {
				if (typeof t === "string") return t === "user_top";
				if (t && typeof t === "object") return t.name === "user_top" || t.tag === "user_top";
				return false;
			})
		}));
		comments.push(processedComment);
	}
	for (const comment of comments) {
		if (typeof comment.content !== "string") comment.content = String(comment.content || "");
		comment.content = comment.content.replace(/\n/g, "<br>").replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));
		comment.content = processAtUsers(comment.content, comment.at_users, useDarkTheme);
		comment.content = processCommentEmojis(comment.content, emojiData);
		if (parseInt(comment.like_count) > 1e4) comment.like_count = (parseInt(comment.like_count) / 1e4).toFixed(1) + "w";
		if (comment.sub_comments && Array.isArray(comment.sub_comments)) for (const subComment of comment.sub_comments) {
			if (typeof subComment.content !== "string") subComment.content = String(subComment.content || "");
			subComment.content = subComment.content.replace(/\n/g, "<br>").replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));
			subComment.content = processAtUsers(subComment.content, subComment.at_users, useDarkTheme);
			subComment.content = processCommentEmojis(subComment.content, emojiData);
			if (parseInt(subComment.like_count) > 1e4) subComment.like_count = (parseInt(subComment.like_count) / 1e4).toFixed(1) + "w";
		}
	}
	comments.sort((a, b) => Number(b.isTop) - Number(a.isTop));
	return comments.slice(0, Config.xiaohongshu.numcomment);
};
await init_module();
await init_Config();
var Xiaohongshu = class extends Base {
	e;
	type;
	constructor(e, iddata) {
		super(e);
		this.e = e;
		this.type = iddata?.type;
	}
	async XiaohongshuHandler(data$1) {
		Config.xiaohongshu.tip && await this.e.reply("检测到小红书链接，开始解析");
		const NoteData = await this.amagi.xiaohongshu.fetcher.fetchNoteDetail({
			typeMode: "strict",
			note_id: data$1.note_id,
			xsec_token: data$1.xsec_token
		});
		const formattedEmojis = XiaohongshuEmoji(await this.amagi.xiaohongshu.fetcher.fetchEmojiList({ typeMode: "strict" }));
		if (Config.xiaohongshu.sendContent.some((item) => item === "info")) {
			const noteInfoImg = await Render("xiaohongshu/noteInfo", {
				title: NoteData.data.data.items[0].note_card.title,
				desc: processXiaohongshuEmojis(NoteData.data.data.items[0].note_card.desc, formattedEmojis),
				statistics: NoteData.data.data.items[0].note_card.interact_info,
				note_id: NoteData.data.data.items[0].note_card.note_id,
				author: NoteData.data.data.items[0].note_card.user,
				image_url: NoteData.data.data.items[0].note_card.image_list[0].url_default,
				time: NoteData.data.data.items[0].note_card.time,
				ip_location: NoteData.data.data.items[0].note_card.ip_location
			});
			this.e.reply(noteInfoImg);
		}
		if (Config.xiaohongshu.sendContent.some((item) => item === "comment")) {
			const CommentData = await this.amagi.xiaohongshu.fetcher.fetchNoteComments({
				typeMode: "strict",
				note_id: data$1.note_id,
				xsec_token: data$1.xsec_token
			});
			if (!CommentData.data.data.comments || CommentData.data.data.comments.length === 0) await this.e.reply("这个笔记没有评论 ~");
			else {
				const processedComments = await xiaohongshuComments(CommentData.data, formattedEmojis);
				const commentListImg = await Render("xiaohongshu/comment", {
					Type: NoteData.data.data.items[0].note_card.video ? "视频" : "图文",
					CommentsData: processedComments,
					CommentLength: processedComments.length,
					ImageLength: NoteData.data.data.items[0].note_card.image_list?.length || 0,
					share_url: `https://www.xiaohongshu.com/discovery/item/${data$1.note_id}?source=webshare&xhsshare=pc_web&xsec_token=${data$1.xsec_token}&xsec_source=pc_share`
				});
				this.e.reply(commentListImg);
			}
		}
		if (!NoteData.data.data.items[0].note_card.video && Config.xiaohongshu.sendContent.includes("image")) {
			const Imgs = [];
			const title = NoteData.data.data.items[0].note_card.title;
			for (const [index, item] of NoteData.data.data.items[0].note_card.image_list.entries()) {
				const imageUrl = await processImageUrl(item.url_default, title, index);
				Imgs.push(segment.image(imageUrl));
			}
			const res = common.makeForward(Imgs, this.e.sender.userId, this.e.sender.nick);
			if (NoteData.data.data.items[0].note_card.image_list.length === 1) {
				const imageUrl = await processImageUrl(NoteData.data.data.items[0].note_card.image_list[0].url_default, title);
				await this.e.reply(segment.image(imageUrl));
			} else await this.e.bot.sendForwardMsg(this.e.contact, res, {
				source: "图片合集",
				summary: `查看${res.length}张图片消息`,
				prompt: "小红书图集解析结果",
				news: [{ text: "点击查看解析结果" }]
			});
		}
		if (NoteData.data.data.items[0].note_card.video && Config.xiaohongshu.sendContent.includes("video")) {
			const video = NoteData.data.data.items[0].note_card.video;
			const selectedVideo = xiaohongshuProcessVideos(video.media?.stream, Config.xiaohongshu.videoQuality, Config.xiaohongshu.maxAutoVideoSize);
			if (selectedVideo) await downloadVideo(this.e, {
				video_url: selectedVideo.master_url,
				title: {
					timestampTitle: `tmp_${Date.now()}.mp4`,
					originTitle: `${selectedVideo.stream_desc}.mp4`
				},
				headers: {
					...BASE_HEADERS,
					Referer: selectedVideo.master_url
				}
			}, { message_id: this.e.messageId });
			else await this.e.reply(segment.video(video.url_default));
		}
		return true;
	}
};
const xiaohongshuProcessVideos = (streamData, videoQuality, maxAutoVideoSize) => {
	if (!streamData) {
		logger.warn("没有找到视频流数据");
		return null;
	}
	const codecPriority = [
		"h265",
		"h264",
		"av1",
		"h266"
	];
	const allVideos = [];
	for (const codec of codecPriority) if (streamData[codec] && Array.isArray(streamData[codec])) allVideos.push(...streamData[codec]);
	if (allVideos.length === 0) {
		logger.warn("没有找到可用的视频流");
		return null;
	}
	logger.debug(`找到 ${allVideos.length} 个视频流`);
	const getQualityLevel = (width, height) => {
		const pixels = width * height;
		if (pixels >= 3840 * 2160) return "4k";
		if (pixels >= 2560 * 1440) return "2k";
		if (pixels >= 1920 * 1080) return "1080p";
		if (pixels >= 1280 * 720) return "720p";
		return "540p";
	};
	const videosByQuality = /* @__PURE__ */ new Map();
	allVideos.forEach((video) => {
		const quality = getQualityLevel(video.width, video.height);
		if (!videosByQuality.has(quality)) videosByQuality.set(quality, []);
		videosByQuality.get(quality).push(video);
	});
	videosByQuality.forEach((videos) => {
		videos.sort((a, b) => b.size - a.size);
	});
	if (videoQuality === "adapt") {
		const sizeLimitBytes = (maxAutoVideoSize || Config.upload.filelimit) * 1024 * 1024;
		for (const quality of [
			"4k",
			"2k",
			"1080p",
			"720p",
			"540p"
		]) {
			const qualityVideos = videosByQuality.get(quality);
			if (qualityVideos && qualityVideos.length > 0) {
				const suitableVideo = qualityVideos.find((video) => video.size <= sizeLimitBytes);
				if (suitableVideo) {
					logger.debug(`自动选择画质: ${quality}, 文件大小: ${(suitableVideo.size / (1024 * 1024)).toFixed(2)}MB, 编码: ${suitableVideo.video_codec}`);
					return suitableVideo;
				}
			}
		}
		let smallestVideo = allVideos[0];
		allVideos.forEach((video) => {
			if (video.size < smallestVideo.size) smallestVideo = video;
		});
		logger.debug(`未找到符合大小限制的视频，选择最小视频: ${(smallestVideo.size / (1024 * 1024)).toFixed(2)}MB, 编码: ${smallestVideo.video_codec}`);
		return smallestVideo;
	}
	const targetQuality = videoQuality;
	const targetVideos = videosByQuality.get(targetQuality);
	if (targetVideos && targetVideos.length > 0) {
		logger.debug(`选择固定画质: ${targetQuality}, 文件大小: ${(targetVideos[0].size / (1024 * 1024)).toFixed(2)}MB, 编码: ${targetVideos[0].video_codec}`);
		return targetVideos[0];
	}
	const qualityPriority = [
		"4k",
		"2k",
		"1080p",
		"720p",
		"540p"
	];
	const targetIndex = qualityPriority.indexOf(targetQuality);
	for (let i = targetIndex + 1; i < qualityPriority.length; i++) {
		const fallbackVideos = videosByQuality.get(qualityPriority[i]);
		if (fallbackVideos && fallbackVideos.length > 0) {
			logger.debug(`目标画质 ${targetQuality} 不可用，降级到: ${qualityPriority[i]}, 编码: ${fallbackVideos[0].video_codec}`);
			return fallbackVideos[0];
		}
	}
	for (let i = targetIndex - 1; i >= 0; i--) {
		const fallbackVideos = videosByQuality.get(qualityPriority[i]);
		if (fallbackVideos && fallbackVideos.length > 0) {
			logger.debug(`目标画质 ${targetQuality} 不可用，升级到: ${qualityPriority[i]}, 编码: ${fallbackVideos[0].video_codec}`);
			return fallbackVideos[0];
		}
	}
	logger.warn("未找到任何匹配的画质，返回默认视频");
	return allVideos[0];
};
const XiaohongshuEmoji = (data$1) => {
	const ListArray = [];
	if (data$1.data.data.emoji.tabs) {
		for (const tab of data$1.data.data.emoji.tabs) if (tab.collection) {
			for (const collection of tab.collection) if (collection.emoji) for (const emoji of collection.emoji) {
				const Objject = {
					name: emoji.image_name,
					url: emoji.image
				};
				ListArray.push(Objject);
			}
		}
	}
	return ListArray;
};
var processXiaohongshuEmojis = (text, emojiData) => {
	if (!text || !emojiData || !Array.isArray(emojiData)) return `<span>${text}</span>`;
	let processedText = text;
	processedText = processedText.replace(/\[话题\]/g, "");
	for (const emoji of emojiData) if (emoji.name && emoji.url && processedText.includes(emoji.name)) {
		const escapedName = emoji.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(escapedName, "g");
		processedText = processedText.replace(regex, `<img src="${emoji.url}" alt="${emoji.name}" />`);
	}
	return processedText.split(/(<img[^>]*>)/).map((part) => {
		if (part.startsWith("<img")) return part;
		if (part.trim()) return `<span>${part}</span>`;
		return part;
	}).join("");
};
await init_module();
await init_Config();
await init_ErrorHandler();
var reg = {
	douyin: /(https?:\/\/)?(www|v|jx|m|jingxuan)\.(douyin|iesdouyin)\.com/i,
	douyinCDN: /https:\/\/aweme\.snssdk\.com\/aweme\/v1\/play/i,
	bilibili: /(bilibili\.com|b23\.tv|t\.bilibili\.com|bili2233\.cn|\bBV[1-9a-zA-Z]{10}\b|\bav\d+\b)/i,
	kuaishou: /(快手.*快手|v\.kuaishou\.com|kuaishou\.com)/,
	xiaohongshu: /(xiaohongshu\.com|xhslink\.com)/
};
var handleDouyin = wrapWithErrorHandler(async (e) => {
	if (e.msg.startsWith("#测试")) return false;
	const forceBurnDanmaku = /^#?弹幕解析/.test(e.msg);
	const urlMatch = e.msg.match(/(https?:\/\/[^\s]*\.(douyin|iesdouyin)\.com[^\s]*)/gi);
	if (!urlMatch) {
		logger.warn(`未能在消息中找到有效的抖音链接: ${e.msg}`);
		return true;
	}
	const iddata = await getDouyinID(e, String(urlMatch[0]));
	await new DouYin(e, iddata, { forceBurnDanmaku }).DouyinHandler(iddata);
	return true;
}, { businessName: "抖音视频解析" });
var handleBilibili = wrapWithErrorHandler(async (e) => {
	e.msg = e.msg.replace(/\\/g, "");
	const forceBurnDanmaku = /^#?弹幕解析/.test(e.msg);
	const urlRegex = /(https?:\/\/(?:(?:www\.|m\.|t\.)?bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-.~:\/?#[\]@!$&'()*+,;=]+)/;
	const bvRegex = /^BV[1-9a-zA-Z]{10}$/;
	const avRegex = /^av\d+$/i;
	let url = null;
	const urlMatch = e.msg.match(urlRegex);
	if (urlMatch) url = urlMatch[0];
	else if (bvRegex.test(e.msg)) url = `https://www.bilibili.com/video/${e.msg}`;
	else if (avRegex.test(e.msg)) url = `https://www.bilibili.com/video/${e.msg}`;
	if (!url) {
		logger.warn(`未能在消息中找到有效的B站分享链接、BV号或AV号: ${e.msg}`);
		return true;
	}
	const iddata = await getBilibiliID(url);
	await new Bilibili(e, iddata, { forceBurnDanmaku }).BilibiliHandler(iddata);
	return true;
}, { businessName: "B站视频解析" });
var handleKuaishou = wrapWithErrorHandler(async (e) => {
	const kuaishouUrl = e.msg.replaceAll("\\", "").match(/(https:\/\/v\.kuaishou\.com\/\w+|https:\/\/www\.kuaishou\.com\/f\/[a-zA-Z0-9]+)/g);
	const iddata = await getKuaishouID(String(kuaishouUrl));
	const WorkData = await fetchKuaishouData(iddata.type, iddata);
	await new Kuaishou(e, iddata).KuaishouHandler(WorkData);
}, { businessName: "快手视频解析" });
var handleXiaohongshu = wrapWithErrorHandler(async (e) => {
	const url = e.msg.replaceAll("\\", "").match(/https?:\/\/[^\s"'<>]+/)?.[0];
	if (!url) {
		logger.warn(`未能在消息中找到有效链接: ${e.msg}`);
		return true;
	}
	const iddata = await getXiaohongshuID(url);
	await new Xiaohongshu(e, iddata).XiaohongshuHandler(iddata);
	return true;
}, { businessName: "小红书视频解析" });
var handlePrefix = wrapWithErrorHandler(async (e, next) => {
	const originalMsg = e.msg;
	e.msg = await Common.getReplyMessage(e);
	if (/^#?弹幕解析/.test(originalMsg)) e.msg = "#弹幕解析 " + e.msg;
	if (reg.douyinCDN.test(e.msg)) {
		logger.debug("检测到抖音 CDN 下载链接，直接下载视频");
		const videoIdMatch = e.msg.match(/video_id=([^&]+)/);
		const videoId = videoIdMatch ? videoIdMatch[1] : Date.now().toString();
		await downloadVideo(e, {
			video_url: e.msg,
			title: {
				timestampTitle: `tmp_${Date.now()}.mp4`,
				originTitle: `抖音视频_${videoId}.mp4`
			}
		});
		return true;
	} else if (reg.douyin.test(e.msg)) return await handleDouyin(e, next);
	else if (reg.bilibili.test(e.msg)) return await handleBilibili(e, next);
	else if (reg.kuaishou.test(e.msg)) return await handleKuaishou(e, next);
	else if (reg.xiaohongshu.test(e.msg)) return await handleXiaohongshu(e, next);
}, { businessName: "引用解析" });
var douyin = karin$1.command(reg.douyin, handleDouyin, {
	name: "kkk-视频功能-抖音",
	priority: Config.app.videoTool ? -Infinity : 800
});
var bilibili = karin$1.command(reg.bilibili, handleBilibili, {
	name: "kkk-视频功能-B站",
	priority: Config.app.videoTool ? -Infinity : 800
});
var kuaishou = karin$1.command(reg.kuaishou, handleKuaishou, {
	name: "kkk-视频功能-快手",
	priority: Config.app.videoTool ? -Infinity : 800
});
var xiaohongshu = karin$1.command(reg.xiaohongshu, handleXiaohongshu, {
	name: "kkk-视频功能-小红书",
	priority: Config.app.videoTool ? -Infinity : 800
});
const prefix = karin$1.command(/^#?(解析|kkk解析|弹幕解析)/, handlePrefix, { name: "kkk-视频功能-引用解析" });
const douyinAPP = Config.douyin.switch && douyin;
const bilibiliAPP = Config.bilibili.switch && bilibili;
const kuaishouAPP = Config.kuaishou.switch && kuaishou;
const xiaohongshuAPP = Config.xiaohongshu.switch && xiaohongshu;
await init_module();
await init_build_metadata();
var versionCore = (v) => {
	v = v.trim();
	if (v.startsWith("v") || v.startsWith("V")) v = v.slice(1);
	const [preBuild] = v.split("+", 2);
	const [core] = preBuild.split("-", 2);
	return core;
};
var getRemoteBuildMetadata = async (version$1) => {
	const requests = [
		`https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${version$1}/lib/build-metadata.json`,
		`https://npm.onmicrosoft.cn/${Root.pluginName}@${version$1}/lib/build-metadata.json`,
		`https://cdn.jsdelivr.net/npm/${Root.pluginName}@${version$1}/lib/build-metadata.json`,
		`https://fastly.jsdelivr.net/npm/${Root.pluginName}@${version$1}/lib/build-metadata.json`,
		`https://unpkg.com/${Root.pluginName}@${version$1}/lib/build-metadata.json`
	].map((url) => axios.get(url, {
		timeout: 1e4,
		headers: BASE_HEADERS
	}).then((res) => {
		if (res.data && typeof res.data === "object") return res.data;
		throw new Error("Invalid metadata");
	}));
	try {
		return await Promise.any(requests);
	} catch {
		return null;
	}
};
const getChangelogImage = async (props) => {
	let changelog = "";
	let buildTime;
	if (props.Tip || props.isRemote) {
		const requests = [
			`https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
			`https://npm.onmicrosoft.cn/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
			`https://cdn.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
			`https://fastly.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
			`https://unpkg.com/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
			`https://gh.llkk.cc/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://j.1lin.dpdns.org/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://tvv.tw/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://git.yylx.win/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://gitproxy.127731.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://ghm.078465.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://ghfile.geekertao.top/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://github.tbedu.top/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://j.1win.ggff.net/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://ghm.078465.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://ghm.078465.xyz/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`,
			`https://jiashu.1win.eu.org/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`
		].map((url) => axios.get(url, {
			timeout: 1e4,
			headers: BASE_HEADERS
		}).then((res) => {
			if (typeof res.data === "string" && res.data.length > 0) return res.data;
			throw new Error("Invalid changelog content");
		}));
		try {
			changelog = await Promise.any(requests);
		} catch {
			return null;
		}
		if (!changelog) return null;
		const remoteMeta = await getRemoteBuildMetadata(props.remoteVersion);
		if (remoteMeta?.buildTime) buildTime = formatBuildTime(remoteMeta.buildTime);
		changelog = range({
			data: changelog,
			startVersion: props.localVersion,
			endVersion: versionCore(props.remoteVersion),
			compare: "semver"
		});
	} else {
		try {
			changelog = fs.readFileSync(Root.pluginPath + "/CHANGELOG.md", "utf8");
			changelog = range({
				data: changelog,
				startVersion: props.localVersion,
				endVersion: versionCore(props.remoteVersion),
				compare: "semver"
			});
		} catch {
			return null;
		}
		const localMeta = getBuildMetadata();
		if (localMeta?.buildTime) buildTime = formatBuildTime(localMeta.buildTime);
	}
	return await Render("other/changelog", {
		markdown: changelog,
		Tip: props.Tip,
		localVersion: props.localVersion,
		remoteVersion: props.remoteVersion,
		buildTime
	}) || null;
};
await init_module();
await init_semver();
var UPDATE_LOCK_KEY = "kkk:update:lock";
var UPDATE_MSGID_KEY = "kkk:update:msgId";
var Handler = async (e) => {
	if (process.env.NODE_ENV === "development") return true;
	logger.trace(e);
	let upd;
	try {
		upd = await checkPkgUpdate(Root.pluginName, { compare: "semver" });
	} catch {
		return true;
	}
	if (upd.status === "yes" && !isSemverGreater(upd.remote, upd.local)) return true;
	if (upd.status !== "yes") return true;
	try {
		const lockedVersion = await db.get(UPDATE_LOCK_KEY);
		if (typeof lockedVersion === "string" && lockedVersion.length > 0) {
			if (!isSemverGreater(lockedVersion, Root.pluginVersion)) await db.del(UPDATE_LOCK_KEY);
			else if (!isSemverGreater(upd.remote, lockedVersion)) return true;
		}
	} catch {}
	try {
		await db.set(UPDATE_LOCK_KEY, upd.remote);
	} catch {}
	const ChangeLogImg = await getChangelogImage({
		localVersion: Root.pluginVersion,
		remoteVersion: upd.remote,
		Tip: true
	});
	const list = config.master();
	let master = list[0];
	if (master === "console") master = list[1];
	const botList = karin$1.getAllBotList();
	if (ChangeLogImg) {
		const msgResult = await karin$1.sendMaster(botList[0].bot.account.name === "console" ? botList[1].bot.account.selfId : botList[0].bot.account.selfId, master, [segment.text("karin-plugin-kkk 有新的更新！"), ...ChangeLogImg]);
		try {
			await db.set(UPDATE_MSGID_KEY, msgResult.messageId);
		} catch {}
	}
	return true;
};
const kkkUpdate = hooks.message.friend(async (e, next) => {
	if (e.msg.includes("更新")) {
		const msgId = await db.get(UPDATE_MSGID_KEY);
		if (e.replyId === msgId) try {
			e.reply("开始更新 karin-plugin-kkk ...", { reply: true });
			const upd = await checkPkgUpdate(Root.pluginName, { compare: "semver" });
			if (upd.status === "yes") {
				const result = await updatePkg(Root.pluginName);
				if (result.status === "ok") {
					if ((await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)).messageId) try {
						await db.del(UPDATE_MSGID_KEY);
						await db.del(UPDATE_LOCK_KEY);
					} catch {}
					await restart(e.selfId, e.contact, e.messageId);
				} else e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
			} else if (upd.status === "no") e.reply("未检测到可更新版本。");
			else e.reply(`${Root.pluginName} 更新失败: ${upd.error?.message ?? String(upd.error)}`);
		} catch (error) {
			e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
		}
	}
	next();
}, { priority: 100 });
const kkkUpdateCommand = karin$1.command(/^#?kkk更新$/, async (e) => {
	const upd = await checkPkgUpdate(Root.pluginName, { compare: "semver" });
	if (upd.status === "error") {
		e.reply(`获取远程版本失败：${upd.error?.message ?? String(upd.error)}`);
		return;
	}
	if (upd.status === "no") {
		e.reply(`当前已是最新版本：${upd.local}`, { reply: true });
		return;
	}
	if (upd.status === "yes" && !isSemverGreater(upd.remote, upd.local)) {
		e.reply(`当前已是最新或预览版本：${upd.local}`, { reply: true });
		return;
	}
	const ChangeLogImg = await getChangelogImage({
		localVersion: Root.pluginVersion,
		remoteVersion: upd.remote,
		Tip: false,
		isRemote: true
	});
	if (ChangeLogImg) e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true });
	else e.reply("获取更新日志失败，更新进程继续......", { reply: true });
	try {
		const result = await updatePkg(Root.pluginName);
		if (result.status === "ok") {
			const msgResult = await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`);
			if (msgResult.messageId) try {
				await db.del(UPDATE_MSGID_KEY);
				await db.del(UPDATE_LOCK_KEY);
			} catch {}
			await restart(e.selfId, e.contact, msgResult.messageId);
		} else e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
	} catch (error) {
		e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
	}
}, { name: "kkk-更新" });
const update = karin$1.task("kkk-更新检测", "*/5 * * * *", Handler, {
	name: "kkk-更新检测",
	log: false
});
export { removeOldFiles as C, Root as D, web_config_default as E, init_root as O, dylogin as S, webConfig as T, setdyPush as _, douyinAPP as a, version as b, xiaohongshuAPP as c, bilibiliPushList as d, changeBotID as f, setbiliPush as g, forcePush as h, bilibiliAPP as i, qrLogin as l, douyinPushList as m, kkkUpdateCommand as n, kuaishouAPP as o, douyinPush as p, update as r, prefix as s, kkkUpdate as t, bilibiliPush as u, testDouyinPush as v, task as w, biLogin as x, help as y };
