import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'
import { renderToString } from '@vue/server-renderer'
import fs from 'fs'
import { createSSRApp } from 'vue'
import { compile } from 'vue-simple-compiler'

import { renderData } from './vueRenderDemo'

export function compileVueToHTML (params: typeof renderData) {
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
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Generated Vue Component</title>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <script type="importmap">
      {
        "imports": {
          "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js",
          "lucide-vue-next": "https://cdn.jsdelivr.net/npm/lucide@0.511.0/+esm"
          
        }
      }
      </script>
    </head>
      <style>
        ${css[0].code}
      </style>
    <body>
  <div id="app"></div>
  <script type="module">
  ${js.code}
  
  import { createApp } from "vue";
  
  // 创建并挂载应用
  createApp({
    render: __sfc__.setup(),
    data() {
      return ${JSON.stringify(params)}
    }
  }).mount('#app');
  </script>
</body>
  </html>`
}
