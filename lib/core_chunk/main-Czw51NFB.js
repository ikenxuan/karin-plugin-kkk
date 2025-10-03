import { Root } from "../root.js";
import fs from "node:fs";
import { C as Client, D as DynamicType, g as getBilibiliData, b as bilibiliApiUrls, w as wbi_sign, M as MajorType, a as getDouyinData, h as heicConvertExports, l as logger$1 } from "./vendor-JPHpCiyC.js";
import karin, { copyConfigSync, filesByExt, watch, logger, requireFileSync, segment, createNotFoundResponse, ffmpeg, ffprobe, karinPathHtml, render, common, createBadRequestResponse, createServerErrorResponse, createSuccessResponse, getBot, defineConfig, components, mkdirSync, config } from "node-karin";
import axios, { AxiosError } from "node-karin/axios";
import { pipeline } from "stream/promises";
import path, { join } from "node:path";
import reactServerRender from "./template.js";
import { getDouyinDB, getBilibiliDB, cleanOldDynamicCache, bilibiliDBInstance, douyinDBInstance } from "./db-PBJFxoAJ.js";
import template from "node-karin/template";
import crypto from "node:crypto";
import os from "node:os";
import _ from "node-karin/lodash";
import { karinPathBase, karinPathTemp } from "node-karin/root";
import YAML from "node-karin/yaml";
class Cfg {
  /** 用户配置文件路径 */
  dirCfgPath;
  /** 默认配置文件路径 */
  defCfgPath;
  constructor() {
    this.dirCfgPath = `${karinPathBase}/${Root.pluginName}/config`;
    this.defCfgPath = `${Root.pluginPath}/config/default_config/`;
  }
  /** 初始化配置 */
  initCfg() {
    copyConfigSync(this.defCfgPath, this.dirCfgPath);
    const files = filesByExt(this.dirCfgPath, ".yaml", "name");
    for (const file of files) {
      const config2 = YAML.parseDocument(fs.readFileSync(`${this.dirCfgPath}/${file}`, "utf8"));
      const defConfig = YAML.parseDocument(fs.readFileSync(`${this.defCfgPath}/${file}`, "utf8"));
      const { differences, result } = this.mergeObjectsWithPriority(config2, defConfig);
      if (differences) {
        fs.writeFileSync(`${this.dirCfgPath}/${file}`, result.toString({ lineWidth: -1 }));
      }
    }
    setTimeout(() => {
      const list = filesByExt(this.dirCfgPath, ".yaml", "abs");
      list.forEach((file) => watch(file, (_old, _now) => {
      }));
    }, 2e3);
    return this;
  }
  /**
   * 获取默认配置和用户配置
   * @param name 配置文件名
   * @returns 返回合并后的配置
   */
  getDefOrConfig(name) {
    const def = this.getYaml("default_config", name);
    const config2 = this.getYaml("config", name);
    return { ...def, ...config2 };
  }
  /** 获取所有配置文件 */
  async All() {
    const douyinDB = await getDouyinDB();
    const bilibiliDB = await getBilibiliDB();
    const allConfig = {};
    const files = fs.readdirSync(this.defCfgPath);
    for (const file of files) {
      const fileName = path.basename(file, ".yaml");
      allConfig[fileName] = this.getDefOrConfig(fileName) || {};
    }
    if (allConfig.pushlist) {
      try {
        if (allConfig.pushlist.douyin) {
          for (const item of allConfig.pushlist.douyin) {
            const filterWords = await douyinDB.getFilterWords(item.sec_uid);
            const filterTags = await douyinDB.getFilterTags(item.sec_uid);
            const userInfo = await douyinDB.getDouyinUser(item.sec_uid);
            if (userInfo) {
              item.filterMode = userInfo.filterMode || "blacklist";
            }
            item.Keywords = filterWords;
            item.Tags = filterTags;
          }
        }
        if (allConfig.pushlist.bilibili) {
          for (const item of allConfig.pushlist.bilibili) {
            const filterWords = await bilibiliDB.getFilterWords(item.host_mid);
            const filterTags = await bilibiliDB.getFilterTags(item.host_mid);
            const userInfo = await bilibiliDB.getOrCreateBilibiliUser(item.host_mid);
            if (userInfo) {
              item.filterMode = userInfo.filterMode || "blacklist";
            }
            item.Keywords = filterWords;
            item.Tags = filterTags;
          }
        }
      } catch (error) {
        logger.error(`从数据库获取过滤配置时出错: ${error}`);
      }
    }
    return allConfig;
  }
  /**
   * 获取 YAML 文件内容
   * @param type 配置文件类型
   * @param name 配置文件名
   * @returns 返回 YAML 文件内容
   */
  getYaml(type, name) {
    const file = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
    return requireFileSync(file, { force: true });
  }
  /**
   * 修改配置文件
   * @param name 文件名
   * @param key 键
   * @param value 值
   * @param type 配置文件类型，默认为用户配置文件 `config`
   */
  Modify(name, key, value, type = "config") {
    const path2 = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
    const yamlData = YAML.parseDocument(fs.readFileSync(path2, "utf8"));
    const keys = key.split(".");
    this.setNestedValue(yamlData.contents, keys, value);
    fs.writeFileSync(path2, yamlData.toString({ lineWidth: -1 }), "utf8");
  }
  /**
   * 修改整个配置文件，保留注释
   * @param name 文件名
   * @param config 完整的配置对象
   * @param type 配置文件类型，默认为用户配置文件 `config`
   */
  async ModifyPro(name, config2, type = "config") {
    const douyinDB = await getDouyinDB();
    const bilibiliDB = await getBilibiliDB();
    const filePath = type === "config" ? `${this.dirCfgPath}/${name}.yaml` : `${this.defCfgPath}/${name}.yaml`;
    try {
      const existingContent = fs.readFileSync(filePath, "utf8");
      const doc = YAML.parseDocument(existingContent);
      let filterCfg = config2;
      if (name === "pushlist" && ("douyin" in config2 || "bilibili" in config2)) {
        const cleanedConfig = { ...config2 };
        if ("douyin" in cleanedConfig) {
          cleanedConfig.douyin = cleanedConfig.douyin.map((item) => {
            const { Keywords, Tags, filterMode, ...rest } = item;
            return rest;
          });
        }
        if ("bilibili" in cleanedConfig) {
          cleanedConfig.bilibili = cleanedConfig.bilibili.map((item) => {
            const { Keywords, Tags, filterMode, ...rest } = item;
            return rest;
          });
        }
        filterCfg = cleanedConfig;
      }
      const newConfigNode = YAML.parseDocument(YAML.stringify(filterCfg)).contents;
      this.deepMergeYaml(doc.contents, newConfigNode);
      fs.writeFileSync(filePath, doc.toString({ lineWidth: -1 }), "utf8");
      if ("douyin" in config2) {
        await this.syncFilterConfigToDb(config2.douyin, douyinDB, "sec_uid");
        logger.debug("已同步抖音过滤配置到数据库");
      }
      if ("bilibili" in config2) {
        await this.syncFilterConfigToDb(config2.bilibili, bilibiliDB, "host_mid");
        logger.debug("已同步B站过滤配置到数据库");
      }
      return true;
    } catch (error) {
      logger.error(`修改配置文件时发生错误：${error}`);
      return false;
    }
  }
  /**
   * 同步过滤配置到数据库
   * @param items 推送项列表
   * @param db 数据库实例
   * @param idField ID字段名称
   */
  async syncFilterConfigToDb(items, db, idField) {
    for (const item of items) {
      const id = item[idField];
      if (!id) continue;
      if (item.filterMode) {
        await db.updateFilterMode(id, item.filterMode);
      }
      if (item.Keywords && Array.isArray(item.Keywords)) {
        const existingWords = await db.getFilterWords(id);
        for (const word of existingWords) {
          if (!item.Keywords.includes(word)) {
            await db.removeFilterWord(id, word);
          }
        }
        for (const word of item.Keywords) {
          if (!existingWords.includes(word)) {
            await db.addFilterWord(id, word);
          }
        }
      }
      if (item.Tags && Array.isArray(item.Tags)) {
        const existingTags = await db.getFilterTags(id);
        for (const tag of existingTags) {
          if (!item.Tags.includes(tag)) {
            await db.removeFilterTag(id, tag);
          }
        }
        for (const tag of item.Tags) {
          if (!existingTags.includes(tag)) {
            await db.addFilterTag(id, tag);
          }
        }
      }
    }
  }
  /**
   * 深度合并YAML节点（保留目标注释）
   * @param target 目标节点（保留注释的原始节点）
   * @param source 源节点（提供新值的节点）
   */
  deepMergeYaml(target, source) {
    if (YAML.isMap(target) && YAML.isMap(source)) {
      for (const pair of source.items) {
        const key = pair.key;
        const sourceVal = pair.value;
        const targetVal = target.get(key);
        if (targetVal === void 0) {
          target.set(key, sourceVal);
        } else if (YAML.isMap(targetVal) && YAML.isMap(sourceVal)) {
          this.deepMergeYaml(targetVal, sourceVal);
        } else if (YAML.isSeq(targetVal) && YAML.isSeq(sourceVal)) {
          targetVal.items = sourceVal.items;
          targetVal.flow = sourceVal.flow;
        } else {
          target.set(key, sourceVal);
        }
      }
    }
  }
  /**
   * 在YAML映射中设置嵌套值
   *
   * 该函数用于在给定的YAML映射（map）中，根据指定的键路径（keys）设置值（value）
   * 如果键路径不存在，该函数会创建必要的嵌套映射结构并设置值
   *
   * @param map YAML映射，作为设置值的目标
   * @param keys 键路径，表示要设置的值的位置
   * @param value 要设置的值
   */
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
      if (YAML.isMap(target) && YAML.isMap(source)) {
        for (const pair of source.items) {
          const key = pair.key;
          const value = pair.value;
          const existing = target.get(key);
          if (existing === void 0) {
            differences = true;
            target.set(key, value);
          } else if (YAML.isMap(value) && YAML.isMap(existing)) {
            mergeYamlNodes(existing, value);
          } else if (existing !== value) {
            differences = true;
            target.set(key, value);
          }
        }
      }
    };
    mergeYamlNodes(defaultDoc.contents, userDoc.contents);
    return { differences, result: defaultDoc };
  }
  /**
   * 同步配置到数据库
   * 这个方法应该在所有模块都初始化完成后调用
   */
  async syncConfigToDatabase() {
    try {
      const pushCfg = this.getYaml("config", "pushlist");
      const douyinDB = await getDouyinDB();
      const bilibiliDB = await getBilibiliDB();
      if (pushCfg.bilibili) {
        await bilibiliDB.syncConfigSubscriptions(pushCfg.bilibili);
      }
      if (pushCfg.douyin) {
        await douyinDB.syncConfigSubscriptions(pushCfg.douyin);
      }
      logger.debug("[BilibiliDB] + [DouyinDB] 配置已同步到数据库");
    } catch (error) {
      logger.error("同步配置到数据库失败:", error);
    }
  }
}
let configInstance = null;
const getConfigInstance = () => {
  if (!configInstance) {
    configInstance = new Proxy(new Cfg().initCfg(), {
      get(target, prop) {
        if (prop in target) return target[prop];
        return target.getDefOrConfig(prop);
      }
    });
  }
  return configInstance;
};
const Config = new Proxy({}, {
  get(target, prop) {
    return getConfigInstance()[prop];
  }
});
class Base {
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
        kuaishou: Config.cookies.kuaishou
      },
      request: {
        timeout: Config.request.timeout,
        headers: { "User-Agent": Config.request["User-Agent"] },
        proxy: Config.request.proxy?.switch ? Config.request.proxy : false
      }
    });
    this.amagi = new Proxy(client, {
      get(target, prop) {
        const method = target[prop];
        if (typeof method === "function") {
          return async (...args) => {
            const result = await Function.prototype.apply.call(method, target, args);
            if (!result) {
              logger.warn(`Amagi API调用 (${String(prop)}) 返回了空值`);
              return result;
            }
            return result;
          };
        }
        return method;
      }
    });
  }
}
const Count = (count) => {
  if (count > 1e4) {
    return (count / 1e4).toFixed(1) + "万";
  } else {
    return count?.toString() ?? "无法获取";
  }
};
const uploadFile = async (event, file, videoUrl, options) => {
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
    logger.mark(`已开启视频文件 base64转换 正在进行${logger.yellow("base64转换中")}...`);
  } else File = options?.useGroupFile ? file.filepath : `file://${file.filepath}`;
  try {
    if (options?.active) {
      if (options.useGroupFile) {
        const bot = karin.getBot(String(options.activeOption?.uin));
        logger.mark(`${logger.blue("主动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("bot.uploadFile")}回复...`);
        await bot.uploadFile(contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split("/").pop()}`);
      } else {
        logger.mark(`${logger.blue("主动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("karin.sendMsg")}回复...`);
        const status = await karin.sendMsg(selfId, contact, [segment.video(File)]);
        status.messageId ? sendStatus = true : sendStatus = false;
      }
    } else {
      if (options?.useGroupFile) {
        logger.mark(`${logger.blue("被动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("e.bot.uploadFile")}回复...`);
        await event.bot.uploadFile(event.contact, File, file.originTitle ? `${file.originTitle}.mp4` : `${File.split("/").pop()}`);
      } else {
        logger.mark(`${logger.blue("被动消息:")} 视频大小: ${newFileSize.toFixed(1)}MB 正在通过${logger.yellow("e.reply")}回复...`);
        const status = await event.reply(segment.video(File) || videoUrl);
        status.messageId ? sendStatus = true : sendStatus = false;
      }
    }
    return sendStatus;
  } catch (error) {
    if (options && options.active === false) {
      await event.reply("视频文件上传失败" + JSON.stringify(error, null, 2));
    }
    logger.error("视频文件上传错误," + String(error));
    return false;
  } finally {
    const filePath = file.filepath;
    logger.mark(`临时预览地址：http://localhost:${process.env.HTTP_PORT}/api/kkk/video/${encodeURIComponent(filePath.split("/").pop() ?? "")}`);
    Config.app.removeCache && logger.info(`文件 ${filePath} 将在 10 分钟后删除`);
    setTimeout(async () => {
      await Common.removeFile(filePath);
    }, 10 * 60 * 1e3);
  }
};
const downloadVideo = async (event, downloadOpt, uploadOpt) => {
  const fileHeaders = await new Networks({ url: downloadOpt.video_url, headers: downloadOpt.headers ?? baseHeaders }).getHeaders();
  const fileSizeContent = fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
  const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2);
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
  res = { ...res, ...downloadOpt.title };
  res.totalBytes = Number((res.totalBytes / (1024 * 1024)).toFixed(2));
  return await uploadFile(event, res, downloadOpt.video_url, uploadOpt);
};
const downloadFile = async (videoUrl, opt) => {
  const startTime = Date.now();
  const { filepath, totalBytes } = await new Networks({
    url: videoUrl,
    // 视频地址
    headers: opt.headers ?? baseHeaders,
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
};
const processFilename = (filename, maxLength = 50) => {
  const lastDotIndex = filename.lastIndexOf(".");
  const hasExtension = lastDotIndex > 0 && lastDotIndex < filename.length - 1;
  if (!hasExtension) {
    return filename.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
  }
  const nameWithoutExt = filename.substring(0, lastDotIndex);
  const extension = filename.substring(lastDotIndex);
  const processedName = nameWithoutExt.substring(0, maxLength).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
  return processedName + "..." + extension;
};
class Tools {
  /**
   * 插件缓存目录
   */
  tempDri;
  constructor() {
    this.tempDri = {
      /** 插件缓存目录 */
      default: `${karinPathTemp}/${Root.pluginName}/`.replace(/\\/g, "/"),
      /** 视频缓存文件 */
      video: `${karinPathTemp}/${Root.pluginName}/kkkdownload/video/`.replace(/\\/g, "/"),
      /** 图片缓存文件 */
      images: `${karinPathTemp}/${Root.pluginName}/kkkdownload/images/`.replace(/\\/g, "/")
    };
  }
  /**
   * 获取引用消息
   * @param e event 消息事件
   * @returns 被引用的消息
   */
  async getReplyMessage(e) {
    if (e.replyId) {
      const reply = await e.bot.getMsg(e.contact, e.replyId);
      for (const v of reply.elements) {
        if (v.type === "text") {
          return v.text;
        } else if (v.type === "json") {
          return v.data;
        }
      }
    }
    return "";
  }
  /**
  * 将中文数字转换为阿拉伯数字的函数
  * @param chineseNumber 数字的中文
  * @returns 中文数字对应的阿拉伯数字映射
  */
  chineseToArabic(chineseNumber) {
    const chineseToArabicMap = {
      零: 0,
      一: 1,
      二: 2,
      三: 3,
      四: 4,
      五: 5,
      六: 6,
      七: 7,
      八: 8,
      九: 9
    };
    const units = {
      十: 10,
      百: 100,
      千: 1e3,
      万: 1e4,
      亿: 1e8
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
        if (unit > 1) {
          temp += num * unit;
        } else {
          temp += num;
        }
        unit = 1;
      }
    }
    return result + temp;
  }
  /**
  * 格式化cookie字符串
  * @param cookies cookie数组
  * @returns 格式化后的cookie字符串
  */
  formatCookies(cookies) {
    return cookies.map((cookie) => {
      const [nameValue] = cookie.split(";").map((part) => part.trim());
      const [name, value] = nameValue.split("=");
      return `${name}=${value}`;
    }).join("; ");
  }
  /**
  * 计算目标视频平均码率（单位：Kbps）
  * @param targetSizeMB 目标视频大小（MB）
  * @param duration 视频时长（秒）
  * @returns
  */
  calculateBitrate(targetSizeMB, duration) {
    const targetSizeBytes = targetSizeMB * 1024 * 1024;
    return targetSizeBytes * 8 / duration / 1024;
  }
  /**
   * 获取视频文件大小（单位MB）
   * @param filePath 视频文件绝对路径
   * @returns
   */
  async getVideoFileSize(filePath) {
    try {
      const stats = await fs.promises.stat(filePath);
      const fileSizeInBytes = stats.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      return fileSizeInMB;
    } catch (error) {
      console.error("获取文件大小时发生错误:", error);
      throw error;
    }
  }
  /**
   * 根据配置文件的配置项，删除缓存文件
   * @param path 文件的绝对路径
   * @param force 是否强制删除，默认 `false`
   * @returns
   */
  async removeFile(path2, force = false) {
    path2 = path2.replace(/\\/g, "/");
    if (Config.app.removeCache) {
      try {
        await fs.promises.unlink(path2);
        logger.mark("缓存文件: ", path2 + " 删除成功！");
        return true;
      } catch (err) {
        logger.error("缓存文件: ", path2 + " 删除失败！", err);
        return false;
      }
    } else if (force) {
      try {
        await fs.promises.unlink(path2);
        logger.mark("缓存文件: ", path2 + " 删除成功！");
        return true;
      } catch (err) {
        logger.error("缓存文件: ", path2 + " 删除失败！", err);
        return false;
      }
    }
    return true;
  }
  /**
  * 将时间戳转换为日期时间字符串
  * @param timestamp 时间戳
  * @returns 格式为YYYY-MM-DD HH:MM的日期时间字符串
  */
  convertTimestampToDateTime(timestamp) {
    const date = new Date(timestamp * 1e3);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  /**
  * 获取当前时间：年-月-日 时:分:秒
  * @returns
  */
  getCurrentTime() {
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const formattedMonth = month < 10 ? "0" + month : "" + month;
    const formattedDay = day < 10 ? "0" + day : "" + day;
    const formattedHour = hour < 10 ? "0" + hour : "" + hour;
    const formattedMinute = minute < 10 ? "0" + minute : "" + minute;
    const formattedSecond = second < 10 ? "0" + second : "" + second;
    return `${year}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
  }
  /**
  * 评论图、推送图是否使用深色模式
  * @returns
  */
  useDarkTheme() {
    let dark = true;
    const configTheme = Config.app.Theme;
    if (configTheme === 0) {
      const date = (/* @__PURE__ */ new Date()).getHours();
      if (date >= 6 && date < 18) {
        dark = false;
      }
    } else if (configTheme === 1) {
      dark = false;
    } else if (configTheme === 2) {
      dark = true;
    }
    return dark;
  }
  /**
  * 传入一个时间戳（单位：毫秒），返回距离当前时间的相对的时间字符串
  * @param timestamp 时间戳
  * @returns 距离这个时间戳过去的多久的字符串
  */
  timeSince(timestamp) {
    const now = Date.now();
    const elapsed = now - timestamp;
    const seconds = Math.floor(elapsed / 1e3);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}小时${remainingMinutes}分钟${remainingSeconds}秒`;
    } else if (minutes > 0) {
      return `${minutes}分钟${remainingSeconds}秒`;
    } else {
      return `${seconds}秒`;
    }
  }
  /**
   * 验证视频请求
   * @param filename 文件名
   * @param res 响应对象
   * @returns 返回安全解析后的路径
   */
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
  /**
   * 格式化数字
   * @param num 数字
   * @returns 格式化后的字符串
   */
  count(num) {
    if (num > 1e4) {
      return (num / 1e4).toFixed(1) + "万";
    }
    return num.toString();
  }
}
const Common = new Tools();
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
}
const baseHeaders = {
  Accept: "*/*",
  "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36 Edg/137.0.0.0"
};
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
    this.headers = data.headers ? Object.fromEntries(
      Object.entries(data.headers).map(([key, value]) => [key, String(value)])
    ) : {};
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
    const config2 = {
      url: this.url,
      method: this.method,
      headers: this.headers,
      responseType: this.type
    };
    if (this.method === "POST" && this.body) {
      config2.data = this.body;
    }
    return config2;
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
    let errorMsg = `获取链接重定向失败: ${this.url || url}`;
    try {
      const response = await this.axiosInstance.head(this.url || url);
      return response.request.res.responseUrl;
    } catch (error) {
      const axiosError = error;
      if (axiosError.response) {
        if (axiosError.response.status === 302) {
          const redirectUrl = axiosError.response.headers.location;
          logger.info(`检测到302重定向，目标地址: ${redirectUrl}`);
          return await this.getLongLink(redirectUrl);
        } else if (axiosError.response.status === 403) {
          errorMsg = `403 Forbidden 禁止访问！${this.url || url}`;
          logger.error(errorMsg);
          return errorMsg;
        }
      }
      logger.error(errorMsg);
      return errorMsg;
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
   * @returns 返回响应头信息
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
const Render = async (path2, data) => {
  const pathParts = path2.split("/");
  let templateType;
  let templateName;
  if (pathParts.length === 2) {
    [templateType, templateName] = pathParts;
  } else if (pathParts.length === 3) {
    templateType = pathParts[0];
    templateName = `${pathParts[1]}/${pathParts[2]}`;
  } else {
    throw new Error(`不支持的路径格式: ${path2}`);
  }
  const outputDir = join(karinPathHtml, Root.pluginName, templateType);
  const renderRequest = {
    templateType,
    templateName,
    scale: Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100)),
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
  };
  const result = await reactServerRender(renderRequest, outputDir).then((res) => {
    if (!res.success || !res.htmlPath) {
      throw new Error(res.error || "SSR渲染失败");
    }
    return res;
  }).catch((err) => {
    throw new Error(err.message || "SSR渲染失败");
  });
  const images = await render.render({
    name: `${Root.pluginName}/${templateType}/${templateName}`,
    file: result.htmlPath,
    multiPage: 12e3,
    selector: "#container",
    fullPage: false,
    type: "jpeg",
    pageGotoParams: {
      waitUntil: "load",
      timeout: Config.app.RenderWaitTime * 1e3
    }
  });
  const ret = [];
  for (const image of images) {
    ret.push(segment.image("base64://" + image));
  }
  return ret;
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
        if (Config.bilibili.sendContent.some((content) => content === "info")) {
          const img2 = await Render("bilibili/videoInfo", {
            share_url: "https://b23.tv/" + infoData.data.data.bvid,
            title: infoData.data.data.title,
            desc: infoData.data.data.desc,
            stat: infoData.data.data.stat,
            bvid: infoData.data.data.bvid,
            ctime: infoData.data.data.ctime,
            pic: infoData.data.data.pic,
            owner: infoData.data.data.owner
          });
          this.e.reply(img2);
        }
        let videoSize = "";
        let correctList;
        if (this.islogin && Config.bilibili.videopriority === false) {
          const simplify = playUrlData.data.data.dash.video.filter((item, index, self) => {
            return self.findIndex((t) => {
              return t.id === item.id;
            }) === index;
          });
          playUrlData.data.data.dash.video = simplify;
          correctList = await bilibiliProcessVideos({
            accept_description: playUrlData.data.data.accept_description,
            bvid: infoData.data.data.bvid,
            qn: Config.bilibili.videoQuality
          }, simplify, playUrlData.data.data.dash.audio[0].base_url);
          playUrlData.data.data.dash.video = correctList.videoList;
          playUrlData.data.data.accept_description = correctList.accept_description;
          videoSize = await getvideosize(correctList.videoList[0].base_url, playUrlData.data.data.dash.audio[0].base_url, infoData.data.data.bvid);
        } else {
          videoSize = (playUrlData.data.data.durl[0].size / (1024 * 1024)).toFixed(2);
        }
        if (Config.bilibili.sendContent.some((content) => content === "comment")) {
          const commentsData = await this.amagi.getBilibiliData("评论数据", {
            number: Config.bilibili.numcomment,
            type: 1,
            oid: infoData.data.data.aid.toString(),
            typeMode: "strict"
          });
          const commentsdata = bilibiliComments(commentsData.data);
          if (!commentsdata?.length) {
            this.e.reply("这个视频没有评论 ~");
          } else {
            img$1 = await Render("bilibili/comment", {
              Type: "视频",
              CommentsData: commentsdata,
              CommentLength: Config.bilibili.realCommentCount ? Count(infoData.data.data.stat.reply) : String(commentsdata.length),
              share_url: "https://b23.tv/" + infoData.data.data.bvid,
              Clarity: Config.bilibili.videopriority === true ? nockData.data.data.accept_description[0] : playUrlData.data.data.accept_description[0],
              VideoSize: Config.bilibili.videopriority === true ? (nockData.data.data.durl[0].size / (1024 * 1024)).toFixed(2) : videoSize,
              ImageLength: 0,
              shareurl: "https://b23.tv/" + infoData.data.data.bvid
            });
            this.e.reply(img$1);
          }
        }
        if (Config.bilibili.sendContent.some((content) => content === "video")) {
          if (Config.upload.usefilelimit && Number(videoSize) > Number(Config.upload.filelimit) && !Config.upload.compress) {
            this.e.reply(`设定的最大上传大小为 ${Config.upload.filelimit}MB
当前解析到的视频大小为 ${Number(videoSize)}MB
视频太大了，还是去B站看吧~`, { reply: true });
          } else {
            await this.getvideo(
              Config.bilibili.videopriority === true ? { playUrlData: nockData.data } : { infoData: infoData.data, playUrlData: playUrlData.data }
            );
          }
        }
        break;
      }
      case "bangumi_video_info": {
        const videoInfo = await this.amagi.getBilibiliData("番剧基本信息数据", { [iddata.isEpid ? "ep_id" : "season_id"]: iddata.realid, typeMode: "strict" });
        this.islogin = (await checkCk()).Status === "isLogin";
        this.isVIP = (await checkCk()).isVIP;
        const Episodes = [];
        for (const item of videoInfo.data.result.episodes) {
          Episodes.push({
            cover: item.cover,
            bvid: item.bvid,
            link: item.short_link,
            long_title: item.long_title,
            pub_time: item.pub_time,
            badge: item.badge === "" ? "限免" : item.badge,
            badge_info: item.badge_info
          });
        }
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
          if (/^[一二三四五六七八九十百千万]+$/.test(Episode)) {
            Episode = Common.chineseToArabic(Episode).toString();
          }
          this.downloadfilename = videoInfo.data.result.episodes[Number(Episode) - 1].share_copy.substring(0, 50).replace(/[\\/:*?"<>|\r\n\s]/g, " ");
          this.e.reply(`收到请求，第${Episode}集
${this.downloadfilename}
正在下载中`);
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
          const simplify = playUrlData.result.dash.video.filter((item, index, self) => {
            return self.findIndex((t) => {
              return t.id === item.id;
            }) === index;
          });
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
        const dynamicInfo = await this.amagi.getBilibiliData("动态详情数据", { dynamic_id: iddata.dynamic_id, typeMode: "strict" });
        const dynamicInfoCard = await this.amagi.getBilibiliData("动态卡片数据", { dynamic_id: dynamicInfo.data.data.item.id_str, typeMode: "strict" });
        const commentsData = dynamicInfo.data.data.item.type !== DynamicType.LIVE_RCMD && await this.amagi.getBilibiliData("评论数据", {
          type: mapping_table(dynamicInfo.data.data.item.type),
          oid: oid(dynamicInfo.data, dynamicInfoCard.data),
          number: Config.bilibili.numcomment,
          typeMode: "strict"
        });
        const dynamicCARD = JSON.parse(dynamicInfoCard.data.data.card.card);
        const userProfileData = await this.amagi.getBilibiliData("用户主页数据", { host_mid: dynamicInfo.data.data.item.modules.module_author.mid, typeMode: "strict" });
        switch (dynamicInfo.data.data.item.type) {
          /** 图文、纯图 */
          case DynamicType.DRAW: {
            const imgArray = [];
            for (const img2 of dynamicInfo.data.data.item.modules.module_dynamic.major.opus.pics) {
              if (img2.url) {
                imgArray.push(segment.image(img2.url));
              }
            }
            if (Config.bilibili.sendContent.some((content) => content === "comment") && commentsData) {
              const commentsdata = bilibiliComments(commentsData.data);
              img$1 = await Render("bilibili/comment", {
                Type: "动态",
                CommentsData: commentsdata,
                CommentLength: String(commentsdata?.length ?? 0),
                share_url: "https://t.bilibili.com/" + dynamicInfo.data.data.item.id_str,
                ImageLength: dynamicInfo.data.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? "动态中没有附带图片",
                shareurl: "动态分享链接"
              });
              if (imgArray.length === 1) this.e.reply(imgArray[0]);
              if (imgArray.length > 1) {
                const forwardMsg = common.makeForward(imgArray, this.e.userId, this.e.sender.nick);
                await this.e.bot.sendForwardMsg(this.e.contact, forwardMsg);
              }
              this.e.reply(img$1);
            }
            const dynamicCARD2 = JSON.parse(dynamicInfoCard.data.data.card.card);
            if ("topic" in dynamicInfo.data.data.item.modules.module_dynamic && dynamicInfo.data.data.item.modules.module_dynamic.topic !== null) {
              const name = dynamicInfo.data.data.item.modules.module_dynamic.topic.name;
              dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.rich_text_nodes.unshift({
                orig_text: name,
                jump_url: "",
                text: name,
                type: "topic"
              });
              dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text = `${name}

` + dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text;
            }
            this.e.reply(await Render("bilibili/dynamic/DYNAMIC_TYPE_DRAW", {
              image_url: dynamicCARD2.item.pictures && cover(dynamicCARD2.item.pictures),
              // TIP: 2025/08/20, 动态卡片数据中，图文动态的描述文本在 major.opus.summary 中
              text: dynamicInfo.data.data.item.modules.module_dynamic.major ? replacetext(
                br$4(dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.text ?? ""),
                dynamicInfo.data.data.item.modules.module_dynamic.major.opus?.summary?.rich_text_nodes ?? []
              ) : "",
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
          /** 纯文 */
          // case DynamicType.WORD: {
          //   const text = replacetext(br(dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.modules.module_dynamic.major.opus.summary.rich_text_nodes)
          //   if (dynamicInfo.data.data.item.modules.module_dynamic.additional) {
          //     switch (dynamicInfo.data.data.item.modules.module_dynamic.additional.type) {
          //       // TODO: 动态中的额外卡片元素，
          //       // see: https://github.com/SocialSisterYi/bilibili-API-collect/blob/afc4349247ff7d59ac16dfe6eec8ff2b766a74f0/docs/dynamic/all.md
          //       // find: data.items[n].modules.module_dynamic.additional
          //       case AdditionalType.RESERVE: {
          //         break
          //       }
          //       case AdditionalType.COMMON:
          //       case AdditionalType.GOODS:
          //       case AdditionalType.VOTE:
          //       case AdditionalType.UGC:
          //       case AdditionalType.MATCH:
          //       case AdditionalType.UPOWER_LOTTERY:
          //       default: {
          //         break
          //       }
          //     }
          //   }
          //   this.e.reply(
          //     await Render('bilibili/dynamic/DYNAMIC_TYPE_WORD', {
          //       text,
          //       dianzan: Count(dynamicInfo.data.data.item.modules.module_stat.like.count),
          //       pinglun: Count(dynamicInfo.data.data.item.modules.module_stat.comment.count),
          //       share: Count(dynamicInfo.data.data.item.modules.module_stat.forward.count),
          //       create_time: dynamicInfo.data.data.item.modules.module_author.pub_time,
          //       avatar_url: dynamicInfo.data.data.item.modules.module_author.face,
          //       frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
          //       share_url: 'https://t.bilibili.com/' + dynamicInfo.data.data.item.id_str,
          //       username: checkvip(dynamicInfo.data.data.card ?? userProfileData.data.data.card),
          //       fans: Count(dynamicInfo.data.data.follower),
          //       user_shortid: dynamicInfo.data.data.item.modules.module_author.mid,
          //       total_favorited: Count(userProfileData.data.data.like_num),
          //       following_count: Count(userProfileData.data.data.card.attention),
          //       dynamicTYPE: '纯文动态'
          //     })
          //   )
          //   commentsData && this.e.reply(
          //     await Render('bilibili/comment', {
          //       Type: '动态',
          //       CommentsData: bilibiliComments(commentsData.data),
          //       CommentLength: String((bilibiliComments(commentsData.data)?.length) ? bilibiliComments(commentsData.data).length : 0),
          //       share_url: 'https://t.bilibili.com/' + dynamicInfo.data.data.item.id_str,
          //       ImageLength: dynamicInfo.data.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? '动态中没有附带图片',
          //       shareurl: '动态分享链接'
          //     })
          //   )
          //   break
          // }
          /** 转发动态 */
          case DynamicType.FORWARD: {
            const text = replacetext(
              br$4(dynamicInfo.data.data.item.modules.module_dynamic.desc.text),
              dynamicInfo.data.data.item.modules.module_dynamic.desc.rich_text_nodes
            );
            let data = {};
            switch (dynamicInfo.data.data.item.orig.type) {
              case DynamicType.AV: {
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
              }
              case DynamicType.DRAW: {
                const dynamicCARD2 = await this.amagi.getBilibiliData("动态卡片数据", { dynamic_id: dynamicInfo.data.data.item.orig.id_str, typeMode: "strict" });
                const cardData = JSON.parse(dynamicCARD2.data.data.card.card);
                data = {
                  username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
                  text: replacetext(br$4(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  image_url: cardData.item.pictures && cover(cardData.item.pictures),
                  decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
                  frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
                };
                break;
              }
              case DynamicType.WORD: {
                data = {
                  username: checkvip$2(dynamicInfo.data.data.item.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.orig.modules.module_author.pub_ts),
                  avatar_url: dynamicInfo.data.data.item.orig.modules.module_author.face,
                  text: replacetext(br$4(dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.text), dynamicInfo.data.data.item.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  decoration_card: generateDecorationCard(dynamicInfo.data.data.item.orig.modules.module_author.decoration_card),
                  frame: dynamicInfo.data.data.item.orig.modules.module_author.pendant.image
                };
                break;
              }
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
              default: {
                logger.warn(`UP主：${userProfileData.data.data.card.name}的${logger.green("转发动态")}转发的原动态类型为「${logger.yellow(dynamicInfo.data.item.orig.type)}」暂未支持解析`);
                break;
              }
            }
            this.e.reply(
              await Render("bilibili/dynamic/DYNAMIC_TYPE_FORWARD", {
                text,
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
              })
            );
            break;
          }
          /** 视频动态 */
          case DynamicType.AV: {
            if (dynamicInfo.data.data.item.modules.module_dynamic.major.type === "MAJOR_TYPE_ARCHIVE") {
              const bvid = dynamicInfo.data.data.item.modules.module_dynamic.major.archive.bvid;
              const INFODATA = await getBilibiliData("单个视频作品数据", "", { bvid, typeMode: "strict" });
              const dycrad = dynamicInfoCard.data.data.card && dynamicInfoCard.data.data.card.card && JSON.parse(dynamicInfoCard.data.data.card.card);
              commentsData && this.e.reply(
                await Render("bilibili/comment", {
                  Type: "动态",
                  CommentsData: bilibiliComments(commentsData.data),
                  CommentLength: String(bilibiliComments(commentsData.data)?.length ? bilibiliComments(commentsData.data).length : 0),
                  share_url: "https://www.bilibili.com/video/" + bvid,
                  ImageLength: dynamicInfo.data.data.item.modules?.module_dynamic?.major?.draw?.items?.length ?? "动态中没有附带图片",
                  shareurl: "动态分享链接"
                })
              );
              img$1 = await Render(
                "bilibili/dynamic/DYNAMIC_TYPE_AV",
                {
                  image_url: INFODATA.data.data.pic,
                  text: br$4(INFODATA.data.data.title),
                  desc: br$4(dycrad.desc),
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
                  dynamicTYPE: "视频动态"
                }
              );
              this.e.reply(img$1);
            }
            break;
          }
          /** 直播动态 */
          case DynamicType.LIVE_RCMD: {
            const userINFO = await getBilibiliData("用户主页数据", "", { host_mid: dynamicInfo.data.data.item.modules.module_author.mid, typeMode: "strict" });
            img$1 = await Render(
              "bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
              {
                image_url: dynamicCARD.live_play_info.cover,
                text: br$4(dynamicCARD.live_play_info.title),
                liveinf: br$4(`${dynamicCARD.live_play_info.area_name} | 房间号: ${dynamicCARD.live_play_info.room_id}`),
                username: checkvip$2(userINFO.data.data.card),
                avatar_url: userINFO.data.data.card.face,
                frame: dynamicInfo.data.data.item.modules.module_author.pendant.image,
                fans: Count(userINFO.data.data.follower),
                create_time: Common.convertTimestampToDateTime(dynamicInfo.data.data.item.modules.module_author.pub_ts),
                now_time: Common.getCurrentTime(),
                share_url: "https://live.bilibili.com/" + dynamicCARD.live_play_info.room_id,
                dynamicTYPE: "直播动态"
              }
            );
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
        const liveInfo = await this.amagi.getBilibiliData("直播间信息", { room_id: iddata.room_id, typeMode: "strict" });
        const roomInitInfo = await this.amagi.getBilibiliData("直播间初始化信息", { room_id: iddata.room_id, typeMode: "strict" });
        const userProfileData = await this.amagi.getBilibiliData("用户主页数据", { host_mid: roomInitInfo.data.data.uid, typeMode: "strict" });
        if (roomInitInfo.data.data.live_status === 0) {
          this.e.reply(`「${userProfileData.data.data.card.name}」
未开播，正在休息中~`);
          return true;
        }
        const img2 = await Render(
          "bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
          {
            image_url: liveInfo.data.data.user_cover,
            text: br$4(liveInfo.data.data.title),
            liveinf: br$4(`${liveInfo.data.data.area_name} | 房间号: ${liveInfo.data.data.room_id}`),
            username: userProfileData.data.data.card.name,
            avatar_url: userProfileData.data.data.card.face,
            frame: userProfileData.data.data.card.pendant.image,
            fans: Count(userProfileData.data.data.card.fans),
            create_time: liveInfo.data.data.live_time === "-62170012800" ? "获取失败" : liveInfo.data.data.live_time,
            now_time: Common.getCurrentTime(),
            share_url: "https://live.bilibili.com/" + liveInfo.data.data.room_id,
            dynamicTYPE: "直播"
          }
        );
        this.e.reply(img2);
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
        const bmp4 = await downloadFile(
          this.Type === "one_video" ? playUrlData.data?.dash?.video[0].base_url : playUrlData.result.dash.video[0].base_url,
          {
            title: `Bil_V_${this.Type === "one_video" ? infoData && infoData.data.bvid : infoData && infoData.result.season_id}.mp4`,
            headers: this.headers
          }
        );
        const bmp3 = await downloadFile(
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
                const filePath = Common.tempDri.video + `${Config.app.removeCache ? "tmp_" + Date.now() : this.downloadfilename}.mp4`;
                fs.renameSync(resultPath, filePath);
                logger.mark(`视频文件重命名完成: ${resultPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
                logger.mark("正在尝试删除缓存文件");
                await Common.removeFile(bmp4.filepath, true);
                await Common.removeFile(bmp3.filepath, true);
                const stats = fs.statSync(filePath);
                const fileSizeInMB = Number((stats.size / (1024 * 1024)).toFixed(2));
                if (fileSizeInMB > Config.upload.groupfilevalue) {
                  return await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, "", { useGroupFile: true });
                } else {
                  return await uploadFile(this.e, { filepath: filePath, totalBytes: fileSizeInMB, originTitle: this.downloadfilename }, "");
                }
              } else {
                await Common.removeFile(bmp4.filepath, true);
                await Common.removeFile(bmp3.filepath, true);
                return true;
              }
            }
          });
        }
        break;
      }
      case false: {
        await downloadVideo(this.e, { video_url: playUrlData.data.durl[0].url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${this.downloadfilename}.mp4` } });
        break;
      }
    }
  }
  /**
   * 格式化视频统计信息为三行，每行两个数据项，并保持对齐
   */
  formatVideoStats(view, danmaku, like, coin, share, favorite) {
    const viewText = `📊 播放量: ${Count(view)}`;
    const danmakuText = `💬 弹幕: ${Count(danmaku)}`;
    const likeText = `👍 点赞: ${Count(like)}`;
    const coinText = `🪙 投币: ${Count(coin)}`;
    const shareText = `🔄 转发: ${Count(share)}`;
    const favoriteText = `⭐ 收藏: ${Count(favorite)}`;
    const firstColItems = [viewText, likeText, shareText];
    const maxFirstColLength = Math.max(...firstColItems.map((item) => this.getStringDisplayWidth(item)));
    const line1 = this.alignTwoColumns(viewText, danmakuText, maxFirstColLength);
    const line2 = this.alignTwoColumns(likeText, coinText, maxFirstColLength);
    const line3 = this.alignTwoColumns(shareText, favoriteText, maxFirstColLength);
    return `${line1}
${line2}
${line3}`;
  }
  /**
   * 对齐两列文本
   */
  alignTwoColumns(col1, col2, targetLength) {
    const col1Width = this.getStringDisplayWidth(col1);
    const spacesNeeded = targetLength - col1Width + 5;
    return col1 + " ".repeat(spacesNeeded) + col2;
  }
  /**
   * 获取字符串在显示时的实际宽度
   * 考虑到不同字符的显示宽度不同（如中文、emoji等）
   */
  getStringDisplayWidth(str) {
    let width = 0;
    for (let i = 0; i < str.length; i++) {
      const code = str.codePointAt(i);
      if (!code) continue;
      if (code > 65535) {
        width += 2;
        i++;
      } else if (
        // 处理中文字符和其他全角字符
        code >= 12288 && code <= 40959 || // 中文字符范围
        code >= 65280 && code <= 65519 || // 全角ASCII、全角标点
        code === 8230 || // 省略号
        code === 8212 || // 破折号
        code >= 11904 && code <= 12031 || // CJK部首补充
        code >= 12288 && code <= 12351 || // CJK符号和标点
        code >= 12736 && code <= 12783 || // CJK笔画
        code >= 12800 && code <= 13055 || // 封闭式CJK字母和月份
        code >= 13056 && code <= 13311 || // CJK兼容
        code >= 44032 && code <= 55215 || // 朝鲜文音节
        code >= 63744 && code <= 64255 || // CJK兼容表意文字
        code >= 65072 && code <= 65103
      ) {
        width += 2;
      } else if (code === 8205 || code >= 65024 && code <= 65039 || code >= 127995 && code <= 127999) {
        width += 0;
      } else {
        width += 1;
      }
    }
    return width;
  }
}
function checkvip$2(member) {
  return member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#e9e9e9" : "#313131"}; font-weight: 700;">${member.name}</span>`;
}
function br$4(data) {
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
        const emojiUrl = tag.emoji.gif_url || tag.emoji.icon_url;
        text = text.replace(regex2, `<img src='${emojiUrl}' style='height: 160px; margin: 0 0 -10px 0;'>`);
        break;
      }
      case "RICH_TEXT_NODE_TYPE_VOTE": {
        text = text.replace(regex, `<span style="color: ${Common.useDarkTheme() ? "#58B0D5" : "#006A9E"};"><svg style="width:60px;height: 60px;margin: 0 -15px -12px 0;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20" width="20" height="20"><path d="M1.6666666666666667 11.875916666666667C1.6666666666666667 10.725333333333333 2.5994083333333333 9.792583333333333 3.75 9.792583333333333L4.583333333333334 9.792583333333333C5.733925 9.792583333333333 6.666666666666667 10.725333333333333 6.666666666666667 11.875916666666667L6.666666666666667 14.792583333333335C6.666666666666667 15.943166666666666 5.733925 16.87591666666667 4.583333333333334 16.87591666666667L3.75 16.87591666666667C2.5994083333333333 16.87591666666667 1.6666666666666667 15.943166666666666 1.6666666666666667 14.792583333333335L1.6666666666666667 11.875916666666667zM3.75 11.042583333333333C3.2897666666666665 11.042583333333333 2.916666666666667 11.415666666666667 2.916666666666667 11.875916666666667L2.916666666666667 14.792583333333335C2.916666666666667 15.252833333333333 3.2897666666666665 15.625916666666669 3.75 15.625916666666669L4.583333333333334 15.625916666666669C5.043575000000001 15.625916666666669 5.416666666666667 15.252833333333333 5.416666666666667 14.792583333333335L5.416666666666667 11.875916666666667C5.416666666666667 11.415666666666667 5.043575000000001 11.042583333333333 4.583333333333334 11.042583333333333L3.75 11.042583333333333z" fill="currentColor"></path><path d="M7.5 4.792483333333334C7.5 3.6418916666666665 8.432758333333334 2.70915 9.583333333333334 2.70915L10.416666666666668 2.70915C11.56725 2.70915 12.5 3.6418916666666665 12.5 4.792483333333334L12.5 14.792500000000002C12.5 15.943083333333332 11.56725 16.875833333333336 10.416666666666668 16.875833333333336L9.583333333333334 16.875833333333336C8.432758333333334 16.875833333333336 7.5 15.943083333333332 7.5 14.792500000000002L7.5 4.792483333333334zM9.583333333333334 3.95915C9.123083333333334 3.95915 8.75 4.3322416666666665 8.75 4.792483333333334L8.75 14.792500000000002C8.75 15.252708333333333 9.123083333333334 15.625833333333334 9.583333333333334 15.625833333333334L10.416666666666668 15.625833333333334C10.876916666666668 15.625833333333334 11.25 15.252708333333333 11.25 14.792500000000002L11.25 4.792483333333334C11.25 4.3322416666666665 10.876916666666668 3.95915 10.416666666666668 3.95915L9.583333333333334 3.95915z" fill="currentColor"></path><path d="M13.333333333333334 9.1675C13.333333333333334 8.016891666666666 14.266083333333333 7.08415 15.416666666666668 7.08415L16.25 7.08415C17.400583333333334 7.08415 18.333333333333336 8.016891666666666 18.333333333333336 9.1675L18.333333333333336 14.792500000000002C18.333333333333336 15.943083333333332 17.400583333333334 16.875833333333336 16.25 16.875833333333336L15.416666666666668 16.875833333333336C14.266083333333333 16.875833333333336 13.333333333333334 15.943083333333332 13.333333333333334 14.792500000000002L13.333333333333334 9.1675zM15.416666666666668 8.334158333333333C14.956416666666668 8.334158333333333 14.583333333333334 8.70725 14.583333333333334 9.1675L14.583333333333334 14.792500000000002C14.583333333333334 15.252708333333333 14.956416666666668 15.625833333333334 15.416666666666668 15.625833333333334L16.25 15.625833333333334C16.71025 15.625833333333334 17.083333333333336 15.252708333333333 17.083333333333336 14.792500000000002L17.083333333333336 9.1675C17.083333333333336 8.70725 16.71025 8.334158333333333 16.25 8.334158333333333L15.416666666666668 8.334158333333333z" fill="currentColor"></path></svg> ${tag.text} </span>`);
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
  return decorate ? `<div style="display: flex; width: 500px; height: 150px; background-position: center; background-attachment: fixed; background-repeat: no-repeat; background-size: contain; align-items: center; justify-content: flex-end; background-image: url('${decorate.card_url}')">${generateGradientStyle(decorate.fan?.color_format?.colors, decorate.fan.num_str || decorate.fan.num_desc)}</div>` : "<div></div>";
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
const oid = (dynamicINFO, dynamicInfoCard) => {
  switch (dynamicINFO.data.item.type) {
    case "DYNAMIC_TYPE_WORD":
    case "DYNAMIC_TYPE_FORWARD": {
      return dynamicINFO.data.item.id_str;
    }
    default: {
      return dynamicInfoCard.data.card.desc.rid.toString();
    }
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
      if (lowerVideos.length > 0) {
        matchedVideo = lowerVideos[lowerVideos.length - 1];
      } else if (higherVideos.length > 0) {
        matchedVideo = higherVideos[0];
      } else {
        matchedVideo = sortedVideos[0];
      }
    }
    const matchedQuality = qnd[matchedVideo.id] || qualityOptions.accept_description[0];
    qualityOptions.accept_description = [matchedQuality];
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
    if (qualityOptions.accept_description.length === 0) {
      qualityOptions.accept_description = [closestQuality];
    }
    const video = videoList.find((video2) => video2.id === Number(closestId));
    videoList = [video];
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
  const totalSizeInMB = parseFloat(videoSizeInMB) + parseFloat(audioSizeInMB);
  return totalSizeInMB.toFixed(2);
};
function bilibiliComments(commentsData) {
  if (!commentsData) return [];
  let jsonArray = [];
  if (commentsData.code === 404) {
    return null;
  }
  for (let i = 0; i < commentsData.data.replies.length; i++) {
    const ctime = getRelativeTimeFromTimestamp$2(commentsData.data.replies[i].ctime);
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
    const location = commentsData.data.replies[i].reply_control?.location?.replace("IP属地：", "") ?? "";
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
  res = br$3(res);
  return res;
}
const emoteToUrl = (message, emote) => {
  for (const key in emote) {
    if (Object.prototype.hasOwnProperty.call(emote, key)) {
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
function br$3(data) {
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
  return member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.uname}</span>` : `<span style="color: #888">${member.uname}</span>`;
}
function getRelativeTimeFromTimestamp$2(timestamp) {
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
  loginInfo.data.data.vipStatus === 1 ? isvip = true : isvip = false;
  if (isvip) {
    return `&fnval=16&fourk=1&${genSign}`;
  } else return `&qn=${qn[3]}&fnval=16`;
}
async function checkCk() {
  if (Config.cookies.bilibili === "" || Config.cookies.bilibili === null) return { Status: "!isLogin", isVIP: false };
  const loginInfo = await getBilibiliData("登录基本信息", Config.cookies.bilibili);
  let isVIP;
  loginInfo.data.data.vipStatus === 1 ? isVIP = true : isVIP = false;
  if (isVIP) {
    return { Status: "isLogin", isVIP };
  } else return { Status: "isLogin", isVIP };
}
async function getBilibiliID(url) {
  const resp = await axios.get(url, {
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
    }
  });
  const longLink = resp.request.res.responseUrl;
  let result = {};
  let pValue;
  const parsedUrl = new URL(longLink);
  const pParam = parsedUrl.searchParams.get("p");
  if (pParam) {
    pValue = parseInt(pParam, 10);
    if (isNaN(pValue)) {
      pValue = void 0;
    }
  }
  switch (true) {
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
      if (id.startsWith("ss")) {
        result.realid = "season_id";
      } else if (id.startsWith("ep")) {
        result.realid = "ep_id";
      }
      result = {
        type: "bangumi_video_info",
        isEpid,
        realid: playMatch ? playMatch[1] : ""
      };
      break;
    }
    case (/^https:\/\/t\.bilibili\.com\/(\d+)/.test(longLink) || /^https:\/\/www\.bilibili\.com\/opus\/(\d+)/.test(longLink)): {
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
const bilibiliLogin = async (e) => {
  const qrcodeurl = await getBilibiliData("申请二维码", { typeMode: "strict" });
  const qrimg = await Render("bilibili/qrcodeImg", { share_url: qrcodeurl.data.data.url });
  const base64Data = qrimg[0]?.file;
  if (!base64Data) {
    throw new Error("生成二维码图片失败");
  }
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
      } catch {
      }
    }));
  };
  const handleLoginSuccess = async (responseData) => {
    const setCookieHeader = responseData.data.data.headers["set-cookie"];
    let cookieString;
    if (Array.isArray(setCookieHeader)) {
      cookieString = setCookieHeader.join("; ");
    } else {
      cookieString = setCookieHeader || "";
    }
    Config.Modify("cookies", "bilibili", cookieString);
    await e.reply("登录成功！用户登录凭证已保存至cookies.yaml", { reply: true });
    await recallMessages();
  };
  const handleQrScanned = async () => {
    const scannedMsg = await e.reply("二维码已扫码，未确认", { reply: true });
    messageIds.push(scannedMsg.messageId);
    try {
      await e.bot.recallMsg(e.contact, qrcodeMsg.messageId);
    } catch {
    }
    const index = messageIds.indexOf(qrcodeMsg.messageId);
    if (index > -1) {
      messageIds.splice(index, 1);
    }
  };
  const handleQrExpired = async () => {
    await e.reply("二维码已失效", { reply: true });
    await recallMessages();
  };
  let hasScanned = false;
  while (true) {
    try {
      const qrcodeStatusData = await getBilibiliData("二维码状态", { qrcode_key, typeMode: "strict" });
      const statusCode = qrcodeStatusData.data.data.data.code;
      switch (statusCode) {
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
        // 未扫描
        default:
          break;
      }
      await common.sleep(3e3);
    } catch (error) {
      console.error("轮询二维码状态时发生错误:", error);
      await e.reply("登录过程中发生错误，请重试", { reply: true });
      await recallMessages();
      return;
    }
  }
};
const bilibiliBaseHeaders = {
  ...baseHeaders,
  Referer: "https://api.bilibili.com/",
  Cookie: Config.cookies.bilibili
};
class Bilibilipush extends Base {
  force = false;
  constructor(e = {}, force = false) {
    super(e);
    if (this.e.bot?.adapter?.name === "QQBot") {
      e.reply("不支持QQBot，请使用其他适配器");
      return;
    }
    this.force = force;
  }
  /**
   * 执行主要的操作流程
   */
  async action() {
    await this.syncConfigToDatabase();
    const deletedCount = await cleanOldDynamicCache("bilibili", 1);
    if (deletedCount > 0) {
      logger.info(`已清理 ${deletedCount} 条过期的B站动态缓存记录`);
    }
    const data = await this.getDynamicList(Config.pushlist.bilibili);
    const pushdata = await this.excludeAlreadyPushed(data.willbepushlist);
    if (Object.keys(pushdata).length === 0) return true;
    if (this.force) {
      return await this.forcepush(pushdata);
    } else {
      return await this.getdata(pushdata);
    }
  }
  /**
   * 同步配置文件中的订阅信息到数据库
   */
  async syncConfigToDatabase() {
    if (!Config.pushlist.bilibili || Config.pushlist.bilibili.length === 0) {
      return;
    }
    await bilibiliDBInstance.syncConfigSubscriptions(Config.pushlist.bilibili);
  }
  /**
   * 异步获取数据并根据动态类型处理和发送动态信息。
   * @param data 包含动态相关信息的对象。
   */
  async getdata(data) {
    for (const dynamicId in data) {
      logger.mark(`
        ${logger.blue("开始处理并渲染B站动态图片")}
        ${logger.cyan("UP")}: ${logger.green(data[dynamicId].remark)}
        ${logger.cyan("动态id")}：${logger.yellow(dynamicId)}
        ${logger.cyan("访问地址")}：${logger.green("https://t.bilibili.com/" + dynamicId)}`);
      let skip = await skipDynamic$1(data[dynamicId]);
      let send_video = true;
      let img2 = [];
      const dynamicCARDINFO = await this.amagi.getBilibiliData("动态卡片数据", { dynamic_id: dynamicId, typeMode: "strict" });
      const dycrad = dynamicCARDINFO.data.data.card && dynamicCARDINFO.data.data.card.card && JSON.parse(dynamicCARDINFO.data.data.card.card);
      if (!skip) {
        const userINFO = await this.amagi.getBilibiliData("用户主页数据", { host_mid: data[dynamicId].host_mid, typeMode: "strict" });
        let emojiDATA = await this.amagi.getBilibiliData("Emoji数据");
        emojiDATA = extractEmojisData(emojiDATA.data.data.packages);
        switch (data[dynamicId].dynamic_type) {
          /** 处理图文动态 */
          case DynamicType.DRAW: {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null && data[dynamicId].Dynamic_Data.modules.module_dynamic && data[dynamicId].Dynamic_Data.modules.module_dynamic.topic !== null) {
              const name = data[dynamicId].Dynamic_Data.modules.module_dynamic.topic.name;
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus.summary.rich_text_nodes.unshift({
                orig_text: name,
                text: name,
                type: "topic",
                rid: data[dynamicId].Dynamic_Data.modules.module_dynamic.topic.id.toString()
              });
              data[dynamicId].Dynamic_Data.modules.module_dynamic.major.opus.summary.text = `${name}

` + data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text;
            }
            img2 = await Render(
              "bilibili/dynamic/DYNAMIC_TYPE_DRAW",
              {
                image_url: dycrad.item.pictures && cover(dycrad.item.pictures),
                // TIP: 2025/08/20, 动态卡片数据中，图文动态的描述文本在 major.opus.summary 中
                text: replacetext(
                  br$2(
                    data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.text ?? ""
                  ),
                  data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.opus?.summary?.rich_text_nodes ?? []
                ),
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
              }
            );
            break;
          }
          /** 处理纯文动态 */
          // case DynamicType.WORD: {
          //   let text = replacetext(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.text, data[dynamicId].Dynamic_Data.modules.module_dynamic.desc!.rich_text_nodes)
          //   for (const item of emojiDATA) {
          //     if (text.includes(item.text)) {
          //       if (text.includes('[') && text.includes(']')) {
          //         text = text.replace(/\[[^\]]*\]/g, `<img src="${item.url}"/>`).replace(/\\/g, '')
          //       }
          //       text += '&#160'
          //     }
          //   }
          //   img = await Render('bilibili/dynamic/DYNAMIC_TYPE_WORD',
          //     {
          //       text: br(text),
          //       dianzan: Count(data[dynamicId].Dynamic_Data.modules.module_stat.like.count),
          //       pinglun: Count(data[dynamicId].Dynamic_Data.modules.module_stat.comment.count),
          //       share: Count(data[dynamicId].Dynamic_Data.modules.module_stat.forward.count),
          //       create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
          //       avatar_url: data[dynamicId].Dynamic_Data.modules.module_author.face,
          //       frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
          //       share_url: 'https://t.bilibili.com/' + data[dynamicId].Dynamic_Data.id_str,
          //       username: checkvip(userINFO.data.data.card ?? userINFO.data.data.card),
          //       fans: Count(userINFO.data.data.follower),
          //       user_shortid: data[dynamicId].host_mid,
          //       total_favorited: Count(userINFO.data.data.like_num),
          //       following_count: Count(userINFO.data.data.card.attention),
          //       dynamicTYPE: '纯文动态推送'
          //     }
          //   )
          //   break
          // }
          /** 处理视频动态 */
          case DynamicType.AV: {
            if (data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.type === "MAJOR_TYPE_ARCHIVE") {
              const bvid = data[dynamicId].Dynamic_Data?.modules.module_dynamic.major?.archive?.bvid ?? "";
              const INFODATA = await getBilibiliData("单个视频作品数据", "", { bvid, typeMode: "strict" });
              if (INFODATA.data.data.redirect_url) {
                send_video = false;
                logger.debug(`UP主：${INFODATA.data.data.owner.name} 的该动态类型为${logger.yellow("番剧或影视")}，默认跳过不下载，直达：${logger.green(INFODATA.data.data.redirect_url)}`);
              }
              img2 = await Render(
                "bilibili/dynamic/DYNAMIC_TYPE_AV",
                {
                  image_url: INFODATA.data.data.pic,
                  text: br$2(INFODATA.data.data.title),
                  desc: br$2(dycrad.desc),
                  dianzan: Count(INFODATA.data.data.stat.like),
                  pinglun: Count(INFODATA.data.data.stat.reply),
                  share: Count(INFODATA.data.data.stat.share),
                  view: Count(dycrad.stat.view),
                  coin: Count(dycrad.stat.coin),
                  duration_text: data[dynamicId].Dynamic_Data.modules.module_dynamic.major?.archive?.duration_text ?? "0:00",
                  create_time: Common.convertTimestampToDateTime(INFODATA.data.data.ctime),
                  avatar_url: INFODATA.data.data.owner.face,
                  frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                  share_url: "https://www.bilibili.com/video/" + bvid,
                  username: checkvip(userINFO.data.data.card),
                  fans: Count(userINFO.data.data.follower),
                  user_shortid: data[dynamicId].host_mid,
                  total_favorited: Count(userINFO.data.data.like_num),
                  following_count: Count(userINFO.data.data.card.attention),
                  render_time: Common.getCurrentTime(),
                  dynamicTYPE: "视频动态推送"
                }
              );
            }
            break;
          }
          /** 处理直播动态 */
          case DynamicType.LIVE_RCMD: {
            img2 = await Render(
              "bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
              {
                image_url: dycrad.live_play_info.cover,
                text: br$2(dycrad.live_play_info.title),
                liveinf: br$2(`${dycrad.live_play_info.area_name} | 房间号: ${dycrad.live_play_info.room_id}`),
                username: checkvip(userINFO.data.data.card),
                avatar_url: userINFO.data.data.card.face,
                frame: data[dynamicId].Dynamic_Data.modules.module_author.pendant.image,
                fans: Count(userINFO.data.data.follower),
                create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.modules.module_author.pub_ts),
                now_time: Common.getCurrentTime(),
                share_url: "https://live.bilibili.com/" + dycrad.live_play_info.room_id,
                dynamicTYPE: "直播动态推送"
              }
            );
            break;
          }
          /** 处理转发动态 */
          case DynamicType.FORWARD: {
            const text = replacetext(br$2(data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.text), data[dynamicId].Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes);
            let param = {};
            switch (data[dynamicId].Dynamic_Data.orig.type) {
              case DynamicType.AV: {
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
              }
              case DynamicType.DRAW: {
                const dynamicCARD = await getBilibiliData("动态卡片数据", Config.cookies.bilibili, { dynamic_id: data[dynamicId].Dynamic_Data.orig.id_str, typeMode: "strict" });
                const cardData = JSON.parse(dynamicCARD.data.data.card.card);
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: replacetext(br$2(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  image_url: cardData.item.pictures && cover(cardData.item.pictures),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                };
                break;
              }
              case DynamicType.WORD: {
                param = {
                  username: checkvip(data[dynamicId].Dynamic_Data.orig.modules.module_author),
                  create_time: Common.convertTimestampToDateTime(data[dynamicId].Dynamic_Data.orig.modules.module_author.pub_ts),
                  avatar_url: data[dynamicId].Dynamic_Data.orig.modules.module_author.face,
                  text: replacetext(br$2(data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.text), data[dynamicId].Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes),
                  decoration_card: generateDecorationCard(data[dynamicId].Dynamic_Data.orig.modules.module_author.decoration_card),
                  frame: data[dynamicId].Dynamic_Data.orig.modules.module_author.pendant.image
                };
                break;
              }
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
              default: {
                logger.warn(`UP主：${data[dynamicId].remark}的${logger.green("转发动态")}转发的原动态类型为「${logger.yellow(data[dynamicId].Dynamic_Data.orig.type)}」暂未支持解析`);
                break;
              }
            }
            img2 = await Render("bilibili/dynamic/DYNAMIC_TYPE_FORWARD", {
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
        let status = null;
        if (!skip) {
          const { groupId, botId } = target;
          const bot = karin.getBot(botId);
          const Contact = karin.contactGroup(groupId);
          status = await karin.sendMsg(botId, Contact, img2 ? [...img2] : []);
          if (Config.bilibili.push.parsedynamic) {
            switch (data[dynamicId].dynamic_type) {
              case "DYNAMIC_TYPE_AV": {
                if (send_video) {
                  let correctList;
                  let videoSize = "";
                  const playUrlData = await this.amagi.getBilibiliData("单个视频下载信息数据", {
                    avid: dycrad.aid,
                    cid: dycrad.cid,
                    typeMode: "strict"
                  });
                  const simplify = playUrlData.data.data.dash.video.filter((item, index, self) => {
                    return self.findIndex((t) => {
                      return t.id === item.id;
                    }) === index;
                  });
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
                    await karin.sendMsg(
                      botId,
                      Contact,
                      [
                        segment.text(`设定的最大上传大小为 ${Config.upload.filelimit}MB
当前解析到的视频大小为 ${Number(videoSize)}MB
视频太大了，还是去B站看吧~`),
                        segment.reply(status.messageId)
                      ]
                    );
                    break;
                  }
                  logger.mark(`当前处于自动推送状态，解析到的视频大小为 ${logger.yellow(Number(videoSize))} MB`);
                  const infoData = await this.amagi.getBilibiliData("单个视频作品数据", { bvid: dynamicCARDINFO.data.data.card.desc.bvid, typeMode: "strict" });
                  const mp4File = await downloadFile(
                    playUrlData.data?.data?.dash?.video[0].base_url,
                    {
                      title: `Bil_V_${infoData.data.data.bvid}.mp4`,
                      headers: bilibiliBaseHeaders
                    }
                  );
                  const mp3File = await downloadFile(
                    playUrlData.data?.data?.dash?.audio[0].base_url,
                    {
                      title: `Bil_A_${infoData.data.data.bvid}.mp3`,
                      headers: bilibiliBaseHeaders
                    }
                  );
                  if (mp4File.filepath && mp3File.filepath) {
                    await mergeFile("二合一（视频 + 音频）", {
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
                          if (fileSizeInMB > Config.upload.groupfilevalue) {
                            return await uploadFile(
                              this.e,
                              { filepath: filePath, totalBytes: fileSizeInMB, originTitle: `${infoData.data.data.desc.substring(0, 50).replace(/[\\/:\\*\\?"<>\\|\r\n\s]/g, " ")}` },
                              "",
                              { useGroupFile: true, active: true, activeOption: { group_id: groupId, uin: botId } }
                            );
                          } else {
                            return await uploadFile(
                              this.e,
                              { filepath: filePath, totalBytes: fileSizeInMB },
                              "",
                              { active: true, activeOption: { group_id: groupId, uin: botId } }
                            );
                          }
                        } else {
                          await Common.removeFile(mp4File.filepath, true);
                          await Common.removeFile(mp3File.filepath, true);
                          return true;
                        }
                      }
                    });
                  }
                }
                break;
              }
              case "DYNAMIC_TYPE_DRAW": {
                const imgArray = [];
                for (const img22 of data[dynamicId].Dynamic_Data.modules.module_dynamic.major && data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.draw?.items || data[dynamicId].Dynamic_Data.modules.module_dynamic?.major?.opus.pics) {
                  imgArray.push(segment.image(img22.src ?? img22.url));
                }
                const forwardMsg = common.makeForward(imgArray, botId, bot.account.name);
                bot.sendForwardMsg(karin.contactFriend(botId), forwardMsg);
                break;
              }
            }
          }
        }
        if (skip || status && status?.messageId) {
          await bilibiliDBInstance.addDynamicCache(
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
      const filteredUserList = userList.filter((item) => item.switch !== false);
      for (const item of filteredUserList) {
        const dynamic_list = await this.amagi.getBilibiliData("用户主页动态列表数据", { host_mid: item.host_mid, typeMode: "strict" });
        if (dynamic_list.data.data.items.length > 0) {
          for (const dynamic of dynamic_list.data.data.items) {
            const now = Date.now();
            const createTime = dynamic.modules.module_author.pub_ts * 1e3;
            const timeDifference = now - createTime;
            const is_top = dynamic.modules.module_tag?.text === "置顶";
            let shouldPush = false;
            const timeDiffSeconds = Math.round(timeDifference / 1e3);
            const timeDiffHours = Math.round(timeDifference / 1e3 / 60 / 60 * 100) / 100;
            logger.debug(`
              前期获取该动态基本信息：
              UP主：${dynamic.modules.module_author.name}
              动态ID：${dynamic.id_str}
              发布时间：${Common.convertTimestampToDateTime(createTime / 1e3)}
              发布时间戳（ms）：${createTime}
              当前时间戳（ms）：${now}
              时间差（ms）：${timeDifference} ms (${timeDiffSeconds}s) (${timeDiffHours}h)
              是否置顶：${is_top}
              是否在一天内：${timeDifference < 864e5 ? logger.green("true") : logger.red("false")}
              `);
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
          logger.error(`「${item.remark}」的动态列表数量为零！`);
        }
      }
    } catch (error) {
      throw new Error(`获取动态列表失败: ${error}`);
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
        const isPushed = await bilibiliDBInstance.isDynamicPushed(dynamicId, pushItem.host_mid, target.groupId);
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
    const config2 = Config.pushlist;
    const groupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    const botId = this.e.selfId;
    if (!config2.bilibili) {
      config2.bilibili = [];
    }
    const existingItem = config2.bilibili.find((item) => item.host_mid === host_mid);
    const isSubscribed = await bilibiliDBInstance.isSubscribed(host_mid, groupId);
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
          await bilibiliDBInstance.unsubscribeBilibiliUser(groupId, host_mid);
        }
        logger.info(`
删除成功！${data.data.card.name}
UID：${host_mid}`);
        await this.e.reply(`群：${groupInfo.groupName}(${groupId})
删除成功！${data.data.card.name}
UID：${host_mid}`);
        if (existingItem.group_id.length === 0) {
          const index = config2.bilibili.indexOf(existingItem);
          config2.bilibili.splice(index, 1);
        }
      } else {
        await bilibiliDBInstance.subscribeBilibiliUser(
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
      await bilibiliDBInstance.subscribeBilibiliUser(
        groupId,
        botId,
        host_mid,
        data.data.card.name
      );
      config2.bilibili.push({
        switch: true,
        host_mid,
        group_id: [`${groupId}:${botId}`],
        remark: data.data.card.name
      });
      await this.e.reply(`群：${groupInfo.groupName}(${groupId})
添加成功！${data.data.card.name}
UID：${host_mid}`);
      if (Config.bilibili.push.switch === false) await this.e.reply("请发送「#kkk设置B站推送开启」以进行推送");
    }
    Config.Modify("pushlist", "bilibili", config2.bilibili);
    await this.renderPushList();
  }
  /**
   * 检查并更新配置文件中指定用户的备注信息。
   * 该函数会遍历配置文件中的用户列表，对于没有备注或备注为空的用户，会从外部数据源获取其备注信息，并更新到配置文件中。
   */
  async checkremark() {
    const config2 = Config.pushlist;
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
        const resp = await this.amagi.getBilibiliData("用户主页数据", { host_mid: i.host_mid, typeMode: "strict" });
        const remark = resp.data.data.card.name;
        const matchingItemIndex = config2.bilibili.findIndex((item) => item.host_mid === i.host_mid);
        if (matchingItemIndex !== -1) {
          config2.bilibili[matchingItemIndex].remark = remark;
        }
      }
      Config.Modify("pushlist", "bilibili", config2.bilibili);
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
      const subscriptions = await bilibiliDBInstance.getGroupSubscriptions(currentGroupId);
      const subscribedUids = subscriptions.map((sub) => sub.host_mid);
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
    const subscriptions = await bilibiliDBInstance.getGroupSubscriptions(groupInfo.groupId);
    if (subscriptions.length === 0) {
      await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})
没有设置任何B站UP推送！
可使用「#设置B站推送 + UP主UID」进行设置`);
      return;
    }
    const renderOpt = [];
    for (const subscription of subscriptions) {
      const host_mid = subscription.host_mid;
      const userInfo = await this.amagi.getBilibiliData("用户主页数据", { host_mid, typeMode: "strict" });
      renderOpt.push({
        avatar_img: userInfo.data.data.card.face,
        username: userInfo.data.data.card.name,
        host_mid: userInfo.data.data.card.mid,
        fans: Count(userInfo.data.data.follower),
        total_favorited: Count(userInfo.data.data.like_num),
        following_count: Count(userInfo.data.data.card.attention)
      });
    }
    const img2 = await Render("bilibili/userlist", { renderOpt });
    await this.e.reply(img2);
  }
}
function br$2(data) {
  return data = data.replace(/\n/g, "<br>");
}
function checkvip(member) {
  return member.vip.status === 1 ? `<span style="color: ${member.vip.nickname_color ?? "#FB7299"}; font-weight: 700;">${member.name}</span>` : `<span style="color: ${Common.useDarkTheme() ? "#EDEDED" : "#606060"}">${member.name}</span>`;
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
const skipDynamic$1 = async (PushItem) => {
  const tags = [];
  if (PushItem.Dynamic_Data.modules.module_dynamic?.desc?.rich_text_nodes) {
    for (const node of PushItem.Dynamic_Data.modules.module_dynamic.desc.rich_text_nodes) {
      if (node.type === "topic") {
        if (node.orig_text) {
          tags.push(node.orig_text);
        }
      }
    }
  }
  if (PushItem.Dynamic_Data.type === DynamicType.FORWARD && "orig" in PushItem.Dynamic_Data) {
    if (PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.DRAW || PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.OPUS || PushItem.Dynamic_Data.orig.modules.module_dynamic.major.type === MajorType.LIVE_RCMD) {
      for (const node of PushItem.Dynamic_Data.orig.modules.module_dynamic.major.opus.summary.rich_text_nodes) {
        if (node.type === "topic") {
          tags.push(node.orig_text);
        }
      }
    }
  }
  logger.debug(`检查动态是否需要过滤：https://t.bilibili.com/${PushItem.Dynamic_Data.id_str}`);
  const shouldFilter = await bilibiliDBInstance.shouldFilter(PushItem, tags);
  return shouldFilter;
};
const videoStreamRouter = (req, res) => {
  const filename = req.params.filename;
  const videoPath = Common.validateVideoRequest(filename, res);
  if (!videoPath) {
    return;
  }
  try {
    const stats = fs.statSync(videoPath);
    const fileSize = stats.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      if (start >= fileSize || end >= fileSize || start > end) {
        res.status(416).send("Requested range not satisfiable");
        return;
      }
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
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
        if (!res.writableEnded) {
          res.end();
        }
      });
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes"
        // 仍然告知客户端支持 Range 请求
      };
      res.writeHead(200, head);
      const file = fs.createReadStream(videoPath);
      file.pipe(res);
      file.on("error", (err) => {
        logger.error(`读取视频文件流时出错 (Full): ${err.message}`);
        if (!res.headersSent) {
          try {
            createNotFoundResponse(res, "读取视频文件时出错");
          } catch (e) {
            logger.error("发送读取错误响应失败:", e);
            if (!res.writableEnded) {
              res.end();
            }
          }
        } else if (!res.writableEnded) {
          res.end();
        }
      });
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      if (!res.headersSent) createNotFoundResponse(res, "视频文件未找到");
      else if (!res.writableEnded) res.end();
    } else {
      logger.error(`处理视频数据请求时发生错误: ${error.message}`);
      if (!res.headersSent) {
        createNotFoundResponse(res, "服务器内部错误");
      } else if (!res.writableEnded) {
        res.end();
      }
    }
  }
};
const getVideoRouter = (req, res) => {
  const filename = req.params.filename;
  const videoPath = Common.validateVideoRequest(filename, res);
  if (!videoPath) {
    return;
  }
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
    if (!link || typeof link !== "string") {
      return createBadRequestResponse(res, "请提供有效的链接");
    }
    const resp = await axios.get(link, {
      headers: {
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
      }
    });
    const finalUrl = resp.request.res.responseUrl;
    if (finalUrl.includes("获取链接重定向失败") || finalUrl.includes("403 Forbidden")) {
      return createServerErrorResponse(res, "无法获取链接的重定向地址：" + finalUrl);
    }
    let platform = "unknown";
    if (finalUrl.includes("douyin.com") || finalUrl.includes("iesdouyin.com") || finalUrl.includes("webcast.amemv.com") || finalUrl.includes("live.douyin.com")) {
      platform = "douyin";
    } else if (finalUrl.includes("bilibili.com") || finalUrl.includes("b23.tv")) {
      platform = "bilibili";
    } else if (finalUrl.includes("kuaishou.com") || finalUrl.includes("kwai.com") || finalUrl.includes("chenzhongtech.com")) {
      platform = "kuaishou";
    }
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
  const amagi = Client({
    cookies: {
      douyin: Config.cookies.douyin
    }
  });
  try {
    const { dataType, params } = req.body;
    if (!dataType || !params) {
      return createBadRequestResponse(res, "请提供数据类型和参数");
    }
    const rawData = await amagi.getDouyinData(dataType, {
      ...params,
      typeMode: "strict"
    });
    createSuccessResponse(res, {
      data: rawData.data,
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
  const amagi = Client({
    cookies: {
      bilibili: Config.cookies.bilibili
    }
  });
  try {
    const { dataType, params } = req.body;
    if (!dataType || !params) {
      return createBadRequestResponse(res, "请提供数据类型和参数");
    }
    const rawData = await amagi.getBilibiliData(dataType, {
      ...params,
      typeMode: "strict"
    });
    createSuccessResponse(res, {
      data: rawData.data,
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
  const amagi = Client({
    cookies: {
      kuaishou: Config.cookies.kuaishou
    }
  });
  try {
    const { dataType, params } = req.body;
    if (!dataType || !params) {
      return createBadRequestResponse(res, "请提供数据类型和参数");
    }
    const rawData = await amagi.getKuaishouData(dataType, {
      ...params,
      typeMode: "strict"
    });
    createSuccessResponse(res, {
      data: rawData.data,
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
const base64Decode = (str) => {
  return Buffer.from(str, "base64").toString("utf8");
};
const urlDecode = (str) => {
  return decodeURIComponent(str);
};
const hexDecode = (str) => {
  return Buffer.from(str, "hex").toString("utf8");
};
const reverseString = (str) => {
  return str.split("").reverse().join("");
};
const charOffsetDecode = (str, offset = 5) => {
  return str.split("").map((char) => {
    const code = char.charCodeAt(0);
    return String.fromCharCode(code - offset);
  }).join("");
};
const multiLayerDecode = (str) => {
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
    if (!encodedSignature || !timestamp || !nonce) {
      return createBadRequestResponse(res, "缺少必要的签名参数");
    }
    const currentTime = Date.now();
    const requestTime = parseInt(timestamp);
    const timeDiff = Math.abs(currentTime - requestTime);
    if (timeDiff > 5 * 60 * 1e3) {
      return createBadRequestResponse(res, "请求时间戳已过期");
    }
    let decodedSignature;
    try {
      decodedSignature = multiLayerDecode(encodedSignature);
    } catch (error) {
      return createBadRequestResponse(res, "签名格式错误：" + error);
    }
    const method = req.method.toUpperCase();
    const url = req.headers["x-original-url"] || req.originalUrl;
    const body = req.method === "GET" ? "" : JSON.stringify(req.body || {});
    const signatureString = `${method}|${url}|${body}|${timestamp}|${nonce}`;
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
const getGroupsRouter = async (req, res) => {
  try {
    const douyinDB = await getDouyinDB();
    const bilibiliDB = await getBilibiliDB();
    const [douyinGroups, bilibiliGroups] = await Promise.all([
      douyinDB.groupRepository.find(),
      bilibiliDB.groupRepository.find()
    ]);
    const allGroupsMap = /* @__PURE__ */ new Map();
    douyinGroups.forEach((group) => {
      allGroupsMap.set(group.id, { id: group.id, botId: group.botId });
    });
    bilibiliGroups.forEach((group) => {
      if (!allGroupsMap.has(group.id)) {
        allGroupsMap.set(group.id, { id: group.id, botId: group.botId });
      }
    });
    const groupList = [];
    for (const group of allGroupsMap.values()) {
      const douyinSubscriptions = await douyinDB.getGroupSubscriptions(group.id);
      const bilibiliSubscriptions = await bilibiliDB.getGroupSubscriptions(group.id);
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
    if (!groupId) {
      return createBadRequestResponse(res, "请提供群组ID");
    }
    const douyinDB = await getDouyinDB();
    const bilibiliDB = await getBilibiliDB();
    const [douyinSubscriptions, bilibiliSubscriptions] = await Promise.all([
      douyinDB.getGroupSubscriptions(groupId),
      bilibiliDB.getGroupSubscriptions(groupId)
    ]);
    const fetchDouyinAuthors = async (subscriptions) => {
      const validSubscriptions = subscriptions.filter((sub) => sub.douyinUser);
      if (validSubscriptions.length === 0) {
        return [];
      }
      const batchSize = 5;
      const results = [];
      for (let i = 0; i < validSubscriptions.length; i += batchSize) {
        const batch = validSubscriptions.slice(i, i + batchSize);
        const batchPromises = batch.map(async (subscription) => {
          try {
            const userProfile = await getDouyinData(
              "用户主页数据",
              { sec_uid: subscription.douyinUser.sec_uid, typeMode: "strict" },
              Config.cookies.douyin
            );
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
      if (validSubscriptions.length === 0) {
        return [];
      }
      const batchSize = 5;
      const results = [];
      for (let i = 0; i < validSubscriptions.length; i += batchSize) {
        const batch = validSubscriptions.slice(i, i + batchSize);
        const batchPromises = batch.map(async (subscription) => {
          try {
            const userProfile = await getBilibiliData(
              "用户主页数据",
              { host_mid: subscription.bilibiliUser.host_mid, typeMode: "strict" },
              Config.cookies.bilibili
            );
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
    const [douyinAuthors, bilibiliAuthors] = await Promise.all([
      fetchDouyinAuthors(douyinSubscriptions),
      fetchBilibiliAuthors(bilibiliSubscriptions)
    ]);
    const authorOptions = [...douyinAuthors, ...bilibiliAuthors];
    return createSuccessResponse(res, authorOptions);
  } catch (error) {
    logger.error("获取作者列表失败:", error);
    return createServerErrorResponse(res, "获取作者列表失败");
  }
};
const getDouyinContentRouter = async (req, res) => {
  try {
    const { groupId } = req.query;
    if (!groupId) {
      return createBadRequestResponse(res, "请提供群组ID");
    }
    const douyinDB = await getDouyinDB();
    const caches = await douyinDB.awemeCacheRepository.find({
      where: { groupId },
      relations: ["douyinUser"],
      order: { createdAt: "DESC" },
      take: 100
    });
    const contentList = await Promise.all(caches.map(async (cache) => {
      let authorName = cache.sec_uid;
      if (cache.douyinUser) {
        authorName = cache.douyinUser.remark || cache.douyinUser.short_id || cache.douyinUser.sec_uid;
      }
      const userProfile = await getDouyinData("用户主页数据", { sec_uid: cache.douyinUser.sec_uid, typeMode: "strict" }, Config.cookies.douyin);
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
    }));
    return createSuccessResponse(res, contentList);
  } catch (error) {
    logger.error("获取抖音内容列表失败:", error);
    return createServerErrorResponse(res, "获取抖音内容列表失败: " + error);
  }
};
const getBilibiliContentRouter = async (req, res) => {
  try {
    const { groupId } = req.query;
    if (!groupId) {
      return createBadRequestResponse(res, "请提供群组ID");
    }
    const bilibiliDB = await getBilibiliDB();
    const caches = await bilibiliDB.dynamicCacheRepository.find({
      where: { groupId },
      relations: ["bilibiliUser"],
      order: { createdAt: "DESC" },
      take: 100
    });
    const contentList = await Promise.all(caches.map(async (cache) => {
      let authorName = cache.host_mid.toString();
      if (cache.bilibiliUser) {
        authorName = cache.bilibiliUser.remark || cache.host_mid.toString();
      }
      const userProfile = await getBilibiliData("用户主页数据", { host_mid: cache.host_mid, typeMode: "strict" }, Config.cookies.bilibili);
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
    }));
    return createSuccessResponse(res, contentList);
  } catch (error) {
    logger.error("获取B站内容列表失败:", error);
    return createServerErrorResponse(res, "获取B站内容列表失败: " + error);
  }
};
const addDouyinContentRouter = async (req, res) => {
  try {
    const { contentId, groupId, authorId } = req.body;
    if (!contentId || !groupId || !authorId) {
      return createBadRequestResponse(res, "请提供内容ID、群组ID和作者ID");
    }
    const douyinDB = await getDouyinDB();
    await douyinDB.addAwemeCache(contentId, authorId, groupId);
    return createSuccessResponse(res, { message: "添加成功" });
  } catch (error) {
    logger.error("添加抖音内容失败:", error);
    return createServerErrorResponse(res, "添加抖音内容失败");
  }
};
const addBilibiliContentRouter = async (req, res) => {
  try {
    const { contentId, groupId, authorId } = req.body;
    if (!contentId || !groupId || !authorId) {
      return createBadRequestResponse(res, "请提供内容ID、群组ID和作者ID");
    }
    const bilibiliDB = await getBilibiliDB();
    const host_mid = parseInt(authorId);
    await bilibiliDB.addDynamicCache(contentId, host_mid, groupId, "manual");
    return createSuccessResponse(res, { message: "添加成功" });
  } catch (error) {
    logger.error("添加B站内容失败:", error);
    return createServerErrorResponse(res, "添加B站内容失败");
  }
};
const deleteContentRouter = async (req, res) => {
  try {
    const { id, platform, groupId } = req.body;
    if (!id || !platform || !groupId) {
      return createBadRequestResponse(res, "请提供内容ID、平台类型和群组ID");
    }
    if (platform === "douyin") {
      const douyinDB = await getDouyinDB();
      await douyinDB.awemeCacheRepository.delete({ aweme_id: id, groupId });
    } else if (platform === "bilibili") {
      const bilibiliDB = await getBilibiliDB();
      await bilibiliDB.dynamicCacheRepository.delete({ dynamic_id: id, groupId });
    }
    return createSuccessResponse(res, { message: "删除成功" });
  } catch (error) {
    logger.error("删除内容失败:", error);
    return createServerErrorResponse(res, "删除内容失败");
  }
};
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
    author: [
      {
        name: "ikenxuan",
        home: "https://github.com/ikenxuan",
        avatar: "https://github.com/ikenxuan.png"
      },
      {
        name: "sj817",
        home: "https://github.com/sj817",
        avatar: "https://github.com/sj817.png"
      }
    ]
  },
  components: async () => {
    const all = await Config.All();
    return [
      components.accordion.create("cookies", {
        label: "Cookies 相关",
        children: [
          components.accordion.createItem("cfg:cookies", {
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
              })
            ]
          })
        ]
      }),
      components.accordion.create("app", {
        label: "插件应用相关",
        children: [
          components.accordion.createItem("cfg:app", {
            title: "插件应用相关",
            className: "ml-4 mr-4",
            subtitle: "此处用于管理插件的基本设置",
            children: [
              components.switch.create("removeCache", {
                label: "缓存删除",
                description: "缓存自动删除，非必要不修改！",
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
                rules: [
                  {
                    min: 50,
                    max: 200
                  }
                ]
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
                rules: [
                  {
                    min: 1024,
                    max: 65535,
                    error: "请输入一个范围在 1024 到 65535 之间的数字"
                  }
                ]
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
                rules: [
                  os.platform() === "linux" ? { min: 1, error: "Linux系统下渲染等待时间不能为0" } : { min: 0 }
                ]
              }),
              components.switch.create("EmojiReply", {
                label: "表情回应",
                description: "在解析任务开始时添加表情回应",
                defaultSelected: all.app.EmojiReply
              }),
              components.input.number("EmojiReplyID", {
                label: "表情 ID",
                isDisabled: !all.app.EmojiReply,
                description: "详情查看：https://github.com/NapNeko/NapCatQQ/blob/main/src/core/external/face_config.json 的 QCid 字段",
                defaultValue: all.app.EmojiReplyID.toString(),
                rules: [
                  { min: 0, max: 1145141919810 }
                ]
              }),
              components.switch.create("webAuth", {
                label: "web解鉴权",
                description: "开启后，需要拥有 Karin 的 HTTP 鉴权密钥才能访问。修改后重启生效",
                defaultSelected: all.app.webAuth
              }),
              components.checkbox.group("errorLogSendTo", {
                label: "错误日志",
                description: "解析遇到错误时谁会收到错误日志",
                orientation: "horizontal",
                defaultValue: all.app.errorLogSendTo,
                checkbox: [
                  components.checkbox.create("errorLogSendTo:checkbox:1", {
                    label: "除'console'外的第一个主人",
                    value: "master"
                  }),
                  components.checkbox.create("errorLogSendTo:checkbox:2", {
                    label: "触发者",
                    value: "trigger"
                  })
                ]
              })
            ]
          })
        ]
      }),
      components.accordion.create("douyin", {
        label: "抖音相关",
        children: [
          components.accordion.createItem("cfg:douyin", {
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
                    value: "info"
                  }),
                  components.checkbox.create("sendContent:checkbox:2", {
                    label: "评论图片",
                    value: "comment"
                  }),
                  components.checkbox.create("sendContent:checkbox:3", {
                    label: "视频文件",
                    value: "video"
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
              components.switch.create("autoResolution", {
                label: "自动分辨率",
                description: "根据「视频拦截阈值」自动选择合适的分辨率，关闭后默认选择最大分辨率进行下载",
                defaultSelected: all.douyin.autoResolution,
                isDisabled: !all.douyin.switch
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
                radio: [
                  components.radio.create("push:shareType.radio-1", {
                    label: "网页链接",
                    description: "识别后访问抖音官网对应的作品地址",
                    value: "web"
                  }),
                  components.radio.create("push:shareType.radio-2", {
                    description: "识别后访问无水印作品下载地址",
                    label: "下载链接",
                    value: "download"
                  })
                ]
              })
            ]
          })
        ]
      }),
      components.accordion.create("bilibili", {
        label: "B站相关",
        children: [
          components.accordion.createItem("cfg:bilibili", {
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
                    value: "info"
                  }),
                  components.checkbox.create("sendContent:checkbox:2", {
                    label: "评论图片",
                    value: "comment"
                  }),
                  components.checkbox.create("sendContent:checkbox:3", {
                    label: "视频文件",
                    value: "video"
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
              components.switch.create("videopriority", {
                label: "优先保内容",
                description: "解析视频是否优先保内容，true为优先保证上传将使用最低分辨率，false则使用自定义画质偏好",
                defaultSelected: all.bilibili.videopriority,
                isDisabled: !all.bilibili.switch
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
                description: '根据该值自动选择分辨率进行下载。仅在「画质偏好」 为 "自动选择" 时生效',
                defaultValue: all.bilibili.maxAutoVideoSize.toString(),
                isDisabled: all.bilibili.videoQuality !== 0 || !all.bilibili.switch,
                rules: [{ min: 1, max: 2e4 }]
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
                  }),
                  components.radio.create("imageLayout:radio-4", {
                    label: "自动布局",
                    value: "auto"
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
                description: '根据该值自动选择分辨率进行下载。仅在「解析视频动态时的画质偏好」 为 "自动选择" 且「作品解析」开启时生效，仅对视频动态有效',
                defaultValue: all.bilibili.push.pushMaxAutoVideoSize.toString(),
                isDisabled: !all.bilibili.push.parsedynamic || all.bilibili.push.pushVideoQuality !== 0 || !all.bilibili.push.switch,
                rules: [{ min: 1, max: 2e4 }],
                color: "warning"
              })
            ]
          })
        ]
      }),
      components.accordion.create("kuaishou", {
        label: "快手相关",
        children: [
          components.accordion.createItem("cfg:kuaishou", {
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
          })
        ]
      }),
      components.accordion.create("upload", {
        label: "视频文件上传相关",
        children: [
          components.accordion.createItem("cfg:upload", {
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
          })
        ]
      }),
      components.accordion.create("request", {
        label: "解析库请求配置相关",
        children: [
          components.accordion.createItem("cfg:request", {
            title: "解析库请求配置相关",
            className: "ml-4 mr-4",
            subtitle: "此处用于管理解析库的网络请求配置",
            children: [
              components.input.number("timeout", {
                label: "请求超时时间",
                description: "网络请求的超时时间，单位：毫秒",
                defaultValue: all.request.timeout.toString(),
                rules: [
                  {
                    min: 1e3,
                    max: 3e5,
                    error: "请输入一个范围在 1000 到 300000 之间的数字"
                  }
                ]
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
                rules: [
                  {
                    min: 1,
                    max: 65535,
                    error: "请输入一个范围在 1 到 65535 之间的数字"
                  }
                ],
                isDisabled: !all.request.proxy?.switch
              }),
              components.radio.group("proxy:protocol", {
                label: "代理协议",
                orientation: "horizontal",
                defaultValue: all.request.proxy?.protocol || "http",
                radio: [
                  components.radio.create("proxy-protocol-1", {
                    label: "HTTP",
                    value: "http"
                  }),
                  components.radio.create("proxy-protocol-2", {
                    label: "HTTPS",
                    value: "https"
                  })
                ],
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
          })
        ]
      }),
      components.divider.create("divider-7", {
        description: "抖音推送列表相关",
        descPosition: 20
      }),
      components.accordionPro.create(
        "pushlist:douyin",
        all.pushlist.douyin.map((item) => {
          return {
            ...item,
            title: item.remark,
            subtitle: item.short_id
          };
        }),
        {
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
                  rules: [
                    {
                      regex: /.+:.+/,
                      error: "请使用 `群号:机器人账号` 的格式"
                    }
                  ]
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
                radio: [
                  components.radio.create("push:bilibili:filterMode.radio-1", {
                    label: "黑名单模式",
                    description: "命中以下内容时，不推送",
                    value: "blacklist"
                  }),
                  components.radio.create("push:bilibili:filterMode.radio-2", {
                    label: "白名单模式",
                    description: "命中以下内容时，才推送",
                    value: "whitelist"
                  })
                ]
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
        }
      ),
      components.divider.create("divider-8", {
        description: "B站推送列表相关",
        descPosition: 20
      }),
      components.accordionPro.create(
        "pushlist:bilibili",
        all.pushlist.bilibili.map((item) => {
          return {
            ...item,
            title: item.remark,
            subtitle: item.host_mid
          };
        }),
        {
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
                  rules: [
                    {
                      regex: /.+:.+/,
                      error: "请使用 `群号:机器人账号` 的格式"
                    }
                  ]
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
                radio: [
                  components.radio.create("push:bilibili:filterMode.radio-1", {
                    label: "黑名单模式",
                    description: "命中以下内容时，不推送",
                    value: "blacklist"
                  }),
                  components.radio.create("push:bilibili:filterMode.radio-2", {
                    label: "白名单模式",
                    description: "命中以下内容时，才推送",
                    value: "whitelist"
                  })
                ]
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
        }
      )
    ];
  },
  /** 前端点击保存之后调用的方法 */
  save: async (config2) => {
    const formatCfg = processFrontendData(config2);
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
          const modifySuccess = await Config.ModifyPro(key, configValue);
          if (modifySuccess) {
            success = true;
          }
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
const customizer = (value, srcValue) => {
  if (Array.isArray(srcValue)) {
    return srcValue;
  }
};
const deepEqual = (a, b) => {
  if (a === b) {
    return false;
  }
  if (typeof a === "string" && typeof b === "string") {
    if (a !== b) return true;
  }
  if (typeof a === "number" && typeof b === "number") {
    if (a !== b) return true;
  }
  if (typeof a === "boolean" && typeof b === "boolean") {
    if (a !== b) return true;
  }
  if (a === null || b === null || typeof a !== typeof b) {
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return true;
    }
    for (let i = 0; i < a.length; i++) {
      if (deepEqual(a[i], b[i])) {
        return true;
      }
    }
  }
  let isChange = false;
  if (typeof a === "object" && typeof b === "object") {
    if (isChange) return true;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return true;
    }
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
const convertToNumber = (value) => {
  if (/^\d+$/.test(value)) {
    const num = parseInt(value, 10);
    return num;
  } else return value;
};
const getFirstObject = (arr) => {
  return arr.length > 0 ? arr[0] : {};
};
const setNestedProperty = (obj, keys, value) => {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key] || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;
};
const processFrontendData = (data) => {
  const result = {};
  const configKeys = Object.keys(data).filter((key) => {
    return !key.includes("pushlist") && key in data;
  });
  for (const key of configKeys) {
    const value = data[key];
    const firstObj = Array.isArray(value) ? getFirstObject(value) : {};
    const objKeys = Object.keys(firstObj);
    if (objKeys.length === 0) {
      continue;
    }
    const configObj = {};
    let hasValidData = false;
    const nestedProps = objKeys.filter((prop) => prop.includes(":"));
    const flatProps = objKeys.filter((prop) => !prop.includes(":"));
    for (const prop of nestedProps) {
      let propValue = firstObj[prop];
      if (typeof propValue === "string") {
        propValue = convertToNumber(propValue);
      }
      if (propValue !== void 0 && propValue !== null) {
        const keys = prop.split(":");
        setNestedProperty(configObj, keys, propValue);
        hasValidData = true;
      }
    }
    for (const prop of flatProps) {
      let propValue = firstObj[prop];
      if (typeof propValue === "string") {
        propValue = convertToNumber(propValue);
      }
      if (propValue !== void 0 && propValue !== null) {
        configObj[prop] = propValue;
        hasValidData = true;
      }
    }
    if (hasValidData && Object.keys(configObj).length > 0) {
      result[key] = configObj;
    }
  }
  result.pushlist = {
    douyin: data["pushlist:douyin"] || [],
    bilibili: (data["pushlist:bilibili"] || []).map((item) => {
      return {
        ...item,
        host_mid: Number(item.host_mid)
      };
    })
  };
  return result;
};
const cleanFlattenedFields = (obj) => {
  if (!obj || typeof obj !== "object") return;
  for (const [, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      cleanFlattenedFields(value);
      const valueObj = value;
      const flattenedKeys = Object.keys(valueObj).filter((k) => k.includes("."));
      for (const flatKey of flattenedKeys) {
        const parts = flatKey.split(".");
        if (hasNestedStructure(valueObj, parts)) {
          delete valueObj[flatKey];
        }
      }
    }
  }
};
const hasNestedStructure = (obj, path2) => {
  let current = obj;
  for (let i = 0; i < path2.length - 1; i++) {
    const key = path2[i];
    if (!current[key] || typeof current[key] !== "object") {
      return false;
    }
    current = current[key];
  }
  const lastKey = path2[path2.length - 1];
  return lastKey in current;
};
const processCommentEmojis = (text, emojiData) => {
  if (!text || !emojiData || !Array.isArray(emojiData)) {
    return text;
  }
  let processedText = text;
  for (const emoji of emojiData) {
    if (emoji.name && emoji.url && processedText.includes(emoji.name)) {
      const escapedName = emoji.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedName, "g");
      processedText = processedText.replace(regex, `<img src="${emoji.url}" alt="${emoji.name}" />`);
    }
  }
  const parts = processedText.split(/(<img[^>]*>)/);
  const wrappedParts = parts.map((part) => {
    if (part.startsWith("<img")) {
      return part;
    }
    if (part.trim()) {
      return `<span>${part}</span>`;
    }
    return part;
  });
  return wrappedParts.join("");
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
    const text = comment.text;
    const ip = comment.ip_label ?? "未知";
    const time = comment.create_time;
    const label_type = comment.label_type ?? -1;
    const sticker = comment.sticker ? comment.sticker.animate_url.url_list[0] : null;
    const digg_count = comment.digg_count;
    const imageurl = comment.image_list && comment.image_list?.[0] && comment.image_list?.[0].origin_url && comment.image_list?.[0].origin_url.url_list ? comment.image_list?.[0].origin_url.url_list[0] : null;
    const status_label = comment.label_list?.[0]?.text ?? null;
    const userintextlongid = comment.text_extra && comment.text_extra[0] && comment.text_extra[0].sec_uid ? comment.text_extra[0].sec_uid && comment.text_extra.map((extra) => extra.sec_uid) : null;
    const search_text = comment.text_extra && comment.text_extra[0] && comment.text_extra[0].search_text ? comment.text_extra[0].search_text && comment.text_extra.map((extra) => ({
      search_text: extra.search_text,
      search_query_id: extra.search_query_id
    })) : null;
    const relativeTime = getRelativeTimeFromTimestamp$1(time);
    const reply_comment_total = comment.reply_comment_total;
    const commentObj = {
      id: id++,
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
      search_text,
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
  jsonArray = br$1(jsonArray);
  jsonArray = await handling_at$1(jsonArray);
  jsonArray = await heic2jpg(jsonArray);
  const CommentData = {
    jsonArray
  };
  for (const i of jsonArray) {
    if (i.digg_count > 1e4) {
      i.digg_count = (i.digg_count / 1e4).toFixed(1) + "w";
    }
  }
  for (const item of CommentData.jsonArray) {
    item.text = processCommentEmojis(item.text, emojidata);
  }
  return CommentData;
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
async function handling_at$1(data) {
  for (const item of data) {
    if (item.is_At_user_id !== null && Array.isArray(item.is_At_user_id)) {
      for (const secUid of item.is_At_user_id) {
        const UserInfoData = await getDouyinData("用户主页数据", Config.cookies.douyin, { sec_uid: secUid, typeMode: "strict" });
        if (UserInfoData.data.user.sec_uid === secUid) {
          const regex = new RegExp(`@${UserInfoData.data.user.nickname?.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}`, "g");
          item.text = item.text.replace(regex, (match) => {
            return `<span class="${Common.useDarkTheme() ? "dark-mode handling_at" : "handling_at"}">${match}</span>`;
          });
        }
      }
    }
  }
  return data;
}
function br$1(data) {
  for (const i of data) {
    let text = i.text;
    text = text.replace(/\n/g, "<br>");
    text = text.replace(/ {2,}/g, (match) => {
      return "&nbsp;".repeat(match.length);
    });
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
        this.is_slides = VideoData.data.aweme_detail.is_slides === true;
        let g_video_url = "";
        let g_title;
        let imagenum = 0;
        if (this.is_mp4 === false) {
          switch (true) {
            // 图集
            case (this.is_slides === false && VideoData.data.aweme_detail.images !== null): {
              const image_data = [];
              const imageres = [];
              let image_url = "";
              const images = VideoData.data.aweme_detail.images ?? [];
              for (const [index, imageItem] of images.entries()) {
                image_url = imageItem.url_list[2] || imageItem.url_list[1];
                const title = VideoData.data.aweme_detail.preview_title.substring(0, 50).replace(/[\\/:*?"<>|\r\n]/g, " ");
                g_title = title;
                imageres.push(segment.image(image_url));
                imagenum++;
                if (Config.app.removeCache === false) {
                  mkdirSync(`${Common.tempDri.images}${g_title}`);
                  const path2 = `${Common.tempDri.images}${g_title}/${index + 1}.png`;
                  await new Networks({ url: image_url, type: "arraybuffer" }).getData().then((data2) => fs.promises.writeFile(path2, Buffer.from(data2)));
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
            case (VideoData.data.aweme_detail.is_slides === true && VideoData.data.aweme_detail.images !== null): {
              const images = [];
              const temp = [];
              const liveimgbgm = await downloadFile(
                VideoData.data.aweme_detail.music.play_url.uri,
                {
                  title: `Douyin_tmp_A_${Date.now()}.mp3`,
                  headers: this.headers
                }
              );
              temp.push(liveimgbgm);
              const images1 = VideoData.data.aweme_detail.images ?? [];
              if (!images1.length) {
                logger.debug("未获取到合辑的图片数据");
              }
              for (const item of images1) {
                imagenum++;
                if (item.clip_type === 2) {
                  images.push(segment.image(item.url_list[0]));
                  continue;
                }
                const liveimg = await downloadFile(
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
                        logger.mark(`视频文件重命名完成: ${resultPath.split("/").pop()} -> ${filePath.split("/").pop()}`);
                        logger.mark("正在尝试删除缓存文件");
                        await Common.removeFile(liveimg.filepath, true);
                        temp.push({ filepath: filePath, totalBytes: 0 });
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
                for (const item of temp) {
                  await Common.removeFile(item.filepath, true);
                }
              }
              break;
            }
          }
        }
        if (VideoData.data.aweme_detail.music) {
          const music = VideoData.data.aweme_detail.music;
          const music_url = music.play_url.uri;
          if (this.is_mp4 === false && Config.app.removeCache === false && music_url !== void 0) {
            try {
              const path2 = Common.tempDri.images + `${g_title}/BGM.mp3`;
              await new Networks({ url: music_url, type: "arraybuffer" }).getData().then((data2) => fs.promises.writeFile(path2, Buffer.from(data2)));
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
          const video = VideoData.data.aweme_detail.video;
          FPS = video.bit_rate[0].FPS;
          if (Config.douyin.autoResolution) {
            logger.debug(`开始排除不符合条件的视频分辨率；

              共拥有${logger.yellow(video.bit_rate.length)}个视频源

              视频ID：${logger.green(VideoData.data.aweme_detail.aweme_id)}

              分享链接：${logger.green(VideoData.data.aweme_detail.share_url)}
              `);
            video.bit_rate = douyinProcessVideos(video.bit_rate, Config.upload.filelimit);
            g_video_url = await new Networks({
              url: video.bit_rate[0].play_addr.url_list[2],
              headers: {
                ...this.headers,
                Referer: video.bit_rate[0].play_addr.url_list[0]
              }
            }).getLongLink();
          } else {
            g_video_url = await new Networks({
              url: video.play_addr_h264.url_list[0] ?? video.play_addr_h264.url_list[0],
              headers: {
                ...this.headers,
                Referer: video.play_addr_h264.url_list[0] ?? video.play_addr_h264.url_list[0]
              }
            }).getLongLink();
          }
          const cover2 = video.origin_cover.url_list[0];
          const title = VideoData.data.aweme_detail.preview_title.substring(0, 80).replace(/[\\/:*?"<>|\r\n]/g, " ");
          g_title = title;
          mp4size = (video.bit_rate[0].play_addr.data_size / (1024 * 1024)).toFixed(2);
          videores.push(segment.text(`标题：
${title}`));
          videores.push(segment.text(`视频帧率：${"" + FPS}
视频大小：${mp4size}MB`));
          videores.push(segment.text(
            `永久直链(302跳转)
https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`
          ));
          videores.push(segment.text(`视频直链（有时效性，永久直链在下一条消息）：
${g_video_url}`));
          videores.push(segment.image(cover2));
          logger.info("视频地址", `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0`);
          const res = common.makeForward(videores, this.e.sender.userId, this.e.sender.nick);
          video_data.push(res);
        }
        if (Config.douyin.sendContent.includes("info")) {
          const videoInfoImg = await Render(
            "douyin/videoInfo",
            {
              desc: VideoData.data.aweme_detail.desc,
              statistics: VideoData.data.aweme_detail.statistics,
              aweme_id: VideoData.data.aweme_detail.aweme_id,
              author: {
                name: VideoData.data.aweme_detail.author.nickname,
                avatar: VideoData.data.aweme_detail.author.avatar_thumb.url_list[0]
              },
              image_url: this.is_mp4 ? VideoData.data.aweme_detail.video.animated_cover?.url_list[0] ?? VideoData.data.aweme_detail.video.cover.url_list[0] : VideoData.data.aweme_detail.images[0].url_list[0],
              create_time: VideoData.data.aweme_detail.create_time
            }
          );
          this.e.reply(videoInfoImg);
        }
        if (Config.douyin.sendContent.includes("comment")) {
          const EmojiData = await this.amagi.getDouyinData("Emoji数据", { typeMode: "strict" });
          const list = Emoji(EmojiData.data);
          const commentsArray = await douyinComments(CommentsData, list);
          if (!commentsArray.jsonArray.length) {
            await this.e.reply("这个作品没有评论 ~");
          } else {
            const img2 = await Render(
              "douyin/comment",
              {
                Type: this.is_mp4 ? "视频" : this.is_slides ? "合辑" : "图集",
                CommentsData: commentsArray,
                CommentLength: Config.douyin.realCommentCount ? VideoData.data.aweme_detail.statistics.comment_count : commentsArray.jsonArray?.length ?? 0,
                share_url: this.is_mp4 ? `https://aweme.snssdk.com/aweme/v1/play/?video_id=${VideoData.data.aweme_detail.video.play_addr.uri}&ratio=1080p&line=0` : VideoData.data.aweme_detail.share_url,
                VideoSize: mp4size,
                VideoFPS: FPS,
                ImageLength: imagenum
              }
            );
            await this.e.reply(img2);
          }
        }
        this.is_mp4 && Config.douyin.sendContent.includes("video") && await downloadVideo(
          this.e,
          {
            video_url: g_video_url,
            title: {
              timestampTitle: `tmp_${Date.now()}.mp4`,
              originTitle: `${g_title}.mp4`
            },
            headers: {
              ...baseHeaders,
              Referer: g_video_url
            }
          },
          {
            message_id: this.e.messageId
          }
        );
        return true;
      }
      case "user_dynamic": {
        return true;
      }
      case "music_work": {
        const MusicData = await this.amagi.getDouyinData("音乐数据", {
          music_id: data.music_id,
          typeMode: "strict"
        });
        const sec_uid = MusicData.data.music_info.sec_uid;
        const UserData = await this.amagi.getDouyinData("用户主页数据", { sec_uid, typeMode: "strict" });
        if (!MusicData.data.music_info.play_url) {
          await this.e.reply("解析错误！该音乐抖音未提供下载链接，无法下载", { reply: true });
          return true;
        }
        img = await Render(
          "douyin/musicinfo",
          {
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
          }
        );
        await this.e.reply(
          [
            ...img,
            `
正在上传 ${MusicData.data.music_info.title}
`,
            `作曲: ${MusicData.data.music_info.original_musician_display_name || MusicData.data.music_info.owner_nickname === "" ? MusicData.data.music_info.author : MusicData.data.music_info.owner_nickname}
`,
            `music_id: ${MusicData.data.music_info.id}`
          ]
        );
        await this.e.reply(segment.record(MusicData.data.music_info.play_url.uri, false));
        return true;
      }
      case "live_room_detail": {
        const UserInfoData = await this.amagi.getDouyinData("用户主页数据", {
          sec_uid: data.sec_uid,
          typeMode: "strict"
        });
        if (UserInfoData.data.user.live_status === 1) {
          const live_data = await this.amagi.getDouyinData("直播间信息数据", { sec_uid: UserInfoData.data.user.sec_uid, typeMode: "strict" });
          const room_data = JSON.parse(UserInfoData.data.user.room_data);
          const img2 = await Render(
            "douyin/live",
            {
              image_url: live_data.data.data[0].cover?.url_list[0],
              text: live_data.data.data[0].title,
              liveinf: `${live_data.data.partition_road_map.partition.title} | 房间号: ${room_data.owner.web_rid}`,
              在线观众: Count(Number(live_data.data.data[0].room_view_stats?.display_value)),
              总观看次数: Count(Number(live_data.data.data[0].stats?.total_user_str)),
              username: UserInfoData.data.user.nickname,
              avater_url: UserInfoData.data.user.avatar_larger.url_list[0],
              fans: Count(UserInfoData.data.user.follower_count),
              share_url: "https://live.douyin.com/" + room_data.owner.web_rid,
              dynamicTYPE: "直播间信息"
            }
          );
          await this.e.reply(img2);
        } else {
          this.e.reply(`「${UserInfoData.data.user.nickname}」
未开播，正在休息中~`);
        }
        return true;
      }
    }
  }
}
function douyinProcessVideos(videos, filelimit) {
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
const Emoji = (data) => {
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
};
async function getDouyinID(event, url, log = true) {
  const resp = await axios.get(url, {
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
    }
  });
  const longLink = resp.request.res.responseUrl;
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
const douyinBaseHeaders = {
  ...baseHeaders,
  Referer: "https://www.douyin.com",
  Cookie: Config.cookies.douyin
};
class DouYinpush extends Base {
  force = false;
  /**
   *
   * @param e  事件Message
   * @param force 是否强制推送
   * @default false
   * @returns
   */
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
  /**
   * 执行主要的操作流程
   */
  async action() {
    await this.syncConfigToDatabase();
    const deletedCount = await cleanOldDynamicCache("douyin", 1);
    if (deletedCount > 0) {
      logger.info(`已清理 ${deletedCount} 条过期的抖音作品缓存记录`);
    }
    if (await this.checkremark()) return true;
    const data = await this.getDynamicList(Config.pushlist.douyin);
    if (Object.keys(data).length === 0) return true;
    if (this.force) return await this.forcepush(data);
    else return await this.getdata(data);
  }
  /**
   * 同步配置文件中的订阅信息到数据库
   */
  async syncConfigToDatabase() {
    if (!Config.pushlist.douyin || Config.pushlist.douyin.length === 0) {
      return;
    }
    await douyinDBInstance.syncConfigSubscriptions(Config.pushlist.douyin);
  }
  async getdata(data) {
    if (Object.keys(data).length === 0) return true;
    for (const awemeId in data) {
      logger.mark(`
        ${logger.blue("开始处理并渲染抖音动态图片")}
        ${logger.blue("博主")}: ${logger.green(data[awemeId].remark)} 
        ${logger.cyan("作品id")}：${logger.yellow(awemeId)}
        ${logger.cyan("访问地址")}：${logger.green("https://www.douyin.com/video/" + awemeId)}`);
      const pushItem = data[awemeId];
      const Detail_Data = pushItem.Detail_Data;
      const skip = await skipDynamic(pushItem);
      let img2 = [];
      let iddata = { is_mp4: true, type: "one_work" };
      if (!skip) {
        iddata = await getDouyinID(this.e, Detail_Data.share_url ?? "https://live.douyin.com/" + Detail_Data.room_data?.owner.web_rid, false);
      }
      if (!skip) {
        if (pushItem.living && "room_data" in pushItem.Detail_Data && Detail_Data.live_data) {
          img2 = await Render("douyin/live", {
            image_url: Detail_Data.live_data.data.data.data[0].cover.url_list[0],
            text: Detail_Data.live_data.data.data.data[0].title,
            liveinf: `${Detail_Data.live_data.data.data.partition_road_map?.partition?.title ?? Detail_Data.live_data.data.data.data[0].title} | 房间号: ${Detail_Data.room_data.owner.web_rid}`,
            在线观众: this.count(Detail_Data.live_data.data.data.data[0].room_view_stats.display_value),
            总观看次数: this.count(Number(Detail_Data.live_data.data.data.data[0].stats.total_user_str)),
            username: Detail_Data.user_info.data.user.nickname,
            avater_url: "https://p3-pc.douyinpic.com/aweme/1080x1080/" + Detail_Data.user_info.data.user.avatar_larger.uri,
            fans: this.count(Detail_Data.user_info.data.user.follower_count),
            share_url: "https://live.douyin.com/" + Detail_Data.room_data.owner.web_rid,
            dynamicTYPE: "直播动态推送"
          });
        } else {
          const realUrl = Config.douyin.push.shareType === "web" && await new Networks({
            url: Detail_Data.share_url,
            headers: {
              "User-Agent": "Apifox/1.0.0 (https://apifox.com)",
              Accept: "*/*",
              "Accept-Encoding": "gzip, deflate, br",
              Connection: "keep-alive"
            }
          }).getLocation();
          img2 = await Render("douyin/dynamic", {
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
            抖音号: Detail_Data.user_info.data.user.unique_id === "" ? Detail_Data.user_info.data.user.short_id : Detail_Data.user_info.data.user.unique_id,
            粉丝: this.count(Detail_Data.user_info.data.user.follower_count),
            获赞: this.count(Detail_Data.user_info.data.user.total_favorited),
            关注: this.count(Detail_Data.user_info.data.user.following_count)
          });
        }
      }
      for (const target of pushItem.targets) {
        try {
          if (skip) continue;
          const { groupId, botId } = target;
          let status = { message_id: "" };
          const bot = karin.getBot(botId);
          const Contact = karin.contactGroup(groupId);
          status = await karin.sendMsg(botId, Contact, img2 ? [...img2] : []);
          if (pushItem.living && "room_data" in pushItem.Detail_Data && status.message_id) {
            await douyinDBInstance.updateLiveStatus(pushItem.sec_uid, true);
          }
          if (!pushItem.living && status.message_id) {
            await douyinDBInstance.addAwemeCache(awemeId, pushItem.sec_uid, groupId);
          }
          if (Config.douyin.push.parsedynamic && status.message_id) {
            if (iddata.is_mp4) {
              try {
                let downloadUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${Detail_Data.video.play_addr.uri}&ratio=1080p&line=0`;
                if (Config.douyin.autoResolution) {
                  logger.debug(`开始排除不符合条件的视频分辨率；

                    共拥有${logger.yellow(Detail_Data.video.bit_rate.length)}个视频源

                    视频ID：${logger.green(Detail_Data.aweme_id)}

                    分享链接：${logger.green(Detail_Data.share_url)}
                    `);
                  const videoObj = douyinProcessVideos(Detail_Data.video.bit_rate, Config.upload.filelimit);
                  downloadUrl = await new Networks({
                    url: videoObj[0].play_addr.url_list[0],
                    headers: douyinBaseHeaders
                  }).getLongLink();
                } else {
                  downloadUrl = await new Networks({
                    url: Detail_Data.video.bit_rate[0].play_addr.url_list[0] ?? Detail_Data.video.play_addr_h264.url_list[0] ?? Detail_Data.video.play_addr_h264.url_list[0],
                    headers: douyinBaseHeaders
                  }).getLongLink();
                }
                await downloadVideo(this.e, {
                  video_url: downloadUrl,
                  title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${Detail_Data.desc}.mp4` }
                }, { active: true, activeOption: { uin: botId, group_id: groupId } });
              } catch (error) {
                throw new Error(`下载视频失败: ${error}`);
              }
            } else if (!iddata.is_mp4 && iddata.type === "one_work") {
              const imageres = [];
              let image_url;
              for (const item of Detail_Data.images) {
                image_url = item.url_list[2] ?? item.url_list[1];
                imageres.push(segment.image(image_url));
              }
              const forwardMsg = common.makeForward(imageres, botId, bot.account.name);
              await bot.sendForwardMsg(karin.contactFriend(botId), forwardMsg);
            }
          }
        } catch (error) {
          throw new Error(`${error}`);
        }
      }
    }
    return true;
  }
  /**
   * 根据配置文件获取用户当天的作品列表。
   * @returns 将要推送的列表
   */
  async getDynamicList(userList) {
    const willbepushlist = {};
    try {
      const filteredUserList = userList.filter((item) => item.switch !== false);
      for (const item of filteredUserList) {
        const sec_uid = item.sec_uid;
        logger.debug(`开始获取用户：${item.remark}（${sec_uid}）的主页作品列表`);
        const videolist = await this.amagi.getDouyinData("用户主页视频列表数据", { sec_uid, typeMode: "strict" });
        const userinfo = await this.amagi.getDouyinData("用户主页数据", { sec_uid, typeMode: "strict" });
        const targets = item.group_id.map((groupWithBot) => {
          const [groupId, botId] = groupWithBot.split(":");
          return { groupId, botId };
        });
        if (targets.length === 0) continue;
        if (videolist.data.aweme_list.length > 0) {
          for (const aweme of videolist.data.aweme_list) {
            logger.debug(`开始处理作品：${aweme.aweme_id}`);
            const now = Date.now();
            const createTime = aweme.create_time * 1e3;
            const timeDifference = now - createTime;
            const is_top = aweme.is_top === 1;
            let shouldPush = false;
            const timeDiffSeconds = Math.round(timeDifference / 1e3);
            const timeDiffHours = Math.round(timeDifference / 1e3 / 60 / 60 * 100) / 100;
            logger.debug(`
              前期获取该作品基本信息：
              作者：${aweme.author.nickname}
              作品ID：${aweme.aweme_id}
              发布时间：${Common.convertTimestampToDateTime(aweme.create_time)}
              发布时间戳（s）：${aweme.create_time}
              当前时间戳（ms）：${now}
              时间差（ms）：${timeDifference} ms (${timeDiffSeconds}s) (${timeDiffHours}h)
              是否置顶：${is_top}
              是否处于开播：${userinfo.data.user?.live_status === 1 ? logger.green("true") : logger.red("false")}
              是否在一天内：${timeDifference < 864e5 ? logger.green("true") : logger.red("false")}
              `);
            if (is_top && timeDifference < 864e5 || timeDifference < 864e5 && !is_top) {
              const alreadyPushed = await this.checkIfAlreadyPushed(aweme.aweme_id, sec_uid, targets.map((t) => t.groupId));
              if (!alreadyPushed) {
                shouldPush = true;
              }
            }
            if (shouldPush) {
              willbepushlist[aweme.aweme_id] = {
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
          }
        }
        const liveStatus = await douyinDBInstance.getLiveStatus(sec_uid);
        if (userinfo.data.user.live_status === 1) {
          const liveInfo = await this.amagi.getDouyinData("直播间信息数据", { sec_uid: userinfo.data.user.sec_uid, typeMode: "strict" });
          if (!liveStatus.living) {
            willbepushlist[`live_${sec_uid}`] = {
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
          }
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
  /**
  * 检查作品是否已经推送过
  * @param aweme_id 作品ID
  * @param sec_uid 用户sec_uid
  * @param groupIds 群组ID列表
  * @returns 是否已经推送过
  */
  async checkIfAlreadyPushed(aweme_id, sec_uid, groupIds) {
    for (const groupId of groupIds) {
      const isPushed = await douyinDBInstance.isAwemePushed(aweme_id, sec_uid, groupId);
      if (!isPushed) {
        return false;
      }
    }
    return true;
  }
  /**
   * 设置或更新特定 sec_uid 的群组信息。
   * @param data 抖音的搜索结果数据。需要接口返回的原始数据
   * @returns 操作成功或失败的消息字符串。
   */
  async setting(data) {
    const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
    const config2 = Config.pushlist;
    const groupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    const botId = this.e.selfId;
    try {
      let index = 0;
      while (data.data[index].card_unique_name !== "user") {
        index++;
      }
      const sec_uid = data.data[index].user_list[0].user_info.sec_uid;
      const UserInfoData = await this.amagi.getDouyinData("用户主页数据", { sec_uid, typeMode: "strict" });
      let user_shortid;
      UserInfoData.data.user.unique_id === "" ? user_shortid = UserInfoData.data.user.short_id : user_shortid = UserInfoData.data.user.unique_id;
      config2.douyin ??= [];
      const existingItem = config2.douyin.find((item) => item.sec_uid === sec_uid);
      const isSubscribed = await douyinDBInstance.isSubscribed(sec_uid, groupId);
      if (existingItem) {
        let has = false;
        let groupIndexToRemove = -1;
        for (let index2 = 0; index2 < existingItem.group_id.length; index2++) {
          const item = existingItem.group_id[index2];
          const existingGroupId = item.split(":")[0];
          if (existingGroupId === String(groupId)) {
            has = true;
            groupIndexToRemove = index2;
            break;
          }
        }
        if (has) {
          existingItem.group_id.splice(groupIndexToRemove, 1);
          if (isSubscribed) {
            await douyinDBInstance.unsubscribeDouyinUser(groupId, sec_uid);
          }
          logger.info(`
删除成功！${UserInfoData.data.user.nickname}
抖音号：${user_shortid}
sec_uid${UserInfoData.data.user.sec_uid}`);
          await this.e.reply(`群：${groupInfo.groupName}(${groupId})
删除成功！${UserInfoData.data.user.nickname}
抖音号：${user_shortid}`);
          if (existingItem.group_id.length === 0) {
            const index2 = config2.douyin.indexOf(existingItem);
            config2.douyin.splice(index2, 1);
          }
        } else {
          existingItem.group_id.push(`${groupId}:${botId}`);
          if (!isSubscribed) {
            await douyinDBInstance.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.data.user.nickname);
          }
          await this.e.reply(`群：${groupInfo.groupName}(${groupId})
添加成功！${UserInfoData.data.user.nickname}
抖音号：${user_shortid}`);
          if (Config.douyin.push.switch === false) await this.e.reply("请发送「#kkk设置抖音推送开启」以进行推送");
          logger.info(`
设置成功！${UserInfoData.data.user.nickname}
抖音号：${user_shortid}
sec_uid${UserInfoData.data.user.sec_uid}`);
        }
      } else {
        config2.douyin.push({
          switch: true,
          sec_uid,
          group_id: [`${groupId}:${botId}`],
          remark: UserInfoData.data.user.nickname,
          short_id: user_shortid
        });
        if (!isSubscribed) {
          await douyinDBInstance.subscribeDouyinUser(groupId, botId, sec_uid, user_shortid, UserInfoData.data.user.nickname);
        }
        await this.e.reply(`群：${groupInfo.groupName}(${groupId})
添加成功！${UserInfoData.data.user.nickname}
抖音号：${user_shortid}`);
        if (Config.douyin.push.switch === false) await this.e.reply("请发送「#kkk设置抖音推送开启」以进行推送");
        logger.info(`
设置成功！${UserInfoData.data.user.nickname}
抖音号：${user_shortid}
sec_uid${UserInfoData.data.user.sec_uid}`);
      }
      Config.Modify("pushlist", "douyin", config2.douyin);
      await this.renderPushList();
    } catch (error) {
      throw new Error(`设置失败，请查看日志: ${error}`);
    }
  }
  /** 渲染推送列表图片 */
  async renderPushList() {
    await this.syncConfigToDatabase();
    const groupInfo = await this.e.bot.getGroupInfo("groupId" in this.e && this.e.groupId ? this.e.groupId : "");
    const subscriptions = await douyinDBInstance.getGroupSubscriptions(groupInfo.groupId);
    if (subscriptions.length === 0) {
      await this.e.reply(`当前群：${groupInfo.groupName}(${groupInfo.groupId})
没有设置任何抖音博主推送！
可使用「#设置抖音推送 + 抖音号」进行设置`);
      return;
    }
    const renderOpt = [];
    for (const subscription of subscriptions) {
      const sec_uid = subscription.sec_uid;
      const userInfo = await this.amagi.getDouyinData("用户主页数据", { sec_uid, typeMode: "strict" });
      renderOpt.push({
        avatar_img: userInfo.data.user.avatar_larger.url_list[0],
        username: userInfo.data.user.nickname,
        short_id: userInfo.data.user.unique_id === "" ? userInfo.data.user.short_id : userInfo.data.user.unique_id,
        fans: this.count(userInfo.data.user.follower_count),
        total_favorited: this.count(userInfo.data.user.total_favorited),
        following_count: this.count(userInfo.data.user.following_count)
      });
    }
    const img2 = await Render("douyin/userlist", { renderOpt });
    await this.e.reply(img2);
  }
  /**
   * 强制推送
   * @param data 处理完成的推送列表
   */
  async forcepush(data) {
    const currentGroupId = "groupId" in this.e && this.e.groupId ? this.e.groupId : "";
    const currentBotId = this.e.selfId;
    if (!this.e.msg.includes("全部")) {
      const subscriptions = await douyinDBInstance.getGroupSubscriptions(currentGroupId);
      const subscribedUids = subscriptions.map((sub) => sub.sec_uid);
      const filteredData = {};
      for (const awemeId in data) {
        if (subscribedUids.includes(data[awemeId].sec_uid)) {
          filteredData[awemeId] = {
            ...data[awemeId],
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
  /**
  * 检查并更新备注信息
  */
  async checkremark() {
    const config2 = Config.pushlist;
    const updateList = [];
    if (Config.pushlist.douyin === null || Config.pushlist.douyin.length === 0) return true;
    for (const i of Config.pushlist.douyin) {
      const remark = i.remark;
      const sec_uid = i.sec_uid;
      if (remark === void 0 || remark === "") {
        updateList.push({ sec_uid });
      }
    }
    if (updateList.length > 0) {
      for (const i of updateList) {
        const userinfo = await this.amagi.getDouyinData("用户主页数据", { sec_uid: i.sec_uid, typeMode: "strict" });
        const remark = userinfo.data.user.nickname;
        const matchingItemIndex = config2.douyin.findIndex((item) => item.sec_uid === i.sec_uid);
        if (matchingItemIndex !== -1) {
          config2.douyin[matchingItemIndex].remark = remark;
        }
      }
      Config.Modify("pushlist", "douyin", config2.douyin);
    }
    return false;
  }
  /**
   * 处理作品描述
   */
  desc(Detail_Data, desc) {
    if (desc === "") {
      return "该作品没有描述";
    }
    return desc;
  }
  /**
   * 格式化数字
   */
  count(num) {
    if (num > 1e4) {
      return (num / 1e4).toFixed(1) + "万";
    }
    return num.toString();
  }
}
const skipDynamic = async (PushItem) => {
  if ("liveStatus" in PushItem.Detail_Data) {
    return false;
  }
  const tags = [];
  if (PushItem.Detail_Data.text_extra) {
    for (const item of PushItem.Detail_Data.text_extra) {
      if (item.hashtag_name) {
        tags.push(item.hashtag_name);
      }
    }
  }
  logger.debug(`检查作品是否需要过滤：${PushItem.Detail_Data.share_url}`);
  const shouldFilter = await douyinDBInstance.shouldFilter(PushItem, tags);
  return shouldFilter;
};
async function kuaishouComments(data, emojidata) {
  let jsonArray = [];
  for (const i of data.data.visionCommentList.rootComments) {
    const cid = i.commentId;
    const aweme_id = i.commentId;
    const nickname = i.authorName;
    const userimageurl = i.headurl;
    const text = i.content;
    const time = getRelativeTimeFromTimestamp(i.timestamp);
    const digg_count = Number(i.likedCount);
    const commentObj = {
      cid,
      aweme_id,
      nickname,
      userimageurl,
      text,
      digg_count,
      create_time: time
    };
    jsonArray.push(commentObj);
  }
  jsonArray.sort((a, b) => b.digg_count - a.digg_count);
  jsonArray = br(jsonArray);
  jsonArray = await handling_at(jsonArray);
  for (const i of jsonArray) {
    if (i.digg_count > 1e4) {
      i.digg_count = (i.digg_count / 1e4).toFixed(1) + "w";
    }
  }
  for (const item1 of jsonArray) {
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
  return jsonArray.slice(0, Math.min(jsonArray.length, Config.kuaishou.numcomment));
}
function getRelativeTimeFromTimestamp(timestamp) {
  const timestampInSeconds = Math.floor(timestamp / 1e3);
  const now = Math.floor(Date.now() / 1e3);
  const differenceInSeconds = now - timestampInSeconds;
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
    text = text.replace(/(@[\S\s]+?)\(\w+\)/g, (match, p1) => {
      return `<span style="color: rgb(3,72,141);">${p1.trim()}</span>`;
    });
    i.text = text;
  }
  return data;
}
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
    case "one_work": {
      const VideoData = await client.getKuaishouData("单个视频作品数据", {
        photoId: opt.photoId,
        typeMode: "strict"
      });
      const CommentsData = await client.getKuaishouData("评论数据", {
        photoId: opt.photoId,
        typeMode: "strict"
      });
      const EmojiData = await client.getKuaishouData("Emoji数据", {
        typeMode: "strict"
      });
      return { VideoData, CommentsData, EmojiData };
    }
    case "work_comments": {
      const CommentsData = await client.getKuaishouData("评论数据", {
        photoId: opt.photoId,
        typeMode: "strict"
      });
      return CommentsData.data;
    }
    case "emoji_list": {
      const EmojiData = await client.getKuaishouData("Emoji数据", {
        typeMode: "strict"
      });
      return EmojiData;
    }
  }
}
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
    // 匹配 kuaishou.com/short-video/{id} 格式的链接
    case /kuaishou\.com\/short-video\/([^?]+)/.test(longLink): {
      const workid = /short-video\/([^?]+)/.exec(longLink);
      result = {
        type: "one_work",
        photoId: workid ? workid[1] : void 0
      };
      break;
    }
    default: {
      logger.warn("无法获取作品ID");
      break;
    }
  }
  log && console.log(result);
  return result;
}
class Kuaishou extends Base {
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
    const transformedData = Object.entries(data.EmojiData.data.data.visionBaseEmoticons.iconUrls).map(([name, path2]) => {
      return { name, url: `https:${path2}` };
    });
    const CommentsData = await kuaishouComments(data.CommentsData.data, transformedData);
    const fileHeaders = await new Networks({ url: video_url, headers: this.headers }).getHeaders();
    const fileSizeContent = fileHeaders["content-range"]?.match(/\/(\d+)/) ? parseInt(fileHeaders["content-range"]?.match(/\/(\d+)/)[1], 10) : 0;
    const fileSizeInMB = (fileSizeContent / (1024 * 1024)).toFixed(2);
    const img2 = await Render("kuaishou/comment", {
      Type: "视频",
      viewCount: data.VideoData.data.data.visionVideoDetail.photo.viewCount,
      CommentsData,
      CommentLength: CommentsData?.length ?? 0,
      share_url: video_url,
      VideoSize: fileSizeInMB,
      likeCount: data.VideoData.data.data.visionVideoDetail.photo.likeCount
    });
    await this.e.reply(img2);
    await downloadVideo(this.e, { video_url, title: { timestampTitle: `tmp_${Date.now()}.mp4`, originTitle: `${data.VideoData.data.data.visionVideoDetail.photo.caption}.mp4` } });
    return true;
  }
}
class LogCollector {
  /** 收集到的日志列表 */
  logs = [];
  /** 是否正在收集日志 */
  isCollecting = false;
  /** amagi logger原始方法备份 */
  originalAmagiWarn = null;
  originalAmagiError = null;
  /** 是否已经拦截过amagi logger */
  static isAmagiIntercepted = false;
  /**
   * 构造函数
   */
  constructor() {
    if (!LogCollector.isAmagiIntercepted) {
      this.interceptAmagiLogger();
      LogCollector.isAmagiIntercepted = true;
    }
    this.registerInstance();
  }
  /**
   * 开始收集日志
   */
  startCollecting() {
    if (this.isCollecting) return;
    this.isCollecting = true;
    this.logs = [];
  }
  /**
   * 停止收集日志
   */
  stopCollecting() {
    if (!this.isCollecting) return;
    this.isCollecting = false;
    this.unregisterInstance();
  }
  /**
   * 拦截amagi logger的warn和error方法
   */
  interceptAmagiLogger() {
    this.originalAmagiWarn = logger$1.warn.bind(logger$1);
    this.originalAmagiError = logger$1.error.bind(logger$1);
    logger$1.warn = (message, ...args) => {
      LogCollector.collectToAllInstances("warn", [message, ...args]);
      if (this.originalAmagiWarn) {
        this.originalAmagiWarn(message, ...args);
      }
    };
    logger$1.error = (message, ...args) => {
      LogCollector.collectToAllInstances("error", [message, ...args]);
      if (this.originalAmagiError) {
        this.originalAmagiError(message, ...args);
      }
    };
  }
  /** 所有活跃的收集器实例 */
  static activeInstances = [];
  /**
   * 向所有活跃的收集器实例收集日志
   * @param level 日志级别
   * @param args 日志参数
   */
  static collectToAllInstances(level, args) {
    LogCollector.activeInstances.forEach((instance) => {
      if (instance.isCollecting) {
        instance.collectAmagiLog(level, args);
      }
    });
  }
  /**
   * 收集amagi日志
   * @param level 日志级别
   * @param args 日志参数
   */
  collectAmagiLog(level, args) {
    if (!this.isCollecting) return;
    const message = args.map(
      (arg) => typeof arg === "string" ? arg : JSON.stringify(arg)
    ).join(" ");
    const logEntry = {
      level,
      message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19),
      source: "amagi"
    };
    this.logs.push(logEntry);
  }
  /**
   * 获取收集期间的所有日志
   * @returns 日志条目数组
   */
  getCollectedLogs() {
    return [...this.logs];
  }
  /**
   * 获取格式化的日志字符串
   * @returns 格式化的日志字符串
   */
  getFormattedLogs() {
    return this.logs.map((log) => {
      return `[${log.timestamp}] [${log.source}] [${log.level.toUpperCase()}] ${log.message}`;
    }).join("\n\n");
  }
  /**
   * 清空收集到的日志
   */
  clearLogs() {
    this.logs = [];
  }
  /**
   * 注册活跃实例
   */
  registerInstance() {
    if (!LogCollector.activeInstances.includes(this)) {
      LogCollector.activeInstances.push(this);
    }
  }
  /**
   * 注销活跃实例
   */
  unregisterInstance() {
    const index = LogCollector.activeInstances.indexOf(this);
    if (index > -1) {
      LogCollector.activeInstances.splice(index, 1);
    }
  }
}
function statBotId(pushlist) {
  const douyin = pushlist.douyin?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
  const bilibili = pushlist.bilibili?.[0]?.group_id?.[0]?.split(":")?.[1] || "";
  return {
    douyin: { botId: douyin },
    bilibili: { botId: bilibili }
  };
}
const wrapWithErrorHandler = (fn, options) => {
  return (async (...args) => {
    const logCollector = new LogCollector();
    try {
      logCollector.startCollecting();
      const result = await fn(...args);
      return result;
    } catch (error) {
      const collectedLogs = logCollector.getFormattedLogs();
      if (!Config.app.errorLogSendTo) {
        throw error;
      }
      await handleBusinessError(error, options, collectedLogs, args[0]);
      throw error;
    } finally {
      logCollector.stopCollecting();
    }
  });
};
const handleBusinessError = async (error, options, logs, event) => {
  const stackTrace = error.stack || "无法获取调用栈信息";
  const triggerCommand = event?.msg || "未知命令";
  const img2 = await Render("other/handlerError", {
    type: "business_error",
    platform: "system",
    error: {
      message: error.message,
      name: error.name,
      stack: stackTrace,
      businessName: options.businessName
    },
    method: options.businessName,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    logs,
    triggerCommand,
    share_url: triggerCommand
  });
  if (event && Config.app.errorLogSendTo.some((item) => item === "trigger")) {
    try {
      event.reply(img2);
    } catch (replyError) {
      logger.error(`发送错误消息给用户失败: ${replyError}`);
    }
  }
  if (Config.app.errorLogSendTo.some((item) => item === "master")) {
    try {
      const botId = statBotId(Config.pushlist);
      const list = config.master();
      let master = list[0];
      if (master === "console") {
        master = list[1];
      }
      const selectedBotId = botId.douyin.botId || botId.bilibili.botId || "";
      const isPushTask = !event || options.businessName.includes("推送");
      if (selectedBotId && master) {
        if (isPushTask) {
          await karin.sendMaster(
            selectedBotId,
            master,
            [
              segment.text(`${options.businessName} 任务执行出错！
请即时解决以消除警告`),
              ...img2
            ]
          );
        } else {
          const Adapter = karin.getBot(selectedBotId);
          const groupID = event && "groupId" in event ? event.groupId : "";
          const groupInfo = await Adapter?.getGroupInfo(groupID);
          await karin.sendMaster(
            selectedBotId,
            master,
            [
              segment.text(`群：${groupInfo?.groupName || "未知"}(${groupID})
${options.businessName} 任务执行出错！
请即时解决以消除警告`),
              ...img2
            ]
          );
        }
      }
    } catch (masterError) {
      logger.error(`发送错误消息给主人失败: ${masterError}`);
    }
  }
  if (options.customErrorHandler) {
    try {
      await options.customErrorHandler(error, logs);
    } catch (customError) {
      logger.error(`自定义错误处理失败: ${customError}`);
    }
  }
};
export {
  Bilibilipush as B,
  Config as C,
  DouYinpush as D,
  Kuaishou as K,
  Networks as N,
  Render as R,
  getLongLinkRouter as a,
  getDouyinDataRouter as b,
  getBilibiliDataRouter as c,
  getKuaishouDataRouter as d,
  getDouyinContentRouter as e,
  getBilibiliContentRouter as f,
  getVideoRouter as g,
  getGroupsRouter as h,
  getAuthorsRouter as i,
  addDouyinContentRouter as j,
  addBilibiliContentRouter as k,
  deleteContentRouter as l,
  Common as m,
  bilibiliLogin as n,
  wrapWithErrorHandler as o,
  getDouyinID as p,
  DouYin as q,
  getBilibiliID as r,
  signatureVerificationMiddleware as s,
  Bilibili as t,
  getKuaishouID as u,
  videoStreamRouter as v,
  webConfig as w,
  fetchKuaishouData as x
};
