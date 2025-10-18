import { invoke, isTauri } from '@tauri-apps/api/core'
import Atropos from 'atropos/react'
import { ArrowRight, Eye, EyeOff, Lock, Server } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import Toaster from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import key from '@/const/key'
import { sha256HashSync } from '@/lib/crypto'
import request from '@/lib/request'

/**
 * 登录页面组件
 */
export default function LoginPage () {
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useState('')
  const [, setServerUrl] = useState('')
  const [protocol, setProtocol] = useState<'http' | 'https'>('http')
  const [hostname, setHostname] = useState('')
  const [port, setPort] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const navigate = useNavigate()

  /**
   * 获取当前页面的基础URL作为默认服务器地址
   * @returns 当前页面的基础URL
   */
  const getCurrentBaseUrl = (): string => {
    const { protocol, hostname, port } = window.location
    if (port === '5173') {
      return `${protocol}//${hostname}:7777`
    }
    // 否则使用当前页面的协议、主机名和端口
    return port ? `${protocol}//${hostname}:${port}` : `${protocol}//${hostname}`
  }

  /**
   * 解析URL为协议、主机名和端口
   * @param url 完整的URL
   */
  const parseUrl = (url: string) => {
    try {
      const urlObj = new URL(url)
      setProtocol(urlObj.protocol === 'https:' ? 'https' : 'http')
      setHostname(urlObj.hostname)
      setPort(urlObj.port || (urlObj.protocol === 'https:' ? '443' : '7777'))
    } catch {
      // 如果解析失败，使用默认值
      setProtocol('http')
      setHostname('localhost')
      setPort('7777')
    }
  }

  /**
   * 根据协议、主机名和端口构建完整URL
   * @returns 完整的服务器URL
   */
  const buildServerUrl = useCallback((): string => {
    if (!hostname) return ''
    const currentPort = port || (protocol === 'https' ? '443' : '7777')
    return `${protocol}://${hostname}:${currentPort}`
  }, [protocol, hostname, port])

  /**
   * 组件挂载时加载已保存的服务器地址
   */
  useEffect(() => {
    if (isTauri()) {
      const savedUrl = localStorage.getItem('serverUrl')
      if (savedUrl) {
        setServerUrl(savedUrl)
        parseUrl(savedUrl)
        import('@tauri-apps/api/core').then(({ invoke }) => {
          invoke('set_server_url', { url: savedUrl }).catch(console.error)
        })
      } else {
        const defaultUrl = getCurrentBaseUrl()
        setServerUrl(defaultUrl)
        parseUrl(defaultUrl)
      }
    }
  }, [])

  /**
   * 当协议、主机名或端口变化时，更新完整的服务器URL
   */
  useEffect(() => {
    if (isTauri() && hostname) {
      const newUrl = buildServerUrl()
      setServerUrl(newUrl)
    }
  }, [protocol, hostname, port, buildServerUrl])

  /**
   * 测试服务器连接
   * @returns 连接是否成功
   */
  const testConnection = async () => {
    if (!isTauri()) return true

    if (!hostname.trim()) {
      Toaster.error('请输入服务器地址')
      return false
    }

    const fullUrl = buildServerUrl()
    if (!fullUrl) {
      Toaster.error('请输入服务器地址')
      return false
    }

    try {
      new URL(fullUrl)
    } catch {
      Toaster.error('请输入有效的服务器地址')
      return false
    }

    setIsTestingConnection(true)
    try {
      await invoke('set_server_url', { url: fullUrl })

      const response = await request.serverGet<{
        ping: string
      }>('/api/v1/ping', {
        timeout: 5000
      })

      if (response.ping === 'pong') {
        localStorage.setItem('serverUrl', fullUrl)
        setServerUrl(fullUrl)
        Toaster.success('服务器连接成功')
        return true
      } else {
        Toaster.error('无法连接到服务器，请检查地址是否正确')
        return false
      }
    } catch {
      Toaster.error('连接测试失败，请检查服务器地址')
      return false
    } finally {
      setIsTestingConnection(false)
    }
  }

  /**
   * 处理服务器地址保存
   */
  const handleSaveServer = async () => {
    await testConnection()
  }

  /**
   * 处理登录提交
   */
  const handleLogin = async () => {
    if (!token.trim()) {
      Toaster.error('请输入密钥')
      return
    }

    const connectionSuccess = await testConnection()
    if (!connectionSuccess) {
      return
    }

    setIsLoading(true)
    try {
      // 生成SHA256哈希
      const authorization = sha256HashSync(token)

      // 发送登录请求
      const response = await request.serverPost<{
        userId: string,
        accessToken: string
        refreshToken: string
      }, { authorization: string }>('/api/v1/login', { authorization })

      if (!response || response === null) {
        Toaster.error('登录失败，密钥错误！')
        return
      }

      // 存储token信息
      localStorage.setItem(key.userId, response.userId)
      localStorage.setItem(key.accessToken, response.accessToken)
      localStorage.setItem(key.refreshToken, response.refreshToken)

      Toaster.success('登录成功！')

      const redirectPath = localStorage.getItem('redirectPath')
      localStorage.removeItem('redirectPath')

      if (redirectPath && redirectPath !== '/kkk/login') {
        window.location.href = redirectPath
      } else {
        navigate('/crack', { replace: true })
      }
    } catch (error) {
      console.error(error)
      Toaster.error('登录失败，请检查密钥是否正确')
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * 处理输入框触摸事件，确保在移动端能正常聚焦
   */
  const handleInputTouch = (e: React.TouchEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const target = e.currentTarget
    setTimeout(() => {
      target.focus()
    }, 0)
  }

  return (
    <div className='flex justify-center items-center p-4 min-h-screen bg-background'>
      <Atropos
        className='w-full max-w-lg pointer-events-none'
        activeOffset={40}
        shadowScale={1.05}
        rotateXMax={15}
        rotateYMax={15}
        duration={300}
        shadow
      >
        <Card className='w-full h-full' data-atropos-offset='0'>
          <CardHeader className='space-y-1' data-atropos-offset='2'>
            <CardTitle className='text-2xl font-semibold tracking-tight'>
              kkk 插件登录
            </CardTitle>
            <CardDescription>
              {isTauri() ? '请先配置服务器地址，然后输入密钥登录' : '请输入密钥登录'}
            </CardDescription>
          </CardHeader>
          <CardContent data-atropos-offset='1'>
            <form className='space-y-4' onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
              {isTauri() && (
                <>
                  <div className='space-y-2'>
                    <Label htmlFor='serverConfig'>
                      服务器地址
                    </Label>
                    <div className='space-y-3'>
                      {/* 协议选择器 */}
                      <div className='flex items-center space-x-2' data-atropos-offset='3'>
                        <Label htmlFor='protocol' className='text-sm text-muted-foreground min-w-[40px]'>
                          协议
                        </Label>
                        <Select value={protocol} onValueChange={(value: 'http' | 'https') => setProtocol(value)}>
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
                      <div className='flex items-center space-x-2' data-atropos-offset='3'>
                        <Label htmlFor='hostname' className='text-sm text-muted-foreground min-w-[40px]'>
                          地址
                        </Label>
                        <div className='relative flex-1'>
                          <Server className='absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-muted-foreground' data-atropos-offset='5' />
                          <Input
                            id='hostname'
                            type='text'
                            value={hostname}
                            onChange={(e) => {
                              const input = e.target.value

                              // 检查是否粘贴了完整URL
                              if (input.includes('://')) {
                                // 尝试从输入中提取完整URL
                                const urlMatch = input.match(/(https?:\/\/[^\s]+)/)
                                if (urlMatch) {
                                  const fullUrl = urlMatch[1]
                                  const url = new URL(fullUrl)
                                  const newProtocol = url.protocol === 'https:' ? 'https' : 'http'
                                  const newHostname = url.hostname
                                  const newPort = url.port || (newProtocol === 'https' ? '443' : '7777')
                                  setProtocol(newProtocol)
                                  setHostname(newHostname)
                                  setPort(newPort)
                                  return
                                }
                              }
                              setHostname(input)
                            }}
                            className='pl-9'
                            placeholder='localhost 或粘贴完整URL'
                            disabled={isLoading || isTestingConnection}
                            onTouchStart={handleInputTouch}
                          />
                        </div>
                        <div className='flex items-center space-x-1'>
                          <span className='text-sm text-muted-foreground'>:</span>
                          <Input
                            id='port'
                            type='number'
                            value={port}
                            onChange={(e) => setPort(e.target.value)}
                            className='w-[80px]'
                            placeholder={protocol === 'https' ? '443' : '7777'}
                            disabled={isLoading || isTestingConnection}
                            onTouchStart={handleInputTouch}
                            min='1'
                            max='65535'
                          />
                        </div>
                      </div>

                      {/* 完整URL预览 */}
                      {hostname && (
                        <div className='p-2 text-xs rounded border text-muted-foreground bg-muted/50' data-atropos-offset='2'>
                          地址预览: {buildServerUrl()}
                        </div>
                      )}
                    </div>

                    <Button
                      type='button'
                      variant='outline'
                      onClick={handleSaveServer}
                      disabled={isTestingConnection || !hostname.trim()}
                      className='w-full'
                      data-atropos-offset='4'
                    >
                      {isTestingConnection ? '测试连接中...' : '测试服务器连接'}
                    </Button>
                  </div>

                  <Separator data-atropos-offset='2' />
                </>
              )}

              {/* 登录部分 */}
              <div className='space-y-2'>
                <Label htmlFor='token'>
                  密钥
                </Label>
                <div className='relative' data-atropos-offset='3'>
                  <Lock className='absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-muted-foreground' data-atropos-offset='5' />
                  <Input
                    id='token'
                    type={showPassword ? 'text' : 'password'}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className='pr-9 pl-9'
                    placeholder='请输入 HTTP 鉴权密钥'
                    disabled={isLoading}
                    onTouchStart={handleInputTouch}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground'
                    disabled={isLoading || isTestingConnection}
                    data-atropos-offset='5'
                  >
                    {showPassword
                      ? (
                        <EyeOff className='w-4 h-4' />
                      )
                      : (
                        <Eye className='w-4 h-4' />
                      )}
                  </button>
                </div>
              </div>

              <Button
                type='submit'
                disabled={isLoading}
                className='relative z-10 w-full pointer-events-auto'
                data-atropos-offset='0'
                onClick={(e) => { e.preventDefault(); handleLogin() }}
              >
                {isLoading ? '登录中...' : '登录'}
                {!isLoading && <ArrowRight className='ml-2 w-4 h-4' data-atropos-offset='0' />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Atropos>
    </div>
  )
}
