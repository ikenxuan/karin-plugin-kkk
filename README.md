# karin-plugin-kkk

**_Karin 的「抖音」「B站」「快手」视频解析/动态推送插件_**

## 安装

# 暂时只有 GitHub 一个渠道可下载

1. 克隆 **`build`** 分支（非常推荐）
   ```sh
   git clone --depth=1 -b build https://github.com/ikenxuan/karin-plugin-kkk.git ./plugins/karin-plugin-kkk/
   ```

   > 如果你的网络环境较差，无法连接到 Github，可以使用 Gitee 镜像仓库，可能会更新不及时
   >
   > ```sh
   > git clone --depth=1 -b build https://gitee.com/ikenxuan/karin-plugin-kkk.git ./plugins/karin-plugin-kkk/
   > ```

   安装依赖， 在 Karin 根目录下运行
   ```sh
   pnpm install --filter=karin-plugin-kkk -P
   ```

2. 使用 **`包管理器`** 安装（推荐）
   <details>
   <summary>点击展开</summary>

   在 Karin 根目录下运行
   ```sh
   pnpm add karin-plugin-kkk -w
   ```
   </details>

3. 使用 Release **`发行版`**（不推荐）
    <details>
    <summary>点击展开</summary>

    <p style="color: red; font-weight: bolder;">不推荐该方式，后续无法通过 Git 进行更新</p>
    
      * 打开 Release 页面: https://github.com/ikenxuan/karin-plugin-kkk/releases
      * 找到最新的版本，下载名为 `build.zip` 的压缩包
      * 在 `plugins/` 目录下解压该压缩包
      * 完成后插件应在 `机器人根目录/plugins/karin-plugin-kkk/`<br><br>

      解压完成后在插件目录下运行
      ```sh
      pnpm install   
      ```

      或者Karin 根目录下运行
      ```sh
      pnpm install --filter=karin-plugin-kkk -P
      ```

    </details>

4. 克隆 main 分支 **`自行编译`**（不推荐）
   <details>
   <summary>点击展开</summary>

   #### 克隆源码
    ```sh
    git clone --depth=1 https://github.com/ikenxuan/karin-plugin-kkk.git ./plugins/karin-plugin-kkk/
    ```
    **TypeScript 源码无法运行，需要先编译成 JavaScript 后才可运行**
    #### 进入源码目录
    ```sh
    cd plugins/karin-plugin-kkk/
    ```
    #### 安装依赖
    ```sh
    pnpm install
    ```
    #### 编译
    ```sh
    pnpm run build
    ```
    编译完成后即可回到根目录启动 Karin 运行
   </details>

## 功能

**更多信息可打开 [文档主页](https://ikenxuan.github.io/kkkkkk-10086) 阅读。**

## 鸣谢
**业务站点**

- [www.douyin.com](https://www.douyin.com) & [www.bilibili.com](https://www.bilibili.com) & [www.kuaishou.com](https://www.kuaishou.com)

本项目的开发参考了以下开源项目部分代码，排名不分先后

**部分代码借鉴**

- [xfdown/xiaofei-plugin](https://gitee.com/xfdown/xiaofei-plugin)
- [kyrzy0416/rconsole-plugin](https://gitee.com/kyrzy0416/rconsole-plugin)
- [think-first-sxs/reset-qianyu-plugin](https://gitee.com/think-first-sxs/reset-qianyu-plugin)
- [yeyang52/yenai-plugin](https://github.com/yeyang52/yenai-plugin)
- [XasYer/Shiranai-Plugin](https://github.com/XasYer/Shiranai-Plugin)
- [XasYer/YePanel](https://github.com/XasYer/YePanel)
- 更多待补充...

**接口文档与加密参数算法**

- [SocialSisterYi/bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)
- [NearHuiwen/TiktokDouyinCrawler](https://github.com/NearHuiwen/TiktokDouyinCrawler)
- [B1gM8c/X-Bogus](https://github.com/B1gM8c/X-Bogus)
- [ikenxuan/amagi](https://github.com/ikenxuan/amagi)
- 更多待补充...

**友情链接**
- Karin 框架 [**GitHub**](https://github.com/Karinjs/Karin) | [**文档**](https://karin.fun)

## 许可证
[**GPL-3.0**](./LICENSE)

## 声明
> [!CAUTION]
> 本项目提供的开源代码是出于学习进行开发。如果您认为该项目侵犯了您的知识产权或其他合法权益，请通过 **[<i class="fa-brands fa-qq fa-flip"></i> QQ](https://qm.qq.com/q/k6Up32hdWE)** 向我们提供书面通知。我们将在收到有效通知后，尽快进行审查，并采取必要的措施。
> 
> 未经同意，禁止将本项目的开源代码用于任何商业目的。因使用本项目产生的一切问题与后果由使用者自行承担，项目开发者不承担任何责任
