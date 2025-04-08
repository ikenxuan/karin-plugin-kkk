import { builtinModules } from 'node:module'
import { defineConfig } from 'tsup'

/**
 * @description `tsup` configuration options
 */
export default defineConfig({
  entry: ['src/index.ts', 'src/web.config.ts', 'src/apps/*.ts', 'src/cli/*.ts'],
  format: 'esm', // 输出格式
  target: 'node18', // 目标环境
  splitting: true, // 是否拆分文件
  sourcemap: false, // 是否生成 sourcemap
  clean: true, // 是否清理输出目录
  dts: false, // 是否生成 .d.ts 文件
  outDir: 'lib', // 输出目录
  treeshake: true, // 树摇优化
  // minify: process.argv[2] !== '--false', // 压缩代码
  ignoreWatch: [], // 忽略监视
  shims: true,
  external: [
    ...builtinModules,
    ...builtinModules.map((node) => `node:${node}`),
    'node-karin',
  ],
  noExternal: [
    '@ikenxuan/amagi',
  ],
  esbuildOptions (options) {
    options.banner = {
      js: `
        import { createRequire } from 'module';
        const require = createRequire(import.meta.url);
      `,
    }
    return options
  },
})