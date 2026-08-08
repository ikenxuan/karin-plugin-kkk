# 🎨 karin-plugin-kkk 截图模板

> `karin-plugin-kkk` 的 React 截图模板源码，基于 [`@karinjs/template-react`](https://github.com/KarinJS/template-react)（ktr）的强约定布局，位于 core 包内的 `template/` 目录。

本目录把各平台数据转化为精美的可视化卡片和图像，支持 **B站 (Bilibili)**、**抖音 (Douyin)**、**快手 (Kuaishou)** 和 **小红书 (Xiaohongshu)** 等主流平台。模板由 core 的 vite 构建直接 bundle 进 `lib/`，本目录自身没有独立构建步骤。

## 目录约定

- `template/<板块>/<模板>/index.tsx`：模板路由入口，默认导出 `defineTemplate(...)`；目录即路由（如 `douyin/video-work`、`bilibili/dynamic/DYNAMIC_TYPE_DRAW`）。
- `template/<板块>/<模板>/components/types.ts`：该模板的数据类型（`XxxData`，带 doc 注释、export）；`components/` 下放实现组件（命中 ktr 忽略的 `**/components/**` 模式，不会被扫成路由）。
- `template/<板块>/components/`：板块内跨模板共享的组件（如图标库）；`template/<板块>/types.ts`：板块共享类型（跨模板复用或供 core 引用）。
- `template/components/`：仅放全板块通用的大组件（`DefaultLayout`、`GlowImage`、`QRCodeWithAvatar` 等）。
- `template/types/ctx.ts`：`PosterContext`/`PosterProps`——组件 props 为 `{ data, ctx }`，`version`/`scale`/`watermarkTextBitSize`/`posterPalette` 等由 core 经 `ctx` 透传。
- `template/<路由>/data/*.json`：开发面板 mock 数据；真实渲染数据开发态自动捕获到 `data/captured.json`。
- `template/_preview/`：临时视频预览页 SSR（非截图模板，core `/kkk/ssr/video/*` 使用）。
- `template/style.css`：全部模板共用的 Tailwind v4 样式入口；`template/public/` 下的字体/图片由 core 构建复制到 `resources/`。

## 开发

在仓库根目录执行：

```bash
pnpm template
```

启动 ktr 开发面板（`http://localhost:5174/__ktr/panel/`），实时预览模板、切换 mock 数据、调试明暗主题。新增/移动模板后重新运行 `pnpm template`（或 `pnpm --filter karin-plugin-kkk exec ktr sync`）刷新注册表。

## 技术栈

React 19 + TypeScript + Tailwind CSS v4 + HeroUI，SSR 渲染与开发面板由 `@karinjs/template-react` 提供，截图由 core 调用 Karin render 完成。
