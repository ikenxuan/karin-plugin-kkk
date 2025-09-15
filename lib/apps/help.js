import fs from "node:fs";
import { markdown } from "@karinjs/md-html";
import karin, { logs, mkdirSync, render, segment } from "node-karin";
import { karinPathTemp } from "node-karin/root";
import "../core_chunk/db-Xyd6BKjR.js";
import { Root } from "../root.js";
import "../core_chunk/vendor-Yjj8KS7G.js";
import { R as Render, m as Common } from "../core_chunk/main-XE20F5Nl.js";
import "node-karin/axios";
import "stream/promises";
const help = karin.command(/^#?kkk帮助$/, async (e) => {
  const img = await Render("other/help");
  await e.reply(img);
  return true;
}, { name: "kkk-帮助" });
const version = karin.command(/^#?kkk(版本|更新日志)$/, async (e) => {
  const changelogContent = fs.readFileSync(Root.pluginPath + "/CHANGELOG.md", "utf8");
  const forwardLogs = logs(Root.pluginVersion, changelogContent, 10, false);
  const html = markdown(forwardLogs, {
    gitcss: Common.useDarkTheme() ? "github-markdown-dark.css" : "github-markdown-light.css",
    scale: 5,
    customCSSFiles: [
      Root.pluginPath + "/resources/font/font.css"
    ],
    fontFamily: "HarmonyOSHans-Regular"
  });
  mkdirSync(`${karinPathTemp}/html/${Root.pluginName}/version`);
  const htmlPath = `${karinPathTemp}/html/${Root.pluginName}/version/version.html`;
  fs.writeFileSync(htmlPath, html);
  const img = await render.renderHtml(htmlPath);
  await e.reply(segment.image("base64://" + img));
  return true;
}, { name: "kkk-版本" });
export {
  help,
  version
};
