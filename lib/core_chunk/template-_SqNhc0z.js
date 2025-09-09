import fs, { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { logger } from "node-karin";
import { karinPathTemp } from "node-karin/root";
import { s as server_browserExports, c as browserExports, r as reactExports, j as jsxRuntimeExports, H as HeroUIProvider, e as clsx, f as MessageCircle, i as Heart, Q as QrCode, B as Bookmark, S as Share2, k as Clock, l as Hash, E as Eye, U as Users, R as Radio, m as Music, T as ThumbsUp, n as ThumbsDown, o as Coins } from "./vendor-BDYGKpr1.js";
var PlatformType = /* @__PURE__ */ ((PlatformType2) => {
  PlatformType2["DOUYIN"] = "douyin";
  PlatformType2["BILIBILI"] = "bilibili";
  PlatformType2["KUAISHOU"] = "kuaishou";
  PlatformType2["HELP"] = "help";
  return PlatformType2;
})(PlatformType || {});
const componentConfigs = [
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
        exportName: "DouyinComment",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => Comment$2).then((module) => ({
          default: module.DouyinComment
        }))
      },
      {
        id: "dynamic",
        name: "动态作品",
        description: "抖音动态作品展示模板",
        enabled: true,
        componentPath: "platforms/douyin/Dynamic",
        exportName: "DouyinDynamic",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => Dynamic).then((module) => ({
          default: module.DouyinDynamic
        }))
      },
      {
        id: "live",
        name: "直播间",
        description: "抖音直播间信息模板",
        enabled: true,
        componentPath: "platforms/douyin/Live",
        exportName: "DouyinLive",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => Live).then((module) => ({
          default: module.DouyinLive
        }))
      },
      {
        id: "musicinfo",
        name: "音乐信息",
        description: "抖音音乐信息展示模板",
        enabled: true,
        componentPath: "platforms/douyin/MusicInfo",
        exportName: "DouyinMusicInfo",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => MusicInfo).then((module) => ({
          default: module.DouyinMusicInfo
        }))
      },
      {
        id: "user_profile",
        name: "用户主页",
        description: "抖音用户主页信息模板",
        enabled: false,
        componentPath: "platforms/douyin/UserProfile",
        exportName: "DouyinUserProfile",
        validateData: (data) => data && typeof data.share_url === "string"
      },
      {
        id: "userlist",
        name: "抖音推送列表",
        description: "抖音用户推送列表组件",
        enabled: true,
        componentPath: "platforms/douyin/UserList",
        exportName: "default",
        validateData: (data) => {
          return data && Array.isArray(data.renderOpt);
        },
        lazyComponent: () => Promise.resolve().then(() => UserList$1).then((module) => ({
          default: module.default
        }))
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
        exportName: "BilibiliComment",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => Comment$1).then((module) => ({
          default: module.BilibiliComment
        }))
      },
      {
        id: "userlist",
        name: "B站推送列表",
        description: "B站用户推送列表组件",
        enabled: true,
        componentPath: "platforms/bilibili/UserList",
        exportName: "default",
        validateData: (data) => {
          return data && Array.isArray(data.renderOpt);
        },
        lazyComponent: () => Promise.resolve().then(() => UserList).then((module) => ({
          default: module.default
        }))
      },
      {
        id: "dynamic/DYNAMIC_TYPE_DRAW",
        name: "图文动态",
        description: "B站图文动态展示模板",
        enabled: true,
        componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_DRAW",
        exportName: "BilibiliDrawDynamic",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_DRAW).then((module) => ({
          default: module.BilibiliDrawDynamic
        }))
      },
      {
        id: "dynamic/DYNAMIC_TYPE_AV",
        name: "视频动态",
        description: "B站视频动态展示模板",
        enabled: true,
        componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_AV",
        exportName: "BilibiliVideoDynamic",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_AV).then((module) => ({
          default: module.BilibiliVideoDynamic
        }))
      },
      {
        id: "dynamic/DYNAMIC_TYPE_FORWARD",
        name: "转发动态",
        description: "B站转发动态展示模板",
        enabled: true,
        componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_FORWARD",
        exportName: "BilibiliForwardDynamic",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_FORWARD).then((module) => ({
          default: module.BilibiliForwardDynamic
        }))
      },
      {
        id: "dynamic/DYNAMIC_TYPE_LIVE_RCMD",
        name: "直播动态",
        description: "B站直播动态展示模板",
        enabled: true,
        componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_LIVE_RCMD",
        exportName: "BilibiliLiveDynamic",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => DYNAMIC_TYPE_LIVE_RCMD).then((module) => ({
          default: module.BilibiliLiveDynamic
        }))
      },
      {
        id: "dynamic/DYNAMIC_TYPE_WORD",
        name: "纯文字动态",
        description: "B站纯文字动态展示模板",
        enabled: false,
        componentPath: "platforms/bilibili/dynamic/DYNAMIC_TYPE_WORD",
        exportName: "BilibiliWordDynamic",
        validateData: (data) => data && typeof data.share_url === "string"
      },
      {
        id: "video",
        name: "视频信息",
        description: "B站视频信息展示模板",
        enabled: false,
        componentPath: "platforms/bilibili/Video",
        exportName: "BilibiliVideo",
        validateData: (data) => data && typeof data.share_url === "string"
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
        exportName: "KuaishouComment",
        validateData: (data) => data && typeof data.share_url === "string",
        lazyComponent: () => Promise.resolve().then(() => Comment).then((module) => ({
          default: module.KuaishouComment
        }))
      }
    ]
  },
  {
    type: PlatformType.HELP,
    name: "帮助",
    icon: "❓",
    color: "secondary",
    components: [
      {
        id: "help",
        name: "帮助页面",
        description: "KKK插件帮助页面",
        enabled: true,
        componentPath: "platforms/help/Help",
        exportName: "Help",
        lazyComponent: () => Promise.resolve().then(() => Help$1).then((module) => ({
          default: module.Help
        }))
      }
    ]
  }
];
class ComponentAutoRegistry {
  static components = /* @__PURE__ */ new Map();
  static initialized = false;
  /**
   * 初始化组件注册器
   * 自动扫描配置文件并注册所有启用的组件
   */
  static async initialize() {
    if (this.initialized) {
      logger.debug("组件注册器已初始化，跳过重复初始化");
      return;
    }
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
        dark: useDarkTheme ? "#c3c3c3" : "#3a3a3a",
        light: useDarkTheme ? "#000000" : "#EEEEF0"
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
   * @returns 包目录路径
   */
  getPackageDir() {
    const cwd = process.cwd();
    logger.debug("当前运行环境:", this.NODE_ENV);
    logger.debug("当前工作目录:", cwd);
    switch (this.NODE_ENV) {
      case "development":
        let currentDir = cwd;
        while (currentDir !== path.dirname(currentDir)) {
          if (existsSync(path.join(currentDir, "pnpm-workspace.yaml"))) {
            return path.join(currentDir, "packages", "core");
          }
          currentDir = path.dirname(currentDir);
        }
        return path.join(path.dirname(cwd), "render");
      case "production":
      default:
        let projectRoot = cwd;
        while (projectRoot !== path.dirname(projectRoot)) {
          if (existsSync(path.join(projectRoot, "pnpm-workspace.yaml")) || existsSync(path.join(projectRoot, "package.json"))) {
            return projectRoot;
          }
          projectRoot = path.dirname(projectRoot);
        }
        return cwd;
    }
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
        return {
          cssDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "lib"),
          imageDir: path.join(this.packageDir, "node_modules", "karin-plugin-kkk", "resources", "image")
        };
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
    const cssUrl = path.join(cssRelativePath, "karin-plugin-kkk.css");
    logger.debug("CSS相对路径:", cssUrl);
    logger.debug("图片相对路径:", imageRelativePath);
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
class ReactRender {
  outputDir = path.join(karinPathTemp, "html", "karin-plugin-kkk", "renderServer");
  cssContent = "";
  resourceManager;
  htmlWrapper;
  constructor() {
    this.resourceManager = new ResourcePathManager();
    this.htmlWrapper = new HtmlWrapper(this.resourceManager);
    this.outputDir = path.join(karinPathTemp, "html", "karin-plugin-kkk", "renderServer");
    this.ensureOutputDir();
    this.loadCssContent();
  }
  /**
   * 初始化组件注册
   */
  async initializeComponents() {
    try {
      await ComponentAutoRegistry.initialize();
      logger.debug("✅ 组件自动注册完成");
    } catch (error) {
      logger.error("❌ 组件自动注册失败:", error);
    }
  }
  /**
   * 加载CSS内容到内存中
   */
  loadCssContent() {
    try {
      const { cssDir } = this.resourceManager.getResourcePaths();
      const cssPath = path.join(cssDir, "karin-plugin-kkk.css");
      logger.debug("尝试加载CSS文件:", cssPath);
      if (existsSync(cssPath)) {
        this.cssContent = fs.readFileSync(cssPath, "utf-8");
        logger.debug("✅ CSS内容加载成功");
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
   * 渲染React组件为HTML字符串
   * @param request 渲染请求参数
   * @returns 渲染结果
   */
  async renderComponent(request) {
    try {
      logger.debug("renderToString:", request.templateName);
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
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  /**
   * 确保输出目录存在
   */
  ensureOutputDir() {
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
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
const renderComponentToHtml = async (request, outputDir) => {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  await ComponentAutoRegistry.initialize();
  const tempServer = new ReactRender();
  tempServer["outputDir"] = outputDir;
  return await tempServer.render(request);
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
        "bg-default-5 text-default-70"
      ),
      id: "container",
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: "1440px",
        minHeight: "100vh"
      },
      children: [
        children,
        version && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[50px] text-center relative py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: version.pluginName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 ml-1.5 text-[25px] rounded-[10px] align-super bg-default-10", children: [
            version.pluginVersion,
            " ",
            version.releaseType
          ] }),
          " Powered By ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: version.poweredBy })
        ] }) })
      ]
    }
  ) });
};
const QRCodeSection$3 = ({
  qrCodeDataUrl
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center -mr-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 flex items-center justify-center w-[600px] h-[600px] bg-white rounded-lg", children: qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCodeDataUrl, alt: "二维码", className: "object-contain w-full h-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-center text-default-400", children: [
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
              parent.innerHTML = '<div class="flex justify-center items-center h-full text-2xl font-bold text-gray-600">抖音</div>';
            }
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-[250px] space-y-2 text-default-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left", children: [
          "作品类型：",
          type
        ] }),
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
            "视频帧率：",
            videoFPS,
            "Hz"
          ] })
        ] }),
        (type === "图集" || type === "合辑") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-2.5 tracking-[6px] text-[45px] text-left", children: [
          "图片数量：",
          imageLength,
          "张"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      QRCodeSection$3,
      {
        qrCodeDataUrl
      }
    )
  ] });
};
const CommentItemComponent$1 = ({ comment }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: comment.userimageurl,
        className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
        alt: "用户头像"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12.5 text-[50px] text-default-40 relative flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: comment.nickname }),
        comment.label_type === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-4 py-1 rounded-full ml-3 text-[40px] bg-red-500 text-white", children: "作者" }),
        comment.status_label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-4 py-1 rounded-xl ml-3 text-[40px] bg-default-10 text-default-90", children: comment.status_label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-[60px] text-default-90 leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.create_time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.ip_label }),
          comment.reply_comment_total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[40px] text-default-", children: [
            "共",
            comment.reply_comment_total,
            "条回复"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[40px] text-default-600", children: "回复" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 60, className: "stroke-current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[50px]", children: comment.digg_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 60, className: "stroke-current" }) })
        ] })
      ] })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto mx-auto max-w-full", children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CommentItemComponent$1, { comment }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-20 text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 64, className: "mx-auto mb-4 text-gray-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl", children: "暂无评论数据" })
    ] }) }) })
  ] }) });
});
const Comment$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-[65px] ml-4 ${useDarkTheme ? "text-[#d3d3d3]" : "text-[#3e3e3eb8]"}`,
        children: "记录美好生活"
      }
    )
  ] });
};
const CoverSection$1 = ({ imageUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center my-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center overflow-hidden shadow-[0px_10px_20px_0px_#4343434f] rounded-[25px] w-[90%] relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      className: "rounded-[25px] object-contain w-full h-full",
      src: imageUrl,
      alt: "封面"
    }
  ) }) });
};
const InfoSection = ({ desc, dianzan, pinglun, shouchang, share, createTime, useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-16 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `text-[70px] font-bold leading-relaxed mb-9 ${useDarkTheme ? "text-[#e9e9e9]" : "text-black"}`,
        style: { letterSpacing: "1.5px", wordWrap: "break-word" },
        dangerouslySetInnerHTML: { __html: desc }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-[45px] text-[#808080] font-light mb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-11 h-11" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          dianzan,
          "点赞"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-11 h-11" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-11 h-11" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          share,
          "分享"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[45px] text-[#808080] font-light", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-11 h-11" }),
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
  useDarkTheme
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pl-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: avater_url,
          alt: "头像",
          className: "w-[200px] h-[200px] rounded-full mr-7 shadow-[0px_10px_20px_0px_#4343434f]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-[80px] font-bold ${useDarkTheme ? "text-[#ededed]" : "text-[#606060]"}`,
          children: username
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex flex-col text-[35px] mt-6 space-y-1 ${useDarkTheme ? "text-[#d1d1d1]" : "text-[#2f2f2f]"}`,
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "获赞: ",
              likes
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-8 h-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "关注: ",
              following
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8" }),
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
const QRCodeSection$2 = ({ qrCodeDataUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-18", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-11 h-11" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "作品直链：永久有效" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "w-[350px] h-[350px]"
      }
    ) })
  ] });
};
const DouyinDynamic = (props) => {
  const { data, qrCodeDataUrl } = props;
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-90 ", children: "抖音作品推送" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-0 py-25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserInfoSection$1,
        {
          avater_url: data.avater_url,
          username: data.username,
          douyinId: data.抖音号,
          likes: data.获赞,
          following: data.关注,
          followers: data.粉丝,
          useDarkTheme: data.useDarkTheme
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        QRCodeSection$2,
        {
          qrCodeDataUrl,
          useDarkTheme: data.useDarkTheme
        }
      )
    ] })
  ] }) });
};
const Dynamic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DouyinDynamic
}, Symbol.toStringTag, { value: "Module" }));
const CoverSection = ({ imageUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center overflow-hidden shadow-[0px_10px_20px_0px_#4343434f] rounded-[25px] w-[95%] flex-1 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        className: "rounded-[25px] object-contain w-full h-full",
        src: imageUrl,
        alt: "封面"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center px-3 py-2 bg-red-500 bg-opacity-90 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-6 h-6 text-white" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "直播中" })
    ] }) })
  ] }) }) });
};
const UserInfoSection = ({
  avater_url,
  username,
  fans,
  useDarkTheme
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center pr-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: avater_url,
        alt: "头像",
        className: "mr-[15px] rounded-full h-auto w-[130px]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row items-center mb-[5px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `text-[60px] ${useDarkTheme ? "text-[#dddddd]" : "text-black"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: username })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            className: "w-[170px] h-auto",
            src: "/image/douyin/抖音-直播中.png",
            alt: "直播中"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-[#808080]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#808080] text-[35px]", children: [
          fans,
          "粉丝"
        ] })
      ] })
    ] })
  ] });
};
const QRCodeSection$1 = ({ qrCodeDataUrl, useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center mt-[30px] mr-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex items-center gap-2 text-[50px] ml-[10px] text-right mr-[10px] ${useDarkTheme ? "text-[#dbdbdb]" : "text-[#2f2f2ff9]"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-12 h-12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "直播分享链接" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-[10px] rounded-[2%] border-[7px] border-dashed border-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "w-[350px]"
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `text-[65px] items-center tracking-[1.5px] relative break-words font-bold ${props.data.useDarkTheme ? "text-[#e7e7e7e7]" : "text-black"}`,
          children: props.data.text
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[10px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[45px] items-center tracking-[1.5px] relative break-words text-[#808080]", children: props.data.liveinf }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 text-[45px] tracking-[1.5px] relative break-words text-[#808080]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-11 h-11" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "观看总人数",
            props.data.总观看次数
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-11 h-11" }),
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `w-inherit text-[70px] text-right mr-5 -mb-[45px] z-[-1] ${props.data.useDarkTheme ? "text-[#dddddd]" : "text-[#3e3e3e]"}`,
            children: [
              "抖音",
              props.data.dynamicTYPE
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-auto flex justify-between pt-[60px] items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col ml-[45px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-start items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-[130%] h-[245px] mb-[52px] bg-cover bg-center bg-fixed ${props.data.useDarkTheme ? "bg-[url(/image/douyin/dylogo-light.svg)]" : "bg-[url(/image/douyin/dylogo-dark.svg)]"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `text-[50px] tracking-[10px] ${props.data.useDarkTheme ? "text-[#dddddd]" : "text-[#212121]"}`,
                children: "抖音 记录美好生活"
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeSection$1, { qrCodeDataUrl, useDarkTheme: props.data.useDarkTheme })
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
        className: "object-contain w-full h-full"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-[65px] ml-4 ${useDarkTheme ? "text-[#d3d3d3]" : "text-[#3e3e3eb8]"}`,
        children: "记录美好生活"
      }
    )
  ] });
};
const MusicCoverSection = ({ imageUrl }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center my-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center overflow-hidden shadow-[0px_10px_20px_0px_#4343434f] rounded-[25px] w-[90%] relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      className: "rounded-[25px] object-contain w-full h-full",
      src: imageUrl,
      alt: "音乐封面"
    }
  ) }) });
};
const MusicInfoSection = ({
  desc,
  musicId,
  userCount,
  createTime,
  useDarkTheme
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-16 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `text-[70px] font-bold leading-relaxed mb-9 ${useDarkTheme ? "text-[#e9e9e9]" : "text-black"}`,
        style: { letterSpacing: "1.5px", wordWrap: "break-word" },
        dangerouslySetInnerHTML: { __html: desc }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-[45px] text-[#808080] font-light mb-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-11 h-11" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "音乐ID: ",
          musicId
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-11 h-11" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          userCount,
          " 人使用过"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-[45px] text-[#808080] font-light", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "图片生成于",
      createTime
    ] }) })
  ] });
};
const MusicAuthorInfoSection = ({
  avatarUrl,
  username,
  userShortId,
  totalFavorited,
  followingCount,
  fans,
  useDarkTheme
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pl-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: avatarUrl,
          alt: "头像",
          className: "w-[200px] h-[200px] rounded-full mr-7 shadow-[0px_10px_20px_0px_#4343434f]"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-[80px] font-bold ${useDarkTheme ? "text-[#ededed]" : "text-[#606060]"}`,
          children: username
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `flex flex-col text-[35px] mt-6 space-y-1 ${useDarkTheme ? "text-[#d1d1d1]" : "text-[#2f2f2f]"}`,
        style: { letterSpacing: "2.5px" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "w-8 h-8" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "ID: ",
              userShortId
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "获赞: ",
            totalFavorited
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "关注: ",
            followingCount
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8" }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[45px] text-right mt-5 text-default-90", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "w-11 h-11" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "文件直链：永久有效" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-sm border-[7px] border-dashed border-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: qrCodeDataUrl,
        alt: "二维码",
        className: "w-[350px] h-[350px]"
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[70px] text-right mr-21 -mb-11 z-[-1] text-default-90", children: "抖音音乐信息" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center px-0 py-25", children: [
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
const DouyinUserItem = ({ user, index, useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: `
          flex w-[90%] items-center px-[45px] py-[35px] rounded-[25px] shadow-[0_4px_20px_0px_rgba(67,67,67,0.31)]
          ${useDarkTheme ? "bg-[#4d4d4d] shadow-[0_4px_20px_0px_rgb(6,6,6)]" : "bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.3)]"}
        `,
        "data-index": index,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: user.avatar_img,
              alt: "用户头像",
              className: "w-[150px] h-[150px] rounded-full mr-[50px] object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-grow justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `
              text-[55px] mb-[15px] font-medium
              ${useDarkTheme ? "text-[#ededed]" : "text-black"}
            `, children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `
              flex gap-[30px] text-[25px]
              ${useDarkTheme ? "text-[#ededed]" : "text-black"}
            `, children: [
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex justify-center items-center text-sm ${className} bg-default-100 text-default-400`, children: placeholder || "图片加载失败" });
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
const QRCodeSection = ({
  qrCodeDataUrl
}) => {
  const qrCodeRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center -mr-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: qrCodeRef,
      className: "mt-20 w-[600px] h-[600px] flex items-center justify-center",
      children: qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: qrCodeDataUrl,
          alt: "二维码",
          className: "object-contain w-full h-full"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center w-full h-full text-6xl text-default-40", children: "二维码占位符" })
    }
  ) });
};
const InfoItem = ({ label, value, unit }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[45px] p-2.5 tracking-[6px] text-left break-all text-default-70", children: [
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
  clarity,
  imageLength
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col mt-2.5 -ml-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[580px] h-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-8xl font-bold text-blue-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/image/bilibili/bilibili.png", alt: "B站Logo" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "作品类型", value: type }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "评论数量", value: commentLength, unit: "条" }),
    type === "视频" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      videoSize && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "视频大小", value: videoSize, unit: "MB" }),
      clarity && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoItem, { label: "视频画质", value: clarity })
    ] }),
    (type === "图集" || type === "动态") && imageLength && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InfoItem,
      {
        label: type === "图集" ? "图片数量" : "附带图片",
        value: imageLength,
        unit: "张"
      }
    )
  ] });
};
const CommentItemComponent = ({
  comment
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex px-10 pb-0 relative max-w-full mb-[70px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mr-[33.75px] flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithSkeleton,
        {
          src: comment.avatar || "AVATAR_PLACEHOLDER",
          alt: "用户头像",
          className: "w-50 h-50 rounded-full shadow-[0_20px_50px_0_rgba(0,0,0,0.3)]",
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
      ),
      comment.icon_big_vip && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithSkeleton,
        {
          src: comment.icon_big_vip,
          alt: "VIP图标",
          className: "w-[145px] h-[145px] absolute bottom-0 right-0 transform translate-x-[20%] translate-y-[20%] scale-50",
          placeholder: "VIP"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-[10px] mb-[15px] text-[50px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-shrink-0 flex items-center gap-2 leading-[1.2] text-default-30 font-bold [&>span]:inline-block [&>span]:leading-[1.2] [&>svg]:inline-block [&>svg]:w-[100px] [&>svg]:h-[100px] [&>svg]:align-middle [&>svg]:flex-shrink-0",
            dangerouslySetInnerHTML: { __html: comment.uname }
          }
        ),
        comment.label_type === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-[rgb(254,44,85)] text-white flex-shrink-0 self-center", children: "作者" }),
        comment.status_label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block px-[20px] py-[2px] rounded-[10px] text-[45px] bg-default-20 text-default-60 flex-shrink-0 self-center", children: comment.status_label })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText$1,
        {
          content: comment.message,
          className: "text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-default-90 mb-[20px] [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ),
      (comment.img_src || comment.sticker) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex my-5 overflow-hidden rounded-[25px] w-[95%] shadow-[0_20px_50px_0_rgba(0,0,0,0.3)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageWithSkeleton,
        {
          src: comment.img_src || comment.sticker || "IMAGE_PLACEHOLDER",
          alt: "评论图片",
          className: "rounded-[25px] object-contain w-full h-full",
          placeholder: "评论图片"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-[37.5px] whitespace-nowrap text-default-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[45px] tracking-[2px]", children: [
          comment.ctime,
          " · ",
          comment.location,
          comment.replylength > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-default-40 tracking-[3px] ml-4", children: [
            comment.replylength,
            "回复"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-4 text-default-60", children: "回复" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[75px] ml-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[15px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-[60px] h-[60px] text-default-50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px] text-default-50", children: comment.like })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-[15px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-[60px] h-[60px] text-default-50" }) })
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
        CommentLength: 0,
        VideoSize: void 0,
        Clarity: void 0,
        ImageLength: void 0,
        shareurl: "",
        share_url: "",
        CommentsData: []
      };
    }
    return {
      useDarkTheme: props.data.useDarkTheme || false,
      Type: props.data.Type || "视频",
      CommentLength: props.data.CommentLength || 0,
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
        QRCodeSection,
        {
          shareurl: processedData.shareurl || processedData.share_url,
          qrCodeDataUrl: props.qrCodeDataUrl,
          useDarkTheme: processedData.useDarkTheme
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-full mx-0 mb-[70px]", children: processedData.CommentsData.length > 0 ? processedData.CommentsData.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentItemComponent,
      {
        comment,
        useDarkTheme: processedData.useDarkTheme
      },
      index
    )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center text-gray-500", children: "暂无评论数据" }) })
  ] });
});
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
const Comment$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
const BilibiliUserItem = ({ user, useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: `
          flex w-[90%] items-center px-[45px] py-[35px] rounded-[25px] shadow-[0_4px_20px_0px_rgba(67,67,67,0.31)]
          ${useDarkTheme ? "bg-[#4d4d4d] shadow-[0_4px_20px_0px_rgb(6,6,6)]" : "bg-white shadow-[0_4px_20px_0px_rgba(0,0,0,0.3)]"}
        `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: user.avatar_img,
              alt: "用户头像",
              className: "w-[150px] h-[150px] rounded-full mr-[50px] object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-grow justify-between items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `
              text-[55px] mb-[15px] font-medium
              ${useDarkTheme ? "text-[#ededed]" : "text-black"}
            `, children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `
              flex gap-[30px] text-[25px]
              ${useDarkTheme ? "text-[#ededed]" : "text-black"}
            `, children: [
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
const BilibiliDynamicUserInfo = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center px-0 pb-0 pl-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: props.avatar_url,
          alt: "头像",
          className: "w-32 h-32 rounded-full shadow-lg",
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl font-bold text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-default-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 36 }),
        props.create_time
      ] })
    ] }),
    props.decoration_card && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } }) })
  ] });
};
const BilibiliDynamicContent = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-20 w-full leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-5xl tracking-wider break-words text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: clsx(
            "text-[60px] tracking-[0.5px] leading-[1.6] whitespace-pre-wrap text-default-90 mb-[20px]",
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
    props.image_url && Array.isArray(props.image_url) && props.image_url.map((img, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center overflow-hidden rounded-3xl w-11/12 flex-1 shadow-[0px_10px_20px_0px_rgba(0,0,0,0.5)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: img.image_src,
          alt: "封面",
          className: "object-contain w-full h-full rounded-3xl"
        }
      ) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-18" })
    ] }, index))
  ] });
};
const BilibiliDynamicStatus = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-10 px-20 w-full leading-relaxed", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center text-5xl font-light tracking-normal text-default-60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48 }),
        props.dianzan,
        "点赞"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48 }),
        props.pinglun,
        "评论"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48 }),
        props.share,
        "分享"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-5xl font-light tracking-normal text-default-60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 48 }),
      "图片生成时间: ",
      props.render_time
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" })
  ] });
};
const BilibiliDynamicFooter = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-11 h-auto pt-25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col self-start pl-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center text-6xl text-default-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili-light.png",
          alt: "B站Logo",
          className: "h-auto w-120"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl text-default-60", children: "长按识别二维码即可查看全文" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider text-default-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "UID: ",
            props.user_shortid
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "获赞: ",
            props.total_favorited
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "关注: ",
            props.following_count
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "粉丝: ",
            props.fans
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right text-default-60", children: props.dynamicTYPE }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-60", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: props.qrCodeDataUrl,
          alt: "二维码",
          className: "h-auto w-88"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-default-20 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-default-40", children: "二维码" }) }) })
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
        image_url: props.data.image_url
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center pl-20 text-6xl text-default-60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili.png",
          alt: "bilibili",
          className: "h-auto w-120"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-8 text-5xl", children: "你感兴趣的视频都在哔哩哔哩" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20" })
  ] });
};
const BilibiliVideoDynamicContent = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    props.image_url && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center overflow-hidden rounded-3xl w-11/12 flex-1 shadow-[0px_10px_20px_0px_rgba(67,67,67,0.31)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnhancedImage,
          {
            src: props.image_url,
            alt: "封面",
            className: "object-contain w-full h-full rounded-3xl"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex absolute inset-0 justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-8xl font-bold tracking-wider break-words text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: "text-[80px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-default-90",
          content: props.text,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl text-default-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: "text-[60px] leading-[1.5] whitespace-pre-wrap text-default-60",
          content: props.desc,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-15 text-default-80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 items-center text-5xl font-light tracking-normal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                props.dianzan,
                "点赞"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                props.pinglun,
                "评论"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                props.share,
                "分享"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 items-center text-5xl font-light tracking-normal", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                props.coin,
                "硬币"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                props.view,
                "浏览"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center text-5xl font-light tracking-normal", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 48 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "视频时长: ",
                props.duration_text
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center text-4xl font-light whitespace-nowrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "发布于",
            props.create_time
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-0 mr-20 -mb-11 text-7xl text-right text-default-60", children: [
      "哔哩哔哩",
      props.dynamicTYPE
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-11 h-auto pt-25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center pl-12", style: { padding: "0 0 0 50px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EnhancedImage,
              {
                src: props.avatar_url,
                alt: "头像",
                className: "rounded-full shadow-lg w-50 h-50",
                isCircular: true
              }
            ),
            props.frame && /* @__PURE__ */ jsxRuntimeExports.jsx(
              EnhancedImage,
              {
                src: props.frame,
                alt: "头像框",
                className: "absolute inset-0 transform scale-140"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl font-bold text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider text-default-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "UID: ",
              props.user_shortid
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "获赞: ",
              props.total_favorited
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "关注: ",
              props.following_count
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "粉丝: ",
              props.fans
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right text-default-80", children: "动态分享链接" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-80", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: props.qrCodeDataUrl,
            alt: "二维码",
            className: "h-auto w-88"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-default-20 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-default-40", children: "二维码" }) }) })
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
        create_time: props.data.create_time
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
          className: "w-36 h-36 rounded-full shadow-lg",
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl font-bold text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-default-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 36 }),
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
          className: "rounded-full shadow-lg w-30 h-30"
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl font-normal text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: props.username } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl font-normal whitespace-nowrap text-default-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32 }),
        props.create_time
      ] })
    ] }),
    props.decoration_card && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-39", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: props.decoration_card } }) })
  ] });
};
const OriginalAVContent = ({ content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-10", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center py-11", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center rounded-10 w-11/12 aspect-video rounded-2xl overflow-hidden shadow-[0px_10px_20px_0px_rgba(0,0,0,0.3)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: content.cover,
          alt: "视频封面",
          className: "object-cover object-center absolute"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-5 left-12 bottom-14 z-10 text-4xl font-light text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 mr-3 text-4xl text-white rounded-2xl bg-black/50", children: content.duration_text }),
        content.play,
        "观看   ",
        content.danmaku,
        "弹幕"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-10 pl-8 text-6xl font-bold leading-20 text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: content.title } }) })
  ] });
};
const OriginalDrawContent = ({ content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-10", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl leading-relaxed text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentText,
      {
        className: clsx(
          "text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-default-90",
          "[&_svg]:inline [&_svg]:!mb-4"
        ),
        content: content.text,
        style: {
          wordBreak: "break-word",
          overflowWrap: "break-word"
        }
      }
    ) }) }),
    content.image_url && content.image_url.length === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center rounded-6 w-11/12 overflow-hidden shadow-[0px_10px_30px_10px_rgba(0,0,0,0.3)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EnhancedImage,
      {
        src: content.image_url[0].image_src,
        alt: "图片",
        className: "object-cover w-full h-full rounded-6"
      }
    ) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4 p-4", children: content.image_url?.map((img, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden relative shadow-md aspect-square rounded-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-10", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-5xl leading-relaxed text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommentText,
      {
        className: "text-[50px] tracking-[0.5px] leading-[1.5] whitespace-pre-wrap text-default-90",
        content: content.text
      }
    ) }) })
  ] });
};
const OriginalLiveRcmdContent = ({ content }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-12 py-8 mt-4 w-full rounded-2xl bg-default-10", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center py-11", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center rounded-10 w-full aspect-video overflow-hidden shadow-[0px_10px_20px_0px_rgba(0,0,0,0.3)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        EnhancedImage,
        {
          src: content.cover,
          alt: "直播封面",
          className: "object-cover absolute w-full h-full"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-0 bottom-0 left-0 h-1/2 bg-gradient-to-t to-transparent pointer-events-none from-black/75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-5 bottom-8 left-12 z-10 text-4xl font-light text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 mr-3 text-4xl text-white bg-black/50 rounded-3", children: content.area_name }),
        content.text_large,
        "   在线: ",
        content.online
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-8 text-6xl font-bold text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { dangerouslySetInnerHTML: { __html: content.title } }) })
  ] });
};
const BilibiliForwardContent = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-20 w-full leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-5xl tracking-wider break-words text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: clsx(
            "text-[65px] tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-default-90 mb-[20px]",
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 items-center text-5xl font-light tracking-normal text-default-60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 48 }),
        props.dianzan,
        "点赞"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 48 }),
        props.pinglun,
        "评论"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 48 }),
        props.share,
        "分享"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-5xl font-light tracking-normal text-default-60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 48 }),
      "图片生成时间: ",
      props.render_time
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3" })
  ] });
};
const BilibiliForwardFooter = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-11 h-auto pt-25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col self-start pl-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center text-6xl text-default-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili-light.png",
          alt: "B站Logo",
          className: "w-80 h-auto"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl text-default-60", children: "长按识别二维码即可查看全文" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 items-start pt-6 w-full text-4xl tracking-wider text-default-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "UID: ",
            props.user_shortid
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "获赞: ",
            props.total_favorited
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "关注: ",
            props.following_count
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 36 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "粉丝: ",
            props.fans
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right text-default-60", children: props.dynamicTYPE }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-60", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: props.qrCodeDataUrl,
          alt: "二维码",
          className: "h-auto w-88"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-default-20 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-default-40", children: "二维码" }) }) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start text-6xl text-default-80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/image/bilibili/bilibili.png",
          alt: "哔哩哔哩",
          className: "h-auto w-120"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pt-10 text-6xl", children: "你感兴趣的视频都在B站" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5" })
  ] });
};
const BilibiliLiveDynamicContent = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-15" }),
    props.image_url && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex flex-col items-center overflow-hidden rounded-3xl w-11/12 flex-1 shadow-[0px_10px_20px_0px_rgba(125,125,125,0.5)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative items-center text-8xl font-bold tracking-wider break-words text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommentText,
        {
          className: "text-[65px] font-bold tracking-[1.5px] leading-[1.5] whitespace-pre-wrap text-default-90",
          content: props.text,
          style: {
            wordBreak: "break-word",
            overflowWrap: "break-word"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-5xl tracking-normal text-default-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { size: 48 }),
        props.liveinf
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl tracking-normal text-default-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32 }),
        "直播开始时间: ",
        props.create_time
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-25" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EnhancedImage,
            {
              src: props.avatar_url,
              alt: "头像",
              className: "w-32 h-32 rounded-full shadow-lg",
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl font-bold text-default-90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CommentText, { content: props.username }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "w-32 h-auto", src: "/image/bilibili/直播中.png", alt: "直播中" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center text-4xl text-default-70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32 }),
            props.fans,
            "粉丝"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-50" })
    ] })
  ] });
};
const BilibiliLiveDynamicFooter = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-0 mr-20 -mb-11 text-7xl text-right text-default-80", children: [
      "哔哩哔哩",
      props.dynamicTYPE
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-11 h-auto pt-25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center pl-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BilibiliLiveDynamicHeader, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse items-center -mb-12 mr-19", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 ml-3 text-5xl text-right text-default-80", children: "动态分享链接" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-sm border-8 border-dashed border-default-80", children: props.qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: props.qrCodeDataUrl,
            alt: "二维码",
            className: "h-auto w-88"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center rounded bg-default-20 w-88 h-88", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-default-40", children: "二维码" }) }) })
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
const KuaishouQRCodeSection = ({
  qrCodeDataUrl,
  type,
  imageLength
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center -mr-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 flex items-center justify-center w-[600px] h-[600px] bg-white rounded-lg", children: qrCodeDataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: qrCodeDataUrl, alt: "二维码", className: "object-contain w-full h-full" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-center text-default-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { size: 80, className: "mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "二维码生成失败" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-[45px] text-center text-default-90", children: type === "视频" ? "视频直链(永久)" : type === "图集" ? `图集分享链接 共${imageLength}张` : "分享链接" })
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
            parent.innerHTML = '<div class="flex justify-center items-center h-full text-2xl font-bold text-gray-600">快手</div>';
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-default-90", children: [
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
const KuaishouCommentItemComponent = ({ comment }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex p-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: comment.userimageurl,
        className: "mb-12.5 w-[187.5px] h-[187.5px] rounded-full mr-8 object-cover shadow-lg",
        alt: "用户头像"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12.5 text-[50px] text-default-40 relative flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: comment.nickname }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-[60px] text-default-90 leading-relaxed mb-2 whitespace-pre-wrap [&_img]:mb-3 [&_img]:inline [&_img]:h-[1.4em] [&_img]:w-auto [&_img]:align-middle [&_img]:mx-1 [&_img]:max-w-[1.7em]",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.create_time }),
          comment.ip_label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[45px]", children: comment.ip_label }),
          comment.reply_comment_total && comment.reply_comment_total > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[40px] text-default-", children: [
            "共",
            comment.reply_comment_total,
            "条回复"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[40px] text-default-600", children: "回复" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 transition-colors cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 60, className: "stroke-current" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[50px]", children: comment.digg_count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 60, className: "stroke-current" }) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto mx-auto max-w-full", children: processedData.commentsArray.length > 0 ? processedData.commentsArray.map((comment, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(KuaishouCommentItemComponent, { comment }, index)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-20 text-gray-500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 64, className: "mx-auto mb-4 text-gray-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl", children: "暂无评论数据" })
    ] }) }) })
  ] }) });
});
const Comment = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  KuaishouComment
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
const MenuItemComponent = ({ item, useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `
        flex justify-center items-center font-bold cursor-pointer rounded-[26px] p-5 text-[34px]
        ${useDarkTheme ? "bg-[#1e1e1e] text-[cornsilk] hover:bg-[#d6d6d6]" : "bg-[#e9e9e9] text-black hover:bg-[#d6d6d6]"}
      `, children: item.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `
        flex text-[27px] mx-[15px] my-[10px] mb-5
        ${useDarkTheme ? "text-[#b4b4b4]" : "text-[#666]"}
      `, children: item.description.split("\\n").map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      line,
      index < item.description.split("\\n").length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
    ] }, index)) })
  ] });
};
const MenuGroupComponent = ({ group, useDarkTheme }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-around p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `
        flex-[0_0_88%] p-[45px] rounded-[70px_15px_70px_15px] shadow-[0_2px_20px_3px_rgba(0,0,0,0.21)]
        ${useDarkTheme ? "bg-[#303030]" : "bg-[#f4f4f4]"}
      `, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `
          text-[50px] m-0 mb-[15px]
          ${useDarkTheme ? "text-[cornsilk]" : "text-[#333]"}
        `, children: group.title }),
    group.subGroups?.map((subGroup, subIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `
            p-[60px] rounded-[70px_15px_70px_15px] shadow-[0_2px_20px_3px_rgba(0,0,0,0.21)] mb-[45px]
            ${useDarkTheme ? "bg-[#393939]" : "bg-[#f4f4f4]"}
          `, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `
              text-[xx-large] m-0 mb-[25px]
              ${useDarkTheme ? "text-[cornsilk]" : "text-[#333]"}
            `, children: subGroup.title }),
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
export {
  renderComponentToHtml as r
};
