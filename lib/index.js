import { l as libExports, e as distExports, f as logMiddleware, i as createBilibiliRoutes, j as createDouyinRoutes, k as createKuaishouRoutes, m as logger, C as Client, n as libExports$1 } from "./chunk/vendor-DvlK57W2.js";
import path from "node:path";
import { app, authMiddleware, mkdirSync, logger as logger$1 } from "node-karin";
import express from "node-karin/express";
import { karinPathBase } from "node-karin/root";
import "./chunk/db-DOXhvJxB.js";
import { Root } from "./root.js";
import "node:fs";
import { C as Config, v as videoStreamRouter, g as getVideoRouter, a as getLongLinkRouter, b as getDouyinDataRouter, c as getBilibiliDataRouter, d as getKuaishouDataRouter, e as getDouyinContentRouter, f as getBilibiliContentRouter, h as getGroupsRouter, i as getAuthorsRouter, j as addDouyinContentRouter, k as addBilibiliContentRouter, l as deleteContentRouter, m as Common } from "./chunk/main-D6cH7LSd.js";
import { w } from "./chunk/main-D6cH7LSd.js";
import "node-karin/axios";
import "stream/promises";
const server = express();
const proxyOptions = {
  target: "https://developer.huawei.com",
  changeOrigin: true
};
server.use(libExports());
server.use("/", distExports.createProxyMiddleware(proxyOptions));
server.listen(3780);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(["/api/bilibili", "/api/douyin", "/api/kuaishou"]));
  app.use("/api/bilibili", createBilibiliRoutes(Config.cookies.bilibili));
  app.use("/api/douyin", createDouyinRoutes(Config.cookies.douyin));
  app.use("/api/kuaishou", createKuaishouRoutes(Config.cookies.kuaishou));
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
app.get("/api/kkk/stream/:filename", videoStreamRouter);
app.get("/api/kkk/video/:filename", getVideoRouter);
const middleware = Config.app.webAuth ? [authMiddleware] : [];
app.use("/api/kkk/getLongLink", ...middleware, getLongLinkRouter);
app.use("/api/kkk/douyin/data", ...middleware, getDouyinDataRouter);
app.use("/api/kkk/bilibili/data", ...middleware, getBilibiliDataRouter);
app.use("/api/kkk/kuaishou/data", ...middleware, getKuaishouDataRouter);
app.get("/api/kkk/content/douyin", authMiddleware, getDouyinContentRouter);
app.get("/api/kkk/content/bilibili", authMiddleware, getBilibiliContentRouter);
app.get("/api/kkk/groups", authMiddleware, getGroupsRouter);
app.get("/api/kkk/authors", authMiddleware, getAuthorsRouter);
app.post("/api/kkk/content/douyin", authMiddleware, addDouyinContentRouter);
app.post("/api/kkk/content/bilibili", authMiddleware, addBilibiliContentRouter);
app.post("/api/kkk/content/delete", authMiddleware, deleteContentRouter);
const pluginRouter = express.Router();
const staticDir = path.join(Root.pluginPath, "lib", "web");
pluginRouter.use(
  libExports$1({
    rewrites: [{ from: /^\/kkk\/.*$/, to: "/kkk/index.html" }],
    htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
    disableDotRule: true
  })
);
pluginRouter.use(
  "/kkk",
  express.static(staticDir, {
    redirect: false
  })
);
app.use(pluginRouter);
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
