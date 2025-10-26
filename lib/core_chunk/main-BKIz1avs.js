import { n as __esmMin, o as __toESM, r as __export } from "./rolldown-runtime-DWBZqjDW.js";
import { At as app$1, Ct as createKuaishouRoutes, Dt as logMiddleware, Et as init_esm, Ot as logger$1, St as createDouyinRoutes, Tt as getDouyinData, _t as DynamicType, bt as bilibiliApiUrls, gt as Client, ht as require_lib, jt as init_dist, kt as wbi_sign, mt as require_lib$1, pt as require_dist, t as require_heic_convert, vt as MajorType, wt as getBilibiliData, xt as createBilibiliRoutes, yt as amagi } from "./vendor-Cw0LS4eJ.js";
import { n as client_default, r as init_client } from "./template-D6XT_PST.js";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import karin, { app, authMiddleware, checkPkgUpdate, common, components, config, copyConfigSync, createBadRequestResponse, createNotFoundResponse, createServerErrorResponse, createSuccessResponse, db, defineConfig, ffmpeg, ffprobe, filesByExt, getBot, hooks, karinPathHtml, logger, logs, mkdirSync, range, render, requireFileSync, restart, segment, updatePkg, watch } from "node-karin";
import { fileURLToPath } from "node:url";
import { karinPathBase, karinPathTemp } from "node-karin/root";
import YAML from "node-karin/yaml";
import sqlite3 from "node-karin/sqlite3";
import { pipeline } from "node:stream/promises";
import axios, { AxiosError } from "node-karin/axios";
import crypto from "node:crypto";
import template from "node-karin/template";
import _ from "node-karin/lodash";
import util from "node:util";
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
var Base, Count, uploadFile, downloadVideo, downloadFile, processFilename;
var init_Base = __esmMin(() => {
	init_esm();
	init_utils();
	init_Config();
	Base = class {
		e;
		headers;
		amagi;
		constructor(e) {
			this.e = e;
			this.headers = baseHeaders;
			const client = Client({
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
			this.amagi = new Proxy(client, { get(target, prop) {
				const method = target[prop];
				if (typeof method === "function") return async (...args) => {
					const result = await Function.prototype.apply.call(method, target, args);
					if (!result) {
						logger.warn(`Amagi API调用 (${String(prop)}) 返回了空值`);
						return result;
					}
					return result;
				};
				return method;
			} });
		}
	};
	Count = (count) => {
		if (count > 1e4) return (count / 1e4).toFixed(1) + "万";
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
			contact = karin.contactGroup(options?.activeOption?.group_id);
		} else {
			selfId = event.selfId;
			contact = event.contact;
		}
		if (Config.upload.compress && file.totalBytes > Config.upload.compresstrigger) {
			const Duration = await mergeFile("获取指定视频文件时长", { path: file.filepath });
			logger.warn(logger.yellow(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`));
			const message = [segment.text(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`), options?.message_id ? segment.reply(options.message_id) : segment.text("")];
			const msg1 = await karin.sendMsg(selfId, contact, message);
			const targetBitrate = Common.calculateBitrate(Config.upload.compresstrigger, Duration) * .75;
			const startTime = Date.now();
			file.filepath = await mergeFile("压缩视频", {
				path: file.filepath,
				targetBitrate,
				resultPath: `${Common.tempDri.video}tmp_${Date.now()}.mp4`
			});
			const endTime = Date.now();
			newFileSize = await Common.getVideoFileSize(file.filepath);
			logger.debug(`原始视频大小为: ${file.totalBytes.toFixed(1)} MB, ${logger.green(`经 FFmpeg 压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，原视频文件已删除`)}`);
			const message2 = [segment.text(`压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，压缩耗时：${((endTime - startTime) / 1e3).toFixed(1)} 秒`), segment.reply(msg1.messageId)];
			await karin.sendMsg(selfId, contact, message2);
		}
		if (options) options.useGroupFile = Config.upload.usegroupfile && newFileSize > Config.upload.groupfilevalue;
		if (Config.upload.sendbase64 && !options?.useGroupFile) {
			File = `base64://${(await fs.promises.readFile(file.filepath)).toString("base64")}`;
			logger.mark(`已开启视频文件 base64转换 正在进行${logger.yellow("base64转换中")}...`);
		} else File = options?.useGroupFile ? file.filepath : `file://${file.filepath}`;
		try {
			if (options?.active) if (options.useGroupFile) {
				const bot = karin.getBot(String(options.activeOption?.uin));
				logger.mark(`${logger.blue("主动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("bot.uploadFile")}回复...`);
				await bot.uploadFile(contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split("/").pop()}`);
			} else {
				logger.mark(`${logger.blue("主动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("karin.sendMsg")}回复...`);
				(await karin.sendMsg(selfId, contact, [segment.video(File)])).messageId ? sendStatus = true : sendStatus = false;
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
		const fileHeaders = await new Networks({
			url: downloadOpt.video_url,
			headers: downloadOpt.headers ?? baseHeaders
		}).getHeaders();
		const fileSizeInMB = ((fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0) / (1024 * 1024)).toFixed(2);
		const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2));
		if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
			const message = segment.text(`视频：「${downloadOpt.title.originTitle ?? "Error: 文件名获取失败"}」大小 (${fileSizeInMB} MB) 超出最大限制（设定值：${Config.upload.filelimit} MB），已取消上传`);
			const selfId = event.selfId || uploadOpt?.activeOption?.uin;
			const contact = event.contact || karin.contactGroup(uploadOpt?.activeOption?.group_id) || karin.contactFriend(selfId);
			await karin.sendMsg(selfId, contact, message);
			return false;
		}
		let res = await downloadFile(downloadOpt.video_url, {
			title: Config.app.removeCache ? downloadOpt.title.timestampTitle : processFilename(downloadOpt.title.originTitle, 50),
			headers: downloadOpt.headers ?? baseHeaders
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
		const { filepath, totalBytes } = await new Networks({
			url: videoUrl,
			headers: opt.headers ?? baseHeaders,
			filepath: Common.tempDri.video + opt.title,
			timeout: 3e4,
			maxRetries: 3
		}).downloadStream((downloadedBytes, totalBytes$1) => {
			const barLength = 45;
			function generateProgressBar(progressPercentage$1) {
				const filledLength = Math.floor(progressPercentage$1 / 100 * barLength);
				let progress = "";
				progress += "█".repeat(filledLength);
				progress += "░".repeat(Math.max(0, barLength - filledLength - 1));
				return `[${progress}]`;
			}
			const progressPercentage = downloadedBytes / totalBytes$1 * 100;
			const red = Math.floor(255 - 255 * progressPercentage / 100);
			const coloredPercentage = logger.chalk.rgb(red, 255, 0)(`${progressPercentage.toFixed(1)}%`);
			const speed = downloadedBytes / ((Date.now() - startTime) / 1e3);
			const formattedSpeed = (speed / 1048576).toFixed(1) + " MB/s";
			const remainingTime = (totalBytes$1 - downloadedBytes) / speed;
			const formattedRemainingTime = remainingTime > 60 ? `${Math.floor(remainingTime / 60)}min ${Math.floor(remainingTime % 60)}s` : `${remainingTime.toFixed(0)}s`;
			const downloadedSizeMB = (downloadedBytes / 1048576).toFixed(1);
			const totalSizeMB = (totalBytes$1 / 1048576).toFixed(1);
			console.log(`⬇️  ${opt.title} ${generateProgressBar(progressPercentage)} ${coloredPercentage} ${downloadedSizeMB}/${totalSizeMB} MB | ${formattedSpeed} 剩余: ${formattedRemainingTime}\r`);
		}, 3);
		return {
			filepath,
			totalBytes
		};
	};
	processFilename = (filename, maxLength = 50) => {
		const lastDotIndex = filename.lastIndexOf(".");
		if (!(lastDotIndex > 0 && lastDotIndex < filename.length - 1)) return filename.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
		const nameWithoutExt = filename.substring(0, lastDotIndex);
		const extension = filename.substring(lastDotIndex);
		return nameWithoutExt.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, " ") + "..." + extension;
	};
});
var Tools, Common;
var init_Common = __esmMin(() => {
	init_Config();
	init_root();
	Tools = class {
		tempDri;
		constructor() {
			this.tempDri = {
				default: `${karinPathTemp}/${Root.pluginName}/`.replace(/\\/g, "/"),
				video: `${karinPathTemp}/${Root.pluginName}/kkkdownload/video/`.replace(/\\/g, "/"),
				images: `${karinPathTemp}/${Root.pluginName}/kkkdownload/images/`.replace(/\\/g, "/")
			};
		}
		async getReplyMessage(e) {
			if (e.replyId) {
				const reply = await e.bot.getMsg(e.contact, e.replyId);
				for (const v of reply.elements) if (v.type === "text") return v.text;
				else if (v.type === "json") return v.data;
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
		convertTimestampToDateTime(timestamp) {
			const date = /* @__PURE__ */ new Date(timestamp * 1e3);
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
		}
		getCurrentTime() {
			const now = /* @__PURE__ */ new Date();
			const year = now.getFullYear();
			const month = now.getMonth() + 1;
			const day = now.getDate();
			const hour = now.getHours();
			const minute = now.getMinutes();
			const second = now.getSeconds();
			return `${year}-${month < 10 ? "0" + month : "" + month}-${day < 10 ? "0" + day : "" + day} ${hour < 10 ? "0" + hour : "" + hour}:${minute < 10 ? "0" + minute : "" + minute}:${second < 10 ? "0" + second : "" + second}`;
		}
		useDarkTheme() {
			let dark = true;
			const configTheme = Config.app.Theme;
			if (configTheme === 0) {
				const date = (/* @__PURE__ */ new Date()).getHours();
				if (date >= 6 && date < 18) dark = false;
			} else if (configTheme === 1) dark = false;
			else if (configTheme === 2) dark = true;
			return dark;
		}
		timeSince(timestamp) {
			const elapsed = Date.now() - timestamp;
			const seconds = Math.floor(elapsed / 1e3);
			const minutes = Math.floor(seconds / 60);
			const hours = Math.floor(minutes / 60);
			const remainingSeconds = seconds % 60;
			const remainingMinutes = minutes % 60;
			if (hours > 0) return `${hours}小时${remainingMinutes}分钟${remainingSeconds}秒`;
			else if (minutes > 0) return `${minutes}分钟${remainingSeconds}秒`;
			else return `${seconds}秒`;
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
			if (num > 1e4) return (num / 1e4).toFixed(1) + "万";
			return num.toString();
		}
	};
	Common = new Tools();
});
var mergeFile, FFmpeg;
var init_FFmpeg = __esmMin(() => {
	init_utils();
	mergeFile = async (type, options) => await new FFmpeg(type).FFmpeg(options);
	FFmpeg = class {
		type;
		constructor(type) {
			this.type = type;
		}
		async FFmpeg(opt) {
			switch (this.type) {
				case "二合一（视频 + 音频）": {
					const result = await ffmpeg(`-y -i ${opt.path} -i ${opt.path2} -c copy ${opt.resultPath}`);
					result.status ? logger.mark(`视频合成成功！文件地址：${opt.resultPath}`) : logger.error(result);
					await opt.callback(result.status, opt.resultPath);
					return result;
				}
				case "视频*3 + 音频": {
					const result = await ffmpeg(`-y -stream_loop 2 -i ${opt.path} -i ${opt.path2} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest ${opt.resultPath}`);
					result ? logger.mark(`视频合成成功！文件地址：${opt.resultPath}`) : logger.error(result);
					await opt.callback(result.status, opt.resultPath);
					return result;
				}
				case "获取指定视频文件时长": {
					const { stdout } = await ffprobe(`-v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${opt.path}`);
					return parseFloat(parseFloat(stdout.trim()).toFixed(2));
				}
				case "压缩视频": {
					const result = await ffmpeg(`-y -i "${opt.path}" -b:v ${opt.targetBitrate}k -maxrate ${opt.maxRate ?? opt.targetBitrate * 1.5}k -bufsize ${opt.bufSize ?? opt.targetBitrate * 2}k -crf ${opt.crf ?? 35} -preset medium -c:v libx264 -vf "scale='if(gte(iw/ih,16/9),1280,-1)':'if(gte(iw/ih,16/9),-1,720)',scale=ceil(iw/2)*2:ceil(ih/2)*2" "${opt.resultPath}"`);
					if (result.status) {
						logger.mark(`视频已压缩并保存到: ${opt.resultPath}`);
						Common.removeFile(opt.path);
					} else {
						logger.error(opt.path + " 压缩失败！");
						logger.error(result);
					}
					return opt.resultPath;
				}
			}
		}
	};
});
var baseHeaders, Networks;
var init_Networks = __esmMin(() => {
	baseHeaders = {
		Accept: "*/*",
		"accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0"
	};
	Networks = class {
		url;
		method;
		headers;
		type;
		body;
		axiosInstance;
		timeout;
		filepath;
		maxRetries;
		constructor(data) {
			this.headers = data.headers ? Object.fromEntries(Object.entries(data.headers).map(([key, value]) => [key, String(value)])) : {};
			this.headers = {
				...Object.fromEntries(Object.entries(baseHeaders ?? {}).map(([key, value]) => [key, String(value)])),
				...this.headers
			};
			this.url = data.url ?? "";
			this.type = data.type ?? "json";
			this.method = data.method ?? "GET";
			this.body = data.body ?? null;
			this.timeout = data.timeout ?? 15e3;
			this.filepath = data.filepath ?? "";
			this.maxRetries = data.maxRetries ?? 3;
			this.axiosInstance = axios.create({
				timeout: this.timeout,
				headers: this.headers,
				maxRedirects: 5,
				validateStatus: () => true
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
			if (retryCount > 0 && this.maxRetries === 0) {
				this.maxRetries = retryCount;
				retryCount = 0;
			}
			if (!this.url || !/^https?:\/\//i.test(this.url)) throw new Error(`Invalid URL: ${this.url || "(empty)"}`);
			if (!this.filepath) throw new Error("未指定文件保存路径: filepath 为空");
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), this.timeout);
			let intervalId = null;
			try {
				logger.debug("开始下载流", {
					...this.config,
					responseType: "stream",
					signal: controller.signal
				});
				const response = await this.axiosInstance({
					...this.config,
					responseType: "stream",
					signal: controller.signal
				});
				clearTimeout(timeoutId);
				const rawContentLength = response.headers["content-length"];
				const totalBytes = Number.parseInt(rawContentLength ?? "-1", 10);
				if (Number.isNaN(totalBytes)) throw new Error("无效的 content-length 响应头");
				let downloadedBytes = 0;
				let lastPrintedPercentage = -1;
				const writer = fs.createWriteStream(this.filepath);
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
				const onData = (chunk) => {
					downloadedBytes += Buffer.isBuffer(chunk) ? chunk.length : Buffer.byteLength(chunk);
				};
				response.data.on("data", onData);
				await pipeline(response.data, writer);
				if (intervalId) clearInterval(intervalId);
				response.data.off("data", onData);
				writer.end();
				return {
					filepath: this.filepath,
					totalBytes: totalBytes > 0 ? totalBytes : downloadedBytes
				};
			} catch (error) {
				clearTimeout(timeoutId);
				if (intervalId) clearInterval(intervalId);
				if (error instanceof AxiosError) logger.error(`请求在 ${this.timeout / 1e3} 秒后超时或失败: ${error.message}`);
				else logger.error("下载失败:", error);
				const nextDelay = Math.max(1e3, Math.min(2 ** retryCount * 1e3, 8e3));
				if (retryCount < this.maxRetries) {
					logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${nextDelay / 1e3} 秒后重试`);
					await new Promise((resolve) => setTimeout(resolve, nextDelay));
					return this.downloadStream(progressCallback, retryCount + 1);
				} else throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${error instanceof Error ? error.message : String(error)}`);
			}
		}
		async getfetch() {
			try {
				const result = await this.returnResult();
				if (result.status === 504) return result;
				return result;
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
		async getLongLink(url = "") {
			const targetUrl = this.url || url;
			try {
				new URL(targetUrl);
			} catch {
				throw new Error(`Invalid URL: ${targetUrl || "(empty)"}`);
			}
			try {
				const response = await this.axiosInstance.get(targetUrl);
				return response.request?.res?.responseUrl ?? response.config?.url ?? targetUrl;
			} catch (error) {
				const axiosError = error;
				if (axiosError.response?.status === 302 && axiosError.response.headers?.location) {
					const redirectUrl = axiosError.response.headers.location;
					logger.info(`检测到302重定向，目标地址: ${redirectUrl}`);
					return await this.getLongLink(redirectUrl);
				}
				const msg = `获取链接重定向失败: ${targetUrl} - ${axiosError.message}`;
				logger.error(msg);
				throw new Error(msg);
			}
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
					logger.error(`获取 ${this.url} 重定向地址失败，接口响应状态码: ${error.response?.status}`);
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
				if (error instanceof AxiosError) throw new Error(error.stack ?? error.message);
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
				logger.error(error);
				throw error;
			}
		}
	};
});
var init_module = __esmMin(async () => {
	init_db();
	init_utils();
});
var Render;
var init_Render = __esmMin(async () => {
	await init_client();
	await init_module();
	await init_Config();
	Render = async (path$1, data) => {
		const pathParts = path$1.split("/");
		let templateType;
		let templateName;
		if (pathParts.length === 2) [templateType, templateName] = pathParts;
		else if (pathParts.length === 3) {
			templateType = pathParts[0];
			templateName = `${pathParts[1]}/${pathParts[2]}`;
		} else throw new Error(`不支持的路径格式: ${path$1}`);
		const outputDir = path.join(karinPathHtml, Root.pluginName, templateType);
		const result = await client_default({
			templateType,
			templateName,
			scale: Math.min(2, Math.max(.5, Number(Config.app.renderScale) / 100)),
			useDarkTheme: Common.useDarkTheme(),
			version: Config.app.RemoveWatermark ? void 0 : {
				pluginName: "kkk",
				pluginVersion: Root.pluginVersion,
				releaseType: /^\d+\.\d+\.\d+$/.test(Root.pluginVersion) ? "Stable" : "Preview",
				poweredBy: "Karin"
			},
			data: {
				...data,
				useDarkTheme: Common.useDarkTheme()
			}
		}, outputDir).then((res) => {
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
			}
		});
		const ret = [];
		if (Array.isArray(renderResult)) for (const image of renderResult) ret.push(segment.image("base64://" + image));
		else ret.push(segment.image("base64://" + renderResult));
		return ret;
	};
});
var init_utils = __esmMin(async () => {
	init_root();
	init_Base();
	init_Common();
	init_FFmpeg();
	init_Networks();
	init_Render();
});
function checkvip$2(member) {
	return member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#e9e9e9" : "#313131"}; font-weight: 700;">${member.name}</span>`;
}
function br$3(data) {
	return data = data.replace(/\n/g, "<br>");
}
function replacetext(text, rich_text_nodes) {
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
}
function mapping_table(type) {
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
}
var img$1, Bilibili, qnd, generateGradientStyle, cover, generateDecorationCard, oid, bilibiliProcessVideos, getvideosize, formatVideoStats$1, alignTwoColumns$1, getStringDisplayWidth$1;
var init_bilibili$2 = __esmMin(async () => {
	await init_esm();
	await init_utils();
	await init_Config();
	await init_bilibili$1();
	Bilibili = class extends Base {
		e;
		type;
		STATUS;
		isVIP;
		Type;
		islogin;
		downloadfilename;
		get botadapter() {
			return this.e.bot?.adapter?.name;
		}
		constructor(e, data) {
			super(e);
			this.e = e;
			this.isVIP = false;
			this.Type = data?.type;
			this.islogin = data?.USER?.STATUS === "isLogin";
			this.downloadfilename = "";
			this.headers.Referer = "https://api.bilibili.com/";
			this.headers.Cookie = Config.cookies.bilibili;
		}
		async RESOURCES(iddata) {
			Config.app.EmojiReply && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true);
			Config.bilibili.tip && await this.e.reply("检测到B站链接，开始解析");
			switch (this.Type) {
				case "one_video": {
					const infoData = await this.amagi.getBilibiliData("单个视频作品数据", {
						bvid: iddata.bvid,
						typeMode: "strict"
					});
					const playUrlData = await this.amagi.getBilibiliData("单个视频下载信息数据", {
						avid: infoData.data.data.aid,
						cid: iddata.p ? infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid : infoData.data.data.cid,
						typeMode: "strict"
					});
					this.islogin = (await checkCk()).Status === "isLogin";
					this.downloadfilename = infoData.data.data.title.substring(0, 50).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
					const nockData = await new Networks({
						url: bilibiliApiUrls.视频流信息({
							avid: infoData.data.data.aid,
							cid: iddata.p ? infoData.data.data.pages[iddata.p - 1]?.cid ?? infoData.data.data.cid : infoData.data.data.cid
						}) + "&platform=html5",
						headers: this.headers
					}).getData();
					if (Config.bilibili.sendContent.some((content) => content === "info")) if (Config.bilibili.videoInfoMode === "text") {
						const replyContent = [];
						const { coin, like, share, view, favorite, danmaku } = infoData.data.data.stat;
						const contentMap = {
							cover: segment.image(infoData.data.data.pic),
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
						const commentsdata = bilibiliComments((await this.amagi.getBilibiliData("评论数据", {
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
								VideoSize: Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ? (nockData.data.durl[0].size / (1024 * 1024)).toFixed(2) : videoSize,
								ImageLength: 0,
								shareurl: "https://b23.tv/" + infoData.data.data.bvid
							});
							this.e.reply(img$1);
						}
					}
					if (Config.bilibili.sendContent.some((content) => content === "video")) if (Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit) && !Config.upload.compress) this.e.reply(`设定的最大上传大小为 ${Config.upload.filelimit}MB\n当前解析到的视频大小为 ${Number(videoSize)}MB\n视频太大了，还是去B站看吧~`, { reply: true });
					else {
						if (Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64) this.islogin = false;
						await this.getvideo(Config.bilibili.videoQuality !== 0 && Config.bilibili.videoQuality < 64 ? { playUrlData: nockData.data } : {
							infoData: infoData.data,
							playUrlData: playUrlData.data
						});
					}
					break;
				}
				case "bangumi_video_info": {
					const videoInfo = await this.amagi.getBilibiliData("番剧基本信息数据", {
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
					const context = await karin.ctx(this.e, { reply: true });
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
					const bangumidataBASEURL = bilibiliApiUrls.番剧视频流信息({
						cid: videoInfo.data.result.episodes[Number(Episode) - 1].cid,
						ep_id: videoInfo.data.result.episodes[Number(Episode) - 1].ep_id.toString()
					});
					const Params = await genParams(bangumidataBASEURL);
					if (!this.islogin) this.e.reply("B站ck未配置或已失效，无法获取视频流，可尝试【#B站登录】以配置新ck");
					const playUrlData = await new Networks({
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
					const dynamicInfo = await this.amagi.getBilibiliData("动态详情数据", {
						dynamic_id: iddata.dynamic_id,
						typeMode: "strict"
					});
					const dynamicInfoCard = await this.amagi.getBilibiliData("动态卡片数据", {
						dynamic_id: dynamicInfo.data.data.item.id_str,
						typeMode: "strict"
					});
					const commentsData = dynamicInfo.data.data.item.type !== DynamicType.LIVE_RCMD && await this.amagi.getBilibiliData("评论数据", {
						type: mapping_table(dynamicInfo.data.data.item.type),
						oid: oid(dynamicInfo.data, dynamicInfoCard.data),
						number: Config.bilibili.numcomment,
						typeMode: "strict"
					});
					const dynamicCARD = JSON.parse(dynamicInfoCard.data.data.card.card);
					const userProfileData = await this.amagi.getBilibiliData("用户主页数据", {
						host_mid: dynamicInfo.data.data.item.modules.module_author.mid,
						typeMode: "strict"
					});
					switch (dynamicInfo.data.data.item.type) {
						case DynamicType.DRAW: {
							const imgArray = [];
							for (const img$2 of dynamicInfo.data.data.item.modules.module_dynamic.major.opus.pics) if (img$2.url) imgArray.push(segment.image(img$2.url));
							if (Config.bilibili.sendContent.some((content) => content === "comment") && commentsData) {
								const commentsdata = bilibiliComments(commentsData.data, dynamicInfo.data.data.item.modules.module_author.mid.toString());
								img$1 = await Render("bilibili/comment", {
									Type: "动态",
									CommentsData: commentsdata,
									CommentLength: String(commentsdata?.length ?? 0),
									share_url: "https://t.bilibili.com/" + dynamicInfo.data.data.item.id_str,
									ImageLength: dynamicInfo.data.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? 0,
									shareurl: "动态分享链接"
								});
								if (imgArray.length === 1) this.e.reply(imgArray[0]);
								if (imgArray.length > 1) {
									const forwardMsg = common.makeForward(imgArray, this.e.userId, this.e.sender.nick);
									await this.e.bot.sendForwardMsg(this.e.contact, forwardMsg);
								}
								this.e.reply(img$1);
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
								create_time: dynamicInfo.data.data.item.modules.module_author.pub_time,
								avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
								frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
								share_url: "https://t.bilibili.com/" + dynamicInfo.data.data.item.id_str,
								username: checkvip$2(userProfileData.data.data.card),
								fans: Count(userProfileData.data.data.follower),
								user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
								total_favorited: Count(userProfileData.data.data.like_num),
								following_count: Count(userProfileData.data.data.card.attention),
								decoration_card: generateDecorationCard(dynamicInfo.data.data.item.modules.module_author.decoration_card),
								render_time: Common.getCurrentTime(),
								dynamicTYPE: "图文动态",
								imageLayout: Config.bilibili.imageLayout
							}));
							break;
						}
						case DynamicType.FORWARD: {
							const text = replacetext(br$3(dynamicInfo.data.data.item.modules.module_dynamic.desc.text), dynamicInfo.data.data.item.modules.module_dynamic.desc.rich_text_nodes);
							const imgList = [];
							for (const richTxtItem of dynamicInfo.data.data.item.modules.module_dynamic.desc.rich_text_nodes) if (richTxtItem.type === "RICH_TEXT_NODE_TYPE_VIEW_PICTURE") for (const pic of richTxtItem.pics) imgList.push(pic.src);
							let data = {};
							switch (dynamicInfo.data.data.item.orig.type) {
								case DynamicType.AV:
									data = {
										username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
										pub_action: dynamicInfo.data.data.item.orig.modules.module_author.pub_action,
										avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
										duration_text: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.duration_text,
										title: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.title,
										danmaku: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.danmaku,
										view: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.view,
										play: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.stat.play,
										cover: dynamicInfo.data.data.item.orig.modules.module_dynamic.major.archive.cover,
										create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
										decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
										frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
									};
									break;
								case DynamicType.DRAW: {
									const dynamicCARD2 = await this.amagi.getBilibiliData("动态卡片数据", {
										dynamic_id: dynamicInfo.data.data.item.orig.id_str,
										typeMode: "strict"
									});
									const cardData = JSON.parse(dynamicCARD2.data.data.card.card);
									data = {
										username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
										create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
										avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
										text: replacetext(br$3(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
										image_url: cardData.item.pictures && cover(cardData.item.pictures),
										decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
										frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
									};
									break;
								}
								case DynamicType.WORD:
									data = {
										username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
										create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
										avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
										text: replacetext(br$3(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
										decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
										frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
									};
									break;
								case DynamicType.LIVE_RCMD: {
									const liveData = JSON.parse(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.live_rcmd.content);
									data = {
										username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
										create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
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
								create_time: dynamicInfo.data.data.item.modules.module_author.pub_time,
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
								render_time: Common.getCurrentTime(),
								original_content: { [dynamicInfo.data.data.item.orig.type]: data }
							}));
							break;
						}
						case DynamicType.AV:
							if (dynamicInfo.data.data.item.modules.module_dynamic.major.type === "MAJOR_TYPE_ARCHIVE") {
								const bvid = dynamicInfo.data.data.item.modules.module_dynamic.major.archive.bvid;
								const INFODATA = await getBilibiliData("单个视频作品数据", "", {
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
									shareurl: "动态分享链接"
								}));
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
									create_time: Common.convertTimestampToDateTime(INFODATA.data.data.ctime),
									avatar_url: INFODATA.data.data.owner.face,
									frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
									share_url: "https://www.bilibili.com/video/" + bvid,
									username: checkvip$2(userProfileData.data.data.card),
									fans: Count(userProfileData.data.data.follower),
									user_shortid: userProfileData.data.data.card.mid,
									total_favorited: Count(userProfileData.data.data.like_num),
									following_count: Count(userProfileData.data.data.card.attention),
									render_time: Common.getCurrentTime(),
									dynamicTYPE: "视频动态",
									dynamic_id: dynamicInfo.data.data.item.id_str
								});
								this.e.reply(img$1);
							}
							break;
						case DynamicType.LIVE_RCMD: {
							const userINFO = await getBilibiliData("用户主页数据", "", {
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
								create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.modules.module_author.pub_ts),
								now_time: Common.getCurrentTime(),
								share_url: "https://live.bilibili.com/" + dynamicCARD.live_play_info.room_id,
								dynamicTYPE: "直播动态"
							});
							this.e.reply(img$1);
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
					const liveInfo = await this.amagi.getBilibiliData("直播间信息", {
						room_id: iddata.room_id,
						typeMode: "strict"
					});
					const roomInitInfo = await this.amagi.getBilibiliData("直播间初始化信息", {
						room_id: iddata.room_id,
						typeMode: "strict"
					});
					const userProfileData = await this.amagi.getBilibiliData("用户主页数据", {
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
						now_time: Common.getCurrentTime(),
						share_url: "https://live.bilibili.com/" + liveInfo.data.data.room_id,
						dynamicTYPE: "直播"
					});
					this.e.reply(img$2);
					break;
				}
				default: break;
			}
		}
		async getvideo({ infoData, playUrlData }) {
			logger.debug("是否登录:", this.islogin);
			switch (this.islogin) {
				case true: {
					logger.debug("视频 URL:", this.Type === "one_video" ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url);
					const bmp4 = await downloadFile(this.Type === "one_video" ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url, {
						title: `Bil_V_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`,
						headers: this.headers
					});
					logger.debug("音频 URL:", this.Type === "one_video" ? playUrlData.data?.dash?.audio[0].base_url : playUrlData.result.dash.audio[0].base_url);
					const bmp3 = await downloadFile(this.Type === "one_video" ? playUrlData.data?.dash?.audio[0].base_url : playUrlData.result.dash.audio[0].base_url, {
						title: `Bil_A_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp3`,
						headers: this.headers
					});
					if (bmp4.filepath && bmp3.filepath) await mergeFile("二合一（视频 + 音频）", {
						path: bmp4.filepath,
						path2: bmp3.filepath,
						resultPath: Common.tempDri.video + `Bil_Result_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`,
						callback: async (success, resultPath) => {
							if (success) {
								const filePath = Common.tempDri.video + `${Config.app.removeCache ? "tmp_" + Date.now() : this.downloadfilename}.mp4`;
								fs.renameSync(resultPath, filePath);
								logger.mark(`视频文件重命名完成: ${resultPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
								logger.mark("正在尝试删除缓存文件");
								await Common.removeFile(bmp4.filepath, true);
								await Common.removeFile(bmp3.filepath, true);
								const stats = fs.statSync(filePath);
								const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
								if (fileSizeInMB > Config.upload.groupfilevalue) return await uploadFile(this.e, {
									filepath: filePath,
									totalBytes: fileSizeInMB,
									originTitle: this.downloadfilename
								}, "", { useGroupFile: true });
								else return await uploadFile(this.e, {
									filepath: filePath,
									totalBytes: fileSizeInMB,
									originTitle: this.downloadfilename
								}, "");
							} else {
								await Common.removeFile(bmp4.filepath, true);
								await Common.removeFile(bmp3.filepath, true);
								return true;
							}
						}
					});
					break;
				}
				case false:
					logger.debug("视频 URL:", playUrlData.durl[0].url);
					await downloadVideo(this.e, {
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
	qnd = {
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
	generateGradientStyle = (colors, text) => {
		if (!colors) return "";
		const gradientString = colors.map((color) => `${color}`).join(", ");
		return `<span style="font-family: bilifont; color: transparent; background-clip: text; margin: 0 200px 0 0; font-size: 43px; background-image: linear-gradient(135deg, ${gradientString} 0%, ${gradientString} 100%); ">${text}</span>`;
	};
	cover = (pic) => {
		const imgArray = [];
		for (const i of pic) {
			const obj = { image_src: i.img_src };
			imgArray.push(obj);
		}
		return imgArray;
	};
	generateDecorationCard = (decorate) => decorate ? `<div style="display: flex; width: 500px; height: 150px; background-position: center; background-attachment: fixed; background-repeat: no-repeat; background-size: contain; align-items: center; justify-content: flex-end; background-image: url('${decorate.card_url}')">${generateGradientStyle(decorate.fan?.color_format?.colors, decorate.fan.num_str || decorate.fan.num_desc)}</div>` : "<div></div>";
	oid = (dynamicINFO, dynamicInfoCard) => {
		switch (dynamicINFO.data.item.type) {
			case "DYNAMIC_TYPE_WORD":
			case "DYNAMIC_TYPE_FORWARD": return dynamicINFO.data.item.id_str;
			default: return dynamicInfoCard.data.card.desc.rid.toString();
		}
	};
	bilibiliProcessVideos = async (qualityOptions, videoList, audioUrl) => {
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
	getvideosize = async (videourl, audiourl, bvid) => {
		const videoheaders = await new Networks({
			url: videourl,
			headers: {
				...baseHeaders,
				Referer: `https://api.bilibili.com/video/${bvid}`,
				Cookie: Config.cookies.bilibili
			}
		}).getHeaders();
		const audioheaders = await new Networks({
			url: audiourl,
			headers: {
				...baseHeaders,
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
	formatVideoStats$1 = (view, danmaku, like, coin, share, favorite) => {
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
	alignTwoColumns$1 = (col1, col2, targetLength) => {
		const spacesNeeded = targetLength - getStringDisplayWidth$1(col1) + 5;
		return col1 + " ".repeat(spacesNeeded) + col2;
	};
	getStringDisplayWidth$1 = (str) => {
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
});
function bilibiliComments(commentsData, host_mid) {
	if (!commentsData) return [];
	let jsonArray = [];
	if (commentsData.code === 404) return null;
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
			isUP
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
			isUP
		};
		jsonArray.push(obj);
	}
	jsonArray.sort((a, b) => {
		if (a.isTop && !b.isTop) return -1;
		if (!a.isTop && b.isTop) return 1;
		if (a.isTop && b.isTop) return 0;
		return b.like - a.like;
	});
	for (const i of jsonArray) if (i.like > 1e4) i.like = (i.like / 1e4).toFixed(1) + "w";
	jsonArray = space(jsonArray);
	for (const comment of jsonArray) {
		let originalText = comment.message;
		if (comment.members && comment.members.length > 0) for (const member of comment.members) {
			const regex = new RegExp(`@${member.uname}`, "g");
			originalText = originalText.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};">@${member.uname}</span>`);
		}
		comment.message = originalText;
	}
	let res;
	res = br$2(jsonArray);
	res = [...res.filter((c) => c.isTop), ...res.filter((c) => !c.isTop)].slice(0, Config.bilibili.numcomment);
	return res;
}
function space(data) {
	for (const i in data) if (data[i].message) data[i].message = data[i].message.replace(/ /g, " ");
	return data;
}
function br$2(data) {
	for (const i in data) {
		let message = data[i].message;
		message = message?.replace(/\n/g, "<br>");
		data[i].message = message;
	}
	return data;
}
function checkvip$1(member) {
	return member.vip.vipStatus === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.uname}</span>` : `<span style="color: #888">${member.uname}</span>`;
}
function getRelativeTimeFromTimestamp$3(timestamp) {
	const differenceInSeconds = Math.floor(Date.now() / 1e3) - timestamp;
	if (differenceInSeconds < 30) return "刚刚";
	else if (differenceInSeconds < 60) return differenceInSeconds + "秒前";
	else if (differenceInSeconds < 3600) return Math.floor(differenceInSeconds / 60) + "分钟前";
	else if (differenceInSeconds < 86400) return Math.floor(differenceInSeconds / 3600) + "小时前";
	else if (differenceInSeconds < 2592e3) return Math.floor(differenceInSeconds / 86400) + "天前";
	else if (differenceInSeconds < 7776e3) return Math.floor(differenceInSeconds / 2592e3) + "个月前";
	else {
		const date = /* @__PURE__ */ new Date(timestamp * 1e3);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return year + "-" + month + "-" + day;
	}
}
var emoteToUrl;
var init_comments = __esmMin(async () => {
	await init_module();
	await init_Config();
	emoteToUrl = (message, emote) => {
		for (const key in emote) if (Object.prototype.hasOwnProperty.call(emote, key)) {
			if (message.includes(key)) {
				if (message.includes("[") && message.includes("]")) message = message.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), `<img src="${emote[key].url}"/>`);
			}
		}
		return message;
	};
});
async function genParams(apiURL) {
	if (Config.cookies.bilibili === "" || Config.cookies.bilibili === null) return "&platform=html5";
	const loginInfo = await getBilibiliData("登录基本信息", Config.cookies.bilibili);
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
}
async function checkCk() {
	if (Config.cookies.bilibili === "" || Config.cookies.bilibili === null) return {
		Status: "!isLogin",
		isVIP: false
	};
	const loginInfo = await getBilibiliData("登录基本信息", Config.cookies.bilibili);
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
}
var init_genParams = __esmMin(() => {
	init_esm();
	init_Config();
});
async function getBilibiliID(url) {
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
			result = {
				type: "one_video",
				bvid: bvideoMatch ? bvideoMatch[1] || bvideoMatch[2] : void 0,
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
	return result;
}
var init_getID = __esmMin(() => {});
var bilibiliLogin;
var init_login = __esmMin(async () => {
	await init_esm();
	await init_utils();
	await init_Config();
	bilibiliLogin = async (e) => {
		const qrcodeurl = await getBilibiliData("申请二维码", { typeMode: "strict" });
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
			const qrcodeStatusData = await getBilibiliData("二维码状态", {
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
});
var init_bilibili$1 = __esmMin(async () => {
	init_bilibili$2();
	init_comments();
	init_genParams();
	init_getID();
	init_login();
	init_push();
});
function br$1(data) {
	return data = data.replace(/\n/g, "<br>");
}
function checkvip(member) {
	return member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#EDEDED" : "#606060"}">${member.name}</span>`;
}
function extractEmojisData(data) {
	const emojisData = [];
	data.forEach((packages) => {
		packages.emote.forEach((emote) => {
			emojisData.push({
				text: emote.text,
				url: emote.url
			});
		});
	});
	return emojisData;
}
var bilibiliBaseHeaders, Bilibilipush, skipDynamic$1;
var init_push = __esmMin(async () => {
	await init_esm();
	await init_module();
	await init_Config();
	await init_bilibili$1();
	bilibiliBaseHeaders = {
		...baseHeaders,
		Referer: "https://api.bilibili.com/",
		Cookie: Config.cookies.bilibili
	};
	Bilibilipush = class extends Base {
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
			const data = await this.getDynamicList(Config.pushlist.bilibili);
			const pushdata = await this.excludeAlreadyPushed(data.willbepushlist);
			if (Object.keys(pushdata).length === 0) return true;
			if (this.force) return await this.forcepush(pushdata);
			else return await this.getdata(pushdata);
		}
		async syncConfigToDatabase() {
			if (!Config.pushlist.bilibili || Config.pushlist.bilibili.length === 0) return;
			await bilibiliDBInstance.syncConfigSubscriptions(Config.pushlist.bilibili);
		}
		async getdata(data) {
			for (const dynamicId in data) {
				logger.mark(`\n        ${logger.blue("开始处理并渲染B站动态图片")}\n        ${logger.cyan("UP")}: ${logger.green(data[dynamicId].remark)}\n        ${logger.cyan("动态id")}：${logger.yellow(dynamicId)}\n        ${logger.cyan("访问地址")}：${logger.green("https://t.bilibili.com/" + dynamicId)}`);
				let skip = await skipDynamic$1(data[dynamicId]);
				skip && logger.warn(`动态 https://t.bilibili.com/${dynamicId} 已被处理，跳过`);
				let send_video = true;
				let img$2 = [];
				const dynamicCARDINFO = await this.amagi.getBilibiliData("动态卡片数据", {
					dynamic_id: dynamicId,
					typeMode: "strict"
				});
				const dycrad = dynamicCARDINFO.data.data.card && dynamicCARDINFO.data.data.card.card && JSON.parse(dynamicCARDINFO.data.data.card.card);
				if (!skip) {
					const userINFO = await this.amagi.getBilibiliData("用户主页数据", {
						host_mid: data[dynamicId].host_mid,
						typeMode: "strict"
					});
					let emojiDATA = await this.amagi.getBilibiliData("Emoji数据");
					emojiDATA = extractEmojisData(emojiDATA.data.data.packages);
					switch (data[dynamicId].dynamic_type) {
						case DynamicType.DRAW:
							if (data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null && data[dynamicId].Dynamic_Data.modules.module_dynamic && data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
								const name = data[dynamicId].Dynamic_Data.modules.module_dynamic.topic.name;
								data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus.summary.rich_text_nodes.unshift({
									orig_text: name,
									text: name,
									type: "topic",
									rid: data[dynamicId].Dynamic_Data.modules.module_dynamic.topic.id.toString()
								});
								data[dynamicId].Dynamic_Data.modules.module_dynamic.major.opus.summary.text = `${name}\n\n` + data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text;
							}
							img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_DRAW", {
								image_url: dycrad.item.pictures && cover(dycrad.item.pictures),
								text: replacetext(br$1(data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text ?? ""), data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.rich_text_nodes ?? []),
								dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
								pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
								share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
								create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
								avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
								frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
								share_url: "https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str,
								username: checkvip(userINFO.data.data.card),
								fans: Count(userINFO.data.data.follower),
								user_shortid: data[dynamicId].host_mid,
								total_favorited: Count(userINFO.data.data.like_num),
								following_count: Count(userINFO.data.data.card.attention),
								decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decoration_card),
								render_time: Common.getCurrentTime(),
								imageLayout: Config.bilibili.imageLayout,
								dynamicTYPE: "图文动态推送"
							});
							break;
						case DynamicType.AV:
							if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.type === "MAJOR_TYPE_ARCHIVE") {
								const bvid = data[dynamicId].Dynamic_Data?.modules.module_dynamic.major?.archive?.bvid ?? "";
								const INFODATA = await getBilibiliData("单个视频作品数据", "", {
									bvid,
									typeMode: "strict"
								});
								if (INFODATA.data.data.redirect_url) {
									send_video = false;
									logger.debug(`UP主：${INFODATA.data.data.owner.name} 的该动态类型为${logger.yellow("番剧或影视")}，默认跳过不下载，直达：${logger.green(INFODATA.data.data.redirect_url)}`);
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
									duration_text: data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.archive?.duration_text ?? "0:00",
									create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
									avatar_url: INFODATA.data.data.owner.face,
									frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
									share_url: "https://www.bilibili.com/video/" + bvid,
									username: checkvip(userINFO.data.data.card),
									fans: Count(userINFO.data.data.follower),
									user_shortid: data[dynamicId].host_mid,
									total_favorited: Count(userINFO.data.data.like_num),
									following_count: Count(userINFO.data.data.card.attention),
									render_time: Common.getCurrentTime(),
									dynamicTYPE: "视频动态推送",
									dynamic_id: dynamicId
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
								frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
								fans: Count(userINFO.data.data.follower),
								create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
								now_time: Common.getCurrentTime(),
								share_url: "https://live.bilibili.com/" + dycrad.live_play_info.room_id,
								dynamicTYPE: "直播动态推送"
							});
							break;
						case DynamicType.FORWARD: {
							const text = replacetext(br$1(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes);
							let param = {};
							switch (data[dynamicId].Dynamic_Data.orig.type) {
								case DynamicType.AV:
									param = {
										username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
										pub_action: data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_action,
										avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
										duration_text: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.duration_text,
										title: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.title,
										danmaku: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.danmaku,
										play: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.stat.play,
										cover: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive?.cover,
										create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
										decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
										frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
									};
									break;
								case DynamicType.DRAW: {
									const dynamicCARD = await getBilibiliData("动态卡片数据", Config.cookies.bilibili, {
										dynamic_id: data[dynamicId].Dynamic_Data.orig.id_str,
										typeMode: "strict"
									});
									const cardData = JSON.parse(dynamicCARD.data.data.card.card);
									param = {
										username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
										create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
										avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
										text: replacetext(br$1(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
										image_url: cardData.item.pictures && cover(cardData.item.pictures),
										decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
										frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
									};
									break;
								}
								case DynamicType.WORD:
									param = {
										username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
										create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
										avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
										text: replacetext(br$1(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
										decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
										frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
									};
									break;
								case DynamicType.LIVE_RCMD: {
									const liveData = JSON.parse(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.live_rcmd.content);
									param = {
										username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
										create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
										avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
										decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
										frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image,
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
									logger.warn(`UP主：${data[dynamicId].remark}的${logger.green("转发动态")}转发的原动态类型为「${logger.yellow(data[dynamicId].Dynamic_Data.orig.type)}」暂未支持解析`);
									break;
							}
							img$2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_FORWARD", {
								text,
								dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
								pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
								share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
								create_time: data[dynamicId].Dynamic_Data.modules.module_author.pub_time,
								avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
								frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
								share_url: "https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str,
								username: checkvip(userINFO.data.data.card),
								fans: Count(userINFO.data.data.follower),
								user_shortid: data[dynamicId].Dynamic_Data.modules.module_author.mid,
								total_favorited: Count(userINFO.data.data.like_num),
								following_count: Count(userINFO.data.data.card.attention),
								dynamicTYPE: "转发动态推送",
								decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
								render_time: Common.getCurrentTime(),
								original_content: { [data[dynamicId].Dynamic_Data.orig.type]: param }
							});
							break;
						}
						default:
							skip = true;
							logger.warn(`UP主：${data[dynamicId].remark}「${data[dynamicId].dynamic_type}」动态类型的暂未支持推送\n动态地址：${"https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str}`);
							break;
					}
				}
				for (const target of data[dynamicId].targets) {
					let status = null;
					if (!skip) {
						const { groupId, botId } = target;
						const bot = karin.getBot(botId);
						const Contact = karin.contactGroup(groupId);
						status = await karin.sendMsg(botId, Contact, img$2 ? [...img$2] : []);
						if (Config.bilibili.push.parsedynamic && status.messageId) switch (data[dynamicId].dynamic_type) {
							case "DYNAMIC_TYPE_AV":
								if (send_video) {
									let correctList;
									let videoSize = "";
									const playUrlData = await this.amagi.getBilibiliData("单个视频下载信息数据", {
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
										await karin.sendMsg(botId, Contact, [segment.text(`设定的最大上传大小为 ${Config.upload.filelimit}MB\n当前解析到的视频大小为 ${Number(videoSize)}MB\n视频太大了，还是去B站看吧~`), segment.reply(status.messageId)]);
										break;
									}
									logger.mark(`当前处于自动推送状态，解析到的视频大小为 ${logger.yellow(Number(videoSize))} MB`);
									const infoData = await this.amagi.getBilibiliData("单个视频作品数据", {
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
									if (mp4File.filepath && mp3File.filepath) await mergeFile("二合一（视频 + 音频）", {
										path: mp4File.filepath,
										path2: mp3File.filepath,
										resultPath: Common.tempDri.video + `Bil_Result_${infoData.data.data.bvid}.mp4`,
										callback: async (success, resultPath) => {
											if (success) {
												const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
												fs.renameSync(resultPath, filePath);
												logger.mark(`视频文件重命名完成: ${resultPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
												logger.mark("正在尝试删除缓存文件");
												await Common.removeFile(mp4File.filepath, true);
												await Common.removeFile(mp3File.filepath, true);
												const stats = fs.statSync(filePath);
												const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
												if (fileSizeInMB > Config.upload.groupfilevalue) return await uploadFile(this.e, {
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
												else return await uploadFile(this.e, {
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
												return true;
											}
										}
									});
								}
								break;
							case "DYNAMIC_TYPE_DRAW": {
								const imgArray = [];
								for (const img2 of data[dynamicId].Dynamic_Data.modules.module_dynamic.major && data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items || data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.opus.pics) imgArray.push(segment.image(img2.src ?? img2.url));
								const forwardMsg = common.makeForward(imgArray, botId, bot.account.name);
								bot.sendForwardMsg(karin.contactFriend(botId), forwardMsg);
								break;
							}
						}
					}
					if (skip || status && status?.messageId) await bilibiliDBInstance.addDynamicCache(dynamicId, data[dynamicId].host_mid, target.groupId, data[dynamicId].dynamic_type);
				}
			}
		}
		async getDynamicList(userList) {
			const willbepushlist = {};
			try {
				const filteredUserList = userList.filter((item) => item.switch !== false);
				for (const item of filteredUserList) {
					const dynamic_list = await this.amagi.getBilibiliData("用户主页动态列表数据", {
						host_mid: item.host_mid,
						typeMode: "strict"
					});
					if (dynamic_list.data.data.items.length > 0) for (const dynamic of dynamic_list.data.data.items) {
						const now = Date.now();
						const createTime = dynamic.modules.module_author.pub_ts * 1e3;
						const timeDifference = now - createTime;
						const is_top = dynamic.modules.module_tag?.text === "置顶";
						let shouldPush = false;
						const timeDiffSeconds = Math.round(timeDifference / 1e3);
						const timeDiffHours = Math.round(timeDifference / 1e3 / 60 / 60 * 100) / 100;
						logger.debug(`\n              前期获取该动态基本信息：\n              UP主：${dynamic.modules.module_author.name}\n              动态ID：${dynamic.id_str}\n              发布时间：${Common.convertTimestampToDateTime(createTime / 1e3)}\n              发布时间戳（ms）：${createTime}\n              当前时间戳（ms）：${now}\n              时间差（ms）：${timeDifference} ms (${timeDiffSeconds}s) (${timeDiffHours}h)\n              是否置顶：${is_top}\n              是否在一天内：${timeDifference < 864e5 ? logger.green("true") : logger.red("false")}\n              `);
						if (is_top && timeDifference < 864e5 || timeDifference < 864e5) {
							shouldPush = true;
							logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该动态纳入当天推送列表：https://t.bilibili.com/${dynamic.id_str}\n`));
						} else logger.debug(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该动态：https://t.bilibili.com/${dynamic.id_str}\n`));
						if (timeDifference < 864e5 || shouldPush) {
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
					else logger.error(`「${item.remark}」的动态列表数量为零！`);
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
		async setting(data) {
			const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
			const host_mid = Number(data.data.card.mid);
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
					logger.info(`\n删除成功！${data.data.card.name}\nUID：${host_mid}`);
					await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n删除成功！${data.data.card.name}\nUID：${host_mid}`);
					if (existingItem.group_id.length === 0) {
						const index = config$1.bilibili.indexOf(existingItem);
						config$1.bilibili.splice(index, 1);
					}
				} else {
					await bilibiliDBInstance.subscribeBilibiliUser(groupId, botId, host_mid, data.data.card.name);
					existingItem.group_id.push(`${groupId}:${botId}`);
					await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${data.data.card.name}\nUID：${host_mid}`);
					if (Config.bilibili.push.switch === false) await this.e.reply("请发送「#设置B站推送开启」以进行推送");
					logger.info(`\n设置成功！${data.data.card.name}\nUID：${host_mid}`);
				}
			} else {
				await bilibiliDBInstance.subscribeBilibiliUser(groupId, botId, host_mid, data.data.card.name);
				config$1.bilibili.push({
					switch: true,
					host_mid,
					group_id: [`${groupId}:${botId}`],
					remark: data.data.card.name
				});
				await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n添加成功！${data.data.card.name}\nUID：${host_mid}`);
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
					const remark = (await this.amagi.getBilibiliData("用户主页数据", {
						host_mid: i.host_mid,
						typeMode: "strict"
					})).data.data.card.name;
					const matchingItemIndex = config$1.bilibili.findIndex((item) => item.host_mid === i.host_mid);
					if (matchingItemIndex !== -1) config$1.bilibili[matchingItemIndex].remark = remark;
				}
				Config.Modify("pushlist", "bilibili", config$1.bilibili);
			}
		}
		async forcepush(data) {
			const currentGroupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
			const currentBotId = this.e.selfId;
			if (!this.e.msg.includes("全部")) {
				const subscribedUids = (await bilibiliDBInstance.getGroupSubscriptions(currentGroupId)).map((sub) => sub.host_mid);
				const filteredData = {};
				for (const dynamicId in data) if (subscribedUids.includes(data[dynamicId].host_mid)) filteredData[dynamicId] = {
					...data[dynamicId],
					targets: [{
						groupId: currentGroupId,
						botId: currentBotId
					}]
				};
				await this.getdata(filteredData);
			} else await this.getdata(data);
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
				const userInfo = await this.amagi.getBilibiliData("用户主页数据", {
					host_mid,
					typeMode: "strict"
				});
				renderOpt.push({
					avatar_img: userInfo.data.data.card.face,
					username: userInfo.data.data.card.name,
					host_mid: userInfo.data.data.card.mid,
					fans: Count(userInfo.data.data.follower),
					total_favorited: Count(userInfo.data.data.like_num),
					following_count: Count(userInfo.data.data.card.attention)
				});
			}
			const img$2 = await Render("bilibili/userlist", { renderOpt });
			await this.e.reply(img$2);
		}
	};
	skipDynamic$1 = async (PushItem) => {
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
});
var BilibiliDBBase;
var init_bilibili = __esmMin(async () => {
	await init_utils();
	await init_Config();
	await init_push();
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
				`CREATE TABLE IF NOT EXISTS Groups (\n        id TEXT PRIMARY KEY,\n        botId TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (botId) REFERENCES Bots(id)\n      )`,
				`CREATE TABLE IF NOT EXISTS BilibiliUsers (\n        host_mid INTEGER PRIMARY KEY,\n        remark TEXT,\n        filterMode TEXT DEFAULT 'blacklist',\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP\n      )`,
				`CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (\n        groupId TEXT,\n        host_mid INTEGER,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY (groupId, host_mid),\n        FOREIGN KEY (groupId) REFERENCES Groups(id),\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid)\n      )`,
				`CREATE TABLE IF NOT EXISTS DynamicCaches (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        dynamic_id TEXT NOT NULL,\n        host_mid INTEGER NOT NULL,\n        groupId TEXT NOT NULL,\n        dynamic_type TEXT,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),\n        FOREIGN KEY (groupId) REFERENCES Groups(id),\n        UNIQUE(dynamic_id, host_mid, groupId)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterWords (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        host_mid INTEGER NOT NULL,\n        word TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),\n        UNIQUE(host_mid, word)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterTags (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        host_mid INTEGER NOT NULL,\n        tag TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (host_mid) REFERENCES BilibiliUsers(host_mid),\n        UNIQUE(host_mid, tag)\n      )`
			]) await this.runQuery(query);
		}
		runQuery(sql, params = []) {
			return new Promise((resolve, reject) => {
				this.db.run(sql, params, function(err) {
					if (err) reject(err);
					else resolve({
						lastID: this.lastID,
						changes: this.changes
					});
				});
			});
		}
		getQuery(sql, params = []) {
			return new Promise((resolve, reject) => {
				this.db.get(sql, params, (err, row) => {
					if (err) reject(err);
					else resolve(row);
				});
			});
		}
		allQuery(sql, params = []) {
			return new Promise((resolve, reject) => {
				this.db.all(sql, params, (err, rows) => {
					if (err) reject(err);
					else resolve(rows);
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
	await init_utils();
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
		async createTables() {
			for (const query of [
				`CREATE TABLE IF NOT EXISTS Bots (\n        id TEXT PRIMARY KEY,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP\n      )`,
				`CREATE TABLE IF NOT EXISTS Groups (\n        id TEXT PRIMARY KEY,\n        botId TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (botId) REFERENCES Bots(id)\n      )`,
				`CREATE TABLE IF NOT EXISTS DouyinUsers (\n        sec_uid TEXT PRIMARY KEY,\n        short_id TEXT,\n        remark TEXT,\n        living INTEGER DEFAULT 0,\n        filterMode TEXT DEFAULT 'blacklist',\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP\n      )`,
				`CREATE TABLE IF NOT EXISTS GroupUserSubscriptions (\n        groupId TEXT,\n        sec_uid TEXT,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        PRIMARY KEY (groupId, sec_uid),\n        FOREIGN KEY (groupId) REFERENCES Groups(id),\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid)\n      )`,
				`CREATE TABLE IF NOT EXISTS AwemeCaches (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        aweme_id TEXT NOT NULL,\n        sec_uid TEXT NOT NULL,\n        groupId TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n        FOREIGN KEY (groupId) REFERENCES Groups(id),\n        UNIQUE(aweme_id, sec_uid, groupId)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterWords (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        sec_uid TEXT NOT NULL,\n        word TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n        UNIQUE(sec_uid, word)\n      )`,
				`CREATE TABLE IF NOT EXISTS FilterTags (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        sec_uid TEXT NOT NULL,\n        tag TEXT NOT NULL,\n        createdAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,\n        FOREIGN KEY (sec_uid) REFERENCES DouyinUsers(sec_uid),\n        UNIQUE(sec_uid, tag)\n      )`
			]) await this.runQuery(query);
		}
		runQuery(sql, params = []) {
			return new Promise((resolve, reject) => {
				this.db.run(sql, params, function(err) {
					if (err) reject(err);
					else resolve({
						lastID: this.lastID,
						changes: this.changes
					});
				});
			});
		}
		getQuery(sql, params = []) {
			return new Promise((resolve, reject) => {
				this.db.get(sql, params, (err, row) => {
					if (err) reject(err);
					else resolve(row);
				});
			});
		}
		allQuery(sql, params = []) {
			return new Promise((resolve, reject) => {
				this.db.all(sql, params, (err, rows) => {
					if (err) reject(err);
					else resolve(rows);
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
			return result.changes > 0;
		}
		async addAwemeCache(aweme_id, sec_uid, groupId) {
			let cache = await this.getQuery("SELECT * FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ?", [
				aweme_id,
				sec_uid,
				groupId
			]);
			if (!cache) {
				const now = (/* @__PURE__ */ new Date()).toISOString();
				cache = {
					id: (await this.runQuery("INSERT INTO AwemeCaches (aweme_id, sec_uid, groupId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)", [
						aweme_id,
						sec_uid,
						groupId,
						now,
						now
					])).lastID,
					aweme_id,
					sec_uid,
					groupId,
					createdAt: now,
					updatedAt: now
				};
			}
			return cache;
		}
		async isAwemePushed(aweme_id, sec_uid, groupId) {
			return ((await this.getQuery("SELECT COUNT(*) as count FROM AwemeCaches WHERE aweme_id = ? AND sec_uid = ? AND groupId = ?", [
				aweme_id,
				sec_uid,
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
					if (groupId && sec_uid) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE groupId = ? AND sec_uid = ?", [groupId, sec_uid])).changes };
					if (groupId) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE groupId = ?", [groupId])).changes };
					if (sec_uid) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE sec_uid = ?", [sec_uid])).changes };
					if (aweme_id) return { affected: (await this.runQuery("DELETE FROM AwemeCaches WHERE aweme_id = ?", [aweme_id])).changes };
					return { affected: 0 };
				}
			};
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
});
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
			await new Promise((resolve) => setTimeout(resolve, 100));
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
			await new Promise((resolve) => setTimeout(resolve, 100));
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
		const [douyin$1, bilibili$1] = await Promise.all([getDouyinDB(), getBilibiliDB()]);
		return {
			douyinDB: douyin$1,
			bilibiliDB: bilibili$1
		};
	};
	douyinDBInstance = await getDouyinDB();
	bilibiliDBInstance = await getBilibiliDB();
	cleanOldDynamicCache = async (platform, days = 7) => {
		if (platform === "douyin") return await (await getDouyinDB()).cleanOldAwemeCache(days);
		else return await (await getBilibiliDB()).cleanOldDynamicCache(days);
	};
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
				filesByExt(this.dirCfgPath, ".yaml", "abs").forEach((file) => watch(file, (_old, _now) => {}));
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
						const { Keywords, Tags, filterMode,...rest } = item;
						return rest;
					});
					if ("bilibili" in cleanedConfig) cleanedConfig.bilibili = cleanedConfig.bilibili.map((item) => {
						const { Keywords, Tags, filterMode,...rest } = item;
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
var base64Decode = (str) => Buffer.from(str, "base64").toString("utf8");
var urlDecode = (str) => decodeURIComponent(str);
var hexDecode = (str) => Buffer.from(str, "hex").toString("utf8");
var reverseString = (str) => str.split("").reverse().join("");
var charOffsetDecode = (str, offset = 5) => str.split("").map((char) => {
	const code = char.charCodeAt(0);
	return String.fromCharCode(code - offset);
}).join("");
var multiLayerDecode = (str) => {
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
const signatureVerificationMiddleware = (req, res, next) => {
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
await init_esm();
await init_db();
await init_Config();
const getGroupsRouter = async (req, res) => {
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
			const douyinSubscriptions = await douyinDB$1.getGroupSubscriptions(group.id);
			const bilibiliSubscriptions = await bilibiliDB$1.getGroupSubscriptions(group.id);
			if (douyinSubscriptions.length > 0 || bilibiliSubscriptions.length > 0) {
				const bot = getBot(group.botId);
				const groupInfo = await bot.getGroupInfo(group.id);
				const groupAvatarUrl = await bot.getGroupAvatarUrl(group.id);
				groupList.push({
					id: group.id,
					name: groupInfo.groupName || `群组${group.id}`,
					avatar: groupAvatarUrl,
					botId: group.botId,
					subscriptionCount: {
						douyin: douyinSubscriptions.length,
						bilibili: bilibiliSubscriptions.length
					}
				});
			}
		}
		return createSuccessResponse(res, groupList);
	} catch (error) {
		logger.error("获取群组列表失败:", error);
		return createServerErrorResponse(res, "获取群组列表失败");
	}
};
const getAuthorsRouter = async (req, res) => {
	try {
		const { groupId } = req.query;
		if (!groupId) return createBadRequestResponse(res, "请提供群组ID");
		const douyinDB$1 = await getDouyinDB();
		const bilibiliDB$1 = await getBilibiliDB();
		const [douyinSubscriptions, bilibiliSubscriptions] = await Promise.all([douyinDB$1.getGroupSubscriptions(groupId), bilibiliDB$1.getGroupSubscriptions(groupId)]);
		const fetchDouyinAuthors = async (subscriptions) => {
			const validSubscriptions = subscriptions.filter((sub) => sub.douyinUser);
			if (validSubscriptions.length === 0) return [];
			const batchSize = 5;
			const results = [];
			for (let i = 0; i < validSubscriptions.length; i += batchSize) {
				const batchPromises = validSubscriptions.slice(i, i + batchSize).map(async (subscription) => {
					try {
						const userProfile = await getDouyinData("用户主页数据", {
							sec_uid: subscription.douyinUser.sec_uid,
							typeMode: "strict"
						}, Config.cookies.douyin);
						return {
							id: subscription.douyinUser.sec_uid,
							name: subscription.douyinUser.remark || subscription.douyinUser.short_id || subscription.douyinUser.sec_uid,
							avatar: userProfile.data.user.avatar_larger.url_list[0],
							platform: "douyin"
						};
					} catch (error) {
						logger.warn(`获取抖音用户数据失败 (${subscription.douyinUser.sec_uid}):`, error);
						return {
							id: subscription.douyinUser.sec_uid,
							name: subscription.douyinUser.remark || subscription.douyinUser.short_id || subscription.douyinUser.sec_uid,
							avatar: "",
							platform: "douyin"
						};
					}
				});
				const batchResults = await Promise.all(batchPromises);
				results.push(...batchResults);
			}
			return results;
		};
		const fetchBilibiliAuthors = async (subscriptions) => {
			const validSubscriptions = subscriptions.filter((sub) => sub.bilibiliUser);
			if (validSubscriptions.length === 0) return [];
			const batchSize = 5;
			const results = [];
			for (let i = 0; i < validSubscriptions.length; i += batchSize) {
				const batchPromises = validSubscriptions.slice(i, i + batchSize).map(async (subscription) => {
					try {
						const userProfile = await getBilibiliData("用户主页数据", {
							host_mid: subscription.bilibiliUser.host_mid,
							typeMode: "strict"
						}, Config.cookies.bilibili);
						return {
							id: subscription.bilibiliUser.host_mid.toString(),
							name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
							avatar: userProfile.data.data.card.face,
							platform: "bilibili"
						};
					} catch (error) {
						logger.warn(`获取B站用户数据失败 (${subscription.bilibiliUser.host_mid}):`, error);
						return {
							id: subscription.bilibiliUser.host_mid.toString(),
							name: subscription.bilibiliUser.remark || subscription.bilibiliUser.host_mid.toString(),
							avatar: "",
							platform: "bilibili"
						};
					}
				});
				const batchResults = await Promise.all(batchPromises);
				results.push(...batchResults);
			}
			return results;
		};
		const [douyinAuthors, bilibiliAuthors] = await Promise.all([fetchDouyinAuthors(douyinSubscriptions), fetchBilibiliAuthors(bilibiliSubscriptions)]);
		return createSuccessResponse(res, [...douyinAuthors, ...bilibiliAuthors]);
	} catch (error) {
		logger.error("获取作者列表失败:", error);
		return createServerErrorResponse(res, "获取作者列表失败");
	}
};
const getDouyinContentRouter = async (req, res) => {
	try {
		const { groupId } = req.query;
		if (!groupId) return createBadRequestResponse(res, "请提供群组ID");
		const caches = await (await getDouyinDB()).awemeCacheRepository.find({
			where: { groupId },
			relations: ["douyinUser"],
			order: { createdAt: "DESC" },
			take: 100
		});
		return createSuccessResponse(res, await Promise.all(caches.map(async (cache) => {
			let authorName = cache.sec_uid;
			if (cache.douyinUser) authorName = cache.douyinUser.remark || cache.douyinUser.short_id || cache.douyinUser.sec_uid;
			const userProfile = await getDouyinData("用户主页数据", {
				sec_uid: cache.douyinUser.sec_uid,
				typeMode: "strict"
			}, Config.cookies.douyin);
			return {
				id: cache.aweme_id,
				platform: "douyin",
				title: `抖音作品 ${cache.aweme_id}`,
				author: authorName,
				avatar: userProfile.data?.user?.avatar_larger?.url_list[0] || "",
				publishTime: cache.createdAt.toISOString(),
				thumbnail: "",
				type: "video",
				isBlocked: false,
				pushStatus: "success",
				createdAt: cache.createdAt.toISOString()
			};
		})));
	} catch (error) {
		logger.error("获取抖音内容列表失败:", error);
		return createServerErrorResponse(res, "获取抖音内容列表失败: " + error);
	}
};
const getBilibiliContentRouter = async (req, res) => {
	try {
		const { groupId } = req.query;
		if (!groupId) return createBadRequestResponse(res, "请提供群组ID");
		const caches = await (await getBilibiliDB()).dynamicCacheRepository.find({
			where: { groupId },
			relations: ["bilibiliUser"],
			order: { createdAt: "DESC" },
			take: 100
		});
		return createSuccessResponse(res, await Promise.all(caches.map(async (cache) => {
			let authorName = cache.host_mid.toString();
			if (cache.bilibiliUser) authorName = cache.bilibiliUser.remark || cache.host_mid.toString();
			const userProfile = await getBilibiliData("用户主页数据", {
				host_mid: cache.host_mid,
				typeMode: "strict"
			}, Config.cookies.bilibili);
			return {
				id: cache.dynamic_id,
				platform: "bilibili",
				title: `B站动态 ${cache.dynamic_id}`,
				author: authorName,
				avatar: userProfile.data?.data?.card?.face || "",
				publishTime: cache.createdAt.toISOString(),
				thumbnail: "",
				type: "dynamic",
				isBlocked: false,
				pushStatus: "success",
				createdAt: cache.createdAt.toISOString()
			};
		})));
	} catch (error) {
		logger.error("获取B站内容列表失败:", error);
		return createServerErrorResponse(res, "获取B站内容列表失败: " + error);
	}
};
const addDouyinContentRouter = async (req, res) => {
	try {
		const { contentId, groupId, authorId } = req.body;
		if (!contentId || !groupId || !authorId) return createBadRequestResponse(res, "请提供内容ID、群组ID和作者ID");
		await (await getDouyinDB()).addAwemeCache(contentId, authorId, groupId);
		return createSuccessResponse(res, { message: "添加成功" });
	} catch (error) {
		logger.error("添加抖音内容失败:", error);
		return createServerErrorResponse(res, "添加抖音内容失败");
	}
};
const addBilibiliContentRouter = async (req, res) => {
	try {
		const { contentId, groupId, authorId } = req.body;
		if (!contentId || !groupId || !authorId) return createBadRequestResponse(res, "请提供内容ID、群组ID和作者ID");
		const bilibiliDB$1 = await getBilibiliDB();
		const host_mid = parseInt(authorId);
		await bilibiliDB$1.addDynamicCache(contentId, host_mid, groupId, "manual");
		return createSuccessResponse(res, { message: "添加成功" });
	} catch (error) {
		logger.error("添加B站内容失败:", error);
		return createServerErrorResponse(res, "添加B站内容失败");
	}
};
const deleteContentRouter = async (req, res) => {
	try {
		const { id, platform, groupId } = req.body;
		if (!id || !platform || !groupId) return createBadRequestResponse(res, "请提供内容ID、平台类型和群组ID");
		if (platform === "douyin") await (await getDouyinDB()).awemeCacheRepository.delete({
			aweme_id: id,
			groupId
		});
		else if (platform === "bilibili") await (await getBilibiliDB()).dynamicCacheRepository.delete({
			dynamic_id: id,
			groupId
		});
		return createSuccessResponse(res, { message: "删除成功" });
	} catch (error) {
		logger.error("删除内容失败:", error);
		return createServerErrorResponse(res, "删除内容失败");
	}
};
await init_esm();
await init_utils();
await init_Config();
const videoStreamRouter = (req, res) => {
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
const getVideoRouter = (req, res) => {
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
const getLongLinkRouter = async (req, res) => {
	try {
		const { link } = req.body;
		if (!link || typeof link !== "string") return createBadRequestResponse(res, "请提供有效的链接");
		const finalUrl = (await axios.get(link, { headers: { "User-Agent": "Apifox/1.0.0 (https://apifox.com)" } })).request.res.responseUrl;
		if (finalUrl.includes("获取链接重定向失败") || finalUrl.includes("403 Forbidden")) return createServerErrorResponse(res, "无法获取链接的重定向地址：" + finalUrl);
		let platform = "unknown";
		if (finalUrl.includes("douyin.com") || finalUrl.includes("iesdouyin.com") || finalUrl.includes("webcast.amemv.com") || finalUrl.includes("live.douyin.com")) platform = "douyin";
		else if (finalUrl.includes("bilibili.com") || finalUrl.includes("b23.tv")) platform = "bilibili";
		else if (finalUrl.includes("kuaishou.com") || finalUrl.includes("kwai.com") || finalUrl.includes("chenzhongtech.com")) platform = "kuaishou";
		createSuccessResponse(res, {
			originalUrl: link,
			finalUrl,
			platform
		});
		logger.debug(`链接重定向获取成功: ${link} -> ${platform}`);
	} catch (error) {
		logger.error(`链接重定向获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "服务器内部错误",
			error: error.message
		});
	}
};
const getDouyinDataRouter = async (req, res) => {
	const amagi$1 = Client({ cookies: { douyin: Config.cookies.douyin } });
	try {
		const { dataType, params } = req.body;
		if (!dataType || !params) return createBadRequestResponse(res, "请提供数据类型和参数");
		createSuccessResponse(res, {
			data: (await amagi$1.getDouyinData(dataType, {
				...params,
				typeMode: "strict"
			})).data,
			platform: "douyin",
			dataType
		});
		logger.debug(`抖音数据获取成功: ${dataType}`);
	} catch (error) {
		logger.error(`抖音数据获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "抖音数据获取失败",
			error: error.message
		});
	}
};
const getBilibiliDataRouter = async (req, res) => {
	const amagi$1 = Client({ cookies: { bilibili: Config.cookies.bilibili } });
	try {
		const { dataType, params } = req.body;
		if (!dataType || !params) return createBadRequestResponse(res, "请提供数据类型和参数");
		createSuccessResponse(res, {
			data: (await amagi$1.getBilibiliData(dataType, {
				...params,
				typeMode: "strict"
			})).data,
			platform: "bilibili",
			dataType
		});
		logger.debug(`哔哩哔哩数据获取成功: ${dataType}`);
	} catch (error) {
		logger.error(`哔哩哔哩数据获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "哔哩哔哩数据获取失败",
			error: error.message
		});
	}
};
const getKuaishouDataRouter = async (req, res) => {
	const amagi$1 = Client({ cookies: { kuaishou: Config.cookies.kuaishou } });
	try {
		const { dataType, params } = req.body;
		if (!dataType || !params) return createBadRequestResponse(res, "请提供数据类型和参数");
		createSuccessResponse(res, {
			data: (await amagi$1.getKuaishouData(dataType, {
				...params,
				typeMode: "strict"
			})).data,
			platform: "kuaishou",
			dataType
		});
		logger.debug(`快手数据获取成功: ${dataType}`);
	} catch (error) {
		logger.error(`快手数据获取失败: ${error.message}`);
		res.status(500).json({
			success: false,
			message: "快手数据获取失败",
			error: error.message
		});
	}
};
await init_esm();
var import_lib = __toESM(require_lib());
var import_lib$1 = __toESM(require_lib$1());
await init_dist();
var import_dist = __toESM(require_dist());
await init_root();
await init_Config();
var server = app$1();
var proxyOptions = {
	target: "https://developer.huawei.com",
	changeOrigin: true
};
server.use(import_lib$1.default());
server.use("/", import_dist.createProxyMiddleware(proxyOptions));
server.listen(3780);
var app$2 = app$1.Router();
app$2.use(app$1.json());
app$2.use(app$1.urlencoded({ extended: true }));
if (Config.app.APIServer && Config.app.APIServerMount) {
	app$2.use(logMiddleware([
		"/api/bilibili",
		"/api/douyin",
		"/api/kuaishou"
	]));
	app$2.use("/amagi/api/bilibili", createBilibiliRoutes(Config.cookies.bilibili));
	app$2.use("/amagi/api/douyin", createDouyinRoutes(Config.cookies.douyin));
	app$2.use("/amagi/api/kuaishou", createKuaishouRoutes(Config.cookies.kuaishou));
	logger$1.mark(`Amagi server listening on ${logger$1.green("http://localhost:")}${logger$1.green(process.env.HTTP_PORT)} API docs: ${logger$1.yellow("https://amagi.apifox.cn")}`);
} else if (Config.app.APIServer) new Client({ cookies: {
	bilibili: Config.cookies.bilibili,
	douyin: Config.cookies.douyin,
	kuaishou: Config.cookies.kuaishou
} }).startServer(Config.app.APIServerPort);
app$2.get("/stream/:filename", videoStreamRouter);
app$2.get("/video/:filename", getVideoRouter);
var middleware = Config.app.webAuth ? [authMiddleware, signatureVerificationMiddleware] : [];
app$2.use("/getLongLink", ...middleware, getLongLinkRouter);
app$2.use("/douyin/data", ...middleware, getDouyinDataRouter);
app$2.use("/bilibili/data", ...middleware, getBilibiliDataRouter);
app$2.use("/kuaishou/data", ...middleware, getKuaishouDataRouter);
app$2.get("/content/douyin", authMiddleware, signatureVerificationMiddleware, getDouyinContentRouter);
app$2.get("/content/bilibili", authMiddleware, signatureVerificationMiddleware, getBilibiliContentRouter);
app$2.get("/groups", authMiddleware, signatureVerificationMiddleware, getGroupsRouter);
app$2.get("/authors", authMiddleware, signatureVerificationMiddleware, getAuthorsRouter);
app$2.post("/content/douyin", authMiddleware, signatureVerificationMiddleware, addDouyinContentRouter);
app$2.post("/content/bilibili", authMiddleware, signatureVerificationMiddleware, addBilibiliContentRouter);
app$2.post("/content/delete", authMiddleware, signatureVerificationMiddleware, deleteContentRouter);
var staticRouter = app$1.Router();
staticRouter.use(app$1.static(path.join(Root.pluginPath, "lib", "web_chunk"), {
	redirect: false,
	setHeaders: (res, path$1) => {
		if (path$1.endsWith(".html")) res.setHeader("Cache-Control", "no-cache");
		else res.setHeader("Cache-Control", "public, max-age=31536000");
	}
}));
staticRouter.use((0, import_lib.default)({
	htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
	rewrites: [{
		from: /^\/kkk\/(?!.*\.[a-zA-Z0-9]+$).*$/,
		to: "/kkk/index.html"
	}],
	disableDotRule: true
}));
staticRouter.use(app$1.static(path.join(Root.pluginPath, "lib", "web_chunk"), { redirect: false }));
app.use("/kkk", staticRouter);
app.use("/api/kkk", app$2);
await init_module();
var { initAllDatabases } = await init_db().then(() => db_exports);
await initAllDatabases().catch((err) => {
	logger.error(`[karin-plugin-kkk] 数据库初始化失败: ${err.message}`);
});
mkdirSync(`${karinPathBase}/${Root.pluginName}/data`);
mkdirSync(Common.tempDri.images);
mkdirSync(Common.tempDri.video);
console.log("");
console.log("-------------------------- karin-plugin-kkk --------------------------");
logger.info(`${logger.violet(`[插件:v${Root.pluginVersion}]`)} ${logger.green(Root.pluginName)} 初始化完成~`);
logger.info(`${logger.violet("[server]")} ${logger.yellow("外部解析页面:")} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT}/kkk/`)}`);
logger.info(`${logger.violet("[server]")} ${logger.yellow("推送历史管理:")} ${logger.green(`http://127.0.0.1:${process.env.HTTP_PORT}/kkk/database`)}`);
console.log("-------------------------- karin-plugin-kkk --------------------------");
console.log("");
await init_module();
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
			components.accordion.create("cookies", {
				label: "Cookies 相关",
				children: [components.accordion.createItem("cfg:cookies", {
					title: "Cookies 相关",
					className: "ml-4 mr-4",
					subtitle: "建议配置，否则大部分功能无法使用",
					children: [
						components.input.string("douyin", {
							label: "抖音",
							type: "text",
							description: "请输入你的抖音Cookies，不输入则无法使用抖音相关功能噢",
							defaultValue: all.cookies.douyin,
							placeholder: "",
							rules: void 0,
							isRequired: false
						}),
						components.input.string("bilibili", {
							label: "B站",
							type: "text",
							description: "请输入你的B站Cookies，不输入则无法使用B站相关功能噢",
							defaultValue: all.cookies.bilibili,
							placeholder: "",
							rules: void 0,
							isRequired: false
						}),
						components.input.string("kuaishou", {
							label: "快手",
							type: "text",
							description: "请输入你的快手Cookies，不输入则无法使用快手相关功能噢",
							defaultValue: all.cookies.kuaishou,
							placeholder: "",
							rules: void 0,
							isRequired: false
						}),
						components.input.string("xiaohongshu", {
							label: "小红书",
							type: "text",
							description: "请输入你的小红书Cookies，不输入则无法使用小红书相关功能噢",
							defaultValue: all.cookies.xiaohongshu,
							placeholder: "",
							rules: void 0,
							isRequired: false
						})
					]
				})]
			}),
			components.accordion.create("app", {
				label: "插件应用相关",
				children: [components.accordion.createItem("cfg:app", {
					title: "插件应用相关",
					className: "ml-4 mr-4",
					subtitle: "此处用于管理插件的基本设置",
					children: [
						components.switch.create("removeCache", {
							label: "缓存删除",
							description: "下载的视频缓存自动删除，非必要不修改！",
							defaultSelected: all.app.removeCache
						}),
						components.switch.create("videoTool", {
							label: "默认解析",
							description: "即识别最高优先级，修改后重启生效",
							defaultSelected: all.app.videoTool
						}),
						components.input.number("priority", {
							label: "自定义优先级",
							description: "自定义优先级，「默认解析」关闭后才会生效。修改后重启生效",
							defaultValue: all.app.priority.toString(),
							isDisabled: all.app.videoTool,
							rules: void 0
						}),
						components.input.number("renderScale", {
							label: "渲染精度",
							description: "可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度",
							defaultValue: all.app.renderScale.toString(),
							rules: [{
								min: 50,
								max: 200
							}]
						}),
						components.switch.create("APIServer", {
							label: "API服务",
							description: "本地部署一个视频解析API服务，接口范围为本插件用到的所有",
							defaultSelected: all.app.APIServer
						}),
						components.switch.create("APIServerMount", {
							label: "挂载到 Karin",
							description: "API 服务是否挂载到 Karin 上，开启后监听端口为 Karin 的 http 端口，修改后需重启。需开启「API服务」",
							defaultSelected: all.app.APIServerMount,
							isDisabled: !all.app.APIServer
						}),
						components.input.number("APIServerPort", {
							label: "API服务端口",
							defaultValue: all.app.APIServerPort.toString(),
							isDisabled: all.app.APIServerMount,
							rules: [{
								min: 1024,
								max: 65535,
								error: "请输入一个范围在 1024 到 65535 之间的数字"
							}]
						}),
						components.radio.group("Theme", {
							label: "渲染图片的主题色",
							orientation: "horizontal",
							defaultValue: all.app.Theme.toString(),
							radio: [
								components.radio.create("Theme-1", {
									label: "自动",
									description: "06:00-18:00为浅色，18:00-06:00为深色",
									value: "0"
								}),
								components.radio.create("Theme-2", {
									label: "浅色",
									value: "1"
								}),
								components.radio.create("Theme-3", {
									label: "深色",
									value: "2"
								})
							]
						}),
						components.switch.create("RemoveWatermark", {
							label: "移除水印",
							description: "渲染的图片是否移除底部水印",
							defaultSelected: all.app.RemoveWatermark
						}),
						components.input.number("RenderWaitTime", {
							label: "渲染图片的等待时间",
							description: os.platform() === "linux" ? "单位：秒，Linux系统下不能为0" : "单位：秒，传递 0 可禁用",
							defaultValue: all.app.RenderWaitTime.toString(),
							rules: [os.platform() === "linux" ? {
								min: 1,
								error: "Linux系统下渲染等待时间不能为0"
							} : { min: 0 }]
						}),
						components.switch.create("EmojiReply", {
							label: "表情回应",
							description: "在解析任务开始时添加表情回应，若适配器不支持需要关闭",
							defaultSelected: all.app.EmojiReply
						}),
						components.input.number("EmojiReplyID", {
							label: "表情 ID",
							isDisabled: !all.app.EmojiReply,
							description: "详情查看：https://github.com/NapNeko/NapCatQQ/blob/main/src/core/external/face_config.json 的 QCid 字段",
							defaultValue: all.app.EmojiReplyID.toString(),
							rules: [{
								min: 0,
								max: 1145141919810
							}]
						}),
						components.switch.create("webAuth", {
							label: "插件 web 鉴权",
							description: "开启后，访问插件自带的 web 页面需要拥有 Karin 的 HTTP 鉴权密钥才能访问。修改后重启生效",
							defaultSelected: all.app.webAuth
						}),
						components.checkbox.group("errorLogSendTo", {
							label: "错误日志",
							description: "遇到错误时谁会收到错误日志。注：推送任务只可发送给主人。",
							orientation: "horizontal",
							defaultValue: all.app.errorLogSendTo,
							checkbox: [components.checkbox.create("errorLogSendTo:checkbox:1", {
								label: "除'console'外的第一个主人",
								value: "master"
							}), components.checkbox.create("errorLogSendTo:checkbox:2", {
								label: "触发者（不支持私聊）",
								value: "trigger"
							})]
						}),
						components.switch.create("multiPageRender", {
							label: "分页渲染",
							description: "将模板渲染成多页的图片，以降低渲染器压力，默认开启，非必要不修改！",
							defaultSelected: all.app.multiPageRender
						}),
						components.input.number("multiPageHeight", {
							label: "分页渲染时，每页的高度",
							description: "经测试最佳每页高度为12000px，默认12000px",
							defaultValue: all.app.multiPageHeight.toString(),
							isDisabled: !all.app.multiPageRender,
							rules: [{
								min: 1e3,
								max: 2e4,
								error: "请输入一个范围在 1000 到 20000 之间的数字"
							}]
						})
					]
				})]
			}),
			components.accordion.create("douyin", {
				label: "抖音相关",
				children: [components.accordion.createItem("cfg:douyin", {
					title: "抖音相关",
					className: "ml-4 mr-4",
					subtitle: "此处为抖音相关的用户偏好设置",
					children: [
						components.switch.create("switch", {
							label: "解析开关",
							description: "抖音解析开关，此开关为单独开关",
							defaultSelected: all.douyin.switch
						}),
						components.switch.create("tip", {
							label: "解析提示",
							description: "抖音解析提示，发送提示信息：“检测到抖音链接，开始解析”",
							defaultSelected: all.douyin.tip,
							isDisabled: !all.douyin.switch
						}),
						components.checkbox.group("sendContent", {
							label: "解析时发送的内容",
							description: "若什么都不选，可能不会返回任何解析结果",
							orientation: "horizontal",
							defaultValue: all.douyin.sendContent,
							isDisabled: !all.douyin.switch,
							checkbox: [
								components.checkbox.create("sendContent:checkbox:1", {
									label: "视频信息",
									value: "info",
									description: "仅解析视频时有效"
								}),
								components.checkbox.create("sendContent:checkbox:2", {
									label: "评论列表",
									value: "comment"
								}),
								components.checkbox.create("sendContent:checkbox:3", {
									label: "视频文件",
									value: "video",
									description: "仅对视频作品有效"
								})
							]
						}),
						components.input.number("numcomment", {
							label: "评论解析数量",
							defaultValue: all.douyin.numcomment.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.douyin.sendContent.includes("comment") || !all.douyin.switch
						}),
						components.switch.create("realCommentCount", {
							label: "显示真实评论数量",
							description: "评论图是否显示真实评论数量，关闭则显示解析到的评论数量",
							defaultSelected: all.douyin.realCommentCount,
							isDisabled: !all.douyin.sendContent.includes("comment") || !all.douyin.switch
						}),
						components.radio.group("videoQuality", {
							label: "画质偏好",
							description: "解析视频的分辨率偏好。",
							orientation: "horizontal",
							defaultValue: all.douyin.videoQuality.toString(),
							isDisabled: !all.douyin.switch,
							radio: [
								components.radio.create("videoQuality:radio-1", {
									label: "自动选择",
									value: "adapt",
									description: "根据「视频体积上限（MB）」自动选择分辨率进行下载"
								}),
								components.radio.create("videoQuality:radio-2", {
									label: "标清 540p",
									value: "540p"
								}),
								components.radio.create("videoQuality:radio-3", {
									label: "高清 720p",
									value: "720p"
								}),
								components.radio.create("videoQuality:radio-4", {
									label: "高清 1080p",
									value: "1080p"
								}),
								components.radio.create("videoQuality:radio-5", {
									label: "超清 2k",
									value: "2k"
								}),
								components.radio.create("videoQuality:radio-6", {
									label: "超清 4k",
									value: "4k"
								})
							]
						}),
						components.input.number("maxAutoVideoSize", {
							label: "视频体积上限（MB）",
							description: "根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
							defaultValue: all.douyin.maxAutoVideoSize.toString(),
							isDisabled: all.douyin.videoQuality !== "adapt" || !all.douyin.switch,
							rules: [{
								min: 1,
								max: 2e4
							}]
						}),
						components.radio.group("loginPerm", {
							label: "谁可以触发扫码登录",
							description: "修改后需重启",
							orientation: "horizontal",
							defaultValue: all.douyin.loginPerm,
							radio: [
								components.radio.create("permission:radio-1", {
									label: "所有人",
									value: "all"
								}),
								components.radio.create("permission:radio-2", {
									label: "管理员",
									value: "admin"
								}),
								components.radio.create("permission:radio-3", {
									label: "主人",
									value: "master"
								}),
								components.radio.create("permission:radio-4", {
									label: "群主",
									value: "group.owner"
								}),
								components.radio.create("permission:radio-5", {
									label: "群管理员",
									value: "group.admin"
								})
							]
						}),
						components.radio.group("videoInfoMode", {
							label: "视频信息返回形式",
							defaultValue: all.douyin.videoInfoMode,
							isDisabled: !all.douyin.switch,
							radio: [components.radio.create("videoInfoMode:radio-2", {
								label: "图片模式",
								value: "image"
							}), components.radio.create("videoInfoMode:radio-1", {
								label: "文本模式",
								value: "text"
							})]
						}),
						components.checkbox.group("displayContent", {
							label: "视频信息的内容",
							description: "若什么都不选，则不会返回任何视频相关信息",
							orientation: "horizontal",
							defaultValue: all.douyin.displayContent,
							isDisabled: !all.douyin.switch || all.douyin.switch && all.douyin.videoInfoMode === "image",
							checkbox: [
								components.checkbox.create("displayContent:checkbox:1", {
									label: "封面",
									value: "cover"
								}),
								components.checkbox.create("displayContent:checkbox:2", {
									label: "标题",
									value: "title"
								}),
								components.checkbox.create("displayContent:checkbox:3", {
									label: "作者",
									value: "author"
								}),
								components.checkbox.create("displayContent:checkbox:4", {
									label: "视频统计信息",
									value: "stats"
								})
							]
						}),
						components.divider.create("divider-dy-1", {
							description: "抖音推送相关",
							descPosition: 20
						}),
						components.switch.create("push:switch", {
							label: "推送开关",
							description: "推送开关，修改后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表",
							defaultSelected: all.douyin.push.switch,
							color: "warning"
						}),
						components.radio.group("push:permission", {
							label: "谁可以设置推送",
							description: "修改后需重启",
							orientation: "horizontal",
							defaultValue: all.douyin.push.permission,
							isDisabled: !all.douyin.push.switch,
							color: "warning",
							radio: [
								components.radio.create("push:permission:radio-1", {
									label: "所有人",
									value: "all"
								}),
								components.radio.create("push:permission:radio-2", {
									label: "管理员",
									value: "admin"
								}),
								components.radio.create("push:permission:radio-3", {
									label: "主人",
									value: "master"
								}),
								components.radio.create("push:permission:radio-4", {
									label: "群主",
									value: "group.owner"
								}),
								components.radio.create("push:permission:radio-5", {
									label: "群管理员",
									value: "group.admin"
								})
							]
						}),
						components.input.string("push:cron", {
							label: "定时任务表达式",
							description: "定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）",
							defaultValue: all.douyin.push.cron,
							color: "warning",
							isDisabled: !all.douyin.push.switch
						}),
						components.switch.create("push:parsedynamic", {
							label: "作品解析",
							description: "触发推送时是否一同解析该作品",
							defaultSelected: all.douyin.push.parsedynamic,
							color: "warning",
							isDisabled: !all.douyin.push.switch
						}),
						components.switch.create("push:log", {
							label: "推送日志",
							description: "是否打印推送日志（修改后需重启）",
							defaultSelected: all.douyin.push.log,
							color: "warning",
							isDisabled: !all.douyin.push.switch
						}),
						components.radio.group("push:shareType", {
							label: "推送图二维码的类型",
							orientation: "horizontal",
							defaultValue: all.douyin.push.shareType,
							color: "warning",
							isDisabled: !all.douyin.push.switch,
							radio: [components.radio.create("push:shareType.radio-1", {
								label: "网页链接",
								description: "识别后访问抖音官网对应的作品地址",
								value: "web"
							}), components.radio.create("push:shareType.radio-2", {
								description: "识别后访问无水印作品下载地址",
								label: "下载链接",
								value: "download"
							})]
						}),
						components.radio.group("videoQuality", {
							label: "画质偏好",
							description: "推送解析时解析视频的分辨率偏好。",
							orientation: "horizontal",
							defaultValue: all.douyin.push.videoQuality.toString(),
							isDisabled: !all.douyin.push.switch,
							color: "warning",
							radio: [
								components.radio.create("videoQuality:radio-1", {
									label: "自动选择",
									value: "adapt",
									description: "根据「视频体积上限（MB）」自动选择分辨率进行下载"
								}),
								components.radio.create("videoQuality:radio-2", {
									label: "标清 540p",
									value: "540p"
								}),
								components.radio.create("videoQuality:radio-3", {
									label: "高清 720p",
									value: "720p"
								}),
								components.radio.create("videoQuality:radio-4", {
									label: "高清 1080p",
									value: "1080p"
								}),
								components.radio.create("videoQuality:radio-5", {
									label: "超清 2k",
									value: "2k"
								}),
								components.radio.create("videoQuality:radio-6", {
									label: "超清 4k",
									value: "4k"
								})
							]
						}),
						components.input.number("maxAutoVideoSize", {
							label: "视频体积上限（MB）",
							color: "warning",
							description: "推送解析时根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
							defaultValue: all.douyin.push.maxAutoVideoSize.toString(),
							isDisabled: all.douyin.push.videoQuality !== "adapt" || !all.douyin.push.switch,
							rules: [{
								min: 1,
								max: 2e4
							}]
						})
					]
				})]
			}),
			components.accordion.create("bilibili", {
				label: "B站相关",
				children: [components.accordion.createItem("cfg:bilibili", {
					title: "B站相关",
					className: "ml-4 mr-4",
					subtitle: "此处为B站相关的用户偏好设置",
					children: [
						components.switch.create("switch", {
							label: "解析开关",
							description: "B站解析开关，此开关为单独开关",
							defaultSelected: all.bilibili.switch
						}),
						components.switch.create("tip", {
							label: "解析提示",
							description: "B站解析提示，发送提示信息：“检测到B站链接，开始解析”",
							defaultSelected: all.bilibili.tip,
							isDisabled: !all.bilibili.switch
						}),
						components.checkbox.group("sendContent", {
							label: "解析时发送的内容",
							description: "若什么都不选，可能不会返回任何解析结果",
							orientation: "horizontal",
							defaultValue: all.bilibili.sendContent,
							isDisabled: !all.bilibili.switch,
							checkbox: [
								components.checkbox.create("sendContent:checkbox:1", {
									label: "视频信息",
									value: "info",
									description: "仅解析视频时有效"
								}),
								components.checkbox.create("sendContent:checkbox:2", {
									label: "评论列表",
									value: "comment"
								}),
								components.checkbox.create("sendContent:checkbox:3", {
									label: "视频文件",
									value: "video",
									description: "仅对视频稿件有效"
								})
							]
						}),
						components.input.number("numcomment", {
							label: "评论解析数量",
							defaultValue: all.bilibili.numcomment.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.bilibili.sendContent.some((content) => content === "comment") || !all.bilibili.switch
						}),
						components.switch.create("realCommentCount", {
							label: "显示真实评论数量",
							description: "评论图是否显示真实评论数量，关闭则显示解析到的评论数量",
							defaultSelected: all.bilibili.realCommentCount,
							isDisabled: !all.bilibili.sendContent.some((content) => content === "comment") || !all.bilibili.switch
						}),
						components.radio.group("videoQuality", {
							label: "画质偏好",
							description: "解析视频的分辨率偏好。",
							orientation: "horizontal",
							defaultValue: all.bilibili.videoQuality.toString(),
							isDisabled: !all.bilibili.switch,
							radio: [
								components.radio.create("videoQuality:radio-1", {
									label: "自动选择",
									value: "0"
								}),
								components.radio.create("videoQuality:radio-2", {
									label: "240P 极速",
									value: "6"
								}),
								components.radio.create("videoQuality:radio-3", {
									label: "360P 流畅",
									value: "16"
								}),
								components.radio.create("videoQuality:radio-4", {
									label: "480P 清晰",
									value: "32",
									description: "需登录（配置ck）"
								}),
								components.radio.create("videoQuality:radio-5", {
									label: "720P 高清",
									value: "64",
									description: "需登录（配置ck）"
								}),
								components.radio.create("videoQuality:radio-6", {
									label: "720P60 高帧率",
									value: "74",
									description: "需登录（配置ck）"
								}),
								components.radio.create("videoQuality:radio-7", {
									label: "1080P 高清",
									value: "80",
									description: "需登录（配置ck）"
								}),
								components.radio.create("videoQuality:radio-8", {
									label: "1080P+ 高码率",
									value: "112",
									description: "需大会员&视频支持"
								}),
								components.radio.create("videoQuality:radio-9", {
									label: "1080P60 高帧率",
									value: "116",
									description: "需大会员&视频支持"
								}),
								components.radio.create("videoQuality:radio-10", {
									label: "4K 超清",
									value: "120",
									description: "需大会员&视频支持"
								}),
								components.radio.create("videoQuality:radio-11", {
									label: "8K 超高清",
									value: "127",
									description: "需大会员&视频支持"
								})
							]
						}),
						components.input.number("maxAutoVideoSize", {
							label: "视频体积上限（MB）",
							description: "根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
							defaultValue: all.bilibili.maxAutoVideoSize.toString(),
							isDisabled: all.bilibili.videoQuality !== 0 || !all.bilibili.switch,
							rules: [{
								min: 1,
								max: 2e4
							}]
						}),
						components.radio.group("loginPerm", {
							label: "谁可以触发扫码登录",
							description: "修改后需重启",
							orientation: "horizontal",
							defaultValue: all.bilibili.loginPerm,
							radio: [
								components.radio.create("permission:radio-1", {
									label: "所有人",
									value: "all"
								}),
								components.radio.create("permission:radio-2", {
									label: "管理员",
									value: "admin"
								}),
								components.radio.create("permission:radio-3", {
									label: "主人",
									value: "master"
								}),
								components.radio.create("permission:radio-4", {
									label: "群主",
									value: "group.owner"
								}),
								components.radio.create("permission:radio-5", {
									label: "群管理员",
									value: "group.admin"
								})
							]
						}),
						components.radio.group("imageLayout", {
							label: "解析图文动态时，遇到多张图片时的页面布局方式（动态推送图片也生效）",
							description: "自动布局：少于4张时逐张上下排列；4~8张时瀑布流；9张及以上九宫格",
							orientation: "horizontal",
							defaultValue: all.bilibili.imageLayout,
							radio: [
								components.radio.create("imageLayout:radio-4", {
									label: "自动布局",
									value: "auto"
								}),
								components.radio.create("imageLayout:radio-1", {
									label: "逐张上下排列",
									value: "vertical"
								}),
								components.radio.create("imageLayout:radio-2", {
									label: "瀑布流排列",
									value: "waterfall"
								}),
								components.radio.create("imageLayout:radio-3", {
									label: "九宫格排列",
									value: "grid"
								})
							]
						}),
						components.radio.group("videoInfoMode", {
							label: "视频信息返回形式",
							defaultValue: all.bilibili.videoInfoMode,
							isDisabled: !all.bilibili.switch,
							radio: [components.radio.create("videoInfoMode:radio-2", {
								label: "图片模式",
								value: "image"
							}), components.radio.create("videoInfoMode:radio-1", {
								label: "文本模式",
								value: "text"
							})]
						}),
						components.checkbox.group("displayContent", {
							label: "视频信息前返回的内容",
							description: "若什么都不选，则不会返回任何视频相关信息",
							orientation: "horizontal",
							defaultValue: all.bilibili.displayContent,
							isDisabled: !all.bilibili.switch || all.bilibili.switch && all.bilibili.videoInfoMode === "image",
							checkbox: [
								components.checkbox.create("displayContent:checkbox:1", {
									label: "封面",
									value: "cover"
								}),
								components.checkbox.create("displayContent:checkbox:2", {
									label: "标题",
									value: "title"
								}),
								components.checkbox.create("displayContent:checkbox:3", {
									label: "作者",
									value: "author"
								}),
								components.checkbox.create("displayContent:checkbox:4", {
									label: "视频统计信息",
									value: "stats"
								}),
								components.checkbox.create("displayContent:checkbox:5", {
									label: "简介",
									value: "desc"
								})
							]
						}),
						components.divider.create("divider-bilibili-1", {
							description: "B站推送相关",
							descPosition: 20
						}),
						components.switch.create("push:switch", {
							label: "推送开关",
							description: "推送开关，修改后需重启；使用「#设置B站推送 + UID」配置推送列表",
							defaultSelected: all.bilibili.push.switch,
							color: "warning"
						}),
						components.radio.group("push:permission", {
							label: "谁可以设置推送",
							description: "修改后需重启",
							orientation: "horizontal",
							defaultValue: all.bilibili.push.permission,
							color: "warning",
							isDisabled: !all.bilibili.push.switch,
							radio: [
								components.radio.create("push:permission:radio-1", {
									label: "所有人",
									value: "all"
								}),
								components.radio.create("push:permission:radio-2", {
									label: "管理员",
									value: "admin"
								}),
								components.radio.create("push:permission:radio-3", {
									label: "主人",
									value: "master"
								}),
								components.radio.create("push:permission:radio-4", {
									label: "群主",
									value: "group.owner"
								}),
								components.radio.create("push:permission:radio-5", {
									label: "群管理员",
									value: "group.admin"
								})
							]
						}),
						components.input.string("push:cron", {
							label: "定时任务表达式",
							description: "定时推送的时间，格式为cron表达式（默认为每十分钟执行一次）",
							defaultValue: all.bilibili.push.cron,
							color: "warning",
							isDisabled: !all.bilibili.push.switch
						}),
						components.switch.create("push:parsedynamic", {
							label: "作品解析",
							description: "触发推送时是否一同解析该作品",
							defaultSelected: all.bilibili.push.parsedynamic,
							color: "warning",
							isDisabled: !all.bilibili.push.switch
						}),
						components.switch.create("push:log", {
							label: "推送日志",
							description: "是否打印推送日志（修改后需重启）",
							defaultSelected: all.bilibili.push.log,
							color: "warning",
							isDisabled: !all.bilibili.push.switch
						}),
						components.radio.group("push:pushVideoQuality", {
							label: "解析视频动态时的画质偏好",
							description: "「作品解析」开启时生效，仅对视频动态有效",
							orientation: "horizontal",
							isDisabled: !all.bilibili.push.parsedynamic || !all.bilibili.push.switch,
							defaultValue: all.bilibili.push.pushVideoQuality.toString(),
							color: "warning",
							radio: [
								components.radio.create("push:pushVideoQuality:radio-1", {
									label: "自动选择",
									value: "0"
								}),
								components.radio.create("push:pushVideoQuality:radio-2", {
									label: "240P 极速",
									value: "6"
								}),
								components.radio.create("push:pushVideoQuality:radio-3", {
									label: "360P 流畅",
									value: "16"
								}),
								components.radio.create("push:pushVideoQuality:radio-4", {
									label: "480P 清晰",
									value: "32",
									description: "需登录（配置ck）"
								}),
								components.radio.create("push:pushVideoQuality:radio-5", {
									label: "720P 高清",
									value: "64",
									description: "需登录（配置ck）"
								}),
								components.radio.create("push:pushVideoQuality:radio-6", {
									label: "720P60 高帧率",
									value: "74",
									description: "需登录（配置ck）"
								}),
								components.radio.create("push:pushVideoQuality:radio-7", {
									label: "1080P 高清",
									value: "80",
									description: "需登录（配置ck）"
								}),
								components.radio.create("push:pushVideoQuality:radio-8", {
									label: "1080P+ 高码率",
									value: "112",
									description: "需大会员&视频支持"
								}),
								components.radio.create("push:pushVideoQuality:radio-9", {
									label: "1080P60 高帧率",
									value: "116",
									description: "需大会员&视频支持"
								}),
								components.radio.create("push:pushVideoQuality:radio-10", {
									label: "4K 超清",
									value: "120",
									description: "需大会员&视频支持"
								}),
								components.radio.create("push:pushVideoQuality:radio-11", {
									label: "8K 超高清",
									value: "127",
									description: "需大会员&视频支持"
								})
							]
						}),
						components.input.number("push:pushMaxAutoVideoSize", {
							label: "视频动态的视频体积上限（MB）",
							description: "根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 \"自动选择\" 且「作品解析」开启时生效，仅对视频动态有效",
							defaultValue: all.bilibili.push.pushMaxAutoVideoSize.toString(),
							isDisabled: !all.bilibili.push.parsedynamic || all.bilibili.push.pushVideoQuality !== 0 || !all.bilibili.push.switch,
							rules: [{
								min: 1,
								max: 2e4
							}],
							color: "warning"
						})
					]
				})]
			}),
			components.accordion.create("kuaishou", {
				label: "快手相关",
				children: [components.accordion.createItem("cfg:kuaishou", {
					title: "快手相关",
					className: "ml-4 mr-4",
					subtitle: "此处为快手相关的用户偏好设置",
					children: [
						components.switch.create("switch", {
							label: "解析开关",
							description: "快手解析开关，此开关为单独开关",
							defaultSelected: all.kuaishou.switch
						}),
						components.switch.create("tip", {
							label: "解析提示",
							description: "快手解析提示，发送提示信息：“检测到快手链接，开始解析”",
							defaultSelected: all.kuaishou.tip,
							isDisabled: !all.kuaishou.switch
						}),
						components.switch.create("comment", {
							label: "评论解析",
							description: "快手评论解析，开启后可发送快手作品评论图",
							defaultSelected: all.kuaishou.comment,
							isDisabled: !all.kuaishou.switch
						}),
						components.input.number("numcomment", {
							label: "评论解析数量",
							defaultValue: all.kuaishou.numcomment.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.kuaishou.switch || !all.kuaishou.comment
						})
					]
				})]
			}),
			components.accordion.create("xiaohongshu", {
				label: "小红书相关",
				children: [components.accordion.createItem("cfg:xiaohongshu", {
					title: "小红书相关",
					className: "ml-4 mr-4",
					subtitle: "此处为小红书相关的用户偏好设置",
					children: [
						components.switch.create("switch", {
							label: "解析开关",
							description: "小红书解析开关，此开关为单独开关",
							defaultSelected: all.xiaohongshu.switch
						}),
						components.switch.create("tip", {
							label: "解析提示",
							description: "小红书解析提示，发送提示信息：“检测到小红书链接，开始解析”",
							defaultSelected: all.xiaohongshu.tip,
							isDisabled: !all.xiaohongshu.switch
						}),
						components.checkbox.group("sendContent", {
							label: "解析时发送的内容",
							description: "若什么都不选，可能不会返回任何解析结果",
							orientation: "horizontal",
							defaultValue: all.xiaohongshu.sendContent,
							isDisabled: !all.xiaohongshu.switch,
							checkbox: [
								components.checkbox.create("sendContent:checkbox:1", {
									label: "笔记信息",
									value: "info"
								}),
								components.checkbox.create("sendContent:checkbox:2", {
									label: "评论列表",
									value: "comment"
								}),
								components.checkbox.create("sendContent:checkbox:3", {
									label: "笔记图片",
									value: "image"
								}),
								components.checkbox.create("sendContent:checkbox:4", {
									label: "视频文件",
									value: "video",
									description: "仅对视频笔记有效"
								})
							]
						}),
						components.input.number("numcomment", {
							label: "评论解析数量",
							defaultValue: all.xiaohongshu.numcomment.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.xiaohongshu.sendContent.some((content) => content === "comment") || !all.xiaohongshu.switch
						}),
						components.radio.group("videoQuality", {
							label: "画质偏好",
							description: "解析视频的分辨率偏好。",
							orientation: "horizontal",
							defaultValue: all.xiaohongshu.videoQuality.toString(),
							isDisabled: !all.xiaohongshu.switch,
							radio: [
								components.radio.create("videoQuality:radio-1", {
									label: "自动选择",
									value: "adapt",
									description: "根据「视频体积上限（MB）」自动选择分辨率进行下载"
								}),
								components.radio.create("videoQuality:radio-2", {
									label: "标清 540p",
									value: "540p"
								}),
								components.radio.create("videoQuality:radio-3", {
									label: "高清 720p",
									value: "720p"
								}),
								components.radio.create("videoQuality:radio-4", {
									label: "高清 1080p",
									value: "1080p"
								}),
								components.radio.create("videoQuality:radio-5", {
									label: "超清 2k",
									value: "2k"
								}),
								components.radio.create("videoQuality:radio-6", {
									label: "超清 4k",
									value: "4k"
								})
							]
						}),
						components.input.number("maxAutoVideoSize", {
							label: "视频体积上限（MB）",
							description: "根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 \"自动选择\" 时生效",
							defaultValue: all.xiaohongshu.maxAutoVideoSize.toString(),
							isDisabled: all.xiaohongshu.videoQuality !== "adapt" || !all.xiaohongshu.switch,
							rules: [{
								min: 1,
								max: 2e4
							}]
						})
					]
				})]
			}),
			components.accordion.create("upload", {
				label: "视频文件上传相关",
				children: [components.accordion.createItem("cfg:upload", {
					title: "上传相关",
					className: "ml-4 mr-4",
					subtitle: "此处为上传相关的用户偏好设置",
					children: [
						components.switch.create("sendbase64", {
							label: "转换Base64",
							description: "发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启。与「群文件上传」互斥。",
							defaultSelected: all.upload.sendbase64,
							isDisabled: all.upload.usegroupfile
						}),
						components.switch.create("usefilelimit", {
							label: "视频上传拦截",
							description: "开启后会根据视频文件大小判断是否需要上传，需配置「视频拦截阈值」。",
							defaultSelected: all.upload.usefilelimit
						}),
						components.input.number("filelimit", {
							label: "视频拦截阈值",
							description: "视频文件大于该数值则直接结束任务，不会上传，单位: MB，「视频上传拦截」开启后才会生效。",
							defaultValue: all.upload.filelimit.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.upload.usefilelimit
						}),
						components.switch.create("compress", {
							label: "压缩视频",
							description: "开启后会将视频文件压缩后再上传，适合上传大文件，任务过程中会吃满CPU，对低配服务器不友好。需配置「压缩触发阈值」与「压缩后的值」",
							defaultSelected: all.upload.compress
						}),
						components.input.number("compresstrigger", {
							label: "压缩触发阈值",
							description: "触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效",
							defaultValue: all.upload.compresstrigger.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.upload.compress
						}),
						components.input.number("compressvalue", {
							label: "压缩后的值",
							description: "单位：MB，若视频文件大小大于「压缩触发阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效",
							defaultValue: all.upload.compressvalue.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.upload.compress
						}),
						components.switch.create("usegroupfile", {
							label: "群文件上传",
							description: "使用群文件上传，开启后会将视频文件上传到群文件中，需配置「群文件上传阈值」。与「转换Base64」互斥",
							defaultSelected: all.upload.usegroupfile,
							isDisabled: all.upload.sendbase64
						}),
						components.input.number("groupfilevalue", {
							label: "群文件上传阈值",
							description: "当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效",
							defaultValue: all.upload.groupfilevalue.toString(),
							rules: [{ min: 1 }],
							isDisabled: !all.upload.usegroupfile || all.upload.sendbase64
						})
					]
				})]
			}),
			components.accordion.create("request", {
				label: "解析库请求配置相关",
				children: [components.accordion.createItem("cfg:request", {
					title: "解析库请求配置相关",
					className: "ml-4 mr-4",
					subtitle: "此处用于管理解析库的网络请求配置",
					children: [
						components.input.number("timeout", {
							label: "请求超时时间",
							description: "网络请求的超时时间，单位：毫秒",
							defaultValue: all.request.timeout.toString(),
							rules: [{
								min: 1e3,
								max: 3e5,
								error: "请输入一个范围在 1000 到 300000 之间的数字"
							}]
						}),
						components.input.string("User-Agent", {
							label: "User-Agent",
							type: "text",
							description: "请求头中的User-Agent字段，用于标识客户端类型",
							defaultValue: all.request["User-Agent"],
							placeholder: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
							rules: void 0,
							isRequired: false
						}),
						components.divider.create("divider-proxy", {
							description: "代理配置（可选）",
							descPosition: 20
						}),
						components.switch.create("proxy:switch", {
							label: "代理开关",
							description: "开启后需要配置「代理主机」「代理端口」",
							defaultSelected: all.request.proxy?.switch
						}),
						components.input.string("proxy:host", {
							label: "代理主机",
							type: "text",
							description: "代理服务器的主机地址，如：127.0.0.1",
							defaultValue: all.request.proxy?.host || "",
							placeholder: "127.0.0.1",
							rules: void 0,
							isDisabled: !all.request.proxy?.switch
						}),
						components.input.number("proxy:port", {
							label: "代理端口",
							description: "代理服务器的端口号",
							defaultValue: all.request.proxy?.port?.toString() || "",
							rules: [{
								min: 1,
								max: 65535,
								error: "请输入一个范围在 1 到 65535 之间的数字"
							}],
							isDisabled: !all.request.proxy?.switch
						}),
						components.radio.group("proxy:protocol", {
							label: "代理协议",
							orientation: "horizontal",
							defaultValue: all.request.proxy?.protocol || "http",
							radio: [components.radio.create("proxy-protocol-1", {
								label: "HTTP",
								value: "http"
							}), components.radio.create("proxy-protocol-2", {
								label: "HTTPS",
								value: "https"
							})],
							isDisabled: !all.request.proxy?.switch
						}),
						components.input.string("proxy:auth:username", {
							label: "代理用户名",
							type: "text",
							description: "代理服务器的认证用户名（如果需要）",
							defaultValue: all.request.proxy?.auth?.username || "",
							placeholder: "",
							rules: void 0,
							isRequired: false,
							isDisabled: !all.request.proxy?.switch
						}),
						components.input.string("proxy:auth:password", {
							label: "代理密码",
							type: "password",
							description: "代理服务器的认证密码（如果需要）",
							defaultValue: all.request.proxy?.auth?.password || "",
							placeholder: "",
							rules: void 0,
							isRequired: false,
							isDisabled: !all.request.proxy?.switch
						})
					]
				})]
			}),
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
		for (const key of Object.keys(mergeCfg)) {
			const configValue = mergeCfg[key];
			if (configValue && typeof configValue === "object" && Object.keys(configValue).length > 0) {
				isChange = deepEqual(configValue, oldAllCfg[key]);
				if (isChange) {
					if (await Config.ModifyPro(key, configValue)) success = true;
				}
			}
		}
		await Config.syncConfigToDatabase();
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
var processFrontendData = (data) => {
	const result = {};
	const configKeys = Object.keys(data).filter((key) => !key.includes("pushlist") && key in data);
	for (const key of configKeys) {
		const value = data[key];
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
		douyin: data["pushlist:douyin"] || [],
		bilibili: (data["pushlist:bilibili"] || []).map((item) => ({
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
await init_esm();
var import_heic_convert = __toESM(require_heic_convert());
await init_utils();
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
	let processedText = text;
	for (const secUid of userIds) {
		const UserInfoData = await getDouyinData("用户主页数据", Config.cookies.douyin, {
			sec_uid: secUid,
			typeMode: "strict"
		});
		if (UserInfoData.data.user.sec_uid === secUid) {
			const regex = new RegExp(`@${UserInfoData.data.user.nickname?.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`, "g");
			processedText = processedText.replace(regex, (match) => `<span class="${Common.useDarkTheme() ? "dark-mode handling_at" : "handling_at"}">${match}</span>`);
		}
	}
	return processedText;
};
var processCommentImage = async (imageUrl) => {
	if (!imageUrl) return null;
	const headers = await new Networks({
		url: imageUrl,
		type: "arraybuffer"
	}).getHeaders();
	if (headers["content-type"] && headers["content-type"] === "image/heic") {
		const jpegBuffer = await (0, import_heic_convert.default)({
			buffer: (await new Networks({
				url: imageUrl,
				type: "arraybuffer"
			}).returnResult()).data,
			format: "JPEG"
		});
		return `data:image/jpeg;base64,${Buffer.from(jpegBuffer).toString("base64")}`;
	}
	return imageUrl;
};
async function douyinComments(data, emojidata) {
	let jsonArray = [];
	if (data.data.comments === null) return [];
	let id = 1;
	for (const comment of data.data.comments) {
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
		const userintextlongid = comment.text_extra && comment.text_extra[0] && comment.text_extra[0].sec_uid ? comment.text_extra[0].sec_uid && comment.text_extra.map((extra) => extra.sec_uid) : null;
		const search_text = comment.text_extra && comment.text_extra[0] && comment.text_extra[0].search_text ? comment.text_extra[0].search_text && comment.text_extra.map((extra) => ({
			search_text: extra.search_text,
			search_query_id: extra.search_query_id
		})) : null;
		const relativeTime = getRelativeTimeFromTimestamp$2(time);
		const reply_comment_total = comment.reply_comment_total;
		text = processTextFormatting(text);
		text = await processAtUsers$1(text, userintextlongid);
		text = processCommentEmojis$1(text, emojidata);
		const processedImageUrl = await processCommentImage(imageurl);
		if (digg_count > 1e4) digg_count = (digg_count / 1e4).toFixed(1) + "w";
		const replyComment = await getDouyinData("指定评论回复数据", {
			aweme_id,
			comment_id: cid,
			typeMode: "strict",
			number: 2
		}, Config.cookies.douyin);
		const commentObj = {
			id: id++,
			replyComment: replyComment.data.comments.length > 0 ? {
				create_time: getRelativeTimeFromTimestamp$2(replyComment.data.comments[0].create_time),
				nickname: replyComment.data.comments[0].user.nickname,
				userimageurl: replyComment.data.comments[0].user.avatar_thumb.url_list[0],
				text: processCommentEmojis$1(replyComment.data.comments[0].text, emojidata),
				digg_count: replyComment.data.comments[0].digg_count > 1e4 ? (replyComment.data.comments[0].digg_count / 1e4).toFixed(1) + "w" : replyComment.data.comments[0].digg_count,
				ip_label: replyComment.data.comments[0].ip_label,
				text_extra: replyComment.data.comments[0].text_extra,
				label_text: replyComment.data.comments[0].label_text
			} : {},
			cid,
			aweme_id,
			nickname,
			userimageurl,
			text,
			digg_count,
			ip_label: ip,
			create_time: relativeTime,
			commentimage: processedImageUrl,
			label_type,
			sticker,
			status_label,
			is_At_user_id: userintextlongid,
			search_text,
			reply_comment_total
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
	return { jsonArray };
}
function getRelativeTimeFromTimestamp$2(timestamp) {
	const differenceInSeconds = Math.floor(Date.now() / 1e3) - timestamp;
	if (differenceInSeconds < 30) return "刚刚";
	else if (differenceInSeconds < 60) return differenceInSeconds + "秒前";
	else if (differenceInSeconds < 3600) return Math.floor(differenceInSeconds / 60) + "分钟前";
	else if (differenceInSeconds < 86400) return Math.floor(differenceInSeconds / 3600) + "小时前";
	else if (differenceInSeconds < 2592e3) return Math.floor(differenceInSeconds / 86400) + "天前";
	else if (differenceInSeconds < 7776e3) return Math.floor(differenceInSeconds / 2592e3) + "个月前";
	else {
		const date = /* @__PURE__ */ new Date(timestamp * 1e3);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return year + "-" + month + "-" + day;
	}
}
await init_utils();
await init_Config();
var mp4size = "";
var img;
var DouYin = class extends Base {
	e;
	type;
	is_mp4;
	is_slides;
	get botadapter() {
		return this.e.bot?.adapter?.name;
	}
	constructor(e, iddata) {
		super(e);
		this.e = e;
		this.type = iddata?.type;
		this.is_mp4 = iddata?.is_mp4;
		this.is_slides = false;
	}
	async RESOURCES(data) {
		Config.app.EmojiReply && !this.e.isPrivate && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true);
		if (Config.douyin.tip) this.e.reply("检测到抖音链接，开始解析");
		switch (this.type) {
			case "one_work": {
				const VideoData = await this.amagi.getDouyinData("聚合解析", {
					aweme_id: data.aweme_id,
					typeMode: "strict"
				});
				const CommentsData = await this.amagi.getDouyinData("评论数据", {
					aweme_id: data.aweme_id,
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
						for (const [index, imageItem] of images.entries()) {
							image_url = imageItem.url_list[2] || imageItem.url_list[1];
							g_title = VideoData.data.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:*?"<>|\r\n]/g, " ");
							imageres.push(segment.image(image_url));
							imagenum++;
							if (Config.app.removeCache === false) {
								mkdirSync(`${Common.tempDri.images}${g_title}`);
								const path$1 = `${Common.tempDri.images}${g_title}/${index + 1}.png`;
								await new Networks({
									url: image_url,
									type: "arraybuffer"
								}).getData().then((data$1) => fs.promises.writeFile(path$1, Buffer.from(data$1)));
							}
						}
						const res = common.makeForward(imageres, this.e.sender.userId, this.e.sender.nick);
						image_data.push(res);
						image_res.push(image_data);
						if (imageres.length === 1) await this.e.reply(segment.image(image_url));
						else await this.e.bot.sendForwardMsg(this.e.contact, res, {
							source: "图片合集",
							summary: `查看${res.length}张图片消息`,
							prompt: "抖音图集解析结果",
							news: [{ text: "点击查看解析结果" }]
						});
						break;
					}
					case VideoData.data.aweme_detail.is_slides === true && VideoData.data.aweme_detail.images !== null: {
						const images = [];
						const temp = [];
						const liveimgbgm = await downloadFile(VideoData.data.aweme_detail.music.play_url.uri, {
							title: `Douyin_tmp_A_${Date.now()}.mp3`,
							headers: this.headers
						});
						temp.push(liveimgbgm);
						const images1 = VideoData.data.aweme_detail.images ?? [];
						if (!images1.length) logger.debug("未获取到合辑的图片数据");
						for (const item of images1) {
							imagenum++;
							if (item.clip_type === 2) {
								images.push(segment.image(item.url_list[0]));
								continue;
							}
							const liveimg = await downloadFile(`https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`, {
								title: `Douyin_tmp_V_${Date.now()}.mp4`,
								headers: this.headers
							});
							if (liveimg.filepath) {
								const resolvefilepath = Common.tempDri.video + `Douyin_Result_${Date.now()}.mp4`;
								await mergeFile("视频*3 + 音频", {
									path: liveimg.filepath,
									path2: liveimgbgm.filepath,
									resultPath: resolvefilepath,
									callback: async (success, resultPath) => {
										if (success) {
											const filePath = Common.tempDri.video + `tmp_${Date.now()}.mp4`;
											fs.renameSync(resultPath, filePath);
											logger.mark(`视频文件重命名完成: ${resultPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
											logger.mark("正在尝试删除缓存文件");
											await Common.removeFile(liveimg.filepath, true);
											temp.push({
												filepath: filePath,
												totalBytes: 0
											});
											images.push(segment.video("file://" + filePath));
											return true;
										} else {
											await Common.removeFile(liveimg.filepath, true);
											return true;
										}
									}
								});
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
					const music_url = VideoData.data.aweme_detail.music.play_url.uri;
					if (this.is_mp4 === false && Config.app.removeCache === false && music_url !== void 0) try {
						const path$1 = Common.tempDri.images + `${g_title}/BGM.mp3`;
						await new Networks({
							url: music_url,
							type: "arraybuffer"
						}).getData().then((data$1) => fs.promises.writeFile(path$1, Buffer.from(data$1)));
					} catch (error) {
						console.log(error);
					}
					music_url && this.is_mp4 === false && music_url !== void 0 && await this.e.reply(segment.record(music_url, false));
				}
				let FPS;
				if (this.is_mp4) {
					const video = VideoData.data.aweme_detail.video;
					FPS = video.bit_rate[0].FPS;
					logger.debug(`开始排除不符合条件的视频分辨率；\n\n              共拥有${logger.yellow(video.bit_rate.length)}个视频源\n\n              视频ID：${logger.green(VideoData.data.aweme_detail.aweme_id)}\n\n              分享链接：${logger.green(VideoData.data.aweme_detail.share_url)}\n              `);
					video.bit_rate = douyinProcessVideos(video.bit_rate, Config.douyin.videoQuality, Config.douyin.maxAutoVideoSize);
					g_video_url = await new Networks({
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
					const contentMap = {
						cover: segment.image(this.is_mp4 ? VideoData.data.aweme_detail.video.animated_cover?.url_list[0] ?? VideoData.data.aweme_detail.video.cover.url_list[0] : VideoData.data.aweme_detail.images[0].url_list[0]),
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
					const videoInfoImg = await Render("douyin/videoInfo", {
						desc: VideoData.data.aweme_detail.desc,
						statistics: VideoData.data.aweme_detail.statistics,
						aweme_id: VideoData.data.aweme_detail.aweme_id,
						author: {
							name: VideoData.data.aweme_detail.author.nickname,
							avatar: VideoData.data.aweme_detail.author.avatar_thumb.url_list[0],
							short_id: VideoData.data.aweme_detail.author.unique_id === "" ? VideoData.data.aweme_detail.author.short_id : VideoData.data.aweme_detail.author.unique_id
						},
						image_url: this.is_mp4 ? VideoData.data.aweme_detail.video.animated_cover?.url_list[0] ?? VideoData.data.aweme_detail.video.cover.url_list[0] : VideoData.data.aweme_detail.images[0].url_list[0],
						create_time: VideoData.data.aweme_detail.create_time
					});
					this.e.reply(videoInfoImg);
				}
				if (Config.douyin.sendContent.includes("comment")) {
					const commentsArray = await douyinComments(CommentsData, Emoji((await this.amagi.getDouyinData("Emoji数据", { typeMode: "strict" })).data));
					if (!commentsArray.jsonArray.length) await this.e.reply("这个作品没有评论 ~");
					else {
						const img$2 = await Render("douyin/comment", {
							Type: this.is_mp4 ? "视频" : this.is_slides ? "合辑" : "图集",
							CommentsData: commentsArray,
							CommentLength: Config.douyin.realCommentCount ? VideoData.data.aweme_detail.statistics.comment_count : commentsArray.jsonArray?.length ?? 0,
							share_url: this.is_mp4 ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0` : VideoData.data.aweme_detail.share_url,
							VideoSize: mp4size,
							VideoFPS: FPS,
							ImageLength: imagenum
						});
						await this.e.reply(img$2);
					}
				}
				this.is_mp4 && Config.douyin.sendContent.includes("video") && await downloadVideo(this.e, {
					video_url: g_video_url,
					title: {
						timestampTitle: `tmp_${Date.now()}.mp4`,
						originTitle: `${g_title}.mp4`
					},
					headers: {
						...baseHeaders,
						Referer: g_video_url
					}
				}, { message_id: this.e.messageId });
				return true;
			}
			case "user_dynamic": return true;
			case "music_work": {
				const MusicData = await this.amagi.getDouyinData("音乐数据", {
					music_id: data.music_id,
					typeMode: "strict"
				});
				const sec_uid = MusicData.data.music_info.sec_uid;
				const UserData = await this.amagi.getDouyinData("用户主页数据", {
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
				const UserInfoData = await this.amagi.getDouyinData("用户主页数据", {
					sec_uid: data.sec_uid,
					typeMode: "strict"
				});
				if (UserInfoData.data.user.live_status === 1) {
					const live_data = await this.amagi.getDouyinData("直播间信息数据", {
						sec_uid: UserInfoData.data.user.sec_uid,
						typeMode: "strict"
					});
					const room_data = JSON.parse(UserInfoData.data.user.room_data);
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
function douyinProcessVideos(videos, videoQuality, maxAutoVideoSize) {
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
}
function Time(delay) {
	const currentDate = /* @__PURE__ */ new Date();
	currentDate.setHours(currentDate.getHours() + delay);
	return `${currentDate.getFullYear().toString()}/${(currentDate.getMonth() + 1).toString()}/${String(currentDate.getDate()).padStart(2, "0")} ${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}`;
}
const Emoji = (data) => {
	const ListArray = [];
	for (const i of data.emoji_list) {
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
async function getDouyinID(event, url, log = true) {
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
		case /https:\/\/(?:www\.douyin\.com|www\.iesdouyin\.com)\/share\/user\/(\S+)/.test(longLink): {
			const userMatch = /user\/([a-zA-Z0-9_-]+)\b/.exec(longLink);
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
}
await init_module();
await init_Config();
var douyinBaseHeaders = {
	...baseHeaders,
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
		const data = await this.getDynamicList(Config.pushlist.douyin);
		if (Object.keys(data).length === 0) return true;
		if (this.force) return await this.forcepush(data);
		else return await this.getdata(data);
	}
	async syncConfigToDatabase() {
		if (!Config.pushlist.douyin || Config.pushlist.douyin.length === 0) return;
		await douyinDBInstance.syncConfigSubscriptions(Config.pushlist.douyin);
	}
	async getdata(data) {
		if (Object.keys(data).length === 0) return true;
		for (const awemeId in data) {
			logger.mark(`\n        ${logger.blue("开始处理并渲染抖音动态图片")}\n        ${logger.blue("博主")}: ${logger.green(data[awemeId].remark)} \n        ${logger.cyan("作品id")}：${logger.yellow(awemeId)}\n        ${logger.cyan("访问地址")}：${logger.green("https://www.douyin.com/video/" + awemeId)}`);
			const pushItem = data[awemeId];
			const Detail_Data = pushItem.Detail_Data;
			const skip = await skipDynamic(pushItem);
			skip && logger.warn(`作品 https://www.douyin.com/video/${awemeId} 已被处理，跳过`);
			let img$2 = [];
			let iddata = {
				is_mp4: true,
				type: "one_work"
			};
			if (!skip) iddata = await getDouyinID(this.e, Detail_Data.share_url ?? "https://live.douyin.com/" + Detail_Data.room_data?.owner.web_rid, false);
			if (!skip) if (pushItem.living && "room_data" in pushItem.Detail_Data && Detail_Data.live_data) img$2 = await Render("douyin/live", {
				image_url: Detail_Data.live_data.data.data.data[0]?.cover.url_list[0] ?? Detail_Data.live_data.data.data.qrcode_url,
				text: Detail_Data.live_data.data.data.data[0]?.title ?? "",
				liveinf: `${Detail_Data.live_data.data.data.partition_road_map?.partition?.title ?? Detail_Data.live_data.data.data.data[0]?.title ?? "获取失败"} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
				"在线观众": Detail_Data.live_data.data.data.data.length > 0 ? this.count(Detail_Data.live_data.data.data.data[0].room_view_stats.display_value) : "：语音直播不支持",
				"总观看次数": Detail_Data.live_data.data.data.data.length > 0 ? this.count(Number(Detail_Data.live_data.data.data.data[0].stats.total_user_str)) : "：语音直播不支持",
				username: Detail_Data.user_info.data.user.nickname,
				avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.data.user.avatar_larger.uri,
				fans: this.count(Detail_Data.user_info.data.user.follower_count),
				share_url: "https://live.douyin.com/" + Detail_Data.room_data.owner.web_rid,
				dynamicTYPE: "直播动态推送"
			});
			else {
				const realUrl = Config.douyin.push.shareType === "web" && await new Networks({
					url: Detail_Data.share_url,
					headers: {
						"User-Agent": "Apifox/1.0.0 (https://apifox.com)",
						Accept: "*/*",
						"Accept-Encoding": "gzip, deflate, br",
						Connection: "keep-alive"
					}
				}).getLocation();
				img$2 = await Render("douyin/dynamic", {
					image_url: iddata.is_mp4 ? Detail_Data.video.animated_cover?.url_list[0] ?? Detail_Data.video.cover.url_list[0] : Detail_Data.images[0].url_list[0],
					desc: this.desc(Detail_Data, Detail_Data.desc),
					dianzan: this.count(Detail_Data.statistics.digg_count),
					pinglun: this.count(Detail_Data.statistics.comment_count),
					share: this.count(Detail_Data.statistics.share_count),
					shouchang: this.count(Detail_Data.statistics.collect_count),
					create_time: Common.convertTimestampToDateTime(pushItem.create_time / 1e3),
					avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.data.user.avatar_larger.uri,
					share_url: Config.douyin.push.shareType === "web" ? realUrl : `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`,
					username: Detail_Data.author.nickname,
					"抖音号": Detail_Data.user_info.data.user.unique_id === "" ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
					"粉丝": this.count(Detail_Data.user_info.data.user.follower_count),
					"获赞": this.count(Detail_Data.user_info.data.user.total_favorited),
					"关注": this.count(Detail_Data.user_info.data.user.following_count),
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
			for (const target of pushItem.targets) try {
				let status = { message_id: "" };
				const { groupId, botId } = target;
				if (!skip) {
					const Contact = karin.contactGroup(groupId);
					status = await karin.sendMsg(botId, Contact, img$2 ? [...img$2] : []);
					if (pushItem.living && "room_data" in pushItem.Detail_Data && status.message_id) await douyinDBInstance.updateLiveStatus(pushItem.sec_uid, true);
					if (Config.douyin.push.parsedynamic && status.message_id) {
						if (iddata.is_mp4) try {
							let downloadUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`;
							logger.debug(`开始排除不符合条件的视频分辨率；\n\n                    共拥有${logger.yellow(Detail_Data.video.bit_rate.length)}个视频源\n\n                    视频ID：${logger.green(Detail_Data.aweme_id)}\n\n                    分享链接：${logger.green(Detail_Data.share_url)}\n                    `);
							downloadUrl = await new Networks({
								url: douyinProcessVideos(Detail_Data.video.bit_rate, Config.douyin.videoQuality)[0].play_addr.url_list[0],
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
							const imageres = [];
							let image_url;
							for (const item of Detail_Data.images) {
								image_url = item.url_list[2] ?? item.url_list[1];
								imageres.push(segment.image(image_url));
							}
							const bot = karin.getBot(botId);
							const forwardMsg = common.makeForward(imageres, botId, bot.account.name);
							await bot.sendForwardMsg(karin.contactFriend(botId), forwardMsg);
						}
					}
				}
				if (skip || !pushItem.living && status.message_id) await douyinDBInstance.addAwemeCache(awemeId, pushItem.sec_uid, groupId);
			} catch (error) {
				throw new Error(`${error}`);
			}
		}
		return true;
	}
	async getDynamicList(userList) {
		const willbepushlist = {};
		try {
			const filteredUserList = userList.filter((item) => item.switch !== false);
			for (const item of filteredUserList) {
				const sec_uid = item.sec_uid;
				logger.debug(`开始获取用户：${item.remark}（${sec_uid}）的主页作品列表`);
				const videolist = await this.amagi.getDouyinData("用户主页视频列表数据", {
					sec_uid,
					typeMode: "strict"
				});
				const userinfo = await this.amagi.getDouyinData("用户主页数据", {
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
				if (videolist.data.aweme_list.length > 0) for (const aweme of videolist.data.aweme_list) {
					logger.debug(`开始处理作品：${aweme.aweme_id}`);
					const now = Date.now();
					const timeDifference = now - aweme.create_time * 1e3;
					const is_top = aweme.is_top === 1;
					let shouldPush = false;
					const timeDiffSeconds = Math.round(timeDifference / 1e3);
					const timeDiffHours = Math.round(timeDifference / 1e3 / 60 / 60 * 100) / 100;
					logger.debug(`\n              前期获取该作品基本信息：\n              作者：${aweme.author.nickname}\n              作品ID：${aweme.aweme_id}\n              发布时间：${Common.convertTimestampToDateTime(aweme.create_time)}\n              发布时间戳（s）：${aweme.create_time}\n              当前时间戳（ms）：${now}\n              时间差（ms）：${timeDifference} ms (${timeDiffSeconds}s) (${timeDiffHours}h)\n              是否置顶：${is_top}\n              是否处于开播：${userinfo.data.user?.live_status === 1 ? logger.green("true") : logger.red("false")}\n              是否在一天内：${timeDifference < 864e5 ? logger.green("true") : logger.red("false")}\n              `);
					if (is_top && timeDifference < 864e5 || timeDifference < 864e5 && !is_top) {
						if (!await this.checkIfAlreadyPushed(aweme.aweme_id, sec_uid, targets.map((t) => t.groupId))) shouldPush = true;
					}
					if (shouldPush) willbepushlist[aweme.aweme_id] = {
						remark: item.remark,
						sec_uid,
						create_time: aweme.create_time * 1e3,
						targets,
						Detail_Data: {
							...aweme,
							user_info: userinfo
						},
						avatar_img: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + userinfo.data.user.avatar_larger.uri,
						living: false
					};
				}
				const liveStatus = await douyinDBInstance.getLiveStatus(sec_uid);
				if (userinfo.data.user.live_status === 1) {
					const liveInfo = await this.amagi.getDouyinData("直播间信息数据", {
						sec_uid: userinfo.data.user.sec_uid,
						typeMode: "strict"
					});
					if (!liveStatus.living) willbepushlist[`live_${sec_uid}`] = {
						remark: item.remark,
						sec_uid,
						create_time: Date.now(),
						targets,
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
				} else if (liveStatus.living) {
					await douyinDBInstance.updateLiveStatus(sec_uid, false);
					logger.info(`用户 ${item.remark ?? sec_uid} 已关播，更新直播状态`);
				}
			}
		} catch (error) {
			throw new Error(`获取抖音用户主页作品列表失败: ${error}`);
		}
		return willbepushlist;
	}
	async checkIfAlreadyPushed(aweme_id, sec_uid, groupIds) {
		for (const groupId of groupIds) if (!await douyinDBInstance.isAwemePushed(aweme_id, sec_uid, groupId)) return false;
		return true;
	}
	async setting(data) {
		const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
		const config$1 = Config.pushlist;
		const groupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
		const botId = this.e.selfId;
		try {
			let index = 0;
			while (data.data[index].card_unique_name !== "user") index++;
			const sec_uid = data.data[index].user_list[0].user_info.sec_uid;
			const UserInfoData = await this.amagi.getDouyinData("用户主页数据", {
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
				for (let index$1 = 0; index$1 < existingItem.group_id.length; index$1++) if (existingItem.group_id[index$1].split(":")[0] === String(groupId)) {
					has = true;
					groupIndexToRemove = index$1;
					break;
				}
				if (has) {
					existingItem.group_id.splice(groupIndexToRemove, 1);
					if (isSubscribed) await douyinDBInstance.unsubscribeDouyinUser(groupId, sec_uid);
					logger.info(`\n删除成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}\nsec_uid${UserInfoData.data.user.sec_uid}`);
					await this.e.reply(`群：${groupInfo.groupName}(${groupId})\n删除成功！${UserInfoData.data.user.nickname}\n抖音号：${user_shortid}`);
					if (existingItem.group_id.length === 0) {
						const index$1 = config$1.douyin.indexOf(existingItem);
						config$1.douyin.splice(index$1, 1);
					}
				} else {
					existingItem.group_id.push(`${groupId}:${botId}`);
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
					short_id: user_shortid
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
			const userInfo = await this.amagi.getDouyinData("用户主页数据", {
				sec_uid,
				typeMode: "strict"
			});
			renderOpt.push({
				avatar_img: userInfo.data.user.avatar_larger.url_list[0],
				username: userInfo.data.user.nickname,
				short_id: userInfo.data.user.unique_id === "" ? userInfo.data.user.short_id : userInfo.data.user.unique_id,
				fans: this.count(userInfo.data.user.follower_count),
				total_favorited: this.count(userInfo.data.user.total_favorited),
				following_count: this.count(userInfo.data.user.following_count)
			});
		}
		const img$2 = await Render("douyin/userlist", { renderOpt });
		await this.e.reply(img$2);
	}
	async forcepush(data) {
		const currentGroupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
		const currentBotId = this.e.selfId;
		if (!this.e.msg.includes("全部")) {
			const subscribedUids = (await douyinDBInstance.getGroupSubscriptions(currentGroupId)).map((sub) => sub.sec_uid);
			const filteredData = {};
			for (const awemeId in data) if (subscribedUids.includes(data[awemeId].sec_uid)) filteredData[awemeId] = {
				...data[awemeId],
				targets: [{
					groupId: currentGroupId,
					botId: currentBotId
				}]
			};
			await this.getdata(filteredData);
		} else await this.getdata(data);
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
				const remark = (await this.amagi.getDouyinData("用户主页数据", {
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
init_Config();
async function kuaishouComments(data, emojidata) {
	let jsonArray = [];
	for (const i of data.data.visionCommentList.rootComments) {
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
}
function getRelativeTimeFromTimestamp$1(timestamp) {
	const timestampInSeconds = Math.floor(timestamp / 1e3);
	const differenceInSeconds = Math.floor(Date.now() / 1e3) - timestampInSeconds;
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
function br(data) {
	for (const i of data) {
		let text = i.text;
		text = text.replace(/\n/g, "<br>");
		i.text = text;
	}
	return data;
}
function handling_at(data) {
	for (const i of data) {
		let text = i.text;
		text = text.replace(/(@[\S\s]+?)\(\w+\)/g, (match, p1) => `<span style="color: rgb(3,72,141);">${p1.trim()}</span>`);
		i.text = text;
	}
	return data;
}
init_esm();
init_Config();
async function fetchKuaishouData(type, opt) {
	const client = Client({
		cookies: { kuaishou: Config.cookies.kuaishou },
		request: {
			timeout: Config.request.timeout,
			headers: { "User-Agent": Config.request["User-Agent"] },
			proxy: Config.request.proxy
		}
	});
	switch (type) {
		case "one_work": return {
			VideoData: await client.getKuaishouData("单个视频作品数据", {
				photoId: opt.photoId,
				typeMode: "strict"
			}),
			CommentsData: await client.getKuaishouData("评论数据", {
				photoId: opt.photoId,
				typeMode: "strict"
			}),
			EmojiData: await client.getKuaishouData("Emoji数据", { typeMode: "strict" })
		};
		case "work_comments": return (await client.getKuaishouData("评论数据", {
			photoId: opt.photoId,
			typeMode: "strict"
		})).data;
		case "emoji_list": return await client.getKuaishouData("Emoji数据", { typeMode: "strict" });
		default: break;
	}
}
await init_module();
async function getKuaishouID(url, log = true) {
	const longLink = await new Networks({ url }).getLongLink();
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
}
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
	async RESOURCES(data) {
		Config.app.EmojiReply && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true);
		if (data.VideoData.data.data.visionVideoDetail.status !== 1) {
			await this.e.reply("不支持解析的视频");
			return true;
		}
		Config.kuaishou.tip && await this.e.reply("检测到快手链接，开始解析");
		const video_url = data.VideoData.data.data.visionVideoDetail.photo.photoUrl;
		const transformedData = Object.entries(data.EmojiData.data.data.visionBaseEmoticons.iconUrls).map(([name, path$1]) => ({
			name,
			url: `https:${path$1}`
		}));
		const CommentsData = await kuaishouComments(data.CommentsData.data, transformedData);
		const fileHeaders = await new Networks({
			url: video_url,
			headers: this.headers
		}).getHeaders();
		const fileSizeInMB = ((fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0) / (1024 * 1024)).toFixed(2);
		const img$2 = await Render("kuaishou/comment", {
			Type: "视频",
			viewCount: data.VideoData.data.data.visionVideoDetail.photo.viewCount,
			CommentsData,
			CommentLength: CommentsData?.length ?? 0,
			share_url: video_url,
			VideoSize: fileSizeInMB,
			likeCount: data.VideoData.data.data.visionVideoDetail.photo.likeCount
		});
		await this.e.reply(img$2);
		await downloadVideo(this.e, {
			video_url,
			title: {
				timestampTitle: `tmp_${Date.now()}.mp4`,
				originTitle: `${data.VideoData.data.data.visionVideoDetail.photo.caption}.mp4`
			}
		});
		return true;
	}
};
init_bilibili$1();
await init_module();
await init_Config();
const task = Config.app.removeCache && karin.task("[kkk-视频缓存自动删除]", "0 0 4 * * *", async () => {
	try {
		await removeAllFiles(Common.tempDri.video);
		logger.mark(Common.tempDri.video + "目录下所有文件已删除");
	} catch (err) {
		console.error("删除文件时出错:", err);
	}
});
const biLogin = karin.command(/^#?(kkk)?\s*B站\s*(扫码)?\s*登录$/i, async (e) => {
	await bilibiliLogin(e);
	return true;
}, {
	perm: Config.bilibili.loginPerm,
	name: "kkk-ck管理"
});
const dylogin = karin.command(/^#?(kkk)?抖音(扫码)?登录$/, async (e) => {
	await e.reply("暂时不可用");
	return true;
}, {
	perm: Config.douyin.loginPerm,
	name: "kkk-ck管理"
});
const setdyck = karin.command(/^#?(kkk)?s*设置抖音ck$/i, async (e) => {
	const msg = await e.reply("请发在120秒内送抖音ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
	const context = await karin.ctx(e);
	Config.Modify("cookies", "douyin", context.msg);
	await e.bot.recallMsg(e.contact, msg.messageId);
	await e.reply("设置成功！", { at: true });
	return true;
}, {
	perm: "master",
	name: "kkk-ck管理",
	event: "message.friend"
});
const setbilick = karin.command(/^#?(kkk)?s*设置s*(B站)ck$/i, async (e) => {
	const msg = await e.reply("请发在120秒内送B站ck\n教程：https://ikenxuan.github.io/kkkkkk-10086/docs/intro/other#%E9%85%8D%E7%BD%AE%E4%B8%8D%E5%90%8C%E5%B9%B3%E5%8F%B0%E7%9A%84-cookies\n");
	const context = await karin.ctx(e);
	Config.Modify("cookies", "bilibili", context.msg);
	await e.bot.recallMsg(e.contact, msg.messageId);
	await e.reply("设置成功！", { at: true });
	return true;
}, {
	perm: "master",
	name: "kkk-ck管理",
	event: "message.friend"
});
async function removeAllFiles(dir) {
	const files = await fs.promises.readdir(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		if ((await fs.promises.stat(filePath)).isDirectory()) {
			await removeAllFiles(filePath);
			await fs.promises.rmdir(filePath);
		} else await fs.promises.unlink(filePath);
	}
}
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
			title: "「#解析」「#kkk解析」",
			description: "在解析功能关闭的情况下，可对引用消息进行解析",
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
function buildMenuForRole(role) {
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
}
const help = karin.command(/^#?kkk帮助$/, async (e) => {
	const masters = config.master().filter((id) => id !== "console");
	const role = !!e.sender && masters.includes(e.sender.userId) ? "master" : "member";
	const img$2 = await Render("other/help", {
		title: "KKK插件帮助页面",
		menu: buildMenuForRole(role),
		role
	});
	await e.reply(img$2);
	return true;
}, { name: "kkk-帮助" });
const version = karin.command(/^#?kkk(版本|更新日志)$/, async (e) => {
	const changelogContent = fs.readFileSync(Root.pluginPath + "/CHANGELOG.md", "utf8");
	const img$2 = await Render("other/changelog", {
		markdown: logs(Root.pluginVersion, changelogContent, 10, false),
		Tip: false
	});
	e.reply(img$2);
	return true;
}, { name: "kkk-版本" });
init_esm();
var LogCollector = class LogCollector {
	logs = [];
	isCollecting = false;
	originalAmagiWarn = null;
	originalAmagiError = null;
	static isAmagiIntercepted = false;
	constructor() {
		if (!LogCollector.isAmagiIntercepted) {
			this.interceptAmagiLogger();
			LogCollector.isAmagiIntercepted = true;
		}
		this.registerInstance();
	}
	startCollecting() {
		if (this.isCollecting) return;
		this.isCollecting = true;
		this.logs = [];
	}
	stopCollecting() {
		if (!this.isCollecting) return;
		this.isCollecting = false;
		this.unregisterInstance();
	}
	interceptAmagiLogger() {
		this.originalAmagiWarn = logger$1.warn.bind(logger$1);
		this.originalAmagiError = logger$1.error.bind(logger$1);
		logger$1.warn = (message, ...args) => {
			LogCollector.collectToAllInstances("warn", [message, ...args]);
			if (this.originalAmagiWarn) this.originalAmagiWarn(message, ...args);
		};
		logger$1.error = (message, ...args) => {
			LogCollector.collectToAllInstances("error", [message, ...args]);
			if (this.originalAmagiError) this.originalAmagiError(message, ...args);
		};
	}
	static activeInstances = [];
	static collectToAllInstances(level, args) {
		LogCollector.activeInstances.forEach((instance) => {
			if (instance.isCollecting) instance.collectAmagiLog(level, args);
		});
	}
	collectAmagiLog(level, args) {
		if (!this.isCollecting) return;
		const logEntry = {
			level,
			message: args.map((arg) => typeof arg === "string" ? arg : JSON.stringify(arg)).join(" "),
			timestamp: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19),
			source: "amagi"
		};
		this.logs.push(logEntry);
	}
	getCollectedLogs() {
		return [...this.logs];
	}
	getFormattedLogs() {
		return this.logs.map((log) => `[${log.timestamp}] [${log.source}] [${log.level.toUpperCase()}] ${log.message}`).join("\n\n");
	}
	clearLogs() {
		this.logs = [];
	}
	registerInstance() {
		if (!LogCollector.activeInstances.includes(this)) LogCollector.activeInstances.push(this);
	}
	unregisterInstance() {
		const index = LogCollector.activeInstances.indexOf(this);
		if (index > -1) LogCollector.activeInstances.splice(index, 1);
	}
};
await init_module();
await init_Config();
function statBotId(pushlist) {
	const douyin$1 = pushlist.douyin?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
	const bilibili$1 = pushlist.bilibili?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
	return {
		douyin: { botId: douyin$1 },
		bilibili: { botId: bilibili$1 }
	};
}
const wrapWithErrorHandler = (fn, options) => async (...args) => {
	const logCollector = new LogCollector();
	try {
		logCollector.startCollecting();
		return await fn(...args);
	} catch (error) {
		const collectedLogs = logCollector.getFormattedLogs();
		if (!Config.app.errorLogSendTo) throw error;
		await handleBusinessError(error, options, collectedLogs, args[0]);
		throw error;
	} finally {
		logCollector.stopCollecting();
	}
};
var handleBusinessError = async (error, options, logs$1, event) => {
	const triggerCommand = event?.msg || "未知命令或处于非消息环境";
	const img$2 = await Render("other/handlerError", {
		type: "business_error",
		platform: "system",
		error: {
			message: error.message,
			name: error.name,
			stack: util.format(error),
			businessName: options.businessName
		},
		method: options.businessName,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		logs: logs$1,
		triggerCommand,
		share_url: triggerCommand
	});
	if (event && Config.app.errorLogSendTo.some((item) => item === "trigger")) try {
		event.reply(img$2);
	} catch (replyError) {
		logger.error(`发送错误消息给用户失败: ${replyError}`);
	}
	if (Config.app.errorLogSendTo.some((item) => item === "master")) try {
		const botId = statBotId(Config.pushlist);
		const list = config.master();
		let master = list[0];
		if (master === "console") master = list[1];
		const selectedBotId = botId.douyin.botId || botId.bilibili.botId || "";
		const isPushTask = !event || options.businessName.includes("推送");
		if (selectedBotId && master) if (isPushTask) await karin.sendMaster(selectedBotId, master, [segment.text(`${options.businessName} 任务执行出错！\n请即时解决以消除警告`), ...img$2]);
		else {
			const Adapter = karin.getBot(selectedBotId);
			const groupID = event && "groupId" in event ? event.groupId : "";
			const groupInfo = await Adapter?.getGroupInfo(groupID);
			await karin.sendMaster(selectedBotId, master, [segment.text(`群：${groupInfo?.groupName || "未知"}(${groupID})\n${options.businessName} 任务执行出错！\n请即时解决以消除警告`), ...img$2]);
		}
	} catch (masterError) {
		logger.error(`发送错误消息给主人失败: ${masterError}`);
	}
	if (options.customErrorHandler) try {
		await options.customErrorHandler(error, logs$1);
	} catch (customError) {
		logger.error(`自定义错误处理失败: ${customError}`);
	}
};
await init_esm();
await init_module();
await init_db();
await init_Config();
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
	const data = await getDouyinData("搜索数据", Config.cookies.douyin, {
		query,
		typeMode: "strict"
	});
	await new DouYinpush(e).setting(data.data);
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
		const data = await getBilibiliData("用户主页数据", Config.cookies.bilibili, {
			host_mid: Number(match[1]),
			typeMode: "strict"
		});
		await new Bilibilipush(e).setting(data.data);
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
	const workInfo = await amagi.getDouyinData("聚合解析", {
		aweme_id: iddata.aweme_id,
		typeMode: "strict"
	}, Config.cookies.douyin);
	const userProfile = await amagi.getDouyinData("用户主页数据", {
		sec_uid: workInfo.data.aweme_detail.author.sec_uid,
		typeMode: "strict"
	}, Config.cookies.douyin);
	const realUrl = Config.douyin.push.shareType === "web" && await new Networks({
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
		create_time: Common.convertTimestampToDateTime(workInfo.data.aweme_detail.create_time),
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
const douyinPush = Config.douyin.push.switch && karin.task("抖音推送", Config.douyin.push.cron, handleDouyinPush, { log: Config.douyin.push.log });
const bilibiliPush = Config.bilibili.push.switch && karin.task("B站推送", Config.bilibili.push.cron, handleBilibiliPush, { log: Config.bilibili.push.log });
const forcePush = karin.command(/#(抖音|B站)(全部)?强制推送/, handleForcePush, {
	name: "𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★",
	perm: "master",
	event: "message.group"
});
const setdyPush = karin.command(/^#设置抖音推送/, handleSetDouyinPush, {
	name: "kkk-推送功能-设置",
	event: "message.group",
	perm: Config.douyin.push.permission,
	dsbAdapter: ["qqbot"]
});
const setbiliPush = karin.command(/^#设置[bB]站推送/, handleSetBilibiliPush, {
	name: "kkk-推送功能-设置",
	event: "message.group",
	perm: Config.bilibili.push.permission,
	dsbAdapter: ["qqbot"]
});
const bilibiliPushList = karin.command(/^#?[bB]站推送列表$/, handleBilibiliPushList, {
	name: "kkk-推送功能-列表",
	event: "message.group"
});
const douyinPushList = karin.command(/^#?抖音推送列表$/, handleDouyinPushList, {
	name: "kkk-推送功能-列表",
	event: "message.group"
});
const changeBotID = karin.command(/^#kkk设置推送机器人/, handleChangeBotID, {
	name: "kkk-推送功能-设置",
	perm: "master"
});
const testDouyinPush = karin.command(/^#测试抖音推送\s*(https?:\/\/[^\s]+)?/, handleTestDouyinPush, {
	name: "kkk-推送功能-测试",
	event: "message.group",
	perm: Config.douyin.push.permission,
	dsbAdapter: ["qqbot"]
});
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
init_Config();
var processCommentEmojis = (text, emojiData) => {
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
var processAtUsers = (text, atUsers, useDarkTheme = false) => {
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
await init_bilibili$1();
var reg = {
	douyin: /^.*((www|v|jx|m|jingxuan)\.(douyin|iesdouyin)\.com|douyin\.com\/(video|note)).*/,
	bilibili: /(bilibili.com|b23.tv|t.bilibili.com|bili2233.cn|BV[a-zA-Z0-9]{10,})/,
	kuaishou: /^((.*)快手(.*)快手(.*)|(.*)v\.kuaishou(.*)|(.*)kuaishou\.com\/f\/[a-zA-Z0-9]+.*)$/,
	xiaohongshu: /(xiaohongshu\.com|xhslink\.com)/
};
var handleDouyin = wrapWithErrorHandler(async (e) => {
	const iddata = await getDouyinID(e, String(e.msg.match(/(http|https):\/\/.*\.(douyin|iesdouyin)\.com\/[^ ]+/g)));
	await new DouYin(e, iddata).RESOURCES(iddata);
	return true;
}, { businessName: "抖音视频解析" });
var handleBilibili = wrapWithErrorHandler(async (e) => {
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
var handleKuaishou = wrapWithErrorHandler(async (e) => {
	const kuaishouUrl = e.msg.replaceAll("\\", "").match(/(https:\/\/v\.kuaishou\.com\/\w+|https:\/\/www\.kuaishou\.com\/f\/[a-zA-Z0-9]+)/g);
	const iddata = await getKuaishouID(String(kuaishouUrl));
	const WorkData = await fetchKuaishouData(iddata.type, iddata);
	await new Kuaishou(e, iddata).RESOURCES(WorkData);
}, { businessName: "快手视频解析" });
var handleXiaohongshu = wrapWithErrorHandler(async (e) => {
	const url = e.msg.replaceAll("\\", "").match(/https?:\/\/[^\s"'<>]+/)?.[0];
	if (!url) {
		logger.warn(`未能在消息中找到有效链接: ${e.msg}`);
		return true;
	}
	const iddata = await getXiaohongshuID(url);
	await new Xiaohongshu(e, iddata).RESOURCES(iddata);
	return true;
}, { businessName: "小红书视频解析" });
var handlePrefix = wrapWithErrorHandler(async (e) => {
	e.msg = await Common.getReplyMessage(e);
	if (reg.douyin.test(e.msg)) return await handleDouyin(e);
	else if (reg.bilibili.test(e.msg)) return await handleBilibili(e);
	else if (reg.kuaishou.test(e.msg)) return await handleKuaishou(e);
	else if (reg.xiaohongshu.test(e.msg)) return await handleXiaohongshu(e);
}, { businessName: "引用解析" });
var douyin = karin.command(reg.douyin, handleDouyin, {
	name: "kkk-视频功能-抖音",
	priority: Config.app.videoTool ? -Infinity : 800
});
var bilibili = karin.command(reg.bilibili, handleBilibili, {
	name: "kkk-视频功能-B站",
	priority: Config.app.videoTool ? -Infinity : 800
});
var kuaishou = karin.command(reg.kuaishou, handleKuaishou, {
	name: "kkk-视频功能-快手",
	priority: Config.app.videoTool ? -Infinity : 800
});
var xiaohongshu = karin.command(reg.xiaohongshu, handleXiaohongshu, {
	name: "kkk-视频功能-小红书",
	priority: Config.app.videoTool ? -Infinity : 800
});
const prefix = karin.command(/^#?(解析|kkk解析)/, handlePrefix, { name: "kkk-视频功能-引用解析" });
const douyinAPP = Config.douyin.switch && douyin;
const bilibiliAPP = Config.bilibili.switch && bilibili;
const kuaishouAPP = Config.kuaishou.switch && kuaishou;
const xiaohongshuAPP = Config.xiaohongshu.switch && xiaohongshu;
await init_module();
var versionCore = (v) => {
	v = v.trim();
	if (v.startsWith("v") || v.startsWith("V")) v = v.slice(1);
	const [preBuild] = v.split("+", 2);
	const [core] = preBuild.split("-", 2);
	return core;
};
const getChangelogImage = async (props) => {
	const urls = [
		`https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://npm.onmicrosoft.cn/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://jsd.onmicrosoft.cn/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://npm.onmicrosoft.cn/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://cdn.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://fastly.jsdelivr.net/npm/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://unpkg.com/${Root.pluginName}@${props.remoteVersion}/CHANGELOG.md`,
		`https://jiashu.1win.eu.org/https://raw.githubusercontent.com/ikenxuan/karin-plugin-kkk/v${props.remoteVersion}/packages/core/CHANGELOG.md`
	];
	let changelog = "";
	const requests = urls.map((url) => axios.get(url, {
		timeout: 1e4,
		headers: baseHeaders
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
	return await Render("other/changelog", {
		markdown: range({
			data: changelog,
			startVersion: props.localVersion,
			endVersion: versionCore(props.remoteVersion),
			compare: "semver"
		}),
		Tip: props.Tip
	}) || null;
};
const isSemverGreater = (remote, local) => {
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
await init_module();
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
	const botList = karin.getAllBotList();
	if (ChangeLogImg) {
		const msgResult = await karin.sendMaster(botList[0].bot.account.name === "console" ? botList[1].bot.account.selfId : botList[0].bot.account.selfId, master, [segment.text("karin-plugin-kkk 有新的更新！"), ...ChangeLogImg]);
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
			const upd = await checkPkgUpdate(Root.pluginName, { compare: "semver" });
			if (upd.status === "yes") {
				const result = await updatePkg(Root.pluginName);
				if (result.status === "ok") {
					if ((await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)).messageId) try {
						await db.del(UPDATE_MSGID_KEY);
						await db.del(UPDATE_LOCK_KEY);
					} catch {}
					await restart(e.selfId, e.contact, e.messageId);
				} else await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
			} else if (upd.status === "no") await e.reply("未检测到可更新版本。");
			else await e.reply(`${Root.pluginName} 更新失败: ${upd.error?.message ?? String(upd.error)}`);
		} catch (error) {
			await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
		}
	}
	next();
}, { priority: 100 });
const kkkUpdateCommand = karin.command(/^#?kkk更新$/, async (e) => {
	const upd = await checkPkgUpdate(Root.pluginName, { compare: "semver" });
	if (upd.status === "error") {
		await e.reply(`获取远程版本失败：${upd.error?.message ?? String(upd.error)}`);
		return;
	}
	if (upd.status === "no") {
		await e.reply(`当前已是最新版本：${upd.local}`, { reply: true });
		return;
	}
	if (upd.status === "yes" && !isSemverGreater(upd.remote, upd.local)) {
		await e.reply(`当前已是最新或预览版本：${upd.local}`, { reply: true });
		return;
	}
	const ChangeLogImg = await getChangelogImage({
		localVersion: Root.pluginVersion,
		remoteVersion: upd.remote,
		Tip: false
	});
	if (ChangeLogImg) await e.reply([segment.text(`${Root.pluginName} 的更新日志：`), ...ChangeLogImg], { reply: true });
	else await e.reply("获取更新日志失败，更新进程继续......", { reply: true });
	try {
		const result = await updatePkg(Root.pluginName);
		if (result.status === "ok") {
			if ((await e.reply(`${Root.pluginName} 更新成功！\n${result.local} -> ${result.remote}\n开始执行重启......`)).messageId) try {
				await db.del(UPDATE_MSGID_KEY);
				await db.del(UPDATE_LOCK_KEY);
			} catch {}
			await restart(e.selfId, e.contact, e.messageId);
		} else await e.reply(`${Root.pluginName} 更新失败: ${result.data ?? "更新执行失败"}`);
	} catch (error) {
		await e.reply(`${Root.pluginName} 更新失败: ${error.message}`);
	}
}, { name: "kkk-更新" });
const kkkUpdateTest = karin.command("test", async (e) => {
	await db.del(UPDATE_MSGID_KEY);
	await db.del(UPDATE_LOCK_KEY);
	return Handler(e);
});
const update = karin.task("kkk-更新检测", "*/10 * * * *", Handler, {
	name: "kkk-更新检测",
	log: false
});
export { setbilick as C, web_config_default as D, webConfig as E, Root as O, dylogin as S, task as T, setdyPush as _, bilibiliAPP as a, version as b, prefix as c, bilibiliPushList as d, changeBotID as f, setbiliPush as g, forcePush as h, update as i, init_root as k, xiaohongshuAPP as l, douyinPushList as m, kkkUpdateCommand as n, douyinAPP as o, douyinPush as p, kkkUpdateTest as r, kuaishouAPP as s, kkkUpdate as t, bilibiliPush as u, testDouyinPush as v, setdyck as w, biLogin as x, help as y };
