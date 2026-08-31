export function parseCookie(cookie?: string): Map<string, string> {
  const result = new Map<string, string>()
  if (!cookie) return result

  for (const pair of cookie.split(';')) {
    const separator = pair.indexOf('=')
    if (separator <= 0) continue

    const name = pair.slice(0, separator).trim()
    const value = pair.slice(separator + 1).trim()
    if (!name) continue

    if (value) result.set(name, value)
    else result.delete(name)
  }

  return result
}

export function buildCookieHeader(cookie?: string): string {
  return [...parseCookie(cookie).entries()].map(([name, value]) => `${name}=${value}`).join('; ')
}

export function mergeCookies(...cookies: Array<string | undefined>): string {
  const result = new Map<string, string>()

  for (const cookie of cookies) {
    for (const [name, value] of parseCookie(cookie)) {
      result.set(name, value)
    }
  }

  return [...result.entries()].map(([name, value]) => `${name}=${value}`).join('; ')
}

export function getCookie(name: string, cookie?: string): string | undefined {
  return parseCookie(cookie).get(name)
}

export function setCookiesToCookieHeader(setCookie?: string | string[]): string {
  const values = Array.isArray(setCookie) ? setCookie : setCookie ? [setCookie] : []
  const result = new Map<string, string>()

  for (const line of values) {
    const first = line.split(';', 1)[0]?.trim()
    if (!first) continue

    const separator = first.indexOf('=')
    if (separator <= 0) continue

    const name = first.slice(0, separator).trim()
    const value = first.slice(separator + 1).trim()
    if (!name) continue

    if (value) result.set(name, value)
    else result.delete(name)
  }

  return [...result.entries()].map(([name, value]) => `${name}=${value}`).join('; ')
}

export function hasLoginCookie(cookie: string): boolean {
  return Boolean(getCookie('sid_guard', cookie) || getCookie('sessionid', cookie) || getCookie('sessionid_ss', cookie))
}
