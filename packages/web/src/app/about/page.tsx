import { invoke, isTauri } from '@tauri-apps/api/core'
import { LogOut, Monitor, Moon, Save, Server, Shield, Sun, User } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { useThemeContext } from '@/components/theme-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  const { isDark, isSystem, isInverse, setSystemTheme, setInverseTheme, toggleTheme } = useThemeContext()

  useEffect(() => {
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
      window.location.href = (isTauri() && import.meta.env.VITE_DEV) ? '/kkk/login' : (isTauri() ? '/login' : '/kkk/login')
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
  const testConnection = async (): Promise<boolean> => {
    if (!serverUrl.trim()) {
      toast.error('请输入服务器地址')
      return false
    }

    // 验证URL格式
    try {
      const url = new URL(serverUrl)
      // 检查是否是有效的服务器地址格式（不应该包含路径）
      if (url.pathname !== '/' || url.search || url.hash) {
        toast.error('请输入有效的服务器地址，不应包含路径或参数')
        return false
      }
    } catch {
      toast.error('请输入有效的服务器地址格式')
      return false
    }

    setIsTesting(true)

    // 保存原始URL
    const originalUrl = localStorage.getItem('serverUrl')
    let originalTauriUrl = null

    try {
      if (isTauri()) {
        originalTauriUrl = await invoke('get_server_url')
        await invoke('set_server_url', { url: serverUrl })
      }
      // 临时设置localStorage中的URL用于测试
      localStorage.setItem('serverUrl', serverUrl)

      const response = await request.serverGet<{
        ping: string
      }>('/api/v1/ping', { timeout: 5000 })

      if (response.ping === 'pong') {
        toast.success('服务器连接成功')
        return true
      } else {
        throw new Error('服务器响应异常')
      }
    } catch (error) {
      console.error('连接测试失败:', error)
      toast.error('服务器连接失败')

      // 恢复原始URL
      if (originalUrl) {
        localStorage.setItem('serverUrl', originalUrl)
      } else {
        localStorage.removeItem('serverUrl')
      }

      if (isTauri() && originalTauriUrl) {
        await invoke('set_server_url', { url: originalTauriUrl })
      }

      return false
    } finally {
      setIsTesting(false)
    }
  }

  /**
   * 保存服务器地址并测试连接
   */
  const handleSaveServer = async () => {
    if (!serverUrl.trim()) {
      toast.error('请输入服务器地址')
      return
    }
    const currentUrl = localStorage.getItem('serverUrl')
    const isConnected = await testConnection()

    // 测试连接
    if (currentUrl !== serverUrl) {
      if (!isConnected) {
        return
      }
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('userId')

      setTimeout(() => {
        toast.error('后端服务已更改，请重新登录')
      }, 1000)

      setTimeout(() => {
        window.location.reload()
      }, 4000)
    }
    localStorage.setItem('serverUrl', serverUrl)
  }

  /**
   * 根据当前serverUrl构建完整的服务器URL，自动处理默认端口
   * @returns 完整的服务器URL
   */
  const buildCompleteServerUrl = useCallback((): string => {
    if (!serverUrl) return ''

    const protocol = serverUrl.startsWith('https://') ? 'https' : 'http'
    const hostname = serverUrl.replace(/^https?:\/\//, '').replace(/:\d+$/, '')
    const port = serverUrl.match(/:(\d+)$/)?.[1]

    if (!hostname) return ''

    const finalPort = port || (protocol === 'https' ? '443' : '7777')
    return `${protocol}://${hostname}:${finalPort}`
  }, [serverUrl])

  /**
   * 获取主题图标
   */
  const getThemeIcon = () => {
    if (isSystem) {
      return <Monitor className='w-4 h-4' />
    }
    return isDark ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />
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
      <div className='p-4 min-h-screen bg-background'>
        <div className='mx-auto space-y-6 max-w-2xl'>
          {/* Header */}
          <div className='flex justify-between items-center mb-8'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight'>
                关于我的
              </h1>
              <p className='text-muted-foreground'>
                About Me
              </p>
            </div>

            {/* 退出登录按钮 */}
            <Button
              variant={isLogoutPending ? 'destructive' : 'outline'}
              onClick={handleLogoutClick}
            >
              <LogOut className='mr-2 w-4 h-4' />
              {isLogoutPending ? '确认退出' : '退出登录'}
            </Button>
          </div>

          {/* 用户信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>用户信息</CardTitle>
              <CardDescription>当前登录用户的基本信息</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <Avatar className='w-20 h-20'>
                  <AvatarImage alt='管理员头像' />
                  <AvatarFallback>
                    <User className='w-10 h-10' />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className='text-lg font-semibold'>管理员</h3>
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <Shield className='mr-1 w-4 h-4' />
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
            <CardContent className='space-y-4'>
              <div className='flex justify-between items-center'>
                <div className='space-y-1'>
                  <Label className='text-sm font-medium'>当前主题</Label>
                  <p className='text-sm text-muted-foreground'>
                    {getCurrentThemeDescription()}
                  </p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={toggleTheme}
                      className='flex gap-2 items-center'
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
              <div className='grid grid-cols-2 gap-2'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isSystem ? 'default' : 'outline'}
                      size='sm'
                      onClick={setSystemTheme}
                      className='flex gap-2 items-center'
                    >
                      <Monitor className='w-4 h-4' />
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
                      variant={isInverse ? 'default' : 'outline'}
                      size='sm'
                      onClick={setInverseTheme}
                      className='flex gap-2 items-center'
                    >
                      {isDark ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
                      相反色
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>与系统主题相反，系统是浅色时显示深色，系统是深色时显示浅色</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {isTauri() && (
            <Card>
              <CardHeader>
                <CardTitle>服务器设置</CardTitle>
                <CardDescription>配置服务器连接地址</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='serverConfig'>
                    服务器地址
                  </Label>
                  <div className='space-y-3'>
                    {/* 协议选择器 */}
                    <div className='flex items-center space-x-2'>
                      <Label htmlFor='protocol' className='text-sm text-muted-foreground min-w-[40px]'>
                        协议
                      </Label>
                      <Select
                        value={serverUrl.startsWith('https://') ? 'https' : 'http'}
                        onValueChange={(value: 'http' | 'https') => {
                          const hostname = serverUrl.replace(/^https?:\/\//, '').replace(/:\d+$/, '')
                          const port = serverUrl.match(/:(\d+)$/)?.[1] || (value === 'https' ? '443' : '7777')
                          setServerUrl(`${value}://${hostname}:${port}`)
                        }}
                      >
                        <SelectTrigger className='w-[100px]'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='http'>HTTP</SelectItem>
                          <SelectItem value='https'>HTTPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 主机名和端口号 */}
                    <div className='flex items-center space-x-2'>
                      <Label htmlFor='hostname' className='text-sm text-muted-foreground min-w-[40px]'>
                        地址
                      </Label>
                      <div className='relative flex-1'>
                        <Server className='absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-muted-foreground' />
                        <Input
                          id='hostname'
                          type='text'
                          value={serverUrl.replace(/^https?:\/\//, '').replace(/:\d+$/, '')}
                          onChange={(e) => {
                            const input = e.target.value

                            // 检查是否粘贴了完整URL
                            if (input.includes('://')) {
                              // 尝试从输入中提取完整URL
                              const urlMatch = input.match(/(https?:\/\/[^\s]+)/)
                              if (urlMatch) {
                                const fullUrl = urlMatch[1]
                                const url = new URL(fullUrl)
                                const protocol = url.protocol === 'https:' ? 'https' : 'http'
                                const hostname = url.hostname
                                const port = url.port || (protocol === 'https' ? '443' : '7777')
                                setServerUrl(`${protocol}://${hostname}:${port}`)
                                return
                              }
                            }
                            const protocol = serverUrl.startsWith('https://') ? 'https' : 'http'
                            const currentPort = serverUrl.match(/:(\d+)$/)?.[1] || (protocol === 'https' ? '443' : '7777')
                            setServerUrl(`${protocol}://${input}:${currentPort}`)
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveServer()
                            }
                          }}
                          className='pl-9'
                          placeholder='localhost 或粘贴完整URL'
                          disabled={isTesting}
                        />
                      </div>
                      <div className='flex items-center space-x-1'>
                        <span className='text-sm text-muted-foreground'>:</span>
                        <Input
                          id='port'
                          type='number'
                          value={serverUrl.match(/:(\d+)$/)?.[1] || ''}
                          onChange={(e) => {
                            const port = e.target.value
                            const protocol = serverUrl.startsWith('https://') ? 'https' : 'http'
                            const hostname = serverUrl.replace(/^https?:\/\//, '').replace(/:\d+$/, '')

                            if (port.trim()) {
                              setServerUrl(`${protocol}://${hostname}:${port}`)
                            } else {
                              setServerUrl(`${protocol}://${hostname}`)
                            }
                          }}
                          className='w-[80px]'
                          placeholder={serverUrl.startsWith('https://') ? '443' : '7777'}
                          disabled={isTesting}
                          min='1'
                          max='65535'
                        />
                      </div>
                    </div>

                    {/* 完整URL预览 */}
                    {serverUrl && (
                      <div className='p-2 text-xs rounded border text-muted-foreground bg-muted/50'>
                        地址预览: {buildCompleteServerUrl()}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleSaveServer}
                  disabled={isTesting}
                  className='w-full'
                >
                  <Save className='mr-2 w-4 h-4' />
                  {isTesting ? '测试连接中...' : '保存并测试连接'}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 系统信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>系统信息</CardTitle>
              <CardDescription>关于本系统的基本信息</CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>版本</span>
                <span className='text-sm font-medium'>v{__APP_VERSION__}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-sm text-muted-foreground'>构建时间</span>
                <span className='text-sm font-medium'>{__BUILD_TIME__}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
