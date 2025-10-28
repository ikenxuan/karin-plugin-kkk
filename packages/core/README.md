# karin-plugin-kkk

[![pkg.pr.new](https://pkg.pr.new/badge/ikenxuan/karin-plugin-kkk)](https://pkg.pr.new/~/ikenxuan/karin-plugin-kkk)

🦄 **_Karin 的「抖音」「B 站」视频解析/动态推送插件。提供对 Bot 的视频解析和动态推送功能，通过接口获取数据并渲染图片返回_**

## ⬇️ 安装

- 插件市场安装（非常推荐）

  **通过 Karin WebUI 的插件市场直接安装和管理本插件。**

<br />

- 使用 **`包管理器`** 安装（推荐）
  在 **Karin 项目根目录** 下运行<br />
  手动更新时更新也可以使用该命令
  ```sh
  pnpm add karin-plugin-kkk@latest -w
  ```

<br />

## ⚙️ 配置

必须配置对应平台的 Cookies 才能使用。<br />
其他更多配置项请在 Karin WebUI 插件配置中查看并配置。

## 📖 功能

**更多信息可打开 [文档主页](https://ikenxuan.github.io/karin-plugin-kkk/) 阅读。**<br>
反馈群：[795874649](http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=S8y6baEcSkO6TEO5kEdfgmJhz79Oxdw5&authKey=ficWQytHGz3KIv5i0HpGbEeMBpABBXfjEMYRzo3ZwMV%2B0Y5mq8cC0Yxbczfa904H&noverify=0&group_code=795874649)

## 🛠️ 开发

<details>
<summary>点击展开</summary>

1. [fork](https://github.com/ikenxuan/karin-plugin-kkk/fork) 本项目到自己的仓库
2. 克隆到本地
```sh
git clone https://github.com/你的GitHub用户名/karin-plugin-kkk.git
```
3. 安装依赖
```sh
pnpm i
```
4. 启动开发环境
```sh
# tsx 监听core子包文件变化并自动重启
pnpm watch 
```
```sh
# 调试图片模板
pnpm template
```
```sh
# 调试自带的web
pnpm web
```
```sh
# 打包
pnpm build
```

</details>

## 🌟 贡献者

> 🌟 星光闪烁，你们的智慧如同璀璨的夜空。感谢所有为 **karin-plugin-kkk** 做出贡献的人！

<a href="https://github.com/ikenxuan/karin-plugin-kkk/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ikenxuan/karin-plugin-kkk" />
</a>

![Alt](https://repobeats.axiom.co/api/embed/76efd64f02ce043df06e2cd21913a0981b87f069.svg 'Repobeats analytics image')

## Star History

<a href="https://star-history.com/#ikenxuan/karin-plugin-kkk&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=ikenxuan/karin-plugin-kkk&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=ikenxuan/karin-plugin-kkk&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=ikenxuan/karin-plugin-kkk&type=Date" />
 </picture>
</a>

## 😊 鸣谢

**业务站点**

- [www.douyin.com](https://www.douyin.com) & [www.bilibili.com](https://www.bilibili.com) & [www.kuaishou.com](https://www.kuaishou.com)

本项目的开发参考了以下开源项目部分代码，排名不分先后

**接口文档与加密参数算法**

- [ikenxuan/amagi](https://github.com/ikenxuan/amagi)
- 更多待补充...

**友情链接**

- Karin 框架 [**GitHub**](https://github.com/Karinjs/Karin) | [**文档**](https://karin.fun)

## 🧷 许可证

[**GPL-3.0**](./LICENSE)

## ❗ 声明

未经同意，禁止将本项目的开源代码用于任何商业目的。因使用本项目产生的一切问题与后果由使用者自行承担，项目开发者不承担任何责任。
