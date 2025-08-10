import { isTauri } from '@tauri-apps/api/core'
import { LogOut, Monitor, Moon, Save, Server, Shield, Sun, User } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useThemeContext } from '@/components/theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import request from '@/lib/request'
import { clearAccessToken, clearRefreshToken, clearUserId } from '@/lib/token'

/**
 * 关于我的页面组件
 * 显示用户信息和管理员设置
 */
export default function AboutPage () {
  const [serverUrl, setServerUrl] = useState('')
  const [isTesting, setIsTesting] = useState(false)
  const [isLogoutPending, setIsLogoutPending] = useState(false)

  // 获取主题相关状态和方法
  const { isDark, isSystem, isInverse, setSystemTheme, setInverseTheme, toggleTheme } = useThemeContext()

  useEffect(() => {
    // 从localStorage获取服务器地址
    const savedServerUrl = localStorage.getItem('serverUrl') || ''
    setServerUrl(savedServerUrl)
  }, [])

  /**
   * 处理退出登录点击
   */
  const handleLogoutClick = useCallback(() => {
    if (isLogoutPending) {
      // 第二次点击，直接退出
      clearAccessToken()
      clearRefreshToken()
      clearUserId()
      window.location.href = isTauri() ? '/login' : '/kkk/login'
    } else {
      // 第一次点击，设置待确认状态
      setIsLogoutPending(true)
      toast('再次点击确认退出登录', {
        icon: '⚠️',
        duration: 3000
      })
      
      // 3秒后自动取消待确认状态
      setTimeout(() => {
        setIsLogoutPending(false)
      }, 3000)
    }
  }, [isLogoutPending])

  /**
   * 测试服务器连接
   */
  const testConnection = async () => {
    if (!serverUrl.trim()) {
      toast.error('请输入服务器地址')
      return
    }

    setIsTesting(true)
    try {
      const response = await request.serverGet<{
        ping: string
      }>('/api/v1/ping', { timeout: 5000 })

      if (response.ping === 'pong') {
        toast.success('服务器连接成功')
      } else {
        toast.error('服务器连接失败')
      }
    } catch (error) {
      console.error('连接测试失败:', error)
      toast.error('服务器连接失败')
    } finally {
      setIsTesting(false)
    }
  }

  /**
   * 保存服务器地址并测试连接
   */
  const handleSaveServer = async () => {
    localStorage.setItem('serverUrl', serverUrl)
    await testConnection()
  }

  /**
   * 获取主题图标
   */
  const getThemeIcon = () => {
    if (isSystem) {
      return <Monitor className="h-4 w-4" />
    }
    return isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
  }

  /**
   * 获取切换主题按钮文本
   */
  const getToggleThemeText = () => {
    if (isSystem) {
      return isDark ? '浅色模式' : '深色模式'
    }
    return isDark ? '浅色模式' : '深色模式'
  }

  /**
   * 获取当前主题描述
   */
  const getCurrentThemeDescription = () => {
    if (isSystem) {
      return `跟随系统 (当前: ${isDark ? '深色' : '浅色'})`
    }
    if (isInverse) {
      return `智能切换 (当前: ${isDark ? '深色' : '浅色'})`
    }
    return isDark ? '深色模式' : '浅色模式'
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                关于我的
              </h1>
              <p className="text-muted-foreground">
                About Me
              </p>
            </div>

            {/* 退出登录按钮 */}
            <Button 
              variant={isLogoutPending ? "destructive" : "outline"}
              onClick={handleLogoutClick}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isLogoutPending ? '确认退出' : '退出登录'}
            </Button>
          </div>

          {/* 用户信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>用户信息</CardTitle>
              <CardDescription>当前登录用户的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage alt="管理员头像" />
                  <AvatarFallback>
                    <User className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">管理员</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>系统管理员</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 主题设置卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>主题设置</CardTitle>
              <CardDescription>选择您偏好的界面主题</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">当前主题</Label>
                  <p className="text-sm text-muted-foreground">
                    {getCurrentThemeDescription()}
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleTheme}
                      className="flex items-center gap-2"
                    >
                      {getThemeIcon()}
                      {getToggleThemeText()}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>点击切换到{getToggleThemeText()}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isSystem ? "default" : "outline"}
                      size="sm"
                      onClick={setSystemTheme}
                      className="flex items-center gap-2"
                    >
                      <Monitor className="h-4 w-4" />
                      跟随系统
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>主题会根据您的系统设置自动切换</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isInverse ? "default" : "outline"}
                      size="sm"
                      onClick={setInverseTheme}
                      className="flex items-center gap-2"
                    >
                      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      智能切换
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>与系统主题相反，系统是浅色时显示深色，系统是深色时显示浅色</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* 服务器设置卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>服务器设置</CardTitle>
              <CardDescription>配置服务器连接地址</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serverUrl">服务器地址</Label>
                <div className="relative">
                  <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="serverUrl"
                    type="url"
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                    className="pl-9"
                    placeholder="http://localhost:7777"
                  />
                </div>
              </div>
              <Button
                onClick={handleSaveServer}
                disabled={isTesting}
                className="w-full"
              >
                <Save className="h-4 w-4 mr-2" />
                {isTesting ? '测试连接中...' : '保存并测试连接'}
              </Button>
            </CardContent>
          </Card>

          {/* 系统信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>系统信息</CardTitle>
              <CardDescription>关于本系统的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">版本</span>
                <span className="text-sm font-medium">v{__APP_VERSION__}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">构建时间</span>
                <span className="text-sm font-medium">{__BUILD_TIME__}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}