---
title: 使用
icon: play
order: 4
---

## 解析

- 在聊天中发送包含平台链接的消息，插件会自动识别并解析。
- 返回内容由 `sendContent` 控制：`info`（视频/笔记信息）、`comment`（评论图）、`image`（仅小红书笔记）、`video`（视频文件）。
- 文本/图片模式由 `videoInfoMode` 控制。

## 平台支持与解析内容

- 抖音：作品信息、评论、视频文件；支持推送订阅与分享二维码类型（`web|download`）
- 哔哩哔哩：视频信息、评论、动态（含图文/视频）、番剧播放信息（登录/会员项视 Cookies 而定）
- 快手：视频评论图与视频文件（状态为可解析的视频）
- 小红书：笔记信息、评论、笔记图片与视频，支持表情解析与画质/体积自适应

## Web 管理

- 解析页面：`/kkk/`
- 推送历史：`/kkk/database`
- 若启用 `webAuth`，访问这些页面需经过鉴权。

## 手动解析命令

- `#解析` 或 `#kkk解析`：在总开关关闭时，对引用消息进行解析
- 自动识别分享链接：抖音 / 哔哩哔哩 / 快手 / 小红书

## 登录与权限

- 扫码登录权限：`loginPerm` 支持 `all | admin | master | group.owner | group.admin`。
- 推送设置权限：`douyin.push.permission`、`bilibili.push.permission` 同上。

## 画质与体积限制

- 抖音/小红书：`videoQuality` 可设定 `'adapt' | '540p' | '720p' | '1080p' | '2k' | '4k'`，自动模式受 `maxAutoVideoSize` 控制（单位：MB）
- B 站：`videoQuality` 可设定 `0 | 6 | 16 | 32 | 64 | 74 | 80 | 112 | 116 | 120 | 127`，自动模式受 `maxAutoVideoSize` 控制（单位：MB）

## 图片 UI 与反馈

- 模板渲染统一、信息密度高：封面、标题、作者、统计信息、评论内容等统一风格输出
- 可开启消息表情反馈：`app.EmojiReply` 与自定义表情 `EmojiReplyID`