import { CheckCircle, Download,RefreshCw, Settings } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

/**
 * PWA 调试面板组件
 * 用于开发环境下测试 PWA 更新流程
 */
export function PWADebugPanel() {
  const [debugState, setDebugState] = useState<{
    offlineReady: boolean
    needRefresh: boolean
    isVisible: boolean
  }>({
    offlineReady: false,
    needRefresh: false,
    isVisible: false
  })

  /**
   * 触发离线就绪状态
   */
  const triggerOfflineReady = () => {
    setDebugState(prev => ({
      ...prev,
      offlineReady: true,
      needRefresh: false,
      isVisible: true
    }))
    
    // 模拟事件触发
    window.dispatchEvent(new CustomEvent('pwa-offline-ready'))
  }

  /**
   * 触发需要刷新状态
   */
  const triggerNeedRefresh = () => {
    setDebugState(prev => ({
      ...prev,
      offlineReady: false,
      needRefresh: true,
      isVisible: true
    }))
    
    // 模拟事件触发
    window.dispatchEvent(new CustomEvent('pwa-need-refresh'))
  }

  /**
   * 重置所有状态
   */
  const resetStates = () => {
    setDebugState({
      offlineReady: false,
      needRefresh: false,
      isVisible: false
    })
    
    // 模拟重置事件
    window.dispatchEvent(new CustomEvent('pwa-reset'))
  }

  /**
   * 模拟更新完成
   */
  const simulateUpdateComplete = () => {
    window.dispatchEvent(new CustomEvent('pwa-update-complete'))
    resetStates()
  }

  // 只在开发环境显示
  if (import.meta.env.PROD) return null

  return (
    <Card className="fixed top-4 left-4 z-50 w-80 shadow-lg backdrop-blur bg-background/95">
      <CardHeader className="pb-3">
        <CardTitle className="flex gap-2 items-center text-sm">
          <Settings className="w-4 h-4" />
          PWA 调试面板
          <Badge variant="secondary" className="text-xs">
            DEV
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="text-xs text-muted-foreground">
          当前状态:
        </div>
        
        <div className="flex gap-2">
          <Badge 
            variant={debugState.offlineReady ? "default" : "outline"}
            className="text-xs"
          >
            <CheckCircle className="mr-1 w-3 h-3" />
            离线就绪
          </Badge>
          <Badge 
            variant={debugState.needRefresh ? "default" : "outline"}
            className="text-xs"
          >
            <Download className="mr-1 w-3 h-3" />
            需要更新
          </Badge>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">
            测试操作:
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={triggerOfflineReady}
              className="text-xs"
            >
              <CheckCircle className="mr-1 w-3 h-3" />
              离线就绪
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={triggerNeedRefresh}
              className="text-xs"
            >
              <Download className="mr-1 w-3 h-3" />
              需要更新
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              onClick={simulateUpdateComplete}
              className="text-xs"
            >
              <RefreshCw className="mr-1 w-3 h-3" />
              更新完成
            </Button>
            
            <Button 
              size="sm" 
              variant="destructive"
              onClick={resetStates}
              className="text-xs"
            >
              重置状态
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="text-xs text-muted-foreground">
          💡 提示: 点击按钮测试不同的 PWA 更新状态
        </div>
      </CardContent>
    </Card>
  )
}