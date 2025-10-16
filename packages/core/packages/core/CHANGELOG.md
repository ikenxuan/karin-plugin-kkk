# Changelog

## [2.7.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.6...v2.7.0) (2025-10-16)


### ✨ 新功能

* **core:** 新增小红书解析 ([#166](https://github.com/ikenxuan/karin-plugin-kkk/issues/166)) ([7c7e05e](https://github.com/ikenxuan/karin-plugin-kkk/commit/7c7e05e5765cff1f14030f3ab0f1fdd45c5032e3))
* **douyin:** 添加评论回复功能及数据文件支持 ([12f2460](https://github.com/ikenxuan/karin-plugin-kkk/commit/12f24602bc7eb0bfe80cd4fd33ff35bcceac72bb))
* 重构更新日志组件并优化版本检测功能，添加'#kkk更新' ([7147598](https://github.com/ikenxuan/karin-plugin-kkk/commit/7147598c84c46d41aa4cf7b1a6fb1415105816ae))


### 🐛 错误修复

* **bilibili/douyin:** 推送缓存写不进db ([4b0216f](https://github.com/ikenxuan/karin-plugin-kkk/commit/4b0216f28a01a6855e28cc1145e7f753ae5e98a6))
* **bilibili:** 修复动态链接ID解析问题并增强URL处理 ([bc2350e](https://github.com/ikenxuan/karin-plugin-kkk/commit/bc2350e4719704b1474675c969280704712d95d0))
* **bilibili:** 修正视频动态创建时间使用错误的时间戳字段 ([86fd365](https://github.com/ikenxuan/karin-plugin-kkk/commit/86fd3650577dbb6a570247ec5277ccee9c072061))
* **changelog:** 修复推送更新时，更变记录图中操作步骤消失 ([0f18346](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f1834606e9474c60e3368da4d7e2c108a8702a2))
* ci ([8ea9c0b](https://github.com/ikenxuan/karin-plugin-kkk/commit/8ea9c0bc7dc09b4e8f3a67190edd655e8412fecf))
* **help:** 修复版本命令图片渲染问题并更新变更日志处理 ([f87d38d](https://github.com/ikenxuan/karin-plugin-kkk/commit/f87d38db37397f4f040d3383028229af00c01c17))
* UI布局失效。 ([3ebab7c](https://github.com/ikenxuan/karin-plugin-kkk/commit/3ebab7c32fc7c2aaaae36a4424ba9e2236d380ab))
* **update:** 优化更新流程并添加版本核心规范化 ([5b87bfb](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b87bfb3b599931353969e8ab598c690a91d25d1))
* **update:** 优化版本更新提醒逻辑并简化重启处理，将版本提醒锁检查移至获取更新信息后，增加对远程版本的比较 ([c4297d1](https://github.com/ikenxuan/karin-plugin-kkk/commit/c4297d1fe88f2dd50365ebf93c250dc4deb697d8))
* **update:** 修复更新检测逻辑并优化渲染配置 ([0036c59](https://github.com/ikenxuan/karin-plugin-kkk/commit/0036c596ddbc2917c374a9dd8410a4b42f749e57))
* **更新日志:** 为变更日志图片添加提示显示控制选项 ([937c62a](https://github.com/ikenxuan/karin-plugin-kkk/commit/937c62af98d2a41fee364eeea0d67178af7e95ea))
* 更新检测开发环境不允许执行。 ([39b522d](https://github.com/ikenxuan/karin-plugin-kkk/commit/39b522d21c2d1bf09d25a45be6cd817070875386))
* 更新逻辑 ([#177](https://github.com/ikenxuan/karin-plugin-kkk/issues/177)) ([12f1633](https://github.com/ikenxuan/karin-plugin-kkk/commit/12f16339637f9a181668bbb0619457cb3c7a6627))
* 番剧匹配不到ID ([84dea7e](https://github.com/ikenxuan/karin-plugin-kkk/commit/84dea7eb49ab0ba55bffb3cf86873bccd58740fa))
* 细优UI样式 ([8cad02d](https://github.com/ikenxuan/karin-plugin-kkk/commit/8cad02d69a9873520151694ee8ee4758961d63f9))
* 细节优化 ([ce2f9a5](https://github.com/ikenxuan/karin-plugin-kkk/commit/ce2f9a5f6c5d96ea6e10ebe39bda122e528f9ba7))
* 细节优化，添加git钩子以同步提交记录 ([5909226](https://github.com/ikenxuan/karin-plugin-kkk/commit/590922618a89122fd116774ca5b939e4c6bb3b3d))
* 获取更新日志并发竞速请求 ([2d9f31d](https://github.com/ikenxuan/karin-plugin-kkk/commit/2d9f31d0a7f2a74369d9c69495006c0fcf958b88))
* 过万整除 ([93f8753](https://github.com/ikenxuan/karin-plugin-kkk/commit/93f8753d59701faee7dc28c60bca8b344efa564a))


### 🎨 页面 UI 样式

* **help:** 添加角色权限控制并优化帮助页面UI ([d85b4b6](https://github.com/ikenxuan/karin-plugin-kkk/commit/d85b4b6be342eabdd63c9f958574f92d4247e681))


### 🔧 其他更新

* release main ([#161](https://github.com/ikenxuan/karin-plugin-kkk/issues/161)) ([31504c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/31504c255f7bf28c69b322f2dc8d92ba07ff385a))
* release main ([#163](https://github.com/ikenxuan/karin-plugin-kkk/issues/163)) ([c6552e1](https://github.com/ikenxuan/karin-plugin-kkk/commit/c6552e1ed2bd92a7f9e64bb4b62c492844b88193))
* release main ([#167](https://github.com/ikenxuan/karin-plugin-kkk/issues/167)) ([2387f12](https://github.com/ikenxuan/karin-plugin-kkk/commit/2387f127cba0cb415eb4dbe6831bf52a1415b672))
* release main ([#171](https://github.com/ikenxuan/karin-plugin-kkk/issues/171)) ([34fbe51](https://github.com/ikenxuan/karin-plugin-kkk/commit/34fbe5131fb0f58b655071a4551bc5f3cf11f75b))
* release main ([#173](https://github.com/ikenxuan/karin-plugin-kkk/issues/173)) ([1ed0423](https://github.com/ikenxuan/karin-plugin-kkk/commit/1ed0423957d24e4a580dd161413451c531b37a42))
* release main ([#174](https://github.com/ikenxuan/karin-plugin-kkk/issues/174)) ([e4915e6](https://github.com/ikenxuan/karin-plugin-kkk/commit/e4915e6704aac8013a5e76f557529543d26f89a2))
* release main ([#175](https://github.com/ikenxuan/karin-plugin-kkk/issues/175)) ([c0553a7](https://github.com/ikenxuan/karin-plugin-kkk/commit/c0553a75fcf930014dbea81a4746d0bd739195db))
* release main ([#176](https://github.com/ikenxuan/karin-plugin-kkk/issues/176)) ([9e2b321](https://github.com/ikenxuan/karin-plugin-kkk/commit/9e2b3215ed63257dc76b685d2e7c103ccc481cd9))
* release main ([#178](https://github.com/ikenxuan/karin-plugin-kkk/issues/178)) ([42e81b3](https://github.com/ikenxuan/karin-plugin-kkk/commit/42e81b3d5d27f5a64ccb96aa2f3a16a04f997368))
* release main ([#179](https://github.com/ikenxuan/karin-plugin-kkk/issues/179)) ([3707477](https://github.com/ikenxuan/karin-plugin-kkk/commit/370747793c8d74c48185395ee88c858092bd82a4))


### ♻️ 代码重构

* **template:** 移除未使用的依赖并重构样式配置 ([4725c25](https://github.com/ikenxuan/karin-plugin-kkk/commit/4725c25cd5de7935fc542deacae35b82202c65ac))
