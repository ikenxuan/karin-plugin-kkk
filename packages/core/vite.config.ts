import fs from 'node:fs'
import { builtinModules } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import terser from '@rollup/plugin-terser'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { copyTemplateAssetsPlugin, generateBuildMetadataPlugin, getKarinVersion } from './vite.plugin'

// 在ES模块中模拟__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 读取 amagi 的版本号
const amagiPkg = JSON.parse(fs.readFileSync(resolve(__dirname, '../amagi/package.json'), 'utf-8'))

const entry: string[] = ['src/index.ts', 'src/root.ts', 'src/web.config.ts', 'src/export/template.ts']

const getFiles = (dir: string) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.ts')) {
      entry.push(`${dir}/${file}`)
    }
  })
}

getFiles('src/apps')

const karinVersion = getKarinVersion(__dirname)

export default defineConfig({
  define: {
    __dirname: 'new URL(\'.\', import.meta.url).pathname',
    __filename: 'new URL(\'\', import.meta.url).pathname',
    __REQUIRE_KARIN_VERSION__: JSON.stringify(karinVersion),
    __VERSION__: JSON.stringify(amagiPkg.version)
  },
  build: {
    target: 'node18',
    lib: {
      formats: ['es'],
      entry
    },
    emptyOutDir: true,
    outDir: 'lib',
    rolldownOptions: {
      platform: 'node',
      external: [
        ...builtinModules,
        ...builtinModules.map((mod) => `node:${mod}`),
        ...[/^node-karin/],
        ...[/^@karinjs\//],
        'fingerprint-injector',
        '@snapka/puppeteer'
      ],
      output: {
        inlineDynamicImports: true,
        format: 'esm',
        esModule: true,
        generatedCode: {
          preset: 'es2015'
        },
        advancedChunks: {
          groups: [
            { name: 'vendor', test: /node_modules/ },
            { name: 'template', test: /src\/export\/template/ },
            { name: 'main', test: /src/ }
          ]
        },
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index' || chunkInfo.name === 'root') {
            return `${chunkInfo.name}.js`
          }
          if (
            chunkInfo.name === 'web.config' ||
            chunkInfo.facadeModuleId?.replace(/\\/g, '/').endsWith('/src/web.config.ts')
          ) {
            return 'web.config.js'
          }
          if (chunkInfo.facadeModuleId?.replace(/\\/g, '/').includes('src/apps')) {
            return `apps/${chunkInfo.name}.js`
          }
          return `core_chunk/${chunkInfo.name}.js`
        },
        chunkFileNames: (chunkInfo) => {
          return `core_chunk/${chunkInfo.name}-[hash].js`
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
    alias: {
      '@': resolve(__dirname, './src'),
      template: resolve(__dirname, '../template/src/client.ts'),
      '@ikenxuan/amagi/chalk': resolve(__dirname, '../amagi/src/exports/chalk.ts'),
      '@ikenxuan/amagi/axios': resolve(__dirname, '../amagi/src/exports/axios.ts'),
      '@ikenxuan/amagi/express': resolve(__dirname, '../amagi/src/exports/express.ts'),
      '@ikenxuan/amagi/log4js': resolve(__dirname, '../amagi/src/exports/log4js.ts'),
      '@ikenxuan/amagi': resolve(__dirname, '../amagi/src/index.ts'),
      amagi: resolve(__dirname, '../amagi/src')
    }
  },
  plugins: [
    terser({
      compress: false,
      mangle: false,
      format: {
        ascii_only: false
      }
    }),
    react(),
    tailwindcss(),
    generateBuildMetadataPlugin(__dirname),
    copyTemplateAssetsPlugin(__dirname)
  ]
})