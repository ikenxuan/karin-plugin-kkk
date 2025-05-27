import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'
import { renderToString } from '@vue/server-renderer'
import fs from 'fs'
import { createSSRApp } from 'vue'
import { compile } from 'vue-simple-compiler'

import { renderData } from './vueRenderDemo'

export async function compileVueToHTML (params: typeof renderData) {
  const vueFile = fs.readFileSync('./src/apps/vueTest.vue', 'utf-8')

  const {
    js,
    css,
    externalJs,
    externalCss,
    errors
  } = compile(vueFile, {
    filename: 'vueTest.vue',
    // autoImportCss: true,
    autoResolveImports: true,
    isProd: true
  })
  const { descriptor } = parse(vueFile)
  const template = descriptor.template?.content ?? ''
  const app = createSSRApp({ template, data: () => params })
  const html = await renderToString(app)
  const styles = descriptor.styles.map(style => style.content).join('\n')
  const script = compileScript(descriptor, { id: 'test' }).content
  const scriptSetup = descriptor.scriptSetup?.content ?? ''

  const data = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f0f2f5;
          }
          #app {
            display: inline-block;
            position: relative;
          }
          ${styles}
        </style>
      </head>
      <body>
        <div id="app">
        ${html}
        </div>
        <script>
        ${scriptSetup}
        </script>
      </body>
    </html>
    `

  return data
}
