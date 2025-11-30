import { useState, useRef, useEffect, useMemo } from 'react'
import type { Route } from './+types/geetest'
import { Link, useSearchParams, useNavigate } from 'react-router'
import { HeroUIProvider, ToastProvider, Tabs, Tab } from '@heroui/react'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const urlParams = useMemo(() => {
    const versionParam = searchParams.get('v') || searchParams.get('version')
    let version: GeetestVersion = 'v3'
    if (versionParam === '4' || versionParam === 'v4') {
      version = 'v4'
    }
    return {
      version,
      hasVersionParam: !!versionParam,
      gt: searchParams.get('gt') || undefined,
      challenge: searchParams.get('challenge') || undefined,
      captchaId: searchParams.get('captcha_id') || searchParams.get('captchaId') || undefined,
    }
  }, [searchParams])

  const [version, setVersion] = useState<GeetestVersion>(urlParams.version)
  const contentRef = useRef<HTMLDivElement>(null)

  // 如果 URL 没有 v 参数，自动添加
  useEffect(() => {
    if (!urlParams.hasVersionParam) {
      const newParams = new URLSearchParams(searchParams)
      newParams.set('v', version === 'v3' ? '3' : '4')
      navigate(`/geetest?${newParams.toString()}`, { replace: true })
    }
  }, [urlParams.hasVersionParam, version, searchParams, navigate])

  const handleVersionChange = (newVersion: GeetestVersion) => {
    if (newVersion === version) return

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setVersion(newVersion)
        // 更新 URL 参数
        const newParams = new URLSearchParams(searchParams)
        newParams.set('v', newVersion === 'v3' ? '3' : '4')
        // 切换版本时清除另一个版本的特定参数
        if (newVersion === 'v3') {
          newParams.delete('captcha_id')
          newParams.delete('captchaId')
        } else {
          newParams.delete('gt')
          newParams.delete('challenge')
        }
        setSearchParams(newParams, { replace: true })
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 gap-6">
      {/* 导航栏 */}
      <div className="w-full max-w-md flex justify-between items-center">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        <Link 
          to="/docs/guide/faq" 
          className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          查看文档
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* 主卡片 */}
      <div className="w-full max-w-md rounded-2xl border border-fd-border/50 bg-fd-card/50 backdrop-blur-sm shadow-lg" style={{ minHeight: '480px' }}>
        <div className="flex flex-col gap-1 px-6 pt-6 pb-4">
          <h1 className="text-xl font-bold text-center text-fd-foreground tracking-wider">
            极验验证器
          </h1>
          <p className="text-xs text-fd-muted-foreground text-center">B站 -352 风控验证工具</p>
        </div>

        <div className="px-6 pb-6 pt-0">
          <Tabs
            selectedKey={version}
            onSelectionChange={(key) => handleVersionChange(key as GeetestVersion)}
            variant="solid"
            color="primary"
            fullWidth
            classNames={{
              tabList: 'gap-2 p-1 bg-fd-muted/50 rounded-xl',
              cursor: 'rounded-lg',
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
        </div>
      </div>

      {/* 使用说明 */}
      <div className="w-full max-w-md text-sm text-fd-muted-foreground text-center space-y-1">
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
