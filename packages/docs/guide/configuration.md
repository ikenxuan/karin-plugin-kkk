---
title: 配置
icon: sliders
order: 3
---

## 配置总览

- 配置位于插件数据目录，首次运行会从 `karin-project/node_modules/karin-plugin-kkk/config/default_config/*.yaml` 初始化。
- 在 Karin WebUI 可视化修改，或直接编辑对应 YAML 文件。

## Cookies

```yaml
# @karinjs/karin-plugin-kkk/config/cookies.yaml
douyin: "<你的抖音 Cookies>"
bilibili: "<你的 B 站 Cookies>"
kuaishou: "<你的快手 Cookies>"
xiaohongshu: "<你的小红书 Cookies>"
```

## 应用设置 `app`

- `videoTool`: 默认解析优先级开关
- `priority`: 关闭默认解析后使用自定义优先级
- `removeCache`: 下载缓存自动删除
- `renderScale`: 模板渲染精度（50~200，建议 100）
- `APIServer` / `APIServerPort`: 本地解析 API 服务与端口
- `APIServerMount`: 挂载到 Karin 的 HTTP 端口
- `Theme` / `RemoveWatermark` / `RenderWaitTime` / `EmojiReply` / `EmojiReplyID`
- `webAuth`: Web 页面鉴权
- `errorLogSendTo`: 错误日志接收人
- `multiPageRender` / `multiPageHeight`: 分页渲染设置

示例：

```yaml
APIServer: true
APIServerMount: true
APIServerPort: 4567
renderScale: 100
webAuth: true
```

## 请求配置 `request`

- `timeout`: 请求超时时间（ms）
- `User-Agent`: 浏览器 UA
- `proxy`: 可选代理，支持 `http|https` 与认证

```yaml
timeout: 30000
User-Agent: "Mozilla/5.0 ..."
proxy:
  switch: false
  host: ""
  port: ""
  protocol: "http"
  auth:
    username: ""
    password: ""
```

## 平台配置

- 抖音 `douyin.*`：
  - `switch`、`tip`、`sendContent: ['info'|'comment'|'video']`
  - `numcomment`、`realCommentCount`
  - `videoQuality: 'adapt'|'540p'|'720p'|'1080p'|'2k'|'4k'`
  - `maxAutoVideoSize`
  - `loginPerm`
  - `videoInfoMode: 'text'|'image'`
  - `displayContent: ['cover'|'title'|'author'|'stats']`
  - `push.*`（`permission`、`cron`、`parsedynamic`、`log`、`shareType`、`videoQuality`、`maxAutoVideoSize`）
- B 站 `bilibili.*`：
  - `switch`、`tip`、`sendContent: ['info'|'comment'|'video']`
  - `numcomment`、`realCommentCount`、`videopriority`
  - `videoQuality: 0|6|16|32|64|74|80|112|116|120|127`
  - `maxAutoVideoSize`
  - `loginPerm`
  - `imageLayout: 'vertical'|'waterfall'|'grid'|'auto'`
  - `videoInfoMode: 'text'|'image'`
  - `displayContent: ['cover'|'title'|'author'|'stats'|'desc']`
  - `push.*`（`permission`、`cron`、`parsedynamic`、`log`、`pushVideoQuality`、`pushMaxAutoVideoSize`）
- 快手 `kuaishou.*`：
  - `switch`、`tip`、`comment`、`numcomment`
- 小红书 `xiaohongshu.*`：
  - `switch`、`tip`、`sendContent: ['info'|'comment'|'image'|'video']`
  - `numcomment`
  - `videoQuality: 'adapt'|'540p'|'720p'|'1080p'|'2k'|'4k'`
  - `maxAutoVideoSize`

## 推送列表 `pushlist`

- 抖音项：`sec_uid | short_id` 二选一，`group_id` 必填（`群号:机器人账号`）
- B 站项：`host_mid` 必填，`group_id` 必填

```yaml
douyin:
  - switch: true
    short_id: "xxxxxx"
    sec_uid: "xxxxxx"
    group_id: ["1145141919810:8888888888"]
    remark: "示例博主"
bilibili:
  - switch: true
    host_mid: 12345678
    group_id: ["1145141919810:8888888888"]
    remark: "示例UP主"
```