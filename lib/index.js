import { createRequire } from 'module';
import { Config, logMiddleware, registerBilibiliRoutes, registerDouyinRoutes, registerKuaishouRoutes, logger, index_default, Version, Common } from './chunk-MOJBXM6T.js';
import { init_esm_shims } from './chunk-2FTP7FNI.js';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { app, mkdirSync, logger as logger$1 } from 'node-karin';
import express from 'node-karin/express';
import { karinPathBase } from 'node-karin/root';

createRequire(import.meta.url);

// src/index.ts
init_esm_shims();
var server = express();
var proxyOptions = {
  target: "https://developer.huawei.com",
  changeOrigin: true
};
server.use(cors());
server.use("/", createProxyMiddleware(proxyOptions));
server.listen(3780);
if (Config.app.APIServer && Config.app.APIServerMount) {
  app.use(logMiddleware(["/api/bilibili", "/api/douyin", "/api/kuaishou"]));
  app.use("/api/bilibili", registerBilibiliRoutes(Config.cookies.bilibili));
  app.use("/api/douyin", registerDouyinRoutes(Config.cookies.douyin));
  app.use("/api/kuaishou", registerKuaishouRoutes(Config.cookies.kuaishou));
  logger.mark(`Amagi server listening on ${logger.green("http://localhost:")}${logger.green(process.env.HTTP_PORT)} API docs: ${logger.yellow("https://amagi.apifox.cn")}`);
} else if (Config.app.APIServer) {
  const amagiServer = new index_default({
    bilibili: Config.cookies.bilibili,
    douyin: Config.cookies.douyin,
    kuaishou: Config.cookies.kuaishou
  });
  amagiServer.startClient(Config.app.APIServerPort);
}
var base = `${karinPathBase}/${Version.pluginName}`;
mkdirSync(`${base}/data`);
mkdirSync(Common.tempDri.images);
mkdirSync(Common.tempDri.video);
logger$1.info(`${logger$1.green(`[\u63D2\u4EF6:${Version.pluginName}]`)} ${logger$1.violet(`${Version.pluginVersion}`)} \u521D\u59CB\u5316\u5B8C\u6210~`);
