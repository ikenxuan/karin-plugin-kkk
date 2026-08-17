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

- `packages/core`：主插件包。包含 Karin 入口、命令 apps、平台解析、推送逻辑、配置、数据库、服务端 API、渲染调用、发布产物规则，以及 `template/` 截图模板源码（遵循 `@karinjs/template-react`（ktr）强约定布局：`template/<板块>/<模板>/index.tsx` 默认导出 `defineTemplate(...)` 即注册为路由；`template/components/**` 是模板实现组件（命中 ktr 忽略的 `components/**` 模式，不参与路由）；`template/types/**` 为共享类型；`template/<路由>/data/*.json` 为面板 mock 数据）。
- `packages/web`：Karin 插件 WebUI 配置管理端。构建输出到 `packages/core/lib/web`。
- `packages/docs`：Next/Fumadocs 文档站，内容在 `content/docs`。
- `packages/richtext`：core 与 template 共享的富文本中间层。core 生成 JSON，template 渲染 React。
- `packages/cli`：`kkk` 构建 CLI，串行运行 core/docs/web 构建目标。
- `packages/amagi`：Git submodule，封装平台接口，workspace 路径为 `packages/amagi/packages/core`。
- `.agents/skills`：随仓库分发、供贡献者共享的 AI 开发 skills，遵循 Agent Skills 规范（`.agents/skills/<skill-name>/SKILL.md`）。该目录已纳入 Git 跟踪，克隆仓库即可被各类 AI Agent 发现；`.agents` 下的其他内容默认被 gitignore 忽略，可作为个人工作区补充。
- `Karin`：Karin 框架 Git submodule。

## 常用命令

在仓库根目录执行：

```bash
pnpm install
pnpm dev              # core 插件开发：pnpm --filter karin-plugin-kkk run dev
pnpm watch            # core watch
pnpm template         # ktr dev 模板开发面板（core 的 karin.template.ts），端口 5174
pnpm docs             # docs Next dev，端口 5175
pnpm web              # web Vite dev，端口 5176
pnpm build            # kkk build core web
pnpm build:all        # kkk build core web docs
pnpm build:core
pnpm build:docs
pnpm lint
pnpm format
pnpm format:check
pnpm sort
```

只有 `core`、`web`、`docs` 三个子包允许构建。`richtext`、`amagi` 是 core 的源码级依赖：core 的 vite 构建直接 bundle 它们的源码（`@kkk/richtext`、`@ikenxuan/amagi` 走 tsconfig paths），禁止单独构建它们，否则产生的 `dist`/`*.js` 产物会污染 git 待提交区。模板源码在 `packages/core/template/`（core 包内，ktr 约定），随 core 构建由 `.ktr` 注册表入口 bundle。

局部命令可用 `pnpm --filter <package> run <script>`。CI 使用 Node 24、pnpm 9.15.9；`packages/core` 声明运行引擎为 Node >= 18。

## 开发端口和路由

- `template` dev：`http://localhost:5174/__ktr/panel/`（ktr 开发面板，由 `packages/core/karin.template.ts` 配置）。
- `docs` dev：`http://localhost:5175`。
- `web` dev：`http://localhost:5176/kkk/assets/`，反代 `/kkk/v1` 和 `/api/v1` 到 Karin `http://localhost:7777`。
- 插件生产 WebUI：`/kkk/assets`，配置页注册在 `packages/core/src/web.config.ts`，默认指向 `/kkk/assets/karin-config`。
- core API 前缀：`/kkk/v1`；SSR 预览前缀：`/kkk/ssr`；静态资源前缀：`/kkk/assets`。

## 核心运行链路

1. `packages/core/src/index.ts` 记录插件加载起点并动态导入 `setup`。
2. `setup.ts` 初始化服务端路由、B站风控、Karin 版本兼容提醒、SQLite 数据库和数据目录。
3. `src/apps/*.ts` 注册 Karin 命令与定时任务，例如解析、推送、帮助、扫码登录、统计、更新检测。
4. `src/platform/*` 负责不同平台的数据获取、ID 识别、评论、弹幕、推送数据处理。
5. `src/module/utils/Render/index.ts` 通过 `@karinjs/template-react` 的 `createTemplateRenderer` 做 SSR 生成 HTML（约定注册表在 `packages/core/.ktr`，由 `ktr sync` 生成），再用 Karin render 截图为 PNG，并按配置嵌入水印。
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

- 模板遵循 ktr 强约定：`packages/core/template/<板块>/<模板>/index.tsx` 默认导出 `defineTemplate(...)`（来自 `@karinjs/template-react`），路由即目录路径（支持 `bilibili/dynamic/DYNAMIC_TYPE_*` 三级路由）；路由级数据接口 `XxxData` 声明在同路由的 `components/types.ts`（带 doc 注释、export）。组件 props 为 `{ data, ctx }`（`PosterProps<XxxData>`，见 `template/types/ctx.ts` 的 `PosterContext`/`PosterProps`）：`version`/`scale`/`watermarkTextBitSize`/`posterPalette` 等通过 `ctx` 透传，`data.useDarkTheme` 由 core 注入。
- 组件实现放在对应路由目录的 `components/`（如 `template/douyin/comment/components/Comment.tsx`）；板块共享组件在 `template/<板块>/components/`，板块共享类型在 `template/<板块>/types.ts`（bilibili 动态在 `template/bilibili/dynamic/types.ts`）；仅全板块通用的大组件（`DefaultLayout`、`GlowImage` 等）在 `template/components/`。`components/**` 路径命中 ktr 忽略模式，不会被扫成路由。组件根元素**不要**写 `id="container"`（截图边界由 ktr 外壳提供，`DefaultLayout` 用 `zoom` 实现 renderScale 缩放）。
- 新增模板只需：新建 `template/<板块>/<模板>/index.tsx`（`defineTemplate` 注册）、`components/types.ts`（声明 Data 接口）和 `components/` 实现 → `ktr sync` 刷新 `.ktr` 注册表（core 的 dev/build 脚本已前置）→ core 调用处 `Render(event, '平台/模板', data)`，data 类型由 `.ktr/registry-types.d.ts` 模块增强逐路由精确推导。
- mock 数据：`template/<路由>/mock.ts`（TS mock）或 `template/<路由>/data/*.json`（面板可编辑）；真实渲染数据在开发态自动捕获到 `data/captured.json`（已 gitignore）。
- SSR 渲染插件在 `packages/core/src/module/utils/Render/plugins.ts`（封面取色/智能主题在 `beforeRender` 改 `data.useDarkTheme` 并把取色挂到 `ctx`；`/image/` 静态资源相对路径改写在 `afterRender`）。
- core 构建时由 vite 插件（`packages/core/vite.plugin/copy-assets.ts`）把 `template/public` 静态资源复制到 `packages/core/resources`，CSS 由 core 构建里的 `ktr build --outDir lib` 编译 `template/style.css` 产出 `lib/style.css`。
- 视觉类模板优先阅读 `.agents/skills/kkk-design/SKILL.md`：按内容选择克制内容卡片或弥散信息海报系统，避免退回普通后台、营销页或无层级截图。

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
- 默认不要手改生成产物，例如 `packages/core/lib`、`packages/core/.ktr`、`packages/web` 构建输出、`.next`。
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
- template 改动：启动 `pnpm template` 检查预览画面；不要跑 template 的构建（它没有构建脚本，最终产物由 core 构建生成）。
- docs 改动：跑 `pnpm --filter docs run types:check` 或 `pnpm build:docs`。
- 涉及截图/海报样式时，必须实际看渲染结果，检查文字溢出、深浅色主题、移动/桌面尺寸和资源加载。

## Git、提交与发布

- Husky pre-commit：当 `packages/core/template`、`packages/amagi`、`packages/richtext`、`packages/web` 有暂存改动时，会更新 `packages/core/package.json` 的 `timestamp`。
- Husky commit-msg：提交类型必须匹配 `.release-please-config.json` 的 changelog 类型，例如 `feat:`、`fix:`、`docs:`、`style:`、`refactor:`、`test:`、`build:`、`ci:`、`config:`、`db:`、`amagi:` 等。
- Release Please 只管理 `packages/core`，正式发布包名为 `karin-plugin-kkk`。
- CI 在 main/PR 上构建 core+web，发布正式包、GitHub Packages、预览包，并同步 build 分支。

## 子模块与依赖注意

- 克隆后需要 `git submodule update --init --recursive` 才能拿到 `Karin` 和 `packages/amagi`。
- `pnpm-workspace.yaml` 包含 `packages/*` 和 `packages/amagi/packages/core`。
- `.npmrc` 配置了 sqlite、sharp、puppeteer 等国内镜像和 hoist 规则，不要轻易删除。

## 项目技能

- 项目随仓库分发的 skills 放在 `.agents/skills`，遵循 Agent Skills 规范：每个技能一个目录，内含带 YAML frontmatter（`name`、`description`）的 `SKILL.md`，可附带 `references/`、`examples/`、`agents/` 等子目录。该目录已纳入 Git 跟踪并推送到远端，确保其他人克隆仓库后也能找到项目相关技能包；`.claude` 等其他本地目录如果存在，可以作为贡献者自己的额外补充。
- 当前内置 `.agents/skills/kkk-design/SKILL.md`，用于固定画布、截图优先、信息卡片与信息海报类视觉设计。该 skill 还包含 `references/` 和 `examples/`，后续 AI 做模板视觉工作前应先阅读对应文件。
- `kkk-design` 是可复用的视觉系统说明，不绑定具体业务页面；使用时按信息气质选择“克制内容卡片”或“弥散信息海报”，并执行其中的画布、色彩、层级、组件和自检规则。
- 后续新增项目相关 skill 时，放到 `.agents/skills/<skill-name>/SKILL.md`，并在本节补充用途和触发场景。
