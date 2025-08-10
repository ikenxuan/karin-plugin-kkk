import Atropos from 'atropos/react'
import { ArrowRight, Eye, EyeOff, Lock, Server } from "lucide-react"
import { useEffect, useState } from "react"
import Toaster from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import key from "@/const/key"
import { sha256HashSync } from '@/lib/crypto'
import request from "@/lib/request"

/**
 * 登录页面组件
 */
export default function LoginPage () {
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useState("")
  const [serverUrl, setServerUrl] = useState('')
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
   * 组件挂载时加载已保存的服务器地址
   */
  // 在useEffect中添加同步服务器地址到Tauri后端
  useEffect(() => {
    const savedUrl = localStorage.getItem('serverUrl')
    if (savedUrl) {
      setServerUrl(savedUrl)
      // 同步到Tauri后端
      if (typeof window !== 'undefined' && (window as any).__TAURI_INTERNALS__) {
        import('@tauri-apps/api/core').then(({ invoke }) => {
          invoke('set_server_url', { url: savedUrl }).catch(console.error)
        })
      }
    } else {
      const defaultUrl = getCurrentBaseUrl()
      setServerUrl(defaultUrl)
    }
  }, [])
  
  // 在testConnection函数中替换toast调用
  const testConnection = async () => {
    if (!serverUrl.trim()) {
      Toaster.error('请输入服务器地址')
      return false
    }
  
    try {
      new URL(serverUrl)
    } catch {
      Toaster.error('请输入有效的服务器地址')
      return false
    }
  
    setIsTestingConnection(true)
    try {
      // 先同步服务器地址到Tauri后端
      if (typeof window !== 'undefined' && (window as any).__TAURI_INTERNALS__) {
        const { invoke } = await import('@tauri-apps/api/core')
        await invoke('set_server_url', { url: serverUrl })
      }
  
      const response = await request.serverGet<{
        ping: string
      }>('/api/v1/ping', {
        timeout: 5000
      })
  
      if (response.ping === 'pong') {
        localStorage.setItem('serverUrl', serverUrl)
        Toaster.success('服务器连接成功')
        return true
      } else {
        Toaster.error('无法连接到服务器，请检查地址是否正确')
        return false
      }
    } catch (error) {
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Atropos
        className="max-w-lg w-full"
        activeOffset={40}
        shadowScale={1.05}
        rotateXMax={15}
        rotateYMax={15}
        duration={300}
        shadow={true}
      >
        <Card className="w-full h-full" data-atropos-offset="0">
          <CardHeader className="space-y-1" data-atropos-offset="2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              kkk 插件登录
            </CardTitle>
            <CardDescription>
              请先配置服务器地址，然后输入密钥登录
            </CardDescription>
          </CardHeader>
          <CardContent data-atropos-offset="1">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
              <div className="space-y-2">
                <Label htmlFor="serverUrl">
                  服务器地址
                </Label>
                <div className="relative" data-atropos-offset="3">
                  <Server className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" data-atropos-offset="5" />
                  <Input
                    id="serverUrl"
                    type="url"
                    value={serverUrl}
                    onChange={(e) => setServerUrl(e.target.value)}
                    className="pl-9"
                    placeholder={getCurrentBaseUrl()}
                    disabled={isLoading || isTestingConnection}
                    onTouchStart={handleInputTouch}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveServer}
                  disabled={isLoading || isTestingConnection}
                  className="w-full"
                  data-atropos-offset="4"
                >
                  {isTestingConnection ? '测试连接中...' : '测试服务器连接'}
                </Button>
              </div>

              <Separator data-atropos-offset="2" />

              {/* 登录部分 */}
              <div className="space-y-2">
                <Label htmlFor="token">
                  密钥
                </Label>
                <div className="relative" data-atropos-offset="3">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" data-atropos-offset="5" />
                  <Input
                    id="token"
                    type={showPassword ? "text" : "password"}
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="pl-9 pr-9"
                    placeholder="请输入 HTTP 鉴权密钥"
                    disabled={isLoading || isTestingConnection}
                    onTouchStart={handleInputTouch}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading || isTestingConnection}
                    data-atropos-offset="5"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || isTestingConnection}
                className="w-full"
                data-atropos-offset="4"
              >
                {isLoading ? '登录中...' : '登录'}
                {!isLoading && !isTestingConnection && <ArrowRight className="ml-2 h-4 w-4" data-atropos-offset="6" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Atropos>
    </div>
  )
}