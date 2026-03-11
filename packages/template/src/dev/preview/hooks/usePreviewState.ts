import React from 'react'

import { previewDefaults } from '../constants'
import type { PreviewParams, PreviewState } from '../types'
import { parseBoolean, parseNumber } from '../utils/parse'

const getPreviewParams = (): PreviewParams => {
  const params = new URLSearchParams(window.location.search)
  const filename = params.get('filename') ?? previewDefaults.filename
  const filePath = params.get('filePath') ?? filename
  const videoUrl = params.get('videoUrl') ?? `/api/kkk/stream/${encodeURIComponent(filename)}`
  const removeCache = parseBoolean(params.get('removeCache')) || previewDefaults.removeCache
  const createdAt = parseNumber(params.get('createdAt')) ?? Date.now()
  const expireAt = parseNumber(params.get('expireAt'))
  const eventsUrl = params.get('eventsUrl') ?? ''
  return {
    filename,
    filePath,
    videoUrl,
    removeCache,
    createdAt,
    expireAt,
    eventsUrl
  }
}

const createInitialState = (params: PreviewParams): PreviewState => {
  const remainingMs = params.removeCache && params.expireAt
    ? Math.max(params.expireAt - Date.now(), 0)
    : null
  return {
    ...params,
    remainingMs,
    removed: false
  }
}

export const usePreviewState = (): PreviewState => {
  const params = getPreviewParams()
  const ssrState = typeof window !== 'undefined' && (window as any).__VIDEO_PREVIEW__ as Partial<PreviewState> | undefined
  const [state, setState] = React.useState<PreviewState>(() => createInitialState(params))

  React.useEffect(() => {
    if (ssrState && Object.keys(ssrState).length > 0) {
      setState((prev) => ({
        ...prev,
        ...ssrState,
        eventsUrl: ssrState.eventsUrl ?? prev.eventsUrl,
        videoUrl: ssrState.videoUrl ?? prev.videoUrl
      }))
    }
  }, [ssrState])

  React.useEffect(() => {
    if (!params.eventsUrl) return
    const source = new EventSource(params.eventsUrl)
    source.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data) as Partial<PreviewState>
        setState((prev) => ({
          ...prev,
          ...payload,
          videoUrl: prev.videoUrl,
          eventsUrl: prev.eventsUrl
        }))
      } catch {}
    }
    return () => {
      source.close()
    }
  }, [params.eventsUrl])

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setState((prev) => {
        if (!prev.removeCache || !prev.expireAt) {
          return prev
        }
        if (prev.removed) {
          return { ...prev, remainingMs: 0 }
        }
        const now = Date.now()
        return { ...prev, remainingMs: Math.max(prev.expireAt - now, 0) }
      })
    }, 1000)
    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return state
}
