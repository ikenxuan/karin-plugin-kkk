<p align="center">
  <img src="./assets/readme/banner-d-render-gallery.svg" width="100%" alt="karin-plugin-kkk 的视频详情、抖音评论、B站动态推送和解析统计动画成果墙">
</p>

<p align="center">
  基于 <a href="https://github.com/KarinJS/Karin">Karin</a> 的多平台短视频、图文内容解析与动态推送插件。<br>
  自动识别分享链接，提取视频、图集、热评与动态内容，并渲染成适合群聊直接浏览的图片。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/karin-plugin-kkk"><img src="https://img.shields.io/npm/v/karin-plugin-kkk?style=flat-square&logo=npm&logoColor=white&color=CB3837&label=npm" alt="npm 版本"></a>
  <a href="https://www.npmjs.com/package/karin-plugin-kkk"><img src="https://img.shields.io/npm/dw/karin-plugin-kkk?style=flat-square&logo=npm&logoColor=white&color=CB3837&label=下载" alt="npm 周下载量"></a>
  <a href="https://www.npmjs.com/package/karin-plugin-kkk"><img src="https://img.shields.io/npm/unpacked-size/karin-plugin-kkk?style=flat-square&logo=npm&color=CB3837&label=包大小" alt="npm 解包大小"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/github/license/ikenxuan/karin-plugin-kkk?style=flat-square&logo=github&label=许可证" alt="GPL-3.0 许可证"></a>
</p>

<p align="center">
  <a href="https://kkk.karinjs.com">使用文档</a> ·
  <a href="https://kkk.karinjs.com/docs/guide/quick-start">快速开始</a> ·
  <a href="https://kkk.karinjs.com/docs/guide/configuration">配置说明</a> ·
  <a href="https://github.com/ikenxuan/karin-plugin-kkk/issues/new/choose">问题反馈</a>
</p>

## 核心能力

> 分享链接、短链、BV / av 号与 App 分享文本 → 自动识别 → 媒体解析 → 卡片渲染或动态推送

- **多平台自动解析** — 识别抖音、B站、快手、小红书分享内容，无需手动复制资源地址。
- **视频与图文处理** — 提取视频、图集、作者与互动数据，并根据场景发送媒体或渲染卡片。
- **评论区渲染** — 展示热评、楼中楼、图片评论和评论二维码。
- **动态订阅推送** — 为抖音和 B站提供订阅、筛选、强制推送与统计能力。
- **增强媒体能力** — 支持弹幕烧录、Live Photo 兼容导出、视频压缩和临时预览。
- **30+ 卡片组件** — 覆盖视频详情、动态、评论、帮助、登录、统计与错误诊断，并适配深浅主题。

## 快速开始

### 1. 准备环境

- Karin >= 1.14.0
- Node.js >= 18
- FFmpeg 或 [karin-plugin-ffmpeg](https://github.com/KarinJS/karin-plugin-ffmpeg)

### 2. 安装插件

推荐在 Karin WebUI 插件市场搜索 `karin-plugin-kkk` 直接安装。手动管理依赖时可以执行：

```bash
pnpm add karin-plugin-kkk@latest -w
```

### 3. 配置并试跑

打开 Karin WebUI → 插件配置 → `karin-plugin-kkk`，优先配置抖音与 B站 Cookie。插件启动后发送受支持的分享链接即可自动解析，也可以引用消息后发送：

```text
#解析
#kkk解析
#弹幕解析
```

> [!TIP]
> 其他配置都有默认值兜底。Cookie 主要影响高画质、扫码登录、动态推送与接口稳定性，基础解析可以先直接试跑。

## 常用命令

- `#kkk帮助` — 查看当前命令菜单。
- `#抖音登录` / `#B站登录` — 扫码获取并写入平台 Cookie。
- `#设置抖音推送 抖音号` — 订阅或取消订阅抖音创作者。
- `#设置B站推送 UID` — 订阅或取消订阅 B站创作者。
- `#kkk解析统计` — 查看当前群解析统计。
- `#kkk全局解析统计` — 查看全局解析趋势，仅主人可用。
- `#kkk版本` / `#kkk更新日志` — 查看当前版本与本地更新日志。

## 文档与社区

- **文档镜像** — [KarinJS](https://kkk.karinjs.com) · [QWQO](https://kkk.qwqo.cn) · [Vercel](https://karin-plugin-kkk-docs.vercel.app) · [Netlify](https://karin-plugin-kkk-docs.netlify.app)
- **代码问答** — [DeepWiki](https://deepwiki.com/ikenxuan/karin-plugin-kkk) · [Zread](https://zread.ai/ikenxuan/karin-plugin-kkk)
- **交流反馈** — [GitHub Issues](https://github.com/ikenxuan/karin-plugin-kkk/issues/new/choose) · [QQ 群 795874649](https://qm.qq.com/q/DgLbCERYVG)

## 致谢

- [KarinJS/Karin](https://github.com/KarinJS/Karin) — 即时通讯应用机器人框架，本项目基于此开发
- [ikenxuan/amagi](https://github.com/ikenxuan/amagi) — 本插件使用的平台接口 TypeScript 实现

<p align="center">
  <a href="https://github.com/ikenxuan/karin-plugin-kkk/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=ikenxuan/karin-plugin-kkk" alt="karin-plugin-kkk 项目贡献者">
  </a>
</p>

## License

本项目采用 [GPL-3.0](./LICENSE) 开源，禁止商用。二次分发请注明出处。使用风险自担。
