import fs from 'node:fs'
import { builtinModules } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import terser from '@rollup/plugin-terser'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { copyTemplateAssetsPlugin, generateBuildMetadataPlugin } from './vite.plugin'

// 在ES模块中模拟__dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const entry: string[] = ['src/index.ts', 'src/root.ts', 'src/web.config.ts', 'src/export/template.ts']

const getFiles = (dir: string) => {
  fs.readdirSync(dir).forEach((file) => {
    if (file.endsWith('.ts')) {
      entry.push(`${dir}/${file}`)
    }
  })
}

getFiles('src/apps')

export default defineConfig({
  define: {
    __dirname: 'new URL(\'.\', import.meta.url).pathname',
    __filename: 'new URL(\'\', import.meta.url).pathname'
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
        'fingerprint-generator',
        'fingerprint-injector',
        '@karinjs/plugin-puppeteer',
        'jsdom'
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
      template: resolve(__dirname, '../template/src/client.ts')
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