import { defineConfig } from 'karin-plugin-kkk-template'

export default defineConfig({
  name: 'karin-plugin-kkk-template-example',
  templatesDir: 'components',
  // mockDataDir: 'dev-data',
  dev: {
    port: 3333,
    open: false
  }
})
