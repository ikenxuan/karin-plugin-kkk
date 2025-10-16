---
title: FAQ
icon: circle-question
order: 7
---

### Q: 无法解析或返回空？

- 请检查平台 Cookies 是否有效且未过期。
- 设置合适的 `request.User-Agent` 和（必要时）`request.proxy.*`。
- 若网络受限，考虑设置代理。

### Q: 访问 `/kkk/` 提示需要鉴权？

- 检查 `app.webAuth` 是否开启；如不需要鉴权可关闭。

### Q: 推送无效或没有入群？

- 确认 `pushlist.yaml` 中的 `group_id` 格式为 `群号:机器人账号`，并确保对应机器人已在群中。
- 检查 `douyin.push.switch` / `bilibili.push.switch` 与 `cron` 是否正确。

### Q: 解析返回的视频太大或太小？

- 自动模式下调整 `maxAutoVideoSize`。
- 固定画质模式下直接设置 `videoQuality` 到目标画质。

### Q: 是否支持小红书？

- 支持。可解析笔记信息、评论、图片与视频；支持表情解析与视频画质/体积自适应（`xiaohongshu.*`）。

### Q: 如何手动强制推送一次？

- 在群内发送：`#抖音强制推送` / `#B站强制推送`（仅当前群）
- 全局强制：`#抖音全部强制推送` / `#B站全部强制推送`（所有订阅群）