import { useEffect, useRef } from 'react'

import request from '@/lib/request'

export const useHeartbeat = () => {
  const hasSentHeartbeat = useRef(false)

  useEffect(() => {
    const sendHeartbeat = async (): Promise<void> => {
      await request.serverGet('/api/v1/status/karin')
    }

    if (!hasSentHeartbeat.current) {
      sendHeartbeat()
      hasSentHeartbeat.current = true
    }
  }, [])
}
