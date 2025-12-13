import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware'
import { i18n } from '@/lib/i18n'

/**
 * Middleware for locale redirection
 * 处理语言重定向的中间件
 */
export default createI18nMiddleware(i18n)

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js|json|ai)$).*)'],
}
