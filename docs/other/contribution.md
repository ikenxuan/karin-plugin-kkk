1. [fork](https://github.com/ikenxuan/karin-plugin-kkk/fork) 本项目到自己的仓库
2. 克隆到本地
```sh
git clone https://github.com/你的GitHub用户名/karin-plugin-kkk.git
```
1. 安装依赖
```sh
pnpm i
```
1. 启动开发环境（根目录下执行）
```sh
# tsx 监听core子包文件变化并自动重启
# core子包内是插件核心逻辑
pnpm watch 
```
```sh
# 调试图片模板（可选）
pnpm template
```
```sh
# 调试自带的web（可选）
pnpm web
```
```sh
# 打包
pnpm build
```


注意：开发环境下，调试完成后的图片模板，需要先对template包进行打包以生成新的css方可在插件中使用。生产环境无需执行此步骤