import { renderComponentToHtml } from './main'
export { renderComponentToHtml, type RenderRequest, type RenderResponse } from './main'
export * from './types'

if (process.env.NODE_ENV === 'development') {
  import('./dev/mock-server')
}

export default renderComponentToHtml
