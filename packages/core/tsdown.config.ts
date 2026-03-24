import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/export/template.ts'],
  format: ['esm'],
  target: 'es2022',
  outDir: 'lib/core_chunk',
  root: 'src/export',
  dts: {
    emitDtsOnly: true,
    build: false,
    resolver: 'oxc',
    tsconfig: false,
    compilerOptions: {
      baseUrl: '.',
      moduleResolution: 'bundler',
      paths: {
        template: ['../template/src/index.ts'],
        'template/*': ['../template/src/*']
      }
    }
  },
  clean: false
})
