import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Lock, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import request from "@/lib/request"
import key from "@/const/key"

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
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-300 via-pink-300 to-blue-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-500 rotate-45 opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-green-500 rounded-full opacity-30"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500 opacity-25"></div>

      <Card className="w-full max-w-md bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000] relative">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-black text-white px-6 py-3 transform -rotate-2 mb-4">
              <h1 className="text-2xl font-black uppercase tracking-wider">LOGIN</h1>
            </div>
            <p className="text-lg font-bold text-gray-800">欢迎回来，请输入密钥继续</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin() }}>
            <div className="space-y-2">
              <Label htmlFor="token" className="text-sm font-black uppercase tracking-wide">
                密钥
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  id="token"
                  type={showPassword ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="pl-10 pr-10 h-12 border-4 border-black focus:border-blue-500 focus:ring-0 bg-pink-100 font-bold"
                  placeholder="请输入 HTTP 鉴权密钥"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-green-400 hover:bg-green-500 text-black font-black text-lg uppercase tracking-wider border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50"
            >
              {isLoading ? '登录中...' : '登录'}
              {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rotate-45"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500 rounded-full"></div>
      </Card>
    </div>
  )
}