# Changelog

## 0.0.0 (2025-09-06)


### ⚠ BREAKING CHANGES

* 添加PWA支持及相关功能

### ✨ 新功能

* Add Tauri desktop support and Web UI enhancements ([#130](https://github.com/ikenxuan/karin-plugin-kkk/issues/130)) ([617d5cf](https://github.com/ikenxuan/karin-plugin-kkk/commit/617d5cf841c4912c76fda2998151c831e5883b44))
* android ([957d504](https://github.com/ikenxuan/karin-plugin-kkk/commit/957d504539d8317958965ce4d0f226bc3cbfce5c))
* **auth:** 添加多层编码签名验证中间件和前端实现 ([2bed9bf](https://github.com/ikenxuan/karin-plugin-kkk/commit/2bed9bf3739e1d1bb013852342ae632799dad714))
* **theme:** 添加系统主题自动跟随功能 ([1ed6ed9](https://github.com/ikenxuan/karin-plugin-kkk/commit/1ed6ed999cc153ee530bb99be6be7f025a0123b2))
* **web:** 添加悬停卡片和上下文菜单组件并优化内容管理页面 ([7b8940a](https://github.com/ikenxuan/karin-plugin-kkk/commit/7b8940a7111fc1bf7b0411c5d42e20bc58fcfa3b))
* **web:** 添加登录重定向功能及react-scan依赖 ([f568868](https://github.com/ikenxuan/karin-plugin-kkk/commit/f568868cd481aef3991f6ce1407d73dff190908e))
* **web:** 添加进度条组件和404页面 ([ee3aa17](https://github.com/ikenxuan/karin-plugin-kkk/commit/ee3aa17db2241717187989ab059bc23a2d556e7d))
* 添加 Tauri OS 插件并优化路由和样式 ([f8db04f](https://github.com/ikenxuan/karin-plugin-kkk/commit/f8db04fb952f9ed2c765d9fc4d036c6321f187b8))
* 添加Atropos动画库和代码混淆功能 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))
* 添加PWA支持及相关功能 ([0be060a](https://github.com/ikenxuan/karin-plugin-kkk/commit/0be060aaeb79286340bdb1b6b6cfaf85f2f1b64c))
* 添加动态内容解析和自动填充功能 ([a1dfdad](https://github.com/ikenxuan/karin-plugin-kkk/commit/a1dfdadd0876499ce6620c1f56891f19c99830d2))
* **窗口:** 添加自定义标题栏和窗口控制功能 ([956bdae](https://github.com/ikenxuan/karin-plugin-kkk/commit/956bdae33efa93f5ac39faabf97deec02494c973))
* 重构内容管理页面并添加主题支持 ([cbc3283](https://github.com/ikenxuan/karin-plugin-kkk/commit/cbc328305afdb8fbd0d7028237348ab145c1d60b))


### 🐛 错误修复

* **tauri:** 修正登录路径和请求处理逻辑 ([c1504a7](https://github.com/ikenxuan/karin-plugin-kkk/commit/c1504a77faa0342a8efacbe445991af71a4966cb))
* **web:** 修正登录路径和开发环境判断逻辑 ([c3f7ec8](https://github.com/ikenxuan/karin-plugin-kkk/commit/c3f7ec8fb9fa7d02ff3ad4005866cb458ca5b458))
* **web:** 根据开发环境调整构建配置 ([3252128](https://github.com/ikenxuan/karin-plugin-kkk/commit/3252128640bdcacf54dc104c983e6c3ef3dc709c))
* 移除未使用的SHA256脚本并改用js-sha256库 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))
* **窗口:** 优化窗口控制组件和标题栏交互 ([bd5bfd3](https://github.com/ikenxuan/karin-plugin-kkk/commit/bd5bfd3be9dc2f518bc7c1fdc23e9e26f868faa6))


### ⚡️ 性能优化

* 使用同步SHA256哈希计算提高登录性能 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))


### 🎨 代码样式

* 清理重复的useEffect代码 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))
* 统一代码缩进和类名顺序 ([f8db04f](https://github.com/ikenxuan/karin-plugin-kkk/commit/f8db04fb952f9ed2c765d9fc4d036c6321f187b8))


### 🔧 其他更新

* 更新 Android 配置添加调试工具 ([f8db04f](https://github.com/ikenxuan/karin-plugin-kkk/commit/f8db04fb952f9ed2c765d9fc4d036c6321f187b8))
* 更新依赖项并调整ESLint规则 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))


### ♻️ 代码重构

* **build:** 更新构建输出目录和chunk命名规范 ([8fd55b5](https://github.com/ikenxuan/karin-plugin-kkk/commit/8fd55b5b3690ea65bc3c244fc4d312ff9fa4565b))
* 优化内容管理页面的状态管理 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))
* **路由:** 重构路由组件以支持认证检查 ([f8db04f](https://github.com/ikenxuan/karin-plugin-kkk/commit/f8db04fb952f9ed2c765d9fc4d036c6321f187b8))
* 重构代码并优化配置 ([d476d58](https://github.com/ikenxuan/karin-plugin-kkk/commit/d476d58e6df321029bc311b0f7af17c79132bfc3))


### 📦️ 构建系统

* 添加 Tauri OS 插件和相关依赖 ([f8db04f](https://github.com/ikenxuan/karin-plugin-kkk/commit/f8db04fb952f9ed2c765d9fc4d036c6321f187b8))
