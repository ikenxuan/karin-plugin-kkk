# 变更日志

# Changelog

## [2.25.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.24.0...v2.25.0) (2026-03-11)


### ✨ 新功能

* **core:** 解析动图作品时，实验性将合并转发消息中的静态图片魔改成 Google Motion 标准的 Live Photo ([5e789e3](https://github.com/ikenxuan/karin-plugin-kkk/commit/5e789e351eebfaca84e26c326ddf7c16e253a20f))


### 🐛 错误修复

* 取消注释 ([921bf95](https://github.com/ikenxuan/karin-plugin-kkk/commit/921bf95ad05d8ac17a2540ac9aa3014beed3b6e5))

## [2.24.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.23.2...v2.24.0) (2026-03-10)


### ✨ 新功能

* **app:** 添加伪造合并转发消息配置选项 ([4bb4d03](https://github.com/ikenxuan/karin-plugin-kkk/commit/4bb4d03de119b844e13524a34a9d8bb2f5702a90))
* **bilibili/douyin:** 实现 Live Photo 效果视频合成并统一处理逻辑 ([56f90b6](https://github.com/ikenxuan/karin-plugin-kkk/commit/56f90b609d80eaa57aaaaa6d5fb755515fe03474))


### 🐛 错误修复

* **抖音:** 直播推送会触发作品解析 ([a9c13b8](https://github.com/ikenxuan/karin-plugin-kkk/commit/a9c13b8eca8851a19fe01a16c418cef98ccad98b))


### 🧰 其他更新

* 细优 ([24eb64f](https://github.com/ikenxuan/karin-plugin-kkk/commit/24eb64f1f79d56b1ed169283cc19a8c439eb6d09))


### ⚙️ 配置变更

* **upload:** 重构视频发送配置，用 videoSendMode 替换 sendbase64 ([bc367fd](https://github.com/ikenxuan/karin-plugin-kkk/commit/bc367fd0e512b95a96f8a7a8c647ee6c43a9ea74))

## [2.23.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.23.1...v2.23.2) (2026-03-10)


### 🐛 错误修复

* **douyin:** 优化共创者信息显示并添加订阅者角色标识 ([bb16787](https://github.com/ikenxuan/karin-plugin-kkk/commit/bb167878719a5351ef0a30d97fa4331f88d39ff9))


### ♻️ 代码重构

* **douyin:** 重构作品类型判断逻辑 ([72b09c6](https://github.com/ikenxuan/karin-plugin-kkk/commit/72b09c6c98c90fec7b33bdacf3aa36d1bca0e707))

## [2.23.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.23.0...v2.23.1) (2026-03-09)


### 🐛 错误修复

* 抖音登录二维码加载不出来 ([6d966ec](https://github.com/ikenxuan/karin-plugin-kkk/commit/6d966ec6446f2f29d07912e55bfd229e0c8b9932))


### 💄 UI 优化

* **douyin:** 视频信息显示优化 ([c9cb1da](https://github.com/ikenxuan/karin-plugin-kkk/commit/c9cb1da6430ab975ea1bc64c0a08325f203cbf5a))

## [2.23.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.22.0...v2.23.0) (2026-03-07)


### ✨ 新功能

* 添加#kkk解析统计、#kkk解析总统计 ([65fe700](https://github.com/ikenxuan/karin-plugin-kkk/commit/65fe70040b69030c0c6866ac9ed771ffaeaef69b))


### 🐛 错误修复

* **bilibili:** 推送时图文动态解析图片数量为0的情况 ([e942a10](https://github.com/ikenxuan/karin-plugin-kkk/commit/e942a10a53e9e96f619addcacc9df7cfe14a7e20))


### 💄 UI 优化

* **douyin:** 视频信息支持浅色模式 ([f0c3863](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0c3863e503c550a3e57fe1103f36f26a55049b6))


### 🧰 其他更新

* eslint config ([9845c45](https://github.com/ikenxuan/karin-plugin-kkk/commit/9845c45d5a20470ac70432651977de0c927b9264))
* 优化模板开发体验 ([86baf86](https://github.com/ikenxuan/karin-plugin-kkk/commit/86baf86e0cf33129921cbddd6e1cd71a9a3127c1))
* 优化模板开发体验。 ([e557d3a](https://github.com/ikenxuan/karin-plugin-kkk/commit/e557d3ada9f890e9bc060bd8b9921747cf2ab7e5))
* 优化说明 ([92cb96d](https://github.com/ikenxuan/karin-plugin-kkk/commit/92cb96d71717730987f8f8d5e52efdf35659290a))

## [2.22.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.21.1...v2.22.0) (2026-03-07)


### ✨ 新功能

* **douyin:** 初步支持解析文章作品 ([d8b9243](https://github.com/ikenxuan/karin-plugin-kkk/commit/d8b92435d35e56693ceb37f18c451ef51ef86bee))


### 💯 细节优化

* **bilibili:** 解析图文动态时添加标题 close [#260](https://github.com/ikenxuan/karin-plugin-kkk/issues/260) ([2d61705](https://github.com/ikenxuan/karin-plugin-kkk/commit/2d617051aab57c92c9f06d81b5e45b338555fa5b))

## [2.21.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.21.0...v2.21.1) (2026-03-02)


### 🐛 错误修复

* 在线图片的上传方式配置 ([5d80aa5](https://github.com/ikenxuan/karin-plugin-kkk/commit/5d80aa571095e3851daa7120c724b75b38df83e7))

## [2.21.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.20.3...v2.21.0) (2026-03-02)


### ✨ 新功能

* (core): 新增配置支持将网络图片由插件进行下载发送（默认关闭），可避免上游下载图片超时导致的发送失败而抛出错误 ([d30ee88](https://github.com/ikenxuan/karin-plugin-kkk/commit/d30ee88f60af299802208bdc422116d42190cafc))
* **bilibili:** B站评论图片收集 ([10ceed0](https://github.com/ikenxuan/karin-plugin-kkk/commit/10ceed0f711fdb46b2c408eaddbdc1283413c4b0))


### 🐛 错误修复

* **bilibili:** 修复专栏链接带查询参数时解析失败 ([fd24333](https://github.com/ikenxuan/karin-plugin-kkk/commit/fd243338c0d4f6e8a6b3abce8a766854049f01c0))
* **bilibili:** 动态解析只有图文/纯图和视频动态才能解析评论的问题 ([e557f13](https://github.com/ikenxuan/karin-plugin-kkk/commit/e557f1384b6ed9cb108d366c3de79412a6ba6183))
* web.config ([c6dcb5c](https://github.com/ikenxuan/karin-plugin-kkk/commit/c6dcb5c185eb580d7fefda8dd2c70e951df73923))
* web.config 重复的 key ([b606a3f](https://github.com/ikenxuan/karin-plugin-kkk/commit/b606a3f9280144084564e2d8c6cd757cb3dd7824))
* 兼容性提高 ([c28dd31](https://github.com/ikenxuan/karin-plugin-kkk/commit/c28dd3126a45c5105dbb56735183f325b0a750f4))


### 💄 UI 优化

* **bilibili:** 优化评论图片显示 ([227a7a9](https://github.com/ikenxuan/karin-plugin-kkk/commit/227a7a94a38f84242bbf33519daf9cfb2fb14deb))
* 优化更新日志提示的说明 ([d1d0a65](https://github.com/ikenxuan/karin-plugin-kkk/commit/d1d0a65d5a34a8a4ed30df3b97fd1e8630a3aa4a))


### ♻️ 代码重构

* **core:** 替换 native 图片处理库为纯 JS 实现 ([c38b422](https://github.com/ikenxuan/karin-plugin-kkk/commit/c38b422a8466e73c75bfceaea7099da8fc2073f6))
* web.config 尝试使用一套数据源 ([#258](https://github.com/ikenxuan/karin-plugin-kkk/issues/258)) ([da5f65b](https://github.com/ikenxuan/karin-plugin-kkk/commit/da5f65b4bff21137143cc753c6334e1890181b39))


### 📦 依赖更新

* update ([4019070](https://github.com/ikenxuan/karin-plugin-kkk/commit/401907079b797d88feceb052338b297b66cb393a))


### ⚙️ 配置变更

* 各平台的解析提示迁移到 '插件应用相关' 类目中 ([9fc38ee](https://github.com/ikenxuan/karin-plugin-kkk/commit/9fc38ee2c149dbf981ecc72925380b57999db05a))


### 💯 细节优化

* 提高对二维码识别的成功率 ([2f19165](https://github.com/ikenxuan/karin-plugin-kkk/commit/2f191654b086add48245a687007d642331049297))

## [2.20.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.20.2...v2.20.3) (2026-02-26)


### 🐛 错误修复

* **bilibili:** 共创视频动态中，UP主头像错误 close [#256](https://github.com/ikenxuan/karin-plugin-kkk/issues/256) ([1c76932](https://github.com/ikenxuan/karin-plugin-kkk/commit/1c769322d527211e6686c9e0f290bccaebe74c83))


### 💄 UI 优化

* 优化版本警告组件 ([608d4f9](https://github.com/ikenxuan/karin-plugin-kkk/commit/608d4f958ada8210b36f122b69e8ceeed1af20e8))


### 🧰 其他更新

* update ([9799c18](https://github.com/ikenxuan/karin-plugin-kkk/commit/9799c183969516240c9a132c0759385e394d162c))
* 删除过时代码 ([291d24a](https://github.com/ikenxuan/karin-plugin-kkk/commit/291d24a5544874c1b6ea5685b5be9f84bb62ffb8))


### 💯 细节优化

* 优化表情回应逻辑 ([d23a6e7](https://github.com/ikenxuan/karin-plugin-kkk/commit/d23a6e7e3dc43d4275f464dbd6fbb02053714f3e))
* 兼容性提高 ([bcc6b71](https://github.com/ikenxuan/karin-plugin-kkk/commit/bcc6b71da6b7f85be5ec31c6d229c8fd2144a28a))
* 重构表情回应功能实现 ([dee0357](https://github.com/ikenxuan/karin-plugin-kkk/commit/dee0357fadebcf00aeffa8d0c1e8f30a0124011b))

## [2.20.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.20.1...v2.20.2) (2026-02-25)


### 🐛 错误修复

* **抖音:** 没有bgm导致解析错误 ([b8af209](https://github.com/ikenxuan/karin-plugin-kkk/commit/b8af2096e658c9ecca7122062cd6df8b9ea12e74))


### 🧰 其他更新

* 移除未使用依赖 ([b79194b](https://github.com/ikenxuan/karin-plugin-kkk/commit/b79194b5d57240a408d1e70937d4cf1e5094d6ea))


### 🗃️ 数据库迁移

* 优化删除逻辑 ([8208e66](https://github.com/ikenxuan/karin-plugin-kkk/commit/8208e66f345d4edb9fe4f945f7dea2fc2bfe752f))


### 💯 细节优化

* 表情回应功能占位 ([c96377e](https://github.com/ikenxuan/karin-plugin-kkk/commit/c96377e9aeed57285f273300e9a1566bf1ebbf18))

## [2.20.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.20.0...v2.20.1) (2026-02-23)


### 🐛 错误修复

* 抖音图集解析中，图片类型识别错误 ([3a1d57d](https://github.com/ikenxuan/karin-plugin-kkk/commit/3a1d57d7e7f7c68ed3cdae813d0a83b5bfc4fbb9))
* 获取封面图空指针错误 ([d8434c7](https://github.com/ikenxuan/karin-plugin-kkk/commit/d8434c746ee11671656bda17ddb754d2aa2a6422))


### ✨ 细节优化

* 兼容性提高 ([3ea0cf7](https://github.com/ikenxuan/karin-plugin-kkk/commit/3ea0cf7706bdef6a3d3ef0e121c0991782162728))

## [2.20.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.19.1...v2.20.0) (2026-02-23)


### ✨ 新功能

* **core:** 引用解析支持识别图片中的二维码进行解析 ([82e7878](https://github.com/ikenxuan/karin-plugin-kkk/commit/82e78788a53332b605a5fc5280d824eefc81b0f2))


### 💄 UI 优化

* **douyin:** 视频信息的字体优化 ([3d39d6c](https://github.com/ikenxuan/karin-plugin-kkk/commit/3d39d6c86dd7ced63d948e08e8ff3b6c8165bd3e))


### ✨ 细节优化

* 提高二维码识别兼容性 ([28ead9d](https://github.com/ikenxuan/karin-plugin-kkk/commit/28ead9da322af913e0defa1ac0f7118f44e9edb1))
* 细优 ([1f45d0b](https://github.com/ikenxuan/karin-plugin-kkk/commit/1f45d0b81c9dfd906e1be227ddbe799ec26377e4))

## [2.19.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.19.0...v2.19.1) (2026-02-21)


### 🐛 错误修复

* db init ([167baf4](https://github.com/ikenxuan/karin-plugin-kkk/commit/167baf4af8ff6a64eca8609cb89195b58ab7aa34))
* **douyin:** improve type safety and filtering in comments parsing, close [#251](https://github.com/ikenxuan/karin-plugin-kkk/issues/251) ([740d31b](https://github.com/ikenxuan/karin-plugin-kkk/commit/740d31b2dfbe70f0ffda11635091a9444abcee7e))


### 💄 UI 优化

* **douyin:** 弱化评论中昵称的颜色 ([401574a](https://github.com/ikenxuan/karin-plugin-kkk/commit/401574a534ab582a30e82cab65dd48ef6a8a42d0))


### ✨ 细节优化

* 优化接口库CK传递，修改ck后不再需要重启。 ([fc05e32](https://github.com/ikenxuan/karin-plugin-kkk/commit/fc05e32ad8ce13c7f43d9b8067e3248c405d7672))
* **抖音:** 订阅时默认关闭喜欢和推荐推送 ([b71f790](https://github.com/ikenxuan/karin-plugin-kkk/commit/b71f7900aba35b48da136af27c3056ca65debbf9))

## [2.19.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.18.3...v2.19.0) (2026-02-20)


### ✨ 新功能

* **抖音:** 实现订阅用户的点赞推操作送和推荐操作推送 [#248](https://github.com/ikenxuan/karin-plugin-kkk/issues/248) ([135ff58](https://github.com/ikenxuan/karin-plugin-kkk/commit/135ff58386c90ee544306ad4d63e7e5706ed1eef))


### 🐛 错误修复

* **抖音:** 该声音由于版权原因在当前地区不可用 ([12926b2](https://github.com/ikenxuan/karin-plugin-kkk/commit/12926b2d13bce6cc13a551535be4d7d68ba7e03d))


### 📝 文档更新

* update ([0870998](https://github.com/ikenxuan/karin-plugin-kkk/commit/087099825321e35f92d6280079250b1510ee9544))


### ✨ 细节优化

* 1 ([dd0727f](https://github.com/ikenxuan/karin-plugin-kkk/commit/dd0727fde5b6d4c4453617ad9ff89928ff3aa6ee))
* 兼容性提高 ([0767d60](https://github.com/ikenxuan/karin-plugin-kkk/commit/0767d60e23c1ddaf81a909496961606fa2055a94))
* **抖音:** 合辑解析将封面图也放进合并转发消息中 ([4b4f04b](https://github.com/ikenxuan/karin-plugin-kkk/commit/4b4f04b509293adb1bd94de86a278af02e2fafdb))

## [2.18.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.18.2...v2.18.3) (2026-01-27)


### 🐛 错误修复

* 重定向兼容性提高 ([5c7ea05](https://github.com/ikenxuan/karin-plugin-kkk/commit/5c7ea05bfbefb8c03947be3b8b505582c589f422))


### 🧰 其他更新

* template:dev 优化开发体验 ([c90caac](https://github.com/ikenxuan/karin-plugin-kkk/commit/c90caaca734a30b7a2d1ed447994f15844abb8a4))
* template:dev 兼容性提高 ([4ac290e](https://github.com/ikenxuan/karin-plugin-kkk/commit/4ac290ead15d46ac4f359cc06fb7605205cc553b))
* 细优 ([0af9293](https://github.com/ikenxuan/karin-plugin-kkk/commit/0af9293bf7d8b9acf38c06104a8ccef36e00b03e))
* 细优 ([5fef1ba](https://github.com/ikenxuan/karin-plugin-kkk/commit/5fef1baf2555b97bc6a2aa04a56971edb590e445))
* 细优 ([16273a2](https://github.com/ikenxuan/karin-plugin-kkk/commit/16273a280cedb07aa8487143304ad66fcde76655))
* 重写组件开发面板中子组件的缩放和拖拽逻辑。 ([74c7ea8](https://github.com/ikenxuan/karin-plugin-kkk/commit/74c7ea8bf5e507f66e7c50ab23a69ce0269dd5c3))

## [2.18.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.18.1...v2.18.2) (2026-01-18)


### 💄 UI 优化

* 发出的所有图片加个圆角 ([095d44d](https://github.com/ikenxuan/karin-plugin-kkk/commit/095d44dc1fc6217e3ca531170af3f2757d3cad15))


### 🧰 其他更新

* 重写模板开发面板布局，支持面板主题和子组件主题各自独立 ([48f9002](https://github.com/ikenxuan/karin-plugin-kkk/commit/48f9002bfbaee69b3f3ce6b3d971b63f11ee53dc))

## [2.18.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.18.0...v2.18.1) (2026-01-17)


### 💄 UI 优化

* 重写B站扫码登录 ([91e5367](https://github.com/ikenxuan/karin-plugin-kkk/commit/91e53672f53c744d9321d9f443b2616e4b485551))
* 重写帮助 ([6cad16b](https://github.com/ikenxuan/karin-plugin-kkk/commit/6cad16b45a1173356dd73bfdcbabbb83581e44e0))
* 重写抖音扫码登录 ([9a262b7](https://github.com/ikenxuan/karin-plugin-kkk/commit/9a262b7e0f6a7db916a47461d7f9a826c74eeeb9))
* 重写推送列表 ([74e3a7f](https://github.com/ikenxuan/karin-plugin-kkk/commit/74e3a7f74206496014632801459f6215e85dc12f))


### 🧰 其他更新

* **template:dev:** 添加 Monaco 编辑器支持并实现 Mock 数据编辑功能 ([f0c60ae](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0c60ae5c5b88da1b879983a1f511e8cf5b2bce7))
* 兼容性提高 ([f0c7dca](https://github.com/ikenxuan/karin-plugin-kkk/commit/f0c7dcac9e1e23e1a71cd890d2763fbc72601957))


### 📦 依赖更新

* update ([91a284d](https://github.com/ikenxuan/karin-plugin-kkk/commit/91a284d0e563811050783177840bbcc972ea0391))


### ✨ 细节优化

* 1 ([4c00277](https://github.com/ikenxuan/karin-plugin-kkk/commit/4c0027755c03c1cd39a6278dae07bbca550548fe))
* className rename ([19bcffb](https://github.com/ikenxuan/karin-plugin-kkk/commit/19bcffbb4bbb21a56783652c346e9073a0b63765))
* 兼容性提高 ([7a3b433](https://github.com/ikenxuan/karin-plugin-kkk/commit/7a3b433fcf72f051b58af2f8affd5a81f03ab214))
* 移除重复资源 ([162846a](https://github.com/ikenxuan/karin-plugin-kkk/commit/162846ac1a5f5cad24bd94177a5144f61e8ccd83))
* 错误日志支持发送给所有主人 ([f9b5fcc](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b5fcc3445dd2391c5b883d8f894304950b55b6))

## [2.18.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.17.1...v2.18.0) (2026-01-13)


### ✨ 新功能

* **bilibili:** 支持更多相关内容卡片 [#241](https://github.com/ikenxuan/karin-plugin-kkk/issues/241) ([ef4c307](https://github.com/ikenxuan/karin-plugin-kkk/commit/ef4c30794177e034da7067be9abfc176c16f97c5))


### 🐛 错误修复

* add忽略表情回应失败配置项 [#240](https://github.com/ikenxuan/karin-plugin-kkk/issues/240) ([2101174](https://github.com/ikenxuan/karin-plugin-kkk/commit/21011749775f6258ccfbcd0ec976223261d51cd8))
* 更新、适配接口库新版本 ([1dc5dbc](https://github.com/ikenxuan/karin-plugin-kkk/commit/1dc5dbc450a34a42310871c1733c938b7e2b11f0))


### 💄 UI 优化

* close [#241](https://github.com/ikenxuan/karin-plugin-kkk/issues/241) ([bb1cf25](https://github.com/ikenxuan/karin-plugin-kkk/commit/bb1cf25eec7abdc0e226368355fd7329e8b515be))
* update vite and rolldown logo ([2a15547](https://github.com/ikenxuan/karin-plugin-kkk/commit/2a1554746a2580fdc7b6634103f4b13ec4abbb26))
* 优化错误日志 ([a9adb66](https://github.com/ikenxuan/karin-plugin-kkk/commit/a9adb66fed97f43ae2692b9bc58ab116fc524c12))
* 图文动态添加直播预约卡片 [#241](https://github.com/ikenxuan/karin-plugin-kkk/issues/241) ([a368670](https://github.com/ikenxuan/karin-plugin-kkk/commit/a3686705320ceff30f0f6f903ff9b932fc768e64))
* 抖音封面组件 ([e9fd321](https://github.com/ikenxuan/karin-plugin-kkk/commit/e9fd32193e6021059254980937b6c7fb25135b18))


### 🧰 其他更新

* logger ([0452b4e](https://github.com/ikenxuan/karin-plugin-kkk/commit/0452b4e2d3788917830156f756eba2be4eec82f9))
* 删除插件自带web ([#243](https://github.com/ikenxuan/karin-plugin-kkk/issues/243)) ([d8ba2c4](https://github.com/ikenxuan/karin-plugin-kkk/commit/d8ba2c449551631118af4c27d1f01cc71a398d93))


### 📦 依赖更新

* 接口库版本 ([5d2a2e1](https://github.com/ikenxuan/karin-plugin-kkk/commit/5d2a2e129e22e7a0bd7d71ad600c052a8e64d835))


### ✨ 细节优化

* 兼容性提高 ([f9e6019](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9e601963564d05c19c1a978210cdf0a46d5cb2f))
* 即使变成小猫咪 还是没办法和你一起玩吗 ([754ae27](https://github.com/ikenxuan/karin-plugin-kkk/commit/754ae278e00808c87438e69c792ed6cf1340d0d0))
* 嘿嘿嘿 贤者我是小猫咪 ([10781ec](https://github.com/ikenxuan/karin-plugin-kkk/commit/10781ec26e052f829430418193d234f95bfda497))
* 细优 ([defc1ea](https://github.com/ikenxuan/karin-plugin-kkk/commit/defc1ea2a7e52a086d602f8246b645ffa2a9b2ae))
* 细优 ([358c994](https://github.com/ikenxuan/karin-plugin-kkk/commit/358c994bacc7916da4764216ea90fd5a694a382a))
* 细优 ([0ef737c](https://github.com/ikenxuan/karin-plugin-kkk/commit/0ef737c86525d8ecc21b686513bb6f1341a3a1dd))
* 细优 ([d3e2b6f](https://github.com/ikenxuan/karin-plugin-kkk/commit/d3e2b6f59fb00c369c95b3112735dc739d738424))
* 细优 ([c3df010](https://github.com/ikenxuan/karin-plugin-kkk/commit/c3df010444ba14019aefddcf0d390f39225a3091))
* 细优 ([62d7a68](https://github.com/ikenxuan/karin-plugin-kkk/commit/62d7a6868b86af021c594bc74a54dbae83d2d080))
* 细优 ([16e355d](https://github.com/ikenxuan/karin-plugin-kkk/commit/16e355da61156577ecc2beedb0bc2363523e4982))
* 细优 ([fe7c277](https://github.com/ikenxuan/karin-plugin-kkk/commit/fe7c2774b8cbf33012825534cbae87507c85a819))

## [2.17.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.17.0...v2.17.1) (2025-12-25)


### 🐛 错误修复

* 提高兼容性 close [#237](https://github.com/ikenxuan/karin-plugin-kkk/issues/237) ([4d06880](https://github.com/ikenxuan/karin-plugin-kkk/commit/4d0688011380beec9c8f71fad294af84ae8eb13a))


### 📝 文档更新

* readme ([1866817](https://github.com/ikenxuan/karin-plugin-kkk/commit/1866817e7f91bd686754e412b9578c4223949144))


### 📦 依赖更新

* peerDependencies ([734e8d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/734e8d7b86db22c97fee2380b51652106a968ef0))
* peerDependencies ([c93b686](https://github.com/ikenxuan/karin-plugin-kkk/commit/c93b686c7489190b9c4a30ca132fd3f39afa125a))


### ✨ 细节优化

* 增加 `#弹幕解析` ([177017b](https://github.com/ikenxuan/karin-plugin-kkk/commit/177017b3396fe85dd79392ebf1e10e48e2c10ad0))
* 添加弹幕清晰度配置 ([2fc794c](https://github.com/ikenxuan/karin-plugin-kkk/commit/2fc794c3bd0c0509461b58cb44f63d86f1069e82))

## [2.17.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.16.0...v2.17.0) (2025-12-19)


### ✨ 新功能

* **bilibili:** 实验性添加弹幕烧录到视频功能，实现B站APP端看体验 ([5925663](https://github.com/ikenxuan/karin-plugin-kkk/commit/5925663b26007e62c4c35f328bc45843950e686b))
* **danmaku:** Add multi-codec video encoding support with bitrate detection ([998668b](https://github.com/ikenxuan/karin-plugin-kkk/commit/998668bb02ab4459f158b438d0cf1c1994213528))
* 抖音弹幕烧录 ([3c0a39d](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0a39dd1d2928a334c562694c3760230865d6d8))


### 📝 文档更新

* readme ([2e54130](https://github.com/ikenxuan/karin-plugin-kkk/commit/2e5413008b78c7d3766ac2c3e66ecb6c321ad181))
* 添加更变日志 ([c6fba37](https://github.com/ikenxuan/karin-plugin-kkk/commit/c6fba3777b36fdbce6c7ef6a49ea05a005582494))
* 添加硬编码弹幕文档说明 ([deba5e8](https://github.com/ikenxuan/karin-plugin-kkk/commit/deba5e844037d241c02328e98aa1aa0b843f5919))


### 💄 UI 优化

* 重新设计了版本警告组件喵 ([1febb14](https://github.com/ikenxuan/karin-plugin-kkk/commit/1febb1425843f1165906df752037a420f4693f9e))


### 🧰 其他更新

* types ([3d69522](https://github.com/ikenxuan/karin-plugin-kkk/commit/3d6952226062489a55f31a0d9f370eadbf1dcbdf))
* 更新类型文件路径 ([51205dc](https://github.com/ikenxuan/karin-plugin-kkk/commit/51205dc850090502c57dc5335aa162b127967c20))


### ✨ 细节优化

* **bilibili:** 优化配置 ([e3fac48](https://github.com/ikenxuan/karin-plugin-kkk/commit/e3fac482c08e13420b8ff2d7ec9aff899cb41f0a))
* web.config ([fa23243](https://github.com/ikenxuan/karin-plugin-kkk/commit/fa232437168774f0197ab7ec1b837c9731d05831))
* 可选三档弹幕字号 ([4f901ab](https://github.com/ikenxuan/karin-plugin-kkk/commit/4f901abb5134013cbc1cbeb9c2447828d6d10b01))
* 更新滚动弹幕算法 ([a1f54e3](https://github.com/ikenxuan/karin-plugin-kkk/commit/a1f54e33e8e984962d0e291e03460140236f4882))
* 细优抖音弹幕字体 ([399489a](https://github.com/ikenxuan/karin-plugin-kkk/commit/399489a8afaf803131ac4be95d3c15cc5c22dde2))
* 轨道计算、码率计算 ([6254423](https://github.com/ikenxuan/karin-plugin-kkk/commit/62544237aefde87ac856840bab7c392e0dade4de))

## [2.16.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.15.2...v2.16.0) (2025-12-13)


### ✨ 新功能

* **core:** 新增启动时版本检查（beta） ([a76b2c0](https://github.com/ikenxuan/karin-plugin-kkk/commit/a76b2c0252533cbb686e47bad46248dc34c3758c))
* **抖音:** 添加次级评论解析功能并优化评论展示 ([13aa2da](https://github.com/ikenxuan/karin-plugin-kkk/commit/13aa2dab7f2ffc214ef7314a0578b3278368478f))
* 更新node-karin依赖至1.13.8版本 ([e9fdf3e](https://github.com/ikenxuan/karin-plugin-kkk/commit/e9fdf3ec23b26cc9dfa3139cb786cfc7c49992cf))


### 🐛 错误修复

* **build-metadata:** 确保git命令在仓库根目录执行 ([e9fdf3e](https://github.com/ikenxuan/karin-plugin-kkk/commit/e9fdf3ec23b26cc9dfa3139cb786cfc7c49992cf))
* types，throw handlerError Error ([e74a98f](https://github.com/ikenxuan/karin-plugin-kkk/commit/e74a98f0f2a675b3faace42b531a4c54e9ffbb91))
* 手动更新获取不到更新日志 ([c4a9cdb](https://github.com/ikenxuan/karin-plugin-kkk/commit/c4a9cdb4878f7801f82f9323a0cf8c8fe08cd935))
* 抖音直播推送刚开播获取不到直播封面的边缘情况 ([55ff549](https://github.com/ikenxuan/karin-plugin-kkk/commit/55ff54929c4e83d10148488042ce8e01b8ebb508))


### 📝 文档更新

* **docs:** 更新文档站点UI与功能，新增暗黑模式支持与响应式设计 ([b2a6e11](https://github.com/ikenxuan/karin-plugin-kkk/commit/b2a6e11526d4285fa4bb45846dab2b825dc5245a))
* readme ([93393e8](https://github.com/ikenxuan/karin-plugin-kkk/commit/93393e89a94300692c3a9a3eda09ed1c60dcba5e))


### 🧰 其他更新

* build ci/cd ([8fde15c](https://github.com/ikenxuan/karin-plugin-kkk/commit/8fde15c00e0cc0219f0ac5a7c9c7074cd899c8cb))
* karin版本最低1.14.0 ([2c08cf5](https://github.com/ikenxuan/karin-plugin-kkk/commit/2c08cf5ab2dabebb3b7a3694120fc3326349be85))
* 优化模板开发面板，优化开发体验 ([ff98038](https://github.com/ikenxuan/karin-plugin-kkk/commit/ff98038a78e7ec7edb6495704a280584eefc98f2))
* 工作区子模块？ ([72500e1](https://github.com/ikenxuan/karin-plugin-kkk/commit/72500e118594a3226cb9e4b38afa183fffe3c5e2))
* 改炸了 ([52ba955](https://github.com/ikenxuan/karin-plugin-kkk/commit/52ba95560fe5dd81fd505009ff6e5d4c37df7cb2))
* 无关紧要的更新 ([3d32c07](https://github.com/ikenxuan/karin-plugin-kkk/commit/3d32c0778c4b48332f8430714579ce6331b81558))
* 添加typescript-eslint开发依赖 ([e9fdf3e](https://github.com/ikenxuan/karin-plugin-kkk/commit/e9fdf3ec23b26cc9dfa3139cb786cfc7c49992cf))
* 细优模板开发面板 ([52744a5](https://github.com/ikenxuan/karin-plugin-kkk/commit/52744a52a930a63925052b9552d376f1346bbe00))


### ♻️ 代码重构

* **logger:** 重构日志模块使用node-karin/log4js替代自定义实现 ([e9fdf3e](https://github.com/ikenxuan/karin-plugin-kkk/commit/e9fdf3ec23b26cc9dfa3139cb786cfc7c49992cf))


### 📦 依赖更新

* update ([b143293](https://github.com/ikenxuan/karin-plugin-kkk/commit/b143293ac7b8cce5a08a3a2ac9a3f1c232f27d06))


### ✨ 细节优化

* boom ([2277156](https://github.com/ikenxuan/karin-plugin-kkk/commit/22771568f6a04e9f983a9322741d7c7d49716951))
* use checkPort ([3c04494](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c044945170e0107a6caaeb400de6b29c1761376))
* 优化更新流程 ([118443f](https://github.com/ikenxuan/karin-plugin-kkk/commit/118443f671aa096d9225509b32a1597cf2e6edc7))
* 兼容性提高 ([eefd8e6](https://github.com/ikenxuan/karin-plugin-kkk/commit/eefd8e67ab3b309b5799f9cce0bad155eec6a4a2))
* 兼容性提高 ([790d7be](https://github.com/ikenxuan/karin-plugin-kkk/commit/790d7be05af91641fe4d3780476a6140cbe960fb))
* 脱敏打印 ([7d63492](https://github.com/ikenxuan/karin-plugin-kkk/commit/7d634920f8e5f7fe818997d8d87176a59ee7a04d))

## [2.15.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.15.1...v2.15.2) (2025-12-07)


### 🐛 错误修复

* 更新小红书算法v4.86.0 ([d133a54](https://github.com/ikenxuan/karin-plugin-kkk/commit/d133a54b37b3cecb81ae6b92e72d48dc95629e12))
* 更新状态判断失误 ([0598334](https://github.com/ikenxuan/karin-plugin-kkk/commit/0598334cd281e040a7dba7d8349ccd6c0ce3f2d9))
* 迁移到@snapka/puppeteer ([#232](https://github.com/ikenxuan/karin-plugin-kkk/issues/232)) ([848926b](https://github.com/ikenxuan/karin-plugin-kkk/commit/848926bb4463149847d0f40e0bb0e5c4d2f0bc64))


### 📝 文档更新

* readme ([bdb3468](https://github.com/ikenxuan/karin-plugin-kkk/commit/bdb3468d67bef7df4c81ebbbd400f00ae4b87a31))

## [2.15.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.15.0...v2.15.1) (2025-12-02)


### 🐛 错误修复

* 删除测试命令 ([cf18e81](https://github.com/ikenxuan/karin-plugin-kkk/commit/cf18e81e8bcae6db48b6504d10b9c9b4262aad85))

## [2.15.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.14.0...v2.15.0) (2025-12-02)


### ✨ 新功能

* **core:** add bilibili risk control verification and error handling improvements ([9b2f327](https://github.com/ikenxuan/karin-plugin-kkk/commit/9b2f32775a7155203d915a79d0a826b4b4e99c2d))


### 🐛 错误修复

* lock ([11dac86](https://github.com/ikenxuan/karin-plugin-kkk/commit/11dac86404409444b95478150e8db3b31acf1288))


### 📝 文档更新

* lock 2 ([152ea7e](https://github.com/ikenxuan/karin-plugin-kkk/commit/152ea7e72d57e50a56322072628cf727b6a88a21))
* 更新文档 ([1d24c2d](https://github.com/ikenxuan/karin-plugin-kkk/commit/1d24c2dfd337eaedddd4ad0d7396bc02ab6bce2d))


### 🧰 其他更新

* fix build ([b868497](https://github.com/ikenxuan/karin-plugin-kkk/commit/b868497536cc70e2370772dfc6c4f27d7c4a74c8))
* Readme ([d707e61](https://github.com/ikenxuan/karin-plugin-kkk/commit/d707e6184374a665db2bd60e227ddb12804e41c0))


### ♻️ 代码重构

* **douyin:** remove fingerprint-generator dependency ([0c4fb12](https://github.com/ikenxuan/karin-plugin-kkk/commit/0c4fb12269efa46f66cc73e8581eb26e50d457a6))


### 📦 依赖更新

* update ([96d2ddd](https://github.com/ikenxuan/karin-plugin-kkk/commit/96d2ddd97e87d8e6755e7601f82f30f707a7cca6))

## [2.14.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.13.0...v2.14.0) (2025-11-28)


### ✨ 新功能

* **douyin:** 新增配置 `liveImageMergeMode` ,可选择合辑中live图的bgm合并方式。 ([26d16e2](https://github.com/ikenxuan/karin-plugin-kkk/commit/26d16e2f55f51961ef25aa28e78d0fe8ad9a9727))


### 🐛 错误修复

* 1 ([ee5742d](https://github.com/ikenxuan/karin-plugin-kkk/commit/ee5742dc539160e4a5d7540fbaf8793e4c2b949f))
* **bilibili:** adjust image reply order in dynamic parsing ([c4569be](https://github.com/ikenxuan/karin-plugin-kkk/commit/c4569becd21a269cf1c6833a0ff6c1e26a3855b7))
* create_time ([97c6db9](https://github.com/ikenxuan/karin-plugin-kkk/commit/97c6db99d818034a5ef17c233d205e2f4bc4aa32))
* **error-handler:** improve error stack formatting and ANSI color parsing ([5f8b6b4](https://github.com/ikenxuan/karin-plugin-kkk/commit/5f8b6b490faca860c53d7da1dbab2fe8144b57c0))
* reg ([9181b9c](https://github.com/ikenxuan/karin-plugin-kkk/commit/9181b9caca5a90765329b5c283bc7ca691e90397))
* 抖音二级评论表情包获取失败 ([3412bfc](https://github.com/ikenxuan/karin-plugin-kkk/commit/3412bfcfbc15ffcd10213cd1be821b466b44b8c4))


### 💄 UI 优化

* 同步UI ([809d904](https://github.com/ikenxuan/karin-plugin-kkk/commit/809d904d785ab1412a3e0e72f0c4ec86f6d44779))
* 细优 ([c3595b9](https://github.com/ikenxuan/karin-plugin-kkk/commit/c3595b9d3f114a2859b8f69795af8affe792c943))
* 细优 ([30f9f1d](https://github.com/ikenxuan/karin-plugin-kkk/commit/30f9f1ddfd2e914e3c780abf95deb42ac0b3dba6))
* 细优 ([f68caf0](https://github.com/ikenxuan/karin-plugin-kkk/commit/f68caf086a2e48b21d4d6dcda9784cf8b0a0e1ca))
* 细优 ([6264d81](https://github.com/ikenxuan/karin-plugin-kkk/commit/6264d8144d275185311d90b16a33bee448445edd))


### ♻️ 代码重构

* **douyin:** rename push video quality config parameters ([b39b728](https://github.com/ikenxuan/karin-plugin-kkk/commit/b39b728ccbeb6fb249cbcfa7468d5072b62ae2d4))
* **error-handler:** replace static error emoji with dynamic QFace emoji ([f388a82](https://github.com/ikenxuan/karin-plugin-kkk/commit/f388a82050543d35a4a2ccde4f413ced434cf8fb))
* 重构FFmpeg逻辑 ([26d16e2](https://github.com/ikenxuan/karin-plugin-kkk/commit/26d16e2f55f51961ef25aa28e78d0fe8ad9a9727))


### ✅ 测试相关

* add vitest ([e6eb207](https://github.com/ikenxuan/karin-plugin-kkk/commit/e6eb207ff9c01b0b086d34a6f1676b6d3ac7de73))
* 添加屎山 包体积+++ ([1db256f](https://github.com/ikenxuan/karin-plugin-kkk/commit/1db256f4c132e5ad1ebf29bbf221c727d44fea13))
* 用happy-dom替换jsdom ([ead6e9d](https://github.com/ikenxuan/karin-plugin-kkk/commit/ead6e9dcc469a758147a960973feb125635efe6a))


### 📦 依赖更新

* amagi update to 5.11.1 ([5933141](https://github.com/ikenxuan/karin-plugin-kkk/commit/5933141b52a5e103ada7e1054a165614e60df741))
* rm ansi-to-html ([56462f6](https://github.com/ikenxuan/karin-plugin-kkk/commit/56462f641538b3d40b4e123060ccf08736687afa))
* 更新 ([f27af3b](https://github.com/ikenxuan/karin-plugin-kkk/commit/f27af3b53bfcf3f67c168ddfcb21975da0ed217a))


### ✨ 细节优化

* 优化屎山 ([e3ece3f](https://github.com/ikenxuan/karin-plugin-kkk/commit/e3ece3fc45e3ce6c7e0162a83e64d05fc792dbb5))
* 优化模板开发 ([ff0ee9c](https://github.com/ikenxuan/karin-plugin-kkk/commit/ff0ee9c7f74f4f46ada2e3b5431aa5a5121e92e1))
* 更多镜像源。 ([9058450](https://github.com/ikenxuan/karin-plugin-kkk/commit/9058450f4c6ec92e2332a2e3e852cfe4e4c411b1))
* 细优 ([65fbd6b](https://github.com/ikenxuan/karin-plugin-kkk/commit/65fbd6b910c01e1e8d0919297bcd802982835acd))

## [2.13.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.12.0...v2.13.0) (2025-11-26)


### ✨ 新功能

* **douyin:** Refactor user video list data structure and UI components ([5a891db](https://github.com/ikenxuan/karin-plugin-kkk/commit/5a891db84510c84a42bb377d51c42b530809fedf))
* 抖音用户主页视频列表图片。 ([30a8cfb](https://github.com/ikenxuan/karin-plugin-kkk/commit/30a8cfb749ba2e761b4d2f48a47920814126acb1))


### 🐛 错误修复

* 。 ([d13dd5f](https://github.com/ikenxuan/karin-plugin-kkk/commit/d13dd5face0e21e3f2b186ded25a15634c8c4023))
* 1 ([807bf47](https://github.com/ikenxuan/karin-plugin-kkk/commit/807bf47a6b8fc9fd0797d0c6edf3819e6bac4b98))
* boom ([88d7878](https://github.com/ikenxuan/karin-plugin-kkk/commit/88d7878eb791efd6c4278d51e5a074f7f66c61c3))
* Contact ([ff1a3e8](https://github.com/ikenxuan/karin-plugin-kkk/commit/ff1a3e8417a51bbd1a4dc99c81df26cb04a91ce7))
* Refactor code structure for improved readability and maintainability ([0924b29](https://github.com/ikenxuan/karin-plugin-kkk/commit/0924b291a30a559332d7baa4f73ef56bbc0ca3ad))
* template，提升开发体验 ([a0a3429](https://github.com/ikenxuan/karin-plugin-kkk/commit/a0a342950dd154d8990fd17501f23863cb392a99))
* template，提升开发体验 ([cb099eb](https://github.com/ikenxuan/karin-plugin-kkk/commit/cb099eb1c391fd81c33bfa94ede42c0ed0a87a59))
* template，提升开发体验 ([8b776e3](https://github.com/ikenxuan/karin-plugin-kkk/commit/8b776e3a9c0960348433bc94494c203ece23ef64))
* 提升开发体验 ([379e6ad](https://github.com/ikenxuan/karin-plugin-kkk/commit/379e6ad4c1d38f5c92cd22072ebc555c58bb6a5e))
* 还是让tsc来生成types吧。。。 ([26bef73](https://github.com/ikenxuan/karin-plugin-kkk/commit/26bef73042bdfbd5892ad3fc2457930d45d16dad))


### ♻️ 代码重构

* **template:** 重构模板开发面板 ([de40f5f](https://github.com/ikenxuan/karin-plugin-kkk/commit/de40f5f78a992fd8c022220d81959db87c24d9d9))

## [2.12.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.11.6...v2.12.0) (2025-11-22)


### ✨ 新功能

* 捕获所有日志 [@sj817](https://github.com/sj817) ([#225](https://github.com/ikenxuan/karin-plugin-kkk/issues/225)) ([cf925f9](https://github.com/ikenxuan/karin-plugin-kkk/commit/cf925f9aca9d8ff242cc035f1c48bff7510ccd33))


### ♻️ 代码重构

* **core:** 重构amagi客户端调用方式，提取为独立模块 ([3eb5649](https://github.com/ikenxuan/karin-plugin-kkk/commit/3eb5649203b63abf3efe3efdfed40b92fc9406c5))

## [2.11.6](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.11.5...v2.11.6) (2025-11-15)


### 🐛 错误修复

* **douyin:** 二级评论图片支持并优化样式 ([4101f88](https://github.com/ikenxuan/karin-plugin-kkk/commit/4101f888d3fae2c64b9d9cb155533c7119e39fe9))

## [2.11.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.11.4...v2.11.5) (2025-11-13)


### 🐛 错误修复

* **douyin:** Handle special user states with optional chaining ([713a07e](https://github.com/ikenxuan/karin-plugin-kkk/commit/713a07ea2a89b4aab7711eec04d80078c21bdb67))

## [2.11.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.11.3...v2.11.4) (2025-11-13)


### 🐛 错误修复

* **douyin:** 处理账号的特殊状态 ([025d707](https://github.com/ikenxuan/karin-plugin-kkk/commit/025d707817416d943d773eeca255a2202327ce81))


### 💄 UI 优化

* **ui:** 将JetBrains Mono字体添加到项目资源中 ([b371a09](https://github.com/ikenxuan/karin-plugin-kkk/commit/b371a09dafea399215789de2d7cd6660390fb8b2))

## [2.11.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.11.2...v2.11.3) (2025-11-13)


### 🐛 错误修复

* 提高兼容性 ([c147834](https://github.com/ikenxuan/karin-plugin-kkk/commit/c147834ddd43fd027e5621b689773a15d90b6f36))


### 💄 UI 优化

* **error-handler:** Enhance error page with new crying emoji and text refinements ([618e437](https://github.com/ikenxuan/karin-plugin-kkk/commit/618e437f43f73fb456547aff98cfd220a822863d))
* 更新提示浅色模式下不显示新版本号 ([435a21e](https://github.com/ikenxuan/karin-plugin-kkk/commit/435a21e879677fc6c0d5b22dab02db12e81c1e9e))

## [2.11.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.11.1...v2.11.2) (2025-11-11)


### 💄 UI 优化

* **bilibili:** 同步评论图头部样式 ([5c808ff](https://github.com/ikenxuan/karin-plugin-kkk/commit/5c808ffed74ef9cde952ce81eeeabc143fbf7c3c))
* **error-handler:** Enhance error reporting with adapter information and improved UI ([ffbd3e5](https://github.com/ikenxuan/karin-plugin-kkk/commit/ffbd3e5c929e9d6c362312626acccd4332d52058))

## [2.11.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.11.0...v2.11.1) (2025-11-11)


### 🐛 错误修复

* **download:** 下载视频连接被重置时使用断点传续进行retry ([ad0525c](https://github.com/ikenxuan/karin-plugin-kkk/commit/ad0525c275c48fa991fdafebde0442ab744623b2))


### 🔒 安全修复

* **networks:** 给抛出错误日志进行脱敏处理 ([68a9521](https://github.com/ikenxuan/karin-plugin-kkk/commit/68a95210db34cbef67d690a13631c374464bb841))

## [2.11.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.10.3...v2.11.0) (2025-11-10)


### ✨ 新功能

* **douyin:** 添加新的配置选项 `commentImageCollection` 以控制评论区图片收集 ([4f98c4d](https://github.com/ikenxuan/karin-plugin-kkk/commit/4f98c4ddc6d74d7d2a650d9dad3090216c8c791c))
* **networks:** 实验性添加断点传续（AI写的 ([1247564](https://github.com/ikenxuan/karin-plugin-kkk/commit/1247564b354aa8acb45d506af43b4abe7f7105d5))


### 🐛 错误修复

* **changelog:** Correct version comparison in changelog generation ([9b13b37](https://github.com/ikenxuan/karin-plugin-kkk/commit/9b13b37db88ece04ac207c350ab9b443dc2b6c99))
* **douyin:** 改进评论处理和UI ([b8716d2](https://github.com/ikenxuan/karin-plugin-kkk/commit/b8716d2eaae0f1b3952a526f8f22875f5664daf0))
* **download:** 改进下载进度条的计算和处理 ([3445e6d](https://github.com/ikenxuan/karin-plugin-kkk/commit/3445e6df9d03f8b44bb0d7ea4f182470ddf6e239))
* 爆炸了 ([06deaf8](https://github.com/ikenxuan/karin-plugin-kkk/commit/06deaf868904827a634743d33e6ec72c82dc41b4))
* 细节优化 ([0795b63](https://github.com/ikenxuan/karin-plugin-kkk/commit/0795b635bcc45a0298a5ecffb427a6bfc02b4c61))


### 💄 UI 优化

* **douyin:** 评论图增加视频分辨率 ([7608346](https://github.com/ikenxuan/karin-plugin-kkk/commit/760834657cd71407d0edac0144497275c60c4981))
* 错误页面移除大BUG虫子 ([901a66e](https://github.com/ikenxuan/karin-plugin-kkk/commit/901a66e80af0b68247dc11ba8f26812fb27514b1))

## [2.10.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.10.2...v2.10.3) (2025-11-07)


### 🐛 错误修复

* null pointer error in article dynamic push for scheduled tasks ([#213](https://github.com/ikenxuan/karin-plugin-kkk/issues/213)) ([66e032f](https://github.com/ikenxuan/karin-plugin-kkk/commit/66e032f811ee83d2898c83854bcb1bfe3f8f796c))

## [2.10.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.10.1...v2.10.2) (2025-11-02)


### 🐛 错误修复

* 改炸了 ([6a4bc50](https://github.com/ikenxuan/karin-plugin-kkk/commit/6a4bc50424c69fc86ac4a608bfe04089c6999bcf))


### 💄 UI 优化

* 错误日志和更新日志实验性添加构建元数据 ([336097a](https://github.com/ikenxuan/karin-plugin-kkk/commit/336097a408be77d2cb7a356cc5cfd49191b7b752))


### 🏗️ 构建系统

* 改用oxc ([6904f61](https://github.com/ikenxuan/karin-plugin-kkk/commit/6904f6141248deca7c65461cb5edcad01925b6dc))

## [2.10.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.10.0...v2.10.1) (2025-11-01)


### 🐛 错误修复

* Cannot read properties ofundefined (reading'fan') ([6512c4e](https://github.com/ikenxuan/karin-plugin-kkk/commit/6512c4ec7fb200849d15c6abdc88768b28689ad9))

## [2.10.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.9.5...v2.10.0) (2025-11-01)


### ✨ 新功能

* **bilibili:** 支持部分评论的二级评论渲染 ([7c2af66](https://github.com/ikenxuan/karin-plugin-kkk/commit/7c2af66a259b5a461124b746b3d98436191c9ac5))


### 🐛 错误修复

* 修复专栏动态推送this.e.reply未定义 ([a8610a1](https://github.com/ikenxuan/karin-plugin-kkk/commit/a8610a165ff05d6a43294f64ae141a70eb55b8d6))


### 💄 UI 优化

* **error-handler:** 更新错误日志组件UI ([b8506c5](https://github.com/ikenxuan/karin-plugin-kkk/commit/b8506c5f2b33c84627c55b5b9c0883d68f30e21e))
* **platforms:** 推送列表组件改为两栏布局，添加开关显示 ([05171b8](https://github.com/ikenxuan/karin-plugin-kkk/commit/05171b8562d40d9f2bd7ae3b993295d039618fb8))


### 🧰 其他更新

* 更新一些方法名 ([a8610a1](https://github.com/ikenxuan/karin-plugin-kkk/commit/a8610a165ff05d6a43294f64ae141a70eb55b8d6))

## [2.9.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.9.4...v2.9.5) (2025-10-31)


### 🐛 错误修复

* 细优 ([0464cd9](https://github.com/ikenxuan/karin-plugin-kkk/commit/0464cd9e8b70b7ee69afb35dd6b7744f64c2d0ce))

## [2.9.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.9.3...v2.9.4) (2025-10-30)


### 🐛 错误修复

* 1 ([9699c16](https://github.com/ikenxuan/karin-plugin-kkk/commit/9699c167fd3c22e45e4f9e9945e995eb08188893))
* 1 ([c773f8c](https://github.com/ikenxuan/karin-plugin-kkk/commit/c773f8c8906a72e0414b7323705f86fb88bff396))
* **bilibili:** Enhance article dynamic rendering with image extraction ([6bd2541](https://github.com/ikenxuan/karin-plugin-kkk/commit/6bd254128623651f5318d1a296d2a97d912765c8))
* **douyin:** Enhance login flow and error handling for Douyin QR code authentication ([32c2a88](https://github.com/ikenxuan/karin-plugin-kkk/commit/32c2a884604b1be65282462819dec0c65ba9c0a7))
* **xiaohongshu:** Improve comment rendering and text processing ([456667c](https://github.com/ikenxuan/karin-plugin-kkk/commit/456667c7e1f58d0142bc27fdcd426fbb64dd03e3))
* 适配av号的稿件 ([ceb4ade](https://github.com/ikenxuan/karin-plugin-kkk/commit/ceb4ade90ba676ec3cd99d34c1c868ff6aaf1396))

## [2.9.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.9.2...v2.9.3) (2025-10-29)


### 🐛 错误修复

* **bilibili:** Enhance article dynamic rendering and data handling ([705cdbc](https://github.com/ikenxuan/karin-plugin-kkk/commit/705cdbc3c4312a12a08541d0578dd849a16dad3d))
* **bilibili:** Enhance forward dynamic rendering with title support ([83f9d78](https://github.com/ikenxuan/karin-plugin-kkk/commit/83f9d78b994fd34b1373b4d8230908375115954d))
* **bilibili:** Enhance image proxy handling in shared component ([491ace8](https://github.com/ikenxuan/karin-plugin-kkk/commit/491ace8a14f0432274a4a757183ec489bb246225))
* douyin login ([#59](https://github.com/ikenxuan/karin-plugin-kkk/issues/59)) ([b92cc71](https://github.com/ikenxuan/karin-plugin-kkk/commit/b92cc7160396887b71523e5ca99ebf3792292084))
* 哎呀 ([e100401](https://github.com/ikenxuan/karin-plugin-kkk/commit/e1004018677cddaa6ea1d36b909e495272427e6a))
* 细优 ([b841b63](https://github.com/ikenxuan/karin-plugin-kkk/commit/b841b63d648a267822a6ae5eb973baf8bef8bc43))
* 细优 ([fa53e77](https://github.com/ikenxuan/karin-plugin-kkk/commit/fa53e770d8b3b78068206ae799bad4f4fcd0abf3))

## [2.9.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.9.1...v2.9.2) (2025-10-29)


### 🐛 错误修复

* **bilibili:** Enhance comment rendering and add sample data ([53620a1](https://github.com/ikenxuan/karin-plugin-kkk/commit/53620a1fffe20c1588fcfc3775fdb03d74cdd573))


### 💄 UI 优化

* **image:** Update banner image to WebP format ([ac41ecd](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac41ecd8806bbe4e439b800632942282edec319b))

## [2.9.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.9.0...v2.9.1) (2025-10-28)


### 🐛 错误修复

* **networks:** Optimize URL validation with HEAD request ([66f6933](https://github.com/ikenxuan/karin-plugin-kkk/commit/66f6933ae20a8854d1d9e847aaa655052b296a13))
* **render:** Add dynamic plugin name support in version metadata ([106f070](https://github.com/ikenxuan/karin-plugin-kkk/commit/106f0703f80bfff90fe06d90ca8e70011fbdf546))


### 💄 UI 优化

* **bilibili:** Enhance dynamic rendering and image handling ([4059404](https://github.com/ikenxuan/karin-plugin-kkk/commit/405940411b3384cf58ee5e8ab1f1904d7cef7915))

## [2.9.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.8.0...v2.9.0) (2025-10-28)


### ✨ 新功能

* **bilibili:** 添加专栏动态解析支持 ([6ef5ae5](https://github.com/ikenxuan/karin-plugin-kkk/commit/6ef5ae518787b9001d63fdc663fcc54207ff42a1))


### 🐛 错误修复

* /template导出类型消失 ([ae1d93b](https://github.com/ikenxuan/karin-plugin-kkk/commit/ae1d93b2607c428c911a7cf9c2ec8374bd1bc2d5))
* 1 ([df0b0e0](https://github.com/ikenxuan/karin-plugin-kkk/commit/df0b0e092d826b476d6fef0efd84ad5a5751716f))
* **components:** 有更新提示才显示横幅 ([e8fe533](https://github.com/ikenxuan/karin-plugin-kkk/commit/e8fe53333b61f8bcca79b6ba332a29b1079fdcfa))
* 增强兼容性 ([f2b5809](https://github.com/ikenxuan/karin-plugin-kkk/commit/f2b580951f3c9afbfc276624af62ddfaeea82168))
* 集成推送开关功能到现有设置命令中 close [#201](https://github.com/ikenxuan/karin-plugin-kkk/issues/201) ([#202](https://github.com/ikenxuan/karin-plugin-kkk/issues/202)) ([8637c51](https://github.com/ikenxuan/karin-plugin-kkk/commit/8637c515aeb4ae40ce524f1e71bffb26ed8e06ca))


### 🎨 代码样式

* add banner image ([7c45fb7](https://github.com/ikenxuan/karin-plugin-kkk/commit/7c45fb796de8e539b3815d88cf09ee655e1ccfa8))
* **layout:** 为默认布局添加 HarmonyOS 字体样式 ([d2e433e](https://github.com/ikenxuan/karin-plugin-kkk/commit/d2e433ea9da0aa981e132ff522638d7e3c8edbff))


### ♻️ 代码重构

* **core:** 重构渲染系统并添加插件支持 ([#203](https://github.com/ikenxuan/karin-plugin-kkk/issues/203)) ([dcfd84a](https://github.com/ikenxuan/karin-plugin-kkk/commit/dcfd84a7a4186cfe30fc7f531fb0af37313c3180))

## [2.8.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.7.4...v2.8.0) (2025-10-20)


### ✨ 新功能

* add support for jingxuan.douyin.com URL pattern recognition ([#196](https://github.com/ikenxuan/karin-plugin-kkk/issues/196)) ([6ec76f9](https://github.com/ikenxuan/karin-plugin-kkk/commit/6ec76f9c3dec9f5bd5ec1adfad9d208a73ffb26b))


### 🐛 错误修复

* **bilibili:** 修复视频质量判断逻辑错误 ([addc63f](https://github.com/ikenxuan/karin-plugin-kkk/commit/addc63fed50a4f518aa4a4048de75c3ca68ff41e))
* 增强鲁棒性 ([dd00e8f](https://github.com/ikenxuan/karin-plugin-kkk/commit/dd00e8fa90ae6015990a53845f8095a9a99d21f0))
* 增强鲁棒性 x2 ([eaded46](https://github.com/ikenxuan/karin-plugin-kkk/commit/eaded4695f2b680a9a05ceec7b726dad08cd4c95))
* 导出/template入口 ([2a86c9a](https://github.com/ikenxuan/karin-plugin-kkk/commit/2a86c9a11457e70ffeff1ddefbaac36f27f3a867))

## [2.7.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.7.3...v2.7.4) (2025-10-20)


### 🐛 错误修复

* **bilibili:** 修复视频质量设置为0时的清晰度和大小判断逻辑 close [#193](https://github.com/ikenxuan/karin-plugin-kkk/issues/193) ([c29b44d](https://github.com/ikenxuan/karin-plugin-kkk/commit/c29b44d635aab3e7601649cfbcd688bd1c712a13))


### ✅ 测试相关

* test ([a2033e2](https://github.com/ikenxuan/karin-plugin-kkk/commit/a2033e2a5c0eec9c354de8bad35a74cbcfb92328))

## [2.7.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.7.2...v2.7.3) (2025-10-19)


### 🐛 错误修复

* web.config 的组件颜色 ([2ac17e2](https://github.com/ikenxuan/karin-plugin-kkk/commit/2ac17e207f063f5d58455986cf158a0845e11ef8))


### 🏗️ 构建系统

* use isolatedDeclarations ([dd26f6d](https://github.com/ikenxuan/karin-plugin-kkk/commit/dd26f6d2e0487de22bad39bdb385f819ea3b0c50))
* 怎么把中文都改成ASCII了 ([f799458](https://github.com/ikenxuan/karin-plugin-kkk/commit/f7994583e76ccb8ed61862a85f45b01c7808ecb0))
* 构建工具全员迁移 Rolldown ([f9b41fa](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b41fa75c06524b5025011d9591ef74f3a11225))
* 禁止代码压缩 ([f9b41fa](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b41fa75c06524b5025011d9591ef74f3a11225))


### ⚙️ 配置变更

* 默认配置都为最高请 ([dcac9bd](https://github.com/ikenxuan/karin-plugin-kkk/commit/dcac9bda8e19220c5edcc0f1d831ec23d44c69b5))

## [2.7.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.7.1...v2.7.2) (2025-10-19)


### 🐛 错误修复

* close [#190](https://github.com/ikenxuan/karin-plugin-kkk/issues/190) 处理部分番剧无法解析 ([1c8f108](https://github.com/ikenxuan/karin-plugin-kkk/commit/1c8f1086247f62888f8363cfac9c79d633854207))


### 🧰 其他更新

* 细优导入，都使用node协议的内置模块 ([b3d896a](https://github.com/ikenxuan/karin-plugin-kkk/commit/b3d896a722c2bba507a03ab75770af8cc3a52646))


### ⚙️ 配置变更

* 移除过时配置 `videopriority` 解析视频是否优先保内容。通过画质偏好设置控制解析视频大小 ([1c8f108](https://github.com/ikenxuan/karin-plugin-kkk/commit/1c8f1086247f62888f8363cfac9c79d633854207))

## [2.7.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.7.0...v2.7.1) (2025-10-19)


### 🎡 持续集成

* 更新日志放错了 ([f2fe6ff](https://github.com/ikenxuan/karin-plugin-kkk/commit/f2fe6ff73095ed973999907822d3b23eb172dda6))


### 💄 UI 优化

* 细优markdown代码块样式 ([f2fe6ff](https://github.com/ikenxuan/karin-plugin-kkk/commit/f2fe6ff73095ed973999907822d3b23eb172dda6))

## [2.7.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.6...v2.7.0) (2025-10-18)


### ✨ 新功能

* **bilibili:** 支持解析转发动态中 `查看图片` 的富文本节点，并渲染到页面上。 ([1d177a2](https://github.com/ikenxuan/karin-plugin-kkk/commit/1d177a27503bcf0a436317b74deac0d552730c3f))


### 🐛 错误修复

* build ([da9bb1d](https://github.com/ikenxuan/karin-plugin-kkk/commit/da9bb1d9afdc5f80903cf8bfcbf245a8a7b70b8f))
* **core:** 在vite配置中添加node解析条件 ([1f370c7](https://github.com/ikenxuan/karin-plugin-kkk/commit/1f370c7d541e53aebe63faaa788322232192997c))
* web登录按钮失效 ([e7137ad](https://github.com/ikenxuan/karin-plugin-kkk/commit/e7137ad8845f0a4a1e20b62df4c024c3e9680844))


### 🎨 代码样式

* B站用户标签字体缺失 ([23d4a76](https://github.com/ikenxuan/karin-plugin-kkk/commit/23d4a763888be8795f888b55b4467f0d5cb7886b))
* **changelog:** 重构更新日志渲染逻辑并添加markdown支持 ([c83199c](https://github.com/ikenxuan/karin-plugin-kkk/commit/c83199cae1050975f10c72335e28bc90dd56ab1e))


### 📦 依赖更新

* 升级依赖并优化配置 ([e02a8ff](https://github.com/ikenxuan/karin-plugin-kkk/commit/e02a8ff44a07466ff8c8a23236a1c3ab00794523))


### 🏗️ 构建系统

* 使用 rolldown 进行构建 ([#188](https://github.com/ikenxuan/karin-plugin-kkk/issues/188)) ([d776212](https://github.com/ikenxuan/karin-plugin-kkk/commit/d776212dfebe1557d8842cc5a17e42df6f4bbab6))


### 💄 UI 优化

* 加深B站被转发动态的背景色 ([23cece4](https://github.com/ikenxuan/karin-plugin-kkk/commit/23cece4670a8cf36cb9c8bc20e38da607e458e73))


## [2.6.6](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.5...v2.6.6) (2025-10-16)


### 🐛 错误修复

* **bilibili:** 修复动态链接ID解析问题并增强URL处理 ([bc2350e](https://github.com/ikenxuan/karin-plugin-kkk/commit/bc2350e4719704b1474675c969280704712d95d0))
* **changelog:** 修复推送更新时，更变记录图中操作步骤消失 ([0f18346](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f1834606e9474c60e3368da4d7e2c108a8702a2))
* 细节优化，添加git钩子以同步提交记录 ([5909226](https://github.com/ikenxuan/karin-plugin-kkk/commit/590922618a89122fd116774ca5b939e4c6bb3b3d))

## [2.6.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.4...v2.6.5) (2025-10-16)


### 🐛 错误修复

* **update:** 优化版本更新提醒逻辑并简化重启处理，将版本提醒锁检查移至获取更新信息后，增加对远程版本的比较 ([c4297d1](https://github.com/ikenxuan/karin-plugin-kkk/commit/c4297d1fe88f2dd50365ebf93c250dc4deb697d8))

## [2.6.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.3...v2.6.4) (2025-10-16)


### 🐛 错误修复

* **bilibili:** 修正视频动态创建时间使用错误的时间戳字段 ([86fd365](https://github.com/ikenxuan/karin-plugin-kkk/commit/86fd3650577dbb6a570247ec5277ccee9c072061))
* **help:** 修复版本命令图片渲染问题并更新变更日志处理 ([f87d38d](https://github.com/ikenxuan/karin-plugin-kkk/commit/f87d38db37397f4f040d3383028229af00c01c17))
* **更新日志:** 为变更日志图片添加提示显示控制选项 ([937c62a](https://github.com/ikenxuan/karin-plugin-kkk/commit/937c62af98d2a41fee364eeea0d67178af7e95ea))
* 更新逻辑 ([#177](https://github.com/ikenxuan/karin-plugin-kkk/issues/177)) ([12f1633](https://github.com/ikenxuan/karin-plugin-kkk/commit/12f16339637f9a181668bbb0619457cb3c7a6627))


### 🎨 代码样式

* **help:** 添加角色权限控制并优化帮助页面UI ([d85b4b6](https://github.com/ikenxuan/karin-plugin-kkk/commit/d85b4b6be342eabdd63c9f958574f92d4247e681))

## [2.6.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.2...v2.6.3) (2025-10-15)


### 🐛 错误修复

* 更新检测开发环境不允许执行。 ([39b522d](https://github.com/ikenxuan/karin-plugin-kkk/commit/39b522d21c2d1bf09d25a45be6cd817070875386))
* 细节优化 ([ce2f9a5](https://github.com/ikenxuan/karin-plugin-kkk/commit/ce2f9a5f6c5d96ea6e10ebe39bda122e528f9ba7))
* 获取更新日志并发竞速请求 ([2d9f31d](https://github.com/ikenxuan/karin-plugin-kkk/commit/2d9f31d0a7f2a74369d9c69495006c0fcf958b88))
* 过万整除 ([93f8753](https://github.com/ikenxuan/karin-plugin-kkk/commit/93f8753d59701faee7dc28c60bca8b344efa564a))

## [2.6.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.1...v2.6.2) (2025-10-15)


### 🐛 错误修复

* **update:** 优化更新流程并添加版本核心规范化 ([5b87bfb](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b87bfb3b599931353969e8ab598c690a91d25d1))

## [2.6.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.6.0...v2.6.1) (2025-10-15)


### 🐛 错误修复

* **bilibili/douyin:** 推送缓存写不进db ([4b0216f](https://github.com/ikenxuan/karin-plugin-kkk/commit/4b0216f28a01a6855e28cc1145e7f753ae5e98a6))
* UI布局失效。 ([3ebab7c](https://github.com/ikenxuan/karin-plugin-kkk/commit/3ebab7c32fc7c2aaaae36a4424ba9e2236d380ab))
* **update:** 修复更新检测逻辑并优化渲染配置 ([0036c59](https://github.com/ikenxuan/karin-plugin-kkk/commit/0036c596ddbc2917c374a9dd8410a4b42f749e57))

## [2.6.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.5.0...v2.6.0) (2025-10-15)


### ✨ 新功能

* 重构更新日志组件并优化版本检测功能，添加'#kkk更新' ([7147598](https://github.com/ikenxuan/karin-plugin-kkk/commit/7147598c84c46d41aa4cf7b1a6fb1415105816ae))


### 🐛 错误修复

* 细优UI样式 ([8cad02d](https://github.com/ikenxuan/karin-plugin-kkk/commit/8cad02d69a9873520151694ee8ee4758961d63f9))


### ♻️ 代码重构

* **template:** 移除未使用的依赖并重构样式配置 ([4725c25](https://github.com/ikenxuan/karin-plugin-kkk/commit/4725c25cd5de7935fc542deacae35b82202c65ac))

## [2.5.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.4.0...v2.5.0) (2025-10-13)


### ✨ 新功能

* **douyin:** 添加评论回复功能及数据文件支持 ([12f2460](https://github.com/ikenxuan/karin-plugin-kkk/commit/12f24602bc7eb0bfe80cd4fd33ff35bcceac72bb))


### 🐛 错误修复

* 番剧匹配不到ID ([84dea7e](https://github.com/ikenxuan/karin-plugin-kkk/commit/84dea7eb49ab0ba55bffb3cf86873bccd58740fa))

## [2.4.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.3.0...v2.4.0) (2025-10-11)


### ✨ 新功能

* **core:** 新增小红书解析 ([#166](https://github.com/ikenxuan/karin-plugin-kkk/issues/166)) ([7c7e05e](https://github.com/ikenxuan/karin-plugin-kkk/commit/7c7e05e5765cff1f14030f3ab0f1fdd45c5032e3))

## [2.3.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.2.1...v2.3.0) (2025-10-10)


### ✨ 新功能

* **douyin:** 添加共创信息展示功能并优化视频画质选择 ([88295a1](https://github.com/ikenxuan/karin-plugin-kkk/commit/88295a1a319ec2006b2e74c70ef67bcae774a779))


### 🐛 错误修复

* release ([1e864f3](https://github.com/ikenxuan/karin-plugin-kkk/commit/1e864f3fb206dbb4bd6c0b941845e60e7699d2ad))
* 私聊不进行表情回复 close [#162](https://github.com/ikenxuan/karin-plugin-kkk/issues/162) ([da82635](https://github.com/ikenxuan/karin-plugin-kkk/commit/da826359e95b77cbe9705e6c84708b4a775b8786))

## [2.2.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.2.0...v2.2.1) (2025-10-08)


### 🐛 错误修复

* 1 ([3779329](https://github.com/ikenxuan/karin-plugin-kkk/commit/377932988b92d4221d3a0726f7214bdb7c613f60))


### 🔧 其他更新

* release main ([#158](https://github.com/ikenxuan/karin-plugin-kkk/issues/158)) ([1b8dda5](https://github.com/ikenxuan/karin-plugin-kkk/commit/1b8dda52ebef23b59ccf51685b9fbc0f6bf04ae3))

## [2.2.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/core-v2.1.0...core-v2.2.0) (2025-10-08)


### ✨ 新功能

* add textMode option for direct text output instead of rendering images ([#151](https://github.com/ikenxuan/karin-plugin-kkk/issues/151)) ([bb6582b](https://github.com/ikenxuan/karin-plugin-kkk/commit/bb6582bf4cf58178cbcf4a2b6025c63562f8ca12))
* **bilibili/douyin:** 新增视频信息展示模式配置选项，支持文本和图片两种模式 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))
* **bilibili/douyin:** 添加视频信息内容自定义选项，可选择显示封面、标题、作者和统计数据 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))
* **bilibili:** B站评论组件支持显示置顶和UP主标识 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))
* **core:** 添加图文动态图片布局配置选项 ([786e75c](https://github.com/ikenxuan/karin-plugin-kkk/commit/786e75c3129def58419a8c8f79db7e2a083f4104))
* **douyin:** 添加视频画质偏好设置和自动选择功能 ([a08eb13](https://github.com/ikenxuan/karin-plugin-kkk/commit/a08eb131ba5a0ccde661f5e77178eb9c08288e49))
* **render:** 添加分页渲染配置 ([544ed23](https://github.com/ikenxuan/karin-plugin-kkk/commit/544ed2302dfddab0016245826b84bd21305ce681))
* **template:** 优化动态图片布局 ([777befc](https://github.com/ikenxuan/karin-plugin-kkk/commit/777befcea468e699c2eb23023ab454909cfba90e))
* **template:** 新增B站二维码登录组件并优化登录流程 ([a6f93f3](https://github.com/ikenxuan/karin-plugin-kkk/commit/a6f93f3faf2f30b57c42d67da66712348ccf8078))
* 添加错误日志接收配置并优化错误处理组件 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))


### 🐛 错误修复

* 1 ([3779329](https://github.com/ikenxuan/karin-plugin-kkk/commit/377932988b92d4221d3a0726f7214bdb7c613f60))
* **bilibili:** 修复动态图片转发时未处理空值的问题 ([d2c67cc](https://github.com/ikenxuan/karin-plugin-kkk/commit/d2c67cc8ffdeca51488160d712787a96972c6418))
* **bilibili:** 修正视频大小计算和清晰度选择逻辑 ([d107d79](https://github.com/ikenxuan/karin-plugin-kkk/commit/d107d79ae7516d13beedafb3a637283b0192e114))
* **douyin:** 修复直播推送中可选字段的处理逻辑 ([1f13fd8](https://github.com/ikenxuan/karin-plugin-kkk/commit/1f13fd85e32a1ce9319c1885233c95879efaf5bb))
* mkdir-db ([#141](https://github.com/ikenxuan/karin-plugin-kkk/issues/141)) ([7cde0a2](https://github.com/ikenxuan/karin-plugin-kkk/commit/7cde0a2f154e3b2a7bca26f75d91130410a0e63c))
* SQLITE_CONSTRAINT error when changing push bot ID ([#147](https://github.com/ikenxuan/karin-plugin-kkk/issues/147)) ([f1ceef2](https://github.com/ikenxuan/karin-plugin-kkk/commit/f1ceef294632fe001bfe1c590898d19113288187))
* 优化配置说明 close [#153](https://github.com/ikenxuan/karin-plugin-kkk/issues/153) ([c946824](https://github.com/ikenxuan/karin-plugin-kkk/commit/c94682434a57d9444ef41da68d63a610a6b1f82c))
* 修复B站直播数据路径问题 ([b9f7226](https://github.com/ikenxuan/karin-plugin-kkk/commit/b9f7226f4385100ccb6ecd35fb6db37756d008f7))


### 📝 文档更新

* 更新配置注释和默认值 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))


### 🎨 代码样式

* **bilibili/douyin:** 优化视频信息展示和评论组件 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))
* 调整错误处理组件样式和布局 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))


### 🔧 其他更新

* release main ([#127](https://github.com/ikenxuan/karin-plugin-kkk/issues/127)) ([c1ab61f](https://github.com/ikenxuan/karin-plugin-kkk/commit/c1ab61f487a124380a5fec6c1df64afddc8bf16f))
* release main ([#144](https://github.com/ikenxuan/karin-plugin-kkk/issues/144)) ([a534b25](https://github.com/ikenxuan/karin-plugin-kkk/commit/a534b258c0b35ed6e8b5f5f0ffda714e71464955))
* release main ([#145](https://github.com/ikenxuan/karin-plugin-kkk/issues/145)) ([1e391bf](https://github.com/ikenxuan/karin-plugin-kkk/commit/1e391bf43a8a32b22d23292eb085d8b289d6472e))
* release main ([#148](https://github.com/ikenxuan/karin-plugin-kkk/issues/148)) ([4f4f064](https://github.com/ikenxuan/karin-plugin-kkk/commit/4f4f064b5283db1e5ca794d57c50d95d0c7d1559))
* release main ([#149](https://github.com/ikenxuan/karin-plugin-kkk/issues/149)) ([7a703e1](https://github.com/ikenxuan/karin-plugin-kkk/commit/7a703e18ee1bf718517e4f0b0bcd245bcd329f0b))
* release main ([#155](https://github.com/ikenxuan/karin-plugin-kkk/issues/155)) ([84ac24f](https://github.com/ikenxuan/karin-plugin-kkk/commit/84ac24f3ec4702bcf248acba01bfdb17a17389b2))


### ♻️ 代码重构

* **core:** 重构模板系统并迁移静态资源 ([ec25300](https://github.com/ikenxuan/karin-plugin-kkk/commit/ec25300e90e239f64f5b1efeb1ab9a8125281dfe))
* **template:** 重构模板项目结构并优化类型定义 ([#142](https://github.com/ikenxuan/karin-plugin-kkk/issues/142)) ([2fb3b06](https://github.com/ikenxuan/karin-plugin-kkk/commit/2fb3b06ca8d55a9f38785e59bc508b8ce9578900))
* 重构错误处理逻辑使用新配置 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))

## [2.2.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.1.0...v2.2.0) (2025-10-08)


### ✨ 新功能

* **douyin:** 添加视频画质偏好设置和自动选择功能 ([a08eb13](https://github.com/ikenxuan/karin-plugin-kkk/commit/a08eb131ba5a0ccde661f5e77178eb9c08288e49))
* **render:** 添加分页渲染配置 ([544ed23](https://github.com/ikenxuan/karin-plugin-kkk/commit/544ed2302dfddab0016245826b84bd21305ce681))

## [2.1.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.0.3...v2.1.0) (2025-10-07)


### ✨ 新功能

* add textMode option for direct text output instead of rendering images ([#151](https://github.com/ikenxuan/karin-plugin-kkk/issues/151)) ([bb6582b](https://github.com/ikenxuan/karin-plugin-kkk/commit/bb6582bf4cf58178cbcf4a2b6025c63562f8ca12))
* **bilibili/douyin:** 新增视频信息展示模式配置选项，支持文本和图片两种模式 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))
* **bilibili/douyin:** 添加视频信息内容自定义选项，可选择显示封面、标题、作者和统计数据 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))
* **bilibili:** B站评论组件支持显示置顶和UP主标识 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))


### 🐛 错误修复

* 优化配置说明 close [#153](https://github.com/ikenxuan/karin-plugin-kkk/issues/153) ([c946824](https://github.com/ikenxuan/karin-plugin-kkk/commit/c94682434a57d9444ef41da68d63a610a6b1f82c))


### 🎨 代码样式

* **bilibili/douyin:** 优化视频信息展示和评论组件 ([0f7c055](https://github.com/ikenxuan/karin-plugin-kkk/commit/0f7c0553cd21a0e49e740e991462bce768130d52))

## [2.0.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.0.2...v2.0.3) (2025-10-04)


### 🐛 错误修复

* **bilibili:** 修正视频大小计算和清晰度选择逻辑 ([d107d79](https://github.com/ikenxuan/karin-plugin-kkk/commit/d107d79ae7516d13beedafb3a637283b0192e114))
* **douyin:** 修复直播推送中可选字段的处理逻辑 ([1f13fd8](https://github.com/ikenxuan/karin-plugin-kkk/commit/1f13fd85e32a1ce9319c1885233c95879efaf5bb))

## [2.0.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.0.1...v2.0.2) (2025-10-03)


### 🐛 错误修复

* SQLITE_CONSTRAINT error when changing push bot ID ([#147](https://github.com/ikenxuan/karin-plugin-kkk/issues/147)) ([f1ceef2](https://github.com/ikenxuan/karin-plugin-kkk/commit/f1ceef294632fe001bfe1c590898d19113288187))

## [2.0.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v2.0.0...v2.0.1) (2025-09-28)


### 🐛 错误修复

* **bilibili:** 修复动态图片转发时未处理空值的问题 ([d2c67cc](https://github.com/ikenxuan/karin-plugin-kkk/commit/d2c67cc8ffdeca51488160d712787a96972c6418))

## [2.0.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.8.1...v2.0.0) (2025-09-27)


### ⚠ BREAKING CHANGES

* 使用sql语句操作sqlite3 ([#138](https://github.com/ikenxuan/karin-plugin-kkk/issues/138))
* 重构项目结构为多包工作区模式 ([#125](https://github.com/ikenxuan/karin-plugin-kkk/issues/125))

### ✨ 新功能

* Add Tauri desktop support and Web UI enhancements ([#130](https://github.com/ikenxuan/karin-plugin-kkk/issues/130)) ([617d5cf](https://github.com/ikenxuan/karin-plugin-kkk/commit/617d5cf841c4912c76fda2998151c831e5883b44))
* **auth:** 添加多层编码签名验证中间件和前端实现 ([2bed9bf](https://github.com/ikenxuan/karin-plugin-kkk/commit/2bed9bf3739e1d1bb013852342ae632799dad714))
* **bilibili:** 新增视频和直播动态组件及共享功能 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* **bilibili:** 添加8K视频质量支持并更新依赖 ([83b9095](https://github.com/ikenxuan/karin-plugin-kkk/commit/83b9095a1c4c935cb44246656a93be218f53493a))
* **bilibili:** 添加B站图文动态组件及支持 ([e570312](https://github.com/ikenxuan/karin-plugin-kkk/commit/e570312ccabba7cb5cae0bc27d7b96fa14feb0ed))
* **bilibili:** 添加番剧组件支持及完善相关功能 ([329fbc6](https://github.com/ikenxuan/karin-plugin-kkk/commit/329fbc6eabac6adb2349d7617f556047ad52cc36))
* **core:** 添加connect-history-api-fallback支持前端路由 ([573be90](https://github.com/ikenxuan/karin-plugin-kkk/commit/573be90b64c82935e08c1de8c88853c5176ff1ce))
* **core:** 添加图文动态图片布局配置选项 ([786e75c](https://github.com/ikenxuan/karin-plugin-kkk/commit/786e75c3129def58419a8c8f79db7e2a083f4104))
* **render:** 支持URL参数控制平台和模板选择 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **render:** 支持URL参数控制平台和模板选择 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* **render:** 新增React渲染服务模块 ([ac83c3d](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac83c3d092b0acb8618952b2dbb4f82189b16d91))
* **render:** 添加抖音动态和直播组件，优化评论组件及开发环境配置 ([337452a](https://github.com/ikenxuan/karin-plugin-kkk/commit/337452a5008473776f1407b2f3be758675971ca2))
* **render:** 重构Bilibili评论组件并优化预览面板功能 ([da62df0](https://github.com/ikenxuan/karin-plugin-kkk/commit/da62df0c9394f5e3d4822a1666362100339417e1))
* **template:** 优化动态图片布局 ([777befc](https://github.com/ikenxuan/karin-plugin-kkk/commit/777befcea468e699c2eb23023ab454909cfba90e))
* **template:** 同时测试模板更新 ([cf8a7d9](https://github.com/ikenxuan/karin-plugin-kkk/commit/cf8a7d9df2ecda3032d2724996a1c97284e66500))
* **template:** 新增B站二维码登录组件并优化登录流程 ([a6f93f3](https://github.com/ikenxuan/karin-plugin-kkk/commit/a6f93f3faf2f30b57c42d67da66712348ccf8078))
* **template:** 添加视频信息组件 ([#140](https://github.com/ikenxuan/karin-plugin-kkk/issues/140)) ([7d681b3](https://github.com/ikenxuan/karin-plugin-kkk/commit/7d681b3732b54e4b43d8e6c352129e6c145b9de2))
* **web:** 测试更新日志合并 ([cf8a7d9](https://github.com/ikenxuan/karin-plugin-kkk/commit/cf8a7d9df2ecda3032d2724996a1c97284e66500))
* **web:** 添加web解析页面鉴权开关并优化内容管理界面 ([9562110](https://github.com/ikenxuan/karin-plugin-kkk/commit/956211008a6253cac9c75456d5de7a3b00f4d01a))
* **web:** 添加进度条组件和404页面 ([ee3aa17](https://github.com/ikenxuan/karin-plugin-kkk/commit/ee3aa17db2241717187989ab059bc23a2d556e7d))
* 使用sql语句操作sqlite3 ([#138](https://github.com/ikenxuan/karin-plugin-kkk/issues/138)) ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 图片渲染使用 React 替代 art-template，集成 Vite 支持实时开发调试 ([#137](https://github.com/ikenxuan/karin-plugin-kkk/issues/137)) ([f355477](https://github.com/ikenxuan/karin-plugin-kkk/commit/f355477d12615523c67647b286daf06ebff9d626))
* 支持合辑解析 ([e6cab24](https://github.com/ikenxuan/karin-plugin-kkk/commit/e6cab2435e8e98de9fa0fa0914a387fd68c799f4))
* 添加内容管理功能及相关组件 ([ac93ede](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac93edea9ebfb6ffc68a1d5da27814a56465830c))
* 添加心跳检测和登录功能改进 ([4080580](https://github.com/ikenxuan/karin-plugin-kkk/commit/4080580f6f035e9e7f3f57050cd85929a5af8211))
* 添加错误日志接收配置并优化错误处理组件 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))
* 重构内容管理页面并添加主题支持 ([cbc3283](https://github.com/ikenxuan/karin-plugin-kkk/commit/cbc328305afdb8fbd0d7028237348ab145c1d60b))
* 重构项目结构为多包工作区模式 ([#125](https://github.com/ikenxuan/karin-plugin-kkk/issues/125)) ([9fbb970](https://github.com/ikenxuan/karin-plugin-kkk/commit/9fbb970ad3824b0eed8ae1fe39643cead70e80d0))


### 🐛 错误修复

* **bilibili:** 修复动态卡片中图片可能为空的判断缺失问题 ([44e8bc1](https://github.com/ikenxuan/karin-plugin-kkk/commit/44e8bc165a334233c53f826278a4935602b8feec))
* **bilibili:** 修复动态类型处理中的空值检查和类型定义 ([332823a](https://github.com/ikenxuan/karin-plugin-kkk/commit/332823a23019879cf7b1dae051d2c2ab21aaf8b3))
* **bilibili:** 修正动态数据渲染逻辑和类型定义 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **bilibili:** 修正动态数据渲染逻辑和类型定义 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* **bilibili:** 更新动态卡片数据解析逻辑并升级依赖 ([0ebc356](https://github.com/ikenxuan/karin-plugin-kkk/commit/0ebc356c1345f04f2d9c97a66819ac71f95e2c30))
* **bilibili:** 重构哔哩哔哩登录功能并更新依赖 ([8a1bf89](https://github.com/ikenxuan/karin-plugin-kkk/commit/8a1bf89a30c8dd7e586ecbe4f807c4c66a47b584))
* build error ([f42a371](https://github.com/ikenxuan/karin-plugin-kkk/commit/f42a3718e59d1787de07d6ec22445983d816bf8d))
* close [#126](https://github.com/ikenxuan/karin-plugin-kkk/issues/126) ([9fbb970](https://github.com/ikenxuan/karin-plugin-kkk/commit/9fbb970ad3824b0eed8ae1fe39643cead70e80d0))
* close [#126](https://github.com/ikenxuan/karin-plugin-kkk/issues/126) ([4b52e20](https://github.com/ikenxuan/karin-plugin-kkk/commit/4b52e20cd64515f331c6886ab66bcfe15a7c70a1))
* **core:** web config 扁平化处理逻辑错误 ([a9b20be](https://github.com/ikenxuan/karin-plugin-kkk/commit/a9b20be374aff93b15256220bee0ccbf7d73edac))
* **core:** 修正B站推送和动态数据处理逻辑 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **core:** 修正B站推送和动态数据处理逻辑 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* **DataService:** 修正文件路径生成逻辑 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **DataService:** 修正文件路径生成逻辑 ([e570312](https://github.com/ikenxuan/karin-plugin-kkk/commit/e570312ccabba7cb5cae0bc27d7b96fa14feb0ed))
* **douyin/bilibili:** 优化动态推送日志顺序并更新依赖版本 ([54e0088](https://github.com/ikenxuan/karin-plugin-kkk/commit/54e00886af2383139b370ea3809cd405c73a73d6))
* mkdir-db ([#141](https://github.com/ikenxuan/karin-plugin-kkk/issues/141)) ([7cde0a2](https://github.com/ikenxuan/karin-plugin-kkk/commit/7cde0a2f154e3b2a7bca26f75d91130410a0e63c))
* 修复B站直播数据路径问题 ([b9f7226](https://github.com/ikenxuan/karin-plugin-kkk/commit/b9f7226f4385100ccb6ecd35fb6db37756d008f7))
* 修复抖音作品推送文本描述及日志信息 ([cff097a](https://github.com/ikenxuan/karin-plugin-kkk/commit/cff097aa45e3794c5ce61e4fe29db7ac3d1d359f))
* 修复抖音平台音乐数据解析中 sec_uid 的变量引用问题 close [#128](https://github.com/ikenxuan/karin-plugin-kkk/issues/128) ([7a4a996](https://github.com/ikenxuan/karin-plugin-kkk/commit/7a4a996b4735b359fd75c1cd31a4fe4e580dbf8a))
* 修复抖音视频解析错误处理问题 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))
* 增强动态过滤日志并支持直播内容处理 close: [#131](https://github.com/ikenxuan/karin-plugin-kkk/issues/131) ([dfa9956](https://github.com/ikenxuan/karin-plugin-kkk/commit/dfa9956163d0c0342179d81e9a19a12c3543d4a6))
* 细节优化UI ([#139](https://github.com/ikenxuan/karin-plugin-kkk/issues/139)) ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))


### ⚡️ 性能优化

* 优化图片加载和错误处理 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 优化图片加载和错误处理 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* 优化日志收集器性能减少内存占用 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))


### 📝 文档更新

* **bilibili:** 添加B站动态相关类型定义 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **bilibili:** 添加B站动态相关类型定义 ([e570312](https://github.com/ikenxuan/karin-plugin-kkk/commit/e570312ccabba7cb5cae0bc27d7b96fa14feb0ed))
* readme ([9212037](https://github.com/ikenxuan/karin-plugin-kkk/commit/9212037cea6c6234f230a930f09d80594ea7f00e))
* 更新配置注释和默认值 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))
* 更新错误处理组件文档和类型定义 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))
* 添加类型注释和组件文档 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 添加类型注释和组件文档 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))


### 🎨 代码样式

* 统一代码格式和命名规范 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 统一代码格式和命名规范 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* 统一组件样式使用CSS变量替代硬编码颜色 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))
* 调整错误处理组件样式和布局 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))


### 🔧 其他更新

* **mock-server:** 改进数据文件路由处理 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **mock-server:** 改进数据文件路由处理 ([e570312](https://github.com/ikenxuan/karin-plugin-kkk/commit/e570312ccabba7cb5cae0bc27d7b96fa14feb0ed))
* 更新@ikenxuan/amagi依赖至5.2.0版本并添加动态卡片类型处理 ([837b8b5](https://github.com/ikenxuan/karin-plugin-kkk/commit/837b8b54f7b8e10a79c4e921a03bb2268bf511ff))
* 更新依赖项和日志级别配置 ([ac93ede](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac93edea9ebfb6ffc68a1d5da27814a56465830c))
* 更新依赖项和构建配置 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 更新依赖项和构建配置 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* 清理无用文件和代码注释 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))


### ♻️ 代码重构

* **bilibili:** 优化动态组件代码结构并提取共享模块 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **bilibili:** 优化动态组件代码结构并提取共享模块 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* **bilibili:** 重构动态数据处理逻辑，使用更严格的类型检查 ([332823a](https://github.com/ikenxuan/karin-plugin-kkk/commit/332823a23019879cf7b1dae051d2c2ab21aaf8b3))
* **build:** 更新构建输出目录和chunk命名规范 ([8fd55b5](https://github.com/ikenxuan/karin-plugin-kkk/commit/8fd55b5b3690ea65bc3c244fc4d312ff9fa4565b))
* **core:** 重构模板系统并迁移静态资源 ([ec25300](https://github.com/ikenxuan/karin-plugin-kkk/commit/ec25300e90e239f64f5b1efeb1ab9a8125281dfe))
* **render:** 重构组件加载逻辑 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **render:** 重构组件加载逻辑 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* **render:** 重构路径解析逻辑以支持三级路径格式 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **render:** 重构路径解析逻辑以支持三级路径格式 ([e570312](https://github.com/ikenxuan/karin-plugin-kkk/commit/e570312ccabba7cb5cae0bc27d7b96fa14feb0ed))
* **template:** 重构模板项目结构并优化类型定义 ([#142](https://github.com/ikenxuan/karin-plugin-kkk/issues/142)) ([2fb3b06](https://github.com/ikenxuan/karin-plugin-kkk/commit/2fb3b06ca8d55a9f38785e59bc508b8ce9578900))
* **template:** 重构组件注册和渲染逻辑，实现自动注册功能 ([00d7e57](https://github.com/ikenxuan/karin-plugin-kkk/commit/00d7e57f2af4f63d8e756701584bedb9ffaa28a9))
* 优化数据库模型和API路由 ([ac93ede](https://github.com/ikenxuan/karin-plugin-kkk/commit/ac93edea9ebfb6ffc68a1d5da27814a56465830c))
* 移除冗余代码并简化错误处理逻辑 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))
* 重构代码并优化配置 ([d476d58](https://github.com/ikenxuan/karin-plugin-kkk/commit/d476d58e6df321029bc311b0f7af17c79132bfc3))
* 重构错误处理逻辑使用新配置 ([3c0d462](https://github.com/ikenxuan/karin-plugin-kkk/commit/3c0d462fdffea0a73551e23312547de3174e718e))
* 重构项目结构为多包工作区模式 ([f49437c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f49437c5bf9c0d9265039ef0618ab1b621fcc556))


### ✅ 测试相关

* **bilibili:** 添加图文动态测试数据 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* **bilibili:** 添加图文动态测试数据 ([e570312](https://github.com/ikenxuan/karin-plugin-kkk/commit/e570312ccabba7cb5cae0bc27d7b96fa14feb0ed))
* 添加动态组件测试数据 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 添加动态组件测试数据 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* 添加错误处理相关测试用例 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))


### 📦️ 构建系统

* 更新 @ikenxuan/amagi 依赖至 5.0.2 版本 ([7a4a996](https://github.com/ikenxuan/karin-plugin-kkk/commit/7a4a996b4735b359fd75c1cd31a4fe4e580dbf8a))
* 更新 @ikenxuan/amagi 依赖至正式版本 5.1.0 ([542a38c](https://github.com/ikenxuan/karin-plugin-kkk/commit/542a38c4f9a69238ddd5296068a55c0bc32febad))
* 更新@ikenxuan/amagi依赖到特定PR版本 ([332823a](https://github.com/ikenxuan/karin-plugin-kkk/commit/332823a23019879cf7b1dae051d2c2ab21aaf8b3))
* 更新tsconfig和vite配置 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 更新tsconfig和vite配置 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))
* 更新依赖包版本 ([215ab09](https://github.com/ikenxuan/karin-plugin-kkk/commit/215ab0944685dba0e74b6cc76b57126f741aafb5))


### 🎡 持续集成

* 调整构建配置和外部依赖 ([f81e40c](https://github.com/ikenxuan/karin-plugin-kkk/commit/f81e40ccf64f600ff8c87f992fcb8092ea34c2f5))
* 调整构建配置和外部依赖 ([5b020c2](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b020c25ff44d54c7948ba93e39718bf663625e7))

## [1.8.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.8.0...v1.8.1) (2025-07-16)


### 🐛 错误修复

* 默认配置 ([bc376c3](https://github.com/ikenxuan/karin-plugin-kkk/commit/bc376c3b1705b1be2374d2c5fd4bdbb1a9efaba3))

## [1.8.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.7.5...v1.8.0) (2025-07-16)


### ✨ 新功能

* [#122](https://github.com/ikenxuan/karin-plugin-kkk/issues/122) ([9a4496c](https://github.com/ikenxuan/karin-plugin-kkk/commit/9a4496c8f4a24ac489ab72028570fef1bf360c81))

## [1.7.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.7.4...v1.7.5) (2025-07-10)


### 🐛 错误修复

* 适配新版解析库1 ([cc11b1f](https://github.com/ikenxuan/karin-plugin-kkk/commit/cc11b1f0a7cb55da942f9004837eb4e97b5c93b9))
* 适配新版解析库2 ([4c40bc4](https://github.com/ikenxuan/karin-plugin-kkk/commit/4c40bc4127bfdb8f66375c761896832ed9f1d1eb))
* 适配新版解析库3 ([a9206b6](https://github.com/ikenxuan/karin-plugin-kkk/commit/a9206b6824b30f75715d9cf0bbeb6a616ffaf81a))
* 适配新版解析库4 ([8ad68fd](https://github.com/ikenxuan/karin-plugin-kkk/commit/8ad68fd5ad6d38ccd5cef1e4af7fc936d653cca8))
* 适配新版解析库5 ([d7014e8](https://github.com/ikenxuan/karin-plugin-kkk/commit/d7014e8f91d7a837a51626370757cd6f68bc55d4))
* 适配新版解析库6 ([124b3e9](https://github.com/ikenxuan/karin-plugin-kkk/commit/124b3e9d34fcbb23d429c4645603d8951481dbf6))

## [1.7.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.7.3...v1.7.4) (2025-07-08)


### ♻️ 代码重构

* **douyin:** 修改评论数据处理逻辑以适应新数据结构 ([73a7384](https://github.com/ikenxuan/karin-plugin-kkk/commit/73a7384eb70c73e6a4ec803534f044b1dbade633))

## [1.7.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.7.2...v1.7.3) (2025-07-07)


### 🐛 错误修复

* **douyin:** 修复直播推送中live_data的数据结构问题并更新amagi依赖 ([7d4023f](https://github.com/ikenxuan/karin-plugin-kkk/commit/7d4023fcf41bb7e9613f4c56a5fe032ccd591975))

## [1.7.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.7.1...v1.7.2) (2025-07-07)


### 🐛 错误修复

* 漏传文件 ([324e217](https://github.com/ikenxuan/karin-plugin-kkk/commit/324e217378c54e2a0afaaafb22fab44e66f76793))

## [1.7.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.7.0...v1.7.1) (2025-07-07)


### 🎡 持续集成

* fix ([21a2ecb](https://github.com/ikenxuan/karin-plugin-kkk/commit/21a2ecb33d215c5714e45daf595dcbe189456849))

## [1.7.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.12...v1.7.0) (2025-07-07)


### ✨ 新功能

* migrate from Sequelize to TypeORM for database operations ([#108](https://github.com/ikenxuan/karin-plugin-kkk/issues/108)) ([75ee71f](https://github.com/ikenxuan/karin-plugin-kkk/commit/75ee71f65e431f8d2e304129eccb0441e51eadf7))


### 🐛 错误修复

* ci ([7e705aa](https://github.com/ikenxuan/karin-plugin-kkk/commit/7e705aadc3327c9763cb5ecdcd20a5f67b732331))
* 新版解析库 ([#110](https://github.com/ikenxuan/karin-plugin-kkk/issues/110)) ([f93814a](https://github.com/ikenxuan/karin-plugin-kkk/commit/f93814a5ca51c03390863ecaf6ac4070c4c6bb64))


### ✅ 测试相关

* ci/cd ([#113](https://github.com/ikenxuan/karin-plugin-kkk/issues/113)) ([dd13df0](https://github.com/ikenxuan/karin-plugin-kkk/commit/dd13df0eca0e21dc7e4ded6592191508d045fa51))


### 🎡 持续集成

* fix ([5b95a7f](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b95a7fcead63dc5ba18c1c1211565c14acc66f0))
* fix ([8faccb9](https://github.com/ikenxuan/karin-plugin-kkk/commit/8faccb9570eec6949d3e614d6f35e46cbe4d7f18))
* test ([#112](https://github.com/ikenxuan/karin-plugin-kkk/issues/112)) ([3ed08ad](https://github.com/ikenxuan/karin-plugin-kkk/commit/3ed08ad45c724f0148bff522cfed498dfbafbd21))

## [1.6.12](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.11...v1.6.12) (2025-06-15)


### Bug Fixes

* 更新md-html依赖并优化版本信息展示 ([88115f1](https://github.com/ikenxuan/karin-plugin-kkk/commit/88115f108d09620885491dd990a8306bf586f096))

## [1.6.11](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.10...v1.6.11) (2025-06-15)


### Bug Fixes

* 不打包 '@karinjs/md-html' ([2392a0c](https://github.com/ikenxuan/karin-plugin-kkk/commit/2392a0cec5807ca035924cc6a3fdd7993676f6aa))

## [1.6.10](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.9...v1.6.10) (2025-06-15)


### Bug Fixes

* **douyin:** 修复评论中表情替换和空格处理问题 ([d49a2e1](https://github.com/ikenxuan/karin-plugin-kkk/commit/d49a2e1b4dd5e7c28cbe15429c53f1d1951a3447))
* 分割更新日志 ([11ddf95](https://github.com/ikenxuan/karin-plugin-kkk/commit/11ddf952338b459b9a0751c72aaad294f10559dc))
* 移除内置更新 ([11ddf95](https://github.com/ikenxuan/karin-plugin-kkk/commit/11ddf952338b459b9a0751c72aaad294f10559dc))

## [1.6.9](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.8...v1.6.9) (2025-06-11)


### Bug Fixes

* **web:** 更新插件配置和依赖项 ([380f538](https://github.com/ikenxuan/karin-plugin-kkk/commit/380f5386b77a4dd7ee5e7649dcf458c40da27b52))
* **推送配置:** 为推送列表添加启用开关功能 ([9865228](https://github.com/ikenxuan/karin-plugin-kkk/commit/98652285d07fda962af4dff313ac9ab9199a19eb))

## [1.6.8](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.7...v1.6.8) (2025-06-10)


### Bug Fixes

* 修复在根目录创建无关日志 ([f7eccaa](https://github.com/ikenxuan/karin-plugin-kkk/commit/f7eccaae568cdaf3b45b5df3b9c0732ead28f5bb))

## [1.6.7](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.6...v1.6.7) (2025-06-05)


### Bug Fixes

* **bilibili:** 添加直播动态推送功能支持 ([231c7d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/231c7d7a7ed9915819b55c9b6bb414276cee1996))
* **bilibili:** 调整内容显示顺序并优化消息段格式 ([1abc7f5](https://github.com/ikenxuan/karin-plugin-kkk/commit/1abc7f59522f33f92caf8048276b78dfe7e3234f))
* 优化类型导入使用type关键字 ([0d027d1](https://github.com/ikenxuan/karin-plugin-kkk/commit/0d027d1d313465f272fcc8f09507cd8b6da4c644))

## [1.6.6](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.5...v1.6.6) (2025-06-01)


### Bug Fixes

* **Config:** 添加评论数量显示选项控制功能 close [#100](https://github.com/ikenxuan/karin-plugin-kkk/issues/100) ([a365506](https://github.com/ikenxuan/karin-plugin-kkk/commit/a3655060b290ea3d8a8317d2f178d126309dbde2))
* **utils:** 更新User-Agent中的Chrome和Edge版本号 ([a963e2e](https://github.com/ikenxuan/karin-plugin-kkk/commit/a963e2ed831e5a18218de84405e3af964f9230a7))
* 和node_modules分开打包 ([74b109a](https://github.com/ikenxuan/karin-plugin-kkk/commit/74b109acef14f801294bed93a0bc99d839e78026))
* 改进视频处理和上传功能 close [#99](https://github.com/ikenxuan/karin-plugin-kkk/issues/99) ([1766e7c](https://github.com/ikenxuan/karin-plugin-kkk/commit/1766e7ca7897d088556091ec78a5db1148675572))
* 统一cjs模块导入方式为命名空间导入 ([fffb1a2](https://github.com/ikenxuan/karin-plugin-kkk/commit/fffb1a27cc92a18680168f7de10be7fc6120b743))

## [1.6.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.4...v1.6.5) (2025-05-28)


### Bug Fixes

* **config:** 移除接口中的冗余索引签名并修复配置引用 ([97d7237](https://github.com/ikenxuan/karin-plugin-kkk/commit/97d72379317db1f235fe83bd6454ba4f8db2656f))

## [1.6.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.3...v1.6.4) (2025-05-27)


### Bug Fixes

* **错误处理:** 添加中间件代理以处理请求错误 [#94](https://github.com/ikenxuan/karin-plugin-kkk/issues/94) ([f85fe48](https://github.com/ikenxuan/karin-plugin-kkk/commit/f85fe487d68fe04997c9eddf50e6ebe5218f89da))

## [1.6.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.2...v1.6.3) (2025-05-24)


### Bug Fixes

* close [#94](https://github.com/ikenxuan/karin-plugin-kkk/issues/94) ([6ded26c](https://github.com/ikenxuan/karin-plugin-kkk/commit/6ded26cc38c3b5c8425fd04363adfbe0b689e3d1))
* uploadFile API uses local absolute paths ([#93](https://github.com/ikenxuan/karin-plugin-kkk/issues/93)) ([09613ff](https://github.com/ikenxuan/karin-plugin-kkk/commit/09613ffe4567fb80652b5a49d36d76217b6d57bf))

## [1.6.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.1...v1.6.2) (2025-05-14)


### Bug Fixes

* vipStatus ([f7f1a80](https://github.com/ikenxuan/karin-plugin-kkk/commit/f7f1a8096acaa01388b8e2b04137c8d60f95c683))

## [1.6.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.6.0...v1.6.1) (2025-05-14)


### Bug Fixes

* close [#88](https://github.com/ikenxuan/karin-plugin-kkk/issues/88) ([8ef73bc](https://github.com/ikenxuan/karin-plugin-kkk/commit/8ef73bc2fc1c24b43070d93adc3a1d3180231926))
* send msg ([884b8e0](https://github.com/ikenxuan/karin-plugin-kkk/commit/884b8e0a27b9973ddf576923f2fd0e5d35bd04c8))
* 简化抖音推送群组目标处理逻辑 ([f32d971](https://github.com/ikenxuan/karin-plugin-kkk/commit/f32d9718817dfb1e7ef6141a49d8a12245bccdef))
* 类型安全 ([1cf5f7f](https://github.com/ikenxuan/karin-plugin-kkk/commit/1cf5f7f4132a6f478ca821132baa88a246e80df3))

## [1.6.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.5.0...v1.6.0) (2025-05-12)


### Features

* 细优 close [#85](https://github.com/ikenxuan/karin-plugin-kkk/issues/85) ([1f29c68](https://github.com/ikenxuan/karin-plugin-kkk/commit/1f29c680075460edbd4faa0329a58ffa96f9a944))
* 给B站推送添加画质偏好配置 ([471a84a](https://github.com/ikenxuan/karin-plugin-kkk/commit/471a84a445e06a75891883306e7211a9d04ce0fb))


### Bug Fixes

* **bilibili:** 适配UP关闭评论区 ([f3af874](https://github.com/ikenxuan/karin-plugin-kkk/commit/f3af8743e09a86a6a1ab7954ede81649c86c0607))
* close [#83](https://github.com/ikenxuan/karin-plugin-kkk/issues/83) ([e0f0156](https://github.com/ikenxuan/karin-plugin-kkk/commit/e0f01568597e351788be832e8175b50aebb3de38))
* **db:** 重构数据库初始化及配置同步逻辑 ([b5c4a89](https://github.com/ikenxuan/karin-plugin-kkk/commit/b5c4a89398ebbdaf96af3fd3332cc6797288a7d8))
* key重复 ([589cc28](https://github.com/ikenxuan/karin-plugin-kkk/commit/589cc28f0bb8667640db5be80212d72fdaba2a89))
* **utils:** 重构文件下载和上传功能，提取公共方法。燃尽了 ([7ff6e8a](https://github.com/ikenxuan/karin-plugin-kkk/commit/7ff6e8aca7849c09fc917d3df179b909cea69bee))
* 优化推送逻辑 close [#86](https://github.com/ikenxuan/karin-plugin-kkk/issues/86) ([8fd48f5](https://github.com/ikenxuan/karin-plugin-kkk/commit/8fd48f508c0cf984efebb0c6007bdc8cbc06cb36))
* 坠机了 ([471a84a](https://github.com/ikenxuan/karin-plugin-kkk/commit/471a84a445e06a75891883306e7211a9d04ce0fb))
* 奇怪的bug ([029b005](https://github.com/ikenxuan/karin-plugin-kkk/commit/029b005505657f656d9004102b909486be66d6ea))
* 移除多余amagi实例化并更新依赖版本 ([0c2dece](https://github.com/ikenxuan/karin-plugin-kkk/commit/0c2decee87de417c84894f80e3f047f786675e43))

## [1.5.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.4.1...v1.5.0) (2025-05-04)


### Features

* **视频预览:** 添加视频临时预览功能 ([815828e](https://github.com/ikenxuan/karin-plugin-kkk/commit/815828efb12c647fa0964cc4e40eae28e9a41d6b))


### Bug Fixes

* **bilibili:** 修正视频动态分享链接的生成逻辑 ([9f15aaf](https://github.com/ikenxuan/karin-plugin-kkk/commit/9f15aaf77b0034099c76ccd52fe64d3537067c37))
* **utils:** 延迟删除上传的视频文件以优化资源管理 ([4da868c](https://github.com/ikenxuan/karin-plugin-kkk/commit/4da868cfb4dd22d37f70c31835b8c237e628a6b3))
* 优化描述 ([a578c82](https://github.com/ikenxuan/karin-plugin-kkk/commit/a578c8250420975acddac52aef566ea5614035fa))
* 描述错误 ([43915cc](https://github.com/ikenxuan/karin-plugin-kkk/commit/43915cc4cae7637d012ae04dd10c38bf11878525))

## [1.4.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.4.0...v1.4.1) (2025-05-03)


### Bug Fixes

* 描述错误 ([26cf7a5](https://github.com/ikenxuan/karin-plugin-kkk/commit/26cf7a569450fbadaf646d6313677103ca9e27b1))

## [1.4.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.3.0...v1.4.0) (2025-05-03)


### Features

* close [#78](https://github.com/ikenxuan/karin-plugin-kkk/issues/78) ([39ae7e4](https://github.com/ikenxuan/karin-plugin-kkk/commit/39ae7e4b169c8c41fc11a8f685bf64af9d1aa9f1))
* close [#80](https://github.com/ikenxuan/karin-plugin-kkk/issues/80) ([f3b30b2](https://github.com/ikenxuan/karin-plugin-kkk/commit/f3b30b2b95936b1b0bae09d058f52a65a3ca3268))


### Bug Fixes

* close [#74](https://github.com/ikenxuan/karin-plugin-kkk/issues/74) ([b16c890](https://github.com/ikenxuan/karin-plugin-kkk/commit/b16c8909fc1551bf54fc5945d5d44ee4cad6bfe5))
* close [#79](https://github.com/ikenxuan/karin-plugin-kkk/issues/79) ([41fb13b](https://github.com/ikenxuan/karin-plugin-kkk/commit/41fb13b2208c1efa1e22cd50103ab6157ea1c44f))
* 匹配m.douyin.com。close [#77](https://github.com/ikenxuan/karin-plugin-kkk/issues/77) ([c82c3f6](https://github.com/ikenxuan/karin-plugin-kkk/commit/c82c3f6b30f4dc0ef5588035786e3755aae2b451))
* 将打包工具从`tsup`迁移到`vite` 适配`node-kairn` 1.8.0 版本 ([#71](https://github.com/ikenxuan/karin-plugin-kkk/issues/71)) ([fbbc329](https://github.com/ikenxuan/karin-plugin-kkk/commit/fbbc3297fb3d1cd3b9a0a6a630f0602de8624c10))

## [1.3.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.2.3...v1.3.0) (2025-04-26)


### Features

* **Config:** 添加扫码登录权限配置 close [#73](https://github.com/ikenxuan/karin-plugin-kkk/issues/73) ([0e22e6b](https://github.com/ikenxuan/karin-plugin-kkk/commit/0e22e6b7b128c663f9a6b81391aae528d93384ce))
* **config:** 默认关闭平台解析提示并添加表情回应功能（默认开启） ([ea301d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/ea301d7ffaaa80d6b4f046b143703e29ee322c98))


### Bug Fixes

* **login:** 更新抖音和哔哩哔哩登录免责声明 close [#72](https://github.com/ikenxuan/karin-plugin-kkk/issues/72) ([6b91d8e](https://github.com/ikenxuan/karin-plugin-kkk/commit/6b91d8e4d479f86ac41315124350b07085e821e7))
* 修复视频上传和评论处理中的问题 ([8036d4d](https://github.com/ikenxuan/karin-plugin-kkk/commit/8036d4d0c4d568c30b9140c5e3a7c50c7fda90ca))
* 修改默认回复表情 ([4dc106e](https://github.com/ikenxuan/karin-plugin-kkk/commit/4dc106ef160361f5daf773c855ed3c98dbd2eebf))
* 修正评论数据长度检查逻辑 ([866de17](https://github.com/ikenxuan/karin-plugin-kkk/commit/866de17efb187f68c3df8871892f7b8d8c9926e8))
* 每个推送对象单独过滤。close [#69](https://github.com/ikenxuan/karin-plugin-kkk/issues/69) ([#70](https://github.com/ikenxuan/karin-plugin-kkk/issues/70)) ([38b0cab](https://github.com/ikenxuan/karin-plugin-kkk/commit/38b0cab43c05107a2b4d853a13cc23887cc4579b))
* 移除大部分命令设置功能，使用webui修改配置，仅保留推送相关的设置 ([883ff4c](https://github.com/ikenxuan/karin-plugin-kkk/commit/883ff4c1a1d34742c34b88da341d31e61332f8a9))

## [1.2.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.2.2...v1.2.3) (2025-04-13)


### Bug Fixes

* **douyin:** 修复标签过滤逻辑中标签无法检查艾特用户的错误 ([35110ca](https://github.com/ikenxuan/karin-plugin-kkk/commit/35110ca5ce9c365f2b9b5ee641a4be46a046bbd1))

## [1.2.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.2.1...v1.2.2) (2025-04-13)


### Bug Fixes

* **bilibili:** 修复转发动态过滤逻辑中的遗漏条件 ([d11f485](https://github.com/ikenxuan/karin-plugin-kkk/commit/d11f485174d16f86a0b1d1918f05597614db3bd3))
* **bilibili:** 添加空值检查以防止动态标签过滤时崩溃 ([2e3c7b1](https://github.com/ikenxuan/karin-plugin-kkk/commit/2e3c7b151eb46082611f82573146f1c4c8756978))
* ci ([e73e132](https://github.com/ikenxuan/karin-plugin-kkk/commit/e73e13294efea2a471c5ce0dc14937ddc5d862a2))
* **web.config.ts:** 优化推送配置组件布局和描述信息 ([be34225](https://github.com/ikenxuan/karin-plugin-kkk/commit/be342256032f2fad1e7122f7066dd579693a699b))
* **抖音推送:** 修复视频下载链接获取逻辑，增加备用链接 ([d090f88](https://github.com/ikenxuan/karin-plugin-kkk/commit/d090f88d432ba4e9368642fd6ce0d04838a742c5))

## [1.2.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.2.0...v1.2.1) (2025-04-09)


### Bug Fixes

* ci ([fa6c3aa](https://github.com/ikenxuan/karin-plugin-kkk/commit/fa6c3aa61e751580c199d8c49548c4b835d9b246))
* ci ([61a9380](https://github.com/ikenxuan/karin-plugin-kkk/commit/61a9380bddde67a5f731bced1bbab048256b7032))

## [1.2.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.11...v1.2.0) (2025-04-08)


### Features

* close [#62](https://github.com/ikenxuan/karin-plugin-kkk/issues/62) ([d9b5a98](https://github.com/ikenxuan/karin-plugin-kkk/commit/d9b5a984f9b00f9bb37e3dadfb253a15ae5609e6))

## [1.1.11](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.10...v1.1.11) (2025-04-05)


### Bug Fixes

* **bilibili:** 屏蔽词/标签支持对转发动态的子动态进行检测 ([d3adc55](https://github.com/ikenxuan/karin-plugin-kkk/commit/d3adc552663d709675c763ff53594461f9d58f1d))
* 前端配置添加更多说明 ([e39ecad](https://github.com/ikenxuan/karin-plugin-kkk/commit/e39ecadc4b1a251bf626e998ada09e79dac4e039))

## [1.1.10](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.9...v1.1.10) (2025-04-05)


### Bug Fixes

* ci ([9d2a907](https://github.com/ikenxuan/karin-plugin-kkk/commit/9d2a907aee3e868b58f78eafddff5402f4cbabab))
* **config:** 将禁用词汇设置改为禁用标签设置 ([0454751](https://github.com/ikenxuan/karin-plugin-kkk/commit/0454751ccb8e93d5bb68996468ded5cb1c59f5f0))

## [1.1.9](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.8...v1.1.9) (2025-03-29)


### Bug Fixes

* ci pub ([#57](https://github.com/ikenxuan/karin-plugin-kkk/issues/57)) ([ced7969](https://github.com/ikenxuan/karin-plugin-kkk/commit/ced79693434dc9a394221e6bf371381c72dcc189))
* npm run pub ([#56](https://github.com/ikenxuan/karin-plugin-kkk/issues/56)) ([84f10ed](https://github.com/ikenxuan/karin-plugin-kkk/commit/84f10eda0521307ad0f278bc00d3f2ff3a8ef963))

## [1.1.8](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.7...v1.1.8) (2025-03-26)

### 🐛 修复

* ci ([2411982](https://github.com/ikenxuan/karin-plugin-kkk/commit/24119822b2b5a16d47a5f755d5a6cdddd87f6a98))
* ci ([d43240c](https://github.com/ikenxuan/karin-plugin-kkk/commit/d43240c4069ae23226209f86f0e407a72864e76e))

### 🔄 持续集成

* 细优 ci/cd ([#55](https://github.com/ikenxuan/karin-plugin-kkk/issues/55)) ([9a586ce](https://github.com/ikenxuan/karin-plugin-kkk/commit/9a586cea89ead72ef5f634258196a80cc63f8f81))

# Changelog

## [1.1.7](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.6...v1.1.7) (2025-03-26)


### Bug Fixes

* ci ([5eaedcf](https://github.com/ikenxuan/karin-plugin-kkk/commit/5eaedcf07c8fff90990808d115efdfd0f5e79cc8))
* 统一将 `startText` 替换为 `label` 以提升代码一致性 ([05e6188](https://github.com/ikenxuan/karin-plugin-kkk/commit/05e61887430256eeeda668450dfcb5216386a734))

## [1.1.6](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.5...v1.1.6) (2025-03-24)


### Bug Fixes

* ci ([149f99c](https://github.com/ikenxuan/karin-plugin-kkk/commit/149f99cb89af18da99b18fc13793fcbb5ebc75f3))

## [1.1.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.4...v1.1.5) (2025-03-24)


### Bug Fixes

* 优化前端配置显示 ([b64efa6](https://github.com/ikenxuan/karin-plugin-kkk/commit/b64efa65a82b191bd59dc8b82871eb5250a0f54a))
* 移除一些过时内容 ([65d2a0a](https://github.com/ikenxuan/karin-plugin-kkk/commit/65d2a0a0d55ffaf3ecd87acbdfcd4c89ba0a5e1b))
* 评论解析错误 ([d08c76e](https://github.com/ikenxuan/karin-plugin-kkk/commit/d08c76e363f7701df60c9e12d26fbbe0518a365d))

## [1.1.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.3...v1.1.4) (2025-03-01)


### Bug Fixes

* save ([1ef6cf4](https://github.com/ikenxuan/karin-plugin-kkk/commit/1ef6cf41e5158930616bc451ff0697df5a5fe470))
* 获取版本 ([#46](https://github.com/ikenxuan/karin-plugin-kkk/issues/46)) ([3505283](https://github.com/ikenxuan/karin-plugin-kkk/commit/3505283e6067c6519e5257b24ca54a45ee933f80))

## [1.1.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.2...v1.1.3) (2025-02-28)


### Bug Fixes

* add type ([65c9710](https://github.com/ikenxuan/karin-plugin-kkk/commit/65c9710f6691a4a105c1a3e5b356e95429785647))
* avatar ([f4bd7a6](https://github.com/ikenxuan/karin-plugin-kkk/commit/f4bd7a61afe9a0146bf2fd8f1d27aa96cfcf7a5e))
* web.config.ts ([e939cd5](https://github.com/ikenxuan/karin-plugin-kkk/commit/e939cd5efb0d581ebd8510ff4ae5f18acb2c9c3e))

## [1.1.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.1...v1.1.2) (2025-02-25)


### Performance Improvements

* **app:** 添加移除渲染图片底部水印功能 ([f37f83a](https://github.com/ikenxuan/karin-plugin-kkk/commit/f37f83af93d18dc2e763a0c710639bc59deab0a0))
* 抖音推送图可选二维码是网页链接还是下载链接 ([7bb6139](https://github.com/ikenxuan/karin-plugin-kkk/commit/7bb6139de1eecc9082b52969690f9349fae65b40))

## [1.1.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.1.0...v1.1.1) (2025-02-24)


### Bug Fixes

* fix [#41](https://github.com/ikenxuan/karin-plugin-kkk/issues/41) ([6335eea](https://github.com/ikenxuan/karin-plugin-kkk/commit/6335eeabaa59ca188473be191251f16c30ee4970))
* save web config ([c594c0c](https://github.com/ikenxuan/karin-plugin-kkk/commit/c594c0c800abd8dff97c7af1d3f4dd175d068792))
* 选择性记录 ([89f9e1b](https://github.com/ikenxuan/karin-plugin-kkk/commit/89f9e1b791eb257f40965fdaccf132ba210e5758))


### Performance Improvements

* web config ([24c9dd0](https://github.com/ikenxuan/karin-plugin-kkk/commit/24c9dd0d1e0591633565d4c05c26bc385aba2c0b))

## [1.1.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.9...v1.1.0) (2025-02-22)


### Features

* **app:** 添加 API 服务挂载到 Karin 的功能 ([c636166](https://github.com/ikenxuan/karin-plugin-kkk/commit/c63616638ae8ca86cf3ee979bee5ce6e8ff7d754))

## [1.0.9](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.8...v1.0.9) (2025-02-19)


### Bug Fixes

* **douyin:** 修复分享链接选择错误 ([24d631d](https://github.com/ikenxuan/karin-plugin-kkk/commit/24d631df0f09d18ac2cb8a6f7f83335f90e4847c))
* 适配web修改配置 ([#37](https://github.com/ikenxuan/karin-plugin-kkk/issues/37)) ([e8b3df8](https://github.com/ikenxuan/karin-plugin-kkk/commit/e8b3df88e2c46e282f843910c4526e9721b9214d))

## [1.0.8](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.7...v1.0.8) (2025-02-15)


### Bug Fixes

* **bilibili:** 重构 B 站功能模块 ([9dbdd4e](https://github.com/ikenxuan/karin-plugin-kkk/commit/9dbdd4ef9e23154b6e7d8969a0a4f2005676aac9))
* **douyin:** 重构抖音功能模块 ([b7d865d](https://github.com/ikenxuan/karin-plugin-kkk/commit/b7d865d6e327c52fec445b047607f0de512340f4))
* **platform:** 重构部分平台的数据获取和推送逻辑 ([#34](https://github.com/ikenxuan/karin-plugin-kkk/issues/34)) ([1b8bf72](https://github.com/ikenxuan/karin-plugin-kkk/commit/1b8bf72db279cd07c775fd326fbc45d44cc05706))
* 合辑和图集解析冲突 ([#32](https://github.com/ikenxuan/karin-plugin-kkk/issues/32)) ([9d33390](https://github.com/ikenxuan/karin-plugin-kkk/commit/9d33390aa7e038c2aa7c7dde80bbe1d007be38b2))

## [1.0.7](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.6...v1.0.7) (2025-01-30)


### Bug Fixes

* 抖音推送图集解析 ([0ccc71a](https://github.com/ikenxuan/karin-plugin-kkk/commit/0ccc71a0bdb2e302a00a28bc9bbeeee415af4dba))
* 移除无用导入 ([3a3aac3](https://github.com/ikenxuan/karin-plugin-kkk/commit/3a3aac37291dae65cad66f0a9fc80850ad95c265))

## [1.0.6](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.5...v1.0.6) (2025-01-21)


### Bug Fixes

* **bilibili/douyin:** 优化用户列表渲染逻辑 ([dde7ee0](https://github.com/ikenxuan/karin-plugin-kkk/commit/dde7ee04d1f209d6da15ae06fe5e6590fae1bb1a))
* 移除无用导入 ([3a3aac3](https://github.com/ikenxuan/karin-plugin-kkk/commit/3a3aac37291dae65cad66f0a9fc80850ad95c265))

## [1.0.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.4...v1.0.5) (2025-01-20)


### Bug Fixes

* 合辑解析 ([3cd2c9e](https://github.com/ikenxuan/karin-plugin-kkk/commit/3cd2c9e583770f624ed3ff34bf666f2dce8326f6))


### Performance Improvements

* 更新解析库版本 ([6dd3a77](https://github.com/ikenxuan/karin-plugin-kkk/commit/6dd3a777ded088f00cf52cddf9d21ba2f7b88037))

## [1.0.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.3...v1.0.4) (2025-01-19)


### Bug Fixes

* ci ([2cc5cbb](https://github.com/ikenxuan/karin-plugin-kkk/commit/2cc5cbb7ecca8b581905a6e5e5cbbb1e5dd6a829))
* 细优 ([73b5562](https://github.com/ikenxuan/karin-plugin-kkk/commit/73b55621405a05e5e88e05aed7a3af28ab05eb8b))


### Performance Improvements

* 优化合辑解析 ([a2a75b4](https://github.com/ikenxuan/karin-plugin-kkk/commit/a2a75b423525180ea7f03f9112893640dea12238))

## [1.0.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/1.0.2-commit.ced194c...v1.0.3-commit.ced194c) (2025-01-16)


### Bug Fixes

* **platform/bilibili:** 优化 B 站推送中UP主信息的处理 ([079833f](https://github.com/ikenxuan/karin-plugin-kkk/commit/079833fef0a0e875f8c256f9e9898d4c0a67146f))

## [1.0.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v1.0.0...v1.0.1) (2025-01-15)


### Bug Fixes

* pkg size was big ([d592a2c](https://github.com/ikenxuan/karin-plugin-kkk/commit/d592a2c5df6dc2ffe32db9af3f0f5726ad5aa7d2))

## [1.0.0](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.9...v1.0.0) (2025-01-15)


### ⚠ BREAKING CHANGES

* 适配新版Karin ([#21](https://github.com/ikenxuan/karin-plugin-kkk/issues/21))

### Features

* 适配新版Karin ([#21](https://github.com/ikenxuan/karin-plugin-kkk/issues/21)) ([ef46290](https://github.com/ikenxuan/karin-plugin-kkk/commit/ef46290c67452237cb83fc4e552c3f3901f5a0a8))

## [0.1.9](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.8...v0.1.9) (2025-01-02)


### Bug Fixes

* support bili2233.cn ([d7828d9](https://github.com/ikenxuan/karin-plugin-kkk/commit/d7828d9c053e926886658cd1f2556f78751371b4))

## [0.1.8](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.7...v0.1.8) (2024-12-22)


### Bug Fixes

* 更进上游解析库版本 [#17](https://github.com/ikenxuan/karin-plugin-kkk/issues/17) ([5b307ac](https://github.com/ikenxuan/karin-plugin-kkk/commit/5b307ac7aecf044038b20089a663d83aeb5e1a7c))

## [0.1.7](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.6...v0.1.7) (2024-12-21)


### Bug Fixes

* B站获取评论失败 close: [#15](https://github.com/ikenxuan/karin-plugin-kkk/issues/15) ([8ed05e3](https://github.com/ikenxuan/karin-plugin-kkk/commit/8ed05e3210ccef20c62e1125ad0add053bbd4c0b))

## [0.1.6](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.5...v0.1.6) (2024-12-19)


### Bug Fixes

* 上传群文件没有后缀名。close [#13](https://github.com/ikenxuan/karin-plugin-kkk/issues/13) ([a5a3de1](https://github.com/ikenxuan/karin-plugin-kkk/commit/a5a3de1952cec7c881586d8bb9cdf6a6219f610c))

## [0.1.5](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.4...v0.1.5) (2024-12-07)


### Bug Fixes

* 语法错误 ([97d183a](https://github.com/ikenxuan/karin-plugin-kkk/commit/97d183aa8351c92ba8bdc35812f9dcb061c2cc5e))

## [0.1.4](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.3...v0.1.4) (2024-12-06)


### Performance Improvements

* 优化UI ([c0d032f](https://github.com/ikenxuan/karin-plugin-kkk/commit/c0d032f330bca208a84c0c14973b7d44fa961996))

## [0.1.3](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.2...v0.1.3) (2024-12-04)


### Bug Fixes

* 用错gid了 ([0a4cae1](https://github.com/ikenxuan/karin-plugin-kkk/commit/0a4cae19ecf60b1e1104ad8f68709cd85053e70d))
* 赋值msgid失败 ([cfb9dd7](https://github.com/ikenxuan/karin-plugin-kkk/commit/cfb9dd76a6a2b8321a61fd43ccd931cb4d1fede5))

## [0.1.2](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.1...v0.1.2) (2024-12-03)


### Bug Fixes

* eslint ([a9f417f](https://github.com/ikenxuan/karin-plugin-kkk/commit/a9f417fbec4a40e40ca134d01d31bd280ca4bb4f))
* 初始化playwright ([bdc1646](https://github.com/ikenxuan/karin-plugin-kkk/commit/bdc1646ebfafbf4ddc3b512b639521aab6697d54))
* 抖音直播推送 ([d051d85](https://github.com/ikenxuan/karin-plugin-kkk/commit/d051d855bc0562e2440a792ca80f6dfd59c9a71d))
* 抖音直播推送 ([612738b](https://github.com/ikenxuan/karin-plugin-kkk/commit/612738b1039be5da569d4e5e13425776baf9be31))
* 细节优化 ([a4ae6e1](https://github.com/ikenxuan/karin-plugin-kkk/commit/a4ae6e1ff4fc039b668d1e884e1c81756c7ad7fe))

## [0.1.1](https://github.com/ikenxuan/karin-plugin-kkk/compare/v0.1.0...v0.1.1) (2024-11-29)


### Performance Improvements

* 格式化大王 ([699ded0](https://github.com/ikenxuan/karin-plugin-kkk/commit/699ded0ab0afed12bb5546446136018e8817519a))

## 0.1.0 (2024-11-27)


### Features

* B站推送图给UP主添加头像框 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 图片渲染新增添加全局 `浅色` 与 `深色` 模式与开关切换 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 抖音B站推送新增 `banWorks` 与 `banTags`机制 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 新增 `#抖音扫码登录` 仅限Windows系统可用 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 新增上传模块与相关配置文件 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 新增抖音推送图集解析 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 新增抖音直播推送 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 新增视频压缩机制 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 添加 `#抖音/B站全部强制推送` ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 添加数据存储的相关类型声明 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 添加部分debug日志供调试 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))


### Bug Fixes

* 使用本地二维码渲染 `qrcode.min.js` 解决部分网络环境下CDN无法正常访问导致的二维码渲染失败的问题 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复B站web地址匹配错误 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复B站后台幽灵推送 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复n个bug ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复了B站获取视频大小需要等待视频下载完成的问题 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复了所有的类型错误 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复抖音合辑解析失败 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复抖音直播解析 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 修复评论图中的评论图片渲染失败的问题 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))


### Performance Improvements

* 优化了 `#kkk帮助` 、 `#kkk更新日志` 和 `#kkk设置` 的UI ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 优化了所有推送图的UI ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 优化了部分开关判断 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 优化部分提示 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 尽可能导入node原生库 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 解耦解析库，使用回npm进行管理 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
* 设置推送的回复信息添加群名字 ([6fa2b44](https://github.com/ikenxuan/karin-plugin-kkk/commit/6fa2b44eda9f04afb1441783ee261aa0673dd746))
