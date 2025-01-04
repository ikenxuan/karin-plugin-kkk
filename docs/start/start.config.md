# 配置文件

<!-- 本插件配置项过多<br>

建议使用 [**Karin Manage**](https://github.com/HalcyonAlcedo/karin-plugin-manage) 进行配置文件的修改

``` json{4-10}
├─config // 插件配置文件目录
│  │  PluginConfigView.yaml // Karin Manage 配置文件（请勿修改该文件的任何内容！）
│  │
│  ├─config // 用户配置文件目录，可修改该目录下的任何文件 // [!code focus]
│  │      app.yaml // 插件应用配置 // [!code focus]
│  │      bilibili.yaml // B站相关配置 // [!code focus]
│  │      cookies.yaml // 账号Cookies相关配置 // [!code focus]
│  │      douyin.yaml // 抖音相关配置 // [!code focus]
│  │      pushlist.yaml // 推送相关配置 // [!code focus]
│  │      kuaishou.yaml // 快手相关配置 // [!code focus]
│  │
│  └─default_config // 默认配置文件目录（请勿修改此目录下的任何文件！）
│          app.yaml // 含义同上
│          bilibili.yaml // 含义同上
│          cookies.yaml // 含义同上
│          douyin.yaml // 含义同上
│          pushlist.yaml // 含义同上
│          kuaishou.yaml // 含义同上
``` -->

## 默认配置文件

::: details 插件应用配置
```yaml
# 视频解析工具总开关，修改后重启生效
videotool: true

# 默认解析，即识别最高优先级，修改后重启生效
defaulttool: true

# 自定义优先级，「默认解析」关闭后才会生效。修改后重启生效
priority: 800

# 发送合并转发消息，可能多用于抖音解析
sendforwardmsg: true

# 缓存删除，非必要不修改！
rmmp4: true

# 渲染精度，可选值50~200，建议100。设置高精度会提高图片的精细度，过高可能会影响渲染与发送速度
renderScale: 100

# 放出API服务（本地部署一个抖音、B站和快手的api服务）
APIServer: false

# API服务端口
APIServerPort: 4567

# 渲染评论图和推送图的主题色，0为自动（06:00-18:00为浅色，18:00-06:00为深色），1为浅色，2为深色
Theme: 0
```
:::

::: details B站相关配置
```yaml
# B站解析开关，单独开关，受「总开关」影响
switch: true

# B站解析提示，发送提示信息：“检测到B站链接，开始解析”
tip: true

# B站评论解析，发送哔哩哔哩作品评论图
comment: true

# B站评论数量，设置接口返回的评论数量，范围 1 ~ x 条
numcomment: 5

# 解析视频是否优先保内容，true为优先保证上传将使用最低分辨率，false为优先保清晰度将使用最高分辨率
videopriority: false

# 番剧解析自动选择分辨率。开启时根据上传设置（upload.yaml）的「filelimit」值自动选择合适分辨率；关闭时下载番剧将不受视频文件大小限制，下载可支持的最高分辨率视频文件
autoResolution: true

# B站推送相关配置
push: 
  # 推送开关，开启后需重启；使用「#设置B站推送 + 用户UID」配置推送列表
  switch: true
  # 动态中有指定关键词时，不推送
  banWords: 
    - 关键词1
    - 关键词2
  # 动态中有指定标签时，不推送
  banTags: 
    - 标签1
    - 标签2
  # 谁可以设置推送，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员
  permission: master
  # 推送定时任务的cron表达式，默认为每十分钟推送一次
  cron: '*/10 * * * *'
  # 推送时是否一同解析该动态
  parsedynamic: false
  # 是否打印日志
  log: true
  ```
:::

::: details 账号Cookies相关配置
```yaml
# 抖音ck
douyin:

# B站ck
bilibili:

# 快手ck
kuaishou: 
```
:::

::: details 抖音相关配置
```yaml
# 抖音解析开关，单独开关，受「总开关」影响
switch: true

# 抖音解析提示，发送提示信息：“检测到抖音链接，开始解析”
tip: true

# 抖音评论解析
comment: true

# 抖音评论数量，范围 1 ~ x 条
numcomment: 5

# 图集BGM是否使用高清语音发送，高清语音「ios/PC」系统均无法播放，自行衡量开关（仅icqq）
sendHDrecord: true

# 抖音推送相关配置
push: 
  # 推送开关，开启后需重启；使用「#设置抖音推送 + 抖音号」配置推送列表
  switch: true
  # 作品中有指定关键词时，不推送
  banWords: 
    - 关键词1
    - 关键词2
  # 作品中有指定标签时，不推送
  banTags: 
    - 标签1
    - 标签2
  # 谁可以设置推送，all为所有人，admin为管理员，master为主人，group.owner为群主，group.admin为群管理员
  permission: master
  # 推送定时任务的cron表达式，默认为每十分钟推送一次
  cron: '*/10 * * * *'
  # 推送时是否一同解析该作品
  parsedynamic: false
  # 是否打印日志
  log: true
```
:::

::: details 快手相关配置
```yaml
# 快手解析开关，单独开关，受「总开关」影响
switch: true

# 快手解析提示，发送提示信息：“检测到快手链接，开始解析”
tip: true

# 快手评论数量，范围1~30条
numcomment: 5
```
:::

::: details 推送相关配置
```yaml
# # 抖音推送列表
# douyin:
#   -
#     # 抖音用户（可不填，执行推送时会自动填上）
#     sec_uid: 
#     # 抖音号（必填）
#     short_id: 
#     # 推送群号和机器人账号，多个则使用逗号隔开（必填，例子：[12345678:87654321, 11451419:88888888]，群号就是11451419，机器人账号就是88888888）
#     group_id:
#       - 1145141919810:8888888888
#     # 这个博主的名字信息（可不填，执行推送时会自动填上）
#     remark: 

# # B站推送列表
# bilibili:
#   -
#     # B站用户（必填）
#     host_mid: 
#     # 推送群号和机器人账号，多个则使用逗号隔开（必填，例子：[12345678:87654321, 11451419:88888888]，群号就是11451419，机器人账号就是88888888）
#     group_id:
#       - 1145141919810:8888888888
#     # 这个UP主的名字信息（可不填，执行推送时会自动填上）
#     remark: 

# 抖音推送列表
douyin: []

# B站推送列表
bilibili: []
```
:::

::: details 上传相关配置
```yaml
# 发送视频经本插件转换为base64格式后再发送，适合Karin与机器人不在同一网络环境下开启
sendbase64: false

# 视频上传拦截，开启后会根据解析的视频文件大小判断是否需要上传（B站番剧无影响）
usefilelimit: false

# 视频大小拦截值（填数字），视频文件大于该数值则不会上传 单位: MB，「视频文件上传限制」开启后才会生效（B站视频解析会根据该值自动选择适合的清晰度）
filelimit: 20

# 压缩视频，开启后会将视频文件压缩后再上传，适合上传大文件
compress: false

# 触发视频压缩的阈值，单位：MB。当文件大小超过该值时，才会压缩视频，「压缩视频」开启后才会生效
compresstrigger: 80

# 压缩后的值，若视频文件大小大于「触发视频压缩的阈值」的值，则会进行压缩至该值（±5%），「压缩视频」开启后才会生效
compressvalue: 30

# 使用文件上传，开启后会将视频文件上传到群文件中，私聊也行
usegroupfile: false

# 群文件上传阈值，当文件大小超过该值时将使用群文件上传，单位：MB，「使用群文件上传」开启后才会生效
groupfilevalue: 100
:::