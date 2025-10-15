# 配置不同平台的 cookies

* 本插件**没有后门**，本插件**不会上传**有关你的任何信息到第三方。
* 你所配置的 ck 只会用于请求官方 API 接口
* 所有携带 ck 的请求都是通过 [解析库](https://github.com/ikenxuan/amagi) 发送的，本插项目只会调用解析库的接口进行数据获取

### 如何获取 Cookies ？

**所有平台都可用**以下该方法来获取 ck

## PC 浏览器

**总结：找到携带 Cookie 的请求后，复制请求头中的 Cookie**

> **看这个视频就懂了**

<video src="/video.mp4" controls>观看视频教程</video>

<details>
<summary>图文版，点击展开</summary>

找到携带 Cookie 的请求复制请求头中的 Cookie

![img](/intro/pic1.jpg)

</details>

## 移动端（Android）

使用 [via 浏览器](https://res.viayoo.com/v1/via-release-cn.apk) 访问以下网址的网页版并**登录你自己的账号**

抖音: [www.douyin.com](https://www.douyin.com)  
哔哩哔哩: [www.bilibili.com](https://www.bilibili.com)  
快手: [www.kuaishou.com](https://www.kuaishou.com)

登录成功后点击 **`左上角按钮`** => **`查看 Cookies`** => **`复制文本`**

## 如何配置？

* 通过 `Karin WebUI` 配置，打开插件的配置页面，找到 `Cookies 相关` 配置项，根据需要配置 ck  

* 手动配置，打开 `@karinjs/karin-plugin-kkk/config/cookies.yaml` 根据需要配置 ck  

```yaml
# 抖音ck
douyin: 此处填上你的抖音ck

# B站ck
bilibili: 此处填上你的B站ck

# 快手ck
kuaisha: 此处填上你的快手ck
```
