import { join } from "node:path";
import { render, segment } from "node-karin";
import "sequelize";
import { C as Config, d as Common } from "./douyin-C9WdzMfg.js";
import { Version } from "../Version.js";
import "node:fs";
import "node-karin/axios";
import "stream/promises";
function scale(pct = 1) {
  const scale2 = Math.min(2, Math.max(0.5, Number(Config.app.renderScale) / 100));
  pct = pct * scale2;
  return `style=transform:scale(${pct})`;
}
async function Render(path, params) {
  const basePaths = {
    douyin: "douyin/html",
    bilibili: "bilibili/html",
    admin: "admin/html",
    kuaishou: "kuaishou/html",
    help: "help/html"
  };
  const platform = Object.keys(basePaths).find((key) => path.startsWith(key));
  let newPath = path.substring(platform.length);
  if (newPath.startsWith("/")) {
    newPath = newPath.substring(1);
  }
  path = `${basePaths[platform]}/${newPath}`;
  const renderOpt = {
    pageGotoParams: {
      waitUntil: "load",
      timeout: Config.app.RenderWaitTime * 1e3
    },
    name: `${Version.pluginName}/${platform}/${newPath}/`.replace(/\\/g, "/"),
    file: `${Version.pluginPath}/resources/template/${path}.html`,
    type: "jpeg"
  };
  const img = await render.render({
    ...renderOpt,
    multiPage: 12e3,
    encoding: "base64",
    data: {
      ...params,
      _res_path: (join(Version.pluginPath, "/resources") + "/").replace(/\\/g, "/"),
      _layout_path: (join(Version.pluginPath, "/resources", "template", "extend") + "/").replace(/\\/g, "/"),
      defaultLayout: (join(Version.pluginPath, "/resources", "template", "extend", "html") + "/default.html").replace(/\\/g, "/"),
      sys: {
        scale: scale(params?.scale ?? 1)
      },
      pluResPath: `${Version.pluginPath}/resources/`,
      copyright: Config.app.RemoveWatermark ? "" : `<span class="name">kkk</span><span class="version">${Version.pluginVersion} ${releaseType()}</span> Powered By <span class="name">Karin</span>`,
      useDarkTheme: Common.useDarkTheme()
    },
    screensEval: "#container"
  });
  const ret = [];
  for (const imgae of img) {
    ret.push(segment.image("base64://" + imgae));
  }
  return ret;
}
const releaseType = () => {
  const versionPattern = /^\d+\.\d+\.\d+$/;
  if (versionPattern.test(Version.pluginVersion)) {
    return "Stable";
  } else {
    return "Preview";
  }
};
export {
  Render as R
};
