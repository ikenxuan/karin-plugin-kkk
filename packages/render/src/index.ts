export * from './types'
export * from './server'
export { renderComponentToHtml, type RenderRequest, type RenderResponse } from './server'

if (process.env.RENDER_ENV === 'render_dev') {
  import('./dev/mock-server');  
}
import RenderServer from './server'
export default RenderServer