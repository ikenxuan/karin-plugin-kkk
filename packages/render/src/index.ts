export * from './types'
export * from './server'
export { renderComponentToHtml, type RenderRequest, type RenderResponse } from './server'

if (process.env.NODE_ENV === 'development') {
  import('./dev/mock-server');
}
import RenderServer from './server'
export default RenderServer