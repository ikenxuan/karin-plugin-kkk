import { createRequire } from 'module';
import { Render, Config, Version, Common } from '../chunk-R3POE3NG.js';
import { init_esm_shims } from '../chunk-2FTP7FNI.js';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { markdown } from '@karinjs/md-html';
import karin, { mkdirSync, render, segment, isPackaged, updatePkg, updateGitPlugin, logger, common, restart } from 'node-karin';
import { karinPathTemp } from 'node-karin/root';

createRequire(import.meta.url);

// src/apps/help.ts
init_esm_shims();
var help = karin.command(/^#?kkk帮助$/, async (e) => {
  const img = await Render("help/index");
  await e.reply(img);
  return true;
}, { name: "kkk-\u5E2E\u52A9" });
var version = karin.command(/^#?kkk版本$/, async (e) => {
  Config.douyin.push.switch = false;
  const changelogs2 = fs.readFileSync(Version.pluginPath + "/CHANGELOG.md", "utf8");
  const html = markdown(changelogs2, {
    gitcss: Common.useDarkTheme() ? "github-markdown-dark.css" : "github-markdown-light.css"
  });
  mkdirSync(`${karinPathTemp}/html/${Version.pluginName}/version`);
  const htmlPath = `${karinPathTemp}/html/${Version.pluginName}/version/version.html`;
  fs.writeFileSync(htmlPath, html);
  const img = await render.renderHtml(htmlPath);
  await e.reply(segment.image("base64://" + img));
  return true;
}, { name: "kkk-\u7248\u672C" });
var changelogs = karin.command(/^#?kkk更新日志$/, async (e) => {
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
  mkdirSync(`${karinPathTemp}/html/${Version.pluginName}/version`);
  const htmlPath = `${karinPathTemp}/html/${Version.pluginName}/version/changelogs.html`;
  fs.writeFileSync(htmlPath, html);
  const img = await render.renderHtml(htmlPath);
  await e.reply(segment.image("base64://" + img));
  return true;
}, { name: "kkk-\u66F4\u65B0\u65E5\u5FD7" });
var update = karin.command(/^#?kkk更新(预览版)?$/, async (e) => {
  let status = "failed";
  let data = "";
  if (isPackaged) {
    if (e.msg.includes("\u9884\u89C8\u7248")) {
      const resolve = await updatePkg(Version.pluginName, "beta");
      status = resolve.status;
      data = resolve.data;
    } else {
      const resolve = await updatePkg(Version.pluginName);
      status = resolve.status;
      data = resolve.data;
    }
  } else {
    let cmd = "git pull";
    if (e.msg.includes("\u5F3A\u5236")) {
      cmd = "git reset --hard && git pull --allow-unrelated-histories";
    }
    const resolve = await updateGitPlugin(Version.pluginPath, cmd);
    status = resolve.status;
    data = resolve.data;
  }
  logger.debug(data);
  await e.bot.sendForwardMsg(e.contact, common.makeForward([segment.text(`\u66F4\u65B0 ${Version.pluginName}...
${JSON.stringify(data)}`)], e.sender.userId, e.sender.nick));
  if (status === "ok") {
    try {
      await e.reply(`
\u66F4\u65B0\u5B8C\u6210\uFF0C\u5F00\u59CB\u91CD\u542F \u672C\u6B21\u8FD0\u884C\u65F6\u95F4\uFF1A${common.uptime()}`, { at: true });
      await restart(e.selfId, e.contact, e.messageId);
      return true;
    } catch (error) {
      await e.reply(`${Version.pluginName}\u91CD\u542F\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u91CD\u542F\u4EE5\u5E94\u7528\u66F4\u65B0\uFF01`);
    }
  }
  return true;
}, { name: "kkk-\u66F4\u65B0", perm: "master" });
var getLatestCommitsSync = () => {
  const command = 'git log -150 --pretty=format:"%h %an %s"';
  const output = execSync(command, { cwd: Version.pluginPath }).toString();
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
var setColor = (message) => {
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

export { changelogs, help, update, version };
