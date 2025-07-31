import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import key from "@/const/key"
import request from "@/lib/request"

/**
 * SHA256加密函数
 * @param authKey 鉴权秘钥
 * @returns 加密后的hash值
 */
const generateHash = async (authKey: string): Promise<string> => {
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(authKey)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('')
    return hashHex
  } catch (error) {
    // 降级使用外部 SHA256 库
    // @ts-ignore
    if (typeof sha256 !== 'function') {
      const script = document.createElement('script')
      script.src = '/web/sha256.min.js'
      await new Promise((resolve, reject) => {
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }
    // @ts-ignore
    return sha256(authKey)
  }
}

/**
 * 登录页面组件
 */
export default function LoginPage () {
  const [showPassword, setShowPassword] = useState(false)
  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  /**
   * 处理登录提交
   */
  const handleLogin = async () => {
    if (!token.trim()) {
      toast.error('请输入密钥')
      return
    }

    setIsLoading(true)
    try {
      // 生成SHA256哈希
      const authorization = await generateHash(token)

      // 发送登录请求
      const response = await request.serverPost<{
        userId: string,
        accessToken: string
        refreshToken: string
      }, { authorization: string }>('/api/v1/login', { authorization })

      // 存储token信息
      localStorage.setItem(key.userId, response.userId)
      localStorage.setItem(key.accessToken, response.accessToken)
      localStorage.setItem(key.refreshToken, response.refreshToken)

      toast.success('登录成功')
      navigate('/', { replace: true })
    } catch (error) {
      console.error(error)
      toast.error(`登录失败: ${(error as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            登录
          </CardTitle>
          <CardDescription>
            欢迎回来，请输入密钥继续
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
            <div className="space-y-2">
              <Label htmlFor="token">
                密钥
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="token"
                  type={showPassword ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="pl-9 pr-9"
                  placeholder="请输入 HTTP 鉴权密钥"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={isLoading}
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
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? '登录中...' : '登录'}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}