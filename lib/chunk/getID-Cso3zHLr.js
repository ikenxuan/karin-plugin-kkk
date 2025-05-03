import { i as index_default, C as Config, d as Common, h as axios, A as AxiosError, j as douyinModels, k as bilibiliModels, f as getBilibiliData, m as bilibiliApiUrls, w as wbi_sign, n as bilibiliDB, g as getDouyinData } from "./douyin-BmJwATC6.js";
import karin, { logger, segment, ffmpeg, ffprobe, common, karin as karin$1, render, mkdirSync } from "node-karin";
import { Op } from "sequelize";
import { Version } from "../Version.js";
import fs from "node:fs";
import { pipeline } from "stream/promises";
import { R as Render } from "./Render-DxUK3K0r.js";
import "node:path";
import { h as heicConvertExports, a as browserExports } from "./index-BcbeSNYZ.js";
import { m as markdown } from "./index-BDlGFCbK.js";
import "node:child_process";
import "playwright";
class Base {
  e;
  headers;
  _path;
  amagi;
  constructor(e) {
    this.e = e;
    this.headers = {
      Accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
    };
    this._path = process.cwd()?.replace(/\\/g, "/");
    this.amagi = new index_default({ douyin: Config.cookies.douyin, bilibili: Config.cookies.bilibili, kuaishou: Config.cookies.kuaishou });
  }
  /** 获取适配器名称 */
  get botadapter() {
    return this.e.bot?.adapter?.name;
  }
  /**
   * 上传视频文件
   * @param file - 包含本地视频文件信息的对象。
   * @param videoUrl 视频直链，无则传空字符串
   * @param options 上传参数
   * @returns
   */
  async upload_file(file, videoUrl, options) {
    let sendStatus = true;
    let File;
    let newFileSize = file.totalBytes;
    const selfId = this.e.selfId || options?.activeOption?.uin;
    const contact = this.e.contact || karin.contactGroup(options?.activeOption?.group_id) || karin.contactFriend(selfId);
    if (Config.upload.compress && file.totalBytes > Config.upload.compresstrigger) {
      const Duration = await mergeFile("获取指定视频文件时长", { path: file.filepath });
      logger.warn(logger.yellow(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`));
      const message = [
        segment.text(`视频大小 (${file.totalBytes} MB) 触发压缩条件（设定值：${Config.upload.compresstrigger} MB），正在进行压缩至${Config.upload.compressvalue} MB...`),
        options?.message_id ? segment.reply(options.message_id) : segment.text("")
      ];
      const msg1 = await karin.sendMsg(selfId, contact, message);
      const targetBitrate = Common.calculateBitrate(Config.upload.compresstrigger, Duration) * 0.75;
      const startTime = Date.now();
      file.filepath = await mergeFile("压缩视频", { path: file.filepath, targetBitrate, resultPath: `${Common.tempDri.video}tmp_${Date.now()}.mp4` });
      const endTime = Date.now();
      newFileSize = await Common.getVideoFileSize(file.filepath);
      logger.debug(`原始视频大小为: ${file.totalBytes.toFixed(1)} MB, ${logger.green(`经 FFmpeg 压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，原视频文件已删除`)}`);
      const message2 = [
        segment.text(`压缩后最终视频大小为: ${newFileSize.toFixed(1)} MB，压缩耗时：${((endTime - startTime) / 1e3).toFixed(1)} 秒`),
        segment.reply(msg1.messageId)
      ];
      await karin.sendMsg(selfId, contact, message2);
    }
    if (options) {
      options.useGroupFile = Config.upload.usegroupfile && newFileSize > Config.upload.groupfilevalue;
    }
    if (Config.upload.sendbase64 && !options?.useGroupFile) {
      const videoBuffer = await fs.promises.readFile(file.filepath);
      File = `base64://${videoBuffer.toString("base64")}`;
    } else File = "file://" + file.filepath;
    try {
      if (options?.active) {
        if (options.useGroupFile) {
          const bot = karin.getBot(String(options.activeOption?.uin));
          const contact2 = karin.contactGroup(String(options.activeOption?.group_id));
          const status = await bot.uploadFile(contact2, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split("/").pop()}`);
          status ? sendStatus = true : sendStatus = false;
        } else {
          const status = await karin.sendMsg(selfId, contact, [segment.video(File)]);
          status.messageId ? sendStatus = true : sendStatus = false;
        }
      } else {
        if (options?.useGroupFile) {
          await this.e.reply(`视频大小: ${newFileSize.toFixed(1)}MB 正通过文件上传中...`);
          const status = await this.e.bot.uploadFile(this.e.contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split("/").pop()}`);
          status ? sendStatus = true : sendStatus = false;
        } else {
          const status = await this.e.reply(segment.video(File) || videoUrl);
          status.messageId ? sendStatus = true : sendStatus = false;
        }
      }
      return sendStatus;
    } catch (error) {
      if (options && options.active === false) {
        await this.e.reply("视频文件上传失败" + JSON.stringify(error, null, 2));
      }
      logger.error("视频文件上传错误," + String(error));
      return false;
    } finally {
      await this.removeFile(file.filepath);
    }
  }
  /**
   * 下载视频并上传到群
   * @param video_url 视频链接
   * @param title 文件名，是一个对象，时间戳或自定义
   * @param opt 上传参数
   * @returns
   */
  async DownLoadVideo(downloadOpt, uploadOpt) {
    const fileHeaders = await new Networks({ url: downloadOpt.video_url, headers: downloadOpt.headers ?? this.headers }).getHeaders();
    const fileSizeContent = fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2);
    const fileSize = parseInt(parseFloat(fileSizeInMB).toFixed(2));
    if (Config.upload.usefilelimit && fileSize > Config.upload.filelimit) {
      const message = segment.text(`视频：「${downloadOpt.title.originTitle ?? "Error: 文件名获取失败"}」大小 (${fileSizeInMB} MB) 超出最大限制（设定值：${Config.upload.filelimit} MB），已取消上传`);
      const selfId = this.e.selfId || uploadOpt?.activeOption?.uin;
      const contact = this.e.contact || karin.contactGroup(uploadOpt?.activeOption?.group_id) || karin.contactFriend(selfId);
      await karin.sendMsg(selfId, contact, message);
      return false;
    }
    let res = await this.DownLoadFile(downloadOpt.video_url, {
      title: Config.app.rmmp4 ? downloadOpt.title.timestampTitle : downloadOpt.title.originTitle.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n\s]/g, " "),
      headers: downloadOpt.headers ?? this.headers
    });
    res = { ...res, ...downloadOpt.title };
    res.totalBytes = Number((res.totalBytes / (1024 * 1024)).toFixed(2));
    return await this.upload_file(res, downloadOpt.video_url, uploadOpt);
  }
  /**
   * 异步下载文件的函数。
   * @param videoUrl 下载地址。
   * @param opt 配置选项，包括标题、请求头等。
   * @returns 返回一个包含文件路径和总字节数的对象。
   */
  async DownLoadFile(videoUrl, opt) {
    const startTime = Date.now();
    const { filepath, totalBytes } = await new Networks({
      url: videoUrl,
      // 视频地址
      headers: opt.headers ?? this.headers,
      // 请求头
      filepath: Common.tempDri.video + opt.title,
      // 文件保存路径
      timeout: 3e4
      // 设置 30 秒超时
    }).downloadStream((downloadedBytes, totalBytes2) => {
      const barLength = 45;
      function generateProgressBar(progressPercentage2) {
        const filledLength = Math.floor(progressPercentage2 / 100 * barLength);
        let progress = "";
        progress += "█".repeat(filledLength);
        progress += "░".repeat(Math.max(0, barLength - filledLength - 1));
        return `[${progress}]`;
      }
      const progressPercentage = downloadedBytes / totalBytes2 * 100;
      const red = Math.floor(255 - 255 * progressPercentage / 100);
      const coloredPercentage = logger.chalk.rgb(red, 255, 0)(`${progressPercentage.toFixed(1)}%`);
      const elapsedTime = (Date.now() - startTime) / 1e3;
      const speed = downloadedBytes / elapsedTime;
      const formattedSpeed = (speed / 1048576).toFixed(1) + " MB/s";
      const remainingBytes = totalBytes2 - downloadedBytes;
      const remainingTime = remainingBytes / speed;
      const formattedRemainingTime = remainingTime > 60 ? `${Math.floor(remainingTime / 60)}min ${Math.floor(remainingTime % 60)}s` : `${remainingTime.toFixed(0)}s`;
      const downloadedSizeMB = (downloadedBytes / 1048576).toFixed(1);
      const totalSizeMB = (totalBytes2 / 1048576).toFixed(1);
      console.log(
        `⬇️  ${opt.title} ${generateProgressBar(progressPercentage)} ${coloredPercentage} ${downloadedSizeMB}/${totalSizeMB} MB | ${formattedSpeed} 剩余: ${formattedRemainingTime}\r`
      );
    }, 3);
    return { filepath, totalBytes };
  }
  /** 删文件 */
  async removeFile(path, force = false) {
    return await Common.removeFile(path, force);
  }
  /** 过万整除 */
  count(count) {
    if (count > 1e4) {
      return (count / 1e4).toFixed(1) + "万";
    } else {
      return count?.toString() ?? "无法获取";
    }
  }
}
const mergeFile = async (type, options) => {
  return await new FFmpeg(type).FFmpeg(options);
};
class FFmpeg {
  type;
  constructor(type) {
    this.type = type;
  }
  async FFmpeg(opt) {
    switch (this.type) {
      case "二合一（视频 + 音频）": {
        const result = await ffmpeg(`-y -i ${opt.path} -i ${opt.path2} -c copy ${opt.resultPath}`);
        result.status ? logger.mark("视频合成成功！") : logger.error(result);
        await opt.callback(result.status, opt.resultPath);
        return result;
      }
      case "视频*3 + 音频": {
        const result = await ffmpeg(`-y -stream_loop 2 -i ${opt.path} -i ${opt.path2} -filter_complex "[0:v]setpts=N/FRAME_RATE/TB[v];[0:a][1:a]amix=inputs=2:duration=shortest:dropout_transition=3[aout]" -map "[v]" -map "[aout]" -c:v libx264 -c:a aac -b:a 192k -shortest ${opt.resultPath}`);
        result ? logger.mark("视频合成成功！") : logger.error(result);
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
}
class Networks {
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
    this.headers = data.headers ?? {};
    this.url = data.url ?? "";
    this.type = data.type ?? "json";
    this.method = data.method ?? "GET";
    this.body = data.body ?? null;
    this.timeout = data.timeout ?? 15e3;
    this.filepath = data.filepath ?? "";
    this.maxRetries = 0;
    this.axiosInstance = axios.create({
      timeout: this.timeout,
      headers: this.headers,
      maxRedirects: 5,
      validateStatus: (status) => {
        return status >= 200 && status < 300 || status === 406 || status >= 500;
      }
    });
  }
  get config() {
    const config = {
      url: this.url,
      method: this.method,
      headers: this.headers,
      responseType: this.type
    };
    if (this.method === "POST" && this.body) {
      config.data = this.body;
    }
    return config;
  }
  /**
   * 异步下载流方法
   *
   * @param progressCallback 下载进度回调函数，接收已下载字节数和总字节数作为参数
   * @param retryCount 重试次数，默认为0
   * @returns 返回一个Promise，解析为包含文件路径和总字节数的对象
   *
   * 此函数通过axios库发送HTTP请求，下载指定URL的资源，并将下载的资源流保存到本地文件系统中
   * 它还提供了一个回调函数来报告下载进度，并在下载失败时根据配置自动重试
   */
  async downloadStream(progressCallback, retryCount = 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      const response = await axios({
        ...this.config,
        url: this.url,
        responseType: "stream",
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!(response.status >= 200 && response.status < 300)) {
        throw new Error(`无法获取 ${this.url}。状态: ${response.status} ${response.statusText}`);
      }
      const totalBytes = parseInt(response.headers["content-length"] ?? "0", 10);
      if (isNaN(totalBytes)) {
        throw new Error("无效的 content-length 头");
      }
      let downloadedBytes = 0;
      let lastPrintedPercentage = -1;
      const writer = fs.createWriteStream(this.filepath);
      const printProgress = () => {
        const progressPercentage = Math.floor(downloadedBytes / totalBytes * 100);
        if (progressPercentage !== lastPrintedPercentage) {
          progressCallback(downloadedBytes, totalBytes);
          lastPrintedPercentage = progressPercentage;
        }
      };
      const interval = totalBytes < 10 * 1024 * 1024 ? 1e3 : 500;
      const intervalId = setInterval(printProgress, interval);
      const onData = (chunk) => {
        downloadedBytes += chunk.length;
      };
      response.data.on("data", onData);
      await pipeline(
        response.data,
        writer
      );
      clearInterval(intervalId);
      response.data.off("data", onData);
      writer.end();
      return { filepath: this.filepath, totalBytes };
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof AxiosError) {
        logger.error(`请求在 ${this.timeout / 1e3} 秒后超时`);
      } else {
        logger.error("下载失败:", error);
      }
      if (retryCount < this.maxRetries) {
        const delay = Math.min(Math.pow(2, retryCount) * 1e3, 1e3);
        logger.warn(`正在重试下载... (${retryCount + 1}/${this.maxRetries})，将在 ${delay / 1e3} 秒后重试`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.downloadStream(progressCallback, retryCount + 1);
      } else {
        throw new Error(`在 ${this.maxRetries} 次尝试后下载失败: ${error}`);
      }
    }
  }
  async getfetch() {
    try {
      const result = await this.returnResult();
      if (result.status === 504) {
        return result;
      }
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
  /** 最终地址（跟随重定向） */
  async getLongLink(url = "") {
    try {
      const response = await this.axiosInstance.get(this.url || url);
      return response.request.res.responseUrl;
    } catch (error) {
      const axiosError = error;
      if (axiosError.response && axiosError.response.status === 302) {
        const redirectUrl = axiosError.response.headers.location;
        return this.getLongLink(redirectUrl);
      }
      throw error;
    }
  }
  /** 获取首个302链接 */
  async getLocation() {
    try {
      const response = await this.axiosInstance({
        method: "GET",
        url: this.url,
        maxRedirects: 0,
        // 禁止跟随重定向
        validateStatus: (status) => status >= 300 && status < 400
        // 仅处理3xx响应
      });
      return response.headers.location;
    } catch (error) {
      if (error instanceof AxiosError) {
        logger.error(`获取 ${this.url} 重定向地址失败，接口响应状态码: ${error.response?.status}`);
        throw new Error(error.stack);
      }
    }
  }
  /** 获取数据并处理数据的格式化，默认json */
  async getData() {
    try {
      const result = await this.returnResult();
      if (result.status === 504) {
        return result;
      }
      if (result.status === 429) {
        logger.error("HTTP 响应状态码: 429");
        throw new Error("ratelimit triggered, 触发 https://www.douyin.com/ 的速率限制！！！");
      }
      return result.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.stack ?? error.message);
      }
      return false;
    }
  }
  /**
   * 获取响应头信息（仅首个字节）
   * 适用于获取视频流的完整大小
   * @returns
   */
  async getHeaders() {
    try {
      const response = await this.axiosInstance({
        ...this.config,
        method: "GET",
        headers: {
          ...this.config.headers,
          Range: "bytes=0-0"
        }
      });
      return response.headers;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
  /**
   * 获取响应头信息（完整）
   * @returns
   */
  async getHeadersFull() {
    try {
      const response = await this.axiosInstance({
        ...this.config,
        method: "GET"
      });
      return response.headers;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
const cleanOldDynamicCache = async (platform, days = 7) => {
  const cutoffDate = /* @__PURE__ */ new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const Cache = platform === "douyin" ? douyinModels.AwemeCache : bilibiliModels.DynamicCache;
  const result = await Cache.destroy({
    where: {
      createdAt: {
        [Op.lt]: cutoffDate
      }
    }
  });
  return result;
};
let img$1;
class Bilibili extends Base {
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
        const infoData = await this.amagi.getBilibiliData("单个视频作品数据", { bvid: iddata.bvid, typeMode: "strict" });
        const playUrlData = await this.amagi.getBilibiliData("单个视频下载信息数据", {
          avid: infoData.data.aid,
          cid: iddata.p ? infoData.data.pages[iddata.p - 1]?.cid ?? infoData.data.cid : infoData.data.cid
        });
        bilibiliApiUrls.视频流信息({ avid: infoData.data.aid, cid: infoData.data.cid });
        this.islogin = (await checkCk()).Status === "isLogin";
        const commentsData = await this.amagi.getBilibiliData("评论数据", {
          number: Config.bilibili.numcomment,
          type: 1,
          oid: infoData.data.aid,
          typeMode: "strict"
        });
        const { owner, pic, title, stat } = infoData.data;
        const { name } = owner;
        const { coin, like, share, view, favorite, danmaku } = stat;
        this.downloadfilename = title.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n\s]/g, " ");
        const nockData = await new Networks({
          url: bilibiliApiUrls.视频流信息({
            avid: infoData.data.aid,
            cid: iddata.p ? infoData.data.pages[iddata.p - 1]?.cid ?? infoData.data.cid : infoData.data.cid
          }) + "&platform=html5",
          headers: this.headers
        }).getData();
        await this.e.reply([
          segment.image(pic),
          `
# 标题: ${title}
`,
          `
作者: ${name}
播放量: ${this.count(view)},    弹幕: ${this.count(danmaku)}
点赞: ${this.count(like)},    投币: ${this.count(coin)}
转发: ${this.count(
            share
          )},    收藏: ${this.count(favorite)}`
        ]);
        let videoSize;
        let correctList;
        if (this.islogin) {
          const simplify = playUrlData.data.dash.video.filter((item, index, self) => {
            return self.findIndex((t) => {
              return t.id === item.id;
            }) === index;
          });
          playUrlData.data.dash.video = simplify;
          correctList = await this.processVideos(playUrlData.data.accept_description, simplify, playUrlData.data.dash.audio[0].base_url, infoData.data.bvid);
          playUrlData.data.dash.video = correctList.videoList;
          playUrlData.data.accept_description = correctList.accept_description;
          videoSize = await this.getvideosize(correctList.videoList[0].base_url, playUrlData.data.dash.audio[0].base_url, infoData.data.bvid);
        } else {
          videoSize = (playUrlData.data.durl[0].size / (1024 * 1024)).toFixed(2);
        }
        if (Config.bilibili.comment) {
          const commentsdata = bilibiliComments(commentsData);
          if (!commentsdata.length) {
            await this.e.reply("这个视频没有评论 ~");
          } else {
            img$1 = await Render("bilibili/comment", {
              Type: "视频",
              CommentsData: commentsdata,
              CommentLength: String(commentsdata.length),
              share_url: "https://b23.tv/" + infoData.data.bvid,
              Clarity: Config.bilibili.videopriority === true ? nockData.data.accept_description[0] : correctList.accept_description[0],
              VideoSize: Config.bilibili.videopriority === true ? (nockData.data.durl[0].size / (1024 * 1024)).toFixed(2) : videoSize,
              ImageLength: 0,
              shareurl: "https://b23.tv/" + infoData.data.bvid
            });
            await this.e.reply(img$1);
          }
        }
        if (Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit) && !Config.upload.compress) {
          await this.e.reply(`设定的最大上传大小为 ${Config.upload.filelimit}MB
当前解析到的视频大小为 ${Number(videoSize)}MB
视频太大了，还是去B站看吧~`, { reply: true });
        } else await this.getvideo(Config.bilibili.videopriority === true ? { playUrlData: nockData } : { infoData, playUrlData });
        break;
      }
      case "bangumi_video_info": {
        const videoInfo = await this.amagi.getBilibiliData("番剧基本信息数据", { [iddata.isEpid ? "ep_id" : "season_id"]: iddata.realid, typeMode: "strict" });
        this.islogin = (await checkCk()).Status === "isLogin";
        this.isVIP = (await checkCk()).isVIP;
        const barray = [];
        const msg = [];
        for (let i = 0; i < videoInfo.result.episodes.length; i++) {
          const totalEpisodes = videoInfo.result.episodes.length;
          const long_title = videoInfo.result.episodes[i].long_title;
          const badge = videoInfo.result.episodes[i].badge;
          const short_link = videoInfo.result.episodes[i].short_link;
          barray.push({
            id: i + 1,
            totalEpisodes,
            long_title,
            badge: badge === "" ? "暂无" : badge,
            short_link
          });
          msg.push([
            `
> ## 第${i + 1}集`,
            `
> 标题: ${long_title}`,
            `
> 类型: ${badge !== "预告" ? "正片" : "预告"}`,
            `
> 🔒 播放要求: ${badge === "预告" || badge === "" ? "暂无" : badge}`,
            this.botadapter !== "QQBot" ? `
> 🔗 分享链接: [🔗点击查看](${short_link})\r\r` : ""
          ]);
        }
        img$1 = await Render("bilibili/bangumi", {
          saveId: "bangumi",
          bangumiData: barray,
          title: videoInfo.result.title
        });
        await this.e.reply([...img$1, segment.text("请在120秒内输入 第?集 选择集数")]);
        await this.e.reply(segment.text("请在120秒内输入 第?集 选择集数"));
        const context = await karin.ctx(this.e, { reply: true });
        const regex = /第([一二三四五六七八九十百千万0-9]+)集/.exec(context.msg);
        let Episode;
        if (regex && regex[1]) {
          Episode = regex[1];
          if (/^[一二三四五六七八九十百千万]+$/.test(Episode)) {
            Episode = Common.chineseToArabic(Episode).toString();
          }
          this.downloadfilename = videoInfo.result.episodes[Number(Episode) - 1].share_copy.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n\s]/g, " ");
          this.e.reply(`收到请求，第${Episode}集
${this.downloadfilename}
正在下载中`);
        } else {
          logger.debug(Episode);
          this.e.reply("匹配内容失败，请重新发送链接再次解析");
          return true;
        }
        const bangumidataBASEURL = bilibiliApiUrls.番剧视频流信息({
          cid: videoInfo.result.episodes[Number(Episode) - 1].cid,
          ep_id: videoInfo.result.episodes[Number(Episode) - 1].ep_id.toString()
        });
        const Params = await genParams(bangumidataBASEURL);
        if (!this.islogin) await this.e.reply("B站ck未配置或已失效，无法获取视频流，可尝试【#B站登录】以配置新ck");
        const playUrlData = await new Networks({
          url: bangumidataBASEURL + Params,
          headers: this.headers
        }).getData();
        if (videoInfo.result.episodes[Number(Episode) - 1].badge === "会员" && !this.isVIP) {
          logger.warn("该CK不是大会员，无法获取视频流");
          return true;
        }
        if (Config.bilibili.autoResolution) {
          const simplify = playUrlData.result.dash.video.filter((item, index, self) => {
            return self.findIndex((t) => {
              return t.id === item.id;
            }) === index;
          });
          playUrlData.result.dash.video = simplify;
          const correctList = await this.processVideos(playUrlData.result.accept_description, simplify, playUrlData.result.dash.audio[0].base_url, videoInfo.result.season_id.toString());
          playUrlData.result.dash.video = correctList.videoList;
          playUrlData.result.cept_description = correctList.accept_description;
          await this.getvideo({
            infoData: videoInfo,
            playUrlData
          });
        } else {
          await this.getvideo({
            infoData: videoInfo,
            playUrlData
          });
        }
        break;
      }
      case "dynamic_info": {
        const dynamicInfo = await this.amagi.getBilibiliData("动态详情数据", { dynamic_id: iddata.dynamic_id });
        const dynamicInfoCard = await this.amagi.getBilibiliData("动态卡片数据", { dynamic_id: dynamicInfo.data.item.id_str, typeMode: "strict" });
        const commentsData = await this.amagi.getBilibiliData("评论数据", { type: mapping_table(dynamicInfo.data.item.type), oid: oid(dynamicInfo, dynamicInfoCard), number: Config.bilibili.numcomment, typeMode: "strict" });
        await this.amagi.getBilibiliData("Emoji数据");
        const userProfileData = await this.amagi.getBilibiliData("用户主页数据", { host_mid: dynamicInfo.data.item.modules.module_author.mid, typeMode: "strict" });
        switch (dynamicInfo.data.item.type) {
          /** 图文、纯图 */
          case DynamicType.DRAW: {
            const imgArray = [];
            for (const img2 of dynamicInfo.data.item.modules.module_dynamic.major?.draw?.items) {
              imgArray.push(segment.image(img2.src));
            }
            if (Config.bilibili.comment) {
              const commentsdata = bilibiliComments(commentsData);
              img$1 = await Render("bilibili/comment", {
                Type: "动态",
                CommentsData: commentsdata,
                CommentLength: String(commentsdata?.length ?? 0),
                share_url: "https://t.bilibili.com/" + dynamicInfo.data.item.id_str,
                ImageLength: dynamicInfo.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? "动态中没有附带图片",
                shareurl: "动态分享链接"
              });
              if (imgArray.length === 1) await this.e.reply(imgArray[0]);
              if (imgArray.length > 1) {
                const forwardMsg = common.makeForward(imgArray, this.e.userId, this.e.sender.nick);
                await this.e.bot.sendForwardMsg(this.e.contact, forwardMsg);
              }
              await this.e.reply(img$1);
            }
            const dynamicCARD = JSON.parse(dynamicInfoCard.data.card.card);
            if ("topic" in dynamicInfo.data.item.modules.module_dynamic && dynamicInfo.data.item.modules.module_dynamic.topic !== null) {
              const name = dynamicInfo.data.item.modules.module_dynamic.topic.name;
              dynamicInfo.data.item.modules.module_dynamic.desc.rich_text_nodes.unshift({
                orig_text: name,
                text: name,
                type: "topic"
              });
              dynamicInfo.data.item.modules.module_dynamic.desc.text = `${name}

` + dynamicInfo.data.item.modules.module_dynamic.desc.text;
            }
            await this.e.reply(await Render("bilibili/dynamic/DYNAMIC_TYPE_DRAW", {
              image_url: cover(dynamicCARD.item.pictures),
              text: replacetext(br$3(dynamicInfo.data.item.modules.module_dynamic.desc.text), dynamicInfo.data.item.modules.module_dynamic.desc.rich_text_nodes),
              dianzan: this.count(dynamicInfo.data.item.modules.module_stat.like.count),
              pinglun: this.count(dynamicInfo.data.item.modules.module_stat.comment.count),
              share: this.count(dynamicInfo.data.item.modules.module_stat.forward.count),
              create_time: dynamicInfo.data.item.modules.module_author.pub_time,
              avatar_url: dynamicInfo.data.item.modules.module_author.face,
              frame: dynamicInfo.data.item.modules.module_author.pendant.image,
              share_url: "https://t.bilibili.com/" + dynamicInfo.data.item.id_str,
              username: checkvip$2(userProfileData.data.card),
              fans: this.count(userProfileData.data.follower),
              user_shortid: dynamicInfo.data.item.modules.module_author.mid,
              total_favorited: this.count(userProfileData.data.like_num),
              following_count: this.count(userProfileData.data.card.attention),
              decoration_card: generateDecorationCard(dynamicInfo.data.item.modules.module_author.decorate),
              render_time: Common.getCurrentTime(),
              dynamicTYPE: "图文动态"
            }));
            break;
          }
          /** 纯文 */
          case DynamicType.WORD: {
            const text = replacetext(br$3(dynamicInfo.data.item.modules.module_dynamic.desc.text), dynamicInfo.data.item.modules.module_dynamic.desc.rich_text_nodes);
            await this.e.reply(
              await Render("bilibili/dynamic/DYNAMIC_TYPE_WORD", {
                text,
                dianzan: this.count(dynamicInfo.data.item.modules.module_stat.like.count),
                pinglun: this.count(dynamicInfo.data.item.modules.module_stat.comment.count),
                share: this.count(dynamicInfo.data.item.modules.module_stat.forward.count),
                create_time: dynamicInfo.data.item.modules.module_author.pub_time,
                avatar_url: dynamicInfo.data.item.modules.module_author.face,
                frame: dynamicInfo.data.item.modules.module_author.pendant.image,
                share_url: "https://t.bilibili.com/" + dynamicInfo.data.item.id_str,
                username: checkvip$2(dynamicInfo.data.card),
                fans: this.count(dynamicInfo.data.follower),
                user_shortid: dynamicInfo.data.item.modules.module_author.mid,
                total_favorited: this.count(userProfileData.data.like_num),
                following_count: this.count(userProfileData.data.card.attention),
                dynamicTYPE: "纯文动态"
              })
            );
            await this.e.reply(
              await Render("bilibili/comment", {
                Type: "动态",
                CommentsData: bilibiliComments(commentsData),
                CommentLength: String(bilibiliComments(commentsData)?.length ? bilibiliComments(commentsData).length : 0),
                share_url: "https://t.bilibili.com/" + dynamicInfo.data.item.id_str,
                ImageLength: dynamicInfo.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? "动态中没有附带图片",
                shareurl: "动态分享链接"
              })
            );
            break;
          }
          /** 转发动态 */
          case DynamicType.FORWARD: {
            const text = replacetext(br$3(dynamicInfo.data.item.modules.module_dynamic.desc.text), dynamicInfo.data.item.modules.module_dynamic.desc.rich_text_nodes);
            let data = {};
            switch (dynamicInfo.data.item.orig.type) {
              case DynamicType.AV: {
                data = {
                  username: checkvip$2(dynamicInfo.data.item.orig.modules.module_author),
                  pub_action: dynamicInfo.data.item.orig.modules.module_author.pub_action,
                  avatar_url: dynamicInfo.data.item.orig.modules.module_author.face,
                  duration_text: dynamicInfo.data.item.orig.modules.module_dynamic.major.archive.duration_text,
                  title: dynamicInfo.data.item.orig.modules.module_dynamic.major.archive.title,
                  danmaku: dynamicInfo.data.item.orig.modules.module_dynamic.major.archive.stat.danmaku,
                  play: dynamicInfo.data.item.orig.modules.module_dynamic.major.archive.stat.play,
                  cover: dynamicInfo.data.item.orig.modules.module_dynamic.major.archive.cover,
                  create_time: Common.convertTimestampToDateTime(dynamicInfo.data.item.orig.modules.module_author.pub_ts),
                  decoration_card: generateDecorationCard(dynamicInfo.data.item.orig.modules.module_author.decorate),
                  frame: dynamicInfo.data.item.orig.modules.module_author.pendant.image
                };
                break;
              }
              case DynamicType.DRAW: {
                const dynamicCARD = await getBilibiliData("动态卡片数据", Config.cookies.bilibili, { dynamic_id: dynamicInfo.data.item.orig.id_str });
                const cardData = JSON.parse(dynamicCARD.data.card.card);
                data = {
                  username: checkvip$2(dynamicInfo.data.item.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(dynamicInfo.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.item.orig.modules.module_author.face,
                  text: replacetext(br$3(dynamicInfo.data.item.orig.modules.module_dynamic.desc.text), dynamicInfo.data.item.orig.modules.module_dynamic.desc.rich_text_nodes),
                  image_url: cover(cardData.item.pictures),
                  decoration_card: generateDecorationCard(dynamicInfo.data.item.orig.modules.module_author.decorate),
                  frame: dynamicInfo.data.item.orig.modules.module_author.pendant.image
                };
                break;
              }
              case DynamicType.WORD: {
                data = {
                  username: checkvip$2(dynamicInfo.data.item.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(dynamicInfo.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.item.orig.modules.module_author.face,
                  text: replacetext(br$3(dynamicInfo.data.item.orig.modules.module_dynamic.desc.text), dynamicInfo.data.item.orig.modules.module_dynamic.desc.rich_text_nodes),
                  decoration_card: generateDecorationCard(dynamicInfo.data.item.orig.modules.module_author.decorate),
                  frame: dynamicInfo.data.item.orig.modules.module_author.pendant.image
                };
                break;
              }
              case DynamicType.LIVE_RCMD: {
                const liveData = JSON.parse(dynamicInfo.data.item.orig.modules.module_dynamic.major.live_rcmd.content);
                data = {
                  username: checkvip$2(dynamicInfo.data.item.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(dynamicInfo.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.item.orig.modules.module_author.face,
                  decoration_card: generateDecorationCard(dynamicInfo.data.item.orig.modules.module_author.decorate),
                  frame: dynamicInfo.data.item.orig.modules.module_author.pendant.image,
                  cover: liveData.live_play_info.cover,
                  text_large: liveData.live_play_info.watched_show.text_large,
                  area_name: liveData.live_play_info.area_name,
                  title: liveData.live_play_info.title,
                  online: liveData.live_play_info.online
                };
                break;
              }
              case DynamicType.FORWARD:
              default: {
                logger.warn(`UP主：${userProfileData.data.card.name}的${logger.green("转发动态")}转发的原动态类型为「${logger.yellow(dynamicInfo.data.item.orig.type)}」暂未支持解析`);
                break;
              }
            }
            await this.e.reply(
              await Render("bilibili/dynamic/DYNAMIC_TYPE_FORWARD", {
                text,
                dianzan: this.count(dynamicInfo.data.item.modules.module_stat.like.count),
                pinglun: this.count(dynamicInfo.data.item.modules.module_stat.comment.count),
                share: this.count(dynamicInfo.data.item.modules.module_stat.forward.count),
                create_time: dynamicInfo.data.item.modules.module_author.pub_time,
                avatar_url: dynamicInfo.data.item.modules.module_author.face,
                frame: dynamicInfo.data.item.modules.module_author.pendant.image,
                share_url: "https://t.bilibili.com/" + dynamicInfo.data.item.id_str,
                username: checkvip$2(userProfileData.data.card),
                fans: this.count(userProfileData.data.follower),
                user_shortid: dynamicInfo.data.item.modules.module_author.mid,
                total_favorited: this.count(userProfileData.data.like_num),
                following_count: this.count(userProfileData.data.card.attention),
                dynamicTYPE: "转发动态解析",
                decoration_card: generateDecorationCard(dynamicInfo.data.item.modules.module_author.decorate),
                render_time: Common.getCurrentTime(),
                original_content: { [dynamicInfo.data.item.orig.type]: data }
              })
            );
            break;
          }
          /** 视频动态 */
          case DynamicType.AV: {
            if (dynamicInfo.data.item.modules.module_dynamic.major.type === "MAJOR_TYPE_ARCHIVE") {
              const bvid = dynamicInfo.data.item.modules.module_dynamic.major.archive.bvid;
              const INFODATA = await getBilibiliData("单个视频作品数据", "", { bvid });
              const dycrad = dynamicInfoCard.data.card && dynamicInfoCard.data.card.card && JSON.parse(dynamicInfoCard.data.card.card);
              await this.e.reply(
                await Render("bilibili/comment", {
                  Type: "动态",
                  CommentsData: bilibiliComments(commentsData),
                  CommentLength: String(bilibiliComments(commentsData)?.length ? bilibiliComments(commentsData).length : 0),
                  share_url: "https://www.bilibili.com/video/" + bvid,
                  ImageLength: dynamicInfo.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? "动态中没有附带图片",
                  shareurl: "动态分享链接"
                })
              );
              img$1 = await Render(
                "bilibili/dynamic/DYNAMIC_TYPE_AV",
                {
                  image_url: [{ image_src: INFODATA.data.pic }],
                  text: br$3(INFODATA.data.title),
                  desc: br$3(dycrad.desc),
                  dianzan: this.count(INFODATA.data.stat.like),
                  pinglun: this.count(INFODATA.data.stat.reply),
                  share: this.count(INFODATA.data.stat.share),
                  view: this.count(dycrad.stat.view),
                  coin: this.count(dycrad.stat.coin),
                  duration_text: dynamicInfo.data.item.modules.module_dynamic.major.archive.duration_text,
                  create_time: Common.convertTimestampToDateTime(INFODATA.data.ctime),
                  avatar_url: INFODATA.data.owner.face,
                  frame: dynamicInfo.data.item.modules.module_author.pendant.image,
                  share_url: "https://www.bilibili.com/video/" + bvid,
                  username: checkvip$2(userProfileData.data.card),
                  fans: this.count(userProfileData.data.follower),
                  user_shortid: userProfileData.data.card.mid,
                  total_favorited: this.count(userProfileData.data.like_num),
                  following_count: this.count(userProfileData.data.card.attention),
                  dynamicTYPE: "视频动态"
                }
              );
              await this.e.reply(img$1);
            }
            break;
          }
          default:
            await this.e.reply(`该动态类型「${dynamicInfo.data.item.type}」暂未支持解析`);
            break;
        }
        break;
      }
      case "live_room_detail": {
        const liveInfo = await this.amagi.getBilibiliData("直播间信息", { room_id: iddata.room_id, typeMode: "strict" });
        const roomInitInfo = await this.amagi.getBilibiliData("直播间初始化信息", { room_id: iddata.room_id, typeMode: "strict" });
        const userProfileData = await this.amagi.getBilibiliData("用户主页数据", { host_mid: roomInitInfo.data.uid, typeMode: "strict" });
        if (roomInitInfo.data.live_status === 0) {
          await this.e.reply(`${userProfileData.data.card.name} 未开播，正在休息中~`);
          return true;
        }
        const img2 = await Render(
          "bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
          {
            image_url: [{ image_src: liveInfo.data.user_cover }],
            text: br$3(liveInfo.data.title),
            liveinf: br$3(`${liveInfo.data.area_name} | 房间号: ${liveInfo.data.room_id}`),
            username: userProfileData.data.card.name,
            avatar_url: userProfileData.data.card.face,
            frame: userProfileData.data.card.pendant.image,
            fans: this.count(userProfileData.data.card.fans),
            create_time: liveInfo.data.live_time === "-62170012800" ? "获取失败" : liveInfo.data.live_time,
            now_time: 114514,
            share_url: "https://live.bilibili.com/" + liveInfo.data.room_id,
            dynamicTYPE: "直播"
          }
        );
        await this.e.reply(img2);
        break;
      }
    }
  }
  async getvideo({ infoData, playUrlData }) {
    if (Config.bilibili.videopriority === true) {
      this.islogin = false;
    }
    switch (this.islogin) {
      case true: {
        const bmp4 = await this.DownLoadFile(
          this.Type === "one_video" ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url,
          {
            title: `Bil_V_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`,
            headers: this.headers
          }
        );
        const bmp3 = await this.DownLoadFile(
          this.Type === "one_video" ? playUrlData.data?.dash?.audio[0].base_url : playUrlData.result.dash.audio[0].base_url,
          {
            title: `Bil_A_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp3`,
            headers: this.headers
          }
        );
        if (bmp4.filepath && bmp3.filepath) {
          await mergeFile("二合一（视频 + 音频）", {
            path: bmp4.filepath,
            path2: bmp3.filepath,
            resultPath: Common.tempDri.video + `Bil_Result_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`,
            callback: async (success, resultPath) => {
              if (success) {
                const filePath = Common.tempDri.video + `${Config.app.rmmp4 ? "tmp_" + Date.now() : this.downloadfilename}.mp4`;
                fs.renameSync(resultPath, filePath);
                logger.mark("正在尝试删除缓存文件");
                await this.removeFile(bmp4.filepath, true);
                await this.removeFile(bmp3.filepath, true);
                const stats = fs.statSync(filePath);
                const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
                if (fileSizeInMB > Config.upload.groupfilevalue) {
                  return await this.upload_file({ filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, "", { useGroupFile: true });
                } else {
                  return await this.upload_file({ filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, "");
                }
              } else {
                await this.removeFile(bmp4.filepath, true);
                await this.removeFile(bmp3.filepath, true);
                return true;
              }
            }
          });
        }
        break;
      }
      case false: {
        await this.DownLoadVideo({ video_url: playUrlData.data.durl[0].url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${this.downloadfilename}.mp4` } });
        break;
      }
    }
  }
  async getvideosize(videourl, audiourl, bvid) {
    const videoheaders = await new Networks({ url: videourl, headers: { ...this.headers, Referer: `https://api.bilibili.com/video/${bvid}` } }).getHeaders();
    const audioheaders = await new Networks({ url: audiourl, headers: { ...this.headers, Referer: `https://api.bilibili.com/video/${bvid}` } }).getHeaders();
    const videoSize = videoheaders["content-range"]?.match(/\/(\d+)/) ? parseInt(videoheaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
    const audioSize = audioheaders["content-range"]?.match(/\/(\d+)/) ? parseInt(audioheaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
    const videoSizeInMB = (videoSize / (1024 * 1024)).toFixed(2);
    const audioSizeInMB = (audioSize / (1024 * 1024)).toFixed(2);
    const totalSizeInMB = parseFloat(videoSizeInMB) + parseFloat(audioSizeInMB);
    return totalSizeInMB.toFixed(2);
  }
  /**
   * 检出应该下载的视频流
   * @param data 视频流数据
   * @returns 经过排除后的视频流数据（删减不符合Config.upload.filelimit条件的视频流）
   */
  /**
   * 检出符合大小的视频流信息对象
   * @param accept_description 视频流清晰度列表
   * @param videoList 包含所有清晰度的视频流信息对象
   * @param audioUrl 音频流地址
   * @param bvid 视频bvid（BV号）
   * @returns
   */
  async processVideos(accept_description, videoList, audioUrl, bvid) {
    const results = {};
    for (const video of videoList) {
      const size = await this.getvideosize(video.base_url, audioUrl, bvid);
      results[video.id] = size;
    }
    const sizes = Object.values(results).map((size) => parseFloat(size.replace("MB", "")));
    let closestId = null;
    let smallestDifference = Infinity;
    sizes.forEach((size, index) => {
      if (size <= Config.upload.filelimit) {
        const difference = Math.abs(size - Config.upload.filelimit);
        if (difference < smallestDifference) {
          smallestDifference = difference;
          closestId = Object.keys(results)[index];
        }
      }
    });
    if (closestId !== null) {
      const closestQuality = qnd[Number(closestId)];
      accept_description = accept_description.filter((desc) => desc === closestQuality);
      if (accept_description.length === 0) {
        accept_description = [closestQuality];
      }
      const video = videoList.find((video2) => video2.id === Number(closestId));
      videoList = [video];
    } else {
      videoList = [[...videoList].pop()];
      accept_description = [[...accept_description].pop()];
    }
    return {
      accept_description,
      videoList
    };
  }
}
function checkvip$2(member) {
  return member.vip.vipStatus || member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#e9e9e9" : "#313131"}; font-weight: 700;">${member.name}</span>`;
}
function br$3(data) {
  return data = data.replace(/\n/g, "<br>");
}
function replacetext(text, rich_text_nodes) {
  for (const tag of rich_text_nodes) {
    const escapedText = tag.orig_text.replace(/([.*+?^${}()|[\]\\])/g, "\\$1").replace(/\n/g, "\\n");
    const regex = new RegExp(escapedText, "g");
    switch (tag.type) {
      case "topic": {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width: 80px;height: 80px;margin: 0 -25px -25px 0;" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="opus-module-topic__icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.4302 2.57458C11.4416 2.51023 11.4439 2.43974 11.4218 2.3528C11.3281 1.98196 10.9517 1.72037 10.5284 1.7527C10.432 1.76018 10.3599 1.78383 10.297 1.81376C10.2347 1.84398 10.1832 1.88155 10.1401 1.92465C10.1195 1.94485 10.1017 1.96692 10.0839 1.98897L10.0808 1.99289L10.0237 2.06277L9.91103 2.2033C9.76177 2.39141 9.61593 2.58191 9.47513 2.77556C9.33433 2.96936 9.19744 3.16585 9.06672 3.36638C9.00275 3.46491 8.93968 3.56401 8.87883 3.66461L8.56966 3.6613C8.00282 3.6574 7.43605 3.65952 6.86935 3.67034C6.80747 3.56778 6.74325 3.46677 6.67818 3.3664C6.54732 3.16585 6.41045 2.96934 6.26968 2.77568C6.12891 2.58186 5.98309 2.39134 5.83387 2.20322L5.72122 2.06268L5.66416 1.99279L5.6622 1.99036C5.64401 1.96783 5.62586 1.94535 5.60483 1.92454C5.56192 1.88144 5.51022 1.84388 5.44797 1.81364C5.38522 1.78386 5.31305 1.76006 5.21665 1.75273C4.80555 1.72085 4.4203 1.97094 4.32341 2.35273C4.30147 2.43968 4.30358 2.51018 4.31512 2.57453C4.32715 2.63859 4.34975 2.69546 4.38112 2.74649C4.39567 2.77075 4.41283 2.79315 4.42999 2.81557C4.43104 2.81694 4.43209 2.81831 4.43314 2.81968L4.48759 2.89122L4.59781 3.03355C4.74589 3.22242 4.89739 3.40905 5.05377 3.59254C5.09243 3.63788 5.13136 3.68306 5.17057 3.72785C4.99083 3.73681 4.81112 3.7467 4.63143 3.75756C4.41278 3.771 4.19397 3.78537 3.97547 3.80206L3.64757 3.82786L3.48362 3.84177L3.39157 3.85181C3.36984 3.8543 3.34834 3.8577 3.32679 3.86111C3.31761 3.86257 3.30843 3.86402 3.29921 3.86541C3.05406 3.90681 2.81526 3.98901 2.59645 4.10752C2.37765 4.22603 2.17867 4.38039 2.00992 4.56302C1.84117 4.74565 1.70247 4.95593 1.60144 5.18337C1.50025 5.4105 1.43687 5.65447 1.41362 5.90153C1.33103 6.77513 1.27663 7.6515 1.25742 8.5302C1.23758 9.40951 1.25835 10.2891 1.3098 11.1655C1.32266 11.3846 1.33738 11.6035 1.35396 11.8223L1.38046 12.1505L1.39472 12.3144L1.39658 12.335L1.39906 12.3583L1.40417 12.4048C1.40671 12.4305 1.41072 12.4558 1.41473 12.4811C1.41561 12.4866 1.41648 12.4922 1.41734 12.4977C1.45717 12.7449 1.53806 12.9859 1.65567 13.2074C1.77314 13.4289 1.92779 13.6304 2.11049 13.8022C2.29319 13.974 2.50441 14.1159 2.73329 14.2197C2.96201 14.3235 3.2084 14.3901 3.45836 14.4135C3.47066 14.415 3.48114 14.4159 3.49135 14.4167C3.49477 14.417 3.49817 14.4173 3.50159 14.4176L3.5425 14.4212L3.62448 14.4283L3.78843 14.4417L4.11633 14.4674C4.33514 14.4831 4.55379 14.4983 4.7726 14.5111C6.52291 14.6145 8.27492 14.6346 10.0263 14.5706C10.4642 14.5547 10.9019 14.5332 11.3396 14.5062C11.5584 14.4923 11.7772 14.4776 11.9959 14.4604L12.3239 14.434L12.4881 14.4196L12.5813 14.4093C12.6035 14.4065 12.6255 14.403 12.6474 14.3995C12.6565 14.3981 12.6655 14.3966 12.6746 14.3952C12.9226 14.3527 13.1635 14.2691 13.3844 14.1486C13.6052 14.0284 13.8059 13.8716 13.9759 13.6868C14.1463 13.5022 14.2861 13.2892 14.3874 13.0593C14.4381 12.9444 14.4793 12.8253 14.5108 12.7037C14.519 12.6734 14.5257 12.6428 14.5322 12.612L14.5421 12.566L14.55 12.5196C14.5556 12.4887 14.5607 12.4578 14.5641 12.4266C14.5681 12.3959 14.5723 12.363 14.5746 12.3373C14.6642 11.4637 14.7237 10.5864 14.7435 9.70617C14.764 8.825 14.7347 7.94337 14.6719 7.06715C14.6561 6.8479 14.6385 6.62896 14.6183 6.41033L14.5867 6.08246L14.5697 5.91853L14.5655 5.87758C14.5641 5.86445 14.5618 5.8473 14.5599 5.83231C14.5588 5.8242 14.5578 5.81609 14.5567 5.80797C14.5538 5.78514 14.5509 5.76229 14.5466 5.7396C14.5064 5.49301 14.4252 5.25275 14.3067 5.03242C14.1886 4.81208 14.0343 4.61153 13.8519 4.44095C13.6695 4.27038 13.4589 4.12993 13.2311 4.02733C13.0033 3.92458 12.7583 3.85907 12.5099 3.83636C12.4974 3.83492 12.4865 3.83394 12.4759 3.833C12.4729 3.83273 12.4698 3.83246 12.4668 3.83219L12.4258 3.82879L12.3438 3.82199L12.1798 3.80886L11.8516 3.78413C11.633 3.76915 11.4143 3.75478 11.1955 3.74288C10.993 3.73147 10.7904 3.72134 10.5878 3.71243L10.6914 3.59236C10.8479 3.40903 10.9992 3.22242 11.1473 3.03341L11.2576 2.89124L11.312 2.81971C11.3136 2.81773 11.3151 2.81575 11.3166 2.81377C11.3333 2.79197 11.3501 2.77013 11.3641 2.74653C11.3954 2.6955 11.418 2.63863 11.4302 2.57458ZM9.33039 5.49268C9.38381 5.16945 9.67705 4.95281 9.98536 5.00882L9.98871 5.00944C10.2991 5.06783 10.5063 5.37802 10.4524 5.70377L10.2398 6.99039L11.3846 6.9904C11.7245 6.9904 12 7.27925 12 7.63557C12 7.99188 11.7245 8.28073 11.3846 8.28073L10.0266 8.28059L9.7707 9.82911L11.0154 9.82913C11.3553 9.82913 11.6308 10.118 11.6308 10.4743C11.6308 10.8306 11.3553 11.1195 11.0154 11.1195L9.55737 11.1195L9.32807 12.5073C9.27465 12.8306 8.98141 13.0472 8.6731 12.9912L8.66975 12.9906C8.35937 12.9322 8.1522 12.622 8.20604 12.2962L8.40041 11.1195H6.89891L6.66961 12.5073C6.61619 12.8306 6.32295 13.0472 6.01464 12.9912L6.01129 12.9906C5.7009 12.9322 5.49374 12.622 5.54758 12.2962L5.74196 11.1195L4.61538 11.1195C4.27552 11.1195 4 10.8306 4 10.4743C4 10.118 4.27552 9.82913 4.61538 9.82913L5.95514 9.82911L6.21103 8.28059L4.98462 8.28073C4.64475 8.28073 4.36923 7.99188 4.36923 7.63557C4.36923 7.27925 4.64475 6.9904 4.98462 6.9904L6.42421 6.99039L6.67193 5.49268C6.72535 5.16945 7.01859 4.95281 7.3269 5.00882L7.33025 5.00944C7.64063 5.06783 7.8478 5.37802 7.79396 5.70377L7.58132 6.99039H9.08281L9.33039 5.49268ZM8.61374 9.82911L8.86963 8.28059H7.36813L7.11225 9.82911H8.61374Z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
        break;
      }
      case "RICH_TEXT_NODE_TYPE_TOPIC":
      case "RICH_TEXT_NODE_TYPE_AT": {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};">${tag.orig_text}</span>`);
        break;
      }
      case "RICH_TEXT_NODE_TYPE_LOTTERY": {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width: 65px;height: 65px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M3.7499750000000005 9.732083333333334C4.095158333333333 9.732083333333334 4.374975 10.011875000000002 4.374975 10.357083333333334L4.374975 15.357083333333334C4.374975 15.899458333333335 4.8147 16.339166666666667 5.357116666666667 16.339166666666667L14.642833333333334 16.339166666666667C15.185250000000002 16.339166666666667 15.625 15.899458333333335 15.625 15.357083333333334L15.625 10.357083333333334C15.625 10.011875000000002 15.904791666666668 9.732083333333334 16.25 9.732083333333334C16.595166666666668 9.732083333333334 16.875 10.011875000000002 16.875 10.357083333333334L16.875 15.357083333333334C16.875 16.589833333333335 15.875625000000001 17.589166666666667 14.642833333333334 17.589166666666667L5.357116666666667 17.589166666666667C4.124341666666667 17.589166666666667 3.124975 16.589833333333335 3.124975 15.357083333333334L3.124975 10.357083333333334C3.124975 10.011875000000002 3.4048 9.732083333333334 3.7499750000000005 9.732083333333334z" fill="currentColor"></path><path d="M2.4106916666666667 7.3214250000000005C2.4106916666666667 6.384516666666666 3.1702083333333335 5.625 4.107116666666667 5.625L15.892833333333334 5.625C16.82975 5.625 17.58925 6.384516666666666 17.58925 7.3214250000000005L17.58925 8.917583333333335C17.58925 9.74225 16.987583333333337 10.467208333333334 16.13125 10.554C15.073666666666668 10.661208333333335 13.087708333333333 10.803583333333334 10 10.803583333333334C6.912275 10.803583333333334 4.9263 10.661208333333335 3.8687250000000004 10.554C3.0123833333333336 10.467208333333334 2.4106916666666667 9.74225 2.4106916666666667 8.917583333333335L2.4106916666666667 7.3214250000000005zM4.107116666666667 6.875C3.8605666666666667 6.875 3.6606916666666667 7.0748750000000005 3.6606916666666667 7.3214250000000005L3.6606916666666667 8.917583333333335C3.6606916666666667 9.135250000000001 3.8040833333333333 9.291041666666667 3.9947583333333334 9.310375C5.0068 9.412958333333334 6.950525000000001 9.553583333333334 10 9.553583333333334C13.049458333333334 9.553583333333334 14.993166666666669 9.412958333333334 16.005166666666668 9.310375C16.195875 9.291041666666667 16.33925 9.135250000000001 16.33925 8.917583333333335L16.33925 7.3214250000000005C16.33925 7.0748750000000005 16.139375 6.875 15.892833333333334 6.875L4.107116666666667 6.875z" fill="currentColor"></path><path d="M5.446408333333333 4.464341666666667C5.446408333333333 3.1329416666666665 6.525716666666667 2.0536333333333334 7.857116666666667 2.0536333333333334C9.188541666666666 2.0536333333333334 10.267833333333334 3.1329416666666665 10.267833333333334 4.464341666666667L10.267833333333334 6.875058333333333L7.857116666666667 6.875058333333333C6.525716666666667 6.875058333333333 5.446408333333333 5.795741666666666 5.446408333333333 4.464341666666667zM7.857116666666667 3.3036333333333334C7.216075000000001 3.3036333333333334 6.696408333333334 3.8233 6.696408333333334 4.464341666666667C6.696408333333334 5.105391666666667 7.216075000000001 5.6250583333333335 7.857116666666667 5.6250583333333335L9.017833333333334 5.6250583333333335L9.017833333333334 4.464341666666667C9.017833333333334 3.8233 8.498166666666668 3.3036333333333334 7.857116666666667 3.3036333333333334z" fill="currentColor"></path><path d="M9.732083333333334 4.464341666666667C9.732083333333334 3.1329416666666665 10.811416666666666 2.0536333333333334 12.142833333333334 2.0536333333333334C13.474250000000001 2.0536333333333334 14.553583333333336 3.1329416666666665 14.553583333333336 4.464341666666667C14.553583333333336 5.795741666666666 13.474250000000001 6.875058333333333 12.142833333333334 6.875058333333333L9.732083333333334 6.875058333333333L9.732083333333334 4.464341666666667zM12.142833333333334 3.3036333333333334C11.501791666666666 3.3036333333333334 10.982083333333334 3.8233 10.982083333333334 4.464341666666667L10.982083333333334 5.6250583333333335L12.142833333333334 5.6250583333333335C12.783875 5.6250583333333335 13.303583333333334 5.105391666666667 13.303583333333334 4.464341666666667C13.303583333333334 3.8233 12.783875 3.3036333333333334 12.142833333333334 3.3036333333333334z" fill="currentColor"></path><path d="M10 4.732058333333334C10.345166666666666 4.732058333333334 10.625 5.011875 10.625 5.357058333333334L10.625 16.428500000000003C10.625 16.773666666666667 10.345166666666666 17.053500000000003 10 17.053500000000003C9.654791666666668 17.053500000000003 9.375 16.773666666666667 9.375 16.428500000000003L9.375 5.357058333333334C9.375 5.011875 9.654791666666668 4.732058333333334 10 4.732058333333334z" fill="currentColor"></path></svg> ${tag.orig_text}</span>`);
        break;
      }
      case "RICH_TEXT_NODE_TYPE_WEB": {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width: 60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M9.571416666666666 7.6439C9.721125 7.33675 10.091416666666667 7.209108333333334 10.398583333333335 7.358808333333333C10.896041666666667 7.540316666666667 11.366333333333333 7.832000000000001 11.767333333333333 8.232975C13.475833333333334 9.941541666666668 13.475833333333334 12.711625 11.767333333333333 14.420166666666669L9.704916666666666 16.482583333333334C7.996383333333334 18.191125000000003 5.226283333333334 18.191125000000003 3.5177416666666668 16.482583333333334C1.8091916666666668 14.774041666666669 1.8091916666666668 12.003916666666667 3.5177416666666668 10.295375L5.008791666666667 8.804333333333334C5.252875 8.56025 5.6486 8.56025 5.892683333333334 8.804333333333334C6.136758333333334 9.048416666666668 6.136758333333334 9.444125000000001 5.892683333333334 9.688208333333334L4.401625 11.179250000000001C3.1812333333333336 12.399666666666667 3.1812333333333336 14.378291666666668 4.401625 15.598708333333335C5.622000000000001 16.819083333333335 7.60065 16.819083333333335 8.821041666666668 15.598708333333335L10.883416666666667 13.536291666666667C12.103833333333334 12.315916666666666 12.103833333333334 10.337250000000001 10.883416666666667 9.116875C10.582458333333333 8.815875 10.229416666666667 8.600908333333333 9.856458333333334 8.471066666666667C9.549333333333333 8.321375 9.421708333333335 7.9510499999999995 9.571416666666666 7.6439z" fill="currentColor"></path><path d="M15.597541666666668 4.402641666666667C14.377166666666668 3.1822500000000002 12.398541666666667 3.1822500000000002 11.178125000000001 4.402641666666667L9.11575 6.465033333333333C7.895358333333333 7.685425 7.895358333333333 9.664041666666668 9.11575 10.884458333333333C9.397666666666668 11.166375 9.725916666666667 11.371583333333334 10.073083333333333 11.500958333333333C10.376583333333334 11.658083333333334 10.495291666666667 12.031416666666667 10.338208333333332 12.334875C10.181083333333333 12.638375 9.80775 12.757083333333334 9.504291666666667 12.6C9.042416666666666 12.420333333333334 8.606383333333333 12.142833333333334 8.231858333333333 11.768333333333334C6.523316666666667 10.059791666666667 6.523316666666667 7.289691666666666 8.231858333333333 5.58115L10.29425 3.5187583333333334C12.002791666666667 1.8102083333333334 14.772875 1.8102083333333334 16.481458333333336 3.5187583333333334C18.19 5.2273000000000005 18.19 7.997400000000001 16.481458333333336 9.705916666666667L15.054916666666667 11.132458333333334C14.810875000000001 11.3765 14.415166666666668 11.3765 14.171041666666667 11.132458333333334C13.927 10.888333333333334 13.927 10.492625 14.171041666666667 10.248541666666666L15.597541666666668 8.822041666666667C16.81791666666667 7.601666666666667 16.81791666666667 5.623025 15.597541666666668 4.402641666666667z" fill="currentColor"></path></svg> ${tag.text}</span>`);
        break;
      }
      case "RICH_TEXT_NODE_TYPE_EMOJI": {
        const regex2 = new RegExp(tag.orig_text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
        text = text.replace(regex2, `<img src='${tag.emoji.icon_url}' style='height: 60px; margin: 0 0 -10px 0;'>`);
        break;
      }
    }
  }
  return text;
}
const qnd = {
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
  const gradientString = colors.map((color) => {
    return `${color}`;
  }).join(", ");
  return `<span style="font-family: bilifont; color: transparent; background-clip: text; margin: 0 200px 0 0; font-size: 43px; background-image: linear-gradient(135deg, ${gradientString} 0%, ${gradientString} 100%); ">${text}</span>`;
};
const cover = (pic) => {
  const imgArray = [];
  for (const i of pic) {
    const obj = {
      image_src: i.img_src
    };
    imgArray.push(obj);
  }
  return imgArray;
};
const generateDecorationCard = (decorate) => {
  return decorate ? `<div style="display: flex; width: 500px; height: 150px; background-position: center; background-attachment: fixed; background-repeat: no-repeat; background-size: contain; align-items: center; justify-content: flex-end; background-image: url('${decorate.card_url}')">${generateGradientStyle(decorate.fan?.color_format?.colors, decorate.fan.num_str)}</div>` : "<div></div>";
};
function mapping_table(type) {
  const Array2 = {
    1: ["DYNAMIC_TYPE_AV", "DYNAMIC_TYPE_PGC", "DYNAMIC_TYPE_UGC_SEASON"],
    11: ["DYNAMIC_TYPE_DRAW"],
    12: ["DYNAMIC_TYPE_ARTICLE"],
    17: ["DYNAMIC_TYPE_LIVE_RCMD", "DYNAMIC_TYPE_FORWARD", "DYNAMIC_TYPE_WORD", "DYNAMIC_TYPE_COMMON_SQUARE"],
    19: ["DYNAMIC_TYPE_MEDIALIST"]
  };
  for (const key in Array2) {
    if (Array2[key].includes(type)) {
      return parseInt(key, 10);
    }
  }
  return 1;
}
function oid(dynamicINFO, dynamicInfoCard) {
  switch (dynamicINFO.data.item.type) {
    case "DYNAMIC_TYPE_WORD":
    case "DYNAMIC_TYPE_FORWARD": {
      return dynamicINFO.data.item.id_str;
    }
    default: {
      return dynamicInfoCard.data.card.desc.rid;
    }
  }
}
function bilibiliComments(commentsData) {
  if (!commentsData) return [];
  let jsonArray = [];
  for (let i = 0; i < commentsData.data.replies.length; i++) {
    const ctime = getRelativeTimeFromTimestamp$1(commentsData.data.replies[i].ctime);
    const emote = commentsData.data.replies[i].content.emote;
    let message = commentsData.data.replies[i].content.message;
    if (message && emote) message = emoteToUrl(message, emote);
    const avatar = commentsData.data.replies[i].member.avatar;
    const frame = commentsData.data.replies[i].member.pendant.image;
    const uname = checkvip$1(commentsData.data.replies[i].member);
    const level = commentsData.data.replies[i].member.level_info.current_level;
    const vipstatus = commentsData.data.replies[i].member.vip.status;
    const like = commentsData.data.replies[i].like;
    const replylength = commentsData.data.replies[i].rcount;
    const location = commentsData.data.replies[i].reply_control.location.replace("IP属地：", "");
    const img_src = commentsData.data.replies[i].content && commentsData.data.replies[i].content.pictures && commentsData.data.replies[i].content.pictures.length > 0 ? commentsData.data.replies[i].content.pictures[0].img_src : null;
    const members = commentsData.data.replies[i].content.members;
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
      members
    };
    jsonArray.push(obj);
  }
  jsonArray.sort((a, b) => b.like - a.like);
  for (const i of jsonArray) {
    if (i.like > 1e4) {
      i.like = (i.like / 1e4).toFixed(1) + "w";
    }
  }
  jsonArray = space(jsonArray);
  for (const comment of jsonArray) {
    let originalText = comment.message;
    if (comment.members && comment.members.length > 0) {
      for (const member of comment.members) {
        const regex = new RegExp(`@${member.uname}`, "g");
        originalText = originalText.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};">@${member.uname}</span>`);
      }
    }
    comment.message = originalText;
  }
  let res;
  res = checklevel(jsonArray);
  res = br$2(res);
  return res;
}
const emoteToUrl = (message, emote) => {
  for (const key in emote) {
    if (emote.hasOwnProperty(key)) {
      if (message.includes(key)) {
        if (message.includes("[") && message.includes("]")) {
          message = message.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), `<img src="${emote[key].url}"/>`);
        }
      }
    }
  }
  return message;
};
function space(data) {
  for (const i in data) {
    if (data[i].message) {
      data[i].message = data[i].message.replace(/ /g, " ");
    }
  }
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
function checklevel(obj) {
  for (const i of obj) {
    switch (i.level) {
      case 6: {
        if (i.viptype === 1) {
          i.uname += '<svg t="1641538980838" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2673" width="200" height="200" class="icon"><path d="M154.916571 184.758857h1609.142858v707.364572h-1609.142858z" fill="#FFFFFF" p-id="2674"></path><path d="M1779.565714 93.037714c22.674286 0 45.421714 20.772571 44.324572 43.300572l-0.877715 6.144v747.446857c0 22.454857-15.36 44.909714-41.472 48.859428l-8.118857 0.585143H144.603429a48.859429 48.859429 0 0 1-49.005715-41.325714l-0.585143-8.118857V228.937143c0-22.454857 15.36-44.909714 41.398858-48.786286l8.192-0.585143h1021.805714v-37.083428c0-22.454857 15.36-44.909714 41.398857-48.786286l8.118857-0.658286h563.565714z m-92.891428 105.033143h-383.926857c-16.457143 0-32.914286 14.628571-36.425143 30.939429l-0.658286 6.144v574.464c0 16.457143 14.628571 32.914286 30.939429 36.425143l6.144 0.658285h384c16.530286 0 32.987429-14.628571 36.498285-30.939428l0.658286-6.144V494.592c0-16.530286-14.628571-32.914286-31.012571-36.425143l-6.144-0.658286h-297.179429V321.609143h297.179429c16.530286 0 32.987429-14.628571 36.498285-30.939429l0.658286-6.144v-49.371428c0-18.578286-18.578286-37.083429-37.156571-37.083429zM733.110857 284.598857h-49.590857c-18.578286 0-37.156571 18.505143-37.156571 37.010286v302.738286c0 16.749714 0 31.817143 6.217142 37.010285l173.348572 172.909715c7.899429 7.899429 23.259429 10.752 33.426286 11.849142l9.947428 0.585143 8.557714-0.438857c10.093714-0.950857 26.550857-3.657143 34.816-11.995428l185.782858-172.909715c4.973714-4.900571 5.997714-13.824 6.144-23.478857V327.68c0-18.505143-18.505143-37.010286-37.083429-37.010286h-49.517714c-18.651429 0-37.156571 18.505143-37.156572 37.083429v277.942857l-105.325714 104.96-105.325714-104.96V321.609143c0-18.505143-18.505143-37.010286-37.083429-37.010286z m-445.952 0h-49.517714c-16.530286 0-33.060571 14.628571-36.571429 30.866286l-0.585143 6.144v488.009143c0 16.530286 14.628571 32.914286 30.939429 36.425143l6.217143 0.658285h297.252571c16.530286 0 32.987429-14.628571 36.498286-30.939428l0.658286-6.144v-49.371429c0-16.603429-14.628571-32.987429-31.012572-36.425143l-6.144-0.658285H324.242286v-401.554286c0-18.505143-18.578286-37.010286-37.156572-37.010286z m1312.914286 296.448v142.116572h-210.505143V581.046857h210.505143z" fill="#FF0000" p-id="2675" class="bg"></path></svg>';
        } else {
          i.uname += '<svg t="1641541042505" viewBox="0 0 2633 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3185" width="200" height="200" class="icon"><path d="M169.545143 163.181714h2248.923428v707.364572H169.545143z" fill="#FFFFFF" p-id="3186"></path><path d="M2510.994286 73.142857c22.747429 0 45.494857 20.772571 44.397714 43.300572l-0.950857 6.144v747.446857c0 22.381714-15.36 44.909714-41.472 48.786285l-8.118857 0.585143H144.676571a48.859429 48.859429 0 0 1-49.005714-41.252571l-0.512-8.118857V209.042286c0-22.454857 15.36-44.982857 41.398857-48.859429l8.118857-0.585143h1021.805715v-37.010285c0-22.454857 15.36-44.982857 41.472-48.859429l8.045714-0.585143h1295.067429zM2170.88 174.518857l-272.310857 370.614857a27.867429 27.867429 0 0 0 22.528 44.397715h176.713143l-30.427429 210.944c-4.169143 28.745143 32.914286 43.958857 50.176 20.48l272.237714-370.541715a27.940571 27.940571 0 0 0-22.528-44.470857h-176.713142l30.427428-210.870857c4.169143-28.818286-32.914286-43.958857-50.102857-20.553143z m-484.059429 3.584h-384c-18.505143 0-37.010286 18.578286-37.010285 37.083429v574.464c0 18.578286 18.505143 37.083429 37.083428 37.083428h384c18.505143 0 37.083429-18.505143 37.083429-37.083428V474.624c0-18.505143-18.578286-37.010286-37.156572-37.010286h-297.179428V301.714286h297.179428c18.578286 0 37.156571-18.578286 37.156572-37.083429v-49.444571c0-18.505143-18.578286-37.083429-37.156572-37.083429zM733.037714 264.630857h-49.517714c-18.578286 0-37.156571 18.505143-37.156571 37.083429v302.665143c0 16.822857 0 31.817143 6.217142 37.083428l173.348572 172.909714c12.434286 12.361143 43.373714 12.361143 43.373714 12.361143s30.939429 0 43.373714-12.361143l185.782858-172.909714c6.144-6.217143 6.144-18.578286 6.144-30.866286V307.858286c0-18.505143-18.578286-37.010286-37.156572-37.010286h-49.444571c-18.651429 0-37.229714 18.505143-37.229715 37.010286V585.874286l-105.325714 104.96L770.194286 585.874286V301.714286c0-18.578286-18.578286-37.083429-37.156572-37.083429z m-445.878857 0h-49.590857c-16.530286 0-32.987429 14.628571-36.498286 30.939429l-0.658285 6.144v488.009143c0 16.457143 14.628571 32.914286 31.012571 36.352l6.144 0.658285h297.252571c16.530286 0 33.060571-14.628571 36.571429-30.866285l0.585143-6.144v-49.444572c0-16.530286-14.628571-32.914286-30.939429-36.425143l-6.217143-0.658285H324.315429V301.714286c0-18.578286-18.578286-37.083429-37.156572-37.083429z m1312.914286 296.521143v142.043429h-210.505143V561.152h210.432z" fill="#FF0000" p-id="3187" class="bg"></path></svg>';
        }
        break;
      }
      case 5: {
        i.uname += '<svg t="1641540971221" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3057" width="200" height="200" class="icon"><path d="M154.916571 169.691429h1609.142858v707.364571h-1609.142858z" fill="#FFFFFF" p-id="3058"></path><path d="M1779.565714 73.142857c24.795429 0 49.590857 24.722286 43.446857 49.444572v747.446857a48.859429 48.859429 0 0 1-49.590857 49.371428H144.603429a48.786286 48.786286 0 0 1-49.590858-49.371428V209.042286c0-24.722286 18.578286-49.444571 49.590858-49.444572h1021.805714v-37.010285c0-24.722286 18.578286-49.444571 49.517714-49.444572h563.565714zM733.037714 264.630857h-49.590857c-18.578286 0-37.156571 18.578286-37.156571 37.083429v302.665143c0 12.507429 0 31.232 6.217143 37.083428l173.348571 172.909714c11.044571 10.971429 36.790857 12.214857 42.349714 12.434286h1.024s31.012571 0 43.373715-12.434286l185.782857-172.909714c6.217143-6.217143 6.217143-18.505143 6.217143-30.866286V307.858286c0-18.505143-18.578286-37.010286-37.156572-37.010286h-49.517714c-18.651429 0-37.156571 18.505143-37.156572 37.010286v277.942857l-105.325714 105.033143-105.325714-104.96V301.714286c0-18.505143-18.505143-37.083429-37.083429-37.083429z m-445.952 0h-49.517714c-18.578286 0-37.156571 18.578286-37.156571 37.083429v488.009143c0 18.505143 18.578286 37.010286 37.156571 37.010285h297.252571c18.578286 0 37.156571-18.505143 37.156572-37.010285v-49.444572c0-18.578286-18.578286-37.083429-37.156572-37.083428H324.242286v-401.554286c0-18.432-18.578286-37.010286-37.156572-37.010286z m1399.661715-92.672h-384c-18.578286 0-37.083429 18.505143-37.083429 37.010286v315.026286c0 18.578286 18.505143 37.083429 37.083429 37.083428h297.252571v142.116572h-297.252571c-18.578286 0-37.083429 18.432-37.083429 37.010285v49.444572c0 18.505143 18.505143 37.083429 37.083429 37.083428h384c18.578286 0 37.156571-18.578286 37.156571-37.083428V474.624c0-18.505143-18.578286-37.083429-37.156571-37.083429h-297.179429V301.641143h297.179429c18.578286 0 37.156571-18.505143 37.156571-37.083429v-55.588571c0-18.505143-18.578286-37.010286-37.156571-37.010286z" fill="#EE672A" p-id="3059" class="bg"></path></svg>';
        break;
      }
      case 4: {
        i.uname += '<svg t="1641540850378" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2929" width="200" height="200" class="icon"><path d="M154.916571 159.890286h1609.142858v707.364571h-1609.142858z" fill="#FFFFFF" p-id="2930"></path><path d="M1757.622857 73.142857c24.795429 0 49.517714 24.722286 43.373714 49.444572v747.446857a48.859429 48.859429 0 0 1-49.590857 49.371428H122.660571A48.786286 48.786286 0 0 1 73.142857 870.034286V209.042286c0-24.722286 18.578286-49.444571 49.517714-49.444572h1021.805715v-37.010285c0-24.722286 18.651429-49.444571 49.590857-49.444572h563.565714zM710.948571 264.630857h-49.517714c-18.578286 0-37.156571 18.578286-37.156571 37.083429v309.248c0.146286 13.238857 0.877714 26.770286 6.217143 30.500571l173.348571 172.909714c12.434286 12.434286 43.373714 12.434286 43.373714 12.434286h1.097143c5.558857-0.219429 31.232-1.462857 42.276572-12.434286l185.782857-172.909714c6.217143-6.217143 6.217143-18.505143 6.217143-30.866286V307.858286c0-18.505143-18.578286-37.010286-37.156572-37.010286h-49.517714c-18.651429 0-37.229714 18.505143-37.229714 37.010286v277.942857l-105.325715 105.033143L748.251429 585.874286V301.714286c0-18.505143-18.651429-37.083429-37.156572-37.083429z m-445.878857 0h-49.590857c-18.578286 0-37.156571 18.578286-37.156571 37.083429v488.009143c0 18.505143 18.578286 37.010286 37.156571 37.010285h297.325714c18.578286 0 37.156571-18.505143 37.156572-37.010285v-49.444572c0-18.578286-18.578286-37.083429-37.156572-37.083428h-210.651428v-401.554286c0-18.432-18.505143-37.010286-37.083429-37.010286z m1065.179429-92.672h-49.517714c-18.578286 0-37.083429 18.505143-37.083429 37.010286v315.026286c0 18.578286 18.505143 37.083429 37.083429 37.083428h297.252571v228.571429c0 18.505143 18.578286 37.083429 37.229714 37.083428h49.517715c18.578286 0 37.156571-18.578286 37.156571-37.083428V208.969143c0-18.505143-18.578286-37.010286-37.156571-37.010286h-49.517715c-18.651429 0-37.229714 18.505143-37.229714 37.010286v228.571428h-210.505143V208.969143c0-18.505143-18.651429-37.010286-37.229714-37.010286z" fill="#FEBB8B" p-id="2931" class="bg"></path></svg>';
        break;
      }
      case 3: {
        i.uname += '<svg t="1641540778231" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2801" width="200" height="200" class="icon"><path d="M146.285714 174.811429h1609.142857v707.364571H146.285714z" fill="#FFFFFF" p-id="2802"></path><path d="M1757.622857 73.142857c24.795429 0 49.517714 24.722286 43.373714 49.444572v747.446857a48.859429 48.859429 0 0 1-49.590857 49.371428H122.660571A48.786286 48.786286 0 0 1 73.142857 870.034286V209.042286c0-24.722286 18.578286-49.444571 49.517714-49.444572h1021.805715v-37.010285c0-24.722286 18.651429-49.444571 49.590857-49.444572h563.565714zM710.948571 264.630857h-49.517714c-18.578286 0-37.156571 18.578286-37.156571 37.083429v302.665143c0 13.165714 0 32.987429 6.217143 37.083428l173.348571 172.909714c11.044571 10.971429 36.717714 12.214857 42.349714 12.434286h1.024s31.012571 0 43.373715-12.434286l185.782857-172.909714c6.217143-6.217143 6.217143-18.505143 6.217143-30.866286V307.858286c0-18.505143-18.578286-37.010286-37.156572-37.010286h-49.517714c-18.651429 0-37.229714 18.505143-37.229714 37.010286v277.942857l-105.325715 105.033143L748.251429 585.874286V301.714286c0-18.505143-18.651429-37.083429-37.156572-37.083429z m-445.878857 0h-49.590857c-18.578286 0-37.156571 18.578286-37.156571 37.083429v488.009143c0 18.505143 18.578286 37.010286 37.156571 37.010285h297.325714c18.578286 0 37.156571-18.505143 37.156572-37.010285v-49.444572c0-18.578286-18.578286-37.083429-37.156572-37.083428h-210.651428v-401.554286c0-18.432-18.505143-37.010286-37.083429-37.010286zM1664.731429 171.958857h-384c-18.578286 0-37.083429 18.505143-37.083429 37.010286v49.444571c0 18.505143 18.505143 37.083429 37.083429 37.083429h297.252571v142.043428h-297.252571c-18.578286 0-37.083429 18.505143-37.083429 37.083429v49.444571c0 18.505143 18.505143 37.010286 37.083429 37.010286h297.252571v142.116572h-297.252571c-18.578286 0-37.083429 18.432-37.083429 37.010285v49.444572c0 18.505143 18.505143 37.083429 37.083429 37.083428h384c18.578286 0 37.156571-18.578286 37.156571-37.083428V208.969143c0-18.505143-18.578286-37.010286-37.156571-37.010286z" fill="#7BCDEF" p-id="2803" class="bg"></path></svg>';
        break;
      }
      case 2: {
        i.uname += '<svg t="1642057823046" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2545" width="200" height="200" class="icon"><path d="M146.285714 171.739429h1609.142857v707.364571H146.285714z" fill="#FFFFFF" p-id="2546"></path><path d="M1779.565714 73.142857c24.795429 0 49.590857 24.722286 43.446857 49.444572v747.52a48.786286 48.786286 0 0 1-49.590857 49.298285H144.603429a48.713143 48.713143 0 0 1-49.590858-49.371428V208.969143c0-24.649143 18.578286-49.371429 49.590858-49.371429h1021.805714v-37.010285c0-24.722286 18.578286-49.444571 49.517714-49.444572h563.565714zM733.037714 264.630857h-49.590857c-18.578286 0-37.156571 18.578286-37.156571 37.010286v302.811428c0 13.897143 0 33.060571 6.217143 36.937143l173.348571 172.982857c12.434286 12.434286 43.373714 12.434286 43.373714 12.434286s31.012571 0 43.373715-12.434286l185.782857-172.982857c6.217143-6.070857 6.217143-18.432 6.217143-30.866285V307.931429c0-18.505143-18.578286-37.083429-37.156572-37.083429h-49.517714c-18.651429 0-37.156571 18.578286-37.156572 37.083429V585.874286l-105.325714 104.96-105.325714-104.96V301.641143c0-18.432-18.505143-37.010286-37.083429-37.010286z m-445.952 0h-49.517714c-18.578286 0-37.156571 18.578286-37.156571 37.010286v488.082286c0 18.578286 18.578286 37.010286 37.156571 37.010285h297.252571c18.578286 0 37.156571-18.432 37.156572-37.010285v-49.371429c0-18.651429-18.578286-37.156571-37.156572-37.156571H324.242286v-401.554286c0-18.432-18.578286-37.010286-37.156572-37.010286z m1399.661715-92.672h-384c-18.578286 0-37.083429 18.505143-37.083429 37.010286v49.444571c0 18.505143 18.505143 37.083429 37.083429 37.083429h297.252571v142.043428h-297.252571c-18.578286 0-37.083429 18.505143-37.083429 37.083429v315.099429c0 18.505143 18.505143 37.010286 37.083429 37.010285h384c18.578286 0 37.156571-18.505143 37.156571-37.010285v-49.444572c0-18.578286-18.578286-37.156571-37.156571-37.156571h-297.179429V561.152h297.179429c18.578286 0 37.156571-18.578286 37.156571-37.083429V208.969143c0-18.505143-18.578286-37.010286-37.156571-37.010286z" fill="#8BD29B" p-id="2547"></path></svg>';
        break;
      }
      case 1: {
        i.uname += '<svg t="1641540697281" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2545" width="200" height="200" class="icon"><path d="M146.285714 169.984h1609.142857v707.364571H146.285714z" fill="#FFFFFF" p-id="2546"></path><path d="M1779.565714 73.142857c24.795429 0 49.590857 24.722286 43.446857 49.444572v747.446857a48.859429 48.859429 0 0 1-49.664 49.371428H144.603429a48.786286 48.786286 0 0 1-49.517715-49.371428V209.042286c0-24.722286 18.505143-49.444571 49.517715-49.444572h1021.805714v-37.010285c0-24.722286 18.651429-49.444571 49.590857-49.444572h563.638857z m-272.530285 117.467429h-123.830858c-18.505143 0-37.083429 18.505143-37.083428 37.010285v49.444572c0 18.505143 18.578286 37.083429 37.083428 37.083428h37.229715v389.12h-49.590857c-18.651429 0-37.156571 18.505143-37.156572 37.083429v49.371429c0 18.578286 18.505143 37.083429 37.156572 37.083428h223.378285c18.578286 0 38.326857-18.505143 38.326857-37.083428v-49.152c0-18.578286-19.748571-37.522286-38.326857-37.522286h-49.956571v-475.428572c0-18.505143-18.651429-37.010286-37.229714-37.010285zM732.964571 264.630857h-49.517714c-18.578286 0-37.156571 18.578286-37.156571 37.083429v308.443428c0.146286 12.214857 0.950857 27.940571 6.217143 31.305143l173.348571 172.909714c12.434286 12.434286 43.446857 12.434286 43.446857 12.434286h1.024c5.632-0.219429 31.305143-1.462857 42.276572-12.434286l173.421714-172.909714c1.389714-1.462857 3.072-2.852571 4.900571-4.388571 6.217143-5.339429 13.604571-11.702857 13.604572-20.260572V307.858286c0-18.505143-18.505143-37.010286-37.083429-37.010286h-49.517714c-18.651429 0-37.302857 18.505143-37.302857 37.010286v277.942857L875.52 690.907429 770.194286 585.874286V301.714286c0-18.505143-18.505143-37.083429-37.156572-37.083429z m-445.878857 0h-49.590857c-18.505143 0-37.083429 18.578286-37.083428 37.083429v488.009143c0 18.505143 18.578286 37.010286 37.083428 37.010285h297.325714c18.505143 0 37.156571-18.505143 37.156572-37.010285v-49.444572c0-18.578286-18.578286-37.083429-37.156572-37.083428H324.242286v-401.554286c0-18.432-18.578286-37.010286-37.156572-37.010286z" fill="#C0C0C0" p-id="2547" class="bg"></path></svg>';
        break;
      }
      case 0: {
        i.uname += '<svg t="1641540753102" viewBox="0 0 1901 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2673" width="200" height="200" class="icon"><path d="M146.285714 170.349714h1609.142857V877.714286H146.285714z" fill="#FFFFFF" p-id="2674"></path><path d="M1763.766857 73.142857c24.868571 0 44.544 18.285714 43.593143 49.444572v747.52a48.859429 48.859429 0 0 1-49.737143 49.298285H122.88a48.859429 48.859429 0 0 1-49.737143-49.371428V208.969143c0-24.649143 18.651429-49.371429 49.737143-49.371429H1148.342857v-37.010285c0-24.722286 18.651429-49.444571 49.737143-49.444572h565.613714zM265.801143 264.630857h-49.737143c-18.578286 0-37.302857 18.578286-37.302857 37.010286v488.082286c0 18.578286 18.724571 37.010286 37.302857 37.010285h298.422857c18.651429 0 37.302857-18.432 37.302857-37.010285v-49.371429c0-18.651429-18.651429-37.156571-37.302857-37.156571h-211.382857v-401.554286c0-18.432-18.651429-37.010286-37.302857-37.010286z m447.634286 0h-49.737143c-18.651429 0-37.302857 18.578286-37.302857 37.010286v302.811428c-0.365714 12.653714 0 30.427429 6.217142 36.937143l174.08 172.982857c6.875429 6.875429 19.529143 9.947429 29.403429 11.264l10.020571 0.950858h8.045715l10.020571-0.950858c9.874286-1.316571 22.601143-4.388571 29.476572-11.264l174.08-172.982857c6.144-6.070857 18.578286-18.432 18.578285-30.866285V307.931429c0-18.505143-18.651429-37.083429-37.302857-37.083429h-49.590857c-18.724571 0-37.376 18.578286-37.376 37.083429V585.874286l-105.691429 104.96-105.618285-104.96V301.641143c0-18.432-18.651429-37.010286-37.302857-37.010286zM1658.148571 178.102857h-354.304a49.005714 49.005714 0 0 0-49.737142 49.444572v543.670857c0 24.649143 18.651429 49.371429 49.737142 49.371428h354.304c24.868571 0 49.737143-18.505143 49.737143-49.371428V227.474286a48.932571 48.932571 0 0 0-49.737143-49.444572zM1552.457143 295.497143c16.603429 0 33.206857 14.628571 36.717714 30.866286l0.658286 6.144v333.677714c0 16.457143-14.774857 32.914286-31.158857 36.352l-6.217143 0.658286h-142.921143c-16.603429 0-33.133714-14.628571-36.571429-30.866286l-0.731428-6.144V332.580571c0-16.457143 14.701714-32.914286 31.085714-36.352l6.217143-0.658285h142.921143z" fill="#C0C0C0" p-id="2675" class="bg"></path></svg>';
        break;
      }
    }
  }
  return obj;
}
function checkvip$1(member) {
  return member.vip.vipStatus === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.uname}</span>` : `<span style="color: #888">${member.uname}</span>`;
}
function getRelativeTimeFromTimestamp$1(timestamp) {
  const now = Math.floor(Date.now() / 1e3);
  const differenceInSeconds = now - timestamp;
  if (differenceInSeconds < 30) {
    return "刚刚";
  } else if (differenceInSeconds < 60) {
    return differenceInSeconds + "秒前";
  } else if (differenceInSeconds < 3600) {
    return Math.floor(differenceInSeconds / 60) + "分钟前";
  } else if (differenceInSeconds < 86400) {
    return Math.floor(differenceInSeconds / 3600) + "小时前";
  } else if (differenceInSeconds < 2592e3) {
    return Math.floor(differenceInSeconds / 86400) + "天前";
  } else if (differenceInSeconds < 7776e3) {
    return Math.floor(differenceInSeconds / 2592e3) + "个月前";
  } else {
    const date = new Date(timestamp * 1e3);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return year + "-" + month + "-" + day;
  }
}
async function genParams(apiURL) {
  if (Config.cookies.bilibili === "" || Config.cookies.bilibili === null) return "&platform=html5";
  const loginInfo = await getBilibiliData("登录基本信息", Config.cookies.bilibili);
  const genSign = await wbi_sign(apiURL, Config.cookies.bilibili);
  const qn = [6, 16, 32, 64, 74, 80, 112, 116, 120, 125, 126, 127];
  let isvip;
  loginInfo.data.vipStatus === 1 ? isvip = true : isvip = false;
  if (isvip) {
    return `&fnval=16&fourk=1&${genSign}`;
  } else return `&qn=${qn[3]}&fnval=16`;
}
async function checkCk() {
  if (Config.cookies.bilibili === "" || Config.cookies.bilibili === null) return { Status: "!isLogin", isVIP: false };
  const loginInfo = await getBilibiliData("登录基本信息", Config.cookies.bilibili);
  let isVIP;
  loginInfo.data.vipStatus === 1 ? isVIP = true : isVIP = false;
  if (isVIP) {
    return { Status: "isLogin", isVIP };
  } else return { Status: "isLogin", isVIP };
}
var DynamicType = /* @__PURE__ */ ((DynamicType2) => {
  DynamicType2["AV"] = "DYNAMIC_TYPE_AV";
  DynamicType2["DRAW"] = "DYNAMIC_TYPE_DRAW";
  DynamicType2["WORD"] = "DYNAMIC_TYPE_WORD";
  DynamicType2["LIVE_RCMD"] = "DYNAMIC_TYPE_LIVE_RCMD";
  DynamicType2["FORWARD"] = "DYNAMIC_TYPE_FORWARD";
  return DynamicType2;
})(DynamicType || {});
class Bilibilipush extends Base {
  force = false;
  /**
   *
   * @param e 事件对象，提供给实例使用的事件相关信息，默认为空对象{}
   * @param force 强制执行标志，用于控制实例行为，默认false
   * @returns
   */
  constructor(e = {}, force = false) {
    super(e);
    if (this.botadapter === "QQBot") {
      e.reply("不支持QQBot，请使用其他适配器");
      return;
    }
    this.force = force;
    this.amagi = new index_default({ bilibili: Config.cookies.bilibili });
  }
  /**
   * 执行主要的操作流程，包括检查缓存并根据需要获取和更新用户数据。
   * @returns
   */
  async action() {
    try {
      await this.syncConfigToDatabase();
      const deletedCount = await cleanOldDynamicCache("bilibili", 1);
      if (deletedCount > 0) {
        logger.info(`已清理 ${deletedCount} 条过期的B站动态缓存记录`);
      }
      const data = await this.getDynamicList(Config.pushlist.bilibili);
      const pushdata = await this.excludeAlreadyPushed(data.willbepushlist);
      if (Object.keys(pushdata).length === 0) return true;
      if (this.force) return await this.forcepush(pushdata);
      else return await this.getdata(pushdata);
    } catch (error) {
      logger.error(error);
    }
  }
  /**
   * 同步配置文件中的订阅信息到数据库
   */
  async syncConfigToDatabase() {
    if (!Config.pushlist.bilibili || Config.pushlist.bilibili.length === 0) {
      return;
    }
    await bilibiliDB.syncConfigSubscriptions(Config.pushlist.bilibili);
  }
  /**
   * 异步获取数据并根据动态类型处理和发送动态信息。
   * @param data 包含动态相关信息的对象。
   */
  async getdata(data) {
    let nocd_data;
    for (const dynamicId in data) {
      let skip = await skipDynamic(data[dynamicId]);
      let send_video = true;
      let img2 = [];
      const dynamicCARDINFO = await this.amagi.getBilibiliData("动态卡片数据", { dynamic_id: dynamicId });
      const dycrad = dynamicCARDINFO.data.card && dynamicCARDINFO.data.card.card && JSON.parse(dynamicCARDINFO.data.card.card);
      if (!skip) {
        const userINFO = await this.amagi.getBilibiliData("用户主页数据", { host_mid: data[dynamicId].host_mid });
        let emojiDATA = await this.amagi.getBilibiliData("Emoji数据");
        emojiDATA = extractEmojisData(emojiDATA.data.packages);
        logger.debug(`UP: ${data[dynamicId].remark}
动态id：${dynamicId}
https://t.bilibili.com/${dynamicId}`);
        switch (data[dynamicId].dynamic_type) {
          /** 处理图文动态 */
          case "DYNAMIC_TYPE_DRAW": {
            if ("topic" in data[dynamicId].Dynamic_Data.modules.module_dynamic && data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
              const name = data[dynamicId].Dynamic_Data.modules.module_dynamic.topic.name;
              data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes.unshift({
                orig_text: name,
                text: name,
                type: "topic"
              });
              data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text = `${name}

` + data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text;
            }
            img2 = await Render(
              "bilibili/dynamic/DYNAMIC_TYPE_DRAW",
              {
                image_url: cover(dycrad.item.pictures),
                text: replacetext(br$1(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes),
                dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                share_url: "https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str,
                username: checkvip(userINFO.data.card),
                fans: this.count(userINFO.data.follower),
                user_shortid: data[dynamicId].host_mid,
                total_favorited: this.count(userINFO.data.like_num),
                following_count: this.count(userINFO.data.card.attention),
                decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
                render_time: Common.getCurrentTime(),
                dynamicTYPE: "图文动态推送"
              }
            );
            break;
          }
          /** 处理纯文动态 */
          case "DYNAMIC_TYPE_WORD": {
            let text = replacetext(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text, data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes);
            for (const item of emojiDATA) {
              if (text.includes(item.text)) {
                if (text.includes("[") && text.includes("]")) {
                  text = text.replace(/\[[^\]]*\]/g, `<img src="${item.url}"/>`).replace(/\\/g, "");
                }
                text += "&#160";
              }
            }
            img2 = await Render(
              "bilibili/dynamic/DYNAMIC_TYPE_WORD",
              {
                text: br$1(text),
                dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
                pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
                share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                share_url: "https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str,
                username: checkvip(userINFO.data.card),
                fans: this.count(userINFO.data.follower),
                user_shortid: data[dynamicId].host_mid,
                total_favorited: this.count(userINFO.data.like_num),
                following_count: this.count(userINFO.data.card.attention),
                dynamicTYPE: "纯文动态推送"
              }
            );
            break;
          }
          /** 处理视频动态 */
          case "DYNAMIC_TYPE_AV": {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major.type === "MAJOR_TYPE_ARCHIVE") {
              const aid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.aid;
              const bvid = data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.bvid;
              const INFODATA = await getBilibiliData("单个视频作品数据", "", { bvid });
              if (INFODATA.data.redirect_url) {
                send_video = false;
                logger.debug(`UP主：${INFODATA.data.owner.name} 的该动态类型为${logger.yellow("番剧或影视")}，默认跳过不下载，直达：${logger.green(INFODATA.data.redirect_url)}`);
              } else {
                nocd_data = await getBilibiliData("单个视频下载信息数据", "", { avid: aid, cid: INFODATA.data.cid });
              }
              img2 = await Render(
                "bilibili/dynamic/DYNAMIC_TYPE_AV",
                {
                  image_url: [{ image_src: INFODATA.data.pic }],
                  text: br$1(INFODATA.data.title),
                  desc: br$1(dycrad.desc),
                  dianzan: this.count(INFODATA.data.stat.like),
                  pinglun: this.count(INFODATA.data.stat.reply),
                  share: this.count(INFODATA.data.stat.share),
                  view: this.count(dycrad.stat.view),
                  coin: this.count(dycrad.stat.coin),
                  duration_text: data[dynamicId].Dynamic_Data.modules.module_dynamic.major.archive.duration_text,
                  create_time: Common.convertTimestampToDateTime(INFODATA.data.ctime),
                  avatar_url: INFODATA.data.owner.face,
                  frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                  share_url: "https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str || "https://www.bilibili.com/video/" + bvid,
                  username: checkvip(userINFO.data.card),
                  fans: this.count(userINFO.data.follower),
                  user_shortid: data[dynamicId].host_mid,
                  total_favorited: this.count(userINFO.data.like_num),
                  following_count: this.count(userINFO.data.card.attention),
                  dynamicTYPE: "视频动态推送"
                }
              );
            }
            break;
          }
          /** 处理直播动态 */
          case "DYNAMIC_TYPE_LIVE_RCMD": {
            img2 = await Render(
              "bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
              {
                image_url: [{ image_src: dycrad.live_play_info.cover }],
                text: br$1(dycrad.live_play_info.title),
                liveinf: br$1(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
                username: checkvip(userINFO.data.card),
                avatar_url: userINFO.data.card.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                fans: this.count(userINFO.data.follower),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                now_time: Common.getCurrentTime(),
                share_url: "https://live.bilibili.com/" + dycrad.live_play_info.room_id,
                dynamicTYPE: "直播动态推送"
              }
            );
            break;
          }
          /** 处理转发动态 */
          case "DYNAMIC_TYPE_FORWARD": {
            const text = replacetext(br$1(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes);
            let param = {};
            switch (data[dynamicId].Dynamic_Data.orig.type) {
              case "DYNAMIC_TYPE_AV": {
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  pub_action: data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_action,
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  duration_text: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.duration_text,
                  title: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.title,
                  danmaku: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.stat.danmaku,
                  play: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.stat.play,
                  cover: data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.archive.cover,
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                };
                break;
              }
              case "DYNAMIC_TYPE_DRAW": {
                const dynamicCARD = await getBilibiliData("动态卡片数据", Config.cookies.bilibili, { dynamic_id: data[dynamicId].Dynamic_Data.orig.id_str });
                const cardData = JSON.parse(dynamicCARD.data.card.card);
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: replacetext(br$1(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.rich_text_nodes),
                  image_url: cover(cardData.item.pictures),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                };
                break;
              }
              case "DYNAMIC_TYPE_WORD": {
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: replacetext(br$1(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.desc.rich_text_nodes),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                };
                break;
              }
              case "DYNAMIC_TYPE_LIVE_RCMD": {
                const liveData = JSON.parse(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.live_rcmd.content);
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decorate),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image,
                  cover: liveData.live_play_info.cover,
                  text_large: liveData.live_play_info.watched_show.text_large,
                  area_name: liveData.live_play_info.area_name,
                  title: liveData.live_play_info.title,
                  online: liveData.live_play_info.online
                };
                break;
              }
              case "DYNAMIC_TYPE_FORWARD":
              default: {
                logger.warn(`UP主：${data[dynamicId].remark}的${logger.green("转发动态")}转发的原动态类型为「${logger.yellow(data[dynamicId].Dynamic_Data.orig.type)}」暂未支持解析`);
                break;
              }
            }
            img2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_FORWARD", {
              text,
              dianzan: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
              pinglun: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
              share: this.count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
              create_time: data[dynamicId].Dynamic_Data.modules.module_author.pub_time,
              avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
              frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
              share_url: "https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str,
              username: checkvip(userINFO.data.card),
              fans: this.count(userINFO.data.follower),
              user_shortid: data[dynamicId].Dynamic_Data.modules.module_author.mid,
              total_favorited: this.count(userINFO.data.like_num),
              following_count: this.count(userINFO.data.card.attention),
              dynamicTYPE: "转发动态推送",
              decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.modules.module_author.decorate),
              render_time: Common.getCurrentTime(),
              original_content: { [data[dynamicId].Dynamic_Data.orig.type]: param }
            });
            break;
          }
          /** 未处理的动态类型 */
          default: {
            skip = true;
            logger.warn(`UP主：${data[dynamicId].remark}「${data[dynamicId].dynamic_type}」动态类型的暂未支持推送
动态地址：${"https://t.bilibili.com/" + data[dynamicId].Dynamic_Data.id_str}`);
            break;
          }
        }
      }
      for (const target of data[dynamicId].targets) {
        let status;
        if (!skip) {
          const { groupId, botId } = target;
          const bot = karin$1.getBot(botId);
          status = await karin$1.sendMsg(String(botId), karin$1.contactGroup(groupId), img2 ? [...img2] : []);
          if (Config.bilibili.push.parsedynamic) {
            switch (data[dynamicId].dynamic_type) {
              case "DYNAMIC_TYPE_AV": {
                if (send_video) {
                  await this.DownLoadVideo({
                    video_url: nocd_data ? nocd_data.data.durl[0].url : "",
                    title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${dycrad.title}.mp4` }
                  }, { active: true, activeOption: { uin: botId, group_id: groupId } });
                }
                break;
              }
              case "DYNAMIC_TYPE_DRAW": {
                const imgArray = [];
                for (const img22 of data[dynamicId].Dynamic_Data.modules.module_dynamic.major && data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items) {
                  imgArray.push(segment.image(img22.src));
                }
                const forwardMsg = common.makeForward(imgArray, botId, bot.account.name);
                await bot.sendForwardMsg(karin$1.contactFriend(botId), forwardMsg);
                break;
              }
            }
          }
        }
        if (skip || status?.message_id) {
          await bilibiliDB.addDynamicCache(
            dynamicId,
            data[dynamicId].host_mid,
            target.groupId,
            data[dynamicId].dynamic_type
          );
        }
      }
    }
  }
  /**
   * 根据配置文件获取UP当天的动态列表。
   * @returns
   */
  async getDynamicList(userList) {
    const willbepushlist = {};
    try {
      for (const item of userList) {
        const dynamic_list = await this.amagi.getBilibiliData("用户主页动态列表数据", { host_mid: item.host_mid, typeMode: "strict" });
        if (dynamic_list.data.items.length > 0) {
          for (const dynamic of dynamic_list.data.items) {
            const now = Date.now();
            const createTime = dynamic.modules.module_author.pub_ts;
            const timeDifference = now - createTime * 1e3;
            const is_top = dynamic.modules.module_tag?.text === "置顶";
            let shouldPush = false;
            logger.debug(`前期获取该动态基本信息：
动态ID：${dynamic.id_str}
发布时间：${Common.convertTimestampToDateTime(Number(createTime))}
发布时间戳（s）：${createTime}
时间差（ms）：${timeDifference}
是否置顶：${is_top}
是否在一天内：${timeDifference < 864e5 ? logger.green("true") : logger.red("false")}`);
            if (is_top && timeDifference < 864e5 || timeDifference < 864e5) {
              shouldPush = true;
              logger.debug(logger.green(`根据以上判断，shoulPush 为 true，将对该动态纳入当天推送列表：https://t.bilibili.com/${dynamic.id_str}
`));
            } else logger.debug(logger.yellow(`根据以上判断，shoulPush 为 false，跳过该动态：https://t.bilibili.com/${dynamic.id_str}
`));
            if (timeDifference < 864e5 || shouldPush) {
              const targets = item.group_id.map((groupWithBot) => {
                const [groupId, botId] = groupWithBot.split(":");
                return { groupId, botId };
              });
              if (!willbepushlist[dynamic.id_str]) {
                willbepushlist[dynamic.id_str] = {
                  remark: item.remark,
                  host_mid: item.host_mid,
                  create_time: dynamic.modules.module_author.pub_ts,
                  targets,
                  Dynamic_Data: dynamic,
                  // 存储 dynamic 对象
                  avatar_img: dynamic.modules.module_author.face,
                  dynamic_type: dynamic.type
                };
              }
            }
          }
        } else {
          throw new Error(`「${item.remark}」的动态列表数量为零！`);
        }
      }
    } catch (error) {
      logger.error(error);
    }
    return { willbepushlist };
  }
  /**
   * 排除已推送过的群组并返回更新后的推送列表
   * @param willBePushList 将要推送的列表
   * @returns 更新后的推送列表
   */
  async excludeAlreadyPushed(willBePushList) {
    for (const dynamicId in willBePushList) {
      const pushItem = willBePushList[dynamicId];
      const newTargets = [];
      for (const target of pushItem.targets) {
        const isPushed = await bilibiliDB.isDynamicPushed(dynamicId, pushItem.host_mid, target.groupId);
        if (!isPushed) {
          newTargets.push(target);
        }
      }
      if (newTargets.length > 0) {
        pushItem.targets = newTargets;
      } else {
        delete willBePushList[dynamicId];
      }
    }
    return willBePushList;
  }
  /**
   * 设置或更新特定 host_mid 的群组信息。
   * @param data 包含 card 对象。
   * @returns 操作成功或失败的消息字符串。
   */
  async setting(data) {
    const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
    const host_mid = Number(data.data.card.mid);
    const config = Config.pushlist;
    const groupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    const botId = this.e.selfId;
    if (!config.bilibili) {
      config.bilibili = [];
    }
    const existingItem = config.bilibili.find((item) => item.host_mid === host_mid);
    const isSubscribed = await bilibiliDB.isSubscribed(host_mid, groupId);
    if (existingItem) {
      let has = false;
      let groupIndexToRemove = -1;
      for (let index = 0; index < existingItem.group_id.length; index++) {
        const item = existingItem.group_id[index];
        const existingGroupId = item.split(":")[0];
        if (existingGroupId === String(groupId)) {
          has = true;
          groupIndexToRemove = index;
          break;
        }
      }
      if (has) {
        existingItem.group_id.splice(groupIndexToRemove, 1);
        if (isSubscribed) {
          await bilibiliDB.unsubscribeBilibiliUser(groupId, host_mid);
        }
        logger.info(`
删除成功！${data.data.card.name}
UID：${host_mid}`);
        await this.e.reply(`群：${groupInfo.groupName}(${groupId})
删除成功！${data.data.card.name}
UID：${host_mid}`);
        if (existingItem.group_id.length === 0) {
          const index = config.bilibili.indexOf(existingItem);
          config.bilibili.splice(index, 1);
        }
      } else {
        await bilibiliDB.subscribeBilibiliUser(
          groupId,
          botId,
          host_mid,
          data.data.card.name
        );
        existingItem.group_id.push(`${groupId}:${botId}`);
        await this.e.reply(`群：${groupInfo.groupName}(${groupId})
添加成功！${data.data.card.name}
UID：${host_mid}`);
        if (Config.bilibili.push.switch === false) await this.e.reply("请发送「#kkk设置B站推送开启」以进行推送");
        logger.info(`
设置成功！${data.data.card.name}
UID：${host_mid}`);
      }
    } else {
      await bilibiliDB.subscribeBilibiliUser(
        groupId,
        botId,
        host_mid,
        data.data.card.name
      );
      config.bilibili.push({
        host_mid,
        group_id: [`${groupId}:${botId}`],
        remark: data.data.card.name
      });
      await this.e.reply(`群：${groupInfo.groupName}(${groupId})
添加成功！${data.data.card.name}
UID：${host_mid}`);
      if (Config.bilibili.push.switch === false) await this.e.reply("请发送「#kkk设置B站推送开启」以进行推送");
    }
    Config.Modify("pushlist", "bilibili", config.bilibili);
    await this.renderPushList();
  }
  /**
   * 检查并更新配置文件中指定用户的备注信息。
   * 该函数会遍历配置文件中的用户列表，对于没有备注或备注为空的用户，会从外部数据源获取其备注信息，并更新到配置文件中。
   */
  async checkremark() {
    const config = Config.pushlist;
    const abclist = [];
    if (Config.pushlist.bilibili === null || Config.pushlist.bilibili.length === 0) return true;
    for (const i of Config.pushlist.bilibili) {
      const remark = i.remark;
      const group_id = i.group_id;
      const host_mid = i.host_mid;
      if (remark === void 0 || remark === "") {
        abclist.push({ host_mid, group_id });
      }
    }
    if (abclist.length > 0) {
      for (const i of abclist) {
        const resp = await this.amagi.getBilibiliData("用户主页数据", { host_mid: i.host_mid });
        const remark = resp.data.card.name;
        const matchingItemIndex = config.bilibili.findIndex((item) => item.host_mid === i.host_mid);
        if (matchingItemIndex !== -1) {
          config.bilibili[matchingItemIndex].remark = remark;
        }
      }
      Config.Modify("pushlist", "bilibili", config.bilibili);
    }
  }
  /**
   * 强制推送
   * @param data 处理完成的推送列表
   */
  async forcepush(data) {
    const currentGroupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    const currentBotId = this.e.selfId;
    if (!this.e.msg.includes("全部")) {
      const subscriptions = await bilibiliDB.getGroupSubscriptions(currentGroupId);
      const subscribedUids = subscriptions.map((sub) => sub.get("host_mid"));
      const filteredData = {};
      for (const dynamicId in data) {
        if (subscribedUids.includes(data[dynamicId].host_mid)) {
          filteredData[dynamicId] = {
            ...data[dynamicId],
            targets: [{
              groupId: currentGroupId,
              botId: currentBotId
            }]
          };
        }
      }
      await this.getdata(filteredData);
    } else {
      await this.getdata(data);
    }
  }
  /** 渲染推送列表图片 */
  async renderPushList() {
    await this.syncConfigToDatabase();
    const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
    "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    if (Config.pushlist.bilibili.length === 0) {
      await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})
没有设置任何B站UP推送！
可使用「#设置B站推送 + UP主UID」进行设置`);
      return;
    }
    const renderOpt = [];
    for (const item of Config.pushlist.bilibili) {
      const userInfo = await getBilibiliData("用户主页数据", Config.cookies.bilibili, { host_mid: item.host_mid });
      renderOpt.push({
        avatar_img: userInfo.data.card.face,
        username: userInfo.data.card.name,
        host_mid: userInfo.data.card.mid,
        fans: this.count(userInfo.data.follower),
        total_favorited: this.count(userInfo.data.like_num),
        following_count: this.count(userInfo.data.card.attention)
      });
    }
    const img2 = await Render("bilibili/userlist", { renderOpt });
    await this.e.reply(img2);
  }
}
function br$1(data) {
  return data = data.replace(/\n/g, "<br>");
}
function checkvip(member) {
  return member.vip.vipStatus === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#EDEDED" : "#606060"}">${member.name}</span>`;
}
function extractEmojisData(data) {
  const emojisData = [];
  data.forEach((packages) => {
    packages.emote.forEach((emote) => {
      emojisData.push({ text: emote.text, url: emote.url });
    });
  });
  return emojisData;
}
const skipDynamic = async (PushItem) => {
  if (PushItem.Dynamic_Data.type === "DYNAMIC_TYPE_LIVE_RCMD") {
    return false;
  }
  const tags = [];
  if (PushItem.Dynamic_Data.modules.module_dynamic?.desc?.rich_text_nodes) {
    for (const node of PushItem.Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) {
      if (node.type === "topic") {
        tags.push(node.orig_text);
      }
    }
  }
  if (PushItem.Dynamic_Data.type === "DYNAMIC_TYPE_FORWARD" && "orig" in PushItem.Dynamic_Data) {
    if (PushItem.Dynamic_Data.orig.modules.module_dynamic?.desc?.rich_text_nodes) {
      for (const node of PushItem.Dynamic_Data.orig.modules.module_dynamic.desc.rich_text_nodes) {
        if (node.type === "topic") {
          tags.push(node.orig_text);
        }
      }
    }
  }
  const shouldFilter = await bilibiliDB.shouldFilter(PushItem, tags);
  return shouldFilter;
};
async function douyinComments(data, emojidata) {
  let jsonArray = [];
  if (data.comments === null) return [];
  for (let i = 0; i < data.comments.length; i++) {
    const cid = data.comments[i].cid;
    const aweme_id = data.comments[i].aweme_id;
    const nickname = data.comments[i].user.nickname;
    const userimageurl = data.comments[i].user.avatar_thumb.url_list[0];
    const text = data.comments[i].text;
    const ip = data.comments[i].ip_label ?? "未知";
    const time = data.comments[i].create_time;
    const label_type = data.comments[i].label_type ?? -1;
    const sticker = data.comments[i].sticker ? data.comments[i].sticker.animate_url.url_list[0] : null;
    const digg_count = data.comments[i].digg_count;
    const imageurl = data.comments[i].image_list && data.comments[i].image_list[0] && data.comments[i].image_list[0].origin_url && data.comments[i].image_list[0].origin_url.url_list ? data.comments[i].image_list[0].origin_url.url_list[0] : null;
    const status_label = data.comments[i].label_list ? data.comments[i].label_list[0].text : null;
    const userintextlongid = data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].sec_uid ? data.comments[i].text_extra[0].sec_uid && data.comments[i].text_extra.map((extra) => extra.sec_uid) : null;
    const search_text2 = data.comments[i].text_extra && data.comments[i].text_extra[0] && data.comments[i].text_extra[0].search_text ? data.comments[i].text_extra[0].search_text && data.comments[i].text_extra.map((extra) => ({
      search_text: extra.search_text,
      search_query_id: extra.search_query_id
    })) : null;
    const relativeTime = getRelativeTimeFromTimestamp(time);
    const reply_comment_total = data.comments[i].reply_comment_total;
    const commentObj = {
      id: i + 1,
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text,
      digg_count,
      ip_label: ip,
      create_time: relativeTime,
      commentimage: imageurl,
      label_type,
      sticker,
      status_label,
      is_At_user_id: userintextlongid,
      search_text: search_text2,
      reply_comment_total
    };
    jsonArray.push(commentObj);
  }
  jsonArray.sort((a, b) => b.digg_count - a.digg_count);
  const indexLabelTypeOne = jsonArray.findIndex((comment) => comment.label_type === 1);
  if (indexLabelTypeOne !== -1) {
    const commentTypeOne = jsonArray.splice(indexLabelTypeOne, 1)[0];
    jsonArray.unshift(commentTypeOne);
  }
  jsonArray = br(jsonArray);
  jsonArray = await handling_at(jsonArray);
  jsonArray = await search_text(jsonArray);
  jsonArray = await heic2jpg(jsonArray);
  const CommentData = {
    jsonArray
  };
  for (const i of jsonArray) {
    if (i.digg_count > 1e4) {
      i.digg_count = (i.digg_count / 1e4).toFixed(1) + "w";
    }
  }
  for (const item1 of CommentData.jsonArray) {
    for (const item2 of emojidata) {
      if (item1.text.includes(item2.name)) {
        if (item1.text.includes("[") && item1.text.includes("]")) {
          item1.text = item1.text.replace(/\[[^\]]*\]/g, `<img src="${item2.url}"/>`).replace(/\\/g, "");
        } else {
          item1.text = `<img src="${item2.url}"/>`;
        }
        item1.text += "&#160";
      }
    }
  }
  return CommentData;
}
function getRelativeTimeFromTimestamp(timestamp) {
  const now = Math.floor(Date.now() / 1e3);
  const differenceInSeconds = now - timestamp;
  if (differenceInSeconds < 30) {
    return "刚刚";
  } else if (differenceInSeconds < 60) {
    return differenceInSeconds + "秒前";
  } else if (differenceInSeconds < 3600) {
    return Math.floor(differenceInSeconds / 60) + "分钟前";
  } else if (differenceInSeconds < 86400) {
    return Math.floor(differenceInSeconds / 3600) + "小时前";
  } else if (differenceInSeconds < 2592e3) {
    return Math.floor(differenceInSeconds / 86400) + "天前";
  } else if (differenceInSeconds < 7776e3) {
    return Math.floor(differenceInSeconds / 2592e3) + "个月前";
  } else {
    const date = new Date(timestamp * 1e3);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return year + "-" + month + "-" + day;
  }
}
async function handling_at(data) {
  for (const item of data) {
    if (item.is_At_user_id !== null && Array.isArray(item.is_At_user_id)) {
      for (const secUid of item.is_At_user_id) {
        const UserInfoData = await getDouyinData("用户主页数据", Config.cookies.douyin, { sec_uid: secUid, typeMode: "strict" });
        if (UserInfoData.user.sec_uid === secUid) {
          const regex = new RegExp(`@${UserInfoData.user.nickname?.replace(/[-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")}`, "g");
          item.text = item.text.replace(regex, (match) => {
            return `<span class="${Common.useDarkTheme() ? "dark-mode handling_at" : "handling_at"}">${match}</span>`;
          });
        }
      }
    }
  }
  return data;
}
async function search_text(data) {
  for (const item of data) {
    if (item.search_text !== null && Array.isArray(item.search_text)) {
      for (const search_text2 of item.search_text) {
        const SuggestWordsData = await getDouyinData("热点词数据", Config.cookies.douyin, { query: search_text2.search_text, typeMode: "strict" });
        if (SuggestWordsData.data && SuggestWordsData.data[0] && SuggestWordsData.data[0].params && SuggestWordsData.data[0].params.query_id && SuggestWordsData.data[0].params.query_id === search_text2.search_query_id) {
          const regex = new RegExp(`${search_text2.search_text}`, "g");
          item.text = item.text.replace(regex, (match) => {
            const themeClass = Common.useDarkTheme() ? "dark-mode" : "";
            return `<span class="search_text ${themeClass}">
                ${match}
                <span class="search-ico"></span>
            </span>&nbsp;&nbsp;&nbsp;`;
          });
        }
      }
    }
  }
  return data;
}
function br(data) {
  for (const i of data) {
    let text = i.text;
    text = text.replace(/\n/g, "<br>");
    i.text = text;
  }
  return data;
}
const heic2jpg = async (jsonArray) => {
  for (const item of jsonArray) {
    if (item.commentimage) {
      const headers = await new Networks({ url: item.commentimage, type: "arraybuffer" }).getHeaders();
      if (headers["content-type"] && headers["content-type"] === "image/heic") {
        const response = await new Networks({ url: item.commentimage, type: "arraybuffer" }).returnResult();
        const jpegBuffer = await heicConvertExports({
          buffer: response.data,
          format: "JPEG"
        });
        const base64Image = Buffer.from(jpegBuffer).toString("base64");
        item.commentimage = `data:image/jpeg;base64,${base64Image}`;
      }
    }
  }
  return jsonArray;
};
let mp4size = "";
let img;
class DouYin extends Base {
  e;
  type;
  is_mp4;
  is_slides;
  amagi;
  get botadapter() {
    return this.e.bot?.adapter?.name;
  }
  constructor(e, iddata) {
    super(e);
    this.e = e;
    this.type = iddata?.type;
    this.is_mp4 = iddata?.is_mp4;
    this.is_slides = false;
    this.amagi = new index_default({ douyin: Config.cookies.douyin });
  }
  async RESOURCES(data) {
    Config.app.EmojiReply && await this.e.bot.setMsgReaction(this.e.contact, this.e.messageId, Config.app.EmojiReplyID, true);
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
        this.is_slides = VideoData.aweme_detail.is_slides === true;
        let g_video_url = "";
        let g_title;
        let imagenum = 0;
        if (this.is_mp4 === false) {
          switch (true) {
            // 图集
            case (this.is_slides === false && VideoData.aweme_detail.images !== null): {
              const image_data = [];
              const imageres = [];
              let image_url = "";
              for (let i = 0; i < VideoData.aweme_detail.images.length; i++) {
                image_url = VideoData.aweme_detail.images[i].url_list[2] || VideoData.aweme_detail.images[i].url_list[1];
                const title = VideoData.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:\*\?"<>\|\r\n]/g, " ");
                g_title = title;
                imageres.push(segment.image(image_url));
                imagenum++;
                if (Config.app.rmmp4 === false) {
                  mkdirSync(`${Common.tempDri.images}${g_title}`);
                  const path = `${Common.tempDri.images}${g_title}/${i + 1}.png`;
                  await new Networks({ url: image_url, type: "arraybuffer" }).getData().then((data2) => fs.promises.writeFile(path, Buffer.from(data2)));
                }
              }
              const res = common.makeForward(imageres, this.e.sender.userId, this.e.sender.nick);
              image_data.push(res);
              if (imageres.length === 1) {
                await this.e.reply(segment.image(image_url));
              } else {
                await this.e.bot.sendForwardMsg(this.e.contact, res, {
                  source: "图片合集",
                  summary: `查看${res.length}张图片消息`,
                  prompt: "抖音图集解析结果",
                  news: [{ text: "点击查看解析结果" }]
                });
              }
              break;
            }
            // 合辑
            case (VideoData.aweme_detail.is_slides === true && VideoData.aweme_detail.images !== null): {
              const images = [];
              const temp = [];
              const liveimgbgm = await this.DownLoadFile(
                VideoData.aweme_detail.music.play_url.uri,
                {
                  title: `Douyin_tmp_A_${Date.now()}.mp3`,
                  headers: this.headers
                }
              );
              temp.push(liveimgbgm);
              for (const item of VideoData.aweme_detail.images) {
                imagenum++;
                if (item.clip_type === 2) {
                  images.push(segment.image(item.url_list[0]));
                  continue;
                }
                const liveimg = await this.DownLoadFile(
                  `https://aweme.snssdk.com/aweme/v1/play/?video_id=${item.video.play_addr_h264.uri}&ratio=1080p&line=0`,
                  {
                    title: `Douyin_tmp_V_${Date.now()}.mp4`,
                    headers: this.headers
                  }
                );
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
                        await this.removeFile(liveimg.filepath, true);
                        temp.push({ filepath: filePath, totalBytes: 0 });
                        images.push(segment.video("file://" + filePath));
                        return true;
                      } else {
                        await this.removeFile(liveimg.filepath, true);
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
                for (const item of temp) {
                  await this.removeFile(item.filepath, true);
                }
              }
              break;
            }
          }
        }
        if (VideoData.aweme_detail.music) {
          const music = VideoData.aweme_detail.music;
          const music_url = music.play_url.uri;
          if (this.is_mp4 === false && Config.app.rmmp4 === false && music_url !== void 0) {
            try {
              const path = Common.tempDri.images + `${g_title}/BGM.mp3`;
              await new Networks({ url: music_url, type: "arraybuffer" }).getData().then((data2) => fs.promises.writeFile(path, Buffer.from(data2)));
            } catch (error) {
              console.log(error);
            }
          }
          const haspath = music_url && this.is_mp4 === false && music_url !== void 0;
          haspath && await this.e.reply(segment.record(music_url, false));
        }
        let FPS;
        if (this.is_mp4) {
          const video_data = [];
          const videores = [];
          const video = VideoData.aweme_detail.video;
          FPS = video.bit_rate[0].FPS;
          if (Config.douyin.autoResolution) {
            logger.debug(`开始排除不符合条件的视频分辨率；

              共拥有${logger.yellow(video.bit_rate.length)}个视频源

              视频ID：${logger.green(VideoData.aweme_detail.aweme_id)}

              分享链接：${logger.green(VideoData.aweme_detail.share_url)}
              `);
            video.bit_rate = processVideos(video.bit_rate, Config.upload.filelimit);
            g_video_url = await new Networks({
              url: video.bit_rate[0].play_addr.url_list[2],
              headers: this.headers
            }).getLongLink();
          } else {
            g_video_url = await new Networks({
              url: video.play_addr_h264.url_list[2] ?? video.play_addr_h264.url_list[2],
              headers: this.headers
            }).getLongLink();
          }
          const cover2 = video.origin_cover.url_list[0];
          const title = VideoData.aweme_detail.preview_title.substring(0, 80).replace(/[\\/:\*\?"<>\|\r\n]/g, " ");
          g_title = title;
          mp4size = (video.bit_rate[0].play_addr.data_size / (1024 * 1024)).toFixed(2);
          videores.push(segment.text(`标题：
${title}`));
          videores.push(segment.text(`视频帧率：${"" + FPS}
视频大小：${mp4size}MB`));
          videores.push(segment.text(
            `永久直链(302跳转)
https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`
          ));
          videores.push(segment.text(`视频直链（有时效性，永久直链在下一条消息）：
${g_video_url}`));
          videores.push(segment.image(cover2));
          logger.info("视频地址", `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`);
          const res = common.makeForward(videores, this.e.sender.userId, this.e.sender.nick);
          video_data.push(res);
        }
        if (Config.douyin.comment && Config.douyin.comment) {
          const EmojiData = await getDouyinData("Emoji数据");
          const list = await Emoji(EmojiData);
          const commentsArray = await douyinComments(CommentsData, list);
          if (!commentsArray.jsonArray.length) {
            await this.e.reply("这个作品没有评论 ~");
          } else {
            const img2 = await Render(
              "douyin/comment",
              {
                Type: this.is_mp4 ? "视频" : this.is_slides ? "合辑" : "图集",
                CommentsData: commentsArray,
                CommentLength: String(commentsArray.jsonArray?.length ?? 0),
                share_url: this.is_mp4 ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0` : VideoData.aweme_detail.share_url,
                Title: g_title,
                VideoSize: mp4size,
                VideoFPS: FPS,
                ImageLength: imagenum
              }
            );
            await this.e.reply(img2);
          }
        }
        this.is_mp4 && await this.DownLoadVideo({ video_url: g_video_url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${g_title}.mp4` } });
        return true;
      }
      case "user_dynamic": {
        const UserVideoListData = await this.amagi.getDouyinData("用户主页视频列表数据", {
          sec_uid: data.sec_uid,
          typeMode: "strict"
        });
        const veoarray = [];
        veoarray.unshift("------------------------------ | ---------------------------- |\n");
        veoarray.unshift("标题                           | 分享二维码                    |\n");
        const forwardmsg = [];
        for (const i of UserVideoListData.aweme_list) {
          const title = i.desc;
          const cover2 = i.share_url;
          veoarray.push(`${title}       | ![img](${await browserExports.toDataURL(cover2, {
            errorCorrectionLevel: "H",
            type: "image/png",
            color: {
              light: "#ffffff00",
              dark: Common.useDarkTheme() ? "#FFFFFF" : "#000000"
            }
          })})    |
`);
          forwardmsg.push(segment.text(`作品标题: ${title}
分享链接: ${cover2}`));
        }
        const matext = markdown(veoarray.join(""), {});
        const htmlpath = `${Version.karinPath}/temp/html/${Version.pluginName}/douyin/user_worklist.html`;
        fs.writeFileSync(htmlpath, matext, "utf8");
        const img2 = await render.renderHtml(htmlpath);
        await this.e.reply(segment.image(img2));
        const Element2 = common.makeForward(forwardmsg, this.e.sender.userId, this.e.sender.nick);
        await this.e.bot.sendForwardMsg(this.e.contact, Element2);
        return true;
      }
      case "music_work": {
        const MusicData = await this.amagi.getDouyinData("音乐数据", {
          music_id: data.music_id,
          typeMode: "strict"
        });
        const sec_uid = MusicData.music_info.sec_uid;
        const UserData = await this.amagi.getDouyinData("用户主页数据", { sec_uid, typeMode: "strict" });
        if (!MusicData.music_info.play_url) {
          await this.e.reply("解析错误！该音乐抖音未提供下载链接，无法下载", { reply: true });
          return true;
        }
        img = await Render(
          "douyin/musicinfo",
          {
            image_url: MusicData.music_info.cover_hd.url_list[0],
            desc: MusicData.music_info.title,
            music_id: MusicData.music_info.id,
            create_time: Time(0),
            user_count: this.count(MusicData.music_info.user_count),
            avater_url: MusicData.music_info.avatar_large?.url_list[0] || UserData.user.avatar_larger.url_list[0],
            fans: UserData.user.mplatform_followers_count || UserData.user.follower_count,
            following_count: UserData.user.following_count,
            total_favorited: UserData.user.total_favorited,
            user_shortid: UserData.user.unique_id === "" ? UserData.user.short_id : UserData.user.unique_id,
            share_url: MusicData.music_info.play_url.uri,
            username: MusicData.music_info?.original_musician_display_name || MusicData.music_info.owner_nickname === "" ? MusicData.music_info.author : MusicData.music_info.owner_nickname
          }
        );
        await this.e.reply(
          [
            ...img,
            `
正在上传 ${MusicData.music_info.title}
`,
            `作曲: ${MusicData.music_info.original_musician_display_name || MusicData.music_info.owner_nickname === "" ? MusicData.music_info.author : MusicData.music_info.owner_nickname}
`,
            `music_id: ${MusicData.music_info.id}`
          ]
        );
        await this.e.reply(segment.record(MusicData.music_info.play_url.uri, false));
        return true;
      }
      case "live_room_detail": {
        const UserInfoData = await this.amagi.getDouyinData("用户主页数据", {
          sec_uid: data.sec_uid,
          typeMode: "strict"
        });
        if (UserInfoData.user.live_status === 1) {
          const live_data = await this.amagi.getDouyinData("直播间信息数据", { sec_uid: UserInfoData.user.sec_uid, typeMode: "strict" });
          const room_data = JSON.parse(UserInfoData.user.room_data);
          const img2 = await Render(
            "douyin/live",
            {
              image_url: [{ image_src: live_data.data.data[0].cover?.url_list[0] }],
              text: live_data.data.data[0].title,
              liveinf: `${live_data.data.partition_road_map.partition.title} | 房间号: ${room_data.owner.web_rid}`,
              在线观众: this.count(Number(live_data.data.data[0].room_view_stats?.display_value)),
              总观看次数: this.count(Number(live_data.data.data[0].stats?.total_user_str)),
              username: UserInfoData.user.nickname,
              avater_url: UserInfoData.user.avatar_larger.url_list[0],
              fans: this.count(UserInfoData.user.follower_count),
              create_time: convertTimestampToDateTime((/* @__PURE__ */ new Date()).getTime()),
              now_time: convertTimestampToDateTime((/* @__PURE__ */ new Date()).getTime()),
              share_url: "https://live.douyin.com/" + room_data.owner.web_rid,
              dynamicTYPE: "直播间信息"
            }
          );
          await this.e.reply(img2);
        } else {
          this.e.reply("当前博主未开播 ~");
        }
        return true;
      }
    }
  }
}
function processVideos(videos, filelimit) {
  const sizeLimitBytes = filelimit * 1024 * 1024;
  logger.debug(videos);
  const validVideos = videos.filter((video) => video.format !== "dash" && video.play_addr.data_size <= sizeLimitBytes);
  if (validVideos.length > 0) {
    return [validVideos.reduce((maxVideo, currentVideo) => {
      return currentVideo.play_addr.data_size > maxVideo.play_addr.data_size ? currentVideo : maxVideo;
    })];
  } else {
    const allValidVideos = videos.filter((video) => video.format !== "dash");
    return [allValidVideos.reduce((minVideo, currentVideo) => {
      return currentVideo.play_addr.data_size < minVideo.play_addr.data_size ? currentVideo : minVideo;
    })];
  }
}
function Time(delay) {
  const currentDate = /* @__PURE__ */ new Date();
  currentDate.setHours(currentDate.getHours() + delay);
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}
function convertTimestampToDateTime(timestamp) {
  const date = new Date(timestamp * 1e3);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}
function Emoji(data) {
  const ListArray = [];
  for (const i of data.emoji_list) {
    const display_name = i.display_name;
    const url = i.emoji_url.url_list[0];
    const Objject = {
      name: display_name,
      url
    };
    ListArray.push(Objject);
  }
  return ListArray;
}
async function getDouyinID(url, log = true) {
  const longLink = await new Networks({
    url,
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
    }
  }).getLongLink();
  let result = {};
  switch (true) {
    case longLink.includes("webcast.amemv.com"):
    case longLink.includes("live.douyin.com"): {
      if (longLink.includes("webcast.amemv.com")) {
        const sec_uid = /sec_user_id=([^&]+)/.exec(longLink);
        result = {
          type: "live_room_detail",
          sec_uid: sec_uid ? sec_uid[1] : void 0
        };
      } else if (longLink.includes("live.douyin.com")) {
        result = {
          type: "live_room_detail",
          room_id: longLink.split("/").pop()
        };
      }
      break;
    }
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
export {
  Base as B,
  DouYin as D,
  Networks as N,
  Bilibilipush as a,
  Bilibili as b,
  cleanOldDynamicCache as c,
  getDouyinID as g,
  processVideos as p
};
