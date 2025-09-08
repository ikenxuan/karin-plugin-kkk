import RenderServer from './server'
export * from './server'
export { renderComponentToHtml, type RenderRequest, type RenderResponse } from './server'
export * from './types'

if (process.env.RENDER_ENV === 'render_dev') {
  import('./dev/mock-server')
}
export default RenderServer
