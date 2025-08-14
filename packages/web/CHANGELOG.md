# Changelog

## 0.0.0 (2025-08-14)


### ⚠ BREAKING CHANGES

* 重构项目结构为多包工作区模式 ([#125](https://github.com/ikenxuan/karin-plugin-kkk/issues/125))

### ✨ 新功能

* **auth:** 添加多层编码签名验证中间件和前端实现 ([2bed9bf](https://github.com/ikenxuan/karin-plugin-kkk/commit/2bed9bf3739e1d1bb013852342ae632799dad714))
* **core:** 添加connect-history-api-fallback支持前端路由 ([573be90](https://github.com/ikenxuan/karin-plugin-kkk/commit/573be90b64c82935e08c1de8c88853c5176ff1ce))
* **theme:** 添加系统主题自动跟随功能 ([1ed6ed9](https://github.com/ikenxuan/karin-plugin-kkk/commit/1ed6ed999cc153ee530bb99be6be7f025a0123b2))
* **tools:** 重构工具模块并优化下载功能 ([c695d6f](https://github.com/ikenxuan/karin-plugin-kkk/commit/c695d6f7b779381ca6f8c8beaed80b15c4695974))
* **web:** 添加web解析页面鉴权开关并优化内容管理界面 ([9562110](https://github.com/ikenxuan/karin-plugin-kkk/commit/956211008a6253cac9c75456d5de7a3b00f4d01a))
* **web:** 添加悬停卡片和上下文菜单组件并优化内容管理页面 ([7b8940a](https://github.com/ikenxuan/karin-plugin-kkk/commit/7b8940a7111fc1bf7b0411c5d42e20bc58fcfa3b))
* **web:** 添加登录重定向功能及react-scan依赖 ([f568868](https://github.com/ikenxuan/karin-plugin-kkk/commit/f568868cd481aef3991f6ce1407d73dff190908e))
* 支持合辑解析 ([e6cab24](https://github.com/ikenxuan/karin-plugin-kkk/commit/e6cab2435e8e98de9fa0fa0914a387fd68c799f4))
* 添加Atropos动画库和代码混淆功能 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))
* 添加内容管理功能及相关组件 ([ac93ede](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac93edea9ebfb6ffc68a1d5da27814a56465830c))
* 添加动态内容解析和自动填充功能 ([a1dfdad](https://github.com/ikenxuan/karin-plugin-kkk/commit/a1dfdadd0876499ce6620c1f56891f19c99830d2))
* 添加心跳检测和登录功能改进 ([4080580](https://github.com/ikenxuan/karin-plugin-kkk/commit/4080580f6f035e9e7f3f57050cd85929a5af8211))
* 重构内容管理页面并添加主题支持 ([cbc3283](https://github.com/ikenxuan/karin-plugin-kkk/commit/cbc328305afdb8fbd0d7028237348ab145c1d60b))
* 重构项目结构为多包工作区模式 ([#125](https://github.com/ikenxuan/karin-plugin-kkk/issues/125)) ([9fbb970](https://github.com/ikenxuan/karin-plugin-kkk/commit/9fbb970ad3824b0eed8ae1fe39643cead70e80d0))


### 🐛 错误修复

* build error ([a9aa73a](https://github.com/ikenxuan/karin-plugin-kkk/commit/a9aa73a26f16a22d34ba871a8161d8aaa79fdba8))
* close [#126](https://github.com/ikenxuan/karin-plugin-kkk/issues/126) ([9fbb970](https://github.com/ikenxuan/karin-plugin-kkk/commit/9fbb970ad3824b0eed8ae1fe39643cead70e80d0))
* close [#126](https://github.com/ikenxuan/karin-plugin-kkk/issues/126) ([4b52e20](https://github.com/ikenxuan/karin-plugin-kkk/commit/4b52e20cd64515f331c6886ab66bcfe15a7c70a1))
* 移除未使用的SHA256脚本并改用js-sha256库 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))


### ⚡️ 性能优化

* 使用同步SHA256哈希计算提高登录性能 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))


### 🎨 代码样式

* 清理重复的useEffect代码 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))


### 🔧 其他更新

* 更新依赖项和日志级别配置 ([ac93ede](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac93edea9ebfb6ffc68a1d5da27814a56465830c))
* 更新依赖项并调整ESLint规则 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))


### ♻️ 代码重构

* **build:** 更新构建输出目录和chunk命名规范 ([8fd55b5](https://github.com/ikenxuan/karin-plugin-kkk/commit/8fd55b5b3690ea65bc3c244fc4d312ff9fa4565b))
* 优化内容管理页面的状态管理 ([f0bda29](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0bda29a8595e95f47e71e3a9196dccd9d256d58))
* 优化数据库模型和API路由 ([ac93ede](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac93edea9ebfb6ffc68a1d5da27814a56465830c))
* 统一函数声明为箭头函数并优化组件交互 ([2553ff3](https://github.com/ikenxuan/karin-plugin-kkk/commit/2553ff3b1f89d634e14f56645556288077f4b079))
* 重构项目结构为多包工作区模式 ([f49437c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f49437c5bf9c0d9265039ef0618ab1b621fcc556))
