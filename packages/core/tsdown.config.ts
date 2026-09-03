import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    template: 'src/export/template.ts',
    richtext: 'src/export/richtext.ts',
    amagi: 'src/export/amagi.ts'
  },
  outDir: 'lib/core_chunk',
  // tsdown 在 vite build 之后运行，不能清空 vite 已产出的 JS
  clean: false,
  deps: {
    onlyBundle: false,
    neverBundle: ['axios', 'zod', '@karinjs/template-react']
  },
  dts: {
    emitDtsOnly: true,
    // core 的 tsconfig 带 references，会触发 tsc -b 构建模式，这里绕开并内联声明所需的路径映射
    tsconfig: false,
    compilerOptions: {
      baseUrl: '.',
      moduleResolution: 'bundler',
      paths: {
        '@kkk/richtext': ['../richtext/src/index.ts'],
        '@template/*': ['./template/*'],
        '@ikenxuan/amagi': ['../../../amagi/packages/core/src/index.ts']
      }
    }
  }
})
