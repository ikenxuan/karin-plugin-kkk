import fs, { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { c as Chalk, s as server_browserExports, d as browserExports, r as reactExports, j as jsxRuntimeExports, H as HeroUIProvider, e as clsx, f as CircleCheckBig, T as TriangleAlert, I as Info, Z as Zap, i as Code, k as MessageCircle, m as Heart, Q as QrCode, B as Bookmark, S as Share2, n as Clock, U as Users, o as Hash, E as Eye, p as Music, q as UserPlus, t as Star, u as TrendingUp, v as chip_default, x as button_default, y as ExternalLink, z as ThumbsUp, A as ThumbsDown, F as Shield, G as Crown, J as code_default, P as Play, K as Calendar, L as Coins, R as Radio, N as MapPin, O as Send, V as CircleAlert, W as Terminal, X as FileText, Y as Sparkles, _ as Palette, $ as Monitor, a0 as Globe, a1 as Bug, a2 as Layers, a3 as RefreshCw, a4 as TestTube, a5 as Package, a6 as GitBranch, a7 as Settings, a8 as card_default, a9 as card_body_default } from "./vendor-BDm9YcM1.js";
var PlatformType = /* @__PURE__ */ ((PlatformType2) => {
  PlatformType2["DOUYIN"] = "douyin";
  PlatformType2["BILIBILI"] = "bilibili";
  PlatformType2["KUAISHOU"] = "kuaishou";
  PlatformType2["XIAOHONGSHU"] = "xiaohongshu";
  PlatformType2["HELP"] = "help";
  PlatformType2["OTHER"] = "other";
  return PlatformType2;
})(PlatformType || {});
const baseComponentConfigs = [
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
    components: [
      {
        id: "comment",
        name: "评论列表",
        description: "快手视频评论列表展示模板",
        enabled: true,
        componentPath: "platforms/kuaishou/Comment",
        exportName: "KuaishouComment"
      }
    ]
  },
  {
    type: PlatformType.XIAOHONGSHU,
    name: "小红书",
    icon: "⚡",
    color: "warning",
    components: [
      {
        id: "noteInfo",
        name: "笔记信息",
        description: "小红书笔记信息展示模板",
        enabled: true,
        componentPath: "platforms/xiaohongshu/noteInfo",
        exportName: "XiaohongshuNoteInfo"
      },
      {
        id: "comment",
        name: "评论列表",
        description: "小红书评论列表展示模板",
        enabled: true,
        componentPath: "platforms/xiaohongshu/comment",
        exportName: "XiaohongshuComment"
      }
    ]
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
        id: "changelog_v2",
        name: "更新日志",
        description: "KKK插件更新日志",
        enabled: true,
        componentPath: "platforms/other/changelog_v2",
        exportName: "changelog_v2"
      }
    ]
  }
];
function createComponentConfig(baseConfig, extensions = {}) {
  return {
    ...baseConfig,
    ...extensions
  };
}
const componentConfigs = baseComponentConfigs.map((basePlatform) => {
  const platform = {
    ...basePlatform,
    components: []
  };
  switch (basePlatform.type) {
    case PlatformType.DOUYIN:
      platform.components = basePlatform.components.map((baseComponent) => {
        switch (baseComponent.id) {
          case "comment":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => Comment$3).then((module) => ({
                default: module.DouyinComment
              }))
            });
          case "dynamic":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => Dynamic).then((module) => ({
                default: module.DouyinDynamic
              }))
            });
          case "live":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => Live).then((module) => ({
                default: module.DouyinLive
              }))
            });
          case "musicinfo":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => MusicInfo).then((module) => ({
                default: module.DouyinMusicInfo
              }))
            });
          case "user_profile":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string"
            });
          case "userlist":
            return createComponentConfig(baseComponent, {
              validateData: (data) => {
                return data && Array.isArray(data.renderOpt);
              },
              lazyComponent: () => Promise.resolve().then(() => UserList$1).then((module) => ({
                default: module.default
              }))
            });
          case "videoInfo":
            return createComponentConfig(baseComponent, {
              lazyComponent: () => Promise.resolve().then(() => videoInfo$1).then((module) => ({
                default: module.DouyinVideoInfo
              }))
            });
          default:
            return createComponentConfig(baseComponent);
        }
      });
      break;
    case PlatformType.BILIBILI:
      platform.components = basePlatform.components.map((baseComponent) => {
        switch (baseComponent.id) {
          case "comment":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => Comment$2).then((module) => ({
                default: module.BilibiliComment
              }))
            });
          case "userlist":
            return createComponentConfig(baseComponent, {
              validateData: (data) => {
                return data && Array.isArray(data.renderOpt);
              },
              lazyComponent: () => Promise.resolve().then(() => UserList).then((module) => ({
                default: module.default
              }))
            });
          case "bangumi":
            return createComponentConfig(baseComponent, {
              lazyComponent: () => Promise.resolve().then(() => bangumi).then((module) => ({
                default: module.default
              }))
            });
          case "dynamic/DYNAMIC_TYPE_DRAW":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_DRAW).then((module) => ({
                default: module.BilibiliDrawDynamic
              }))
            });
          case "dynamic/DYNAMIC_TYPE_AV":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_AV).then((module) => ({
                default: module.BilibiliVideoDynamic
              }))
            });
          case "dynamic/DYNAMIC_TYPE_FORWARD":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_FORWARD).then((module) => ({
                default: module.BilibiliForwardDynamic
              }))
            });
          case "dynamic/DYNAMIC_TYPE_LIVE_RCMD":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_LIVE_RCMD).then((module) => ({
                default: module.BilibiliLiveDynamic
              }))
            });
          case "dynamic/DYNAMIC_TYPE_WORD":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string"
            });
          case "videoInfo":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => videoInfo).then((module) => ({
                default: module.BilibiliVideoInfo
              }))
            });
          case "qrcodeImg":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => qrcodeImg).then((module) => ({
                default: module.BilibiliQrcodeImg
              }))
            });
          default:
            return createComponentConfig(baseComponent);
        }
      });
      break;
    case PlatformType.KUAISHOU:
      platform.components = basePlatform.components.map((baseComponent) => {
        switch (baseComponent.id) {
          case "comment":
            return createComponentConfig(baseComponent, {
              validateData: (data) => data && typeof data.share_url === "string",
              lazyComponent: () => Promise.resolve().then(() => Comment$1).then((module) => ({
                default: module.KuaishouComment
              }))
            });
          default:
            return createComponentConfig(baseComponent);
        }
      });
      break;
    case PlatformType.XIAOHONGSHU:
      platform.components = basePlatform.components.map((baseComponent) => {
        switch (baseComponent.id) {
          case "noteInfo":
            return createComponentConfig(baseComponent, {
              lazyComponent: () => Promise.resolve().then(() => noteInfo).then((module) => ({
                default: module.XiaohongshuNoteInfo
              }))
            });
          case "comment":
            return createComponentConfig(baseComponent, {
              lazyComponent: () => Promise.resolve().then(() => Comment).then((module) => ({
                default: module.XiaohongshuComment
              }))
            });
          default:
            return createComponentConfig(baseComponent);
        }
      });
      break;
    case PlatformType.OTHER:
      platform.components = basePlatform.components.map((baseComponent) => {
        switch (baseComponent.id) {
          case "help":
            return createComponentConfig(baseComponent, {
              lazyComponent: () => Promise.resolve().then(() => Help$1).then((module) => ({
                default: module.Help
              }))
            });
          case "handlerError":
            return createComponentConfig(baseComponent, {
              lazyComponent: () => Promise.resolve().then(() => handlerError$1).then((module) => ({
                default: module.handlerError
              }))
            });
          case "changelog_v2":
            return createComponentConfig(baseComponent, {
              lazyComponent: () => Promise.resolve().then(() => changelog_v2).then((module) => ({
                default: module.ChangelogV2
              }))
            });
          default:
            return createComponentConfig(baseComponent);
        }
      });
      break;
    default:
      platform.components = basePlatform.components.map(
        (baseComponent) => createComponentConfig(baseComponent)
      );
  }
  return platform;
});
const getLogLevel = () => {
  const logLevel = process.env.LOG_LEVEL || "info";
  switch (logLevel.toLowerCase()) {
    case "debug":
      return 0;
    case "info":
      return 1;
    case "warn":
      return 2;
    case "error":
      return 3;
    case "mark":
      return 4;
    default:
      return 1;
  }
};
const shouldEnableCallStack = () => {
  if (process.env.ENABLE_CALL_STACK !== void 0) {
    return process.env.ENABLE_CALL_STACK === "true";
  }
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  if (process.env.RUNTIME === "tsx") {
    return true;
  }
  try {
    const stack = new Error().stack;
    if (stack) {
      const stackLines = stack.split("\n");
      const hasUserCode = stackLines.some(
        (line) => line && !line.includes("node_modules") && (line.includes(".ts:") || line.includes(".js:")) && !line.includes("at Error") && !line.includes("at shouldEnableCallStack")
      );
      if (hasUserCode) {
        return true;
      }
    }
  } catch {
  }
  return false;
};
const shouldEnableColors = () => {
  if (process.env.FORCE_COLOR !== void 0) {
    return process.env.FORCE_COLOR !== "0";
  }
  if (process.stdout && process.stdout.isTTY) {
    return true;
  }
  if (process.env.CI || process.env.GITHUB_ACTIONS || process.env.GITLAB_CI) {
    return false;
  }
  return true;
};
class CustomLogger {
  enableCallStack;
  enableColors;
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
  /**
   * 获取调用栈信息
   * @returns 调用点信息字符串 [文件名:行号]
   */
  getCallSite() {
    if (!this.enableCallStack) return "";
    try {
      const stack = new Error().stack;
      if (!stack) return "";
      const stackLines = stack.split("\n");
      let targetLine = "";
      for (let i = 1; i < stackLines.length; i++) {
        const line = stackLines[i];
        if (!line) continue;
        if (line.includes("getCallSite") || line.includes("CustomLogger.log") || line.includes("CustomLogger.debug") || line.includes("CustomLogger.info") || line.includes("CustomLogger.warn") || line.includes("CustomLogger.error") || line.includes("CustomLogger.mark")) {
          continue;
        }
        if (!line.includes("node_modules")) {
          targetLine = line;
          break;
        } else if (!targetLine && line.includes("node_modules")) {
          targetLine = line;
        }
      }
      if (!targetLine) return "";
      let match = targetLine.match(/at .+? \((.+?):(\d+):\d+\)/) || targetLine.match(/at (.+?):(\d+):\d+/);
      if (!match) return "";
      let fileName = match[1];
      const lineNumber = match[2];
      if (fileName.startsWith("file:///")) {
        fileName = fileName.replace("file:///", "");
        if (process.platform === "win32") {
          fileName = fileName.replace(/\//g, "\\");
        }
      } else if (fileName.startsWith("file://")) {
        fileName = fileName.replace("file://", "");
      }
      let relativePath = "";
      if (fileName.includes("node_modules")) {
        const nodeModulesMatch = fileName.match(/node_modules[\\\/]([^\\\/]+)[\\\/](.+)/);
        if (nodeModulesMatch) {
          const packageName = nodeModulesMatch[1];
          const packagePath = nodeModulesMatch[2];
          if (packageName === "karin-plugin-kkk" || packageName.startsWith("@")) {
            relativePath = `${packageName}/${packagePath}`;
          } else {
            relativePath = `node_modules/${packageName}/${packagePath}`;
          }
        } else {
          relativePath = path.basename(fileName);
        }
      } else {
        let currentDir = fileName;
        let monorepoRoot = "";
        while (currentDir !== path.dirname(currentDir)) {
          currentDir = path.dirname(currentDir);
          try {
            const fs2 = require("fs");
            if (fs2.existsSync(path.join(currentDir, "pnpm-workspace.yaml")) || fs2.existsSync(path.join(currentDir, "lerna.json")) || fs2.existsSync(path.join(currentDir, "rush.json")) || fs2.existsSync(path.join(currentDir, "package.json"))) {
              monorepoRoot = currentDir;
              break;
            }
          } catch {
            continue;
          }
        }
        if (monorepoRoot) {
          relativePath = path.relative(monorepoRoot, fileName);
        } else {
          const packagesMatch = fileName.match(/.*[\\\/]packages[\\\/](.+)/);
          if (packagesMatch) {
            relativePath = `packages/${packagesMatch[1]}`;
          } else {
            relativePath = path.relative(process.cwd(), fileName);
          }
        }
      }
      relativePath = relativePath.replace(/\\/g, "/");
      if (relativePath.length > 60) {
        const parts = relativePath.split("/");
        if (parts.length > 2) {
          relativePath = `.../${parts.slice(-2).join("/")}`;
        }
      }
      return `[${relativePath}:${lineNumber}] `;
    } catch {
      return "";
    }
  }
  /**
   * 格式化时间戳
   * @returns 格式化的时间字符串
   */
  formatTimestamp() {
    const now = /* @__PURE__ */ new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const milliseconds = now.getMilliseconds().toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
  /**
   * 输出日志
   * @param level 日志级别
   * @param levelStr 日志级别字符串
   * @param color 颜色函数
   * @param message 日志消息
   * @param args 额外参数
   */
  log(level, levelStr, color, message, ...args) {
    const currentLevel = getLogLevel();
    if (level < currentLevel) return;
    const timestamp = this.formatTimestamp();
    const formattedLevel = levelStr.padEnd(4);
    const callSite = this.getCallSite();
    const basePrefix = `[kkk/template][${timestamp}][${formattedLevel}]`;
    const coloredPrefix = this.enableColors ? color(basePrefix) : basePrefix;
    const prefix = coloredPrefix + (callSite ? ` ${this.enableColors ? this.gray(callSite) : callSite}` : "");
    switch (level) {
      case 3:
        console.error(prefix, message, ...args);
        break;
      case 2:
        console.warn(prefix, message, ...args);
        break;
      default:
        console.log(prefix, message, ...args);
        break;
    }
  }
  /**
   * 打印调试级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  debug(message, ...args) {
    this.log(0, "DEBU", this.cyan, message, ...args);
  }
  /**
   * 打印信息级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  info(message, ...args) {
    this.log(1, "INFO", this.green, message, ...args);
  }
  /**
   * 打印警告级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  warn(message, ...args) {
    this.log(2, "WARN", this.yellow, message, ...args);
  }
  /**
   * 打印错误级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  error(message, ...args) {
    this.log(3, "ERRO", this.red, message, ...args);
  }
  /**
   * 打印标记级别日志
   * @param message 日志消息
   * @param args 额外参数
   */
  mark(message, ...args) {
    this.log(4, "MARK", this.gray, message, ...args);
  }
}
const logger = new CustomLogger();
class ComponentAutoRegistry {
  static components = /* @__PURE__ */ new Map();
  static initialized = false;
  /**
   * 初始化组件注册器
   * 自动扫描配置文件并注册所有启用的组件
   */
  static async initialize() {
    if (this.initialized) {
      return;
    }
    const cwd = process.cwd();
    logger.debug("当前环境: NODE_ENV =", process.env.NODE_ENV || "production");
    logger.debug("当前工作目录:", cwd);
    logger.debug("开始自动注册组件...");
    for (const platformConfig of componentConfigs) {
      await this.registerPlatformComponents(platformConfig);
    }
    this.initialized = true;
    logger.debug(`✅ 组件自动注册完成，共注册 ${this.components.size} 个组件`);
    logger.debug(`📦 已注册组件: ${Array.from(this.components.keys()).join(", ")}`);
  }
  /**
   * 注册平台下的所有组件
   * @param platformConfig 平台配置
   */
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
  /**
   * 注册单个组件
   * @param platform 平台类型
   * @param componentConfig 组件配置
   */
  static async registerComponent(platform, componentConfig) {
    const key = `${platform}:${componentConfig.id}`;
    if (componentConfig.lazyComponent) {
      try {
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
    } else {
      try {
        const modulePath = `../components/${componentConfig.componentPath}`;
        const module = await import(modulePath);
        const component = module[componentConfig.exportName];
        if (!component) {
          throw new Error(`组件 ${componentConfig.exportName} 未在模块 ${modulePath} 中找到`);
        }
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
  }
  /**
   * 获取组件注册项
   * @param platform 平台类型
   * @param componentId 组件ID
   * @returns 组件注册项或undefined
   */
  static get(platform, componentId) {
    const key = `${platform}:${componentId}`;
    return this.components.get(key);
  }
  /**
   * 检查组件是否已注册
   * @param platform 平台类型
   * @param componentId 组件ID
   * @returns 是否已注册
   */
  static has(platform, componentId) {
    const key = `${platform}:${componentId}`;
    return this.components.has(key);
  }
  /**
   * 获取所有已注册的组件键
   * @returns 组件键数组
   */
  static getAllKeys() {
    return Array.from(this.components.keys());
  }
  /**
   * 重新加载组件注册器
   * 用于开发时热更新
   */
  static async reload() {
    this.components.clear();
    this.initialized = false;
    await this.initialize();
  }
  /**
   * 获取组件统计信息
   * @returns 组件统计信息
   */
  static getStats() {
    const stats = { total: this.components.size, byPlatform: {} };
    for (const key of this.components.keys()) {
      const platform = key.split(":")[0];
      stats.byPlatform[platform] = (stats.byPlatform[platform] || 0) + 1;
    }
    return stats;
  }
}
class QRCodeGenerator {
  /**
   * 生成二维码SVG数据URL
   * @param url 要生成二维码的URL
   * @param useDarkTheme 是否使用深色主题
   * @param config 二维码配置
   * @returns 二维码数据URL
   */
  static async generateDataUrl(url, useDarkTheme = false, config = {}) {
    const {
      width = 600,
      errorCorrectionLevel = "L"
    } = config;
    const qrCodeSvg = await browserExports.toString(url, {
      type: "svg",
      width,
      errorCorrectionLevel,
      color: {
        dark: useDarkTheme ? "#C3C3C3" : "#3A3A3A",
        // 码的颜色
        light: useDarkTheme ? "#18181B" : "#FAFAFA"
        // 背景色
      },
      margin: 0
    });
    return `data:image/svg+xml;base64,${Buffer.from(qrCodeSvg).toString("base64")}`;
  }
}
class ComponentRendererFactory {
  /**
   * 创建组件实例
   * @param request 渲染请求
   * @param qrCodeDataUrl 二维码数据URL
   * @returns React组件元素
   */
  static async createComponent(request, qrCodeDataUrl) {
    const { templateType, templateName } = request;
    const registryItem = ComponentAutoRegistry.get(templateType, templateName);
    if (!registryItem) {
      throw new Error(`未找到组件配置: ${templateType}:${templateName}`);
    }
    if (registryItem.validateData && !registryItem.validateData(request.data)) {
      throw new Error(`数据验证失败: ${templateType}:${templateName}`);
    }
    const props = {
      data: request.data,
      qrCodeDataUrl,
      version: request.version,
      scale: request.scale
    };
    if (templateName.includes("/")) {
      const subType = templateName.split("/")[1];
      props.subType = subType;
    }
    return reactExports.createElement(registryItem.component, props);
  }
}
class ResourcePathManager {
  packageDir;
  NODE_ENV;
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "production";
    this.packageDir = this.getPackageDir();
  }
  /**
   * 获取包目录路径
   * @returns 包目录的绝对路径
   */
  getPackageDir() {
    const cwd = process.cwd();
    switch (this.NODE_ENV) {
      case "development":
        let currentDir = cwd;
        while (currentDir !== path.dirname(currentDir)) {
          const renderDir = path.join(currentDir, "render");
          if (existsSync(renderDir)) {
            logger.debug("开发模式：找到 render 目录:", renderDir);
            return currentDir;
          }
          currentDir = path.dirname(currentDir);
        }
        return path.join(path.dirname(cwd), "render");
      case "production":
      default:
        return this.getPackageDirFromImportMeta();
    }
  }
  /**
   * 通过 import.meta.url 获取 npm 包的安装目录
   * @returns npm 包的安装目录路径
   */
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
  /**
   * 从 pnpm 路径中提取插件目录
   * @param pnpmPath pnpm 的符号链接路径
   * @returns 插件目录路径，如果无法提取则返回 null
   */
  extractPluginDirFromPnpmPath(pnpmPath) {
    const pnpmIndex = pnpmPath.indexOf(".pnpm");
    if (pnpmIndex === -1) return null;
    const projectRoot = pnpmPath.substring(0, pnpmIndex - "/node_modules/".length);
    logger.debug("从 pnpm 路径提取的项目根目录:", projectRoot);
    const pluginsDir = path.join(projectRoot, "plugins");
    if (!existsSync(pluginsDir)) {
      logger.debug("plugins 目录不存在:", pluginsDir);
      return null;
    }
    try {
      const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());
      for (const pluginDir of pluginDirs) {
        const pluginPath = path.join(pluginsDir, pluginDir.name);
        const karinPluginPath = path.join(pluginPath, "node_modules", "karin-plugin-kkk");
        if (existsSync(karinPluginPath)) {
          logger.debug("找到包含 karin-plugin-kkk 的插件目录:", pluginPath);
          return pluginPath;
        }
      }
    } catch (error) {
      logger.debug("扫描 plugins 目录失败:", error);
    }
    return null;
  }
  /**
   * 通过扫描当前工作目录查找插件目录
   * @returns 插件目录路径，如果找不到则返回 null
   */
  findPluginDirByScanning() {
    const cwd = process.cwd();
    const pluginsDir = path.join(cwd, "plugins");
    if (!existsSync(pluginsDir)) {
      logger.debug("当前工作目录下没有 plugins 目录");
      return null;
    }
    try {
      const pluginDirs = fs.readdirSync(pluginsDir, { withFileTypes: true }).filter((dirent) => dirent.isDirectory());
      for (const pluginDir of pluginDirs) {
        const pluginPath = path.join(pluginsDir, pluginDir.name);
        const karinPluginPath = path.join(pluginPath, "node_modules", "karin-plugin-kkk");
        if (existsSync(karinPluginPath)) {
          logger.debug("通过扫描找到包含 karin-plugin-kkk 的插件目录:", pluginPath);
          return pluginPath;
        }
      }
    } catch (error) {
      logger.debug("扫描失败:", error);
    }
    return null;
  }
  /**
   * 检测当前是否运行在 Monorepo 模式
   * @returns 如果是 Monorepo 模式返回 true，否则返回 false
   */
  isPluginMode() {
    const hasPluginsInPath = this.packageDir.includes("plugins");
    const pluginResourcesExists = fs.existsSync(path.join(this.packageDir, "resources"));
    const npmPackageExists = fs.existsSync(path.join(this.packageDir, "node_modules", "karin-plugin-kkk"));
    return hasPluginsInPath && pluginResourcesExists && npmPackageExists;
  }
  /**
   * 获取静态资源路径配置
   * @returns 静态资源路径配置对象
   */
  getResourcePaths() {
    switch (this.NODE_ENV) {
      case "development":
        return {
          cssDir: path.join(path.dirname(this.packageDir), "core", "lib"),
          imageDir: path.join(path.dirname(this.packageDir), "core/resources/image")
        };
      case "production":
      default:
        if (this.isPluginMode()) {
          return {
            cssDir: fs.existsSync(path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib")) ? path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib") : path.join(this.packageDir, "lib"),
            imageDir: path.join(this.packageDir, "resources", "image")
          };
        } else {
          return {
            cssDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib"),
            imageDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "resources", "image")
          };
        }
    }
  }
}
class HtmlWrapper {
  resourceManager;
  constructor(resourceManager) {
    this.resourceManager = resourceManager;
  }
  /**
   * 包装HTML内容
   * @param htmlContent React渲染的HTML内容
   * @param htmlFilePath HTML文件的绝对路径
   * @returns 完整的HTML文档
   */
  wrapContent(htmlContent, htmlFilePath) {
    const htmlDir = path.dirname(htmlFilePath);
    const { cssDir, imageDir } = this.resourceManager.getResourcePaths();
    const cssRelativePath = path.relative(htmlDir, cssDir).replace(/\\/g, "/");
    const imageRelativePath = path.relative(htmlDir, imageDir).replace(/\\/g, "/");
    const cssUrl = path.join(cssRelativePath, "karin-plugin-kkk.css").replace(/\\/g, "/");
    const processedHtml = htmlContent.replace(
      /src="\/image\//g,
      `src="${imageRelativePath}/`
    );
    return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width">
      <link rel="stylesheet" href="${cssUrl}">
    </head>
    <body>
      ${processedHtml}
    </body>
    </html>
    `;
  }
}
class SSRRender {
  outputDir;
  cssContent = "";
  resourceManager;
  htmlWrapper;
  constructor() {
    this.resourceManager = new ResourcePathManager();
    this.htmlWrapper = new HtmlWrapper(this.resourceManager);
    this.outputDir = "";
    this.loadCssContent();
  }
  /**
   * 加载CSS内容到内存中
   */
  loadCssContent() {
    try {
      const { cssDir } = this.resourceManager.getResourcePaths();
      const cssPath = path.join(cssDir, "karin-plugin-kkk.css");
      if (existsSync(cssPath)) {
        this.cssContent = fs.readFileSync(cssPath, "utf-8");
      } else {
        logger.warn("⚠️ CSS文件未找到:", cssPath);
        const fallbackPath = path.join(this.resourceManager["packageDir"], "dist/css/main.css");
        if (existsSync(fallbackPath)) {
          this.cssContent = fs.readFileSync(fallbackPath, "utf-8");
          logger.debug("✅ 从后备路径加载CSS:", fallbackPath);
        }
      }
    } catch (error) {
      logger.error("❌ 加载CSS内容失败:", error);
    }
  }
  /**
   * SSR渲染组件为HTML字符串
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  async renderComponent(request) {
    try {
      logger.debug("[SSR]开始渲染组件，预设模板:", `${logger.yellow(`${request.templateType}/`)}${request.templateName}`);
      const qrCodeDataUrl = await QRCodeGenerator.generateDataUrl(
        request.data.share_url || "https://github.com/ikenxuan/karin-plugin-kkk",
        request.data.useDarkTheme || false
      );
      const component = await ComponentRendererFactory.createComponent(request, qrCodeDataUrl);
      const htmlContent = server_browserExports.renderToString(component);
      const safeTemplateName = request.templateName.replace(/\//g, "_");
      const fileName = `${request.templateType}_${safeTemplateName}_${Date.now()}.html`;
      const filePath = path.join(this.outputDir, fileName);
      const fullHtml = this.htmlWrapper.wrapContent(htmlContent, filePath);
      writeFileSync(filePath, fullHtml, "utf-8");
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
  /**
   * 重新加载CSS内容（用于开发时热更新）
   */
  reloadCss() {
    this.loadCssContent();
  }
  /**
   * 启动服务
   */
  async start() {
    await ComponentAutoRegistry.initialize();
    const stats = ComponentAutoRegistry.getStats();
    logger.debug(`📁 HTML输出目录: ${this.outputDir}`);
    logger.debug(`🎨 CSS文件状态: ${this.cssContent ? "已加载" : "未加载"}`);
    logger.debug(`📦 已注册组件总数: ${stats.total}`);
    logger.debug("📊 各平台组件数量:", stats.byPlatform);
    logger.debug(`🔧 已注册组件: ${ComponentAutoRegistry.getAllKeys().join(", ")}`);
  }
  /**
   * 渲染组件
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  async render(request) {
    return this.renderComponent(request);
  }
}
const reactServerRender = async (request, outputDir) => {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  await ComponentAutoRegistry.initialize();
  const tempServer = new SSRRender();
  tempServer["outputDir"] = outputDir;
  return await tempServer.render(request);
};
const GlowImage = ({
  src,
  alt,
  className,
  imgClassName,
  mode = "blur-layer",
  blurRadius = 18,
  glowStrength = 0.6,
  scale = 1.06,
  shadowRadius = 28,
  crossOrigin
}) => {
  const [shadowColor, setShadowColor] = reactExports.useState("rgba(255,255,255,0.5)");
  reactExports.useEffect(() => {
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
          const a = data[i + 3];
          if (a < 10) continue;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          setShadowColor(`rgba(${r}, ${g}, ${b}, ${Math.min(glowStrength, 0.85)})`);
        }
      } catch {
      }
    };
  }, [mode, src, glowStrength, crossOrigin]);
  if (mode === "dominant-shadow") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt,
        className: imgClassName,
        style: {
          filter: `drop-shadow(0 0 ${shadowRadius}px ${shadowColor}) drop-shadow(0 0 ${Math.round(
            shadowRadius * 0.6
          )}px ${shadowColor})`
        }
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, style: { position: "relative", display: "inline-block" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
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
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt, className: imgClassName })
  ] });
};
const DefaultLayout = ({
  children,
  version,
  data,
  scale = 3
}) => {
  const { useDarkTheme } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(HeroUIProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: clsx(
        "w-[1440px]",
        useDarkTheme && "dark",
        "bg-default-50 text-default-900"
      ),
      id: "container",
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: "1440px"
      },
      children: [
        children,
        version ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-32 pb-20 text-default-800", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex relative justify-center items-center space-x-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end space-x-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GlowImage,
              {
                src: "/image/logo.png",
                alt: "logo",
                imgClassName: "w-auto h-18",
                glowStrength: 1,
                blurRadius: 50
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold uppercase text-default-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50 text-warning", children: "karin-plugin" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-black text-warning", children: version.pluginName })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start opacity-80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900", children: [
              version.releaseType === "Stable" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { strokeWidth: 3, className: "w-4 h-4" }) : version.releaseType === "Preview" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { strokeWidth: 3, className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { strokeWidth: 3, className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: version.releaseType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-5xl font-bold tracking-wide", children: [
              "v",
              version.pluginVersion
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-14 opacity-80 bg-default-900" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end space-x-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/image/frame-logo.png", className: "self-center w-auto h-18" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { strokeWidth: 3, className: "w-4 h-4 opacity-50 text-warning" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-50 text-warning", children: "Powered By" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-black text-warning", children: version.poweredBy })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-14 opacity-80 bg-default-900" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end space-x-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/image/vite.svg", className: "self-center w-auto h-16" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start opacity-80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-1 space-x-2 text-sm font-bold tracking-widest uppercase text-default-900", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { strokeWidth: 3, className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Built with" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-black", children: "Vite" })
            ] })
          ] })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24" })
      ]
    }
  ) });
};
const QRCodeSection$5 = ({
  qrCodeDataUrl
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center -mr-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center mt-20 rounded-lg w-120 h-120 bg-content1 shadow-medium", children: qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCodeDataUrl, alt: "二维码", className: "object-contain w-full h-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-center text-foreground-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 80, className: "mb-4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "二维码生成失败" })
  ] }) }) });
};
const VideoInfoHeader$1 = ({
  type,
  commentLength,
  videoSize,
  videoFPS,
  imageLength,
  qrCodeDataUrl,
  useDarkTheme
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex flex-col -ml-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 transform translate-x-[9%] translate-y-[17%] w-[650px] h-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
          alt: "抖音Logo",
          className: "object-contain w-full h-full",
          onError: (e) => {
            const target = e.target;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<div class="flex justify-center items-center h-full text-2xl font-bold text-foreground-600">抖音</div>';
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[250px] space-y-2 text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text", children: [
          "作品类型：",
          type
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text", children: [
          "评论数量：",
          commentLength,
          "条"
        ] }),
        type === "视频" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text", children: [
            "视频大小：",
            videoSize,
            "MB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text", children: [
            "视频帧率：",
            videoFPS,
            "Hz"
          ] })
        ] }),
        (type === "图集" || type === "合辑") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left select-text", children: [
          "图片数量：",
          imageLength,
          "张"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QRCodeSection$5,
      {
        qrCodeDataUrl
      }
    )
  ] });
};
const CommentItemComponent$2 = ({ comment, isLast = false }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clsx(
    "flex px-10 pt-10",
    { "pb-0": isLast, "pb-10": !isLast }
  ), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: comment.userimageurl,
        className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
        alt: "用户头像"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12.5 text-5xl text-foreground-600 relative flex items-center select-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: comment.nickname }),
        comment.label_type === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-4 py-1 rounded-xl ml-3 text-[40px] bg-[#fe2c55] text-white", children: "作者" }),
        comment.status_label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-4 py-1 rounded-xl ml-3 text-[40px] bg-content2 text-foreground-700", children: comment.status_label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-6xl text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
          dangerouslySetInnerHTML: { __html: comment.text },
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ),
      (comment.commentimage || comment.sticker) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          className: "object-contain w-full h-full rounded-2xl",
          src: comment.commentimage || comment.sticker,
          alt: "评论图片"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-6 text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6 select-text", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.create_time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.ip_label }),
          comment.reply_comment_total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[40px] text-foreground-600", children: [
            "共",
            comment.reply_comment_total,
            "条回复"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[40px] text-foreground-600", children: "回复" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 60, className: "text-foreground-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[50px] select-text", children: comment.digg_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 60, className: "stroke-current text-foreground-500" }) })
        ] })
      ] }),
      comment.replyComment && Object.keys(comment.replyComment).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-6 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: comment.replyComment.userimageurl,
            className: "object-cover mr-8 rounded-full w-18 h-18",
            alt: "用户头像"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2 space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[40px] font-medium text-foreground-600", children: comment.replyComment.nickname }),
            comment.replyComment.label_text !== "" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(
              "inline-block px-3 py-1 ml-2 text-3xl rounded-xl",
              comment.replyComment.label_text === "作者" ? "bg-[#fe2c55] text-white" : "bg-default-100 text-default-500"
            ), children: comment.replyComment.label_text })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-6xl text-foreground leading-relaxed mb-2 select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
              dangerouslySetInnerHTML: { __html: comment.replyComment.text },
              style: {
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-foreground-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[35px]", children: comment.replyComment.create_time }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[35px]", children: comment.replyComment.ip_label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 40, className: "text-foreground-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[35px]", children: comment.replyComment.digg_count })
            ] })
          ] })
        ] })
      ] }) }) }),
      comment.replyComment && Object.keys(comment.replyComment).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-4 border-b-1 border-divider" })
    ] })
  ] });
};
const DouyinComment = reactExports.memo((props) => {
  const processedData = reactExports.useMemo(() => {
    if (!props.data) {
      return {
        commentsArray: [],
        type: "未知",
        commentLength: 0,
        videoSize: void 0,
        videoFPS: void 0,
        imageLength: void 0,
        useDarkTheme: false
      };
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VideoInfoHeader$1,
      {
        type: processedData.type,
        commentLength: processedData.commentLength,
        videoSize: processedData.videoSize,
        videoFPS: processedData.videoFPS,
        imageLength: processedData.imageLength,
        qrCodeDataUrl: props.qrCodeDataUrl || "",
        useDarkTheme: processedData.useDarkTheme
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto mx-auto max-w-full", children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItemComponent$2,
      {
        comment,
        isLast: index === processedData.commentsArray.length - 1
      },
      index
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-20 text-foreground-400", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 64, className: "mx-auto mb-4 text-foreground-300 text-comment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl", children: "暂无评论数据" })
    ] }) }) })
  ] }) });
});
const Comment$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DouyinComment
}, Symbol.toStringTag, { value: "Module" }));
const DouyinHeader$1 = ({ useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-12 py-15", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[39%] h-[200px] bg-cover bg-center bg-fixed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
        alt: "抖音Logo",
        className: "object-contain w-full h-full"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[65px] ml-4 text-foreground-600", children: "记录美好生活" })
  ] });
};
const CoverSection$1 = ({ imageUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center my-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      className: "rounded-[25px] object-contain w-full h-full",
      src: imageUrl,
      alt: "封面"
    }
  ) }) });
};
const InfoSection = ({ desc, dianzan, pinglun, shouchang, share, createTime }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-16 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
        style: { letterSpacing: "1.5px", wordWrap: "break-word" },
        dangerouslySetInnerHTML: { __html: desc }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-[45px] text-foreground-500 font-light mb-2.5 select-text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-11 h-11 text-like" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          dianzan,
          "点赞"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-11 h-11 text-comment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          pinglun,
          "评论"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-11 h-11" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          shouchang,
          "收藏"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-11 h-11 text-success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          share,
          "分享"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[45px] text-foreground-500 font-light select-text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-11 h-11 text-time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "发布于",
        createTime
      ] })
    ] })
  ] });
};
const UserInfoSection$1 = ({
  avater_url,
  username,
  douyinId,
  likes,
  following,
  followers,
  coCreatorCount
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pl-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center mr-7 bg-white rounded-full w-54 h-54", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: avater_url,
          alt: "头像",
          className: "rounded-full w-51 h-51 shadow-large"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[80px] font-bold text-foreground-700 select-text break-words leading-tight max-w-full", children: [
          "@",
          username
        ] }),
        coCreatorCount && coCreatorCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gap-2 mt-3 inline-flex items-center rounded-[20px] bg-foreground-200 text-foreground-700 px-6 py-3 self-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[34px] leading-none select-text text-foreground-700", children: [
            coCreatorCount,
            "人共创"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground-600 select-text",
        style: { letterSpacing: "2.5px" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-8 h-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "抖音号: ",
              douyinId
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-like" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "获赞: ",
              likes
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-8 h-8 text-view" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "关注: ",
              following
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-follow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "粉丝: ",
              followers
            ] })
          ] })
        ]
      }
    )
  ] });
};
const QRCodeSection$4 = ({ qrCodeDataUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-[420px] mr-18", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-divider", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "w-[350px] h-[350px]"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[40px] text-foreground-500 mt-5 select-text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-10 h-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: "作品直链：永久有效" })
    ] })
  ] });
};
const CoCreatorsInfo = ({ info }) => {
  const creators = info?.co_creators ?? [];
  if (creators.length === 0) return null;
  const items = creators.slice(0, 50);
  const listRef = reactExports.useRef(null);
  const [visibleCount, setVisibleCount] = reactExports.useState(items.length);
  reactExports.useEffect(() => {
    const calc = () => {
      const el = listRef.current;
      if (!el) return;
      const containerWidth = el.offsetWidth;
      const ITEM_W = 152;
      const GAP = 32;
      const PAD_R = 8;
      const capacity = Math.floor((containerWidth - PAD_R) / (ITEM_W + GAP));
      const needEllipsis = items.length > capacity;
      const nextVisible = needEllipsis ? Math.max(0, capacity - 1) : items.length;
      setVisibleCount(nextVisible);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [items.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col pl-16 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: listRef,
      className: "flex overflow-hidden gap-8 py-1 pr-2 w-full",
      style: { scrollbarWidth: "thin" },
      children: [
        items.slice(0, visibleCount).map((c, idx) => {
          const avatar = c.avatar_thumb?.url_list[0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center bg-white rounded-full w-38 h-38", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: avatar,
                    alt: "共创者头像",
                    className: "object-cover w-36 h-36 rounded-full"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700", children: c.nickname || "未提供" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600", children: c.role_title || "未提供" })
              ]
            },
            `${c.nickname || "creator"}-${idx}`
          );
        }),
        items.length > visibleCount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center min-w-[152px] w-[152px] flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded-full bg-default-200 w-38 h-38", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[42px] leading-none text-foreground-500", children: "···" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden mt-6 w-full text-3xl font-medium leading-tight text-center truncate whitespace-nowrap select-text text-foreground-700", children: [
            "还有",
            items.length - visibleCount,
            "人"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden mt-2 w-full text-3xl leading-tight text-center truncate whitespace-nowrap select-text text-foreground-600", children: "共创" })
        ] })
      ]
    }
  ) });
};
const DouyinDynamic = (props) => {
  const { data, qrCodeDataUrl } = props;
  const coCreatorCount = data.cooperation_info?.co_creator_nums ?? (data.cooperation_info?.co_creators?.length ?? void 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DouyinHeader$1, { useDarkTheme: data.useDarkTheme }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CoverSection$1, { imageUrl: data.image_url }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[20px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InfoSection,
      {
        desc: data.desc,
        dianzan: data.dianzan,
        pinglun: data.pinglun,
        shouchang: data.shouchang,
        share: data.share,
        createTime: data.create_time,
        useDarkTheme: data.useDarkTheme
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[100px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-10 px-0 pt-25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoCreatorsInfo, { info: data.cooperation_info }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-8 items-start w-[960px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserInfoSection$1,
          {
            avater_url: data.avater_url,
            username: data.username,
            douyinId: data.抖音号,
            likes: data.获赞,
            following: data.关注,
            followers: data.粉丝,
            useDarkTheme: data.useDarkTheme,
            coCreatorCount
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          QRCodeSection$4,
          {
            qrCodeDataUrl,
            useDarkTheme: data.useDarkTheme
          }
        )
      ] })
    ] })
  ] }) });
};
const Dynamic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DouyinDynamic
}, Symbol.toStringTag, { value: "Module" }));
const CoverSection = ({ imageUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[95%] flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      className: "rounded-[25px] object-contain w-full h-full select-text",
      src: imageUrl,
      alt: "封面"
    }
  ) }) }) });
};
const UserInfoSection = ({
  avater_url,
  username,
  fans
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center pr-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: avater_url,
        alt: "头像",
        className: "mr-[15px] rounded-full h-auto w-[130px] select-text"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row items-center mb-[5px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[60px] text-foreground select-text", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: username }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            className: "w-[170px] h-auto select-text",
            src: "/image/douyin/抖音-直播中.png",
            alt: "直播中"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-follow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-default-500 text-[35px] select-text", children: [
          fans,
          "粉丝"
        ] })
      ] })
    ] })
  ] });
};
const QRCodeSection$3 = ({ qrCodeDataUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center mt-[30px] mr-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[50px] ml-[10px] text-right mr-[10px] text-foreground select-text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-12 h-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "直播分享链接" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-[10px] rounded-[2%] border-[7px] border-dashed border-default-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "w-[350px] select-text"
      }
    ) })
  ] });
};
const DouyinLive = (props) => {
  const { qrCodeDataUrl } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DefaultLayout, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CoverSection, { imageUrl: props.data.image_url }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[10px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[65px] items-center tracking-[1.5px] relative break-words font-bold text-foreground select-text", children: props.data.text }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[10px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[45px] items-center tracking-[1.5px] relative break-words text-default-500 select-text", children: props.data.liveinf }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-[45px] tracking-[1.5px] relative break-words text-default-500 select-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-11 h-11 text-view" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "观看总人数",
            props.data.总观看次数
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-11 h-11 text-follow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "在线观众",
            props.data.在线观众
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserInfoSection,
        {
          avater_url: props.data.avater_url,
          username: props.data.username,
          fans: props.data.fans,
          useDarkTheme: props.data.useDarkTheme
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-auto h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-inherit text-[70px] text-right mr-5 -mb-[45px] z-[-1] text-foreground select-text", children: [
          "抖音",
          props.data.dynamicTYPE
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-auto flex justify-between pt-[60px] items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col ml-[45px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-start items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-[130%] h-[245px] mb-[52px] bg-cover bg-center bg-fixed ${props.data.useDarkTheme ? "bg-[url(/image/douyin/dylogo-light.svg)]" : "bg-[url(/image/douyin/dylogo-dark.svg)]"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[50px] tracking-[10px] text-foreground select-text", children: "抖音 记录美好生活" }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSection$3, { qrCodeDataUrl, useDarkTheme: props.data.useDarkTheme })
        ] })
      ] })
    ] })
  ] });
};
const Live = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DouyinLive
}, Symbol.toStringTag, { value: "Module" }));
const DouyinHeader = ({ useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center px-12 py-15", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[39%] h-[200px] bg-cover bg-center bg-fixed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: useDarkTheme ? "/image/douyin/dylogo-light.svg" : "/image/douyin/dylogo-dark.svg",
        alt: "抖音Logo",
        className: "object-contain w-full h-full select-text"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[65px] ml-4 text-foreground select-text", children: "记录美好生活" })
  ] });
};
const MusicCoverSection = ({ imageUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center my-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center overflow-hidden shadow-large rounded-[25px] w-[90%] relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      className: "rounded-[25px] object-contain w-full h-full select-text",
      src: imageUrl,
      alt: "音乐封面"
    }
  ) }) });
};
const MusicInfoSection = ({
  desc,
  musicId,
  userCount,
  createTime
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-16 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-[70px] font-bold leading-relaxed mb-9 text-foreground select-text",
        style: { letterSpacing: "1.5px", wordWrap: "break-word" },
        dangerouslySetInnerHTML: { __html: desc }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-[45px] text-default-500 font-light mb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center select-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-11 h-11" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "音乐ID: ",
          musicId
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center select-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-11 h-11 text-follow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          userCount,
          " 人使用过"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[45px] text-default-500 font-light select-text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-11 h-11 text-time" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "图片生成于",
        createTime
      ] })
    ] })
  ] });
};
const MusicAuthorInfoSection = ({
  avatarUrl,
  username,
  userShortId,
  totalFavorited,
  followingCount,
  fans
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pl-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: avatarUrl,
          alt: "头像",
          className: "w-[200px] h-[200px] rounded-full mr-7 shadow-large select-text"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[80px] font-bold text-foreground select-text", children: username }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col text-[35px] mt-6 space-y-1 text-foreground select-text",
        style: { letterSpacing: "2.5px" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-8 h-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "ID: ",
              userShortId
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-like" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "获赞: ",
              totalFavorited
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-8 h-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "关注: ",
              followingCount
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-follow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "粉丝: ",
              fans
            ] })
          ] })
        ]
      }
    )
  ] });
};
const MusicQRCodeSection = ({ qrCodeDataUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-18", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-11 h-11" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "文件直链：永久有效" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "w-[350px] h-[350px] select-text"
      }
    ) })
  ] });
};
const DouyinMusicInfo = (props) => {
  const { data, qrCodeDataUrl } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DouyinHeader, { useDarkTheme: data.useDarkTheme }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MusicCoverSection,
      {
        imageUrl: data.image_url,
        description: data.desc,
        useDarkTheme: data.useDarkTheme
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[90px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MusicInfoSection,
      {
        desc: data.desc,
        musicId: data.music_id,
        userCount: data.user_count,
        createTime: data.create_time,
        useDarkTheme: data.useDarkTheme
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[100px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-500 select-text", children: "抖音音乐信息" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-0 pt-25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MusicAuthorInfoSection,
        {
          avatarUrl: data.avater_url,
          username: data.username,
          userShortId: data.user_shortid,
          totalFavorited: data.total_favorited,
          followingCount: data.following_count,
          fans: data.fans,
          useDarkTheme: data.useDarkTheme
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MusicQRCodeSection,
        {
          qrCodeDataUrl,
          useDarkTheme: data.useDarkTheme
        }
      )
    ] })
  ] }) });
};
const MusicInfo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DouyinMusicInfo
}, Symbol.toStringTag, { value: "Module" }));
const DouyinUserItem = ({ user, index }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex w-[90%] items-center px-[45px] py-[35px] rounded-[25px] shadow-large bg-content1 select-text",
        "data-index": index,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user.avatar_img,
              alt: "用户头像",
              className: "w-[150px] h-[150px] rounded-full mr-[50px] object-cover select-text"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-grow justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[55px] mb-[15px] font-medium text-foreground select-text", children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-[30px] text-[25px] text-foreground select-text", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "抖音号: ",
                user.short_id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "粉丝: ",
                user.fans
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "获赞: ",
                user.total_favorited
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "关注: ",
                user.following_count
              ] })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[40px]" })
  ] });
};
const DouyinUserList = (prop) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...prop, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col-reverse items-center p-0 list-none", children: prop.data.renderOpt.map((user, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    DouyinUserItem,
    {
      user,
      index,
      useDarkTheme: prop.data.useDarkTheme
    },
    `${user.short_id}-${index}`
  )) }) });
};
const UserList$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: DouyinUserList
}, Symbol.toStringTag, { value: "Module" }));
const formatNumber$3 = (num) => {
  if (num >= 1e4) {
    return `${(num / 1e4).toFixed(1)}万`;
  }
  return num.toLocaleString();
};
const formatDate$2 = (timestamp) => {
  return new Date(timestamp * 1e3).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
const StatItem$2 = reactExports.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: iconColor, children: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground-900", children: formatNumber$3(value) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground-500", children: label })
] }));
StatItem$2.displayName = "StatItem";
const DouyinVideoInfo = reactExports.memo(
  (props) => {
    const formattedDate = reactExports.useMemo(() => formatDate$2(props.data.create_time), [props.data.create_time]);
    const statsData = reactExports.useMemo(
      () => [
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48 }), value: props.data.statistics.digg_count, label: "点赞", iconColor: "text-like" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48 }), value: props.data.statistics.comment_count, label: "评论", iconColor: "text-comment" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 48 }), value: props.data.statistics.collect_count, label: "收藏", iconColor: "text-yellow-500" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48 }), value: props.data.statistics.share_count, label: "分享", iconColor: "text-view" }
      ],
      [props.data.statistics]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: props.data.image_url,
            alt: props.data.desc,
            className: "object-cover w-full h-full"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-20 pb-36", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-8 text-7xl font-bold leading-tight text-foreground-900", children: props.data.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-4xl text-foreground-500", children: formattedDate })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 text-5xl gap-18", children: statsData.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatItem$2,
          {
            icon: stat.icon,
            value: stat.value,
            label: stat.label,
            iconColor: stat.iconColor
          },
          index
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8 text-5xl text-foreground-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-16 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatNumber$3(props.data.statistics?.recommend_count ?? 0) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "推荐" })
            ] }),
            props.data.statistics.play_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatNumber$3(props.data.statistics.play_count) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "播放" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transform-gpu scale-[2.5] origin-right mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(chip_default, { color: "primary", variant: "flat", size: "lg", radius: "sm", children: [
            "作品ID：",
            props.data.aweme_id
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 bg-default-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-16 py-12 pb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: props.data.author.avatar,
              alt: props.data.author.name,
              className: "object-cover w-48 h-48 rounded-full"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl font-semibold text-foreground-900", children: props.data.author.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-5xl text-foreground-500", children: [
              "抖音号: ",
              props.data.author.short_id
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transform-gpu scale-[3.5] origin-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          button_default,
          {
            size: "sm",
            className: "bg-default-800 dark:bg-default-100",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mr-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ExternalLink,
                  {
                    className: "absolute w-4 h-4",
                    style: {
                      transform: "translate(-0.5px, -0.5px)",
                      color: "#00e6f6"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ExternalLink,
                  {
                    className: "absolute w-4 h-4",
                    style: {
                      transform: "translate(0.5px, 0.5px)",
                      color: "#ff013c"
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ExternalLink,
                  {
                    className: "relative w-4 h-4",
                    style: { color: "white" }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute",
                    style: {
                      transform: "translate(-0.5px, -0.5px)",
                      color: "#00e6f6"
                    },
                    children: "观看"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "absolute",
                    style: {
                      transform: "translate(0.5px, 0.5px)",
                      color: "#ff013c"
                    },
                    children: "观看"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "relative",
                    style: { color: "white" },
                    children: "观看"
                  }
                )
              ] })
            ] })
          }
        ) })
      ] })
    ] }) }) });
  }
);
DouyinVideoInfo.displayName = "DouyinVideoInfo";
const videoInfo$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DouyinVideoInfo
}, Symbol.toStringTag, { value: "Module" }));
const processCommentHTML$1 = (htmlContent) => {
  return htmlContent.replace(
    /<img([^>]*?)>/gi,
    '<img$1 referrerpolicy="no-referrer" crossorigin="anonymous">'
  );
};
const CommentText$1 = ({ content, className, style }) => {
  const processedContent = processCommentHTML$1(content);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className,
      style,
      dangerouslySetInnerHTML: { __html: processedContent }
    }
  );
};
const ImageWithSkeleton = ({
  src,
  alt,
  className = "",
  placeholder
}) => {
  const [hasError, setHasError] = reactExports.useState(false);
  const handleError = () => {
    setHasError(true);
  };
  reactExports.useEffect(() => {
    setHasError(false);
  }, [src]);
  if (hasError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex justify-center items-center text-sm select-text ${className} bg-content2 text-foreground-500`, children: placeholder || "图片加载失败" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src,
      alt,
      className: `select-text ${className}`,
      onError: handleError,
      referrerPolicy: "no-referrer",
      crossOrigin: "anonymous"
    }
  );
};
const QRCodeSection$2 = ({
  qrCodeDataUrl
}) => {
  const qrCodeRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center -mr-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: qrCodeRef,
      className: "flex justify-center items-center mt-20 w-120 h-120",
      children: qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: qrCodeDataUrl,
          alt: "二维码",
          className: "object-contain w-full h-full select-text"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center w-full h-full text-6xl select-text text-foreground-400", children: "二维码占位符" })
    }
  ) });
};
const InfoItem = ({ label, value, unit }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[45px] p-2.5 tracking-[6px] text-left break-all text-foreground-600 select-text", children: [
    label,
    "：",
    value,
    unit
  ] });
};
const VideoInfoHeader = ({
  type,
  commentLength,
  videoSize,
  clarity
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col mt-2.5 -ml-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[580px] h-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-8xl font-bold text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/image/bilibili/bilibili.png", alt: "B站Logo", className: "select-text" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "作品类型", value: type }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "评论数量", value: commentLength, unit: "条" }),
    type === "视频" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      videoSize && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "视频大小", value: videoSize, unit: "MB" }),
      clarity && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "视频画质", value: clarity })
    ] })
  ] });
};
const CommentItemComponent$1 = ({
  comment,
  isLast = false
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clsx(
    "flex relative px-10 py-10 max-w-full",
    { "pb-0": isLast }
  ), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mr-[33.75px] flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithSkeleton,
        {
          src: comment.avatar || "AVATAR_PLACEHOLDER",
          alt: "用户头像",
          className: "rounded-full w-50 h-50 shadow-large",
          placeholder: "头像",
          isCircular: true
        }
      ),
      comment.frame && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithSkeleton,
        {
          src: comment.frame,
          alt: "头像框",
          className: "absolute inset-0 transform scale-180",
          placeholder: "头像框"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-[10px] mb-[15px] text-[50px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-2 leading-[1.2] text-foreground-700 font-bold select-text", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "[&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-[100px] [&>svg]:h-[100px] [&>svg]:align-middle [&>svg]:flex-shrink-0",
              dangerouslySetInnerHTML: { __html: comment.uname }
            }
          ),
          comment.level !== void 0 && comment.level >= 0 && comment.level <= 7 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: `/image/bilibili/level/lv${comment.level}.svg`,
              alt: `等级${comment.level}`,
              className: "inline-block flex-shrink-0 w-24 h-24 align-middle"
            }
          ),
          comment.isUP && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/image/bilibili/up_pb.svg",
              alt: "UP主标签",
              className: "inline-block flex-shrink-0 align-middle w-23 h-23"
            }
          )
        ] }),
        comment.label_type === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-danger text-danger-foreground flex-shrink-0 self-center select-text", children: "作者" }),
        comment.status_label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-content2 text-foreground-600 flex-shrink-0 self-center select-text", children: comment.status_label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text", style: { wordBreak: "break-word", overflowWrap: "break-word" }, children: [
        comment.isTop && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex justify-center items-center relative border-4 border-[#006A9E] rounded-xl text-[#006A9E] text-5xl px-2 py-1 leading-none mr-2 align-baseline", children: "置顶" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommentText$1,
          {
            content: comment.message,
            className: "inline [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]"
          }
        )
      ] }),
      (comment.img_src || comment.sticker) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-large", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithSkeleton,
        {
          src: comment.img_src || comment.sticker || "IMAGE_PLACEHOLDER",
          alt: "评论图片",
          className: "rounded-[25px] object-contain w-full h-full",
          placeholder: "评论图片"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[45px] tracking-[2px] select-text", children: [
          comment.ctime,
          " · ",
          comment.location,
          comment.replylength > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground-400 tracking-[3px] ml-4", children: [
            comment.replylength,
            "回复"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-4 text-foreground-600", children: "回复" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[75px] ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[15px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-[60px] h-[60px] text-foreground-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px] text-foreground-500 select-text", children: comment.like })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-[15px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-[60px] h-[60px] text-foreground-500" }) })
        ] })
      ] })
    ] })
  ] });
};
const BilibiliComment = reactExports.memo((props) => {
  const processedData = reactExports.useMemo(() => {
    if (!props.data) {
      return {
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
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DefaultLayout, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoInfoHeader,
        {
          type: processedData.Type,
          commentLength: processedData.CommentLength,
          videoSize: processedData.VideoSize,
          clarity: processedData.Clarity,
          imageLength: processedData.ImageLength
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QRCodeSection$2,
        {
          shareurl: processedData.shareurl || processedData.share_url,
          qrCodeDataUrl: props.qrCodeDataUrl,
          useDarkTheme: processedData.useDarkTheme
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-0 max-w-full", children: processedData.CommentsData.length > 0 ? processedData.CommentsData.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItemComponent$1,
      {
        comment,
        useDarkTheme: processedData.useDarkTheme,
        isLast: index === processedData.CommentsData.length - 1
      },
      index
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center select-text text-foreground-500", children: "暂无评论数据" }) })
  ] });
});
const Comment$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliComment
}, Symbol.toStringTag, { value: "Module" }));
const processCommentHTML = (htmlContent) => {
  if (!htmlContent || typeof htmlContent !== "string") {
    return "";
  }
  return htmlContent.replace(
    /<img([^>]*?)>/gi,
    '<img$1 referrerpolicy="no-referrer" crossorigin="anonymous">'
  );
};
const CommentText = ({ content, className, style }) => {
  const processedContent = processCommentHTML(content);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className,
      style,
      dangerouslySetInnerHTML: { __html: processedContent }
    }
  );
};
const EnhancedImage = ({
  src,
  alt,
  className = "",
  placeholder,
  isCircular = false
}) => {
  const [hasError, setHasError] = reactExports.useState(false);
  const handleError = () => {
    setHasError(true);
  };
  if (!src || hasError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${className} ${isCircular ? "rounded-full" : "rounded-md"} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-400", children: placeholder || alt }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src,
      alt,
      className,
      onError: handleError,
      referrerPolicy: "no-referrer",
      crossOrigin: "anonymous"
    }
  );
};
const BilibiliUserItem = ({ user }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex w-[90%] items-center px-[45px] py-[35px] rounded-[25px] shadow-large bg-content1 select-text",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: user.avatar_img,
              alt: "用户头像",
              className: "w-[150px] h-[150px] rounded-full mr-[50px] object-cover select-text"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-grow justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[55px] mb-[15px] font-medium text-foreground select-text", children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-[30px] text-[25px] text-foreground select-text", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "UID: ",
                user.host_mid
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "粉丝: ",
                user.fans
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "获赞: ",
                user.total_favorited
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "关注: ",
                user.following_count
              ] })
            ] })
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[40px]" })
  ] });
};
const BilibiliUserList = (prop) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...prop, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col-reverse items-center p-0 list-none", children: prop.data.renderOpt.map((user, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    BilibiliUserItem,
    {
      user,
      useDarkTheme: prop.data.useDarkTheme
    },
    `${user.host_mid}-${index}`
  )) }) });
};
const UserList = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BilibiliUserList
}, Symbol.toStringTag, { value: "Module" }));
const formatNumber$2 = (num) => {
  if (num >= 1e8) {
    return `${(num / 1e8).toFixed(1)}亿`;
  }
  if (num >= 1e4) {
    return `${(num / 1e4).toFixed(1)}万`;
  }
  return num.toString();
};
const formatDateParts = (timestamp) => {
  const date = new Date(timestamp * 1e3);
  const month = date.toLocaleDateString("zh-CN", { month: "short" });
  const day = date.getDate().toString().padStart(2, "0");
  return { month, day };
};
const formatDateTime = (timestamp) => {
  const date = new Date(timestamp * 1e3);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};
const BangumiBilibiliHeader = (props) => {
  const actorList = props.actors ? props.actors.split(/[,，、\s]+/).filter((actor) => actor.trim()) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden relative rounded-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex relative z-10 gap-25 p-25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-shrink-0 gap-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-4xl w-120 h-160", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.mainCover,
          alt: props.title,
          className: "object-cover w-full h-full select-text"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 items-center mt-15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              className: "w-28 h-28 rounded-full select-text",
              src: `https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`,
              alt: props.upInfo.uname
            }
          ),
          props.upInfo.avatar_subscript_url && /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              className: "absolute -right-1 -bottom-1 w-8 h-8 select-text",
              src: props.upInfo.avatar_subscript_url,
              alt: "头像角标"
            }
          ),
          props.upInfo.pendant?.image && /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              className: "absolute inset-0 w-full h-full transform select-text scale-160",
              src: props.upInfo.pendant.image,
              alt: props.upInfo.pendant.name || "挂件"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-4xl font-medium select-text",
                style: {
                  color: props.upInfo.vip_status === 1 ? props.upInfo.nickname_color || "#FB7299" : "#EDEDED"
                },
                children: props.upInfo.uname
              }
            ),
            props.upInfo.verify_type > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: props.upInfo.verify_type === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Shield,
              {
                size: 20,
                className: "text-warning"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Crown,
              {
                size: 20,
                className: "text-primary"
              }
            ) }),
            props.upInfo.vip_status === 1 && props.upInfo.vip_label?.text && /* @__PURE__ */ jsxRuntimeExports.jsx(
              chip_default,
              {
                size: "sm",
                className: "px-2 py-1 text-xs select-text",
                style: {
                  backgroundColor: props.upInfo.vip_label.bg_color || "#FB7299",
                  color: props.upInfo.vip_label.text_color || "#FFFFFF",
                  borderColor: props.upInfo.vip_label.border_color || "transparent"
                },
                children: props.upInfo.vip_label.text
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center text-3xl select-text text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 30 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              formatNumber$2(props.upInfo.follower),
              "粉丝"
            ] }),
            props.upInfo.is_follow === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              chip_default,
              {
                size: "sm",
                color: "primary",
                variant: "flat",
                className: "text-xs select-text",
                children: "已关注"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-2xl select-text text-foreground-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 20 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "UID: ",
              props.upInfo.mid
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex text-3xl select-text text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "提示：请在120秒内发送" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(code_default, { size: "lg", color: "danger", children: " 第 ？ 集 " }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "选择集数" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 justify-between text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 text-8xl font-bold leading-tight select-text", children: props.title }),
        props.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 text-4xl select-text text-foreground", children: props.subtitle }),
        props.styles && props.styles.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-8 mb-12", children: props.styles.map((style, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          chip_default,
          {
            radius: "sm",
            size: "lg",
            className: "px-4 py-2 text-3xl backdrop-blur-sm select-text text-foreground bg-content2",
            classNames: {
              base: "w-32 h-12"
            },
            children: style
          },
          index
        )) }),
        actorList.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 30 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "声优阵容" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-8", children: [
            actorList.slice(0, 6).map((actor, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl select-text text-foreground", children: actor }, index)),
            actorList.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl select-text text-foreground", children: [
              "等",
              actorList.length,
              "人"
            ] })
          ] })
        ] }),
        props.evaluate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center mb-6 text-3xl select-text text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 30 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "评价" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl leading-relaxed select-text text-foreground", children: props.evaluate })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items-center min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.views).slice(0, -1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.views).slice(-1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl whitespace-nowrap select-text", children: "播放" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items-center min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.favorites).slice(0, -1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.favorites).slice(-1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl whitespace-nowrap select-text", children: "收藏" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items-center min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.danmakus).slice(0, -1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.danmakus).slice(-1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl whitespace-nowrap select-text", children: "弹幕" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items-center min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.coins).slice(0, -1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold select-text text-foreground", children: formatNumber$2(props.stat.coins).slice(-1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl whitespace-nowrap select-text", children: "投币" })
        ] })
      ] })
    ] })
  ] }) });
};
const BangumiBilibiliEpisodes = (props) => {
  const sortedEpisodes = [...props.episodes].sort((a, b) => b.pub_time - a.pub_time);
  const groupedEpisodes = sortedEpisodes.reduce((groups, episode) => {
    const date = new Date(episode.pub_time * 1e3);
    const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
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
  if (flattenedEpisodes.length > 0) {
    flattenedEpisodes[flattenedEpisodes.length - 1].isLastOfAll = true;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-center mb-20 text-5xl font-bold select-text text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 46 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "剧集列表" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        chip_default,
        {
          size: "lg",
          color: "danger",
          variant: "flat",
          className: "px-4 py-2 text-4xl select-text",
          classNames: {
            base: "h-18"
          },
          children: [
            "共",
            sortedEpisodes.length,
            "集"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: flattenedEpisodes.map((item) => {
      const { episode, isFirstOfDate, isLastOfAll, episodesInSameDate, isLastOfDate } = item;
      const { month, day } = formatDateParts(episode.pub_time);
      const episodeNumber = sortedEpisodes.findIndex((e) => e.bvid === episode.bvid);
      const actualEpisodeNumber = sortedEpisodes.length - episodeNumber;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col flex-shrink-0 items-center w-20", children: isFirstOfDate ? (
          // 日期节点
          /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl select-text text-foreground", children: month }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center text-7xl font-bold select-text text-foreground", children: day }),
            !isLastOfAll && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(
              "mt-8 w-1 bg-divider",
              episodesInSameDate > 1 ? "h-110" : "h-95"
            ) })
          ] })
        ) : (
          // 普通节点
          /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-10 bg-divider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-2 w-4 h-4 rounded-full bg-divider" }),
            (!isLastOfAll || episodesInSameDate > 1) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clsx(
              "w-1 bg-divider",
              isLastOfDate ? "h-110" : "h-130"
            ) })
          ] })
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clsx(
          "flex-1 min-w-0",
          !isLastOfAll && isLastOfDate && "mb-20"
        ), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-shrink-0 gap-8 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                EnhancedImage,
                {
                  className: "w-32 h-32 rounded-full select-text",
                  src: `https://images.weserv.nl/?url=${encodeURIComponent(props.upInfo.avatar)}`,
                  alt: ""
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl font-bold select-text text-foreground-700", children: props.upInfo.uname }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center text-3xl select-text text-foreground-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 30 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "发布了内容" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 pr-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-5xl font-semibold select-text text-foreground-600", children: [
              "第",
              actualEpisodeNumber,
              "集"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden shadow-large bg-content1 rounded-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 p-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden relative h-64 rounded-3xl w-112", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                EnhancedImage,
                {
                  src: episode.cover,
                  alt: `第${actualEpisodeNumber}集 ${episode.long_title}`,
                  className: "object-cover w-full h-full select-text"
                }
              ),
              episode.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                chip_default,
                {
                  radius: "lg",
                  size: "lg",
                  className: "absolute top-3 right-3 py-1 text-2xl font-medium select-text",
                  style: {
                    backgroundColor: episode.badge_info?.bg_color || "#FB7299",
                    color: "#FFFFFF"
                  },
                  children: episode.badge_info?.text || episode.badge
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 justify-center h-64", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 text-5xl font-semibold select-text text-foreground line-clamp-2", children: episode.long_title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-4xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center select-text text-foreground-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 36 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: episode.bvid })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center select-text text-foreground-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 36 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: formatDateTime(episode.pub_time) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center select-text text-foreground-600", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 36 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: episode.link })
                ] })
              ] })
            ] })
          ] }) })
        ] })
      ] }, episode.bvid);
    }) })
  ] });
};
const BangumiBilibili = reactExports.memo((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BangumiBilibiliHeader,
      {
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
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BangumiBilibiliEpisodes,
      {
        episodes: props.data.Episodes,
        upInfo: props.data.UPInfo
      }
    )
  ] }) });
});
BangumiBilibili.displayName = "BangumiBilibili";
const bangumi = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BangumiBilibili,
  default: BangumiBilibili
}, Symbol.toStringTag, { value: "Module" }));
const BilibiliDynamicUserInfo = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center px-0 pb-0 pl-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.avatar_url,
          alt: "头像",
          className: "w-32 h-32 rounded-full shadow-medium",
          isCircular: true
        }
      ),
      props.frame && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.frame,
          alt: "头像框",
          className: "absolute inset-0 transform scale-180"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8 text-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl font-bold select-text text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 36, className: "text-time" }),
        props.create_time
      ] })
    ] }),
    props.decoration_card && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } }) })
  ] });
};
const BilibiliDynamicContent = (props) => {
  const getLayoutType = () => {
    if (!props.image_url || props.image_url.length === 0) return "auto";
    switch (props.imageLayout) {
      case "vertical":
        return "vertical";
      case "waterfall":
        return "waterfall";
      case "grid":
        return "grid";
      case "auto":
      default:
        if (props.image_url.length <= 4) return "vertical";
        if (props.image_url.length >= 9) return "grid";
        return "waterfall";
    }
  };
  const layoutType = getLayoutType();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-20 w-full leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-5xl tracking-wider break-words text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: clsx(
            "text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-foreground mb-[20px] select-text",
            "[&_svg]:inline [&_svg]:!mb-4",
            "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"
          ),
          content: props.text,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-15" })
    ] }),
    props.image_url && Array.isArray(props.image_url) && props.image_url.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-20", children: [
      layoutType === "grid" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 w-full", children: props.image_url.slice(0, 9).map((img, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl aspect-square shadow-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: img.image_src,
          alt: `图片${index + 1}`,
          className: "object-cover w-full h-full"
        }
      ) }, index)) }),
      layoutType === "waterfall" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col flex-1 gap-4", children: props.image_url.filter((_, index) => index % 2 === 0).map((img, arrayIndex) => {
          const originalIndex = arrayIndex * 2;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl shadow-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: img.image_src,
              alt: `图片${originalIndex + 1}`,
              className: "object-cover w-full h-auto"
            }
          ) }, originalIndex);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col flex-1 gap-4", children: props.image_url.filter((_, index) => index % 2 === 1).map((img, arrayIndex) => {
          const originalIndex = arrayIndex * 2 + 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl shadow-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: img.image_src,
              alt: `图片${originalIndex + 1}`,
              className: "object-cover w-full h-auto"
            }
          ) }, originalIndex);
        }) })
      ] }),
      layoutType === "vertical" && props.image_url.map((img, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnhancedImage,
          {
            src: img.image_src,
            alt: "封面",
            className: "object-contain w-full h-full rounded-3xl"
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" })
      ] }, index)),
      (layoutType === "waterfall" || layoutType === "grid") && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" })
    ] })
  ] });
};
const BilibiliDynamicStatus = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-10 px-20 w-full leading-relaxed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48, className: "text-like" }),
        props.dianzan,
        "点赞"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48, className: "text-primary text-comment" }),
        props.pinglun,
        "评论"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48, className: "text-success" }),
        props.share,
        "分享"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 48, className: "text-time" }),
      "图片生成时间: ",
      props.render_time
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" })
  ] });
};
const BilibiliDynamicFooter = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-auto pt-25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col self-start pl-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center text-6xl text-foreground-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili-light.png",
          alt: "B站Logo",
          className: "h-auto w-120"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl select-text text-foreground-600", children: "长按识别二维码即可查看全文" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider select-text text-foreground-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 36, className: "text-foreground-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "UID: ",
            props.user_shortid
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 36, className: "text-like" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "获赞: ",
            props.total_favorited
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 36, className: "text-view" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "关注: ",
            props.following_count
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 36, className: "text-follow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "粉丝: ",
            props.fans
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right select-text text-foreground-600", children: props.dynamicTYPE }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-divider", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: props.qrCodeDataUrl,
          alt: "二维码",
          className: "h-auto w-88"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-content2 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground-400", children: "二维码" }) }) })
    ] })
  ] }) });
};
const BilibiliDrawDynamic = reactExports.memo((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-25" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliDynamicUserInfo,
      {
        avatar_url: props.data.avatar_url,
        frame: props.data.frame,
        username: props.data.username,
        create_time: props.data.create_time,
        decoration_card: props.data.decoration_card
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-15" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliDynamicContent,
      {
        text: props.data.text,
        image_url: props.data.image_url,
        imageLayout: props.data.imageLayout
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliDynamicStatus,
      {
        dianzan: props.data.dianzan,
        pinglun: props.data.pinglun,
        share: props.data.share,
        render_time: props.data.render_time
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-23" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliDynamicFooter,
      {
        user_shortid: props.data.user_shortid,
        total_favorited: props.data.total_favorited,
        following_count: props.data.following_count,
        fans: props.data.fans,
        dynamicTYPE: props.data.dynamicTYPE,
        share_url: props.data.share_url,
        qrCodeDataUrl: props.qrCodeDataUrl
      }
    )
  ] }) });
});
BilibiliDrawDynamic.displayName = "BilibiliDrawDynamic";
const DYNAMIC_TYPE_DRAW = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliDrawDynamic
}, Symbol.toStringTag, { value: "Module" }));
const BilibiliVideoDynamicHeader = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center pl-20 text-6xl text-default-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili.png",
          alt: "bilibili",
          className: "h-auto w-120"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-8 text-5xl select-text", children: "你感兴趣的视频都在哔哩哔哩" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20" })
  ] });
};
const BilibiliVideoDynamicContent = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    props.image_url && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnhancedImage,
          {
            src: props.image_url,
            alt: "封面",
            className: "object-contain w-full h-full rounded-3xl"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex absolute bottom-12 right-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "/image/bilibili/play.svg",
            alt: "播放图标",
            className: "w-40 h-40"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full leading-relaxed px-21", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: "text-[80px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
          content: props.text,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl text-default-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: "text-[60px] leading-[1.5] whitespace-pre-wrap text-default-500 select-text",
          content: props.desc,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-15 text-default-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 items-center text-5xl font-light tracking-normal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48, className: "text-like" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
                props.dianzan,
                "点赞"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48, className: "text-comment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
                props.pinglun,
                "评论"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48, className: "text-success" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
                props.share,
                "分享"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 items-center text-5xl font-light tracking-normal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { size: 48, className: "text-warning" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
                props.coin,
                "硬币"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 48, className: "text-default-400 text-view" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
                props.view,
                "浏览"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center text-5xl font-light tracking-normal", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 48, className: "text-time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
                "视频时长: ",
                props.duration_text
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 text-4xl font-light", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center whitespace-nowrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32, className: "text-time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
              "发布于",
              props.create_time
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 32, className: "text-default-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
              "动态ID: ",
              props.dynamic_id
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40" })
    ] })
  ] });
};
const BilibiliVideoDynamicFooter = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-25" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500", children: [
      "哔哩哔哩",
      props.dynamicTYPE
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-auto pt-25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center pl-12", style: { padding: "0 0 0 50px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EnhancedImage,
              {
                src: props.avatar_url,
                alt: "头像",
                className: "rounded-full shadow-medium w-50 h-50",
                isCircular: true
              }
            ),
            props.frame && /* @__PURE__ */ jsxRuntimeExports.jsx(
              EnhancedImage,
              {
                src: props.frame,
                alt: "头像框",
                className: "absolute inset-0 transform scale-180"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl font-bold select-text text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 items-start pt-10 w-full text-4xl tracking-wider text-default-600", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 32, className: "text-default-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
              "UID: ",
              props.user_shortid
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 32, className: "text-like" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
              "获赞: ",
              props.total_favorited
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 32, className: "text-default-400 text-view" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
              "关注: ",
              props.following_count
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
              "粉丝: ",
              props.fans
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right select-text text-default-600", children: "动态分享链接" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-300", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: props.qrCodeDataUrl,
            alt: "二维码",
            className: "h-auto w-88"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-default-100 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-default-400", children: "二维码" }) }) })
      ] })
    ] }) })
  ] });
};
const BilibiliVideoDynamic = reactExports.memo((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BilibiliVideoDynamicHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliVideoDynamicContent,
      {
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
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliVideoDynamicFooter,
      {
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
      }
    )
  ] }) });
});
BilibiliVideoDynamic.displayName = "BilibiliVideoDynamic";
const DYNAMIC_TYPE_AV = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliVideoDynamic
}, Symbol.toStringTag, { value: "Module" }));
const BilibiliForwardUserInfo = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center px-0 pb-0 pl-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.avatar_url,
          alt: "头像",
          className: "w-36 h-36 rounded-full shadow-medium",
          isCircular: true
        }
      ),
      props.frame && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.frame,
          alt: "头像框",
          className: "absolute inset-0 transform scale-180"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8 text-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl font-bold select-text text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 36, className: "text-time" }),
        props.create_time
      ] })
    ] }),
    props.decoration_card && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } }) })
  ] });
};
const OriginalUserInfo = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center pt-5 pb-10 pl-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.avatar_url,
          alt: "转发用户头像",
          className: "rounded-full shadow-medium w-30 h-30"
        }
      ),
      props.frame && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.frame,
          alt: "转发用户头像框",
          className: "absolute inset-0 transform scale-180"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 text-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-normal select-text text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32, className: "text-time" }),
        props.create_time
      ] })
    ] }),
    props.decoration_card && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-39", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } }) })
  ] });
};
const OriginalAVContent = ({ content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-content1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OriginalUserInfo,
      {
        avatar_url: content.avatar_url,
        frame: content.frame,
        username: content.username,
        create_time: content.create_time,
        decoration_card: content.decoration_card
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center py-11", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex overflow-hidden relative flex-col items-center w-11/12 rounded-2xl rounded-10 aspect-video shadow-large", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: content.cover,
          alt: "视频封面",
          className: "object-cover object-center absolute"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-5 left-12 bottom-14 z-10 text-4xl font-light text-white select-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 mr-3 text-4xl text-white rounded-2xl bg-black/50", children: content.duration_text }),
        content.play,
        "观看   ",
        content.danmaku,
        "弹幕"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-10 pl-8 text-6xl font-bold select-text leading-20 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: content.title } }) })
  ] });
};
const OriginalDrawContent = ({ content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-content1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OriginalUserInfo,
      {
        avatar_url: content.avatar_url,
        frame: content.frame,
        username: content.username,
        create_time: content.create_time,
        decoration_card: content.decoration_card
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl leading-relaxed text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentText,
      {
        className: clsx(
          "text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
          "[&_svg]:inline [&_svg]:!mb-4"
        ),
        content: content.text,
        style: {
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }
    ) }) }),
    content.image_url && content.image_url.length === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden flex-col items-center w-11/12 rounded-6 shadow-large", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EnhancedImage,
      {
        src: content.image_url[0].image_src,
        alt: "图片",
        className: "object-cover w-full h-full rounded-6"
      }
    ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 p-4", children: content.image_url?.map((img, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden relative shadow-medium aspect-square rounded-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EnhancedImage,
      {
        src: img.image_src,
        alt: `图片${index + 1}`,
        className: "object-cover absolute top-0 left-0 w-full h-full"
      }
    ) }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
  ] });
};
const OriginalWordContent = ({ content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-content1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OriginalUserInfo,
      {
        avatar_url: content.avatar_url,
        frame: content.frame,
        username: content.username,
        create_time: content.create_time,
        decoration_card: content.decoration_card
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl leading-relaxed text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentText,
      {
        className: "text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
        content: content.text
      }
    ) }) })
  ] });
};
const OriginalLiveRcmdContent = ({ content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-content1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OriginalUserInfo,
      {
        avatar_url: content.avatar_url,
        frame: content.frame,
        username: content.username,
        create_time: content.create_time,
        decoration_card: content.decoration_card
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center py-11", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex overflow-hidden relative flex-col items-center w-full rounded-10 aspect-video shadow-large", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: content.cover,
          alt: "直播封面",
          className: "object-cover absolute w-full h-full"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-5 bottom-8 left-12 z-10 text-4xl font-light text-white select-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 mr-3 text-4xl text-white bg-black/50 rounded-3", children: content.area_name }),
        content.text_large,
        "   在线: ",
        content.online
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-8 text-6xl font-bold select-text text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: content.title } }) })
  ] });
};
const BilibiliForwardContent = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-20 w-full leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-5xl tracking-wider break-words text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: clsx(
            "text-[65px] tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground mb-[20px] select-text",
            "[&_svg]:inline [&_svg]:!mb-4",
            "[&_img]:mb-3 [&_img]:inline [&_img]:mx-1"
          ),
          content: props.text,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-15" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex px-20", children: [
      props.original_content.DYNAMIC_TYPE_AV && /* @__PURE__ */ jsxRuntimeExports.jsx(OriginalAVContent, { content: props.original_content.DYNAMIC_TYPE_AV }),
      props.original_content.DYNAMIC_TYPE_DRAW && /* @__PURE__ */ jsxRuntimeExports.jsx(OriginalDrawContent, { content: props.original_content.DYNAMIC_TYPE_DRAW }),
      props.original_content.DYNAMIC_TYPE_WORD && /* @__PURE__ */ jsxRuntimeExports.jsx(OriginalWordContent, { content: props.original_content.DYNAMIC_TYPE_WORD }),
      props.original_content.DYNAMIC_TYPE_LIVE_RCMD && /* @__PURE__ */ jsxRuntimeExports.jsx(OriginalLiveRcmdContent, { content: props.original_content.DYNAMIC_TYPE_LIVE_RCMD })
    ] })
  ] });
};
const BilibiliForwardStatus = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-10 px-20 w-full leading-relaxed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center text-5xl font-light tracking-normal select-text text-foreground-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48, className: "text-like" }),
        props.dianzan,
        "点赞"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48, className: "text-primary text-comment" }),
        props.pinglun,
        "评论"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48, className: "text-success" }),
        props.share,
        "分享"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-5xl font-light tracking-normal select-text text-foreground-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 48, className: "text-time" }),
      "图片生成时间: ",
      props.render_time
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" })
  ] });
};
const BilibiliForwardFooter = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-auto pt-25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col self-start pl-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center text-6xl text-foreground-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili-light.png",
          alt: "B站Logo",
          className: "w-80 h-auto"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl select-text text-foreground-600", children: "长按识别二维码即可查看全文" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider select-text text-foreground-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 36, className: "text-foreground-600" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "UID: ",
            props.user_shortid
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 36, className: "text-like" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "获赞: ",
            props.total_favorited
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 36, className: "text-view" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "关注: ",
            props.following_count
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 36, className: "text-follow" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "粉丝: ",
            props.fans
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right select-text text-foreground-600", children: props.dynamicTYPE }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-divider", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: props.qrCodeDataUrl,
          alt: "二维码",
          className: "h-auto w-88"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-content2 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground-400", children: "二维码" }) }) })
    ] })
  ] }) });
};
const BilibiliForwardDynamic = reactExports.memo((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-15" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliForwardUserInfo,
      {
        avatar_url: props.data.avatar_url,
        frame: props.data.frame,
        username: props.data.username,
        create_time: props.data.create_time,
        decoration_card: props.data.decoration_card
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-15" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliForwardContent,
      {
        text: props.data.text,
        original_content: props.data.original_content
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-25" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliForwardStatus,
      {
        dianzan: props.data.dianzan,
        pinglun: props.data.pinglun,
        share: props.data.share,
        render_time: props.data.render_time
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-23" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliForwardFooter,
      {
        user_shortid: props.data.user_shortid,
        total_favorited: props.data.total_favorited,
        following_count: props.data.following_count,
        fans: props.data.fans,
        dynamicTYPE: props.data.dynamicTYPE,
        share_url: props.data.share_url,
        qrCodeDataUrl: props.qrCodeDataUrl
      }
    )
  ] }) });
});
BilibiliForwardDynamic.displayName = "BilibiliForwardDynamic";
const DYNAMIC_TYPE_FORWARD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliForwardDynamic
}, Symbol.toStringTag, { value: "Module" }));
const BilibiliLiveDynamicHeader = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start text-6xl text-default-600", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili-light.png",
          alt: "哔哩哔哩",
          className: "h-auto w-120"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pt-10 text-6xl select-text", children: "你感兴趣的视频都在B站" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5" })
  ] });
};
const BilibiliLiveDynamicContent = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-15" }),
    props.image_url && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden relative flex-col flex-1 items-center w-11/12 rounded-3xl shadow-large", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.image_url,
          alt: "封面",
          className: "object-contain w-full h-full rounded-3xl"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full leading-relaxed px-15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-8xl font-bold tracking-wider break-words text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: "text-[65px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-foreground select-text",
          content: props.text,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-5xl tracking-normal text-default-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 48, className: "text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "select-text", children: props.liveinf })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl tracking-normal text-default-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32, className: "text-time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
          "直播开始时间: ",
          props.create_time
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-25" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: props.avatar_url,
              alt: "头像",
              className: "w-32 h-32 rounded-full shadow-medium",
              isCircular: true
            }
          ),
          props.frame && /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: props.frame,
              alt: "头像框",
              className: "absolute inset-0 transform scale-160"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl font-bold select-text text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentText, { content: props.username }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "w-32 h-auto", src: "/image/bilibili/直播中.png", alt: "直播中" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl text-default-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32, className: "text-follow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "select-text", children: [
              props.fans,
              "粉丝"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-50" })
    ] })
  ] });
};
const BilibiliLiveDynamicFooter = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-0 mr-20 -mb-11 text-7xl text-right select-text text-default-500", children: [
      "哔哩哔哩",
      props.dynamicTYPE
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-auto pt-25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center pl-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BilibiliLiveDynamicHeader, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right select-text text-default-500", children: "动态分享链接" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-300", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: props.qrCodeDataUrl,
            alt: "二维码",
            className: "h-auto w-88"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-default-100 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-default-400", children: "二维码" }) }) })
      ] })
    ] }) })
  ] });
};
const BilibiliLiveDynamic = reactExports.memo((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliLiveDynamicContent,
      {
        image_url: props.data.image_url,
        text: props.data.text,
        liveinf: props.data.liveinf,
        create_time: props.data.create_time,
        username: props.data.username,
        avatar_url: props.data.avatar_url,
        frame: props.data.frame,
        fans: props.data.fans
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BilibiliLiveDynamicFooter,
      {
        avatar_url: props.data.avatar_url,
        frame: props.data.frame,
        username: props.data.username,
        fans: props.data.fans,
        dynamicTYPE: props.data.dynamicTYPE,
        share_url: props.data.share_url,
        qrCodeDataUrl: props.qrCodeDataUrl
      }
    )
  ] }) });
});
BilibiliLiveDynamic.displayName = "BilibiliLiveDynamic";
const DYNAMIC_TYPE_LIVE_RCMD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliLiveDynamic
}, Symbol.toStringTag, { value: "Module" }));
const formatNumber$1 = (num) => {
  if (num >= 1e4) {
    return `${(num / 1e4).toFixed(1)}万`;
  }
  return num.toLocaleString();
};
const formatDate$1 = (timestamp) => {
  return new Date(timestamp * 1e3).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
const StatItem$1 = reactExports.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: iconColor, children: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground-900", children: formatNumber$1(value) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground-500", children: label })
] }));
StatItem$1.displayName = "StatItem";
const BilibiliVideoInfo = reactExports.memo(
  (props) => {
    const formattedDate = reactExports.useMemo(() => formatDate$1(props.data.ctime), [props.data.ctime]);
    const statsData = reactExports.useMemo(
      () => [
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 48 }), value: props.data.stat.view, label: "播放", iconColor: "text-view" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48 }), value: props.data.stat.like, label: "点赞", iconColor: "text-like" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48 }), value: props.data.stat.reply, label: "评论", iconColor: "text-comment" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 48 }), value: props.data.stat.favorite, label: "收藏", iconColor: "text-yellow-500" }
      ],
      [props.data.stat]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden relative aspect-video", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnhancedImage,
          {
            src: props.data.pic,
            alt: props.data.title,
            className: "object-cover w-full h-full",
            placeholder: "视频封面"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-20 pb-36", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-8 text-7xl font-bold leading-tight text-foreground-900", children: props.data.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-5xl leading-normal whitespace-pre-wrap text-foreground-700", children: props.data.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-4xl text-foreground-500", children: formattedDate })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 text-5xl gap-18", children: statsData.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatItem$1,
          {
            icon: stat.icon,
            value: stat.value,
            label: stat.label,
            iconColor: stat.iconColor
          },
          index
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8 text-5xl text-foreground-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-16 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: props.data.stat.coin })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: props.data.stat.share })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transform-gpu scale-[2.5] origin-right mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(chip_default, { color: "warning", variant: "flat", size: "lg", radius: "sm", children: [
            "稿件BV号：",
            props.data.bvid
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 bg-default-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-16 py-12 pb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: props.data.owner.face,
              alt: props.data.owner.name,
              className: "object-cover w-48 h-48 rounded-full",
              placeholder: props.data.owner.name.charAt(0),
              isCircular: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl font-semibold text-foreground-900", children: props.data.owner.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-5xl text-foreground-500", children: [
              "ID: ",
              props.data.owner.mid
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transform-gpu scale-[3.5] origin-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(button_default, { size: "sm", className: "bg-[#FF6699] text-default-100 dark:text-default-900", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-1 w-4 h-4" }),
          "观看"
        ] }) })
      ] })
    ] }) }) });
  }
);
BilibiliVideoInfo.displayName = "BilibiliVideoInfo";
const videoInfo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliVideoInfo
}, Symbol.toStringTag, { value: "Module" }));
const BilibiliQrcodeImg = reactExports.memo((props) => {
  const { data, qrCodeDataUrl } = props;
  const { share_url } = data;
  const disclaimer = [
    "免责声明:",
    "您将通过扫码完成获取哔哩哔哩网页端的用户登录凭证（ck），该ck将用于请求哔哩哔哩WEB API接口。",
    "本BOT不会上传任何有关你的信息到第三方，所配置的 ck 只会用于请求官方 API 接口。",
    "我方仅提供视频解析及相关哔哩哔哩内容服务,若您的账号封禁、被盗等处罚与我方无关。",
    "害怕风险请勿扫码 ~"
  ].join("\n");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 px-12 pt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 items-center text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-12 h-12 text-foreground-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-6xl font-bold text-foreground", children: "B站扫码登录" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center text-3xl text-default-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "请在120秒内通过哔哩哔哩APP扫码进行登录" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex overflow-hidden flex-col justify-center items-center p-12", children: [
      qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center w-120 h-120", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: qrCodeDataUrl,
          alt: "登录二维码",
          className: "object-contain w-full h-full"
        }
      ) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 justify-center items-center w-120 h-120", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-16 h-16 text-default-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl text-default-500", children: "未提供二维码图片" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-medium text-foreground-600", children: "链接（share_url）" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-auto p-6 mt-3 text-2xl leading-relaxed whitespace-pre-wrap break-all rounded-2xl select-text bg-content2 text-foreground-700", children: share_url })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 rounded-3xl border-2 shadow-lg bg-warning-50 border-warning-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex gap-4 items-center mb-6 text-4xl font-semibold text-warning-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-warning-600" }),
        "注意事项与免责声明"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: disclaimer.split("\n").map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `text-2xl leading-relaxed ${index === 0 ? "font-semibold text-warning-700" : "text-foreground-600"}`,
          children: line
        },
        index
      )) })
    ] })
  ] }) });
});
BilibiliQrcodeImg.displayName = "BilibiliQrcodeImg";
const qrcodeImg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliQrcodeImg
}, Symbol.toStringTag, { value: "Module" }));
const KuaishouQRCodeSection = ({
  qrCodeDataUrl,
  type,
  imageLength
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center -mr-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 flex items-center justify-center w-[600px] h-[600px] bg-content1 rounded-lg shadow-medium", children: qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCodeDataUrl, alt: "二维码", className: "object-contain w-full h-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-center text-default-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 80, className: "mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "二维码生成失败" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-[45px] text-center text-foreground", children: type === "视频" ? "视频直链(永久)" : type === "图集" ? `图集分享链接 共${imageLength}张` : "分享链接" })
  ] });
};
const KuaishouVideoInfoHeader = ({
  type,
  commentLength,
  videoSize,
  likeCount,
  viewCount,
  imageLength
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex flex-col -ml-11", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/image/kuaishou/logo.png",
        alt: "快手Logo",
        className: "w-[650px] h-auto",
        onError: (e) => {
          const target = e.target;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = '<div class="flex justify-center items-center h-full text-2xl font-bold text-foreground">快手</div>';
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left", children: [
        "评论数量：",
        commentLength,
        "条"
      ] }),
      type === "视频" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left", children: [
          "视频大小：",
          videoSize,
          "MB"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left", children: [
          "点赞数量：",
          likeCount
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left", children: [
          "观看次数：",
          viewCount
        ] })
      ] }),
      type === "图集" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left", children: [
        "图片数量：",
        imageLength,
        "张"
      ] })
    ] })
  ] }) });
};
const KuaishouCommentItemComponent = ({ comment, isLast = false }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex px-10 pt-10 ${isLast ? "pb-0" : "pb-10"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: comment.userimageurl,
        className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
        alt: "用户头像"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: comment.nickname }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] select-text",
          dangerouslySetInnerHTML: { __html: comment.text },
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ),
      (comment.commentimage || comment.sticker) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          className: "object-contain w-full h-full rounded-2xl",
          src: comment.commentimage || comment.sticker,
          alt: "评论图片"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-6 text-default-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px] select-text", children: comment.create_time }),
          comment.ip_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px] select-text", children: comment.ip_label }),
          comment.reply_comment_total && comment.reply_comment_total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[40px] text-foreground-600", children: [
            "共",
            comment.reply_comment_total,
            "条回复"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[40px] text-default-600", children: "回复" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer hover:text-danger", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 60, className: "stroke-current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[50px] select-text", children: comment.digg_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center transition-colors cursor-pointer hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 60, className: "stroke-current" }) })
        ] })
      ] })
    ] })
  ] });
};
const KuaishouComment = reactExports.memo((props) => {
  const processedData = reactExports.useMemo(() => {
    if (!props.data) {
      return {
        commentsArray: [],
        type: "未知",
        commentLength: 0,
        videoSize: void 0,
        likeCount: void 0,
        viewCount: void 0,
        imageLength: void 0,
        useDarkTheme: false
      };
    }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KuaishouVideoInfoHeader,
        {
          type: processedData.type,
          commentLength: processedData.commentLength,
          videoSize: processedData.videoSize,
          likeCount: processedData.likeCount,
          viewCount: processedData.viewCount,
          imageLength: processedData.imageLength,
          useDarkTheme: processedData.useDarkTheme
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        KuaishouQRCodeSection,
        {
          qrCodeDataUrl: props.qrCodeDataUrl || "",
          type: processedData.type,
          imageLength: processedData.imageLength,
          useDarkTheme: processedData.useDarkTheme
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto mx-auto max-w-full", children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      KuaishouCommentItemComponent,
      {
        comment,
        isLast: index === processedData.commentsArray.length - 1
      },
      index
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-20 text-default-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 64, className: "mx-auto mb-4 text-default-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl", children: "暂无评论数据" })
    ] }) }) })
  ] }) });
});
const Comment$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  KuaishouComment
}, Symbol.toStringTag, { value: "Module" }));
const formatNumber = (num) => {
  const numValue = typeof num === "string" ? parseInt(num, 10) : num;
  if (numValue >= 1e4) {
    return `${(numValue / 1e4).toFixed(1)}万`;
  }
  return numValue.toLocaleString();
};
const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
const StatItem = reactExports.memo(({ icon, value, label, iconColor = "text-foreground-500" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: iconColor, children: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground-900", children: formatNumber(value) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground-500", children: label })
] }));
StatItem.displayName = "StatItem";
const XiaohongshuNoteInfo = reactExports.memo(
  (props) => {
    const formattedDate = reactExports.useMemo(() => formatDate(props.data.time), [props.data.time]);
    const statsData = reactExports.useMemo(
      () => [
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48 }), value: props.data.statistics.liked_count, label: "点赞", iconColor: "text-red-500" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48 }), value: props.data.statistics.comment_count, label: "评论", iconColor: "text-blue-500" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 48 }), value: props.data.statistics.collected_count, label: "收藏", iconColor: "text-yellow-500" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48 }), value: props.data.statistics.share_count, label: "分享", iconColor: "text-green-500" }
      ],
      [props.data.statistics]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: props.data.image_url,
            alt: props.data.desc,
            className: "object-cover w-full h-full"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t to-transparent from-black/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-20 pb-36", children: [
        props.data.title && /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-7xl font-bold leading-tight text-foreground-900", children: props.data.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "text-5xl text-foreground-700 leading-relaxed mb-8 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
            dangerouslySetInnerHTML: { __html: props.data.desc }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-center text-5xl text-foreground-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formattedDate })
          ] }),
          props.data.ip_location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: props.data.ip_location })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 text-5xl gap-18", children: statsData.map((stat, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatItem,
          {
            icon: stat.icon,
            value: stat.value,
            label: stat.label,
            iconColor: stat.iconColor
          },
          index
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-8 text-5xl text-foreground-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-16 items-center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transform-gpu scale-[2.5] origin-right mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(chip_default, { color: "danger", variant: "flat", size: "lg", radius: "sm", children: [
            "笔记ID：",
            props.data.note_id
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-0.5 bg-default-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-16 py-12 pb-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: props.data.author.avatar,
              alt: props.data.author.nickname,
              className: "object-cover w-48 h-48 rounded-full border-red-200 border-3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-6xl font-semibold text-foreground-900", children: props.data.author.nickname }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-5xl text-foreground-500", children: [
              "用户ID: ",
              props.data.author.user_id.slice(0, 8),
              "..."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "transform-gpu scale-[3.5] origin-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          button_default,
          {
            size: "sm",
            className: "text-white bg-[#FF2442]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "mr-1 w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "查看原文" })
            ] })
          }
        ) })
      ] })
    ] }) }) });
  }
);
XiaohongshuNoteInfo.displayName = "XiaohongshuNoteInfo";
const noteInfo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  XiaohongshuNoteInfo
}, Symbol.toStringTag, { value: "Module" }));
const QRCodeSection$1 = ({
  qrCodeDataUrl
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-center p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex overflow-hidden justify-center items-center bg-white w-110 h-110", children: qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "object-contain"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 200, className: "text-foreground-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-[40px] text-foreground-500 text-center", children: "扫码查看原笔记" })
  ] });
};
const NoteInfoHeader = ({
  type,
  commentLength,
  imageLength,
  qrCodeDataUrl
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center max-w-[1200px] mx-auto p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/xiaohongshu/logo.png",
          alt: "小红书Logo",
          className: "object-contain mb-20 max-w-full max-h-full scale-180 ml-15",
          onError: (e) => {
            const target = e.target;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<div class="flex justify-start items-center h-full text-2xl font-bold text-foreground-600">小红书</div>';
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4 text-left text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tracking-[6px] text-[45px] select-text", children: [
          "笔记类型：",
          type
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tracking-[6px] text-[45px] select-text", children: [
          "评论数量：",
          commentLength,
          "条"
        ] }),
        type === "图文" && imageLength && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tracking-[6px] text-[45px] select-text", children: [
          "图片数量：",
          imageLength,
          "张"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QRCodeSection$1,
      {
        qrCodeDataUrl
      }
    )
  ] });
};
const CommentItemComponent = ({ comment, isLast = false }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex px-10 pt-15 ${isLast ? "pb-0" : "pb-15"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: comment.user_info.image,
        className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
        alt: "用户头像"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12.5 text-[50px] text-foreground-600 relative flex items-center select-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: comment.user_info.nickname }),
        comment.show_tags && comment.show_tags.length > 0 && comment.show_tags.map((tag, index) => {
          if (tag === "is_author") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-6 py-3 ml-3 text-4xl rounded-full bg-default-100 text-default-500", children: "作者" }, index);
          } else if (tag === "user_top") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-6 py-3 rounded-full ml-3 text-4xl bg-[#ff2e4d0f] text-[#ff2e4d]", children: "置顶评论" }, index);
          } else {
            return null;
          }
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-[60px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap select-text [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em] [&_span]:inline",
          dangerouslySetInnerHTML: { __html: comment.content },
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ),
      comment.pictures && comment.pictures.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex my-5 overflow-hidden shadow-md rounded-2xl w-[95%] flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          className: "object-contain w-full h-full rounded-2xl",
          src: comment.pictures[0].url_default,
          alt: "评论图片"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-6 text-foreground-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6 select-text", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.create_time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.ip_location }),
          parseInt(comment.sub_comment_count) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[40px] text-foreground-600", children: [
            "共",
            comment.sub_comment_count,
            "条回复"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[40px] text-foreground-600", children: "回复" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 60, className: comment.liked ? "text-red-500 fill-current" : "text-foreground-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[50px] select-text", children: comment.like_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 60, className: "stroke-current text-foreground-500" }) })
        ] })
      ] }),
      comment.sub_comments && comment.sub_comments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-6 mt-6", children: comment.sub_comments.map((subComment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `py-4 ${index !== comment.sub_comments.length - 1 ? "border-b border-divider" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: subComment.user_info.image,
            className: "object-cover mr-8 w-32 h-32 rounded-full",
            alt: "用户头像"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-2 space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[40px] font-medium text-foreground-600", children: subComment.user_info.nickname }),
            subComment.show_tags && subComment.show_tags.length > 0 && subComment.show_tags.map((tag, tagIndex) => tag === "is_author" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-5 py-2 ml-2 text-3xl rounded-full bg-default-100 text-default-500", children: "作者" }, tagIndex) : null)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-[45px] text-foreground leading-relaxed mb-2 select-text [&_img]:mb-2 [&_img]:inline [&_img]:h-[1.2em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.5em] [&_span]:inline",
              dangerouslySetInnerHTML: { __html: subComment.content },
              style: {
                wordBreak: "break-word",
                overflowWrap: "break-word"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-foreground-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[35px]", children: subComment.create_time }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[35px]", children: subComment.ip_location })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 40, className: subComment.liked ? "text-red-500 fill-current" : "text-foreground-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[35px]", children: subComment.like_count })
            ] })
          ] })
        ] })
      ] }) }, subComment.id)) })
    ] })
  ] });
};
const XiaohongshuComment = reactExports.memo((props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DefaultLayout, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NoteInfoHeader,
      {
        type: props.data.Type,
        commentLength: props.data.CommentLength,
        imageLength: props.data.ImageLength,
        qrCodeDataUrl: props.qrCodeDataUrl
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto mx-20 max-w-full", children: props.data.CommentsData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-divider", children: props.data.CommentsData.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItemComponent,
      {
        comment,
        isLast: index === props.data.CommentsData.length - 1
      },
      comment.id
    )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[60px] text-foreground-400", children: "暂无评论" }) }) })
  ] });
});
const Comment = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  XiaohongshuComment
}, Symbol.toStringTag, { value: "Module" }));
const menuData = [
  {
    title: "常用功能",
    items: [
      {
        title: "「#解析」「#kkk解析」",
        description: "在解析功能关闭的情况下，可对引用消息进行解析"
      }
    ]
  },
  {
    title: "推送相关",
    items: [
      {
        title: "#抖音/B站全部?强制推送",
        description: "全部强制推送：手动模拟一次定时任务；\n强制推送：只在触发群模拟一次定时任务；\n已推送过的不会再推送"
      },
      {
        title: "#kkk设置推送机器人 + Bot ID",
        description: "一键更换推送机器人"
      },
      {
        title: "#抖音/B站推送列表",
        description: "查看当前群的订阅推送列表"
      }
    ],
    subGroups: [
      {
        title: "在群聊中再发送一次即可取消订阅",
        items: [
          {
            title: "#设置抖音推送 + 抖音号",
            description: "在群聊中发送以对该群订阅该博主的作品更新"
          },
          {
            title: "#设置B站推送 + UP主UID",
            description: "在群聊中发送以对该群订阅该博主的作品更新"
          }
        ]
      }
    ]
  },
  {
    title: "其他",
    items: [
      {
        title: "#抖音登录",
        description: "使用抖音APP扫码登录获取 Cookies"
      },
      {
        title: "#B站登录",
        description: "使用哔哩哔哩APP扫码登录获取 Cookies"
      },
      {
        title: "「#kkk更新日志」「#kkk更新」「#kkk更新预览版」",
        description: "字面意思~"
      }
    ]
  }
];
const MenuItemComponent = ({ item }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center font-bold cursor-pointer rounded-[26px] p-5 text-[34px] text-foreground bg-content3 transition-colors select-text", children: item.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex text-[27px] mx-[15px] my-[10px] mb-5 text-foreground-600 select-text", children: item.description.split("\\n").map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      line,
      index < item.description.split("\\n").length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
    ] }, index)) })
  ] });
};
const MenuGroupComponent = ({ group, useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-around p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-[0_0_88%] p-[45px] rounded-[70px_15px_70px_15px] shadow-large bg-content1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[50px] m-0 mb-[15px] text-foreground", children: group.title }),
    group.subGroups?.map((subGroup, subIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-[60px] rounded-[70px_15px_70px_15px] shadow-medium mb-[45px] bg-content2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[xx-large] m-0 mb-[25px] text-foreground", children: subGroup.title }),
      subGroup.items.map((item, itemIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuItemComponent,
        {
          item,
          useDarkTheme
        },
        itemIndex
      ))
    ] }, subIndex)),
    group.items.map((item, itemIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuItemComponent,
      {
        item,
        useDarkTheme
      },
      itemIndex
    ))
  ] }) });
};
const Help = reactExports.memo((props) => {
  const useDarkTheme = props.data?.useDarkTheme || false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DefaultLayout, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[100px]" }),
    " ",
    menuData.map((group, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MenuGroupComponent,
      {
        group,
        useDarkTheme
      },
      index
    ))
  ] });
});
Help.displayName = "Help";
const Help$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Help
}, Symbol.toStringTag, { value: "Module" }));
const PLATFORM_CONFIG = {
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
const parseAnsiColors = (text) => {
  const colorMap = {
    "30": "text-foreground",
    // 黑色 - 使用主题前景色
    "31": "text-danger",
    // 红色
    "32": "text-success",
    // 绿色
    "33": "text-warning",
    // 黄色
    "34": "text-primary",
    // 蓝色
    "35": "text-secondary",
    // 紫色
    "36": "text-primary-400",
    // 青色
    "37": "text-default-300",
    // 白色
    "90": "text-default-400",
    // 亮黑色（灰色）
    "91": "text-danger-400",
    // 亮红色
    "92": "text-success-400",
    // 亮绿色
    "93": "text-warning-400",
    // 亮黄色
    "94": "text-primary-400",
    // 亮蓝色
    "95": "text-secondary-400",
    // 亮紫色
    "96": "text-primary-300",
    // 亮青色
    "97": "text-default-100"
    // 亮白色
  };
  const ansiRegex = /\u001b\[(\d+)m/g;
  const parts = [];
  let lastIndex = 0;
  let currentColor = "";
  let match;
  while ((match = ansiRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const textPart = text.slice(lastIndex, match.index);
      const formattedText = textPart.replace(/\\n/g, "\n");
      if (currentColor) {
        parts.push(
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: currentColor, children: formattedText }, `${lastIndex}-${match.index}`)
        );
      } else {
        parts.push(formattedText);
      }
    }
    const colorCode = match[1];
    if (colorCode === "39" || colorCode === "0") {
      currentColor = "";
    } else if (colorMap[colorCode]) {
      currentColor = colorMap[colorCode];
    }
    lastIndex = ansiRegex.lastIndex;
  }
  if (lastIndex < text.length) {
    const remainingText = text.slice(lastIndex);
    const formattedText = remainingText.replace(/\\n/g, "\n");
    if (currentColor) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: currentColor, children: formattedText }, `${lastIndex}-end`)
      );
    } else {
      parts.push(formattedText);
    }
  }
  return parts.length > 0 ? parts : [text.replace(/\\n/g, "\n")];
};
const ErrorHeader = ({ platform, method, timestamp }) => {
  const platformConfig = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.unknown;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[1440px] mx-auto px-20 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-16 rounded-3xl bg-danger-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mr-6 w-16 h-16 text-danger-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-6xl font-bold text-danger-600", children: "出错了~" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-3xl text-default-600", children: [
          platformConfig.displayName,
          " - ",
          method
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mr-4 w-8 h-8 text-default-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl text-default-600", children: [
        "发生时间：",
        new Date(timestamp).toLocaleString("zh-CN")
      ] })
    ] })
  ] }) });
};
const BusinessErrorDetails = ({ error, logs, triggerCommand }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[1440px] mx-auto px-20 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-16 text-6xl font-bold text-foreground", children: "错误详情" }),
    triggerCommand && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 mb-16 rounded-3xl bg-content1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center mb-8 text-4xl font-semibold text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "mr-4 w-10 h-10" }),
        "触发命令"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 rounded-2xl bg-default-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700", children: triggerCommand }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 mb-16 rounded-3xl bg-danger-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center mb-10 text-4xl font-semibold text-danger-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "mr-4 w-10 h-10" }),
        "调用栈信息"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 rounded-2xl bg-content1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-2xl leading-relaxed whitespace-pre-wrap break-all select-text text-foreground-700", children: String(error.stack || "") }) })
    ] }),
    logs && (typeof logs === "string" ? logs.length > 0 : logs.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 rounded-3xl bg-content1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center mb-10 text-4xl font-semibold text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-4 w-10 h-10" }),
        "相关日志"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 rounded-2xl bg-content1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: typeof logs === "string" ? logs.split("\n\n").map((logSection, index) => {
        const parsedLog = parseAnsiColors(logSection);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text", children: parsedLog.length > 0 ? parsedLog : logSection }, index);
      }) : logs.map((log, index) => {
        const parsedLog = parseAnsiColors(log);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-2xl leading-relaxed whitespace-pre-wrap break-all select-text", children: parsedLog.length > 0 ? parsedLog : log }, index);
      }) }) })
    ] })
  ] });
};
const QRCodeSection = ({ qrCodeDataUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-18", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-500 select-text", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-11 h-11" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "触发命令" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "w-[350px] h-[350px] select-text"
      }
    ) })
  ] });
};
const handlerError = (props) => {
  const { data, qrCodeDataUrl } = props;
  const { type, platform, error, method, timestamp, logs, triggerCommand } = data;
  const isBusinessError = type === "business_error";
  const businessError = isBusinessError ? error : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DefaultLayout, { ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[60px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ErrorHeader,
      {
        type,
        platform,
        method,
        timestamp
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BusinessErrorDetails,
      {
        error: businessError,
        logs,
        triggerCommand
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[1440px] mx-auto px-20 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-16 mr-8 rounded-3xl bg-primary-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center mb-10 text-5xl font-semibold text-primary-800", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-6 w-12 h-12" }),
          "发送错误报告"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl leading-relaxed text-default-700", children: "请将此错误报告截图发送给开发者，以便快速定位和解决问题。" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl text-default-600", children: "您可以通过以下方式联系开发者：GitHub Issues、QQ群：795874649。" })
        ] })
      ] }),
      qrCodeDataUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSection, { qrCodeDataUrl })
    ] }) })
  ] });
};
handlerError.displayName = "handlerError";
const handlerError$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  handlerError
}, Symbol.toStringTag, { value: "Module" }));
const changelogData = [
  {
    title: "重大变更",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8" }),
    color: "danger",
    items: [
      {
        title: "多包工作区架构",
        description: "重构项目结构为多包工作区模式，提升开发效率和代码管理"
      },
      {
        title: "SQLite3操作升级",
        description: "使用sql语句操作sqlite3，提升数据库功能和性能表现"
      }
    ]
  },
  {
    title: "核心功能",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-8 h-8" }),
    color: "primary",
    items: [
      {
        title: "React渲染引擎",
        description: "使用React替代art-template，集成Vite支持实时开发调试"
      },
      {
        title: "Tauri桌面应用",
        description: "添加Tauri桌面支持和Web UI增强，支持跨平台桌面应用"
      },
      {
        title: "多层编码签名验证",
        description: "添加多层编码签名验证中间件和前端实现，提升安全性"
      },
      {
        title: "心跳检测功能",
        description: "添加心跳检测和登录功能改进，提升系统稳定性"
      }
    ]
  },
  {
    title: "B站功能增强",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "w-8 h-8" }),
    color: "secondary",
    items: [
      {
        title: "视频和直播动态",
        description: "新增视频和直播动态组件及共享功能，支持完整动态展示"
      },
      {
        title: "8K视频支持",
        description: "添加8K视频质量支持并更新依赖，提供超高清视频体验"
      },
      {
        title: "B站图文动态",
        description: "添加B站图文动态组件及支持，完善动态内容展示"
      },
      {
        title: "番剧组件支持",
        description: "添加番剧组件支持及完善相关功能，丰富内容类型"
      },
      {
        title: "评论组件重构",
        description: "重构Bilibili评论组件并优化预览面板功能"
      },
      {
        title: "合辑解析支持",
        description: "支持合辑解析，扩展B站内容解析能力"
      }
    ]
  },
  {
    title: "渲染系统",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "w-8 h-8" }),
    color: "success",
    items: [
      {
        title: "URL参数控制",
        description: "支持URL参数控制平台和模板选择，提升使用灵活性"
      },
      {
        title: "React渲染服务",
        description: "新增React渲染服务模块，提供强大的渲染能力"
      },
      {
        title: "组件自动注册",
        description: "重构组件注册和渲染逻辑，实现自动注册功能"
      }
    ]
  },
  {
    title: "抖音平台",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, { className: "w-8 h-8" }),
    color: "warning",
    items: [
      {
        title: "抖音动态和直播",
        description: "添加抖音动态和直播组件，优化评论组件及开发环境配置"
      },
      {
        title: "抖音作品推送",
        description: "优化抖音作品推送文本描述及日志信息显示"
      }
    ]
  },
  {
    title: "Web功能",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-8 h-8" }),
    color: "warning",
    items: [
      {
        title: "内容管理界面",
        description: "添加web解析页面鉴权开关并优化内容管理界面"
      },
      {
        title: "进度条和404页面",
        description: "添加进度条组件和404页面，提升用户体验"
      },
      {
        title: "前端路由支持",
        description: "添加connect-history-api-fallback支持前端路由"
      },
      {
        title: "主题支持",
        description: "重构内容管理页面并添加主题支持，提升界面美观度"
      }
    ]
  },
  {
    title: "错误修复",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bug, { className: "w-8 h-8" }),
    color: "danger",
    items: [
      {
        title: "B站动态修复",
        description: "修复动态卡片中图片可能为空的判断缺失问题"
      },
      {
        title: "抖音解析优化",
        description: "修复抖音平台音乐数据解析中sec_uid的变量引用问题"
      },
      {
        title: "动态数据处理",
        description: "修正动态数据渲染逻辑和类型定义，提升数据处理准确性"
      },
      {
        title: "文件路径生成",
        description: "修正DataService文件路径生成逻辑，解决路径错误问题"
      },
      {
        title: "构建错误修复",
        description: "修复构建过程中的各种错误和配置问题"
      },
      {
        title: "动态过滤增强",
        description: "增强动态过滤日志并支持直播内容处理"
      }
    ]
  },
  {
    title: "性能优化",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-8 h-8" }),
    color: "success",
    items: [
      {
        title: "图片加载优化",
        description: "优化图片加载和错误处理机制，提升加载速度"
      },
      {
        title: "日志收集器优化",
        description: "优化日志收集器性能减少内存占用，提升系统效率"
      }
    ]
  },
  {
    title: "文档更新",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-8 h-8" }),
    color: "primary",
    items: [
      {
        title: "B站动态类型定义",
        description: "添加B站动态相关类型定义，完善代码文档"
      },
      {
        title: "组件文档完善",
        description: "更新错误处理组件文档和类型定义"
      },
      {
        title: "类型注释添加",
        description: "添加类型注释和组件文档，提升代码可维护性"
      },
      {
        title: "README更新",
        description: "更新项目README文档，完善使用说明"
      }
    ]
  },
  {
    title: "代码样式",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-8 h-8" }),
    color: "secondary",
    items: [
      {
        title: "代码格式统一",
        description: "统一代码格式和命名规范，提升代码质量"
      },
      {
        title: "CSS变量优化",
        description: "统一组件样式使用CSS变量替代硬编码颜色"
      },
      {
        title: "无用代码清理",
        description: "清理无用文件和代码注释，保持代码整洁"
      }
    ]
  },
  {
    title: "代码重构",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8" }),
    color: "secondary",
    items: [
      {
        title: "动态组件优化",
        description: "优化动态组件代码结构并提取共享模块"
      },
      {
        title: "路径解析重构",
        description: "重构路径解析逻辑以支持三级路径格式"
      },
      {
        title: "数据库模型优化",
        description: "优化数据库模型和API路由，提升数据处理效率"
      },
      {
        title: "构建输出优化",
        description: "更新构建输出目录和chunk命名规范"
      },
      {
        title: "错误处理简化",
        description: "移除冗余代码并简化错误处理逻辑"
      }
    ]
  },
  {
    title: "测试完善",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "w-8 h-8" }),
    color: "primary",
    items: [
      {
        title: "图文动态测试",
        description: "添加B站图文动态测试数据，完善测试覆盖"
      },
      {
        title: "动态组件测试",
        description: "添加动态组件测试数据，确保功能稳定性"
      },
      {
        title: "错误处理测试",
        description: "添加错误处理相关测试用例，提升代码健壮性"
      }
    ]
  },
  {
    title: "构建系统",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8" }),
    color: "warning",
    items: [
      {
        title: "依赖更新",
        description: "更新@ikenxuan/amagi依赖至5.2.0版本，获得最新功能"
      },
      {
        title: "构建配置优化",
        description: "更新构建输出目录和chunk命名，优化构建流程"
      },
      {
        title: "TypeScript配置",
        description: "更新tsconfig和vite配置，提升开发体验"
      },
      {
        title: "依赖包版本统一",
        description: "更新依赖包版本，保持技术栈一致性"
      }
    ]
  },
  {
    title: "持续集成",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "w-8 h-8" }),
    color: "secondary",
    items: [
      {
        title: "构建配置调整",
        description: "调整构建配置和外部依赖，优化CI/CD流程"
      }
    ]
  },
  {
    title: "其他更新",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-8 h-8" }),
    color: "default",
    items: [
      {
        title: "Mock服务器改进",
        description: "改进数据文件路由处理，提升开发调试体验"
      },
      {
        title: "日志级别配置",
        description: "更新依赖项和日志级别配置，优化系统监控"
      },
      {
        title: "动态卡片类型处理",
        description: "更新依赖并添加动态卡片类型处理功能"
      }
    ]
  }
];
const ChangelogGroupComponent = ({ group }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(card_default, { className: "w-full border-0 shadow-lg transition-all duration-300 bg-content1/95", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(card_body_default, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-xl bg-${group.color}/10 flex-shrink-0`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-${group.color}`, children: group.icon }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold leading-tight text-foreground", children: group.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: group.items.map((item, itemIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 transition-colors border-l-3 border-divider", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-xl font-semibold leading-tight text-foreground", children: item.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-relaxed text-foreground-600", children: item.description })
    ] }, itemIndex)) })
  ] }) });
};
const ChangelogV2 = reactExports.memo((props) => {
  const { data, version, scale } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultLayout, { data, version, scale, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-gradient-to-br from-background via-content1/20 to-content2/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container px-10 py-10 pt-30 mx-auto max-w-[1400px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-4 text-6xl font-black leading-tight text-foreground", children: "重磅功能 * karin-plugin-kkk v2.0 已发布" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mb-6 max-w-4xl text-3xl leading-relaxed text-foreground-600", children: "项目架构重构，React渲染引擎，多端应用支持，带来更强大的功能和更优秀的体验" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gap-6 space-y-6 columns-3", children: changelogData.map((group, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 break-inside-avoid", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChangelogGroupComponent, { group }) }, index)) })
  ] }) }) });
});
ChangelogV2.displayName = "ChangelogV2";
const changelog_v2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ChangelogV2
}, Symbol.toStringTag, { value: "Module" }));
export {
  reactServerRender as default,
  reactServerRender
};
