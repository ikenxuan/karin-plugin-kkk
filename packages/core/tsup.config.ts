import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/export/modules.ts'],
  format: ['esm'],
  outDir: 'lib/core_chunk',
  dts: {
    resolve: true,
    only: true,
    compilerOptions: {
      module: 'ESNext',
      target: 'ESNext',
      esModuleInterop: true,
      moduleResolution: 'bundler',
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
      baseUrl: '.',
      paths: {
        '@/*': ['./src/*'],
        'template': ['../template/src/index.ts'],
        'template/*': ['../template/src/*']
      },
      declaration: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      composite: false,
      noEmit: false,
      emitDeclarationOnly: true
    }
  },
  clean: false,
  silent: false
})