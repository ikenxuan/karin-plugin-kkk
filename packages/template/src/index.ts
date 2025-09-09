import RenderServer from './main'
export * from './main'
export { renderComponentToHtml, type RenderRequest, type RenderResponse } from './main'
export * from './types'

if (process.env.RENDER_ENV === 'render_dev') {
  import('./dev/mock-server')
}
export default RenderServer
