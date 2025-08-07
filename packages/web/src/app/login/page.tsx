import Atropos from 'atropos/react'
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import key from "@/const/key"
import request from "@/lib/request"
import { sha256HashSync } from "@/utils/crypto"


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
      const authorization = sha256HashSync(token)

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

      // 获取保存的重定向路径
      const redirectPath = localStorage.getItem('redirectPath')
      // 清除保存的重定向路径
      localStorage.removeItem('redirectPath')

      // 如果有保存的路径且不是登录页面，则跳转到该路径，否则跳转到根路径
      if (redirectPath && redirectPath !== '/kkk/login') {
        window.location.href = redirectPath
      } else {
        navigate('/', { replace: true })
      }
    } catch (error) {
      console.error(error)
      // toast.error(`登录失败: ${(error as Error).message}`)
      toast.error(`登录失败: ${JSON.stringify(error, null, 2)}`)
    } finally {
      setIsLoading(false)
    }
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
              登录
            </CardTitle>
            <CardDescription>
              欢迎回来，请输入密钥继续
            </CardDescription>
          </CardHeader>
          <CardContent data-atropos-offset="1">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
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
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    disabled={isLoading}
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
                disabled={isLoading}
                className="w-full"
                data-atropos-offset="4"
              >
                {isLoading ? '登录中...' : '登录'}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" data-atropos-offset="6" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Atropos>
    </div>
  )
}