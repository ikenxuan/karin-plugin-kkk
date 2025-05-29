import { execSync } from "node:child_process";
import fs from "node:fs";
import { m as markdown } from "../chunk/vendor-BnVODeEf.js";
import karin, { mkdirSync, render, segment, isPackaged, updatePkg, updateGitPlugin, logger, common, restart } from "node-karin";
import { karinPathTemp } from "node-karin/root";
import "sequelize";
import "../chunk/db-DYeB5mHU.js";
import { Root } from "../root.js";
import { R as Render, C as Config, a as Common } from "../chunk/main-_nnrpEhF.js";
import "node-karin/axios";
import "stream/promises";
const help = karin.command(/^#?kkk帮助$/, async (e) => {
  const img = await Render("help/index");
  await e.reply(img);
  return true;
}, { name: "kkk-帮助" });
const version = karin.command(/^#?kkk版本$/, async (e) => {
  Config.douyin.push.switch = false;
  const changelogs2 = fs.readFileSync(Root.pluginPath + "/CHANGELOG.md", "utf8");
  const html = markdown(changelogs2, {
    gitcss: Common.useDarkTheme() ? "github-markdown-dark.css" : "github-markdown-light.css"
  });
  mkdirSync(`${karinPathTemp}/html/${Root.pluginName}/version`);
  const htmlPath = `${karinPathTemp}/html/${Root.pluginName}/version/version.html`;
  fs.writeFileSync(htmlPath, html);
  const img = await render.renderHtml(htmlPath);
  await e.reply(segment.image("base64://" + img));
  return true;
}, { name: "kkk-版本" });
const changelogs = karin.command(/^#?kkk更新日志$/, async (e) => {
  const commits = getLatestCommitsSync();
  let htmlString = "";
  for (const commit of commits) {
    htmlString += `
<div align="center" style="padding: 3em; border: ${setColor(commit.message)}; border-radius: 0 50px 25px 100px;">
<p align="left" style="font-size: 1.5em; font-weight: 700;">${commit.message}</p>
<p align="right" style="font-size: 1.15em">COMMITTER: ${commit.committer}</p>
<p align="right" style="font-size: 1em">SHA: ${commit.sha}</p>
</div><br>
`;
  }
  const html = markdown(htmlString, {
    gitcss: Common.useDarkTheme() ? "github-markdown-dark.css" : "github-markdown-light.css"
  });
  mkdirSync(`${karinPathTemp}/html/${Root.pluginName}/version`);
  const htmlPath = `${karinPathTemp}/html/${Root.pluginName}/version/changelogs.html`;
  fs.writeFileSync(htmlPath, html);
  const img = await render.renderHtml(htmlPath);
  await e.reply(segment.image("base64://" + img));
  return true;
}, { name: "kkk-更新日志" });
const update = karin.command(/^#?kkk更新(预览版)?$/, async (e) => {
  let status = "failed";
  let data = "";
  if (isPackaged) {
    if (e.msg.includes("预览版")) {
      const resolve = await updatePkg(Root.pluginName, "beta");
      status = resolve.status;
      data = resolve.data;
    } else {
      const resolve = await updatePkg(Root.pluginName);
      status = resolve.status;
      data = resolve.data;
    }
  } else {
    let cmd = "git pull";
    if (e.msg.includes("强制")) {
      cmd = "git reset --hard && git pull --allow-unrelated-histories";
    }
    const resolve = await updateGitPlugin(Root.pluginPath, cmd);
    status = resolve.status;
    data = resolve.data;
  }
  logger.debug(data);
  await e.bot.sendForwardMsg(e.contact, common.makeForward([segment.text(`更新 ${Root.pluginName}...
${JSON.stringify(data)}`)], e.sender.userId, e.sender.nick));
  if (status === "ok") {
    try {
      await e.reply(`
更新完成，开始重启 本次运行时间：${common.uptime()}`, { at: true });
      await restart(e.selfId, e.contact, e.messageId);
      return true;
    } catch (error) {
      await e.reply(`${Root.pluginName}重启失败，请手动重启以应用更新！`);
    }
  }
  return true;
}, { name: "kkk-更新", perm: "master" });
const getLatestCommitsSync = () => {
  const command = 'git log -150 --pretty=format:"%h %an %s"';
  const output = execSync(command, { cwd: Root.pluginPath }).toString();
  const commits = output.trim().split("\n");
  return commits.map((commit) => {
    const [sha, ...rest] = commit.split(" ");
    const spaceIndex = rest.findIndex((word) => word.includes(":"));
    const committerAndMessage = rest.slice(0, spaceIndex);
    const committer = committerAndMessage.join(" ");
    const message = rest.slice(spaceIndex).join(" ").replace(/^:/, "").trim();
    return { sha, committer, message };
  }).slice(0, 50);
};
const setColor = (message) => {
  switch (true) {
    case message.includes("feat"):
      return "10px solid #a9ffb9";
    case message.includes("fix"):
      return "10px solid #ffe96e;";
    case message.includes("perf"):
      return "10px solid #928eff";
    case message.includes("refactor"):
      return "10px solid #ff3b3b";
    default:
      return "2px solid";
  }
};
export {
  changelogs,
  help,
  update,
  version
};
