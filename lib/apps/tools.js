import "../chunks/react-tSI5bnDQ.js";
import "../chunks/src-CM898wRa.js";
import { Base, Bilibili, Common, Config, Render, baseHeaders, downloadVideo, getBilibiliID } from "../chunks/module-CIiJvDgv.js";
import "../root-BijQeroW.js";
import "../chunks/react-dom-DjLB5oxT.js";
import { DouYin, Kuaishou, fetchKuaishouData, getDouyinID, getKuaishouID } from "../chunks/kuaishou-CeuqJkAQ.js";
import { wrapWithErrorHandler } from "../chunks/ErrorHandler-DotSfGo_.js";
import karin, { common, logger, segment } from "node-karin";
import axios from "node-karin/axios";

//#region src/platform/xiaohongshu/getID.ts
/**
* 解析小红书分享链接，提取作品ID
* - 典型长链接: https://www.xiaohongshu.com/explore/<note_id>
* - 短链: https://xhslink.com/<code>（会重定向到长链接）
*/
async function getXiaohongshuID(url, log = true) {
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
}

//#endregion
//#region src/platform/xiaohongshu/comments.ts
/**
* 处理评论中的表情
* @param text 原始文本
* @param emojiData 表情数据
* @returns 处理后的文本
*/
const processCommentEmojis = (text, emojiData) => {
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
/**
* 处理评论中的@用户
* @param text 原始文本
* @param atUsers @用户列表
* @param useDarkTheme 是否使用深色主题
* @returns 处理后的文本
*/
const processAtUsers = (text, atUsers, useDarkTheme = false) => {
	if (!text || !atUsers || !Array.isArray(atUsers) || atUsers.length === 0) return text;
	let processedText = text;
	for (const atUser of atUsers) if (atUser.nickname && processedText.includes(`@${atUser.nickname}`)) {
		const escapedNickname = atUser.nickname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`@${escapedNickname}`, "g");
		const spanClass = useDarkTheme ? "text-[#c7daef]" : "text-[#13386c]";
		processedText = processedText.replace(regex, `<span class="${spanClass}">@${atUser.nickname}</span>`);
	}
	return processedText;
};
/**
* 格式化时间戳为相对时间
* @param timestamp 时间戳（毫秒）
* @returns 相对时间字符串
*/
function getRelativeTimeFromTimestamp(timestamp) {
	const now = Date.now();
	const differenceInSeconds = Math.floor((now - timestamp) / 1e3);
	if (differenceInSeconds < 30) return "刚刚";
	else if (differenceInSeconds < 60) return differenceInSeconds + "秒前";
	else if (differenceInSeconds < 3600) return Math.floor(differenceInSeconds / 60) + "分钟前";
	else if (differenceInSeconds < 86400) return Math.floor(differenceInSeconds / 3600) + "小时前";
	else if (differenceInSeconds < 2592e3) return Math.floor(differenceInSeconds / 86400) + "天前";
	else if (differenceInSeconds < 7776e3) return Math.floor(differenceInSeconds / 2592e3) + "个月前";
	else {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return year + "-" + month + "-" + day;
	}
}
/**
* 处理小红书评论数据 - 简化版本，直接返回评论数组
* @param data 完整的评论数据
* @param emojiData 处理过后的emoji列表
* @param useDarkTheme 是否使用深色主题
* @returns 处理后的评论数组
*/
async function xiaohongshuComments(data, emojiData, useDarkTheme = false) {
	if (!data.data || !data.data.comments || data.data.comments.length === 0) return [];
	const comments = [];
	for (const comment of data.data.comments) {
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
		comment.content = comment.content.replace(/\n/g, "<br>").replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));
		comment.content = processAtUsers(comment.content, comment.at_users, useDarkTheme);
		comment.content = processCommentEmojis(comment.content, emojiData);
		if (parseInt(comment.like_count) > 1e4) comment.like_count = (parseInt(comment.like_count) / 1e4).toFixed(1) + "w";
		if (comment.sub_comments && Array.isArray(comment.sub_comments)) for (const subComment of comment.sub_comments) {
			subComment.content = subComment.content.replace(/\n/g, "<br>").replace(/ {2,}/g, (match) => "&nbsp;".repeat(match.length));
			subComment.content = processAtUsers(subComment.content, subComment.at_users, useDarkTheme);
			subComment.content = processCommentEmojis(subComment.content, emojiData);
			if (parseInt(subComment.like_count) > 1e4) subComment.like_count = (parseInt(subComment.like_count) / 1e4).toFixed(1) + "w";
		}
	}
	comments.sort((a, b) => Number(b.isTop) - Number(a.isTop));
	return comments.slice(0, Config.xiaohongshu.numcomment);
}

//#endregion
//#region src/platform/xiaohongshu/xiaohongshu.ts
var Xiaohongshu = class extends Base {
	e;
	type;
	constructor(e, iddata) {
		super(e);
		this.e = e;
		this.type = iddata?.type;
	}
	async RESOURCES(data) {
		Config.app.EmojiReply && !this.e.isPrivate && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true);
		Config.xiaohongshu.tip && await this.e.reply("检测到小红书链接，开始解析");
		const NoteData = await this.amagi.getXiaohongshuData("单个笔记数据", {
			typeMode: "strict",
			note_id: data.note_id,
			xsec_token: data.xsec_token
		});
		const formattedEmojis = XiaohongshuEmoji(await this.amagi.getXiaohongshuData("表情列表", { typeMode: "strict" }));
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
			const CommentData = await this.amagi.getXiaohongshuData("评论数据", {
				typeMode: "strict",
				note_id: data.note_id,
				xsec_token: data.xsec_token
			});
			if (!CommentData.data.data.comments || CommentData.data.data.comments.length === 0) await this.e.reply("这个笔记没有评论 ~");
			else {
				const processedComments = await xiaohongshuComments(CommentData.data, formattedEmojis);
				const commentListImg = await Render("xiaohongshu/comment", {
					Type: NoteData.data.data.items[0].note_card.video ? "视频" : "图文",
					CommentsData: processedComments,
					CommentLength: processedComments.length,
					ImageLength: NoteData.data.data.items[0].note_card.image_list?.length || 0,
					share_url: `https://www.xiaohongshu.com/discovery/item/${data.note_id}?source=webshare&xhsshare=pc_web&xsec_token=${data.xsec_token}&xsec_source=pc_share`
				});
				this.e.reply(commentListImg);
			}
		}
		if (!NoteData.data.data.items[0].note_card.video && Config.xiaohongshu.sendContent.includes("image")) {
			const Imgs = [];
			for (const item of NoteData.data.data.items[0].note_card.image_list) Imgs.push(segment.image(item.url_default));
			const res = common.makeForward(Imgs, this.e.sender.userId, this.e.sender.nick);
			if (NoteData.data.data.items[0].note_card.image_list.length === 1) await this.e.reply(segment.image(NoteData.data.data.items[0].note_card.image_list[0].url_default));
			else await this.e.bot.sendForwardMsg(this.e.contact, res, {
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
					...baseHeaders,
					Referer: selectedVideo.master_url
				}
			}, { message_id: this.e.messageId });
			else await this.e.reply(segment.video(video.url_default));
		}
		return true;
	}
};
/**
* 处理小红书视频流选择逻辑
* @param streamData 视频流数据
* @param videoQuality 画质偏好
* @param maxAutoVideoSize 自动模式下的最大文件大小（MB）
* @returns 选择的视频流
*/
function xiaohongshuProcessVideos(streamData, videoQuality, maxAutoVideoSize) {
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
}
/**
* 格式化小红书表情列表
* @param data 小红书表情数据
* @returns 格式化后的表情数组
*/
const XiaohongshuEmoji = (data) => {
	const ListArray = [];
	if (data.data.data.emoji.tabs) {
		for (const tab of data.data.data.emoji.tabs) if (tab.collection) {
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
/**
* 处理小红书笔记描述中的表情和话题标签
* @param text 原始文本
* @param emojiData 表情数据
* @returns 处理后的HTML文本
*/
const processXiaohongshuEmojis = (text, emojiData) => {
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

//#endregion
//#region src/apps/tools.ts
const reg = {
	douyin: /^.*((www|v|jx|m)\.(douyin|iesdouyin)\.com|douyin\.com\/(video|note)).*/,
	bilibili: /(bilibili.com|b23.tv|t.bilibili.com|bili2233.cn|BV[a-zA-Z0-9]{10,})/,
	kuaishou: /^((.*)快手(.*)快手(.*)|(.*)v\.kuaishou(.*)|(.*)kuaishou\.com\/f\/[a-zA-Z0-9]+.*)$/,
	xiaohongshu: /(xiaohongshu\.com|xhslink\.com)/
};
const handleDouyin = wrapWithErrorHandler(async (e) => {
	const iddata = await getDouyinID(e, String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g)));
	await new DouYin(e, iddata).RESOURCES(iddata);
	return true;
}, { businessName: "抖音视频解析" });
const handleBilibili = wrapWithErrorHandler(async (e) => {
	e.msg = e.msg.replace(/\\/g, "");
	const urlRegex = /(https?:\/\/(?:www\.bilibili\.com|m\.bilibili\.com|t\.bilibili\.com|b23\.tv|bili2233\.cn)\/[a-zA-Z0-9_\-.~:\/?#[\]@!$&'()*+,;=]+)/;
	const bvRegex = /^BV[1-9a-zA-Z]{10}$/;
	let url = null;
	const urlMatch = e.msg.match(urlRegex);
	if (urlMatch) url = urlMatch[0];
	else if (bvRegex.test(e.msg)) url = `https://www.bilibili.com/video/${e.msg}`;
	if (!url) {
		logger.warn(`未能在消息中找到有效的B站分享链接或BV号: ${e.msg}`);
		return true;
	}
	const iddata = await getBilibiliID(url);
	await new Bilibili(e, iddata).RESOURCES(iddata);
	return true;
}, { businessName: "B站视频解析" });
const handleKuaishou = wrapWithErrorHandler(async (e) => {
	const kuaishouUrl = e.msg.replaceAll("\\", "").match(/(https:\/\/v\.kuaishou\.com\/\w+|https:\/\/www\.kuaishou\.com\/f\/[a-zA-Z0-9]+)/g);
	const iddata = await getKuaishouID(String(kuaishouUrl));
	const WorkData = await fetchKuaishouData(iddata.type, iddata);
	await new Kuaishou(e, iddata).RESOURCES(WorkData);
}, { businessName: "快手视频解析" });
const handleXiaohongshu = wrapWithErrorHandler(async (e) => {
	const url = e.msg.replaceAll("\\", "").match(/https?:\/\/[^\s"'<>]+/)?.[0];
	if (!url) {
		logger.warn(`未能在消息中找到有效链接: ${e.msg}`);
		return true;
	}
	const iddata = await getXiaohongshuID(url);
	await new Xiaohongshu(e, iddata).RESOURCES(iddata);
	return true;
}, { businessName: "小红书视频解析" });
const handlePrefix = wrapWithErrorHandler(async (e) => {
	e.msg = await Common.getReplyMessage(e);
	if (reg.douyin.test(e.msg)) return await handleDouyin(e);
	else if (reg.bilibili.test(e.msg)) return await handleBilibili(e);
	else if (reg.kuaishou.test(e.msg)) return await handleKuaishou(e);
	else if (reg.xiaohongshu.test(e.msg)) return await handleXiaohongshu(e);
}, { businessName: "引用解析" });
const douyin = karin.command(reg.douyin, handleDouyin, {
	name: "kkk-视频功能-抖音",
	priority: Config.app.videoTool ? -Infinity : 800
});
const bilibili = karin.command(reg.bilibili, handleBilibili, {
	name: "kkk-视频功能-B站",
	priority: Config.app.videoTool ? -Infinity : 800
});
const kuaishou = karin.command(reg.kuaishou, handleKuaishou, {
	name: "kkk-视频功能-快手",
	priority: Config.app.videoTool ? -Infinity : 800
});
const xiaohongshu = karin.command(reg.xiaohongshu, handleXiaohongshu, {
	name: "kkk-视频功能-小红书",
	priority: Config.app.videoTool ? -Infinity : 800
});
const prefix = karin.command(/^#?(解析|kkk解析)/, handlePrefix, { name: "kkk-视频功能-引用解析" });
const douyinAPP = Config.douyin.switch && douyin;
const bilibiliAPP = Config.bilibili.switch && bilibili;
const kuaishouAPP = Config.kuaishou.switch && kuaishou;
const xiaohongshuAPP = Config.xiaohongshu.switch && xiaohongshu;

//#endregion
export { bilibiliAPP, douyinAPP, kuaishouAPP, prefix, xiaohongshuAPP };