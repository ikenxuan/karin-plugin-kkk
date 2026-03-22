import { copyFile, mkdir, unlink } from 'node:fs/promises'
import path from 'node:path'

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
  clean: false,
  async onSuccess () {
    const outDir = path.join(process.cwd(), 'lib', 'core_chunk')
    const sourceDtsPath = path.join(outDir, 'template.d.mts')
    const targetDtsPath = path.join(outDir, 'template.mts')

    await mkdir(outDir, { recursive: true })

    await copyFile(sourceDtsPath, targetDtsPath)
    await unlink(sourceDtsPath).catch(() => {})
  }
})
