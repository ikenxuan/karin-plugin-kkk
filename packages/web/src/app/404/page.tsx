import { Home, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

/**
 * 404页面未找到组件
 * @description 当用户访问不存在的页面时显示的错误页面
 */
const NotFoundPage = () => {
  const navigate = useNavigate()

  /**
   * 返回首页处理函数
   */
  const handleGoHome = () => {
    navigate('/', { replace: true })
  }

  /**
   * 返回上一页处理函数
   */
  const handleGoBack = () => {
    navigate(-1)
  }

  /**
   * 刷新页面处理函数
   */
  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className='flex justify-center items-center p-4 min-h-screen bg-gradient-to-br from-background to-muted/20'>
      <Card className='mx-auto w-full max-w-md shadow-lg'>
        <CardHeader className='pb-4 text-center'>
          <div className='flex justify-center items-center mx-auto mb-4'>
            <img src='/404.svg' className='w-48 h-48' />
          </div>
          <CardDescription className='text-lg'>
            页面未找到
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='text-center text-muted-foreground'>
            <p className='mb-2'>抱歉，您访问的页面不存在。</p>
            <p className='text-sm'>可能是链接错误或页面已被移除。</p>
          </div>

          <Separator />

          <div className='space-y-3'>
            <Button
              onClick={handleGoHome}
              className='w-full'
              size='lg'
            >
              <Home className='mr-2 w-4 h-4' />
              返回首页
            </Button>

            <div className='grid grid-cols-2 gap-3'>
              <Button
                onClick={handleGoBack}
                variant='outline'
                size='sm'
              >
                返回上页
              </Button>

              <Button
                onClick={handleRefresh}
                variant='outline'
                size='sm'
              >
                <RefreshCw className='mr-1 w-3 h-3' />
                刷新
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFoundPage
