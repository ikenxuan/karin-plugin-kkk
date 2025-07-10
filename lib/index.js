import { l as libExports, f as distExports, i as logMiddleware, j as createDouyinRoutes, k as createBilibiliRoutes, m as createKuaishouRoutes, n as logger, C as Client } from "./chunk/vendor-BgqCd-mU.js";
import { app, mkdirSync, logger as logger$1 } from "node-karin";
import express from "node-karin/express";
import { karinPathBase } from "node-karin/root";
import "./chunk/db-Ba5Pt9Y7.js";
import { Root } from "./root.js";
import "node:fs";
import { C as Config, v as videoStreamRouter, g as getVideoRouter, a as Common } from "./chunk/main-B6rcZzaU.js";
import { w } from "./chunk/main-B6rcZzaU.js";
import "node-karin/axios";
import "stream/promises";
import "node:path";
const server = express();
const proxyOptions = {
  target: "https://developer.huawei.com",
  changeOrigin: true
};
server.use(libExports());
server.use("/", distExports.createProxyMiddleware(proxyOptions));
server.listen(3780);
if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(["/api/bilibili", "/api/douyin", "/api/kuaishou"]));
  app.use("/api/bilibili", createDouyinRoutes(Config.cookies.bilibili));
  app.use("/api/douyin", createBilibiliRoutes(Config.cookies.douyin));
  app.use("/api/kuaishou", createKuaishouRoutes(Config.cookies.kuaishou));
  logger.mark(`Amagi server listening on ${logger.green("http://localhost:")}${logger.green(process.env.HTTP_PORT)} API docs: ${logger.yellow("https://amagi.apifox.cn")}`);
} else if (Config.app.APIServer) {
  const amagiServer = new Client({
    bilibili: Config.cookies.bilibili,
    douyin: Config.cookies.douyin,
    kuaishou: Config.cookies.kuaishou
  });
  amagiServer.startClient(Config.app.APIServerPort);
}
app.get("/api/kkk/stream/:filename", videoStreamRouter);
app.get("/api/kkk/video/:filename", getVideoRouter);
const base = `${karinPathBase}/${Root.pluginName}`;
mkdirSync(`${base}/data`);
mkdirSync(Common.tempDri.images);
mkdirSync(Common.tempDri.video);
logger$1.info(`${logger$1.green(`[插件:${Root.pluginName}]`)} ${logger$1.violet(`v${Root.pluginVersion}`)} 初始化完成~`);
export {
  w as webConfig
};
