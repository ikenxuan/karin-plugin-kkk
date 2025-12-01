'use client'

import { use, useEffect, useId, useState } from 'react'

export function Mermaid({ chart }: { chart: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return <MermaidContent chart={chart} />
}

const cache = new Map<string, Promise<unknown>>()

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  const cached = cache.get(key)
  if (cached) return cached as Promise<T>

  const promise = setPromise()
  cache.set(key, promise)
  return promise
}

function MermaidContent({ chart }: { chart: string }) {
  const id = useId()
  const [theme, setTheme] = useState<'dark' | 'default'>('default')

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'default')
  }, [])

  const { default: mermaid } = use(
    cachePromise('mermaid', () => import('mermaid'))
  )

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: 'inherit',
    themeCSS: 'margin: 1.5rem auto 0;',
    theme
  })

  const { svg, bindFunctions } = use(
    cachePromise(`${chart}-${theme}`, () => {
      return mermaid.render(id.replace(/:/g, '_'), chart.replaceAll('\\n', '\n'))
    })
  )

  return (
    <div
      ref={(container) => {
        if (container) bindFunctions?.(container)
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
