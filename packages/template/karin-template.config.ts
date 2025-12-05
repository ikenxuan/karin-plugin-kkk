import { defineConfig } from 'karin-plugin-kkk-template'

export default defineConfig({
  name: 'karin-plugin-kkk-template-example',
  templatesDir: 'src/components/platforms',
  mockDataDir: 'dev-data',
  globalCss: 'src/styles/main.css',
  dev: {
    port: 3333,
    open: true
  }
})
