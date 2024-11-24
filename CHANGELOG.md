# Changelog

## 1.0.0 (2024-11-24)


### Features

* B站推送图给UP主添加头像框 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 图片渲染新增添加全局 `浅色` 与 `深色` 模式与开关切换 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 抖音B站推送新增 `banWorks` 与 `banTags`机制 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 新增 `#抖音扫码登录` 仅限Windows系统可用 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 新增上传模块与相关配置文件 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 新增抖音推送图集解析 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 新增抖音直播推送 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 新增视频压缩机制 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 添加数据存储的相关类型声明 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 添加部分debug日志供调试 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))


### Bug Fixes

* 使用本地二维码渲染 `qrcode.min.js` 解决部分网络环境下CDN无法正常访问导致的二维码渲染失败的问题 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复B站web地址匹配错误 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复B站后台幽灵推送 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复n个bug ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复了B站获取视频大小需要等待视频下载完成的问题 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复了所有的类型错误 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复抖音合辑解析失败 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复抖音直播解析 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 修复评论图中的评论图片渲染失败的问题 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 更新 `Eslint` 规则，约束全部 ts 文件的语法 ([7205fcf](https://github.com/ikenxuan/karin-plugin-kkk/commit/7205fcf60a6183a8a15120b3f7e63759b3fb1da5))


### Performance Improvements

* 优化了 `#kkk帮助` 、 `#kkk更新日志` 和 `#kkk设置` 的UI ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 优化了所有推送图的UI ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 优化了部分开关判断 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 优化部分提示 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 尽可能导入node原生库 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 解耦解析库amagi，使用回npm进行管理 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
* 设置推送的回复信息添加群名字 ([f9b03d7](https://github.com/ikenxuan/karin-plugin-kkk/commit/f9b03d73777073d65968b815accdc86186bd3520))
