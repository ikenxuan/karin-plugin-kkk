import path from "node:path";
import { a6 as libExports, a7 as distExports, a8 as logMiddleware, a9 as createBilibiliRoutes, aa as createDouyinRoutes, ab as createKuaishouRoutes, l as logger, C as Client, ac as libExports$1 } from "./core_chunk/vendor-DzjX4fzz.js";
import { authMiddleware, app as app$1, mkdirSync, logger as logger$1 } from "node-karin";
import express from "node-karin/express";
import { karinPathBase } from "node-karin/root";
import "./core_chunk/db-CT-12x9I.js";
import { Root } from "./root.js";
import "node:fs";
import { C as Config, v as videoStreamRouter, g as getVideoRouter, s as signatureVerificationMiddleware, a as getLongLinkRouter, b as getDouyinDataRouter, c as getBilibiliDataRouter, d as getKuaishouDataRouter, e as getDouyinContentRouter, f as getBilibiliContentRouter, h as getGroupsRouter, i as getAuthorsRouter, j as addDouyinContentRouter, k as addBilibiliContentRouter, l as deleteContentRouter, m as Common } from "./core_chunk/main-CFxN6OYP.js";
import { w } from "./core_chunk/main-CFxN6OYP.js";
import "node-karin/axios";
import "stream/promises";
import "./core_chunk/template.js";
const { initAllDatabases } = await import("./core_chunk/db-CT-12x9I.js");
await initAllDatabases();
const server = express();
const proxyOptions = {
  target: "https://developer.huawei.com",
  changeOrigin: true
};
server.use(libExports());
server.use("/", distExports.createProxyMiddleware(proxyOptions));
server.listen(3780);
const app = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(["/api/bilibili", "/api/douyin", "/api/kuaishou"]));
  app.use("/amagi/api/bilibili", createBilibiliRoutes(Config.cookies.bilibili));
  app.use("/amagi/api/douyin", createDouyinRoutes(Config.cookies.douyin));
  app.use("/amagi/api/kuaishou", createKuaishouRoutes(Config.cookies.kuaishou));
  logger.mark(`Amagi server listening on ${logger.green("http://localhost:")}${logger.green(process.env.HTTP_PORT)} API docs: ${logger.yellow("https://amagi.apifox.cn")}`);
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    cookies: {
      bilibili: Config.cookies.bilibili,
      douyin: Config.cookies.douyin,
      kuaishou: Config.cookies.kuaishou
    }
  });
  amagiServer.startServer(Config.app.APIServerPort);
}
app.get("/stream/:filename", videoStreamRouter);
app.get("/video/:filename", getVideoRouter);
const middleware = Config.app.webAuth ? [authMiddleware, signatureVerificationMiddleware] : [];
app.use("/getLongLink", ...middleware, getLongLinkRouter);
app.use("/douyin/data", ...middleware, getDouyinDataRouter);
app.use("/bilibili/data", ...middleware, getBilibiliDataRouter);
app.use("/kuaishou/data", ...middleware, getKuaishouDataRouter);
app.get("/content/douyin", authMiddleware, signatureVerificationMiddleware, getDouyinContentRouter);
app.get("/content/bilibili", authMiddleware, signatureVerificationMiddleware, getBilibiliContentRouter);
app.get("/groups", authMiddleware, signatureVerificationMiddleware, getGroupsRouter);
app.get("/authors", authMiddleware, signatureVerificationMiddleware, getAuthorsRouter);
app.post("/content/douyin", authMiddleware, signatureVerificationMiddleware, addDouyinContentRouter);
app.post("/content/bilibili", authMiddleware, signatureVerificationMiddleware, addBilibiliContentRouter);
app.post("/content/delete", authMiddleware, signatureVerificationMiddleware, deleteContentRouter);
const staticRouter = express.Router();
staticRouter.use(express.static(path.join(Root.pluginPath, "lib", "web_chunk"), {
  redirect: false,
  // 添加静态资源的缓存控制
  setHeaders: (res, path2) => {
    if (path2.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache");
    } else {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    }
  }
}));
staticRouter.use(
  libExports$1({
    htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
    rewrites: [
      {
        from: /^\/kkk\/(?!.*\.[a-zA-Z0-9]+$).*$/,
        to: "/kkk/index.html"
      }
    ],
    disableDotRule: true
  })
);
staticRouter.use(express.static(path.join(Root.pluginPath, "lib", "web_chunk"), {
  redirect: false
}));
app$1.use("/kkk", staticRouter);
app$1.use("/api/kkk", app);
const base = `${karinPathBase}/${Root.pluginName}`;
mkdirSync(`${base}/data`);
mkdirSync(Common.tempDri.images);
mkdirSync(Common.tempDri.video);
console.log("");
console.log("-------------------------- karin-plugin-kkk --------------------------");
logger$1.info(`${logger$1.violet(`[插件:v${Root.pluginVersion}]`)} ${logger$1.green(Root.pluginName)} 初始化完成~`);
logger$1.info(`${logger$1.violet("[server]")} ${logger$1.yellow("外部解析页面:")} ${logger$1.green(`http://127.0.0.1:${process.env.HTTP_PORT}/kkk/`)}`);
logger$1.info(`${logger$1.violet("[server]")} ${logger$1.yellow("推送历史管理:")} ${logger$1.green(`http://127.0.0.1:${process.env.HTTP_PORT}/kkk/database`)}`);
console.log("-------------------------- karin-plugin-kkk --------------------------");
console.log("");
export {
  w as webConfig
};
