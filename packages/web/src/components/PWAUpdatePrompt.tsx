import { CheckCircle, Download, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

/**
 * PWA 更新提示组件
 * 用于处理 Service Worker 的更新和用户提示
 */
export function PWAUpdatePrompt () {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false)
  const [debugOfflineReady, setDebugOfflineReady] = useState(false)
  const [debugNeedRefresh, setDebugNeedRefresh] = useState(false)

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered (registration: ServiceWorkerRegistration | undefined) {
      console.log('SW Registered: ', registration)
    },
    onRegisterError (error: any) {
      console.log('SW registration error', error)
    },
  })

  // 监听调试事件（仅开发环境）
  useEffect(() => {
    if (import.meta.env.DEV) {
      const handleOfflineReady = () => {
        setDebugOfflineReady(true)
        setShowUpdatePrompt(true)
      }

      const handleNeedRefresh = () => {
        setDebugNeedRefresh(true)
        setShowUpdatePrompt(true)
      }

      const handleReset = () => {
        setDebugOfflineReady(false)
        setDebugNeedRefresh(false)
        setShowUpdatePrompt(false)
      }

      const handleUpdateComplete = () => {
        setDebugOfflineReady(false)
        setDebugNeedRefresh(false)
        setShowUpdatePrompt(false)
      }

      window.addEventListener('pwa-offline-ready', handleOfflineReady)
      window.addEventListener('pwa-need-refresh', handleNeedRefresh)
      window.addEventListener('pwa-reset', handleReset)
      window.addEventListener('pwa-update-complete', handleUpdateComplete)

      return () => {
        window.removeEventListener('pwa-offline-ready', handleOfflineReady)
        window.removeEventListener('pwa-need-refresh', handleNeedRefresh)
        window.removeEventListener('pwa-reset', handleReset)
        window.removeEventListener('pwa-update-complete', handleUpdateComplete)
      }
    }
  }, [])

  useEffect(() => {
    if (needRefresh) {
      setShowUpdatePrompt(true)
    }
  }, [needRefresh])

  /**
   * 处理更新应用
   */
  const handleUpdate = () => {
    if (import.meta.env.DEV && debugNeedRefresh) {
      // 开发环境模拟更新
      window.dispatchEvent(new CustomEvent('pwa-update-complete'))
    } else {
      // 生产环境真实更新
      updateServiceWorker(true)
    }
    setShowUpdatePrompt(false)
  }

  /**
   * 关闭更新提示
   */
  const handleClose = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
    setDebugOfflineReady(false)
    setDebugNeedRefresh(false)
    setShowUpdatePrompt(false)
  }

  // 合并真实状态和调试状态
  const isOfflineReady = offlineReady || debugOfflineReady
  const isNeedRefresh = needRefresh || debugNeedRefresh

  if (!showUpdatePrompt && !isOfflineReady) return null

  return (
    <Card className="fixed right-4 bottom-4 z-50 w-80 shadow-lg">
      <CardContent className="p-4">
        {isNeedRefresh && (
          <div className="space-y-3">
            <Alert>
              <Download className="w-4 h-4" />
              <AlertDescription className="text-blue-600">
                发现新版本，是否立即更新？
                {import.meta.env.DEV && debugNeedRefresh && (
                  <span className="ml-2 text-xs text-muted-foreground">(调试模式)</span>
                )}
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                size="sm"
                className="flex-1"
              >
                <Download className="mr-2 w-4 h-4" />
                更新
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                size="sm"
                className="flex-1"
              >
                稍后
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}