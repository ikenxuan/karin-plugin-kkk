import { useState, useRef, useEffect, useMemo } from 'react'
import type { Route } from './+types/geetest'
import { Link, useSearchParams } from 'react-router'
import { HeroUIProvider, ToastProvider, Card, CardBody, CardHeader, Tabs, Tab } from '@heroui/react'
import gsap from 'gsap'
import { Geetest3Panel } from '@/geetest/Geetest3Panel'
import { Geetest4Panel } from '@/geetest/Geetest4Panel'
import type { GeetestVersion } from '@/geetest/types'

export function meta({}: Route.MetaArgs) {
  return [
    { title: '极验验证器 - karin-plugin-kkk' },
    { name: 'description', content: 'B站 -352 风控验证工具' },
  ]
}

function GeetestApp() {
  const [searchParams] = useSearchParams()
  
  const urlParams = useMemo(() => {
    const versionParam = searchParams.get('v') || searchParams.get('version')
    let version: GeetestVersion = 'v3'
    if (versionParam === '4' || versionParam === 'v4') {
      version = 'v4'
    }
    return {
      version,
      gt: searchParams.get('gt') || undefined,
      challenge: searchParams.get('challenge') || undefined,
      captchaId: searchParams.get('captcha_id') || searchParams.get('captchaId') || undefined,
    }
  }, [searchParams])

  const [version, setVersion] = useState<GeetestVersion>(urlParams.version)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleVersionChange = (newVersion: GeetestVersion) => {
    if (newVersion === version) return

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setVersion(newVersion)
      },
    })
  }

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
    )
  }, [version])

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-6 gap-4">
      {/* 文档入口 */}
      <div className="w-full max-w-md flex justify-between items-center">
        <Link 
          to="/" 
          className="text-sm text-default-500 hover:text-primary transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        <Link 
          to="/docs/guide/faq" 
          className="text-sm text-default-500 hover:text-primary transition-colors flex items-center gap-1"
        >
          查看文档
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-lg" style={{ minHeight: '480px' }}>
        <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-4">
          <h1 className="text-xl font-bold text-center text-foreground tracking-wider">
            极验验证器
          </h1>
          <p className="text-xs text-default-400 text-center">B站 -352 风控验证工具</p>
        </CardHeader>

        <CardBody className="px-6 pb-6 pt-0">
          <Tabs
            selectedKey={version}
            onSelectionChange={(key) => handleVersionChange(key as GeetestVersion)}
            variant="solid"
            color="primary"
            fullWidth
            classNames={{
              tabList: 'gap-2 p-1 bg-default-100 rounded-large',
              cursor: 'rounded-medium',
              tab: 'h-8 text-sm',
            }}
          >
            <Tab key="v3" title="极验3" />
            <Tab key="v4" title="极验4" />
          </Tabs>

          <div ref={contentRef} className="mt-5">
            {version === 'v3' ? (
              <Geetest3Panel initialGt={urlParams.gt} initialChallenge={urlParams.challenge} />
            ) : (
              <Geetest4Panel initialCaptchaId={urlParams.captchaId} />
            )}
          </div>
        </CardBody>
      </Card>

      {/* 使用说明 */}
      <div className="w-full max-w-md text-xs text-default-400 text-center space-y-1">
        <p>当 B站解析遇到 -352 错误时，使用此工具手动完成验证</p>
        <p>验证成功后结果会自动复制到剪贴板</p>
      </div>
    </div>
  )
}

export default function GeetestPage() {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <GeetestApp />
    </HeroUIProvider>
  )
}
