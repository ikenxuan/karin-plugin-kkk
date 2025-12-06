'use client';
import { useState, useRef, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { HeroUIProvider, ToastProvider, Tabs, Tab } from '@heroui/react';
import gsap from 'gsap';
import { Geetest3Panel } from '@/components/geetest/Geetest3Panel';
import { Geetest4Panel } from '@/components/geetest/Geetest4Panel';
import type { GeetestVersion } from '@/components/geetest/types';

function GeetestAppContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlParams = useMemo(() => {
    const versionParam = searchParams.get('v') || searchParams.get('version');
    let version: GeetestVersion = 'v3';
    if (versionParam === '4' || versionParam === 'v4') {
      version = 'v4';
    }
    return {
      version,
      hasVersionParam: !!versionParam,
      gt: searchParams.get('gt') || undefined,
      challenge: searchParams.get('challenge') || undefined,
      captchaId: searchParams.get('captcha_id') || searchParams.get('captchaId') || undefined,
    };
  }, [searchParams]);

  const [version, setVersion] = useState<GeetestVersion>(urlParams.version);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!urlParams.hasVersionParam) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('v', version === 'v3' ? '3' : '4');
      router.replace(`/geetest?${newParams.toString()}`);
    }
  }, [urlParams.hasVersionParam, version, searchParams, router]);

  const handleVersionChange = (newVersion: GeetestVersion) => {
    if (newVersion === version) return;

    gsap.to(contentRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        setVersion(newVersion);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('v', newVersion === 'v3' ? '3' : '4');
        if (newVersion === 'v3') {
          newParams.delete('captcha_id');
          newParams.delete('captchaId');
        } else {
          newParams.delete('gt');
          newParams.delete('challenge');
        }
        router.replace(`/geetest?${newParams.toString()}`);
      },
    });
  };

  useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
    );
  }, [version]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 gap-6">
      <div className="w-full max-w-md flex justify-between items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
        <Link
          href="/docs/guide/faq"
          className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          查看文档
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div
        className="w-full max-w-md rounded-2xl border border-fd-border/50 bg-fd-card/50 backdrop-blur-sm shadow-lg"
        style={{ minHeight: '480px' }}
      >
        <div className="flex flex-col gap-1 px-6 pt-6 pb-4">
          <h1 className="text-xl font-bold text-center text-fd-foreground tracking-wider">极验验证器</h1>
          <p className="text-xs text-fd-muted-foreground text-center">B站 -352 风控验证工具</p>
        </div>

        <div className="px-6 pb-6 pt-0">
          <Tabs
            selectedKey={version}
            onSelectionChange={(key: React.Key) => handleVersionChange(key as GeetestVersion)}
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

      <div className="w-full max-w-md text-sm text-fd-muted-foreground text-center space-y-1">
        <p>当 B站解析遇到 -352 错误时，使用此工具手动完成验证</p>
        <p>验证成功后结果会自动复制到剪贴板</p>
      </div>
    </div>
  );
}

function GeetestApp() {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" />
      <GeetestAppContent />
    </HeroUIProvider>
  );
}

export default function GeetestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <GeetestApp />
    </Suspense>
  );
}
