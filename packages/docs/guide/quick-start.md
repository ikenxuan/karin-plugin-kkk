---
title: 快速开始
icon: rocket
order: 1
---

**注意**：本文档由 AI 生成，可能存在错误或不完整的地方。请以插件实际行为为准。


**这是一个基于 [抖音](https://www.douyin.com)、[bilibili](https://www.bilibili.com) 和 [快手](https://www.kuaishou.com) 的 WEB API 编写的自用辅助插件，提供对 Bot 的视频解析功能，通过接口获取数据并渲染图片返回**

## 安装

- 插件市场安装（推荐）：通过 Karin WebUI 的插件市场直接安装与管理。
- 包管理器安装（手动更新也可使用该命令）：

```bash
pnpm add karin-plugin-kkk@latest -w
```

## 基本配置

- Cookies：在 Karin WebUI → 插件配置里填写抖音、B站、快手、小红书的 Cookies。
- 推荐设置：
  - `app.APIServer`：如需本地解析 API，开启它。
  - `app.APIServerMount`：需要挂载到 Karin 的 HTTP 端口时开启。
  - `app.renderScale`：默认 100，必要时提高渲染精细度。
  - `request.timeout`、`request.User-Agent`、`request.proxy.*`：网络不稳定或受限时可配置。

## 使用

- 发送包含抖音/B站/快手/小红书的链接，Bot 会自动解析并返回信息、评论图或视频文件（依据配置）。
- 使用 Web 管理界面：
  - 解析页面：`http://127.0.0.1:<HTTP_PORT>/kkk/`
  - 推送历史管理：`http://127.0.0.1:<HTTP_PORT>/kkk/database`
  - 若启用 `app.webAuth`，访问这些页面需要鉴权。

## 推送

- 在 `pushlist.yaml` 配置需要推送的用户与群号，支持抖音与 B 站。
- 在 `douyin.push` 与 `bilibili.push` 设置 `switch`、`permission`、`cron` 等。
- 可选开启自动解析动态并设置画质偏好与体积上限。

## 命令速览

- 解析相关：
  - `#解析` 或 `#kkk解析`：在解析总开关关闭时，对引用消息进行手动解析
  - 自动识别平台分享链接：抖音 / 哔哩哔哩 / 快手 / 小红书
- 推送管理：
  - `#抖音推送列表` / `#B站推送列表`：查看当前群订阅
  - `#设置抖音推送 + 抖音号`：订阅群内抖音博主更新
  - `#设置B站推送 + UP主UID`：订阅群内 B 站 UP 更新
  - `#抖音强制推送` / `#B站强制推送`：触发当前群一次定时任务
  - `#抖音全部强制推送` / `#B站全部强制推送`：触发所有群一次定时任务
- 其他：
  - `#kkk设置推送机器人 + Bot ID`：切换推送机器人
  - `#B站登录`：APP 扫码登录，获取 Cookies
  - `#kkk帮助`、`#kkk版本` / `#kkk更新日志`
  
## 鸣谢

**业务站点**

- [www.douyin.com](https://www.douyin.com) & [www.bilibili.com](https://www.bilibili.com) & [www.kuaishou.com](https://www.kuaishou.com)

本项目的开发参考了以下开源项目部分代码，排名不分先后

**接口文档与加密参数算法**

- [ikenxuan/amagi](https://github.com/ikenxuan/amagi)

**友情链接**

- Karin 框架 [**GitHub**](https://github.com/Karinjs/Karin) | [**文档**](https://karin.deno.dev)


## 开源协议
[GPL-3.0](https://github.com/ikenxuan/karin-plugin-kkk/blob/master/LICENSE)


## 反馈渠道

### ⏰ 获取即时支持
你可以加入我们的用户交流群: [795874649](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=S8y6baEcSkO6TEO5kEdfgmJhz79Oxdw5&authKey=ficWQytHGz3KIv5i0HpGbEeMBpABBXfjEMYRzo3ZwMV%2B0Y5mq8cC0Yxbczfa904H&noverify=0&group_code=795874649) 来提问

### 🐙 通过 GitHub issue
也可以给通过创建新的 [GitHub issue](https://github.com/ikenxuan/karin-plugin-kkk/issues/new/choose) 工单