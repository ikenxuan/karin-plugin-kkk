# 变更日志

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
