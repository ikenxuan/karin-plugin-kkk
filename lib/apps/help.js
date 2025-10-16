import fs from "node:fs";
import { markdown } from "@karinjs/md-html";
import karin, { config, logs, mkdirSync, render } from "node-karin";
import { karinPathTemp } from "node-karin/root";
import "../core_chunk/db-KaHunDgP.js";
import { Root } from "../root.js";
import "../core_chunk/vendor-DzjX4fzz.js";
import { R as Render, m as Common } from "../core_chunk/main-D28CJADk.js";
import "node-karin/axios";
import "stream/promises";
const HELP_MENU_CONFIG = [
  {
    title: "常用功能",
    items: [
      {
        title: "自动识别个平台的分享链接",
        description: "支持「抖音」「哔哩哔哩」「快手」「小红书」",
        icon: "link",
        roles: ["member", "master"]
      },
      {
        title: "「#解析」「#kkk解析」",
        description: "在解析功能关闭的情况下，可对引用消息进行解析",
        icon: "Sparkles",
        roles: ["member", "master"]
      }
    ]
  },
  {
    title: "推送相关",
    items: [
      {
        title: "#抖音/B站推送列表",
        description: "查看当前群的订阅推送列表",
        icon: "List",
        roles: ["master"]
      },
      {
        title: "#抖音/B站全部?强制推送",
        description: "全部强制推送：手动模拟一次定时任务；\n强制推送：只在触发群模拟一次定时任务；\n已推送过的不会再推送",
        icon: "Send",
        roles: ["master"]
      }
    ],
    subGroups: [
      {
        title: "在群聊中再发送一次即可取消订阅",
        items: [
          {
            title: "#设置抖音推送 + 抖音号",
            description: "在群聊中发送以对该群订阅该blogger的作品更新",
            icon: "Bell",
            roles: ["member", "master"]
          },
          {
            title: "#设置B站推送 + UP主UID",
            description: "在群聊中发送以对该群订阅该blogger的作品更新",
            icon: "Bell",
            roles: ["member", "master"]
          }
        ]
      }
    ]
  },
  {
    title: "设置相关",
    items: [
      {
        title: "#kkk设置推送机器人 + Bot ID",
        description: "一键更换推送机器人",
        icon: "Bot",
        roles: ["master"]
      },
      {
        title: "#B站登录",
        description: "使用哔哩哔哩APP扫码登录获取 Cookies",
        icon: "LogIn",
        roles: ["master"]
      }
    ]
  },
  {
    title: "其他",
    items: [
      {
        title: "「#kkk更新日志」「#kkk更新」",
        description: "字面意思~",
        icon: "RefreshCw",
        roles: ["member", "master"]
      }
    ]
  }
];
function buildMenuForRole(role) {
  const filterItems = (items = []) => items.filter((i) => !i.roles || i.roles.includes(role)).map(({ title, description, icon }) => ({ title, description, icon }));
  return HELP_MENU_CONFIG.map((group) => {
    const items = filterItems(group.items);
    const subGroups = group.subGroups?.map((sg) => ({ title: sg.title, items: filterItems(sg.items) })).filter((s) => s.items.length > 0);
    return { title: group.title, items, subGroups };
  }).filter((g) => g.items.length > 0 || g.subGroups && g.subGroups.length > 0);
}
const help = karin.command(/^#?kkk帮助$/, async (e) => {
  const masters = config.master().filter((id) => id !== "console");
  const isMaster = !!e.sender && masters.includes(e.sender.userId);
  const role = isMaster ? "master" : "member";
  const menu = buildMenuForRole(role);
  const img = await Render("other/help", {
    title: "KKK插件帮助页面",
    menu,
    role
  });
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
  const base64 = await render.renderHtml(htmlPath);
  const img = await Render("other/changelog", {
    changeLogImg: `data:image/png;base64,${base64}`,
    Tip: false
  });
  await e.reply(img);
  return true;
}, { name: "kkk-版本" });
export {
  help,
  version
};
