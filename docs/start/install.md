
# 安装插件

## ⬇️ 安装

**以下三种方式任选其一即可安装插件**

* 使用编译产物 **`build 分支`**（非常推荐）
   <details>
   <summary>点击展开</summary>

   1. 克隆源码

   <mark>**务必使用**</mark> 以下的命令安装，否则插件可能不会被识别

   ```sh
   git clone --depth=1 -b build https://github.com/ikenxuan/karin-plugin-kkk.git ./plugins/karin-plugin-kkk/
   ```
   <details>
   <summary>如果你的 git 无法访问至 Github...点击打开查看解决方法</summary>

   > 若克隆无法连接到 Github，可以使用 GitHub Proxy 提供的镜像加速克隆
   > 建议收藏 [GitHub Proxy 最新地址发布](https://ghproxy.link/) 站点，以免镜像站被 GFW 封锁导致克隆失败
   > ```sh
   > git clone --depth=1 -b build https://ghgo.xyz/https://github.com/ikenxuan/karin-plugin-kkk.git ./plugins/karin-plugin-kkk/
   > ```

   </details>
   <br>

   2. 安装依赖
   安装依赖，在 **Karin 根目录** 下运行
   ```sh
   pnpm install --filter=karin-plugin-kkk
   ```

   </details>

* 使用 **`包管理器`** 安装（非常推荐）
   <details>
   <summary>点击展开</summary>

   在 **Karin 根目录** 下运行
   ```sh
   pnpm add karin-plugin-kkk -w
   ```
   </details>

* 使用 Release **`发行版`**（不推荐）
    <details>
    <summary>点击展开</summary>

    <p style="color: red; font-weight: bolder;">不推荐该方式，后续只能重复下载 Release 包进行更新，且无法通过 Git 或 包管理器 进行更新</p>
    
    1. 打开 Release 页面: https://github.com/ikenxuan/karin-plugin-kkk/releases
    2. 找到最新的版本，下载名为 `build.zip` 的压缩包
    3. 在 `plugins/` 目录下解压该压缩包

    * 完成后相关源码应在 `Karin根目录/plugins/karin-plugin-kkk/` 内<br><br>

    解压完成后在插件目录下运行
    ```sh
    pnpm install   
    ```

    或者在 **Karin 根目录** 下运行
    ```sh
    pnpm install --filter=karin-plugin-kkk
    ```

    </details>