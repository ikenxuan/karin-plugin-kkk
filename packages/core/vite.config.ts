import fs from 'node:fs'
import { builtinModules } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ktrBuildPlugin } from '@karinjs/template-react/plugin'
import { defineConfig } from 'vite'

import { generateBuildMetadataPlugin, getKarinVersion } from './vite.plugin'
import { injectStartTimerPlugin } from './vite.plugin/inject-start-timer'

// 在ES模块中模拟__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 读取 amagi 的版本号
const amagiPkg = JSON.parse(fs.readFileSync(resolve(__dirname, '../amagi/packages/core/package.json'), 'utf-8'))

const entry: string[] = [
  'src/index.ts',
  'src/root.ts',
  'src/web.config.ts',
  'src/export/template.ts',
  'src/export/richtext.ts',
  'src/export/amagi.ts',
  // ktr 约定注册表是固定入口（先跑 ktr sync 生成），生产环境按 lib/template-registry.js 发现
  '.ktr/template-registry.ts'
]

const getFiles = (dir: string) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.ts')) {
      entry.push(`${dir}/${file}`)
    }
  })
}

getFiles('src/apps')

const karinVersion = getKarinVersion(__dirname)

// 定义需要打包进 main 的 src 目录前缀
const mainSrcPrefixes = [
  resolve(__dirname, 'src'),
  resolve(__dirname, '.ktr'),
  resolve(__dirname, 'ktr'),
  resolve(__dirname, '../amagi/packages/core/src'),
  resolve(__dirname, '../richtext/src')
].map((p) => p.replace(/\\/g, '/'))

export default defineConfig({
  define: {
    __dirname: "new URL('.', import.meta.url).pathname",
    __filename: "new URL('', import.meta.url).pathname",
    __REQUIRE_KARIN_VERSION__: JSON.stringify(karinVersion),
    __VERSION__: JSON.stringify(amagiPkg.version)
  },
  assetsInclude: ['**/*.wasm'],
  build: {
    assetsInlineLimit: 10 * 1024 * 1024,
    target: 'node22',
    lib: {
      formats: ['es'],
      entry
    },
    emptyOutDir: true,
    outDir: 'lib',
    rolldownOptions: {
      platform: 'node',
      preserveEntrySignatures: 'allow-extension',
      external: [
        ...builtinModules,
        ...builtinModules.map((mod) => `node:${mod}`),
        ...[/^node-karin/],
        // @karinjs/template-react 必须打进产物（与模板组件共用同一份 React），其余 @karinjs 包保持外部
        ...[/^@karinjs\/(?!template-react)/],
        '@ikenxuan/qrcode'
      ],
      output: {
        format: 'esm',
        esModule: true,
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            {
              name: 'main',
              test: (module) => {
                const id = typeof module === 'string' ? module.replace(/\\/g, '/') : ''
                if (!id) return false
                return mainSrcPrefixes.some((prefix) => id.startsWith(prefix + '/'))
              },
              priority: 1
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 0
            }
          ]
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index' || chunkInfo.name === 'root') {
            return `${chunkInfo.name}.js`
          }
          // ktr 注册表产物必须固定在 lib 根目录（生产发现约定只扫产物目录一层）
          if (chunkInfo.name === 'template-registry' || chunkInfo.name === 'mock-registry') {
            return `${chunkInfo.name}.js`
          }
          if (chunkInfo.name === 'web.config' || chunkInfo.facadeModuleId?.replace(/\\/g, '/').endsWith('/src/web.config.ts')) {
            return 'web.config.js'
          }
          if (chunkInfo.facadeModuleId?.replace(/\\/g, '/').includes('src/apps')) {
            return `apps/${chunkInfo.name}.js`
          }
          return `core_chunk/${chunkInfo.name}.js`
        },
        chunkFileNames: (chunkInfo) => {
          return `core_chunk/${chunkInfo.name}.js`
        }
      }
    },
    minify: false,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      defaultIsModuleExports: true
    }
  },
  resolve: {
    conditions: ['node'],
    // link: 本地 ktr 时它 node_modules 里的 react 会被当成独立副本打进产物，
    // SSR 时组件读到的 React dispatcher 是 null（Cannot read 'useContext' of null），强制去重到本包。
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: 'express', replacement: 'node-karin/express' },
      { find: 'ws', replacement: 'node-karin/ws' },
      { find: 'axios', replacement: 'node-karin/axios' },
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: '@kkk/richtext', replacement: resolve(__dirname, '../richtext/src/index.ts') },
      { find: '@template', replacement: resolve(__dirname, './ktr') },
      { find: '@ikenxuan/amagi', replacement: resolve(__dirname, '../amagi/packages/core/src/index.ts') },
      { find: 'amagi', replacement: resolve(__dirname, '../amagi/packages/core/src') }
    ]
  },
  plugins: [injectStartTimerPlugin(), generateBuildMetadataPlugin(__dirname), ktrBuildPlugin()]
})
