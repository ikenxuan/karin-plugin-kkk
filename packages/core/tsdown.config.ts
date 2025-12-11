import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/export/template.ts'],
  format: ['esm'],
  outDir: 'lib/core_chunk',
  dts: {
    resolve: true,
    emitDtsOnly: true,
    build: true,
    compilerOptions: {
      noEmit: false,
      declaration: true,
      emitDeclarationOnly: true,
      declarationMap: false,
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
        'template/*': ['../template/src/*'],
        '@ikenxuan/amagi/chalk': ['../amagi/src/exports/chalk.ts'],
        '@ikenxuan/amagi/axios': ['../amagi/src/exports/axios.ts'],
        '@ikenxuan/amagi/express': ['../amagi/src/exports/express.ts'],
        '@ikenxuan/amagi/log4js': ['../amagi/src/exports/log4js.ts'],
        '@ikenxuan/amagi': ['../amagi/src/index.ts'],
        'amagi/*': ['../amagi/src/*']
      },
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      composite: false
    }
  },
  clean: false,
  silent: false
})