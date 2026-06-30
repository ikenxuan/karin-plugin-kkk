# AGENTS.md

本文件给后续接手 `karin-plugin-kkk` 的 AI/Agent 快速建立项目上下文。读完后再改代码。

## 沟通规则

- 必须使用中文回复用户，任何场景都优先中文；代码标识、命令、英文库名可保留原文，但解释和总结用中文。
- 用户偏好直接、完整、能落地的协作方式；能从仓库判断的事情不要反复追问。
- 改动前先读相关代码和已有风格，优先沿用现有模式，避免无关重构。

## 项目概览

`karin-plugin-kkk` 是 Karin 机器人框架插件，用于多平台短视频、图文、动态解析与推送，支持 Bilibili、抖音、快手、小红书等平台。核心能力包括链接识别、视频/图集/评论解析、动态推送、扫码登录、统计、错误诊断、Web 配置管理和 React 海报化模板渲染。

仓库是 pnpm monorepo，主发布包是 `packages/core` 的 npm 包 `karin-plugin-kkk`。

## 技术栈

- 包管理：`pnpm` workspace。
- 语言：TypeScript、ESM。
- 核心运行：`node-karin`、Karin 插件 apps、SQLite、Express 路由、Puppeteer/HTML 截图渲染。
- 前端：React 19、Vite 8、Tailwind CSS v4、HeroUI v3。
- 文档站：Next.js 16、Fumadocs、MDX。
- 构建：本仓 `@kkk/cli` 聚合构建，`vite`、`tsdown`。
- 质量工具：`oxlint`、`oxfmt`、`vitest`。

## 工作区结构

- `packages/core`：主插件包。包含 Karin 入口、命令 apps、平台解析、推送逻辑、配置、数据库、服务端 API、渲染调用、发布产物规则。
- `packages/template`：React SSR 渲染服务和模板组件。把平台数据渲成 HTML，再交给 core 截图。包含独立开发工作台。
- `packages/web`：Karin 插件 WebUI 配置管理端。构建输出到 `packages/core/lib/web`。
- `packages/docs`：Next/Fumadocs 文档站，内容在 `content/docs`。
- `packages/richtext`：core 与 template 共享的富文本中间层。core 生成 JSON，template 渲染 React。
- `packages/cli`：`kkk` 构建 CLI，串行运行 core/docs/template/web 构建目标。
- `packages/amagi`：Git submodule，封装平台接口，workspace 路径为 `packages/amagi/packages/core`。
- `packages/skills`：随仓库分发、供贡献者共享的 AI 开发 skills。后续希望随仓库一起交接的项目相关 skill 应放这里；本地 `.agents` 目录若存在，可作为个人工作区补充。
- `Karin`：Karin 框架 Git submodule。

## 常用命令

在仓库根目录执行：

```bash
pnpm install
pnpm dev              # core 插件开发：pnpm --filter karin-plugin-kkk run dev
pnpm watch            # core watch
pnpm template         # template Vite dev，端口 5174
pnpm docs             # docs Next dev，端口 5175
pnpm web              # web Vite dev，端口 5176
pnpm build            # kkk build core web
pnpm build:all        # kkk build core docs template
pnpm build:core
pnpm build:docs
pnpm build:template
pnpm lint
pnpm format
pnpm format:check
pnpm sort
```

局部命令可用 `pnpm --filter <package> run <script>`。CI 使用 Node 24、pnpm 9.15.9；`packages/core` 声明运行引擎为 Node >= 18。

## 开发端口和路由

- `template` dev：`http://localhost:5174`。
- `docs` dev：`http://localhost:5175`。
- `web` dev：`http://localhost:5176/kkk/assets/`，反代 `/kkk/v1` 和 `/api/v1` 到 Karin `http://localhost:7777`。
- 插件生产 WebUI：`/kkk/assets`，配置页注册在 `packages/core/src/web.config.ts`，默认指向 `/kkk/assets/karin-config`。
- core API 前缀：`/kkk/v1`；SSR 预览前缀：`/kkk/ssr`；静态资源前缀：`/kkk/assets`。

## 核心运行链路

1. `packages/core/src/index.ts` 记录插件加载起点并动态导入 `setup`。
2. `setup.ts` 初始化服务端路由、B站风控、Karin 版本兼容提醒、SQLite 数据库和数据目录。
3. `src/apps/*.ts` 注册 Karin 命令与定时任务，例如解析、推送、帮助、扫码登录、统计、更新检测。
4. `src/platform/*` 负责不同平台的数据获取、ID 识别、评论、弹幕、推送数据处理。
5. `src/module/utils/Render/index.ts` 调用 `template` 的 SSR 渲染生成 HTML，再用 Karin render 截图为 PNG，并按配置嵌入水印。
6. 视频/图片上传、下载、压缩、限速、临时预览主要在 `src/module/utils/Base.ts`、`Network/*`、`FFmpeg.ts`、`MotionPhoto.ts`。
7. 错误包装和诊断海报在 `src/module/utils/ErrorHandler/*` 与 `template` 的 `other/handlerError`。

## 配置与数据库

- 默认配置在 `packages/core/config/default_config/config.json`，旧版 YAML 默认配置仍保留用于迁移。
- 用户配置位于 Karin 数据目录下的 `${karinPathBase}/karin-plugin-kkk/config/config.json`。
- `Config` 在 `packages/core/src/module/utils/Config.ts` 中用 Proxy 暴露模块配置。
- 首次运行会补齐默认字段；如果检测到旧 YAML，会迁移到 JSON 并备份。
- `pushlist` 的过滤词、标签、过滤模式会同步到 SQLite，改 WebUI 配置保存逻辑时必须留意 DB 同步。
- 数据库单例与初始化在 `packages/core/src/module/db/index.ts`，迁移管理在 `migration.ts`。

## 模板渲染约定

- `template` 的组件注册入口是 `packages/template/src/config/config-base.ts` 和 `config.ts`。
- 新增模板通常需要同时改：
  - `packages/template/src/components/platforms/...`
  - `packages/template/src/types/...`
  - `packages/template/src/config/config-base.ts`
  - `packages/template/src/config/config.ts`
  - `packages/template/src/types/index.ts` 的 `DynamicRenderPath` 和路径到数据类型映射
  - core 调用处的 `Render(event, 'platform/template', data)`
- `template/src/main.ts` 提供 SSR 渲染器、资源路径处理、HTML 包装、开发态 mock 数据落盘。
- `template` 构建时会复制 CSS 到 `packages/core/lib/karin-plugin-kkk.css`，并复制 `public` 静态资源到 `packages/core/resources`。
- 视觉类模板优先阅读 `packages/skills/kkk-design/SKILL.md`：按内容选择克制内容卡片或弥散信息海报系统，避免退回普通后台、营销页或无层级截图。

## WebUI 约定

- `packages/web` 是独立 React/Vite 应用，生产构建输出到 `packages/core/lib/web`。
- 路由在 `packages/web/src/App.tsx`，登录态复用 Karin Web 的 `userId/accessToken/refreshToken`。
- API 封装在 `src/api`，鉴权和签名在 `src/auth`。
- 配置页面主体在 `src/components/common/ConfigPanel.tsx` 和 `config-panel/*`，桌面/移动布局分别在 `layouts`、`components/desktop`、`components/mobile`。
- 使用 HeroUI v3：不要套 `HeroUIProvider`，优先 compound components，事件优先 `onPress`，样式导入顺序保持 Tailwind v4 后接 `@heroui/styles`。

## 富文本约定

- `packages/richtext` 是 core/template 的稳定数据边界。
- core 只创建可序列化 `RichTextDocument` JSON，不拼 HTML。
- template 用 `renderRichTextToReact` 渲染，图片 URL 有协议白名单；不要随意改成 `dangerouslySetInnerHTML`。

## 文档站

- 文档内容在 `packages/docs/content/docs`，导航元数据为各目录的 `meta.json`。
- Fumadocs 配置在 `source.config.ts`，共享布局配置在 `lib/layout.shared.tsx`。
- 首页和功能展示组件在 `app/(home)`、`components`、`lib/cards-data.ts`、`lib/ui-mockups-data.json`。
- 新增用户可见能力时，优先同步 `quick-start`、`usage`、`configuration` 或对应 feature 文档。

## 代码风格

- `oxfmt`：无分号、单引号、2 空格、`printWidth: 140`、尾随逗号关闭、排序 import。
- `oxlint`：TypeScript/React 插件，`no-unused-vars` 为 error；未使用参数/变量用 `_` 前缀。
- 默认不要手改生成产物，例如 `packages/core/lib`、`packages/template/dist`、`packages/web` 构建输出、`.next`。
- 保持 ESM 写法，路径别名常见为 `@`、`@kkk/richtext`、`template`、`@ikenxuan/amagi`。
- 不要把 cookie、token、代理认证等敏感信息写进提交或文档。

## 常见任务定位

- 改解析命令：看 `packages/core/src/apps/tools.ts` 和对应 `platform/<平台>`。
- 改推送：看 `apps/push.ts`、`apps/testPush.ts`、`platform/<平台>/push*`、`db/*`、`Config.ts`。
- 改扫码登录：看 `apps/admin.ts`、`apps/qrlogin.ts`、各平台 `login.ts`、模板 `qrcodeImg`/`other/qrlogin`。
- 改统计：看 `apps/statistics.ts`、`module/db/statistics.ts`、模板 `other/GroupStatistics.tsx` 与 `GlobalStatistics.tsx`。
- 改 Web 配置项：同时检查 core 默认配置、core 配置类型、web 配置类型、配置页字段渲染、保存 API 和 DB 同步。
- 改错误诊断：看 `module/utils/ErrorHandler/*` 和模板 `other/handlerError.tsx`。
- 改更新检测/发布提示：看 `apps/update.ts`、`module/utils/changelog.ts`、模板 `other/changelog.tsx`、`VersionWarning.tsx`。

## 验证建议

- 通用改动：至少跑 `pnpm lint` 和 `pnpm format:check`。
- core 改动：跑 `pnpm build:core`；如涉及入口加载，跑 `pnpm --filter karin-plugin-kkk exec vitest` 或 `pnpm --filter karin-plugin-kkk run build:check`。
- web 改动：跑 `pnpm --filter web run build`，必要时启动 `pnpm web` 做浏览器检查。
- template 改动：跑 `pnpm --filter template run build`，必要时启动 `pnpm template` 检查预览画面。
- docs 改动：跑 `pnpm --filter docs run types:check` 或 `pnpm build:docs`。
- 涉及截图/海报样式时，必须实际看渲染结果，检查文字溢出、深浅色主题、移动/桌面尺寸和资源加载。

## Git、提交与发布

- Husky pre-commit：当 `packages/template`、`packages/amagi`、`packages/richtext`、`packages/web` 有暂存改动时，会更新 `packages/core/package.json` 的 `timestamp`。
- Husky commit-msg：提交类型必须匹配 `.release-please-config.json` 的 changelog 类型，例如 `feat:`、`fix:`、`docs:`、`style:`、`refactor:`、`test:`、`build:`、`ci:`、`config:`、`db:`、`amagi:` 等。
- Release Please 只管理 `packages/core`，正式发布包名为 `karin-plugin-kkk`。
- CI 在 main/PR 上构建 core+web，发布正式包、GitHub Packages、预览包，并同步 build 分支。

## 子模块与依赖注意

- 克隆后需要 `git submodule update --init --recursive` 才能拿到 `Karin` 和 `packages/amagi`。
- `pnpm-workspace.yaml` 包含 `packages/*` 和 `packages/amagi/packages/core`。
- `.npmrc` 配置了 sqlite、sharp、puppeteer 等国内镜像和 hoist 规则，不要轻易删除。

## 项目技能

- 项目随仓库分发的 skills 放在 `packages/skills`；`.agents`、`.claude` 等本地目录如果存在，可以作为贡献者自己的额外补充。交接和协作说明应同时提醒仓库内的 `packages/skills`，确保其他人克隆仓库后也能找到项目相关技能包。
- 当前内置 `packages/skills/kkk-design/SKILL.md`，用于固定画布、截图优先、信息卡片与信息海报类视觉设计。该 skill 还包含 `references/` 和 `examples/`，后续 AI 做模板视觉工作前应先阅读对应文件。
- `kkk-design` 是可复用的视觉系统说明，不绑定具体业务页面；使用时按信息气质选择“克制内容卡片”或“弥散信息海报”，并执行其中的画布、色彩、层级、组件和自检规则。
- 后续新增项目相关 skill 时，放到 `packages/skills/<skill-name>/SKILL.md`，并在本节补充用途和触发场景。
