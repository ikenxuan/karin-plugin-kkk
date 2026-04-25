import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/export/template.ts', 'src/export/richtext.ts', 'src/export/amagi.ts'],
  format: ['esm'],
  target: 'es2022',
  outDir: 'lib/core_chunk',
  root: 'src/export',
  deps: {
    onlyBundle: false,
    neverBundle: ['axios']
  },
  dts: {
    emitDtsOnly: true,
    build: false,
    resolver: 'oxc',
    tsconfig: false,
    compilerOptions: {
      baseUrl: '.',
      moduleResolution: 'bundler',
      paths: {
        '@kkk/richtext': ['../richtext/src/index.ts'],
        template: ['../template/src/index.ts'],
        'template/*': ['../template/src/*'],
        '@ikenxuan/amagi': ['../amagi/packages/core/src/index.ts']
      }
    }
  },
  clean: false
})