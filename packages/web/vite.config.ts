import path from "node:path"

import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import obfuscator from 'vite-plugin-javascript-obfuscator'


// https://vite.dev/config/
export default defineConfig({
  base: '/kkk/',
  plugins: [
    react(),
    tailwindcss(),
    obfuscator({
    include: ['src/**/*.ts', 'src/**/*.tsx'],
    exclude: ['node_modules/**', 'src/App.tsx', 'src/main.tsx'],
    apply: 'build',
    debugger: true,
    options: {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArray: true,
      stringArrayThreshold: 1,
      stringArrayWrappersCount: 10,
      deadCodeInjection: true,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 5,
      stringArrayWrappersType: 'function',
      stringArrayEncoding: ['rc4'],
      unicodeEscapeSequence: true,
      identifierNamesGenerator: 'hexadecimal',
      renameGlobals: false,
      selfDefending: true,
      debugProtection: false,
      debugProtectionInterval: 2000,
      disableConsoleOutput: true,
      domainLock: [],
      reservedNames: [],
      seed: 0,
      sourceMap: false,
      sourceMapBaseUrl: '',
      sourceMapFileName: '',
      sourceMapMode: 'separate',
      target: 'browser'
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    emptyOutDir: true,
    outDir: '../core/lib/web_chunk',
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 最小化混淆
    minify: 'esbuild',
    // 设置chunk大小警告阈值
    chunkSizeWarningLimit: 1000,
    // sourcemap: true,
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:7777',
        changeOrigin: true,
      },
    },
  },
})
