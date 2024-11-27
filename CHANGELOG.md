# Changelog

## 1.0.0 (2024-11-27)


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
